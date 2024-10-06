import React, { useState } from 'react';
import { Container, Toolbar, Typography, Grid2, Paper } from '@mui/material';
import SkinAnalysis from './components/Layout/SkinAnalysis';
import Results from './components/Layout/Results';
import ProductFilters from './components/Layout/ProductFilters';
import ProductList from './components/Layout/ProductList';
import Cart from './components/Layout/Cart';
import Navbar from './components/Layout/Navbar';
import Home from './components/Pages/Home';
import Chatbot from './components/Pages/Chatbot';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Suspense } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  shape: {
    borderRadius: 8,
  },
});

export default function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Navbar />
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/Chatbot" element={<Chatbot />} />
        </Routes>
      </ThemeProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/analysis" element={<SkinAnalysis />} />
      </Routes>
    </>
  )
}