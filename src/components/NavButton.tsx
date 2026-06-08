import React from 'react';

interface NavButtonProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export default function NavButton({ icon, label, isActive, onClick }: NavButtonProps) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center p-3.5 w-24 transition-colors select-none ${
        isActive ? 'text-[#b388c4]' : 'text-gray-400 hover:text-gray-600'
      }`}
    >
      <div className={`mb-1 transition-transform ${isActive ? 'scale-110 font-bold' : 'font-medium'}`}>
        {icon}
      </div>
      <span className={`text-[10px] tracking-wide leading-none ${isActive ? 'font-black' : 'font-medium'}`}>{label}</span>
      {isActive && <div className="w-1 h-1 bg-[#b388c4] rounded-full mt-1.5 animate-pulse"></div>}
    </button>
  );
}
