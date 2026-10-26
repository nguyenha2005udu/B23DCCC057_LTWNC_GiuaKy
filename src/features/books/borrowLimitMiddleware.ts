import type { Middleware } from '@reduxjs/toolkit';
import { borrowBook, setWarning, type BooksState } from './booksSlice';
export const borrowLimitMiddleware: Middleware<
  object,
  {
    books: BooksState;
  }
> = (store) => (next) => (action) => {
  if (borrowBook.match(action)) {
    const { loans, items } = store.getState().books;
    const book = items.find((b) => b.id === action.payload);
    if (book && book.available > 0 && !loans.some((l) => l.id === book.id) && loans.length >= 3) {
      store.dispatch(
        setWarning(
          'Bạn chỉ được mượn tối đa 3 cuốn cùng lúc. Hãy trả một cuốn trước khi mượn thêm.',
        ),
      );
      return;
    }
  }
  return next(action);
};
