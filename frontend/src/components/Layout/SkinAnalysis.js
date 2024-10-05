import React, { useState, useContext } from 'react';
import { Card, CardContent, Button, Typography, CircularProgress } from '@mui/material';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { SessionContext } from '../../context/SessionContext';


function SkinAnalysis({ onAnalysisComplete }) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [image, setImage] = useState(null);
  const sessionId = useContext(SessionContext);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleAnalysis = async () => {
    if (!image) {
      alert('Please select an image first.');
      return;
    }

    setIsAnalyzing(true);

    const storage = getStorage();
    const storageRef = ref(storage, `images/${sessionId}/${image.name}`);

    try {
      // Upload the image to Firebase Storage
      await uploadBytes(storageRef, image);
      const imageUrl = await getDownloadURL(storageRef);
      console.log('Image uploaded:', imageUrl);
      // Simulate analysis with a timeout
      setTimeout(() => {
        const mockResults = {
          dañosSolares: 'moderado',
          rosacea: 'leve',
          espinillas: 'severo',
          tipoPiel: 'grasa',
          imageUrl: imageUrl // Include the image URL in the results
        };
        onAnalysisComplete(mockResults);
        setIsAnalyzing(false);
      }, 3000);
    } catch (error) {
      console.error('Error uploading image:', error);
      setIsAnalyzing(false);
    }
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
          <input type="file" hidden accept="image/*" onChange={handleImageChange} />
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