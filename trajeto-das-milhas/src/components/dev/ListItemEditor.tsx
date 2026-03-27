import React from 'react';
import { motion, Reorder } from 'motion/react';
import { Plus, Trash2, ArrowUp, ArrowDown, GripVertical } from 'lucide-react';

interface ListItemEditorProps<T> {
  items: T[];
  onUpdate: (items: T[]) => void;
  renderItem: (item: T, index: number) => React.ReactNode;
  newItemTemplate: () => T;
  title: string;
}

function ListItemEditor<T extends { id: string }>({ 
  items, 
  onUpdate, 
  renderItem, 
  newItemTemplate,
  title
}: ListItemEditorProps<T>) {
  const handleAdd = () => {
    onUpdate([...items, newItemTemplate()]);
  };

  const handleRemove = (id: string) => {
    onUpdate(items.filter(item => item.id !== id));
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const newItems = [...items];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= items.length) return;
    [newItems[index], newItems[targetIndex]] = [newItems[targetIndex], newItems[index]];
    onUpdate(newItems);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-mono uppercase tracking-widest text-[#00D4FF] font-bold">
          {title} ({items.length})
        </h3>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 bg-[#00D4FF]/10 text-[#00D4FF] border border-[#00D4FF]/20 rounded-lg hover:bg-[#00D4FF] hover:text-[#050A14] transition-all font-bold text-xs"
        >
          <Plus size={14} /> ADICIONAR ITEM
        </button>
      </div>

      <div className="space-y-4">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="group relative bg-[#0D1526]/50 border border-white/5 rounded-xl p-6 backdrop-blur-md hover:border-[#00D4FF]/20 transition-all"
          >
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                onClick={() => handleMove(index, 'up')}
                disabled={index === 0}
                className="p-1 bg-[#0D1526] border border-white/10 rounded-md text-[#8BA3C0] hover:text-[#00D4FF] disabled:opacity-30"
              >
                <ArrowUp size={14} />
              </button>
              <button 
                onClick={() => handleMove(index, 'down')}
                disabled={index === items.length - 1}
                className="p-1 bg-[#0D1526] border border-white/10 rounded-md text-[#8BA3C0] hover:text-[#00D4FF] disabled:opacity-30"
              >
                <ArrowDown size={14} />
              </button>
            </div>

            <div className="flex gap-6">
              <div className="flex-1">
                {renderItem(item, index)}
              </div>
              <button
                onClick={() => handleRemove(item.id)}
                className="self-start p-2 text-[#8BA3C0] hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default ListItemEditor;
