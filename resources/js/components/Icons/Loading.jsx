import React from 'react';
import {makeStyles} from '@mui/styles';
import CircularProgress from '@mui/material/CircularProgress';

const useStylesFacebook = makeStyles((theme) => ({
  root: {
    position: 'relative',
  },
  bottom: {
    color: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 700],
  },
  top: {
    color: theme.palette.info.dark,
    animationDuration: '550ms',
    position: 'absolute',
    left: 0,
  },
  circle: {
    strokeLinecap: 'round',
  },
}));

// Inspired by the former Facebook spinners.
const FacebookCircularProgress = (props) => {
  const classes = useStylesFacebook();

  return (
    <div className={classes.root}>
      <CircularProgress
        variant="determinate"
        className={classes.bottom}
        size={30}
        thickness={3}
        {...props}
        value={100}
      />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        className={classes.top}
        classes={{
          circle: classes.circle,
        }}
        size={30}
        thickness={3}
        {...props}
      />
    </div>
  );
};

export default FacebookCircularProgress;
