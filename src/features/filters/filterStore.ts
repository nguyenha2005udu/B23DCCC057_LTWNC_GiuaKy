import { create } from 'zustand';
import type { Category } from '../books/types';
interface FilterState {
  keyword: string;
  category: Category | 'Tất cả';
  setKeyword: (keyword: string) => void;
  setCategory: (category: Category | 'Tất cả') => void;
  reset: () => void;
}
export const useFilterStore = create<FilterState>((set) => ({
  keyword: '',
  category: 'Tất cả',
  setKeyword: (keyword) => set({ keyword }),
  setCategory: (category) => set({ category }),
  reset: () => set({ keyword: '', category: 'Tất cả' }),
}));
