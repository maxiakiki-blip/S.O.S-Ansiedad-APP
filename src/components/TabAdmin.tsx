import React, { useState } from 'react';
import { UserPlus, Trash2, Mail, Users, Search, AlertCircle, ShieldCheck, Download, Upload } from 'lucide-react';

interface TabAdminProps {
  registeredBuyers: string[];
  onAddBuyer: (email: string) => void;
  onRemoveBuyer: (email: string) => void;
  superadminEmail: string;
}

export default function TabAdmin({ registeredBuyers, onAddBuyer, onRemoveBuyer, superadminEmail }: TabAdminProps) {
  const [newEmail, setNewEmail] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const email = newEmail.trim().toLowerCase();

    if (!email) {
      setError('Por favor, digite um e-mail.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Por favor, insira um e-mail com formato válido.');
      return;
    }

    if (email === superadminEmail.toLowerCase()) {
      setError('O e-mail do superadmin já possui acesso vitalício por padrão.');
      return;
    }

    if (registeredBuyers.some(b => b.trim().toLowerCase() === email)) {
      setError('Este e-mail já está registrado na lista de compradores.');
      return;
    }

    onAddBuyer(email);
    setNewEmail('');
    setSuccess(`E-mail "${email}" registrado com sucesso!`);
    setTimeout(() => setSuccess(null), 3000);
  };

  const filteredBuyers = registeredBuyers.filter(email =>
    email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="animate-in fade-in duration-300 space-y-6 pb-8">
      {/* HEADER SECTION */}
      <div>
        <h2 className="text-xl font-black text-[#1e293b] mb-1 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#b388c4]" /> Painel Administrativo
        </h2>
        <p className="text-gray-400 text-xs font-medium">
          Gerencie o acesso de compradores ao S.O.S Ansiedade. Apenas você, como superadmin, pode acessar esta guia.
        </p>
      </div>

      {/* STATS OVERVIEW */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center gap-3.5 shadow-xs">
          <div className="p-3 bg-[#F5EFFF] text-[#b388c4] rounded-xl">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-gray-400 font-extrabold uppercase block tracking-wider">Ativos</span>
            <span className="text-lg font-black text-[#1e293b]">{registeredBuyers.length}</span>
          </div>
        </div>
        <div className="bg-[#1e293b] p-4 rounded-2xl text-white flex items-center gap-3.5 shadow-sm">
          <div className="p-3 bg-white/15 text-[#b388c4] rounded-xl">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-[10px] text-gray-300 font-extrabold uppercase block tracking-wider">Perfil</span>
            <span className="text-xs font-black text-gray-100 block truncate max-w-[120px]">Superadmin</span>
          </div>
        </div>
      </div>

      {/* ADD BUYER FORM */}
      <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-xs relative overflow-hidden">
        <h3 className="font-bold text-sm text-[#1e293b] mb-3.5 flex items-center gap-2">
          <UserPlus className="w-4 h-4 text-[#b388c4]" /> Registrar Novo Comprador
        </h3>
        
        <form onSubmit={handleAdd} className="space-y-3.5">
          <div className="relative">
            <input
              type="text"
              placeholder="E-mail do cliente (ex: cliente@hotmail.com)"
              value={newEmail}
              onChange={(e) => {
                setNewEmail(e.target.value);
                setError(null);
              }}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 pr-10 text-xs focus:ring-1 focus:ring-[#b388c4] focus:border-[#b388c4] focus:outline-none transition-all"
            />
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400">
              <Mail className="w-4 h-4" />
            </div>
          </div>

          {error && (
            <div className="bg-rose-50 text-rose-800 text-[11px] p-3 rounded-xl border border-rose-100 flex gap-2 font-medium">
              <AlertCircle className="w-4 h-4 text-rose-500 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="bg-emerald-50 text-emerald-800 text-[11px] p-3 rounded-xl border border-emerald-100 flex gap-2 font-medium animate-in zoom-in duration-200">
              <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              <span>{success}</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-[#b388c4] hover:bg-[#a174b2] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex justify-center items-center gap-2"
          >
            Registrar e Liberar Acesso
          </button>
        </form>
      </div>

      {/* REGISTERED BUYERS LIST */}
      <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-xs">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-sm text-[#1e293b]">Lista de Compradores Cadastrados</h3>
          <span className="text-[10px] text-gray-400 font-extrabold">{filteredBuyers.length} de {registeredBuyers.length}</span>
        </div>

        {/* SEARCH BAR */}
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Pesquisar e-mail..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pl-9 pr-4 text-xs focus:ring-1 focus:ring-[#b388c4] focus:border-[#b388c4] focus:outline-none transition-all"
          />
          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>

        {/* LIST */}
        {filteredBuyers.length === 0 ? (
          <div className="text-center py-8 border border-dashed border-gray-200 rounded-2xl bg-gray-50/50">
            <Mail className="w-8 h-8 text-gray-300 mx-auto mb-2" />
            <p className="text-xs text-gray-400 italic">Nenhum comprador encontrado.</p>
          </div>
        ) : (
          <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
            {filteredBuyers.map((email, index) => (
              <div 
                key={email} 
                className="flex justify-between items-center bg-gray-50 p-3 rounded-xl border border-gray-150/50 hover:bg-gray-100/50 transition-colors animate-in slide-in-from-bottom-1 duration-150"
              >
                <div className="flex items-center gap-2 truncate">
                  <div className="w-2 h-2 bg-[#b388c4] rounded-full"></div>
                  <span className="text-xs text-[#1e293b] font-bold truncate">{email}</span>
                </div>
                <button
                  onClick={() => onRemoveBuyer(email)}
                  title="Excluir comprador"
                  className="p-1.5 text-gray-400 hover:text-rose-500 rounded-lg hover:bg-rose-50 transition-colors flex-shrink-0"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SEED/SYSTEM INFO BOX */}
      <div className="bg-[#FDFBF7] border border-[#EAE0F1] p-4.5 rounded-2xl text-xs space-y-1.5 text-gray-600">
        <p className="font-extrabold text-[#1e293b] flex items-center gap-1.5">
          <AlertCircle className="w-4 h-4 text-[#b388c4]" /> Como testar o controle de acesso?
        </p>
        <p className="leading-relaxed">
          1. Registre um e-mail de comprador nesta tela (por exemplo: <span className="font-bold">cliente@teste.com</span>).<br />
          2. Clique no botão de <strong>Sair</strong> no cabeçalho superior para deslogar.<br />
          3. Tente fazer login usando o e-mail registrado. O acesso será permitido!<br />
          4. Se tentar fazer login com outro e-mail não registrado, o acesso será negado.
        </p>
      </div>
    </div>
  );
}
