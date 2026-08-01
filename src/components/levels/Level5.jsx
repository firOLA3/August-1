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
               <div style={{height: '100%', width: `${progress}%`, background: 'var(--primary)', transition: 'width 0.1s'}} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}