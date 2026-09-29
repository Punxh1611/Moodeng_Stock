import React, { useState } from 'react';
import { DoodleButton } from '~/components/ui/DoodleButton';

interface NoteInputProps {
  onAdd: (text: string) => void;
}

export function NoteInput({ onAdd }: NoteInputProps) {
  const [text, setText] = useState('');

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (text.trim()) {
      onAdd(text.trim());
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full">
      <input 
        type="text" 
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="จดของที่ต้องซื้อ..."
        className="flex-1 bg-white border-[3px] border-piggy-dark rounded-full px-4 py-2 font-hand text-lg focus:outline-none focus:ring-4 focus:ring-piggy/30 shadow-sm"
      />
      <DoodleButton type="submit" variant="primary" size="sm" className="rounded-full px-6 shadow-sm hover:shadow-md">
        + เพิ่ม
      </DoodleButton>
    </form>
  );
}
