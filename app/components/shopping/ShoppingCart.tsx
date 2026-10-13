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
    <div className="p-5 sm:p-6 bg-white border-[2.5px] border-ink rounded-3xl shadow-[0_4px_0_#3D3329] flex flex-col gap-4 font-hand mt-2">
      <div className="flex items-center justify-center gap-2 border-b-2 border-dashed border-ink/20 pb-3">
        <span className="text-2xl">🧾</span>
        <h3 className="text-xl sm:text-2xl font-bold text-ink">บิลในตะกร้า</h3>
        <span className="text-xs bg-piggy text-ink font-bold px-2 py-0.5 rounded-full border border-ink">
          {cartItems.length} ชิ้น
        </span>
      </div>
      
      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-6 gap-2 opacity-75">
          <MooDengMascot mood="sad" size={60} />
          <p className="text-pencil text-base font-bold">ยังไม่มีของในตะกร้าเลยจ้า</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2.5">
          {cartItems.map((item, i) => (
            <div key={i} className="flex items-center justify-between bg-paper border border-ink/20 rounded-2xl p-3 shadow-2xs">
              <div className="flex flex-col min-w-0 pr-2">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-bold text-ink text-base sm:text-lg truncate">
                    {item.item_name}
                  </span>
                  {item.is_new && (
                    <span className="text-2xs text-ink bg-piggy border border-ink px-1.5 py-0.2 rounded-full font-bold">
                      ของใหม่
                    </span>
                  )}
                </div>
                <div className="text-xs sm:text-sm text-pencil font-semibold flex items-center gap-1.5 mt-0.5">
                  <span>{item.quantity} {item.unit || 'ชิ้น'}</span>
                  <span>•</span>
                  <span className="text-ink font-bold">฿{item.price_paid}</span>
                </div>
              </div>
              <button 
                onClick={() => onRemoveItem(i)} 
                className="text-danger hover:text-red-600 font-bold p-1 bg-white hover:bg-red-50 rounded-xl w-8 h-8 shadow-2xs border border-ink/15 flex items-center justify-center transition-transform hover:scale-110 cursor-pointer shrink-0"
                title="ลบออกจากตะกร้า"
              >
                ✕
              </button>
            </div>
          ))}
          
          <div className="flex justify-between items-center px-4 py-3 bg-pink-50 rounded-2xl border-2 border-ink mt-2">
            <span className="text-lg font-bold text-ink">💰 ยอดรวมทั้งหมด:</span>
            <span className="text-2xl font-bold text-ink">฿{total}</span>
          </div>

          <DoodleButton 
            variant="primary" 
            size="lg" 
            onClick={onSubmit} 
            disabled={isSubmitting}
            className="mt-2 text-lg sm:text-xl py-3 shadow-[0_3px_0_#3D3329]"
          >
            {isSubmitting ? 'กำลังจัดของเข้าสต็อก...' : '🦛 อัปเดตสต็อกเลย!'}
          </DoodleButton>
        </div>
      )}
    </div>
  );
}
