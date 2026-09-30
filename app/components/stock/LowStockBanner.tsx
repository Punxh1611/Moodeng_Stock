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
    <DoodleBorder variant="warning" className="p-4 bg-warn/20 flex gap-4 items-center">
      <div className="hidden sm:block">
        <MooDengMascot mood="surprised" size={48} className="animate-wiggle" />
      </div>
      <div className="flex-1 min-w-0 overflow-hidden flex flex-col gap-2">
        <h2 className="text-lg font-bold font-hand text-danger">⚠️ ของใกล้หมด! ({items.length} รายการ)</h2>
        <div className="flex gap-3 overflow-x-auto pb-2 snap-x scrollbar-hide">
          {items.map(item => (
            <div key={item.id} className="snap-start shrink-0 flex items-center gap-2 bg-paper px-3 py-1.5 rounded-xl border-2 border-ink">
              <span className="font-hand font-bold text-ink">{item.name}</span>
              <span className="text-pencil text-sm font-hand">{item.quantity} {item.unit}</span>
              <button 
                onClick={() => onAddToNote(item)}
                className="hover:scale-110 transition-transform bg-cream border border-ink rounded-md px-1"
                title="เพิ่มลงโน้ต"
              >
                📝
              </button>
            </div>
          ))}
        </div>
      </div>
    </DoodleBorder>
  );
}
