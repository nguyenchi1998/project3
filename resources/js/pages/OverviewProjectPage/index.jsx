import Box from '@mui/material/Box';
import { Container, Grid } from '@mui/material';
import TrackerIssuesStatistic from './TrackerIssuesStatistic';
import PriorityIssueChart from './PriorityIssueChart';
import MembersStatistic from './MembersStatistic';
import CustomerInfo from './CustomerInfo';

const OverviewProjectPage = () => {
  return (
    <Container maxWidth={false}>
      <Box py={2}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TrackerIssuesStatistic />
          </Grid>
          <Grid item xs={4}></Grid>
          <Grid item xs={4}>
            <MembersStatistic />
            <CustomerInfo />
          </Grid>
          <Grid item xs={3}>
            <PriorityIssueChart />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
export default OverviewProjectPage;
