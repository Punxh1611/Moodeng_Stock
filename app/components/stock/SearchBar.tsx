import React from 'react';
import { Category, CATEGORIES } from '~/lib/types';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: Category | 'all';
  onCategoryChange: (cat: Category | 'all') => void;
}

export function SearchBar({ searchQuery, onSearchChange, selectedCategory, onCategoryChange }: SearchBarProps) {
  const categoryIcons: Record<string, string> = {
    'all': '🧺',
    'อาหาร': '🍖',
    'เครื่องดื่ม': '🧃',
    'ของใช้': '🧼',
    'ยา': '💊',
    'อื่นๆ': '✨'
  };

  return (
    <div className="flex flex-col gap-3 sm:gap-4">
      <div className="relative">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-lg opacity-60 pointer-events-none">🔍</span>
        <input 
          type="text" 
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="ค้นหาของในสต็อก..."
          className="w-full bg-white border-2 border-ink rounded-2xl py-2.5 pl-11 pr-10 font-hand text-lg shadow-xs focus:outline-none focus:ring-3 focus:ring-piggy transition-all"
        />
        {searchQuery && (
          <button 
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-pencil hover:text-ink text-sm bg-paper hover:bg-pink-100 rounded-full w-6 h-6 flex items-center justify-center border border-ink/20"
          >
            ✕
          </button>
        )}
      </div>
      
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide pt-1">
        <button
          onClick={() => onCategoryChange('all')}
          className={`shrink-0 px-3.5 py-1.5 rounded-full font-hand text-sm sm:text-base border-2 transition-all cursor-pointer flex items-center gap-1.5 ${
            selectedCategory === 'all' 
              ? 'bg-piggy border-ink font-bold shadow-xs -translate-y-0.5' 
              : 'bg-white border-ink/20 text-pencil hover:border-ink/60 hover:text-ink'
          }`}
        >
          <span>{categoryIcons['all']}</span>
          <span>ทั้งหมด</span>
        </button>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={`shrink-0 px-3.5 py-1.5 rounded-full font-hand text-sm sm:text-base border-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedCategory === cat 
                ? 'bg-piggy border-ink font-bold shadow-xs -translate-y-0.5' 
                : 'bg-white border-ink/20 text-pencil hover:border-ink/60 hover:text-ink'
            }`}
          >
            <span>{categoryIcons[cat] || '📦'}</span>
            <span>{cat}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
