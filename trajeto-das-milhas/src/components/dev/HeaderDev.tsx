import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Save, Download, ExternalLink, Check, Terminal } from 'lucide-react';
import { SiteContent } from '../../types';

interface HeaderDevProps {
  content: SiteContent;
  onSave: () => void;
}

const HeaderDev: React.FC<HeaderDevProps> = ({ content, onSave }) => {
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = () => {
    onSave();
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(content, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "trajeto_content.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handlePreview = () => {
    window.open('/#/', '_blank');
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0D1526]/80 backdrop-blur-xl border-b border-white/5 p-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00D4FF] to-[#7B2FFF] flex items-center justify-center shadow-[0_0_20px_rgba(0,212,255,0.3)]">
          <Terminal size={20} className="text-[#050A14]" />
        </div>
        <div>
          <h1 className="text-sm font-black tracking-tighter uppercase">PAINEL ADMIN <span className="text-[#00D4FF]">TRAJETO</span></h1>
          <p className="text-[10px] font-mono text-[#8BA3C0] uppercase tracking-widest">Vibe Coding Mode v1.0</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button 
          onClick={handlePreview}
          className="flex items-center gap-2 px-4 py-2 bg-white/5 text-white rounded-lg font-bold text-xs hover:bg-white/10 transition-all border border-white/10"
        >
          <ExternalLink size={14} /> VISUALIZAR LANDING PAGE
        </button>
        <button 
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2 bg-white/5 text-white rounded-lg font-bold text-xs hover:bg-white/10 transition-all border border-white/10"
        >
          <Download size={14} /> EXPORTAR JSON
        </button>
        <button 
          onClick={handleSave}
          className="relative flex items-center gap-2 px-6 py-2 bg-[#00D4FF] text-[#050A14] rounded-lg font-black text-xs hover:shadow-[0_0_30px_rgba(0,212,255,0.5)] transition-all transform hover:scale-105 overflow-hidden"
        >
          <AnimatePresence mode="wait">
            {showSuccess ? (
              <motion.div 
                key="success"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                className="flex items-center gap-2"
              >
                <Check size={14} /> SALVO!
              </motion.div>
            ) : (
              <motion.div 
                key="save"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                className="flex items-center gap-2"
              >
                <Save size={14} /> SALVAR NO NAVEGADOR
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>
    </header>
  );
};

export default HeaderDev;
