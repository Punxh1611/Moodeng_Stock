import React, { useState } from 'react';
import { useItems, useShopping } from '~/lib/hooks';
import { CartItem } from '~/lib/types';
import { ShoppingForm } from './ShoppingForm';
import { ShoppingCart } from './ShoppingCart';
import { ShoppingHistory } from './ShoppingHistory';

export function ShoppingTab() {
  const { items } = useItems();
  const { trips, submitTrip, isLoading } = useShopping();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  
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
    alert('อัปเดตสต็อกเรียบร้อยแล้ว!');
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
    </div>
  );
}
