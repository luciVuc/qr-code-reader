import React, { useCallback, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Element, Heading, Stack, Text } from 'react-ui';
import { Layout, ScanDialog } from '../components';

export function Home(props: IHomeProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadChange = useCallback((event: Event) => {
    props.onUploadSelect?.((event?.target as HTMLInputElement)?.files?.item(0));
  }, [props]);

  const handleUploadClick = useCallback(() => {
    props.onUploadClick?.();
  }, [props]);

  const handleUploadCancel = useCallback(() => {
    props.onUploadCancel?.();
  }, [props]);

  const handleScanDismiss = useCallback((event: any) => {
    if (window.history.state.idx > 0) {
      window.history.go(-1);
    } else {
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    const fileInput = fileInputRef?.current;
    if (fileInput) {
      fileInput.addEventListener('cancel', handleUploadCancel);
      fileInput.addEventListener('click', handleUploadClick);
      fileInput.addEventListener('change', handleUploadChange);
      return () => {
        fileInput.removeEventListener('cancel', handleUploadCancel);
        fileInput.removeEventListener('click', handleUploadClick);
        fileInput.removeEventListener('change', handleUploadChange);
      };
    }
  }, [handleUploadCancel, handleUploadChange, handleUploadClick]);

  return (<>
    <Layout
      data-testid="home"
      header={{
        hideDismissButton: true,
        testId: 'home'
      }}
    >
      <Element
        data-testid="home-logo"
        as="svg"
        style={{
          color: 'currentColor',
          width: '6rem',
          overflow: 'visible'
        }}
        viewBox="0 0 24 24"
      >
        <path fill="none" d="M0 0h24v24H0z"></path>
        <path d="M3 11h8V3H3v8zm2-6h4v4H5V5zM3 21h8v-8H3v8zm2-6h4v4H5v-4zm8-12v8h8V3h-8zm6 6h-4V5h4v4zm0 10h2v2h-2zm-6-6h2v2h-2zm2 2h2v2h-2zm-2 2h2v2h-2zm2 2h2v2h-2zm2-2h2v2h-2zm0-4h2v2h-2zm2 2h2v2h-2z"></path>
      </Element>

      <Heading
        data-testid="home-title"
        size={5}
      >QR Code Scanner</Heading>

      <Text
        data-testid="home-info"
        as="label"
        align="center"
        size={3}
        css={{
          width: '100%',
          height: 'auto',
          margin: '1rem 0'
        }}>
        Scan the QR Code with your device's camera,<br />or upload it as an image file.
      </Text>

      <Stack
        data-testid="home-actions"
        direction="vertical"
        align="center"
        justify="center"
        gap={2}
        css={{
          width: '-webkit-fill-available'
        }}
      >
        <Link
          data-testid="scan-action-nav"
          to="scan"
          style={{
            width: '-webkit-fill-available'
          }}
        >
          <Button
            data-testid="upload-action"
            type="button"
            fullWidth
          >
            <Element
              data-testid="upload-action-icon"
              as="svg"
              css={{
                width: '21px',
                height: '21px',
                overflow: 'visible',
                margin: '0px 7px 0px 0px',
                fill: 'rgb(255, 255, 255)'
              }}
              viewBox="0 0 24 24"
            >
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path d="M9.5 6.5v3h-3v-3h3M11 5H5v6h6V5zm-1.5 9.5v3h-3v-3h3M11 13H5v6h6v-6zm6.5-6.5v3h-3v-3h3M19 5h-6v6h6V5zm-6 8h1.5v1.5H13V13zm1.5 1.5H16V16h-1.5v-1.5zM16 13h1.5v1.5H16V13zm-3 3h1.5v1.5H13V16zm1.5 1.5H16V19h-1.5v-1.5zM16 16h1.5v1.5H16V16zm1.5-1.5H19V16h-1.5v-1.5zm0 3H19V19h-1.5v-1.5zM22 7h-2V4h-3V2h5v5zm0 15v-5h-2v3h-3v2h5zM2 22h5v-2H4v-3H2v5zM2 2v5h2V4h3V2H2z"></path>
            </Element>
            <span data-testid="upload-action-text">Scan</span>
          </Button>
        </Link>

        <Button
          data-testid="upload-action"
          type="button"
          fullWidth
        >
          <label
            data-testid="upload-action-label"
            style={{
              width: '-webkit-fill-available',
              margin: 0,
              border: 0,
              padding: 0,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Element
              data-testid="upload-action-icon"
              as="svg"
              css={{
                width: '21px',
                height: '21px',
                overflow: 'visible',
                fill: 'rgb(255, 255, 255)'
              }}
              viewBox="0 0 24 24"
            >
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path d="M3 11h8V3H3v8zm2-6h4v4H5V5zM3 21h8v-8H3v8zm2-6h4v4H5v-4zm8-12v8h8V3h-8zm6 6h-4V5h4v4zm0 10h2v2h-2zm-6-6h2v2h-2zm2 2h2v2h-2zm-2 2h2v2h-2zm2 2h2v2h-2zm2-2h2v2h-2zm0-4h2v2h-2zm2 2h2v2h-2z"></path>
            </Element>
            <span data-testid="upload-action-text">Upload</span>
            <input
              ref={fileInputRef}
              data-testid="upload-action-input"
              type='file'
              accept='image/*'
              hidden
            />
          </label>
        </Button>
      </Stack>
    </Layout>

    {location.pathname === '/scan' && <ScanDialog
      isOpen={true}
      onDismiss={handleScanDismiss}
    />}
  </>);
}
export default Home;
