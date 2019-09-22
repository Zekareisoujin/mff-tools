import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { WeaponBoostControlPanel } from '../component';

const useStyles = makeStyles(theme => ({
  panel: {
    paddingTop: theme.spacing(3)
  }
}));

const WeaponCalculator = props => {
  const classes = useStyles();
  return (
    <div className={classes.panel}>
      <Typography>WeaponCalc</Typography>
      <WeaponBoostControlPanel />
    </div>
  );
};

export default WeaponCalculator;
