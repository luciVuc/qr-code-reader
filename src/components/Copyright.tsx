import React from 'react';
import { Link, Stack, Text } from 'react-ui';

export function Copyright({ color, backgroundColor }: ICopyrightProps) {
  return (
    <Stack
      align="center"
      justify="center"
      gap={2}
      css={{
        color,
        backgroundColor,
        margin: '1rem auto'
      }}
    >
      <Text as="label" size={1}>
        {'Copyright © '}
        <Link target="_blank" href="">
          QRCodeDecode
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Text>
    </Stack>
  );
}
export default Copyright;