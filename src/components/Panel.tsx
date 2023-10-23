

import React from 'react';
import { Element, Stack, Text } from 'react-ui';

interface IPanelProps extends JSX.ElementChildrenAttribute {
  title?: string;
}

export const Panel = ({ title, children }: IPanelProps) => {
  return (
    <Element as="details" className="panel">
      <Element as="summary" className="panel-header">
        <Text size={3}><b>{title}</b></Text>
      </Element>
      <Stack direction="vertical" className="panel-content">{children}</Stack>
    </Element>
  );
};
export default Panel;