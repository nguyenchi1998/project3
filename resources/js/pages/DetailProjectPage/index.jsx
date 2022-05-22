import React from 'react';
import Box from '@mui/material/Box';
import { Doughnut } from 'react-chartjs-2';
import {
  Button,
  colors,
  Container,
  Grid,
  Typography,
  useTheme,
} from '@mui/material';
import TypeIssuesStatistic from './TypeIssuesStatistic';
import MemberList from './MemberList';

const DetailProjectPage = () => {
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
  return (
    <Container maxWidth={false}>
      <Box py={2}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Box
                  py={1}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box flexGrow={1}>
                    <Typography variant="h6">Project Members</Typography>
                  </Box>
                  <Button variant="outlined">Add Member</Button>
                </Box>
                <MemberList />
              </Grid>
              <Grid item xs={12}>
                <Box py={1}>
                  <Typography variant="h6">Issue Tracking</Typography>
                </Box>
                <TypeIssuesStatistic />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box py={1}>
                  <Typography variant="h6">Bug Rate</Typography>
                </Box>
                <Box
                  py={2}
                  sx={{
                    height: 300,
                    position: 'relative',
                  }}
                >
                  <Doughnut
                    data={{
                      datasets: [
                        {
                          data: [63, 15, 12, 10],
                          backgroundColor: [
                            colors.red[600],
                            colors.orange[600],
                            colors.indigo[500],
                            colors.grey[500],
                          ],
                          borderWidth: 8,
                          borderColor: colors.common.white,
                          hoverBorderColor: colors.common.white,
                        },
                      ],
                      labels: ['Bug', 'Task', 'Backlog', 'Cancel'],
                    }}
                    options={doughnutOption}
                  />
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
export default DetailProjectPage;
