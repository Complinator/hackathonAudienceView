import React, { useState } from 'react';
import { Container, Toolbar, Typography, Grid2, Paper } from '@mui/material';
import SkinAnalysis from './components/Layout/SkinAnalysis';
import Results from './components/Layout/Results';
import ProductFilters from './components/Layout/ProductFilters';
import ProductList from './components/Layout/ProductList';
import Cart from './components/Layout/Cart';
import Navbar from './components/Layout/Navbar';
import Home from './components/Pages/Home';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Suspense } from 'react';

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/Home" element={<Home />} />
      </Routes>
    </>
  )
}