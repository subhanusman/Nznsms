import React, { useState } from 'react';
import { Heart, ArrowUpRight, Calculator, Calendar } from 'lucide-react';
import { Property } from '../types/property';

interface PropertyCardProps {
  property: Property;
  onOpenDetails: (property: Property) => void;
  onSelectForMortgage: (property: Property) => void;
  onScheduleViewing: (property: Property) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onOpenDetails,
  onSelectForMortgage,
  onScheduleViewing,
  isFavorite,
  onToggleFavorite,
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <article className="group bg-white border border-[#E5E1D8] transition-all hover:border-[#C5A059] flex flex-col h-full">
      {/* Visual Asset Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#EFECE5]">
        {!imageError ? (
          <img
            src={property.mainImage}
            alt={property.title}
            onError={() => setImageError(true)}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#E8E4DA] text-[#6E685F]">
            <span className="font-serif-luxury text-xl text-[#3A3834] mb-1">{property.title}</span>
            <span className="text-xs uppercase tracking-wider text-[#9E7B3B]">{property.location}</span>
          </div>
        )}

        {/* Favorite affordance */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(property.id);
          }}
          className="absolute top-4 right-4 p-2 bg-white/90 hover:bg-white text-[#1A1A1A] transition-colors border border-black/5 z-10 cursor-pointer"
          aria-label={isFavorite ? 'Remove from saved demonstrations' : 'Save demonstration property'}
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isFavorite ? 'fill-[#C5A059] text-[#C5A059]' : 'text-[#4A4742]'
            }`}
          />
        </button>

        {/* Subdued Status Kicker (unboxed clean text) */}
        <div className="absolute bottom-3 left-4 text-[11px] font-medium tracking-wider uppercase text-white bg-black/60 px-2.5 py-1 backdrop-blur-xs">
          {property.status}
        </div>
      </div>

      {/* Content & Specifications */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Location & Style unboxed metadata */}
          <div className="text-xs text-[#706B62] flex items-center gap-1.5 font-medium tracking-wide">
            <span>{property.location}</span>
            <span aria-hidden="true">·</span>
            <span>{property.propertyType}</span>
          </div>

          {/* Title */}
          <h3
            onClick={() => onOpenDetails(property)}
            className="mt-2 font-serif-luxury text-xl sm:text-2xl font-normal text-[#1A1A1A] group-hover:text-[#9E7B3B] transition-colors cursor-pointer leading-snug line-clamp-1"
          >
            {property.title}
          </h3>

          <p className="mt-1.5 text-xs text-[#5C574F] line-clamp-2 leading-relaxed">
            {property.tagline}
          </p>

          {/* Unboxed architectural metadata with typographic dots */}
          <div className="mt-4 pt-3 border-t border-[#EAE6DE] flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#4A4843]">
            {property.bedrooms > 0 && (
              <>
                <span>{property.bedrooms} Beds</span>
                <span aria-hidden="true" className="text-[#BDB7AB]">·</span>
              </>
            )}
            <span>{property.bathrooms} Baths</span>
            <span aria-hidden="true" className="text-[#BDB7AB]">·</span>
            <span className="tabular-nums">{property.interiorSqFt.toLocaleString()} sq ft</span>
            <span aria-hidden="true" className="text-[#BDB7AB]">·</span>
            <span>Built {property.yearBuilt}</span>
          </div>
        </div>

        {/* Price & Action Row */}
        <div className="mt-6 pt-4 border-t border-[#EAE6DE] flex items-center justify-between gap-2">
          <div>
            <span className="block text-[10px] uppercase tracking-wider text-[#7A746B] font-semibold">
              Valuation
            </span>
            <span className="font-serif-luxury text-xl font-semibold text-[#1A1A1A] tabular-nums">
              {property.priceFormatted}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onSelectForMortgage(property)}
              title="Estimate monthly financing"
              className="p-2 text-[#5A564F] hover:text-[#1A1A1A] hover:bg-[#F2EFE8] border border-transparent hover:border-[#DDD9CE] transition-all cursor-pointer"
              aria-label="Calculate mortgage for this property"
            >
              <Calculator className="w-4 h-4" />
            </button>
            <button
              onClick={() => onScheduleViewing(property)}
              title="Schedule VIP viewing"
              className="p-2 text-[#5A564F] hover:text-[#1A1A1A] hover:bg-[#F2EFE8] border border-transparent hover:border-[#DDD9CE] transition-all cursor-pointer"
              aria-label="Schedule VIP viewing for this property"
            >
              <Calendar className="w-4 h-4" />
            </button>
            <button
              onClick={() => onOpenDetails(property)}
              className="px-3 py-2 text-xs font-semibold tracking-wider uppercase text-white bg-[#1A1A1A] hover:bg-[#33312E] transition-colors inline-flex items-center gap-1 cursor-pointer shrink-0"
            >
              <span>Inspect</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
