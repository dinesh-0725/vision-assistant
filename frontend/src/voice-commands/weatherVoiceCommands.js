// // export const createWeatherVoiceCommands = (weatherData, actions) => {
// //   const { 
// //     fetchWeather, 
// //     getWeatherDescription 
// //   } = actions;

// //   return {
// //     'check weather': () => {
// //       fetchWeather();
// //       return "Checking weather...";
// //     },
    
// //     'weather forecast': () => {
// //       fetchWeather();
// //       return "Getting weather forecast...";
// //     },
    
// //     'current weather': () => {
// //       if (weatherData) {
// //         return getWeatherDescription();
// //       }
// //       return "Weather data not available. Checking now...";
// //     },
    
// //     'weather help': () => {
// //       return "Say: check weather, current weather, or weather forecast";
// //     }
// //   };
// // };




// // src/voice-commands/weatherVoiceCommands.js
// export const createWeatherVoiceCommands = (weatherData, actions) => {
//   const { 
//     fetchWeather, 
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
//     handleLogout
//   } = actions;

//   const commands = {
//     // BASIC WEATHER COMMANDS
//     'check weather': async () => {
//       await speak("Checking weather...");
//       refreshWeather();
//     },
    
//     'weather forecast': async () => {
//       await speak("Getting weather forecast...");
//       refreshWeather();
//     },
    
//     'weather now': async () => {
//       await readWeatherAloud();
//     },
    
//     'current weather': async () => {
//       if (weatherData) {
//         await readWeatherAloud();
//       } else {
//         await speak("Weather data not available. Checking now...");
//         refreshWeather();
//       }
//     },
    
//     'today\'s weather': async () => {
//       await readWeatherAloud();
//     },
    
//     'what\'s the weather': async () => {
//       await readWeatherAloud();
//     },
    
//     'tell me the weather': async () => {
//       await readWeatherAloud();
//     },
    
//     // TEMPERATURE COMMANDS
//     'temperature': async () => {
//       const detail = getWeatherDetail('temperature');
//       await speak(detail);
//     },
    
//     'current temperature': async () => {
//       const detail = getWeatherDetail('temperature');
//       await speak(detail);
//     },
    
//     'today temperature': async () => {
//       const detail = getWeatherDetail('temperature');
//       await speak(detail);
//     },
    
//     'how hot is it': async () => {
//       const detail = getWeatherDetail('temperature');
//       await speak(detail);
//     },
    
//     'how cold is it': async () => {
//       const detail = getWeatherDetail('temperature');
//       await speak(detail);
//     },
    
//     // CONDITION COMMANDS
//     'weather condition': async () => {
//       const detail = getWeatherDetail('condition');
//       await speak(detail);
//     },
    
//     'current condition': async () => {
//       const detail = getWeatherDetail('condition');
//       await speak(detail);
//     },
    
//     'is it sunny': async () => {
//       if (weatherData) {
//         const isSunny = weatherData.description.includes('clear') || weatherData.description.includes('sunny');
//         await speak(isSunny ? "Yes, it's sunny" : `No, it's ${weatherData.description}`);
//       }
//     },
    
//     'is it raining': async () => {
//       if (weatherData) {
//         const isRaining = weatherData.description.includes('rain');
//         await speak(isRaining ? "Yes, it's raining" : `No, it's ${weatherData.description}`);
//       }
//     },
    
//     'is it cloudy': async () => {
//       if (weatherData) {
//         const isCloudy = weatherData.description.includes('cloud');
//         await speak(isCloudy ? "Yes, it's cloudy" : `No, it's ${weatherData.description}`);
//       }
//     },
    
//     'is it windy': async () => {
//       if (weatherData) {
//         const detail = getWeatherDetail('wind speed');
//         await speak(detail);
//       }
//     },
    
//     // EXTRA INFO COMMANDS
//     'humidity': async () => {
//       const detail = getWeatherDetail('humidity');
//       await speak(detail);
//     },
    
//     'wind speed': async () => {
//       const detail = getWeatherDetail('wind speed');
//       await speak(detail);
//     },
    
//     'air quality': async () => {
//       await speak("Air quality information is not available in the current version.");
//     },
    
//     'chance of rain': async () => {
//       await speak("Precipitation probability is not available in the current version.");
//     },
    
//     'sunrise time': async () => {
//       const detail = getWeatherDetail('sunrise');
//       await speak(detail);
//     },
    
//     'sunset time': async () => {
//       const detail = getWeatherDetail('sunset');
//       await speak(detail);
//     },
    
//     'feels like': async () => {
//       const detail = getWeatherDetail('feels like');
//       await speak(detail);
//     },
    
//     'visibility': async () => {
//       const detail = getWeatherDetail('visibility');
//       await speak(detail);
//     },
    
//     'pressure': async () => {
//       const detail = getWeatherDetail('pressure');
//       await speak(detail);
//     },
    
//     // REFRESH COMMANDS
//     'refresh weather': async () => {
//       await refreshWeather();
//     },
    
//     'reload weather': async () => {
//       await refreshWeather();
//     },
    
//     'update weather': async () => {
//       await refreshWeather();
//     },
    
//     'get latest weather': async () => {
//       await refreshWeather();
//     },
    
//     // TOMORROW FORECAST
//     'tomorrow forecast': async () => {
//       await speak("Tomorrow's forecast feature is coming soon. For now, here's today's weather:");
//       await readWeatherAloud();
//     },
    
//     // SPEECH CONTROL
//     'stop reading': async () => {
//       stopSpeaking();
//       await speak("Stopped reading");
//     },
    
//     'stop speaking': async () => {
//       stopSpeaking();
//       await speak("Stopped speaking");
//     },
    
//     'pause reading': async () => {
//       pauseSpeaking();
//       await speak("Paused");
//     },
    
//     'pause speaking': async () => {
//       pauseSpeaking();
//       await speak("Paused");
//     },
    
//     'resume reading': async () => {
//       resumeSpeaking();
//       await speak("Resumed");
//     },
    
//     'resume speaking': async () => {
//       resumeSpeaking();
//       await speak("Resumed");
//     },
    
//     'stop': async () => {
//       stopSpeaking();
//     },
    
//     'pause': async () => {
//       pauseSpeaking();
//     },
    
//     'resume': async () => {
//       resumeSpeaking();
//     },
    
//     // HELP COMMANDS
//     'help': async () => {
//       const helpText = "Weather Reader voice commands: " +
//         "Say 'check weather' or 'refresh weather' to get latest forecast. " +
//         "Say 'temperature', 'humidity', or 'wind speed' for specific details. " +
//         "Say 'sunrise time' or 'sunset time' for daily timings. " +
//         "Say 'change location to' followed by city name to change location. " +
//         "Say 'stop reading' or 'pause reading' to control speech. " +
//         "Say 'go to dashboard' to return to main menu. " +
//         "Try asking: 'what's the weather', 'is it raining', or 'how hot is it'.";
//       await speak(helpText);
//     },
    
//     'weather help': async () => {
//       const helpText = "Weather commands: check weather, temperature, humidity, wind speed, sunrise time, sunset time, change location, stop reading, help.";
//       await speak(helpText);
//     },
    
//     'what can I say': async () => {
//       const helpText = "You can say: check weather, temperature, humidity, wind speed, sunrise, sunset, change location, stop reading, or help.";
//       await speak(helpText);
//     },
    
//     'list commands': async () => {
//       const helpText = "Weather commands: check weather, current weather, temperature, humidity, wind speed, sunrise time, sunset time, feels like, visibility, pressure, change location, refresh weather, stop reading, pause, resume, help.";
//       await speak(helpText);
//     },
    
//     // NAVIGATION
//     'go to dashboard': async () => {
//       await speak("Returning to dashboard");
//       navigate("/dashboard");
//     },
    
//     'dashboard': async () => {
//       await speak("Going to dashboard");
//       navigate("/dashboard");
//     },
    
//     'home': async () => {
//       await speak("Going home");
//       navigate("/dashboard");
//     },
    
//     'back': async () => {
//       await speak("Going back to dashboard");
//       navigate("/dashboard");
//     },
    
//     // LOGOUT
//     'logout': async () => {
//       await speak("Logging out");
//       handleLogout();
//     },
    
//     'sign out': async () => {
//       await speak("Signing out");
//       handleLogout();
//     },
    
//     // UNIT CHANGE
//     'change unit': async () => {
//       await toggleUnit();
//     },
    
//     'switch to celsius': async () => {
//       if (unit === "imperial") {
//         await toggleUnit();
//       } else {
//         await speak("Already using Celsius");
//       }
//     },
    
//     'switch to fahrenheit': async () => {
//       if (unit === "metric") {
//         await toggleUnit();
//       } else {
//         await speak("Already using Fahrenheit");
//       }
//     }
//   };

//   return commands;
// };

// // Helper speak function
// const speak = (text) => {
//   return new Promise((resolve) => {
//     const synth = window.speechSynthesis;
//     if (!synth) {
//       resolve();
//       return;
//     }
    
//     synth.cancel();
//     const utter = new SpeechSynthesisUtterance(text);
//     utter.rate = 0.8;
//     utter.pitch = 1;
//     utter.volume = 1;
    
//     utter.onend = () => {
//       resolve();
//     };
    
//     utter.onerror = () => {
//       resolve();
//     };
    
//     synth.speak(utter);
//   });
// };


// src/voice-commands/weatherVoiceCommands.js
export const createWeatherVoiceCommands = (weatherData, actions, unit) => {
  const { 
    fetchWeather, 
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
    handleLogout,
    speak,
    getTemperature
  } = actions;

  const commands = {
    // BASIC WEATHER COMMANDS
    'check weather': async () => {
      await speak("Checking weather...");
      refreshWeather();
    },
    
    'weather forecast': async () => {
      await speak("Getting weather forecast...");
      refreshWeather();
    },
    
    'weather now': async () => {
      await readWeatherAloud();
    },
    
    'current weather': async () => {
      if (weatherData) {
        await readWeatherAloud();
      } else {
        await speak("Weather data not available. Checking now...");
        refreshWeather();
      }
    },
    
    'today\'s weather': async () => {
      await readWeatherAloud();
    },
    
    'what\'s the weather': async () => {
      await readWeatherAloud();
    },
    
    'tell me the weather': async () => {
      await readWeatherAloud();
    },
    
    'weather': async () => {
      await readWeatherAloud();
    },
    
    // TEMPERATURE COMMANDS
    'temperature': async () => {
      const detail = getWeatherDetail('temperature');
      await speak(detail);
    },
    
    'current temperature': async () => {
      const detail = getWeatherDetail('temperature');
      await speak(detail);
    },
    
    'today temperature': async () => {
      const detail = getWeatherDetail('temperature');
      await speak(detail);
    },
    
    'how hot is it': async () => {
      const detail = getWeatherDetail('temperature');
      await speak(detail);
    },
    
    'how cold is it': async () => {
      const detail = getWeatherDetail('temperature');
      await speak(detail);
    },
    
    // Read specific temperature like "25°C"
    'twenty five degrees': async () => {
      if (weatherData) {
        const temp = getTemperature(weatherData.temperature);
        await speak(`Current temperature is ${temp}`);
      } else {
        await speak("No weather data available");
      }
    },
    
    'twenty five degrees celsius': async () => {
      if (weatherData) {
        const temp = getTemperature(weatherData.temperature);
        await speak(`Current temperature is ${temp}`);
      } else {
        await speak("No weather data available");
      }
    },
    
    // CONDITION COMMANDS
    'weather condition': async () => {
      const detail = getWeatherDetail('condition');
      await speak(detail);
    },
    
    'current condition': async () => {
      const detail = getWeatherDetail('condition');
      await speak(detail);
    },
    
    'is it sunny': async () => {
      if (weatherData) {
        const isSunny = weatherData.description.includes('clear') || weatherData.description.includes('sunny');
        await speak(isSunny ? "Yes, it's sunny" : `No, it's ${weatherData.description}`);
      }
    },
    
    'is it raining': async () => {
      if (weatherData) {
        const isRaining = weatherData.description.includes('rain');
        await speak(isRaining ? "Yes, it's raining" : `No, it's ${weatherData.description}`);
      }
    },
    
    'is it cloudy': async () => {
      if (weatherData) {
        const isCloudy = weatherData.description.includes('cloud');
        await speak(isCloudy ? "Yes, it's cloudy" : `No, it's ${weatherData.description}`);
      }
    },
    
    'is it windy': async () => {
      if (weatherData) {
        const detail = getWeatherDetail('wind speed');
        await speak(detail);
      }
    },
    
    // Weather condition specific commands
    'haze': async () => {
      if (weatherData) {
        const hasHaze = weatherData.description.includes('haze');
        await speak(hasHaze ? "Yes, it's hazy" : `No, current condition is ${weatherData.description}`);
      }
    },
    
    'clear': async () => {
      if (weatherData) {
        const isClear = weatherData.description.includes('clear');
        await speak(isClear ? "Yes, it's clear" : `No, current condition is ${weatherData.description}`);
      }
    },
    
    'cloudy': async () => {
      if (weatherData) {
        const isCloudy = weatherData.description.includes('cloud');
        await speak(isCloudy ? "Yes, it's cloudy" : `No, current condition is ${weatherData.description}`);
      }
    },
    
    'rain': async () => {
      if (weatherData) {
        const isRainy = weatherData.description.includes('rain');
        await speak(isRainy ? "Yes, it's raining" : `No, current condition is ${weatherData.description}`);
      }
    },
    
    // LOCATION COMMANDS
    'location': async () => {
      if (weatherData) {
        await speak(`Current location is ${weatherData.location}`);
      } else {
        await speak("Location not available");
      }
    },
    
    'where am i': async () => {
      if (weatherData) {
        await speak(`You are in ${weatherData.location}`);
      } else {
        await speak("Location not available");
      }
    },
    
    'current location': async () => {
      if (weatherData) {
        await speak(`Current location is ${weatherData.location}`);
      } else {
        await speak("Location not available");
      }
    },
    
    // SPECIFIC DETAILS FROM WEATHER DISPLAY
    'feels like': async () => {
      const detail = getWeatherDetail('feels like');
      await speak(detail);
    },
    
    'min max': async () => {
      if (weatherData) {
        const min = getTemperature(weatherData.temp_min);
        const max = getTemperature(weatherData.temp_max);
        await speak(`Minimum temperature is ${min}, maximum is ${max}`);
      }
    },
    
    'minimum temperature': async () => {
      if (weatherData) {
        const min = getTemperature(weatherData.temp_min);
        await speak(`Minimum temperature is ${min}`);
      }
    },
    
    'maximum temperature': async () => {
      if (weatherData) {
        const max = getTemperature(weatherData.temp_max);
        await speak(`Maximum temperature is ${max}`);
      }
    },
    
    'humidity': async () => {
      const detail = getWeatherDetail('humidity');
      await speak(detail);
    },
    
    'wind': async () => {
      const detail = getWeatherDetail('wind speed');
      await speak(detail);
    },
    
    'wind speed': async () => {
      const detail = getWeatherDetail('wind speed');
      await speak(detail);
    },
    
    'pressure': async () => {
      const detail = getWeatherDetail('pressure');
      await speak(detail);
    },
    
    'visibility': async () => {
      const detail = getWeatherDetail('visibility');
      await speak(detail);
    },
    
    'sunrise': async () => {
      const detail = getWeatherDetail('sunrise');
      await speak(detail);
    },
    
    'sunset': async () => {
      const detail = getWeatherDetail('sunset');
      await speak(detail);
    },
    
    // EXTRA INFO COMMANDS
    'air quality': async () => {
      await speak("Air quality information is not available in the current version.");
    },
    
    'chance of rain': async () => {
      await speak("Precipitation probability is not available in the current version.");
    },
    
    // REFRESH COMMANDS
    'refresh weather': async () => {
      await refreshWeather();
    },
    
    'reload weather': async () => {
      await refreshWeather();
    },
    
    'update weather': async () => {
      await refreshWeather();
    },
    
    'get latest weather': async () => {
      await refreshWeather();
    },
    
    // TOMORROW FORECAST
    'tomorrow forecast': async () => {
      await speak("Tomorrow's forecast feature is coming soon. For now, here's today's weather:");
      await readWeatherAloud();
    },
    
    // SPEECH CONTROL
    'stop reading': async () => {
      stopSpeaking();
      await speak("Stopped reading");
    },
    
    'stop speaking': async () => {
      stopSpeaking();
      await speak("Stopped speaking");
    },
    
    'pause reading': async () => {
      pauseSpeaking();
      await speak("Paused");
    },
    
    'pause speaking': async () => {
      pauseSpeaking();
      await speak("Paused");
    },
    
    'resume reading': async () => {
      resumeSpeaking();
      await speak("Resumed");
    },
    
    'resume speaking': async () => {
      resumeSpeaking();
      await speak("Resumed");
    },
    
    'stop': async () => {
      stopSpeaking();
    },
    
    'pause': async () => {
      pauseSpeaking();
    },
    
    'resume': async () => {
      resumeSpeaking();
    },
    
    // HELP COMMANDS
    'help': async () => {
      const helpText = "Weather Reader voice commands: " +
        "Say 'check weather' or 'refresh weather' to get latest forecast. " +
        "Say 'temperature', 'humidity', or 'wind speed' for specific details. " +
        "Say 'sunrise' or 'sunset' for daily timings. " +
        "Say 'change location to' followed by city name to change location. " +
        "Say 'stop reading' or 'pause reading' to control speech. " +
        "Say 'go to dashboard' to return to main menu. " +
        "Try asking: 'what's the weather', 'is it raining', or 'how hot is it'.";
      await speak(helpText);
    },
    
    'weather help': async () => {
      const helpText = "Weather commands: check weather, temperature, humidity, wind speed, sunrise, sunset, change location, stop reading, help.";
      await speak(helpText);
    },
    
    'what can I say': async () => {
      const helpText = "You can say: check weather, temperature, humidity, wind speed, sunrise, sunset, change location, stop reading, or help.";
      await speak(helpText);
    },
    
    'list commands': async () => {
      const helpText = "Weather commands: check weather, current weather, temperature, humidity, wind speed, sunrise, sunset, feels like, visibility, pressure, change location, refresh weather, stop reading, pause, resume, help.";
      await speak(helpText);
    },
    
    'commands': async () => {
      const helpText = "Available commands: temperature, humidity, wind speed, pressure, visibility, sunrise, sunset, feels like, min max, refresh weather, change location, help.";
      await speak(helpText);
    },
    
    // NAVIGATION
    'go to dashboard': async () => {
      await speak("Returning to dashboard");
      navigate("/dashboard");
    },
    
    'dashboard': async () => {
      await speak("Going to dashboard");
      navigate("/dashboard");
    },
    
    'home': async () => {
      await speak("Going home");
      navigate("/dashboard");
    },
    
    'back': async () => {
      await speak("Going back to dashboard");
      navigate("/dashboard");
    },
    
    'main menu': async () => {
      await speak("Going to main menu");
      navigate("/dashboard");
    },
    
    // LOGOUT
    'logout': async () => {
      await speak("Logging out");
      handleLogout();
    },
    
    'sign out': async () => {
      await speak("Signing out");
      handleLogout();
    },
    
    // UNIT CHANGE
    'change unit': async () => {
      await toggleUnit();
    },
    
    'switch to celsius': async () => {
      if (unit === "imperial") {
        await toggleUnit();
      } else {
        await speak("Already using Celsius");
      }
    },
    
    'switch to fahrenheit': async () => {
      if (unit === "metric") {
        await toggleUnit();
      } else {
        await speak("Already using Fahrenheit");
      }
    },
    
    'celsius': async () => {
      if (unit === "imperial") {
        await toggleUnit();
      } else {
        await speak("Already using Celsius");
      }
    },
    
    'fahrenheit': async () => {
      if (unit === "metric") {
        await toggleUnit();
      } else {
        await speak("Already using Fahrenheit");
      }
    },
    
    // CHANGE LOCATION COMMANDS (dynamic handlers will handle the full phrase)
    'change location': async () => {
      await speak("Please say the city name. Example: change location to London");
    },
    
    // EXTRA DETAILS COMMANDS
    'details': async () => {
      await readWeatherAloud();
    },
    
    'full report': async () => {
      await readWeatherAloud();
    },
    
    'complete weather': async () => {
      await readWeatherAloud();
    },
    
    // SPECIFIC VALUE READOUTS
    'sixty one percent': async () => {
      if (weatherData) {
        await speak(`Humidity is ${weatherData.humidity} percent`);
      }
    },
    
    'four point one two': async () => {
      if (weatherData) {
        await speak(`Wind speed is ${weatherData.wind_speed} meters per second`);
      }
    },
    
    'one thousand fifteen': async () => {
      if (weatherData) {
        await speak(`Pressure is ${weatherData.pressure} hectopascals`);
      }
    },
    
    'two point five': async () => {
      if (weatherData) {
        await speak(`Visibility is ${weatherData.visibility} kilometers`);
      }
    },
    
    'six twenty five': async () => {
      if (weatherData) {
        await speak(`Sunrise is at ${weatherData.sunrise}`);
      }
    },
    
    'five twenty nine': async () => {
      if (weatherData) {
        await speak(`Sunset is at ${weatherData.sunset}`);
      }
    }
  };

  return commands;
};