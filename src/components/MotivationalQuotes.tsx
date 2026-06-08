import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import HeaderBack from './HeaderBack';

interface MotivationalProps {
  onBack: () => void;
  logActivity: (activity: string) => void;
}

export default function MotivationalQuotes({ onBack, logActivity }: MotivationalProps) {
  const quotes = [
    "La ansiedad es como una ola fuerte de mar. Lo mejor es no luchar directo contra ella; déjate flotar hasta que la marea baje naturalmente.",
    "No tienes la obligación de resolver tu vida entera en este mismo segundo. Céntrate exclusivamente en el próximo respiro sutil.",
    "Esta tormenta también pasará. Las emociones son como nubes que cruzan el cielo; tú eres el cielo inmenso de fondo, inalterable.",
    "La paz no consiste en la ausencia de tormentas a tu alrededor, sino en cultivar el silencio y la seguridad en tu interior.",
    "Estás a salvo aquí y ahora. No dejes que las fantasías temerosas del futuro roben la calidez del momento presente."
  ];
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => { 
    logActivity('Lectura Motivacional'); 
  }, []);

  const nextQuote = () => {
    setCurrentIdx((prev) => (prev + 1) % quotes.length);
  };

  return (
    <div className="animate-in fade-in h-[70vh] flex flex-col justify-between pb-8">
      <HeaderBack onBack={onBack} title="Dosis de Motivación" />
      
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 text-center relative w-full flex flex-col justify-center min-h-[250px]">
          <Sparkles className="w-10 h-10 text-amber-400 mx-auto mb-6 absolute -top-5 left-1/2 -translate-x-1/2 bg-white rounded-full p-2 border border-amber-200/50" />
          <p className="text-lg font-serif text-[#1e293b] italic mb-8 leading-relaxed">
            "{quotes[currentIdx]}"
          </p>
          <div>
            <button 
              onClick={nextQuote}
              className="px-5 py-2.5 bg-amber-50 text-amber-700 rounded-full text-xs font-black border border-amber-200/30 hover:bg-amber-100 transition-colors"
            >
              Siguiente Reflexión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
