import React from 'react';
import { motion } from 'motion/react';

interface EditorSectionProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const EditorSection: React.FC<EditorSectionProps> = ({ title, description, children }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8 pb-20"
    >
      <div className="border-b border-white/5 pb-8">
        <h2 className="text-3xl font-black tracking-tighter uppercase mb-2">
          EDITAR SEÇÃO <span className="text-[#00D4FF]">{title}</span>
        </h2>
        <p className="text-[#8BA3C0] text-sm font-mono uppercase tracking-widest opacity-60">
          {description}
        </p>
      </div>

      <div className="space-y-10">
        {children}
      </div>
    </motion.div>
  );
};

export default EditorSection;
