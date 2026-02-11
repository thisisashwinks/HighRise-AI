import { readFile, writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import os from 'os';
import { UploadMetadata, LeaderboardEntry } from '@/types/upload';
import { addMemoryUpload, getMemoryUploads } from '@/lib/upload/memory-store';

// On Vercel, process.cwd() is read-only (/var/task). Use /tmp which is writable.
function getDataDir(): string {
  if (process.env.VERCEL === '1') {
    return os.tmpdir();
  }
  return path.join(process.cwd(), 'data');
}

function getUploadsFilePath(): string {
  return path.join(getDataDir(), 'inspirations-uploads.json');
}

async function ensureDataDir(): Promise<void> {
  const dir = getDataDir();
  if (process.env.VERCEL === '1') return; // /tmp exists, skip mkdir
  if (!existsSync(dir)) {
    await mkdir(dir, { recursive: true });
  }
}

async function readUploadsFromFile(): Promise<UploadMetadata[]> {
  const filePath = getUploadsFilePath();
  if (!existsSync(filePath)) return [];
  try {
    const raw = await readFile(filePath, 'utf-8');
    const parsed = JSON.parse(raw) as UploadMetadata[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeUploadsToFile(uploads: UploadMetadata[]): Promise<void> {
  await ensureDataDir();
  await writeFile(getUploadsFilePath(), JSON.stringify(uploads, null, 0), 'utf-8');
}

/** Persisted uploads when Redis is not configured. Merges file + in-memory (fallback when file write fails). */
export async function getFileUploads(): Promise<UploadMetadata[]> {
  try {
    const fromFile = await readUploadsFromFile();
    const fromMemory = getMemoryUploads();
    const byId = new Map<string, UploadMetadata>();
    for (const u of fromFile) byId.set(u.id, u);
    for (const u of fromMemory) byId.set(u.id, u);
    return Array.from(byId.values()).sort((a, b) => b.timestamp - a.timestamp);
  } catch {
    return getMemoryUploads();
  }
}

export async function addFileUpload(metadata: UploadMetadata): Promise<void> {
  try {
    const uploads = await readUploadsFromFile();
    uploads.push(metadata);
    await writeUploadsToFile(uploads);
  } catch {
    addMemoryUpload(metadata);
  }
}

export async function getFileLeaderboard(limit: number): Promise<LeaderboardEntry[]> {
  const uploads = await getFileUploads();
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
