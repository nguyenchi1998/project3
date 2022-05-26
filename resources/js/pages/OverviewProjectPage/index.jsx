import Box from '@mui/material/Box';
import { Container, Grid } from '@mui/material';
import TrackerIssuesStatistic from './TrackerIssuesStatistic';
import PriorityIssueChart from './PriorityIssueChart';
import Typography from '@mui/material/Typography';

const OverviewProjectPage = () => {
  return (
    <Container maxWidth={false}>
      <Box py={2}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Box py={1}>
                  <Typography variant="h5">Issue Tracking</Typography>
                </Box>
                <TrackerIssuesStatistic />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <PriorityIssueChart />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
export default OverviewProjectPage;
