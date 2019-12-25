import React from 'react';
import './App.scss';
import TextGrid from './Components/TextGrid';

export default function App() {
  const text = 
`
Hello world,
the quick brown fox 
jumps over
the lazy 
dog
`;

  return (
    <div className="App">
        <div style={{width: 'calc(100%)', height: 'calc(100% )', overflow: 'hidden'}}>
          <TextGrid tw={32} th={32} text={text}></TextGrid>
        </div>
    </div>
  );
}
