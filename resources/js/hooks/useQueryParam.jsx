import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

const useQueryParam = () => {
  const { search } = useLocation();

  return useMemo(() => queryString.parse(search), [search]);
};

export default useQueryParam;
