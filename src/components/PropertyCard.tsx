import React from 'react';
import { MapPin, Bed, Bath, Car, Maximize2, Sparkles, MessageSquare, ArrowUpRight } from 'lucide-react';
import { Property } from '../types';

interface PropertyCardProps {
  property: Property;
  onSelectProperty: (property: Property) => void;
  onOpenAIChat: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onSelectProperty,
  onOpenAIChat,
}) => {
  const isRent = property.operation === 'Aluguel';
  const isSold = property.status === 'Vendido';
  const isRented = property.status === 'Alugado';

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div 
      id={`property-card-${property.code}`}
      className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group"
    >
      {/* Image & Badges Container */}
      <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-stone-100">
        <img
          src={property.images[0] || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80'}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
          loading="lazy"
        />

        {/* Operation Ribbon (Top Left) */}
        <div className="absolute top-0 left-0">
          <div className={`text-white text-[11px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-br-lg shadow-sm ${
            isRent ? 'bg-amber-600' : 'bg-[#b87b1c]'
          }`}>
            {isRent ? 'Para Alugar' : 'À Venda'}
          </div>
        </div>

        {/* Status Ribbon (Top Right - Vendido / Alugado) */}
        {(isSold || isRented) && (
          <div className="absolute top-3 right-3">
            <span className="bg-blue-800/95 text-white text-xs font-serif font-black uppercase tracking-wider px-3 py-1 rounded shadow-md border border-blue-600">
              {isSold ? 'Vendido' : 'Alugado'}
            </span>
          </div>
        )}

        {/* AI Page Ready Badge */}
        <div className="absolute bottom-2.5 right-2.5">
          <span className="inline-flex items-center gap-1 bg-stone-950/80 backdrop-blur-xs text-amber-300 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-amber-500/30">
            <Sparkles className="w-2.5 h-2.5" />
            <span>Landing IA</span>
          </span>
        </div>

        {/* Code Badge */}
        <div className="absolute bottom-2.5 left-2.5">
          <span className="bg-stone-900/80 backdrop-blur-xs text-white text-[10px] font-mono font-medium px-2 py-0.5 rounded">
            {property.code}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Price Header */}
          <div className="mb-2">
            <div className="text-xl sm:text-2xl font-black text-stone-900 font-serif tracking-tight">
              {formatPrice(property.price)}
              {isRent && <span className="text-xs font-normal text-stone-500 font-sans">/mês</span>}
            </div>

            <div className="text-[11px] text-stone-500 font-medium">
              {property.condoFee !== undefined && property.condoFee > 0 ? (
                <span>Condomínio: {formatPrice(property.condoFee)}</span>
              ) : (
                <span>Condomínio: Isento / Não informado</span>
              )}
            </div>
          </div>

          {/* Title */}
          <h3 
            onClick={() => onSelectProperty(property)}
            className="text-stone-900 font-semibold text-sm sm:text-base leading-snug line-clamp-2 hover:text-[#b87b1c] cursor-pointer transition-colors mb-2"
          >
            {property.title}
          </h3>

          {/* Address with Pin */}
          <div className="flex items-center gap-1 text-stone-500 text-xs mb-3">
            <MapPin className="w-3.5 h-3.5 text-amber-700 shrink-0" />
            <span className="truncate">
              {property.address.street}, {property.address.neighborhood} - {property.address.city}/{property.address.state}
            </span>
          </div>

          {/* Specs Row (Beds, Baths, Spots, m²) */}
          <div className="grid grid-cols-4 gap-1 py-2.5 border-y border-stone-100 text-center text-stone-700 text-xs mb-3 bg-stone-50/60 rounded-md">
            {property.bedrooms > 0 ? (
              <div className="flex flex-col items-center">
                <span className="font-bold text-stone-900">{property.bedrooms}</span>
                <span className="text-[10px] text-stone-500">{property.bedrooms === 1 ? 'Quarto' : 'Quartos'}</span>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <span className="font-bold text-stone-900">--</span>
                <span className="text-[10px] text-stone-500">Quartos</span>
              </div>
            )}

            <div className="flex flex-col items-center border-l border-stone-200">
              <span className="font-bold text-stone-900">{property.bathrooms}</span>
              <span className="text-[10px] text-stone-500">{property.bathrooms === 1 ? 'Banheiro' : 'Banheiros'}</span>
            </div>

            <div className="flex flex-col items-center border-l border-stone-200">
              <span className="font-bold text-stone-900">{property.garageSpots}</span>
              <span className="text-[10px] text-stone-500">{property.garageSpots === 1 ? 'Vaga' : 'Vagas'}</span>
            </div>

            <div className="flex flex-col items-center border-l border-stone-200">
              <span className="font-bold text-stone-900">{property.area}</span>
              <span className="text-[10px] text-stone-500">m²</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex items-center justify-between gap-2 border-t border-stone-100">
          <button
            id={`btn-view-property-${property.code}`}
            onClick={() => onSelectProperty(property)}
            className="text-xs font-semibold text-[#b87b1c] hover:text-[#8e5c0e] hover:underline flex items-center gap-1 cursor-pointer transition-colors"
          >
            <span>Ver Landing Page</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          <button
            id={`btn-qualify-lead-${property.code}`}
            onClick={() => onOpenAIChat(property)}
            className="bg-stone-900 hover:bg-stone-800 active:bg-black text-white text-[11px] font-medium px-2.5 py-1.5 rounded-md flex items-center gap-1.5 transition-all shadow-xs"
            title="Conversar com o Assistente de IA deste imóvel"
          >
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>Chat IA</span>
          </button>
        </div>
      </div>
    </div>
  );
};
