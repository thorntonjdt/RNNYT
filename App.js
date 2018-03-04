import React from 'react';
import { Provider } from 'react-redux';
import NavContainer from './src/containers/NavContainer';
import createStore from './src/createStore';

const store = createStore();

export default () => (
  <Provider store={store}>
    <NavContainer />
  </Provider>
);
