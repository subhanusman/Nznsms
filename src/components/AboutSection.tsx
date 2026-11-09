import React from 'react';
import { Shield, Sparkles, Building2, Globe2 } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-16 lg:py-24 bg-white border-b border-[#E5E1D8]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Editorial Subtitle */}
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9E7B3B] mb-2 flex items-center gap-2">
          <span>The NEXTR Advisory Philosophy</span>
          <span aria-hidden="true">·</span>
          <span>Architectural Integrity</span>
        </div>

        {/* 2-Column Split: Philosophy Narrative & Media */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          <div className="lg:col-span-6 space-y-6">
            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1A1A1A] text-balance leading-tight">
              Where Rare Architecture Meets Sovereign Capital
            </h2>

            <p className="text-sm sm:text-base text-[#524E48] leading-relaxed">
              <strong>NEXTR Haven & Stone</strong> is a demonstration brand developed by <strong>NEXTR Digital Solutions & Services</strong> to illustrate the cutting edge of ultra-luxury digital real estate representation. We conceive the digital gallery not merely as listings, but as an architectural monograph.
            </p>

            <p className="text-sm sm:text-base text-[#524E48] leading-relaxed">
              Every curated estate is chosen for unrepeatable provenance—whether suspended above the Mediterranean waves on Cap d'Antibes, rising into the Manhattan stratosphere, or anchoring premier European financial boulevards.
            </p>

            {/* 3 Pillars */}
            <div className="pt-4 space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <Shield className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-[#1A1A1A] uppercase tracking-wider text-[11px]">
                    Absolute Client Discretion
                  </h4>
                  <p className="text-[#696359] mt-0.5">
                    Demonstrating zero-leakage advisory standards for family offices, sovereign funds, and global estates.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Building2 className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-[#1A1A1A] uppercase tracking-wider text-[11px]">
                    Architectural Discernment
                  </h4>
                  <p className="text-[#696359] mt-0.5">
                    Rigorous selection prioritizing structural innovation, material authenticity, and timeless proportions.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Globe2 className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-[#1A1A1A] uppercase tracking-wider text-[11px]">
                    Global Capital Synergy
                  </h4>
                  <p className="text-[#696359] mt-0.5">
                    Seamless representation across residential sanctuaries and income-producing commercial trophy towers.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Image Collage */}
          <div className="lg:col-span-6 relative">
            <div className="relative border border-[#E5E1D8] bg-[#EDE9E0] p-4 shadow-sm">
              <div className="aspect-[4/3] overflow-hidden bg-stone-300 border border-[#DDD9CE]">
                <img
                  src="/src/assets/images/penthouse_skyline_1794223759598.jpg"
                  alt="Metropolitan luxury interior curation"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Floating Architectural Note */}
              <div className="mt-4 p-4 bg-[#FAF9F5] border border-[#DDD9CE] flex items-center justify-between text-xs">
                <div>
                  <span className="font-semibold text-[#1A1A1A] block">Digital Craftsmanship Demonstration</span>
                  <span className="text-[#706B62]">Engineered by NEXTR Digital Solutions & Services</span>
                </div>
                <Sparkles className="w-4 h-4 text-[#C5A059] shrink-0" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
