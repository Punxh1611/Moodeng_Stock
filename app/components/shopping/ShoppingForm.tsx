import React, { useState } from 'react';
import { Item, CartItem, CATEGORIES, UNITS, Category } from '~/lib/types';
import { DoodleButton } from '~/components/ui/DoodleButton';
import { ToastAlert } from '~/components/ui/ToastAlert';

interface ShoppingFormProps {
  items: Item[];
  onAddToCart: (item: CartItem) => void;
}

export function ShoppingForm({ items, onAddToCart }: ShoppingFormProps) {
  const [selectedItemId, setSelectedItemId] = useState<string>('');
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState<Category>(CATEGORIES[0]);
  const [newUnit, setNewUnit] = useState(UNITS[0]);
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const isNew = selectedItemId === 'new';
  const selectedItem = items.find(i => i.id === selectedItemId);

  const handleSubmit = () => {
    if (!selectedItemId) {
      setErrorMsg('กรุณาเลือกของ');
      return;
    }
    if (isNew && !newName.trim()) {
      setErrorMsg('กรุณาใส่ชื่อของใหม่');
      return;
    }
    
    const cartItem: CartItem = isNew 
      ? {
          item_id: `temp_${Date.now()}`,
          item_name: newName,
          quantity: Number(quantity),
          price_paid: Number(price) || 0,
          is_new: true,
          category: newCategory,
          unit: newUnit
        }
      : {
          item_id: selectedItem!.id,
          item_name: selectedItem!.name,
          quantity: Number(quantity),
          price_paid: Number(price) || 0,
          is_new: false,
          unit: selectedItem!.unit
        };

    onAddToCart(cartItem);
    
    // reset form
    setSelectedItemId('');
    setNewName('');
    setQuantity(1);
    setPrice('');
  };

  return (
    <div className="relative mt-6 font-hand">
      {/* Basket Handle */}
      <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-32 h-7 border-[3px] border-b-0 border-ink rounded-t-2xl bg-piggy/30 z-0"></div>
      
      {/* Basket Body */}
      <div className="relative z-10 p-5 sm:p-6 bg-white border-[2.5px] border-ink rounded-3xl shadow-[0_4px_0_#3D3329] flex flex-col gap-4">
        <div className="flex items-center justify-center gap-2 border-b-2 border-dashed border-ink/20 pb-3">
          <span className="text-2xl">🧺</span>
          <h3 className="text-xl sm:text-2xl font-bold text-ink">หยิบของใส่ตะกร้า</h3>
        </div>
        
        <div>
          <label className="block text-ink font-bold mb-1.5 text-sm sm:text-base">เลือกของที่จะซื้อ</label>
          <div className="relative">
            <select 
              value={selectedItemId} 
              onChange={e => setSelectedItemId(e.target.value)}
              className="w-full appearance-none bg-paper border-2 border-ink text-ink rounded-2xl p-3 pr-10 shadow-xs cursor-pointer focus:outline-none focus:ring-3 focus:ring-piggy font-medium text-base"
            >
              <option value="" disabled>-- กดเลือกของในสต็อก --</option>
              {items.map(item => (
                <option key={item.id} value={item.id}>{item.name} ({item.quantity} {item.unit})</option>
              ))}
              <option value="new">✨ + เพิ่มเป็นของใหม่</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-ink">
              ▼
            </div>
          </div>
        </div>

        {isNew && (
          <div className="flex flex-col gap-3 p-4 bg-white border-2 border-piggy rounded-xl shadow-inner">
            <input 
              type="text" 
              placeholder="ชื่อของใหม่" 
              value={newName} 
              onChange={e => setNewName(e.target.value)} 
              className="w-full bg-paper border-2 border-piggy-dark rounded-xl p-3 focus:outline-none focus:ring-4 focus:ring-piggy/30" 
            />
            <div className="flex gap-2">
              <div className="relative flex-1">
                <select value={newCategory} onChange={e => setNewCategory(e.target.value as Category)} className="w-full appearance-none bg-paper border-2 border-piggy-dark rounded-xl p-3 cursor-pointer focus:outline-none focus:ring-4 focus:ring-piggy/30">
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="relative flex-1">
                <select value={newUnit} onChange={e => setNewUnit(e.target.value)} className="w-full appearance-none bg-paper border-2 border-piggy-dark rounded-xl p-3 cursor-pointer focus:outline-none focus:ring-4 focus:ring-piggy/30">
                  {UNITS.map(u => <option key={u} value={u}>{u}</option>)}
                </select>
              </div>
            </div>
          </div>
        )}

        {selectedItem && (
          <div className="text-sm text-piggy-dark bg-white px-3 py-1 rounded-full w-fit border border-piggy/50 shadow-sm">
            มีในสต็อก: {selectedItem.quantity} {selectedItem.unit}
          </div>
        )}

        <div className="flex gap-3">
          <div className="flex-1">
            <label className="block text-ink font-bold mb-1 text-sm sm:text-base">จำนวน</label>
            <div className="flex items-center gap-2">
              <input 
                type="number" 
                min="1" 
                value={quantity} 
                onChange={e => setQuantity(Number(e.target.value))} 
                className="w-full bg-paper border-2 border-ink rounded-2xl p-2.5 sm:p-3 focus:outline-none focus:ring-3 focus:ring-piggy font-bold text-base" 
              />
              <span className="text-ink font-bold text-sm sm:text-base shrink-0">{isNew ? newUnit : selectedItem?.unit || 'ชิ้น'}</span>
            </div>
          </div>
          <div className="flex-1">
            <label className="block text-ink font-bold mb-1 text-sm sm:text-base">ราคา (บาท)</label>
            <input 
              type="number" 
              min="0" 
              value={price} 
              onChange={e => setPrice(e.target.value)} 
              placeholder="0" 
              className="w-full bg-paper border-2 border-ink rounded-2xl p-2.5 sm:p-3 focus:outline-none focus:ring-3 focus:ring-piggy font-bold text-base" 
            />
          </div>
        </div>

        <DoodleButton 
          variant="primary" 
          onClick={handleSubmit} 
          disabled={!selectedItemId} 
          className="mt-2 w-full text-lg sm:text-xl py-3 shadow-[0_3px_0_#3D3329]"
        >
          + หยิบใส่ตะกร้า
        </DoodleButton>
      </div>
      
      {errorMsg && <ToastAlert message={errorMsg} onClose={() => setErrorMsg(null)} />}
    </div>
  );
}
