import { ForwardedRef, forwardRef } from 'react';
import { Element, Spinner } from 'react-ui';

export const BusyIndicator = forwardRef(({ testId, show }: IBusyIndicator, ref: ForwardedRef<HTMLDivElement>) => {
  return (
    <Element
      data-testid={testId || `busy-indicator`}
      ref={ref}
      as="div"
      style={{
        display: 'none'
      }}
      css={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
      }}
    >
      <Spinner size="large" />
    </Element>
  );
});
BusyIndicator.displayName = 'BusyIndicator';
export default BusyIndicator;