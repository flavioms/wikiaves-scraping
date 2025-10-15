import type { WikiAvesResponse, RecordData } from '../types/wikiaves.js';
import httpClient from './httpClient.js';
import { config } from '../config/index.js';

interface BuildParams {
  municipalityCode?: number;
  speciesId?: number;
  page?: number;
  forSpeciesOnly?: boolean;
}

export function buildJsonUrl({ municipalityCode, speciesId, page, forSpeciesOnly }: BuildParams): string {
  const endpoint = config.wikiaves.jsonEndpoint;
  const params = new URLSearchParams();

  if (forSpeciesOnly && speciesId) {
    params.set('t', 's');
    params.set('s', String(speciesId));
    if (page) params.set('p', String(page));
    return `${endpoint}?${params.toString()}`;
  }

  params.set('tm', 'fs');
  params.set('t', 'cs');
  if (municipalityCode) params.set('c1', String(municipalityCode));
  if (page) params.set('p', String(page));
  if (speciesId) params.set('s', String(speciesId));

  return `${endpoint}?${params.toString()}`;
}

export async function getTotalRecords({ municipalityCode, speciesId }: BuildParams): Promise<number> {
  const url = buildJsonUrl({ municipalityCode, speciesId, forSpeciesOnly: !!(!municipalityCode && speciesId) });
  const response = await httpClient.get<WikiAvesResponse>(url);
  const total = response.data?.registros?.total ?? 0;
  return Number(total);
}

export async function getRecordsByPage({
  municipalityCode,
  speciesMap,
  page = 1,
  speciesId
}: {
  municipalityCode?: number;
  speciesMap?: Record<string, { family: string; id: number }>;
  page?: number;
  speciesId?: number;
}): Promise<RecordData[]> {
  const url = buildJsonUrl({ municipalityCode, speciesId, page, forSpeciesOnly: !!(!municipalityCode && speciesId) });
  try {
    const response = await httpClient.get<WikiAvesResponse>(url);
    const items = response.data?.registros?.itens ?? {};
    return Object.values(items).map((item) => {
      const [city = '', state = ''] = (item.local ?? '').split('/').map((s) => s.trim());
      let link = (item.link ?? '').replace('#', '');
      if (link.includes('/recordings/')) link = link.replace(/jpg$/i, 'mp3');

      return {
        id: item.id,
        wikiId: item.sp.idwiki,
        birdName: item.sp.nome,
        author: item.autor,
        date: item.data,
        city,
        state,
        link,
        family: speciesMap?.[item.sp.nome]?.family ?? null
      };
    });
  } catch (err: unknown) {
    console.warn('getRecordsByPage failed for url', url, (err as Error).message ?? err);
    return [];
  }
}
