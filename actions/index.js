export const ADD_NEW_DESK = 'ADD_NEW_DESK';
export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export const ADD_NEW_CARD = 'ADD_NEW_CARD';

import {
  getDecks,
  saveDeck,
  saveCardToDeck
} from '../utils/api';

export function loadDeckList() {
  return dispatch => {
    getDecks().then((results) => {
      dispatch({ type: RECEIVE_DECKS, payload: results });
    });
  }
}

export function addNewDeck(title) {
  const questions = new Array();
  let newDeck = {}
  newDeck[title] = { title: title, questions: new Array() }
  saveDeck(newDeck)
  return {
    type: ADD_NEW_DESK,
    payload: newDeck
  }
}

export function addCardToDeck(decKey, card) {
  return dispatch => {
    // The application will update modified state only...
    saveCardToDeck(decKey, card).then(() => {
      dispatch({
        type: ADD_NEW_CARD,
        payload: {
          decKey,
          card: card
        }
      });
    })
  }
}
