import React, { useState, useEffect } from 'react';
import { useVoiceCommands } from '../../hooks/useVoiceCommands';
import './VoiceAssistant.css';

const VoiceAssistant = ({ onCommand }) => {
  const [isActive, setIsActive] = useState(false);
  const [lastCommand, setLastCommand] = useState('');
  
  const { startListening, stopListening, speak, registerCommands } = useVoiceCommands();

  // Register common commands
  useEffect(() => {
    const commands = {
      // Navigation commands
      'go to dashboard': () => {
        window.location.href = '/dashboard';
        speak('Navigating to dashboard');
      },
      'go to profile': () => {
        window.location.href = '/profile';
        speak('Opening profile');
      },
      'go to object detection': () => {
        window.location.href = '/object-detection';
        speak('Opening object detection');
      },
      'go to weather': () => {
        window.location.href = '/weather';
        speak('Opening weather forecast');
      },
      'go to news': () => {
        window.location.href = '/news';
        speak('Opening news');
      },

      // Object Detection specific commands
      'detect objects': () => {
        const detectBtn = document.querySelector('.detect-button');
        if (detectBtn) detectBtn.click();
        speak('Starting object detection');
      },
      'stop detection': () => {
        const stopBtn = document.querySelector('.stop-button');
        if (stopBtn) stopBtn.click();
        speak('Stopping detection');
      },
      'capture image': () => {
        const captureBtn = document.querySelector('.capture-button');
        if (captureBtn) captureBtn.click();
        speak('Capturing image');
      },

      // Weather commands
      'check weather': () => {
        const refreshBtn = document.querySelector('.refresh-weather');
        if (refreshBtn) refreshBtn.click();
        speak('Refreshing weather data');
      },

      // General commands
      'help': () => {
        speak('Available commands: go to dashboard, detect objects, check weather, capture image, stop detection');
      },
      'what can you do': () => {
        speak('I can help you navigate, detect objects, check weather, read news, and more. Say help for all commands.');
      },
      'stop': () => {
        stopListening();
        setIsActive(false);
        speak('Voice assistant stopped');
      }
    };

    registerCommands(commands);
  }, [registerCommands, speak]);

  const toggleListening = () => {
    if (isActive) {
      stopListening();
      speak('Voice assistant deactivated');
    } else {
      startListening();
      speak('Voice assistant activated. Say your command.');
    }
    setIsActive(!isActive);
  };

  return (
    <div className="voice-assistant">
      <button 
        className={`voice-button ${isActive ? 'active' : ''}`}
        onClick={toggleListening}
        title={isActive ? 'Stop listening' : 'Start voice commands'}
      >
        <span className="icon">🎤</span>
        {isActive ? 'Listening...' : 'Voice Control'}
      </button>
      
      {lastCommand && (
        <div className="command-feedback">
          Last command: "{lastCommand}"
        </div>
      )}
      
      <div className="voice-help">
        <small>Try saying: "go to dashboard", "detect objects", "help"</small>
      </div>
    </div>
  );
};

export default VoiceAssistant;