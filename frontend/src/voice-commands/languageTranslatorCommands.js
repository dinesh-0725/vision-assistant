// // // // // // // // // src/voice-commands/languageTranslatorCommands.js
// // // // // // // // import { voiceService } from '../services/voiceService';

// // // // // // // // export const initializeLanguageTranslatorCommands = (componentRef) => {
// // // // // // // //   // Clear previous commands for this component
// // // // // // // //   voiceService.clearDynamicHandlers();
  
// // // // // // // //   // Store component methods for voice control
// // // // // // // //   const commands = {
// // // // // // // //     // Navigation commands
// // // // // // // //     'go to dashboard': () => {
// // // // // // // //       voiceService.speak('Going back to dashboard');
// // // // // // // //       componentRef.current?.handleBackToDashboard();
// // // // // // // //     },
    
// // // // // // // //     'logout': () => {
// // // // // // // //       voiceService.speak('Logging out');
// // // // // // // //       componentRef.current?.handleLogout();
// // // // // // // //     },
    
// // // // // // // //     'help': () => {
// // // // // // // //       voiceService.speak('Available commands: start listening, stop listening, speak translation, clear all, swap languages, and more');
// // // // // // // //     },
    
// // // // // // // //     // Speech recognition control
// // // // // // // //     'start listening': () => {
// // // // // // // //       if (componentRef.current?.recognitionRef?.current && !componentRef.current?.isListening) {
// // // // // // // //         voiceService.speak('Starting speech recognition');
// // // // // // // //         componentRef.current.setIsListening(true);
// // // // // // // //         componentRef.current.setError('');
// // // // // // // //         componentRef.current.setTranscript('');
// // // // // // // //         componentRef.current.setTranslatedText('');
// // // // // // // //         componentRef.current.recognitionRef.current.lang = componentRef.current.languages[componentRef.current?.sourceLang]?.voice || 'en-US';
// // // // // // // //         componentRef.current.recognitionRef.current.start();
// // // // // // // //       }
// // // // // // // //     },
    
// // // // // // // //     'stop listening': () => {
// // // // // // // //       if (componentRef.current?.recognitionRef?.current && componentRef.current?.isListening) {
// // // // // // // //         voiceService.speak('Stopping speech recognition');
// // // // // // // //         componentRef.current.recognitionRef.current.stop();
// // // // // // // //         componentRef.current.setIsListening(false);
// // // // // // // //       }
// // // // // // // //     },
    
// // // // // // // //     'toggle listening': () => {
// // // // // // // //       if (componentRef.current?.recognitionRef?.current) {
// // // // // // // //         if (componentRef.current?.isListening) {
// // // // // // // //           voiceService.speak('Stopping listening');
// // // // // // // //           componentRef.current.recognitionRef.current.stop();
// // // // // // // //         } else {
// // // // // // // //           voiceService.speak('Starting listening');
// // // // // // // //           componentRef.current.setIsListening(true);
// // // // // // // //           componentRef.current.setError('');
// // // // // // // //           componentRef.current.setTranscript('');
// // // // // // // //           componentRef.current.setTranslatedText('');
// // // // // // // //           componentRef.current.recognitionRef.current.start();
// // // // // // // //         }
// // // // // // // //       }
// // // // // // // //     },
    
// // // // // // // //     // Translation actions
// // // // // // // //     'translate': () => {
// // // // // // // //       if (componentRef.current?.transcript || componentRef.current?.pasteText) {
// // // // // // // //         voiceService.speak('Translating text');
// // // // // // // //         const text = componentRef.current?.transcript || componentRef.current?.pasteText;
// // // // // // // //         componentRef.current?.handleTranslate(text);
// // // // // // // //       } else {
// // // // // // // //         voiceService.speak('Please speak or type text first');
// // // // // // // //       }
// // // // // // // //     },
    
// // // // // // // //     'speak translation': () => {
// // // // // // // //       if (componentRef.current?.translatedText) {
// // // // // // // //         voiceService.speak('Speaking translation');
// // // // // // // //         componentRef.current?.speakText(componentRef.current.translatedText);
// // // // // // // //       } else {
// // // // // // // //         voiceService.speak('No translation available');
// // // // // // // //       }
// // // // // // // //     },
    
// // // // // // // //     'stop speaking': () => {
// // // // // // // //       if (window.speechSynthesis) {
// // // // // // // //         window.speechSynthesis.cancel();
// // // // // // // //         voiceService.speak('Stopped speaking');
// // // // // // // //         componentRef.current?.setIsSpeaking(false);
// // // // // // // //       }
// // // // // // // //     },
    
// // // // // // // //     // Language selection
// // // // // // // //     'swap languages': () => {
// // // // // // // //       voiceService.speak('Swapping languages');
// // // // // // // //       componentRef.current?.swapLanguages();
// // // // // // // //     },
    
// // // // // // // //     // Text manipulation
// // // // // // // //     'clear all': () => {
// // // // // // // //       voiceService.speak('Clearing all text');
// // // // // // // //       componentRef.current?.clearAll();
// // // // // // // //     },
    
// // // // // // // //     'copy translation': () => {
// // // // // // // //       if (componentRef.current?.translatedText) {
// // // // // // // //         voiceService.speak('Copying translation to clipboard');
// // // // // // // //         navigator.clipboard.writeText(componentRef.current.translatedText)
// // // // // // // //           .then(() => {
// // // // // // // //             componentRef.current?.setStatusMessage('Copied!');
// // // // // // // //             setTimeout(() => componentRef.current?.setStatusMessage('Ready'), 2000);
// // // // // // // //           })
// // // // // // // //           .catch(() => componentRef.current?.setError('Failed to copy'));
// // // // // // // //       } else {
// // // // // // // //         voiceService.speak('No translation to copy');
// // // // // // // //       }
// // // // // // // //     },
    
// // // // // // // //     'copy source': () => {
// // // // // // // //       if (componentRef.current?.transcript || componentRef.current?.pasteText) {
// // // // // // // //         voiceService.speak('Copying source text to clipboard');
// // // // // // // //         const text = componentRef.current?.transcript || componentRef.current?.pasteText;
// // // // // // // //         navigator.clipboard.writeText(text)
// // // // // // // //           .then(() => {
// // // // // // // //             componentRef.current?.setStatusMessage('Copied!');
// // // // // // // //             setTimeout(() => componentRef.current?.setStatusMessage('Ready'), 2000);
// // // // // // // //           })
// // // // // // // //           .catch(() => componentRef.current?.setError('Failed to copy'));
// // // // // // // //       } else {
// // // // // // // //         voiceService.speak('No source text to copy');
// // // // // // // //       }
// // // // // // // //     },
    
// // // // // // // //     // Mode switching
// // // // // // // //     'switch to voice mode': () => {
// // // // // // // //       voiceService.speak('Switching to voice input mode');
// // // // // // // //       componentRef.current?.setIsPasteMode(false);
// // // // // // // //     },
    
// // // // // // // //     'switch to text mode': () => {
// // // // // // // //       voiceService.speak('Switching to text input mode');
// // // // // // // //       componentRef.current?.setIsPasteMode(true);
// // // // // // // //     },
    
// // // // // // // //     // Auto-detect
// // // // // // // //     'detect language': () => {
// // // // // // // //       if (componentRef.current?.pasteText?.trim()) {
// // // // // // // //         voiceService.speak('Detecting language');
// // // // // // // //         componentRef.current?.handleAutoDetect();
// // // // // // // //       } else {
// // // // // // // //         voiceService.speak('Please enter text first');
// // // // // // // //       }
// // // // // // // //     },
    
// // // // // // // //     // Popular language pairs
// // // // // // // //     'english to telugu': () => {
// // // // // // // //       voiceService.speak('Setting English to Telugu');
// // // // // // // //       componentRef.current?.setSourceLang('en');
// // // // // // // //       componentRef.current?.setTargetLang('te');
// // // // // // // //       componentRef.current?.setStatusMessage('Set to English → Telugu');
// // // // // // // //     },
    
// // // // // // // //     'telugu to english': () => {
// // // // // // // //       voiceService.speak('Setting Telugu to English');
// // // // // // // //       componentRef.current?.setSourceLang('te');
// // // // // // // //       componentRef.current?.setTargetLang('en');
// // // // // // // //       componentRef.current?.setStatusMessage('Set to Telugu → English');
// // // // // // // //     },
    
// // // // // // // //     'english to hindi': () => {
// // // // // // // //       voiceService.speak('Setting English to Hindi');
// // // // // // // //       componentRef.current?.setSourceLang('en');
// // // // // // // //       componentRef.current?.setTargetLang('hi');
// // // // // // // //       componentRef.current?.setStatusMessage('Set to English → Hindi');
// // // // // // // //     },
    
// // // // // // // //     'hindi to english': () => {
// // // // // // // //       voiceService.speak('Setting Hindi to English');
// // // // // // // //       componentRef.current?.setSourceLang('hi');
// // // // // // // //       componentRef.current?.setTargetLang('en');
// // // // // // // //       componentRef.current?.setStatusMessage('Set to Hindi → English');
// // // // // // // //     },
    
// // // // // // // //     // Quick language selection
// // // // // // // //     'select english': () => {
// // // // // // // //       voiceService.speak('Setting English as source language');
// // // // // // // //       componentRef.current?.setQuickLanguage('en');
// // // // // // // //     },
    
// // // // // // // //     'select telugu': () => {
// // // // // // // //       voiceService.speak('Setting Telugu as source language');
// // // // // // // //       componentRef.current?.setQuickLanguage('te');
// // // // // // // //     },
    
// // // // // // // //     'select hindi': () => {
// // // // // // // //       voiceService.speak('Setting Hindi as source language');
// // // // // // // //       componentRef.current?.setQuickLanguage('hi');
// // // // // // // //     },
    
// // // // // // // //     'select spanish': () => {
// // // // // // // //       voiceService.speak('Setting Spanish as source language');
// // // // // // // //       componentRef.current?.setQuickLanguage('es');
// // // // // // // //     },
    
// // // // // // // //     'select french': () => {
// // // // // // // //       voiceService.speak('Setting French as source language');
// // // // // // // //       componentRef.current?.setQuickLanguage('fr');
// // // // // // // //     },
    
// // // // // // // //     // Status check
// // // // // // // //     'what can i say': () => {
// // // // // // // //       voiceService.speak('Available commands: start listening, stop listening, translate, speak translation, swap languages, clear all, copy translation, and more. Say "help" for detailed commands.');
// // // // // // // //     },
    
// // // // // // // //     'show commands': () => {
// // // // // // // //       const availableCommands = [
// // // // // // // //         'Navigation: go to dashboard, logout',
// // // // // // // //         'Speech: start listening, stop listening, toggle listening',
// // // // // // // //         'Translation: translate, speak translation, stop speaking',
// // // // // // // //         'Languages: swap languages, english to telugu, telugu to english',
// // // // // // // //         'Text: clear all, copy translation, copy source',
// // // // // // // //         'Modes: switch to voice mode, switch to text mode',
// // // // // // // //         'Language selection: select english, select telugu, select hindi',
// // // // // // // //         'Help: help, what can i say, show commands'
// // // // // // // //       ];
      
// // // // // // // //       componentRef.current?.setStatusMessage('Available commands: ' + availableCommands.join('. '));
// // // // // // // //       voiceService.speak('Showing available commands');
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   // Register all commands
// // // // // // // //   Object.entries(commands).forEach(([pattern, handler]) => {
// // // // // // // //     voiceService.registerCommand(pattern, handler);
// // // // // // // //   });

// // // // // // // //   // Dynamic language selection using regex patterns
// // // // // // // //   voiceService.registerDynamicHandler(
// // // // // // // //     /(?:select|change to|switch to) (english|telugu|hindi|spanish|french|german|italian|japanese|korean|chinese|arabic)/i,
// // // // // // // //     (matches) => {
// // // // // // // //       const lang = matches[0].toLowerCase();
// // // // // // // //       const langMap = {
// // // // // // // //         english: 'en',
// // // // // // // //         telugu: 'te',
// // // // // // // //         hindi: 'hi',
// // // // // // // //         spanish: 'es',
// // // // // // // //         french: 'fr',
// // // // // // // //         german: 'de',
// // // // // // // //         italian: 'it',
// // // // // // // //         japanese: 'ja',
// // // // // // // //         korean: 'ko',
// // // // // // // //         chinese: 'zh',
// // // // // // // //         arabic: 'ar'
// // // // // // // //       };
      
// // // // // // // //       if (langMap[lang]) {
// // // // // // // //         voiceService.speak(`Selecting ${lang}`);
// // // // // // // //         componentRef.current?.setSourceLang(langMap[lang]);
// // // // // // // //         componentRef.current?.setStatusMessage(`Source set to ${lang.charAt(0).toUpperCase() + lang.slice(1)}`);
// // // // // // // //       }
// // // // // // // //     }
// // // // // // // //   );

// // // // // // // //   // Dynamic translation pairs
// // // // // // // //   voiceService.registerDynamicHandler(
// // // // // // // //     /(?:translate from|set) (english|telugu|hindi|spanish|french) to (english|telugu|hindi|spanish|french)/i,
// // // // // // // //     (matches) => {
// // // // // // // //       const fromLang = matches[0].toLowerCase();
// // // // // // // //       const toLang = matches[1].toLowerCase();
// // // // // // // //       const langMap = {
// // // // // // // //         english: 'en',
// // // // // // // //         telugu: 'te',
// // // // // // // //         hindi: 'hi',
// // // // // // // //         spanish: 'es',
// // // // // // // //         french: 'fr'
// // // // // // // //       };
      
// // // // // // // //       if (langMap[fromLang] && langMap[toLang]) {
// // // // // // // //         voiceService.speak(`Setting ${fromLang} to ${toLang}`);
// // // // // // // //         componentRef.current?.setSourceLang(langMap[fromLang]);
// // // // // // // //         componentRef.current?.setTargetLang(langMap[toLang]);
// // // // // // // //         componentRef.current?.setStatusMessage(`Set to ${fromLang} → ${toLang}`);
// // // // // // // //       }
// // // // // // // //     }
// // // // // // // //   );

// // // // // // // //   // Set the current feature
// // // // // // // //   voiceService.setFeature('language-translator');

// // // // // // // //   return () => {
// // // // // // // //     // Cleanup function
// // // // // // // //     voiceService.clearCommands();
// // // // // // // //     voiceService.clearDynamicHandlers();
// // // // // // // //   };
// // // // // // // // };

// // // // // // // // // Export helper functions for external use
// // // // // // // // export const getAvailableCommands = () => {
// // // // // // // //   return [
// // // // // // // //     // Navigation
// // // // // // // //     'go to dashboard',
// // // // // // // //     'logout',
// // // // // // // //     'help',
    
// // // // // // // //     // Speech Recognition
// // // // // // // //     'start listening',
// // // // // // // //     'stop listening',
// // // // // // // //     'toggle listening',
    
// // // // // // // //     // Translation Actions
// // // // // // // //     'translate',
// // // // // // // //     'speak translation',
// // // // // // // //     'stop speaking',
    
// // // // // // // //     // Language Selection
// // // // // // // //     'swap languages',
// // // // // // // //     'english to telugu',
// // // // // // // //     'telugu to english',
// // // // // // // //     'english to hindi',
// // // // // // // //     'hindi to english',
    
// // // // // // // //     // Text Manipulation
// // // // // // // //     'clear all',
// // // // // // // //     'copy translation',
// // // // // // // //     'copy source',
    
// // // // // // // //     // Mode Switching
// // // // // // // //     'switch to voice mode',
// // // // // // // //     'switch to text mode',
    
// // // // // // // //     // Language Detection
// // // // // // // //     'detect language',
    
// // // // // // // //     // Quick Language Selection
// // // // // // // //     'select english',
// // // // // // // //     'select telugu',
// // // // // // // //     'select hindi',
// // // // // // // //     'select spanish',
// // // // // // // //     'select french',
    
// // // // // // // //     // Help
// // // // // // // //     'what can i say',
// // // // // // // //     'show commands'
// // // // // // // //   ];
// // // // // // // // };


// // // // // // // // src/voice-commands/languageTranslatorCommands.js
// // // // // // // import { voiceService } from '../services/voiceService';

// // // // // // // export const initializeLanguageTranslatorCommands = (componentRef) => {
// // // // // // //   // Clear previous commands for this component
// // // // // // //   voiceService.clearDynamicHandlers();
  
// // // // // // //   // Store component methods for voice control
// // // // // // //   const commands = {
// // // // // // //     // Navigation commands
// // // // // // //     'go to dashboard': () => {
// // // // // // //       voiceService.speak('Going back to dashboard');
// // // // // // //       componentRef.current?.handleBackToDashboard();
// // // // // // //     },
    
// // // // // // //     'logout': () => {
// // // // // // //       voiceService.speak('Logging out');
// // // // // // //       componentRef.current?.handleLogout();
// // // // // // //     },
    
// // // // // // //     'help': () => {
// // // // // // //       voiceService.speak('Available commands: translate, speak translation, clear all, swap languages, and more. Say "show commands" for full list.');
// // // // // // //     },
    
// // // // // // //     // Translation actions
// // // // // // //     'translate': () => {
// // // // // // //       if (componentRef.current?.transcript || componentRef.current?.pasteText) {
// // // // // // //         voiceService.speak('Translating text');
// // // // // // //         const text = componentRef.current?.transcript || componentRef.current?.pasteText;
// // // // // // //         componentRef.current?.handleTranslate(text);
// // // // // // //       } else {
// // // // // // //         voiceService.speak('Please speak or type text first. Say "speak now" to record audio.');
// // // // // // //       }
// // // // // // //     },
    
// // // // // // //     'speak now': () => {
// // // // // // //       voiceService.speak('Please speak your text now. I will detect when you stop talking.');
// // // // // // //       // We'll handle this through the general callback
// // // // // // //     },
    
// // // // // // //     'speak translation': () => {
// // // // // // //       if (componentRef.current?.translatedText) {
// // // // // // //         voiceService.speak('Speaking translation');
// // // // // // //         componentRef.current?.speakText(componentRef.current.translatedText);
// // // // // // //       } else {
// // // // // // //         voiceService.speak('No translation available. Please translate first.');
// // // // // // //       }
// // // // // // //     },
    
// // // // // // //     'stop speaking': () => {
// // // // // // //       if (window.speechSynthesis) {
// // // // // // //         window.speechSynthesis.cancel();
// // // // // // //         voiceService.speak('Stopped speaking');
// // // // // // //         componentRef.current?.setIsSpeaking(false);
// // // // // // //       }
// // // // // // //     },
    
// // // // // // //     // Language selection
// // // // // // //     'swap languages': () => {
// // // // // // //       voiceService.speak('Swapping languages');
// // // // // // //       componentRef.current?.swapLanguages();
// // // // // // //     },
    
// // // // // // //     // Text manipulation
// // // // // // //     'clear all': () => {
// // // // // // //       voiceService.speak('Clearing all text');
// // // // // // //       componentRef.current?.clearAll();
// // // // // // //     },
    
// // // // // // //     'copy translation': () => {
// // // // // // //       if (componentRef.current?.translatedText) {
// // // // // // //         voiceService.speak('Copying translation to clipboard');
// // // // // // //         navigator.clipboard.writeText(componentRef.current.translatedText)
// // // // // // //           .then(() => {
// // // // // // //             componentRef.current?.setStatusMessage('Copied!');
// // // // // // //             setTimeout(() => componentRef.current?.setStatusMessage('Ready'), 2000);
// // // // // // //           })
// // // // // // //           .catch(() => componentRef.current?.setError('Failed to copy'));
// // // // // // //       } else {
// // // // // // //         voiceService.speak('No translation to copy');
// // // // // // //       }
// // // // // // //     },
    
// // // // // // //     'copy source': () => {
// // // // // // //       if (componentRef.current?.transcript || componentRef.current?.pasteText) {
// // // // // // //         voiceService.speak('Copying source text to clipboard');
// // // // // // //         const text = componentRef.current?.transcript || componentRef.current?.pasteText;
// // // // // // //         navigator.clipboard.writeText(text)
// // // // // // //           .then(() => {
// // // // // // //             componentRef.current?.setStatusMessage('Copied!');
// // // // // // //             setTimeout(() => componentRef.current?.setStatusMessage('Ready'), 2000);
// // // // // // //           })
// // // // // // //           .catch(() => componentRef.current?.setError('Failed to copy'));
// // // // // // //       } else {
// // // // // // //         voiceService.speak('No source text to copy');
// // // // // // //       }
// // // // // // //     },
    
// // // // // // //     // Mode switching
// // // // // // //     'switch to voice mode': () => {
// // // // // // //       voiceService.speak('Switching to voice input mode');
// // // // // // //       componentRef.current?.setIsPasteMode(false);
// // // // // // //     },
    
// // // // // // //     'switch to text mode': () => {
// // // // // // //       voiceService.speak('Switching to text input mode');
// // // // // // //       componentRef.current?.setIsPasteMode(true);
// // // // // // //     },
    
// // // // // // //     // Auto-detect
// // // // // // //     'detect language': () => {
// // // // // // //       if (componentRef.current?.pasteText?.trim()) {
// // // // // // //         voiceService.speak('Detecting language');
// // // // // // //         componentRef.current?.handleAutoDetect();
// // // // // // //       } else {
// // // // // // //         voiceService.speak('Please enter text first');
// // // // // // //       }
// // // // // // //     },
    
// // // // // // //     // Popular language pairs
// // // // // // //     'english to telugu': () => {
// // // // // // //       voiceService.speak('Setting English to Telugu');
// // // // // // //       componentRef.current?.setSourceLang('en');
// // // // // // //       componentRef.current?.setTargetLang('te');
// // // // // // //       componentRef.current?.setStatusMessage('Set to English → Telugu');
// // // // // // //     },
    
// // // // // // //     'telugu to english': () => {
// // // // // // //       voiceService.speak('Setting Telugu to English');
// // // // // // //       componentRef.current?.setSourceLang('te');
// // // // // // //       componentRef.current?.setTargetLang('en');
// // // // // // //       componentRef.current?.setStatusMessage('Set to Telugu → English');
// // // // // // //     },
    
// // // // // // //     'english to hindi': () => {
// // // // // // //       voiceService.speak('Setting English to Hindi');
// // // // // // //       componentRef.current?.setSourceLang('en');
// // // // // // //       componentRef.current?.setTargetLang('hi');
// // // // // // //       componentRef.current?.setStatusMessage('Set to English → Hindi');
// // // // // // //     },
    
// // // // // // //     'hindi to english': () => {
// // // // // // //       voiceService.speak('Setting Hindi to English');
// // // // // // //       componentRef.current?.setSourceLang('hi');
// // // // // // //       componentRef.current?.setTargetLang('en');
// // // // // // //       componentRef.current?.setStatusMessage('Set to Hindi → English');
// // // // // // //     },
    
// // // // // // //     // Quick language selection
// // // // // // //     'select english': () => {
// // // // // // //       voiceService.speak('Setting English as source language');
// // // // // // //       componentRef.current?.setQuickLanguage('en');
// // // // // // //     },
    
// // // // // // //     'select telugu': () => {
// // // // // // //       voiceService.speak('Setting Telugu as source language');
// // // // // // //       componentRef.current?.setQuickLanguage('te');
// // // // // // //     },
    
// // // // // // //     'select hindi': () => {
// // // // // // //       voiceService.speak('Setting Hindi as source language');
// // // // // // //       componentRef.current?.setQuickLanguage('hi');
// // // // // // //     },
    
// // // // // // //     'select spanish': () => {
// // // // // // //       voiceService.speak('Setting Spanish as source language');
// // // // // // //       componentRef.current?.setQuickLanguage('es');
// // // // // // //     },
    
// // // // // // //     'select french': () => {
// // // // // // //       voiceService.speak('Setting French as source language');
// // // // // // //       componentRef.current?.setQuickLanguage('fr');
// // // // // // //     },
    
// // // // // // //     // Status check
// // // // // // //     'what can i say': () => {
// // // // // // //       const commandList = [
// // // // // // //         'Navigation: go to dashboard, logout, help',
// // // // // // //         'Translation: translate, speak now, speak translation, stop speaking',
// // // // // // //         'Languages: swap languages, english to telugu, telugu to english',
// // // // // // //         'Text: clear all, copy translation, copy source',
// // // // // // //         'Modes: switch to voice mode, switch to text mode',
// // // // // // //         'Language selection: select english, select telugu, select hindi',
// // // // // // //         'Say "show commands" for detailed list'
// // // // // // //       ];
// // // // // // //       voiceService.speak('Here are the main commands: ' + commandList.join('. '));
// // // // // // //     },
    
// // // // // // //     'show commands': () => {
// // // // // // //       const allCommands = [
// // // // // // //         'go to dashboard', 'logout', 'help',
// // // // // // //         'translate', 'speak now', 'speak translation', 'stop speaking',
// // // // // // //         'swap languages', 'english to telugu', 'telugu to english',
// // // // // // //         'english to hindi', 'hindi to english',
// // // // // // //         'clear all', 'copy translation', 'copy source',
// // // // // // //         'switch to voice mode', 'switch to text mode',
// // // // // // //         'detect language',
// // // // // // //         'select english', 'select telugu', 'select hindi', 'select spanish', 'select french',
// // // // // // //         'what can i say', 'show commands'
// // // // // // //       ];
      
// // // // // // //       componentRef.current?.setStatusMessage('Available commands: ' + allCommands.join(', '));
// // // // // // //       voiceService.speak('Showing all available commands in the status bar');
// // // // // // //     }
// // // // // // //   };

// // // // // // //   // Register all commands
// // // // // // //   Object.entries(commands).forEach(([pattern, handler]) => {
// // // // // // //     voiceService.registerCommand(pattern, handler);
// // // // // // //   });

// // // // // // //   // Dynamic language selection using regex patterns
// // // // // // //   voiceService.registerDynamicHandler(
// // // // // // //     /(?:select|change to|switch to) (english|telugu|hindi|spanish|french|german|italian|japanese|korean|chinese|arabic)/i,
// // // // // // //     (matches) => {
// // // // // // //       const lang = matches[0].toLowerCase();
// // // // // // //       const langMap = {
// // // // // // //         english: 'en',
// // // // // // //         telugu: 'te',
// // // // // // //         hindi: 'hi',
// // // // // // //         spanish: 'es',
// // // // // // //         french: 'fr',
// // // // // // //         german: 'de',
// // // // // // //         italian: 'it',
// // // // // // //         japanese: 'ja',
// // // // // // //         korean: 'ko',
// // // // // // //         chinese: 'zh',
// // // // // // //         arabic: 'ar'
// // // // // // //       };
      
// // // // // // //       if (langMap[lang]) {
// // // // // // //         voiceService.speak(`Selecting ${lang}`);
// // // // // // //         componentRef.current?.setSourceLang(langMap[lang]);
// // // // // // //         componentRef.current?.setStatusMessage(`Source set to ${lang.charAt(0).toUpperCase() + lang.slice(1)}`);
// // // // // // //       }
// // // // // // //     }
// // // // // // //   );

// // // // // // //   // Dynamic translation pairs
// // // // // // //   voiceService.registerDynamicHandler(
// // // // // // //     /(?:translate from|set) (english|telugu|hindi|spanish|french) to (english|telugu|hindi|spanish|french)/i,
// // // // // // //     (matches) => {
// // // // // // //       const fromLang = matches[0].toLowerCase();
// // // // // // //       const toLang = matches[1].toLowerCase();
// // // // // // //       const langMap = {
// // // // // // //         english: 'en',
// // // // // // //         telugu: 'te',
// // // // // // //         hindi: 'hi',
// // // // // // //         spanish: 'es',
// // // // // // //         french: 'fr'
// // // // // // //       };
      
// // // // // // //       if (langMap[fromLang] && langMap[toLang]) {
// // // // // // //         voiceService.speak(`Setting ${fromLang} to ${toLang}`);
// // // // // // //         componentRef.current?.setSourceLang(langMap[fromLang]);
// // // // // // //         componentRef.current?.setTargetLang(langMap[toLang]);
// // // // // // //         componentRef.current?.setStatusMessage(`Set to ${fromLang} → ${toLang}`);
// // // // // // //       }
// // // // // // //     }
// // // // // // //   );

// // // // // // //   return () => {
// // // // // // //     // Cleanup function
// // // // // // //     voiceService.clearCommands();
// // // // // // //     voiceService.clearDynamicHandlers();
// // // // // // //   };
// // // // // // // };

// // // // // // // // Export helper functions for external use
// // // // // // // export const getAvailableCommands = () => {
// // // // // // //   return [
// // // // // // //     'go to dashboard', 'logout', 'help',
// // // // // // //     'translate', 'speak now', 'speak translation', 'stop speaking',
// // // // // // //     'swap languages', 'english to telugu', 'telugu to english',
// // // // // // //     'english to hindi', 'hindi to english',
// // // // // // //     'clear all', 'copy translation', 'copy source',
// // // // // // //     'switch to voice mode', 'switch to text mode',
// // // // // // //     'detect language',
// // // // // // //     'select english', 'select telugu', 'select hindi', 'select spanish', 'select french',
// // // // // // //     'what can i say', 'show commands'
// // // // // // //   ];
// // // // // // // };



// // // // // // // src/voice-commands/languageTranslatorCommands.js
// // // // // // import { voiceService } from '../services/voiceService';

// // // // // // export const initializeLanguageTranslatorCommands = (componentRef) => {
// // // // // //   // Clear previous commands for this component
// // // // // //   voiceService.clearDynamicHandlers();
  
// // // // // //   // Store component methods for voice control
// // // // // //   const commands = {
// // // // // //     // Navigation commands
// // // // // //     'go to dashboard': () => {
// // // // // //       voiceService.speak('Going back to dashboard');
// // // // // //       componentRef.current?.handleBackToDashboard();
// // // // // //     },
    
// // // // // //     'logout': () => {
// // // // // //       voiceService.speak('Logging out');
// // // // // //       componentRef.current?.handleLogout();
// // // // // //     },
    
// // // // // //     'help': () => {
// // // // // //       voiceService.speak('Available commands: translate, speak now, speak translation, clear all, swap languages, and more. Say "show commands" for full list.');
// // // // // //     },
    
// // // // // //     // Translation actions
// // // // // //     'translate': () => {
// // // // // //       const text = componentRef.current?.transcript || componentRef.current?.pasteText || componentRef.current?.voiceRecordingText;
// // // // // //       if (text) {
// // // // // //         voiceService.speak('Translating text');
// // // // // //         componentRef.current?.handleTranslate(text);
// // // // // //       } else {
// // // // // //         voiceService.speak('No text to translate. Please say "speak now" to record text, or type some text.');
// // // // // //       }
// // // // // //     },
    
// // // // // //     'speak now': () => {
// // // // // //       voiceService.speak('Listening for your text. Please speak now...');
// // // // // //       componentRef.current?.setIsSpeechRecording(true);
// // // // // //       componentRef.current?.setStatusMessage('🎤 Listening for your text. Speak now...');
// // // // // //       componentRef.current?.setVoiceRecordingText('');
// // // // // //     },
    
// // // // // //     'stop recording': () => {
// // // // // //       voiceService.speak('Stopped recording');
// // // // // //       componentRef.current?.setIsSpeechRecording(false);
// // // // // //       componentRef.current?.setStatusMessage('Recording stopped');
// // // // // //     },
    
// // // // // //     'speak translation': () => {
// // // // // //       if (componentRef.current?.translatedText) {
// // // // // //         voiceService.speak('Speaking translation');
// // // // // //         componentRef.current?.speakText(componentRef.current.translatedText);
// // // // // //       } else {
// // // // // //         voiceService.speak('No translation available. Please translate first.');
// // // // // //       }
// // // // // //     },
    
// // // // // //     'stop speaking': () => {
// // // // // //       if (window.speechSynthesis) {
// // // // // //         window.speechSynthesis.cancel();
// // // // // //         voiceService.speak('Stopped speaking');
// // // // // //         componentRef.current?.setIsSpeaking(false);
// // // // // //       }
// // // // // //     },
    
// // // // // //     // Language selection
// // // // // //     'swap languages': () => {
// // // // // //       voiceService.speak('Swapping languages');
// // // // // //       componentRef.current?.swapLanguages();
// // // // // //     },
    
// // // // // //     // Text manipulation
// // // // // //     'clear all': () => {
// // // // // //       voiceService.speak('Clearing all text');
// // // // // //       componentRef.current?.clearAll();
// // // // // //     },
    
// // // // // //     'copy translation': () => {
// // // // // //       if (componentRef.current?.translatedText) {
// // // // // //         voiceService.speak('Copying translation to clipboard');
// // // // // //         navigator.clipboard.writeText(componentRef.current.translatedText)
// // // // // //           .then(() => {
// // // // // //             componentRef.current?.setStatusMessage('Copied!');
// // // // // //             setTimeout(() => componentRef.current?.setStatusMessage('Ready'), 2000);
// // // // // //           })
// // // // // //           .catch(() => componentRef.current?.setError('Failed to copy'));
// // // // // //       } else {
// // // // // //         voiceService.speak('No translation to copy');
// // // // // //       }
// // // // // //     },
    
// // // // // //     'copy source': () => {
// // // // // //       const text = componentRef.current?.transcript || componentRef.current?.pasteText || componentRef.current?.voiceRecordingText;
// // // // // //       if (text) {
// // // // // //         voiceService.speak('Copying source text to clipboard');
// // // // // //         navigator.clipboard.writeText(text)
// // // // // //           .then(() => {
// // // // // //             componentRef.current?.setStatusMessage('Copied!');
// // // // // //             setTimeout(() => componentRef.current?.setStatusMessage('Ready'), 2000);
// // // // // //           })
// // // // // //           .catch(() => componentRef.current?.setError('Failed to copy'));
// // // // // //       } else {
// // // // // //         voiceService.speak('No source text to copy');
// // // // // //       }
// // // // // //     },
    
// // // // // //     // Mode switching
// // // // // //     'switch to voice mode': () => {
// // // // // //       voiceService.speak('Switching to voice input mode');
// // // // // //       componentRef.current?.setIsPasteMode(false);
// // // // // //     },
    
// // // // // //     'switch to text mode': () => {
// // // // // //       voiceService.speak('Switching to text input mode');
// // // // // //       componentRef.current?.setIsPasteMode(true);
// // // // // //     },
    
// // // // // //     // Auto-detect
// // // // // //     'detect language': () => {
// // // // // //       const text = componentRef.current?.pasteText || componentRef.current?.voiceRecordingText;
// // // // // //       if (text?.trim()) {
// // // // // //         voiceService.speak('Detecting language');
// // // // // //         componentRef.current?.handleAutoDetect();
// // // // // //       } else {
// // // // // //         voiceService.speak('Please enter text first');
// // // // // //       }
// // // // // //     },
    
// // // // // //     // Popular language pairs
// // // // // //     'english to telugu': () => {
// // // // // //       voiceService.speak('Setting English to Telugu');
// // // // // //       componentRef.current?.setSourceLang('en');
// // // // // //       componentRef.current?.setTargetLang('te');
// // // // // //       componentRef.current?.setStatusMessage('Set to English → Telugu');
// // // // // //     },
    
// // // // // //     'telugu to english': () => {
// // // // // //       voiceService.speak('Setting Telugu to English');
// // // // // //       componentRef.current?.setSourceLang('te');
// // // // // //       componentRef.current?.setTargetLang('en');
// // // // // //       componentRef.current?.setStatusMessage('Set to Telugu → English');
// // // // // //     },
    
// // // // // //     'english to hindi': () => {
// // // // // //       voiceService.speak('Setting English to Hindi');
// // // // // //       componentRef.current?.setSourceLang('en');
// // // // // //       componentRef.current?.setTargetLang('hi');
// // // // // //       componentRef.current?.setStatusMessage('Set to English → Hindi');
// // // // // //     },
    
// // // // // //     'hindi to english': () => {
// // // // // //       voiceService.speak('Setting Hindi to English');
// // // // // //       componentRef.current?.setSourceLang('hi');
// // // // // //       componentRef.current?.setTargetLang('en');
// // // // // //       componentRef.current?.setStatusMessage('Set to Hindi → English');
// // // // // //     },
    
// // // // // //     // Quick language selection
// // // // // //     'select english': () => {
// // // // // //       voiceService.speak('Setting English as source language');
// // // // // //       componentRef.current?.setQuickLanguage('en');
// // // // // //     },
    
// // // // // //     'select telugu': () => {
// // // // // //       voiceService.speak('Setting Telugu as source language');
// // // // // //       componentRef.current?.setQuickLanguage('te');
// // // // // //     },
    
// // // // // //     'select hindi': () => {
// // // // // //       voiceService.speak('Setting Hindi as source language');
// // // // // //       componentRef.current?.setQuickLanguage('hi');
// // // // // //     },
    
// // // // // //     'select spanish': () => {
// // // // // //       voiceService.speak('Setting Spanish as source language');
// // // // // //       componentRef.current?.setQuickLanguage('es');
// // // // // //     },
    
// // // // // //     'select french': () => {
// // // // // //       voiceService.speak('Setting French as source language');
// // // // // //       componentRef.current?.setQuickLanguage('fr');
// // // // // //     },
    
// // // // // //     // Status check
// // // // // //     'what can i say': () => {
// // // // // //       const commandList = [
// // // // // //         'First say "speak now" to start recording',
// // // // // //         'Then speak your text naturally',
// // // // // //         'Then say "translate" to translate',
// // // // // //         'Say "speak translation" to hear the result',
// // // // // //         'Say "clear all" to clear everything',
// // // // // //         'Say "swap languages" to swap source and target languages'
// // // // // //       ];
// // // // // //       voiceService.speak('Here are the main commands: ' + commandList.join('. '));
// // // // // //     },
    
// // // // // //     'show commands': () => {
// // // // // //       const allCommands = [
// // // // // //         'go to dashboard', 'logout', 'help',
// // // // // //         'speak now', 'stop recording', 'translate', 'speak translation', 'stop speaking',
// // // // // //         'swap languages', 'english to telugu', 'telugu to english',
// // // // // //         'english to hindi', 'hindi to english',
// // // // // //         'clear all', 'copy translation', 'copy source',
// // // // // //         'switch to voice mode', 'switch to text mode',
// // // // // //         'detect language',
// // // // // //         'select english', 'select telugu', 'select hindi', 'select spanish', 'select french',
// // // // // //         'what can i say', 'show commands'
// // // // // //       ];
      
// // // // // //       componentRef.current?.setStatusMessage('Available commands: ' + allCommands.join(', '));
// // // // // //       voiceService.speak('Showing all available commands in the status bar');
// // // // // //     }
// // // // // //   };

// // // // // //   // Register all commands
// // // // // //   Object.entries(commands).forEach(([pattern, handler]) => {
// // // // // //     voiceService.registerCommand(pattern, handler);
// // // // // //   });

// // // // // //   // Dynamic language selection using regex patterns
// // // // // //   voiceService.registerDynamicHandler(
// // // // // //     /(?:select|change to|switch to) (english|telugu|hindi|spanish|french|german|italian|japanese|korean|chinese|arabic)/i,
// // // // // //     (matches) => {
// // // // // //       const lang = matches[0].toLowerCase();
// // // // // //       const langMap = {
// // // // // //         english: 'en',
// // // // // //         telugu: 'te',
// // // // // //         hindi: 'hi',
// // // // // //         spanish: 'es',
// // // // // //         french: 'fr',
// // // // // //         german: 'de',
// // // // // //         italian: 'it',
// // // // // //         japanese: 'ja',
// // // // // //         korean: 'ko',
// // // // // //         chinese: 'zh',
// // // // // //         arabic: 'ar'
// // // // // //       };
      
// // // // // //       if (langMap[lang]) {
// // // // // //         voiceService.speak(`Selecting ${lang}`);
// // // // // //         componentRef.current?.setSourceLang(langMap[lang]);
// // // // // //         componentRef.current?.setStatusMessage(`Source set to ${lang.charAt(0).toUpperCase() + lang.slice(1)}`);
// // // // // //       }
// // // // // //     }
// // // // // //   );

// // // // // //   // Dynamic translation pairs
// // // // // //   voiceService.registerDynamicHandler(
// // // // // //     /(?:translate from|set) (english|telugu|hindi|spanish|french) to (english|telugu|hindi|spanish|french)/i,
// // // // // //     (matches) => {
// // // // // //       const fromLang = matches[0].toLowerCase();
// // // // // //       const toLang = matches[1].toLowerCase();
// // // // // //       const langMap = {
// // // // // //         english: 'en',
// // // // // //         telugu: 'te',
// // // // // //         hindi: 'hi',
// // // // // //         spanish: 'es',
// // // // // //         french: 'fr'
// // // // // //       };
      
// // // // // //       if (langMap[fromLang] && langMap[toLang]) {
// // // // // //         voiceService.speak(`Setting ${fromLang} to ${toLang}`);
// // // // // //         componentRef.current?.setSourceLang(langMap[fromLang]);
// // // // // //         componentRef.current?.setTargetLang(langMap[toLang]);
// // // // // //         componentRef.current?.setStatusMessage(`Set to ${fromLang} → ${toLang}`);
// // // // // //       }
// // // // // //     }
// // // // // //   );

// // // // // //   return () => {
// // // // // //     // Cleanup function
// // // // // //     voiceService.clearCommands();
// // // // // //     voiceService.clearDynamicHandlers();
// // // // // //   };
// // // // // // };



// // // // // // src/voice-commands/languageTranslatorCommands.js
// // // // // import { voiceService } from '../services/voiceService';

// // // // // export const initializeLanguageTranslatorCommands = (componentRef) => {
// // // // //   // Clear previous commands for this component
// // // // //   voiceService.clearDynamicHandlers();
  
// // // // //   // Store component methods for voice control
// // // // //   const commands = {
// // // // //     // Navigation commands
// // // // //     'go to dashboard': () => {
// // // // //       voiceService.speak('Going back to dashboard');
// // // // //       componentRef.current?.handleBackToDashboard();
// // // // //     },
    
// // // // //     'logout': () => {
// // // // //       voiceService.speak('Logging out');
// // // // //       componentRef.current?.handleLogout();
// // // // //     },
    
// // // // //     'help': () => {
// // // // //       voiceService.speak('Available commands: start listening, stop, translate, clear, swap languages, and more. Say "what can I say" for full list.');
// // // // //     },
    
// // // // //     // Speech control commands
// // // // //     'start listening': () => {
// // // // //       voiceService.speak('Starting to listen for your text');
// // // // //       componentRef.current?.startVoiceRecording();
// // // // //     },
    
// // // // //     'speak now': () => {
// // // // //       voiceService.speak('Listening for your text');
// // // // //       componentRef.current?.startVoiceRecording();
// // // // //     },
    
// // // // //     'stop listening': () => {
// // // // //       voiceService.speak('Stopped listening');
// // // // //       componentRef.current?.stopVoiceRecording();
// // // // //     },
    
// // // // //     'stop': () => {
// // // // //       voiceService.speak('Stopped');
// // // // //       componentRef.current?.stopVoiceRecording();
// // // // //     },
    
// // // // //     'continuous mode': () => {
// // // // //       voiceService.speak('Toggling continuous mode');
// // // // //       componentRef.current?.toggleContinuousMode();
// // // // //     },
    
// // // // //     // Translation commands
// // // // //     'translate': () => {
// // // // //       const text = componentRef.current?.getCurrentText();
// // // // //       if (text && text.trim()) {
// // // // //         voiceService.speak(`Translating to ${componentRef.current?.languages[componentRef.current?.targetLang]?.name}`);
// // // // //         componentRef.current?.handleTranslate(text);
// // // // //       } else {
// // // // //         voiceService.speak('No text to translate. Please say "start listening" first.');
// // // // //       }
// // // // //     },
    
// // // // //     'translate now': () => {
// // // // //       const text = componentRef.current?.getCurrentText();
// // // // //       if (text && text.trim()) {
// // // // //         voiceService.speak('Translating now');
// // // // //         componentRef.current?.handleTranslate(text);
// // // // //       } else {
// // // // //         voiceService.speak('Please speak some text first by saying "start listening"');
// // // // //       }
// // // // //     },
    
// // // // //     'speak translation': () => {
// // // // //       if (componentRef.current?.translatedText) {
// // // // //         voiceService.speak('Speaking translation');
// // // // //         componentRef.current?.speakText(componentRef.current.translatedText);
// // // // //       } else {
// // // // //         voiceService.speak('No translation available. Please translate first.');
// // // // //       }
// // // // //     },
    
// // // // //     'stop speaking': () => {
// // // // //       if (window.speechSynthesis) {
// // // // //         window.speechSynthesis.cancel();
// // // // //         voiceService.speak('Stopped speaking');
// // // // //         componentRef.current?.setIsSpeaking(false);
// // // // //       }
// // // // //     },
    
// // // // //     // Language selection
// // // // //     'swap languages': () => {
// // // // //       voiceService.speak('Swapping languages');
// // // // //       componentRef.current?.swapLanguages();
// // // // //     },
    
// // // // //     // Clear commands
// // // // //     'clear all': () => {
// // // // //       voiceService.speak('Clearing all fields');
// // // // //       componentRef.current?.clearAll();
// // // // //     },
    
// // // // //     'clear': () => {
// // // // //       voiceService.speak('Clearing all fields');
// // // // //       componentRef.current?.clearAll();
// // // // //     },
    
// // // // //     'clear input': () => {
// // // // //       voiceService.speak('Clearing input text');
// // // // //       componentRef.current?.clearInput();
// // // // //     },
    
// // // // //     'clear output': () => {
// // // // //       voiceService.speak('Clearing translation output');
// // // // //       componentRef.current?.clearOutput();
// // // // //     },
    
// // // // //     // Popular language pairs
// // // // //     'english to hindi': () => {
// // // // //       voiceService.speak('Setting English to Hindi');
// // // // //       componentRef.current?.setSourceLang('en');
// // // // //       componentRef.current?.setTargetLang('hi');
// // // // //       componentRef.current?.setStatusMessage('Set to English → Hindi');
// // // // //       // Auto-translate if there's text
// // // // //       const text = componentRef.current?.getCurrentText();
// // // // //       if (text && text.trim()) {
// // // // //         setTimeout(() => componentRef.current?.handleTranslate(text), 500);
// // // // //       }
// // // // //     },
    
// // // // //     'hindi to english': () => {
// // // // //       voiceService.speak('Setting Hindi to English');
// // // // //       componentRef.current?.setSourceLang('hi');
// // // // //       componentRef.current?.setTargetLang('en');
// // // // //       componentRef.current?.setStatusMessage('Set to Hindi → English');
// // // // //       const text = componentRef.current?.getCurrentText();
// // // // //       if (text && text.trim()) {
// // // // //         setTimeout(() => componentRef.current?.handleTranslate(text), 500);
// // // // //       }
// // // // //     },
    
// // // // //     'english to telugu': () => {
// // // // //       voiceService.speak('Setting English to Telugu');
// // // // //       componentRef.current?.setSourceLang('en');
// // // // //       componentRef.current?.setTargetLang('te');
// // // // //       componentRef.current?.setStatusMessage('Set to English → Telugu');
// // // // //       const text = componentRef.current?.getCurrentText();
// // // // //       if (text && text.trim()) {
// // // // //         setTimeout(() => componentRef.current?.handleTranslate(text), 500);
// // // // //       }
// // // // //     },
    
// // // // //     'telugu to english': () => {
// // // // //       voiceService.speak('Setting Telugu to English');
// // // // //       componentRef.current?.setSourceLang('te');
// // // // //       componentRef.current?.setTargetLang('en');
// // // // //       componentRef.current?.setStatusMessage('Set to Telugu → English');
// // // // //       const text = componentRef.current?.getCurrentText();
// // // // //       if (text && text.trim()) {
// // // // //         setTimeout(() => componentRef.current?.handleTranslate(text), 500);
// // // // //       }
// // // // //     },
    
// // // // //     // Quick language selection
// // // // //     'select english': () => {
// // // // //       voiceService.speak('Setting English as source language');
// // // // //       componentRef.current?.setSourceLang('en');
// // // // //     },
    
// // // // //     'select hindi': () => {
// // // // //       voiceService.speak('Setting Hindi as target language');
// // // // //       componentRef.current?.setTargetLang('hi');
// // // // //       const text = componentRef.current?.getCurrentText();
// // // // //       if (text && text.trim()) {
// // // // //         setTimeout(() => componentRef.current?.handleTranslate(text), 500);
// // // // //       }
// // // // //     },
    
// // // // //     'select telugu': () => {
// // // // //       voiceService.speak('Setting Telugu as target language');
// // // // //       componentRef.current?.setTargetLang('te');
// // // // //       const text = componentRef.current?.getCurrentText();
// // // // //       if (text && text.trim()) {
// // // // //         setTimeout(() => componentRef.current?.handleTranslate(text), 500);
// // // // //       }
// // // // //     },
    
// // // // //     'select spanish': () => {
// // // // //       voiceService.speak('Setting Spanish as target language');
// // // // //       componentRef.current?.setTargetLang('es');
// // // // //       const text = componentRef.current?.getCurrentText();
// // // // //       if (text && text.trim()) {
// // // // //         setTimeout(() => componentRef.current?.handleTranslate(text), 500);
// // // // //       }
// // // // //     },
    
// // // // //     'select french': () => {
// // // // //       voiceService.speak('Setting French as target language');
// // // // //       componentRef.current?.setTargetLang('fr');
// // // // //       const text = componentRef.current?.getCurrentText();
// // // // //       if (text && text.trim()) {
// // // // //         setTimeout(() => componentRef.current?.handleTranslate(text), 500);
// // // // //       }
// // // // //     },
    
// // // // //     // Status check
// // // // //     'what can i say': () => {
// // // // //       const commandList = [
// // // // //         'Speech control: "start listening", "stop", "continuous mode"',
// // // // //         'Translation: "translate", "speak translation", "stop speaking"',
// // // // //         'Clear commands: "clear all", "clear input", "clear output"',
// // // // //         'Languages: "english to hindi", "hindi to english", "select [language]"',
// // // // //         'Actions: "swap languages", "help", "go to dashboard"'
// // // // //       ];
// // // // //       voiceService.speak('Here are the main commands: ' + commandList.join('. '));
// // // // //     },
    
// // // // //     'show commands': () => {
// // // // //       const allCommands = [
// // // // //         'start listening', 'speak now', 'stop', 'stop listening',
// // // // //         'continuous mode', 'translate', 'translate now',
// // // // //         'speak translation', 'stop speaking',
// // // // //         'swap languages', 'english to hindi', 'hindi to english',
// // // // //         'english to telugu', 'telugu to english',
// // // // //         'clear all', 'clear', 'clear input', 'clear output',
// // // // //         'select english', 'select hindi', 'select telugu',
// // // // //         'select spanish', 'select french',
// // // // //         'help', 'what can i say', 'show commands',
// // // // //         'go to dashboard', 'logout'
// // // // //       ];
      
// // // // //       componentRef.current?.setStatusMessage('Available commands: ' + allCommands.join(', '));
// // // // //       voiceService.speak('Showing all available commands in the status bar');
// // // // //     }
// // // // //   };

// // // // //   // Register all commands
// // // // //   Object.entries(commands).forEach(([pattern, handler]) => {
// // // // //     voiceService.registerCommand(pattern, handler);
// // // // //   });

// // // // //   // Dynamic translate to specific language
// // // // //   voiceService.registerDynamicHandler(
// // // // //     /translate to (english|hindi|telugu|spanish|french|german|italian|japanese|korean|chinese|arabic)/i,
// // // // //     (matches) => {
// // // // //       const lang = matches[0].toLowerCase();
// // // // //       const langMap = {
// // // // //         english: 'en',
// // // // //         hindi: 'hi',
// // // // //         telugu: 'te',
// // // // //         spanish: 'es',
// // // // //         french: 'fr',
// // // // //         german: 'de',
// // // // //         italian: 'it',
// // // // //         japanese: 'ja',
// // // // //         korean: 'ko',
// // // // //         chinese: 'zh',
// // // // //         arabic: 'ar'
// // // // //       };
      
// // // // //       if (langMap[lang]) {
// // // // //         voiceService.speak(`Translating to ${lang}`);
// // // // //         componentRef.current?.setTargetLang(langMap[lang]);
// // // // //         componentRef.current?.setStatusMessage(`Translating to ${lang}`);
        
// // // // //         const text = componentRef.current?.getCurrentText();
// // // // //         if (text && text.trim()) {
// // // // //           setTimeout(() => componentRef.current?.handleTranslate(text), 500);
// // // // //         }
// // // // //       }
// // // // //     }
// // // // //   );

// // // // //   // Dynamic language selection
// // // // //   voiceService.registerDynamicHandler(
// // // // //     /select (english|hindi|telugu|spanish|french|german|italian|japanese|korean|chinese|arabic)/i,
// // // // //     (matches) => {
// // // // //       const lang = matches[0].toLowerCase();
// // // // //       const langMap = {
// // // // //         english: 'en',
// // // // //         hindi: 'hi',
// // // // //         telugu: 'te',
// // // // //         spanish: 'es',
// // // // //         french: 'fr',
// // // // //         german: 'de',
// // // // //         italian: 'it',
// // // // //         japanese: 'ja',
// // // // //         korean: 'ko',
// // // // //         chinese: 'zh',
// // // // //         arabic: 'ar'
// // // // //       };
      
// // // // //       if (langMap[lang]) {
// // // // //         voiceService.speak(`Selecting ${lang}`);
// // // // //         componentRef.current?.setTargetLang(langMap[lang]);
// // // // //         componentRef.current?.setStatusMessage(`Target set to ${lang}`);
        
// // // // //         // Auto-translate if there's text
// // // // //         const text = componentRef.current?.getCurrentText();
// // // // //         if (text && text.trim()) {
// // // // //           setTimeout(() => componentRef.current?.handleTranslate(text), 500);
// // // // //         }
// // // // //       }
// // // // //     }
// // // // //   );

// // // // //   // Dynamic translation pairs
// // // // //   voiceService.registerDynamicHandler(
// // // // //     /(?:translate from|set) (english|hindi|telugu|spanish|french) to (english|hindi|telugu|spanish|french)/i,
// // // // //     (matches) => {
// // // // //       const fromLang = matches[0].toLowerCase();
// // // // //       const toLang = matches[1].toLowerCase();
// // // // //       const langMap = {
// // // // //         english: 'en',
// // // // //         hindi: 'hi',
// // // // //         telugu: 'te',
// // // // //         spanish: 'es',
// // // // //         french: 'fr'
// // // // //       };
      
// // // // //       if (langMap[fromLang] && langMap[toLang]) {
// // // // //         voiceService.speak(`Setting ${fromLang} to ${toLang}`);
// // // // //         componentRef.current?.setSourceLang(langMap[fromLang]);
// // // // //         componentRef.current?.setTargetLang(langMap[toLang]);
// // // // //         componentRef.current?.setStatusMessage(`Set to ${fromLang} → ${toLang}`);
        
// // // // //         // Auto-translate if there's text
// // // // //         const text = componentRef.current?.getCurrentText();
// // // // //         if (text && text.trim()) {
// // // // //           setTimeout(() => componentRef.current?.handleTranslate(text), 500);
// // // // //         }
// // // // //       }
// // // // //     }
// // // // //   );

// // // // //   return () => {
// // // // //     // Cleanup function
// // // // //     voiceService.clearCommands();
// // // // //     voiceService.clearDynamicHandlers();
// // // // //   };
// // // // // };



// // // // // src/voice-commands/languageTranslatorCommands.js
// // // // import { voiceService } from '../services/voiceService';

// // // // export const initializeLanguageTranslatorCommands = (componentRef) => {
// // // //   // Clear previous commands for this component
// // // //   voiceService.clearDynamicHandlers();
  
// // // //   // Store component methods for voice control
// // // //   const commands = {
// // // //     // Navigation commands
// // // //     'go to dashboard': () => {
// // // //       voiceService.speak('Going back to dashboard');
// // // //       componentRef.current?.handleBackToDashboard();
// // // //     },
    
// // // //     'logout': () => {
// // // //       voiceService.speak('Logging out');
// // // //       componentRef.current?.handleLogout();
// // // //     },
    
// // // //     'help': () => {
// // // //       voiceService.speak('Say "start listening" then speak your text. Say "translate" to translate. Say "clear all" to clear.', { rate: 0.9 });
// // // //     },
    
// // // //     // Speech control commands
// // // //     'start listening': () => {
// // // //       voiceService.speak('Listening for your text. Please speak now.', { rate: 0.9 });
// // // //       componentRef.current?.startVoiceRecording();
// // // //     },
    
// // // //     'speak now': () => {
// // // //       voiceService.speak('I am listening. Please speak your text now.', { rate: 0.9 });
// // // //       componentRef.current?.startVoiceRecording();
// // // //     },
    
// // // //     'listen now': () => {
// // // //       voiceService.speak('Ready to listen. Please speak.', { rate: 0.9 });
// // // //       componentRef.current?.startVoiceRecording();
// // // //     },
    
// // // //     'continuous mode': () => {
// // // //       voiceService.speak('Continuous mode toggled. Speak to add text continuously.', { rate: 0.9 });
// // // //       componentRef.current?.toggleContinuousMode();
// // // //     },
    
// // // //     // Translation commands
// // // //     'translate': () => {
// // // //       const text = componentRef.current?.getCurrentText();
// // // //       if (text && text.trim()) {
// // // //         voiceService.speak(`Translating to ${componentRef.current?.languages[componentRef.current?.targetLang]?.name}`, { rate: 0.9 });
// // // //         componentRef.current?.handleTranslate(text);
// // // //       } else {
// // // //         voiceService.speak('Please say "start listening" first, then speak your text.', { rate: 0.9 });
// // // //       }
// // // //     },
    
// // // //     'translate now': () => {
// // // //       const text = componentRef.current?.getCurrentText();
// // // //       if (text && text.trim()) {
// // // //         voiceService.speak('Translating now', { rate: 0.9 });
// // // //         componentRef.current?.handleTranslate(text);
// // // //       } else {
// // // //         voiceService.speak('No text to translate. Please speak some text first.', { rate: 0.9 });
// // // //       }
// // // //     },
    
// // // //     'speak translation': () => {
// // // //       if (componentRef.current?.translatedText) {
// // // //         voiceService.speak('Speaking the translation', { rate: 0.9 });
// // // //         componentRef.current?.speakText(componentRef.current.translatedText);
// // // //       } else {
// // // //         voiceService.speak('No translation available yet. Please translate first.', { rate: 0.9 });
// // // //       }
// // // //     },
    
// // // //     // Language selection
// // // //     'swap languages': () => {
// // // //       voiceService.speak('Swapping languages', { rate: 0.9 });
// // // //       componentRef.current?.swapLanguages();
// // // //     },
    
// // // //     // Clear commands
// // // //     'clear all': () => {
// // // //       voiceService.speak('Clearing all fields', { rate: 0.9 });
// // // //       componentRef.current?.clearAll();
// // // //     },
    
// // // //     'clear': () => {
// // // //       voiceService.speak('Clearing everything', { rate: 0.9 });
// // // //       componentRef.current?.clearAll();
// // // //     },
    
// // // //     'clear input': () => {
// // // //       voiceService.speak('Clearing input text', { rate: 0.9 });
// // // //       componentRef.current?.clearInput();
// // // //     },
    
// // // //     'clear output': () => {
// // // //       voiceService.speak('Clearing translation output', { rate: 0.9 });
// // // //       componentRef.current?.clearOutput();
// // // //     },
    
// // // //     // Popular language pairs
// // // //     'english to hindi': () => {
// // // //       voiceService.speak('Setting English to Hindi', { rate: 0.9 });
// // // //       componentRef.current?.setSourceLang('en');
// // // //       componentRef.current?.setTargetLang('hi');
// // // //       componentRef.current?.setStatusMessage('Set to English → Hindi');
// // // //       // Auto-translate if there's text
// // // //       const text = componentRef.current?.getCurrentText();
// // // //       if (text && text.trim()) {
// // // //         setTimeout(() => componentRef.current?.handleTranslate(text), 500);
// // // //       }
// // // //     },
    
// // // //     'hindi to english': () => {
// // // //       voiceService.speak('Setting Hindi to English', { rate: 0.9 });
// // // //       componentRef.current?.setSourceLang('hi');
// // // //       componentRef.current?.setTargetLang('en');
// // // //       componentRef.current?.setStatusMessage('Set to Hindi → English');
// // // //       const text = componentRef.current?.getCurrentText();
// // // //       if (text && text.trim()) {
// // // //         setTimeout(() => componentRef.current?.handleTranslate(text), 500);
// // // //       }
// // // //     },
    
// // // //     'english to telugu': () => {
// // // //       voiceService.speak('Setting English to Telugu', { rate: 0.9 });
// // // //       componentRef.current?.setSourceLang('en');
// // // //       componentRef.current?.setTargetLang('te');
// // // //       componentRef.current?.setStatusMessage('Set to English → Telugu');
// // // //       const text = componentRef.current?.getCurrentText();
// // // //       if (text && text.trim()) {
// // // //         setTimeout(() => componentRef.current?.handleTranslate(text), 500);
// // // //       }
// // // //     },
    
// // // //     // Quick language selection
// // // //     'select english': () => {
// // // //       voiceService.speak('Setting English as source language', { rate: 0.9 });
// // // //       componentRef.current?.setSourceLang('en');
// // // //     },
    
// // // //     'select hindi': () => {
// // // //       voiceService.speak('Setting Hindi as target language', { rate: 0.9 });
// // // //       componentRef.current?.setTargetLang('hi');
// // // //       const text = componentRef.current?.getCurrentText();
// // // //       if (text && text.trim()) {
// // // //         setTimeout(() => componentRef.current?.handleTranslate(text), 500);
// // // //       }
// // // //     },
    
// // // //     'select telugu': () => {
// // // //       voiceService.speak('Setting Telugu as target language', { rate: 0.9 });
// // // //       componentRef.current?.setTargetLang('te');
// // // //       const text = componentRef.current?.getCurrentText();
// // // //       if (text && text.trim()) {
// // // //         setTimeout(() => componentRef.current?.handleTranslate(text), 500);
// // // //       }
// // // //     },
    
// // // //     // Status check
// // // //     'what can i say': () => {
// // // //       const commandList = [
// // // //         'First say "start listening" then speak your text',
// // // //         'Then say "translate" to translate it',
// // // //         'Say "clear all" to clear everything',
// // // //         'Say "english to hindi" to set languages',
// // // //         'Say "continuous mode" to keep adding text'
// // // //       ];
// // // //       voiceService.speak('Here are the main commands: ' + commandList.join('. '), { rate: 0.85 });
// // // //     }
// // // //   };

// // // //   // Register all commands
// // // //   Object.entries(commands).forEach(([pattern, handler]) => {
// // // //     voiceService.registerCommand(pattern, handler);
// // // //   });

// // // //   // Dynamic translate to specific language
// // // //   voiceService.registerDynamicHandler(
// // // //     /translate to (english|hindi|telugu|spanish|french|german|italian|japanese|korean|chinese|arabic)/i,
// // // //     (matches) => {
// // // //       const lang = matches[0].toLowerCase();
// // // //       const langMap = {
// // // //         english: 'en',
// // // //         hindi: 'hi',
// // // //         telugu: 'te',
// // // //         spanish: 'es',
// // // //         french: 'fr',
// // // //         german: 'de',
// // // //         italian: 'it',
// // // //         japanese: 'ja',
// // // //         korean: 'ko',
// // // //         chinese: 'zh',
// // // //         arabic: 'ar'
// // // //       };
      
// // // //       if (langMap[lang]) {
// // // //         voiceService.speak(`Translating to ${lang}`, { rate: 0.9 });
// // // //         componentRef.current?.setTargetLang(langMap[lang]);
// // // //         componentRef.current?.setStatusMessage(`Translating to ${lang}`);
        
// // // //         const text = componentRef.current?.getCurrentText();
// // // //         if (text && text.trim()) {
// // // //           setTimeout(() => componentRef.current?.handleTranslate(text), 500);
// // // //         }
// // // //       }
// // // //     }
// // // //   );

// // // //   // Dynamic language selection
// // // //   voiceService.registerDynamicHandler(
// // // //     /select (english|hindi|telugu|spanish|french|german|italian|japanese|korean|chinese|arabic)/i,
// // // //     (matches) => {
// // // //       const lang = matches[0].toLowerCase();
// // // //       const langMap = {
// // // //         english: 'en',
// // // //         hindi: 'hi',
// // // //         telugu: 'te',
// // // //         spanish: 'es',
// // // //         french: 'fr',
// // // //         german: 'de',
// // // //         italian: 'it',
// // // //         japanese: 'ja',
// // // //         korean: 'ko',
// // // //         chinese: 'zh',
// // // //         arabic: 'ar'
// // // //       };
      
// // // //       if (langMap[lang]) {
// // // //         voiceService.speak(`Selecting ${lang}`, { rate: 0.9 });
// // // //         componentRef.current?.setTargetLang(langMap[lang]);
// // // //         componentRef.current?.setStatusMessage(`Target set to ${lang}`);
        
// // // //         // Auto-translate if there's text
// // // //         const text = componentRef.current?.getCurrentText();
// // // //         if (text && text.trim()) {
// // // //           setTimeout(() => componentRef.current?.handleTranslate(text), 500);
// // // //         }
// // // //       }
// // // //     }
// // // //   );

// // // //   return () => {
// // // //     // Cleanup function
// // // //     voiceService.clearCommands();
// // // //     voiceService.clearDynamicHandlers();
// // // //   };
// // // // };







// // // // src/voice-commands/languageTranslatorCommands.js
// // // import { voiceService } from '../services/voiceService';

// // // export const initializeLanguageTranslatorCommands = (componentRef) => {
// // //   // Clear previous commands for this component
// // //   voiceService.clearDynamicHandlers();
  
// // //   // All language mappings
// // //   const langMap = {
// // //     english: 'en',
// // //     telugu: 'te',
// // //     hindi: 'hi',
// // //     tamil: 'ta',
// // //     kannada: 'kn',
// // //     malayalam: 'ml',
// // //     marathi: 'mr',
// // //     gujarati: 'gu',
// // //     bengali: 'bn',
// // //     punjabi: 'pa',
// // //     odia: 'or',
// // //     spanish: 'es',
// // //     french: 'fr',
// // //     german: 'de',
// // //     italian: 'it',
// // //     portuguese: 'pt',
// // //     russian: 'ru',
// // //     japanese: 'ja',
// // //     korean: 'ko',
// // //     chinese: 'zh',
// // //     arabic: 'ar',
// // //     urdu: 'ur',
// // //     assamese: 'as',
// // //     sanskrit: 'sa'
// // //   };

// // //   // Store component methods for voice control
// // //   const commands = {
// // //     // Navigation commands
// // //     'go to dashboard': () => {
// // //       voiceService.speak('Going back to dashboard');
// // //       componentRef.current?.handleBackToDashboard();
// // //     },
    
// // //     'dashboard': () => {
// // //       voiceService.speak('Going to dashboard');
// // //       componentRef.current?.handleBackToDashboard();
// // //     },
    
// // //     'logout': () => {
// // //       voiceService.speak('Logging out');
// // //       componentRef.current?.handleLogout();
// // //     },
    
// // //     'help': () => {
// // //       voiceService.speak('Say "start listening" then speak your text. Say "translate" to translate. Say "clear all" to clear.', { rate: 0.9 });
// // //     },
    
// // //     // Speech control commands
// // //     'start listening': () => {
// // //       voiceService.speak('Listening for your text. Please speak now.', { rate: 0.9 });
// // //       componentRef.current?.startVoiceRecording();
// // //     },
    
// // //     'speak now': () => {
// // //       voiceService.speak('I am listening. Please speak your text now.', { rate: 0.9 });
// // //       componentRef.current?.startVoiceRecording();
// // //     },
    
// // //     'listen now': () => {
// // //       voiceService.speak('Ready to listen. Please speak.', { rate: 0.9 });
// // //       componentRef.current?.startVoiceRecording();
// // //     },
    
// // //     'continuous mode': () => {
// // //       voiceService.speak('Continuous mode toggled. Speak to add text continuously.', { rate: 0.9 });
// // //       componentRef.current?.toggleContinuousMode();
// // //     },
    
// // //     // Translation commands
// // //     'translate': () => {
// // //       const text = componentRef.current?.getCurrentText();
// // //       if (text && text.trim()) {
// // //         voiceService.speak(`Translating to ${componentRef.current?.languages[componentRef.current?.targetLang]?.name}`, { rate: 0.9 });
// // //         componentRef.current?.handleTranslate(text);
// // //       } else {
// // //         voiceService.speak('Please say "start listening" first, then speak your text.', { rate: 0.9 });
// // //       }
// // //     },
    
// // //     'translate now': () => {
// // //       const text = componentRef.current?.getCurrentText();
// // //       if (text && text.trim()) {
// // //         voiceService.speak('Translating now', { rate: 0.9 });
// // //         componentRef.current?.handleTranslate(text);
// // //       } else {
// // //         voiceService.speak('No text to translate. Please speak some text first.', { rate: 0.9 });
// // //       }
// // //     },
    
// // //     'speak translation': () => {
// // //       if (componentRef.current?.translatedText) {
// // //         voiceService.speak('Speaking the translation', { rate: 0.9 });
// // //         componentRef.current?.speakText(componentRef.current.translatedText);
// // //       } else {
// // //         voiceService.speak('No translation available yet. Please translate first.', { rate: 0.9 });
// // //       }
// // //     },
    
// // //     // Language swap
// // //     'swap languages': () => {
// // //       voiceService.speak('Swapping languages', { rate: 0.9 });
// // //       componentRef.current?.swapLanguages();
// // //     },
    
// // //     'swap language': () => {
// // //       voiceService.speak('Swapping languages', { rate: 0.9 });
// // //       componentRef.current?.swapLanguages();
// // //     },
    
// // //     // Clear commands
// // //     'clear all': () => {
// // //       voiceService.speak('Clearing all fields', { rate: 0.9 });
// // //       componentRef.current?.clearAll();
// // //     },
    
// // //     'clear': () => {
// // //       voiceService.speak('Clearing everything', { rate: 0.9 });
// // //       componentRef.current?.clearAll();
// // //     },
    
// // //     'clear input': () => {
// // //       voiceService.speak('Clearing input text', { rate: 0.9 });
// // //       componentRef.current?.clearInput();
// // //     },
    
// // //     'clear output': () => {
// // //       voiceService.speak('Clearing translation output', { rate: 0.9 });
// // //       componentRef.current?.clearOutput();
// // //     },
    
// // //     // Status check
// // //     'what can i say': () => {
// // //       const commandList = [
// // //         'First say "start listening" then speak your text',
// // //         'Then say "translate" to translate it',
// // //         'Say "clear all" to clear everything',
// // //         'Say "english to hindi" to set languages',
// // //         'Say "continuous mode" to keep adding text',
// // //         'Say "swap languages" to swap source and target'
// // //       ];
// // //       voiceService.speak('Here are the main commands: ' + commandList.join('. '), { rate: 0.85 });
// // //     }
// // //   };

// // //   // Generate language pair commands for all combinations
// // //   const generateLanguagePairCommands = () => {
// // //     const languagePairs = {};
    
// // //     // Generate "X to Y" commands for all language pairs
// // //     Object.keys(langMap).forEach(fromLang => {
// // //       Object.keys(langMap).forEach(toLang => {
// // //         if (fromLang !== toLang) {
// // //           const commandKey = `${fromLang} to ${toLang}`;
// // //           languagePairs[commandKey] = () => {
// // //             voiceService.speak(`Setting ${fromLang} to ${toLang}`, { rate: 0.9 });
// // //             componentRef.current?.setSourceLang(langMap[fromLang]);
// // //             componentRef.current?.setTargetLang(langMap[toLang]);
// // //             componentRef.current?.setStatusMessage(`Set to ${fromLang} → ${toLang}`);
            
// // //             // Auto-translate if there's text
// // //             const text = componentRef.current?.getCurrentText();
// // //             if (text && text.trim()) {
// // //               setTimeout(() => componentRef.current?.handleTranslate(text), 500);
// // //             }
// // //           };
// // //         }
// // //       });
// // //     });
    
// // //     return languagePairs;
// // //   };

// // //   // Generate "select X" commands for all languages
// // //   const generateSelectCommands = () => {
// // //     const selectCommands = {};
    
// // //     Object.keys(langMap).forEach(lang => {
// // //       selectCommands[`select ${lang}`] = () => {
// // //         voiceService.speak(`Selecting ${lang}`, { rate: 0.9 });
// // //         componentRef.current?.setTargetLang(langMap[lang]);
// // //         componentRef.current?.setStatusMessage(`Target set to ${lang}`);
        
// // //         // Auto-translate if there's text
// // //         const text = componentRef.current?.getCurrentText();
// // //         if (text && text.trim()) {
// // //           setTimeout(() => componentRef.current?.handleTranslate(text), 500);
// // //         }
// // //       };
// // //     });
    
// // //     return selectCommands;
// // //   };

// // //   // Combine all commands
// // //   const allCommands = {
// // //     ...commands,
// // //     ...generateLanguagePairCommands(),
// // //     ...generateSelectCommands()
// // //   };

// // //   // Register all commands
// // //   Object.entries(allCommands).forEach(([pattern, handler]) => {
// // //     voiceService.registerCommand(pattern, handler);
// // //   });

// // //   // Dynamic translate to specific language (catch-all)
// // //   voiceService.registerDynamicHandler(
// // //     /translate to (english|telugu|hindi|tamil|kannada|malayalam|marathi|gujarati|bengali|punjabi|odia|spanish|french|german|italian|portuguese|russian|japanese|korean|chinese|arabic|urdu|assamese|sanskrit)/i,
// // //     (matches) => {
// // //       const lang = matches[0].toLowerCase();
// // //       if (langMap[lang]) {
// // //         voiceService.speak(`Translating to ${lang}`, { rate: 0.9 });
// // //         componentRef.current?.setTargetLang(langMap[lang]);
// // //         componentRef.current?.setStatusMessage(`Translating to ${lang}`);
        
// // //         const text = componentRef.current?.getCurrentText();
// // //         if (text && text.trim()) {
// // //           setTimeout(() => componentRef.current?.handleTranslate(text), 500);
// // //         }
// // //       }
// // //     }
// // //   );

// // //   // Dynamic language selection (catch-all)
// // //   voiceService.registerDynamicHandler(
// // //     /select (english|telugu|hindi|tamil|kannada|malayalam|marathi|gujarati|bengali|punjabi|odia|spanish|french|german|italian|portuguese|russian|japanese|korean|chinese|arabic|urdu|assamese|sanskrit)/i,
// // //     (matches) => {
// // //       const lang = matches[0].toLowerCase();
// // //       if (langMap[lang]) {
// // //         voiceService.speak(`Selecting ${lang}`, { rate: 0.9 });
// // //         componentRef.current?.setTargetLang(langMap[lang]);
// // //         componentRef.current?.setStatusMessage(`Target set to ${lang}`);
        
// // //         const text = componentRef.current?.getCurrentText();
// // //         if (text && text.trim()) {
// // //           setTimeout(() => componentRef.current?.handleTranslate(text), 500);
// // //         }
// // //       }
// // //     }
// // //   );

// // //   // Dynamic "X to Y" pattern (catch-all for any language pair)
// // //   voiceService.registerDynamicHandler(
// // //     /(?:translate from |set |change to |)(english|telugu|hindi|tamil|kannada|malayalam|marathi|gujarati|bengali|punjabi|odia|spanish|french|german|italian|portuguese|russian|japanese|korean|chinese|arabic|urdu|assamese|sanskrit) (?:to|into|in) (english|telugu|hindi|tamil|kannada|malayalam|marathi|gujarati|bengali|punjabi|odia|spanish|french|german|italian|portuguese|russian|japanese|korean|chinese|arabic|urdu|assamese|sanskrit)/i,
// // //     (matches) => {
// // //       const fromLang = matches[0].toLowerCase();
// // //       const toLang = matches[1].toLowerCase();
      
// // //       if (langMap[fromLang] && langMap[toLang]) {
// // //         voiceService.speak(`Setting ${fromLang} to ${toLang}`, { rate: 0.9 });
// // //         componentRef.current?.setSourceLang(langMap[fromLang]);
// // //         componentRef.current?.setTargetLang(langMap[toLang]);
// // //         componentRef.current?.setStatusMessage(`Set to ${fromLang} → ${toLang}`);
        
// // //         const text = componentRef.current?.getCurrentText();
// // //         if (text && text.trim()) {
// // //           setTimeout(() => componentRef.current?.handleTranslate(text), 500);
// // //         }
// // //       }
// // //     }
// // //   );

// // //   // Also update the processCommand method to be more flexible
// // //   const originalProcessCommand = voiceService.processCommand.bind(voiceService);
  
// // //   voiceService.processCommand = function(transcript) {
// // //     console.log(`[VoiceService/${this.currentFeature}] Processing: "${transcript}"`);
    
// // //     let commandProcessed = false;
    
// // //     // 1. First check for exact match
// // //     if (this.commands.has(transcript)) {
// // //       console.log(`[VoiceService] Exact match found: "${transcript}"`);
// // //       try {
// // //         this.commands.get(transcript)();
// // //         commandProcessed = true;
// // //       } catch (error) {
// // //         console.error(`[VoiceService] Error executing command "${transcript}":`, error);
// // //       }
// // //     }
    
// // //     // 2. If no exact match, try dynamic handlers
// // //     if (!commandProcessed) {
// // //       commandProcessed = this.handleDynamicCommand(transcript);
// // //     }
    
// // //     // 3. If still no match, try fuzzy matching (partial matches for commands)
// // //     if (!commandProcessed) {
// // //       const words = transcript.split(' ');
      
// // //       // Try to match multi-word commands (like "english to spanish")
// // //       if (words.length >= 3) {
// // //         // Check for "X to Y" pattern
// // //         const toIndex = words.findIndex(w => w === 'to' || w === 'into' || w === 'in');
// // //         if (toIndex > 0 && toIndex < words.length - 1) {
// // //           const fromPart = words.slice(0, toIndex).join(' ');
// // //           const toPart = words.slice(toIndex + 1).join(' ');
          
// // //           // Try to match the language names
// // //           const fromLang = Object.keys(langMap).find(lang => 
// // //             lang.includes(fromPart.toLowerCase()) || fromPart.toLowerCase().includes(lang)
// // //           );
// // //           const toLang = Object.keys(langMap).find(lang => 
// // //             lang.includes(toPart.toLowerCase()) || toPart.toLowerCase().includes(lang)
// // //           );
          
// // //           if (fromLang && toLang) {
// // //             console.log(`[VoiceService] Fuzzy matched language pair: ${fromLang} to ${toLang}`);
// // //             voiceService.speak(`Setting ${fromLang} to ${toLang}`, { rate: 0.9 });
// // //             componentRef.current?.setSourceLang(langMap[fromLang]);
// // //             componentRef.current?.setTargetLang(langMap[toLang]);
// // //             componentRef.current?.setStatusMessage(`Set to ${fromLang} → ${toLang}`);
            
// // //             const text = componentRef.current?.getCurrentText();
// // //             if (text && text.trim()) {
// // //               setTimeout(() => componentRef.current?.handleTranslate(text), 500);
// // //             }
// // //             commandProcessed = true;
// // //           }
// // //         }
// // //       }
      
// // //       // Try single word commands with partial matching
// // //       if (!commandProcessed && words.length === 1) {
// // //         for (const [pattern, handler] of this.commands.entries()) {
// // //           const patternWords = pattern.split(' ');
// // //           if (patternWords.length === 1 && 
// // //               (transcript.includes(pattern) || pattern.includes(transcript))) {
// // //             console.log(`[VoiceService] Single-word fuzzy match: "${transcript}" ≈ "${pattern}"`);
// // //             try {
// // //               handler();
// // //               commandProcessed = true;
// // //               break;
// // //             } catch (error) {
// // //               console.error(`[VoiceService] Error executing fuzzy match "${transcript}":`, error);
// // //             }
// // //           }
// // //         }
// // //       }
// // //     }
    
// // //     // 4. If no command was processed, call the general callback
// // //     if (!commandProcessed) {
// // //       console.log(`[VoiceService] No command matched for: "${transcript}"`);
// // //       if (this.onResultCallback) {
// // //         console.log(`[VoiceService] Calling general callback for: "${transcript}"`);
// // //         this.onResultCallback(transcript);
// // //       }
// // //     } else {
// // //       console.log(`[VoiceService] Command successfully processed: "${transcript}"`);
// // //     }
// // //   };

// // //   return () => {
// // //     // Cleanup function
// // //     voiceService.clearCommands();
// // //     voiceService.clearDynamicHandlers();
// // //     // Restore original processCommand
// // //     voiceService.processCommand = originalProcessCommand;
// // //   };
// // // };



// // // src/voice-commands/languageTranslatorCommands.js
// // import { voiceService } from '../services/voiceService';

// // export const initializeLanguageTranslatorCommands = (componentRef) => {
// //   // Clear previous commands for this component
// //   voiceService.clearDynamicHandlers();
  
// //   // All language mappings
// //   const langMap = {
// //     english: 'en',
// //     telugu: 'te',
// //     hindi: 'hi',
// //     tamil: 'ta',
// //     kannada: 'kn',
// //     malayalam: 'ml',
// //     marathi: 'mr',
// //     gujarati: 'gu',
// //     bengali: 'bn',
// //     punjabi: 'pa',
// //     odia: 'or',
// //     spanish: 'es',
// //     french: 'fr',
// //     german: 'de',
// //     italian: 'it',
// //     portuguese: 'pt',
// //     russian: 'ru',
// //     japanese: 'ja',
// //     korean: 'ko',
// //     chinese: 'zh',
// //     arabic: 'ar',
// //     urdu: 'ur',
// //     assamese: 'as',
// //     sanskrit: 'sa'
// //   };

// //   // Store component methods for voice control
// //   const commands = {
// //     // Navigation commands
// //     'go to dashboard': () => {
// //       voiceService.speak('Going back to dashboard');
// //       componentRef.current?.handleBackToDashboard();
// //     },
    
// //     'dashboard': () => {
// //       voiceService.speak('Going to dashboard');
// //       componentRef.current?.handleBackToDashboard();
// //     },
    
// //     'logout': () => {
// //       voiceService.speak('Logging out');
// //       componentRef.current?.handleLogout();
// //     },
    
// //     'help': () => {
// //       voiceService.speak('Say "start listening" then speak your text. Say "translate" to translate. Say "clear all" to clear.', { rate: 0.9 });
// //     },
    
// //     // Speech control commands
// //     'start listening': () => {
// //       voiceService.speak('Listening for your text. Please speak now.', { rate: 0.9 });
// //       componentRef.current?.startVoiceRecording();
// //     },
    
// //     'speak now': () => {
// //       voiceService.speak('I am listening. Please speak your text now.', { rate: 0.9 });
// //       componentRef.current?.startVoiceRecording();
// //     },
    
// //     'listen now': () => {
// //       voiceService.speak('Ready to listen. Please speak.', { rate: 0.9 });
// //       componentRef.current?.startVoiceRecording();
// //     },
    
// //     'continuous mode': () => {
// //       voiceService.speak('Continuous mode toggled. Speak to add text continuously.', { rate: 0.9 });
// //       componentRef.current?.toggleContinuousMode();
// //     },
    
// //     'stop': () => {
// //       voiceService.speak('Stopped recording', { rate: 0.9 });
// //       componentRef.current?.stopVoiceRecording();
// //     },
    
// //     'stop listening': () => {
// //       voiceService.speak('Stopped listening', { rate: 0.9 });
// //       componentRef.current?.stopVoiceRecording();
// //     },
    
// //     'cancel': () => {
// //       voiceService.speak('Cancelled', { rate: 0.9 });
// //       componentRef.current?.stopVoiceRecording();
// //     },
    
// //     // Translation commands
// //     'translate': () => {
// //       const text = componentRef.current?.getCurrentText();
// //       if (text && text.trim()) {
// //         voiceService.speak(`Translating to ${componentRef.current?.languages[componentRef.current?.targetLang]?.name}`, { rate: 0.9 });
// //         componentRef.current?.handleTranslate(text);
// //       } else {
// //         voiceService.speak('Please say "start listening" first, then speak your text.', { rate: 0.9 });
// //       }
// //     },
    
// //     'translate now': () => {
// //       const text = componentRef.current?.getCurrentText();
// //       if (text && text.trim()) {
// //         voiceService.speak('Translating now', { rate: 0.9 });
// //         componentRef.current?.handleTranslate(text);
// //       } else {
// //         voiceService.speak('No text to translate. Please speak some text first.', { rate: 0.9 });
// //       }
// //     },
    
// //     // Speech output commands - ADDED NEW COMMANDS
// //     'speak translation': () => {
// //       if (componentRef.current?.translatedText) {
// //         voiceService.speak('Speaking the translation', { rate: 0.9 });
// //         componentRef.current?.speakText(componentRef.current.translatedText);
// //       } else {
// //         voiceService.speak('No translation available yet. Please translate first.', { rate: 0.9 });
// //       }
// //     },
    
// //     'speak output': () => {
// //       if (componentRef.current?.translatedText) {
// //         voiceService.speak('Speaking the output', { rate: 0.9 });
// //         componentRef.current?.speakText(componentRef.current.translatedText);
// //       } else {
// //         voiceService.speak('No translation output available. Please translate first.', { rate: 0.9 });
// //       }
// //     },
    
// //     'output': () => {
// //       if (componentRef.current?.translatedText) {
// //         voiceService.speak('Speaking output', { rate: 0.9 });
// //         componentRef.current?.speakText(componentRef.current.translatedText);
// //       } else {
// //         voiceService.speak('No output available. Please translate first.', { rate: 0.9 });
// //       }
// //     },
    
// //     'translation': () => {
// //       if (componentRef.current?.translatedText) {
// //         voiceService.speak('Speaking translation', { rate: 0.9 });
// //         componentRef.current?.speakText(componentRef.current.translatedText);
// //       } else {
// //         voiceService.speak('No translation available. Please translate first.', { rate: 0.9 });
// //       }
// //     },
    
// //     'result': () => {
// //       if (componentRef.current?.translatedText) {
// //         voiceService.speak('Speaking result', { rate: 0.9 });
// //         componentRef.current?.speakText(componentRef.current.translatedText);
// //       } else {
// //         voiceService.speak('No result available. Please translate first.', { rate: 0.9 });
// //       }
// //     },
    
// //     'speak result': () => {
// //       if (componentRef.current?.translatedText) {
// //         voiceService.speak('Speaking result', { rate: 0.9 });
// //         componentRef.current?.speakText(componentRef.current.translatedText);
// //       } else {
// //         voiceService.speak('No result available. Please translate first.', { rate: 0.9 });
// //       }
// //     },
    
// //     // Language swap
// //     'swap languages': () => {
// //       voiceService.speak('Swapping languages', { rate: 0.9 });
// //       componentRef.current?.swapLanguages();
// //     },
    
// //     'swap language': () => {
// //       voiceService.speak('Swapping languages', { rate: 0.9 });
// //       componentRef.current?.swapLanguages();
// //     },
    
// //     // Clear commands
// //     'clear all': () => {
// //       voiceService.speak('Clearing all fields', { rate: 0.9 });
// //       componentRef.current?.clearAll();
// //     },
    
// //     'clear': () => {
// //       voiceService.speak('Clearing everything', { rate: 0.9 });
// //       componentRef.current?.clearAll();
// //     },
    
// //     'clear input': () => {
// //       voiceService.speak('Clearing input text', { rate: 0.9 });
// //       componentRef.current?.clearInput();
// //     },
    
// //     'clear output': () => {
// //       voiceService.speak('Clearing translation output', { rate: 0.9 });
// //       componentRef.current?.clearOutput();
// //     },
    
// //     // Status check
// //     'what can i say': () => {
// //       const commandList = [
// //         'First say "start listening" then speak your text',
// //         'Then say "translate" to translate it',
// //         'Say "speak translation" or "output" to hear the translation',
// //         'Say "clear all" to clear everything',
// //         'Say "english to hindi" to set languages',
// //         'Say "continuous mode" to keep adding text',
// //         'Say "swap languages" to swap source and target',
// //         'Say "stop" to stop recording'
// //       ];
// //       voiceService.speak('Here are the main commands: ' + commandList.join('. '), { rate: 0.85 });
// //     },
    
// //     'show commands': () => {
// //       const commandList = [
// //         '"start listening" - Start voice input',
// //         '"translate" - Translate current text',
// //         '"speak translation" - Hear the translation',
// //         '"clear all" - Clear everything',
// //         '"english to [language]" - Set language pair',
// //         '"continuous mode" - Continuous voice input',
// //         '"stop" - Stop recording'
// //       ];
// //       voiceService.speak('Available commands: ' + commandList.join('. '), { rate: 0.85 });
// //     }
// //   };

// //   // Generate language pair commands for all combinations
// //   const generateLanguagePairCommands = () => {
// //     const languagePairs = {};
    
// //     // Generate "X to Y" commands for all language pairs
// //     Object.keys(langMap).forEach(fromLang => {
// //       Object.keys(langMap).forEach(toLang => {
// //         if (fromLang !== toLang) {
// //           const commandKey = `${fromLang} to ${toLang}`;
// //           languagePairs[commandKey] = () => {
// //             voiceService.speak(`Setting ${fromLang} to ${toLang}`, { rate: 0.9 });
// //             componentRef.current?.setSourceLang(langMap[fromLang]);
// //             componentRef.current?.setTargetLang(langMap[toLang]);
// //             componentRef.current?.setStatusMessage(`Set to ${fromLang} → ${toLang}`);
            
// //             // Also update speech recognition language
// //             if (componentRef.current?.recognitionRef?.current) {
// //               componentRef.current.recognitionRef.current.lang = componentRef.current.languages[langMap[fromLang]]?.voice || 'en-US';
// //             }
            
// //             // Auto-translate if there's text
// //             const text = componentRef.current?.getCurrentText();
// //             if (text && text.trim()) {
// //               setTimeout(() => componentRef.current?.handleTranslate(text), 500);
// //             }
// //           };
// //         }
// //       });
// //     });
    
// //     return languagePairs;
// //   };

// //   // Generate "select X" commands for all languages
// //   const generateSelectCommands = () => {
// //     const selectCommands = {};
    
// //     Object.keys(langMap).forEach(lang => {
// //       selectCommands[`select ${lang}`] = () => {
// //         voiceService.speak(`Selecting ${lang} as target`, { rate: 0.9 });
// //         componentRef.current?.setTargetLang(langMap[lang]);
// //         componentRef.current?.setStatusMessage(`Target set to ${lang}`);
        
// //         // Auto-translate if there's text
// //         const text = componentRef.current?.getCurrentText();
// //         if (text && text.trim()) {
// //           setTimeout(() => componentRef.current?.handleTranslate(text), 500);
// //         }
// //       };
      
// //       // Add "use [language]" as source
// //       selectCommands[`use ${lang}`] = () => {
// //         voiceService.speak(`Using ${lang} as source`, { rate: 0.9 });
// //         componentRef.current?.setSourceLang(langMap[lang]);
// //         componentRef.current?.setStatusMessage(`Source set to ${lang}`);
        
// //         // Update speech recognition language
// //         if (componentRef.current?.recognitionRef?.current) {
// //           componentRef.current.recognitionRef.current.lang = componentRef.current.languages[langMap[lang]]?.voice || 'en-US';
// //         }
// //       };
// //     });
    
// //     return selectCommands;
// //   };

// //   // Combine all commands
// //   const allCommands = {
// //     ...commands,
// //     ...generateLanguagePairCommands(),
// //     ...generateSelectCommands()
// //   };

// //   // Register all commands
// //   Object.entries(allCommands).forEach(([pattern, handler]) => {
// //     voiceService.registerCommand(pattern, handler);
// //   });

// //   // Dynamic translate to specific language (catch-all)
// //   voiceService.registerDynamicHandler(
// //     /translate to (english|telugu|hindi|tamil|kannada|malayalam|marathi|gujarati|bengali|punjabi|odia|spanish|french|german|italian|portuguese|russian|japanese|korean|chinese|arabic|urdu|assamese|sanskrit)/i,
// //     (matches) => {
// //       const lang = matches[0].toLowerCase();
// //       if (langMap[lang]) {
// //         voiceService.speak(`Translating to ${lang}`, { rate: 0.9 });
// //         componentRef.current?.setTargetLang(langMap[lang]);
// //         componentRef.current?.setStatusMessage(`Translating to ${lang}`);
        
// //         const text = componentRef.current?.getCurrentText();
// //         if (text && text.trim()) {
// //           setTimeout(() => componentRef.current?.handleTranslate(text), 500);
// //         }
// //       }
// //     }
// //   );

// //   // Dynamic language selection (catch-all)
// //   voiceService.registerDynamicHandler(
// //     /(select|use) (english|telugu|hindi|tamil|kannada|malayalam|marathi|gujarati|bengali|punjabi|odia|spanish|french|german|italian|portuguese|russian|japanese|korean|chinese|arabic|urdu|assamese|sanskrit)/i,
// //     (matches) => {
// //       const action = matches[0].toLowerCase();
// //       const lang = matches[1].toLowerCase();
      
// //       if (langMap[lang]) {
// //         if (action === 'select') {
// //           voiceService.speak(`Selecting ${lang} as target`, { rate: 0.9 });
// //           componentRef.current?.setTargetLang(langMap[lang]);
// //           componentRef.current?.setStatusMessage(`Target set to ${lang}`);
// //         } else if (action === 'use') {
// //           voiceService.speak(`Using ${lang} as source`, { rate: 0.9 });
// //           componentRef.current?.setSourceLang(langMap[lang]);
// //           componentRef.current?.setStatusMessage(`Source set to ${lang}`);
          
// //           // Update speech recognition language
// //           if (componentRef.current?.recognitionRef?.current) {
// //             componentRef.current.recognitionRef.current.lang = componentRef.current.languages[langMap[lang]]?.voice || 'en-US';
// //           }
// //         }
        
// //         const text = componentRef.current?.getCurrentText();
// //         if (text && text.trim()) {
// //           setTimeout(() => componentRef.current?.handleTranslate(text), 500);
// //         }
// //       }
// //     }
// //   );

// //   // Dynamic "X to Y" pattern (catch-all for any language pair)
// //   voiceService.registerDynamicHandler(
// //     /(?:translate from |set |change to |)(english|telugu|hindi|tamil|kannada|malayalam|marathi|gujarati|bengali|punjabi|odia|spanish|french|german|italian|portuguese|russian|japanese|korean|chinese|arabic|urdu|assamese|sanskrit) (?:to|into|in) (english|telugu|hindi|tamil|kannada|malayalam|marathi|gujarati|bengali|punjabi|odia|spanish|french|german|italian|portuguese|russian|japanese|korean|chinese|arabic|urdu|assamese|sanskrit)/i,
// //     (matches) => {
// //       const fromLang = matches[0].toLowerCase();
// //       const toLang = matches[1].toLowerCase();
      
// //       if (langMap[fromLang] && langMap[toLang]) {
// //         voiceService.speak(`Setting ${fromLang} to ${toLang}`, { rate: 0.9 });
// //         componentRef.current?.setSourceLang(langMap[fromLang]);
// //         componentRef.current?.setTargetLang(langMap[toLang]);
// //         componentRef.current?.setStatusMessage(`Set to ${fromLang} → ${toLang}`);
        
// //         // Update speech recognition language
// //         if (componentRef.current?.recognitionRef?.current) {
// //           componentRef.current.recognitionRef.current.lang = componentRef.current.languages[langMap[fromLang]]?.voice || 'en-US';
// //         }
        
// //         const text = componentRef.current?.getCurrentText();
// //         if (text && text.trim()) {
// //           setTimeout(() => componentRef.current?.handleTranslate(text), 500);
// //         }
// //       }
// //     }
// //   );

// //   // Also update the processCommand method to be more flexible
// //   const originalProcessCommand = voiceService.processCommand.bind(voiceService);
  
// //   voiceService.processCommand = function(transcript) {
// //     console.log(`[VoiceService/${this.currentFeature}] Processing: "${transcript}"`);
    
// //     let commandProcessed = false;
    
// //     // 1. First check for exact match
// //     if (this.commands.has(transcript)) {
// //       console.log(`[VoiceService] Exact match found: "${transcript}"`);
// //       try {
// //         this.commands.get(transcript)();
// //         commandProcessed = true;
// //       } catch (error) {
// //         console.error(`[VoiceService] Error executing command "${transcript}":`, error);
// //       }
// //     }
    
// //     // 2. If no exact match, try dynamic handlers
// //     if (!commandProcessed) {
// //       commandProcessed = this.handleDynamicCommand(transcript);
// //     }
    
// //     // 3. If still no match, try fuzzy matching (partial matches for commands)
// //     if (!commandProcessed) {
// //       const lowerTranscript = transcript.toLowerCase();
      
// //       // Check for output/speak commands with fuzzy matching
// //       if (lowerTranscript.includes('speak') || 
// //           lowerTranscript.includes('output') || 
// //           lowerTranscript.includes('translation') || 
// //           lowerTranscript.includes('result')) {
        
// //         // Check if it's asking to speak the translation
// //         if ((lowerTranscript.includes('speak') && 
// //              (lowerTranscript.includes('output') || 
// //               lowerTranscript.includes('translation') || 
// //               lowerTranscript.includes('result'))) ||
// //             (lowerTranscript === 'output' || 
// //              lowerTranscript === 'translation' || 
// //              lowerTranscript === 'result')) {
          
// //           console.log(`[VoiceService] Fuzzy matched speak output command: "${transcript}"`);
// //           if (componentRef.current?.translatedText) {
// //             voiceService.speak('Speaking translation', { rate: 0.9 });
// //             componentRef.current?.speakText(componentRef.current.translatedText);
// //           } else {
// //             voiceService.speak('No translation available yet. Please translate first.', { rate: 0.9 });
// //           }
// //           commandProcessed = true;
// //         }
// //       }
      
// //       // Try language change commands
// //       if (!commandProcessed && lowerTranscript.includes(' to ')) {
// //         const parts = lowerTranscript.split(' to ');
// //         if (parts.length === 2) {
// //           const fromPart = parts[0].trim();
// //           const toPart = parts[1].trim();
          
// //           // Try to match the language names
// //           const fromLang = Object.keys(langMap).find(lang => 
// //             lang.includes(fromPart) || fromPart.includes(lang)
// //           );
// //           const toLang = Object.keys(langMap).find(lang => 
// //             lang.includes(toPart) || toPart.includes(lang)
// //           );
          
// //           if (fromLang && toLang) {
// //             console.log(`[VoiceService] Fuzzy matched language pair: ${fromLang} to ${toLang}`);
// //             voiceService.speak(`Setting ${fromLang} to ${toLang}`, { rate: 0.9 });
// //             componentRef.current?.setSourceLang(langMap[fromLang]);
// //             componentRef.current?.setTargetLang(langMap[toLang]);
// //             componentRef.current?.setStatusMessage(`Set to ${fromLang} → ${toLang}`);
            
// //             // Update speech recognition language
// //             if (componentRef.current?.recognitionRef?.current) {
// //               componentRef.current.recognitionRef.current.lang = componentRef.current.languages[langMap[fromLang]]?.voice || 'en-US';
// //             }
            
// //             const text = componentRef.current?.getCurrentText();
// //             if (text && text.trim()) {
// //               setTimeout(() => componentRef.current?.handleTranslate(text), 500);
// //             }
// //             commandProcessed = true;
// //           }
// //         }
// //       }
// //     }
    
// //     // 4. If no command was processed, call the general callback
// //     if (!commandProcessed) {
// //       console.log(`[VoiceService] No command matched for: "${transcript}"`);
// //       if (this.onResultCallback) {
// //         console.log(`[VoiceService] Calling general callback for: "${transcript}"`);
// //         this.onResultCallback(transcript);
// //       }
// //     } else {
// //       console.log(`[VoiceService] Command successfully processed: "${transcript}"`);
// //     }
// //   };

// //   return () => {
// //     // Cleanup function
// //     voiceService.clearCommands();
// //     voiceService.clearDynamicHandlers();
// //     // Restore original processCommand
// //     voiceService.processCommand = originalProcessCommand;
// //   };
// // };


// // src/voice-commands/languageTranslatorCommands.js - COMPLETE FIXED VERSION
// import { voiceService } from '../services/voiceService';

// export const initializeLanguageTranslatorCommands = (componentRef) => {
//   // Clear previous commands for this component
//   voiceService.clearDynamicHandlers();
  
//   // All language mappings with proper voice support
//   const langMap = {
//     english: { code: 'en', voice: 'en-US', tts: true },
//     telugu: { code: 'te', voice: 'te-IN', tts: false }, // Note: TTS might not be available
//     hindi: { code: 'hi', voice: 'hi-IN', tts: false },
//     tamil: { code: 'ta', voice: 'ta-IN', tts: false },
//     kannada: { code: 'kn', voice: 'kn-IN', tts: false },
//     malayalam: { code: 'ml', voice: 'ml-IN', tts: false },
//     marathi: { code: 'mr', voice: 'mr-IN', tts: false },
//     gujarati: { code: 'gu', voice: 'gu-IN', tts: false },
//     bengali: { code: 'bn', voice: 'bn-IN', tts: false },
//     punjabi: { code: 'pa', voice: 'pa-IN', tts: false },
//     odia: { code: 'or', voice: 'or-IN', tts: false },
//     spanish: { code: 'es', voice: 'es-ES', tts: true },
//     french: { code: 'fr', voice: 'fr-FR', tts: true },
//     german: { code: 'de', voice: 'de-DE', tts: true },
//     italian: { code: 'it', voice: 'it-IT', tts: true },
//     portuguese: { code: 'pt', voice: 'pt-PT', tts: true },
//     russian: { code: 'ru', voice: 'ru-RU', tts: true },
//     japanese: { code: 'ja', voice: 'ja-JP', tts: true },
//     korean: { code: 'ko', voice: 'ko-KR', tts: true },
//     chinese: { code: 'zh', voice: 'zh-CN', tts: true },
//     arabic: { code: 'ar', voice: 'ar-SA', tts: true },
//     urdu: { code: 'ur', voice: 'ur-PK', tts: false },
//     assamese: { code: 'as', voice: 'as-IN', tts: false },
//     sanskrit: { code: 'sa', voice: 'sa-IN', tts: false }
//   };

//   // Helper function to speak with fallback
//   const speakWithFallback = (text, options = {}) => {
//     try {
//       voiceService.speak(text, options);
//     } catch (error) {
//       console.log('Voice service speak failed, trying direct TTS');
//       // Try direct TTS as fallback
//       if (window.speechSynthesis) {
//         const utterance = new SpeechSynthesisUtterance(text);
//         utterance.rate = options.rate || 0.9;
//         utterance.pitch = options.pitch || 1.0;
//         utterance.volume = options.volume || 0.8;
        
//         const voices = window.speechSynthesis.getVoices();
//         if (voices.length > 0) {
//           utterance.voice = voices.find(v => v.default) || voices[0];
//         }
        
//         window.speechSynthesis.speak(utterance);
//       }
//     }
//   };

//   // Store component methods for voice control
//   const commands = {
//     // Navigation commands
//     'go to dashboard': () => {
//       speakWithFallback('Going back to dashboard');
//       componentRef.current?.handleBackToDashboard();
//     },
    
//     'dashboard': () => {
//       speakWithFallback('Going to dashboard');
//       componentRef.current?.handleBackToDashboard();
//     },
    
//     'logout': () => {
//       speakWithFallback('Logging out');
//       componentRef.current?.handleLogout();
//     },
    
//     'help': () => {
//       speakWithFallback('Say "start listening" then speak your text. Say "translate" to translate. Say "clear all" to clear.', { rate: 0.9 });
//     },
    
//     // Speech control commands
//     'start listening': () => {
//       const sourceLangName = componentRef.current?.languages[componentRef.current?.sourceLang]?.name || 'English';
//       speakWithFallback(`Listening for ${sourceLangName}. Please speak now.`, { rate: 0.9 });
//       componentRef.current?.startVoiceRecording();
//     },
    
//     'speak now': () => {
//       const sourceLangName = componentRef.current?.languages[componentRef.current?.sourceLang]?.name || 'English';
//       speakWithFallback(`I am listening for ${sourceLangName}. Please speak your text now.`, { rate: 0.9 });
//       componentRef.current?.startVoiceRecording();
//     },
    
//     'listen now': () => {
//       speakWithFallback('Ready to listen. Please speak.', { rate: 0.9 });
//       componentRef.current?.startVoiceRecording();
//     },
    
//     'continuous mode': () => {
//       speakWithFallback('Continuous mode toggled. Speak to add text continuously.', { rate: 0.9 });
//       componentRef.current?.toggleContinuousMode();
//     },
    
//     'stop': () => {
//       speakWithFallback('Stopped recording', { rate: 0.9 });
//       componentRef.current?.stopVoiceRecording();
//     },
    
//     'stop listening': () => {
//       speakWithFallback('Stopped listening', { rate: 0.9 });
//       componentRef.current?.stopVoiceRecording();
//     },
    
//     'cancel': () => {
//       speakWithFallback('Cancelled', { rate: 0.9 });
//       componentRef.current?.stopVoiceRecording();
//     },
    
//     // Translation commands
//     'translate': () => {
//       const text = componentRef.current?.getCurrentText();
//       const targetLangName = componentRef.current?.languages[componentRef.current?.targetLang]?.name || 'French';
      
//       if (text && text.trim()) {
//         speakWithFallback(`Translating to ${targetLangName}`, { rate: 0.9 });
//         componentRef.current?.handleTranslate(text);
//       } else {
//         speakWithFallback('Please say "start listening" first, then speak your text.', { rate: 0.9 });
//       }
//     },
    
//     'translate now': () => {
//       const text = componentRef.current?.getCurrentText();
//       if (text && text.trim()) {
//         speakWithFallback('Translating now', { rate: 0.9 });
//         componentRef.current?.handleTranslate(text);
//       } else {
//         speakWithFallback('No text to translate. Please speak some text first.', { rate: 0.9 });
//       }
//     },
    
//     // Speech output commands
//     'speak translation': () => {
//       if (componentRef.current?.translatedText) {
//         const targetLang = componentRef.current?.targetLang || 'fr';
//         const langInfo = componentRef.current?.languages[targetLang];
//         const canSpeak = langInfo?.tts !== false;
        
//         if (canSpeak) {
//           speakWithFallback('Speaking the translation', { rate: 0.9 });
//           componentRef.current?.speakText(componentRef.current.translatedText);
//         } else {
//           speakWithFallback(`Cannot speak ${langInfo?.name}. Text-to-speech not available for this language.`, { rate: 0.9 });
//         }
//       } else {
//         speakWithFallback('No translation available yet. Please translate first.', { rate: 0.9 });
//       }
//     },
    
//     'speak output': () => {
//       if (componentRef.current?.translatedText) {
//         const targetLang = componentRef.current?.targetLang || 'fr';
//         const langInfo = componentRef.current?.languages[targetLang];
//         const canSpeak = langInfo?.tts !== false;
        
//         if (canSpeak) {
//           speakWithFallback('Speaking the output', { rate: 0.9 });
//           componentRef.current?.speakText(componentRef.current.translatedText);
//         } else {
//           speakWithFallback(`Cannot speak ${langInfo?.name}. Text-to-speech not available.`, { rate: 0.9 });
//         }
//       } else {
//         speakWithFallback('No translation output available. Please translate first.', { rate: 0.9 });
//       }
//     },
    
//     'output': () => {
//       if (componentRef.current?.translatedText) {
//         const targetLang = componentRef.current?.targetLang || 'fr';
//         const langInfo = componentRef.current?.languages[targetLang];
//         const canSpeak = langInfo?.tts !== false;
        
//         if (canSpeak) {
//           speakWithFallback('Speaking output', { rate: 0.9 });
//           componentRef.current?.speakText(componentRef.current.translatedText);
//         } else {
//           speakWithFallback(`Cannot speak ${langInfo?.name}. Please use a different language for speech.`, { rate: 0.9 });
//         }
//       } else {
//         speakWithFallback('No output available. Please translate first.', { rate: 0.9 });
//       }
//     },
    
//     'translation': () => {
//       if (componentRef.current?.translatedText) {
//         const targetLang = componentRef.current?.targetLang || 'fr';
//         const langInfo = componentRef.current?.languages[targetLang];
//         const canSpeak = langInfo?.tts !== false;
        
//         if (canSpeak) {
//           speakWithFallback('Speaking translation', { rate: 0.9 });
//           componentRef.current?.speakText(componentRef.current.translatedText);
//         } else {
//           speakWithFallback(`Cannot speak ${langInfo?.name}. Try English, Spanish or French instead.`, { rate: 0.9 });
//         }
//       } else {
//         speakWithFallback('No translation available. Please translate first.', { rate: 0.9 });
//       }
//     },
    
//     'result': () => {
//       if (componentRef.current?.translatedText) {
//         const targetLang = componentRef.current?.targetLang || 'fr';
//         const langInfo = componentRef.current?.languages[targetLang];
//         const canSpeak = langInfo?.tts !== false;
        
//         if (canSpeak) {
//           speakWithFallback('Speaking result', { rate: 0.9 });
//           componentRef.current?.speakText(componentRef.current.translatedText);
//         } else {
//           speakWithFallback(`Cannot speak ${langInfo?.name}. Text-to-speech not supported.`, { rate: 0.9 });
//         }
//       } else {
//         speakWithFallback('No result available. Please translate first.', { rate: 0.9 });
//       }
//     },
    
//     'speak result': () => {
//       if (componentRef.current?.translatedText) {
//         const targetLang = componentRef.current?.targetLang || 'fr';
//         const langInfo = componentRef.current?.languages[targetLang];
//         const canSpeak = langInfo?.tts !== false;
        
//         if (canSpeak) {
//           speakWithFallback('Speaking result', { rate: 0.9 });
//           componentRef.current?.speakText(componentRef.current.translatedText);
//         } else {
//           speakWithFallback(`Cannot speak ${langInfo?.name}. Please select a language with speech support.`, { rate: 0.9 });
//         }
//       } else {
//         speakWithFallback('No result available. Please translate first.', { rate: 0.9 });
//       }
//     },
    
//     // Language swap
//     'swap languages': () => {
//       speakWithFallback('Swapping languages', { rate: 0.9 });
//       componentRef.current?.swapLanguages();
//     },
    
//     'swap language': () => {
//       speakWithFallback('Swapping languages', { rate: 0.9 });
//       componentRef.current?.swapLanguages();
//     },
    
//     // Clear commands
//     'clear all': () => {
//       speakWithFallback('Clearing all fields', { rate: 0.9 });
//       componentRef.current?.clearAll();
//     },
    
//     'clear': () => {
//       speakWithFallback('Clearing everything', { rate: 0.9 });
//       componentRef.current?.clearAll();
//     },
    
//     'clear input': () => {
//       speakWithFallback('Clearing input text', { rate: 0.9 });
//       componentRef.current?.clearInput();
//     },
    
//     'clear output': () => {
//       speakWithFallback('Clearing translation output', { rate: 0.9 });
//       componentRef.current?.clearOutput();
//     },
    
//     // Status check
//     'what can i say': () => {
//       const commandList = [
//         'First say "start listening" then speak your text',
//         'Then say "translate" to translate it',
//         'Say "speak translation" to hear the translation',
//         'Say "clear all" to clear everything',
//         'Say "english to hindi" to set languages',
//         'Say "continuous mode" to keep adding text',
//         'Say "swap languages" to swap source and target',
//         'Say "stop" to stop recording'
//       ];
//       speakWithFallback('Here are the main commands: ' + commandList.join('. '), { rate: 0.85 });
//     },
    
//     'show commands': () => {
//       const commandList = [
//         '"start listening" - Start voice input',
//         '"translate" - Translate current text',
//         '"speak translation" - Hear the translation',
//         '"clear all" - Clear everything',
//         '"english to [language]" - Set language pair',
//         '"continuous mode" - Continuous voice input',
//         '"stop" - Stop recording'
//       ];
//       speakWithFallback('Available commands: ' + commandList.join('. '), { rate: 0.85 });
//     },
    
//     // Language testing command
//     'test language': () => {
//       const sourceLang = componentRef.current?.sourceLang || 'en';
//       const targetLang = componentRef.current?.targetLang || 'fr';
//       const sourceName = componentRef.current?.languages[sourceLang]?.name || 'English';
//       const targetName = componentRef.current?.languages[targetLang]?.name || 'French';
      
//       speakWithFallback(`Current settings: ${sourceName} to ${targetName}. Recognition language is set to ${sourceName}.`, { rate: 0.9 });
//     }
//   };

//   // Generate language pair commands
//   const generateLanguagePairCommands = () => {
//     const languagePairs = {};
    
//     Object.keys(langMap).forEach(fromLang => {
//       Object.keys(langMap).forEach(toLang => {
//         if (fromLang !== toLang) {
//           const commandKey = `${fromLang} to ${toLang}`;
//           languagePairs[commandKey] = () => {
//             const fromLangInfo = langMap[fromLang];
//             const toLangInfo = langMap[toLang];
            
//             speakWithFallback(`Setting ${fromLang} to ${toLang}`, { rate: 0.9 });
            
//             // Set source language
//             componentRef.current?.setSourceLang(fromLangInfo.code);
            
//             // Set target language
//             componentRef.current?.setTargetLang(toLangInfo.code);
            
//             // Update status
//             componentRef.current?.setStatusMessage(`Set to ${fromLang} → ${toLang}`);
            
//             // IMPORTANT: Force immediate update of recognition language
//             setTimeout(() => {
//               if (componentRef.current?.updateRecognitionLanguage) {
//                 componentRef.current.updateRecognitionLanguage();
//               }
//             }, 100);
            
//             // Auto-translate if there's text
//             const text = componentRef.current?.getCurrentText();
//             if (text && text.trim()) {
//               setTimeout(() => {
//                 if (componentRef.current?.handleTranslate) {
//                   componentRef.current.handleTranslate(text);
//                 }
//               }, 500);
//             }
//           };
//         }
//       });
//     });
    
//     return languagePairs;
//   };

//   // Generate "select X" commands
//   const generateSelectCommands = () => {
//     const selectCommands = {};
    
//     Object.keys(langMap).forEach(lang => {
//       const langInfo = langMap[lang];
      
//       selectCommands[`select ${lang}`] = () => {
//         speakWithFallback(`Selecting ${lang} as target`, { rate: 0.9 });
//         componentRef.current?.setTargetLang(langInfo.code);
//         componentRef.current?.setStatusMessage(`Target set to ${lang}`);
        
//         // Auto-translate if there's text
//         const text = componentRef.current?.getCurrentText();
//         if (text && text.trim()) {
//           setTimeout(() => componentRef.current?.handleTranslate(text), 500);
//         }
//       };
      
//       // "use [language]" as source
//       selectCommands[`use ${lang}`] = () => {
//         speakWithFallback(`Using ${lang} as source`, { rate: 0.9 });
//         componentRef.current?.setSourceLang(langInfo.code);
//         componentRef.current?.setStatusMessage(`Source set to ${lang}`);
        
//         // Force update recognition language immediately
//         setTimeout(() => {
//           if (componentRef.current?.updateRecognitionLanguage) {
//             componentRef.current.updateRecognitionLanguage();
//           }
//         }, 100);
//       };
//     });
    
//     return selectCommands;
//   };

//   // Combine all commands
//   const allCommands = {
//     ...commands,
//     ...generateLanguagePairCommands(),
//     ...generateSelectCommands()
//   };

//   // Register all commands
//   Object.entries(allCommands).forEach(([pattern, handler]) => {
//     voiceService.registerCommand(pattern, handler);
//   });

//   // Dynamic translate to specific language
//   voiceService.registerDynamicHandler(
//     /translate to (english|telugu|hindi|tamil|kannada|malayalam|marathi|gujarati|bengali|punjabi|odia|spanish|french|german|italian|portuguese|russian|japanese|korean|chinese|arabic|urdu|assamese|sanskrit)/i,
//     (matches) => {
//       const lang = matches[0].toLowerCase();
//       if (langMap[lang]) {
//         speakWithFallback(`Translating to ${lang}`, { rate: 0.9 });
//         componentRef.current?.setTargetLang(langMap[lang].code);
//         componentRef.current?.setStatusMessage(`Translating to ${lang}`);
        
//         const text = componentRef.current?.getCurrentText();
//         if (text && text.trim()) {
//           setTimeout(() => componentRef.current?.handleTranslate(text), 500);
//         }
//       }
//     }
//   );

//   // Dynamic language selection
//   voiceService.registerDynamicHandler(
//     /(select|use) (english|telugu|hindi|tamil|kannada|malayalam|marathi|gujarati|bengali|punjabi|odia|spanish|french|german|italian|portuguese|russian|japanese|korean|chinese|arabic|urdu|assamese|sanskrit)/i,
//     (matches) => {
//       const action = matches[0].toLowerCase();
//       const lang = matches[1].toLowerCase();
      
//       if (langMap[lang]) {
//         if (action === 'select') {
//           speakWithFallback(`Selecting ${lang} as target`, { rate: 0.9 });
//           componentRef.current?.setTargetLang(langMap[lang].code);
//           componentRef.current?.setStatusMessage(`Target set to ${lang}`);
//         } else if (action === 'use') {
//           speakWithFallback(`Using ${lang} as source`, { rate: 0.9 });
//           componentRef.current?.setSourceLang(langMap[lang].code);
//           componentRef.current?.setStatusMessage(`Source set to ${lang}`);
          
//           // Force update recognition language
//           setTimeout(() => {
//             if (componentRef.current?.updateRecognitionLanguage) {
//               componentRef.current.updateRecognitionLanguage();
//             }
//           }, 100);
//         }
        
//         const text = componentRef.current?.getCurrentText();
//         if (text && text.trim()) {
//           setTimeout(() => componentRef.current?.handleTranslate(text), 500);
//         }
//       }
//     }
//   );

//   // Dynamic "X to Y" pattern
//   voiceService.registerDynamicHandler(
//     /(?:translate from |set |change to |)(english|telugu|hindi|tamil|kannada|malayalam|marathi|gujarati|bengali|punjabi|odia|spanish|french|german|italian|portuguese|russian|japanese|korean|chinese|arabic|urdu|assamese|sanskrit) (?:to|into|in) (english|telugu|hindi|tamil|kannada|malayalam|marathi|gujarati|bengali|punjabi|odia|spanish|french|german|italian|portuguese|russian|japanese|korean|chinese|arabic|urdu|assamese|sanskrit)/i,
//     (matches) => {
//       const fromLang = matches[0].toLowerCase();
//       const toLang = matches[1].toLowerCase();
      
//       if (langMap[fromLang] && langMap[toLang]) {
//         speakWithFallback(`Setting ${fromLang} to ${toLang}`, { rate: 0.9 });
//         componentRef.current?.setSourceLang(langMap[fromLang].code);
//         componentRef.current?.setTargetLang(langMap[toLang].code);
//         componentRef.current?.setStatusMessage(`Set to ${fromLang} → ${toLang}`);
        
//         // Force update recognition language
//         setTimeout(() => {
//           if (componentRef.current?.updateRecognitionLanguage) {
//             componentRef.current.updateRecognitionLanguage();
//           }
//         }, 100);
        
//         const text = componentRef.current?.getCurrentText();
//         if (text && text.trim()) {
//           setTimeout(() => componentRef.current?.handleTranslate(text), 500);
//         }
//       }
//     }
//   );

//   // Store original processCommand
//   const originalProcessCommand = voiceService.processCommand.bind(voiceService);
  
//   voiceService.processCommand = function(transcript) {
//     console.log(`[VoiceService/${this.currentFeature}] Processing: "${transcript}"`);
    
//     let commandProcessed = false;
    
//     // 1. First check for exact match
//     if (this.commands.has(transcript)) {
//       console.log(`[VoiceService] Exact match found: "${transcript}"`);
//       try {
//         this.commands.get(transcript)();
//         commandProcessed = true;
//       } catch (error) {
//         console.error(`[VoiceService] Error executing command "${transcript}":`, error);
//       }
//     }
    
//     // 2. If no exact match, try dynamic handlers
//     if (!commandProcessed) {
//       commandProcessed = this.handleDynamicCommand(transcript);
//     }
    
//     // 3. If still no match, try fuzzy matching
//     if (!commandProcessed) {
//       const lowerTranscript = transcript.toLowerCase();
      
//       // Check for output/speak commands
//       if ((lowerTranscript.includes('speak') && 
//            (lowerTranscript.includes('output') || 
//             lowerTranscript.includes('translation') || 
//             lowerTranscript.includes('result'))) ||
//           lowerTranscript === 'output' || 
//           lowerTranscript === 'translation' || 
//           lowerTranscript === 'result') {
        
//         console.log(`[VoiceService] Fuzzy matched speak output command: "${transcript}"`);
//         if (componentRef.current?.translatedText) {
//           const targetLang = componentRef.current?.targetLang || 'fr';
//           const langInfo = componentRef.current?.languages[targetLang];
//           const canSpeak = langInfo?.tts !== false;
          
//           if (canSpeak) {
//             speakWithFallback('Speaking translation', { rate: 0.9 });
//             componentRef.current?.speakText(componentRef.current.translatedText);
//           } else {
//             speakWithFallback(`Cannot speak ${langInfo?.name}. Try a different language.`, { rate: 0.9 });
//           }
//         } else {
//           speakWithFallback('No translation available yet. Please translate first.', { rate: 0.9 });
//         }
//         commandProcessed = true;
//       }
      
//       // Try language change commands
//       if (!commandProcessed && lowerTranscript.includes(' to ')) {
//         const parts = lowerTranscript.split(' to ');
//         if (parts.length === 2) {
//           const fromPart = parts[0].trim();
//           const toPart = parts[1].trim();
          
//           // Find matching languages
//           const fromLangKey = Object.keys(langMap).find(lang => 
//             lang.includes(fromPart) || fromPart.includes(lang)
//           );
//           const toLangKey = Object.keys(langMap).find(lang => 
//             lang.includes(toPart) || toPart.includes(lang)
//           );
          
//           if (fromLangKey && toLangKey) {
//             console.log(`[VoiceService] Fuzzy matched: ${fromLangKey} to ${toLangKey}`);
//             speakWithFallback(`Setting ${fromLangKey} to ${toLangKey}`, { rate: 0.9 });
//             componentRef.current?.setSourceLang(langMap[fromLangKey].code);
//             componentRef.current?.setTargetLang(langMap[toLangKey].code);
//             componentRef.current?.setStatusMessage(`Set to ${fromLangKey} → ${toLangKey}`);
            
//             // Force update recognition language
//             setTimeout(() => {
//               if (componentRef.current?.updateRecognitionLanguage) {
//                 componentRef.current.updateRecognitionLanguage();
//               }
//             }, 100);
            
//             const text = componentRef.current?.getCurrentText();
//             if (text && text.trim()) {
//               setTimeout(() => componentRef.current?.handleTranslate(text), 500);
//             }
//             commandProcessed = true;
//           }
//         }
//       }
//     }
    
//     // 4. If no command was processed, call the general callback
//     if (!commandProcessed) {
//       console.log(`[VoiceService] No command matched for: "${transcript}"`);
//       if (this.onResultCallback) {
//         console.log(`[VoiceService] Calling general callback for: "${transcript}"`);
//         this.onResultCallback(transcript);
//       }
//     } else {
//       console.log(`[VoiceService] Command successfully processed: "${transcript}"`);
//     }
//   };

//   return () => {
//     // Cleanup function
//     voiceService.clearCommands();
//     voiceService.clearDynamicHandlers();
//     // Restore original processCommand
//     voiceService.processCommand = originalProcessCommand;
//   };
// };


// src/voice-commands/languageTranslatorCommands.js - FIXED VERSION
import { voiceService } from '../services/voiceService';

export const initializeLanguageTranslatorCommands = (componentRef) => {
  // Clear previous commands for this component
  voiceService.clearDynamicHandlers();
  
  // Store original commands for restoration
  const originalCommands = new Map(voiceService.commands);
  
  // All language mappings with proper voice support
  const langMap = {
    english: { code: 'en', voice: 'en-US', tts: true },
    telugu: { code: 'te', voice: 'te-IN', tts: false },
    hindi: { code: 'hi', voice: 'hi-IN', tts: false },
    tamil: { code: 'ta', voice: 'ta-IN', tts: false },
    kannada: { code: 'kn', voice: 'kn-IN', tts: false },
    malayalam: { code: 'ml', voice: 'ml-IN', tts: false },
    marathi: { code: 'mr', voice: 'mr-IN', tts: false },
    gujarati: { code: 'gu', voice: 'gu-IN', tts: false },
    bengali: { code: 'bn', voice: 'bn-IN', tts: false },
    punjabi: { code: 'pa', voice: 'pa-IN', tts: false },
    odia: { code: 'or', voice: 'or-IN', tts: false },
    spanish: { code: 'es', voice: 'es-ES', tts: true },
    french: { code: 'fr', voice: 'fr-FR', tts: true },
    german: { code: 'de', voice: 'de-DE', tts: true },
    italian: { code: 'it', voice: 'it-IT', tts: true },
    portuguese: { code: 'pt', voice: 'pt-PT', tts: true },
    russian: { code: 'ru', voice: 'ru-RU', tts: true },
    japanese: { code: 'ja', voice: 'ja-JP', tts: true },
    korean: { code: 'ko', voice: 'ko-KR', tts: true },
    chinese: { code: 'zh', voice: 'zh-CN', tts: true },
    arabic: { code: 'ar', voice: 'ar-SA', tts: true },
    urdu: { code: 'ur', voice: 'ur-PK', tts: false },
    assamese: { code: 'as', voice: 'as-IN', tts: false },
    sanskrit: { code: 'sa', voice: 'sa-IN', tts: false }
  };

  // Helper function to speak with fallback
  const speakWithFallback = (text, options = {}) => {
    try {
      voiceService.speak(text, options);
    } catch (error) {
      console.log('Voice service speak failed, trying direct TTS');
      if (window.speechSynthesis) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = options.rate || 0.9;
        utterance.pitch = options.pitch || 1.0;
        utterance.volume = options.volume || 0.8;
        
        const voices = window.speechSynthesis.getVoices();
        if (voices.length > 0) {
          utterance.voice = voices.find(v => v.default) || voices[0];
        }
        
        window.speechSynthesis.speak(utterance);
      }
    }
  };

  // Store component methods for voice control
  const commands = {
    // Navigation commands
    'go to dashboard': () => {
      speakWithFallback('Going back to dashboard');
      componentRef.current?.handleBackToDashboard();
    },
    
    'dashboard': () => {
      speakWithFallback('Going to dashboard');
      componentRef.current?.handleBackToDashboard();
    },
    
    'logout': () => {
      speakWithFallback('Logging out');
      componentRef.current?.handleLogout();
    },
    
    'help': () => {
      speakWithFallback('Say "start listening" then speak your text. Say "translate" to translate. Say "clear all" to clear.', { rate: 0.9 });
    },
    
    // Speech control commands - UPDATED
    'start listening': () => {
      const sourceLangName = componentRef.current?.languages[componentRef.current?.sourceLang]?.name || 'English';
      speakWithFallback(`Listening for ${sourceLangName}. Please speak now.`, { rate: 0.9 });
      
      // IMPORTANT: Set voice input mode
      componentRef.current?.setVoiceInputMode(true);
      
      // Clear all commands temporarily
      voiceService.commands.clear();
      voiceService.dynamicHandlers = [];
      
      // Set up special input mode callback
      voiceService.onResultCallback = (transcript) => {
        console.log('🎤 Voice input detected:', transcript);
        
        // Check for stop commands
        const lowerTranscript = transcript.toLowerCase();
        if (lowerTranscript.includes('stop') || 
            lowerTranscript.includes('cancel') || 
            lowerTranscript.includes('done')) {
          componentRef.current?.stopVoiceRecording();
          return;
        }
        
        // Process as text input
        componentRef.current?.handleVoiceInput(transcript);
      };
      
      componentRef.current?.setStatusMessage(`🎤 Listening for ${sourceLangName}... Speak now`);
    },
    
    'speak now': () => {
      const sourceLangName = componentRef.current?.languages[componentRef.current?.sourceLang]?.name || 'English';
      speakWithFallback(`I am listening for ${sourceLangName}. Please speak your text now.`, { rate: 0.9 });
      componentRef.current?.setVoiceInputMode(true);
      
      voiceService.commands.clear();
      voiceService.dynamicHandlers = [];
      
      voiceService.onResultCallback = (transcript) => {
        const lowerTranscript = transcript.toLowerCase();
        if (lowerTranscript.includes('stop') || lowerTranscript.includes('cancel')) {
          componentRef.current?.stopVoiceRecording();
          return;
        }
        componentRef.current?.handleVoiceInput(transcript);
      };
    },
    
    'listen now': () => {
      speakWithFallback('Ready to listen. Please speak.', { rate: 0.9 });
      componentRef.current?.setVoiceInputMode(true);
      
      voiceService.commands.clear();
      voiceService.dynamicHandlers = [];
      
      voiceService.onResultCallback = (transcript) => {
        const lowerTranscript = transcript.toLowerCase();
        if (lowerTranscript.includes('stop') || lowerTranscript.includes('cancel')) {
          componentRef.current?.stopVoiceRecording();
          return;
        }
        componentRef.current?.handleVoiceInput(transcript);
      };
    },
    
    'continuous mode': () => {
      const isContinuous = componentRef.current?.toggleContinuousMode?.();
      speakWithFallback(`Continuous mode ${isContinuous ? 'enabled' : 'disabled'}.`, { rate: 0.9 });
    },
    
    'stop': () => {
      speakWithFallback('Stopped recording', { rate: 0.9 });
      componentRef.current?.stopVoiceRecording();
    },
    
    'stop listening': () => {
      speakWithFallback('Stopped listening', { rate: 0.9 });
      componentRef.current?.stopVoiceRecording();
    },
    
    'cancel': () => {
      speakWithFallback('Cancelled', { rate: 0.9 });
      componentRef.current?.stopVoiceRecording();
    },
    
    // Translation commands
    'translate': () => {
      const text = componentRef.current?.getCurrentText?.();
      const targetLangName = componentRef.current?.languages[componentRef.current?.targetLang]?.name || 'French';
      
      if (text && text.trim()) {
        speakWithFallback(`Translating to ${targetLangName}`, { rate: 0.9 });
        componentRef.current?.handleTranslate?.(text);
      } else {
        speakWithFallback('Please say "start listening" first, then speak your text.', { rate: 0.9 });
      }
    },
    
    'translate now': () => {
      const text = componentRef.current?.getCurrentText?.();
      if (text && text.trim()) {
        speakWithFallback('Translating now', { rate: 0.9 });
        componentRef.current?.handleTranslate?.(text);
      } else {
        speakWithFallback('No text to translate. Please speak some text first.', { rate: 0.9 });
      }
    },
    
    // Speech output commands
    'speak translation': () => {
      if (componentRef.current?.translatedText) {
        const targetLang = componentRef.current?.targetLang || 'fr';
        const langInfo = componentRef.current?.languages[targetLang];
        const canSpeak = langInfo?.tts !== false;
        
        if (canSpeak) {
          speakWithFallback('Speaking the translation', { rate: 0.9 });
          componentRef.current?.speakText?.(componentRef.current.translatedText);
        } else {
          speakWithFallback(`Cannot speak ${langInfo?.name}. Text-to-speech not available for this language.`, { rate: 0.9 });
        }
      } else {
        speakWithFallback('No translation available yet. Please translate first.', { rate: 0.9 });
      }
    },
    
    'speak output': () => {
      if (componentRef.current?.translatedText) {
        speakWithFallback('Speaking the output', { rate: 0.9 });
        componentRef.current?.speakText?.(componentRef.current.translatedText);
      } else {
        speakWithFallback('No translation output available. Please translate first.', { rate: 0.9 });
      }
    },
    
    'output': () => {
      if (componentRef.current?.translatedText) {
        const targetLang = componentRef.current?.targetLang || 'fr';
        const langInfo = componentRef.current?.languages[targetLang];
        const canSpeak = langInfo?.tts !== false;
        
        if (canSpeak) {
          speakWithFallback('Speaking output', { rate: 0.9 });
          componentRef.current?.speakText?.(componentRef.current.translatedText);
        } else {
          speakWithFallback(`Cannot speak ${langInfo?.name}. Please use a different language for speech.`, { rate: 0.9 });
        }
      } else {
        speakWithFallback('No output available. Please translate first.', { rate: 0.9 });
      }
    },
    
    'translation': () => {
      if (componentRef.current?.translatedText) {
        speakWithFallback('Speaking translation', { rate: 0.9 });
        componentRef.current?.speakText?.(componentRef.current.translatedText);
      } else {
        speakWithFallback('No translation available. Please translate first.', { rate: 0.9 });
      }
    },
    
    'result': () => {
      if (componentRef.current?.translatedText) {
        speakWithFallback('Speaking result', { rate: 0.9 });
        componentRef.current?.speakText?.(componentRef.current.translatedText);
      } else {
        speakWithFallback('No result available. Please translate first.', { rate: 0.9 });
      }
    },
    
    'speak result': () => {
      if (componentRef.current?.translatedText) {
        speakWithFallback('Speaking result', { rate: 0.9 });
        componentRef.current?.speakText?.(componentRef.current.translatedText);
      } else {
        speakWithFallback('No result available. Please translate first.', { rate: 0.9 });
      }
    },
    
    // Language swap
    'swap languages': () => {
      speakWithFallback('Swapping languages', { rate: 0.9 });
      componentRef.current?.swapLanguages?.();
    },
    
    'swap language': () => {
      speakWithFallback('Swapping languages', { rate: 0.9 });
      componentRef.current?.swapLanguages?.();
    },
    
    // Clear commands
    'clear all': () => {
      speakWithFallback('Clearing all fields', { rate: 0.9 });
      componentRef.current?.clearAll?.();
    },
    
    'clear': () => {
      speakWithFallback('Clearing everything', { rate: 0.9 });
      componentRef.current?.clearAll?.();
    },
    
    'clear input': () => {
      speakWithFallback('Clearing input text', { rate: 0.9 });
      componentRef.current?.clearInput?.();
    },
    
    'clear output': () => {
      speakWithFallback('Clearing translation output', { rate: 0.9 });
      componentRef.current?.clearOutput?.();
    },
    
    // Status check
    'what can i say': () => {
      const commandList = [
        'First say "start listening" then speak your text',
        'Then say "translate" to translate it',
        'Say "speak translation" to hear the translation',
        'Say "clear all" to clear everything',
        'Say "english to hindi" to set languages',
        'Say "continuous mode" to keep adding text',
        'Say "swap languages" to swap source and target',
        'Say "stop" to stop recording'
      ];
      speakWithFallback('Here are the main commands: ' + commandList.join('. '), { rate: 0.85 });
    },
    
    'show commands': () => {
      const commandList = [
        '"start listening" - Start voice input',
        '"translate" - Translate current text',
        '"speak translation" - Hear the translation',
        '"clear all" - Clear everything',
        '"english to [language]" - Set language pair',
        '"continuous mode" - Continuous voice input',
        '"stop" - Stop recording'
      ];
      speakWithFallback('Available commands: ' + commandList.join('. '), { rate: 0.85 });
    },
    
    // Language testing command
    'test language': () => {
      const sourceLang = componentRef.current?.sourceLang || 'en';
      const targetLang = componentRef.current?.targetLang || 'fr';
      const sourceName = componentRef.current?.languages[sourceLang]?.name || 'English';
      const targetName = componentRef.current?.languages[targetLang]?.name || 'French';
      
      speakWithFallback(`Current settings: ${sourceName} to ${targetName}. Recognition language is set to ${sourceName}.`, { rate: 0.9 });
    }
  };

  // Generate language pair commands
  const generateLanguagePairCommands = () => {
    const languagePairs = {};
    
    Object.keys(langMap).forEach(fromLang => {
      Object.keys(langMap).forEach(toLang => {
        if (fromLang !== toLang) {
          const commandKey = `${fromLang} to ${toLang}`;
          languagePairs[commandKey] = () => {
            const fromLangInfo = langMap[fromLang];
            const toLangInfo = langMap[toLang];
            
            speakWithFallback(`Setting ${fromLang} to ${toLang}`, { rate: 0.9 });
            
            // Set source language
            componentRef.current?.setSourceLang?.(fromLangInfo.code);
            
            // Set target language
            componentRef.current?.setTargetLang?.(toLangInfo.code);
            
            // Update status
            componentRef.current?.setStatusMessage?.(`Set to ${fromLang} → ${toLang}`);
            
            // Auto-translate if there's text
            const text = componentRef.current?.getCurrentText?.();
            if (text && text.trim()) {
              setTimeout(() => {
                componentRef.current?.handleTranslate?.(text);
              }, 500);
            }
          };
        }
      });
    });
    
    return languagePairs;
  };

  // Generate "select X" commands
  const generateSelectCommands = () => {
    const selectCommands = {};
    
    Object.keys(langMap).forEach(lang => {
      const langInfo = langMap[lang];
      
      selectCommands[`select ${lang}`] = () => {
        speakWithFallback(`Selecting ${lang} as target`, { rate: 0.9 });
        componentRef.current?.setTargetLang?.(langInfo.code);
        componentRef.current?.setStatusMessage?.(`Target set to ${lang}`);
        
        // Auto-translate if there's text
        const text = componentRef.current?.getCurrentText?.();
        if (text && text.trim()) {
          setTimeout(() => componentRef.current?.handleTranslate?.(text), 500);
        }
      };
      
      // "use [language]" as source
      selectCommands[`use ${lang}`] = () => {
        speakWithFallback(`Using ${lang} as source`, { rate: 0.9 });
        componentRef.current?.setSourceLang?.(langInfo.code);
        componentRef.current?.setStatusMessage?.(`Source set to ${lang}`);
      };
    });
    
    return selectCommands;
  };

  // Combine all commands
  const allCommands = {
    ...commands,
    ...generateLanguagePairCommands(),
    ...generateSelectCommands()
  };

  // Register all commands
  Object.entries(allCommands).forEach(([pattern, handler]) => {
    voiceService.registerCommand(pattern, handler);
  });

  // Dynamic translate to specific language
  voiceService.registerDynamicHandler(
    /translate to (english|telugu|hindi|tamil|kannada|malayalam|marathi|gujarati|bengali|punjabi|odia|spanish|french|german|italian|portuguese|russian|japanese|korean|chinese|arabic|urdu|assamese|sanskrit)/i,
    (matches) => {
      const lang = matches[0].toLowerCase();
      if (langMap[lang]) {
        speakWithFallback(`Translating to ${lang}`, { rate: 0.9 });
        componentRef.current?.setTargetLang?.(langMap[lang].code);
        componentRef.current?.setStatusMessage?.(`Translating to ${lang}`);
        
        const text = componentRef.current?.getCurrentText?.();
        if (text && text.trim()) {
          setTimeout(() => componentRef.current?.handleTranslate?.(text), 500);
        }
      }
    }
  );

  // Dynamic language selection
  voiceService.registerDynamicHandler(
    /(select|use) (english|telugu|hindi|tamil|kannada|malayalam|marathi|gujarati|bengali|punjabi|odia|spanish|french|german|italian|portuguese|russian|japanese|korean|chinese|arabic|urdu|assamese|sanskrit)/i,
    (matches) => {
      const action = matches[0].toLowerCase();
      const lang = matches[1].toLowerCase();
      
      if (langMap[lang]) {
        if (action === 'select') {
          speakWithFallback(`Selecting ${lang} as target`, { rate: 0.9 });
          componentRef.current?.setTargetLang?.(langMap[lang].code);
          componentRef.current?.setStatusMessage?.(`Target set to ${lang}`);
        } else if (action === 'use') {
          speakWithFallback(`Using ${lang} as source`, { rate: 0.9 });
          componentRef.current?.setSourceLang?.(langMap[lang].code);
          componentRef.current?.setStatusMessage?.(`Source set to ${lang}`);
        }
        
        const text = componentRef.current?.getCurrentText?.();
        if (text && text.trim()) {
          setTimeout(() => componentRef.current?.handleTranslate?.(text), 500);
        }
      }
    }
  );

  // Dynamic "X to Y" pattern
  voiceService.registerDynamicHandler(
    /(?:translate from |set |change to |)(english|telugu|hindi|tamil|kannada|malayalam|marathi|gujarati|bengali|punjabi|odia|spanish|french|german|italian|portuguese|russian|japanese|korean|chinese|arabic|urdu|assamese|sanskrit) (?:to|into|in) (english|telugu|hindi|tamil|kannada|malayalam|marathi|gujarati|bengali|punjabi|odia|spanish|french|german|italian|portuguese|russian|japanese|korean|chinese|arabic|urdu|assamese|sanskrit)/i,
    (matches) => {
      const fromLang = matches[0].toLowerCase();
      const toLang = matches[1].toLowerCase();
      
      if (langMap[fromLang] && langMap[toLang]) {
        speakWithFallback(`Setting ${fromLang} to ${toLang}`, { rate: 0.9 });
        componentRef.current?.setSourceLang?.(langMap[fromLang].code);
        componentRef.current?.setTargetLang?.(langMap[toLang].code);
        componentRef.current?.setStatusMessage?.(`Set to ${fromLang} → ${toLang}`);
        
        const text = componentRef.current?.getCurrentText?.();
        if (text && text.trim()) {
          setTimeout(() => componentRef.current?.handleTranslate?.(text), 500);
        }
      }
    }
  );

  // Store original processCommand
  const originalProcessCommand = voiceService.processCommand.bind(voiceService);
  
  voiceService.processCommand = function(transcript) {
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
    
    // 3. If still no match, try fuzzy matching
    if (!commandProcessed) {
      const lowerTranscript = transcript.toLowerCase();
      
      // Check for output/speak commands
      if ((lowerTranscript.includes('speak') && 
           (lowerTranscript.includes('output') || 
            lowerTranscript.includes('translation') || 
            lowerTranscript.includes('result'))) ||
          lowerTranscript === 'output' || 
          lowerTranscript === 'translation' || 
          lowerTranscript === 'result') {
        
        console.log(`[VoiceService] Fuzzy matched speak output command: "${transcript}"`);
        if (componentRef.current?.translatedText) {
          const targetLang = componentRef.current?.targetLang || 'fr';
          const langInfo = componentRef.current?.languages[targetLang];
          const canSpeak = langInfo?.tts !== false;
          
          if (canSpeak) {
            speakWithFallback('Speaking translation', { rate: 0.9 });
            componentRef.current?.speakText?.(componentRef.current.translatedText);
          } else {
            speakWithFallback(`Cannot speak ${langInfo?.name}. Try a different language.`, { rate: 0.9 });
          }
        } else {
          speakWithFallback('No translation available yet. Please translate first.', { rate: 0.9 });
        }
        commandProcessed = true;
      }
      
      // Try language change commands
      if (!commandProcessed && lowerTranscript.includes(' to ')) {
        const parts = lowerTranscript.split(' to ');
        if (parts.length === 2) {
          const fromPart = parts[0].trim();
          const toPart = parts[1].trim();
          
          // Find matching languages
          const fromLangKey = Object.keys(langMap).find(lang => 
            lang.includes(fromPart) || fromPart.includes(lang)
          );
          const toLangKey = Object.keys(langMap).find(lang => 
            lang.includes(toPart) || toPart.includes(lang)
          );
          
          if (fromLangKey && toLangKey) {
            console.log(`[VoiceService] Fuzzy matched: ${fromLangKey} to ${toLangKey}`);
            speakWithFallback(`Setting ${fromLangKey} to ${toLangKey}`, { rate: 0.9 });
            componentRef.current?.setSourceLang?.(langMap[fromLangKey].code);
            componentRef.current?.setTargetLang?.(langMap[toLangKey].code);
            componentRef.current?.setStatusMessage?.(`Set to ${fromLangKey} → ${toLangKey}`);
            
            const text = componentRef.current?.getCurrentText?.();
            if (text && text.trim()) {
              setTimeout(() => componentRef.current?.handleTranslate?.(text), 500);
            }
            commandProcessed = true;
          }
        }
      }
    }
    
    // 4. If no command was processed and we're not in voice input mode, call the general callback
    if (!commandProcessed) {
      console.log(`[VoiceService] No command matched for: "${transcript}"`);
      if (this.onResultCallback) {
        console.log(`[VoiceService] Calling general callback for: "${transcript}"`);
        this.onResultCallback(transcript);
      }
    } else {
      console.log(`[VoiceService] Command successfully processed: "${transcript}"`);
    }
  };

  return () => {
    // Cleanup function
    voiceService.clearCommands();
    voiceService.clearDynamicHandlers();
    // Restore original processCommand
    voiceService.processCommand = originalProcessCommand;
    // Restore original commands
    originalCommands.forEach((handler, pattern) => {
      voiceService.registerCommand(pattern, handler);
    });
  };
};