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
    <div className="flex flex-col gap-4 font-hand">
      <h2 className="text-2xl font-bold text-ink ml-2">📜 ประวัติการซื้อ</h2>
      
      {trips.length === 0 ? (
        <div className="text-center text-pencil py-8 text-lg">
          ยังไม่มีประวัติการซื้อ
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {trips.map(trip => (
            <DoodleBorder key={trip.id} className="p-3 bg-cream flex items-center justify-between">
              <div>
                <div className="font-bold text-ink text-lg">
                  {new Date(trip.shopped_at).toLocaleDateString('th-TH', { dateStyle: 'long' })}
                </div>
                <div className="text-pencil">
                  รวม: ฿{trip.total_cost}
                </div>
              </div>
              <DoodleButton size="sm" variant="ghost" onClick={() => onViewTrip(trip)}>
                ดู
              </DoodleButton>
            </DoodleBorder>
          ))}
        </div>
      )}
    </div>
  );
}
