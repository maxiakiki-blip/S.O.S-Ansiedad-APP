import React, { useState, useEffect, useRef } from 'react';
import { Wind, Volume2, VolumeX, ArrowLeft, CheckCircle2, ChevronRight, Activity, RotateCcw } from 'lucide-react';

interface BreathingExerciseProps {
  onBack: () => void;
  logActivity: (activity: string) => void;
  onComplete: () => void;
}

type BreathingPhase = 'inhale' | 'hold_full' | 'exhale' | 'hold_empty';

export default function BreathingExercise({ onBack, logActivity, onComplete }: BreathingExerciseProps) {
  const [phase, setPhase] = useState<BreathingPhase>('inhale');
  const [secondsLeft, setSecondsLeft] = useState(4);
  const [cyclesCompleted, setCyclesCompleted] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isRunning, setIsRunning] = useState(true);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  // Sincronizar loops de sonido terapéuticos con la fase de respiración
  useEffect(() => {
    if (!isRunning || isMuted) {
      stopOscillator();
      return;
    }

    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      stopOscillator();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;
      osc.type = 'sine';

      if (phase === 'inhale') {
        // Sonido ascendente suave que representa la inhalación y expansión
        osc.frequency.setValueAtTime(160, now);
        osc.frequency.exponentialRampToValueAtTime(260, now + 4);
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.12, now + 1);
        gain.gain.linearRampToValueAtTime(0, now + 4);
      } else if (phase === 'exhale') {
        // Sonido descendente relajante que inspira soltar tensiones
        osc.frequency.setValueAtTime(260, now);
        osc.frequency.exponentialRampToValueAtTime(160, now + 4);
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.12, now + 1);
        gain.gain.linearRampToValueAtTime(0, now + 4);
      } else {
        // Frecuencia baja constante y estabilizadora para los periodos de retención
        osc.frequency.setValueAtTime(160, now);
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.03, now + 0.5);
        gain.gain.linearRampToValueAtTime(0.03, now + 3.5);
        gain.gain.linearRampToValueAtTime(0, now + 4);
      }

      osc.start(now);
      oscRef.current = osc;
      gainRef.current = gain;
    } catch (e) {
      console.warn("Error con Web Audio API en respiración:", e);
    }

    return () => {
      stopOscillator();
    };
  }, [phase, isMuted, isRunning]);

  const stopOscillator = () => {
    if (oscRef.current) {
      try {
        oscRef.current.stop();
      } catch (e) {}
      try {
        oscRef.current.disconnect();
      } catch (e) {}
      oscRef.current = null;
    }
    if (gainRef.current) {
      try {
        gainRef.current.disconnect();
      } catch (e) {}
      gainRef.current = null;
    }
  };

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          return 0; // Se gatilla el useEffect de transición por fase
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
      stopOscillator();
    };
  }, [isRunning]);

  // Manejar el cambio de fase reactivo cuando el temporizador llega a 0
  useEffect(() => {
    if (secondsLeft === 0) {
      setPhase((currentPhase) => {
        switch (currentPhase) {
          case 'inhale':
            return 'hold_full';
          case 'hold_full':
            return 'exhale';
          case 'exhale':
            return 'hold_empty';
          case 'hold_empty':
            setCyclesCompleted((prevCycles) => prevCycles + 1);
            return 'inhale';
          default:
            return 'inhale';
        }
      });
      setSecondsLeft(4); // Reiniciar fase a exactamente 4 segundos
    }
  }, [secondsLeft]);

  // Registrar actividad una vez alcanzados los ciclos mínimos
  useEffect(() => {
    if (cyclesCompleted >= 4) {
      logActivity('Respiración Táctica');
    }
  }, [cyclesCompleted]);

  const getPhaseData = () => {
    switch (phase) {
      case 'inhale':
        return {
          title: 'INHALAR',
          subtitle: 'Inhala aire de forma suave y continua',
          color: 'bg-blue-400 text-blue-950',
          borderColor: 'border-blue-200',
          bubbleScale: 'scale-150',
          bgHex: '#b1e5fb',
          progressPercent: 25
        };
      case 'hold_full':
        return {
          title: 'SOSTENER',
          subtitle: 'Mantén el aire con tus pulmones llenos',
          color: 'bg-emerald-400 text-emerald-950',
          borderColor: 'border-emerald-200',
          bubbleScale: 'scale-120 border-[6px]',
          bgHex: '#b2f5ea',
          progressPercent: 50
        };
      case 'exhale':
        return {
          title: 'EXHALAR',
          subtitle: 'Suelta el aire lentamente por la boca',
          color: 'bg-[#b388c4] text-white',
          borderColor: 'border-[#EAE0F1]',
          bubbleScale: 'scale-95',
          bgHex: '#fcecfd',
          progressPercent: 75
        };
      case 'hold_empty':
        return {
          title: 'RETENER',
          subtitle: 'Quédate sin aire en vacío absoluto',
          color: 'bg-amber-400 text-amber-950',
          borderColor: 'border-amber-200',
          bubbleScale: 'scale-70 border-[3px]',
          bgHex: '#fef3c7',
          progressPercent: 100
        };
    }
  };

  const currentData = getPhaseData();

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handlePausePlay = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setPhase('inhale');
    setSecondsLeft(4);
    setCyclesCompleted(0);
    setIsRunning(true);
  };

  if (cyclesCompleted >= 4) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[65vh] text-center p-6 animate-in zoom-in duration-300">
        <div className="w-24 h-24 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mb-6 shadow-sm border border-emerald-200">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <h2 className="text-2xl font-black mb-2 text-[#1e293b]">¡Sesión Completada!</h2>
        <p className="text-[#1e293b] font-medium text-xs bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full inline-block mb-4 border border-emerald-200">
          🎯 Completaste {cyclesCompleted} ciclos perfectos
        </p>
        <p className="text-gray-500 mb-8 text-sm leading-relaxed max-w-sm">
          Has entrenado tu mente y regulado tu pulso de forma maravillosa. El estado de agitación ha decrecido notablemente. ¿Qué deseas hacer ahora?
        </p>

        <div className="w-full space-y-3">
          <button 
            onClick={onComplete}
            className="w-full py-4 bg-[#b388c4] text-white rounded-xl font-bold shadow-md hover:bg-[#9d73ad] transition-all flex items-center justify-center gap-2"
          >
            Siguiente: Conexión Sensorial (5-4-3-2-1) <ChevronRight className="w-5 h-5" />
          </button>
          <button 
            onClick={handleReset}
            className="w-full py-4 bg-white text-gray-700 border border-gray-200 rounded-xl font-bold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" /> Repetir Respiración
          </button>
          <button 
            onClick={onBack}
            className="w-full py-4 bg-[#1e293b] text-white rounded-xl font-bold hover:bg-black transition-colors"
          >
            Salir al Panel Principal
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in h-full flex flex-col justify-between pb-8">
      {/* Header back & Mute toggle */}
      <div className="flex items-center justify-between mb-4">
        <button 
          onClick={onBack}
          className="p-2.5 bg-white rounded-full shadow-sm border border-gray-100 hover:bg-gray-50 flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 text-gray-500" />
        </button>
        <div className="text-center">
          <span className="font-extrabold text-xs text-gray-400 uppercase tracking-widest block">EMERGENCIA</span>
          <span className="font-bold text-sm text-[#1e293b]">Respiración Táctica</span>
        </div>
        <button 
          onClick={handleToggleMute}
          className="p-2.5 bg-white rounded-full shadow-sm border border-gray-100 hover:bg-gray-50 flex items-center justify-center text-gray-500"
        >
          {isMuted ? <VolumeX className="w-5 h-5 text-rose-400 animate-pulse" /> : <Volume2 className="w-5 h-5 text-[#b388c4]" />}
        </button>
      </div>

      {/* Main interactive card */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex-1 flex flex-col items-center justify-center py-8 relative">
        
        {/* Cycle Progress Tracker Metaphor (Muestra cuántos ciclos va repitiendo) */}
        <div className="w-full max-w-xs mb-6 bg-gray-50 rounded-2xl p-4 border border-gray-150 flex flex-col items-center">
          <div className="flex justify-between w-full text-xs font-black text-gray-500 mb-2 select-none">
            <span>CICLOS COMPLETADOS</span>
            <span className="text-[#b388c4]">{cyclesCompleted} de 4</span>
          </div>
          
          {/* Barra de progreso de ciclo global */}
          <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden flex gap-0.5">
            {[0, 1, 2, 3].map((index) => {
              const isDone = cyclesCompleted > index;
              const isCurrent = cyclesCompleted === index;
              return (
                <div 
                  key={index} 
                  className={`h-full flex-1 transition-all duration-500 ${
                    isDone 
                      ? 'bg-emerald-500' 
                      : isCurrent 
                        ? 'bg-[#b388c4]' 
                        : 'bg-gray-200'
                  }`}
                />
              );
            })}
          </div>
          
          <p className="text-[10px] text-gray-400 font-extrabold mt-2 uppercase tracking-wide">
            {cyclesCompleted === 0 
              ? '✨ Ciclo Inicial: Estabilizando cuerpo' 
              : `🧘 Ciclo ${cyclesCompleted + 1} de 4 en curso`}
          </p>
        </div>

        {/* Breathing Sphere Container */}
        <div className="relative w-60 h-60 flex items-center justify-center mb-6">
          
          {/* Radial progress ring */}
          <svg className="absolute w-56 h-56 -rotate-90 pointer-events-none" viewBox="0 0 100 100">
            <circle 
              cx="50" 
              cy="50" 
              r="45" 
              fill="none" 
              stroke="#EAE0F1" 
              strokeWidth="1.5" 
            />
            <circle 
              cx="50" 
              cy="50" 
              r="45" 
              fill="none" 
              stroke={phase === 'exhale' ? '#b388c4' : phase === 'inhale' ? '#60a5fa' : phase === 'hold_full' ? '#34d399' : '#fbbf24'}
              strokeWidth="3.5"
              strokeDasharray="282.7"
              // Cálculo de porcentaje basado en el temporizador descendente
              strokeDashoffset={(282.7 - (282.7 * ((5 - secondsLeft) * 25)) / 100).toString()}
              className="transition-all duration-1000 ease-linear"
              strokeLinecap="round"
            />
          </svg>

          {/* Pulsating background therapeutic ring */}
          <div 
            style={{ 
              backgroundColor: currentData.bgHex, 
              transform: phase === 'inhale' || phase === 'hold_full' ? 'scale(1.5)' : 'scale(1.02)'
            }}
            className="absolute w-40 h-40 rounded-full transition-all duration-[4000ms] ease-in-out opacity-25 blur-xl pointer-events-none"
          />

          {/* Core Breathing Bubble */}
          <div 
            onClick={handlePausePlay}
            style={{
              transitionDuration: '4000ms'
            }}
            className={`w-36 h-36 rounded-full flex flex-col items-center justify-center text-center cursor-pointer shadow-xl transition-all ease-in-out transform border-4 border-white ${currentData.borderColor} ${currentData.bubbleScale} ${currentData.color}`}
          >
            <Wind className={`w-8 h-8 mb-1 animate-pulse opacity-90`} />
            <span className="text-4xl font-black tabular-nums select-none leading-none">{secondsLeft}</span>
            <span className="text-[10px] uppercase font-black tracking-widest opacity-80 mt-1 select-none">seg</span>
          </div>
        </div>

        {/* Action Guideline Labels */}
        <div className="text-center max-w-xs h-16 flex flex-col justify-center select-none">
          <h4 className="text-xl font-black tracking-widest text-[#1e293b] mb-1 animate-pulse">
            {phase === 'inhale' && 'INHALAR'}
            {phase === 'hold_full' && 'SOSTENER'}
            {phase === 'exhale' && 'EXHALAR'}
            {phase === 'hold_empty' && 'RETENER'}
          </h4>
          <p className="text-xs text-gray-500 font-bold px-4">{currentData.subtitle}</p>
        </div>

        {/* Tiny step-by-step tutorial timeline with four explicit steps requested */}
        <div className="w-full max-w-xs mt-6 flex justify-between gap-1.5">
          {[
            { label: 'Inhalar', target: 'inhale' },
            { label: 'Sostener', target: 'hold_full' },
            { label: 'Exhalar', target: 'exhale' },
            { label: 'Retener', target: 'hold_empty' }
          ].map((step, idx) => {
            const isCurrent = phase === step.target;
            const progressBg = 
              step.target === 'inhale' 
                ? 'bg-blue-400 border-blue-400 text-blue-950' 
                : step.target === 'hold_full'
                  ? 'bg-emerald-400 border-emerald-400 text-emerald-950'
                  : step.target === 'exhale'
                    ? 'bg-[#b388c4] border-[#b388c4] text-white'
                    : 'bg-amber-400 border-amber-400 text-amber-950';

            return (
              <div 
                key={idx} 
                className={`flex-1 flex flex-col items-center py-2.5 px-0.5 rounded-xl border transition-all duration-500 select-none ${
                  isCurrent 
                    ? `${progressBg} font-black scale-105 shadow-sm` 
                    : 'bg-gray-50 border-gray-150 text-gray-400 font-bold'
                }`}
              >
                <span className="text-[10px] tracking-tight">{step.label}</span>
                <span className="text-[8px] opacity-75 mt-0.5">4 seg</span>
              </div>
            );
          })}
        </div>

        {/* Subtitle / Pause instructions */}
        <button 
          onClick={handlePausePlay}
          className="mt-6 text-xs font-bold text-gray-400 hover:text-gray-600 transition-colors"
        >
          {isRunning ? '⏸ Toca el círculo para pausar' : '▶ Toca el círculo para continuar'}
        </button>

      </div>
    </div>
  );
}

