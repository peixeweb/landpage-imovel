import React, { useState } from 'react';
import { Search, MapPin, Building, Sparkles, PlusCircle, ArrowRight, Bot, Zap, CheckCircle2, Shield } from 'lucide-react';
import { OperationType, PropertyType, PropertyFilters } from '../types';

interface HeroSectionProps {
  onSearch: (filters: PropertyFilters) => void;
  onExploreClick: () => void;
  onOpenRegisterModal?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onSearch, onExploreClick, onOpenRegisterModal }) => {
  const [operation, setOperation] = useState<OperationType | 'Todos'>('Venda');
  const [type, setType] = useState<PropertyType | 'Todos'>('Todos');
  const [neighborhood, setNeighborhood] = useState<string>('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      operation,
      type,
      neighborhood: neighborhood.trim() || undefined,
    });
  };

  return (
    <section id="hero-section" className="relative">
      {/* Hero Visual Background with dynamic gradient */}
      <div 
        id="hero-banner-image"
        className="relative min-h-[460px] sm:min-h-[500px] md:min-h-[540px] w-full bg-cover bg-center flex flex-col items-center justify-center text-center px-4 pt-10 pb-28"
        style={{
          backgroundImage: `linear-gradient(rgba(10, 15, 30, 0.78), rgba(15, 23, 42, 0.85)), url('https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1920&q=80')`,
        }}
      >
        <div className="max-w-4xl mx-auto text-white space-y-5 animate-fade-in z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-amber-500/20 backdrop-blur-md border border-amber-400/50 text-amber-300 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide shadow-lg">
            <Bot className="w-4 h-4 text-amber-400" />
            <span>peixeweb • Landing Pages com IA para Corretores & Imobiliárias</span>
          </div>

          {/* Main Headline */}
          <h1 id="hero-title" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-black tracking-tight leading-tight text-white drop-shadow-md">
            Cadastre o imóvel. A IA gera a <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-200 to-yellow-400">Landing Page</span> e qualifica o comprador.
          </h1>

          {/* Subtitle */}
          <p id="hero-subtitle" className="text-sm sm:text-base md:text-lg text-stone-200 font-light max-w-2xl mx-auto drop-shadow leading-relaxed">
            Seja você corretor autônomo ou imobiliária: publique seus imóveis em páginas exclusivas com um <strong>Agente de IA 24/7</strong> que atende, tira dúvidas de financiamento e envia o lead quente direto no seu WhatsApp.
          </p>

          {/* Key Value Prop Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1 text-xs text-stone-300">
            <span className="flex items-center gap-1.5 bg-white/10 backdrop-blur-xs px-3 py-1 rounded-full border border-white/15">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Landing page instantânea com link próprio
            </span>
            <span className="flex items-center gap-1.5 bg-white/10 backdrop-blur-xs px-3 py-1 rounded-full border border-white/15">
              <Bot className="w-3.5 h-3.5 text-amber-400" />
              IA qualifica urgência, entrada e financiamento
            </span>
            <span className="flex items-center gap-1.5 bg-white/10 backdrop-blur-xs px-3 py-1 rounded-full border border-white/15">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              Disparo para o WhatsApp do Corretor
            </span>
          </div>

          {/* CTA Buttons */}
          <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
            {onOpenRegisterModal && (
              <button
                id="btn-hero-register-cta"
                onClick={onOpenRegisterModal}
                className="bg-gradient-to-r from-[#b87b1c] to-[#9a6514] hover:from-[#a36b17] hover:to-[#84530f] text-white text-xs sm:text-sm font-bold tracking-wide px-6 py-3.5 rounded-xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2 cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Criar Landing Page com IA</span>
                <Sparkles className="w-3.5 h-3.5 text-amber-200" />
              </button>
            )}

            <button
              id="btn-hero-explore-cta"
              onClick={onExploreClick}
              className="bg-white/15 hover:bg-white/25 text-white border border-white/30 text-xs sm:text-sm font-semibold px-6 py-3.5 rounded-xl transition-all backdrop-blur-xs cursor-pointer flex items-center gap-2"
            >
              <span>Explorar Imóveis & Demonstração</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Floating Search Bar Box (Overlapping banner) */}
      <div className="max-w-5xl mx-auto px-4 -mt-20 sm:-mt-24 relative z-20">
        <div 
          id="search-filter-card" 
          className="bg-white rounded-2xl shadow-xl border border-stone-200 p-5 sm:p-7"
        >
          {/* Header tabs for operation */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 pb-3.5 mb-4">
            <div className="flex items-center gap-2">
              <span className="text-sm sm:text-base font-bold text-stone-900">
                Portal de Imóveis peixeweb
              </span>
              <span className="text-[11px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded font-medium">
                Páginas com Atendimento IA Ativo
              </span>
            </div>

            <div className="flex items-center bg-stone-100 p-1 rounded-xl">
              <button
                type="button"
                id="tab-op-venda"
                onClick={() => setOperation('Venda')}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  operation === 'Venda'
                    ? 'bg-[#b87b1c] text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Comprar
              </button>
              <button
                type="button"
                id="tab-op-aluguel"
                onClick={() => setOperation('Aluguel')}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  operation === 'Aluguel'
                    ? 'bg-[#b87b1c] text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Alugar
              </button>
              <button
                type="button"
                id="tab-op-todos"
                onClick={() => setOperation('Todos')}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  operation === 'Todos'
                    ? 'bg-[#b87b1c] text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Todos
              </button>
            </div>
          </div>

          {/* Filter Form */}
          <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
            {/* Property Type Dropdown */}
            <div className="sm:col-span-4">
              <label htmlFor="filter-type-select" className="sr-only">Tipo de Imóvel</label>
              <div className="relative">
                <Building className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select
                  id="filter-type-select"
                  value={type}
                  onChange={(e) => setType(e.target.value as any)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl pl-9 pr-8 py-2.5 text-xs sm:text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all appearance-none cursor-pointer"
                >
                  <option value="Todos">Selecione o tipo de imóvel</option>
                  <option value="Apartamento">Apartamento</option>
                  <option value="Casa">Casa</option>
                  <option value="Cobertura">Cobertura</option>
                  <option value="Kitnet/Studio">Kitnet / Studio</option>
                  <option value="Sala Comercial">Sala Comercial</option>
                  <option value="Ponto Comercial/Loja">Ponto Comercial / Loja</option>
                  <option value="Terreno">Terreno</option>
                </select>
              </div>
            </div>

            {/* Neighborhood / Keyword Input */}
            <div className="sm:col-span-5">
              <label htmlFor="filter-neighborhood-input" className="sr-only">Localização</label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="filter-neighborhood-input"
                  type="text"
                  placeholder="Digite o bairro ou região (ex: Asa Norte, Águas Claras...)"
                  value={neighborhood}
                  onChange={(e) => setNeighborhood(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl pl-9 pr-3 py-2.5 text-xs sm:text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Submit Search Button */}
            <div className="sm:col-span-3">
              <button
                type="submit"
                id="btn-execute-search"
                className="w-full bg-[#b87b1c] hover:bg-[#a36b17] active:bg-[#925f12] text-white font-bold py-2.5 px-4 rounded-xl text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span>Buscar Imóveis</span>
              </button>
            </div>
          </form>

          {/* Quick neighborhood chips */}
          <div className="mt-3.5 pt-3 border-t border-stone-100 flex flex-wrap items-center gap-1.5 text-xs text-stone-500">
            <span className="font-medium text-stone-700 mr-1">Regiões em destaque:</span>
            {['Asa Norte', 'Asa Sul', 'Águas Claras', 'Noroeste', 'Vicente Pires', 'Sudoeste', 'Setor Industrial'].map((b) => (
              <button
                key={b}
                type="button"
                onClick={() => {
                  setNeighborhood(b);
                  onSearch({ operation, type, neighborhood: b });
                }}
                className="bg-stone-100 hover:bg-amber-100 hover:text-amber-900 text-stone-700 px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors cursor-pointer"
              >
                {b}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
