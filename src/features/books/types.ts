export const categories = ['CNTT', 'Kinh tế', 'Ngoại ngữ'] as const;
export type Category = (typeof categories)[number];
export interface Book {
  id: string;
  title: string;
  author: string;
  category: Category;
  year: number;
  available: number;
}
export type Loan = Readonly<Pick<Book, 'id'>>;
export type CategoryCounts = Record<Category, number>;
export type ApiResponse<T> =
  | {
      ok: true;
      data: T;
    }
  | {
      ok: false;
      error: string;
    };
export function isSuccess<T>(response: ApiResponse<T>): response is {
  ok: true;
  data: T;
} {
  return response.ok;
}
