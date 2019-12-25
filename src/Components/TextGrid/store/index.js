import { createStore, applyMiddleware } from 'redux'
import { createEpicMiddleware } from 'redux-observable';
import { reducer } from './reducers';
import { epics } from './epics';
import * as actions from './actions';

export { actions };

export * from './actions';
export * from './epics';
export * from './reducers';

const epicMiddleware = createEpicMiddleware();
export const store = createStore(reducer, applyMiddleware(epicMiddleware));

epicMiddleware.run(epics);