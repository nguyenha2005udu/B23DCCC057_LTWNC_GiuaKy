import { configureStore } from '@reduxjs/toolkit';
import books from '../features/books/booksSlice';
import { borrowLimitMiddleware } from '../features/books/borrowLimitMiddleware';
export const createAppStore = () =>
  configureStore({
    reducer: { books },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(borrowLimitMiddleware),
  });
export const store = createAppStore();
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
