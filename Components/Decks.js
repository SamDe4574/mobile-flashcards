import React from 'react';
import { Text, View, TouchableOpacity, FlatList, StyleSheet } from 'react-native'
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation'
import { getDecks } from '../utils/api'
import { loadDeckList } from '../actions'



class Decks extends React.Component {

  	toDeckDetails = (title) => {

  		this.props.navigation.navigate('DeckDetails', { title })

  	}

  	renderDeckItem = ({ item }) => {
  		return (
  			<TouchableOpacity
  				style={styles.deck}
  				onPress={() => this.toDeckDetails(item.title)}
  			>
  				<Text>{item.title}</Text>
  				<Text>{item.questions.length}</Text>
  			</TouchableOpacity>
  		)
  	}

  	componentDidMount() {

  		getDecks().then((results) => {
  			this.props.dispatch(loadDeckList(results))
  		})

  	}

  	render() {

  		return (
  			<View style={styles.container}>
  				<FlatList
  					data={this.props.decks}
  					renderItem={this.renderDeckItem}
  					keyExtractor={(item, index) => item.title}
  				/>
  			</View>
  		)
  	}

  }


  function mapStateToProps(decks) {
  	return {
  		decks: Object.keys(decks).map((deck) => decks[deck] )
  	}
  }

export default connect(mapStateToProps)(Decks);


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
