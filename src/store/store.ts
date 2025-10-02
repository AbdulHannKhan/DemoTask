import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  combineReducers,
  getDefaultMiddleware,
  configureStore,
} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import {thunk} from 'redux-thunk';
import common from './common';
import court from './courtSlice';
import onBoarding from './onBoarding';
const allReducer = combineReducers({
  common,
  onBoarding,
  court,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whiteList: ['onBoarding', 'court'],
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
