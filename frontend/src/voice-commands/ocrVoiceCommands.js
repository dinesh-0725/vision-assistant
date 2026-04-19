// src/voice-commands/ocrVoiceCommands.js
import { voiceService } from '../services/voiceService';

/**
 * OCR Scanner Voice Commands
 * Follows the same pattern as other voice command files
 */

export const createOCRVoiceCommands = (componentRef) => {
  const component = componentRef;
  
  const commands = {
    // Navigation commands
    'dashboard': () => {
      console.log('[Voice] Navigating to dashboard');
      if (component?.handleBackToDashboard) {
        component.handleBackToDashboard();
      }
    },
    
    'go to dashboard': () => {
      console.log('[Voice] Navigating to dashboard');
      if (component?.handleBackToDashboard) {
        component.handleBackToDashboard();
      }
    },
    
    'back to dashboard': () => {
      console.log('[Voice] Navigating to dashboard');
      if (component?.handleBackToDashboard) {
        component.handleBackToDashboard();
      }
    },
    
    'go back': () => {
      console.log('[Voice] Going back');
      if (component?.handleBackToDashboard) {
        component.handleBackToDashboard();
      }
    },
    
    'logout': () => {
      console.log('[Voice] Logging out');
      if (component?.handleLogout) {
        component.handleLogout();
      }
    },
    
    'sign out': () => {
      console.log('[Voice] Signing out');
      if (component?.handleLogout) {
        component.handleLogout();
      }
    },
    
    // Camera control commands
    'start camera': () => {
      console.log('[Voice] Starting camera');
      if (component?.startCamera) {
        component.startCamera();
        voiceService.speak('Camera started');
      }
    },
    
    'activate camera': () => {
      console.log('[Voice] Activating camera');
      if (component?.startCamera) {
        component.startCamera();
        voiceService.speak('Camera activated');
      }
    },
    
    'turn on camera': () => {
      console.log('[Voice] Turning on camera');
      if (component?.startCamera) {
        component.startCamera();
        voiceService.speak('Camera turned on');
      }
    },
    
    'stop camera': () => {
      console.log('[Voice] Stopping camera');
      if (component?.stopCamera) {
        component.stopCamera();
        voiceService.speak('Camera stopped');
      }
    },
    
    'deactivate camera': () => {
      console.log('[Voice] Deactivating camera');
      if (component?.stopCamera) {
        component.stopCamera();
        voiceService.speak('Camera deactivated');
      }
    },
    
    'turn off camera': () => {
      console.log('[Voice] Turning off camera');
      if (component?.stopCamera) {
        component.stopCamera();
        voiceService.speak('Camera turned off');
      }
    },
    
    // Capture commands
    'capture image': () => {
      console.log('[Voice] Capturing image');
      if (component?.captureFromCamera) {
        component.captureFromCamera();
        voiceService.speak('Capturing image');
      }
    },
    
    'take picture': () => {
      console.log('[Voice] Taking picture');
      if (component?.captureFromCamera) {
        component.captureFromCamera();
        voiceService.speak('Taking picture');
      }
    },
    
    'capture and analyze': () => {
      console.log('[Voice] Capturing and analyzing');
      if (component?.captureFromCamera) {
        component.captureFromCamera();
        voiceService.speak('Capturing and analyzing image');
      }
    },
    
    'scan now': () => {
      console.log('[Voice] Scanning now');
      if (component?.captureFromCamera) {
        component.captureFromCamera();
        voiceService.speak('Scanning now');
      }
    },
    
    // Upload commands
    'upload image': () => {
      console.log('[Voice] Triggering file upload');
      if (component?.triggerFileUpload) {
        component.triggerFileUpload();
        voiceService.speak('Opening file upload');
      }
    },
    
    'choose image': () => {
      console.log('[Voice] Choosing image');
      if (component?.triggerFileUpload) {
        component.triggerFileUpload();
        voiceService.speak('Choose an image to upload');
      }
    },
    
    'select file': () => {
      console.log('[Voice] Selecting file');
      if (component?.triggerFileUpload) {
        component.triggerFileUpload();
        voiceService.speak('Select a file to upload');
      }
    },
    
    // Analysis commands
    'analyze text': () => {
      console.log('[Voice] Analyzing text');
      if (component?.image && component?.performOCR) {
        component.performOCR(component.image);
        voiceService.speak('Analyzing text in image');
      } else {
        voiceService.speak('Please select an image first');
      }
    },
    
    'extract text': () => {
      console.log('[Voice] Extracting text');
      if (component?.image && component?.performOCR) {
        component.performOCR(component.image);
        voiceService.speak('Extracting text from image');
      } else {
        voiceService.speak('Please select an image first');
      }
    },
    
    'read text': () => {
      console.log('[Voice] Reading text');
      if (component?.image && component?.performOCR) {
        component.performOCR(component.image);
        voiceService.speak('Reading text from image');
      } else {
        voiceService.speak('Please select an image first');
      }
    },
    
    'process image': () => {
      console.log('[Voice] Processing image');
      if (component?.image && component?.performOCR) {
        component.performOCR(component.image);
        voiceService.speak('Processing image');
      } else {
        voiceService.speak('Please select an image first');
      }
    },
    
    // Result commands
    'copy text': () => {
      console.log('[Voice] Copying text to clipboard');
      if (component?.extractedText && component?.copyToClipboard) {
        component.copyToClipboard();
        voiceService.speak('Text copied to clipboard');
      } else {
        voiceService.speak('No text to copy');
      }
    },
    
    'copy to clipboard': () => {
      console.log('[Voice] Copying to clipboard');
      if (component?.extractedText && component?.copyToClipboard) {
        component.copyToClipboard();
        voiceService.speak('Copied to clipboard');
      } else {
        voiceService.speak('No text to copy');
      }
    },
    
    'download text': () => {
      console.log('[Voice] Downloading text');
      if (component?.extractedText) {
        const blob = new Blob([component.extractedText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `extracted-text-${new Date().toISOString().slice(0,10)}.txt`;
        a.click();
        URL.revokeObjectURL(url);
        voiceService.speak('Text downloaded');
      } else {
        voiceService.speak('No text to download');
      }
    },
    
    'save text': () => {
      console.log('[Voice] Saving text');
      if (component?.extractedText) {
        const blob = new Blob([component.extractedText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `extracted-text-${new Date().toISOString().slice(0,10)}.txt`;
        a.click();
        URL.revokeObjectURL(url);
        voiceService.speak('Text saved');
      } else {
        voiceService.speak('No text to save');
      }
    },
    
    // Clear commands
    'clear all': () => {
      console.log('[Voice] Clearing all results');
      if (component?.clearResults) {
        component.clearResults();
        voiceService.speak('All results cleared');
      }
    },
    
    'clear results': () => {
      console.log('[Voice] Clearing results');
      if (component?.clearResults) {
        component.clearResults();
        voiceService.speak('Results cleared');
      }
    },
    
    'reset scanner': () => {
      console.log('[Voice] Resetting scanner');
      if (component?.clearResults) {
        component.clearResults();
        voiceService.speak('Scanner reset');
      }
    },
    
    'start over': () => {
      console.log('[Voice] Starting over');
      if (component?.clearResults) {
        component.clearResults();
        voiceService.speak('Starting over');
      }
    },
    
    'clear text': () => {
      console.log('[Voice] Clearing text');
      if (component?.setExtractedText && component?.setShowResults && 
          component?.setTotalWords && component?.setTotalChars) {
        component.setExtractedText('');
        component.setShowResults(false);
        component.setTotalWords(0);
        component.setTotalChars(0);
        voiceService.speak('Text cleared');
      }
    },
    
    // Status and help commands
    'what is the status': () => {
      console.log('[Voice] Checking status');
      let statusMessage = 'Scanner is ready. ';
      
      if (component?.isCameraActive) {
        statusMessage += 'Camera is active. ';
      }
      
      if (component?.image) {
        statusMessage += 'Image is loaded. ';
      }
      
      if (component?.extractedText) {
        statusMessage += `Extracted ${component.totalWords} words.`;
      }
      
      voiceService.speak(statusMessage);
    },
    
    'status': () => {
      console.log('[Voice] Getting status');
      let statusMessage = '';
      
      if (component?.isLoading) {
        statusMessage = 'Currently analyzing text. Please wait.';
      } else if (component?.isCameraActive) {
        statusMessage = 'Camera is active. Say "capture image" to scan.';
      } else if (component?.extractedText) {
        statusMessage = `Scan complete. Found ${component.totalWords} words.`;
      } else {
        statusMessage = 'Ready. Say "start camera" or "upload image" to begin.';
      }
      
      voiceService.speak(statusMessage);
    },
    
    'help': () => {
      console.log('[Voice] Showing help');
      const helpText = 'You can say: Start camera, Stop camera, Capture image, Upload image, ' +
                      'Analyze text, Copy text, Download text, Clear all, or Dashboard to go back.';
      voiceService.speak(helpText);
    },
    
    'what can I say': () => {
      console.log('[Voice] Listing commands');
      voiceService.speak('Available commands: Start camera, Capture image, Upload image, Analyze, Copy, Clear, and Dashboard.');
    },
    
    'read extracted text': () => {
      console.log('[Voice] Reading extracted text');
      if (component?.extractedText && component.extractedText.length > 0) {
        const textToRead = component.extractedText.length > 200 
          ? component.extractedText.substring(0, 200) + '...' 
          : component.extractedText;
        voiceService.speak(`Extracted text: ${textToRead}`);
      } else {
        voiceService.speak('No text has been extracted yet');
      }
    },
    
    'read results': () => {
      console.log('[Voice] Reading results');
      if (component?.extractedText && component.extractedText.length > 0) {
        voiceService.speak(`Found ${component.totalWords} words and ${component.totalChars} characters.`);
      } else {
        voiceService.speak('No results available');
      }
    },
    
    // Change image commands
    'change image': () => {
      console.log('[Voice] Changing image');
      if (component?.setImage) {
        component.setImage(null);
        voiceService.speak('Image cleared. You can now upload a new image or use camera.');
      }
    },
    
    'new image': () => {
      console.log('[Voice] New image');
      if (component?.clearResults) {
        component.clearResults();
        voiceService.speak('Ready for new image');
      }
    },
    
    'change image': () => {
      console.log('[Voice] Changing image');
      if (component?.setImage) {
        component.setImage(null);
        voiceService.speak('Image cleared. You can now upload a new image or use camera.');
      }
    },
    
    'new image': () => {
      console.log('[Voice] New image');
      if (component?.clearResults) {
        component.clearResults();
        voiceService.speak('Ready for new image');
      }
    }
  };
  
  return commands;
};

/**
 * Initialize OCR voice commands with the voice service
 * @param {Object} componentRef - Reference to OCRScanner component methods
 */
export const initializeOCRVoiceCommands = (componentRef) => {
  console.log('[Voice] Initializing OCR voice commands');
  
  const commands = createOCRVoiceCommands(componentRef);
  
  // Clear existing commands and set feature
  voiceService.clearFeatureCommands();
  voiceService.setFeature('ocr');
  
  // Register all commands
  Object.entries(commands).forEach(([command, handler]) => {
    voiceService.registerCommand(command, handler);
  });
  
  console.log(`[Voice] Registered ${Object.keys(commands).length} OCR commands`);
  
  return {
    commands,
    cleanup: () => {
      console.log('[Voice] Cleaning up OCR voice commands');
      // Navigation commands that should persist
      const navigationCommands = [
        'dashboard', 'go to dashboard', 'back to dashboard', 'go back',
        'logout', 'sign out', 'help', 'what can i say'
      ];
      
      // Clear non-navigation commands
      Object.keys(commands).forEach(command => {
        if (!navigationCommands.includes(command)) {
          // Note: voiceService doesn't have unregisterCommand, 
          // but clearFeatureCommands will be called when switching features
        }
      });
    }
  };
};

export default createOCRVoiceCommands;