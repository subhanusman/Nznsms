import React from 'react';
import { Search, Compass, Calendar, ChevronDown } from 'lucide-react';
import { FilterState } from '../types/property';

interface HeroProps {
  filters: FilterState;
  onFilterChange: (filters: Partial<FilterState>) => void;
  onSearchSubmit: () => void;
  onOpenScheduler: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  filters,
  onFilterChange,
  onSearchSubmit,
  onOpenScheduler,
}) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-[#E7E4DC]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Editorial Brand Kicker */}
        <div className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#9E7B3B] flex items-center gap-2">
          <span>NEXTR Digital Solutions & Services Showcase</span>
          <span aria-hidden="true">·</span>
          <span>Sovereign Real Estate Advisory</span>
        </div>

        {/* 2-Column Split: Headline & Cinematic Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Typographic & Value Prop */}
          <div className="lg:col-span-6 flex flex-col justify-between py-2">
            <div>
              <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-[3.5rem] leading-[1.08] font-normal text-[#1A1A1A] text-balance">
                Architectural Masterpieces & Sovereign Commercial Holdings
              </h1>
              <p className="mt-6 text-base sm:text-lg text-[#524E48] leading-relaxed max-w-xl">
                An exclusive demonstration portfolio bridging sculptural Mediterranean cliffside villas, iconic Manhattan penthouses, and institutional Grade-A commercial towers.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-[#E7E4DC] flex flex-wrap items-center gap-4">
              <a
                href="#portfolio"
                className="px-6 py-3.5 text-xs font-semibold tracking-wider uppercase text-white bg-[#1A1A1A] hover:bg-[#33312E] transition-colors inline-flex items-center gap-2 cursor-pointer"
              >
                <Compass className="w-4 h-4" />
                <span>Explore Portfolio</span>
              </a>
              <button
                onClick={onOpenScheduler}
                className="px-6 py-3.5 text-xs font-semibold tracking-wider uppercase text-[#1A1A1A] bg-transparent hover:bg-[#EFECE4] border border-[#1A1A1A] transition-colors inline-flex items-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[#9E7B3B]" />
                <span>VIP Viewing Scheduler</span>
              </button>
            </div>

            {/* Quiet Advisory Trust Metrics */}
            <div className="mt-10 grid grid-cols-3 gap-6 pt-6 border-t border-[#E7E4DC]/80 text-xs text-[#5C574F]">
              <div>
                <p className="font-serif-luxury text-2xl font-semibold text-[#1A1A1A] tabular-nums">$415M+</p>
                <p className="mt-1 tracking-wide text-[#706B62]">Simulated Portfolio</p>
              </div>
              <div>
                <p className="font-serif-luxury text-2xl font-semibold text-[#1A1A1A] tabular-nums">7 Prime</p>
                <p className="mt-1 tracking-wide text-[#706B62]">Global Capital Cities</p>
              </div>
              <div>
                <p className="font-serif-luxury text-2xl font-semibold text-[#1A1A1A] tabular-nums">100%</p>
                <p className="mt-1 tracking-wide text-[#706B62]">Client Discretion</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero High-Impact Photography Asset */}
          <div className="lg:col-span-6 relative">
            <div className="relative h-full min-h-[380px] sm:min-h-[460px] lg:min-h-[520px] w-full overflow-hidden border border-[#E7E4DC] shadow-sm bg-[#EDE9E0]">
              <img
                src="/src/assets/images/hero_luxury_villa_1794223759758.jpg"
                alt="The Azure Coast Cliffside Villa illuminated at twilight overlooking the Mediterranean"
                className="w-full h-full object-cover"
                loading="eager"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              {/* In-Frame Curated Asset Caption */}
              <div className="absolute bottom-6 left-6 right-6 text-white pointer-events-auto">
                <div className="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold mb-1">
                  Spotlight Demonstration Residence
                </div>
                <h3 className="font-serif-luxury text-xl sm:text-2xl font-medium tracking-wide">
                  The Azure Coast Cliffside Villa · Cap d'Antibes
                </h3>
                <div className="mt-2 flex items-center justify-between text-xs text-stone-300">
                  <span>6 Bedrooms · 8 Baths · 12,400 sq ft</span>
                  <span className="text-[#F1E5C6] font-semibold text-sm tabular-nums">$28,500,000</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Control Fast Search & Filter Row */}
        <div className="mt-12 bg-white border border-[#E2DFD6] shadow-sm p-4 sm:p-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 items-center">
            {/* 1. Keyword search */}
            <div className="lg:col-span-4 relative">
              <label htmlFor="search-input" className="block text-[11px] font-semibold uppercase tracking-wider text-[#736E66] mb-1">
                Property or Location
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-[#9C9487] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="search-input"
                  type="text"
                  value={filters.searchQuery}
                  onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
                  placeholder="e.g. Villa, Penthouse, Paris, Tower..."
                  className="w-full pl-9 pr-3 py-2 text-sm bg-[#FAF9F6] border border-[#DDD9CE] focus:outline-none focus:border-[#C5A059] text-[#1A1A1A]"
                />
              </div>
            </div>

            {/* 2. Category selection */}
            <div className="lg:col-span-3">
              <label htmlFor="category-select" className="block text-[11px] font-semibold uppercase tracking-wider text-[#736E66] mb-1">
                Asset Category
              </label>
              <div className="relative">
                <select
                  id="category-select"
                  value={filters.category}
                  onChange={(e) => onFilterChange({ category: e.target.value as 'all' | 'residential' | 'commercial' })}
                  className="w-full appearance-none px-3 py-2 text-sm bg-[#FAF9F6] border border-[#DDD9CE] focus:outline-none focus:border-[#C5A059] text-[#1A1A1A] pr-8 cursor-pointer"
                >
                  <option value="all">All Portfolios (Residential & Commercial)</option>
                  <option value="residential">Residential Estates & Penthouses</option>
                  <option value="commercial">Commercial & Trophy Assets</option>
                </select>
                <ChevronDown className="w-4 h-4 text-[#9C9487] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* 3. Bedroom / Scale filter */}
            <div className="lg:col-span-3">
              <label htmlFor="bedrooms-select" className="block text-[11px] font-semibold uppercase tracking-wider text-[#736E66] mb-1">
                Bedrooms / Suites
              </label>
              <div className="relative">
                <select
                  id="bedrooms-select"
                  value={filters.minBedrooms}
                  onChange={(e) => onFilterChange({ minBedrooms: Number(e.target.value) })}
                  className="w-full appearance-none px-3 py-2 text-sm bg-[#FAF9F6] border border-[#DDD9CE] focus:outline-none focus:border-[#C5A059] text-[#1A1A1A] pr-8 cursor-pointer"
                >
                  <option value={0}>Any Number of Bedrooms</option>
                  <option value={4}>4+ Bedrooms</option>
                  <option value={5}>5+ Bedrooms</option>
                  <option value={6}>6+ Bedrooms</option>
                  <option value={7}>7+ Bedrooms</option>
                </select>
                <ChevronDown className="w-4 h-4 text-[#9C9487] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* 4. Action CTA */}
            <div className="lg:col-span-2 pt-2 sm:pt-5">
              <button
                onClick={onSearchSubmit}
                className="w-full py-2.5 px-4 text-xs font-semibold tracking-wider uppercase text-white bg-[#1A1A1A] hover:bg-[#33312E] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Search</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
