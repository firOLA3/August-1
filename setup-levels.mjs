import fs from 'fs';
import path from 'path';

const dir = './src/components/levels';

const level1 = `
export default function Level1({ onNext }) {
  return (
    <div className="gift-box" style={{ width: 250, height: 250 }} onClick={onNext}>
      <span style={{fontSize: '1.5rem'}}>Open Me</span>
    </div>
  );
}
`;

const level2 = `
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
        left: \`calc(50% + \${position.x}px)\`,
        top: \`calc(50% + \${position.y}px)\`,
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
`;

const level3 = `
import { useState } from 'react';
export default function Level3({ onNext }) {
  const [step, setStep] = useState(0);
  return (
    <>
      <div className="gift-box" style={{ width: 190, height: 190 }} onClick={() => setStep(1)}>
        <span style={{fontSize: '1.1rem'}}>Open Me</span>
      </div>

      {step === 1 && (
        <div className="modal-overlay">
          <div className="glass-panel modal-content">
            <h2>Are you sure you want to open this?</h2>
            <button className="modal-btn" onClick={() => setStep(2)}>Yes</button>
            <button className="modal-btn secondary" onClick={() => setStep(0)}>No</button>
          </div>
        </div>
      )}
      
      {step === 2 && (
        <div className="modal-overlay">
          <div className="glass-panel modal-content">
            <h2>Are you really, really sure?</h2>
            <button className="modal-btn" onClick={() => setStep(3)}>Yes</button>
            <button className="modal-btn secondary" onClick={() => setStep(0)}>No</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="modal-overlay">
          <div className="glass-panel modal-content">
            <h2>Positive?</h2>
            <button className="modal-btn" onClick={onNext}>I am positive!</button>
          </div>
        </div>
      )}
    </>
  );
}
`;

const level4 = `
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
            left: \`calc(50% + \${box.x}vw)\`,
            top: \`calc(50% + \${box.y}vh)\`,
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
`;

const level5 = `
import { useState } from 'react';
export default function Level5({ onNext }) {
  const [showSlider, setShowSlider] = useState(false);
  const [progress, setProgress] = useState(0);

  return (
    <>
      {!showSlider && (
        <div className="gift-box" style={{ width: 100, height: 100 }} onClick={() => setShowSlider(true)}>
          <span>Open</span>
        </div>
      )}

      {showSlider && (
        <div className="modal-overlay">
          <div className="glass-panel modal-content" style={{width: 350}}>
            <h2>Slide to unlock</h2>
            <p>Go very slowly... if you rush, it breaks!</p>
            <input 
              type="range" 
              min="0" max="100" 
              value={progress}
              onChange={(e) => {
                if (e.target.value - progress > 5) {
                   setProgress(0); // Reset!
                } else {
                   setProgress(e.target.value);
                   if (e.target.value == 100) onNext();
                }
              }}
              style={{ width: '100%', accentColor: 'var(--primary)', cursor: 'pointer' }}
            />
            <div style={{height: 10, background: 'rgba(255,255,255,0.3)', borderRadius: 5, marginTop: 10, overflow: 'hidden'}}>
               <div style={{height: '100%', width: \`\${progress}%\`, background: 'var(--primary)', transition: 'width 0.1s'}} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
`;

const level6 = `
import { useState, useEffect } from 'react';
export default function Level6({ onNext }) {
  const [pos, setPos] = useState({x: 0, y: 0});

  useEffect(() => {
    const interval = setInterval(() => {
      setPos({
        x: (Math.random() - 0.5) * 80, 
        y: (Math.random() - 0.5) * 80
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="gift-box" 
      style={{ 
        width: 80, height: 80, 
        opacity: 0.05,
        position: 'absolute',
        left: \`calc(50% + \${pos.x}vw)\`,
        top: \`calc(50% + \${pos.y}vh)\`,
        transition: 'left 2s linear, top 2s linear',
        marginLeft: -40, marginTop: -40
      }}
      onClick={onNext}
    >
    </div>
  );
}
`;

const level7 = `
export default function Level7({ onNext }) {
  return (
    <div 
      className="gift-box" 
      style={{ width: 60, height: 60, position: 'relative' }}
    >
      <span>🎁</span>
      <div 
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: 5,
          height: 5,
          cursor: 'pointer',
          zIndex: 10
        }}
        onClick={onNext}
        title="Click here!"
      />
    </div>
  );
}
`;

const level8 = `
import { useState } from 'react';
export default function Level8({ onNext }) {
  const [showModal, setShowModal] = useState(false);
  const [yesPos, setYesPos] = useState({x: 0, y: 0});

  const handleHoverYes = () => {
    setYesPos({
      x: (Math.random() - 0.5) * 400,
      y: (Math.random() - 0.5) * 300
    });
  };

  return (
    <>
      {!showModal && (
        <div className="gift-box" style={{ width: 40, height: 40 }} onClick={() => setShowModal(true)}></div>
      )}
      
      {showModal && (
        <div className="modal-overlay">
          <div className="glass-panel modal-content" style={{position: 'relative', width: 500, height: 400}}>
            <h2>Do you want to see your gift?</h2>
            <div style={{display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '100px'}}>
              <button 
                className="modal-btn secondary" 
                onClick={() => alert('Too bad! Try to catch the Yes button.')}
              >
                No
              </button>
              <button 
                className="modal-btn" 
                style={{
                  position: (yesPos.x || yesPos.y) ? 'absolute' : 'relative',
                  left: (yesPos.x || yesPos.y) ? \`calc(50% + \${yesPos.x}px)\` : 'auto',
                  top: (yesPos.x || yesPos.y) ? \`calc(50% + \${yesPos.y}px)\` : 'auto',
                  transition: 'left 0.1s, top 0.1s'
                }}
                onMouseEnter={handleHoverYes}
                onClick={onNext}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
`;

const level9 = `
import { useState } from 'react';
export default function Level9({ onNext }) {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      {!showModal && (
        <div className="gift-box" style={{ width: 20, height: 20, border: '1px solid white' }} onClick={() => setShowModal(true)}></div>
      )}
      
      {showModal && (
        <div className="modal-overlay">
          <div className="glass-panel modal-content">
            <h2>Cancel gift opening?</h2>
            <div style={{display: 'flex', gap: '20px', justifyContent: 'center'}}>
              <button className="modal-btn secondary" onClick={() => alert('Nope, wrong button!')}>Cancel</button>
              <button className="modal-btn secondary" onClick={onNext}>Abort</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
`;

const level10 = `
export default function Level10({ onNext }) {
  return (
    <div 
      className="gift-box" 
      style={{ 
        width: 3, height: 3, 
        border: 'none',
        borderRadius: 0,
        boxShadow: 'none'
      }} 
      onClick={onNext}
    >
    </div>
  );
}
`;

fs.writeFileSync(path.join(dir, 'Level1.jsx'), level1.trim());
fs.writeFileSync(path.join(dir, 'Level2.jsx'), level2.trim());
fs.writeFileSync(path.join(dir, 'Level3.jsx'), level3.trim());
fs.writeFileSync(path.join(dir, 'Level4.jsx'), level4.trim());
fs.writeFileSync(path.join(dir, 'Level5.jsx'), level5.trim());
fs.writeFileSync(path.join(dir, 'Level6.jsx'), level6.trim());
fs.writeFileSync(path.join(dir, 'Level7.jsx'), level7.trim());
fs.writeFileSync(path.join(dir, 'Level8.jsx'), level8.trim());
fs.writeFileSync(path.join(dir, 'Level9.jsx'), level9.trim());
fs.writeFileSync(path.join(dir, 'Level10.jsx'), level10.trim());

console.log("All levels built successfully.");
