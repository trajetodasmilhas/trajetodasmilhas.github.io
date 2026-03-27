import React from 'react';
import { useDraft } from './AdminPanel';
import InputField from './InputField';
import TextAreaField from './TextAreaField';
import EditorSection from './EditorSection';
import ListItemEditor from './ListItemEditor';

const FAQEditor: React.FC = () => {
  const { draft, updateDraft } = useDraft();
  const { faq } = draft;

  const handleUpdate = (newFaq: typeof faq) => {
    updateDraft({
      ...draft,
      faq: newFaq
    });
  };

  const handleItemChange = (id: string, field: string, value: string) => {
    const newFaq = faq.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    );
    handleUpdate(newFaq);
  };

  const newItemTemplate = () => ({
    id: Date.now().toString(),
    question: 'Nova Pergunta',
    answer: 'Resposta detalhada para a nova pergunta.'
  });

  return (
    <EditorSection 
      title="FAQ" 
      description="Tire as últimas dúvidas dos seus clientes para fechar a venda."
    >
      <ListItemEditor
        title="LISTA DE PERGUNTAS FREQUENTES"
        items={faq}
        onUpdate={handleUpdate}
        newItemTemplate={newItemTemplate}
        renderItem={(item) => (
          <div className="space-y-6">
            <InputField 
              label="Pergunta" 
              value={item.question} 
              onChange={(val) => handleItemChange(item.id, 'question', val)}
              placeholder="Ex: Como recebo os alertas?"
            />
            <TextAreaField 
              label="Resposta" 
              value={item.answer} 
              onChange={(val) => handleItemChange(item.id, 'answer', val)}
              placeholder="Explique a resposta detalhadamente"
              rows={4}
            />
          </div>
        )}
      />
    </EditorSection>
  );
};

export default FAQEditor;
