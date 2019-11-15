import { AsyncStorage } from 'react-native'
import {initialDeckData} from './_DATA.js';


const MOBILE_FLASHCARDS_DECKS_KEY = "MobileFlashCards:Decks"



export function _saveDeck(newDeck) {
  // clearStorage();

  AsyncStorage.getItem(MOBILE_FLASHCARDS_DECKS_KEY).then((initialDeckData) => {
    const decksJSON = JSON.parse(initialDeckData);
    const mergeDesks = { ...decksJSON, ...newDeck };
    AsyncStorage.setItem(MOBILE_FLASHCARDS_DECKS_KEY, JSON.stringify(mergeDesks), () => {
      AsyncStorage.getItem(MOBILE_FLASHCARDS_DECKS_KEY).then(loggerResults);
    });
  });
}


export function _getDecks() {
  return AsyncStorage.getItem(MOBILE_FLASHCARDS_DECKS_KEY)
    .then(response => JSON.parse(response))
      .then(response => {
        return response !== null
          ? response
          : dataStore
  });
}


export function _saveCardToDeck(decKey, card) {
  return AsyncStorage.getItem(MOBILE_FLASHCARDS_DECKS_KEY).then((initialDeckData) => {
    const decks = JSON.parse(initialDeckData);
    decks[decKey].questions.push(card);
    AsyncStorage.setItem(MOBILE_FLASHCARDS_DECKS_KEY, JSON.stringify(decks));
  });

export function clearStorage() {
  AsyncStorage.setItem(MOBILE_FLASHCARDS_DECKS_KEY, '');
}

export function loggerResults(results) {
  console.log('Newdecks Stored [deckResults]: ', JSON.parse(results));
}