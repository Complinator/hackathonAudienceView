import React, { useState } from 'react';
import { Container, Toolbar, Typography, Grid2, Paper } from '@mui/material';
import SkinAnalysis from './components/Layout/SkinAnalysis';
import Results from './components/Layout/Results';
import ProductFilters from './components/Layout/ProductFilters';
import ProductList from './components/Layout/ProductList';
import Cart from './components/Layout/Cart';
import Navbar from './components/Layout/Navbar';

function App() {
  const [skinAnalysisResults, setSkinAnalysisResults] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);

  return (
    <>
      <Navbar position="static"></Navbar>
      <Container maxWidth="lg">
        <Grid2 container spacing={3}>
          <Grid2 item xs={12}>
            <Paper>
              <SkinAnalysis onAnalysisComplete={setSkinAnalysisResults} />
            </Paper>
          </Grid2>
          {skinAnalysisResults && (
            <>
              <Grid2 item xs={12} md={6}>
                <Results results={skinAnalysisResults} />
              </Grid2>
              <Grid2 item xs={12} md={6}>
                <ProductFilters />
                <ProductList 
                  skinProblems={skinAnalysisResults} 
                  onProductSelect={(product) => setSelectedProducts([...selectedProducts, product])}
                />
              </Grid2>
            </>
          )}
        </Grid2>
      </Container>
      <Cart selectedProducts={selectedProducts} />
    </>
  );
}

export default App;