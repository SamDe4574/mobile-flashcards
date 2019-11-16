import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { Provider , connect} from 'react-redux';
import {createStore} from "redux";
import reducers from './reducers';
import middleware from './middleware';
import MainNavigator from './navigator';
import {createNotification , setLocalNotification} from './utils/helpers';
import Constants from 'expo-constants';
import {black} from './utils/colors';

const store = createStore(reducers,middleware);

function AppStatusBar ({backgroundColor , ...props}){
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
    </View>
  )
}

export default class App extends React.Component {
  ComponentDidMount(){
    setLocalNotification()
  }

  action = () => {
    createNotification()
      .then(setLocalNotification)
  }

  render() {
  return (
    <Provider store={store}>
      <AppStatusBar backgroundColor={black} barStyle='light-content' />
      <MainNavigator />
    </Provider>
  )}
}
