import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';

import { gameReducer } from './reducer/gameReducer';
import { reviewReducer } from './reducer/reviewReducer';
import { userReducer } from './reducer/userReducer';
import { listReducer } from './reducer/listReducer';
import { listgameReducer } from './reducer/listgameReducer';
const rootReducer = combineReducers({
  gamesState: gameReducer,
  userState: userReducer,
  reviewState: reviewReducer,
  listState : listReducer,
  listGameState : listgameReducer
});
const store = configureStore({ reducer: rootReducer, middleware: [thunk] });

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;

export default store;
