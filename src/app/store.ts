// src/app/store.ts
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from '@/features/user/userSlice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Combine reducers
const rootReducer = combineReducers({
  user: userReducer,
  // ...add any other reducers here
});

// This is the persist config
const persistConfig = {
  key: 'root',
  storage,

  // Only the 'user' slice will be persisted.
  whitelist: ['user'],
};

// Create the persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Create the persistor
export const persistor = persistStore(store);

// Infer types (It's better to infer RootState from the rootReducer)
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
