import React from 'react';
import { useContent } from '../../context/ContentContext';
import InputField from './InputField';
import TextAreaField from './TextAreaField';
import EditorSection from './EditorSection';
import ListItemEditor from './ListItemEditor';
import { Star } from 'lucide-react';

const TestimonialsEditor: React.FC = () => {
  const { content, updateContent } = useContent();
  const { testimonials } = content;

  const handleUpdate = (newTestimonials: typeof testimonials) => {
    updateContent({
      ...content,
      testimonials: newTestimonials
    });
  };

  const handleItemChange = (id: string, field: string, value: any) => {
    const newTestimonials = testimonials.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    );
    handleUpdate(newTestimonials);
  };

  const newItemTemplate = () => ({
    id: Date.now().toString(),
    name: 'Novo Membro',
    role: 'Viajante',
    avatarUrl: 'https://i.pravatar.cc/150?u=' + Date.now(),
    text: 'Minha experiência com o grupo foi incrível!',
    stars: 5
  });

  return (
    <EditorSection 
      title="Depoimentos" 
      description="A prova social é essencial. Adicione relatos reais de membros do grupo."
    >
      <ListItemEditor
        title="LISTA DE DEPOIMENTOS"
        items={testimonials}
        onUpdate={handleUpdate}
        newItemTemplate={newItemTemplate}
        renderItem={(item) => (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField 
                label="Nome do Membro" 
                value={item.name} 
                onChange={(val) => handleItemChange(item.id, 'name', val)}
                placeholder="Ex: Ricardo Silva"
              />
              <InputField 
                label="Cargo ou Perfil" 
                value={item.role} 
                onChange={(val) => handleItemChange(item.id, 'role', val)}
                placeholder="Ex: Empresário"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField 
                label="URL do Avatar" 
                value={item.avatarUrl} 
                onChange={(val) => handleItemChange(item.id, 'avatarUrl', val)}
                placeholder="https://i.pravatar.cc/..."
                preview={
                  <img 
                    src={item.avatarUrl} 
                    className="w-full h-full object-cover" 
                    alt="Avatar"
                    referrerPolicy="no-referrer"
                  />
                }
              />
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-widest text-[#8BA3C0]">Avaliação (Estrelas)</label>
                <div className="flex gap-2 p-3 bg-[#0D1526] border border-white/10 rounded-lg">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => handleItemChange(item.id, 'stars', star)}
                      className={`transition-all ${item.stars >= star ? 'text-yellow-400' : 'text-white/10'}`}
                    >
                      <Star size={20} fill={item.stars >= star ? 'currentColor' : 'none'} />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <TextAreaField 
              label="Texto do Depoimento" 
              value={item.text} 
              onChange={(val) => handleItemChange(item.id, 'text', val)}
              placeholder="O que o membro disse sobre o grupo"
              rows={4}
            />
          </div>
        )}
      />
    </EditorSection>
  );
};

export default TestimonialsEditor;
