import React, { useState } from 'react';
import { 
  Users, Building, Flame, Sparkles, MessageCircle, Phone, Clock, 
  Search, Filter, ChevronRight, CheckCircle2, AlertCircle, Eye, 
  Plus, ArrowUpRight, BarChart3, FileText, UserCheck
} from 'lucide-react';
import { Lead, Property, Broker, LeadScore } from '../types';

interface BrokerDashboardProps {
  leads: Lead[];
  properties: Property[];
  brokers: Broker[];
  onSelectProperty: (property: Property) => void;
  onOpenRegisterModal: () => void;
  onUpdateLeadStatus: (leadId: string, status: Lead['status']) => void;
}

export const BrokerDashboard: React.FC<BrokerDashboardProps> = ({
  leads,
  properties,
  brokers,
  onSelectProperty,
  onOpenRegisterModal,
  onUpdateLeadStatus,
}) => {
  const [activeTab, setActiveTab] = useState<'leads' | 'properties'>('leads');
  const [selectedScoreFilter, setSelectedScoreFilter] = useState<LeadScore | 'Todos'>('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLeadForDetails, setSelectedLeadForDetails] = useState<Lead | null>(null);

  // Statistics
  const totalLeads = leads.length;
  const hotLeads = leads.filter((l) => l.qualification?.score === 'Quente').length;
  const warmLeads = leads.filter((l) => l.qualification?.score === 'Morno').length;
  const totalProperties = properties.length;
  const totalSales = properties.filter((p) => p.operation === 'Venda').length;
  const totalRentals = properties.filter((p) => p.operation === 'Aluguel').length;

  // Filtered Leads
  const filteredLeads = leads.filter((lead) => {
    if (selectedScoreFilter !== 'Todos' && lead.qualification?.score !== selectedScoreFilter) {
      return false;
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchName = lead.name.toLowerCase().includes(q);
      const matchPhone = lead.phone.toLowerCase().includes(q);
      const matchProp = lead.propertyTitle.toLowerCase().includes(q) || lead.propertyCode.toLowerCase().includes(q);
      if (!matchName && !matchPhone && !matchProp) return false;
    }
    return true;
  });

  const getScoreBadge = (score?: LeadScore) => {
    switch (score) {
      case 'Quente':
        return (
          <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full border border-emerald-300">
            <Flame className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
            <span>Quente</span>
          </span>
        );
      case 'Morno':
        return (
          <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 text-xs font-bold px-2.5 py-0.5 rounded-full border border-amber-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Morno</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 bg-stone-100 text-stone-700 text-xs font-medium px-2 py-0.5 rounded-full">
            <span>Frio</span>
          </span>
        );
    }
  };

  const getStatusColor = (status: Lead['status']) => {
    switch (status) {
      case 'Visita Agendada': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Em Atendimento': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Proposta Feita': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Fechado': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Descartado': return 'bg-stone-100 text-stone-500 border-stone-200';
      default: return 'bg-stone-50 text-stone-700 border-stone-200';
    }
  };

  return (
    <div id="broker-crm-dashboard" className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-8">
      {/* Top Header */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-amber-100 text-[#b87b1c] text-xs font-bold uppercase tracking-wider px-3 py-0.5 rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Painel do Corretor & IA CRM</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-black text-stone-900">
            Gestão de Imóveis & Qualificação de Leads
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 font-light">
            Acompanhe em tempo real os clientes qualificados pelo atendente de Inteligência Artificial das Landing Pages.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            id="btn-crm-register-property"
            onClick={onOpenRegisterModal}
            className="bg-[#b87b1c] hover:bg-[#a36b17] active:bg-[#925f12] text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl flex items-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>+ Cadastrar Imóvel com IA</span>
          </button>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Metric 1 */}
        <div className="bg-white rounded-xl p-5 border border-stone-200 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-xs text-stone-500 font-medium block">Total de Imóveis Ativos</span>
            <span className="text-2xl font-serif font-black text-stone-900">{totalProperties}</span>
            <span className="text-[11px] text-stone-400 block mt-0.5">
              {totalSales} à venda • {totalRentals} para alugar
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-[#b87b1c]">
            <Building className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white rounded-xl p-5 border border-stone-200 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-xs text-stone-500 font-medium block">Leads Capturados (IA)</span>
            <span className="text-2xl font-serif font-black text-stone-900">{totalLeads}</span>
            <span className="text-[11px] text-emerald-600 block mt-0.5 font-medium">
              100% qualificados automaticamente
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
            <Users className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white rounded-xl p-5 border border-stone-200 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-xs text-stone-500 font-medium block">Leads Quentes 🔥</span>
            <span className="text-2xl font-serif font-black text-emerald-600">{hotLeads}</span>
            <span className="text-[11px] text-stone-400 block mt-0.5">
              Prontos p/ visita presencial ou compra
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
            <Flame className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white rounded-xl p-5 border border-stone-200 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-xs text-stone-500 font-medium block">Leads Mornos ⚡</span>
            <span className="text-2xl font-serif font-black text-amber-600">{warmLeads}</span>
            <span className="text-[11px] text-stone-400 block mt-0.5">
              Simulando crédito / avaliando propostas
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600">
            <Sparkles className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="border-b border-stone-200 flex items-center justify-between px-6 pt-4">
          <div className="flex items-center gap-6">
            <button
              onClick={() => setActiveTab('leads')}
              className={`pb-4 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'leads'
                  ? 'border-[#b87b1c] text-[#b87b1c]'
                  : 'border-transparent text-stone-500 hover:text-stone-900'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>Leads Qualificados pela IA ({leads.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('properties')}
              className={`pb-4 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'properties'
                  ? 'border-[#b87b1c] text-[#b87b1c]'
                  : 'border-transparent text-stone-500 hover:text-stone-900'
              }`}
            >
              <Building className="w-4 h-4" />
              <span>Imóveis Cadastrados & Landing Pages ({properties.length})</span>
            </button>
          </div>
        </div>

        {/* TAB 1: LEADS QUALIFICADOS */}
        {activeTab === 'leads' && (
          <div className="p-6 space-y-6">
            {/* Filter Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Buscar lead por nome, imóvel ou telefone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-lg pl-9 pr-3 py-2 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-xs text-stone-500 font-medium">Filtrar Temperatura:</span>
                <div className="flex items-center bg-stone-100 p-1 rounded-lg">
                  {(['Todos', 'Quente', 'Morno', 'Frio'] as const).map((sc) => (
                    <button
                      key={sc}
                      onClick={() => setSelectedScoreFilter(sc)}
                      className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                        selectedScoreFilter === sc
                          ? 'bg-[#b87b1c] text-white shadow-xs'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      {sc}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Leads Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-stone-200 text-[11px] font-semibold text-stone-500 uppercase tracking-wider bg-stone-50/70">
                    <th className="py-3 px-4">Cliente / Contato</th>
                    <th className="py-3 px-4">Imóvel de Interesse</th>
                    <th className="py-3 px-4">Qualificação IA</th>
                    <th className="py-3 px-4">Urgência / Pagamento</th>
                    <th className="py-3 px-4">Status do Funil</th>
                    <th className="py-3 px-4 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-xs sm:text-sm">
                  {filteredLeads.map((lead) => {
                    const broker = brokers.find((b) => b.id === lead.brokerId);
                    return (
                      <tr key={lead.id} className="hover:bg-stone-50/80 transition-colors">
                        {/* Client name & phone */}
                        <td className="py-4 px-4">
                          <div className="font-bold text-stone-900 font-serif">{lead.name}</div>
                          <div className="text-xs text-stone-500 flex items-center gap-1 mt-0.5">
                            <Phone className="w-3 h-3 text-stone-400" />
                            <span>{lead.phone}</span>
                          </div>
                          {lead.email && (
                            <div className="text-[11px] text-stone-400">{lead.email}</div>
                          )}
                        </td>

                        {/* Property */}
                        <td className="py-4 px-4">
                          <div className="font-semibold text-stone-800 line-clamp-1">
                            {lead.propertyTitle}
                          </div>
                          <div className="text-xs text-stone-500 flex items-center gap-2 mt-0.5">
                            <span className="font-mono bg-stone-100 px-1.5 py-0.5 rounded text-[10px] text-stone-700">
                              {lead.propertyCode}
                            </span>
                            <span className="font-semibold text-[#b87b1c]">
                              R$ {lead.propertyPrice?.toLocaleString('pt-BR')}
                            </span>
                          </div>
                        </td>

                        {/* Score & Summary */}
                        <td className="py-4 px-4 max-w-xs">
                          <div className="flex items-center gap-2 mb-1">
                            {getScoreBadge(lead.qualification?.score)}
                          </div>
                          <p className="text-xs text-stone-600 line-clamp-2 leading-tight">
                            {lead.qualification?.summaryForBroker || lead.qualification?.scoreReason}
                          </p>
                        </td>

                        {/* Urgency & Payment */}
                        <td className="py-4 px-4 text-xs text-stone-600">
                          <div>
                            <strong className="text-stone-800">Urgência:</strong> {lead.qualification?.urgency || 'Imediata'}
                          </div>
                          <div>
                            <strong className="text-stone-800">Pagamento:</strong> {lead.qualification?.paymentMethod || 'A confirmar'}
                          </div>
                        </td>

                        {/* Status selector */}
                        <td className="py-4 px-4">
                          <select
                            value={lead.status}
                            onChange={(e) => onUpdateLeadStatus(lead.id, e.target.value as any)}
                            className={`text-xs font-semibold px-2.5 py-1 rounded-lg border focus:ring-2 focus:ring-amber-500 cursor-pointer ${getStatusColor(lead.status)}`}
                          >
                            <option value="Novo">Novo</option>
                            <option value="Em Atendimento">Em Atendimento</option>
                            <option value="Visita Agendada">Visita Agendada</option>
                            <option value="Proposta Feita">Proposta Feita</option>
                            <option value="Fechado">Fechado</option>
                            <option value="Descartado">Descartado</option>
                          </select>
                        </td>

                        {/* Action buttons */}
                        <td className="py-4 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setSelectedLeadForDetails(lead)}
                              className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors"
                              title="Ver histórico do chat com a IA"
                            >
                              <Eye className="w-4 h-4" />
                            </button>

                            <a
                              href={`https://wa.me/${lead.phone.replace(/\D/g, '')}?text=${encodeURIComponent(`Olá ${lead.name}, sou o corretor responsável pelo imóvel ${lead.propertyCode} (${lead.propertyTitle}) na peixeweb. Vi que você interagiu com nosso assistente virtual. Como podemos agendar sua visita?`)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white transition-colors"
                              title="Abrir conversa no WhatsApp com o cliente"
                            >
                              <MessageCircle className="w-4 h-4" />
                            </a>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {filteredLeads.length === 0 && (
                <div className="text-center py-12 text-stone-500 text-sm">
                  Nenhum lead encontrado com os filtros atuais.
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: PROPRIEDADES CADASTRADAS */}
        {activeTab === 'properties' && (
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <p className="text-xs sm:text-sm text-stone-600">
                Cada imóvel cadastrado possui uma <strong>Landing Page exclusiva</strong> gerada com IA e atendente virtual integrado para capturar compradores.
              </p>

              <button
                onClick={onOpenRegisterModal}
                className="bg-[#b87b1c] hover:bg-[#a36b17] text-white font-bold text-xs px-4 py-2 rounded-lg flex items-center gap-1.5 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Cadastrar Outro Imóvel</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((prop) => (
                <div
                  key={prop.id}
                  className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="relative h-40 bg-stone-100">
                    <img
                      src={prop.images[0]}
                      alt={prop.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2 left-2 bg-[#b87b1c] text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded">
                      {prop.operation}
                    </div>
                    <div className="absolute top-2 right-2 bg-stone-900/80 text-white text-[10px] font-mono px-2 py-0.5 rounded">
                      {prop.code}
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-lg font-bold text-stone-900 font-serif">
                        R$ {prop.price.toLocaleString('pt-BR')}
                      </div>
                      <h3 className="text-xs font-semibold text-stone-800 line-clamp-2 mt-1">
                        {prop.title}
                      </h3>
                      <p className="text-[11px] text-stone-500 mt-1">
                        {prop.address.neighborhood} • {prop.area}m² • {prop.bedrooms} quartos
                      </p>
                    </div>

                    <div className="pt-3 mt-3 border-t border-stone-100 flex items-center justify-between">
                      <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-medium">
                        Landing Page Ativa
                      </span>

                      <button
                        onClick={() => onSelectProperty(prop)}
                        className="text-xs font-semibold text-[#b87b1c] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span>Abrir Landing Page</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* LEAD TRANSCRIPT MODAL */}
      {selectedLeadForDetails && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden shadow-2xl border border-stone-200 animate-fade-in">
            <div className="bg-stone-900 text-white p-4 flex items-center justify-between">
              <div>
                <h3 className="font-serif font-bold text-base">
                  Dossiê do Lead Qualificado: {selectedLeadForDetails.name}
                </h3>
                <p className="text-xs text-stone-300">
                  {selectedLeadForDetails.propertyCode} - {selectedLeadForDetails.propertyTitle}
                </p>
              </div>
              <button
                onClick={() => setSelectedLeadForDetails(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4">
              {/* Qualification summary box */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-900 uppercase">Classificação IA:</span>
                  {getScoreBadge(selectedLeadForDetails.qualification?.score)}
                </div>
                <p className="text-xs text-stone-700">
                  <strong>Resumo para o Corretor:</strong> {selectedLeadForDetails.qualification?.summaryForBroker}
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs text-stone-600 pt-2 border-t border-amber-200/60">
                  <div><strong>Urgência:</strong> {selectedLeadForDetails.qualification?.urgency}</div>
                  <div><strong>Pagamento:</strong> {selectedLeadForDetails.qualification?.paymentMethod}</div>
                  <div><strong>Telefone:</strong> {selectedLeadForDetails.phone}</div>
                  <div><strong>Email:</strong> {selectedLeadForDetails.email || 'Não informado'}</div>
                </div>
              </div>

              {/* Chat history */}
              <div>
                <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider mb-2">
                  Transcrição da Conversa com o Atendente IA:
                </h4>
                <div className="space-y-2 bg-stone-50 p-4 rounded-xl border border-stone-200 max-h-60 overflow-y-auto">
                  {selectedLeadForDetails.conversationHistory?.map((msg, i) => (
                    <div
                      key={i}
                      className={`text-xs p-2.5 rounded-lg ${
                        msg.sender === 'user'
                          ? 'bg-[#b87b1c] text-white ml-6'
                          : 'bg-white text-stone-800 border border-stone-200 mr-6'
                      }`}
                    >
                      <span className="font-bold block text-[10px] opacity-80">
                        {msg.sender === 'user' ? 'Cliente' : 'Assistente IA peixeweb'}:
                      </span>
                      <p className="whitespace-pre-line mt-0.5">{msg.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 bg-stone-50 border-t border-stone-200 flex justify-end gap-3">
              <button
                onClick={() => setSelectedLeadForDetails(null)}
                className="bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-semibold px-4 py-2 rounded-lg"
              >
                Fechar
              </button>
              <a
                href={`https://wa.me/${selectedLeadForDetails.phone.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-lg flex items-center gap-1.5"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Conversar no WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
