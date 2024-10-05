import React from 'react';
import { Paper, Typography, FormGroup, FormControlLabel, Checkbox, Select, MenuItem } from '@mui/material';

export default function ProductFilters() {
  return (
    <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6" gutterBottom>
        Filtros de Productos
      </Typography>
      <FormGroup>
        <FormControlLabel control={<Checkbox />} label="Cruelty Free" />
        <FormControlLabel control={<Checkbox />} label="Ingredientes Naturales" />
        <FormControlLabel control={<Checkbox />} label="Sin Perfume" />
      </FormGroup>
      <Select
        fullWidth
        value=""
        displayEmpty
        inputProps={{ 'aria-label': 'Without label' }}
      >
        <MenuItem value="">
          <em>Selecciona una categoría</em>
        </MenuItem>
        <MenuItem value="limpiadores">Limpiadores</MenuItem>
        <MenuItem value="hidratantes">Hidratantes</MenuItem>
        <MenuItem value="protectoresSolares">Protectores Solares</MenuItem>
      </Select>
    </Paper>
  );
}