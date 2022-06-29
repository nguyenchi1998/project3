import { Box, colors, Grid, Paper, Typography } from '@mui/material';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import {
  ISSUE_PRIORITIES,
  ISSUE_PRIORITY_COLORS,
  ISSUE_STATUS,
} from '../../config/constants';
import PersonIcon from '@mui/icons-material/Person';

const HeaderDetailIssuePage = ({ issue }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6} sm={6} md={3}>
        <Paper variant="outlined" sx={{ height: '100%' }}>
          <Box
            p={1}
            height="100%"
            px={2}
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
          >
            <Box
              mr={2}
              sx={{ backgroundColor: colors.yellow[300] }}
              display="flex"
              justifyContent="center"
              alignItems="center"
              p={1}
            >
              <AssignmentLateIcon fontSize="medium" />
            </Box>
            <Box>
              <Typography>Status</Typography>
              <Typography sx={{ textTransform: 'capitalize' }}>
                {ISSUE_STATUS.find(({ value }) => value === issue.status).label}
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={6} sm={6} md={3}>
        <Paper variant="outlined" sx={{ height: '100%' }}>
          <Box
            height="100%"
            p={1}
            px={2}
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
          >
            <Box
              mr={2}
              sx={{ backgroundColor: colors.blue[300] }}
              display="flex"
              justifyContent="center"
              alignItems="center"
              p={1}
            >
              <PersonIcon fontSize="medium" />
            </Box>
            <Box>
              <Typography variant="subtitle1">Author</Typography>
              <Typography variant="subtitle2">
                {issue?.author?.name ?? ''}
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={6} sm={6} md={3}>
        <Paper variant="outlined" sx={{ height: '100%' }}>
          <Box
            height="100%"
            p={1}
            px={2}
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
          >
            <Box
              mr={2}
              sx={{ backgroundColor: colors.blue[300] }}
              display="flex"
              justifyContent="center"
              alignItems="center"
              p={1}
            >
              <PersonIcon fontSize="medium" />
            </Box>
            <Box>
              <Typography variant="subtitle1">Assignee</Typography>
              <Typography variant="subtitle2">
                {issue?.assignee?.name ?? ''}
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={6} sm={6} md={3}>
        <Paper variant="outlined" sx={{ height: '100%' }}>
          <Box
            height="100%"
            p={1}
            px={2}
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
          >
            <Box
              mr={2}
              sx={{ backgroundColor: colors.lightGreen[300] }}
              display="flex"
              justifyContent="center"
              alignItems="center"
              p={1}
            >
              <AssignmentLateIcon fontSize="medium" />
            </Box>
            <Box>
              <Typography variant="subtitle1">Priority</Typography>
              <Box
                px={1}
                borderRadius={1}
                sx={{ backgroundColor: ISSUE_PRIORITY_COLORS[issue.priority] }}
              >
                <Typography>
                  {
                    ISSUE_PRIORITIES.find(
                      ({ value }) => value === issue.priority,
                    ).label
                  }
                </Typography>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default HeaderDetailIssuePage;
