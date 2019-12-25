import React from 'react';
import './App.scss';
import TextGrid, { actions } from './Components/TextGrid';

export default function App() {
  const text = 
`
Hello world,
the quick brown fox 
jumps over
the lazy 
dog
`;

  const handleKeyPress = (store, key) => {
    if( key === 'v') return { preventDefault: false, actions: [actions.setTypeingDir( 0, 1)] };
    if( key === '>') return { preventDefault: false, actions: [actions.setTypeingDir( 1, 0)] };
    if( key === '<') return { preventDefault: false, actions: [actions.setTypeingDir(-1, 0)] };
    if( key === '^') return { preventDefault: false, actions: [actions.setTypeingDir( 0,-1)] };
    return {};
  }

  return (
    <div className="App">
        <div style={{width: 'calc(100%)', height: 'calc(100% )', overflow: 'hidden'}}>
          <TextGrid tw={32} th={32} text={text} onKeyDown={handleKeyPress} ></TextGrid>
        </div>
    </div>
  );
}
