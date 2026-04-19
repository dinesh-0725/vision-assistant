// // import { useEffect, useCallback } from 'react';
// // import { voiceService } from '../services/voiceService';

// // export const useVoiceCommands = () => {
// //   const registerCommands = useCallback((commandMap) => {
// //     Object.entries(commandMap).forEach(([pattern, handler]) => {
// //       voiceService.registerCommand(pattern, handler);
// //     });
// //   }, []);

// //   const startListening = useCallback(() => {
// //     voiceService.startListening();
// //   }, []);

// //   const stopListening = useCallback(() => {
// //     voiceService.stopListening();
// //   }, []);

// //   const speak = useCallback((text) => {
// //     voiceService.speak(text);
// //   }, []);

// //   const setOnResult = useCallback((callback) => {
// //     voiceService.onResultCallback = callback;
// //   }, []);

// //   // Cleanup on unmount
// //   useEffect(() => {
// //     return () => {
// //       voiceService.stopListening();
// //     };
// //   }, []);

// //   return {
// //     registerCommands,
// //     startListening,
// //     stopListening,
// //     speak,
// //     setOnResult,
// //     isListening: voiceService.isListening
// //   };
// // };


// // src/hooks/useVoiceCommands.js - UPDATED
// import { useEffect, useCallback, useState } from 'react';
// import { voiceService } from '../services/voiceService';

// export const useVoiceCommands = () => {
//   const [isListening, setIsListening] = useState(false);
//   const [lastCommand, setLastCommand] = useState('');

//   // Listen to voice service state changes
//   useEffect(() => {
//     const checkListening = () => {
//       setIsListening(voiceService.isListening);
//     };
    
//     // Check initially
//     checkListening();
    
//     // Check periodically (since voiceService doesn't emit events)
//     const interval = setInterval(checkListening, 1000);
    
//     return () => clearInterval(interval);
//   }, []);

//   const registerCommands = useCallback((commandMap) => {
//     Object.entries(commandMap).forEach(([pattern, handler]) => {
//       voiceService.registerCommand(pattern.toLowerCase(), handler);
//     });
//   }, []);

//   const startListening = useCallback(() => {
//     voiceService.startListening();
//     setIsListening(true);
//   }, []);

//   const stopListening = useCallback(() => {
//     voiceService.stopListening();
//     setIsListening(false);
//   }, []);

//   const speak = useCallback((text) => {
//     voiceService.speak(text);
//   }, []);

//   const setOnResult = useCallback((callback) => {
//     voiceService.onResultCallback = (transcript) => {
//       setLastCommand(transcript);
//       if (callback) callback(transcript);
//     };
//   }, []);

//   const clearCommands = useCallback(() => {
//     voiceService.clearCommands();
//   }, []);

//   const getLastTranscript = useCallback(() => {
//     return voiceService.getLastTranscript();
//   }, []);

//   // Cleanup on unmount
//   useEffect(() => {
//     return () => {
//       voiceService.stopListening();
//     };
//   }, []);

//   return {
//     // Core functions
//     registerCommands,
//     startListening,
//     stopListening,
//     speak,
//     setOnResult,
//     clearCommands,
    
//     // State
//     isListening,
//     lastCommand,
//     getLastTranscript,
    
//     // Utility
//     isAvailable: voiceService.isAvailable(),
//     setLanguage: voiceService.setLanguage.bind(voiceService),
    
//     // Test function
//     testCommand: (commandText) => {
//       console.log(`Testing command: "${commandText}"`);
//       if (voiceService.processCommand) {
//         voiceService.processCommand(commandText);
//       }
//     }
//   };
// };


// src/hooks/useVoiceCommands.js - FIXED
import { useEffect, useCallback, useState } from 'react';
import { voiceService } from '../services/voiceService';

export const useVoiceCommands = () => {
  const [isListening, setIsListening] = useState(voiceService.isListening);
  const [lastCommand, setLastCommand] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setIsListening(voiceService.isListening);
    }, 500);
    
    return () => clearInterval(interval);
  }, []);

  const registerCommands = useCallback((commandMap) => {
    Object.entries(commandMap).forEach(([pattern, handler]) => {
      voiceService.registerCommand(pattern.toLowerCase(), handler);
    });
  }, []);

  const startListening = useCallback(() => {
    voiceService.startListening();
    setIsListening(true);
  }, []);

  const stopListening = useCallback(() => {
    voiceService.stopListening();
    setIsListening(false);
  }, []);

  const speak = useCallback((text, options) => {
    voiceService.speak(text, options);
  }, []);

  const clearCommands = useCallback(() => {
    voiceService.clearCommands();
  }, []);

  const setOnResult = useCallback((callback) => {
    voiceService.onResultCallback = callback;
  }, []);

  return {
    registerCommands,
    startListening,
    stopListening,
    speak,
    clearCommands,
    setOnResult,
    isListening,
    lastCommand,
    isAvailable: voiceService.isAvailable(),
    getLastTranscript: () => voiceService.getLastTranscript(),
    setLanguage: (lang) => voiceService.setLanguage(lang) // Fixed this line
  };
};