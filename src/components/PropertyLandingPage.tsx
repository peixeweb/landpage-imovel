import React, { useState } from 'react';
import { 
  MapPin, Bed, Bath, Car, Maximize2, Sparkles, Share2, Heart, ArrowLeft, 
  CheckCircle, Calculator, Phone, MessageCircle, Mail, ShieldCheck, 
  Calendar, Building, Home, Check, Copy, ExternalLink, ChevronLeft, ChevronRight
} from 'lucide-react';
import { Property, Broker, Lead } from '../types';
import { AILeadQualifierChat } from './AILeadQualifierChat';

interface PropertyLandingPageProps {
  property: Property;
  broker?: Broker;
  onBack: () => void;
  onSaveLead: (lead: Lead) => void;
  onOpenSimulator: () => void;
}

export const PropertyLandingPage: React.FC<PropertyLandingPageProps> = ({
  property,
  broker,
  onBack,
  onSaveLead,
  onOpenSimulator,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  // Quick mortgage calculation states
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [loanTermYears, setLoanTermYears] = useState(30);

  const price = property.price;
  const downPaymentValue = (price * downPaymentPercent) / 100;
  const financedValue = Math.max(0, price - downPaymentValue);
  const totalMonths = loanTermYears * 12;
  const monthlyInterest = 0.0082; // ~10.3% a.a.
  const estimatedMonthlyInstallment = financedValue > 0
    ? Math.round(financedValue * (monthlyInterest / (1 - Math.pow(1 + monthlyInterest, -totalMonths))))
    : 0;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const formatBRL = (val: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const images = property.images.length > 0
    ? property.images
    : ['https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80'];

  return (
    <div id={`property-landing-${property.code}`} className="min-h-screen bg-[#faf9f6] pb-20">
      {/* Top Breadcrumb & Actions Bar */}
      <div className="bg-white border-b border-stone-200 sticky top-16 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex flex-wrap items-center justify-between gap-3">
          <button
            id="btn-back-to-portal"
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-stone-600 hover:text-amber-800 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar ao Portal</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="bg-amber-100 text-amber-900 border border-amber-300 text-xs font-mono font-bold px-2.5 py-1 rounded">
              Código: {property.code}
            </span>

            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-medium px-3 py-1.5 rounded transition-colors"
              title="Copiar Link da Landing Page"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Copiado!' : 'Compartilhar'}</span>
            </button>

            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`p-1.5 rounded border transition-colors ${
                isLiked ? 'bg-rose-50 border-rose-200 text-rose-600' : 'bg-stone-100 border-stone-200 text-stone-600'
              }`}
              title="Salvar nos favoritos"
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-600' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 space-y-8">
        {/* Main Title & Price Header */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-[#b87b1c] text-white text-xs font-bold uppercase tracking-wider px-3 py-0.5 rounded">
                {property.operation === 'Aluguel' ? 'Para Alugar' : 'À Venda'}
              </span>
              <span className="bg-stone-100 text-stone-700 text-xs font-semibold px-2.5 py-0.5 rounded">
                {property.type}
              </span>
              {property.status === 'Vendido' && (
                <span className="bg-blue-800 text-white text-xs font-bold uppercase px-2.5 py-0.5 rounded">
                  Vendido
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-black text-stone-900 leading-tight">
              {property.title}
            </h1>

            <div className="flex items-center gap-1.5 text-stone-500 text-xs sm:text-sm">
              <MapPin className="w-4 h-4 text-amber-700 shrink-0" />
              <span>
                {property.address.street}, {property.address.neighborhood} - {property.address.city}/{property.address.state}
                {property.address.zipCode ? ` • CEP: ${property.address.zipCode}` : ''}
              </span>
            </div>
          </div>

          {/* Pricing Box */}
          <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 md:text-right shrink-0">
            <span className="text-xs uppercase tracking-wider text-stone-500 font-semibold block mb-1">
              Valor do Imóvel
            </span>
            <div className="text-2xl sm:text-3xl font-serif font-black text-stone-900">
              {formatBRL(property.price)}
              {property.operation === 'Aluguel' && <span className="text-sm font-sans font-normal text-stone-500">/mês</span>}
            </div>

            <div className="text-xs text-stone-500 mt-2 space-y-0.5">
              {property.condoFee !== undefined && property.condoFee > 0 && (
                <div>Condomínio: <strong className="text-stone-700">{formatBRL(property.condoFee)}</strong></div>
              )}
              {property.iptu !== undefined && property.iptu > 0 && (
                <div>IPTU Anual: <strong className="text-stone-700">{formatBRL(property.iptu)}</strong></div>
              )}
            </div>
          </div>
        </div>

        {/* Media Gallery Section */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-stone-200 shadow-sm space-y-4">
          {/* Main Large Image with Carousel Controls */}
          <div className="relative h-[340px] sm:h-[460px] md:h-[540px] w-full rounded-xl overflow-hidden bg-stone-900 flex items-center justify-center">
            <img
              src={images[activeImageIndex]}
              alt={`Foto ${activeImageIndex + 1} de ${property.title}`}
              className="w-full h-full object-cover transition-all duration-300"
              referrerPolicy="no-referrer"
            />

            {images.length > 1 && (
              <>
                <button
                  onClick={() => setActiveImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors cursor-pointer"
                  title="Foto anterior"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  onClick={() => setActiveImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors cursor-pointer"
                  title="Próxima foto"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            <div className="absolute bottom-4 right-4 bg-stone-900/80 backdrop-blur-xs text-white text-xs px-3 py-1 rounded-full font-mono">
              {activeImageIndex + 1} / {images.length}
            </div>
          </div>

          {/* Thumbnail Strip */}
          {images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {images.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-24 h-16 sm:w-32 sm:h-20 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                    activeImageIndex === idx ? 'border-[#b87b1c] scale-102 ring-2 ring-amber-300' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={imgUrl} alt="Thumbnail" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Key Specs Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
          <div className="bg-white rounded-xl p-4 border border-stone-200 text-center shadow-2xs">
            <Maximize2 className="w-5 h-5 text-[#b87b1c] mx-auto mb-1" />
            <span className="text-xs text-stone-500 font-medium block">Área Útil</span>
            <span className="text-base sm:text-lg font-bold text-stone-900">{property.area} m²</span>
          </div>

          <div className="bg-white rounded-xl p-4 border border-stone-200 text-center shadow-2xs">
            <Bed className="w-5 h-5 text-[#b87b1c] mx-auto mb-1" />
            <span className="text-xs text-stone-500 font-medium block">Quartos</span>
            <span className="text-base sm:text-lg font-bold text-stone-900">
              {property.bedrooms} {property.suites ? `(${property.suites} suíte)` : ''}
            </span>
          </div>

          <div className="bg-white rounded-xl p-4 border border-stone-200 text-center shadow-2xs">
            <Bath className="w-5 h-5 text-[#b87b1c] mx-auto mb-1" />
            <span className="text-xs text-stone-500 font-medium block">Banheiros</span>
            <span className="text-base sm:text-lg font-bold text-stone-900">{property.bathrooms}</span>
          </div>

          <div className="bg-white rounded-xl p-4 border border-stone-200 text-center shadow-2xs">
            <Car className="w-5 h-5 text-[#b87b1c] mx-auto mb-1" />
            <span className="text-xs text-stone-500 font-medium block">Vagas de Garagem</span>
            <span className="text-base sm:text-lg font-bold text-stone-900">{property.garageSpots}</span>
          </div>

          <div className="bg-white rounded-xl p-4 border border-stone-200 text-center shadow-2xs">
            <Building className="w-5 h-5 text-[#b87b1c] mx-auto mb-1" />
            <span className="text-xs text-stone-500 font-medium block">Tipo</span>
            <span className="text-base sm:text-lg font-bold text-stone-900 truncate block">{property.type}</span>
          </div>

          <div className="bg-white rounded-xl p-4 border border-stone-200 text-center shadow-2xs">
            <ShieldCheck className="w-5 h-5 text-[#b87b1c] mx-auto mb-1" />
            <span className="text-xs text-stone-500 font-medium block">Status</span>
            <span className="text-base sm:text-lg font-bold text-stone-900">{property.status}</span>
          </div>
        </div>

        {/* 2-Column Content Layout: Left Details + Right AI Lead Chat & Broker */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Details (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* AI Highlights Card */}
            {property.aiHighlights && property.aiHighlights.length > 0 && (
              <div className="bg-gradient-to-br from-amber-50 to-orange-50/40 rounded-2xl p-6 border border-amber-200 shadow-2xs space-y-3">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-sm sm:text-base">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>Destaques da Inteligência Artificial peixeweb</span>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-stone-800">
                  {property.aiHighlights.map((hl, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
                {property.targetAudience && (
                  <p className="text-xs text-amber-900/80 font-medium pt-2 border-t border-amber-200/60">
                    <strong>Público ideal:</strong> {property.targetAudience}
                  </p>
                )}
              </div>
            )}

            {/* Description Card */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-4">
              <h2 className="text-xl sm:text-2xl font-serif font-black text-stone-900 border-b border-stone-100 pb-3">
                Sobre este imóvel
              </h2>
              <div className="text-xs sm:text-sm text-stone-700 leading-relaxed whitespace-pre-line space-y-3 font-light">
                {property.description}
              </div>
            </div>

            {/* Amenities & Features Grid */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-4">
              <h2 className="text-xl sm:text-2xl font-serif font-black text-stone-900 border-b border-stone-100 pb-3">
                Características & Diferenciais
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {property.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-stone-700 bg-stone-50 p-2.5 rounded-lg border border-stone-100">
                    <Check className="w-4 h-4 text-[#b87b1c] shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Integrated Financing Calculator Card */}
            {property.operation === 'Venda' && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-5">
                <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                  <div className="flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-[#b87b1c]" />
                    <h2 className="text-lg sm:text-xl font-serif font-bold text-stone-900">
                      Simulação de Financiamento
                    </h2>
                  </div>
                  <button
                    onClick={onOpenSimulator}
                    className="text-xs font-semibold text-[#b87b1c] hover:underline"
                  >
                    Análise Completa com IA
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Slider Entrada */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs text-stone-600">
                      <span>Entrada ({downPaymentPercent}%):</span>
                      <strong className="text-stone-900">{formatBRL(downPaymentValue)}</strong>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="80"
                      step="5"
                      value={downPaymentPercent}
                      onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                      className="w-full accent-[#b87b1c]"
                    />
                  </div>

                  {/* Slider Prazo */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs text-stone-600">
                      <span>Prazo de Pagamento:</span>
                      <strong className="text-stone-900">{loanTermYears} anos ({totalMonths} meses)</strong>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="35"
                      step="5"
                      value={loanTermYears}
                      onChange={(e) => setLoanTermYears(Number(e.target.value))}
                      className="w-full accent-[#b87b1c]"
                    />
                  </div>
                </div>

                {/* Calculation Result */}
                <div className="bg-stone-50 rounded-xl p-4 border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <span className="text-[11px] text-stone-500 uppercase tracking-wider block font-medium">
                      Parcela Mensal Estimada (Tabela PRICE/SAC)
                    </span>
                    <div className="text-xl sm:text-2xl font-serif font-black text-[#b87b1c]">
                      {formatBRL(estimatedMonthlyInstallment)}
                      <span className="text-xs font-sans text-stone-500 font-normal"> /mês</span>
                    </div>
                    <span className="text-[11px] text-stone-500">
                      Saldo financiado: {formatBRL(financedValue)}
                    </span>
                  </div>

                  <button
                    onClick={onOpenSimulator}
                    className="w-full sm:w-auto bg-stone-900 hover:bg-black text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors whitespace-nowrap"
                  >
                    Simular em Bancos (CEF / Itaú)
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: AI Lead Qualification Bot & Broker Info (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Broker Info Card */}
            {broker && (
              <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-stone-200 shrink-0">
                  <img
                    src={broker.avatar}
                    alt={broker.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] text-[#b87b1c] font-bold uppercase tracking-wider block">
                    Corretor Responsável
                  </span>
                  <h3 className="font-bold text-stone-900 text-sm sm:text-base font-serif truncate">
                    {broker.name}
                  </h3>
                  <p className="text-xs text-stone-500 truncate">CRECI: {broker.creci}</p>

                  <div className="flex items-center gap-3 mt-2">
                    <a
                      href={`https://wa.me/${broker.whatsapp}?text=${encodeURIComponent(`Olá ${broker.name}, gostaria de visitar o imóvel código ${property.code} (${property.title}).`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-3 py-1 rounded-md flex items-center gap-1 transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp Direto</span>
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* EMBEDDED AI LEAD QUALIFIER */}
            <div className="sticky top-32">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-bold text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#b87b1c]" />
                  <span>Assistente & Qualificador de Lead IA</span>
                </span>
                <span className="text-[11px] text-stone-500">Tire dúvidas em tempo real</span>
              </div>

              <AILeadQualifierChat
                property={property}
                broker={broker}
                onSaveLead={onSaveLead}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
