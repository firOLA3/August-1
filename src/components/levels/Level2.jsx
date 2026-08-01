import { useState } from 'react';
export default function Level2({ onNext }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [jumps, setJumps] = useState(0);

  const handleHover = () => {
    if (jumps < 4) {
      const randomX = (Math.random() - 0.5) * 500;
      const randomY = (Math.random() - 0.5) * 500;
      setPosition({ x: randomX, y: randomY });
      setJumps(prev => prev + 1);
    }
  };

  return (
    <div 
      className="gift-box" 
      style={{ 
        width: 220, height: 220, 
        position: 'absolute',
        left: `calc(50% + ${position.x}px)`,
        top: `calc(50% + ${position.y}px)`,
        marginLeft: -110, marginTop: -110,
        transition: 'left 0.2s ease-out, top 0.2s ease-out'
      }}
      onMouseEnter={handleHover}
      onClick={onNext}
    >
      <span style={{fontSize: '1.2rem'}}>Open Me</span>
    </div>
  );
}