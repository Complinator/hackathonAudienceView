import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Button, 
  Typography, 
  Container, 
  Box 
} from '@mui/material';
import { styled, keyframes } from '@mui/system';

const float = keyframes`
  0% { transform: translate(0, 0); }
  25% { transform: translate(20px, -30px); }
  50% { transform: translate(-20px, -50px); }
  75% { transform: translate(-30px, -20px); }
  100% { transform: translate(0, 0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.2); opacity: 1; }
  100% { transform: scale(1); opacity: 0.5; }
`;

const BackgroundAnimation = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  overflow: 'hidden',
  '& > div': {
    position: 'absolute',
    borderRadius: '50%',
    opacity: 0.5,
  },
  '& > div:nth-of-type(1)': {
    top: '10%',
    left: '10%',
    width: '80px',
    height: '80px',
    backgroundColor: '#C6DEF1',
    animation: `${float} 12s infinite ease-in-out, ${pulse} 6s infinite ease-in-out`,
  },
  '& > div:nth-of-type(2)': {
    top: '70%',
    right: '15%',
    width: '120px',
    height: '120px',
    backgroundColor: '#C9E4DE',
    animation: `${float} 15s infinite ease-in-out, ${pulse} 8s infinite ease-in-out`,
  },
  '& > div:nth-of-type(3)': {
    top: '40%',
    left: '25%',
    width: '100px',
    height: '100px',
    backgroundColor: '#F0F5FF',
    animation: `${float} 18s infinite ease-in-out, ${pulse} 9s infinite ease-in-out`,
  },
  '& > div:nth-of-type(4)': {
    bottom: '20%',
    left: '10%',
    width: '70px',
    height: '70px',
    backgroundColor: '#F2C6DE',
    animation: `${float} 14s infinite ease-in-out, ${pulse} 7s infinite ease-in-out`,
  },
  '& > div:nth-of-type(5)': {
    top: '10%',
    right: '10%',
    width: '90px',
    height: '90px',
    backgroundColor: '#F7D9C4',
    animation: `${float} 10s infinite ease-in-out, ${pulse} 5s infinite ease-in-out`,
  },
});

const ContentWrapper = styled(Box)({
  position: 'relative',
  zIndex: 1,
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
});

const StyledButton = styled(Button)({
  marginTop: '2rem',
  padding: '0.75rem 2rem',
  fontSize: '1.2rem',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
  },
});

export default function Home() {
  return (
    <Box position="relative" bgcolor="white" overflow="hidden">
      <BackgroundAnimation>
        <div />
        <div />
        <div />
        <div />
        <div />
      </BackgroundAnimation>
      <Container maxWidth="md">
        <ContentWrapper>
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom 
            color="primary"
            sx={{ 
              fontWeight: 'bold',
              textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            Dermatological Analysis in DermIA
          </Typography>
          <Typography 
            variant="h5" 
            paragraph 
            color="text.secondary"
            sx={{ maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}
          >
            Discover the future of skincare with our AI-powered dermatological analysis. 
            Get personalized insights and recommendations for healthier skin.
          </Typography>
          <StyledButton
            component={Link}
            to="/Chatbot"
            variant="contained"
            color="primary"
            size="large"
          >
            Start Your Skin Journey
          </StyledButton>
        </ContentWrapper>
      </Container>
    </Box>
  );
}