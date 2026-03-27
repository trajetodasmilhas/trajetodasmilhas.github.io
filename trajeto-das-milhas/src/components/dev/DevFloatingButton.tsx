import React from 'react';
import { motion } from 'motion/react';
import { Terminal } from 'lucide-react';

const DevFloatingButton: React.FC = () => {
  return (
    <motion.a
      href="#/dev"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1, shadow: "0 0 20px rgba(0, 212, 255, 0.5)" }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-8 right-8 z-[9999] w-14 h-14 bg-[#0D1526]/80 backdrop-blur-md border border-[#00D4FF]/30 rounded-full flex items-center justify-center text-[#00D4FF] shadow-2xl transition-colors hover:bg-[#00D4FF]/10"
      title="Acessar Painel Admin"
    >
      <Terminal size={24} />
      <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#00FF94] rounded-full animate-pulse shadow-[0_0_10px_#00FF94]" />
    </motion.a>
  );
};

export default DevFloatingButton;
