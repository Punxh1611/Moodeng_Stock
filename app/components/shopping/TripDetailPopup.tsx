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
    <div className="fixed inset-0 bg-ink/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-paper border-4 border-ink rounded-3xl w-full max-w-md animate-[wiggle_0.3s_ease-out] shadow-xl overflow-hidden flex flex-col max-h-[80vh]">
        <div className="bg-ink text-white p-4 flex justify-between items-center shrink-0">
          <h2 className="font-hand font-bold text-2xl">📝 รายละเอียดบิล</h2>
          <button onClick={onClose} className="hover:text-danger hover:scale-110 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-5 flex-1 overflow-y-auto">
          <div className="mb-4 text-center">
            <p className="text-pencil font-hand">วันที่: {new Date(trip.shopped_at).toLocaleString('th-TH')}</p>
            <p className="text-2xl font-bold font-hand text-ink mt-1">ยอดรวม: ฿{trip.total_cost}</p>
          </div>

          {isLoading ? (
            <div className="text-center py-8 font-hand text-pencil text-xl animate-pulse">กำลังโหลดข้อมูลบิล...</div>
          ) : (
            <div className="space-y-3">
              {items.map(item => {
                const stockItem = allItems.find(i => i.id === item.item_id);
                return (
                  <div key={item.id} className="bg-white border-2 border-ink rounded-xl p-3 flex justify-between items-center shadow-sm hover:-translate-y-1 transition-transform">
                    <div className="flex flex-col">
                      <span className="font-bold text-ink">{item.item_name || stockItem?.name || 'ของที่ถูกลบไปแล้ว'}</span>
                      <span className="text-sm text-pencil font-hand">{item.quantity} {stockItem?.unit || 'ชิ้น'}</span>
                    </div>
                    <div className="font-bold text-lg text-ink font-hand">฿{item.price_paid}</div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
