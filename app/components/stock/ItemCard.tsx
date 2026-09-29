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
      <div className={`p-5 flex flex-col gap-3 h-full rounded-[2rem] border-[3px] shadow-sm transition-transform hover:scale-105 hover:shadow-md ${bgColors}`}>
        
        <div className="absolute -top-3 -right-3 z-10">
          {isZero && <BounceBadge variant="danger">หมด!</BounceBadge>}
          {isLow && <BounceBadge variant="warning">ใกล้หมด!</BounceBadge>}
        </div>

        <div className="flex items-start gap-3">
          <div className="p-2 bg-paper rounded-full border-2 border-ink/10">
            <CategoryIcon category={item.category} size={32} className="text-ink" />
          </div>
          <div className="flex-1 mt-1">
            <h3 className="font-bold text-xl font-hand text-ink leading-tight">{item.name}</h3>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center py-4">
          <div className="text-4xl font-hand font-bold text-ink text-center flex items-baseline gap-2">
            {item.quantity} <span className="text-xl font-normal text-pencil">{item.unit}</span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-2 mt-auto" onClick={(e) => e.stopPropagation()}>
          <DoodleButton size="sm" variant="ghost" onClick={() => onAdjust(item.id, -1)} disabled={item.quantity <= 0} className="rounded-full">
            - ลด
          </DoodleButton>
          <DoodleButton size="sm" variant="secondary" onClick={() => onAdjust(item.id, 1)} className="rounded-full">
            + เพิ่ม
          </DoodleButton>
        </div>
      </div>
    </div>
  );
}
