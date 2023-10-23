import { Stack } from 'react-ui';
import { Copyright } from ".";

export function Footer(props: IFooterProps) {
  return (
    <Stack
      {...props}
      css={{
        position: 'relative'
      }}
    >
      <Copyright color={props.color} backgroundColor={props.backgroundColor} />
    </Stack>
  );
}
export default Footer;