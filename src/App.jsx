import { useState } from 'react'
import Level1 from './components/levels/Level1'
import Level2 from './components/levels/Level2'
import Level3 from './components/levels/Level3'
import Level4 from './components/levels/Level4'
import Level5 from './components/levels/Level5'


import FinalGreeting from './components/FinalGreeting'
import './index.css'

function App() {
  const [level, setLevel] = useState(1);

  const nextLevel = () => {
    setLevel(prev => prev + 1);
  };

  const renderLevel = () => {
    switch (level) {
      case 1: return <Level1 onNext={nextLevel} />;
      case 2: return <Level2 onNext={nextLevel} />;
      case 3: return <Level3 onNext={nextLevel} />;
      case 4: return <Level4 onNext={nextLevel} />;
      case 5: return <Level5 onNext={nextLevel} />;
      case 6: return <FinalGreeting />;
      default: return <Level1 onNext={nextLevel} />;
    }
  };

  return (
    <>
      {level < 6 && (
        <>
          <h1 className="title">A Special Gift For You...</h1>
          <p className="subtitle">Just open the box to see it!</p>
        </>
      )}
      {renderLevel()}
    </>
  )
}

export default App
