import React, { useEffect, useState } from 'react';
import avatarDefault from 'assets/images/avatar-default.jpg';
import AvatarContainer, { AvatarUploaderWrapper } from './AvatarUploader.style';
import { useDropzone } from 'react-dropzone';
import { Flex } from '@ico-ui';

interface PreviewFile {
  preview?: any;
}

interface Props {
  size?: React.CSSProperties['width'];
  name: string;
  file?: PreviewFile;
  defaultImg?: any;
  handleFile: (file: any) => void;
  handleError: (file: any) => void;
  fileError?: string | null;
}

const AvatarUploader: React.FC<Props> = ({
  size,
  name,
  file,
  handleFile,
  defaultImg,
  fileError,
  handleError,
}) => {
  const [error, setError] = useState<string>();
  const onDrop = (acceptedFiles: any, rejectedFiles: any): void => {
    if (acceptedFiles.length !== 0) {
      acceptedFiles[0].preview = URL.createObjectURL(acceptedFiles[0]);
      handleFile(acceptedFiles[0]);
      handleError('');
      setError('');
    } else if (rejectedFiles.length !== 0) {
      const errorCode = rejectedFiles[0].errors[0].code;
      switch (errorCode) {
        case 'file-invalid-type':
          setError('Invalid File type');
          handleFile(undefined);
          break;
        case 'file-too-large':
          handleFile(undefined);
          setError('Image too big, max allowed size is 1MB');
          break;
        default:
          handleFile(undefined);
          setError('Something went wrong!');
          break;
      }
    }
  };
  const { getRootProps, getInputProps } = useDropzone({
    accept: ['image/jpeg', 'image/jpg', 'image/png'],
    multiple: false,
    maxSize: 1 * 1024 * 1024,
    onDrop,
  });
  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      file && URL.revokeObjectURL(file.preview);
    },
    [file]
  );
  return (
    <AvatarUploaderWrapper>
      <Flex justify='center' align='center' direction='column'>
        <AvatarContainer size={size} indicateError={error ? true : false}>
          <div {...getRootProps({ className: 'dropzone' })}>
            {/* 
             // * input element already have ref from react-dropzone
            */}
            <input type='file' name={name} {...getInputProps()} />
            <p>Change Avatar</p>
          </div>
          <img
            src={file ? file.preview : defaultImg ? defaultImg : avatarDefault}
            alt={file ? 'avatar' : 'default avatar'}
          />
        </AvatarContainer>
        {fileError && !error && (
          <div className={`text--error ${fileError && 'show-error'}`}>{fileError}</div>
        )}
        <div className={`text--error ${error && 'show-error'}`}>{error}</div>
      </Flex>
    </AvatarUploaderWrapper>
  );
};
export default AvatarUploader;
