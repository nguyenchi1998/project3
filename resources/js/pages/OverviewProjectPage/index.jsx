import Box from '@mui/material/Box';
import { Container, Grid } from '@mui/material';
import TrackerIssuesStatistic from './TrackerIssuesStatistic';
import PriorityIssueChart from './PriorityIssueChart';
import MembersStatistic from './MembersStatistic';
import Typography from '@mui/material/Typography';
import CustomerInfo from './CustomerInfo';

const OverviewProjectPage = () => {
  return (
    <Container maxWidth={false}>
      <Box py={2}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Box py={1}>
              <Typography variant="h5">Issue Tracking</Typography>
            </Box>
            <TrackerIssuesStatistic />
          </Grid>
          <Grid item xs={4}>
            <Box py={1}>
              <Typography variant="h5">Members</Typography>
            </Box>
            <MembersStatistic />
          </Grid>
          <Grid item xs={4}>
            <Box py={1}>
              <Typography variant="h5">Customer Info</Typography>
            </Box>
            <CustomerInfo />
          </Grid>
          <Grid item xs={6}>
            <PriorityIssueChart />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
export default OverviewProjectPage;
