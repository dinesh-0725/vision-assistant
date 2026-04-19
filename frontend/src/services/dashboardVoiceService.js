// src/services/dashboardVoiceService.js
import { voiceService } from './voiceService';

class DashboardVoiceService {
  constructor() {
    this.isInitialized = false;
  }

  // Initialize dashboard voice commands
  initializeDashboardCommands(navigate, actions = {}) {
    if (this.isInitialized) {
      return;
    }

    console.log('🎤 [DashboardVoice] Initializing dashboard voice commands');
    
    // Clear any existing commands
    voiceService.clearCommands();
    voiceService.setFeature('dashboard');
    
    const { speak, handleLogout } = actions;
    
    // Core navigation commands
    // voiceService.registerCommand("dashboard", async () => {
    //   console.log("Dashboard command received");
    //   if (speak) await speak("You are already on dashboard");
    // });

//     voiceService.registerCommand("dashboard", async () => {
//   await speak(
//     "Available features are language translator, calculator, object detection, OCR scanner, SOS emergency, medication reminder, weather reader, news reader, money analyzer, and reminders."
//   );
// });
    
    voiceService.registerCommand("home", async () => {
      console.log("Home command received");
      if (speak) await speak("You are already on dashboard");
    });
    
    // Section navigation
    voiceService.registerCommand("overview", async () => {
      console.log("Overview command received");
      if (speak) await speak("Showing all features");
    });
    
    voiceService.registerCommand("all features", async () => {
      console.log("All features command received");
      if (speak) await speak("Showing all features");
    });

    voiceService.registerCommand("features", async () => {
  await speak(
    "Available features are language translator, calculator, object detection, OCR scanner, SOS emergency, medication reminder, weather reader, news reader, money analyzer, and reminders."
  );
});
    
    // Category navigation
    voiceService.registerCommand("communication", async () => {
      console.log("Communication command received");
      if (speak) await speak("Showing communication tools");
    });
    
    voiceService.registerCommand("tools", async () => {
      console.log("Tools command received");
      if (speak) await speak("Showing daily tools");
    });
    
    voiceService.registerCommand("safety", async () => {
      console.log("Safety command received");
      if (speak) await speak("Showing safety and health features");
    });
    
    voiceService.registerCommand("information", async () => {
      console.log("Information command received");
      if (speak) await speak("Showing information services");
    });
    
    voiceService.registerCommand("productivity", async () => {
      console.log("Productivity command received");
      if (speak) await speak("Showing productivity tools");
    });
    
    // Profile navigation
    voiceService.registerCommand("profile", async () => {
      console.log("Profile command received");
      if (speak) await speak("Opening your profile");
      navigate("/profile");
    });
    
    voiceService.registerCommand("edit profile", async () => {
      console.log("Edit profile command received");
      if (speak) await speak("Opening profile editor");
      navigate("/profile");
    });
    
    voiceService.registerCommand("go to profile", async () => {
      console.log("Go to profile command received");
      if (speak) await speak("Going to your profile");
      navigate("/profile");
    });
    
    // Feature navigation commands
    voiceService.registerCommand("news", async () => {
      console.log("News command received");
      if (speak) await speak("Opening news reader");
      navigate("/news");
    });
    
    voiceService.registerCommand("open news", async () => {
      console.log("Open news command received");
      if (speak) await speak("Opening news reader");
      navigate("/news");
    });
    
    voiceService.registerCommand("go to news", async () => {
      console.log("Go to news command received");
      if (speak) await speak("Going to news reader");
      navigate("/news");
    });
    
    voiceService.registerCommand("weather", async () => {
      console.log("Weather command received");
      if (speak) await speak("Opening weather forecast");
      navigate("/weather");
    });
    
    voiceService.registerCommand("open weather", async () => {
      console.log("Open weather command received");
      if (speak) await speak("Opening weather forecast");
      navigate("/weather");
    });
    
    voiceService.registerCommand("go to weather", async () => {
      console.log("Go to weather command received");
      if (speak) await speak("Going to weather forecast");
      navigate("/weather");
    });
    
    voiceService.registerCommand("calculator", async () => {
      console.log("Calculator command received");
      if (speak) await speak("Opening talking calculator");
      navigate("/talking-calculator");
    });
    
    voiceService.registerCommand("object detection", async () => {
      console.log("Object detection command received");
      if (speak) await speak("Opening object detector");
      navigate("/object-detector");
    });
    
    voiceService.registerCommand("ocr", async () => {
      console.log("OCR command received");
      if (speak) await speak("Opening OCR scanner");
      navigate("/ocr-scanner");
    });
    
    voiceService.registerCommand("ocr scanner", async () => {
      console.log("OCR command received");
      if (speak) await speak("Opening OCR scanner");
      navigate("/ocr-scanner");
    });

    voiceService.registerCommand("scanner", async () => {
      console.log("OCR command received");
      if (speak) await speak("Opening OCR scanner");
      navigate("/ocr-scanner");
    });

    voiceService.registerCommand("sos", async () => {
      console.log("SOS command received");
      if (speak) await speak("Opening SOS emergency");
      navigate("/sos");
    });
    
    voiceService.registerCommand("medication", async () => {
      console.log("Medication command received");
      if (speak) await speak("Opening medication reminder");
      navigate("/medication-reminder");
    });
    
    voiceService.registerCommand("money", async () => {
      console.log("Money command received");
      if (speak) await speak("Opening money analyzer");
      navigate("/money-analyzer");
    });
    
    voiceService.registerCommand("reminders", async () => {
      console.log("Reminders command received");
      if (speak) await speak("Opening reminders");
      navigate("/reminders");
    });
    
    // Help commands
    voiceService.registerCommand("help", async () => {
      console.log("Help command received");
      if (speak) {
        await speak("I can help you navigate and open features. Try saying: news, weather, calculator, object detection, profile, or logout.");
      }
    });
    
    voiceService.registerCommand("what can you do", async () => {
      console.log("What can you do command received");
      if (speak) {
        await speak("I can open features like news reader, weather forecast, talking calculator, object detector, SOS emergency, medication reminder, and more.");
      }
    });
    
    // Voice control
    voiceService.registerCommand("stop voice", async () => {
      console.log("Stop voice command received");
      if (speak) await speak("Voice control stopped");
      voiceService.stopListening();
    });
    
    voiceService.registerCommand("start voice", async () => {
      console.log("Start voice command received");
      if (speak) await speak("Voice control started");
      voiceService.startListening();
    });
    
    // Logout
    voiceService.registerCommand("logout", async () => {
      console.log("Logout command received");
      if (handleLogout) {
        await handleLogout();
      }
    });
    
    voiceService.registerCommand("sign out", async () => {
      console.log("Sign out command received");
      if (handleLogout) {
        await handleLogout();
      }
    });
    
    this.isInitialized = true;
    console.log('✅ [DashboardVoice] Dashboard commands initialized');
    
    // Start listening
    if (!voiceService.isListening) {
      voiceService.startListening();
    }
  }
  
  // Deactivate dashboard commands
  deactivate() {
    console.log('🔇 [DashboardVoice] Deactivating dashboard commands');
    voiceService.stopListening();
    voiceService.clearCommands();
    this.isInitialized = false;
  }
  
  // Check if initialized
  isActive() {
    return this.isInitialized;
  }
}

export const dashboardVoiceService = new DashboardVoiceService();