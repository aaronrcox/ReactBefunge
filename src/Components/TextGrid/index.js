
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import TextGridImpl, {TextGridStatusBar, TextGridConsole} from './TextGrid';

export * from './TextGrid';

export default function TextGrid(props) {
    return(<Provider store={store}>
        <div className="text-grid-container" style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
            <TextGridImpl {...props} ></TextGridImpl>
            <TextGridConsole></TextGridConsole>
            <TextGridStatusBar></TextGridStatusBar>
        </div>
    </Provider>);
}