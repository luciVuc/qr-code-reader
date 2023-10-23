import React, { useCallback } from 'react';
import { Button, Dialog, Element, Heading, Stack } from 'react-ui';
import { Header } from '../components';
import { readQRCodeFromCamera } from '../api';
import { useNavigate } from 'react-router-dom';

export const ScanDialog = (props: IScanDialogProps) => {
  const navigate = useNavigate();

  const handleCancelClick = useCallback((event?: any) => {
    if (window.history.state.idx > 0) {
      window.history.go(-1);
    } else {
      navigate('/');
    }
  }, [navigate]);

  const handleCanvasRef = useCallback(async (canvas: HTMLCanvasElement) => {
    if (canvas) {
      try {
        const camData = await readQRCodeFromCamera(canvas, 4 / 3);
        if (camData.result !== window.history.state?.usr?.camData?.result) {
          navigate('/result', { state: { camData } });
        }
      } catch (error: any) {
        alert(`Error: ${error?.error}`);
        handleCancelClick();
      }
    }
  }, [handleCancelClick, navigate]);

  return (
    <Dialog
      {...props}
      data-testid="scan-dialog"
      className="scanDialog"
      isOpen={true}
      aria-label="Scanning"
      onDismiss={handleCancelClick}
      css={{
        alignItems: 'start',
        backgroundColor: '#030303',
        padding: '0 1rem'
      }}
    >
      <Header
        data-testid="scan-header"
        color="white"
        hideDismissButton={true}
        hideInfoButton={true}
      />

      <Stack
        data-testid="scan-dialog-content"
        direction="vertical"
        align="center"
        justify="space-between"
        gap={2}
        css={{
          // marginTop: '10rem',
          width: '100%'
        }}
      >
        <Heading
          data-testid="scan-dialog-title"
          size={5}
          css={{
            color: 'white'
          }}
        >Scanning...</Heading>

        <Element
          ref={handleCanvasRef}
          data-testid="scan-dialog-canvas"
          as="canvas"
          css={{
            width: '100%',
            height: "auto"
          }}
        ></Element>

        <Stack
          data-testid="scan-dialog-actions"
          direction="vertical"
          align="center"
          justify="center"
          gap={2}
          css={{
            width: '-webkit-fill-available'
          }}
        >
          <Button
            data-testid="cancel-scan-dialog-action"
            type="button"
            fullWidth
            onClick={handleCancelClick}
          >
            <Element
              data-testid="cancel-action-icon"
              as="svg"
              css={{
                width: '24px',
                height: '24px',
                overflow: 'visible',
                margin: 0,
                fill: 'rgb(255, 255, 255)'
              }}
              viewBox="0 0 24 24"
            >
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
            </Element>

            <span data-testid="cancel-action-text">Cancel</span>
          </Button>

        </Stack>
      </Stack>
    </Dialog>
  );
};
export default ScanDialog;
