import { useState, useEffect } from 'react';
import { fetchBoxes } from './services/mockApi';
import { type Box } from './components/Canvas';
import Toolbar from './components/Toolbar';
import Canvas from './components/Canvas';

export default function App() {
  const [boxes, setBoxes] = useState<Box[]>([]);
  const [selectedIndices, setSelectedIndices] = useState<Set<number>>(new Set());

  useEffect(() => {
    fetchBoxes().then(setBoxes);
  }, []);

  const handleBoxClick = (index: number, event: React.MouseEvent) => {
    const newSelection = new Set(selectedIndices);
    if (event.shiftKey) {
      newSelection.has(index) ? newSelection.delete(index) : newSelection.add(index);
    } else {
      newSelection.clear();
      newSelection.add(index);
    }
    setSelectedIndices(newSelection);
  };

  const handleColorChange = (newColor: string) => {
    setBoxes(prev => prev.map((box, i) => 
      selectedIndices.has(i) ? { ...box, color: newColor } : box
    ));
  };

  return (
    <div className="w-screen h-screen bg-gray-100 overflow-hidden flex flex-col">
      <Toolbar onColorChange={handleColorChange} />
      <div className="flex-1 relative overflow-hidden">
        <Canvas 
          boxes={boxes} 
          selectedIndices={selectedIndices} 
          onBoxClick={handleBoxClick} 
        />
      </div>
    </div>
  );
}