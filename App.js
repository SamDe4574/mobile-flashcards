import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import {createStore} from "redux";
import reducers from './reducers'
import middleware from './middleware'
import MainNavigator from './navigator';

const store = createStore(reducers,middleware)

export default function App() {
  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
}
