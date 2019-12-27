import React from 'react';
import { Provider } from 'react-redux';
import './App.scss';
import BefungeIde from './Components/BefungeIde/BefungeIde';
import { store } from './store';


export default function App() {

    return (
        <Provider store={store}>
            <div className="App" style={{width: 'calc(100%)', height: 'calc(100% )', overflow: 'hidden'}}>    
                <BefungeIde></BefungeIde>
            </div>
        </Provider>
    );
}
