

// // // import React, { useState, useEffect } from "react";
// // // import { useNavigate } from "react-router-dom";
// // // import axios from "axios";
// // // import "./WeatherReader.css";

// // // const WeatherReader = () => {
// // //   const [weatherData, setWeatherData] = useState(null);
// // //   const [loading, setLoading] = useState(false);
// // //   const [status, setStatus] = useState("Getting your location...");
// // //   const [location, setLocation] = useState(null);
// // //   const [unit, setUnit] = useState("metric");
// // //   const navigate = useNavigate();

// // //   // Free weather API that doesn't require key (for demo)
// // //   // We'll use OpenWeatherMap as primary and fallback to another API
// // //   const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather";
// // //   const FALLBACK_API_URL = "https://api.weatherapi.com/v1/current.json?key=demo_key";
  
// // //   // Try your OpenWeatherMap key first, then use demo fallback
// // //   const API_KEYS = [
// // //     "1706db1dfb8e3a753fc26b39abf11a49", // Your key
// // //     "demo_key" // Fallback for testing
// // //   ];

// // //   // Speak function
// // //   const speak = (text) => {
// // //     const synth = window.speechSynthesis;
// // //     if (!synth) return;
// // //     synth.cancel();
// // //     const utter = new SpeechSynthesisUtterance(text);
// // //     utter.rate = 0.8;
// // //     synth.speak(utter);
// // //   };

// // //   // Get user's location
// // //   const getLocation = () => {
// // //     setLoading(true);
// // //     setStatus("Detecting your location...");
// // //     speak("Detecting your location");

// // //     if (navigator.geolocation) {
// // //       navigator.geolocation.getCurrentPosition(
// // //         async (position) => {
// // //           const { latitude, longitude } = position.coords;
// // //           setLocation({ latitude, longitude });
// // //           setStatus("Location detected! Fetching weather...");
// // //           speak("Location detected. Getting weather information");
// // //           await fetchWeatherData(latitude, longitude);
// // //         },
// // //         (error) => {
// // //           console.error("Error getting location:", error);
// // //           handleLocationError(error);
// // //         },
// // //         {
// // //           enableHighAccuracy: true,
// // //           timeout: 15000,
// // //           maximumAge: 60000
// // //         }
// // //       );
// // //     } else {
// // //       setStatus("Geolocation not supported by your browser.");
// // //       speak("Location services not available in your browser.");
// // //       setLoading(false);
// // //     }
// // //   };

// // //   // Handle location errors
// // //   const handleLocationError = (error) => {
// // //     let errorMessage = "Could not get your location. ";
    
// // //     switch(error.code) {
// // //       case error.PERMISSION_DENIED:
// // //         errorMessage += "Please allow location access to get weather data.";
// // //         break;
// // //       case error.POSITION_UNAVAILABLE:
// // //         errorMessage += "Location information is unavailable.";
// // //         break;
// // //       case error.TIMEOUT:
// // //         errorMessage += "Location request timed out.";
// // //         break;
// // //       default:
// // //         errorMessage += "An unknown error occurred.";
// // //         break;
// // //     }
    
// // //     setStatus(errorMessage);
// // //     speak("Location access denied. Using demo weather data for New York.");
    
// // //     // Use demo data with New York coordinates as fallback
// // //     const demoData = getDemoWeatherData();
// // //     setWeatherData(demoData);
// // //     setLoading(false);
// // //   };

// // //   // Fetch weather data - try multiple APIs
// // //   const fetchWeatherData = async (lat, lon) => {
// // //     setLoading(true);
    
// // //     // Try OpenWeatherMap first with your key
// // //     try {
// // //       setStatus("Fetching weather from OpenWeatherMap...");
// // //       const response = await axios.get(
// // //         `${WEATHER_API_URL}?lat=${lat}&lon=${lon}&units=${unit}&appid=${API_KEYS[0]}`
// // //       );
      
// // //       const data = response.data;
// // //       const formattedData = formatWeatherData(data);
// // //       setWeatherData(formattedData);
// // //       setStatus(`Weather data loaded for ${formattedData.location}`);
// // //       speak(`Weather loaded. ${generateWeatherSpeech(formattedData)}`);
// // //       setLoading(false);
// // //       return;
      
// // //     } catch (error) {
// // //       console.log("OpenWeatherMap failed, trying fallback...");
// // //     }
    
// // //     // If OpenWeatherMap fails, use demo data
// // //     try {
// // //       setStatus("Using demo weather data...");
// // //       speak("Using demo weather data");
      
// // //       // Simulate API delay
// // //       await new Promise(resolve => setTimeout(resolve, 1000));
      
// // //       const demoData = getDemoWeatherData();
// // //       setWeatherData(demoData);
// // //       setStatus(`Demo weather data loaded for ${demoData.location}`);
// // //       speak(`Demo weather loaded. ${generateWeatherSpeech(demoData)}`);
      
// // //     } catch (fallbackError) {
// // //       console.error("All weather APIs failed:", fallbackError);
// // //       setStatus("All weather services unavailable. Please try again later.");
// // //       speak("Unable to get weather information at this time.");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   // Format weather data from API response
// // //   const formatWeatherData = (data) => {
// // //     return {
// // //       location: `${data.name}, ${data.sys.country}`,
// // //       temperature: Math.round(data.main.temp),
// // //       feels_like: Math.round(data.main.feels_like),
// // //       humidity: data.main.humidity,
// // //       wind_speed: data.wind.speed,
// // //       description: data.weather[0].description,
// // //       icon: data.weather[0].icon,
// // //       pressure: data.main.pressure,
// // //       visibility: (data.visibility / 1000).toFixed(1),
// // //       sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString('en-US', {
// // //         hour: '2-digit',
// // //         minute: '2-digit',
// // //         hour12: true
// // //       }),
// // //       sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString('en-US', {
// // //         hour: '2-digit',
// // //         minute: '2-digit',
// // //         hour12: true
// // //       }),
// // //       temp_min: Math.round(data.main.temp_min),
// // //       temp_max: Math.round(data.main.temp_max)
// // //     };
// // //   };

// // //   // Generate demo weather data
// // //   const getDemoWeatherData = () => {
// // //     const cities = [
// // //       { name: "New York, US", temp: 22 },
// // //       { name: "London, UK", temp: 15 },
// // //       { name: "Tokyo, JP", temp: 18 },
// // //       { name: "Sydney, AU", temp: 25 },
// // //       { name: "Mumbai, IN", temp: 30 }
// // //     ];
    
// // //     const randomCity = cities[Math.floor(Math.random() * cities.length)];
// // //     const conditions = ["clear sky", "few clouds", "scattered clouds", "broken clouds", "light rain"];
// // //     const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
    
// // //     return {
// // //       location: randomCity.name,
// // //       temperature: randomCity.temp,
// // //       feels_like: randomCity.temp + 2,
// // //       humidity: Math.floor(Math.random() * 40) + 50, // 50-90%
// // //       wind_speed: (Math.random() * 10).toFixed(1),
// // //       description: randomCondition,
// // //       icon: "02d",
// // //       pressure: 1013,
// // //       visibility: (Math.random() * 5 + 5).toFixed(1), // 5-10 km
// // //       sunrise: "06:45 AM",
// // //       sunset: "07:30 PM",
// // //       temp_min: randomCity.temp - 3,
// // //       temp_max: randomCity.temp + 3,
// // //       isDemo: true
// // //     };
// // //   };

// // //   // Generate weather speech description
// // //   const generateWeatherSpeech = (data) => {
// // //     const temp = getTemperature(data.temperature);
// // //     const feelsLike = getTemperature(data.feels_like);
// // //     const demoText = data.isDemo ? "This is demo data. " : "";
// // //     return `${demoText}Current weather in ${data.location} is ${data.description}. Temperature is ${temp}, feels like ${feelsLike}. Humidity is ${data.humidity} percent. Wind speed is ${data.wind_speed} meters per second.`;
// // //   };

// // //   // Refresh weather data
// // //   const refreshWeather = () => {
// // //     if (location) {
// // //       fetchWeatherData(location.latitude, location.longitude);
// // //     } else {
// // //       getLocation();
// // //     }
// // //   };

// // //   // Toggle temperature unit
// // //   const toggleUnit = () => {
// // //     const newUnit = unit === "metric" ? "imperial" : "metric";
// // //     setUnit(newUnit);
// // //     const unitName = newUnit === "metric" ? "Celsius" : "Fahrenheit";
// // //     setStatus(`Switched to ${unitName}`);
// // //     speak(`Temperature unit changed to ${unitName}`);
    
// // //     // Refresh weather data with new unit
// // //     if (location && weatherData && !weatherData.isDemo) {
// // //       fetchWeatherData(location.latitude, location.longitude);
// // //     }
// // //   };

// // //   // Read weather aloud
// // //   const readWeatherAloud = () => {
// // //     if (weatherData) {
// // //       const speech = generateWeatherSpeech(weatherData);
// // //       speak(speech);
// // //     } else {
// // //       speak("No weather data available. Please refresh to get current weather.");
// // //     }
// // //   };

// // //   // Get weather icon based on condition
// // //   const getWeatherIcon = (iconCode, description) => {
// // //     const iconMap = {
// // //       "01d": "☀️", "01n": "🌙",
// // //       "02d": "⛅", "02n": "☁️",
// // //       "03d": "☁️", "03n": "☁️",
// // //       "04d": "☁️", "04n": "☁️",
// // //       "09d": "🌧️", "09n": "🌧️",
// // //       "10d": "🌦️", "10n": "🌧️",
// // //       "11d": "⛈️", "11n": "⛈️",
// // //       "13d": "❄️", "13n": "❄️",
// // //       "50d": "🌫️", "50n": "🌫️"
// // //     };
    
// // //     // For demo data, guess icon from description
// // //     if (!iconCode && description) {
// // //       if (description.includes("clear")) return "☀️";
// // //       if (description.includes("cloud")) return "☁️";
// // //       if (description.includes("rain")) return "🌧️";
// // //       if (description.includes("snow")) return "❄️";
// // //       if (description.includes("storm")) return "⛈️";
// // //     }
    
// // //     return iconMap[iconCode] || "🌈";
// // //   };

// // //   // Get temperature in current unit
// // //   const getTemperature = (temp) => {
// // //     if (unit === "metric") {
// // //       return `${temp}°C`;
// // //     } else {
// // //       return `${Math.round((temp * 9/5) + 32)}°F`;
// // //     }
// // //   };

// // //   // Get weather tips based on conditions
// // //   const getWeatherTips = () => {
// // //     if (!weatherData) return [];
    
// // //     const tips = [];
// // //     const temp = weatherData.temperature;
// // //     const description = weatherData.description.toLowerCase();
    
// // //     // Temperature-based tips
// // //     if (unit === "metric") {
// // //       if (temp < 5) tips.push("🥶 It's very cold! Wear warm layers and a jacket.");
// // //       else if (temp < 15) tips.push("🧥 Cool weather. A light jacket would be comfortable.");
// // //       else if (temp < 25) tips.push("😊 Pleasant temperature. Light clothing is perfect.");
// // //       else if (temp < 32) tips.push("🥵 Warm weather. Stay hydrated and wear light clothes.");
// // //       else tips.push("🔥 Very hot! Stay in shade and drink plenty of water.");
// // //     } else {
// // //       const tempF = Math.round((temp * 9/5) + 32);
// // //       if (tempF < 41) tips.push("🥶 It's very cold! Wear warm layers and a jacket.");
// // //       else if (tempF < 59) tips.push("🧥 Cool weather. A light jacket would be comfortable.");
// // //       else if (tempF < 77) tips.push("😊 Pleasant temperature. Light clothing is perfect.");
// // //       else if (tempF < 90) tips.push("🥵 Warm weather. Stay hydrated and wear light clothes.");
// // //       else tips.push("🔥 Very hot! Stay in shade and drink plenty of water.");
// // //     }
    
// // //     // Weather condition-based tips
// // //     if (description.includes("rain") || description.includes("drizzle")) {
// // //       tips.push("🌧️ Don't forget your umbrella! It's raining outside.");
// // //     }
// // //     if (description.includes("snow")) {
// // //       tips.push("❄️ Snowy conditions. Drive carefully and dress warmly.");
// // //     }
// // //     if (description.includes("thunderstorm")) {
// // //       tips.push("⛈️ Thunderstorm alert! Stay indoors if possible.");
// // //     }
// // //     if (description.includes("clear")) {
// // //       tips.push("☀️ Perfect day for outdoor activities!");
// // //     }
// // //     if (weatherData.wind_speed > 8) {
// // //       tips.push("💨 Windy conditions. Secure loose objects outdoors.");
// // //     }
// // //     if (weatherData.humidity > 80) {
// // //       tips.push("💦 High humidity. It might feel warmer than actual temperature.");
// // //     }
    
// // //     return tips.slice(0, 3);
// // //   };

// // //   useEffect(() => {
// // //     getLocation();
// // //   }, []);

// // //   const handleLogout = async () => {
// // //     setStatus("Logging out...");
// // //     speak("Logging out...");

// // //     try {
// // //       const token = localStorage.getItem("token");
// // //       if (token) {
// // //         await axios.post(
// // //           "http://127.0.0.1:8000/auth/voice-logout/",
// // //           {},
// // //           {
// // //             headers: {
// // //               Authorization: `Bearer ${token}`,
// // //               "Content-Type": "application/json",
// // //             },
// // //           }
// // //         );
// // //       }
// // //     } catch (error) {
// // //       console.error("Logout backend error:", error.response?.data || error.message);
// // //     } finally {
// // //       localStorage.clear();
// // //       setTimeout(() => navigate("/"), 1500);
// // //     }
// // //   };

// // //   const handleBackToDashboard = () => {
// // //     navigate("/dashboard");
// // //   };

// // //   const weatherTips = getWeatherTips();

// // //   return (
// // //     <div className="weather-reader-container">
// // //       {/* Fixed Header */}
// // //       <header className="dashboard-header fixed-header">
// // //         <div className="header-content">
// // //           <div className="header-left">
// // //             <button className="back-btn" onClick={handleBackToDashboard}>
// // //               ← Back to Dashboard
// // //             </button>
// // //             <h1 className="logo">Vision Assist</h1>
// // //           </div>
// // //           <div className="user-menu">
// // //             <button className="logout-btn" onClick={handleLogout}>
// // //               Logout
// // //             </button>
// // //           </div>
// // //         </div>
// // //       </header>

// // //       <div className="weather-content">
// // //         <div className="weather-header">
// // //           <h2>🌤️ Weather Reader</h2>
// // //           <p>Get real-time weather updates with voice feedback</p>
// // //         </div>

// // //         {/* Status Message */}
// // //         {status && (
// // //           <div className="status-message">
// // //             {status}
// // //             {weatherData?.isDemo && (
// // //               <div className="demo-notice-badge">
// // //                 🔄 Using Demo Data - Your API key is being activated
// // //               </div>
// // //             )}
// // //           </div>
// // //         )}

// // //         {/* Controls */}
// // //         <div className="weather-controls">
// // //           <button 
// // //             className="control-btn refresh-btn"
// // //             onClick={refreshWeather}
// // //             disabled={loading}
// // //           >
// // //             🔄 {loading ? "Loading..." : "Refresh Weather"}
// // //           </button>
          
// // //           <button 
// // //             className="control-btn unit-btn"
// // //             onClick={toggleUnit}
// // //             disabled={loading}
// // //           >
// // //             🌡️ Switch to {unit === "metric" ? "Fahrenheit" : "Celsius"}
// // //           </button>
          
// // //           <button 
// // //             className="control-btn voice-btn"
// // //             onClick={readWeatherAloud}
// // //             disabled={!weatherData || loading}
// // //           >
// // //             🎤 Read Weather Aloud
// // //           </button>
// // //         </div>

// // //         {/* Weather Display */}
// // //         {weatherData && (
// // //           <div className="weather-display">
// // //             <div className="current-weather-card">
// // //               <div className="weather-main">
// // //                 <div className="weather-icon">
// // //                   {getWeatherIcon(weatherData.icon, weatherData.description)}
// // //                   {weatherData.isDemo && <span className="demo-indicator">DEMO</span>}
// // //                 </div>
// // //                 <div className="weather-primary">
// // //                   <h3>{getTemperature(weatherData.temperature)}</h3>
// // //                   <p className="weather-description">{weatherData.description}</p>
// // //                   <p className="weather-location">📍 {weatherData.location}</p>
// // //                   <p className="weather-feels-like">
// // //                     Feels like {getTemperature(weatherData.feels_like)}
// // //                   </p>
// // //                 </div>
// // //               </div>

// // //               <div className="weather-details-grid">
// // //                 <div className="weather-detail">
// // //                   <span className="detail-label">Min / Max</span>
// // //                   <span className="detail-value">
// // //                     {getTemperature(weatherData.temp_min)} / {getTemperature(weatherData.temp_max)}
// // //                   </span>
// // //                 </div>
                
// // //                 <div className="weather-detail">
// // //                   <span className="detail-label">Humidity</span>
// // //                   <span className="detail-value">{weatherData.humidity}%</span>
// // //                 </div>
                
// // //                 <div className="weather-detail">
// // //                   <span className="detail-label">Wind Speed</span>
// // //                   <span className="detail-value">{weatherData.wind_speed} m/s</span>
// // //                 </div>
                
// // //                 <div className="weather-detail">
// // //                   <span className="detail-label">Pressure</span>
// // //                   <span className="detail-value">{weatherData.pressure} hPa</span>
// // //                 </div>
                
// // //                 <div className="weather-detail">
// // //                   <span className="detail-label">Visibility</span>
// // //                   <span className="detail-value">{weatherData.visibility} km</span>
// // //                 </div>
                
// // //                 <div className="weather-detail">
// // //                   <span className="detail-label">Sunrise</span>
// // //                   <span className="detail-value">{weatherData.sunrise}</span>
// // //                 </div>
                
// // //                 <div className="weather-detail">
// // //                   <span className="detail-label">Sunset</span>
// // //                   <span className="detail-value">{weatherData.sunset}</span>
// // //                 </div>
// // //               </div>
// // //             </div>

// // //             {/* Weather Tips */}
// // //             {weatherTips.length > 0 && (
// // //               <div className="weather-tips">
// // //                 <h4>🌦️ Weather Tips</h4>
// // //                 <div className="tips-grid">
// // //                   {weatherTips.map((tip, index) => (
// // //                     <div key={index} className="tip-card">
// // //                       <span className="tip-icon">{tip.split(' ')[0]}</span>
// // //                       <p>{tip}</p>
// // //                     </div>
// // //                   ))}
// // //                 </div>
// // //               </div>
// // //             )}
// // //           </div>
// // //         )}

// // //         {/* Loading State */}
// // //         {loading && (
// // //           <div className="loading-state">
// // //             <div className="loading-spinner"></div>
// // //             <p>Getting your weather information...</p>
// // //           </div>
// // //         )}

// // //         {/* API Key Status */}
// // //         <div className="api-status">
// // //           <h4>🔑 API Key Status</h4>
// // //           <p>
// // //             <strong>Your OpenWeatherMap Key:</strong> {API_KEYS[0]}
// // //           </p>
// // //           <p>
// // //             <strong>Status:</strong> {weatherData?.isDemo ? 
// // //               "⏳ Activating (Using Demo Data)" : "✅ Active (Real Data)"}
// // //           </p>
// // //           <p className="status-note">
// // //             New API keys can take 10-60 minutes to activate. The app will automatically switch to real data when your key is ready.
// // //           </p>
// // //         </div>
// // //       </div>

// // //       {/* Status Bar */}
// // //       <div className="status-bar">
// // //         <p>{status}</p>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default WeatherReader;



// // // import React, { useState, useEffect, useCallback } from "react";
// // // import { useNavigate } from "react-router-dom";
// // // import axios from "axios";
// // // import { voiceService } from "../../services/voiceService";
// // // import "./WeatherReader.css";

// // // const WeatherReader = () => {
// // //   const [weatherData, setWeatherData] = useState(null);
// // //   const [loading, setLoading] = useState(false);
// // //   const [status, setStatus] = useState("Getting your location...");
// // //   const [location, setLocation] = useState(null);
// // //   const [unit, setUnit] = useState("metric");
// // //   const [spokenText, setSpokenText] = useState("");
// // //   const [customLocation, setCustomLocation] = useState("");
// // //   const [isSpeaking, setIsSpeaking] = useState(false);
// // //   const navigate = useNavigate();

// // //   const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather";
// // //   const FORECAST_API_URL = "https://api.openweathermap.org/data/2.5/forecast";
// // //   const API_KEYS = ["1706db1dfb8e3a753fc26b39abf11a49", "demo_key"];

// // //   // Speak function
// // //   const speak = useCallback((text) => {
// // //     return new Promise((resolve) => {
// // //       const synth = window.speechSynthesis;
// // //       if (!synth) {
// // //         resolve();
// // //         return;
// // //       }
      
// // //       synth.cancel();
// // //       setIsSpeaking(true);
      
// // //       const utter = new SpeechSynthesisUtterance(text);
// // //       utter.rate = 0.8;
// // //       utter.pitch = 1;
// // //       utter.volume = 1;
      
// // //       utter.onstart = () => {
// // //         console.log("Started speaking:", text.substring(0, 50) + "...");
// // //       };
      
// // //       utter.onend = () => {
// // //         console.log("Finished speaking");
// // //         setIsSpeaking(false);
// // //         resolve();
// // //       };
      
// // //       utter.onerror = (err) => {
// // //         if (err.error !== 'interrupted') {
// // //           console.error("Speech error:", err);
// // //         }
// // //         setIsSpeaking(false);
// // //         resolve();
// // //       };
      
// // //       synth.speak(utter);
// // //     });
// // //   }, []);

// // //   // Stop speaking function
// // //   const stopSpeaking = useCallback(() => {
// // //     const synth = window.speechSynthesis;
// // //     if (synth) {
// // //       synth.cancel();
// // //       setIsSpeaking(false);
// // //     }
// // //   }, []);

// // //   // Pause/resume speaking
// // //   const pauseSpeaking = useCallback(() => {
// // //     const synth = window.speechSynthesis;
// // //     if (synth && synth.speaking) {
// // //       synth.pause();
// // //     }
// // //   }, []);

// // //   const resumeSpeaking = useCallback(() => {
// // //     const synth = window.speechSynthesis;
// // //     if (synth && synth.paused) {
// // //       synth.resume();
// // //     }
// // //   }, []);

// // //   // Get user's location
// // //   const getLocation = useCallback(() => {
// // //     setLoading(true);
// // //     setStatus("Detecting your location...");
// // //     speak("Detecting your location");

// // //     if (navigator.geolocation) {
// // //       navigator.geolocation.getCurrentPosition(
// // //         async (position) => {
// // //           const { latitude, longitude } = position.coords;
// // //           setLocation({ latitude, longitude });
// // //           setStatus("Location detected! Fetching weather...");
// // //           await speak("Location detected. Getting weather information");
// // //           await fetchWeatherData(latitude, longitude);
// // //         },
// // //         (error) => {
// // //           console.error("Error getting location:", error);
// // //           handleLocationError(error);
// // //         },
// // //         {
// // //           enableHighAccuracy: true,
// // //           timeout: 15000,
// // //           maximumAge: 60000
// // //         }
// // //       );
// // //     } else {
// // //       setStatus("Geolocation not supported by your browser.");
// // //       speak("Location services not available in your browser.");
// // //       setLoading(false);
// // //     }
// // //   }, [speak]);

// // //   // Handle location errors
// // //   const handleLocationError = useCallback((error) => {
// // //     let errorMessage = "Could not get your location. ";
    
// // //     switch(error.code) {
// // //       case error.PERMISSION_DENIED:
// // //         errorMessage += "Please allow location access to get weather data.";
// // //         break;
// // //       case error.POSITION_UNAVAILABLE:
// // //         errorMessage += "Location information is unavailable.";
// // //         break;
// // //       case error.TIMEOUT:
// // //         errorMessage += "Location request timed out.";
// // //         break;
// // //       default:
// // //         errorMessage += "An unknown error occurred.";
// // //         break;
// // //     }
    
// // //     setStatus(errorMessage);
// // //     speak("Location access denied. Using demo weather data for New York.");
    
// // //     const demoData = getDemoWeatherData();
// // //     setWeatherData(demoData);
// // //     setLoading(false);
// // //   }, [speak]);

// // //   // Fetch weather data
// // //   const fetchWeatherData = useCallback(async (lat, lon, cityName = null) => {
// // //     setLoading(true);
// // //     setStatus(cityName ? `Fetching weather for ${cityName}...` : "Fetching weather...");
    
// // //     try {
// // //       let response;
// // //       if (cityName) {
// // //         response = await axios.get(
// // //           `${WEATHER_API_URL}?q=${cityName}&units=${unit}&appid=${API_KEYS[0]}`
// // //         );
// // //       } else {
// // //         response = await axios.get(
// // //           `${WEATHER_API_URL}?lat=${lat}&lon=${lon}&units=${unit}&appid=${API_KEYS[0]}`
// // //         );
// // //       }
      
// // //       const data = response.data;
// // //       const formattedData = formatWeatherData(data);
// // //       setWeatherData(formattedData);
// // //       setStatus(`Weather data loaded for ${formattedData.location}`);
// // //       setLoading(false);
// // //       return formattedData;
      
// // //     } catch (error) {
// // //       console.log("OpenWeatherMap failed, using demo data...");
      
// // //       const demoData = getDemoWeatherData(cityName);
// // //       setWeatherData(demoData);
// // //       setStatus(`Demo weather data loaded for ${demoData.location}`);
// // //       setLoading(false);
// // //       return demoData;
// // //     }
// // //   }, [unit]);

// // //   // Format weather data
// // //   const formatWeatherData = (data) => {
// // //     return {
// // //       location: `${data.name}, ${data.sys?.country || ''}`,
// // //       temperature: Math.round(data.main.temp),
// // //       feels_like: Math.round(data.main.feels_like),
// // //       humidity: data.main.humidity,
// // //       wind_speed: data.wind.speed,
// // //       description: data.weather[0].description,
// // //       icon: data.weather[0].icon,
// // //       pressure: data.main.pressure,
// // //       visibility: (data.visibility / 1000).toFixed(1),
// // //       sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString('en-US', {
// // //         hour: '2-digit',
// // //         minute: '2-digit',
// // //         hour12: true
// // //       }),
// // //       sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString('en-US', {
// // //         hour: '2-digit',
// // //         minute: '2-digit',
// // //         hour12: true
// // //       }),
// // //       temp_min: Math.round(data.main.temp_min),
// // //       temp_max: Math.round(data.main.temp_max),
// // //       isDemo: false
// // //     };
// // //   };

// // //   // Generate demo weather data
// // //   const getDemoWeatherData = (cityName = null) => {
// // //     const cities = [
// // //       { name: "New York, US", temp: 22 },
// // //       { name: "London, UK", temp: 15 },
// // //       { name: "Tokyo, JP", temp: 18 },
// // //       { name: "Sydney, AU", temp: 25 },
// // //       { name: "Mumbai, IN", temp: 30 }
// // //     ];
    
// // //     const randomCity = cityName ? 
// // //       { name: cityName, temp: 22 } : 
// // //       cities[Math.floor(Math.random() * cities.length)];
    
// // //     const conditions = ["clear sky", "few clouds", "scattered clouds", "broken clouds", "light rain"];
// // //     const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
    
// // //     return {
// // //       location: randomCity.name,
// // //       temperature: randomCity.temp,
// // //       feels_like: randomCity.temp + 2,
// // //       humidity: Math.floor(Math.random() * 40) + 50,
// // //       wind_speed: (Math.random() * 10).toFixed(1),
// // //       description: randomCondition,
// // //       icon: "02d",
// // //       pressure: 1013,
// // //       visibility: (Math.random() * 5 + 5).toFixed(1),
// // //       sunrise: "06:45 AM",
// // //       sunset: "07:30 PM",
// // //       temp_min: randomCity.temp - 3,
// // //       temp_max: randomCity.temp + 3,
// // //       isDemo: true
// // //     };
// // //   };

// // //   // Generate weather speech description
// // //   const getWeatherDescription = useCallback(() => {
// // //     if (!weatherData) return "No weather data available. Please refresh to get current weather.";
    
// // //     const temp = getTemperature(weatherData.temperature);
// // //     const feelsLike = getTemperature(weatherData.feels_like);
// // //     const demoText = weatherData.isDemo ? "This is demo data. " : "";
    
// // //     return `${demoText}Current weather in ${weatherData.location} is ${weatherData.description}. ` +
// // //            `Temperature is ${temp}, feels like ${feelsLike}. ` +
// // //            `Humidity is ${weatherData.humidity} percent. ` +
// // //            `Wind speed is ${weatherData.wind_speed} meters per second. ` +
// // //            `Visibility is ${weatherData.visibility} kilometers. ` +
// // //            `Sunrise at ${weatherData.sunrise}, sunset at ${weatherData.sunset}.`;
// // //   }, [weatherData]);

// // //   // Read weather aloud
// // //   const readWeatherAloud = useCallback(async () => {
// // //     const description = getWeatherDescription();
// // //     await speak(description);
// // //   }, [getWeatherDescription, speak]);

// // //   // Change temperature unit
// // //   const toggleUnit = useCallback(async () => {
// // //     const newUnit = unit === "metric" ? "imperial" : "metric";
// // //     setUnit(newUnit);
// // //     const unitName = newUnit === "metric" ? "Celsius" : "Fahrenheit";
// // //     setStatus(`Switched to ${unitName}`);
// // //     await speak(`Temperature unit changed to ${unitName}`);
    
// // //     if (location && weatherData && !weatherData.isDemo) {
// // //       await fetchWeatherData(location.latitude, location.longitude);
// // //     }
// // //   }, [unit, location, weatherData, speak, fetchWeatherData]);

// // //   // Change location
// // //   const changeLocation = useCallback(async (cityName) => {
// // //     if (!cityName || cityName.trim() === "") {
// // //       await speak("Please specify a city name. For example: change location to London");
// // //       return;
// // //     }
    
// // //     setCustomLocation(cityName);
// // //     setStatus(`Changing location to ${cityName}...`);
// // //     await speak(`Changing location to ${cityName}`);
// // //     await fetchWeatherData(null, null, cityName);
// // //   }, [speak, fetchWeatherData]);

// // //   // Refresh weather
// // //   const refreshWeather = useCallback(async () => {
// // //     if (customLocation) {
// // //       await fetchWeatherData(null, null, customLocation);
// // //     } else if (location) {
// // //       await fetchWeatherData(location.latitude, location.longitude);
// // //     } else {
// // //       getLocation();
// // //     }
// // //     await speak("Weather refreshed");
// // //   }, [customLocation, location, fetchWeatherData, getLocation, speak]);

// // //   // Get specific weather detail
// // //   const getWeatherDetail = useCallback((detail) => {
// // //     if (!weatherData) return "No weather data available.";
    
// // //     switch(detail) {
// // //       case 'temperature':
// // //         return `Temperature is ${getTemperature(weatherData.temperature)}`;
// // //       case 'humidity':
// // //         return `Humidity is ${weatherData.humidity} percent`;
// // //       case 'wind speed':
// // //         return `Wind speed is ${weatherData.wind_speed} meters per second`;
// // //       case 'condition':
// // //         return `Weather condition is ${weatherData.description}`;
// // //       case 'sunrise':
// // //         return `Sunrise at ${weatherData.sunrise}`;
// // //       case 'sunset':
// // //         return `Sunset at ${weatherData.sunset}`;
// // //       case 'feels like':
// // //         return `Feels like ${getTemperature(weatherData.feels_like)}`;
// // //       case 'visibility':
// // //         return `Visibility is ${weatherData.visibility} kilometers`;
// // //       case 'pressure':
// // //         return `Atmospheric pressure is ${weatherData.pressure} hectopascals`;
// // //       default:
// // //         return getWeatherDescription();
// // //     }
// // //   }, [weatherData, getWeatherDescription]);

// // //   // Get temperature in current unit
// // //   const getTemperature = useCallback((temp) => {
// // //     if (unit === "metric") {
// // //       return `${temp}°C`;
// // //     } else {
// // //       return `${Math.round((temp * 9/5) + 32)}°F`;
// // //     }
// // //   }, [unit]);

// // //   // Voice command registration
// // //   const registerVoiceCommands = useCallback(() => {
// // //     if (!voiceService.isAvailable()) return;
    
// // //     console.log("Registering Weather Reader voice commands...");
// // //     voiceService.clearCommands();
// // //     voiceService.setFeature('weather-reader', (transcript) => {
// // //       console.log("Weather voice input:", transcript);
// // //       setSpokenText(transcript);
// // //     });
    
// // //     // Basic weather commands
// // //     voiceService.registerCommand("check weather", async () => {
// // //       console.log("Command: check weather");
// // //       await speak("Checking weather...");
// // //       refreshWeather();
// // //     });
    
// // //     voiceService.registerCommand("weather forecast", async () => {
// // //       console.log("Command: weather forecast");
// // //       await speak("Getting weather forecast...");
// // //       refreshWeather();
// // //     });
    
// // //     voiceService.registerCommand("current weather", async () => {
// // //       console.log("Command: current weather");
// // //       if (weatherData) {
// // //         await readWeatherAloud();
// // //       } else {
// // //         await speak("Weather data not available. Checking now...");
// // //         refreshWeather();
// // //       }
// // //     });
    
// // //     voiceService.registerCommand("weather now", async () => {
// // //       console.log("Command: weather now");
// // //       await readWeatherAloud();
// // //     });
    
// // //     voiceService.registerCommand("today's weather", async () => {
// // //       console.log("Command: today's weather");
// // //       await readWeatherAloud();
// // //     });
    
// // //     voiceService.registerCommand("what's the weather", async () => {
// // //       console.log("Command: what's the weather");
// // //       await readWeatherAloud();
// // //     });
    
// // //     voiceService.registerCommand("tell me the weather", async () => {
// // //       console.log("Command: tell me the weather");
// // //       await readWeatherAloud();
// // //     });
    
// // //     // Temperature commands
// // //     voiceService.registerCommand("temperature", async () => {
// // //       console.log("Command: temperature");
// // //       const detail = getWeatherDetail('temperature');
// // //       await speak(detail);
// // //     });
    
// // //     voiceService.registerCommand("current temperature", async () => {
// // //       console.log("Command: current temperature");
// // //       const detail = getWeatherDetail('temperature');
// // //       await speak(detail);
// // //     });
    
// // //     voiceService.registerCommand("today temperature", async () => {
// // //       console.log("Command: today temperature");
// // //       const detail = getWeatherDetail('temperature');
// // //       await speak(detail);
// // //     });
    
// // //     voiceService.registerCommand("how hot is it", async () => {
// // //       console.log("Command: how hot is it");
// // //       const detail = getWeatherDetail('temperature');
// // //       await speak(detail);
// // //     });
    
// // //     voiceService.registerCommand("how cold is it", async () => {
// // //       console.log("Command: how cold is it");
// // //       const detail = getWeatherDetail('temperature');
// // //       await speak(detail);
// // //     });
    
// // //     // Condition commands
// // //     voiceService.registerCommand("weather condition", async () => {
// // //       console.log("Command: weather condition");
// // //       const detail = getWeatherDetail('condition');
// // //       await speak(detail);
// // //     });
    
// // //     voiceService.registerCommand("current condition", async () => {
// // //       console.log("Command: current condition");
// // //       const detail = getWeatherDetail('condition');
// // //       await speak(detail);
// // //     });
    
// // //     voiceService.registerCommand("is it sunny", async () => {
// // //       console.log("Command: is it sunny");
// // //       if (weatherData) {
// // //         const isSunny = weatherData.description.includes('clear') || weatherData.description.includes('sunny');
// // //         await speak(isSunny ? "Yes, it's sunny" : `No, it's ${weatherData.description}`);
// // //       }
// // //     });
    
// // //     voiceService.registerCommand("is it raining", async () => {
// // //       console.log("Command: is it raining");
// // //       if (weatherData) {
// // //         const isRaining = weatherData.description.includes('rain');
// // //         await speak(isRaining ? "Yes, it's raining" : `No, it's ${weatherData.description}`);
// // //       }
// // //     });
    
// // //     voiceService.registerCommand("is it cloudy", async () => {
// // //       console.log("Command: is it cloudy");
// // //       if (weatherData) {
// // //         const isCloudy = weatherData.description.includes('cloud');
// // //         await speak(isCloudy ? "Yes, it's cloudy" : `No, it's ${weatherData.description}`);
// // //       }
// // //     });
    
// // //     voiceService.registerCommand("is it windy", async () => {
// // //       console.log("Command: is it windy");
// // //       if (weatherData) {
// // //         const detail = getWeatherDetail('wind speed');
// // //         await speak(detail);
// // //       }
// // //     });
    
// // //     // Extra info commands
// // //     voiceService.registerCommand("humidity", async () => {
// // //       console.log("Command: humidity");
// // //       const detail = getWeatherDetail('humidity');
// // //       await speak(detail);
// // //     });
    
// // //     voiceService.registerCommand("wind speed", async () => {
// // //       console.log("Command: wind speed");
// // //       const detail = getWeatherDetail('wind speed');
// // //       await speak(detail);
// // //     });
    
// // //     voiceService.registerCommand("air quality", async () => {
// // //       console.log("Command: air quality");
// // //       await speak("Air quality information is not available in the current version.");
// // //     });
    
// // //     voiceService.registerCommand("chance of rain", async () => {
// // //       console.log("Command: chance of rain");
// // //       await speak("Precipitation probability is not available in the current version.");
// // //     });
    
// // //     voiceService.registerCommand("sunrise time", async () => {
// // //       console.log("Command: sunrise time");
// // //       const detail = getWeatherDetail('sunrise');
// // //       await speak(detail);
// // //     });
    
// // //     voiceService.registerCommand("sunset time", async () => {
// // //       console.log("Command: sunset time");
// // //       const detail = getWeatherDetail('sunset');
// // //       await speak(detail);
// // //     });
    
// // //     voiceService.registerCommand("feels like", async () => {
// // //       console.log("Command: feels like");
// // //       const detail = getWeatherDetail('feels like');
// // //       await speak(detail);
// // //     });
    
// // //     voiceService.registerCommand("visibility", async () => {
// // //       console.log("Command: visibility");
// // //       const detail = getWeatherDetail('visibility');
// // //       await speak(detail);
// // //     });
    
// // //     voiceService.registerCommand("pressure", async () => {
// // //       console.log("Command: pressure");
// // //       const detail = getWeatherDetail('pressure');
// // //       await speak(detail);
// // //     });
    
// // //     // Refresh/Update commands
// // //     voiceService.registerCommand("refresh weather", async () => {
// // //       console.log("Command: refresh weather");
// // //       await refreshWeather();
// // //     });
    
// // //     voiceService.registerCommand("reload weather", async () => {
// // //       console.log("Command: reload weather");
// // //       await refreshWeather();
// // //     });
    
// // //     voiceService.registerCommand("update weather", async () => {
// // //       console.log("Command: update weather");
// // //       await refreshWeather();
// // //     });
    
// // //     voiceService.registerCommand("get latest weather", async () => {
// // //       console.log("Command: get latest weather");
// // //       await refreshWeather();
// // //     });
    
// // //     // Tomorrow forecast (placeholder)
// // //     voiceService.registerCommand("tomorrow forecast", async () => {
// // //       console.log("Command: tomorrow forecast");
// // //       await speak("Tomorrow's forecast feature is coming soon. For now, here's today's weather:");
// // //       await readWeatherAloud();
// // //     });
    
// // //     // Change location commands
// // //     voiceService.registerCommand("change location", async () => {
// // //       console.log("Command: change location");
// // //       await speak("Please say the city name. For example: change location to London");
// // //     });
    
// // //     voiceService.registerCommand("change location to", async () => {
// // //       console.log("Command: change location to");
// // //       await speak("Please specify a city name after 'to'. For example: change location to London");
// // //     });
    
// // //     // Register dynamic location change (handled by onResultCallback)
    
// // //     // Speech control commands
// // //     voiceService.registerCommand("stop reading", async () => {
// // //       console.log("Command: stop reading");
// // //       stopSpeaking();
// // //       await speak("Stopped reading");
// // //     });
    
// // //     voiceService.registerCommand("stop speaking", async () => {
// // //       console.log("Command: stop speaking");
// // //       stopSpeaking();
// // //       await speak("Stopped speaking");
// // //     });
    
// // //     voiceService.registerCommand("pause reading", async () => {
// // //       console.log("Command: pause reading");
// // //       pauseSpeaking();
// // //       await speak("Paused");
// // //     });
    
// // //     voiceService.registerCommand("pause speaking", async () => {
// // //       console.log("Command: pause speaking");
// // //       pauseSpeaking();
// // //       await speak("Paused");
// // //     });
    
// // //     voiceService.registerCommand("resume reading", async () => {
// // //       console.log("Command: resume reading");
// // //       resumeSpeaking();
// // //       await speak("Resumed");
// // //     });
    
// // //     voiceService.registerCommand("resume speaking", async () => {
// // //       console.log("Command: resume speaking");
// // //       resumeSpeaking();
// // //       await speak("Resumed");
// // //     });
    
// // //     voiceService.registerCommand("stop", async () => {
// // //       console.log("Command: stop");
// // //       stopSpeaking();
// // //     });
    
// // //     voiceService.registerCommand("pause", async () => {
// // //       console.log("Command: pause");
// // //       pauseSpeaking();
// // //     });
    
// // //     voiceService.registerCommand("resume", async () => {
// // //       console.log("Command: resume");
// // //       resumeSpeaking();
// // //     });
    
// // //     // Help commands
// // //     voiceService.registerCommand("help", async () => {
// // //       console.log("Command: help");
// // //       const helpText = "Weather Reader voice commands: " +
// // //         "Say 'check weather' or 'refresh weather' to get latest forecast. " +
// // //         "Say 'temperature', 'humidity', or 'wind speed' for specific details. " +
// // //         "Say 'sunrise time' or 'sunset time' for daily timings. " +
// // //         "Say 'change location' followed by city name to change location. " +
// // //         "Say 'stop reading' or 'pause reading' to control speech. " +
// // //         "Say 'go to dashboard' to return to main menu. " +
// // //         "Try asking: 'what's the weather', 'is it raining', or 'how hot is it'.";
// // //       await speak(helpText);
// // //     });
    
// // //     voiceService.registerCommand("weather help", async () => {
// // //       console.log("Command: weather help");
// // //       const helpText = "Weather commands: check weather, temperature, humidity, wind speed, sunrise time, sunset time, change location, stop reading, help.";
// // //       await speak(helpText);
// // //     });
    
// // //     voiceService.registerCommand("what can I say", async () => {
// // //       console.log("Command: what can I say");
// // //       const helpText = "You can say: check weather, temperature, humidity, wind speed, sunrise, sunset, change location, stop reading, or help.";
// // //       await speak(helpText);
// // //     });
    
// // //     voiceService.registerCommand("list commands", async () => {
// // //       console.log("Command: list commands");
// // //       const helpText = "Weather commands: check weather, current weather, temperature, humidity, wind speed, sunrise time, sunset time, feels like, visibility, pressure, change location, refresh weather, stop reading, pause, resume, help.";
// // //       await speak(helpText);
// // //     });
    
// // //     // Navigation commands
// // //     voiceService.registerCommand("go to dashboard", async () => {
// // //       console.log("Command: go to dashboard");
// // //       await speak("Returning to dashboard");
// // //       navigate("/dashboard");
// // //     });
    
// // //     voiceService.registerCommand("dashboard", async () => {
// // //       console.log("Command: dashboard");
// // //       await speak("Going to dashboard");
// // //       navigate("/dashboard");
// // //     });
    
// // //     voiceService.registerCommand("home", async () => {
// // //       console.log("Command: home");
// // //       await speak("Going home");
// // //       navigate("/dashboard");
// // //     });
    
// // //     voiceService.registerCommand("back", async () => {
// // //       console.log("Command: back");
// // //       await speak("Going back to dashboard");
// // //       navigate("/dashboard");
// // //     });
    
// // //     // Logout commands
// // //     voiceService.registerCommand("logout", async () => {
// // //       console.log("Command: logout");
// // //       await speak("Logging out");
// // //       handleLogout();
// // //     });
    
// // //     voiceService.registerCommand("sign out", async () => {
// // //       console.log("Command: sign out");
// // //       await speak("Signing out");
// // //       handleLogout();
// // //     });
    
// // //     // Start listening
// // //     if (!voiceService.isListening) {
// // //       voiceService.startListening();
// // //     }
    
// // //     console.log("✅ Weather Reader voice commands initialized");
    
// // //     // Return cleanup function
// // //     return () => {
// // //       console.log("Cleaning up Weather Reader voice commands");
// // //       voiceService.stopListening();
// // //     };
// // //   }, [
// // //     weatherData, 
// // //     refreshWeather, 
// // //     readWeatherAloud, 
// // //     getWeatherDetail, 
// // //     getWeatherDescription, 
// // //     speak, 
// // //     stopSpeaking, 
// // //     pauseSpeaking, 
// // //     resumeSpeaking, 
// // //     navigate
// // //     // handleLogout
// // //   ]);

// // //   // Handle dynamic location change in onResultCallback
// // //   useEffect(() => {
// // //     const handleVoiceInput = (transcript) => {
// // //       const lowerTranscript = transcript.toLowerCase();
      
// // //       // Check for location change patterns
// // //       if (lowerTranscript.includes("change location to") || 
// // //           lowerTranscript.includes("location to") ||
// // //           lowerTranscript.includes("weather in")) {
        
// // //         let cityName = "";
        
// // //         // Extract city name from different patterns
// // //         if (lowerTranscript.includes("change location to")) {
// // //           cityName = lowerTranscript.split("change location to")[1].trim();
// // //         } else if (lowerTranscript.includes("location to")) {
// // //           cityName = lowerTranscript.split("location to")[1].trim();
// // //         } else if (lowerTranscript.includes("weather in")) {
// // //           cityName = lowerTranscript.split("weather in")[1].trim();
// // //         }
        
// // //         if (cityName) {
// // //           changeLocation(cityName);
// // //         }
// // //       }
// // //     };
    
// // //     voiceService.onResultCallback = handleVoiceInput;
// // //   }, [changeLocation]);

// // //   // Initialize voice commands
// // //   useEffect(() => {
// // //     const cleanup = registerVoiceCommands();
// // //     return cleanup;
// // //   }, [registerVoiceCommands]);

// // //   // Get location on mount
// // //   useEffect(() => {
// // //     getLocation();
// // //   }, [getLocation]);

// // //   // Logout function
// // //   const handleLogout = useCallback(async () => {
// // //     setStatus("Logging out...");
// // //     await speak("Logging out...");

// // //     try {
// // //       const token = localStorage.getItem("token");
// // //       if (token) {
// // //         await axios.post(
// // //           "http://127.0.0.1:8000/auth/voice-logout/",
// // //           {},
// // //           {
// // //             headers: {
// // //               Authorization: `Bearer ${token}`,
// // //               "Content-Type": "application/json",
// // //             },
// // //           }
// // //         );
// // //       }
// // //     } catch (error) {
// // //       console.error("Logout backend error:", error.response?.data || error.message);
// // //     } finally {
// // //       localStorage.clear();
// // //       setTimeout(() => navigate("/"), 1500);
// // //     }
// // //   }, [navigate, speak]);

// // //   const handleBackToDashboard = () => {
// // //     navigate("/dashboard");
// // //   };

// // //   // Get weather icon
// // //   const getWeatherIcon = (iconCode, description) => {
// // //     const iconMap = {
// // //       "01d": "☀️", "01n": "🌙",
// // //       "02d": "⛅", "02n": "☁️",
// // //       "03d": "☁️", "03n": "☁️",
// // //       "04d": "☁️", "04n": "☁️",
// // //       "09d": "🌧️", "09n": "🌧️",
// // //       "10d": "🌦️", "10n": "🌧️",
// // //       "11d": "⛈️", "11n": "⛈️",
// // //       "13d": "❄️", "13n": "❄️",
// // //       "50d": "🌫️", "50n": "🌫️"
// // //     };
    
// // //     if (!iconCode && description) {
// // //       if (description.includes("clear")) return "☀️";
// // //       if (description.includes("cloud")) return "☁️";
// // //       if (description.includes("rain")) return "🌧️";
// // //       if (description.includes("snow")) return "❄️";
// // //       if (description.includes("storm")) return "⛈️";
// // //     }
    
// // //     return iconMap[iconCode] || "🌈";
// // //   };

// // //   // Get weather tips
// // //   const getWeatherTips = useCallback(() => {
// // //     if (!weatherData) return [];
    
// // //     const tips = [];
// // //     const temp = weatherData.temperature;
// // //     const description = weatherData.description.toLowerCase();
    
// // //     if (unit === "metric") {
// // //       if (temp < 5) tips.push("🥶 It's very cold! Wear warm layers and a jacket.");
// // //       else if (temp < 15) tips.push("🧥 Cool weather. A light jacket would be comfortable.");
// // //       else if (temp < 25) tips.push("😊 Pleasant temperature. Light clothing is perfect.");
// // //       else if (temp < 32) tips.push("🥵 Warm weather. Stay hydrated and wear light clothes.");
// // //       else tips.push("🔥 Very hot! Stay in shade and drink plenty of water.");
// // //     } else {
// // //       const tempF = Math.round((temp * 9/5) + 32);
// // //       if (tempF < 41) tips.push("🥶 It's very cold! Wear warm layers and a jacket.");
// // //       else if (tempF < 59) tips.push("🧥 Cool weather. A light jacket would be comfortable.");
// // //       else if (tempF < 77) tips.push("😊 Pleasant temperature. Light clothing is perfect.");
// // //       else if (tempF < 90) tips.push("🥵 Warm weather. Stay hydrated and wear light clothes.");
// // //       else tips.push("🔥 Very hot! Stay in shade and drink plenty of water.");
// // //     }
    
// // //     if (description.includes("rain") || description.includes("drizzle")) {
// // //       tips.push("🌧️ Don't forget your umbrella! It's raining outside.");
// // //     }
// // //     if (description.includes("snow")) {
// // //       tips.push("❄️ Snowy conditions. Drive carefully and dress warmly.");
// // //     }
// // //     if (description.includes("thunderstorm")) {
// // //       tips.push("⛈️ Thunderstorm alert! Stay indoors if possible.");
// // //     }
// // //     if (description.includes("clear")) {
// // //       tips.push("☀️ Perfect day for outdoor activities!");
// // //     }
// // //     if (weatherData.wind_speed > 8) {
// // //       tips.push("💨 Windy conditions. Secure loose objects outdoors.");
// // //     }
// // //     if (weatherData.humidity > 80) {
// // //       tips.push("💦 High humidity. It might feel warmer than actual temperature.");
// // //     }
    
// // //     return tips.slice(0, 3);
// // //   }, [weatherData, unit]);

// // //   const weatherTips = getWeatherTips();

// // //   return (
// // //     <div className="weather-reader-container">
// // //       {/* Fixed Header */}
// // //       <header className="dashboard-header fixed-header">
// // //         <div className="header-content">
// // //           <div className="header-left">
// // //             <button className="back-btn" onClick={handleBackToDashboard}>
// // //               ← Back to Dashboard
// // //             </button>
// // //             <h1 className="logo">Vision Assist</h1>
// // //           </div>
// // //           <div className="header-center">
// // //             {spokenText && (
// // //               <div className="spoken-text-display">
// // //                 <span className="spoken-label">🎤 Heard:</span> <strong>{spokenText}</strong>
// // //               </div>
// // //             )}
// // //           </div>
// // //           <div className="user-menu">
// // //             <button className="logout-btn" onClick={handleLogout}>
// // //               Logout
// // //             </button>
// // //           </div>
// // //         </div>
// // //       </header>

// // //       <div className="weather-content">
// // //         <div className="weather-header">
// // //           <h2>🌤️ Weather Reader</h2>
// // //           <p>Get real-time weather updates with voice feedback</p>
// // //           <div className="voice-status-indicator">
// // //             <span className={`voice-status ${voiceService.isListening ? 'active' : 'inactive'}`}>
// // //               {voiceService.isListening ? '🎤 Voice Active' : '🔇 Voice Inactive'}
// // //             </span>
// // //             <p className="voice-hint">Try saying: "check weather", "temperature", or "humidity"</p>
// // //           </div>
// // //         </div>

// // //         {/* Status Message */}
// // //         {status && (
// // //           <div className="status-message">
// // //             {status}
// // //             {weatherData?.isDemo && (
// // //               <div className="demo-notice-badge">
// // //                 🔄 Using Demo Data
// // //               </div>
// // //             )}
// // //           </div>
// // //         )}

// // //         {/* Voice Commands Quick Guide */}
// // //         <div className="voice-commands-guide">
// // //           <h4>🎤 Quick Voice Commands:</h4>
// // //           <div className="commands-grid">
// // //             <div className="command-category">
// // //               <h5>Basic Weather</h5>
// // //               <p>"check weather"</p>
// // //               <p>"what's the weather"</p>
// // //               <p>"current weather"</p>
// // //             </div>
// // //             <div className="command-category">
// // //               <h5>Details</h5>
// // //               <p>"temperature"</p>
// // //               <p>"humidity"</p>
// // //               <p>"wind speed"</p>
// // //             </div>
// // //             <div className="command-category">
// // //               <h5>Control</h5>
// // //               <p>"stop reading"</p>
// // //               <p>"refresh weather"</p>
// // //               <p>"change location to [city]"</p>
// // //             </div>
// // //             <div className="command-category">
// // //               <h5>Navigation</h5>
// // //               <p>"go to dashboard"</p>
// // //               <p>"help"</p>
// // //               <p>"list commands"</p>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {/* Controls */}
// // //         <div className="weather-controls">
// // //           <button 
// // //             className="control-btn refresh-btn"
// // //             onClick={refreshWeather}
// // //             disabled={loading}
// // //           >
// // //             🔄 {loading ? "Loading..." : "Refresh Weather"}
// // //           </button>
          
// // //           <button 
// // //             className="control-btn unit-btn"
// // //             onClick={toggleUnit}
// // //             disabled={loading}
// // //           >
// // //             🌡️ Switch to {unit === "metric" ? "Fahrenheit" : "Celsius"}
// // //           </button>
          
// // //           <button 
// // //             className="control-btn voice-btn"
// // //             onClick={readWeatherAloud}
// // //             disabled={!weatherData || loading}
// // //           >
// // //             🎤 Read Weather Aloud
// // //           </button>
          
// // //           <button 
// // //             className="control-btn stop-btn"
// // //             onClick={stopSpeaking}
// // //             disabled={!isSpeaking}
// // //           >
// // //             ⏹️ Stop Speaking
// // //           </button>
// // //         </div>

// // //         {/* Weather Display */}
// // //         {weatherData && (
// // //           <div className="weather-display">
// // //             <div className="current-weather-card">
// // //               <div className="weather-main">
// // //                 <div className="weather-icon">
// // //                   {getWeatherIcon(weatherData.icon, weatherData.description)}
// // //                   {weatherData.isDemo && <span className="demo-indicator">DEMO</span>}
// // //                 </div>
// // //                 <div className="weather-primary">
// // //                   <h3>{getTemperature(weatherData.temperature)}</h3>
// // //                   <p className="weather-description">{weatherData.description}</p>
// // //                   <p className="weather-location">📍 {weatherData.location}</p>
// // //                   <p className="weather-feels-like">
// // //                     Feels like {getTemperature(weatherData.feels_like)}
// // //                   </p>
// // //                 </div>
// // //               </div>

// // //               <div className="weather-details-grid">
// // //                 <div className="weather-detail">
// // //                   <span className="detail-label">Min / Max</span>
// // //                   <span className="detail-value">
// // //                     {getTemperature(weatherData.temp_min)} / {getTemperature(weatherData.temp_max)}
// // //                   </span>
// // //                 </div>
                
// // //                 <div className="weather-detail">
// // //                   <span className="detail-label">Humidity</span>
// // //                   <span className="detail-value">{weatherData.humidity}%</span>
// // //                 </div>
                
// // //                 <div className="weather-detail">
// // //                   <span className="detail-label">Wind Speed</span>
// // //                   <span className="detail-value">{weatherData.wind_speed} m/s</span>
// // //                 </div>
                
// // //                 <div className="weather-detail">
// // //                   <span className="detail-label">Pressure</span>
// // //                   <span className="detail-value">{weatherData.pressure} hPa</span>
// // //                 </div>
                
// // //                 <div className="weather-detail">
// // //                   <span className="detail-label">Visibility</span>
// // //                   <span className="detail-value">{weatherData.visibility} km</span>
// // //                 </div>
                
// // //                 <div className="weather-detail">
// // //                   <span className="detail-label">Sunrise</span>
// // //                   <span className="detail-value">{weatherData.sunrise}</span>
// // //                 </div>
                
// // //                 <div className="weather-detail">
// // //                   <span className="detail-label">Sunset</span>
// // //                   <span className="detail-value">{weatherData.sunset}</span>
// // //                 </div>
// // //               </div>
// // //             </div>

// // //             {/* Weather Tips */}
// // //             {weatherTips.length > 0 && (
// // //               <div className="weather-tips">
// // //                 <h4>🌦️ Weather Tips</h4>
// // //                 <div className="tips-grid">
// // //                   {weatherTips.map((tip, index) => (
// // //                     <div key={index} className="tip-card">
// // //                       <span className="tip-icon">{tip.split(' ')[0]}</span>
// // //                       <p>{tip}</p>
// // //                     </div>
// // //                   ))}
// // //                 </div>
// // //               </div>
// // //             )}
// // //           </div>
// // //         )}

// // //         {/* Loading State */}
// // //         {loading && (
// // //           <div className="loading-state">
// // //             <div className="loading-spinner"></div>
// // //             <p>Getting your weather information...</p>
// // //           </div>
// // //         )}

// // //         {/* Location Change Input */}
// // //         <div className="location-change">
// // //           <h4>📍 Change Location</h4>
// // //           <p>Say: "change location to [city name]" or enter manually:</p>
// // //           <div className="location-input-group">
// // //             <input
// // //               type="text"
// // //               placeholder="Enter city name (e.g., London, Tokyo)"
// // //               value={customLocation}
// // //               onChange={(e) => setCustomLocation(e.target.value)}
// // //               className="location-input"
// // //             />
// // //             <button 
// // //               className="location-change-btn"
// // //               onClick={() => changeLocation(customLocation)}
// // //               disabled={!customLocation.trim()}
// // //             >
// // //               Change Location
// // //             </button>
// // //           </div>
// // //           <p className="voice-example">
// // //             🎤 Voice example: "change location to Paris" or "weather in Tokyo"
// // //           </p>
// // //         </div>
// // //       </div>

// // //       {/* Status Bar */}
// // //       <div className="status-bar">
// // //         <p>{status}</p>
// // //         {spokenText && (
// // //           <p className="spoken-text">
// // //             🎤 Heard: <strong>{spokenText}</strong>
// // //           </p>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default WeatherReader;




// // import React, { useState, useEffect, useCallback, useRef } from "react";
// // import { useNavigate } from "react-router-dom";
// // import axios from "axios";
// // import { voiceService } from "../../services/voiceService";
// // import { createWeatherVoiceCommands } from "../../voice-commands/weatherVoiceCommands";
// // import "./WeatherReader.css";

// // const WeatherReader = () => {
// //   const [weatherData, setWeatherData] = useState(null);
// //   const [loading, setLoading] = useState(false);
// //   const [status, setStatus] = useState("Getting your location...");
// //   const [location, setLocation] = useState(null);
// //   const [unit, setUnit] = useState("metric");
// //   const [spokenText, setSpokenText] = useState("");
// //   const [customLocation, setCustomLocation] = useState("");
// //   const [isSpeaking, setIsSpeaking] = useState(false);
// //   const navigate = useNavigate();

// //   const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather";
// //   const API_KEYS = ["1706db1dfb8e3a753fc26b39abf11a49", "demo_key"];

// //   // Actions reference to avoid dependency issues
// //   const actionsRef = useRef({});

// //   // Speak function
// //   const speak = useCallback((text) => {
// //     return new Promise((resolve) => {
// //       const synth = window.speechSynthesis;
// //       if (!synth) {
// //         resolve();
// //         return;
// //       }
      
// //       synth.cancel();
// //       setIsSpeaking(true);
      
// //       const utter = new SpeechSynthesisUtterance(text);
// //       utter.rate = 0.8;
// //       utter.pitch = 1;
// //       utter.volume = 1;
      
// //       utter.onstart = () => {
// //         console.log("Started speaking:", text.substring(0, 50) + "...");
// //       };
      
// //       utter.onend = () => {
// //         console.log("Finished speaking");
// //         setIsSpeaking(false);
// //         resolve();
// //       };
      
// //       utter.onerror = (err) => {
// //         if (err.error !== 'interrupted') {
// //           console.error("Speech error:", err);
// //         }
// //         setIsSpeaking(false);
// //         resolve();
// //       };
      
// //       synth.speak(utter);
// //     });
// //   }, []);

// //   // Stop speaking function
// //   const stopSpeaking = useCallback(() => {
// //     const synth = window.speechSynthesis;
// //     if (synth) {
// //       synth.cancel();
// //       setIsSpeaking(false);
// //     }
// //   }, []);

// //   // Pause/resume speaking
// //   const pauseSpeaking = useCallback(() => {
// //     const synth = window.speechSynthesis;
// //     if (synth && synth.speaking) {
// //       synth.pause();
// //     }
// //   }, []);

// //   const resumeSpeaking = useCallback(() => {
// //     const synth = window.speechSynthesis;
// //     if (synth && synth.paused) {
// //       synth.resume();
// //     }
// //   }, []);

// //   // Get temperature in current unit
// //   const getTemperature = useCallback((temp) => {
// //     if (unit === "metric") {
// //       return `${temp}°C`;
// //     } else {
// //       return `${Math.round((temp * 9/5) + 32)}°F`;
// //     }
// //   }, [unit]);

// //   // Generate weather speech description
// //   const getWeatherDescription = useCallback(() => {
// //     if (!weatherData) return "No weather data available. Please refresh to get current weather.";
    
// //     const temp = getTemperature(weatherData.temperature);
// //     const feelsLike = getTemperature(weatherData.feels_like);
// //     const demoText = weatherData.isDemo ? "This is demo data. " : "";
    
// //     return `${demoText}Current weather in ${weatherData.location} is ${weatherData.description}. ` +
// //            `Temperature is ${temp}, feels like ${feelsLike}. ` +
// //            `Humidity is ${weatherData.humidity} percent. ` +
// //            `Wind speed is ${weatherData.wind_speed} meters per second. ` +
// //            `Visibility is ${weatherData.visibility} kilometers. ` +
// //            `Sunrise at ${weatherData.sunrise}, sunset at ${weatherData.sunset}.`;
// //   }, [weatherData, getTemperature]);

// //   // Get specific weather detail
// //   const getWeatherDetail = useCallback((detail) => {
// //     if (!weatherData) return "No weather data available.";
    
// //     switch(detail) {
// //       case 'temperature':
// //         return `Temperature is ${getTemperature(weatherData.temperature)}`;
// //       case 'humidity':
// //         return `Humidity is ${weatherData.humidity} percent`;
// //       case 'wind speed':
// //         return `Wind speed is ${weatherData.wind_speed} meters per second`;
// //       case 'condition':
// //         return `Weather condition is ${weatherData.description}`;
// //       case 'sunrise':
// //         return `Sunrise at ${weatherData.sunrise}`;
// //       case 'sunset':
// //         return `Sunset at ${weatherData.sunrise}`;
// //       case 'feels like':
// //         return `Feels like ${getTemperature(weatherData.feels_like)}`;
// //       case 'visibility':
// //         return `Visibility is ${weatherData.visibility} kilometers`;
// //       case 'pressure':
// //         return `Atmospheric pressure is ${weatherData.pressure} hectopascals`;
// //       default:
// //         return getWeatherDescription();
// //     }
// //   }, [weatherData, getWeatherDescription, getTemperature]);

// //   // Read weather aloud
// //   const readWeatherAloud = useCallback(async () => {
// //     const description = getWeatherDescription();
// //     await speak(description);
// //   }, [getWeatherDescription, speak]);

// //   // Fetch weather data
// //   const fetchWeatherData = useCallback(async (lat, lon, cityName = null) => {
// //     setLoading(true);
// //     setStatus(cityName ? `Fetching weather for ${cityName}...` : "Fetching weather...");
    
// //     try {
// //       let response;
// //       if (cityName) {
// //         response = await axios.get(
// //           `${WEATHER_API_URL}?q=${cityName}&units=${unit}&appid=${API_KEYS[0]}`
// //         );
// //       } else {
// //         response = await axios.get(
// //           `${WEATHER_API_URL}?lat=${lat}&lon=${lon}&units=${unit}&appid=${API_KEYS[0]}`
// //         );
// //       }
      
// //       const data = response.data;
// //       const formattedData = formatWeatherData(data);
// //       setWeatherData(formattedData);
// //       setStatus(`Weather data loaded for ${formattedData.location}`);
// //       setLoading(false);
// //       return formattedData;
      
// //     } catch (error) {
// //       console.log("OpenWeatherMap failed, using demo data...");
      
// //       const demoData = getDemoWeatherData(cityName);
// //       setWeatherData(demoData);
// //       setStatus(`Demo weather data loaded for ${demoData.location}`);
// //       setLoading(false);
// //       return demoData;
// //     }
// //   }, [unit]);

// //   // Format weather data
// //   const formatWeatherData = (data) => {
// //     return {
// //       location: `${data.name}, ${data.sys?.country || ''}`,
// //       temperature: Math.round(data.main.temp),
// //       feels_like: Math.round(data.main.feels_like),
// //       humidity: data.main.humidity,
// //       wind_speed: data.wind.speed,
// //       description: data.weather[0].description,
// //       icon: data.weather[0].icon,
// //       pressure: data.main.pressure,
// //       visibility: (data.visibility / 1000).toFixed(1),
// //       sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString('en-US', {
// //         hour: '2-digit',
// //         minute: '2-digit',
// //         hour12: true
// //       }),
// //       sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString('en-US', {
// //         hour: '2-digit',
// //         minute: '2-digit',
// //         hour12: true
// //       }),
// //       temp_min: Math.round(data.main.temp_min),
// //       temp_max: Math.round(data.main.temp_max),
// //       isDemo: false
// //     };
// //   };

// //   // Generate demo weather data
// //   const getDemoWeatherData = (cityName = null) => {
// //     const cities = [
// //       { name: "New York, US", temp: 22 },
// //       { name: "London, UK", temp: 15 },
// //       { name: "Tokyo, JP", temp: 18 },
// //       { name: "Sydney, AU", temp: 25 },
// //       { name: "Mumbai, IN", temp: 30 }
// //     ];
    
// //     const randomCity = cityName ? 
// //       { name: cityName, temp: 22 } : 
// //       cities[Math.floor(Math.random() * cities.length)];
    
// //     const conditions = ["clear sky", "few clouds", "scattered clouds", "broken clouds", "light rain"];
// //     const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
    
// //     return {
// //       location: randomCity.name,
// //       temperature: randomCity.temp,
// //       feels_like: randomCity.temp + 2,
// //       humidity: Math.floor(Math.random() * 40) + 50,
// //       wind_speed: (Math.random() * 10).toFixed(1),
// //       description: randomCondition,
// //       icon: "02d",
// //       pressure: 1013,
// //       visibility: (Math.random() * 5 + 5).toFixed(1),
// //       sunrise: "06:45 AM",
// //       sunset: "07:30 PM",
// //       temp_min: randomCity.temp - 3,
// //       temp_max: randomCity.temp + 3,
// //       isDemo: true
// //     };
// //   };

// //   // Get user's location
// //   const getLocation = useCallback(() => {
// //     setLoading(true);
// //     setStatus("Detecting your location...");
// //     speak("Detecting your location");

// //     if (navigator.geolocation) {
// //       navigator.geolocation.getCurrentPosition(
// //         async (position) => {
// //           const { latitude, longitude } = position.coords;
// //           setLocation({ latitude, longitude });
// //           setStatus("Location detected! Fetching weather...");
// //           await speak("Location detected. Getting weather information");
// //           await fetchWeatherData(latitude, longitude);
// //         },
// //         (error) => {
// //           console.error("Error getting location:", error);
// //           handleLocationError(error);
// //         },
// //         {
// //           enableHighAccuracy: true,
// //           timeout: 15000,
// //           maximumAge: 60000
// //         }
// //       );
// //     } else {
// //       setStatus("Geolocation not supported by your browser.");
// //       speak("Location services not available in your browser.");
// //       setLoading(false);
// //     }
// //   }, [speak, fetchWeatherData]);

// //   // Handle location errors
// //   const handleLocationError = useCallback((error) => {
// //     let errorMessage = "Could not get your location. ";
    
// //     switch(error.code) {
// //       case error.PERMISSION_DENIED:
// //         errorMessage += "Please allow location access to get weather data.";
// //         break;
// //       case error.POSITION_UNAVAILABLE:
// //         errorMessage += "Location information is unavailable.";
// //         break;
// //       case error.TIMEOUT:
// //         errorMessage += "Location request timed out.";
// //         break;
// //       default:
// //         errorMessage += "An unknown error occurred.";
// //         break;
// //     }
    
// //     setStatus(errorMessage);
// //     speak("Location access denied. Using demo weather data for New York.");
    
// //     const demoData = getDemoWeatherData();
// //     setWeatherData(demoData);
// //     setLoading(false);
// //   }, [speak]);

// //   // Change temperature unit
// //   const toggleUnit = useCallback(async () => {
// //     const newUnit = unit === "metric" ? "imperial" : "metric";
// //     setUnit(newUnit);
// //     const unitName = newUnit === "metric" ? "Celsius" : "Fahrenheit";
// //     setStatus(`Switched to ${unitName}`);
// //     await speak(`Temperature unit changed to ${unitName}`);
    
// //     if (location && weatherData && !weatherData.isDemo) {
// //       await fetchWeatherData(location.latitude, location.longitude);
// //     }
// //   }, [unit, location, weatherData, speak, fetchWeatherData]);

// //   // Change location
// //   const changeLocation = useCallback(async (cityName) => {
// //     if (!cityName || cityName.trim() === "") {
// //       await speak("Please specify a city name. For example: change location to London");
// //       return;
// //     }
    
// //     setCustomLocation(cityName);
// //     setStatus(`Changing location to ${cityName}...`);
// //     await speak(`Changing location to ${cityName}`);
// //     await fetchWeatherData(null, null, cityName);
// //   }, [speak, fetchWeatherData]);

// //   // Refresh weather
// //   const refreshWeather = useCallback(async () => {
// //     if (customLocation) {
// //       await fetchWeatherData(null, null, customLocation);
// //     } else if (location) {
// //       await fetchWeatherData(location.latitude, location.longitude);
// //     } else {
// //       getLocation();
// //     }
// //     await speak("Weather refreshed");
// //   }, [customLocation, location, fetchWeatherData, getLocation, speak]);

// //   // Update actions ref
// //   useEffect(() => {
// //     actionsRef.current = {
// //       fetchWeather: fetchWeatherData,
// //       getWeatherDescription,
// //       getWeatherDetail,
// //       changeLocation,
// //       refreshWeather,
// //       readWeatherAloud,
// //       toggleUnit,
// //       stopSpeaking,
// //       pauseSpeaking,
// //       resumeSpeaking,
// //       navigate,
// //       handleLogout,
// //       speak,
// //       getTemperature
// //     };
// //   }, [
// //     fetchWeatherData,
// //     getWeatherDescription,
// //     getWeatherDetail,
// //     changeLocation,
// //     refreshWeather,
// //     readWeatherAloud,
// //     toggleUnit,
// //     stopSpeaking,
// //     pauseSpeaking,
// //     resumeSpeaking,
// //     navigate,
// //     // handleLogout,
// //     speak,
// //     getTemperature
// //   ]);

// //   // Voice command registration
// //   const registerVoiceCommands = useCallback(() => {
// //     if (!voiceService.isAvailable()) return;
    
// //     console.log("Registering Weather Reader voice commands...");
// //     voiceService.clearCommands();
// //     voiceService.setFeature('weather-reader', (transcript) => {
// //       console.log("Weather voice input:", transcript);
// //       setSpokenText(transcript);
// //     });
    
// //     // Create weather commands using the separate file
// //     const weatherCommands = createWeatherVoiceCommands(weatherData, actionsRef.current, unit);
    
// //     // Register all commands
// //     Object.entries(weatherCommands).forEach(([command, handler]) => {
// //       voiceService.registerCommand(command, handler);
// //     });
    
// //     // Register dynamic handlers for location changes
// //     voiceService.registerDynamicHandler(
// //       /^(?:change location to|weather in|location to|forecast for|get weather for)\s+(.+)$/i,
// //       async (matches, transcript) => {
// //         console.log("Dynamic handler matched for location change:", transcript);
        
// //         if (matches && matches[0]) {
// //           const cityName = matches[0].trim();
// //           console.log("Extracted city:", cityName);
// //           await speak(`Changing location to ${cityName}`);
// //           await changeLocation(cityName);
// //         }
// //       }
// //     );
    
// //     // Register handler for reading temperature values like "25°C"
// //     voiceService.registerDynamicHandler(
// //       /^(\d+)\s*(?:degrees?)?\s*(?:celsius|fahrenheit|°c|°f)?$/i,
// //       async (matches, transcript) => {
// //         if (matches && matches[0] && weatherData) {
// //           const number = parseInt(matches[0]);
// //           const currentTemp = weatherData.temperature;
// //           if (Math.abs(number - currentTemp) <= 2) { // If number is close to current temp
// //             await speak(`Yes, temperature is ${getTemperature(currentTemp)}`);
// //           }
// //         }
// //       }
// //     );
    
// //     // Start listening
// //     if (!voiceService.isListening) {
// //       voiceService.startListening();
// //     }
    
// //     console.log("✅ Weather Reader voice commands initialized");
    
// //     // Return cleanup function
// //     return () => {
// //       console.log("Cleaning up Weather Reader voice commands");
// //       voiceService.stopListening();
// //     };
// //   }, [weatherData, unit, changeLocation, getTemperature]);

// //   // Initialize voice commands
// //   useEffect(() => {
// //     const cleanup = registerVoiceCommands();
// //     return cleanup;
// //   }, [registerVoiceCommands]);

// //   // Get location on mount
// //   useEffect(() => {
// //     getLocation();
// //   }, [getLocation]);

// //   // Logout function
// //   const handleLogout = useCallback(async () => {
// //     setStatus("Logging out...");
// //     await speak("Logging out...");

// //     try {
// //       const token = localStorage.getItem("token");
// //       if (token) {
// //         await axios.post(
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
// //       console.error("Logout backend error:", error.response?.data || error.message);
// //     } finally {
// //       localStorage.clear();
// //       setTimeout(() => navigate("/"), 1500);
// //     }
// //   }, [navigate, speak]);

// //   const handleBackToDashboard = () => {
// //     navigate("/dashboard");
// //   };

// //   // Get weather icon
// //   const getWeatherIcon = (iconCode, description) => {
// //     const iconMap = {
// //       "01d": "☀️", "01n": "🌙",
// //       "02d": "⛅", "02n": "☁️",
// //       "03d": "☁️", "03n": "☁️",
// //       "04d": "☁️", "04n": "☁️",
// //       "09d": "🌧️", "09n": "🌧️",
// //       "10d": "🌦️", "10n": "🌧️",
// //       "11d": "⛈️", "11n": "⛈️",
// //       "13d": "❄️", "13n": "❄️",
// //       "50d": "🌫️", "50n": "🌫️"
// //     };
    
// //     if (!iconCode && description) {
// //       if (description.includes("clear")) return "☀️";
// //       if (description.includes("cloud")) return "☁️";
// //       if (description.includes("rain")) return "🌧️";
// //       if (description.includes("snow")) return "❄️";
// //       if (description.includes("storm")) return "⛈️";
// //     }
    
// //     return iconMap[iconCode] || "🌈";
// //   };

// //   // Get weather tips
// //   const getWeatherTips = useCallback(() => {
// //     if (!weatherData) return [];
    
// //     const tips = [];
// //     const temp = weatherData.temperature;
// //     const description = weatherData.description.toLowerCase();
    
// //     if (unit === "metric") {
// //       if (temp < 5) tips.push("🥶 It's very cold! Wear warm layers and a jacket.");
// //       else if (temp < 15) tips.push("🧥 Cool weather. A light jacket would be comfortable.");
// //       else if (temp < 25) tips.push("😊 Pleasant temperature. Light clothing is perfect.");
// //       else if (temp < 32) tips.push("🥵 Warm weather. Stay hydrated and wear light clothes.");
// //       else tips.push("🔥 Very hot! Stay in shade and drink plenty of water.");
// //     } else {
// //       const tempF = Math.round((temp * 9/5) + 32);
// //       if (tempF < 41) tips.push("🥶 It's very cold! Wear warm layers and a jacket.");
// //       else if (tempF < 59) tips.push("🧥 Cool weather. A light jacket would be comfortable.");
// //       else if (tempF < 77) tips.push("😊 Pleasant temperature. Light clothing is perfect.");
// //       else if (tempF < 90) tips.push("🥵 Warm weather. Stay hydrated and wear light clothes.");
// //       else tips.push("🔥 Very hot! Stay in shade and drink plenty of water.");
// //     }
    
// //     if (description.includes("rain") || description.includes("drizzle")) {
// //       tips.push("🌧️ Don't forget your umbrella! It's raining outside.");
// //     }
// //     if (description.includes("snow")) {
// //       tips.push("❄️ Snowy conditions. Drive carefully and dress warmly.");
// //     }
// //     if (description.includes("thunderstorm")) {
// //       tips.push("⛈️ Thunderstorm alert! Stay indoors if possible.");
// //     }
// //     if (description.includes("clear")) {
// //       tips.push("☀️ Perfect day for outdoor activities!");
// //     }
// //     if (weatherData.wind_speed > 8) {
// //       tips.push("💨 Windy conditions. Secure loose objects outdoors.");
// //     }
// //     if (weatherData.humidity > 80) {
// //       tips.push("💦 High humidity. It might feel warmer than actual temperature.");
// //     }
    
// //     return tips.slice(0, 3);
// //   }, [weatherData, unit]);

// //   const weatherTips = getWeatherTips();

// //   return (
// //     <div className="weather-reader-container">
// //       {/* Fixed Header */}
// //       <header className="dashboard-header fixed-header">
// //         <div className="header-content">
// //           <div className="header-left">
// //             <button className="back-btn" onClick={handleBackToDashboard}>
// //               ← Back to Dashboard
// //             </button>
// //             <h1 className="logo">Vision Assist</h1>
// //           </div>
// //           <div className="header-center">
// //             {spokenText && (
// //               <div className="spoken-text-display">
// //                 <span className="spoken-label">🎤 Heard:</span> <strong>{spokenText}</strong>
// //               </div>
// //             )}
// //           </div>
// //           <div className="user-menu">
// //             <button className="logout-btn" onClick={handleLogout}>
// //               Logout
// //             </button>
// //           </div>
// //         </div>
// //       </header>

// //       <div className="weather-content">
// //         <div className="weather-header">
// //           <h2>🌤️ Weather Reader</h2>
// //           <p>Get real-time weather updates with voice feedback</p>
// //           <div className="voice-status-indicator">
// //             <span className={`voice-status ${voiceService.isListening ? 'active' : 'inactive'}`}>
// //               {voiceService.isListening ? '🎤 Voice Active' : '🔇 Voice Inactive'}
// //             </span>
// //             <p className="voice-hint">Try saying: "temperature", "humidity", or "sunrise"</p>
// //           </div>
// //         </div>

// //         {/* Status Message */}
// //         {status && (
// //           <div className="status-message">
// //             {status}
// //             {weatherData?.isDemo && (
// //               <div className="demo-notice-badge">
// //                 🔄 Using Demo Data
// //               </div>
// //             )}
// //           </div>
// //         )}

// //         {/* Voice Commands Quick Guide */}
// //         <div className="voice-commands-guide">
// //           <h4>🎤 Voice Commands:</h4>
// //           <div className="commands-grid">
// //             <div className="command-category">
// //               <h5>Basic</h5>
// //               <p>"temperature"</p>
// //               <p>"25°C" (read temp)</p>
// //               <p>"haze" (condition)</p>
// //             </div>
// //             <div className="command-category">
// //               <h5>Details</h5>
// //               <p>"humidity"</p>
// //               <p>"wind speed"</p>
// //               <p>"pressure"</p>
// //             </div>
// //             <div className="command-category">
// //               <h5>Location</h5>
// //               <p>"location"</p>
// //               <p>"change location to..."</p>
// //               <p>"where am I"</p>
// //             </div>
// //             <div className="command-category">
// //               <h5>Control</h5>
// //               <p>"refresh"</p>
// //               <p>"help"</p>
// //               <p>"stop reading"</p>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Controls */}
// //         <div className="weather-controls">
// //           <button 
// //             className="control-btn refresh-btn"
// //             onClick={refreshWeather}
// //             disabled={loading}
// //           >
// //             🔄 {loading ? "Loading..." : "Refresh Weather"}
// //           </button>
          
// //           <button 
// //             className="control-btn unit-btn"
// //             onClick={toggleUnit}
// //             disabled={loading}
// //           >
// //             🌡️ Switch to {unit === "metric" ? "Fahrenheit" : "Celsius"}
// //           </button>
          
// //           <button 
// //             className="control-btn voice-btn"
// //             onClick={readWeatherAloud}
// //             disabled={!weatherData || loading}
// //           >
// //             🎤 Read Weather Aloud
// //           </button>
          
// //           <button 
// //             className="control-btn stop-btn"
// //             onClick={stopSpeaking}
// //             disabled={!isSpeaking}
// //           >
// //             ⏹️ Stop Speaking
// //           </button>
// //         </div>

// //         {/* Weather Display */}
// //         {weatherData && (
// //           <div className="weather-display">
// //             <div className="current-weather-card">
// //               <div className="weather-main">
// //                 <div className="weather-icon">
// //                   {getWeatherIcon(weatherData.icon, weatherData.description)}
// //                   {weatherData.isDemo && <span className="demo-indicator">DEMO</span>}
// //                 </div>
// //                 <div className="weather-primary">
// //                   <h3>{getTemperature(weatherData.temperature)}</h3>
// //                   <p className="weather-description">{weatherData.description}</p>
// //                   <p className="weather-location">📍 {weatherData.location}</p>
// //                   <p className="weather-feels-like">
// //                     Feels like {getTemperature(weatherData.feels_like)}
// //                   </p>
// //                 </div>
// //               </div>

// //               <div className="weather-details-grid">
// //                 <div className="weather-detail">
// //                   <span className="detail-label">Min / Max</span>
// //                   <span className="detail-value">
// //                     {getTemperature(weatherData.temp_min)} / {getTemperature(weatherData.temp_max)}
// //                   </span>
// //                 </div>
                
// //                 <div className="weather-detail">
// //                   <span className="detail-label">Humidity</span>
// //                   <span className="detail-value">{weatherData.humidity}%</span>
// //                 </div>
                
// //                 <div className="weather-detail">
// //                   <span className="detail-label">Wind Speed</span>
// //                   <span className="detail-value">{weatherData.wind_speed} m/s</span>
// //                 </div>
                
// //                 <div className="weather-detail">
// //                   <span className="detail-label">Pressure</span>
// //                   <span className="detail-value">{weatherData.pressure} hPa</span>
// //                 </div>
                
// //                 <div className="weather-detail">
// //                   <span className="detail-label">Visibility</span>
// //                   <span className="detail-value">{weatherData.visibility} km</span>
// //                 </div>
                
// //                 <div className="weather-detail">
// //                   <span className="detail-label">Sunrise</span>
// //                   <span className="detail-value">{weatherData.sunrise}</span>
// //                 </div>
                
// //                 <div className="weather-detail">
// //                   <span className="detail-label">Sunset</span>
// //                   <span className="detail-value">{weatherData.sunset}</span>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Weather Tips */}
// //             {weatherTips.length > 0 && (
// //               <div className="weather-tips">
// //                 <h4>🌦️ Weather Tips</h4>
// //                 <div className="tips-grid">
// //                   {weatherTips.map((tip, index) => (
// //                     <div key={index} className="tip-card">
// //                       <span className="tip-icon">{tip.split(' ')[0]}</span>
// //                       <p>{tip}</p>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>
// //             )}
// //           </div>
// //         )}

// //         {/* Loading State */}
// //         {loading && (
// //           <div className="loading-state">
// //             <div className="loading-spinner"></div>
// //             <p>Getting your weather information...</p>
// //           </div>
// //         )}

// //         {/* Location Change Input */}
// //         <div className="location-change">
// //           <h4>📍 Change Location</h4>
// //           <p>Say: "change location to [city name]" or enter manually:</p>
// //           <div className="location-input-group">
// //             <input
// //               type="text"
// //               placeholder="Enter city name (e.g., London, Tokyo)"
// //               value={customLocation}
// //               onChange={(e) => setCustomLocation(e.target.value)}
// //               className="location-input"
// //             />
// //             <button 
// //               className="location-change-btn"
// //               onClick={() => changeLocation(customLocation)}
// //               disabled={!customLocation.trim()}
// //             >
// //               Change Location
// //             </button>
// //           </div>
// //           <p className="voice-example">
// //             🎤 Voice examples: 
// //             "change location to Paris", 
// //             "weather in Tokyo", 
// //             "forecast for London"
// //           </p>
// //         </div>
// //       </div>

// //       {/* Status Bar */}
// //       <div className="status-bar">
// //         <p>{status}</p>
// //         {spokenText && (
// //           <p className="spoken-text">
// //             🎤 Heard: <strong>{spokenText}</strong>
// //           </p>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default WeatherReader;


// import React, { useState, useEffect, useCallback, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { voiceService } from "../../services/voiceService";
// import { createWeatherVoiceCommands } from "../../voice-commands/weatherVoiceCommands";
// import "./WeatherReader.css";

// const WeatherReader = () => {
//   const [weatherData, setWeatherData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [status, setStatus] = useState("Getting your location...");
//   const [location, setLocation] = useState(null);
//   const [unit, setUnit] = useState("metric");
//   const [spokenText, setSpokenText] = useState("");
//   const [customLocation, setCustomLocation] = useState("");
//   const [isSpeaking, setIsSpeaking] = useState(false);
//   const [voiceActive, setVoiceActive] = useState(false);
//   const navigate = useNavigate();

//   const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather";
//   const API_KEYS = ["1706db1dfb8e3a753fc26b39abf11a49", "demo_key"];

//   // Actions reference to avoid dependency issues
//   const actionsRef = useRef({});

//   // Speak function
//   const speak = useCallback((text) => {
//     return new Promise((resolve) => {
//       const synth = window.speechSynthesis;
//       if (!synth) {
//         resolve();
//         return;
//       }
      
//       synth.cancel();
//       setIsSpeaking(true);
      
//       const utter = new SpeechSynthesisUtterance(text);
//       utter.rate = 0.8;
//       utter.pitch = 1;
//       utter.volume = 1;
      
//       utter.onstart = () => {
//         console.log("Started speaking:", text.substring(0, 50) + "...");
//       };
      
//       utter.onend = () => {
//         console.log("Finished speaking");
//         setIsSpeaking(false);
//         resolve();
//       };
      
//       utter.onerror = (err) => {
//         if (err.error !== 'interrupted') {
//           console.error("Speech error:", err);
//         }
//         setIsSpeaking(false);
//         resolve();
//       };
      
//       synth.speak(utter);
//     });
//   }, []);

//   // Stop speaking function
//   const stopSpeaking = useCallback(() => {
//     const synth = window.speechSynthesis;
//     if (synth) {
//       synth.cancel();
//       setIsSpeaking(false);
//     }
//   }, []);

//   // Pause/resume speaking
//   const pauseSpeaking = useCallback(() => {
//     const synth = window.speechSynthesis;
//     if (synth && synth.speaking) {
//       synth.pause();
//     }
//   }, []);

//   const resumeSpeaking = useCallback(() => {
//     const synth = window.speechSynthesis;
//     if (synth && synth.paused) {
//       synth.resume();
//     }
//   }, []);

//   // Get temperature in current unit
//   const getTemperature = useCallback((temp) => {
//     if (unit === "metric") {
//       return `${temp}°C`;
//     } else {
//       return `${Math.round((temp * 9/5) + 32)}°F`;
//     }
//   }, [unit]);

//   // Generate weather speech description
//   const getWeatherDescription = useCallback(() => {
//     if (!weatherData) return "No weather data available. Please refresh to get current weather.";
    
//     const temp = getTemperature(weatherData.temperature);
//     const feelsLike = getTemperature(weatherData.feels_like);
//     const demoText = weatherData.isDemo ? "This is demo data. " : "";
    
//     return `${demoText}Current weather in ${weatherData.location} is ${weatherData.description}. ` +
//            `Temperature is ${temp}, feels like ${feelsLike}. ` +
//            `Humidity is ${weatherData.humidity} percent. ` +
//            `Wind speed is ${weatherData.wind_speed} meters per second. ` +
//            `Visibility is ${weatherData.visibility} kilometers. ` +
//            `Sunrise at ${weatherData.sunrise}, sunset at ${weatherData.sunset}.`;
//   }, [weatherData, getTemperature]);

//   // Get specific weather detail
//   const getWeatherDetail = useCallback((detail) => {
//     if (!weatherData) return "No weather data available.";
    
//     switch(detail) {
//       case 'temperature':
//         return `Temperature is ${getTemperature(weatherData.temperature)}`;
//       case 'humidity':
//         return `Humidity is ${weatherData.humidity} percent`;
//       case 'wind speed':
//         return `Wind speed is ${weatherData.wind_speed} meters per second`;
//       case 'condition':
//         return `Weather condition is ${weatherData.description}`;
//       case 'sunrise':
//         return `Sunrise at ${weatherData.sunrise}`;
//       case 'sunset':
//         return `Sunset at ${weatherData.sunset}`;
//       case 'feels like':
//         return `Feels like ${getTemperature(weatherData.feels_like)}`;
//       case 'visibility':
//         return `Visibility is ${weatherData.visibility} kilometers`;
//       case 'pressure':
//         return `Atmospheric pressure is ${weatherData.pressure} hectopascals`;
//       default:
//         return getWeatherDescription();
//     }
//   }, [weatherData, getWeatherDescription, getTemperature]);

//   // Read weather aloud
//   const readWeatherAloud = useCallback(async () => {
//     const description = getWeatherDescription();
//     await speak(description);
//   }, [getWeatherDescription, speak]);

//   // Fetch weather data
//   const fetchWeatherData = useCallback(async (lat, lon, cityName = null) => {
//     setLoading(true);
//     setStatus(cityName ? `Fetching weather for ${cityName}...` : "Fetching weather...");
    
//     try {
//       let response;
//       if (cityName) {
//         response = await axios.get(
//           `${WEATHER_API_URL}?q=${cityName}&units=${unit}&appid=${API_KEYS[0]}`
//         );
//       } else {
//         response = await axios.get(
//           `${WEATHER_API_URL}?lat=${lat}&lon=${lon}&units=${unit}&appid=${API_KEYS[0]}`
//         );
//       }
      
//       const data = response.data;
//       const formattedData = formatWeatherData(data);
//       setWeatherData(formattedData);
//       setStatus(`Weather data loaded for ${formattedData.location}`);
//       setLoading(false);
//       return formattedData;
      
//     } catch (error) {
//       console.log("OpenWeatherMap failed, using demo data...");
      
//       const demoData = getDemoWeatherData(cityName);
//       setWeatherData(demoData);
//       setStatus(`Demo weather data loaded for ${demoData.location}`);
//       setLoading(false);
//       return demoData;
//     }
//   }, [unit]);

//   // Format weather data
//   const formatWeatherData = (data) => {
//     return {
//       location: `${data.name}, ${data.sys?.country || ''}`,
//       temperature: Math.round(data.main.temp),
//       feels_like: Math.round(data.main.feels_like),
//       humidity: data.main.humidity,
//       wind_speed: data.wind.speed,
//       description: data.weather[0].description,
//       icon: data.weather[0].icon,
//       pressure: data.main.pressure,
//       visibility: (data.visibility / 1000).toFixed(1),
//       sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString('en-US', {
//         hour: '2-digit',
//         minute: '2-digit',
//         hour12: true
//       }),
//       sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString('en-US', {
//         hour: '2-digit',
//         minute: '2-digit',
//         hour12: true
//       }),
//       temp_min: Math.round(data.main.temp_min),
//       temp_max: Math.round(data.main.temp_max),
//       isDemo: false
//     };
//   };

//   // Generate demo weather data
//   const getDemoWeatherData = (cityName = null) => {
//     const cities = [
//       { name: "New York, US", temp: 22 },
//       { name: "London, UK", temp: 15 },
//       { name: "Tokyo, JP", temp: 18 },
//       { name: "Sydney, AU", temp: 25 },
//       { name: "Mumbai, IN", temp: 30 }
//     ];
    
//     const randomCity = cityName ? 
//       { name: cityName, temp: 22 } : 
//       cities[Math.floor(Math.random() * cities.length)];
    
//     const conditions = ["clear sky", "few clouds", "scattered clouds", "broken clouds", "light rain"];
//     const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
    
//     return {
//       location: randomCity.name,
//       temperature: randomCity.temp,
//       feels_like: randomCity.temp + 2,
//       humidity: Math.floor(Math.random() * 40) + 50,
//       wind_speed: (Math.random() * 10).toFixed(1),
//       description: randomCondition,
//       icon: "02d",
//       pressure: 1013,
//       visibility: (Math.random() * 5 + 5).toFixed(1),
//       sunrise: "06:45 AM",
//       sunset: "07:30 PM",
//       temp_min: randomCity.temp - 3,
//       temp_max: randomCity.temp + 3,
//       isDemo: true
//     };
//   };

//   // Get user's location
//   const getLocation = useCallback(() => {
//     setLoading(true);
//     setStatus("Detecting your location...");
//     speak("Detecting your location");

//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         async (position) => {
//           const { latitude, longitude } = position.coords;
//           setLocation({ latitude, longitude });
//           setStatus("Location detected! Fetching weather...");
//           await speak("Location detected. Getting weather information");
//           await fetchWeatherData(latitude, longitude);
//         },
//         (error) => {
//           console.error("Error getting location:", error);
//           handleLocationError(error);
//         },
//         {
//           enableHighAccuracy: true,
//           timeout: 15000,
//           maximumAge: 60000
//         }
//       );
//     } else {
//       setStatus("Geolocation not supported by your browser.");
//       speak("Location services not available in your browser.");
//       setLoading(false);
//     }
//   }, [speak, fetchWeatherData]);

//   // Handle location errors
//   const handleLocationError = useCallback((error) => {
//     let errorMessage = "Could not get your location. ";
    
//     switch(error.code) {
//       case error.PERMISSION_DENIED:
//         errorMessage += "Please allow location access to get weather data.";
//         break;
//       case error.POSITION_UNAVAILABLE:
//         errorMessage += "Location information is unavailable.";
//         break;
//       case error.TIMEOUT:
//         errorMessage += "Location request timed out.";
//         break;
//       default:
//         errorMessage += "An unknown error occurred.";
//         break;
//     }
    
//     setStatus(errorMessage);
//     speak("Location access denied. Using demo weather data for New York.");
    
//     const demoData = getDemoWeatherData();
//     setWeatherData(demoData);
//     setLoading(false);
//   }, [speak]);

//   // Change temperature unit
//   const toggleUnit = useCallback(async () => {
//     const newUnit = unit === "metric" ? "imperial" : "metric";
//     setUnit(newUnit);
//     const unitName = newUnit === "metric" ? "Celsius" : "Fahrenheit";
//     setStatus(`Switched to ${unitName}`);
//     await speak(`Temperature unit changed to ${unitName}`);
    
//     if (location && weatherData && !weatherData.isDemo) {
//       await fetchWeatherData(location.latitude, location.longitude);
//     }
//   }, [unit, location, weatherData, speak, fetchWeatherData]);

//   // Change location
//   const changeLocation = useCallback(async (cityName) => {
//     if (!cityName || cityName.trim() === "") {
//       await speak("Please specify a city name. For example: change location to London");
//       return;
//     }
    
//     // Clean up city name
//     const cleanCityName = cityName.trim().replace(/^(the|at|in|for)\s+/i, '');
    
//     if (cleanCityName.length < 2) {
//       await speak("Please say a valid city name.");
//       return;
//     }
    
//     setCustomLocation(cleanCityName);
//     setStatus(`Changing location to ${cleanCityName}...`);
    
//     // Temporarily stop voice while fetching new data
//     const wasListening = voiceService.isListening;
//     if (wasListening) {
//       voiceService.stopListening();
//     }
    
//     await speak(`Changing location to ${cleanCityName}. Getting weather information.`);
    
//     try {
//       await fetchWeatherData(null, null, cleanCityName);
//     } finally {
//       // Restart voice after fetching data
//       if (wasListening) {
//         setTimeout(() => {
//           if (!voiceService.isListening) {
//             voiceService.startListening();
//           }
//         }, 500);
//       }
//     }
//   }, [speak, fetchWeatherData]);

//   // Refresh weather
//   const refreshWeather = useCallback(async () => {
//     if (customLocation) {
//       await fetchWeatherData(null, null, customLocation);
//     } else if (location) {
//       await fetchWeatherData(location.latitude, location.longitude);
//     } else {
//       getLocation();
//     }
//     await speak("Weather refreshed");
//   }, [customLocation, location, fetchWeatherData, getLocation, speak]);

//   // Update actions ref
//   useEffect(() => {
//     actionsRef.current = {
//       fetchWeather: fetchWeatherData,
//       getWeatherDescription,
//       getWeatherDetail,
//       changeLocation,
//       refreshWeather,
//       readWeatherAloud,
//       toggleUnit,
//       stopSpeaking,
//       pauseSpeaking,
//       resumeSpeaking,
//       navigate,
//       // handleLogout,
//       speak,
//       getTemperature
//     };
//   }, [
//     fetchWeatherData,
//     getWeatherDescription,
//     getWeatherDetail,
//     changeLocation,
//     refreshWeather,
//     readWeatherAloud,
//     toggleUnit,
//     stopSpeaking,
//     pauseSpeaking,
//     resumeSpeaking,
//     navigate,
//     // handleLogout,
//     speak,
//     getTemperature
//   ]);

//   // Monitor voice service state
//   useEffect(() => {
//     const checkVoiceState = () => {
//       setVoiceActive(voiceService.isListening);
//     };

//     // Check initially
//     checkVoiceState();

//     // Set up interval to check voice state
//     const intervalId = setInterval(checkVoiceState, 2000);

//     return () => {
//       clearInterval(intervalId);
//     };
//   }, []);

//   // Voice command registration
//   const registerVoiceCommands = useCallback(() => {
//     if (!voiceService.isAvailable()) {
//       console.warn("Voice service not available");
//       return;
//     }
    
//     console.log("Registering Weather Reader voice commands...");
    
//     // Clear previous commands and handlers
//     voiceService.clearCommands();
//     voiceService.clearDynamicHandlers();
    
//     // Set feature with minimal callback
//     voiceService.setFeature('weather-reader', (transcript) => {
//       console.log("Weather voice input:", transcript);
//       setSpokenText(transcript);
//     });
    
//     // Create weather commands using the separate file
//     const weatherCommands = createWeatherVoiceCommands(weatherData, actionsRef.current, unit);
    
//     // Register all commands
//     Object.entries(weatherCommands).forEach(([command, handler]) => {
//       voiceService.registerCommand(command, handler);
//     });
    
//     // FIXED: Better dynamic handlers for location changes
//     // More flexible patterns that match different ways of saying location changes
    
//     // Pattern 1: Flexible location change pattern
//     voiceService.registerDynamicHandler(
//       /(?:change|switch|set|update)\s+(?:location|city|place)\s+(?:to\s+)?(.+)/i,
//       async (matches, transcript) => {
//         console.log("Dynamic handler matched for location change:", transcript);
        
//         if (matches && matches[0]) {
//           const cityName = matches[0].trim();
//           console.log("Extracted city:", cityName);
//           await speak(`Changing location to ${cityName}`);
//           await changeLocation(cityName);
//         }
//       }
//     );
    
//     // Pattern 2: "weather in London" or "forecast for London"
//     voiceService.registerDynamicHandler(
//       /(?:weather|forecast|conditions)\s+(?:in|for|at)\s+(.+)/i,
//       async (matches, transcript) => {
//         console.log("Dynamic handler 2 matched:", transcript);
        
//         if (matches && matches[0]) {
//           const cityName = matches[0].trim();
//           console.log("Extracted city:", cityName);
//           await speak(`Getting weather for ${cityName}`);
//           await changeLocation(cityName);
//         }
//       }
//     );
    
//     // Pattern 3: Simple "London weather" pattern
//     voiceService.registerDynamicHandler(
//       /^(.+?)\s+(?:weather|forecast)$/i,
//       async (matches, transcript) => {
//         console.log("Dynamic handler 3 matched for city name:", transcript);
        
//         if (matches && matches[0]) {
//           const cityName = matches[0].trim();
//           console.log("Extracted city:", cityName);
//           await speak(`Getting weather for ${cityName}`);
//           await changeLocation(cityName);
//         }
//       }
//     );
    
//     // Pattern for temperature values
//     voiceService.registerDynamicHandler(
//       /^(\d+)\s*(?:degrees?)?\s*(?:celsius|fahrenheit|°c|°f)?$/i,
//       async (matches, transcript) => {
//         if (matches && matches[0] && weatherData) {
//           const number = parseInt(matches[0]);
//           const currentTemp = weatherData.temperature;
//           if (Math.abs(number - currentTemp) <= 2) { // If number is close to current temp
//             await speak(`Yes, temperature is ${getTemperature(currentTemp)}`);
//           }
//         }
//       }
//     );
    
//     // Only start listening if not already listening
//     const startVoiceListening = () => {
//       if (!voiceService.isListening && voiceService.shouldBeListening === false) {
//         console.log("Starting voice listening...");
//         voiceService.shouldBeListening = true;
        
//         // Small delay to avoid race conditions
//         setTimeout(() => {
//           if (!voiceService.isListening) {
//             try {
//               voiceService.startListening();
//             } catch (error) {
//               console.warn("Error starting voice listening:", error);
//               // Try again in 1 second
//               setTimeout(() => {
//                 if (!voiceService.isListening) {
//                   voiceService.startListening();
//                 }
//               }, 1000);
//             }
//           }
//         }, 100);
//       } else {
//         console.log("Voice already listening or shouldn't be:", {
//           isListening: voiceService.isListening,
//           shouldBeListening: voiceService.shouldBeListening
//         });
//       }
//     };
    
//     // Start listening after a short delay
//     setTimeout(startVoiceListening, 500);
    
//     console.log("✅ Weather Reader voice commands initialized");
    
//     // Return cleanup function
//     return () => {
//       console.log("Cleaning up Weather Reader voice commands");
//       voiceService.clearCommands();
//       voiceService.clearDynamicHandlers();
//       // Don't stop listening here - let voiceService handle it
//     };
//   }, [weatherData, unit, changeLocation, getTemperature, speak]);

//   // Initialize voice commands
//   useEffect(() => {
//     const cleanup = registerVoiceCommands();
//     return cleanup;
//   }, [registerVoiceCommands]);

//   // Get location on mount
//   useEffect(() => {
//     getLocation();
//   }, [getLocation]);

//   // Logout function
//   const handleLogout = useCallback(async () => {
//     setStatus("Logging out...");
//     await speak("Logging out...");

//     try {
//       const token = localStorage.getItem("token");
//       if (token) {
//         await axios.post(
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
//       console.error("Logout backend error:", error.response?.data || error.message);
//     } finally {
//       localStorage.clear();
//       setTimeout(() => navigate("/"), 1500);
//     }
//   }, [navigate, speak]);

//   // Toggle voice listening
//   const toggleVoiceListening = useCallback(async () => {
//     if (voiceService.isListening) {
//       voiceService.stopListening();
//       await speak("Voice listening stopped");
//     } else {
//       voiceService.startListening();
//       await speak("Voice listening started");
//     }
//     setVoiceActive(voiceService.isListening);
//   }, [speak]);

//   // Test voice recognition
//   const testVoiceRecognition = useCallback(async () => {
//     console.log("Testing voice recognition...");
//     console.log("Is available:", voiceService.isAvailable());
//     console.log("Is listening:", voiceService.isListening);
//     console.log("Should be listening:", voiceService.shouldBeListening);
//     console.log("Current feature:", voiceService.currentFeature);
    
//     await speak("Testing voice recognition. Try saying: change location to London, or temperature");
    
//     // If not listening, try to start
//     if (!voiceService.isListening) {
//       console.log("Voice not listening, attempting to start...");
//       voiceService.startListening();
//     }
//   }, [speak]);

//   const handleBackToDashboard = () => {
//     navigate("/dashboard");
//   };

//   // Get weather icon
//   const getWeatherIcon = (iconCode, description) => {
//     const iconMap = {
//       "01d": "☀️", "01n": "🌙",
//       "02d": "⛅", "02n": "☁️",
//       "03d": "☁️", "03n": "☁️",
//       "04d": "☁️", "04n": "☁️",
//       "09d": "🌧️", "09n": "🌧️",
//       "10d": "🌦️", "10n": "🌧️",
//       "11d": "⛈️", "11n": "⛈️",
//       "13d": "❄️", "13n": "❄️",
//       "50d": "🌫️", "50n": "🌫️"
//     };
    
//     if (!iconCode && description) {
//       if (description.includes("clear")) return "☀️";
//       if (description.includes("cloud")) return "☁️";
//       if (description.includes("rain")) return "🌧️";
//       if (description.includes("snow")) return "❄️";
//       if (description.includes("storm")) return "⛈️";
//     }
    
//     return iconMap[iconCode] || "🌈";
//   };

//   // Get weather tips
//   const getWeatherTips = useCallback(() => {
//     if (!weatherData) return [];
    
//     const tips = [];
//     const temp = weatherData.temperature;
//     const description = weatherData.description.toLowerCase();
    
//     if (unit === "metric") {
//       if (temp < 5) tips.push("🥶 It's very cold! Wear warm layers and a jacket.");
//       else if (temp < 15) tips.push("🧥 Cool weather. A light jacket would be comfortable.");
//       else if (temp < 25) tips.push("😊 Pleasant temperature. Light clothing is perfect.");
//       else if (temp < 32) tips.push("🥵 Warm weather. Stay hydrated and wear light clothes.");
//       else tips.push("🔥 Very hot! Stay in shade and drink plenty of water.");
//     } else {
//       const tempF = Math.round((temp * 9/5) + 32);
//       if (tempF < 41) tips.push("🥶 It's very cold! Wear warm layers and a jacket.");
//       else if (tempF < 59) tips.push("🧥 Cool weather. A light jacket would be comfortable.");
//       else if (tempF < 77) tips.push("😊 Pleasant temperature. Light clothing is perfect.");
//       else if (tempF < 90) tips.push("🥵 Warm weather. Stay hydrated and wear light clothes.");
//       else tips.push("🔥 Very hot! Stay in shade and drink plenty of water.");
//     }
    
//     if (description.includes("rain") || description.includes("drizzle")) {
//       tips.push("🌧️ Don't forget your umbrella! It's raining outside.");
//     }
//     if (description.includes("snow")) {
//       tips.push("❄️ Snowy conditions. Drive carefully and dress warmly.");
//     }
//     if (description.includes("thunderstorm")) {
//       tips.push("⛈️ Thunderstorm alert! Stay indoors if possible.");
//     }
//     if (description.includes("clear")) {
//       tips.push("☀️ Perfect day for outdoor activities!");
//     }
//     if (weatherData.wind_speed > 8) {
//       tips.push("💨 Windy conditions. Secure loose objects outdoors.");
//     }
//     if (weatherData.humidity > 80) {
//       tips.push("💦 High humidity. It might feel warmer than actual temperature.");
//     }
    
//     return tips.slice(0, 3);
//   }, [weatherData, unit]);

//   const weatherTips = getWeatherTips();

//   return (
//     <div className="weather-reader-container">
//       {/* Fixed Header */}
//       <header className="dashboard-header fixed-header">
//         <div className="header-content">
//           <div className="header-left">
//             <button className="back-btn" onClick={handleBackToDashboard}>
//               ← Back to Dashboard
//             </button>
//             <h1 className="logo">Vision Assist</h1>
//           </div>
//           <div className="header-center">
//             {spokenText && (
//               <div className="spoken-text-display">
//                 <span className="spoken-label">🎤 Heard:</span> <strong>{spokenText}</strong>
//               </div>
//             )}
//           </div>
//           <div className="user-menu">
//             <button className="logout-btn" onClick={handleLogout}>
//               Logout
//             </button>
//           </div>
//         </div>
//       </header>

//       <div className="weather-content">
//         <div className="weather-header">
//           <h2>🌤️ Weather Reader</h2>
//           <p>Get real-time weather updates with voice feedback</p>
//           <div className="voice-status-indicator">
//             <span className={`voice-status ${voiceActive ? 'active' : 'inactive'}`}>
//               {voiceActive ? '🎤 Voice Active' : '🔇 Voice Inactive'}
//               <button 
//                 className="voice-toggle-btn"
//                 onClick={toggleVoiceListening}
//               >
//                 {voiceActive ? 'Turn Off' : 'Turn On'}
//               </button>
//             </span>
//             <p className="voice-hint">Try saying: "temperature", "humidity", or "change location to London"</p>
//           </div>
//         </div>

//         {/* Status Message */}
//         {status && (
//           <div className="status-message">
//             {status}
//             {weatherData?.isDemo && (
//               <div className="demo-notice-badge">
//                 🔄 Using Demo Data
//               </div>
//             )}
//           </div>
//         )}

//         {/* Voice Commands Quick Guide */}
//         <div className="voice-commands-guide">
//           <h4>🎤 Voice Commands:</h4>
//           <div className="commands-grid">
//             <div className="command-category">
//               <h5>Basic</h5>
//               <p>"temperature"</p>
//               <p>"25°C" (read temp)</p>
//               <p>"haze" (condition)</p>
//             </div>
//             <div className="command-category">
//               <h5>Details</h5>
//               <p>"humidity"</p>
//               <p>"wind speed"</p>
//               <p>"pressure"</p>
//             </div>
//             <div className="command-category">
//               <h5>Location</h5>
//               <p>"change location to..."</p>
//               <p>"weather in London"</p>
//               <p>"London weather"</p>
//             </div>
//             <div className="command-category">
//               <h5>Control</h5>
//               <button 
//                 className="test-voice-btn"
//                 onClick={testVoiceRecognition}
//               >
//                 🔧 Test Voice
//               </button>
//               <p>"help"</p>
//               <p>"stop reading"</p>
//             </div>
//           </div>
//         </div>

//         {/* Controls */}
//         <div className="weather-controls">
//           <button 
//             className="control-btn refresh-btn"
//             onClick={refreshWeather}
//             disabled={loading}
//           >
//             🔄 {loading ? "Loading..." : "Refresh Weather"}
//           </button>
          
//           <button 
//             className="control-btn unit-btn"
//             onClick={toggleUnit}
//             disabled={loading}
//           >
//             🌡️ Switch to {unit === "metric" ? "Fahrenheit" : "Celsius"}
//           </button>
          
//           <button 
//             className="control-btn voice-btn"
//             onClick={readWeatherAloud}
//             disabled={!weatherData || loading}
//           >
//             🎤 Read Weather Aloud
//           </button>
          
//           <button 
//             className="control-btn stop-btn"
//             onClick={stopSpeaking}
//             disabled={!isSpeaking}
//           >
//             ⏹️ Stop Speaking
//           </button>
//         </div>

//         {/* Weather Display */}
//         {weatherData && (
//           <div className="weather-display">
//             <div className="current-weather-card">
//               <div className="weather-main">
//                 <div className="weather-icon">
//                   {getWeatherIcon(weatherData.icon, weatherData.description)}
//                   {weatherData.isDemo && <span className="demo-indicator">DEMO</span>}
//                 </div>
//                 <div className="weather-primary">
//                   <h3>{getTemperature(weatherData.temperature)}</h3>
//                   <p className="weather-description">{weatherData.description}</p>
//                   <p className="weather-location">📍 {weatherData.location}</p>
//                   <p className="weather-feels-like">
//                     Feels like {getTemperature(weatherData.feels_like)}
//                   </p>
//                 </div>
//               </div>

//               <div className="weather-details-grid">
//                 <div className="weather-detail">
//                   <span className="detail-label">Min / Max</span>
//                   <span className="detail-value">
//                     {getTemperature(weatherData.temp_min)} / {getTemperature(weatherData.temp_max)}
//                   </span>
//                 </div>
                
//                 <div className="weather-detail">
//                   <span className="detail-label">Humidity</span>
//                   <span className="detail-value">{weatherData.humidity}%</span>
//                 </div>
                
//                 <div className="weather-detail">
//                   <span className="detail-label">Wind Speed</span>
//                   <span className="detail-value">{weatherData.wind_speed} m/s</span>
//                 </div>
                
//                 <div className="weather-detail">
//                   <span className="detail-label">Pressure</span>
//                   <span className="detail-value">{weatherData.pressure} hPa</span>
//                 </div>
                
//                 <div className="weather-detail">
//                   <span className="detail-label">Visibility</span>
//                   <span className="detail-value">{weatherData.visibility} km</span>
//                 </div>
                
//                 <div className="weather-detail">
//                   <span className="detail-label">Sunrise</span>
//                   <span className="detail-value">{weatherData.sunrise}</span>
//                 </div>
                
//                 <div className="weather-detail">
//                   <span className="detail-label">Sunset</span>
//                   <span className="detail-value">{weatherData.sunset}</span>
//                 </div>
//               </div>
//             </div>

//             {/* Weather Tips */}
//             {weatherTips.length > 0 && (
//               <div className="weather-tips">
//                 <h4>🌦️ Weather Tips</h4>
//                 <div className="tips-grid">
//                   {weatherTips.map((tip, index) => (
//                     <div key={index} className="tip-card">
//                       <span className="tip-icon">{tip.split(' ')[0]}</span>
//                       <p>{tip}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         )}

//         {/* Loading State */}
//         {loading && (
//           <div className="loading-state">
//             <div className="loading-spinner"></div>
//             <p>Getting your weather information...</p>
//           </div>
//         )}

//         {/* Location Change Input */}
//         <div className="location-change">
//           <h4>📍 Change Location</h4>
//           <p>Say: "change location to [city name]" or enter manually:</p>
//           <div className="location-input-group">
//             <input
//               type="text"
//               placeholder="Enter city name (e.g., London, Tokyo)"
//               value={customLocation}
//               onChange={(e) => setCustomLocation(e.target.value)}
//               className="location-input"
//               onKeyPress={(e) => {
//                 if (e.key === 'Enter' && customLocation.trim()) {
//                   changeLocation(customLocation);
//                 }
//               }}
//             />
//             <button 
//               className="location-change-btn"
//               onClick={() => changeLocation(customLocation)}
//               disabled={!customLocation.trim()}
//             >
//               Change Location
//             </button>
//           </div>
//           <p className="voice-example">
//             🎤 Voice examples: 
//             "change location to Paris", 
//             "weather in Tokyo", 
//             "London weather"
//           </p>
//         </div>
//       </div>

//       {/* Status Bar */}
//       <div className="status-bar">
//         <div className="status-info">
//           <span className="status-text">{status}</span>
//           <span className="voice-state">
//             Voice: {voiceActive ? '✅ On' : '❌ Off'}
//           </span>
//         </div>
//         {spokenText && (
//           <p className="spoken-text">
//             🎤 Heard: <strong>{spokenText}</strong>
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default WeatherReader;



import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { voiceService } from "../../services/voiceService";
import { createWeatherVoiceCommands } from "../../voice-commands/weatherVoiceCommands";
import "./WeatherReader.css";

const WeatherReader = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("Getting your location...");
  const [location, setLocation] = useState(null);
  const [unit, setUnit] = useState("metric");
  const [spokenText, setSpokenText] = useState("");
  const [customLocation, setCustomLocation] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceActive, setVoiceActive] = useState(false);
  const navigate = useNavigate();

  const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather";
  const API_KEYS = ["1706db1dfb8e3a753fc26b39abf11a49", "demo_key"];

  // Actions reference to avoid dependency issues
  const actionsRef = useRef({});

  // Speak function
  const speak = useCallback((text) => {
    return new Promise((resolve) => {
      const synth = window.speechSynthesis;
      if (!synth) {
        resolve();
        return;
      }
      
      synth.cancel();
      setIsSpeaking(true);
      
      const utter = new SpeechSynthesisUtterance(text);
      utter.rate = 0.8;
      utter.pitch = 1;
      utter.volume = 1;
      
      utter.onstart = () => {
        console.log("Started speaking:", text.substring(0, 50) + "...");
      };
      
      utter.onend = () => {
        console.log("Finished speaking");
        setIsSpeaking(false);
        resolve();
      };
      
      utter.onerror = (err) => {
        if (err.error !== 'interrupted') {
          console.error("Speech error:", err);
        }
        setIsSpeaking(false);
        resolve();
      };
      
      synth.speak(utter);
    });
  }, []);

  // Stop speaking function
  const stopSpeaking = useCallback(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      setIsSpeaking(false);
    }
  }, []);

  // Pause/resume speaking
  const pauseSpeaking = useCallback(() => {
    const synth = window.speechSynthesis;
    if (synth && synth.speaking) {
      synth.pause();
    }
  }, []);

  const resumeSpeaking = useCallback(() => {
    const synth = window.speechSynthesis;
    if (synth && synth.paused) {
      synth.resume();
    }
  }, []);

  // Get temperature in current unit
  const getTemperature = useCallback((temp) => {
    if (unit === "metric") {
      return `${temp}°C`;
    } else {
      return `${Math.round((temp * 9/5) + 32)}°F`;
    }
  }, [unit]);

  // Generate weather speech description
  const getWeatherDescription = useCallback(() => {
    if (!weatherData) return "No weather data available. Please refresh to get current weather.";
    
    const temp = getTemperature(weatherData.temperature);
    const feelsLike = getTemperature(weatherData.feels_like);
    const demoText = weatherData.isDemo ? "This is demo data. " : "";
    
    return `${demoText}Current weather in ${weatherData.location} is ${weatherData.description}. ` +
           `Temperature is ${temp}, feels like ${feelsLike}. ` +
           `Humidity is ${weatherData.humidity} percent. ` +
           `Wind speed is ${weatherData.wind_speed} meters per second. ` +
           `Visibility is ${weatherData.visibility} kilometers. ` +
           `Sunrise at ${weatherData.sunrise}, sunset at ${weatherData.sunset}.`;
  }, [weatherData, getTemperature]);

  // Get specific weather detail
  const getWeatherDetail = useCallback((detail) => {
    if (!weatherData) return "No weather data available.";
    
    switch(detail) {
      case 'temperature':
        return `Temperature is ${getTemperature(weatherData.temperature)}`;
      case 'humidity':
        return `Humidity is ${weatherData.humidity} percent`;
      case 'wind speed':
        return `Wind speed is ${weatherData.wind_speed} meters per second`;
      case 'condition':
        return `Weather condition is ${weatherData.description}`;
      case 'sunrise':
        return `Sunrise at ${weatherData.sunrise}`;
      case 'sunset':
        return `Sunset at ${weatherData.sunset}`;
      case 'feels like':
        return `Feels like ${getTemperature(weatherData.feels_like)}`;
      case 'visibility':
        return `Visibility is ${weatherData.visibility} kilometers`;
      case 'pressure':
        return `Atmospheric pressure is ${weatherData.pressure} hectopascals`;
      default:
        return getWeatherDescription();
    }
  }, [weatherData, getWeatherDescription, getTemperature]);

  // Read weather aloud
  const readWeatherAloud = useCallback(async () => {
    const description = getWeatherDescription();
    await speak(description);
  }, [getWeatherDescription, speak]);

  // Fetch weather data
  const fetchWeatherData = useCallback(async (lat, lon, cityName = null) => {
    setLoading(true);
    setStatus(cityName ? `Fetching weather for ${cityName}...` : "Fetching weather...");
    
    try {
      let response;
      if (cityName) {
        response = await axios.get(
          `${WEATHER_API_URL}?q=${cityName}&units=${unit}&appid=${API_KEYS[0]}`
        );
      } else {
        response = await axios.get(
          `${WEATHER_API_URL}?lat=${lat}&lon=${lon}&units=${unit}&appid=${API_KEYS[0]}`
        );
      }
      
      const data = response.data;
      const formattedData = formatWeatherData(data);
      setWeatherData(formattedData);
      setStatus(`Weather data loaded for ${formattedData.location}`);
      setLoading(false);
      return formattedData;
      
    } catch (error) {
      console.log("OpenWeatherMap failed, using demo data...");
      
      const demoData = getDemoWeatherData(cityName);
      setWeatherData(demoData);
      setStatus(`Demo weather data loaded for ${demoData.location}`);
      setLoading(false);
      return demoData;
    }
  }, [unit]);

  // Format weather data
  const formatWeatherData = (data) => {
    return {
      location: `${data.name}, ${data.sys?.country || ''}`,
      temperature: Math.round(data.main.temp),
      feels_like: Math.round(data.main.feels_like),
      humidity: data.main.humidity,
      wind_speed: data.wind.speed,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      pressure: data.main.pressure,
      visibility: (data.visibility / 1000).toFixed(1),
      sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }),
      sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }),
      temp_min: Math.round(data.main.temp_min),
      temp_max: Math.round(data.main.temp_max),
      isDemo: false
    };
  };

  // Generate demo weather data
  const getDemoWeatherData = (cityName = null) => {
    const cities = [
      { name: "New York, US", temp: 22 },
      { name: "London, UK", temp: 15 },
      { name: "Tokyo, JP", temp: 18 },
      { name: "Sydney, AU", temp: 25 },
      { name: "Mumbai, IN", temp: 30 }
    ];
    
    const randomCity = cityName ? 
      { name: cityName, temp: 22 } : 
      cities[Math.floor(Math.random() * cities.length)];
    
    const conditions = ["clear sky", "few clouds", "scattered clouds", "broken clouds", "light rain"];
    const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
    
    return {
      location: randomCity.name,
      temperature: randomCity.temp,
      feels_like: randomCity.temp + 2,
      humidity: Math.floor(Math.random() * 40) + 50,
      wind_speed: (Math.random() * 10).toFixed(1),
      description: randomCondition,
      icon: "02d",
      pressure: 1013,
      visibility: (Math.random() * 5 + 5).toFixed(1),
      sunrise: "06:45 AM",
      sunset: "07:30 PM",
      temp_min: randomCity.temp - 3,
      temp_max: randomCity.temp + 3,
      isDemo: true
    };
  };

  // Get user's location
  const getLocation = useCallback(() => {
    setLoading(true);
    setStatus("Detecting your location...");
    speak("Detecting your location");

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          setStatus("Location detected! Fetching weather...");
          await speak("Location detected. Getting weather information");
          await fetchWeatherData(latitude, longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
          handleLocationError(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 60000
        }
      );
    } else {
      setStatus("Geolocation not supported by your browser.");
      speak("Location services not available in your browser.");
      setLoading(false);
    }
  }, [speak, fetchWeatherData]);

  // Handle location errors
  const handleLocationError = useCallback((error) => {
    let errorMessage = "Could not get your location. ";
    
    switch(error.code) {
      case error.PERMISSION_DENIED:
        errorMessage += "Please allow location access to get weather data.";
        break;
      case error.POSITION_UNAVAILABLE:
        errorMessage += "Location information is unavailable.";
        break;
      case error.TIMEOUT:
        errorMessage += "Location request timed out.";
        break;
      default:
        errorMessage += "An unknown error occurred.";
        break;
    }
    
    setStatus(errorMessage);
    speak("Location access denied. Using demo weather data for New York.");
    
    const demoData = getDemoWeatherData();
    setWeatherData(demoData);
    setLoading(false);
  }, [speak]);

  // Change temperature unit
  const toggleUnit = useCallback(async () => {
    const newUnit = unit === "metric" ? "imperial" : "metric";
    setUnit(newUnit);
    const unitName = newUnit === "metric" ? "Celsius" : "Fahrenheit";
    setStatus(`Switched to ${unitName}`);
    await speak(`Temperature unit changed to ${unitName}`);
    
    if (location && weatherData && !weatherData.isDemo) {
      await fetchWeatherData(location.latitude, location.longitude);
    }
  }, [unit, location, weatherData, speak, fetchWeatherData]);

  // Change location
  const changeLocation = useCallback(async (cityName) => {
    if (!cityName || cityName.trim() === "") {
      await speak("Please specify a city name. For example: change location to London");
      return;
    }
    
    // Clean up city name
    const cleanCityName = cityName.trim().replace(/^(the|at|in|for)\s+/i, '');
    
    if (cleanCityName.length < 2) {
      await speak("Please say a valid city name.");
      return;
    }
    
    setCustomLocation(cleanCityName);
    setStatus(`Changing location to ${cleanCityName}...`);
    
    // Temporarily stop voice while fetching new data
    const wasListening = voiceService.isListening;
    if (wasListening) {
      voiceService.stopListening();
    }
    
    await speak(`Changing location to ${cleanCityName}. Getting weather information.`);
    
    try {
      await fetchWeatherData(null, null, cleanCityName);
    } finally {
      // Restart voice after fetching data
      if (wasListening) {
        setTimeout(() => {
          if (!voiceService.isListening) {
            voiceService.startListening();
          }
        }, 1000);
      }
    }
  }, [speak, fetchWeatherData]);

  // Refresh weather
  const refreshWeather = useCallback(async () => {
    if (customLocation) {
      await fetchWeatherData(null, null, customLocation);
    } else if (location) {
      await fetchWeatherData(location.latitude, location.longitude);
    } else {
      getLocation();
    }
    await speak("Weather refreshed");
  }, [customLocation, location, fetchWeatherData, getLocation, speak]);

  // Update actions ref
  useEffect(() => {
    actionsRef.current = {
      fetchWeather: fetchWeatherData,
      getWeatherDescription,
      getWeatherDetail,
      changeLocation,
      refreshWeather,
      readWeatherAloud,
      toggleUnit,
      stopSpeaking,
      pauseSpeaking,
      resumeSpeaking,
      navigate,
      // handleLogout,
      speak,
      getTemperature
    };
  }, [
    fetchWeatherData,
    getWeatherDescription,
    getWeatherDetail,
    changeLocation,
    refreshWeather,
    readWeatherAloud,
    toggleUnit,
    stopSpeaking,
    pauseSpeaking,
    resumeSpeaking,
    navigate,
    // handleLogout,
    speak,
    getTemperature
  ]);

  // Monitor voice service state
  useEffect(() => {
    const checkVoiceState = () => {
      setVoiceActive(voiceService.isListening);
    };

    // Check initially
    checkVoiceState();

    // Set up interval to check voice state
    const intervalId = setInterval(checkVoiceState, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // Voice command registration - FIXED VERSION
  const registerVoiceCommands = useCallback(() => {
    if (!voiceService.isAvailable()) {
      console.warn("Voice service not available");
      return;
    }
    
    console.log("Registering Weather Reader voice commands...");
    
    // Clear previous commands and handlers
    voiceService.clearCommands();
    voiceService.clearDynamicHandlers();
    
    // Set feature callback
    voiceService.setFeature('weather-reader', (transcript) => {
      console.log("Weather voice input:", transcript);
      setSpokenText(transcript);
    });
    
    // Create weather commands
    const weatherCommands = createWeatherVoiceCommands(weatherData, actionsRef.current, unit);
    
    // Register commands in priority order to avoid conflicts
    
    // 1. Register single-word basic commands FIRST (highest priority)
    voiceService.registerCommand("temperature", weatherCommands['temperature']);
    voiceService.registerCommand("humidity", weatherCommands['humidity']);
    voiceService.registerCommand("pressure", weatherCommands['pressure']);
    voiceService.registerCommand("visibility", weatherCommands['visibility']);
    voiceService.registerCommand("sunrise", weatherCommands['sunrise']);
    voiceService.registerCommand("sunset", weatherCommands['sunset']);
    voiceService.registerCommand("wind", weatherCommands['wind']);
    voiceService.registerCommand("clear", weatherCommands['clear']);
    voiceService.registerCommand("cloudy", weatherCommands['cloudy']);
    voiceService.registerCommand("rain", weatherCommands['rain']);
    voiceService.registerCommand("haze", weatherCommands['haze']);
    voiceService.registerCommand("details", weatherCommands['details']);
    voiceService.registerCommand("help", weatherCommands['help']);
    voiceService.registerCommand("commands", weatherCommands['commands']);
    voiceService.registerCommand("stop", weatherCommands['stop']);
    voiceService.registerCommand("pause", weatherCommands['pause']);
    voiceService.registerCommand("resume", weatherCommands['resume']);
    voiceService.registerCommand("weather", weatherCommands['weather']);
    voiceService.registerCommand("refresh", async () => {
      await speak("Refreshing weather...");
      refreshWeather();
    });
    
    // 2. Register multi-word commands
    voiceService.registerCommand("check weather", weatherCommands['check weather']);
    voiceService.registerCommand("weather forecast", weatherCommands['weather forecast']);
    voiceService.registerCommand("current weather", weatherCommands['current weather']);
    voiceService.registerCommand("weather now", weatherCommands['weather now']);
    voiceService.registerCommand("today's weather", weatherCommands['today\'s weather']);
    voiceService.registerCommand("what's the weather", weatherCommands['what\'s the weather']);
    voiceService.registerCommand("tell me the weather", weatherCommands['tell me the weather']);
    voiceService.registerCommand("current temperature", weatherCommands['current temperature']);
    voiceService.registerCommand("today temperature", weatherCommands['today temperature']);
    voiceService.registerCommand("how hot is it", weatherCommands['how hot is it']);
    voiceService.registerCommand("how cold is it", weatherCommands['how cold is it']);
    voiceService.registerCommand("weather condition", weatherCommands['weather condition']);
    voiceService.registerCommand("current condition", weatherCommands['current condition']);
    voiceService.registerCommand("is it sunny", weatherCommands['is it sunny']);
    voiceService.registerCommand("is it raining", weatherCommands['is it raining']);
    voiceService.registerCommand("is it cloudy", weatherCommands['is it cloudy']);
    voiceService.registerCommand("is it windy", weatherCommands['is it windy']);
    voiceService.registerCommand("wind speed", weatherCommands['wind speed']);
    voiceService.registerCommand("feels like", weatherCommands['feels like']);
    voiceService.registerCommand("min max", weatherCommands['min max']);
    voiceService.registerCommand("minimum temperature", weatherCommands['minimum temperature']);
    voiceService.registerCommand("maximum temperature", weatherCommands['maximum temperature']);
    voiceService.registerCommand("air quality", weatherCommands['air quality']);
    voiceService.registerCommand("chance of rain", weatherCommands['chance of rain']);
    voiceService.registerCommand("refresh weather", weatherCommands['refresh weather']);
    voiceService.registerCommand("reload weather", weatherCommands['reload weather']);
    voiceService.registerCommand("update weather", weatherCommands['update weather']);
    voiceService.registerCommand("get latest weather", weatherCommands['get latest weather']);
    voiceService.registerCommand("tomorrow forecast", weatherCommands['tomorrow forecast']);
    voiceService.registerCommand("stop reading", weatherCommands['stop reading']);
    voiceService.registerCommand("stop speaking", weatherCommands['stop speaking']);
    voiceService.registerCommand("pause reading", weatherCommands['pause reading']);
    voiceService.registerCommand("pause speaking", weatherCommands['pause speaking']);
    voiceService.registerCommand("resume reading", weatherCommands['resume reading']);
    voiceService.registerCommand("resume speaking", weatherCommands['resume speaking']);
    voiceService.registerCommand("weather help", weatherCommands['weather help']);
    voiceService.registerCommand("what can I say", weatherCommands['what can I say']);
    voiceService.registerCommand("list commands", weatherCommands['list commands']);
    voiceService.registerCommand("full report", weatherCommands['full report']);
    voiceService.registerCommand("complete weather", weatherCommands['complete weather']);
    voiceService.registerCommand("change unit", weatherCommands['change unit']);
    voiceService.registerCommand("switch to celsius", weatherCommands['switch to celsius']);
    voiceService.registerCommand("switch to fahrenheit", weatherCommands['switch to fahrenheit']);
    voiceService.registerCommand("celsius", weatherCommands['celsius']);
    voiceService.registerCommand("fahrenheit", weatherCommands['fahrenheit']);
    
    // 3. Register navigation commands
    voiceService.registerCommand("go to dashboard", weatherCommands['go to dashboard']);
    voiceService.registerCommand("dashboard", weatherCommands['dashboard']);
    voiceService.registerCommand("home", weatherCommands['home']);
    voiceService.registerCommand("back", weatherCommands['back']);
    voiceService.registerCommand("main menu", weatherCommands['main menu']);
    voiceService.registerCommand("logout", weatherCommands['logout']);
    voiceService.registerCommand("sign out", weatherCommands['sign out']);
    
    // 4. Register dynamic handlers LAST (lowest priority)
    
    // Handle "location" queries separately to avoid conflicts
    voiceService.registerDynamicHandler(
      /^(?:location|current location|where am i)$/i,
      async (matches, transcript) => {
        console.log("Location query handler:", transcript);
        if (weatherData) {
          await speak(`Current location is ${weatherData.location}`);
        } else {
          await speak("Location not available");
        }
      }
    );
    
    // Pattern for "change location to [city]" - must be exact
    voiceService.registerDynamicHandler(
      /^change location to (.+)$/i,
      async (matches, transcript) => {
        console.log("Change location handler:", transcript);
        if (matches && matches[1]) {
          const cityName = matches[1].trim();
          await speak(`Changing location to ${cityName}`);
          await changeLocation(cityName);
        }
      }
    );
    
    // Pattern for "weather in [city]"
    voiceService.registerDynamicHandler(
      /^weather in (.+)$/i,
      async (matches, transcript) => {
        console.log("Weather in handler:", transcript);
        if (matches && matches[1]) {
          const cityName = matches[1].trim();
          await speak(`Getting weather for ${cityName}`);
          await changeLocation(cityName);
        }
      }
    );
    
    // Pattern for "forecast for [city]"
    voiceService.registerDynamicHandler(
      /^forecast for (.+)$/i,
      async (matches, transcript) => {
        console.log("Forecast for handler:", transcript);
        if (matches && matches[1]) {
          const cityName = matches[1].trim();
          await speak(`Getting forecast for ${cityName}`);
          await changeLocation(cityName);
        }
      }
    );
    
    // Pattern for "[city] weather"
    voiceService.registerDynamicHandler(
      /^(.+?) weather$/i,
      async (matches, transcript) => {
        console.log("City weather handler:", transcript);
        if (matches && matches[1]) {
          const cityName = matches[1].trim();
          // Don't trigger for single words like "current weather"
          if (cityName.length > 3 && !cityName.includes(' ')) {
            await speak(`Getting weather for ${cityName}`);
            await changeLocation(cityName);
          }
        }
      }
    );
    
    // Pattern for temperature values like "25°C"
    voiceService.registerDynamicHandler(
      /^(\d+)\s*(?:degrees?)?\s*(?:celsius|fahrenheit|°c|°f)?$/i,
      async (matches, transcript) => {
        if (matches && matches[1] && weatherData) {
          const number = parseInt(matches[1]);
          const currentTemp = weatherData.temperature;
          if (Math.abs(number - currentTemp) <= 2) {
            await speak(`Yes, temperature is ${getTemperature(currentTemp)}`);
          }
        }
      }
    );
    
    // Start voice listening
    const startVoiceListening = () => {
      if (!voiceService.isListening && !voiceService.isStarting) {
        console.log("Starting voice listening for weather reader...");
        voiceService.shouldBeListening = true;
        
        setTimeout(() => {
          if (!voiceService.isListening && !voiceService.isStarting) {
            try {
              voiceService.startListening();
            } catch (error) {
              console.warn("Error starting voice:", error);
              // Try again after delay
              setTimeout(() => {
                if (!voiceService.isListening && !voiceService.isStarting) {
                  voiceService.startListening();
                }
              }, 1000);
            }
          }
        }, 300);
      }
    };
    
    // Start listening after a short delay
    setTimeout(startVoiceListening, 500);
    
    console.log("✅ Weather Reader voice commands initialized");
    
    return () => {
      console.log("Cleaning up Weather Reader voice commands");
      voiceService.clearCommands();
      voiceService.clearDynamicHandlers();
    };
  }, [weatherData, unit, changeLocation, getTemperature, speak, refreshWeather]);

  // Initialize voice commands
  useEffect(() => {
    const cleanup = registerVoiceCommands();
    return cleanup;
  }, [registerVoiceCommands]);

  // Get location on mount
  useEffect(() => {
    getLocation();
  }, [getLocation]);

  // Logout function
  const handleLogout = useCallback(async () => {
    setStatus("Logging out...");
    await speak("Logging out...");

    try {
      const token = localStorage.getItem("token");
      if (token) {
        await axios.post(
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
      console.error("Logout backend error:", error.response?.data || error.message);
    } finally {
      localStorage.clear();
      setTimeout(() => navigate("/"), 1500);
    }
  }, [navigate, speak]);

  // Toggle voice listening
  const toggleVoiceListening = useCallback(async () => {
    if (voiceService.isListening) {
      voiceService.stopListening();
      await speak("Voice listening stopped");
    } else {
      voiceService.startListening();
      await speak("Voice listening started");
    }
    setVoiceActive(voiceService.isListening);
  }, [speak]);

  // Test voice recognition
  const testVoiceRecognition = useCallback(async () => {
    console.log("Testing voice recognition...");
    console.log("Is available:", voiceService.isAvailable());
    console.log("Is listening:", voiceService.isListening);
    console.log("Should be listening:", voiceService.shouldBeListening);
    console.log("Current feature:", voiceService.currentFeature);
    
    await speak("Testing voice recognition. Try saying: temperature, humidity, or change location to London");
    
    // If not listening, try to start
    if (!voiceService.isListening) {
      console.log("Voice not listening, attempting to start...");
      voiceService.startListening();
    }
  }, [speak]);

  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };

  // Get weather icon
  const getWeatherIcon = (iconCode, description) => {
    const iconMap = {
      "01d": "☀️", "01n": "🌙",
      "02d": "⛅", "02n": "☁️",
      "03d": "☁️", "03n": "☁️",
      "04d": "☁️", "04n": "☁️",
      "09d": "🌧️", "09n": "🌧️",
      "10d": "🌦️", "10n": "🌧️",
      "11d": "⛈️", "11n": "⛈️",
      "13d": "❄️", "13n": "❄️",
      "50d": "🌫️", "50n": "🌫️"
    };
    
    if (!iconCode && description) {
      if (description.includes("clear")) return "☀️";
      if (description.includes("cloud")) return "☁️";
      if (description.includes("rain")) return "🌧️";
      if (description.includes("snow")) return "❄️";
      if (description.includes("storm")) return "⛈️";
    }
    
    return iconMap[iconCode] || "🌈";
  };

  // Get weather tips
  const getWeatherTips = useCallback(() => {
    if (!weatherData) return [];
    
    const tips = [];
    const temp = weatherData.temperature;
    const description = weatherData.description.toLowerCase();
    
    if (unit === "metric") {
      if (temp < 5) tips.push("🥶 It's very cold! Wear warm layers and a jacket.");
      else if (temp < 15) tips.push("🧥 Cool weather. A light jacket would be comfortable.");
      else if (temp < 25) tips.push("😊 Pleasant temperature. Light clothing is perfect.");
      else if (temp < 32) tips.push("🥵 Warm weather. Stay hydrated and wear light clothes.");
      else tips.push("🔥 Very hot! Stay in shade and drink plenty of water.");
    } else {
      const tempF = Math.round((temp * 9/5) + 32);
      if (tempF < 41) tips.push("🥶 It's very cold! Wear warm layers and a jacket.");
      else if (tempF < 59) tips.push("🧥 Cool weather. A light jacket would be comfortable.");
      else if (tempF < 77) tips.push("😊 Pleasant temperature. Light clothing is perfect.");
      else if (tempF < 90) tips.push("🥵 Warm weather. Stay hydrated and wear light clothes.");
      else tips.push("🔥 Very hot! Stay in shade and drink plenty of water.");
    }
    
    if (description.includes("rain") || description.includes("drizzle")) {
      tips.push("🌧️ Don't forget your umbrella! It's raining outside.");
    }
    if (description.includes("snow")) {
      tips.push("❄️ Snowy conditions. Drive carefully and dress warmly.");
    }
    if (description.includes("thunderstorm")) {
      tips.push("⛈️ Thunderstorm alert! Stay indoors if possible.");
    }
    if (description.includes("clear")) {
      tips.push("☀️ Perfect day for outdoor activities!");
    }
    if (weatherData.wind_speed > 8) {
      tips.push("💨 Windy conditions. Secure loose objects outdoors.");
    }
    if (weatherData.humidity > 80) {
      tips.push("💦 High humidity. It might feel warmer than actual temperature.");
    }
    
    return tips.slice(0, 3);
  }, [weatherData, unit]);

  const weatherTips = getWeatherTips();

  return (
    <div className="weather-reader-container">
      {/* Fixed Header */}
      <header className="dashboard-header fixed-header">
        <div className="header-content">
          <div className="header-left">
            <button className="back-btn" onClick={handleBackToDashboard}>
              ← Back to Dashboard
            </button>
            <h1 className="logo">Vision Assist</h1>
          </div>
          <div className="header-center">
            {spokenText && (
              <div className="spoken-text-display">
                <span className="spoken-label">🎤 Heard:</span> <strong>{spokenText}</strong>
              </div>
            )}
          </div>
          <div className="user-menu">
            <button 
              className="voice-toggle-btn-small"
              onClick={toggleVoiceListening}
              title={voiceActive ? "Turn off voice" : "Turn on voice"}
            >
              {voiceActive ? '🔊' : '🔇'}
            </button>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="weather-content">
        <div className="weather-header">
          <h2>🌤️ Weather Reader</h2>
          <p>Get real-time weather updates with voice feedback</p>
          <div className="voice-status-indicator">
            <span className={`voice-status ${voiceActive ? 'active' : 'inactive'}`}>
              {voiceActive ? '🎤 Voice Active' : '🔇 Voice Inactive'}
              <button 
                className="voice-toggle-btn"
                onClick={toggleVoiceListening}
              >
                {voiceActive ? 'Turn Off' : 'Turn On'}
              </button>
            </span>
            <p className="voice-hint">Try saying: "temperature", "humidity", or "change location to London"</p>
          </div>
        </div>

        {/* Status Message */}
        {status && (
          <div className="status-message">
            {status}
            {weatherData?.isDemo && (
              <div className="demo-notice-badge">
                🔄 Using Demo Data
              </div>
            )}
          </div>
        )}

        {/* Voice Commands Quick Guide */}
        {/* <div className="voice-commands-guide">
          <h4>🎤 Voice Commands:</h4>
          <div className="commands-grid">
            <div className="command-category">
              <h5>Basic</h5>
              <p>"temperature"</p>
              <p>"humidity"</p>
              <p>"wind speed"</p>
            </div>
            <div className="command-category">
              <h5>Details</h5>
              <p>"pressure"</p>
              <p>"visibility"</p>
              <p>"sunrise"</p>
            </div>
            <div className="command-category">
              <h5>Location</h5>
              <p>"change location to..."</p>
              <p>"weather in..."</p>
              <p>"forecast for..."</p>
            </div>
            <div className="command-category">
              <h5>Control</h5>
              <button 
                className="test-voice-btn"
                onClick={testVoiceRecognition}
              >
                🔧 Test Voice
              </button>
              <p>"help"</p>
              <p>"refresh"</p>
            </div>
          </div>
        </div> */}

        {/* Controls */}
        <div className="weather-controls">
          <button 
            className="control-btn refresh-btn"
            onClick={refreshWeather}
            disabled={loading}
          >
            🔄 {loading ? "Loading..." : "Refresh Weather"}
          </button>
          
          <button 
            className="control-btn unit-btn"
            onClick={toggleUnit}
            disabled={loading}
          >
            🌡️ Switch to {unit === "metric" ? "Fahrenheit" : "Celsius"}
          </button>
          
          <button 
            className="control-btn voice-btn"
            onClick={readWeatherAloud}
            disabled={!weatherData || loading}
          >
            🎤 Read Weather Aloud
          </button>
          
          <button 
            className="control-btn stop-btn"
            onClick={stopSpeaking}
            disabled={!isSpeaking}
          >
            ⏹️ Stop Speaking
          </button>
        </div>

        {/* Weather Display */}
        {weatherData && (
          <div className="weather-display">
            <div className="current-weather-card">
              <div className="weather-main">
                <div className="weather-icon">
                  {getWeatherIcon(weatherData.icon, weatherData.description)}
                  {weatherData.isDemo && <span className="demo-indicator">DEMO</span>}
                </div>
                <div className="weather-primary">
                  <h3>{getTemperature(weatherData.temperature)}</h3>
                  <p className="weather-description">{weatherData.description}</p>
                  <p className="weather-location">📍 {weatherData.location}</p>
                  <p className="weather-feels-like">
                    Feels like {getTemperature(weatherData.feels_like)}
                  </p>
                </div>
              </div>

              <div className="weather-details-grid">
                <div className="weather-detail">
                  <span className="detail-label">Min / Max</span>
                  <span className="detail-value">
                    {getTemperature(weatherData.temp_min)} / {getTemperature(weatherData.temp_max)}
                  </span>
                </div>
                
                <div className="weather-detail">
                  <span className="detail-label">Humidity</span>
                  <span className="detail-value">{weatherData.humidity}%</span>
                </div>
                
                <div className="weather-detail">
                  <span className="detail-label">Wind Speed</span>
                  <span className="detail-value">{weatherData.wind_speed} m/s</span>
                </div>
                
                <div className="weather-detail">
                  <span className="detail-label">Pressure</span>
                  <span className="detail-value">{weatherData.pressure} hPa</span>
                </div>
                
                <div className="weather-detail">
                  <span className="detail-label">Visibility</span>
                  <span className="detail-value">{weatherData.visibility} km</span>
                </div>
                
                <div className="weather-detail">
                  <span className="detail-label">Sunrise</span>
                  <span className="detail-value">{weatherData.sunrise}</span>
                </div>
                
                <div className="weather-detail">
                  <span className="detail-label">Sunset</span>
                  <span className="detail-value">{weatherData.sunset}</span>
                </div>
              </div>
            </div>

            {/* Weather Tips */}
            {weatherTips.length > 0 && (
              <div className="weather-tips">
                <h4>🌦️ Weather Tips</h4>
                <div className="tips-grid">
                  {weatherTips.map((tip, index) => (
                    <div key={index} className="tip-card">
                      <span className="tip-icon">{tip.split(' ')[0]}</span>
                      <p>{tip}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Getting your weather information...</p>
          </div>
        )}

        {/* Location Change Input */}
        <div className="location-change">
          <h4>📍 Change Location</h4>
          <p>Say: "change location to [city name]" or enter manually:</p>
          <div className="location-input-group">
            <input
              type="text"
              placeholder="Enter city name (e.g., London, Tokyo)"
              value={customLocation}
              onChange={(e) => setCustomLocation(e.target.value)}
              className="location-input"
              onKeyPress={(e) => {
                if (e.key === 'Enter' && customLocation.trim()) {
                  changeLocation(customLocation);
                }
              }}
            />
            <button 
              className="location-change-btn"
              onClick={() => changeLocation(customLocation)}
              disabled={!customLocation.trim()}
            >
              Change Location
            </button>
          </div>
          <p className="voice-example">
            🎤 Voice examples: 
            "change location to Paris", 
            "weather in Tokyo", 
            "forecast for London"
          </p>
        </div>
      </div>

      {/* Status Bar */}
      <div className="status-bar">
        <div className="status-info">
          <span className="status-text">{status}</span>
          <span className="voice-state">
            Voice: {voiceActive ? '✅ On' : '❌ Off'}
          </span>
        </div>
        {spokenText && (
          <p className="spoken-text">
            🎤 Heard: <strong>{spokenText}</strong>
          </p>
        )}
      </div>
    </div>
  );
};

export default WeatherReader;