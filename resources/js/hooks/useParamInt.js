import { useParams } from 'react-router-dom';

export default function useParamInt(key) {
  const params = useParams();
  if (params[key]) {
    return parseInt(params[key], 10);
  }
  return null;
}
