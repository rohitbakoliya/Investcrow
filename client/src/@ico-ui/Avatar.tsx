import React, { CSSProperties, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import CircleIcon from './CircleIcon';
import Loading from './Loading';

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  id?: string;
  width?: string;
  height?: string;
  size?: CSSProperties['width'];
  showVerification?: boolean;
  isVerified?: boolean;
  address?: string;
}

interface IAvatarImg {
  loader: boolean;
}

interface ILoading {
  loader: boolean;
  size?: CSSProperties['width'];
}

const AvatarImage = styled.img<IAvatarImg>(p => ({
  display: p.loader ? 'none' : 'block',
  maxWidth: '200px',
  border: p.theme.border,
  borderRadius: '50%',
  objectFit: 'cover',
  margin: 0,
}));

const LoadingImage = styled.div<ILoading>`
  width: 100%;
  max-width: 200px;
  min-height: 168px;
  display: ${p => (p.loader ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
`;

const AvatarWrapper = styled.div`
  position: relative;
  .verification--status {
    position: absolute;
    bottom: 10px;
    right: 10px;
  }
`;

export const Avatar: React.FC<Props> = ({
  id,
  size,
  address,
  height,
  width,
  showVerification,
  isVerified = false,
  ...rest
}) => {
  const [loading, setLoading] = useState(true);
  const handleLoading = () => {
    setLoading(false);
  };
  return (
    <AvatarWrapper>
      <LoadingImage loader={loading} {...rest}>
        <Loading varient='primary' />
      </LoadingImage>
      <Link style={{ lineHeight: 0 }} to={`/profile/${address}`}>
        <AvatarImage
          src={`/api/user/${id}/avatar/raw?size=${size}`}
          height={height}
          width={width}
          loader={loading}
          onLoad={handleLoading}
          {...rest}
        />
      </Link>
      {showVerification && (
        <CircleIcon
          className='verification--status'
          size='25px'
          variant={isVerified ? 'success' : 'danger'}
          icon={isVerified ? 'check' : 'times'}
        />
      )}
    </AvatarWrapper>
  );
};

export default Avatar;
