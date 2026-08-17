import React, { useState } from 'react';
import { Logo } from './Logo';
import { 
  Sparkles, 
  Bot, 
  MessageCircle, 
  Menu, 
  X, 
  PlusCircle, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Phone
} from 'lucide-react';

interface HeaderProps {
  onOpenRegisterModal: () => void;
  onOpenDemoChat: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenRegisterModal,
  onOpenDemoChat,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header id="main-header" className="w-full bg-white/95 backdrop-blur-md border-b border-stone-200 sticky top-0 z-50 shadow-xs">
      {/* Top Banner */}
      <div className="bg-stone-950 text-stone-200 text-xs py-2 px-4 sm:px-8 border-b border-stone-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-amber-400 font-medium">
            <Zap className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="font-semibold">Imobiflow • PropTech com Inteligência Artificial</span>
          </div>

          <div className="hidden md:flex items-center gap-4 text-stone-400 text-[11px]">
            <span>✨ Landing Pages por Imóvel</span>
            <span>•</span>
            <span>🤖 Atendente Virtual 24/7</span>
            <span>•</span>
            <span>📲 Leads no seu WhatsApp</span>
          </div>

          <a 
            href="https://wa.me/5511914716715?text=Ol%C3%A1,%20gostaria%20de%20saber%20mais%20sobre%20o%20Imobiflow%20para%20corretores." 
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-amber-400 transition-colors text-stone-300 text-xs"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-400" />
            <span>Fale no WhatsApp: (11) 91471-6715</span>
          </a>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-left group focus:outline-none cursor-pointer"
        >
          <Logo size="md" />
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-stone-700">
          <button
            onClick={() => scrollToSection('como-funciona')}
            className="hover:text-[#b87b1c] transition-colors cursor-pointer"
          >
            Como Funciona
          </button>
          <button
            onClick={() => scrollToSection('solo-vs-equipe')}
            className="hover:text-[#b87b1c] transition-colors cursor-pointer"
          >
            Solo vs Imobiliária
          </button>
          <button
            onClick={() => scrollToSection('regras-escore')}
            className="hover:text-[#b87b1c] transition-colors cursor-pointer"
          >
            Regras de Escore
          </button>
          <button
            onClick={() => scrollToSection('planos')}
            className="hover:text-[#b87b1c] transition-colors cursor-pointer"
          >
            Planos
          </button>
          <button
            onClick={() => scrollToSection('faq')}
            className="hover:text-[#b87b1c] transition-colors cursor-pointer"
          >
            FAQ
          </button>
        </nav>

        {/* Action CTAs */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenDemoChat}
            className="flex items-center gap-2 bg-[#6b3e1f] hover:bg-[#573117] text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md hover:shadow-lg cursor-pointer border border-[#8a5229] transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Bot className="w-4 h-4 text-amber-300" />
            <span>A IA valida o cliente</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-stone-700 hover:text-stone-950 focus:outline-none"
            aria-label="Abrir menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-stone-200 px-6 py-4 space-y-3 animate-fade-in shadow-xl">
          <button
            onClick={() => scrollToSection('como-funciona')}
            className="block w-full text-left py-2 text-sm font-medium text-stone-800 hover:text-[#b87b1c]"
          >
            Como Funciona
          </button>
          <button
            onClick={() => scrollToSection('solo-vs-equipe')}
            className="block w-full text-left py-2 text-sm font-medium text-stone-800 hover:text-[#b87b1c]"
          >
            Solo vs Imobiliária
          </button>
          <button
            onClick={() => scrollToSection('regras-escore')}
            className="block w-full text-left py-2 text-sm font-medium text-stone-800 hover:text-[#b87b1c]"
          >
            Regras de Escore
          </button>
          <button
            onClick={() => scrollToSection('planos')}
            className="block w-full text-left py-2 text-sm font-medium text-stone-800 hover:text-[#b87b1c]"
          >
            Planos
          </button>
          <button
            onClick={() => scrollToSection('faq')}
            className="block w-full text-left py-2 text-sm font-medium text-stone-800 hover:text-[#b87b1c]"
          >
            Perguntas Frequentes (FAQ)
          </button>
          <div className="pt-2 border-t border-stone-100 flex flex-col gap-2">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenDemoChat(); }}
              className="w-full text-center py-3 bg-[#6b3e1f] hover:bg-[#573117] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-sm border border-[#8a5229]"
            >
              <Bot className="w-4 h-4 text-amber-300" />
              <span>A IA valida o cliente</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
