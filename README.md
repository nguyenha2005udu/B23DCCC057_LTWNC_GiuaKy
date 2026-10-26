# Mini Library

Ứng dụng bài tập React + TypeScript quản lý tra cứu, mượn và trả sách

## Thử chức năng

- Trang `/`: chờ API 500ms, tìm tên/tác giả (không phân biệt hoa thường, debounce 300ms), chọn thể loại.
- Mượn ba đầu sách khác nhau rồi thử mượn cuốn thứ tư: middleware chặn action và hiển thị cảnh báo. Trả một cuốn để mượn tiếp. Mỗi đầu sách chỉ được mượn một bản cùng lúc.
- Cambridge IELTS 18 hết bản ban đầu để kiểm tra nút bị khóa.
- Chọn “Xem sách đang mượn” để xem và trả những cuốn đang mượn, hoặc trả trực tiếp trên danh mục.
- Nút mặt trăng/mặt trời chuyển theme.
- `/stats`: thống kê số đầu sách theo thể loại, tổng số đầu sách, số bản còn và số sách sinh viên hiện tại đang mượn. Trang được tách chunk bằng React.lazy.
- Mở `/?apiError=1` để giả lập lỗi. Nhấn “Thử lại” để gọi API thành công. Có thể mở trực tiếp `/stats?apiError=1` để thử lỗi tại trang thống kê.

## Cấu trúc và đối chiếu yêu cầu

| Nội dung | Nơi triển khai |
| --- | --- |
| Generic ApiResponse, type guard isSuccess, Utility Types Readonly/Pick/Record | `src/features/books/types.ts` |
| API Promise, setTimeout 500ms, tham số shouldFail | `src/api/booksApi.ts` |
| Slice, thunk, pending/fulfilled/rejected | `src/features/books/booksSlice.ts` |
| Store, typed hooks | `src/app/` |
| Middleware giới hạn 3 cuốn | `src/features/books/borrowLimitMiddleware.ts` |
| Zustand từ khóa và thể loại | `src/features/filters/filterStore.ts` |
| Context, useMemo value, useTheme | `src/theme/ThemeContext.tsx` |
| Generic useDebounce, cleanup timer | `src/hooks/useDebounce.ts` |
| Lọc với useMemo, callback ổn định, key id | `src/pages/LibraryPage.tsx` |
| React.memo, nút mượn/trả | `src/features/books/BookCard.tsx` |
| Lazy route và Suspense | `src/App.tsx`, `src/pages/StatsPage.tsx` |
| Jest, RTL, userEvent, fake timers | Các file `*.test.ts` và `*.test.tsx` trong `src/` |
