import { combineReducers } from 'redux';
import {
    UPDATE_PRICE
 } from './actions'
 
 const coins = (state = {
 }, action) => {
    let currCoin = state[action.coin]?state[action.coin]:{};
   switch (action.type) {
       
     case UPDATE_PRICE:
       return {
         ...state,
         [action.ticker]: {
            ...currCoin,
            price: action.price
         }
       };
     default:
       return state
   }
 }
 
 export default combineReducers({coins: coins});