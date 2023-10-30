import React, { ForwardedRef, forwardRef } from 'react';
import { Stack } from 'react-ui';
import { Footer, Header } from '../components';

export const Layout = forwardRef(({ header, footer, children, testId = "layout" }: ILayoutProps, ref: ForwardedRef<HTMLDivElement>) => {
  return (
    <Stack
      data-testid={testId}
      direction="vertical"
      align="center"
      justify="flex-start"
      gap={5}
      css={{
        position: 'relative',
        margin: 'auto',
        maxWidth: 'var(--content-max-width)',
        width: '-webkit-fill-available',
        height: '-webkit-fill-available',
        justifyContent: 'flex-start',
        overflowY: 'visible'
      }}
    >
      <Header
        data-testid={`${testId}-header`}
        {...header}
      />

      <Stack
        data-testid={`${testId}-content`}
        direction="vertical"
        align="center"
        justify="space-between"
        css={{
          position: 'relative',
          justifyContent: 'flex-start',
          height: 'auto',
          width: '100%'
        }}
      >{children}</Stack>

      <Footer
        data-testid={`${testId}-footer`}
        {...footer}
      />
    </Stack>
  );
});
Layout.displayName = "Layout";
export default Layout;