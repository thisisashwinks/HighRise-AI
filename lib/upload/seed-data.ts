import { UploadMetadata, LeaderboardEntry } from '@/types/upload';

export const SEED_AUTHOR_NAME = 'Ashwin K S';
export const SEED_AUTHOR_EMAIL = 'ashwin.ks@gohighlevel.com';
const SEED_PRODUCT = 'High Level';
const SEED_ROLE = 'Design' as const;

export const SEED_INSPIRATIONS: Array<{
  imageFile: string;
  title: string;
  description: string;
}> = [
  {
    imageFile: "Arc Browser Smart Renaming.png",
    title: "Arc Browser Smart Renaming",
    description: "Contextual smart renaming in Arc Browser. The UI suggests and applies renames based on tab content or context, reducing friction when organizing tabs and workspaces.",
  },
  {
    imageFile: "Clay's reusable AI actions library.png",
    title: "Clay's Reusable AI Actions Library",
    description: "A library of reusable AI actions in Clay. Users can browse, search, and add pre-built actions to their workflows, making it easy to compose AI-powered automations.",
  },
  {
    imageFile: "Github's animated character.png",
    title: "GitHub's Animated Character",
    description: "GitHub uses an animated character to guide and delight users during onboarding or empty states. The animation adds personality and makes the experience more engaging.",
  },
  {
    imageFile: "Lovable Copilot.png",
    title: "Lovable Copilot",
    description: "Lovable's in-product copilot for building and editing UIs. The copilot sits alongside the canvas and responds to natural language, helping users iterate on design and code.",
  },
  {
    imageFile: "Notion transcription meeting notes.png",
    title: "Notion Transcription & Meeting Notes",
    description: "Notion's integration of transcription with meeting notes. Captions and transcripts are synced with the doc so users can search and reference what was said.",
  },
  {
    imageFile: "Replit Empty Screen.png",
    title: "Replit Empty Screen",
    description: "Replit's empty state when starting a new project. Clear primary action and optional suggestions help users choose a template or stack and get started quickly.",
  },
];

/**
 * Build static upload list for fallback when Redis is empty.
 * Uses stable fake IDs and timestamps so the list is deterministic.
 */
/** For seed data only: use first word of title as product. Live uploads use user-selected product. */
export function productFromTitle(title: string): string {
  const first = title.trim().split(/\s+/)[0];
  return first || title;
}

export function getStaticSeedUploads(): UploadMetadata[] {
  const baseTimestamp = 1739180000000; // Fixed base for stable order
  return SEED_INSPIRATIONS.map((item, i) => ({
    id: `seed_${i + 1}_${item.imageFile.replace(/\s+/g, '-').toLowerCase()}`,
    mediaType: 'image' as const,
    mediaUrl: `/examples/inspirations/${encodeURIComponent(item.imageFile)}`,
    uploaderName: SEED_AUTHOR_NAME,
    uploaderEmail: SEED_AUTHOR_EMAIL,
    product: productFromTitle(item.title),
    role: SEED_ROLE,
    title: item.title,
    description: item.description,
    timestamp: baseTimestamp + i,
    karmaPoints: i === 0 ? 20 : 15,
    status: 'approved' as const,
  }));
}

/**
 * Build static leaderboard entry for Ashwin K S when Redis is empty.
 * Total karma for 6 seed items: 20 + 15*5 = 95.
 */
export function getStaticSeedLeaderboard(): LeaderboardEntry[] {
  return [
    {
      rank: 1,
      email: SEED_AUTHOR_EMAIL,
      name: SEED_AUTHOR_NAME,
      product: SEED_PRODUCT,
      karmaPoints: 95,
    },
  ];
}
