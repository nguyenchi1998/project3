import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';

export default function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
      let params = {};
      for (const v in value) {
        if (value[v]) {
          params = {
            ...params,
            [v]: value[v],
          };
        }
      }
      history.replace({
        pathname: location.pathname,
        search: queryString.stringify(params, { arrayFormat: 'index' }),
      });
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
