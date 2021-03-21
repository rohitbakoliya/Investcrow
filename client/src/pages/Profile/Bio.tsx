import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { Button, ButtonGroup, Flex, CircleIcon, SyTooltip } from '@ico-ui';
import { Textarea } from '@ico-ui/Form';

import { StoreState } from 'store';
import { updateUserBio, updateUserWP } from 'store/ducks/auth';
import CopyToClipboard from 'react-copy-to-clipboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface BioProps {
  user: any;
  currentUser: any;
}
const Bio: React.FC<BioProps> = ({ user, currentUser }) => {
  const dispatch = useDispatch<any>();
  const textareaRef = useRef<any>();
  const textareaRefWP = useRef<any>();
  const isBioLoading = useSelector((state: StoreState) => state.loading['user/UPDATE_BIO']);

  const [isSaveButton, setIsSaveButton] = useState(false);
  const [isBioEditing, setBioEditing] = useState(false);

  const isWPLoading = useSelector((state: StoreState) => state.loading['user/UPDATE_WP']);
  const [isWPEditing, setWPEditing] = useState(false);
  const [isWPSaveButton, setIsWPSaveButton] = useState(false);

  const toggleBioEdit = () => {
    setBioEditing(() => {
      console.log(textareaRef.current.focus());
      return !isBioEditing;
    });
  };

  const updateBio = () => {
    setBioEditing(false);
    dispatch(updateUserBio({ bio: textareaRef.current.value }))
      .then(() => {
        toast.success('Bio updated');
      })
      .catch((err: string) => {
        toast.error(err);
      });
  };
  const toggleWPEdit = () => {
    setWPEditing(() => {
      console.log(textareaRefWP.current.focus());
      return !isWPEditing;
    });
  };
  const updateWP = () => {
    setWPEditing(false);
    dispatch(updateUserWP({ whitePaper: textareaRefWP.current.value }))
      .then(() => {
        window.location.reload();
        toast.success('White Paper updated');
      })
      .catch((err: string) => {
        toast.error(err);
      });
  };

  const isCurrentUser = currentUser.address === user.address;

  const userType = user.userType[0];
  useEffect(() => {
    const findButton = (e: any) => {
      setIsSaveButton(e.target && e.target.closest('.edit__button'));
    };
    document.body.addEventListener('mousedown', findButton);

    return () => document.body.removeEventListener('mousedown', findButton);
  }, []);

  useEffect(() => {
    const findButton = (e: any) => {
      setIsWPSaveButton(e.target && e.target.closest('.edit__button_wp'));
    };
    document.body.addEventListener('mousedown', findButton);

    return () => document.body.removeEventListener('mousedown', findButton);
  }, []);

  const renderWP = () => {
    if (userType !== 'startup') return <></>;
    return (
      <>
        <p>
          <Textarea
            rows={1}
            as='textarea'
            ref={textareaRefWP}
            className={isWPEditing ? 'wp__textarea--show' : 'wp__textarea--hidden'}
            onBlur={() => !isWPSaveButton && setWPEditing(false)}
          >
            {currentUser.whitePaper}
          </Textarea>

          {!isWPEditing &&
            (isCurrentUser ? (
              currentUser.whitePaper === 'No white Paper!' ? (
                'No White Paper!'
              ) : (
                <a href={`${currentUser.whitePaper}`} className='wp--link' target='__blank'>
                  {currentUser.whitePaper}
                </a>
              )
            ) : (
              <a href={`${user.whitePaper}`} className='wp--link' target='__blank'>
                {user.whitePaper}
              </a>
            ))}
        </p>
        {isCurrentUser && (
          <ButtonGroup gap='medium'>
            <Button
              className='edit__button_wp'
              size='small'
              icon='edit'
              onClick={isWPEditing ? updateWP : toggleWPEdit}
              variant={isWPEditing ? 'success' : 'secondary'}
              isLoading={isWPLoading}
              style={{ marginTop: 0 }}
            >
              Edit White Paper
            </Button>
          </ButtonGroup>
        )}
      </>
    );
  };
  return (
    <div style={{ width: '100%' }}>
      <Flex
        style={{ display: 'inline-flex' }}
        as='h2'
        align='center'
        gap='small'
        className='text--medium'
      >
        <span>{user.name}</span>
        {userType === 'startup' ? (
          <CircleIcon
            as='span'
            size='25px'
            variant={user.isVerified ? 'success' : 'danger'}
            icon={user.isVerified ? 'check' : 'times'}
          />
        ) : null}
      </Flex>
      <br />
      <span className='color--gray'>
        {user.address}
        <SyTooltip title='copy address'>
          <CopyToClipboard
            text={user.address ? user.address : ''}
            onCopy={() => toast.success('Copied to clipboard!')}
          >
            <FontAwesomeIcon style={{ marginLeft: '12px', cursor: 'pointer' }} icon='clipboard' />
          </CopyToClipboard>
        </SyTooltip>
      </span>
      <p>
        <Textarea
          rows={3}
          as='textarea'
          ref={textareaRef}
          className={isBioEditing ? 'bio__textarea--show' : 'bio__textarea--hidden'}
          onBlur={() => !isSaveButton && setBioEditing(false)}
        >
          {currentUser.bio}
        </Textarea>
        {!isBioEditing && (isCurrentUser ? currentUser.bio : user.bio)}
      </p>
      {isCurrentUser && (
        <ButtonGroup gap='medium'>
          <Button
            className='edit__button'
            size='small'
            icon='edit'
            onClick={isBioEditing ? updateBio : toggleBioEdit}
            variant={isBioEditing ? 'success' : 'secondary'}
            isLoading={isBioLoading}
            style={{ marginTop: 0 }}
          >
            Edit about
          </Button>
        </ButtonGroup>
      )}
      {renderWP()}
    </div>
  );
};

export default Bio;
