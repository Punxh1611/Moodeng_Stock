import React, { useState } from 'react';
import { useItems, useShopping } from '~/lib/hooks';
import { CartItem } from '~/lib/types';
import { ShoppingForm } from './ShoppingForm';
import { ShoppingCart } from './ShoppingCart';
import { ShoppingHistory } from './ShoppingHistory';
import { ToastAlert } from '~/components/ui/ToastAlert';

export function ShoppingTab() {
  const { items } = useItems();
  const { trips, submitTrip, isLoading } = useShopping();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [toast, setToast] = useState<{message: string, variant: 'success' | 'error'} | null>(null);
  
  const handleAddToCart = (item: CartItem) => {
    setCartItems(prev => [...prev, item]);
  };

  const handleRemoveFromCart = (index: number) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmitCart = async () => {
    if (cartItems.length === 0) return;
    await submitTrip(cartItems);
    setCartItems([]);
    setToast({ message: 'อัปเดตสต็อกเรียบร้อยแล้ว!', variant: 'success' });
  };

  return (
    <div className="flex flex-col gap-6 pb-10">
      <ShoppingForm items={items} onAddToCart={handleAddToCart} />
      <ShoppingCart 
        cartItems={cartItems} 
        onRemoveItem={handleRemoveFromCart} 
        onSubmit={handleSubmitCart} 
        isSubmitting={isLoading} 
      />
      <ShoppingHistory trips={trips} onViewTrip={() => {}} />
      
      {toast && <ToastAlert message={toast.message} variant={toast.variant} onClose={() => setToast(null)} />}
    </div>
  );
}
