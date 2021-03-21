import React from 'react';
import { makeStyles, Tooltip } from '@material-ui/core';
import theme from './config-ui/theme';

const useStylesBootstrap = makeStyles(() => ({
  arrow: {
    color: theme.colors.black,
  },
  tooltip: {
    backgroundColor: theme.colors.black,
  },
}));

export const SyTooltip = (props: any) => {
  const classes = useStylesBootstrap();
  return <Tooltip arrow classes={classes} {...props} />;
};
