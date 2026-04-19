


// // import React, { useState, useRef, useEffect } from 'react';
// // import Tesseract from 'tesseract.js';
// // import { useNavigate } from 'react-router-dom';
// // import './OCRScanner.css';

// // const OCRScanner = () => {
// //   // State
// //   const [image, setImage] = useState(null);
// //   const [extractedText, setExtractedText] = useState('');
// //   const [progress, setProgress] = useState(0);
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [isCameraActive, setIsCameraActive] = useState(false);
// //   const [detectionStatus, setDetectionStatus] = useState('Ready to detect text');
// //   const [showWebcam, setShowWebcam] = useState(false);
// //   const [showResults, setShowResults] = useState(false);
// //   const [totalWords, setTotalWords] = useState(0);
// //   const [totalChars, setTotalChars] = useState(0);
  
// //   // Refs
// //   const navigate = useNavigate();
// //   const fileInputRef = useRef(null);
// //   const webcamRef = useRef(null);
// //   const canvasRef = useRef(null);
// //   const cameraStreamRef = useRef(null);
// //   const textAreaRef = useRef(null);

// //   // Start camera but don't show it
// //   const startCamera = async () => {
// //     try {
// //       stopCamera(); // Stop any existing stream
      
// //       const constraints = {
// //         video: { 
// //           facingMode: 'environment',
// //           width: { ideal: 1280 },
// //           height: { ideal: 720 }
// //         }
// //       };
      
// //       const stream = await navigator.mediaDevices.getUserMedia(constraints);
// //       cameraStreamRef.current = stream;
// //       setIsCameraActive(true);
// //       setShowWebcam(false); // Don't show camera feed
// //       setDetectionStatus('Camera activated. Click "Capture & Analyze" to detect text.');
// //       setImage(null); // Clear any existing image
// //       setExtractedText('');
// //       setShowResults(false);
// //     } catch (error) {
// //       console.error('Camera error:', error);
// //       setDetectionStatus('Camera access denied. Please allow camera permissions.');
// //     }
// //   };

// //   // Stop camera
// //   const stopCamera = () => {
// //     if (cameraStreamRef.current) {
// //       cameraStreamRef.current.getTracks().forEach(track => track.stop());
// //       cameraStreamRef.current = null;
// //     }
// //     setIsCameraActive(false);
// //     setShowWebcam(false);
// //   };

// //   // Capture image from camera
// //   const captureFromCamera = async () => {
// //     if (!isCameraActive || !cameraStreamRef.current) {
// //       setDetectionStatus('Please start camera first.');
// //       return;
// //     }

// //     try {
// //       // Create a temporary video element to capture frame
// //       const video = document.createElement('video');
// //       video.srcObject = cameraStreamRef.current;
      
// //       // Wait for video to be ready
// //       await new Promise((resolve) => {
// //         video.onloadedmetadata = () => {
// //           video.play();
// //           resolve();
// //         };
// //       });
      
// //       // Create canvas to capture frame
// //       const canvas = document.createElement('canvas');
// //       canvas.width = video.videoWidth;
// //       canvas.height = video.videoHeight;
// //       const context = canvas.getContext('2d');
      
// //       // Draw video frame on canvas
// //       context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
// //       // Convert canvas to image URL
// //       const imageData = canvas.toDataURL('image/jpeg');
// //       setImage(imageData);
// //       setShowWebcam(false); // Hide camera after capture
// //       setDetectionStatus('Image captured. Analyzing text...');
      
// //       // Start OCR analysis automatically
// //       setTimeout(() => {
// //         performOCR(imageData);
// //       }, 500);
      
// //     } catch (error) {
// //       console.error('Capture error:', error);
// //       setDetectionStatus('Failed to capture image. Please try again.');
// //     }
// //   };

// //   // Handle file upload
// //   const handleFileUpload = (event) => {
// //     const file = event.target.files[0];
// //     if (file) {
// //       const reader = new FileReader();
// //       reader.onload = (e) => {
// //         const imageData = e.target.result;
// //         setImage(imageData);
// //         setShowWebcam(false);
// //         setIsCameraActive(false);
// //         setDetectionStatus('Image uploaded. Analyzing text...');
        
// //         // Stop camera if active
// //         stopCamera();
        
// //         // Start OCR analysis automatically
// //         setTimeout(() => {
// //           performOCR(imageData);
// //         }, 500);
// //       };
// //       reader.readAsDataURL(file);
// //     }
// //   };

// //   // Perform OCR
// //   const performOCR = async (imageData) => {
// //     if (!imageData) {
// //       setDetectionStatus('No image available for analysis.');
// //       return;
// //     }

// //     setIsLoading(true);
// //     setProgress(0);
// //     setExtractedText('');
// //     setShowResults(false);

// //     try {
// //       const result = await Tesseract.recognize(imageData, 'eng', {
// //         logger: (message) => {
// //           if (message.status === 'recognizing text') {
// //             setProgress(Math.round(message.progress * 100));
// //           }
// //         }
// //       });

// //       const text = result.data.text.trim();
// //       setExtractedText(text);
      
// //       // Calculate statistics
// //       const chars = text.length;
// //       const words = text.split(/\s+/).filter(word => word.length > 0).length;
      
// //       setTotalChars(chars);
// //       setTotalWords(words);
// //       setShowResults(true);
      
// //       if (text) {
// //         setDetectionStatus(`Text extracted successfully! Found ${words} words.`);
// //       } else {
// //         setDetectionStatus('No text detected. Try a clearer image.');
// //       }
// //     } catch (error) {
// //       console.error('OCR Error:', error);
// //       setDetectionStatus('Failed to extract text. Please try again.');
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   // Clear all results
// //   const clearResults = () => {
// //     setImage(null);
// //     setExtractedText('');
// //     setProgress(0);
// //     setDetectionStatus('Ready to detect text');
// //     setTotalWords(0);
// //     setTotalChars(0);
// //     setShowResults(false);
// //     stopCamera();
// //     if (fileInputRef.current) {
// //       fileInputRef.current.value = '';
// //     }
// //   };

// //   // Copy text to clipboard
// //   const copyToClipboard = () => {
// //     if (extractedText) {
// //       navigator.clipboard.writeText(extractedText)
// //         .then(() => {
// //           setDetectionStatus('Text copied to clipboard!');
// //           setTimeout(() => {
// //             if (extractedText) {
// //               setDetectionStatus(`Text extracted successfully! Found ${totalWords} words.`);
// //             }
// //           }, 2000);
// //         })
// //         .catch(err => {
// //           console.error('Copy failed:', err);
// //           setDetectionStatus('Failed to copy text.');
// //         });
// //     }
// //   };

// //   // Handle back to dashboard
// //   const handleBackToDashboard = () => {
// //     stopCamera();
// //     navigate('/dashboard');
// //   };

// //   // Handle logout
// //   const handleLogout = () => {
// //     stopCamera();
// //     localStorage.clear();
// //     navigate('/');
// //   };

// //   // Clean up camera on unmount
// //   useEffect(() => {
// //     return () => {
// //       stopCamera();
// //     };
// //   }, []);

// //   // Trigger file upload
// //   const triggerFileUpload = () => {
// //     fileInputRef.current.click();
// //   };

// //   return (
// //     <div className="ocr-scanner-container">
// //       {/* Fixed Header */}
// //       <header className="dashboard-header fixed-header">
// //         <div className="header-content">
// //           <div className="header-left">
// //             <button className="back-btn" onClick={handleBackToDashboard}>
// //               ← Back to Dashboard
// //             </button>
// //             <h1 className="logo">Vision Assist</h1>
// //           </div>
// //           <div className="user-menu">
// //             <button 
// //               className="logout-btn" 
// //               onClick={handleLogout}
// //             >
// //               Logout
// //             </button>
// //           </div>
// //         </div>
// //       </header>

// //       <div className="ocr-content">
// //         {/* Main Content Grid */}
// //         <div className="ocr-grid">
// //           {/* Left Column - Camera/Upload */}
// //           <div className="camera-column">
// //             <div className="camera-card">
// //               <h2 className="section-title">📷 Text Scanner</h2>
              
// //               {/* Camera Status */}
// //               <div className="camera-status">
// //                 <div className={`status-indicator ${isCameraActive ? 'active' : 'inactive'}`}>
// //                   <span className="status-dot"></span>
// //                   {isCameraActive ? 'Camera Active' : 'Camera Inactive'}
// //                 </div>
// //                 <p className="status-message">
// //                   {isCameraActive 
// //                     ? 'Camera is active but not visible. Click "Capture & Analyze" to detect text.' 
// //                     : 'Click "Start Camera" to begin'}
// //                 </p>
// //               </div>

// //               {/* Mode Selection */}
// //               <div className="mode-selection">
// //                 <button 
// //                   className={`mode-btn ${isCameraActive ? 'active' : ''}`}
// //                   onClick={startCamera}
// //                 >
// //                   📷 Camera Mode
// //                 </button>
// //                 <button 
// //                   className={`mode-btn ${image && !isCameraActive ? 'active' : ''}`}
// //                   onClick={triggerFileUpload}
// //                 >
// //                   📁 Upload Image
// //                 </button>
// //                 <input
// //                   type="file"
// //                   ref={fileInputRef}
// //                   onChange={handleFileUpload}
// //                   accept="image/*"
// //                   style={{ display: 'none' }}
// //                 />
// //               </div>

// //               {/* Camera/Upload Container */}
// //               <div className="camera-upload-container">
// //                 {image ? (
// //                   <div className="image-preview-container">
// //                     <div className="image-preview">
// //                       <img src={image} alt="Captured" className="preview-image" />
// //                       <div className="image-overlay">
// //                         <span className="overlay-text">Captured Image</span>
// //                       </div>
// //                     </div>
// //                     <button 
// //                       className="btn change-image-btn"
// //                       onClick={() => setImage(null)}
// //                     >
// //                       Change Image
// //                     </button>
// //                   </div>
// //                 ) : isCameraActive ? (
// //                   <div className="camera-container">
// //                     <div className="camera-placeholder">
// //                       <div className="placeholder-icon">📷</div>
// //                       <p>Camera is active but not visible</p>
// //                       <p className="placeholder-subtext">Click "Capture & Analyze" to detect text</p>
// //                     </div>
// //                   </div>
// //                 ) : (
// //                   <div className="upload-dropzone" onClick={triggerFileUpload}>
// //                     <div className="upload-icon">📁</div>
// //                     <p>Click to upload image</p>
// //                     <p className="upload-hint">or use camera mode</p>
// //                   </div>
// //                 )}
// //               </div>

// //               {/* Camera Controls */}
// //               <div className="camera-controls">
// //                 {isCameraActive && (
// //                   <>
// //                     <button 
// //                       className="btn btn-danger"
// //                       onClick={stopCamera}
// //                     >
// //                       Stop Camera
// //                     </button>
// //                     <button 
// //                       className="btn btn-secondary"
// //                       onClick={captureFromCamera}
// //                       disabled={isLoading}
// //                     >
// //                       {isLoading ? 'Analyzing...' : 'Capture & Analyze'}
// //                     </button>
// //                   </>
// //                 )}
                
// //                 {image && !isCameraActive && (
// //                   <button 
// //                     className="btn btn-secondary"
// //                     onClick={() => performOCR(image)}
// //                     disabled={isLoading}
// //                   >
// //                     {isLoading ? 'Analyzing...' : 'Analyze Text'}
// //                   </button>
// //                 )}
                
// //                 <button 
// //                   className="btn btn-outline"
// //                   onClick={clearResults}
// //                   disabled={!image && !extractedText && !isCameraActive}
// //                 >
// //                   Clear All
// //                 </button>
// //               </div>
// //             </div>

// //             {/* Control Panel */}
// //             <div className="control-panel">
// //               <h3 className="panel-title">Controls</h3>
// //               <div className="control-buttons">
// //                 <button 
// //                   className="btn control-btn"
// //                   onClick={isCameraActive ? stopCamera : startCamera}
// //                 >
// //                   {isCameraActive ? 'Stop Camera' : 'Start Camera'}
// //                 </button>
                
// //                 <button 
// //                   className="btn control-btn"
// //                   onClick={image ? () => performOCR(image) : triggerFileUpload}
// //                   disabled={isLoading || (isCameraActive && !image)}
// //                 >
// //                   {isLoading ? 'Analyzing...' : 'Analyze Text'}
// //                 </button>
                
// //                 <button 
// //                   className="btn control-btn"
// //                   onClick={triggerFileUpload}
// //                   disabled={isCameraActive}
// //                 >
// //                   Upload Image
// //                 </button>
                
// //                 <button 
// //                   className="btn control-btn clear-btn"
// //                   onClick={clearResults}
// //                   disabled={!image && !extractedText && !isCameraActive}
// //                 >
// //                   Clear All
// //                 </button>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Right Column - Results */}
// //           <div className="results-column">
// //             <div className="results-card">
// //               <h2 className="section-title">📝 Detection Results</h2>
              
// //               {/* Stats */}
// //               <div className="stats-grid">
// //                 <div className="stat-item">
// //                   <span className="stat-label">Words</span>
// //                   <span className="stat-value">{totalWords}</span>
// //                 </div>
// //                 <div className="stat-item">
// //                   <span className="stat-label">Characters</span>
// //                   <span className="stat-value">{totalChars}</span>
// //                 </div>
// //                 <div className="stat-item">
// //                   <span className="stat-label">Status</span>
// //                   <span className={`stat-value status-text ${extractedText ? 'success' : 'idle'}`}>
// //                     {extractedText ? 'Text Detected' : 'Ready'}
// //                   </span>
// //                 </div>
// //               </div>

// //               {/* Detection Status */}
// //               <div className="detection-status">
// //                 <h4>Text Detection</h4>
// //                 <p className="status-message">{detectionStatus}</p>
                
// //                 {!showResults && (
// //                   <div className="empty-state">
// //                     <div className="empty-icon">🔍</div>
// //                     <p>No text detected yet</p>
// //                     <p className="empty-subtext">Start camera or upload an image</p>
// //                   </div>
// //                 )}
// //               </div>

// //               {/* Extracted Text Display */}
// //               {showResults && extractedText && (
// //                 <div className="extracted-text-section">
// //                   <div className="section-header">
// //                     <h4>Extracted Text</h4>
// //                     <button 
// //                       className="btn copy-btn"
// //                       onClick={copyToClipboard}
// //                     >
// //                       Copy Text
// //                     </button>
// //                   </div>
                  
// //                   <div className="text-output-container">
// //                     <textarea
// //                       ref={textAreaRef}
// //                       value={extractedText}
// //                       readOnly
// //                       className="text-output"
// //                       rows="10"
// //                       placeholder="Extracted text will appear here..."
// //                     />
// //                   </div>
                  
// //                   <div className="text-actions">
// //                     <button 
// //                       className="btn action-btn"
// //                       onClick={() => {
// //                         const blob = new Blob([extractedText], { type: 'text/plain' });
// //                         const url = URL.createObjectURL(blob);
// //                         const a = document.createElement('a');
// //                         a.href = url;
// //                         a.download = `extracted-text-${new Date().toISOString().slice(0,10)}.txt`;
// //                         a.click();
// //                         URL.revokeObjectURL(url);
// //                       }}
// //                     >
// //                       Download as TXT
// //                     </button>
// //                     <button 
// //                       className="btn action-btn clear-text-btn"
// //                       onClick={() => {
// //                         setExtractedText('');
// //                         setShowResults(false);
// //                         setTotalWords(0);
// //                         setTotalChars(0);
// //                       }}
// //                     >
// //                       Clear Text
// //                     </button>
// //                   </div>
// //                 </div>
// //               )}

// //               {/* Progress Bar */}
// //               {isLoading && (
// //                 <div className="progress-section">
// //                   <div className="progress-header">
// //                     <h4>Processing Image</h4>
// //                     <span className="progress-percent">{progress}%</span>
// //                   </div>
// //                   <div className="progress-bar">
// //                     <div 
// //                       className="progress-fill"
// //                       style={{ width: `${progress}%` }}
// //                     ></div>
// //                   </div>
// //                   <p className="progress-text">Analyzing text in image...</p>
// //                 </div>
// //               )}
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Status Bar */}
// //       <div className="status-bar">
// //         <p>
// //           {isLoading ? '🔄 Analyzing text...' : 
// //            extractedText ? `✅ Detected ${totalWords} words, ${totalChars} characters` : 
// //            isCameraActive ? '📷 Camera active - Click "Capture & Analyze"' :
// //            '🟢 Ready to scan text'}
// //         </p>
// //       </div>
// //     </div>
// //   );
// // };

// // export default OCRScanner;


// // src/components/OCRScanner/OCRScanner.jsx - Updated version
// import React, { useState, useRef, useEffect, useCallback } from 'react';
// import Tesseract from 'tesseract.js';
// import { useNavigate } from 'react-router-dom';
// import { voiceService } from '../../services/voiceService';
// import { initializeOCRVoiceCommands } from '../../voice-commands/ocrVoiceCommands';
// import './OCRScanner.css';

// const OCRScanner = () => {
//   // State (keep all existing state)
//   const [image, setImage] = useState(null);
//   const [extractedText, setExtractedText] = useState('');
//   const [progress, setProgress] = useState(0);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isCameraActive, setIsCameraActive] = useState(false);
//   const [detectionStatus, setDetectionStatus] = useState('Ready to detect text');
//   const [showWebcam, setShowWebcam] = useState(false);
//   const [showResults, setShowResults] = useState(false);
//   const [totalWords, setTotalWords] = useState(0);
//   const [totalChars, setTotalChars] = useState(0);
  
//   // Refs
//   const navigate = useNavigate();
//   const fileInputRef = useRef(null);
//   const webcamRef = useRef(null);
//   const canvasRef = useRef(null);
//   const cameraStreamRef = useRef(null);
//   const textAreaRef = useRef(null);
//   const voiceCommandsRef = useRef(null);

//   // Wrap functions that will be passed to voice commands with useCallback
//   const startCamera = useCallback(async () => {
//     try {
//       stopCamera();
      
//       const constraints = {
//         video: { 
//           facingMode: 'environment',
//           width: { ideal: 1280 },
//           height: { ideal: 720 }
//         }
//       };
      
//       const stream = await navigator.mediaDevices.getUserMedia(constraints);
//       cameraStreamRef.current = stream;
//       setIsCameraActive(true);
//       setShowWebcam(false);
//       setDetectionStatus('Camera activated. Click "Capture & Analyze" to detect text.');
//       setImage(null);
//       setExtractedText('');
//       setShowResults(false);
//     } catch (error) {
//       console.error('Camera error:', error);
//       setDetectionStatus('Camera access denied. Please allow camera permissions.');
//     }
//   }, []);

//   const stopCamera = useCallback(() => {
//     if (cameraStreamRef.current) {
//       cameraStreamRef.current.getTracks().forEach(track => track.stop());
//       cameraStreamRef.current = null;
//     }
//     setIsCameraActive(false);
//     setShowWebcam(false);
//   }, []);

//   const captureFromCamera = useCallback(async () => {
//     if (!isCameraActive || !cameraStreamRef.current) {
//       setDetectionStatus('Please start camera first.');
//       return;
//     }

//     try {
//       const video = document.createElement('video');
//       video.srcObject = cameraStreamRef.current;
      
//       await new Promise((resolve) => {
//         video.onloadedmetadata = () => {
//           video.play();
//           resolve();
//         };
//       });
      
//       const canvas = document.createElement('canvas');
//       canvas.width = video.videoWidth;
//       canvas.height = video.videoHeight;
//       const context = canvas.getContext('2d');
      
//       context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
//       const imageData = canvas.toDataURL('image/jpeg');
//       setImage(imageData);
//       setShowWebcam(false);
//       setDetectionStatus('Image captured. Analyzing text...');
      
//       setTimeout(() => {
//         performOCR(imageData);
//       }, 500);
      
//     } catch (error) {
//       console.error('Capture error:', error);
//       setDetectionStatus('Failed to capture image. Please try again.');
//     }
//   }, [isCameraActive]);

//   const handleFileUpload = useCallback((event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         const imageData = e.target.result;
//         setImage(imageData);
//         setShowWebcam(false);
//         setIsCameraActive(false);
//         setDetectionStatus('Image uploaded. Analyzing text...');
        
//         stopCamera();
        
//         setTimeout(() => {
//           performOCR(imageData);
//         }, 500);
//       };
//       reader.readAsDataURL(file);
//     }
//   }, [stopCamera]);

//   const performOCR = useCallback(async (imageData) => {
//     if (!imageData) {
//       setDetectionStatus('No image available for analysis.');
//       return;
//     }

//     setIsLoading(true);
//     setProgress(0);
//     setExtractedText('');
//     setShowResults(false);

//     try {
//       const result = await Tesseract.recognize(imageData, 'eng', {
//         logger: (message) => {
//           if (message.status === 'recognizing text') {
//             setProgress(Math.round(message.progress * 100));
//           }
//         }
//       });

//       const text = result.data.text.trim();
//       setExtractedText(text);
      
//       const chars = text.length;
//       const words = text.split(/\s+/).filter(word => word.length > 0).length;
      
//       setTotalChars(chars);
//       setTotalWords(words);
//       setShowResults(true);
      
//       if (text) {
//         setDetectionStatus(`Text extracted successfully! Found ${words} words.`);
//       } else {
//         setDetectionStatus('No text detected. Try a clearer image.');
//       }
//     } catch (error) {
//       console.error('OCR Error:', error);
//       setDetectionStatus('Failed to extract text. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);

//   const clearResults = useCallback(() => {
//     setImage(null);
//     setExtractedText('');
//     setProgress(0);
//     setDetectionStatus('Ready to detect text');
//     setTotalWords(0);
//     setTotalChars(0);
//     setShowResults(false);
//     stopCamera();
//     if (fileInputRef.current) {
//       fileInputRef.current.value = '';
//     }
//   }, [stopCamera]);

//   const copyToClipboard = useCallback(() => {
//     if (extractedText) {
//       navigator.clipboard.writeText(extractedText)
//         .then(() => {
//           setDetectionStatus('Text copied to clipboard!');
//           setTimeout(() => {
//             if (extractedText) {
//               setDetectionStatus(`Text extracted successfully! Found ${totalWords} words.`);
//             }
//           }, 2000);
//         })
//         .catch(err => {
//           console.error('Copy failed:', err);
//           setDetectionStatus('Failed to copy text.');
//         });
//     }
//   }, [extractedText, totalWords]);

//   const handleBackToDashboard = useCallback(() => {
//     stopCamera();
//     navigate('/dashboard');
//   }, [navigate, stopCamera]);

//   const handleLogout = useCallback(() => {
//     stopCamera();
//     localStorage.clear();
//     navigate('/');
//   }, [navigate, stopCamera]);

//   const triggerFileUpload = useCallback(() => {
//     fileInputRef.current?.click();
//   }, []);

//   // Initialize voice commands
//   useEffect(() => {
//     // Create component API object for voice commands
//     const componentAPI = {
//       // Navigation
//       handleBackToDashboard,
//       handleLogout,
      
//       // Camera controls
//       startCamera,
//       stopCamera,
//       captureFromCamera,
//       isCameraActive,
      
//       // File upload
//       triggerFileUpload,
      
//       // Analysis
//       performOCR: (imageData) => performOCR(imageData || image),
//       image,
      
//       // Results management
//       clearResults,
//       copyToClipboard,
//       extractedText,
//       totalWords,
//       totalChars,
//       isLoading,
      
//       // State setters
//       setImage,
//       setExtractedText,
//       setShowResults,
//       setTotalWords,
//       setTotalChars,
//       setDetectionStatus
//     };

//     // Initialize voice commands
//     voiceCommandsRef.current = initializeOCRVoiceCommands(componentAPI);

//     // Cleanup on unmount
//     return () => {
//       if (voiceCommandsRef.current) {
//         voiceCommandsRef.current.cleanup();
//       }
//     };
//   }, [
//     image, 
//     extractedText, 
//     isLoading, 
//     isCameraActive, 
//     totalWords, 
//     totalChars,
//     startCamera,
//     stopCamera,
//     captureFromCamera,
//     handleFileUpload,
//     performOCR,
//     clearResults,
//     copyToClipboard,
//     handleBackToDashboard,
//     handleLogout,
//     triggerFileUpload
//   ]);

//   // Clean up camera on unmount
//   useEffect(() => {
//     return () => {
//       stopCamera();
//     };
//   }, [stopCamera]);

//   // Keep all existing JSX exactly as it was
//   return (
//     <div className="ocr-scanner-container">
//       {/* Fixed Header */}
//       <header className="dashboard-header fixed-header">
//         <div className="header-content">
//           <div className="header-left">
//             <button className="back-btn" onClick={handleBackToDashboard}>
//               ← Back to Dashboard
//             </button>
//             <h1 className="logo">Vision Assist</h1>
//           </div>
//           <div className="user-menu">
//             <button 
//               className="logout-btn" 
//               onClick={handleLogout}
//             >
//               Logout
//             </button>
//           </div>
//         </div>
//       </header>

//       <div className="ocr-content">
//         {/* Main Content Grid */}
//         <div className="ocr-grid">
//           {/* Left Column - Camera/Upload */}
//           <div className="camera-column">
//             <div className="camera-card">
//               <h2 className="section-title">📷 Text Scanner</h2>
              
//               {/* Camera Status */}
//               <div className="camera-status">
//                 <div className={`status-indicator ${isCameraActive ? 'active' : 'inactive'}`}>
//                   <span className="status-dot"></span>
//                   {isCameraActive ? 'Camera Active' : 'Camera Inactive'}
//                 </div>
//                 <p className="status-message">
//                   {isCameraActive 
//                     ? 'Camera is active but not visible. Click "Capture & Analyze" to detect text.' 
//                     : 'Click "Start Camera" to begin'}
//                 </p>
//               </div>

//               {/* Mode Selection */}
//               <div className="mode-selection">
//                 <button 
//                   className={`mode-btn ${isCameraActive ? 'active' : ''}`}
//                   onClick={startCamera}
//                 >
//                   📷 Camera Mode
//                 </button>
//                 <button 
//                   className={`mode-btn ${image && !isCameraActive ? 'active' : ''}`}
//                   onClick={triggerFileUpload}
//                 >
//                   📁 Upload Image
//                 </button>
//                 <input
//                   type="file"
//                   ref={fileInputRef}
//                   onChange={handleFileUpload}
//                   accept="image/*"
//                   style={{ display: 'none' }}
//                 />
//               </div>

//               {/* Camera/Upload Container */}
//               <div className="camera-upload-container">
//                 {image ? (
//                   <div className="image-preview-container">
//                     <div className="image-preview">
//                       <img src={image} alt="Captured" className="preview-image" />
//                       <div className="image-overlay">
//                         <span className="overlay-text">Captured Image</span>
//                       </div>
//                     </div>
//                     <button 
//                       className="btn change-image-btn"
//                       onClick={() => setImage(null)}
//                     >
//                       Change Image
//                     </button>
//                   </div>
//                 ) : isCameraActive ? (
//                   <div className="camera-container">
//                     <div className="camera-placeholder">
//                       <div className="placeholder-icon">📷</div>
//                       <p>Camera is active but not visible</p>
//                       <p className="placeholder-subtext">Click "Capture & Analyze" to detect text</p>
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="upload-dropzone" onClick={triggerFileUpload}>
//                     <div className="upload-icon">📁</div>
//                     <p>Click to upload image</p>
//                     <p className="upload-hint">or use camera mode</p>
//                   </div>
//                 )}
//               </div>

//               {/* Camera Controls */}
//               <div className="camera-controls">
//                 {isCameraActive && (
//                   <>
//                     <button 
//                       className="btn btn-danger"
//                       onClick={stopCamera}
//                     >
//                       Stop Camera
//                     </button>
//                     <button 
//                       className="btn btn-secondary"
//                       onClick={captureFromCamera}
//                       disabled={isLoading}
//                     >
//                       {isLoading ? 'Analyzing...' : 'Capture & Analyze'}
//                     </button>
//                   </>
//                 )}
                
//                 {image && !isCameraActive && (
//                   <button 
//                     className="btn btn-secondary"
//                     onClick={() => performOCR(image)}
//                     disabled={isLoading}
//                   >
//                     {isLoading ? 'Analyzing...' : 'Analyze Text'}
//                   </button>
//                 )}
                
//                 <button 
//                   className="btn btn-outline"
//                   onClick={clearResults}
//                   disabled={!image && !extractedText && !isCameraActive}
//                 >
//                   Clear All
//                 </button>
//               </div>
//             </div>

//             {/* Control Panel */}
//             <div className="control-panel">
//               <h3 className="panel-title">Controls</h3>
//               <div className="control-buttons">
//                 <button 
//                   className="btn control-btn"
//                   onClick={isCameraActive ? stopCamera : startCamera}
//                 >
//                   {isCameraActive ? 'Stop Camera' : 'Start Camera'}
//                 </button>
                
//                 <button 
//                   className="btn control-btn"
//                   onClick={image ? () => performOCR(image) : triggerFileUpload}
//                   disabled={isLoading || (isCameraActive && !image)}
//                 >
//                   {isLoading ? 'Analyzing...' : 'Analyze Text'}
//                 </button>
                
//                 <button 
//                   className="btn control-btn"
//                   onClick={triggerFileUpload}
//                   disabled={isCameraActive}
//                 >
//                   Upload Image
//                 </button>
                
//                 <button 
//                   className="btn control-btn clear-btn"
//                   onClick={clearResults}
//                   disabled={!image && !extractedText && !isCameraActive}
//                 >
//                   Clear All
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Right Column - Results */}
//           <div className="results-column">
//             <div className="results-card">
//               <h2 className="section-title">📝 Detection Results</h2>
              
//               {/* Stats */}
//               <div className="stats-grid">
//                 <div className="stat-item">
//                   <span className="stat-label">Words</span>
//                   <span className="stat-value">{totalWords}</span>
//                 </div>
//                 <div className="stat-item">
//                   <span className="stat-label">Characters</span>
//                   <span className="stat-value">{totalChars}</span>
//                 </div>
//                 <div className="stat-item">
//                   <span className="stat-label">Status</span>
//                   <span className={`stat-value status-text ${extractedText ? 'success' : 'idle'}`}>
//                     {extractedText ? 'Text Detected' : 'Ready'}
//                   </span>
//                 </div>
//               </div>

//               {/* Detection Status */}
//               <div className="detection-status">
//                 <h4>Text Detection</h4>
//                 <p className="status-message">{detectionStatus}</p>
                
//                 {!showResults && (
//                   <div className="empty-state">
//                     <div className="empty-icon">🔍</div>
//                     <p>No text detected yet</p>
//                     <p className="empty-subtext">Start camera or upload an image</p>
//                   </div>
//                 )}
//               </div>

//               {/* Extracted Text Display */}
//               {showResults && extractedText && (
//                 <div className="extracted-text-section">
//                   <div className="section-header">
//                     <h4>Extracted Text</h4>
//                     <button 
//                       className="btn copy-btn"
//                       onClick={copyToClipboard}
//                     >
//                       Copy Text
//                     </button>
//                   </div>
                  
//                   <div className="text-output-container">
//                     <textarea
//                       ref={textAreaRef}
//                       value={extractedText}
//                       readOnly
//                       className="text-output"
//                       rows="10"
//                       placeholder="Extracted text will appear here..."
//                     />
//                   </div>
                  
//                   <div className="text-actions">
//                     <button 
//                       className="btn action-btn"
//                       onClick={() => {
//                         const blob = new Blob([extractedText], { type: 'text/plain' });
//                         const url = URL.createObjectURL(blob);
//                         const a = document.createElement('a');
//                         a.href = url;
//                         a.download = `extracted-text-${new Date().toISOString().slice(0,10)}.txt`;
//                         a.click();
//                         URL.revokeObjectURL(url);
//                       }}
//                     >
//                       Download as TXT
//                     </button>
//                     <button 
//                       className="btn action-btn clear-text-btn"
//                       onClick={() => {
//                         setExtractedText('');
//                         setShowResults(false);
//                         setTotalWords(0);
//                         setTotalChars(0);
//                       }}
//                     >
//                       Clear Text
//                     </button>
//                   </div>
//                 </div>
//               )}

//               {/* Progress Bar */}
//               {isLoading && (
//                 <div className="progress-section">
//                   <div className="progress-header">
//                     <h4>Processing Image</h4>
//                     <span className="progress-percent">{progress}%</span>
//                   </div>
//                   <div className="progress-bar">
//                     <div 
//                       className="progress-fill"
//                       style={{ width: `${progress}%` }}
//                     ></div>
//                   </div>
//                   <p className="progress-text">Analyzing text in image...</p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Status Bar */}
//       <div className="status-bar">
//         <p>
//           {isLoading ? '🔄 Analyzing text...' : 
//            extractedText ? `✅ Detected ${totalWords} words, ${totalChars} characters` : 
//            isCameraActive ? '📷 Camera active - Click "Capture & Analyze"' :
//            '🟢 Ready to scan text'}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default OCRScanner;



// src/components/OCRScanner/OCRScanner.jsx - Fixed version
import React, { useState, useRef, useEffect, useCallback } from 'react';
import Tesseract from 'tesseract.js';
import { useNavigate } from 'react-router-dom';
import { voiceService } from '../../services/voiceService';
import { initializeOCRVoiceCommands } from '../../voice-commands/ocrVoiceCommands';
import './OCRScanner.css';
import Webcam from 'react-webcam';

const OCRScanner = () => {
  // State
  const [image, setImage] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [detectionStatus, setDetectionStatus] = useState('Ready to detect text');
  const [showWebcam, setShowWebcam] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [totalWords, setTotalWords] = useState(0);
  const [totalChars, setTotalChars] = useState(0);
  const [ocrConfig, setOcrConfig] = useState({
    lang: 'eng',
    oem: 1,
    psm: 3,
  });
  
  // Refs
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const cameraStreamRef = useRef(null);
  const textAreaRef = useRef(null);
  const voiceCommandsRef = useRef(null);

  // Webcam constraints
  const videoConstraints = {
    facingMode: "environment",
    width: { ideal: 1280 },
    height: { ideal: 720 }
  };

  // Start camera with live streaming
  const startCamera = useCallback(async () => {
    try {
      stopCamera(); // Clean up any existing stream
      
      // For better compatibility, we'll use react-webcam for streaming
      setIsCameraActive(true);
      setShowWebcam(true);
      setDetectionStatus('Camera activated. Click "Capture & Analyze" to detect text.');
      setImage(null);
      setExtractedText('');
      setShowResults(false);
      
    } catch (error) {
      console.error('Camera error:', error);
      setDetectionStatus('Camera access denied. Please allow camera permissions.');
    }
  }, []);

  // Stop camera
  const stopCamera = useCallback(() => {
    if (cameraStreamRef.current) {
      cameraStreamRef.current.getTracks().forEach(track => track.stop());
      cameraStreamRef.current = null;
    }
    setIsCameraActive(false);
    setShowWebcam(false);
  }, []);

  // Capture image from webcam
  const captureFromCamera = useCallback(async () => {
    if (!isCameraActive || !webcamRef.current) {
      setDetectionStatus('Please start camera first.');
      return;
    }

    try {
      // Get screenshot from webcam
      const imageSrc = webcamRef.current.getScreenshot();
      if (!imageSrc) {
        throw new Error('Failed to capture image');
      }
      
      setImage(imageSrc);
      setDetectionStatus('Image captured. Analyzing text...');
      
      // Perform OCR
      setTimeout(() => {
        performOCR(imageSrc);
      }, 300);
      
    } catch (error) {
      console.error('Capture error:', error);
      setDetectionStatus('Failed to capture image. Please try again.');
    }
  }, [isCameraActive]);

  // Handle file upload
  const handleFileUpload = useCallback((event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e.target.result;
        setImage(imageData);
        setShowWebcam(false);
        setIsCameraActive(false);
        setDetectionStatus('Image uploaded. Analyzing text...');
        
        stopCamera();
        
        setTimeout(() => {
          performOCR(imageData);
        }, 300);
      };
      reader.readAsDataURL(file);
    }
  }, [stopCamera]);

  // Perform OCR with better configuration
  const performOCR = useCallback(async (imageData) => {
    if (!imageData) {
      setDetectionStatus('No image available for analysis.');
      return;
    }

    setIsLoading(true);
    setProgress(0);
    setExtractedText('');
    setShowResults(false);
    setDetectionStatus('Processing image...');

    try {
      // Preprocess image for better OCR results
      const processedImage = await preprocessImage(imageData);
      
      const result = await Tesseract.recognize(processedImage, 'eng', {
        logger: (message) => {
          if (message.status === 'recognizing text') {
            setProgress(Math.round(message.progress * 100));
          }
        },
        // Add OCR engine configuration for better accuracy
        tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 .,!?@#$%&*()-_=+[]{}|;:"\'<>/\\',
        tessedit_pageseg_mode: '3', // Fully automatic page segmentation, but no OSD
        preserve_interword_spaces: '1',
      });

      let text = result.data.text.trim();
      
      // Post-process the text
      text = postProcessText(text);
      
      setExtractedText(text);
      
      const chars = text.length;
      const words = text.split(/\s+/).filter(word => word.length > 0).length;
      
      setTotalChars(chars);
      setTotalWords(words);
      setShowResults(true);
      
      if (text) {
        setDetectionStatus(`Text extracted successfully! Found ${words} words.`);
      } else {
        setDetectionStatus('No text detected. Try a clearer image with better lighting.');
      }
    } catch (error) {
      console.error('OCR Error:', error);
      setDetectionStatus('Failed to extract text. Please try a clearer image.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Image preprocessing for better OCR
  const preprocessImage = async (imageData) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Set canvas dimensions
        canvas.width = img.width;
        canvas.height = img.height;
        
        // Draw image
        ctx.drawImage(img, 0, 0);
        
        // Get image data for preprocessing
        const imageDataObj = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageDataObj.data;
        
        // Apply basic preprocessing
        for (let i = 0; i < data.length; i += 4) {
          // Convert to grayscale
          const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
          
          // Increase contrast
          const contrast = 1.5;
          const adjusted = ((avg - 128) * contrast) + 128;
          
          data[i] = adjusted;     // R
          data[i + 1] = adjusted; // G
          data[i + 2] = adjusted; // B
        }
        
        ctx.putImageData(imageDataObj, 0, 0);
        
        // Convert back to data URL
        const processedDataUrl = canvas.toDataURL('image/jpeg', 0.9);
        resolve(processedDataUrl);
      };
      img.src = imageData;
    });
  };

  // Post-process OCR text
  const postProcessText = (text) => {
    // Remove common OCR errors
    return text
      .replace(/\|\|/g, 'I') // Fix pipe characters
      .replace(/\[/g, 'I')   // Fix bracket characters
      .replace(/\s+/g, ' ')  // Normalize whitespace
      .replace(/\.\s*\./g, '.') // Fix double periods
      .trim();
  };

  const clearResults = useCallback(() => {
    setImage(null);
    setExtractedText('');
    setProgress(0);
    setDetectionStatus('Ready to detect text');
    setTotalWords(0);
    setTotalChars(0);
    setShowResults(false);
    stopCamera();
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [stopCamera]);

  const copyToClipboard = useCallback(() => {
    if (extractedText) {
      navigator.clipboard.writeText(extractedText)
        .then(() => {
          setDetectionStatus('Text copied to clipboard!');
          setTimeout(() => {
            if (extractedText) {
              setDetectionStatus(`Text extracted successfully! Found ${totalWords} words.`);
            }
          }, 2000);
        })
        .catch(err => {
          console.error('Copy failed:', err);
          setDetectionStatus('Failed to copy text.');
        });
    }
  }, [extractedText, totalWords]);

  const handleBackToDashboard = useCallback(() => {
    stopCamera();
    navigate('/dashboard');
  }, [navigate, stopCamera]);

  const handleLogout = useCallback(() => {
    stopCamera();
    localStorage.clear();
    navigate('/');
  }, [navigate, stopCamera]);

  const triggerFileUpload = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  // Add tips for better OCR
  const [ocrTips] = useState([
    'Use good lighting - natural light is best',
    'Hold the camera steady',
    'Keep text parallel to the camera',
    'Avoid glare and shadows',
    'For printed text, use high contrast',
    'Clean the camera lens'
  ]);

  // Initialize voice commands
  useEffect(() => {
    const componentAPI = {
      handleBackToDashboard,
      handleLogout,
      startCamera,
      stopCamera,
      captureFromCamera,
      isCameraActive,
      triggerFileUpload,
      performOCR: (imageData) => performOCR(imageData || image),
      image,
      clearResults,
      copyToClipboard,
      extractedText,
      totalWords,
      totalChars,
      isLoading,
      setImage,
      setExtractedText,
      setShowResults,
      setTotalWords,
      setTotalChars,
      setDetectionStatus
    };

    voiceCommandsRef.current = initializeOCRVoiceCommands(componentAPI);

    return () => {
      if (voiceCommandsRef.current) {
        voiceCommandsRef.current.cleanup();
      }
    };
  }, [
    image, 
    extractedText, 
    isLoading, 
    isCameraActive, 
    totalWords, 
    totalChars,
    startCamera,
    stopCamera,
    captureFromCamera,
    performOCR,
    clearResults,
    copyToClipboard,
    handleBackToDashboard,
    handleLogout,
    triggerFileUpload
  ]);

  // Clean up camera on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  return (
    <div className="ocr-scanner-container">
      {/* Fixed Header */}
      <header className="dashboard-header fixed-header">
        <div className="header-content">
          <div className="header-left">
            <button className="back-btn" onClick={handleBackToDashboard}>
              ← Back to Dashboard
            </button>
            <h1 className="logo">Vision Assist</h1>
          </div>
          <div className="user-menu">
            <button 
              className="logout-btn" 
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="ocr-content">
        {/* Main Content Grid */}
        <div className="ocr-grid">
          {/* Left Column - Camera/Upload */}
          <div className="camera-column">
            <div className="camera-card">
              <h2 className="section-title">📷 Text Scanner</h2>
              
              {/* OCR Tips */}
              {/* <div className="ocr-tips">
                <h4>📝 Tips for better OCR:</h4>
                <ul>
                  {ocrTips.map((tip, index) => (
                    <li key={index}>{tip}</li>
                  ))}
                </ul>
              </div> */}

              {/* Camera Status */}
              <div className="camera-status">
                <div className={`status-indicator ${isCameraActive ? 'active' : 'inactive'}`}>
                  <span className="status-dot"></span>
                  {isCameraActive ? 'Camera Active' : 'Camera Inactive'}
                </div>
                <p className="status-message">
                  {detectionStatus}
                </p>
              </div>

              {/* Mode Selection */}
              <div className="mode-selection">
                <button 
                  className={`mode-btn ${isCameraActive ? 'active' : ''}`}
                  onClick={startCamera}
                >
                  📷 Camera Mode
                </button>
                <button 
                  className={`mode-btn ${image && !isCameraActive ? 'active' : ''}`}
                  onClick={triggerFileUpload}
                >
                  📁 Upload Image
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*"
                  style={{ display: 'none' }}
                />
              </div>

              {/* Camera/Upload Container */}
              <div className="camera-upload-container">
                {image ? (
                  <div className="image-preview-container">
                    <div className="image-preview">
                      <img src={image} alt="Captured" className="preview-image" />
                      <div className="image-overlay">
                        <span className="overlay-text">Captured Image</span>
                      </div>
                    </div>
                    <button 
                      className="btn change-image-btn"
                      onClick={() => setImage(null)}
                    >
                      Change Image
                    </button>
                  </div>
                ) : showWebcam && isCameraActive ? (
                  <div className="camera-container">
                    <div className="webcam-wrapper">
                      <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        videoConstraints={videoConstraints}
                        className="webcam-preview"
                      />
                      <div className="webcam-overlay">
                        <div className="scan-line"></div>
                        <div className="corner-tl"></div>
                        <div className="corner-tr"></div>
                        <div className="corner-bl"></div>
                        <div className="corner-br"></div>
                      </div>
                    </div>
                    <p className="camera-hint">Center text within the frame for best results</p>
                  </div>
                ) : (
                  <div className="upload-dropzone" onClick={triggerFileUpload}>
                    <div className="upload-icon">📁</div>
                    <p>Click to upload image</p>
                    <p className="upload-hint">or use camera mode</p>
                  </div>
                )}
              </div>

              {/* Camera Controls */}
              <div className="camera-controls">
                {isCameraActive && (
                  <>
                    <button 
                      className="btn btn-danger"
                      onClick={stopCamera}
                    >
                      Stop Camera
                    </button>
                    <button 
                      className="btn btn-secondary"
                      onClick={captureFromCamera}
                      disabled={isLoading}
                    >
                      {isLoading ? 'Analyzing...' : 'Capture & Analyze'}
                    </button>
                  </>
                )}
                
                {image && !isCameraActive && (
                  <button 
                    className="btn btn-secondary"
                    onClick={() => performOCR(image)}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Analyzing...' : 'Analyze Text'}
                  </button>
                )}
                
                <button 
                  className="btn btn-outline"
                  onClick={clearResults}
                  disabled={!image && !extractedText && !isCameraActive}
                >
                  Clear All
                </button>
              </div>
            </div>

            {/* Control Panel */}
            <div className="control-panel">
              <h3 className="panel-title">Quick Controls</h3>
              <div className="control-buttons">
                <button 
                  className="btn control-btn"
                  onClick={isCameraActive ? stopCamera : startCamera}
                >
                  {isCameraActive ? '📷 Stop Camera' : '📷 Start Camera'}
                </button>
                
                <button 
                  className="btn control-btn"
                  onClick={image ? () => performOCR(image) : triggerFileUpload}
                  disabled={isLoading || (isCameraActive && !image)}
                >
                  {isLoading ? '⏳ Analyzing...' : '🔍 Analyze Text'}
                </button>
                
                <button 
                  className="btn control-btn"
                  onClick={triggerFileUpload}
                  disabled={isCameraActive}
                >
                  📁 Upload Image
                </button>
                
                <button 
                  className="btn control-btn clear-btn"
                  onClick={clearResults}
                  disabled={!image && !extractedText && !isCameraActive}
                >
                  🗑️ Clear All
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Results */}
          <div className="results-column">
            <div className="results-card">
              <h2 className="section-title">📝 Detection Results</h2>
              
              {/* Stats */}
              <div className="stats-grid">
                <div className="stat-item">
                  <span className="stat-label">Words</span>
                  <span className="stat-value">{totalWords}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Characters</span>
                  <span className="stat-value">{totalChars}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Status</span>
                  <span className={`stat-value status-text ${extractedText ? 'success' : isLoading ? 'processing' : 'idle'}`}>
                    {extractedText ? '✅ Detected' : isLoading ? '⏳ Processing' : '🟢 Ready'}
                  </span>
                </div>
              </div>

              {/* Detection Status */}
              <div className="detection-status">
                <h4>Text Detection</h4>
                <p className="status-message">{detectionStatus}</p>
                
                {!showResults && !isLoading && (
                  <div className="empty-state">
                    <div className="empty-icon">🔍</div>
                    <p>No text detected yet</p>
                    <p className="empty-subtext">Start camera or upload an image</p>
                  </div>
                )}
              </div>

              {/* Extracted Text Display */}
              {showResults && extractedText && (
                <div className="extracted-text-section">
                  <div className="section-header">
                    <h4>Extracted Text</h4>
                    <div className="action-buttons">
                      <button 
                        className="btn copy-btn"
                        onClick={copyToClipboard}
                        title="Copy to clipboard"
                      >
                        📋 Copy
                      </button>
                    </div>
                  </div>
                  
                  <div className="text-output-container">
                    <textarea
                      ref={textAreaRef}
                      value={extractedText}
                      readOnly
                      className="text-output"
                      rows="12"
                      placeholder="Extracted text will appear here..."
                    />
                  </div>
                  
                  <div className="text-actions">
                    <button 
                      className="btn action-btn"
                      onClick={() => {
                        const blob = new Blob([extractedText], { type: 'text/plain' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = `extracted-text-${new Date().toISOString().slice(0,10)}.txt`;
                        a.click();
                        URL.revokeObjectURL(url);
                      }}
                    >
                      📥 Download TXT
                    </button>
                    <button 
                      className="btn action-btn clear-text-btn"
                      onClick={() => {
                        setExtractedText('');
                        setShowResults(false);
                        setTotalWords(0);
                        setTotalChars(0);
                      }}
                    >
                      🗑️ Clear Text
                    </button>
                  </div>
                </div>
              )}

              {/* Progress Bar */}
              {isLoading && (
                <div className="progress-section">
                  <div className="progress-header">
                    <h4>Processing Image</h4>
                    <span className="progress-percent">{progress}%</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <p className="progress-text">Analyzing text in image...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="status-bar">
        <p>
          {isLoading ? '🔄 Analyzing text...' : 
           extractedText ? `✅ Detected ${totalWords} words, ${totalChars} characters` : 
           isCameraActive ? '📷 Camera active - Ready to capture' :
           '🟢 Ready to scan text'}
        </p>
      </div>
    </div>
  );
};

export default OCRScanner;