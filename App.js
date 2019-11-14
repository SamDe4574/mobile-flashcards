import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Decks from './Components/Decks';
import NewDeck from './Components/NewDeck';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';



export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
