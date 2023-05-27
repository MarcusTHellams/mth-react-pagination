import { act, renderHook } from '@testing-library/react';

import { useMthPagination } from '../../lib/use-mth-pagination';

describe('useMthPagination suite', () => {
  test('should initialize with the correct values', () => {
    const params = {
      page: 1,
      total: 10,
      siblings: 1,
      boundaries: 1,
      onChange: vi.fn(),
    };

    const { result } = renderHook(() => useMthPagination(params));

    expect(result.current.activePage).toBe(1);
    expect(result.current.total).toBe(10);
    expect(result.current.range).toEqual([1, 2, 3, 4, 5, 'dots', 10]);
  });

  test('should update activePage and call onChange when setPage is called', () => {
    const params = {
      page: 1,
      total: 10,
      siblings: 1,
      boundaries: 1,
      onChange: vi.fn(),
    };

    const { result } = renderHook(() => useMthPagination(params));

    act(() => {
      result.current.setPage(3);
    });

    expect(result.current.activePage).toBe(3);
    expect(params.onChange).toHaveBeenCalledWith(3);
  });

  test('should set activePage to 1 and call onChange when setPage is called with a value less than 1', () => {
    const params = {
      page: 5,
      total: 10,
      siblings: 1,
      boundaries: 1,
      onChange: vi.fn(),
    };

    const { result } = renderHook(() => useMthPagination(params));

    act(() => {
      result.current.setPage(-1);
    });

    expect(result.current.activePage).toBe(1);
    expect(params.onChange).toHaveBeenCalledWith(1);
  });

  test('should set activePage to total and call onChange when setPage is called with a value greater than total', () => {
    const params = {
      page: 5,
      total: 10,
      siblings: 1,
      boundaries: 1,
      onChange: vi.fn(),
    };

    const { result } = renderHook(() => useMthPagination(params));

    act(() => {
      result.current.setPage(15);
    });

    expect(result.current.activePage).toBe(10);
    expect(params.onChange).toHaveBeenCalledWith(10);
  });

  test('should increase activePage by 1 and call setPage when next is called', () => {
    const params = {
      page: 2,
      total: 10,
      siblings: 1,
      boundaries: 1,
      onChange: vi.fn(),
    };

    const { result } = renderHook(() => useMthPagination(params));

    act(() => {
      result.current.next();
    });

    expect(result.current.activePage).toBe(3);
    expect(params.onChange).toHaveBeenCalledWith(3);
  });

  test('should decrease activePage by 1 and call setPage when prev is called', () => {
    const params = {
      page: 3,
      total: 10,
      siblings: 1,
      boundaries: 1,
      onChange: vi.fn(),
    };

    const { result } = renderHook(() => useMthPagination(params));

    act(() => {
      result.current.prev();
    });
    expect(result.current.activePage).toBe(2);
    expect(params.onChange).toHaveBeenCalledWith(2);
  });

  test('should set activePage to 1 and call setPage when first is called', () => {
    const params = {
      page: 5,
      total: 10,
      siblings: 1,
      boundaries: 1,
      onChange: vi.fn(),
    };
    const { result } = renderHook(() => useMthPagination(params));

    act(() => {
      result.current.first();
    });

    expect(result.current.activePage).toBe(1);
    expect(params.onChange).toHaveBeenCalledWith(1);
  });

  test('should set activePage to total and call setPage when last is called', () => {
    const params = {
      page: 5,
      total: 10,
      siblings: 1,
      boundaries: 1,
      onChange: vi.fn(),
    };

    const { result } = renderHook(() => useMthPagination(params));

    act(() => {
      result.current.last();
    });

    expect(result.current.activePage).toBe(10);
    expect(params.onChange).toHaveBeenCalledWith(10);
  });
});
