import React from 'react';
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { KEY_QUERIES } from '../../config/keyQueries';
import projectAPI from '../../services/project';
import ListSkeleton from '../ProjectPage/ListSkeleton';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';

const DetailProjectPage = () => {
  const { projectId } = useParams();
  const { data, isLoading, isError, error } = useQuery(
    [KEY_QUERIES.FETCH_PROJECT, projectId],
    () => projectAPI.find(projectId),
  );
  if (isError) {
    return <>{error.message}</>;
  }
  if (isLoading) {
    return <Typography>Loading</Typography>;
  }
  return (
    <Box p={2}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography color="text.primary" variant="h5" gutterBottom>
                Project
              </Typography>
              <Typography variant="h4" component="div">
                {data.name}
              </Typography>
              <Typography color="text.primary" variant="h5" gutterBottom>
                Time
              </Typography>
              <Typography variant="h4" component="div">
                {`${data.start_date ?? '___/__/__'} -> ${
                  data.end_date ?? '___/__/__'
                }`}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
export default DetailProjectPage;
