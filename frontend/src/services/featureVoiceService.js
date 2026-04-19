

// src/services/featureVoiceService.js - UPDATED
import { voiceService } from './voiceService';

class FeatureVoiceService {
  constructor() {
    this.featureCommands = new Map();
    this.featureName = '';
  }

  // Global navigation commands that work from ANY feature
  getGlobalNavigationCommands() {
    return {
      // Dashboard and navigation
      'go to dashboard': () => {
        this.speak('Going to dashboard');
        window.location.href = '/dashboard';
      },
      'dashboard': () => {
        this.speak('Opening dashboard');
        window.location.href = '/dashboard';
      },
      'home': () => {
        this.speak('Going to home');
        window.location.href = '/dashboard';
      },
      
      // Logout
      'logout': () => {
        this.speak('Logging out...');
        localStorage.clear();
        window.location.href = '/';
      },
      
      // Feature navigation - These are IMPORTANT!
      'news': () => {
        this.speak('Opening news reader');
        window.location.href = '/news';
      },
      'open news': () => {
        this.speak('Opening news reader');
        window.location.href = '/news';
      },
      'go to news': () => {
        this.speak('Going to news reader');
        window.location.href = '/news';
      },
      
      'weather': () => {
        this.speak('Opening weather forecast');
        window.location.href = '/weather';
      },
      'open weather': () => {
        this.speak('Opening weather forecast');
        window.location.href = '/weather';
      },
      'go to weather': () => {
        this.speak('Going to weather forecast');
        window.location.href = '/weather';
      },
      
      'calculator': () => {
        this.speak('Opening talking calculator');
        window.location.href = '/talking-calculator';
      },
      
      'object detection': () => {
        this.speak('Opening object detector');
        window.location.href = '/object-detector';
      },
      
      'profile': () => {
        this.speak('Opening profile');
        window.location.href = '/profile';
      },
      
      // Control
      'stop': () => {
        voiceService.stopListening();
        this.speak('Voice control stopped');
      },
      'help': () => {
        this.speak('I can help you navigate. Say: go to dashboard, go to news, go to weather, or logout');
      }
    };
  }

  activateFeature(featureName, commands = {}, options = {}) {
    console.log(`🎤 [FeatureVoice] Activating voice for: ${featureName}`);
    
    this.featureName = featureName;
    this.featureCommands.clear();
    
    // Set current feature in voice service
    voiceService.setFeature(featureName);
    
    // Clear ALL previous commands
    voiceService.clearCommands();
    
    // Register GLOBAL navigation commands FIRST
    const globalCommands = this.getGlobalNavigationCommands();
    Object.entries(globalCommands).forEach(([pattern, handler]) => {
      voiceService.registerCommand(pattern.toLowerCase(), handler);
    });
    
    // Register feature-specific commands
    Object.entries(commands).forEach(([pattern, handler]) => {
      const lowerPattern = pattern.toLowerCase();
      this.featureCommands.set(lowerPattern, handler);
      voiceService.registerCommand(lowerPattern, () => {
        console.log(`[FeatureVoice/${featureName}] Executing: "${pattern}"`);
        const result = handler();
        if (typeof result === 'string') {
          this.speak(result);
        }
      });
    });
    
    // Start listening if not already
    if (!voiceService.isListening) {
      voiceService.startListening();
    }
    
    console.log(`✅ [FeatureVoice] Activated ${this.featureCommands.size} commands for ${featureName}`);
    
    // Welcome message
    if (options.welcomeMessage !== false) {
      setTimeout(() => {
        this.speak(`${featureName} voice commands activated. Say "help" for available commands.`);
      }, 800);
    }
  }

  deactivateFeature() {
    console.log(`🔇 [FeatureVoice] Deactivating: ${this.featureName}`);
    
    this.featureCommands.clear();
    this.featureName = '';
    
    // Switch back to dashboard and clear commands
    voiceService.setFeature('dashboard');
    voiceService.clearCommands();
  }

  speak(text, options = {}) {
    voiceService.speak(text, options);
  }
}

export const featureVoiceService = new FeatureVoiceService();