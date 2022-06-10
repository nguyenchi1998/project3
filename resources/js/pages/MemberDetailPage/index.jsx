import { Avatar, Box, Container, Paper, Tab, Typography } from '@mui/material';
import { useCallback, useContext, useState } from 'react';
import { ProjectContext } from '../../layouts/project';
import TabPanel from '@mui/lab/TabPanel';
import { TabContext, TabList } from '@mui/lab';
import ActivityTab from './ActivityTab';
import ProjectTab from './ProjectTab';
import useParamInt from '../../hooks/useParamInt';
import { KEY_QUERIES } from '../../config/keyQueries';
import { useQuery } from 'react-query';
import projectAPI from './../../services/project';
import { POSITIONS } from '../../config/constants';

const MemberDetailPage = () => {
  const memberId = useParamInt('memberId');
  const projectId = useContext(ProjectContext);
  const [value, setValue] = useState('one');
  const handleChange = useCallback((_, newValue) => {
    setValue(newValue);
  }, []);
  const { data, isLoading, isError, error } = useQuery(
    [KEY_QUERIES.FETCH_PROJECT_MEMBER, projectId, memberId],
    () => projectAPI.findMember({ projectId, memberId }),
  );

  if (isLoading) {
    return 'loading';
  }
  if (isError) {
    return error.message;
  }
  return (
    <Container maxWidth={false}>
      <Box py={2}>
        <Paper variant="outlined">
          <Box p={2}>
            <Box display="flex" justifyContent="flex-start" alignItems="center">
              <Avatar />
              <Box ml={1}>
                <Typography variant="h6">{data?.name}</Typography>
                <Typography variant="subtitle1">
                  {
                    POSITIONS.find(({ value }) => value === data?.position)
                      .label
                  }
                </Typography>
              </Box>
            </Box>
          </Box>
        </Paper>
        <Box>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Activity" value={'one'} />
                <Tab label="Projects" value={'two'} />
              </TabList>
            </Box>
            <TabPanel value={'one'}>
              <ActivityTab memberId={memberId} />
            </TabPanel>
            <TabPanel value={'two'}>
              <ProjectTab memberId={memberId} />
            </TabPanel>
          </TabContext>
        </Box>
      </Box>
    </Container>
  );
};

export default MemberDetailPage;
