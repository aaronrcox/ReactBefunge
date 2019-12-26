import React from 'react';
import './App.scss';
import BefungeIde from './Components/BefungeIde/BefungeIde';

export default function App() {

    return (
        <div className="App" style={{width: 'calc(100%)', height: 'calc(100% )', overflow: 'hidden'}}>    
            <BefungeIde></BefungeIde>
        </div>
    );
}
