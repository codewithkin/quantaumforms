import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
  Button,
  Img,
  Hr,
  Section,
} from '@react-email/components';
import * as React from 'react';

interface WaitlistWelcomeEmailProps {
  email: string;
}

export const WaitlistWelcomeEmail = ({
  email,
}: WaitlistWelcomeEmailProps) => {
  const previewText = "Welcome to QuantumForms Waitlist! 🎉";

  return (
    <Html>
      <Head>
        <title>Welcome to the Waitlist</title>
        <style>
          {`
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
            }
          `}
        </style>
      </Head>
      <Preview>{previewText}</Preview>
      <Body style={{ backgroundColor: '#f4f4f4', margin: '0', padding: '0' }}>
        <Container style={{ 
          maxWidth: '600px',
          margin: '20px auto',
          backgroundColor: '#ffffff',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)'
        }}>
          <Section style={{ textAlign: 'center' }}>
            <Img
              src="https://via.placeholder.com/150"
              alt="QuantumForms Logo"
              width="150"
              height="150"
            />
          </Section>
          
          <Heading style={{
            textAlign: 'center',
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#333',
            marginTop: '20px'
          }}>
            You're Officially On the List! 🎉
          </Heading>

          <Section style={{
            fontSize: '16px',
            color: '#555',
            lineHeight: '1.6',
            textAlign: 'center',
            padding: '20px'
          }}>
            <Text>Hey there,</Text>
            <Text>
              We're so excited to have you on board! You've just joined an exclusive group of early adopters who'll be the first to experience something truly awesome.
            </Text>
            <Text>
              We'll keep you posted on updates, launch details, and even some surprises along the way. Stay tuned!
            </Text>
            <Text>
              In the meantime, why not share the love? Invite your friends and move up the list! 🚀
            </Text>
            
            <Button
              href="https://quantumforms.app/invite"
              style={{
                display: 'inline-block',
                backgroundColor: '#7C3AED',
                background: 'linear-gradient(to right, #7C3AED, #F97316)',
                color: '#ffffff',
                padding: '12px 20px',
                fontSize: '16px',
                borderRadius: '5px',
                textDecoration: 'none',
                marginTop: '20px',
                textAlign: 'center'
              }}
            >
              Invite Friends
            </Button>
          </Section>

          <Hr style={{ borderTop: '1px solid #ddd', margin: '20px 0' }} />

          <Section style={{
            textAlign: 'center',
            fontSize: '12px',
            color: '#777',
            padding: '20px'
          }}>
            <Text>
              Follow me on{' '}
              <Link
                href="https://twitter.com/codewithkin"
                style={{ color: '#7C3AED' }}
              >
                Twitter
              </Link>
              {' '}for updates!
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default WaitlistWelcomeEmail;
