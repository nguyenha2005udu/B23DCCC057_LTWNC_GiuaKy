import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { getBooks } from '../../api/booksApi';
import { isSuccess, type Book, type Loan } from './types';
export interface BooksState {
  items: Book[];
  loans: Loan[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  warning: string | null;
}
export const initialState: BooksState = {
  items: [],
  loans: [],
  status: 'idle',
  error: null,
  warning: null,
};
export const fetchBooks = createAsyncThunk<
  Book[],
  boolean | undefined,
  {
    rejectValue: string;
  }
>(
  'books/fetch',
  async (shouldFail, { rejectWithValue }) => {
    const response = await getBooks(shouldFail);
    if (isSuccess(response)) {
      return response.data;
    }
    return rejectWithValue(response.error);
  },
  {
    condition: (_, { getState }) => {
      const state = getState() as {
        books: BooksState;
      };
      return state.books.status === 'idle' || state.books.status === 'failed';
    },
  },
);
const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    borrowBook(state, action: PayloadAction<string>) {
      const book = state.items.find((b) => b.id === action.payload);
      if (!book || book.available === 0) return;
      const alreadyBorrowed = state.loans.some((loan) => loan.id === book.id);
      if (alreadyBorrowed) return;
      book.available--;
      state.loans.push({ id: book.id });
      state.warning = null;
    },
    returnBook(state, action: PayloadAction<string>) {
      const loan = state.loans.find((l) => l.id === action.payload);
      const book = state.items.find((b) => b.id === action.payload);
      if (loan && book) {
        book.available++;
        state.loans = state.loans.filter((l) => l.id !== action.payload);
        state.warning = null;
      }
    },
    setWarning(state, action: PayloadAction<string | null>) {
      state.warning = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ?? action.error.message ?? 'Có lỗi xảy ra';
      });
  },
});
export const { borrowBook, returnBook, setWarning } = booksSlice.actions;
export default booksSlice.reducer;
