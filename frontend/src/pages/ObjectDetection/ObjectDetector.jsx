


// // // src/pages/ObjectDetector/ObjectDetector.jsx
// // import React, { useState, useRef, useEffect } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import * as cocoSsd from '@tensorflow-models/coco-ssd';
// // import '@tensorflow/tfjs';
// // import './ObjectDetector.css';

// // function speak(text) {
// //   if ('speechSynthesis' in window) {
// //     window.speechSynthesis.cancel();
// //     const utter = new SpeechSynthesisUtterance(text);
// //     utter.rate = 0.8;
// //     window.speechSynthesis.speak(utter);
// //   }
// // }

// // export default function ObjectDetector() {
// //   const navigate = useNavigate();
// //   const [loading, setLoading] = useState(true);
// //   const [model, setModel] = useState(null);
// //   const [predictions, setPredictions] = useState([]);
// //   const [isDetecting, setIsDetecting] = useState(false);
// //   const [cameraActive, setCameraActive] = useState(false);
// //   const [realTimeActive, setRealTimeActive] = useState(false);
// //   const [error, setError] = useState('');
// //   const [imagePreview, setImagePreview] = useState(null);
// //   const [detectionHistory, setDetectionHistory] = useState([]);
// //   const [fps, setFps] = useState(0);
// //   const [detectionCount, setDetectionCount] = useState(0);
// //   const [cameraPermission, setCameraPermission] = useState(null);

// //   const videoRef = useRef(null);
// //   const canvasRef = useRef(null);
// //   const fileInputRef = useRef(null);
// //   const streamRef = useRef(null);
// //   const lastFrameTimeRef = useRef(0);
// //   const frameCountRef = useRef(0);
// //   const animationFrameRef = useRef(null);

// //   // Load COCO-SSD model
// //   useEffect(() => {
// //     async function loadModel() {
// //       try {
// //         setLoading(true);
// //         setError('');
        
// //         console.log('Loading TensorFlow.js model...');
// //         const loadedModel = await cocoSsd.load();
// //         setModel(loadedModel);
        
// //         console.log('Model loaded successfully');
// //         speak('Object detection model loaded successfully');
// //       } catch (err) {
// //         console.error('Failed to load model:', err);
// //         setError('Failed to load object detection model. Please refresh the page.');
// //         speak('Failed to load object detection model');
// //       } finally {
// //         setLoading(false);
// //       }
// //     }

// //     loadModel();

// //     // Cleanup on unmount
// //     return () => {
// //       cleanupEverything();
// //     };
// //   }, []);

// //   // Cleanup everything
// //   const cleanupEverything = () => {
// //     console.log('Cleaning up all resources...');
    
// //     // Stop animation frame
// //     if (animationFrameRef.current) {
// //       cancelAnimationFrame(animationFrameRef.current);
// //       animationFrameRef.current = null;
// //     }
    
// //     // Stop camera stream
// //     if (streamRef.current) {
// //       streamRef.current.getTracks().forEach(track => {
// //         console.log('Stopping track:', track.kind);
// //         track.stop();
// //       });
// //       streamRef.current = null;
// //     }
    
// //     // Clear video source
// //     if (videoRef.current) {
// //       videoRef.current.srcObject = null;
// //     }
    
// //     // Reset states
// //     setCameraActive(false);
// //     setRealTimeActive(false);
// //     setIsDetecting(false);
// //     setFps(0);
// //   };

// //   // Start camera - SIMPLIFIED VERSION
// //   const startCamera = async () => {
// //     try {
// //       setError('');
// //       setImagePreview(null);
// //       setPredictions([]);
// //       setRealTimeActive(false);
// //       setDetectionCount(0);

// //       if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
// //         throw new Error('Camera not supported on this device');
// //       }

// //       // Check if we already have camera access
// //       if (cameraActive) {
// //         console.log('Camera already active, stopping...');
// //         stopCameraOnly();
// //         return;
// //       }

// //       console.log('Requesting camera access...');
      
// //       // Use simpler constraints
// //       const constraints = {
// //         video: {
// //           facingMode: 'environment',
// //           width: { ideal: 640 },
// //           height: { ideal: 480 }
// //         },
// //         audio: false
// //       };

// //       const stream = await navigator.mediaDevices.getUserMedia(constraints);
// //       console.log('Camera access granted');
      
// //       streamRef.current = stream;
// //       setCameraPermission('granted');
      
// //       if (videoRef.current) {
// //         // Set srcObject and wait for it to load
// //         videoRef.current.srcObject = stream;
        
// //         // Wait for video to be ready
// //         videoRef.current.onloadedmetadata = () => {
// //           console.log('Video metadata loaded, starting playback...');
          
// //           // Set video dimensions
// //           videoRef.current.width = videoRef.current.videoWidth;
// //           videoRef.current.height = videoRef.current.videoHeight;
          
// //           // Start playing
// //           videoRef.current.play()
// //             .then(() => {
// //               console.log('Video playback started successfully');
// //               setCameraActive(true);
              
// //               // Set canvas dimensions to match video
// //               if (canvasRef.current) {
// //                 canvasRef.current.width = videoRef.current.videoWidth;
// //                 canvasRef.current.height = videoRef.current.videoHeight;
// //               }
              
// //               speak('Camera started successfully. Point at objects to see detection.');
// //             })
// //             .catch(playErr => {
// //               console.error('Video play failed:', playErr);
// //               setError('Failed to start video playback: ' + playErr.message);
// //               cleanupEverything();
// //             });
// //         };
        
// //         // Handle video errors
// //         videoRef.current.onerror = (e) => {
// //           console.error('Video error:', e);
// //           setError('Video stream error');
// //           cleanupEverything();
// //         };
// //       }
// //     } catch (err) {
// //       console.error('Camera error:', err);
// //       setCameraPermission('denied');
      
// //       let errorMessage = 'Failed to access camera: ';
// //       if (err.name === 'NotAllowedError') {
// //         errorMessage = 'Camera permission denied. Please allow camera access in your browser settings.';
// //       } else if (err.name === 'NotFoundError') {
// //         errorMessage = 'No camera found on this device.';
// //       } else if (err.name === 'NotReadableError') {
// //         errorMessage = 'Camera is already in use by another application.';
// //       } else {
// //         errorMessage += err.message;
// //       }
      
// //       setError(errorMessage);
// //       speak('Failed to start camera');
// //     }
// //   };

// //   // Stop camera only
// //   const stopCameraOnly = () => {
// //     console.log('Stopping camera...');
    
// //     // Stop animation frame first
// //     if (animationFrameRef.current) {
// //       cancelAnimationFrame(animationFrameRef.current);
// //       animationFrameRef.current = null;
// //     }
    
// //     // Stop stream
// //     if (streamRef.current) {
// //       streamRef.current.getTracks().forEach(track => {
// //         track.stop();
// //       });
// //       streamRef.current = null;
// //     }
    
// //     // Clear video
// //     if (videoRef.current) {
// //       videoRef.current.srcObject = null;
// //     }
    
// //     setCameraActive(false);
// //     setRealTimeActive(false);
// //     setPredictions([]);
// //     setFps(0);
// //     speak('Camera stopped');
// //   };

// //   // Handle back to dashboard
// //   const handleBackToDashboard = () => {
// //     console.log('Going back to dashboard, cleaning up...');
// //     cleanupEverything();
// //     navigate('/dashboard');
// //   };

// //   // Handle file upload
// //   const handleFileUpload = (event) => {
// //     const file = event.target.files[0];
// //     if (!file) return;

// //     if (!file.type.match('image.*')) {
// //       setError('Please upload an image file (JPEG, PNG, GIF)');
// //       return;
// //     }

// //     // Stop camera if active
// //     if (cameraActive) {
// //       cleanupEverything();
// //     }

// //     setError('');
// //     const reader = new FileReader();
// //     reader.onload = (e) => {
// //       setImagePreview(e.target.result);
// //       detectObjectsInImage(e.target.result);
// //     };
// //     reader.readAsDataURL(file);
// //   };

// //   // Capture image from camera
// //   const captureImage = () => {
// //     if (!videoRef.current || !canvasRef.current || !cameraActive) {
// //       setError('Camera is not active');
// //       return;
// //     }

// //     const video = videoRef.current;
// //     const canvas = canvasRef.current;
// //     const context = canvas.getContext('2d');

// //     // Set canvas to match video
// //     canvas.width = video.videoWidth;
// //     canvas.height = video.videoHeight;

// //     // Draw video frame to canvas
// //     context.drawImage(video, 0, 0, canvas.width, canvas.height);

// //     // Get image data
// //     const imageData = canvas.toDataURL('image/jpeg');
// //     setImagePreview(imageData);
    
// //     // Detect objects
// //     detectObjectsInImage(imageData);
// //   };

// //   // Detect objects in image
// //   const detectObjectsInImage = async (imageSrc) => {
// //     if (!model) {
// //       setError('Model not loaded yet');
// //       return;
// //     }

// //     try {
// //       setIsDetecting(true);
// //       setError('');

// //       const img = new Image();
// //       img.onload = async () => {
// //         const predictions = await model.detect(img);
// //         const filteredPredictions = predictions.filter(p => p.score > 0.3);
        
// //         setPredictions(filteredPredictions);
// //         setDetectionCount(prev => prev + 1);
        
// //         if (filteredPredictions.length > 0) {
// //           const objectNames = filteredPredictions.map(p => p.class);
// //           const uniqueObjects = [...new Set(objectNames)];
// //           const speechText = `Detected ${uniqueObjects.length} object${uniqueObjects.length > 1 ? 's' : ''}: ${uniqueObjects.join(', ')}`;
// //           speak(speechText);
// //         }

// //         // Save to detection history
// //         const detectionData = {
// //           detected_objects: filteredPredictions.map(p => ({
// //             object: p.class,
// //             confidence: Math.round(p.score * 100),
// //             bbox: p.bbox
// //           })),
// //           timestamp: new Date().toISOString(),
// //           source: cameraActive ? 'camera' : 'upload'
// //         };

// //         setDetectionHistory(prev => [detectionData, ...prev.slice(0, 9)]);

// //         // Draw bounding boxes on canvas
// //         if (canvasRef.current) {
// //           const canvas = canvasRef.current;
// //           const ctx = canvas.getContext('2d');
          
// //           // Set canvas dimensions
// //           canvas.width = img.width;
// //           canvas.height = img.height;
          
// //           // Clear previous drawings
// //           ctx.clearRect(0, 0, canvas.width, canvas.height);
          
// //           // Draw the image
// //           ctx.drawImage(img, 0, 0);
          
// //           // Draw bounding boxes with labels
// //           filteredPredictions.forEach(prediction => {
// //             const [x, y, width, height] = prediction.bbox;
// //             const confidence = Math.round(prediction.score * 100);
            
// //             // Draw bounding box
// //             ctx.strokeStyle = '#00ff00';
// //             ctx.lineWidth = 3;
// //             ctx.strokeRect(x, y, width, height);
            
// //             // Draw label background
// //             ctx.fillStyle = '#00ff00';
// //             ctx.font = 'bold 16px Arial';
// //             const label = `${prediction.class} ${confidence}%`;
// //             const textWidth = ctx.measureText(label).width;
// //             ctx.fillRect(x, y - 25, textWidth + 10, 25);
            
// //             // Draw label text
// //             ctx.fillStyle = '#000000';
// //             ctx.fillText(label, x + 5, y - 7);
// //           });
// //         }

// //         setIsDetecting(false);
// //       };
      
// //       img.src = imageSrc;
// //     } catch (err) {
// //       console.error('Detection error:', err);
// //       setError('Failed to detect objects. Please try again.');
// //       speak('Failed to detect objects');
// //       setIsDetecting(false);
// //     }
// //   };

// //   // Real-time detection loop
// //   const detectRealTime = async () => {
// //     if (!cameraActive || !realTimeActive || !model || !videoRef.current) {
// //       return;
// //     }

// //     const video = videoRef.current;
    
// //     // Check if video is ready
// //     if (video.readyState !== 4 || video.videoWidth === 0) {
// //       // Try again in next frame
// //       animationFrameRef.current = requestAnimationFrame(detectRealTime);
// //       return;
// //     }

// //     try {
// //       // Update FPS counter
// //       frameCountRef.current++;
// //       const now = performance.now();
// //       const elapsed = now - lastFrameTimeRef.current;
      
// //       if (elapsed >= 1000) {
// //         setFps(Math.round((frameCountRef.current * 1000) / elapsed));
// //         frameCountRef.current = 0;
// //         lastFrameTimeRef.current = now;
// //       }

// //       // Detect objects in current video frame
// //       const predictions = await model.detect(video);
// //       const filteredPredictions = predictions.filter(p => p.score > 0.4);
      
// //       // Update predictions
// //       setPredictions(filteredPredictions);
      
// //       // Draw on canvas
// //       if (canvasRef.current) {
// //         const canvas = canvasRef.current;
// //         const ctx = canvas.getContext('2d');
        
// //         // Update canvas size to match video
// //         if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
// //           canvas.width = video.videoWidth;
// //           canvas.height = video.videoHeight;
// //         }
        
// //         // Clear previous drawings
// //         ctx.clearRect(0, 0, canvas.width, canvas.height);
        
// //         // Draw bounding boxes for detected objects
// //         filteredPredictions.forEach(prediction => {
// //           const [x, y, width, height] = prediction.bbox;
// //           const confidence = Math.round(prediction.score * 100);
          
// //           // Adjust for mirrored video (front camera)
// //           const mirroredX = canvas.width - x - width;
          
// //           // Draw bounding box
// //           ctx.strokeStyle = '#00ff00';
// //           ctx.lineWidth = 3;
// //           ctx.strokeRect(mirroredX, y, width, height);
          
// //           // Draw label background
// //           ctx.fillStyle = '#00ff00';
// //           ctx.font = 'bold 14px Arial';
// //           const label = `${prediction.class} ${confidence}%`;
// //           const textWidth = ctx.measureText(label).width;
// //           ctx.fillRect(mirroredX, y - 20, textWidth + 10, 20);
          
// //           // Draw label text
// //           ctx.fillStyle = '#000000';
// //           ctx.fillText(label, mirroredX + 5, y - 5);
// //         });
// //       }

// //       // Occasionally speak results (not too frequently)
// //       if (filteredPredictions.length > 0 && Math.random() < 0.1) {
// //         const objectNames = filteredPredictions.map(p => p.class);
// //         const uniqueObjects = [...new Set(objectNames)];
// //         if (uniqueObjects.length <= 3) {
// //           speak(`Detecting ${uniqueObjects.join(', ')}`);
// //         }
// //       }

// //     } catch (err) {
// //       console.error('Real-time detection error:', err);
// //     }

// //     // Continue detection loop
// //     if (realTimeActive) {
// //       animationFrameRef.current = requestAnimationFrame(detectRealTime);
// //     }
// //   };

// //   // Start real-time detection
// //   const startRealTimeDetection = async () => {
// //     if (!cameraActive) {
// //       setError('Please start camera first');
// //       speak('Please start camera first');
// //       return;
// //     }

// //     if (realTimeActive) {
// //       stopRealTimeDetection();
// //       return;
// //     }

// //     console.log('Starting real-time detection');
// //     setRealTimeActive(true);
// //     speak('Starting real-time object detection');
    
// //     // Reset FPS counter
// //     lastFrameTimeRef.current = performance.now();
// //     frameCountRef.current = 0;
    
// //     // Start detection loop
// //     detectRealTime();
// //   };

// //   // Stop real-time detection
// //   const stopRealTimeDetection = () => {
// //     console.log('Stopping real-time detection');
// //     setRealTimeActive(false);
// //     if (animationFrameRef.current) {
// //       cancelAnimationFrame(animationFrameRef.current);
// //       animationFrameRef.current = null;
// //     }
// //     speak('Real-time detection stopped');
// //   };

// //   const clearDetection = () => {
// //     setImagePreview(null);
// //     setPredictions([]);
// //     stopRealTimeDetection();
// //     if (canvasRef.current) {
// //       const ctx = canvasRef.current.getContext('2d');
// //       ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
// //     }
// //   };

// //   const formatConfidence = (score) => {
// //     return `${Math.round(score * 100)}%`;
// //   };

// //   // Camera permission status
// //   const renderCameraPermission = () => {
// //     if (cameraPermission === 'denied') {
// //       return (
// //         <div className="permission-warning">
// //           <p>⚠️ Camera access denied. Please allow camera access in your browser settings.</p>
// //           <button 
// //             onClick={() => window.location.reload()}
// //             className="retry-btn"
// //           >
// //             Retry Camera
// //           </button>
// //         </div>
// //       );
// //     }
// //     return null;
// //   };

// //   if (loading) {
// //     return (
// //       <div className="detector-loading">
// //         <div className="loading-spinner"></div>
// //         <p>Loading object detection model...</p>
// //         <p className="loading-subtext">This may take a moment on first use</p>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="object-detector-container">
// //       <div className="detector-header">
// //         <button className="back-button" onClick={handleBackToDashboard}>
// //           ← Back to Dashboard
// //         </button>
// //         <h1>🔍 Object Detector</h1>
// //         <p>Live camera feed with real-time object detection</p>
// //       </div>

// //       {renderCameraPermission()}

// //       {error && (
// //         <div className="error-message">
// //           <span className="error-icon">⚠️</span>
// //           {error}
// //         </div>
// //       )}

// //       <div className="detector-main">
// //         {/* CCTV Camera View */}
// //         <div className="cctv-section">
// //           <div className="cctv-header">
// //             <h3>📹 Live Camera Feed</h3>
// //             <div className="cctv-stats">
// //               {cameraActive && (
// //                 <>
// //                   <span className="stat-badge">🎥 LIVE</span>
// //                   {realTimeActive && <span className="stat-badge active">🔴 DETECTING</span>}
// //                   <span className="stat-badge">🔄 {fps} FPS</span>
// //                   <span className="stat-badge">🎯 {detectionCount}</span>
// //                 </>
// //               )}
// //             </div>
// //           </div>
          
// //           <div className="cctv-view">
// //             <div className="cctv-frame">
// //               <div className="cctv-corners">
// //                 <div className="corner top-left"></div>
// //                 <div className="corner top-right"></div>
// //                 <div className="corner bottom-left"></div>
// //                 <div className="corner bottom-right"></div>
// //               </div>
              
// //               {cameraActive ? (
// //                 <div className="live-feed-container">
// //                   <div className="cctv-overlay">
// //                     <div className="timestamp">
// //                       {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'})}
// //                     </div>
// //                     <div className="location-tag">📡 LIVE FEED</div>
// //                     {realTimeActive && <div className="recording-indicator">● REC</div>}
// //                   </div>
                  
// //                   <video
// //                     ref={videoRef}
// //                     autoPlay
// //                     playsInline
// //                     muted
// //                     className="cctv-video"
// //                     style={{ 
// //                       display: 'block',
// //                       width: '100%',
// //                       height: '100%',
// //                       objectFit: 'cover',
// //                       transform: 'scaleX(-1)' // Mirror for front camera
// //                     }}
// //                   />
// //                   <canvas
// //                     ref={canvasRef}
// //                     className="detection-overlay"
// //                     style={{
// //                       position: 'absolute',
// //                       top: 0,
// //                       left: 0,
// //                       width: '100%',
// //                       height: '100%',
// //                       pointerEvents: 'none'
// //                     }}
// //                   />
// //                 </div>
// //               ) : imagePreview ? (
// //                 <div className="image-review">
// //                   <img src={imagePreview} alt="Detected" className="review-image" />
// //                   <canvas ref={canvasRef} className="detection-overlay" />
// //                 </div>
// //               ) : (
// //                 <div className="cctv-placeholder">
// //                   <div className="placeholder-icon">📷</div>
// //                   <p>Camera Feed Inactive</p>
// //                   <p className="placeholder-subtext">Click "Start Camera" to begin</p>
// //                 </div>
// //               )}
// //             </div>

// //             {/* Camera Controls */}
// //             <div className="camera-control-panel">
// //               <div className="control-row">
// //                 <button
// //                   onClick={startCamera}
// //                   disabled={isDetecting}
// //                   className={`control-btn ${cameraActive ? 'camera-active' : 'camera-start'}`}
// //                 >
// //                   {cameraActive ? '📹 Camera Active' : '🎥 Start Camera'}
// //                 </button>
                
// //                 {cameraActive && (
// //                   <button
// //                     onClick={stopCameraOnly}
// //                     className="control-btn camera-stop"
// //                   >
// //                     🛑 Stop Camera
// //                   </button>
// //                 )}
// //               </div>
              
// //               <div className="control-row">
// //                 <button
// //                   onClick={startRealTimeDetection}
// //                   disabled={!cameraActive || isDetecting}
// //                   className={`control-btn ${realTimeActive ? 'realtime-active' : 'realtime-start'}`}
// //                 >
// //                   {realTimeActive ? '⏸️ Stop Detection' : '🔴 Live Detection'}
// //                 </button>
                
// //                 <button
// //                   onClick={captureImage}
// //                   disabled={!cameraActive || realTimeActive || isDetecting}
// //                   className="control-btn capture-btn"
// //                 >
// //                   📸 Capture & Analyze
// //                 </button>
// //               </div>
              
// //               <div className="control-row">
// //                 <button
// //                   onClick={() => fileInputRef.current?.click()}
// //                   disabled={cameraActive || realTimeActive || isDetecting}
// //                   className="control-btn upload-btn"
// //                 >
// //                   📁 Upload Image
// //                 </button>
                
// //                 <input
// //                   ref={fileInputRef}
// //                   type="file"
// //                   accept="image/*"
// //                   onChange={handleFileUpload}
// //                   style={{ display: 'none' }}
// //                 />
                
// //                 <button
// //                   onClick={clearDetection}
// //                   disabled={(!imagePreview && !cameraActive) || realTimeActive || isDetecting}
// //                   className="control-btn clear-btn"
// //                 >
// //                   🗑️ Clear Results
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Results Panel */}
// //         <div className="results-panel">
// //           <div className="results-header">
// //             <h3>📊 Detection Results</h3>
// //             <div className="results-stats">
// //               <span className="result-count">
// //                 Objects: <strong>{predictions.length}</strong>
// //               </span>
// //               {realTimeActive && <span className="live-badge">🔴 LIVE</span>}
// //             </div>
// //           </div>

// //           <div className="results-content">
// //             {isDetecting ? (
// //               <div className="detecting-state">
// //                 <div className="detecting-spinner"></div>
// //                 <p>Analyzing image...</p>
// //               </div>
// //             ) : predictions.length > 0 ? (
// //               <>
// //                 <div className="objects-grid">
// //                   {predictions.map((pred, index) => (
// //                     <div key={index} className="object-card">
// //                       <div className="object-header">
// //                         <span className="object-icon">🎯</span>
// //                         <span className="object-name">{pred.class}</span>
// //                         <span className="object-confidence">
// //                           {formatConfidence(pred.score)}
// //                         </span>
// //                       </div>
// //                       <div className="object-details">
// //                         <div className="detail">
// //                           <span className="detail-label">Confidence:</span>
// //                           <span className="detail-value">
// //                             {formatConfidence(pred.score)}
// //                           </span>
// //                         </div>
// //                         <div className="detail">
// //                           <span className="detail-label">Size:</span>
// //                           <span className="detail-value">
// //                             {Math.round(pred.bbox[2])}×{Math.round(pred.bbox[3])}px
// //                           </span>
// //                         </div>
// //                       </div>
// //                       <button
// //                         onClick={() => speak(`${pred.class} detected with ${formatConfidence(pred.score)} confidence`)}
// //                         className="speak-btn"
// //                       >
// //                         🔊 Speak
// //                       </button>
// //                     </div>
// //                   ))}
// //                 </div>
                
// //                 <div className="results-summary">
// //                   <button
// //                     onClick={() => {
// //                       const objectNames = predictions.map(p => p.class);
// //                       const uniqueObjects = [...new Set(objectNames)];
// //                       speak(`Found ${predictions.length} objects: ${uniqueObjects.join(', ')}`);
// //                     }}
// //                     className="summary-speak-btn"
// //                   >
// //                     🔊 Announce Results
// //                   </button>
// //                 </div>
// //               </>
// //             ) : (
// //               <div className="no-results">
// //                 <div className="no-results-icon">🔍</div>
// //                 <p>No objects detected yet</p>
// //                 <p className="no-results-hint">
// //                   {cameraActive
// //                     ? realTimeActive
// //                       ? 'Point camera at objects to see detection'
// //                       : 'Click "Live Detection" for real-time or "Capture & Analyze"'
// //                     : 'Start camera or upload an image'
// //                   }
// //                 </p>
// //               </div>
// //             )}
// //           </div>

// //           {/* Detection History */}
// //           {detectionHistory.length > 0 && (
// //             <div className="history-section">
// //               <h4>📜 Recent Detections</h4>
// //               <div className="history-list">
// //                 {detectionHistory.slice(0, 5).map((item, index) => (
// //                   <div key={index} className="history-item">
// //                     <div className="history-time">
// //                       {new Date(item.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
// //                     </div>
// //                     <div className="history-objects">
// //                       {item.detected_objects.slice(0, 2).map((obj, idx) => (
// //                         <span key={idx} className="history-tag">
// //                           {obj.object} ({obj.confidence}%)
// //                         </span>
// //                       ))}
// //                       {item.detected_objects.length > 2 && (
// //                         <span className="history-more">
// //                           +{item.detected_objects.length - 2}
// //                         </span>
// //                       )}
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>
// //           )}
// //         </div>
// //       </div>

// //       {/* Quick Guide */}
// //       <div className="quick-guide">
// //         <h3>🚀 Quick Start Guide:</h3>
// //         <div className="guide-steps">
// //           <div className="guide-step">
// //             <div className="step-icon">1️⃣</div>
// //             <p><strong>Start Camera</strong> - Click the "Start Camera" button</p>
// //           </div>
// //           <div className="guide-step">
// //             <div className="step-icon">2️⃣</div>
// //             <p><strong>Live Detection</strong> - Click "Live Detection" for real-time</p>
// //           </div>
// //           <div className="guide-step">
// //             <div className="step-icon">3️⃣</div>
// //             <p><strong>Point & Detect</strong> - Point camera at objects to see boxes</p>
// //           </div>
// //           <div className="guide-step">
// //             <div className="step-icon">4️⃣</div>
// //             <p><strong>View Results</strong> - See detected objects with confidence</p>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }



// // src/pages/ObjectDetector/ObjectDetector.jsx
// import React, { useState, useRef, useEffect, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Webcam from 'react-webcam';
// import * as cocoSsd from '@tensorflow-models/coco-ssd';
// import '@tensorflow/tfjs';
// import './ObjectDetector.css';
// import { voiceService } from '../../services/voiceService';

// function speak(text) {
//   if ('speechSynthesis' in window) {
//     window.speechSynthesis.cancel();
//     const utter = new SpeechSynthesisUtterance(text);
//     utter.rate = 0.8;
//     window.speechSynthesis.speak(utter);
//   }
// }

// export default function ObjectDetector() {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);
//   const [model, setModel] = useState(null);
//   const [predictions, setPredictions] = useState([]);
//   const [isDetecting, setIsDetecting] = useState(false);
//   const [cameraActive, setCameraActive] = useState(false);
//   const [realTimeActive, setRealTimeActive] = useState(false);
//   const [error, setError] = useState('');
//   const [imagePreview, setImagePreview] = useState(null);
//   const [detectionHistory, setDetectionHistory] = useState([]);
//   const [fps, setFps] = useState(0);
//   const [detectionCount, setDetectionCount] = useState(0);
//   const [cameraPermission, setCameraPermission] = useState(null);
  
//   // Voice control states
//   const [voiceActive, setVoiceActive] = useState(false);
//   const [lastVoiceCommand, setLastVoiceCommand] = useState('');

//   // Refs
//   const webcamRef = useRef(null);
//   const canvasRef = useRef(null);
//   const fileInputRef = useRef(null);
//   const animationFrameRef = useRef(null);
//   const lastFrameTimeRef = useRef(0);
//   const frameCountRef = useRef(0);

//   // Video constraints
//   const videoConstraints = {
//     facingMode: "environment",
//     width: { ideal: 640 },
//     height: { ideal: 480 }
//   };

//   // Load COCO-SSD model
//   useEffect(() => {
//     async function loadModel() {
//       try {
//         setLoading(true);
//         setError('');
        
//         console.log('Loading TensorFlow.js model...');
//         const loadedModel = await cocoSsd.load();
//         setModel(loadedModel);
        
//         console.log('Model loaded successfully');
//         voiceService.speak('Object detection model loaded successfully');
//       } catch (err) {
//         console.error('Failed to load model:', err);
//         setError('Failed to load object detection model. Please refresh the page.');
//         voiceService.speak('Failed to load object detection model');
//       } finally {
//         setLoading(false);
//       }
//     }

//     loadModel();

//     // Cleanup on unmount
//     return () => {
//       cleanupEverything();
//     };
//   }, []);

//   // Voice command setup
//   useEffect(() => {
//     if (!voiceService.recognition) {
//       console.log('Speech recognition not available in this browser');
//       return;
//     }

//     // Register object detector specific commands
//     const commands = {
//       'start camera': () => {
//         console.log('Voice command: start camera');
//         startCamera();
//         voiceService.speak('Starting camera');
//       },
//       'stop camera': () => {
//         console.log('Voice command: stop camera');
//         stopCameraOnly();
//         voiceService.speak('Camera stopped');
//       },
//       'detect objects': () => {
//         if (cameraActive) {
//           startRealTimeDetection();
//           voiceService.speak('Starting object detection');
//         } else {
//           voiceService.speak('Start camera first for detection');
//         }
//       },
//       'stop detection': () => {
//         stopRealTimeDetection();
//         voiceService.speak('Detection stopped');
//       },
//       'capture image': () => {
//         if (cameraActive) {
//           captureImage();
//           voiceService.speak('Image captured');
//         }
//       },
//       'upload image': () => {
//         fileInputRef.current?.click();
//         voiceService.speak('Select an image to upload');
//       },
//       'clear results': () => {
//         clearDetection();
//         voiceService.speak('Results cleared');
//       },
//       'go back': () => {
//         handleBackToDashboard();
//       },
//       'what do you see': () => {
//         if (predictions.length > 0) {
//           const objects = predictions.map(p => p.class);
//           const unique = [...new Set(objects)];
//           voiceService.speak(`I see ${unique.length} objects: ${unique.join(', ')}`);
//         } else if (cameraActive) {
//           voiceService.speak('Camera is active but no objects detected yet');
//         } else {
//           voiceService.speak('Camera is not active');
//         }
//       },
//       'help': () => {
//         const helpText = 'Available commands: start camera, stop camera, detect objects, capture image, upload image, clear results, what do you see, go back';
//         voiceService.speak(helpText);
//       },
//     };

//     // Register all commands
//     Object.entries(commands).forEach(([pattern, handler]) => {
//       voiceService.registerCommand(pattern, (command) => {
//         setLastVoiceCommand(command);
//         handler();
//       });
//     });

//     // Handle voice recognition results
//     voiceService.onResultCallback = (transcript) => {
//       console.log('Voice command received:', transcript);
//       setLastVoiceCommand(transcript);
      
//       setTimeout(() => {
//         setLastVoiceCommand('');
//       }, 5000);
//     };

//     return () => {
//       voiceService.onResultCallback = null;
//     };
//   }, [cameraActive, predictions, navigate]);

//   // Cleanup everything
//   const cleanupEverything = () => {
//     console.log('Cleaning up all resources...');
    
//     if (animationFrameRef.current) {
//       cancelAnimationFrame(animationFrameRef.current);
//       animationFrameRef.current = null;
//     }
    
//     if (voiceActive) {
//       voiceService.stopListening();
//       setVoiceActive(false);
//     }
    
//     setCameraActive(false);
//     setRealTimeActive(false);
//     setIsDetecting(false);
//     setFps(0);
//   };

//   // Start camera - SIMPLIFIED with React-Webcam
//   const startCamera = () => {
//     setError('');
//     setImagePreview(null);
//     setPredictions([]);
//     setRealTimeActive(false);
//     setDetectionCount(0);
//     setCameraActive(true);
//     setCameraPermission('granted');
//     voiceService.speak('Camera started successfully');
//   };

//   // Stop camera only
//   const stopCameraOnly = () => {
//     console.log('Stopping camera...');
    
//     if (animationFrameRef.current) {
//       cancelAnimationFrame(animationFrameRef.current);
//       animationFrameRef.current = null;
//     }
    
//     setCameraActive(false);
//     setRealTimeActive(false);
//     setPredictions([]);
//     setFps(0);
//     voiceService.speak('Camera stopped');
//   };

//   // Handle back to dashboard
//   const handleBackToDashboard = () => {
//     console.log('Going back to dashboard, cleaning up...');
//     cleanupEverything();
//     navigate('/dashboard');
//   };

//   // Handle file upload
//   const handleFileUpload = (event) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     if (!file.type.match('image.*')) {
//       setError('Please upload an image file (JPEG, PNG, GIF)');
//       return;
//     }

//     // Stop camera if active
//     if (cameraActive) {
//       cleanupEverything();
//     }

//     setError('');
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       setImagePreview(e.target.result);
//       detectObjectsInImage(e.target.result);
//     };
//     reader.readAsDataURL(file);
//   };

//   // Capture image from camera
//   const captureImage = useCallback(() => {
//     if (!webcamRef.current || !cameraActive) {
//       setError('Camera is not active');
//       return;
//     }

//     const screenshot = webcamRef.current.getScreenshot();
//     if (screenshot) {
//       setImagePreview(screenshot);
//       detectObjectsInImage(screenshot);
//     }
//   }, [cameraActive]);

//   // Detect objects in image
//   const detectObjectsInImage = async (imageSrc) => {
//     if (!model) {
//       setError('Model not loaded yet');
//       return;
//     }

//     try {
//       setIsDetecting(true);
//       setError('');

//       const img = new Image();
//       img.onload = async () => {
//         const predictions = await model.detect(img);
//         const filteredPredictions = predictions.filter(p => p.score > 0.3);
        
//         setPredictions(filteredPredictions);
//         setDetectionCount(prev => prev + 1);
        
//         if (filteredPredictions.length > 0) {
//           const objectNames = filteredPredictions.map(p => p.class);
//           const uniqueObjects = [...new Set(objectNames)];
//           const speechText = `Detected ${uniqueObjects.length} object${uniqueObjects.length > 1 ? 's' : ''}: ${uniqueObjects.join(', ')}`;
//           voiceService.speak(speechText);
//         }

//         // Save to detection history
//         const detectionData = {
//           detected_objects: filteredPredictions.map(p => ({
//             object: p.class,
//             confidence: Math.round(p.score * 100),
//             bbox: p.bbox
//           })),
//           timestamp: new Date().toISOString(),
//           source: cameraActive ? 'camera' : 'upload'
//         };

//         setDetectionHistory(prev => [detectionData, ...prev.slice(0, 9)]);

//         // Draw bounding boxes on canvas
//         if (canvasRef.current) {
//           const canvas = canvasRef.current;
//           const ctx = canvas.getContext('2d');
          
//           // Set canvas dimensions
//           canvas.width = img.width;
//           canvas.height = img.height;
          
//           // Clear previous drawings
//           ctx.clearRect(0, 0, canvas.width, canvas.height);
          
//           // Draw the image
//           ctx.drawImage(img, 0, 0);
          
//           // Draw bounding boxes with labels
//           filteredPredictions.forEach(prediction => {
//             const [x, y, width, height] = prediction.bbox;
//             const confidence = Math.round(prediction.score * 100);
            
//             // Draw bounding box
//             ctx.strokeStyle = '#00ff00';
//             ctx.lineWidth = 3;
//             ctx.strokeRect(x, y, width, height);
            
//             // Draw label background
//             ctx.fillStyle = '#00ff00';
//             ctx.font = 'bold 16px Arial';
//             const label = `${prediction.class} ${confidence}%`;
//             const textWidth = ctx.measureText(label).width;
//             ctx.fillRect(x, y - 25, textWidth + 10, 25);
            
//             // Draw label text
//             ctx.fillStyle = '#000000';
//             ctx.fillText(label, x + 5, y - 7);
//           });
//         }

//         setIsDetecting(false);
//       };
      
//       img.src = imageSrc;
//     } catch (err) {
//       console.error('Detection error:', err);
//       setError('Failed to detect objects. Please try again.');
//       voiceService.speak('Failed to detect objects');
//       setIsDetecting(false);
//     }
//   };

//   // Real-time detection loop
//   const detectRealTime = useCallback(async () => {
//     if (!cameraActive || !realTimeActive || !model || !webcamRef.current) {
//       return;
//     }

//     const video = webcamRef.current.video;
    
//     if (!video || video.readyState !== 4 || video.videoWidth === 0) {
//       animationFrameRef.current = requestAnimationFrame(detectRealTime);
//       return;
//     }

//     try {
//       // Update FPS counter
//       frameCountRef.current++;
//       const now = performance.now();
//       const elapsed = now - lastFrameTimeRef.current;
      
//       if (elapsed >= 1000) {
//         setFps(Math.round((frameCountRef.current * 1000) / elapsed));
//         frameCountRef.current = 0;
//         lastFrameTimeRef.current = now;
//       }

//       // Detect objects in current video frame
//       const predictions = await model.detect(video);
//       const filteredPredictions = predictions.filter(p => p.score > 0.4);
      
//       // Update predictions
//       setPredictions(filteredPredictions);
      
//       // Draw on canvas
//       if (canvasRef.current) {
//         const canvas = canvasRef.current;
//         const ctx = canvas.getContext('2d');
        
//         // Update canvas size to match video
//         if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
//           canvas.width = video.videoWidth;
//           canvas.height = video.videoHeight;
//         }
        
//         // Clear previous drawings
//         ctx.clearRect(0, 0, canvas.width, canvas.height);
        
//         // Draw bounding boxes for detected objects
//         filteredPredictions.forEach(prediction => {
//           const [x, y, width, height] = prediction.bbox;
//           const confidence = Math.round(prediction.score * 100);
          
//           // Adjust for mirrored video (front camera)
//           const mirroredX = canvas.width - x - width;
          
//           // Draw bounding box
//           ctx.strokeStyle = '#00ff00';
//           ctx.lineWidth = 3;
//           ctx.strokeRect(mirroredX, y, width, height);
          
//           // Draw label background
//           ctx.fillStyle = '#00ff00';
//           ctx.font = 'bold 14px Arial';
//           const label = `${prediction.class} ${confidence}%`;
//           const textWidth = ctx.measureText(label).width;
//           ctx.fillRect(mirroredX, y - 20, textWidth + 10, 20);
          
//           // Draw label text
//           ctx.fillStyle = '#000000';
//           ctx.fillText(label, mirroredX + 5, y - 5);
//         });
//       }

//       // Occasionally speak results
//       if (filteredPredictions.length > 0 && Math.random() < 0.1) {
//         const objectNames = filteredPredictions.map(p => p.class);
//         const uniqueObjects = [...new Set(objectNames)];
//         if (uniqueObjects.length <= 3) {
//           voiceService.speak(`Detecting ${uniqueObjects.join(', ')}`);
//         }
//       }

//     } catch (err) {
//       console.error('Real-time detection error:', err);
//     }

//     // Continue detection loop
//     if (realTimeActive) {
//       animationFrameRef.current = requestAnimationFrame(detectRealTime);
//     }
//   }, [cameraActive, realTimeActive, model]);

//   // Start real-time detection
//   const startRealTimeDetection = () => {
//     if (!cameraActive) {
//       setError('Please start camera first');
//       voiceService.speak('Please start camera first');
//       return;
//     }

//     if (realTimeActive) {
//       stopRealTimeDetection();
//       return;
//     }

//     console.log('Starting real-time detection');
//     setRealTimeActive(true);
//     voiceService.speak('Starting real-time object detection');
    
//     // Reset FPS counter
//     lastFrameTimeRef.current = performance.now();
//     frameCountRef.current = 0;
    
//     // Start detection loop
//     detectRealTime();
//   };

//   // Stop real-time detection
//   const stopRealTimeDetection = () => {
//     console.log('Stopping real-time detection');
//     setRealTimeActive(false);
//     if (animationFrameRef.current) {
//       cancelAnimationFrame(animationFrameRef.current);
//       animationFrameRef.current = null;
//     }
//     voiceService.speak('Real-time detection stopped');
//   };

//   const clearDetection = () => {
//     setImagePreview(null);
//     setPredictions([]);
//     stopRealTimeDetection();
//     if (canvasRef.current) {
//       const ctx = canvasRef.current.getContext('2d');
//       ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
//     }
//   };

//   const formatConfidence = (score) => {
//     return `${Math.round(score * 100)}%`;
//   };

//   // Camera permission status
//   const renderCameraPermission = () => {
//     if (cameraPermission === 'denied') {
//       return (
//         <div className="permission-warning">
//           <p>⚠️ Camera access denied. Please allow camera access in your browser settings.</p>
//           <button 
//             onClick={() => window.location.reload()}
//             className="retry-btn"
//           >
//             Retry Camera
//           </button>
//         </div>
//       );
//     }
//     return null;
//   };

//   if (loading) {
//     return (
//       <div className="detector-loading">
//         <div className="loading-spinner"></div>
//         <p>Loading object detection model...</p>
//         <p className="loading-subtext">This may take a moment on first use</p>
//       </div>
//     );
//   }

//   return (
//     <div className="object-detector-container">
//       <div className="detector-header">
//         <button className="back-button" onClick={handleBackToDashboard}>
//           ← Back to Dashboard
//         </button>
//         <h1>🔍 Object Detector</h1>
//         <p>Live camera feed with real-time object detection</p>
//       </div>

//       {/* Voice Control Panel */}
//       <div className="voice-control-panel">
//         <div className="voice-control-header">
//           <h4>🎤 Voice Control</h4>
//           <div className="voice-status">
//             {voiceActive ? (
//               <span className="voice-active-indicator">● Listening...</span>
//             ) : (
//               <span className="voice-inactive">Voice commands available</span>
//             )}
//           </div>
//         </div>
        
//         <div className="voice-controls">
//           <button
//             onClick={() => {
//               if (voiceActive) {
//                 voiceService.stopListening();
//                 setVoiceActive(false);
//                 voiceService.speak('Voice control deactivated');
//               } else {
//                 voiceService.startListening();
//                 setVoiceActive(true);
//                 voiceService.speak('Voice control activated. Try saying "start camera" or "detect objects"');
//               }
//             }}
//             className={`voice-toggle-btn ${voiceActive ? 'voice-active' : ''}`}
//           >
//             {voiceActive ? '🛑 Stop Listening' : '🎤 Start Voice Control'}
//           </button>
          
//           <button
//             onClick={() => {
//               voiceService.speak(
//                 cameraActive 
//                   ? realTimeActive
//                     ? `Camera is active with real-time detection. ${predictions.length} objects detected.`
//                     : `Camera is active. ${predictions.length} objects in last detection.`
//                   : 'Camera is inactive. Say "start camera" to begin.'
//               );
//             }}
//             className="voice-status-btn"
//           >
//             🔊 Status Report
//           </button>
          
//           <button
//             onClick={() => {
//               voiceService.speak('Available commands: start camera, stop camera, detect objects, capture image, upload image, clear results, what do you see, go back');
//             }}
//             className="voice-help-btn"
//           >
//             ❓ Voice Help
//           </button>
//         </div>
        
//         {lastVoiceCommand && (
//           <div className="voice-command-feedback">
//             <div className="command-text">
//               <strong>Last command:</strong> "{lastVoiceCommand}"
//             </div>
//             <button 
//               onClick={() => setLastVoiceCommand('')}
//               className="clear-command-btn"
//             >
//               ✕
//             </button>
//           </div>
//         )}
        
//         <div className="voice-command-hints">
//           <p><strong>Try saying:</strong></p>
//           <div className="command-chips">
//             <span className="command-chip">"Start camera"</span>
//             <span className="command-chip">"Detect objects"</span>
//             <span className="command-chip">"Capture image"</span>
//             <span className="command-chip">"What do you see"</span>
//             <span className="command-chip">"Go back"</span>
//           </div>
//         </div>
//       </div>

//       {renderCameraPermission()}

//       {error && (
//         <div className="error-message">
//           <span className="error-icon">⚠️</span>
//           {error}
//         </div>
//       )}

//       <div className="detector-main">
//         {/* CCTV Camera View */}
//         <div className="cctv-section">
//           <div className="cctv-header">
//             <h3>📹 Live Camera Feed</h3>
//             <div className="cctv-stats">
//               {cameraActive && (
//                 <>
//                   <span className="stat-badge">🎥 LIVE</span>
//                   {realTimeActive && <span className="stat-badge active">🔴 DETECTING</span>}
//                   <span className="stat-badge">🔄 {fps} FPS</span>
//                   <span className="stat-badge">🎯 {detectionCount}</span>
//                 </>
//               )}
//             </div>
//           </div>
          
//           <div className="cctv-view">
//             <div className="cctv-frame">
//               <div className="cctv-corners">
//                 <div className="corner top-left"></div>
//                 <div className="corner top-right"></div>
//                 <div className="corner bottom-left"></div>
//                 <div className="corner bottom-right"></div>
//               </div>
              
//               {cameraActive ? (
//                 <div className="live-feed-container">
//                   <div className="cctv-overlay">
//                     <div className="timestamp">
//                       {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'})}
//                     </div>
//                     <div className="location-tag">📡 LIVE FEED</div>
//                     {realTimeActive && <div className="recording-indicator">● REC</div>}
//                   </div>
                  
//                   {/* React-Webcam Component */}
//                   <Webcam
//                     ref={webcamRef}
//                     audio={false}
//                     screenshotFormat="image/jpeg"
//                     videoConstraints={videoConstraints}
//                     className="cctv-video"
//                   />
                  
//                   {/* Canvas for detection overlay */}
//                   <canvas
//                     ref={canvasRef}
//                     className="detection-overlay"
//                   />
//                 </div>
//               ) : imagePreview ? (
//                 <div className="image-review">
//                   <img src={imagePreview} alt="Detected" className="review-image" />
//                   <canvas ref={canvasRef} className="detection-overlay" />
//                 </div>
//               ) : (
//                 <div className="cctv-placeholder">
//                   <div className="placeholder-icon">📷</div>
//                   <p>Camera Feed Inactive</p>
//                   <p className="placeholder-subtext">Click "Start Camera" to begin</p>
//                 </div>
//               )}
//             </div>

//             {/* Camera Controls */}
//             <div className="camera-control-panel">
//               <div className="control-row">
//                 <button
//                   onClick={startCamera}
//                   disabled={isDetecting || cameraActive}
//                   className={`control-btn ${cameraActive ? 'camera-active' : 'camera-start'}`}
//                 >
//                   {cameraActive ? '📹 Camera Active' : '🎥 Start Camera'}
//                 </button>
                
//                 {cameraActive && (
//                   <button
//                     onClick={stopCameraOnly}
//                     className="control-btn camera-stop"
//                   >
//                     🛑 Stop Camera
//                   </button>
//                 )}
//               </div>
              
//               <div className="control-row">
//                 <button
//                   onClick={startRealTimeDetection}
//                   disabled={!cameraActive || isDetecting}
//                   className={`control-btn ${realTimeActive ? 'realtime-active' : 'realtime-start'}`}
//                 >
//                   {realTimeActive ? '⏸️ Stop Detection' : '🔴 Live Detection'}
//                 </button>
                
//                 <button
//                   onClick={captureImage}
//                   disabled={!cameraActive || realTimeActive || isDetecting}
//                   className="control-btn capture-btn"
//                 >
//                   📸 Capture & Analyze
//                 </button>
//               </div>
              
//               <div className="control-row">
//                 <button
//                   onClick={() => fileInputRef.current?.click()}
//                   disabled={cameraActive || realTimeActive || isDetecting}
//                   className="control-btn upload-btn"
//                 >
//                   📁 Upload Image
//                 </button>
                
//                 <input
//                   ref={fileInputRef}
//                   type="file"
//                   accept="image/*"
//                   onChange={handleFileUpload}
//                   style={{ display: 'none' }}
//                 />
                
//                 <button
//                   onClick={clearDetection}
//                   disabled={(!imagePreview && !cameraActive) || realTimeActive || isDetecting}
//                   className="control-btn clear-btn"
//                 >
//                   🗑️ Clear Results
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Results Panel */}
//         <div className="results-panel">
//           <div className="results-header">
//             <h3>📊 Detection Results</h3>
//             <div className="results-stats">
//               <span className="result-count">
//                 Objects: <strong>{predictions.length}</strong>
//               </span>
//               {realTimeActive && <span className="live-badge">🔴 LIVE</span>}
//             </div>
//           </div>

//           <div className="results-content">
//             {isDetecting ? (
//               <div className="detecting-state">
//                 <div className="detecting-spinner"></div>
//                 <p>Analyzing image...</p>
//               </div>
//             ) : predictions.length > 0 ? (
//               <>
//                 <div className="objects-grid">
//                   {predictions.map((pred, index) => (
//                     <div key={index} className="object-card">
//                       <div className="object-header">
//                         <span className="object-icon">🎯</span>
//                         <span className="object-name">{pred.class}</span>
//                         <span className="object-confidence">
//                           {formatConfidence(pred.score)}
//                         </span>
//                       </div>
//                       <div className="object-details">
//                         <div className="detail">
//                           <span className="detail-label">Confidence:</span>
//                           <span className="detail-value">
//                             {formatConfidence(pred.score)}
//                           </span>
//                         </div>
//                         <div className="detail">
//                           <span className="detail-label">Size:</span>
//                           <span className="detail-value">
//                             {Math.round(pred.bbox[2])}×{Math.round(pred.bbox[3])}px
//                           </span>
//                         </div>
//                       </div>
//                       <button
//                         onClick={() => voiceService.speak(`${pred.class} detected with ${formatConfidence(pred.score)} confidence`)}
//                         className="speak-btn"
//                       >
//                         🔊 Speak
//                       </button>
//                     </div>
//                   ))}
//                 </div>
                
//                 <div className="results-summary">
//                   <button
//                     onClick={() => {
//                       const objectNames = predictions.map(p => p.class);
//                       const uniqueObjects = [...new Set(objectNames)];
//                       voiceService.speak(`Found ${predictions.length} objects: ${uniqueObjects.join(', ')}`);
//                     }}
//                     className="summary-speak-btn"
//                   >
//                     🔊 Announce Results
//                   </button>
//                 </div>
//               </>
//             ) : (
//               <div className="no-results">
//                 <div className="no-results-icon">🔍</div>
//                 <p>No objects detected yet</p>
//                 <p className="no-results-hint">
//                   {cameraActive
//                     ? realTimeActive
//                       ? 'Point camera at objects to see detection'
//                       : 'Click "Live Detection" for real-time or "Capture & Analyze"'
//                     : 'Start camera or upload an image'
//                   }
//                 </p>
//               </div>
//             )}
//           </div>

//           {/* Detection History */}
//           {detectionHistory.length > 0 && (
//             <div className="history-section">
//               <h4>📜 Recent Detections</h4>
//               <div className="history-list">
//                 {detectionHistory.slice(0, 5).map((item, index) => (
//                   <div key={index} className="history-item">
//                     <div className="history-time">
//                       {new Date(item.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
//                     </div>
//                     <div className="history-objects">
//                       {item.detected_objects.slice(0, 2).map((obj, idx) => (
//                         <span key={idx} className="history-tag">
//                           {obj.object} ({obj.confidence}%)
//                         </span>
//                       ))}
//                       {item.detected_objects.length > 2 && (
//                         <span className="history-more">
//                           +{item.detected_objects.length - 2}
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Quick Guide */}
//       <div className="quick-guide">
//         <h3>🚀 Quick Start Guide:</h3>
//         <div className="guide-steps">
//           <div className="guide-step">
//             <div className="step-icon">1️⃣</div>
//             <p><strong>Start Camera</strong> - Click the "Start Camera" button</p>
//           </div>
//           <div className="guide-step">
//             <div className="step-icon">2️⃣</div>
//             <p><strong>Live Detection</strong> - Click "Live Detection" for real-time</p>
//           </div>
//           <div className="guide-step">
//             <div className="step-icon">3️⃣</div>
//             <p><strong>Point & Detect</strong> - Point camera at objects to see boxes</p>
//           </div>
//           <div className="guide-step">
//             <div className="step-icon">4️⃣</div>
//             <p><strong>View Results</strong> - See detected objects with confidence</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




// src/pages/ObjectDetector/ObjectDetector.jsx
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';
import './ObjectDetector.css';
import { voiceService } from '../../services/voiceService';

function speak(text) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 0.8;
    window.speechSynthesis.speak(utter);
  }
}

export default function ObjectDetector() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [model, setModel] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [isDetecting, setIsDetecting] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [realTimeActive, setRealTimeActive] = useState(false);
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [detectionHistory, setDetectionHistory] = useState([]);
  const [fps, setFps] = useState(0);
  const [detectionCount, setDetectionCount] = useState(0);
  const [cameraPermission, setCameraPermission] = useState(null);
  
  // Voice control states
  const [voiceActive, setVoiceActive] = useState(false);
  const [lastVoiceCommand, setLastVoiceCommand] = useState('');
  const [lastDetectionResult, setLastDetectionResult] = useState('');

  // Refs
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const animationFrameRef = useRef(null);
  const lastFrameTimeRef = useRef(0);
  const frameCountRef = useRef(0);

  // Video constraints
  const videoConstraints = {
    facingMode: "environment",
    width: { ideal: 640 },
    height: { ideal: 480 }
  };

  // Load COCO-SSD model
  useEffect(() => {
    async function loadModel() {
      try {
        setLoading(true);
        setError('');
        
        console.log('Loading TensorFlow.js model...');
        const loadedModel = await cocoSsd.load();
        setModel(loadedModel);
        
        console.log('Model loaded successfully');
        voiceService.speak('Object detection model loaded successfully');
      } catch (err) {
        console.error('Failed to load model:', err);
        setError('Failed to load object detection model. Please refresh the page.');
        voiceService.speak('Failed to load object detection model');
      } finally {
        setLoading(false);
      }
    }

    loadModel();

    // Cleanup on unmount
    return () => {
      cleanupEverything();
    };
  }, []);

  // Voice command setup - ISOLATED for Object Detector only
  useEffect(() => {
    if (!voiceService.recognition) {
      console.log('Speech recognition not available in this browser');
      return;
    }

    // Clear all previous commands and isolate this component
    voiceService.clearCommands();
    voiceService.clearDynamicHandlers();
    
    // Set feature to object detector
    voiceService.setFeature('objectDetector', (transcript) => {
      console.log('Voice command received in Object Detector:', transcript);
      setLastVoiceCommand(transcript);
      
      setTimeout(() => {
        setLastVoiceCommand('');
      }, 3000);
    });

    // Register ONLY Object Detector commands + logout/dashboard
    const registerObjectDetectorCommands = () => {
      // ===== CAMERA CONTROL COMMANDS =====
      voiceService.registerCommand('start camera', () => {
        console.log('Voice command: start camera');
        startCamera();
        voiceService.speak('Starting camera');
      });
      
      voiceService.registerCommand('open camera', () => {
        startCamera();
        voiceService.speak('Opening camera');
      });
      
      voiceService.registerCommand('turn on camera', () => {
        startCamera();
        voiceService.speak('Turning on camera');
      });
      
      voiceService.registerCommand('stop camera', () => {
        console.log('Voice command: stop camera');
        stopCameraOnly();
        voiceService.speak('Camera stopped');
      });
      
      voiceService.registerCommand('close camera', () => {
        stopCameraOnly();
        voiceService.speak('Closing camera');
      });
      
      voiceService.registerCommand('turn off camera', () => {
        stopCameraOnly();
        voiceService.speak('Turning off camera');
      });
      
      voiceService.registerCommand('clear camera', () => {
        clearDetection();
        voiceService.speak('Camera feed cleared');
      });

      // ===== DETECTION COMMANDS =====
      voiceService.registerCommand('detect objects', () => {
        if (cameraActive) {
          startRealTimeDetection();
          voiceService.speak('Starting object detection');
        } else {
          voiceService.speak('Start camera first for detection');
        }
      });
      
      voiceService.registerCommand('detect', () => {
        if (cameraActive) {
          startRealTimeDetection();
          voiceService.speak('Starting detection');
        } else {
          voiceService.speak('Camera not active');
        }
      });
      
      voiceService.registerCommand('start detection', () => {
        if (cameraActive) {
          startRealTimeDetection();
          voiceService.speak('Starting object detection');
        }
      });
      
      voiceService.registerCommand('stop detection', () => {
        stopRealTimeDetection();
        voiceService.speak('Detection stopped');
      });
      
      voiceService.registerCommand('end detection', () => {
        stopRealTimeDetection();
        voiceService.speak('Ending detection');
      });

      // ===== CAPTURE & ANALYSIS COMMANDS =====
      voiceService.registerCommand('capture', () => {
        if (cameraActive) {
          captureImage();
          voiceService.speak('Capturing image');
        }
      });
      
      voiceService.registerCommand('capture image', () => {
        if (cameraActive) {
          captureImage();
          voiceService.speak('Capturing image for analysis');
        }
      });
      
      voiceService.registerCommand('take picture', () => {
        if (cameraActive) {
          captureImage();
          voiceService.speak('Taking picture');
        }
      });
      
      voiceService.registerCommand('snap photo', () => {
        if (cameraActive) {
          captureImage();
          voiceService.speak('Snapping photo');
        }
      });
      
      voiceService.registerCommand('analyze', () => {
        if (cameraActive) {
          captureImage();
          voiceService.speak('Analyzing scene');
        } else if (imagePreview) {
          detectObjectsInImage(imagePreview);
          voiceService.speak('Analyzing uploaded image');
        }
      });
      
      voiceService.registerCommand('analyze image', () => {
        if (cameraActive) {
          captureImage();
          voiceService.speak('Analyzing current view');
        }
      });

      // ===== QUERY COMMANDS =====
      voiceService.registerCommand('what is in front of me', () => {
        if (predictions.length > 0) {
          const objects = predictions.map(p => p.class);
          const unique = [...new Set(objects)];
          const response = `In front of you, I see ${unique.length} object${unique.length > 1 ? 's' : ''}: ${unique.join(', ')}`;
          voiceService.speak(response);
          setLastDetectionResult(response);
        } else if (cameraActive) {
          voiceService.speak('Camera is active but no objects detected yet. Try saying "detect objects"');
        } else {
          voiceService.speak('Camera is not active. Say "start camera" first');
        }
      });
      
      voiceService.registerCommand('what do you see', () => {
        if (predictions.length > 0) {
          const objects = predictions.map(p => p.class);
          const unique = [...new Set(objects)];
          const response = `I see ${unique.length} object${unique.length > 1 ? 's' : ''}: ${unique.join(', ')}`;
          voiceService.speak(response);
          setLastDetectionResult(response);
        } else if (cameraActive) {
          voiceService.speak('I see the camera feed but no objects detected. Try detection mode');
        } else {
          voiceService.speak('I see nothing. Camera is inactive');
        }
      });
      
      voiceService.registerCommand('read objects', () => {
        if (predictions.length > 0) {
          const objects = predictions.map(p => p.class);
          const unique = [...new Set(objects)];
          const response = `Reading objects: ${unique.join(', ')}`;
          voiceService.speak(response);
          setLastDetectionResult(response);
        } else {
          voiceService.speak('No objects to read. Start detection first');
        }
      });
      
      voiceService.registerCommand('list objects', () => {
        if (predictions.length > 0) {
          const objects = predictions.map(p => p.class);
          const unique = [...new Set(objects)];
          const response = `Objects detected: ${unique.join(', ')}`;
          voiceService.speak(response);
          setLastDetectionResult(response);
        }
      });
      
      voiceService.registerCommand('repeat last object', () => {
        if (lastDetectionResult) {
          voiceService.speak(lastDetectionResult);
        } else if (predictions.length > 0) {
          const objects = predictions.map(p => p.class);
          const unique = [...new Set(objects)];
          const response = `Last detected objects: ${unique.join(', ')}`;
          voiceService.speak(response);
          setLastDetectionResult(response);
        } else {
          voiceService.speak('No previous detection to repeat');
        }
      });
      
      voiceService.registerCommand('say again', () => {
        if (lastDetectionResult) {
          voiceService.speak(lastDetectionResult);
        } else {
          voiceService.speak('Nothing to repeat');
        }
      });
      
      voiceService.registerCommand('what was that', () => {
        if (lastDetectionResult) {
          voiceService.speak(lastDetectionResult);
        } else {
          voiceService.speak('No previous detection to report');
        }
      });

      // ===== UPLOAD & CLEAR COMMANDS =====
      voiceService.registerCommand('upload image', () => {
        fileInputRef.current?.click();
        voiceService.speak('Select an image to upload');
      });
      
      voiceService.registerCommand('upload photo', () => {
        fileInputRef.current?.click();
        voiceService.speak('Choose a photo to upload');
      });
      
      voiceService.registerCommand('select image', () => {
        fileInputRef.current?.click();
        voiceService.speak('Select an image file');
      });
      
      voiceService.registerCommand('clear results', () => {
        clearDetection();
        voiceService.speak('Results cleared');
      });
      
      voiceService.registerCommand('clear all', () => {
        clearDetection();
        voiceService.speak('Everything cleared');
      });
      
      voiceService.registerCommand('reset', () => {
        clearDetection();
        voiceService.speak('Reset complete');
      });

      // ===== STATUS & HELP COMMANDS =====
      voiceService.registerCommand('status', () => {
        if (cameraActive) {
          if (realTimeActive) {
            voiceService.speak(`Camera active with real-time detection at ${fps} FPS. ${predictions.length} objects detected.`);
          } else {
            voiceService.speak(`Camera active. ${predictions.length} objects from last capture.`);
          }
        } else {
          voiceService.speak('Camera inactive. Model ready.');
        }
      });
      
      voiceService.registerCommand('camera status', () => {
        if (cameraActive) {
          voiceService.speak(`Camera is active. ${realTimeActive ? 'Detection running.' : 'Detection paused.'}`);
        } else {
          voiceService.speak('Camera is off');
        }
      });
      
      voiceService.registerCommand('model status', () => {
        if (model) {
          voiceService.speak('Object detection model is loaded and ready');
        } else {
          voiceService.speak('Model is still loading');
        }
      });
      
      voiceService.registerCommand('help', () => {
        const helpText = 'Available commands: start camera, stop camera, detect objects, capture image, analyze, what is in front of me, read objects, upload image, clear results, status, go back to dashboard, logout';
        voiceService.speak(helpText);
      });
      
      voiceService.registerCommand('show commands', () => {
        voiceService.speak('Camera commands, detection commands, capture commands, query commands, and navigation commands');
      });
      
      voiceService.registerCommand('what can i say', () => {
        voiceService.speak('Try: start camera, detect objects, capture image, what is in front of me, or help for full list');
      });

      // ===== NAVIGATION COMMANDS (ONLY these 2 from outside) =====
      voiceService.registerCommand('go back', () => {
        console.log('Going back to dashboard, cleaning up...');
        cleanupEverything();
        voiceService.speak('Returning to dashboard');
        navigate('/dashboard');
      });
      
      voiceService.registerCommand('dashboard', () => {
        cleanupEverything();
        voiceService.speak('Going to dashboard');
        navigate('/dashboard');
      });
      
      voiceService.registerCommand('logout', () => {
        cleanupEverything();
        voiceService.speak('Logging out');
        navigate('/logout');
      });
      
      voiceService.registerCommand('exit', () => {
        cleanupEverything();
        voiceService.speak('Exiting object detector');
        navigate('/dashboard');
      });
      
      voiceService.registerCommand('back to dashboard', () => {
        cleanupEverything();
        voiceService.speak('Going back to main dashboard');
        navigate('/dashboard');
      });
      
      voiceService.registerCommand('main menu', () => {
        cleanupEverything();
        voiceService.speak('Returning to main menu');
        navigate('/dashboard');
      });

      console.log('[ObjectDetector] Registered isolated voice commands for object detector only');
    };

    // Register commands
    registerObjectDetectorCommands();

    // Cleanup on unmount
    return () => {
      voiceService.clearCommands();
      voiceService.clearDynamicHandlers();
      voiceService.setFeature('dashboard');
    };
  }, [cameraActive, realTimeActive, predictions, model, fps, imagePreview, lastDetectionResult, navigate]);

  // Cleanup everything
  const cleanupEverything = () => {
    console.log('Cleaning up all resources...');
    
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    
    if (voiceActive) {
      voiceService.stopListening();
      setVoiceActive(false);
    }
    
    setCameraActive(false);
    setRealTimeActive(false);
    setIsDetecting(false);
    setFps(0);
  };

  // Start camera - SIMPLIFIED with React-Webcam
  const startCamera = () => {
    setError('');
    setImagePreview(null);
    setPredictions([]);
    setRealTimeActive(false);
    setDetectionCount(0);
    setCameraActive(true);
    setCameraPermission('granted');
    voiceService.speak('Camera started successfully');
  };

  // Stop camera only
  const stopCameraOnly = () => {
    console.log('Stopping camera...');
    
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    
    setCameraActive(false);
    setRealTimeActive(false);
    setPredictions([]);
    setFps(0);
    voiceService.speak('Camera stopped');
  };

  // Handle back to dashboard
  const handleBackToDashboard = () => {
    console.log('Going back to dashboard, cleaning up...');
    cleanupEverything();
    navigate('/dashboard');
  };

  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.match('image.*')) {
      setError('Please upload an image file (JPEG, PNG, GIF)');
      return;
    }

    // Stop camera if active
    if (cameraActive) {
      cleanupEverything();
    }

    setError('');
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target.result);
      detectObjectsInImage(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  // Capture image from camera
  const captureImage = useCallback(() => {
    if (!webcamRef.current || !cameraActive) {
      setError('Camera is not active');
      voiceService.speak('Camera is not active. Start camera first');
      return;
    }

    const screenshot = webcamRef.current.getScreenshot();
    if (screenshot) {
      setImagePreview(screenshot);
      detectObjectsInImage(screenshot);
      voiceService.speak('Image captured and analyzing...');
    }
  }, [cameraActive]);

  // Detect objects in image
  const detectObjectsInImage = async (imageSrc) => {
    if (!model) {
      setError('Model not loaded yet');
      voiceService.speak('Model is still loading, please wait');
      return;
    }

    try {
      setIsDetecting(true);
      setError('');

      const img = new Image();
      img.onload = async () => {
        const predictions = await model.detect(img);
        const filteredPredictions = predictions.filter(p => p.score > 0.3);
        
        setPredictions(filteredPredictions);
        setDetectionCount(prev => prev + 1);
        
        if (filteredPredictions.length > 0) {
          const objectNames = filteredPredictions.map(p => p.class);
          const uniqueObjects = [...new Set(objectNames)];
          const speechText = `Detected ${uniqueObjects.length} object${uniqueObjects.length > 1 ? 's' : ''}: ${uniqueObjects.join(', ')}`;
          voiceService.speak(speechText);
          setLastDetectionResult(speechText);
        } else {
          voiceService.speak('No objects detected in the image');
          setLastDetectionResult('No objects detected');
        }

        // Save to detection history
        const detectionData = {
          detected_objects: filteredPredictions.map(p => ({
            object: p.class,
            confidence: Math.round(p.score * 100),
            bbox: p.bbox
          })),
          timestamp: new Date().toISOString(),
          source: cameraActive ? 'camera' : 'upload'
        };

        setDetectionHistory(prev => [detectionData, ...prev.slice(0, 9)]);

        // Draw bounding boxes on canvas
        if (canvasRef.current) {
          const canvas = canvasRef.current;
          const ctx = canvas.getContext('2d');
          
          // Set canvas dimensions
          canvas.width = img.width;
          canvas.height = img.height;
          
          // Clear previous drawings
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          
          // Draw the image
          ctx.drawImage(img, 0, 0);
          
          // Draw bounding boxes with labels
          filteredPredictions.forEach(prediction => {
            const [x, y, width, height] = prediction.bbox;
            const confidence = Math.round(prediction.score * 100);
            
            // Draw bounding box
            ctx.strokeStyle = '#00ff00';
            ctx.lineWidth = 3;
            ctx.strokeRect(x, y, width, height);
            
            // Draw label background
            ctx.fillStyle = '#00ff00';
            ctx.font = 'bold 16px Arial';
            const label = `${prediction.class} ${confidence}%`;
            const textWidth = ctx.measureText(label).width;
            ctx.fillRect(x, y - 25, textWidth + 10, 25);
            
            // Draw label text
            ctx.fillStyle = '#000000';
            ctx.fillText(label, x + 5, y - 7);
          });
        }

        setIsDetecting(false);
      };
      
      img.src = imageSrc;
    } catch (err) {
      console.error('Detection error:', err);
      setError('Failed to detect objects. Please try again.');
      voiceService.speak('Failed to detect objects');
      setIsDetecting(false);
    }
  };

  // Real-time detection loop
  const detectRealTime = useCallback(async () => {
    if (!cameraActive || !realTimeActive || !model || !webcamRef.current) {
      return;
    }

    const video = webcamRef.current.video;
    
    if (!video || video.readyState !== 4 || video.videoWidth === 0) {
      animationFrameRef.current = requestAnimationFrame(detectRealTime);
      return;
    }

    try {
      // Update FPS counter
      frameCountRef.current++;
      const now = performance.now();
      const elapsed = now - lastFrameTimeRef.current;
      
      if (elapsed >= 1000) {
        setFps(Math.round((frameCountRef.current * 1000) / elapsed));
        frameCountRef.current = 0;
        lastFrameTimeRef.current = now;
      }

      // Detect objects in current video frame
      const predictions = await model.detect(video);
      const filteredPredictions = predictions.filter(p => p.score > 0.4);
      
      // Update predictions
      setPredictions(filteredPredictions);
      
      // Draw on canvas
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        
        // Update canvas size to match video
        if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
        }
        
        // Clear previous drawings
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw bounding boxes for detected objects
        filteredPredictions.forEach(prediction => {
          const [x, y, width, height] = prediction.bbox;
          const confidence = Math.round(prediction.score * 100);
          
          // Adjust for mirrored video (front camera)
          const mirroredX = canvas.width - x - width;
          
          // Draw bounding box
          ctx.strokeStyle = '#00ff00';
          ctx.lineWidth = 3;
          ctx.strokeRect(mirroredX, y, width, height);
          
          // Draw label background
          ctx.fillStyle = '#00ff00';
          ctx.font = 'bold 14px Arial';
          const label = `${prediction.class} ${confidence}%`;
          const textWidth = ctx.measureText(label).width;
          ctx.fillRect(mirroredX, y - 20, textWidth + 10, 20);
          
          // Draw label text
          ctx.fillStyle = '#000000';
          ctx.fillText(label, mirroredX + 5, y - 5);
        });
      }

      // Occasionally speak results
      if (filteredPredictions.length > 0 && Math.random() < 0.1) {
        const objectNames = filteredPredictions.map(p => p.class);
        const uniqueObjects = [...new Set(objectNames)];
        if (uniqueObjects.length <= 3) {
          const speech = `Detecting ${uniqueObjects.join(', ')}`;
          voiceService.speak(speech);
          setLastDetectionResult(speech);
        }
      }

    } catch (err) {
      console.error('Real-time detection error:', err);
    }

    // Continue detection loop
    if (realTimeActive) {
      animationFrameRef.current = requestAnimationFrame(detectRealTime);
    }
  }, [cameraActive, realTimeActive, model]);

  // Start real-time detection
  const startRealTimeDetection = () => {
    if (!cameraActive) {
      setError('Please start camera first');
      voiceService.speak('Please start camera first');
      return;
    }

    if (realTimeActive) {
      stopRealTimeDetection();
      return;
    }

    console.log('Starting real-time detection');
    setRealTimeActive(true);
    voiceService.speak('Starting real-time object detection');
    
    // Reset FPS counter
    lastFrameTimeRef.current = performance.now();
    frameCountRef.current = 0;
    
    // Start detection loop
    detectRealTime();
  };

  // Stop real-time detection
  const stopRealTimeDetection = () => {
    console.log('Stopping real-time detection');
    setRealTimeActive(false);
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    voiceService.speak('Real-time detection stopped');
  };

  const clearDetection = () => {
    setImagePreview(null);
    setPredictions([]);
    setLastDetectionResult('');
    stopRealTimeDetection();
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };

  const formatConfidence = (score) => {
    return `${Math.round(score * 100)}%`;
  };

  // Camera permission status
  const renderCameraPermission = () => {
    if (cameraPermission === 'denied') {
      return (
        <div className="permission-warning">
          <p>⚠️ Camera access denied. Please allow camera access in your browser settings.</p>
          <button 
            onClick={() => window.location.reload()}
            className="retry-btn"
          >
            Retry Camera
          </button>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="detector-loading">
        <div className="loading-spinner"></div>
        <p>Loading object detection model...</p>
        <p className="loading-subtext">This may take a moment on first use</p>
      </div>
    );
  }

  return (
    <div className="object-detector-container">
      <div className="detector-header">
        <button className="back-button" onClick={handleBackToDashboard}>
          ← Back to Dashboard
        </button>
        <h1>🔍 Object Detector</h1>
        <p>Live camera feed with real-time object detection</p>
      </div>

      {/* Voice Control Panel */}
      <div className="voice-control-panel">
        <div className="voice-control-header">
          <h4>🎤 Voice Control - Object Detector Only</h4>
          <div className="voice-status">
            {voiceActive ? (
              <span className="voice-active-indicator">● Listening...</span>
            ) : (
              <span className="voice-inactive">Voice commands available</span>
            )}
          </div>
        </div>
        
        <div className="voice-controls">
          <button
            onClick={() => {
              if (voiceActive) {
                voiceService.stopListening();
                setVoiceActive(false);
                voiceService.speak('Voice control deactivated');
              } else {
                voiceService.startListening();
                setVoiceActive(true);
                voiceService.speak('Object detector voice control activated. Try saying "start camera" or "what is in front of me"');
              }
            }}
            className={`voice-toggle-btn ${voiceActive ? 'voice-active' : ''}`}
          >
            {voiceActive ? '🛑 Stop Listening' : '🎤 Start Voice Control'}
          </button>
          
          <button
            onClick={() => {
              voiceService.speak(
                cameraActive 
                  ? realTimeActive
                    ? `Camera is active with real-time detection at ${fps} FPS. ${predictions.length} objects detected.`
                    : `Camera is active. ${predictions.length} objects in last detection.`
                  : 'Camera is inactive. Say "start camera" to begin.'
              );
            }}
            className="voice-status-btn"
          >
            🔊 Status Report
          </button>
          
          <button
            onClick={() => {
              voiceService.speak('Available commands: start camera, stop camera, detect objects, capture image, analyze, what is in front of me, read objects, upload image, clear results, status, go back to dashboard, logout');
            }}
            className="voice-help-btn"
          >
            ❓ Voice Help
          </button>
        </div>
        
        {lastVoiceCommand && (
          <div className="voice-command-feedback">
            <div className="command-text">
              <strong>Last command:</strong> "{lastVoiceCommand}"
            </div>
            <button 
              onClick={() => setLastVoiceCommand('')}
              className="clear-command-btn"
            >
              ✕
            </button>
          </div>
        )}
        
        <div className="voice-command-hints">
          <p><strong>Try saying:</strong></p>
          <div className="command-chips">
            <span className="command-chip">"Start camera"</span>
            <span className="command-chip">"What is in front of me"</span>
            <span className="command-chip">"Detect objects"</span>
            <span className="command-chip">"Capture image"</span>
            <span className="command-chip">"Read objects"</span>
            <span className="command-chip">"Go back to dashboard"</span>
          </div>
        </div>
        
        <div className="voice-isolation-note">
          <small>💡 <strong>Note:</strong> Only Object Detector commands work here. Other commands (like "news") are disabled.</small>
        </div>
      </div>

      {renderCameraPermission()}

      {error && (
        <div className="error-message">
          <span className="error-icon">⚠️</span>
          {error}
        </div>
      )}

      <div className="detector-main">
        {/* CCTV Camera View */}
        <div className="cctv-section">
          <div className="cctv-header">
            <h3>📹 Live Camera Feed</h3>
            <div className="cctv-stats">
              {cameraActive && (
                <>
                  <span className="stat-badge">🎥 LIVE</span>
                  {realTimeActive && <span className="stat-badge active">🔴 DETECTING</span>}
                  <span className="stat-badge">🔄 {fps} FPS</span>
                  <span className="stat-badge">🎯 {detectionCount}</span>
                </>
              )}
            </div>
          </div>
          
          <div className="cctv-view">
            <div className="cctv-frame">
              <div className="cctv-corners">
                <div className="corner top-left"></div>
                <div className="corner top-right"></div>
                <div className="corner bottom-left"></div>
                <div className="corner bottom-right"></div>
              </div>
              
              {cameraActive ? (
                <div className="live-feed-container">
                  <div className="cctv-overlay">
                    <div className="timestamp">
                      {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'})}
                    </div>
                    <div className="location-tag">📡 LIVE FEED</div>
                    {realTimeActive && <div className="recording-indicator">● REC</div>}
                  </div>
                  
                  {/* React-Webcam Component */}
                  <Webcam
                    ref={webcamRef}
                    audio={false}
                    screenshotFormat="image/jpeg"
                    videoConstraints={videoConstraints}
                    className="cctv-video"
                  />
                  
                  {/* Canvas for detection overlay */}
                  <canvas
                    ref={canvasRef}
                    className="detection-overlay"
                  />
                </div>
              ) : imagePreview ? (
                <div className="image-review">
                  <img src={imagePreview} alt="Detected" className="review-image" />
                  <canvas ref={canvasRef} className="detection-overlay" />
                </div>
              ) : (
                <div className="cctv-placeholder">
                  <div className="placeholder-icon">📷</div>
                  <p>Camera Feed Inactive</p>
                  <p className="placeholder-subtext">Say "Start Camera" or click button</p>
                </div>
              )}
            </div>

            {/* Camera Controls */}
            <div className="camera-control-panel">
              <div className="control-row">
                <button
                  onClick={startCamera}
                  disabled={isDetecting || cameraActive}
                  className={`control-btn ${cameraActive ? 'camera-active' : 'camera-start'}`}
                >
                  {cameraActive ? '📹 Camera Active' : '🎥 Start Camera'}
                </button>
                
                {cameraActive && (
                  <button
                    onClick={stopCameraOnly}
                    className="control-btn camera-stop"
                  >
                    🛑 Stop Camera
                  </button>
                )}
              </div>
              
              <div className="control-row">
                <button
                  onClick={startRealTimeDetection}
                  disabled={!cameraActive || isDetecting}
                  className={`control-btn ${realTimeActive ? 'realtime-active' : 'realtime-start'}`}
                >
                  {realTimeActive ? '⏸️ Stop Detection' : '🔴 Live Detection'}
                </button>
                
                <button
                  onClick={captureImage}
                  disabled={!cameraActive || realTimeActive || isDetecting}
                  className="control-btn capture-btn"
                >
                  📸 Capture & Analyze
                </button>
              </div>
              
              <div className="control-row">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={cameraActive || realTimeActive || isDetecting}
                  className="control-btn upload-btn"
                >
                  📁 Upload Image
                </button>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                />
                
                <button
                  onClick={clearDetection}
                  disabled={(!imagePreview && !cameraActive) || realTimeActive || isDetecting}
                  className="control-btn clear-btn"
                >
                  🗑️ Clear All
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="results-panel">
          <div className="results-header">
            <h3>📊 Detection Results</h3>
            <div className="results-stats">
              <span className="result-count">
                Objects: <strong>{predictions.length}</strong>
              </span>
              {realTimeActive && <span className="live-badge">🔴 LIVE</span>}
              {lastDetectionResult && <span className="last-result-badge">🗣️ Spoken</span>}
            </div>
          </div>

          <div className="results-content">
            {isDetecting ? (
              <div className="detecting-state">
                <div className="detecting-spinner"></div>
                <p>Analyzing image...</p>
              </div>
            ) : predictions.length > 0 ? (
              <>
                <div className="objects-grid">
                  {predictions.map((pred, index) => (
                    <div key={index} className="object-card">
                      <div className="object-header">
                        <span className="object-icon">🎯</span>
                        <span className="object-name">{pred.class}</span>
                        <span className="object-confidence">
                          {formatConfidence(pred.score)}
                        </span>
                      </div>
                      <div className="object-details">
                        <div className="detail">
                          <span className="detail-label">Confidence:</span>
                          <span className="detail-value">
                            {formatConfidence(pred.score)}
                          </span>
                        </div>
                        <div className="detail">
                          <span className="detail-label">Size:</span>
                          <span className="detail-value">
                            {Math.round(pred.bbox[2])}×{Math.round(pred.bbox[3])}px
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => voiceService.speak(`${pred.class} detected with ${formatConfidence(pred.score)} confidence`)}
                        className="speak-btn"
                      >
                        🔊 Speak
                      </button>
                    </div>
                  ))}
                </div>
                
                <div className="results-summary">
                  <button
                    onClick={() => {
                      const objectNames = predictions.map(p => p.class);
                      const uniqueObjects = [...new Set(objectNames)];
                      const speech = `Found ${predictions.length} objects: ${uniqueObjects.join(', ')}`;
                      voiceService.speak(speech);
                      setLastDetectionResult(speech);
                    }}
                    className="summary-speak-btn"
                  >
                    🔊 Announce Results
                  </button>
                  
                  <button
                    onClick={() => {
                      if (lastDetectionResult) {
                        voiceService.speak(lastDetectionResult);
                      }
                    }}
                    className="summary-repeat-btn"
                  >
                    🔄 Repeat Last
                  </button>
                </div>
              </>
            ) : (
              <div className="no-results">
                <div className="no-results-icon">🔍</div>
                <p>No objects detected yet</p>
                <p className="no-results-hint">
                  {cameraActive
                    ? realTimeActive
                      ? 'Point camera at objects to see detection'
                      : 'Say "Detect Objects" for real-time or "Capture" for single shot'
                    : 'Say "Start Camera" or upload an image'
                  }
                </p>
              </div>
            )}
          </div>

          {/* Detection History */}
          {detectionHistory.length > 0 && (
            <div className="history-section">
              <h4>📜 Recent Detections</h4>
              <div className="history-list">
                {detectionHistory.slice(0, 5).map((item, index) => (
                  <div key={index} className="history-item">
                    <div className="history-time">
                      {new Date(item.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </div>
                    <div className="history-objects">
                      {item.detected_objects.slice(0, 2).map((obj, idx) => (
                        <span key={idx} className="history-tag">
                          {obj.object} ({obj.confidence}%)
                        </span>
                      ))}
                      {item.detected_objects.length > 2 && (
                        <span className="history-more">
                          +{item.detected_objects.length - 2}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Guide */}
      <div className="quick-guide">
        <h3>🚀 Quick Start Guide:</h3>
        <div className="guide-steps">
          <div className="guide-step">
            <div className="step-icon">1️⃣</div>
            <p><strong>Start Camera</strong> - Click button or say "Start Camera"</p>
          </div>
          <div className="guide-step">
            <div className="step-icon">2️⃣</div>
            <p><strong>Live Detection</strong> - Say "Detect Objects" for real-time</p>
          </div>
          <div className="guide-step">
            <div className="step-icon">3️⃣</div>
            <p><strong>Ask Questions</strong> - Say "What is in front of me?"</p>
          </div>
          <div className="guide-step">
            <div className="step-icon">4️⃣</div>
            <p><strong>Capture & Analyze</strong> - Say "Capture Image" or "Analyze"</p>
          </div>
        </div>
      </div>
    </div>
  );
}