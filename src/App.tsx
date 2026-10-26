import { lazy, Suspense, useEffect } from 'react';
import { NavLink, Route, Routes, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { fetchBooks, setWarning } from './features/books/booksSlice';
import { useTheme } from './theme/ThemeContext';
import LibraryPage from './pages/LibraryPage';
const StatsPage = lazy(() => import('./pages/StatsPage'));
export default function App() {
  const dispatch = useAppDispatch();
  const { status, error, warning, loans } = useAppSelector((s) => s.books);
  const { theme, toggleTheme } = useTheme();
  useEffect(() => {
    const shouldFail = new URLSearchParams(window.location.search).get('apiError') === '1';
    void dispatch(fetchBooks(shouldFail));
  }, [dispatch]);
  return (
    <>
      <header>
        <div className="header-inner">
          <Link className="brand" to="/">
            Mini Library
          </Link>
          <nav aria-label="Điều hướng chính">
            <NavLink to="/" end>
              Thư viện
            </NavLink>
            <NavLink to="/stats">Thống kê</NavLink>
          </nav>
          <div className="header-actions">
            <button
              className="theme-toggle"
              aria-label={
                theme === 'light' ? 'Chuyển sang giao diện tối' : 'Chuyển sang giao diện sáng'
              }
              onClick={toggleTheme}
            >
              {theme === 'light' ? 'Chế độ tối' : 'Chế độ sáng'}
            </button>
            <span className="student">
              Sinh viên<small>Đang mượn {loans.length}/3</small>
            </span>
          </div>
        </div>
      </header>
      <main>
        {warning && (
          <div className="alert" role="alert">
            <span>{warning}</span>
            <button aria-label="Đóng cảnh báo" onClick={() => dispatch(setWarning(null))}>
              ×
            </button>
          </div>
        )}
        {(status === 'idle' || status === 'loading') && (
          <p className="loading" role="status">
            Đang tải...
          </p>
        )}
        {status === 'failed' && (
          <div className="alert" role="alert">
            <span>{error}</span>
            <button onClick={() => void dispatch(fetchBooks(false))}>Thử lại</button>
          </div>
        )}
        <Suspense fallback={<p role="status">Đang tải trang thống kê...</p>}>
          <Routes>
            <Route path="/" element={<LibraryPage />} />
            <Route path="/stats" element={<StatsPage />} />
            <Route
              path="*"
              element={
                <div className="empty-state">
                  <h1>Không tìm thấy trang</h1>
                  <Link to="/">Về thư viện</Link>
                </div>
              }
            />
          </Routes>
        </Suspense>
      </main>
      <footer>
        <span>
          Mini Library · Quản lý mượn trả sách
        </span>
        <span>Lập trình web nâng cao</span>
      </footer>
    </>
  );
}
