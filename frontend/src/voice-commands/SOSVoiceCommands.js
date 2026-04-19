// // // src/voice-commands/SOSVoiceCommands.js
// // import { voiceService } from '../services/voiceService';

// // // Voice command vocabulary for SOS
// // export const SOS_VOICE_COMMANDS = {
// //   // Navigation commands
// //   "go back": "back",
// //   "go to dashboard": "dashboard",
// //   "logout": "logout",
// //   "sign out": "logout",
// //   "exit": "logout",
  
// //   // SOS actions
// //   "emergency": "sos",
// //   "sos": "sos",
// //   "help me": "sos",
// //   "send sos": "sos",
// //   "send emergency": "sos",
// //   "activate sos": "sos",
// //   "trigger emergency": "sos",
  
// //   // Alert type commands
// //   "medical emergency": "medical",
// //   "medical help": "medical",
// //   "i need medical": "medical",
// //   "doctor": "medical",
// //   "hospital": "medical",
// //   "ambulance": "medical",
  
// //   "safety emergency": "safety",
// //   "danger": "safety",
// //   "threat": "safety",
// //   "unsafe": "safety",
  
// //   "fire emergency": "fire",
// //   "fire": "fire",
// //   "burning": "fire",
// //   "smoke": "fire",
  
// //   "accident emergency": "accident",
// //   "car accident": "accident",
// //   "road accident": "accident",
// //   "crash": "accident",
  
// //   "lost emergency": "lost",
// //   "i am lost": "lost",
// //   "lost my way": "lost",
// //   "disoriented": "lost",
// //   "cant find way": "lost",
  
// //   "other emergency": "other",
// //   "different emergency": "other",
  
// //   // Location commands
// //   "get location": "get_location",
// //   "find me": "get_location",
// //   "where am i": "get_location",
// //   "my location": "get_location",
// //   "check location": "get_location",
  
// //   "start tracking": "start_tracking",
// //   "track location": "start_tracking",
// //   "live location": "start_tracking",
// //   "follow me": "start_tracking",
  
// //   "stop tracking": "stop_tracking",
// //   "stop location": "stop_tracking",
// //   "end tracking": "stop_tracking",
  
// //   // Message commands
// //   "set message": "set_message",
// //   "change message": "set_message",
// //   "update message": "set_message",
// //   "emergency message": "set_message",
  
// //   "reset message": "reset_message",
// //   "clear message": "reset_message",
// //   "default message": "reset_message",
  
// //   // Status commands
// //   "cancel emergency": "cancel",
// //   "abort sos": "cancel",
// //   "stop sos": "cancel",
// //   "dont send": "cancel",
  
// //   "clear status": "clear_status",
// //   "dismiss message": "clear_status",
// //   "clear error": "clear_error",
  
// //   // Help
// //   "help": "help",
// //   "what can i say": "help",
// //   "show commands": "help",
// //   "voice help": "help",
// //   "available commands": "help",
  
// //   // Testing
// //   "test location": "test_location",
// //   "test gps": "test_location",
// //   "check gps": "test_location",
  
// //   "check permission": "check_permission",
// //   "location permission": "check_permission",
// //   "enable location": "check_permission",
  
// //   // Natural language emergency commands
// //   "i need help": "sos",
// //   "im in danger": "sos",
// //   "please help": "sos",
// //   "someone help": "sos",
// //   "call for help": "sos",
// //   "alert emergency": "sos",
// //   "send alert": "sos",
// // };

// // // Dynamic patterns for SOS commands
// // export const SOS_DYNAMIC_PATTERNS = {
// //   // Custom message: "message i am in danger", "say i need ambulance"
// //   MESSAGE_COMMAND: /^(?:message|say|tell|alert)\s+(.+)$/i,
  
// //   // Location with reason: "lost near market", "accident on highway"
// //   LOCATION_REASON: /^(?:i am|im|we are|we're)\s+(lost|stuck|trapped|injured|hurt)\s+(.+)?$/i,
  
// //   // Time-based: "been here for 10 minutes", "waiting 5 minutes"
// //   TIME_BASED: /^(?:been|waiting|stuck)\s+(?:for|since)\s+(.+)$/i,
  
// //   // Emergency with details: "medical heart pain", "accident car crash"
// //   EMERGENCY_DETAILS: /^(medical|accident|fire|safety)\s+(.+)$/i,
  
// //   // Quick SOS: "sos now", "emergency immediately"
// //   QUICK_SOS: /^(sos|emergency|help)\s+(now|immediately|urgent|quick)$/i,
// // };

// // // Alert type descriptions
// // export const ALERT_TYPE_DESCRIPTIONS = {
// //   "sos": "General Emergency (SOS)",
// //   "medical": "Medical Emergency",
// //   "safety": "Safety Threat",
// //   "fire": "Fire Emergency",
// //   "accident": "Accident",
// //   "lost": "Lost/Disoriented",
// //   "other": "Other Emergency"
// // };

// // // Initialize SOS voice commands
// // export const initializeSOSCommands = (handlers) => {
// //   const {
// //     handleBackToDashboard,
// //     handleLogout,
// //     navigate,
// //     setStatus,
// //     speak,
// //     setAlertType,
// //     setCustomMessage,
// //     alertType,
// //     customMessage,
// //     sendSOS,
// //     cancelSOS,
// //     getOneTimeLocation,
// //     startLocationWatching,
// //     stopLocationWatching,
// //     checkLocationPermission,
// //     setError,
// //     setShowVoiceHelp
// //   } = handlers;

// //   console.log('[SOSCommands] Initializing with handlers');

// //   // Clear existing commands and set feature
// //   voiceService.setFeature('sos');
// //   voiceService.clearDynamicHandlers();
// //   voiceService.clearCommands();

// //   // Register all static commands
// //   Object.keys(SOS_VOICE_COMMANDS).forEach(command => {
// //     voiceService.registerCommand(command, () => {
// //       console.log(`[SOSCommands] Executing command: ${command}`);
// //       executeSOSCommand(SOS_VOICE_COMMANDS[command], handlers);
// //     });
// //   });

// //   // Register dynamic handlers
// //   voiceService.registerDynamicHandler(
// //     SOS_DYNAMIC_PATTERNS.MESSAGE_COMMAND,
// //     (matches) => {
// //       console.log('[SOSCommands] MESSAGE_COMMAND matched:', matches);
// //       const message = matches[0];
// //       if (message) {
// //         setCustomMessage(message);
// //         const feedback = `Emergency message set to: ${message}`;
// //         setStatus(feedback);
// //         speak(feedback);
// //       }
// //     }
// //   );

// //   voiceService.registerDynamicHandler(
// //     SOS_DYNAMIC_PATTERNS.LOCATION_REASON,
// //     (matches) => {
// //       console.log('[SOSCommands] LOCATION_REASON matched:', matches);
// //       const [situation, details] = matches;
// //       let alertType = 'sos';
// //       let message = `I am ${situation}`;
      
// //       if (details) {
// //         message += ` ${details}`;
// //       }
      
// //       // Map situation to alert type
// //       if (situation === 'lost' || situation === 'stuck') {
// //         alertType = 'lost';
// //       } else if (situation === 'injured' || situation === 'hurt') {
// //         alertType = 'medical';
// //       }
      
// //       setAlertType(alertType);
// //       setCustomMessage(message);
      
// //       const feedback = `Set ${ALERT_TYPE_DESCRIPTIONS[alertType]}. Message: ${message}`;
// //       setStatus(feedback);
// //       speak(feedback);
// //     }
// //   );

// //   voiceService.registerDynamicHandler(
// //     SOS_DYNAMIC_PATTERNS.EMERGENCY_DETAILS,
// //     (matches) => {
// //       console.log('[SOSCommands] EMERGENCY_DETAILS matched:', matches);
// //       const [type, details] = matches;
// //       setAlertType(type.toLowerCase());
// //       setCustomMessage(details);
      
// //       const feedback = `Set ${ALERT_TYPE_DESCRIPTIONS[type.toLowerCase()]}. Details: ${details}`;
// //       setStatus(feedback);
// //       speak(feedback);
// //     }
// //   );

// //   voiceService.registerDynamicHandler(
// //     SOS_DYNAMIC_PATTERNS.QUICK_SOS,
// //     (matches) => {
// //       console.log('[SOSCommands] QUICK_SOS matched:', matches);
// //       const [action, urgency] = matches;
// //       setStatus("Quick emergency activated. Sending SOS immediately.");
// //       speak("Sending SOS immediately. Help is on the way.");
      
// //       // Trigger SOS immediately
// //       setTimeout(() => {
// //         if (handlers.sendSOS) {
// //           handlers.sendSOS();
// //         }
// //       }, 1000);
// //     }
// //   );

// //   // Set up the general callback for unhandled commands
// //   voiceService.onResultCallback = (transcript) => {
// //     console.log('[SOSCommands] Unhandled command:', transcript);
// //     const feedback = `I heard: "${transcript}". For SOS, say "emergency" or "help me". Say "help" for available commands.`;
// //     setStatus(feedback);
// //     speak(feedback);
// //   };

// //   // Start listening
// //   voiceService.startListening();
// //   console.log('[SOSCommands] Voice commands initialized and listening started');
  
// //   // Welcome message
// //   setTimeout(() => {
// //     speak("SOS voice commands activated. Say 'help' for available commands or 'emergency' to start.");
// //   }, 1000);
// // };

// // // Execute SOS command
// // const executeSOSCommand = (command, handlers) => {
// //   console.log('[SOSCommands] Executing command type:', command);
  
// //   const {
// //     handleBackToDashboard,
// //     handleLogout,
// //     navigate,
// //     setStatus,
// //     speak,
// //     setAlertType,
// //     setCustomMessage,
// //     alertType,
// //     customMessage,
// //     sendSOS,
// //     cancelSOS,
// //     getOneTimeLocation,
// //     startLocationWatching,
// //     stopLocationWatching,
// //     checkLocationPermission,
// //     setError,
// //     setShowVoiceHelp
// //   } = handlers;

// //   switch(command) {
// //     case 'back':
// //       handleBackToDashboard();
// //       break;
// //     case 'dashboard':
// //       navigate("/dashboard");
// //       break;
// //     case 'logout':
// //       handleLogout();
// //       break;
// //     case 'sos':
// //       setStatus("SOS activated. Say 'send SOS' to confirm or specify emergency type.");
// //       speak("SOS activated. Say 'send SOS' to confirm or specify emergency type like 'medical emergency'.");
// //       break;
// //     case 'send_sos':
// //       if (sendSOS) {
// //         sendSOS();
// //       }
// //       break;
// //     case 'medical':
// //       setAlertType("medical");
// //       setStatus("Medical emergency selected. Say your symptoms or 'send SOS'.");
// //       speak("Medical emergency selected. Please describe your symptoms.");
// //       break;
// //     case 'safety':
// //       setAlertType("safety");
// //       setStatus("Safety threat selected. Describe the threat or say 'send SOS'.");
// //       speak("Safety threat selected. Please describe the threat.");
// //       break;
// //     case 'fire':
// //       setAlertType("fire");
// //       setStatus("Fire emergency selected. Say location details or 'send SOS'.");
// //       speak("Fire emergency selected. Please describe the location.");
// //       break;
// //     case 'accident':
// //       setAlertType("accident");
// //       setStatus("Accident emergency selected. Describe the accident or say 'send SOS'.");
// //       speak("Accident emergency selected. Please describe what happened.");
// //       break;
// //     case 'lost':
// //       setAlertType("lost");
// //       setStatus("Lost/disoriented selected. Describe your location or 'send SOS'.");
// //       speak("Lost emergency selected. Please describe where you are.");
// //       break;
// //     case 'other':
// //       setAlertType("other");
// //       setStatus("Other emergency selected. Describe the situation or 'send SOS'.");
// //       speak("Other emergency selected. Please describe the situation.");
// //       break;
// //     case 'get_location':
// //       if (getOneTimeLocation) {
// //         getOneTimeLocation();
// //       }
// //       break;
// //     case 'start_tracking':
// //       if (startLocationWatching) {
// //         startLocationWatching();
// //       }
// //       break;
// //     case 'stop_tracking':
// //       if (stopLocationWatching) {
// //         stopLocationWatching();
// //       }
// //       break;
// //     case 'set_message':
// //       setStatus("Please say your emergency message after 'message'. Example: 'message I need help at the park'.");
// //       speak("Please say your emergency message after 'message'. For example: 'message I need help at the park'.");
// //       break;
// //     case 'reset_message':
// //       setCustomMessage("Emergency! Please help me.");
// //       setStatus("Message reset to default.");
// //       speak("Message reset to default.");
// //       break;
// //     case 'cancel':
// //       if (cancelSOS) {
// //         cancelSOS();
// //       }
// //       break;
// //     case 'clear_status':
// //       setStatus("");
// //       setError("");
// //       speak("Cleared messages.");
// //       break;
// //     case 'help':
// //       if (setShowVoiceHelp) {
// //         setShowVoiceHelp(true);
// //       }
// //       speak("Showing voice command help. Check the screen for available commands.");
// //       break;
// //     case 'test_location':
// //       if (getOneTimeLocation) {
// //         getOneTimeLocation();
// //       }
// //       break;
// //     case 'check_permission':
// //       if (checkLocationPermission) {
// //         checkLocationPermission();
// //       }
// //       break;
// //     default:
// //       console.log('[SOSCommands] Unknown command:', command);
// //       break;
// //   }
// // };

// // // Stop SOS voice commands
// // export const stopSOSCommands = () => {
// //   console.log('[SOSCommands] Stopping SOS commands');
// //   voiceService.stopListening();
// //   voiceService.clearDynamicHandlers();
  
// //   // Keep only navigation commands
// //   const navigationCommands = ['dashboard', 'go to dashboard', 'logout', 'sign out', 'exit', 'go back', 'back'];
// //   const newCommands = new Map();
  
// //   for (const [pattern, handler] of voiceService.commands.entries()) {
// //     if (navigationCommands.includes(pattern)) {
// //       newCommands.set(pattern, handler);
// //     }
// //   }
  
// //   voiceService.commands = newCommands;
// //   voiceService.setFeature('default');
// // };




// // src/voice-commands/SOSVoiceCommands.js - UPDATED VERSION
// import { voiceService } from '../services/voiceService';

// // Voice command vocabulary for SOS
// export const SOS_VOICE_COMMANDS = {
//   // Navigation commands
//   "go back": "back",
//   "go to dashboard": "dashboard",
//   "logout": "logout",
//   "sign out": "logout",
//   "exit": "logout",
  
//   // SOS actions
//   "emergency": "sos",
//   "sos": "sos",
//   "help me": "sos",
//   "send sos": "send_sos",
//   "send emergency": "send_sos",
//   "activate sos": "activate_sos",
//   "trigger emergency": "activate_sos",
  
//   // Alert type commands
//   "medical emergency": "medical",
//   "medical help": "medical",
//   "i need medical": "medical",
//   "doctor": "medical",
//   "hospital": "medical",
//   "ambulance": "medical",
  
//   "safety emergency": "safety",
//   "danger": "safety",
//   "threat": "safety",
//   "unsafe": "safety",
  
//   "fire emergency": "fire",
//   "fire": "fire",
//   "burning": "fire",
//   "smoke": "fire",
  
//   "accident emergency": "accident",
//   "car accident": "accident",
//   "road accident": "accident",
//   "crash": "accident",
  
//   "lost emergency": "lost",
//   "i am lost": "lost",
//   "lost my way": "lost",
//   "disoriented": "lost",
//   "cant find way": "lost",
  
//   "other emergency": "other",
//   "different emergency": "other",
  
//   // Location commands
//   "get location": "get_location",
//   "find me": "get_location",
//   "where am i": "get_location",
//   "my location": "get_location",
//   "check location": "get_location",
  
//   "start tracking": "start_tracking",
//   "track location": "start_tracking",
//   "live location": "start_tracking",
//   "follow me": "start_tracking",
  
//   "stop tracking": "stop_tracking",
//   "stop location": "stop_tracking",
//   "end tracking": "stop_tracking",
  
//   // Message commands
//   "set message": "set_message",
//   "change message": "set_message",
//   "update message": "set_message",
//   "emergency message": "set_message",
  
//   "reset message": "reset_message",
//   "clear message": "reset_message",
//   "default message": "reset_message",
  
//   // Status commands
//   "cancel emergency": "cancel",
//   "abort sos": "cancel",
//   "stop sos": "cancel",
//   "dont send": "cancel",
  
//   "clear status": "clear_status",
//   "dismiss message": "clear_status",
//   "clear error": "clear_error",
  
//   // Help
//   "help": "help",
//   "what can i say": "help",
//   "show commands": "help",
//   "voice help": "help",
//   "available commands": "help",
  
//   // Testing
//   "test location": "test_location",
//   "test gps": "test_location",
//   "check gps": "test_location",
  
//   "check permission": "check_permission",
//   "location permission": "check_permission",
//   "enable location": "check_permission",
  
//   // Natural language emergency commands
//   "i need help": "sos",
//   "im in danger": "sos",
//   "please help": "sos",
//   "someone help": "sos",
//   "call for help": "sos",
//   "alert emergency": "sos",
// };

// // Dynamic patterns for SOS commands
// export const SOS_DYNAMIC_PATTERNS = {
//   // Custom message: "message i am in danger", "say i need ambulance"
//   MESSAGE_COMMAND: /^(?:message|say|tell|alert|emergency message)\s+(.+)$/i,
  
//   // Location with reason: "lost near market", "accident on highway"
//   LOCATION_REASON: /^(?:i am|im|we are|we're)\s+(lost|stuck|trapped|injured|hurt)\s+(.+)?$/i,
  
//   // Time-based: "been here for 10 minutes", "waiting 5 minutes"
//   TIME_BASED: /^(?:been|waiting|stuck)\s+(?:for|since)\s+(.+)$/i,
  
//   // Emergency with details: "medical heart pain", "accident car crash"
//   EMERGENCY_DETAILS: /^(medical|accident|fire|safety)\s+(.+)$/i,
  
//   // Quick SOS: "sos now", "emergency immediately"
//   QUICK_SOS: /^(sos|emergency|help)\s+(now|immediately|urgent|quick)$/i,
  
//   // Complete emergency: "i need ambulance at the hospital"
//   COMPLETE_EMERGENCY: /^(?:i need|i want|get me)\s+(.+?)\s+(?:at|in|near)\s+(.+)$/i,
// };

// // Alert type descriptions
// export const ALERT_TYPE_DESCRIPTIONS = {
//   "sos": "General Emergency",
//   "medical": "Medical Emergency",
//   "safety": "Safety Threat",
//   "fire": "Fire Emergency",
//   "accident": "Accident",
//   "lost": "Lost/Disoriented",
//   "other": "Other Emergency"
// };

// // Initialize SOS voice commands
// export const initializeSOSCommands = (handlers) => {
//   const {
//     handleBackToDashboard,
//     handleLogout,
//     navigate,
//     setStatus,
//     speak,
//     setAlertType,
//     setCustomMessage,
//     alertType,
//     customMessage,
//     sendSOS,
//     cancelSOS,
//     getOneTimeLocation,
//     startLocationWatching,
//     stopLocationWatching,
//     checkLocationPermission,
//     setError,
//     setShowVoiceHelp,
//     startCountdown
//   } = handlers;

//   console.log('[SOSCommands] Initializing SOS voice commands');

//   // Clear existing commands and set feature
//   voiceService.setFeature('sos');
//   voiceService.clearDynamicHandlers();
//   voiceService.clearCommands();

//   // Register all static commands
//   Object.keys(SOS_VOICE_COMMANDS).forEach(command => {
//     voiceService.registerCommand(command, () => {
//       console.log(`[SOSCommands] Executing command: ${command}`);
//       executeSOSCommand(SOS_VOICE_COMMANDS[command], handlers);
//     });
//   });

//   // Register dynamic handlers
//   voiceService.registerDynamicHandler(
//     SOS_DYNAMIC_PATTERNS.MESSAGE_COMMAND,
//     (matches) => {
//       console.log('[SOSCommands] MESSAGE_COMMAND matched:', matches);
//       const message = matches[0];
//       if (message) {
//         setCustomMessage(message);
//         const feedback = `Emergency message set: ${message}`;
//         setStatus(feedback);
//         speak(feedback);
//       }
//     }
//   );

//   voiceService.registerDynamicHandler(
//     SOS_DYNAMIC_PATTERNS.LOCATION_REASON,
//     (matches) => {
//       console.log('[SOSCommands] LOCATION_REASON matched:', matches);
//       const [situation, details] = matches;
//       let alertType = 'sos';
//       let message = `I am ${situation}`;
      
//       if (details) {
//         message += ` ${details}`;
//       }
      
//       // Map situation to alert type
//       if (situation === 'lost' || situation === 'stuck') {
//         alertType = 'lost';
//       } else if (situation === 'injured' || situation === 'hurt') {
//         alertType = 'medical';
//       }
      
//       setAlertType(alertType);
//       setCustomMessage(message);
      
//       const feedback = `Set ${ALERT_TYPE_DESCRIPTIONS[alertType]}. Message: ${message}`;
//       setStatus(feedback);
//       speak(feedback);
//     }
//   );

//   voiceService.registerDynamicHandler(
//     SOS_DYNAMIC_PATTERNS.EMERGENCY_DETAILS,
//     (matches) => {
//       console.log('[SOSCommands] EMERGENCY_DETAILS matched:', matches);
//       const [type, details] = matches;
//       const alertTypeKey = type.toLowerCase();
//       setAlertType(alertTypeKey);
//       setCustomMessage(details);
      
//       const feedback = `Set ${ALERT_TYPE_DESCRIPTIONS[alertTypeKey]}. Details: ${details}`;
//       setStatus(feedback);
//       speak(feedback);
//     }
//   );

//   voiceService.registerDynamicHandler(
//     SOS_DYNAMIC_PATTERNS.QUICK_SOS,
//     (matches) => {
//       console.log('[SOSCommands] QUICK_SOS matched:', matches);
//       const [action, urgency] = matches;
//       setStatus("Quick emergency! Starting countdown...");
//       speak("Quick emergency activated. Starting countdown.");
      
//       // Start countdown immediately
//       if (startCountdown) {
//         startCountdown();
//       }
//     }
//   );

//   voiceService.registerDynamicHandler(
//     SOS_DYNAMIC_PATTERNS.COMPLETE_EMERGENCY,
//     (matches) => {
//       console.log('[SOSCommands] COMPLETE_EMERGENCY matched:', matches);
//       const [need, location] = matches;
//       let alertType = 'sos';
      
//       // Determine alert type based on need
//       if (need.includes('ambulance') || need.includes('doctor') || need.includes('medical')) {
//         alertType = 'medical';
//       } else if (need.includes('fire') || need.includes('burning')) {
//         alertType = 'fire';
//       } else if (need.includes('police') || need.includes('safety')) {
//         alertType = 'safety';
//       }
      
//       const message = `I need ${need} at ${location}`;
//       setAlertType(alertType);
//       setCustomMessage(message);
      
//       const feedback = `Set ${ALERT_TYPE_DESCRIPTIONS[alertType]}. ${message}`;
//       setStatus(feedback);
//       speak(feedback);
//     }
//   );

//   // Set up the general callback for unhandled commands
//   voiceService.onResultCallback = (transcript) => {
//     console.log('[SOSCommands] Unhandled command:', transcript);
//     const feedback = `I heard: "${transcript}". For SOS, say "emergency" or "help me". Say "help" for available commands.`;
//     setStatus(feedback);
//     speak(feedback);
//   };

//   // Stop any existing listening and start fresh
//   if (voiceService.isListening) {
//     console.log('[SOSCommands] Stopping existing listening first');
//     voiceService.stopListening();
//   }

//   // Wait a moment before starting
//   setTimeout(() => {
//     try {
//       voiceService.startListening();
//       console.log('[SOSCommands] Voice commands initialized and listening started');
      
//       // Welcome message
//       setTimeout(() => {
//         speak("SOS voice commands activated. Say 'emergency' to start or 'help' for available commands.");
//         setStatus("SOS voice commands ready. Say 'emergency' or 'help'.");
//       }, 1000);
//     } catch (error) {
//       console.error('[SOSCommands] Failed to start listening:', error);
//       setStatus("Failed to start voice commands. Try refreshing the page.");
//     }
//   }, 500);
// };

// // Execute SOS command
// const executeSOSCommand = (command, handlers) => {
//   console.log('[SOSCommands] Executing command type:', command);
  
//   const {
//     handleBackToDashboard,
//     handleLogout,
//     navigate,
//     setStatus,
//     speak,
//     setAlertType,
//     setCustomMessage,
//     alertType,
//     customMessage,
//     sendSOS,
//     cancelSOS,
//     getOneTimeLocation,
//     startLocationWatching,
//     stopLocationWatching,
//     checkLocationPermission,
//     setError,
//     setShowVoiceHelp,
//     startCountdown
//   } = handlers;

//   switch(command) {
//     case 'back':
//       handleBackToDashboard();
//       break;
//     case 'dashboard':
//       navigate("/dashboard");
//       break;
//     case 'logout':
//       handleLogout();
//       break;
//     case 'sos':
//       setStatus("SOS activated. Say 'send SOS' to confirm or specify emergency type.");
//       speak("SOS activated. Say 'send SOS' to confirm or specify emergency type like 'medical emergency'.");
//       break;
//     case 'activate_sos':
//       setStatus("Activating SOS. Starting location tracking...");
//       speak("Activating SOS. Getting your location.");
//       if (startLocationWatching) {
//         startLocationWatching();
//       }
//       break;
//     case 'send_sos':
//       if (startCountdown) {
//         startCountdown();
//       }
//       break;
//     case 'medical':
//       setAlertType("medical");
//       setStatus("Medical emergency selected. Say your symptoms or 'send SOS'.");
//       speak("Medical emergency selected. Please describe your symptoms.");
//       break;
//     case 'safety':
//       setAlertType("safety");
//       setStatus("Safety threat selected. Describe the threat or say 'send SOS'.");
//       speak("Safety threat selected. Please describe the threat.");
//       break;
//     case 'fire':
//       setAlertType("fire");
//       setStatus("Fire emergency selected. Say location details or 'send SOS'.");
//       speak("Fire emergency selected. Please describe the location.");
//       break;
//     case 'accident':
//       setAlertType("accident");
//       setStatus("Accident emergency selected. Describe the accident or say 'send SOS'.");
//       speak("Accident emergency selected. Please describe what happened.");
//       break;
//     case 'lost':
//       setAlertType("lost");
//       setStatus("Lost/disoriented selected. Describe your location or 'send SOS'.");
//       speak("Lost emergency selected. Please describe where you are.");
//       break;
//     case 'other':
//       setAlertType("other");
//       setStatus("Other emergency selected. Describe the situation or 'send SOS'.");
//       speak("Other emergency selected. Please describe the situation.");
//       break;
//     case 'get_location':
//       if (getOneTimeLocation) {
//         getOneTimeLocation();
//       }
//       break;
//     case 'start_tracking':
//       if (startLocationWatching) {
//         startLocationWatching();
//       }
//       break;
//     case 'stop_tracking':
//       if (stopLocationWatching) {
//         stopLocationWatching();
//       }
//       break;
//     case 'set_message':
//       setStatus("Please say your emergency message after 'message'. Example: 'message I need help at the park'.");
//       speak("Please say your emergency message after 'message'. For example: 'message I need help at the park'.");
//       break;
//     case 'reset_message':
//       setCustomMessage("Emergency! Please help me.");
//       setStatus("Message reset to default.");
//       speak("Message reset to default.");
//       break;
//     case 'cancel':
//       if (cancelSOS) {
//         cancelSOS();
//       }
//       break;
//     case 'clear_status':
//       setStatus("");
//       setError("");
//       speak("Cleared messages.");
//       break;
//     case 'help':
//       if (setShowVoiceHelp) {
//         setShowVoiceHelp(true);
//       }
//       speak("Showing voice command help. Check the screen for available commands.");
//       break;
//     case 'test_location':
//       if (getOneTimeLocation) {
//         getOneTimeLocation();
//       }
//       break;
//     case 'check_permission':
//       if (checkLocationPermission) {
//         checkLocationPermission();
//       }
//       break;
//     default:
//       console.log('[SOSCommands] Unknown command:', command);
//       break;
//   }
// };

// // Stop SOS voice commands
// export const stopSOSCommands = () => {
//   console.log('[SOSCommands] Stopping SOS commands');
//   voiceService.stopListening();
//   voiceService.clearDynamicHandlers();
  
//   // Keep only navigation commands
//   const navigationCommands = ['dashboard', 'go to dashboard', 'logout', 'sign out', 'exit', 'go back', 'back'];
//   const newCommands = new Map();
  
//   for (const [pattern, handler] of voiceService.commands.entries()) {
//     if (navigationCommands.includes(pattern)) {
//       newCommands.set(pattern, handler);
//     }
//   }
  
//   voiceService.commands = newCommands;
//   voiceService.setFeature('default');
// };


// src/voice-commands/SOSVoiceCommands.js - COMPLETE FIXED VERSION
import { voiceService } from '../services/voiceService';

// Voice command vocabulary for SOS
export const SOS_VOICE_COMMANDS = {
  // Navigation commands
  "go back": "back",
  "go to dashboard": "dashboard",
  "dashboard": "dashboard",
  "back": "back",
  "back to dashboard": "back",
  "return": "back",
  "return to dashboard": "back",
  "home": "dashboard",
  "go home": "dashboard",
  "main menu": "dashboard",
  "main screen": "dashboard",
  "logout": "logout",
  "sign out": "logout",
  "exit": "logout",
  
  // SOS actions
  "emergency": "sos",
  "sos": "sos",
  "help me": "sos",
  "sos sos": "send_sos",
  "send sos now": "send_sos",
  "send emergency now": "send_sos",
  "send sos": "send_sos",
  "send emergency": "send_sos",
  "activate sos": "activate_sos",
  "trigger emergency": "activate_sos",
  
  // Alert type commands
  "medical emergency": "medical",
  "medical help": "medical",
  "i need medical": "medical",
  "doctor": "medical",
  "hospital": "medical",
  "ambulance": "medical",
  
  "safety emergency": "safety",
  "danger": "safety",
  "threat": "safety",
  "unsafe": "safety",
  
  "fire emergency": "fire",
  "fire": "fire",
  "burning": "fire",
  "smoke": "fire",
  
  "accident emergency": "accident",
  "car accident": "accident",
  "road accident": "accident",
  "crash": "accident",
  
  "lost emergency": "lost",
  "i am lost": "lost",
  "lost my way": "lost",
  "disoriented": "lost",
  "cant find way": "lost",
  
  "other emergency": "other",
  "different emergency": "other",
  
  // Location commands
  "get location": "get_location",
  "find me": "get_location",
  "where am i": "get_location",
  "my location": "get_location",
  "check location": "get_location",
  
  "start tracking": "start_tracking",
  "track location": "start_tracking",
  "live location": "start_tracking",
  "follow me": "start_tracking",
  
  "stop tracking": "stop_tracking",
  "stop location": "stop_tracking",
  "end tracking": "stop_tracking",
  
  // Message commands
  "set message": "set_message",
  "change message": "set_message",
  "update message": "set_message",
  "emergency message": "set_message",
  
  "reset message": "reset_message",
  "clear message": "reset_message",
  "default message": "reset_message",
  
  // Status commands
  "cancel emergency": "cancel",
  "abort sos": "cancel",
  "stop sos": "cancel",
  "dont send": "cancel",
  
  "clear status": "clear_status",
  "dismiss message": "clear_status",
  "clear error": "clear_error",
  
  // Help
  "help": "help",
  "what can i say": "help",
  "show commands": "help",
  "voice help": "help",
  "available commands": "help",
  
  // Testing
  "test location": "test_location",
  "test gps": "test_location",
  "check gps": "test_location",
  
  "check permission": "check_permission",
  "location permission": "check_permission",
  "enable location": "check_permission",
  
  // Natural language emergency commands
  "i need help": "sos",
  "im in danger": "sos",
  "please help": "sos",
  "someone help": "sos",
  "call for help": "sos",
  "alert emergency": "sos",
};

// Dynamic patterns for SOS commands
export const SOS_DYNAMIC_PATTERNS = {
  // Custom message: "message i am in danger", "say i need ambulance"
  MESSAGE_COMMAND: /^(?:message|say|tell|alert|emergency message)\s+(.+)$/i,
  
  // Location with reason: "lost near market", "accident on highway"
  LOCATION_REASON: /^(?:i am|im|we are|we're)\s+(lost|stuck|trapped|injured|hurt)\s+(.+)?$/i,
  
  // Time-based: "been here for 10 minutes", "waiting 5 minutes"
  TIME_BASED: /^(?:been|waiting|stuck)\s+(?:for|since)\s+(.+)$/i,
  
  // Emergency with details: "medical heart pain", "accident car crash"
  EMERGENCY_DETAILS: /^(medical|accident|fire|safety)\s+(.+)$/i,
  
  // Quick SOS: "sos now", "emergency immediately"
  QUICK_SOS: /^(sos|emergency|help)\s+(now|immediately|urgent|quick)$/i,
  
  // Complete emergency: "i need ambulance at the hospital"
  COMPLETE_EMERGENCY: /^(?:i need|i want|get me)\s+(.+?)\s+(?:at|in|near)\s+(.+)$/i,
};

// Alert type descriptions
export const ALERT_TYPE_DESCRIPTIONS = {
  "sos": "General Emergency",
  "medical": "Medical Emergency",
  "safety": "Safety Threat",
  "fire": "Fire Emergency",
  "accident": "Accident",
  "lost": "Lost/Disoriented",
  "other": "Other Emergency"
};

// Flag to prevent duplicate callbacks
let isProcessingCommand = false;

// Initialize SOS voice commands
export const initializeSOSCommands = (handlers) => {
  const {
    handleBackToDashboard,
    handleLogout,
    navigate,
    setStatus,
    speak,
    setAlertType,
    setCustomMessage,
    alertType,
    customMessage,
    sendSOS,
    cancelSOS,
    getOneTimeLocation,
    startLocationWatching,
    stopLocationWatching,
    checkLocationPermission,
    setError,
    setShowVoiceHelp,
    startCountdown
  } = handlers;

  console.log('[SOSCommands] Initializing SOS voice commands');

  // Clear existing commands and set feature
  voiceService.setFeature('sos');
  voiceService.clearDynamicHandlers();
  voiceService.clearCommands();

  // Reset processing flag
  isProcessingCommand = false;

  // Create wrapped handlers that manage the processing flag
  const createWrappedHandler = (commandName, handler) => {
    return () => {
      if (isProcessingCommand) {
        console.log(`[SOSCommands] Already processing, skipping: ${commandName}`);
        return;
      }
      
      isProcessingCommand = true;
      console.log(`[SOSCommands] Executing command: ${commandName}`);
      
      try {
        handler();
      } catch (error) {
        console.error(`[SOSCommands] Error in command ${commandName}:`, error);
        setStatus(`Error executing command: ${commandName}`);
        speak(`Error executing command: ${commandName}`);
      } finally {
        // Reset flag after a short delay
        setTimeout(() => {
          isProcessingCommand = false;
        }, 200);
      }
    };
  };

  // Create dynamic handler wrapper
  const createDynamicWrapper = (callback) => {
    return (matches, transcript) => {
      if (isProcessingCommand) {
        console.log('[SOSCommands] Already processing, skipping dynamic handler');
        return false;
      }
      
      isProcessingCommand = true;
      try {
        return callback(matches, transcript);
      } finally {
        setTimeout(() => {
          isProcessingCommand = false;
        }, 200);
      }
    };
  };

  // Register all static commands
  Object.entries(SOS_VOICE_COMMANDS).forEach(([command, commandType]) => {
    const handler = createWrappedHandler(command, () => {
      executeSOSCommand(commandType, handlers);
    });
    voiceService.registerCommand(command, handler);
  });

  // Register dynamic handlers with wrapped callbacks
  voiceService.registerDynamicHandler(
    SOS_DYNAMIC_PATTERNS.MESSAGE_COMMAND,
    createDynamicWrapper((matches) => {
      console.log('[SOSCommands] MESSAGE_COMMAND matched:', matches);
      const message = matches[0];
      if (message) {
        setCustomMessage(message);
        const feedback = `Emergency message set: ${message}`;
        setStatus(feedback);
        speak(feedback);
      }
      return true;
    })
  );

  voiceService.registerDynamicHandler(
    SOS_DYNAMIC_PATTERNS.LOCATION_REASON,
    createDynamicWrapper((matches) => {
      console.log('[SOSCommands] LOCATION_REASON matched:', matches);
      const [situation, details] = matches;
      let alertType = 'sos';
      let message = `I am ${situation}`;
      
      if (details) {
        message += ` ${details}`;
      }
      
      // Map situation to alert type
      if (situation === 'lost' || situation === 'stuck') {
        alertType = 'lost';
      } else if (situation === 'injured' || situation === 'hurt') {
        alertType = 'medical';
      }
      
      setAlertType(alertType);
      setCustomMessage(message);
      
      const feedback = `Set ${ALERT_TYPE_DESCRIPTIONS[alertType]}. Message: ${message}`;
      setStatus(feedback);
      speak(feedback);
      return true;
    })
  );

  voiceService.registerDynamicHandler(
    SOS_DYNAMIC_PATTERNS.EMERGENCY_DETAILS,
    createDynamicWrapper((matches) => {
      console.log('[SOSCommands] EMERGENCY_DETAILS matched:', matches);
      const [type, details] = matches;
      const alertTypeKey = type.toLowerCase();
      setAlertType(alertTypeKey);
      setCustomMessage(details);
      
      const feedback = `Set ${ALERT_TYPE_DESCRIPTIONS[alertTypeKey]}. Details: ${details}`;
      setStatus(feedback);
      speak(feedback);
      return true;
    })
  );

  voiceService.registerDynamicHandler(
    SOS_DYNAMIC_PATTERNS.QUICK_SOS,
    createDynamicWrapper((matches) => {
      console.log('[SOSCommands] QUICK_SOS matched:', matches);
      const [action, urgency] = matches;
      setStatus("Quick emergency! Starting countdown...");
      speak("Quick emergency activated. Starting countdown.");
      
      // Start countdown immediately
      if (startCountdown) {
        startCountdown();
      }
      return true;
    })
  );

  voiceService.registerDynamicHandler(
    SOS_DYNAMIC_PATTERNS.COMPLETE_EMERGENCY,
    createDynamicWrapper((matches) => {
      console.log('[SOSCommands] COMPLETE_EMERGENCY matched:', matches);
      const [need, location] = matches;
      let alertType = 'sos';
      
      // Determine alert type based on need
      if (need.includes('ambulance') || need.includes('doctor') || need.includes('medical')) {
        alertType = 'medical';
      } else if (need.includes('fire') || need.includes('burning')) {
        alertType = 'fire';
      } else if (need.includes('police') || need.includes('safety')) {
        alertType = 'safety';
      }
      
      const message = `I need ${need} at ${location}`;
      setAlertType(alertType);
      setCustomMessage(message);
      
      const feedback = `Set ${ALERT_TYPE_DESCRIPTIONS[alertType]}. ${message}`;
      setStatus(feedback);
      speak(feedback);
      return true;
    })
  );

  // Set up the general callback for unhandled commands
  voiceService.onResultCallback = (transcript) => {
    // Prevent duplicate processing when we're already handling a command
    if (isProcessingCommand) {
      console.log('[SOSCommands] Skipping callback - already processing command');
      return;
    }
    
    console.log('[SOSCommands] No command matched for:', transcript);
    const feedback = `I heard: "${transcript}". For SOS, say "emergency" or "help me". Say "help" for available commands.`;
    setStatus(feedback);
    speak(feedback);
  };

  // Stop any existing listening and start fresh
  if (voiceService.isListening) {
    console.log('[SOSCommands] Stopping existing listening first');
    voiceService.stopListening();
  }

  // Wait a moment before starting
  // setTimeout(() => {
  //   try {
  //     voiceService.startListening();
  //     console.log('[SOSCommands] Voice commands initialized and listening started');
      
  //     // Welcome message
  //     setTimeout(() => {
  //       speak("SOS voice commands activated. Say 'emergency' to start or 'help' for available commands.");
  //       setStatus("SOS voice commands ready. Say 'emergency' or 'help'.");
  //     }, 1000);
  //   } catch (error) {
  //     console.error('[SOSCommands] Failed to start listening:', error);
  //     setStatus("Failed to start voice commands. Try refreshing the page.");
  //   }
  // }, 500);
  // In SOSVoiceCommands.js - Update the initialization section
// Wait a moment before starting
setTimeout(() => {
  try {
    // Check if already listening before starting
    if (!voiceService.isListening && !voiceService.isStarting) {
      voiceService.startListening();
      console.log('[SOSCommands] Voice commands initialized and listening started');
      
      // Welcome message
      setTimeout(() => {
        speak("SOS voice commands activated. Say 'emergency' to start or 'help' for available commands.");
        setStatus("SOS voice commands ready. Say 'emergency' or 'help'.");
      }, 1000);
    } else {
      console.log('[SOSCommands] Already listening or starting, not restarting');
      
      // Still give welcome message
      setTimeout(() => {
        speak("SOS voice commands ready. Say 'emergency' to start or 'help' for commands.");
        setStatus("SOS voice commands ready. Say 'emergency' or 'help'.");
      }, 1000);
    }
  } catch (error) {
    console.error('[SOSCommands] Failed to start listening:', error);
    setStatus("Failed to start voice commands. Try refreshing the page.");
    
    // Try again after delay if it's not a permission error
    if (!error.message.includes('permission') && !error.message.includes('not allowed')) {
      setTimeout(() => {
        try {
          if (!voiceService.isListening && !voiceService.isStarting) {
            voiceService.startListening();
            console.log('[SOSCommands] Retry successful');
          }
        } catch (retryError) {
          console.error('[SOSCommands] Retry failed:', retryError);
        }
      }, 2000);
    }
  }
}, 1000); // Increased delay to 1000ms
};

// Execute SOS command
const executeSOSCommand = (command, handlers) => {
  console.log('[SOSCommands] Executing command type:', command);
  
  const {
    handleBackToDashboard,
    handleLogout,
    navigate,
    setStatus,
    speak,
    setAlertType,
    setCustomMessage,
    alertType,
    customMessage,
    sendSOS,
    cancelSOS,
    getOneTimeLocation,
    startLocationWatching,
    stopLocationWatching,
    checkLocationPermission,
    setError,
    setShowVoiceHelp,
    startCountdown
  } = handlers;

  switch(command) {
    case 'back':
      handleBackToDashboard();
      break;
    case 'dashboard':
      navigate("/dashboard");
      break;
    case 'logout':
      handleLogout();
      break;
    case 'sos':
      setStatus("SOS activated. Say 'send SOS' to confirm or specify emergency type.");
      speak("SOS activated. Say 'send SOS' to confirm or specify emergency type like 'medical emergency'.");
      break;
    case 'activate_sos':
      setStatus("Activating SOS. Starting location tracking...");
      speak("Activating SOS. Getting your location.");
      if (startLocationWatching) {
        startLocationWatching();
      }
      break;
    case 'send_sos':
      if (startCountdown) {
        startCountdown();
      } else {
        // Fallback: show message about needing to press button
        setStatus("Please press the SOS button or say 'activate SOS' to start location tracking first.");
        speak("Please press the SOS button or say 'activate SOS' to start location tracking first.");
      }
      break;
    case 'medical':
      setAlertType("medical");
      setStatus("Medical emergency selected. Say your symptoms or 'send SOS'.");
      speak("Medical emergency selected. Please describe your symptoms.");
      break;
    case 'safety':
      setAlertType("safety");
      setStatus("Safety threat selected. Describe the threat or say 'send SOS'.");
      speak("Safety threat selected. Please describe the threat.");
      break;
    case 'fire':
      setAlertType("fire");
      setStatus("Fire emergency selected. Say location details or 'send SOS'.");
      speak("Fire emergency selected. Please describe the location.");
      break;
    case 'accident':
      setAlertType("accident");
      setStatus("Accident emergency selected. Describe the accident or say 'send SOS'.");
      speak("Accident emergency selected. Please describe what happened.");
      break;
    case 'lost':
      setAlertType("lost");
      setStatus("Lost/disoriented selected. Describe your location or 'send SOS'.");
      speak("Lost emergency selected. Please describe where you are.");
      break;
    case 'other':
      setAlertType("other");
      setStatus("Other emergency selected. Describe the situation or 'send SOS'.");
      speak("Other emergency selected. Please describe the situation.");
      break;
    case 'get_location':
      if (getOneTimeLocation) {
        getOneTimeLocation();
      }
      break;
    case 'start_tracking':
      if (startLocationWatching) {
        startLocationWatching();
      }
      break;
    case 'stop_tracking':
      if (stopLocationWatching) {
        stopLocationWatching();
      }
      break;
    case 'set_message':
      setStatus("Please say your emergency message after 'message'. Example: 'message I need help at the park'.");
      speak("Please say your emergency message after 'message'. For example: 'message I need help at the park'.");
      break;
    case 'reset_message':
      setCustomMessage("Emergency! Please help me.");
      setStatus("Message reset to default.");
      speak("Message reset to default.");
      break;
    case 'cancel':
      if (cancelSOS) {
        cancelSOS();
      }
      break;
    case 'clear_status':
      setStatus("");
      setError("");
      speak("Cleared messages.");
      break;
    case 'clear_error':
      setError("");
      speak("Error cleared.");
      break;
    case 'help':
      if (setShowVoiceHelp) {
        setShowVoiceHelp(true);
      }
      speak("Showing voice command help. Check the screen for available commands.");
      break;
    case 'test_location':
      if (getOneTimeLocation) {
        getOneTimeLocation();
      }
      break;
    case 'check_permission':
      if (checkLocationPermission) {
        checkLocationPermission();
      }
      break;
    default:
      console.log('[SOSCommands] Unknown command type:', command);
      const feedback = `Command "${command}" not recognized. Say "help" for available commands.`;
      setStatus(feedback);
      speak(feedback);
      break;
  }
};

// Stop SOS voice commands
export const stopSOSCommands = () => {
  console.log('[SOSCommands] Stopping SOS commands');
  voiceService.stopListening();
  voiceService.clearDynamicHandlers();
  
  // Reset processing flag
  isProcessingCommand = false;
  
  // Keep only navigation commands
  const navigationCommands = ['dashboard', 'go to dashboard', 'logout', 'sign out', 'exit', 'go back', 'back'];
  const newCommands = new Map();
  
  for (const [pattern, handler] of voiceService.commands.entries()) {
    if (navigationCommands.includes(pattern)) {
      newCommands.set(pattern, handler);
    }
  }
  
  voiceService.commands = newCommands;
  voiceService.setFeature('default');
};  