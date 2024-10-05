import React from 'react';
import { Paper, Typography, List, ListItem, ListItemText } from '@mui/material';

function Results({ results }) {
  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Resultados del Análisis
      </Typography>
      <List>
        {Object.entries(results).map(([key, value]) => (
          <ListItem key={key}>
            <ListItemText primary={key} secondary={value} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

export default Results;