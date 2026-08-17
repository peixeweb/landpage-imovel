export type PropertyType = 
  | 'Apartamento' 
  | 'Casa' 
  | 'Cobertura' 
  | 'Kitnet/Studio' 
  | 'Sala Comercial' 
  | 'Ponto Comercial/Loja' 
  | 'Terreno';

export type OperationType = 'Venda' | 'Aluguel';

export type PropertyStatus = 'Disponível' | 'Vendido' | 'Alugado' | 'Reservado';

export interface Broker {
  id: string;
  name: string;
  role: string;
  type: 'Autônomo' | 'Imobiliária';
  agencyName?: string;
  creci: string;
  phone: string;
  whatsapp: string;
  email: string;
  avatar: string;
}

export interface Property {
  id: string;
  code: string; // e.g. "IF-101"
  title: string;
  description: string;
  operation: OperationType;
  type: PropertyType;
  price: number;
  condoFee?: number;
  iptu?: number;
  area: number; // m²
  bedrooms: number;
  bathrooms: number;
  suites?: number;
  garageSpots: number;
  address: {
    street: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode?: string;
  };
  images: string[];
  features: string[];
  status: PropertyStatus;
  isFeatured?: boolean;
  isRecent?: boolean;
  createdAt: string;
  brokerId: string;
  aiHighlights?: string[];
  targetAudience?: string;
  viewsCount?: number;
  leadsCount?: number;
  slug?: string;
}

export type LeadScore = 'Quente' | 'Morno' | 'Frio';

export interface LeadQualification {
  score: LeadScore;
  scoreReason: string;
  urgency: 'Imediata (até 30 dias)' | 'Curto Prazo (1 a 3 meses)' | 'Médio/Longo Prazo (3 a 6 meses+)' | 'Não informado';
  paymentMethod: 'À vista' | 'Financiamento Bancário' | 'FGTS + Entrada' | 'Permuta / Outro' | 'Não informado';
  budgetEstimated?: string;
  hasPreApprovedCredit?: boolean;
  preferredContactTime?: string;
  summaryForBroker: string;
  nextStepsSuggested: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  leadDataExtracted?: Partial<{
    name: string;
    phone: string;
    email: string;
    timeline: string;
    payment: string;
    budget: string;
  }>;
}

export interface Lead {
  id: string;
  propertyId: string;
  propertyTitle: string;
  propertyCode: string;
  propertyPrice: number;
  brokerId: string;
  name: string;
  phone: string;
  email?: string;
  createdAt: string;
  qualification: LeadQualification;
  conversationHistory: ChatMessage[];
  status: 'Novo' | 'Em Atendimento' | 'Visita Agendada' | 'Proposta Feita' | 'Fechado' | 'Descartado';
  notes?: string;
}

export interface PropertyFilters {
  operation?: OperationType | 'Todos';
  type?: PropertyType | 'Todos';
  neighborhood?: string;
  minPrice?: number;
  maxPrice?: number;
  minBedrooms?: number;
  codeQuery?: string;
}
