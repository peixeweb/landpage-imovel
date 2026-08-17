import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ImobiFlowLandingPage } from './components/ImobiFlowLandingPage';
import { Footer } from './components/Footer';
import { PropertyLandingPage } from './components/PropertyLandingPage';
import { BrokerRegisterModal } from './components/BrokerRegisterModal';
import { FinancingModal } from './components/FinancingModal';
import { AIValidationExplanationModal } from './components/AIValidationExplanationModal';
import { mockProperties, mockBrokers } from './data/mockData';
import { Property, Lead, Broker } from './types';
import { Sparkles, X } from 'lucide-react';

export default function App() {
  // Application Data States
  const [properties, setProperties] = useState<Property[]>(() => {
    const saved = localStorage.getItem('Imobiflow_properties');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return mockProperties;
  });

  const [brokers] = useState<Broker[]>(mockBrokers);

  // Active view: either main Landing Page or a preview of a specific Property Landing Page
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  // Modals & Floating Components
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isSimulatorModalOpen, setIsSimulatorModalOpen] = useState(false);
  const [isAIValidationModalOpen, setIsAIValidationModalOpen] = useState(false);

  // Toast notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Persist properties
  useEffect(() => {
    localStorage.setItem('Imobiflow_properties', JSON.stringify(properties));
  }, [properties]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 5000);
  };

  const handleSaveNewProperty = (newProp: Property) => {
    setProperties((prev) => [newProp, ...prev]);
    showToast(`Imóvel ${newProp.code} cadastrado com sucesso! Veja a Landing Page gerada.`);
    setSelectedProperty(newProp);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveLead = (newLead: Lead) => {
    if (newLead.qualification?.score === 'Quente') {
      showToast(`🔥 Lead Quente capturado pela IA: ${newLead.name} (${newLead.propertyCode})`);
    } else {
      showToast(`Lead ${newLead.name} registrado com sucesso.`);
    }
  };

  const getResponsibleBroker = (property?: Property | null) => {
    if (!property) return brokers[0];
    return brokers.find((b) => b.id === property.brokerId) || brokers[0];
  };

  const defaultSampleProperty = properties[0] || mockProperties[0];
  const defaultSampleBroker = getResponsibleBroker(defaultSampleProperty);

  return (
    <div id="Imobiflow-landing-app" className="min-h-screen bg-[#faf9f6] flex flex-col font-sans text-stone-850 selection:bg-amber-200 selection:text-amber-900">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-stone-900 text-white border border-amber-500/40 rounded-xl shadow-2xl p-4 flex items-center gap-3 animate-fade-in max-w-md">
          <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="text-xs sm:text-sm font-medium flex-1">{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="text-stone-400 hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Header */}
      <Header
        onOpenRegisterModal={() => setIsRegisterModalOpen(true)}
        onOpenDemoChat={() => setIsAIValidationModalOpen(true)}
      />

      {/* MAIN VIEW */}
      <main className="flex-1">
        {selectedProperty ? (
          /* EXAMPLE OR CREATED PROPERTY LANDING PAGE VIEW */
          <div className="relative">
            <div className="bg-stone-900 text-white px-4 py-2.5 text-xs flex items-center justify-between border-b border-stone-800">
              <div className="flex items-center gap-2">
                <span className="bg-amber-500/20 text-amber-300 font-mono font-bold px-2 py-0.5 rounded">
                  Pré-visualização da Landing Page do Imóvel ({selectedProperty.code})
                </span>
              </div>
              <button
                onClick={() => {
                  setSelectedProperty(null);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-colors"
              >
                ← Voltar para a Apresentação do Imobiflow
              </button>
            </div>

            <PropertyLandingPage
              property={selectedProperty}
              broker={getResponsibleBroker(selectedProperty)}
              onBack={() => {
                setSelectedProperty(null);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onSaveLead={handleSaveLead}
              onOpenSimulator={() => setIsSimulatorModalOpen(true)}
            />
          </div>
        ) : (
          /* PURE PRODUCT LANDING PAGE */
          <ImobiFlowLandingPage
            onOpenDemoChat={() => setIsAIValidationModalOpen(true)}
            sampleProperty={defaultSampleProperty}
            sampleBroker={defaultSampleBroker}
            onViewPropertyDemo={(prop) => {
              setSelectedProperty(prop);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </main>

      {/* Main Footer */}
      <Footer
        onOpenRegisterModal={() => setIsRegisterModalOpen(true)}
        onOpenDemoChat={() => setIsAIValidationModalOpen(true)}
      />

      {/* MODAL: BROKER PROPERTY REGISTRATION EXPLANATION */}
      <BrokerRegisterModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        brokers={brokers}
        onSaveProperty={handleSaveNewProperty}
      />

      {/* MODAL: MORTGAGE & FINANCING SIMULATOR */}
      <FinancingModal
        isOpen={isSimulatorModalOpen}
        onClose={() => setIsSimulatorModalOpen(false)}
        initialPropertyValue={selectedProperty?.price || 650000}
      />

      {/* MODAL: HOW AI VALIDATES CLIENT EXPLANATION (NO CHAT OPEN) */}
      <AIValidationExplanationModal
        isOpen={isAIValidationModalOpen}
        onClose={() => setIsAIValidationModalOpen(false)}
      />
    </div>
  );
}
