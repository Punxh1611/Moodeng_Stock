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
  
  const bgColors = isZero ? 'bg-red-50 border-danger' : isLow ? 'bg-yellow-50 border-warn' : 'bg-white border-piggy-dark';
  
  return (
    <div onClick={() => onClick(item)} className="cursor-pointer relative h-full">
      <div className={`p-3 sm:p-5 flex flex-col gap-2 sm:gap-3 h-full rounded-[1.5rem] sm:rounded-[2rem] border-[3px] shadow-sm transition-transform hover:scale-105 hover:shadow-md ${bgColors}`}>
        
        <div className="absolute -top-3 -right-2 sm:-right-3 z-10 scale-90 sm:scale-100 origin-top-right">
          {isZero && <BounceBadge variant="danger">หมด!</BounceBadge>}
          {isLow && <BounceBadge variant="warning">ใกล้หมด!</BounceBadge>}
        </div>

        <div className="flex items-start gap-2 sm:gap-3">
          <div className="p-1.5 sm:p-2 bg-paper rounded-full border-2 border-ink/10 flex-shrink-0">
            <CategoryIcon category={item.category} size={24} className="text-ink w-6 h-6 sm:w-8 sm:h-8" />
          </div>
          <div className="flex-1 mt-1 break-words overflow-hidden">
            <h3 className="font-bold text-lg sm:text-xl font-hand text-ink leading-tight line-clamp-2">{item.name}</h3>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center py-2 sm:py-4">
          <div className="text-3xl sm:text-4xl font-hand font-bold text-ink text-center flex items-baseline gap-1 sm:gap-2">
            {item.quantity} <span className="text-lg sm:text-xl font-normal text-pencil">{item.unit}</span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-1 sm:gap-2 mt-auto" onClick={(e) => e.stopPropagation()}>
          <DoodleButton size="sm" variant="ghost" onClick={() => onAdjust(item.id, -1)} disabled={item.quantity <= 0} className="rounded-full text-xs sm:text-sm px-2 sm:px-4">
            - ลด
          </DoodleButton>
          <DoodleButton size="sm" variant="secondary" onClick={() => onAdjust(item.id, 1)} className="rounded-full text-xs sm:text-sm px-2 sm:px-4">
            + เพิ่ม
          </DoodleButton>
        </div>
      </div>
    </div>
  );
}
