// // import React, { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import axios from "axios";
// // import "./Login.css";

// // const Forgot = () => {
// //   const [status, setStatus] = useState("Retrieve your secret code");
// //   const [phone, setPhone] = useState("");
// //   const [name, setName] = useState("");
// //   const navigate = useNavigate();

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

// //   const handleForgot = async () => {
// //     if (!phone.trim() || !name.trim()) {
// //       setStatus("Please provide both your registered name and phone number");
// //       speak("Please provide both your registered name and phone number");
// //       return;
// //     }

// //     try {
// //       setStatus("Checking account...");
// //       speak("Checking account...");

// //       const response = await axios.post(
// //         "http://127.0.0.1:8000/auth/forgot-secret/",
// //         { phone_number: phone, greeting_name: name }
// //       );

// //       if (response.data.secret_code) {
// //         setStatus(`Your secret code is: ${response.data.secret_code}`);
// //         speak(`Hello ${response.data.greeting_name}! Your secret code is ${response.data.secret_code}`);
// //       }
// //     } catch (error) {
// //       let errorMessage = "Account not found or backend error";
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
// //         <h1 className="title">Forgot Secret Code</h1>
// //         <p className="status">{status}</p>

// //         <div className="button-group">
// //           <div className="input-group">
// //             <input
// //               type="text"
// //               placeholder="Enter your registered name"
// //               value={name}
// //               onChange={(e) => setName(e.target.value)}
// //               className="input-field"
// //             />
// //           </div>
// //           <div className="input-group">
// //             <input
// //               type="text"
// //               placeholder="Enter your registered phone number"
// //               value={phone}
// //               onChange={(e) => setPhone(e.target.value)}
// //               className="input-field"
// //             />
// //           </div>

// //           <button className="action-btn" onClick={handleForgot}>
// //             Retrieve Secret Code
// //           </button>

// //           <button className="restart-btn" onClick={goToLogin}>
// //             Back to Login
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Forgot;



// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { voiceService } from "../../services/voiceService";
// import "./Login.css";

// const Forgot = () => {
//   const [status, setStatus] = useState("Retrieve your secret code");
//   const [phone, setPhone] = useState("");
//   const [name, setName] = useState("");
//   const [voiceActive, setVoiceActive] = useState(true);
//   const [spokenText, setSpokenText] = useState("");
//   const [isSpeaking, setIsSpeaking] = useState(false);
//   const navigate = useNavigate();

//   // Refs
//   const nameRef = useRef("");
//   const phoneRef = useRef("");
//   const lastTranscriptRef = useRef("");

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
//       await speak("Forgot secret code page. Please say your name and phone number. Or say 'help' for assistance.");
//       setStatus("Say your name and phone number. Or say 'help' for assistance.");
      
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

//   // Register voice commands
//   const registerVoiceCommands = () => {
//     console.log("Registering voice commands for Forgot page");
    
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
//     voiceService.registerCommand("retrieve", async () => {
//       await handleForgot();
//     });
    
//     voiceService.registerCommand("submit", async () => {
//       await handleForgot();
//     });
    
//     voiceService.registerCommand("get code", async () => {
//       await handleForgot();
//     });
    
//     voiceService.registerCommand("get secret code", async () => {
//       await handleForgot();
//     });
    
//     // Help command
//     voiceService.registerCommand("help", async () => {
//       await speak("Say your name and phone number. For example: 'My name is John and my phone number is 1234567890'. Then say 'retrieve' to get your secret code. Say 'back' to return to login.");
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
//       console.log("Voice input:", transcript);
      
//       const cleanTranscript = transcript.toLowerCase().trim();
      
//       // Prevent duplicate processing
//       if (cleanTranscript === lastTranscriptRef.current) {
//         console.log("Duplicate transcript, skipping");
//         return;
//       }
      
//       lastTranscriptRef.current = cleanTranscript;
//       setSpokenText(cleanTranscript);
      
//       // Process voice input for name and phone
//       processVoiceInput(cleanTranscript);
//     };
//   };

//   // Process voice input for name and phone
//   const processVoiceInput = (transcript) => {
//     console.log("Processing voice input:", transcript);
    
//     // Extract name
//     const nameMatch = transcript.match(/(?:my name is|i am|name is|call me)\s+([a-zA-Z\s]{2,})/i);
//     if (nameMatch && nameMatch[1]) {
//       const extractedName = nameMatch[1].trim();
//       setName(extractedName);
//       nameRef.current = extractedName;
//       speak(`Name set to ${extractedName}`);
//     }
    
//     // Extract phone number
//     const phoneMatch = transcript.match(/(?:phone number is|my number is|number is|phone is)\s+([0-9\s\-+]{10,})/i);
//     if (phoneMatch && phoneMatch[1]) {
//       // Clean phone number - keep only digits
//       const extractedPhone = phoneMatch[1].replace(/\D/g, '');
//       if (extractedPhone.length >= 10) {
//         setPhone(extractedPhone);
//         phoneRef.current = extractedPhone;
//         speak(`Phone number set to ${extractedPhone.split('').join(' ')}`);
//       }
//     }
    
//     // Check for direct name and phone in one sentence
//     const directMatch = transcript.match(/([a-zA-Z\s]{2,})\s+(?:and|with)\s+(?:phone|number)\s+([0-9\s\-+]{10,})/i);
//     if (directMatch && directMatch[1] && directMatch[2]) {
//       const extractedName = directMatch[1].trim();
//       const extractedPhone = directMatch[2].replace(/\D/g, '');
      
//       if (extractedName.length > 1) {
//         setName(extractedName);
//         nameRef.current = extractedName;
//       }
      
//       if (extractedPhone.length >= 10) {
//         setPhone(extractedPhone);
//         phoneRef.current = extractedPhone;
//         speak(`Name set to ${extractedName} and phone number set to ${extractedPhone.split('').join(' ')}`);
//       }
//     }
//   };

//   const handleForgot = async () => {
//     if (!phone.trim() || !name.trim()) {
//       setStatus("Please provide both your registered name and phone number");
//       await speak("Please provide both your registered name and phone number");
//       return;
//     }

//     try {
//       setStatus("Checking account...");
//       await speak("Checking account...");

//       const response = await axios.post(
//         "http://127.0.0.1:8000/auth/forgot-secret/",
//         { phone_number: phone, greeting_name: name }
//       );

//       if (response.data.secret_code) {
//         const formattedCode = response.data.secret_code.split('').join(' ');
//         setStatus(`Hello ${response.data.greeting_name}! Your secret code is: ${formattedCode}`);
//         await speak(`Hello ${response.data.greeting_name}! Your secret code is ${response.data.secret_code}`);
//       }
//     } catch (error) {
//       let errorMessage = "Account not found or backend error";
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

//   return (
//     <div className="voice-login-container">
//       <div className="voice-card">
//         <h1 className="title">Forgot Secret Code</h1>
        
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
//             <span className="mode-text">VOICE RECOVERY</span>
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
//             <input
//               type="text"
//               placeholder="Enter your registered name"
//               value={name}
//               onChange={(e) => {
//                 setName(e.target.value);
//                 nameRef.current = e.target.value;
//               }}
//               className="input-field"
//               disabled={isSpeaking}
//             />
//           </div>
          
//           <div className="input-group">
//             <input
//               type="text"
//               placeholder="Enter your registered phone number"
//               value={phone}
//               onChange={(e) => {
//                 setPhone(e.target.value);
//                 phoneRef.current = e.target.value;
//               }}
//               className="input-field"
//               disabled={isSpeaking}
//             />
//           </div>

//           <button 
//             className="action-btn" 
//             onClick={handleForgot}
//             disabled={isSpeaking}
//           >
//             Retrieve Secret Code
//           </button>
//         </div>

//         {/* Voice Commands Help */}
//         <div className="voice-hints">
//           <p className="hint-text">🎤 Voice Commands:</p>
//           <div className="command-chips">
//             <span className="command-chip">"My name is [your name]"</span>
//             <span className="command-chip">"Phone number is [number]"</span>
//             <span className="command-chip">"Retrieve" or "Submit"</span>
//             <span className="command-chip">"Back" or "Login"</span>
//             <span className="command-chip">"Help" for assistance</span>
//           </div>
//         </div>

//         {/* Navigation Buttons */}
//         <div className="nav-buttons">
//           <button 
//             className="nav-btn" 
//             onClick={goToLogin}
//             disabled={isSpeaking}
//           >
//             Back to Login
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Forgot;




import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { voiceService } from "../../services/voiceService";
import "./Login.css";

const Forgot = () => {
  const [status, setStatus] = useState("Retrieve your secret code");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [voiceActive, setVoiceActive] = useState(true);
  const [spokenText, setSpokenText] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const navigate = useNavigate();

  // Refs
  const nameRef = useRef("");
  const phoneRef = useRef("");
  const lastTranscriptRef = useRef("");

  // Initialize refs when state changes
  useEffect(() => {
    nameRef.current = name;
  }, [name]);

  useEffect(() => {
    phoneRef.current = phone;
  }, [phone]);

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
      await speak("Forgot secret code page. Please say your name and phone number. Or say 'help' for assistance.");
      setStatus("Say your name and phone number. Or say 'help' for assistance.");
      
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
    console.log("Registering voice commands for Forgot page");
    
    // Clear existing commands
    voiceService.clearCommands();
    
    // Navigation commands
    voiceService.registerCommand("back", async () => {
      await speak("Going back to login page");
      navigate("/");
    });
    
    voiceService.registerCommand("back to login", async () => {
      await speak("Going back to login page");
      navigate("/");
    });
    
    voiceService.registerCommand("login", async () => {
      await speak("Going to login page");
      navigate("/");
    });
    
    voiceService.registerCommand("home", async () => {
      await speak("Going back to login page");
      navigate("/");
    });
    
    // Action commands
    voiceService.registerCommand("retrieve", async () => {
      await handleForgot();
    });
    
    voiceService.registerCommand("submit", async () => {
      await handleForgot();
    });
    
    voiceService.registerCommand("get code", async () => {
      await handleForgot();
    });
    
    voiceService.registerCommand("get secret code", async () => {
      await handleForgot();
    });
    
    // Help command
    voiceService.registerCommand("help", async () => {
      await speak("Say your name and phone number. For example: 'My name is John and my phone number is 1234567890'. Then say 'retrieve' to get your secret code. Say 'back' to return to login.");
    });
    
    // Voice control commands
    voiceService.registerCommand("stop", async () => {
      await speak("Voice control stopped");
      voiceService.stopListening();
      setVoiceActive(false);
    });
    
    voiceService.registerCommand("start", async () => {
      await speak("Voice control started");
      voiceService.startListening();
      setVoiceActive(true);
    });

    // Handle all voice input
    voiceService.onResultCallback = (transcript) => {
      console.log("Voice input:", transcript);
      
      const cleanTranscript = transcript.toLowerCase().trim();
      
      // Prevent duplicate processing
      if (cleanTranscript === lastTranscriptRef.current) {
        console.log("Duplicate transcript, skipping");
        return;
      }
      
      lastTranscriptRef.current = cleanTranscript;
      setSpokenText(cleanTranscript);
      
      // Process voice input for name and phone
      processVoiceInput(cleanTranscript);
    };
  };

  // Process voice input for name and phone
  const processVoiceInput = (transcript) => {
    console.log("Processing voice input:", transcript);
    
    let nameChanged = false;
    let phoneChanged = false;
    
    // Extract name using multiple patterns
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
          setName(extractedName);
          nameRef.current = extractedName;
          nameChanged = true;
          break;
        }
      }
    }
    
    // Extract phone number using multiple patterns
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
        // Clean phone number - keep only digits
        const extractedPhone = match[1].replace(/\D/g, '');
        if (extractedPhone.length >= 10) {
          setPhone(extractedPhone);
          phoneRef.current = extractedPhone;
          phoneChanged = true;
          break;
        }
      }
    }
    
    // Check for combined pattern
    const combinedPattern = /([a-zA-Z\s]{2,})\s+(?:and|with)\s+(?:phone|number|contact|mobile)\s+([0-9\s\-+]{10,})/i;
    const combinedMatch = transcript.match(combinedPattern);
    if (combinedMatch && combinedMatch[1] && combinedMatch[2]) {
      const extractedName = combinedMatch[1].trim();
      const extractedPhone = combinedMatch[2].replace(/\D/g, '');
      
      if (extractedName.length > 1) {
        setName(extractedName);
        nameRef.current = extractedName;
        nameChanged = true;
      }
      
      if (extractedPhone.length >= 10) {
        setPhone(extractedPhone);
        phoneRef.current = extractedPhone;
        phoneChanged = true;
      }
    }
    
    // Give feedback
    if (nameChanged && phoneChanged) {
      speak(`Name set to ${nameRef.current} and phone number set to ${phoneRef.current.split('').join(' ')}`);
    } else if (nameChanged) {
      speak(`Name set to ${nameRef.current}`);
    } else if (phoneChanged) {
      speak(`Phone number set to ${phoneRef.current.split('').join(' ')}`);
    }
  };

  const handleForgot = async () => {
    console.log("handleForgot called with:", { name: nameRef.current, phone: phoneRef.current });
    
    // Use ref values which are always up-to-date
    const currentName = nameRef.current;
    const currentPhone = phoneRef.current;
    
    if (!currentPhone.trim() || !currentName.trim()) {
      const errorMsg = "Please provide both your registered name and phone number";
      setStatus(errorMsg);
      await speak(errorMsg);
      return;
    }

    try {
      setStatus("Checking account...");
      await speak("Checking account...");

      const response = await axios.post(
        "http://127.0.0.1:8000/auth/forgot-secret/",
        { 
          phone_number: currentPhone, 
          greeting_name: currentName 
        }
      );

      if (response.data.secret_code) {
        const formattedCode = response.data.secret_code.split('').join(' ');
        const successMsg = `Hello ${response.data.greeting_name}! Your secret code is: ${formattedCode}`;
        setStatus(successMsg);
        await speak(`Hello ${response.data.greeting_name}! Your secret code is ${response.data.secret_code}`);
      }
    } catch (error) {
      console.error("Forgot error:", error);
      let errorMessage = "Account not found or backend error";
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

  return (
    <div className="voice-login-container">
      <div className="voice-card">
        <h1 className="title">Forgot Secret Code</h1>
        
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
            <span className="mode-text">VOICE RECOVERY</span>
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

        {/* Input Section with Current Values Display */}
        <div className="input-section">
          <div className="input-group">
            <div className="input-label">Name:</div>
            <input
              type="text"
              placeholder="Enter your registered name"
              value={name}
              onChange={(e) => {
                const value = e.target.value;
                setName(value);
                nameRef.current = value;
              }}
              className="input-field"
              disabled={isSpeaking}
            />
            {name && <div className="input-hint">✓ Name entered</div>}
          </div>
          
          <div className="input-group">
            <div className="input-label">Phone:</div>
            <input
              type="text"
              placeholder="Enter your registered phone number"
              value={phone}
              onChange={(e) => {
                const value = e.target.value;
                setPhone(value);
                phoneRef.current = value;
              }}
              className="input-field"
              disabled={isSpeaking}
            />
            {phone && <div className="input-hint">✓ Phone entered</div>}
          </div>

          <button 
            className="action-btn" 
            onClick={handleForgot}
            disabled={isSpeaking}
          >
            Retrieve Secret Code
          </button>
          
          {name && phone && (
            <div className="input-ready">
              ✓ Ready to retrieve code
            </div>
          )}
        </div>

        {/* Voice Commands Help */}
        <div className="voice-hints">
          <p className="hint-text">🎤 Voice Commands:</p>
          <div className="command-chips">
            <span className="command-chip">"My name is [name]"</span>
            <span className="command-chip">"Phone number is [number]"</span>
            <span className="command-chip">"Retrieve" or "Submit"</span>
            <span className="command-chip">"Back" or "Login"</span>
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
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Forgot;