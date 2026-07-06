import React, { useState } from 'react';
import { HeartPulse, AlertCircle, ShieldCheck, TrendingUp, LogOut, Users, Key } from 'lucide-react';

import { useLocalStorageState } from './hooks/useLocalStorageState';
import TabRescate from './components/TabRescate';
import TabPrevencion from './components/TabPrevencion';
import TabProgreso from './components/TabProgreso';
import TabAdmin from './components/TabAdmin';
import Login from './components/Login';
import NavButton from './components/NavButton';
import SecuritySettingsModal from './components/SecuritySettingsModal';
import { Buyer } from './types';

// --- PALETA DE COLORES BASADA EN LA IDENTIDAD ---
// Fondo principal: bg-[#FDFBF7] (Crema muy suave de bienestar)
// Acento primario: bg-[#b388c4] (Lila/Violeta suave)
// Texto principal: text-[#1e293b] (Gris oscuro/Navy para legibilidad y serenidad)
// Tarjetas: bg-white

export default function App() {
  const [activeTab, setActiveTab] = useState('rescate');
  const [isSecurityModalOpen, setIsSecurityModalOpen] = useState(false);
  
  // Persistencia de actividades en LocalStorage usando hook personalizado DRY
  const [logs, setLogs] = useLocalStorageState<Record<string, string[]>>('sos_ansiedad_logs', {});

  // Persistencia de ánimo diario en LocalStorage usando hook personalizado DRY
  const [moods, setMoods] = useLocalStorageState<Record<string, string>>('sos_ansiedad_moods', {});

  // Controle de acesso persistente
  const [currentUserEmail, setCurrentUserEmail] = useLocalStorageState<string | null>('sos_user_email', null);
  const [rawBuyers, setRawBuyers] = useLocalStorageState<any[]>('sos_registered_buyers', []);
  const [superadminPassword, setSuperadminPassword] = useLocalStorageState<string>('sos_superadmin_password', 'Dama8081-1');

  // Migrar e normalizar dados se houver compradores antigos sem senha ou formato string
  const registeredBuyers: Buyer[] = React.useMemo(() => {
    return rawBuyers.map(b => {
      if (typeof b === 'string') {
        return {
          email: b.trim().toLowerCase(),
          password: 'sos123_mudar',
          name: 'Comprador',
          registrationDate: new Date().toLocaleDateString('pt-BR')
        };
      }
      return {
        email: (b.email || '').trim().toLowerCase(),
        password: b.password || 'sos123_mudar',
        name: b.name || 'Comprador',
        registrationDate: b.registrationDate || new Date().toLocaleDateString('pt-BR')
      };
    });
  }, [rawBuyers]);

  // Synchronize buyers with Express Server
  React.useEffect(() => {
    const fetchServerBuyers = async () => {
      try {
        const res = await fetch('/api/buyers');
        if (res.ok) {
          const serverBuyers = await res.json();
          if (Array.isArray(serverBuyers)) {
            // Merge with local storage buyers (server takes priority on duplicates)
            setRawBuyers(prev => {
              const localOnly = prev.filter(localB => {
                const localEmail = typeof localB === 'string' ? localB : localB.email;
                return !serverBuyers.some(serverB => serverB.email.toLowerCase() === localEmail.toLowerCase());
              });
              return [...localOnly, ...serverBuyers];
            });
          }
        }
      } catch (err) {
        console.warn('Backend server not online or client standalone mode. Operating locally.', err);
      }
    };
    fetchServerBuyers();
  }, []);

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

  const handleAddBuyer = async (buyer: Buyer) => {
    // Add locally immediately for optimistic UI
    setRawBuyers(prev => {
      const updated = prev.filter(b => {
        const email = typeof b === 'string' ? b : b.email;
        return email.trim().toLowerCase() !== buyer.email.toLowerCase();
      });
      return [...updated, buyer];
    });

    // Sync to Express backend
    try {
      await fetch('/api/buyers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(buyer)
      });
    } catch (err) {
      console.warn('Failed to sync added buyer to server:', err);
    }
  };

  const handleRemoveBuyer = async (email: string) => {
    // Remove locally immediately for optimistic UI
    setRawBuyers(prev => prev.filter(b => {
      const bEmail = typeof b === 'string' ? b : b.email;
      return bEmail.trim().toLowerCase() !== email.trim().toLowerCase();
    }));

    // Sync to Express backend
    try {
      await fetch(`/api/buyers/${encodeURIComponent(email)}`, {
        method: 'DELETE'
      });
    } catch (err) {
      console.warn('Failed to sync deleted buyer to server:', err);
    }
  };

  const handleUpdateBuyerPassword = async (email: string, newPass: string) => {
    // Update locally immediately for optimistic UI
    setRawBuyers(prev => {
      return prev.map(b => {
        const bEmail = typeof b === 'string' ? b : b.email;
        if (bEmail.trim().toLowerCase() === email.trim().toLowerCase()) {
          const name = typeof b === 'string' ? 'Comprador' : b.name;
          const regDate = typeof b === 'string' ? new Date().toLocaleDateString('pt-BR') : b.registrationDate;
          return {
            email: email.trim().toLowerCase(),
            password: newPass,
            name: name || 'Comprador',
            registrationDate: regDate || new Date().toLocaleDateString('pt-BR')
          };
        }
        return b;
      });
    });

    // Sync to Express backend
    try {
      await fetch(`/api/buyers/${encodeURIComponent(email)}/password`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: newPass })
      });
    } catch (err) {
      console.warn('Failed to sync updated password to server:', err);
    }
  };

  const handleLogout = () => {
    setCurrentUserEmail(null);
    setActiveTab('rescate');
  };

  // Se o usuário não estiver logado, exibe a tela de login
  if (!currentUserEmail) {
    return (
      <Login 
        onLogin={async (email) => {
          const cleanEmail = email.trim().toLowerCase();
          const exists = registeredBuyers.some(b => b.email.trim().toLowerCase() === cleanEmail);
          if (!exists && cleanEmail !== 'maxiakiki@hotmail.com') {
            await handleAddBuyer({
              email: cleanEmail,
              name: 'Comprador SOS',
              password: 'CodE:1243',
              registrationDate: new Date().toLocaleDateString('pt-BR')
            });
          }
          setCurrentUserEmail(cleanEmail);
        }} 
        registeredBuyers={registeredBuyers} 
        superadminPassword={superadminPassword}
      />
    );
  }

  const isSuperadmin = currentUserEmail.trim().toLowerCase() === 'maxiakiki@hotmail.com';
  
  // Obter o nome do usuário logado para personalização
  const currentUserName = isSuperadmin 
    ? 'Superadmin' 
    : (registeredBuyers.find(b => b.email.toLowerCase() === currentUserEmail.trim().toLowerCase())?.name || 'Comprador');


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
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <div className="bg-[#b388c4] p-1.5 rounded-full">
                <HeartPulse className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-base font-black tracking-tight text-[#1e293b]">
                S.O.S <span className="text-[#b388c4]">Ansiedade</span>
              </h1>
            </div>
            <span className="text-[10px] text-gray-400 font-bold mt-0.5 ml-1 select-none">
              Olá, <span className="text-[#b388c4]">{currentUserName}</span>
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            {isSuperadmin && (
              <span className="text-[9px] bg-amber-50 text-amber-700 font-extrabold border border-amber-200/50 px-2 py-0.5 rounded-full uppercase tracking-wider select-none animate-pulse">
                Admin
              </span>
            )}
            <button 
              onClick={() => setIsSecurityModalOpen(true)}
              title="Segurança da conta"
              className="p-1 text-gray-400 hover:text-[#b388c4] rounded-lg transition-colors flex items-center gap-0.5 text-[10px] font-bold"
            >
              <Key className="w-3.5 h-3.5 text-gray-400" />
              <span>Senha</span>
            </button>
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
            superadminPassword={superadminPassword}
            onChangeSuperadminPassword={setSuperadminPassword}
            onImportBuyers={(buyers) => setRawBuyers(buyers)}
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

      {/* Security and password modal */}
      <SecuritySettingsModal
        isOpen={isSecurityModalOpen}
        onClose={() => setIsSecurityModalOpen(false)}
        currentUserEmail={currentUserEmail}
        isSuperadmin={isSuperadmin}
        registeredBuyers={registeredBuyers}
        superadminPassword={superadminPassword}
        onChangeSuperadminPassword={setSuperadminPassword}
        onUpdateBuyerPassword={handleUpdateBuyerPassword}
      />
    </div>
  );
}
