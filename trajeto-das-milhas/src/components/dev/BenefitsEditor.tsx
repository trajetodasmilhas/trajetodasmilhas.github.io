import React from 'react';
import { useDraft } from './AdminPanel';
import InputField from './InputField';
import TextAreaField from './TextAreaField';
import EditorSection from './EditorSection';
import ListItemEditor from './ListItemEditor';
import * as LucideIcons from 'lucide-react';

const BenefitsEditor: React.FC = () => {
  const { draft, updateDraft } = useDraft();
  const { benefits } = draft;

  const handleUpdate = (newBenefits: typeof benefits) => {
    updateDraft({
      ...draft,
      benefits: newBenefits
    });
  };

  const handleItemChange = (id: string, field: string, value: string) => {
    const newBenefits = benefits.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    );
    handleUpdate(newBenefits);
  };

  const newItemTemplate = () => ({
    id: Date.now().toString(),
    icon: 'Bell',
    title: 'Novo Benefício',
    description: 'Descrição do novo benefício oferecido pelo grupo.'
  });

  return (
    <EditorSection 
      title="Benefícios" 
      description="Destaque as principais vantagens de entrar no grupo VIP."
    >
      <ListItemEditor
        title="LISTA DE BENEFÍCIOS"
        items={benefits}
        onUpdate={handleUpdate}
        newItemTemplate={newItemTemplate}
        renderItem={(item) => {
          const Icon = (LucideIcons as any)[item.icon] || LucideIcons.HelpCircle;
          return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <InputField 
                  label="Nome do Ícone (Lucide)" 
                  value={item.icon} 
                  onChange={(val) => handleItemChange(item.id, 'icon', val)}
                  placeholder="Ex: Bell, Plane, Star"
                  preview={
                    <div className="w-full h-full flex items-center justify-center text-[#00D4FF]">
                      <Icon size={24} />
                    </div>
                  }
                />
                <InputField 
                  label="Título do Benefício" 
                  value={item.title} 
                  onChange={(val) => handleItemChange(item.id, 'title', val)}
                  placeholder="Ex: Alertas Diários"
                />
              </div>
              <TextAreaField 
                label="Descrição" 
                value={item.description} 
                onChange={(val) => handleItemChange(item.id, 'description', val)}
                placeholder="Explique o benefício"
                rows={4}
              />
            </div>
          );
        }}
      />
    </EditorSection>
  );
};

export default BenefitsEditor;
