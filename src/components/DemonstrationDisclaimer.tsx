import React, { useState } from 'react';
import { AlertCircle, X } from 'lucide-react';

export const DemonstrationDisclaimer: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <aside aria-label="Demonstration Notice" className="bg-[#1C1B19] text-[#E6E1D8] border-b border-[#302D27] text-xs py-2 px-4 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 text-[#C5A059] shrink-0" aria-hidden="true" />
          <p className="tracking-wide">
            <span className="font-semibold text-[#D4AF37] uppercase tracking-wider text-[11px] mr-2">Demonstration Showcase</span>
            <span>All properties, architectural blueprints, prices, and viewing bookings on this site are simulated fictional content created for NEXTR Digital Solutions & Services. No real-world availability is implied.</span>
          </p>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="text-[#9C9487] hover:text-[#FAF9F5] p-1 transition-colors shrink-0"
          aria-label="Dismiss demonstration notice"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
};
