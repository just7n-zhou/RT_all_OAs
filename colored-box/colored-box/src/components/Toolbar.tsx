const COLORS = ["red", "blue", "green", "purple"]

interface ToolBarProps {
    onColorChange: (color: string) => void 
}

export default function ToolBar({ onColorChange } : ToolBarProps) {
    return (
        <div style={{position: "absolute", top: 0, left: 0}}>
            {COLORS.map((color) => (
                <button
                    key={color}
                    onClick={()=>{onColorChange(color)}}
                >
                    {color}
                </button>
                
            ))}
        </div>
    )
}