import cheerio from 'cheerio';

export function parseDetailsFromHtml(html: string) {
  const $ = cheerio.load(html);
  const row = $('div.wa-lista-detalhes div.row').first();
  return {
    placeName: row.find('span.m--font-bolder.tipoLocalLOV').text().trim() || '',
    placeType: row.find('span.m--font-bolder.tipoLocal').text().trim() || '',
    placeMunicipality: row.find('span.tipoLocalCID.m--font-bolder').text().trim() || '',
    placeConservation: row.find('span.tipoLocalUC.m-link.m--font-bolder').text().trim() || '',
    placeIBA: row.find('a.tipoLocalIBA').text().trim() || ''
  };
}
