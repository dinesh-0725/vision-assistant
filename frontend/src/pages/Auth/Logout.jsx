


// import React from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const LogoutButton = () => {
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const refresh_token = localStorage.getItem("refresh_token"); // optional

//       if (!token) {
//         navigate("/");
//         return;
//       }

//       // Call backend logout
//       const response = await axios.post(
//         "http://127.0.0.1:8000/auth/voice-logout/",
//         { refresh_token },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       console.log("Logout backend response:", response.data);
//     } catch (error) {
//       console.error("Logout error:", error.response?.data || error.message);
//     } finally {
//       // Always clear local storage and redirect
//       localStorage.clear();
//       navigate("/");
//     }
//   };

//   return (
//     <button onClick={handleLogout} className="action-btn">
//       Logout
//     </button>
//   );
// };

// export default LogoutButton;



import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { voiceService } from "../../services/voiceService";

const LogoutButton = () => {
  const navigate = useNavigate();
  const logoutRegisteredRef = useRef(false);

  useEffect(() => {
    // Only register logout commands once
    if (!logoutRegisteredRef.current) {
      registerLogoutCommands();
      logoutRegisteredRef.current = true;
    }

    return () => {
      // Don't clear all commands, just remove logout-specific ones
      // The parent component should handle command cleanup
    };
  }, []);

  const registerLogoutCommands = () => {
    console.log("Registering logout voice commands");
    
    // Register logout command
    voiceService.registerCommand("logout", async () => {
      console.log("Logout voice command received");
      await handleLogout();
    });
    
    voiceService.registerCommand("sign out", async () => {
      console.log("Sign out voice command received");
      await handleLogout();
    });
    
    voiceService.registerCommand("log out", async () => {
      console.log("Log out voice command received");
      await handleLogout();
    });
    
    voiceService.registerCommand("exit", async () => {
      console.log("Exit voice command received");
      await handleLogout();
    });
    
    voiceService.registerCommand("quit", async () => {
      console.log("Quit voice command received");
      await handleLogout();
    });
    
    voiceService.registerCommand("back to login", async () => {
      console.log("Back to login voice command received");
      await handleLogout();
    });
    
    voiceService.registerCommand("return to login", async () => {
      console.log("Return to login voice command received");
      await handleLogout();
    });
    
    voiceService.registerCommand("go to login", async () => {
      console.log("Go to login voice command received");
      await handleLogout();
    });
  };

  const speak = (text) => {
    return new Promise((resolve) => {
      const synth = window.speechSynthesis;
      if (!synth) {
        resolve();
        return;
      }
      
      synth.cancel();
      
      const utter = new SpeechSynthesisUtterance(text);
      utter.rate = 0.8;
      utter.pitch = 1;
      utter.volume = 1;
      
      utter.onend = () => {
        resolve();
      };
      
      utter.onerror = () => {
        resolve();
      };
      
      synth.speak(utter);
    });
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      const refresh_token = localStorage.getItem("refresh_token"); // optional

      if (!token) {
        await speak("Logging out");
        localStorage.clear();
        navigate("/");
        return;
      }

      // Speak logout confirmation
      await speak("Logging out...");

      // Call backend logout
      const response = await axios.post(
        "http://127.0.0.1:8000/auth/voice-logout/",
        { refresh_token },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Logout backend response:", response.data);
      
      // Speak success message if available
      if (response.data.spoken_response) {
        await speak(response.data.spoken_response);
      }
    } catch (error) {
      console.error("Logout error:", error.response?.data || error.message);
      // Still speak logout message even if backend fails
      await speak("Logged out successfully");
    } finally {
      // Always clear local storage and redirect
      localStorage.clear();
      navigate("/");
    }
  };

  return (
    <button onClick={handleLogout} className="action-btn">
      Logout
    </button>
  );
};

export default LogoutButton;