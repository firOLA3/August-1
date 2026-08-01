export default function Level1({ onNext }) {
  return (
    <div className="gift-box" style={{ width: 250, height: 250 }} onClick={onNext}>
      <span style={{fontSize: '1.5rem'}}>Open Me</span>
    </div>
  );
}