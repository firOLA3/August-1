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