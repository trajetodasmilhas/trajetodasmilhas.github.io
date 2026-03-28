import React, { useState } from 'react';
import { Link2, AlertCircle } from 'lucide-react';

interface VideoUploadProps {
  onUploadSuccess: (url: string) => void;
  currentUrl?: string;
  label?: string;
}

/**
 * Componente simplificado de URL de Vídeo
 * Permite colar links de vídeo de qualquer fonte (YouTube, Vimeo, etc.)
 * Sem complicações de upload ou configurações de CORS.
 */
const VideoUpload: React.FC<VideoUploadProps> = ({ 
  onUploadSuccess, 
  currentUrl = '',
  label = "URL do Vídeo" 
}) => {
  const [url, setUrl] = useState(currentUrl);
  const [error, setError] = useState<string | null>(null);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value;
    setUrl(newUrl);
    setError(null);
  };

  const handleSave = () => {
    if (!url.trim()) {
      setError('Por favor, cole uma URL de vídeo válida.');
      return;
    }

    // Validar que é uma URL válida
    try {
      new URL(url);
    } catch {
      setError('URL inválida. Verifique se começou com https://');
      return;
    }

    onUploadSuccess(url);
    setError(null);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    }
  };

  return (
    <div className="flex flex-col gap-3 mt-4 p-4 bg-[#0A1221] border border-[#00D4FF]/10 rounded-xl">
      <div className="flex items-center gap-2 text-[#00D4FF] mb-1">
        <Link2 size={16} />
        <label className="text-sm font-bold uppercase tracking-wider">{label}</label>
      </div>
      
      <div className="flex flex-col gap-2">
        <input
          type="text"
          value={url}
          onChange={handleUrlChange}
          onKeyPress={handleKeyPress}
          placeholder="Cole a URL do seu vídeo aqui (YouTube, Vimeo, etc.)"
          className="px-4 py-3 bg-[#0D1526] border border-[#00D4FF]/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF]/50 transition-all"
        />
        
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-[#00D4FF] text-black font-bold rounded-lg hover:bg-[#00D4FF]/90 transition-all"
        >
          Atualizar Vídeo
        </button>

        {error && (
          <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
            <AlertCircle size={16} className="flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {url && !error && (
          <div className="text-xs text-gray-400 p-2 bg-[#0D1526] rounded-lg">
            ✓ URL salva: {url.substring(0, 50)}...
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoUpload;
