import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Flex } from '@ico-ui';
import DashboardHeader from '@ico-ui/DashboardHeader';
import Loading from '@ico-ui/Loading';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import toast from 'react-hot-toast';
import styled from 'styled-components';

const StyledProfiles = styled.div`
  & {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
    grid-row-gap: 50px;
    margin-top: ${p => p.theme.spacings.top * 2}px;
    margin-bottom: ${p => p.theme.spacings.bottom * 2}px;

    h3 {
      word-break: break-all;
    }
  }
`;

const Profiles: React.FC = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get('/api/user/all');
        const _users = data.users;
        setUsers(_users);
        setLoading(false);
      } catch (err) {
        setError(`something went wrong`);
      }
    };
    fetchUsers();
  }, []);
  const renderProfiles = () => {
    if (loading) return <Loading varient='secondary' />;
    if (error) {
      return <>Something went wrong while loading the data </>;
    }
    if (users.length === 0) {
      return <> No users registered yet</>;
    }
    return users.map((user: any) => (
      <Flex key={user.id} align='center' direction='column'>
        <Avatar
          address={user.address}
          showVerification={user.userType[0] === 'startup' ? true : false}
          isVerified={user.isVerified}
          width='130'
          height='130'
          size='130'
          id={user.id}
        />
        <h3 className='text--bold mt-small'>{user.name}</h3>
        <span className='color--gray'>
          {user.address}
          <CopyToClipboard
            text={user.address ? user.address : ''}
            onCopy={() => toast.success('Copied to clipboard!')}
          >
            <FontAwesomeIcon style={{ marginLeft: '12px', cursor: 'pointer' }} icon='clipboard' />
          </CopyToClipboard>
        </span>
      </Flex>
    ));
  };
  return (
    <>
      <DashboardHeader>
        <h2 className='text--center'>Total Users: {users.length}</h2>
      </DashboardHeader>
      <StyledProfiles>{renderProfiles()}</StyledProfiles>
    </>
  );
};
export default Profiles;
