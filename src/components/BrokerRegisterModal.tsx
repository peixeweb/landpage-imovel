import React from 'react';
import { X, Sparkles, CheckCircle2, ArrowRight, ShieldCheck, Zap, Bot, MessageSquare, Phone, Smartphone, Flame, Users } from 'lucide-react';
import logoImg from '../assets/images/imobiflow_logo_1786990157759.jpg';

interface BrokerRegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  brokers?: any[];
  onSaveProperty?: (property: any) => void;
}

export const BrokerRegisterModal: React.FC<BrokerRegisterModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
      <div className="bg-white rounded-3xl max-w-3xl w-full border border-stone-200 shadow-2xl overflow-hidden my-6">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-stone-950 via-stone-900 to-[#b87b1c] text-white p-5 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-stone-950 border border-amber-500/40 p-0.5 overflow-hidden flex items-center justify-center shadow-lg shrink-0">
              <img src={logoImg} alt="Imobiflow" referrerPolicy="no-referrer" className="w-full h-full object-cover rounded-[10px]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-serif font-bold text-white">
                  Como Funciona o Cadastro de Imóveis
                </h2>
                <span className="bg-amber-400/20 border border-amber-400/30 text-amber-300 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                  Explicativo
                </span>
              </div>
              <p className="text-xs text-stone-300">
                Entenda o fluxo 100% automatizado da plataforma Imobiflow
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body - Explanation Content */}
        <div className="p-6 sm:p-8 space-y-6 text-stone-850">
          <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-4 text-xs sm:text-sm text-amber-950 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-[#b87b1c] shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              Você não precisa preencher formulários complexos. Com o <strong>Imobiflow</strong>, cadastrar seu imóvel e colocá-lo no ar com atendimento inteligente é um processo ágil dividido em 4 etapas:
            </p>
          </div>

          {/* 4 Explanation Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Step 1 */}
            <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-xl bg-amber-500/15 text-[#b87b1c] font-serif font-black flex items-center justify-center text-sm">
                  1
                </span>
                <span className="text-[11px] font-medium text-stone-500 bg-stone-200/70 px-2 py-0.5 rounded">
                  Dados do Imóvel
                </span>
              </div>
              <h3 className="font-bold font-serif text-stone-900 text-base">
                Envio das Informações
              </h3>
              <p className="text-xs text-stone-600 font-light leading-relaxed">
                Você envia as fotos do imóvel (qualquer formato), valor de venda/aluguel, condomínio, endereço e requisitos básicos de renda para o comprador.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-xl bg-amber-500/15 text-[#b87b1c] font-serif font-black flex items-center justify-center text-sm">
                  2
                </span>
                <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Geração Automática
                </span>
              </div>
              <h3 className="font-bold font-serif text-stone-900 text-base">
                A IA Cria a Landing Page
              </h3>
              <p className="text-xs text-stone-600 font-light leading-relaxed">
                Nossa Inteligência Artificial redige os textos persuasivos, organiza a galeria em alta resolução e cria uma página exclusiva e ultrarrápida.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-xl bg-amber-500/15 text-[#b87b1c] font-serif font-black flex items-center justify-center text-sm">
                  3
                </span>
                <span className="text-[11px] font-medium text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  Atendimento 24/7
                </span>
              </div>
              <h3 className="font-bold font-serif text-stone-900 text-base">
                A IA Valida o Cliente
              </h3>
              <p className="text-xs text-stone-600 font-light leading-relaxed">
                O visitante do anúncio conversa com a Corretora Virtual com IA na página, tira dúvidas do imóvel e tem sua renda e capacidade de compra qualificadas.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-xl bg-emerald-500/15 text-emerald-700 font-serif font-black flex items-center justify-center text-sm">
                  4
                </span>
                <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  WhatsApp
                </span>
              </div>
              <h3 className="font-bold font-serif text-stone-900 text-base">
                Lead Pronto para Visita
              </h3>
              <p className="text-xs text-stone-600 font-light leading-relaxed">
                O contato chega formatado no seu WhatsApp com nota de escore (1 a 100), faixa salarial e entrada, sem que você perca tempo com curiosos.
              </p>
            </div>
          </div>

          {/* Highlights comparison bar */}
          <div className="bg-stone-900 text-white rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-amber-400 shrink-0">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold">Modo Autônomo & Modo Equipe</p>
                <p className="text-[11px] text-stone-400">Atenda individualmente ou distribua leads por roleta para sua equipe.</p>
              </div>
            </div>

            <a
              href="https://wa.me/5511914716715?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20como%20cadastrar%20im%C3%B3veis%20no%20Imobiflow."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 shrink-0 shadow-md"
            >
              <Phone className="w-4 h-4" />
              <span>Falar com Consultor</span>
            </a>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-stone-100 px-6 py-4 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-stone-500">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Sem necessidade de cadastro prévio para entender o fluxo</span>
          </div>

          <button
            onClick={onClose}
            className="bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all cursor-pointer"
          >
            Entendido, fechar
          </button>
        </div>
      </div>
    </div>
  );
};
