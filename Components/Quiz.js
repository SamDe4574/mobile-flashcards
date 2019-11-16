import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Platform, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'
import { Ionicons } from '@expo/vector-icons'

class Quiz extends Component {

	state = {
		questionAnswerToggle: false,
		answered: 0,
		correct: 0
	}

	handleCorrectQuestion = () => {

		this.props.deck.questions.push(this.props.deck.questions.shift())

		const newAnswered = this.state.answered + 1

		this.setState(() => ({
			answered: newAnswered,
			correct: this.state.correct + 1
		}))

		if ( newAnswered === this.props.questionCount )
		{
			clearLocalNotification().then(setLocalNotification)
		}
	}

	handleIncorrectQuestion = () => {

		this.props.deck.questions.push(this.props.deck.questions.shift())
    const newAnswered = this.state.answered + 1

		this.setState(() => ({
			answered: this.state.answered + 1
		}))

		if ( newAnswered === this.props.questionCount )
		{
			clearLocalNotification().then(setLocalNotification)
		}
	}

	resetQuiz = () => {

		this.setState(() => ({
			questionAnswerToggle: false,
			answered: 0,
			correct: 0
		}))

	}

	render() {

		const { title, questions } = this.props.deck
		const { questionCount } = this.props

		if ( this.state.answered === questions.length )
		{
			return (
				<View style={styles.resultsContainer}>

					<View style={styles.subContainer}>

						<Text
							style={[styles.percent, {
								color: (this.state.correct / questionCount) < 0.8
												? (this.state.correct / questionCount) < 0.7 ? 'red' : 'orange'
												: 'green'
							}]}
						>{ Math.round((this.state.correct / questionCount) * 100) }%</Text>

						<Text
							style={styles.flipper}
						>{this.state.correct}/{questionCount} Correct</Text>

					</View>

					<TouchableOpacity
						style={[styles.reset_btn,
							Platform.OS === 'ios' ? styles.iosBtn : styles.androidBtn
						]}
						onPress={this.resetQuiz}
					>
						<Text style={styles.reset_text}>Restart Quiz</Text>
					</TouchableOpacity>

				</View>
			)
		}

		return (
			<View style={styles.container}>

				{
					questions.map((question, index) => (

						<View key={index} style={[styles.card, {position: 'absolute', zIndex: index}]}>
							{
								!this.state.questionAnswerToggle

								? <Text style={styles.question}>{question.question}</Text>

								: <Text style={styles.question}>{question.answer}</Text>
							}

							<TouchableOpacity
								onPress={() => this.setState(() => ({ questionAnswerToggle: !this.state.questionAnswerToggle }))}
							>
								{
									this.state.questionAnswerToggle

									? <Text style={styles.flipper}>Question</Text>

									: <Text style={styles.flipper}>Answer</Text>
								}
							</TouchableOpacity>

						</View>

					))
				}

				<View style={{marginTop: 300, justifyContent: 'center', alignItems: 'center'}}>

					<View style={{marginBottom: 20}}>
						<Text style={{fontSize: 22}}>
							{this.state.answered}/{questionCount} answered
						</Text>
					</View>

					<TouchableOpacity
						style={[styles.question_btn, {borderColor: 'green'}]}
						onPress={this.handleCorrectQuestion}
					>
						{
							Platform.OS === 'ios'
							? <Ionicons name='ios-checkmark-circle-outline' size={66} style={styles.correct} />
							: <Ionicons name='md-checkmark-circle-outline' size={66} style={styles.correct} />
						}
					</TouchableOpacity>

					<TouchableOpacity
						style={[styles.question_btn, {borderColor: 'red'}]}
						onPress={this.handleIncorrectQuestion}
					>
						{
							Platform.OS === 'ios'
							? <Ionicons name='ios-close-circle-outline' size={66} style={styles.incorrect} />
							: <Ionicons name='md-close' size={66} style={styles.incorrect} />
						}
					</TouchableOpacity>

				</View>

			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'center',
		padding: 20
	},
	resultsContainer: {
		flex: 1,
		backgroundColor: 'white',
		justifyContent: 'space-around',
		alignItems: 'center',
		padding: 20
	},
	subContainer: {
		justifyContent: 'flex-start',
		alignItems: 'center'
	},
	card: {
		justifyContent: 'space-between',
		alignItems: 'center',
		height: Dimensions.get('window').height / 3,
		width: Dimensions.get('window').width - 40,
		borderWidth: 1,
		backgroundColor: 'white',
		marginTop: 20,
		padding: 20
	},
	question: {
		fontSize: 33,
		textAlign: 'center'
	},
	flipper: {
		fontSize: 22
	},
	question_btn: {
		margin: 10,
	},
	correct: {
		textAlign: 'center',
		color: 'green'
	},
	incorrect: {
		textAlign: 'center',
		color: 'red'
	},
	percent: {
		fontSize: 55,
		marginBottom: 20
	},
	reset_btn: {
		borderRadius: 7,
		borderWidth: 1,
		padding: 10
	},
	reset_text: {
		fontSize: 22
	},
	iosBtn: {
		borderRadius: 7,
	},
	androidBtn: {
		borderRadius: 2,
	},
})

function mapStateToProps(state, props) {

	const currentDeck = props.navigation.state.params.title

	return {
		deck: currentDeck ? state[currentDeck] : {},
		questionCount: state[currentDeck].questions.length
	}
}

export default connect(mapStateToProps)(Quiz)
