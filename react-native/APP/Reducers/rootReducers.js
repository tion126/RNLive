
'use strict';
import {combineReducers}from 'redux'
import HomeReducer from './Home.js'
import NearReducer from './Near'
import { MainNavigator } from '../Component/NavigatorComponent.js';


function Navigation(state, action) {
  let nextState;
  switch (action.type) {
    
    default:
      nextState = MainNavigator.router.getStateForAction(action, state);
      break;
  }

  return nextState || state;
}


const rootReducers = combineReducers({
    Navigation,
    HomeReducer,
    NearReducer
});

export default rootReducers;
