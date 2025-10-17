import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

export const config = {
  wikiaves: {
    baseUrl: process.env.WIKIAVES_API_BASE ?? 'https://www.wikiaves.com.br',
    jsonEndpoint: process.env.WIKIAVES_JSON_ENDPOINT ?? '/getRegistrosJSON.php',
    userAgent: process.env.WIKIAVES_USER_AGENT ?? 'wikiaves-scraper/1.0',
    maxPages: Number(process.env.MAX_PAGES) ?? 10,
    totalPerPage: Number(process.env.WIKIAVES_TOTAL_PER_PAGE) ?? 20
  },
  concurrency: Number(process.env.CONCURRENT_REQUESTS ?? 10),
  retry: {
    retries: Number(process.env.RETRY_COUNT ?? 3),
    delayMs: Number(process.env.RETRY_DELAY_MS ?? 10000)
  },
  outputDir: process.env.OUTPUT_DIR ?? './output',
  paths: {
    root: path.resolve(process.cwd()),
    speciesJson: path.resolve(process.cwd(), 'src', 'assets', 'especies_com_ids.json'),
    municipalitiesJson: path.resolve(process.cwd(), 'src', 'assets', 'municipios.json')
  }
} as const;
