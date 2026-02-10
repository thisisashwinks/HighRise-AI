export type MediaType = 'image' | 'video' | 'gif' | 'link';

export type Role = 'Design' | 'PM' | 'Dev' | 'QA' | 'Executive' | 'Other';

export type UploadStatus = 'pending' | 'approved' | 'rejected';

export interface UploadMetadata {
  id: string;
  mediaType: MediaType;
  mediaUrl: string;
  thumbnailUrl?: string; // For videos
  linkUrl?: string; // For link uploads
  
  // User information
  uploaderName: string;
  uploaderEmail: string; // Hidden, not displayed
  product: string;
  role: Role;
  
  // Content
  title: string;
  description: string;
  
  // Metadata
  timestamp: number;
  karmaPoints: number;
  status: UploadStatus;
  
  // File metadata
  fileSize?: number;
  fileName?: string;
  mimeType?: string;
}

export interface UserProfile {
  email: string;
  name: string;
  product: string;
  role: Role;
  totalKarma: number;
  uploadCount: number;
  lastUploadTimestamp?: number;
}

export interface LeaderboardEntry {
  rank: number;
  email: string;
  name: string;
  product: string;
  karmaPoints: number;
}

export interface UploadFormData {
  file?: File;
  linkUrl?: string;
  name: string;
  email: string;
  product: 'High Level' | 'Others';
  subProduct: string; // Sub-product area (e.g., "HighRise AI", "Calendar", "Stripe", etc.)
  role: Role;
  title: string;
  description: string;
}

export interface FeatureFlags {
  uploads: {
    enabled: boolean;
    reason?: string;
    message?: string;
  };
  aiGeneration: {
    enabled: boolean;
    reason?: string;
    message?: string;
  };
}

export interface UsageStats {
  cloudinary: {
    storage: number; // Percentage 0-100
    bandwidth: number; // Percentage 0-100
  };
  upstash: {
    storage: number; // Percentage 0-100
    commands: number; // Percentage 0-100
  };
  gemini: {
    requests: number; // Percentage 0-100 (daily)
  };
}
