import React, { useId } from 'react';
import { Search, SlidersHorizontal, ArrowUpDown, X, RotateCcw } from 'lucide-react';
import { FilterState } from '../types/property';

interface PropertyFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: Partial<FilterState>) => void;
  onResetFilters: () => void;
  totalCount: number;
}

export const PropertyFilters: React.FC<PropertyFiltersProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  totalCount,
}) => {
  const propertySearchId = useId();
  const propertyTypeSelectId = useId();
  const maxPriceSelectId = useId();
  const bedroomCountSelectId = useId();
  const sortSelectId = useId();

  const propertyTypes = [
    { value: 'all', label: 'All Property Styles' },
    { value: 'Villa', label: 'Villas & Estates' },
    { value: 'Penthouse', label: 'Penthouses & Sky Residences' },
    { value: 'Townhouse', label: 'Historic Townhouses' },
    { value: 'Historic Estate', label: 'Heritage Waterfont Estates' },
    { value: 'Office Tower', label: 'Grade-A Office Towers' },
    { value: 'Retail Flagship', label: 'High-Street Retail Flagships' },
    { value: 'Tech Campus', label: 'Innovation Campuses' },
  ];

  const priceOptions = [
    { value: 0, label: 'Any Valuation' },
    { value: 25000000, label: 'Up to $25,000,000' },
    { value: 50000000, label: 'Up to $50,000,000' },
    { value: 100000000, label: 'Up to $100,000,000' },
    { value: 200000000, label: 'Up to $200,000,000' },
  ];

  const isFiltered =
    filters.searchQuery !== '' ||
    filters.category !== 'all' ||
    filters.propertyType !== 'all' ||
    filters.maxPrice !== 0 ||
    filters.minBedrooms !== 0 ||
    filters.sortBy !== 'featured';

  return (
    <div className="bg-white border border-[#E7E4DC] p-5 shadow-xs mb-8">
      {/* Category Segmented Control & Status Counter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#ECE8E0]">
        {/* Interactive Segmented Category Filter */}
        <div className="flex flex-wrap items-center gap-1 p-1 bg-[#FAF9F5] border border-[#DDD9CE]">
          <button
            onClick={() => onFilterChange({ category: 'all' })}
            className={`px-4 py-2 text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer ${
              filters.category === 'all'
                ? 'bg-[#1A1A1A] text-white shadow-xs'
                : 'text-[#69645B] hover:text-[#1A1A1A]'
            }`}
          >
            All Holdings ({totalCount})
          </button>
          <button
            onClick={() => onFilterChange({ category: 'residential' })}
            className={`px-4 py-2 text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer ${
              filters.category === 'residential'
                ? 'bg-[#1A1A1A] text-white shadow-xs'
                : 'text-[#69645B] hover:text-[#1A1A1A]'
            }`}
          >
            Residential Estates
          </button>
          <button
            onClick={() => onFilterChange({ category: 'commercial' })}
            className={`px-4 py-2 text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer ${
              filters.category === 'commercial'
                ? 'bg-[#1A1A1A] text-white shadow-xs'
                : 'text-[#69645B] hover:text-[#1A1A1A]'
            }`}
          >
            Commercial Holdings
          </button>
        </div>

        {/* Sort & Reset Actions */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-[#5C574F]">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#9E7B3B]" />
            <label htmlFor={sortSelectId} className="font-semibold uppercase tracking-wider text-[11px]">
              Sort:
            </label>
            <select
              id={sortSelectId}
              value={filters.sortBy}
              onChange={(e) => onFilterChange({ sortBy: e.target.value as any })}
              className="px-2.5 py-1.5 text-xs bg-[#FAF9F6] border border-[#DDD9CE] focus:outline-none focus:border-[#C5A059] text-[#1A1A1A] cursor-pointer"
            >
              <option value="featured">Curated Demonstration Order</option>
              <option value="price-desc">Valuation: High to Low</option>
              <option value="price-asc">Valuation: Low to High</option>
              <option value="sqft-desc">Enclosed Area: Largest First</option>
            </select>
          </div>

          {isFiltered && (
            <button
              onClick={onResetFilters}
              className="px-3 py-1.5 text-xs text-[#807A70] hover:text-[#1A1A1A] border border-[#DDD9CE] hover:border-[#1A1A1A] transition-colors flex items-center gap-1 cursor-pointer"
              title="Reset all filters"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Secondary Controls Bar: Type, Price Range, Bedrooms & Search */}
      <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
        {/* Search Keyword */}
        <div className="relative">
          <label htmlFor={propertySearchId} className="sr-only">Search properties</label>
          <Search className="w-4 h-4 text-[#9C9487] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            id={propertySearchId}
            type="text"
            placeholder="Search title, city, country..."
            value={filters.searchQuery}
            onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
            className="w-full pl-9 pr-8 py-2 bg-[#FAF9F6] border border-[#DDD9CE] focus:outline-none focus:border-[#C5A059] text-[#1A1A1A]"
          />
          {filters.searchQuery && (
            <button
              onClick={() => onFilterChange({ searchQuery: '' })}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#807A70] hover:text-black cursor-pointer"
              aria-label="Clear search input"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Property Style Dropdown */}
        <div>
          <label htmlFor={propertyTypeSelectId} className="sr-only">Property Style</label>
          <select
            id={propertyTypeSelectId}
            value={filters.propertyType}
            onChange={(e) => onFilterChange({ propertyType: e.target.value })}
            className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#DDD9CE] focus:outline-none focus:border-[#C5A059] text-[#1A1A1A] cursor-pointer"
          >
            {propertyTypes.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        {/* Price Cap Dropdown */}
        <div>
          <label htmlFor={maxPriceSelectId} className="sr-only">Maximum Valuation</label>
          <select
            id={maxPriceSelectId}
            value={filters.maxPrice}
            onChange={(e) => onFilterChange({ maxPrice: Number(e.target.value) })}
            className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#DDD9CE] focus:outline-none focus:border-[#C5A059] text-[#1A1A1A] cursor-pointer"
          >
            {priceOptions.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
        </div>

        {/* Minimum Bedrooms */}
        <div>
          <label htmlFor={bedroomCountSelectId} className="sr-only">Bedroom Count</label>
          <select
            id={bedroomCountSelectId}
            value={filters.minBedrooms}
            onChange={(e) => onFilterChange({ minBedrooms: Number(e.target.value) })}
            className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#DDD9CE] focus:outline-none focus:border-[#C5A059] text-[#1A1A1A] cursor-pointer"
          >
            <option value={0}>Any Bedroom Count</option>
            <option value={4}>4+ Bedrooms</option>
            <option value={5}>5+ Bedrooms</option>
            <option value={6}>6+ Bedrooms</option>
            <option value={7}>7+ Bedrooms</option>
          </select>
        </div>
      </div>
    </div>
  );
};
