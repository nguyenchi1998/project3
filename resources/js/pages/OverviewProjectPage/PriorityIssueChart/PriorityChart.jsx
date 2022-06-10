import { useQuery } from 'react-query';
import { KEY_QUERIES } from '../../../config/keyQueries';
import projectAPI from '../../../services/project';
import { useContext, useEffect } from 'react';
import { ProjectContext } from '../../../layouts/project';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import {
  CHART_ISSUE_PRIORITY_COLORS,
  ISSUE_PRIORITIES,
} from '../../../config/constants';
import { Box, Skeleton, Typography } from '@mui/material';
import NoData from '../../../container/NoData';

const PriorityChart = ({ trackerId }) => {
  useEffect(() => ChartJS.register(ArcElement, Tooltip, Legend), []);

  const projectId = useContext(ProjectContext);

  const { data, isLoading, isError, error } = useQuery(
    [KEY_QUERIES.FETCH_PRIORITY_ISSUE_STATISTIC, projectId, { trackerId }],
    () => projectAPI.priorityIssuesStatistic({ projectId, trackerId }),
  );
  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Skeleton variant="circular" height={200} width={200} />
      </Box>
    );
  }
  if (isError) {
    return <Typography>{error.message}</Typography>;
  }
  if (!data.length) {
    return <NoData />;
  }

  return (
    <Doughnut
      height={200}
      width={200}
      data={{
        labels: ISSUE_PRIORITIES.map(({ label }) => label),
        datasets: [
          {
            backgroundColor: CHART_ISSUE_PRIORITY_COLORS,
            data: data.map((issues) => issues.length),
          },
        ],
      }}
    />
  );
};

export default PriorityChart;
