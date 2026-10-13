import React from 'react';
import { StockIcon, CartIcon, NoteIcon, ChefIcon } from '~/components/svg/TabIcons';

export type TabType = 'stock' | 'shopping' | 'notes' | 'kitchen';

interface TabBarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export function TabBar({ activeTab, onTabChange }: TabBarProps) {
  const tabs = [
    { id: 'stock', icon: <StockIcon className="w-5 h-5 sm:w-6 sm:h-6" />, label: 'สต็อก' },
    { id: 'shopping', icon: <CartIcon className="w-5 h-5 sm:w-6 sm:h-6" />, label: 'ช้อปปิ้ง' },
    { id: 'notes', icon: <NoteIcon className="w-5 h-5 sm:w-6 sm:h-6" />, label: 'โน้ต' },
    { id: 'kitchen', icon: <ChefIcon className="w-5 h-5 sm:w-6 sm:h-6" />, label: 'ครัว' },
  ] as const;

  return (
    <div className="flex bg-pink-100/70 p-1.5 sm:p-2 border-b-[3px] border-ink gap-1 sm:gap-2 font-hand">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id as TabType)}
            className={`flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 sm:py-3 px-2 text-center text-base sm:text-lg rounded-2xl transition-all cursor-pointer ${
              isActive 
                ? 'bg-white text-ink border-2 border-ink font-bold shadow-sm -translate-y-0.5' 
                : 'text-pencil hover:text-ink hover:bg-white/50 border-2 border-transparent'
            }`}
          >
            {tab.icon}
            <span className="inline">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
