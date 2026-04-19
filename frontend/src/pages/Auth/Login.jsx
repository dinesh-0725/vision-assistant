


import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { voiceService } from "../../services/voiceService";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  
  // State
  const [status, setStatus] = useState("Welcome to Vision Assist!");
  const [secretCode, setSecretCode] = useState("");
  const [voiceActive, setVoiceActive] = useState(true);
  const [mode, setMode] = useState("welcome"); // welcome, login, spelling, confirm
  const [spokenText, setSpokenText] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  // Refs
  const secretCodeRef = useRef("");
  const isProcessingRef = useRef(false);
  const silenceTimerRef = useRef(null);
  const lastTranscriptRef = useRef("");
  const commandsRegisteredRef = useRef(false);

  // Helper: Normalize spoken numbers to digits
  const normalizeSpokenNumber = (word) => {
    const numberMap = {
      'ZERO': '0',
      'ONE': '1',
      'TWO': '2',
      'THREE': '3',
      'FOUR': '4',
      'FIVE': '5',
      'SIX': '6',
      'SEVEN': '7',
      'EIGHT': '8',
      'NINE': '9'
    };
    
    return numberMap[word] || word;
  };

  // Speak function
  const speak = (text, callback) => {
    return new Promise((resolve) => {
      const synth = window.speechSynthesis;
      if (!synth) {
        if (callback) callback();
        resolve();
        return;
      }
      
      // Cancel any ongoing speech
      synth.cancel();
      
      setIsSpeaking(true);
      
      const utter = new SpeechSynthesisUtterance(text);
      utter.rate = 0.8;
      utter.pitch = 1;
      utter.volume = 1;
      
      utter.onstart = () => {
        console.log("Started speaking:", text);
        // Pause voice recognition while speaking
        if (voiceService.isListening) {
          voiceService.stopListening();
        }
      };
      
      utter.onend = () => {
        console.log("Finished speaking");
        setIsSpeaking(false);
        
        // Resume voice recognition after a short delay
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
        // Resume voice recognition
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

  // Initialize on mount
  useEffect(() => {
    // Check voice support
    if (!voiceService.isAvailable()) {
      setStatus("Voice recognition not available. Please type your secret code.");
      return;
    }

    // Initial welcome message
    setTimeout(async () => {
      await speak("Welcome to Vision Assistant. Please say: Login, Sign Up, or Forgot Secret Code");
      setStatus("Say: Login, Sign Up, or Forgot Secret Code");
      
      // Start voice service after welcome message
      voiceService.startListening();
    }, 800);

    // Register voice commands
    registerVoiceCommands();

    return () => {
      if (silenceTimerRef.current) {
        clearTimeout(silenceTimerRef.current);
      }
      voiceService.stopListening();
      voiceService.onResultCallback = null;
    };
  }, []);

  // Update commands when mode changes
  useEffect(() => {
    registerVoiceCommands();
  }, [mode]);

  // Register voice commands
  const registerVoiceCommands = () => {
    console.log("Registering commands for mode:", mode);
    
    // Don't clear commands if they're already registered
    if (!commandsRegisteredRef.current) {
      voiceService.clearCommands();
    }
    
    // Common commands for all modes
    voiceService.registerCommand("stop", () => {
      speak("Voice control stopped");
      voiceService.stopListening();
      setVoiceActive(false);
    });
    
    voiceService.registerCommand("start", () => {
      speak("Voice control started");
      voiceService.startListening();
      setVoiceActive(true);
    });
    
    voiceService.registerCommand("help", () => {
      if (mode === "welcome") {
        speak("Say Login to login, Sign Up to create account, or Forgot Secret Code to recover your code");
      } else if (mode === "spelling") {
        speak("Spell your secret code character by character. For numbers, you can say the digit or the word. Example: V I S I O N 1 or VISION ONE");
      } else if (mode === "confirm") {
        speak("Say Yes if the code is correct, or No to try again");
      }
    });

    // Welcome mode commands
    if (mode === "welcome") {
      voiceService.registerCommand("login", async (transcript) => {
        console.log("Login command received:", transcript);
        await speak("Login selected. Please spell your secret code character by character");
        setStatus("Spell your secret code character by character. Say 'clear' to restart.");
        setMode("spelling");
        secretCodeRef.current = "";
        setSecretCode("");
        lastTranscriptRef.current = "";
      });
      
      voiceService.registerCommand("sign up", () => {
        speak("Redirecting to sign up page");
        setTimeout(() => navigate("/signup"), 1000);
      });
      
      voiceService.registerCommand("signup", () => {
        speak("Redirecting to sign up page");
        setTimeout(() => navigate("/signup"), 1000);
      });
      
      voiceService.registerCommand("forgot secret code", () => {
        speak("Redirecting to forgot secret code page");
        setTimeout(() => navigate("/forgot"), 1000);
      });
      
      voiceService.registerCommand("forgot", () => {
        speak("Redirecting to forgot secret code page");
        setTimeout(() => navigate("/forgot"), 1000);
      });
    }
    
    // Spelling mode commands
    if (mode === "spelling") {
      voiceService.registerCommand("clear", async () => {
        await speak("Cleared. Please spell your secret code again.");
        setStatus("Spell your secret code again.");
        secretCodeRef.current = "";
        setSecretCode("");
        lastTranscriptRef.current = "";
        resetSilenceTimer();
      });
      
      voiceService.registerCommand("cancel", async () => {
        await speak("Cancelled. Returning to main menu.");
        setMode("welcome");
        setStatus("Say: Login, Sign Up, or Forgot Secret Code");
        secretCodeRef.current = "";
        setSecretCode("");
        lastTranscriptRef.current = "";
      });
      
      voiceService.registerCommand("backspace", () => {
        if (secretCodeRef.current.length > 0) {
          secretCodeRef.current = secretCodeRef.current.slice(0, -1);
          setSecretCode(secretCodeRef.current);
          speak(`Last character removed. Code is now ${secretCodeRef.current.split('').join(' ')}`);
        }
      });
    }
    
    // Confirmation mode commands
    if (mode === "confirm") {
      voiceService.registerCommand("yes", async () => {
        console.log("Yes command received");
        await speak("Confirmed. Logging in...");
        handleVoiceLogin();
      });
      voiceService.registerCommand("yes yes", async () => {
        console.log("Yes command received");
        await speak("Confirmed. Logging in...");
        handleVoiceLogin();
      });
      voiceService.registerCommand("yes confirm", async () => {
        console.log("Yes command received");
        await speak("Confirmed. Logging in...");
        handleVoiceLogin();
      });
      
      voiceService.registerCommand("correct", async () => {
        console.log("Correct command received");
        await speak("Confirmed. Logging in...");
        handleVoiceLogin();
      });
      
      voiceService.registerCommand("okay", async () => {
        console.log("Okay command received");
        await speak("Confirmed. Logging in...");
        handleVoiceLogin();
      });
      
      voiceService.registerCommand("confirm", async () => {
        console.log("Confirm command received");
        await speak("Confirmed. Logging in...");
        handleVoiceLogin();
      });
      
      voiceService.registerCommand("no", async () => {
        console.log("No command received");
        await speak("Let's try again. Please spell your secret code.");
        setMode("spelling");
        setStatus("Spell your secret code again.");
        secretCodeRef.current = "";
        setSecretCode("");
        lastTranscriptRef.current = "";
      });
      
      voiceService.registerCommand("wrong", async () => {
        console.log("Wrong command received");
        await speak("Let's try again. Please spell your secret code.");
        setMode("spelling");
        setStatus("Spell your secret code again.");
        secretCodeRef.current = "";
        setSecretCode("");
        lastTranscriptRef.current = "";
      });
      
      voiceService.registerCommand("retry", async () => {
        console.log("Retry command received");
        await speak("Let's try again. Please spell your secret code.");
        setMode("spelling");
        setStatus("Spell your secret code again.");
        secretCodeRef.current = "";
        setSecretCode("");
        lastTranscriptRef.current = "";
      });
    }

    // Handle all voice input
    voiceService.onResultCallback = (transcript) => {
      console.log("Raw voice input:", transcript, "Mode:", mode);
      
      // Clean the transcript
      const cleanTranscript = transcript.toLowerCase().trim();
      
      // Prevent duplicate processing
      if (cleanTranscript === lastTranscriptRef.current) {
        console.log("Duplicate transcript, skipping");
        return;
      }
      
      lastTranscriptRef.current = cleanTranscript;
      setSpokenText(cleanTranscript);
      
      // Process based on current mode
      if (mode === "spelling") {
        processSecretCodeSpelling(cleanTranscript);
      }
    };
    
    commandsRegisteredRef.current = true;
  };

  // Reset silence timer
  const resetSilenceTimer = () => {
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
    }
    
    if (mode === "spelling") {
      silenceTimerRef.current = setTimeout(() => {
        // After 1.5 seconds of silence, check if we have code
        if (secretCodeRef.current.length >= 3) {
          askForConfirmation(secretCodeRef.current);
        }
      }, 1500);
    }
  };

  // Process secret code spelling - UPDATED TO HANDLE NUMBERS
  const processSecretCodeSpelling = (transcript) => {
    console.log("Processing spelling:", transcript);
    
    // Reset timer on new speech
    resetSilenceTimer();
    
    // Extract individual characters from the transcript
    // First, handle special cases for numbers
    let processedText = transcript
      .toUpperCase()
      .replace(/\s+/g, ' ') // Keep single spaces for now
      .trim();
    
    // Convert common number words to digits
    processedText = processedText
      .replace(/ZERO/g, '0')
      .replace(/ONE/g, '1')
      .replace(/TWO/g, '2')
      .replace(/THREE/g, '3')
      .replace(/FOUR/g, '4')
      .replace(/FIVE/g, '5')
      .replace(/SIX/g, '6')
      .replace(/SEVEN/g, '7')
      .replace(/EIGHT/g, '8')
      .replace(/NINE/g, '9')
      .replace(/TEN/g, '10');
    
    // Also handle combined words like "ONE1" or "VISION1"
    // Split by spaces or common separators
    const tokens = processedText
      .split(/\s+|AND|THE|THEN|NEXT|,|\./)
      .filter(token => token.length > 0);
    
    console.log("Tokens:", tokens);
    
    // Check if user said a command word
    const commandWords = ['CLEAR', 'CANCEL', 'BACKSPACE', 'HELP', 'STOP', 'START'];
    const isCommand = commandWords.some(word => 
      transcript.toUpperCase().includes(word)
    );
    
    if (!isCommand && tokens.length > 0) {
      let newCharacters = "";
      
      for (let token of tokens) {
        // Remove any non-alphanumeric characters
        const cleanToken = token.replace(/[^A-Z0-9]/g, '');
        
        if (cleanToken.length === 1) {
          // Single character (letter or digit)
          if (secretCodeRef.current.length === 0 || 
              cleanToken !== secretCodeRef.current[secretCodeRef.current.length - 1]) {
            newCharacters += cleanToken;
          }
        } else if (cleanToken.length > 1) {
          // Handle multi-character tokens (could be "10" or "VISION" or "1ONE")
          // Check if it's a number or alphanumeric
          const isNumber = /^\d+$/.test(cleanToken);
          
          if (isNumber) {
            // It's a number like "10" - add all digits
            for (let digit of cleanToken) {
              if (secretCodeRef.current.length === 0 || 
                  digit !== secretCodeRef.current[secretCodeRef.current.length - 1]) {
                newCharacters += digit;
              }
            }
          } else {
            // It's alphanumeric like "VISION" or "VISION1"
            for (let char of cleanToken) {
              if (secretCodeRef.current.length === 0 || 
                  char !== secretCodeRef.current[secretCodeRef.current.length - 1]) {
                newCharacters += char;
              }
            }
          }
        }
      }
      
      if (newCharacters.length > 0) {
        // Add to current code
        secretCodeRef.current += newCharacters;
        setSecretCode(secretCodeRef.current);
        
        // Give immediate feedback
        if (newCharacters.length === 1) {
          speak(`Character ${newCharacters}`);
        } else if (newCharacters.length > 1) {
          speak(newCharacters.split('').join(' '));
        }
        
        console.log("Updated code:", secretCodeRef.current);
        
        // If we have at least 4 characters, ask for confirmation
        if (secretCodeRef.current.length >= 4) {
          // Don't wait for timer, ask immediately but after speech
          setTimeout(() => {
            if (mode === "spelling") {
              askForConfirmation(secretCodeRef.current);
            }
          }, 1000);
        }
      }
    }
  };

  // Ask for confirmation
  const askForConfirmation = async (code) => {
    if (mode !== "spelling") return;
    
    const codeWithSpaces = code.split('').join(' ');
    console.log("Asking confirmation for:", codeWithSpaces);
    
    await speak(`You said: ${codeWithSpaces}. Is this correct? Say Yes or No.`);
    
    setStatus(`Code: ${codeWithSpaces}. Say "Yes" to confirm or "No" to try again.`);
    setMode("confirm");
    
    // Clear the last transcript to avoid processing old data
    lastTranscriptRef.current = "";
  };

  // Handle voice login
  const handleVoiceLogin = async () => {
    if (isProcessingRef.current) return;
    
    const code = secretCodeRef.current;
    if (!code.trim() || code.length < 3) {
      await speak("Secret code too short. Please try again.");
      setStatus("Secret code too short. Please try again.");
      setMode("spelling");
      return;
    }

    isProcessingRef.current = true;
    setStatus("Logging in...");

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/auth/voice-login/",
        { voice_input: code }
      );

      if (response.data.user_id) {
        const user = {
          id: response.data.user_id,
          name: response.data.greeting_name,
        };
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", response.data.access_token);
        setStatus(`Login successful! Welcome ${user.name}. Redirecting...`);
        await speak(`Login successful! Welcome ${user.name}`);
        setTimeout(() => navigate("/dashboard"), 2000);
      } else {
        throw new Error("Login failed: no user data");
      }
    } catch (error) {
      let errorMessage = "Invalid secret code. Please try again.";
      if (error.response?.data?.spoken_response) {
        errorMessage = error.response.data.spoken_response;
      }
      setStatus(errorMessage);
      await speak(errorMessage);
      
      // Reset for retry
      setMode("spelling");
      secretCodeRef.current = "";
      setSecretCode("");
      setStatus("Spell your secret code again.");
      lastTranscriptRef.current = "";
    } finally {
      isProcessingRef.current = false;
    }
  };

  // Manual login handler
  const handleLogin = async () => {
    if (!secretCode.trim()) {
      setStatus("Please enter your secret code");
      speak("Please enter your secret code");
      return;
    }

    try {
      setStatus("Logging in...");
      speak("Logging in...");

      const response = await axios.post(
        "http://127.0.0.1:8000/auth/voice-login/",
        { voice_input: secretCode }
      );

      if (response.data.user_id) {
        const user = {
          id: response.data.user_id,
          name: response.data.greeting_name,
        };
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", response.data.access_token);
        setStatus(`Login successful! Welcome ${user.name}. Redirecting...`);
        speak(`Login successful! Welcome ${user.name}`);
        setTimeout(() => navigate("/dashboard"), 2000);
      } else {
        throw new Error("Login failed: no user data");
      }
    } catch (error) {
      let errorMessage = "Invalid secret code or backend error. Please try again.";
      if (error.response?.data?.spoken_response) {
        errorMessage = error.response.data.spoken_response;
      }
      setStatus(errorMessage);
      speak(errorMessage);
    }
  };

  // Navigation
  const goToSignup = () => navigate("/signup");
  const goToForgot = () => navigate("/forgot");

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
        <h1 className="title">Vision Assist</h1>
        
        {/* Status Message */}
        <p className="status">{status}</p>

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
            <span className="mode-text">{mode.toUpperCase()} MODE</span>
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

        {/* Secret Code Display */}
        {(mode === "spelling" || mode === "confirm") && (
          <div className="code-display-section">
            <div className="code-display">
              {secretCode.split('').map((letter, index) => (
                <span key={index} className="code-letter">
                  {letter}
                </span>
              ))}
              {secretCode.length === 0 && (
                <span className="code-placeholder">Waiting for code...</span>
              )}
            </div>
            <p className="code-hint">
              {mode === "spelling" 
                ? "Spell character by character (e.g., 'V I S I O N 1' or 'VISION ONE')" 
                : "Say 'Yes' to confirm or 'No' to retry"}
            </p>
            
            {mode === "spelling" && secretCode.length > 0 && (
              <div className="code-actions">
                <button 
                  onClick={async () => {
                    await speak("Cleared");
                    secretCodeRef.current = "";
                    setSecretCode("");
                    lastTranscriptRef.current = "";
                  }}
                  className="action-small"
                  disabled={isSpeaking}
                >
                  🗑️ Clear
                </button>
                <button 
                  onClick={async () => {
                    if (secretCodeRef.current.length > 0) {
                      await askForConfirmation(secretCodeRef.current);
                    }
                  }}
                  className="action-small"
                  disabled={isSpeaking}
                >
                  ✓ Confirm
                </button>
              </div>
            )}
          </div>
        )}

        {/* Manual Input (Fallback) */}
        <div className="input-section">
          <div className="input-group">
            <input
              type="text"
              placeholder="Or type secret code here"
              value={secretCode}
              onChange={(e) => {
                const value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
                setSecretCode(value);
                secretCodeRef.current = value;
              }}
              className="input-field"
              disabled={isSpeaking}
            />
          </div>

          <button className="action-btn" onClick={handleLogin} disabled={isSpeaking}>
            Login
          </button>
        </div>

        {/* Navigation Buttons */}
        <div className="nav-buttons">
          <button className="nav-btn" onClick={goToSignup} disabled={isSpeaking}>
            Don't have an account? Sign Up
          </button>
          <button className="nav-btn" onClick={goToForgot} disabled={isSpeaking}>
            Forgot Secret Code?
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;