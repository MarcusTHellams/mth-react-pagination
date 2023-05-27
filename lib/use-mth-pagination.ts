import { useCallback, useMemo, useRef, useState } from 'react';

export const DOTS = 'dots';

function range(start: number, end: number) {
  const length = end - start + 1;
  return Array.from({ length }, (_, index) => index + start);
}

const getRange = (
  siblings: number,
  boundaries: number,
  total: number,
  activePage: number
) => {
  const totalPageNumbers = siblings * 2 + 3 + boundaries * 2;
  if (totalPageNumbers >= total) {
    return range(1, total);
  }
  const leftSiblingIndex = Math.max(activePage - siblings, boundaries);

  const rightSiblingIndex = Math.min(activePage + siblings, total - boundaries);

  const shouldShowLeftDots = leftSiblingIndex > boundaries + 2;
  const shouldShowRightDots = rightSiblingIndex < total - (boundaries + 1);

  if (!shouldShowLeftDots && shouldShowRightDots) {
    const leftItemCount = siblings * 2 + boundaries + 2;
    return [
      ...range(1, leftItemCount),
      DOTS,
      ...range(total - (boundaries - 1), total),
    ];
  }

  if (shouldShowLeftDots && !shouldShowRightDots) {
    const rightItemCount = boundaries + 1 + 2 * siblings;
    return [
      ...range(1, boundaries),
      DOTS,
      ...range(total - rightItemCount, total),
    ];
  }

  return [
    ...range(1, boundaries),
    DOTS,
    ...range(leftSiblingIndex, rightSiblingIndex),
    DOTS,
    ...range(total - boundaries + 1, total),
  ];
};

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
  const { page, total, siblings = 1, boundaries = 1, onChange } = params;

  const [activePage, setActivePage] = useState(page);

  const range = useMemo(() => {
    return getRange(siblings, boundaries, total, activePage);
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
    range,
    setPage,
    total,
  };
};
