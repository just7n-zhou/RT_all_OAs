import React from 'react';

export interface Box {
  size: number;
  color: string;
  x: number;
  y: number;
}

interface CanvasProps {
  boxes: Box[];
  selectedIndices: Set<number>;
  onBoxClick: (index: number, event: React.MouseEvent) => void;
}

export default function Canvas({ boxes, selectedIndices, onBoxClick }: CanvasProps) {
  return (
    <div className="relative w-full h-full p-10 mt-12 border-2 border-dashed border-gray-200 rounded-xl bg-white">
      {boxes.map((box, index) => (
        <div
          key={index}
          onClick={(e) => onBoxClick(index, e)}
          style={{
            width: box.size,
            height: box.size,
            backgroundColor: box.color,
            left: box.x,
            top: box.y + 50,
            position: 'absolute',
            outline: selectedIndices.has(index) ? '4px solid #4f46e5' : 'none',
            outlineOffset: '2px',
            cursor: 'pointer',
            zIndex: selectedIndices.has(index) ? 10 : 1,
          }}
          className="shadow-sm transition-all duration-200 hover:brightness-110 active:scale-95"
        />
      ))}
    </div>
  );
}