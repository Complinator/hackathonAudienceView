import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import { styled } from '@mui/system';

const primaryColor = '#4A90E2';
const secondaryColor = '#F0F4F8';

const AboutContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(5, 2),
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: secondaryColor,
}));

const AboutPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(4),
  backgroundColor: '#FFFFFF',
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
}));

export default function About() {
  return (
    <AboutContainer maxWidth="md">
      <Typography variant="h2" fontWeight="bold" color={primaryColor} gutterBottom>
        About DermIA
      </Typography>
      <AboutPaper elevation={3}>
        <Typography variant="h5" gutterBottom>
          Our Mission
        </Typography>
        <Typography variant="body1" paragraph>
          At DermIA, we're committed to revolutionizing dermatological care through advanced AI technology. Our goal is to make professional-grade skin analysis accessible to everyone, anytime, anywhere.
        </Typography>
        <Typography variant="h5" gutterBottom>
          How It Works
        </Typography>
        <Typography variant="body1" paragraph>
          Using state-of-the-art machine learning algorithms, DermIA analyzes images of skin conditions to provide quick, accurate assessments. While not a substitute for professional medical advice, our AI offers a first step in understanding your skin health.
        </Typography>
        <Typography variant="h5" gutterBottom>
          Our Team
        </Typography>
        <Typography variant="body1">
          DermIA is brought to you by a passionate team of dermatologists, software engineers, and AI specialists. Together, we're working to bridge the gap between technology and skincare, making expert knowledge more accessible than ever before.
        </Typography>
      </AboutPaper>
    </AboutContainer>
  );
}