import React from 'react';
import { Calculator, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

interface FinancingBannerProps {
  onOpenSimulator: () => void;
}

export const FinancingBanner: React.FC<FinancingBannerProps> = ({ onOpenSimulator }) => {
  return (
    <section id="financing-simulator-banner" className="max-w-7xl mx-auto px-4 sm:px-8 my-12">
      <div 
        className="relative overflow-hidden rounded-2xl bg-stone-900 border border-stone-800 shadow-xl"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(15, 23, 42, 0.92) 0%, rgba(20, 20, 20, 0.85) 50%, rgba(184, 123, 28, 0.3) 100%), url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1600&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="relative z-10 p-6 sm:p-10 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 bg-[#b87b1c]/20 border border-[#b87b1c]/50 text-amber-300 text-xs uppercase font-bold tracking-widest px-3 py-1 rounded-full">
              <Calculator className="w-3.5 h-3.5" />
              <span>Simulador de Crédito Imobiliário & Análise IA</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-black text-white leading-tight">
              Seu imóvel está mais perto <br className="hidden sm:inline" />
              <span className="text-amber-400">do que você imagina</span>
            </h2>

            <p className="text-stone-300 text-xs sm:text-sm font-light leading-relaxed">
              Calcule parcelas estimadas, custos cartorários (ITBI de Brasília), opções com FGTS e receba uma consultoria de crédito instantânea com Inteligência Artificial.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-stone-300 pt-1">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Caixa Econômica, Santander, Itaú & BB
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Simulação sem compromisso
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <button
              id="btn-trigger-simulator-modal"
              onClick={onOpenSimulator}
              className="w-full sm:w-auto bg-[#b87b1c] hover:bg-[#a36b17] active:bg-[#925f12] text-white font-bold px-6 py-3.5 rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer whitespace-nowrap"
            >
              <span>Faça uma simulação</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
