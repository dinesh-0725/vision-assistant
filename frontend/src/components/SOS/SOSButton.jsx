

// // // // // // src/components/SOS/SOSButton.jsx
// // // // // import React, { useState, useRef, useEffect } from "react";
// // // // // import { useNavigate } from "react-router-dom";
// // // // // import { post } from "../../services/api";
// // // // // import "./SOSButton.css";

// // // // // function speak(text) {
// // // // //   if ("speechSynthesis" in window) {
// // // // //     window.speechSynthesis.cancel();
// // // // //     const utter = new SpeechSynthesisUtterance(text);
// // // // //     utter.rate = 0.8;
// // // // //     utter.volume = 1.0;
// // // // //     window.speechSynthesis.speak(utter);
// // // // //   }
// // // // // }

// // // // // // Format time to Indian Standard Time (IST) or local time
// // // // // const formatTime = (dateString) => {
// // // // //   const date = new Date(dateString);
// // // // //   return date.toLocaleTimeString('en-IN', {
// // // // //     hour: '2-digit',
// // // // //     minute: '2-digit',
// // // // //     second: '2-digit',
// // // // //     hour12: true
// // // // //   }) + ' IST';
// // // // // };

// // // // // export default function SOSButton({ 
// // // // //   showHeader = true 
// // // // // }) {
// // // // //   const navigate = useNavigate();
// // // // //   const [sending, setSending] = useState(false);
// // // // //   const [status, setStatus] = useState("");
// // // // //   const [error, setError] = useState("");
// // // // //   const [countdown, setCountdown] = useState(null);
// // // // //   const [location, setLocation] = useState(null);
// // // // //   const [alertType, setAlertType] = useState("sos");
// // // // //   const [customMessage, setCustomMessage] = useState("Emergency! Please help me.");
// // // // //   const [locationWatching, setLocationWatching] = useState(false);
// // // // //   const [locationAccuracy, setLocationAccuracy] = useState(null);
  
// // // // //   const inputRef = useRef(null);
// // // // //   const watchIdRef = useRef(null);
// // // // //   const lastLocationRef = useRef(null);
  
// // // // //   // Safety: require double-press within 1.5s to confirm
// // // // //   const lastPressRef = useRef(0);
// // // // //   const countdownRef = useRef(null);

// // // // //   // Cleanup location watcher on component unmount
// // // // //   useEffect(() => {
// // // // //     return () => {
// // // // //       if (watchIdRef.current !== null) {
// // // // //         navigator.geolocation.clearWatch(watchIdRef.current);
// // // // //       }
// // // // //     };
// // // // //   }, []);

// // // // //   const handleBackToDashboard = () => {
// // // // //     navigate("/dashboard");
// // // // //   };

// // // // //   // Start watching location
// // // // //   const startLocationWatching = () => {
// // // // //     if (!("geolocation" in navigator)) {
// // // // //       const errorMsg = "Geolocation not supported by your device";
// // // // //       setError(errorMsg);
// // // // //       speak(errorMsg);
// // // // //       return false;
// // // // //     }

// // // // //     setStatus("Getting your live location...");
// // // // //     speak("Getting your live location. Please wait for accurate GPS.");

// // // // //     watchIdRef.current = navigator.geolocation.watchPosition(
// // // // //       (position) => {
// // // // //         const newLocation = {
// // // // //           lat: position.coords.latitude,
// // // // //           lng: position.coords.longitude,
// // // // //           accuracy: position.coords.accuracy,
// // // // //           timestamp: new Date().toISOString(),
// // // // //           altitude: position.coords.altitude,
// // // // //           heading: position.coords.heading,
// // // // //           speed: position.coords.speed,
// // // // //         };
        
// // // // //         lastLocationRef.current = newLocation;
// // // // //         setLocation(newLocation);
// // // // //         setLocationAccuracy(position.coords.accuracy);
// // // // //         setLocationWatching(true);
        
// // // // //         if (position.coords.accuracy < 50) {
// // // // //           // Good accuracy achieved
// // // // //           setStatus("Live location tracking active (High accuracy)");
// // // // //         } else if (position.coords.accuracy < 200) {
// // // // //           setStatus("Live location tracking active (Medium accuracy)");
// // // // //         } else {
// // // // //           setStatus("Live location tracking active (Low accuracy)");
// // // // //         }
// // // // //       },
// // // // //       (err) => {
// // // // //         console.error("Location watch error:", err);
// // // // //         let errorMsg;
// // // // //         switch(err.code) {
// // // // //           case err.PERMISSION_DENIED:
// // // // //             errorMsg = "Location access denied. Please enable location services.";
// // // // //             break;
// // // // //           case err.POSITION_UNAVAILABLE:
// // // // //             errorMsg = "Location information is unavailable.";
// // // // //             break;
// // // // //           case err.TIMEOUT:
// // // // //             errorMsg = "Location request timed out.";
// // // // //             break;
// // // // //           default:
// // // // //             errorMsg = "Unable to get live location.";
// // // // //         }
// // // // //         setError(errorMsg);
// // // // //         speak("Unable to get live location");
// // // // //         setLocationWatching(false);
// // // // //       },
// // // // //       {
// // // // //         enableHighAccuracy: true,
// // // // //         timeout: 10000,
// // // // //         maximumAge: 0,
// // // // //         distanceFilter: 10, // Update only when moved 10 meters
// // // // //       }
// // // // //     );

// // // // //     return true;
// // // // //   };

// // // // //   // Stop watching location
// // // // //   const stopLocationWatching = () => {
// // // // //     if (watchIdRef.current !== null) {
// // // // //       navigator.geolocation.clearWatch(watchIdRef.current);
// // // // //       watchIdRef.current = null;
// // // // //     }
// // // // //     setLocationWatching(false);
// // // // //   };

// // // // //   const handleClick = () => {
// // // // //     const now = Date.now();
// // // // //     if (now - lastPressRef.current < 1500) {
// // // // //       // confirmed - start countdown and location watching
// // // // //       if (!locationWatching) {
// // // // //         const started = startLocationWatching();
// // // // //         if (!started) return;
// // // // //       }
// // // // //       startCountdown();
// // // // //     } else {
// // // // //       lastPressRef.current = now;
// // // // //       speak("Press the SOS button again within 1.5 seconds to confirm emergency");
// // // // //       setStatus("Press again to confirm SOS emergency");
      
// // // // //       setTimeout(() => {
// // // // //         if (!countdown) {
// // // // //           setStatus("");
// // // // //         }
// // // // //       }, 2000);
// // // // //     }
// // // // //   };

// // // // //   const startCountdown = () => {
// // // // //     let count = 5;
// // // // //     setCountdown(count);
// // // // //     setStatus(`Emergency alert will be sent in ${count} seconds with live location...`);
    
// // // // //     speak(`Emergency alert confirmed. Sending in ${count} seconds.`);
    
// // // // //     countdownRef.current = setInterval(() => {
// // // // //       count -= 1;
// // // // //       setCountdown(count);
      
// // // // //       if (count === 0) {
// // // // //         clearInterval(countdownRef.current);
// // // // //         sendSOS();
// // // // //       } else {
// // // // //         setStatus(`Emergency alert will be sent in ${count} seconds with live location...`);
// // // // //       }
// // // // //     }, 1000);
// // // // //   };

// // // // //   const cancelSOS = () => {
// // // // //     if (countdownRef.current) {
// // // // //       clearInterval(countdownRef.current);
// // // // //       countdownRef.current = null;
// // // // //     }
// // // // //     setCountdown(null);
// // // // //     setStatus("SOS cancelled");
// // // // //     speak("Emergency alert cancelled");
    
// // // // //     // Stop location watching if no longer needed
// // // // //     if (watchIdRef.current) {
// // // // //       stopLocationWatching();
// // // // //     }
    
// // // // //     setTimeout(() => {
// // // // //       setStatus("");
// // // // //     }, 2000);
// // // // //   };

// // // // //   const handleAlertTypeChange = (e) => {
// // // // //     setAlertType(e.target.value);
// // // // //   };

// // // // //   const handleMessageChange = (e) => {
// // // // //     setCustomMessage(e.target.value);
// // // // //   };

// // // // //   const handleResetMessage = () => {
// // // // //     setCustomMessage("Emergency! Please help me.");
// // // // //   };

// // // // //   // Format decimal to max 6 places
// // // // //   const formatDecimal = (num) => {
// // // // //     if (num === null || num === undefined) return "";
// // // // //     const rounded = parseFloat(num.toFixed(6));
// // // // //     return rounded.toString();
// // // // //   };

// // // // //   async function sendSOS() {
// // // // //     setSending(true);
// // // // //     setError("");
    
// // // // //     // Get the most recent location
// // // // //     const currentLocation = lastLocationRef.current;
    
// // // // //     if (!currentLocation) {
// // // // //       const errorMsg = "Unable to get your current location. Please try again.";
// // // // //       setError(errorMsg);
// // // // //       speak(errorMsg);
// // // // //       setSending(false);
// // // // //       stopLocationWatching();
// // // // //       return;
// // // // //     }

// // // // //     try {
// // // // //       // Format coordinates to max 6 decimal places
// // // // //       const lat = formatDecimal(currentLocation.lat);
// // // // //       const lng = formatDecimal(currentLocation.lng);
      
// // // // //       // Get current time in IST
// // // // //       const now = new Date();
// // // // //       const istTime = now.toLocaleTimeString('en-IN', {
// // // // //         hour: '2-digit',
// // // // //         minute: '2-digit',
// // // // //         second: '2-digit',
// // // // //         hour12: true
// // // // //       });
      
// // // // //       const locationData = {
// // // // //         alert_type: alertType,
// // // // //         message: customMessage.trim() || "Emergency! Please help me.",
// // // // //         location_text: `Live Location - Lat: ${lat}, Lng: ${lng}, Accuracy: ${Math.round(currentLocation.accuracy)}m, Time: ${istTime} IST`,
// // // // //         location_lat: lat,
// // // // //         location_lng: lng,
// // // // //         is_active: true,
// // // // //       };
      
// // // // //       console.log("Sending SOS with live location:", locationData);
      
// // // // //       setStatus("Sending emergency alert with live location...");
// // // // //       speak("Sending emergency alert with your current live location");

// // // // //       // Build payload for POST to /api/emergency-alerts/ ONLY
// // // // //       const file = inputRef.current?.files?.[0];
// // // // //       let response;

// // // // //       if (file) {
// // // // //         const fd = new FormData();
// // // // //         Object.entries(locationData).forEach(([key, value]) => {
// // // // //           fd.append(key, value);
// // // // //         });
// // // // //         fd.append("image", file);

// // // // //         response = await post("/api/emergency-alerts/", fd, {
// // // // //           headers: { "Content-Type": "multipart/form-data" },
// // // // //         });
// // // // //       } else {
// // // // //         response = await post("/api/emergency-alerts/", locationData);
// // // // //       }

// // // // //       // Success
// // // // //       const successMsg = response.data?.message || "Emergency alert sent successfully with your live location!";
// // // // //       setStatus(successMsg);
// // // // //       speak("Emergency alert sent successfully with live location. Help is on the way.");

// // // // //       // Trigger vibration if supported
// // // // //       if ("vibrate" in navigator) {
// // // // //         navigator.vibrate([200, 100, 200, 100, 200, 100, 200]);
// // // // //       }

// // // // //       // Keep tracking location for a few more seconds in case they move
// // // // //       setTimeout(() => {
// // // // //         stopLocationWatching();
// // // // //         setStatus("");
// // // // //         setSending(false);
// // // // //         setAlertType("sos");
// // // // //         setCustomMessage("Emergency! Please help me.");
// // // // //       }, 7000);

// // // // //     } catch (err) {
// // // // //       console.error("sendSOS error:", err);
// // // // //       console.error("Error response data:", err.response?.data);
      
// // // // //       let errorMsg = "Failed to send emergency alert. Please try again.";
// // // // //       if (err.response?.data) {
// // // // //         if (err.response.data.detail) {
// // // // //           errorMsg = err.response.data.detail;
// // // // //         } else if (typeof err.response.data === 'object') {
// // // // //           const errors = [];
// // // // //           Object.entries(err.response.data).forEach(([field, messages]) => {
// // // // //             if (Array.isArray(messages)) {
// // // // //               errors.push(...messages.map(m => `${field}: ${m}`));
// // // // //             } else if (typeof messages === 'string') {
// // // // //               errors.push(`${field}: ${messages}`);
// // // // //             }
// // // // //           });
// // // // //           if (errors.length > 0) {
// // // // //             errorMsg = errors.join(', ');
// // // // //           }
// // // // //         } else if (typeof err.response.data === 'string') {
// // // // //           errorMsg = err.response.data;
// // // // //         }
// // // // //       }
      
// // // // //       setError(errorMsg);
// // // // //       speak("Failed to send emergency alert");
// // // // //       setSending(false);
// // // // //       stopLocationWatching();
// // // // //     }
// // // // //   }

// // // // //   const getAlertTypeLabel = (type) => {
// // // // //     const labels = {
// // // // //       "sos": "🚨 General Emergency",
// // // // //       "medical": "🏥 Medical Emergency",
// // // // //       "safety": "🛡️ Safety Threat",
// // // // //       "fire": "🔥 Fire Emergency",
// // // // //       "accident": "🚗 Accident",
// // // // //       "lost": "🧭 Lost/Disoriented",
// // // // //       "other": "⚠️ Other Emergency"
// // // // //     };
// // // // //     return labels[type] || "🚨 Emergency";
// // // // //   };

// // // // //   const getAccuracyColor = (accuracy) => {
// // // // //     if (accuracy < 20) return "#4CAF50"; // Green - High accuracy
// // // // //     if (accuracy < 100) return "#FF9800"; // Orange - Medium accuracy
// // // // //     return "#F44336"; // Red - Low accuracy
// // // // //   };

// // // // //   return (
// // // // //     <div className="sos-page-container">
// // // // //       {/* Back Button Header */}
// // // // //       <div className="sos-page-header">
// // // // //         <button className="back-button" onClick={handleBackToDashboard}>
// // // // //           ← Back to Dashboard
// // // // //         </button>
// // // // //       </div>

// // // // //       <div className="sos-container">
// // // // //         {showHeader && (
// // // // //           <div className="sos-header">
// // // // //             <h2>🚨 Emergency SOS</h2>
// // // // //             <p className="sos-description">
// // // // //               In case of emergency, double-tap the SOS button. 
// // // // //               Your live location will be continuously tracked and sent to emergency contacts.
// // // // //             </p>
// // // // //           </div>
// // // // //         )}

// // // // //         {/* Live Location Status */}
// // // // //         {locationWatching && !sending && (
// // // // //           <div className="live-location-status">
// // // // //             <div className="live-indicator">
// // // // //               <span className="live-pulse"></span>
// // // // //               <span className="live-text">LIVE LOCATION ACTIVE</span>
// // // // //             </div>
// // // // //             <div className="accuracy-indicator">
// // // // //               <div 
// // // // //                 className="accuracy-bar" 
// // // // //                 style={{ 
// // // // //                   width: `${Math.min(100, (1 / (locationAccuracy || 100)) * 1000)}%`,
// // // // //                   backgroundColor: getAccuracyColor(locationAccuracy || 100)
// // // // //                 }}
// // // // //               ></div>
// // // // //               <span className="accuracy-text">
// // // // //                 Accuracy: {locationAccuracy ? Math.round(locationAccuracy) : '--'} meters
// // // // //               </span>
// // // // //             </div>
// // // // //           </div>
// // // // //         )}

// // // // //         {/* Status Messages */}
// // // // //         {status && (
// // // // //           <div className={`status-message ${countdown ? 'countdown-active' : ''}`}>
// // // // //             {countdown && (
// // // // //               <div className="countdown-circle">
// // // // //                 <span>{countdown}</span>
// // // // //               </div>
// // // // //             )}
// // // // //             <div className="status-content">
// // // // //               <p className="status-text">{status}</p>
// // // // //               {countdown && (
// // // // //                 <button className="cancel-button" onClick={cancelSOS}>
// // // // //                   Cancel Emergency
// // // // //                 </button>
// // // // //               )}
// // // // //             </div>
// // // // //           </div>
// // // // //         )}

// // // // //         {error && (
// // // // //           <div className="error-message">
// // // // //             <div className="error-icon">⚠️</div>
// // // // //             <div className="error-content">
// // // // //               <p className="error-text">{error}</p>
// // // // //               <button className="retry-button" onClick={() => setError("")}>
// // // // //                 Dismiss
// // // // //               </button>
// // // // //             </div>
// // // // //           </div>
// // // // //         )}

// // // // //         {/* Alert Type Selection */}
// // // // //         <div className="config-section">
// // // // //           <label htmlFor="alert-type" className="section-label">
// // // // //             <span className="section-icon">📋</span>
// // // // //             Type of Emergency
// // // // //           </label>
// // // // //           <select
// // // // //             id="alert-type"
// // // // //             value={alertType}
// // // // //             onChange={handleAlertTypeChange}
// // // // //             className="alert-type-select"
// // // // //             disabled={sending || countdown || locationWatching}
// // // // //           >
// // // // //             <option value="sos">🚨 General Emergency (SOS)</option>
// // // // //             <option value="medical">🏥 Medical Emergency</option>
// // // // //             <option value="safety">🛡️ Safety Threat</option>
// // // // //             <option value="fire">🔥 Fire Emergency</option>
// // // // //             <option value="accident">🚗 Accident</option>
// // // // //             <option value="lost">🧭 Lost/Disoriented</option>
// // // // //             <option value="other">⚠️ Other Emergency</option>
// // // // //           </select>
// // // // //         </div>

// // // // //         {/* Custom Message */}
// // // // //         <div className="config-section">
// // // // //           <label htmlFor="message" className="section-label">
// // // // //             <span className="section-icon">✏️</span>
// // // // //             Emergency Message
// // // // //           </label>
// // // // //           <div className="message-container">
// // // // //             <textarea
// // // // //               id="message"
// // // // //               value={customMessage}
// // // // //               onChange={handleMessageChange}
// // // // //               placeholder="Describe your emergency situation..."
// // // // //               className="message-input"
// // // // //               rows="3"
// // // // //               disabled={sending || countdown || locationWatching}
// // // // //             />
// // // // //             <button
// // // // //               type="button"
// // // // //               className="reset-button"
// // // // //               onClick={handleResetMessage}
// // // // //               disabled={sending || countdown || locationWatching}
// // // // //             >
// // // // //               Reset
// // // // //             </button>
// // // // //           </div>
// // // // //           <p className="field-hint">
// // // // //             This message will be emailed to your emergency contacts
// // // // //           </p>
// // // // //         </div>

// // // // //         {/* Image Upload */}
// // // // //         <div className="config-section">
// // // // //           <label className="section-label">
// // // // //             <span className="section-icon">📷</span>
// // // // //             Attach Photo (Optional)
// // // // //           </label>
// // // // //           <div className="upload-container">
// // // // //             <label className="upload-label">
// // // // //               <input
// // // // //                 ref={inputRef}
// // // // //                 type="file"
// // // // //                 accept="image/*"
// // // // //                 capture="environment"
// // // // //                 className="file-input"
// // // // //                 aria-label="Attach photo for emergency"
// // // // //                 disabled={sending || countdown || locationWatching}
// // // // //               />
// // // // //               <span className="upload-button">
// // // // //                 <span className="upload-icon">📸</span>
// // // // //                 <span className="upload-text">Take Photo</span>
// // // // //               </span>
// // // // //             </label>
// // // // //             <p className="upload-hint">
// // // // //               A photo of your surroundings can help responders locate you faster
// // // // //             </p>
// // // // //           </div>
// // // // //         </div>

// // // // //         {/* SOS Button */}
// // // // //         <div className="sos-button-section">
// // // // //           <button
// // // // //             onClick={handleClick}
// // // // //             disabled={sending || countdown}
// // // // //             className={`sos-main-button ${countdown ? 'countdown-active' : ''} ${locationWatching ? 'location-active' : ''}`}
// // // // //             aria-label="Send SOS emergency alert"
// // // // //           >
// // // // //             {sending ? (
// // // // //               <>
// // // // //                 <span className="button-spinner"></span>
// // // // //                 <span className="button-text">Sending Live Location Alert...</span>
// // // // //               </>
// // // // //             ) : countdown ? (
// // // // //               <>
// // // // //                 <span className="countdown-animation"></span>
// // // // //                 <span className="button-text">Cancel Emergency</span>
// // // // //               </>
// // // // //             ) : locationWatching ? (
// // // // //               <>
// // // // //                 <span className="live-location-icon">📍</span>
// // // // //                 <span className="button-text">TRACKING LIVE LOCATION</span>
// // // // //               </>
// // // // //             ) : (
// // // // //               <>
// // // // //                 <span className="sos-main-icon">🚨</span>
// // // // //                 <span className="button-text">SOS EMERGENCY</span>
// // // // //               </>
// // // // //             )}
// // // // //           </button>
          
// // // // //           {!sending && !countdown && !locationWatching && (
// // // // //             <div className="sos-instruction">
// // // // //               <p className="instruction-text">
// // // // //                 <span className="instruction-icon">⚠️</span>
// // // // //                 Double-tap to activate live location tracking and emergency alert
// // // // //               </p>
// // // // //             </div>
// // // // //           )}
          
// // // // //           {locationWatching && !countdown && (
// // // // //             <div className="location-instruction">
// // // // //               <p className="instruction-text">
// // // // //                 <span className="instruction-icon">📍</span>
// // // // //                 Your location is being tracked live. Press again to send emergency alert.
// // // // //               </p>
// // // // //             </div>
// // // // //           )}
// // // // //         </div>

// // // // //         {/* Current Location Display */}
// // // // //         {location && (
// // // // //           <div className="current-location-section">
// // // // //             <h3 className="location-title">
// // // // //               <span className="location-icon">📍</span>
// // // // //               Current Live Location
// // // // //             </h3>
// // // // //             <div className="location-grid">
// // // // //               <div className="location-item">
// // // // //                 <span className="location-label">Latitude:</span>
// // // // //                 <span className="location-value coordinate">{location.lat.toFixed(6)}</span>
// // // // //               </div>
// // // // //               <div className="location-item">
// // // // //                 <span className="location-label">Longitude:</span>
// // // // //                 <span className="location-value coordinate">{location.lng.toFixed(6)}</span>
// // // // //               </div>
// // // // //               <div className="location-item">
// // // // //                 <span className="location-label">Accuracy:</span>
// // // // //                 <span className="location-value" style={{ color: getAccuracyColor(location.accuracy) }}>
// // // // //                   {Math.round(location.accuracy)} meters
// // // // //                 </span>
// // // // //               </div>
// // // // //               <div className="location-item">
// // // // //                 <span className="location-label">Last Updated:</span>
// // // // //                 <span className="location-value">
// // // // //                   {formatTime(location.timestamp)}
// // // // //                 </span>
// // // // //               </div>
// // // // //             </div>
// // // // //             <div className="map-actions">
// // // // //               <a
// // // // //                 href={`https://maps.google.com/?q=${location.lat},${location.lng}`}
// // // // //                 target="_blank"
// // // // //                 rel="noopener noreferrer"
// // // // //                 className="map-link-button"
// // // // //               >
// // // // //                 <span className="map-icon">🗺️</span>
// // // // //                 View Current Location on Google Maps
// // // // //               </a>
// // // // //               <button
// // // // //                 className="refresh-location-button"
// // // // //                 onClick={() => {
// // // // //                   if (watchIdRef.current) {
// // // // //                     navigator.geolocation.clearWatch(watchIdRef.current);
// // // // //                     startLocationWatching();
// // // // //                   }
// // // // //                 }}
// // // // //               >
// // // // //                 <span className="refresh-icon">🔄</span>
// // // // //                 Refresh Location
// // // // //               </button>
// // // // //             </div>
// // // // //           </div>
// // // // //         )}

// // // // //         {/* Information Panel */}
// // // // //         <div className="info-panel">
// // // // //           <h3 className="info-title">
// // // // //             <span className="info-icon">ℹ️</span>
// // // // //             How Live Location SOS Works
// // // // //           </h3>
// // // // //           <ul className="info-list">
// // // // //             <li className="info-item">
// // // // //               <span className="bullet">📍</span>
// // // // //               <strong>Live Tracking:</strong> When activated, your location is continuously tracked using GPS
// // // // //             </li>
// // // // //             <li className="info-item">
// // // // //               <span className="bullet">🚨</span>
// // // // //               <strong>Double-tap Safety:</strong> Prevents accidental activation - requires two quick presses
// // // // //             </li>
// // // // //             <li className="info-item">
// // // // //               <span className="bullet">⏱️</span>
// // // // //               <strong>5-second Countdown:</strong> Gives you time to cancel before sending
// // // // //             </li>
// // // // //             <li className="info-item">
// // // // //               <span className="bullet">📧</span>
// // // // //               <strong>Email Notifications:</strong> Your emergency contacts receive emails with your exact location
// // // // //             </li>
// // // // //             <li className="info-item">
// // // // //               <span className="bullet">🎯</span>
// // // // //               <strong>High Accuracy:</strong> Uses GPS, Wi-Fi, and cellular data for precise location
// // // // //             </li>
// // // // //           </ul>
// // // // //         </div>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }



// // // // // src/components/SOS/SOSButton.jsx
// // // // import React, { useState, useRef, useEffect } from "react";
// // // // import { useNavigate } from "react-router-dom";
// // // // import { post } from "../../services/api";
// // // // import "./SOSButton.css";

// // // // function speak(text) {
// // // //   if ("speechSynthesis" in window) {
// // // //     window.speechSynthesis.cancel();
// // // //     const utter = new SpeechSynthesisUtterance(text);
// // // //     utter.rate = 0.8;
// // // //     utter.volume = 1.0;
// // // //     window.speechSynthesis.speak(utter);
// // // //   }
// // // // }

// // // // // Format time to Indian Standard Time (IST) or local time
// // // // const formatTime = (dateString) => {
// // // //   const date = new Date(dateString);
// // // //   return date.toLocaleTimeString('en-IN', {
// // // //     hour: '2-digit',
// // // //     minute: '2-digit',
// // // //     second: '2-digit',
// // // //     hour12: true
// // // //   }) + ' IST';
// // // // };

// // // // // Format decimal to max 6 places
// // // // const formatDecimal = (num) => {
// // // //   if (num === null || num === undefined) return "";
// // // //   const rounded = parseFloat(num.toFixed(6));
// // // //   return rounded;
// // // // };

// // // // // Get location with fallback methods
// // // // const getCurrentLocation = () => {
// // // //   return new Promise((resolve, reject) => {
// // // //     if (!("geolocation" in navigator)) {
// // // //       reject(new Error("Geolocation not supported"));
// // // //       return;
// // // //     }

// // // //     // First try with high accuracy
// // // //     navigator.geolocation.getCurrentPosition(
// // // //       (position) => {
// // // //         resolve({
// // // //           lat: position.coords.latitude,
// // // //           lng: position.coords.longitude,
// // // //           accuracy: position.coords.accuracy,
// // // //           timestamp: new Date().toISOString(),
// // // //         });
// // // //       },
// // // //       (error) => {
// // // //         console.log("High accuracy failed, trying with lower accuracy...", error);
        
// // // //         // Fallback to lower accuracy
// // // //         navigator.geolocation.getCurrentPosition(
// // // //           (position) => {
// // // //             resolve({
// // // //               lat: position.coords.latitude,
// // // //               lng: position.coords.longitude,
// // // //               accuracy: position.coords.accuracy,
// // // //               timestamp: new Date().toISOString(),
// // // //             });
// // // //           },
// // // //           (fallbackError) => {
// // // //             // Try IP-based location as last resort
// // // //             fetch('https://ipapi.co/json/')
// // // //               .then(response => response.json())
// // // //               .then(data => {
// // // //                 if (data.latitude && data.longitude) {
// // // //                   resolve({
// // // //                     lat: data.latitude,
// // // //                     lng: data.longitude,
// // // //                     accuracy: 50000, // Approximate accuracy for IP-based location
// // // //                     timestamp: new Date().toISOString(),
// // // //                     source: 'ip',
// // // //                   });
// // // //                 } else {
// // // //                   reject(fallbackError);
// // // //                 }
// // // //               })
// // // //               .catch(ipError => {
// // // //                 reject(fallbackError);
// // // //               });
// // // //           },
// // // //           {
// // // //             enableHighAccuracy: false,
// // // //             timeout: 10000,
// // // //             maximumAge: 60000
// // // //           }
// // // //         );
// // // //       },
// // // //       {
// // // //         enableHighAccuracy: true,
// // // //         timeout: 15000,
// // // //         maximumAge: 0
// // // //       }
// // // //     );
// // // //   });
// // // // };

// // // // export default function SOSButton({ 
// // // //   showHeader = true 
// // // // }) {
// // // //   const navigate = useNavigate();
// // // //   const [sending, setSending] = useState(false);
// // // //   const [status, setStatus] = useState("");
// // // //   const [error, setError] = useState("");
// // // //   const [countdown, setCountdown] = useState(null);
// // // //   const [location, setLocation] = useState(null);
// // // //   const [alertType, setAlertType] = useState("sos");
// // // //   const [customMessage, setCustomMessage] = useState("Emergency! Please help me.");
// // // //   const [locationWatching, setLocationWatching] = useState(false);
// // // //   const [locationAccuracy, setLocationAccuracy] = useState(null);
  
// // // //   const watchIdRef = useRef(null);
// // // //   const lastLocationRef = useRef(null);
  
// // // //   // Safety: require double-press within 1.5s to confirm
// // // //   const lastPressRef = useRef(0);
// // // //   const countdownRef = useRef(null);

// // // //   // Cleanup location watcher on component unmount
// // // //   useEffect(() => {
// // // //     return () => {
// // // //       if (watchIdRef.current !== null) {
// // // //         navigator.geolocation.clearWatch(watchIdRef.current);
// // // //       }
// // // //     };
// // // //   }, []);

// // // //   const handleBackToDashboard = () => {
// // // //     navigate("/dashboard");
// // // //   };

// // // //   // Start watching location
// // // //   const startLocationWatching = () => {
// // // //     if (!("geolocation" in navigator)) {
// // // //       const errorMsg = "Geolocation not supported by your device";
// // // //       setError(errorMsg);
// // // //       speak(errorMsg);
// // // //       return false;
// // // //     }

// // // //     setStatus("Getting your live location...");
// // // //     speak("Getting your live location. Please wait for accurate GPS.");

// // // //     watchIdRef.current = navigator.geolocation.watchPosition(
// // // //       (position) => {
// // // //         const newLocation = {
// // // //           lat: position.coords.latitude,
// // // //           lng: position.coords.longitude,
// // // //           accuracy: position.coords.accuracy,
// // // //           timestamp: new Date().toISOString(),
// // // //           source: 'gps'
// // // //         };
        
// // // //         lastLocationRef.current = newLocation;
// // // //         setLocation(newLocation);
// // // //         setLocationAccuracy(position.coords.accuracy);
// // // //         setLocationWatching(true);
        
// // // //         if (position.coords.accuracy < 50) {
// // // //           // Good accuracy achieved
// // // //           setStatus("Live location tracking active (High accuracy)");
// // // //         } else if (position.coords.accuracy < 200) {
// // // //           setStatus("Live location tracking active (Medium accuracy)");
// // // //         } else {
// // // //           setStatus("Live location tracking active (Low accuracy)");
// // // //         }
// // // //       },
// // // //       (err) => {
// // // //         console.error("Location watch error:", err);
// // // //         let errorMsg;
// // // //         switch(err.code) {
// // // //           case err.PERMISSION_DENIED:
// // // //             errorMsg = "Location access denied. Please enable location services.";
// // // //             break;
// // // //           case err.POSITION_UNAVAILABLE:
// // // //             errorMsg = "Location information is unavailable.";
// // // //             break;
// // // //           case err.TIMEOUT:
// // // //             errorMsg = "Location request timed out.";
// // // //             break;
// // // //           default:
// // // //             errorMsg = "Unable to get live location.";
// // // //         }
// // // //         setError(errorMsg);
// // // //         speak("Unable to get live location");
// // // //         setLocationWatching(false);
// // // //       },
// // // //       {
// // // //         enableHighAccuracy: true,
// // // //         timeout: 10000,
// // // //         maximumAge: 0,
// // // //         distanceFilter: 10, // Update only when moved 10 meters
// // // //       }
// // // //     );

// // // //     return true;
// // // //   };

// // // //   // Stop watching location
// // // //   const stopLocationWatching = () => {
// // // //     if (watchIdRef.current !== null) {
// // // //       navigator.geolocation.clearWatch(watchIdRef.current);
// // // //       watchIdRef.current = null;
// // // //     }
// // // //     setLocationWatching(false);
// // // //   };

// // // //   const handleClick = () => {
// // // //     const now = Date.now();
// // // //     if (now - lastPressRef.current < 1500) {
// // // //       // confirmed - start countdown and location watching
// // // //       if (!locationWatching) {
// // // //         const started = startLocationWatching();
// // // //         if (!started) return;
// // // //       }
// // // //       startCountdown();
// // // //     } else {
// // // //       lastPressRef.current = now;
// // // //       speak("Press the SOS button again within 1.5 seconds to confirm emergency");
// // // //       setStatus("Press again to confirm SOS emergency");
      
// // // //       setTimeout(() => {
// // // //         if (!countdown) {
// // // //           setStatus("");
// // // //         }
// // // //       }, 2000);
// // // //     }
// // // //   };

// // // //   const startCountdown = () => {
// // // //     let count = 5;
// // // //     setCountdown(count);
// // // //     setStatus(`Emergency alert will be sent in ${count} seconds with live location...`);
    
// // // //     speak(`Emergency alert confirmed. Sending in ${count} seconds.`);
    
// // // //     countdownRef.current = setInterval(() => {
// // // //       count -= 1;
// // // //       setCountdown(count);
      
// // // //       if (count === 0) {
// // // //         clearInterval(countdownRef.current);
// // // //         sendSOS();
// // // //       } else {
// // // //         setStatus(`Emergency alert will be sent in ${count} seconds with live location...`);
// // // //       }
// // // //     }, 1000);
// // // //   };

// // // //   const cancelSOS = () => {
// // // //     if (countdownRef.current) {
// // // //       clearInterval(countdownRef.current);
// // // //       countdownRef.current = null;
// // // //     }
// // // //     setCountdown(null);
// // // //     setStatus("SOS cancelled");
// // // //     speak("Emergency alert cancelled");
    
// // // //     // Stop location watching if no longer needed
// // // //     if (watchIdRef.current) {
// // // //       stopLocationWatching();
// // // //     }
    
// // // //     setTimeout(() => {
// // // //       setStatus("");
// // // //     }, 2000);
// // // //   };

// // // //   const handleAlertTypeChange = (e) => {
// // // //     setAlertType(e.target.value);
// // // //   };

// // // //   const handleMessageChange = (e) => {
// // // //     setCustomMessage(e.target.value);
// // // //   };

// // // //   const handleResetMessage = () => {
// // // //     setCustomMessage("Emergency! Please help me.");
// // // //   };

// // // //   async function sendSOS() {
// // // //     setSending(true);
// // // //     setError("");
    
// // // //     try {
// // // //       // Try to get the most recent location from watch
// // // //       let currentLocation = lastLocationRef.current;
// // // //       let locationSource = 'gps_watch';
      
// // // //       // If we don't have live location, try to get it now
// // // //       if (!currentLocation) {
// // // //         try {
// // // //           setStatus("Getting your current location...");
// // // //           speak("Getting your current location");
          
// // // //           currentLocation = await getCurrentLocation();
// // // //           locationSource = currentLocation.source || 'gps_single';
// // // //         } catch (locationError) {
// // // //           console.warn("Could not get precise location, will send without location", locationError);
// // // //           currentLocation = null;
// // // //         }
// // // //       }
      
// // // //       // Format coordinates if we have them
// // // //       let lat = null;
// // // //       let lng = null;
// // // //       let locationText = "";
      
// // // //       if (currentLocation) {
// // // //         lat = formatDecimal(currentLocation.lat);
// // // //         lng = formatDecimal(currentLocation.lng);
        
// // // //         const istTime = new Date().toLocaleTimeString('en-IN', {
// // // //           hour: '2-digit',
// // // //           minute: '2-digit',
// // // //           second: '2-digit',
// // // //           hour12: true
// // // //         });
        
// // // //         const accuracyMeters = Math.round(currentLocation.accuracy);
// // // //         locationText = `Location - Lat: ${lat}, Lng: ${lng}, Accuracy: ${accuracyMeters}m, Time: ${istTime} IST`;
        
// // // //         if (locationSource === 'ip') {
// // // //           locationText = `Approximate Location (IP-based) - Lat: ${lat}, Lng: ${lng}, Accuracy: ~50km, Time: ${istTime} IST`;
// // // //         }
// // // //       } else {
// // // //         // If no location, still send emergency but indicate no location
// // // //         const istTime = new Date().toLocaleTimeString('en-IN', {
// // // //           hour: '2-digit',
// // // //           minute: '2-digit',
// // // //           second: '2-digit',
// // // //           hour12: true
// // // //         });
// // // //         locationText = `Location unavailable - Time: ${istTime} IST`;
// // // //       }
      
// // // //       // Build the payload for POST
// // // //       const alertData = {
// // // //         alert_type: alertType,
// // // //         message: customMessage.trim() || "Emergency! Please help me.",
// // // //         location_text: locationText,
// // // //         is_active: true,
// // // //       };
      
// // // //       // Only include coordinates if we have them
// // // //       if (lat !== null && lng !== null) {
// // // //         alertData.location_lat = lat;
// // // //         alertData.location_lng = lng;
// // // //       }
      
// // // //       console.log("Sending SOS alert:", alertData);
      
// // // //       setStatus("Sending emergency alert...");
// // // //       speak("Sending emergency alert");
      
// // // //       // Send to backend
// // // //       const response = await post("/api/emergency-alerts/", alertData);
      
// // // //       // Success
// // // //       const successMsg = response.data?.message || "Emergency alert sent successfully!";
// // // //       setStatus(successMsg);
      
// // // //       if (currentLocation) {
// // // //         speak("Emergency alert sent successfully with your location. Help is on the way.");
// // // //       } else {
// // // //         speak("Emergency alert sent successfully. Location could not be obtained. Help is on the way.");
// // // //       }
      
// // // //       // Trigger vibration if supported
// // // //       if ("vibrate" in navigator) {
// // // //         navigator.vibrate([200, 100, 200, 100, 200, 100, 200]);
// // // //       }
      
// // // //       // Reset after success
// // // //       setTimeout(() => {
// // // //         stopLocationWatching();
// // // //         setStatus("");
// // // //         setSending(false);
// // // //         setAlertType("sos");
// // // //         setCustomMessage("Emergency! Please help me.");
// // // //         setLocation(null);
// // // //         setLocationWatching(false);
// // // //       }, 7000);

// // // //     } catch (err) {
// // // //       console.error("sendSOS error:", err);
// // // //       console.error("Error response data:", err.response?.data);
      
// // // //       let errorMsg = "Failed to send emergency alert. Please try again.";
// // // //       if (err.response?.data) {
// // // //         if (err.response.data.detail) {
// // // //           errorMsg = err.response.data.detail;
// // // //         } else if (typeof err.response.data === 'object') {
// // // //           const errors = [];
// // // //           Object.entries(err.response.data).forEach(([field, messages]) => {
// // // //             if (Array.isArray(messages)) {
// // // //               errors.push(...messages.map(m => `${field}: ${m}`));
// // // //             } else if (typeof messages === 'string') {
// // // //               errors.push(`${field}: ${messages}`);
// // // //             }
// // // //           });
// // // //           if (errors.length > 0) {
// // // //             errorMsg = errors.join(', ');
// // // //           }
// // // //         } else if (typeof err.response.data === 'string') {
// // // //           errorMsg = err.response.data;
// // // //         }
// // // //       }
      
// // // //       setError(errorMsg);
// // // //       speak("Failed to send emergency alert");
// // // //       setSending(false);
// // // //       stopLocationWatching();
// // // //     }
// // // //   }

// // // //   const getAccuracyColor = (accuracy) => {
// // // //     if (!accuracy) return "#757575"; // Gray - unknown
// // // //     if (accuracy < 20) return "#4CAF50"; // Green - High accuracy
// // // //     if (accuracy < 100) return "#FF9800"; // Orange - Medium accuracy
// // // //     if (accuracy < 5000) return "#F44336"; // Red - Low accuracy
// // // //     return "#9C27B0"; // Purple - Very low accuracy (IP-based)
// // // //   };

// // // //   const getAccuracyLabel = (accuracy) => {
// // // //     if (!accuracy) return "Unknown";
// // // //     if (accuracy < 20) return "High";
// // // //     if (accuracy < 100) return "Medium";
// // // //     if (accuracy < 5000) return "Low";
// // // //     return "Approximate";
// // // //   };

// // // //   // Get current location on demand
// // // //   const getOneTimeLocation = async () => {
// // // //     try {
// // // //       setStatus("Getting your current location...");
// // // //       speak("Getting your current location");
      
// // // //       const location = await getCurrentLocation();
// // // //       setLocation(location);
// // // //       lastLocationRef.current = location;
// // // //       setLocationAccuracy(location.accuracy);
      
// // // //       const accuracyLabel = getAccuracyLabel(location.accuracy);
// // // //       const message = `Location obtained (${accuracyLabel} accuracy)`;
// // // //       setStatus(message);
// // // //       speak(`Location obtained with ${accuracyLabel} accuracy`);
      
// // // //       return location;
// // // //     } catch (error) {
// // // //       console.error("Failed to get location:", error);
// // // //       const errorMsg = "Could not get your current location. Try moving to an open area.";
// // // //       setError(errorMsg);
// // // //       speak("Could not get location");
// // // //       return null;
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div className="sos-page-container">
// // // //       {/* Back Button Header */}
// // // //       <div className="sos-page-header">
// // // //         <button className="back-button" onClick={handleBackToDashboard}>
// // // //           ← Back to Dashboard
// // // //         </button>
// // // //       </div>

// // // //       <div className="sos-container">
// // // //         {showHeader && (
// // // //           <div className="sos-header">
// // // //             <h2>🚨 Emergency SOS</h2>
// // // //             <p className="sos-description">
// // // //               In case of emergency, double-tap the SOS button. 
// // // //               Your location will be sent to emergency contacts.
// // // //             </p>
// // // //           </div>
// // // //         )}

// // // //         {/* Live Location Status */}
// // // //         {locationWatching && !sending && (
// // // //           <div className="live-location-status">
// // // //             <div className="live-indicator">
// // // //               <span className="live-pulse"></span>
// // // //               <span className="live-text">LIVE LOCATION ACTIVE</span>
// // // //             </div>
// // // //             <div className="accuracy-indicator">
// // // //               <div 
// // // //                 className="accuracy-bar" 
// // // //                 style={{ 
// // // //                   width: `${Math.min(100, (1 / (locationAccuracy || 100)) * 1000)}%`,
// // // //                   backgroundColor: getAccuracyColor(locationAccuracy || 100)
// // // //                 }}
// // // //               ></div>
// // // //               <span className="accuracy-text">
// // // //                 Accuracy: {getAccuracyLabel(locationAccuracy)} ({locationAccuracy ? Math.round(locationAccuracy) : '--'} meters)
// // // //               </span>
// // // //             </div>
// // // //           </div>
// // // //         )}

// // // //         {/* Status Messages */}
// // // //         {status && (
// // // //           <div className={`status-message ${countdown ? 'countdown-active' : ''}`}>
// // // //             {countdown && (
// // // //               <div className="countdown-circle">
// // // //                 <span>{countdown}</span>
// // // //               </div>
// // // //             )}
// // // //             <div className="status-content">
// // // //               <p className="status-text">{status}</p>
// // // //               {countdown && (
// // // //                 <button className="cancel-button" onClick={cancelSOS}>
// // // //                   Cancel Emergency
// // // //                 </button>
// // // //               )}
// // // //             </div>
// // // //           </div>
// // // //         )}

// // // //         {error && (
// // // //           <div className="error-message">
// // // //             <div className="error-icon">⚠️</div>
// // // //             <div className="error-content">
// // // //               <p className="error-text">{error}</p>
// // // //               <button className="retry-button" onClick={() => setError("")}>
// // // //                 Dismiss
// // // //               </button>
// // // //             </div>
// // // //           </div>
// // // //         )}

// // // //         {/* Alert Type Selection */}
// // // //         <div className="config-section">
// // // //           <label htmlFor="alert-type" className="section-label">
// // // //             <span className="section-icon">📋</span>
// // // //             Type of Emergency
// // // //           </label>
// // // //           <select
// // // //             id="alert-type"
// // // //             value={alertType}
// // // //             onChange={handleAlertTypeChange}
// // // //             className="alert-type-select"
// // // //             disabled={sending || countdown || locationWatching}
// // // //           >
// // // //             <option value="sos">🚨 General Emergency (SOS)</option>
// // // //             <option value="medical">🏥 Medical Emergency</option>
// // // //             <option value="safety">🛡️ Safety Threat</option>
// // // //             <option value="fire">🔥 Fire Emergency</option>
// // // //             <option value="accident">🚗 Accident</option>
// // // //             <option value="lost">🧭 Lost/Disoriented</option>
// // // //             <option value="other">⚠️ Other Emergency</option>
// // // //           </select>
// // // //         </div>

// // // //         {/* Custom Message */}
// // // //         <div className="config-section">
// // // //           <label htmlFor="message" className="section-label">
// // // //             <span className="section-icon">✏️</span>
// // // //             Emergency Message
// // // //           </label>
// // // //           <div className="message-container">
// // // //             <textarea
// // // //               id="message"
// // // //               value={customMessage}
// // // //               onChange={handleMessageChange}
// // // //               placeholder="Describe your emergency situation..."
// // // //               className="message-input"
// // // //               rows="3"
// // // //               disabled={sending || countdown || locationWatching}
// // // //             />
// // // //             <button
// // // //               type="button"
// // // //               className="reset-button"
// // // //               onClick={handleResetMessage}
// // // //               disabled={sending || countdown || locationWatching}
// // // //             >
// // // //               Reset
// // // //             </button>
// // // //           </div>
// // // //           <p className="field-hint">
// // // //             This message will be emailed to your emergency contacts
// // // //           </p>
// // // //         </div>

// // // //         {/* SOS Button */}
// // // //         <div className="sos-button-section">
// // // //           <button
// // // //             onClick={handleClick}
// // // //             disabled={sending || countdown}
// // // //             className={`sos-main-button ${countdown ? 'countdown-active' : ''} ${locationWatching ? 'location-active' : ''}`}
// // // //             aria-label="Send SOS emergency alert"
// // // //           >
// // // //             {sending ? (
// // // //               <>
// // // //                 <span className="button-spinner"></span>
// // // //                 <span className="button-text">Sending Emergency Alert...</span>
// // // //               </>
// // // //             ) : countdown ? (
// // // //               <>
// // // //                 <span className="countdown-animation"></span>
// // // //                 <span className="button-text">Cancel Emergency</span>
// // // //               </>
// // // //             ) : locationWatching ? (
// // // //               <>
// // // //                 <span className="live-location-icon">📍</span>
// // // //                 <span className="button-text">TRACKING LIVE LOCATION</span>
// // // //               </>
// // // //             ) : (
// // // //               <>
// // // //                 <span className="sos-main-icon">🚨</span>
// // // //                 <span className="button-text">SOS EMERGENCY</span>
// // // //               </>
// // // //             )}
// // // //           </button>
          
// // // //           {!sending && !countdown && !locationWatching && (
// // // //             <div className="sos-instruction">
// // // //               <p className="instruction-text">
// // // //                 <span className="instruction-icon">⚠️</span>
// // // //                 Double-tap to activate live location tracking and emergency alert
// // // //               </p>
// // // //             </div>
// // // //           )}
          
// // // //           {locationWatching && !countdown && (
// // // //             <div className="location-instruction">
// // // //               <p className="instruction-text">
// // // //                 <span className="instruction-icon">📍</span>
// // // //                 Your location is being tracked live. Press again to send emergency alert.
// // // //               </p>
// // // //             </div>
// // // //           )}
// // // //         </div>

// // // //         {/* Location Actions */}
// // // //         <div className="location-actions">
// // // //           <button
// // // //             className="location-test-button"
// // // //             onClick={getOneTimeLocation}
// // // //             disabled={sending || countdown || locationWatching}
// // // //           >
// // // //             <span className="location-icon">📍</span>
// // // //             Test Location Now
// // // //           </button>
          
// // // //           {location && (
// // // //             <button
// // // //               className="stop-location-button"
// // // //               onClick={stopLocationWatching}
// // // //               disabled={sending || countdown || !locationWatching}
// // // //             >
// // // //               <span className="stop-icon">⏹️</span>
// // // //               Stop Live Tracking
// // // //             </button>
// // // //           )}
// // // //         </div>

// // // //         {/* Current Location Display */}
// // // //         {location && (
// // // //           <div className="current-location-section">
// // // //             <h3 className="location-title">
// // // //               <span className="location-icon">📍</span>
// // // //               Current Location
// // // //               <span className="location-source-badge">
// // // //                 {location.source === 'ip' ? 'APPROXIMATE' : 'GPS'}
// // // //               </span>
// // // //             </h3>
// // // //             <div className="location-grid">
// // // //               <div className="location-item">
// // // //                 <span className="location-label">Latitude:</span>
// // // //                 <span className="location-value coordinate">{location.lat.toFixed(6)}</span>
// // // //               </div>
// // // //               <div className="location-item">
// // // //                 <span className="location-label">Longitude:</span>
// // // //                 <span className="location-value coordinate">{location.lng.toFixed(6)}</span>
// // // //               </div>
// // // //               <div className="location-item">
// // // //                 <span className="location-label">Accuracy:</span>
// // // //                 <span className="location-value" style={{ color: getAccuracyColor(location.accuracy) }}>
// // // //                   {getAccuracyLabel(location.accuracy)} ({Math.round(location.accuracy)} meters)
// // // //                 </span>
// // // //               </div>
// // // //               <div className="location-item">
// // // //                 <span className="location-label">Last Updated:</span>
// // // //                 <span className="location-value">
// // // //                   {formatTime(location.timestamp)}
// // // //                 </span>
// // // //               </div>
// // // //             </div>
// // // //             {location.source !== 'ip' && (
// // // //               <div className="map-actions">
// // // //                 <a
// // // //                   href={`https://maps.google.com/?q=${location.lat},${location.lng}`}
// // // //                   target="_blank"
// // // //                   rel="noopener noreferrer"
// // // //                   className="map-link-button"
// // // //                 >
// // // //                   <span className="map-icon">🗺️</span>
// // // //                   View Location on Google Maps
// // // //                 </a>
// // // //               </div>
// // // //             )}
// // // //           </div>
// // // //         )}

// // // //         {/* Information Panel */}
// // // //         <div className="info-panel">
// // // //           <h3 className="info-title">
// // // //             <span className="info-icon">ℹ️</span>
// // // //             How Emergency SOS Works
// // // //           </h3>
// // // //           <ul className="info-list">
// // // //             <li className="info-item">
// // // //               <span className="bullet">📍</span>
// // // //               <strong>Location Tracking:</strong> We try to get your location using GPS, Wi-Fi, and cellular data
// // // //             </li>
// // // //             <li className="info-item">
// // // //               <span className="bullet">🚨</span>
// // // //               <strong>Double-tap Safety:</strong> Prevents accidental activation
// // // //             </li>
// // // //             <li className="info-item">
// // // //               <span className="bullet">⏱️</span>
// // // //               <strong>5-second Countdown:</strong> Gives you time to cancel
// // // //             </li>
// // // //             <li className="info-item">
// // // //               <span className="bullet">📧</span>
// // // //               <strong>Email Notifications:</strong> Emergency contacts receive emails
// // // //             </li>
// // // //             <li className="info-item">
// // // //               <span className="bullet">🎯</span>
// // // //               <strong>Fallback Location:</strong> If GPS fails, we try approximate IP-based location
// // // //             </li>
// // // //           </ul>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }



// // // // src/components/SOS/SOSButton.jsx
// // // import React, { useState, useRef, useEffect } from "react";
// // // import { useNavigate } from "react-router-dom";
// // // import { post } from "../../services/api";
// // // import "./SOSButton.css";

// // // function speak(text) {
// // //   if ("speechSynthesis" in window) {
// // //     window.speechSynthesis.cancel();
// // //     const utter = new SpeechSynthesisUtterance(text);
// // //     utter.rate = 0.8;
// // //     utter.volume = 1.0;
// // //     window.speechSynthesis.speak(utter);
// // //   }
// // // }

// // // // Format time to Indian Standard Time (IST) or local time
// // // const formatTime = (dateString) => {
// // //   const date = new Date(dateString);
// // //   return date.toLocaleTimeString('en-IN', {
// // //     hour: '2-digit',
// // //     minute: '2-digit',
// // //     second: '2-digit',
// // //     hour12: true
// // //   }) + ' IST';
// // // };

// // // // Format decimal to max 6 places
// // // const formatDecimal = (num) => {
// // //   if (num === null || num === undefined) return "";
// // //   const rounded = parseFloat(num.toFixed(6));
// // //   return rounded;
// // // };

// // // // Get location with improved methods
// // // const getCurrentLocation = (forceRefresh = false) => {
// // //   return new Promise((resolve, reject) => {
// // //     if (!("geolocation" in navigator)) {
// // //       reject(new Error("Geolocation not supported"));
// // //       return;
// // //     }

// // //     const options = {
// // //       enableHighAccuracy: true, // Force high accuracy
// // //       timeout: 30000, // 30 seconds timeout
// // //       maximumAge: forceRefresh ? 0 : 60000, // Force fresh location if refresh requested
// // //     };

// // //     console.log("Getting location with options:", options);
    
// // //     navigator.geolocation.getCurrentPosition(
// // //       (position) => {
// // //         console.log("Location obtained:", position);
// // //         const location = {
// // //           lat: position.coords.latitude,
// // //           lng: position.coords.longitude,
// // //           accuracy: position.coords.accuracy,
// // //           altitude: position.coords.altitude,
// // //           altitudeAccuracy: position.coords.altitudeAccuracy,
// // //           heading: position.coords.heading,
// // //           speed: position.coords.speed,
// // //           timestamp: new Date(position.timestamp).toISOString(),
// // //           source: 'gps',
// // //           isFresh: true
// // //         };
        
// // //         // Log location details for debugging
// // //         console.log("Location details:", {
// // //           coordinates: `${location.lat}, ${location.lng}`,
// // //           accuracy: `${location.accuracy} meters`,
// // //           altitude: location.altitude ? `${location.altitude} meters` : 'N/A',
// // //           timestamp: new Date(location.timestamp).toLocaleString(),
// // //         });
        
// // //         resolve(location);
// // //       },
// // //       (error) => {
// // //         console.error("Geolocation error:", error);
        
// // //         // Provide detailed error message
// // //         let errorMessage = "Location Error: ";
// // //         switch(error.code) {
// // //           case error.PERMISSION_DENIED:
// // //             errorMessage += "Permission denied. Please enable location services in your browser settings.";
// // //             break;
// // //           case error.POSITION_UNAVAILABLE:
// // //             errorMessage += "Location information unavailable. Please check your GPS/WiFi connection.";
// // //             break;
// // //           case error.TIMEOUT:
// // //             errorMessage += "Location request timed out. Please try again.";
// // //             break;
// // //           default:
// // //             errorMessage += "Unknown error occurred.";
// // //         }
        
// // //         console.log(errorMessage);
// // //         reject(new Error(errorMessage));
// // //       },
// // //       options
// // //     );
// // //   });
// // // };

// // // // Check if location is likely cached/default
// // // const isLikelyCachedLocation = (location) => {
// // //   if (!location) return false;
  
// // //   // Check for suspiciously low accuracy (IP-based locations have high accuracy values)
// // //   if (location.accuracy > 100000) { // More than 100km accuracy is likely IP-based
// // //     console.warn("Location likely cached/default - accuracy too low:", location.accuracy);
// // //     return true;
// // //   }
  
// // //   // Check if timestamp is old (more than 5 minutes)
// // //   const now = new Date().getTime();
// // //   const locationTime = new Date(location.timestamp).getTime();
// // //   const ageInMinutes = (now - locationTime) / (1000 * 60);
  
// // //   if (ageInMinutes > 5) {
// // //     console.warn("Location likely cached - age:", ageInMinutes, "minutes");
// // //     return true;
// // //   }
  
// // //   return false;
// // // };

// // // export default function SOSButton({ 
// // //   showHeader = true 
// // // }) {
// // //   const navigate = useNavigate();
// // //   const [sending, setSending] = useState(false);
// // //   const [status, setStatus] = useState("");
// // //   const [error, setError] = useState("");
// // //   const [countdown, setCountdown] = useState(null);
// // //   const [location, setLocation] = useState(null);
// // //   const [alertType, setAlertType] = useState("sos");
// // //   const [customMessage, setCustomMessage] = useState("Emergency! Please help me.");
// // //   const [locationWatching, setLocationWatching] = useState(false);
// // //   const [locationAccuracy, setLocationAccuracy] = useState(null);
// // //   const [isGettingLocation, setIsGettingLocation] = useState(false);
  
// // //   const watchIdRef = useRef(null);
// // //   const lastLocationRef = useRef(null);
  
// // //   // Safety: require double-press within 1.5s to confirm
// // //   const lastPressRef = useRef(0);
// // //   const countdownRef = useRef(null);

// // //   // Cleanup location watcher on component unmount
// // //   useEffect(() => {
// // //     return () => {
// // //       if (watchIdRef.current !== null) {
// // //         navigator.geolocation.clearWatch(watchIdRef.current);
// // //         console.log("Location watcher stopped");
// // //       }
// // //     };
// // //   }, []);

// // //   const handleBackToDashboard = () => {
// // //     navigate("/dashboard");
// // //   };

// // //   // Improved location watching
// // //   const startLocationWatching = () => {
// // //     if (!("geolocation" in navigator)) {
// // //       const errorMsg = "Geolocation not supported by your device";
// // //       setError(errorMsg);
// // //       speak(errorMsg);
// // //       return false;
// // //     }

// // //     console.log("Starting location watching...");
// // //     setStatus("Starting live location tracking...");
// // //     speak("Starting live location tracking. Please wait for GPS signal.");

// // //     // Stop any existing watcher
// // //     if (watchIdRef.current !== null) {
// // //       navigator.geolocation.clearWatch(watchIdRef.current);
// // //     }

// // //     watchIdRef.current = navigator.geolocation.watchPosition(
// // //       (position) => {
// // //         const newLocation = {
// // //           lat: position.coords.latitude,
// // //           lng: position.coords.longitude,
// // //           accuracy: position.coords.accuracy,
// // //           timestamp: new Date(position.timestamp).toISOString(),
// // //           source: 'gps_live',
// // //           altitude: position.coords.altitude,
// // //           heading: position.coords.heading,
// // //           speed: position.coords.speed,
// // //         };
        
// // //         console.log("Live location update:", {
// // //           coordinates: `${newLocation.lat}, ${newLocation.lng}`,
// // //           accuracy: `${newLocation.accuracy}m`,
// // //           time: new Date(newLocation.timestamp).toLocaleTimeString(),
// // //         });
        
// // //         lastLocationRef.current = newLocation;
// // //         setLocation(newLocation);
// // //         setLocationAccuracy(position.coords.accuracy);
// // //         setLocationWatching(true);
        
// // //         // Update status based on accuracy
// // //         if (position.coords.accuracy < 20) {
// // //           setStatus("📍 Live location active (High accuracy)");
// // //         } else if (position.coords.accuracy < 100) {
// // //           setStatus("📍 Live location active (Good accuracy)");
// // //         } else if (position.coords.accuracy < 1000) {
// // //           setStatus("📍 Live location active (Moderate accuracy)");
// // //         } else {
// // //           setStatus("📍 Live location active (Low accuracy - GPS signal weak)");
// // //         }
// // //       },
// // //       (err) => {
// // //         console.error("Location watch error:", err);
// // //         let errorMsg;
// // //         switch(err.code) {
// // //           case err.PERMISSION_DENIED:
// // //             errorMsg = "❌ Location access denied. Please enable location services in browser settings.";
// // //             break;
// // //           case err.POSITION_UNAVAILABLE:
// // //             errorMsg = "❌ GPS signal unavailable. Please go to an open area or enable WiFi.";
// // //             break;
// // //           case err.TIMEOUT:
// // //             errorMsg = "❌ Location request timed out. Please check your internet connection.";
// // //             break;
// // //           default:
// // //             errorMsg = "❌ Unable to get live location.";
// // //         }
// // //         setError(errorMsg);
// // //         speak("Unable to get live location");
// // //         setLocationWatching(false);
// // //       },
// // //       {
// // //         enableHighAccuracy: true,
// // //         timeout: 30000, // 30 seconds
// // //         maximumAge: 0, // Always get fresh position
// // //         distanceFilter: 5, // Update when moved 5 meters
// // //       }
// // //     );

// // //     return true;
// // //   };

// // //   // Stop watching location
// // //   const stopLocationWatching = () => {
// // //     if (watchIdRef.current !== null) {
// // //       navigator.geolocation.clearWatch(watchIdRef.current);
// // //       watchIdRef.current = null;
// // //       console.log("Location watching stopped");
// // //     }
// // //     setLocationWatching(false);
// // //     setStatus("Location tracking stopped");
// // //   };

// // //   const handleClick = () => {
// // //     const now = Date.now();
// // //     if (now - lastPressRef.current < 1500) {
// // //       // confirmed - start countdown and location watching
// // //       if (!locationWatching) {
// // //         console.log("Starting location for SOS...");
// // //         const started = startLocationWatching();
// // //         if (!started) return;
// // //       }
// // //       startCountdown();
// // //     } else {
// // //       lastPressRef.current = now;
// // //       speak("Press the SOS button again within 1.5 seconds to confirm emergency");
// // //       setStatus("Press again to confirm SOS emergency");
      
// // //       setTimeout(() => {
// // //         if (!countdown) {
// // //           setStatus("");
// // //         }
// // //       }, 2000);
// // //     }
// // //   };

// // //   const startCountdown = () => {
// // //     let count = 5;
// // //     setCountdown(count);
// // //     setStatus(`Emergency alert will be sent in ${count} seconds...`);
    
// // //     speak(`Emergency alert confirmed. Sending in ${count} seconds.`);
    
// // //     countdownRef.current = setInterval(() => {
// // //       count -= 1;
// // //       setCountdown(count);
      
// // //       if (count === 0) {
// // //         clearInterval(countdownRef.current);
// // //         sendSOS();
// // //       } else {
// // //         setStatus(`Emergency alert will be sent in ${count} seconds...`);
// // //       }
// // //     }, 1000);
// // //   };

// // //   const cancelSOS = () => {
// // //     if (countdownRef.current) {
// // //       clearInterval(countdownRef.current);
// // //       countdownRef.current = null;
// // //     }
// // //     setCountdown(null);
// // //     setStatus("SOS cancelled");
// // //     speak("Emergency alert cancelled");
    
// // //     // Stop location watching if no longer needed
// // //     if (watchIdRef.current) {
// // //       stopLocationWatching();
// // //     }
    
// // //     setTimeout(() => {
// // //       setStatus("");
// // //     }, 2000);
// // //   };

// // //   const handleAlertTypeChange = (e) => {
// // //     setAlertType(e.target.value);
// // //   };

// // //   const handleMessageChange = (e) => {
// // //     setCustomMessage(e.target.value);
// // //   };

// // //   const handleResetMessage = () => {
// // //     setCustomMessage("Emergency! Please help me.");
// // //   };

// // //   async function sendSOS() {
// // //     setSending(true);
// // //     setError("");
    
// // //     try {
// // //       // Try to get the most recent location from watch
// // //       let currentLocation = lastLocationRef.current;
// // //       let locationSource = 'gps_live';
// // //       let forceFresh = false;
      
// // //       // Check if location is likely cached/default
// // //       if (currentLocation && isLikelyCachedLocation(currentLocation)) {
// // //         console.warn("Location appears to be cached, forcing fresh location...");
// // //         forceFresh = true;
// // //         setStatus("Getting fresh location...");
// // //       }
      
// // //       // If we don't have live location or need fresh location, get it now
// // //       if (!currentLocation || forceFresh) {
// // //         try {
// // //           setStatus("Getting your current location...");
// // //           speak("Getting your current location");
// // //           setIsGettingLocation(true);
          
// // //           currentLocation = await getCurrentLocation(forceFresh);
// // //           locationSource = currentLocation.source || 'gps_fresh';
          
// // //           // Check if the fresh location is still suspicious
// // //           if (isLikelyCachedLocation(currentLocation)) {
// // //             console.warn("Even fresh location appears to be cached/IP-based");
// // //             speak("Warning: Location may be approximate due to GPS signal issues");
// // //           }
          
// // //         } catch (locationError) {
// // //           console.warn("Could not get precise location:", locationError);
// // //           speak("Could not get precise location, using last known position if available");
// // //           // Don't fail completely - use whatever we have
// // //         } finally {
// // //           setIsGettingLocation(false);
// // //         }
// // //       }
      
// // //       // Format coordinates if we have them
// // //       let lat = null;
// // //       let lng = null;
// // //       let locationText = "";
// // //       let accuracyMeters = null;
      
// // //       if (currentLocation) {
// // //         lat = formatDecimal(currentLocation.lat);
// // //         lng = formatDecimal(currentLocation.lng);
// // //         accuracyMeters = Math.round(currentLocation.accuracy);
        
// // //         const istTime = new Date().toLocaleTimeString('en-IN', {
// // //           hour: '2-digit',
// // //           minute: '2-digit',
// // //           second: '2-digit',
// // //           hour12: true
// // //         });
        
// // //         // Include accuracy warning if low
// // //         let accuracyNote = "";
// // //         if (accuracyMeters > 1000) {
// // //           accuracyNote = " (Low accuracy)";
// // //         } else if (accuracyMeters > 10000) {
// // //           accuracyNote = " (Very low accuracy - may be approximate)";
// // //         }
        
// // //         locationText = `Location: Lat ${lat}, Lng ${lng}, Accuracy: ${accuracyMeters}m${accuracyNote}, Time: ${istTime} IST`;
        
// // //       } else {
// // //         // If no location at all
// // //         const istTime = new Date().toLocaleTimeString('en-IN', {
// // //           hour: '2-digit',
// // //           minute: '2-digit',
// // //           second: '2-digit',
// // //           hour12: true
// // //         });
// // //         locationText = `Location unavailable (GPS/WiFi required). Time: ${istTime} IST`;
// // //       }
      
// // //       // Build the payload for POST
// // //       const alertData = {
// // //         alert_type: alertType,
// // //         message: customMessage.trim() || "Emergency! Please help me.",
// // //         location_text: locationText,
// // //         is_active: true,
// // //       };
      
// // //       // Only include coordinates if we have them
// // //       if (lat !== null && lng !== null) {
// // //         alertData.location_lat = lat;
// // //         alertData.location_lng = lng;
// // //       }
      
// // //       console.log("Sending SOS alert:", alertData);
      
// // //       setStatus("Sending emergency alert...");
// // //       speak("Sending emergency alert");
      
// // //       // Send to backend
// // //       const response = await post("/api/emergency-alerts/", alertData);
      
// // //       // Success
// // //       const successMsg = response.data?.message || "Emergency alert sent successfully!";
// // //       setStatus(successMsg);
      
// // //       if (currentLocation) {
// // //         if (accuracyMeters && accuracyMeters > 10000) {
// // //           speak("Emergency alert sent with approximate location. Help is on the way.");
// // //         } else {
// // //           speak("Emergency alert sent successfully with your location. Help is on the way.");
// // //         }
// // //       } else {
// // //         speak("Emergency alert sent successfully. Location could not be obtained. Help is on the way.");
// // //       }
      
// // //       // Trigger vibration if supported
// // //       if ("vibrate" in navigator) {
// // //         navigator.vibrate([200, 100, 200, 100, 200, 100, 200]);
// // //       }
      
// // //       // Reset after success
// // //       setTimeout(() => {
// // //         stopLocationWatching();
// // //         setStatus("");
// // //         setSending(false);
// // //         setAlertType("sos");
// // //         setCustomMessage("Emergency! Please help me.");
// // //         setLocation(null);
// // //         setLocationWatching(false);
// // //       }, 7000);

// // //     } catch (err) {
// // //       console.error("sendSOS error:", err);
// // //       console.error("Error response data:", err.response?.data);
      
// // //       let errorMsg = "Failed to send emergency alert. Please try again.";
// // //       if (err.response?.data) {
// // //         if (err.response.data.detail) {
// // //           errorMsg = err.response.data.detail;
// // //         } else if (typeof err.response.data === 'object') {
// // //           const errors = [];
// // //           Object.entries(err.response.data).forEach(([field, messages]) => {
// // //             if (Array.isArray(messages)) {
// // //               errors.push(...messages.map(m => `${field}: ${m}`));
// // //             } else if (typeof messages === 'string') {
// // //               errors.push(`${field}: ${messages}`);
// // //             }
// // //           });
// // //           if (errors.length > 0) {
// // //             errorMsg = errors.join(', ');
// // //           }
// // //         } else if (typeof err.response.data === 'string') {
// // //           errorMsg = err.response.data;
// // //         }
// // //       }
      
// // //       setError(errorMsg);
// // //       speak("Failed to send emergency alert");
// // //       setSending(false);
// // //       stopLocationWatching();
// // //     }
// // //   }

// // //   const getAccuracyColor = (accuracy) => {
// // //     if (!accuracy) return "#757575"; // Gray - unknown
// // //     if (accuracy < 20) return "#4CAF50"; // Green - High accuracy
// // //     if (accuracy < 100) return "#8BC34A"; // Light green - Good accuracy
// // //     if (accuracy < 1000) return "#FF9800"; // Orange - Moderate accuracy
// // //     if (accuracy < 10000) return "#F44336"; // Red - Low accuracy
// // //     return "#9C27B0"; // Purple - Very low/approximate
// // //   };

// // //   const getAccuracyLabel = (accuracy) => {
// // //     if (!accuracy) return "Unknown";
// // //     if (accuracy < 20) return "High";
// // //     if (accuracy < 100) return "Good";
// // //     if (accuracy < 1000) return "Moderate";
// // //     if (accuracy < 10000) return "Low";
// // //     return "Approximate";
// // //   };

// // //   // Get current location on demand with better feedback
// // //   const getOneTimeLocation = async () => {
// // //     try {
// // //       setIsGettingLocation(true);
// // //       setStatus("📡 Getting your current location...");
// // //       speak("Getting your current location. Please wait for GPS signal.");
      
// // //       const location = await getCurrentLocation(true); // Force fresh location
// // //       setLocation(location);
// // //       lastLocationRef.current = location;
// // //       setLocationAccuracy(location.accuracy);
      
// // //       const accuracyLabel = getAccuracyLabel(location.accuracy);
// // //       const message = `📍 Location obtained (${accuracyLabel} accuracy: ${Math.round(location.accuracy)} meters)`;
// // //       setStatus(message);
      
// // //       if (location.accuracy < 100) {
// // //         speak(`Location obtained with good accuracy: ${Math.round(location.accuracy)} meters`);
// // //       } else if (location.accuracy < 1000) {
// // //         speak(`Location obtained with moderate accuracy: ${Math.round(location.accuracy)} meters`);
// // //       } else {
// // //         speak(`Location obtained. Accuracy is low. Please go to an open area for better GPS.`);
// // //       }
      
// // //       return location;
// // //     } catch (error) {
// // //       console.error("Failed to get location:", error);
// // //       const errorMsg = `❌ Could not get your current location: ${error.message}`;
// // //       setError(errorMsg);
// // //       speak("Could not get location. Please check GPS and try again.");
// // //       return null;
// // //     } finally {
// // //       setIsGettingLocation(false);
// // //     }
// // //   };

// // //   // Add browser location permission check
// // //   const checkLocationPermission = async () => {
// // //     if (!navigator.permissions) {
// // //       console.log("Permissions API not supported");
// // //       return;
// // //     }
    
// // //     try {
// // //       const permissionStatus = await navigator.permissions.query({ name: 'geolocation' });
// // //       console.log("Location permission status:", permissionStatus.state);
      
// // //       if (permissionStatus.state === 'denied') {
// // //         setError("❌ Location permission denied. Please enable location access in browser settings.");
// // //         speak("Location permission denied. Please enable location in browser settings.");
// // //       } else if (permissionStatus.state === 'prompt') {
// // //         setStatus("📍 Please allow location access when prompted.");
// // //         speak("Please allow location access when prompted.");
// // //       }
      
// // //       // Listen for permission changes
// // //       permissionStatus.onchange = () => {
// // //         console.log("Location permission changed to:", permissionStatus.state);
// // //         if (permissionStatus.state === 'granted') {
// // //           setStatus("✅ Location permission granted!");
// // //           speak("Location permission granted!");
// // //           setTimeout(() => setStatus(""), 3000);
// // //         }
// // //       };
// // //     } catch (err) {
// // //       console.log("Could not check location permission:", err);
// // //     }
// // //   };

// // //   // Check permission on mount
// // //   useEffect(() => {
// // //     checkLocationPermission();
// // //   }, []);

// // //   return (
// // //     <div className="sos-page-container">
// // //       {/* Back Button Header */}
// // //       <div className="sos-page-header">
// // //         <button className="back-button" onClick={handleBackToDashboard}>
// // //           ← Back to Dashboard
// // //         </button>
// // //       </div>

// // //       <div className="sos-container">
// // //         {showHeader && (
// // //           <div className="sos-header">
// // //             <h2>🚨 Emergency SOS</h2>
// // //             <p className="sos-description">
// // //               Double-tap the SOS button to send emergency alert with your current location.
// // //               Ensure location services are enabled in your browser.
// // //             </p>
// // //           </div>
// // //         )}

// // //         {/* Location Troubleshooting Tips */}
// // //         {(error && error.includes("permission") || error.includes("GPS")) && (
// // //           <div className="troubleshooting-tips">
// // //             <h4>🔧 Location Troubleshooting:</h4>
// // //             <ul>
// // //               <li>1. Check browser settings → Allow location access</li>
// // //               <li>2. Enable GPS on your device</li>
// // //               <li>3. Connect to WiFi for better accuracy</li>
// // //               <li>4. Go to an open area/outside</li>
// // //               <li>5. Try refreshing the page</li>
// // //             </ul>
// // //           </div>
// // //         )}

// // //         {/* Live Location Status */}
// // //         {locationWatching && !sending && (
// // //           <div className="live-location-status">
// // //             <div className="live-indicator">
// // //               <span className="live-pulse"></span>
// // //               <span className="live-text">LIVE LOCATION ACTIVE</span>
// // //             </div>
// // //             <div className="accuracy-indicator">
// // //               <div 
// // //                 className="accuracy-bar" 
// // //                 style={{ 
// // //                   width: `${Math.min(100, (1000 / (locationAccuracy || 1000)))}%`,
// // //                   backgroundColor: getAccuracyColor(locationAccuracy || 1000)
// // //                 }}
// // //               ></div>
// // //               <span className="accuracy-text">
// // //                 Accuracy: {getAccuracyLabel(locationAccuracy)} ({locationAccuracy ? Math.round(locationAccuracy) : '--'} meters)
// // //               </span>
// // //             </div>
// // //           </div>
// // //         )}

// // //         {/* Status Messages */}
// // //         {status && (
// // //           <div className={`status-message ${countdown ? 'countdown-active' : ''}`}>
// // //             {countdown && (
// // //               <div className="countdown-circle">
// // //                 <span>{countdown}</span>
// // //               </div>
// // //             )}
// // //             <div className="status-content">
// // //               <p className="status-text">{status}</p>
// // //               {countdown && (
// // //                 <button className="cancel-button" onClick={cancelSOS}>
// // //                   Cancel Emergency
// // //                 </button>
// // //               )}
// // //             </div>
// // //           </div>
// // //         )}

// // //         {error && (
// // //           <div className="error-message">
// // //             <div className="error-icon">⚠️</div>
// // //             <div className="error-content">
// // //               <p className="error-text">{error}</p>
// // //               <button className="retry-button" onClick={() => setError("")}>
// // //                 Dismiss
// // //               </button>
// // //             </div>
// // //           </div>
// // //         )}

// // //         {/* Alert Type Selection */}
// // //         <div className="config-section">
// // //           <label htmlFor="alert-type" className="section-label">
// // //             <span className="section-icon">📋</span>
// // //             Type of Emergency
// // //           </label>
// // //           <select
// // //             id="alert-type"
// // //             value={alertType}
// // //             onChange={handleAlertTypeChange}
// // //             className="alert-type-select"
// // //             disabled={sending || countdown || locationWatching || isGettingLocation}
// // //           >
// // //             <option value="sos">🚨 General Emergency (SOS)</option>
// // //             <option value="medical">🏥 Medical Emergency</option>
// // //             <option value="safety">🛡️ Safety Threat</option>
// // //             <option value="fire">🔥 Fire Emergency</option>
// // //             <option value="accident">🚗 Accident</option>
// // //             <option value="lost">🧭 Lost/Disoriented</option>
// // //             <option value="other">⚠️ Other Emergency</option>
// // //           </select>
// // //         </div>

// // //         {/* Custom Message */}
// // //         <div className="config-section">
// // //           <label htmlFor="message" className="section-label">
// // //             <span className="section-icon">✏️</span>
// // //             Emergency Message
// // //           </label>
// // //           <div className="message-container">
// // //             <textarea
// // //               id="message"
// // //               value={customMessage}
// // //               onChange={handleMessageChange}
// // //               placeholder="Describe your emergency situation..."
// // //               className="message-input"
// // //               rows="3"
// // //               disabled={sending || countdown || locationWatching || isGettingLocation}
// // //             />
// // //             <button
// // //               type="button"
// // //               className="reset-button"
// // //               onClick={handleResetMessage}
// // //               disabled={sending || countdown || locationWatching || isGettingLocation}
// // //             >
// // //               Reset
// // //             </button>
// // //           </div>
// // //           <p className="field-hint">
// // //             This message will be emailed to your emergency contacts
// // //           </p>
// // //         </div>

// // //         {/* SOS Button */}
// // //         <div className="sos-button-section">
// // //           <button
// // //             onClick={handleClick}
// // //             disabled={sending || countdown || isGettingLocation}
// // //             className={`sos-main-button ${countdown ? 'countdown-active' : ''} ${locationWatching ? 'location-active' : ''} ${isGettingLocation ? 'getting-location' : ''}`}
// // //             aria-label="Send SOS emergency alert"
// // //           >
// // //             {sending ? (
// // //               <>
// // //                 <span className="button-spinner"></span>
// // //                 <span className="button-text">Sending Emergency Alert...</span>
// // //               </>
// // //             ) : isGettingLocation ? (
// // //               <>
// // //                 <span className="button-spinner"></span>
// // //                 <span className="button-text">Getting Location...</span>
// // //               </>
// // //             ) : countdown ? (
// // //               <>
// // //                 <span className="countdown-animation"></span>
// // //                 <span className="button-text">Cancel Emergency</span>
// // //               </>
// // //             ) : locationWatching ? (
// // //               <>
// // //                 <span className="live-location-icon">📍</span>
// // //                 <span className="button-text">TRACKING LIVE LOCATION</span>
// // //               </>
// // //             ) : (
// // //               <>
// // //                 <span className="sos-main-icon">🚨</span>
// // //                 <span className="button-text">SOS EMERGENCY</span>
// // //               </>
// // //             )}
// // //           </button>
          
// // //           {!sending && !countdown && !locationWatching && !isGettingLocation && (
// // //             <div className="sos-instruction">
// // //               <p className="instruction-text">
// // //                 <span className="instruction-icon">⚠️</span>
// // //                 Double-tap to activate live location tracking and emergency alert
// // //               </p>
// // //             </div>
// // //           )}
          
// // //           {locationWatching && !countdown && (
// // //             <div className="location-instruction">
// // //               <p className="instruction-text">
// // //                 <span className="instruction-icon">📍</span>
// // //                 Your location is being tracked live. Press again to send emergency alert.
// // //               </p>
// // //             </div>
// // //           )}
// // //         </div>

// // //         {/* Location Actions */}
// // //         <div className="location-actions">
// // //           <button
// // //             className="location-test-button"
// // //             onClick={getOneTimeLocation}
// // //             disabled={sending || countdown || locationWatching || isGettingLocation}
// // //           >
// // //             {isGettingLocation ? (
// // //               <>
// // //                 <span className="button-spinner-small"></span>
// // //                 <span>Getting Location...</span>
// // //               </>
// // //             ) : (
// // //               <>
// // //                 <span className="location-icon">📍</span>
// // //                 <span>Test Location Now</span>
// // //               </>
// // //             )}
// // //           </button>
          
// // //           {location && locationWatching && (
// // //             <button
// // //               className="stop-location-button"
// // //               onClick={stopLocationWatching}
// // //               disabled={sending || countdown || isGettingLocation}
// // //             >
// // //               <span className="stop-icon">⏹️</span>
// // //               Stop Live Tracking
// // //             </button>
// // //           )}
          
// // //           <button
// // //             className="permission-button"
// // //             onClick={checkLocationPermission}
// // //             disabled={sending || countdown || isGettingLocation}
// // //           >
// // //             <span className="permission-icon">🔧</span>
// // //             Check Permission
// // //           </button>
// // //         </div>

// // //         {/* Current Location Display */}
// // //         {location && (
// // //           <div className="current-location-section">
// // //             <h3 className="location-title">
// // //               <span className="location-icon">📍</span>
// // //               Current Location
// // //               <span className="location-source-badge" style={{ 
// // //                 backgroundColor: getAccuracyColor(location.accuracy),
// // //                 color: location.accuracy < 1000 ? '#fff' : '#000'
// // //               }}>
// // //                 {getAccuracyLabel(location.accuracy)} ACCURACY
// // //               </span>
// // //             </h3>
// // //             <div className="location-grid">
// // //               <div className="location-item">
// // //                 <span className="location-label">Latitude:</span>
// // //                 <span className="location-value coordinate">{location.lat.toFixed(6)}</span>
// // //               </div>
// // //               <div className="location-item">
// // //                 <span className="location-label">Longitude:</span>
// // //                 <span className="location-value coordinate">{location.lng.toFixed(6)}</span>
// // //               </div>
// // //               <div className="location-item">
// // //                 <span className="location-label">Accuracy:</span>
// // //                 <span className="location-value" style={{ color: getAccuracyColor(location.accuracy) }}>
// // //                   {Math.round(location.accuracy)} meters ({getAccuracyLabel(location.accuracy)})
// // //                 </span>
// // //               </div>
// // //               <div className="location-item">
// // //                 <span className="location-label">Last Updated:</span>
// // //                 <span className="location-value">
// // //                   {formatTime(location.timestamp)}
// // //                 </span>
// // //               </div>
// // //               {location.altitude && !isNaN(location.altitude) && (
// // //                 <div className="location-item">
// // //                   <span className="location-label">Altitude:</span>
// // //                   <span className="location-value">{Math.round(location.altitude)} meters</span>
// // //                 </div>
// // //               )}
// // //             </div>
// // //             <div className="map-actions">
// // //               <a
// // //                 href={`https://maps.google.com/?q=${location.lat},${location.lng}`}
// // //                 target="_blank"
// // //                 rel="noopener noreferrer"
// // //                 className="map-link-button"
// // //               >
// // //                 <span className="map-icon">🗺️</span>
// // //                 View on Google Maps
// // //               </a>
// // //               {location.accuracy > 1000 && (
// // //                 <div className="accuracy-warning">
// // //                   <span className="warning-icon">⚠️</span>
// // //                   <span>Low accuracy. For better results, go outside or connect to WiFi.</span>
// // //                 </div>
// // //               )}
// // //             </div>
// // //           </div>
// // //         )}

// // //         {/* Information Panel */}
// // //         <div className="info-panel">
// // //           <h3 className="info-title">
// // //             <span className="info-icon">ℹ️</span>
// // //             For Better Location Accuracy:
// // //           </h3>
// // //           <ul className="info-list">
// // //             <li className="info-item">
// // //               <span className="bullet">📍</span>
// // //               <strong>Enable Location:</strong> Allow location access in browser settings
// // //             </li>
// // //             <li className="info-item">
// // //               <span className="bullet">📶</span>
// // //               <strong>Turn on GPS:</strong> Enable GPS on your device
// // //             </li>
// // //             <li className="info-item">
// // //               <span className="bullet">📡</span>
// // //               <strong>Connect to WiFi:</strong> WiFi improves indoor accuracy
// // //             </li>
// // //             <li className="info-item">
// // //               <span className="bullet">🌤️</span>
// // //               <strong>Go Outside:</strong> Move to an open area for GPS signal
// // //             </li>
// // //             <li className="info-item">
// // //               <span className="bullet">🔄</span>
// // //               <strong>Test First:</strong> Use "Test Location Now" button to verify
// // //             </li>
// // //           </ul>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }


// // // src/components/SOS/SOSButton.jsx
// // import React, { useState, useRef, useEffect, useCallback } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { post } from "../../services/api";
// // import { voiceService } from "../../services/voiceService";
// // import { initializeSOSCommands, stopSOSCommands } from "../../voice-commands/SOSVoiceCommands";
// // import "./SOSButton.css";

// // function speak(text) {
// //   if ("speechSynthesis" in window) {
// //     window.speechSynthesis.cancel();
// //     const utter = new SpeechSynthesisUtterance(text);
// //     utter.rate = 0.8;
// //     utter.volume = 1.0;
// //     window.speechSynthesis.speak(utter);
// //   }
// // }

// // // Format time to Indian Standard Time (IST) or local time
// // const formatTime = (dateString) => {
// //   const date = new Date(dateString);
// //   return date.toLocaleTimeString('en-IN', {
// //     hour: '2-digit',
// //     minute: '2-digit',
// //     second: '2-digit',
// //     hour12: true
// //   }) + ' IST';
// // };

// // // Format decimal to max 6 places
// // const formatDecimal = (num) => {
// //   if (num === null || num === undefined) return "";
// //   const rounded = parseFloat(num.toFixed(6));
// //   return rounded;
// // };

// // // Get location with improved methods
// // const getCurrentLocation = (forceRefresh = false) => {
// //   return new Promise((resolve, reject) => {
// //     if (!("geolocation" in navigator)) {
// //       reject(new Error("Geolocation not supported"));
// //       return;
// //     }

// //     const options = {
// //       enableHighAccuracy: true,
// //       timeout: 30000,
// //       maximumAge: forceRefresh ? 0 : 60000,
// //     };

// //     console.log("Getting location with options:", options);
    
// //     navigator.geolocation.getCurrentPosition(
// //       (position) => {
// //         console.log("Location obtained:", position);
// //         const location = {
// //           lat: position.coords.latitude,
// //           lng: position.coords.longitude,
// //           accuracy: position.coords.accuracy,
// //           altitude: position.coords.altitude,
// //           altitudeAccuracy: position.coords.altitudeAccuracy,
// //           heading: position.coords.heading,
// //           speed: position.coords.speed,
// //           timestamp: new Date(position.timestamp).toISOString(),
// //           source: 'gps',
// //           isFresh: true
// //         };
        
// //         console.log("Location details:", {
// //           coordinates: `${location.lat}, ${location.lng}`,
// //           accuracy: `${location.accuracy} meters`,
// //           timestamp: new Date(location.timestamp).toLocaleString(),
// //         });
        
// //         resolve(location);
// //       },
// //       (error) => {
// //         console.error("Geolocation error:", error);
        
// //         let errorMessage = "Location Error: ";
// //         switch(error.code) {
// //           case error.PERMISSION_DENIED:
// //             errorMessage += "Permission denied. Please enable location services.";
// //             break;
// //           case error.POSITION_UNAVAILABLE:
// //             errorMessage += "Location information unavailable.";
// //             break;
// //           case error.TIMEOUT:
// //             errorMessage += "Location request timed out.";
// //             break;
// //           default:
// //             errorMessage += "Unknown error occurred.";
// //         }
        
// //         console.log(errorMessage);
// //         reject(new Error(errorMessage));
// //       },
// //       options
// //     );
// //   });
// // };

// // // Check if location is likely cached/default
// // const isLikelyCachedLocation = (location) => {
// //   if (!location) return false;
  
// //   if (location.accuracy > 100000) {
// //     console.warn("Location likely cached/default - accuracy too low:", location.accuracy);
// //     return true;
// //   }
  
// //   const now = new Date().getTime();
// //   const locationTime = new Date(location.timestamp).getTime();
// //   const ageInMinutes = (now - locationTime) / (1000 * 60);
  
// //   if (ageInMinutes > 5) {
// //     console.warn("Location likely cached - age:", ageInMinutes, "minutes");
// //     return true;
// //   }
  
// //   return false;
// // };

// // export default function SOSButton({ 
// //   showHeader = true 
// // }) {
// //   const navigate = useNavigate();
// //   const [sending, setSending] = useState(false);
// //   const [status, setStatus] = useState("");
// //   const [error, setError] = useState("");
// //   const [countdown, setCountdown] = useState(null);
// //   const [location, setLocation] = useState(null);
// //   const [alertType, setAlertType] = useState("sos");
// //   const [customMessage, setCustomMessage] = useState("Emergency! Please help me.");
// //   const [locationWatching, setLocationWatching] = useState(false);
// //   const [locationAccuracy, setLocationAccuracy] = useState(null);
// //   const [isGettingLocation, setIsGettingLocation] = useState(false);
// //   const [showVoiceHelp, setShowVoiceHelp] = useState(false);
  
// //   const watchIdRef = useRef(null);
// //   const lastLocationRef = useRef(null);
  
// //   // Safety: require double-press within 1.5s to confirm
// //   const lastPressRef = useRef(0);
// //   const countdownRef = useRef(null);

// //   // Cleanup location watcher on component unmount
// //   useEffect(() => {
// //     return () => {
// //       if (watchIdRef.current !== null) {
// //         navigator.geolocation.clearWatch(watchIdRef.current);
// //         console.log("Location watcher stopped");
// //       }
// //     };
// //   }, []);

// //   const handleBackToDashboard = useCallback(() => {
// //     navigate("/dashboard");
// //   }, [navigate]);

// //   // Improved location watching
// //   const startLocationWatching = useCallback(() => {
// //     if (!("geolocation" in navigator)) {
// //       const errorMsg = "Geolocation not supported by your device";
// //       setError(errorMsg);
// //       speak(errorMsg);
// //       return false;
// //     }

// //     console.log("Starting location watching...");
// //     setStatus("Starting live location tracking...");
// //     speak("Starting live location tracking. Please wait for GPS signal.");

// //     if (watchIdRef.current !== null) {
// //       navigator.geolocation.clearWatch(watchIdRef.current);
// //     }

// //     watchIdRef.current = navigator.geolocation.watchPosition(
// //       (position) => {
// //         const newLocation = {
// //           lat: position.coords.latitude,
// //           lng: position.coords.longitude,
// //           accuracy: position.coords.accuracy,
// //           timestamp: new Date(position.timestamp).toISOString(),
// //           source: 'gps_live',
// //         };
        
// //         console.log("Live location update:", {
// //           coordinates: `${newLocation.lat}, ${newLocation.lng}`,
// //           accuracy: `${newLocation.accuracy}m`,
// //         });
        
// //         lastLocationRef.current = newLocation;
// //         setLocation(newLocation);
// //         setLocationAccuracy(position.coords.accuracy);
// //         setLocationWatching(true);
        
// //         if (position.coords.accuracy < 20) {
// //           setStatus("📍 Live location active (High accuracy)");
// //         } else if (position.coords.accuracy < 100) {
// //           setStatus("📍 Live location active (Good accuracy)");
// //         } else if (position.coords.accuracy < 1000) {
// //           setStatus("📍 Live location active (Moderate accuracy)");
// //         } else {
// //           setStatus("📍 Live location active (Low accuracy - GPS signal weak)");
// //         }
// //       },
// //       (err) => {
// //         console.error("Location watch error:", err);
// //         let errorMsg;
// //         switch(err.code) {
// //           case err.PERMISSION_DENIED:
// //             errorMsg = "❌ Location access denied. Please enable location services.";
// //             break;
// //           case err.POSITION_UNAVAILABLE:
// //             errorMsg = "❌ GPS signal unavailable.";
// //             break;
// //           case err.TIMEOUT:
// //             errorMsg = "❌ Location request timed out.";
// //             break;
// //           default:
// //             errorMsg = "❌ Unable to get live location.";
// //         }
// //         setError(errorMsg);
// //         speak("Unable to get live location");
// //         setLocationWatching(false);
// //       },
// //       {
// //         enableHighAccuracy: true,
// //         timeout: 30000,
// //         maximumAge: 0,
// //         distanceFilter: 5,
// //       }
// //     );

// //     return true;
// //   }, []);

// //   // Stop watching location
// //   const stopLocationWatching = useCallback(() => {
// //     if (watchIdRef.current !== null) {
// //       navigator.geolocation.clearWatch(watchIdRef.current);
// //       watchIdRef.current = null;
// //       console.log("Location watching stopped");
// //     }
// //     setLocationWatching(false);
// //     setStatus("Location tracking stopped");
// //   }, []);

// //   const handleClick = useCallback(() => {
// //     const now = Date.now();
// //     if (now - lastPressRef.current < 1500) {
// //       if (!locationWatching) {
// //         console.log("Starting location for SOS...");
// //         const started = startLocationWatching();
// //         if (!started) return;
// //       }
// //       startCountdown();
// //     } else {
// //       lastPressRef.current = now;
// //       speak("Press the SOS button again within 1.5 seconds to confirm emergency");
// //       setStatus("Press again to confirm SOS emergency");
      
// //       setTimeout(() => {
// //         if (!countdown) {
// //           setStatus("");
// //         }
// //       }, 2000);
// //     }
// //   }, [locationWatching, startLocationWatching, countdown]);

// //   const startCountdown = useCallback(() => {
// //     let count = 5;
// //     setCountdown(count);
// //     setStatus(`Emergency alert will be sent in ${count} seconds...`);
    
// //     speak(`Emergency alert confirmed. Sending in ${count} seconds.`);
    
// //     countdownRef.current = setInterval(() => {
// //       count -= 1;
// //       setCountdown(count);
      
// //       if (count === 0) {
// //         clearInterval(countdownRef.current);
// //         sendSOS();
// //       } else {
// //         setStatus(`Emergency alert will be sent in ${count} seconds...`);
// //       }
// //     }, 1000);
// //   }, []);

// //   const cancelSOS = useCallback(() => {
// //     if (countdownRef.current) {
// //       clearInterval(countdownRef.current);
// //       countdownRef.current = null;
// //     }
// //     setCountdown(null);
// //     setStatus("SOS cancelled");
// //     speak("Emergency alert cancelled");
    
// //     if (watchIdRef.current) {
// //       stopLocationWatching();
// //     }
    
// //     setTimeout(() => {
// //       setStatus("");
// //     }, 2000);
// //   }, [stopLocationWatching]);

// //   const handleAlertTypeChange = (e) => {
// //     setAlertType(e.target.value);
// //   };

// //   const handleMessageChange = (e) => {
// //     setCustomMessage(e.target.value);
// //   };

// //   const handleResetMessage = () => {
// //     setCustomMessage("Emergency! Please help me.");
// //   };

// //   const sendSOS = useCallback(async () => {
// //     setSending(true);
// //     setError("");
    
// //     try {
// //       let currentLocation = lastLocationRef.current;
// //       let locationSource = 'gps_live';
// //       let forceFresh = false;
      
// //       if (currentLocation && isLikelyCachedLocation(currentLocation)) {
// //         console.warn("Location appears to be cached, forcing fresh location...");
// //         forceFresh = true;
// //         setStatus("Getting fresh location...");
// //       }
      
// //       if (!currentLocation || forceFresh) {
// //         try {
// //           setStatus("Getting your current location...");
// //           speak("Getting your current location");
// //           setIsGettingLocation(true);
          
// //           currentLocation = await getCurrentLocation(forceFresh);
// //           locationSource = currentLocation.source || 'gps_fresh';
          
// //           if (isLikelyCachedLocation(currentLocation)) {
// //             speak("Warning: Location may be approximate due to GPS signal issues");
// //           }
          
// //         } catch (locationError) {
// //           console.warn("Could not get precise location:", locationError);
// //           speak("Could not get precise location, using last known position if available");
// //         } finally {
// //           setIsGettingLocation(false);
// //         }
// //       }
      
// //       let lat = null;
// //       let lng = null;
// //       let locationText = "";
// //       let accuracyMeters = null;
      
// //       if (currentLocation) {
// //         lat = formatDecimal(currentLocation.lat);
// //         lng = formatDecimal(currentLocation.lng);
// //         accuracyMeters = Math.round(currentLocation.accuracy);
        
// //         const istTime = new Date().toLocaleTimeString('en-IN', {
// //           hour: '2-digit',
// //           minute: '2-digit',
// //           second: '2-digit',
// //           hour12: true
// //         });
        
// //         let accuracyNote = "";
// //         if (accuracyMeters > 1000) {
// //           accuracyNote = " (Low accuracy)";
// //         } else if (accuracyMeters > 10000) {
// //           accuracyNote = " (Very low accuracy - may be approximate)";
// //         }
        
// //         locationText = `Location: Lat ${lat}, Lng ${lng}, Accuracy: ${accuracyMeters}m${accuracyNote}, Time: ${istTime} IST`;
        
// //       } else {
// //         const istTime = new Date().toLocaleTimeString('en-IN', {
// //           hour: '2-digit',
// //           minute: '2-digit',
// //           second: '2-digit',
// //           hour12: true
// //         });
// //         locationText = `Location unavailable (GPS/WiFi required). Time: ${istTime} IST`;
// //       }
      
// //       const alertData = {
// //         alert_type: alertType,
// //         message: customMessage.trim() || "Emergency! Please help me.",
// //         location_text: locationText,
// //         is_active: true,
// //       };
      
// //       if (lat !== null && lng !== null) {
// //         alertData.location_lat = lat;
// //         alertData.location_lng = lng;
// //       }
      
// //       console.log("Sending SOS alert:", alertData);
      
// //       setStatus("Sending emergency alert...");
// //       speak("Sending emergency alert");
      
// //       const response = await post("/api/emergency-alerts/", alertData);
      
// //       const successMsg = response.data?.message || "Emergency alert sent successfully!";
// //       setStatus(successMsg);
      
// //       if (currentLocation) {
// //         if (accuracyMeters && accuracyMeters > 10000) {
// //           speak("Emergency alert sent with approximate location. Help is on the way.");
// //         } else {
// //           speak("Emergency alert sent successfully with your location. Help is on the way.");
// //         }
// //       } else {
// //         speak("Emergency alert sent successfully. Location could not be obtained. Help is on the way.");
// //       }
      
// //       if ("vibrate" in navigator) {
// //         navigator.vibrate([200, 100, 200, 100, 200, 100, 200]);
// //       }
      
// //       setTimeout(() => {
// //         stopLocationWatching();
// //         setStatus("");
// //         setSending(false);
// //         setAlertType("sos");
// //         setCustomMessage("Emergency! Please help me.");
// //         setLocation(null);
// //         setLocationWatching(false);
// //       }, 7000);

// //     } catch (err) {
// //       console.error("sendSOS error:", err);
// //       console.error("Error response data:", err.response?.data);
      
// //       let errorMsg = "Failed to send emergency alert. Please try again.";
// //       if (err.response?.data) {
// //         if (err.response.data.detail) {
// //           errorMsg = err.response.data.detail;
// //         } else if (typeof err.response.data === 'object') {
// //           const errors = [];
// //           Object.entries(err.response.data).forEach(([field, messages]) => {
// //             if (Array.isArray(messages)) {
// //               errors.push(...messages.map(m => `${field}: ${m}`));
// //             } else if (typeof messages === 'string') {
// //               errors.push(`${field}: ${messages}`);
// //             }
// //           });
// //           if (errors.length > 0) {
// //             errorMsg = errors.join(', ');
// //           }
// //         } else if (typeof err.response.data === 'string') {
// //           errorMsg = err.response.data;
// //         }
// //       }
      
// //       setError(errorMsg);
// //       speak("Failed to send emergency alert");
// //       setSending(false);
// //       stopLocationWatching();
// //     }
// //   }, [alertType, customMessage, stopLocationWatching]);

// //   const getAccuracyColor = (accuracy) => {
// //     if (!accuracy) return "#757575";
// //     if (accuracy < 20) return "#4CAF50";
// //     if (accuracy < 100) return "#8BC34A";
// //     if (accuracy < 1000) return "#FF9800";
// //     if (accuracy < 10000) return "#F44336";
// //     return "#9C27B0";
// //   };

// //   const getAccuracyLabel = (accuracy) => {
// //     if (!accuracy) return "Unknown";
// //     if (accuracy < 20) return "High";
// //     if (accuracy < 100) return "Good";
// //     if (accuracy < 1000) return "Moderate";
// //     if (accuracy < 10000) return "Low";
// //     return "Approximate";
// //   };

// //   // Get current location on demand
// //   const getOneTimeLocation = useCallback(async () => {
// //     try {
// //       setIsGettingLocation(true);
// //       setStatus("📡 Getting your current location...");
// //       speak("Getting your current location. Please wait for GPS signal.");
      
// //       const location = await getCurrentLocation(true);
// //       setLocation(location);
// //       lastLocationRef.current = location;
// //       setLocationAccuracy(location.accuracy);
      
// //       const accuracyLabel = getAccuracyLabel(location.accuracy);
// //       const message = `📍 Location obtained (${accuracyLabel} accuracy: ${Math.round(location.accuracy)} meters)`;
// //       setStatus(message);
      
// //       if (location.accuracy < 100) {
// //         speak(`Location obtained with good accuracy: ${Math.round(location.accuracy)} meters`);
// //       } else if (location.accuracy < 1000) {
// //         speak(`Location obtained with moderate accuracy: ${Math.round(location.accuracy)} meters`);
// //       } else {
// //         speak(`Location obtained. Accuracy is low. Please go to an open area for better GPS.`);
// //       }
      
// //       return location;
// //     } catch (error) {
// //       console.error("Failed to get location:", error);
// //       const errorMsg = `❌ Could not get your current location: ${error.message}`;
// //       setError(errorMsg);
// //       speak("Could not get location. Please check GPS and try again.");
// //       return null;
// //     } finally {
// //       setIsGettingLocation(false);
// //     }
// //   }, []);

// //   // Browser location permission check
// //   const checkLocationPermission = useCallback(async () => {
// //     if (!navigator.permissions) {
// //       console.log("Permissions API not supported");
// //       return;
// //     }
    
// //     try {
// //       const permissionStatus = await navigator.permissions.query({ name: 'geolocation' });
// //       console.log("Location permission status:", permissionStatus.state);
      
// //       if (permissionStatus.state === 'denied') {
// //         setError("❌ Location permission denied. Please enable location access.");
// //         speak("Location permission denied. Please enable location in browser settings.");
// //       } else if (permissionStatus.state === 'prompt') {
// //         setStatus("📍 Please allow location access when prompted.");
// //         speak("Please allow location access when prompted.");
// //       } else if (permissionStatus.state === 'granted') {
// //         setStatus("✅ Location permission granted!");
// //         speak("Location permission granted!");
// //         setTimeout(() => setStatus(""), 3000);
// //       }
      
// //       permissionStatus.onchange = () => {
// //         console.log("Location permission changed to:", permissionStatus.state);
// //         if (permissionStatus.state === 'granted') {
// //           setStatus("✅ Location permission granted!");
// //           speak("Location permission granted!");
// //           setTimeout(() => setStatus(""), 3000);
// //         }
// //       };
// //     } catch (err) {
// //       console.log("Could not check location permission:", err);
// //     }
// //   }, []);

// //   // Check permission on mount
// //   useEffect(() => {
// //     checkLocationPermission();
// //   }, [checkLocationPermission]);

// //   // Initialize voice commands
// //   useEffect(() => {
// //     // Check if voice service is available
// //     if (!voiceService.isAvailable()) {
// //       setStatus("Voice recognition is not supported in your browser.");
// //       return;
// //     }

// //     // Set up voice commands after a brief delay
// //     const setupVoiceCommands = () => {
// //       // Stop any existing listening first
// //       if (voiceService.isListening) {
// //         voiceService.stopListening();
// //       }

// //       // Create handlers object
// //       const handlers = {
// //         handleBackToDashboard,
// //         handleLogout: async () => {
// //           setStatus("Logging out...");
// //           speak("Logging out...");

// //           try {
// //             const token = localStorage.getItem("token");
// //             if (token) {
// //               await post(
// //                 "http://127.0.0.1:8000/auth/voice-logout/",
// //                 {},
// //                 {
// //                   headers: {
// //                     Authorization: `Bearer ${token}`,
// //                     "Content-Type": "application/json",
// //                   },
// //                 }
// //               );
// //             }
// //           } catch (error) {
// //             console.error("Logout backend error:", error);
// //           } finally {
// //             voiceService.stopListening();
// //             localStorage.clear();
// //             setTimeout(() => navigate("/"), 1500);
// //           }
// //         },
// //         navigate,
// //         setStatus,
// //         speak,
// //         setAlertType,
// //         setCustomMessage,
// //         alertType,
// //         customMessage,
// //         sendSOS,
// //         cancelSOS,
// //         getOneTimeLocation,
// //         startLocationWatching,
// //         stopLocationWatching,
// //         checkLocationPermission,
// //         setError,
// //         setShowVoiceHelp
// //       };

// //       // Initialize SOS-specific commands
// //       initializeSOSCommands(handlers);
// //     };

// //     // Delay setup to ensure component is fully mounted
// //     const timer = setTimeout(setupVoiceCommands, 500);

// //     return () => {
// //       clearTimeout(timer);
// //       stopSOSCommands();
// //     };
// //   }, [
// //     handleBackToDashboard,
// //     navigate,
// //     sendSOS,
// //     cancelSOS,
// //     getOneTimeLocation,
// //     startLocationWatching,
// //     stopLocationWatching,
// //     checkLocationPermission,
// //     alertType,
// //     customMessage
// //   ]);

// //   // Toggle voice recognition
// //   const toggleVoiceRecognition = () => {
// //     if (voiceService.isListening) {
// //       voiceService.stopListening();
// //       const message = "Voice recognition stopped.";
// //       setStatus(message);
// //       speak(message);
// //     } else {
// //       try {
// //         voiceService.startListening();
// //         const message = "Voice recognition started. Say 'help' for commands.";
// //         setStatus(message);
// //         speak(message);
// //       } catch (error) {
// //         console.error("Error starting voice recognition:", error);
// //         const errorMessage = "Error starting voice recognition.";
// //         setStatus(errorMessage);
// //         speak(errorMessage);
// //       }
// //     }
// //   };

// //   // Handle logout
// //   const handleLogout = async () => {
// //     setStatus("Logging out...");
// //     speak("Logging out...");

// //     try {
// //       const token = localStorage.getItem("token");
// //       if (token) {
// //         await post(
// //           "http://127.0.0.1:8000/auth/voice-logout/",
// //           {},
// //           {
// //             headers: {
// //               Authorization: `Bearer ${token}`,
// //               "Content-Type": "application/json",
// //             },
// //           }
// //         );
// //       }
// //     } catch (error) {
// //       console.error("Logout backend error:", error);
// //     } finally {
// //       voiceService.stopListening();
// //       localStorage.clear();
// //       setTimeout(() => navigate("/"), 1500);
// //     }
// //   };

// //   return (
// //     <div className="sos-page-container">
// //       {/* Back Button Header */}
// //       <div className="sos-page-header">
// //         <button className="back-button" onClick={handleBackToDashboard}>
// //           ← Back to Dashboard
// //         </button>
// //       </div>

// //       <div className="sos-container">
// //         {showHeader && (
// //           <div className="sos-header">
// //             <h2>🚨 Emergency SOS</h2>
// //             <p className="sos-description">
// //               Double-tap the SOS button or use voice commands for emergency alert.
// //               Say "help" for voice command guide.
// //             </p>
            
// //             {/* Voice button */}
// //             <div className="voice-control-section">
// //               <button 
// //                 className={`voice-btn ${voiceService.isListening ? 'listening' : ''}`}
// //                 onClick={toggleVoiceRecognition}
// //                 title={voiceService.isListening ? "Stop listening" : "Start voice commands"}
// //               >
// //                 {voiceService.isListening ? "🎤 Listening..." : "🎤 Voice"}
// //               </button>
              
// //               <button 
// //                 className="voice-help-btn"
// //                 onClick={() => setShowVoiceHelp(!showVoiceHelp)}
// //               >
// //                 {showVoiceHelp ? "Hide Voice Help" : "Show Voice Commands"}
// //               </button>
// //             </div>
// //           </div>
// //         )}

// //         {/* Voice Commands Help Panel */}
// //         {showVoiceHelp && (
// //           <div className="voice-help-panel">
// //             <h3>🎤 SOS Voice Commands Guide</h3>
// //             <div className="voice-commands-grid">
// //               <div className="voice-category">
// //                 <h4>Emergency Commands</h4>
// //                 <ul>
// //                   <li>"Emergency" - Activate SOS</li>
// //                   <li>"SOS" - Quick emergency</li>
// //                   <li>"Help me" - Call for help</li>
// //                   <li>"Medical emergency" - Medical alert</li>
// //                   <li>"Fire emergency" - Fire alert</li>
// //                   <li>"Accident emergency" - Accident alert</li>
// //                 </ul>
// //               </div>
              
// //               <div className="voice-category">
// //                 <h4>Location Commands</h4>
// //                 <ul>
// //                   <li>"Get location" - Check current location</li>
// //                   <li>"Start tracking" - Live location</li>
// //                   <li>"Stop tracking" - Stop tracking</li>
// //                   <li>"Test location" - Test GPS</li>
// //                   <li>"Where am I" - Location query</li>
// //                 </ul>
// //               </div>
              
// //               <div className="voice-category">
// //                 <h4>Message Commands</h4>
// //                 <ul>
// //                   <li>"Message [your message]" - Set custom message</li>
// //                   <li>"Reset message" - Default message</li>
// //                   <li>"I am lost near market" - Natural language</li>
// //                   <li>"Medical heart pain" - Emergency details</li>
// //                 </ul>
// //               </div>
              
// //               <div className="voice-category">
// //                 <h4>Control Commands</h4>
// //                 <ul>
// //                   <li>"Cancel emergency" - Abort SOS</li>
// //                   <li>"Clear status" - Clear messages</li>
// //                   <li>"Help" - Show this guide</li>
// //                   <li>"Go to dashboard" - Go back</li>
// //                   <li>"Logout" - Sign out</li>
// //                 </ul>
// //               </div>
// //             </div>
            
// //             <div className="voice-tips">
// //               <p><strong>Tip:</strong> Speak naturally. Examples: "Emergency I need help", "Message I'm at the park", "Medical I have chest pain"</p>
// //               <button 
// //                 className="close-help-btn"
// //                 onClick={() => setShowVoiceHelp(false)}
// //               >
// //                 Close Help
// //               </button>
// //             </div>
// //           </div>
// //         )}

// //         {/* Location Troubleshooting Tips */}
// //         {(error && error.includes("permission") || error.includes("GPS")) && (
// //           <div className="troubleshooting-tips">
// //             <h4>🔧 Location Troubleshooting:</h4>
// //             <ul>
// //               <li>1. Check browser settings → Allow location access</li>
// //               <li>2. Enable GPS on your device</li>
// //               <li>3. Connect to WiFi for better accuracy</li>
// //               <li>4. Go to an open area/outside</li>
// //               <li>5. Say "check permission" to verify</li>
// //             </ul>
// //           </div>
// //         )}

// //         {/* Live Location Status */}
// //         {locationWatching && !sending && (
// //           <div className="live-location-status">
// //             <div className="live-indicator">
// //               <span className="live-pulse"></span>
// //               <span className="live-text">LIVE LOCATION ACTIVE</span>
// //             </div>
// //             <div className="accuracy-indicator">
// //               <div 
// //                 className="accuracy-bar" 
// //                 style={{ 
// //                   width: `${Math.min(100, (1000 / (locationAccuracy || 1000)))}%`,
// //                   backgroundColor: getAccuracyColor(locationAccuracy || 1000)
// //                 }}
// //               ></div>
// //               <span className="accuracy-text">
// //                 Accuracy: {getAccuracyLabel(locationAccuracy)} ({locationAccuracy ? Math.round(locationAccuracy) : '--'} meters)
// //               </span>
// //             </div>
// //           </div>
// //         )}

// //         {/* Status Messages */}
// //         {status && (
// //           <div className={`status-message ${countdown ? 'countdown-active' : ''}`}>
// //             {countdown && (
// //               <div className="countdown-circle">
// //                 <span>{countdown}</span>
// //               </div>
// //             )}
// //             <div className="status-content">
// //               <p className="status-text">{status}</p>
// //               {countdown && (
// //                 <button className="cancel-button" onClick={cancelSOS}>
// //                   Cancel Emergency
// //                 </button>
// //               )}
// //             </div>
// //           </div>
// //         )}

// //         {error && (
// //           <div className="error-message">
// //             <div className="error-icon">⚠️</div>
// //             <div className="error-content">
// //               <p className="error-text">{error}</p>
// //               <button className="retry-button" onClick={() => setError("")}>
// //                 Dismiss
// //               </button>
// //             </div>
// //           </div>
// //         )}

// //         {/* Alert Type Selection */}
// //         <div className="config-section">
// //           <label htmlFor="alert-type" className="section-label">
// //             <span className="section-icon">📋</span>
// //             Type of Emergency
// //           </label>
// //           <select
// //             id="alert-type"
// //             value={alertType}
// //             onChange={handleAlertTypeChange}
// //             className="alert-type-select"
// //             disabled={sending || countdown || locationWatching || isGettingLocation}
// //           >
// //             <option value="sos">🚨 General Emergency (SOS)</option>
// //             <option value="medical">🏥 Medical Emergency</option>
// //             <option value="safety">🛡️ Safety Threat</option>
// //             <option value="fire">🔥 Fire Emergency</option>
// //             <option value="accident">🚗 Accident</option>
// //             <option value="lost">🧭 Lost/Disoriented</option>
// //             <option value="other">⚠️ Other Emergency</option>
// //           </select>
// //           <span className="voice-hint">Say: "medical emergency", "fire emergency", etc.</span>
// //         </div>

// //         {/* Custom Message */}
// //         <div className="config-section">
// //           <label htmlFor="message" className="section-label">
// //             <span className="section-icon">✏️</span>
// //             Emergency Message
// //           </label>
// //           <div className="message-container">
// //             <textarea
// //               id="message"
// //               value={customMessage}
// //               onChange={handleMessageChange}
// //               placeholder="Describe your emergency situation..."
// //               className="message-input"
// //               rows="3"
// //               disabled={sending || countdown || locationWatching || isGettingLocation}
// //             />
// //             <button
// //               type="button"
// //               className="reset-button"
// //               onClick={handleResetMessage}
// //               disabled={sending || countdown || locationWatching || isGettingLocation}
// //             >
// //               Reset
// //             </button>
// //           </div>
// //           <p className="field-hint">
// //             This message will be emailed to your emergency contacts.
// //             <br />
// //             <span className="voice-hint">Say: "message [your message]" or "I am lost near [location]"</span>
// //           </p>
// //         </div>

// //         {/* SOS Button */}
// //         <div className="sos-button-section">
// //           <button
// //             onClick={handleClick}
// //             disabled={sending || countdown || isGettingLocation}
// //             className={`sos-main-button ${countdown ? 'countdown-active' : ''} ${locationWatching ? 'location-active' : ''} ${isGettingLocation ? 'getting-location' : ''}`}
// //             aria-label="Send SOS emergency alert"
// //           >
// //             {sending ? (
// //               <>
// //                 <span className="button-spinner"></span>
// //                 <span className="button-text">Sending Emergency Alert...</span>
// //               </>
// //             ) : isGettingLocation ? (
// //               <>
// //                 <span className="button-spinner"></span>
// //                 <span className="button-text">Getting Location...</span>
// //               </>
// //             ) : countdown ? (
// //               <>
// //                 <span className="countdown-animation"></span>
// //                 <span className="button-text">Cancel Emergency</span>
// //               </>
// //             ) : locationWatching ? (
// //               <>
// //                 <span className="live-location-icon">📍</span>
// //                 <span className="button-text">TRACKING LIVE LOCATION</span>
// //               </>
// //             ) : (
// //               <>
// //                 <span className="sos-main-icon">🚨</span>
// //                 <span className="button-text">SOS EMERGENCY</span>
// //               </>
// //             )}
// //           </button>
          
// //           {!sending && !countdown && !locationWatching && !isGettingLocation && (
// //             <div className="sos-instruction">
// //               <p className="instruction-text">
// //                 <span className="instruction-icon">⚠️</span>
// //                 Double-tap button OR say "emergency" for voice command
// //               </p>
// //             </div>
// //           )}
          
// //           {locationWatching && !countdown && (
// //             <div className="location-instruction">
// //               <p className="instruction-text">
// //                 <span className="instruction-icon">📍</span>
// //                 Location tracking active. Press button again or say "send SOS".
// //               </p>
// //             </div>
// //           )}
// //         </div>

// //         {/* Location Actions */}
// //         <div className="location-actions">
// //           <button
// //             className="location-test-button"
// //             onClick={getOneTimeLocation}
// //             disabled={sending || countdown || locationWatching || isGettingLocation}
// //           >
// //             {isGettingLocation ? (
// //               <>
// //                 <span className="button-spinner-small"></span>
// //                 <span>Getting Location...</span>
// //               </>
// //             ) : (
// //               <>
// //                 <span className="location-icon">📍</span>
// //                 <span>Test Location Now</span>
// //               </>
// //             )}
// //           </button>
          
// //           {location && locationWatching && (
// //             <button
// //               className="stop-location-button"
// //               onClick={stopLocationWatching}
// //               disabled={sending || countdown || isGettingLocation}
// //             >
// //               <span className="stop-icon">⏹️</span>
// //               Stop Live Tracking
// //             </button>
// //           )}
          
// //           <button
// //             className="permission-button"
// //             onClick={checkLocationPermission}
// //             disabled={sending || countdown || isGettingLocation}
// //           >
// //             <span className="permission-icon">🔧</span>
// //             Check Permission
// //           </button>
// //         </div>

// //         {/* Current Location Display */}
// //         {location && (
// //           <div className="current-location-section">
// //             <h3 className="location-title">
// //               <span className="location-icon">📍</span>
// //               Current Location
// //               <span className="location-source-badge" style={{ 
// //                 backgroundColor: getAccuracyColor(location.accuracy),
// //                 color: location.accuracy < 1000 ? '#fff' : '#000'
// //               }}>
// //                 {getAccuracyLabel(location.accuracy)} ACCURACY
// //               </span>
// //             </h3>
// //             <div className="location-grid">
// //               <div className="location-item">
// //                 <span className="location-label">Latitude:</span>
// //                 <span className="location-value coordinate">{location.lat.toFixed(6)}</span>
// //               </div>
// //               <div className="location-item">
// //                 <span className="location-label">Longitude:</span>
// //                 <span className="location-value coordinate">{location.lng.toFixed(6)}</span>
// //               </div>
// //               <div className="location-item">
// //                 <span className="location-label">Accuracy:</span>
// //                 <span className="location-value" style={{ color: getAccuracyColor(location.accuracy) }}>
// //                   {Math.round(location.accuracy)} meters ({getAccuracyLabel(location.accuracy)})
// //                 </span>
// //               </div>
// //               <div className="location-item">
// //                 <span className="location-label">Last Updated:</span>
// //                 <span className="location-value">
// //                   {formatTime(location.timestamp)}
// //                 </span>
// //               </div>
// //             </div>
// //             <div className="map-actions">
// //               <a
// //                 href={`https://maps.google.com/?q=${location.lat},${location.lng}`}
// //                 target="_blank"
// //                 rel="noopener noreferrer"
// //                 className="map-link-button"
// //               >
// //                 <span className="map-icon">🗺️</span>
// //                 View on Google Maps
// //               </a>
// //               {location.accuracy > 1000 && (
// //                 <div className="accuracy-warning">
// //                   <span className="warning-icon">⚠️</span>
// //                   <span>Low accuracy. For better results, go outside or connect to WiFi.</span>
// //                 </div>
// //               )}
// //             </div>
// //           </div>
// //         )}

// //         {/* Information Panel */}
// //         <div className="info-panel">
// //           <h3 className="info-title">
// //             <span className="info-icon">ℹ️</span>
// //             Voice Command Tips
// //           </h3>
// //           <ul className="info-list">
// //             <li className="info-item">
// //               <span className="bullet">🎤</span>
// //               <strong>Say "Emergency":</strong> Activate SOS mode
// //             </li>
// //             <li className="info-item">
// //               <span className="bullet">📍</span>
// //               <strong>Say "Get location":</strong> Check your current position
// //             </li>
// //             <li className="info-item">
// //               <span className="bullet">📝</span>
// //               <strong>Say "Message [text]":</strong> Set custom emergency message
// //             </li>
// //             <li className="info-item">
// //               <span className="bullet">🚑</span>
// //               <strong>Say "Medical emergency":</strong> Specific alert type
// //             </li>
// //             <li className="info-item">
// //               <span className="bullet">🛑</span>
// //               <strong>Say "Cancel emergency":</strong> Abort SOS countdown
// //             </li>
// //           </ul>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // } 


// // src/components/SOS/SOSButton.jsx
// import React, { useState, useRef, useEffect, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import { post } from "../../services/api";
// import { voiceService } from "../../services/voiceService";
// import { initializeSOSCommands, stopSOSCommands } from "../../voice-commands/SOSVoiceCommands";
// import "./SOSButton.css";

// function speak(text) {
//   if ("speechSynthesis" in window) {
//     window.speechSynthesis.cancel();
//     const utter = new SpeechSynthesisUtterance(text);
//     utter.rate = 0.8;
//     utter.volume = 1.0;
//     window.speechSynthesis.speak(utter);
//   }
// }

// // Format time to Indian Standard Time (IST) or local time
// const formatTime = (dateString) => {
//   const date = new Date(dateString);
//   return date.toLocaleTimeString('en-IN', {
//     hour: '2-digit',
//     minute: '2-digit',
//     second: '2-digit',
//     hour12: true
//   }) + ' IST';
// };

// // Format decimal to max 6 places
// const formatDecimal = (num) => {
//   if (num === null || num === undefined) return "";
//   const rounded = parseFloat(num.toFixed(6));
//   return rounded;
// };

// // Get location with improved methods
// const getCurrentLocation = (forceRefresh = false) => {
//   return new Promise((resolve, reject) => {
//     if (!("geolocation" in navigator)) {
//       reject(new Error("Geolocation not supported"));
//       return;
//     }

//     const options = {
//       enableHighAccuracy: true,
//       timeout: 30000,
//       maximumAge: forceRefresh ? 0 : 60000,
//     };

//     console.log("Getting location with options:", options);
    
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         console.log("Location obtained:", position);
//         const location = {
//           lat: position.coords.latitude,
//           lng: position.coords.longitude,
//           accuracy: position.coords.accuracy,
//           altitude: position.coords.altitude,
//           altitudeAccuracy: position.coords.altitudeAccuracy,
//           heading: position.coords.heading,
//           speed: position.coords.speed,
//           timestamp: new Date(position.timestamp).toISOString(),
//           source: 'gps',
//           isFresh: true
//         };
        
//         console.log("Location details:", {
//           coordinates: `${location.lat}, ${location.lng}`,
//           accuracy: `${location.accuracy} meters`,
//           timestamp: new Date(location.timestamp).toLocaleString(),
//         });
        
//         resolve(location);
//       },
//       (error) => {
//         console.error("Geolocation error:", error);
        
//         let errorMessage = "Location Error: ";
//         switch(error.code) {
//           case error.PERMISSION_DENIED:
//             errorMessage += "Permission denied. Please enable location services.";
//             break;
//           case error.POSITION_UNAVAILABLE:
//             errorMessage += "Location information unavailable.";
//             break;
//           case error.TIMEOUT:
//             errorMessage += "Location request timed out.";
//             break;
//           default:
//             errorMessage += "Unknown error occurred.";
//         }
        
//         console.log(errorMessage);
//         reject(new Error(errorMessage));
//       },
//       options
//     );
//   });
// };

// // Check if location is likely cached/default
// const isLikelyCachedLocation = (location) => {
//   if (!location) return false;
  
//   if (location.accuracy > 100000) {
//     console.warn("Location likely cached/default - accuracy too low:", location.accuracy);
//     return true;
//   }
  
//   const now = new Date().getTime();
//   const locationTime = new Date(location.timestamp).getTime();
//   const ageInMinutes = (now - locationTime) / (1000 * 60);
  
//   if (ageInMinutes > 5) {
//     console.warn("Location likely cached - age:", ageInMinutes, "minutes");
//     return true;
//   }
  
//   return false;
// };

// export default function SOSButton({ 
//   showHeader = true 
// }) {
//   const navigate = useNavigate();
//   const [sending, setSending] = useState(false);
//   const [status, setStatus] = useState("");
//   const [error, setError] = useState("");
//   const [countdown, setCountdown] = useState(null);
//   const [location, setLocation] = useState(null);
//   const [alertType, setAlertType] = useState("sos");
//   const [customMessage, setCustomMessage] = useState("Emergency! Please help me.");
//   const [locationWatching, setLocationWatching] = useState(false);
//   const [locationAccuracy, setLocationAccuracy] = useState(null);
//   const [isGettingLocation, setIsGettingLocation] = useState(false);
//   const [showVoiceHelp, setShowVoiceHelp] = useState(false);
  
//   const watchIdRef = useRef(null);
//   const lastLocationRef = useRef(null);
  
//   // Safety: require double-press within 1.5s to confirm
//   const lastPressRef = useRef(0);
//   const countdownRef = useRef(null);

//   // Cleanup location watcher on component unmount
//   useEffect(() => {
//     return () => {
//       if (watchIdRef.current !== null) {
//         navigator.geolocation.clearWatch(watchIdRef.current);
//         console.log("Location watcher stopped");
//       }
//     };
//   }, []);

//   const handleBackToDashboard = useCallback(() => {
//     navigate("/dashboard");
//   }, [navigate]);

//   // Improved location watching
//   const startLocationWatching = useCallback(() => {
//     if (!("geolocation" in navigator)) {
//       const errorMsg = "Geolocation not supported by your device";
//       setError(errorMsg);
//       speak(errorMsg);
//       return false;
//     }

//     console.log("Starting location watching...");
//     setStatus("Starting live location tracking...");
//     speak("Starting live location tracking. Please wait for GPS signal.");

//     if (watchIdRef.current !== null) {
//       navigator.geolocation.clearWatch(watchIdRef.current);
//     }

//     watchIdRef.current = navigator.geolocation.watchPosition(
//       (position) => {
//         const newLocation = {
//           lat: position.coords.latitude,
//           lng: position.coords.longitude,
//           accuracy: position.coords.accuracy,
//           timestamp: new Date(position.timestamp).toISOString(),
//           source: 'gps_live',
//         };
        
//         console.log("Live location update:", {
//           coordinates: `${newLocation.lat}, ${newLocation.lng}`,
//           accuracy: `${newLocation.accuracy}m`,
//         });
        
//         lastLocationRef.current = newLocation;
//         setLocation(newLocation);
//         setLocationAccuracy(position.coords.accuracy);
//         setLocationWatching(true);
        
//         if (position.coords.accuracy < 20) {
//           setStatus("📍 Live location active (High accuracy)");
//         } else if (position.coords.accuracy < 100) {
//           setStatus("📍 Live location active (Good accuracy)");
//         } else if (position.coords.accuracy < 1000) {
//           setStatus("📍 Live location active (Moderate accuracy)");
//         } else {
//           setStatus("📍 Live location active (Low accuracy - GPS signal weak)");
//         }
//       },
//       (err) => {
//         console.error("Location watch error:", err);
//         let errorMsg;
//         switch(err.code) {
//           case err.PERMISSION_DENIED:
//             errorMsg = "❌ Location access denied. Please enable location services.";
//             break;
//           case err.POSITION_UNAVAILABLE:
//             errorMsg = "❌ GPS signal unavailable.";
//             break;
//           case err.TIMEOUT:
//             errorMsg = "❌ Location request timed out.";
//             break;
//           default:
//             errorMsg = "❌ Unable to get live location.";
//         }
//         setError(errorMsg);
//         speak("Unable to get live location");
//         setLocationWatching(false);
//       },
//       {
//         enableHighAccuracy: true,
//         timeout: 30000,
//         maximumAge: 0,
//         distanceFilter: 5,
//       }
//     );

//     return true;
//   }, []);

//   // Stop watching location
//   const stopLocationWatching = useCallback(() => {
//     if (watchIdRef.current !== null) {
//       navigator.geolocation.clearWatch(watchIdRef.current);
//       watchIdRef.current = null;
//       console.log("Location watching stopped");
//     }
//     setLocationWatching(false);
//     setStatus("Location tracking stopped");
//   }, []);

//   const handleClick = useCallback(() => {
//     const now = Date.now();
//     if (now - lastPressRef.current < 1500) {
//       if (!locationWatching) {
//         console.log("Starting location for SOS...");
//         const started = startLocationWatching();
//         if (!started) return;
//       }
//       startCountdown();
//     } else {
//       lastPressRef.current = now;
//       speak("Press the SOS button again within 1.5 seconds to confirm emergency");
//       setStatus("Press again to confirm SOS emergency");
      
//       setTimeout(() => {
//         if (!countdown) {
//           setStatus("");
//         }
//       }, 2000);
//     }
//   }, [locationWatching, startLocationWatching, countdown]);

//   // Add startCountdown function
//   const startCountdown = useCallback(() => {
//     let count = 5;
//     setCountdown(count);
//     setStatus(`Emergency alert will be sent in ${count} seconds...`);
    
//     speak(`Emergency alert confirmed. Sending in ${count} seconds.`);
    
//     const interval = setInterval(() => {
//       count -= 1;
//       setCountdown(count);
      
//       if (count === 0) {
//         clearInterval(interval);
//         sendSOS();
//       } else {
//         setStatus(`Emergency alert will be sent in ${count} seconds...`);
//       }
//     }, 1000);
    
//     // Store interval reference
//     countdownRef.current = interval;
//   }, [sendSOS]);

//   const cancelSOS = useCallback(() => {
//     if (countdownRef.current) {
//       clearInterval(countdownRef.current);
//       countdownRef.current = null;
//     }
//     setCountdown(null);
//     setStatus("SOS cancelled");
//     speak("Emergency alert cancelled");
    
//     if (watchIdRef.current) {
//       stopLocationWatching();
//     }
    
//     setTimeout(() => {
//       setStatus("");
//     }, 2000);
//   }, [stopLocationWatching]);

//   const handleAlertTypeChange = (e) => {
//     setAlertType(e.target.value);
//   };

//   const handleMessageChange = (e) => {
//     setCustomMessage(e.target.value);
//   };

//   const handleResetMessage = () => {
//     setCustomMessage("Emergency! Please help me.");
//   };

//   const sendSOS = useCallback(async () => {
//     setSending(true);
//     setError("");
    
//     try {
//       let currentLocation = lastLocationRef.current;
//       let locationSource = 'gps_live';
//       let forceFresh = false;
      
//       if (currentLocation && isLikelyCachedLocation(currentLocation)) {
//         console.warn("Location appears to be cached, forcing fresh location...");
//         forceFresh = true;
//         setStatus("Getting fresh location...");
//       }
      
//       if (!currentLocation || forceFresh) {
//         try {
//           setStatus("Getting your current location...");
//           speak("Getting your current location");
//           setIsGettingLocation(true);
          
//           currentLocation = await getCurrentLocation(forceFresh);
//           locationSource = currentLocation.source || 'gps_fresh';
          
//           if (isLikelyCachedLocation(currentLocation)) {
//             speak("Warning: Location may be approximate due to GPS signal issues");
//           }
          
//         } catch (locationError) {
//           console.warn("Could not get precise location:", locationError);
//           speak("Could not get precise location, using last known position if available");
//         } finally {
//           setIsGettingLocation(false);
//         }
//       }
      
//       let lat = null;
//       let lng = null;
//       let locationText = "";
//       let accuracyMeters = null;
      
//       if (currentLocation) {
//         lat = formatDecimal(currentLocation.lat);
//         lng = formatDecimal(currentLocation.lng);
//         accuracyMeters = Math.round(currentLocation.accuracy);
        
//         const istTime = new Date().toLocaleTimeString('en-IN', {
//           hour: '2-digit',
//           minute: '2-digit',
//           second: '2-digit',
//           hour12: true
//         });
        
//         let accuracyNote = "";
//         if (accuracyMeters > 1000) {
//           accuracyNote = " (Low accuracy)";
//         } else if (accuracyMeters > 10000) {
//           accuracyNote = " (Very low accuracy - may be approximate)";
//         }
        
//         locationText = `Location: Lat ${lat}, Lng ${lng}, Accuracy: ${accuracyMeters}m${accuracyNote}, Time: ${istTime} IST`;
        
//       } else {
//         const istTime = new Date().toLocaleTimeString('en-IN', {
//           hour: '2-digit',
//           minute: '2-digit',
//           second: '2-digit',
//           hour12: true
//         });
//         locationText = `Location unavailable (GPS/WiFi required). Time: ${istTime} IST`;
//       }
      
//       const alertData = {
//         alert_type: alertType,
//         message: customMessage.trim() || "Emergency! Please help me.",
//         location_text: locationText,
//         is_active: true,
//       };
      
//       if (lat !== null && lng !== null) {
//         alertData.location_lat = lat;
//         alertData.location_lng = lng;
//       }
      
//       console.log("Sending SOS alert:", alertData);
      
//       setStatus("Sending emergency alert...");
//       speak("Sending emergency alert");
      
//       const response = await post("/api/emergency-alerts/", alertData);
      
//       const successMsg = response.data?.message || "Emergency alert sent successfully!";
//       setStatus(successMsg);
      
//       if (currentLocation) {
//         if (accuracyMeters && accuracyMeters > 10000) {
//           speak("Emergency alert sent with approximate location. Help is on the way.");
//         } else {
//           speak("Emergency alert sent successfully with your location. Help is on the way.");
//         }
//       } else {
//         speak("Emergency alert sent successfully. Location could not be obtained. Help is on the way.");
//       }
      
//       if ("vibrate" in navigator) {
//         navigator.vibrate([200, 100, 200, 100, 200, 100, 200]);
//       }
      
//       setTimeout(() => {
//         stopLocationWatching();
//         setStatus("");
//         setSending(false);
//         setAlertType("sos");
//         setCustomMessage("Emergency! Please help me.");
//         setLocation(null);
//         setLocationWatching(false);
//       }, 7000);

//     } catch (err) {
//       console.error("sendSOS error:", err);
//       console.error("Error response data:", err.response?.data);
      
//       let errorMsg = "Failed to send emergency alert. Please try again.";
//       if (err.response?.data) {
//         if (err.response.data.detail) {
//           errorMsg = err.response.data.detail;
//         } else if (typeof err.response.data === 'object') {
//           const errors = [];
//           Object.entries(err.response.data).forEach(([field, messages]) => {
//             if (Array.isArray(messages)) {
//               errors.push(...messages.map(m => `${field}: ${m}`));
//             } else if (typeof messages === 'string') {
//               errors.push(`${field}: ${messages}`);
//             }
//           });
//           if (errors.length > 0) {
//             errorMsg = errors.join(', ');
//           }
//         } else if (typeof err.response.data === 'string') {
//           errorMsg = err.response.data;
//         }
//       }
      
//       setError(errorMsg);
//       speak("Failed to send emergency alert");
//       setSending(false);
//       stopLocationWatching();
//     }
//   }, [alertType, customMessage, stopLocationWatching]);

//   const getAccuracyColor = (accuracy) => {
//     if (!accuracy) return "#757575";
//     if (accuracy < 20) return "#4CAF50";
//     if (accuracy < 100) return "#8BC34A";
//     if (accuracy < 1000) return "#FF9800";
//     if (accuracy < 10000) return "#F44336";
//     return "#9C27B0";
//   };

//   const getAccuracyLabel = (accuracy) => {
//     if (!accuracy) return "Unknown";
//     if (accuracy < 20) return "High";
//     if (accuracy < 100) return "Good";
//     if (accuracy < 1000) return "Moderate";
//     if (accuracy < 10000) return "Low";
//     return "Approximate";
//   };

//   // Get current location on demand
//   const getOneTimeLocation = useCallback(async () => {
//     try {
//       setIsGettingLocation(true);
//       setStatus("📡 Getting your current location...");
//       speak("Getting your current location. Please wait for GPS signal.");
      
//       const location = await getCurrentLocation(true);
//       setLocation(location);
//       lastLocationRef.current = location;
//       setLocationAccuracy(location.accuracy);
      
//       const accuracyLabel = getAccuracyLabel(location.accuracy);
//       const message = `📍 Location obtained (${accuracyLabel} accuracy: ${Math.round(location.accuracy)} meters)`;
//       setStatus(message);
      
//       if (location.accuracy < 100) {
//         speak(`Location obtained with good accuracy: ${Math.round(location.accuracy)} meters`);
//       } else if (location.accuracy < 1000) {
//         speak(`Location obtained with moderate accuracy: ${Math.round(location.accuracy)} meters`);
//       } else {
//         speak(`Location obtained. Accuracy is low. Please go to an open area for better GPS.`);
//       }
      
//       return location;
//     } catch (error) {
//       console.error("Failed to get location:", error);
//       const errorMsg = `❌ Could not get your current location: ${error.message}`;
//       setError(errorMsg);
//       speak("Could not get location. Please check GPS and try again.");
//       return null;
//     } finally {
//       setIsGettingLocation(false);
//     }
//   }, []);

//   // Browser location permission check
//   const checkLocationPermission = useCallback(async () => {
//     if (!navigator.permissions) {
//       console.log("Permissions API not supported");
//       return;
//     }
    
//     try {
//       const permissionStatus = await navigator.permissions.query({ name: 'geolocation' });
//       console.log("Location permission status:", permissionStatus.state);
      
//       if (permissionStatus.state === 'denied') {
//         setError("❌ Location permission denied. Please enable location access.");
//         speak("Location permission denied. Please enable location in browser settings.");
//       } else if (permissionStatus.state === 'prompt') {
//         setStatus("📍 Please allow location access when prompted.");
//         speak("Please allow location access when prompted.");
//       } else if (permissionStatus.state === 'granted') {
//         setStatus("✅ Location permission granted!");
//         speak("Location permission granted!");
//         setTimeout(() => setStatus(""), 3000);
//       }
      
//       permissionStatus.onchange = () => {
//         console.log("Location permission changed to:", permissionStatus.state);
//         if (permissionStatus.state === 'granted') {
//           setStatus("✅ Location permission granted!");
//           speak("Location permission granted!");
//           setTimeout(() => setStatus(""), 3000);
//         }
//       };
//     } catch (err) {
//       console.log("Could not check location permission:", err);
//     }
//   }, []);

//   // Check permission on mount
//   useEffect(() => {
//     checkLocationPermission();
//   }, [checkLocationPermission]);

//   // Initialize voice commands
//   useEffect(() => {
//     // Check if voice service is available
//     if (!voiceService.isAvailable()) {
//       setStatus("Voice recognition is not supported in your browser.");
//       return;
//     }

//     // Set up voice commands after a brief delay
//     const setupVoiceCommands = () => {
//       console.log("[SOSButton] Setting up voice commands...");

//       // Create handlers object
//       const handlers = {
//         handleBackToDashboard,
//         handleLogout: async () => {
//           setStatus("Logging out...");
//           speak("Logging out...");

//           try {
//             const token = localStorage.getItem("token");
//             if (token) {
//               await post(
//                 "http://127.0.0.1:8000/auth/voice-logout/",
//                 {},
//                 {
//                   headers: {
//                     Authorization: `Bearer ${token}`,
//                     "Content-Type": "application/json",
//                   },
//                 }
//               );
//             }
//           } catch (error) {
//             console.error("Logout backend error:", error);
//           } finally {
//             voiceService.stopListening();
//             localStorage.clear();
//             setTimeout(() => navigate("/"), 1500);
//           }
//         },
//         navigate,
//         setStatus,
//         speak,
//         setAlertType,
//         setCustomMessage,
//         alertType,
//         customMessage,
//         sendSOS,
//         cancelSOS,
//         getOneTimeLocation,
//         startLocationWatching,
//         stopLocationWatching,
//         checkLocationPermission,
//         setError,
//         setShowVoiceHelp,
//         startCountdown
//       };

//       // Initialize SOS-specific commands
//       initializeSOSCommands(handlers);
//     };

//     // Delay setup to ensure component is fully mounted
//     const timer = setTimeout(setupVoiceCommands, 1000);

//     return () => {
//       clearTimeout(timer);
//       stopSOSCommands();
//     };
//   }, [
//     handleBackToDashboard,
//     navigate,
//     sendSOS,
//     cancelSOS,
//     getOneTimeLocation,
//     startLocationWatching,
//     stopLocationWatching,
//     checkLocationPermission,
//     alertType,
//     customMessage,
//     startCountdown
//   ]);

//   // Toggle voice recognition
//   const toggleVoiceRecognition = () => {
//     console.log("[SOSButton] Toggling voice recognition...");
    
//     if (voiceService.isListening) {
//       voiceService.stopListening();
//       const message = "Voice recognition stopped.";
//       setStatus(message);
//       speak(message);
//     } else {
//       try {
//         // Stop any existing recognition first
//         if (voiceService.isListening) {
//           voiceService.stopListening();
//         }
        
//         // Wait a moment before starting
//         setTimeout(() => {
//           try {
//             voiceService.startListening();
//             const message = "Voice recognition started. Say 'help' for commands.";
//             setStatus(message);
//             speak(message);
//           } catch (error) {
//             console.error("Error starting voice recognition:", error);
//             const errorMessage = "Error starting voice recognition. Try refreshing the page.";
//             setStatus(errorMessage);
//             speak(errorMessage);
//           }
//         }, 100);
//       } catch (error) {
//         console.error("Error in voice toggle:", error);
//         const errorMessage = "Error toggling voice recognition.";
//         setStatus(errorMessage);
//         speak(errorMessage);
//       }
//     }
//   };

//   // Handle logout
//   const handleLogout = async () => {
//     setStatus("Logging out...");
//     speak("Logging out...");

//     try {
//       const token = localStorage.getItem("token");
//       if (token) {
//         await post(
//           "http://127.0.0.1:8000/auth/voice-logout/",
//           {},
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );
//       }
//     } catch (error) {
//       console.error("Logout backend error:", error);
//     } finally {
//       voiceService.stopListening();
//       localStorage.clear();
//       setTimeout(() => navigate("/"), 1500);
//     }
//   };

//   return (
//     <div className="sos-page-container">
//       {/* Back Button Header */}
//       <div className="sos-page-header">
//         <button className="back-button" onClick={handleBackToDashboard}>
//           ← Back to Dashboard
//         </button>
//       </div>

//       <div className="sos-container">
//         {showHeader && (
//           <div className="sos-header">
//             <h2>🚨 Emergency SOS</h2>
//             <p className="sos-description">
//               Double-tap the SOS button or use voice commands for emergency alert.
//               Say "help" for voice command guide.
//             </p>
            
//             {/* Voice button */}
//             <div className="voice-control-section">
//               <button 
//                 className={`voice-btn ${voiceService.isListening ? 'listening' : ''}`}
//                 onClick={toggleVoiceRecognition}
//                 title={voiceService.isListening ? "Stop listening" : "Start voice commands"}
//               >
//                 {voiceService.isListening ? "🎤 Listening..." : "🎤 Voice"}
//               </button>
              
//               <button 
//                 className="voice-help-btn"
//                 onClick={() => setShowVoiceHelp(!showVoiceHelp)}
//               >
//                 {showVoiceHelp ? "Hide Voice Help" : "Show Voice Commands"}
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Voice Commands Help Panel */}
//         {showVoiceHelp && (
//           <div className="voice-help-panel">
//             <h3>🎤 SOS Voice Commands Guide</h3>
//             <div className="voice-commands-grid">
//               <div className="voice-category">
//                 <h4>Emergency Commands</h4>
//                 <ul>
//                   <li>"Emergency" - Activate SOS</li>
//                   <li>"SOS" - Quick emergency</li>
//                   <li>"Help me" - Call for help</li>
//                   <li>"Medical emergency" - Medical alert</li>
//                   <li>"Fire emergency" - Fire alert</li>
//                   <li>"Accident emergency" - Accident alert</li>
//                 </ul>
//               </div>
              
//               <div className="voice-category">
//                 <h4>Location Commands</h4>
//                 <ul>
//                   <li>"Get location" - Check current location</li>
//                   <li>"Start tracking" - Live location</li>
//                   <li>"Stop tracking" - Stop tracking</li>
//                   <li>"Test location" - Test GPS</li>
//                   <li>"Where am I" - Location query</li>
//                 </ul>
//               </div>
              
//               <div className="voice-category">
//                 <h4>Message Commands</h4>
//                 <ul>
//                   <li>"Message [your message]" - Set custom message</li>
//                   <li>"Reset message" - Default message</li>
//                   <li>"I am lost near market" - Natural language</li>
//                   <li>"Medical heart pain" - Emergency details</li>
//                 </ul>
//               </div>
              
//               <div className="voice-category">
//                 <h4>Control Commands</h4>
//                 <ul>
//                   <li>"Cancel emergency" - Abort SOS</li>
//                   <li>"Clear status" - Clear messages</li>
//                   <li>"Help" - Show this guide</li>
//                   <li>"Go to dashboard" - Go back</li>
//                   <li>"Logout" - Sign out</li>
//                 </ul>
//               </div>
//             </div>
            
//             <div className="voice-tips">
//               <p><strong>Tip:</strong> Speak naturally. Examples: "Emergency I need help", "Message I'm at the park", "Medical I have chest pain"</p>
//               <button 
//                 className="close-help-btn"
//                 onClick={() => setShowVoiceHelp(false)}
//               >
//                 Close Help
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Location Troubleshooting Tips */}
//         {(error && error.includes("permission") || error.includes("GPS")) && (
//           <div className="troubleshooting-tips">
//             <h4>🔧 Location Troubleshooting:</h4>
//             <ul>
//               <li>1. Check browser settings → Allow location access</li>
//               <li>2. Enable GPS on your device</li>
//               <li>3. Connect to WiFi for better accuracy</li>
//               <li>4. Go to an open area/outside</li>
//               <li>5. Say "check permission" to verify</li>
//             </ul>
//           </div>
//         )}

//         {/* Live Location Status */}
//         {locationWatching && !sending && (
//           <div className="live-location-status">
//             <div className="live-indicator">
//               <span className="live-pulse"></span>
//               <span className="live-text">LIVE LOCATION ACTIVE</span>
//             </div>
//             <div className="accuracy-indicator">
//               <div 
//                 className="accuracy-bar" 
//                 style={{ 
//                   width: `${Math.min(100, (1000 / (locationAccuracy || 1000)))}%`,
//                   backgroundColor: getAccuracyColor(locationAccuracy || 1000)
//                 }}
//               ></div>
//               <span className="accuracy-text">
//                 Accuracy: {getAccuracyLabel(locationAccuracy)} ({locationAccuracy ? Math.round(locationAccuracy) : '--'} meters)
//               </span>
//             </div>
//           </div>
//         )}

//         {/* Status Messages */}
//         {status && (
//           <div className={`status-message ${countdown ? 'countdown-active' : ''}`}>
//             {countdown && (
//               <div className="countdown-circle">
//                 <span>{countdown}</span>
//               </div>
//             )}
//             <div className="status-content">
//               <p className="status-text">{status}</p>
//               {countdown && (
//                 <button className="cancel-button" onClick={cancelSOS}>
//                   Cancel Emergency
//                 </button>
//               )}
//             </div>
//           </div>
//         )}

//         {error && (
//           <div className="error-message">
//             <div className="error-icon">⚠️</div>
//             <div className="error-content">
//               <p className="error-text">{error}</p>
//               <button className="retry-button" onClick={() => setError("")}>
//                 Dismiss
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Alert Type Selection */}
//         <div className="config-section">
//           <label htmlFor="alert-type" className="section-label">
//             <span className="section-icon">📋</span>
//             Type of Emergency
//           </label>
//           <select
//             id="alert-type"
//             value={alertType}
//             onChange={handleAlertTypeChange}
//             className="alert-type-select"
//             disabled={sending || countdown || locationWatching || isGettingLocation}
//           >
//             <option value="sos">🚨 General Emergency (SOS)</option>
//             <option value="medical">🏥 Medical Emergency</option>
//             <option value="safety">🛡️ Safety Threat</option>
//             <option value="fire">🔥 Fire Emergency</option>
//             <option value="accident">🚗 Accident</option>
//             <option value="lost">🧭 Lost/Disoriented</option>
//             <option value="other">⚠️ Other Emergency</option>
//           </select>
//           <span className="voice-hint">Say: "medical emergency", "fire emergency", etc.</span>
//         </div>

//         {/* Custom Message */}
//         <div className="config-section">
//           <label htmlFor="message" className="section-label">
//             <span className="section-icon">✏️</span>
//             Emergency Message
//           </label>
//           <div className="message-container">
//             <textarea
//               id="message"
//               value={customMessage}
//               onChange={handleMessageChange}
//               placeholder="Describe your emergency situation..."
//               className="message-input"
//               rows="3"
//               disabled={sending || countdown || locationWatching || isGettingLocation}
//             />
//             <button
//               type="button"
//               className="reset-button"
//               onClick={handleResetMessage}
//               disabled={sending || countdown || locationWatching || isGettingLocation}
//             >
//               Reset
//             </button>
//           </div>
//           <p className="field-hint">
//             This message will be emailed to your emergency contacts.
//             <br />
//             <span className="voice-hint">Say: "message [your message]" or "I am lost near [location]"</span>
//           </p>
//         </div>

//         {/* SOS Button */}
//         <div className="sos-button-section">
//           <button
//             onClick={handleClick}
//             disabled={sending || countdown || isGettingLocation}
//             className={`sos-main-button ${countdown ? 'countdown-active' : ''} ${locationWatching ? 'location-active' : ''} ${isGettingLocation ? 'getting-location' : ''}`}
//             aria-label="Send SOS emergency alert"
//           >
//             {sending ? (
//               <>
//                 <span className="button-spinner"></span>
//                 <span className="button-text">Sending Emergency Alert...</span>
//               </>
//             ) : isGettingLocation ? (
//               <>
//                 <span className="button-spinner"></span>
//                 <span className="button-text">Getting Location...</span>
//               </>
//             ) : countdown ? (
//               <>
//                 <span className="countdown-animation"></span>
//                 <span className="button-text">Cancel Emergency</span>
//               </>
//             ) : locationWatching ? (
//               <>
//                 <span className="live-location-icon">📍</span>
//                 <span className="button-text">TRACKING LIVE LOCATION</span>
//               </>
//             ) : (
//               <>
//                 <span className="sos-main-icon">🚨</span>
//                 <span className="button-text">SOS EMERGENCY</span>
//               </>
//             )}
//           </button>
          
//           {!sending && !countdown && !locationWatching && !isGettingLocation && (
//             <div className="sos-instruction">
//               <p className="instruction-text">
//                 <span className="instruction-icon">⚠️</span>
//                 Double-tap button OR say "emergency" for voice command
//               </p>
//             </div>
//           )}
          
//           {locationWatching && !countdown && (
//             <div className="location-instruction">
//               <p className="instruction-text">
//                 <span className="instruction-icon">📍</span>
//                 Location tracking active. Press button again or say "send SOS".
//               </p>
//             </div>
//           )}
//         </div>

//         {/* Location Actions */}
//         <div className="location-actions">
//           <button
//             className="location-test-button"
//             onClick={getOneTimeLocation}
//             disabled={sending || countdown || locationWatching || isGettingLocation}
//           >
//             {isGettingLocation ? (
//               <>
//                 <span className="button-spinner-small"></span>
//                 <span>Getting Location...</span>
//               </>
//             ) : (
//               <>
//                 <span className="location-icon">📍</span>
//                 <span>Test Location Now</span>
//               </>
//             )}
//           </button>
          
//           {location && locationWatching && (
//             <button
//               className="stop-location-button"
//               onClick={stopLocationWatching}
//               disabled={sending || countdown || isGettingLocation}
//             >
//               <span className="stop-icon">⏹️</span>
//               Stop Live Tracking
//             </button>
//           )}
          
//           <button
//             className="permission-button"
//             onClick={checkLocationPermission}
//             disabled={sending || countdown || isGettingLocation}
//           >
//             <span className="permission-icon">🔧</span>
//             Check Permission
//           </button>
//         </div>

//         {/* Current Location Display */}
//         {location && (
//           <div className="current-location-section">
//             <h3 className="location-title">
//               <span className="location-icon">📍</span>
//               Current Location
//               <span className="location-source-badge" style={{ 
//                 backgroundColor: getAccuracyColor(location.accuracy),
//                 color: location.accuracy < 1000 ? '#fff' : '#000'
//               }}>
//                 {getAccuracyLabel(location.accuracy)} ACCURACY
//               </span>
//             </h3>
//             <div className="location-grid">
//               <div className="location-item">
//                 <span className="location-label">Latitude:</span>
//                 <span className="location-value coordinate">{location.lat.toFixed(6)}</span>
//               </div>
//               <div className="location-item">
//                 <span className="location-label">Longitude:</span>
//                 <span className="location-value coordinate">{location.lng.toFixed(6)}</span>
//               </div>
//               <div className="location-item">
//                 <span className="location-label">Accuracy:</span>
//                 <span className="location-value" style={{ color: getAccuracyColor(location.accuracy) }}>
//                   {Math.round(location.accuracy)} meters ({getAccuracyLabel(location.accuracy)})
//                 </span>
//               </div>
//               <div className="location-item">
//                 <span className="location-label">Last Updated:</span>
//                 <span className="location-value">
//                   {formatTime(location.timestamp)}
//                 </span>
//               </div>
//             </div>
//             <div className="map-actions">
//               <a
//                 href={`https://maps.google.com/?q=${location.lat},${location.lng}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="map-link-button"
//               >
//                 <span className="map-icon">🗺️</span>
//                 View on Google Maps
//               </a>
//               {location.accuracy > 1000 && (
//                 <div className="accuracy-warning">
//                   <span className="warning-icon">⚠️</span>
//                   <span>Low accuracy. For better results, go outside or connect to WiFi.</span>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}

//         {/* Information Panel */}
//         <div className="info-panel">
//           <h3 className="info-title">
//             <span className="info-icon">ℹ️</span>
//             Voice Command Tips
//           </h3>
//           <ul className="info-list">
//             <li className="info-item">
//               <span className="bullet">🎤</span>
//               <strong>Say "Emergency":</strong> Activate SOS mode
//             </li>
//             <li className="info-item">
//               <span className="bullet">📍</span>
//               <strong>Say "Get location":</strong> Check your current position
//             </li>
//             <li className="info-item">
//               <span className="bullet">📝</span>
//               <strong>Say "Message [text]":</strong> Set custom emergency message
//             </li>
//             <li className="info-item">
//               <span className="bullet">🚑</span>
//               <strong>Say "Medical emergency":</strong> Specific alert type
//             </li>
//             <li className="info-item">
//               <span className="bullet">🛑</span>
//               <strong>Say "Cancel emergency":</strong> Abort SOS countdown
//             </li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }




// src/components/SOS/SOSButton.jsx
import React, { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { post } from "../../services/api";
import { voiceService } from "../../services/voiceService";
import { initializeSOSCommands, stopSOSCommands } from "../../voice-commands/SOSVoiceCommands";
import "./SOSButton.css";

function speak(text) {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 0.8;
    utter.volume = 1.0;
    window.speechSynthesis.speak(utter);
  }
}

// Format time to Indian Standard Time (IST) or local time
const formatTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  }) + ' IST';
};

// Format decimal to max 6 places
const formatDecimal = (num) => {
  if (num === null || num === undefined) return "";
  const rounded = parseFloat(num.toFixed(6));
  return rounded;
};

// Get location with improved methods
const getCurrentLocation = (forceRefresh = false) => {
  return new Promise((resolve, reject) => {
    if (!("geolocation" in navigator)) {
      reject(new Error("Geolocation not supported"));
      return;
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 30000,
      maximumAge: forceRefresh ? 0 : 60000,
    };

    console.log("Getting location with options:", options);
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("Location obtained:", position);
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy,
          altitude: position.coords.altitude,
          altitudeAccuracy: position.coords.altitudeAccuracy,
          heading: position.coords.heading,
          speed: position.coords.speed,
          timestamp: new Date(position.timestamp).toISOString(),
          source: 'gps',
          isFresh: true
        };
        
        console.log("Location details:", {
          coordinates: `${location.lat}, ${location.lng}`,
          accuracy: `${location.accuracy} meters`,
          timestamp: new Date(location.timestamp).toLocaleString(),
        });
        
        resolve(location);
      },
      (error) => {
        console.error("Geolocation error:", error);
        
        let errorMessage = "Location Error: ";
        switch(error.code) {
          case error.PERMISSION_DENIED:
            errorMessage += "Permission denied. Please enable location services.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage += "Location information unavailable.";
            break;
          case error.TIMEOUT:
            errorMessage += "Location request timed out.";
            break;
          default:
            errorMessage += "Unknown error occurred.";
        }
        
        console.log(errorMessage);
        reject(new Error(errorMessage));
      },
      options
    );
  });
};

// Check if location is likely cached/default
const isLikelyCachedLocation = (location) => {
  if (!location) return false;
  
  if (location.accuracy > 100000) {
    console.warn("Location likely cached/default - accuracy too low:", location.accuracy);
    return true;
  }
  
  const now = new Date().getTime();
  const locationTime = new Date(location.timestamp).getTime();
  const ageInMinutes = (now - locationTime) / (1000 * 60);
  
  if (ageInMinutes > 5) {
    console.warn("Location likely cached - age:", ageInMinutes, "minutes");
    return true;
  }
  
  return false;
};

export default function SOSButton({ 
  showHeader = true 
}) {
  const navigate = useNavigate();
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(null);
  const [location, setLocation] = useState(null);
  const [alertType, setAlertType] = useState("sos");
  const [customMessage, setCustomMessage] = useState("Emergency! Please help me.");
  const [locationWatching, setLocationWatching] = useState(false);
  const [locationAccuracy, setLocationAccuracy] = useState(null);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [showVoiceHelp, setShowVoiceHelp] = useState(false);
  
  const watchIdRef = useRef(null);
  const lastLocationRef = useRef(null);
  
  // Safety: require double-press within 1.5s to confirm
  const lastPressRef = useRef(0);
  const countdownRef = useRef(null);

  // Cleanup location watcher on component unmount
  useEffect(() => {
    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
        console.log("Location watcher stopped");
      }
    };
  }, []);

  const handleBackToDashboard = useCallback(() => {
    navigate("/dashboard");
  }, [navigate]);

  // Improved location watching
  const startLocationWatching = useCallback(() => {
    if (!("geolocation" in navigator)) {
      const errorMsg = "Geolocation not supported by your device";
      setError(errorMsg);
      speak(errorMsg);
      return false;
    }

    console.log("Starting location watching...");
    setStatus("Starting live location tracking...");
    speak("Starting live location tracking. Please wait for GPS signal.");

    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
    }

    watchIdRef.current = navigator.geolocation.watchPosition(
      (position) => {
        const newLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: new Date(position.timestamp).toISOString(),
          source: 'gps_live',
        };
        
        console.log("Live location update:", {
          coordinates: `${newLocation.lat}, ${newLocation.lng}`,
          accuracy: `${newLocation.accuracy}m`,
        });
        
        lastLocationRef.current = newLocation;
        setLocation(newLocation);
        setLocationAccuracy(position.coords.accuracy);
        setLocationWatching(true);
        
        if (position.coords.accuracy < 20) {
          setStatus("📍 Live location active (High accuracy)");
        } else if (position.coords.accuracy < 100) {
          setStatus("📍 Live location active (Good accuracy)");
        } else if (position.coords.accuracy < 1000) {
          setStatus("📍 Live location active (Moderate accuracy)");
        } else {
          setStatus("📍 Live location active (Low accuracy - GPS signal weak)");
        }
      },
      (err) => {
        console.error("Location watch error:", err);
        let errorMsg;
        switch(err.code) {
          case err.PERMISSION_DENIED:
            errorMsg = "❌ Location access denied. Please enable location services.";
            break;
          case err.POSITION_UNAVAILABLE:
            errorMsg = "❌ GPS signal unavailable.";
            break;
          case err.TIMEOUT:
            errorMsg = "❌ Location request timed out.";
            break;
          default:
            errorMsg = "❌ Unable to get live location.";
        }
        setError(errorMsg);
        speak("Unable to get live location");
        setLocationWatching(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 30000,
        maximumAge: 0,
        distanceFilter: 5,
      }
    );

    return true;
  }, []);

  // Stop watching location
  const stopLocationWatching = useCallback(() => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
      console.log("Location watching stopped");
    }
    setLocationWatching(false);
    setStatus("Location tracking stopped");
  }, []);

  // Define sendSOS first to avoid circular dependency
  const sendSOS = useCallback(async () => {
    setSending(true);
    setError("");
    
    try {
      let currentLocation = lastLocationRef.current;
      let locationSource = 'gps_live';
      let forceFresh = false;
      
      if (currentLocation && isLikelyCachedLocation(currentLocation)) {
        console.warn("Location appears to be cached, forcing fresh location...");
        forceFresh = true;
        setStatus("Getting fresh location...");
      }
      
      if (!currentLocation || forceFresh) {
        try {
          setStatus("Getting your current location...");
          speak("Getting your current location");
          setIsGettingLocation(true);
          
          currentLocation = await getCurrentLocation(forceFresh);
          locationSource = currentLocation.source || 'gps_fresh';
          
          if (isLikelyCachedLocation(currentLocation)) {
            speak("Warning: Location may be approximate due to GPS signal issues");
          }
          
        } catch (locationError) {
          console.warn("Could not get precise location:", locationError);
          speak("Could not get precise location, using last known position if available");
        } finally {
          setIsGettingLocation(false);
        }
      }
      
      let lat = null;
      let lng = null;
      let locationText = "";
      let accuracyMeters = null;
      
      if (currentLocation) {
        lat = formatDecimal(currentLocation.lat);
        lng = formatDecimal(currentLocation.lng);
        accuracyMeters = Math.round(currentLocation.accuracy);
        
        const istTime = new Date().toLocaleTimeString('en-IN', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        });
        
        let accuracyNote = "";
        if (accuracyMeters > 1000) {
          accuracyNote = " (Low accuracy)";
        } else if (accuracyMeters > 10000) {
          accuracyNote = " (Very low accuracy - may be approximate)";
        }
        
        locationText = `Location: Lat ${lat}, Lng ${lng}, Accuracy: ${accuracyMeters}m${accuracyNote}, Time: ${istTime} IST`;
        
      } else {
        const istTime = new Date().toLocaleTimeString('en-IN', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        });
        locationText = `Location unavailable (GPS/WiFi required). Time: ${istTime} IST`;
      }
      
      const alertData = {
        alert_type: alertType,
        message: customMessage.trim() || "Emergency! Please help me.",
        location_text: locationText,
        is_active: true,
      };
      
      if (lat !== null && lng !== null) {
        alertData.location_lat = lat;
        alertData.location_lng = lng;
      }
      
      console.log("Sending SOS alert:", alertData);
      
      setStatus("Sending emergency alert...");
      speak("Sending emergency alert");
      
      const response = await post("/api/emergency-alerts/", alertData);
      
      const successMsg = response.data?.message || "Emergency alert sent successfully!";
      setStatus(successMsg);
      
      if (currentLocation) {
        if (accuracyMeters && accuracyMeters > 10000) {
          speak("Emergency alert sent with approximate location. Help is on the way.");
        } else {
          speak("Emergency alert sent successfully with your location. Help is on the way.");
        }
      } else {
        speak("Emergency alert sent successfully. Location could not be obtained. Help is on the way.");
      }
      
      if ("vibrate" in navigator) {
        navigator.vibrate([200, 100, 200, 100, 200, 100, 200]);
      }
      
      setTimeout(() => {
        stopLocationWatching();
        setStatus("");
        setSending(false);
        setAlertType("sos");
        setCustomMessage("Emergency! Please help me.");
        setLocation(null);
        setLocationWatching(false);
      }, 7000);

    } catch (err) {
      console.error("sendSOS error:", err);
      console.error("Error response data:", err.response?.data);
      
      let errorMsg = "Failed to send emergency alert. Please try again.";
      if (err.response?.data) {
        if (err.response.data.detail) {
          errorMsg = err.response.data.detail;
        } else if (typeof err.response.data === 'object') {
          const errors = [];
          Object.entries(err.response.data).forEach(([field, messages]) => {
            if (Array.isArray(messages)) {
              errors.push(...messages.map(m => `${field}: ${m}`));
            } else if (typeof messages === 'string') {
              errors.push(`${field}: ${messages}`);
            }
          });
          if (errors.length > 0) {
            errorMsg = errors.join(', ');
          }
        } else if (typeof err.response.data === 'string') {
          errorMsg = err.response.data;
        }
      }
      
      setError(errorMsg);
      speak("Failed to send emergency alert");
      setSending(false);
      stopLocationWatching();
    }
  }, [alertType, customMessage, stopLocationWatching]);

  // Now define startCountdown after sendSOS is defined
  const startCountdown = useCallback(() => {
    let count = 5;
    setCountdown(count);
    setStatus(`Emergency alert will be sent in ${count} seconds...`);
    
    speak(`Emergency alert confirmed. Sending in ${count} seconds.`);
    
    const interval = setInterval(() => {
      count -= 1;
      setCountdown(count);
      
      if (count === 0) {
        clearInterval(interval);
        sendSOS();
      } else {
        setStatus(`Emergency alert will be sent in ${count} seconds...`);
      }
    }, 1000);
    
    // Store interval reference
    countdownRef.current = interval;
  }, [sendSOS]);

  const handleClick = useCallback(() => {
    const now = Date.now();
    if (now - lastPressRef.current < 1500) {
      if (!locationWatching) {
        console.log("Starting location for SOS...");
        const started = startLocationWatching();
        if (!started) return;
      }
      startCountdown();
    } else {
      lastPressRef.current = now;
      speak("Press the SOS button again within 1.5 seconds to confirm emergency");
      setStatus("Press again to confirm SOS emergency");
      
      setTimeout(() => {
        if (!countdown) {
          setStatus("");
        }
      }, 2000);
    }
  }, [locationWatching, startLocationWatching, countdown, startCountdown]);

  const cancelSOS = useCallback(() => {
    if (countdownRef.current) {
      clearInterval(countdownRef.current);
      countdownRef.current = null;
    }
    setCountdown(null);
    setStatus("SOS cancelled");
    speak("Emergency alert cancelled");
    
    if (watchIdRef.current) {
      stopLocationWatching();
    }
    
    setTimeout(() => {
      setStatus("");
    }, 2000);
  }, [stopLocationWatching]);

  const handleAlertTypeChange = (e) => {
    setAlertType(e.target.value);
  };

  const handleMessageChange = (e) => {
    setCustomMessage(e.target.value);
  };

  const handleResetMessage = () => {
    setCustomMessage("Emergency! Please help me.");
  };

  const getAccuracyColor = (accuracy) => {
    if (!accuracy) return "#757575";
    if (accuracy < 20) return "#4CAF50";
    if (accuracy < 100) return "#8BC34A";
    if (accuracy < 1000) return "#FF9800";
    if (accuracy < 10000) return "#F44336";
    return "#9C27B0";
  };

  const getAccuracyLabel = (accuracy) => {
    if (!accuracy) return "Unknown";
    if (accuracy < 20) return "High";
    if (accuracy < 100) return "Good";
    if (accuracy < 1000) return "Moderate";
    if (accuracy < 10000) return "Low";
    return "Approximate";
  };

  // Get current location on demand
  const getOneTimeLocation = useCallback(async () => {
    try {
      setIsGettingLocation(true);
      setStatus("📡 Getting your current location...");
      speak("Getting your current location. Please wait for GPS signal.");
      
      const location = await getCurrentLocation(true);
      setLocation(location);
      lastLocationRef.current = location;
      setLocationAccuracy(location.accuracy);
      
      const accuracyLabel = getAccuracyLabel(location.accuracy);
      const message = `📍 Location obtained (${accuracyLabel} accuracy: ${Math.round(location.accuracy)} meters)`;
      setStatus(message);
      
      if (location.accuracy < 100) {
        speak(`Location obtained with good accuracy: ${Math.round(location.accuracy)} meters`);
      } else if (location.accuracy < 1000) {
        speak(`Location obtained with moderate accuracy: ${Math.round(location.accuracy)} meters`);
      } else {
        speak(`Location obtained. Accuracy is low. Please go to an open area for better GPS.`);
      }
      
      return location;
    } catch (error) {
      console.error("Failed to get location:", error);
      const errorMsg = `❌ Could not get your current location: ${error.message}`;
      setError(errorMsg);
      speak("Could not get location. Please check GPS and try again.");
      return null;
    } finally {
      setIsGettingLocation(false);
    }
  }, []);

  // Browser location permission check
  const checkLocationPermission = useCallback(async () => {
    if (!navigator.permissions) {
      console.log("Permissions API not supported");
      return;
    }
    
    try {
      const permissionStatus = await navigator.permissions.query({ name: 'geolocation' });
      console.log("Location permission status:", permissionStatus.state);
      
      if (permissionStatus.state === 'denied') {
        setError("❌ Location permission denied. Please enable location access.");
        speak("Location permission denied. Please enable location in browser settings.");
      } else if (permissionStatus.state === 'prompt') {
        setStatus("📍 Please allow location access when prompted.");
        speak("Please allow location access when prompted.");
      } else if (permissionStatus.state === 'granted') {
        setStatus("✅ Location permission granted!");
        speak("Location permission granted!");
        setTimeout(() => setStatus(""), 3000);
      }
      
      permissionStatus.onchange = () => {
        console.log("Location permission changed to:", permissionStatus.state);
        if (permissionStatus.state === 'granted') {
          setStatus("✅ Location permission granted!");
          speak("Location permission granted!");
          setTimeout(() => setStatus(""), 3000);
        }
      };
    } catch (err) {
      console.log("Could not check location permission:", err);
    }
  }, []);

  // Check permission on mount
  useEffect(() => {
    checkLocationPermission();
  }, [checkLocationPermission]);

  // Initialize voice commands
  useEffect(() => {
    // Check if voice service is available
    if (!voiceService.isAvailable()) {
      setStatus("Voice recognition is not supported in your browser.");
      return;
    }

    // Set up voice commands after a brief delay
    const setupVoiceCommands = () => {
      console.log("[SOSButton] Setting up voice commands...");

      // Create handlers object
      const handlers = {
        handleBackToDashboard,
        handleLogout: async () => {
          setStatus("Logging out...");
          speak("Logging out...");

          try {
            const token = localStorage.getItem("token");
            if (token) {
              await post(
                "http://127.0.0.1:8000/auth/voice-logout/",
                {},
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                  },
                }
              );
            }
          } catch (error) {
            console.error("Logout backend error:", error);
          } finally {
            voiceService.stopListening();
            localStorage.clear();
            setTimeout(() => navigate("/"), 1500);
          }
        },
        navigate,
        setStatus,
        speak,
        setAlertType,
        setCustomMessage,
        alertType,
        customMessage,
        sendSOS,
        cancelSOS,
        getOneTimeLocation,
        startLocationWatching,
        stopLocationWatching,
        checkLocationPermission,
        setError,
        setShowVoiceHelp,
        startCountdown
      };

      // Initialize SOS-specific commands
      initializeSOSCommands(handlers);
    };

    // Delay setup to ensure component is fully mounted
    const timer = setTimeout(setupVoiceCommands, 1000);

    return () => {
      clearTimeout(timer);
      stopSOSCommands();
    };
  }, [
    handleBackToDashboard,
    navigate,
    sendSOS,
    cancelSOS,
    getOneTimeLocation,
    startLocationWatching,
    stopLocationWatching,
    checkLocationPermission,
    alertType,
    customMessage,
    startCountdown
  ]);

  // Toggle voice recognition
  const toggleVoiceRecognition = () => {
    console.log("[SOSButton] Toggling voice recognition...");
    
    if (voiceService.isListening) {
      voiceService.stopListening();
      const message = "Voice recognition stopped.";
      setStatus(message);
      speak(message);
    } else {
      try {
        // Stop any existing recognition first
        if (voiceService.isListening) {
          voiceService.stopListening();
        }
        
        // Wait a moment before starting
        setTimeout(() => {
          try {
            voiceService.startListening();
            const message = "Voice recognition started. Say 'help' for commands.";
            setStatus(message);
            speak(message);
          } catch (error) {
            console.error("Error starting voice recognition:", error);
            const errorMessage = "Error starting voice recognition. Try refreshing the page.";
            setStatus(errorMessage);
            speak(errorMessage);
          }
        }, 100);
      } catch (error) {
        console.error("Error in voice toggle:", error);
        const errorMessage = "Error toggling voice recognition.";
        setStatus(errorMessage);
        speak(errorMessage);
      }
    }
  };

  // Handle logout
  const handleLogout = async () => {
    setStatus("Logging out...");
    speak("Logging out...");

    try {
      const token = localStorage.getItem("token");
      if (token) {
        await post(
          "http://127.0.0.1:8000/auth/voice-logout/",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
      }
    } catch (error) {
      console.error("Logout backend error:", error);
    } finally {
      voiceService.stopListening();
      localStorage.clear();
      setTimeout(() => navigate("/"), 1500);
    }
  };

  return (
    <div className="sos-page-container">
      {/* Back Button Header */}
      <div className="sos-page-header">
        <button className="back-button" onClick={handleBackToDashboard}>
          ← Back to Dashboard
        </button>
      </div>

      <div className="sos-container">
        {showHeader && (
          <div className="sos-header">
            <h2>🚨 Emergency SOS</h2>
            <p className="sos-description">
              Double-tap the SOS button or use voice commands for emergency alert.
              Say "help" for voice command guide.
            </p>
            
            {/* Voice button */}
            <div className="voice-control-section">
              <button 
                className={`voice-btn ${voiceService.isListening ? 'listening' : ''}`}
                onClick={toggleVoiceRecognition}
                title={voiceService.isListening ? "Stop listening" : "Start voice commands"}
              >
                {voiceService.isListening ? "🎤 Listening..." : "🎤 Voice"}
              </button>
              
              <button 
                className="voice-help-btn"
                onClick={() => setShowVoiceHelp(!showVoiceHelp)}
              >
                {showVoiceHelp ? "Hide Voice Help" : "Show Voice Commands"}
              </button>
            </div>
          </div>
        )}

        {/* Voice Commands Help Panel */}
        {showVoiceHelp && (
          <div className="voice-help-panel">
            <h3>🎤 SOS Voice Commands Guide</h3>
            <div className="voice-commands-grid">
              <div className="voice-category">
                <h4>Emergency Commands</h4>
                <ul>
                  <li>"Emergency" - Activate SOS</li>
                  <li>"SOS" - Quick emergency</li>
                  <li>"Help me" - Call for help</li>
                  <li>"Medical emergency" - Medical alert</li>
                  <li>"Fire emergency" - Fire alert</li>
                  <li>"Accident emergency" - Accident alert</li>
                </ul>
              </div>
              
              <div className="voice-category">
                <h4>Location Commands</h4>
                <ul>
                  <li>"Get location" - Check current location</li>
                  <li>"Start tracking" - Live location</li>
                  <li>"Stop tracking" - Stop tracking</li>
                  <li>"Test location" - Test GPS</li>
                  <li>"Where am I" - Location query</li>
                </ul>
              </div>
              
              <div className="voice-category">
                <h4>Message Commands</h4>
                <ul>
                  <li>"Message [your message]" - Set custom message</li>
                  <li>"Reset message" - Default message</li>
                  <li>"I am lost near market" - Natural language</li>
                  <li>"Medical heart pain" - Emergency details</li>
                </ul>
              </div>
              
              <div className="voice-category">
                <h4>Control Commands</h4>
                <ul>
                  <li>"Cancel emergency" - Abort SOS</li>
                  <li>"Clear status" - Clear messages</li>
                  <li>"Help" - Show this guide</li>
                  <li>"Go to dashboard" - Go back</li>
                  <li>"Logout" - Sign out</li>
                </ul>
              </div>
            </div>
            
            <div className="voice-tips">
              <p><strong>Tip:</strong> Speak naturally. Examples: "Emergency I need help", "Message I'm at the park", "Medical I have chest pain"</p>
              <button 
                className="close-help-btn"
                onClick={() => setShowVoiceHelp(false)}
              >
                Close Help
              </button>
            </div>
          </div>
        )}

        {/* Location Troubleshooting Tips */}
        {(error && (error.includes("permission") || error.includes("GPS"))) && (
          <div className="troubleshooting-tips">
            <h4>🔧 Location Troubleshooting:</h4>
            <ul>
              <li>1. Check browser settings → Allow location access</li>
              <li>2. Enable GPS on your device</li>
              <li>3. Connect to WiFi for better accuracy</li>
              <li>4. Go to an open area/outside</li>
              <li>5. Say "check permission" to verify</li>
            </ul>
          </div>
        )}

        {/* Live Location Status */}
        {locationWatching && !sending && (
          <div className="live-location-status">
            <div className="live-indicator">
              <span className="live-pulse"></span>
              <span className="live-text">LIVE LOCATION ACTIVE</span>
            </div>
            <div className="accuracy-indicator">
              <div 
                className="accuracy-bar" 
                style={{ 
                  width: `${Math.min(100, (1000 / (locationAccuracy || 1000)))}%`,
                  backgroundColor: getAccuracyColor(locationAccuracy || 1000)
                }}
              ></div>
              <span className="accuracy-text">
                Accuracy: {getAccuracyLabel(locationAccuracy)} ({locationAccuracy ? Math.round(locationAccuracy) : '--'} meters)
              </span>
            </div>
          </div>
        )}

        {/* Status Messages */}
        {status && (
          <div className={`status-message ${countdown ? 'countdown-active' : ''}`}>
            {countdown && (
              <div className="countdown-circle">
                <span>{countdown}</span>
              </div>
            )}
            <div className="status-content">
              <p className="status-text">{status}</p>
              {countdown && (
                <button className="cancel-button" onClick={cancelSOS}>
                  Cancel Emergency
                </button>
              )}
            </div>
          </div>
        )}

        {error && (
          <div className="error-message">
            <div className="error-icon">⚠️</div>
            <div className="error-content">
              <p className="error-text">{error}</p>
              <button className="retry-button" onClick={() => setError("")}>
                Dismiss
              </button>
            </div>
          </div>
        )}

        {/* Alert Type Selection */}
        <div className="config-section">
          <label htmlFor="alert-type" className="section-label">
            <span className="section-icon">📋</span>
            Type of Emergency
          </label>
          <select
            id="alert-type"
            value={alertType}
            onChange={handleAlertTypeChange}
            className="alert-type-select"
            disabled={sending || countdown || locationWatching || isGettingLocation}
          >
            <option value="sos">🚨 General Emergency (SOS)</option>
            <option value="medical">🏥 Medical Emergency</option>
            <option value="safety">🛡️ Safety Threat</option>
            <option value="fire">🔥 Fire Emergency</option>
            <option value="accident">🚗 Accident</option>
            <option value="lost">🧭 Lost/Disoriented</option>
            <option value="other">⚠️ Other Emergency</option>
          </select>
          <span className="voice-hint">Say: "medical emergency", "fire emergency", etc.</span>
        </div>

        {/* Custom Message */}
        <div className="config-section">
          <label htmlFor="message" className="section-label">
            <span className="section-icon">✏️</span>
            Emergency Message
          </label>
          <div className="message-container">
            <textarea
              id="message"
              value={customMessage}
              onChange={handleMessageChange}
              placeholder="Describe your emergency situation..."
              className="message-input"
              rows="3"
              disabled={sending || countdown || locationWatching || isGettingLocation}
            />
            <button
              type="button"
              className="reset-button"
              onClick={handleResetMessage}
              disabled={sending || countdown || locationWatching || isGettingLocation}
            >
              Reset
            </button>
          </div>
          <p className="field-hint">
            This message will be emailed to your emergency contacts.
            <br />
            <span className="voice-hint">Say: "message [your message]" or "I am lost near [location]"</span>
          </p>
        </div>

        {/* SOS Button */}
        <div className="sos-button-section">
          <button
            onClick={handleClick}
            disabled={sending || countdown || isGettingLocation}
            className={`sos-main-button ${countdown ? 'countdown-active' : ''} ${locationWatching ? 'location-active' : ''} ${isGettingLocation ? 'getting-location' : ''}`}
            aria-label="Send SOS emergency alert"
          >
            {sending ? (
              <>
                <span className="button-spinner"></span>
                <span className="button-text">Sending Emergency Alert...</span>
              </>
            ) : isGettingLocation ? (
              <>
                <span className="button-spinner"></span>
                <span className="button-text">Getting Location...</span>
              </>
            ) : countdown ? (
              <>
                <span className="countdown-animation"></span>
                <span className="button-text">Cancel Emergency</span>
              </>
            ) : locationWatching ? (
              <>
                <span className="live-location-icon">📍</span>
                <span className="button-text">TRACKING LIVE LOCATION</span>
              </>
            ) : (
              <>
                <span className="sos-main-icon">🚨</span>
                <span className="button-text">SOS EMERGENCY</span>
              </>
            )}
          </button>
          
          {!sending && !countdown && !locationWatching && !isGettingLocation && (
            <div className="sos-instruction">
              <p className="instruction-text">
                <span className="instruction-icon">⚠️</span>
                Double-tap button OR say "emergency" for voice command
              </p>
            </div>
          )}
          
          {locationWatching && !countdown && (
            <div className="location-instruction">
              <p className="instruction-text">
                <span className="instruction-icon">📍</span>
                Location tracking active. Press button again or say "send SOS".
              </p>
            </div>
          )}
        </div>

        {/* Location Actions */}
        <div className="location-actions">
          <button
            className="location-test-button"
            onClick={getOneTimeLocation}
            disabled={sending || countdown || locationWatching || isGettingLocation}
          >
            {isGettingLocation ? (
              <>
                <span className="button-spinner-small"></span>
                <span>Getting Location...</span>
              </>
            ) : (
              <>
                <span className="location-icon">📍</span>
                <span>Test Location Now</span>
              </>
            )}
          </button>
          
          {location && locationWatching && (
            <button
              className="stop-location-button"
              onClick={stopLocationWatching}
              disabled={sending || countdown || isGettingLocation}
            >
              <span className="stop-icon">⏹️</span>
              Stop Live Tracking
            </button>
          )}
          
          <button
            className="permission-button"
            onClick={checkLocationPermission}
            disabled={sending || countdown || isGettingLocation}
          >
            <span className="permission-icon">🔧</span>
            Check Permission
          </button>
        </div>

        {/* Current Location Display */}
        {location && (
          <div className="current-location-section">
            <h3 className="location-title">
              <span className="location-icon">📍</span>
              Current Location
              <span className="location-source-badge" style={{ 
                backgroundColor: getAccuracyColor(location.accuracy),
                color: location.accuracy < 1000 ? '#fff' : '#000'
              }}>
                {getAccuracyLabel(location.accuracy)} ACCURACY
              </span>
            </h3>
            <div className="location-grid">
              <div className="location-item">
                <span className="location-label">Latitude:</span>
                <span className="location-value coordinate">{location.lat.toFixed(6)}</span>
              </div>
              <div className="location-item">
                <span className="location-label">Longitude:</span>
                <span className="location-value coordinate">{location.lng.toFixed(6)}</span>
              </div>
              <div className="location-item">
                <span className="location-label">Accuracy:</span>
                <span className="location-value" style={{ color: getAccuracyColor(location.accuracy) }}>
                  {Math.round(location.accuracy)} meters ({getAccuracyLabel(location.accuracy)})
                </span>
              </div>
              <div className="location-item">
                <span className="location-label">Last Updated:</span>
                <span className="location-value">
                  {formatTime(location.timestamp)}
                </span>
              </div>
            </div>
            <div className="map-actions">
              <a
                href={`https://maps.google.com/?q=${location.lat},${location.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="map-link-button"
              >
                <span className="map-icon">🗺️</span>
                View on Google Maps
              </a>
              {location.accuracy > 1000 && (
                <div className="accuracy-warning">
                  <span className="warning-icon">⚠️</span>
                  <span>Low accuracy. For better results, go outside or connect to WiFi.</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Information Panel */}
        <div className="info-panel">
          <h3 className="info-title">
            <span className="info-icon">ℹ️</span>
            Voice Command Tips
          </h3>
          <ul className="info-list">
            <li className="info-item">
              <span className="bullet">🎤</span>
              <strong>Say "Emergency":</strong> Activate SOS mode
            </li>
            <li className="info-item">
              <span className="bullet">📍</span>
              <strong>Say "Get location":</strong> Check your current position
            </li>
            <li className="info-item">
              <span className="bullet">📝</span>
              <strong>Say "Message [text]":</strong> Set custom emergency message
            </li>
            <li className="info-item">
              <span className="bullet">🚑</span>
              <strong>Say "Medical emergency":</strong> Specific alert type
            </li>
            <li className="info-item">
              <span className="bullet">🛑</span>
              <strong>Say "Cancel emergency":</strong> Abort SOS countdown
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}