import type { ApiResponse, Book } from '../features/books/types';
export const seedBooks: Book[] = [
  {
    id: 'ts',
    title: 'TypeScript chuyên sâu',
    author: 'Boris Cherny',
    category: 'CNTT',
    year: 2019,
    available: 4,
  },
  {
    id: 'clean',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    category: 'CNTT',
    year: 2008,
    available: 3,
  },
  {
    id: 'react',
    title: 'Học React hiện đại',
    author: 'Alex Banks & Eve Porcello',
    category: 'CNTT',
    year: 2020,
    available: 2,
  },
  {
    id: 'econ',
    title: 'Kinh tế học căn bản',
    author: 'N. Gregory Mankiw',
    category: 'Kinh tế',
    year: 2021,
    available: 5,
  },
  {
    id: 'ielts',
    title: 'Cambridge IELTS 18',
    author: 'Cambridge University Press',
    category: 'Ngoại ngữ',
    year: 2023,
    available: 0,
  },
  {
    id: 'design',
    title: 'Design Patterns',
    author: 'Erich Gamma và cộng sự',
    category: 'CNTT',
    year: 1994,
    available: 2,
  },
  {
    id: 'business',
    title: 'Khởi nghiệp tinh gọn',
    author: 'Eric Ries',
    category: 'Kinh tế',
    year: 2011,
    available: 3,
  },
  {
    id: 'english',
    title: 'English Grammar in Use',
    author: 'Raymond Murphy',
    category: 'Ngoại ngữ',
    year: 2019,
    available: 6,
  },
  {
    id: 'money',
    title: 'Tâm lý học về tiền',
    author: 'Morgan Housel',
    category: 'Kinh tế',
    year: 2020,
    available: 2,
  },
];
export function getBooks(shouldFail = false): Promise<ApiResponse<Book[]>> {
  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve(
          shouldFail
            ? { ok: false, error: 'Không thể tải danh sách sách. Vui lòng thử lại.' }
            : { ok: true, data: seedBooks.map((book) => ({ ...book })) },
        ),
      500,
    ),
  );
}
