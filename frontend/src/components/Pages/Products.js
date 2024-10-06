import React from 'react';
import { Container, Typography, Grid2, Card, CardContent, CardMedia, Button } from '@mui/material';
import { styled } from '@mui/system';

const primaryColor = '#4A90E2';
const secondaryColor = '#F0F4F8';

const ProductsContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(5, 2),
  minHeight: '100vh',
  backgroundColor: secondaryColor,
}));

const ProductCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
}));

const products = [
  { id: 1, name: 'Vich Norma Gel', price: '$20,833', image: '/path-to-image1.jpg' },
  { id: 2, name: 'Aloe Skincare Kit', price: '$27,490', image: '/path-to-image2.jpg' },
  { id: 3, name: 'Cera Facial Cream', price: '$14,990', image: '/path-to-image3.jpg' },
  { id: 4, name: 'Cera Lotion', price: '$10,990', image: '/path-to-image4.jpg' },
];

export default function Products() {
  return (
    <ProductsContainer maxWidth="lg">
      <Typography variant="h2" fontWeight="bold" color={primaryColor} gutterBottom>
        Our Products
      </Typography>
      <Grid2 container spacing={4}>
        {products.map((product) => (
          <Grid2 item key={product.id} xs={12} sm={6} md={4}>
            <ProductCard>
              <CardMedia
                component="img"
                height="140"
                image={product.image}
                alt={product.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.price}
                </Typography>
              </CardContent>
              <Button size="small" color="primary">
                Learn More
              </Button>
            </ProductCard>
          </Grid2>
        ))}
      </Grid2>
    </ProductsContainer>
  );
}