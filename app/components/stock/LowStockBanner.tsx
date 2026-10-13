import React from 'react';
import { Item } from '~/lib/types';
import { DoodleBorder } from '~/components/svg/DoodleBorder';
import { MooDengMascot } from '~/components/svg/MooDengMascot';
import { DoodleButton } from '~/components/ui/DoodleButton';

interface LowStockBannerProps {
  items: Item[];
  onAddToNote: (item: Item) => void;
}

export function LowStockBanner({ items, onAddToNote }: LowStockBannerProps) {
  if (items.length === 0) return null;

  return (
    <div className="w-full max-w-full overflow-hidden">
      <div className="p-3.5 sm:p-4 bg-amber-50/90 border-2 border-amber-300 rounded-2xl flex gap-3 sm:gap-4 items-center shadow-xs">
        <div className="shrink-0">
          <MooDengMascot mood="surprised" size={44} className="filter drop-shadow-2xs" />
        </div>
        <div className="flex-1 min-w-0 flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold font-hand text-ink">
              ⚠️ ของใกล้หมดสต็อก!
            </h2>
            <span className="text-xs bg-warn text-ink font-bold px-2 py-0.5 rounded-full border border-ink">
              {items.length} อย่าง
            </span>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {items.map(item => (
              <div key={item.id} className="shrink-0 flex items-center gap-2 bg-white px-2.5 py-1 rounded-xl border border-ink shadow-2xs">
                <span className="font-hand font-bold text-ink text-sm sm:text-base">{item.name}</span>
                <span className="text-pencil text-xs font-semibold">{item.quantity} {item.unit}</span>
                <button 
                  onClick={() => onAddToNote(item)}
                  className="hover:scale-110 transition-transform bg-paper border border-ink/30 hover:border-ink rounded-lg px-1.5 py-0.5 text-xs font-bold cursor-pointer"
                  title="จดลงโน้ตซื้อของ"
                >
                  + จดโน้ต
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
