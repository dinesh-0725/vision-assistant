// src/services/voiceAuthService.js
import { voiceService } from './voiceService';

class VoiceAuthService {
  constructor() {
    this.currentPage = 'login'; // login, signup, forgot
    this.userData = {
      email: '',
      name: '',
      phone: '',
      secretCode: '',
      password: '',
    };
    this.currentInput = null;
    this.isListening = false;
  }

  // Initialize voice commands for authentication
  initAuthCommands(navigate) {
    if (!voiceService.recognition) {
      console.log('Speech recognition not available');
      return;
    }

    // Common commands for all pages
    const commonCommands = {
      // Navigation
      'go to login': () => {
        this.speak('Going to login page');
        navigate('/');
      },
      'go to signup': () => {
        this.speak('Going to sign up page');
        navigate('/signup');
      },
      'go to forgot': () => {
        this.speak('Going to forgot secret code page');
        navigate('/forgot');
      },
      'go back': () => {
        window.history.back();
        this.speak('Going back');
      },
      'back to dashboard': () => {
        this.speak('Going to dashboard');
        navigate('/dashboard');
      },

      // Help
      'help': () => {
        const helpText = 'You can say: Go to login, Go to signup, Go to forgot, Speak [field name], Clear, Submit, Cancel, Help';
        this.speak(helpText);
      },
      'what can i say': () => {
        this.speak('Try saying: Speak name, Speak phone, Speak secret code, or Submit');
      },

      // Control
      'stop listening': () => {
        voiceService.stopListening();
        this.isListening = false;
        this.speak('Voice control stopped');
      },
      'start listening': () => {
        voiceService.startListening();
        this.isListening = true;
        this.speak('Voice control started');
      },
      'cancel': () => {
        this.clearAll();
        this.speak('Cancelled. All fields cleared.');
      },
      'clear': () => {
        this.clearCurrentInput();
        this.speak('Field cleared');
      },
      'submit': () => {
        this.speak('Submitting form...');
        // This will be handled by each component
      },
    };

    // Register common commands
    Object.entries(commonCommands).forEach(([pattern, handler]) => {
      voiceService.registerCommand(pattern, handler);
    });

    // Set up result callback
    voiceService.onResultCallback = (transcript) => {
      console.log('Auth voice command:', transcript);
      this.handleVoiceInput(transcript, navigate);
    };
  }

  // Handle voice input based on current context
  handleVoiceInput(transcript, navigate) {
    const command = transcript.toLowerCase();
    
    // Check for navigation commands
    if (command.includes('login') && command.includes('go to')) {
      navigate('/');
    } else if (command.includes('signup') || command.includes('sign up')) {
      navigate('/signup');
    } else if (command.includes('forgot')) {
      navigate('/forgot');
    } else if (command.includes('dashboard')) {
      navigate('/dashboard');
    }
    
    // Extract data from speech
    this.extractDataFromSpeech(command);
  }

  // Extract data from speech
  extractDataFromSpeech(command) {
    // Check for email pattern
    if (command.includes('@') && command.includes('.')) {
      const emailMatch = command.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
      if (emailMatch) {
        this.userData.email = emailMatch[1];
        this.speak(`Email set to ${this.userData.email}`);
      }
    }
    
    // Check for phone number
    const phoneMatch = command.match(/(\d{10})|(\d{3}[-.]?\d{3}[-.]?\d{4})/);
    if (phoneMatch) {
      this.userData.phone = phoneMatch[0].replace(/\D/g, '');
      this.speak(`Phone number set to ${this.userData.phone}`);
    }
    
    // Check for name
    if (command.includes('name is')) {
      const nameStart = command.indexOf('name is') + 8;
      const name = command.substring(nameStart).trim();
      if (name.length > 1) {
        this.userData.name = name;
        this.speak(`Name set to ${this.userData.name}`);
      }
    }
    
    // Check for secret code
    if (command.includes('secret code is') || command.includes('code is')) {
      const codeMatch = command.match(/secret code is (\w+)|code is (\w+)/i);
      if (codeMatch) {
        const code = codeMatch[1] || codeMatch[2];
        this.userData.secretCode = code.toUpperCase();
        this.speak(`Secret code set to ${this.userData.secretCode.split('').join(' ')}`);
      }
    }
  }

  // Spell secret code letter by letter
  spellSecretCode(letter) {
    this.userData.secretCode = (this.userData.secretCode || '') + letter.toUpperCase();
    const currentCode = this.userData.secretCode.split('').join(' ');
    this.speak(`Letter ${letter} added. Code is now ${currentCode}`);
    return this.userData.secretCode;
  }

  // Clear current input
  clearCurrentInput() {
    if (this.currentInput === 'name') this.userData.name = '';
    else if (this.currentInput === 'phone') this.userData.phone = '';
    else if (this.currentInput === 'secretCode') this.userData.secretCode = '';
    else if (this.currentInput === 'email') this.userData.email = '';
  }

  // Clear all data
  clearAll() {
    this.userData = {
      email: '',
      name: '',
      phone: '',
      secretCode: '',
      password: '',
    };
  }

  // Speak function
  speak(text) {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 1;
      window.speechSynthesis.speak(utterance);
    }
  }

  // Set current page
  setCurrentPage(page) {
    this.currentPage = page;
  }

  // Get user data
  getUserData() {
    return { ...this.userData };
  }

  // Reset user data
  resetUserData() {
    this.userData = {
      email: '',
      name: '',
      phone: '',
      secretCode: '',
      password: '',
    };
  }
}

export const voiceAuthService = new VoiceAuthService();