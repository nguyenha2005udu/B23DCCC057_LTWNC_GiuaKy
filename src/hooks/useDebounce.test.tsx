import { act, renderHook } from '@testing-library/react';
import { useDebounce } from './useDebounce';
afterEach(() => jest.useRealTimers());
test('chỉ cập nhật sau 300ms kể từ thay đổi cuối', () => {
  jest.useFakeTimers();
  const { result, rerender, unmount } = renderHook(({ value }) => useDebounce(value, 300), {
    initialProps: { value: 'a' },
  });
  rerender({ value: 'ab' });
  act(() => jest.advanceTimersByTime(200));
  rerender({ value: 'abc' });
  act(() => jest.advanceTimersByTime(299));
  expect(result.current).toBe('a');
  act(() => jest.advanceTimersByTime(1));
  expect(result.current).toBe('abc');
  rerender({ value: 'abcd' });
  unmount();
  expect(jest.getTimerCount()).toBe(0);
});
