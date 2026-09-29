import React from 'react';
import { useNotes, useItems } from '~/lib/hooks';
import { NoteInput } from './NoteInput';
import { StickyNote } from './StickyNote';
import { DoodleBorder } from '~/components/svg/DoodleBorder';
import { DoodleButton } from '~/components/ui/DoodleButton';

export function NotesTab() {
  const { notes, addNote, toggleNote, deleteNote } = useNotes();
  const { lowStockItems } = useItems();

  const handleAddFromLowStock = (item: any) => {
    const exists = notes.find(n => n.item_id === item.id);
    if (!exists) {
      addNote(`ซื้อ ${item.name}`, item.id);
    }
  };

  return (
    <div className="flex flex-col gap-6 min-h-screen pb-10">
      <NoteInput onAdd={(text) => addNote(text)} />
      
      <div className="flex flex-col gap-3 mt-4">
        {notes.length === 0 ? (
          <div className="text-center text-pencil py-10 font-hand text-xl">
            ไม่มีโน้ต
          </div>
        ) : (
          notes.map((note) => (
            <StickyNote 
              key={note.id} 
              note={note} 
              onToggle={toggleNote} 
              onDelete={deleteNote} 
            />
          ))
        )}
      </div>

      {lowStockItems.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-bold font-hand text-danger mb-4 ml-2">⚠️ ของใกล้หมดในสต็อก</h3>
          <div className="flex flex-col gap-3">
            {lowStockItems.map(item => {
              const inNotes = notes.some(n => n.item_id === item.id);
              return (
                <div key={item.id} className="p-4 bg-red-50 border-2 border-danger/50 rounded-2xl flex items-center justify-between shadow-sm">
                  <div>
                    <span className="font-bold text-ink font-hand text-lg">{item.name}</span>
                    <span className="text-danger text-sm ml-2 font-hand font-bold bg-white px-2 py-0.5 rounded-full border border-danger/20">เหลือ {item.quantity} {item.unit}</span>
                  </div>
                  <DoodleButton 
                    size="sm" 
                    variant="ghost" 
                    onClick={() => handleAddFromLowStock(item)}
                    disabled={inNotes}
                    className="bg-white border-2 border-danger/20 text-danger hover:bg-danger hover:text-white"
                  >
                    {inNotes ? 'มีในโน้ตแล้ว' : '+ ส่งเข้าโน้ต'}
                  </DoodleButton>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
