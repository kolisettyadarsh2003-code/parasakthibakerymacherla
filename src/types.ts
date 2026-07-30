export type CakeType = 
  | 'Birthday Cakes'
  | 'Wedding Cakes'
  | 'Anniversary Cakes'
  | 'Fondant Cakes'
  | 'Theme Cakes'
  | 'Kids Cakes'
  | 'Custom Cakes';

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  sortOrder: number;
}

export interface Product {
  id: string;
  name: string;
  categoryId: string;
  shortDescription: string;
  fullDescription?: string;
  images: string[]; // Base64 data URLs or image links
  price?: number;
  priceUnit?: string; // e.g., 'per kg', 'per piece', '1/2 kg'
  showPrice?: boolean; // Owner toggle to show/hide pricing on this product
  isAvailableInStore: boolean;
  isFeatured: boolean;
  cakeType?: CakeType;
  sortOrder: number;
  createdAt: number;
  hidden?: boolean;
}

export interface SiteInfo {
  businessName: string;
  ownerName: string;
  ownerTitle?: string;
  tagline: string;
  establishedYear: string;
  globalShowPrices?: boolean; // Global pricing display toggle
  address: {
    line1: string;
    line2: string;
    city: string;
    district: string;
    state: string;
    country: string;
    fullAddress: string;
  };
  contactNumber: string;
  whatsappNumber: string;
  operatingHours: string;
  heroHeading: string;
  heroSubheading: string;
  heroBannerImage?: string;
  announcement?: string;
  googleMapsEmbedUrl: string;
  adminPasscodeHash: string; // Primary passcode
  adminSecondaryPasscodeHash?: string; // Secondary passcode for dual-protection
}

export interface CustomerReview {
  id: string;
  customerName: string;
  location: string; // e.g. "Nagarjuna Sagar", "Gurazala", "Hyderabad Traveler", "Vijayawada"
  rating: number;
  commentTelugu: string;
  commentEnglish: string;
  date: string;
  verifiedCustomer: boolean;
  avatarUrl?: string;
  purchasedItem?: string;
}

export interface CakeModel {
  id: string;
  title: string;
  type: CakeType;
  description: string;
  images: string[];
  isFeatured: boolean;
  hidden?: boolean;
}
