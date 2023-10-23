import { Element, Heading, Text } from 'react-ui';
import { Layout, Panel } from '../components';
import pkg from '../../package.json';

const { description, version } = pkg;

export const About = (props: IAboutProps) => {

  return (
    <Layout
      testId='about'
      header={{
        hideInfoButton: true
      }}
    >
      <Heading
        data-testid="about-title"
        size={5}
      >About</Heading>

      <Element
        data-testid="home-logo"
        as="svg"
        style={{
          color: 'currentColor',
          width: '3rem',
          overflow: 'visible'
        }}
        viewBox="0 0 24 24"
      >
        <path fill="none" d="M0 0h24v24H0z"></path>
        <path d="M3 11h8V3H3v8zm2-6h4v4H5V5zM3 21h8v-8H3v8zm2-6h4v4H5v-4zm8-12v8h8V3h-8zm6 6h-4V5h4v4zm0 10h2v2h-2zm-6-6h2v2h-2zm2 2h2v2h-2zm-2 2h2v2h-2zm2 2h2v2h-2zm2-2h2v2h-2zm0-4h2v2h-2zm2 2h2v2h-2z"></path>
      </Element>

      <Text
        data-testid="description-text"
        as="p"
        align="center"
        size={3}
        css={{
          height: 'auto'
        }}
      >{description}</Text>

      <Text
        data-testid="version-text"
        as="p"
        align="center"
        size={3}
        css={{
          height: "auto"
        }}
      >Version {version}</Text>

      <Panel title='Privacy Notice'>
        <Heading size={1}>Privacy Policy for QR-Code-Reader</Heading>

        <Text as="p" size={1}>Effective Date: 10/20/2023</Text>

        <Text as="p" size={1}>
          At <b>QR-Code-Reader</b>, we value your privacy and are committed to protecting your personal information.
          This Privacy Policy outlines how we collect, use, and disclose information when you use our app.
          By accessing or using our app, you agree to the terms of this Privacy Policy.
        </Text>

        <Heading size={1}>Information We Collect</Heading>
        <Text as="p" size={1}>
          We do not collect any personally identifiable information (PII) from our users.
          We do not require you to create an account or provide any personal information when using our app.
        </Text>

        <Heading size={1}>Information Usage</Heading>
        <Text as="p" size={1}>
          Since we do not collect any personal information, we do not use it for any purpose.
          We do not engage in any data analysis, user tracking, or any other activities that may compromise your privacy.
        </Text>

        <Heading size={1}>Cookies and Tracking Technologies</Heading>
        <Text as="p" size={1}>
          We do not use cookies or any other tracking technologies on our app.
          Your browsing activities are not monitored or tracked by us.
        </Text>

        <Heading size={1}>Third-Party Services</Heading>
        <Text as="p" size={1}>
          We do not integrate any third-party services or applications that may collect your personal information or track your activities.
          We strive to keep our app completely independent and privacy-focused.
        </Text>

        <Heading size={1}>Data Security</Heading>
        <Text as="p" size={1}>
          Although we do not collect any personal information, we take reasonable measures to protect any non-personal information you may provide while using our app.
          We use industry-standard security protocols and practices to ensure the integrity and confidentiality of your data.
        </Text>

        <Heading size={1}>Children's Privacy</Heading>
        <Text as="p" size={1}>
          Our app is not intended for use by children under the age of 13. We do not knowingly collect any personal information from children.
          If you become aware that your child has provided us with personal information, please contact us immediately, and we will take steps to delete such information.
        </Text>

        <Heading size={1}>Changes to this Privacy Policy</Heading>
        <Text as="p" size={1}>
          We reserve the right to modify or update this Privacy Policy at any time.
          Any changes made will be effective immediately upon posting the revised Privacy Policy on our app.
          We encourage you to review this Privacy Policy periodically to stay informed about how we are protecting your privacy.</Text>

        {/* <Heading size={1}>Contact Us</Heading> */}
        {/* <Text as ="p" size={1}>If you have any questions or concerns regarding this Privacy Policy, please contact us at [Contact Email]. We will be happy to assist you.</Text> */}

        <Text as="p" size={1}>By using our web app, you acknowledge that you have read, understood, and agreed to the terms of this Privacy Policy.</Text>

        <Heading size={1}>Last Updated: 10/21/2023</Heading>
      </Panel>
    </Layout>
  );
};
export default About;