import type { Episode } from '../services/rmService';

interface EpisodeListProps {
  episodes: Episode[];
  onSelect: (episode: Episode) => void;
  selectedId: number | null;
}

export default function EpisodeList({ episodes, onSelect, selectedId }: EpisodeListProps) {
  return (
    <aside className="w-64 border-r border-gray-200 h-full overflow-y-auto p-4 bg-gray-50">
      <h2 className="text-lg font-bold mb-4 border-b pb-2">Episodes</h2>
      <ul className="space-y-2">
        {episodes.map((ep) => {
          const isSelected = selectedId === ep.id;
          return (
            <li
              key={ep.id}
              onClick={() => onSelect(ep)}
              className={`
                cursor-pointer p-3 rounded-lg border transition-all duration-200
                ${isSelected 
                  ? 'bg-indigo-600 text-white border-indigo-700 shadow-md font-bold' 
                  : 'bg-white text-gray-700 border-gray-200 hover:border-indigo-400 hover:bg-indigo-50'
                }
              `}
            >
              {ep.name}
            </li>
          );
        })}
      </ul>
      <div className="mt-4 text-xs text-gray-400 text-center italic">
        scrollable list of all episodes
      </div>
    </aside>
  );
}