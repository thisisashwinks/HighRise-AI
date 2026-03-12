import { NextResponse } from 'next/server';
import archiver from 'archiver';
import fs from 'fs';
import path from 'path';
import { Writable } from 'stream';

export async function GET() {
  const guidelinesDir = path.join(process.cwd(), 'public', 'guidelines');
  const mdPath = path.join(guidelinesDir, 'HIGHRISE_LAYOUT_AND_COPY_GUIDELINES.md');
  const mdcPath = path.join(guidelinesDir, 'HighRise-Layout-And-Copy.mdc');

  if (!fs.existsSync(mdPath) || !fs.existsSync(mdcPath)) {
    return NextResponse.json(
      { error: 'Guideline files not found' },
      { status: 404 }
    );
  }

  const zipBuffer = await new Promise<Buffer>((resolve, reject) => {
    const chunks: Buffer[] = [];
    const collector = new Writable({
      write(chunk: Buffer, _enc, cb) {
        chunks.push(chunk);
        cb();
      },
    });
    collector.on('finish', () => resolve(Buffer.concat(chunks)));

    const archive = archiver('zip', { zlib: { level: 9 } });
    archive.on('error', reject);
    archive.pipe(collector);

    archive.file(mdPath, { name: 'HIGHRISE_LAYOUT_AND_COPY_GUIDELINES.md' });
    archive.file(mdcPath, { name: 'HighRise-Layout-And-Copy.mdc' });
    archive.finalize();
  });

  return new NextResponse(new Uint8Array(zipBuffer), {
    status: 200,
    headers: {
      'Content-Type': 'application/zip',
      'Content-Disposition': 'attachment; filename="highrise-layout-and-copy-guidelines.zip"',
      'Content-Length': String(zipBuffer.length),
    },
  });
}
