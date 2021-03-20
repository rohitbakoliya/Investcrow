import InvestorDashboard from 'pages/Dashboard/Investor/InvestorDashboard';
import StartupDashboard from 'pages/Dashboard/Startup/StartupDashboard';
import Profile from 'pages/Profile/Profile';
import Profiles from 'pages/Profiles/Profiles';
import { Switch } from 'react-router';
import PrivateRoute from './PrivateRoute';

const DashboardRoutes = () => (
  <Switch>
    <PrivateRoute exact path='/profile/:address' component={Profile} />
    <PrivateRoute exact path='/profiles' component={Profiles} />
    <PrivateRoute exact path='/startup/dashboard' component={StartupDashboard} />
    <PrivateRoute exact path='/investor/dashboard' component={InvestorDashboard} />
  </Switch>
);

export default DashboardRoutes;
