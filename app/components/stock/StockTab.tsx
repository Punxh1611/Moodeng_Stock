import React, { useState, useMemo } from 'react';
import { useItems } from '~/lib/hooks';
import { Item, Category } from '~/lib/types';
import { DoodleButton } from '~/components/ui/DoodleButton';
import { SearchBar } from './SearchBar';
import { LowStockBanner } from './LowStockBanner';
import { ItemCard } from './ItemCard';
import { ItemDetailPopup } from './ItemDetailPopup';
import { useNotes } from '~/lib/hooks';

export function StockTab() {
  const { items, lowStockItems, addItem, updateItem, deleteItem, adjustQuantity } = useItems();
  const { addNote, notes } = useNotes();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [showAddPopup, setShowAddPopup] = useState(false);

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [items, searchQuery, selectedCategory]);

  const handleAddToNote = (item: Item) => {
    const existing = notes.find(n => n.item_id === item.id);
    if (!existing) {
      addNote(`ซื้อ ${item.name}`, item.id);
    }
  };

  const handleSaveItem = async (data: Partial<Item>) => {
    if (selectedItem) {
      await updateItem(selectedItem.id, data);
    } else {
      await addItem(data as Omit<Item, 'id' | 'created_at' | 'updated_at'>);
    }
    setSelectedItem(null);
    setShowAddPopup(false);
  };

  return (
    <div className="flex flex-col gap-6 relative min-h-screen pb-20">
      <SearchBar 
        searchQuery={searchQuery} 
        onSearchChange={setSearchQuery} 
        selectedCategory={selectedCategory} 
        onCategoryChange={setSelectedCategory} 
      />
      <LowStockBanner items={lowStockItems} onAddToNote={handleAddToNote} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map(item => (
          <ItemCard 
            key={item.id} 
            item={item} 
            onAdjust={(id, delta) => adjustQuantity(id, delta)} 
            onClick={(i) => setSelectedItem(i)} 
          />
        ))}
        {filteredItems.length === 0 && (
          <div className="col-span-full text-center text-pencil py-10 font-hand text-xl">
            ไม่พบของที่คุณหา
          </div>
        )}
      </div>

      <div className="fixed bottom-6 right-6 z-40">
        <DoodleButton variant="primary" size="lg" onClick={() => setShowAddPopup(true)} className="shadow-xl">
          + เพิ่มของใหม่
        </DoodleButton>
      </div>

      {(showAddPopup || selectedItem) && (
        <ItemDetailPopup
          item={selectedItem}
          onSave={handleSaveItem}
          onDelete={selectedItem ? (id) => { deleteItem(id); setSelectedItem(null); } : undefined}
          onClose={() => { setSelectedItem(null); setShowAddPopup(false); }}
        />
      )}
    </div>
  );
}
