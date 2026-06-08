import React, { useState } from 'react';
import { Wind, Hand, AlertCircle, Play } from 'lucide-react';
import BreathingExercise from './BreathingExercise';
import GroundingExercise from './GroundingExercise';

interface TabRescateProps {
  logActivity: (activity: string) => void;
}

export default function TabRescate({ logActivity }: TabRescateProps) {
  const [activeEmergency, setActiveEmergency] = useState<string | null>(null);

  if (activeEmergency === 'breathing') {
    return (
      <BreathingExercise 
        onBack={() => setActiveEmergency(null)} 
        logActivity={logActivity} 
        onComplete={() => setActiveEmergency('grounding')} 
      />
    );
  }
  if (activeEmergency === 'grounding') {
    return (
      <GroundingExercise 
        onBack={() => setActiveEmergency(null)} 
        logActivity={logActivity} 
      />
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] animate-in fade-in duration-300">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-black text-[#1e293b] mb-2">¿Sientes Ansiedad Ahora?</h2>
        <p className="text-gray-500 text-sm px-4">Pulsa el botón de emergencia para iniciar el protocolo de rescate inmediato.</p>
      </div>

      <button 
        onClick={() => setActiveEmergency('breathing')}
        className="relative w-44 h-44 bg-[#b388c4] rounded-full flex flex-col items-center justify-center text-white shadow-xl shadow-[#b388c4]/30 hover:scale-105 active:scale-95 transition-all mb-10 border-4 border-white"
      >
        <div className="absolute inset-0 rounded-full border-2 border-[#b388c4] animate-ping opacity-20"></div>
        <AlertCircle className="w-12 h-12 mb-2" />
        <span className="font-extrabold text-xl tracking-wider">S.O.S</span>
        <span className="text-[10px] font-black tracking-widest opacity-80 mt-1">INICIAR RESCATE</span>
      </button>

      <div className="w-full space-y-3">
        <button 
          onClick={() => setActiveEmergency('breathing')}
          className="w-full bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between hover:bg-gray-50 active:bg-gray-100 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="bg-blue-50 p-2.5 rounded-xl text-blue-500"><Wind className="w-5 h-5" /></div>
            <div className="text-left">
              <h3 className="font-bold text-[#1e293b] text-sm">Respiración Táctica</h3>
              <p className="text-xs text-gray-400 font-medium">Caja de 4 segundos: estabiliza tu pulso</p>
            </div>
          </div>
          <Play className="w-5 h-5 text-gray-400 fill-current" />
        </button>

        <button 
          onClick={() => setActiveEmergency('grounding')}
          className="w-full bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between hover:bg-gray-50 active:bg-gray-100 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="bg-emerald-50 p-2.5 rounded-xl text-emerald-500"><Hand className="w-5 h-5" /></div>
            <div className="text-left">
              <h3 className="font-bold text-[#1e293b] text-sm">Conexión Sensorial</h3>
              <p className="text-xs text-gray-400 font-medium">Método 5-4-3-2-1: enraízate ahora</p>
            </div>
          </div>
          <Play className="w-5 h-5 text-gray-400 fill-current" />
        </button>
      </div>
    </div>
  );
}
