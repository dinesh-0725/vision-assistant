



// // // // // // // // // // // // // // // // // LanguageTranslator.jsx - MULTI-LANGUAGE VERSION
// // // // // // // // // // // // // // // // import React, { useState, useEffect, useRef } from 'react';
// // // // // // // // // // // // // // // // import { useNavigate } from 'react-router-dom';
// // // // // // // // // // // // // // // // import './LanguageTranslator.css';

// // // // // // // // // // // // // // // // const LanguageTranslator = () => {
// // // // // // // // // // // // // // // //   const navigate = useNavigate();
  
// // // // // // // // // // // // // // // //   // State declarations
// // // // // // // // // // // // // // // //   const [isListening, setIsListening] = useState(false);
// // // // // // // // // // // // // // // //   const [transcript, setTranscript] = useState('');
// // // // // // // // // // // // // // // //   const [translatedText, setTranslatedText] = useState('');
// // // // // // // // // // // // // // // //   const [isTranslating, setIsTranslating] = useState(false);
// // // // // // // // // // // // // // // //   const [error, setError] = useState('');
// // // // // // // // // // // // // // // //   const [isSpeaking, setIsSpeaking] = useState(false);
// // // // // // // // // // // // // // // //   const [sourceLang, setSourceLang] = useState('en');
// // // // // // // // // // // // // // // //   const [targetLang, setTargetLang] = useState('te');
// // // // // // // // // // // // // // // //   const [recognitionSupported, setRecognitionSupported] = useState(true);
// // // // // // // // // // // // // // // //   const [statusMessage, setStatusMessage] = useState('Ready to translate');
// // // // // // // // // // // // // // // //   const [isPasteMode, setIsPasteMode] = useState(false);
// // // // // // // // // // // // // // // //   const [pasteText, setPasteText] = useState('');
// // // // // // // // // // // // // // // //   const [apiStatus, setApiStatus] = useState('✅ API Ready');
// // // // // // // // // // // // // // // //   const [recentTranslations, setRecentTranslations] = useState([]);
// // // // // // // // // // // // // // // //   const [detectedLanguage, setDetectedLanguage] = useState('');
  
// // // // // // // // // // // // // // // //   // Refs
// // // // // // // // // // // // // // // //   const recognitionRef = useRef(null);
// // // // // // // // // // // // // // // //   const synthesisRef = useRef(null);
// // // // // // // // // // // // // // // //   const textareaRef = useRef(null);
  
// // // // // // // // // // // // // // // //   // ✅ EXTENDED LANGUAGE SUPPORT (15+ languages)
// // // // // // // // // // // // // // // //   const languages = {
// // // // // // // // // // // // // // // //     // Indian Languages
// // // // // // // // // // // // // // // //     en: { code: 'en', name: 'English', nativeName: 'English', voice: 'en-US', flag: '🇺🇸' },
// // // // // // // // // // // // // // // //     te: { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', voice: 'te-IN', flag: '🇮🇳' },
// // // // // // // // // // // // // // // //     hi: { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', voice: 'hi-IN', flag: '🇮🇳' },
// // // // // // // // // // // // // // // //     ta: { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', voice: 'ta-IN', flag: '🇮🇳' },
// // // // // // // // // // // // // // // //     kn: { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', voice: 'kn-IN', flag: '🇮🇳' },
// // // // // // // // // // // // // // // //     ml: { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', voice: 'ml-IN', flag: '🇮🇳' },
// // // // // // // // // // // // // // // //     mr: { code: 'mr', name: 'Marathi', nativeName: 'मराठी', voice: 'mr-IN', flag: '🇮🇳' },
// // // // // // // // // // // // // // // //     gu: { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', voice: 'gu-IN', flag: '🇮🇳' },
// // // // // // // // // // // // // // // //     bn: { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', voice: 'bn-IN', flag: '🇮🇳' },
// // // // // // // // // // // // // // // //     pa: { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', voice: 'pa-IN', flag: '🇮🇳' },
// // // // // // // // // // // // // // // //     or: { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ', voice: 'or-IN', flag: '🇮🇳' },
    
// // // // // // // // // // // // // // // //     // International Languages
// // // // // // // // // // // // // // // //     es: { code: 'es', name: 'Spanish', nativeName: 'Español', voice: 'es-ES', flag: '🇪🇸' },
// // // // // // // // // // // // // // // //     fr: { code: 'fr', name: 'French', nativeName: 'Français', voice: 'fr-FR', flag: '🇫🇷' },
// // // // // // // // // // // // // // // //     de: { code: 'de', name: 'German', nativeName: 'Deutsch', voice: 'de-DE', flag: '🇩🇪' },
// // // // // // // // // // // // // // // //     it: { code: 'it', name: 'Italian', nativeName: 'Italiano', voice: 'it-IT', flag: '🇮🇹' },
// // // // // // // // // // // // // // // //     pt: { code: 'pt', name: 'Portuguese', nativeName: 'Português', voice: 'pt-PT', flag: '🇵🇹' },
// // // // // // // // // // // // // // // //     ru: { code: 'ru', name: 'Russian', nativeName: 'Русский', voice: 'ru-RU', flag: '🇷🇺' },
// // // // // // // // // // // // // // // //     ja: { code: 'ja', name: 'Japanese', nativeName: '日本語', voice: 'ja-JP', flag: '🇯🇵' },
// // // // // // // // // // // // // // // //     ko: { code: 'ko', name: 'Korean', nativeName: '한국어', voice: 'ko-KR', flag: '🇰🇷' },
// // // // // // // // // // // // // // // //     zh: { code: 'zh', name: 'Chinese', nativeName: '中文', voice: 'zh-CN', flag: '🇨🇳' },
// // // // // // // // // // // // // // // //     ar: { code: 'ar', name: 'Arabic', nativeName: 'العربية', voice: 'ar-SA', flag: '🇸🇦' },
    
// // // // // // // // // // // // // // // //     // Other Indian
// // // // // // // // // // // // // // // //     ur: { code: 'ur', name: 'Urdu', nativeName: 'اردو', voice: 'ur-PK', flag: '🇵🇰' },
// // // // // // // // // // // // // // // //     as: { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া', voice: 'as-IN', flag: '🇮🇳' },
// // // // // // // // // // // // // // // //     sa: { code: 'sa', name: 'Sanskrit', nativeName: 'संस्कृतम्', voice: 'sa-IN', flag: '🇮🇳' }
// // // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // // //   // Language groups for organization
// // // // // // // // // // // // // // // //   const languageGroups = {
// // // // // // // // // // // // // // // //     indian: ['te', 'hi', 'ta', 'kn', 'ml', 'mr', 'gu', 'bn', 'pa', 'or', 'ur', 'as', 'sa'],
// // // // // // // // // // // // // // // //     international: ['en', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'ja', 'ko', 'zh', 'ar'],
// // // // // // // // // // // // // // // //     popular: ['en', 'hi', 'te', 'ta', 'es', 'fr', 'de', 'ja']
// // // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // // //   // ✅ AUTO-DETECT LANGUAGE FUNCTION
// // // // // // // // // // // // // // // //   const detectLanguage = async (text) => {
// // // // // // // // // // // // // // // //     if (!text.trim() || text.length < 3) return null;
    
// // // // // // // // // // // // // // // //     try {
// // // // // // // // // // // // // // // //       // Simple detection based on character ranges
// // // // // // // // // // // // // // // //       const detectByScript = (text) => {
// // // // // // // // // // // // // // // //         // Telugu: 0C00-0C7F
// // // // // // // // // // // // // // // //         if (/[\u0C00-\u0C7F]/.test(text)) return 'te';
        
// // // // // // // // // // // // // // // //         // Hindi/Devanagari: 0900-097F
// // // // // // // // // // // // // // // //         if (/[\u0900-\u097F]/.test(text)) return 'hi';
        
// // // // // // // // // // // // // // // //         // Tamil: 0B80-0BFF
// // // // // // // // // // // // // // // //         if (/[\u0B80-\u0BFF]/.test(text)) return 'ta';
        
// // // // // // // // // // // // // // // //         // Kannada: 0C80-0CFF
// // // // // // // // // // // // // // // //         if (/[\u0C80-\u0CFF]/.test(text)) return 'kn';
        
// // // // // // // // // // // // // // // //         // Malayalam: 0D00-0D7F
// // // // // // // // // // // // // // // //         if (/[\u0D00-\u0D7F]/.test(text)) return 'ml';
        
// // // // // // // // // // // // // // // //         // Gujarati: 0A80-0AFF
// // // // // // // // // // // // // // // //         if (/[\u0A80-\u0AFF]/.test(text)) return 'gu';
        
// // // // // // // // // // // // // // // //         // Bengali: 0980-09FF
// // // // // // // // // // // // // // // //         if (/[\u0980-\u09FF]/.test(text)) return 'bn';
        
// // // // // // // // // // // // // // // //         // Arabic: 0600-06FF
// // // // // // // // // // // // // // // //         if (/[\u0600-\u06FF]/.test(text)) return 'ar';
        
// // // // // // // // // // // // // // // //         // Chinese/Japanese/Korean
// // // // // // // // // // // // // // // //         if (/[\u4E00-\u9FFF]/.test(text)) return 'zh'; // Chinese
// // // // // // // // // // // // // // // //         if (/[\u3040-\u309F\u30A0-\u30FF]/.test(text)) return 'ja'; // Japanese
// // // // // // // // // // // // // // // //         if (/[\uAC00-\uD7AF]/.test(text)) return 'ko'; // Korean
        
// // // // // // // // // // // // // // // //         // Cyrillic (Russian)
// // // // // // // // // // // // // // // //         if (/[\u0400-\u04FF]/.test(text)) return 'ru';
        
// // // // // // // // // // // // // // // //         // Default to English
// // // // // // // // // // // // // // // //         return 'en';
// // // // // // // // // // // // // // // //       };
      
// // // // // // // // // // // // // // // //       const detected = detectByScript(text);
// // // // // // // // // // // // // // // //       setDetectedLanguage(detected);
// // // // // // // // // // // // // // // //       return detected;
// // // // // // // // // // // // // // // //     } catch (err) {
// // // // // // // // // // // // // // // //       console.error('Language detection error:', err);
// // // // // // // // // // // // // // // //       return null;
// // // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // // //   // ✅ REAL TRANSLATION FUNCTION - Supports all languages
// // // // // // // // // // // // // // // //   const handleTranslate = async (text) => {
// // // // // // // // // // // // // // // //     if (!text.trim()) return;
    
// // // // // // // // // // // // // // // //     setIsTranslating(true);
// // // // // // // // // // // // // // // //     setStatusMessage('Translating...');
// // // // // // // // // // // // // // // //     setError('');
    
// // // // // // // // // // // // // // // //     try {
// // // // // // // // // // // // // // // //       // Auto-detect source language if not set
// // // // // // // // // // // // // // // //       let detectedSourceLang = sourceLang;
// // // // // // // // // // // // // // // //       if (sourceLang === 'auto') {
// // // // // // // // // // // // // // // //         const detected = await detectLanguage(text);
// // // // // // // // // // // // // // // //         if (detected) {
// // // // // // // // // // // // // // // //           detectedSourceLang = detected;
// // // // // // // // // // // // // // // //           setStatusMessage(`Detected: ${languages[detected]?.name}. Translating...`);
// // // // // // // // // // // // // // // //         }
// // // // // // // // // // // // // // // //       }
      
// // // // // // // // // // // // // // // //       // Try multiple translation services
// // // // // // // // // // // // // // // //       const translation = await translateWithMultipleServices(text, detectedSourceLang, targetLang);
      
// // // // // // // // // // // // // // // //       if (translation) {
// // // // // // // // // // // // // // // //         setTranslatedText(translation);
// // // // // // // // // // // // // // // //         setStatusMessage('Translation complete');
        
// // // // // // // // // // // // // // // //         // Add to recent translations
// // // // // // // // // // // // // // // //         addToRecentTranslations({
// // // // // // // // // // // // // // // //           sourceText: text,
// // // // // // // // // // // // // // // //           translatedText: translation,
// // // // // // // // // // // // // // // //           sourceLang: languages[detectedSourceLang]?.name,
// // // // // // // // // // // // // // // //           targetLang: languages[targetLang]?.name,
// // // // // // // // // // // // // // // //           timestamp: new Date().toISOString()
// // // // // // // // // // // // // // // //         });
// // // // // // // // // // // // // // // //       } else {
// // // // // // // // // // // // // // // //         throw new Error('All translation services failed');
// // // // // // // // // // // // // // // //       }
// // // // // // // // // // // // // // // //     } catch (err) {
// // // // // // // // // // // // // // // //       console.error('Translation error:', err);
// // // // // // // // // // // // // // // //       setError('Translation service temporarily unavailable. Please try again.');
// // // // // // // // // // // // // // // //       setTranslatedText(getOfflineTranslation(text, sourceLang, targetLang));
// // // // // // // // // // // // // // // //       setStatusMessage('Using offline translation');
// // // // // // // // // // // // // // // //     } finally {
// // // // // // // // // // // // // // // //       setIsTranslating(false);
// // // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // // //   // ✅ MULTI-SERVICE TRANSLATION WITH FALLBACKS
// // // // // // // // // // // // // // // //   const translateWithMultipleServices = async (text, fromLang, toLang) => {
// // // // // // // // // // // // // // // //     const services = [
// // // // // // // // // // // // // // // //       tryLibreTranslate,
// // // // // // // // // // // // // // // //       tryGoogleTranslate,
// // // // // // // // // // // // // // // //       tryMyMemoryTranslate,
// // // // // // // // // // // // // // // //       tryArgosTranslate
// // // // // // // // // // // // // // // //     ];
    
// // // // // // // // // // // // // // // //     for (const service of services) {
// // // // // // // // // // // // // // // //       try {
// // // // // // // // // // // // // // // //         const result = await service(text, fromLang, toLang);
// // // // // // // // // // // // // // // //         if (result && result.trim()) {
// // // // // // // // // // // // // // // //           console.log(`Success with ${service.name}:`, result);
// // // // // // // // // // // // // // // //           return result;
// // // // // // // // // // // // // // // //         }
// // // // // // // // // // // // // // // //       } catch (err) {
// // // // // // // // // // // // // // // //         console.warn(`${service.name} failed:`, err.message);
// // // // // // // // // // // // // // // //         continue;
// // // // // // // // // // // // // // // //       }
// // // // // // // // // // // // // // // //     }
    
// // // // // // // // // // // // // // // //     return null;
// // // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // // //   // Service 1: LibreTranslate
// // // // // // // // // // // // // // // //   const tryLibreTranslate = async (text, fromLang, toLang) => {
// // // // // // // // // // // // // // // //     try {
// // // // // // // // // // // // // // // //       const response = await fetch('https://libretranslate.com/translate', {
// // // // // // // // // // // // // // // //         method: 'POST',
// // // // // // // // // // // // // // // //         headers: { 'Content-Type': 'application/json' },
// // // // // // // // // // // // // // // //         body: JSON.stringify({
// // // // // // // // // // // // // // // //           q: text,
// // // // // // // // // // // // // // // //           source: fromLang,
// // // // // // // // // // // // // // // //           target: toLang,
// // // // // // // // // // // // // // // //           format: 'text'
// // // // // // // // // // // // // // // //         })
// // // // // // // // // // // // // // // //       });
      
// // // // // // // // // // // // // // // //       if (response.ok) {
// // // // // // // // // // // // // // // //         const data = await response.json();
// // // // // // // // // // // // // // // //         return data.translatedText;
// // // // // // // // // // // // // // // //       }
// // // // // // // // // // // // // // // //       return null;
// // // // // // // // // // // // // // // //     } catch (err) {
// // // // // // // // // // // // // // // //       throw err;
// // // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // // //   // Service 2: Google Translate (unofficial)
// // // // // // // // // // // // // // // //   const tryGoogleTranslate = async (text, fromLang, toLang) => {
// // // // // // // // // // // // // // // //     try {
// // // // // // // // // // // // // // // //       const response = await fetch(
// // // // // // // // // // // // // // // //         `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${fromLang}&tl=${toLang}&dt=t&q=${encodeURIComponent(text)}`
// // // // // // // // // // // // // // // //       );
      
// // // // // // // // // // // // // // // //       if (response.ok) {
// // // // // // // // // // // // // // // //         const data = await response.json();
// // // // // // // // // // // // // // // //         return data[0][0][0];
// // // // // // // // // // // // // // // //       }
// // // // // // // // // // // // // // // //       return null;
// // // // // // // // // // // // // // // //     } catch (err) {
// // // // // // // // // // // // // // // //       throw err;
// // // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // // //   // Service 3: MyMemory Translate
// // // // // // // // // // // // // // // //   const tryMyMemoryTranslate = async (text, fromLang, toLang) => {
// // // // // // // // // // // // // // // //     try {
// // // // // // // // // // // // // // // //       const response = await fetch(
// // // // // // // // // // // // // // // //         `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${fromLang}|${toLang}`
// // // // // // // // // // // // // // // //       );
      
// // // // // // // // // // // // // // // //       if (response.ok) {
// // // // // // // // // // // // // // // //         const data = await response.json();
// // // // // // // // // // // // // // // //         return data.responseData.translatedText;
// // // // // // // // // // // // // // // //       }
// // // // // // // // // // // // // // // //       return null;
// // // // // // // // // // // // // // // //     } catch (err) {
// // // // // // // // // // // // // // // //       throw err;
// // // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // // //   // Service 4: Argos Translate
// // // // // // // // // // // // // // // //   const tryArgosTranslate = async (text, fromLang, toLang) => {
// // // // // // // // // // // // // // // //     try {
// // // // // // // // // // // // // // // //       const response = await fetch('https://translate.argosopentech.com/translate', {
// // // // // // // // // // // // // // // //         method: 'POST',
// // // // // // // // // // // // // // // //         headers: { 'Content-Type': 'application/json' },
// // // // // // // // // // // // // // // //         body: JSON.stringify({
// // // // // // // // // // // // // // // //           q: text,
// // // // // // // // // // // // // // // //           source: fromLang,
// // // // // // // // // // // // // // // //           target: toLang
// // // // // // // // // // // // // // // //         })
// // // // // // // // // // // // // // // //       });
      
// // // // // // // // // // // // // // // //       if (response.ok) {
// // // // // // // // // // // // // // // //         const data = await response.json();
// // // // // // // // // // // // // // // //         return data.translatedText;
// // // // // // // // // // // // // // // //       }
// // // // // // // // // // // // // // // //       return null;
// // // // // // // // // // // // // // // //     } catch (err) {
// // // // // // // // // // // // // // // //       throw err;
// // // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // // //   // ✅ OFFLINE FALLBACK DICTIONARY
// // // // // // // // // // // // // // // //   const getOfflineTranslation = (text, fromLang, toLang) => {
// // // // // // // // // // // // // // // //     // Common phrases for all languages
// // // // // // // // // // // // // // // //     const phrases = {
// // // // // // // // // // // // // // // //       'hello': {
// // // // // // // // // // // // // // // //         en: 'Hello',
// // // // // // // // // // // // // // // //         te: 'హలో',
// // // // // // // // // // // // // // // //         hi: 'नमस्ते',
// // // // // // // // // // // // // // // //         ta: 'வணக்கம்',
// // // // // // // // // // // // // // // //         kn: 'ನಮಸ್ಕಾರ',
// // // // // // // // // // // // // // // //         ml: 'ഹലോ',
// // // // // // // // // // // // // // // //         es: 'Hola',
// // // // // // // // // // // // // // // //         fr: 'Bonjour',
// // // // // // // // // // // // // // // //         de: 'Hallo',
// // // // // // // // // // // // // // // //         ja: 'こんにちは',
// // // // // // // // // // // // // // // //         ko: '안녕하세요',
// // // // // // // // // // // // // // // //         zh: '你好',
// // // // // // // // // // // // // // // //         ar: 'مرحبا'
// // // // // // // // // // // // // // // //       },
// // // // // // // // // // // // // // // //       'thank you': {
// // // // // // // // // // // // // // // //         en: 'Thank you',
// // // // // // // // // // // // // // // //         te: 'ధన్యవాదాలు',
// // // // // // // // // // // // // // // //         hi: 'धन्यवाद',
// // // // // // // // // // // // // // // //         ta: 'நன்றி',
// // // // // // // // // // // // // // // //         kn: 'ಧನ್ಯವಾದಗಳು',
// // // // // // // // // // // // // // // //         ml: 'നന്ദി',
// // // // // // // // // // // // // // // //         es: 'Gracias',
// // // // // // // // // // // // // // // //         fr: 'Merci',
// // // // // // // // // // // // // // // //         de: 'Danke',
// // // // // // // // // // // // // // // //         ja: 'ありがとう',
// // // // // // // // // // // // // // // //         ko: '감사합니다',
// // // // // // // // // // // // // // // //         zh: '谢谢',
// // // // // // // // // // // // // // // //         ar: 'شكرا'
// // // // // // // // // // // // // // // //       },
// // // // // // // // // // // // // // // //       'how are you': {
// // // // // // // // // // // // // // // //         en: 'How are you?',
// // // // // // // // // // // // // // // //         te: 'మీరు ఎలా ఉన్నారు?',
// // // // // // // // // // // // // // // //         hi: 'आप कैसे हैं?',
// // // // // // // // // // // // // // // //         ta: 'நீங்கள் எப்படி இருக்கிறீர்கள்?',
// // // // // // // // // // // // // // // //         kn: 'ನೀವು ಹೇಗಿದ್ದೀರಿ?',
// // // // // // // // // // // // // // // //         ml: 'നീ എങ്ങനെ ഉണ്ട്?',
// // // // // // // // // // // // // // // //         es: '¿Cómo estás?',
// // // // // // // // // // // // // // // //         fr: 'Comment allez-vous?',
// // // // // // // // // // // // // // // //         de: 'Wie geht es dir?',
// // // // // // // // // // // // // // // //         ja: 'お元気ですか？',
// // // // // // // // // // // // // // // //         ko: '어떻게 지내세요?',
// // // // // // // // // // // // // // // //         zh: '你好吗？',
// // // // // // // // // // // // // // // //         ar: 'كيف حالك؟'
// // // // // // // // // // // // // // // //       }
// // // // // // // // // // // // // // // //     };
    
// // // // // // // // // // // // // // // //     const lowerText = text.toLowerCase().trim();
    
// // // // // // // // // // // // // // // //     // Check for phrase match
// // // // // // // // // // // // // // // //     for (const [phrase, translations] of Object.entries(phrases)) {
// // // // // // // // // // // // // // // //       if (lowerText.includes(phrase) && translations[fromLang] && translations[toLang]) {
// // // // // // // // // // // // // // // //         return translations[toLang];
// // // // // // // // // // // // // // // //       }
// // // // // // // // // // // // // // // //     }
    
// // // // // // // // // // // // // // // //     // Word-by-word fallback for common words
// // // // // // // // // // // // // // // //     const commonWords = {
// // // // // // // // // // // // // // // //       'water': { te: 'నీరు', hi: 'पानी', ta: 'நீர்', en: 'water' },
// // // // // // // // // // // // // // // //       'food': { te: 'ఆహారం', hi: 'भोजन', ta: 'உணவு', en: 'food' },
// // // // // // // // // // // // // // // //       'help': { te: 'సహాయం', hi: 'मदद', ta: 'உதவி', en: 'help' },
// // // // // // // // // // // // // // // //       'money': { te: 'డబ్బు', hi: 'पैसा', ta: 'பணம்', en: 'money' },
// // // // // // // // // // // // // // // //       'home': { te: 'ఇల్లు', hi: 'घर', ta: 'வீடு', en: 'home' }
// // // // // // // // // // // // // // // //     };
    
// // // // // // // // // // // // // // // //     const words = text.split(' ');
// // // // // // // // // // // // // // // //     const translatedWords = words.map(word => {
// // // // // // // // // // // // // // // //       const lowerWord = word.toLowerCase();
// // // // // // // // // // // // // // // //       if (commonWords[lowerWord] && commonWords[lowerWord][toLang]) {
// // // // // // // // // // // // // // // //         return commonWords[lowerWord][toLang];
// // // // // // // // // // // // // // // //       }
// // // // // // // // // // // // // // // //       return word;
// // // // // // // // // // // // // // // //     });
    
// // // // // // // // // // // // // // // //     return `[Offline] ${translatedWords.join(' ')}`;
// // // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // // //   // Add to recent translations
// // // // // // // // // // // // // // // //   const addToRecentTranslations = (translation) => {
// // // // // // // // // // // // // // // //     setRecentTranslations(prev => [translation, ...prev.slice(0, 4)]);
// // // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // // //   // ✅ SPEECH SYNTHESIS FOR ALL LANGUAGES
// // // // // // // // // // // // // // // //   const speakText = (text) => {
// // // // // // // // // // // // // // // //     if (!text || !window.speechSynthesis) {
// // // // // // // // // // // // // // // //       setError('Text-to-speech not supported');
// // // // // // // // // // // // // // // //       return;
// // // // // // // // // // // // // // // //     }
    
// // // // // // // // // // // // // // // //     window.speechSynthesis.cancel();
    
// // // // // // // // // // // // // // // //     const utterance = new SpeechSynthesisUtterance(text);
// // // // // // // // // // // // // // // //     utterance.lang = languages[targetLang]?.voice || 'en-US';
// // // // // // // // // // // // // // // //     utterance.rate = 0.8;
// // // // // // // // // // // // // // // //     utterance.pitch = 1;
// // // // // // // // // // // // // // // //     utterance.volume = 1;
    
// // // // // // // // // // // // // // // //     // Try to find appropriate voice
// // // // // // // // // // // // // // // //     const voices = window.speechSynthesis.getVoices();
// // // // // // // // // // // // // // // //     const targetVoice = voices.find(voice => 
// // // // // // // // // // // // // // // //       voice.lang.startsWith(targetLang) || 
// // // // // // // // // // // // // // // //       voice.lang.includes(languages[targetLang]?.name.toLowerCase())
// // // // // // // // // // // // // // // //     );
    
// // // // // // // // // // // // // // // //     if (targetVoice) {
// // // // // // // // // // // // // // // //       utterance.voice = targetVoice;
// // // // // // // // // // // // // // // //     }
    
// // // // // // // // // // // // // // // //     utterance.onstart = () => {
// // // // // // // // // // // // // // // //       setIsSpeaking(true);
// // // // // // // // // // // // // // // //       setStatusMessage(`Speaking in ${languages[targetLang]?.name}...`);
// // // // // // // // // // // // // // // //     };
    
// // // // // // // // // // // // // // // //     utterance.onend = () => {
// // // // // // // // // // // // // // // //       setIsSpeaking(false);
// // // // // // // // // // // // // // // //       setStatusMessage('Ready');
// // // // // // // // // // // // // // // //     };
    
// // // // // // // // // // // // // // // //     utterance.onerror = () => {
// // // // // // // // // // // // // // // //       setIsSpeaking(false);
// // // // // // // // // // // // // // // //       setStatusMessage('Speech synthesis failed');
// // // // // // // // // // // // // // // //     };
    
// // // // // // // // // // // // // // // //     window.speechSynthesis.speak(utterance);
// // // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // // //   // Initialize speech recognition
// // // // // // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // // // // // //     if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
// // // // // // // // // // // // // // // //       setRecognitionSupported(false);
// // // // // // // // // // // // // // // //       return;
// // // // // // // // // // // // // // // //     }

// // // // // // // // // // // // // // // //     try {
// // // // // // // // // // // // // // // //       const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
// // // // // // // // // // // // // // // //       recognitionRef.current = new SpeechRecognition();
      
// // // // // // // // // // // // // // // //       recognitionRef.current.continuous = false;
// // // // // // // // // // // // // // // //       recognitionRef.current.interimResults = false;
// // // // // // // // // // // // // // // //       recognitionRef.current.lang = languages[sourceLang]?.voice || 'en-US';
      
// // // // // // // // // // // // // // // //       recognitionRef.current.onresult = (event) => {
// // // // // // // // // // // // // // // //         const text = event.results[0][0].transcript;
// // // // // // // // // // // // // // // //         setTranscript(text);
// // // // // // // // // // // // // // // //         setStatusMessage('Translating...');
// // // // // // // // // // // // // // // //         handleTranslate(text);
// // // // // // // // // // // // // // // //       };
      
// // // // // // // // // // // // // // // //       recognitionRef.current.onerror = (event) => {
// // // // // // // // // // // // // // // //         setIsListening(false);
// // // // // // // // // // // // // // // //         if (event.error === 'not-allowed') {
// // // // // // // // // // // // // // // //           setError('Microphone access denied');
// // // // // // // // // // // // // // // //         }
// // // // // // // // // // // // // // // //       };
      
// // // // // // // // // // // // // // // //       recognitionRef.current.onend = () => {
// // // // // // // // // // // // // // // //         setIsListening(false);
// // // // // // // // // // // // // // // //       };
      
// // // // // // // // // // // // // // // //     } catch (err) {
// // // // // // // // // // // // // // // //       setRecognitionSupported(false);
// // // // // // // // // // // // // // // //     }
    
// // // // // // // // // // // // // // // //     return () => {
// // // // // // // // // // // // // // // //       if (recognitionRef.current) {
// // // // // // // // // // // // // // // //         recognitionRef.current.stop();
// // // // // // // // // // // // // // // //       }
// // // // // // // // // // // // // // // //       window.speechSynthesis.cancel();
// // // // // // // // // // // // // // // //     };
// // // // // // // // // // // // // // // //   }, [sourceLang]);

// // // // // // // // // // // // // // // //   // Handle text translation
// // // // // // // // // // // // // // // //   const handleTextTranslate = () => {
// // // // // // // // // // // // // // // //     if (!pasteText.trim()) {
// // // // // // // // // // // // // // // //       setError('Please enter text to translate');
// // // // // // // // // // // // // // // //       return;
// // // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // // //     setTranscript(pasteText);
// // // // // // // // // // // // // // // //     handleTranslate(pasteText);
// // // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // // //   // Clear all
// // // // // // // // // // // // // // // //   const clearAll = () => {
// // // // // // // // // // // // // // // //     setTranscript('');
// // // // // // // // // // // // // // // //     setTranslatedText('');
// // // // // // // // // // // // // // // //     setPasteText('');
// // // // // // // // // // // // // // // //     setError('');
// // // // // // // // // // // // // // // //     setStatusMessage('Ready');
// // // // // // // // // // // // // // // //     window.speechSynthesis.cancel();
// // // // // // // // // // // // // // // //     if (isListening) {
// // // // // // // // // // // // // // // //       recognitionRef.current.stop();
// // // // // // // // // // // // // // // //       setIsListening(false);
// // // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // // //   // Handle back to dashboard
// // // // // // // // // // // // // // // //   const handleBackToDashboard = () => {
// // // // // // // // // // // // // // // //     if (isListening) recognitionRef.current?.stop();
// // // // // // // // // // // // // // // //     if (isSpeaking) window.speechSynthesis.cancel();
// // // // // // // // // // // // // // // //     navigate('/dashboard');
// // // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // // //   // Handle logout
// // // // // // // // // // // // // // // //   const handleLogout = () => {
// // // // // // // // // // // // // // // //     localStorage.clear();
// // // // // // // // // // // // // // // //     navigate('/');
// // // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // // //   // Swap languages
// // // // // // // // // // // // // // // //   const swapLanguages = () => {
// // // // // // // // // // // // // // // //     setSourceLang(targetLang);
// // // // // // // // // // // // // // // //     setTargetLang(sourceLang);
// // // // // // // // // // // // // // // //     setTranscript('');
// // // // // // // // // // // // // // // //     setTranslatedText('');
// // // // // // // // // // // // // // // //     setStatusMessage('Languages swapped');
// // // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // // //   // Copy to clipboard
// // // // // // // // // // // // // // // //   const copyToClipboard = (text) => {
// // // // // // // // // // // // // // // //     navigator.clipboard.writeText(text)
// // // // // // // // // // // // // // // //       .then(() => {
// // // // // // // // // // // // // // // //         setStatusMessage('Copied!');
// // // // // // // // // // // // // // // //         setTimeout(() => setStatusMessage('Ready'), 2000);
// // // // // // // // // // // // // // // //       })
// // // // // // // // // // // // // // // //       .catch(() => setError('Failed to copy'));
// // // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // // //   // Auto-detect from text
// // // // // // // // // // // // // // // //   const handleAutoDetect = async () => {
// // // // // // // // // // // // // // // //     if (!pasteText.trim()) return;
// // // // // // // // // // // // // // // //     const detected = await detectLanguage(pasteText);
// // // // // // // // // // // // // // // //     if (detected && detected !== sourceLang) {
// // // // // // // // // // // // // // // //       setSourceLang(detected);
// // // // // // // // // // // // // // // //       setStatusMessage(`Auto-detected: ${languages[detected]?.name}`);
// // // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // // //   // Quick language set
// // // // // // // // // // // // // // // //   const setQuickLanguage = (langCode) => {
// // // // // // // // // // // // // // // //     setSourceLang(langCode);
// // // // // // // // // // // // // // // //     setStatusMessage(`Source set to ${languages[langCode]?.name}`);
// // // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // // //   // Get popular language pairs
// // // // // // // // // // // // // // // //   const popularPairs = [
// // // // // // // // // // // // // // // //     { from: 'en', to: 'te', label: 'English → Telugu' },
// // // // // // // // // // // // // // // //     { from: 'te', to: 'en', label: 'Telugu → English' },
// // // // // // // // // // // // // // // //     { from: 'hi', to: 'en', label: 'Hindi → English' },
// // // // // // // // // // // // // // // //     { from: 'en', to: 'hi', label: 'English → Hindi' },
// // // // // // // // // // // // // // // //     { from: 'en', to: 'es', label: 'English → Spanish' },
// // // // // // // // // // // // // // // //     { from: 'en', to: 'fr', label: 'English → French' }
// // // // // // // // // // // // // // // //   ];

// // // // // // // // // // // // // // // //   return (
// // // // // // // // // // // // // // // //     <div className="language-translator-container">
// // // // // // // // // // // // // // // //       {/* Fixed Header */}
// // // // // // // // // // // // // // // //       <header className="fixed-header">
// // // // // // // // // // // // // // // //         <div className="header-content">
// // // // // // // // // // // // // // // //           <div className="header-left">
// // // // // // // // // // // // // // // //             <button className="back-btn" onClick={handleBackToDashboard}>
// // // // // // // // // // // // // // // //               ← Dashboard
// // // // // // // // // // // // // // // //             </button>
// // // // // // // // // // // // // // // //             <h1 className="logo">Vision Assist</h1>
// // // // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // // // //           <div className="user-menu">
// // // // // // // // // // // // // // // //             <span className="api-status">{apiStatus}</span>
// // // // // // // // // // // // // // // //             <button className="logout-btn" onClick={handleLogout}>
// // // // // // // // // // // // // // // //               Logout
// // // // // // // // // // // // // // // //             </button>
// // // // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // // // //         </div>
// // // // // // // // // // // // // // // //       </header>

// // // // // // // // // // // // // // // //       <div className="language-translator-content">
// // // // // // // // // // // // // // // //         <div className="language-translator-header">
// // // // // // // // // // // // // // // //           <h2>🌍 Multi-Language Translator</h2>
// // // // // // // // // // // // // // // //           <p>Translate between 25+ languages including all major Indian languages</p>
// // // // // // // // // // // // // // // //           <div className="stats">
// // // // // // // // // // // // // // // //             <span className="stat-item">📚 25+ Languages</span>
// // // // // // // // // // // // // // // //             <span className="stat-item">⚡ Real-time</span>
// // // // // // // // // // // // // // // //             <span className="stat-item">🔊 Text-to-Speech</span>
// // // // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // // // //         </div>

// // // // // // // // // // // // // // // //         {/* Status Message */}
// // // // // // // // // // // // // // // //         {statusMessage && (
// // // // // // // // // // // // // // // //           <div className="status-message">
// // // // // // // // // // // // // // // //             {statusMessage}
// // // // // // // // // // // // // // // //             {error && <div className="error-text">{error}</div>}
// // // // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // // // //         )}

// // // // // // // // // // // // // // // //         {/* Quick Language Pairs */}
// // // // // // // // // // // // // // // //         <div className="quick-pairs">
// // // // // // // // // // // // // // // //           <h3>🚀 Quick Translations</h3>
// // // // // // // // // // // // // // // //           <div className="pairs-grid">
// // // // // // // // // // // // // // // //             {popularPairs.map((pair, idx) => (
// // // // // // // // // // // // // // // //               <button
// // // // // // // // // // // // // // // //                 key={idx}
// // // // // // // // // // // // // // // //                 onClick={() => {
// // // // // // // // // // // // // // // //                   setSourceLang(pair.from);
// // // // // // // // // // // // // // // //                   setTargetLang(pair.to);
// // // // // // // // // // // // // // // //                   setStatusMessage(`Set to ${pair.label}`);
// // // // // // // // // // // // // // // //                 }}
// // // // // // // // // // // // // // // //                 className="pair-btn"
// // // // // // // // // // // // // // // //               >
// // // // // // // // // // // // // // // //                 {pair.label}
// // // // // // // // // // // // // // // //               </button>
// // // // // // // // // // // // // // // //             ))}
// // // // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // // // //         </div>

// // // // // // // // // // // // // // // //         {/* Language Selection */}
// // // // // // // // // // // // // // // //         <div className="language-selection-section">
// // // // // // // // // // // // // // // //           <div className="selection-row">
// // // // // // // // // // // // // // // //             <div className="lang-selector">
// // // // // // // // // // // // // // // //               <label>From Language:</label>
// // // // // // // // // // // // // // // //               <div className="lang-select-wrapper">
// // // // // // // // // // // // // // // //                 <select 
// // // // // // // // // // // // // // // //                   value={sourceLang}
// // // // // // // // // // // // // // // //                   onChange={(e) => setSourceLang(e.target.value)}
// // // // // // // // // // // // // // // //                   className="lang-select"
// // // // // // // // // // // // // // // //                 >
// // // // // // // // // // // // // // // //                   <option value="auto">🔍 Auto-detect</option>
// // // // // // // // // // // // // // // //                   <optgroup label="Indian Languages">
// // // // // // // // // // // // // // // //                     {languageGroups.indian.map(code => (
// // // // // // // // // // // // // // // //                       <option key={code} value={code}>
// // // // // // // // // // // // // // // //                         {languages[code]?.flag} {languages[code]?.name} ({languages[code]?.nativeName})
// // // // // // // // // // // // // // // //                       </option>
// // // // // // // // // // // // // // // //                     ))}
// // // // // // // // // // // // // // // //                   </optgroup>
// // // // // // // // // // // // // // // //                   <optgroup label="International">
// // // // // // // // // // // // // // // //                     {languageGroups.international.map(code => (
// // // // // // // // // // // // // // // //                       <option key={code} value={code}>
// // // // // // // // // // // // // // // //                         {languages[code]?.flag} {languages[code]?.name}
// // // // // // // // // // // // // // // //                       </option>
// // // // // // // // // // // // // // // //                     ))}
// // // // // // // // // // // // // // // //                   </optgroup>
// // // // // // // // // // // // // // // //                 </select>
// // // // // // // // // // // // // // // //                 {sourceLang !== 'auto' && (
// // // // // // // // // // // // // // // //                   <div className="selected-lang-display">
// // // // // // // // // // // // // // // //                     {languages[sourceLang]?.flag} {languages[sourceLang]?.nativeName}
// // // // // // // // // // // // // // // //                   </div>
// // // // // // // // // // // // // // // //                 )}
// // // // // // // // // // // // // // // //               </div>
// // // // // // // // // // // // // // // //             </div>
            
// // // // // // // // // // // // // // // //             <button onClick={swapLanguages} className="swap-lang-btn" title="Swap languages">
// // // // // // // // // // // // // // // //               ⇄
// // // // // // // // // // // // // // // //             </button>
            
// // // // // // // // // // // // // // // //             <div className="lang-selector">
// // // // // // // // // // // // // // // //               <label>To Language:</label>
// // // // // // // // // // // // // // // //               <div className="lang-select-wrapper">
// // // // // // // // // // // // // // // //                 <select 
// // // // // // // // // // // // // // // //                   value={targetLang}
// // // // // // // // // // // // // // // //                   onChange={(e) => setTargetLang(e.target.value)}
// // // // // // // // // // // // // // // //                   className="lang-select"
// // // // // // // // // // // // // // // //                 >
// // // // // // // // // // // // // // // //                   <optgroup label="Popular">
// // // // // // // // // // // // // // // //                     {languageGroups.popular.map(code => (
// // // // // // // // // // // // // // // //                       <option key={code} value={code}>
// // // // // // // // // // // // // // // //                         {languages[code]?.flag} {languages[code]?.name}
// // // // // // // // // // // // // // // //                       </option>
// // // // // // // // // // // // // // // //                     ))}
// // // // // // // // // // // // // // // //                   </optgroup>
// // // // // // // // // // // // // // // //                   <optgroup label="All Languages">
// // // // // // // // // // // // // // // //                     {Object.entries(languages).map(([code, lang]) => (
// // // // // // // // // // // // // // // //                       <option key={code} value={code}>
// // // // // // // // // // // // // // // //                         {lang.flag} {lang.name}
// // // // // // // // // // // // // // // //                       </option>
// // // // // // // // // // // // // // // //                     ))}
// // // // // // // // // // // // // // // //                   </optgroup>
// // // // // // // // // // // // // // // //                 </select>
// // // // // // // // // // // // // // // //                 <div className="selected-lang-display">
// // // // // // // // // // // // // // // //                   {languages[targetLang]?.flag} {languages[targetLang]?.nativeName}
// // // // // // // // // // // // // // // //                 </div>
// // // // // // // // // // // // // // // //               </div>
// // // // // // // // // // // // // // // //             </div>
// // // // // // // // // // // // // // // //           </div>
          
// // // // // // // // // // // // // // // //           {detectedLanguage && sourceLang === 'auto' && (
// // // // // // // // // // // // // // // //             <div className="detected-language">
// // // // // // // // // // // // // // // //               🔍 Detected: <strong>{languages[detectedLanguage]?.name}</strong>
// // // // // // // // // // // // // // // //             </div>
// // // // // // // // // // // // // // // //           )}
// // // // // // // // // // // // // // // //         </div>

// // // // // // // // // // // // // // // //         {/* Input Section */}
// // // // // // // // // // // // // // // //         <div className="input-section">
// // // // // // // // // // // // // // // //           <div className="input-header">
// // // // // // // // // // // // // // // //             <h3>📝 Enter Text</h3>
// // // // // // // // // // // // // // // //             <div className="input-mode">
// // // // // // // // // // // // // // // //               <button 
// // // // // // // // // // // // // // // //                 className={`mode-btn ${!isPasteMode ? 'active' : ''}`}
// // // // // // // // // // // // // // // //                 onClick={() => setIsPasteMode(false)}
// // // // // // // // // // // // // // // //               >
// // // // // // // // // // // // // // // //                 🎤 Speak
// // // // // // // // // // // // // // // //               </button>
// // // // // // // // // // // // // // // //               <button 
// // // // // // // // // // // // // // // //                 className={`mode-btn ${isPasteMode ? 'active' : ''}`}
// // // // // // // // // // // // // // // //                 onClick={() => setIsPasteMode(true)}
// // // // // // // // // // // // // // // //               >
// // // // // // // // // // // // // // // //                 ⌨️ Type
// // // // // // // // // // // // // // // //               </button>
// // // // // // // // // // // // // // // //             </div>
// // // // // // // // // // // // // // // //           </div>
          
// // // // // // // // // // // // // // // //           {!isPasteMode ? (
// // // // // // // // // // // // // // // //             <div className="speech-input">
// // // // // // // // // // // // // // // //               <button
// // // // // // // // // // // // // // // //                 onClick={() => {
// // // // // // // // // // // // // // // //                   if (isListening) {
// // // // // // // // // // // // // // // //                     recognitionRef.current.stop();
// // // // // // // // // // // // // // // //                     setIsListening(false);
// // // // // // // // // // // // // // // //                   } else {
// // // // // // // // // // // // // // // //                     setError('');
// // // // // // // // // // // // // // // //                     setTranscript('');
// // // // // // // // // // // // // // // //                     setTranslatedText('');
// // // // // // // // // // // // // // // //                     setIsListening(true);
// // // // // // // // // // // // // // // //                     recognitionRef.current.lang = languages[sourceLang]?.voice || 'en-US';
// // // // // // // // // // // // // // // //                     recognitionRef.current.start();
// // // // // // // // // // // // // // // //                   }
// // // // // // // // // // // // // // // //                 }}
// // // // // // // // // // // // // // // //                 disabled={!recognitionSupported || sourceLang === 'auto'}
// // // // // // // // // // // // // // // //                 className={`speech-btn ${isListening ? 'listening' : ''}`}
// // // // // // // // // // // // // // // //               >
// // // // // // // // // // // // // // // //                 {isListening ? (
// // // // // // // // // // // // // // // //                   <>
// // // // // // // // // // // // // // // //                     <div className="pulse-ring"></div>
// // // // // // // // // // // // // // // //                     <span className="btn-icon">⏹️</span>
// // // // // // // // // // // // // // // //                     <span className="btn-text">Stop Listening</span>
// // // // // // // // // // // // // // // //                   </>
// // // // // // // // // // // // // // // //                 ) : (
// // // // // // // // // // // // // // // //                   <>
// // // // // // // // // // // // // // // //                     <span className="btn-icon">🎤</span>
// // // // // // // // // // // // // // // //                     <span className="btn-text">Click to Speak</span>
// // // // // // // // // // // // // // // //                   </>
// // // // // // // // // // // // // // // //                 )}
// // // // // // // // // // // // // // // //               </button>
// // // // // // // // // // // // // // // //               {sourceLang === 'auto' && (
// // // // // // // // // // // // // // // //                 <div className="info-note">
// // // // // // // // // // // // // // // //                   ℹ️ Speech input disabled in auto-detect mode
// // // // // // // // // // // // // // // //                 </div>
// // // // // // // // // // // // // // // //               )}
// // // // // // // // // // // // // // // //             </div>
// // // // // // // // // // // // // // // //           ) : (
// // // // // // // // // // // // // // // //             <div className="text-input">
// // // // // // // // // // // // // // // //               <div className="text-input-wrapper">
// // // // // // // // // // // // // // // //                 <textarea
// // // // // // // // // // // // // // // //                   ref={textareaRef}
// // // // // // // // // // // // // // // //                   value={pasteText}
// // // // // // // // // // // // // // // //                   onChange={(e) => setPasteText(e.target.value)}
// // // // // // // // // // // // // // // //                   placeholder={`Enter text in any language...`}
// // // // // // // // // // // // // // // //                   className="translation-textarea"
// // // // // // // // // // // // // // // //                   rows="5"
// // // // // // // // // // // // // // // //                 />
// // // // // // // // // // // // // // // //                 <div className="textarea-actions">
// // // // // // // // // // // // // // // //                   <button onClick={handleAutoDetect} className="detect-btn">
// // // // // // // // // // // // // // // //                     🔍 Detect Language
// // // // // // // // // // // // // // // //                   </button>
// // // // // // // // // // // // // // // //                   <button onClick={clearAll} className="clear-text-btn">
// // // // // // // // // // // // // // // //                     🗑️ Clear
// // // // // // // // // // // // // // // //                   </button>
// // // // // // // // // // // // // // // //                 </div>
// // // // // // // // // // // // // // // //               </div>
// // // // // // // // // // // // // // // //               <button
// // // // // // // // // // // // // // // //                 onClick={handleTextTranslate}
// // // // // // // // // // // // // // // //                 disabled={isTranslating || !pasteText.trim()}
// // // // // // // // // // // // // // // //                 className="translate-action-btn"
// // // // // // // // // // // // // // // //               >
// // // // // // // // // // // // // // // //                 {isTranslating ? (
// // // // // // // // // // // // // // // //                   <>
// // // // // // // // // // // // // // // //                     <span className="spinner"></span>
// // // // // // // // // // // // // // // //                     Translating...
// // // // // // // // // // // // // // // //                   </>
// // // // // // // // // // // // // // // //                 ) : (
// // // // // // // // // // // // // // // //                   `🌐 Translate to ${languages[targetLang]?.name}`
// // // // // // // // // // // // // // // //                 )}
// // // // // // // // // // // // // // // //               </button>
// // // // // // // // // // // // // // // //             </div>
// // // // // // // // // // // // // // // //           )}
// // // // // // // // // // // // // // // //         </div>

// // // // // // // // // // // // // // // //         {/* Translation Results */}
// // // // // // // // // // // // // // // //         <div className="translation-results">
// // // // // // // // // // // // // // // //           <h3>📊 Translation Results</h3>
          
// // // // // // // // // // // // // // // //           <div className="results-container">
// // // // // // // // // // // // // // // //             <div className="source-result">
// // // // // // // // // // // // // // // //               <div className="result-header">
// // // // // // // // // // // // // // // //                 <h4>
// // // // // // // // // // // // // // // //                   {sourceLang === 'auto' ? 'Detected Text' : languages[sourceLang]?.name}
// // // // // // // // // // // // // // // //                   {detectedLanguage && sourceLang === 'auto' && 
// // // // // // // // // // // // // // // //                     <span className="detected-tag"> ({languages[detectedLanguage]?.name})</span>
// // // // // // // // // // // // // // // //                   }
// // // // // // // // // // // // // // // //                 </h4>
// // // // // // // // // // // // // // // //                 {transcript && (
// // // // // // // // // // // // // // // //                   <button onClick={() => copyToClipboard(transcript)} className="action-btn">
// // // // // // // // // // // // // // // //                     📋 Copy
// // // // // // // // // // // // // // // //                   </button>
// // // // // // // // // // // // // // // //                 )}
// // // // // // // // // // // // // // // //               </div>
// // // // // // // // // // // // // // // //               <div className="result-content">
// // // // // // // // // // // // // // // //                 {transcript || pasteText || (
// // // // // // // // // // // // // // // //                   <div className="empty-state">
// // // // // // // // // // // // // // // //                     <div className="empty-icon">💭</div>
// // // // // // // // // // // // // // // //                     <p>Text will appear here</p>
// // // // // // // // // // // // // // // //                   </div>
// // // // // // // // // // // // // // // //                 )}
// // // // // // // // // // // // // // // //               </div>
// // // // // // // // // // // // // // // //             </div>
            
// // // // // // // // // // // // // // // //             <div className="target-result">
// // // // // // // // // // // // // // // //               <div className="result-header">
// // // // // // // // // // // // // // // //                 <h4>{languages[targetLang]?.name}</h4>
// // // // // // // // // // // // // // // //                 {translatedText && (
// // // // // // // // // // // // // // // //                   <div className="result-actions">
// // // // // // // // // // // // // // // //                     <button onClick={() => copyToClipboard(translatedText)} className="action-btn">
// // // // // // // // // // // // // // // //                       📋 Copy
// // // // // // // // // // // // // // // //                     </button>
// // // // // // // // // // // // // // // //                     <button 
// // // // // // // // // // // // // // // //                       onClick={isSpeaking ? () => window.speechSynthesis.cancel() : () => speakText(translatedText)}
// // // // // // // // // // // // // // // //                       className={`speak-action-btn ${isSpeaking ? 'speaking' : ''}`}
// // // // // // // // // // // // // // // //                     >
// // // // // // // // // // // // // // // //                       {isSpeaking ? '⏹️ Stop' : '🔊 Speak'}
// // // // // // // // // // // // // // // //                     </button>
// // // // // // // // // // // // // // // //                   </div>
// // // // // // // // // // // // // // // //                 )}
// // // // // // // // // // // // // // // //               </div>
// // // // // // // // // // // // // // // //               <div className="result-content">
// // // // // // // // // // // // // // // //                 {translatedText || (
// // // // // // // // // // // // // // // //                   <div className="empty-state">
// // // // // // // // // // // // // // // //                     <div className="empty-icon">🌐</div>
// // // // // // // // // // // // // // // //                     <p>Translation will appear here</p>
// // // // // // // // // // // // // // // //                   </div>
// // // // // // // // // // // // // // // //                 )}
// // // // // // // // // // // // // // // //               </div>
// // // // // // // // // // // // // // // //             </div>
// // // // // // // // // // // // // // // //           </div>
          
// // // // // // // // // // // // // // // //           {translatedText && (
// // // // // // // // // // // // // // // //             <div className="post-translation-actions">
// // // // // // // // // // // // // // // //               <button
// // // // // // // // // // // // // // // //                 onClick={() => {
// // // // // // // // // // // // // // // //                   setSourceLang(targetLang);
// // // // // // // // // // // // // // // //                   setTargetLang(sourceLang);
// // // // // // // // // // // // // // // //                   setTranscript(translatedText);
// // // // // // // // // // // // // // // //                   handleTranslate(translatedText);
// // // // // // // // // // // // // // // //                 }}
// // // // // // // // // // // // // // // //                 className="swap-translate-btn"
// // // // // // // // // // // // // // // //               >
// // // // // // // // // // // // // // // //                 🔁 Swap & Retranslate
// // // // // // // // // // // // // // // //               </button>
              
// // // // // // // // // // // // // // // //               <button
// // // // // // // // // // // // // // // //                 onClick={() => {
// // // // // // // // // // // // // // // //                   setPasteText(translatedText);
// // // // // // // // // // // // // // // //                   if (textareaRef.current) {
// // // // // // // // // // // // // // // //                     textareaRef.current.focus();
// // // // // // // // // // // // // // // //                   }
// // // // // // // // // // // // // // // //                 }}
// // // // // // // // // // // // // // // //                 className="edit-btn"
// // // // // // // // // // // // // // // //               >
// // // // // // // // // // // // // // // //                 ✏️ Edit Translation
// // // // // // // // // // // // // // // //               </button>
// // // // // // // // // // // // // // // //             </div>
// // // // // // // // // // // // // // // //           )}
// // // // // // // // // // // // // // // //         </div>

// // // // // // // // // // // // // // // //         {/* Recent Translations */}
// // // // // // // // // // // // // // // //         {recentTranslations.length > 0 && (
// // // // // // // // // // // // // // // //           <div className="recent-translations">
// // // // // // // // // // // // // // // //             <h3>🕐 Recent Translations</h3>
// // // // // // // // // // // // // // // //             <div className="recent-list">
// // // // // // // // // // // // // // // //               {recentTranslations.map((item, idx) => (
// // // // // // // // // // // // // // // //                 <div key={idx} className="recent-item">
// // // // // // // // // // // // // // // //                   <div className="recent-langs">
// // // // // // // // // // // // // // // //                     <span className="lang-from">{item.sourceLang}</span>
// // // // // // // // // // // // // // // //                     <span className="arrow">→</span>
// // // // // // // // // // // // // // // //                     <span className="lang-to">{item.targetLang}</span>
// // // // // // // // // // // // // // // //                   </div>
// // // // // // // // // // // // // // // //                   <div className="recent-text">
// // // // // // // // // // // // // // // //                     <p className="source-text">{item.sourceText.substring(0, 50)}...</p>
// // // // // // // // // // // // // // // //                     <p className="translated-text">{item.translatedText.substring(0, 50)}...</p>
// // // // // // // // // // // // // // // //                   </div>
// // // // // // // // // // // // // // // //                   <button 
// // // // // // // // // // // // // // // //                     onClick={() => {
// // // // // // // // // // // // // // // //                       setSourceLang(Object.keys(languages).find(k => languages[k]?.name === item.sourceLang) || 'en');
// // // // // // // // // // // // // // // //                       setTargetLang(Object.keys(languages).find(k => languages[k]?.name === item.targetLang) || 'te');
// // // // // // // // // // // // // // // //                       setPasteText(item.sourceText);
// // // // // // // // // // // // // // // //                       setTranscript(item.sourceText);
// // // // // // // // // // // // // // // //                       setTranslatedText(item.translatedText);
// // // // // // // // // // // // // // // //                     }}
// // // // // // // // // // // // // // // //                     className="reuse-btn"
// // // // // // // // // // // // // // // //                   >
// // // // // // // // // // // // // // // //                     ↺ Reuse
// // // // // // // // // // // // // // // //                   </button>
// // // // // // // // // // // // // // // //                 </div>
// // // // // // // // // // // // // // // //               ))}
// // // // // // // // // // // // // // // //             </div>
// // // // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // // // //         )}

// // // // // // // // // // // // // // // //         {/* Language Support Info */}
// // // // // // // // // // // // // // // //         <div className="language-support">
// // // // // // // // // // // // // // // //           <h3>🌐 Supported Languages</h3>
// // // // // // // // // // // // // // // //           <div className="language-categories">
// // // // // // // // // // // // // // // //             <div className="category">
// // // // // // // // // // // // // // // //               <h4>🇮🇳 Indian Languages</h4>
// // // // // // // // // // // // // // // //               <div className="lang-list">
// // // // // // // // // // // // // // // //                 {languageGroups.indian.map(code => (
// // // // // // // // // // // // // // // //                   <span key={code} className="lang-tag">
// // // // // // // // // // // // // // // //                     {languages[code]?.flag} {languages[code]?.name}
// // // // // // // // // // // // // // // //                   </span>
// // // // // // // // // // // // // // // //                 ))}
// // // // // // // // // // // // // // // //               </div>
// // // // // // // // // // // // // // // //             </div>
// // // // // // // // // // // // // // // //             <div className="category">
// // // // // // // // // // // // // // // //               <h4>🌍 International</h4>
// // // // // // // // // // // // // // // //               <div className="lang-list">
// // // // // // // // // // // // // // // //                 {languageGroups.international.map(code => (
// // // // // // // // // // // // // // // //                   <span key={code} className="lang-tag">
// // // // // // // // // // // // // // // //                     {languages[code]?.flag} {languages[code]?.name}
// // // // // // // // // // // // // // // //                   </span>
// // // // // // // // // // // // // // // //                 ))}
// // // // // // // // // // // // // // // //               </div>
// // // // // // // // // // // // // // // //             </div>
// // // // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // // // //         </div>
// // // // // // // // // // // // // // // //       </div>

// // // // // // // // // // // // // // // //       {/* Status Bar */}
// // // // // // // // // // // // // // // //       <div className="status-bar">
// // // // // // // // // // // // // // // //         <p>
// // // // // // // // // // // // // // // //           {isListening ? `🎤 Listening in ${languages[sourceLang]?.name}...` :
// // // // // // // // // // // // // // // //            isTranslating ? `🔄 Translating ${languages[sourceLang]?.name} → ${languages[targetLang]?.name}` :
// // // // // // // // // // // // // // // //            isSpeaking ? `🔊 Speaking in ${languages[targetLang]?.name}` :
// // // // // // // // // // // // // // // //            translatedText ? `✅ ${languages[sourceLang]?.name} → ${languages[targetLang]?.name}` :
// // // // // // // // // // // // // // // //            '🟢 Ready to translate'}
// // // // // // // // // // // // // // // //         </p>
// // // // // // // // // // // // // // // //       </div>
// // // // // // // // // // // // // // // //     </div>
// // // // // // // // // // // // // // // //   );
// // // // // // // // // // // // // // // // };

// // // // // // // // // // // // // // // // export default LanguageTranslator;







// // // // // // // // // // // // // // // // LanguageTranslator.jsx - MULTI-LANGUAGE VERSION WITH VOICE COMMANDS
// // // // // // // // // // // // // // // import React, { useState, useEffect, useRef } from 'react';
// // // // // // // // // // // // // // // import { useNavigate } from 'react-router-dom';
// // // // // // // // // // // // // // // import { voiceService } from '../../services/voiceService';
// // // // // // // // // // // // // // // import { initializeLanguageTranslatorCommands } from '../../voice-commands/languageTranslatorCommands';
// // // // // // // // // // // // // // // import './LanguageTranslator.css';

// // // // // // // // // // // // // // // const LanguageTranslator = () => {
// // // // // // // // // // // // // // //   const navigate = useNavigate();
  
// // // // // // // // // // // // // // //   // State declarations
// // // // // // // // // // // // // // //   const [isListening, setIsListening] = useState(false);
// // // // // // // // // // // // // // //   const [transcript, setTranscript] = useState('');
// // // // // // // // // // // // // // //   const [translatedText, setTranslatedText] = useState('');
// // // // // // // // // // // // // // //   const [isTranslating, setIsTranslating] = useState(false);
// // // // // // // // // // // // // // //   const [error, setError] = useState('');
// // // // // // // // // // // // // // //   const [isSpeaking, setIsSpeaking] = useState(false);
// // // // // // // // // // // // // // //   const [sourceLang, setSourceLang] = useState('en');
// // // // // // // // // // // // // // //   const [targetLang, setTargetLang] = useState('te');
// // // // // // // // // // // // // // //   const [recognitionSupported, setRecognitionSupported] = useState(true);
// // // // // // // // // // // // // // //   const [statusMessage, setStatusMessage] = useState('Ready to translate');
// // // // // // // // // // // // // // //   const [isPasteMode, setIsPasteMode] = useState(false);
// // // // // // // // // // // // // // //   const [pasteText, setPasteText] = useState('');
// // // // // // // // // // // // // // //   const [apiStatus, setApiStatus] = useState('✅ API Ready');
// // // // // // // // // // // // // // //   const [recentTranslations, setRecentTranslations] = useState([]);
// // // // // // // // // // // // // // //   const [detectedLanguage, setDetectedLanguage] = useState('');
// // // // // // // // // // // // // // //   const [showVoiceHelp, setShowVoiceHelp] = useState(false);
  
// // // // // // // // // // // // // // //   // Refs
// // // // // // // // // // // // // // //   const recognitionRef = useRef(null);
// // // // // // // // // // // // // // //   const synthesisRef = useRef(null);
// // // // // // // // // // // // // // //   const textareaRef = useRef(null);
// // // // // // // // // // // // // // //   const componentRef = useRef(null);
  
// // // // // // // // // // // // // // //   // ✅ EXTENDED LANGUAGE SUPPORT (15+ languages)
// // // // // // // // // // // // // // //   const languages = {
// // // // // // // // // // // // // // //     // Indian Languages
// // // // // // // // // // // // // // //     en: { code: 'en', name: 'English', nativeName: 'English', voice: 'en-US', flag: '🇺🇸' },
// // // // // // // // // // // // // // //     te: { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', voice: 'te-IN', flag: '🇮🇳' },
// // // // // // // // // // // // // // //     hi: { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', voice: 'hi-IN', flag: '🇮🇳' },
// // // // // // // // // // // // // // //     ta: { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', voice: 'ta-IN', flag: '🇮🇳' },
// // // // // // // // // // // // // // //     kn: { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', voice: 'kn-IN', flag: '🇮🇳' },
// // // // // // // // // // // // // // //     ml: { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', voice: 'ml-IN', flag: '🇮🇳' },
// // // // // // // // // // // // // // //     mr: { code: 'mr', name: 'Marathi', nativeName: 'मराठी', voice: 'mr-IN', flag: '🇮🇳' },
// // // // // // // // // // // // // // //     gu: { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', voice: 'gu-IN', flag: '🇮🇳' },
// // // // // // // // // // // // // // //     bn: { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', voice: 'bn-IN', flag: '🇮🇳' },
// // // // // // // // // // // // // // //     pa: { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', voice: 'pa-IN', flag: '🇮🇳' },
// // // // // // // // // // // // // // //     or: { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ', voice: 'or-IN', flag: '🇮🇳' },
    
// // // // // // // // // // // // // // //     // International Languages
// // // // // // // // // // // // // // //     es: { code: 'es', name: 'Spanish', nativeName: 'Español', voice: 'es-ES', flag: '🇪🇸' },
// // // // // // // // // // // // // // //     fr: { code: 'fr', name: 'French', nativeName: 'Français', voice: 'fr-FR', flag: '🇫🇷' },
// // // // // // // // // // // // // // //     de: { code: 'de', name: 'German', nativeName: 'Deutsch', voice: 'de-DE', flag: '🇩🇪' },
// // // // // // // // // // // // // // //     it: { code: 'it', name: 'Italian', nativeName: 'Italiano', voice: 'it-IT', flag: '🇮🇹' },
// // // // // // // // // // // // // // //     pt: { code: 'pt', name: 'Portuguese', nativeName: 'Português', voice: 'pt-PT', flag: '🇵🇹' },
// // // // // // // // // // // // // // //     ru: { code: 'ru', name: 'Russian', nativeName: 'Русский', voice: 'ru-RU', flag: '🇷🇺' },
// // // // // // // // // // // // // // //     ja: { code: 'ja', name: 'Japanese', nativeName: '日本語', voice: 'ja-JP', flag: '🇯🇵' },
// // // // // // // // // // // // // // //     ko: { code: 'ko', name: 'Korean', nativeName: '한국어', voice: 'ko-KR', flag: '🇰🇷' },
// // // // // // // // // // // // // // //     zh: { code: 'zh', name: 'Chinese', nativeName: '中文', voice: 'zh-CN', flag: '🇨🇳' },
// // // // // // // // // // // // // // //     ar: { code: 'ar', name: 'Arabic', nativeName: 'العربية', voice: 'ar-SA', flag: '🇸🇦' },
    
// // // // // // // // // // // // // // //     // Other Indian
// // // // // // // // // // // // // // //     ur: { code: 'ur', name: 'Urdu', nativeName: 'اردو', voice: 'ur-PK', flag: '🇵🇰' },
// // // // // // // // // // // // // // //     as: { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া', voice: 'as-IN', flag: '🇮🇳' },
// // // // // // // // // // // // // // //     sa: { code: 'sa', name: 'Sanskrit', nativeName: 'संस्कृतम्', voice: 'sa-IN', flag: '🇮🇳' }
// // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // //   // Language groups for organization
// // // // // // // // // // // // // // //   const languageGroups = {
// // // // // // // // // // // // // // //     indian: ['te', 'hi', 'ta', 'kn', 'ml', 'mr', 'gu', 'bn', 'pa', 'or', 'ur', 'as', 'sa'],
// // // // // // // // // // // // // // //     international: ['en', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'ja', 'ko', 'zh', 'ar'],
// // // // // // // // // // // // // // //     popular: ['en', 'hi', 'te', 'ta', 'es', 'fr', 'de', 'ja']
// // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // //   // ✅ VOICE COMMANDS INTEGRATION
// // // // // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // // // // //     // Store component methods in ref for voice command access
// // // // // // // // // // // // // // //     componentRef.current = {
// // // // // // // // // // // // // // //       // Navigation
// // // // // // // // // // // // // // //       handleBackToDashboard,
// // // // // // // // // // // // // // //       handleLogout,
      
// // // // // // // // // // // // // // //       // State and refs
// // // // // // // // // // // // // // //       isListening,
// // // // // // // // // // // // // // //       setIsListening,
// // // // // // // // // // // // // // //       transcript,
// // // // // // // // // // // // // // //       setTranscript,
// // // // // // // // // // // // // // //       translatedText,
// // // // // // // // // // // // // // //       setTranslatedText,
// // // // // // // // // // // // // // //       pasteText,
// // // // // // // // // // // // // // //       setPasteText,
// // // // // // // // // // // // // // //       error,
// // // // // // // // // // // // // // //       setError,
// // // // // // // // // // // // // // //       statusMessage,
// // // // // // // // // // // // // // //       setStatusMessage,
// // // // // // // // // // // // // // //       sourceLang,
// // // // // // // // // // // // // // //       setSourceLang,
// // // // // // // // // // // // // // //       targetLang,
// // // // // // // // // // // // // // //       setTargetLang,
// // // // // // // // // // // // // // //       recognitionRef,
// // // // // // // // // // // // // // //       languages,
      
// // // // // // // // // // // // // // //       // Methods
// // // // // // // // // // // // // // //       clearAll,
// // // // // // // // // // // // // // //       swapLanguages,
// // // // // // // // // // // // // // //       handleTranslate,
// // // // // // // // // // // // // // //       speakText,
// // // // // // // // // // // // // // //       handleAutoDetect,
// // // // // // // // // // // // // // //       setQuickLanguage,
      
// // // // // // // // // // // // // // //       // Other
// // // // // // // // // // // // // // //       setIsSpeaking,
// // // // // // // // // // // // // // //       setIsPasteMode
// // // // // // // // // // // // // // //     };
    
// // // // // // // // // // // // // // //     // Initialize voice commands
// // // // // // // // // // // // // // //     const cleanup = initializeLanguageTranslatorCommands(componentRef);
    
// // // // // // // // // // // // // // //     // Start voice service listening
// // // // // // // // // // // // // // //     // if (voiceService.isAvailable()) {
// // // // // // // // // // // // // // //     //   voiceService.startListening();
// // // // // // // // // // // // // // //     // }
    
// // // // // // // // // // // // // // //     // Cleanup on unmount
// // // // // // // // // // // // // // //     return () => {
// // // // // // // // // // // // // // //       cleanup?.();
// // // // // // // // // // // // // // //       voiceService.stopListening();
// // // // // // // // // // // // // // //     };
// // // // // // // // // // // // // // //   }, []);

// // // // // // // // // // // // // // //   // Update componentRef when state changes
// // // // // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // // // // //     if (componentRef.current) {
// // // // // // // // // // // // // // //       componentRef.current = {
// // // // // // // // // // // // // // //         ...componentRef.current,
// // // // // // // // // // // // // // //         isListening,
// // // // // // // // // // // // // // //         transcript,
// // // // // // // // // // // // // // //         translatedText,
// // // // // // // // // // // // // // //         pasteText,
// // // // // // // // // // // // // // //         sourceLang,
// // // // // // // // // // // // // // //         targetLang,
// // // // // // // // // // // // // // //         error,
// // // // // // // // // // // // // // //         statusMessage
// // // // // // // // // // // // // // //       };
// // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // //   }, [isListening, transcript, translatedText, pasteText, sourceLang, targetLang, error, statusMessage]);

// // // // // // // // // // // // // // //   // Voice feedback functions
// // // // // // // // // // // // // // //   const speakFeedback = (message) => {
// // // // // // // // // // // // // // //     if (voiceService && window.speechSynthesis) {
// // // // // // // // // // // // // // //       voiceService.speak(message);
// // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // //   const handleTranslateWithFeedback = async (text) => {
// // // // // // // // // // // // // // //     if (!text.trim()) {
// // // // // // // // // // // // // // //       speakFeedback('Please enter some text to translate');
// // // // // // // // // // // // // // //       return;
// // // // // // // // // // // // // // //     }
    
// // // // // // // // // // // // // // //     speakFeedback(`Translating to ${languages[targetLang]?.name}`);
// // // // // // // // // // // // // // //     await handleTranslate(text);
// // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // //   const swapLanguagesWithFeedback = () => {
// // // // // // // // // // // // // // //     speakFeedback(`Swapping ${languages[sourceLang]?.name} and ${languages[targetLang]?.name}`);
// // // // // // // // // // // // // // //     swapLanguages();
// // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // //   const clearAllWithFeedback = () => {
// // // // // // // // // // // // // // //     speakFeedback('Clearing all text');
// // // // // // // // // // // // // // //     clearAll();
// // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // //   // ✅ AUTO-DETECT LANGUAGE FUNCTION
// // // // // // // // // // // // // // //   const detectLanguage = async (text) => {
// // // // // // // // // // // // // // //     if (!text.trim() || text.length < 3) return null;
    
// // // // // // // // // // // // // // //     try {
// // // // // // // // // // // // // // //       // Simple detection based on character ranges
// // // // // // // // // // // // // // //       const detectByScript = (text) => {
// // // // // // // // // // // // // // //         // Telugu: 0C00-0C7F
// // // // // // // // // // // // // // //         if (/[\u0C00-\u0C7F]/.test(text)) return 'te';
        
// // // // // // // // // // // // // // //         // Hindi/Devanagari: 0900-097F
// // // // // // // // // // // // // // //         if (/[\u0900-\u097F]/.test(text)) return 'hi';
        
// // // // // // // // // // // // // // //         // Tamil: 0B80-0BFF
// // // // // // // // // // // // // // //         if (/[\u0B80-\u0BFF]/.test(text)) return 'ta';
        
// // // // // // // // // // // // // // //         // Kannada: 0C80-0CFF
// // // // // // // // // // // // // // //         if (/[\u0C80-\u0CFF]/.test(text)) return 'kn';
        
// // // // // // // // // // // // // // //         // Malayalam: 0D00-0D7F
// // // // // // // // // // // // // // //         if (/[\u0D00-\u0D7F]/.test(text)) return 'ml';
        
// // // // // // // // // // // // // // //         // Gujarati: 0A80-0AFF
// // // // // // // // // // // // // // //         if (/[\u0A80-\u0AFF]/.test(text)) return 'gu';
        
// // // // // // // // // // // // // // //         // Bengali: 0980-09FF
// // // // // // // // // // // // // // //         if (/[\u0980-\u09FF]/.test(text)) return 'bn';
        
// // // // // // // // // // // // // // //         // Arabic: 0600-06FF
// // // // // // // // // // // // // // //         if (/[\u0600-\u06FF]/.test(text)) return 'ar';
        
// // // // // // // // // // // // // // //         // Chinese/Japanese/Korean
// // // // // // // // // // // // // // //         if (/[\u4E00-\u9FFF]/.test(text)) return 'zh'; // Chinese
// // // // // // // // // // // // // // //         if (/[\u3040-\u309F\u30A0-\u30FF]/.test(text)) return 'ja'; // Japanese
// // // // // // // // // // // // // // //         if (/[\uAC00-\uD7AF]/.test(text)) return 'ko'; // Korean
        
// // // // // // // // // // // // // // //         // Cyrillic (Russian)
// // // // // // // // // // // // // // //         if (/[\u0400-\u04FF]/.test(text)) return 'ru';
        
// // // // // // // // // // // // // // //         // Default to English
// // // // // // // // // // // // // // //         return 'en';
// // // // // // // // // // // // // // //       };
      
// // // // // // // // // // // // // // //       const detected = detectByScript(text);
// // // // // // // // // // // // // // //       setDetectedLanguage(detected);
// // // // // // // // // // // // // // //       return detected;
// // // // // // // // // // // // // // //     } catch (err) {
// // // // // // // // // // // // // // //       console.error('Language detection error:', err);
// // // // // // // // // // // // // // //       return null;
// // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // //   // ✅ REAL TRANSLATION FUNCTION - Supports all languages
// // // // // // // // // // // // // // //   const handleTranslate = async (text) => {
// // // // // // // // // // // // // // //     if (!text.trim()) return;
    
// // // // // // // // // // // // // // //     setIsTranslating(true);
// // // // // // // // // // // // // // //     setStatusMessage('Translating...');
// // // // // // // // // // // // // // //     setError('');
    
// // // // // // // // // // // // // // //     try {
// // // // // // // // // // // // // // //       // Auto-detect source language if not set
// // // // // // // // // // // // // // //       let detectedSourceLang = sourceLang;
// // // // // // // // // // // // // // //       if (sourceLang === 'auto') {
// // // // // // // // // // // // // // //         const detected = await detectLanguage(text);
// // // // // // // // // // // // // // //         if (detected) {
// // // // // // // // // // // // // // //           detectedSourceLang = detected;
// // // // // // // // // // // // // // //           setStatusMessage(`Detected: ${languages[detected]?.name}. Translating...`);
// // // // // // // // // // // // // // //         }
// // // // // // // // // // // // // // //       }
      
// // // // // // // // // // // // // // //       // Try multiple translation services
// // // // // // // // // // // // // // //       const translation = await translateWithMultipleServices(text, detectedSourceLang, targetLang);
      
// // // // // // // // // // // // // // //       if (translation) {
// // // // // // // // // // // // // // //         setTranslatedText(translation);
// // // // // // // // // // // // // // //         setStatusMessage('Translation complete');
        
// // // // // // // // // // // // // // //         // Add to recent translations
// // // // // // // // // // // // // // //         addToRecentTranslations({
// // // // // // // // // // // // // // //           sourceText: text,
// // // // // // // // // // // // // // //           translatedText: translation,
// // // // // // // // // // // // // // //           sourceLang: languages[detectedSourceLang]?.name,
// // // // // // // // // // // // // // //           targetLang: languages[targetLang]?.name,
// // // // // // // // // // // // // // //           timestamp: new Date().toISOString()
// // // // // // // // // // // // // // //         });
// // // // // // // // // // // // // // //       } else {
// // // // // // // // // // // // // // //         throw new Error('All translation services failed');
// // // // // // // // // // // // // // //       }
// // // // // // // // // // // // // // //     } catch (err) {
// // // // // // // // // // // // // // //       console.error('Translation error:', err);
// // // // // // // // // // // // // // //       setError('Translation service temporarily unavailable. Please try again.');
// // // // // // // // // // // // // // //       setTranslatedText(getOfflineTranslation(text, sourceLang, targetLang));
// // // // // // // // // // // // // // //       setStatusMessage('Using offline translation');
// // // // // // // // // // // // // // //     } finally {
// // // // // // // // // // // // // // //       setIsTranslating(false);
// // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // //   // ✅ MULTI-SERVICE TRANSLATION WITH FALLBACKS
// // // // // // // // // // // // // // //   const translateWithMultipleServices = async (text, fromLang, toLang) => {
// // // // // // // // // // // // // // //     const services = [
// // // // // // // // // // // // // // //       tryLibreTranslate,
// // // // // // // // // // // // // // //       tryGoogleTranslate,
// // // // // // // // // // // // // // //       tryMyMemoryTranslate,
// // // // // // // // // // // // // // //       tryArgosTranslate
// // // // // // // // // // // // // // //     ];
    
// // // // // // // // // // // // // // //     for (const service of services) {
// // // // // // // // // // // // // // //       try {
// // // // // // // // // // // // // // //         const result = await service(text, fromLang, toLang);
// // // // // // // // // // // // // // //         if (result && result.trim()) {
// // // // // // // // // // // // // // //           console.log(`Success with ${service.name}:`, result);
// // // // // // // // // // // // // // //           return result;
// // // // // // // // // // // // // // //         }
// // // // // // // // // // // // // // //       } catch (err) {
// // // // // // // // // // // // // // //         console.warn(`${service.name} failed:`, err.message);
// // // // // // // // // // // // // // //         continue;
// // // // // // // // // // // // // // //       }
// // // // // // // // // // // // // // //     }
    
// // // // // // // // // // // // // // //     return null;
// // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // //   // Service 1: LibreTranslate
// // // // // // // // // // // // // // //   const tryLibreTranslate = async (text, fromLang, toLang) => {
// // // // // // // // // // // // // // //     try {
// // // // // // // // // // // // // // //       const response = await fetch('https://libretranslate.com/translate', {
// // // // // // // // // // // // // // //         method: 'POST',
// // // // // // // // // // // // // // //         headers: { 'Content-Type': 'application/json' },
// // // // // // // // // // // // // // //         body: JSON.stringify({
// // // // // // // // // // // // // // //           q: text,
// // // // // // // // // // // // // // //           source: fromLang,
// // // // // // // // // // // // // // //           target: toLang,
// // // // // // // // // // // // // // //           format: 'text'
// // // // // // // // // // // // // // //         })
// // // // // // // // // // // // // // //       });
      
// // // // // // // // // // // // // // //       if (response.ok) {
// // // // // // // // // // // // // // //         const data = await response.json();
// // // // // // // // // // // // // // //         return data.translatedText;
// // // // // // // // // // // // // // //       }
// // // // // // // // // // // // // // //       return null;
// // // // // // // // // // // // // // //     } catch (err) {
// // // // // // // // // // // // // // //       throw err;
// // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // //   // Service 2: Google Translate (unofficial)
// // // // // // // // // // // // // // //   const tryGoogleTranslate = async (text, fromLang, toLang) => {
// // // // // // // // // // // // // // //     try {
// // // // // // // // // // // // // // //       const response = await fetch(
// // // // // // // // // // // // // // //         `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${fromLang}&tl=${toLang}&dt=t&q=${encodeURIComponent(text)}`
// // // // // // // // // // // // // // //       );
      
// // // // // // // // // // // // // // //       if (response.ok) {
// // // // // // // // // // // // // // //         const data = await response.json();
// // // // // // // // // // // // // // //         return data[0][0][0];
// // // // // // // // // // // // // // //       }
// // // // // // // // // // // // // // //       return null;
// // // // // // // // // // // // // // //     } catch (err) {
// // // // // // // // // // // // // // //       throw err;
// // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // //   // Service 3: MyMemory Translate
// // // // // // // // // // // // // // //   const tryMyMemoryTranslate = async (text, fromLang, toLang) => {
// // // // // // // // // // // // // // //     try {
// // // // // // // // // // // // // // //       const response = await fetch(
// // // // // // // // // // // // // // //         `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${fromLang}|${toLang}`
// // // // // // // // // // // // // // //       );
      
// // // // // // // // // // // // // // //       if (response.ok) {
// // // // // // // // // // // // // // //         const data = await response.json();
// // // // // // // // // // // // // // //         return data.responseData.translatedText;
// // // // // // // // // // // // // // //       }
// // // // // // // // // // // // // // //       return null;
// // // // // // // // // // // // // // //     } catch (err) {
// // // // // // // // // // // // // // //       throw err;
// // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // //   // Service 4: Argos Translate
// // // // // // // // // // // // // // //   const tryArgosTranslate = async (text, fromLang, toLang) => {
// // // // // // // // // // // // // // //     try {
// // // // // // // // // // // // // // //       const response = await fetch('https://translate.argosopentech.com/translate', {
// // // // // // // // // // // // // // //         method: 'POST',
// // // // // // // // // // // // // // //         headers: { 'Content-Type': 'application/json' },
// // // // // // // // // // // // // // //         body: JSON.stringify({
// // // // // // // // // // // // // // //           q: text,
// // // // // // // // // // // // // // //           source: fromLang,
// // // // // // // // // // // // // // //           target: toLang
// // // // // // // // // // // // // // //         })
// // // // // // // // // // // // // // //       });
      
// // // // // // // // // // // // // // //       if (response.ok) {
// // // // // // // // // // // // // // //         const data = await response.json();
// // // // // // // // // // // // // // //         return data.translatedText;
// // // // // // // // // // // // // // //       }
// // // // // // // // // // // // // // //       return null;
// // // // // // // // // // // // // // //     } catch (err) {
// // // // // // // // // // // // // // //       throw err;
// // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // //   // ✅ OFFLINE FALLBACK DICTIONARY
// // // // // // // // // // // // // // //   const getOfflineTranslation = (text, fromLang, toLang) => {
// // // // // // // // // // // // // // //     // Common phrases for all languages
// // // // // // // // // // // // // // //     const phrases = {
// // // // // // // // // // // // // // //       'hello': {
// // // // // // // // // // // // // // //         en: 'Hello',
// // // // // // // // // // // // // // //         te: 'హలో',
// // // // // // // // // // // // // // //         hi: 'नमस्ते',
// // // // // // // // // // // // // // //         ta: 'வணக்கம்',
// // // // // // // // // // // // // // //         kn: 'ನಮಸ್ಕಾರ',
// // // // // // // // // // // // // // //         ml: 'ഹലോ',
// // // // // // // // // // // // // // //         es: 'Hola',
// // // // // // // // // // // // // // //         fr: 'Bonjour',
// // // // // // // // // // // // // // //         de: 'Hallo',
// // // // // // // // // // // // // // //         ja: 'こんにちは',
// // // // // // // // // // // // // // //         ko: '안녕하세요',
// // // // // // // // // // // // // // //         zh: '你好',
// // // // // // // // // // // // // // //         ar: 'مرحبا'
// // // // // // // // // // // // // // //       },
// // // // // // // // // // // // // // //       'thank you': {
// // // // // // // // // // // // // // //         en: 'Thank you',
// // // // // // // // // // // // // // //         te: 'ధన్యవాదాలు',
// // // // // // // // // // // // // // //         hi: 'धन्यवाद',
// // // // // // // // // // // // // // //         ta: 'நன்றி',
// // // // // // // // // // // // // // //         kn: 'ಧನ್ಯವಾದಗಳು',
// // // // // // // // // // // // // // //         ml: 'നന്ദി',
// // // // // // // // // // // // // // //         es: 'Gracias',
// // // // // // // // // // // // // // //         fr: 'Merci',
// // // // // // // // // // // // // // //         de: 'Danke',
// // // // // // // // // // // // // // //         ja: 'ありがとう',
// // // // // // // // // // // // // // //         ko: '감사합니다',
// // // // // // // // // // // // // // //         zh: '谢谢',
// // // // // // // // // // // // // // //         ar: 'شكرا'
// // // // // // // // // // // // // // //       },
// // // // // // // // // // // // // // //       'how are you': {
// // // // // // // // // // // // // // //         en: 'How are you?',
// // // // // // // // // // // // // // //         te: 'మీరు ఎలా ఉన్నారు?',
// // // // // // // // // // // // // // //         hi: 'आप कैसे हैं?',
// // // // // // // // // // // // // // //         ta: 'நீங்கள் எப்படி இருக்கிறீர்கள்?',
// // // // // // // // // // // // // // //         kn: 'ನೀವು ಹೇಗಿದ್ದೀರಿ?',
// // // // // // // // // // // // // // //         ml: 'നീ എങ്ങനെ ഉണ്ട്?',
// // // // // // // // // // // // // // //         es: '¿Cómo estás?',
// // // // // // // // // // // // // // //         fr: 'Comment allez-vous?',
// // // // // // // // // // // // // // //         de: 'Wie geht es dir?',
// // // // // // // // // // // // // // //         ja: 'お元気ですか？',
// // // // // // // // // // // // // // //         ko: '어떻게 지내세요?',
// // // // // // // // // // // // // // //         zh: '你好吗？',
// // // // // // // // // // // // // // //         ar: 'كيف حالك؟'
// // // // // // // // // // // // // // //       }
// // // // // // // // // // // // // // //     };
    
// // // // // // // // // // // // // // //     const lowerText = text.toLowerCase().trim();
    
// // // // // // // // // // // // // // //     // Check for phrase match
// // // // // // // // // // // // // // //     for (const [phrase, translations] of Object.entries(phrases)) {
// // // // // // // // // // // // // // //       if (lowerText.includes(phrase) && translations[fromLang] && translations[toLang]) {
// // // // // // // // // // // // // // //         return translations[toLang];
// // // // // // // // // // // // // // //       }
// // // // // // // // // // // // // // //     }
    
// // // // // // // // // // // // // // //     // Word-by-word fallback for common words
// // // // // // // // // // // // // // //     const commonWords = {
// // // // // // // // // // // // // // //       'water': { te: 'నీరు', hi: 'पानी', ta: 'நீர்', en: 'water' },
// // // // // // // // // // // // // // //       'food': { te: 'ఆహారం', hi: 'भोजन', ta: 'உணவு', en: 'food' },
// // // // // // // // // // // // // // //       'help': { te: 'సహాయం', hi: 'मदद', ta: 'உதவி', en: 'help' },
// // // // // // // // // // // // // // //       'money': { te: 'డబ్బు', hi: 'पैसा', ta: 'பணம்', en: 'money' },
// // // // // // // // // // // // // // //       'home': { te: 'ఇల్లు', hi: 'घर', ta: 'வீடு', en: 'home' }
// // // // // // // // // // // // // // //     };
    
// // // // // // // // // // // // // // //     const words = text.split(' ');
// // // // // // // // // // // // // // //     const translatedWords = words.map(word => {
// // // // // // // // // // // // // // //       const lowerWord = word.toLowerCase();
// // // // // // // // // // // // // // //       if (commonWords[lowerWord] && commonWords[lowerWord][toLang]) {
// // // // // // // // // // // // // // //         return commonWords[lowerWord][toLang];
// // // // // // // // // // // // // // //       }
// // // // // // // // // // // // // // //       return word;
// // // // // // // // // // // // // // //     });
    
// // // // // // // // // // // // // // //     return `[Offline] ${translatedWords.join(' ')}`;
// // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // //   // Add to recent translations
// // // // // // // // // // // // // // //   const addToRecentTranslations = (translation) => {
// // // // // // // // // // // // // // //     setRecentTranslations(prev => [translation, ...prev.slice(0, 4)]);
// // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // //   // ✅ SPEECH SYNTHESIS FOR ALL LANGUAGES
// // // // // // // // // // // // // // //   const speakText = (text) => {
// // // // // // // // // // // // // // //     if (!text || !window.speechSynthesis) {
// // // // // // // // // // // // // // //       setError('Text-to-speech not supported');
// // // // // // // // // // // // // // //       return;
// // // // // // // // // // // // // // //     }
    
// // // // // // // // // // // // // // //     window.speechSynthesis.cancel();
    
// // // // // // // // // // // // // // //     const utterance = new SpeechSynthesisUtterance(text);
// // // // // // // // // // // // // // //     utterance.lang = languages[targetLang]?.voice || 'en-US';
// // // // // // // // // // // // // // //     utterance.rate = 0.8;
// // // // // // // // // // // // // // //     utterance.pitch = 1;
// // // // // // // // // // // // // // //     utterance.volume = 1;
    
// // // // // // // // // // // // // // //     // Try to find appropriate voice
// // // // // // // // // // // // // // //     const voices = window.speechSynthesis.getVoices();
// // // // // // // // // // // // // // //     const targetVoice = voices.find(voice => 
// // // // // // // // // // // // // // //       voice.lang.startsWith(targetLang) || 
// // // // // // // // // // // // // // //       voice.lang.includes(languages[targetLang]?.name.toLowerCase())
// // // // // // // // // // // // // // //     );
    
// // // // // // // // // // // // // // //     if (targetVoice) {
// // // // // // // // // // // // // // //       utterance.voice = targetVoice;
// // // // // // // // // // // // // // //     }
    
// // // // // // // // // // // // // // //     utterance.onstart = () => {
// // // // // // // // // // // // // // //       setIsSpeaking(true);
// // // // // // // // // // // // // // //       setStatusMessage(`Speaking in ${languages[targetLang]?.name}...`);
// // // // // // // // // // // // // // //     };
    
// // // // // // // // // // // // // // //     utterance.onend = () => {
// // // // // // // // // // // // // // //       setIsSpeaking(false);
// // // // // // // // // // // // // // //       setStatusMessage('Ready');
// // // // // // // // // // // // // // //     };
    
// // // // // // // // // // // // // // //     utterance.onerror = () => {
// // // // // // // // // // // // // // //       setIsSpeaking(false);
// // // // // // // // // // // // // // //       setStatusMessage('Speech synthesis failed');
// // // // // // // // // // // // // // //     };
    
// // // // // // // // // // // // // // //     window.speechSynthesis.speak(utterance);
// // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // //   // Initialize speech recognition
// // // // // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // // // // //     if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
// // // // // // // // // // // // // // //       setRecognitionSupported(false);
// // // // // // // // // // // // // // //       return;
// // // // // // // // // // // // // // //     }

// // // // // // // // // // // // // // //   //   try {
// // // // // // // // // // // // // // //   //     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
// // // // // // // // // // // // // // //   //     recognitionRef.current = new SpeechRecognition();
      
// // // // // // // // // // // // // // //   //     recognitionRef.current.continuous = false;
// // // // // // // // // // // // // // //   //     recognitionRef.current.interimResults = false;
// // // // // // // // // // // // // // //   //     recognitionRef.current.lang = languages[sourceLang]?.voice || 'en-US';
      
// // // // // // // // // // // // // // //   //     recognitionRef.current.onresult = (event) => {
// // // // // // // // // // // // // // //   //       const text = event.results[0][0].transcript;
// // // // // // // // // // // // // // //   //       setTranscript(text);
// // // // // // // // // // // // // // //   //       setStatusMessage('Translating...');
// // // // // // // // // // // // // // //   //       handleTranslate(text);
// // // // // // // // // // // // // // //   //     };
      
// // // // // // // // // // // // // // //   //     recognitionRef.current.onerror = (event) => {
// // // // // // // // // // // // // // //   //       setIsListening(false);
// // // // // // // // // // // // // // //   //       if (event.error === 'not-allowed') {
// // // // // // // // // // // // // // //   //         setError('Microphone access denied');
// // // // // // // // // // // // // // //   //       }
// // // // // // // // // // // // // // //   //     };
      
// // // // // // // // // // // // // // //   //     recognitionRef.current.onend = () => {
// // // // // // // // // // // // // // //   //       setIsListening(false);
// // // // // // // // // // // // // // //   //     };
      
// // // // // // // // // // // // // // //   //   } catch (err) {
// // // // // // // // // // // // // // //   //     setRecognitionSupported(false);
// // // // // // // // // // // // // // //   //   }
    
// // // // // // // // // // // // // // //   //   return () => {
// // // // // // // // // // // // // // //   //     if (recognitionRef.current) {
// // // // // // // // // // // // // // //   //       recognitionRef.current.stop();
// // // // // // // // // // // // // // //   //     }
// // // // // // // // // // // // // // //   //     window.speechSynthesis.cancel();
// // // // // // // // // // // // // // //   //   };
// // // // // // // // // // // // // // //   }, [sourceLang]);
  
// // // // // // // // // // // // // // //   // Handle text translation
// // // // // // // // // // // // // // //   const handleTextTranslate = () => {
// // // // // // // // // // // // // // //     if (!pasteText.trim()) {
// // // // // // // // // // // // // // //       setError('Please enter text to translate');
// // // // // // // // // // // // // // //       return;
// // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // //     setTranscript(pasteText);
// // // // // // // // // // // // // // //     handleTranslate(pasteText);
// // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // //   // Clear all
// // // // // // // // // // // // // // //   const clearAll = () => {
// // // // // // // // // // // // // // //     setTranscript('');
// // // // // // // // // // // // // // //     setTranslatedText('');
// // // // // // // // // // // // // // //     setPasteText('');
// // // // // // // // // // // // // // //     setError('');
// // // // // // // // // // // // // // //     setStatusMessage('Ready');
// // // // // // // // // // // // // // //     window.speechSynthesis.cancel();
// // // // // // // // // // // // // // //     if (isListening) {
// // // // // // // // // // // // // // //       recognitionRef.current.stop();
// // // // // // // // // // // // // // //       setIsListening(false);
// // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // //   // Handle back to dashboard
// // // // // // // // // // // // // // //   const handleBackToDashboard = () => {
// // // // // // // // // // // // // // //     if (isListening) recognitionRef.current?.stop();
// // // // // // // // // // // // // // //     if (isSpeaking) window.speechSynthesis.cancel();
// // // // // // // // // // // // // // //     navigate('/dashboard');
// // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // //   // Handle logout
// // // // // // // // // // // // // // //   const handleLogout = () => {
// // // // // // // // // // // // // // //     localStorage.clear();
// // // // // // // // // // // // // // //     navigate('/');
// // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // //   // Swap languages
// // // // // // // // // // // // // // //   const swapLanguages = () => {
// // // // // // // // // // // // // // //     setSourceLang(targetLang);
// // // // // // // // // // // // // // //     setTargetLang(sourceLang);
// // // // // // // // // // // // // // //     setTranscript('');
// // // // // // // // // // // // // // //     setTranslatedText('');
// // // // // // // // // // // // // // //     setStatusMessage('Languages swapped');
// // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // //   // Copy to clipboard
// // // // // // // // // // // // // // //   const copyToClipboard = (text) => {
// // // // // // // // // // // // // // //     navigator.clipboard.writeText(text)
// // // // // // // // // // // // // // //       .then(() => {
// // // // // // // // // // // // // // //         setStatusMessage('Copied!');
// // // // // // // // // // // // // // //         setTimeout(() => setStatusMessage('Ready'), 2000);
// // // // // // // // // // // // // // //       })
// // // // // // // // // // // // // // //       .catch(() => setError('Failed to copy'));
// // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // //   // Auto-detect from text
// // // // // // // // // // // // // // //   const handleAutoDetect = async () => {
// // // // // // // // // // // // // // //     if (!pasteText.trim()) return;
// // // // // // // // // // // // // // //     const detected = await detectLanguage(pasteText);
// // // // // // // // // // // // // // //     if (detected && detected !== sourceLang) {
// // // // // // // // // // // // // // //       setSourceLang(detected);
// // // // // // // // // // // // // // //       setStatusMessage(`Auto-detected: ${languages[detected]?.name}`);
// // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // //   // Quick language set
// // // // // // // // // // // // // // //   const setQuickLanguage = (langCode) => {
// // // // // // // // // // // // // // //     setSourceLang(langCode);
// // // // // // // // // // // // // // //     setStatusMessage(`Source set to ${languages[langCode]?.name}`);
// // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // //   // Get popular language pairs
// // // // // // // // // // // // // // //   const popularPairs = [
// // // // // // // // // // // // // // //     { from: 'en', to: 'te', label: 'English → Telugu' },
// // // // // // // // // // // // // // //     { from: 'te', to: 'en', label: 'Telugu → English' },
// // // // // // // // // // // // // // //     { from: 'hi', to: 'en', label: 'Hindi → English' },
// // // // // // // // // // // // // // //     { from: 'en', to: 'hi', label: 'English → Hindi' },
// // // // // // // // // // // // // // //     { from: 'en', to: 'es', label: 'English → Spanish' },
// // // // // // // // // // // // // // //     { from: 'en', to: 'fr', label: 'English → French' }
// // // // // // // // // // // // // // //   ];

// // // // // // // // // // // // // // //   // Voice control toggle
// // // // // // // // // // // // // // //   const toggleVoiceControl = () => {
// // // // // // // // // // // // // // //     if (voiceService.isListening) {
// // // // // // // // // // // // // // //       voiceService.stopListening();
// // // // // // // // // // // // // // //       speakFeedback('Voice control disabled');
// // // // // // // // // // // // // // //     } else {
// // // // // // // // // // // // // // //       voiceService.startListening();
// // // // // // // // // // // // // // //       speakFeedback('Voice control enabled. Say "help" for commands.');
// // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // //   return (
// // // // // // // // // // // // // // //     <div className="language-translator-container">
// // // // // // // // // // // // // // //       {/* Fixed Header */}
// // // // // // // // // // // // // // //       <header className="fixed-header">
// // // // // // // // // // // // // // //         <div className="header-content">
// // // // // // // // // // // // // // //           <div className="header-left">
// // // // // // // // // // // // // // //             <button className="back-btn" onClick={handleBackToDashboard}>
// // // // // // // // // // // // // // //               ← Dashboard
// // // // // // // // // // // // // // //             </button>
// // // // // // // // // // // // // // //             <h1 className="logo">Vision Assist</h1>
// // // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // // //           <div className="user-menu">
// // // // // // // // // // // // // // //             <div className="voice-control-status">
// // // // // // // // // // // // // // //               <div className={`voice-status-indicator ${voiceService.isListening ? 'listening' : 'idle'}`}>
// // // // // // // // // // // // // // //                 {voiceService.isListening ? '🎤 Voice Active' : '🎤 Voice Ready'}
// // // // // // // // // // // // // // //               </div>
// // // // // // // // // // // // // // //               <button 
// // // // // // // // // // // // // // //                 onClick={toggleVoiceControl}
// // // // // // // // // // // // // // //                 className="voice-toggle-btn"
// // // // // // // // // // // // // // //               >
// // // // // // // // // // // // // // //                 {voiceService.isListening ? 'Mute Voice' : 'Enable Voice'}
// // // // // // // // // // // // // // //               </button>
// // // // // // // // // // // // // // //               <button 
// // // // // // // // // // // // // // //                 onClick={() => setShowVoiceHelp(!showVoiceHelp)}
// // // // // // // // // // // // // // //                 className="voice-help-btn"
// // // // // // // // // // // // // // //                 title="Voice Commands Help"
// // // // // // // // // // // // // // //               >
// // // // // // // // // // // // // // //                 ?
// // // // // // // // // // // // // // //               </button>
// // // // // // // // // // // // // // //             </div>
// // // // // // // // // // // // // // //             <span className="api-status">{apiStatus}</span>
// // // // // // // // // // // // // // //             <button className="logout-btn" onClick={handleLogout}>
// // // // // // // // // // // // // // //               Logout
// // // // // // // // // // // // // // //             </button>
// // // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // // //         </div>
// // // // // // // // // // // // // // //       </header>

// // // // // // // // // // // // // // //       <div className="language-translator-content">
// // // // // // // // // // // // // // //         {/* Voice Commands Help */}
// // // // // // // // // // // // // // //         {showVoiceHelp && (
// // // // // // // // // // // // // // //           <div className="voice-commands-help-overlay">
// // // // // // // // // // // // // // //             <div className="voice-commands-help">
// // // // // // // // // // // // // // //               <div className="help-header">
// // // // // // // // // // // // // // //                 <h3>🎤 Voice Commands</h3>
// // // // // // // // // // // // // // //                 <button onClick={() => setShowVoiceHelp(false)} className="close-btn">×</button>
// // // // // // // // // // // // // // //               </div>
              
// // // // // // // // // // // // // // //               <div className="help-content">
// // // // // // // // // // // // // // //                 <p className="help-intro">
// // // // // // // // // // // // // // //                   Say these commands to control the translator:
// // // // // // // // // // // // // // //                 </p>
                
// // // // // // // // // // // // // // //                 <div className="command-category">
// // // // // // // // // // // // // // //                   <h4>Navigation</h4>
// // // // // // // // // // // // // // //                   <div className="command-list">
// // // // // // // // // // // // // // //                     <div className="command-item">"go to dashboard"</div>
// // // // // // // // // // // // // // //                     <div className="command-item">"logout"</div>
// // // // // // // // // // // // // // //                     <div className="command-item">"help"</div>
// // // // // // // // // // // // // // //                   </div>
// // // // // // // // // // // // // // //                 </div>
                
// // // // // // // // // // // // // // //                 <div className="command-category">
// // // // // // // // // // // // // // //                   <h4>Speech Recognition</h4>
// // // // // // // // // // // // // // //                   <div className="command-list">
// // // // // // // // // // // // // // //                     <div className="command-item">"start listening"</div>
// // // // // // // // // // // // // // //                     <div className="command-item">"stop listening"</div>
// // // // // // // // // // // // // // //                     <div className="command-item">"toggle listening"</div>
// // // // // // // // // // // // // // //                   </div>
// // // // // // // // // // // // // // //                 </div>
                
// // // // // // // // // // // // // // //                 <div className="command-category">
// // // // // // // // // // // // // // //                   <h4>Translation</h4>
// // // // // // // // // // // // // // //                   <div className="command-list">
// // // // // // // // // // // // // // //                     <div className="command-item">"translate"</div>
// // // // // // // // // // // // // // //                     <div className="command-item">"speak translation"</div>
// // // // // // // // // // // // // // //                     <div className="command-item">"stop speaking"</div>
// // // // // // // // // // // // // // //                     <div className="command-item">"swap languages"</div>
// // // // // // // // // // // // // // //                   </div>
// // // // // // // // // // // // // // //                 </div>
                
// // // // // // // // // // // // // // //                 <div className="command-category">
// // // // // // // // // // // // // // //                   <h4>Text Manipulation</h4>
// // // // // // // // // // // // // // //                   <div className="command-list">
// // // // // // // // // // // // // // //                     <div className="command-item">"clear all"</div>
// // // // // // // // // // // // // // //                     <div className="command-item">"copy translation"</div>
// // // // // // // // // // // // // // //                     <div className="command-item">"copy source"</div>
// // // // // // // // // // // // // // //                   </div>
// // // // // // // // // // // // // // //                 </div>
                
// // // // // // // // // // // // // // //                 <div className="command-category">
// // // // // // // // // // // // // // //                   <h4>Language Selection</h4>
// // // // // // // // // // // // // // //                   <div className="command-list">
// // // // // // // // // // // // // // //                     <div className="command-item">"english to telugu"</div>
// // // // // // // // // // // // // // //                     <div className="command-item">"telugu to english"</div>
// // // // // // // // // // // // // // //                     <div className="command-item">"english to hindi"</div>
// // // // // // // // // // // // // // //                     <div className="command-item">"hindi to english"</div>
// // // // // // // // // // // // // // //                     <div className="command-item">"select english"</div>
// // // // // // // // // // // // // // //                     <div className="command-item">"select telugu"</div>
// // // // // // // // // // // // // // //                     <div className="command-item">"select hindi"</div>
// // // // // // // // // // // // // // //                   </div>
// // // // // // // // // // // // // // //                 </div>
                
// // // // // // // // // // // // // // //                 <div className="command-category">
// // // // // // // // // // // // // // //                   <h4>Modes</h4>
// // // // // // // // // // // // // // //                   <div className="command-list">
// // // // // // // // // // // // // // //                     <div className="command-item">"switch to voice mode"</div>
// // // // // // // // // // // // // // //                     <div className="command-item">"switch to text mode"</div>
// // // // // // // // // // // // // // //                     <div className="command-item">"detect language"</div>
// // // // // // // // // // // // // // //                   </div>
// // // // // // // // // // // // // // //                 </div>
                
// // // // // // // // // // // // // // //                 <div className="tips">
// // // // // // // // // // // // // // //                   <h4>💡 Tips:</h4>
// // // // // // // // // // // // // // //                   <ul>
// // // // // // // // // // // // // // //                     <li>Speak clearly and naturally</li>
// // // // // // // // // // // // // // //                     <li>Pause briefly between commands</li>
// // // // // // // // // // // // // // //                     <li>Say "what can I say" for quick command list</li>
// // // // // // // // // // // // // // //                     <li>Voice works best in quiet environments</li>
// // // // // // // // // // // // // // //                   </ul>
// // // // // // // // // // // // // // //                 </div>
// // // // // // // // // // // // // // //               </div>
// // // // // // // // // // // // // // //             </div>
// // // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // // //         )}

// // // // // // // // // // // // // // //         <div className="language-translator-header">
// // // // // // // // // // // // // // //           <h2>🌍 Multi-Language Translator</h2>
// // // // // // // // // // // // // // //           <p>Translate between 25+ languages including all major Indian languages</p>
// // // // // // // // // // // // // // //           <div className="stats">
// // // // // // // // // // // // // // //             <span className="stat-item">📚 25+ Languages</span>
// // // // // // // // // // // // // // //             <span className="stat-item">⚡ Real-time</span>
// // // // // // // // // // // // // // //             <span className="stat-item">🔊 Text-to-Speech</span>
// // // // // // // // // // // // // // //             <span className="stat-item">🎤 Voice Commands</span>
// // // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // // //         </div>

// // // // // // // // // // // // // // //         {/* Status Message */}
// // // // // // // // // // // // // // //         {statusMessage && (
// // // // // // // // // // // // // // //           <div className="status-message">
// // // // // // // // // // // // // // //             {statusMessage}
// // // // // // // // // // // // // // //             {error && <div className="error-text">{error}</div>}
// // // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // // //         )}

// // // // // // // // // // // // // // //         {/* Voice Command Hint */}
// // // // // // // // // // // // // // //         <div className="voice-command-hint">
// // // // // // // // // // // // // // //           <span className="hint-icon">🎤</span>
// // // // // // // // // // // // // // //           <span className="hint-text">Try saying: </span>
// // // // // // // // // // // // // // //           <span className="example">"start listening"</span>
// // // // // // // // // // // // // // //           <span className="example">"translate"</span>
// // // // // // // // // // // // // // //           <span className="example">"swap languages"</span>
// // // // // // // // // // // // // // //         </div>

// // // // // // // // // // // // // // //         {/* Quick Language Pairs */}
// // // // // // // // // // // // // // //         <div className="quick-pairs">
// // // // // // // // // // // // // // //           <h3>🚀 Quick Translations</h3>
// // // // // // // // // // // // // // //           <div className="pairs-grid">
// // // // // // // // // // // // // // //             {popularPairs.map((pair, idx) => (
// // // // // // // // // // // // // // //               <button
// // // // // // // // // // // // // // //                 key={idx}
// // // // // // // // // // // // // // //                 onClick={() => {
// // // // // // // // // // // // // // //                   setSourceLang(pair.from);
// // // // // // // // // // // // // // //                   setTargetLang(pair.to);
// // // // // // // // // // // // // // //                   setStatusMessage(`Set to ${pair.label}`);
// // // // // // // // // // // // // // //                 }}
// // // // // // // // // // // // // // //                 className="pair-btn"
// // // // // // // // // // // // // // //               >
// // // // // // // // // // // // // // //                 {pair.label}
// // // // // // // // // // // // // // //               </button>
// // // // // // // // // // // // // // //             ))}
// // // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // // //         </div>

// // // // // // // // // // // // // // //         {/* Language Selection */}
// // // // // // // // // // // // // // //         <div className="language-selection-section">
// // // // // // // // // // // // // // //           <div className="selection-row">
// // // // // // // // // // // // // // //             <div className="lang-selector">
// // // // // // // // // // // // // // //               <label>From Language:</label>
// // // // // // // // // // // // // // //               <div className="lang-select-wrapper">
// // // // // // // // // // // // // // //                 <select 
// // // // // // // // // // // // // // //                   value={sourceLang}
// // // // // // // // // // // // // // //                   onChange={(e) => setSourceLang(e.target.value)}
// // // // // // // // // // // // // // //                   className="lang-select"
// // // // // // // // // // // // // // //                 >
// // // // // // // // // // // // // // //                   <option value="auto">🔍 Auto-detect</option>
// // // // // // // // // // // // // // //                   <optgroup label="Indian Languages">
// // // // // // // // // // // // // // //                     {languageGroups.indian.map(code => (
// // // // // // // // // // // // // // //                       <option key={code} value={code}>
// // // // // // // // // // // // // // //                         {languages[code]?.flag} {languages[code]?.name} ({languages[code]?.nativeName})
// // // // // // // // // // // // // // //                       </option>
// // // // // // // // // // // // // // //                     ))}
// // // // // // // // // // // // // // //                   </optgroup>
// // // // // // // // // // // // // // //                   <optgroup label="International">
// // // // // // // // // // // // // // //                     {languageGroups.international.map(code => (
// // // // // // // // // // // // // // //                       <option key={code} value={code}>
// // // // // // // // // // // // // // //                         {languages[code]?.flag} {languages[code]?.name}
// // // // // // // // // // // // // // //                       </option>
// // // // // // // // // // // // // // //                     ))}
// // // // // // // // // // // // // // //                   </optgroup>
// // // // // // // // // // // // // // //                 </select>
// // // // // // // // // // // // // // //                 {sourceLang !== 'auto' && (
// // // // // // // // // // // // // // //                   <div className="selected-lang-display">
// // // // // // // // // // // // // // //                     {languages[sourceLang]?.flag} {languages[sourceLang]?.nativeName}
// // // // // // // // // // // // // // //                   </div>
// // // // // // // // // // // // // // //                 )}
// // // // // // // // // // // // // // //               </div>
// // // // // // // // // // // // // // //             </div>
            
// // // // // // // // // // // // // // //             <button onClick={swapLanguagesWithFeedback} className="swap-lang-btn" title="Swap languages">
// // // // // // // // // // // // // // //               ⇄
// // // // // // // // // // // // // // //             </button>
            
// // // // // // // // // // // // // // //             <div className="lang-selector">
// // // // // // // // // // // // // // //               <label>To Language:</label>
// // // // // // // // // // // // // // //               <div className="lang-select-wrapper">
// // // // // // // // // // // // // // //                 <select 
// // // // // // // // // // // // // // //                   value={targetLang}
// // // // // // // // // // // // // // //                   onChange={(e) => setTargetLang(e.target.value)}
// // // // // // // // // // // // // // //                   className="lang-select"
// // // // // // // // // // // // // // //                 >
// // // // // // // // // // // // // // //                   <optgroup label="Popular">
// // // // // // // // // // // // // // //                     {languageGroups.popular.map(code => (
// // // // // // // // // // // // // // //                       <option key={code} value={code}>
// // // // // // // // // // // // // // //                         {languages[code]?.flag} {languages[code]?.name}
// // // // // // // // // // // // // // //                       </option>
// // // // // // // // // // // // // // //                     ))}
// // // // // // // // // // // // // // //                   </optgroup>
// // // // // // // // // // // // // // //                   <optgroup label="All Languages">
// // // // // // // // // // // // // // //                     {Object.entries(languages).map(([code, lang]) => (
// // // // // // // // // // // // // // //                       <option key={code} value={code}>
// // // // // // // // // // // // // // //                         {lang.flag} {lang.name}
// // // // // // // // // // // // // // //                       </option>
// // // // // // // // // // // // // // //                     ))}
// // // // // // // // // // // // // // //                   </optgroup>
// // // // // // // // // // // // // // //                 </select>
// // // // // // // // // // // // // // //                 <div className="selected-lang-display">
// // // // // // // // // // // // // // //                   {languages[targetLang]?.flag} {languages[targetLang]?.nativeName}
// // // // // // // // // // // // // // //                 </div>
// // // // // // // // // // // // // // //               </div>
// // // // // // // // // // // // // // //             </div>
// // // // // // // // // // // // // // //           </div>
          
// // // // // // // // // // // // // // //           {detectedLanguage && sourceLang === 'auto' && (
// // // // // // // // // // // // // // //             <div className="detected-language">
// // // // // // // // // // // // // // //               🔍 Detected: <strong>{languages[detectedLanguage]?.name}</strong>
// // // // // // // // // // // // // // //             </div>
// // // // // // // // // // // // // // //           )}
// // // // // // // // // // // // // // //         </div>

// // // // // // // // // // // // // // //         {/* Input Section */}
// // // // // // // // // // // // // // //         <div className="input-section">
// // // // // // // // // // // // // // //           <div className="input-header">
// // // // // // // // // // // // // // //             <h3>📝 Enter Text</h3>
// // // // // // // // // // // // // // //             <div className="input-mode">
// // // // // // // // // // // // // // //               <button 
// // // // // // // // // // // // // // //                 className={`mode-btn ${!isPasteMode ? 'active' : ''}`}
// // // // // // // // // // // // // // //                 onClick={() => setIsPasteMode(false)}
// // // // // // // // // // // // // // //               >
// // // // // // // // // // // // // // //                 🎤 Speak
// // // // // // // // // // // // // // //               </button>
// // // // // // // // // // // // // // //               <button 
// // // // // // // // // // // // // // //                 className={`mode-btn ${isPasteMode ? 'active' : ''}`}
// // // // // // // // // // // // // // //                 onClick={() => setIsPasteMode(true)}
// // // // // // // // // // // // // // //               >
// // // // // // // // // // // // // // //                 ⌨️ Type
// // // // // // // // // // // // // // //               </button>
// // // // // // // // // // // // // // //             </div>
// // // // // // // // // // // // // // //           </div>
          
// // // // // // // // // // // // // // //           {!isPasteMode ? (
// // // // // // // // // // // // // // //             <div className="speech-input">
// // // // // // // // // // // // // // //               <button
// // // // // // // // // // // // // // //                 onClick={() => {
// // // // // // // // // // // // // // //                   if (isListening) {
// // // // // // // // // // // // // // //                     recognitionRef.current.stop();
// // // // // // // // // // // // // // //                     setIsListening(false);
// // // // // // // // // // // // // // //                   } else {
// // // // // // // // // // // // // // //                     setError('');
// // // // // // // // // // // // // // //                     setTranscript('');
// // // // // // // // // // // // // // //                     setTranslatedText('');
// // // // // // // // // // // // // // //                     setIsListening(true);
// // // // // // // // // // // // // // //                     recognitionRef.current.lang = languages[sourceLang]?.voice || 'en-US';
// // // // // // // // // // // // // // //                     // recognitionRef.current.start();
// // // // // // // // // // // // // // //                     voiceService.startListening();
// // // // // // // // // // // // // // //                   }
// // // // // // // // // // // // // // //                 }}
// // // // // // // // // // // // // // //                 disabled={!recognitionSupported || sourceLang === 'auto'}
// // // // // // // // // // // // // // //                 className={`speech-btn ${isListening ? 'listening' : ''}`}
// // // // // // // // // // // // // // //               >
// // // // // // // // // // // // // // //                 {isListening ? (
// // // // // // // // // // // // // // //                   <>
// // // // // // // // // // // // // // //                     <div className="pulse-ring"></div>
// // // // // // // // // // // // // // //                     <span className="btn-icon">⏹️</span>
// // // // // // // // // // // // // // //                     <span className="btn-text">Stop Listening</span>
// // // // // // // // // // // // // // //                   </>
// // // // // // // // // // // // // // //                 ) : (
// // // // // // // // // // // // // // //                   <>
// // // // // // // // // // // // // // //                     <span className="btn-icon">🎤</span>
// // // // // // // // // // // // // // //                     <span className="btn-text">Click to Speak</span>
// // // // // // // // // // // // // // //                   </>
// // // // // // // // // // // // // // //                 )}
// // // // // // // // // // // // // // //               </button>
// // // // // // // // // // // // // // //               {sourceLang === 'auto' && (
// // // // // // // // // // // // // // //                 <div className="info-note">
// // // // // // // // // // // // // // //                   ℹ️ Speech input disabled in auto-detect mode
// // // // // // // // // // // // // // //                 </div>
// // // // // // // // // // // // // // //               )}
// // // // // // // // // // // // // // //             </div>
// // // // // // // // // // // // // // //           ) : (
// // // // // // // // // // // // // // //             <div className="text-input">
// // // // // // // // // // // // // // //               <div className="text-input-wrapper">
// // // // // // // // // // // // // // //                 <textarea
// // // // // // // // // // // // // // //                   ref={textareaRef}
// // // // // // // // // // // // // // //                   value={pasteText}
// // // // // // // // // // // // // // //                   onChange={(e) => setPasteText(e.target.value)}
// // // // // // // // // // // // // // //                   placeholder={`Enter text in any language...`}
// // // // // // // // // // // // // // //                   className="translation-textarea"
// // // // // // // // // // // // // // //                   rows="5"
// // // // // // // // // // // // // // //                 />
// // // // // // // // // // // // // // //                 <div className="textarea-actions">
// // // // // // // // // // // // // // //                   <button onClick={handleAutoDetect} className="detect-btn">
// // // // // // // // // // // // // // //                     🔍 Detect Language
// // // // // // // // // // // // // // //                   </button>
// // // // // // // // // // // // // // //                   <button onClick={clearAllWithFeedback} className="clear-text-btn">
// // // // // // // // // // // // // // //                     🗑️ Clear
// // // // // // // // // // // // // // //                   </button>
// // // // // // // // // // // // // // //                 </div>
// // // // // // // // // // // // // // //               </div>
// // // // // // // // // // // // // // //               <button
// // // // // // // // // // // // // // //                 onClick={() => {
// // // // // // // // // // // // // // //                   setTranscript(pasteText);
// // // // // // // // // // // // // // //                   handleTranslateWithFeedback(pasteText);
// // // // // // // // // // // // // // //                 }}
// // // // // // // // // // // // // // //                 disabled={isTranslating || !pasteText.trim()}
// // // // // // // // // // // // // // //                 className="translate-action-btn"
// // // // // // // // // // // // // // //               >
// // // // // // // // // // // // // // //                 {isTranslating ? (
// // // // // // // // // // // // // // //                   <>
// // // // // // // // // // // // // // //                     <span className="spinner"></span>
// // // // // // // // // // // // // // //                     Translating...
// // // // // // // // // // // // // // //                   </>
// // // // // // // // // // // // // // //                 ) : (
// // // // // // // // // // // // // // //                   `🌐 Translate to ${languages[targetLang]?.name}`
// // // // // // // // // // // // // // //                 )}
// // // // // // // // // // // // // // //               </button>
// // // // // // // // // // // // // // //             </div>
// // // // // // // // // // // // // // //           )}
// // // // // // // // // // // // // // //         </div>

// // // // // // // // // // // // // // //         {/* Translation Results */}
// // // // // // // // // // // // // // //         <div className="translation-results">
// // // // // // // // // // // // // // //           <h3>📊 Translation Results</h3>
          
// // // // // // // // // // // // // // //           <div className="results-container">
// // // // // // // // // // // // // // //             <div className="source-result">
// // // // // // // // // // // // // // //               <div className="result-header">
// // // // // // // // // // // // // // //                 <h4>
// // // // // // // // // // // // // // //                   {sourceLang === 'auto' ? 'Detected Text' : languages[sourceLang]?.name}
// // // // // // // // // // // // // // //                   {detectedLanguage && sourceLang === 'auto' && 
// // // // // // // // // // // // // // //                     <span className="detected-tag"> ({languages[detectedLanguage]?.name})</span>
// // // // // // // // // // // // // // //                   }
// // // // // // // // // // // // // // //                 </h4>
// // // // // // // // // // // // // // //                 {transcript && (
// // // // // // // // // // // // // // //                   <button onClick={() => copyToClipboard(transcript)} className="action-btn">
// // // // // // // // // // // // // // //                     📋 Copy
// // // // // // // // // // // // // // //                   </button>
// // // // // // // // // // // // // // //                 )}
// // // // // // // // // // // // // // //               </div>
// // // // // // // // // // // // // // //               <div className="result-content">
// // // // // // // // // // // // // // //                 {transcript || pasteText || (
// // // // // // // // // // // // // // //                   <div className="empty-state">
// // // // // // // // // // // // // // //                     <div className="empty-icon">💭</div>
// // // // // // // // // // // // // // //                     <p>Text will appear here</p>
// // // // // // // // // // // // // // //                   </div>
// // // // // // // // // // // // // // //                 )}
// // // // // // // // // // // // // // //               </div>
// // // // // // // // // // // // // // //             </div>
            
// // // // // // // // // // // // // // //             <div className="target-result">
// // // // // // // // // // // // // // //               <div className="result-header">
// // // // // // // // // // // // // // //                 <h4>{languages[targetLang]?.name}</h4>
// // // // // // // // // // // // // // //                 {translatedText && (
// // // // // // // // // // // // // // //                   <div className="result-actions">
// // // // // // // // // // // // // // //                     <button onClick={() => copyToClipboard(translatedText)} className="action-btn">
// // // // // // // // // // // // // // //                       📋 Copy
// // // // // // // // // // // // // // //                     </button>
// // // // // // // // // // // // // // //                     <button 
// // // // // // // // // // // // // // //                       onClick={isSpeaking ? () => window.speechSynthesis.cancel() : () => speakText(translatedText)}
// // // // // // // // // // // // // // //                       className={`speak-action-btn ${isSpeaking ? 'speaking' : ''}`}
// // // // // // // // // // // // // // //                     >
// // // // // // // // // // // // // // //                       {isSpeaking ? '⏹️ Stop' : '🔊 Speak'}
// // // // // // // // // // // // // // //                     </button>
// // // // // // // // // // // // // // //                   </div>
// // // // // // // // // // // // // // //                 )}
// // // // // // // // // // // // // // //               </div>
// // // // // // // // // // // // // // //               <div className="result-content">
// // // // // // // // // // // // // // //                 {translatedText || (
// // // // // // // // // // // // // // //                   <div className="empty-state">
// // // // // // // // // // // // // // //                     <div className="empty-icon">🌐</div>
// // // // // // // // // // // // // // //                     <p>Translation will appear here</p>
// // // // // // // // // // // // // // //                   </div>
// // // // // // // // // // // // // // //                 )}
// // // // // // // // // // // // // // //               </div>
// // // // // // // // // // // // // // //             </div>
// // // // // // // // // // // // // // //           </div>
          
// // // // // // // // // // // // // // //           {translatedText && (
// // // // // // // // // // // // // // //             <div className="post-translation-actions">
// // // // // // // // // // // // // // //               <button
// // // // // // // // // // // // // // //                 onClick={() => {
// // // // // // // // // // // // // // //                   setSourceLang(targetLang);
// // // // // // // // // // // // // // //                   setTargetLang(sourceLang);
// // // // // // // // // // // // // // //                   setTranscript(translatedText);
// // // // // // // // // // // // // // //                   handleTranslate(translatedText);
// // // // // // // // // // // // // // //                 }}
// // // // // // // // // // // // // // //                 className="swap-translate-btn"
// // // // // // // // // // // // // // //               >
// // // // // // // // // // // // // // //                 🔁 Swap & Retranslate
// // // // // // // // // // // // // // //               </button>
              
// // // // // // // // // // // // // // //               <button
// // // // // // // // // // // // // // //                 onClick={() => {
// // // // // // // // // // // // // // //                   setPasteText(translatedText);
// // // // // // // // // // // // // // //                   if (textareaRef.current) {
// // // // // // // // // // // // // // //                     textareaRef.current.focus();
// // // // // // // // // // // // // // //                   }
// // // // // // // // // // // // // // //                 }}
// // // // // // // // // // // // // // //                 className="edit-btn"
// // // // // // // // // // // // // // //               >
// // // // // // // // // // // // // // //                 ✏️ Edit Translation
// // // // // // // // // // // // // // //               </button>
// // // // // // // // // // // // // // //             </div>
// // // // // // // // // // // // // // //           )}
// // // // // // // // // // // // // // //         </div>

// // // // // // // // // // // // // // //         {/* Recent Translations */}
// // // // // // // // // // // // // // //         {recentTranslations.length > 0 && (
// // // // // // // // // // // // // // //           <div className="recent-translations">
// // // // // // // // // // // // // // //             <h3>🕐 Recent Translations</h3>
// // // // // // // // // // // // // // //             <div className="recent-list">
// // // // // // // // // // // // // // //               {recentTranslations.map((item, idx) => (
// // // // // // // // // // // // // // //                 <div key={idx} className="recent-item">
// // // // // // // // // // // // // // //                   <div className="recent-langs">
// // // // // // // // // // // // // // //                     <span className="lang-from">{item.sourceLang}</span>
// // // // // // // // // // // // // // //                     <span className="arrow">→</span>
// // // // // // // // // // // // // // //                     <span className="lang-to">{item.targetLang}</span>
// // // // // // // // // // // // // // //                   </div>
// // // // // // // // // // // // // // //                   <div className="recent-text">
// // // // // // // // // // // // // // //                     <p className="source-text">{item.sourceText.substring(0, 50)}...</p>
// // // // // // // // // // // // // // //                     <p className="translated-text">{item.translatedText.substring(0, 50)}...</p>
// // // // // // // // // // // // // // //                   </div>
// // // // // // // // // // // // // // //                   <button 
// // // // // // // // // // // // // // //                     onClick={() => {
// // // // // // // // // // // // // // //                       setSourceLang(Object.keys(languages).find(k => languages[k]?.name === item.sourceLang) || 'en');
// // // // // // // // // // // // // // //                       setTargetLang(Object.keys(languages).find(k => languages[k]?.name === item.targetLang) || 'te');
// // // // // // // // // // // // // // //                       setPasteText(item.sourceText);
// // // // // // // // // // // // // // //                       setTranscript(item.sourceText);
// // // // // // // // // // // // // // //                       setTranslatedText(item.translatedText);
// // // // // // // // // // // // // // //                     }}
// // // // // // // // // // // // // // //                     className="reuse-btn"
// // // // // // // // // // // // // // //                   >
// // // // // // // // // // // // // // //                     ↺ Reuse
// // // // // // // // // // // // // // //                   </button>
// // // // // // // // // // // // // // //                 </div>
// // // // // // // // // // // // // // //               ))}
// // // // // // // // // // // // // // //             </div>
// // // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // // //         )}

// // // // // // // // // // // // // // //         {/* Language Support Info */}
// // // // // // // // // // // // // // //         <div className="language-support">
// // // // // // // // // // // // // // //           <h3>🌐 Supported Languages</h3>
// // // // // // // // // // // // // // //           <div className="language-categories">
// // // // // // // // // // // // // // //             <div className="category">
// // // // // // // // // // // // // // //               <h4>🇮🇳 Indian Languages</h4>
// // // // // // // // // // // // // // //               <div className="lang-list">
// // // // // // // // // // // // // // //                 {languageGroups.indian.map(code => (
// // // // // // // // // // // // // // //                   <span key={code} className="lang-tag">
// // // // // // // // // // // // // // //                     {languages[code]?.flag} {languages[code]?.name}
// // // // // // // // // // // // // // //                   </span>
// // // // // // // // // // // // // // //                 ))}
// // // // // // // // // // // // // // //               </div>
// // // // // // // // // // // // // // //             </div>
// // // // // // // // // // // // // // //             <div className="category">
// // // // // // // // // // // // // // //               <h4>🌍 International</h4>
// // // // // // // // // // // // // // //               <div className="lang-list">
// // // // // // // // // // // // // // //                 {languageGroups.international.map(code => (
// // // // // // // // // // // // // // //                   <span key={code} className="lang-tag">
// // // // // // // // // // // // // // //                     {languages[code]?.flag} {languages[code]?.name}
// // // // // // // // // // // // // // //                   </span>
// // // // // // // // // // // // // // //                 ))}
// // // // // // // // // // // // // // //               </div>
// // // // // // // // // // // // // // //             </div>
// // // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // // //         </div>
// // // // // // // // // // // // // // //       </div>

// // // // // // // // // // // // // // //       {/* Status Bar */}
// // // // // // // // // // // // // // //       <div className="status-bar">
// // // // // // // // // // // // // // //         <p>
// // // // // // // // // // // // // // //           {isListening ? `🎤 Listening in ${languages[sourceLang]?.name}...` :
// // // // // // // // // // // // // // //            isTranslating ? `🔄 Translating ${languages[sourceLang]?.name} → ${languages[targetLang]?.name}` :
// // // // // // // // // // // // // // //            isSpeaking ? `🔊 Speaking in ${languages[targetLang]?.name}` :
// // // // // // // // // // // // // // //            translatedText ? `✅ ${languages[sourceLang]?.name} → ${languages[targetLang]?.name}` :
// // // // // // // // // // // // // // //            voiceService.isListening ? '🎤 Voice control active' :
// // // // // // // // // // // // // // //            '🟢 Ready to translate'}
// // // // // // // // // // // // // // //         </p>
// // // // // // // // // // // // // // //         {voiceService.isListening && (
// // // // // // // // // // // // // // //           <div className="voice-activity">
// // // // // // // // // // // // // // //             <div className="pulse-dot"></div>
// // // // // // // // // // // // // // //             <span>Voice active</span>
// // // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // // //         )}
// // // // // // // // // // // // // // //       </div>
// // // // // // // // // // // // // // //     </div>
// // // // // // // // // // // // // // //   );
// // // // // // // // // // // // // // // };

// // // // // // // // // // // // // // // export default LanguageTranslator;




// // // // // // // // // // // // LanguageTranslator.jsx - COMPLETE WORKING VERSION WITH FIXED VOICE COMMANDS
// // // // // // // // // // // import React, { useState, useEffect, useRef } from 'react';
// // // // // // // // // // // import { useNavigate } from 'react-router-dom';
// // // // // // // // // // // import { voiceService } from '../../services/voiceService';
// // // // // // // // // // // import { initializeLanguageTranslatorCommands } from '../../voice-commands/languageTranslatorCommands';
// // // // // // // // // // // import './LanguageTranslator.css';

// // // // // // // // // // // const LanguageTranslator = () => {
// // // // // // // // // // //   const navigate = useNavigate();
  
// // // // // // // // // // //   // State declarations
// // // // // // // // // // //   const [isListening, setIsListening] = useState(false);
// // // // // // // // // // //   const [transcript, setTranscript] = useState('');
// // // // // // // // // // //   const [translatedText, setTranslatedText] = useState('');
// // // // // // // // // // //   const [isTranslating, setIsTranslating] = useState(false);
// // // // // // // // // // //   const [error, setError] = useState('');
// // // // // // // // // // //   const [isSpeaking, setIsSpeaking] = useState(false);
// // // // // // // // // // //   const [sourceLang, setSourceLang] = useState('en');
// // // // // // // // // // //   const [targetLang, setTargetLang] = useState('hi');
// // // // // // // // // // //   const [recognitionSupported, setRecognitionSupported] = useState(true);
// // // // // // // // // // //   const [statusMessage, setStatusMessage] = useState('Ready to translate');
// // // // // // // // // // //   const [isPasteMode, setIsPasteMode] = useState(false);
// // // // // // // // // // //   const [pasteText, setPasteText] = useState('');
// // // // // // // // // // //   const [apiStatus, setApiStatus] = useState('✅ API Ready');
// // // // // // // // // // //   const [recentTranslations, setRecentTranslations] = useState([]);
// // // // // // // // // // //   const [detectedLanguage, setDetectedLanguage] = useState('');
// // // // // // // // // // //   const [showVoiceHelp, setShowVoiceHelp] = useState(false);
// // // // // // // // // // //   const [isVoiceRecording, setIsVoiceRecording] = useState(false);
// // // // // // // // // // //   const [isContinuousMode, setIsContinuousMode] = useState(false);
// // // // // // // // // // //   const [voiceHistory, setVoiceHistory] = useState([]);
// // // // // // // // // // //   const [lastSpokenText, setLastSpokenText] = useState('');
  
// // // // // // // // // // //   // Refs
// // // // // // // // // // //   const recognitionRef = useRef(null);
// // // // // // // // // // //   const textareaRef = useRef(null);
// // // // // // // // // // //   const componentRef = useRef(null);
// // // // // // // // // // //   const lastCommandRef = useRef('');
  
// // // // // // // // // // //   // ✅ EXTENDED LANGUAGE SUPPORT (15+ languages)
// // // // // // // // // // //   const languages = {
// // // // // // // // // // //     // Indian Languages
// // // // // // // // // // //     en: { code: 'en', name: 'English', nativeName: 'English', voice: 'en-US', flag: '🇺🇸' },
// // // // // // // // // // //     te: { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', voice: 'te-IN', flag: '🇮🇳' },
// // // // // // // // // // //     hi: { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', voice: 'hi-IN', flag: '🇮🇳' },
// // // // // // // // // // //     ta: { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', voice: 'ta-IN', flag: '🇮🇳' },
// // // // // // // // // // //     kn: { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', voice: 'kn-IN', flag: '🇮🇳' },
// // // // // // // // // // //     ml: { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', voice: 'ml-IN', flag: '🇮🇳' },
// // // // // // // // // // //     mr: { code: 'mr', name: 'Marathi', nativeName: 'मराठी', voice: 'mr-IN', flag: '🇮🇳' },
// // // // // // // // // // //     gu: { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', voice: 'gu-IN', flag: '🇮🇳' },
// // // // // // // // // // //     bn: { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', voice: 'bn-IN', flag: '🇮🇳' },
// // // // // // // // // // //     pa: { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', voice: 'pa-IN', flag: '🇮🇳' },
// // // // // // // // // // //     or: { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ', voice: 'or-IN', flag: '🇮🇳' },
    
// // // // // // // // // // //     // International Languages
// // // // // // // // // // //     es: { code: 'es', name: 'Spanish', nativeName: 'Español', voice: 'es-ES', flag: '🇪🇸' },
// // // // // // // // // // //     fr: { code: 'fr', name: 'French', nativeName: 'Français', voice: 'fr-FR', flag: '🇫🇷' },
// // // // // // // // // // //     de: { code: 'de', name: 'German', nativeName: 'Deutsch', voice: 'de-DE', flag: '🇩🇪' },
// // // // // // // // // // //     it: { code: 'it', name: 'Italian', nativeName: 'Italiano', voice: 'it-IT', flag: '🇮🇹' },
// // // // // // // // // // //     pt: { code: 'pt', name: 'Portuguese', nativeName: 'Português', voice: 'pt-PT', flag: '🇵🇹' },
// // // // // // // // // // //     ru: { code: 'ru', name: 'Russian', nativeName: 'Русский', voice: 'ru-RU', flag: '🇷🇺' },
// // // // // // // // // // //     ja: { code: 'ja', name: 'Japanese', nativeName: '日本語', voice: 'ja-JP', flag: '🇯🇵' },
// // // // // // // // // // //     ko: { code: 'ko', name: 'Korean', nativeName: '한국어', voice: 'ko-KR', flag: '🇰🇷' },
// // // // // // // // // // //     zh: { code: 'zh', name: 'Chinese', nativeName: '中文', voice: 'zh-CN', flag: '🇨🇳' },
// // // // // // // // // // //     ar: { code: 'ar', name: 'Arabic', nativeName: 'العربية', voice: 'ar-SA', flag: '🇸🇦' },
    
// // // // // // // // // // //     // Other Indian
// // // // // // // // // // //     ur: { code: 'ur', name: 'Urdu', nativeName: 'اردو', voice: 'ur-PK', flag: '🇵🇰' },
// // // // // // // // // // //     as: { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া', voice: 'as-IN', flag: '🇮🇳' },
// // // // // // // // // // //     sa: { code: 'sa', name: 'Sanskrit', nativeName: 'संस्कृतम्', voice: 'sa-IN', flag: '🇮🇳' }
// // // // // // // // // // //   };

// // // // // // // // // // //   // Language groups for organization
// // // // // // // // // // //   const languageGroups = {
// // // // // // // // // // //     indian: ['te', 'hi', 'ta', 'kn', 'ml', 'mr', 'gu', 'bn', 'pa', 'or', 'ur', 'as', 'sa'],
// // // // // // // // // // //     international: ['en', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'ja', 'ko', 'zh', 'ar'],
// // // // // // // // // // //     popular: ['en', 'hi', 'te', 'ta', 'es', 'fr', 'de', 'ja']
// // // // // // // // // // //   };

// // // // // // // // // // //   // ✅ VOICE COMMANDS INTEGRATION
// // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // //     // Store component methods in ref for voice command access
// // // // // // // // // // //     componentRef.current = {
// // // // // // // // // // //       // Navigation
// // // // // // // // // // //       handleBackToDashboard,
// // // // // // // // // // //       handleLogout,
      
// // // // // // // // // // //       // State and refs
// // // // // // // // // // //       isListening,
// // // // // // // // // // //       setIsListening,
// // // // // // // // // // //       transcript,
// // // // // // // // // // //       setTranscript,
// // // // // // // // // // //       translatedText,
// // // // // // // // // // //       setTranslatedText,
// // // // // // // // // // //       pasteText,
// // // // // // // // // // //       setPasteText,
// // // // // // // // // // //       error,
// // // // // // // // // // //       setError,
// // // // // // // // // // //       statusMessage,
// // // // // // // // // // //       setStatusMessage,
// // // // // // // // // // //       sourceLang,
// // // // // // // // // // //       setSourceLang,
// // // // // // // // // // //       targetLang,
// // // // // // // // // // //       setTargetLang,
// // // // // // // // // // //       recognitionRef,
// // // // // // // // // // //       languages,
      
// // // // // // // // // // //       // Methods
// // // // // // // // // // //       clearAll,
// // // // // // // // // // //       clearInput,
// // // // // // // // // // //       clearOutput,
// // // // // // // // // // //       swapLanguages,
// // // // // // // // // // //       handleTranslate,
// // // // // // // // // // //       speakText,
// // // // // // // // // // //       handleAutoDetect,
// // // // // // // // // // //       setQuickLanguage,
// // // // // // // // // // //       handleTextTranslate,
      
// // // // // // // // // // //       // Voice recording states
// // // // // // // // // // //       isVoiceRecording,
// // // // // // // // // // //       setIsVoiceRecording,
// // // // // // // // // // //       startVoiceRecording,
// // // // // // // // // // //       stopVoiceRecording,
// // // // // // // // // // //       toggleContinuousMode,
// // // // // // // // // // //       addToVoiceHistory,
// // // // // // // // // // //       getCurrentText,
      
// // // // // // // // // // //       // Other
// // // // // // // // // // //       setIsSpeaking,
// // // // // // // // // // //       setIsPasteMode,
// // // // // // // // // // //       setLastSpokenText
// // // // // // // // // // //     };
    
// // // // // // // // // // //     // Initialize voice commands
// // // // // // // // // // //     const cleanup = initializeLanguageTranslatorCommands(componentRef);
    
// // // // // // // // // // //     // Set up general callback for unrecognized speech
// // // // // // // // // // //     voiceService.setFeature('language-translator', (text) => {
// // // // // // // // // // //       console.log('Voice input received:', text);
// // // // // // // // // // //       handleVoiceInput(text);
// // // // // // // // // // //     });
    
// // // // // // // // // // //     // Ensure voice service is always running
// // // // // // // // // // //     if (voiceService.isAvailable() && !voiceService.isListening) {
// // // // // // // // // // //       voiceService.startListening();
// // // // // // // // // // //     }
    
// // // // // // // // // // //     // Cleanup on unmount
// // // // // // // // // // //     return () => {
// // // // // // // // // // //       cleanup?.();
// // // // // // // // // // //       voiceService.setFeature('dashboard');
// // // // // // // // // // //     };
// // // // // // // // // // //   }, []);

// // // // // // // // // // //   // Handle voice input for translation
// // // // // // // // // // //   const handleVoiceInput = (text) => {
// // // // // // // // // // //     console.log('Voice input processing:', text, 'Recording mode:', isVoiceRecording, 'Last command:', lastCommandRef.current);
    
// // // // // // // // // // //     // Check if this is a command response (after "start listening")
// // // // // // // // // // //     if (lastCommandRef.current === 'start listening' && !isCommand(text)) {
// // // // // // // // // // //       console.log('Capturing speech for translation after start listening:', text);
// // // // // // // // // // //       captureSpeechForTranslation(text);
// // // // // // // // // // //       lastCommandRef.current = '';
// // // // // // // // // // //     }
// // // // // // // // // // //     // Check if we're in voice recording mode
// // // // // // // // // // //     else if (isVoiceRecording && !isCommand(text)) {
// // // // // // // // // // //       console.log('Capturing speech in recording mode:', text);
// // // // // // // // // // //       captureSpeechForTranslation(text);
// // // // // // // // // // //     }
// // // // // // // // // // //     // Check if we're in continuous mode
// // // // // // // // // // //     else if (isContinuousMode && !isCommand(text)) {
// // // // // // // // // // //       console.log('Capturing speech in continuous mode:', text);
// // // // // // // // // // //       captureSpeechForTranslation(text, true);
// // // // // // // // // // //     }
// // // // // // // // // // //     else {
// // // // // // // // // // //       // Not a command and not in recording mode, just show what was said
// // // // // // // // // // //       console.log('General speech (not captured):', text);
// // // // // // // // // // //       setStatusMessage(`You said: "${text}"`);
// // // // // // // // // // //     }
// // // // // // // // // // //   };

// // // // // // // // // // //   // Check if text is a voice command
// // // // // // // // // // //   const isCommand = (text) => {
// // // // // // // // // // //     const commands = [
// // // // // // // // // // //       'start listening', 'speak now', 'stop listening', 'stop',
// // // // // // // // // // //       'continuous mode', 'translate', 'speak translation', 'stop speaking',
// // // // // // // // // // //       'swap languages', 'english to hindi', 'hindi to english',
// // // // // // // // // // //       'clear all', 'clear input', 'clear output',
// // // // // // // // // // //       'select english', 'select hindi', 'select telugu',
// // // // // // // // // // //       'help', 'what can i say', 'show commands',
// // // // // // // // // // //       'go to dashboard', 'logout'
// // // // // // // // // // //     ];
    
// // // // // // // // // // //     return commands.some(cmd => text.toLowerCase().includes(cmd.toLowerCase()));
// // // // // // // // // // //   };

// // // // // // // // // // //   // Capture speech and add to text box
// // // // // // // // // // //   const captureSpeechForTranslation = (text, isContinuous = false) => {
// // // // // // // // // // //     console.log('Capturing speech:', text, 'Continuous:', isContinuous);
    
// // // // // // // // // // //     // Add to voice history
// // // // // // // // // // //     setVoiceHistory(prev => [{
// // // // // // // // // // //       text,
// // // // // // // // // // //       timestamp: new Date().toLocaleTimeString(),
// // // // // // // // // // //       mode: isContinuous ? 'continuous' : 'single'
// // // // // // // // // // //     }, ...prev.slice(0, 9)]);
    
// // // // // // // // // // //     if (isContinuous) {
// // // // // // // // // // //       // Continuous mode: append to existing text
// // // // // // // // // // //       const newText = pasteText ? `${pasteText} ${text}` : text;
// // // // // // // // // // //       setPasteText(newText);
// // // // // // // // // // //       setTranscript(newText);
// // // // // // // // // // //       setStatusMessage(`✅ Added: "${text}"`);
      
// // // // // // // // // // //       // Auto-translate in continuous mode
// // // // // // // // // // //       setTimeout(() => {
// // // // // // // // // // //         handleTranslate(newText);
// // // // // // // // // // //       }, 800);
// // // // // // // // // // //     } else {
// // // // // // // // // // //       // Single recording mode
// // // // // // // // // // //       setPasteText(text);
// // // // // // // // // // //       setTranscript(text);
// // // // // // // // // // //       setStatusMessage(`✅ Captured: "${text}"`);
      
// // // // // // // // // // //       // Auto-translate after a short delay
// // // // // // // // // // //       setTimeout(() => {
// // // // // // // // // // //         handleTranslate(text);
// // // // // // // // // // //       }, 1000);
// // // // // // // // // // //     }
    
// // // // // // // // // // //     // Auto-switch to text mode to show the text
// // // // // // // // // // //     setIsPasteMode(true);
    
// // // // // // // // // // //     // Scroll to textarea
// // // // // // // // // // //     setTimeout(() => {
// // // // // // // // // // //       if (textareaRef.current) {
// // // // // // // // // // //         textareaRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
// // // // // // // // // // //         textareaRef.current.focus();
// // // // // // // // // // //       }
// // // // // // // // // // //     }, 300);
// // // // // // // // // // //   };

// // // // // // // // // // //   // Voice recording control functions
// // // // // // // // // // //   const startVoiceRecording = () => {
// // // // // // // // // // //     setIsVoiceRecording(true);
// // // // // // // // // // //     setStatusMessage('🎤 Listening for your speech... Speak now!');
// // // // // // // // // // //     voiceService.speak('I am listening. Please speak your text now.', { rate: 0.9 });
// // // // // // // // // // //     lastCommandRef.current = 'start listening';
// // // // // // // // // // //   };

// // // // // // // // // // //   const stopVoiceRecording = () => {
// // // // // // // // // // //     setIsVoiceRecording(false);
// // // // // // // // // // //     setStatusMessage('Ready for next command');
// // // // // // // // // // //     lastCommandRef.current = '';
// // // // // // // // // // //   };

// // // // // // // // // // //   const toggleContinuousMode = () => {
// // // // // // // // // // //     setIsContinuousMode(!isContinuousMode);
// // // // // // // // // // //     const mode = !isContinuousMode ? 'enabled' : 'disabled';
// // // // // // // // // // //     setStatusMessage(`Continuous mode ${mode}`);
// // // // // // // // // // //     voiceService.speak(`Continuous mode ${mode}. Speak to add text continuously.`, { rate: 0.9 });
// // // // // // // // // // //   };

// // // // // // // // // // //   const addToVoiceHistory = (text) => {
// // // // // // // // // // //     setVoiceHistory(prev => [{
// // // // // // // // // // //       text,
// // // // // // // // // // //       timestamp: new Date().toLocaleTimeString(),
// // // // // // // // // // //       mode: isContinuousMode ? 'continuous' : 'single'
// // // // // // // // // // //     }, ...prev.slice(0, 9)]);
// // // // // // // // // // //   };

// // // // // // // // // // //   // Get current text for translation
// // // // // // // // // // //   const getCurrentText = () => {
// // // // // // // // // // //     return pasteText || transcript || '';
// // // // // // // // // // //   };

// // // // // // // // // // //   // Update componentRef when state changes
// // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // //     if (componentRef.current) {
// // // // // // // // // // //       componentRef.current = {
// // // // // // // // // // //         ...componentRef.current,
// // // // // // // // // // //         isListening,
// // // // // // // // // // //         transcript,
// // // // // // // // // // //         translatedText,
// // // // // // // // // // //         pasteText,
// // // // // // // // // // //         sourceLang,
// // // // // // // // // // //         targetLang,
// // // // // // // // // // //         error,
// // // // // // // // // // //         statusMessage,
// // // // // // // // // // //         isVoiceRecording,
// // // // // // // // // // //         isContinuousMode,
// // // // // // // // // // //         voiceHistory,
// // // // // // // // // // //         lastSpokenText
// // // // // // // // // // //       };
// // // // // // // // // // //     }
// // // // // // // // // // //   }, [isListening, transcript, translatedText, pasteText, sourceLang, targetLang, error, statusMessage, isVoiceRecording, isContinuousMode, voiceHistory, lastSpokenText]);

// // // // // // // // // // //   // Voice feedback functions
// // // // // // // // // // //   const speakFeedback = (message, options = {}) => {
// // // // // // // // // // //     if (voiceService && window.speechSynthesis) {
// // // // // // // // // // //       // Cancel any ongoing speech
// // // // // // // // // // //       window.speechSynthesis.cancel();
      
// // // // // // // // // // //       // Set last spoken text
// // // // // // // // // // //       setLastSpokenText(message);
      
// // // // // // // // // // //       // Speak with options
// // // // // // // // // // //       voiceService.speak(message, { rate: 0.9, ...options });
// // // // // // // // // // //     }
// // // // // // // // // // //   };

// // // // // // // // // // //   const handleTranslateWithFeedback = async (text) => {
// // // // // // // // // // //     const textToTranslate = text || pasteText || transcript;
    
// // // // // // // // // // //     if (!textToTranslate.trim()) {
// // // // // // // // // // //       speakFeedback('Please enter some text to translate');
// // // // // // // // // // //       return;
// // // // // // // // // // //     }
    
// // // // // // // // // // //     speakFeedback(`Translating to ${languages[targetLang]?.name}`);
// // // // // // // // // // //     await handleTranslate(textToTranslate);
// // // // // // // // // // //   };

// // // // // // // // // // //   const swapLanguagesWithFeedback = () => {
// // // // // // // // // // //     speakFeedback(`Swapping ${languages[sourceLang]?.name} and ${languages[targetLang]?.name}`);
// // // // // // // // // // //     swapLanguages();
// // // // // // // // // // //   };

// // // // // // // // // // //   // ✅ AUTO-DETECT LANGUAGE FUNCTION
// // // // // // // // // // //   const detectLanguage = async (text) => {
// // // // // // // // // // //     if (!text.trim() || text.length < 3) return null;
    
// // // // // // // // // // //     try {
// // // // // // // // // // //       // Simple detection based on character ranges
// // // // // // // // // // //       const detectByScript = (text) => {
// // // // // // // // // // //         // Telugu: 0C00-0C7F
// // // // // // // // // // //         if (/[\u0C00-\u0C7F]/.test(text)) return 'te';
        
// // // // // // // // // // //         // Hindi/Devanagari: 0900-097F
// // // // // // // // // // //         if (/[\u0900-\u097F]/.test(text)) return 'hi';
        
// // // // // // // // // // //         // Tamil: 0B80-0BFF
// // // // // // // // // // //         if (/[\u0B80-\u0BFF]/.test(text)) return 'ta';
        
// // // // // // // // // // //         // Kannada: 0C80-0CFF
// // // // // // // // // // //         if (/[\u0C80-\u0CFF]/.test(text)) return 'kn';
        
// // // // // // // // // // //         // Malayalam: 0D00-0D7F
// // // // // // // // // // //         if (/[\u0D00-\u0D7F]/.test(text)) return 'ml';
        
// // // // // // // // // // //         // Gujarati: 0A80-0AFF
// // // // // // // // // // //         if (/[\u0A80-\u0AFF]/.test(text)) return 'gu';
        
// // // // // // // // // // //         // Bengali: 0980-09FF
// // // // // // // // // // //         if (/[\u0980-\u09FF]/.test(text)) return 'bn';
        
// // // // // // // // // // //         // Arabic: 0600-06FF
// // // // // // // // // // //         if (/[\u0600-\u06FF]/.test(text)) return 'ar';
        
// // // // // // // // // // //         // Chinese/Japanese/Korean
// // // // // // // // // // //         if (/[\u4E00-\u9FFF]/.test(text)) return 'zh'; // Chinese
// // // // // // // // // // //         if (/[\u3040-\u309F\u30A0-\u30FF]/.test(text)) return 'ja'; // Japanese
// // // // // // // // // // //         if (/[\uAC00-\uD7AF]/.test(text)) return 'ko'; // Korean
        
// // // // // // // // // // //         // Cyrillic (Russian)
// // // // // // // // // // //         if (/[\u0400-\u04FF]/.test(text)) return 'ru';
        
// // // // // // // // // // //         // Default to English
// // // // // // // // // // //         return 'en';
// // // // // // // // // // //       };
      
// // // // // // // // // // //       const detected = detectByScript(text);
// // // // // // // // // // //       setDetectedLanguage(detected);
// // // // // // // // // // //       return detected;
// // // // // // // // // // //     } catch (err) {
// // // // // // // // // // //       console.error('Language detection error:', err);
// // // // // // // // // // //       return null;
// // // // // // // // // // //     }
// // // // // // // // // // //   };

// // // // // // // // // // //   // ✅ REAL TRANSLATION FUNCTION - Supports all languages
// // // // // // // // // // //   const handleTranslate = async (text) => {
// // // // // // // // // // //     // Use provided text or current text
// // // // // // // // // // //     const textToTranslate = text || pasteText || transcript;
    
// // // // // // // // // // //     if (!textToTranslate.trim()) {
// // // // // // // // // // //       setError('Please enter some text to translate');
// // // // // // // // // // //       speakFeedback('Please enter or speak some text to translate');
// // // // // // // // // // //       return;
// // // // // // // // // // //     }
    
// // // // // // // // // // //     setIsTranslating(true);
// // // // // // // // // // //     setStatusMessage('Translating...');
// // // // // // // // // // //     setError('');
    
// // // // // // // // // // //     try {
// // // // // // // // // // //       // Auto-detect source language if not set
// // // // // // // // // // //       let detectedSourceLang = sourceLang;
// // // // // // // // // // //       if (sourceLang === 'auto') {
// // // // // // // // // // //         const detected = await detectLanguage(textToTranslate);
// // // // // // // // // // //         if (detected) {
// // // // // // // // // // //           detectedSourceLang = detected;
// // // // // // // // // // //           setStatusMessage(`Detected: ${languages[detected]?.name}. Translating...`);
// // // // // // // // // // //         }
// // // // // // // // // // //       }
      
// // // // // // // // // // //       // Try multiple translation services
// // // // // // // // // // //       const translation = await translateWithMultipleServices(textToTranslate, detectedSourceLang, targetLang);
      
// // // // // // // // // // //       if (translation) {
// // // // // // // // // // //         setTranslatedText(translation);
// // // // // // // // // // //         setStatusMessage('Translation complete');
        
// // // // // // // // // // //         // Add to recent translations
// // // // // // // // // // //         addToRecentTranslations({
// // // // // // // // // // //           sourceText: textToTranslate,
// // // // // // // // // // //           translatedText: translation,
// // // // // // // // // // //           sourceLang: languages[detectedSourceLang]?.name,
// // // // // // // // // // //           targetLang: languages[targetLang]?.name,
// // // // // // // // // // //           timestamp: new Date().toISOString()
// // // // // // // // // // //         });
        
// // // // // // // // // // //         // Speak confirmation (only if not auto-translate)
// // // // // // // // // // //         if (!isVoiceRecording && !isContinuousMode) {
// // // // // // // // // // //           speakFeedback(`Translated to ${languages[targetLang]?.name}. Say "speak translation" to hear it.`);
// // // // // // // // // // //         }
// // // // // // // // // // //       } else {
// // // // // // // // // // //         throw new Error('All translation services failed');
// // // // // // // // // // //       }
// // // // // // // // // // //     } catch (err) {
// // // // // // // // // // //       console.error('Translation error:', err);
// // // // // // // // // // //       setError('Translation service temporarily unavailable. Please try again.');
// // // // // // // // // // //       setTranslatedText(getOfflineTranslation(textToTranslate, sourceLang, targetLang));
// // // // // // // // // // //       setStatusMessage('Using offline translation');
// // // // // // // // // // //       speakFeedback('Using offline translation');
// // // // // // // // // // //     } finally {
// // // // // // // // // // //       setIsTranslating(false);
// // // // // // // // // // //     }
// // // // // // // // // // //   };

// // // // // // // // // // //   // ✅ MULTI-SERVICE TRANSLATION WITH FALLBACKS
// // // // // // // // // // //   const translateWithMultipleServices = async (text, fromLang, toLang) => {
// // // // // // // // // // //     const services = [
// // // // // // // // // // //       tryLibreTranslate,
// // // // // // // // // // //       tryGoogleTranslate,
// // // // // // // // // // //       tryMyMemoryTranslate,
// // // // // // // // // // //       tryArgosTranslate
// // // // // // // // // // //     ];
    
// // // // // // // // // // //     for (const service of services) {
// // // // // // // // // // //       try {
// // // // // // // // // // //         const result = await service(text, fromLang, toLang);
// // // // // // // // // // //         if (result && result.trim()) {
// // // // // // // // // // //           console.log(`Success with ${service.name}:`, result);
// // // // // // // // // // //           return result;
// // // // // // // // // // //         }
// // // // // // // // // // //       } catch (err) {
// // // // // // // // // // //         console.warn(`${service.name} failed:`, err.message);
// // // // // // // // // // //         continue;
// // // // // // // // // // //       }
// // // // // // // // // // //     }
    
// // // // // // // // // // //     return null;
// // // // // // // // // // //   };

// // // // // // // // // // //   // Service 1: LibreTranslate
// // // // // // // // // // //   const tryLibreTranslate = async (text, fromLang, toLang) => {
// // // // // // // // // // //     try {
// // // // // // // // // // //       const response = await fetch('https://libretranslate.com/translate', {
// // // // // // // // // // //         method: 'POST',
// // // // // // // // // // //         headers: { 'Content-Type': 'application/json' },
// // // // // // // // // // //         body: JSON.stringify({
// // // // // // // // // // //           q: text,
// // // // // // // // // // //           source: fromLang,
// // // // // // // // // // //           target: toLang,
// // // // // // // // // // //           format: 'text'
// // // // // // // // // // //         })
// // // // // // // // // // //       });
      
// // // // // // // // // // //       if (response.ok) {
// // // // // // // // // // //         const data = await response.json();
// // // // // // // // // // //         return data.translatedText;
// // // // // // // // // // //       }
// // // // // // // // // // //       return null;
// // // // // // // // // // //     } catch (err) {
// // // // // // // // // // //       throw err;
// // // // // // // // // // //     }
// // // // // // // // // // //   };

// // // // // // // // // // //   // Service 2: Google Translate (unofficial)
// // // // // // // // // // //   const tryGoogleTranslate = async (text, fromLang, toLang) => {
// // // // // // // // // // //     try {
// // // // // // // // // // //       const response = await fetch(
// // // // // // // // // // //         `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${fromLang}&tl=${toLang}&dt=t&q=${encodeURIComponent(text)}`
// // // // // // // // // // //       );
      
// // // // // // // // // // //       if (response.ok) {
// // // // // // // // // // //         const data = await response.json();
// // // // // // // // // // //         return data[0][0][0];
// // // // // // // // // // //       }
// // // // // // // // // // //       return null;
// // // // // // // // // // //     } catch (err) {
// // // // // // // // // // //       throw err;
// // // // // // // // // // //     }
// // // // // // // // // // //   };

// // // // // // // // // // //   // Service 3: MyMemory Translate
// // // // // // // // // // //   const tryMyMemoryTranslate = async (text, fromLang, toLang) => {
// // // // // // // // // // //     try {
// // // // // // // // // // //       const response = await fetch(
// // // // // // // // // // //         `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${fromLang}|${toLang}`
// // // // // // // // // // //       );
      
// // // // // // // // // // //       if (response.ok) {
// // // // // // // // // // //         const data = await response.json();
// // // // // // // // // // //         return data.responseData.translatedText;
// // // // // // // // // // //       }
// // // // // // // // // // //       return null;
// // // // // // // // // // //     } catch (err) {
// // // // // // // // // // //       throw err;
// // // // // // // // // // //     }
// // // // // // // // // // //   };

// // // // // // // // // // //   // Service 4: Argos Translate
// // // // // // // // // // //   const tryArgosTranslate = async (text, fromLang, toLang) => {
// // // // // // // // // // //     try {
// // // // // // // // // // //       const response = await fetch('https://translate.argosopentech.com/translate', {
// // // // // // // // // // //         method: 'POST',
// // // // // // // // // // //         headers: { 'Content-Type': 'application/json' },
// // // // // // // // // // //         body: JSON.stringify({
// // // // // // // // // // //           q: text,
// // // // // // // // // // //           source: fromLang,
// // // // // // // // // // //           target: toLang
// // // // // // // // // // //         })
// // // // // // // // // // //       });
      
// // // // // // // // // // //       if (response.ok) {
// // // // // // // // // // //         const data = await response.json();
// // // // // // // // // // //         return data.translatedText;
// // // // // // // // // // //       }
// // // // // // // // // // //       return null;
// // // // // // // // // // //     } catch (err) {
// // // // // // // // // // //       throw err;
// // // // // // // // // // //     }
// // // // // // // // // // //   };

// // // // // // // // // // //   // ✅ OFFLINE FALLBACK DICTIONARY
// // // // // // // // // // //   const getOfflineTranslation = (text, fromLang, toLang) => {
// // // // // // // // // // //     // Common phrases for all languages
// // // // // // // // // // //     const phrases = {
// // // // // // // // // // //       'hello': {
// // // // // // // // // // //         en: 'Hello',
// // // // // // // // // // //         te: 'హలో',
// // // // // // // // // // //         hi: 'नमस्ते',
// // // // // // // // // // //         ta: 'வணக்கம்',
// // // // // // // // // // //         kn: 'ನಮಸ್ಕಾರ',
// // // // // // // // // // //         ml: 'ഹലോ',
// // // // // // // // // // //         es: 'Hola',
// // // // // // // // // // //         fr: 'Bonjour',
// // // // // // // // // // //         de: 'Hallo',
// // // // // // // // // // //         ja: 'こんにちは',
// // // // // // // // // // //         ko: '안녕하세요',
// // // // // // // // // // //         zh: '你好',
// // // // // // // // // // //         ar: 'مرحبا'
// // // // // // // // // // //       },
// // // // // // // // // // //       'thank you': {
// // // // // // // // // // //         en: 'Thank you',
// // // // // // // // // // //         te: 'ధన్యవాదాలు',
// // // // // // // // // // //         hi: 'धन्यवाद',
// // // // // // // // // // //         ta: 'நன்றி',
// // // // // // // // // // //         kn: 'ಧನ್ಯವಾದಗಳು',
// // // // // // // // // // //         ml: 'നന്ദി',
// // // // // // // // // // //         es: 'Gracias',
// // // // // // // // // // //         fr: 'Merci',
// // // // // // // // // // //         de: 'Danke',
// // // // // // // // // // //         ja: 'ありがとう',
// // // // // // // // // // //         ko: '감사합니다',
// // // // // // // // // // //         zh: '谢谢',
// // // // // // // // // // //         ar: 'شكرا'
// // // // // // // // // // //       },
// // // // // // // // // // //       'how are you': {
// // // // // // // // // // //         en: 'How are you?',
// // // // // // // // // // //         te: 'మీరు ఎలా ఉన్నారు?',
// // // // // // // // // // //         hi: 'आप कैसे हैं?',
// // // // // // // // // // //         ta: 'நீங்கள் எப்படி இருக்கிறீர்கள்?',
// // // // // // // // // // //         kn: 'ನೀವು ಹೇಗಿದ್ದೀರಿ?',
// // // // // // // // // // //         ml: 'നീ എങ്ങനെ ഉണ്ട്?',
// // // // // // // // // // //         es: '¿Cómo estás?',
// // // // // // // // // // //         fr: 'Comment allez-vous?',
// // // // // // // // // // //         de: 'Wie geht es dir?',
// // // // // // // // // // //         ja: 'お元気ですか？',
// // // // // // // // // // //         ko: '어떻게 지내세요?',
// // // // // // // // // // //         zh: '你好吗？',
// // // // // // // // // // //         ar: 'كيف حالك؟'
// // // // // // // // // // //       }
// // // // // // // // // // //     };
    
// // // // // // // // // // //     const lowerText = text.toLowerCase().trim();
    
// // // // // // // // // // //     // Check for phrase match
// // // // // // // // // // //     for (const [phrase, translations] of Object.entries(phrases)) {
// // // // // // // // // // //       if (lowerText.includes(phrase) && translations[fromLang] && translations[toLang]) {
// // // // // // // // // // //         return translations[toLang];
// // // // // // // // // // //       }
// // // // // // // // // // //     }
    
// // // // // // // // // // //     // Word-by-word fallback for common words
// // // // // // // // // // //     const commonWords = {
// // // // // // // // // // //       'water': { te: 'నీరు', hi: 'पानी', ta: 'நீர்', en: 'water' },
// // // // // // // // // // //       'food': { te: 'ఆహారం', hi: 'भोजन', ta: 'உணவு', en: 'food' },
// // // // // // // // // // //       'help': { te: 'సహాయం', hi: 'मदद', ta: 'உதவி', en: 'help' },
// // // // // // // // // // //       'money': { te: 'డబ్బు', hi: 'पैसा', ta: 'பணம்', en: 'money' },
// // // // // // // // // // //       'home': { te: 'ఇల్లు', hi: 'घर', ta: 'வீடு', en: 'home' }
// // // // // // // // // // //     };
    
// // // // // // // // // // //     const words = text.split(' ');
// // // // // // // // // // //     const translatedWords = words.map(word => {
// // // // // // // // // // //       const lowerWord = word.toLowerCase();
// // // // // // // // // // //       if (commonWords[lowerWord] && commonWords[lowerWord][toLang]) {
// // // // // // // // // // //         return commonWords[lowerWord][toLang];
// // // // // // // // // // //       }
// // // // // // // // // // //       return word;
// // // // // // // // // // //     });
    
// // // // // // // // // // //     return `[Offline] ${translatedWords.join(' ')}`;
// // // // // // // // // // //   };

// // // // // // // // // // //   // Add to recent translations
// // // // // // // // // // //   const addToRecentTranslations = (translation) => {
// // // // // // // // // // //     setRecentTranslations(prev => [translation, ...prev.slice(0, 4)]);
// // // // // // // // // // //   };

// // // // // // // // // // //   // ✅ SPEECH SYNTHESIS FOR ALL LANGUAGES
// // // // // // // // // // //   const speakText = (text) => {
// // // // // // // // // // //     if (!text || !window.speechSynthesis) {
// // // // // // // // // // //       setError('Text-to-speech not supported');
// // // // // // // // // // //       return;
// // // // // // // // // // //     }
    
// // // // // // // // // // //     // Cancel any ongoing speech
// // // // // // // // // // //     window.speechSynthesis.cancel();
    
// // // // // // // // // // //     // Wait a bit to avoid interrupt errors
// // // // // // // // // // //     setTimeout(() => {
// // // // // // // // // // //       const utterance = new SpeechSynthesisUtterance(text);
// // // // // // // // // // //       utterance.lang = languages[targetLang]?.voice || 'en-US';
// // // // // // // // // // //       utterance.rate = 0.8;
// // // // // // // // // // //       utterance.pitch = 1;
// // // // // // // // // // //       utterance.volume = 1;
      
// // // // // // // // // // //       // Try to find appropriate voice
// // // // // // // // // // //       const voices = window.speechSynthesis.getVoices();
// // // // // // // // // // //       const targetVoice = voices.find(voice => 
// // // // // // // // // // //         voice.lang.startsWith(targetLang) || 
// // // // // // // // // // //         voice.lang.includes(languages[targetLang]?.name.toLowerCase())
// // // // // // // // // // //       );
      
// // // // // // // // // // //       if (targetVoice) {
// // // // // // // // // // //         utterance.voice = targetVoice;
// // // // // // // // // // //       }
      
// // // // // // // // // // //       utterance.onstart = () => {
// // // // // // // // // // //         setIsSpeaking(true);
// // // // // // // // // // //         setStatusMessage(`Speaking in ${languages[targetLang]?.name}...`);
// // // // // // // // // // //       };
      
// // // // // // // // // // //       utterance.onend = () => {
// // // // // // // // // // //         setIsSpeaking(false);
// // // // // // // // // // //         setStatusMessage('Ready');
// // // // // // // // // // //       };
      
// // // // // // // // // // //       utterance.onerror = (e) => {
// // // // // // // // // // //         console.log('Speech synthesis error:', e);
// // // // // // // // // // //         setIsSpeaking(false);
// // // // // // // // // // //         setStatusMessage('Speech completed');
// // // // // // // // // // //       };
      
// // // // // // // // // // //       window.speechSynthesis.speak(utterance);
// // // // // // // // // // //     }, 100);
// // // // // // // // // // //   };

// // // // // // // // // // //   // Initialize speech recognition
// // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // //     if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
// // // // // // // // // // //       setRecognitionSupported(false);
// // // // // // // // // // //       return;
// // // // // // // // // // //     }

// // // // // // // // // // //     try {
// // // // // // // // // // //       const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
// // // // // // // // // // //       recognitionRef.current = new SpeechRecognition();
      
// // // // // // // // // // //       recognitionRef.current.continuous = false;
// // // // // // // // // // //       recognitionRef.current.interimResults = false;
// // // // // // // // // // //       recognitionRef.current.lang = languages[sourceLang]?.voice || 'en-US';
      
// // // // // // // // // // //       recognitionRef.current.onresult = (event) => {
// // // // // // // // // // //         const text = event.results[0][0].transcript;
// // // // // // // // // // //         setTranscript(text);
// // // // // // // // // // //         setPasteText(text);
// // // // // // // // // // //         setStatusMessage('Translating...');
// // // // // // // // // // //         handleTranslate(text);
// // // // // // // // // // //       };
      
// // // // // // // // // // //       recognitionRef.current.onerror = (event) => {
// // // // // // // // // // //         setIsListening(false);
// // // // // // // // // // //         if (event.error === 'not-allowed') {
// // // // // // // // // // //           setError('Microphone access denied');
// // // // // // // // // // //         }
// // // // // // // // // // //       };
      
// // // // // // // // // // //       recognitionRef.current.onend = () => {
// // // // // // // // // // //         setIsListening(false);
// // // // // // // // // // //       };
      
// // // // // // // // // // //     } catch (err) {
// // // // // // // // // // //       setRecognitionSupported(false);
// // // // // // // // // // //     }
    
// // // // // // // // // // //     return () => {
// // // // // // // // // // //       if (recognitionRef.current) {
// // // // // // // // // // //         recognitionRef.current.stop();
// // // // // // // // // // //       }
// // // // // // // // // // //       window.speechSynthesis.cancel();
// // // // // // // // // // //     };
// // // // // // // // // // //   }, [sourceLang]);

// // // // // // // // // // //   // Handle text translation
// // // // // // // // // // //   const handleTextTranslate = () => {
// // // // // // // // // // //     if (!pasteText.trim()) {
// // // // // // // // // // //       setError('Please enter text to translate');
// // // // // // // // // // //       return;
// // // // // // // // // // //     }
// // // // // // // // // // //     setTranscript(pasteText);
// // // // // // // // // // //     handleTranslate(pasteText);
// // // // // // // // // // //   };

// // // // // // // // // // //   // Clear functions
// // // // // // // // // // //   const clearAll = () => {
// // // // // // // // // // //     setTranscript('');
// // // // // // // // // // //     setTranslatedText('');
// // // // // // // // // // //     setPasteText('');
// // // // // // // // // // //     setError('');
// // // // // // // // // // //     setStatusMessage('All cleared');
// // // // // // // // // // //     setIsVoiceRecording(false);
// // // // // // // // // // //     setVoiceHistory([]);
// // // // // // // // // // //     setIsContinuousMode(false);
// // // // // // // // // // //     lastCommandRef.current = '';
// // // // // // // // // // //     window.speechSynthesis.cancel();
// // // // // // // // // // //     if (isListening) {
// // // // // // // // // // //       recognitionRef.current.stop();
// // // // // // // // // // //       setIsListening(false);
// // // // // // // // // // //     }
// // // // // // // // // // //     speakFeedback('All fields cleared');
// // // // // // // // // // //   };

// // // // // // // // // // //   const clearInput = () => {
// // // // // // // // // // //     setTranscript('');
// // // // // // // // // // //     setPasteText('');
// // // // // // // // // // //     setStatusMessage('Input cleared');
// // // // // // // // // // //     speakFeedback('Input text cleared');
// // // // // // // // // // //   };

// // // // // // // // // // //   const clearOutput = () => {
// // // // // // // // // // //     setTranslatedText('');
// // // // // // // // // // //     setStatusMessage('Output cleared');
// // // // // // // // // // //     speakFeedback('Translation output cleared');
// // // // // // // // // // //   };

// // // // // // // // // // //   // Handle back to dashboard
// // // // // // // // // // //   const handleBackToDashboard = () => {
// // // // // // // // // // //     if (isListening) recognitionRef.current?.stop();
// // // // // // // // // // //     if (isSpeaking) window.speechSynthesis.cancel();
// // // // // // // // // // //     setIsVoiceRecording(false);
// // // // // // // // // // //     navigate('/dashboard');
// // // // // // // // // // //   };

// // // // // // // // // // //   // Handle logout
// // // // // // // // // // //   const handleLogout = () => {
// // // // // // // // // // //     localStorage.clear();
// // // // // // // // // // //     navigate('/');
// // // // // // // // // // //   };

// // // // // // // // // // //   // Swap languages
// // // // // // // // // // //   const swapLanguages = () => {
// // // // // // // // // // //     setSourceLang(targetLang);
// // // // // // // // // // //     setTargetLang(sourceLang);
// // // // // // // // // // //     setTranslatedText('');
// // // // // // // // // // //     setStatusMessage('Languages swapped');
// // // // // // // // // // //   };

// // // // // // // // // // //   // Copy to clipboard
// // // // // // // // // // //   const copyToClipboard = (text) => {
// // // // // // // // // // //     navigator.clipboard.writeText(text)
// // // // // // // // // // //       .then(() => {
// // // // // // // // // // //         setStatusMessage('Copied!');
// // // // // // // // // // //         setTimeout(() => setStatusMessage('Ready'), 2000);
// // // // // // // // // // //       })
// // // // // // // // // // //       .catch(() => setError('Failed to copy'));
// // // // // // // // // // //   };

// // // // // // // // // // //   // Auto-detect from text
// // // // // // // // // // //   const handleAutoDetect = async () => {
// // // // // // // // // // //     const text = pasteText || transcript;
// // // // // // // // // // //     if (!text.trim()) return;
// // // // // // // // // // //     const detected = await detectLanguage(text);
// // // // // // // // // // //     if (detected && detected !== sourceLang) {
// // // // // // // // // // //       setSourceLang(detected);
// // // // // // // // // // //       setStatusMessage(`Auto-detected: ${languages[detected]?.name}`);
// // // // // // // // // // //     }
// // // // // // // // // // //   };

// // // // // // // // // // //   // Quick language set
// // // // // // // // // // //   const setQuickLanguage = (langCode) => {
// // // // // // // // // // //     setSourceLang(langCode);
// // // // // // // // // // //     setStatusMessage(`Source set to ${languages[langCode]?.name}`);
// // // // // // // // // // //   };

// // // // // // // // // // //   // Get popular language pairs
// // // // // // // // // // //   const popularPairs = [
// // // // // // // // // // //     { from: 'en', to: 'te', label: 'English → Telugu' },
// // // // // // // // // // //     { from: 'te', to: 'en', label: 'Telugu → English' },
// // // // // // // // // // //     { from: 'hi', to: 'en', label: 'Hindi → English' },
// // // // // // // // // // //     { from: 'en', to: 'hi', label: 'English → Hindi' },
// // // // // // // // // // //     { from: 'en', to: 'es', label: 'English → Spanish' },
// // // // // // // // // // //     { from: 'en', to: 'fr', label: 'English → French' }
// // // // // // // // // // //   ];

// // // // // // // // // // //   return (
// // // // // // // // // // //     <div className="language-translator-container">
// // // // // // // // // // //       {/* Fixed Header */}
// // // // // // // // // // //       <header className="fixed-header">
// // // // // // // // // // //         <div className="header-content">
// // // // // // // // // // //           <div className="header-left">
// // // // // // // // // // //             <button className="back-btn" onClick={handleBackToDashboard}>
// // // // // // // // // // //               ← Dashboard
// // // // // // // // // // //             </button>
// // // // // // // // // // //             <h1 className="logo">Vision Assist</h1>
// // // // // // // // // // //           </div>
// // // // // // // // // // //           <div className="user-menu">
// // // // // // // // // // //             <div className="voice-control-status">
// // // // // // // // // // //               <div className={`voice-status-indicator ${
// // // // // // // // // // //                 voiceService.isListening ? 'listening' : 'idle'
// // // // // // // // // // //               }`}>
// // // // // // // // // // //                 {voiceService.isListening ? '🎤 Voice Active' : '🎤 Voice Ready'}
// // // // // // // // // // //               </div>
// // // // // // // // // // //               <button 
// // // // // // // // // // //                 onClick={() => setShowVoiceHelp(!showVoiceHelp)}
// // // // // // // // // // //                 className="voice-help-btn"
// // // // // // // // // // //                 title="Voice Commands Help"
// // // // // // // // // // //               >
// // // // // // // // // // //                 ?
// // // // // // // // // // //               </button>
// // // // // // // // // // //             </div>
// // // // // // // // // // //             <span className="api-status">{apiStatus}</span>
// // // // // // // // // // //             <button className="logout-btn" onClick={handleLogout}>
// // // // // // // // // // //               Logout
// // // // // // // // // // //             </button>
// // // // // // // // // // //           </div>
// // // // // // // // // // //         </div>
// // // // // // // // // // //       </header>

// // // // // // // // // // //       <div className="language-translator-content">
// // // // // // // // // // //         {/* Voice Commands Help */}
// // // // // // // // // // //         {showVoiceHelp && (
// // // // // // // // // // //           <div className="voice-commands-help-overlay">
// // // // // // // // // // //             <div className="voice-commands-help">
// // // // // // // // // // //               <div className="help-header">
// // // // // // // // // // //                 <h3>🎤 Voice Commands</h3>
// // // // // // // // // // //                 <button onClick={() => setShowVoiceHelp(false)} className="close-btn">×</button>
// // // // // // // // // // //               </div>
              
// // // // // // // // // // //               <div className="help-content">
// // // // // // // // // // //                 <p className="help-intro">
// // // // // // // // // // //                   Say these commands to control the translator:
// // // // // // // // // // //                 </p>
                
// // // // // // // // // // //                 <div className="command-category">
// // // // // // // // // // //                   <h4>🎤 Speech Control</h4>
// // // // // // // // // // //                   <div className="command-list">
// // // // // // // // // // //                     <div className="command-item">"start listening" or "speak now"</div>
// // // // // // // // // // //                     <div className="command-item">"continuous mode" (append text)</div>
// // // // // // // // // // //                     <div className="command-item">"speak translation"</div>
// // // // // // // // // // //                   </div>
// // // // // // // // // // //                 </div>
                
// // // // // // // // // // //                 <div className="command-category">
// // // // // // // // // // //                   <h4>🔄 Translation</h4>
// // // // // // // // // // //                   <div className="command-list">
// // // // // // // // // // //                     <div className="command-item">"translate" (translates current text)</div>
// // // // // // // // // // //                     <div className="command-item">"translate to [language]"</div>
// // // // // // // // // // //                     <div className="command-item">"swap languages"</div>
// // // // // // // // // // //                   </div>
// // // // // // // // // // //                 </div>
                
// // // // // // // // // // //                 <div className="command-category">
// // // // // // // // // // //                   <h4>🗑️ Clear Commands</h4>
// // // // // // // // // // //                   <div className="command-list">
// // // // // // // // // // //                     <div className="command-item">"clear all" (clears everything)</div>
// // // // // // // // // // //                     <div className="command-item">"clear input" (clears input only)</div>
// // // // // // // // // // //                     <div className="command-item">"clear output" (clears output only)</div>
// // // // // // // // // // //                   </div>
// // // // // // // // // // //                 </div>
                
// // // // // // // // // // //                 <div className="command-category">
// // // // // // // // // // //                   <h4>🌍 Language Selection</h4>
// // // // // // // // // // //                   <div className="command-list">
// // // // // // // // // // //                     <div className="command-item">"english to hindi"</div>
// // // // // // // // // // //                     <div className="command-item">"hindi to english"</div>
// // // // // // // // // // //                     <div className="command-item">"select [language]"</div>
// // // // // // // // // // //                   </div>
// // // // // // // // // // //                 </div>
                
// // // // // // // // // // //                 <div className="tips">
// // // // // // // // // // //                   <h4>💡 How to use:</h4>
// // // // // // // // // // //                   <ol>
// // // // // // // // // // //                     <li>Say <strong>"start listening"</strong> then speak your text</li>
// // // // // // // // // // //                     <li>Text automatically appears in input box</li>
// // // // // // // // // // //                     <li>Say <strong>"translate"</strong> to translate it</li>
// // // // // // // // // // //                     <li>Change target language and say <strong>"translate"</strong> again for different language</li>
// // // // // // // // // // //                     <li>Say <strong>"continuous mode"</strong> to keep adding text</li>
// // // // // // // // // // //                   </ol>
// // // // // // // // // // //                   <p><strong>Note:</strong> Voice assistant is always listening. No need to say "stop".</p>
// // // // // // // // // // //                 </div>
// // // // // // // // // // //               </div>
// // // // // // // // // // //             </div>
// // // // // // // // // // //           </div>
// // // // // // // // // // //         )}

// // // // // // // // // // //         <div className="language-translator-header">
// // // // // // // // // // //           <h2>🌍 Multi-Language Translator</h2>
// // // // // // // // // // //           <p>Translate between 25+ languages including all major Indian languages</p>
// // // // // // // // // // //           <div className="stats">
// // // // // // // // // // //             <span className="stat-item">📚 25+ Languages</span>
// // // // // // // // // // //             <span className="stat-item">⚡ Real-time</span>
// // // // // // // // // // //             <span className="stat-item">🔊 Text-to-Speech</span>
// // // // // // // // // // //             <span className="stat-item">🎤 Voice Commands</span>
// // // // // // // // // // //             <span className={`mode-indicator ${isContinuousMode ? 'continuous' : ''} ${isVoiceRecording ? 'recording' : ''}`}>
// // // // // // // // // // //               {isVoiceRecording ? '🎤 Recording...' : isContinuousMode ? '🔁 Continuous Mode' : '⏺️ Single Mode'}
// // // // // // // // // // //             </span>
// // // // // // // // // // //           </div>
// // // // // // // // // // //         </div>

// // // // // // // // // // //         {/* Status Message */}
// // // // // // // // // // //         {statusMessage && (
// // // // // // // // // // //           <div className="status-message">
// // // // // // // // // // //             {statusMessage}
// // // // // // // // // // //             {error && <div className="error-text">{error}</div>}
// // // // // // // // // // //           </div>
// // // // // // // // // // //         )}

// // // // // // // // // // //         {/* Recording Status */}
// // // // // // // // // // //         {isVoiceRecording && (
// // // // // // // // // // //           <div className="recording-status">
// // // // // // // // // // //             <div className="recording-pulse"></div>
// // // // // // // // // // //             <span>🎤 Speak now... Your speech will appear in the text box</span>
// // // // // // // // // // //           </div>
// // // // // // // // // // //         )}

// // // // // // // // // // //         {/* Voice History */}
// // // // // // // // // // //         {voiceHistory.length > 0 && (
// // // // // // // // // // //           <div className="voice-history">
// // // // // // // // // // //             <h3>🗣️ Recent Speech</h3>
// // // // // // // // // // //             <div className="history-list">
// // // // // // // // // // //               {voiceHistory.slice(0, 3).map((item, idx) => (
// // // // // // // // // // //                 <div key={idx} className="history-item">
// // // // // // // // // // //                   <span className="history-time">{item.timestamp}</span>
// // // // // // // // // // //                   <span className="history-text">{item.text.substring(0, 50)}...</span>
// // // // // // // // // // //                   <button 
// // // // // // // // // // //                     onClick={() => {
// // // // // // // // // // //                       setPasteText(item.text);
// // // // // // // // // // //                       setTranscript(item.text);
// // // // // // // // // // //                       setStatusMessage(`Loaded: "${item.text.substring(0, 30)}..."`);
// // // // // // // // // // //                     }}
// // // // // // // // // // //                     className="history-use-btn"
// // // // // // // // // // //                   >
// // // // // // // // // // //                     Use
// // // // // // // // // // //                   </button>
// // // // // // // // // // //                 </div>
// // // // // // // // // // //               ))}
// // // // // // // // // // //             </div>
// // // // // // // // // // //           </div>
// // // // // // // // // // //         )}

// // // // // // // // // // //         {/* Quick Language Pairs */}
// // // // // // // // // // //         <div className="quick-pairs">
// // // // // // // // // // //           <h3>🚀 Quick Translations</h3>
// // // // // // // // // // //           <div className="pairs-grid">
// // // // // // // // // // //             {popularPairs.map((pair, idx) => (
// // // // // // // // // // //               <button
// // // // // // // // // // //                 key={idx}
// // // // // // // // // // //                 onClick={() => {
// // // // // // // // // // //                   setSourceLang(pair.from);
// // // // // // // // // // //                   setTargetLang(pair.to);
// // // // // // // // // // //                   setStatusMessage(`Set to ${pair.label}`);
// // // // // // // // // // //                   // Auto-translate if there's text
// // // // // // // // // // //                   if (pasteText || transcript) {
// // // // // // // // // // //                     setTimeout(() => handleTranslate(), 500);
// // // // // // // // // // //                   }
// // // // // // // // // // //                 }}
// // // // // // // // // // //                 className="pair-btn"
// // // // // // // // // // //               >
// // // // // // // // // // //                 {pair.label}
// // // // // // // // // // //               </button>
// // // // // // // // // // //             ))}
// // // // // // // // // // //           </div>
// // // // // // // // // // //         </div>

// // // // // // // // // // //         {/* Language Selection */}
// // // // // // // // // // //         <div className="language-selection-section">
// // // // // // // // // // //           <div className="selection-row">
// // // // // // // // // // //             <div className="lang-selector">
// // // // // // // // // // //               <label>From Language:</label>
// // // // // // // // // // //               <div className="lang-select-wrapper">
// // // // // // // // // // //                 <select 
// // // // // // // // // // //                   value={sourceLang}
// // // // // // // // // // //                   onChange={(e) => setSourceLang(e.target.value)}
// // // // // // // // // // //                   className="lang-select"
// // // // // // // // // // //                 >
// // // // // // // // // // //                   <option value="auto">🔍 Auto-detect</option>
// // // // // // // // // // //                   <optgroup label="Indian Languages">
// // // // // // // // // // //                     {languageGroups.indian.map(code => (
// // // // // // // // // // //                       <option key={code} value={code}>
// // // // // // // // // // //                         {languages[code]?.flag} {languages[code]?.name} ({languages[code]?.nativeName})
// // // // // // // // // // //                       </option>
// // // // // // // // // // //                     ))}
// // // // // // // // // // //                   </optgroup>
// // // // // // // // // // //                   <optgroup label="International">
// // // // // // // // // // //                     {languageGroups.international.map(code => (
// // // // // // // // // // //                       <option key={code} value={code}>
// // // // // // // // // // //                         {languages[code]?.flag} {languages[code]?.name}
// // // // // // // // // // //                       </option>
// // // // // // // // // // //                     ))}
// // // // // // // // // // //                   </optgroup>
// // // // // // // // // // //                 </select>
// // // // // // // // // // //                 {sourceLang !== 'auto' && (
// // // // // // // // // // //                   <div className="selected-lang-display">
// // // // // // // // // // //                     {languages[sourceLang]?.flag} {languages[sourceLang]?.nativeName}
// // // // // // // // // // //                   </div>
// // // // // // // // // // //                 )}
// // // // // // // // // // //               </div>
// // // // // // // // // // //             </div>
            
// // // // // // // // // // //             <button onClick={swapLanguagesWithFeedback} className="swap-lang-btn" title="Swap languages">
// // // // // // // // // // //               ⇄
// // // // // // // // // // //             </button>
            
// // // // // // // // // // //             <div className="lang-selector">
// // // // // // // // // // //               <label>To Language:</label>
// // // // // // // // // // //               <div className="lang-select-wrapper">
// // // // // // // // // // //                 <select 
// // // // // // // // // // //                   value={targetLang}
// // // // // // // // // // //                   onChange={(e) => {
// // // // // // // // // // //                     setTargetLang(e.target.value);
// // // // // // // // // // //                     // Auto-translate when target language changes
// // // // // // // // // // //                     if (pasteText || transcript) {
// // // // // // // // // // //                       setTimeout(() => handleTranslate(), 500);
// // // // // // // // // // //                     }
// // // // // // // // // // //                   }}
// // // // // // // // // // //                   className="lang-select"
// // // // // // // // // // //                 >
// // // // // // // // // // //                   <optgroup label="Popular">
// // // // // // // // // // //                     {languageGroups.popular.map(code => (
// // // // // // // // // // //                       <option key={code} value={code}>
// // // // // // // // // // //                         {languages[code]?.flag} {languages[code]?.name}
// // // // // // // // // // //                       </option>
// // // // // // // // // // //                     ))}
// // // // // // // // // // //                   </optgroup>
// // // // // // // // // // //                   <optgroup label="All Languages">
// // // // // // // // // // //                     {Object.entries(languages).map(([code, lang]) => (
// // // // // // // // // // //                       <option key={code} value={code}>
// // // // // // // // // // //                         {lang.flag} {lang.name}
// // // // // // // // // // //                       </option>
// // // // // // // // // // //                     ))}
// // // // // // // // // // //                   </optgroup>
// // // // // // // // // // //                 </select>
// // // // // // // // // // //                 <div className="selected-lang-display">
// // // // // // // // // // //                   {languages[targetLang]?.flag} {languages[targetLang]?.nativeName}
// // // // // // // // // // //                 </div>
// // // // // // // // // // //               </div>
// // // // // // // // // // //             </div>
// // // // // // // // // // //           </div>
          
// // // // // // // // // // //           {detectedLanguage && sourceLang === 'auto' && (
// // // // // // // // // // //             <div className="detected-language">
// // // // // // // // // // //               🔍 Detected: <strong>{languages[detectedLanguage]?.name}</strong>
// // // // // // // // // // //             </div>
// // // // // // // // // // //           )}
// // // // // // // // // // //         </div>

// // // // // // // // // // //         {/* Input Section */}
// // // // // // // // // // //         <div className="input-section">
// // // // // // // // // // //           <div className="input-header">
// // // // // // // // // // //             <h3>📝 Enter Text</h3>
// // // // // // // // // // //             <div className="input-controls">
// // // // // // // // // // //               <div className="input-mode">
// // // // // // // // // // //                 <button 
// // // // // // // // // // //                   className={`mode-btn ${!isPasteMode ? 'active' : ''}`}
// // // // // // // // // // //                   onClick={() => setIsPasteMode(false)}
// // // // // // // // // // //                 >
// // // // // // // // // // //                   🎤 Speak
// // // // // // // // // // //                 </button>
// // // // // // // // // // //                 <button 
// // // // // // // // // // //                   className={`mode-btn ${isPasteMode ? 'active' : ''}`}
// // // // // // // // // // //                   onClick={() => setIsPasteMode(true)}
// // // // // // // // // // //                 >
// // // // // // // // // // //                   ⌨️ Type
// // // // // // // // // // //                 </button>
// // // // // // // // // // //               </div>
// // // // // // // // // // //               <div className="clear-buttons">
// // // // // // // // // // //                 <button onClick={clearInput} className="clear-input-btn" title="Clear input only">
// // // // // // // // // // //                   🗑️ Clear Input
// // // // // // // // // // //                 </button>
// // // // // // // // // // //                 <button onClick={clearAll} className="clear-all-btn" title="Clear everything">
// // // // // // // // // // //                   🗑️ Clear All
// // // // // // // // // // //                 </button>
// // // // // // // // // // //               </div>
// // // // // // // // // // //             </div>
// // // // // // // // // // //           </div>
          
// // // // // // // // // // //           <div className="text-input">
// // // // // // // // // // //             <div className="text-input-wrapper">
// // // // // // // // // // //               <textarea
// // // // // // // // // // //                 ref={textareaRef}
// // // // // // // // // // //                 value={pasteText}
// // // // // // // // // // //                 onChange={(e) => setPasteText(e.target.value)}
// // // // // // // // // // //                 placeholder={`Enter text or say "start listening" then speak...`}
// // // // // // // // // // //                 className="translation-textarea"
// // // // // // // // // // //                 rows="5"
// // // // // // // // // // //               />
// // // // // // // // // // //               <div className="textarea-actions">
// // // // // // // // // // //                 <button onClick={handleAutoDetect} className="detect-btn">
// // // // // // // // // // //                   🔍 Detect Language
// // // // // // // // // // //                 </button>
// // // // // // // // // // //                 <button onClick={clearInput} className="clear-text-btn">
// // // // // // // // // // //                   🗑️ Clear
// // // // // // // // // // //                 </button>
// // // // // // // // // // //               </div>
// // // // // // // // // // //             </div>
// // // // // // // // // // //             <div className="translate-actions">
// // // // // // // // // // //               <button
// // // // // // // // // // //                 onClick={() => {
// // // // // // // // // // //                   setTranscript(pasteText);
// // // // // // // // // // //                   handleTranslateWithFeedback(pasteText);
// // // // // // // // // // //                 }}
// // // // // // // // // // //                 disabled={isTranslating || !pasteText.trim()}
// // // // // // // // // // //                 className="translate-action-btn"
// // // // // // // // // // //               >
// // // // // // // // // // //                 {isTranslating ? (
// // // // // // // // // // //                   <>
// // // // // // // // // // //                     <span className="spinner"></span>
// // // // // // // // // // //                     Translating...
// // // // // // // // // // //                   </>
// // // // // // // // // // //                 ) : (
// // // // // // // // // // //                   `🌐 Translate to ${languages[targetLang]?.name}`
// // // // // // // // // // //                 )}
// // // // // // // // // // //               </button>
              
// // // // // // // // // // //               <button
// // // // // // // // // // //                 onClick={startVoiceRecording}
// // // // // // // // // // //                 className={`voice-record-btn ${isVoiceRecording ? 'recording' : ''}`}
// // // // // // // // // // //               >
// // // // // // // // // // //                 {isVoiceRecording ? '⏺️ Recording...' : '🎤 Start Voice Input'}
// // // // // // // // // // //               </button>
              
// // // // // // // // // // //               <button
// // // // // // // // // // //                 onClick={toggleContinuousMode}
// // // // // // // // // // //                 className={`continuous-mode-btn ${isContinuousMode ? 'active' : ''}`}
// // // // // // // // // // //               >
// // // // // // // // // // //                 {isContinuousMode ? '🔁 Continuous On' : '🔁 Continuous Off'}
// // // // // // // // // // //               </button>
// // // // // // // // // // //             </div>
// // // // // // // // // // //           </div>
// // // // // // // // // // //         </div>

// // // // // // // // // // //         {/* Translation Results */}
// // // // // // // // // // //         <div className="translation-results">
// // // // // // // // // // //           <div className="results-header">
// // // // // // // // // // //             <h3>📊 Translation Results</h3>
// // // // // // // // // // //             <div className="results-controls">
// // // // // // // // // // //               <button onClick={clearOutput} className="clear-output-btn" title="Clear output only">
// // // // // // // // // // //                 🗑️ Clear Output
// // // // // // // // // // //               </button>
// // // // // // // // // // //             </div>
// // // // // // // // // // //           </div>
          
// // // // // // // // // // //           <div className="results-container">
// // // // // // // // // // //             <div className="source-result">
// // // // // // // // // // //               <div className="result-header">
// // // // // // // // // // //                 <h4>
// // // // // // // // // // //                   {sourceLang === 'auto' ? 'Source Text' : languages[sourceLang]?.name}
// // // // // // // // // // //                   {detectedLanguage && sourceLang === 'auto' && 
// // // // // // // // // // //                     <span className="detected-tag"> ({languages[detectedLanguage]?.name})</span>
// // // // // // // // // // //                   }
// // // // // // // // // // //                 </h4>
// // // // // // // // // // //                 {(transcript || pasteText) && (
// // // // // // // // // // //                   <button onClick={() => copyToClipboard(transcript || pasteText)} className="action-btn">
// // // // // // // // // // //                     📋 Copy
// // // // // // // // // // //                   </button>
// // // // // // // // // // //                 )}
// // // // // // // // // // //               </div>
// // // // // // // // // // //               <div className="result-content">
// // // // // // // // // // //                 {transcript || pasteText || (
// // // // // // // // // // //                   <div className="empty-state">
// // // // // // // // // // //                     <div className="empty-icon">💭</div>
// // // // // // // // // // //                     <p>Text will appear here after you speak or type</p>
// // // // // // // // // // //                   </div>
// // // // // // // // // // //                 )}
// // // // // // // // // // //               </div>
// // // // // // // // // // //             </div>
            
// // // // // // // // // // //             <div className="target-result">
// // // // // // // // // // //               <div className="result-header">
// // // // // // // // // // //                 <h4>{languages[targetLang]?.name}</h4>
// // // // // // // // // // //                 {translatedText && (
// // // // // // // // // // //                   <div className="result-actions">
// // // // // // // // // // //                     <button onClick={() => copyToClipboard(translatedText)} className="action-btn">
// // // // // // // // // // //                       📋 Copy
// // // // // // // // // // //                     </button>
// // // // // // // // // // //                     <button 
// // // // // // // // // // //                       onClick={isSpeaking ? () => window.speechSynthesis.cancel() : () => speakText(translatedText)}
// // // // // // // // // // //                       className={`speak-action-btn ${isSpeaking ? 'speaking' : ''}`}
// // // // // // // // // // //                     >
// // // // // // // // // // //                       {isSpeaking ? '⏹️ Stop' : '🔊 Speak'}
// // // // // // // // // // //                     </button>
// // // // // // // // // // //                   </div>
// // // // // // // // // // //                 )}
// // // // // // // // // // //               </div>
// // // // // // // // // // //               <div className="result-content">
// // // // // // // // // // //                 {translatedText || (
// // // // // // // // // // //                   <div className="empty-state">
// // // // // // // // // // //                     <div className="empty-icon">🌐</div>
// // // // // // // // // // //                     <p>Translation will appear here</p>
// // // // // // // // // // //                   </div>
// // // // // // // // // // //                 )}
// // // // // // // // // // //               </div>
// // // // // // // // // // //             </div>
// // // // // // // // // // //           </div>
          
// // // // // // // // // // //           {translatedText && (
// // // // // // // // // // //             <div className="post-translation-actions">
// // // // // // // // // // //               <button
// // // // // // // // // // //                 onClick={() => {
// // // // // // // // // // //                   // Retranslate same text (useful when changing target language)
// // // // // // // // // // //                   const currentText = pasteText || transcript;
// // // // // // // // // // //                   if (currentText) {
// // // // // // // // // // //                     handleTranslate(currentText);
// // // // // // // // // // //                   }
// // // // // // // // // // //                 }}
// // // // // // // // // // //                 className="retranslate-btn"
// // // // // // // // // // //               >
// // // // // // // // // // //                 🔄 Retranslate Same Text
// // // // // // // // // // //               </button>
              
// // // // // // // // // // //               <button
// // // // // // // // // // //                 onClick={() => {
// // // // // // // // // // //                   setSourceLang(targetLang);
// // // // // // // // // // //                   setTargetLang(sourceLang);
// // // // // // // // // // //                   setTranscript(translatedText);
// // // // // // // // // // //                   setPasteText(translatedText);
// // // // // // // // // // //                   handleTranslate(translatedText);
// // // // // // // // // // //                 }}
// // // // // // // // // // //                 className="swap-translate-btn"
// // // // // // // // // // //               >
// // // // // // // // // // //                 🔁 Swap & Retranslate
// // // // // // // // // // //               </button>
// // // // // // // // // // //             </div>
// // // // // // // // // // //           )}
// // // // // // // // // // //         </div>

// // // // // // // // // // //         {/* Recent Translations */}
// // // // // // // // // // //         {recentTranslations.length > 0 && (
// // // // // // // // // // //           <div className="recent-translations">
// // // // // // // // // // //             <h3>🕐 Recent Translations</h3>
// // // // // // // // // // //             <div className="recent-list">
// // // // // // // // // // //               {recentTranslations.map((item, idx) => (
// // // // // // // // // // //                 <div key={idx} className="recent-item">
// // // // // // // // // // //                   <div className="recent-langs">
// // // // // // // // // // //                     <span className="lang-from">{item.sourceLang}</span>
// // // // // // // // // // //                     <span className="arrow">→</span>
// // // // // // // // // // //                     <span className="lang-to">{item.targetLang}</span>
// // // // // // // // // // //                   </div>
// // // // // // // // // // //                   <div className="recent-text">
// // // // // // // // // // //                     <p className="source-text">{item.sourceText.substring(0, 50)}...</p>
// // // // // // // // // // //                     <p className="translated-text">{item.translatedText.substring(0, 50)}...</p>
// // // // // // // // // // //                   </div>
// // // // // // // // // // //                   <button 
// // // // // // // // // // //                     onClick={() => {
// // // // // // // // // // //                       setPasteText(item.sourceText);
// // // // // // // // // // //                       setTranscript(item.sourceText);
// // // // // // // // // // //                       setTargetLang(Object.keys(languages).find(k => languages[k]?.name === item.targetLang) || 'en');
// // // // // // // // // // //                       setStatusMessage(`Loaded "${item.sourceLang}" text`);
// // // // // // // // // // //                     }}
// // // // // // // // // // //                     className="reuse-btn"
// // // // // // // // // // //                   >
// // // // // // // // // // //                     ↺ Use Text
// // // // // // // // // // //                   </button>
// // // // // // // // // // //                 </div>
// // // // // // // // // // //               ))}
// // // // // // // // // // //             </div>
// // // // // // // // // // //           </div>
// // // // // // // // // // //         )}

// // // // // // // // // // //         {/* Language Support Info */}
// // // // // // // // // // //         <div className="language-support">
// // // // // // // // // // //           <h3>🌐 Supported Languages</h3>
// // // // // // // // // // //           <div className="language-categories">
// // // // // // // // // // //             <div className="category">
// // // // // // // // // // //               <h4>🇮🇳 Indian Languages</h4>
// // // // // // // // // // //               <div className="lang-list">
// // // // // // // // // // //                 {languageGroups.indian.map(code => (
// // // // // // // // // // //                   <span key={code} className="lang-tag">
// // // // // // // // // // //                     {languages[code]?.flag} {languages[code]?.name}
// // // // // // // // // // //                   </span>
// // // // // // // // // // //                 ))}
// // // // // // // // // // //               </div>
// // // // // // // // // // //             </div>
// // // // // // // // // // //             <div className="category">
// // // // // // // // // // //               <h4>🌍 International</h4>
// // // // // // // // // // //               <div className="lang-list">
// // // // // // // // // // //                 {languageGroups.international.map(code => (
// // // // // // // // // // //                   <span key={code} className="lang-tag">
// // // // // // // // // // //                     {languages[code]?.flag} {languages[code]?.name}
// // // // // // // // // // //                   </span>
// // // // // // // // // // //                 ))}
// // // // // // // // // // //               </div>
// // // // // // // // // // //             </div>
// // // // // // // // // // //           </div>
// // // // // // // // // // //         </div>
// // // // // // // // // // //       </div>

// // // // // // // // // // //       {/* Status Bar */}
// // // // // // // // // // //       <div className="status-bar">
// // // // // // // // // // //         <p>
// // // // // // // // // // //           {isVoiceRecording ? `🎤 Listening for your speech...` :
// // // // // // // // // // //            isTranslating ? `🔄 Translating to ${languages[targetLang]?.name}` :
// // // // // // // // // // //            isSpeaking ? `🔊 Speaking translation` :
// // // // // // // // // // //            translatedText ? `✅ ${languages[sourceLang]?.name} → ${languages[targetLang]?.name}` :
// // // // // // // // // // //            voiceService.isListening ? '🎤 Voice assistant ready - Say "start listening"' :
// // // // // // // // // // //            '🟢 Ready to translate'}
// // // // // // // // // // //         </p>
// // // // // // // // // // //         {voiceService.isListening && (
// // // // // // // // // // //           <div className="voice-activity">
// // // // // // // // // // //             <div className="pulse-dot"></div>
// // // // // // // // // // //             <span>Voice active</span>
// // // // // // // // // // //           </div>
// // // // // // // // // // //         )}
// // // // // // // // // // //       </div>
// // // // // // // // // // //     </div>
// // // // // // // // // // //   );
// // // // // // // // // // // };

// // // // // // // // // // // export default LanguageTranslator;






// // // // LanguageTranslator.jsx - COMPLETE FIXED VERSION
// // // import React, { useState, useEffect, useRef } from 'react';
// // // import { useNavigate } from 'react-router-dom';
// // // import { voiceService } from '../../services/voiceService';
// // // import { initializeLanguageTranslatorCommands } from '../../voice-commands/languageTranslatorCommands';
// // // import './LanguageTranslator.css';

// // // const LanguageTranslator = () => {
// // //   const navigate = useNavigate();
  
// // //   // State declarations
// // //   const [isListening, setIsListening] = useState(false);
// // //   const [transcript, setTranscript] = useState('');
// // //   const [translatedText, setTranslatedText] = useState('');
// // //   const [isTranslating, setIsTranslating] = useState(false);
// // //   const [error, setError] = useState('');
// // //   const [isSpeaking, setIsSpeaking] = useState(false);
// // //   const [sourceLang, setSourceLang] = useState('en');
// // //   const [targetLang, setTargetLang] = useState('hi'); // Changed default to Hindi
// // //   const [recognitionSupported, setRecognitionSupported] = useState(true);
// // //   const [statusMessage, setStatusMessage] = useState('Ready to translate');
// // //   const [isPasteMode, setIsPasteMode] = useState(false);
// // //   const [pasteText, setPasteText] = useState('');
// // //   const [apiStatus, setApiStatus] = useState('✅ API Ready');
// // //   const [recentTranslations, setRecentTranslations] = useState([]);
// // //   const [detectedLanguage, setDetectedLanguage] = useState('');
// // //   const [showVoiceHelp, setShowVoiceHelp] = useState(false);
// // //   const [isVoiceRecording, setIsVoiceRecording] = useState(false);
// // //   const [isContinuousMode, setIsContinuousMode] = useState(false);
// // //   const [voiceHistory, setVoiceHistory] = useState([]);
  
// // //   // Refs
// // //   const recognitionRef = useRef(null);
// // //   const textareaRef = useRef(null);
// // //   const componentRef = useRef(null);
// // //   const lastCommandRef = useRef('');
// // //   const isSpeechRecognitionRestarting = useRef(false);
  
// // //   // ✅ EXTENDED LANGUAGE SUPPORT WITH PROPER CODES
// // //   const languages = {
// // //     // Indian Languages
// // //     en: { code: 'en', name: 'English', nativeName: 'English', 
// // //           voice: 'en-US', recognition: 'en-US', flag: '🇺🇸', tts: true },
// // //     te: { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', 
// // //           voice: 'te-IN', recognition: 'te-IN', flag: '🇮🇳', tts: false },
// // //     hi: { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', 
// // //           voice: 'hi-IN', recognition: 'hi-IN', flag: '🇮🇳', tts: false },
// // //     ta: { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', 
// // //           voice: 'ta-IN', recognition: 'ta-IN', flag: '🇮🇳', tts: false },
// // //     kn: { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', 
// // //           voice: 'kn-IN', recognition: 'kn-IN', flag: '🇮🇳', tts: false },
// // //     ml: { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', 
// // //           voice: 'ml-IN', recognition: 'ml-IN', flag: '🇮🇳', tts: false },
// // //     mr: { code: 'mr', name: 'Marathi', nativeName: 'मराठी', 
// // //           voice: 'mr-IN', recognition: 'mr-IN', flag: '🇮🇳', tts: false },
// // //     gu: { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', 
// // //           voice: 'gu-IN', recognition: 'gu-IN', flag: '🇮🇳', tts: false },
// // //     bn: { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', 
// // //           voice: 'bn-IN', recognition: 'bn-IN', flag: '🇮🇳', tts: false },
// // //     pa: { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', 
// // //           voice: 'pa-IN', recognition: 'pa-IN', flag: '🇮🇳', tts: false },
// // //     or: { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ', 
// // //           voice: 'or-IN', recognition: 'or-IN', flag: '🇮🇳', tts: false },
// // //     ur: { code: 'ur', name: 'Urdu', nativeName: 'اردو', 
// // //           voice: 'ur-PK', recognition: 'ur-PK', flag: '🇵🇰', tts: false },
// // //     as: { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া', 
// // //           voice: 'as-IN', recognition: 'as-IN', flag: '🇮🇳', tts: false },
// // //     sa: { code: 'sa', name: 'Sanskrit', nativeName: 'संस्कृतम्', 
// // //           voice: 'sa-IN', recognition: 'sa-IN', flag: '🇮🇳', tts: false },
    
// // //     // International Languages
// // //     es: { code: 'es', name: 'Spanish', nativeName: 'Español', 
// // //           voice: 'es-ES', recognition: 'es-ES', flag: '🇪🇸', tts: true },
// // //     fr: { code: 'fr', name: 'French', nativeName: 'Français', 
// // //           voice: 'fr-FR', recognition: 'fr-FR', flag: '🇫🇷', tts: true },
// // //     de: { code: 'de', name: 'German', nativeName: 'Deutsch', 
// // //           voice: 'de-DE', recognition: 'de-DE', flag: '🇩🇪', tts: true },
// // //     it: { code: 'it', name: 'Italian', nativeName: 'Italiano', 
// // //           voice: 'it-IT', recognition: 'it-IT', flag: '🇮🇹', tts: true },
// // //     pt: { code: 'pt', name: 'Portuguese', nativeName: 'Português', 
// // //           voice: 'pt-PT', recognition: 'pt-PT', flag: '🇵🇹', tts: true },
// // //     ru: { code: 'ru', name: 'Russian', nativeName: 'Русский', 
// // //           voice: 'ru-RU', recognition: 'ru-RU', flag: '🇷🇺', tts: true },
// // //     ja: { code: 'ja', name: 'Japanese', nativeName: '日本語', 
// // //           voice: 'ja-JP', recognition: 'ja-JP', flag: '🇯🇵', tts: true },
// // //     ko: { code: 'ko', name: 'Korean', nativeName: '한국어', 
// // //           voice: 'ko-KR', recognition: 'ko-KR', flag: '🇰🇷', tts: true },
// // //     zh: { code: 'zh', name: 'Chinese', nativeName: '中文', 
// // //           voice: 'zh-CN', recognition: 'zh-CN', flag: '🇨🇳', tts: true },
// // //     ar: { code: 'ar', name: 'Arabic', nativeName: 'العربية', 
// // //           voice: 'ar-SA', recognition: 'ar-SA', flag: '🇸🇦', tts: true },
// // //   };

// // //   // Language groups
// // //   const languageGroups = {
// // //     indian: ['te', 'hi', 'ta', 'kn', 'ml', 'mr', 'gu', 'bn', 'pa', 'or', 'ur', 'as', 'sa'],
// // //     international: ['en', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'ja', 'ko', 'zh', 'ar'],
// // //     popular: ['en', 'hi', 'te', 'ta', 'es', 'fr', 'de', 'ja']
// // //   };

// // //   // ✅ FIX: Initialize speech recognition ONCE
// // //   useEffect(() => {
// // //     if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
// // //       setRecognitionSupported(false);
// // //       console.log('❌ Speech recognition not supported');
// // //       return;
// // //     }

// // //     try {
// // //       const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
// // //       recognitionRef.current = new SpeechRecognition();
      
// // //       recognitionRef.current.continuous = false;
// // //       recognitionRef.current.interimResults = false;
// // //       recognitionRef.current.lang = languages[sourceLang]?.recognition || 'en-US';
      
// // //       recognitionRef.current.onstart = () => {
// // //         setIsListening(true);
// // //         console.log(`🎤 Speech recognition started for: ${languages[sourceLang]?.name}`);
// // //       };
      
// // //       recognitionRef.current.onresult = (event) => {
// // //         if (!event.results || !event.results[0]) return;
        
// // //         const text = event.results[0][0].transcript;
// // //         console.log(`🗣️ Recognized (${languages[sourceLang]?.name}): "${text}"`);
        
// // //         setTranscript(text);
// // //         setPasteText(text);
// // //         setStatusMessage(`✅ Captured ${languages[sourceLang]?.name}: "${text.substring(0, 30)}..."`);
        
// // //         // Auto-translate after a short delay
// // //         setTimeout(() => {
// // //           handleTranslate(text);
// // //         }, 300);
// // //       };
      
// // //       recognitionRef.current.onerror = (event) => {
// // //         console.error('❌ Speech recognition error:', event.error);
// // //         setIsListening(false);
        
// // //         switch (event.error) {
// // //           case 'not-allowed':
// // //             setError('Microphone access denied. Please allow microphone permissions.');
// // //             break;
// // //           case 'language-not-supported':
// // //             setError(`${languages[sourceLang]?.name} speech recognition not supported. Switching to English.`);
// // //             setSourceLang('en');
// // //             break;
// // //           case 'aborted':
// // //             // Don't show error for aborted - it happens during language switching
// // //             break;
// // //           default:
// // //             console.log('Speech recognition error:', event.error);
// // //         }
// // //       };
      
// // //       recognitionRef.current.onend = () => {
// // //         setIsListening(false);
// // //         console.log('⏹️ Speech recognition ended');
// // //       };
      
// // //     } catch (err) {
// // //       console.error('❌ Failed to initialize speech recognition:', err);
// // //       setRecognitionSupported(false);
// // //     }
    
// // //     return () => {
// // //       // Cleanup
// // //       if (recognitionRef.current) {
// // //         try {
// // //           recognitionRef.current.stop();
// // //         } catch (e) {
// // //           console.log('Cleanup error:', e);
// // //         }
// // //       }
// // //     };
// // //   }, []); // Initialize only once

// // //   // ✅ FIX: Update recognition language when sourceLang changes
// // //   useEffect(() => {
// // //     if (recognitionRef.current && languages[sourceLang]?.recognition) {
// // //       try {
// // //         // Stop current recognition
// // //         if (isListening) {
// // //           recognitionRef.current.stop();
// // //         }
        
// // //         // Set new language
// // //         recognitionRef.current.lang = languages[sourceLang].recognition;
// // //         console.log(`✅ Speech recognition language updated to: ${languages[sourceLang].recognition} (${languages[sourceLang].name})`);
        
// // //         // Restart if we were listening
// // //         if (isVoiceRecording && !isSpeechRecognitionRestarting.current) {
// // //           isSpeechRecognitionRestarting.current = true;
// // //           setTimeout(() => {
// // //             startVoiceRecording();
// // //             isSpeechRecognitionRestarting.current = false;
// // //           }, 500);
// // //         }
// // //       } catch (err) {
// // //         console.log('❌ Could not update recognition language:', err);
// // //       }
// // //     }
// // //   }, [sourceLang]);

// // //   // ✅ FIXED: Handle voice input properly
// // //   const handleVoiceInput = (text) => {
// // //     console.log('🎤 Voice input:', text, 'Source lang:', languages[sourceLang]?.name);
    
// // //     const lowerText = text.toLowerCase().trim();
    
// // //     // Check for stop commands
// // //     if (lowerText.includes('stop') || lowerText.includes('cancel')) {
// // //       if (isVoiceRecording || isContinuousMode) {
// // //         stopVoiceRecording();
// // //       }
// // //       return;
// // //     }
    
// // //     // Check for translate command
// // //     if (lowerText === 'translate' || lowerText === 'translate now') {
// // //       const currentText = getCurrentText();
// // //       if (currentText && currentText.trim()) {
// // //         speakFeedback(`Translating to ${languages[targetLang]?.name}`);
// // //         handleTranslate(currentText);
// // //       } else {
// // //         speakFeedback('Please speak some text first');
// // //       }
// // //       return;
// // //     }
    
// // //     // Check for speak output commands
// // //     if (lowerText.includes('speak') && (lowerText.includes('translation') || lowerText.includes('output') || lowerText.includes('result'))) {
// // //       if (translatedText) {
// // //         speakText(translatedText);
// // //       } else {
// // //         speakFeedback('No translation available');
// // //       }
// // //       return;
// // //     }
    
// // //     // If this was after "start listening" and not a command, capture it
// // //     if (lastCommandRef.current === 'start listening' && !isCommand(text)) {
// // //       console.log(`🎤 Capturing ${languages[sourceLang]?.name} speech after command:`, text);
// // //       captureSpeechForTranslation(text);
// // //       lastCommandRef.current = '';
// // //     }
// // //     // If in voice recording mode, capture speech
// // //     else if (isVoiceRecording && !isCommand(text)) {
// // //       console.log(`🎤 Capturing ${languages[sourceLang]?.name} speech:`, text);
// // //       captureSpeechForTranslation(text);
// // //     }
// // //     // Otherwise treat as potential speech
// // //     else if (!isCommand(text) && text.trim().length > 0) {
// // //       console.log(`🌍 Potential ${languages[sourceLang]?.name} speech:`, text);
// // //       setPasteText(text);
// // //       setTranscript(text);
// // //       setStatusMessage(`Heard: "${text.substring(0, 30)}..."`);
// // //     }
// // //   };

// // //   // Check if text is a command
// // //   const isCommand = (text) => {
// // //     const commands = [
// // //       'start listening', 'speak now', 'listen now',
// // //       'continuous mode', 'translate', 'translate now', 
// // //       'speak translation', 'speak output', 'output', 'translation', 'result', 'speak result',
// // //       'swap languages', 'swap language',
// // //       'clear all', 'clear', 'clear input', 'clear output',
// // //       'select ', 'use ', 'english to ', 'hindi to ', 'french to ', 'spanish to ', 'telugu to ',
// // //       'help', 'what can i say', 'show commands',
// // //       'go to dashboard', 'dashboard', 'logout',
// // //       'stop', 'stop listening', 'cancel'
// // //     ];
    
// // //     return commands.some(cmd => text.toLowerCase().includes(cmd.toLowerCase()));
// // //   };

// // //   // Capture speech for translation
// // //   const captureSpeechForTranslation = (text) => {
// // //     console.log(`📝 Capturing speech: "${text}"`);
    
// // //     // Add to voice history
// // //     setVoiceHistory(prev => [{
// // //       text,
// // //       timestamp: new Date().toLocaleTimeString(),
// // //       language: languages[sourceLang]?.name
// // //     }, ...prev.slice(0, 9)]);
    
// // //     setPasteText(text);
// // //     setTranscript(text);
// // //     setStatusMessage(`✅ Captured ${languages[sourceLang]?.name}: "${text.substring(0, 30)}..."`);
    
// // //     // Auto-translate
// // //     setTimeout(() => {
// // //       handleTranslate(text);
// // //     }, 800);
    
// // //     setIsPasteMode(true);
    
// // //     // Focus textarea
// // //     setTimeout(() => {
// // //       if (textareaRef.current) {
// // //         textareaRef.current.focus();
// // //       }
// // //     }, 300);
// // //   };

// // //   // ✅ FIXED: Voice commands integration
// // //   useEffect(() => {
// // //     componentRef.current = {
// // //       // Navigation
// // //       handleBackToDashboard,
// // //       handleLogout,
      
// // //       // State and refs
// // //       isListening,
// // //       setIsListening,
// // //       transcript,
// // //       setTranscript,
// // //       translatedText,
// // //       setTranslatedText,
// // //       pasteText,
// // //       setPasteText,
// // //       error,
// // //       setError,
// // //       statusMessage,
// // //       setStatusMessage,
// // //       sourceLang,
// // //       setSourceLang,
// // //       targetLang,
// // //       setTargetLang,
// // //       languages,
      
// // //       // Methods
// // //       clearAll,
// // //       clearInput,
// // //       clearOutput,
// // //       swapLanguages,
// // //       handleTranslate,
// // //       speakText,
// // //       handleAutoDetect,
      
// // //       // Voice recording
// // //       isVoiceRecording,
// // //       setIsVoiceRecording,
// // //       startVoiceRecording,
// // //       stopVoiceRecording,
// // //       getCurrentText,
      
// // //       // Other
// // //       setIsSpeaking,
// // //       setIsPasteMode
// // //     };
    
// // //     // Initialize voice commands
// // //     const cleanup = initializeLanguageTranslatorCommands(componentRef);
    
// // //     // Set up callback
// // //     voiceService.setFeature('language-translator', (text) => {
// // //       handleVoiceInput(text);
// // //     });
    
// // //     return () => {
// // //       cleanup?.();
// // //       voiceService.setFeature('dashboard');
// // //     };
// // //   }, []);

// // //   // ✅ FIXED: Start voice recording
// // //   const startVoiceRecording = () => {
// // //     if (!recognitionSupported) {
// // //       setError('Speech recognition not supported');
// // //       return;
// // //     }
    
// // //     try {
// // //       if (recognitionRef.current) {
// // //         // Update language if needed
// // //         recognitionRef.current.lang = languages[sourceLang]?.recognition || 'en-US';
        
// // //         recognitionRef.current.start();
// // //         setIsVoiceRecording(true);
// // //         lastCommandRef.current = 'start listening';
        
// // //         const langName = languages[sourceLang]?.name || 'English';
// // //         setStatusMessage(`🎤 Listening for ${langName}... Speak now!`);
// // //         speakFeedback(`Listening for ${langName}. Please speak now.`);
// // //       }
// // //     } catch (err) {
// // //       console.error('❌ Could not start recording:', err);
// // //       setError('Could not start speech recognition');
// // //       setIsVoiceRecording(false);
// // //     }
// // //   };

// // //   const stopVoiceRecording = () => {
// // //     setIsVoiceRecording(false);
// // //     setIsContinuousMode(false);
// // //     lastCommandRef.current = '';
    
// // //     if (recognitionRef.current) {
// // //       try {
// // //         recognitionRef.current.stop();
// // //       } catch (err) {
// // //         console.log('Stop error:', err);
// // //       }
// // //     }
    
// // //     setStatusMessage('Ready');
// // //   };

// // //   const toggleContinuousMode = () => {
// // //     const newMode = !isContinuousMode;
// // //     setIsContinuousMode(newMode);
    
// // //     if (newMode) {
// // //       // Enable voice recording with continuous mode
// // //       if (recognitionRef.current) {
// // //         recognitionRef.current.continuous = true;
// // //       }
// // //       startVoiceRecording();
// // //       setStatusMessage('🔁 Continuous mode - Speak continuously');
// // //     } else {
// // //       // Disable continuous mode
// // //       if (recognitionRef.current) {
// // //         recognitionRef.current.continuous = false;
// // //       }
// // //       stopVoiceRecording();
// // //     }
// // //   };

// // //   // Get current text
// // //   const getCurrentText = () => {
// // //     return pasteText || transcript || '';
// // //   };

// // //   // Update component ref
// // //   useEffect(() => {
// // //     if (componentRef.current) {
// // //       componentRef.current = {
// // //         ...componentRef.current,
// // //         isListening,
// // //         transcript,
// // //         translatedText,
// // //         pasteText,
// // //         sourceLang,
// // //         targetLang,
// // //         error,
// // //         statusMessage,
// // //         isVoiceRecording,
// // //         isContinuousMode
// // //       };
// // //     }
// // //   }, [isListening, transcript, translatedText, pasteText, sourceLang, targetLang, error, statusMessage, isVoiceRecording, isContinuousMode]);

// // //   // ✅ FIXED: Speech feedback without TTS errors
// // //   const speakFeedback = (message, options = {}) => {
// // //     if (!window.speechSynthesis) return;
    
// // //     try {
// // //       // Cancel any ongoing speech
// // //       if (window.speechSynthesis.speaking) {
// // //         window.speechSynthesis.cancel();
// // //       }
      
// // //       // Use setTimeout to prevent TTS errors
// // //       setTimeout(() => {
// // //         try {
// // //           const utterance = new SpeechSynthesisUtterance(message);
// // //           utterance.rate = options.rate || 0.85;
// // //           utterance.pitch = options.pitch || 1.0;
// // //           utterance.volume = options.volume || 0.7; // Lower volume to prevent errors
          
// // //           utterance.onerror = (e) => {
// // //             console.log('⚠️ TTS error (ignored):', e.error);
// // //             // Don't throw error, just log it
// // //           };
          
// // //           utterance.onend = () => {
// // //             console.log('✅ Feedback spoken');
// // //           };
          
// // //           window.speechSynthesis.speak(utterance);
// // //         } catch (speakErr) {
// // //           console.log('❌ Could not create utterance:', speakErr);
// // //         }
// // //       }, 100);
// // //     } catch (error) {
// // //       console.log('❌ TTS not available');
// // //     }
// // //   };

// // //   // ✅ FIXED: Translation function
// // //   const handleTranslate = async (text) => {
// // //     const textToTranslate = text || pasteText || transcript;
    
// // //     if (!textToTranslate.trim()) {
// // //       setError('Please enter text to translate');
// // //       return;
// // //     }
    
// // //     setIsTranslating(true);
// // //     setStatusMessage(`Translating to ${languages[targetLang]?.name}...`);
// // //     setError('');
    
// // //     try {
// // //       // Use current targetLang (not hardcoded French)
// // //       console.log(`🌐 Translating from ${sourceLang} to ${targetLang}: "${textToTranslate.substring(0, 50)}..."`);
      
// // //       const translation = await translateWithMultipleServices(textToTranslate, sourceLang, targetLang);
      
// // //       if (translation) {
// // //         setTranslatedText(translation);
// // //         setStatusMessage(`✅ Translated to ${languages[targetLang]?.name}`);
        
// // //         // Add to recent translations
// // //         setRecentTranslations(prev => [{
// // //           sourceText: textToTranslate,
// // //           translatedText: translation,
// // //           sourceLang: languages[sourceLang]?.name,
// // //           targetLang: languages[targetLang]?.name,
// // //           timestamp: new Date().toISOString()
// // //         }, ...prev.slice(0, 4)]);
        
// // //         // Speak confirmation
// // //         if (!isVoiceRecording) {
// // //           speakFeedback(`Translated to ${languages[targetLang]?.name}`);
// // //         }
// // //       } else {
// // //         throw new Error('Translation failed');
// // //       }
// // //     } catch (err) {
// // //       console.error('❌ Translation error:', err);
// // //       setError('Translation service unavailable. Please try again.');
// // //       setTranslatedText(`[Translation Error] ${textToTranslate}`);
// // //     } finally {
// // //       setIsTranslating(false);
// // //     }
// // //   };

// // //   // Multi-service translation
// // //   const translateWithMultipleServices = async (text, fromLang, toLang) => {
// // //     const services = [
// // //       tryGoogleTranslate,
// // //       tryMyMemoryTranslate
// // //     ];
    
// // //     for (const service of services) {
// // //       try {
// // //         const result = await service(text, fromLang, toLang);
// // //         if (result && result.trim()) {
// // //           console.log(`✅ Translation success: ${result.substring(0, 50)}...`);
// // //           return result;
// // //         }
// // //       } catch (err) {
// // //         console.warn(`⚠️ Service failed:`, err.message);
// // //         continue;
// // //       }
// // //     }
    
// // //     return null;
// // //   };

// // //   // Google Translate
// // //   const tryGoogleTranslate = async (text, fromLang, toLang) => {
// // //     try {
// // //       const response = await fetch(
// // //         `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${fromLang}&tl=${toLang}&dt=t&q=${encodeURIComponent(text)}`,
// // //         { timeout: 5000 }
// // //       );
      
// // //       if (response.ok) {
// // //         const data = await response.json();
// // //         if (data && data[0]) {
// // //           return data[0].map(item => item[0]).join('');
// // //         }
// // //       }
// // //       return null;
// // //     } catch (err) {
// // //       console.log('❌ Google Translate failed');
// // //       throw err;
// // //     }
// // //   };

// // //   // MyMemory Translate
// // //   const tryMyMemoryTranslate = async (text, fromLang, toLang) => {
// // //     try {
// // //       const response = await fetch(
// // //         `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${fromLang}|${toLang}`,
// // //         { timeout: 5000 }
// // //       );
      
// // //       if (response.ok) {
// // //         const data = await response.json();
// // //         if (data.responseData) {
// // //           return data.responseData.translatedText;
// // //         }
// // //       }
// // //       return null;
// // //     } catch (err) {
// // //       console.log('❌ MyMemory failed');
// // //       throw err;
// // //     }
// // //   };

// // //   // ✅ FIXED: Speak text without TTS errors
// // //   const speakText = (text) => {
// // //     if (!text || !window.speechSynthesis) {
// // //       console.log('❌ TTS not available');
// // //       return;
// // //     }
    
// // //     try {
// // //       // Cancel any ongoing speech
// // //       if (window.speechSynthesis.speaking) {
// // //         window.speechSynthesis.cancel();
// // //       }
      
// // //       setTimeout(() => {
// // //         const utterance = new SpeechSynthesisUtterance(text);
        
// // //         // Try to use target language voice
// // //         try {
// // //           utterance.lang = languages[targetLang]?.voice || 'en-US';
// // //         } catch (e) {
// // //           utterance.lang = 'en-US'; // Fallback
// // //         }
        
// // //         utterance.rate = 0.8;
// // //         utterance.pitch = 1.0;
// // //         utterance.volume = 0.7; // Lower volume
        
// // //         utterance.onstart = () => {
// // //           setIsSpeaking(true);
// // //           setStatusMessage(`🔊 Speaking ${languages[targetLang]?.name}...`);
// // //         };
        
// // //         utterance.onend = () => {
// // //           setIsSpeaking(false);
// // //           setStatusMessage('Ready');
// // //         };
        
// // //         utterance.onerror = (e) => {
// // //           console.log('⚠️ TTS error (ignored):', e.error);
// // //           setIsSpeaking(false);
// // //           setStatusMessage('Speech error');
// // //         };
        
// // //         try {
// // //           window.speechSynthesis.speak(utterance);
// // //         } catch (speakErr) {
// // //           console.log('❌ Could not speak:', speakErr);
// // //           setIsSpeaking(false);
// // //         }
// // //       }, 200);
// // //     } catch (error) {
// // //       console.log('❌ TTS error:', error);
// // //       setIsSpeaking(false);
// // //     }
// // //   };

// // //   // Clear functions
// // //   const clearAll = () => {
// // //     setTranscript('');
// // //     setTranslatedText('');
// // //     setPasteText('');
// // //     setError('');
// // //     setStatusMessage('All cleared');
// // //     setIsVoiceRecording(false);
// // //     setIsContinuousMode(false);
// // //     stopVoiceRecording();
// // //     speakFeedback('All cleared');
// // //   };

// // //   const clearInput = () => {
// // //     setTranscript('');
// // //     setPasteText('');
// // //     setStatusMessage('Input cleared');
// // //   };

// // //   const clearOutput = () => {
// // //     setTranslatedText('');
// // //     setStatusMessage('Output cleared');
// // //   };

// // //   // Navigation
// // //   const handleBackToDashboard = () => {
// // //     stopVoiceRecording();
// // //     navigate('/dashboard');
// // //   };

// // //   const handleLogout = () => {
// // //     localStorage.clear();
// // //     navigate('/');
// // //   };

// // //   // ✅ FIXED: Swap languages
// // //   const swapLanguages = () => {
// // //     const newSourceLang = targetLang;
// // //     const newTargetLang = sourceLang;
    
// // //     setSourceLang(newSourceLang);
// // //     setTargetLang(newTargetLang);
    
// // //     // Don't clear translated text - swap it
// // //     if (translatedText && pasteText) {
// // //       const temp = translatedText;
// // //       setTranslatedText(pasteText);
// // //       setPasteText(temp);
// // //       setTranscript(temp);
// // //     }
    
// // //     setStatusMessage(`🔄 Swapped to ${languages[newSourceLang]?.name} → ${languages[newTargetLang]?.name}`);
// // //     speakFeedback(`Swapped languages to ${languages[newSourceLang]?.name} to ${languages[newTargetLang]?.name}`);
// // //   };

// // //   // Auto-detect language
// // //   const handleAutoDetect = async () => {
// // //     const text = pasteText || transcript;
// // //     if (!text.trim()) return;
    
// // //     // Simple detection by script
// // //     if (/[\u0C00-\u0C7F]/.test(text)) {
// // //       setSourceLang('te');
// // //       setStatusMessage('🔍 Detected: Telugu');
// // //     } else if (/[\u0900-\u097F]/.test(text)) {
// // //       setSourceLang('hi');
// // //       setStatusMessage('🔍 Detected: Hindi');
// // //     } else if (/[\u0B80-\u0BFF]/.test(text)) {
// // //       setSourceLang('ta');
// // //       setStatusMessage('🔍 Detected: Tamil');
// // //     } else {
// // //       setSourceLang('en');
// // //       setStatusMessage('🔍 Detected: English');
// // //     }
// // //   };

// // //   // Quick language pairs
// // //   const popularPairs = [
// // //     { from: 'en', to: 'hi', label: 'English → Hindi' },
// // //     { from: 'hi', to: 'en', label: 'Hindi → English' },
// // //     { from: 'en', to: 'te', label: 'English → Telugu' },
// // //     { from: 'te', to: 'en', label: 'Telugu → English' },
// // //     { from: 'en', to: 'fr', label: 'English → French' },
// // //     { from: 'en', to: 'es', label: 'English → Spanish' }
// // //   ];

// // //   return (
// // //     <div className="language-translator-container">
// // //       {/* Header */}
// // //       <header className="fixed-header">
// // //         <div className="header-content">
// // //           <div className="header-left">
// // //             <button className="back-btn" onClick={handleBackToDashboard}>
// // //               ← Dashboard
// // //             </button>
// // //             <h1 className="logo">Vision Assist</h1>
// // //           </div>
// // //           <div className="user-menu">
// // //             <div className="voice-control-status">
// // //               <div className={`voice-status-indicator ${voiceService.isListening ? 'listening' : 'idle'}`}>
// // //                 {voiceService.isListening ? '🎤 Listening' : '🎤 Ready'}
// // //               </div>
// // //               <button 
// // //                 onClick={() => setShowVoiceHelp(!showVoiceHelp)}
// // //                 className="voice-help-btn"
// // //                 title="Voice Help"
// // //               >
// // //                 ?
// // //               </button>
// // //             </div>
// // //             <button className="logout-btn" onClick={handleLogout}>
// // //               Logout
// // //             </button>
// // //           </div>
// // //         </div>
// // //       </header>

// // //       <div className="language-translator-content">
// // //         {/* Voice Help */}
// // //         {showVoiceHelp && (
// // //           <div className="voice-commands-help-overlay">
// // //             <div className="voice-commands-help">
// // //               <div className="help-header">
// // //                 <h3>🎤 Voice Commands</h3>
// // //                 <button onClick={() => setShowVoiceHelp(false)} className="close-btn">×</button>
// // //               </div>
              
// // //               <div className="help-content">
// // //                 <div className="command-category">
// // //                   <h4>🌍 Set Languages</h4>
// // //                   <div className="command-list">
// // //                     <div className="command-item">"use telugu" (set source language)</div>
// // //                     <div className="command-item">"select hindi" (set target language)</div>
// // //                     <div className="command-item">"telugu to hindi" (set both)</div>
// // //                     <div className="command-item">"swap languages" (swap source/target)</div>
// // //                   </div>
// // //                 </div>
                
// // //                 <div className="command-category">
// // //                   <h4>🎤 Speech Control</h4>
// // //                   <div className="command-list">
// // //                     <div className="command-item">"start listening" (start recording)</div>
// // //                     <div className="command-item">"stop" (stop recording)</div>
// // //                     <div className="command-item">"translate" (translate current text)</div>
// // //                     <div className="command-item">"speak translation" (hear result)</div>
// // //                   </div>
// // //                 </div>
                
// // //                 <div className="tips">
// // //                   <h4>💡 How to use non-English:</h4>
// // //                   <ol>
// // //                     <li>Say <strong>"use telugu"</strong></li>
// // //                     <li>Say <strong>"start listening"</strong></li>
// // //                     <li>Speak in Telugu</li>
// // //                     <li>Say <strong>"translate"</strong></li>
// // //                     <li>Say <strong>"speak translation"</strong> to hear</li>
// // //                   </ol>
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         )}

// // //         <div className="language-translator-header">
// // //           <h2>🌍 Multi-Language Translator</h2>
// // //           <p>Translate between 25+ languages with voice support</p>
// // //           <div className="stats">
// // //             <span className="stat-item">🎤 Speak any language</span>
// // //             <span className="stat-item">🌍 25+ Languages</span>
// // //             <span className="stat-item">🔊 Text-to-Speech</span>
// // //             <span className={`mode-indicator ${isVoiceRecording ? 'recording' : ''}`}>
// // //               {isVoiceRecording ? `🎤 Listening ${languages[sourceLang]?.name}` : 'Ready'}
// // //             </span>
// // //           </div>
// // //         </div>

// // //         {/* Status */}
// // //         {statusMessage && (
// // //           <div className="status-message">
// // //             {statusMessage}
// // //             {error && <div className="error-text">{error}</div>}
// // //           </div>
// // //         )}

// // //         {/* Quick Language Pairs */}
// // //         <div className="quick-pairs">
// // //           <h3>🚀 Quick Start</h3>
// // //           <div className="pairs-grid">
// // //             {popularPairs.map((pair, idx) => (
// // //               <button
// // //                 key={idx}
// // //                 onClick={() => {
// // //                   setSourceLang(pair.from);
// // //                   setTargetLang(pair.to);
// // //                   setStatusMessage(`Set to ${pair.label}`);
// // //                   if (pasteText) {
// // //                     setTimeout(() => handleTranslate(pasteText), 500);
// // //                   }
// // //                 }}
// // //                 className="pair-btn"
// // //               >
// // //                 {pair.label}
// // //               </button>
// // //             ))}
// // //           </div>
// // //         </div>

// // //         {/* Language Selection */}
// // //         <div className="language-selection-section">
// // //           <div className="selection-row">
// // //             <div className="lang-selector">
// // //               <label>From (Source):</label>
// // //               <select 
// // //                 value={sourceLang}
// // //                 onChange={(e) => setSourceLang(e.target.value)}
// // //                 className="lang-select"
// // //               >
// // //                 <option value="en">🇺🇸 English</option>
// // //                 <optgroup label="Indian Languages">
// // //                   {languageGroups.indian.map(code => (
// // //                     <option key={code} value={code}>
// // //                       {languages[code]?.flag} {languages[code]?.name}
// // //                     </option>
// // //                   ))}
// // //                 </optgroup>
// // //                 <optgroup label="International">
// // //                   {languageGroups.international.filter(code => code !== 'en').map(code => (
// // //                     <option key={code} value={code}>
// // //                       {languages[code]?.flag} {languages[code]?.name}
// // //                     </option>
// // //                   ))}
// // //                 </optgroup>
// // //               </select>
// // //             </div>
            
// // //             <button onClick={swapLanguages} className="swap-lang-btn" title="Swap">
// // //               ⇄
// // //             </button>
            
// // //             <div className="lang-selector">
// // //               <label>To (Target):</label>
// // //               <select 
// // //                 value={targetLang}
// // //                 onChange={(e) => {
// // //                   setTargetLang(e.target.value);
// // //                   if (pasteText) {
// // //                     setTimeout(() => handleTranslate(pasteText), 500);
// // //                   }
// // //                 }}
// // //                 className="lang-select"
// // //               >
// // //                 {Object.entries(languages).map(([code, lang]) => (
// // //                   <option key={code} value={code}>
// // //                     {lang.flag} {lang.name}
// // //                   </option>
// // //                 ))}
// // //               </select>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {/* Input Section */}
// // //         <div className="input-section">
// // //           <div className="input-header">
// // //             <h3>📝 Input ({languages[sourceLang]?.name})</h3>
// // //             <div className="input-controls">
// // //               <button
// // //                 onClick={startVoiceRecording}
// // //                 className={`voice-record-btn ${isVoiceRecording ? 'recording' : ''}`}
// // //                 disabled={!recognitionSupported}
// // //               >
// // //                 {isVoiceRecording ? '⏺️ Recording...' : `🎤 Speak ${languages[sourceLang]?.name}`}
// // //               </button>
// // //               <button onClick={clearInput} className="clear-btn">
// // //                 🗑️ Clear
// // //               </button>
// // //             </div>
// // //           </div>
          
// // //           <textarea
// // //             ref={textareaRef}
// // //             value={pasteText}
// // //             onChange={(e) => setPasteText(e.target.value)}
// // //             placeholder={`Enter ${languages[sourceLang]?.name} text or click "Speak ${languages[sourceLang]?.name}"...`}
// // //             className="translation-textarea"
// // //             rows="4"
// // //           />
          
// // //           <div className="translate-actions">
// // //             <button
// // //               onClick={() => handleTranslate(pasteText)}
// // //               disabled={isTranslating || !pasteText.trim()}
// // //               className="translate-btn"
// // //             >
// // //               {isTranslating ? (
// // //                 <>
// // //                   <span className="spinner"></span>
// // //                   Translating...
// // //                 </>
// // //               ) : (
// // //                 `🌐 Translate to ${languages[targetLang]?.name}`
// // //               )}
// // //             </button>
// // //           </div>
// // //         </div>

// // //         {/* Results */}
// // //         <div className="translation-results">
// // //           <div className="results-header">
// // //             <h3>📊 Results</h3>
// // //             <div className="results-controls">
// // //               {translatedText && (
// // //                 <button 
// // //                   onClick={() => speakText(translatedText)}
// // //                   className="speak-btn"
// // //                 >
// // //                   🔊 Speak
// // //                 </button>
// // //               )}
// // //             </div>
// // //           </div>
          
// // //           <div className="results-container">
// // //             <div className="source-result">
// // //               <h4>{languages[sourceLang]?.name}</h4>
// // //               <div className="result-content">
// // //                 {pasteText || 'No input text'}
// // //               </div>
// // //             </div>
            
// // //             <div className="target-result">
// // //               <h4>{languages[targetLang]?.name}</h4>
// // //               <div className="result-content">
// // //                 {translatedText || 'Translation will appear here'}
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {/* Recent Translations */}
// // //         {recentTranslations.length > 0 && (
// // //           <div className="recent-translations">
// // //             <h3>🕐 Recent</h3>
// // //             <div className="recent-list">
// // //               {recentTranslations.map((item, idx) => (
// // //                 <div key={idx} className="recent-item">
// // //                   <div className="recent-langs">
// // //                     {item.sourceLang} → {item.targetLang}
// // //                   </div>
// // //                   <div className="recent-text">
// // //                     {item.sourceText.substring(0, 40)}...
// // //                   </div>
// // //                 </div>
// // //               ))}
// // //             </div>
// // //           </div>
// // //         )}
// // //       </div>

// // //       {/* Status Bar */}
// // //       <div className="status-bar">
// // //         <p>
// // //           {isVoiceRecording ? `🎤 Listening ${languages[sourceLang]?.name}` :
// // //            isTranslating ? `🔄 Translating to ${languages[targetLang]?.name}` :
// // //            isSpeaking ? `🔊 Speaking ${languages[targetLang]?.name}` :
// // //            translatedText ? `✅ ${languages[sourceLang]?.name} → ${languages[targetLang]?.name}` :
// // //            '🟢 Ready'}
// // //         </p>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default LanguageTranslator;


// // // LanguageTranslator.jsx - SIMPLE WORKING VERSION
// // import React, { useState, useEffect, useRef } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { voiceService } from '../../services/voiceService';
// // import './LanguageTranslator.css';

// // const LanguageTranslator = () => {
// //   const navigate = useNavigate();
  
// //   // State declarations
// //   const [translatedText, setTranslatedText] = useState('');
// //   const [isTranslating, setIsTranslating] = useState(false);
// //   const [error, setError] = useState('');
// //   const [isSpeaking, setIsSpeaking] = useState(false);
// //   const [sourceLang, setSourceLang] = useState('en');
// //   const [targetLang, setTargetLang] = useState('hi');
// //   const [statusMessage, setStatusMessage] = useState('Ready to translate');
// //   const [pasteText, setPasteText] = useState('');
// //   const [showVoiceHelp, setShowVoiceHelp] = useState(false);
  
// //   // Refs
// //   const textareaRef = useRef(null);
  
// //   // ✅ SIMPLE LANGUAGE SUPPORT
// //   const languages = {
// //     en: { code: 'en', name: 'English', voice: 'en-US', flag: '🇺🇸', tts: true },
// //     te: { code: 'te', name: 'Telugu', voice: 'te-IN', flag: '🇮🇳', tts: false },
// //     hi: { code: 'hi', name: 'Hindi', voice: 'hi-IN', flag: '🇮🇳', tts: false },
// //     ta: { code: 'ta', name: 'Tamil', voice: 'ta-IN', flag: '🇮🇳', tts: false },
// //     es: { code: 'es', name: 'Spanish', voice: 'es-ES', flag: '🇪🇸', tts: true },
// //     fr: { code: 'fr', name: 'French', voice: 'fr-FR', flag: '🇫🇷', tts: true },
// //     de: { code: 'de', name: 'German', voice: 'de-DE', flag: '🇩🇪', tts: true },
// //     ja: { code: 'ja', name: 'Japanese', voice: 'ja-JP', flag: '🇯🇵', tts: true },
// //     ar: { code: 'ar', name: 'Arabic', voice: 'ar-SA', flag: '🇸🇦', tts: true },
// //   };

// //   // ✅ SIMPLE VOICE COMMANDS HANDLING
// //   useEffect(() => {
// //     const handleVoiceCommand = (text) => {
// //       console.log('🎤 Voice command received:', text);
// //       const lowerText = text.toLowerCase().trim();
      
// //       // ✅ 1. LANGUAGE CHANGE COMMANDS
// //       if (lowerText.includes('english to telugu') || lowerText.includes('english to telegu')) {
// //         setTargetLang('te');
// //         setStatusMessage('✅ Set to English → Telugu');
// //         speakFeedback('Set to English to Telugu');
// //         return;
// //       }
      
// //       if (lowerText.includes('english to hindi')) {
// //         setTargetLang('hi');
// //         setStatusMessage('✅ Set to English → Hindi');
// //         speakFeedback('Set to English to Hindi');
// //         return;
// //       }
      
// //       if (lowerText.includes('english to spanish')) {
// //         setTargetLang('es');
// //         setStatusMessage('✅ Set to English → Spanish');
// //         speakFeedback('Set to English to Spanish');
// //         return;
// //       }
      
// //       if (lowerText.includes('english to tamil')) {
// //         setTargetLang('ta');
// //         setStatusMessage('✅ Set to English → Tamil');
// //         speakFeedback('Set to English to Tamil');
// //         return;
// //       }
      
// //       if (lowerText.includes('english to french')) {
// //         setTargetLang('fr');
// //         setStatusMessage('✅ Set to English → French');
// //         speakFeedback('Set to English to French');
// //         return;
// //       }
      
// //       if (lowerText.includes('english to german')) {
// //         setTargetLang('de');
// //         setStatusMessage('✅ Set to English → German');
// //         speakFeedback('Set to English to German');
// //         return;
// //       }
      
// //       // ✅ 2. SIMPLE "SELECT" COMMANDS
// //       if (lowerText.includes('select telugu') || lowerText.includes('select telegu')) {
// //         setTargetLang('te');
// //         setStatusMessage('✅ Target set to Telugu');
// //         speakFeedback('Selected Telugu');
// //         return;
// //       }
      
// //       if (lowerText.includes('select hindi')) {
// //         setTargetLang('hi');
// //         setStatusMessage('✅ Target set to Hindi');
// //         speakFeedback('Selected Hindi');
// //         return;
// //       }
      
// //       if (lowerText.includes('select spanish')) {
// //         setTargetLang('es');
// //         setStatusMessage('✅ Target set to Spanish');
// //         speakFeedback('Selected Spanish');
// //         return;
// //       }
      
// //       // ✅ 3. ACTION COMMANDS
// //       if (lowerText.includes('translate') || lowerText === 'translate') {
// //         if (pasteText.trim()) {
// //           setStatusMessage('Translating...');
// //           speakFeedback('Translating now');
// //           handleTranslate(pasteText);
// //         } else {
// //           speakFeedback('Please enter some text first');
// //         }
// //         return;
// //       }
      
// //       if (lowerText.includes('speak translation') || lowerText.includes('speak output')) {
// //         if (translatedText.trim()) {
// //           speakText(translatedText);
// //           speakFeedback('Speaking translation');
// //         } else {
// //           speakFeedback('No translation available yet');
// //         }
// //         return;
// //       }
      
// //       if (lowerText.includes('clear all') || lowerText === 'clear') {
// //         setPasteText('');
// //         setTranslatedText('');
// //         setStatusMessage('All cleared');
// //         speakFeedback('Everything cleared');
// //         return;
// //       }
      
// //       if (lowerText.includes('start listening') || lowerText.includes('speak now')) {
// //         setStatusMessage('🎤 Speak your text in English');
// //         speakFeedback('Please speak your text in English now');
// //         // Voice service will capture what you say next
// //         return;
// //       }
      
// //       if (lowerText.includes('stop') || lowerText.includes('cancel')) {
// //         setStatusMessage('Ready');
// //         speakFeedback('Stopped');
// //         return;
// //       }
      
// //       if (lowerText.includes('swap languages') || lowerText.includes('swap language')) {
// //         swapLanguages();
// //         return;
// //       }
      
// //       if (lowerText.includes('help') || lowerText.includes('what can i say')) {
// //         showHelp();
// //         return;
// //       }
      
// //       // ✅ 4. If no command matched, assume it's text input
// //       console.log('📝 Assuming this is text input:', text);
// //       setPasteText(text);
// //       setStatusMessage(`✅ Captured: "${text.substring(0, 30)}..."`);
      
// //       // Auto-translate after delay
// //       setTimeout(() => {
// //         handleTranslate(text);
// //       }, 1000);
// //     };
    
// //     // Setup voice service
// //     voiceService.setFeature('language-translator', handleVoiceCommand);
    
// //     return () => {
// //       voiceService.setFeature('dashboard');
// //     };
// //   }, [pasteText, translatedText, targetLang]);

// //   // ✅ SIMPLE SPEECH FEEDBACK
// //   const speakFeedback = (message) => {
// //     if (!window.speechSynthesis) return;
    
// //     setTimeout(() => {
// //       try {
// //         // Cancel any ongoing speech
// //         if (window.speechSynthesis.speaking) {
// //           window.speechSynthesis.cancel();
// //         }
        
// //         const utterance = new SpeechSynthesisUtterance(message);
// //         utterance.rate = 0.85;
// //         utterance.volume = 0.8;
        
// //         utterance.onerror = () => {
// //           console.log('TTS error - ignored');
// //         };
        
// //         window.speechSynthesis.speak(utterance);
// //       } catch (err) {
// //         console.log('Could not speak feedback');
// //       }
// //     }, 200);
// //   };

// //   // ✅ SIMPLE TRANSLATION FUNCTION
// //   const handleTranslate = async (text) => {
// //     if (!text.trim()) {
// //       setError('Please enter text to translate');
// //       return;
// //     }
    
// //     setIsTranslating(true);
// //     setStatusMessage(`Translating to ${languages[targetLang]?.name}...`);
// //     setError('');
    
// //     try {
// //       console.log(`🌐 Translating: "${text.substring(0, 50)}..."`);
      
// //       // Use Google Translate API
// //       const translation = await tryGoogleTranslate(text, sourceLang, targetLang);
      
// //       if (translation) {
// //         setTranslatedText(translation);
// //         setStatusMessage(`✅ Translated to ${languages[targetLang]?.name}`);
// //         speakFeedback(`Translation complete`);
// //       } else {
// //         throw new Error('Translation failed');
// //       }
// //     } catch (err) {
// //       console.error('❌ Translation error:', err);
// //       setError('Translation service unavailable. Please try again.');
// //       // Fallback translation
// //       setTranslatedText(`[${languages[targetLang]?.name} Translation]: ${text}`);
// //     } finally {
// //       setIsTranslating(false);
// //     }
// //   };

// //   // Google Translate
// //   const tryGoogleTranslate = async (text, fromLang, toLang) => {
// //     try {
// //       const response = await fetch(
// //         `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${fromLang}&tl=${toLang}&dt=t&q=${encodeURIComponent(text)}`,
// //         { timeout: 5000 }
// //       );
      
// //       if (response.ok) {
// //         const data = await response.json();
// //         if (data && data[0]) {
// //           return data[0].map(item => item[0]).join('');
// //         }
// //       }
// //       return null;
// //     } catch (err) {
// //       console.log('Google Translate failed');
// //       return null;
// //     }
// //   };

// //   // ✅ SIMPLE SPEAK TEXT
// //   const speakText = (text) => {
// //     if (!text || !window.speechSynthesis) {
// //       console.log('❌ TTS not available');
// //       return;
// //     }
    
// //     setTimeout(() => {
// //       try {
// //         // Cancel any ongoing speech
// //         if (window.speechSynthesis.speaking) {
// //           window.speechSynthesis.cancel();
// //         }
        
// //         const utterance = new SpeechSynthesisUtterance(text);
// //         utterance.lang = languages[targetLang]?.voice || 'en-US';
// //         utterance.rate = 0.8;
// //         utterance.volume = 0.7;
        
// //         utterance.onstart = () => {
// //           setIsSpeaking(true);
// //           setStatusMessage(`🔊 Speaking ${languages[targetLang]?.name}...`);
// //         };
        
// //         utterance.onend = () => {
// //           setIsSpeaking(false);
// //           setStatusMessage('Ready');
// //         };
        
// //         utterance.onerror = () => {
// //           setIsSpeaking(false);
// //           setStatusMessage('Speech error');
// //         };
        
// //         window.speechSynthesis.speak(utterance);
// //       } catch (error) {
// //         console.log('❌ TTS error');
// //         setIsSpeaking(false);
// //       }
// //     }, 300);
// //   };

// //   // Clear functions
// //   const clearAll = () => {
// //     setPasteText('');
// //     setTranslatedText('');
// //     setError('');
// //     setStatusMessage('All cleared');
// //     speakFeedback('All cleared');
// //   };

// //   // Navigation
// //   const handleBackToDashboard = () => {
// //     navigate('/dashboard');
// //   };

// //   const handleLogout = () => {
// //     localStorage.clear();
// //     navigate('/');
// //   };

// //   // ✅ SIMPLE SWAP LANGUAGES
// //   const swapLanguages = () => {
// //     const newSourceLang = targetLang;
// //     const newTargetLang = sourceLang;
    
// //     setSourceLang(newSourceLang);
// //     setTargetLang(newTargetLang);
    
// //     if (translatedText && pasteText) {
// //       const temp = translatedText;
// //       setTranslatedText(pasteText);
// //       setPasteText(temp);
// //     }
    
// //     setStatusMessage(`🔄 Swapped to ${languages[newSourceLang]?.name} → ${languages[newTargetLang]?.name}`);
// //     speakFeedback(`Swapped languages`);
// //   };

// //   // ✅ SHOW HELP
// //   const showHelp = () => {
// //     const helpText = "You can say: English to Telugu, English to Hindi, select Spanish, translate, speak translation, clear all, start listening, stop, swap languages";
// //     speakFeedback(helpText);
    
// //     setShowVoiceHelp(true);
// //     setTimeout(() => setShowVoiceHelp(false), 10000);
// //   };

// //   // Quick language pairs
// //   const popularPairs = [
// //     { from: 'en', to: 'te', label: 'English → Telugu' },
// //     { from: 'en', to: 'hi', label: 'English → Hindi' },
// //     { from: 'en', to: 'ta', label: 'English → Tamil' },
// //     { from: 'en', to: 'es', label: 'English → Spanish' },
// //     { from: 'en', to: 'fr', label: 'English → French' },
// //   ];

// //   return (
// //     <div className="language-translator-container">
// //       {/* Header */}
// //       <header className="fixed-header">
// //         <div className="header-content">
// //           <div className="header-left">
// //             <button className="back-btn" onClick={handleBackToDashboard}>
// //               ← Dashboard
// //             </button>
// //             <h1 className="logo">Vision Assist</h1>
// //           </div>
// //           <div className="user-menu">
// //             <div className="voice-control-status">
// //               <div className={`voice-status-indicator ${voiceService.isListening ? 'listening' : 'idle'}`}>
// //                 {voiceService.isListening ? '🎤 Listening' : '🎤 Ready'}
// //               </div>
// //               <button 
// //                 onClick={() => setShowVoiceHelp(!showVoiceHelp)}
// //                 className="voice-help-btn"
// //                 title="Voice Help"
// //               >
// //                 ?
// //               </button>
// //             </div>
// //             <button className="logout-btn" onClick={handleLogout}>
// //               Logout
// //             </button>
// //           </div>
// //         </div>
// //       </header>

// //       <div className="language-translator-content">
// //         {/* Voice Help */}
// //         {showVoiceHelp && (
// //           <div className="voice-commands-help-overlay">
// //             <div className="voice-commands-help">
// //               <div className="help-header">
// //                 <h3>🎤 Voice Commands That WORK</h3>
// //                 <button onClick={() => setShowVoiceHelp(false)} className="close-btn">×</button>
// //               </div>
              
// //               <div className="help-content">
// //                 <div className="command-category">
// //                   <h4>🌍 Change Language:</h4>
// //                   <div className="command-list">
// //                     <div className="command-item">"English to Telugu"</div>
// //                     <div className="command-item">"English to Hindi"</div>
// //                     <div className="command-item">"English to Spanish"</div>
// //                     <div className="command-item">"Select Telugu"</div>
// //                     <div className="command-item">"Select Hindi"</div>
// //                   </div>
// //                 </div>
                
// //                 <div className="command-category">
// //                   <h4>🎤 Actions:</h4>
// //                   <div className="command-list">
// //                     <div className="command-item">"Translate"</div>
// //                     <div className="command-item">"Speak translation"</div>
// //                     <div className="command-item">"Clear all"</div>
// //                     <div className="command-item">"Start listening"</div>
// //                     <div className="command-item">"Stop"</div>
// //                     <div className="command-item">"Swap languages"</div>
// //                   </div>
// //                 </div>
                
// //                 <div className="tips">
// //                   <h4>💡 How to use:</h4>
// //                   <ol>
// //                     <li>Say <strong>"English to Telugu"</strong></li>
// //                     <li>Say <strong>"Start listening"</strong></li>
// //                     <li>Speak your English text</li>
// //                     <li>It will auto-translate</li>
// //                     <li>Say <strong>"Speak translation"</strong> to hear</li>
// //                   </ol>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         )}

// //         <div className="language-translator-header">
// //           <h2>🌍 Simple Translator</h2>
// //           <p>Voice commands that actually work</p>
// //           <div className="stats">
// //             <span className="stat-item">🎤 Simple Voice</span>
// //             <span className="stat-item">🌍 10 Languages</span>
// //             <span className="stat-item">🔊 Text-to-Speech</span>
// //             <span className="mode-indicator">
// //               {voiceService.isListening ? '🎤 Listening...' : 'Ready'}
// //             </span>
// //           </div>
// //         </div>

// //         {/* Status */}
// //         {statusMessage && (
// //           <div className="status-message">
// //             {statusMessage}
// //             {error && <div className="error-text">{error}</div>}
// //           </div>
// //         )}

// //         {/* Quick Language Pairs */}
// //         <div className="quick-pairs">
// //           <h3>🚀 Quick Pairs</h3>
// //           <div className="pairs-grid">
// //             {popularPairs.map((pair, idx) => (
// //               <button
// //                 key={idx}
// //                 onClick={() => {
// //                   setSourceLang(pair.from);
// //                   setTargetLang(pair.to);
// //                   setStatusMessage(`Set to ${pair.label}`);
// //                   speakFeedback(`Set to ${pair.label}`);
// //                   if (pasteText) {
// //                     setTimeout(() => handleTranslate(pasteText), 500);
// //                   }
// //                 }}
// //                 className="pair-btn"
// //               >
// //                 {pair.label}
// //               </button>
// //             ))}
// //           </div>
// //         </div>

// //         {/* Language Selection */}
// //         <div className="language-selection-section">
// //           <div className="selection-row">
// //             <div className="lang-selector">
// //               <label>From:</label>
// //               <select 
// //                 value={sourceLang}
// //                 onChange={(e) => setSourceLang(e.target.value)}
// //                 className="lang-select"
// //               >
// //                 <option value="en">🇺🇸 English</option>
// //                 {Object.entries(languages)
// //                   .filter(([code]) => code !== 'en')
// //                   .map(([code, lang]) => (
// //                     <option key={code} value={code}>
// //                       {lang.flag} {lang.name}
// //                     </option>
// //                   ))}
// //               </select>
// //             </div>
            
// //             <button onClick={swapLanguages} className="swap-lang-btn" title="Swap">
// //               ⇄
// //             </button>
            
// //             <div className="lang-selector">
// //               <label>To:</label>
// //               <select 
// //                 value={targetLang}
// //                 onChange={(e) => {
// //                   setTargetLang(e.target.value);
// //                   if (pasteText) {
// //                     setTimeout(() => handleTranslate(pasteText), 500);
// //                   }
// //                 }}
// //                 className="lang-select"
// //               >
// //                 {Object.entries(languages).map(([code, lang]) => (
// //                   <option key={code} value={code}>
// //                     {lang.flag} {lang.name}
// //                   </option>
// //                 ))}
// //               </select>
// //             </div>
// //           </div>
          
// //           <div className="voice-tip">
// //             💡 <strong>Say:</strong> "English to Telugu", "Select Hindi", etc.
// //           </div>
// //         </div>

// //         {/* Input Section */}
// //         <div className="input-section">
// //           <div className="input-header">
// //             <h3>📝 Input ({languages[sourceLang]?.name})</h3>
// //             <div className="input-controls">
// //               <button onClick={clearAll} className="clear-btn">
// //                 🗑️ Clear All
// //               </button>
// //             </div>
// //           </div>
          
// //           <textarea
// //             ref={textareaRef}
// //             value={pasteText}
// //             onChange={(e) => setPasteText(e.target.value)}
// //             placeholder={`Enter text or say "Start listening" then speak...`}
// //             className="translation-textarea"
// //             rows="4"
// //           />
          
// //           <div className="translate-actions">
// //             <button
// //               onClick={() => handleTranslate(pasteText)}
// //               disabled={isTranslating || !pasteText.trim()}
// //               className="translate-btn"
// //             >
// //               {isTranslating ? (
// //                 <>
// //                   <span className="spinner"></span>
// //                   Translating...
// //                 </>
// //               ) : (
// //                 `🌐 Translate to ${languages[targetLang]?.name}`
// //               )}
// //             </button>
// //           </div>
// //         </div>

// //         {/* Results */}
// //         <div className="translation-results">
// //           <div className="results-header">
// //             <h3>📊 Results</h3>
// //             <div className="results-controls">
// //               {translatedText && (
// //                 <>
// //                   <button 
// //                     onClick={() => speakText(translatedText)}
// //                     className="speak-btn"
// //                   >
// //                     🔊 Speak
// //                   </button>
// //                   <button 
// //                     onClick={() => navigator.clipboard.writeText(translatedText)}
// //                     className="copy-btn"
// //                   >
// //                     📋 Copy
// //                   </button>
// //                 </>
// //               )}
// //             </div>
// //           </div>
          
// //           <div className="results-container">
// //             <div className="source-result">
// //               <h4>{languages[sourceLang]?.name}</h4>
// //               <div className="result-content">
// //                 {pasteText || 'No input text'}
// //               </div>
// //             </div>
            
// //             <div className="target-result">
// //               <h4>{languages[targetLang]?.name}</h4>
// //               <div className="result-content">
// //                 {translatedText || 'Translation will appear here'}
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Voice Tips */}
// //         <div className="voice-tips-box">
// //           <h3>🎤 Voice Commands Tips</h3>
// //           <div className="tips-content">
// //             <p><strong>Works 100%:</strong></p>
// //             <ul>
// //               <li><code>"English to Telugu"</code> - Sets language</li>
// //               <li><code>"Select Hindi"</code> - Changes target language</li>
// //               <li><code>"Translate"</code> - Translates current text</li>
// //               <li><code>"Speak translation"</code> - Speaks the result</li>
// //               <li><code>"Clear all"</code> - Clears everything</li>
// //             </ul>
// //             <p className="tip-note">💡 <strong>Pro tip:</strong> Say commands clearly and wait for feedback.</p>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Status Bar */}
// //       <div className="status-bar">
// //         <p>
// //           {isTranslating ? `🔄 Translating...` :
// //            isSpeaking ? `🔊 Speaking...` :
// //            translatedText ? `✅ ${languages[sourceLang]?.name} → ${languages[targetLang]?.name}` :
// //            '🟢 Ready - Say "English to Telugu" to start'}
// //         </p>
// //       </div>
// //     </div>
// //   );
// // };

// // export default LanguageTranslator;


// // LanguageTranslator.jsx - FIXED VERSION
// import React, { useState, useEffect, useRef, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { voiceService } from '../../services/voiceService';
// import { initializeLanguageTranslatorCommands } from '../../voice-commands/languageTranslatorCommands';
// import './LanguageTranslator.css';

// const LanguageTranslator = () => {
//   const navigate = useRef(useNavigate()).current;
//   const componentRef = useRef(null);
  
//   // State declarations
//   const [translatedText, setTranslatedText] = useState('');
//   const [isTranslating, setIsTranslating] = useState(false);
//   const [error, setError] = useState('');
//   const [isSpeaking, setIsSpeaking] = useState(false);
//   const [sourceLang, setSourceLang] = useState('en');
//   const [targetLang, setTargetLang] = useState('hi');
//   const [statusMessage, setStatusMessage] = useState('Ready to translate');
//   const [pasteText, setPasteText] = useState('');
//   const [showVoiceHelp, setShowVoiceHelp] = useState(false);
//   const [isContinuousMode, setIsContinuousMode] = useState(false);
//   const [isRecording, setIsRecording] = useState(false);
  
//   // Refs
//   const textareaRef = useRef(null);
  
//   // ✅ SIMPLE LANGUAGE SUPPORT - matching the command file
//   const languages = {
//     en: { code: 'en', name: 'English', voice: 'en-US', flag: '🇺🇸', tts: true },
//     te: { code: 'te', name: 'Telugu', voice: 'te-IN', flag: '🇮🇳', tts: false },
//     hi: { code: 'hi', name: 'Hindi', voice: 'hi-IN', flag: '🇮🇳', tts: false },
//     ta: { code: 'ta', name: 'Tamil', voice: 'ta-IN', flag: '🇮🇳', tts: false },
//     kn: { code: 'kn', name: 'Kannada', voice: 'kn-IN', flag: '🇮🇳', tts: false },
//     ml: { code: 'ml', name: 'Malayalam', voice: 'ml-IN', flag: '🇮🇳', tts: false },
//     mr: { code: 'mr', name: 'Marathi', voice: 'mr-IN', flag: '🇮🇳', tts: false },
//     gu: { code: 'gu', name: 'Gujarati', voice: 'gu-IN', flag: '🇮🇳', tts: false },
//     bn: { code: 'bn', name: 'Bengali', voice: 'bn-IN', flag: '🇮🇳', tts: false },
//     pa: { code: 'pa', name: 'Punjabi', voice: 'pa-IN', flag: '🇮🇳', tts: false },
//     or: { code: 'or', name: 'Odia', voice: 'or-IN', flag: '🇮🇳', tts: false },
//     es: { code: 'es', name: 'Spanish', voice: 'es-ES', flag: '🇪🇸', tts: true },
//     fr: { code: 'fr', name: 'French', voice: 'fr-FR', flag: '🇫🇷', tts: true },
//     de: { code: 'de', name: 'German', voice: 'de-DE', flag: '🇩🇪', tts: true },
//     it: { code: 'it', name: 'Italian', voice: 'it-IT', flag: '🇮🇹', tts: true },
//     pt: { code: 'pt', name: 'Portuguese', voice: 'pt-PT', flag: '🇵🇹', tts: true },
//     ru: { code: 'ru', name: 'Russian', voice: 'ru-RU', flag: '🇷🇺', tts: true },
//     ja: { code: 'ja', name: 'Japanese', voice: 'ja-JP', flag: '🇯🇵', tts: true },
//     ko: { code: 'ko', name: 'Korean', voice: 'ko-KR', flag: '🇰🇷', tts: true },
//     zh: { code: 'zh', name: 'Chinese', voice: 'zh-CN', flag: '🇨🇳', tts: true },
//     ar: { code: 'ar', name: 'Arabic', voice: 'ar-SA', flag: '🇸🇦', tts: true },
//     ur: { code: 'ur', name: 'Urdu', voice: 'ur-PK', flag: '🇵🇰', tts: false },
//     as: { code: 'as', name: 'Assamese', voice: 'as-IN', flag: '🇮🇳', tts: false },
//     sa: { code: 'sa', name: 'Sanskrit', voice: 'sa-IN', flag: '🇮🇳', tts: false }
//   };

//   // Expose methods for voice commands
//   useEffect(() => {
//     componentRef.current = {
//       // Navigation
//       handleBackToDashboard: () => {
//         navigate('/dashboard');
//       },
//       handleLogout: () => {
//         localStorage.clear();
//         navigate('/');
//       },
      
//       // Voice control methods
//       startVoiceRecording: () => {
//         setIsRecording(true);
//         setStatusMessage('🎤 Listening... Speak now');
//         // Tell voice service to treat next input as text, not command
//         voiceService.onResultCallback = handleVoiceInput;
//       },
      
//       stopVoiceRecording: () => {
//         setIsRecording(false);
//         setStatusMessage('Ready');
//         // Reset callback to normal command processing
//         voiceService.onResultCallback = null;
//       },
      
//       toggleContinuousMode: () => {
//         setIsContinuousMode(prev => !prev);
//         setStatusMessage(`Continuous mode: ${!isContinuousMode ? 'ON' : 'OFF'}`);
//       },
      
//       // Translation
//       getCurrentText: () => pasteText,
//       handleTranslate: (text = pasteText) => {
//         if (text && text.trim()) {
//           handleTranslate(text);
//         }
//       },
      
//       // Speech output
//       speakText: (text = translatedText) => {
//         if (text && text.trim()) {
//           speakText(text);
//         }
//       },
      
//       // Language settings
//       setSourceLang: (langCode) => {
//         if (languages[langCode]) {
//           setSourceLang(langCode);
//           updateRecognitionLanguage();
//         }
//       },
      
//       setTargetLang: (langCode) => {
//         if (languages[langCode]) {
//           setTargetLang(langCode);
//         }
//       },
      
//       updateRecognitionLanguage: () => {
//         const langVoice = languages[sourceLang]?.voice || 'en-US';
//         voiceService.setLanguage(langVoice);
//         setStatusMessage(`Recognition set to ${languages[sourceLang]?.name}`);
//       },
      
//       swapLanguages: () => {
//         const newSourceLang = targetLang;
//         const newTargetLang = sourceLang;
        
//         setSourceLang(newSourceLang);
//         setTargetLang(newTargetLang);
        
//         if (translatedText && pasteText) {
//           const temp = translatedText;
//           setTranslatedText(pasteText);
//           setPasteText(temp);
//         }
        
//         updateRecognitionLanguage();
//         setStatusMessage(`🔄 Swapped to ${languages[newSourceLang]?.name} → ${languages[newTargetLang]?.name}`);
//       },
      
//       // Clear methods
//       clearAll: () => {
//         setPasteText('');
//         setTranslatedText('');
//         setError('');
//         setStatusMessage('All cleared');
//       },
      
//       clearInput: () => {
//         setPasteText('');
//         setStatusMessage('Input cleared');
//       },
      
//       clearOutput: () => {
//         setTranslatedText('');
//         setStatusMessage('Output cleared');
//       },
      
//       // Status
//       setStatusMessage: (msg) => {
//         setStatusMessage(msg);
//       },
      
//       // State getters for voice commands
//       sourceLang,
//       targetLang,
//       languages,
//       translatedText,
//       isRecording
//     };
//   }, [navigate, pasteText, translatedText, sourceLang, targetLang, isRecording]);

//   // Initialize voice commands
//   useEffect(() => {
//     const cleanup = initializeLanguageTranslatorCommands(componentRef);
    
//     // Set default recognition language
//     voiceService.setLanguage(languages[sourceLang]?.voice || 'en-US');
    
//     return () => {
//       cleanup?.();
//     };
//   }, []);

//   // Handle voice input (when in recording mode)
//   const handleVoiceInput = useCallback((text) => {
//     console.log('🎤 Voice input received:', text);
    
//     if (isRecording) {
//       if (isContinuousMode) {
//         setPasteText(prev => prev + ' ' + text);
//       } else {
//         setPasteText(text);
//       }
      
//       setStatusMessage(`✅ Captured: "${text.substring(0, 50)}..."`);
      
//       // Auto-translate after a short delay
//       setTimeout(() => {
//         handleTranslate(text);
//       }, 800);
//     }
//   }, [isRecording, isContinuousMode]);

//   // ✅ SIMPLE TRANSLATION FUNCTION
//   const handleTranslate = async (text) => {
//     if (!text.trim()) {
//       setError('Please enter text to translate');
//       return;
//     }
    
//     setIsTranslating(true);
//     setStatusMessage(`Translating to ${languages[targetLang]?.name}...`);
//     setError('');
    
//     try {
//       console.log(`🌐 Translating: "${text.substring(0, 50)}..."`);
      
//       // Use Google Translate API
//       const translation = await tryGoogleTranslate(text, sourceLang, targetLang);
      
//       if (translation) {
//         setTranslatedText(translation);
//         setStatusMessage(`✅ Translated to ${languages[targetLang]?.name}`);
//       } else {
//         throw new Error('Translation failed');
//       }
//     } catch (err) {
//       console.error('❌ Translation error:', err);
//       setError('Translation service unavailable. Please try again.');
//       // Fallback translation
//       setTranslatedText(`[${languages[targetLang]?.name} Translation]: ${text}`);
//     } finally {
//       setIsTranslating(false);
//     }
//   };

//   // Google Translate
//   const tryGoogleTranslate = async (text, fromLang, toLang) => {
//     try {
//       const response = await fetch(
//         `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${fromLang}&tl=${toLang}&dt=t&q=${encodeURIComponent(text)}`,
//         { timeout: 5000 }
//       );
      
//       if (response.ok) {
//         const data = await response.json();
//         if (data && data[0]) {
//           return data[0].map(item => item[0]).join('');
//         }
//       }
//       return null;
//     } catch (err) {
//       console.log('Google Translate failed');
//       return null;
//     }
//   };

//   // ✅ SIMPLE SPEAK TEXT
//   const speakText = (text) => {
//     if (!text || !window.speechSynthesis) {
//       console.log('❌ TTS not available');
//       return;
//     }
    
//     setTimeout(() => {
//       try {
//         // Cancel any ongoing speech
//         if (window.speechSynthesis.speaking) {
//           window.speechSynthesis.cancel();
//         }
        
//         const utterance = new SpeechSynthesisUtterance(text);
//         utterance.lang = languages[targetLang]?.voice || 'en-US';
//         utterance.rate = 0.8;
//         utterance.volume = 0.7;
        
//         utterance.onstart = () => {
//           setIsSpeaking(true);
//           setStatusMessage(`🔊 Speaking ${languages[targetLang]?.name}...`);
//         };
        
//         utterance.onend = () => {
//           setIsSpeaking(false);
//           setStatusMessage('Ready');
//         };
        
//         utterance.onerror = () => {
//           setIsSpeaking(false);
//           setStatusMessage('Speech error');
//         };
        
//         window.speechSynthesis.speak(utterance);
//       } catch (error) {
//         console.log('❌ TTS error');
//         setIsSpeaking(false);
//       }
//     }, 300);
//   };

//   // Clear functions
//   const clearAll = () => {
//     setPasteText('');
//     setTranslatedText('');
//     setError('');
//     setStatusMessage('All cleared');
//   };

//   // Navigation
//   const handleBackToDashboard = () => {
//     navigate('/dashboard');
//   };

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate('/');
//   };

//   // ✅ SIMPLE SWAP LANGUAGES
//   const swapLanguages = () => {
//     const newSourceLang = targetLang;
//     const newTargetLang = sourceLang;
    
//     setSourceLang(newSourceLang);
//     setTargetLang(newTargetLang);
    
//     if (translatedText && pasteText) {
//       const temp = translatedText;
//       setTranslatedText(pasteText);
//       setPasteText(temp);
//     }
    
//     setStatusMessage(`🔄 Swapped to ${languages[newSourceLang]?.name} → ${languages[newTargetLang]?.name}`);
//   };

//   // ✅ SHOW HELP
//   const showHelp = () => {
//     const helpText = "You can say: Start listening, then speak your text. Say translate to translate. Say speak translation to hear it. Say English to Hindi to change languages. Say clear all to clear everything.";
    
//     if (window.speechSynthesis) {
//       const utterance = new SpeechSynthesisUtterance(helpText);
//       utterance.rate = 0.85;
//       window.speechSynthesis.speak(utterance);
//     }
    
//     setShowVoiceHelp(true);
//     setTimeout(() => setShowVoiceHelp(false), 10000);
//   };

//   // Quick language pairs
//   const popularPairs = [
//     { from: 'en', to: 'te', label: 'English → Telugu' },
//     { from: 'en', to: 'hi', label: 'English → Hindi' },
//     { from: 'en', to: 'ta', label: 'English → Tamil' },
//     { from: 'en', to: 'es', label: 'English → Spanish' },
//     { from: 'en', to: 'fr', label: 'English → French' },
//     { from: 'en', to: 'de', label: 'English → German' },
//     { from: 'en', to: 'ja', label: 'English → Japanese' },
//     { from: 'en', to: 'ar', label: 'English → Arabic' },
//   ];

//   return (
//     <div className="language-translator-container">
//       {/* Header */}
//       <header className="fixed-header">
//         <div className="header-content">
//           <div className="header-left">
//             <button className="back-btn" onClick={handleBackToDashboard}>
//               ← Dashboard
//             </button>
//             <h1 className="logo">Vision Assist</h1>
//           </div>
//           <div className="user-menu">
//             <div className="voice-control-status">
//               <div className={`voice-status-indicator ${isRecording ? 'recording' : voiceService.isListening ? 'listening' : 'idle'}`}>
//                 {isRecording ? '🎤 Recording...' : 
//                  voiceService.isListening ? '🎤 Listening for commands' : '🎤 Ready'}
//               </div>
//               <button 
//                 onClick={() => setShowVoiceHelp(!showVoiceHelp)}
//                 className="voice-help-btn"
//                 title="Voice Help"
//               >
//                 ?
//               </button>
//             </div>
//             <button className="logout-btn" onClick={handleLogout}>
//               Logout
//             </button>
//           </div>
//         </div>
//       </header>

//       <div className="language-translator-content">
//         {/* Voice Help */}
//         {showVoiceHelp && (
//           <div className="voice-commands-help-overlay">
//             <div className="voice-commands-help">
//               <div className="help-header">
//                 <h3>🎤 Voice Commands That WORK</h3>
//                 <button onClick={() => setShowVoiceHelp(false)} className="close-btn">×</button>
//               </div>
              
//               <div className="help-content">
//                 <div className="command-category">
//                   <h4>🌍 Change Language:</h4>
//                   <div className="command-list">
//                     <div className="command-item">"English to Telugu"</div>
//                     <div className="command-item">"English to Hindi"</div>
//                     <div className="command-item">"Select Spanish"</div>
//                     <div className="command-item">"Use Hindi" (for input)</div>
//                     <div className="command-item">"Swap languages"</div>
//                   </div>
//                 </div>
                
//                 <div className="command-category">
//                   <h4>🎤 Voice Input:</h4>
//                   <div className="command-list">
//                     <div className="command-item">"Start listening" (then speak)</div>
//                     <div className="command-item">"Stop listening"</div>
//                     <div className="command-item">"Continuous mode"</div>
//                     <div className="command-item">"Speak now"</div>
//                     <div className="command-item">"Cancel"</div>
//                   </div>
//                 </div>
                
//                 <div className="command-category">
//                   <h4>🔄 Actions:</h4>
//                   <div className="command-list">
//                     <div className="command-item">"Translate"</div>
//                     <div className="command-item">"Speak translation"</div>
//                     <div className="command-item">"Clear all"</div>
//                     <div className="command-item">"Help"</div>
//                     <div className="command-item">"What can I say"</div>
//                   </div>
//                 </div>
                
//                 <div className="tips">
//                   <h4>💡 How to use:</h4>
//                   <ol>
//                     <li>Say <strong>"English to Telugu"</strong></li>
//                     <li>Say <strong>"Start listening"</strong></li>
//                     <li>Speak your text</li>
//                     <li>It will auto-translate</li>
//                     <li>Say <strong>"Speak translation"</strong> to hear</li>
//                   </ol>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         <div className="language-translator-header">
//           <h2>🌍 Voice Translator</h2>
//           <p>Say "start listening" then speak your text</p>
//           <div className="stats">
//             <span className="stat-item">🎤 {isRecording ? 'Recording...' : 'Ready'}</span>
//             <span className="stat-item">🌍 {Object.keys(languages).length} Languages</span>
//             <span className="stat-item">{isContinuousMode ? '🔄 Continuous Mode' : '🔊 TTS'}</span>
//             <button 
//               onClick={() => setIsContinuousMode(!isContinuousMode)}
//               className={`mode-btn ${isContinuousMode ? 'active' : ''}`}
//               title="Toggle continuous mode"
//             >
//               {isContinuousMode ? '🔄 Continuous' : '⚡ Single'}
//             </button>
//           </div>
//         </div>

//         {/* Status */}
//         {statusMessage && (
//           <div className={`status-message ${error ? 'error' : ''}`}>
//             {statusMessage}
//             {error && <div className="error-text">{error}</div>}
//           </div>
//         )}

//         {/* Voice Control Buttons */}
//         <div className="voice-controls">
//           <button
//             onClick={() => componentRef.current?.startVoiceRecording()}
//             disabled={isRecording}
//             className={`voice-btn ${isRecording ? 'recording' : ''}`}
//           >
//             {isRecording ? '● Recording...' : '🎤 Start Listening'}
//           </button>
//           <button
//             onClick={() => componentRef.current?.stopVoiceRecording()}
//             disabled={!isRecording}
//             className="voice-btn stop"
//           >
//             ⏹️ Stop
//           </button>
//           <button
//             onClick={showHelp}
//             className="voice-btn help"
//           >
//             ❓ Help
//           </button>
//         </div>

//         {/* Quick Language Pairs */}
//         <div className="quick-pairs">
//           <h3>🚀 Quick Pairs</h3>
//           <div className="pairs-grid">
//             {popularPairs.map((pair, idx) => (
//               <button
//                 key={idx}
//                 onClick={() => {
//                   setSourceLang(pair.from);
//                   setTargetLang(pair.to);
//                   componentRef.current?.updateRecognitionLanguage();
//                   setStatusMessage(`Set to ${pair.label}`);
//                   if (pasteText) {
//                     setTimeout(() => handleTranslate(pasteText), 500);
//                   }
//                 }}
//                 className="pair-btn"
//               >
//                 {pair.label}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Language Selection */}
//         <div className="language-selection-section">
//           <div className="selection-row">
//             <div className="lang-selector">
//               <label>From:</label>
//               <select 
//                 value={sourceLang}
//                 onChange={(e) => {
//                   setSourceLang(e.target.value);
//                   componentRef.current?.updateRecognitionLanguage();
//                 }}
//                 className="lang-select"
//               >
//                 {Object.entries(languages).map(([code, lang]) => (
//                   <option key={code} value={code}>
//                     {lang.flag} {lang.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
            
//             <button onClick={swapLanguages} className="swap-lang-btn" title="Swap languages">
//               ⇄
//             </button>
            
//             <div className="lang-selector">
//               <label>To:</label>
//               <select 
//                 value={targetLang}
//                 onChange={(e) => {
//                   setTargetLang(e.target.value);
//                   if (pasteText) {
//                     setTimeout(() => handleTranslate(pasteText), 500);
//                   }
//                 }}
//                 className="lang-select"
//               >
//                 {Object.entries(languages).map(([code, lang]) => (
//                   <option key={code} value={code}>
//                     {lang.flag} {lang.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
          
//           <div className="voice-tip">
//             💡 <strong>Say:</strong> "English to Telugu", "Select Hindi", "Use Spanish"
//           </div>
//         </div>

//         {/* Input Section */}
//         <div className="input-section">
//           <div className="input-header">
//             <h3>📝 Input ({languages[sourceLang]?.name})</h3>
//             <div className="input-controls">
//               <button onClick={clearAll} className="clear-btn">
//                 🗑️ Clear All
//               </button>
//             </div>
//           </div>
          
//           <textarea
//             ref={textareaRef}
//             value={pasteText}
//             onChange={(e) => setPasteText(e.target.value)}
//             placeholder={`Enter text or say "Start listening" then speak...`}
//             className="translation-textarea"
//             rows="4"
//           />
          
//           <div className="translate-actions">
//             <button
//               onClick={() => handleTranslate(pasteText)}
//               disabled={isTranslating || !pasteText.trim()}
//               className="translate-btn"
//             >
//               {isTranslating ? (
//                 <>
//                   <span className="spinner"></span>
//                   Translating...
//                 </>
//               ) : (
//                 `🌐 Translate to ${languages[targetLang]?.name}`
//               )}
//             </button>
//           </div>
//         </div>

//         {/* Results */}
//         <div className="translation-results">
//           <div className="results-header">
//             <h3>📊 Results</h3>
//             <div className="results-controls">
//               {translatedText && (
//                 <>
//                   <button 
//                     onClick={() => speakText(translatedText)}
//                     className="speak-btn"
//                     disabled={!languages[targetLang]?.tts}
//                     title={languages[targetLang]?.tts ? "Speak translation" : "TTS not available for this language"}
//                   >
//                     🔊 Speak
//                   </button>
//                   <button 
//                     onClick={() => navigator.clipboard.writeText(translatedText)}
//                     className="copy-btn"
//                   >
//                     📋 Copy
//                   </button>
//                 </>
//               )}
//             </div>
//           </div>
          
//           <div className="results-container">
//             <div className="source-result">
//               <h4>{languages[sourceLang]?.name}</h4>
//               <div className="result-content">
//                 {pasteText || 'No input text'}
//               </div>
//             </div>
            
//             <div className="target-result">
//               <h4>{languages[targetLang]?.name}</h4>
//               <div className="result-content">
//                 {translatedText || 'Translation will appear here'}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Voice Tips */}
//         <div className="voice-tips-box">
//           <h3>🎤 How Voice Commands Work</h3>
//           <div className="tips-content">
//             <p><strong>Two modes:</strong></p>
//             <ol>
//               <li><strong>Command Mode:</strong> Say "start listening", "translate", "clear all"</li>
//               <li><strong>Input Mode:</strong> After "start listening", speak your text to translate</li>
//             </ol>
//             <p className="tip-note">💡 <strong>Always wait for audio feedback</strong> before speaking the next command.</p>
//           </div>
//         </div>
//       </div>

//       {/* Status Bar */}
//       <div className="status-bar">
//         <p>
//           {isRecording ? `🎤 Recording... Speak now` :
//            isTranslating ? `🔄 Translating to ${languages[targetLang]?.name}...` :
//            isSpeaking ? `🔊 Speaking ${languages[targetLang]?.name}...` :
//            translatedText ? `✅ ${languages[sourceLang]?.name} → ${languages[targetLang]?.name}` :
//            '🟢 Ready - Say "help" for commands'}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default LanguageTranslator;



// LanguageTranslator.jsx - COMPLETE WORKING VERSION
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { voiceService } from '../../services/voiceService';
import { initializeLanguageTranslatorCommands } from '../../voice-commands/languageTranslatorCommands';
import './LanguageTranslator.css';

const LanguageTranslator = () => {
  const navigate = useRef(useNavigate()).current;
  const componentRef = useRef(null);
  
  // State declarations
  const [translatedText, setTranslatedText] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [error, setError] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('hi');
  const [statusMessage, setStatusMessage] = useState('Ready to translate');
  const [pasteText, setPasteText] = useState('');
  const [showVoiceHelp, setShowVoiceHelp] = useState(false);
  const [isContinuousMode, setIsContinuousMode] = useState(false);
  const [isVoiceInputMode, setIsVoiceInputMode] = useState(false);
  
  // Refs
  const textareaRef = useRef(null);
  
  // ✅ SIMPLE LANGUAGE SUPPORT - matching the command file
  const languages = {
    en: { code: 'en', name: 'English', voice: 'en-US', flag: '🇺🇸', tts: true },
    te: { code: 'te', name: 'Telugu', voice: 'te-IN', flag: '🇮🇳', tts: false },
    hi: { code: 'hi', name: 'Hindi', voice: 'hi-IN', flag: '🇮🇳', tts: false },
    ta: { code: 'ta', name: 'Tamil', voice: 'ta-IN', flag: '🇮🇳', tts: false },
    kn: { code: 'kn', name: 'Kannada', voice: 'kn-IN', flag: '🇮🇳', tts: false },
    ml: { code: 'ml', name: 'Malayalam', voice: 'ml-IN', flag: '🇮🇳', tts: false },
    mr: { code: 'mr', name: 'Marathi', voice: 'mr-IN', flag: '🇮🇳', tts: false },
    gu: { code: 'gu', name: 'Gujarati', voice: 'gu-IN', flag: '🇮🇳', tts: false },
    bn: { code: 'bn', name: 'Bengali', voice: 'bn-IN', flag: '🇮🇳', tts: false },
    pa: { code: 'pa', name: 'Punjabi', voice: 'pa-IN', flag: '🇮🇳', tts: false },
    or: { code: 'or', name: 'Odia', voice: 'or-IN', flag: '🇮🇳', tts: false },
    es: { code: 'es', name: 'Spanish', voice: 'es-ES', flag: '🇪🇸', tts: true },
    fr: { code: 'fr', name: 'French', voice: 'fr-FR', flag: '🇫🇷', tts: true },
    de: { code: 'de', name: 'German', voice: 'de-DE', flag: '🇩🇪', tts: true },
    it: { code: 'it', name: 'Italian', voice: 'it-IT', flag: '🇮🇹', tts: true },
    pt: { code: 'pt', name: 'Portuguese', voice: 'pt-PT', flag: '🇵🇹', tts: true },
    ru: { code: 'ru', name: 'Russian', voice: 'ru-RU', flag: '🇷🇺', tts: true },
    ja: { code: 'ja', name: 'Japanese', voice: 'ja-JP', flag: '🇯🇵', tts: true },
    ko: { code: 'ko', name: 'Korean', voice: 'ko-KR', flag: '🇰🇷', tts: true },
    zh: { code: 'zh', name: 'Chinese', voice: 'zh-CN', flag: '🇨🇳', tts: true },
    ar: { code: 'ar', name: 'Arabic', voice: 'ar-SA', flag: '🇸🇦', tts: true },
    ur: { code: 'ur', name: 'Urdu', voice: 'ur-PK', flag: '🇵🇰', tts: false },
    as: { code: 'as', name: 'Assamese', voice: 'as-IN', flag: '🇮🇳', tts: false },
    sa: { code: 'sa', name: 'Sanskrit', voice: 'sa-IN', flag: '🇮🇳', tts: false }
  };

  // Handle voice input (when in recording mode)
  const handleVoiceInput = useCallback((text) => {
    console.log('🎤 Voice input received:', text);
    
    if (!text.trim()) return;
    
    // Filter out commands that might be accidentally captured
    const commonCommands = [
      'start listening', 'stop', 'translate', 'speak translation', 
      'clear all', 'select', 'use', 'english to', 'help'
    ];
    
    const lowerText = text.toLowerCase();
    const isCommand = commonCommands.some(cmd => lowerText.includes(cmd));
    
    if (isCommand) {
      console.log('⚠️ Ignoring command in voice input mode:', text);
      return;
    }
    
    // Capture the text
    if (isVoiceInputMode) {
      if (isContinuousMode) {
        setPasteText(prev => prev + (prev ? ' ' : '') + text);
      } else {
        setPasteText(text);
        setIsVoiceInputMode(false); // Exit voice input mode after capturing text
      }
      
      setStatusMessage(`✅ Captured: "${text.substring(0, 40)}${text.length > 40 ? '...' : ''}"`);
      
      // Auto-translate after a short delay
      setTimeout(() => {
        handleTranslate(text);
      }, 500);
    }
  }, [isVoiceInputMode, isContinuousMode]);

  // Expose methods for voice commands
  useEffect(() => {
    componentRef.current = {
      // Navigation
      handleBackToDashboard: () => {
        navigate('/dashboard');
      },
      handleLogout: () => {
        localStorage.clear();
        navigate('/');
      },
      
      // Voice control methods
      setVoiceInputMode: (mode) => {
        setIsVoiceInputMode(mode);
        if (mode) {
          setStatusMessage('🎤 Listening... Speak now');
        }
      },
      
      startVoiceRecording: () => {
        setIsVoiceInputMode(true);
        setStatusMessage('🎤 Listening... Speak now');
      },
      
      stopVoiceRecording: () => {
        setIsVoiceInputMode(false);
        setStatusMessage('Ready');
        // Re-initialize commands
        setTimeout(() => {
          initializeLanguageTranslatorCommands(componentRef);
        }, 100);
      },
      
      handleVoiceInput: handleVoiceInput,
      
      toggleContinuousMode: () => {
        const newMode = !isContinuousMode;
        setIsContinuousMode(newMode);
        return newMode;
      },
      
      // Translation
      getCurrentText: () => pasteText,
      handleTranslate: (text = pasteText) => {
        if (text && text.trim()) {
          handleTranslate(text);
        }
      },
      
      // Speech output
      speakText: (text = translatedText) => {
        if (text && text.trim()) {
          speakText(text);
        }
      },
      
      // Language settings
      setSourceLang: (langCode) => {
        if (languages[langCode]) {
          setSourceLang(langCode);
          voiceService.setLanguage(languages[langCode]?.voice || 'en-US');
        }
      },
      
      setTargetLang: (langCode) => {
        if (languages[langCode]) {
          setTargetLang(langCode);
        }
      },
      
      setStatusMessage: (msg) => {
        setStatusMessage(msg);
      },
      
      swapLanguages: () => {
        const newSourceLang = targetLang;
        const newTargetLang = sourceLang;
        
        setSourceLang(newSourceLang);
        setTargetLang(newTargetLang);
        
        if (translatedText && pasteText) {
          const temp = translatedText;
          setTranslatedText(pasteText);
          setPasteText(temp);
        }
        
        voiceService.setLanguage(languages[newSourceLang]?.voice || 'en-US');
        setStatusMessage(`🔄 Swapped to ${languages[newSourceLang]?.name} → ${languages[newTargetLang]?.name}`);
      },
      
      // Clear methods
      clearAll: () => {
        setPasteText('');
        setTranslatedText('');
        setError('');
        setIsVoiceInputMode(false);
        setStatusMessage('All cleared');
      },
      
      clearInput: () => {
        setPasteText('');
        setStatusMessage('Input cleared');
      },
      
      clearOutput: () => {
        setTranslatedText('');
        setStatusMessage('Output cleared');
      },
      
      // State getters for voice commands
      sourceLang,
      targetLang,
      languages,
      translatedText,
      isVoiceInputMode
    };
  }, [navigate, pasteText, translatedText, sourceLang, targetLang, isVoiceInputMode, isContinuousMode, handleVoiceInput]);

  // Initialize voice commands
  useEffect(() => {
    const cleanup = initializeLanguageTranslatorCommands(componentRef);
    
    // Set default recognition language
    voiceService.setLanguage(languages[sourceLang]?.voice || 'en-US');
    
    return () => {
      cleanup?.();
    };
  }, []);

  // ✅ SIMPLE TRANSLATION FUNCTION
  const handleTranslate = async (text) => {
    if (!text.trim()) {
      setError('Please enter text to translate');
      return;
    }
    
    setIsTranslating(true);
    setStatusMessage(`Translating to ${languages[targetLang]?.name}...`);
    setError('');
    
    try {
      console.log(`🌐 Translating: "${text.substring(0, 50)}..."`);
      
      // Use Google Translate API
      const translation = await tryGoogleTranslate(text, sourceLang, targetLang);
      
      if (translation) {
        setTranslatedText(translation);
        setStatusMessage(`✅ Translated to ${languages[targetLang]?.name}`);
      } else {
        throw new Error('Translation failed');
      }
    } catch (err) {
      console.error('❌ Translation error:', err);
      setError('Translation service unavailable. Please try again.');
      // Fallback translation
      setTranslatedText(`[${languages[targetLang]?.name} Translation]: ${text}`);
    } finally {
      setIsTranslating(false);
    }
  };

  // Google Translate
  const tryGoogleTranslate = async (text, fromLang, toLang) => {
    try {
      const response = await fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${fromLang}&tl=${toLang}&dt=t&q=${encodeURIComponent(text)}`,
        { timeout: 5000 }
      );
      
      if (response.ok) {
        const data = await response.json();
        if (data && data[0]) {
          return data[0].map(item => item[0]).join('');
        }
      }
      return null;
    } catch (err) {
      console.log('Google Translate failed');
      return null;
    }
  };

  // ✅ SIMPLE SPEAK TEXT
  const speakText = (text) => {
    if (!text || !window.speechSynthesis) {
      console.log('❌ TTS not available');
      return;
    }
    
    setTimeout(() => {
      try {
        // Cancel any ongoing speech
        if (window.speechSynthesis.speaking) {
          window.speechSynthesis.cancel();
        }
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = languages[targetLang]?.voice || 'en-US';
        utterance.rate = 0.8;
        utterance.volume = 0.7;
        
        utterance.onstart = () => {
          setIsSpeaking(true);
          setStatusMessage(`🔊 Speaking ${languages[targetLang]?.name}...`);
        };
        
        utterance.onend = () => {
          setIsSpeaking(false);
          setStatusMessage('Ready');
        };
        
        utterance.onerror = () => {
          setIsSpeaking(false);
          setStatusMessage('Speech error');
        };
        
        window.speechSynthesis.speak(utterance);
      } catch (error) {
        console.log('❌ TTS error');
        setIsSpeaking(false);
      }
    }, 300);
  };

  // Clear functions
  const clearAll = () => {
    setPasteText('');
    setTranslatedText('');
    setError('');
    setIsVoiceInputMode(false);
    setStatusMessage('All cleared');
  };

  // Navigation
  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  // ✅ SIMPLE SWAP LANGUAGES
  const swapLanguages = () => {
    const newSourceLang = targetLang;
    const newTargetLang = sourceLang;
    
    setSourceLang(newSourceLang);
    setTargetLang(newTargetLang);
    
    if (translatedText && pasteText) {
      const temp = translatedText;
      setTranslatedText(pasteText);
      setPasteText(temp);
    }
    
    setStatusMessage(`🔄 Swapped to ${languages[newSourceLang]?.name} → ${languages[newTargetLang]?.name}`);
  };

  // ✅ SHOW HELP
  const showHelp = () => {
    const helpText = "You can say: Start listening, then speak your text. Say translate to translate. Say speak translation to hear it. Say English to Hindi to change languages. Say clear all to clear everything.";
    
    if (window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(helpText);
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
    
    setShowVoiceHelp(true);
    setTimeout(() => setShowVoiceHelp(false), 10000);
  };

  // Quick language pairs
  const popularPairs = [
    { from: 'en', to: 'te', label: 'English → Telugu' },
    { from: 'en', to: 'hi', label: 'English → Hindi' },
    { from: 'en', to: 'ta', label: 'English → Tamil' },
    { from: 'en', to: 'es', label: 'English → Spanish' },
    { from: 'en', to: 'fr', label: 'English → French' },
    { from: 'en', to: 'de', label: 'English → German' },
    { from: 'en', to: 'ja', label: 'English → Japanese' },
    { from: 'en', to: 'ar', label: 'English → Arabic' },
  ];

  return (
    <div className="language-translator-container">
      {/* Header */}
      <header className="fixed-header">
        <div className="header-content">
          <div className="header-left">
            <button className="back-btn" onClick={handleBackToDashboard}>
              ← Dashboard
            </button>
            <h1 className="logo">Vision Assist</h1>
          </div>
          <div className="user-menu">
            <div className="voice-control-status">
              <div className={`voice-status-indicator ${isVoiceInputMode ? 'recording' : voiceService.isListening ? 'listening' : 'idle'}`}>
                {isVoiceInputMode ? '🎤 Recording...' : 
                 voiceService.isListening ? '🎤 Listening for commands' : '🎤 Ready'}
              </div>
              <button 
                onClick={() => setShowVoiceHelp(!showVoiceHelp)}
                className="voice-help-btn"
                title="Voice Help"
              >
                ?
              </button>
            </div>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="language-translator-content">
        {/* Voice Help */}
        {showVoiceHelp && (
          <div className="voice-commands-help-overlay">
            <div className="voice-commands-help">
              <div className="help-header">
                <h3>🎤 Voice Commands That WORK</h3>
                <button onClick={() => setShowVoiceHelp(false)} className="close-btn">×</button>
              </div>
              
              <div className="help-content">
                <div className="command-category">
                  <h4>🌍 Change Language:</h4>
                  <div className="command-list">
                    <div className="command-item">"English to Telugu"</div>
                    <div className="command-item">"English to Hindi"</div>
                    <div className="command-item">"Select Spanish"</div>
                    <div className="command-item">"Use Hindi" (for input)</div>
                    <div className="command-item">"Swap languages"</div>
                  </div>
                </div>
                
                <div className="command-category">
                  <h4>🎤 Voice Input:</h4>
                  <div className="command-list">
                    <div className="command-item">"Start listening" (then speak)</div>
                    <div className="command-item">"Stop listening"</div>
                    <div className="command-item">"Continuous mode"</div>
                    <div className="command-item">"Speak now"</div>
                    <div className="command-item">"Cancel"</div>
                  </div>
                </div>
                
                <div className="command-category">
                  <h4>🔄 Actions:</h4>
                  <div className="command-list">
                    <div className="command-item">"Translate"</div>
                    <div className="command-item">"Speak translation"</div>
                    <div className="command-item">"Clear all"</div>
                    <div className="command-item">"Help"</div>
                    <div className="command-item">"What can I say"</div>
                  </div>
                </div>
                
                <div className="tips">
                  <h4>💡 How to use:</h4>
                  <ol>
                    <li>Say <strong>"English to Telugu"</strong></li>
                    <li>Say <strong>"Start listening"</strong></li>
                    <li>Speak your text</li>
                    <li>It will auto-translate</li>
                    <li>Say <strong>"Speak translation"</strong> to hear</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="language-translator-header">
          <h2>🌍 Voice Translator</h2>
          <p>Say "start listening" then speak your text</p>
          <div className="stats">
            <span className="stat-item">{isVoiceInputMode ? '🎤 Recording...' : 'Ready'}</span>
            <span className="stat-item">🌍 {Object.keys(languages).length} Languages</span>
            <span className="stat-item">{isContinuousMode ? '🔄 Continuous Mode' : '⚡ Single Input'}</span>
            <button 
              onClick={() => setIsContinuousMode(!isContinuousMode)}
              className={`mode-btn ${isContinuousMode ? 'active' : ''}`}
              title="Toggle continuous mode"
            >
              {isContinuousMode ? '🔄 Continuous' : '⚡ Single'}
            </button>
          </div>
        </div>

        {/* Status */}
        {statusMessage && (
          <div className={`status-message ${error ? 'error' : ''}`}>
            {statusMessage}
            {error && <div className="error-text">{error}</div>}
          </div>
        )}

        {/* Voice Control Buttons */}
        <div className="voice-controls">
          <button
            onClick={() => {
              setIsVoiceInputMode(true);
              setStatusMessage('🎤 Listening... Speak now');
            }}
            disabled={isVoiceInputMode}
            className={`voice-btn ${isVoiceInputMode ? 'recording' : ''}`}
          >
            {isVoiceInputMode ? '● Recording...' : '🎤 Start Listening'}
          </button>
          <button
            onClick={() => {
              setIsVoiceInputMode(false);
              setStatusMessage('Ready');
              // Re-initialize commands
              setTimeout(() => {
                initializeLanguageTranslatorCommands(componentRef);
              }, 100);
            }}
            disabled={!isVoiceInputMode}
            className="voice-btn stop"
          >
            ⏹️ Stop
          </button>
          <button
            onClick={showHelp}
            className="voice-btn help"
          >
            ❓ Help
          </button>
        </div>

        {/* Quick Language Pairs */}
        <div className="quick-pairs">
          <h3>🚀 Quick Pairs</h3>
          <div className="pairs-grid">
            {popularPairs.map((pair, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSourceLang(pair.from);
                  setTargetLang(pair.to);
                  voiceService.setLanguage(languages[pair.from]?.voice || 'en-US');
                  setStatusMessage(`Set to ${pair.label}`);
                  if (pasteText) {
                    setTimeout(() => handleTranslate(pasteText), 500);
                  }
                }}
                className="pair-btn"
              >
                {pair.label}
              </button>
            ))}
          </div>
        </div>

        {/* Language Selection */}
        <div className="language-selection-section">
          <div className="selection-row">
            <div className="lang-selector">
              <label>From:</label>
              <select 
                value={sourceLang}
                onChange={(e) => {
                  setSourceLang(e.target.value);
                  voiceService.setLanguage(languages[e.target.value]?.voice || 'en-US');
                }}
                className="lang-select"
              >
                {Object.entries(languages).map(([code, lang]) => (
                  <option key={code} value={code}>
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>
            </div>
            
            <button onClick={swapLanguages} className="swap-lang-btn" title="Swap languages">
              ⇄
            </button>
            
            <div className="lang-selector">
              <label>To:</label>
              <select 
                value={targetLang}
                onChange={(e) => {
                  setTargetLang(e.target.value);
                  if (pasteText) {
                    setTimeout(() => handleTranslate(pasteText), 500);
                  }
                }}
                className="lang-select"
              >
                {Object.entries(languages).map(([code, lang]) => (
                  <option key={code} value={code}>
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="voice-tip">
            💡 <strong>Say:</strong> "English to Telugu", "Select Hindi", "Use Spanish"
          </div>
        </div>

        {/* Input Section */}
        <div className="input-section">
          <div className="input-header">
            <h3>📝 Input ({languages[sourceLang]?.name})</h3>
            <div className="input-controls">
              <button onClick={clearAll} className="clear-btn">
                🗑️ Clear All
              </button>
            </div>
          </div>
          
          <textarea
            ref={textareaRef}
            value={pasteText}
            onChange={(e) => setPasteText(e.target.value)}
            placeholder={`Enter text or say "Start listening" then speak...`}
            className="translation-textarea"
            rows="4"
          />
          
          <div className="translate-actions">
            <button
              onClick={() => handleTranslate(pasteText)}
              disabled={isTranslating || !pasteText.trim()}
              className="translate-btn"
            >
              {isTranslating ? (
                <>
                  <span className="spinner"></span>
                  Translating...
                </>
              ) : (
                `🌐 Translate to ${languages[targetLang]?.name}`
              )}
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="translation-results">
          <div className="results-header">
            <h3>📊 Results</h3>
            <div className="results-controls">
              {translatedText && (
                <>
                  <button 
                    onClick={() => speakText(translatedText)}
                    className="speak-btn"
                    disabled={!languages[targetLang]?.tts}
                    title={languages[targetLang]?.tts ? "Speak translation" : "TTS not available for this language"}
                  >
                    🔊 Speak
                  </button>
                  <button 
                    onClick={() => navigator.clipboard.writeText(translatedText)}
                    className="copy-btn"
                  >
                    📋 Copy
                  </button>
                </>
              )}
            </div>
          </div>
          
          <div className="results-container">
            <div className="source-result">
              <h4>{languages[sourceLang]?.name}</h4>
              <div className="result-content">
                {pasteText || 'No input text'}
              </div>
            </div>
            
            <div className="target-result">
              <h4>{languages[targetLang]?.name}</h4>
              <div className="result-content">
                {translatedText || 'Translation will appear here'}
              </div>
            </div>
          </div>
        </div>

        {/* Voice Tips */}
        <div className="voice-tips-box">
          <h3>🎤 How Voice Commands Work</h3>
          <div className="tips-content">
            <p><strong>Two modes:</strong></p>
            <ol>
              <li><strong>Command Mode:</strong> Say "start listening", "translate", "clear all"</li>
              <li><strong>Input Mode:</strong> After "start listening", speak your text to translate</li>
            </ol>
            <p className="tip-note">💡 <strong>Always wait for audio feedback</strong> before speaking the next command.</p>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="status-bar">
        <p>
          {isVoiceInputMode ? `🎤 Recording... Speak now` :
           isTranslating ? `🔄 Translating to ${languages[targetLang]?.name}...` :
           isSpeaking ? `🔊 Speaking ${languages[targetLang]?.name}...` :
           translatedText ? `✅ ${languages[sourceLang]?.name} → ${languages[targetLang]?.name}` :
           '🟢 Ready - Say "help" for commands'}
        </p>
      </div>
    </div>
  );
};

export default LanguageTranslator;