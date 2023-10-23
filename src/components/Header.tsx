import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Element, Stack } from 'react-ui';

export function Header({ backgroundColor, color, hideDismissButton, hideInfoButton, testId = 'header' }: IHeaderProps) {
  const navigate = useNavigate();

  const handleInfoBtnClick = () => {
    navigate('/about');
  };

  const handleDismissBtnClick = useCallback((event: any) => {
    if (window.history.state.idx > 0) {
      window.history.go(-1);
    } else {
      navigate('/');
    }
  }, [navigate]);

  return (
    <Stack
      data-testid={testId}
      direction="horizontal"
      align="flex-end"
      justify="space-between"
      css={{
        backgroundColor,
        color,
        marginTop: '0.5rem',
        width: '-webkit-fill-available'
      }}
    >
      <span></span>
      {hideDismissButton && hideInfoButton && <Element
        as="span"
        css={{
          height: "1.5rem"
        }}
      />}
      {hideInfoButton || <Button
        data-testid={`${testId}-info-btn`}
        variant="secondary"
        onClick={handleInfoBtnClick}
        css={{
          padding: 0,
          height: 'auto',
          width: 'auto',
          borderWidth: 0,
          borderRadius: '50%'
        }}
        style={{
          backgroundColor: 'transparent',
          paddingLeft: 0,
          paddingRight: 0
        }}
      >
        <Element
          as="svg"
          style={{
            width: '24px',
            height: '24px',
            overflow: 'visible',
            margin: 0,
            fill: color || 'rgb(66, 66, 66)'
          }}
          viewBox="2 2 20 20"
        >
          <path d="M11 7h2v2h-2V7zm0 4h2v6h-2v-6zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path>
        </Element>
      </Button>}
      {hideDismissButton || <Button
        data-testid={`${testId}-dismiss-btn`}
        variant="secondary"
        onClick={handleDismissBtnClick}
        css={{
          padding: 0,
          height: 'auto',
          width: 'auto',
          borderWidth: 0,
          borderRadius: '50%'
        }}
        style={{
          backgroundColor: 'transparent',
          paddingLeft: 0,
          paddingRight: 0
        }}
      >
        <Element
          as="svg"
          style={{
            width: '24px',
            height: '24px',
            overflow: 'visible',
            margin: 0,
            fill: color || 'rgb(66, 66, 66)'
          }}
          viewBox="2 2 20 20"
        >
          <path fill="none" d="M0 0h24v24H0z"></path>
          <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
        </Element>
      </Button>}
    </Stack>
  );
}
export default Header;
