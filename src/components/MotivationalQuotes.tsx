import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import HeaderBack from './HeaderBack';

interface MotivationalProps {
  onBack: () => void;
  logActivity: (activity: string) => void;
}

export default function MotivationalQuotes({ onBack, logActivity }: MotivationalProps) {
  const quotes = [
    "A ansiedade é como uma onda forte do mar. O melhor é não lutar diretamente contra ela; deixe-se flutuar até que a maré baixe naturalmente.",
    "Você não tem a obrigação de resolver toda a sua vida neste exato segundo. Concentre-se exclusivamente em sua próxima respiração suave.",
    "Esta tempestade também passará. As emoções são como nuvens que cruzam o céu; você é o céu imenso de fundo, inalterável.",
    "A paz não consiste na ausência de tempestades ao seu redor, mas sim em cultivar o silêncio e a segurança no seu interior.",
    "Você está seguro aqui e agora. Não deixe que as fantasias temerosas do futuro roubem o aconchego do momento presente."
  ];
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => { 
    logActivity('Leitura Motivacional'); 
  }, []);

  const nextQuote = () => {
    setCurrentIdx((prev) => (prev + 1) % quotes.length);
  };

  return (
    <div className="animate-in fade-in h-[70vh] flex flex-col justify-between pb-8">
      <HeaderBack onBack={onBack} title="Dose de Motivação" />
      
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
              Próxima Reflexão
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
