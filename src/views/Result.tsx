import React, { useCallback, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Element, Heading, Stack, Text } from 'react-ui';
import { Footer, Header } from '../components';
import { readQRCodeFromImage } from '../api';
import { isURL } from '../utils';
import './Result.css';

const renderTextValue = ({ error,  result }: IQRCodeReaderData, element: HTMLElement) => {
  const pElem = element.querySelector('p');
  if (pElem && (error as Error)?.message && element) {
    element.classList.remove('result');
    element.classList.add('error');
    pElem.innerHTML = `<b>Error: </b><span>${(error as Error).message}</span>`;
  } else if (pElem && (error as string)?.length && element) {
    element.classList.remove('result');
    element.classList.add('error');
    pElem.innerHTML = `<b>Error: </b><span>${error}</span>`;
  } else if (pElem && result && element) {
    element.classList.remove('error');
    element.classList.add('result');
    // TODO: handle url | email | etc. text
    const text = result as unknown as string;
    pElem.innerHTML = isURL(text) ? `<a href=${/^(https|http|ftp|file)+?(:\/\/)?/.test(text) ? text : `https://${text}`} target="_blank">${text}</a>` : `<span>${text}</span>`;
  }
};

export const Result = (props: IResultsProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const resultContinerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadCancel = useCallback(() => {
    props?.onUploadCancel?.();
  }, [props]);

  const handleUploadChange = useCallback((event: Event) => {
    const target = event?.target as HTMLInputElement;
    const imgFile = target?.files?.item(0);
    navigate('/result', {state: { imgFile}});
    props?.onUploadSelect?.(target?.files?.item(0));
  }, [navigate, props]);

  const handleUploadClick = useCallback(() => {
    props?.onUploadClick?.();
  }, [props]);

  const handleCancelClick = useCallback((event: any) => {
    if (window.history.state.idx > 0) {
      window.history.go(-1);
      event.preventDefault();
    } else {
      navigate('/');
    }
  }, [navigate]);

  const handleImgLoad = useCallback(async (event: Event) => {
    const canvas = canvasRef?.current;
    if (canvas) {
      const data = await readQRCodeFromImage(canvas, event.target as HTMLImageElement);
      const { imageData } = data;
      // setQRCodeData(data);
      if (imageData && canvas) {
        const ctx = canvas.getContext("2d");
        ctx?.putImageData(imageData, 0, 0);
      }
      const textContainer = resultContinerRef?.current;
      if (textContainer) {
        renderTextValue(data, textContainer);
      }
    }
  }, []);

  const handleCamDataLoad = useCallback((camData: IQRCodeReaderData) => {
    // const { imageData, result, error } = camData;
    const canvas = canvasRef?.current;
    if (canvas) {
      const { imageData } = camData;
      // setQRCodeData(data);
      if (imageData && canvas) {
        canvas.width = imageData.width;
        canvas.height = imageData.height;  
        const ctx = canvas.getContext("2d");
        ctx?.putImageData(imageData, 0, 0);
      }
      const textContainer = resultContinerRef?.current;
      if (textContainer) {
        renderTextValue(camData, textContainer);
      }
    }
  }, []);

  const handleCopyResultClick = useCallback(() => {
    (async () => {
      const textContent = textRef?.current?.textContent;
      if (textContent?.length) {
        await navigator.clipboard.writeText(textContent);
      }  
    })();
  }, []);

  useEffect(() => {
    const state = location.state;
    const imgFile = state?.imgFile as File;
    const camData = state?.camData as IQRCodeReaderData;
    if (imgFile) {
      const img = new Image();
      img.onload = handleImgLoad;
      img.src = URL.createObjectURL(imgFile);
    } else if (camData) {
      handleCamDataLoad(camData);
    }
  }, [handleCamDataLoad, handleImgLoad, location.state]);

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

  return (
    <Stack
      // {...props}
      data-testid="result"
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
      <Header data-testid="result-header" />

      <Stack
        data-testid="result-content"
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
          data-testid="result-title"
          size={5}
        >QR Code Scanner</Heading>

        <Element
          ref={resultContinerRef}
          as="div"
          css={{
            width: '-webkit-fill-available'
          }}
        >
          <Text
            ref={textRef}
            data-testid="result-text"
            as="p"
            align="center"
            size={3}
            css={{
              width: '100%',
              height: 'auto'
            }}
          >No Data</Text>

          <Button
            data-testid="result-copy-action"
            className="text-copy-action"
            type="button"
            onClick={handleCopyResultClick}
            style={{
            }}
          >
            <Element
              as="svg"
              style={{
                width: '1rem',
                height: '1rem',
                overflow: 'visible',
                margin: 0,
                fill: '#333333'
              }}
              viewBox="0 0 24 24"
            >
              <path d="M0 0h24v24H0z" fill="none"></path>
                <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z">
              </path>
            </Element>
          </Button>
        </Element>

        <Element
          data-testid="result-canvas"
          as="canvas"
          ref={canvasRef}
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

          <Button
            data-testid="cancel-scan-action"
            type="button"
            fullWidth
            style={{
              color: '#333333',
              backgroundColor: 'transparent'
            }}
            onClick={handleCancelClick}
          >
            <Element
              data-testid="cancel-action-icon"
              as="svg"
              css={{
                width: '21px',
                height: '21px',
                overflow: 'visible',
                margin: 0,
                fill: '#333333'
              }}
              viewBox="0 0 24 24"
            >
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path d="M17.77 3.77 16 2 6 12l10 10 1.77-1.77L9.54 12z"></path>
            </Element>

            <span data-testid="cancel-action-text">Back</span>
          </Button>

        </Stack>
      </Stack>

      <Footer data-testid="home-footer" />
    </Stack>
  );
};
export default Result;
