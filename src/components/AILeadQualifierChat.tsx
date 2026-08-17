import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Send, Bot, User, Phone, CheckCircle2, Flame, AlertCircle, MessageCircle, ArrowRight, ShieldCheck, X } from 'lucide-react';
import { Property, Broker, ChatMessage, Lead, LeadQualification, LeadScore } from '../types';
import logoImg from '../assets/images/imobiflow_logo_1786990157759.jpg';

interface AILeadQualifierChatProps {
  property: Property;
  broker?: Broker;
  onSaveLead: (lead: Lead) => void;
  isFloating?: boolean;
  onCloseFloating?: () => void;
}

export const AILeadQualifierChat: React.FC<AILeadQualifierChatProps> = ({
  property,
  broker,
  onSaveLead,
  isFloating = false,
  onCloseFloating,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentQualification, setCurrentQualification] = useState<LeadQualification | null>(null);
  const [leadContact, setLeadContact] = useState<{ name?: string; phone?: string; email?: string }>({});
  const [leadSaved, setLeadSaved] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize conversation
  useEffect(() => {
    const welcomeText = `Olá! Sou a Corretora Virtual com IA do Imobiflow para o imóvel ${property.code} (${property.title}). 
Como posso te ajudar hoje? Posso tirar dúvidas sobre condomínio, vaga de garagem, regras de financiamento bancário ou agendar uma visita presencial!`;

    setMessages([
      {
        id: 'msg-init',
        sender: 'ai',
        text: welcomeText,
        timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  }, [property.id]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const quickQuestions = [
    'Qual o valor do condomínio e IPTU?',
    'Aceita financiamento bancário ou FGTS?',
    'Gostaria de agendar uma visita presencial!',
    'Como é a localização e vizinhança?',
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputMessage.trim();
    if (!query || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInputMessage('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai/qualify-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          property,
          conversationHistory: newHistory,
          userMessage: query,
        }),
      });

      if (!res.ok) {
        throw new Error('Falha na resposta do assistente');
      }

      const data = await res.json();

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: data.replyText || 'Perfeito! Anotei todas as suas preferências.',
        timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        leadDataExtracted: data.extractedLead,
      };

      setMessages((prev) => [...prev, aiMsg]);

      // Update extracted contact data
      if (data.extractedLead) {
        setLeadContact((prev) => ({
          name: data.extractedLead.name || prev.name,
          phone: data.extractedLead.phone || prev.phone,
          email: data.extractedLead.email || prev.email,
        }));
      }

      // Update qualification score
      if (data.qualification) {
        setCurrentQualification(data.qualification);

        // Auto-save or update lead in CRM
        const leadName = data.extractedLead?.name || leadContact.name || 'Cliente Interessado';
        const leadPhone = data.extractedLead?.phone || leadContact.phone || '(Aguardando contato)';

        const newLead: Lead = {
          id: `lead-${property.id}-${Date.now()}`,
          propertyId: property.id,
          propertyTitle: property.title,
          propertyCode: property.code,
          propertyPrice: property.price,
          brokerId: property.brokerId,
          name: leadName,
          phone: leadPhone,
          email: data.extractedLead?.email || leadContact.email,
          createdAt: new Date().toISOString(),
          qualification: data.qualification,
          conversationHistory: [...newHistory, aiMsg],
          status: data.qualification.score === 'Quente' ? 'Visita Agendada' : 'Novo',
        };

        onSaveLead(newLead);
        setLeadSaved(true);
      }
    } catch (err) {
      console.error(err);
      const fallbackMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: 'Obrigada pelo interesse! Este imóvel no ' + property.address.neighborhood + ' está disponível para visitação imediata. Por favor, deixe seu nome e WhatsApp para nosso corretor entrar em contato.',
        timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const getScoreBadge = (score?: LeadScore) => {
    switch (score) {
      case 'Quente':
        return (
          <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-full border border-emerald-300">
            <Flame className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
            <span>Lead Qualificado: QUENTE</span>
          </span>
        );
      case 'Morno':
        return (
          <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 text-xs font-bold px-2.5 py-1 rounded-full border border-amber-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Lead em Qualificação: MORNO</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 bg-stone-100 text-stone-700 text-xs font-medium px-2 py-0.5 rounded-full">
            <span>Analisando Perfil</span>
          </span>
        );
    }
  };

  // Generate prefilled WhatsApp message for broker
  const generateBrokerWhatsAppUrl = () => {
    const brokerPhone = broker?.whatsapp || '5511914716715';
    const clientName = leadContact.name || 'Cliente';
    const clientPhone = leadContact.phone || 'Informado no chat';
    const urgency = currentQualification?.urgency || 'A confirmar';
    const payment = currentQualification?.paymentMethod || 'A confirmar';
    const summary = currentQualification?.summaryForBroker || 'Cliente interessado no anúncio.';

    const message = `*NOVO LEAD QUALIFICADO VIA IA - PEIXEWEB*
🏢 *Imóvel:* ${property.code} - ${property.title}
💰 *Valor:* R$ ${property.price.toLocaleString('pt-BR')}
👤 *Cliente:* ${clientName}
📱 *Telefone/Zap:* ${clientPhone}
⏱️ *Urgência:* ${urgency}
💳 *Pagamento:* ${payment}
🎯 *Status IA:* ${currentQualification?.score || 'Qualificado'}
📋 *Resumo:* ${summary}

Acesse o painel do corretor Imobiflow para ver a transcrição completa.`;

    return `https://wa.me/${brokerPhone}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div 
      id="ai-lead-qualifier-container"
      className={`bg-white border border-stone-200 rounded-2xl shadow-xl flex flex-col overflow-hidden ${
        isFloating ? 'max-w-md w-full h-[600px]' : 'w-full h-[650px]'
      }`}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-stone-900 via-stone-800 to-[#b87b1c] text-white p-4 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-stone-950 border border-amber-400/40 p-0.5 overflow-hidden flex items-center justify-center shrink-0">
            <img src={logoImg} alt="Imobiflow" referrerPolicy="no-referrer" className="w-full h-full object-cover rounded-[8px]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm sm:text-base font-serif">
                Corretora Virtual IA
              </h3>
              <span className="bg-emerald-500 text-white text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                Online
              </span>
            </div>
            <p className="text-[11px] text-stone-300 truncate max-w-xs">
              Especialista em {property.code} • Atendimento 24h
            </p>
          </div>
        </div>

        {isFloating && onCloseFloating && (
          <button
            onClick={onCloseFloating}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Property Context Strip */}
      <div className="bg-stone-50 border-b border-stone-200 px-4 py-2 flex items-center justify-between text-xs text-stone-600">
        <div className="truncate">
          <strong className="text-stone-900 mr-1">{property.code}:</strong>
          <span className="truncate">{property.title}</span>
        </div>
        <span className="font-bold text-stone-900 shrink-0 ml-2">
          R$ {property.price.toLocaleString('pt-BR')}
        </span>
      </div>

      {/* Lead Score Indicator (if qualified) */}
      {currentQualification && (
        <div className="bg-amber-50/90 border-b border-amber-200 px-4 py-2 flex items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            {getScoreBadge(currentQualification.score)}
            <span className="text-stone-700 text-[11px] font-medium truncate hidden sm:inline">
              {currentQualification.scoreReason}
            </span>
          </div>

          <a
            href={generateBrokerWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-semibold px-2.5 py-1 rounded-md flex items-center gap-1 shrink-0 transition-colors shadow-xs"
            title="Enviar ficha do lead direto no WhatsApp do Corretor"
          >
            <MessageCircle className="w-3 h-3" />
            <span>Zap Corretor</span>
          </a>
        </div>
      )}

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#faf9f6]">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-2.5 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs ${
                msg.sender === 'user'
                  ? 'bg-[#b87b1c] text-white'
                  : 'bg-stone-900 text-amber-300'
              }`}
            >
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div
              className={`max-w-[82%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed shadow-xs ${
                msg.sender === 'user'
                  ? 'bg-[#b87b1c] text-white rounded-tr-none'
                  : 'bg-white text-stone-800 border border-stone-200 rounded-tl-none'
              }`}
            >
              <p className="whitespace-pre-line">{msg.text}</p>
              <span
                className={`text-[10px] block mt-1 ${
                  msg.sender === 'user' ? 'text-amber-100 text-right' : 'text-stone-400 text-left'
                }`}
              >
                {msg.timestamp}
              </span>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-stone-900 text-amber-300 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-white border border-stone-200 rounded-2xl rounded-tl-none px-4 py-3 shadow-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#b87b1c] animate-bounce"></span>
                <span className="w-2 h-2 rounded-full bg-[#b87b1c] animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-2 h-2 rounded-full bg-[#b87b1c] animate-bounce [animation-delay:0.4s]"></span>
                <span className="text-xs text-stone-500 ml-2 font-medium">Analisando e consultando imóvel...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Questions */}
      <div className="p-2.5 bg-white border-t border-stone-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        <span className="text-[11px] text-stone-400 font-semibold uppercase tracking-wider shrink-0 mr-1">
          Sugestões:
        </span>
        {quickQuestions.map((q, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleSendMessage(q)}
            disabled={isLoading}
            className="bg-stone-50 hover:bg-amber-50 hover:border-amber-300 border border-stone-200 text-stone-700 text-[11px] px-2.5 py-1 rounded-full whitespace-nowrap transition-colors cursor-pointer disabled:opacity-50"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input Message Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="p-3 bg-white border-t border-stone-200 flex items-center gap-2"
      >
        <input
          type="text"
          placeholder="Tire dúvidas, fale sobre seu prazo ou deixe seu WhatsApp..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          disabled={isLoading}
          className="flex-1 bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all"
        />

        <button
          type="submit"
          disabled={!inputMessage.trim() || isLoading}
          className="bg-[#b87b1c] hover:bg-[#a36b17] active:bg-[#925f12] text-white p-2.5 rounded-xl transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center"
          title="Enviar mensagem"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
