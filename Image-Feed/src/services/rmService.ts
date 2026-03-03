const BASE_URL = 'https://rickandmortyapi.com/api';

export interface Episode {
  id: number;
  name: string;
  characters: string[]; // URLs of characters
}

export interface Character {
  id: number;
  name: string;
  image: string;
}

export const rmService = {
  // Requirement: Show list of episodes in left side-nav [cite: 52]
  async getEpisodes(): Promise<Episode[]> {
    const res = await fetch(`${BASE_URL}/episode`);
    const data = await res.json();
    return data.results;
  },

  // Requirement: Show first page of characters initially [cite: 54]
  async getInitialCharacters(): Promise<Character[]> {
    const res = await fetch(`${BASE_URL}/character`);
    const data = await res.json();
    return data.results;
  },

  // Requirement: Update main view to characters from a specific episode [cite: 57]
  async getCharactersByUrls(urls: string[]): Promise<Character[]> {
    // The API allows fetching multiple IDs at once by passing a comma-separated list
    const ids = urls.map(url => url.split('/').pop()).join(',');
    const res = await fetch(`${BASE_URL}/character/${ids}`);
    const data = await res.json();
    
    // Handle API returning a single object instead of array if episode has only 1 character
    return Array.isArray(data) ? data : [data];
  }
};