import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import HeaderBack from './HeaderBack';

interface WorryBoxProps {
  onBack: () => void;
  logActivity: (activity: string) => void;
}

export default function WorryBox({ onBack, logActivity }: WorryBoxProps) {
  const [worry, setWorry] = useState('');
  const [isDestroying, setIsDestroying] = useState(false);

  const handleDestroy = () => {
    if (!worry.trim()) return;
    setIsDestroying(true);
    setTimeout(() => {
      setWorry('');
      setIsDestroying(false);
      logActivity('Caixa de Preocupações');
    }, 1500);
  };

  return (
    <div className="animate-in fade-in">
      <HeaderBack onBack={onBack} title="Caixa de Preocupações" />
      
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <div className="text-center mb-5">
          <div className="w-14 h-14 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-3">
             <Trash2 className="w-6 h-6" />
          </div>
          <p className="text-xs text-gray-500 font-medium leading-relaxed">
            Escreva de forma livre e honesta aquilo que ronda por sua cabeça neste instante. Ao pressionar "Destruir", o app aplicará um efeito visual de desintegração enviando um estímulo reconfortante de alívio cognitivo ao cérebro.
          </p>
        </div>

        <textarea 
          className={`w-full bg-gray-50 border border-gray-150 rounded-2xl p-4 min-h-[140px] text-sm resize-none focus:ring-1 focus:ring-[#b388c4] focus:border-[#b388c4] focus:outline-none transition-all duration-1000
            ${isDestroying ? 'blur-md opacity-0 scale-95' : 'opacity-100'}`}
          placeholder="Me sinto sobrecarregado ao pensar em... / Sinto medo de..."
          value={worry}
          onChange={(e) => setWorry(e.target.value)}
          disabled={isDestroying}
        ></textarea>

        <button 
          onClick={handleDestroy}
          disabled={!worry.trim() || isDestroying}
          className={`w-full mt-4 py-4 rounded-xl font-bold text-white shadow-sm transition-all 
            ${!worry.trim() ? 'bg-gray-300 cursor-not-allowed' : isDestroying ? 'bg-emerald-500' : 'bg-[#1e293b] hover:bg-black'}`}
        >
          {isDestroying ? 'Pulverizando no vácuo...' : 'Destruir e Liberar'}
        </button>
      </div>
    </div>
  );
}
