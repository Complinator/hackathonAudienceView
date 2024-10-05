import React, { useState } from 'react';
import { Card, CardContent, Button, Typography, CircularProgress } from '@mui/material';

function SkinAnalysis({ onAnalysisComplete }) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalysis = async () => {
    setIsAnalyzing(true);
    // Aquí iría la lógica para analizar la imagen
    // Por ahora, simularemos un análisis con un timeout
    setTimeout(() => {
      const mockResults = {
        dañosSolares: 'moderado',
        rosacea: 'leve',
        espinillas: 'severo',
        tipoPiel: 'grasa'
      };
      onAnalysisComplete(mockResults);
      setIsAnalyzing(false);
    }, 3000);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Análisis de Piel
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Sube una foto de tu rostro para analizarla
        </Typography>
        <Button
          variant="contained"
          component="label"
          disabled={isAnalyzing}
        >
          Subir Imagen
          <input type="file" hidden accept="image/*" />
        </Button>
        <Button
          variant="contained"
          onClick={handleAnalysis}
          disabled={isAnalyzing}
          sx={{ ml: 2 }}
        >
          Analizar
        </Button>
        {isAnalyzing && <CircularProgress sx={{ mt: 2 }} />}
      </CardContent>
    </Card>
  );
}

export default SkinAnalysis;