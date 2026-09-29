import React from 'react';
import { CartItem } from '~/lib/types';
import { DoodleButton } from '~/components/ui/DoodleButton';
import { MooDengMascot } from '~/components/svg/MooDengMascot';

interface ShoppingCartProps {
  cartItems: CartItem[];
  onRemoveItem: (index: number) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export function ShoppingCart({ cartItems, onRemoveItem, onSubmit, isSubmitting }: ShoppingCartProps) {
  const total = cartItems.reduce((sum, item) => sum + item.price_paid, 0);

  return (
    <div className="p-6 bg-white border-2 border-piggy-dark rounded-[2rem] shadow-sm flex flex-col gap-4 font-hand mt-4">
      <h3 className="text-2xl font-bold text-ink border-b-[3px] border-dashed border-piggy pb-3 text-center">🧾 บิลปัจจุบัน</h3>
      
      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-6 gap-4 opacity-70">
          <MooDengMascot mood="sad" size={64} />
          <p className="text-pencil text-lg font-bold">ยังไม่มีของในตะกร้า</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {cartItems.map((item, i) => (
            <div key={i} className="flex items-center justify-between bg-pink-50 border-2 border-piggy/50 rounded-2xl p-3">
              <div className="flex flex-col">
                <span className="font-bold text-ink text-lg">
                  {item.item_name} {item.is_new && <span className="text-xs text-white bg-piggy-dark px-2 py-0.5 rounded-full ml-2">ใหม่</span>}
                </span>
                <span className="text-sm text-pencil font-bold">
                  {item.quantity} {item.unit} <span className="mx-2 text-piggy">|</span> ฿{item.price_paid}
                </span>
              </div>
              <button onClick={() => onRemoveItem(i)} className="text-danger font-bold hover:scale-110 p-2 text-xl bg-white rounded-full w-10 h-10 shadow-sm border border-danger/20 flex items-center justify-center">
                ✕
              </button>
            </div>
          ))}
          
          <hr className="border-piggy border-2 border-dashed my-4" />
          
          <div className="flex justify-between items-center px-4 bg-paper rounded-xl p-3 border-2 border-piggy">
            <span className="text-xl font-bold text-ink">💰 ยอดรวม:</span>
            <span className="text-2xl font-bold text-piggy-dark">฿{total}</span>
          </div>

          <DoodleButton 
            variant="primary" 
            size="lg" 
            onClick={onSubmit} 
            disabled={isSubmitting}
            className="mt-4 shadow-md text-xl"
          >
            {isSubmitting ? 'กำลังจัดของเข้าสต็อก...' : '🦛 อัปเดตสต็อก!'}
          </DoodleButton>
        </div>
      )}
    </div>
  );
}
