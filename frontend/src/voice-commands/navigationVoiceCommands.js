export const navigationVoiceCommands = {
  // Basic navigation
  'go to dashboard': () => {
    window.location.href = '/dashboard';
  },
  'dashboard': () => {
    window.location.href = '/dashboard';
  },
  'home': () => {
    window.location.href = '/dashboard';
  },
  
  // Feature navigation
  'go to news': () => {
    window.location.href = '/news';
  },
  'go to object detection': () => {
    window.location.href = '/object-detection';
  },
  'go to weather': () => {
    window.location.href = '/weather';
  },
  'go to profile': () => {
    window.location.href = '/profile';
  },
  'go to ocr': () => {
    window.location.href = '/ocr-scanner';
  },
  'go to calculator': () => {
    window.location.href = '/calculator';
  },
  
  // System
  'logout': () => {
    localStorage.clear();
    window.location.href = '/';
  },
  'log out': () => {
    localStorage.clear();
    window.location.href = '/';
  },
  
  // Control
  'stop': () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  },
  'stop listening': () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  },
  
  // Help
  'help': () => {
    return 'I can help you navigate. Say: go to dashboard, go to news, go to object detection, or go to weather';
  },
  'what can you do': () => {
    return 'I can help you navigate between features. Say help for all commands.';
  }
};