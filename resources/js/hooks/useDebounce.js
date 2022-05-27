import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';

export default function useDebounce(value, delay, pushUrl = false) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
      if (pushUrl) {
        let params = {};
        for (const v in value) {
          if (value[v] || (value[v] && value[v] === 0)) {
            params = {
              ...params,
              [v]: value[v],
            };
          }
        }
        history.replace({
          pathname: location.pathname,
          search: queryString.stringify(params),
        });
      }
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
