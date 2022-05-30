import { colors, useTheme } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import { useQuery } from 'react-query';
import { KEY_QUERIES } from '../../../config/keyQueries';
import projectAPI from '../../../services/project';
import {
  CHART_ISSUE_PRIORITY_COLORS,
  ISSUE_PRIORITIES,
} from '../../../config/constants';
import { Pie } from 'react-chartjs-2';
import useParamInt from '../../../hooks/useParamInt';

const PriorityChart = ({ trackerId, projectId }) => {
  const theme = useTheme();
  const doughnutOption = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false,
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary,
    },
  };
  const { data, isLoading, isError, error } = useQuery(
    [KEY_QUERIES.FETCH_PRIORITY_ISSUE_STATISTIC, projectId, trackerId],
    () => projectAPI.priorityIssuesStatistic({ projectId, trackerId }),
  );
  if (isLoading) {
    return <Skeleton variant="rectangular" height={300} />;
  }
  if (isError) {
    return <Typography>{error.message}</Typography>;
  }
  const dataValues = Object.entries(data).map((priority) => priority[1].length);
  const dataKeys = Object.entries(data).map((priority) =>
    parseInt(priority[0], 10),
  );

  return Object.entries(data).length ? (
    <Pie
      data={{
        datasets: [
          {
            data: dataValues,
            backgroundColor: CHART_ISSUE_PRIORITY_COLORS.filter((_, key) =>
              dataKeys.includes(key),
            ),
            borderWidth: 8,
            borderColor: colors.common.white,
            hoverBorderColor: colors.common.white,
          },
        ],
        labels: ISSUE_PRIORITIES.filter((_, key) => dataKeys.includes(key)),
      }}
      options={doughnutOption}
    />
  ) : (
    <Typography>No data to display</Typography>
  );
};

export default PriorityChart;
