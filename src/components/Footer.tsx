import { Stack } from 'react-ui';
import { Copyright } from ".";

export function Footer(props: IFooterProps) {
  return (
    <Stack
      {...props}
      css={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0
      }}
    >
      <Copyright color={props.color} backgroundColor={props.backgroundColor} />
    </Stack>
  );
}
export default Footer;