import React, { useEffect, useState } from 'react';
import { ShoppingTrip, ShoppingTripItem, Item } from '~/lib/types';
import { DoodleButton } from '~/components/ui/DoodleButton';
import { useItems } from '~/lib/hooks';

interface TripDetailPopupProps {
  trip: ShoppingTrip;
  getTripItems: (tripId: string) => Promise<ShoppingTripItem[]>;
  onClose: () => void;
}

export function TripDetailPopup({ trip, getTripItems, onClose }: TripDetailPopupProps) {
  const { items: allItems } = useItems();
  const [items, setItems] = useState<ShoppingTripItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true);
      const data = await getTripItems(trip.id);
      setItems(data);
      setIsLoading(false);
    };
    fetchItems();
  }, [trip.id, getTripItems]);

  return (
    <div className="fixed inset-0 bg-ink/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-[pop-in_0.2s_ease-out]">
      <div className="bg-white border-[3px] border-ink rounded-3xl w-full max-w-sm shadow-[0_8px_0_#3D3329] overflow-hidden flex flex-col max-h-[85vh] font-hand">
        {/* Receipt Header */}
        <div className="bg-pink-100 p-4 border-b-2 border-dashed border-ink flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🧾</span>
            <h2 className="font-bold text-xl text-ink">ใบเสร็จรับเงิน</h2>
          </div>
          <button 
            onClick={onClose} 
            className="w-8 h-8 rounded-full bg-white hover:bg-red-50 text-ink hover:text-danger border border-ink/20 flex items-center justify-center transition-all cursor-pointer font-bold text-base"
          >
            ✕
          </button>
        </div>

        <div className="p-4 sm:p-5 flex-1 overflow-y-auto">
          <div className="mb-4 text-center pb-3 border-b border-dashed border-ink/20">
            <p className="text-xs text-pencil">ร้านตู้เสบียงน้องหมูเด้ง 🥣</p>
            <p className="text-xs text-pencil mt-0.5">
              {new Date(trip.shopped_at).toLocaleString('th-TH', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric', 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </p>
          </div>

          {isLoading ? (
            <div className="text-center py-8 text-pencil text-lg animate-pulse">กำลังดึงรายการของ...</div>
          ) : (
            <div className="space-y-2">
              {items.map(item => {
                const stockItem = allItems.find(i => i.id === item.item_id);
                return (
                  <div key={item.id} className="flex justify-between items-center py-1.5 border-b border-ink/10">
                    <div className="flex flex-col min-w-0 pr-2">
                      <span className="font-bold text-ink text-base truncate">{item.item_name || stockItem?.name || 'ของที่ถูกลบไปแล้ว'}</span>
                      <span className="text-xs text-pencil">{item.quantity} {stockItem?.unit || 'ชิ้น'}</span>
                    </div>
                    <div className="font-bold text-base text-ink shrink-0">฿{item.price_paid}</div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Receipt Footer Total */}
          <div className="mt-5 pt-3 border-t-2 border-dashed border-ink flex justify-between items-baseline">
            <span className="font-bold text-base text-ink">ยอดรวมทั้งสิ้น</span>
            <span className="font-bold text-2xl text-ink">฿{trip.total_cost}</span>
          </div>

          <div className="mt-5 text-center">
            <DoodleButton onClick={onClose} variant="secondary" className="w-full py-2 text-base">
              ปิดหน้าต่าง
            </DoodleButton>
          </div>
        </div>
      </div>
    </div>
  );
}
