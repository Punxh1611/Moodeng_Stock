import React from 'react';
import { Category, CATEGORIES } from '~/lib/types';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: Category | 'all';
  onCategoryChange: (cat: Category | 'all') => void;
}

export function SearchBar({ searchQuery, onSearchChange, selectedCategory, onCategoryChange }: SearchBarProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xl">🔍</span>
        <input 
          type="text" 
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="ค้นหาของ..."
          className="w-full bg-paper border-2 border-ink rounded-xl py-2 pl-10 pr-4 font-hand text-lg focus:outline-none focus:ring-2 focus:ring-piggy-dark"
        />
      </div>
      
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        <button
          onClick={() => onCategoryChange('all')}
          className={`shrink-0 px-4 py-1 rounded-full font-hand border-2 transition-colors ${
            selectedCategory === 'all' 
              ? 'bg-piggy border-ink font-bold' 
              : 'bg-paper border-ink/30 text-pencil hover:border-ink/50'
          }`}
        >
          ทั้งหมด
        </button>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={`shrink-0 px-4 py-1 rounded-full font-hand border-2 transition-colors ${
              selectedCategory === cat 
                ? 'bg-piggy border-ink font-bold' 
                : 'bg-paper border-ink/30 text-pencil hover:border-ink/50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
