import { configureStore } from '@reduxjs/toolkit';
import { api } from './api';
import themeReducer from '../features/themeSlice';
import languageReducer from '../features/languageSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    language: languageReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
