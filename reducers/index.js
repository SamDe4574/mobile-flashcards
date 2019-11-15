import { ADD_NEW_DESK, RECEIVE_DECKS, ADD_NEW_CARD } from '../actions';
import {initialDeckData} from '../utils/_Data.js';


export default function(state = initialDeckData, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.payload
        
      }
    case ADD_NEW_DESK:
      return {
        ...state,
        ...action.payload
      }
    case ADD_NEW_CARD:
      const { decKey, card } = action.payload;
      return {
        ...state,
        [decKey]: {
          ...state[decKey],
          questions: state[decKey].questions.concat(card)
        }
      }
    default:
      return state
  }
}
