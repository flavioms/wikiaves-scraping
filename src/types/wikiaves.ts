export interface SpeciesFileItem {
  Name: string;
  Nome: string;
  Family: string;
  ID: number;
}

export interface MunicipalityFileItem {
  Codigo: number;
  Nome: string;
  Uf: string;
}

export interface WikiAvesItem {
  id: number;
  sp: {
    idwiki: number;
    nome: string;
  };
  autor: string;
  data: string;
  local: string;
  link: string;
}

export interface WikiAvesResponse {
  registros: {
    total: string | number;
    itens: Record<string, WikiAvesItem>;
  };
}

export interface RecordData {
  id: number;
  wikiId: number;
  birdName: string;
  author: string;
  date: string;
  city: string;
  state: string;
  link: string;
  family: string | null;
}
