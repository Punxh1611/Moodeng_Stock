import React, { useEffect } from 'react';

interface ToastAlertProps {
  message: string;
  variant?: 'error' | 'success';
  onClose: () => void;
}

export function ToastAlert({ message, variant = 'error', onClose }: ToastAlertProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = variant === 'error' ? 'bg-[#EF665B]' : 'bg-green-500';

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] animate-[pop-in_0.3s_ease-out]">
      <div className={`w-80 p-3 flex flex-row items-center justify-start ${bgColor} rounded-lg shadow-md font-hand`}>
        <div className="w-5 h-5 -translate-y-[1px] mr-2 shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
            <path fill="#fff" d="m13 13h-2v-6h2zm0 4h-2v-2h2zm-1-15c-1.3132 0-2.61358.25866-3.82683.7612-1.21326.50255-2.31565 1.23915-3.24424 2.16773-1.87536 1.87537-2.92893 4.41891-2.92893 7.07107 0 2.6522 1.05357 5.1957 2.92893 7.0711.92859.9286 2.03098 1.6651 3.24424 2.1677 1.21325.5025 2.51363.7612 3.82683.7612 2.6522 0 5.1957-1.0536 7.0711-2.9289 1.8753-1.8754 2.9289-4.4189 2.9289-7.0711 0-1.3132-.2587-2.61358-.7612-3.82683-.5026-1.21326-1.2391-2.31565-2.1677-3.24424-.9286-.92858-2.031-1.66518-3.2443-2.16773-1.2132-.50254-2.5136-.7612-3.8268-.7612z" />
          </svg>
        </div>
        <div className="font-medium text-lg text-white flex-1">{message}</div>
        <div className="w-5 h-5 cursor-pointer ml-auto shrink-0 opacity-80 hover:opacity-100 transition-opacity" onClick={onClose}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path fill="#fff" d="m15.8333 5.34166-1.175-1.175-4.6583 4.65834-4.65833-4.65834-1.175 1.175 4.65833 4.65834-4.65833 4.6583 1.175 1.175 4.65833-4.6583 4.6583 4.6583 1.175-1.175-4.6583-4.6583z" />
          </svg>
        </div>
      </div>
    </div>
  );
}
