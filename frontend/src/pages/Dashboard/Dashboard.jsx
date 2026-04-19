


import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { voiceService } from "../../services/voiceService";

import "./Dashboard.css";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [activeSection, setActiveSection] = useState("overview");
  const [status, setStatus] = useState("Loading...");
  const [spokenText, setSpokenText] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceActive, setVoiceActive] = useState(false);
  const [hasWelcomed, setHasWelcomed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Check if we're on dashboard
  const isDashboard = location.pathname === "/dashboard";

  // All features organized by category
  const [features] = useState({
    communication: [
      { 
        id: 1, 
        name: "Language Translator", 
        icon: "🌐", 
        description: "Real-time language translation",
        status: "Ready",
        commands: ["language translator", "translator", "open translator", "open language translator", "open language","language","translate","translation","translate language","longest translator"],
        onClick: () => navigate('/language-translator')
      }
    ],
    tools: [
      { 
        id: 2, 
        name: "Talking Calculator", 
        icon: "🧮", 
        description: "Voice-operated calculator",
        status: "Ready",
        commands: ["calculator", "talking calculator", "open calculator", "open talking calculator", "calculate"],
        onClick: () => navigate('/talking-calculator')
      },
      { 
        id: 8, 
        name: "Object Detector", 
        icon: "🔍", 
        description: "Identify objects around you",
        status: "Ready",
        commands: ["object detector", "object detection", "detect objects", "open object detector", "detector","object"],
        onClick: () => navigate("/object-detector")
      },
      {
        id: 11,
        name: "OCR Scanner",
        icon: "📄",
        description: "Text recognition from images",
        status: "Ready",
        commands: ["ocr scanner", "text scanner","scanner","ocr", "open ocr", "open text scanner", "scan text","open ocr scanner","open scanner"],
        onClick: () => navigate("/ocr-scanner")
      }
    ],
    safety: [
      { 
        id: 3, 
        name: "SOS Emergency", 
        icon: "🆘", 
        description: "Emergency alert system",
        status: "Active",
        commands: ["sos", "emergency", "sos emergency", "open sos", "help emergency"],
        onClick: () => navigate("/sos")
      }
    ],
    health: [
      { 
        id: 6, 
        name: "Medication Reminder", 
        icon: "💊", 
        description: "Medicine schedule alerts",
        status: "Active",
        commands: ["medication", "medication reminder", "medicine reminder", "open medication", "remind medicine"],
        onClick: () => navigate("/medication-reminder")
      }
    ],
    information: [
      {
        id: 4, 
        name: "Weather Reader", 
        icon: "🌤️", 
        description: "Voice weather updates",
        status: "Ready",
        commands: ["weather","whether", "weather reader", "weather forecast", "open weather", "check weather"],
        onClick: () => navigate("/weather-reader")
      },
      {
        id: 5, 
        name: "News Reader", 
        icon: "📰", 
        description: "Latest news audio feed",
        status: "Ready",
        commands: ["news", "news reader", "latest news", "open news", "read news"],
        onClick: () => navigate("/news-reader")
      }
    ],
    productivity: [
      { 
        id: 7, 
        name: "Money Analyzer", 
        icon: "💰", 
        description: "Voice financial assistant",
        status: "Ready",
        commands: ["money","analyzer", "money analyzer", "finance", "open money analyzer", "analyze money"],
        onClick: () => navigate("/money-analyzer")
      },
      { 
        id: 10, 
        name: "Reminders", 
        icon: "⏰", 
        description: "Voice-controlled reminders",
        status: "Ready",
        commands: ["reminders", "set reminder", "open reminders", "create reminder"],
        onClick: () => navigate("/reminders")
      }
    ]
  });

  // Improved Speak function with better error handling
  const speak = useCallback((text, callback) => {
    return new Promise((resolve) => {
      // Check if speech synthesis is supported
      if (!('speechSynthesis' in window)) {
        console.warn('Speech synthesis not supported');
        if (callback) setTimeout(callback, 0);
        resolve();
        return;
      }
      
      const synth = window.speechSynthesis;
      
      // Don't speak if already speaking
      if (synth.speaking) {
        console.log('Speech synthesis already speaking');
        if (callback) setTimeout(callback, 0);
        resolve();
        return;
      }
      
      // Cancel any ongoing speech
      synth.cancel();
      
      // Small delay to ensure clean state
      setTimeout(() => {
        setIsSpeaking(true);
        
        const utter = new SpeechSynthesisUtterance(text);
        utter.rate = 0.8;
        utter.pitch = 1;
        utter.volume = 1;
        
        // Set voice if available
        const voices = synth.getVoices();
        if (voices.length > 0) {
          const preferredVoice = voices.find(v => v.lang.includes('en')) || voices[0];
          utter.voice = preferredVoice;
        }
        
        utter.onstart = () => {
          console.log("Started speaking:", text.substring(0, 50) + (text.length > 50 ? '...' : ''));
        };
        
        utter.onend = () => {
          console.log("Finished speaking");
          setIsSpeaking(false);
          
          setTimeout(() => {
            if (callback) callback();
            resolve();
          }, 1000);
        };
        
        utter.onerror = (err) => {
          console.error("Speech error:", err.error);
          setIsSpeaking(false);
          
          // Don't retry on these errors
          if (err.error === 'not-allowed' || err.error === 'interrupted' || err.error === 'canceled') {
            console.warn(`Speech ${err.error} - may need user interaction`);
          }
          
          setTimeout(() => {
            if (callback) callback();
            resolve();
          }, 100);
        };
        
        try {
          synth.speak(utter);
        } catch (error) {
          console.error('Failed to speak:', error);
          setIsSpeaking(false);
          setTimeout(() => {
            if (callback) callback();
            resolve();
          }, 100);
        }
      }, 50);
    });
  }, []);

  // Function to handle section change
  const changeSection = useCallback((section) => {
    console.log("Changing section to:", section);
    setActiveSection(section);
    
    const sectionNames = {
      'overview': 'all features',
      'communication': 'communication tools',
      'tools': 'daily tools',
      'safety': 'safety and health features',
      'information': 'information services',
      'productivity': 'productivity tools'
    };
    
    const message = sectionNames[section] || section;
    speak(`Showing ${message}`);
  }, [speak]);

  // Handle section change from UI
  const handleSectionChange = (section) => {
    changeSection(section);
  };

  // Function to register section navigation voice commands
  const registerSectionVoiceCommands = useCallback(() => {
    console.log("Registering section navigation voice commands");
    
    // Register section navigation commands
    const sections = {
      'overview': 'overview',
      'all features': 'overview',
      'show all': 'overview',
      'communication': 'communication',
      'open communication': 'communication',
      'communication tools': 'communication',
      'tools': 'tools',
      'daily tools': 'tools',
      'open tools': 'tools',
      'safety': 'safety',
      'safety and health': 'safety',
      'open safety': 'safety',
      'information': 'information',
      'information services': 'information',
      'open information': 'information',
      'productivity': 'productivity',
      'productivity tools': 'productivity',
      'open productivity': 'productivity'
    };
    
    Object.entries(sections).forEach(([command, section]) => {
      voiceService.registerCommand(command, () => {
        console.log(`Section command: "${command}" -> ${section}`);
        changeSection(section);
      });
    });
    
    console.log(`Registered ${Object.keys(sections).length} section commands`);
  }, [changeSection]);

  // Function to register feature voice commands
  const registerFeatureVoiceCommands = useCallback(() => {
    console.log("Registering feature voice commands");
    
    // Register feature commands
    Object.values(features).forEach(category => {
      category.forEach(feature => {
        feature.commands.forEach(command => {
          voiceService.registerCommand(command, async () => {
            console.log(`Feature command: "${command}" -> ${feature.name}`);
            await speak(`Opening ${feature.name}`);
            if (feature.onClick) {
              feature.onClick();
            }
          });
        });
      });
    });
    
    console.log("All feature commands registered");
  }, [features, speak]);

  // Monitor voice service state
  useEffect(() => {
    const checkVoiceState = () => {
      setVoiceActive(voiceService.isListening);
    };

    // Check initially
    checkVoiceState();

    // Set up interval to check voice state
    const intervalId = setInterval(checkVoiceState, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // Initialize dashboard voice commands ONLY when on dashboard
  useEffect(() => {
    if (!isDashboard) {
      console.log("Not on dashboard, skipping voice initialization");
      return;
    }

    if (!voiceService.isAvailable()) {
      console.log("Voice service not available");
      return;
    }

    console.log("Initializing dashboard voice commands...");
    
    // First, ensure voice service is in correct state
    voiceService.setFeature('dashboard', (transcript) => {
      console.log("Dashboard voice input:", transcript);
      setSpokenText(transcript);
    });
    
    // Clear only dashboard-specific commands, keep navigation commands
    voiceService.clearCommands();
    
    // Register section navigation commands
    registerSectionVoiceCommands();
    
    // Register feature commands
    registerFeatureVoiceCommands();
    
    // Register other dashboard commands
    // voiceService.registerCommand("dashboard", async () => {
    //   console.log("Dashboard command received");
    //   await speak("You are already on dashboard");
    // });
    voiceService.registerCommand("features", async () => {
  await speak(
    "Available features are language translator, calculator, object detection, OCR scanner, SOS emergency, medication reminder, weather reader, news reader, money analyzer, and reminders."
  );
});
voiceService.registerCommand("dashboard", async () => {
  await speak(
    "Available features are language translator, calculator, object detection, OCR scanner, SOS emergency, medication reminder, weather reader, news reader, money analyzer, and reminders."
  );
});
    
    voiceService.registerCommand("home", async () => {
      console.log("Home command received");
      await speak("You are already on dashboard");
    });
    
    voiceService.registerCommand("main menu", async () => {
      console.log("Main menu command received");
      await speak("Showing main menu");
    });
    
    // Profile commands
    voiceService.registerCommand("profile", async () => {
      console.log("Profile command received");
      await speak("Opening your profile");
      navigate("/profile");
    });
    
    voiceService.registerCommand("edit profile", async () => {
      console.log("Edit profile command received");
      await speak("Opening profile editor");
      navigate("/profile");
    });
    
    voiceService.registerCommand("go to profile", async () => {
      console.log("Go to profile command received");
      await speak("Going to your profile");
      navigate("/profile");
    });
    
    voiceService.registerCommand("open profile", async () => {
      console.log("Open profile command received");
      await speak("Opening your profile");
      navigate("/profile");
    });
    
    // Help commands
    voiceService.registerCommand("help", async () => {
      console.log("Help command received");
      const helpText = "Dashboard voice commands: " +
        "Say section names like 'communication', 'tools', 'safety', 'information', or 'productivity' to navigate. " +
        "Say 'overview' or 'all features' to see all features. " +
        "Say feature names like 'news', 'weather', 'calculator', 'object detection', 'ocr', 'sos', 'medication', 'money', or 'reminders' to open them. " +
        "Say 'profile' to edit your profile. " +
        "Say 'logout' to sign out.";
      await speak(helpText);
    });
    
    voiceService.registerCommand("what can you do", async () => {
      console.log("What can you do command received");
      await speak("I can help you navigate the dashboard and open features. Try saying: news, weather, calculator, object detection, or profile.");
    });
    
    // Voice control commands
    voiceService.registerCommand("stop voice", async () => {
      console.log("Stop voice command received");
      await speak("Voice control stopped");
      voiceService.stopListening();
      setVoiceActive(false);
    });
    
    voiceService.registerCommand("start voice", async () => {
      console.log("Start voice command received");
      await speak("Voice control started");
      voiceService.startListening();
      setVoiceActive(true);
    });
    
    // Logout commands
    voiceService.registerCommand("logout", async () => {
      console.log("Logout command received");
      await handleLogout();
    });
    
    voiceService.registerCommand("sign out", async () => {
      console.log("Sign out command received");
      await handleLogout();
    });
    
    voiceService.registerCommand("log out", async () => {
      console.log("Log out command received");
      await handleLogout();
    });
    
    // Toggle voice commands
    voiceService.registerCommand("turn on voice", async () => {
      console.log("Turn on voice command received");
      await speak("Turning on voice control");
      voiceService.shouldBeListening = true;
      voiceService.startListening();
      setVoiceActive(true);
    });
    
    voiceService.registerCommand("turn off voice", async () => {
      console.log("Turn off voice command received");
      await speak("Turning off voice control");
      voiceService.shouldBeListening = false;
      voiceService.stopListening();
      setVoiceActive(false);
    });
    
    // Start listening ONLY if not already listening
    const startVoiceIfNeeded = () => {
      console.log("Checking voice state:", {
        isListening: voiceService.isListening,
        shouldBeListening: voiceService.shouldBeListening,
        isStarting: voiceService.isStarting
      });
      
      if (!voiceService.isListening && !voiceService.isStarting) {
        console.log("Starting voice listening for dashboard...");
        voiceService.shouldBeListening = true;
        
        // Small delay to avoid race conditions
        setTimeout(() => {
          if (!voiceService.isListening && !voiceService.isStarting) {
            try {
              voiceService.startListening();
            } catch (error) {
              console.warn("Error starting voice:", error);
              // Try again after delay
              setTimeout(() => {
                if (!voiceService.isListening && !voiceService.isStarting) {
                  voiceService.startListening();
                }
              }, 500);
            }
          }
        }, 300);
      } else {
        console.log("Voice already listening or starting, skipping");
      }
    };
    
    // Start voice after a delay to ensure previous feature has cleaned up
    const voiceTimer = setTimeout(startVoiceIfNeeded, 500);
    
    console.log("✅ Dashboard voice commands initialized");
    
    // Clean up on unmount
    return () => {
      clearTimeout(voiceTimer);
      if (isDashboard) {
        console.log("Cleaning up dashboard voice commands");
        // Don't stop listening - let it continue for other features
        // Only clear commands if we're leaving dashboard
        if (location.pathname !== "/dashboard") {
          console.log("Leaving dashboard, clearing commands");
          voiceService.clearCommands();
        }
      }
    };
  }, [
    isDashboard, 
    navigate, 
    speak, 
    changeSection, 
    registerSectionVoiceCommands, 
    registerFeatureVoiceCommands, 
    location.pathname
  ]);

  // Load user data
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!token || !userData) {
      setStatus("No user found. Redirecting to login...");
      setTimeout(() => navigate("/"), 2000);
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setStatus(`Welcome back, ${parsedUser.name}!`);
      
      // Welcome message - Only speak after user interaction
      if (isDashboard && !hasWelcomed) {
        // Set up user interaction listener for welcome message
        const handleUserInteraction = async () => {
          if (!hasWelcomed) {
            // await speak(`Welcome to Vision Assist dashboard, ${parsedUser.name}!`);
            await speak(
  `Welcome to dashboard, ${parsedUser.name}. 
  The features are language translator, calculator, object detection, OCR scanner, SOS, medication reminder, weather and news readers, money analyzer, and reminders.`
);
            setHasWelcomed(true);
            // Clean up listeners
            window.removeEventListener('click', handleUserInteraction);
            window.removeEventListener('keydown', handleUserInteraction);
            window.removeEventListener('touchstart', handleUserInteraction);
          }
        };
        
        // Add event listeners for user interaction
        window.addEventListener('click', handleUserInteraction);
        window.addEventListener('keydown', handleUserInteraction);
        window.addEventListener('touchstart', handleUserInteraction);
        
        // Clean up listeners after 10 seconds
        setTimeout(() => {
          window.removeEventListener('click', handleUserInteraction);
          window.removeEventListener('keydown', handleUserInteraction);
          window.removeEventListener('touchstart', handleUserInteraction);
        }, 10000);
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
      setStatus("Error loading user data. Redirecting...");
      setTimeout(() => navigate("/"), 2000);
    }
  }, [navigate, isDashboard, speak, hasWelcomed]);

  const handleLogout = useCallback(async () => {
    setStatus("Logging out...");
    
    await speak("Logging out...");

    try {
      const token = localStorage.getItem("token");
      if (token) {
        await axios.post(
          "http://127.0.0.1:8000/auth/voice-logout/",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
      }
    } catch (error) {
      console.error("Logout backend error:", error.response?.data || error.message);
    } finally {
      localStorage.clear();
      setTimeout(() => navigate("/"), 1500);
    }
  }, [navigate, speak]);

  const handleFeatureClick = (feature) => {
    speak(`Opening ${feature.name}`);
    setStatus(`Opening ${feature.name}`);
    
    if (feature.onClick) {
      feature.onClick();
    }
  };

  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };

  // Toggle voice listening
  const toggleVoiceListening = useCallback(async () => {
    if (voiceService.isListening) {
      voiceService.stopListening();
      await speak("Voice listening stopped");
      setVoiceActive(false);
    } else {
      voiceService.startListening();
      await speak("Voice listening started");
      setVoiceActive(true);
    }
  }, [speak]);

  // Get all features for overview section
  const allFeatures = [
    ...features.communication,
    ...features.tools,
    ...features.safety,
    ...features.health,
    ...features.information,
    ...features.productivity
  ];

  // Manual welcome trigger
  const triggerWelcomeMessage = useCallback(async () => {
    if (user) {
      await speak(`Welcome to Vision Assist dashboard, ${user.name}!`);
      setHasWelcomed(true);
    }
  }, [user, speak]);

  // If we're on a feature page, show the feature header
  if (!isDashboard) {
    return (
      <div className="dashboard-container">
        <FixedHeader 
          user={user} 
          onLogout={handleLogout} 
          onBack={handleBackToDashboard}
          showBackButton={true}
          spokenText={spokenText}
          voiceActive={voiceActive}
          onToggleVoice={toggleVoiceListening}
        />
        {/* Feature content will be rendered by the route */}
      </div>
    );
  }

  if (!user) {
    return (
      <div className="dashboard-container">
        <div className="dashboard-loading">
          <h1 className="title">Vision Assist</h1>
          <p className="status">{status}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <FixedHeader 
        user={user} 
        onLogout={handleLogout} 
        onBack={handleBackToDashboard}
        showBackButton={false}
        spokenText={spokenText}
        voiceActive={voiceActive}
        onToggleVoice={toggleVoiceListening}
      />

      {/* Main Content */}
      <div className="dashboard-main">
        {/* Left Sidebar Navigation */}
        <nav className="dashboard-sidebar">
          <div className="sidebar-section">
            <h3>Navigation</h3>
            <button 
              className={`nav-btn ${activeSection === "overview" ? "active" : ""}`}
              onClick={() => handleSectionChange("overview")}
            >
              📊 All Features
            </button>
            <button 
              className={`nav-btn ${activeSection === "communication" ? "active" : ""}`}
              onClick={() => handleSectionChange("communication")}
            >
              🌐 Communication
            </button>
            <button 
              className={`nav-btn ${activeSection === "tools" ? "active" : ""}`}
              onClick={() => handleSectionChange("tools")}
            >
              🛠️ Daily Tools
            </button>
            <button 
              className={`nav-btn ${activeSection === "safety" ? "active" : ""}`}
              onClick={() => handleSectionChange("safety")}
            >
              🛡️ Safety & Health
            </button>
            <button 
              className={`nav-btn ${activeSection === "information" ? "active" : ""}`}
              onClick={() => handleSectionChange("information")}
            >
              📰 Information
            </button>
            <button 
              className={`nav-btn ${activeSection === "productivity" ? "active" : ""}`}
              onClick={() => handleSectionChange("productivity")}
            >
              ⚡ Productivity
            </button>
            <button 
              className="nav-btn"
              onClick={() => {
                speak("Opening profile editor");
                navigate("/profile");
              }}
            >
              👤 Edit Profile
            </button>
          </div>

          <div className="sidebar-section">
            <h3>Voice Controls</h3>
            <div className="voice-controls">
              <div className="voice-status-display">
                <span className="voice-indicator">
                  {voiceActive ? '🔊 Voice Active' : '🔇 Voice Inactive'}
                </span>
                <button 
                  className="voice-toggle-btn"
                  onClick={toggleVoiceListening}
                >
                  {voiceActive ? 'Turn Off' : 'Turn On'}
                </button>
              </div>
              <div className="voice-commands-list">
                <div className="voice-command-item">
                  <span className="command-icon">🎤</span>
                  <span>Say "Help" for commands</span>
                </div>
                <div className="voice-command-item">
                  <span className="command-icon">🏠</span>
                  <span>"Dashboard" for main menu</span>
                </div>
                <div className="voice-command-item">
                  <span className="command-icon">📊</span>
                  <span>"All features" for overview</span>
                </div>
                <div className="voice-command-item">
                  <span className="command-icon">🌐</span>
                  <span>"Communication" for tools</span>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Right Content Area */}
        <main className="dashboard-content">
          {/* All Features Overview */}
          {activeSection === "overview" && (
            <div className="content-section">
              <h2>All Features</h2>
              
              {/* Welcome Message */}
              <div className="welcome-banner">
                <h3>Hello, {user.name}! 👋</h3>
                <p>You have {allFeatures.length} features available. Say "help" to know voice commands.</p>
                
                {/* Welcome Message Trigger Button */}
                {!hasWelcomed && (
                  <div className="welcome-trigger">
                    <button 
                      className="speak-welcome-btn"
                      onClick={triggerWelcomeMessage}
                    >
                      🔊 Click to Hear Welcome Message
                    </button>
                  </div>
                )}
                
                <div className="voice-status">
                  <span className={`voice-indicator ${voiceActive ? 'active' : 'inactive'}`}>
                    {voiceActive ? '🔊 Voice Active' : '🔇 Voice Inactive'}
                  </span>
                  <p>Try saying: "Communication", "Tools", "News", or "Weather"</p>
                </div>
              </div>

              {/* Features Grid - 3 per row */}
              <div className="features-grid">
                {allFeatures.map(feature => (
                  <div key={feature.id} className="feature-card" onClick={() => handleFeatureClick(feature)}>
                    <div className="feature-header">
                      <span className="feature-icon">{feature.icon}</span>
                      <span className={`feature-status ${feature.status.toLowerCase().replace(' ', '-')}`}>
                        {feature.status}
                      </span>
                    </div>
                    <h3>{feature.name}</h3>
                    <p>{feature.description}</p>
                    <div className="feature-commands">
                      <span className="command-hint">Try: "{feature.commands[0]}"</span>
                    </div>
                    <button className="feature-action-btn">Open {feature.name}</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Communication Features */}
          {activeSection === "communication" && (
            <div className="content-section">
              <h2>Communication Tools</h2>
              <p className="section-hint">Say "Overview" to go back or try other sections</p>
              <div className="features-grid">
                {features.communication.map(feature => (
                  <div key={feature.id} className="feature-card" onClick={() => handleFeatureClick(feature)}>
                    <div className="feature-header">
                      <span className="feature-icon">{feature.icon}</span>
                      <span className={`feature-status ${feature.status.toLowerCase().replace(' ', '-')}`}>
                        {feature.status}
                      </span>
                    </div>
                    <h3>{feature.name}</h3>
                    <p>{feature.description}</p>
                    <div className="feature-commands">
                      <span className="command-hint">Try: "{feature.commands[0]}"</span>
                    </div>
                    <button className="feature-action-btn">Open {feature.name}</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Daily Tools */}
          {activeSection === "tools" && (
            <div className="content-section">
              <h2>Daily Tools</h2>
              <p className="section-hint">Say "Overview" to go back or try other sections</p>
              <div className="features-grid">
                {features.tools.map(feature => (
                  <div key={feature.id} className="feature-card" onClick={() => handleFeatureClick(feature)}>
                    <div className="feature-header">
                      <span className="feature-icon">{feature.icon}</span>
                      <span className={`feature-status ${feature.status.toLowerCase().replace(' ', '-')}`}>
                        {feature.status}
                      </span>
                    </div>
                    <h3>{feature.name}</h3>
                    <p>{feature.description}</p>
                    <div className="feature-commands">
                      <span className="command-hint">Try: "{feature.commands[0]}"</span>
                    </div>
                    <button className="feature-action-btn">Open {feature.name}</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Safety & Health */}
          {activeSection === "safety" && (
            <div className="content-section">
              <h2>Safety & Health</h2>
              <p className="section-hint">Say "Overview" to go back or try other sections</p>
              <div className="features-grid">
                {[...features.safety, ...features.health].map(feature => (
                  <div key={feature.id} className="feature-card" onClick={() => handleFeatureClick(feature)}>
                    <div className="feature-header">
                      <span className="feature-icon">{feature.icon}</span>
                      <span className={`feature-status ${feature.status.toLowerCase().replace(' ', '-')}`}>
                        {feature.status}
                      </span>
                    </div>
                    <h3>{feature.name}</h3>
                    <p>{feature.description}</p>
                    <div className="feature-commands">
                      <span className="command-hint">Try: "{feature.commands[0]}"</span>
                    </div>
                    <button className="feature-action-btn">Open {feature.name}</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Information */}
          {activeSection === "information" && (
            <div className="content-section">
              <h2>Information Services</h2>
              <p className="section-hint">Say "Overview" to go back or try other sections</p>
              <div className="features-grid">
                {features.information.map(feature => (
                  <div key={feature.id} className="feature-card" onClick={() => handleFeatureClick(feature)}>
                    <div className="feature-header">
                      <span className="feature-icon">{feature.icon}</span>
                      <span className={`feature-status ${feature.status.toLowerCase().replace(' ', '-')}`}>
                        {feature.status}
                      </span>
                    </div>
                    <h3>{feature.name}</h3>
                    <p>{feature.description}</p>
                    <div className="feature-commands">
                      <span className="command-hint">Try: "{feature.commands[0]}"</span>
                    </div>
                    <button className="feature-action-btn">Open {feature.name}</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Productivity */}
          {activeSection === "productivity" && (
            <div className="content-section">
              <h2>Productivity Tools</h2>
              <p className="section-hint">Say "Overview" to go back or try other sections</p>
              <div className="features-grid">
                {features.productivity.map(feature => (
                  <div key={feature.id} className="feature-card" onClick={() => handleFeatureClick(feature)}>
                    <div className="feature-header">
                      <span className="feature-icon">{feature.icon}</span>
                      <span className={`feature-status ${feature.status.toLowerCase().replace(' ', '-')}`}>
                        {feature.status}
                      </span>
                    </div>
                    <h3>{feature.name}</h3>
                    <p>{feature.description}</p>
                    <div className="feature-commands">
                      <span className="command-hint">Try: "{feature.commands[0]}"</span>
                    </div>
                    <button className="feature-action-btn">Open {feature.name}</button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Status Bar */}
      <div className="status-bar">
        <div className="status-info">
          <span className="status-text">{status}</span>
          <span className="voice-state">
            Voice: {voiceActive ? '✅ On' : '❌ Off'}
          </span>
        </div>
        {spokenText && (
          <p className="spoken-text">
            🎤 Heard: <strong>{spokenText}</strong>
          </p>
        )}
      </div>
    </div>
  );
};

// Fixed Header Component
const FixedHeader = ({ user, onLogout, onBack, showBackButton, spokenText, voiceActive, onToggleVoice }) => {
  return (
    <header className="dashboard-header fixed-header">
      <div className="header-content">
        <div className="header-left">
          {showBackButton && (
            <button className="back-btn" onClick={onBack}>
              ← Back to Dashboard
            </button>
          )}
          <h1 className="logo">Vision Assist</h1>
        </div>
        <div className="header-center">
          {spokenText && (
            <div className="spoken-text-display">
              <span className="spoken-label">🎤 Heard:</span> <strong>{spokenText}</strong>
            </div>
          )}
        </div>
        <div className="user-menu">
          {user && <span className="welcome-text">Welcome, {user.name}</span>}
          <button className="voice-toggle-btn-small" onClick={onToggleVoice}>
            {voiceActive ? '🔊' : '🔇'}
          </button>
          <button className="logout-btn" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Dashboard;