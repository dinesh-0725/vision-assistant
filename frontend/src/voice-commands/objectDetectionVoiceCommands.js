

// //src/voice-commands/objectDetectionVoiceCommands.js
// export const createObjectDetectionVoiceCommands = (detectionState, actions) => {
//   const { 
//     startDetection, 
//     stopDetection, 
//     captureImage,
//     toggleCamera
//   } = actions;

//   return {
//     'detect objects': () => {
//       startDetection();
//       return "Starting object detection";
//     },
    
//     'start detection': () => {
//       startDetection();
//       return "Starting object detection";
//     },
    
//     'stop detection': () => {
//       stopDetection();
//       return "Stopping detection";
//     },
    
//     'capture image': () => {
//       captureImage();
//       return "Capturing image";
//     },
    
//     'take picture': () => {
//       captureImage();
//       return "Taking picture";
//     },
    
//     'toggle camera': () => {
//       toggleCamera();
//       return "Toggling camera";
//     },
    
//     'switch camera': () => {
//       toggleCamera();
//       return "Switching camera";
//     },
    
//     'detection help': () => {
//       return "Say: detect objects, stop detection, capture image, or toggle camera";
//     }
//   };
// };


export const createObjectDetectionVoiceCommands = (detectionState, actions) => {
  const { 
    startDetection, 
    stopDetection, 
    captureImage,
    toggleCamera,
    uploadImage,
    clearResults,
    goBack,
    whatDoYouSee,
    help
  } = actions;

  const { cameraActive, realTimeActive, modelLoaded, hasPredictions } = detectionState;

  return {
    // Basic detection commands
    'detect objects': () => {
      startDetection();
      return "Starting object detection";
    },
    
    'start detection': () => {
      startDetection();
      return "Starting object detection";
    },
    
    'stop detection': () => {
      stopDetection();
      return "Stopping detection";
    },
    
    // Camera control
    'capture image': () => {
      captureImage();
      return "Capturing image";
    },
    
    'take picture': () => {
      captureImage();
      return "Taking picture";
    },
    
    'toggle camera': () => {
      toggleCamera();
      return cameraActive ? "Stopping camera" : "Starting camera";
    },
    
    'switch camera': () => {
      toggleCamera();
      return cameraActive ? "Switching camera off" : "Switching camera on";
    },
    
    // Additional comprehensive commands
    'upload image': () => {
      uploadImage();
      return "Ready to upload image";
    },
    
    'clear results': () => {
      clearResults();
      return "Clearing results";
    },
    
    'clear detection': () => {
      clearResults();
      return "Clearing detection results";
    },
    
    'go back': () => {
      goBack();
      return "Returning to dashboard";
    },
    
    'return to dashboard': () => {
      goBack();
      return "Going back to dashboard";
    },
    
    'what do you see': () => {
      whatDoYouSee();
      return hasPredictions ? "Announcing detected objects" : "Checking camera status";
    },
    
    'describe scene': () => {
      whatDoYouSee();
      return "Describing the current scene";
    },
    
    'help': () => {
      help();
      return "Listing available commands";
    },
    
    'detection help': () => {
      help();
      return "Here are the available commands";
    },
    
    'status report': () => {
      if (cameraActive) {
        if (realTimeActive) {
          return `Camera is active with real-time detection. ${hasPredictions ? 'Objects detected.' : 'No objects detected yet.'}`;
        }
        return `Camera is active. ${hasPredictions ? 'Objects detected from last capture.' : 'No detection results.'}`;
      }
      return "Camera is inactive. Say 'start camera' to begin.";
    }
  };
};