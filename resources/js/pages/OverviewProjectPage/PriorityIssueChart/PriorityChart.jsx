import { useQuery } from 'react-query';
import { KEY_QUERIES } from '../../../config/keyQueries';
import projectAPI from '../../../services/project';
import { useContext } from 'react';
import { ProjectContext } from '../../../layouts/project';
import { VictoryPie, VictoryTheme } from 'victory';
import {
  CHART_ISSUE_PRIORITY_COLORS,
  ISSUE_PRIORITIES,
} from '../../../config/constants';
import { Box, Skeleton, Typography } from '@mui/material';

const PriorityChart = ({ trackerId }) => {
  const projectId = useContext(ProjectContext);

  const { data, isLoading, isError, error } = useQuery(
    [KEY_QUERIES.FETCH_PRIORITY_ISSUE_STATISTIC, projectId, { trackerId }],
    () => projectAPI.priorityIssuesStatistic({ projectId, trackerId }),
  );
  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Skeleton variant="circular" height={300} width={300} />
      </Box>
    );
  }
  if (isError) {
    return <Typography>{error.message}</Typography>;
  }

  return (
    <VictoryPie
      colorScale={CHART_ISSUE_PRIORITY_COLORS}
      data={ISSUE_PRIORITIES.map((priority, index) => ({
        x: data[index].length,
        y: data[index].length,
        label: `${priority}: ${data[index].length}`,
      }))}
      labelPosition={() => 'centroid'}
      height={300}
      style={{
        labels: {
          fontWeight: 400,
        },
      }}
      theme={VictoryTheme.material}
    />
  );
};

export default PriorityChart;
