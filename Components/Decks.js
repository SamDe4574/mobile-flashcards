import React from 'react';
import { StyleSheet, Text, View , ScrollView , TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import DeckDetails from './DeckDetails';
import { NavigationActions } from 'react-navigation'

const Deck = ({ deck , navigation }) => (
  <TouchableOpacity
    style={styles.deck}
    onPress={() => navigation.navigate('DeckDetails', deck.title )} 
  >
    <Text>{deck.title}</Text>
  </TouchableOpacity>
  )

class Decks extends React.Component {

  render(){
  return (
    <ScrollView style={styles.container}>
        {this.props.decks.map((deck) => (
          <Deck
          deck={deck}
          navigation={this.props.navigation}
          key={deck.title}
          />
          ))
        }
      </ScrollView>
  )
}
}

const mapStateToProps = state =>{
  return{
    decks: Object.keys(state).map((deck) => state[deck] )
  }
}

export default connect(mapStateToProps)(Decks);


// Component Styles
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white'
	},
	deck: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 20,
		borderBottomColor: 'black',
		borderBottomWidth: 1
	}
})
