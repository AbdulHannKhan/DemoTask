import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  combineReducers,
  getDefaultMiddleware,
  configureStore,
} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import {thunk} from 'redux-thunk';
import common from './common';
import product from './productSlice';
import onBoarding from './onBoarding';
const allReducer = combineReducers({
  common,
  onBoarding,
  product,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whiteList: ['onBoarding', 'product'],
};

const persistedReducers = persistReducer(persistConfig, allReducer);

export const store = configureStore({
  reducer: persistedReducers,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persister = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
