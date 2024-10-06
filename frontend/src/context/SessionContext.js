// src/SessionContext.js
import React, { createContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { getFunctions, httpsCallable } from "firebase/functions";
import app from '../firebase/configuration';

export const SessionContext = createContext();
const functions = getFunctions(app);


const callOnRequestExample = async () => {
    const onRequestExample = httpsCallable(functions, 'on_request_example');
    try {
      
      console.log("check")
      const result = await onRequestExample();
      console.log(result.data); // "Hello world!"
    } catch (error) {
      console.error('Error calling function:', error);
    }
};

export const SessionProvider = ({ children }) => {
  const [sessionId, setSessionId] = useState('');

  useEffect(() => {
    // Generate a unique session ID
    const newSessionId = uuidv4();
    setSessionId(newSessionId);

    callOnRequestExample();
  }, []);



  return (
    <SessionContext.Provider value={sessionId}>
      {children}
    </SessionContext.Provider>
  );
};