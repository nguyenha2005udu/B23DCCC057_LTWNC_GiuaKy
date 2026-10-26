import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BookCard } from './BookCard';
import { seedBooks } from '../../api/booksApi';
const book = seedBooks[0];
test('hiển thị đầy đủ thông tin sách', () => {
  render(<BookCard book={book} borrowed={false} onBorrow={jest.fn()} onReturn={jest.fn()} />);
  expect(screen.getByRole('heading', { name: book.title })).toBeInTheDocument();
  expect(screen.getAllByText(book.author).length).toBeGreaterThan(0);
  expect(screen.getAllByText('CNTT').length).toBeGreaterThan(0);
  expect(screen.getByText('Năm 2019')).toBeInTheDocument();
  expect(screen.getByText('Còn 4 bản')).toBeInTheDocument();
});
test('click Mượn gọi đúng id', async () => {
  const onBorrow = jest.fn();
  render(<BookCard book={book} borrowed={false} onBorrow={onBorrow} onReturn={jest.fn()} />);
  await userEvent.setup().click(screen.getByRole('button', { name: 'Mượn' }));
  expect(onBorrow).toHaveBeenCalledTimes(1);
  expect(onBorrow).toHaveBeenCalledWith('ts');
});
test('hết bản thì vô hiệu hóa Mượn', async () => {
  const onBorrow = jest.fn();
  render(
    <BookCard
      book={{ ...book, available: 0 }}
      borrowed={false}
      onBorrow={onBorrow}
      onReturn={jest.fn()}
    />,
  );
  const button = screen.getByRole('button', { name: 'Mượn' });
  expect(button).toBeDisabled();
  await userEvent.setup().click(button);
  expect(onBorrow).not.toHaveBeenCalled();
});
test('sách đang mượn có thể trả kể cả khi hết bản', async () => {
  const onReturn = jest.fn();
  render(
    <BookCard book={{ ...book, available: 0 }} borrowed onBorrow={jest.fn()} onReturn={onReturn} />,
  );
  await userEvent.setup().click(screen.getByRole('button', { name: 'Trả' }));
  expect(onReturn).toHaveBeenCalledWith('ts');
});
