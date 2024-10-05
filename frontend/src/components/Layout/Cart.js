import React from 'react';
import { Drawer, List, ListItem, ListItemText, Typography, Button } from '@mui/material';

function Cart({ selectedProducts }) {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(open);
  };

  return (
    <>
      <Button onClick={toggleDrawer(true)}>Ver Carrito</Button>
      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer(false)}
      >
        <List sx={{ width: 250 }}>
          <ListItem>
            <Typography variant="h6">Carrito de Compras</Typography>
          </ListItem>
          {selectedProducts.map((product) => (
            <ListItem key={product.id}>
              <ListItemText primary={product.name} secondary={`$${product.price}`} />
            </ListItem>
          ))}
          <ListItem>
            <Button variant="contained" fullWidth>Proceder al pago</Button>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}

export default Cart;