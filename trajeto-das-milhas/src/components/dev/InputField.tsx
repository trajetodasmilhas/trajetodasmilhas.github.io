import React from 'react';
import { motion } from 'motion/react';

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  icon?: React.ReactNode;
  preview?: React.ReactNode;
}

const InputField: React.FC<InputFieldProps> = ({ 
  label, 
  value, 
  onChange, 
  placeholder, 
  type = 'text',
  icon,
  preview
}) => {
  return (
    <div className="space-y-2 group">
      <div className="flex items-center justify-between">
        <label className="text-xs font-mono uppercase tracking-widest text-[#8BA3C0] group-focus-within:text-[#00D4FF] transition-colors">
          {label}
        </label>
        {icon && <div className="text-[#8BA3C0] group-focus-within:text-[#00D4FF] transition-colors">{icon}</div>}
      </div>
      <div className="flex gap-4 items-start">
        <div className="relative flex-1">
          <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full bg-[#0D1526] border border-white/10 rounded-lg px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF]/50 transition-all placeholder:text-white/20"
          />
          <motion.div 
            className="absolute bottom-0 left-0 h-[2px] bg-[#00D4FF] shadow-[0_0_10px_#00D4FF]"
            initial={{ width: 0 }}
            whileInFocus={{ width: '100%' }}
          />
        </div>
        {preview && (
          <div className="w-12 h-12 rounded-lg overflow-hidden border border-white/10 bg-[#0D1526] flex-shrink-0">
            {preview}
          </div>
        )}
      </div>
    </div>
  );
};

export default InputField;
