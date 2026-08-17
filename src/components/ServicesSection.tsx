import React, { useState } from 'react';
import { 
  Bot, 
  Zap, 
  Users, 
  UserCheck, 
  MessageSquare, 
  LayoutDashboard, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  Sparkles, 
  Building2, 
  ShieldCheck, 
  Layers, 
  PhoneCall, 
  Calculator, 
  Sliders, 
  Clock, 
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Award
} from 'lucide-react';

interface ServicesSectionProps {
  onOpenRegisterModal: () => void;
  onOpenValuation?: () => void;
  onOpenSimulator?: () => void;
  isStandalonePage?: boolean;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onOpenRegisterModal,
  onOpenValuation,
  onOpenSimulator,
  isStandalonePage = false,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'workflow' | 'solo-vs-team' | 'scorecard' | 'crm'>('overview');
  
  // Interactive Scorecard Simulator State
  const [simulatedIncome, setSimulatedIncome] = useState<number>(6500);
  const [minScoreRequired, setMinScoreRequired] = useState<number>(50);

  // Calculate score based on project specifications
  const calculateScore = (income: number) => {
    if (income <= 3000) return 25;
    if (income <= 5000) return 50;
    if (income <= 7000) return 75;
    return 100;
  };

  const currentScore = calculateScore(simulatedIncome);
  const isApproved = currentScore >= minScoreRequired;

  return (
    <section id="services-how-it-works-section" className="bg-stone-50/80 py-16 sm:py-20 border-y border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        {/* Header Title */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-amber-500/15 border border-amber-500/30 text-amber-900 px-4 py-1 rounded-full text-xs font-bold tracking-wide">
            <Bot className="w-3.5 h-3.5 text-[#b87b1c]" />
            <span>Guia Operacional peixeweb para Corretores & Imobiliárias</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-stone-900 leading-tight">
            Como Funciona o <span className="text-[#b87b1c]">peixeweb</span>
          </h2>
          <div className="w-16 h-1 bg-[#b87b1c] mx-auto rounded-full"></div>
          <p className="text-sm sm:text-base text-stone-600 font-light leading-relaxed">
            Da criação da Landing Page individual à qualificação automática por faixa de renda com IA e entrega do lead quente no seu WhatsApp.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center justify-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-1.5 bg-stone-200/80 p-1.5 rounded-2xl border border-stone-300 shadow-inner max-w-full">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'overview'
                  ? 'bg-stone-900 text-white shadow-md'
                  : 'text-stone-700 hover:text-stone-950 hover:bg-stone-100'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Visão Geral</span>
            </button>

            <button
              onClick={() => setActiveTab('solo-vs-team')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'solo-vs-team'
                  ? 'bg-stone-900 text-white shadow-md'
                  : 'text-stone-700 hover:text-stone-950 hover:bg-stone-100'
              }`}
            >
              <Users className="w-4 h-4 text-amber-400" />
              <span>Solo vs Imobiliária (Roleta)</span>
            </button>

            <button
              onClick={() => setActiveTab('workflow')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'workflow'
                  ? 'bg-stone-900 text-white shadow-md'
                  : 'text-stone-700 hover:text-stone-950 hover:bg-stone-100'
              }`}
            >
              <Layers className="w-4 h-4 text-amber-400" />
              <span>Fluxo Passo a Passo</span>
            </button>

            <button
              onClick={() => setActiveTab('scorecard')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'scorecard'
                  ? 'bg-stone-900 text-white shadow-md'
                  : 'text-stone-700 hover:text-stone-950 hover:bg-stone-100'
              }`}
            >
              <Calculator className="w-4 h-4 text-amber-400" />
              <span>Regras de Renda & Escore</span>
            </button>

            <button
              onClick={() => setActiveTab('crm')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'crm'
                  ? 'bg-stone-900 text-white shadow-md'
                  : 'text-stone-700 hover:text-stone-950 hover:bg-stone-100'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-amber-400" />
              <span>CRM Kanban & WhatsApp</span>
            </button>
          </div>
        </div>

        {/* TAB 1: VISÃO GERAL */}
        {activeTab === 'overview' && (
          <div className="space-y-10 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1 */}
              <div className="bg-white rounded-2xl p-7 border border-stone-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[#b87b1c] flex items-center justify-center">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold font-serif text-stone-900">
                    1. Landing Page por Imóvel
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
                    Cada imóvel cadastrado ganha instantaneamente uma página pública exclusiva (<code className="bg-stone-100 px-1 py-0.5 rounded text-[11px] text-stone-800 font-mono">/imoveis/slug</code>) com SEO otimizado, galeria em proporções 1:1, 4:3 ou 9:16 e fotos de alta resolução.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-stone-100 text-xs font-semibold text-[#b87b1c] flex items-center gap-1">
                  <span>Pronto para anúncios e redes</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-white rounded-2xl p-7 border border-stone-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 flex items-center justify-center">
                    <Bot className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold font-serif text-stone-900">
                    2. Atendente Virtual com IA 24/7
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
                    Chat estilo WhatsApp embarcado na página pública. A IA conversa em linguagem natural, tira dúvidas sobre o condomínio e localização, coleta a renda e calcula a capacidade financeira do interessado.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-stone-100 text-xs font-semibold text-emerald-700 flex items-center gap-1">
                  <span>Sem perder leads na madrugada</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-white rounded-2xl p-7 border border-stone-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-700 flex items-center justify-center">
                    <Zap className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold font-serif text-stone-900">
                    3. CRM Kanban + WhatsApp
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
                    Leads aprovados geram um dossiê pronto enviado no WhatsApp do corretor e entram no funil Kanban (<em>Novo, Em Atendimento, Proposta, Fechado, Perdido</em>) com transcrição da conversa.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-stone-100 text-xs font-semibold text-blue-700 flex items-center gap-1">
                  <span>Conversão ágil e organizada</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            {/* Architecture Highlights Banner */}
            <div className="bg-gradient-to-br from-stone-900 via-stone-850 to-stone-950 rounded-2xl p-6 sm:p-8 text-white border border-stone-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Tecnologia & Proteção de Dados</span>
                </div>
                <h4 className="text-xl sm:text-2xl font-serif font-bold text-white">
                  Infraestrutura Moderna & Segura
                </h4>
                <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
                  Páginas ultra-rápidas e otimizadas para o Google, proteção total aos dados de contato dos seus clientes e integração automática para entrega de leads no WhatsApp.
                </p>
              </div>

              <button
                onClick={onOpenRegisterModal}
                className="bg-[#b87b1c] hover:bg-[#a36b17] text-white text-xs sm:text-sm font-bold px-6 py-3.5 rounded-xl shadow-lg transition-all flex items-center gap-2 shrink-0 cursor-pointer"
              >
                <span>Cadastrar Primeiro Imóvel</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: SOLO VS TEAM (ROLETA ROUND-ROBIN) */}
        {activeTab === 'solo-vs-team' && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h3 className="text-2xl font-serif font-bold text-stone-900">
                Dois Modos de Operação Flexíveis
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 font-light">
                O peixeweb se adapta perfeitamente tanto ao corretor que atua sozinho quanto à imobiliária com dezenas de corretores no plantão.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* SOLO MODE */}
              <div className="bg-white rounded-2xl p-7 border-2 border-amber-200/80 shadow-md relative overflow-hidden flex flex-col justify-between">
                <div className="absolute top-0 right-0 bg-[#b87b1c] text-white text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-bl-xl">
                  Modo Solo
                </div>

                <div className="space-y-5">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-amber-100 text-[#b87b1c] flex items-center justify-center">
                      <UserCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold font-serif text-stone-900">Corretor Independente</h4>
                      <p className="text-xs text-stone-500">Trabalho autônomo e direto</p>
                    </div>
                  </div>

                  <ul className="space-y-3 text-xs sm:text-sm text-stone-700">
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>WhatsApp Direto:</strong> 100% dos leads qualificados chegam diretamente no WhatsApp do corretor dono do anúncio.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Landing Pages Pessoais:</strong> Páginas com o nome, CRECI e foto do corretor no rodapé e no atendimento.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Painel Simplificado:</strong> Visão do seu próprio funil de vendas, imóveis e contatos.</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-8 pt-4 border-t border-stone-100 bg-amber-50/50 p-3 rounded-xl text-[11px] text-amber-900">
                  ⚡ <strong>Ideal para:</strong> Corretores autônomos que investem em anúncios próprios no Instagram/Google e querem filtrar curiosos.
                </div>
              </div>

              {/* TEAM MODE (ROLETA ROUND-ROBIN) */}
              <div className="bg-white rounded-2xl p-7 border-2 border-blue-200/80 shadow-md relative overflow-hidden flex flex-col justify-between">
                <div className="absolute top-0 right-0 bg-blue-700 text-white text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-bl-xl">
                  Modo Imobiliária / Equipe
                </div>

                <div className="space-y-5">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                      <Building2 className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold font-serif text-stone-900">Imobiliária & Roleta de Plantão</h4>
                      <p className="text-xs text-stone-500">Distribuição automatizada round-robin</p>
                    </div>
                  </div>

                  <ul className="space-y-3 text-xs sm:text-sm text-stone-700">
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span><strong>Roleta Inteligente:</strong> Distribui os leads qualificados entre os corretores de plantão em sequência justa (Round-Robin).</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span><strong>Controle de Status:</strong> Alterna corretores entre <em>Ativo/Disponível</em>, <em>Ausente</em> ou <em>Bloqueado</em>. Corretores ausentes não recebem leads.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span><strong>Visão Admin Geral:</strong> A imobiliária acompanha o volume de leads recebidos por cada corretor da equipe.</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-8 pt-4 border-t border-stone-100 bg-blue-50/50 p-3 rounded-xl text-[11px] text-blue-950">
                  🏢 <strong>Ideal para:</strong> Imobiliárias, imobiliárias digitais e equipes de vendas com rodízio de atendimento.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: WORKFLOW PASSO A PASSO */}
        {activeTab === 'workflow' && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h3 className="text-2xl font-serif font-bold text-stone-900">
                O Ciclo Completo da Oportunidade
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 font-light">
                Entenda o caminho que o lead percorre desde o clique no anúncio até a visita agendada.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
              {/* Step 1 */}
              <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs relative flex flex-col">
                <div className="w-8 h-8 rounded-full bg-[#b87b1c] text-white flex items-center justify-center font-bold text-xs mb-3 shadow-sm">
                  1
                </div>
                <h4 className="font-serif font-bold text-base text-stone-900 mb-1">
                  Cadastro & Regra
                </h4>
                <p className="text-xs text-stone-600 font-light leading-relaxed flex-1">
                  Você insere os dados do imóvel e define a <strong>renda mínima sugerida</strong> para aprovação no financiamento.
                </p>
                <div className="mt-4 pt-3 border-t border-stone-100 text-[11px] text-stone-500 font-mono">
                  Slug: /imoveis/if-101
                </div>
              </div>

              {/* Step 2 */}
              <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs relative flex flex-col">
                <div className="w-8 h-8 rounded-full bg-[#b87b1c] text-white flex items-center justify-center font-bold text-xs mb-3 shadow-sm">
                  2
                </div>
                <h4 className="font-serif font-bold text-base text-stone-900 mb-1">
                  Landing Page Ativa
                </h4>
                <p className="text-xs text-stone-600 font-light leading-relaxed flex-1">
                  O cliente acessa a página pública, visualiza fotos, mapas, condomínio e clica no menu flutuante (FAB) de atendimento.
                </p>
                <div className="mt-4 pt-3 border-t border-stone-100 text-[11px] text-stone-500">
                  Chat WhatsApp-Style
                </div>
              </div>

              {/* Step 3 */}
              <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs relative flex flex-col">
                <div className="w-8 h-8 rounded-full bg-[#b87b1c] text-white flex items-center justify-center font-bold text-xs mb-3 shadow-sm">
                  3
                </div>
                <h4 className="font-serif font-bold text-base text-stone-900 mb-1">
                  Triagem & Escore
                </h4>
                <p className="text-xs text-stone-600 font-light leading-relaxed flex-1">
                  A IA coleta nome e renda. Se a renda atingir o escore do imóvel, o lead é classificado como <strong>Regular (Aprovado)</strong>.
                </p>
                <div className="mt-4 pt-3 border-t border-stone-100 text-[11px] text-emerald-700 font-semibold">
                  Escore 25 / 50 / 75 / 100
                </div>
              </div>

              {/* Step 4 */}
              <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs relative flex flex-col">
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs mb-3 shadow-sm">
                  4
                </div>
                <h4 className="font-serif font-bold text-base text-stone-900 mb-1">
                  WhatsApp & Kanban
                </h4>
                <p className="text-xs text-stone-600 font-light leading-relaxed flex-1">
                  O lead clica no botão "Falar no WhatsApp" já com os dados preenchidos e entra na coluna <em>Novo</em> do Kanban para acompanhamento.
                </p>
                <div className="mt-4 pt-3 border-t border-stone-100 text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                  <span>Pronto para Fechar!</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: REGRAS DE RENDA & ESCORE INTERATIVO */}
        {activeTab === 'scorecard' && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h3 className="text-2xl font-serif font-bold text-stone-900">
                Tabela Oficial de Escore & Qualificação
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 font-light">
                Critérios padronizados de pontuação por faixa de renda comprovada ou declarada pelo comprador no chat com a IA.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Official Table */}
              <div className="lg:col-span-7 bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
                <div className="p-4 bg-stone-900 text-white flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider">Matriz de Qualificação peixeweb</span>
                  <span className="text-[11px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-mono">Padrão Sistema</span>
                </div>

                <div className="divide-y divide-stone-200 text-xs sm:text-sm">
                  <div className="p-4 flex items-center justify-between bg-stone-50/50">
                    <span className="font-medium text-stone-700">Até R$ 3.000,00</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-stone-900">25 pts</span>
                      <span className="text-[10px] bg-rose-100 text-rose-800 font-bold px-2 py-0.5 rounded-full">Entrada Baixa</span>
                    </div>
                  </div>

                  <div className="p-4 flex items-center justify-between">
                    <span className="font-medium text-stone-700">R$ 3.000,00 a R$ 5.000,00</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-stone-900">50 pts</span>
                      <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full">Escore Mínimo Padrão</span>
                    </div>
                  </div>

                  <div className="p-4 flex items-center justify-between bg-stone-50/50">
                    <span className="font-medium text-stone-700">R$ 5.000,00 a R$ 7.000,00</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-stone-900">75 pts</span>
                      <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded-full">Perfil Qualificado</span>
                    </div>
                  </div>

                  <div className="p-4 flex items-center justify-between">
                    <span className="font-medium text-stone-700">R$ 7.000,00 a R$ 10.000,00</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-stone-900">100 pts</span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">Alto Potencial</span>
                    </div>
                  </div>

                  <div className="p-4 flex items-center justify-between bg-stone-50/50">
                    <span className="font-medium text-stone-700">Acima de R$ 10.000,00</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-stone-900">100 pts</span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">Lead Prime / Alto Padrão</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-stone-50 border-t border-stone-200 text-xs text-stone-600 space-y-1">
                  <p>• <strong>Lead Aprovado:</strong> Salvo com status <code className="text-emerald-700 font-bold">Regular</code> e atribuído ao corretor responsável ou ao próximo da roleta.</p>
                  <p>• <strong>Lead Reprovado:</strong> Salvo com status <code className="text-rose-700 font-bold">Inválido p/ Imóvel</code> e arquivado no estágio <em>Perdido</em> para evitar perda de tempo.</p>
                </div>
              </div>

              {/* Interactive Score Simulator */}
              <div className="lg:col-span-5 bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-5">
                <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
                  <Calculator className="w-4 h-4 text-[#b87b1c]" />
                  <span>Simulador de Escore em Tempo Real</span>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-stone-600 font-medium">Renda declarada pelo lead:</span>
                    <span className="font-bold text-stone-900 font-mono">
                      R$ {simulatedIncome.toLocaleString('pt-BR')}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={1500}
                    max={15000}
                    step={500}
                    value={simulatedIncome}
                    onChange={(e) => setSimulatedIncome(Number(e.target.value))}
                    className="w-full accent-[#b87b1c] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-stone-400 mt-1">
                    <span>R$ 1.500</span>
                    <span>R$ 7.500</span>
                    <span>R$ 15.000+</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-stone-600 font-medium">Escore mínimo exigido no imóvel:</span>
                    <span className="font-bold text-stone-900 font-mono">{minScoreRequired} pts</span>
                  </div>
                  <div className="grid grid-cols-4 gap-1.5">
                    {[25, 50, 75, 100].map((score) => (
                      <button
                        key={score}
                        type="button"
                        onClick={() => setMinScoreRequired(score)}
                        className={`py-1.5 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                          minScoreRequired === score
                            ? 'bg-[#b87b1c] text-white border-[#b87b1c]'
                            : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                        }`}
                      >
                        {score} pts
                      </button>
                    ))}
                  </div>
                </div>

                {/* Live Result Box */}
                <div className={`p-4 rounded-xl border text-xs space-y-2 ${
                  isApproved 
                    ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950' 
                    : 'bg-rose-50/70 border-rose-300 text-rose-950'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {isApproved ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <XCircle className="w-5 h-5 text-rose-600" />
                      )}
                      <span className="font-bold text-sm">
                        {isApproved ? 'LEAD APROVADO' : 'LEAD REPROVADO'}
                      </span>
                    </div>
                    <span className="font-mono font-black text-sm bg-white/80 px-2 py-0.5 rounded shadow-2xs">
                      {currentScore} / 100 pts
                    </span>
                  </div>

                  <p className="text-[11px] leading-relaxed">
                    {isApproved
                      ? `O comprador atinge a renda mínima exigida. A IA libera o link do WhatsApp para o corretor responsável e salva o lead como "Regular".`
                      : `A renda de R$ ${simulatedIncome.toLocaleString('pt-BR')} gerou ${currentScore} pts, abaixo dos ${minScoreRequired} pts exigidos. A IA sugere opções compatíveis ou arquiva como "Perdido".`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: CRM KANBAN & WHATSAPP */}
        {activeTab === 'crm' && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h3 className="text-2xl font-serif font-bold text-stone-900">
                CRM Kanban com 5 Estágios
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 font-light">
                Gestão visual completa do funil de vendas, garantindo que nenhum comprador fique sem retorno.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
              <div className="bg-white rounded-xl p-4 border border-stone-200 shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-800">1. Novo</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                </div>
                <p className="text-[11px] text-stone-500">Lead qualificado recém-chegado da Landing Page.</p>
              </div>

              <div className="bg-white rounded-xl p-4 border border-stone-200 shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-800">2. Em Atendimento</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                </div>
                <p className="text-[11px] text-stone-500">Corretor iniciou o contato pelo WhatsApp.</p>
              </div>

              <div className="bg-white rounded-xl p-4 border border-stone-200 shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-800">3. Proposta</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
                </div>
                <p className="text-[11px] text-stone-500">Visita realizada e proposta de compra em análise.</p>
              </div>

              <div className="bg-white rounded-xl p-4 border border-stone-200 shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-800">4. Fechado</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                </div>
                <p className="text-[11px] text-stone-500">Contrato assinado e comissão garantida!</p>
              </div>

              <div className="bg-white rounded-xl p-4 border border-stone-200 shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-800">5. Perdido</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-stone-400"></span>
                </div>
                <p className="text-[11px] text-stone-500">Lead desqualificado ou desistência formal.</p>
              </div>
            </div>

            {/* WhatsApp Integration Preview */}
            <div className="bg-stone-900 text-white rounded-2xl p-6 sm:p-8 border border-stone-800 shadow-xl flex flex-col md:flex-row items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-emerald-600/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shrink-0">
                <MessageSquare className="w-8 h-8" />
              </div>

              <div className="space-y-2 flex-1">
                <h4 className="text-lg sm:text-xl font-bold font-serif">
                  Mensagem Formatada Pronta para o WhatsApp
                </h4>
                <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
                  Ao aprovar o lead, o sistema gera o link <code className="text-amber-400 font-mono text-[11px]">https://wa.me/5511...</code> contendo o código do imóvel, nome do cliente, renda declarada, escore e resumo das necessidades. Você clica e começa a conversa sem digitação manual.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Action Banner */}
        <div className="pt-4 text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onOpenRegisterModal}
              className="bg-[#b87b1c] hover:bg-[#a36b17] active:bg-[#925f12] text-white font-bold text-xs sm:text-sm py-3.5 px-8 rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-200" />
              <span>Criar Landing Page com IA Agora</span>
            </button>
            {onOpenSimulator && (
              <button
                onClick={onOpenSimulator}
                className="bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 font-semibold text-xs sm:text-sm py-3.5 px-6 rounded-xl transition-all cursor-pointer"
              >
                Simulador de Financiamento
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
