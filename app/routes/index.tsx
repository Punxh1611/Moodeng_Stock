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
    <div className="max-w-4xl mx-auto px-4 py-6">
      <header className="flex flex-col items-center mb-6">
        <MooDengMascot mood="happy" size={80} className="mb-2" />
        <h1 className="text-3xl font-bold text-ink">🦛 สต็อกของในห้อง</h1>
      </header>

      <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="bg-paper border-x-2 border-b-2 border-ink rounded-b-xl min-h-[50vh] p-4 sm:p-6 md:p-8">
        {activeTab === 'stock' && <StockTab />}
        {activeTab === 'shopping' && <ShoppingTab />}
        {activeTab === 'notes' && <NotesTab />}
        {activeTab === 'kitchen' && <KitchenTab />}
      </main>
    </div>
  );
}
