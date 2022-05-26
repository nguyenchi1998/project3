import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useCallback, useState } from 'react';
import TrackerSelect from './TrackerSelect';
import PriorityChart from './PriorityChart';

const PriorityIssueChart = () => {
  const [trackerId, setTrackerId] = useState(2);
  const handleChangeTracker = useCallback(({ target: { value } }) => {
    setTrackerId(value);
  }, []);

  return (
    <Box>
      <Box py={1} display="flex" justifyContent={'space-between'}>
        <Typography component={Box} flexGrow={1} variant="h5">
          Issue Priority
        </Typography>
        <TrackerSelect
          trackerId={trackerId}
          handleChangeTracker={handleChangeTracker}
        />
      </Box>
      <Box
        py={2}
        sx={{
          height: 300,
          position: 'relative',
        }}
      >
        <PriorityChart trackerId={trackerId} />
      </Box>
    </Box>
  );
};

export default PriorityIssueChart;
