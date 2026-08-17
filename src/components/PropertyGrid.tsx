import React, { useState } from 'react';
import { Property, PropertyFilters } from '../types';
import { PropertyCard } from './PropertyCard';
import { Sparkles, SlidersHorizontal, X } from 'lucide-react';

interface PropertyGridProps {
  properties: Property[];
  filters: PropertyFilters;
  onClearFilters: () => void;
  onSelectProperty: (property: Property) => void;
  onOpenAIChat: (property: Property) => void;
  viewMode?: 'all' | 'sales' | 'rentals' | 'recent';
}

export const PropertyGrid: React.FC<PropertyGridProps> = ({
  properties,
  filters,
  onClearFilters,
  onSelectProperty,
  onOpenAIChat,
  viewMode = 'all',
}) => {
  const [salesLimit, setSalesLimit] = useState(6);
  const [rentalsLimit, setRentalsLimit] = useState(3);
  const [recentLimit, setRecentLimit] = useState(4);

  // Apply filters
  const filteredProperties = properties.filter((p) => {
    if (filters.operation && filters.operation !== 'Todos' && p.operation !== filters.operation) {
      return false;
    }
    if (filters.type && filters.type !== 'Todos' && p.type !== filters.type) {
      return false;
    }
    if (filters.neighborhood) {
      const q = filters.neighborhood.toLowerCase();
      const matchNeigh = p.address.neighborhood.toLowerCase().includes(q);
      const matchCity = p.address.city.toLowerCase().includes(q);
      const matchStreet = p.address.street.toLowerCase().includes(q);
      const matchTitle = p.title.toLowerCase().includes(q);
      if (!matchNeigh && !matchCity && !matchStreet && !matchTitle) return false;
    }
    if (filters.codeQuery) {
      const q = filters.codeQuery.toLowerCase();
      const matchCode = p.code.toLowerCase().includes(q);
      if (!matchCode) return false;
    }
    return true;
  });

  const isFiltering = Boolean(
    (filters.operation && filters.operation !== 'Todos') ||
    (filters.type && filters.type !== 'Todos') ||
    filters.neighborhood ||
    filters.codeQuery
  );

  const salesProperties = filteredProperties.filter((p) => p.operation === 'Venda');
  const rentalsProperties = filteredProperties.filter((p) => p.operation === 'Aluguel');
  const recentProperties = filteredProperties.filter((p) => p.isRecent || p.id === 'prop-10' || p.id === 'prop-11' || p.id === 'prop-12');

  return (
    <div id="property-sections-container" className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-16">
      {/* Active Filter Bar (if searching) */}
      {isFiltering && (
        <div id="active-search-indicator" className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-stone-800 text-sm">
            <SlidersHorizontal className="w-4 h-4 text-amber-700" />
            <span className="font-semibold">Resultados do filtro:</span>
            <span className="text-stone-600">
              {filteredProperties.length} {filteredProperties.length === 1 ? 'imóvel encontrado' : 'imóveis encontrados'}
            </span>
            {filters.neighborhood && (
              <span className="bg-amber-200/70 text-amber-900 text-xs px-2 py-0.5 rounded font-medium">
                Local: {filters.neighborhood}
              </span>
            )}
            {filters.type && filters.type !== 'Todos' && (
              <span className="bg-amber-200/70 text-amber-900 text-xs px-2 py-0.5 rounded font-medium">
                Tipo: {filters.type}
              </span>
            )}
            {filters.codeQuery && (
              <span className="bg-amber-200/70 text-amber-900 text-xs px-2 py-0.5 rounded font-mono font-medium">
                Código: {filters.codeQuery}
              </span>
            )}
          </div>

          <button
            onClick={onClearFilters}
            className="flex items-center gap-1 text-xs text-stone-600 hover:text-stone-900 bg-white border border-stone-300 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
            <span>Limpar Filtros</span>
          </button>
        </div>
      )}

      {/* If Searching, show direct filtered list */}
      {isFiltering ? (
        <section id="search-results-section" className="space-y-6">
          <div className="text-center space-y-1">
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-stone-900">
              Imóveis Encontrados
            </h2>
            <div className="w-12 h-0.5 bg-[#b87b1c] mx-auto my-2"></div>
            <p className="text-xs sm:text-sm text-stone-500">
              Explore as opções correspondentes à sua pesquisa
            </p>
          </div>

          {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  onSelectProperty={onSelectProperty}
                  onOpenAIChat={onOpenAIChat}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-stone-50 rounded-2xl border border-stone-200">
              <p className="text-stone-600 font-medium mb-3">Nenhum imóvel encontrado para estes critérios.</p>
              <button
                onClick={onClearFilters}
                className="bg-[#b87b1c] hover:bg-[#a36b17] text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
              >
                Ver todos os imóveis disponíveis
              </button>
            </div>
          )}
        </section>
      ) : (
        <>
          {/* SECTION 1: IMÓVEIS À VENDA */}
          {(viewMode === 'all' || viewMode === 'sales') && (
            <section id="section-sales" className="space-y-6">
              <div className="text-center space-y-1">
                <h2 className="text-2xl sm:text-3xl font-serif font-black text-stone-900">
                  Imóveis à venda
                </h2>
                <div className="w-12 h-0.5 bg-[#b87b1c] mx-auto my-2"></div>
                <p className="text-xs sm:text-sm text-stone-500 font-light">
                  Os melhores imóveis à venda você encontra aqui
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {salesProperties.slice(0, salesLimit).map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    onSelectProperty={onSelectProperty}
                    onOpenAIChat={onOpenAIChat}
                  />
                ))}
              </div>

              {salesProperties.length > salesLimit && (
                <div className="text-center pt-4">
                  <button
                    id="btn-see-more-sales"
                    onClick={() => setSalesLimit((prev) => prev + 6)}
                    className="bg-[#b87b1c] hover:bg-[#a36b17] active:bg-[#925f12] text-white font-bold text-xs sm:text-sm px-8 py-2.5 rounded-lg shadow-sm hover:shadow transition-all cursor-pointer"
                  >
                    Ver todos
                  </button>
                </div>
              )}
            </section>
          )}

          {/* SECTION 2: IMÓVEIS PARA ALUGAR */}
          {(viewMode === 'all' || viewMode === 'rentals') && (
            <section id="section-rentals" className="space-y-6 pt-6 border-t border-stone-200">
              <div className="text-center space-y-1">
                <h2 className="text-2xl sm:text-3xl font-serif font-black text-stone-900">
                  Imóveis para alugar
                </h2>
                <div className="w-12 h-0.5 bg-[#b87b1c] mx-auto my-2"></div>
                <p className="text-xs sm:text-sm text-stone-500 font-light">
                  Veja alguns de nossos imóveis para alugar.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {rentalsProperties.slice(0, rentalsLimit).map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    onSelectProperty={onSelectProperty}
                    onOpenAIChat={onOpenAIChat}
                  />
                ))}
              </div>

              {rentalsProperties.length > rentalsLimit && (
                <div className="text-center pt-4">
                  <button
                    id="btn-see-more-rentals"
                    onClick={() => setRentalsLimit((prev) => prev + 6)}
                    className="bg-[#b87b1c] hover:bg-[#a36b17] active:bg-[#925f12] text-white font-bold text-xs sm:text-sm px-8 py-2.5 rounded-lg shadow-sm hover:shadow transition-all cursor-pointer"
                  >
                    Ver todos
                  </button>
                </div>
              )}
            </section>
          )}

          {/* SECTION 3: IMÓVEIS RECENTES */}
          {(viewMode === 'all' || viewMode === 'recent') && (
            <section id="section-recent" className="space-y-6 pt-6 border-t border-stone-200">
              <div className="text-center space-y-1">
                <h2 className="text-2xl sm:text-3xl font-serif font-black text-stone-900">
                  Imóveis Recentes
                </h2>
                <div className="w-12 h-0.5 bg-[#b87b1c] mx-auto my-2"></div>
                <p className="text-xs sm:text-sm text-stone-500 font-light">
                  Veja os novos imóveis que entraram em nosso estoque este mês
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {recentProperties.slice(0, recentLimit).map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    onSelectProperty={onSelectProperty}
                    onOpenAIChat={onOpenAIChat}
                  />
                ))}
              </div>

              {recentProperties.length > recentLimit && (
                <div className="text-center pt-4">
                  <button
                    id="btn-see-more-recent"
                    onClick={() => setRecentLimit((prev) => prev + 4)}
                    className="bg-[#b87b1c] hover:bg-[#a36b17] active:bg-[#925f12] text-white font-bold text-xs sm:text-sm px-8 py-2.5 rounded-lg shadow-sm hover:shadow transition-all cursor-pointer"
                  >
                    Ver todos
                  </button>
                </div>
              )}
            </section>
          )}
        </>
      )}
    </div>
  );
};
