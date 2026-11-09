import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  onSelectCategory?: (category: 'all' | 'residential' | 'commercial') => void;
  onOpenScheduler?: (propertyId?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onSelectCategory, onOpenScheduler }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId: string, category?: 'all' | 'residential' | 'commercial') => {
    if (category && onSelectCategory) {
      onSelectCategory(category);
    }
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F5]/90 backdrop-blur-md border-b border-[#E7E4DC] transition-all">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand title, one line */}
        <a
          href="#"
          className="font-serif-luxury text-2xl tracking-[0.04em] font-medium text-[#1A1A1A] hover:text-[#9E7B3B] transition-colors whitespace-nowrap shrink-0"
        >
          NEXTR Haven & Stone
        </a>

        {/* Zone 2: 4–5 nav links, 1–2 word labels, single-line */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium tracking-wide text-[#4A4843]">
          <button
            onClick={() => handleNavClick('portfolio', 'all')}
            className="hover:text-[#1A1A1A] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#C5A059] hover:after:w-full after:transition-all whitespace-nowrap shrink-0 cursor-pointer"
          >
            Portfolio
          </button>
          <button
            onClick={() => handleNavClick('portfolio', 'residential')}
            className="hover:text-[#1A1A1A] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#C5A059] hover:after:w-full after:transition-all whitespace-nowrap shrink-0 cursor-pointer"
          >
            Residential
          </button>
          <button
            onClick={() => handleNavClick('portfolio', 'commercial')}
            className="hover:text-[#1A1A1A] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#C5A059] hover:after:w-full after:transition-all whitespace-nowrap shrink-0 cursor-pointer"
          >
            Commercial
          </button>
          <button
            onClick={() => handleNavClick('floor-plans')}
            className="hover:text-[#1A1A1A] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#C5A059] hover:after:w-full after:transition-all whitespace-nowrap shrink-0 cursor-pointer"
          >
            Floor Plans
          </button>
          <button
            onClick={() => handleNavClick('mortgage-calculator')}
            className="hover:text-[#1A1A1A] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#C5A059] hover:after:w-full after:transition-all whitespace-nowrap shrink-0 cursor-pointer"
          >
            Mortgage
          </button>
          <button
            onClick={() => handleNavClick('gallery')}
            className="hover:text-[#1A1A1A] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#C5A059] hover:after:w-full after:transition-all whitespace-nowrap shrink-0 cursor-pointer"
          >
            Gallery
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="hidden lg:flex items-center gap-4 shrink-0">
          <button
            onClick={() => {
              if (onOpenScheduler) onOpenScheduler();
              const el = document.getElementById('viewing-scheduler');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-5 py-2.5 text-xs font-semibold tracking-wider uppercase text-white bg-[#1A1A1A] hover:bg-[#33312E] rounded-none border border-[#1A1A1A] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            VIP Viewing
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex lg:hidden items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#1A1A1A] hover:text-[#C5A059] transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF9F5] border-b border-[#E7E4DC] px-6 py-6 space-y-4">
          <div className="flex flex-col space-y-3 text-sm font-medium text-[#2E2C29]">
            <button
              onClick={() => handleNavClick('portfolio', 'all')}
              className="text-left py-2 hover:text-[#C5A059] transition-colors"
            >
              All Portfolio
            </button>
            <button
              onClick={() => handleNavClick('portfolio', 'residential')}
              className="text-left py-2 hover:text-[#C5A059] transition-colors"
            >
              Residential Estates
            </button>
            <button
              onClick={() => handleNavClick('portfolio', 'commercial')}
              className="text-left py-2 hover:text-[#C5A059] transition-colors"
            >
              Commercial Holdings
            </button>
            <button
              onClick={() => handleNavClick('floor-plans')}
              className="text-left py-2 hover:text-[#C5A059] transition-colors"
            >
              Interactive Blueprints
            </button>
            <button
              onClick={() => handleNavClick('mortgage-calculator')}
              className="text-left py-2 hover:text-[#C5A059] transition-colors"
            >
              Mortgage Calculator
            </button>
            <button
              onClick={() => handleNavClick('gallery')}
              className="text-left py-2 hover:text-[#C5A059] transition-colors"
            >
              Architectural Gallery
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className="text-left py-2 hover:text-[#C5A059] transition-colors"
            >
              About NEXTR Advisory
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="text-left py-2 hover:text-[#C5A059] transition-colors"
            >
              Contact & Inquiries
            </button>
          </div>
          <div className="pt-4 border-t border-[#E7E4DC]">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenScheduler) onOpenScheduler();
                const el = document.getElementById('viewing-scheduler');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full py-3 text-xs font-semibold tracking-wider uppercase text-white bg-[#1A1A1A] hover:bg-[#33312E] transition-colors"
            >
              Schedule VIP Viewing
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
