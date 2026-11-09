export type PropertyCategory = 'residential' | 'commercial';

export type PropertyType = 
  | 'Villa' 
  | 'Penthouse' 
  | 'Townhouse' 
  | 'Historic Estate' 
  | 'Office Tower' 
  | 'Retail Flagship' 
  | 'Boutique Hotel' 
  | 'Tech Campus';

export interface RoomDetail {
  id: string;
  name: string;
  dimensions: string;
  areaSqFt: number;
  description: string;
  finishes: string[];
  xPercent: number; // for interactive blueprint hotspot
  yPercent: number;
}

export interface FloorLevel {
  levelId: string;
  levelName: string;
  totalAreaSqFt: number;
  blueprintDescription: string;
  rooms: RoomDetail[];
}

export interface PropertyAmenity {
  category: 'Wellness & Leisure' | 'Architectural & Security' | 'Finishes & Technology' | 'Commercial & Logistics';
  items: string[];
}

export interface Property {
  id: string;
  title: string;
  tagline: string;
  category: PropertyCategory;
  propertyType: PropertyType;
  price: number;
  priceFormatted: string;
  location: string;
  city: string;
  country: string;
  bedrooms: number;
  bathrooms: number;
  interiorSqFt: number;
  lotSqFt?: number;
  yearBuilt: number;
  architecturalStyle: string;
  status: 'Curated Demonstration' | 'Exclusive Reserve' | 'Architectural Spotlight';
  featured: boolean;
  mainImage: string;
  galleryImages: {
    url: string;
    caption: string;
    tag: string;
  }[];
  description: string[];
  keyHighlights: string[];
  amenities: PropertyAmenity[];
  floors: FloorLevel[];
  monthlyTax: number;
  monthlyInsurance: number;
  monthlyHOA: number;
}

export interface FilterState {
  searchQuery: string;
  category: 'all' | 'residential' | 'commercial';
  propertyType: string;
  minPrice: number;
  maxPrice: number;
  minBedrooms: number;
  sortBy: 'featured' | 'price-desc' | 'price-asc' | 'sqft-desc';
}

export interface ViewingRequest {
  propertyId: string;
  propertyTitle: string;
  viewingType: 'In-Person Private Tour' | 'Virtual Guided 4K Walkthrough' | 'Helicopter Aerial Arrival';
  date: string;
  timeSlot: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientNotes: string;
  bookingRef: string;
  createdAt: string;
}
