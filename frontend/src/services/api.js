
import axios from "axios";

// Use Vite env var VITE_API_BASE, else fallback to localhost
export const API_BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:8000";

const getToken = () => localStorage.getItem("token") || "";

export const apiClient = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const get = (url, config = {}) => apiClient.get(url, config);
export const post = (url, data, config = {}) => apiClient.post(url, data, config);
export const patch = (url, data, config = {}) => apiClient.patch(url, data, config);
export const put = (url, data, config = {}) => apiClient.put(url, data, config);
export const del = (url, config = {}) => apiClient.delete(url, config);

// ============ ADD THESE NEW FUNCTIONS FOR MONEY ANALYZER ============

/**
 * Text-to-speech function for currency detection
 * @param {string} text - Text to speak
 * @param {number} rate - Speech rate (0.1 to 10, default 1)
 * @param {string} lang - Language code (default 'en-IN')
 * @returns {Promise<void>}
 */
export const speak = (text, rate = 1, lang = 'en-IN') => {
  return new Promise((resolve) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech to prevent overlap
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = rate;
      utterance.lang = lang;
      utterance.volume = 1;
      
      // Try to get Indian English voice if available
      const voices = window.speechSynthesis.getVoices();
      const indianVoice = voices.find(voice => 
        voice.lang.includes('IN') || voice.name.includes('Indian') || voice.name.includes('Hindi')
      );
      
      if (indianVoice) {
        utterance.voice = indianVoice;
      }
      
      utterance.onend = () => resolve();
      utterance.onerror = () => resolve();
      
      // Some browsers need voices to load
      if (voices.length === 0) {
        window.speechSynthesis.onvoiceschanged = () => {
          const loadedVoices = window.speechSynthesis.getVoices();
          const loadedIndianVoice = loadedVoices.find(voice => 
            voice.lang.includes('IN') || voice.name.includes('Indian')
          );
          if (loadedIndianVoice) utterance.voice = loadedIndianVoice;
          window.speechSynthesis.speak(utterance);
        };
      } else {
        window.speechSynthesis.speak(utterance);
      }
    } else {
      console.warn('Speech synthesis not supported in this browser');
      resolve();
    }
  });
};

/**
 * Convert image to base64
 * @param {File} file - Image file
 * @returns {Promise<string>} Base64 string
 */
export const imageToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
};

/**
 * Format currency detection results
 * @param {Array} detections - Raw detections from API
 * @returns {Array} Formatted detections
 */
export const formatCurrencyDetections = (detections) => {
  const currencyMap = {
    '10_rupees': { label: '10 Rupees', value: 10, color: '#FF6B6B' },
    '20_rupees': { label: '20 Rupees', value: 20, color: '#4ECDC4' },
    '50_rupees': { label: '50 Rupees', value: 50, color: '#45B7D1' },
    '100_rupees': { label: '100 Rupees', value: 100, color: '#96CEB4' },
    '200_rupees': { label: '200 Rupees', value: 200, color: '#FFEAA7' },
    '500_rupees': { label: '500 Rupees', value: 500, color: '#DDA0DD' },
    '2000_rupees': { label: '2000 Rupees', value: 2000, color: '#98D8C8' },
    '10': { label: '10 Rupees', value: 10, color: '#FF6B6B' },
    '20': { label: '20 Rupees', value: 20, color: '#4ECDC4' },
    '50': { label: '50 Rupees', value: 50, color: '#45B7D1' },
    '100': { label: '100 Rupees', value: 100, color: '#96CEB4' },
    '200': { label: '200 Rupees', value: 200, color: '#FFEAA7' },
    '500': { label: '500 Rupees', value: 500, color: '#DDA0DD' },
    '2000': { label: '2000 Rupees', value: 2000, color: '#98D8C8' },
  };

  if (!Array.isArray(detections)) return [];

  return detections.map((det, index) => {
    const currencyInfo = currencyMap[det.class] || currencyMap[det.class?.toLowerCase?.()] || 
                        { label: det.class || 'Unknown', value: 0, color: '#00FF00' };
    
    return {
      id: det.id || `${det.class}_${Date.now()}_${index}`,
      class: det.class,
      label: currencyInfo.label,
      confidence: det.confidence || det.confidence || 0,
      confidencePercent: Math.round((det.confidence || 0) * 100),
      bbox: det.bbox || det.box || {
        x: det.x || 0,
        y: det.y || 0,
        width: det.width || 100,
        height: det.height || 50
      },
      value: det.value || currencyInfo.value,
      color: det.color || currencyInfo.color
    };
  });
};

// /**
//  * Call Roboflow detection API via Django proxy
//  * @param {string} imageBase64 - Base64 image data
//  * @returns {Promise<Array>} Array of detections
//  */
// export const detectCurrency = async (imageBase64) => {
//   try {
//     // Remove data URL prefix if present
//     const cleanBase64 = imageBase64.includes(',') 
//       ? imageBase64.split(',')[1] 
//       : imageBase64;

//     const response = await post('/api/roboflow/detect/', {
//       image: cleanBase64
//     }, {
//       timeout: 10000
//     });

//     if (response.data && response.data.outputs) {
//       const predictions = response.data.outputs[0]?.predictions || [];
//       return formatCurrencyDetections(predictions);
//     }
    
//     return [];
//   } catch (error) {
//     console.error('Currency detection error:', error);
//     throw error;
//   }
// };

/**
 * Call Roboflow detection API via Django proxy
 * @param {string} imageBase64 - Base64 image data
 * @returns {Promise<Array>} Array of detections
 */
// export const detectCurrency = async (imageBase64) => {
//   try {
//     // Remove data URL prefix if present
//     const cleanBase64 = imageBase64.includes(',') 
//       ? imageBase64.split(',')[1] 
//       : imageBase64;

//     const response = await post('/api/roboflow/detect/', {
//       image: cleanBase64
//     }, {
//       timeout: 10000
//     });

//     if (response.data && response.data.predictions) {
//       // For single model endpoint (not workflow), response structure is different
//       const predictions = response.data.predictions || [];
//       return formatCurrencyDetections(predictions);
//     } else if (response.data && response.data.outputs) {
//       // For workflow endpoint
//       const predictions = response.data.outputs[0]?.predictions || [];
//       return formatCurrencyDetections(predictions);
//     }
    
//     return [];
//   } catch (error) {
//     console.error('Currency detection error:', error);
//     throw error;
//   }
// };

// export const detectCurrency = async (imageBase64) => {
//   const cleanBase64 = imageBase64.includes(',')
//     ? imageBase64.split(',')[1]
//     : imageBase64;

//   const response = await post('/api/roboflow/detect/', {
//     image: cleanBase64
//   });

//   return response.data.detections || [];
// };

// export const detectCurrency = async (imageBase64) => {
//   const cleanBase64 = imageBase64.includes(',')
//     ? imageBase64.split(',')[1]
//     : imageBase64;

//   const response = await post('/api/roboflow/detect/', {
//     image: cleanBase64
//   });

//   // 🔍 DEBUG (important once)
//   console.log("RAW ROBOFLOW RESPONSE:", response.data);

//   let predictions = [];

//   if (response.data?.predictions) {
//     predictions = response.data.predictions;
//   } else if (response.data?.outputs?.[0]?.predictions) {
//     predictions = response.data.outputs[0].predictions;
//   }

//   return formatCurrencyDetections(predictions);
// };

// Update the detectCurrency function in api.js
export const detectCurrency = async (imageBase64) => {
  const cleanBase64 = imageBase64.includes(',')
    ? imageBase64.split(',')[1]
    : imageBase64;

  const response = await post('/api/roboflow/detect/', {
    image: cleanBase64
  });

  console.log("RAW ROBOFLOW RESPONSE:", response.data);

  // Get detections from the response
  let predictions = [];
  
  if (response.data?.detections) {
    // New format: backend returns formatted detections
    predictions = response.data.detections;
  } else if (response.data?.predictions) {
    // Old format: raw predictions from Roboflow
    predictions = response.data.predictions;
  } else if (response.data?.outputs?.[0]?.predictions) {
    // Workflow format
    predictions = response.data.outputs[0].predictions;
  }

  // If backend already formatted detections, return them as-is
  if (response.data?.detections && response.data.detections.length > 0) {
    // Add confidencePercent if not present
    return response.data.detections.map(det => ({
      ...det,
      confidencePercent: Math.round((det.confidence || 0) * 100)
    }));
  }

  // Otherwise, format the predictions
  return formatCurrencyDetections(predictions);
};


/**
 * Calculate total value from detections
 * @param {Array} detections - Formatted detections
 * @returns {number} Total value
 */
export const calculateTotalValue = (detections) => {
  if (!Array.isArray(detections)) return 0;
  return detections.reduce((total, det) => total + (det.value || 0), 0);
};

/**
 * Format currency for display
 * @param {number} value - Amount in rupees
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0
  }).format(value);
};