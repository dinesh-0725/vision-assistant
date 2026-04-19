

// // import React, { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import axios from "axios";
// // import "./Login.css";

// // const Signup = () => {
// //   const [status, setStatus] = useState("Create your Vision Assist account");
// //   const [formData, setFormData] = useState({
// //     name: "",
// //     phone: "",
// //     secret_code: ""
// //   });
// //   const navigate = useNavigate();

// //   // ---------- Speak Function ----------
// //   const speak = (text) => {
// //     const synth = window.speechSynthesis;
// //     if (!synth) return;
// //     synth.cancel();
// //     const utter = new SpeechSynthesisUtterance(text);
// //     utter.rate = 0.8;
// //     utter.pitch = 1;
// //     utter.volume = 1;
// //     synth.speak(utter);
// //   };

// //   // ---------- Handle Input Change ----------
// //   const handleInputChange = (field, value) => {
// //     setFormData(prev => ({
// //       ...prev,
// //       [field]: value
// //     }));
// //   };

// //   // ---------- Handle Signup ----------
// //   const handleSignup = async () => {
// //     if (!formData.name.trim()) {
// //       setStatus("Please enter your name");
// //       speak("Please enter your name");
// //       return;
// //     }
// //     if (!formData.phone.trim()) {
// //       setStatus("Please enter your phone number");
// //       speak("Please enter your phone number");
// //       return;
// //     }
// //     if (!formData.secret_code.trim()) {
// //       setStatus("Please enter your secret code");
// //       speak("Please enter your secret code");
// //       return;
// //     }

// //     try {
// //       setStatus("Creating your account...");
// //       speak("Creating your account...");

// //       const payload = {
// //         greeting_name: formData.name,
// //         phone_number: formData.phone,
// //         voice_secret: formData.secret_code
// //       };

// //       const response = await axios.post(
// //         "http://127.0.0.1:8000/auth/voice-register/",
// //         payload
// //       );

// //       console.log("Signup response:", response.data);

// //       if (response.data.access_token) {
// //         const user = {
// //           id: response.data.user_id,
// //           name: formData.name
// //         };
// //         localStorage.setItem("user", JSON.stringify(user));
// //         localStorage.setItem("token", response.data.access_token);
// //         setStatus("Signup successful! Redirecting to dashboard...");
// //         speak("Signup successful! Redirecting to dashboard.");
// //         setTimeout(() => navigate("/dashboard"), 2000);
// //       }
// //     } catch (error) {
// //       console.error("Signup error:", error);
// //       let errorMessage = "Signup failed. Please try again.";
// //       if (error.response?.data?.spoken_response) {
// //         errorMessage = error.response.data.spoken_response;
// //       }
// //       setStatus(errorMessage);
// //       speak(errorMessage);
// //     }
// //   };

// //   const goToLogin = () => navigate("/");

// //   return (
// //     <div className="voice-login-container">
// //       <div className="voice-card">
// //         <h1 className="title">Vision Assist</h1>
// //         <p className="status">{status}</p>

// //         <div className="button-group">
// //           <div className="input-group">
// //             <input
// //               type="text"
// //               placeholder="Enter your full name"
// //               value={formData.name}
// //               onChange={(e) => handleInputChange("name", e.target.value)}
// //               className="input-field"
// //             />
// //           </div>

// //           <div className="input-group">
// //             <input
// //               type="text"
// //               placeholder="Enter your phone number"
// //               value={formData.phone}
// //               onChange={(e) => handleInputChange("phone", e.target.value)}
// //               className="input-field"
// //             />
// //           </div>

// //           <div className="input-group">
// //             <input
// //               type="text"
// //               placeholder="Create your secret code"
// //               value={formData.secret_code}
// //               onChange={(e) => handleInputChange("secret_code", e.target.value)}
// //               className="input-field"
// //             />
// //           </div>

// //           <button className="action-btn" onClick={handleSignup}>
// //             Create Account
// //           </button>
// //           <button className="restart-btn" onClick={goToLogin}>
// //             Already have an account? Login
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Signup;



// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { voiceService } from "../../services/voiceService";
// import "./Login.css";

// const Signup = () => {
//   const [status, setStatus] = useState("Create your Vision Assist account");
//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     secret_code: ""
//   });
//   const [voiceActive, setVoiceActive] = useState(true);
//   const [spokenText, setSpokenText] = useState("");
//   const [isSpeaking, setIsSpeaking] = useState(false);
//   const [mode, setMode] = useState("name"); // name, phone, secret, confirm
//   const navigate = useNavigate();

//   // Refs
//   const nameRef = useRef("");
//   const phoneRef = useRef("");
//   const secretRef = useRef("");
//   const lastTranscriptRef = useRef("");

//   // Initialize refs when state changes
//   useEffect(() => {
//     nameRef.current = formData.name;
//   }, [formData.name]);

//   useEffect(() => {
//     phoneRef.current = formData.phone;
//   }, [formData.phone]);

//   useEffect(() => {
//     secretRef.current = formData.secret_code;
//   }, [formData.secret_code]);

//   // Speak function
//   const speak = (text, callback) => {
//     return new Promise((resolve) => {
//       const synth = window.speechSynthesis;
//       if (!synth) {
//         if (callback) callback();
//         resolve();
//         return;
//       }
      
//       synth.cancel();
//       setIsSpeaking(true);
      
//       const utter = new SpeechSynthesisUtterance(text);
//       utter.rate = 0.8;
//       utter.pitch = 1;
//       utter.volume = 1;
      
//       utter.onstart = () => {
//         console.log("Started speaking:", text);
//         if (voiceService.isListening) {
//           voiceService.stopListening();
//         }
//       };
      
//       utter.onend = () => {
//         console.log("Finished speaking");
//         setIsSpeaking(false);
        
//         setTimeout(() => {
//           if (voiceActive && !isSpeaking) {
//             voiceService.startListening();
//           }
//         }, 500);
        
//         if (callback) callback();
//         resolve();
//       };
      
//       utter.onerror = (err) => {
//         console.error("Speech error:", err);
//         setIsSpeaking(false);
//         setTimeout(() => {
//           if (voiceActive && !isSpeaking) {
//             voiceService.startListening();
//           }
//         }, 500);
//         resolve();
//       };
      
//       synth.speak(utter);
//     });
//   };

//   // Initialize voice on mount
//   useEffect(() => {
//     // Check voice support
//     if (!voiceService.isAvailable()) {
//       setStatus("Voice recognition not available. Please type your details.");
//       return;
//     }

//     // Initial message
//     setTimeout(async () => {
//       await speak("Welcome to sign up. Please say your name. For example: My name is John");
//       setStatus("Say your name. For example: 'My name is John'");
//       setMode("name");
      
//       // Start voice service
//       voiceService.startListening();
//     }, 800);

//     // Register voice commands
//     registerVoiceCommands();

//     return () => {
//       voiceService.stopListening();
//       voiceService.onResultCallback = null;
//       voiceService.clearCommands();
//     };
//   }, []);

//   // Update commands when mode changes
//   useEffect(() => {
//     if (voiceService.isAvailable()) {
//       registerVoiceCommands();
//     }
//   }, [mode]);

//   // Register voice commands
//   const registerVoiceCommands = () => {
//     console.log("Registering voice commands for Signup page, mode:", mode);
    
//     // Clear existing commands
//     voiceService.clearCommands();
    
//     // Navigation commands
//     voiceService.registerCommand("back", async () => {
//       await speak("Going back to login page");
//       navigate("/");
//     });
    
//     voiceService.registerCommand("back to login", async () => {
//       await speak("Going back to login page");
//       navigate("/");
//     });
    
//     voiceService.registerCommand("login", async () => {
//       await speak("Going to login page");
//       navigate("/");
//     });
    
//     voiceService.registerCommand("home", async () => {
//       await speak("Going back to login page");
//       navigate("/");
//     });
    
//     // Action commands
//     voiceService.registerCommand("next", async () => {
//       await handleNext();
//     });
    
//     voiceService.registerCommand("continue", async () => {
//       await handleNext();
//     });
    
//     voiceService.registerCommand("submit", async () => {
//       await handleSignup();
//     });
    
//     voiceService.registerCommand("create account", async () => {
//       await handleSignup();
//     });
    
//     voiceService.registerCommand("sign up", async () => {
//       await handleSignup();
//     });
    
//     voiceService.registerCommand("signup", async () => {
//       await handleSignup();
//     });
    
//     // Field navigation commands
//     voiceService.registerCommand("name", async () => {
//       await speak("Please say your name. For example: My name is John");
//       setStatus("Say your name. For example: 'My name is John'");
//       setMode("name");
//     });
    
//     voiceService.registerCommand("phone", async () => {
//       if (!nameRef.current.trim()) {
//         await speak("Please provide your name first");
//         setStatus("Please provide your name first");
//         setMode("name");
//         return;
//       }
//       await speak("Please say your phone number. For example: Phone number is 1234567890");
//       setStatus("Say your phone number. For example: 'Phone number is 1234567890'");
//       setMode("phone");
//     });
    
//     voiceService.registerCommand("secret", async () => {
//       if (!nameRef.current.trim()) {
//         await speak("Please provide your name first");
//         setStatus("Please provide your name first");
//         setMode("name");
//         return;
//       }
//       if (!phoneRef.current.trim()) {
//         await speak("Please provide your phone number first");
//         setStatus("Please provide your phone number first");
//         setMode("phone");
//         return;
//       }
//       await speak("Please create your secret code. Spell it letter by letter. For example: V I S I O N 1");
//       setStatus("Spell your secret code letter by letter. For example: 'V I S I O N 1'");
//       setMode("secret");
//     });
    
//     // Clear commands
//     voiceService.registerCommand("clear", async () => {
//       if (mode === "name") {
//         setFormData(prev => ({ ...prev, name: "" }));
//         nameRef.current = "";
//         await speak("Name cleared. Please say your name again.");
//       } else if (mode === "phone") {
//         setFormData(prev => ({ ...prev, phone: "" }));
//         phoneRef.current = "";
//         await speak("Phone number cleared. Please say your phone number again.");
//       } else if (mode === "secret") {
//         setFormData(prev => ({ ...prev, secret_code: "" }));
//         secretRef.current = "";
//         await speak("Secret code cleared. Please spell your secret code again.");
//       }
//     });
    
//     voiceService.registerCommand("clear all", async () => {
//       setFormData({ name: "", phone: "", secret_code: "" });
//       nameRef.current = "";
//       phoneRef.current = "";
//       secretRef.current = "";
//       await speak("All fields cleared. Starting from the beginning. Please say your name.");
//       setStatus("Say your name. For example: 'My name is John'");
//       setMode("name");
//     });
    
//     // Help command
//     voiceService.registerCommand("help", async () => {
//       if (mode === "name") {
//         await speak("Say your name. For example: My name is John. Then say 'next' to continue.");
//       } else if (mode === "phone") {
//         await speak("Say your phone number. For example: Phone number is 1234567890. Then say 'next' to continue.");
//       } else if (mode === "secret") {
//         await speak("Spell your secret code letter by letter. For numbers, say the digit or word. Example: V I S I O N 1. Then say 'submit' to create account.");
//       }
//     });
    
//     // Voice control commands
//     voiceService.registerCommand("stop", async () => {
//       await speak("Voice control stopped");
//       voiceService.stopListening();
//       setVoiceActive(false);
//     });
    
//     voiceService.registerCommand("start", async () => {
//       await speak("Voice control started");
//       voiceService.startListening();
//       setVoiceActive(true);
//     });

//     // Handle all voice input
//     voiceService.onResultCallback = (transcript) => {
//       console.log("Voice input:", transcript, "Mode:", mode);
      
//       const cleanTranscript = transcript.toLowerCase().trim();
      
//       // Prevent duplicate processing
//       if (cleanTranscript === lastTranscriptRef.current) {
//         console.log("Duplicate transcript, skipping");
//         return;
//       }
      
//       lastTranscriptRef.current = cleanTranscript;
//       setSpokenText(cleanTranscript);
      
//       // Process voice input based on current mode
//       if (mode === "name") {
//         processNameInput(cleanTranscript);
//       } else if (mode === "phone") {
//         processPhoneInput(cleanTranscript);
//       } else if (mode === "secret") {
//         processSecretInput(cleanTranscript);
//       }
//     };
//   };

//   // Process name input
//   const processNameInput = (transcript) => {
//     console.log("Processing name input:", transcript);
    
//     // Extract name using multiple patterns
//     const namePatterns = [
//       /my name is\s+([a-zA-Z\s]{2,})/i,
//       /i am\s+([a-zA-Z\s]{2,})/i,
//       /name is\s+([a-zA-Z\s]{2,})/i,
//       /call me\s+([a-zA-Z\s]{2,})/i,
//       /it's\s+([a-zA-Z\s]{2,})/i,
//       /it is\s+([a-zA-Z\s]{2,})/i
//     ];
    
//     for (const pattern of namePatterns) {
//       const match = transcript.match(pattern);
//       if (match && match[1]) {
//         const extractedName = match[1].trim();
//         if (extractedName.length > 1) {
//           setFormData(prev => ({ ...prev, name: extractedName }));
//           nameRef.current = extractedName;
//           speak(`Name set to ${extractedName}. Say 'next' to continue or 'phone' to enter phone number.`);
//           return;
//         }
//       }
//     }
    
//     // Check if user said a simple name
//     const simpleNamePattern = /^[a-zA-Z\s]{2,}$/;
//     if (simpleNamePattern.test(transcript) && transcript.length > 1) {
//       const extractedName = transcript.trim();
//       setFormData(prev => ({ ...prev, name: extractedName }));
//       nameRef.current = extractedName;
//       speak(`Name set to ${extractedName}. Say 'next' to continue or 'phone' to enter phone number.`);
//     }
//   };

//   // Process phone input
//   const processPhoneInput = (transcript) => {
//     console.log("Processing phone input:", transcript);
    
//     // Extract phone number using multiple patterns
//     const phonePatterns = [
//       /phone number is\s+([0-9\s\-+]{10,})/i,
//       /my number is\s+([0-9\s\-+]{10,})/i,
//       /number is\s+([0-9\s\-+]{10,})/i,
//       /phone is\s+([0-9\s\-+]{10,})/i,
//       /contact number is\s+([0-9\s\-+]{10,})/i,
//       /mobile number is\s+([0-9\s\-+]{10,})/i
//     ];
    
//     for (const pattern of phonePatterns) {
//       const match = transcript.match(pattern);
//       if (match && match[1]) {
//         // Clean phone number - keep only digits
//         const extractedPhone = match[1].replace(/\D/g, '');
//         if (extractedPhone.length >= 10) {
//           setFormData(prev => ({ ...prev, phone: extractedPhone }));
//           phoneRef.current = extractedPhone;
//           speak(`Phone number set to ${extractedPhone.split('').join(' ')}. Say 'next' to continue or 'secret' to create secret code.`);
//           return;
//         }
//       }
//     }
    
//     // Check for just numbers
//     const justNumbers = transcript.replace(/\D/g, '');
//     if (justNumbers.length >= 10) {
//       setFormData(prev => ({ ...prev, phone: justNumbers }));
//       phoneRef.current = justNumbers;
//       speak(`Phone number set to ${justNumbers.split('').join(' ')}. Say 'next' to continue or 'secret' to create secret code.`);
//     }
//   };

//   // Process secret input
//   const processSecretInput = (transcript) => {
//     console.log("Processing secret input:", transcript);
    
//     // Convert common number words to digits
//     let processedText = transcript
//       .toUpperCase()
//       .replace(/\s+/g, ' ')
//       .trim();
    
//     processedText = processedText
//       .replace(/ZERO/g, '0')
//       .replace(/ONE/g, '1')
//       .replace(/TWO/g, '2')
//       .replace(/THREE/g, '3')
//       .replace(/FOUR/g, '4')
//       .replace(/FIVE/g, '5')
//       .replace(/SIX/g, '6')
//       .replace(/SEVEN/g, '7')
//       .replace(/EIGHT/g, '8')
//       .replace(/NINE/g, '9');
    
//     // Split into tokens
//     const tokens = processedText
//       .split(/\s+|AND|THE|THEN|NEXT|,|\./)
//       .filter(token => token.length > 0);
    
//     console.log("Secret tokens:", tokens);
    
//     let newCharacters = "";
    
//     for (let token of tokens) {
//       // Remove any non-alphanumeric characters
//       const cleanToken = token.replace(/[^A-Z0-9]/g, '');
      
//       if (cleanToken.length === 1) {
//         // Single character (letter or digit)
//         if (secretRef.current.length === 0 || 
//             cleanToken !== secretRef.current[secretRef.current.length - 1]) {
//           newCharacters += cleanToken;
//         }
//       } else if (cleanToken.length > 1) {
//         // Handle multi-character tokens
//         for (let char of cleanToken) {
//           if (secretRef.current.length === 0 || 
//               char !== secretRef.current[secretRef.current.length - 1]) {
//             newCharacters += char;
//           }
//         }
//       }
//     }
    
//     if (newCharacters.length > 0) {
//       // Add to current secret code
//       const newSecretCode = secretRef.current + newCharacters;
//       setFormData(prev => ({ ...prev, secret_code: newSecretCode }));
//       secretRef.current = newSecretCode;
      
//       // Give immediate feedback
//       if (newCharacters.length === 1) {
//         speak(`Character ${newCharacters}`);
//       } else if (newCharacters.length > 1) {
//         speak(newCharacters.split('').join(' '));
//       }
      
//       console.log("Updated secret code:", secretRef.current);
//     }
//   };

//   // Handle next step
//   const handleNext = async () => {
//     if (mode === "name") {
//       if (!nameRef.current.trim()) {
//         await speak("Please provide your name first");
//         return;
//       }
//       await speak("Please say your phone number. For example: Phone number is 1234567890");
//       setStatus("Say your phone number. For example: 'Phone number is 1234567890'");
//       setMode("phone");
//     } else if (mode === "phone") {
//       if (!phoneRef.current.trim()) {
//         await speak("Please provide your phone number first");
//         return;
//       }
//       await speak("Please create your secret code. Spell it letter by letter. For example: V I S I O N 1");
//       setStatus("Spell your secret code letter by letter. For example: 'V I S I O N 1'");
//       setMode("secret");
//     } else if (mode === "secret") {
//       if (!secretRef.current.trim()) {
//         await speak("Please create your secret code first");
//         return;
//       }
//       // Ready to submit
//       await speak(`Ready to create account. Name: ${nameRef.current}. Phone: ${phoneRef.current.split('').join(' ')}. Secret code: ${secretRef.current.split('').join(' ')}. Say 'submit' to create account.`);
//       setStatus(`Ready to create account. Say 'submit' to create account.`);
//     }
//   };

//   const handleSignup = async () => {
//     console.log("handleSignup called with:", { 
//       name: nameRef.current, 
//       phone: phoneRef.current, 
//       secret: secretRef.current 
//     });
    
//     // Use ref values which are always up-to-date
//     const currentName = nameRef.current;
//     const currentPhone = phoneRef.current;
//     const currentSecret = secretRef.current;
    
//     if (!currentName.trim()) {
//       const errorMsg = "Please enter your name";
//       setStatus(errorMsg);
//       await speak(errorMsg);
//       setMode("name");
//       return;
//     }
//     if (!currentPhone.trim()) {
//       const errorMsg = "Please enter your phone number";
//       setStatus(errorMsg);
//       await speak(errorMsg);
//       setMode("phone");
//       return;
//     }
//     if (!currentSecret.trim()) {
//       const errorMsg = "Please enter your secret code";
//       setStatus(errorMsg);
//       await speak(errorMsg);
//       setMode("secret");
//       return;
//     }

//     try {
//       setStatus("Creating your account...");
//       await speak("Creating your account...");

//       const payload = {
//         greeting_name: currentName,
//         phone_number: currentPhone,
//         voice_secret: currentSecret
//       };

//       const response = await axios.post(
//         "http://127.0.0.1:8000/auth/voice-register/",
//         payload
//       );

//       console.log("Signup response:", response.data);

//       if (response.data.access_token) {
//         const user = {
//           id: response.data.user_id,
//           name: currentName
//         };
//         localStorage.setItem("user", JSON.stringify(user));
//         localStorage.setItem("token", response.data.access_token);
//         setStatus("Signup successful! Redirecting to dashboard...");
//         await speak("Signup successful! Redirecting to dashboard.");
//         setTimeout(() => navigate("/dashboard"), 2000);
//       }
//     } catch (error) {
//       console.error("Signup error:", error);
//       let errorMessage = "Signup failed. Please try again.";
//       if (error.response?.data?.spoken_response) {
//         errorMessage = error.response.data.spoken_response;
//       }
//       setStatus(errorMessage);
//       await speak(errorMessage);
//     }
//   };

//   const goToLogin = () => navigate("/");

//   // Toggle voice control
//   const toggleVoiceControl = async () => {
//     if (voiceActive) {
//       await speak("Voice control stopped");
//       voiceService.stopListening();
//       setVoiceActive(false);
//     } else {
//       voiceService.startListening();
//       setVoiceActive(true);
//       await speak("Voice control started");
//     }
//   };

//   // Handle input change
//   const handleInputChange = (field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: value
//     }));
    
//     // Update refs
//     if (field === "name") nameRef.current = value;
//     if (field === "phone") phoneRef.current = value;
//     if (field === "secret_code") secretRef.current = value;
//   };

//   return (
//     <div className="voice-login-container">
//       <div className="voice-card">
//         <h1 className="title">Vision Assist</h1>
        
//         {/* Voice Status */}
//         <div className="voice-control-section">
//           <button 
//             onClick={toggleVoiceControl}
//             className={`voice-toggle-btn ${voiceActive ? 'active' : ''}`}
//             disabled={isSpeaking}
//           >
//             {voiceActive ? '🎤 Listening...' : '🎤 Start Voice'}
//             {isSpeaking && <span className="speaking-indicator"> 🔊 Speaking...</span>}
//           </button>
          
//           <div className="mode-indicator">
//             <span className="mode-text">{mode.toUpperCase()} MODE</span>
//             <span className="listening-status">
//               {voiceActive ? '🔊 Active' : '🔇 Muted'}
//             </span>
//           </div>
          
//           {spokenText && (
//             <div className="spoken-text">
//               <span className="spoken-label">Heard:</span> <strong>{spokenText}</strong>
//             </div>
//           )}
//         </div>

//         {/* Status Message */}
//         <p className="status">{status}</p>

//         {/* Input Section */}
//         <div className="input-section">
//           <div className="input-group">
//             <div className="input-label">Name:</div>
//             <input
//               type="text"
//               placeholder="Enter your full name"
//               value={formData.name}
//               onChange={(e) => handleInputChange("name", e.target.value)}
//               className="input-field"
//               disabled={isSpeaking}
//             />
//             {formData.name && <div className="input-hint">✓ Name entered</div>}
//           </div>

//           <div className="input-group">
//             <div className="input-label">Phone:</div>
//             <input
//               type="text"
//               placeholder="Enter your phone number"
//               value={formData.phone}
//               onChange={(e) => handleInputChange("phone", e.target.value)}
//               className="input-field"
//               disabled={isSpeaking}
//             />
//             {formData.phone && <div className="input-hint">✓ Phone entered</div>}
//           </div>

//           <div className="input-group">
//             <div className="input-label">Secret Code:</div>
//             <input
//               type="text"
//               placeholder="Create your secret code"
//               value={formData.secret_code}
//               onChange={(e) => handleInputChange("secret_code", e.target.value)}
//               className="input-field"
//               disabled={isSpeaking}
//             />
//             {formData.secret_code && (
//               <div className="input-hint">
//                 ✓ Code: {formData.secret_code.split('').join(' ')}
//               </div>
//             )}
//           </div>

//           {formData.name && formData.phone && formData.secret_code && (
//             <div className="input-ready">
//               ✓ All fields filled. Say "submit" to create account
//             </div>
//           )}

//           <button 
//             className="action-btn" 
//             onClick={handleSignup}
//             disabled={isSpeaking}
//           >
//             Create Account
//           </button>
//         </div>

//         {/* Voice Commands Help */}
//         <div className="voice-hints">
//           <p className="hint-text">🎤 Voice Commands:</p>
//           <div className="command-chips">
//             {mode === "name" && (
//               <>
//                 <span className="command-chip">"My name is [name]"</span>
//                 <span className="command-chip">"Next" to continue</span>
//                 <span className="command-chip">"Phone" for phone</span>
//               </>
//             )}
//             {mode === "phone" && (
//               <>
//                 <span className="command-chip">"Phone number is [number]"</span>
//                 <span className="command-chip">"Next" to continue</span>
//                 <span className="command-chip">"Secret" for code</span>
//                 <span className="command-chip">"Name" to go back</span>
//               </>
//             )}
//             {mode === "secret" && (
//               <>
//                 <span className="command-chip">Spell code letters</span>
//                 <span className="command-chip">"Submit" to create</span>
//                 <span className="command-chip">"Clear" to restart</span>
//                 <span className="command-chip">"Phone" to go back</span>
//               </>
//             )}
//             <span className="command-chip">"Help" for assistance</span>
//             <span className="command-chip">"Back" to login</span>
//           </div>
//         </div>

//         {/* Navigation Buttons */}
//         <div className="nav-buttons">
//           <button 
//             className="nav-btn" 
//             onClick={goToLogin}
//             disabled={isSpeaking}
//           >
//             Already have an account? Login
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;


import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { voiceService } from "../../services/voiceService";
import "./Login.css";

const Signup = () => {
  const [status, setStatus] = useState("Create your Vision Assist account");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    secret_code: ""
  });
  const [voiceActive, setVoiceActive] = useState(true);
  const [spokenText, setSpokenText] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const navigate = useNavigate();

  // Refs
  const nameRef = useRef("");
  const phoneRef = useRef("");
  const secretRef = useRef("");
  const lastTranscriptRef = useRef("");
  const isProcessingRef = useRef(false);

  // Initialize refs when state changes
  useEffect(() => {
    nameRef.current = formData.name;
  }, [formData.name]);

  useEffect(() => {
    phoneRef.current = formData.phone;
  }, [formData.phone]);

  useEffect(() => {
    secretRef.current = formData.secret_code;
  }, [formData.secret_code]);

  // Speak function
  const speak = (text, callback) => {
    return new Promise((resolve) => {
      const synth = window.speechSynthesis;
      if (!synth) {
        if (callback) callback();
        resolve();
        return;
      }
      
      synth.cancel();
      setIsSpeaking(true);
      
      const utter = new SpeechSynthesisUtterance(text);
      utter.rate = 0.8;
      utter.pitch = 1;
      utter.volume = 1;
      
      utter.onstart = () => {
        console.log("Started speaking:", text);
        if (voiceService.isListening) {
          voiceService.stopListening();
        }
      };
      
      utter.onend = () => {
        console.log("Finished speaking");
        setIsSpeaking(false);
        
        setTimeout(() => {
          if (voiceActive && !isSpeaking) {
            voiceService.startListening();
          }
        }, 500);
        
        if (callback) callback();
        resolve();
      };
      
      utter.onerror = (err) => {
        console.error("Speech error:", err);
        setIsSpeaking(false);
        setTimeout(() => {
          if (voiceActive && !isSpeaking) {
            voiceService.startListening();
          }
        }, 500);
        resolve();
      };
      
      synth.speak(utter);
    });
  };

  // Initialize voice on mount
  useEffect(() => {
    // Check voice support
    if (!voiceService.isAvailable()) {
      setStatus("Voice recognition not available. Please type your details.");
      return;
    }

    // Initial message
    setTimeout(async () => {
      await speak("Welcome to sign up. Please say your name, phone number, and secret code. Example: My name is John, phone number is 1234567890, and secret code is VISION1. Or say 'help' for commands.");
      setStatus("Say your name, phone number, and secret code. Or say 'help' for assistance.");
      
      // Start voice service
      voiceService.startListening();
    }, 800);

    // Register voice commands
    registerVoiceCommands();

    return () => {
      voiceService.stopListening();
      voiceService.onResultCallback = null;
      voiceService.clearCommands();
    };
  }, []);

  // Register voice commands
  const registerVoiceCommands = () => {
    console.log("Registering voice commands for Signup page");
    
    // Clear existing commands
    voiceService.clearCommands();
    
    // Handle all voice input
    voiceService.onResultCallback = async (transcript) => {
      if (isProcessingRef.current) return;
      isProcessingRef.current = true;
      
      console.log("Voice input:", transcript);
      
      const cleanTranscript = transcript.toLowerCase().trim();
      
      // Prevent duplicate processing
      if (cleanTranscript === lastTranscriptRef.current) {
        console.log("Duplicate transcript, skipping");
        isProcessingRef.current = false;
        return;
      }
      
      lastTranscriptRef.current = cleanTranscript;
      setSpokenText(cleanTranscript);
      
      try {
        // Process voice input
        await processVoiceInput(cleanTranscript);
      } finally {
        isProcessingRef.current = false;
      }
    };
  };

  // Process voice input
  const processVoiceInput = async (transcript) => {
    console.log("Processing voice input:", transcript);
    
    // Check for help command first
    if (transcript.includes('help')) {
      await speak("Available commands: Say 'My name is [name]' to set name. Say 'Phone number is [number]' to set phone. Say 'Secret code is [code]' to set code. Say 'Clear name' to clear name field. Say 'Clear phone' to clear phone. Say 'Clear code' to clear secret code. Say 'Clear all' to clear everything. Say 'Submit' to create account. Say 'Back' to return to login.");
      return;
    }
    
    // Check for clear commands
    if (transcript.includes('clear name') || transcript.includes('clear my name')) {
      setFormData(prev => ({ ...prev, name: "" }));
      nameRef.current = "";
      await speak("Name cleared");
      return;
    }
    
    if (transcript.includes('clear phone') || transcript.includes('clear my phone') || transcript.includes('clear number')) {
      setFormData(prev => ({ ...prev, phone: "" }));
      phoneRef.current = "";
      await speak("Phone number cleared");
      return;
    }
    
    if (transcript.includes('clear code') || transcript.includes('clear secret') || transcript.includes('clear secret code')) {
      setFormData(prev => ({ ...prev, secret_code: "" }));
      secretRef.current = "";
      await speak("Secret code cleared");
      return;
    }
    
    if (transcript.includes('clear all') || transcript.includes('clear everything')) {
      setFormData({ name: "", phone: "", secret_code: "" });
      nameRef.current = "";
      phoneRef.current = "";
      secretRef.current = "";
      await speak("All fields cleared");
      return;
    }
    
    // Check for navigation commands
    if (transcript.includes('back') || transcript.includes('go back') || transcript.includes('return to login') || transcript.includes('back to login')) {
      await speak("Going back to login page");
      navigate("/");
      return;
    }
    
    // Check for submit command
    if (transcript.includes('submit') || transcript.includes('create account') || transcript.includes('sign up') || transcript.includes('register')) {
      await handleSignup();
      return;
    }
    
    // Process name
    let nameChanged = false;
    const namePatterns = [
      /my name is\s+([a-zA-Z\s]{2,})/i,
      /i am\s+([a-zA-Z\s]{2,})/i,
      /name is\s+([a-zA-Z\s]{2,})/i,
      /call me\s+([a-zA-Z\s]{2,})/i,
      /it's\s+([a-zA-Z\s]{2,})/i,
      /it is\s+([a-zA-Z\s]{2,})/i
    ];
    
    for (const pattern of namePatterns) {
      const match = transcript.match(pattern);
      if (match && match[1]) {
        const extractedName = match[1].trim();
        if (extractedName.length > 1) {
          setFormData(prev => ({ ...prev, name: extractedName }));
          nameRef.current = extractedName;
          nameChanged = true;
          break;
        }
      }
    }
    
    // Process phone
    let phoneChanged = false;
    const phonePatterns = [
      /phone number is\s+([0-9\s\-+]{10,})/i,
      /my number is\s+([0-9\s\-+]{10,})/i,
      /number is\s+([0-9\s\-+]{10,})/i,
      /phone is\s+([0-9\s\-+]{10,})/i,
      /contact number is\s+([0-9\s\-+]{10,})/i,
      /mobile number is\s+([0-9\s\-+]{10,})/i
    ];
    
    for (const pattern of phonePatterns) {
      const match = transcript.match(pattern);
      if (match && match[1]) {
        const extractedPhone = match[1].replace(/\D/g, '');
        if (extractedPhone.length >= 10) {
          setFormData(prev => ({ ...prev, phone: extractedPhone }));
          phoneRef.current = extractedPhone;
          phoneChanged = true;
          break;
        }
      }
    }
    
    // Process secret code
    let secretChanged = false;
    const secretPatterns = [
      /secret code is\s+([a-zA-Z0-9\s]{3,})/i,
      /secret is\s+([a-zA-Z0-9\s]{3,})/i,
      /code is\s+([a-zA-Z0-9\s]{3,})/i,
      /password is\s+([a-zA-Z0-9\s]{3,})/i
    ];
    
    for (const pattern of secretPatterns) {
      const match = transcript.match(pattern);
      if (match && match[1]) {
        // Convert the secret code
        let secretText = match[1].toUpperCase().trim();
        
        // Convert number words to digits
        secretText = secretText
          .replace(/ZERO/g, '0')
          .replace(/ONE/g, '1')
          .replace(/TWO/g, '2')
          .replace(/THREE/g, '3')
          .replace(/FOUR/g, '4')
          .replace(/FIVE/g, '5')
          .replace(/SIX/g, '6')
          .replace(/SEVEN/g, '7')
          .replace(/EIGHT/g, '8')
          .replace(/NINE/g, '9');
        
        // Remove spaces and non-alphanumeric characters
        const extractedSecret = secretText.replace(/[^A-Z0-9]/g, '');
        
        if (extractedSecret.length >= 3) {
          setFormData(prev => ({ ...prev, secret_code: extractedSecret }));
          secretRef.current = extractedSecret;
          secretChanged = true;
          break;
        }
      }
    }
    
    // Also look for combined statements
    if (!nameChanged) {
      // Try to extract name from beginning of sentence
      const words = transcript.split(/\s+/);
      if (words.length >= 2 && words[0] === 'my' && words[1] === 'name') {
        const nameStart = transcript.indexOf('name') + 5;
        const restOfSentence = transcript.substring(nameStart);
        const nextComma = restOfSentence.indexOf(',');
        const nextAnd = restOfSentence.indexOf(' and ');
        
        let nameEnd = Math.min(
          nextComma > 0 ? nextComma : Infinity,
          nextAnd > 0 ? nextAnd : Infinity
        );
        
        if (nameEnd === Infinity) nameEnd = restOfSentence.length;
        
        const extractedName = restOfSentence.substring(0, nameEnd).trim();
        if (extractedName.length > 1) {
          setFormData(prev => ({ ...prev, name: extractedName }));
          nameRef.current = extractedName;
          nameChanged = true;
        }
      }
    }
    
    if (!phoneChanged) {
      // Try to extract phone from sentence with "phone"
      const phoneIndex = transcript.indexOf('phone');
      if (phoneIndex !== -1) {
        const afterPhone = transcript.substring(phoneIndex + 5);
        const phoneMatch = afterPhone.match(/\d+/g);
        if (phoneMatch) {
          const extractedPhone = phoneMatch.join('');
          if (extractedPhone.length >= 10) {
            setFormData(prev => ({ ...prev, phone: extractedPhone }));
            phoneRef.current = extractedPhone;
            phoneChanged = true;
          }
        }
      }
    }
    
    if (!secretChanged) {
      // Try to extract secret from sentence with "secret" or "code"
      const secretIndex = Math.max(
        transcript.indexOf('secret'),
        transcript.indexOf('code')
      );
      
      if (secretIndex !== -1) {
        const afterSecret = transcript.substring(secretIndex);
        const words = afterSecret.split(/\s+/);
        
        // Look for alphanumeric sequence
        let secretParts = [];
        for (let i = 1; i < words.length && i < 10; i++) {
          const word = words[i];
          if (/^[a-z0-9]+$/i.test(word)) {
            secretParts.push(word.toUpperCase());
          } else {
            break;
          }
        }
        
        if (secretParts.length >= 3) {
          const extractedSecret = secretParts.join('').replace(/[^A-Z0-9]/g, '');
          if (extractedSecret.length >= 3) {
            setFormData(prev => ({ ...prev, secret_code: extractedSecret }));
            secretRef.current = extractedSecret;
            secretChanged = true;
          }
        }
      }
    }
    
    // Give feedback on what was captured
    let feedback = "";
    if (nameChanged) feedback += `Name: ${nameRef.current}. `;
    if (phoneChanged) feedback += `Phone: ${phoneRef.current.split('').join(' ')}. `;
    if (secretChanged) feedback += `Secret code: ${secretRef.current.split('').join(' ')}. `;
    
    if (feedback) {
      await speak(feedback + "Say 'submit' to create account or add more information.");
    }
  };

  const handleSignup = async () => {
    console.log("handleSignup called with:", { 
      name: nameRef.current, 
      phone: phoneRef.current, 
      secret: secretRef.current 
    });
    
    // Use ref values which are always up-to-date
    const currentName = nameRef.current;
    const currentPhone = phoneRef.current;
    const currentSecret = secretRef.current;
    
    if (!currentName.trim()) {
      const errorMsg = "Please enter your name";
      setStatus(errorMsg);
      await speak(errorMsg);
      return;
    }
    if (!currentPhone.trim()) {
      const errorMsg = "Please enter your phone number";
      setStatus(errorMsg);
      await speak(errorMsg);
      return;
    }
    if (!currentSecret.trim()) {
      const errorMsg = "Please enter your secret code";
      setStatus(errorMsg);
      await speak(errorMsg);
      return;
    }

    try {
      setStatus("Creating your account...");
      await speak("Creating your account...");

      const payload = {
        greeting_name: currentName,
        phone_number: currentPhone,
        voice_secret: currentSecret
      };

      const response = await axios.post(
        "http://127.0.0.1:8000/auth/voice-register/",
        payload
      );

      console.log("Signup response:", response.data);

      if (response.data.access_token) {
        const user = {
          id: response.data.user_id,
          name: currentName
        };
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", response.data.access_token);
        setStatus("Signup successful! Redirecting to dashboard...");
        await speak("Signup successful! Redirecting to dashboard.");
        setTimeout(() => navigate("/dashboard"), 2000);
      }
    } catch (error) {
      console.error("Signup error:", error);
      let errorMessage = "Signup failed. Please try again.";
      if (error.response?.data?.spoken_response) {
        errorMessage = error.response.data.spoken_response;
      }
      setStatus(errorMessage);
      await speak(errorMessage);
    }
  };

  const goToLogin = () => navigate("/");

  // Toggle voice control
  const toggleVoiceControl = async () => {
    if (voiceActive) {
      await speak("Voice control stopped");
      voiceService.stopListening();
      setVoiceActive(false);
    } else {
      voiceService.startListening();
      setVoiceActive(true);
      await speak("Voice control started");
    }
  };

  // Handle input change
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Update refs
    if (field === "name") nameRef.current = value;
    if (field === "phone") phoneRef.current = value;
    if (field === "secret_code") secretRef.current = value;
  };

  return (
    <div className="voice-login-container">
      <div className="voice-card">
        <h1 className="title">Vision Assist</h1>
        
        {/* Voice Status */}
        <div className="voice-control-section">
          <button 
            onClick={toggleVoiceControl}
            className={`voice-toggle-btn ${voiceActive ? 'active' : ''}`}
            disabled={isSpeaking}
          >
            {voiceActive ? '🎤 Listening...' : '🎤 Start Voice'}
            {isSpeaking && <span className="speaking-indicator"> 🔊 Speaking...</span>}
          </button>
          
          <div className="mode-indicator">
            <span className="mode-text">SIGNUP</span>
            <span className="listening-status">
              {voiceActive ? '🔊 Active' : '🔇 Muted'}
            </span>
          </div>
          
          {spokenText && (
            <div className="spoken-text">
              <span className="spoken-label">Heard:</span> <strong>{spokenText}</strong>
            </div>
          )}
        </div>

        {/* Status Message */}
        <p className="status">{status}</p>

        {/* Input Section */}
        <div className="input-section">
          <div className="input-group">
            <div className="input-label">Name:</div>
            <input
              type="text"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="input-field"
              disabled={isSpeaking}
            />
            {formData.name && <div className="input-hint">✓ {formData.name}</div>}
          </div>

          <div className="input-group">
            <div className="input-label">Phone:</div>
            <input
              type="text"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              className="input-field"
              disabled={isSpeaking}
            />
            {formData.phone && <div className="input-hint">✓ {formData.phone}</div>}
          </div>

          <div className="input-group">
            <div className="input-label">Secret Code:</div>
            <input
              type="text"
              placeholder="Create your secret code"
              value={formData.secret_code}
              onChange={(e) => handleInputChange("secret_code", e.target.value)}
              className="input-field"
              disabled={isSpeaking}
            />
            {formData.secret_code && (
              <div className="input-hint">
                ✓ {formData.secret_code.split('').join(' ')}
              </div>
            )}
          </div>

          {formData.name && formData.phone && formData.secret_code && (
            <div className="input-ready">
              ✓ All fields filled. Say "submit" to create account
            </div>
          )}

          <button 
            className="action-btn" 
            onClick={handleSignup}
            disabled={isSpeaking}
          >
            Create Account
          </button>
        </div>

        {/* Voice Commands Help */}
        <div className="voice-hints">
          <p className="hint-text">🎤 Voice Commands:</p>
          <div className="command-chips">
            <span className="command-chip">"My name is [name]"</span>
            <span className="command-chip">"Phone number is [number]"</span>
            <span className="command-chip">"Secret code is [code]"</span>
            <span className="command-chip">"Clear name/phone/code"</span>
            <span className="command-chip">"Submit" to create</span>
            <span className="command-chip">"Back" to login</span>
            <span className="command-chip">"Help" for assistance</span>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="nav-buttons">
          <button 
            className="nav-btn" 
            onClick={goToLogin}
            disabled={isSpeaking}
          >
            Already have an account? Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;