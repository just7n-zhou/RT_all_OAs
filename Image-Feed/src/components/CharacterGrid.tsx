import type { Character } from '../services/rmService';

interface CharacterGridProps {
  characters: Character[];
}

export default function CharacterGrid({ characters }: CharacterGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {characters.map((char) => (
        <div 
          key={char.id} 
          className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
        >
          <div className="aspect-square overflow-hidden bg-gray-100">
            <img 
              src={char.image} 
              alt={char.name} 
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="p-3 text-center">
            <p className="text-sm font-semibold text-gray-800 truncate">
              {char.name}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}