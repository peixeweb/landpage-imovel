import React from 'react';
import { X, Bot, ShieldCheck, CheckCircle2, Zap, ArrowRight, Phone, Target, MessageSquare, TrendingUp, Calculator } from 'lucide-react';
import logoImg from '../assets/images/imobiflow_logo_1786990157759.jpg';

interface AIValidationExplanationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIValidationExplanationModal: React.FC<AIValidationExplanationModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
      <div className="bg-white rounded-3xl max-w-3xl w-full border border-stone-200 shadow-2xl overflow-hidden my-6">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-stone-950 via-[#3d2211] to-[#6b3e1f] text-white p-5 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-stone-950 border border-amber-500/40 p-0.5 overflow-hidden flex items-center justify-center shadow-lg shrink-0">
              <img src={logoImg} alt="peixeweb" referrerPolicy="no-referrer" className="w-full h-full object-cover rounded-[10px]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-serif font-bold text-white">
                  Como a IA Valida o Cliente
                </h2>
                <span className="bg-amber-400/20 border border-amber-400/30 text-amber-300 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                  Explicativo
                </span>
              </div>
              <p className="text-xs text-stone-300">
                Sistema automático de triagem financeira e escore de compradores
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

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 text-stone-850">
          <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4 text-xs sm:text-sm text-amber-950 flex items-start gap-3">
            <Bot className="w-5 h-5 text-[#b87b1c] shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              O Atendente com Inteligência Artificial do <strong>peixeweb</strong> conversa com cada visitante da Landing Page do imóvel 24 horas por dia, realizando a validação completa antes de enviar o contato para você.
            </p>
          </div>

          {/* 3 Main Pillars of AI Validation */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Pillar 1 */}
            <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4.5 space-y-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-[#6b3e1f] flex items-center justify-center font-bold">
                <Calculator className="w-5 h-5" />
              </div>
              <h3 className="font-bold font-serif text-stone-900 text-sm sm:text-base">
                1. Checagem de Renda
              </h3>
              <p className="text-xs text-stone-600 font-light leading-relaxed">
                Pergunta a renda familiar mensal de forma amigável e calcula se a parcela cabe na margem financeira recomendada (até 30%).
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4.5 space-y-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-700 flex items-center justify-center font-bold">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="font-bold font-serif text-stone-900 text-sm sm:text-base">
                2. Entrada & Financiamento
              </h3>
              <p className="text-xs text-stone-600 font-light leading-relaxed">
                Verifica se o interessado possui o montante de entrada necessário (à vista ou FGTS) para a aprovação bancária do imóvel.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4.5 space-y-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-500/15 text-blue-700 flex items-center justify-center font-bold">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="font-bold font-serif text-stone-900 text-sm sm:text-base">
                3. Escore de 1 a 100
              </h3>
              <p className="text-xs text-stone-600 font-light leading-relaxed">
                Gera uma nota de compatibilidade instantânea. Leads com Escore 90-100 são classificados como <strong>Alta Prioridade</strong>.
              </p>
            </div>
          </div>

          {/* Example of Qualified Lead Card Delivered to Broker */}
          <div className="bg-stone-950 text-white rounded-2xl p-5 border border-stone-800 space-y-3">
            <div className="flex items-center justify-between text-xs border-b border-stone-800 pb-2.5">
              <span className="flex items-center gap-1.5 font-bold text-amber-300">
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                Como você recebe no seu WhatsApp:
              </span>
              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold px-2 py-0.5 rounded border border-emerald-500/30">
                Escore: 100/100 (Aprovado)
              </span>
            </div>

            <div className="text-xs font-mono text-stone-300 space-y-1 bg-stone-900/80 p-3.5 rounded-xl border border-stone-800 leading-relaxed">
              <p><strong className="text-white">Imóvel:</strong> Apartamento Noroeste (Ref. IF-101)</p>
              <p><strong className="text-white">Cliente:</strong> Carlos Silva • WhatsApp: (61) 98765-4321</p>
              <p><strong className="text-white">Renda Comprovada:</strong> R$ 8.500,00/mês</p>
              <p><strong className="text-white">Entrada Disponível:</strong> R$ 160.000,00</p>
              <p><strong className="text-emerald-400">Status IA:</strong> Qualificado e pronto para agendar visita presencial!</p>
            </div>
          </div>

          {/* Value proposition pill */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-stone-100 p-4 rounded-2xl text-xs text-stone-700">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Você nunca mais perde tempo atendendo curiosos sem renda compatível.</span>
            </div>

            <a
              href="https://wa.me/5511914716715?text=Ol%C3%A1,%20gostaria%20de%20saber%20mais%20sobre%20a%20valida%C3%A7%C3%A3o%20de%20clientes%20com%20IA%20do%20peixeweb."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#6b3e1f] hover:bg-[#573117] text-white font-bold px-4 py-2 rounded-xl transition-colors flex items-center gap-1.5 shadow-xs shrink-0"
            >
              <Phone className="w-3.5 h-3.5 text-amber-300" />
              <span>Tirar Dúvidas no WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-stone-100 px-6 py-4 border-t border-stone-200 flex items-center justify-end">
          <button
            onClick={onClose}
            className="bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold px-6 py-2.5 rounded-xl transition-all cursor-pointer"
          >
            Entendido, fechar
          </button>
        </div>
      </div>
    </div>
  );
};
