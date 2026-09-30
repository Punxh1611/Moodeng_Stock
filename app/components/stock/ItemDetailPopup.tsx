import React, { useState } from 'react';
import { Item, Category, CATEGORIES, UNITS } from '~/lib/types';
import { DoodleButton } from '~/components/ui/DoodleButton';
import { MooDengMascot } from '~/components/svg/MooDengMascot';
import { ToastAlert } from '~/components/ui/ToastAlert';

interface ItemDetailPopupProps {
  item?: Item | null;
  onSave: (data: Partial<Item>) => void;
  onDelete?: (id: string) => void;
  onClose: () => void;
}

export function ItemDetailPopup({ item, onSave, onDelete, onClose }: ItemDetailPopupProps) {
  const [name, setName] = useState(item?.name || '');
  const [category, setCategory] = useState<Category>(item?.category || CATEGORIES[0]);
  const [quantity, setQuantity] = useState(item?.quantity ?? 1);
  const [unit, setUnit] = useState(item?.unit || UNITS[0]);
  const [lowThreshold, setLowThreshold] = useState(item?.low_threshold ?? 1);
  const [pricePerUnit, setPricePerUnit] = useState(item?.price_per_unit || '');
  const [note, setNote] = useState(item?.note || '');
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSave = () => {
    if (!name.trim()) {
      setErrorMsg('กรุณาใส่ชื่อของ');
      return;
    }
    onSave({
      name: name.trim(),
      category,
      quantity: Number(quantity),
      unit,
      low_threshold: Number(lowThreshold),
      price_per_unit: pricePerUnit ? Number(pricePerUnit) : undefined,
      note
    });
  };

  const confirmDelete = () => {
    if (item && onDelete) {
      onDelete(item.id);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="w-full max-w-md animate-[pop-in_0.3s_ease-out]">
        <div className="bg-pink-50 rounded-[2rem] border-4 border-piggy p-6 sm:p-8 relative flex flex-col gap-5 shadow-xl font-hand">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center font-bold text-ink hover:text-danger hover:bg-white rounded-full transition-colors text-xl z-10"
          >
            ✕
          </button>
          
          {isConfirmingDelete ? (
            <div className="flex flex-col items-center text-center gap-6 py-4">
              <MooDengMascot mood="sad" size={100} className="drop-shadow-sm" />
              <div>
                <h2 className="text-3xl font-bold text-ink mb-2">แน่ใจนะว่าจะลบ?</h2>
                <p className="text-xl text-pencil">ลบ "{item?.name}" ออกจากสต็อก</p>
              </div>
              <div className="flex w-full gap-3 mt-4">
                <DoodleButton onClick={() => setIsConfirmingDelete(false)} variant="secondary" className="flex-1 text-xl py-3 shadow-md bg-white">
                  ยกเลิก
                </DoodleButton>
                <DoodleButton onClick={confirmDelete} variant="danger" className="flex-1 text-xl py-3 shadow-md">
                  🗑️ ลบเลย!
                </DoodleButton>
              </div>
            </div>
          ) : (
            <>
              <h2 className="text-3xl font-bold text-ink mb-2 pr-8">
                {item ? `📝 แก้ไข: ${item.name}` : '✨ เพิ่มของใหม่'}
              </h2>

              <div className="flex flex-col gap-4">
                <div>
                  <label className="block text-ink font-bold mb-1 ml-1 text-lg">ชื่อของ</label>
                  <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full bg-white border-[3px] border-piggy-dark rounded-xl p-3 focus:outline-none focus:ring-4 focus:ring-piggy/30 shadow-sm text-lg" placeholder="เช่น น้ำดื่ม, มาม่า" />
                </div>
                
                <div>
                  <label className="block text-ink font-bold mb-1 ml-1 text-lg">หมวดหมู่</label>
                  <div className="relative">
                    <select value={category} onChange={e => setCategory(e.target.value as Category)} className="w-full appearance-none bg-white border-[3px] border-piggy-dark rounded-xl p-3 pr-10 focus:outline-none focus:ring-4 focus:ring-piggy/30 shadow-sm cursor-pointer text-lg">
                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-piggy-dark">▼</div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className="block text-ink font-bold mb-1 ml-1 text-lg">จำนวน</label>
                    <input type="number" min="0" value={quantity} onChange={e => setQuantity(Number(e.target.value))} className="w-full bg-white border-[3px] border-piggy-dark rounded-xl p-3 focus:outline-none focus:ring-4 focus:ring-piggy/30 shadow-sm text-lg" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-ink font-bold mb-1 ml-1 text-lg">หน่วย</label>
                    <div className="relative">
                      <select value={unit} onChange={e => setUnit(e.target.value)} className="w-full appearance-none bg-white border-[3px] border-piggy-dark rounded-xl p-3 pr-10 focus:outline-none focus:ring-4 focus:ring-piggy/30 shadow-sm cursor-pointer text-lg">
                        {UNITS.map(u => <option key={u} value={u}>{u}</option>)}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-piggy-dark">▼</div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className="block text-ink font-bold mb-1 ml-1 text-lg text-danger">เตือนเมื่อเหลือ</label>
                    <input type="number" min="0" value={lowThreshold} onChange={e => setLowThreshold(Number(e.target.value))} className="w-full bg-white border-[3px] border-piggy-dark rounded-xl p-3 focus:outline-none focus:ring-4 focus:ring-piggy/30 shadow-sm text-lg text-danger" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-ink font-bold mb-1 ml-1 text-lg">ราคา/หน่วย</label>
                    <input type="number" min="0" value={pricePerUnit} onChange={e => setPricePerUnit(e.target.value)} placeholder="-" className="w-full bg-white border-[3px] border-piggy-dark rounded-xl p-3 focus:outline-none focus:ring-4 focus:ring-piggy/30 shadow-sm text-lg" />
                  </div>
                </div>

                <div>
                  <label className="block text-ink font-bold mb-1 ml-1 text-lg">หมายเหตุ</label>
                  <textarea value={note} onChange={e => setNote(e.target.value)} rows={2} className="w-full bg-white border-[3px] border-piggy-dark rounded-xl p-3 focus:outline-none focus:ring-4 focus:ring-piggy/30 shadow-sm resize-none text-lg" placeholder="เช่น ซื้อที่เซเว่น..."></textarea>
                </div>
              </div>

              <div className="flex gap-3 mt-2">
                <DoodleButton onClick={handleSave} variant="primary" className="flex-1 text-xl py-3 shadow-md">
                  💾 บันทึกการเปลี่ยนแปลง
                </DoodleButton>
                {item && (
                  <DoodleButton onClick={() => setIsConfirmingDelete(true)} variant="danger" className="flex-none px-6 text-xl shadow-md">
                    🗑️
                  </DoodleButton>
                )}
              </div>
            </>
          )}
        </div>
      </div>
      
      {errorMsg && <ToastAlert message={errorMsg} onClose={() => setErrorMsg(null)} />}
    </div>
  );
}
