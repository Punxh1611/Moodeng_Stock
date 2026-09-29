import React from 'react';

interface TabBarProps {
  activeTab: 'stock' | 'shopping' | 'notes';
  onTabChange: (tab: 'stock' | 'shopping' | 'notes') => void;
}

export function TabBar({ activeTab, onTabChange }: TabBarProps) {
  const tabs = [
    { id: 'stock', icon: '📦', label: 'สต็อก' },
    { id: 'shopping', icon: '🛒', label: 'ช้อปปิ้ง' },
    { id: 'notes', icon: '📝', label: 'โน้ต' },
  ] as const;

  return (
    <div className="flex bg-paper border-b-2 border-ink font-hand">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex-1 py-3 px-4 text-center text-lg rounded-t-xl transition-colors border-b-3 ${
              isActive 
                ? 'bg-piggy text-ink border-ink font-bold' 
                : 'bg-transparent text-pencil hover:bg-piggy/20 border-transparent'
            }`}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
