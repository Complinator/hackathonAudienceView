import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, Paper, Tab, Tabs } from '@mui/material';
import { styled } from '@mui/system';

const primaryColor = '#4A90E2';
const secondaryColor = '#F0F4F8';

const LoginContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(5, 2),
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  backgroundSize: 'cover',
  backgroundAttachment: 'fixed',
}));

const LoginPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)',
  backdropFilter: 'blur(4px)',
  border: '1px solid rgba(255, 255, 255, 0.18)',
}));

const FormField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

export default function Login() {
  const [tab, setTab] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle login or signup logic here
    console.log(tab === 0 ? 'Login' : 'Signup', { email, password, name });
  };

  return (
    <LoginContainer maxWidth="sm">
      <LoginPaper elevation={3}>
        <Tabs value={tab} onChange={handleTabChange} centered>
          <Tab label="Login" />
          <Tab label="Sign Up" />
        </Tabs>
        <Box mt={3}>
          <form onSubmit={handleSubmit}>
            {tab === 1 && (
              <FormField
                fullWidth
                label="Name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            )}
            <FormField
              fullWidth
              label="Email"
              variant="outlined"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormField
              fullWidth
              label="Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              size="large"
            >
              {tab === 0 ? 'Login' : 'Sign Up'}
            </Button>
          </form>
        </Box>
      </LoginPaper>
    </LoginContainer>
  );
}