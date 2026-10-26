import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { categories, type CategoryCounts } from '../features/books/types';
export default function StatsPage() {
  const { items, loans, status } = useAppSelector((s) => s.books);
  const counts = useMemo(
    () =>
      items.reduce<CategoryCounts>(
        (acc, b) => {
          acc[b.category]++;
          return acc;
        },
        { CNTT: 0, 'Kinh tế': 0, 'Ngoại ngữ': 0 },
      ),
    [items],
  );
  return (
    <section className="stats-page">
      <h1>Thống kê thư viện</h1>
      <p>Tổng quan đầu sách và hoạt động mượn sách của bạn.</p>
      {status === 'succeeded' && (
        <>
          <div className="stat-summary">
            <div>
              <strong>{items.length}</strong>
              <span>Tổng số đầu sách</span>
            </div>
            <div>
              <strong>
                {loans.length}
                <small> / 3</small>
              </strong>
              <span>Số sách bạn đang mượn</span>
            </div>
            <div>
              <strong>{items.reduce((s, b) => s + b.available, 0)}</strong>
              <span>Số bản còn trong thư viện</span>
            </div>
          </div>
          <div className="stat-chart">
            <h2>Đầu sách theo thể loại</h2>
            {categories.map((c) => (
              <div className="chart-row" key={c}>
                <span>{c}</span>
                <div className="track">
                  <div
                    style={{ width: `${items.length ? (counts[c] / items.length) * 100 : 0}%` }}
                  />
                </div>
                <strong>{counts[c]}</strong>
              </div>
            ))}
          </div>
        </>
      )}
      <Link to="/">← Trở về thư viện</Link>
    </section>
  );
}
