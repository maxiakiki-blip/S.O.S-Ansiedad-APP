import React, { useState, useEffect, useRef } from 'react';
import { 
  Hand as HandIcon, 
  RefreshCcw, 
  Activity, 
  Zap, 
  MousePointer2, 
  Target,
  Play,
  CheckCircle2,
  Info
} from 'lucide-react';
import HeaderBack from './HeaderBack';
import TappingPointSVG from './TappingPointSVG';

interface TappingProps {
  onBack: () => void;
  logActivity: (activity: string) => void;
}

interface PointData {
  id: number;
  name: string;
  pos: string;
  locationText: string;
  techniques: { id: string; name: string; icon: React.ReactNode; desc: string }[];
  tips: string;
  duration: number;
}

export default function TappingExercise({ onBack, logActivity }: TappingProps) {
  // Datos clínicos de los 7 puntos acupresión
  const points: PointData[] = [
    { 
      id: 1, name: 'Entre las cejas (Yintang)', pos: 'Rostro', 
      locationText: 'Justo en el centro del entrecejo, entre el inicio de ambas cejas.',
      techniques: [
        { id: 'static', name: 'Presión Estática', icon: <HandIcon className="w-3.5 h-3.5"/>, desc: 'Aplica la yema del dedo índice o medio con presión media sosteniendo sin mover.' },
        { id: 'circular', name: 'Masaje Circular', icon: <RefreshCcw className="w-3.5 h-3.5"/>, desc: 'Realiza círculos lentos y continuos manteniendo el dedo en contacto.' }
      ],
      tips: 'Excelente para aliviar el torrente de pensamientos rápidos y la agitación mental.',
      duration: 30,
    },
    { 
      id: 2, name: 'Debajo de la nariz (Renzhong)', pos: 'Rostro', 
      locationText: 'En el centro del surco nasolabial, un tercio debajo de la base nasal.',
      techniques: [
        { id: 'static', name: 'Presión Directa', icon: <HandIcon className="w-3.5 h-3.5"/>, desc: 'Ejerce una presión constante y moderada apuntando levemente hacia el paladar.' },
        { id: 'circular', name: 'Micro círculos', icon: <RefreshCcw className="w-3.5 h-3.5"/>, desc: 'Mueve milimétricamente el tejido celular subcutáneo de forma circular.' }
      ],
      tips: 'Conocido históricamente como el punto de resucitación para reenfocar la lucidez sensorial.',
      duration: 30,
    },
    { 
      id: 3, name: 'Mentón inferior (Chengjiang)', pos: 'Rostro', 
      locationText: 'En la depresión central justo por debajo del labio inferior.',
      techniques: [
        { id: 'static', name: 'Presión Central', icon: <HandIcon className="w-3.5 h-3.5"/>, desc: 'Coloca el dedo y empuja de manera suave contra la mandíbula.' }
      ],
      tips: 'Ayuda a disipar la tensión acumulada de mordida por estrés nocturno (bruxismo).',
      duration: 20,
    },
    { 
      id: 4, name: 'Interior de la muñeca (Neiguan)', pos: 'Brazo', 
      locationText: 'Toma la muñeca, mide tres dedos bajo el pliegue, justo en el medio.',
      techniques: [
        { id: 'static', name: 'Presión Firme', icon: <Target className="w-3.5 h-3.5"/>, desc: 'Presiona con regularidad hacia el tendón principal, de forma constante.' },
        { id: 'pulsating', name: 'Presión Rítmica', icon: <Activity className="w-3.5 h-3.5"/>, desc: 'Presiona firmemente durante 3 segundos, libera levemente y repite.' }
      ],
      tips: 'El punto indispensable para calmar las náuseas nerviosas y aceleraciones de pulso.',
      duration: 60,
    },
    { 
      id: 5, name: 'Centro de la palma (Laogong)', pos: 'Mano', 
      locationText: 'En medio de la palma de tu mano, justo donde asienta el dedo medio al plegar el puño.',
      techniques: [
        { id: 'circular', name: 'Presión circular con el pulgar', icon: <RefreshCcw className="w-3.5 h-3.5"/>, desc: 'Masajea profundamente con pases concéntricos usando la mano opuesta.' },
        { id: 'friction', name: 'Calor táctil', icon: <Zap className="w-3.5 h-3.5"/>, desc: 'Presiona estático frotando suavemente para entibiar el punto.' }
      ],
      tips: 'Eficaz para bajar calor y liberar la angustia contenida que se aloja en el pecho.',
      duration: 30,
    },
    { 
      id: 6, name: 'Trapecio / Hombro (Jianjing)', pos: 'Hombro', 
      locationText: 'A mitad de camino entre la base lateral del cuello y la corona ósea del hombro.',
      techniques: [
        { id: 'static', name: 'Presión pinza', icon: <MousePointer2 className="w-3.5 h-3.5"/>, desc: 'Sujeta levemente el músculo con los dedos indice y pulgar en forma de gancho.' },
        { id: 'circular', name: 'Descontractura', icon: <RefreshCcw className="w-3.5 h-3.5"/>, desc: 'Masajea con círculos pequeños para soltar la mochila del estrés diario.' }
      ],
      tips: 'Libera los canales tensos del cuello y alivia la jaqueca de opresión provocada por la rigidez.',
      duration: 30,
    },
    { 
      id: 7, name: 'Sub-rótula lateral (Zusanli)', pos: 'Leg', 
      locationText: 'Cuatro dedos debajo de la rótula, un dedo de ancho hacia la cara externa.',
      techniques: [
        { id: 'static', name: 'Presión fuerte', icon: <HandIcon className="w-3.5 h-3.5"/>, desc: 'Sostén con tu pulgar ejerciendo una fuerza compacta hacia la espinilla lateral.' },
        { id: 'tapping', name: 'Percusión', icon: <Activity className="w-3.5 h-3.5"/>, desc: 'Golpetea rítmicamente con suavidad usando el puño cerrado relajado.' }
      ],
      tips: 'Punto restaurador maestro que enraíza la energía bajando la sobrecarga pensante.',
      duration: 40,
    },
  ];

  const [activePoint, setActivePoint] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(points[0].duration);
  const [isFinished, setIsFinished] = useState(false);
  const [selectedTech, setSelectedTech] = useState('static');
  
  const currentPoint = points[activePoint];
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Reproductor de Campanillas Suaves (Web Audio API) para marcar finalización acústica
  const playTimerChime = (type: 'start' | 'end') => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;
      osc.type = 'sine'; 

      if (type === 'start') {
        osc.frequency.setValueAtTime(440, now); 
        osc.frequency.exponentialRampToValueAtTime(554.37, now + 0.1); 
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.2, now + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 1.2);
        osc.start(now);
        osc.stop(now + 1.2);
      } else if (type === 'end') {
        osc.frequency.setValueAtTime(554.37, now); 
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.2, now + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.05, now + 0.4);
        
        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.connect(gain2);
        gain2.connect(ctx.destination);
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(440, now + 0.3); 
        gain2.gain.setValueAtTime(0, now + 0.3);
        gain2.gain.linearRampToValueAtTime(0.2, now + 0.35);
        gain2.gain.exponentialRampToValueAtTime(0.01, now + 1.5);
        
        osc.start(now);
        osc.stop(now + 0.45);
        osc2.start(now + 0.3);
        osc2.stop(now + 1.5);
      }
    } catch (e) { 
      console.warn("Audio error", e); 
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
             playTimerChime('end'); 
             setIsActive(false);
             return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const handleStartTimer = () => {
    playTimerChime('start'); 
    setIsActive(true);
  };

  const nextPoint = () => {
    if (activePoint < points.length - 1) {
      const nextIdx = activePoint + 1;
      setActivePoint(nextIdx);
      setIsActive(false);
      setTimeLeft(points[nextIdx].duration);
      setSelectedTech('static'); 
    } else {
      setIsFinished(true);
      logActivity('Acupresión (7 Puntos)');
    }
  };

  if (isFinished) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center animate-in zoom-in duration-300 px-4">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mb-5 border border-emerald-200 shadow-xs">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h2 className="text-xl font-bold mb-3 text-[#1e293b]">¡Acupresión completada!</h2>
        <p className="text-gray-600 mb-8 text-xs leading-relaxed max-w-xs">
          Has estimulado los 7 canales de acupresión. Tu energía corporal está balanceada y has aliviado gran parte de la tensión física provocada por la respuesta de lucha o huida.
        </p>
        <button 
          onClick={onBack} 
          className="w-full py-4 rounded-xl font-bold text-white bg-[#1e293b] hover:bg-black transition-colors"
        >
          Volver a Prevención
        </button>
      </div>
    );
  }

  const isStepComplete = timeLeft === 0;

  return (
    <div className="animate-in fade-in pb-8">
      <HeaderBack onBack={onBack} title="Acupresión: 7 Puntos" />
      
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 relative overflow-hidden">
        
        {/* Progress header */}
        <div className="flex justify-between items-center mb-5">
           <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">PASO {activePoint + 1} DE {points.length}</span>
           <div className="flex gap-1">
             {points.map((_, i) => (
                <div key={i} className={`w-1.5 h-1.5 rounded-full transition-colors ${i === activePoint ? 'bg-[#b388c4]' : i < activePoint ? 'bg-[#EAE0F1]' : 'bg-gray-100'}`}></div>
             ))}
           </div>
        </div>

        {/* CONTENIDO INTERACTIVO */}
        <div className="flex flex-col">
           <div className="text-center mb-4">
             <h3 className="text-lg font-black text-[#1e293b] leading-tight">{currentPoint.name}</h3>
             <p className="text-[10px] font-bold text-[#b388c4] bg-[#F5EFFF] inline-block px-3 py-1 rounded-full border border-[#b388c4]/20 mt-1.5 max-w-xs">
               📍 {currentPoint.locationText}
             </p>
           </div>

           {/* Gráfico Corporal en Esfera */}
           <div className="relative w-40 h-40 mx-auto mb-5 bg-emerald-50/50 rounded-full border-4 border-emerald-100/50 flex items-center justify-center shadow-inner overflow-hidden">
              <TappingPointSVG techniqueId={selectedTech} active={isActive} pointId={currentPoint.id} />
              <div className="absolute top-1.5 right-1.5 w-6 h-6 bg-[#f43f5e] text-white rounded-full flex items-center justify-center font-extrabold text-xs shadow-sm z-10">
                {currentPoint.id}
              </div>
           </div>

           {/* Selección de Técnica de Masaje */}
           <div className="mb-4">
             <span className="text-[9px] font-black text-gray-400 uppercase tracking-wider block mb-1.5">Masaje o Acercamiento:</span>
             <div className="grid grid-cols-2 gap-2">
               {currentPoint.techniques.map(tech => (
                 <button 
                   key={tech.id}
                   onClick={() => setSelectedTech(tech.id)}
                   className={`flex items-center justify-center gap-1.5 p-2 rounded-xl text-xs font-bold transition-all border ${
                     selectedTech === tech.id 
                       ? 'bg-[#1e293b] text-white border-[#1e293b] shadow-xs' 
                       : 'bg-gray-50 text-gray-500 border-gray-150 hover:bg-gray-100'
                   }`}
                 >
                   {tech.icon}
                   <span className="text-[10px]">{tech.name}</span>
                 </button>
               ))}
             </div>
           </div>

           {/* Descripción del masaje */}
           <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-100 mb-4 min-h-[64px] flex items-center">
             <p className="text-xs text-gray-600 leading-normal">
               <strong className="text-[#1e293b] font-extrabold">Instrucciones:</strong>{' '}
               {currentPoint.techniques.find(t => t.id === selectedTech)?.desc}
             </p>
           </div>

           {/* Tip clínico para potenciar */}
           {!isActive && timeLeft === currentPoint.duration && (
             <div className="bg-amber-50 p-3 rounded-lg border border-amber-100 mb-5 flex gap-2 items-start animate-in zoom-in">
               <Info className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
               <p className="text-[10px] text-amber-800 leading-normal font-medium">
                 <strong className="font-bold">Efecto clínico:</strong> {currentPoint.tips}
               </p>
             </div>
           )}
        </div>

        {/* TEMPORIZADOR */}
        <div className="h-16 flex items-center justify-center mt-1">
          {isStepComplete ? (
            <button 
              onClick={nextPoint}
              className="w-full py-3.5 bg-[#b388c4] text-white rounded-xl font-bold shadow-sm hover:bg-[#9d73ad] transition-all animate-in zoom-in"
            >
              ¡Completado! Siguiente Punto
            </button>
          ) : (
             !isActive ? (
               <button 
                 onClick={handleStartTimer}
                 className="w-full py-3.5 bg-[#1e293b] text-white rounded-xl font-bold shadow-sm hover:bg-black transition-colors flex justify-center items-center gap-2"
               >
                 <Play className="w-4 h-4 fill-current" /> Iniciar ({currentPoint.duration} seg)
               </button>
             ) : (
               <div className="text-4xl font-light text-[#b388c4] tabular-nums animate-pulse flex items-center gap-1.5">
                 {timeLeft}<span className="text-lg text-gray-400">s</span>
               </div>
             )
          )}
        </div>

      </div>
    </div>
  );
}
