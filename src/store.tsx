import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit'

import { gamereducer } from './redux/reducer/gameReducer';
import thunk from 'redux-thunk'; 

const rootReducer = combineReducers({
    gamereducer,
});
const store = configureStore({ reducer: rootReducer ,middleware: [thunk]});


export default store;
