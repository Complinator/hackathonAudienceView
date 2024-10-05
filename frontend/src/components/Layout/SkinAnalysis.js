import React, { useState } from 'react';
import { Camera } from 'lucide-react';

export default function SkinAnalysis({ onAnalysisComplete }) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      handleCloseDialog();
    }
  };

  const handleCameraCapture = () => {
    console.log("Camera capture initiated");
    // Implement camera capture logic here
    handleCloseDialog();
  };

  const handleAnalysis = async () => {
    if (!selectedImage) {
      alert("Please select an image first.");
      return;
    }
    setIsAnalyzing(true);
    // Simulate analysis
    setTimeout(() => {
      const mockResults = {
        sunDamage: 'moderate',
        rosacea: 'mild',
        acne: 'severe',
        skinType: 'oily'
      };
      onAnalysisComplete(mockResults);
      setIsAnalyzing(false);
    }, 3000);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Skin Analysis</h2>
      <p className="text-gray-600 mb-4">Upload a photo of your face for analysis</p>
      
      <div className="space-x-4 mb-4">
        <button 
          onClick={handleOpenDialog} 
          disabled={isAnalyzing}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
        >
          Select Image
        </button>
        <button 
          onClick={handleAnalysis} 
          disabled={isAnalyzing || !selectedImage}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
        >
          Analyze
        </button>
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

      {openDialog && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Select an Image</h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  Please select an image from your device or use the camera to take a photo for skin analysis.
                </p>
              </div>
              <div className="flex justify-between mt-4">
                <button 
                  className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  onClick={() => document.getElementById('fileInput').click()}
                >
                  Choose File
                </button>
                <input
                  id="fileInput"
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <button 
                  className="ml-2 px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300"
                  onClick={handleCameraCapture}
                >
                  <Camera className="inline-block mr-2 h-4 w-4" /> Use Camera
                </button>
              </div>
              <div className="items-center px-4 py-3">
                <button
                  id="ok-btn"
                  className="px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
                  onClick={handleCloseDialog}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}