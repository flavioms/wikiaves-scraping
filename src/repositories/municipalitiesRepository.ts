import fs from 'fs';
import { config } from '../config/index.js';
import type { MunicipalityFileItem } from '../types/wikiaves.js';

export function loadMunicipalities(filePath = config.paths.municipalitiesJson): MunicipalityFileItem[] {
  const raw = fs.readFileSync(filePath, 'utf-8');
  const arr: MunicipalityFileItem[] = JSON.parse(raw);
  return arr;
}

export function filterByState(municipalities: MunicipalityFileItem[], state?: string): MunicipalityFileItem[] {
  if (!state) return municipalities;
  const s = state.trim().toLowerCase();
  return municipalities.filter((m) => String(m.Uf).toLowerCase() === s);
}
