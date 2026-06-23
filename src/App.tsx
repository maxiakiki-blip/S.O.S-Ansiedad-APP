import React, { useState } from 'react';
import { HeartPulse, AlertCircle, ShieldCheck, TrendingUp, LogOut, Users } from 'lucide-react';

import { useLocalStorageState } from './hooks/useLocalStorageState';
import TabRescate from './components/TabRescate';
import TabPrevencion from './components/TabPrevencion';
import TabProgreso from './components/TabProgreso';
import TabAdmin from './components/TabAdmin';
import Login from './components/Login';
import NavButton from './components/NavButton';

// --- PALETA DE COLORES BASADA EN LA IDENTIDAD ---
// Fondo principal: bg-[#FDFBF7] (Crema muy suave de bienestar)
// Acento primario: bg-[#b388c4] (Lila/Violeta suave)
// Texto principal: text-[#1e293b] (Gris oscuro/Navy para legibilidad y serenidad)
// Tarjetas: bg-white

export default function App() {
  const [activeTab, setActiveTab] = useState('rescate');
  
  // Persistencia de actividades en LocalStorage usando hook personalizado DRY
  const [logs, setLogs] = useLocalStorageState<Record<string, string[]>>('sos_ansiedad_logs', {});

  // Persistencia de ánimo diario en LocalStorage usando hook personalizado DRY
  const [moods, setMoods] = useLocalStorageState<Record<string, string>>('sos_ansiedad_moods', {});

  // Controle de acesso persistente
  const [currentUserEmail, setCurrentUserEmail] = useLocalStorageState<string | null>('sos_user_email', null);
  const [registeredBuyers, setRegisteredBuyers] = useLocalStorageState<string[]>('sos_registered_buyers', []);

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const logActivity = (activityName: string) => {
    const today = getTodayDate();
    setLogs(prev => {
      const todayLogs = prev[today] || [];
      if (!todayLogs.includes(activityName)) {
        return { ...prev, [today]: [...todayLogs, activityName] };
      }
      return prev;
    });
  };

  const logMood = (moodId: string) => {
    const today = getTodayDate();
    setMoods(prev => ({ ...prev, [today]: moodId }));
  };

  const handleAddBuyer = (email: string) => {
    setRegisteredBuyers(prev => {
      const normalized = email.trim().toLowerCase();
      if (!prev.includes(normalized)) {
        return [...prev, normalized];
      }
      return prev;
    });
  };

  const handleRemoveBuyer = (email: string) => {
    setRegisteredBuyers(prev => prev.filter(e => e.trim().toLowerCase() !== email.trim().toLowerCase()));
  };

  const handleLogout = () => {
    setCurrentUserEmail(null);
    setActiveTab('rescate');
  };

  // Se o usuário não estiver logado, exibe a tela de login
  if (!currentUserEmail) {
    return <Login onLogin={setCurrentUserEmail} registeredBuyers={registeredBuyers} />;
  }

  const isSuperadmin = currentUserEmail.trim().toLowerCase() === 'maxiakiki@hotmail.com';

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1e293b] font-sans pb-24 selection:bg-[#b388c4] selection:text-white">
      {/* Estilos globales para animaciones de acupresion y tapping */}
      <style>{`
        @keyframes anim-circular {
          0% { transform: translate(0, -3px); }
          25% { transform: translate(3px, 0); }
          50% { transform: translate(0, 3px); }
          75% { transform: translate(-3px, 0); }
          100% { transform: translate(0, -3px); }
        }
        @keyframes anim-vertical {
          0%, 100% { transform: translateY(-4px); }
          50% { transform: translateY(4px); }
        }
        @keyframes anim-horizontal {
          0%, 100% { transform: translateX(-6px); }
          50% { transform: translateX(6px); }
        }
        @keyframes anim-pulsating {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.8); opacity: 0.3; }
        }
        @keyframes anim-tapping {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes anim-friction {
          0%, 100% { transform: translateX(-4px) translateY(-2px); }
          25% { transform: translateX(4px) translateY(2px); }
          50% { transform: translateX(-4px) translateY(2px); }
          75% { transform: translateX(4px) translateY(-2px); }
        }
      `}</style>

      {/* HEADER */}
      <header className="bg-white p-4 shadow-sm sticky top-0 z-40 border-b border-[#EAE0F1]">
        <div className="max-w-md mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="bg-[#b388c4] p-1.5 rounded-full">
              <HeartPulse className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-lg font-bold tracking-tight text-[#1e293b]">
              S.O.S <span className="text-[#b388c4]">Ansiedade</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-2">
            {isSuperadmin && (
              <span className="text-[9px] bg-amber-50 text-amber-700 font-extrabold border border-amber-200/50 px-2 py-0.5 rounded-full uppercase tracking-wider select-none animate-pulse">
                Admin
              </span>
            )}
            <button 
              onClick={handleLogout}
              title="Sair do aplicativo"
              className="p-1 text-gray-400 hover:text-rose-500 rounded-lg transition-colors flex items-center gap-0.5 text-[10px] font-bold"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sair</span>
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-md mx-auto p-4">
        {activeTab === 'rescate' && <TabRescate logActivity={logActivity} />}
        {activeTab === 'prevencion' && (
          <TabPrevencion 
            logActivity={logActivity} 
            logMood={logMood} 
            currentMood={moods[getTodayDate()]} 
          />
        )}
        {activeTab === 'progreso' && <TabProgreso logs={logs} moods={moods} />}
        {activeTab === 'admin' && isSuperadmin && (
          <TabAdmin 
            registeredBuyers={registeredBuyers} 
            onAddBuyer={handleAddBuyer} 
            onRemoveBuyer={handleRemoveBuyer} 
            superadminEmail="maxiakiki@hotmail.com" 
          />
        )}
      </main>

      {/* BOTTOM NAVIGATION */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-[0_-4px_10px_rgba(0,0,0,0.03)] z-40">
        <div className="max-w-md mx-auto flex justify-around">
          <NavButton 
            icon={<AlertCircle className="w-5 h-5" />} 
            label="Resgate" 
            isActive={activeTab === 'rescate'} 
            onClick={() => setActiveTab('rescate')} 
          />
          <NavButton 
            icon={<ShieldCheck className="w-5 h-5" />} 
            label="Prevenção" 
            isActive={activeTab === 'prevencion'} 
            onClick={() => setActiveTab('prevencion')} 
          />
          <NavButton 
            icon={<TrendingUp className="w-5 h-5" />} 
            label="Progresso" 
            isActive={activeTab === 'progreso'} 
            onClick={() => setActiveTab('progreso')} 
          />
          {isSuperadmin && (
            <NavButton 
              icon={<Users className="w-5 h-5" />} 
              label="Admin" 
              isActive={activeTab === 'admin'} 
              onClick={() => setActiveTab('admin')} 
            />
          )}
        </div>
      </nav>
    </div>
  );
}
