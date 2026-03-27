import React from 'react';
import { useContent } from '../../context/ContentContext';
import InputField from './InputField';
import EditorSection from './EditorSection';
import { Plus, Trash2, CheckCircle2 } from 'lucide-react';

const PricingEditor: React.FC = () => {
  const { content, updateContent } = useContent();
  const { pricing } = content;

  const handleUpdate = (newPricing: typeof pricing) => {
    updateContent({
      ...content,
      pricing: newPricing
    });
  };

  const handlePlanChange = (id: string, field: string, value: any) => {
    const newPlans = pricing.plans.map(plan => 
      plan.id === id ? { ...plan, [field]: value } : plan
    );
    handleUpdate({ ...pricing, plans: newPlans });
  };

  const handleFeatureChange = (planId: string, index: number, value: string) => {
    const newPlans = pricing.plans.map(plan => {
      if (plan.id === planId) {
        const newFeatures = [...plan.features];
        newFeatures[index] = value;
        return { ...plan, features: newFeatures };
      }
      return plan;
    });
    handleUpdate({ ...pricing, plans: newPlans });
  };

  const addFeature = (planId: string) => {
    const newPlans = pricing.plans.map(plan => {
      if (plan.id === planId) {
        return { ...plan, features: [...plan.features, 'Nova Feature'] };
      }
      return plan;
    });
    handleUpdate({ ...pricing, plans: newPlans });
  };

  const removeFeature = (planId: string, index: number) => {
    const newPlans = pricing.plans.map(plan => {
      if (plan.id === planId) {
        return { ...plan, features: plan.features.filter((_, i) => i !== index) };
      }
      return plan;
    });
    handleUpdate({ ...pricing, plans: newPlans });
  };

  return (
    <EditorSection 
      title="Preços" 
      description="Configure os planos de assinatura e as vantagens de cada um."
    >
      <InputField 
        label="Título da Seção de Preços" 
        value={pricing.sectionTitle} 
        onChange={(val) => handleUpdate({ ...pricing, sectionTitle: val })}
        placeholder="Ex: Escolha o Plano Ideal"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {pricing.plans.map((plan) => (
          <div 
            key={plan.id} 
            className={`p-8 rounded-2xl bg-[#0D1526]/50 border transition-all ${
              plan.highlighted ? 'border-[#00D4FF] shadow-[0_0_30px_rgba(0,212,255,0.1)]' : 'border-white/5'
            }`}
          >
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-black text-white uppercase tracking-tighter">{plan.name}</h3>
              <button
                onClick={() => handlePlanChange(plan.id, 'highlighted', !plan.highlighted)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                  plan.highlighted ? 'bg-[#00D4FF] text-[#050A14]' : 'bg-white/5 text-[#8BA3C0] border border-white/10'
                }`}
              >
                {plan.highlighted ? 'DESTACADO' : 'DESTACAR'}
              </button>
            </div>

            <div className="space-y-6">
              <InputField 
                label="Nome do Plano" 
                value={plan.name} 
                onChange={(val) => handlePlanChange(plan.id, 'name', val)}
                placeholder="Ex: Plano Anual"
              />
              <InputField 
                label="Período de Acesso" 
                value={plan.period} 
                onChange={(val) => handlePlanChange(plan.id, 'period', val)}
                placeholder="Ex: 12 Meses de Acesso"
              />
              <div className="grid grid-cols-2 gap-4">
                <InputField 
                  label="Parcelamento" 
                  value={plan.installments} 
                  onChange={(val) => handlePlanChange(plan.id, 'installments', val)}
                  placeholder="Ex: 12x R$ 46,89"
                />
                <InputField 
                  label="Preço à Vista" 
                  value={plan.totalPrice} 
                  onChange={(val) => handlePlanChange(plan.id, 'totalPrice', val)}
                  placeholder="Ex: R$ 447 à vista"
                />
              </div>
              <InputField 
                label="Link de Checkout" 
                value={plan.checkoutLink} 
                onChange={(val) => handlePlanChange(plan.id, 'checkoutLink', val)}
                placeholder="https://pay.hotmart.com/..."
              />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-mono uppercase tracking-widest text-[#8BA3C0]">Features do Plano</label>
                  <button 
                    onClick={() => addFeature(plan.id)}
                    className="p-1 text-[#00D4FF] hover:bg-[#00D4FF]/10 rounded-md transition-all"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <div className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle2 size={16} className="text-[#00D4FF] flex-shrink-0" />
                      <input 
                        type="text" 
                        value={feature}
                        onChange={(e) => handleFeatureChange(plan.id, index, e.target.value)}
                        className="flex-1 bg-transparent border-b border-white/5 py-1 text-sm text-white focus:outline-none focus:border-[#00D4FF] transition-all"
                      />
                      <button 
                        onClick={() => removeFeature(plan.id, index)}
                        className="p-1 text-[#8BA3C0] hover:text-red-500 transition-all"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </EditorSection>
  );
};

export default PricingEditor;
