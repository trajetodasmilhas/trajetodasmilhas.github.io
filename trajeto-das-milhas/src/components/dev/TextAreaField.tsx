import React from 'react';
import { motion } from 'motion/react';

interface TextAreaFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}

const TextAreaField: React.FC<TextAreaFieldProps> = ({ 
  label, 
  value, 
  onChange, 
  placeholder, 
  rows = 4 
}) => {
  return (
    <div className="space-y-2 group">
      <label className="text-xs font-mono uppercase tracking-widest text-[#8BA3C0] group-focus-within:text-[#00D4FF] transition-colors">
        {label}
      </label>
      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          className="w-full bg-[#0D1526] border border-white/10 rounded-lg px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF]/50 transition-all placeholder:text-white/20 resize-none"
        />
        <motion.div 
          className="absolute bottom-0 left-0 h-[2px] bg-[#00D4FF] shadow-[0_0_10px_#00D4FF]"
          initial={{ width: 0 }}
          whileInFocus={{ width: '100%' }}
        />
      </div>
    </div>
  );
};

export default TextAreaField;
