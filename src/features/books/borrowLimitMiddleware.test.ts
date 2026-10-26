import { createAppStore } from '../../app/store';
import { borrowBook, returnBook, fetchBooks } from './booksSlice';
import { seedBooks } from '../../api/booksApi';
test('middleware chặn cuốn thứ tư và cho mượn sau khi trả', () => {
  const store = createAppStore();
  store.dispatch(fetchBooks.fulfilled(seedBooks, 'r', false));
  for (const id of ['ts', 'clean', 'react']) store.dispatch(borrowBook(id));
  store.dispatch(borrowBook('econ'));
  expect(store.getState().books.loans).toHaveLength(3);
  expect(store.getState().books.items.find((b) => b.id === 'econ')?.available).toBe(5);
  expect(store.getState().books.warning).toContain('tối đa 3');
  store.dispatch(returnBook('ts'));
  store.dispatch(borrowBook('econ'));
  expect(store.getState().books.loans.map((l) => l.id)).toContain('econ');
  expect(store.getState().books.warning).toBeNull();
});
