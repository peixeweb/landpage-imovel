import React, { useState } from 'react';
import { Logo } from './Logo';
import { MessageCircle, Clock } from 'lucide-react';

interface FooterProps {
  onOpenRegisterModal: () => void;
  onOpenDemoChat: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenRegisterModal, onOpenDemoChat }) => {
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="main-footer" className="bg-stone-950 text-stone-300">
      {/* Main Footer Links & Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand & Description */}
          <div className="md:col-span-2 space-y-4">
            <Logo size="lg" theme="dark" showSubtitle={false} />

            <p className="text-xs text-amber-400 font-medium">
              A Plataforma de Landing Pages Inteligentes para o Mercado Imobiliário
            </p>

            <p className="text-xs text-stone-400 font-light max-w-md leading-relaxed">
              Autonomia para corretores independentes e imobiliárias gerarem páginas de vendas de alta performance com inteligência artificial conversacional integrada e entrega de leads qualificados no WhatsApp.
            </p>
          </div>

          {/* Menu Column */}
          <div className="space-y-4">
            <h3 className="text-white font-serif font-bold text-sm tracking-wide border-b border-stone-800 pb-2">
              Navegação
            </h3>
            <ul className="space-y-2 text-xs text-stone-400 font-light">
              <li>
                <button onClick={() => scrollToSection('como-funciona')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Como Funciona
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('solo-vs-equipe')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Modo Solo vs Imobiliária
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('regras-escore')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Matriz de Escore & Renda
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('planos')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Planos & Preços
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('faq')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Perguntas Frequentes
                </button>
              </li>
              <li>
                <button onClick={onOpenRegisterModal} className="hover:text-amber-400 transition-colors text-amber-400 font-semibold cursor-pointer">
                  Como Funciona o Cadastro
                </button>
              </li>
            </ul>
          </div>

          {/* Business & Support Column */}
          <div className="space-y-4">
            <h3 className="text-white font-serif font-bold text-sm tracking-wide border-b border-stone-800 pb-2">
              Atendimento & Suporte
            </h3>
            <div className="space-y-3 text-xs text-stone-400 font-light">
              <p className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span><strong className="text-stone-200">Suporte Técnico:</strong> Seg a sex, 9h às 18h</span>
              </p>
              <div className="pt-2 flex flex-col gap-2">
                <a 
                  href="https://wa.me/5511914716715?text=Ol%C3%A1,%20gostaria%20de%20tirar%20d%C3%BAvidas%20sobre%20o%20Imobiflow." 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-stone-300 hover:text-emerald-400 transition-colors bg-stone-900 p-2 rounded-xl border border-stone-800"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp: (11) 91471-6715</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-400">
          <p>© 2026 PEIXEWEB AGÊNCIA DIGITAL. TODOS OS DIREITOS RESERVADOS.</p>
          
          <div className="flex items-center gap-4 text-stone-400">
            <button 
              onClick={() => setShowPrivacyModal(true)} 
              className="hover:text-stone-200 underline cursor-pointer"
            >
              Política de Privacidade
            </button>
            <span>•</span>
            <button 
              onClick={() => setShowTermsModal(true)} 
              className="hover:text-stone-200 underline cursor-pointer"
            >
              Termos de Uso
            </button>
          </div>
        </div>
      </div>

      {/* Privacy Policy Modal */}
      {showPrivacyModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white text-stone-800 rounded-2xl max-w-2xl w-full p-6 max-h-[85vh] overflow-y-auto space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <h3 className="text-lg font-serif font-bold text-stone-900">Política de Privacidade — Imobiflow</h3>
              <button onClick={() => setShowPrivacyModal(false)} className="text-stone-400 hover:text-stone-800 font-bold">✕</button>
            </div>
            <div className="text-xs space-y-3 leading-relaxed text-stone-600">
              <p>O Imobiflow preza pela total segurança e confidencialidade dos dados de corretores, imobiliárias e compradores.</p>
              <p><strong>1. Coleta de Dados:</strong> Coletamos apenas as informações fornecidas voluntariamente no cadastro de imóveis e no atendimento automatizado (nome, telefone, renda declarada e dúvidas sobre o imóvel).</p>
              <p><strong>2. Uso das Informações:</strong> As informações são utilizadas exclusivamente para viabilizar a qualificação do lead e o contato direto entre o comprador e o corretor responsável.</p>
              <p><strong>3. Proteção e Segurança:</strong> Empregamos avançados protocolos de segurança, criptografia de ponta a ponta e rígidas políticas de proteção de dados para garantir que nenhuma informação seja compartilhada com terceiros.</p>
            </div>
            <button onClick={() => setShowPrivacyModal(false)} className="w-full bg-stone-900 text-white font-semibold py-2.5 rounded-xl text-xs cursor-pointer">
              Entendido
            </button>
          </div>
        </div>
      )}

      {/* Terms of Use Modal */}
      {showTermsModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white text-stone-800 rounded-2xl max-w-2xl w-full p-6 max-h-[85vh] overflow-y-auto space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <h3 className="text-lg font-serif font-bold text-stone-900">Termos de Uso — Imobiflow</h3>
              <button onClick={() => setShowTermsModal(false)} className="text-stone-400 hover:text-stone-800 font-bold">✕</button>
            </div>
            <div className="text-xs space-y-3 leading-relaxed text-stone-600">
              <p>Ao utilizar o Imobiflow, o usuário concorda com os seguintes termos:</p>
              <p><strong>1. Responsabilidade do Anúncio:</strong> A exatidão das informações, valores, metragens e documentação do imóvel é de exclusiva responsabilidade do corretor ou da imobiliária cadastrada.</p>
              <p><strong>2. Atendimento com IA:</strong> O assistente virtual é uma ferramenta de triagem prévia e cálculo estimado de escore de renda, não substituindo a análise bancária formal de crédito.</p>
              <p><strong>3. Disponibilidade do Serviço:</strong> O Imobiflow busca manter 99.9% de uptime nas Landing Pages e nos canais de redirecionamento para o WhatsApp.</p>
            </div>
            <button onClick={() => setShowTermsModal(false)} className="w-full bg-stone-900 text-white font-semibold py-2.5 rounded-xl text-xs cursor-pointer">
              Entendido
            </button>
          </div>
        </div>
      )}
    </footer>
  );
};
