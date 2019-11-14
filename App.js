import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Decks from './Components/Decks';
import NewDeck from './Components/NewDeck';
import { createBottomTabNavigator, createAppContainer} from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';



const TabNavigator = createMaterialBottomTabNavigator({

      Decks: { screen: Decks,
          navigationOptions:{
              tabBarLabel:'Decks',
              tabBarIcon: ({ tintColor }) => (
                  <View>
                      <Icon style={[{color: tintColor}]} size={25} name={'list'}/>
                  </View>),
          }
      },
      NewDeck: { screen: NewDeck,
          navigationOptions:{
              tabBarLabel:'NewDeck',
              tabBarIcon: ({ tintColor }) => (
                  <View>
                      <Icon style={[{color: tintColor}]} size={25} name={'playlist-add'}/>
                  </View>),
              activeColor: '#edf4f6',
              inactiveColor: '#224b65',
              barStyle: { backgroundColor: '#3b8dad' },
          }
      },
  },
  {
    initialRouteName: "Decks",
    activeColor: '#edf0f6',
    inactiveColor: '#223765',
    barStyle: { backgroundColor: '#3b69ad' },
  },
);


export default createAppContainer(TabNavigator);
