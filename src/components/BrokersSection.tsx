import React from 'react';
import { Phone, MessageCircle, Mail } from 'lucide-react';
import { Broker } from '../types';

interface BrokersSectionProps {
  brokers: Broker[];
  onContactBroker?: (broker: Broker) => void;
}

export const BrokersSection: React.FC<BrokersSectionProps> = ({ brokers }) => {
  return (
    <section id="brokers-team-section" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center space-y-1 mb-12">
          <div className="inline-flex items-center gap-1.5 bg-amber-100 text-[#b87b1c] text-xs font-bold uppercase tracking-wider px-3 py-0.5 rounded-full mb-2">
            <span>Rede Imobiflow</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-black text-stone-900">
            Corretores & Imobiliárias Cadastradas
          </h2>
          <div className="w-12 h-0.5 bg-[#b87b1c] mx-auto my-2"></div>
          <p className="text-xs sm:text-sm text-stone-500 font-light max-w-xl mx-auto">
            Profissionais autônomos e imobiliárias que utilizam o Imobiflow para publicar Landing Pages com IA e qualificar leads em tempo recorde.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {brokers.map((broker) => (
            <div
              key={broker.id}
              id={`broker-card-${broker.id}`}
              className="bg-white rounded-xl border border-stone-200 p-6 flex flex-col items-center text-center shadow-xs hover:shadow-lg transition-all hover:-translate-y-1 group"
            >
              {/* Circular Avatar */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden mb-4 border-2 border-stone-200 group-hover:border-[#b87b1c] transition-colors shadow-inner">
                <img
                  src={broker.avatar}
                  alt={broker.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Broker Info */}
              <h3 className="font-bold text-stone-900 text-base sm:text-lg font-serif mb-1">
                {broker.name}
              </h3>

              <p className="text-xs text-stone-500 font-medium mb-1">
                {broker.role}
              </p>

              <p className="text-[11px] text-stone-400 font-mono mb-6">
                CRECI: {broker.creci}
              </p>

              {/* Action Contact Icons */}
              <div className="flex items-center gap-3 pt-3 border-t border-stone-100 w-full justify-center">
                <a
                  href={`tel:${broker.phone.replace(/\D/g, '')}`}
                  className="w-9 h-9 rounded-full bg-stone-50 hover:bg-amber-100 text-stone-600 hover:text-amber-800 flex items-center justify-center transition-colors border border-stone-200"
                  title={`Ligar para ${broker.name}`}
                >
                  <Phone className="w-4 h-4" />
                </a>

                <a
                  href={`https://wa.me/${broker.whatsapp}?text=${encodeURIComponent(`Olá ${broker.name}, gostaria de informações sobre imóveis através da plataforma Imobiflow.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-600 hover:text-emerald-800 flex items-center justify-center transition-colors border border-emerald-200"
                  title={`WhatsApp de ${broker.name}`}
                >
                  <MessageCircle className="w-4 h-4" />
                </a>

                <a
                  href={`mailto:${broker.email}`}
                  className="w-9 h-9 rounded-full bg-stone-50 hover:bg-stone-100 text-stone-600 hover:text-stone-900 flex items-center justify-center transition-colors border border-stone-200"
                  title={`E-mail para ${broker.name}`}
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
