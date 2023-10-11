import React, { useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Element, Heading, Stack } from 'react-ui';
import { Footer, Header } from '../components';
import { readQRCodeFromCamera } from '../api';

export const Scan = (props: IScanProps) => {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleCancelClick = useCallback((event: any) => {
    if (window.history.state.idx > 0) {
      window.history.go(-1);
      // event.preventDefault();
    } else {
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    (async () => {
      if (canvasRef?.current) {
        const camData = await readQRCodeFromCamera(canvasRef.current, 4/3);
        navigate('/result', {state: { camData }});
      }
    })();
  }, [navigate]);

  return (<>
    <Element
      // {...props}
      data-testid="scan-backdrop"
      as="div"
      css={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.8)'
      }}
    ></Element>

    <Stack
      data-testid="scan"
      direction="vertical"
      align="center"
      justify="center"
      gap={5}
      css={{
        position: 'relative',
        margin: 'auto',
        maxWidth: '30rem',
        width: '-webkit-fill-available',
        height: '-webkit-fill-available',
        justifyContent: 'flex-start',
        overflowY: 'visible'
      }}
    >
      <Header
        data-testid="scan-header"
        color="white"
      />

      <Stack
        data-testid="scan-content"
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
          data-testid="scan-title"
          size={5}
          css={{
            color: 'white'
          }}
        >Scanning...</Heading>

        <Element
          ref={canvasRef}
          data-testid="scan-canvas"
          as="canvas"
          css={{
            width: '100%',
            height: "auto"
          }}
        ></Element>

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
          <Button
            data-testid="cancel-scan-action"
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

      <Footer data-testid="scan-footer" color="white" />
    </Stack>
  </>);
};
export default Scan;
