import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Decks from './Components/Decks';
import NewDeck from './Components/NewDeck';
import DeckDetails from './Components/DeckDetails';
import AddQuestion from './Components/AddQuestion';
import Quiz from './Components/Quiz';
import { createBottomTabNavigator, createAppContainer , createSwitchNavigator} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
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

const BtnStack = createStackNavigator({
  Home: {
    screen: TabNavigator,
    navigationOptions: {
      title: 'Home',
    }
  },
  DeckDetails: {
    screen: DeckDetails,
    navigationOptions: {
      title: 'Deck Details',
    }
  },
  AddQuestion: {
    screen: AddQuestion,
    navigationOptions: {
      title: 'Add Question',
      }
    },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      title: 'Quiz',
    }
  },
});

const MainNavigator = createAppContainer(createSwitchNavigator(
  {
    BtnStack: BtnStack,
  }));

export default MainNavigator;
