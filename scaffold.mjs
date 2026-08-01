import fs from 'fs';
import path from 'path';

const componentsDir = './src/components';
const levelsDir = path.join(componentsDir, 'levels');

fs.mkdirSync(levelsDir, { recursive: true });

for (let i = 1; i <= 10; i++) {
  const code = `
export default function Level${i}({ onNext }) {
  const size = 300 - (i * 25); 
  return (
    <div 
      className="gift-box" 
      style={{ width: size, height: size }}
      onClick={onNext}
    >
    </div>
  );
}
`;
  fs.writeFileSync(path.join(levelsDir, `Level${i}.jsx`), code.trim());
}

const finalGreetingCode = `
export default function FinalGreeting() {
  return (
    <div style={{color: 'var(--primary)', fontSize: '3rem'}}>
      Happy Girlfriend's Day!
    </div>
  );
}
`;
fs.writeFileSync(path.join(componentsDir, `FinalGreeting.jsx`), finalGreetingCode.trim());
