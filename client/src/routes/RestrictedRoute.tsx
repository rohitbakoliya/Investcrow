import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { StoreState } from 'store';

const PrivateRoute: React.FC<RouteProps> = ({ ...props }) => {
  const isAuthenticated = useSelector((state: StoreState) => state.auth.isAuthenticated);
  const user = useSelector((state: StoreState) => state.auth.user);
  const hasAddress = user?.address;

  const checkingAuthStatus = useSelector((state: StoreState) => state.loading['auth/CHECK_AUTH']);

  return checkingAuthStatus ? (
    <></>
  ) : isAuthenticated ? (
    hasAddress ? (
      <Redirect
        to={{
          pathname: `/${(user as any).userType[0]}/dashboard`,
          state: { from: props.location },
        }}
      />
    ) : (
      <Redirect to={{ pathname: '/auth/portis', state: { from: props.location } }} />
    )
  ) : (
    <Route {...props} />
  );
};

export default PrivateRoute;
