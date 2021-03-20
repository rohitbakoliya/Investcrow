import React from 'react';
import { Switch, BrowserRouter } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import RestrictedRoute from './RestrictedRoute';
import Dashboard from 'pages/Dashboard/Dashboard';
import Home from 'pages/Home/Home';
import Login from 'pages/Login/Login';
import Signup from 'pages/Signup/Signup';
import VerifyEmail from 'pages/Requests/VerifyEmail/VerifyEmail';
import ResetPasswordReq from 'pages/Requests/ResetPassword/ResetPasswordReq';
import ResetPassword from 'pages/Requests/ResetPassword/ResetPassword';
import AuthPortis from 'pages/AuthPortis/AuthPortis';

const LoginHome = () => <Home right={Login} />;
const SignupHome = () => <Home right={Signup} />;
const VerifyEmailHome = () => <Home right={VerifyEmail} />;
const ResetPasswordReqHome = () => <Home right={ResetPasswordReq} />;
const ResetPasswordHome = () => <Home right={ResetPassword} />;

const MainRouter: React.FC = () => (
  <BrowserRouter>
    <Switch>
      {/* Restricted Routes */}
      <RestrictedRoute path='/' exact component={LoginHome} />
      <RestrictedRoute path='/signup' component={SignupHome} />
      <RestrictedRoute path='/reset-password/:token' component={ResetPasswordHome} />
      <RestrictedRoute path='/request/forgot-password' component={ResetPasswordReqHome} />
      <RestrictedRoute path='/request/verification-email' component={VerifyEmailHome} />
      <PublicRoute exact path='/auth/portis' component={AuthPortis} />

      {/* Private Routes */}
      <PrivateRoute path='/' component={Dashboard} />
      {/* Private Routes */}
      <PublicRoute component={() => <div>{AuthPortis}</div>} />
    </Switch>
  </BrowserRouter>
);

export default MainRouter;
