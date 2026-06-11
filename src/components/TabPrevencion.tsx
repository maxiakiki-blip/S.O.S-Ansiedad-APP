import React, { useState } from 'react';
import { Hand, Trash2, Music, Sparkles, Info } from 'lucide-react';
import TappingExercise from './TappingExercise';
import WorryBox from './WorryBox';
import CalmingSounds from './CalmingSounds';
import MotivationalQuotes from './MotivationalQuotes';

interface TabPrevencionProps {
  logActivity: (activity: string) => void;
  logMood: (mood: string) => void;
  currentMood?: string;
}

export default function TabPrevencion({ logActivity, logMood, currentMood }: TabPrevencionProps) {
  const [activeModule, setActiveModule] = useState<string | null>(null);

  const moodOptions = [
    { id: 'muy_ansioso', emoji: '😫', label: 'Ansioso' },
    { id: 'inquieto', emoji: '😕', label: 'Inquieto' },
    { id: 'tranquilo', emoji: '🙂', label: 'Tranquilo' },
    { id: 'genial', emoji: '😌', label: 'Ótimo' },
  ];

  const modules = [
    { id: 'tapping', title: 'Acupressão (7 Pontos)', desc: 'Guia clínico de pontos anatômicos', icon: <Hand className="w-6 h-6 text-emerald-500"/>, bg: 'bg-emerald-50' },
    { id: 'caja', title: 'Caixa de Preocupações', desc: 'Dissolva e liberte o que te preocupa', icon: <Trash2 className="w-6 h-6 text-rose-500"/>, bg: 'bg-rose-50' },
    { id: 'sonidos', title: 'Sons Relaxantes', desc: 'Frequências solfeggio e binaurais', icon: <Music className="w-6 h-6 text-indigo-500"/>, bg: 'bg-indigo-50' },
    { id: 'frases', title: 'Dose de Motivação', desc: 'Cognições e reenquadramentos positivos', icon: <Sparkles className="w-6 h-6 text-amber-500"/>, bg: 'bg-amber-50' },
  ];

  if (activeModule === 'tapping') return <TappingExercise onBack={() => setActiveModule(null)} logActivity={logActivity} />;
  if (activeModule === 'caja') return <WorryBox onBack={() => setActiveModule(null)} logActivity={logActivity} />;
  if (activeModule === 'sonidos') return <CalmingSounds onBack={() => setActiveModule(null)} logActivity={logActivity} />;
  if (activeModule === 'frases') return <MotivationalQuotes onBack={() => setActiveModule(null)} logActivity={logActivity} />;

  return (
    <div className="animate-in fade-in duration-300">
      
      {/* MOOD TRACKER */}
      <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 mb-6 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-[#F5EFFF] rounded-full -mr-8 -mt-8 blur-2xl"></div>
        <h3 className="font-bold text-[#1e293b] mb-4 relative z-10 text-sm">Como você está se sentindo hoje?</h3>
        <div className="flex justify-between gap-2 relative z-10">
          {moodOptions.map(m => (
            <button 
              key={m.id}
              onClick={() => logMood(m.id)}
              className={`flex-1 flex flex-col items-center p-3 rounded-2xl transition-all border ${
                currentMood === m.id 
                  ? 'bg-[#b388c4] text-white border-[#b388c4] shadow-md scale-105 font-bold' 
                  : 'bg-gray-50 text-gray-500 border-gray-100 hover:bg-gray-100 hover:border-gray-200 font-medium'
              }`}
            >
              <span className="text-3xl mb-2 filter drop-shadow-sm">{m.emoji}</span>
              <span className="text-[10px] tracking-wide">{m.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-black text-[#1e293b] mb-1">Hábitos Preventivos</h2>
        <p className="text-gray-400 text-xs font-medium">A prática diária fortalece o sistema parassimpático para evitar picos de ansiedade.</p>
      </div>

      <div className="grid grid-cols-2 gap-3.5">
        {modules.map(mod => (
          <button 
            key={mod.id}
            onClick={() => setActiveModule(mod.id)}
            className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center gap-3 hover:shadow-md transition-all group"
          >
            <div className={`p-3 rounded-full ${mod.bg} group-hover:scale-110 transition-transform`}>
              {mod.icon}
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#1e293b] leading-tight mb-1">{mod.title}</h3>
              <p className="text-[10px] text-gray-400 font-medium leading-tight">{mod.desc}</p>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-6 bg-[#F5EFFF] p-5 rounded-2xl border border-[#b388c4]/20">
        <div className="flex gap-3 items-start">
          <Info className="w-5 h-5 text-[#b388c4] flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-[#1e293b] text-xs mb-1">Guia recomendado</h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              Conclua pelo menos 2 atividades de prevenção por dia para manter uma mente em equilíbrio e um sistema nervoso calmo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
