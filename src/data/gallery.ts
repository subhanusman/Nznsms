export interface GalleryItem {
  id: string;
  title: string;
  category: 'architecture' | 'interiors' | 'kitchens' | 'pools' | 'commercial';
  categoryLabel: string;
  location: string;
  image: string;
  description: string;
  aspectRatio: '16:9' | '4:3' | '1:1';
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g-1',
    title: 'The Azure Coast Infinity Pool at Dusk',
    category: 'pools',
    categoryLabel: 'Pools & Terraces',
    location: "Cap d'Antibes, France",
    image: '/src/assets/images/hero_luxury_villa_1794223759758.jpg',
    description: 'Illuminated 75-foot infinity pool reflecting warm architectural travertine lighting against the Mediterranean horizon.',
    aspectRatio: '16:9',
  },
  {
    id: 'g-2',
    title: 'Monolith Penthouse Double-Height Salon',
    category: 'interiors',
    categoryLabel: 'Bespoke Interiors',
    location: 'Manhattan, New York',
    image: '/src/assets/images/penthouse_skyline_1794223759598.jpg',
    description: 'Panoramic dusk views over the skyline with slab Calacatta marble fireplace and designer Italian furnishings.',
    aspectRatio: '16:9',
  },
  {
    id: 'g-3',
    title: 'The Horizon Tower Champagne Bronze Facade',
    category: 'commercial',
    categoryLabel: 'Commercial Holdings',
    location: 'Chicago Financial District',
    image: '/src/assets/images/commercial_tower_1794223759394.jpg',
    description: 'Sculptural curved bronze mullions and monumental glass atrium illuminating the premier financial boulevard.',
    aspectRatio: '4:3',
  },
  {
    id: 'g-4',
    title: 'Waterfall Calacatta Marble Culinary Center',
    category: 'kitchens',
    categoryLabel: 'Chef Kitchens',
    location: 'Bespoke Architectural Residence',
    image: '/src/assets/images/luxury_interior_kitchen_1794223760864.jpg',
    description: 'Monolithic Italian Calacatta island paired with fluted dark charcoal oak and brushed brass architectural fixtures.',
    aspectRatio: '4:3',
  },
  {
    id: 'g-5',
    title: 'Cantilevered Canyon Living Pavilion',
    category: 'architecture',
    categoryLabel: 'Architectural Details',
    location: 'Bel Air, California',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80',
    description: 'Seamless indoor-outdoor living with board-formed concrete walls and zero-threshold Fleetwood glass panels.',
    aspectRatio: '16:9',
  },
  {
    id: 'g-6',
    title: 'Historic Lakefront Portico & Stone Jetty',
    category: 'architecture',
    categoryLabel: 'Architectural Details',
    location: 'Lake Como, Italy',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1600&q=80',
    description: 'Restored 19th-century neoclassical arches overlooking calm waters and private cypress gardens.',
    aspectRatio: '16:9',
  },
  {
    id: 'g-7',
    title: 'Avenue Montaigne Haute Couture Showroom',
    category: 'commercial',
    categoryLabel: 'Commercial Holdings',
    location: 'Paris, France',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80',
    description: 'Private salon suite with limestone flooring, bespoke bronze fixtures, and museum-grade color rendition lighting.',
    aspectRatio: '4:3',
  },
  {
    id: 'g-8',
    title: 'Indoor Volcanic Stone Wellness Pavilion',
    category: 'pools',
    categoryLabel: 'Pools & Terraces',
    location: 'Tremezzo Estate, Italy',
    image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=80',
    description: 'Subterranean heated thermal pool lined with hand-split basalt tiles and integrated aromatherapy steam room.',
    aspectRatio: '16:9',
  },
];
