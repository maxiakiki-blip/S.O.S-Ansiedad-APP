import React, { useState } from 'react';
import { CheckCircle2, TrendingUp, Calendar } from 'lucide-react';

interface TabProgresoProps {
  logs: Record<string, string[]>;
  moods: Record<string, string>;
}

export default function TabProgreso({ logs, moods }: TabProgresoProps) {
  const [view, setView] = useState('weekly'); // 'daily', 'weekly', 'monthly'
  
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  const todayActivities = logs[todayStr] || [];
  const todayMood = moods[todayStr];

  const moodEmojis: Record<string, string> = {
    'muy_ansioso': '😫',
    'inquieto': '😕',
    'tranquilo': '🙂',
    'genial': '😌'
  };

  const moodLabels: Record<string, string> = {
    'muy_ansioso': 'Ansioso(a)',
    'inquieto': 'Inquieto(a)',
    'tranquilo': 'Tranquilo(a)',
    'genial': 'Excelente / Genial'
  };

  // Cálculos para Vista Mensual
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1).getDay();
  
  const monthDays = Array.from({ length: daysInMonth }, (_, i) => {
    const d = new Date(today.getFullYear(), today.getMonth(), i + 1);
    // Para evitar desfases de huso horario local al convertir a string
    const offset = d.getTimezoneOffset();
    const localDb = new Date(d.getTime() - (offset * 60 * 1000));
    const dateString = localDb.toISOString().split('T')[0];
    return { 
      dayNumber: i + 1, 
      dateString, 
      isToday: dateString === todayStr 
    };
  });

  // Cálculos para Vista Semanal
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay()); // Inicia en Domingo
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(startOfWeek);
    d.setDate(startOfWeek.getDate() + i);
    const offset = d.getTimezoneOffset();
    const localDb = new Date(d.getTime() - (offset * 60 * 1000));
    const dateString = localDb.toISOString().split('T')[0];
    return { 
      dayNumber: d.getDate(), 
      dayName: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'][d.getDay()],
      dateString, 
      isToday: dateString === todayStr 
    };
  });
  
  const logKeys = Object.keys(logs);
  let statusText = "Primeros pasos de cuidado";
  let statusColor = "text-amber-500 bg-amber-50 border-amber-100";
  if (logKeys.length > 3) { 
    statusText = "Construyendo Resiliencia"; 
    statusColor = "text-emerald-600 bg-emerald-50 border-emerald-100"; 
  }
  if (logKeys.length > 10) { 
    statusText = "Soberanía y Mente Interna"; 
    statusColor = "text-blue-600 bg-blue-50 border-blue-100"; 
  }

  return (
    <div className="animate-in fade-in duration-300">
      <div className="mb-4">
        <h2 className="text-xl font-black text-[#1e293b] mb-1">Tu Evolución</h2>
        <p className="text-gray-400 text-xs font-medium">Monitorea tu consistencia diaria y tu bienestar emocional.</p>
      </div>

      {/* Selector de Vistas */}
      <div className="flex bg-gray-200/50 p-1 rounded-xl mb-6 shadow-inner">
        <button 
          onClick={() => setView('daily')} 
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
            view === 'daily' 
              ? 'bg-white text-[#b388c4] shadow-sm' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Diario
        </button>
        <button 
          onClick={() => setView('weekly')} 
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
            view === 'weekly' 
              ? 'bg-white text-[#b388c4] shadow-sm' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Semanal
        </button>
        <button 
          onClick={() => setView('monthly')} 
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
            view === 'monthly' 
              ? 'bg-white text-[#b388c4] shadow-sm' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Mensual
        </button>
      </div>

      {/* VISTA DIARIO */}
      {view === 'daily' && (
        <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-[#b388c4]"></div>
            <h3 className="text-gray-400 font-bold mb-3 uppercase tracking-wider text-[10px]">Tu estado de ánimo hoy</h3>
            <div className="text-6xl mb-4 filter drop-shadow-sm select-none">{todayMood ? moodEmojis[todayMood] : '😶'}</div>
            <p className="font-black text-lg text-[#1e293b]">
              {todayMood ? `Te sientes ${moodLabels[todayMood]}` : 'Sin registro de humor'}
            </p>
            <p className="text-xs text-gray-400 mt-1">Regístralo pulsando un emoji en la pestaña Prevención</p>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-5">
            <h3 className="font-bold text-sm text-[#1e293b] mb-3">Actividades de rescate/prevención completadas</h3>
            {todayActivities.length === 0 ? (
              <p className="text-xs text-gray-400 italic text-center py-8 border border-dashed border-gray-200 rounded-2xl bg-gray-50/50">
                Aún no has completado costumbres ni actividades de rescate hoy. Puedes empezar en Rescate o Prevención.
              </p>
            ) : (
              <ul className="space-y-2.5">
                {todayActivities.map((act, i) => (
                  <li key={i} className="flex items-center gap-3 text-xs bg-[#FDFBF7] p-3 rounded-xl border border-[#b388c4]/15">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    <span className="font-bold text-gray-700">{act}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {/* VISTA SEMANAL */}
      {view === 'weekly' && (
        <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-5">
             <div className="flex justify-between items-center mb-5">
               <h3 className="font-bold text-[#1e293b] text-sm">Esta Semana</h3>
               <span className="text-[10px] text-[#b388c4] font-black bg-[#F5EFFF] px-2.5 py-1 rounded-lg border border-[#b388c4]/25 select-none animate-in fade-in">
                 {weekDays[0].dayNumber} - {weekDays[6].dayNumber} {today.toLocaleString('es', { month: 'short' })}
               </span>
             </div>
             
             <div className="flex justify-between gap-1">
               {weekDays.map(day => {
                 const actCount = (logs[day.dateString] || []).length;
                 const dayMood = moods[day.dateString];
                 return (
                   <div 
                     key={day.dateString} 
                     className={`flex flex-col items-center flex-1 py-3 px-0.5 rounded-xl border transition-all ${
                       day.isToday 
                         ? 'border-[#b388c4] bg-[#F5EFFF]/60 shadow-sm' 
                         : 'border-gray-100 bg-gray-50/70'
                     }`}
                   >
                     <span className="text-[9px] text-gray-400 font-bold uppercase mb-1">{day.dayName}</span>
                     <span className={`text-xs font-black mb-2 ${day.isToday ? 'text-[#b388c4]' : 'text-gray-700'}`}>{day.dayNumber}</span>
                     
                     {/* Mood Indicator */}
                     <div className="text-lg h-6 flex items-center justify-center filter drop-shadow-sm select-none">
                       {dayMood ? moodEmojis[dayMood] : <span className="w-1.5 h-1.5 bg-gray-300 rounded-full"></span>}
                     </div>
                     
                     {/* Activity Dots */}
                     <div className="flex gap-[2px] h-1 justify-center w-full mt-1.5">
                       {Array.from({length: Math.min(3, actCount)}).map((_, i) => (
                         <div key={i} className="w-[4px] h-[4px] bg-[#b388c4] rounded-full"></div>
                       ))}
                     </div>
                   </div>
                 );
               })}
             </div>
          </div>

          {/* Estado General */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-5">
            <h3 className="text-[10px] font-black text-gray-400 mb-3 uppercase tracking-wider">Tu Diagnóstico General</h3>
            <div className={`flex items-center gap-4 p-4 rounded-2xl border ${statusColor}`}>
              <div className="p-2 bg-white rounded-full shadow-sm">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <p className="font-extrabold text-sm">{statusText}</p>
                <p className="text-xs opacity-90">{logKeys.length} días activos registrados en la app</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VISTA MENSUAL */}
      {view === 'monthly' && (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-5 animate-in slide-in-from-right-4 duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-sm capitalize text-[#1e293b]">{today.toLocaleString('es', { month: 'long', year: 'numeric' })}</h3>
            <Calendar className="w-4 h-4 text-gray-400" />
          </div>
          
          <div className="grid grid-cols-7 gap-1 text-center text-[10px] mb-2 text-gray-400 font-bold uppercase">
            <div>Dom</div><div>Lun</div><div>Mar</div><div>Mié</div><div>Jue</div><div>Vie</div><div>Sáb</div>
          </div>
          
          <div className="grid grid-cols-7 gap-1.5 text-center text-xs">
            {Array.from({ length: firstDay }).map((_, i) => ( 
              <div key={`empty-${i}`} className="p-1"></div> 
            ))}
            {monthDays.map((day) => {
              const actCount = (logs[day.dateString] || []).length;
              const hasLog = actCount > 0;
              const dayMood = moods[day.dateString];
              
              return (
                <div key={day.dayNumber} className="flex flex-col items-center justify-center aspect-square relative py-0.5">
                  <div className={`w-8 h-8 rounded-full flex flex-col items-center justify-center relative transition-all
                    ${day.isToday ? 'border-2 border-[#b388c4] font-black' : ''}
                    ${hasLog ? 'bg-[#b388c4] text-white shadow-sm font-bold' : 'bg-gray-50 text-gray-500'}
                  `}>
                    <span className="text-[11px] leading-none mt-0.5">{day.dayNumber}</span>
                  </div>
                  
                  {/* Emoji de estado de ánimo superpuesto (pequeño arriba a la derecha) */}
                  {dayMood && (
                    <div className="absolute -top-1.5 -right-1 text-[11px] bg-white rounded-full shadow-xs leading-none border border-gray-100 p-[1.5px] z-10 filter drop-shadow-sm select-none">
                      {moodEmojis[dayMood]}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
}
