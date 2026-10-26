import { memo } from 'react';
import type { Book } from './types';
interface Props {
  book: Book;
  borrowed: boolean;
  onBorrow: (id: string) => void;
  onReturn: (id: string) => void;
}
export const BookCard = memo(function BookCard({ book, borrowed, onBorrow, onReturn }: Props) {
  return (
    <article className="book-card">
      <div className="book-body">
        <div className="book-meta">
          <span>{book.category}</span>
          <span>Năm {book.year}</span>
        </div>
        <h3>{book.title}</h3>
        <p>{book.author}</p>
        <div className="book-bottom">
          <span className={book.available === 0 ? 'stock empty' : 'stock'}>
            {book.available === 0 ? 'Hết bản' : `Còn ${book.available} bản`}
          </span>
          {borrowed ? (
            <button className="return" onClick={() => onReturn(book.id)}>
              Trả
            </button>
          ) : (
            <button disabled={book.available === 0} onClick={() => onBorrow(book.id)}>
              Mượn
            </button>
          )}
        </div>
      </div>
    </article>
  );
});
