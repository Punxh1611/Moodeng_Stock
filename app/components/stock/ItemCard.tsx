import React from 'react';
import { Item } from '~/lib/types';
import { CategoryIcon } from '~/components/svg/CategoryIcon';
import { DoodleButton } from '~/components/ui/DoodleButton';
import { BounceBadge } from '~/components/ui/BounceBadge';

interface ItemCardProps {
  item: Item;
  onAdjust: (id: string, delta: number) => void;
  onClick: (item: Item) => void;
}

export function ItemCard({ item, onAdjust, onClick }: ItemCardProps) {
  const isLow = item.quantity <= item.low_threshold && item.quantity > 0;
  const isZero = item.quantity <= 0;
  
  const statusStyles = isZero 
    ? 'bg-rose-50/90 border-danger' 
    : isLow 
    ? 'bg-amber-50/90 border-warn' 
    : 'bg-white border-ink';
  
  return (
    <div onClick={() => onClick(item)} className="cursor-pointer relative h-full group">
      <div className={`p-3.5 sm:p-4 flex flex-col gap-2 h-full rounded-2xl sm:rounded-3xl border-2 sm:border-[2.5px] shadow-[0_3px_0_#3D3329] transition-all hover:-translate-y-1 hover:shadow-[0_5px_0_#3D3329] ${statusStyles}`}>
        
        {/* Status Badge */}
        {(isZero || isLow) && (
          <div className="absolute -top-2.5 -right-1 sm:-right-2 z-10 scale-90 sm:scale-100 origin-top-right">
            {isZero && <BounceBadge variant="danger">หมด!</BounceBadge>}
            {isLow && <BounceBadge variant="warning">ใกล้หมด!</BounceBadge>}
          </div>
        )}

        {/* Header: Icon + Name */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          <div className="p-1.5 sm:p-2 bg-pink-50 rounded-xl border border-ink/15 shrink-0 flex items-center justify-center">
            <CategoryIcon category={item.category} size={22} className="text-ink w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-base sm:text-lg font-hand text-ink leading-snug truncate" title={item.name}>
              {item.name}
            </h3>
          </div>
        </div>

        {/* Center: Big Quantity Counter */}
        <div className="flex-1 flex items-center justify-center py-2 sm:py-3 my-auto">
          <div className="font-hand font-bold text-ink text-center flex items-baseline gap-1 sm:gap-1.5">
            <span className="text-3xl sm:text-4xl tracking-tight leading-none">{item.quantity}</span>
            <span className="text-sm sm:text-base font-semibold text-pencil">{item.unit}</span>
          </div>
        </div>

        {/* Stepper Buttons */}
        <div className="flex items-center justify-between gap-1.5 sm:gap-2 pt-1 border-t border-ink/10" onClick={(e) => e.stopPropagation()}>
          <button 
            onClick={() => onAdjust(item.id, -1)} 
            disabled={item.quantity <= 0}
            className={`flex-1 py-1 sm:py-1.5 rounded-xl font-hand font-bold text-xs sm:text-sm border border-ink flex items-center justify-center transition-all ${
              item.quantity <= 0 
                ? 'opacity-40 cursor-not-allowed bg-gray-100 text-pencil border-gray-300' 
                : 'bg-paper hover:bg-pink-100 text-ink active:scale-95 cursor-pointer shadow-2xs'
            }`}
          >
            - ลด
          </button>
          <button 
            onClick={() => onAdjust(item.id, 1)} 
            className="flex-1 py-1 sm:py-1.5 rounded-xl font-hand font-bold text-xs sm:text-sm border border-ink bg-piggy hover:bg-piggy-dark text-ink active:scale-95 cursor-pointer shadow-2xs"
          >
            + เพิ่ม
          </button>
        </div>
      </div>
    </div>
  );
}
