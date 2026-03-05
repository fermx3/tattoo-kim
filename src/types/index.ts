export type Locale = 'es' | 'en';

export type Location = 'playa-del-carmen' | 'cancun' | 'both';

export interface BlogPost {
  title: string;
  slug: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  image: string;
  locale: Locale;
  translationSlug: string;
  content?: string;
}

export interface Artist {
  name: string;
  slug: string;
  role: string;
  location: Location;
  specialties: string[];
  image: string;
  instagram?: string;
  gallery?: string[];
  locale: Locale;
  translationSlug: string;
  content?: string;
}

export interface GoogleReviewData {
  author: string;
  rating: number;
  text: string;
  date: string;
  profileUrl?: string;
}

export interface GoogleLocationRating {
  location: 'playa-del-carmen' | 'cancun';
  score: number;
  totalReviews: number;
  reviews: GoogleReviewData[];
  profileUrl: string;
}

export interface CombinedGoogleRating {
  score: number;
  totalReviews: number;
  reviews: GoogleReviewData[];
}

export interface StudioLocation {
  slug: 'playa-del-carmen' | 'cancun';
  name: string;
  address: string;
  phone: string;
  mapUrl: string;
  hours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  coords: {
    lat: number;
    lng: number;
  };
}
