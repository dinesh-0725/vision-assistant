//src/voice-commands/index.js

export { navigationVoiceCommands } from './navigationVoiceCommands';
export { createNewsVoiceCommands } from './newsVoiceCommands';
export { createWeatherVoiceCommands } from './weatherVoiceCommands';
export { createObjectDetectionVoiceCommands } from './objectDetectionVoiceCommands';
export { createAuthVoiceCommands } from './authVoiceCommands';
export { createOCRVoiceCommands, initializeOCRVoiceCommands } from './ocrVoiceCommands';

// export * from './medicationVoiceCommands';
// Helper function to merge commands
export const mergeCommands = (baseCommands, additionalCommands) => {
  return { ...baseCommands, ...additionalCommands };
};