import { readFile, writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { UploadMetadata, LeaderboardEntry } from '@/types/upload';

const DATA_DIR = path.join(process.cwd(), 'data');
const UPLOADS_FILE = path.join(DATA_DIR, 'inspirations-uploads.json');

async function ensureDataDir(): Promise<void> {
  if (!existsSync(DATA_DIR)) {
    await mkdir(DATA_DIR, { recursive: true });
  }
}

async function readUploadsFromFile(): Promise<UploadMetadata[]> {
  await ensureDataDir();
  if (!existsSync(UPLOADS_FILE)) return [];
  try {
    const raw = await readFile(UPLOADS_FILE, 'utf-8');
    const parsed = JSON.parse(raw) as UploadMetadata[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeUploadsToFile(uploads: UploadMetadata[]): Promise<void> {
  await ensureDataDir();
  await writeFile(UPLOADS_FILE, JSON.stringify(uploads, null, 0), 'utf-8');
}

/** Persisted uploads when Redis is not configured. Survives server restart and hard refresh. */
export async function getFileUploads(): Promise<UploadMetadata[]> {
  const uploads = await readUploadsFromFile();
  return uploads.sort((a, b) => b.timestamp - a.timestamp);
}

export async function addFileUpload(metadata: UploadMetadata): Promise<void> {
  const uploads = await readUploadsFromFile();
  uploads.push(metadata);
  await writeUploadsToFile(uploads);
}

export async function getFileLeaderboard(limit: number): Promise<LeaderboardEntry[]> {
  const uploads = await readUploadsFromFile();
  const byEmail = new Map<string, { name: string; product: string; karma: number }>();
  for (const u of uploads) {
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
  return Array.from(byEmail.entries())
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
}

/** Merge static seed leaderboard with file-based uploads by email (sum karma). */
export async function getMergedLeaderboardFromFile(
  staticEntries: LeaderboardEntry[],
  limit: number
): Promise<LeaderboardEntry[]> {
  const fileEntries = await getFileLeaderboard(limit * 2);
  const byEmail = new Map<string, LeaderboardEntry>();
  for (const e of staticEntries) {
    byEmail.set(e.email, { ...e });
  }
  for (const e of fileEntries) {
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
