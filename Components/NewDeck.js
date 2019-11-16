import React, {Component} from 'react'
import { View, KeyboardAvoidingView, Text, TextInput, StyleSheet, Alert , TouchableOpacity} from 'react-native'
import { connect } from 'react-redux'
import { addNewDeck } from '../actions'
import { saveDeck } from '../utils/api'
import { gray, white } from '../utils/colors'
import { NavigationActions } from 'react-navigation'
import { alertMessage } from '../utils/helpers';


class NewDeck extends Component {
  state = {
    title: ''
  }

  toDeckInfo = (deck) => {
    // going back to home and then to "DeckInfo"
    // so DeckInfo can back to home when done

    this.props.navigation.dispatch(NavigationActions.back({
      key: 'NewDeck'
    }))

    this.props.navigation.navigate(
      'DeckInfo',
      { deck: deck }
    )
  }

  onSubmit = () => {
    const { title } = this.state;
    if (title.length >= 3) {
      this.props.addNewDeck(this.state.title);
      alertMessage('Success!!', 'A new deck was added!!', () =>     this.props.navigation.dispatch(NavigationActions.back({key: 'NewDeck'})));
      this.setState(() => ({
        title: ''
      }))
    } else {
      alertMessage('Sorry!!', 'The deck title needs at least 5 characters!', () => false);
    }
  }

  render() {
    return (
      <KeyboardAvoidingView
        behavior="padding"
        style={styles.container}>
        <View>
          <Text style={styles.title}>
            What is the title of your new deck?
          </Text>
        </View>
        <View>
          <TextInput
            style={styles.input}
            onChangeText={(title) => this.setState(() => ({title}))}
            value={this.state.title}
            placeholder="Deck Title"
            autoFocus={true}
          />
        </View>
        <View>
          <TouchableOpacity
            onPress={() => this.onSubmit()}>
            <Text>Create Deck</Text>
            </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: white,
    paddingBottom: 20
  },
  title: {
    fontSize: 26,
    textAlign: 'center'
  },
  input: {
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
    height: 40,
    margin: 10,
    padding: 10,
    alignSelf: 'center'
  }
})

const mapStateToProps = ({ decks }) => ({ decks })

export default connect(mapStateToProps, { addNewDeck })(NewDeck)
