import fs from 'fs';
import path from 'path';
import { config } from '../config/index';
import type { RecordData } from '../types/wikiaves';

function ensureOutputDir(): void {
  if (!fs.existsSync(config.outputDir)) {
    fs.mkdirSync(config.outputDir, { recursive: true });
  }
}

export async function saveToCSV(records: RecordData[], fileName = 'wikiaves_records.csv'): Promise<void> {
  if (!records.length) {
    console.warn('⚠️ No records to save.');
    return;
  }

  ensureOutputDir();

  const filePath = path.join(config.outputDir, fileName);
  const isNewFile = !fs.existsSync(filePath);

  const header = [
    'ID',
    'WikiID',
    'BirdName',
    'Author',
    'Date',
    'City',
    'State',
    'Link',
    'Family'
  ].join(',');

  const rows = records.map((r) => {
    const safe = (v: unknown) =>
      `"${String(v ?? '').replace(/"/g, '""')}"`;
    return [
      safe(r.id),
      safe(r.wikiId),
      safe(r.birdName),
      safe(r.author),
      safe(r.date),
      safe(r.city),
      safe(r.state),
      safe(r.link),
      safe(r.family)
    ].join(',');
  });

  const content = `${isNewFile ? header + '\n' : ''}${rows.join('\n')}\n`;

  await fs.promises.appendFile(filePath, content, 'utf8');

  console.log(`💾 Saved ${records.length} records to ${fileName}`);
}
