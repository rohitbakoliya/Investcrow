import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Toaster, ToastOptions, ToastPosition } from 'react-hot-toast';
import { DefaultToastOptions } from 'react-hot-toast/dist/core/types';
import theme from './config-ui/theme';

interface Props {
  icon?: IconProp;
  position?: ToastPosition;
  reverseOrder?: boolean;
  styles?: any;
}

export const Toast: React.FC<Props> = ({ icon, styles, position, reverseOrder }) => {
  const stylesDefault = {
    // add default styles
    color: theme.colors.black,
    backgroundColor: theme.colors.white,
    fontSize: '14px',
    borderRadius: '10px',
    ...styles,
  };
  const toastOptionsDefault: DefaultToastOptions = {
    success: {
      style: {
        ...stylesDefault,
        backgroundColor: theme.colors.greenlight,
        color: theme.colors.green,
      },
      iconTheme: {
        primary: theme.colors.green,
        secondary: theme.colors.greenlight,
      },
      duration: 3500,
    },
    error: {
      style: {
        ...stylesDefault,
        backgroundColor: theme.colors.redlight,
        color: theme.colors.red,
      },
      iconTheme: {
        primary: theme.colors.red,
        secondary: theme.colors.redlight,
      },
      duration: 5500,
    },
    loading: {
      style: {
        ...stylesDefault,
        color: theme.colors.primary,
        backgroundColor: theme.colors.white,
      },
      iconTheme: {
        primary: theme.colors.primary,
        secondary: theme.colors.accent,
      },
    },
    blank: {
      icon: <FontAwesomeIcon icon='info-circle' />,
      style: {
        ...stylesDefault,
        color: theme.colors.yellow,
        backgroundColor: theme.colors.yellowlight,
      },
    },
  };
  const infoToast: ToastOptions = {
    icon: <FontAwesomeIcon icon={icon!} />,
    style: stylesDefault,
  };
  return (
    <Toaster
      toastOptions={icon ? infoToast : toastOptionsDefault}
      position={position ? position : 'bottom-right'}
      reverseOrder={reverseOrder}
    />
  );
};

export default Toast;
