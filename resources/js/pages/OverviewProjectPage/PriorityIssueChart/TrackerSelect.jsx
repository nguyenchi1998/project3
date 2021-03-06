import { MenuItem, Select } from '@mui/material';
import { useQuery } from 'react-query';
import { KEY_QUERIES } from '../../../config/keyQueries';
import trackerAPI from '../../../services/tracker';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';

const TrackerSelect = ({ trackerId, handleChangeTracker }) => {
  const { data, isLoading, isError, error } = useQuery(
    [KEY_QUERIES.FETCH_TRACKER],
    () => trackerAPI.all(),
  );
  if (isLoading) {
    return <Skeleton height="45px" width="80px" />;
  }
  if (isError) {
    return <Typography>{error.message}</Typography>;
  }
  return (
    <Select size="small" value={trackerId} onChange={handleChangeTracker}>
      {data.map((tracker) => (
        <MenuItem key={tracker.id} value={tracker.id}>
          {tracker.name}
        </MenuItem>
      ))}
    </Select>
  );
};

export default TrackerSelect;
