import {
  Box,
  Card,
  CardContent,
  colors,
  Grid,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
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
            height={'100%'}
            px={2}
            display={'flex'}
            justifyContent="flex-start"
            alignItems={'center'}
          >
            <Box
              mr={2}
              sx={{ backgroundColor: colors.yellow[300] }}
              display="flex"
              justifyContent={'center'}
              alignItems="center"
              p={1}
            >
              <AssignmentLateIcon fontSize="medium" />
            </Box>
            <Box>
              <Typography>Status</Typography>
              <Typography>{ISSUE_STATUS[issue.status]}</Typography>
            </Box>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={6} sm={6} md={3}>
        <Paper variant="outlined" sx={{ height: '100%' }}>
          <Box
            height={'100%'}
            p={1}
            px={2}
            display={'flex'}
            justifyContent="flex-start"
            alignItems={'center'}
          >
            <Box
              mr={2}
              sx={{ backgroundColor: colors.blue[300] }}
              display="flex"
              justifyContent={'center'}
              alignItems="center"
              p={1}
            >
              <PersonIcon fontSize="medium" />
            </Box>
            <Box>
              <Typography>Author</Typography>
              <Typography>{issue?.author?.name}</Typography>
            </Box>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={6} sm={6} md={3}>
        <Paper variant="outlined" sx={{ height: '100%' }}>
          <Box
            height={'100%'}
            p={1}
            px={2}
            display={'flex'}
            justifyContent="flex-start"
            alignItems={'center'}
          >
            <Box
              mr={2}
              sx={{ backgroundColor: colors.blue[300] }}
              display="flex"
              justifyContent={'center'}
              alignItems="center"
              p={1}
            >
              <PersonIcon fontSize="medium" />
            </Box>
            <Box>
              <Typography>Assignee</Typography>
              <Typography>{issue?.assignee?.name}</Typography>
            </Box>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={6} sm={6} md={3}>
        <Paper variant="outlined" sx={{ height: '100%' }}>
          <Box
            height={'100%'}
            p={1}
            px={2}
            display={'flex'}
            justifyContent="flex-start"
            alignItems={'center'}
          >
            <Box
              mr={2}
              sx={{ backgroundColor: colors.lightGreen[300] }}
              display="flex"
              justifyContent={'center'}
              alignItems="center"
              p={1}
            >
              <AssignmentLateIcon fontSize="medium" />
            </Box>
            <Box>
              <Typography>Priority</Typography>
              <Box
                px={1}
                borderRadius={1}
                sx={{ backgroundColor: ISSUE_PRIORITY_COLORS[issue.priority] }}
              >
                <Typography>{ISSUE_PRIORITIES[issue.priority]}</Typography>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default HeaderDetailIssuePage;
