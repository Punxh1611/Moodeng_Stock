import { createFileRoute } from '@tanstack/react-router';
import React, { useState } from 'react';
import { TabBar, TabType } from '~/components/ui/TabBar';
import { MooDengMascot } from '~/components/svg/MooDengMascot';

import { StockTab } from '~/components/stock/StockTab';
import { ShoppingTab } from '~/components/shopping/ShoppingTab';
import { NotesTab } from '~/components/notes/NotesTab';
import { KitchenTab } from '~/components/kitchen/KitchenTab';

export const Route = createFileRoute('/')({
  component: IndexPage,
  head: () => ({
    meta: [
      { title: 'สต็อกของในห้อง — ฮิปโป' }
    ]
  })
});

function IndexPage() {
  const [activeTab, setActiveTab] = useState<TabType>('stock');

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-6 py-4 sm:py-8">
      <header className="flex flex-col items-center mb-5 sm:mb-7 text-center">
        <div className="relative inline-block mb-1">
          <MooDengMascot mood="happy" size={76} className="filter drop-shadow-sm transition-transform hover:scale-110 cursor-pointer" />
          <span className="absolute -bottom-1 -right-2 bg-piggy text-ink text-xs font-bold px-2 py-0.5 rounded-full border border-ink shadow-xs">
            v2.0
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-ink tracking-tight mt-1">
          ตู้เสบียงน้องหมูเด้ง
        </h1>
        <p className="text-pencil text-sm sm:text-base font-medium mt-0.5">
          สต็อกของใช้ & ของกินในห้อง 🥣✨
        </p>
      </header>

      <div className="bg-paper border-[3px] border-ink rounded-3xl shadow-[0_6px_0_#3D3329] overflow-hidden">
        <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
        
        <main className="min-h-[60vh] p-4 sm:p-6 md:p-8">
          {activeTab === 'stock' && <StockTab />}
          {activeTab === 'shopping' && <ShoppingTab />}
          {activeTab === 'notes' && <NotesTab />}
          {activeTab === 'kitchen' && <KitchenTab />}
        </main>
      </div>
    </div>
  );
}
