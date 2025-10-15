import fs from 'fs';
import { config } from '../config/index.js';
import type { SpeciesFileItem } from '../types/wikiaves.js';

export type SpeciesMap = Record<
  string,
  {
    family: string;
    id: number;
    localName?: string;
  }
>;

export function loadSpeciesMap(filePath = config.paths.speciesJson): SpeciesMap {
  const raw = fs.readFileSync(filePath, 'utf-8');
  const arr: SpeciesFileItem[] = JSON.parse(raw);
  const map: SpeciesMap = {};
  arr.forEach((s) => {
    map[s.Name] = {
      family: s.Family,
      id: s.ID,
      localName: s.Nome
    };
  });
  return map;
}
