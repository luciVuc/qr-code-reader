import React from 'react';
import { Button, Dialog, Element, Stack } from 'react-ui';

export function Header(props: IHeaderProps) {
  const [showDialog, setShowDialog] = React.useState(false);
  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);
  
  return (<>
    <Stack
      {...props}
      direction="horizontal"
      align="flex-end"
      justify="space-between"
      css={{
        marginTop: '0.5rem',
        width: '-webkit-fill-available'
      }}
    >
      <span></span>
      <Button
        data-testid="open-about-btn"
        variant="secondary"
        onClick={open}
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
            fill: props.color || 'rgb(66, 66, 66)'
          }}
          viewBox="2 2 20 20"
        >
          <path d="M11 7h2v2h-2V7zm0 4h2v6h-2v-6zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path>
        </Element>
      </Button>

    </Stack>

    <Dialog isOpen={showDialog} onDismiss={close}>
      <p>The content of the Dialog</p>
      <button onClick={close}>
        Close Dialog
      </button>
    </Dialog>
  </>);
}
export default Header;

{/*
<svg viewBox="0 0 24 24">
  <path d="M0 0h24v24H0V0z" fill="none"></path>
  <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 128c17.67 0 32 14.33 32 32c0 17.67-14.33 32-32 32S224 177.7 224 160C224 142.3 238.3 128 256 128zM296 384h-80C202.8 384 192 373.3 192 360s10.75-24 24-24h16v-64H224c-13.25 0-24-10.75-24-24S210.8 224 224 224h32c13.25 0 24 10.75 24 24v88h16c13.25 0 24 10.75 24 24S309.3 384 296 384z"></path>
</svg>
*/}
