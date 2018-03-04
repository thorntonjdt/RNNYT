import { createStore, applyMiddleware, combineReducers } from 'redux';
import promiseMiddleware from 'redux-promise';
import navigationReducer from './reducers/navigationReducer';
import newsFeedReducer from './reducers/newsFeedReducer';
import searchTermReducer from './reducers/searchTermReducer';
import bookmarkReducer from './reducers/bookmarkReducer';

export default (initialState = {}) => (
  createStore(
    combineReducers({
      news: newsFeedReducer,
      searchTerm: searchTermReducer,
      navigation: navigationReducer,
      bookmarks: bookmarkReducer
    }),
    initialState,
    applyMiddleware(promiseMiddleware)
  )
);
