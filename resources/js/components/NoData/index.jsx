import Typography from '@mui/material/Typography';

const NoData = ({ message = 'No Data' }) => {
  return (
    <Typography textAlign="center" variant="h5">
      {message}
    </Typography>
  );
};

export default NoData;
