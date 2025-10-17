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
}

export async function collectRecords({
  state,
  municipalityCode,
  speciesName,
  maxPages = config.wikiaves.maxPages
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
    const pages = Math.min(Math.ceil(total / 30), maxPages);

    for (let p = 1; p <= pages; p++) {
      const pageRecords = await getRecordsByPage({
        municipalityCode: m.Codigo,
        speciesMap,
        page: p,
        speciesId
      });
      results.push(...pageRecords);
    }
  }

  console.log(`Generating CSV file...`)
  return results;
}
