import { select, search } from '@inquirer/prompts';
import { collectRecords } from '../controllers/recordsController';
import { loadMunicipalities } from '../repositories/municipalitiesRepository';
import { loadSpeciesMap } from '../repositories/speciesRepository';
import { config } from '../config/index';
import { saveToCSV } from '../repositories/csvRepository';

async function main() {
  const municipalities = loadMunicipalities();
  const speciesMap = loadSpeciesMap();
  const states = [...new Set(municipalities.map((m) => m.Uf))].sort();

  const state = await select({
    message: 'Select state:',
    choices: states.map((uf) => ({ name: uf, value: uf })),
  });

  const cities = municipalities
    .filter((m) => m.Uf === state)
    .map((m) => ({ name: m.Nome, value: m.Codigo }));

  const municipalityCode = await search({
    message: 'Type or select city:',
    source: async (input) => {
      if(!input) {
        return cities.map(city => ({name: city.name, value: city.value}));
      }
      return cities.filter((c) =>
        c.name.toLowerCase().includes(input.toLowerCase())
      ).slice(0, 15).map(city => ({name: city.name, value: city.value}))
    }
  });

  const speciesNames = Object.keys(speciesMap);
  const speciesName = await search({
    message: 'Type a species (optional):',
    source: async (input) =>{
      if(!input) {
        return ['', ...speciesNames];
      }
      return speciesNames.filter((s) =>
        s.toLowerCase().includes(input.toLowerCase())
      ).slice(0, 15)
    },

  }).catch(() => '');

  const fileName = 'wikiaves_records.csv';
  const fs = await import('fs');
  const path = await import('path');
  const filePath = path.join(config.outputDir, fileName);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }

  const startPageInput = await search({
    message: 'Initial Page (default 1):',
    source: async (input) => [input || '1'],
  });
  const startPage = Number(startPageInput) || 1;

  await collectRecords({
    state,
    municipalityCode: municipalityCode as number,
    speciesName: speciesName as string || undefined,
    maxPages: config.wikiaves.maxPages,
    startPage,
    onPage: async (pageRecords, page, municipalityCode) => {
      await saveToCSV(pageRecords, fileName);
      console.log(`Page ${page} of the municipality of ${municipalityCode} saved (${pageRecords.length} records).`);
    }
  });
}

main();
