import reducer, { initialState, borrowBook, returnBook, fetchBooks } from './booksSlice';
import { seedBooks } from '../../api/booksApi';
const loaded = () => ({ ...initialState, items: seedBooks.map((b) => ({ ...b })) });
test('trạng thái ban đầu', () =>
  expect(reducer(undefined, { type: 'init' })).toEqual(initialState));
test('pending bắt đầu tải và xóa lỗi', () =>
  expect(reducer({ ...initialState, error: 'old' }, fetchBooks.pending('r', false))).toMatchObject({
    status: 'loading',
    error: null,
  }));
test('fulfilled lưu sách', () =>
  expect(reducer(initialState, fetchBooks.fulfilled(seedBooks, 'r', false))).toMatchObject({
    status: 'succeeded',
    items: seedBooks,
  }));
test('rejected lưu lỗi', () =>
  expect(reducer(initialState, fetchBooks.rejected(null, 'r', false, 'Lỗi API'))).toMatchObject({
    status: 'failed',
    error: 'Lỗi API',
  }));
test('mượn giảm tồn kho và lưu loan', () => {
  const state = reducer(loaded(), borrowBook('ts'));
  expect(state.items[0].available).toBe(3);
  expect(state.loans).toEqual([{ id: 'ts' }]);
});
test('không mượn sách hết bản hoặc mượn trùng', () => {
  expect(reducer(loaded(), borrowBook('ielts')).loans).toHaveLength(0);
  const state = reducer(loaded(), borrowBook('ts'));
  expect(reducer(state, borrowBook('ts'))).toEqual(state);
});
test('trả tăng tồn kho, không trả hai lần', () => {
  const borrowed = reducer(loaded(), borrowBook('ts'));
  const returned = reducer(borrowed, returnBook('ts'));
  expect(returned.items[0].available).toBe(4);
  expect(returned.loans).toEqual([]);
  expect(reducer(returned, returnBook('ts'))).toEqual(returned);
});
