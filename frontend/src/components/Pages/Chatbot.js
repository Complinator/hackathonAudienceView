import React, { useState, useRef, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Container, 
  Paper, 
  useMediaQuery,
  TextField,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/system';
import { useTheme } from '@mui/material/styles';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';

// Definimos colores elegantes para una página farmacéutica de dermatología
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

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [image, setImage] = useState(null);
  const [inputMessage, setInputMessage] = useState('');
  const chatEndRef = useRef(null);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setImage(URL.createObjectURL(file));
  };

  const handleCameraCapture = () => {
    console.log('Captura de cámara no implementada');
  };

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setMessages([...messages, { text: inputMessage, sender: 'user' }]);
      setInputMessage('');
      // Simular una respuesta del chatbot
      setTimeout(() => {
        setMessages(prev => [...prev, { text: "Gracias por su consulta. Estoy analizando la información proporcionada.", sender: 'bot' }]);
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
              <Typography variant="body1">{message.text}</Typography>
            </MessageBubble>
          ))}
          <div ref={chatEndRef} />
        </Box>
        {image && (
          <Box mt={2} textAlign="center">
            <img src={image} alt="Uploaded" style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '8px' }} />
          </Box>
        )}
      </ChatArea>
      <ImageUploadArea>
        <StyledButton
          variant="contained"
          component="label"
          startIcon={<FileUploadIcon />}
          fullWidth={isMobile}
        >
          Subir Imagen
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handleFileUpload}
          />
        </StyledButton>
        <StyledButton
          variant="contained"
          onClick={handleCameraCapture}
          startIcon={<CameraAltIcon />}
          fullWidth={isMobile}
        >
          Usar Cámara
        </StyledButton>
      </ImageUploadArea>
      <Box display="flex" alignItems="center">
        <MessageInput
          fullWidth
          variant="outlined"
          placeholder="Escriba su mensaje aquí..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyUp={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <IconButton 
          onClick={handleSendMessage} 
          sx={{ 
            ml: 1, 
            bgcolor: primaryColor, 
            color: '#FFFFFF',
            '&:hover': { 
              bgcolor: theme.palette.primary.dark 
            } 
          }}
        >
          <SendIcon />
        </IconButton>
      </Box>
    </ChatbotContainer>
  );
}