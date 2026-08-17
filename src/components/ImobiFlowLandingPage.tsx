import React, { useState } from 'react';
import { 
  Sparkles, 
  Bot, 
  Zap, 
  MessageSquare, 
  Phone, 
  Users, 
  UserCheck, 
  Building2, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  ShieldCheck, 
  TrendingUp, 
  Calculator, 
  Layers, 
  LayoutDashboard, 
  Sliders, 
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Star,
  Clock,
  Check,
  Shield
} from 'lucide-react';
import { Property, Broker } from '../types';

interface ImobiFlowLandingPageProps {
  onOpenDemoChat: (property?: Property) => void;
  sampleProperty: Property;
  sampleBroker: Broker;
  onViewPropertyDemo: (property: Property) => void;
}

export const ImobiFlowLandingPage: React.FC<ImobiFlowLandingPageProps> = ({
  onOpenDemoChat,
  sampleProperty,
  sampleBroker,
  onViewPropertyDemo,
}) => {
  // Interactive Scorecard Simulator State
  const [simulatedIncome, setSimulatedIncome] = useState<number>(6500);
  const [minScoreRequired, setMinScoreRequired] = useState<number>(50);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Calculate score based on project specifications
  const calculateScore = (income: number) => {
    if (income <= 3000) return 25;
    if (income <= 5000) return 50;
    if (income <= 7000) return 75;
    return 100;
  };

  const currentScore = calculateScore(simulatedIncome);
  const isApproved = currentScore >= minScoreRequired;

  const faqs = [
    {
      q: 'Como os leads qualificados chegam até o corretor?',
      a: 'Assim que o comprador responde às perguntas do Atendente Virtual com IA na Landing Page e atinge a regra de renda mínima, a plataforma gera um link direto para o WhatsApp do corretor com um dossiê pronto (nome, renda declarada, valor de entrada, urgência e resumo das dúvidas).'
    },
    {
      q: 'Qual a diferença entre o Modo Solo e o Modo Imobiliária / Equipe?',
      a: 'No Modo Solo (corretor autônomo), 100% dos leads vão exclusivamente para o seu WhatsApp pessoal. No Modo Equipe (imobiliárias), os leads são distribuídos de forma automática e justa via Roleta de Plantão (Round-Robin) apenas entre os corretores marcados como disponíveis no momento.'
    },
    {
      q: 'Como funciona a regra de renda mínima e o cálculo de escore?',
      a: 'Você define a regra no cadastro do imóvel. A IA aplica a matriz oficial de escore (Até 3k: 25 pts, 3k a 5k: 50 pts, 5k a 7k: 75 pts, acima de 7k: 100 pts). Leads abaixo do escore mínimo são educadamente direcionados para outras opções, poupando seu tempo precioso de atendimento.'
    },
    {
      q: 'Posso usar o link da Landing Page nos anúncios do Meta (Facebook/Instagram) e Google Ads?',
      a: 'Sim, com total compatibilidade! Cada imóvel gera uma URL limpa e amigável (/imoveis/slug) com metadados Open Graph para prévia perfeita no WhatsApp, Instagram e campanhas de tráfego pago.'
    },
    {
      q: 'Preciso ter conhecimentos de programação ou design?',
      a: 'Nenhum! Você apenas preenche os dados básicos do imóvel ou usa o Redator com IA integrado para gerar título persuasivo, descrição comercial e destaques em poucos segundos.'
    }
  ];

  return (
    <div className="w-full bg-[#faf9f6] text-stone-850">
      {/* 1. HERO SECTION WITH BROKER BACKGROUND IMAGE */}
      <section 
        id="hero-section" 
        className="relative overflow-hidden pt-12 pb-20 md:pt-18 md:pb-28 border-b border-stone-800 bg-stone-950 text-white bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(12, 10, 9, 0.93) 0%, rgba(28, 25, 23, 0.88) 45%, rgba(12, 10, 9, 0.85) 100%), url('/landpage-imovel/fundo-sampa.webp')`,
        }}
      >
        {/* Subtle decorative glow overlays */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* CTA WhatsApp - Above Badge */}
              <a
                href="https://wa.me/5511914716715?text=Ol%C3%A1!%20Quero%20testar%20o%20Imobiflow%20por%201%20m%C3%AAs%20gr%C3%A1tis."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#b87b1c] to-[#9a6514] hover:from-[#a36b17] hover:to-[#84530f] text-white text-xs sm:text-sm font-bold tracking-wide px-6 py-3.5 rounded-xl shadow-xl hover:shadow-amber-500/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0 border border-amber-400/30"
              >
                <Zap className="w-4 h-4" />
                <span>Clique e teste 1 mês grátis</span>
                <Sparkles className="w-3.5 h-3.5 text-amber-200" />
              </a>

              <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide shadow-lg backdrop-blur-md">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Corretores fecham 3x mais respondendo em até 5 min — sua IA faz isso 24/7</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-black tracking-tight text-white leading-[1.12] drop-shadow-md">
                Pare de perder leads para quem responde rápido. <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-200 to-yellow-400">Sua IA qualifica e entrega no WhatsApp</span> enquanto você atende visitas.
              </h1>

              <p className="text-base sm:text-lg text-stone-200 font-light max-w-2xl leading-relaxed drop-shadow-xs">
                <strong>Atendente IA 24/7</strong> responde na hora, calcula escore de renda, valida entrada e financiamento — só chega no seu WhatsApp quem tem perfil para comprar.
              </p>

              {/* Social Proof Bar */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2 text-xs text-stone-300 border-t border-white/20 px-4 py-2">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <strong>+2.800</strong> leads qualificados este mês
                </span>
                <span className="flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  Tempo médio de resposta: <strong>47 seg</strong>
                </span>
                <span className="flex items-center gap-1.5">
                  <Bot className="w-3.5 h-3.5 text-blue-400" />
                  <strong>12</strong> imobiliárias ativas
                </span>
              </div>

              {/* Badges / Micro Proofs */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs text-stone-200 font-medium pt-1">
                <span className="flex items-center gap-1.5 bg-stone-900/80 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-stone-700 shadow-md">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Modo Solo (Corretor Autônomo)
                </span>
                <span className="flex items-center gap-1.5 bg-stone-900/80 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-stone-700 shadow-md">
                  <Users className="w-4 h-4 text-blue-400" />
                  Modo Equipe (Roleta Round-Robin)
                </span>
                <span className="flex items-center gap-1.5 bg-stone-900/80 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-stone-700 shadow-md">
                  <Zap className="w-4 h-4 text-amber-400" />
                  Entrega no WhatsApp
                </span>
              </div>

              {/* CTAs */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <a
                  href="https://wa.me/5511914716715?text=Ol%C3%A1!%20Quero%20testar%20o%20Imobiflow%20por%201%20m%C3%AAs%20gr%C3%A1tis."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-[#b87b1c] to-[#9a6514] hover:from-[#a36b17] hover:to-[#84530f] text-white text-sm sm:text-base font-bold px-7 py-4 rounded-xl shadow-xl hover:shadow-amber-500/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2.5 border border-amber-400/30"
                >
                  <Zap className="w-5 h-5 text-amber-200" />
                  <span>Clique e teste 1 mês grátis</span>
                  <Sparkles className="w-4 h-4 text-amber-200" />
                </a>
              </div>

              {/* Guarantee Strip */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-3 text-[11px] text-stone-300 border-t border-white/20 px-4 py-3">
                <span className="flex items-center gap-1.5 bg-white/10 backdrop-blur-xs px-3 py-1.5 rounded-full border border-white/15">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Setup grátis — configuramos sua 1ª landing
                </span>
                <span className="flex items-center gap-1.5 bg-white/10 backdrop-blur-xs px-3 py-1.5 rounded-full border border-white/15">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Cancele quando quiser — sem multa
                </span>
                <span className="flex items-center gap-1.5 bg-white/10 backdrop-blur-xs px-3 py-1.5 rounded-full border border-white/15">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  1ª landing page grátis para sempre
                </span>
              </div>
            </div>

            {/* Right Interactive Mockup Graphic */}
            <div className="lg:col-span-5 relative">
              <div className="bg-stone-900/90 backdrop-blur-xl rounded-3xl p-5 sm:p-6 border border-stone-700/80 shadow-2xl relative overflow-hidden text-stone-100">
                {/* Floating WhatsApp Card simulation */}
                <div className="bg-stone-950/90 text-white p-4 rounded-2xl mb-4 border border-stone-800 flex items-center justify-between shadow-inner">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 flex items-center justify-center font-bold">
                      <Bot className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-white">Atendente IA Imobiflow</span>
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      </div>
                      <p className="text-[11px] text-stone-400">Qualificando lead em tempo real...</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-mono px-2.5 py-0.5 rounded-full font-bold border border-emerald-500/30">
                    Online 24h
                  </span>
                </div>

                {/* Simulated Chat bubble sequence */}
                <div className="space-y-3 bg-stone-950/60 p-4 rounded-2xl border border-stone-800 text-xs mb-4">
                  <div className="bg-stone-800/90 p-3 rounded-xl rounded-tl-none border border-stone-700 shadow-2xs text-stone-200 space-y-1">
                    <p className="font-semibold text-amber-300">IA Imobiflow:</p>
                    <p>Olá Carlos! Vi que você se interessou pelo apartamento no Noroeste ({sampleProperty.code}). Para agilizar sua visita, qual sua faixa de renda familiar mensal?</p>
                  </div>

                  <div className="bg-amber-500/20 text-amber-100 p-3 rounded-xl rounded-tr-none ml-auto max-w-[85%] border border-amber-500/40 font-medium">
                    "Minha renda comprovada é de cerca de R$ 8.500,00 e tenho R$ 160.000 para dar de entrada."
                  </div>

                  <div className="bg-emerald-950/70 border border-emerald-500/50 p-3 rounded-xl text-emerald-100 space-y-1.5">
                    <div className="flex items-center justify-between font-bold text-emerald-300">
                      <span className="flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        LEAD QUALIFICADO (Escore 100)
                      </span>
                      <span className="font-mono text-[10px] bg-emerald-800/90 text-emerald-200 px-2 py-0.5 rounded border border-emerald-400/30">
                        Aprovado
                      </span>
                    </div>
                    <p className="text-[11px] text-emerald-200 leading-tight">
                      Perfil com capacidade ideal para o imóvel. Encaminhando dados para o WhatsApp do corretor...
                    </p>
                  </div>
                </div>

                {/* Simulated WhatsApp notification pill */}
                <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white p-3.5 rounded-2xl flex items-center justify-between shadow-lg">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
                      <MessageSquare className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-bold">WhatsApp do Corretor</p>
                      <p className="text-[10px] text-emerald-100">Novo comprador qualificado recebido!</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => onOpenDemoChat(sampleProperty)}
                    className="text-[11px] bg-white text-emerald-900 font-bold px-3 py-1.5 rounded-lg shadow-xs hover:bg-emerald-50 transition-colors cursor-pointer flex items-center gap-1 shrink-0"
                  >
                    <span>A IA valida o cliente</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. HOW IT WORKS (O FUNCIONAMENTO PARA O CORRETOR) */}
      <section id="como-funciona" className="py-16 sm:py-24 bg-stone-100/70 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-14">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-amber-500/15 text-amber-900 border border-amber-500/30 px-4 py-1 rounded-full text-xs font-bold">
              <Layers className="w-3.5 h-3.5 text-[#b87b1c]" />
              <span>O Fluxo Operacional</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-stone-900">
              Como o Imobiflow funciona para você
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 font-light">
              4 passos simples e automatizados para multiplicar sua taxa de conversão imobiliária.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="bg-white rounded-3xl p-7 border border-stone-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-[#b87b1c] flex items-center justify-center font-serif font-black text-xl shadow-xs">
                  1
                </div>
                <h3 className="text-xl font-bold font-serif text-stone-900">
                  Cadastro com IA
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
                  Insira fotos em qualquer formato (1:1, 4:3, 9:16), valor, condomínio e defina a <strong>regra de renda mínima</strong>. A IA redige títulos e descrições irresistíveis.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-stone-100 text-[11px] font-mono text-[#b87b1c]">
                URL: /imoveis/seu-imovel
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-3xl p-7 border border-stone-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-[#b87b1c] flex items-center justify-center font-serif font-black text-xl shadow-xs">
                  2
                </div>
                <h3 className="text-xl font-bold font-serif text-stone-900">
                  Landing Page Pública
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
                  Página rápida, responsiva e pronta para tráfego pago (Instagram, Facebook e Google). O comprador navega sem login e encontra o menu de atendimento (FAB).
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-stone-100 text-[11px] font-medium text-emerald-700">
                SEO & Open Graph Otimizados
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-3xl p-7 border border-stone-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-[#b87b1c] flex items-center justify-center font-serif font-black text-xl shadow-xs">
                  3
                </div>
                <h3 className="text-xl font-bold font-serif text-stone-900">
                  Triagem & Escore 24/7
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
                  O Atendente Virtual conversa naturalmente com o interessado, checa renda, capacidade de entrada e calcula o escore financeiro automaticamente.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-stone-100 text-[11px] font-medium text-blue-700">
                Filtra curiosos sem esforço
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-white rounded-3xl p-7 border border-stone-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-serif font-black text-xl shadow-xs">
                  4
                </div>
                <h3 className="text-xl font-bold font-serif text-stone-900">
                  Entrega no WhatsApp
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
                  O lead aprovado é entregue diretamente no WhatsApp do corretor com resumo formatado, pronto para agendar a visita presencial e fechar o negócio.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-stone-100 text-[11px] font-bold text-emerald-800">
                Taxa de resposta imediata!
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SOLO VS TEAM (ROLETA ROUND-ROBIN) */}
      <section id="solo-vs-equipe" className="py-16 sm:py-24 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-800 border border-blue-200 px-4 py-1 rounded-full text-xs font-bold">
              <Users className="w-3.5 h-3.5 text-blue-600" />
              <span>Modelos Flexíveis de Negócio</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-stone-900">
              Feito para o Corretor Autônomo e para a Imobiliária
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 font-light">
              Escolha a configuração ideal para o seu formato de trabalho.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Solo Mode */}
            <div className="bg-stone-50 rounded-3xl p-8 border-2 border-amber-300/80 shadow-md relative flex flex-col justify-between">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 text-[#b87b1c] flex items-center justify-center">
                    <UserCheck className="w-7 h-7" />
                  </div>
                  <span className="bg-[#b87b1c] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Modo Solo
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-bold font-serif text-stone-900">
                    Corretor Independente
                  </h3>
                  <p className="text-xs text-stone-500 mt-1">
                    Você trabalha sozinho e cuida de suas captações
                  </p>
                </div>

                <ul className="space-y-3.5 text-xs sm:text-sm text-stone-700">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span><strong>100% no seu WhatsApp:</strong> Todos os leads qualificados dos seus anúncios caem direto no seu telefone pessoal.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span><strong>Marca Própria:</strong> Seu nome, seu CRECI e seus dados em destaque na Landing Page.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span><strong>Zero Comissões Repassadas:</strong> Todo o lead captado é seu para negociar e fechar.</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-stone-200">
                <a
                  href="https://wa.me/5511914716715?text=Ol%C3%A1!%20Quero%20testar%20o%20Imobiflow%20por%201%20m%C3%AAs%20gr%C3%A1tis."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-gradient-to-r from-[#b87b1c] to-[#9a6514] hover:from-[#a36b17] hover:to-[#84530f] text-white font-bold text-xs sm:text-sm py-3.5 rounded-xl shadow-xl hover:shadow-amber-500/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0 text-center inline-block border border-amber-400/30"
                >
                  Clique e teste 1 mês grátis
                </a>
              </div>
            </div>

            {/* Team Mode */}
            <div className="bg-stone-50 rounded-3xl p-8 border-2 border-blue-300/80 shadow-md relative flex flex-col justify-between">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center">
                    <Building2 className="w-7 h-7" />
                  </div>
                  <span className="bg-blue-700 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Modo Equipe
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-bold font-serif text-stone-900">
                    Imobiliária & Plantão
                  </h3>
                  <p className="text-xs text-stone-500 mt-1">
                    Gestão de múltiplos corretores com distribuição inteligente
                  </p>
                </div>

                <ul className="space-y-3.5 text-xs sm:text-sm text-stone-700">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-blue-600 shrink-0" />
                    <span><strong>Roleta Round-Robin:</strong> Distribui os leads qualificados em fila sequencial entre corretores de plantão.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-blue-600 shrink-0" />
                    <span><strong>Controle de Disponibilidade:</strong> Ative ou pause corretores (<em>Disponível</em>, <em>Ausente</em>, <em>Bloqueado</em>).</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-blue-600 shrink-0" />
                    <span><strong>Gestão Centralizada:</strong> Métricas globais de captação e volume por corretor da equipe.</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-stone-200">
                <a
                  href="https://wa.me/5511914716715?text=Ol%C3%A1!%20Quero%20testar%20o%20Imobiflow%20por%201%20m%C3%AAs%20gr%C3%A1tis."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-gradient-to-r from-[#b87b1c] to-[#9a6514] hover:from-[#a36b17] hover:to-[#84530f] text-white font-bold text-xs sm:text-sm py-3.5 rounded-xl shadow-xl hover:shadow-amber-500/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0 text-center inline-block border border-amber-400/30"
                >
                  Clique e teste 1 mês grátis
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SCORECARD & INCOME MATRIX */}
      <section id="regras-escore" className="py-16 sm:py-24 bg-stone-100/70 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-amber-500/15 text-amber-900 border border-amber-500/30 px-4 py-1 rounded-full text-xs font-bold">
              <Calculator className="w-3.5 h-3.5 text-[#b87b1c]" />
              <span>Matriz Financeira de Pontuação</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-stone-900">
              Critérios de Escore & Qualificação por Renda
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 font-light">
              Tabela padronizada utilizada pela Inteligência Artificial para aprovação ou descarte automático de interessados.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Table */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
              <div className="p-4 bg-stone-950 text-white flex items-center justify-between text-xs font-bold">
                <span>FAIXA DE RENDA MENSAL</span>
                <span>ESCORE GERADO PELA IA</span>
              </div>
              <div className="divide-y divide-stone-200 text-xs sm:text-sm">
                <div className="p-4 flex items-center justify-between">
                  <span className="font-medium text-stone-700">Até R$ 3.000,00</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-stone-900">25 pontos</span>
                    <span className="text-[10px] bg-rose-100 text-rose-800 font-bold px-2 py-0.5 rounded">Risco Alto</span>
                  </div>
                </div>
                <div className="p-4 flex items-center justify-between bg-stone-50/50">
                  <span className="font-medium text-stone-700">R$ 3.000,00 a R$ 5.000,00</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-stone-900">50 pontos</span>
                    <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded">Mínimo Padrão</span>
                  </div>
                </div>
                <div className="p-4 flex items-center justify-between">
                  <span className="font-medium text-stone-700">R$ 5.000,00 a R$ 7.000,00</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-stone-900">75 pontos</span>
                    <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded">Qualificado</span>
                  </div>
                </div>
                <div className="p-4 flex items-center justify-between bg-stone-50/50">
                  <span className="font-medium text-stone-700">R$ 7.000,00 a R$ 10.000,00</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-stone-900">100 pontos</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">Alto Potencial</span>
                  </div>
                </div>
                <div className="p-4 flex items-center justify-between">
                  <span className="font-medium text-stone-700">Acima de R$ 10.000,00</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-stone-900">100 pontos</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">Lead Prime</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Slider Widget */}
            <div className="lg:col-span-5 bg-white rounded-3xl border border-stone-200 p-6 sm:p-7 shadow-sm space-y-5">
              <div className="flex items-center gap-2 font-serif font-bold text-stone-900">
                <Sliders className="w-5 h-5 text-[#b87b1c]" />
                <span>Simulador de Regra ao Vivo</span>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>Renda Familiar Declarada:</span>
                  <span className="text-[#b87b1c] font-mono text-sm">
                    R$ {simulatedIncome.toLocaleString('pt-BR')}
                  </span>
                </div>
                <input
                  type="range"
                  min={2000}
                  max={15000}
                  step={500}
                  value={simulatedIncome}
                  onChange={(e) => setSimulatedIncome(Number(e.target.value))}
                  className="w-full accent-[#b87b1c] cursor-pointer"
                />
              </div>

              <div className={`p-4 rounded-2xl border text-xs space-y-1.5 ${
                isApproved ? 'bg-emerald-50 border-emerald-300 text-emerald-950' : 'bg-rose-50 border-rose-300 text-rose-950'
              }`}>
                <div className="flex items-center justify-between font-bold">
                  <span>STATUS: {isApproved ? 'APROVADO P/ WHATSAPP' : 'ARQUIVADO (DESQUALIFICADO)'}</span>
                  <span className="font-mono bg-white px-2 py-0.5 rounded">
                    {currentScore} pts
                  </span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  {isApproved
                    ? 'O lead passa imediatamente pelo filtro e você recebe a mensagem pronta no WhatsApp.'
                    : 'A renda é insuficiente para o imóvel configurado, evitando visitas improdutivas.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PRICING PLANS */}
      <section id="planos" className="py-16 sm:py-24 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-amber-500/15 text-amber-900 border border-amber-500/30 px-4 py-1 rounded-full text-xs font-bold">
              <Zap className="w-3.5 h-3.5 text-[#b87b1c]" />
              <span>Transparência Total</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-stone-900">
              Planos sem pegadinhas nem comissão sobre sua venda
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 font-light">
              Assinatura simples com Landing Pages ilimitadas e qualificação com IA 24/7.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Solo Plan */}
            <div className="bg-stone-50 rounded-3xl p-8 border border-stone-200 shadow-sm flex flex-col justify-between">
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold font-serif text-stone-900">Plano Corretor Solo</h3>
                  <span className="text-xs bg-stone-200 text-stone-800 font-bold px-3 py-1 rounded-full">Individual</span>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl font-serif font-black text-stone-900">R$ 97</span>
                  <span className="text-xs text-stone-500 font-normal">/mês</span>
                </div>

                <p className="text-xs text-stone-600 font-light">
                  Ideal para corretores autônomos que desejam profissionalizar seus anúncios.
                </p>

                <ul className="space-y-3 text-xs text-stone-700 pt-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Landing Pages ilimitadas por imóvel</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Atendente com IA 24/7 integrado</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>100% dos leads no seu WhatsApp pessoal</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Redator de Anúncios com IA</span>
                  </li>
                </ul>
              </div>

              <a
                href="https://wa.me/5511914716715?text=Ol%C3%A1!%20Quero%20testar%20o%20Imobiflow%20por%201%20m%C3%AAs%20gr%C3%A1tis."
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 w-full bg-gradient-to-r from-[#b87b1c] to-[#9a6514] hover:from-[#a36b17] hover:to-[#84530f] text-white font-bold text-xs sm:text-sm py-3.5 rounded-xl shadow-xl hover:shadow-amber-500/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0 text-center inline-block border border-amber-400/30"
              >
                Clique e teste 1 mês grátis
              </a>
            </div>

            {/* Team Plan */}
            <div className="bg-stone-900 text-white rounded-3xl p-8 border-2 border-amber-500 shadow-xl flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#b87b1c] text-white text-[10px] uppercase font-bold tracking-wider px-4 py-1 rounded-bl-xl">
                Mais Popular
              </div>

              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold font-serif text-white">Plano Imobiliária & Equipe</h3>
                  <span className="text-xs bg-amber-500/30 text-amber-300 font-bold px-3 py-1 rounded-full">Equipes</span>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl font-serif font-black text-white">R$ 247</span>
                  <span className="text-xs text-stone-400 font-normal">/mês</span>
                </div>

                <p className="text-xs text-stone-300 font-light">
                  Para imobiliárias e gestores com plantão de corretores em rodízio.
                </p>

                <ul className="space-y-3 text-xs text-stone-200 pt-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Tudo do plano Solo incluído</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span><strong>Roleta Round-Robin:</strong> Distribuição de plantão</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Até 15 corretores vinculados</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Painel Admin com contagem de leads por corretor</span>
                  </li>
                </ul>
              </div>

              <a
                href="https://wa.me/5511914716715?text=Ol%C3%A1!%20Quero%20testar%20o%20Imobiflow%20por%201%20m%C3%AAs%20gr%C3%A1tis."
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 w-full bg-gradient-to-r from-[#b87b1c] to-[#9a6514] hover:from-[#a36b17] hover:to-[#84530f] text-white font-bold text-xs sm:text-sm py-3.5 rounded-xl shadow-xl hover:shadow-amber-500/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0 text-center inline-block border border-amber-400/30"
              >
                Clique e teste 1 mês grátis
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FAQ ACCORDION */}
      <section id="faq" className="py-16 sm:py-24 bg-stone-50 border-b border-stone-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-10">
          <div className="text-center space-y-3">
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-stone-900">
              Perguntas Frequentes (FAQ)
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 font-light">
              Tire suas dúvidas sobre como o Imobiflow potencializa sua rotina.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-2xs"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-serif font-bold text-stone-900 text-sm sm:text-base cursor-pointer hover:bg-stone-50 transition-colors"
                >
                  <span>{faq.q}</span>
                  {openFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-[#b87b1c] shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-stone-400 shrink-0" />
                  )}
                </button>

                {openFaq === index && (
                  <div className="px-5 pb-6 sm:px-6 text-xs sm:text-sm text-stone-600 font-light leading-relaxed border-t border-stone-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FINAL CALL TO ACTION */}
      <section 
        className="py-20 sm:py-24 bg-stone-950 text-white text-center relative overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(12, 10, 9, 0.94) 0%, rgba(28, 25, 23, 0.89) 50%, rgba(12, 10, 9, 0.95) 100%), url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1920&q=85')`,
        }}
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 border border-amber-400/30 px-4 py-1 rounded-full text-xs font-bold backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Comece Hoje Mesmo</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-white leading-tight drop-shadow-md">
            Pronto para receber leads qualificados direto no seu WhatsApp?
          </h2>

          <p className="text-xs sm:text-sm text-stone-300 font-light max-w-xl mx-auto drop-shadow-xs">
            Cadastre seu primeiro imóvel agora mesmo e veja como o Imobiflow transforma visualizações em propostas reais de compra.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://wa.me/5511914716715?text=Ol%C3%A1!%20Quero%20testar%20o%20Imobiflow%20por%201%20m%C3%AAs%20gr%C3%A1tis."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-[#b87b1c] to-[#9a6514] hover:from-[#a36b17] hover:to-[#84530f] text-white text-xs sm:text-sm font-bold px-8 py-4 rounded-xl shadow-xl transition-all flex items-center gap-2 border border-amber-400/30"
            >
              <Zap className="w-4 h-4 text-amber-200" />
              <span>Clique e teste 1 mês grátis</span>
            </a>

            <a
              href="https://wa.me/5511914716715?text=Ol%C3%A1,%20quero%20falar%20com%20um%20consultor%20do%20Imobiflow."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-stone-900/90 hover:bg-stone-800 text-white border border-stone-700 text-xs sm:text-sm font-semibold px-6 py-4 rounded-xl transition-all flex items-center gap-2 backdrop-blur-md"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>Falar com Consultor</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
