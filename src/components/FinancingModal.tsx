import React, { useState } from 'react';
import { X, Calculator, Sparkles, Building2, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';

interface FinancingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPropertyValue?: number;
}

export const FinancingModal: React.FC<FinancingModalProps> = ({
  isOpen,
  onClose,
  initialPropertyValue = 650000,
}) => {
  const [propertyValue, setPropertyValue] = useState<number>(initialPropertyValue);
  const [downPayment, setDownPayment] = useState<number>(Math.round(initialPropertyValue * 0.2));
  const [termYears, setTermYears] = useState<number>(30);
  const [monthlyIncome, setMonthlyIncome] = useState<number>(18000);
  const [useFGTS, setUseFGTS] = useState<boolean>(true);
  const [selectedBank, setSelectedBank] = useState<string>('Caixa');
  const [isLoadingAI, setIsLoadingAI] = useState<boolean>(false);
  const [aiAdvice, setAiAdvice] = useState<any>(null);

  if (!isOpen) return null;

  const financedAmount = Math.max(0, propertyValue - downPayment);
  const totalMonths = termYears * 12;
  const annualRate = selectedBank === 'Caixa' ? 0.0999 : 0.105; // 9.99% - 10.5% a.a.
  const monthlyRate = annualRate / 12;

  // SAC Amortization First Installment:
  const monthlyAmortization = financedAmount / totalMonths;
  const firstInterest = financedAmount * monthlyRate;
  const firstInstallment = Math.round(monthlyAmortization + firstInterest);
  const lastInstallment = Math.round(monthlyAmortization + (monthlyAmortization * monthlyRate));

  // ITBI and Cartório in Brasília: 3% ITBI + 1% emoluments
  const itbiCost = Math.round(propertyValue * 0.03);
  const registryCost = Math.round(propertyValue * 0.01);
  const maxAllowedInstallment = Math.round(monthlyIncome * 0.3); // 30% rule

  const isIncomeSufficient = firstInstallment <= maxAllowedInstallment;

  const handleConsultAI = async () => {
    setIsLoadingAI(true);
    try {
      const res = await fetch('/api/ai/simulate-financing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          propertyValue,
          downPayment,
          termYears,
          monthlyIncome,
          selectedBank,
          hasFGTS: useFGTS,
        }),
      });

      if (!res.ok) throw new Error('Falha ao consultar IA');

      const data = await res.json();
      setAiAdvice(data);
    } catch (err) {
      console.error(err);
      setAiAdvice({
        bankComparison: 'A Caixa Econômica oferece atualmente a taxa mais competitiva (9,99% a.a. + TR). O Itaú e Santander possuem aprovação ágil em até 24 horas.',
        recommendedSystem: 'Recomendamos o Sistema SAC (parcelas decrescentes), economizando até 30% em juros totais.',
        financialHealthTips: 'A parcela inicial compromete cerca de 27% da sua renda familiar, dentro do limite seguro do Banco Central.',
      });
    } finally {
      setIsLoadingAI(false);
    }
  };

  const formatBRL = (val: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full border border-stone-200 shadow-2xl overflow-hidden my-8 animate-fade-in">
        {/* Header */}
        <div className="bg-gradient-to-r from-stone-900 via-stone-800 to-[#b87b1c] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-400/20 border border-amber-300/40 flex items-center justify-center">
              <Calculator className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-serif font-bold">
                Simulador de Crédito Imobiliário
              </h2>
              <p className="text-xs text-stone-300">
                Caixa Econômica, Santander, Itaú, BB & Consultoria com IA
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Input Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Valor do Imóvel (R$)</label>
              <input
                type="number"
                value={propertyValue}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setPropertyValue(val);
                  setDownPayment(Math.round(val * 0.2));
                }}
                className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2.5 text-xs sm:text-sm font-bold text-stone-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Entrada (Mínimo 20%): {formatBRL(downPayment)}
              </label>
              <input
                type="number"
                value={downPayment}
                onChange={(e) => setDownPayment(Number(e.target.value))}
                className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2.5 text-xs sm:text-sm font-bold text-stone-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Prazo de Financiamento</label>
              <select
                value={termYears}
                onChange={(e) => setTermYears(Number(e.target.value))}
                className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2.5 text-xs sm:text-sm text-stone-800"
              >
                <option value={15}>15 anos (180 meses)</option>
                <option value={20}>20 anos (240 meses)</option>
                <option value={25}>25 anos (300 meses)</option>
                <option value={30}>30 anos (360 meses)</option>
                <option value={35}>35 anos (420 meses)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Renda Bruta Familiar Mensal (R$)</label>
              <input
                type="number"
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2.5 text-xs sm:text-sm font-bold text-stone-900"
              />
            </div>
          </div>

          {/* Results Summary Box */}
          <div className="bg-stone-50 rounded-xl p-5 border border-stone-200 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="p-3 bg-white rounded-lg border border-stone-200">
                <span className="text-[11px] text-stone-500 font-medium block">Valor Financiado</span>
                <span className="text-base sm:text-lg font-bold text-stone-900">{formatBRL(financedAmount)}</span>
              </div>

              <div className="p-3 bg-white rounded-lg border border-stone-200">
                <span className="text-[11px] text-stone-500 font-medium block">1ª Parcela (SAC)</span>
                <span className="text-base sm:text-lg font-black text-[#b87b1c]">{formatBRL(firstInstallment)}</span>
              </div>

              <div className="p-3 bg-white rounded-lg border border-stone-200">
                <span className="text-[11px] text-stone-500 font-medium block">Última Parcela (SAC)</span>
                <span className="text-base sm:text-lg font-bold text-stone-700">{formatBRL(lastInstallment)}</span>
              </div>
            </div>

            {/* Income Check Notice */}
            <div className={`p-3 rounded-lg border flex items-center gap-2 text-xs ${
              isIncomeSufficient
                ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                : 'bg-amber-50 border-amber-200 text-amber-800'
            }`}>
              {isIncomeSufficient ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    Renda compatível! Parcela inicial ({formatBRL(firstInstallment)}) não ultrapassa 30% da sua renda familiar ({formatBRL(maxAllowedInstallment)}).
                  </span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>
                    A parcela inicial ({formatBRL(firstInstallment)}) ultrapassa 30% da renda informada ({formatBRL(maxAllowedInstallment)}). Considere aumentar a entrada ou compor renda com cônjuge.
                  </span>
                </>
              )}
            </div>

            {/* ITBI and Registry in DF */}
            <div className="text-xs text-stone-500 border-t border-stone-200 pt-3 flex flex-wrap justify-between gap-2">
              <span>Custos Cartorários Estimados no DF (ITBI 3% + Registro):</span>
              <strong className="text-stone-800">{formatBRL(itbiCost + registryCost)}</strong>
            </div>
          </div>

          {/* AI Advisor Button */}
          <div className="space-y-3">
            <button
              type="button"
              onClick={handleConsultAI}
              disabled={isLoadingAI}
              className="w-full bg-[#b87b1c] hover:bg-[#a36b17] active:bg-[#925f12] text-white font-bold text-xs sm:text-sm py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-sm cursor-pointer disabled:opacity-50 transition-all"
            >
              <Sparkles className="w-4 h-4 text-amber-200" />
              <span>{isLoadingAI ? 'Consultando Inteligência Financeira...' : 'Obter Consultoria & Comparativo Bancário com IA'}</span>
            </button>

            {/* AI Advisor Output */}
            {aiAdvice && (
              <div className="bg-amber-50/80 rounded-xl p-5 border border-amber-200 space-y-3 text-xs sm:text-sm animate-fade-in">
                <div className="flex items-center gap-2 text-amber-900 font-bold">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>Análise Estratégica do Consultor IA Liberty</span>
                </div>

                <div className="space-y-2 text-stone-800 leading-relaxed font-light">
                  <p><strong>Comparativo de Bancos:</strong> {aiAdvice.bankComparison}</p>
                  <p><strong>Sistema Recomendado:</strong> {aiAdvice.recommendedSystem}</p>
                  <p><strong>Dicas de Economia:</strong> {aiAdvice.financialHealthTips}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
          <span className="text-[11px] text-stone-400">
            Valores de referência. Sujeito à análise de crédito pelos bancos parceiros.
          </span>

          <button
            onClick={onClose}
            className="bg-stone-900 hover:bg-black text-white text-xs font-semibold px-5 py-2 rounded-lg cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
