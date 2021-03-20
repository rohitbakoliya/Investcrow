import DashboardHeader from '@ico-ui/DashboardHeader';
import Loading from '@ico-ui/Loading';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import UserAgreements from './UserAgreements';
import UserInfo from './UserInfo';

const Profile: React.FC = () => {
  const { address } = useParams<{ address: string }>();
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        let { data } = await axios.get(`/api/user/${address}`);
        data = data.data;
        setUserData(data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError(`something went wrong`);
      }
    };
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const user = userData;
  const renderUserInfo = () => {
    if (loading) return <Loading varient='secondary' />;
    if (error) {
      return <div>Opps! Something went wrong</div>;
    }
    return (
      <>
        <UserInfo user={user} totalComments={10} totalBugs={10} />
      </>
    );
  };
  return (
    <>
      <DashboardHeader></DashboardHeader>
      {renderUserInfo()}
      <br />
      <br />
      <h2>User History</h2>
      <UserAgreements />
    </>
  );
};

export default Profile;
