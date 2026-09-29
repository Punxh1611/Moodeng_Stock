import React, { useState } from 'react';
import { Note } from '~/lib/types';

interface StickyNoteProps {
  note: Note;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function StickyNote({ note, onToggle, onDelete }: StickyNoteProps) {
  const [isHovered, setIsHovered] = useState(false);
  const rotateClass = (note.id.charCodeAt(0) % 2 === 0) ? 'rotate-1' : '-rotate-1';

  return (
    <div 
      className={`relative w-full transition-transform hover:scale-105 ${rotateClass} my-2`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Tape */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-6 bg-white/50 backdrop-blur-sm shadow-sm rotate-3 z-10"></div>
      
      {/* Note Body */}
      <div className="p-4 bg-amber-100 border border-amber-200 shadow-md flex items-center gap-3">
        <button 
          onClick={() => onToggle(note.id)}
          className={`w-6 h-6 border-2 border-ink rounded flex items-center justify-center bg-white shrink-0 shadow-sm`}
        >
          {note.is_done && <span className="text-ink font-bold text-lg leading-none mb-1">✓</span>}
        </button>
        
        <span className={`flex-1 font-hand text-lg break-words ${note.is_done ? 'line-through text-pencil opacity-60' : 'text-ink'}`}>
          {note.text}
        </span>
        
        <button 
          onClick={() => onDelete(note.id)}
          className={`text-danger font-bold hover:scale-110 p-2 transition-opacity ${isHovered ? 'opacity-100' : 'opacity-0'}`}
        >
          🗑️
        </button>
      </div>
    </div>
  );
}
