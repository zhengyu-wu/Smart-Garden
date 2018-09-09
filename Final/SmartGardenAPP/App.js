import React from 'react';
import rootReducer from './src/reducers/rootReducer';
import {Provider} from 'react-redux';
import Root from './src/components/Root';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import RootStack from './src/components/RootStack';

const store=createStore(rootReducer, {}, applyMiddleware(thunk, promise()));
console.disableYellowBox = true;

export default class App extends React.Component {
  render() {
    return (
        <Provider store={store}>
          <RootStack/>
        </Provider>
    );
  }
}

