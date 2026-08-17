import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("GEMINI_API_KEY is not defined in environment variables");
  }
  return new GoogleGenAI({
    apiKey: apiKey || "dummy-key",
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

// Healthcheck
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Endpoint: AI Copywriter for Property Registration
app.post("/api/ai/generate-property-copy", async (req, res) => {
  try {
    const { title, type, operation, price, neighborhood, city, area, bedrooms, suites, bathrooms, garageSpots, features, additionalNotes, brokerType, brokerName } = req.body;

    const prompt = `Você é o redator imobiliário e estrategista de conversão do ImobiFlow (plataforma de Landing Pages e IA para Corretores Autônomos e Imobiliárias).
Crie um texto de venda altamente persuasivo, elegante e otimizado para conversão na Landing Page do imóvel:
- Anunciante: ${brokerName || 'Corretor'} (${brokerType || 'Corretor Autônomo / Imobiliária'})
- Título Provisório: ${title || 'Imóvel Exclusivo'}
- Tipo: ${type || 'Apartamento'}
- Finalidade: ${operation || 'Venda'}
- Valor: R$ ${price ? Number(price).toLocaleString('pt-BR') : 'A consultar'}
- Localização: ${neighborhood || 'Bairro Nobre'}, ${city || 'Brasília'} - DF
- Área: ${area || '--'} m²
- Quartos: ${bedrooms || 0} (Suítes: ${suites || 0})
- Banheiros: ${bathrooms || 0}
- Vagas de Garagem: ${garageSpots || 0}
- Diferenciais/Lazer: ${Array.isArray(features) ? features.join(', ') : (features || 'Acabamento premium')}
- Detalhes adicionais: ${additionalNotes || 'Nenhum'}

Retorne EXCLUSIVAMENTE um objeto JSON válido com a seguinte estrutura:
{
  "catchyTitle": "Título irresistível e comercial para a Landing Page (máximo 65 caracteres)",
  "engagingDescription": "Descrição comercial completa em 2 a 3 parágrafos fluídos destacando a oportunidade de compra, localização, conforto, acabamentos e retorno do investimento.",
  "highlights": ["3 a 4 diferenciais fortes e objetivos em tópicos"],
  "targetAudience": "Perfil do comprador ideal para este imóvel (ex: investidores, famílias, executivos)"
}`;

    const ai = getGeminiClient();
    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.7,
      },
    });

    const text = response.text || "{}";
    try {
      const data = JSON.parse(text);
      return res.json(data);
    } catch {
      return res.json({
        catchyTitle: title || "Imóvel Exclusivo ImobiFlow",
        engagingDescription: text,
        highlights: ["Excelente localização", "Acabamento de qualidade", "Oportunidade única de compra"],
        targetAudience: "Compradores exigentes",
      });
    }
  } catch (error: any) {
    console.error("Error in generate-property-copy:", error);
    return res.status(500).json({ error: error?.message || "Erro ao gerar descrição com IA" });
  }
});

// Endpoint: AI Lead Qualification & Real-time Chat
app.post("/api/ai/qualify-lead", async (req, res) => {
  try {
    const { property, conversationHistory, userMessage } = req.body;

    const propertyInfo = `
IMÓVEL NA LANDING PAGE IMOBIFLOW:
- Código: ${property.code}
- Título: ${property.title}
- Tipo: ${property.type} (${property.operation})
- Valor: R$ ${Number(property.price).toLocaleString('pt-BR')} (Condomínio: R$ ${property.condoFee || 0})
- Endereço: ${property.address?.street}, ${property.address?.neighborhood}, ${property.address?.city}-${property.address?.state}
- Área: ${property.area}m² | Quartos: ${property.bedrooms} | Banheiros: ${property.bathrooms} | Vagas: ${property.garageSpots}
- Diferenciais: ${(property.features || []).join(', ')}
- Descrição: ${property.description}
`;

    const chatContext = Array.isArray(conversationHistory) 
      ? conversationHistory.map((m: any) => `${m.sender === 'user' ? 'Cliente' : 'Assistente IA ImobiFlow'}: ${m.text}`).join('\n')
      : '';

    const systemInstruction = `Você é o Consultor Virtual com Inteligência Artificial do ImobiFlow, atendendo diretamente na Landing Page exclusiva deste imóvel em nome do Corretor / Imobiliária responsável.

SEU OBJETIVO PRINCIPAL:
1. Atender o visitante com extrema cordialidade, agilidade e autoridade sobre este imóvel.
2. Responder dúvidas sobre valores, condomínio, IPTU, localização, vaga de garagem, regras de financiamento bancário (Caixa, Itaú, etc) e agendamento de visitas.
3. QUALIFICAR O LEAD DE COMPRA de forma natural e consultiva durante a conversa:
   - Coletar Nome e WhatsApp do comprador para enviar a ficha técnica / agendar visita
   - Identificar a Urgência da Compra: se precisa se mudar/comprar agora (até 30 dias), nos próximos meses ou está apenas pesquisando
   - Identificar a Capacidade e Forma de Pagamento: Financiamento bancário, à vista, uso de FGTS, permuta de outro imóvel, valor de entrada disponível
   - Propor agendamento de visita presencial ou envio de vídeo detalhado pelo corretor
4. Avaliar com rigor o Lead Score (Quente = pronto para comprar com orçamento/urgência; Morno = interessado mas avaliando prazo; Frio = apenas curiosidade sem dados).

Sempre responda em Português do Brasil de forma humana, clara e persuasiva.`;

    const prompt = `${propertyInfo}

HISTÓRICO DA CONVERSA:
${chatContext}
Cliente acabou de dizer: "${userMessage}"

Retorne EXCLUSIVAMENTE um objeto JSON válido no formato:
{
  "replyText": "Sua resposta conversacional direta para o cliente (em tom acolhedor e profissional, no máximo 2 parágrafos, convidando para o próximo passo)",
  "extractedLead": {
    "name": "Nome identificado do cliente ou string vazia se não informado",
    "phone": "Telefone/WhatsApp identificado ou string vazia se não informado",
    "email": "Email identificado ou string vazia se não informado",
    "timeline": "Urgência identificada (ex: 'Imediata', '30 a 60 dias', 'Pesquisando') ou string vazia",
    "payment": "Forma de pagamento (ex: 'Financiamento Caixa', 'À vista', 'Consórcio') ou string vazia",
    "budget": "Orçamento/Entrada mencionada ou string vazia"
  },
  "qualification": {
    "score": "Quente" | "Morno" | "Frio",
    "scoreReason": "Justificativa clara em 1-2 frases da classificação do lead",
    "urgency": "Imediata (até 30 dias)" | "Curto Prazo (1 a 3 meses)" | "Médio/Longo Prazo (3 a 6 meses+)" | "Não informado",
    "paymentMethod": "À vista" | "Financiamento Bancário" | "FGTS + Entrada" | "Permuta / Outro" | "Não informado",
    "budgetEstimated": "Estimativa em R$ ou 'A confirmar'",
    "hasPreApprovedCredit": true | false,
    "summaryForBroker": "Resumo executivo do perfil e interesse deste lead para o corretor fechar o negócio",
    "nextStepsSuggested": ["Passo 1 recomendado para o corretor", "Passo 2 recomendado"]
  }
}`;

    const ai = getGeminiClient();
    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        temperature: 0.6,
      },
    });

    const text = response.text || "{}";
    try {
      const data = JSON.parse(text);
      return res.json(data);
    } catch {
      return res.json({
        replyText: text || "Olá! Terei o maior prazer em te ajudar com todas as informações deste imóvel.",
        qualification: {
          score: "Morno",
          scoreReason: "Lead em fase inicial de interação.",
          urgency: "Curto Prazo (1 a 3 meses)",
          paymentMethod: "Financiamento Bancário",
          summaryForBroker: "Cliente demonstrou interesse pelo anúncio.",
          nextStepsSuggested: ["Entrar em contato via WhatsApp"],
        },
      });
    }
  } catch (error: any) {
    console.error("Error in qualify-lead:", error);
    return res.status(500).json({ error: error?.message || "Erro na qualificação do lead" });
  }
});

// Endpoint: AI Financing & Purchase Advisor
app.post("/api/ai/simulate-financing", async (req, res) => {
  try {
    const { propertyPrice, downPayment, termYears, propertyType, operation } = req.body;
    const price = Number(propertyPrice) || 500000;
    const down = Number(downPayment) || price * 0.2;
    const financedAmount = Math.max(0, price - down);
    const months = (Number(termYears) || 30) * 12;

    const prompt = `Você é um consultor financeiro imobiliário sênior em Brasília/DF.
Analise a simulação de aquisição imobiliária abaixo:
- Valor do Imóvel: R$ ${price.toLocaleString('pt-BR')} (${propertyType}, ${operation})
- Entrada Proposta: R$ ${down.toLocaleString('pt-BR')} (${((down / price) * 100).toFixed(0)}%)
- Saldo Financiado: R$ ${financedAmount.toLocaleString('pt-BR')} em ${months} meses (${termYears || 30} anos)

Gere uma orientação financeira completa com estimativa de parcelas (Tabela SAC / PRICE médias do mercado atual, taxas CEF/Santander ~9.9% a 10.5% a.a.), custos cartorários de Brasília (ITBI 3%, Registro de Imóveis) e dicas inteligentes para o comprador.

Retorne EXCLUSIVAMENTE um JSON:
{
  "estimatedFirstInstallment": number,
  "estimatedLastInstallment": number,
  "estimatedMonthlyIncomeRequired": number,
  "estimatedCosts": {
    "itbi": number,
    "registryAndNotary": number,
    "bankAppraisalFee": number,
    "totalInitialExpenses": number
  },
  "aiFinancialAdvice": "Texto explicativo com dicas para aprovação de crédito, uso do FGTS e amortização acelerada",
  "bankOptions": [
    { "bank": "Caixa Econômica", "rateEstimate": "9,9% a.a. + TR", "highlight": "Melhor para FGTS e Tabela SAC" },
    { "bank": "Itaú / Santander", "rateEstimate": "10,2% a.a.", "highlight": "Aprovação rápida e digital" }
  ]
}`;

    const ai = getGeminiClient();
    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.4,
      },
    });

    const text = response.text || "{}";
    return res.json(JSON.parse(text));
  } catch (error: any) {
    console.error("Error in simulate-financing:", error);
    // Fallback calculation
    const price = Number(req.body.propertyPrice) || 500000;
    const down = Number(req.body.downPayment) || price * 0.2;
    const financed = Math.max(0, price - down);
    const months = (Number(req.body.termYears) || 30) * 12;
    const monthlyRate = 0.0082; // ~10.3% a.a.
    const priceInstallment = financed * (monthlyRate / (1 - Math.pow(1 + monthlyRate, -months)));

    return res.json({
      estimatedFirstInstallment: Math.round(priceInstallment * 1.15),
      estimatedLastInstallment: Math.round(priceInstallment * 0.4),
      estimatedMonthlyIncomeRequired: Math.round(priceInstallment * 3.3),
      estimatedCosts: {
        itbi: Math.round(price * 0.03),
        registryAndNotary: Math.round(price * 0.012),
        bankAppraisalFee: 3500,
        totalInitialExpenses: Math.round(price * 0.042 + 3500),
      },
      aiFinancialAdvice: "Recomenda-se comprometer no máximo 30% da renda bruta familiar e utilizar saldo do FGTS para abatimento da entrada ou amortização futura.",
      bankOptions: [
        { bank: "Caixa Econômica", rateEstimate: "9,9% a.a. + TR", highlight: "Melhor taxa e condições com FGTS" },
        { bank: "Santander / Itaú", rateEstimate: "10,2% a.a.", highlight: "Agilidade na análise documental" },
      ],
    });
  }
});

// Vite Middleware for SPA
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Liberty Imóveis server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
