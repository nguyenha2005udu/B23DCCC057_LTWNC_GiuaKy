import { useMemo, useCallback, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { borrowBook, returnBook } from '../features/books/booksSlice';
import { BookCard } from '../features/books/BookCard';
import { categories } from '../features/books/types';
import { useFilterStore } from '../features/filters/filterStore';
import { useDebounce } from '../hooks/useDebounce';
export default function LibraryPage() {
  const { items, loans, status } = useAppSelector((s) => s.books);
  const dispatch = useAppDispatch();
  const keyword = useFilterStore((s) => s.keyword);
  const category = useFilterStore((s) => s.category);
  const setKeyword = useFilterStore((s) => s.setKeyword);
  const setCategory = useFilterStore((s) => s.setCategory);
  const reset = useFilterStore((s) => s.reset);
  const query = useDebounce(keyword, 300);
  const [onlyBorrowed, setOnlyBorrowed] = useState(false);
  const filtered = useMemo(() => {
    const searchText = query.trim().toLocaleLowerCase('vi');
    return items.filter((book) => {
      if (category !== 'Tất cả' && book.category !== category) return false;
      const text = `${book.title} ${book.author}`.toLocaleLowerCase('vi');
      if (!text.includes(searchText)) return false;
      if (onlyBorrowed && !loans.some((loan) => loan.id === book.id)) return false;
      return true;
    });
  }, [items, category, query, onlyBorrowed, loans]);
  const handleBorrow = useCallback(
    (id: string) => {
      dispatch(borrowBook(id));
    },
    [dispatch],
  );
  const handleReturn = useCallback(
    (id: string) => {
      dispatch(returnBook(id));
    },
    [dispatch],
  );
  return (
    <>
      <section className="hero">
        <div>
          <h1>Quản lý mượn trả sách</h1>
          <p>Tra cứu sách trong thư viện khoa và theo dõi sách đang mượn.</p>
        </div>
        <aside>
          <p>Sách đang mượn</p>
          <strong>
            {loans.length}
            <small> / 3 cuốn</small>
          </strong>
          <p>
            {loans.length === 0
              ? 'Bạn chưa mượn cuốn sách nào.'
              : `Bạn có thể mượn thêm ${3 - loans.length} cuốn.`}
          </p>
          <button onClick={() => setOnlyBorrowed((v) => !v)}>
            {onlyBorrowed ? 'Xem tất cả sách' : 'Xem sách đang mượn'}{' '}

          </button>
        </aside>
      </section>
      <section aria-label="Tra cứu sách">
        <div className="section-title">
          <div>
            <h2>{onlyBorrowed ? 'Sách đang mượn' : 'Danh sách sách'}</h2>
          </div>
          <span>{status === 'succeeded' ? `${items.length} đầu sách trong thư viện` : ''}</span>
        </div>
        <div className="filters">
          <label className="search">
            <input
              aria-label="Tìm sách theo tên hoặc tác giả"
              placeholder="Tìm tên sách hoặc tác giả…"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            {keyword && (
              <button aria-label="Xóa từ khóa" onClick={() => setKeyword('')}>
                ×
              </button>
            )}
          </label>
          <div className="category-tabs">
            {(['Tất cả', ...categories] as const).map((c) => (
              <button key={c} aria-pressed={category === c} onClick={() => setCategory(c)}>
                {c}
              </button>
            ))}
          </div>
        </div>
        <p className="result" aria-live="polite">
          {status === 'succeeded'
            ? `${filtered.length} kết quả${onlyBorrowed ? ' · Đang mượn' : ''}`
            : 'Danh mục sách chuyên ngành'}
        </p>
        <div className="book-grid">
          {filtered.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              borrowed={loans.some((l) => l.id === book.id)}
              onBorrow={handleBorrow}
              onReturn={handleReturn}
            />
          ))}
        </div>
        {status === 'succeeded' && filtered.length === 0 && (
          <div className="empty-state">
            <h3>
              {onlyBorrowed ? 'Chưa có sách phù hợp trong tủ sách' : 'Không tìm thấy sách phù hợp'}
            </h3>
            <p>Thử đổi từ khóa hoặc chọn thể loại khác.</p>
            <button
              onClick={() => {
                reset();
                setOnlyBorrowed(false);
              }}
            >
              Xem tất cả sách
            </button>
          </div>
        )}
      </section>
    </>
  );
}
