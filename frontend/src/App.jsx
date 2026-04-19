

import React from "react";
import AppRoutes from "./routes/AppRoutes";
import VoiceAssistant from './components/VoiceAssistant/VoiceAssistant';

function App() {
  return (
    <div className="App">
      <AppRoutes />
      <VoiceAssistant />
    </div>
  );
}

export default App;
