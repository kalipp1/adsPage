import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import initialState from './initialState';
import { thunk } from 'redux-thunk';
import advertisementsReducer from './advertisementsRedux';
import usersReducer from './usersRedux';

const subreducers = {
    advertisements: advertisementsReducer,
    user: usersReducer,
}

const reducer = combineReducers(subreducers);

const composedEnhancers = compose(
    applyMiddleware(thunk),
    composeWithDevTools()    
  );

  const store = createStore(
    reducer,
    initialState,
    composedEnhancers
  );

export default store;