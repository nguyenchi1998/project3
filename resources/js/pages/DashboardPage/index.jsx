import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const DashboardPage = () => {
  let { state } = useLocation();
  useEffect(() => {
    if (state?.notAllowToast) {
      toast.error('Permission Deny');
    }
  }, []);
  return <Typography>Dashboard</Typography>;
};

export default DashboardPage;
