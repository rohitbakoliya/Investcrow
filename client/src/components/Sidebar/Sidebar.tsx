import { Flex, IconLink } from '@ico-ui';
import Avatar from '@ico-ui/Avatar';
import Navbar from 'components/Navbar/Navbar';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { StoreState } from 'store';
import { logoutUser } from 'store/ducks';
import { SidebarWrapper, SidebarLinks } from './Sidebar.style';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Sidebar: React.FC = React.memo(() => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state: StoreState) => state.auth.user);
  const _userTypes = user?.userType;
  const _userType = (_userTypes as any)[0];
  const [isOpen, setIsOpen] = useState(() => false);
  const handleOpen = () => setIsOpen(!isOpen);

  useEffect(() => {
    // to close the sidebar in mobile view by clicking outside
    document.addEventListener('click', (e: any) => {
      if (e.target.closest('.hamburger--icon')) return;
      if (e.target.closest('a') || !e.target.closest('.sidebar--wrapper')) {
        setIsOpen(false);
      }
    });
  }, []);

  const logout = () => {
    dispatch(logoutUser())
      .then(() => {
        toast.success(`Logged out successfully!`);
        history.push('/');
      })
      .catch((err: string) => {
        toast.error(err);
      });
  };

  return (
    <>
      <Navbar isOpen={isOpen} handleSidebar={handleOpen} />
      <SidebarWrapper isOpen={isOpen} className='sidebar--wrapper'>
        <div className='sidebar--sticky'>
          <Flex align='center' className='dashboard__user'>
            <Avatar
              className='dashboard__avatar'
              id={user?.id}
              size='150'
              height='auto'
              width='100%'
            />
            <div className='dashboard__info'>
              <h2 className='text--bold'>{user?.name}</h2>
              <p className='color--gray address--bar'>
                Your Addreess
                {/* {user?.address} */}
                <CopyToClipboard
                  text={user?.address ? user.address : ''}
                  onCopy={() => toast.success('Copied to clipboard!')}
                >
                  <FontAwesomeIcon icon='clipboard' />
                </CopyToClipboard>
              </p>
            </div>
          </Flex>
          <SidebarLinks>
            <Flex gap='large' direction='column'>
              <IconLink
                className='nav--link'
                circleIcon
                to={`/${_userType}/dashboard`}
                startIcon='home'
              >
                Dashboard
              </IconLink>
              <IconLink className='nav--link' circleIcon to='/profiles' startIcon='user'>
                {/* Investments  */}
                User Profiles
              </IconLink>
              <IconLink
                className='nav--link'
                circleIcon
                to={`/profile/${user?.address}`}
                startIcon='user'
              >
                My Profile
              </IconLink>
              {/* <IconLink className='nav--link' circleIcon to='/notification' startIcon='bell'>
                Notification
              </IconLink> */}
              <IconLink
                className='nav--link'
                circleIcon
                startIcon='sign-out-alt'
                to='#'
                onClick={logout}
              >
                Logout
              </IconLink>
            </Flex>
          </SidebarLinks>
        </div>
      </SidebarWrapper>
    </>
  );
});

export default Sidebar;
