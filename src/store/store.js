
import { createStore, applyMiddleware } from 'redux'
import { createEpicMiddleware } from 'redux-observable';

import {
    reducer as textGridReducer, 
    epics as textGridEpics
} from '../Components/TextGrid/store';

const epicMiddleware = createEpicMiddleware();

export const store = createStore(textGridReducer, applyMiddleware(epicMiddleware));

epicMiddleware.run(textGridEpics);


