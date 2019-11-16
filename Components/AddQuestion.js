import React, { Component } from 'react'
import { Text, View, TextInput, ScrollView, KeyboardAvoidingView, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import { connect } from 'react-redux'
import { addCardToDeck } from '../actions'
import { saveCardToDeck } from '../utils/api'
import { NavigationActions } from 'react-navigation'
import { gray, white } from '../utils/colors'


class AddQuestion extends Component {

	state = {
		questionInput: '',
		answerInput: '',
		error: false
	}

	handleQuestionTextChange = (questionInput) => {
		this.setState(() => ({
			questionInput
		}))
	}

	handleAnswerTextChange = (answerInput) => {
		this.setState(() => ({
			answerInput
		}))
	}

	addQuestion = () => {

		if (this.state.questionInput !== '' && this.state.answerInput !== '')
		{
			const deckTitle = this.props.title

			const newCard = {
				question: this.state.questionInput,
				answer: this.state.answerInput
			}

			saveCardToDeck(deckTitle, newCard).then(() => {
				this.props.dispatch(addCardToDeck(deckTitle, newCard))
			})

			this.toDetails()
		}
		else
		{
			this.setState(() => ({
				error: true
			}))
		}

	}

	toDetails = () => {
		this.props.navigation.dispatch(NavigationActions.back('DeckDetails'))
	}

	render() {

		return (
			<ScrollView contentContainerStyle={styles.container} scrollable={false}>

				<KeyboardAvoidingView style={styles.subContainer} keyboardVerticalOffset={Platform.OS === 'ios' ? 75 : 0} behavior="padding" enabled>

					<View>
						<Text style={styles.title}>{this.props.title}</Text>
					</View>

					<TextInput
						value={this.state.questionInput}
						style={styles.input}
						multiline={true}
						placeholder='Add the question here...'
						underlineColorAndroid='transparent'
						onChangeText={this.handleQuestionTextChange}
					/>

					<TextInput
						value={this.state.answerInput}
						style={styles.input}
						multiline={true}
						placeholder='Add the answer here...'
						underlineColorAndroid='transparent'
						onChangeText={this.handleAnswerTextChange}
					/>

					<View>
					{ this.state.error && <Text style={{color: 'red'}}>Card must include a question and an answer</Text> }

					<TouchableOpacity
						style={Platform.OS === 'ios' ? [styles.btn, styles.iosBtn] : [styles.btn, styles.androidBtn]}
						onPress={this.addQuestion}
						>
						<Text>Add Card</Text>
					</TouchableOpacity>
					</View>

				</KeyboardAvoidingView>

			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
		padding: 20
	},
	subContainer: {
		flex: 1,
		justifyContent: 'space-around',
		alignItems: 'center'
	},
	title: {
		fontSize: 22
	},
  input: {
    fontSize: 20,
    borderColor: gray,
    borderWidth: 1,
    borderRadius: 5,
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0,0,0,0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    },
    width: 300,
    height: 60,
    margin: 10,
    padding: 10
  },
	btn: {
		padding: 10,
		marginBottom: 25,
		borderWidth: 1
	},
	iosBtn: {
		borderRadius: 7,
	},
	androidBtn: {
		borderRadius: 2,
	},
})

function mapStateToProps(state, props) {
	return {
		title: props.navigation.state.params.title
	}
}

export default connect(mapStateToProps)(AddQuestion)
