import { loadSpeciesMap } from '../repositories/speciesRepository';
import { loadMunicipalities, filterByState } from '../repositories/municipalitiesRepository';
import { getTotalRecords, getRecordsByPage } from '../services/wikiavesService';
import type { RecordData } from '../types/wikiaves';
import { config } from '../config/index';

interface CollectParams {
  state?: string;
  municipalityCode?: number;
  speciesName?: string;
  maxPages?: number;
  startPage?: number;
  onPage?: (pageRecords: RecordData[], page: number, municipalityCode?: number) => Promise<void>;
}

export async function collectRecords({
  state,
  municipalityCode,
  speciesName,
  maxPages = config.wikiaves.maxPages,
  startPage = 1,
  onPage
}: CollectParams): Promise<RecordData[]> {
  const speciesMap = loadSpeciesMap();
  const municipalities = loadMunicipalities();
  const targets = municipalityCode
    ? municipalities.filter((m) => m.Codigo === Number(municipalityCode))
    : filterByState(municipalities, state);

  const results: RecordData[] = [];

  for (const m of targets) {
    const speciesId = speciesName ? speciesMap[speciesName]?.id : undefined;
    console.log("Searching for records...")
    const total = await getTotalRecords({ municipalityCode: m.Codigo, speciesId });
    console.log(`${total} records found, preparing file...`)
    const pages = Math.min(Math.ceil(total / config.wikiaves.totalPerPage), maxPages);

    for (let p = startPage; p <= pages; p++) {
      const pageRecords = await getRecordsByPage({
        municipalityCode: m.Codigo,
        speciesMap,
        page: p,
        speciesId
      });
      results.push(...pageRecords);
      
      if (pageRecords.length > 0 && typeof onPage === 'function') {
        console.log(`[collectRecords] Starting onPage for page ${p}, municipality ${m.Codigo}`);
        await onPage(pageRecords, p, m.Codigo);
        console.log(`[collectRecords] Finished onPage for page ${p}, municipality ${m.Codigo}`);
      }
    }
  }

  console.log(`Generating CSV file...`)
  return results;
}
