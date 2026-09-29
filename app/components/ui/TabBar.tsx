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
    <div className="flex bg-paper border-b-2 border-ink font-hand">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id as TabType)}
            className={`flex-1 flex items-center justify-center gap-1 sm:gap-2 py-3 px-2 sm:px-4 text-center text-md sm:text-lg rounded-t-xl transition-colors border-b-3 ${
              isActive 
                ? 'bg-piggy text-ink border-ink font-bold' 
                : 'bg-transparent text-pencil hover:bg-piggy/20 border-transparent'
            }`}
          >
            {tab.icon}
            <span className="hidden xs:inline">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
