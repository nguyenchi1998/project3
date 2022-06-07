import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

export default function useQueryParam() {
  const { search } = useLocation();

  return useMemo(
    () =>
      queryString.parse(search, { parseNumbers: true, arrayFormat: 'index' }),
    [search],
  );
}
