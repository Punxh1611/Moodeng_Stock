import { useState, useEffect, useCallback } from 'react';
import { supabase } from '~/lib/supabase';
import { Item, Note, CartItem, ShoppingTrip, ShoppingTripItem } from '~/lib/types';

export function useItems() {
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchItems = useCallback(async () => {
    setIsLoading(true);
    const { data, error } = await supabase.from('items').select('*').order('created_at', { ascending: false });
    if (!error && data) setItems(data);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const addItem = async (data: Omit<Item, 'id' | 'created_at' | 'updated_at'>) => {
    const { data: newItem, error } = await supabase.from('items').insert([data]).select().single();
    if (!error && newItem) {
      setItems(prev => [newItem, ...prev]);
    }
  };

  const updateItem = async (id: string, data: Partial<Item>) => {
    const { data: updated, error } = await supabase.from('items').update(data).eq('id', id).select().single();
    if (!error && updated) {
      setItems(prev => prev.map(item => item.id === id ? { ...item, ...updated } : item));
    }
  };

  const deleteItem = async (id: string) => {
    const { error } = await supabase.from('items').delete().eq('id', id);
    if (!error) {
      setItems(prev => prev.filter(item => item.id !== id));
    }
  };

  const adjustQuantity = async (id: string, delta: number) => {
    const item = items.find(i => i.id === id);
    if (item) {
      const newQuantity = Math.max(0, item.quantity + delta);
      await updateItem(id, { quantity: newQuantity });
    }
  };

  const lowStockItems = items.filter(i => i.quantity <= i.low_threshold);

  return { items, lowStockItems, isLoading, addItem, updateItem, deleteItem, adjustQuantity, refetch: fetchItems };
}

export function useShopping() {
  const [trips, setTrips] = useState<ShoppingTrip[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTrips = useCallback(async () => {
    setIsLoading(true);
    const { data, error } = await supabase.from('shopping_trips').select('*').order('shopped_at', { ascending: false });
    if (!error && data) setTrips(data);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchTrips();
  }, [fetchTrips]);

  const submitTrip = async (cartItems: CartItem[], note?: string) => {
    const total_cost = cartItems.reduce((acc, item) => acc + (item.price_paid || 0), 0);
    const { data: trip, error: tripError } = await supabase.from('shopping_trips').insert([{ total_cost, note }]).select().single();
    if (tripError || !trip) return;

    for (const item of cartItems) {
      let itemId = item.item_id;
      if (item.is_new && item.new_item_data) {
        const { data: newItem } = await supabase.from('items').insert([item.new_item_data]).select().single();
        if (newItem) itemId = newItem.id;
      }
      
      if (itemId) {
        await supabase.from('shopping_trip_items').insert([{
          trip_id: trip.id,
          item_id: itemId,
          quantity: item.quantity,
          price_paid: item.price_paid
        }]);

        const { data: currentItem } = await supabase.from('items').select('quantity').eq('id', itemId).single();
        if (currentItem) {
          await supabase.from('items').update({ quantity: currentItem.quantity + item.quantity }).eq('id', itemId);
        }
      }
    }
    fetchTrips();
  };

  const getTripItems = async (tripId: string): Promise<ShoppingTripItem[]> => {
    const { data, error } = await supabase.from('shopping_trip_items').select('*').eq('trip_id', tripId);
    return error ? [] : data;
  };

  return { trips, isLoading, submitTrip, getTripItems };
}

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchNotes = useCallback(async () => {
    setIsLoading(true);
    const { data, error } = await supabase.from('notes').select('*').order('created_at', { ascending: false });
    if (!error && data) setNotes(data);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const addNote = async (text: string, itemId?: string) => {
    const { data, error } = await supabase.from('notes').insert([{ text, item_id: itemId, is_done: false }]).select().single();
    if (!error && data) setNotes(prev => [data, ...prev]);
  };

  const toggleNote = async (id: string) => {
    const note = notes.find(n => n.id === id);
    if (note) {
      const { data, error } = await supabase.from('notes').update({ is_done: !note.is_done }).eq('id', id).select().single();
      if (!error && data) setNotes(prev => prev.map(n => n.id === id ? { ...n, ...data } : n));
    }
  };

  const deleteNote = async (id: string) => {
    const { error } = await supabase.from('notes').delete().eq('id', id);
    if (!error) setNotes(prev => prev.filter(n => n.id !== id));
  };

  return { notes, isLoading, addNote, toggleNote, deleteNote };
}
