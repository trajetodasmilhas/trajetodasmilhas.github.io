import React from 'react';
import { useContent } from '../../context/ContentContext';
import InputField from './InputField';
import TextAreaField from './TextAreaField';
import EditorSection from './EditorSection';
import { ShieldCheck } from 'lucide-react';

const GuaranteeEditor: React.FC = () => {
  const { content, updateContent } = useContent();
  const { guarantee } = content;

  const handleChange = (field: string, value: any) => {
    updateContent({
      ...content,
      guarantee: { ...guarantee, [field]: value }
    });
  };

  return (
    <EditorSection 
      title="Garantia" 
      description="Reduza a barreira de entrada com uma garantia incondicional."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <InputField 
          label="Título da Garantia" 
          value={guarantee.title} 
          onChange={(val) => handleChange('title', val)}
          placeholder="Ex: 7 Dias de Garantia Incondicional"
          icon={<ShieldCheck size={14} />}
        />
        <InputField 
          label="Dias de Garantia" 
          value={guarantee.days.toString()} 
          onChange={(val) => handleChange('days', parseInt(val) || 0)}
          placeholder="Ex: 7"
          type="number"
        />
      </div>

      <TextAreaField 
        label="Descrição da Garantia" 
        value={guarantee.description} 
        onChange={(val) => handleChange('description', val)}
        placeholder="Explique como funciona o reembolso"
        rows={6}
      />
    </EditorSection>
  );
};

export default GuaranteeEditor;
