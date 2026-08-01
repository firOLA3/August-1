import { useState, useEffect } from 'react';
export default function Level4({ onNext }) {
  const [boxes, setBoxes] = useState([]);
  
  useEffect(() => {
    const newBoxes = Array.from({length: 10}).map((_, i) => ({
      id: i,
      isReal: i === 4,
      x: (Math.random() - 0.5) * 70,
      y: (Math.random() - 0.5) * 70
    }));
    setBoxes(newBoxes.sort(() => Math.random() - 0.5));
  }, []);

  const handleFakeClick = (e) => {
    e.currentTarget.style.transform = 'scale(0.9) rotate(5deg)';
    setTimeout(() => {
      if (e.currentTarget) e.currentTarget.style.transform = '';
    }, 200);
  };

  return (
    <>
      {boxes.map(box => (
        <div 
          key={box.id}
          className="gift-box" 
          style={{ 
            width: 130, height: 130, 
            position: 'absolute',
            left: `calc(50% + ${box.x}vw)`,
            top: `calc(50% + ${box.y}vh)`,
            marginLeft: -65, marginTop: -65
          }}
          onClick={box.isReal ? onNext : handleFakeClick}
        >
          <span>Open</span>
        </div>
      ))}
    </>
  );
}