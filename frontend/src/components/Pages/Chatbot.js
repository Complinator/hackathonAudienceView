import React, { useState } from 'react';
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

// Definimos un color azul pastel claro
const pastelBlue = '#A7C7E7';

const ChatbotContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(5, 2),
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#F0F8FF', // Fondo azul muy claro para todo el contenedor
}));

const ChatArea = styled(Paper)(({ theme }) => ({
  flexGrow: 1,
  overflowY: 'auto',
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  backgroundColor: '#FFFFFF',
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
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
  backgroundColor: pastelBlue,
  color: '#000000',
  '&:hover': {
    backgroundColor: '#8EB3D9',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
}));

const MessageInput = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.shape.borderRadius,
    '&.Mui-focused fieldset': {
      borderColor: pastelBlue,
    },
  },
}));

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [image, setImage] = useState(null);
  const [inputMessage, setInputMessage] = useState('');
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
      // Aquí simularemos una respuesta del chatbot
      setTimeout(() => {
        setMessages(prev => [...prev, { text: "Gracias por tu mensaje. Estoy analizando la información.", sender: 'bot' }]);
      }, 1000);
    }
  };

  return (
    <ChatbotContainer maxWidth="md">
      <Box textAlign="center" mb={3}>
        <Typography variant="h4" fontWeight="bold">
          DermIA Chatbot
        </Typography>
      </Box>
      <ChatArea elevation={3}>
        <List>
          {messages.map((message, index) => (
            <React.Fragment key={index}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: message.sender === 'user' ? pastelBlue : '#FFB6C1' }}>
                    {message.sender === 'user' ? <PersonIcon /> : <SmartToyIcon />}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={message.sender === 'user' ? 'You' : 'DermIA'}
                  secondary={
                    <Typography
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {message.text}
                    </Typography>
                  }
                />
              </ListItem>
              {index < messages.length - 1 && <Divider variant="inset" component="li" />}
            </React.Fragment>
          ))}
        </List>
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
          Upload Image
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
          onKeyUp={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <IconButton 
          onClick={handleSendMessage} 
          sx={{ 
            ml: 1, 
            bgcolor: pastelBlue, 
            '&:hover': { 
              bgcolor: '#8EB3D9' 
            } 
          }}
        >
          <SendIcon />
        </IconButton>
      </Box>
    </ChatbotContainer>
  );
}