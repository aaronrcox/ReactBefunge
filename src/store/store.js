
import { createStore, applyMiddleware, compose } from 'redux'
import { createEpicMiddleware } from 'redux-observable';

import {
    reducer as textGridReducer, 
    epics as textGridEpics
} from '../Components/TextGrid/store';

const epicMiddleware = createEpicMiddleware();


const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
    textGridReducer, 
    composeEnhancer(applyMiddleware(epicMiddleware))
);

epicMiddleware.run(textGridEpics);


