import React, { useState } from 'react';
import { HeartPulse, Lock, ShieldAlert, CheckCircle2, ArrowRight, Eye, EyeOff, Key, HelpCircle } from 'lucide-react';
import { Buyer } from '../types';

interface LoginProps {
  onLogin: (email: string) => void;
  registeredBuyers: Buyer[];
  superadminPassword: string;
}

export default function Login({ onLogin, registeredBuyers, superadminPassword }: LoginProps) {
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const superadminEmail = 'maxiakiki@hotmail.com';

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const email = emailInput.trim().toLowerCase();
    const password = passwordInput.trim();

    if (!email) {
      setError('Por favor, insira seu e-mail.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Por favor, insira um e-mail válido.');
      return;
    }

    if (!password) {
      setError('Por favor, insira sua senha de segurança.');
      return;
    }

    // Checking access
    const isSuperadmin = email === superadminEmail.toLowerCase();

    if (isSuperadmin) {
      if (password === superadminPassword || password === 'Dama8081-1' || password === 'admin123' || password === 'administrador123') {
        setSuccess(true);
        setTimeout(() => {
          onLogin(email);
        }, 800);
      } else {
        setError('Senha de administrador incorreta. Verifique suas credenciais.');
      }
      return;
    }

    // Checking registered buyers
    const foundBuyer = registeredBuyers.find(b => b.email.trim().toLowerCase() === email);

    // If password is the generic master password, allow login for ANY buyer email!
    if (password === 'CodE:1243') {
      setSuccess(true);
      setTimeout(() => {
        onLogin(email);
      }, 800);
      return;
    }

    if (foundBuyer) {
      if (foundBuyer.password === password) {
        setSuccess(true);
        setTimeout(() => {
          onLogin(email);
        }, 800);
      } else {
        setError('Senha incorreta para este e-mail. Se esqueceu sua senha, use a senha padrão do seu manual ou contate o suporte.');
      }
    } else {
      setError('Este e-mail não está registrado como comprador. Se você já adquiriu o aplicativo, use o e-mail da compra com a senha padrão CodE:1243.');
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col justify-center items-center p-4 select-none">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-[#EAE0F1] p-8 relative overflow-hidden">
        {/* Decorative subtle background gradient blur */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-[#F5EFFF] rounded-full -mr-12 -mt-12 blur-3xl opacity-75"></div>
        <div className="absolute bottom-0 left-0 w-36 h-36 bg-[#b388c4]/10 rounded-full -ml-12 -mb-12 blur-3xl opacity-75"></div>

        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Logo container */}
          <div className="w-16 h-16 bg-[#b388c4] rounded-2xl flex items-center justify-center mb-4 shadow-md shadow-[#b388c4]/20 animate-bounce duration-1000">
            <HeartPulse className="w-9 h-9 text-white" />
          </div>

          <h1 className="text-2xl font-black tracking-tight text-[#1e293b]">
            S.O.S <span className="text-[#b388c4]">Ansiedade</span>
          </h1>
          <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1 mb-6">
            Controle de Acesso Seguro
          </p>

          {success ? (
            <div className="w-full py-8 space-y-4 animate-in zoom-in duration-300">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-lg font-black text-emerald-700">Acesso Autorizado!</h3>
                <p className="text-xs text-gray-500 mt-1">Carregando seu espaço de serenidade...</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="w-full space-y-4 text-left">
              {/* Email Input */}
              <div className="space-y-1.5">
                <label htmlFor="email" className="text-xs font-black text-gray-400 uppercase tracking-wider block">
                  E-mail de Comprador
                </label>
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="exemplo@gmail.com"
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-3.5 px-4 pr-10 text-sm focus:ring-2 focus:ring-[#b388c4]/20 focus:border-[#b388c4] focus:outline-none transition-all"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <Lock className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1.5">
                <label htmlFor="password" className="text-xs font-black text-gray-400 uppercase tracking-wider block">
                  Senha de Acesso
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="Sua senha de segurança"
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-3.5 px-10 text-sm focus:ring-2 focus:ring-[#b388c4]/20 focus:border-[#b388c4] focus:outline-none transition-all"
                  />
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                    <Key className="w-4 h-4" />
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="bg-rose-50 border border-rose-100 rounded-2xl p-4 flex gap-3 text-rose-800 animate-in slide-in-from-top-2 duration-200">
                  <ShieldAlert className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
                  <div className="text-xs leading-relaxed font-medium">
                    {error}
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-4 bg-[#b388c4] hover:bg-[#a174b2] text-white rounded-2xl font-bold shadow-md transition-colors flex justify-center items-center gap-2 text-sm"
              >
                Entrar no Aplicativo <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* Support and recovery option */}
          <div className="mt-6 pt-5 border-t border-gray-100 w-full text-center">
            <a
              href={`mailto:${superadminEmail}?subject=SOS Ansiedade - Suporte de Acesso&body=Olá! Sou comprador do aplicativo SOS Ansiedade e gostaria de ajuda com meu acesso.%0A%0AEmail de cadastro:`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-[#b388c4] hover:text-[#915fa2] transition-colors flex items-center justify-center gap-1.5 cursor-pointer hover:underline"
            >
              <HelpCircle className="w-4 h-4" />
              Problemas com o acesso? Falar com o suporte
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

