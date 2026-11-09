import React, { useState, useEffect } from 'react';
import { X, Heart, ChevronLeft, ChevronRight, Layers, Compass, Calculator, Calendar, CheckCircle2, ShieldAlert } from 'lucide-react';
import { Property, RoomDetail } from '../types/property';

interface PropertyDetailModalProps {
  property: Property | null;
  onClose: () => void;
  onSelectForMortgage: (property: Property) => void;
  onScheduleViewing: (property: Property) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({
  property,
  onClose,
  onSelectForMortgage,
  onScheduleViewing,
  isFavorite,
  onToggleFavorite,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'overview' | 'amenities' | 'blueprint'>('overview');
  const [activeFloorIndex, setActiveFloorIndex] = useState(0);
  const [activeRoom, setActiveRoom] = useState<RoomDetail | null>(null);

  useEffect(() => {
    setActiveImageIndex(0);
    setActiveTab('overview');
    setActiveFloorIndex(0);
    if (property && property.floors[0]?.rooms[0]) {
      setActiveRoom(property.floors[0].rooms[0]);
    } else {
      setActiveRoom(null);
    }
  }, [property]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!property) return null;

  const currentFloor = property.floors[activeFloorIndex] || property.floors[0];

  const handlePrevImage = () => {
    setActiveImageIndex((prev) =>
      prev === 0 ? property.galleryImages.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setActiveImageIndex((prev) =>
      prev === property.galleryImages.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="property-modal-title"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto"
    >
      <div className="relative bg-[#FAF9F5] border border-[#DDD9CE] w-full max-w-5xl my-auto shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E7E4DC] bg-white">
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#9E7B3B]">
              Demonstration Dossier // Ref: {property.id.toUpperCase()}
            </span>
            <span className="text-xs text-[#706B62] hidden sm:inline">
              · {property.location}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleFavorite(property.id)}
              className="p-2 text-[#4A4742] hover:text-[#C5A059] transition-colors cursor-pointer"
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart
                className={`w-5 h-5 ${
                  isFavorite ? 'fill-[#C5A059] text-[#C5A059]' : ''
                }`}
              />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-[#4A4742] hover:text-[#1A1A1A] transition-colors cursor-pointer"
              aria-label="Close property details"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto flex-1 p-6 space-y-8">
          {/* Main Photo Carousel & Gallery Preview */}
          <div className="space-y-3">
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#E2DFD6] border border-[#DDD9CE]">
              <img
                src={property.galleryImages[activeImageIndex]?.url || property.mainImage}
                alt={property.galleryImages[activeImageIndex]?.caption || property.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />

              {/* Prev / Next controls */}
              {property.galleryImages.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/60 hover:bg-black/80 text-white transition-colors cursor-pointer"
                    aria-label="Previous photograph"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/60 hover:bg-black/80 text-white transition-colors cursor-pointer"
                    aria-label="Next photograph"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Caption Overlay */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 text-white flex items-center justify-between text-xs">
                <span>{property.galleryImages[activeImageIndex]?.caption}</span>
                <span className="font-mono text-[11px] tabular-nums text-[#D4AF37]">
                  {activeImageIndex + 1} / {property.galleryImages.length}
                </span>
              </div>
            </div>

            {/* Thumbnail Strip */}
            {property.galleryImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {property.galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-24 h-16 shrink-0 overflow-hidden border transition-all cursor-pointer ${
                      activeImageIndex === idx
                        ? 'border-[#9E7B3B] ring-1 ring-[#9E7B3B]'
                        : 'border-[#DDD9CE] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img.url}
                      alt={img.caption}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Title & Valuation Hero Banner */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#E7E4DC]">
            <div>
              <div className="text-xs text-[#706B62] flex items-center gap-2 font-medium tracking-wide">
                <span>{property.location}</span>
                <span aria-hidden="true">·</span>
                <span>{property.propertyType}</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#9E7B3B] font-semibold">{property.status}</span>
              </div>
              <h2 id="property-modal-title" className="font-serif-luxury text-3xl sm:text-4xl font-normal text-[#1A1A1A] mt-1">
                {property.title}
              </h2>
              <p className="mt-1 text-sm text-[#5C574F]">
                {property.tagline}
              </p>
            </div>

            <div className="text-left md:text-right shrink-0">
              <span className="block text-xs uppercase tracking-wider text-[#7A746B] font-semibold">
                Illustrative Valuation
              </span>
              <span className="font-serif-luxury text-3xl sm:text-4xl font-semibold text-[#1A1A1A] tabular-nums">
                {property.priceFormatted}
              </span>
            </div>
          </div>

          {/* Key Specifications Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 p-4 bg-white border border-[#E7E4DC] text-xs">
            {property.bedrooms > 0 && (
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#7A746B] font-semibold block">Bedrooms</span>
                <span className="font-semibold text-sm text-[#1A1A1A] tabular-nums">{property.bedrooms} Suites</span>
              </div>
            )}
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#7A746B] font-semibold block">Bathrooms</span>
              <span className="font-semibold text-sm text-[#1A1A1A] tabular-nums">{property.bathrooms} Baths</span>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#7A746B] font-semibold block">Interior Living</span>
              <span className="font-semibold text-sm text-[#1A1A1A] tabular-nums">{property.interiorSqFt.toLocaleString()} sq ft</span>
            </div>
            {property.lotSqFt && (
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#7A746B] font-semibold block">Site Grounds</span>
                <span className="font-semibold text-sm text-[#1A1A1A] tabular-nums">{property.lotSqFt.toLocaleString()} sq ft</span>
              </div>
            )}
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#7A746B] font-semibold block">Year Engineered</span>
              <span className="font-semibold text-sm text-[#1A1A1A] tabular-nums">{property.yearBuilt}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#7A746B] font-semibold block">Architectural Form</span>
              <span className="font-semibold text-sm text-[#1A1A1A] truncate block" title={property.architecturalStyle}>
                {property.architecturalStyle}
              </span>
            </div>
          </div>

          {/* Navigation Tabs (Overview, Amenities, Blueprint Demo) */}
          <div className="border-b border-[#E7E4DC] flex gap-6 text-sm font-medium">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-3 transition-colors relative cursor-pointer ${
                activeTab === 'overview'
                  ? 'text-[#1A1A1A] font-semibold border-b-2 border-[#C5A059]'
                  : 'text-[#706B62] hover:text-[#1A1A1A]'
              }`}
            >
              Architectural Overview
            </button>
            <button
              onClick={() => setActiveTab('amenities')}
              className={`pb-3 transition-colors relative cursor-pointer ${
                activeTab === 'amenities'
                  ? 'text-[#1A1A1A] font-semibold border-b-2 border-[#C5A059]'
                  : 'text-[#706B62] hover:text-[#1A1A1A]'
              }`}
            >
              Bespoke Amenities ({property.amenities.reduce((acc, curr) => acc + curr.items.length, 0)})
            </button>
            <button
              onClick={() => setActiveTab('blueprint')}
              className={`pb-3 transition-colors relative cursor-pointer ${
                activeTab === 'blueprint'
                  ? 'text-[#1A1A1A] font-semibold border-b-2 border-[#C5A059]'
                  : 'text-[#706B62] hover:text-[#1A1A1A]'
              }`}
            >
              Interactive Floor Plans ({property.floors.length} Levels)
            </button>
          </div>

          {/* Tab Content: Overview */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="prose text-sm text-[#47443E] leading-relaxed space-y-4">
                {property.description.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              {/* Key Highlights */}
              <div className="p-5 bg-white border border-[#E7E4DC]">
                <h4 className="text-xs uppercase tracking-wider text-[#9E7B3B] font-semibold mb-3">
                  Key Architectural & Investment Highlights
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-[#3D3A35]">
                  {property.keyHighlights.map((hl, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab Content: Amenities */}
          {activeTab === 'amenities' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {property.amenities.map((category, idx) => (
                <div key={idx} className="p-5 bg-white border border-[#E7E4DC]">
                  <h4 className="font-serif-luxury text-lg text-[#1A1A1A] font-semibold border-b border-[#EAE6DE] pb-2 mb-3">
                    {category.category}
                  </h4>
                  <ul className="space-y-2 text-xs text-[#4A4843]">
                    {category.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#C5A059] font-bold">·</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* Tab Content: Blueprint Demonstration */}
          {activeTab === 'blueprint' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#9E7B3B]" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#1A1A1A]">
                    Select Level:
                  </span>
                  <div className="flex gap-2">
                    {property.floors.map((fl, idx) => (
                      <button
                        key={fl.levelId}
                        onClick={() => {
                          setActiveFloorIndex(idx);
                          setActiveRoom(fl.rooms[0] || null);
                        }}
                        className={`px-3 py-1 text-xs font-medium border transition-colors cursor-pointer ${
                          activeFloorIndex === idx
                            ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                            : 'bg-white text-[#5C574F] border-[#DDD9CE]'
                        }`}
                      >
                        {fl.levelName}
                      </button>
                    ))}
                  </div>
                </div>

                <span className="text-xs text-[#706B62] tabular-nums">
                  Enclosed Gross: <strong>{currentFloor?.totalAreaSqFt.toLocaleString()} sq ft</strong>
                </span>
              </div>

              {/* 2D Interactive Map */}
              <div className="bg-[#18191C] border border-[#2B2D33] p-6 text-white relative min-h-[360px] flex flex-col justify-between overflow-hidden">
                <div className="flex items-center justify-between text-xs text-stone-400 border-b border-white/10 pb-2">
                  <span className="text-[#D4AF37] font-mono text-[11px]">{currentFloor?.levelName}</span>
                  <span className="font-mono text-[11px]">CLICK ROOM MARKERS FOR SPECIFICATIONS</span>
                </div>

                {/* Hotspot Layout */}
                <div className="relative w-full aspect-[16/8] border border-[#D4AF37]/30 my-6 bg-[#121316] p-4">
                  {currentFloor?.rooms.map((room) => {
                    const isSelected = activeRoom?.id === room.id;
                    return (
                      <button
                        key={room.id}
                        onClick={() => setActiveRoom(room)}
                        style={{
                          left: `${room.xPercent}%`,
                          top: `${room.yPercent}%`,
                        }}
                        className={`absolute -translate-x-1/2 -translate-y-1/2 p-2 transition-all cursor-pointer z-10 text-left ${
                          isSelected
                            ? 'bg-[#C5A059] text-black font-semibold ring-2 ring-white'
                            : 'bg-[#22242A] text-white hover:bg-[#333742] border border-white/20'
                        }`}
                      >
                        <div className="text-xs">{room.name}</div>
                        <div className="text-[10px] tabular-nums opacity-80">{room.dimensions}</div>
                      </button>
                    );
                  })}
                </div>

                {activeRoom && (
                  <div className="p-3 bg-white/5 border border-white/10 text-xs flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <strong className="text-[#D4AF37]">{activeRoom.name}:</strong> {activeRoom.description}
                    </div>
                    <div className="text-[11px] text-stone-300 tabular-nums">
                      {activeRoom.areaSqFt} sq ft · {activeRoom.dimensions}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Fictional Demonstration Alert inside Modal */}
          <div className="p-3 bg-[#FAF8F2] border border-[#E7E2D5] flex items-center gap-2.5 text-xs text-[#706B62]">
            <ShieldAlert className="w-4 h-4 text-[#C5A059] shrink-0" />
            <span>Fictional demonstration listing created for NEXTR Digital Solutions & Services. Not available for purchase or real-world transaction.</span>
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="p-4 sm:p-6 bg-white border-t border-[#E7E4DC] flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs text-[#706B62]">
            Representative Broker: <strong className="text-[#1A1A1A]">NEXTR Private Client Advisory</strong>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                onClose();
                onSelectForMortgage(property);
              }}
              className="px-4 py-2.5 text-xs font-semibold tracking-wider uppercase text-[#1A1A1A] hover:bg-[#FAF9F5] border border-[#DDD9CE] transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Calculator className="w-3.5 h-3.5 text-[#9E7B3B]" />
              <span>Mortgage Simulator</span>
            </button>
            <button
              onClick={() => {
                onClose();
                onScheduleViewing(property);
              }}
              className="px-5 py-2.5 text-xs font-semibold tracking-wider uppercase text-white bg-[#1A1A1A] hover:bg-[#33312E] transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Schedule VIP Viewing</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
