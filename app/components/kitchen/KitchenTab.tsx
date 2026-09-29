import React, { useState } from 'react';
import { FridgeNote, NoteStyle } from './FridgeNote';
import { DoodleButton } from '~/components/ui/DoodleButton';
import { MooDengMascot } from '~/components/svg/MooDengMascot';
import { ChefIcon, PlusIcon, TrashIcon, FoodIcon, NoteIcon, CloseIcon, SaveIcon } from '~/components/svg/KitchenIcons';
import { useKitchen } from '~/lib/hooks';
import { FridgeNoteItem } from '~/lib/types';

export function KitchenTab() {
  const { items, isLoading, addItem, updateItem, deleteItem } = useKitchen();
  
  const [showForm, setShowForm] = useState(false);
  const [newContent, setNewContent] = useState('');
  const [newType, setNewType] = useState<'menu' | 'note'>('menu');
  const [newStyle, setNewStyle] = useState<NoteStyle>('yellow-classic');
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [isConfirmingDelete, setIsConfirmingDelete] = useState<string | null>(null);

  const handleSave = async () => {
    if (!newContent.trim()) return alert('ใส่ข้อความก่อนจ้า');
    
    if (editingId) {
      await updateItem(editingId, { 
        content: newContent, 
        type: newType, 
        note_style: newStyle 
      });
    } else {
      await addItem({ 
        content: newContent, 
        type: newType, 
        note_style: newStyle, 
        is_today: false 
      });
    }
    closeForm();
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setNewContent('');
    setNewStyle('yellow-classic');
    setNewType('menu');
  };

  const openEdit = (item: FridgeNoteItem) => {
    setEditingId(item.id);
    setNewContent(item.content);
    setNewStyle(item.note_style as NoteStyle);
    setNewType(item.type);
    setShowForm(true);
  };

  const setAsTodayMenu = async (id: string) => {
    // Unset current today menu
    const currentToday = items.find(i => i.is_today && i.type === 'menu');
    if (currentToday && currentToday.id !== id) {
      await updateItem(currentToday.id, { is_today: false });
    }
    
    if (id) {
      // Set new today menu
      await updateItem(id, { is_today: true });
    }
  };

  const confirmDelete = async () => {
    if (isConfirmingDelete) {
      await deleteItem(isConfirmingDelete);
      setIsConfirmingDelete(null);
    }
  };

  const todayMenu = items.find(i => i.is_today && i.type === 'menu');
  const otherItems = items.filter(i => !(i.is_today && i.type === 'menu'));

  if (isLoading) {
    return <div className="text-center py-10 font-hand text-xl text-pencil">กำลังโหลดตู้เย็น...</div>;
  }

  return (
    <div className="flex flex-col gap-6 relative pb-20">
      <div className="bg-[#EAF2FF] -mx-4 sm:-mx-6 md:-mx-8 -mt-4 sm:-mt-6 md:-mt-8 p-6 sm:p-8 rounded-b-[2rem] shadow-[0_8px_20px_rgba(0,0,0,0.08)] min-h-[70vh]">
        
        {/* Whiteboard for today's menu */}
        <div className="bg-white rounded-xl border-[6px] border-gray-300 shadow-md p-6 mb-8 relative max-w-lg mx-auto transform -rotate-1">
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-2 bg-gray-200 rounded-full"></div>
          <h2 className="text-2xl font-bold text-ink mb-4 flex items-center justify-center gap-2">
            <ChefIcon className="w-8 h-8 text-blue-500" /> เมนูอาหารวันนี้
          </h2>
          
          {todayMenu ? (
            <div className="text-center">
              <p className="text-3xl text-blue-600 font-bold whitespace-pre-wrap">{todayMenu.content}</p>
              <div className="mt-4 flex justify-center">
                <DoodleButton onClick={() => setAsTodayMenu('')} variant="secondary" className="text-sm py-1 px-3">
                  ยกเลิกเมนูวันนี้
                </DoodleButton>
              </div>
            </div>
          ) : (
            <div className="text-center text-pencil text-xl flex flex-col items-center">
              <MooDengMascot mood="sad" size={60} className="mb-2 opacity-50" />
              ยังไม่มีเมนูสำหรับวันนี้เลย...
            </div>
          )}
        </div>

        {/* Fridge items grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 auto-rows-max">
          {otherItems.map(item => (
            <div key={item.id} className="relative group">
              <FridgeNote 
                content={item.content} 
                noteStyle={item.note_style as NoteStyle}
                onEdit={() => openEdit(item)}
                onDelete={() => setIsConfirmingDelete(item.id)}
              />
              {item.type === 'menu' && (
                <button 
                  onClick={() => setAsTodayMenu(item.id)}
                  className="absolute -top-3 -right-3 bg-white text-xs font-bold border-2 border-piggy-dark text-ink px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm z-20 hover:bg-piggy"
                >
                  กินวันนี้!
                </button>
              )}
            </div>
          ))}
        </div>

      </div>

      <div className="fixed bottom-6 right-6 z-40">
        <button 
          onClick={() => setShowForm(true)}
          className="font-hand font-bold rounded-xl transition-all hover:rotate-[-1deg] hover:scale-105 bg-blue-300 hover:bg-blue-400 text-ink border-2 border-ink px-6 py-3 text-lg shadow-xl flex items-center gap-2"
        >
          <PlusIcon className="w-6 h-6" /> แปะโน้ตเพิ่ม
        </button>
      </div>

      {/* Add/Edit Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-[2rem] border-4 border-blue-300 p-6 sm:p-8 w-full max-w-md relative shadow-xl font-hand animate-[pop-in_0.3s_ease-out]">
            <button onClick={closeForm} className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center font-bold text-ink hover:text-danger hover:bg-gray-100 rounded-full transition-colors text-xl">
              <CloseIcon />
            </button>
            
            <h2 className="text-3xl font-bold text-ink mb-4 flex items-center gap-2">
              {editingId ? <><NoteIcon className="w-8 h-8 text-blue-500" /> แก้ไขโน้ต</> : <><PlusIcon className="w-8 h-8 text-piggy-dark" /> แปะโน้ตใหม่</>}
            </h2>
            
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-ink font-bold mb-2">ประเภท</label>
                <div className="flex gap-2">
                  <button onClick={() => setNewType('menu')} className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl border-2 transition-colors ${newType === 'menu' ? 'bg-piggy border-piggy-dark font-bold' : 'bg-gray-50 border-gray-200'}`}>
                    <FoodIcon className="w-5 h-5" /> เมนูอาหาร
                  </button>
                  <button onClick={() => setNewType('note')} className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl border-2 transition-colors ${newType === 'note' ? 'bg-blue-200 border-blue-400 font-bold' : 'bg-gray-50 border-gray-200'}`}>
                    <NoteIcon className="w-5 h-5" /> โน้ตทั่วไป
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-ink font-bold mb-2">ข้อความ</label>
                <textarea 
                  value={newContent} 
                  onChange={e => setNewContent(e.target.value)}
                  className="w-full bg-gray-50 border-[3px] border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-4 focus:ring-blue-200 text-lg resize-none"
                  rows={3}
                  placeholder={newType === 'menu' ? 'เช่น ข้าวมันไก่...' : 'จดโน้ตอะไรดี...'}
                />
              </div>

              <div>
                <label className="block text-ink font-bold mb-2">สไตล์กระดาษโน้ต</label>
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={() => setNewStyle('yellow-classic')} className={`p-2 rounded-lg border-2 ${newStyle === 'yellow-classic' ? 'border-ink bg-gray-100' : 'border-transparent'}`}>
                    <div className="w-full h-8 bg-yellow-200 rounded-sm border border-yellow-400 relative">
                      <div className="absolute top-1 right-1 w-2 h-2 bg-gray-400 rounded-full border border-gray-500"></div>
                    </div>
                  </button>
                  <button onClick={() => setNewStyle('pink-tape')} className={`p-2 rounded-lg border-2 ${newStyle === 'pink-tape' ? 'border-ink bg-gray-100' : 'border-transparent'}`}>
                    <div className="w-full h-8 bg-pink-100 rounded-sm border border-pink-300 relative">
                       <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-4 h-2 bg-white/50 border border-white/40"></div>
                    </div>
                  </button>
                  <button onClick={() => setNewStyle('blue-lines')} className={`p-2 rounded-lg border-2 ${newStyle === 'blue-lines' ? 'border-ink bg-gray-100' : 'border-transparent'}`}>
                    <div className="w-full h-8 bg-blue-50 rounded-sm border border-blue-200 relative bg-[repeating-linear-gradient(transparent,transparent_4px,#cbd5e1_5px)]">
                      <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                    </div>
                  </button>
                  <button onClick={() => setNewStyle('memo-pad')} className={`p-2 rounded-lg border-2 ${newStyle === 'memo-pad' ? 'border-ink bg-gray-100' : 'border-transparent'}`}>
                    <div className="w-full h-8 bg-amber-50 border-t-[4px] border-amber-300 rounded-sm"></div>
                  </button>
                </div>
              </div>

              <DoodleButton onClick={handleSave} variant="primary" className="w-full py-3 mt-2 text-xl shadow-md flex items-center justify-center gap-2">
                {editingId ? <SaveIcon className="w-6 h-6" /> : <PlusIcon className="w-6 h-6" />}
                {editingId ? 'บันทึก' : 'แปะเลย!'}
              </DoodleButton>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isConfirmingDelete && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-pink-50 rounded-[2rem] border-4 border-piggy p-6 sm:p-8 relative flex flex-col gap-5 shadow-xl font-hand w-full max-w-sm animate-[pop-in_0.3s_ease-out]">
            <button 
              onClick={() => setIsConfirmingDelete(null)}
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center font-bold text-ink hover:text-danger hover:bg-white rounded-full transition-colors text-xl z-10"
            >
              <CloseIcon />
            </button>
            <div className="flex flex-col items-center text-center gap-4 py-2">
              <MooDengMascot mood="sad" size={90} className="drop-shadow-sm" />
              <div>
                <h2 className="text-3xl font-bold text-ink mb-1">ดึงโน้ตออก?</h2>
                <p className="text-lg text-pencil">โน้ตจะถูกทิ้งถังขยะน้า</p>
              </div>
              <div className="flex w-full gap-3 mt-4">
                <DoodleButton onClick={() => setIsConfirmingDelete(null)} variant="secondary" className="flex-1 text-lg py-2 bg-white">
                  ไม่ดึงละ
                </DoodleButton>
                <DoodleButton onClick={confirmDelete} variant="danger" className="flex-1 text-lg py-2 flex justify-center items-center gap-2">
                  <TrashIcon className="w-5 h-5 text-white" /> ดึงออก!
                </DoodleButton>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
