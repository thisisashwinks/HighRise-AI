import { UploadMetadata, LeaderboardEntry } from '@/types/upload';

// In-memory store for uploads when Redis is not configured (e.g. local dev).
// Data is lost on server restart but allows the upload flow to work.
let memoryUploads: UploadMetadata[] = [];

export function getMemoryUploads(): UploadMetadata[] {
  return [...memoryUploads].sort((a, b) => b.timestamp - a.timestamp);
}

export function addMemoryUpload(metadata: UploadMetadata): void {
  memoryUploads.push(metadata);
}

export function getMemoryLeaderboard(limit: number): LeaderboardEntry[] {
  const byEmail = new Map<string, { name: string; product: string; karma: number }>();
  for (const u of memoryUploads) {
    const existing = byEmail.get(u.uploaderEmail);
    if (existing) {
      existing.karma += u.karmaPoints;
    } else {
      byEmail.set(u.uploaderEmail, {
        name: u.uploaderName,
        product: u.product,
        karma: u.karmaPoints,
      });
    }
  }
  const entries: LeaderboardEntry[] = Array.from(byEmail.entries())
    .map(([email, data]) => ({
      rank: 0,
      email,
      name: data.name,
      product: data.product,
      karmaPoints: data.karma,
    }))
    .sort((a, b) => b.karmaPoints - a.karmaPoints)
    .slice(0, limit)
    .map((e, i) => ({ ...e, rank: i + 1 }));
  return entries;
}

/** Merge static seed leaderboard with memory leaderboard by email (sum karma). */
export function getMergedLeaderboard(
  staticEntries: LeaderboardEntry[],
  limit: number
): LeaderboardEntry[] {
  const memoryEntries = getMemoryLeaderboard(limit * 2);
  const byEmail = new Map<string, LeaderboardEntry>();
  for (const e of staticEntries) {
    byEmail.set(e.email, { ...e });
  }
  for (const e of memoryEntries) {
    const existing = byEmail.get(e.email);
    if (existing) {
      existing.karmaPoints += e.karmaPoints;
    } else {
      byEmail.set(e.email, { ...e });
    }
  }
  return Array.from(byEmail.values())
    .sort((a, b) => b.karmaPoints - a.karmaPoints)
    .slice(0, limit)
    .map((e, i) => ({ ...e, rank: i + 1 }));
}
