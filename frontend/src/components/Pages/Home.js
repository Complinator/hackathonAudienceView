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
    backgroundColor: '#E6F7FF',
    animation: `${float} 12s infinite ease-in-out, ${pulse} 6s infinite ease-in-out`,
  },
  '& > div:nth-of-type(2)': {
    top: '70%',
    right: '15%',
    width: '120px',
    height: '120px',
    backgroundColor: '#FFF0F6',
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
    backgroundColor: '#E6FFFB',
    animation: `${float} 14s infinite ease-in-out, ${pulse} 7s infinite ease-in-out`,
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

export default function Home() {
  return (
    <Box position="relative" bgcolor="white" overflow="hidden">
      <BackgroundAnimation>
        <div />
        <div />
        <div />
        <div />
      </BackgroundAnimation>
      <Container maxWidth="md">
        <ContentWrapper>
          <Typography variant="h2" component="h1" gutterBottom color="primary">
            Dermatological Analysis in DermIA
          </Typography>
          <Typography variant="h5" paragraph color="text.secondary">
            Discover the future of skincare with our AI-powered dermatological analysis. 
            Get personalized insights and recommendations for healthier skin.
          </Typography>
          <Button
            component={Link}
            to="/analysis"
            variant="contained"
            color="primary"
            size="large"
            sx={{ 
              mt: 4,
              px: 4,
              py: 1.5,
              fontSize: '1.2rem',
              '&:hover': {
                transform: 'scale(1.05)',
                transition: 'transform 0.3s ease-in-out',
              },
            }}
          >
            Start Your Skin Journey
          </Button>
        </ContentWrapper>
      </Container>
    </Box>
  );
}