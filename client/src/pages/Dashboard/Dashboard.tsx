import Sidebar from 'components/Sidebar/Sidebar';
import React from 'react';
// import { useSelector } from 'react-redux';
import DashboardRoutes from 'routes/Dashboard.routes';
// import { StoreState } from 'store';
import { DashboardBody, DashboardWrapper } from './Dashboard.style';

const Dashboard: React.FC = () => {
  // const state = useSelector((state: StoreState) => state.auth.user);
  // console.log(state);
  return (
    <DashboardWrapper>
      <Sidebar />
      <DashboardBody>
        <DashboardRoutes />
        {/* <pre>{JSON.stringify(state, null, 2)}</pre> */}
      </DashboardBody>
    </DashboardWrapper>
  );
};
export default Dashboard;
