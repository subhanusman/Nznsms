import React, { useState, useId } from 'react';
import { Calculator, DollarSign, Percent, RefreshCw, AlertCircle } from 'lucide-react';
import { Property } from '../types/property';

interface MortgageCalculatorProps {
  properties: Property[];
  preselectedProperty?: Property | null;
  onOpenScheduler?: (propertyId: string) => void;
}

export const MortgageCalculator: React.FC<MortgageCalculatorProps> = ({
  properties,
  preselectedProperty,
  onOpenScheduler,
}) => {
  const propertySelectId = useId();
  const priceInputId = useId();
  const downPaymentInputId = useId();
  const interestRateInputId = useId();
  const taxRateInputId = useId();
  const insuranceInputId = useId();
  const hoaInputId = useId();

  // Initial values
  const defaultPrice = preselectedProperty ? preselectedProperty.price : 28500000;
  const [propertyPrice, setPropertyPrice] = useState<number>(defaultPrice);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(25);
  const [interestRate, setInterestRate] = useState<number>(6.25);
  const [loanTermYears, setLoanTermYears] = useState<number>(30);
  const [annualPropertyTaxRate, setAnnualPropertyTaxRate] = useState<number>(0.85); // 0.85%
  const [annualInsurance, setAnnualInsurance] = useState<number>(24000); // $24k/yr
  const [monthlyHOA, setMonthlyHOA] = useState<number>(1800);
  const [showAmortization, setShowAmortization] = useState<boolean>(false);

  // Sync if preselected property changes
  React.useEffect(() => {
    if (preselectedProperty) {
      setPropertyPrice(preselectedProperty.price);
      if (preselectedProperty.monthlyTax) {
        // approximate rate from monthly tax
        const approxRate = (preselectedProperty.monthlyTax * 12) / preselectedProperty.price * 100;
        setAnnualPropertyTaxRate(Number(approxRate.toFixed(2)) || 0.85);
      }
      if (preselectedProperty.monthlyInsurance) {
        setAnnualInsurance(preselectedProperty.monthlyInsurance * 12);
      }
      if (preselectedProperty.monthlyHOA) {
        setMonthlyHOA(preselectedProperty.monthlyHOA);
      }
    }
  }, [preselectedProperty]);

  // Derived financial computations
  const downPaymentAmount = (propertyPrice * downPaymentPercent) / 100;
  const loanPrincipal = Math.max(0, propertyPrice - downPaymentAmount);

  const monthlyRate = interestRate / 100 / 12;
  const totalMonths = loanTermYears * 12;

  // Monthly Principal & Interest
  const monthlyPrincipalAndInterest =
    monthlyRate > 0 && totalMonths > 0 && loanPrincipal > 0
      ? (loanPrincipal * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1)
      : 0;

  const monthlyTax = (propertyPrice * (annualPropertyTaxRate / 100)) / 12;
  const monthlyInsurance = annualInsurance / 12;
  const totalMonthlyPayment =
    monthlyPrincipalAndInterest + monthlyTax + monthlyInsurance + monthlyHOA;

  // Percentage breakdown for visual distribution bar
  const piPercent = totalMonthlyPayment > 0 ? (monthlyPrincipalAndInterest / totalMonthlyPayment) * 100 : 0;
  const taxPercent = totalMonthlyPayment > 0 ? (monthlyTax / totalMonthlyPayment) * 100 : 0;
  const insPercent = totalMonthlyPayment > 0 ? (monthlyInsurance / totalMonthlyPayment) * 100 : 0;
  const hoaPercent = totalMonthlyPayment > 0 ? (monthlyHOA / totalMonthlyPayment) * 100 : 0;

  // Calculate Amortization milestones
  const generateAmortizationMilestones = () => {
    const milestones = [];
    const intervalYears = loanTermYears === 15 ? [1, 3, 5, 8, 10, 12, 15] : [1, 5, 10, 15, 20, 25, 30];

    let currentBalance = loanPrincipal;
    let accumulatedPrincipal = 0;
    let accumulatedInterest = 0;

    for (let month = 1; month <= totalMonths; month++) {
      const interestForMonth = currentBalance * monthlyRate;
      const principalForMonth = monthlyPrincipalAndInterest - interestForMonth;
      currentBalance = Math.max(0, currentBalance - principalForMonth);
      accumulatedPrincipal += principalForMonth;
      accumulatedInterest += interestForMonth;

      const currentYear = month / 12;
      if (intervalYears.includes(currentYear)) {
        milestones.push({
          year: currentYear,
          remainingBalance: currentBalance,
          principalPaid: accumulatedPrincipal,
          interestPaid: accumulatedInterest,
        });
      }
    }
    return milestones;
  };

  const handleSelectPropertyPreset = (propId: string) => {
    const prop = properties.find((p) => p.id === propId);
    if (prop) {
      setPropertyPrice(prop.price);
      if (prop.monthlyTax) {
        setAnnualPropertyTaxRate(Number(((prop.monthlyTax * 12) / prop.price * 100).toFixed(2)));
      }
      if (prop.monthlyInsurance) {
        setAnnualInsurance(prop.monthlyInsurance * 12);
      }
      if (prop.monthlyHOA !== undefined) {
        setMonthlyHOA(prop.monthlyHOA);
      }
    }
  };

  const handleReset = () => {
    setPropertyPrice(28500000);
    setDownPaymentPercent(25);
    setInterestRate(6.25);
    setLoanTermYears(30);
    setAnnualPropertyTaxRate(0.85);
    setAnnualInsurance(24000);
    setMonthlyHOA(1800);
  };

  return (
    <section id="mortgage-calculator" className="py-16 lg:py-24 bg-white border-b border-[#E5E1D8]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#E7E4DC]">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9E7B3B] mb-2 flex items-center gap-2">
              <span>Financial Engineering & Advisory</span>
              <span aria-hidden="true">·</span>
              <span>Local Demonstration Tool</span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#1A1A1A] font-normal">
              Illustrative Mortgage & Cash Flow Calculator
            </h2>
            <p className="mt-2 text-sm text-[#5C574F] max-w-xl">
              Model illustrative monthly capital debt service, estimated real estate taxes, hazard coverage, and asset maintenance.
            </p>
          </div>

          <button
            onClick={handleReset}
            className="self-start md:self-end px-3 py-2 text-xs font-medium text-[#706B62] hover:text-[#1A1A1A] border border-[#DDD9CE] hover:border-[#1A1A1A] transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>
        </div>

        {/* Quick Property Preset Selector Bar */}
        <div className="mt-6 p-4 bg-[#FAF9F5] border border-[#E7E4DC] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <label htmlFor={propertySelectId} className="text-xs font-semibold uppercase tracking-wider text-[#736E66]">
              Load Portfolio Asset:
            </label>
            <select
              id={propertySelectId}
              onChange={(e) => handleSelectPropertyPreset(e.target.value)}
              className="text-xs font-medium bg-white border border-[#DDD9CE] px-3 py-1.5 focus:outline-none focus:border-[#C5A059] text-[#1A1A1A] cursor-pointer"
            >
              <option value="">Select a demonstration property...</option>
              {properties.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title} ({p.priceFormatted})
                </option>
              ))}
            </select>
          </div>
          <div className="text-xs text-[#706B62]">
            Valuation loaded: <strong className="text-[#1A1A1A] tabular-nums">${propertyPrice.toLocaleString()}</strong>
          </div>
        </div>

        {/* Calculator Main Grid */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Interactive Inputs */}
          <div className="lg:col-span-7 space-y-6">
            {/* 1. Property Price Slider & Input */}
            <div className="p-5 bg-[#FAF9F6] border border-[#E7E4DC]">
              <div className="flex items-center justify-between gap-4 mb-2">
                <label htmlFor={priceInputId} className="text-xs font-semibold uppercase tracking-wider text-[#1A1A1A]">
                  Property Acquisition Price
                </label>
                <div className="relative w-44">
                  <DollarSign className="w-3.5 h-3.5 text-[#9C9487] absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    id={priceInputId}
                    type="number"
                    min={1000000}
                    max={200000000}
                    step={250000}
                    value={propertyPrice}
                    onChange={(e) => setPropertyPrice(Math.max(100000, Number(e.target.value)))}
                    className="w-full pl-7 pr-3 py-1.5 text-sm font-semibold tabular-nums bg-white border border-[#DDD9CE] focus:outline-none focus:border-[#C5A059] text-right"
                  />
                </div>
              </div>
              <input
                type="range"
                min={2000000}
                max={150000000}
                step={500000}
                value={propertyPrice}
                onChange={(e) => setPropertyPrice(Number(e.target.value))}
                className="w-full cursor-pointer h-1.5 bg-[#DDD9CE]"
              />
              <div className="mt-2 flex justify-between text-[11px] text-[#807A70] tabular-nums">
                <span>$2,000,000</span>
                <span>$75,000,000</span>
                <span>$150,000,000</span>
              </div>
            </div>

            {/* 2. Down Payment */}
            <div className="p-5 bg-[#FAF9F6] border border-[#E7E4DC]">
              <div className="flex items-center justify-between gap-4 mb-2">
                <div>
                  <label htmlFor={downPaymentInputId} className="text-xs font-semibold uppercase tracking-wider text-[#1A1A1A]">
                    Equity Down Payment
                  </label>
                  <span className="block text-[11px] text-[#706B62] tabular-nums">
                    ${Math.round(downPaymentAmount).toLocaleString()} Cash Required
                  </span>
                </div>
                <div className="relative w-28">
                  <Percent className="w-3.5 h-3.5 text-[#9C9487] absolute right-3 top-1/2 -translate-y-1/2" />
                  <input
                    id={downPaymentInputId}
                    type="number"
                    min={10}
                    max={90}
                    step={1}
                    value={downPaymentPercent}
                    onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                    className="w-full pr-8 pl-3 py-1.5 text-sm font-semibold tabular-nums bg-white border border-[#DDD9CE] focus:outline-none focus:border-[#C5A059] text-right"
                  />
                </div>
              </div>
              <input
                type="range"
                min={10}
                max={80}
                step={5}
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                className="w-full cursor-pointer h-1.5 bg-[#DDD9CE]"
              />
              <div className="mt-2 flex justify-between text-[11px] text-[#807A70]">
                <span>10% (High Leverage)</span>
                <span>25% (Standard Luxury)</span>
                <span>50%+ (Conservative)</span>
              </div>
            </div>

            {/* 3. Interest Rate & Loan Term in 2 columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 bg-[#FAF9F6] border border-[#E7E4DC]">
                <label htmlFor={interestRateInputId} className="block text-xs font-semibold uppercase tracking-wider text-[#1A1A1A] mb-1">
                  Interest Rate (% p.a.)
                </label>
                <div className="relative mt-2">
                  <Percent className="w-3.5 h-3.5 text-[#9C9487] absolute right-3 top-1/2 -translate-y-1/2" />
                  <input
                    id={interestRateInputId}
                    type="number"
                    step={0.125}
                    min={2.0}
                    max={12.0}
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full pr-8 pl-3 py-2 text-sm font-semibold tabular-nums bg-white border border-[#DDD9CE] focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
                <input
                  type="range"
                  min={3.0}
                  max={10.0}
                  step={0.125}
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full mt-3 cursor-pointer h-1.5 bg-[#DDD9CE]"
                />
              </div>

              <div className="p-5 bg-[#FAF9F6] border border-[#E7E4DC]">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#1A1A1A] mb-3">
                  Loan Amortization Term
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[15, 20, 30].map((years) => (
                    <button
                      key={years}
                      type="button"
                      onClick={() => setLoanTermYears(years)}
                      className={`py-2 text-xs font-medium tracking-wide border transition-colors cursor-pointer ${
                        loanTermYears === years
                          ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                          : 'bg-white text-[#4A4843] border-[#DDD9CE] hover:border-[#1A1A1A]'
                      }`}
                    >
                      {years} Yrs
                    </button>
                  ))}
                </div>
                <span className="block mt-3 text-[11px] text-[#706B62]">
                  {loanTermYears * 12} Total Monthly Installments
                </span>
              </div>
            </div>

            {/* 4. Taxes, Insurance, and HOA */}
            <div className="p-5 bg-[#FAF9F6] border border-[#E7E4DC]">
              <span className="block text-xs font-semibold uppercase tracking-wider text-[#1A1A1A] mb-3">
                Estimated Escrows & Asset Carrying Costs
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label htmlFor={taxRateInputId} className="block text-[11px] text-[#706B62] mb-1">
                    Property Tax Rate (%/yr)
                  </label>
                  <input
                    id={taxRateInputId}
                    type="number"
                    step={0.05}
                    value={annualPropertyTaxRate}
                    onChange={(e) => setAnnualPropertyTaxRate(Number(e.target.value))}
                    className="w-full px-3 py-1.5 text-xs font-semibold tabular-nums bg-white border border-[#DDD9CE]"
                  />
                  <span className="text-[10px] text-[#807A70] block mt-1 tabular-nums">
                    ${Math.round(monthlyTax).toLocaleString()}/mo
                  </span>
                </div>

                <div>
                  <label htmlFor={insuranceInputId} className="block text-[11px] text-[#706B62] mb-1">
                    Annual Hazard Ins. ($/yr)
                  </label>
                  <input
                    id={insuranceInputId}
                    type="number"
                    step={1000}
                    value={annualInsurance}
                    onChange={(e) => setAnnualInsurance(Number(e.target.value))}
                    className="w-full px-3 py-1.5 text-xs font-semibold tabular-nums bg-white border border-[#DDD9CE]"
                  />
                  <span className="text-[10px] text-[#807A70] block mt-1 tabular-nums">
                    ${Math.round(monthlyInsurance).toLocaleString()}/mo
                  </span>
                </div>

                <div>
                  <label htmlFor={hoaInputId} className="block text-[11px] text-[#706B62] mb-1">
                    HOA / Maintenance ($/mo)
                  </label>
                  <input
                    id={hoaInputId}
                    type="number"
                    step={250}
                    value={monthlyHOA}
                    onChange={(e) => setMonthlyHOA(Number(e.target.value))}
                    className="w-full px-3 py-1.5 text-xs font-semibold tabular-nums bg-white border border-[#DDD9CE]"
                  />
                  <span className="text-[10px] text-[#807A70] block mt-1 tabular-nums">
                    Concierge & Grounds
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Results Summary & Breakdown Card */}
          <div className="lg:col-span-5 bg-[#1C1B19] text-[#FAF9F5] border border-[#302D27] p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold flex items-center gap-1.5">
                <Calculator className="w-3.5 h-3.5" />
                <span>Simulated Monthly Obligation</span>
              </span>
              <span className="text-[11px] text-[#9C9487] tabular-nums font-mono">
                {loanTermYears}Y FIXED
              </span>
            </div>

            {/* Total Monthly Amount */}
            <div className="my-6">
              <span className="text-xs text-[#B8B1A4] block">Estimated Total Monthly Outflow</span>
              <div className="font-serif-luxury text-4xl sm:text-5xl font-light text-white tracking-tight mt-1 tabular-nums">
                ${Math.round(totalMonthlyPayment).toLocaleString()}
                <span className="text-sm font-sans font-normal text-[#9C9487] ml-2">/ month</span>
              </div>
              <span className="text-xs text-[#9C9487] block mt-1.5">
                Principal Loan Balance: <strong className="text-[#FAF9F5] tabular-nums">${Math.round(loanPrincipal).toLocaleString()}</strong>
              </span>
            </div>

            {/* Visual Distribution Bar */}
            <div className="space-y-1.5 pt-4 border-t border-white/10">
              <div className="flex justify-between text-xs text-[#B8B1A4] mb-1">
                <span>Payment Allocation</span>
                <span className="tabular-nums">100% Total</span>
              </div>
              <div className="h-2 w-full bg-[#302D27] flex overflow-hidden">
                <div style={{ width: `${piPercent}%` }} className="bg-[#C5A059]" title={`Principal & Interest: ${piPercent.toFixed(1)}%`} />
                <div style={{ width: `${taxPercent}%` }} className="bg-[#8A9A86]" title={`Property Tax: ${taxPercent.toFixed(1)}%`} />
                <div style={{ width: `${insPercent}%` }} className="bg-[#788E9E]" title={`Hazard Insurance: ${insPercent.toFixed(1)}%`} />
                <div style={{ width: `${hoaPercent}%` }} className="bg-[#9E7A8A]" title={`HOA/Carrying: ${hoaPercent.toFixed(1)}%`} />
              </div>
            </div>

            {/* Detailed Itemized Outflow List */}
            <div className="mt-6 space-y-3 text-xs border-t border-white/10 pt-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 bg-[#C5A059]" />
                  <span>Principal & Debt Interest</span>
                </div>
                <span className="font-semibold text-white tabular-nums">
                  ${Math.round(monthlyPrincipalAndInterest).toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 bg-[#8A9A86]" />
                  <span>Estimated Real Estate Taxes</span>
                </div>
                <span className="font-semibold text-white tabular-nums">
                  ${Math.round(monthlyTax).toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 bg-[#788E9E]" />
                  <span>Homeowners & Hazard Insurance</span>
                </div>
                <span className="font-semibold text-white tabular-nums">
                  ${Math.round(monthlyInsurance).toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 bg-[#9E7A8A]" />
                  <span>Asset HOA / Building Maintenance</span>
                </div>
                <span className="font-semibold text-white tabular-nums">
                  ${Math.round(monthlyHOA).toLocaleString()}
                </span>
              </div>
            </div>

            {/* Toggle Amortization Schedule */}
            <div className="mt-6 pt-5 border-t border-white/10">
              <button
                onClick={() => setShowAmortization(!showAmortization)}
                className="w-full py-2.5 text-xs font-semibold tracking-wider uppercase text-[#D4AF37] hover:text-white border border-[#D4AF37]/40 hover:border-white transition-colors cursor-pointer"
              >
                {showAmortization ? 'Hide Amortization Schedule' : 'View Illustrative Amortization'}
              </button>
            </div>

            {/* Amortization Milestone Preview */}
            {showAmortization && (
              <div className="mt-4 p-3 bg-[#141312] border border-white/10 text-[11px] max-h-56 overflow-y-auto">
                <div className="font-semibold text-[#D4AF37] mb-2 uppercase tracking-wider text-[10px]">
                  Amortization Milestones ({loanTermYears}-Year Schedule)
                </div>
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-white/10 text-stone-400">
                      <th className="py-1">Year</th>
                      <th className="py-1 text-right">Principal</th>
                      <th className="py-1 text-right">Interest</th>
                      <th className="py-1 text-right">Balance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-mono">
                    {generateAmortizationMilestones().map((m) => (
                      <tr key={m.year}>
                        <td className="py-1 text-stone-300">Yr {m.year}</td>
                        <td className="py-1 text-right text-stone-300">${Math.round(m.principalPaid / 1000)}k</td>
                        <td className="py-1 text-right text-stone-400">${Math.round(m.interestPaid / 1000)}k</td>
                        <td className="py-1 text-right text-white font-semibold">${Math.round(m.remainingBalance / 1000)}k</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-6 pt-4 border-t border-white/10">
              <button
                onClick={() => {
                  if (onOpenScheduler) onOpenScheduler(preselectedProperty?.id || 'azure-coast-villa');
                }}
                className="w-full py-3 text-xs font-semibold tracking-wider uppercase text-[#1C1B19] bg-[#C5A059] hover:bg-[#D4AF37] transition-colors cursor-pointer"
              >
                Schedule VIP Consultation For This Asset
              </button>
            </div>

            {/* Fictional Demonstration Notice */}
            <div className="mt-5 flex items-start gap-2 text-[11px] text-[#A69F91] leading-relaxed">
              <AlertCircle className="w-3.5 h-3.5 text-[#C5A059] shrink-0 mt-0.5" />
              <p>
                <strong>Fictional Demonstration Tool:</strong> All calculations, loan rates, and escrow assumptions are provided for demonstration purposes only by NEXTR Digital Solutions & Services. They do not constitute financial advice or formal mortgage approvals.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
