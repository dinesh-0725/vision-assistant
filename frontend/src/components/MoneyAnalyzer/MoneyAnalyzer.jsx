


// import React, { useState, useEffect, useRef, useCallback } from 'react';
// import Webcam from "react-webcam";
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { speak, detectCurrency, formatCurrency } from '../../services/api';
// import './MoneyAnalyzer.css';

// // Native debounce implementation
// const debounce = (func, wait) => {
//   let timeout;
//   return function executedFunction(...args) {
//     const later = () => {
//       clearTimeout(timeout);
//       func(...args);
//     };
//     clearTimeout(timeout);
//     timeout = setTimeout(later, wait);
//   };
// };

// const MoneyAnalyzer = () => {
//   // Refs
//   const webcamRef = useRef(null);
//   const canvasRef = useRef(null);
//   const detectionIntervalRef = useRef(null);
//   const fileInputRef = useRef(null);
//   const navigate = useNavigate();
  
//   // State
//   const [isCameraActive, setIsCameraActive] = useState(false);
//   const [detections, setDetections] = useState([]);
//   const [isDetecting, setIsDetecting] = useState(false);
//   const [detectionInterval, setDetectionInterval] = useState(2000);
//   const [totalValue, setTotalValue] = useState(0);
//   const [status, setStatus] = useState('Ready to detect currency');
//   const [error, setError] = useState(null);
//   const [useSimulation, setUseSimulation] = useState(false);
//   const [uploadedImage, setUploadedImage] = useState(null);
//   const [showWebcam, setShowWebcam] = useState(true);
  
//   // Currency configuration
//   const currencyMap = {
//     '10_rupees': { value: 10, color: '#FF6B6B', label: '10 Rupees' },
//     '20_rupees': { value: 20, color: '#4ECDC4', label: '20 Rupees' },
//     '50_rupees': { value: 50, color: '#45B7D1', label: '50 Rupees' },
//     '100_rupees': { value: 100, color: '#96CEB4', label: '100 Rupees' },
//     '200_rupees': { value: 200, color: '#FFEAA7', label: '200 Rupees' },
//     '500_rupees': { value: 500, color: '#DDA0DD', label: '500 Rupees' },
//     '2000_rupees': { value: 2000, color: '#98D8C8', label: '2000 Rupees' },
//     '10': { value: 10, color: '#FF6B6B', label: '10 Rupees' },
//     '20': { value: 20, color: '#4ECDC4', label: '20 Rupees' },
//     '50': { value: 50, color: '#45B7D1', label: '50 Rupees' },
//     '100': { value: 100, color: '#96CEB4', label: '100 Rupees' },
//     '200': { value: 200, color: '#FFEAA7', label: '200 Rupees' },
//     '500': { value: 500, color: '#DDA0DD', label: '500 Rupees' },
//     '2000': { value: 2000, color: '#98D8C8', label: '2000 Rupees' },
//   };

//   // Initialize camera
//   const startCamera = () => {
//     setIsCameraActive(true);
//     setShowWebcam(true);
//     setUploadedImage(null);
//     setError(null);
//     setStatus('Camera activated. Point at currency notes.');
//     speak("Camera activated. Point at currency notes.");
//   };

//   const stopCamera = () => {
//     setIsCameraActive(false);
//     setShowWebcam(false);
//     if (detectionIntervalRef.current) {
//       clearInterval(detectionIntervalRef.current);
//       detectionIntervalRef.current = null;
//     }
//     setStatus('Camera deactivated');
//     speak("Camera deactivated");
//   };

//   // Handle image upload
//   const handleImageUpload = (event) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     if (!file.type.match('image.*')) {
//       setError('Please upload an image file');
//       speak("Please upload an image file");
//       return;
//     }

//     const reader = new FileReader();
//     reader.onload = (e) => {
//       const imageBase64 = e.target.result;
//       setUploadedImage(imageBase64);
//       setShowWebcam(false);
//       setIsCameraActive(false);
//       setStatus('Image uploaded. Click detect to analyze.');
//       speak("Image uploaded successfully");
      
//       // Automatically detect after upload
//       // setTimeout(() => detectCurrencyFromImage(imageBase64), 500);
//       setTimeout(() => detectCurrencyDebounced(imageBase64), 50);
//     };
//     reader.readAsDataURL(file);
//   };

//   const triggerFileUpload = () => {
//     fileInputRef.current.click();
//   };

//   const clearUploadedImage = () => {
//     setUploadedImage(null);
//     setDetections([]);
//     setTotalValue(0);
//     if (canvasRef.current) {
//       const ctx = canvasRef.current.getContext('2d');
//       ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
//     }
//     setStatus('Uploaded image cleared');
//     speak("Uploaded image cleared");
//   };

//   // Throttled detection function
//   const detectCurrencyDebounced = useCallback(
//     debounce(async (imageBase64) => {
//       if (!imageBase64 || isDetecting) return;

//       setIsDetecting(true);
//       setError(null);
//       setStatus('Detecting currency...');
//       speak("Detecting currency");

//       try {
//         let predictions = [];
        
//         if (!useSimulation) {
//           // Use the API function from services
//           predictions = await detectCurrency(imageBase64);
//           setDetections(predictions);
          
//           // Calculate total
//           const total = predictions.reduce((sum, det) => sum + (det.value || 0), 0);
//           setTotalValue(total);
          
//           // Draw on canvas
//           drawDetections(predictions);
          
//           // Announce results
//           announceResults(predictions, total);
          
//           setStatus(`Detected ${predictions.length} currency notes. Total: ${formatCurrency(total)}`);
//         } else {
//           // Fallback simulation mode
//           simulateDetection();
//         }

//       } catch (err) {
//         console.error('Detection error:', err);
        
//         let errorMsg = 'Detection failed. Please try again.';
//         if (err.code === 'ECONNABORTED') {
//           errorMsg = 'Request timeout. Please check your connection.';
//         } else if (err.response) {
//           errorMsg = `Server error: ${err.response.status}`;
//         } else if (err.request) {
//           errorMsg = 'No response from server. Is the backend running?';
//         }
        
//         setError(errorMsg);
        
//         // Switch to simulation mode on persistent errors
//         if (!useSimulation) {
//           setUseSimulation(true);
//           setStatus('Switching to simulation mode');
//           speak("Switching to simulation mode");
//         }
        
//         simulateDetection();
//       } finally {
//         setIsDetecting(false);
//       }
//     }, 1500),
//     [useSimulation, isDetecting]
//   );

//   // Capture and process image
//   const captureAndDetect = useCallback(() => {
//     if (uploadedImage) {
//       detectCurrencyDebounced(uploadedImage);
//       return;
//     }

//     if (!webcamRef.current || !isCameraActive || isDetecting) return;

//     const screenshot = webcamRef.current.getScreenshot();
//     if (screenshot) {
//       detectCurrencyDebounced(screenshot);
//     }
//   }, [isCameraActive, isDetecting, detectCurrencyDebounced, uploadedImage]);

//   // Start periodic detection only for webcam
//   useEffect(() => {
//     if (isCameraActive && !detectionIntervalRef.current && !uploadedImage) {
//       detectionIntervalRef.current = setInterval(() => {
//         captureAndDetect();
//       }, detectionInterval);
//     }

//     return () => {
//       if (detectionIntervalRef.current) {
//         clearInterval(detectionIntervalRef.current);
//         detectionIntervalRef.current = null;
//       }
//     };
//   }, [isCameraActive, detectionInterval, captureAndDetect, uploadedImage]);

//   // Announce results with debouncing
//   const announceResults = (detections, total) => {
//     if (detections.length === 0) {
//       const announcement = "No currency detected";
//       speak(announcement);
//       return;
//     }

//     // Group by currency type
//     const counts = {};
//     detections.forEach(det => {
//       const currencyName = det.label || det.class || 'Unknown';
//       counts[currencyName] = (counts[currencyName] || 0) + 1;
//     });

//     // Create announcement text
//     const announcementParts = Object.entries(counts).map(([currency, count]) => {
//       return `${count} ${currency}${count > 1 ? 's' : ''}`;
//     });

//     const totalText = `Total: ${formatCurrency(total)}`;
//     const announcement = `Detected ${announcementParts.join(', ')}. ${totalText}`;

//     speak(announcement);
//   };

//   // Draw bounding boxes on canvas
//   const drawDetections = (detections) => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const ctx = canvas.getContext('2d');
    
//     // Clear canvas
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
    
//     // If we have an uploaded image, set canvas to image dimensions
//     if (uploadedImage && !showWebcam) {
//       const img = new Image();
//       img.onload = () => {
//         canvas.width = img.width;
//         canvas.height = img.height;
//         ctx.drawImage(img, 0, 0);
//         drawBoundingBoxes(detections, ctx);
//       };
//       img.src = uploadedImage;
//     } else {
//       // For webcam, draw on current canvas
//       drawBoundingBoxes(detections, ctx);
//     }
//   };

//   const drawBoundingBoxes = (detections, ctx) => {
//     detections.forEach(detection => {
//       const { bbox, color = '#00FF00', label, confidence } = detection;
//       const confidencePercent = Math.round((confidence || 0) * 100);

//       // Draw bounding box
//       ctx.strokeStyle = color;
//       ctx.lineWidth = 3;
//       ctx.strokeRect(bbox.x, bbox.y, bbox.width, bbox.height);

//       // Draw label background
//       const labelText = `${label || 'Currency'} ${confidencePercent}%`;
//       const textWidth = ctx.measureText(labelText).width;
      
//       ctx.fillStyle = color + 'CC'; // Add transparency
//       ctx.fillRect(bbox.x, bbox.y - 25, textWidth + 15, 25);

//       // Draw label text
//       ctx.fillStyle = '#FFFFFF';
//       ctx.font = 'bold 14px Arial';
//       ctx.fillText(labelText, bbox.x + 5, bbox.y - 8);

//       // Draw value if available
//       const value = detection.value;
//       if (value) {
//         const valueText = `₹${value}`;
//         ctx.fillStyle = '#FFFF00';
//         ctx.font = 'bold 16px Arial';
//         const valueWidth = ctx.measureText(valueText).width;
//         ctx.fillText(valueText, bbox.x + bbox.width - valueWidth - 5, bbox.y + bbox.height + 20);
//       }
//     });
//   };

//   // Simulation mode (fallback)
//   const simulateDetection = () => {
//     // Generate mock detections for testing
//     const mockDetections = [
//       {
//         id: 'mock_1',
//         class: '500_rupees',
//         label: '500 Rupees',
//         confidence: 0.95,
//         bbox: {
//           x: 100,
//           y: 100,
//           width: 150,
//           height: 75
//         },
//         value: 500,
//         color: '#DDA0DD'
//       },
//       {
//         id: 'mock_2',
//         class: '100_rupees',
//         label: '100 Rupees',
//         confidence: 0.88,
//         bbox: {
//           x: 300,
//           y: 150,
//           width: 140,
//           height: 70
//         },
//         value: 100,
//         color: '#96CEB4'
//       }
//     ];

//     const total = mockDetections.reduce((sum, det) => sum + det.value, 0);
    
//     setDetections(mockDetections);
//     setTotalValue(total);
//     drawDetections(mockDetections);
//     announceResults(mockDetections, total);
//     setStatus(`Simulation: Detected ${mockDetections.length} notes. Total: ${formatCurrency(total)}`);
//   };

//   // Clear all detections
//   const clearDetections = () => {
//     setDetections([]);
//     setTotalValue(0);
    
//     const canvas = canvasRef.current;
//     if (canvas) {
//       const ctx = canvas.getContext('2d');
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//     }
    
//     setStatus('Cleared all detections');
//     speak("Cleared all detections");
//   };

//   // Toggle simulation mode
//   const toggleSimulationMode = () => {
//     const newMode = !useSimulation;
//     setUseSimulation(newMode);
//     const modeText = newMode ? "Using simulation mode" : "Using real detection";
//     setStatus(modeText);
//     speak(modeText);
//   };

//   // Navigation handlers
//   const handleBackToDashboard = () => {
//     navigate('/dashboard');
//   };

//   const handleLogout = async () => {
//     try {
//       localStorage.clear();
//       navigate('/');
//       speak("Logged out successfully");
//     } catch (error) {
//       console.error('Logout error:', error);
//     }
//   };

//   // Format detection details for display
//   const getCurrencyDetails = () => {
//     if (detections.length === 0) return null;
    
//     const counts = {};
//     detections.forEach(det => {
//       const currencyName = det.label || det.class || 'Unknown';
//       counts[currencyName] = (counts[currencyName] || 0) + 1;
//     });
    
//     return Object.entries(counts).map(([currency, count]) => (
//       <div key={currency} className="currency-summary-item">
//         <span className="currency-name">{currency}:</span>
//         <span className="currency-count">{count} note{count > 1 ? 's' : ''}</span>
//       </div>
//     ));
//   };

//   return (
//     <div className="money-analyzer-container">
//       {/* Fixed Header */}
//       <header className="fixed-header">
//         <div className="header-content">
//           <div className="header-left">
//             <button className="back-btn" onClick={handleBackToDashboard}>
//               ← Back to Dashboard
//             </button>
//             <h1 className="logo">Vision Assist</h1>
//           </div>
//           <div className="user-menu">
//             <button className="logout-btn" onClick={handleLogout}>
//               Logout
//             </button>
//           </div>
//         </div>
//       </header>

//       <div className="money-analyzer-content">
//         <div className="money-analyzer-header">
//           <h2>💰 Currency Detector</h2>
//           <p>Detect Indian currency notes using camera or uploaded images</p>
//         </div>

//         {/* Status Message */}
//         {status && (
//           <div className="status-message">
//             {status}
//             {error && <div className="error-text">{error}</div>}
//           </div>
//         )}

//         <div className="money-analyzer-main">
//           {/* Left Panel - Camera/Upload Section */}
//           <div className="camera-upload-section">
//             <div className="mode-selection">
//               <button 
//                 className={`mode-btn ${showWebcam ? 'active' : ''}`}
//                 onClick={() => {
//                   setShowWebcam(true);
//                   setUploadedImage(null);
//                 }}
//               >
//                 📷 Camera Mode
//               </button>
//               <button 
//                 className={`mode-btn ${!showWebcam && uploadedImage ? 'active' : ''}`}
//                 onClick={triggerFileUpload}
//               >
//                 📁 Upload Image
//               </button>
//               <input
//                 type="file"
//                 ref={fileInputRef}
//                 onChange={handleImageUpload}
//                 accept="image/*"
//                 style={{ display: 'none' }}
//               />
//             </div>

//             <div className="camera-upload-container">
//               {showWebcam ? (
//                 <div className="camera-container">
//                   {isCameraActive ? (
//                     <>
//                       <Webcam
//                         ref={webcamRef}
//                         audio={false}
//                         screenshotFormat="image/jpeg"
//                         videoConstraints={{
//                           facingMode: "environment",
//                           width: { ideal: 1280 },
//                           height: { ideal: 720 }
//                         }}
//                         className="webcam-feed"
//                       />
//                       <canvas
//                         ref={canvasRef}
//                         className="detection-canvas"
//                       />
                      
//                       <div className="camera-overlay">
//                         <div className="detection-status">
//                           {isDetecting ? (
//                             <span className="detecting-indicator">
//                               🔍 Detecting...
//                             </span>
//                           ) : (
//                             <span className="active-indicator">
//                               ● Live
//                             </span>
//                           )}
//                         </div>
//                       </div>
//                     </>
//                   ) : (
//                     <div className="camera-placeholder">
//                       <div className="placeholder-icon">📷</div>
//                       <p>Camera is inactive</p>
//                       <button 
//                         onClick={startCamera}
//                         className="btn btn-primary"
//                       >
//                         Start Camera
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               ) : (
//                 <div className="upload-container">
//                   {uploadedImage ? (
//                     <div className="uploaded-image-preview">
//                       <img 
//                         src={uploadedImage} 
//                         alt="Uploaded preview" 
//                         className="uploaded-image"
//                       />
//                       <canvas
//                         ref={canvasRef}
//                         className="detection-canvas"
//                       />
//                       <button 
//                         onClick={clearUploadedImage}
//                         className="btn btn-outline clear-upload-btn"
//                       >
//                         × Clear Image
//                       </button>
//                     </div>
//                   ) : (
//                     <div 
//                       className="upload-dropzone"
//                       onClick={triggerFileUpload}
//                     >
//                       <div className="upload-icon">📁</div>
//                       <p>Click to upload image</p>
//                       <p className="upload-hint">or drag and drop</p>
//                       <p className="upload-formats">JPG, PNG, JPEG supported</p>
//                     </div>
//                   )}
//                 </div>
//               )}

//               <div className="camera-controls">
//                 {showWebcam && isCameraActive && (
//                   <>
//                     <button 
//                       onClick={stopCamera}
//                       className="btn btn-danger"
//                     >
//                       Stop Camera
//                     </button>
//                     <button 
//                       onClick={captureAndDetect}
//                       disabled={isDetecting}
//                       className="btn btn-secondary"
//                     >
//                       {isDetecting ? 'Detecting...' : 'Capture & Detect'}
//                     </button>
//                   </>
//                 )}
                
//                 {!showWebcam && uploadedImage && (
//                   <button 
//                     onClick={captureAndDetect}
//                     disabled={isDetecting}
//                     className="btn btn-secondary"
//                   >
//                     {isDetecting ? 'Analyzing...' : 'Analyze Image'}
//                   </button>
//                 )}
                
//                 <button 
//                   onClick={clearDetections}
//                   className="btn btn-outline"
//                   disabled={detections.length === 0}
//                 >
//                   Clear Results
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Right Panel - Results & Controls */}
//           <div className="results-controls-section">
//             <div className="stats-card">
//               <h3>📊 Detection Summary</h3>
//               <div className="stats-grid">
//                 <div className="stat-item">
//                   <span className="stat-label">Total Value:</span>
//                   <span className="stat-value total-amount">
//                     {formatCurrency(totalValue)}
//                   </span>
//                 </div>
//                 <div className="stat-item">
//                   <span className="stat-label">Notes Detected:</span>
//                   <span className="stat-value count-value">
//                     {detections.length}
//                   </span>
//                 </div>
//                 <div className="stat-item">
//                   <span className="stat-label">Detection Mode:</span>
//                   <span className={`stat-value mode-value ${useSimulation ? 'simulation' : 'live'}`}>
//                     {useSimulation ? 'Simulation' : 'Live API'}
//                   </span>
//                 </div>
//               </div>

//               {detections.length > 0 && (
//                 <div className="currency-summary">
//                   <h4>Detected Notes:</h4>
//                   <div className="summary-list">
//                     {getCurrencyDetails()}
//                   </div>
//                 </div>
//               )}
//             </div>

//             <div className="detections-list">
//               <h3>🔍 Detected Items</h3>
//               {detections.length > 0 ? (
//                 <div className="detections-grid">
//                   {detections.map((detection) => (
//                     <div key={detection.id} className="detection-card">
//                       <div 
//                         className="currency-color-indicator"
//                         style={{ 
//                           backgroundColor: detection.color || '#00FF00'
//                         }}
//                       ></div>
//                       <div className="currency-info">
//                         <div className="currency-name">
//                           {detection.label || detection.class}
//                         </div>
//                         <div className="currency-details">
//                           <span className="confidence">
//                             Confidence: {detection.confidencePercent || Math.round((detection.confidence || 0) * 100)}%
//                           </span>
//                           <span className="value">
//                             Value: ₹{detection.value || 0}
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="empty-state">
//                   <p>No currency detected yet.</p>
//                   <p className="hint">
//                     {showWebcam 
//                       ? 'Start camera and point at currency notes' 
//                       : 'Upload an image containing currency notes'}
//                   </p>
//                 </div>
//               )}
//             </div>

//             <div className="settings-card">
//               <h3>⚙️ Settings</h3>
//               <div className="settings-list">
//                 <div className="setting-item">
//                   <label>
//                     <input
//                       type="checkbox"
//                       checked={useSimulation}
//                       onChange={toggleSimulationMode}
//                     />
//                     Use Simulation Mode
//                   </label>
//                   <span className="setting-hint">
//                     (Fallback when API is unavailable)
//                   </span>
//                 </div>
                
//                 {showWebcam && isCameraActive && (
//                   <div className="setting-item">
//                     <label>Auto-detection Interval: {detectionInterval/1000}s</label>
//                     <input
//                       type="range"
//                       min="1000"
//                       max="5000"
//                       step="500"
//                       value={detectionInterval}
//                       onChange={(e) => setDetectionInterval(parseInt(e.target.value))}
//                       className="interval-slider"
//                     />
//                     <div className="slider-labels">
//                       <span>1s</span>
//                       <span>3s</span>
//                       <span>5s</span>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>

//             <div className="instructions">
//               <h4>ℹ️ How to Use:</h4>
//               <ol>
//                 <li>Choose <strong>Camera Mode</strong> for live detection or <strong>Upload Image</strong> for static images</li>
//                 <li>For camera: Click "Start Camera" and point at currency notes</li>
//                 <li>For upload: Click upload zone and select an image</li>
//                 <li>Detection happens automatically (camera) or click "Analyze Image" (upload)</li>
//                 <li>Results are announced audibly and displayed here</li>
//                 <li>Use simulation mode if backend connection fails</li>
//               </ol>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Status Bar */}
//       <div className="status-bar">
//         <p>
//           {isDetecting ? '🔄 Detecting...' : 
//            detections.length > 0 ? `✅ Detected ${detections.length} notes, Total: ${formatCurrency(totalValue)}` : 
//            '🟢 Ready'}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default MoneyAnalyzer;


import React, { useState, useEffect, useRef, useCallback } from 'react';
import Webcam from "react-webcam";
import { useNavigate } from 'react-router-dom';
import { speak, detectCurrency, formatCurrency } from '../../services/api';
import './MoneyAnalyzer.css';

// Native debounce implementation
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

const MoneyAnalyzer = () => {
  // Refs
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const detectionIntervalRef = useRef(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  
  // State
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [detections, setDetections] = useState([]);
  const [isDetecting, setIsDetecting] = useState(false);
  const [detectionInterval, setDetectionInterval] = useState(2000);
  const [totalValue, setTotalValue] = useState(0);
  const [status, setStatus] = useState('Ready to detect currency');
  const [error, setError] = useState(null);
  const [useSimulation, setUseSimulation] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [showWebcam, setShowWebcam] = useState(true);
  const [canvasDimensions, setCanvasDimensions] = useState({ width: 640, height: 480 });
  
  // Initialize camera
  const startCamera = () => {
    setIsCameraActive(true);
    setShowWebcam(true);
    setUploadedImage(null);
    setError(null);
    setStatus('Camera activated. Point at currency notes.');
    speak("Camera activated. Point at currency notes.");
  };

  const stopCamera = () => {
    setIsCameraActive(false);
    setShowWebcam(false);
    if (detectionIntervalRef.current) {
      clearInterval(detectionIntervalRef.current);
      detectionIntervalRef.current = null;
    }
    setStatus('Camera deactivated');
    speak("Camera deactivated");
  };

  // Handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.match('image.*')) {
      setError('Please upload an image file');
      speak("Please upload an image file");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const imageBase64 = e.target.result;
      setUploadedImage(imageBase64);
      setShowWebcam(false);
      setIsCameraActive(false);
      setStatus('Image uploaded. Click detect to analyze.');
      speak("Image uploaded successfully");
      
      // Automatically detect after upload
      setTimeout(() => detectCurrencyDebounced(imageBase64), 500);
    };
    reader.readAsDataURL(file);
  };

  const triggerFileUpload = () => {
    fileInputRef.current.click();
  };

  const clearUploadedImage = () => {
    setUploadedImage(null);
    setDetections([]);
    setTotalValue(0);
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
    setStatus('Uploaded image cleared');
    speak("Uploaded image cleared");
  };

  // Draw bounding boxes on canvas
  const drawDetections = useCallback((detections) => {
    const canvas = canvasRef.current;
    if (!canvas || detections.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // If we have an uploaded image, draw it first
    if (!showWebcam && uploadedImage) {
      const img = new Image();
      img.onload = () => {
        // Set canvas to image dimensions
        canvas.width = img.width;
        canvas.height = img.height;
        setCanvasDimensions({ width: img.width, height: img.height });
        ctx.drawImage(img, 0, 0);
        drawBoundingBoxes(detections, ctx, canvas);
      };
      img.src = uploadedImage;
    } else {
      // For webcam, use current canvas dimensions
      drawBoundingBoxes(detections, ctx, canvas);
    }
  }, [showWebcam, uploadedImage]);

  const drawBoundingBoxes = (detections, ctx, canvas) => {
    detections.forEach(detection => {
      const { bbox, color = '#00FF00', label, confidence } = detection;
      const confidencePercent = Math.round((confidence || 0) * 100);
      
      // Check if coordinates are relative (0-1) or absolute
      // Our backend now returns relative coordinates
      let x, y, width, height;
      
      if (bbox.x <= 1 && bbox.y <= 1) {
        // Relative coordinates - convert to pixels
        x = bbox.x * canvas.width;
        y = bbox.y * canvas.height;
        width = bbox.width * canvas.width;
        height = bbox.height * canvas.height;
      } else {
        // Absolute coordinates (fallback)
        x = bbox.x;
        y = bbox.y;
        width = bbox.width;
        height = bbox.height;
      }

      // Draw bounding box
      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      ctx.strokeRect(x, y, width, height);

      // Draw label background
      const labelText = `${label || detection.class || 'Currency'} ${confidencePercent}%`;
      const textWidth = ctx.measureText(labelText).width;
      
      ctx.fillStyle = color + 'CC'; // Add transparency
      ctx.fillRect(x, y - 25, textWidth + 15, 25);

      // Draw label text
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 14px Arial';
      ctx.fillText(labelText, x + 5, y - 8);

      // Draw value if available
      const value = detection.value;
      if (value) {
        const valueText = `₹${value}`;
        ctx.fillStyle = '#FFFF00';
        ctx.font = 'bold 16px Arial';
        const valueWidth = ctx.measureText(valueText).width;
        ctx.fillText(valueText, x + width - valueWidth - 5, y + height + 20);
      }
    });
  };

  // Update canvas when detections change
  useEffect(() => {
    if (detections.length > 0 && canvasRef.current) {
      drawDetections(detections);
    }
  }, [detections, drawDetections]);

  // Throttled detection function
  const detectCurrencyDebounced = useCallback(
    debounce(async (imageBase64) => {
      if (!imageBase64 || isDetecting) return;

      setIsDetecting(true);
      setError(null);
      setStatus('Detecting currency...');
      speak("Detecting currency");

      try {
        let predictions = [];
        
        if (!useSimulation) {
          // Use the API function from services
          predictions = await detectCurrency(imageBase64);
          
          console.log('API predictions received:', predictions);
          
          // Calculate total
          const total = predictions.reduce((sum, det) => sum + (det.value || 0), 0);
          
          // Update state
          setDetections(predictions);
          setTotalValue(total);
          
          // Announce results
          announceResults(predictions, total);
          
          setStatus(`Detected ${predictions.length} currency note${predictions.length !== 1 ? 's' : ''}. Total: ${formatCurrency(total)}`);
        } else {
          // Fallback simulation mode
          simulateDetection();
        }

      } catch (err) {
        console.error('Detection error:', err);
        
        let errorMsg = 'Detection failed. Please try again.';
        if (err.code === 'ECONNABORTED') {
          errorMsg = 'Request timeout. Please check your connection.';
        } else if (err.response) {
          errorMsg = `Server error: ${err.response.status}`;
        } else if (err.request) {
          errorMsg = 'No response from server. Is the backend running?';
        }
        
        setError(errorMsg);
        
        // Switch to simulation mode on persistent errors
        if (!useSimulation) {
          setUseSimulation(true);
          setStatus('Switching to simulation mode');
          speak("Switching to simulation mode");
        }
        
        simulateDetection();
      } finally {
        setIsDetecting(false);
      }
    }, 1500),
    [useSimulation, isDetecting]
  );

  // Capture and process image
  const captureAndDetect = useCallback(() => {
    if (uploadedImage) {
      detectCurrencyDebounced(uploadedImage);
      return;
    }

    if (!webcamRef.current || !isCameraActive || isDetecting) return;

    const screenshot = webcamRef.current.getScreenshot();
    if (screenshot) {
      detectCurrencyDebounced(screenshot);
    }
  }, [isCameraActive, isDetecting, detectCurrencyDebounced, uploadedImage]);

  // Start periodic detection only for webcam
  useEffect(() => {
    if (isCameraActive && !detectionIntervalRef.current && !uploadedImage) {
      detectionIntervalRef.current = setInterval(() => {
        captureAndDetect();
      }, detectionInterval);
    }

    return () => {
      if (detectionIntervalRef.current) {
        clearInterval(detectionIntervalRef.current);
        detectionIntervalRef.current = null;
      }
    };
  }, [isCameraActive, detectionInterval, captureAndDetect, uploadedImage]);

  // Announce results
  const announceResults = (detections, total) => {
    if (detections.length === 0) {
      const announcement = "No currency detected";
      speak(announcement);
      return;
    }

    // Group by currency type
    const counts = {};
    detections.forEach(det => {
      const currencyName = det.label || det.class || 'Unknown';
      counts[currencyName] = (counts[currencyName] || 0) + 1;
    });

    // Create announcement text
    const announcementParts = Object.entries(counts).map(([currency, count]) => {
      return `${count} ${currency}${count > 1 ? 's' : ''}`;
    });

    const totalText = `Total: ${formatCurrency(total)}`;
    const announcement = `Detected ${announcementParts.join(', ')}. ${totalText}`;

    speak(announcement);
  };

  // Simulation mode (fallback)
  const simulateDetection = () => {
    // Generate mock detections for testing
    const mockDetections = [
      {
        id: 'mock_1',
        class: '500_rupees',
        label: '500 Rupees',
        confidence: 0.95,
        bbox: {
          x: 0.2,
          y: 0.2,
          width: 0.2,
          height: 0.15
        },
        value: 500,
        color: '#DDA0DD'
      },
      {
        id: 'mock_2',
        class: '100_rupees',
        label: '100 Rupees',
        confidence: 0.88,
        bbox: {
          x: 0.5,
          y: 0.3,
          width: 0.18,
          height: 0.12
        },
        value: 100,
        color: '#96CEB4'
      }
    ];

    const total = mockDetections.reduce((sum, det) => sum + det.value, 0);
    
    setDetections(mockDetections);
    setTotalValue(total);
    drawDetections(mockDetections);
    announceResults(mockDetections, total);
    setStatus(`Simulation: Detected ${mockDetections.length} notes. Total: ${formatCurrency(total)}`);
  };

  // Clear all detections
  const clearDetections = () => {
    setDetections([]);
    setTotalValue(0);
    
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    
    setStatus('Cleared all detections');
    speak("Cleared all detections");
  };

  // Toggle simulation mode
  const toggleSimulationMode = () => {
    const newMode = !useSimulation;
    setUseSimulation(newMode);
    const modeText = newMode ? "Using simulation mode" : "Using real detection";
    setStatus(modeText);
    speak(modeText);
  };

  // Navigation handlers
  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  const handleLogout = async () => {
    try {
      localStorage.clear();
      navigate('/');
      speak("Logged out successfully");
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Format detection details for display
  const getCurrencyDetails = () => {
    if (detections.length === 0) return null;
    
    const counts = {};
    detections.forEach(det => {
      const currencyName = det.label || det.class || 'Unknown';
      counts[currencyName] = (counts[currencyName] || 0) + 1;
    });
    
    return Object.entries(counts).map(([currency, count]) => (
      <div key={currency} className="currency-summary-item">
        <span className="currency-name">{currency}:</span>
        <span className="currency-count">{count} note{count > 1 ? 's' : ''}</span>
      </div>
    ));
  };

  // Handle webcam video load
  const handleVideoLoad = () => {
    if (webcamRef.current && webcamRef.current.video) {
      const video = webcamRef.current.video;
      const width = video.videoWidth || 640;
      const height = video.videoHeight || 480;
      setCanvasDimensions({ width, height });
      
      if (canvasRef.current) {
        canvasRef.current.width = width;
        canvasRef.current.height = height;
      }
    }
  };

  return (
    <div className="money-analyzer-container">
      {/* Fixed Header */}
      <header className="fixed-header">
        <div className="header-content">
          <div className="header-left">
            <button className="back-btn" onClick={handleBackToDashboard}>
              ← Back to Dashboard
            </button>
            <h1 className="logo">Vision Assist</h1>
          </div>
          <div className="user-menu">
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="money-analyzer-content">
        <div className="money-analyzer-header">
          <h2>💰 Currency Detector</h2>
          <p>Detect Indian currency notes using camera or uploaded images</p>
        </div>

        {/* Status Message */}
        {status && (
          <div className="status-message">
            {status}
            {error && <div className="error-text">{error}</div>}
          </div>
        )}

        <div className="money-analyzer-main">
          {/* Left Panel - Camera/Upload Section */}
          <div className="camera-upload-section">
            <div className="mode-selection">
              <button 
                className={`mode-btn ${showWebcam ? 'active' : ''}`}
                onClick={() => {
                  setShowWebcam(true);
                  setUploadedImage(null);
                  setDetections([]);
                  setTotalValue(0);
                }}
              >
                📷 Camera Mode
              </button>
              <button 
                className={`mode-btn ${!showWebcam && uploadedImage ? 'active' : ''}`}
                onClick={triggerFileUpload}
              >
                📁 Upload Image
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                style={{ display: 'none' }}
              />
            </div>

            <div className="camera-upload-container">
              {showWebcam ? (
                <div className="camera-container">
                  {isCameraActive ? (
                    <>
                      <Webcam
                        ref={webcamRef}
                        audio={false}
                        screenshotFormat="image/jpeg"
                        videoConstraints={{
                          facingMode: "environment",
                          width: { ideal: 1280 },
                          height: { ideal: 720 }
                        }}
                        className="webcam-feed"
                        onUserMedia={handleVideoLoad}
                        onUserMediaError={(err) => {
                          console.error('Webcam error:', err);
                          setError('Failed to access camera. Please check permissions.');
                        }}
                      />
                      <canvas
                        ref={canvasRef}
                        className="detection-canvas"
                        width={canvasDimensions.width}
                        height={canvasDimensions.height}
                      />
                      
                      <div className="camera-overlay">
                        <div className="detection-status">
                          {isDetecting ? (
                            <span className="detecting-indicator">
                              🔍 Detecting...
                            </span>
                          ) : (
                            <span className="active-indicator">
                              ● Live
                            </span>
                          )}
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="camera-placeholder">
                      <div className="placeholder-icon">📷</div>
                      <p>Camera is inactive</p>
                      <button 
                        onClick={startCamera}
                        className="btn btn-primary"
                      >
                        Start Camera
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="upload-container">
                  {uploadedImage ? (
                    <div className="uploaded-image-preview">
                      <img 
                        src={uploadedImage} 
                        alt="Uploaded preview" 
                        className="uploaded-image"
                      />
                      <canvas
                        ref={canvasRef}
                        className="detection-canvas"
                        width={canvasDimensions.width}
                        height={canvasDimensions.height}
                      />
                      <button 
                        onClick={clearUploadedImage}
                        className="btn btn-outline clear-upload-btn"
                      >
                        × Clear Image
                      </button>
                    </div>
                  ) : (
                    <div 
                      className="upload-dropzone"
                      onClick={triggerFileUpload}
                    >
                      <div className="upload-icon">📁</div>
                      <p>Click to upload image</p>
                      <p className="upload-hint">or drag and drop</p>
                      <p className="upload-formats">JPG, PNG, JPEG supported</p>
                    </div>
                  )}
                </div>
              )}

              <div className="camera-controls">
                {showWebcam && isCameraActive && (
                  <>
                    <button 
                      onClick={stopCamera}
                      className="btn btn-danger"
                    >
                      Stop Camera
                    </button>
                    <button 
                      onClick={captureAndDetect}
                      disabled={isDetecting}
                      className="btn btn-secondary"
                    >
                      {isDetecting ? 'Detecting...' : 'Capture & Detect'}
                    </button>
                  </>
                )}
                
                {!showWebcam && uploadedImage && (
                  <button 
                    onClick={() => detectCurrencyDebounced(uploadedImage)}
                    disabled={isDetecting}
                    className="btn btn-secondary"
                  >
                    {isDetecting ? 'Analyzing...' : 'Analyze Image'}
                  </button>
                )}
                
                <button 
                  onClick={clearDetections}
                  className="btn btn-outline"
                  disabled={detections.length === 0}
                >
                  Clear Results
                </button>
              </div>
            </div>
          </div>

          {/* Right Panel - Results & Controls */}
          <div className="results-controls-section">
            <div className="stats-card">
              <h3>📊 Detection Summary</h3>
              <div className="stats-grid">
                <div className="stat-item">
                  <span className="stat-label">Total Value:</span>
                  <span className="stat-value total-amount">
                    {formatCurrency(totalValue)}
                  </span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Notes Detected:</span>
                  <span className="stat-value count-value">
                    {detections.length}
                  </span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Detection Mode:</span>
                  <span className={`stat-value mode-value ${useSimulation ? 'simulation' : 'live'}`}>
                    {useSimulation ? 'Simulation' : 'Live API'}
                  </span>
                </div>
              </div>

              {detections.length > 0 && (
                <div className="currency-summary">
                  <h4>Detected Notes:</h4>
                  <div className="summary-list">
                    {getCurrencyDetails()}
                  </div>
                </div>
              )}
            </div>

            <div className="detections-list">
              <h3>🔍 Detected Items</h3>
              {detections.length > 0 ? (
                <div className="detections-grid">
                  {detections.map((detection) => {
                    const confidencePercent = Math.round((detection.confidence || 0) * 100);
                    return (
                      <div key={detection.id} className="detection-card">
                        <div 
                          className="currency-color-indicator"
                          style={{ 
                            backgroundColor: detection.color || '#00FF00'
                          }}
                        ></div>
                        <div className="currency-info">
                          <div className="currency-name">
                            {detection.label || detection.class}
                          </div>
                          <div className="currency-details">
                            <span className="confidence">
                              Confidence: {confidencePercent}%
                            </span>
                            <span className="value">
                              Value: ₹{detection.value || 0}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="empty-state">
                  <p>No currency detected yet.</p>
                  <p className="hint">
                    {showWebcam 
                      ? 'Start camera and point at currency notes' 
                      : 'Upload an image containing currency notes'}
                  </p>
                </div>
              )}
            </div>

            <div className="settings-card">
              <h3>⚙️ Settings</h3>
              <div className="settings-list">
                <div className="setting-item">
                  <label>
                    <input
                      type="checkbox"
                      checked={useSimulation}
                      onChange={toggleSimulationMode}
                    />
                    Use Simulation Mode
                  </label>
                  <span className="setting-hint">
                    (Fallback when API is unavailable)
                  </span>
                </div>
                
                {showWebcam && isCameraActive && (
                  <div className="setting-item">
                    <label>Auto-detection Interval: {detectionInterval/1000}s</label>
                    <input
                      type="range"
                      min="1000"
                      max="5000"
                      step="500"
                      value={detectionInterval}
                      onChange={(e) => setDetectionInterval(parseInt(e.target.value))}
                      className="interval-slider"
                    />
                    <div className="slider-labels">
                      <span>1s</span>
                      <span>3s</span>
                      <span>5s</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="instructions">
              <h4>ℹ️ How to Use:</h4>
              <ol>
                <li>Choose <strong>Camera Mode</strong> for live detection or <strong>Upload Image</strong> for static images</li>
                <li>For camera: Click "Start Camera" and point at currency notes</li>
                <li>For upload: Click upload zone and select an image</li>
                <li>Detection happens automatically (camera) or click "Analyze Image" (upload)</li>
                <li>Results are announced audibly and displayed here</li>
                <li>Use simulation mode if backend connection fails</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="status-bar">
        <p>
          {isDetecting ? '🔄 Detecting...' : 
           detections.length > 0 ? `✅ Detected ${detections.length} notes, Total: ${formatCurrency(totalValue)}` : 
           '🟢 Ready'}
        </p>
      </div>
    </div>
  );
};

export default MoneyAnalyzer;