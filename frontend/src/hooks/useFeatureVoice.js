// // // // // // src/hooks/useFeatureVoice.js
// // // // // import { useEffect } from 'react';
// // // // // import { featureVoiceService } from '../services/featureVoiceService';

// // // // // /**
// // // // //  * Simple hook for feature voice commands
// // // // //  * Automatically activates/deactivates when component mounts/unmounts
// // // // //  */
// // // // // export const useFeatureVoice = (featureName, commands = {}) => {
// // // // //   useEffect(() => {
// // // // //     // Activate feature voice when component mounts
// // // // //     featureVoiceService.activateFeature(featureName, commands);
    
// // // // //     // Deactivate when component unmounts
// // // // //     return () => {
// // // // //       featureVoiceService.deactivateFeature();
// // // // //     };
// // // // //   }, [featureName, commands]); // Re-run if featureName or commands change
  
// // // // //   // Return utility functions
// // // // //   return {
// // // // //     speak: (text) => featureVoiceService.speak(text)
// // // // //   };
// // // // // };


// // // // // src/hooks/useFeatureVoice.js - UPDATED
// // // // import { useEffect, useCallback, useRef } from 'react';
// // // // import { featureVoiceService } from '../services/featureVoiceService';

// // // // /**
// // // //  * Hook for adding voice control to individual features
// // // //  * Works independently from global voice assistant
// // // //  */
// // // // export const useFeatureVoice = (featureName, commands = {}, options = {}) => {
// // // //   const isInitialized = useRef(false);
// // // //   const commandsRef = useRef(commands);
  
// // // //   // Update commands ref when commands change
// // // //   useEffect(() => {
// // // //     commandsRef.current = commands;
// // // //   }, [commands]);

// // // //   // Initialize feature voice
// // // //   const initVoice = useCallback((customCommands = {}, customOptions = {}) => {
// // // //     if (isInitialized.current) {
// // // //       featureVoiceService.deactivateFeature();
// // // //     }
    
// // // //     const mergedCommands = { ...commandsRef.current, ...customCommands };
// // // //     const mergedOptions = { ...options, ...customOptions };
    
// // // //     featureVoiceService.activateFeature(
// // // //       featureName,
// // // //       mergedCommands,
// // // //       mergedOptions
// // // //     );
    
// // // //     isInitialized.current = true;
    
// // // //     console.log(`✅ Voice initialized for ${featureName}`);
// // // //     console.log(`📋 Available commands:`, Object.keys(mergedCommands));
    
// // // //     // Speak welcome message if enabled
// // // //     if (mergedOptions.welcomeMessage !== false) {
// // // //       setTimeout(() => {
// // // //         featureVoiceService.speak(
// // // //           `${featureName} voice activated. Say 'help' for available commands.`
// // // //         );
// // // //       }, 500);
// // // //     }
// // // //   }, [featureName, options]);

// // // //   // Process voice input manually (for testing)
// // // //   const processCommand = useCallback((transcript) => {
// // // //     const command = transcript.toLowerCase().trim();
// // // //     console.log(`🔄 Processing command manually: "${command}"`);
    
// // // //     // Test if command would be handled
// // // //     const testResult = featureVoiceService.testCommand(command);
// // // //     if (testResult.handled) {
// // // //       console.log(`✅ Command would be handled:`, testResult);
// // // //       return true;
// // // //     }
    
// // // //     console.log(`❌ Command would NOT be handled: "${command}"`);
// // // //     return false;
// // // //   }, []);

// // // //   // Speak feedback
// // // //   const speak = useCallback((text, speechOptions = {}) => {
// // // //     featureVoiceService.speak(text);
// // // //   }, []);

// // // //   // Add command dynamically
// // // //   const addCommand = useCallback((pattern, handler) => {
// // // //     if (isInitialized.current && featureVoiceService.featureCommands) {
// // // //       featureVoiceService.featureCommands.set(pattern.toLowerCase(), handler);
// // // //       console.log(`➕ Added command: "${pattern}"`);
// // // //     }
// // // //   }, []);

// // // //   // Remove command
// // // //   const removeCommand = useCallback((pattern) => {
// // // //     if (isInitialized.current && featureVoiceService.featureCommands) {
// // // //       featureVoiceService.featureCommands.delete(pattern.toLowerCase());
// // // //       console.log(`➖ Removed command: "${pattern}"`);
// // // //     }
// // // //   }, []);

// // // //   // Get current commands
// // // //   const getCommands = useCallback(() => {
// // // //     if (featureVoiceService.featureCommands) {
// // // //       return Array.from(featureVoiceService.featureCommands.keys());
// // // //     }
// // // //     return [];
// // // //   }, []);

// // // //   // Activate voice control
// // // //   const activate = useCallback(() => {
// // // //     if (!isInitialized.current) {
// // // //       initVoice();
// // // //     }
// // // //     console.log(`🎤 ${featureName} voice activated`);
// // // //   }, [featureName, initVoice]);

// // // //   // Deactivate voice control
// // // //   const deactivate = useCallback(() => {
// // // //     if (isInitialized.current) {
// // // //       featureVoiceService.deactivateFeature();
// // // //       isInitialized.current = false;
// // // //       console.log(`🔇 ${featureName} voice deactivated`);
// // // //     }
// // // //   }, [featureName]);

// // // //   // Cleanup on unmount
// // // //   useEffect(() => {
// // // //     // Auto-initialize if autoActivate is true (default)
// // // //     const shouldAutoActivate = options.autoActivate !== false;
    
// // // //     if (shouldAutoActivate && !isInitialized.current) {
// // // //       initVoice();
// // // //     }
    
// // // //     return () => {
// // // //       if (isInitialized.current) {
// // // //         featureVoiceService.deactivateFeature();
// // // //         isInitialized.current = false;
// // // //       }
// // // //     };
// // // //   }, [initVoice, options.autoActivate]);

// // // //   return {
// // // //     // Core functions
// // // //     initVoice,
// // // //     activate,
// // // //     deactivate,
// // // //     speak,
// // // //     processCommand,
    
// // // //     // Command management
// // // //     addCommand,
// // // //     removeCommand,
// // // //     getCommands,
    
// // // //     // State
// // // //     isActive: isInitialized.current,
    
// // // //     // Utility
// // // //     testCommand: processCommand,
    
// // // //     // Quick actions
// // // //     help: () => speak(`Available commands for ${featureName}: ${getCommands().join(', ')}`)
// // // //   };
// // // // };


// // // // src/hooks/useFeatureVoice.js - COMPLETE FIXED VERSION
// // // import { useEffect, useCallback, useRef, useMemo } from 'react';
// // // import { featureVoiceService } from '../services/featureVoiceService';

// // // /**
// // //  * Hook for adding voice control to individual features
// // //  */
// // // export const useFeatureVoice = (featureName, commands = {}, options = {}) => {
// // //   const isInitialized = useRef(false);
// // //   const commandsRef = useRef(commands);
  
// // //   // Memoize commands to prevent unnecessary re-initialization
// // //   const memoizedCommands = useMemo(() => commands, [JSON.stringify(commands)]);
  
// // //   // Update commands ref
// // //   useEffect(() => {
// // //     commandsRef.current = memoizedCommands;
// // //   }, [memoizedCommands]);

// // //   // Initialize feature voice
// // //   const initVoice = useCallback((customCommands = {}, customOptions = {}) => {
// // //     if (isInitialized.current) {
// // //       featureVoiceService.deactivateFeature();
// // //     }
    
// // //     const mergedCommands = { ...commandsRef.current, ...customCommands };
// // //     const mergedOptions = { ...options, ...customOptions };
    
// // //     featureVoiceService.activateFeature(
// // //       featureName,
// // //       mergedCommands,
// // //       mergedOptions
// // //     );
    
// // //     isInitialized.current = true;
    
// // //     console.log(`✅ Voice initialized for ${featureName}`);
// // //     console.log(`📋 Available commands:`, Object.keys(mergedCommands));
    
// // //     // Welcome message
// // //     if (mergedOptions.welcomeMessage !== false) {
// // //       setTimeout(() => {
// // //         featureVoiceService.speak(
// // //           `${featureName} is ready. Say "help" for commands or "go to dashboard" to return.`
// // //         );
// // //       }, 800);
// // //     }
    
// // //     return () => {
// // //       if (isInitialized.current) {
// // //         featureVoiceService.deactivateFeature();
// // //         isInitialized.current = false;
// // //       }
// // //     };
// // //   }, [featureName, options]);

// // //   // Process command manually (for testing)
// // //   const processCommand = useCallback((transcript) => {
// // //     const command = transcript.toLowerCase().trim();
// // //     console.log(`🔄 Processing: "${command}"`);
    
// // //     const testResult = featureVoiceService.testCommand(command);
// // //     if (testResult.handled) {
// // //       console.log(`✅ Would be handled as:`, testResult);
// // //       return testResult;
// // //     }
    
// // //     console.log(`❌ Would NOT be handled: "${command}"`);
// // //     return testResult;
// // //   }, []);

// // //   // Speak function
// // //   const speak = useCallback((text, speechOptions = {}) => {
// // //     featureVoiceService.speak(text, speechOptions);
// // //   }, []);

// // //   // Add command
// // //   const addCommand = useCallback((pattern, handler) => {
// // //     if (isInitialized.current) {
// // //       const lowerPattern = pattern.toLowerCase();
// // //       featureVoiceService.featureCommands.set(lowerPattern, handler);
// // //       console.log(`➕ Added command: "${pattern}"`);
// // //     }
// // //   }, []);

// // //   // Remove command
// // //   const removeCommand = useCallback((pattern) => {
// // //     if (isInitialized.current) {
// // //       const lowerPattern = pattern.toLowerCase();
// // //       featureVoiceService.featureCommands.delete(lowerPattern);
// // //       console.log(`➖ Removed command: "${pattern}"`);
// // //     }
// // //   }, []);

// // //   // Get commands
// // //   const getCommands = useCallback(() => {
// // //     if (featureVoiceService.featureCommands) {
// // //       return Array.from(featureVoiceService.featureCommands.keys());
// // //     }
// // //     return [];
// // //   }, []);

// // //   // Activate
// // //   const activate = useCallback(() => {
// // //     if (!isInitialized.current) {
// // //       initVoice();
// // //     } else {
// // //       console.log(`🎤 ${featureName} voice already active`);
// // //     }
// // //   }, [featureName, initVoice]);

// // //   // Deactivate
// // //   const deactivate = useCallback(() => {
// // //     if (isInitialized.current) {
// // //       featureVoiceService.deactivateFeature();
// // //       isInitialized.current = false;
// // //       console.log(`🔇 ${featureName} voice deactivated`);
// // //     }
// // //   }, [featureName]);

// // //   // Test a command
// // //   const testCommand = useCallback((commandText) => {
// // //     return processCommand(commandText);
// // //   }, [processCommand]);

// // //   // Auto-initialize on mount
// // //   useEffect(() => {
// // //     const shouldAutoActivate = options.autoActivate !== false;
    
// // //     if (shouldAutoActivate && !isInitialized.current) {
// // //       const cleanup = initVoice();
// // //       return cleanup;
// // //     }
    
// // //     return () => {
// // //       if (isInitialized.current) {
// // //         featureVoiceService.deactivateFeature();
// // //         isInitialized.current = false;
// // //       }
// // //     };
// // //   }, [initVoice, options.autoActivate]);

// // //   return {
// // //     // Core
// // //     initVoice,
// // //     activate,
// // //     deactivate,
// // //     speak,
    
// // //     // Command handling
// // //     processCommand,
// // //     addCommand,
// // //     removeCommand,
// // //     getCommands,
// // //     testCommand,
    
// // //     // State
// // //     isActive: isInitialized.current,
    
// // //     // Quick actions
// // //     help: () => {
// // //       const featureCmds = getCommands();
// // //       const helpText = featureCmds.length > 0 
// // //         ? `For ${featureName}, say: ${featureCmds.slice(0, 5).join(', ')}. Or say "go to dashboard", "logout", or "help".`
// // //         : `Say "go to dashboard", "logout", or "help".`;
// // //       speak(helpText);
// // //     }
// // //   };
// // // };

// // // src/hooks/useFeatureVoice.js - SIMPLIFIED VERSION
// // import { useEffect, useCallback, useRef } from 'react';
// // import { featureVoiceService } from '../services/featureVoiceService';

// // export const useFeatureVoice = (featureName, commands = {}, options = {}) => {
// //   const isInitialized = useRef(false);

// //   // Initialize feature voice
// //   const initVoice = useCallback(() => {
// //     if (isInitialized.current) {
// //       return;
// //     }

// //     featureVoiceService.activateFeature(featureName, commands, options);
// //     isInitialized.current = true;
    
// //     console.log(`✅ Voice initialized for ${featureName}`);
    
// //     // Welcome message
// //     if (options.welcomeMessage !== false) {
// //       setTimeout(() => {
// //         featureVoiceService.speak(
// //           `${featureName} voice commands activated. Say "help" for available commands.`
// //         );
// //       }, 1000);
// //     }
// //   }, [featureName, commands, options]);

// //   // Deactivate feature voice
// //   const deactivate = useCallback(() => {
// //     if (isInitialized.current) {
// //       featureVoiceService.deactivateFeature();
// //       isInitialized.current = false;
// //     }
// //   }, []);

// //   // Speak function
// //   const speak = useCallback((text, speechOptions = {}) => {
// //     featureVoiceService.speak(text, speechOptions);
// //   }, []);

// //   // Auto-initialize on mount
// //   useEffect(() => {
// //     if (options.autoActivate !== false) {
// //       initVoice();
// //     }

// //     return () => {
// //       if (options.autoDeactivate !== false) {
// //         deactivate();
// //       }
// //     };
// //   }, [initVoice, deactivate, options.autoActivate, options.autoDeactivate]);

// //   return {
// //     initVoice,
// //     deactivate,
// //     speak,
// //     isActive: isInitialized.current,
    
// //     help: () => {
// //       const featureCmds = Object.keys(commands);
// //       const helpText = featureCmds.length > 0 
// //         ? `For ${featureName}, say: ${featureCmds.slice(0, 5).join(', ')}. Or say "go to dashboard" or "help".`
// //         : `Say "go to dashboard", "help", or "logout".`;
// //       speak(helpText);
// //     }
// //   };
// // };


// import { useEffect, useCallback, useRef, useMemo } from 'react';
// import { featureVoiceService } from '../services/featureVoiceService';
// import { navigationVoiceCommands } from '../voice-commands';

// export const useFeatureVoice = (featureName, featureCommands = {}, options = {}) => {
//   const isInitialized = useRef(false);
  
//   // Merge navigation commands with feature-specific commands
//   const mergedCommands = useMemo(() => {
//     return { ...navigationVoiceCommands, ...featureCommands };
//   }, [featureCommands]);

//   const initVoice = useCallback(() => {
//     if (isInitialized.current) {
//       return;
//     }

//     featureVoiceService.activateFeature(featureName, mergedCommands, options);
//     isInitialized.current = true;
    
//     console.log(`✅ Voice initialized for ${featureName}`);
    
//     // Welcome message
//     if (options.welcomeMessage !== false) {
//       setTimeout(() => {
//         featureVoiceService.speak(
//           `${featureName} voice commands activated. Say "help" for available commands.`
//         );
//       }, 1000);
//     }
//   }, [featureName, mergedCommands, options]);

//   const deactivate = useCallback(() => {
//     if (isInitialized.current) {
//       featureVoiceService.deactivateFeature();
//       isInitialized.current = false;
//       console.log(`🔇 ${featureName} voice deactivated`);
//     }
//   }, [featureName]);

//   const speak = useCallback((text, speechOptions = {}) => {
//     featureVoiceService.speak(text, speechOptions);
//   }, []);

//   const addCommand = useCallback((pattern, handler) => {
//     if (isInitialized.current) {
//       featureVoiceService.addCommand(pattern, handler);
//     }
//   }, []);

//   const removeCommand = useCallback((pattern) => {
//     if (isInitialized.current) {
//       featureVoiceService.removeCommand(pattern);
//     }
//   }, []);

//   // Auto-initialize on mount
//   useEffect(() => {
//     if (options.autoActivate !== false) {
//       initVoice();
//     }

//     return () => {
//       if (options.autoDeactivate !== false) {
//         deactivate();
//       }
//     };
//   }, [initVoice, deactivate, options.autoActivate, options.autoDeactivate]);

//   return {
//     initVoice,
//     deactivate,
//     speak,
//     addCommand,
//     removeCommand,
//     isActive: isInitialized.current,
    
//     help: () => {
//       const featureCmds = Object.keys(featureCommands);
//       const helpText = featureCmds.length > 0 
//         ? `For ${featureName}, say: ${featureCmds.slice(0, 5).join(', ')}. Or say "go to dashboard" or "help".`
//         : `Say "go to dashboard", "help", or "logout".`;
//       speak(helpText);
//     }
//   };
// };


// src/hooks/useFeatureVoice.js - UPDATED
import { useEffect, useCallback, useRef } from 'react';
import { featureVoiceService } from '../services/featureVoiceService';

export const useFeatureVoice = (featureName, commands = {}, options = {}) => {
  const isInitialized = useRef(false);

  const initVoice = useCallback(() => {
    if (isInitialized.current) {
      console.log(`⚠️ [useFeatureVoice] ${featureName} already initialized`);
      return;
    }

    console.log(`🎤 [useFeatureVoice] Initializing voice for ${featureName}`);
    featureVoiceService.activateFeature(featureName, commands, options);
    isInitialized.current = true;
    
    // Welcome message
    if (options.welcomeMessage !== false) {
      setTimeout(() => {
        featureVoiceService.speak(
          `${featureName} is ready. Say "help" for commands.`
        );
      }, 1000);
    }
  }, [featureName, commands, options]);

  const deactivate = useCallback(() => {
    if (isInitialized.current) {
      featureVoiceService.deactivateFeature();
      isInitialized.current = false;
      console.log(`🔇 [useFeatureVoice] ${featureName} deactivated`);
    }
  }, [featureName]);

  const speak = useCallback((text, speechOptions = {}) => {
    featureVoiceService.speak(text, speechOptions);
  }, []);

  // Auto-initialize on mount
  useEffect(() => {
    if (options.autoActivate !== false) {
      initVoice();
    }

    return () => {
      if (options.autoDeactivate !== false) {
        deactivate();
      }
    };
  }, [initVoice, deactivate, options.autoActivate, options.autoDeactivate]);

  return {
    initVoice,
    deactivate,
    speak,
    isActive: isInitialized.current,
    
    help: () => {
      const featureCmds = Object.keys(commands);
      const helpText = featureCmds.length > 0 
        ? `For ${featureName}, say: ${featureCmds.slice(0, 5).join(', ')}. Or say "go to dashboard".`
        : `Say "go to dashboard" or "help".`;
      speak(helpText);
    }
  };
};