import React from 'react';
import { Grid2, Card, CardContent, CardMedia, Typography, Button } from '@mui/material';

function ProductList({ skinProblems, onProductSelect }) {
  // Aquí deberías obtener los productos recomendados basados en los problemas de piel
  const mockProducts = [
    { id: 1, name: 'Limpiador Facial', description: 'Para piel grasa', image: 'url-to-image' },
    { id: 2, name: 'Crema Hidratante', description: 'Para piel seca', image: 'url-to-image' },
    { id: 3, name: 'Protector Solar', description: 'Para prevenir daños solares', image: 'url-to-image' },
  ];

  return (
    <Grid2 container spacing={2}>
      {mockProducts.map((product) => (
        <Grid2 item xs={12} sm={6} md={4} key={product.id}>
          <Card>
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
                {product.description}
              </Typography>
              <Button size="small" onClick={() => onProductSelect(product)}>Añadir al carrito</Button>
            </CardContent>
          </Card>
        </Grid2>
      ))}
    </Grid2>
  );
}

export default ProductList;