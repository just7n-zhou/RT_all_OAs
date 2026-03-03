import { useState, useEffect } from 'react';
import { rmService, type Episode, type Character } from './services/rmService';
import EpisodeList from './components/EpisodeList';
import CharacterGrid from './components/CharacterGrid';

export default function App() {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  // Initial page load logic [cite: 51, 52, 54]
  useEffect(() => {
    const loadInitialData = async () => {
      const [eps, chars] = await Promise.all([
        rmService.getEpisodes(),
        rmService.getInitialCharacters()
      ]);
      setEpisodes(eps);
      setCharacters(chars);
    };
    loadInitialData();
  }, []);

  const handleSelectEpisode = async (episode: Episode) => {
    // Unselecting logic: revert if clicking same episode [cite: 59, 60]
    if (selectedId === episode.id) {
      setSelectedId(null);
      const initial = await rmService.getInitialCharacters();
      setCharacters(initial);
      return;
    }

    // Selecting logic: highlight and update characters [cite: 55, 56, 57]
    setSelectedId(episode.id);
    setLoading(true);
    const episodeChars = await rmService.getCharactersByUrls(episode.characters);
    setCharacters(episodeChars);
    setLoading(false);
  };

  return (
    <div className="flex h-screen bg-white">
      <EpisodeList 
        episodes={episodes} 
        onSelect={handleSelectEpisode} 
        selectedId={selectedId} 
      />
      <main className="flex-1 overflow-y-auto p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Rick and Morty Characters</h1>
        {loading ? (
          <div className="text-center">Loading characters...</div>
        ) : (
          <CharacterGrid characters={characters} />
        )}
      </main>
    </div>
  );
}