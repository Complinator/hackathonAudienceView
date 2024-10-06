import React, { useState, useContext, useRef } from 'react';
import { Button } from '@mui/material';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { SessionContext } from '../../context/SessionContext';
import app from '../../firebase/configuration';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { Camera } from 'lucide-react';

const functions = getFunctions(app);

export default function SkinAnalysis({ onAnalysisComplete }) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { sessionId } = useContext(SessionContext); // Ensure sessionId is obtained correctly
  const [analysisResult, setAnalysisResult] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const sendImageToAnalysis = async (imageRef) => {
    const analyzeImage = httpsCallable(functions, 'sendImageToAnalize'); // Updated function name
    try {
      const result = await analyzeImage({ ref: imageRef });
      console.log('Analysis result:', result.data);
      return result.data; // Return the data so it can be used in handleAnalysis
    } catch (error) {
      console.error('Error calling function:', error);
      throw error; // Re-throw the error to be caught in handleAnalysis
    }
  };

  const handleAnalysis = async () => {
    if (!selectedImage) {
      alert('Please select an image first.');
      return;
    }

    setIsAnalyzing(true);

    const storage = getStorage(app);
    const storageRef = ref(storage, `images/${sessionId}/${selectedImage.name}`); // Include image name

    try {
      // Upload the image to Firebase Storage
      await uploadBytes(storageRef, selectedImage);
      console.log('Image uploaded:', storageRef.fullPath);

      // Call the cloud function to analyze the image
      const analysisResponse = await sendImageToAnalysis(storageRef.fullPath);
      setAnalysisResult(analysisResponse);

    } catch (error) {
      console.error('Error during analysis:', error);
      alert('An error occurred during analysis. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleChooseFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleCameraCapture = () => {
    console.log('Camera capture initiated');
    // Implement camera capture logic here
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Skin Analysis</h2>
      <p className="text-gray-600 mb-4">Upload a photo of your face for analysis</p>

      <div className="space-x-4 mb-4">
        <Button
          onClick={handleChooseFile}
          disabled={isAnalyzing}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
        >
          Subir Imagen
        </Button>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        <Button
          variant="contained"
          onClick={handleAnalysis}
          disabled={isAnalyzing}
          sx={{ ml: 2 }}
        >
          {isAnalyzing ? 'Analyzing...' : 'Analyze'}
        </Button>
      </div>

      {isAnalyzing && (
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-4">
          <div className="bg-blue-600 h-2.5 rounded-full w-1/3"></div>
        </div>
      )}

      {selectedImage && (
        <div className="mt-4 bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4" role="alert">
          <p className="font-bold">Image selected</p>
          <p>{selectedImage.name}</p>
        </div>
      )}

      {analysisResult && (
        <div className="mt-4">
          <h3 className="text-xl font-bold mb-2">Analysis Result:</h3>
          <pre className="bg-gray-100 p-4 rounded">
            {JSON.stringify(analysisResult, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
