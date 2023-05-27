import mthPagination from 'mth-pagination';
import { useCallback, useMemo, useRef, useState } from 'react';

export interface UseMthPaginationParams {
  /** Active page number */
  page: number;
  /** Total amount of pages */
  total: number;
  /** Siblings amount on left/right side of selected page, defaults to 1 */
  siblings?: number;
  /** Amount of elements visible on left/right edges, defaults to 1  */
  boundaries?: number;
  /** Callback fired after change of each page */
  onChange?: (page: number) => void;
}

export const useMthPagination = (params: UseMthPaginationParams) => {
  const { page, total, siblings, boundaries, onChange } = params;

  const [activePage, setActivePage] = useState(page);

  const pagination = useMemo(() => {
    // stupid work around for testing
    // @ts-ignore
    if (mthPagination.default) {
      // @ts-ignore
      return new mthPagination.default({
        total,
        page: activePage,
        siblings,
        boundaries,
      });
    }
    /* c8 ignore next 6 */
    return new mthPagination({
      total,
      page: activePage,
      siblings,
      boundaries,
    });
  }, [total, activePage, siblings, boundaries]);

  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const setPage = useCallback(
    (page: number) => {
      if (page < 1) {
        setActivePage(1);
        if (onChangeRef.current) {
          onChangeRef.current(1);
        }
        return;
      }
      if (page > total) {
        setActivePage(total);
        if (onChangeRef.current) {
          onChangeRef.current(total);
        }
        return;
      }
      setActivePage(page);
      if (onChangeRef.current) {
        onChangeRef.current(page);
      }
    },
    [total]
  );

  const next = useCallback(() => {
    setPage(activePage + 1);
  }, [setPage, activePage]);

  const prev = useCallback(() => {
    setPage(activePage - 1);
  }, [setPage, activePage]);

  const first = useCallback(() => {
    setPage(1);
  }, [setPage]);

  const last = useCallback(() => {
    setPage(total);
  }, [setPage, total]);

  return {
    activePage,
    first,
    last,
    next,
    prev,
    range: pagination.range as (number | 'dots')[],
    setPage,
    total,
  };
};
