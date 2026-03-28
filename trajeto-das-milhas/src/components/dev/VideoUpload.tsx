import React, { useState } from 'react';
import { Upload, Loader2, Check, AlertCircle, Video } from 'lucide-react';

interface VideoUploadProps {
  onUploadSuccess: (url: string) => void;
  label?: string;
}

// Configurações do Cloudinary (Upload Unsigned)
const CLOUDINARY_UPLOAD_PRESET = 'ml_default'; // Preset padrão para upload não assinado
const CLOUDINARY_CLOUD_NAME = 'demo'; // Substituir pelo seu Cloud Name se necessário

const VideoUpload: React.FC<VideoUploadProps> = ({ onUploadSuccess, label = "Upload de Vídeo" }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validar tamanho (ex: max 50MB para demos/free tiers)
    if (file.size > 50 * 1024 * 1024) {
      setError('Vídeo muito grande (máx 50MB).');
      return;
    }

    setIsUploading(true);
    setError(null);
    setSuccess(false);
    setProgress(0);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    formData.append('resource_type', 'video');

    try {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/video/upload`, true);

      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          const percentComplete = Math.round((e.loaded / e.total) * 100);
          setProgress(percentComplete);
        }
      };

      xhr.onload = () => {
        const response = JSON.parse(xhr.responseText);
        if (xhr.status === 200 && response.secure_url) {
          onUploadSuccess(response.secure_url);
          setSuccess(true);
          setTimeout(() => setSuccess(false), 3000);
        } else {
          setError(response.error?.message || 'Erro no upload. Tente novamente.');
        }
        setIsUploading(false);
      };

      xhr.onerror = () => {
        setError('Erro de conexão. Verifique sua internet.');
        setIsUploading(false);
      };

      xhr.send(formData);
    } catch (err) {
      setError('Erro ao processar upload.');
      setIsUploading(false);
      console.error('Video upload error:', err);
    }
  };

  return (
    <div className="flex flex-col gap-2 mt-4 p-4 bg-[#0A1221] border border-[#00D4FF]/10 rounded-xl">
      <div className="flex items-center gap-2 text-[#00D4FF] mb-1">
        <Video size={16} />
        <label className="text-sm font-bold uppercase tracking-wider">{label}</label>
      </div>
      
      <div className="relative">
        <input
          type="file"
          accept="video/*"
          onChange={handleFileChange}
          className="hidden"
          id="video-upload-input"
          disabled={isUploading}
        />
        <label
          htmlFor="video-upload-input"
          className={`flex flex-col items-center justify-center gap-3 px-6 py-8 rounded-xl border-2 border-dashed transition-all cursor-pointer
            ${isUploading ? 'bg-gray-800/50 border-gray-700 cursor-not-allowed' : 
              success ? 'bg-green-500/10 border-green-500 text-green-500' :
              error ? 'bg-red-500/10 border-red-500 text-red-500' :
              'bg-[#0D1526] border-[#00D4FF]/20 hover:border-[#00D4FF]/50 text-[#00D4FF] hover:bg-[#00D4FF]/5'}
          `}
        >
          {isUploading ? (
            <>
              <Loader2 className="animate-spin" size={24} />
              <div className="text-center">
                <span className="block font-bold">Enviando Vídeo...</span>
                <span className="text-xs opacity-70">{progress}% concluído</span>
              </div>
              <div className="w-full max-w-[200px] h-1.5 bg-gray-700 rounded-full mt-2 overflow-hidden">
                <div 
                  className="h-full bg-[#00D4FF] transition-all duration-300" 
                  style={{ width: `${progress}%` }}
                />
              </div>
            </>
          ) : success ? (
            <>
              <Check size={24} />
              <span className="font-bold">Vídeo pronto e salvo!</span>
            </>
          ) : error ? (
            <>
              <AlertCircle size={24} />
              <span className="font-bold text-center">{error}</span>
              <span className="text-xs opacity-70">Clique para tentar novamente</span>
            </>
          ) : (
            <>
              <Upload size={24} />
              <div className="text-center">
                <span className="block font-bold">Upload Direto de Vídeo</span>
                <span className="text-xs opacity-60">MP4, WebM ou MOV (Máx 50MB)</span>
              </div>
            </>
          )}
        </label>
      </div>
    </div>
  );
};

export default VideoUpload;
