import { configureStore, combineReducers } from '@reduxjs/toolkit';

import { storage } from '../helpers/common';
import { auth } from './reducers/auth';
import { actionTypes } from './constant/action-types';
import { highlights } from './reducers/highlisghts';


const combinedReducer = combineReducers({
  auth: auth ,
  highlights : highlights
})


const rootReducer = (state, action) => {
   if (action.type === actionTypes.LOGOUT) {
    state = undefined;
    storage.clear();
    
  }
  return combinedReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
    serializableCheck: false,
    }),
});
