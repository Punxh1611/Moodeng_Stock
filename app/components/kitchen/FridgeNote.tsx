import React from 'react';
import { TrashIcon } from '~/components/svg/KitchenIcons';

export type NoteStyle = 'yellow-classic' | 'pink-tape' | 'blue-lines' | 'memo-pad';

interface FridgeNoteProps {
  content: string;
  noteStyle: NoteStyle;
  isTodayMenu?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function FridgeNote({ content, noteStyle, isTodayMenu, onEdit, onDelete }: FridgeNoteProps) {
  const getStyleClasses = () => {
    switch (noteStyle) {
      case 'pink-tape':
        return 'bg-pink-100 border-2 border-pink-300 text-pink-900 rounded-sm shadow-md rotate-1';
      case 'blue-lines':
        return 'bg-blue-50 border-2 border-blue-200 text-blue-900 rounded-md shadow-md -rotate-1 bg-[repeating-linear-gradient(transparent,transparent_24px,#cbd5e1_25px)] leading-[25px] pt-8';
      case 'memo-pad':
        return 'bg-amber-50 border-t-[12px] border-t-amber-300 border-x-2 border-b-2 border-amber-200 text-amber-900 rounded-sm shadow-md rotate-2';
      case 'yellow-classic':
      default:
        return 'bg-yellow-200 border-2 border-yellow-400 text-yellow-900 rounded-br-2xl shadow-md -rotate-2';
    }
  };

  return (
    <div className={`relative p-4 font-hand text-lg min-h-[120px] group transition-transform hover:scale-105 hover:z-10 cursor-pointer ${getStyleClasses()}`}>
      {/* Tape for pink-tape style */}
      {noteStyle === 'pink-tape' && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-6 bg-white/50 border border-white/40 -rotate-3 backdrop-blur-sm shadow-sm" />
      )}
      
      {/* Magnet for classic yellow */}
      {noteStyle === 'yellow-classic' && (
        <div className="absolute top-2 right-2 w-4 h-4 bg-gray-400 rounded-full shadow-inner border border-gray-500" />
      )}
      
      {/* Push pin for blue lines */}
      {noteStyle === 'blue-lines' && (
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-red-500 rounded-full shadow-sm border border-red-700 before:content-[''] before:absolute before:w-1 before:h-1 before:bg-white/60 before:rounded-full before:top-[1px] before:left-[1px]" />
      )}

      {isTodayMenu && (
        <div className="absolute -top-4 -right-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg rotate-12 border-2 border-white animate-bounce">
          ✨ วันนี้!
        </div>
      )}

      <div className="whitespace-pre-wrap break-words" onClick={onEdit}>
        {content || 'พิมพ์ข้อความที่นี่...'}
      </div>

      <button 
        onClick={(e) => { e.stopPropagation(); onDelete?.(); }}
        className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 hover:bg-white text-danger w-8 h-8 rounded-full flex items-center justify-center shadow-sm"
      >
        <TrashIcon className="w-4 h-4" />
      </button>
    </div>
  );
}
