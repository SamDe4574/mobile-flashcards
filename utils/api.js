import { AsyncStorage } from 'react-native'
import {initialDeckData} from './_Data.js';


const MOBILE_FLASHCARDS_DECKS_KEY = "MobileFlashCards:Decks"



export function saveDeck(newDeck) {

  AsyncStorage.getItem(MOBILE_FLASHCARDS_DECKS_KEY).then((initialDeckData) => {
    const decksJSON = JSON.parse(initialDeckData);
    const mergeDesks = { ...decksJSON, ...newDeck };
    AsyncStorage.setItem(MOBILE_FLASHCARDS_DECKS_KEY, JSON.stringify(mergeDesks), () => {
      AsyncStorage.getItem(MOBILE_FLASHCARDS_DECKS_KEY).then(loggerResults);
    });
  });
}


export function getDecks() {
  return AsyncStorage.getItem(MOBILE_FLASHCARDS_DECKS_KEY)
    .then(response => JSON.parse(response))
      .then(response => {
        return response !== null
          ? response
          : dataStore
  });
}


export function addCardToDeck(title, card) {

  	return AsyncStorage.getItem(MOBILE_FLASHCARDS_DECKS_KEY).then((results) => {

  		const decks = JSON.parse(results)

  		decks[title].questions.push(card)

  		AsyncStorage.mergeItem(MOBILE_FLASHCARDS_DECKS_KEY, JSON.stringify(decks))

  	})

  }
export function clearStorage() {
  AsyncStorage.setItem(MOBILE_FLASHCARDS_DECKS_KEY, '');
}

export function loggerResults(results) {
  console.log('Newdecks Stored [deckResults]: ', JSON.parse(results));
}
