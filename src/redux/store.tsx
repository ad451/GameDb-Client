import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';

import { gameReducer } from './reducer/gameReducer';
import { userReducer } from './reducer/userReducer';

const rootReducer = combineReducers({
  gamesState: gameReducer,
  userState: userReducer
});
const store = configureStore({ reducer: rootReducer, middleware: [thunk] });

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>

export default store;
