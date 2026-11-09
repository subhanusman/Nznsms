import React, { useState, useEffect } from 'react';
import { Maximize2, X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { GALLERY_ITEMS, GalleryItem } from '../data/gallery';

export const GallerySection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = [
    { id: 'all', label: 'All Perspectives' },
    { id: 'pools', label: 'Pools & Terraces' },
    { id: 'interiors', label: 'Bespoke Interiors' },
    { id: 'commercial', label: 'Commercial Atriums' },
    { id: 'kitchens', label: 'Chef Kitchens' },
    { id: 'architecture', label: 'Architectural Details' },
  ];

  const filteredItems =
    selectedCategory === 'all'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === selectedCategory);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) =>
          prev !== null ? (prev + 1) % filteredItems.length : null
        );
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : null
        );
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredItems.length]);

  return (
    <section id="gallery" className="py-16 lg:py-24 bg-[#FAF9F5] border-b border-[#E5E1D8]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#E7E4DC]">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9E7B3B] mb-2 flex items-center gap-2">
              <span>Visual Curation</span>
              <span aria-hidden="true">·</span>
              <span>Architectural Photography</span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#1A1A1A] font-normal">
              Portfolio Visual Archive
            </h2>
            <p className="mt-2 text-sm text-[#5C574F] max-w-xl">
              Immerse yourself in high-resolution captures of private Mediterranean terraces, double-height Manhattan salons, and sculptural commercial atriums.
            </p>
          </div>

          {/* Interactive Filter Buttons */}
          <div className="flex flex-wrap gap-1 p-1 bg-white border border-[#DDD9CE]">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-medium tracking-wide transition-colors cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#1A1A1A] text-white shadow-xs'
                    : 'text-[#6E685F] hover:text-[#1A1A1A]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setLightboxIndex(idx)}
              className="group relative overflow-hidden bg-[#EAE6DD] border border-[#DDD9CE] cursor-pointer aspect-[4/3] flex flex-col justify-end"
            >
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 transition-opacity" />

              {/* Hover inspect badge */}
              <div className="absolute top-3 right-3 p-1.5 bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-xs">
                <Maximize2 className="w-4 h-4 text-[#D4AF37]" />
              </div>

              {/* Caption Content */}
              <div className="relative z-10 p-4 text-white">
                <span className="text-[10px] uppercase tracking-wider text-[#D4AF37] font-semibold block mb-0.5">
                  {item.categoryLabel}
                </span>
                <h4 className="font-serif-luxury text-base sm:text-lg font-medium leading-snug">
                  {item.title}
                </h4>
                <p className="text-[11px] text-stone-300 mt-1 line-clamp-1">
                  {item.location}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Fullscreen Lightbox Modal */}
        {lightboxIndex !== null && filteredItems[lightboxIndex] && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Image gallery lightbox"
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-lg flex items-center justify-center p-4 sm:p-8"
          >
            {/* Lightbox Controls */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 p-2 text-stone-300 hover:text-white transition-colors cursor-pointer z-50"
              aria-label="Close lightbox"
            >
              <X className="w-7 h-7" />
            </button>

            <button
              onClick={() =>
                setLightboxIndex((prev) =>
                  prev !== null
                    ? (prev - 1 + filteredItems.length) % filteredItems.length
                    : null
                )
              }
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-50"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={() =>
                setLightboxIndex((prev) =>
                  prev !== null ? (prev + 1) % filteredItems.length : null
                )
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-50"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Lightbox Image Container */}
            <div className="max-w-5xl w-full flex flex-col items-center">
              <div className="relative max-h-[75vh] w-full flex items-center justify-center overflow-hidden border border-white/10 bg-black/40">
                <img
                  src={filteredItems[lightboxIndex].image}
                  alt={filteredItems[lightboxIndex].title}
                  className="max-h-[75vh] w-auto max-w-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Lightbox Details Bar */}
              <div className="mt-4 w-full flex flex-col sm:flex-row items-start sm:items-center justify-between text-white gap-2 border-t border-white/10 pt-3">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#D4AF37] font-semibold block">
                    {filteredItems[lightboxIndex].categoryLabel} · {filteredItems[lightboxIndex].location}
                  </span>
                  <h3 className="font-serif-luxury text-xl font-normal">
                    {filteredItems[lightboxIndex].title}
                  </h3>
                  <p className="text-xs text-stone-400 mt-0.5 max-w-2xl">
                    {filteredItems[lightboxIndex].description}
                  </p>
                </div>
                <div className="font-mono text-xs text-[#D4AF37] tabular-nums shrink-0">
                  {lightboxIndex + 1} / {filteredItems.length}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
