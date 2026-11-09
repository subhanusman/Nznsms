import React, { useState, useMemo } from 'react';
import { PROPERTIES } from './data/properties';
import { Property, FilterState } from './types/property';
import { DemonstrationDisclaimer } from './components/DemonstrationDisclaimer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PropertyFilters } from './components/PropertyFilters';
import { PropertyCard } from './components/PropertyCard';
import { PropertyDetailModal } from './components/PropertyDetailModal';
import { FloorPlanDemo } from './components/FloorPlanDemo';
import { MortgageCalculator } from './components/MortgageCalculator';
import { ViewingScheduler } from './components/ViewingScheduler';
import { GallerySection } from './components/GallerySection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

const initialFilters: FilterState = {
  searchQuery: '',
  category: 'all',
  propertyType: 'all',
  minPrice: 0,
  maxPrice: 0,
  minBedrooms: 0,
  sortBy: 'featured',
};

export default function App() {
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [favorites, setFavorites] = useState<string[]>(['azure-coast-villa']);
  const [selectedPropertyModal, setSelectedPropertyModal] = useState<Property | null>(null);
  const [selectedPropertyForMortgage, setSelectedPropertyForMortgage] = useState<Property | null>(null);
  const [preselectedPropertyIdForScheduler, setPreselectedPropertyIdForScheduler] = useState<string>('azure-coast-villa');

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleResetFilters = () => {
    setFilters(initialFilters);
  };

  const handleToggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectForMortgage = (property: Property) => {
    setSelectedPropertyForMortgage(property);
    const element = document.getElementById('mortgage-calculator');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScheduleViewing = (property: Property) => {
    setPreselectedPropertyIdForScheduler(property.id);
    const element = document.getElementById('viewing-scheduler');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenSchedulerFromGlobal = (propertyId?: string) => {
    if (propertyId) {
      setPreselectedPropertyIdForScheduler(propertyId);
    }
    const element = document.getElementById('viewing-scheduler');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filtered & Sorted Properties List
  const filteredProperties = useMemo(() => {
    return PROPERTIES.filter((property) => {
      // Category filter
      if (filters.category !== 'all' && property.category !== filters.category) {
        return false;
      }
      // Property type filter
      if (filters.propertyType !== 'all' && property.propertyType !== filters.propertyType) {
        return false;
      }
      // Min bedrooms filter
      if (filters.minBedrooms > 0 && property.bedrooms < filters.minBedrooms) {
        return false;
      }
      // Max price filter
      if (filters.maxPrice > 0 && property.price > filters.maxPrice) {
        return false;
      }
      // Keyword search query
      if (filters.searchQuery.trim() !== '') {
        const query = filters.searchQuery.toLowerCase();
        const matchesTitle = property.title.toLowerCase().includes(query);
        const matchesLocation = property.location.toLowerCase().includes(query);
        const matchesCity = property.city.toLowerCase().includes(query);
        const matchesType = property.propertyType.toLowerCase().includes(query);
        const matchesCountry = property.country.toLowerCase().includes(query);
        if (!matchesTitle && !matchesLocation && !matchesCity && !matchesType && !matchesCountry) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-desc') {
        return b.price - a.price;
      }
      if (filters.sortBy === 'price-asc') {
        return a.price - b.price;
      }
      if (filters.sortBy === 'sqft-desc') {
        return b.interiorSqFt - a.interiorSqFt;
      }
      // 'featured'
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [filters]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F5] text-[#1A1A1A]">
      {/* 1. Demonstration Disclaimer Notice */}
      <DemonstrationDisclaimer />

      {/* 2. Top Bar Contract Header */}
      <Header
        onSelectCategory={(cat) => handleFilterChange({ category: cat })}
        onOpenScheduler={handleOpenSchedulerFromGlobal}
      />

      {/* 3. Hero Section with 2-Column Split & Quick Search Strip */}
      <Hero
        filters={filters}
        onFilterChange={handleFilterChange}
        onSearchSubmit={() => {
          const el = document.getElementById('portfolio');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenScheduler={() => handleOpenSchedulerFromGlobal()}
      />

      {/* 4. Portfolio Showcase (Residential & Commercial) */}
      <section id="portfolio" className="py-16 lg:py-24 max-w-7xl mx-auto px-6 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#E7E4DC]">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9E7B3B] mb-2 flex items-center gap-2">
              <span>Curated Demonstrations</span>
              <span aria-hidden="true">·</span>
              <span>Global Sovereign Portfolios</span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1A1A1A]">
              Residential & Commercial Portfolio
            </h2>
            <p className="mt-2 text-sm text-[#5C574F] max-w-xl">
              Discover private residential sanctuaries, penthouses, and landmark commercial towers. Filter by asset class, scale, or valuation.
            </p>
          </div>

          <div className="text-xs text-[#706B62] tabular-nums">
            Showing <strong className="text-[#1A1A1A]">{filteredProperties.length}</strong> of{' '}
            {PROPERTIES.length} demonstration assets
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="mt-8">
          <PropertyFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onResetFilters={handleResetFilters}
            totalCount={PROPERTIES.length}
          />
        </div>

        {/* Property Grid */}
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onOpenDetails={(prop) => setSelectedPropertyModal(prop)}
                onSelectForMortgage={handleSelectForMortgage}
                onScheduleViewing={handleScheduleViewing}
                isFavorite={favorites.includes(property.id)}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
        ) : (
          <div className="py-16 px-6 bg-white border border-[#DDD9CE] text-center max-w-lg mx-auto">
            <h3 className="font-serif-luxury text-2xl font-normal text-[#1A1A1A]">
              No Matching Portfolio Assets
            </h3>
            <p className="mt-2 text-xs text-[#706B62]">
              No properties matched your current filter criteria. Try adjusting your filters or keyword query.
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-6 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#1A1A1A] hover:bg-[#33312E] transition-colors cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </section>

      {/* 5. Architectural Blueprint & Floor Plan Laboratory */}
      <FloorPlanDemo
        properties={PROPERTIES}
        onSelectProperty={(id) => {
          const prop = PROPERTIES.find((p) => p.id === id);
          if (prop) setSelectedPropertyForMortgage(prop);
        }}
        onOpenScheduler={handleOpenSchedulerFromGlobal}
      />

      {/* 6. Illustrative Local JavaScript Mortgage Calculator */}
      <MortgageCalculator
        properties={PROPERTIES}
        preselectedProperty={selectedPropertyForMortgage}
        onOpenScheduler={handleOpenSchedulerFromGlobal}
      />

      {/* 7. VIP Property Viewing Concierge */}
      <ViewingScheduler
        properties={PROPERTIES}
        preselectedPropertyId={preselectedPropertyIdForScheduler}
      />

      {/* 8. Curated Architectural Visual Archive */}
      <GallerySection />

      {/* 9. About NEXTR Haven & Stone Philosophy */}
      <AboutSection />

      {/* 10. Contact & Advisory Inquiry Section */}
      <ContactSection />

      {/* 11. Footer with exact attribution */}
      <Footer />

      {/* 12. Property Detail Modal */}
      <PropertyDetailModal
        property={selectedPropertyModal}
        onClose={() => setSelectedPropertyModal(null)}
        onSelectForMortgage={handleSelectForMortgage}
        onScheduleViewing={handleScheduleViewing}
        isFavorite={selectedPropertyModal ? favorites.includes(selectedPropertyModal.id) : false}
        onToggleFavorite={handleToggleFavorite}
      />
    </div>
  );
}
