import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Alert, StyleSheet, Platform } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { gray, white } from '../utils/colors'

class DeckDetails extends Component {


	static navigationOptions = ({ navigation }) => ({
		title: `${navigation.state.params.title}`
	})

	toAddQuestion = () => {

		this.props.navigation.navigate('AddQuestion', {title: this.props.deck.title})

	}

	toQuiz = () => {
			this.props.navigation.navigate('Quiz', {title: this.props.deck.title})
	}

	toHome = () => {
		this.props.navigation.dispatch(NavigationActions.back('Home'))
	}

	render() {

		const { title, questions } = this.props.deck

		return (
			<View style={styles.container}>

				<View>

					<TouchableOpacity
						style={Platform.OS === 'ios' ? styles.ios_btn : styles.android_btn}
						onPress={this.toAddQuestion}
					>
						<Text style={styles.btn_text}>Add Card</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={Platform.OS === 'ios' ? styles.ios_btn : styles.android_btn}
						onPress={this.toQuiz}
					>
						<Text style={styles.btn_text}>Start Quiz</Text>
					</TouchableOpacity>

				</View>

			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
		justifyContent: 'space-evenly',
		alignItems: 'center',
		padding: 20
	},
	title: {
		fontSize: 44
	},
	ios_btn: {
		borderWidth: 1,
		borderRadius: 7,
		padding: 10,
		margin: 10
	},
	android_btn: {
		borderWidth: 1,
		borderRadius: 2,
		padding: 10,
		margin: 10
	},
	btn_text: {
		textAlign: 'center',
		fontSize: 22
	}
})

function mapStateToProps(state, props) {

	const currentDeck = props.navigation.state.params.title

	return {
		deck: currentDeck ? state[currentDeck] : {},
		title: currentDeck ? currentDeck : null
	}

}

export default connect(mapStateToProps)(DeckDetails)
