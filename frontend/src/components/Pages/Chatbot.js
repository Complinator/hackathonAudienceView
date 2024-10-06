import React, { useState, useRef, useEffect, useContext } from 'react';
import { Box, Typography, Button, Container, Paper, useMediaQuery, TextField, IconButton, Dialog, DialogContent, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';
import { useTheme } from '@mui/material/styles';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import SendIcon from '@mui/icons-material/Send';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { SessionContext } from '../../context/SessionContext';
import app from '../../firebase/configuration';
import { getFunctions, httpsCallable } from "firebase/functions";

const primaryColor = '#4A90E2';
const secondaryColor = '#F0F4F8';
const accentColor = '#FF6B6B';

const ChatbotContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(5, 2),
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: secondaryColor,
}));

const ChatArea = styled(Paper)(({ theme }) => ({
  flexGrow: 1,
  overflowY: 'auto',
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  backgroundColor: '#FFFFFF',
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
}));

const ImageUploadArea = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(1, 3),
  transition: 'all 0.3s ease-in-out',
  backgroundColor: primaryColor,
  color: '#FFFFFF',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
}));

const MessageInput = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.shape.borderRadius,
    '&.Mui-focused fieldset': {
      borderColor: primaryColor,
    },
  },
}));

const MessageBubble = styled(Box)(({ theme, sender }) => ({
  backgroundColor: sender === 'user' ? primaryColor : accentColor,
  color: '#FFFFFF',
  borderRadius: '18px',
  padding: theme.spacing(1, 2),
  maxWidth: '70%',
  wordWrap: 'break-word',
  marginBottom: theme.spacing(1),
  alignSelf: sender === 'user' ? 'flex-end' : 'flex-start',
  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
  animation: 'fadeIn 0.5s ease-out',
  '@keyframes fadeIn': {
    '0%': { opacity: 0, transform: 'translateY(10px)' },
    '100%': { opacity: 1, transform: 'translateY(0)' },
  },
}));

const CameraDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const AnalyzingMessage = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

const AnimatedDots = styled('span')({
  '&::after': {
    content: '"."',
    animation: 'dots 1s steps(5, end) infinite',
  },
  '@keyframes dots': {
    '0%, 20%': { color: 'rgba(0,0,0,0)' },
    '40%': { color: 'rgba(0,0,0,1)' },
    '60%': { color: 'rgba(0,0,0,1)' },
    '80%, 100%': { color: 'rgba(0,0,0,0)' },
  },
});

const functions = getFunctions(app);

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [openCamera, setOpenCamera] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const chatEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const sessionId = useContext(SessionContext);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [analysisStage, setAnalysisStage] = useState(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      addImageMessage(file);
    }
  };

  const handleCameraCapture = () => {
    setOpenCamera(true);
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      })
      .catch(err => {
        console.error("Error accessing camera:", err);
        alert("Unable to access the camera. Please make sure you've granted the necessary permissions.");
      });
  };

  const captureImage = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    canvas.toBlob((blob) => {
      const file = new File([blob], "camera_capture.jpg", { type: "image/jpeg" });
      setCapturedImage(file);
    }, 'image/jpeg');
  };

  const addCapturedImage = () => {
    if (capturedImage) {
      addImageMessage(capturedImage);
      setOpenCamera(false);
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
    }
  };

  const addImageMessage = (file) => {
    const imageUrl = URL.createObjectURL(file);
    setMessages(prev => [...prev, { type: 'image', content: imageUrl, sender: 'user' }]);
    handleAnalysis(file);
  };

  const handleAnalysis = async (file) => {
    setIsAnalyzing(true);
    setAnalysisStage('uploading');
    setMessages(prev => [...prev, { type: 'text', content: "Analyzing your image...", sender: 'bot' }]);

    const storage = getStorage();
    const storageRef = ref(storage, `images/${sessionId}`);

    try {
      await uploadBytes(storageRef, file);
      console.log('Image uploaded:', storageRef.fullPath);

      setAnalysisStage('processing');
      const analyzeImage = httpsCallable(functions, 'analyzeSkinCondition');
      const result = await analyzeImage({ ref: storageRef.fullPath });

      setAnalysisStage('complete');
      setMessages(prev => [...prev, { type: 'text', content: "Analysis complete. Here are the results:", sender: 'bot' }]);
      
      // Format the analysis results
      const formattedResult = formatAnalysisResults(result.data);
      setMessages(prev => [...prev, { type: 'text', content: formattedResult, sender: 'bot' }]);

      setIsAnalyzing(false);
      setAnalysisStage(null);
    } catch (error) {
      console.error('Error during analysis:', error);
      setMessages(prev => [...prev, { type: 'text', content: "An error occurred during analysis. Please try again.", sender: 'bot' }]);
      setIsAnalyzing(false);
      setAnalysisStage(null);
    }
  };

  const formatAnalysisResults = (data) => {
    // This function should format the analysis results in a user-friendly way
    // You'll need to adjust this based on the actual structure of your analysis results
    let formattedResult = "Based on the image analysis:\n\n";
    
    if (data.conditions) {
      formattedResult += "Detected conditions:\n";
      data.conditions.forEach(condition => {
        formattedResult += `- ${condition.name}: ${(condition.probability * 100).toFixed(2)}%\n`;
      });
    }
    
    if (data.recommendations) {
      formattedResult += "\nRecommendations:\n";
      data.recommendations.forEach(rec => {
        formattedResult += `- ${rec}\n`;
      });
    }
    
    formattedResult += "\nPlease note that this analysis is not a substitute for professional medical advice. Always consult with a dermatologist for accurate diagnosis and treatment.";
    
    return formattedResult;
  };

  const renderAnalyzingMessage = () => {
    let message = "Analyzing";
    switch (analysisStage) {
      case 'uploading':
        message = "Uploading image";
        break;
      case 'processing':
        message = "Processing image";
        break;
      case 'complete':
        return null;
      default:
        break;
    }
    return (
      <AnalyzingMessage>
        <CircularProgress size={20} />
        <Typography variant="body1">
          {message}<AnimatedDots>...</AnimatedDots>
        </Typography>
      </AnalyzingMessage>
    );
  };

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setMessages(prev => [...prev, { type: 'text', content: inputMessage, sender: 'user' }]);
      setInputMessage('');
      // Here you can add logic to process the user's message and generate a response
      setTimeout(() => {
        setMessages(prev => [...prev, { type: 'text', content: "Thank you for your message. How else can I assist you?", sender: 'bot' }]);
      }, 1000);
    }
  };

  return (
    <ChatbotContainer maxWidth="md">
      <Box textAlign="center" mb={3}>
        <Typography variant="h4" fontWeight="bold" color={primaryColor}>
          DermIA Chatbot
        </Typography>
      </Box>
      <ChatArea elevation={3}>
        <Box display="flex" flexDirection="column" height="400px" overflow="auto" p={2}>
          {messages.map((message, index) => (
            <MessageBubble key={index} sender={message.sender}>
              {message.type === 'text' ? (
                <Typography variant="body1">{message.content}</Typography>
              ) : (
                <img src={message.content} alt="User uploaded" style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '8px' }} />
              )}
            </MessageBubble>
          ))}
          {isAnalyzing && renderAnalyzingMessage()}
          <div ref={chatEndRef} />
        </Box>
      </ChatArea>
      <ImageUploadArea>
        <StyledButton
          variant="contained"
          component="label"
          startIcon={<FileUploadIcon />}
          fullWidth={isMobile}
          disabled={isAnalyzing}
        >
          Upload Image
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handleFileUpload}
            ref={fileInputRef}
          />
        </StyledButton>
        <StyledButton
          variant="contained"
          onClick={handleCameraCapture}
          startIcon={<CameraAltIcon />}
          fullWidth={isMobile}
          disabled={isAnalyzing}
        >
          Use Camera
        </StyledButton>
      </ImageUploadArea>
      <Box display="flex" alignItems="center">
        <MessageInput
          fullWidth
          variant="outlined"
          placeholder="Type your message here..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          disabled={isAnalyzing}
        />
        <IconButton
          onClick={handleSendMessage}
          disabled={isAnalyzing}
          sx={{
            ml: 1,
            bgcolor: primaryColor,
            color: '#FFFFFF',
            '&:hover': { bgcolor: theme.palette.primary.dark },
            '&:disabled': { bgcolor: theme.palette.grey[300] }
          }}
        >
          <SendIcon />
        </IconButton>
      </Box>
      <CameraDialog open={openCamera} onClose={() => setOpenCamera(false)}>
        <DialogContent>
          <video ref={videoRef} style={{ width: '100%', maxWidth: '500px' }} />
          <canvas ref={canvasRef} style={{ display: 'none' }} />
          <Box mt={2} display="flex" justifyContent="space-around" width="100%">
            <Button variant="contained" onClick={captureImage}>Capture</Button>
            <Button variant="contained" onClick={addCapturedImage} disabled={!capturedImage}>Add to Chat</Button>
          </Box>
        </DialogContent>
      </CameraDialog>
    </ChatbotContainer>
  );
}