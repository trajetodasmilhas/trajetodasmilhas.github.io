import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Criar cliente Supabase padrão para máxima compatibilidade
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Tipos de eventos expandidos
export type VideoEventType = 'play' | 'pause' | 'ended' | 'cta_click' | 'blur_view';

export interface VideoEvent {
  id?: string;
  video_url: string;
  event_type: VideoEventType;
  watched_seconds?: number;
  total_duration?: number;
  user_session_id: string;
  device_type?: string;
  browser_info?: string;
  created_at?: string;
}

export interface RetentionEvent {
  video_url: string;
  user_session_id: string;
  video_current_time: number;
  total_duration: number;
  device_type?: string;
}

// Gerar ID de sessão único para o usuário
export const getSessionId = (): string => {
  let sessionId = localStorage.getItem('trajeto_session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('trajeto_session_id', sessionId);
  }
  return sessionId;
};

// Detectar tipo de dispositivo
export const getDeviceType = (): string => {
  const ua = navigator.userAgent;
  if (/mobile|android|iphone|ipod|blackberry|iemobile|opera mini/i.test(ua.toLowerCase())) {
    return 'mobile';
  } else if (/ipad|android|tablet/i.test(ua.toLowerCase())) {
    return 'tablet';
  }
  return 'desktop';
};

// Obter informações do navegador
export const getBrowserInfo = (): string => {
  const ua = navigator.userAgent;
  if (ua.indexOf('Firefox') > -1) return 'Firefox';
  if (ua.indexOf('Chrome') > -1) return 'Chrome';
  if (ua.indexOf('Safari') > -1) return 'Safari';
  if (ua.indexOf('Edge') > -1) return 'Edge';
  return 'Unknown';
};

// Registrar evento de vídeo no Supabase (com tratamento silencioso de erros)
export const trackVideoEvent = async (event: VideoEvent) => {
  if (!supabaseUrl || !supabaseAnonKey) return null;
  
  try {
    const { data, error } = await supabase
      .from('video_events')
      .insert([
        {
          ...event,
          user_session_id: event.user_session_id || getSessionId(),
          device_type: event.device_type || getDeviceType(),
          browser_info: event.browser_info || getBrowserInfo(),
          created_at: new Date().toISOString(),
        }
      ])
      .select();

    if (error) {
      console.debug('Analytics: Evento não registrado', error.message);
      return null;
    }

    return data;
  } catch (err) {
    console.debug('Analytics: Erro de conexão', err);
    return null;
  }
};

// Registrar evento de retenção (segundo a segundo)
export const trackRetentionEvent = async (event: RetentionEvent) => {
  if (!supabaseUrl || !supabaseAnonKey) return null;
  
  try {
    const { data, error } = await supabase
      .from('video_retention')
      .insert([
        {
          video_url: event.video_url,
          user_session_id: event.user_session_id || getSessionId(),
          video_current_time: event.video_current_time,
          total_duration: event.total_duration,
          device_type: event.device_type || getDeviceType(),
          created_at: new Date().toISOString(),
        }
      ])
      .select();

    if (error) {
      console.debug('Analytics: Retenção não registrada', error.message);
      return null;
    }

    return data;
  } catch (err) {
    console.debug('Analytics: Erro ao registrar retenção', err);
    return null;
  }
};

// Atualizar sessão de usuário
export const updateUserSession = async (sessionId: string, videoUrl: string, updates: any) => {
  if (!supabaseUrl || !supabaseAnonKey) return null;
  
  try {
    const { data, error } = await supabase
      .from('user_sessions')
      .upsert({
        session_id: sessionId,
        video_url: videoUrl,
        device_type: getDeviceType(),
        browser_info: getBrowserInfo(),
        ...updates,
        created_at: new Date().toISOString(),
      })
      .select();

    if (error) {
      console.debug('Analytics: Sessão não atualizada', error.message);
      return null;
    }

    return data;
  } catch (err) {
    console.debug('Analytics: Erro ao atualizar sessão', err);
    return null;
  }
};

// Obter métricas agregadas de um vídeo (com fallback seguro)
export const getVideoMetrics = async (videoUrl: string) => {
  if (!supabaseUrl || !supabaseAnonKey) return null;

  try {
    const { data: events, error: eventsError } = await supabase
      .from("video_events")
      .select("event_type, watched_seconds")
      .eq("video_url", videoUrl);

    if (eventsError) {
      console.debug("Analytics: Erro ao obter eventos de vídeo", eventsError.message);
      return null;
    }

    const { data: retentionEvents, error: retentionError } = await supabase
      .from("video_retention")
      .select("video_current_time, total_duration")
      .eq("video_url", videoUrl);

    if (retentionError) {
      console.debug("Analytics: Erro ao obter eventos de retenção", retentionError.message);
      return null;
    }

    let blurViews = 0;
    let totalViews = 0;
    let completedViews = 0;
    let ctaClicks = 0;
    let totalWatchTime = 0;
    let totalSessionsWithPlay = 0;

    const sessions = new Set();

    events.forEach((event: any) => {
      sessions.add(event.user_session_id);
      if (event.event_type === "blur_view") {
        blurViews++;
      } else if (event.event_type === "play") {
        totalViews++;
      } else if (event.event_type === "ended") {
        completedViews++;
        totalWatchTime += event.watched_seconds || 0;
      } else if (event.event_type === "cta_click") {
        ctaClicks++;
      }
    });

    // Calcular tempo médio assistido e retenção média
    let averageWatchTime = 0;
    if (completedViews > 0) {
      averageWatchTime = totalWatchTime / completedViews;
    }

    let totalRetentionSeconds = 0;
    let retentionEventCount = 0;
    retentionEvents.forEach((event: any) => {
      totalRetentionSeconds += event.video_current_time;
      retentionEventCount++;
    });

    let averageRetention = 0;
    if (retentionEventCount > 0) {
      averageRetention = (totalRetentionSeconds / retentionEventCount) / (retentionEvents[0]?.total_duration || 1) * 100;
    }

    const ctr = totalViews > 0 ? (ctaClicks / totalViews) * 100 : 0;

    return {
      videoUrl,
      blurViews,
      totalViews,
      completedViews,
      averageWatchTime: parseFloat(averageWatchTime.toFixed(2)),
      ctaClicks,
      ctr: parseFloat(ctr.toFixed(2)),
      averageRetention: parseFloat(averageRetention.toFixed(2)),
      lastUpdated: new Date().toISOString(),
    };
  } catch (err) {
    console.debug("Analytics: Erro ao obter métricas", err);
    return null;
  }
};

// Obter dados de retenção para gráfico
export const getRetentionData = async (videoUrl: string) => {
  if (!supabaseUrl || !supabaseAnonKey) return [];

  try {
    const { data, error } = await supabase
      .from('video_retention_aggregated')
      .select('second_position, viewer_count')
      .eq('video_url', videoUrl)
      .order('second_position', { ascending: true });

    if (error) {
      console.debug('Analytics: Dados de retenção indisponíveis', error.message);
      return [];
    }

    return data || [];
  } catch (err) {
    console.debug('Analytics: Erro ao obter retenção', err);
    return [];
  }
};

// Obter análise por dispositivo
export const getDeviceAnalytics = async (videoUrl: string) => {
  if (!supabaseUrl || !supabaseAnonKey) return [];

  try {
    const { data, error } = await supabase
      .from('device_analytics')
      .select('*')
      .eq('video_url', videoUrl);

    if (error) {
      console.debug('Analytics: Análise de dispositivo indisponível', error.message);
      return [];
    }

    return data || [];
  } catch (err) {
    console.debug('Analytics: Erro ao obter análise de dispositivo', err);
    return [];
  }
};

// Obter taxa de conversão por segundo
export const getConversionBySecond = async (videoUrl: string) => {
  if (!supabaseUrl || !supabaseAnonKey) return [];

  try {
    const { data, error } = await supabase
      .from('conversion_by_second')
      .select('*')
      .eq('video_url', videoUrl)
      .order('video_percentage', { ascending: true });

    if (error) {
      console.debug('Analytics: Conversão por segundo indisponível', error.message);
      return [];
    }

    return data || [];
  } catch (err) {
    console.debug('Analytics: Erro ao obter conversão por segundo', err);
    return [];
  }
};

// Monitorar mudanças em tempo real (Sintaxe correta Supabase v2)
export const subscribeToVideoEvents = (videoUrl: string, callback: (payload: any) => void) => {
  if (!supabaseUrl || !supabaseAnonKey) return null;

  try {
    const channel = supabase
      .channel('video-updates')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'video_events',
          filter: `video_url=eq.${videoUrl}`,
        },
        (payload) => {
          callback(payload);
        }
      )
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          console.debug('Analytics: Monitoramento em tempo real ativo');
        } else if (status === 'CHANNEL_ERROR') {
          console.debug('Analytics: Monitoramento em tempo real indisponível');
        }
      });

    return channel;
  } catch (err) {
    console.debug('Analytics: Erro ao ativar monitoramento em tempo real', err);
    return null;
  }
};
