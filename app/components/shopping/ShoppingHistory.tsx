import React from 'react';
import { ShoppingTrip } from '~/lib/types';
import { DoodleBorder } from '~/components/svg/DoodleBorder';
import { DoodleButton } from '~/components/ui/DoodleButton';

interface ShoppingHistoryProps {
  trips: ShoppingTrip[];
  onViewTrip: (trip: ShoppingTrip) => void;
}

export function ShoppingHistory({ trips, onViewTrip }: ShoppingHistoryProps) {
  return (
    <div className="flex flex-col gap-3.5 font-hand mt-4">
      <div className="flex items-center gap-2 ml-1">
        <span className="text-xl">📜</span>
        <h2 className="text-xl sm:text-2xl font-bold text-ink">ประวัติการซื้อล่าสุด</h2>
      </div>
      
      {trips.length === 0 ? (
        <div className="text-center text-pencil py-8 text-base bg-white/60 rounded-2xl border-2 border-dashed border-ink/15">
          ยังไม่มีประวัติการซื้อเลยจ้า
        </div>
      ) : (
        <div className="flex flex-col gap-2.5">
          {trips.map(trip => (
            <div 
              key={trip.id} 
              onClick={() => onViewTrip(trip)}
              className="p-3.5 sm:p-4 bg-white border-2 border-ink rounded-2xl flex items-center justify-between shadow-[0_2px_0_#3D3329] hover:shadow-[0_4px_0_#3D3329] hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              <div className="flex flex-col">
                <div className="font-bold text-ink text-base sm:text-lg">
                  {new Date(trip.shopped_at).toLocaleString('th-TH', { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric', 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </div>
                <div className="text-pencil text-sm font-semibold mt-0.5">
                  ยอดรวม: <span className="text-ink font-bold">฿{trip.total_cost}</span>
                </div>
              </div>
              <DoodleButton size="sm" variant="primary" onClick={() => onViewTrip(trip)} className="text-xs sm:text-sm px-3 py-1.5 shadow-2xs">
                ดูใบเสร็จ 🧾
              </DoodleButton>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
