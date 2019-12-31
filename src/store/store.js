
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { createEpicMiddleware } from 'redux-observable';

import {
    reducer as textGridReducer, 
    epics as textGridEpics
} from '../Components/TextGrid/store';

const epicMiddleware = createEpicMiddleware();

const rootReducer = combineReducers({
    textGrid: textGridReducer
});



const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
    rootReducer, 
    composeEnhancer(applyMiddleware(epicMiddleware))
);

epicMiddleware.run(textGridEpics);