



// // // // // // // // class VoiceService {
// // // // // // // //   constructor() {
// // // // // // // //     this.recognition = null;
// // // // // // // //     this.isListening = false;
// // // // // // // //     this.commands = new Map();
// // // // // // // //     this.onResultCallback = null;
// // // // // // // //     this.shouldBeListening = false;
// // // // // // // //     this.lastTranscript = '';
    
// // // // // // // //     this.initSpeechRecognition();
// // // // // // // //   }

// // // // // // // //   initSpeechRecognition() {
// // // // // // // //     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
// // // // // // // //     if (!SpeechRecognition) {
// // // // // // // //       console.error('Speech recognition not supported in this browser');
// // // // // // // //       return;
// // // // // // // //     }

// // // // // // // //     this.recognition = new SpeechRecognition();
// // // // // // // //     this.recognition.continuous = true;
// // // // // // // //     this.interimResults = true; // Enable interim results for continuous speech
// // // // // // // //     this.recognition.lang = 'en-US';

// // // // // // // //     this.recognition.onresult = (event) => {
// // // // // // // //       let interimTranscript = '';
// // // // // // // //       let finalTranscript = '';

// // // // // // // //       for (let i = event.resultIndex; i < event.results.length; i++) {
// // // // // // // //         const transcript = event.results[i][0].transcript;
// // // // // // // //         if (event.results[i].isFinal) {
// // // // // // // //           finalTranscript += transcript;
// // // // // // // //         } else {
// // // // // // // //           interimTranscript += transcript;
// // // // // // // //         }
// // // // // // // //       }

// // // // // // // //       // Store the full transcript
// // // // // // // //       this.lastTranscript = finalTranscript || interimTranscript;
      
// // // // // // // //       if (this.lastTranscript.trim()) {
// // // // // // // //         console.log('Speech detected:', this.lastTranscript);
        
// // // // // // // //         if (this.onResultCallback) {
// // // // // // // //           this.onResultCallback(this.lastTranscript);
// // // // // // // //         }
        
// // // // // // // //         if (finalTranscript) {
// // // // // // // //           this.processCommand(finalTranscript.toLowerCase().trim());
// // // // // // // //         }
// // // // // // // //       }
// // // // // // // //     };

// // // // // // // //     this.recognition.onerror = (event) => {
// // // // // // // //       console.error('Speech recognition error:', event.error);
// // // // // // // //     };
    
// // // // // // // //     this.recognition.onend = () => {
// // // // // // // //       this.isListening = false;
// // // // // // // //       console.log('Speech recognition ended');
      
// // // // // // // //       // Auto-restart if needed
// // // // // // // //       if (this.shouldBeListening) {
// // // // // // // //         setTimeout(() => {
// // // // // // // //           this.startListening();
// // // // // // // //         }, 100);
// // // // // // // //       }
// // // // // // // //     };
// // // // // // // //   }

// // // // // // // //   registerCommand(pattern, handler) {
// // // // // // // //     this.commands.set(pattern, handler);
// // // // // // // //   }

// // // // // // // //   processCommand(transcript) {
// // // // // // // //     console.log('Processing command:', transcript);
    
// // // // // // // //     // Try exact match first
// // // // // // // //     if (this.commands.has(transcript)) {
// // // // // // // //       this.commands.get(transcript)(transcript);
// // // // // // // //       return;
// // // // // // // //     }
    
// // // // // // // //     // Try partial match
// // // // // // // //     for (const [pattern, handler] of this.commands.entries()) {
// // // // // // // //       if (typeof pattern === 'string' && transcript.includes(pattern)) {
// // // // // // // //         handler(transcript);
// // // // // // // //         return;
// // // // // // // //       } else if (pattern instanceof RegExp && pattern.test(transcript)) {
// // // // // // // //         handler(transcript);
// // // // // // // //         return;
// // // // // // // //       }
// // // // // // // //     }
    
// // // // // // // //     // Default: if no command matched, check if it's secret code spelling
// // // // // // // //     if (this.onResultCallback) {
// // // // // // // //       this.onResultCallback(transcript);
// // // // // // // //     }
// // // // // // // //   }

// // // // // // // //   startListening() {
// // // // // // // //     if (this.recognition && !this.isListening) {
// // // // // // // //       try {
// // // // // // // //         this.recognition.start();
// // // // // // // //         this.isListening = true;
// // // // // // // //         this.shouldBeListening = true;
// // // // // // // //         console.log('Started listening...');
// // // // // // // //       } catch (error) {
// // // // // // // //         console.warn('Failed to start listening:', error);
// // // // // // // //         setTimeout(() => {
// // // // // // // //           if (this.shouldBeListening) {
// // // // // // // //             this.startListening();
// // // // // // // //           }
// // // // // // // //         }, 500);
// // // // // // // //       }
// // // // // // // //     }
// // // // // // // //   }

// // // // // // // //   stopListening() {
// // // // // // // //     if (this.recognition && this.isListening) {
// // // // // // // //       this.shouldBeListening = false;
// // // // // // // //       this.isListening = false;
// // // // // // // //       try {
// // // // // // // //         this.recognition.stop();
// // // // // // // //         console.log('Stopped listening...');
// // // // // // // //       } catch (error) {
// // // // // // // //         console.warn('Error stopping recognition:', error);
// // // // // // // //       }
// // // // // // // //     }
// // // // // // // //   }

// // // // // // // //   speak(text) {
// // // // // // // //     if ('speechSynthesis' in window) {
// // // // // // // //       window.speechSynthesis.cancel();
// // // // // // // //       const utterance = new SpeechSynthesisUtterance(text);
// // // // // // // //       utterance.rate = 0.9;
// // // // // // // //       utterance.pitch = 1.0;
// // // // // // // //       utterance.volume = 1.0;
// // // // // // // //       window.speechSynthesis.speak(utterance);
// // // // // // // //     }
// // // // // // // //   }

// // // // // // // //   setLanguage(lang) {
// // // // // // // //     if (this.recognition) {
// // // // // // // //       this.recognition.lang = lang;
// // // // // // // //     }
// // // // // // // //   }

// // // // // // // //   clearCommands() {
// // // // // // // //     this.commands.clear();
// // // // // // // //   }

// // // // // // // //   isAvailable() {
// // // // // // // //     return !!(window.SpeechRecognition || window.webkitSpeechRecognition);
// // // // // // // //   }

// // // // // // // //   getLastTranscript() {
// // // // // // // //     return this.lastTranscript;
// // // // // // // //   }

// // // // // // // //   clearTranscript() {
// // // // // // // //     this.lastTranscript = '';
// // // // // // // //   }
// // // // // // // // }

// // // // // // // // export const voiceService = new VoiceService();


// // // // // // // // src/services/voiceService.js - FIXED VERSION
// // // // // // // class VoiceService {
// // // // // // //   constructor() {
// // // // // // //     this.recognition = null;
// // // // // // //     this.isListening = false;
// // // // // // //     this.commands = new Map();
// // // // // // //     this.onResultCallback = null;
// // // // // // //     this.shouldBeListening = false;
// // // // // // //     this.lastTranscript = '';
    
// // // // // // //     this.initSpeechRecognition();
// // // // // // //   }

// // // // // // //   initSpeechRecognition() {
// // // // // // //     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
// // // // // // //     if (!SpeechRecognition) {
// // // // // // //       console.error('Speech recognition not supported in this browser');
// // // // // // //       return;
// // // // // // //     }

// // // // // // //     this.recognition = new SpeechRecognition();
// // // // // // //     this.recognition.continuous = true;
// // // // // // //     this.recognition.interimResults = true;
// // // // // // //     this.recognition.lang = 'en-US';

// // // // // // //     this.recognition.onresult = (event) => {
// // // // // // //       let finalTranscript = '';
      
// // // // // // //       for (let i = event.resultIndex; i < event.results.length; i++) {
// // // // // // //         if (event.results[i].isFinal) {
// // // // // // //           finalTranscript += event.results[i][0].transcript;
// // // // // // //         }
// // // // // // //       }

// // // // // // //       if (finalTranscript.trim()) {
// // // // // // //         this.lastTranscript = finalTranscript.trim();
// // // // // // //         console.log('Speech detected:', this.lastTranscript);
        
// // // // // // //         // Process the command
// // // // // // //         this.processCommand(this.lastTranscript.toLowerCase());
        
// // // // // // //         // Call callback if exists
// // // // // // //         if (this.onResultCallback) {
// // // // // // //           this.onResultCallback(this.lastTranscript);
// // // // // // //         }
// // // // // // //       }
// // // // // // //     };

// // // // // // //     this.recognition.onerror = (event) => {
// // // // // // //       console.error('Speech recognition error:', event.error);
// // // // // // //     };
    
// // // // // // //     this.recognition.onend = () => {
// // // // // // //       this.isListening = false;
// // // // // // //       console.log('Speech recognition ended');
      
// // // // // // //       // Auto-restart if needed
// // // // // // //       if (this.shouldBeListening) {
// // // // // // //         setTimeout(() => {
// // // // // // //           this.startListening();
// // // // // // //         }, 100);
// // // // // // //       }
// // // // // // //     };
// // // // // // //   }

// // // // // // //   registerCommand(pattern, handler) {
// // // // // // //     this.commands.set(pattern.toLowerCase(), handler);
// // // // // // //   }

// // // // // // //   processCommand(transcript) {
// // // // // // //     console.log('Processing command:', transcript);
    
// // // // // // //     // Try exact match first
// // // // // // //     if (this.commands.has(transcript)) {
// // // // // // //       this.commands.get(transcript)();
// // // // // // //       return;
// // // // // // //     }
    
// // // // // // //     // Try partial match
// // // // // // //     for (const [pattern, handler] of this.commands.entries()) {
// // // // // // //       if (transcript.includes(pattern)) {
// // // // // // //         handler();
// // // // // // //         return;
// // // // // // //       }
// // // // // // //     }
    
// // // // // // //     console.log('No command matched for:', transcript);
// // // // // // //   }

// // // // // // //   startListening() {
// // // // // // //     if (this.recognition && !this.isListening) {
// // // // // // //       try {
// // // // // // //         this.recognition.start();
// // // // // // //         this.isListening = true;
// // // // // // //         this.shouldBeListening = true;
// // // // // // //         console.log('Started listening...');
// // // // // // //       } catch (error) {
// // // // // // //         console.warn('Failed to start listening:', error);
// // // // // // //         setTimeout(() => {
// // // // // // //           if (this.shouldBeListening) {
// // // // // // //             this.startListening();
// // // // // // //           }
// // // // // // //         }, 500);
// // // // // // //       }
// // // // // // //     }
// // // // // // //   }

// // // // // // //   stopListening() {
// // // // // // //     if (this.recognition && this.isListening) {
// // // // // // //       this.shouldBeListening = false;
// // // // // // //       this.isListening = false;
// // // // // // //       try {
// // // // // // //         this.recognition.stop();
// // // // // // //         console.log('Stopped listening...');
// // // // // // //       } catch (error) {
// // // // // // //         console.warn('Error stopping recognition:', error);
// // // // // // //       }
// // // // // // //     }
// // // // // // //   }

// // // // // // //   speak(text, options = {}) {
// // // // // // //     if ('speechSynthesis' in window) {
// // // // // // //       window.speechSynthesis.cancel();
// // // // // // //       const utterance = new SpeechSynthesisUtterance(text);
// // // // // // //       utterance.rate = options.rate || 0.9;
// // // // // // //       utterance.pitch = options.pitch || 1.0;
// // // // // // //       utterance.volume = options.volume || 1.0;
      
// // // // // // //       // Get available voices
// // // // // // //       const voices = window.speechSynthesis.getVoices();
// // // // // // //       if (voices.length > 0) {
// // // // // // //         utterance.voice = voices[0]; // Use default voice
// // // // // // //       }
      
// // // // // // //       utterance.onend = () => {
// // // // // // //         console.log('Finished speaking:', text.substring(0, 50) + '...');
// // // // // // //       };
      
// // // // // // //       utterance.onerror = (event) => {
// // // // // // //         console.error('Speech synthesis error:', event);
// // // // // // //       };
      
// // // // // // //       window.speechSynthesis.speak(utterance);
// // // // // // //     }
// // // // // // //   }

// // // // // // //   setLanguage(lang) {
// // // // // // //     if (this.recognition) {
// // // // // // //       this.recognition.lang = lang;
// // // // // // //     }
// // // // // // //   }

// // // // // // //   clearCommands() {
// // // // // // //     this.commands.clear();
// // // // // // //   }

// // // // // // //   isAvailable() {
// // // // // // //     return !!(window.SpeechRecognition || window.webkitSpeechRecognition);
// // // // // // //   }

// // // // // // //   getLastTranscript() {
// // // // // // //     return this.lastTranscript;
// // // // // // //   }

// // // // // // //   clearTranscript() {
// // // // // // //     this.lastTranscript = '';
// // // // // // //   }
// // // // // // // }

// // // // // // // export const voiceService = new VoiceService();



// // // // // // // src/services/voiceService.js - UPDATED VERSION
// // // // // // class VoiceService {
// // // // // //   constructor() {
// // // // // //     this.recognition = null;
// // // // // //     this.isListening = false;
// // // // // //     this.commands = new Map();
// // // // // //     this.onResultCallback = null;
// // // // // //     this.shouldBeListening = false;
// // // // // //     this.lastTranscript = '';
// // // // // //     this.currentFeature = 'dashboard'; // Track current feature
// // // // // //     this.featureCallbacks = new Map(); // Store feature-specific callbacks
    
// // // // // //     this.initSpeechRecognition();
// // // // // //   }

// // // // // //   initSpeechRecognition() {
// // // // // //     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
// // // // // //     if (!SpeechRecognition) {
// // // // // //       console.error('Speech recognition not supported in this browser');
// // // // // //       return;
// // // // // //     }

// // // // // //     this.recognition = new SpeechRecognition();
// // // // // //     this.recognition.continuous = true;
// // // // // //     this.recognition.interimResults = true;
// // // // // //     this.recognition.lang = 'en-US';

// // // // // //     this.recognition.onresult = (event) => {
// // // // // //       let finalTranscript = '';
      
// // // // // //       for (let i = event.resultIndex; i < event.results.length; i++) {
// // // // // //         if (event.results[i].isFinal) {
// // // // // //           finalTranscript += event.results[i][0].transcript;
// // // // // //         }
// // // // // //       }

// // // // // //       if (finalTranscript.trim()) {
// // // // // //         this.lastTranscript = finalTranscript.trim();
// // // // // //         console.log(`[${this.currentFeature}] Speech detected:`, this.lastTranscript);
        
// // // // // //         // Call feature-specific callback if exists
// // // // // //         if (this.onResultCallback) {
// // // // // //           this.onResultCallback(this.lastTranscript);
// // // // // //         }
        
// // // // // //         // Process the command
// // // // // //         this.processCommand(this.lastTranscript.toLowerCase());
// // // // // //       }
// // // // // //     };

// // // // // //     this.recognition.onerror = (event) => {
// // // // // //       console.error('[VoiceService] Speech recognition error:', event.error);
// // // // // //     };
    
// // // // // //     this.recognition.onend = () => {
// // // // // //       this.isListening = false;
// // // // // //       console.log('[VoiceService] Speech recognition ended');
      
// // // // // //       if (this.shouldBeListening) {
// // // // // //         setTimeout(() => {
// // // // // //           this.startListening();
// // // // // //         }, 100);
// // // // // //       }
// // // // // //     };
// // // // // //   }

// // // // // //   registerCommand(pattern, handler) {
// // // // // //     this.commands.set(pattern.toLowerCase(), handler);
// // // // // //     console.log(`[VoiceService] Registered command: "${pattern}"`);
// // // // // //   }

// // // // // //   processCommand(transcript) {
// // // // // //     console.log(`[VoiceService/${this.currentFeature}] Processing: "${transcript}"`);
    
// // // // // //     // Try exact match first
// // // // // //     if (this.commands.has(transcript)) {
// // // // // //       console.log(`[VoiceService] Exact match found: "${transcript}"`);
// // // // // //       this.commands.get(transcript)();
// // // // // //       return;
// // // // // //     }
    
// // // // // //     // Try partial match
// // // // // //     for (const [pattern, handler] of this.commands.entries()) {
// // // // // //       if (transcript.includes(pattern)) {
// // // // // //         console.log(`[VoiceService] Partial match found: "${transcript}" includes "${pattern}"`);
// // // // // //         handler();
// // // // // //         return;
// // // // // //       }
// // // // // //     }
    
// // // // // //     console.log(`[VoiceService] No command matched for: "${transcript}"`);
// // // // // //   }

// // // // // //   // Set current feature and callback
// // // // // //   setFeature(featureName, callback = null) {
// // // // // //     console.log(`[VoiceService] Switching to feature: ${featureName}`);
// // // // // //     this.currentFeature = featureName;
    
// // // // // //     if (callback) {
// // // // // //       this.onResultCallback = callback;
// // // // // //     }
// // // // // //   }

// // // // // //   // Clear commands for a specific feature
// // // // // //   clearFeatureCommands() {
// // // // // //     console.log(`[VoiceService] Clearing commands for: ${this.currentFeature}`);
// // // // // //     // We'll keep navigation commands but clear feature-specific ones
// // // // // //     const navigationCommands = ['dashboard', 'home', 'go to dashboard', 'logout', 'help'];
// // // // // //     const newCommands = new Map();
    
// // // // // //     // Keep only navigation commands
// // // // // //     for (const [pattern, handler] of this.commands.entries()) {
// // // // // //       if (navigationCommands.some(navCmd => pattern.includes(navCmd))) {
// // // // // //         newCommands.set(pattern, handler);
// // // // // //       }
// // // // // //     }
    
// // // // // //     this.commands = newCommands;
// // // // // //   }

// // // // // //   startListening() {
// // // // // //     if (this.recognition && !this.isListening) {
// // // // // //       try {
// // // // // //         this.recognition.start();
// // // // // //         this.isListening = true;
// // // // // //         this.shouldBeListening = true;
// // // // // //         console.log('[VoiceService] Started listening...');
// // // // // //       } catch (error) {
// // // // // //         console.warn('[VoiceService] Failed to start listening:', error);
// // // // // //         setTimeout(() => {
// // // // // //           if (this.shouldBeListening) {
// // // // // //             this.startListening();
// // // // // //           }
// // // // // //         }, 500);
// // // // // //       }
// // // // // //     }
// // // // // //   }

// // // // // //   stopListening() {
// // // // // //     if (this.recognition && this.isListening) {
// // // // // //       this.shouldBeListening = false;
// // // // // //       this.isListening = false;
// // // // // //       try {
// // // // // //         this.recognition.stop();
// // // // // //         console.log('[VoiceService] Stopped listening...');
// // // // // //       } catch (error) {
// // // // // //         console.warn('[VoiceService] Error stopping recognition:', error);
// // // // // //       }
// // // // // //     }
// // // // // //   }

// // // // // //   speak(text, options = {}) {
// // // // // //     if ('speechSynthesis' in window) {
// // // // // //       // Don't cancel if something is already speaking
// // // // // //       if (!window.speechSynthesis.speaking) {
// // // // // //         const utterance = new SpeechSynthesisUtterance(text);
// // // // // //         utterance.rate = options.rate || 0.9;
// // // // // //         utterance.pitch = options.pitch || 1.0;
// // // // // //         utterance.volume = options.volume || 1.0;
        
// // // // // //         const voices = window.speechSynthesis.getVoices();
// // // // // //         if (voices.length > 0) {
// // // // // //           utterance.voice = voices[0];
// // // // // //         }
        
// // // // // //         utterance.onend = () => {
// // // // // //           console.log('[VoiceService] Finished speaking:', text.substring(0, 50) + '...');
// // // // // //         };
        
// // // // // //         utterance.onerror = (event) => {
// // // // // //           console.error('[VoiceService] Speech synthesis error:', event);
// // // // // //         };
        
// // // // // //         window.speechSynthesis.speak(utterance);
// // // // // //       } else {
// // // // // //         console.log('[VoiceService] Already speaking, skipping:', text.substring(0, 50) + '...');
// // // // // //       }
// // // // // //     }
// // // // // //   }

// // // // // //   clearCommands() {
// // // // // //     this.commands.clear();
// // // // // //     console.log('[VoiceService] All commands cleared');
// // // // // //   }

// // // // // //   isAvailable() {
// // // // // //     return !!(window.SpeechRecognition || window.webkitSpeechRecognition);
// // // // // //   }
// // // // // // }

// // // // // // export const voiceService = new VoiceService();


// // // // // // src/services/voiceService.js - COMPLETE WORKING VERSION
// // // // // class VoiceService {
// // // // //   constructor() {
// // // // //     this.recognition = null;
// // // // //     this.isListening = false;
// // // // //     this.commands = new Map();
// // // // //     this.onResultCallback = null;
// // // // //     this.shouldBeListening = false;
// // // // //     this.lastTranscript = '';
// // // // //     this.currentFeature = 'dashboard';
    
// // // // //     this.initSpeechRecognition();
// // // // //   }

// // // // //   initSpeechRecognition() {
// // // // //     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
// // // // //     if (!SpeechRecognition) {
// // // // //       console.error('Speech recognition not supported in this browser');
// // // // //       return;
// // // // //     }

// // // // //     this.recognition = new SpeechRecognition();
// // // // //     this.recognition.continuous = true;
// // // // //     this.recognition.interimResults = true;
// // // // //     this.recognition.lang = 'en-US';

// // // // //     this.recognition.onresult = (event) => {
// // // // //       let finalTranscript = '';
      
// // // // //       for (let i = event.resultIndex; i < event.results.length; i++) {
// // // // //         if (event.results[i].isFinal) {
// // // // //           finalTranscript += event.results[i][0].transcript;
// // // // //         }
// // // // //       }

// // // // //       if (finalTranscript.trim()) {
// // // // //         this.lastTranscript = finalTranscript.trim();
// // // // //         console.log(`[${this.currentFeature}] Speech detected:`, this.lastTranscript);
        
// // // // //         if (this.onResultCallback) {
// // // // //           this.onResultCallback(this.lastTranscript);
// // // // //         }
        
// // // // //         this.processCommand(this.lastTranscript.toLowerCase());
// // // // //       }
// // // // //     };

// // // // //     this.recognition.onerror = (event) => {
// // // // //       console.error('[VoiceService] Speech recognition error:', event.error);
// // // // //     };
    
// // // // //     this.recognition.onend = () => {
// // // // //       this.isListening = false;
// // // // //       console.log('[VoiceService] Speech recognition ended');
      
// // // // //       if (this.shouldBeListening) {
// // // // //         setTimeout(() => {
// // // // //           this.startListening();
// // // // //         }, 100);
// // // // //       }
// // // // //     };
// // // // //   }

// // // // //   registerCommand(pattern, handler) {
// // // // //     this.commands.set(pattern.toLowerCase(), handler);
// // // // //     console.log(`[VoiceService] Registered command: "${pattern}"`);
// // // // //   }

// // // // //   processCommand(transcript) {
// // // // //     console.log(`[VoiceService/${this.currentFeature}] Processing: "${transcript}"`);
    
// // // // //     if (this.commands.has(transcript)) {
// // // // //       console.log(`[VoiceService] Exact match found: "${transcript}"`);
// // // // //       this.commands.get(transcript)();
// // // // //       return;
// // // // //     }
    
// // // // //     for (const [pattern, handler] of this.commands.entries()) {
// // // // //       if (transcript.includes(pattern)) {
// // // // //         console.log(`[VoiceService] Partial match found: "${transcript}" includes "${pattern}"`);
// // // // //         handler();
// // // // //         return;
// // // // //       }
// // // // //     }
    
// // // // //     console.log(`[VoiceService] No command matched for: "${transcript}"`);
// // // // //   }

// // // // //   setFeature(featureName, callback = null) {
// // // // //     console.log(`[VoiceService] Switching to feature: ${featureName}`);
// // // // //     this.currentFeature = featureName;
    
// // // // //     if (callback) {
// // // // //       this.onResultCallback = callback;
// // // // //     }
// // // // //   }

// // // // //   clearFeatureCommands() {
// // // // //     console.log(`[VoiceService] Clearing commands for: ${this.currentFeature}`);
// // // // //     const navigationCommands = ['dashboard', 'home', 'go to dashboard', 'logout', 'help'];
// // // // //     const newCommands = new Map();
    
// // // // //     for (const [pattern, handler] of this.commands.entries()) {
// // // // //       if (navigationCommands.some(navCmd => pattern.includes(navCmd))) {
// // // // //         newCommands.set(pattern, handler);
// // // // //       }
// // // // //     }
    
// // // // //     this.commands = newCommands;
// // // // //   }

// // // // //   startListening() {
// // // // //     if (this.recognition && !this.isListening) {
// // // // //       try {
// // // // //         this.recognition.start();
// // // // //         this.isListening = true;
// // // // //         this.shouldBeListening = true;
// // // // //         console.log('[VoiceService] Started listening...');
// // // // //       } catch (error) {
// // // // //         console.warn('[VoiceService] Failed to start listening:', error);
// // // // //         setTimeout(() => {
// // // // //           if (this.shouldBeListening) {
// // // // //             this.startListening();
// // // // //           }
// // // // //         }, 500);
// // // // //       }
// // // // //     }
// // // // //   }

// // // // //   stopListening() {
// // // // //     if (this.recognition && this.isListening) {
// // // // //       this.shouldBeListening = false;
// // // // //       this.isListening = false;
// // // // //       try {
// // // // //         this.recognition.stop();
// // // // //         console.log('[VoiceService] Stopped listening...');
// // // // //       } catch (error) {
// // // // //         console.warn('[VoiceService] Error stopping recognition:', error);
// // // // //       }
// // // // //     }
// // // // //   }

// // // // //   speak(text, options = {}) {
// // // // //     if ('speechSynthesis' in window) {
// // // // //       if (!window.speechSynthesis.speaking) {
// // // // //         const utterance = new SpeechSynthesisUtterance(text);
// // // // //         utterance.rate = options.rate || 0.9;
// // // // //         utterance.pitch = options.pitch || 1.0;
// // // // //         utterance.volume = options.volume || 1.0;
        
// // // // //         const voices = window.speechSynthesis.getVoices();
// // // // //         if (voices.length > 0) {
// // // // //           utterance.voice = voices[0];
// // // // //         }
        
// // // // //         utterance.onend = () => {
// // // // //           console.log('[VoiceService] Finished speaking:', text.substring(0, 50) + '...');
// // // // //         };
        
// // // // //         utterance.onerror = (event) => {
// // // // //           console.error('[VoiceService] Speech synthesis error:', event);
// // // // //         };
        
// // // // //         window.speechSynthesis.speak(utterance);
// // // // //       } else {
// // // // //         console.log('[VoiceService] Already speaking, skipping:', text.substring(0, 50) + '...');
// // // // //       }
// // // // //     }
// // // // //   }

// // // // //   // Add this missing method
// // // // //   setLanguage(lang) {
// // // // //     if (this.recognition) {
// // // // //       this.recognition.lang = lang;
// // // // //     }
// // // // //   }

// // // // //   clearCommands() {
// // // // //     this.commands.clear();
// // // // //     console.log('[VoiceService] All commands cleared');
// // // // //   }

// // // // //   isAvailable() {
// // // // //     return !!(window.SpeechRecognition || window.webkitSpeechRecognition);
// // // // //   }

// // // // //   getLastTranscript() {
// // // // //     return this.lastTranscript;
// // // // //   }
// // // // // }

// // // // // export const voiceService = new VoiceService();


// // // // // src/services/voiceService.js - UPDATED VERSION
// // // // class VoiceService {
// // // //   constructor() {
// // // //     this.recognition = null;
// // // //     this.isListening = false;
// // // //     this.commands = new Map();
// // // //     this.onResultCallback = null;
// // // //     this.shouldBeListening = false;
// // // //     this.lastTranscript = '';
// // // //     this.currentFeature = 'dashboard';
// // // //     this.isStarting = false; // ADDED: Track if we're in the process of starting
    
// // // //     this.initSpeechRecognition();
// // // //   }

// // // //   initSpeechRecognition() {
// // // //     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
// // // //     if (!SpeechRecognition) {
// // // //       console.error('Speech recognition not supported in this browser');
// // // //       return;
// // // //     }

// // // //     this.recognition = new SpeechRecognition();
// // // //     this.recognition.continuous = true;
// // // //     this.recognition.interimResults = true;
// // // //     this.recognition.lang = 'en-US';

// // // //     this.recognition.onresult = (event) => {
// // // //       let finalTranscript = '';
      
// // // //       for (let i = event.resultIndex; i < event.results.length; i++) {
// // // //         if (event.results[i].isFinal) {
// // // //           finalTranscript += event.results[i][0].transcript;
// // // //         }
// // // //       }

// // // //       if (finalTranscript.trim()) {
// // // //         this.lastTranscript = finalTranscript.trim();
// // // //         console.log(`[${this.currentFeature}] Speech detected:`, this.lastTranscript);
        
// // // //         if (this.onResultCallback) {
// // // //           this.onResultCallback(this.lastTranscript);
// // // //         }
        
// // // //         this.processCommand(this.lastTranscript.toLowerCase());
// // // //       }
// // // //     };

// // // //     this.recognition.onerror = (event) => {
// // // //       console.error('[VoiceService] Speech recognition error:', event.error);
// // // //       this.isListening = false;
// // // //       this.isStarting = false;
// // // //     };
    
// // // //     this.recognition.onend = () => {
// // // //       console.log('[VoiceService] Speech recognition ended');
// // // //       this.isListening = false;
// // // //       this.isStarting = false;
      
// // // //       // Only restart if we should be listening AND we're not in the middle of a feature switch
// // // //       if (this.shouldBeListening && !this.isStarting) {
// // // //         console.log('[VoiceService] Auto-restarting...');
// // // //         setTimeout(() => {
// // // //           this.startListening();
// // // //         }, 100);
// // // //       }
// // // //     };
// // // //   }

// // // //   registerCommand(pattern, handler) {
// // // //     this.commands.set(pattern.toLowerCase(), handler);
// // // //     console.log(`[VoiceService] Registered command: "${pattern}"`);
// // // //   }

// // // //   processCommand(transcript) {
// // // //     console.log(`[VoiceService/${this.currentFeature}] Processing: "${transcript}"`);
    
// // // //     if (this.commands.has(transcript)) {
// // // //       console.log(`[VoiceService] Exact match found: "${transcript}"`);
// // // //       this.commands.get(transcript)();
// // // //       return;
// // // //     }
    
// // // //     for (const [pattern, handler] of this.commands.entries()) {
// // // //       if (transcript.includes(pattern)) {
// // // //         console.log(`[VoiceService] Partial match found: "${transcript}" includes "${pattern}"`);
// // // //         handler();
// // // //         return;
// // // //       }
// // // //     }
    
// // // //     console.log(`[VoiceService] No command matched for: "${transcript}"`);
// // // //   }

// // // //   setFeature(featureName, callback = null) {
// // // //     console.log(`[VoiceService] Switching to feature: ${featureName}`);
// // // //     this.currentFeature = featureName;
    
// // // //     if (callback) {
// // // //       this.onResultCallback = callback;
// // // //     }
// // // //   }

// // // //   clearFeatureCommands() {
// // // //     console.log(`[VoiceService] Clearing commands for: ${this.currentFeature}`);
// // // //     const navigationCommands = ['dashboard', 'home', 'go to dashboard', 'logout', 'help'];
// // // //     const newCommands = new Map();
    
// // // //     for (const [pattern, handler] of this.commands.entries()) {
// // // //       if (navigationCommands.some(navCmd => pattern.includes(navCmd))) {
// // // //         newCommands.set(pattern, handler);
// // // //       }
// // // //     }
    
// // // //     this.commands = newCommands;
// // // //   }

// // // //   startListening() {
// // // //     if (!this.recognition) {
// // // //       console.warn('[VoiceService] Recognition not initialized');
// // // //       return;
// // // //     }
    
// // // //     if (this.isListening) {
// // // //       console.log('[VoiceService] Already listening, skipping start');
// // // //       return;
// // // //     }
    
// // // //     if (this.isStarting) {
// // // //       console.log('[VoiceService] Already starting, skipping');
// // // //       return;
// // // //     }
    
// // // //     try {
// // // //       this.isStarting = true;
// // // //       this.recognition.start();
// // // //       this.isListening = true;
// // // //       this.shouldBeListening = true;
// // // //       this.isStarting = false;
// // // //       console.log('[VoiceService] Started listening...');
// // // //     } catch (error) {
// // // //       console.warn('[VoiceService] Failed to start listening:', error.message);
// // // //       this.isListening = false;
// // // //       this.isStarting = false;
      
// // // //       // Don't auto-restart on fatal errors
// // // //       if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
// // // //         this.shouldBeListening = false;
// // // //         console.warn('[VoiceService] Microphone permission denied');
// // // //       } else {
// // // //         // For other errors, try again after a delay
// // // //         setTimeout(() => {
// // // //           if (this.shouldBeListening && !this.isListening) {
// // // //             this.startListening();
// // // //           }
// // // //         }, 1000);
// // // //       }
// // // //     }
// // // //   }

// // // //   stopListening() {
// // // //     this.shouldBeListening = false;
// // // //     this.isStarting = false;
    
// // // //     if (this.recognition && this.isListening) {
// // // //       this.isListening = false;
// // // //       try {
// // // //         this.recognition.stop();
// // // //         console.log('[VoiceService] Stopped listening...');
// // // //       } catch (error) {
// // // //         console.warn('[VoiceService] Error stopping recognition:', error.message);
// // // //       }
// // // //     }
// // // //   }

// // // //   speak(text, options = {}) {
// // // //     if ('speechSynthesis' in window) {
// // // //       // Cancel any ongoing speech
// // // //       window.speechSynthesis.cancel();
      
// // // //       const utterance = new SpeechSynthesisUtterance(text);
// // // //       utterance.rate = options.rate || 0.9;
// // // //       utterance.pitch = options.pitch || 1.0;
// // // //       utterance.volume = options.volume || 1.0;
      
// // // //       const voices = window.speechSynthesis.getVoices();
// // // //       if (voices.length > 0) {
// // // //         utterance.voice = voices[0];
// // // //       }
      
// // // //       utterance.onend = () => {
// // // //         console.log('[VoiceService] Finished speaking:', text.substring(0, 50) + '...');
// // // //       };
      
// // // //       utterance.onerror = (event) => {
// // // //         console.error('[VoiceService] Speech synthesis error:', event);
// // // //       };
      
// // // //       window.speechSynthesis.speak(utterance);
// // // //     }
// // // //   }

// // // //   setLanguage(lang) {
// // // //     if (this.recognition) {
// // // //       this.recognition.lang = lang;
// // // //     }
// // // //   }

// // // //   clearCommands() {
// // // //     this.commands.clear();
// // // //     console.log('[VoiceService] All commands cleared');
// // // //   }

// // // //   isAvailable() {
// // // //     return !!(window.SpeechRecognition || window.webkitSpeechRecognition);
// // // //   }

// // // //   getLastTranscript() {
// // // //     return this.lastTranscript;
// // // //   }
// // // // }

// // // // export const voiceService = new VoiceService();





// // // // src/services/voiceService.js - UPDATED VERSION
// // // class VoiceService {
// // //   constructor() {
// // //     this.recognition = null;
// // //     this.isListening = false;
// // //     this.commands = new Map();
// // //     this.onResultCallback = null;
// // //     this.shouldBeListening = false;
// // //     this.lastTranscript = '';
// // //     this.currentFeature = 'dashboard';
// // //     this.isStarting = false;
// // //     this.dynamicHandlers = []; // ADD THIS: for handling complex commands
    
// // //     this.initSpeechRecognition();
// // //   }

// // //   initSpeechRecognition() {
// // //     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
// // //     if (!SpeechRecognition) {
// // //       console.error('Speech recognition not supported in this browser');
// // //       return;
// // //     }

// // //     this.recognition = new SpeechRecognition();
// // //     this.recognition.continuous = true;
// // //     this.recognition.interimResults = true;
// // //     this.recognition.lang = 'en-US';

// // //     this.recognition.onresult = (event) => {
// // //       let finalTranscript = '';
      
// // //       for (let i = event.resultIndex; i < event.results.length; i++) {
// // //         if (event.results[i].isFinal) {
// // //           finalTranscript += event.results[i][0].transcript;
// // //         }
// // //       }

// // //       if (finalTranscript.trim()) {
// // //         this.lastTranscript = finalTranscript.trim();
// // //         console.log(`[${this.currentFeature}] Speech detected:`, this.lastTranscript);
        
// // //         // First, try dynamic handlers (like location change)
// // //         if (this.handleDynamicCommand(this.lastTranscript.toLowerCase())) {
// // //           return;
// // //         }
        
// // //         if (this.onResultCallback) {
// // //           this.onResultCallback(this.lastTranscript);
// // //         }
        
// // //         this.processCommand(this.lastTranscript.toLowerCase());
// // //       }
// // //     };

// // //     this.recognition.onerror = (event) => {
// // //       console.error('[VoiceService] Speech recognition error:', event.error);
// // //       this.isListening = false;
// // //       this.isStarting = false;
// // //     };
    
// // //     this.recognition.onend = () => {
// // //       console.log('[VoiceService] Speech recognition ended');
// // //       this.isListening = false;
// // //       this.isStarting = false;
      
// // //       if (this.shouldBeListening && !this.isStarting) {
// // //         console.log('[VoiceService] Auto-restarting...');
// // //         setTimeout(() => {
// // //           this.startListening();
// // //         }, 100);
// // //       }
// // //     };
// // //   }

// // //   // NEW METHOD: Handle dynamic commands (like location changes)
// // //   handleDynamicCommand(transcript) {
// // //     for (const handler of this.dynamicHandlers) {
// // //       if (handler.pattern.test(transcript)) {
// // //         console.log(`[VoiceService] Dynamic match found: "${transcript}"`);
// // //         handler.callback(transcript);
// // //         return true;
// // //       }
// // //     }
// // //     return false;
// // //   }

// // //   // NEW METHOD: Register dynamic command handler
// // //   registerDynamicHandler(pattern, callback) {
// // //     this.dynamicHandlers.push({
// // //       pattern: new RegExp(pattern, 'i'),
// // //       callback
// // //     });
// // //     console.log(`[VoiceService] Registered dynamic handler: "${pattern}"`);
// // //   }

// // //   // NEW METHOD: Clear dynamic handlers
// // //   clearDynamicHandlers() {
// // //     this.dynamicHandlers = [];
// // //     console.log('[VoiceService] Cleared dynamic handlers');
// // //   }

// // //   // ... rest of your existing VoiceService methods remain the same ...
  
// // //   processCommand(transcript) {
// // //     console.log(`[VoiceService/${this.currentFeature}] Processing: "${transcript}"`);
    
// // //     if (this.commands.has(transcript)) {
// // //       console.log(`[VoiceService] Exact match found: "${transcript}"`);
// // //       this.commands.get(transcript)();
// // //       return;
// // //     }
    
// // //     for (const [pattern, handler] of this.commands.entries()) {
// // //       if (transcript.includes(pattern)) {
// // //         console.log(`[VoiceService] Partial match found: "${transcript}" includes "${pattern}"`);
// // //         handler();
// // //         return;
// // //       }
// // //     }
    
// // //     console.log(`[VoiceService] No command matched for: "${transcript}"`);
// // //   }

// // //   setFeature(featureName, callback = null) {
// // //     console.log(`[VoiceService] Switching to feature: ${featureName}`);
// // //     this.currentFeature = featureName;
    
// // //     if (callback) {
// // //       this.onResultCallback = callback;
// // //     }
// // //   }

// // //   clearFeatureCommands() {
// // //     console.log(`[VoiceService] Clearing commands for: ${this.currentFeature}`);
// // //     const navigationCommands = ['dashboard', 'home', 'go to dashboard', 'logout', 'help'];
// // //     const newCommands = new Map();
    
// // //     for (const [pattern, handler] of this.commands.entries()) {
// // //       if (navigationCommands.some(navCmd => pattern.includes(navCmd))) {
// // //         newCommands.set(pattern, handler);
// // //       }
// // //     }
    
// // //     this.commands = newCommands;
// // //   }

// // //   startListening() {
// // //     if (!this.recognition) {
// // //       console.warn('[VoiceService] Recognition not initialized');
// // //       return;
// // //     }
    
// // //     if (this.isListening) {
// // //       console.log('[VoiceService] Already listening, skipping start');
// // //       return;
// // //     }
    
// // //     if (this.isStarting) {
// // //       console.log('[VoiceService] Already starting, skipping');
// // //       return;
// // //     }
    
// // //     try {
// // //       this.isStarting = true;
// // //       this.recognition.start();
// // //       this.isListening = true;
// // //       this.shouldBeListening = true;
// // //       this.isStarting = false;
// // //       console.log('[VoiceService] Started listening...');
// // //     } catch (error) {
// // //       console.warn('[VoiceService] Failed to start listening:', error.message);
// // //       this.isListening = false;
// // //       this.isStarting = false;
      
// // //       // Don't auto-restart on fatal errors
// // //       if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
// // //         this.shouldBeListening = false;
// // //         console.warn('[VoiceService] Microphone permission denied');
// // //       } else {
// // //         // For other errors, try again after a delay
// // //         setTimeout(() => {
// // //           if (this.shouldBeListening && !this.isListening) {
// // //             this.startListening();
// // //           }
// // //         }, 1000);
// // //       }
// // //     }
// // //   }

// // //   stopListening() {
// // //     this.shouldBeListening = false;
// // //     this.isStarting = false;
    
// // //     if (this.recognition && this.isListening) {
// // //       this.isListening = false;
// // //       try {
// // //         this.recognition.stop();
// // //         console.log('[VoiceService] Stopped listening...');
// // //       } catch (error) {
// // //         console.warn('[VoiceService] Error stopping recognition:', error.message);
// // //       }
// // //     }
// // //   }

// // //   speak(text, options = {}) {
// // //     if ('speechSynthesis' in window) {
// // //       // Cancel any ongoing speech
// // //       window.speechSynthesis.cancel();
      
// // //       const utterance = new SpeechSynthesisUtterance(text);
// // //       utterance.rate = options.rate || 0.9;
// // //       utterance.pitch = options.pitch || 1.0;
// // //       utterance.volume = options.volume || 1.0;
      
// // //       const voices = window.speechSynthesis.getVoices();
// // //       if (voices.length > 0) {
// // //         utterance.voice = voices[0];
// // //       }
      
// // //       utterance.onend = () => {
// // //         console.log('[VoiceService] Finished speaking:', text.substring(0, 50) + '...');
// // //       };
      
// // //       utterance.onerror = (event) => {
// // //         console.error('[VoiceService] Speech synthesis error:', event);
// // //       };
      
// // //       window.speechSynthesis.speak(utterance);
// // //     }
// // //   }

// // //   setLanguage(lang) {
// // //     if (this.recognition) {
// // //       this.recognition.lang = lang;
// // //     }
// // //   }

// // //   clearCommands() {
// // //     this.commands.clear();
// // //     console.log('[VoiceService] All commands cleared');
// // //   }

// // //   isAvailable() {
// // //     return !!(window.SpeechRecognition || window.webkitSpeechRecognition);
// // //   }

// // //   getLastTranscript() {
// // //     return this.lastTranscript;
// // //   }
// // // }

// // //   // ... rest of the class remains the same ...


// // // export const voiceService = new VoiceService();


// // // // src/services/voiceService.js - COMPLETE UPDATED VERSION
// // // class VoiceService {
// // //   constructor() {
// // //     this.recognition = null;
// // //     this.isListening = false;
// // //     this.commands = new Map();
// // //     this.onResultCallback = null;
// // //     this.shouldBeListening = false;
// // //     this.lastTranscript = '';
// // //     this.currentFeature = 'dashboard';
// // //     this.isStarting = false;
// // //     this.dynamicHandlers = []; // Array for regex-based dynamic command handlers
    
// // //     this.initSpeechRecognition();
// // //   }

// // //   initSpeechRecognition() {
// // //     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
// // //     if (!SpeechRecognition) {
// // //       console.error('Speech recognition not supported in this browser');
// // //       return;
// // //     }

// // //     this.recognition = new SpeechRecognition();
// // //     this.recognition.continuous = true;
// // //     this.recognition.interimResults = true;
// // //     this.recognition.lang = 'en-US';

// // //     this.recognition.onresult = (event) => {
// // //       let finalTranscript = '';
      
// // //       for (let i = event.resultIndex; i < event.results.length; i++) {
// // //         if (event.results[i].isFinal) {
// // //           finalTranscript += event.results[i][0].transcript;
// // //         }
// // //       }

// // //       if (finalTranscript.trim()) {
// // //         this.lastTranscript = finalTranscript.trim();
// // //         const transcript = this.lastTranscript.toLowerCase();
// // //         console.log(`[${this.currentFeature}] Speech detected:`, this.lastTranscript);
        
// // //         // First try dynamic handlers (for regex patterns like "change location to London")
// // //         if (this.handleDynamicCommand(transcript)) {
// // //           return;
// // //         }
        
// // //         // Then try normal command processing
// // //         this.processCommand(transcript);
        
// // //         // Finally call the general callback if set
// // //         if (this.onResultCallback) {
// // //           this.onResultCallback(this.lastTranscript);
// // //         }
// // //       }
// // //     };

// // //     this.recognition.onerror = (event) => {
// // //       console.error('[VoiceService] Speech recognition error:', event.error);
// // //       this.isListening = false;
// // //       this.isStarting = false;
// // //     };
    
// // //     this.recognition.onend = () => {
// // //       console.log('[VoiceService] Speech recognition ended');
// // //       this.isListening = false;
// // //       this.isStarting = false;
      
// // //       // Only restart if we should be listening AND we're not in the middle of a feature switch
// // //       if (this.shouldBeListening && !this.isStarting) {
// // //         console.log('[VoiceService] Auto-restarting...');
// // //         setTimeout(() => {
// // //           this.startListening();
// // //         }, 100);
// // //       }
// // //     };
// // //   }

// // //   // NEW METHOD: Handle dynamic commands with regex patterns
// // //   handleDynamicCommand(transcript) {
// // //     for (const handler of this.dynamicHandlers) {
// // //       if (handler.pattern.test(transcript)) {
// // //         console.log(`[VoiceService] Dynamic match found for pattern: ${handler.pattern}`);
// // //         const match = transcript.match(handler.pattern);
// // //         handler.callback(match ? match.slice(1) : [], transcript);
// // //         return true;
// // //       }
// // //     }
// // //     return false;
// // //   }

// // //   // NEW METHOD: Register a dynamic handler with regex pattern
// // //   registerDynamicHandler(pattern, callback) {
// // //     const regex = typeof pattern === 'string' ? new RegExp(pattern, 'i') : pattern;
// // //     this.dynamicHandlers.push({
// // //       pattern: regex,
// // //       callback
// // //     });
// // //     console.log(`[VoiceService] Registered dynamic handler: ${regex}`);
// // //   }

// // //   // NEW METHOD: Clear all dynamic handlers
// // //   clearDynamicHandlers() {
// // //     this.dynamicHandlers = [];
// // //     console.log('[VoiceService] Cleared dynamic handlers');
// // //   }

// // //   // Rest of your existing methods...

// // //   registerCommand(pattern, handler) {
// // //     this.commands.set(pattern.toLowerCase(), handler);
// // //     console.log(`[VoiceService] Registered command: "${pattern}"`);
// // //   }

// // //   processCommand(transcript) {
// // //     console.log(`[VoiceService/${this.currentFeature}] Processing: "${transcript}"`);
    
// // //     if (this.commands.has(transcript)) {
// // //       console.log(`[VoiceService] Exact match found: "${transcript}"`);
// // //       this.commands.get(transcript)();
// // //       return;
// // //     }
    
// // //     for (const [pattern, handler] of this.commands.entries()) {
// // //       if (transcript.includes(pattern)) {
// // //         console.log(`[VoiceService] Partial match found: "${transcript}" includes "${pattern}"`);
// // //         handler();
// // //         return;
// // //       }
// // //     }
    
// // //     console.log(`[VoiceService] No command matched for: "${transcript}"`);
// // //   }

// // //   setFeature(featureName, callback = null) {
// // //     console.log(`[VoiceService] Switching to feature: ${featureName}`);
// // //     this.currentFeature = featureName;
    
// // //     if (callback) {
// // //       this.onResultCallback = callback;
// // //     }
// // //   }

// // //   clearFeatureCommands() {
// // //     console.log(`[VoiceService] Clearing commands for: ${this.currentFeature}`);
// // //     const navigationCommands = ['dashboard', 'home', 'go to dashboard', 'logout', 'help'];
// // //     const newCommands = new Map();
    
// // //     for (const [pattern, handler] of this.commands.entries()) {
// // //       if (navigationCommands.some(navCmd => pattern.includes(navCmd))) {
// // //         newCommands.set(pattern, handler);
// // //       }
// // //     }
    
// // //     this.commands = newCommands;
// // //   }

// // //   startListening() {
// // //     if (!this.recognition) {
// // //       console.warn('[VoiceService] Recognition not initialized');
// // //       return;
// // //     }
    
// // //     if (this.isListening) {
// // //       console.log('[VoiceService] Already listening, skipping start');
// // //       return;
// // //     }
    
// // //     if (this.isStarting) {
// // //       console.log('[VoiceService] Already starting, skipping');
// // //       return;
// // //     }
    
// // //     try {
// // //       this.isStarting = true;
// // //       this.recognition.start();
// // //       this.isListening = true;
// // //       this.shouldBeListening = true;
// // //       this.isStarting = false;
// // //       console.log('[VoiceService] Started listening...');
// // //     } catch (error) {
// // //       console.warn('[VoiceService] Failed to start listening:', error.message);
// // //       this.isListening = false;
// // //       this.isStarting = false;
      
// // //       // Don't auto-restart on fatal errors
// // //       if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
// // //         this.shouldBeListening = false;
// // //         console.warn('[VoiceService] Microphone permission denied');
// // //       } else {
// // //         // For other errors, try again after a delay
// // //         setTimeout(() => {
// // //           if (this.shouldBeListening && !this.isListening) {
// // //             this.startListening();
// // //           }
// // //         }, 1000);
// // //       }
// // //     }
// // //   }

// // //   stopListening() {
// // //     this.shouldBeListening = false;
// // //     this.isStarting = false;
    
// // //     if (this.recognition && this.isListening) {
// // //       this.isListening = false;
// // //       try {
// // //         this.recognition.stop();
// // //         console.log('[VoiceService] Stopped listening...');
// // //       } catch (error) {
// // //         console.warn('[VoiceService] Error stopping recognition:', error.message);
// // //       }
// // //     }
// // //   }

// // //   speak(text, options = {}) {
// // //     if ('speechSynthesis' in window) {
// // //       // Cancel any ongoing speech
// // //       window.speechSynthesis.cancel();
      
// // //       const utterance = new SpeechSynthesisUtterance(text);
// // //       utterance.rate = options.rate || 0.9;
// // //       utterance.pitch = options.pitch || 1.0;
// // //       utterance.volume = options.volume || 1.0;
      
// // //       const voices = window.speechSynthesis.getVoices();
// // //       if (voices.length > 0) {
// // //         utterance.voice = voices[0];
// // //       }
      
// // //       utterance.onend = () => {
// // //         console.log('[VoiceService] Finished speaking:', text.substring(0, 50) + '...');
// // //       };
      
// // //       utterance.onerror = (event) => {
// // //         console.error('[VoiceService] Speech synthesis error:', event);
// // //       };
      
// // //       window.speechSynthesis.speak(utterance);
// // //     }
// // //   }

// // //   setLanguage(lang) {
// // //     if (this.recognition) {
// // //       this.recognition.lang = lang;
// // //     }
// // //   }

// // //   clearCommands() {
// // //     this.commands.clear();
// // //     console.log('[VoiceService] All commands cleared');
// // //   }

// // //   isAvailable() {
// // //     return !!(window.SpeechRecognition || window.webkitSpeechRecognition);
// // //   }

// // //   getLastTranscript() {
// // //     return this.lastTranscript;
// // //   }
// // // }

// // // export const voiceService = new VoiceService();


// // // src/services/voiceService.js - FIXED VERSION
// // class VoiceService {
// //   constructor() {
// //     this.recognition = null;
// //     this.isListening = false;
// //     this.commands = new Map();
// //     this.onResultCallback = null;
// //     this.shouldBeListening = false;
// //     this.lastTranscript = '';
// //     this.currentFeature = 'dashboard';
// //     this.isStarting = false;
// //     this.dynamicHandlers = [];
// //     this.restartAttempts = 0;
// //     this.maxRestartAttempts = 3;
    
// //     this.initSpeechRecognition();
// //   }

// //   initSpeechRecognition() {
// //     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
// //     if (!SpeechRecognition) {
// //       console.error('Speech recognition not supported in this browser');
// //       return;
// //     }

// //     this.recognition = new SpeechRecognition();
// //     this.recognition.continuous = true;
// //     this.recognition.interimResults = true;
// //     this.recognition.lang = 'en-US';

// //     this.recognition.onstart = () => {
// //       console.log('[VoiceService] Speech recognition started');
// //       this.isListening = true;
// //       this.isStarting = false;
// //       this.restartAttempts = 0; // Reset restart attempts on successful start
// //     };

// //     this.recognition.onresult = (event) => {
// //       let finalTranscript = '';
      
// //       for (let i = event.resultIndex; i < event.results.length; i++) {
// //         if (event.results[i].isFinal) {
// //           finalTranscript += event.results[i][0].transcript;
// //         }
// //       }

// //       if (finalTranscript.trim()) {
// //         this.lastTranscript = finalTranscript.trim();
// //         const transcript = this.lastTranscript.toLowerCase();
// //         console.log(`[${this.currentFeature}] Speech detected:`, this.lastTranscript);
        
// //         // First try dynamic handlers (for regex patterns like "change location to London")
// //         if (this.handleDynamicCommand(transcript)) {
// //           return;
// //         }
        
// //         // Then try normal command processing
// //         this.processCommand(transcript);
        
// //         // Finally call the general callback if set
// //         if (this.onResultCallback) {
// //           this.onResultCallback(this.lastTranscript);
// //         }
// //       }
// //     };

// //     this.recognition.onerror = (event) => {
// //       console.error('[VoiceService] Speech recognition error:', event.error);
// //       this.isListening = false;
// //       this.isStarting = false;
      
// //       // Handle specific errors
// //       switch(event.error) {
// //         case 'network':
// //           console.warn('[VoiceService] Network error, trying to restart...');
// //           this.safeRestart(2000);
// //           break;
          
// //         case 'not-allowed':
// //         case 'service-not-allowed':
// //           console.warn('[VoiceService] Microphone permission denied');
// //           this.shouldBeListening = false;
// //           break;
          
// //         case 'aborted':
// //           console.warn('[VoiceService] Speech recognition aborted');
// //           break;
          
// //         case 'audio-capture':
// //           console.warn('[VoiceService] No microphone found or microphone is busy');
// //           break;
          
// //         case 'no-speech':
// //           console.warn('[VoiceService] No speech detected');
// //           // Don't restart immediately for no-speech errors
// //           break;
          
// //         default:
// //           console.warn('[VoiceService] Unknown error, trying to restart...');
// //           this.safeRestart(1000);
// //           break;
// //       }
// //     };
    
// //     this.recognition.onend = () => {
// //       console.log('[VoiceService] Speech recognition ended');
// //       this.isListening = false;
// //       this.isStarting = false;
      
// //       // Only restart if we should be listening
// //       if (this.shouldBeListening && !this.isStarting) {
// //         console.log('[VoiceService] Auto-restarting...');
// //         this.safeRestart(100);
// //       }
// //     };
// //   }

// //   // Safe restart with delay and attempt limiting
// //   safeRestart(delay = 100) {
// //     if (this.restartAttempts >= this.maxRestartAttempts) {
// //       console.warn('[VoiceService] Max restart attempts reached, stopping');
// //       this.shouldBeListening = false;
// //       return;
// //     }
    
// //     this.restartAttempts++;
// //     setTimeout(() => {
// //       if (this.shouldBeListening && !this.isListening && !this.isStarting) {
// //         console.log(`[VoiceService] Attempting restart (${this.restartAttempts}/${this.maxRestartAttempts})`);
// //         this.startListening();
// //       }
// //     }, delay);
// //   }

// //   handleDynamicCommand(transcript) {
// //     for (const handler of this.dynamicHandlers) {
// //       if (handler.pattern.test(transcript)) {
// //         console.log(`[VoiceService] Dynamic match found for pattern: ${handler.pattern}`);
// //         const match = transcript.match(handler.pattern);
// //         handler.callback(match ? match.slice(1) : [], transcript);
// //         return true;
// //       }
// //     }
// //     return false;
// //   }

// //   registerDynamicHandler(pattern, callback) {
// //     const regex = typeof pattern === 'string' ? new RegExp(pattern, 'i') : pattern;
// //     this.dynamicHandlers.push({
// //       pattern: regex,
// //       callback
// //     });
// //     console.log(`[VoiceService] Registered dynamic handler: ${regex}`);
// //   }

// //   clearDynamicHandlers() {
// //     this.dynamicHandlers = [];
// //     console.log('[VoiceService] Cleared dynamic handlers');
// //   }

// //   registerCommand(pattern, handler) {
// //     this.commands.set(pattern.toLowerCase(), handler);
// //     console.log(`[VoiceService] Registered command: "${pattern}"`);
// //   }

// //   // processCommand(transcript) {
// //   //   console.log(`[VoiceService/${this.currentFeature}] Processing: "${transcript}"`);
    
// //   //   if (this.commands.has(transcript)) {
// //   //     console.log(`[VoiceService] Exact match found: "${transcript}"`);
// //   //     this.commands.get(transcript)();
// //   //     return;
// //   //   }
    
// //   //   for (const [pattern, handler] of this.commands.entries()) {
// //   //     if (transcript.includes(pattern)) {
// //   //       console.log(`[VoiceService] Partial match found: "${transcript}" includes "${pattern}"`);
// //   //       handler();
// //   //       return;
// //   //     }
// //   //   }
    
// //   //   console.log(`[VoiceService] No command matched for: "${transcript}"`);
// //   // }

// //   // In voiceService.js - Update the processCommand method
// // processCommand(transcript) {
// //   console.log(`[VoiceService/${this.currentFeature}] Processing: "${transcript}"`);
  
// //   // 1. First check for exact match
// //   if (this.commands.has(transcript)) {
// //     console.log(`[VoiceService] Exact match found: "${transcript}"`);
// //     this.commands.get(transcript)();
// //     return;
// //   }
  
// //   // 2. Check for partial matches ONLY for single-word commands
// //   // Don't use partial matching for multi-word transcripts
// //   const words = transcript.split(' ');
  
// //   // If it's a single word, check for partial matches
// //   if (words.length === 1) {
// //     for (const [pattern, handler] of this.commands.entries()) {
// //       // Only match single-word patterns with single-word input
// //       const patternWords = pattern.split(' ');
// //       if (patternWords.length === 1 && transcript.includes(pattern)) {
// //         console.log(`[VoiceService] Single-word partial match: "${transcript}" includes "${pattern}"`);
// //         handler();
// //         return;
// //       }
// //     }
// //   }
  
// //   // 3. For multi-word phrases, only match exact phrases
// //   for (const [pattern, handler] of this.commands.entries()) {
// //     const patternWords = pattern.split(' ');
// //     // For multi-word patterns, check if transcript starts with pattern
// //     if (patternWords.length > 1 && transcript.startsWith(pattern)) {
// //       console.log(`[VoiceService] Multi-word start match: "${transcript}" starts with "${pattern}"`);
// //       handler();
// //       return;
// //     }
// //   }
  
// //   console.log(`[VoiceService] No command matched for: "${transcript}"`);
// // }

// //   setFeature(featureName, callback = null) {
// //     console.log(`[VoiceService] Switching to feature: ${featureName}`);
// //     this.currentFeature = featureName;
    
// //     if (callback) {
// //       this.onResultCallback = callback;
// //     }
// //   }

// //   clearFeatureCommands() {
// //     console.log(`[VoiceService] Clearing commands for: ${this.currentFeature}`);
// //     const navigationCommands = ['dashboard', 'home', 'go to dashboard', 'logout', 'help'];
// //     const newCommands = new Map();
    
// //     for (const [pattern, handler] of this.commands.entries()) {
// //       if (navigationCommands.some(navCmd => pattern.includes(navCmd))) {
// //         newCommands.set(pattern, handler);
// //       }
// //     }
    
// //     this.commands = newCommands;
// //   }

// //   startListening() {
// //     if (!this.recognition) {
// //       console.warn('[VoiceService] Recognition not initialized');
// //       return;
// //     }
    
// //     if (this.isListening) {
// //       console.log('[VoiceService] Already listening, skipping start');
// //       return;
// //     }
    
// //     if (this.isStarting) {
// //       console.log('[VoiceService] Already starting, skipping');
// //       return;
// //     }
    
// //     try {
// //       this.isStarting = true;
// //       this.recognition.start();
// //       console.log('[VoiceService] Starting recognition...');
// //     } catch (error) {
// //       console.warn('[VoiceService] Failed to start listening:', error.message);
// //       this.isListening = false;
// //       this.isStarting = false;
      
// //       // Don't auto-restart on fatal errors
// //       if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
// //         this.shouldBeListening = false;
// //         console.warn('[VoiceService] Microphone permission denied');
// //       } else if (error.message.includes('already started')) {
// //         // If it says it's already started, wait and check again
// //         console.warn('[VoiceService] Recognition appears to be already started, will check state');
// //         setTimeout(() => {
// //           this.isStarting = false;
// //           if (this.shouldBeListening && !this.isListening) {
// //             this.startListening();
// //           }
// //         }, 1000);
// //       } else {
// //         // For other errors, try again after a delay
// //         this.safeRestart(1000);
// //       }
// //     }
// //   }

// //   stopListening() {
// //     this.shouldBeListening = false;
// //     this.isStarting = false;
// //     this.restartAttempts = 0;
    
// //     if (this.recognition && this.isListening) {
// //       this.isListening = false;
// //       try {
// //         this.recognition.stop();
// //         console.log('[VoiceService] Stopped listening...');
// //       } catch (error) {
// //         console.warn('[VoiceService] Error stopping recognition:', error.message);
// //       }
// //     }
// //   }

// //   speak(text, options = {}) {
// //     if ('speechSynthesis' in window) {
// //       // Cancel any ongoing speech
// //       window.speechSynthesis.cancel();
      
// //       const utterance = new SpeechSynthesisUtterance(text);
// //       utterance.rate = options.rate || 0.9;
// //       utterance.pitch = options.pitch || 1.0;
// //       utterance.volume = options.volume || 1.0;
      
// //       const voices = window.speechSynthesis.getVoices();
// //       if (voices.length > 0) {
// //         utterance.voice = voices[0];
// //       }
      
// //       utterance.onend = () => {
// //         console.log('[VoiceService] Finished speaking:', text.substring(0, 50) + '...');
// //       };
      
// //       utterance.onerror = (event) => {
// //         console.error('[VoiceService] Speech synthesis error:', event);
// //       };
      
// //       window.speechSynthesis.speak(utterance);
// //     }
// //   }

// //   setLanguage(lang) {
// //     if (this.recognition) {
// //       this.recognition.lang = lang;
// //     }
// //   }

// //   clearCommands() {
// //     this.commands.clear();
// //     console.log('[VoiceService] All commands cleared');
// //   }

// //   isAvailable() {
// //     return !!(window.SpeechRecognition || window.webkitSpeechRecognition);
// //   }

// //   getLastTranscript() {
// //     return this.lastTranscript;
// //   }
// // }

// // export const voiceService = new VoiceService();


// // src/services/voiceService.js - COMPLETE WORKING VERSION
// class VoiceService {
//   constructor() {
//     this.recognition = null;
//     this.isListening = false;
//     this.commands = new Map();
//     this.onResultCallback = null;
//     this.shouldBeListening = false;
//     this.lastTranscript = '';
//     this.currentFeature = 'dashboard';
//     this.isStarting = false;
//     this.dynamicHandlers = [];
//     this.restartAttempts = 0;
//     this.maxRestartAttempts = 3;
    
//     this.initSpeechRecognition();
//   }

//   initSpeechRecognition() {
//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
//     if (!SpeechRecognition) {
//       console.error('Speech recognition not supported in this browser');
//       return;
//     }

//     this.recognition = new SpeechRecognition();
//     this.recognition.continuous = true;
//     this.recognition.interimResults = true;
//     this.recognition.lang = 'en-US';
//     this.recognition.maxAlternatives = 1;

//     this.recognition.onstart = () => {
//       console.log('[VoiceService] Speech recognition started');
//       this.isListening = true;
//       this.isStarting = false;
//       this.restartAttempts = 0;
//     };

//     this.recognition.onresult = (event) => {
//       let finalTranscript = '';
//       let interimTranscript = '';
      
//       for (let i = event.resultIndex; i < event.results.length; i++) {
//         const transcript = event.results[i][0].transcript;
//         if (event.results[i].isFinal) {
//           finalTranscript += transcript;
//         } else {
//           interimTranscript += transcript;
//         }
//       }

//       if (finalTranscript.trim()) {
//         this.lastTranscript = finalTranscript.trim();
//         const transcript = this.lastTranscript.toLowerCase();
//         console.log(`[${this.currentFeature}] Speech detected: "${this.lastTranscript}"`);
        
//         // Try dynamic handlers first
//         if (this.handleDynamicCommand(transcript)) {
//           return;
//         }
        
//         // Then try normal command processing
//         this.processCommand(transcript);
//       }
//     };

//     this.recognition.onerror = (event) => {
//       console.error('[VoiceService] Speech recognition error:', event.error);
//       this.isListening = false;
//       this.isStarting = false;
      
//       switch(event.error) {
//         case 'network':
//           console.warn('[VoiceService] Network error, trying to restart...');
//           this.safeRestart(2000);
//           break;
          
//         case 'not-allowed':
//         case 'service-not-allowed':
//           console.warn('[VoiceService] Microphone permission denied');
//           this.shouldBeListening = false;
//           if (this.onResultCallback) {
//             this.onResultCallback('Microphone permission denied. Please allow microphone access.');
//           }
//           break;
          
//         case 'aborted':
//           console.warn('[VoiceService] Speech recognition aborted');
//           break;
          
//         case 'audio-capture':
//           console.warn('[VoiceService] No microphone found or microphone is busy');
//           break;
          
//         case 'no-speech':
//           console.warn('[VoiceService] No speech detected');
//           break;
          
//         default:
//           console.warn('[VoiceService] Unknown error, trying to restart...');
//           this.safeRestart(1000);
//           break;
//       }
//     };
    
//     this.recognition.onend = () => {
//       console.log('[VoiceService] Speech recognition ended');
//       this.isListening = false;
//       this.isStarting = false;
      
//       if (this.shouldBeListening && !this.isStarting) {
//         console.log('[VoiceService] Auto-restarting...');
//         this.safeRestart(100);
//       }
//     };
//   }

//   safeRestart(delay = 100) {
//     if (this.restartAttempts >= this.maxRestartAttempts) {
//       console.warn('[VoiceService] Max restart attempts reached, stopping');
//       this.shouldBeListening = false;
//       return;
//     }
    
//     this.restartAttempts++;
//     setTimeout(() => {
//       if (this.shouldBeListening && !this.isListening && !this.isStarting) {
//         console.log(`[VoiceService] Attempting restart (${this.restartAttempts}/${this.maxRestartAttempts})`);
//         this.startListening();
//       }
//     }, delay);
//   }

//   handleDynamicCommand(transcript) {
//     for (const handler of this.dynamicHandlers) {
//       const match = transcript.match(handler.pattern);
//       if (match) {
//         console.log(`[VoiceService] Dynamic match found: ${transcript}`);
//         handler.callback(match.slice(1), transcript);
//         return true;
//       }
//     }
//     return false;
//   }

//   registerDynamicHandler(pattern, callback) {
//     const regex = typeof pattern === 'string' ? new RegExp(pattern, 'i') : pattern;
//     this.dynamicHandlers.push({
//       pattern: regex,
//       callback
//     });
//     console.log(`[VoiceService] Registered dynamic handler: ${regex}`);
//   }

//   clearDynamicHandlers() {
//     this.dynamicHandlers = [];
//     console.log('[VoiceService] Cleared dynamic handlers');
//   }

//   registerCommand(pattern, handler) {
//     this.commands.set(pattern.toLowerCase(), handler);
//     console.log(`[VoiceService] Registered command: "${pattern}"`);
//   }

//   processCommand(transcript) {
//     console.log(`[VoiceService/${this.currentFeature}] Processing: "${transcript}"`);
    
//     const cleanTranscript = transcript.toLowerCase().trim();
    
//     // 1. Exact match
//     if (this.commands.has(cleanTranscript)) {
//       console.log(`[VoiceService] Exact match found: "${cleanTranscript}"`);
//       this.commands.get(cleanTranscript)();
//       return;
//     }
    
//     // 2. Check for partial matches
//     for (const [pattern, handler] of this.commands.entries()) {
//       // Check if transcript contains the complete pattern
//       if (cleanTranscript.includes(pattern) && pattern.length > 3) {
//         console.log(`[VoiceService] Partial match: "${cleanTranscript}" contains "${pattern}"`);
//         handler();
//         return;
//       }
      
//       // For single word patterns, check if it's a word in the transcript
//       if (!pattern.includes(' ') && cleanTranscript === pattern) {
//         console.log(`[VoiceService] Single word exact match: "${cleanTranscript}"`);
//         handler();
//         return;
//       }
//     }
    
//     console.log(`[VoiceService] No command matched for: "${cleanTranscript}"`);
    
//     // Only call onResultCallback if no command was matched
//     if (this.onResultCallback) {
//       this.onResultCallback(transcript);
//     }
//   }

//   setFeature(featureName, callback = null) {
//     console.log(`[VoiceService] Switching to feature: ${featureName}`);
//     this.currentFeature = featureName;
    
//     if (callback) {
//       this.onResultCallback = callback;
//     }
//   }

//   clearFeatureCommands() {
//     console.log(`[VoiceService] Clearing commands for: ${this.currentFeature}`);
//     const navigationCommands = ['dashboard', 'home', 'go to dashboard', 'logout', 'help'];
//     const newCommands = new Map();
    
//     for (const [pattern, handler] of this.commands.entries()) {
//       if (navigationCommands.some(navCmd => pattern.includes(navCmd))) {
//         newCommands.set(pattern, handler);
//       }
//     }
    
//     this.commands = newCommands;
//   }

//   startListening() {
//     if (!this.recognition) {
//       console.warn('[VoiceService] Recognition not initialized');
//       return;
//     }
    
//     if (this.isListening) {
//       console.log('[VoiceService] Already listening, skipping start');
//       return;
//     }
    
//     if (this.isStarting) {
//       console.log('[VoiceService] Already starting, skipping');
//       return;
//     }
    
//     try {
//       this.isStarting = true;
//       this.shouldBeListening = true;
//       this.recognition.start();
//       console.log('[VoiceService] Starting recognition...');
//     } catch (error) {
//       console.warn('[VoiceService] Failed to start listening:', error.message);
//       this.isListening = false;
//       this.isStarting = false;
      
//       if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
//         this.shouldBeListening = false;
//         console.warn('[VoiceService] Microphone permission denied');
//       } else if (error.message.includes('already started')) {
//         setTimeout(() => {
//           this.isStarting = false;
//           if (this.shouldBeListening && !this.isListening) {
//             this.startListening();
//           }
//         }, 1000);
//       } else {
//         this.safeRestart(1000);
//       }
//     }
//   }

//   stopListening() {
//     this.shouldBeListening = false;
//     this.isStarting = false;
//     this.restartAttempts = 0;
    
//     if (this.recognition && this.isListening) {
//       this.isListening = false;
//       try {
//         this.recognition.stop();
//         console.log('[VoiceService] Stopped listening...');
//       } catch (error) {
//         console.warn('[VoiceService] Error stopping recognition:', error.message);
//       }
//     }
//   }

//   speak(text, options = {}) {
//     if ('speechSynthesis' in window) {
//       window.speechSynthesis.cancel();
      
//       const utterance = new SpeechSynthesisUtterance(text);
//       utterance.rate = options.rate || 0.9;
//       utterance.pitch = options.pitch || 1.0;
//       utterance.volume = options.volume || 1.0;
      
//       const voices = window.speechSynthesis.getVoices();
//       if (voices.length > 0) {
//         utterance.voice = voices.find(v => v.lang.startsWith('en')) || voices[0];
//       }
      
//       utterance.onend = () => {
//         console.log('[VoiceService] Finished speaking:', text.substring(0, 50) + '...');
//       };
      
//       utterance.onerror = (event) => {
//         console.error('[VoiceService] Speech synthesis error:', event);
//       };
      
//       window.speechSynthesis.speak(utterance);
//     }
//   }

//   setLanguage(lang) {
//     if (this.recognition) {
//       this.recognition.lang = lang;
//     }
//   }

//   clearCommands() {
//     this.commands.clear();
//     console.log('[VoiceService] All commands cleared');
//   }

//   isAvailable() {
//     return !!(window.SpeechRecognition || window.webkitSpeechRecognition);
//   }

//   getLastTranscript() {
//     return this.lastTranscript;
//   }
// }

// export const voiceService = new VoiceService();




// src/services/voiceService.js - FIXED VERSION
class VoiceService {
  constructor() {
    this.recognition = null;
    this.isListening = false;
    this.commands = new Map();
    this.onResultCallback = null;
    this.shouldBeListening = false;
    this.lastTranscript = '';
    this.currentFeature = 'dashboard';
    this.isStarting = false;
    this.dynamicHandlers = [];
    this.restartAttempts = 0;
    this.maxRestartAttempts = 3;
    
    this.initSpeechRecognition();
  }

  initSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      console.error('Speech recognition not supported in this browser');
      return;
    }

    this.recognition = new SpeechRecognition();
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.lang = 'en-US';

    this.recognition.onstart = () => {
      console.log('[VoiceService] Speech recognition started');
      this.isListening = true;
      this.isStarting = false;
      this.restartAttempts = 0; // Reset restart attempts on successful start
    };

    this.recognition.onresult = (event) => {
      let finalTranscript = '';
      
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }

      if (finalTranscript.trim()) {
        this.lastTranscript = finalTranscript.trim();
        const transcript = this.lastTranscript.toLowerCase();
        console.log(`[${this.currentFeature}] Speech detected:`, this.lastTranscript);
        
        // First try dynamic handlers (for regex patterns like "change location to London")
        if (this.handleDynamicCommand(transcript)) {
          return;
        }
        
        // Then try normal command processing
        this.processCommand(transcript);
        
        // Finally call the general callback if set
        if (this.onResultCallback) {
          this.onResultCallback(this.lastTranscript);
        }
      }
    };

    this.recognition.onerror = (event) => {
      console.error('[VoiceService] Speech recognition error:', event.error);
      this.isListening = false;
      this.isStarting = false;
      
      // Handle specific errors
      switch(event.error) {
        case 'network':
          console.warn('[VoiceService] Network error, trying to restart...');
          this.safeRestart(2000);
          break;
          
        case 'not-allowed':
        case 'service-not-allowed':
          console.warn('[VoiceService] Microphone permission denied');
          this.shouldBeListening = false;
          break;
          
        case 'aborted':
          console.warn('[VoiceService] Speech recognition aborted');
          break;
          
        case 'audio-capture':
          console.warn('[VoiceService] No microphone found or microphone is busy');
          break;
          
        case 'no-speech':
          console.warn('[VoiceService] No speech detected');
          // Don't restart immediately for no-speech errors
          break;
          
        default:
          console.warn('[VoiceService] Unknown error, trying to restart...');
          this.safeRestart(1000);
          break;
      }
    };
    
    this.recognition.onend = () => {
      console.log('[VoiceService] Speech recognition ended');
      this.isListening = false;
      this.isStarting = false;
      
      // Only restart if we should be listening
      if (this.shouldBeListening && !this.isStarting) {
        console.log('[VoiceService] Auto-restarting...');
        this.safeRestart(1000);
      }
    };
  }

  // Safe restart with delay and attempt limiting
  safeRestart(delay = 100) {
    if (this.restartAttempts >= this.maxRestartAttempts) {
      console.warn('[VoiceService] Max restart attempts reached, stopping');
      this.shouldBeListening = false;
      return;
    }
    
    this.restartAttempts++;
    setTimeout(() => {
      if (this.shouldBeListening && !this.isListening && !this.isStarting) {
        console.log(`[VoiceService] Attempting restart (${this.restartAttempts}/${this.maxRestartAttempts})`);
        this.startListening();
      }
    }, delay);
  }

  handleDynamicCommand(transcript) {
    for (const handler of this.dynamicHandlers) {
      if (handler.pattern.test(transcript)) {
        console.log(`[VoiceService] Dynamic match found for pattern: ${handler.pattern}`);
        const match = transcript.match(handler.pattern);
        handler.callback(match ? match.slice(1) : [], transcript);
        return true;
      }
    }
    return false;
  }

  registerDynamicHandler(pattern, callback) {
    const regex = typeof pattern === 'string' ? new RegExp(pattern, 'i') : pattern;
    this.dynamicHandlers.push({
      pattern: regex,
      callback
    });
    console.log(`[VoiceService] Registered dynamic handler: ${regex}`);
  }

  clearDynamicHandlers() {
    this.dynamicHandlers = [];
    console.log('[VoiceService] Cleared dynamic handlers');
  }

  registerCommand(pattern, handler) {
    this.commands.set(pattern.toLowerCase(), handler);
    console.log(`[VoiceService] Registered command: "${pattern}"`);
  }

  // processCommand(transcript) {
  //   console.log(`[VoiceService/${this.currentFeature}] Processing: "${transcript}"`);
    
  //   if (this.commands.has(transcript)) {
  //     console.log(`[VoiceService] Exact match found: "${transcript}"`);
  //     this.commands.get(transcript)();
  //     return;
  //   }
    
  //   for (const [pattern, handler] of this.commands.entries()) {
  //     if (transcript.includes(pattern)) {
  //       console.log(`[VoiceService] Partial match found: "${transcript}" includes "${pattern}"`);
  //       handler();
  //       return;
  //     }
  //   }
    
  //   console.log(`[VoiceService] No command matched for: "${transcript}"`);
  // }

  // In voiceService.js - Update the processCommand method
// processCommand(transcript) {
//   console.log(`[VoiceService/${this.currentFeature}] Processing: "${transcript}"`);
  
//   // 1. First check for exact match
//   if (this.commands.has(transcript)) {
//     console.log(`[VoiceService] Exact match found: "${transcript}"`);
//     this.commands.get(transcript)();
//     return;
//   }
  
//   // 2. Check for partial matches ONLY for single-word commands
//   // Don't use partial matching for multi-word transcripts
//   const words = transcript.split(' ');
  
//   // If it's a single word, check for partial matches
//   if (words.length === 1) {
//     for (const [pattern, handler] of this.commands.entries()) {
//       // Only match single-word patterns with single-word input
//       const patternWords = pattern.split(' ');
//       if (patternWords.length === 1 && transcript.includes(pattern)) {
//         console.log(`[VoiceService] Single-word partial match: "${transcript}" includes "${pattern}"`);
//         handler();
//         return;
//       }
//     }
//   }
  
//   // 3. For multi-word phrases, only match exact phrases
//   for (const [pattern, handler] of this.commands.entries()) {
//     const patternWords = pattern.split(' ');
//     // For multi-word patterns, check if transcript starts with pattern
//     if (patternWords.length > 1 && transcript.startsWith(pattern)) {
//       console.log(`[VoiceService] Multi-word start match: "${transcript}" starts with "${pattern}"`);
//       handler();
//       return;
//     }
//   }
  
//   console.log(`[VoiceService] No command matched for: "${transcript}"`);
// }

  // In voiceService.js - Update the processCommand method
processCommand(transcript) {
  console.log(`[VoiceService/${this.currentFeature}] Processing: "${transcript}"`);
  
  let commandProcessed = false;
  
  // 1. First check for exact match
  if (this.commands.has(transcript)) {
    console.log(`[VoiceService] Exact match found: "${transcript}"`);
    try {
      this.commands.get(transcript)();
      commandProcessed = true;
    } catch (error) {
      console.error(`[VoiceService] Error executing command "${transcript}":`, error);
    }
  }
  
  // 2. If no exact match, try dynamic handlers
  if (!commandProcessed) {
    commandProcessed = this.handleDynamicCommand(transcript);
  }
  
  // 3. If still no match and no dynamic handler matched, try partial matching
  if (!commandProcessed) {
    // Check for partial matches ONLY for single-word commands
    const words = transcript.split(' ');
    
    // If it's a single word, check for partial matches
    if (words.length === 1) {
      for (const [pattern, handler] of this.commands.entries()) {
        // Only match single-word patterns with single-word input
        const patternWords = pattern.split(' ');
        if (patternWords.length === 1 && transcript.includes(pattern)) {
          console.log(`[VoiceService] Single-word partial match: "${transcript}" includes "${pattern}"`);
          try {
            handler();
            commandProcessed = true;
            break;
          } catch (error) {
            console.error(`[VoiceService] Error executing partial match "${transcript}":`, error);
          }
        }
      }
    }
    
    // 4. For multi-word phrases, only match exact phrases
    if (!commandProcessed) {
      for (const [pattern, handler] of this.commands.entries()) {
        const patternWords = pattern.split(' ');
        // For multi-word patterns, check if transcript starts with pattern
        if (patternWords.length > 1 && transcript.startsWith(pattern)) {
          console.log(`[VoiceService] Multi-word start match: "${transcript}" starts with "${pattern}"`);
          try {
            handler();
            commandProcessed = true;
            break;
          } catch (error) {
            console.error(`[VoiceService] Error executing start match "${transcript}":`, error);
          }
        }
      }
    }
  }
  
  // 5. If no command was processed, call the general callback
  if (!commandProcessed) {
    console.log(`[VoiceService] No command matched for: "${transcript}"`);
    if (this.onResultCallback) {
      console.log(`[VoiceService] Calling general callback for: "${transcript}"`);
      this.onResultCallback(this.lastTranscript);
    }
  } else {
    console.log(`[VoiceService] Command successfully processed: "${transcript}"`);
  }
}

  setFeature(featureName, callback = null) {
    console.log(`[VoiceService] Switching to feature: ${featureName}`);
    this.currentFeature = featureName;
    
    if (callback) {
      this.onResultCallback = callback;
    }
  }

  clearFeatureCommands() {
    console.log(`[VoiceService] Clearing commands for: ${this.currentFeature}`);
    const navigationCommands = ['dashboard', 'home', 'go to dashboard', 'logout', 'help'];
    const newCommands = new Map();
    
    for (const [pattern, handler] of this.commands.entries()) {
      if (navigationCommands.some(navCmd => pattern.includes(navCmd))) {
        newCommands.set(pattern, handler);
      }
    }
    
    this.commands = newCommands;
  }

  startListening() {
    if (!this.recognition) {
      console.warn('[VoiceService] Recognition not initialized');
      return;
    }
    
    if (this.isListening) {
      console.log('[VoiceService] Already listening, skipping start');
      return;
    }
    
    if (this.isStarting) {
      console.log('[VoiceService] Already starting, skipping');
      return;
    }
    
    try {
      this.isStarting = true;
      this.recognition.start();
      console.log('[VoiceService] Starting recognition...');
    } catch (error) {
      console.warn('[VoiceService] Failed to start listening:', error.message);
      this.isListening = false;
      this.isStarting = false;
      
      // Don't auto-restart on fatal errors
      if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
        this.shouldBeListening = false;
        console.warn('[VoiceService] Microphone permission denied');
      } else if (error.message.includes('already started')) {
        // If it says it's already started, wait and check again
        console.warn('[VoiceService] Recognition appears to be already started, will check state');
        setTimeout(() => {
          this.isStarting = false;
          if (this.shouldBeListening && !this.isListening) {
            this.startListening();
          }
        }, 1000);
      } else {
        // For other errors, try again after a delay
        this.safeRestart(1000);
      }
    }
  }

  stopListening() {
    this.shouldBeListening = false;
    this.isStarting = false;
    this.restartAttempts = 0;
    
    if (this.recognition && this.isListening) {
      this.isListening = false;
      try {
        this.recognition.stop();
        console.log('[VoiceService] Stopped listening...');
      } catch (error) {
        console.warn('[VoiceService] Error stopping recognition:', error.message);
      }
    }
  }

  speak(text, options = {}) {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = options.rate || 0.9;
      utterance.pitch = options.pitch || 1.0;
      utterance.volume = options.volume || 1.0;
      
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        utterance.voice = voices[0];
      }
      
      utterance.onend = () => {
        console.log('[VoiceService] Finished speaking:', text.substring(0, 50) + '...');
      };
      
      utterance.onerror = (event) => {
        console.error('[VoiceService] Speech synthesis error:', event);
      };
      
      window.speechSynthesis.speak(utterance);
    }
  }

  setLanguage(lang) {
    if (this.recognition) {
      this.recognition.lang = lang;
    }
  }

  clearCommands() {
    this.commands.clear();
    console.log('[VoiceService] All commands cleared');
  }

  isAvailable() {
    return !!(window.SpeechRecognition || window.webkitSpeechRecognition);
  }

  getLastTranscript() {
    return this.lastTranscript;
  }
}

export const voiceService = new VoiceService();