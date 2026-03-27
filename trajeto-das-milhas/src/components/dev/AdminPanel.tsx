import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useContent } from '../../context/ContentContext';
import { login, logout } from '../../firebase';
import { LogIn, LogOut, ShieldAlert, Loader2 } from 'lucide-react';
import Sidebar from './Sidebar';
import HeaderDev from './HeaderDev';
import HeroEditor from './HeroEditor';
import WhatIsEditor from './WhatIsEditor';
import BenefitsEditor from './BenefitsEditor';
import TestimonialsEditor from './TestimonialsEditor';
import PricingEditor from './PricingEditor';
import BonusesEditor from './BonusesEditor';
import GuaranteeEditor from './GuaranteeEditor';
import AboutEditor from './AboutEditor';
import FAQEditor from './FAQEditor';

const AdminPanel: React.FC = () => {
  const { content, updateContent, user, isAuthReady } = useContent();
  const [activeTab, setActiveTab] = useState('hero');

  const isAdmin = user?.email === "trajetto@colegionascimentocn.com.br";

  const handleSave = () => {
    updateContent(content);
  };

  if (!isAuthReady) {
    return (
      <div className="min-h-screen bg-[#050A14] flex items-center justify-center">
        <Loader2 className="text-[#00D4FF] animate-spin" size={48} />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#050A14] flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full p-8 rounded-2xl bg-[#0D1526] border border-white/10 text-center space-y-8 shadow-2xl"
        >
          <div className="w-20 h-20 bg-[#00D4FF]/10 rounded-full flex items-center justify-center mx-auto">
            <LogIn className="text-[#00D4FF]" size={32} />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-black uppercase tracking-tighter">ACESSO RESTRITO</h2>
            <p className="text-[#8BA3C0] text-sm">Faça login com sua conta Google para gerenciar o Trajeto das Milhas.</p>
          </div>
          <button 
            onClick={login}
            className="w-full py-4 bg-[#00D4FF] text-[#050A14] rounded-xl font-black text-sm hover:shadow-[0_0_30px_rgba(0,212,255,0.4)] transition-all transform hover:scale-[1.02]"
          >
            ENTRAR COM GOOGLE
          </button>
        </motion.div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#050A14] flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full p-8 rounded-2xl bg-[#0D1526] border border-red-500/20 text-center space-y-8 shadow-2xl"
        >
          <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto">
            <ShieldAlert className="text-red-500" size={32} />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-black uppercase tracking-tighter text-red-500">ACESSO NEGADO</h2>
            <p className="text-[#8BA3C0] text-sm">Sua conta ({user.email}) não tem permissão de administrador.</p>
          </div>
          <button 
            onClick={logout}
            className="w-full py-4 bg-white/5 text-white border border-white/10 rounded-xl font-black text-sm hover:bg-white/10 transition-all"
          >
            SAIR DA CONTA
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050A14] text-white flex flex-col font-sans selection:bg-[#00D4FF] selection:text-[#050A14]">
      {/* Background Grid */}
      <div className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#00D4FF 1px, transparent 1px), linear-gradient(90deg, #00D4FF 1px, transparent 1px)', backgroundSize: '50px 50px' }}>
      </div>

      <HeaderDev content={content} onSave={handleSave} />

      <div className="flex flex-1 overflow-hidden relative z-10">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        <main className="flex-1 overflow-y-auto bg-[#050A14]/50 backdrop-blur-sm">
          <div className="max-w-5xl mx-auto p-12">
            <div className="flex justify-end mb-4">
              <button 
                onClick={logout}
                className="flex items-center gap-2 text-[10px] font-mono text-[#8BA3C0] hover:text-white transition-colors uppercase tracking-widest"
              >
                <LogOut size={12} /> Sair ({user.email})
              </button>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {activeTab === 'hero' && <HeroEditor />}
                {activeTab === 'whatis' && <WhatIsEditor />}
                {activeTab === 'benefits' && <BenefitsEditor />}
                {activeTab === 'testimonials' && <TestimonialsEditor />}
                {activeTab === 'pricing' && <PricingEditor />}
                {activeTab === 'bonuses' && <BonusesEditor />}
                {activeTab === 'guarantee' && <GuaranteeEditor />}
                {activeTab === 'about' && <AboutEditor />}
                {activeTab === 'faq' && <FAQEditor />}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;
