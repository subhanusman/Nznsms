import React from 'react';
import { Mail, MessageCircle, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#141416] text-[#A6A29A] border-t border-[#26262A] pt-16 pb-12 text-xs">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-[#26262A]">
          {/* Brand & Monogram Column */}
          <div className="lg:col-span-5 space-y-4">
            <a
              href="#"
              className="font-serif-luxury text-2xl tracking-[0.04em] font-medium text-[#FAF9F5] block"
            >
              NEXTR Haven & Stone
            </a>
            <p className="text-xs text-[#807C74] max-w-sm leading-relaxed">
              A high-end architectural demonstration portfolio curated for NEXTR Digital Solutions & Services. Featuring fictional residential estates, sky-high penthouses, and commercial headquarters.
            </p>
            <div className="text-[11px] text-[#C5A059] tracking-wider uppercase font-semibold">
              Fictional Portfolio Demonstration
            </div>
          </div>

          {/* Quick Portfolio Navigation */}
          <div className="lg:col-span-3 space-y-3">
            <span className="text-[11px] uppercase tracking-wider text-[#FAF9F5] font-semibold block mb-3">
              Portfolio Navigation
            </span>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => scrollTo('portfolio')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Residential Estates
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('portfolio')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Commercial Holdings
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('floor-plans')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Interactive Blueprints
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('mortgage-calculator')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Mortgage Calculator
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('gallery')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Architectural Visual Archive
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('viewing-scheduler')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  VIP Viewing Concierge
                </button>
              </li>
            </ul>
          </div>

          {/* Direct Communication Channels */}
          <div className="lg:col-span-4 space-y-3">
            <span className="text-[11px] uppercase tracking-wider text-[#FAF9F5] font-semibold block mb-3">
              Developer & Advisory Contacts
            </span>
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C5A059] shrink-0" />
                <a
                  href="mailto:nextrsolutions@gmail.com"
                  className="text-white hover:text-[#C5A059] transition-colors"
                >
                  nextrsolutions@gmail.com
                </a>
              </div>

              {/* Exact WhatsApp CTA: Visible text must say exactly "Visit", phone number NEVER visible */}
              <div className="flex items-center gap-2.5 pt-1">
                <MessageCircle className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span className="text-[#807C74]">WhatsApp Advisory:</span>
                <a
                  href="https://wa.me/923239943441"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white transition-colors inline-flex items-center gap-1 font-semibold text-[11px] uppercase tracking-wider"
                >
                  <span>Visit</span>
                  <ArrowUpRight className="w-3 h-3 text-[#C5A059]" />
                </a>
              </div>
            </div>

            <div className="pt-4 text-[11px] text-[#706B62] leading-relaxed">
              Demonstration prototype built for high-performance static hosting on Cloudflare Pages.
            </div>
          </div>
        </div>

        {/* Bottom Bar with EXACT Required Attribution */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#706B62]">
          <p className="text-[#A6A29A]">
            Developed by NEXTR Digital Solutions & Services
          </p>

          <p className="text-[11px] text-[#807C74] text-center sm:text-right">
            © {new Date().getFullYear()} NEXTR Haven & Stone. All property listings, floor plans, and financial estimates are fictional demonstration materials.
          </p>
        </div>
      </div>
    </footer>
  );
};
