import React, { useState, useEffect } from 'react';
import { useItems, useShopping } from '~/lib/hooks';
import { CartItem, ShoppingTrip } from '~/lib/types';
import { ShoppingForm } from './ShoppingForm';
import { ShoppingCart } from './ShoppingCart';
import { ShoppingHistory } from './ShoppingHistory';
import { ToastAlert } from '~/components/ui/ToastAlert';
import { TripDetailPopup } from './TripDetailPopup';

export function ShoppingTab() {
  const { items } = useItems();
  const { trips, submitTrip, getTripItems, isLoading } = useShopping();
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('moodeng_cart');
      if (saved) {
        try { return JSON.parse(saved); } catch (e) {}
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('moodeng_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const [toast, setToast] = useState<{message: string, variant: 'success' | 'error'} | null>(null);
  const [isSubmittingLocal, setIsSubmittingLocal] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<ShoppingTrip | null>(null);
  
  const handleAddToCart = (item: CartItem) => {
    setCartItems(prev => [...prev, item]);
  };

  const handleRemoveFromCart = (index: number) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmitCart = async () => {
    if (cartItems.length === 0 || isSubmittingLocal) return;
    setIsSubmittingLocal(true);
    try {
      await submitTrip(cartItems);
      setCartItems([]);
      setToast({ message: 'อัปเดตสต็อกเรียบร้อยแล้ว!', variant: 'success' });
    } finally {
      setIsSubmittingLocal(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 pb-10">
      <ShoppingForm items={items} onAddToCart={handleAddToCart} />
      <ShoppingCart 
        cartItems={cartItems} 
        onRemoveItem={handleRemoveFromCart} 
        onSubmit={handleSubmitCart} 
        isSubmitting={isSubmittingLocal} 
      />
      <ShoppingHistory trips={trips} onViewTrip={setSelectedTrip} />
      
      {toast && <ToastAlert message={toast.message} variant={toast.variant} onClose={() => setToast(null)} />}
      
      {selectedTrip && (
        <TripDetailPopup 
          trip={selectedTrip} 
          getTripItems={getTripItems} 
          onClose={() => setSelectedTrip(null)} 
        />
      )}
    </div>
  );
}
