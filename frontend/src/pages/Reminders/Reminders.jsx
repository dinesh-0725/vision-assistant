// // // // // // // // import React, { useState, useEffect, useRef } from 'react';
// // // // // // // // import './Reminders.css';

// // // // // // // // const RemindersPage = () => {
// // // // // // // //   const [reminders, setReminders] = useState([]);
// // // // // // // //   const [isListening, setIsListening] = useState(false);
// // // // // // // //   const [status, setStatus] = useState('Ready');
// // // // // // // //   const recognitionRef = useRef(null);

// // // // // // // //   // Initialize Speech Recognition
// // // // // // // //   useEffect(() => {
// // // // // // // //     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
// // // // // // // //     if (SpeechRecognition) {
// // // // // // // //       const recognition = new SpeechRecognition();
// // // // // // // //       recognition.continuous = false;
// // // // // // // //       recognition.interimResults = false;
// // // // // // // //       recognition.lang = 'en-US';

// // // // // // // //       recognition.onstart = () => {
// // // // // // // //         setIsListening(true);
// // // // // // // //         setStatus('Listening...');
// // // // // // // //       };

// // // // // // // //       recognition.onresult = (event) => {
// // // // // // // //         const transcript = event.results[0][0].transcript.toLowerCase();
// // // // // // // //         setStatus(`Heard: "${transcript}"`);
// // // // // // // //         handleVoiceCommand(transcript);
// // // // // // // //       };

// // // // // // // //       recognition.onerror = (event) => {
// // // // // // // //         console.error('Speech recognition error:', event.error);
// // // // // // // //         setStatus(`Error: ${event.error}`);
// // // // // // // //         setIsListening(false);
// // // // // // // //       };

// // // // // // // //       recognition.onend = () => {
// // // // // // // //         setIsListening(false);
// // // // // // // //         setStatus('Ready');
// // // // // // // //       };

// // // // // // // //       recognitionRef.current = recognition;
// // // // // // // //     } else {
// // // // // // // //       setStatus('Speech Recognition not supported in this browser');
// // // // // // // //     }

// // // // // // // //     // Load reminders from localStorage
// // // // // // // //     const saved = JSON.parse(localStorage.getItem('visiona-reminders')) || [];
// // // // // // // //     setReminders(saved);
    
// // // // // // // //     // Restore active reminders
// // // // // // // //     saved.forEach(reminder => {
// // // // // // // //       if (reminder.active && new Date(reminder.time) > new Date()) {
// // // // // // // //         scheduleReminder(reminder);
// // // // // // // //       }
// // // // // // // //     });

// // // // // // // //     return () => {
// // // // // // // //       if (recognitionRef.current) {
// // // // // // // //         recognitionRef.current.stop();
// // // // // // // //       }
// // // // // // // //     };
// // // // // // // //   }, []);

// // // // // // // //   // Save reminders to localStorage
// // // // // // // //   useEffect(() => {
// // // // // // // //     localStorage.setItem('visiona-reminders', JSON.stringify(reminders));
// // // // // // // //   }, [reminders]);

// // // // // // // //   // Parse time from voice command
// // // // // // // //   const parseTime = (text) => {
// // // // // // // //     const now = new Date();
// // // // // // // //     const tomorrow = new Date();
// // // // // // // //     tomorrow.setDate(tomorrow.getDate() + 1);
    
// // // // // // // //     // Patterns for time parsing
// // // // // // // //     const patterns = [
// // // // // // // //       { regex: /(\d{1,2})\s*(am|pm)/i, base: now },
// // // // // // // //       { regex: /at\s*(\d{1,2})\s*(am|pm)/i, base: now },
// // // // // // // //       { regex: /(\d{1,2}):(\d{2})\s*(am|pm)/i, base: now },
// // // // // // // //       { regex: /tomorrow\s*(\d{1,2})\s*(am|pm)/i, base: tomorrow },
// // // // // // // //       { regex: /tomorrow\s*at\s*(\d{1,2})\s*(am|pm)/i, base: tomorrow },
// // // // // // // //       { regex: /tomorrow\s*(\d{1,2}):(\d{2})\s*(am|pm)/i, base: tomorrow },
// // // // // // // //     ];

// // // // // // // //     for (const pattern of patterns) {
// // // // // // // //       const match = text.match(pattern.regex);
// // // // // // // //       if (match) {
// // // // // // // //         let hours = parseInt(match[1]);
// // // // // // // //         const minutes = match[3] ? parseInt(match[3]) : 0;
// // // // // // // //         const period = match[2] || match[4];
        
// // // // // // // //         // Convert to 24-hour format
// // // // // // // //         if (period.toLowerCase() === 'pm' && hours < 12) hours += 12;
// // // // // // // //         if (period.toLowerCase() === 'am' && hours === 12) hours = 0;
        
// // // // // // // //         const time = new Date(pattern.base);
// // // // // // // //         time.setHours(hours, minutes, 0, 0);
        
// // // // // // // //         // If time is in the past, schedule for next day
// // // // // // // //         if (time < new Date() && pattern.base === now) {
// // // // // // // //           time.setDate(time.getDate() + 1);
// // // // // // // //         }
        
// // // // // // // //         return time;
// // // // // // // //       }
// // // // // // // //     }
    
// // // // // // // //     // Default: 1 hour from now
// // // // // // // //     const defaultTime = new Date();
// // // // // // // //     defaultTime.setHours(defaultTime.getHours() + 1);
// // // // // // // //     return defaultTime;
// // // // // // // //   };

// // // // // // // //   // Extract reminder text from command
// // // // // // // //   const extractReminderText = (command) => {
// // // // // // // //     // Remove time-related phrases
// // // // // // // //     const timePatterns = [
// // // // // // // //       /\b(at\s*\d{1,2}\s*(am|pm))\b/i,
// // // // // // // //       /\b(\d{1,2}:\d{2}\s*(am|pm))\b/i,
// // // // // // // //       /\b(tomorrow\s*\d{1,2}\s*(am|pm))\b/i,
// // // // // // // //       /\b(tomorrow\s*at\s*\d{1,2}\s*(am|pm))\b/i,
// // // // // // // //       /\b(set|add)\s+reminder\s*/i,
// // // // // // // //       /\btoday\s*/i,
// // // // // // // //     ];
    
// // // // // // // //     let text = command;
// // // // // // // //     timePatterns.forEach(pattern => {
// // // // // // // //       text = text.replace(pattern, '');
// // // // // // // //     });
    
// // // // // // // //     return text.trim().replace(/\s+/g, ' ');
// // // // // // // //   };

// // // // // // // //   // Handle voice commands
// // // // // // // //   const handleVoiceCommand = (command) => {
// // // // // // // //     const cmd = command.toLowerCase().trim();
    
// // // // // // // //     if (cmd === 'reminders' || cmd === 'open reminders') {
// // // // // // // //       setStatus('Reminders page is already open');
// // // // // // // //       speak('You are on the reminders page');
// // // // // // // //       return;
// // // // // // // //     }

// // // // // // // //     if (cmd.includes('set reminder') || cmd.includes('add reminder')) {
// // // // // // // //       const time = parseTime(cmd);
// // // // // // // //       const text = extractReminderText(cmd);
      
// // // // // // // //       if (text) {
// // // // // // // //         const newReminder = {
// // // // // // // //           id: Date.now(),
// // // // // // // //           text,
// // // // // // // //           time: time.toISOString(),
// // // // // // // //           active: true,
// // // // // // // //           createdAt: new Date().toISOString()
// // // // // // // //         };
        
// // // // // // // //         setReminders(prev => [...prev, newReminder]);
// // // // // // // //         scheduleReminder(newReminder);
        
// // // // // // // //         const timeStr = time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
// // // // // // // //         speak(`Reminder set for ${timeStr}: ${text}`);
// // // // // // // //         setStatus(`Added: "${text}" at ${timeStr}`);
// // // // // // // //       } else {
// // // // // // // //         speak('Please specify what to remember');
// // // // // // // //         setStatus('No reminder text found');
// // // // // // // //       }
// // // // // // // //     } else if (cmd.includes('show my reminders') || cmd.includes('list reminders')) {
// // // // // // // //       if (reminders.length === 0) {
// // // // // // // //         speak('You have no reminders');
// // // // // // // //         setStatus('No reminders found');
// // // // // // // //       } else {
// // // // // // // //         const count = reminders.length;
// // // // // // // //         speak(`You have ${count} reminder${count === 1 ? '' : 's'}`);
// // // // // // // //         reminders.forEach((reminder, index) => {
// // // // // // // //           setTimeout(() => {
// // // // // // // //             speak(`Reminder ${index + 1}: ${reminder.text} at ${formatTime(reminder.time)}`);
// // // // // // // //           }, index * 1500);
// // // // // // // //         });
// // // // // // // //         setStatus(`Showing ${count} reminder${count === 1 ? '' : 's'}`);
// // // // // // // //       }
// // // // // // // //     } else if (cmd.includes('delete reminder')) {
// // // // // // // //       // Extract number from command
// // // // // // // //       const numMatch = cmd.match(/reminder\s+(\d+)/i) || cmd.match(/delete\s+(\d+)/i);
// // // // // // // //       if (numMatch) {
// // // // // // // //         const index = parseInt(numMatch[1]) - 1;
// // // // // // // //         if (index >= 0 && index < reminders.length) {
// // // // // // // //           const toDelete = reminders[index];
// // // // // // // //           setReminders(prev => prev.filter((_, i) => i !== index));
// // // // // // // //           speak(`Deleted reminder ${index + 1}`);
// // // // // // // //           setStatus(`Deleted: "${toDelete.text}"`);
// // // // // // // //         } else {
// // // // // // // //           speak(`Reminder ${index + 1} not found`);
// // // // // // // //           setStatus('Invalid reminder number');
// // // // // // // //         }
// // // // // // // //       } else {
// // // // // // // //         speak('Please specify which reminder to delete. Say something like "delete reminder one"');
// // // // // // // //         setStatus('Specify reminder number');
// // // // // // // //       }
// // // // // // // //     } else if (cmd.includes('clear all reminders')) {
// // // // // // // //       if (reminders.length > 0) {
// // // // // // // //         setReminders([]);
// // // // // // // //         speak('All reminders cleared');
// // // // // // // //         setStatus('All reminders cleared');
// // // // // // // //       } else {
// // // // // // // //         speak('No reminders to clear');
// // // // // // // //         setStatus('No reminders to clear');
// // // // // // // //       }
// // // // // // // //     } else if (cmd.includes('what can i say') || cmd.includes('help')) {
// // // // // // // //       speak('You can say: set reminder at 3 pm take medicine, show my reminders, delete reminder one, or clear all reminders');
// // // // // // // //       setStatus('Try: "set reminder at 7 pm take medicine"');
// // // // // // // //     } else {
// // // // // // // //       speak('Command not recognized. Say "help" to hear available commands');
// // // // // // // //       setStatus('Try: "set reminder at 7 pm take medicine"');
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   // Schedule a reminder alert
// // // // // // // //   const scheduleReminder = (reminder) => {
// // // // // // // //     const reminderTime = new Date(reminder.time);
// // // // // // // //     const now = new Date();
// // // // // // // //     const delay = reminderTime.getTime() - now.getTime();
    
// // // // // // // //     if (delay > 0) {
// // // // // // // //       setTimeout(() => {
// // // // // // // //         speak(`Reminder: ${reminder.text}`);
        
// // // // // // // //         // Update reminder as inactive
// // // // // // // //         setReminders(prev => 
// // // // // // // //           prev.map(r => 
// // // // // // // //             r.id === reminder.id ? { ...r, active: false } : r
// // // // // // // //           )
// // // // // // // //         );
        
// // // // // // // //         // Visual notification
// // // // // // // //         if (document.visibilityState === 'visible') {
// // // // // // // //           setStatus(`🔔 Reminder: ${reminder.text}`);
// // // // // // // //         }
// // // // // // // //       }, delay);
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   // Speak text
// // // // // // // //   const speak = (text) => {
// // // // // // // //     if ('speechSynthesis' in window) {
// // // // // // // //       const utterance = new SpeechSynthesisUtterance(text);
// // // // // // // //       utterance.rate = 1.0;
// // // // // // // //       utterance.pitch = 1.0;
// // // // // // // //       utterance.volume = 1.0;
// // // // // // // //       window.speechSynthesis.speak(utterance);
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   // Start listening
// // // // // // // //   const startListening = () => {
// // // // // // // //     if (recognitionRef.current) {
// // // // // // // //       try {
// // // // // // // //         recognitionRef.current.start();
// // // // // // // //       } catch (error) {
// // // // // // // //         setStatus('Microphone access needed. Please allow permission.');
// // // // // // // //         speak('Please allow microphone access');
// // // // // // // //       }
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   // Format time for display
// // // // // // // //   const formatTime = (timeString) => {
// // // // // // // //     const time = new Date(timeString);
// // // // // // // //     return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
// // // // // // // //   };

// // // // // // // //   // Format date for display
// // // // // // // //   const formatDate = (timeString) => {
// // // // // // // //     const date = new Date(timeString);
// // // // // // // //     const today = new Date();
// // // // // // // //     const tomorrow = new Date();
// // // // // // // //     tomorrow.setDate(tomorrow.getDate() + 1);
    
// // // // // // // //     if (date.toDateString() === today.toDateString()) {
// // // // // // // //       return 'Today';
// // // // // // // //     } else if (date.toDateString() === tomorrow.toDateString()) {
// // // // // // // //       return 'Tomorrow';
// // // // // // // //     } else {
// // // // // // // //       return date.toLocaleDateString();
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   // Delete a reminder
// // // // // // // //   const deleteReminder = (id) => {
// // // // // // // //     setReminders(prev => prev.filter(r => r.id !== id));
// // // // // // // //     speak('Reminder deleted');
// // // // // // // //   };

// // // // // // // //   return (
// // // // // // // //     <div className="reminders-page">
// // // // // // // //       <div className="reminders-container">
// // // // // // // //         <header className="reminders-header">
// // // // // // // //           <h1>Voice-Controlled Reminders</h1>
// // // // // // // //           <p className="subtitle">Set reminders using just your voice. Works completely offline.</p>
// // // // // // // //         </header>
        
// // // // // // // //         <div className="status-box">
// // // // // // // //           <div className={`status ${isListening ? 'listening' : ''}`}>
// // // // // // // //             {status}
// // // // // // // //           </div>
// // // // // // // //         </div>
        
// // // // // // // //         <div className="mic-section">
// // // // // // // //           <button 
// // // // // // // //             className={`mic-button ${isListening ? 'listening' : ''}`}
// // // // // // // //             onClick={startListening}
// // // // // // // //             aria-label={isListening ? 'Listening... Click to stop' : 'Click and speak to set reminder'}
// // // // // // // //             disabled={isListening}
// // // // // // // //           >
// // // // // // // //             <div className="mic-icon">
// // // // // // // //               {isListening ? '🔴' : '🎤'}
// // // // // // // //             </div>
// // // // // // // //             <div className="mic-text">
// // // // // // // //               {isListening ? 'Listening...' : 'Click & Speak'}
// // // // // // // //             </div>
// // // // // // // //           </button>
// // // // // // // //           <p className="mic-hint">Allow microphone access when prompted</p>
// // // // // // // //         </div>
        
// // // // // // // //         <div className="commands-section">
// // // // // // // //           <h2>Try saying:</h2>
// // // // // // // //           <div className="commands-grid">
// // // // // // // //             <div className="command-card">
// // // // // // // //               <span className="command-example">"Set reminder at 7 pm take medicine"</span>
// // // // // // // //               <span className="command-desc">Set a time-based reminder</span>
// // // // // // // //             </div>
// // // // // // // //             <div className="command-card">
// // // // // // // //               <span className="command-example">"Add reminder tomorrow 9 am meeting"</span>
// // // // // // // //               <span className="command-desc">Schedule for tomorrow</span>
// // // // // // // //             </div>
// // // // // // // //             <div className="command-card">
// // // // // // // //               <span className="command-example">"Show my reminders"</span>
// // // // // // // //               <span className="command-desc">List all reminders</span>
// // // // // // // //             </div>
// // // // // // // //             <div className="command-card">
// // // // // // // //               <span className="command-example">"Delete reminder one"</span>
// // // // // // // //               <span className="command-desc">Remove a reminder</span>
// // // // // // // //             </div>
// // // // // // // //           </div>
// // // // // // // //         </div>
        
// // // // // // // //         <div className="reminders-section">
// // // // // // // //           <div className="section-header">
// // // // // // // //             <h2>Your Reminders</h2>
// // // // // // // //             <div className="reminder-count">{reminders.length} total</div>
// // // // // // // //           </div>
          
// // // // // // // //           {reminders.length === 0 ? (
// // // // // // // //             <div className="empty-state">
// // // // // // // //               <div className="empty-icon">⏰</div>
// // // // // // // //               <h3>No reminders yet</h3>
// // // // // // // //               <p>Use the microphone button above to add your first reminder!</p>
// // // // // // // //             </div>
// // // // // // // //           ) : (
// // // // // // // //             <div className="reminders-list">
// // // // // // // //               {reminders.map((reminder, index) => (
// // // // // // // //                 <div key={reminder.id} className={`reminder-item ${reminder.active ? 'active' : 'inactive'}`}>
// // // // // // // //                   <div className="reminder-header">
// // // // // // // //                     <span className="reminder-number">#{index + 1}</span>
// // // // // // // //                     <span className="reminder-status">
// // // // // // // //                       {reminder.active ? '⏰ Active' : '✓ Done'}
// // // // // // // //                     </span>
// // // // // // // //                   </div>
// // // // // // // //                   <div className="reminder-content">
// // // // // // // //                     <div className="reminder-text">{reminder.text}</div>
// // // // // // // //                     <div className="reminder-time">
// // // // // // // //                       <span className="date">{formatDate(reminder.time)}</span>
// // // // // // // //                       <span className="time">{formatTime(reminder.time)}</span>
// // // // // // // //                     </div>
// // // // // // // //                   </div>
// // // // // // // //                   <button 
// // // // // // // //                     className="delete-button"
// // // // // // // //                     onClick={() => deleteReminder(reminder.id)}
// // // // // // // //                     aria-label={`Delete reminder ${index + 1}`}
// // // // // // // //                   >
// // // // // // // //                     🗑️
// // // // // // // //                   </button>
// // // // // // // //                 </div>
// // // // // // // //               ))}
// // // // // // // //             </div>
// // // // // // // //           )}
          
// // // // // // // //           {reminders.length > 0 && (
// // // // // // // //             <button 
// // // // // // // //               className="clear-all-btn"
// // // // // // // //               onClick={() => {
// // // // // // // //                 if (window.confirm('Clear all reminders?')) {
// // // // // // // //                   setReminders([]);
// // // // // // // //                   speak('All reminders cleared');
// // // // // // // //                 }
// // // // // // // //               }}
// // // // // // // //             >
// // // // // // // //               🗑️ Clear All Reminders
// // // // // // // //             </button>
// // // // // // // //           )}
// // // // // // // //         </div>
        
// // // // // // // //         <div className="info-section">
// // // // // // // //           <h3>How it works</h3>
// // // // // // // //           <div className="info-grid">
// // // // // // // //             <div className="info-card">
// // // // // // // //               <div className="info-icon">🎤</div>
// // // // // // // //               <h4>Voice Commands</h4>
// // // // // // // //               <p>Speak naturally to set, view, or delete reminders</p>
// // // // // // // //             </div>
// // // // // // // //             <div className="info-card">
// // // // // // // //               <div className="info-icon">💾</div>
// // // // // // // //               <h4>Local Storage</h4>
// // // // // // // //               <p>Reminders saved in your browser, no account needed</p>
// // // // // // // //             </div>
// // // // // // // //             <div className="info-card">
// // // // // // // //               <div className="info-icon">🔔</div>
// // // // // // // //               <h4>Voice Alerts</h4>
// // // // // // // //               <p>Reminders speak aloud at the scheduled time</p>
// // // // // // // //             </div>
// // // // // // // //             <div className="info-card">
// // // // // // // //               <div className="info-icon">🔒</div>
// // // // // // // //               <h4>Privacy Focused</h4>
// // // // // // // //               <p>No data sent to servers, works completely offline</p>
// // // // // // // //             </div>
// // // // // // // //           </div>
// // // // // // // //         </div>
// // // // // // // //       </div>
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // };

// // // // // // // // export default RemindersPage;









// // // // // // // import React, { useState, useEffect, useRef, useCallback } from 'react';
// // // // // // // import { useVoiceCommands } from '../../components/VoiceAssistant/useVoiceCommands';
// // // // // // // import './Reminders.css';

// // // // // // // const RemindersPage = () => {
// // // // // // //   const [reminders, setReminders] = useState([]);
// // // // // // //   const [status, setStatus] = useState('Ready to listen');
// // // // // // //   const [activeReminder, setActiveReminder] = useState(null);
// // // // // // //   const [showHelp, setShowHelp] = useState(false);
// // // // // // //   const voiceInitialized = useRef(false);
  
// // // // // // //   const { 
// // // // // // //     startListening, 
// // // // // // //     stopListening, 
// // // // // // //     speak, 
// // // // // // //     registerCommands,
// // // // // // //     isListening 
// // // // // // //   } = useVoiceCommands();

// // // // // // //   // Initialize voice commands
// // // // // // //   useEffect(() => {
// // // // // // //     if (!voiceInitialized.current) {
// // // // // // //       const commands = {
// // // // // // //         // Reminder commands
// // // // // // //         'reminders': () => {
// // // // // // //           speak('You are on the reminders page. You can say: set reminder, show reminders, or delete reminder.');
// // // // // // //         },
        
// // // // // // //         'set reminder (.*)': (match) => {
// // // // // // //           handleSetReminder(match[1]);
// // // // // // //         },
        
// // // // // // //         'add reminder (.*)': (match) => {
// // // // // // //           handleSetReminder(match[1]);
// // // // // // //         },
        
// // // // // // //         'show reminders': () => {
// // // // // // //           handleShowReminders();
// // // // // // //         },
        
// // // // // // //         'list reminders': () => {
// // // // // // //           handleShowReminders();
// // // // // // //         },
        
// // // // // // //         'delete reminder (.*)': (match) => {
// // // // // // //           handleDeleteReminder(match[1]);
// // // // // // //         },
        
// // // // // // //         'delete reminder number (\\d+)': (match) => {
// // // // // // //           handleDeleteReminder(match[1]);
// // // // // // //         },
        
// // // // // // //         'clear all reminders': () => {
// // // // // // //           handleClearAllReminders();
// // // // // // //         },
        
// // // // // // //         'reminder help': () => {
// // // // // // //           setShowHelp(true);
// // // // // // //           speak('Here are the available commands: set reminder at time, show reminders, delete reminder number, clear all reminders');
// // // // // // //         },
        
// // // // // // //         'go back': () => {
// // // // // // //           window.location.href = '/dashboard';
// // // // // // //         },
        
// // // // // // //         'go to dashboard': () => {
// // // // // // //           window.location.href = '/dashboard';
// // // // // // //         },
        
// // // // // // //         'help': () => {
// // // // // // //           speak('You can say: set reminder at 3 pm take medicine, show reminders, delete reminder one, or clear all reminders');
// // // // // // //         }
// // // // // // //       };

// // // // // // //       registerCommands(commands);
// // // // // // //       voiceInitialized.current = true;
      
// // // // // // //       // Auto-start listening on page load
// // // // // // //       setTimeout(() => {
// // // // // // //         startListening();
// // // // // // //         speak('Reminders page loaded. Say "set reminder at time" to add a reminder, or "help" for commands.');
// // // // // // //       }, 500);
// // // // // // //     }

// // // // // // //     // Load reminders from localStorage
// // // // // // //     const savedReminders = JSON.parse(localStorage.getItem('visiona-reminders')) || [];
// // // // // // //     if (savedReminders.length > 0) {
// // // // // // //       setReminders(savedReminders);
// // // // // // //       // Reschedule any active reminders
// // // // // // //       savedReminders.forEach(reminder => {
// // // // // // //         if (reminder.active && new Date(reminder.time) > new Date()) {
// // // // // // //           scheduleReminder(reminder);
// // // // // // //         }
// // // // // // //       });
// // // // // // //     }

// // // // // // //     return () => {
// // // // // // //       stopListening();
// // // // // // //     };
// // // // // // //   }, [registerCommands, speak, startListening, stopListening]);

// // // // // // //   // Save reminders to localStorage whenever they change
// // // // // // //   useEffect(() => {
// // // // // // //     localStorage.setItem('visiona-reminders', JSON.stringify(reminders));
// // // // // // //   }, [reminders]);

// // // // // // //   // Parse time from voice command
// // // // // // //   const parseTimeFromSpeech = (text) => {
// // // // // // //     const now = new Date();
// // // // // // //     const tomorrow = new Date();
// // // // // // //     tomorrow.setDate(tomorrow.getDate() + 1);
    
// // // // // // //     // Common time patterns
// // // // // // //     const timePatterns = [
// // // // // // //       // "at 7 pm" or "7 pm"
// // // // // // //       { regex: /(?:at\s+)?(\d{1,2})\s*(am|pm)/i, base: now },
// // // // // // //       // "at 7:30 pm" or "7:30 pm"
// // // // // // //       { regex: /(?:at\s+)?(\d{1,2}):(\d{2})\s*(am|pm)/i, base: now },
// // // // // // //       // "tomorrow 9 am" or "tomorrow at 9 am"
// // // // // // //       { regex: /tomorrow\s+(?:at\s+)?(\d{1,2})\s*(am|pm)/i, base: tomorrow },
// // // // // // //       // "tomorrow 9:30 am"
// // // // // // //       { regex: /tomorrow\s+(?:at\s+)?(\d{1,2}):(\d{2})\s*(am|pm)/i, base: tomorrow },
// // // // // // //       // "in 1 hour" or "in 2 hours"
// // // // // // //       { regex: /in\s+(\d+)\s+hour(?:s)?/i, base: now },
// // // // // // //       // "in 30 minutes" or "in 15 minutes"
// // // // // // //       { regex: /in\s+(\d+)\s+minute(?:s)?/i, base: now },
// // // // // // //     ];

// // // // // // //     for (const pattern of patterns) {
// // // // // // //       const match = text.match(pattern.regex);
// // // // // // //       if (match) {
// // // // // // //         let hours = parseInt(match[1]);
// // // // // // //         const minutes = match[3] ? parseInt(match[3]) : 0;
// // // // // // //         const period = match[2] || match[4];
        
// // // // // // //         // Handle relative times
// // // // // // //         if (pattern.regex.toString().includes('in')) {
// // // // // // //           const time = new Date(pattern.base);
// // // // // // //           if (pattern.regex.toString().includes('hour')) {
// // // // // // //             time.setHours(time.getHours() + hours);
// // // // // // //           } else if (pattern.regex.toString().includes('minute')) {
// // // // // // //             time.setMinutes(time.getMinutes() + hours); // hours variable contains minutes here
// // // // // // //           }
// // // // // // //           return time;
// // // // // // //         }
        
// // // // // // //         // Convert to 24-hour format
// // // // // // //         if (period?.toLowerCase() === 'pm' && hours < 12) hours += 12;
// // // // // // //         if (period?.toLowerCase() === 'am' && hours === 12) hours = 0;
        
// // // // // // //         const time = new Date(pattern.base);
// // // // // // //         time.setHours(hours, minutes, 0, 0);
        
// // // // // // //         // If time is in the past, schedule for next day
// // // // // // //         if (time < new Date() && pattern.base === now) {
// // // // // // //           time.setDate(time.getDate() + 1);
// // // // // // //         }
        
// // // // // // //         return time;
// // // // // // //       }
// // // // // // //     }
    
// // // // // // //     // Default: 1 hour from now
// // // // // // //     const defaultTime = new Date();
// // // // // // //     defaultTime.setHours(defaultTime.getHours() + 1);
// // // // // // //     return defaultTime;
// // // // // // //   };

// // // // // // //   // Extract reminder text from command
// // // // // // //   const extractReminderText = (command) => {
// // // // // // //     // Remove time-related phrases
// // // // // // //     const timePatterns = [
// // // // // // //       /\b(?:at\s+)?\d{1,2}(?::\d{2})?\s*(?:am|pm)\b/i,
// // // // // // //       /\btomorrow\s+(?:at\s+)?\d{1,2}(?::\d{2})?\s*(?:am|pm)\b/i,
// // // // // // //       /\bin\s+\d+\s+(?:hour|minute)(?:s)?\b/i,
// // // // // // //       /\b(?:set|add)\s+reminder\b/i,
// // // // // // //       /\btoday\b/i,
// // // // // // //     ];
    
// // // // // // //     let text = command.toLowerCase();
// // // // // // //     timePatterns.forEach(pattern => {
// // // // // // //       text = text.replace(pattern, '');
// // // // // // //     });
    
// // // // // // //     // Clean up extra spaces
// // // // // // //     text = text.replace(/\s+/g, ' ').trim();
    
// // // // // // //     return text || 'Reminder';
// // // // // // //   };

// // // // // // //   // Handle setting a reminder
// // // // // // //   const handleSetReminder = useCallback((commandText) => {
// // // // // // //     const time = parseTimeFromSpeech(commandText);
// // // // // // //     const text = extractReminderText(commandText);
    
// // // // // // //     const newReminder = {
// // // // // // //       id: Date.now(),
// // // // // // //       text,
// // // // // // //       time: time.toISOString(),
// // // // // // //       active: true,
// // // // // // //       createdAt: new Date().toISOString(),
// // // // // // //       spokenTime: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
// // // // // // //     };
    
// // // // // // //     setReminders(prev => [...prev, newReminder]);
// // // // // // //     scheduleReminder(newReminder);
    
// // // // // // //     const timeStr = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
// // // // // // //     const response = `Reminder set for ${timeStr}: ${text}`;
// // // // // // //     speak(response);
// // // // // // //     setStatus(response);
// // // // // // //   }, [speak]);

// // // // // // //   // Handle showing reminders
// // // // // // //   const handleShowReminders = useCallback(() => {
// // // // // // //     if (reminders.length === 0) {
// // // // // // //       speak('You have no reminders');
// // // // // // //       setStatus('No reminders found');
// // // // // // //       return;
// // // // // // //     }
    
// // // // // // //     const count = reminders.length;
// // // // // // //     speak(`You have ${count} reminder${count === 1 ? '' : 's'}`);
    
// // // // // // //     // Read each reminder with a delay
// // // // // // //     reminders.forEach((reminder, index) => {
// // // // // // //       setTimeout(() => {
// // // // // // //         const time = new Date(reminder.time);
// // // // // // //         const timeStr = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
// // // // // // //         speak(`Reminder ${index + 1}: ${reminder.text} at ${timeStr}`);
// // // // // // //       }, (index + 1) * 1500);
// // // // // // //     });
    
// // // // // // //     setStatus(`Showing ${count} reminder${count === 1 ? '' : 's'}`);
// // // // // // //   }, [reminders, speak]);

// // // // // // //   // Handle deleting a reminder
// // // // // // //   const handleDeleteReminder = useCallback((input) => {
// // // // // // //     let index = -1;
    
// // // // // // //     // Check if input is a number
// // // // // // //     if (/^\d+$/.test(input)) {
// // // // // // //       index = parseInt(input) - 1;
// // // // // // //     } else {
// // // // // // //       // Try to parse written numbers
// // // // // // //       const numberMap = {
// // // // // // //         'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5,
// // // // // // //         'six': 6, 'seven': 7, 'eight': 8, 'nine': 9, 'ten': 10
// // // // // // //       };
// // // // // // //       if (numberMap[input.toLowerCase()]) {
// // // // // // //         index = numberMap[input.toLowerCase()] - 1;
// // // // // // //       }
// // // // // // //     }
    
// // // // // // //     if (index >= 0 && index < reminders.length) {
// // // // // // //       const deleted = reminders[index];
// // // // // // //       setReminders(prev => prev.filter((_, i) => i !== index));
// // // // // // //       speak(`Deleted reminder ${index + 1}: ${deleted.text}`);
// // // // // // //       setStatus(`Deleted: "${deleted.text}"`);
// // // // // // //     } else {
// // // // // // //       speak(`Could not find reminder ${input}. You have ${reminders.length} reminders.`);
// // // // // // //       setStatus(`Invalid reminder: ${input}`);
// // // // // // //     }
// // // // // // //   }, [reminders, speak]);

// // // // // // //   // Handle clearing all reminders
// // // // // // //   const handleClearAllReminders = useCallback(() => {
// // // // // // //     if (reminders.length > 0) {
// // // // // // //       setReminders([]);
// // // // // // //       speak('All reminders have been cleared');
// // // // // // //       setStatus('All reminders cleared');
// // // // // // //     } else {
// // // // // // //       speak('No reminders to clear');
// // // // // // //       setStatus('No reminders to clear');
// // // // // // //     }
// // // // // // //   }, [reminders, speak]);

// // // // // // //   // Schedule a reminder alert
// // // // // // //   const scheduleReminder = (reminder) => {
// // // // // // //     const reminderTime = new Date(reminder.time);
// // // // // // //     const now = new Date();
// // // // // // //     const delay = reminderTime.getTime() - now.getTime();
    
// // // // // // //     if (delay > 0) {
// // // // // // //       setTimeout(() => {
// // // // // // //         speak(`Reminder: ${reminder.text}`);
        
// // // // // // //         // Update reminder as inactive
// // // // // // //         setReminders(prev => 
// // // // // // //           prev.map(r => 
// // // // // // //             r.id === reminder.id ? { ...r, active: false } : r
// // // // // // //           )
// // // // // // //         );
        
// // // // // // //         // Visual notification
// // // // // // //         if (document.visibilityState === 'visible') {
// // // // // // //           setStatus(`🔔 Reminder: ${reminder.text}`);
// // // // // // //         }
// // // // // // //       }, delay);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   // Format time for display
// // // // // // //   const formatTime = (timeString) => {
// // // // // // //     const time = new Date(timeString);
// // // // // // //     return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
// // // // // // //   };

// // // // // // //   // Format date for display
// // // // // // //   const formatDate = (timeString) => {
// // // // // // //     const date = new Date(timeString);
// // // // // // //     const today = new Date();
// // // // // // //     const tomorrow = new Date();
// // // // // // //     tomorrow.setDate(tomorrow.getDate() + 1);
    
// // // // // // //     if (date.toDateString() === today.toDateString()) {
// // // // // // //       return 'Today';
// // // // // // //     } else if (date.toDateString() === tomorrow.toDateString()) {
// // // // // // //       return 'Tomorrow';
// // // // // // //     } else {
// // // // // // //       return date.toLocaleDateString();
// // // // // // //     }
// // // // // // //   };

// // // // // // //   // Manual delete function
// // // // // // //   const deleteReminder = (id) => {
// // // // // // //     setReminders(prev => prev.filter(r => r.id !== id));
// // // // // // //     speak('Reminder deleted');
// // // // // // //     setStatus('Reminder deleted');
// // // // // // //   };

// // // // // // //   // Toggle reminder active state
// // // // // // //   const toggleReminder = (id) => {
// // // // // // //     setReminders(prev => prev.map(reminder => {
// // // // // // //       if (reminder.id === id) {
// // // // // // //         const updated = { ...reminder, active: !reminder.active };
// // // // // // //         if (updated.active && new Date(updated.time) > new Date()) {
// // // // // // //           scheduleReminder(updated);
// // // // // // //         }
// // // // // // //         return updated;
// // // // // // //       }
// // // // // // //       return reminder;
// // // // // // //     }));
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <div className="reminders-page">
// // // // // // //       {/* Fixed Header */}
// // // // // // //       <header className="fixed-header">
// // // // // // //         <div className="header-content">
// // // // // // //           <div className="header-left">
// // // // // // //             <button 
// // // // // // //               className="back-btn"
// // // // // // //               onClick={() => window.location.href = '/dashboard'}
// // // // // // //               aria-label="Go back to dashboard"
// // // // // // //             >
// // // // // // //               ← Back
// // // // // // //             </button>
// // // // // // //             <h1 className="logo">VISIONA</h1>
// // // // // // //           </div>
          
// // // // // // //           <div className="header-title">
// // // // // // //             <h2>Voice Reminders</h2>
// // // // // // //           </div>
          
// // // // // // //           <div className="user-menu">
// // // // // // //             <button 
// // // // // // //               className={`voice-btn ${isListening ? 'listening' : ''}`}
// // // // // // //               onClick={() => {
// // // // // // //                 if (isListening) {
// // // // // // //                   stopListening();
// // // // // // //                   speak('Voice control paused');
// // // // // // //                 } else {
// // // // // // //                   startListening();
// // // // // // //                   speak('Voice control activated');
// // // // // // //                 }
// // // // // // //               }}
// // // // // // //               aria-label={isListening ? 'Stop listening' : 'Start listening'}
// // // // // // //             >
// // // // // // //               🎤 {isListening ? 'Listening...' : 'Voice'}
// // // // // // //             </button>
// // // // // // //           </div>
// // // // // // //         </div>
// // // // // // //       </header>

// // // // // // //       {/* Main Content */}
// // // // // // //       <div className="reminders-content">
// // // // // // //         <div className="reminders-container">
// // // // // // //           {/* Status Message */}
// // // // // // //           <div className="status-message">
// // // // // // //             <div className="status-text">{status}</div>
// // // // // // //             <button 
// // // // // // //               className="clear-status-btn"
// // // // // // //               onClick={() => setStatus('Ready to listen')}
// // // // // // //               aria-label="Clear status"
// // // // // // //             >
// // // // // // //               ×
// // // // // // //             </button>
// // // // // // //           </div>

// // // // // // //           {/* Voice Control Info */}
// // // // // // //           <div className="voice-control-section">
// // // // // // //             <div className="voice-assistant">
// // // // // // //               <div className="voice-status">
// // // // // // //                 <div className="voice-indicator">
// // // // // // //                   {isListening ? (
// // // // // // //                     <>
// // // // // // //                       <span className="listening-pulse"></span>
// // // // // // //                       <span>Listening... Say your command</span>
// // // // // // //                     </>
// // // // // // //                   ) : (
// // // // // // //                     'Voice control ready'
// // // // // // //                   )}
// // // // // // //                 </div>
// // // // // // //                 <button 
// // // // // // //                   className="voice-help-btn"
// // // // // // //                   onClick={() => setShowHelp(!showHelp)}
// // // // // // //                 >
// // // // // // //                   {showHelp ? 'Hide Help' : 'Show Commands'}
// // // // // // //                 </button>
// // // // // // //               </div>
              
// // // // // // //               {showHelp && (
// // // // // // //                 <div className="voice-help-panel">
// // // // // // //                   <h3>🎤 Voice Commands</h3>
// // // // // // //                   <div className="voice-commands-grid">
// // // // // // //                     <div className="voice-category">
// // // // // // //                       <h4>Add Reminders</h4>
// // // // // // //                       <ul>
// // // // // // //                         <li>"Set reminder at 7 pm take medicine"</li>
// // // // // // //                         <li>"Add reminder tomorrow 9 am meeting"</li>
// // // // // // //                         <li>"Reminder at 3:30 pm call mom"</li>
// // // // // // //                       </ul>
// // // // // // //                     </div>
// // // // // // //                     <div className="voice-category">
// // // // // // //                       <h4>View & Manage</h4>
// // // // // // //                       <ul>
// // // // // // //                         <li>"Show reminders" or "List reminders"</li>
// // // // // // //                         <li>"Delete reminder one"</li>
// // // // // // //                         <li>"Delete reminder number 2"</li>
// // // // // // //                         <li>"Clear all reminders"</li>
// // // // // // //                       </ul>
// // // // // // //                     </div>
// // // // // // //                     <div className="voice-category">
// // // // // // //                       <h4>Navigation</h4>
// // // // // // //                       <ul>
// // // // // // //                         <li>"Go back" or "Go to dashboard"</li>
// // // // // // //                         <li>"Reminder help"</li>
// // // // // // //                         <li>"Stop" - pause voice control</li>
// // // // // // //                       </ul>
// // // // // // //                     </div>
// // // // // // //                   </div>
// // // // // // //                   <div className="voice-tips">
// // // // // // //                     <p><strong>Tip:</strong> Speak clearly and naturally. The system will understand times like "7 pm", "tomorrow 9 am", or "in 1 hour".</p>
// // // // // // //                     <button 
// // // // // // //                       className="close-help-btn"
// // // // // // //                       onClick={() => setShowHelp(false)}
// // // // // // //                     >
// // // // // // //                       Close Help
// // // // // // //                     </button>
// // // // // // //                   </div>
// // // // // // //                 </div>
// // // // // // //               )}
// // // // // // //             </div>
// // // // // // //           </div>

// // // // // // //           {/* Reminders List */}
// // // // // // //           <div className="reminders-list-section">
// // // // // // //             <div className="section-header">
// // // // // // //               <h3>Your Reminders</h3>
// // // // // // //               <div className="reminder-count">{reminders.length} total</div>
// // // // // // //             </div>
            
// // // // // // //             {reminders.length === 0 ? (
// // // // // // //               <div className="empty-state">
// // // // // // //                 <div className="empty-icon">⏰</div>
// // // // // // //                 <h4>No reminders yet</h4>
// // // // // // //                 <p>Use voice commands to add reminders. Try saying: "Set reminder at 7 pm take medicine"</p>
// // // // // // //               </div>
// // // // // // //             ) : (
// // // // // // //               <div className="reminders-grid">
// // // // // // //                 {reminders.map((reminder, index) => (
// // // // // // //                   <div 
// // // // // // //                     key={reminder.id} 
// // // // // // //                     className={`reminder-card ${reminder.active ? 'active' : 'inactive'}`}
// // // // // // //                   >
// // // // // // //                     <div className="reminder-header">
// // // // // // //                       <div className="reminder-title">
// // // // // // //                         <h4>Reminder #{index + 1}</h4>
// // // // // // //                         <span className="status-badge">
// // // // // // //                           {reminder.active ? '⏰ Active' : '✓ Completed'}
// // // // // // //                         </span>
// // // // // // //                       </div>
// // // // // // //                       <div className="reminder-actions">
// // // // // // //                         <button 
// // // // // // //                           className="toggle-btn"
// // // // // // //                           onClick={() => toggleReminder(reminder.id)}
// // // // // // //                           aria-label={reminder.active ? 'Deactivate reminder' : 'Activate reminder'}
// // // // // // //                         >
// // // // // // //                           {reminder.active ? 'Pause' : 'Activate'}
// // // // // // //                         </button>
// // // // // // //                         <button 
// // // // // // //                           className="delete-btn"
// // // // // // //                           onClick={() => deleteReminder(reminder.id)}
// // // // // // //                           aria-label={`Delete reminder ${index + 1}`}
// // // // // // //                         >
// // // // // // //                           Delete
// // // // // // //                         </button>
// // // // // // //                       </div>
// // // // // // //                     </div>
                    
// // // // // // //                     <div className="reminder-details">
// // // // // // //                       <div className="detail-item">
// // // // // // //                         <span className="label">Description:</span>
// // // // // // //                         <span className="value">{reminder.text}</span>
// // // // // // //                       </div>
// // // // // // //                       <div className="detail-item">
// // // // // // //                         <span className="label">Time:</span>
// // // // // // //                         <span className="value">
// // // // // // //                           {formatDate(reminder.time)} at {formatTime(reminder.time)}
// // // // // // //                         </span>
// // // // // // //                       </div>
// // // // // // //                       <div className="detail-item">
// // // // // // //                         <span className="label">Status:</span>
// // // // // // //                         <span className="value">
// // // // // // //                           {reminder.active ? 'Will alert at scheduled time' : 'Already triggered'}
// // // // // // //                         </span>
// // // // // // //                       </div>
// // // // // // //                     </div>
                    
// // // // // // //                     <div className="reminder-voice-hint">
// // // // // // //                       <small>Say: "Delete reminder {index + 1}" to remove</small>
// // // // // // //                     </div>
// // // // // // //                   </div>
// // // // // // //                 ))}
// // // // // // //               </div>
// // // // // // //             )}
            
// // // // // // //             {reminders.length > 0 && (
// // // // // // //               <div className="bulk-actions">
// // // // // // //                 <button 
// // // // // // //                   className="clear-all-btn"
// // // // // // //                   onClick={handleClearAllReminders}
// // // // // // //                 >
// // // // // // //                   🗑️ Clear All Reminders
// // // // // // //                 </button>
// // // // // // //               </div>
// // // // // // //             )}
// // // // // // //           </div>

// // // // // // //           {/* Quick Actions */}
// // // // // // //           <div className="quick-actions-section">
// // // // // // //             <h3>Quick Actions</h3>
// // // // // // //             <div className="action-buttons">
// // // // // // //               <button 
// // // // // // //                 className="action-btn"
// // // // // // //                 onClick={handleShowReminders}
// // // // // // //               >
// // // // // // //                 🔊 Speak Reminders
// // // // // // //               </button>
// // // // // // //               <button 
// // // // // // //                 className="action-btn"
// // // // // // //                 onClick={() => {
// // // // // // //                   speak('Try saying: set reminder at time for your reminder');
// // // // // // //                   setStatus('Try: "Set reminder at 7 pm take medicine"');
// // // // // // //                 }}
// // // // // // //               >
// // // // // // //                 🎤 Voice Demo
// // // // // // //               </button>
// // // // // // //               <button 
// // // // // // //                 className="action-btn"
// // // // // // //                 onClick={() => {
// // // // // // //                   const now = new Date();
// // // // // // //                   now.setMinutes(now.getMinutes() + 5);
// // // // // // //                   handleSetReminder(`at ${now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} test reminder`);
// // // // // // //                 }}
// // // // // // //               >
// // // // // // //                 ⏰ Test Reminder
// // // // // // //               </button>
// // // // // // //             </div>
// // // // // // //           </div>
// // // // // // //         </div>
// // // // // // //       </div>

// // // // // // //       {/* Fixed Status Bar */}
// // // // // // //       <div className="status-bar">
// // // // // // //         <div className="status-content">
// // // // // // //           <div className="listening-status">
// // // // // // //             {isListening ? (
// // // // // // //               <>
// // // // // // //                 <span className="listening-indicator">●</span> Listening...
// // // // // // //               </>
// // // // // // //             ) : (
// // // // // // //               'Ready for voice commands'
// // // // // // //             )}
// // // // // // //           </div>
// // // // // // //           <div className="voice-controls">
// // // // // // //             <button 
// // // // // // //               className={`mic-btn ${isListening ? 'active' : ''}`}
// // // // // // //               onClick={() => isListening ? stopListening() : startListening()}
// // // // // // //               aria-label={isListening ? 'Stop listening' : 'Start listening'}
// // // // // // //             >
// // // // // // //               🎤
// // // // // // //             </button>
// // // // // // //             <button 
// // // // // // //               className="help-btn"
// // // // // // //               onClick={() => setShowHelp(!showHelp)}
// // // // // // //             >
// // // // // // //               {showHelp ? 'Hide Help' : 'Help'}
// // // // // // //             </button>
// // // // // // //           </div>
// // // // // // //         </div>
// // // // // // //       </div>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // };

// // // // // // // export default RemindersPage;




// // // // // // import React, { useState, useEffect, useRef, useCallback } from 'react';
// // // // // // import { useVoiceCommands } from '../../components/VoiceAssistant/useVoiceCommands';
// // // // // // import './Reminders.css';

// // // // // // const RemindersPage = () => {
// // // // // //   const [reminders, setReminders] = useState([]);
// // // // // //   const [status, setStatus] = useState('Voice control is active. Say "set reminder" to begin.');
// // // // // //   const [showHelp, setShowHelp] = useState(false);
// // // // // //   const [commandStep, setCommandStep] = useState('idle'); // idle, listening_note, listening_time
// // // // // //   const [pendingReminder, setPendingReminder] = useState({ note: '', time: '' });
  
// // // // // //   const { 
// // // // // //     startListening, 
// // // // // //     stopListening, 
// // // // // //     speak, 
// // // // // //     registerCommands,
// // // // // //     isListening,
// // // // // //     setOnResult
// // // // // //   } = useVoiceCommands();

// // // // // //   // Initialize
// // // // // //   useEffect(() => {
// // // // // //     // Load reminders from localStorage
// // // // // //     const savedReminders = JSON.parse(localStorage.getItem('visiona-reminders')) || [];
// // // // // //     if (savedReminders.length > 0) {
// // // // // //       setReminders(savedReminders);
// // // // // //       // Reschedule active reminders
// // // // // //       savedReminders.forEach(reminder => {
// // // // // //         if (reminder.active && new Date(reminder.time) > new Date()) {
// // // // // //           scheduleReminderAlert(reminder);
// // // // // //         }
// // // // // //       });
// // // // // //     }

// // // // // //     // Setup voice command handlers
// // // // // //     const commands = {
// // // // // //       // Navigation commands
// // // // // //       'go back': () => {
// // // // // //         speak('Going back to dashboard');
// // // // // //         window.location.href = '/dashboard';
// // // // // //       },
// // // // // //       'go to dashboard': () => {
// // // // // //         speak('Navigating to dashboard');
// // // // // //         window.location.href = '/dashboard';
// // // // // //       },
// // // // // //       'dashboard': () => {
// // // // // //         speak('Opening dashboard');
// // // // // //         window.location.href = '/dashboard';
// // // // // //       },

// // // // // //       // Reminder commands - single statement
// // // // // //       'remind me (.*)': (transcript) => {
// // // // // //         handleCompleteReminderCommand(transcript.replace('remind me', '').trim());
// // // // // //       },
// // // // // //       'set reminder (.*)': (transcript) => {
// // // // // //         handleCompleteReminderCommand(transcript.replace('set reminder', '').trim());
// // // // // //       },
// // // // // //       'add reminder (.*)': (transcript) => {
// // // // // //         handleCompleteReminderCommand(transcript.replace('add reminder', '').trim());
// // // // // //       },
// // // // // //       'create reminder (.*)': (transcript) => {
// // // // // //         handleCompleteReminderCommand(transcript.replace('create reminder', '').trim());
// // // // // //       },

// // // // // //       // Step-by-step commands
// // // // // //       'set reminder': () => {
// // // // // //         startStepByStepReminder('note');
// // // // // //       },
// // // // // //       'add reminder': () => {
// // // // // //         startStepByStepReminder('note');
// // // // // //       },
// // // // // //       'create reminder': () => {
// // // // // //         startStepByStepReminder('note');
// // // // // //       },

// // // // // //       // View commands
// // // // // //       'show reminders': () => {
// // // // // //         handleShowReminders();
// // // // // //       },
// // // // // //       'list reminders': () => {
// // // // // //         handleShowReminders();
// // // // // //       },
// // // // // //       'my reminders': () => {
// // // // // //         handleShowReminders();
// // // // // //       },

// // // // // //       // Delete commands
// // // // // //       'delete reminder (.*)': (transcript) => {
// // // // // //         handleDeleteCommand(transcript.replace('delete reminder', '').trim());
// // // // // //       },
// // // // // //       'remove reminder (.*)': (transcript) => {
// // // // // //         handleDeleteCommand(transcript.replace('remove reminder', '').trim());
// // // // // //       },
// // // // // //       'clear all reminders': () => {
// // // // // //         handleClearAllReminders();
// // // // // //       },

// // // // // //       // Help commands
// // // // // //       'help': () => {
// // // // // //         speak('You can say: set reminder meeting tomorrow at 10 am, or say "set reminder" to add step by step. Say "show reminders" to list all reminders.');
// // // // // //         setStatus('Say: "set reminder meeting tomorrow at 10 am" or "help" for more commands');
// // // // // //       },
// // // // // //       'reminder help': () => {
// // // // // //         setShowHelp(true);
// // // // // //         speak('Reminder commands: set reminder, show reminders, delete reminder one, clear all reminders');
// // // // // //       },

// // // // // //       // Stop/start listening
// // // // // //       'stop listening': () => {
// // // // // //         stopListening();
// // // // // //         speak('Voice control paused');
// // // // // //         setStatus('Voice control paused. Say "start" to resume.');
// // // // // //       },
// // // // // //       'start listening': () => {
// // // // // //         startListening();
// // // // // //         speak('Voice control activated');
// // // // // //         setStatus('Voice control active');
// // // // // //       },
// // // // // //       'stop': () => {
// // // // // //         stopListening();
// // // // // //         speak('Stopped');
// // // // // //       },
// // // // // //       'start': () => {
// // // // // //         startListening();
// // // // // //         speak('Started');
// // // // // //       }
// // // // // //     };

// // // // // //     // Register all commands
// // // // // //     registerCommands(commands);

// // // // // //     // Auto-start listening
// // // // // //     setTimeout(() => {
// // // // // //       startListening();
// // // // // //       speak('Reminders page loaded. You can say "set reminder" to add a reminder, or "help" for commands.');
// // // // // //     }, 800);

// // // // // //     // Handle raw voice input for step-by-step
// // // // // //     setOnResult((transcript) => {
// // // // // //       handleVoiceInput(transcript.toLowerCase());
// // // // // //     });

// // // // // //     return () => {
// // // // // //       stopListening();
// // // // // //     };
// // // // // //   }, []); // Empty dependency array for initialization

// // // // // //   // Save reminders to localStorage
// // // // // //   useEffect(() => {
// // // // // //     localStorage.setItem('visiona-reminders', JSON.stringify(reminders));
// // // // // //   }, [reminders]);

// // // // // //   // Handle complete reminder command in one statement
// // // // // //   const handleCompleteReminderCommand = useCallback((commandText) => {
// // // // // //     console.log('Processing complete command:', commandText);
    
// // // // // //     // Extract time and note from command
// // // // // //     const { time, note } = extractTimeAndNote(commandText);
    
// // // // // //     if (!note) {
// // // // // //       speak('What should I remind you about?');
// // // // // //       setStatus('What is the reminder for?');
// // // // // //       setCommandStep('listening_note');
// // // // // //       setPendingReminder({ note: '', time: '' });
// // // // // //       return;
// // // // // //     }
    
// // // // // //     if (!time) {
// // // // // //       speak('When should I remind you?');
// // // // // //       setStatus('When should I remind you?');
// // // // // //       setCommandStep('listening_time');
// // // // // //       setPendingReminder({ note, time: '' });
// // // // // //       return;
// // // // // //     }
    
// // // // // //     // Create and save reminder
// // // // // //     createReminder(note, time);
// // // // // //     setCommandStep('idle');
// // // // // //   }, []);

// // // // // //   // Extract time and note from natural language
// // // // // //   const extractTimeAndNote = (text) => {
// // // // // //     console.log('Extracting from:', text);
    
// // // // // //     // Time patterns
// // // // // //     const timePatterns = [
// // // // // //       // "tomorrow at 10 am"
// // // // // //       /(tomorrow\s+(?:at\s+)?(\d{1,2}(?::\d{2})?\s*(?:am|pm)))/i,
// // // // // //       // "at 10 am tomorrow"
// // // // // //       /(at\s+(\d{1,2}(?::\d{2})?\s*(?:am|pm))\s+tomorrow)/i,
// // // // // //       // "today at 3 pm"
// // // // // //       /(today\s+(?:at\s+)?(\d{1,2}(?::\d{2})?\s*(?:am|pm)))/i,
// // // // // //       // "at 3 pm today"
// // // // // //       /(at\s+(\d{1,2}(?::\d{2})?\s*(?:am|pm))\s+today)/i,
// // // // // //       // "at 10 am"
// // // // // //       /(at\s+(\d{1,2}(?::\d{2})?\s*(?:am|pm)))/i,
// // // // // //       // "10 am"
// // // // // //       /(\d{1,2}(?::\d{2})?\s*(?:am|pm))/i,
// // // // // //       // "in 1 hour"
// // // // // //       /(in\s+(\d+)\s+hour(?:s)?)/i,
// // // // // //       // "in 30 minutes"
// // // // // //       /(in\s+(\d+)\s+minute(?:s)?)/i,
// // // // // //     ];

// // // // // //     let timeMatch = null;
// // // // // //     let timeText = '';
// // // // // //     let time = null;

// // // // // //     for (const pattern of timePatterns) {
// // // // // //       const match = text.match(pattern);
// // // // // //       if (match) {
// // // // // //         timeMatch = match;
// // // // // //         timeText = match[1];
// // // // // //         time = parseTimeString(timeText);
// // // // // //         break;
// // // // // //       }
// // // // // //     }

// // // // // //     // Remove time text to get note
// // // // // //     let note = text;
// // // // // //     if (timeText) {
// // // // // //       note = text.replace(timeText, '').trim();
// // // // // //       // Clean up connectors
// // // // // //       note = note.replace(/\b(for|about|to)\s+$/i, '').trim();
// // // // // //       note = note.replace(/^\s*(for|about|to)\s+/i, '').trim();
// // // // // //     }

// // // // // //     // Clean up common phrases
// // // // // //     note = note.replace(/\b(remind me|reminder|set|add|create)\b/gi, '').trim();
// // // // // //     note = note.replace(/^\s*to\s+/, '').trim();

// // // // // //     console.log('Extracted:', { note, time: time ? time.toISOString() : null });
// // // // // //     return { time, note };
// // // // // //   };

// // // // // //   // Parse time string to Date
// // // // // //   const parseTimeString = (timeStr) => {
// // // // // //     const now = new Date();
// // // // // //     const tomorrow = new Date();
// // // // // //     tomorrow.setDate(tomorrow.getDate() + 1);

// // // // // //     // Handle "tomorrow at X"
// // // // // //     if (timeStr.toLowerCase().includes('tomorrow')) {
// // // // // //       const timeMatch = timeStr.match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)/i);
// // // // // //       if (timeMatch) {
// // // // // //         let hours = parseInt(timeMatch[1]);
// // // // // //         const minutes = timeMatch[2] ? parseInt(timeMatch[2]) : 0;
// // // // // //         const period = timeMatch[3].toLowerCase();
        
// // // // // //         if (period === 'pm' && hours < 12) hours += 12;
// // // // // //         if (period === 'am' && hours === 12) hours = 0;
        
// // // // // //         const time = new Date(tomorrow);
// // // // // //         time.setHours(hours, minutes, 0, 0);
// // // // // //         return time;
// // // // // //       }
// // // // // //     }

// // // // // //     // Handle "in X hours/minutes"
// // // // // //     const relativeMatch = timeStr.match(/in\s+(\d+)\s+(hour|minute)s?/i);
// // // // // //     if (relativeMatch) {
// // // // // //       const amount = parseInt(relativeMatch[1]);
// // // // // //       const unit = relativeMatch[2].toLowerCase();
// // // // // //       const time = new Date(now);
      
// // // // // //       if (unit === 'hour') {
// // // // // //         time.setHours(time.getHours() + amount);
// // // // // //       } else if (unit === 'minute') {
// // // // // //         time.setMinutes(time.getMinutes() + amount);
// // // // // //       }
// // // // // //       return time;
// // // // // //     }

// // // // // //     // Handle "at X" or "X am/pm"
// // // // // //     const timeMatch = timeStr.match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)/i);
// // // // // //     if (timeMatch) {
// // // // // //       let hours = parseInt(timeMatch[1]);
// // // // // //       const minutes = timeMatch[2] ? parseInt(timeMatch[2]) : 0;
// // // // // //       const period = timeMatch[3].toLowerCase();
      
// // // // // //       if (period === 'pm' && hours < 12) hours += 12;
// // // // // //       if (period === 'am' && hours === 12) hours = 0;
      
// // // // // //       const time = new Date(now);
// // // // // //       time.setHours(hours, minutes, 0, 0);
      
// // // // // //       // If time is in the past, schedule for tomorrow
// // // // // //       if (time < now) {
// // // // // //         time.setDate(time.getDate() + 1);
// // // // // //       }
// // // // // //       return time;
// // // // // //     }

// // // // // //     // Default: 1 hour from now
// // // // // //     const defaultTime = new Date(now);
// // // // // //     defaultTime.setHours(defaultTime.getHours() + 1);
// // // // // //     return defaultTime;
// // // // // //   };

// // // // // //   // Start step-by-step reminder creation
// // // // // //   const startStepByStepReminder = (step) => {
// // // // // //     if (step === 'note') {
// // // // // //       speak('What should I remind you about?');
// // // // // //       setStatus('What is the reminder for?');
// // // // // //       setCommandStep('listening_note');
// // // // // //       setPendingReminder({ note: '', time: '' });
// // // // // //     }
// // // // // //   };

// // // // // //   // Handle raw voice input for step-by-step
// // // // // //   const handleVoiceInput = useCallback((transcript) => {
// // // // // //     console.log('Voice input:', transcript, 'Step:', commandStep);
    
// // // // // //     if (commandStep === 'listening_note') {
// // // // // //       const note = transcript.trim();
// // // // // //       setPendingReminder(prev => ({ ...prev, note }));
// // // // // //       speak('When should I remind you?');
// // // // // //       setStatus('When should I remind you?');
// // // // // //       setCommandStep('listening_time');
// // // // // //     } 
// // // // // //     else if (commandStep === 'listening_time') {
// // // // // //       const timeStr = transcript.trim();
// // // // // //       const time = parseTimeString(timeStr);
      
// // // // // //       if (time) {
// // // // // //         createReminder(pendingReminder.note, time);
// // // // // //         setCommandStep('idle');
// // // // // //       } else {
// // // // // //         speak('I didn\'t understand the time. Please say something like "tomorrow at 10 am" or "in 1 hour"');
// // // // // //         setStatus('Please specify time like "tomorrow 10 am"');
// // // // // //       }
// // // // // //     }
// // // // // //   }, [commandStep, pendingReminder.note]);

// // // // // //   // Create and save reminder
// // // // // //   const createReminder = (note, time) => {
// // // // // //     if (!note || !time) {
// // // // // //       speak('Reminder not created. Missing information.');
// // // // // //       setStatus('Reminder creation failed');
// // // // // //       return;
// // // // // //     }

// // // // // //     const newReminder = {
// // // // // //       id: Date.now(),
// // // // // //       text: note,
// // // // // //       time: time.toISOString(),
// // // // // //       active: true,
// // // // // //       createdAt: new Date().toISOString(),
// // // // // //       spokenTime: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
// // // // // //       spokenDate: time.toDateString() === new Date().toDateString() ? 'Today' : 
// // // // // //                   time.toDateString() === new Date(new Date().setDate(new Date().getDate() + 1)).toDateString() ? 'Tomorrow' :
// // // // // //                   time.toLocaleDateString()
// // // // // //     };

// // // // // //     setReminders(prev => [...prev, newReminder]);
// // // // // //     scheduleReminderAlert(newReminder);

// // // // // //     const timeStr = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
// // // // // //     const dateStr = newReminder.spokenDate;
// // // // // //     const response = `Reminder set for ${dateStr} at ${timeStr}: ${note}`;
// // // // // //     speak(response);
// // // // // //     setStatus(response);
// // // // // //   };

// // // // // //   // Schedule reminder alert
// // // // // //   const scheduleReminderAlert = (reminder) => {
// // // // // //     const reminderTime = new Date(reminder.time);
// // // // // //     const now = new Date();
// // // // // //     const delay = reminderTime.getTime() - now.getTime();

// // // // // //     if (delay > 0 && delay < 24 * 60 * 60 * 1000) { // Only schedule if within 24 hours
// // // // // //       setTimeout(() => {
// // // // // //         speak(`Reminder: ${reminder.text}`);
        
// // // // // //         // Update reminder as inactive
// // // // // //         setReminders(prev => 
// // // // // //           prev.map(r => 
// // // // // //             r.id === reminder.id ? { ...r, active: false } : r
// // // // // //           )
// // // // // //         );
        
// // // // // //         // Show notification
// // // // // //         setStatus(`🔔 Reminder: ${reminder.text}`);
// // // // // //       }, delay);
// // // // // //     }
// // // // // //   };

// // // // // //   // Handle delete command
// // // // // //   const handleDeleteCommand = useCallback((input) => {
// // // // // //     const numMatch = input.match(/(\d+)/);
// // // // // //     const wordMatch = input.match(/\b(one|two|three|four|five|six|seven|eight|nine|ten)\b/i);
    
// // // // // //     let index = -1;
    
// // // // // //     if (numMatch) {
// // // // // //       index = parseInt(numMatch[1]) - 1;
// // // // // //     } else if (wordMatch) {
// // // // // //       const numberWords = {
// // // // // //         'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5,
// // // // // //         'six': 6, 'seven': 7, 'eight': 8, 'nine': 9, 'ten': 10
// // // // // //       };
// // // // // //       index = numberWords[wordMatch[0].toLowerCase()] - 1;
// // // // // //     } else if (input === 'all' || input === 'everything') {
// // // // // //       handleClearAllReminders();
// // // // // //       return;
// // // // // //     }
    
// // // // // //     if (index >= 0 && index < reminders.length) {
// // // // // //       const deleted = reminders[index];
// // // // // //       setReminders(prev => prev.filter((_, i) => i !== index));
// // // // // //       speak(`Deleted reminder ${index + 1}: ${deleted.text}`);
// // // // // //       setStatus(`Deleted: "${deleted.text}"`);
// // // // // //     } else {
// // // // // //       speak(`Could not find reminder ${input}. You have ${reminders.length} reminders.`);
// // // // // //       setStatus(`Invalid reminder: ${input}`);
// // // // // //     }
// // // // // //   }, [reminders]);

// // // // // //   // Handle show reminders
// // // // // //   const handleShowReminders = useCallback(() => {
// // // // // //     if (reminders.length === 0) {
// // // // // //       speak('You have no reminders');
// // // // // //       setStatus('No reminders found');
// // // // // //       return;
// // // // // //     }
    
// // // // // //     const count = reminders.length;
// // // // // //     speak(`You have ${count} reminder${count === 1 ? '' : 's'}`);
    
// // // // // //     // Read each reminder
// // // // // //     reminders.forEach((reminder, index) => {
// // // // // //       setTimeout(() => {
// // // // // //         const time = new Date(reminder.time);
// // // // // //         const timeStr = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
// // // // // //         const dateStr = reminder.spokenDate;
// // // // // //         speak(`Reminder ${index + 1}: ${reminder.text} on ${dateStr} at ${timeStr}`);
// // // // // //       }, (index + 1) * 2000);
// // // // // //     });
    
// // // // // //     setStatus(`Showing ${count} reminder${count === 1 ? '' : 's'}`);
// // // // // //   }, [reminders]);

// // // // // //   // Handle clear all reminders
// // // // // //   const handleClearAllReminders = useCallback(() => {
// // // // // //     if (reminders.length > 0) {
// // // // // //       setReminders([]);
// // // // // //       speak('All reminders have been cleared');
// // // // // //       setStatus('All reminders cleared');
// // // // // //     } else {
// // // // // //       speak('No reminders to clear');
// // // // // //       setStatus('No reminders to clear');
// // // // // //     }
// // // // // //   }, [reminders]);

// // // // // //   // Manual delete
// // // // // //   const deleteReminder = (id) => {
// // // // // //     setReminders(prev => prev.filter(r => r.id !== id));
// // // // // //     speak('Reminder deleted');
// // // // // //     setStatus('Reminder deleted');
// // // // // //   };

// // // // // //   // Toggle reminder active state
// // // // // //   const toggleReminder = (id) => {
// // // // // //     setReminders(prev => prev.map(reminder => {
// // // // // //       if (reminder.id === id) {
// // // // // //         const updated = { ...reminder, active: !reminder.active };
// // // // // //         if (updated.active && new Date(updated.time) > new Date()) {
// // // // // //           scheduleReminderAlert(updated);
// // // // // //         }
// // // // // //         return updated;
// // // // // //       }
// // // // // //       return reminder;
// // // // // //     }));
// // // // // //   };

// // // // // //   // Format time for display
// // // // // //   const formatTime = (timeString) => {
// // // // // //     const time = new Date(timeString);
// // // // // //     return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
// // // // // //   };

// // // // // //   // Format date for display
// // // // // //   const formatDate = (timeString) => {
// // // // // //     const date = new Date(timeString);
// // // // // //     const today = new Date();
// // // // // //     const tomorrow = new Date();
// // // // // //     tomorrow.setDate(tomorrow.getDate() + 1);
    
// // // // // //     if (date.toDateString() === today.toDateString()) {
// // // // // //       return 'Today';
// // // // // //     } else if (date.toDateString() === tomorrow.toDateString()) {
// // // // // //       return 'Tomorrow';
// // // // // //     } else {
// // // // // //       return date.toLocaleDateString();
// // // // // //     }
// // // // // //   };

// // // // // //   return (
// // // // // //     <div className="reminders-page">
// // // // // //       {/* Fixed Header */}
// // // // // //       <header className="fixed-header">
// // // // // //         <div className="header-content">
// // // // // //           <div className="header-left">
// // // // // //             <button 
// // // // // //               className="back-btn"
// // // // // //               onClick={() => window.location.href = '/dashboard'}
// // // // // //               aria-label="Go back to dashboard"
// // // // // //             >
// // // // // //               ← Back
// // // // // //             </button>
// // // // // //             <h1 className="logo">VISIONA</h1>
// // // // // //           </div>
          
// // // // // //           <div className="header-title">
// // // // // //             <h2>Voice Reminders</h2>
// // // // // //           </div>
          
// // // // // //           <div className="user-menu">
// // // // // //             <button 
// // // // // //               className={`voice-btn ${isListening ? 'listening' : ''}`}
// // // // // //               onClick={() => {
// // // // // //                 if (isListening) {
// // // // // //                   stopListening();
// // // // // //                   speak('Voice control paused');
// // // // // //                 } else {
// // // // // //                   startListening();
// // // // // //                   speak('Voice control activated');
// // // // // //                 }
// // // // // //               }}
// // // // // //               aria-label={isListening ? 'Stop listening' : 'Start listening'}
// // // // // //             >
// // // // // //               🎤 {isListening ? 'Listening...' : 'Voice'}
// // // // // //             </button>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       </header>

// // // // // //       {/* Main Content */}
// // // // // //       <div className="reminders-content">
// // // // // //         <div className="reminders-container">
// // // // // //           {/* Status Message */}
// // // // // //           <div className="status-message">
// // // // // //             <div className="status-text">
// // // // // //               {commandStep === 'listening_note' ? '🎤 What is the reminder for?' :
// // // // // //                commandStep === 'listening_time' ? '🎤 When should I remind you?' :
// // // // // //                status}
// // // // // //             </div>
// // // // // //             <button 
// // // // // //               className="clear-status-btn"
// // // // // //               onClick={() => {
// // // // // //                 setStatus('Ready');
// // // // // //                 setCommandStep('idle');
// // // // // //               }}
// // // // // //               aria-label="Clear status"
// // // // // //             >
// // // // // //               ×
// // // // // //             </button>
// // // // // //           </div>

// // // // // //           {/* Voice Status */}
// // // // // //           <div className="voice-control-section">
// // // // // //             <div className="voice-status-indicator">
// // // // // //               <div className={`listening-dot ${isListening ? 'active' : ''}`}></div>
// // // // // //               <span className="status-text">
// // // // // //                 {isListening ? 'Listening... Speak your command' : 'Ready for voice commands'}
// // // // // //               </span>
// // // // // //               {commandStep !== 'idle' && (
// // // // // //                 <span className="step-indicator">
// // // // // //                   {commandStep === 'listening_note' ? 'Step 1: Reminder text' :
// // // // // //                    commandStep === 'listening_time' ? 'Step 2: Reminder time' : ''}
// // // // // //                 </span>
// // // // // //               )}
// // // // // //             </div>
            
// // // // // //             <div className="voice-help-toggle">
// // // // // //               <button 
// // // // // //                 className="voice-help-btn"
// // // // // //                 onClick={() => setShowHelp(!showHelp)}
// // // // // //               >
// // // // // //                 {showHelp ? 'Hide Commands' : 'Show Voice Commands'}
// // // // // //               </button>
// // // // // //             </div>
            
// // // // // //             {showHelp && (
// // // // // //               <div className="voice-help-panel">
// // // // // //                 <h3>🎤 Available Voice Commands</h3>
                
// // // // // //                 <div className="voice-commands-grid">
// // // // // //                   <div className="voice-category">
// // // // // //                     <h4>Add Reminders (Single Command)</h4>
// // // // // //                     <ul>
// // // // // //                       <li>"Set reminder meeting tomorrow at 10 am"</li>
// // // // // //                       <li>"Remind me to call mom at 3 pm"</li>
// // // // // //                       <li>"Add reminder for doctor appointment tomorrow 2:30 pm"</li>
// // // // // //                     </ul>
// // // // // //                   </div>
                  
// // // // // //                   <div className="voice-category">
// // // // // //                     <h4>Step-by-Step</h4>
// // // // // //                     <ul>
// // // // // //                       <li>1. Say "set reminder"</li>
// // // // // //                       <li>2. Say your reminder text</li>
// // // // // //                       <li>3. Say the time</li>
// // // // // //                     </ul>
// // // // // //                   </div>
                  
// // // // // //                   <div className="voice-category">
// // // // // //                     <h4>View & Manage</h4>
// // // // // //                     <ul>
// // // // // //                       <li>"Show reminders" or "List reminders"</li>
// // // // // //                       <li>"Delete reminder one" or "Delete reminder 1"</li>
// // // // // //                       <li>"Clear all reminders"</li>
// // // // // //                     </ul>
// // // // // //                   </div>
                  
// // // // // //                   <div className="voice-category">
// // // // // //                     <h4>Navigation</h4>
// // // // // //                     <ul>
// // // // // //                       <li>"Go back" or "Dashboard"</li>
// // // // // //                       <li>"Help" - show commands</li>
// // // // // //                       <li>"Stop listening" - pause voice</li>
// // // // // //                     </ul>
// // // // // //                   </div>
// // // // // //                 </div>
                
// // // // // //                 <div className="voice-tips">
// // // // // //                   <p><strong>💡 Tips:</strong> Speak naturally. Examples: "Set reminder team meeting tomorrow 11 am" or "Remind me to take medicine at 7 pm today"</p>
// // // // // //                   <button 
// // // // // //                     className="close-help-btn"
// // // // // //                     onClick={() => setShowHelp(false)}
// // // // // //                   >
// // // // // //                     Close
// // // // // //                   </button>
// // // // // //                 </div>
// // // // // //               </div>
// // // // // //             )}
            
// // // // // //             {/* Command examples */}
// // // // // //             <div className="command-examples">
// // // // // //               <h4>Try saying:</h4>
// // // // // //               <div className="example-buttons">
// // // // // //                 <button 
// // // // // //                   className="example-btn"
// // // // // //                   onClick={() => speak('Say: "Set reminder team meeting tomorrow at 11 am"')}
// // // // // //                 >
// // // // // //                   "Set reminder meeting tomorrow 11 am"
// // // // // //                 </button>
// // // // // //                 <button 
// // // // // //                   className="example-btn"
// // // // // //                   onClick={() => speak('Say: "Show reminders"')}
// // // // // //                 >
// // // // // //                   "Show reminders"
// // // // // //                 </button>
// // // // // //                 <button 
// // // // // //                   className="example-btn"
// // // // // //                   onClick={() => startStepByStepReminder('note')}
// // // // // //                 >
// // // // // //                   Start Step-by-Step
// // // // // //                 </button>
// // // // // //               </div>
// // // // // //             </div>
// // // // // //           </div>

// // // // // //           {/* Reminders List */}
// // // // // //           <div className="reminders-list-section">
// // // // // //             <div className="section-header">
// // // // // //               <h3>Your Reminders ({reminders.length})</h3>
// // // // // //               {reminders.length > 0 && (
// // // // // //                 <button 
// // // // // //                   className="speak-reminders-btn"
// // // // // //                   onClick={handleShowReminders}
// // // // // //                 >
// // // // // //                   🔊 Speak All
// // // // // //                 </button>
// // // // // //               )}
// // // // // //             </div>
            
// // // // // //             {reminders.length === 0 ? (
// // // // // //               <div className="empty-state">
// // // // // //                 <div className="empty-icon">⏰</div>
// // // // // //                 <h4>No reminders yet</h4>
// // // // // //                 <p>Use voice commands to add reminders</p>
// // // // // //                 <p className="empty-hint">Try saying: "Set reminder team meeting tomorrow at 11 am"</p>
// // // // // //               </div>
// // // // // //             ) : (
// // // // // //               <div className="reminders-grid">
// // // // // //                 {reminders.map((reminder, index) => (
// // // // // //                   <div 
// // // // // //                     key={reminder.id} 
// // // // // //                     className={`reminder-card ${reminder.active ? 'active' : 'inactive'}`}
// // // // // //                   >
// // // // // //                     <div className="reminder-header">
// // // // // //                       <div className="reminder-title">
// // // // // //                         <h4>Reminder #{index + 1}</h4>
// // // // // //                         <span className="status-badge">
// // // // // //                           {reminder.active ? '⏰ Active' : '✓ Completed'}
// // // // // //                         </span>
// // // // // //                       </div>
// // // // // //                       <div className="reminder-actions">
// // // // // //                         <button 
// // // // // //                           className="toggle-btn"
// // // // // //                           onClick={() => toggleReminder(reminder.id)}
// // // // // //                           aria-label={reminder.active ? 'Deactivate reminder' : 'Activate reminder'}
// // // // // //                         >
// // // // // //                           {reminder.active ? 'Pause' : 'Activate'}
// // // // // //                         </button>
// // // // // //                         <button 
// // // // // //                           className="delete-btn"
// // // // // //                           onClick={() => deleteReminder(reminder.id)}
// // // // // //                           aria-label={`Delete reminder ${index + 1}`}
// // // // // //                         >
// // // // // //                           Delete
// // // // // //                         </button>
// // // // // //                       </div>
// // // // // //                     </div>
                    
// // // // // //                     <div className="reminder-details">
// // // // // //                       <div className="detail-item">
// // // // // //                         <span className="label">What:</span>
// // // // // //                         <span className="value">{reminder.text}</span>
// // // // // //                       </div>
// // // // // //                       <div className="detail-item">
// // // // // //                         <span className="label">When:</span>
// // // // // //                         <span className="value">
// // // // // //                           {formatDate(reminder.time)} at {formatTime(reminder.time)}
// // // // // //                         </span>
// // // // // //                       </div>
// // // // // //                       <div className="detail-item">
// // // // // //                         <span className="label">Status:</span>
// // // // // //                         <span className="value">
// // // // // //                           {reminder.active ? 
// // // // // //                             `Will alert at ${formatTime(reminder.time)}` : 
// // // // // //                             'Already triggered'}
// // // // // //                         </span>
// // // // // //                       </div>
// // // // // //                     </div>
                    
// // // // // //                     <div className="reminder-voice-hint">
// // // // // //                       <small>Say: "Delete reminder {index + 1}" to remove</small>
// // // // // //                     </div>
// // // // // //                   </div>
// // // // // //                 ))}
// // // // // //               </div>
// // // // // //             )}
            
// // // // // //             {reminders.length > 0 && (
// // // // // //               <div className="bulk-actions">
// // // // // //                 <button 
// // // // // //                   className="clear-all-btn"
// // // // // //                   onClick={handleClearAllReminders}
// // // // // //                 >
// // // // // //                   🗑️ Clear All Reminders
// // // // // //                 </button>
// // // // // //               </div>
// // // // // //             )}
// // // // // //           </div>

// // // // // //           {/* Quick Actions */}
// // // // // //           <div className="quick-actions-section">
// // // // // //             <h3>Quick Actions</h3>
// // // // // //             <div className="action-buttons">
// // // // // //               <button 
// // // // // //                 className="action-btn"
// // // // // //                 onClick={handleShowReminders}
// // // // // //               >
// // // // // //                 🔊 Speak All Reminders
// // // // // //               </button>
// // // // // //               <button 
// // // // // //                 className="action-btn"
// // // // // //                 onClick={() => startStepByStepReminder('note')}
// // // // // //               >
// // // // // //                 🎤 Add New Reminder
// // // // // //               </button>
// // // // // //               <button 
// // // // // //                 className="action-btn"
// // // // // //                 onClick={() => {
// // // // // //                   const now = new Date();
// // // // // //                   now.setMinutes(now.getMinutes() + 2);
// // // // // //                   createReminder('Test reminder - voice control is working', now);
// // // // // //                 }}
// // // // // //               >
// // // // // //                 ⏰ Test Reminder (2 mins)
// // // // // //               </button>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       </div>

// // // // // //       {/* Fixed Status Bar */}
// // // // // //       <div className="status-bar">
// // // // // //         <div className="status-content">
// // // // // //           <div className="listening-status">
// // // // // //             {isListening ? (
// // // // // //               <span className="listening-indicator">
// // // // // //                 ● Listening... Say your command
// // // // // //               </span>
// // // // // //             ) : (
// // // // // //               <span>Voice control ready</span>
// // // // // //             )}
// // // // // //           </div>
// // // // // //           <div className="voice-controls">
// // // // // //             <button 
// // // // // //               className="help-btn"
// // // // // //               onClick={() => setShowHelp(!showHelp)}
// // // // // //             >
// // // // // //               {showHelp ? 'Hide Help' : 'Help'}
// // // // // //             </button>
// // // // // //             <button 
// // // // // //               className={`mic-btn ${isListening ? 'active' : ''}`}
// // // // // //               onClick={() => isListening ? stopListening() : startListening()}
// // // // // //               aria-label={isListening ? 'Stop listening' : 'Start listening'}
// // // // // //             >
// // // // // //               🎤
// // // // // //             </button>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default RemindersPage;





// // // // // import React, { useState, useEffect, useCallback } from 'react';
// // // // // import { useVoiceCommands } from '../../components/VoiceAssistant/useVoiceCommands';
// // // // // import './Reminders.css';

// // // // // const RemindersPage = () => {
// // // // //   const [reminders, setReminders] = useState([]);
// // // // //   const [status, setStatus] = useState('Voice reminders ready. Say "set reminder" to begin.');
// // // // //   const [showCommands, setShowCommands] = useState(false);
// // // // //   const [isEditing, setIsEditing] = useState(false);
// // // // //   const [editingId, setEditingId] = useState(null);
  
// // // // //   // Form fields
// // // // //   const [reminderText, setReminderText] = useState('');
// // // // //   const [reminderTime, setReminderTime] = useState('');
// // // // //   const [reminderDate, setReminderDate] = useState('');
// // // // //   const [repeatOption, setRepeatOption] = useState('once');
  
// // // // //   const { 
// // // // //     startListening, 
// // // // //     stopListening, 
// // // // //     speak, 
// // // // //     registerCommands,
// // // // //     isListening,
// // // // //     setOnResult
// // // // //   } = useVoiceCommands();

// // // // //   // Initialize
// // // // //   useEffect(() => {
// // // // //     // Load reminders from localStorage
// // // // //     const savedReminders = JSON.parse(localStorage.getItem('voice-reminders')) || [];
// // // // //     setReminders(savedReminders);
    
// // // // //     // Reschedule active reminders
// // // // //     savedReminders.forEach(reminder => {
// // // // //       if (reminder.active && new Date(reminder.time) > new Date()) {
// // // // //         scheduleReminder(reminder);
// // // // //       }
// // // // //     });

// // // // //     // Setup voice commands
// // // // //     const commands = {
// // // // //       // Navigation
// // // // //       'go back': () => navigateToDashboard(),
// // // // //       'go to dashboard': () => navigateToDashboard(),
// // // // //       'dashboard': () => navigateToDashboard(),
      
// // // // //       // Form field commands
// // // // //       'reminder text is (.*)': (match) => setReminderText(match[1]),
// // // // //       'reminder is (.*)': (match) => setReminderText(match[1]),
// // // // //       'remind me to (.*)': (match) => setReminderText(match[1]),
// // // // //       'text is (.*)': (match) => setReminderText(match[1]),
// // // // //       'note is (.*)': (match) => setReminderText(match[1]),
      
// // // // //       'time is (.*)': (match) => setTimeFromVoice(match[1]),
// // // // //       'at (.*)': (match) => setTimeFromVoice(match[1]),
// // // // //       'set time to (.*)': (match) => setTimeFromVoice(match[1]),
// // // // //       'tomorrow at (.*)': (match) => setDateTimeFromVoice(match[1], 'tomorrow'),
// // // // //       'today at (.*)': (match) => setDateTimeFromVoice(match[1], 'today'),
      
// // // // //       'date is (.*)': (match) => setDateFromVoice(match[1]),
// // // // //       'on (.*)': (match) => setDateFromVoice(match[1]),
      
// // // // //       'repeat daily': () => setRepeatOption('daily'),
// // // // //       'repeat weekly': () => setRepeatOption('weekly'),
// // // // //       'repeat monthly': () => setRepeatOption('monthly'),
// // // // //       'repeat once': () => setRepeatOption('once'),
      
// // // // //       // Action commands
// // // // //       'set reminder': () => handleSetReminderCommand(),
// // // // //       'add reminder': () => handleSetReminderCommand(),
// // // // //       'create reminder': () => handleSetReminderCommand(),
      
// // // // //       'save reminder': () => saveReminder(),
// // // // //       'add reminder now': () => saveReminder(),
      
// // // // //       'show reminders': () => listReminders(),
// // // // //       'list reminders': () => listReminders(),
// // // // //       'my reminders': () => listReminders(),
      
// // // // //       'delete reminder (.*)': (match) => deleteReminderByNumber(match[1]),
// // // // //       'remove reminder (.*)': (match) => deleteReminderByNumber(match[1]),
// // // // //       'clear all reminders': () => clearAllReminders(),
      
// // // // //       'edit reminder (.*)': (match) => editReminderByNumber(match[1]),
      
// // // // //       // Help
// // // // //       'show commands': () => {
// // // // //         setShowCommands(true);
// // // // //         speak('Showing available voice commands');
// // // // //       },
// // // // //       'help': () => {
// // // // //         speak('Available commands: set reminder, time is, date is, save reminder, show reminders, delete reminder');
// // // // //       },
      
// // // // //       'stop': () => {
// // // // //         stopListening();
// // // // //         speak('Voice control stopped');
// // // // //       },
// // // // //       'start': () => {
// // // // //         startListening();
// // // // //         speak('Voice control started');
// // // // //       }
// // // // //     };

// // // // //     registerCommands(commands);
    
// // // // //     // Set up voice input handler
// // // // //     setOnResult((transcript) => {
// // // // //       handleVoiceInput(transcript.toLowerCase());
// // // // //     });

// // // // //     // Auto-start listening
// // // // //     setTimeout(() => {
// // // // //       startListening();
// // // // //       speak('Voice reminders page loaded. Say "set reminder" to add a reminder.');
// // // // //     }, 1000);

// // // // //     return () => {
// // // // //       stopListening();
// // // // //     };
// // // // //   }, []);

// // // // //   // Save reminders to localStorage
// // // // //   useEffect(() => {
// // // // //     localStorage.setItem('voice-reminders', JSON.stringify(reminders));
// // // // //   }, [reminders]);

// // // // //   // Navigation
// // // // //   const navigateToDashboard = () => {
// // // // //     speak('Returning to dashboard');
// // // // //     window.location.href = '/dashboard';
// // // // //   };

// // // // //   // Time parsing from voice
// // // // //   const setTimeFromVoice = (timeStr) => {
// // // // //     const time = parseTimeString(timeStr);
// // // // //     if (time) {
// // // // //       const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
// // // // //       setReminderTime(formattedTime);
// // // // //       speak(`Time set to ${time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`);
// // // // //       setStatus(`Time set: ${time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`);
// // // // //     } else {
// // // // //       speak(`I didn't understand "${timeStr}". Please say time like "3 PM" or "14:30"`);
// // // // //     }
// // // // //   };

// // // // //   // Date and time from voice
// // // // //   const setDateTimeFromVoice = (timeStr, dateStr) => {
// // // // //     const time = parseTimeString(timeStr);
// // // // //     if (time) {
// // // // //       const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
// // // // //       setReminderTime(formattedTime);
      
// // // // //       const date = parseDateString(dateStr);
// // // // //       if (date) {
// // // // //         const formattedDate = date.toISOString().split('T')[0];
// // // // //         setReminderDate(formattedDate);
// // // // //       }
      
// // // // //       speak(`Set for ${dateStr} at ${time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`);
// // // // //       setStatus(`Set for ${dateStr} at ${time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`);
// // // // //     }
// // // // //   };

// // // // //   // Date parsing from voice
// // // // //   const setDateFromVoice = (dateStr) => {
// // // // //     const date = parseDateString(dateStr);
// // // // //     if (date) {
// // // // //       const formattedDate = date.toISOString().split('T')[0];
// // // // //       setReminderDate(formattedDate);
// // // // //       speak(`Date set to ${date.toLocaleDateString()}`);
// // // // //       setStatus(`Date set: ${date.toLocaleDateString()}`);
// // // // //     } else {
// // // // //       speak(`I didn't understand "${dateStr}". Please say date like "tomorrow" or "December 25"`);
// // // // //     }
// // // // //   };

// // // // //   // Parse time string
// // // // //   const parseTimeString = (timeStr) => {
// // // // //     const now = new Date();
    
// // // // //     // Handle "3 PM", "3:30 PM"
// // // // //     const timeMatch = timeStr.match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)?/i);
// // // // //     if (timeMatch) {
// // // // //       let hours = parseInt(timeMatch[1]);
// // // // //       const minutes = timeMatch[2] ? parseInt(timeMatch[2]) : 0;
// // // // //       const period = timeMatch[3] ? timeMatch[3].toLowerCase() : '';
      
// // // // //       // Convert to 24-hour
// // // // //       if (period === 'pm' && hours < 12) hours += 12;
// // // // //       if (period === 'am' && hours === 12) hours = 0;
      
// // // // //       const time = new Date();
// // // // //       time.setHours(hours, minutes, 0, 0);
      
// // // // //       // If time is in the past, schedule for tomorrow
// // // // //       if (time < now) {
// // // // //         time.setDate(time.getDate() + 1);
// // // // //       }
      
// // // // //       return time;
// // // // //     }
    
// // // // //     // Handle "14:30" (24-hour format)
// // // // //     const milMatch = timeStr.match(/(\d{1,2}):(\d{2})/);
// // // // //     if (milMatch) {
// // // // //       const hours = parseInt(milMatch[1]);
// // // // //       const minutes = parseInt(milMatch[2]);
      
// // // // //       const time = new Date();
// // // // //       time.setHours(hours, minutes, 0, 0);
      
// // // // //       if (time < now) {
// // // // //         time.setDate(time.getDate() + 1);
// // // // //       }
      
// // // // //       return time;
// // // // //     }
    
// // // // //     return null;
// // // // //   };

// // // // //   // Parse date string
// // // // //   const parseDateString = (dateStr) => {
// // // // //     const now = new Date();
    
// // // // //     if (dateStr === 'today') {
// // // // //       return now;
// // // // //     }
    
// // // // //     if (dateStr === 'tomorrow') {
// // // // //       const tomorrow = new Date(now);
// // // // //       tomorrow.setDate(tomorrow.getDate() + 1);
// // // // //       return tomorrow;
// // // // //     }
    
// // // // //     // Handle "December 25"
// // // // //     const date = new Date(dateStr);
// // // // //     if (!isNaN(date.getTime())) {
// // // // //       return date;
// // // // //     }
    
// // // // //     return null;
// // // // //   };

// // // // //   // Handle voice input
// // // // //   const handleVoiceInput = useCallback((transcript) => {
// // // // //     console.log('Voice input:', transcript);
    
// // // // //     // Check if it's a complete reminder sentence
// // // // //     const patterns = [
// // // // //       /remind me to (.+) (?:at|on) (.+)/i,
// // // // //       /set reminder (.+) (?:at|on) (.+)/i,
// // // // //       /add reminder (.+) (?:at|on) (.+)/i,
// // // // //       /(.+) at (.+)/i,
// // // // //       /(.+) on (.+)/i,
// // // // //     ];
    
// // // // //     for (const pattern of patterns) {
// // // // //       const match = transcript.match(pattern);
// // // // //       if (match) {
// // // // //         const note = match[1].trim();
// // // // //         const timeDateStr = match[2].trim();
        
// // // // //         // Try to parse as complete datetime
// // // // //         const dateTime = parseCompleteDateTime(note, timeDateStr);
// // // // //         if (dateTime) {
// // // // //           createCompleteReminder(note, dateTime);
// // // // //           return;
// // // // //         }
// // // // //       }
// // // // //     }
// // // // //   }, []);

// // // // //   // Parse complete datetime string
// // // // //   const parseCompleteDateTime = (note, timeDateStr) => {
// // // // //     // Try patterns like "tomorrow at 3 PM" or "December 25 at 2:30 PM"
// // // // //     const patterns = [
// // // // //       /(today|tomorrow)\s+at\s+(.+)/i,
// // // // //       /(\w+\s+\d{1,2}(?:,\s*\d{4})?)\s+at\s+(.+)/i,
// // // // //       /(.+)/i  // Fallback - just time
// // // // //     ];
    
// // // // //     for (const pattern of patterns) {
// // // // //       const match = timeDateStr.match(pattern);
// // // // //       if (match) {
// // // // //         let dateStr, timeStr;
        
// // // // //         if (match[1] && match[2]) {
// // // // //           dateStr = match[1];
// // // // //           timeStr = match[2];
// // // // //         } else {
// // // // //           dateStr = 'today';
// // // // //           timeStr = match[1];
// // // // //         }
        
// // // // //         const date = parseDateString(dateStr);
// // // // //         const time = parseTimeString(timeStr);
        
// // // // //         if (date && time) {
// // // // //           const dateTime = new Date(date);
// // // // //           dateTime.setHours(time.getHours(), time.getMinutes(), 0, 0);
// // // // //           return dateTime;
// // // // //         }
// // // // //       }
// // // // //     }
    
// // // // //     return null;
// // // // //   };

// // // // //   // Create reminder from complete sentence
// // // // //   const createCompleteReminder = (note, dateTime) => {
// // // // //     const reminder = {
// // // // //       id: Date.now(),
// // // // //       text: note,
// // // // //       time: dateTime.toISOString(),
// // // // //       active: true,
// // // // //       createdAt: new Date().toISOString(),
// // // // //       date: dateTime.toISOString().split('T')[0],
// // // // //       timeStr: dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
// // // // //       repeat: 'once'
// // // // //     };
    
// // // // //     setReminders(prev => [...prev, reminder]);
// // // // //     scheduleReminder(reminder);
    
// // // // //     const timeStr = dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
// // // // //     const dateStr = dateTime.toLocaleDateString();
// // // // //     speak(`Reminder set for ${dateStr} at ${timeStr}: ${note}`);
// // // // //     setStatus(`Reminder added: ${note} on ${dateStr} at ${timeStr}`);
    
// // // // //     // Clear form
// // // // //     setReminderText('');
// // // // //     setReminderTime('');
// // // // //     setReminderDate('');
// // // // //   };

// // // // //   // Handle set reminder command
// // // // //   const handleSetReminderCommand = () => {
// // // // //     speak('Please tell me the reminder text. Say something like "reminder text is meeting with team"');
// // // // //     setStatus('Waiting for reminder text...');
// // // // //   };

// // // // //   // Save reminder from form
// // // // //   const saveReminder = () => {
// // // // //     if (!reminderText.trim()) {
// // // // //       speak('Please provide reminder text first');
// // // // //       setStatus('Reminder text is required');
// // // // //       return;
// // // // //     }
    
// // // // //     let dateTime;
    
// // // // //     if (reminderDate && reminderTime) {
// // // // //       const [year, month, day] = reminderDate.split('-').map(Number);
// // // // //       const [hours, minutes] = reminderTime.split(':').map(Number);
// // // // //       dateTime = new Date(year, month - 1, day, hours, minutes, 0);
// // // // //     } else if (reminderTime) {
// // // // //       dateTime = parseTimeString(reminderTime);
// // // // //       if (!reminderDate) {
// // // // //         // If no date provided, use today
// // // // //         const today = new Date();
// // // // //         dateTime.setFullYear(today.getFullYear(), today.getMonth(), today.getDate());
// // // // //       }
// // // // //     } else {
// // // // //       // Default: 1 hour from now
// // // // //       dateTime = new Date();
// // // // //       dateTime.setHours(dateTime.getHours() + 1);
// // // // //     }
    
// // // // //     if (isEditing && editingId) {
// // // // //       // Update existing reminder
// // // // //       setReminders(prev => prev.map(reminder => 
// // // // //         reminder.id === editingId ? {
// // // // //           ...reminder,
// // // // //           text: reminderText,
// // // // //           time: dateTime.toISOString(),
// // // // //           date: dateTime.toISOString().split('T')[0],
// // // // //           timeStr: dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
// // // // //           repeat: repeatOption
// // // // //         } : reminder
// // // // //       ));
      
// // // // //       speak(`Reminder updated: ${reminderText}`);
// // // // //       setStatus(`Reminder updated: ${reminderText}`);
// // // // //       setIsEditing(false);
// // // // //       setEditingId(null);
// // // // //     } else {
// // // // //       // Create new reminder
// // // // //       const reminder = {
// // // // //         id: Date.now(),
// // // // //         text: reminderText,
// // // // //         time: dateTime.toISOString(),
// // // // //         active: true,
// // // // //         createdAt: new Date().toISOString(),
// // // // //         date: dateTime.toISOString().split('T')[0],
// // // // //         timeStr: dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
// // // // //         repeat: repeatOption
// // // // //       };
      
// // // // //       setReminders(prev => [...prev, reminder]);
// // // // //       scheduleReminder(reminder);
      
// // // // //       const timeStr = dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
// // // // //       const dateStr = reminderDate || 'Today';
// // // // //       speak(`Reminder added: ${reminderText} on ${dateStr} at ${timeStr}`);
// // // // //       setStatus(`Reminder added: ${reminderText} on ${dateStr} at ${timeStr}`);
// // // // //     }
    
// // // // //     // Clear form
// // // // //     setReminderText('');
// // // // //     setReminderTime('');
// // // // //     setReminderDate('');
// // // // //     setRepeatOption('once');
// // // // //   };

// // // // //   // Schedule reminder alert
// // // // //   const scheduleReminder = (reminder) => {
// // // // //     const reminderTime = new Date(reminder.time);
// // // // //     const now = new Date();
// // // // //     const delay = reminderTime.getTime() - now.getTime();
    
// // // // //     if (delay > 0 && delay < 7 * 24 * 60 * 60 * 1000) { // Within 7 days
// // // // //       setTimeout(() => {
// // // // //         speak(`Reminder: ${reminder.text}`);
        
// // // // //         // Update reminder status
// // // // //         setReminders(prev => prev.map(r => 
// // // // //           r.id === reminder.id ? { ...r, active: false } : r
// // // // //         ));
        
// // // // //         // Show notification
// // // // //         if (document.visibilityState === 'visible') {
// // // // //           setStatus(`🔔 Reminder: ${reminder.text}`);
// // // // //         }
// // // // //       }, delay);
// // // // //     }
// // // // //   };

// // // // //   // List all reminders
// // // // //   const listReminders = () => {
// // // // //     if (reminders.length === 0) {
// // // // //       speak('You have no reminders');
// // // // //       setStatus('No reminders found');
// // // // //       return;
// // // // //     }
    
// // // // //     speak(`You have ${reminders.length} reminder${reminders.length === 1 ? '' : 's'}`);
    
// // // // //     reminders.forEach((reminder, index) => {
// // // // //       setTimeout(() => {
// // // // //         const time = new Date(reminder.time);
// // // // //         const timeStr = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
// // // // //         const dateStr = new Date(reminder.date).toLocaleDateString();
// // // // //         speak(`Reminder ${index + 1}: ${reminder.text} on ${dateStr} at ${timeStr}`);
// // // // //       }, (index + 1) * 1500);
// // // // //     });
    
// // // // //     setStatus(`Showing ${reminders.length} reminder${reminders.length === 1 ? '' : 's'}`);
// // // // //   };

// // // // //   // Delete reminder by number
// // // // //   const deleteReminderByNumber = (input) => {
// // // // //     const numMatch = input.match(/(\d+)/);
// // // // //     const wordMatch = input.match(/\b(one|two|three|four|five|six|seven|eight|nine|ten)\b/i);
    
// // // // //     let index = -1;
    
// // // // //     if (numMatch) {
// // // // //       index = parseInt(numMatch[1]) - 1;
// // // // //     } else if (wordMatch) {
// // // // //       const numberWords = {
// // // // //         'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5,
// // // // //         'six': 6, 'seven': 7, 'eight': 8, 'nine': 9, 'ten': 10
// // // // //       };
// // // // //       index = numberWords[wordMatch[0].toLowerCase()] - 1;
// // // // //     }
    
// // // // //     if (index >= 0 && index < reminders.length) {
// // // // //       const deleted = reminders[index];
// // // // //       setReminders(prev => prev.filter((_, i) => i !== index));
// // // // //       speak(`Deleted reminder ${index + 1}: ${deleted.text}`);
// // // // //       setStatus(`Deleted: "${deleted.text}"`);
// // // // //     } else {
// // // // //       speak(`Could not find reminder. You have ${reminders.length} reminders.`);
// // // // //     }
// // // // //   };

// // // // //   // Edit reminder by number
// // // // //   const editReminderByNumber = (input) => {
// // // // //     const numMatch = input.match(/(\d+)/);
// // // // //     const wordMatch = input.match(/\b(one|two|three|four|five|six|seven|eight|nine|ten)\b/i);
    
// // // // //     let index = -1;
    
// // // // //     if (numMatch) {
// // // // //       index = parseInt(numMatch[1]) - 1;
// // // // //     } else if (wordMatch) {
// // // // //       const numberWords = {
// // // // //         'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5,
// // // // //         'six': 6, 'seven': 7, 'eight': 8, 'nine': 9, 'ten': 10
// // // // //       };
// // // // //       index = numberWords[wordMatch[0].toLowerCase()] - 1;
// // // // //     }
    
// // // // //     if (index >= 0 && index < reminders.length) {
// // // // //       const reminder = reminders[index];
// // // // //       setReminderText(reminder.text);
// // // // //       setReminderDate(reminder.date);
// // // // //       setReminderTime(reminder.timeStr);
// // // // //       setRepeatOption(reminder.repeat || 'once');
// // // // //       setIsEditing(true);
// // // // //       setEditingId(reminder.id);
      
// // // // //       speak(`Editing reminder ${index + 1}: ${reminder.text}`);
// // // // //       setStatus(`Editing reminder ${index + 1}`);
// // // // //     }
// // // // //   };

// // // // //   // Clear all reminders
// // // // //   const clearAllReminders = () => {
// // // // //     if (reminders.length > 0) {
// // // // //       setReminders([]);
// // // // //       speak('All reminders have been cleared');
// // // // //       setStatus('All reminders cleared');
// // // // //     } else {
// // // // //       speak('No reminders to clear');
// // // // //     }
// // // // //   };

// // // // //   // Manual delete
// // // // //   const deleteReminder = (id) => {
// // // // //     setReminders(prev => prev.filter(r => r.id !== id));
// // // // //     speak('Reminder deleted');
// // // // //     setStatus('Reminder deleted');
// // // // //   };

// // // // //   // Toggle reminder
// // // // //   const toggleReminder = (id) => {
// // // // //     setReminders(prev => prev.map(reminder => {
// // // // //       if (reminder.id === id) {
// // // // //         const updated = { ...reminder, active: !reminder.active };
// // // // //         if (updated.active && new Date(updated.time) > new Date()) {
// // // // //           scheduleReminder(updated);
// // // // //         }
// // // // //         return updated;
// // // // //       }
// // // // //       return reminder;
// // // // //     }));
// // // // //   };

// // // // //   // Format date for display
// // // // //   const formatDisplayDate = (dateStr) => {
// // // // //     const date = new Date(dateStr);
// // // // //     const today = new Date();
// // // // //     const tomorrow = new Date();
// // // // //     tomorrow.setDate(tomorrow.getDate() + 1);
    
// // // // //     if (date.toDateString() === today.toDateString()) {
// // // // //       return 'Today';
// // // // //     } else if (date.toDateString() === tomorrow.toDateString()) {
// // // // //       return 'Tomorrow';
// // // // //     } else {
// // // // //       return date.toLocaleDateString();
// // // // //     }
// // // // //   };

// // // // //   // Reset form
// // // // //   const resetForm = () => {
// // // // //     setReminderText('');
// // // // //     setReminderTime('');
// // // // //     setReminderDate('');
// // // // //     setRepeatOption('once');
// // // // //     setIsEditing(false);
// // // // //     setEditingId(null);
// // // // //   };

// // // // //   return (
// // // // //     <div className="reminders-page">
// // // // //       {/* Fixed Header */}
// // // // //       <header className="fixed-header">
// // // // //         <div className="header-content">
// // // // //           <div className="header-left">
// // // // //             <button 
// // // // //               className="back-btn"
// // // // //               onClick={navigateToDashboard}
// // // // //               aria-label="Go back to dashboard"
// // // // //             >
// // // // //               ← Back
// // // // //             </button>
// // // // //             <h1 className="logo">VISIONA</h1>
// // // // //           </div>
          
// // // // //           <div className="header-title">
// // // // //             <h2>Voice Reminders</h2>
// // // // //             <p className="subtitle">Set reminders using natural voice commands</p>
// // // // //           </div>
          
// // // // //           <div className="user-menu">
// // // // //             <button 
// // // // //               className={`voice-btn ${isListening ? 'listening' : ''}`}
// // // // //               onClick={() => {
// // // // //                 if (isListening) {
// // // // //                   stopListening();
// // // // //                   speak('Voice control paused');
// // // // //                 } else {
// // // // //                   startListening();
// // // // //                   speak('Voice control activated');
// // // // //                 }
// // // // //               }}
// // // // //               aria-label={isListening ? 'Stop listening' : 'Start listening'}
// // // // //             >
// // // // //               🎤 {isListening ? 'Listening...' : 'Voice'}
// // // // //             </button>
// // // // //           </div>
// // // // //         </div>
// // // // //       </header>

// // // // //       {/* Main Content */}
// // // // //       <div className="reminders-content">
// // // // //         <div className="reminders-container">
// // // // //           {/* Status Message */}
// // // // //           <div className="status-message">
// // // // //             <div className="status-text">
// // // // //               {isListening ? '🎤 Listening... Speak your command' : status}
// // // // //             </div>
// // // // //             <button 
// // // // //               className="clear-status-btn"
// // // // //               onClick={() => setStatus('Ready for voice commands')}
// // // // //               aria-label="Clear status"
// // // // //             >
// // // // //               ×
// // // // //             </button>
// // // // //           </div>

// // // // //           {/* Voice Commands Section */}
// // // // //           <div className="voice-commands-section">
// // // // //             <div className="section-header">
// // // // //               <h3>Voice Control</h3>
// // // // //               <button 
// // // // //                 className="voice-help-btn"
// // // // //                 onClick={() => setShowCommands(!showCommands)}
// // // // //               >
// // // // //                 {showCommands ? 'Hide Commands' : 'Show Commands'}
// // // // //               </button>
// // // // //             </div>
            
// // // // //             {showCommands && (
// // // // //               <div className="voice-commands-panel">
// // // // //                 <h4>Available Voice Commands</h4>
// // // // //                 <div className="commands-grid">
// // // // //                   <div className="command-category">
// // // // //                     <h5>Quick Reminders</h5>
// // // // //                     <ul>
// // // // //                       <li>"Remind me to call mom at 3 PM"</li>
// // // // //                       <li>"Set reminder team meeting tomorrow at 11 AM"</li>
// // // // //                       <li>"Add reminder doctor appointment on December 25 at 2:30 PM"</li>
// // // // //                     </ul>
// // // // //                   </div>
// // // // //                   <div className="command-category">
// // // // //                     <h5>Step-by-Step</h5>
// // // // //                     <ul>
// // // // //                       <li>"Reminder text is [your text]"</li>
// // // // //                       <li>"Time is [3 PM]" or "At [14:30]"</li>
// // // // //                       <li>"Date is [tomorrow]" or "On [December 25]"</li>
// // // // //                       <li>"Save reminder" to confirm</li>
// // // // //                     </ul>
// // // // //                   </div>
// // // // //                   <div className="command-category">
// // // // //                     <h5>Manage Reminders</h5>
// // // // //                     <ul>
// // // // //                       <li>"Show reminders"</li>
// // // // //                       <li>"Delete reminder one" or "Delete reminder 1"</li>
// // // // //                       <li>"Edit reminder two"</li>
// // // // //                       <li>"Clear all reminders"</li>
// // // // //                     </ul>
// // // // //                   </div>
// // // // //                 </div>
// // // // //                 <div className="voice-tips">
// // // // //                   <p><strong>💡 Tip:</strong> Speak naturally. The system understands dates like "tomorrow", "next Monday", and times like "3 PM", "14:30".</p>
// // // // //                 </div>
// // // // //               </div>
// // // // //             )}
// // // // //           </div>

// // // // //           {/* Add Reminder Form */}
// // // // //           <div className="reminder-form-section">
// // // // //             <div className="section-header">
// // // // //               <h3>{isEditing ? 'Edit Reminder' : 'Add New Reminder'}</h3>
// // // // //               {isEditing && (
// // // // //                 <button className="cancel-edit-btn" onClick={resetForm}>
// // // // //                   Cancel Edit
// // // // //                 </button>
// // // // //               )}
// // // // //             </div>
            
// // // // //             <div className="reminder-form">
// // // // //               <div className="form-group">
// // // // //                 <label htmlFor="reminderText">Reminder Text *</label>
// // // // //                 <input
// // // // //                   type="text"
// // // // //                   id="reminderText"
// // // // //                   value={reminderText}
// // // // //                   onChange={(e) => setReminderText(e.target.value)}
// // // // //                   placeholder="e.g., Meeting with team"
// // // // //                   className="form-input"
// // // // //                 />
// // // // //                 <div className="voice-hint">
// // // // //                   Say: "reminder text is [your text]" or "remind me to [your text]"
// // // // //                 </div>
// // // // //               </div>
              
// // // // //               <div className="form-row">
// // // // //                 <div className="form-group">
// // // // //                   <label htmlFor="reminderDate">Date</label>
// // // // //                   <input
// // // // //                     type="date"
// // // // //                     id="reminderDate"
// // // // //                     value={reminderDate}
// // // // //                     onChange={(e) => setReminderDate(e.target.value)}
// // // // //                     className="form-input"
// // // // //                   />
// // // // //                   <div className="voice-hint">
// // // // //                     Say: "date is [tomorrow]" or "on [December 25]"
// // // // //                   </div>
// // // // //                 </div>
                
// // // // //                 <div className="form-group">
// // // // //                   <label htmlFor="reminderTime">Time *</label>
// // // // //                   <input
// // // // //                     type="time"
// // // // //                     id="reminderTime"
// // // // //                     value={reminderTime}
// // // // //                     onChange={(e) => setReminderTime(e.target.value)}
// // // // //                     className="form-input"
// // // // //                   />
// // // // //                   <div className="voice-hint">
// // // // //                     Say: "time is [3 PM]" or "at [14:30]"
// // // // //                   </div>
// // // // //                 </div>
// // // // //               </div>
              
// // // // //               <div className="form-group">
// // // // //                 <label htmlFor="repeatOption">Repeat</label>
// // // // //                 <select
// // // // //                   id="repeatOption"
// // // // //                   value={repeatOption}
// // // // //                   onChange={(e) => setRepeatOption(e.target.value)}
// // // // //                   className="form-input"
// // // // //                 >
// // // // //                   <option value="once">Once</option>
// // // // //                   <option value="daily">Daily</option>
// // // // //                   <option value="weekly">Weekly</option>
// // // // //                   <option value="monthly">Monthly</option>
// // // // //                 </select>
// // // // //                 <div className="voice-hint">
// // // // //                   Say: "repeat daily", "repeat weekly", or "repeat once"
// // // // //                 </div>
// // // // //               </div>
              
// // // // //               <div className="form-actions">
// // // // //                 <button 
// // // // //                   className="submit-btn"
// // // // //                   onClick={saveReminder}
// // // // //                   disabled={!reminderText.trim() || !reminderTime}
// // // // //                 >
// // // // //                   {isEditing ? 'Update Reminder' : 'Add Reminder'}
// // // // //                 </button>
// // // // //                 <button 
// // // // //                   className="cancel-btn"
// // // // //                   onClick={resetForm}
// // // // //                 >
// // // // //                   Reset
// // // // //                 </button>
// // // // //                 <div className="voice-action-hint">
// // // // //                   Or say: "save reminder" to add
// // // // //                 </div>
// // // // //               </div>
// // // // //             </div>
// // // // //           </div>

// // // // //           {/* Reminders List */}
// // // // //           <div className="reminders-list-section">
// // // // //             <div className="section-header">
// // // // //               <h3>Your Reminders ({reminders.length})</h3>
// // // // //               <div className="list-actions">
// // // // //                 <button 
// // // // //                   className="refresh-btn"
// // // // //                   onClick={listReminders}
// // // // //                   title="Read all reminders"
// // // // //                 >
// // // // //                   🔊 Speak All
// // // // //                 </button>
// // // // //               </div>
// // // // //             </div>
            
// // // // //             {reminders.length === 0 ? (
// // // // //               <div className="empty-state">
// // // // //                 <div className="empty-icon">⏰</div>
// // // // //                 <h4>No reminders yet</h4>
// // // // //                 <p>Use the form above or voice commands to add reminders</p>
// // // // //               </div>
// // // // //             ) : (
// // // // //               <div className="reminders-grid">
// // // // //                 {reminders.map((reminder, index) => (
// // // // //                   <div 
// // // // //                     key={reminder.id} 
// // // // //                     className={`reminder-card ${reminder.active ? 'active' : 'inactive'}`}
// // // // //                   >
// // // // //                     <div className="reminder-header">
// // // // //                       <div className="reminder-number">#{index + 1}</div>
// // // // //                       <div className="reminder-status">
// // // // //                         {reminder.active ? '⏰ Active' : '✓ Triggered'}
// // // // //                       </div>
// // // // //                     </div>
                    
// // // // //                     <div className="reminder-content">
// // // // //                       <div className="reminder-text">{reminder.text}</div>
// // // // //                       <div className="reminder-details">
// // // // //                         <div className="reminder-time">
// // // // //                           <span className="date">{formatDisplayDate(reminder.date)}</span>
// // // // //                           <span className="time">{reminder.timeStr}</span>
// // // // //                         </div>
// // // // //                         <div className="reminder-repeat">
// // // // //                           Repeat: {reminder.repeat || 'Once'}
// // // // //                         </div>
// // // // //                       </div>
// // // // //                     </div>
                    
// // // // //                     <div className="reminder-actions">
// // // // //                       <button 
// // // // //                         className="edit-btn"
// // // // //                         onClick={() => {
// // // // //                           setReminderText(reminder.text);
// // // // //                           setReminderDate(reminder.date);
// // // // //                           setReminderTime(reminder.timeStr);
// // // // //                           setRepeatOption(reminder.repeat || 'once');
// // // // //                           setIsEditing(true);
// // // // //                           setEditingId(reminder.id);
// // // // //                           speak(`Editing reminder ${index + 1}`);
// // // // //                         }}
// // // // //                       >
// // // // //                         Edit
// // // // //                       </button>
// // // // //                       <button 
// // // // //                         className="toggle-btn"
// // // // //                         onClick={() => toggleReminder(reminder.id)}
// // // // //                       >
// // // // //                         {reminder.active ? 'Deactivate' : 'Activate'}
// // // // //                       </button>
// // // // //                       <button 
// // // // //                         className="delete-btn"
// // // // //                         onClick={() => deleteReminder(reminder.id)}
// // // // //                       >
// // // // //                         Delete
// // // // //                       </button>
// // // // //                     </div>
                    
// // // // //                     <div className="voice-hint">
// // // // //                       Say: "delete reminder {index + 1}" or "edit reminder {index + 1}"
// // // // //                     </div>
// // // // //                   </div>
// // // // //                 ))}
// // // // //               </div>
// // // // //             )}
            
// // // // //             {reminders.length > 0 && (
// // // // //               <div className="bulk-actions">
// // // // //                 <button 
// // // // //                   className="clear-all-btn"
// // // // //                   onClick={clearAllReminders}
// // // // //                 >
// // // // //                   🗑️ Clear All Reminders
// // // // //                 </button>
// // // // //               </div>
// // // // //             )}
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>

// // // // //       {/* Status Bar */}
// // // // //       <div className="status-bar">
// // // // //         <div className="status-content">
// // // // //           <div className="listening-status">
// // // // //             {isListening ? (
// // // // //               <>
// // // // //                 <span className="listening-dot"></span>
// // // // //                 Listening for commands...
// // // // //               </>
// // // // //             ) : (
// // // // //               'Say "start" to enable voice control'
// // // // //             )}
// // // // //           </div>
// // // // //           <div className="voice-controls">
// // // // //             <button 
// // // // //               className="help-btn"
// // // // //               onClick={() => setShowCommands(!showCommands)}
// // // // //             >
// // // // //               {showCommands ? 'Hide Help' : 'Help'}
// // // // //             </button>
// // // // //             <button 
// // // // //               className={`mic-btn ${isListening ? 'active' : ''}`}
// // // // //               onClick={() => isListening ? stopListening() : startListening()}
// // // // //             >
// // // // //               🎤
// // // // //             </button>
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default RemindersPage;




// // // // // src/pages/Reminders/Reminders.jsx
// // // // import React, { useState, useEffect, useRef } from 'react';
// // // // import './Reminders.css';

// // // // const RemindersPage = () => {
// // // //   const [reminders, setReminders] = useState([]);
// // // //   const [isListening, setIsListening] = useState(false);
// // // //   const [status, setStatus] = useState('Voice reminders ready. Say "set reminder" to begin.');
// // // //   const [showCommands, setShowCommands] = useState(false);
// // // //   const [isEditing, setIsEditing] = useState(false);
// // // //   const [editingId, setEditingId] = useState(null);
  
// // // //   // Form state
// // // //   const [reminderText, setReminderText] = useState('');
// // // //   const [reminderTime, setReminderTime] = useState('');
// // // //   const [reminderDate, setReminderDate] = useState('');
// // // //   const [repeatOption, setRepeatOption] = useState('once');
  
// // // //   const recognitionRef = useRef(null);
// // // //   const shouldListenRef = useRef(true);

// // // //   // Initialize speech recognition
// // // //   const initSpeechRecognition = () => {
// // // //     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
// // // //     if (!SpeechRecognition) {
// // // //       setStatus('Speech recognition not supported in this browser');
// // // //       return null;
// // // //     }

// // // //     const recognition = new SpeechRecognition();
// // // //     recognition.continuous = true;
// // // //     recognition.interimResults = false;
// // // //     recognition.lang = 'en-US';

// // // //     recognition.onstart = () => {
// // // //       setIsListening(true);
// // // //       speak('Listening for commands');
// // // //     };

// // // //     recognition.onresult = (event) => {
// // // //       const transcript = event.results[0][0].transcript.toLowerCase().trim();
// // // //       console.log('Heard:', transcript);
// // // //       setStatus(`Heard: "${transcript}"`);
// // // //       handleVoiceCommand(transcript);
// // // //     };

// // // //     recognition.onerror = (event) => {
// // // //       console.log('Speech recognition error:', event.error);
// // // //       if (event.error === 'not-allowed') {
// // // //         setStatus('Microphone access required. Please allow microphone permission.');
// // // //       }
// // // //     };

// // // //     recognition.onend = () => {
// // // //       setIsListening(false);
// // // //       // Auto-restart if we should still be listening
// // // //       if (shouldListenRef.current) {
// // // //         setTimeout(() => {
// // // //           if (recognitionRef.current) {
// // // //             try {
// // // //               recognitionRef.current.start();
// // // //             } catch (err) {
// // // //               console.log('Error restarting:', err);
// // // //             }
// // // //           }
// // // //         }, 100);
// // // //       }
// // // //     };

// // // //     return recognition;
// // // //   };

// // // //   // Speak text
// // // //   const speak = (text) => {
// // // //     if ('speechSynthesis' in window) {
// // // //       // Cancel any ongoing speech
// // // //       window.speechSynthesis.cancel();
      
// // // //       const utterance = new SpeechSynthesisUtterance(text);
// // // //       utterance.rate = 1.0;
// // // //       utterance.pitch = 1.0;
// // // //       utterance.volume = 1.0;
      
// // // //       utterance.onstart = () => {
// // // //         console.log('Speaking:', text);
// // // //       };
      
// // // //       utterance.onerror = (event) => {
// // // //         console.log('Speech synthesis error:', event);
// // // //       };
      
// // // //       window.speechSynthesis.speak(utterance);
// // // //     }
// // // //   };

// // // //   // Initialize on component mount
// // // //   useEffect(() => {
// // // //     // Load saved reminders from localStorage
// // // //     const saved = JSON.parse(localStorage.getItem('voice-reminders')) || [];
// // // //     setReminders(saved);
    
// // // //     // Initialize speech recognition
// // // //     const recognition = initSpeechRecognition();
// // // //     if (recognition) {
// // // //       recognitionRef.current = recognition;
      
// // // //       // Auto-start after a delay
// // // //       setTimeout(() => {
// // // //         try {
// // // //           recognition.start();
// // // //           speak('Voice reminders system ready. Say "help" for commands.');
// // // //         } catch (err) {
// // // //           console.log('Failed to start recognition:', err);
// // // //           setStatus('Click microphone button to start voice control');
// // // //         }
// // // //       }, 1000);
// // // //     }

// // // //     // Setup reminder checking interval
// // // //     const checkInterval = setInterval(checkDueReminders, 30000); // Check every 30 seconds

// // // //     // Check immediately on load
// // // //     checkDueReminders();

// // // //     return () => {
// // // //       shouldListenRef.current = false;
// // // //       if (recognitionRef.current) {
// // // //         recognitionRef.current.stop();
// // // //       }
// // // //       clearInterval(checkInterval);
// // // //       window.speechSynthesis.cancel();
// // // //     };
// // // //   }, []);

// // // //   // Save reminders to localStorage whenever they change
// // // //   useEffect(() => {
// // // //     localStorage.setItem('voice-reminders', JSON.stringify(reminders));
// // // //   }, [reminders]);

// // // //   // Handle voice commands
// // // //   const handleVoiceCommand = (command) => {
// // // //     console.log('Processing command:', command);
    
// // // //     // Single sentence commands
// // // //     if (command.includes('remind me to') || command.includes('set reminder') || command.includes('add reminder')) {
// // // //       handleCompleteReminder(command);
// // // //     }
    
// // // //     // Step-by-step commands
// // // //     else if (command === 'set reminder' || command === 'add reminder' || command === 'create reminder') {
// // // //       startStepByStep();
// // // //     }
    
// // // //     // Form field commands
// // // //     else if (command.startsWith('reminder text is') || command.startsWith('text is') || command.startsWith('note is')) {
// // // //       const text = command.replace(/reminder text is|text is|note is/i, '').trim();
// // // //       if (text) {
// // // //         setReminderText(text);
// // // //         speak(`Reminder text set to: ${text}`);
// // // //         setStatus(`Text: ${text}`);
// // // //       }
// // // //     }
    
// // // //     else if (command.startsWith('time is') || command.startsWith('at') || command.startsWith('set time to')) {
// // // //       const timeStr = command.replace(/time is|at|set time to/i, '').trim();
// // // //       const time = parseTimeFromText(timeStr);
// // // //       if (time) {
// // // //         setReminderTime(time);
// // // //         speak(`Time set to ${time}`);
// // // //         setStatus(`Time: ${time}`);
// // // //       }
// // // //     }
    
// // // //     else if (command.startsWith('date is') || command.startsWith('on')) {
// // // //       const dateStr = command.replace(/date is|on/i, '').trim();
// // // //       const date = parseDateFromText(dateStr);
// // // //       if (date) {
// // // //         setReminderDate(date);
// // // //         speak(`Date set to ${formatDisplayDate(date)}`);
// // // //         setStatus(`Date: ${formatDisplayDate(date)}`);
// // // //       }
// // // //     }
    
// // // //     else if (command.includes('repeat daily')) {
// // // //       setRepeatOption('daily');
// // // //       speak('Set to repeat daily');
// // // //       setStatus('Repeat: Daily');
// // // //     }
    
// // // //     else if (command.includes('repeat weekly')) {
// // // //       setRepeatOption('weekly');
// // // //       speak('Set to repeat weekly');
// // // //       setStatus('Repeat: Weekly');
// // // //     }
    
// // // //     else if (command.includes('repeat once') || command.includes('no repeat')) {
// // // //       setRepeatOption('once');
// // // //       speak('Set to repeat once');
// // // //       setStatus('Repeat: Once');
// // // //     }
    
// // // //     // Action commands
// // // //     else if (command.includes('save reminder') || command.includes('add reminder now')) {
// // // //       saveReminder();
// // // //     }
    
// // // //     else if (command.includes('show reminders') || command.includes('list reminders') || command.includes('my reminders')) {
// // // //       listReminders();
// // // //     }
    
// // // //     else if (command.includes('delete reminder')) {
// // // //       handleDeleteCommand(command);
// // // //     }
    
// // // //     else if (command.includes('clear all reminders') || command.includes('remove all reminders')) {
// // // //       clearAllReminders();
// // // //     }
    
// // // //     else if (command.includes('edit reminder')) {
// // // //       handleEditCommand(command);
// // // //     }
    
// // // //     // Navigation
// // // //     else if (command.includes('go back') || command.includes('go to dashboard') || command.includes('dashboard')) {
// // // //       speak('Returning to dashboard');
// // // //       setTimeout(() => {
// // // //         window.location.href = '/dashboard';
// // // //       }, 1000);
// // // //     }
    
// // // //     // Help
// // // //     else if (command.includes('help') || command.includes('what can i say')) {
// // // //       setShowCommands(true);
// // // //       speak('Available commands: set reminder, time is, date is, save reminder, show reminders, delete reminder, clear all reminders');
// // // //     }
    
// // // //     // Start/stop listening
// // // //     else if (command.includes('stop listening') || command === 'stop') {
// // // //       stopListening();
// // // //       speak('Voice control stopped');
// // // //     }
    
// // // //     else if (command.includes('start listening') || command === 'start') {
// // // //       startListening();
// // // //       speak('Voice control started');
// // // //     }
    
// // // //     else {
// // // //       // If no command matched, it might be reminder text
// // // //       if (!reminderText && command.length > 3) {
// // // //         setReminderText(command);
// // // //         speak(`Reminder text set to: ${command}`);
// // // //         setStatus(`Text: ${command}`);
// // // //       }
// // // //     }
// // // //   };

// // // //   // Start/stop listening manually
// // // //   const startListening = () => {
// // // //     shouldListenRef.current = true;
// // // //     if (recognitionRef.current) {
// // // //       try {
// // // //         recognitionRef.current.start();
// // // //       } catch (err) {
// // // //         console.log('Error starting:', err);
// // // //       }
// // // //     }
// // // //   };

// // // //   const stopListening = () => {
// // // //     shouldListenRef.current = false;
// // // //     if (recognitionRef.current) {
// // // //       try {
// // // //         recognitionRef.current.stop();
// // // //       } catch (err) {
// // // //         console.log('Error stopping:', err);
// // // //       }
// // // //     }
// // // //   };

// // // //   // Handle complete reminder in one sentence
// // // //   const handleCompleteReminder = (command) => {
// // // //     console.log('Processing complete reminder:', command);
    
// // // //     // Extract text and time/date
// // // //     let text = '';
// // // //     let timeDateStr = '';
    
// // // //     // Pattern 1: "remind me to X at Y"
// // // //     const pattern1 = command.match(/remind me to (.+?) (?:at|on) (.+)/i);
// // // //     // Pattern 2: "set reminder X at Y"
// // // //     const pattern2 = command.match(/set reminder (.+?) (?:at|on) (.+)/i);
// // // //     // Pattern 3: "add reminder X at Y"
// // // //     const pattern3 = command.match(/add reminder (.+?) (?:at|on) (.+)/i);
    
// // // //     if (pattern1) {
// // // //       text = pattern1[1].trim();
// // // //       timeDateStr = pattern1[2].trim();
// // // //     } else if (pattern2) {
// // // //       text = pattern2[1].trim();
// // // //       timeDateStr = pattern2[2].trim();
// // // //     } else if (pattern3) {
// // // //       text = pattern3[1].trim();
// // // //       timeDateStr = pattern3[2].trim();
// // // //     } else {
// // // //       // Fallback: just extract after keywords
// // // //       text = command.replace(/remind me to|set reminder|add reminder/i, '').trim();
// // // //       timeDateStr = '';
// // // //     }
    
// // // //     if (!text) {
// // // //       speak('What should I remind you about?');
// // // //       setStatus('Please specify reminder text');
// // // //       return;
// // // //     }
    
// // // //     // Parse date and time
// // // //     const dateTime = parseDateTimeFromText(timeDateStr || 'in 1 hour');
    
// // // //     // Create reminder
// // // //     const reminder = {
// // // //       id: Date.now(),
// // // //       text: text,
// // // //       time: dateTime.toISOString(),
// // // //       date: dateTime.toISOString().split('T')[0],
// // // //       timeStr: dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
// // // //       displayTime: dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
// // // //       repeat: 'once',
// // // //       active: true,
// // // //       createdAt: new Date().toISOString()
// // // //     };
    
// // // //     setReminders(prev => [...prev, reminder]);
// // // //     scheduleReminderAlert(reminder);
    
// // // //     const dateStr = formatDisplayDate(reminder.date);
// // // //     const timeStr = reminder.displayTime;
// // // //     speak(`Reminder set for ${dateStr} at ${timeStr}: ${text}`);
// // // //     setStatus(`Added: ${text} on ${dateStr} at ${timeStr}`);
// // // //   };

// // // //   // Start step-by-step reminder creation
// // // //   const startStepByStep = () => {
// // // //     speak('Please tell me the reminder text. Say something like "reminder text is meeting with team"');
// // // //     setStatus('Waiting for reminder text...');
// // // //     setReminderText('');
// // // //     setReminderTime('');
// // // //     setReminderDate('');
// // // //     setRepeatOption('once');
// // // //   };

// // // //   // Parse time from text
// // // //   const parseTimeFromText = (text) => {
// // // //     const now = new Date();
// // // //     const timeMatch = text.match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)?/i);
    
// // // //     if (timeMatch) {
// // // //       let hours = parseInt(timeMatch[1]);
// // // //       const minutes = timeMatch[2] ? parseInt(timeMatch[2]) : 0;
// // // //       const period = timeMatch[3]?.toLowerCase();
      
// // // //       // Convert to 24-hour
// // // //       if (period === 'pm' && hours < 12) hours += 12;
// // // //       if (period === 'am' && hours === 12) hours = 0;
      
// // // //       return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
// // // //     }
    
// // // //     // Handle "in X hours/minutes"
// // // //     const relativeMatch = text.match(/in (\d+) (hour|minute)s?/i);
// // // //     if (relativeMatch) {
// // // //       const amount = parseInt(relativeMatch[1]);
// // // //       const unit = relativeMatch[2].toLowerCase();
// // // //       const future = new Date(now);
      
// // // //       if (unit === 'hour') {
// // // //         future.setHours(future.getHours() + amount);
// // // //       } else if (unit === 'minute') {
// // // //         future.setMinutes(future.getMinutes() + amount);
// // // //       }
      
// // // //       return future.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
// // // //     }
    
// // // //     return null;
// // // //   };

// // // //   // Parse date from text
// // // //   const parseDateFromText = (text) => {
// // // //     const now = new Date();
    
// // // //     if (text === 'today') {
// // // //       return now.toISOString().split('T')[0];
// // // //     }
    
// // // //     if (text === 'tomorrow') {
// // // //       const tomorrow = new Date(now);
// // // //       tomorrow.setDate(tomorrow.getDate() + 1);
// // // //       return tomorrow.toISOString().split('T')[0];
// // // //     }
    
// // // //     // Try to parse as date string
// // // //     const date = new Date(text);
// // // //     if (!isNaN(date.getTime())) {
// // // //       return date.toISOString().split('T')[0];
// // // //     }
    
// // // //     return '';
// // // //   };

// // // //   // Parse complete date-time from text
// // // //   const parseDateTimeFromText = (text) => {
// // // //     const now = new Date();
// // // //     const result = new Date(now);
    
// // // //     // Default: 1 hour from now
// // // //     result.setHours(result.getHours() + 1);
    
// // // //     // Check for relative time
// // // //     if (text.includes('in')) {
// // // //       const relativeMatch = text.match(/in (\d+) (hour|minute|day)s?/i);
// // // //       if (relativeMatch) {
// // // //         const amount = parseInt(relativeMatch[1]);
// // // //         const unit = relativeMatch[2].toLowerCase();
        
// // // //         if (unit === 'hour') {
// // // //           result.setHours(result.getHours() + amount);
// // // //         } else if (unit === 'minute') {
// // // //           result.setMinutes(result.getMinutes() + amount);
// // // //         } else if (unit === 'day') {
// // // //           result.setDate(result.getDate() + amount);
// // // //         }
// // // //       }
// // // //     }
    
// // // //     // Check for time
// // // //     const timeMatch = text.match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)?/i);
// // // //     if (timeMatch) {
// // // //       let hours = parseInt(timeMatch[1]);
// // // //       const minutes = timeMatch[2] ? parseInt(timeMatch[2]) : 0;
// // // //       const period = timeMatch[3]?.toLowerCase();
      
// // // //       if (period === 'pm' && hours < 12) hours += 12;
// // // //       if (period === 'am' && hours === 12) hours = 0;
      
// // // //       result.setHours(hours, minutes, 0, 0);
// // // //     }
    
// // // //     // Check for date keywords
// // // //     if (text.includes('tomorrow')) {
// // // //       result.setDate(result.getDate() + 1);
// // // //     } else if (text.includes('next monday')) {
// // // //       const day = 1; // Monday
// // // //       result.setDate(result.getDate() + ((day + 7 - result.getDay()) % 7));
// // // //     } else if (text.includes('next week')) {
// // // //       result.setDate(result.getDate() + 7);
// // // //     }
    
// // // //     // If time is in past, move to next day
// // // //     if (result < now) {
// // // //       result.setDate(result.getDate() + 1);
// // // //     }
    
// // // //     return result;
// // // //   };

// // // //   // Save reminder from form
// // // //   const saveReminder = () => {
// // // //     if (!reminderText.trim()) {
// // // //       speak('Please provide reminder text first');
// // // //       setStatus('Reminder text is required');
// // // //       return;
// // // //     }
    
// // // //     let dateTime;
    
// // // //     if (reminderDate && reminderTime) {
// // // //       // Combine date and time
// // // //       const [year, month, day] = reminderDate.split('-').map(Number);
// // // //       const [hours, minutes] = reminderTime.split(':').map(Number);
// // // //       dateTime = new Date(year, month - 1, day, hours, minutes, 0);
// // // //     } else if (reminderTime) {
// // // //       // Use current date with specified time
// // // //       dateTime = new Date();
// // // //       const [hours, minutes] = reminderTime.split(':').map(Number);
// // // //       dateTime.setHours(hours, minutes, 0, 0);
      
// // // //       // If time is in past, move to tomorrow
// // // //       if (dateTime < new Date()) {
// // // //         dateTime.setDate(dateTime.getDate() + 1);
// // // //       }
// // // //     } else {
// // // //       // Default: 1 hour from now
// // // //       dateTime = new Date();
// // // //       dateTime.setHours(dateTime.getHours() + 1);
// // // //     }
    
// // // //     if (isEditing && editingId) {
// // // //       // Update existing
// // // //       setReminders(prev => prev.map(reminder => 
// // // //         reminder.id === editingId ? {
// // // //           ...reminder,
// // // //           text: reminderText,
// // // //           time: dateTime.toISOString(),
// // // //           date: dateTime.toISOString().split('T')[0],
// // // //           timeStr: dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
// // // //           displayTime: dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
// // // //           repeat: repeatOption
// // // //         } : reminder
// // // //       ));
      
// // // //       speak(`Reminder updated: ${reminderText}`);
// // // //       setStatus(`Updated: ${reminderText}`);
// // // //       setIsEditing(false);
// // // //       setEditingId(null);
// // // //     } else {
// // // //       // Create new
// // // //       const reminder = {
// // // //         id: Date.now(),
// // // //         text: reminderText,
// // // //         time: dateTime.toISOString(),
// // // //         date: dateTime.toISOString().split('T')[0],
// // // //         timeStr: dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
// // // //         displayTime: dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
// // // //         repeat: repeatOption,
// // // //         active: true,
// // // //         createdAt: new Date().toISOString()
// // // //       };
      
// // // //       setReminders(prev => [...prev, reminder]);
// // // //       scheduleReminderAlert(reminder);
      
// // // //       const dateStr = formatDisplayDate(reminder.date);
// // // //       const timeStr = reminder.displayTime;
// // // //       speak(`Reminder added: ${reminderText} on ${dateStr} at ${timeStr}`);
// // // //       setStatus(`Added: ${reminderText} on ${dateStr} at ${timeStr}`);
// // // //     }
    
// // // //     // Clear form
// // // //     setReminderText('');
// // // //     setReminderTime('');
// // // //     setReminderDate('');
// // // //     setRepeatOption('once');
// // // //   };

// // // //   // Schedule reminder alert
// // // //   const scheduleReminderAlert = (reminder) => {
// // // //     const reminderTime = new Date(reminder.time);
// // // //     const now = new Date();
// // // //     const delay = reminderTime.getTime() - now.getTime();
    
// // // //     if (delay > 0 && delay < 7 * 24 * 60 * 60 * 1000) { // Within 7 days
// // // //       setTimeout(() => {
// // // //         triggerReminder(reminder);
// // // //       }, delay);
// // // //     }
// // // //   };

// // // //   // Trigger reminder alert
// // // //   const triggerReminder = (reminder) => {
// // // //     speak(`Reminder: ${reminder.text}`);
    
// // // //     // Update reminder status
// // // //     if (reminder.repeat === 'once') {
// // // //       setReminders(prev => prev.map(r => 
// // // //         r.id === reminder.id ? { ...r, active: false } : r
// // // //       ));
// // // //     } else if (reminder.repeat === 'daily') {
// // // //       // Schedule for next day
// // // //       const nextTime = new Date(reminder.time);
// // // //       nextTime.setDate(nextTime.getDate() + 1);
      
// // // //       setReminders(prev => prev.map(r => 
// // // //         r.id === reminder.id ? {
// // // //           ...r,
// // // //           time: nextTime.toISOString(),
// // // //           date: nextTime.toISOString().split('T')[0]
// // // //         } : r
// // // //       ));
      
// // // //       // Schedule next alert
// // // //       setTimeout(() => {
// // // //         triggerReminder({
// // // //           ...reminder,
// // // //           time: nextTime.toISOString(),
// // // //           date: nextTime.toISOString().split('T')[0]
// // // //         });
// // // //       }, 24 * 60 * 60 * 1000); // 24 hours
// // // //     }
    
// // // //     // Show visual notification
// // // //     setStatus(`🔔 Reminder: ${reminder.text}`);
// // // //   };

// // // //   // Check for due reminders
// // // //   const checkDueReminders = () => {
// // // //     const now = new Date();
    
// // // //     reminders.forEach(reminder => {
// // // //       if (reminder.active) {
// // // //         const reminderTime = new Date(reminder.time);
// // // //         const diff = reminderTime - now;
        
// // // //         // Check if due (within next 30 seconds)
// // // //         if (diff > 0 && diff <= 30000) {
// // // //           triggerReminder(reminder);
// // // //         }
// // // //       }
// // // //     });
// // // //   };

// // // //   // List all reminders
// // // //   const listReminders = () => {
// // // //     if (reminders.length === 0) {
// // // //       speak('You have no reminders');
// // // //       setStatus('No reminders found');
// // // //       return;
// // // //     }
    
// // // //     speak(`You have ${reminders.length} reminder${reminders.length === 1 ? '' : 's'}`);
    
// // // //     // Speak each reminder with delay
// // // //     reminders.forEach((reminder, index) => {
// // // //       setTimeout(() => {
// // // //         const dateStr = formatDisplayDate(reminder.date);
// // // //         speak(`Reminder ${index + 1}: ${reminder.text} on ${dateStr} at ${reminder.displayTime}`);
// // // //       }, (index + 1) * 2000);
// // // //     });
    
// // // //     setStatus(`Showing ${reminders.length} reminder${reminders.length === 1 ? '' : 's'}`);
// // // //   };

// // // //   // Handle delete command
// // // //   const handleDeleteCommand = (command) => {
// // // //     const numMatch = command.match(/reminder (\d+|one|two|three|four|five|six|seven|eight|nine|ten)/i);
// // // //     if (numMatch) {
// // // //       let index;
// // // //       const num = numMatch[1].toLowerCase();
      
// // // //       if (num === 'one') index = 0;
// // // //       else if (num === 'two') index = 1;
// // // //       else if (num === 'three') index = 2;
// // // //       else if (num === 'four') index = 3;
// // // //       else if (num === 'five') index = 4;
// // // //       else if (num === 'six') index = 5;
// // // //       else if (num === 'seven') index = 6;
// // // //       else if (num === 'eight') index = 7;
// // // //       else if (num === 'nine') index = 8;
// // // //       else if (num === 'ten') index = 9;
// // // //       else index = parseInt(num) - 1;
      
// // // //       if (index >= 0 && index < reminders.length) {
// // // //         const deleted = reminders[index];
// // // //         setReminders(prev => prev.filter((_, i) => i !== index));
// // // //         speak(`Deleted reminder ${index + 1}: ${deleted.text}`);
// // // //         setStatus(`Deleted: ${deleted.text}`);
// // // //       } else {
// // // //         speak(`Could not find reminder ${num}. You have ${reminders.length} reminders.`);
// // // //       }
// // // //     } else if (command.includes('all') || command.includes('everything')) {
// // // //       clearAllReminders();
// // // //     } else {
// // // //       speak('Please specify which reminder to delete. Say something like "delete reminder one"');
// // // //     }
// // // //   };

// // // //   // Handle edit command
// // // //   const handleEditCommand = (command) => {
// // // //     const numMatch = command.match(/reminder (\d+|one|two|three)/i);
// // // //     if (numMatch) {
// // // //       let index;
// // // //       const num = numMatch[1].toLowerCase();
      
// // // //       if (num === 'one') index = 0;
// // // //       else if (num === 'two') index = 1;
// // // //       else if (num === 'three') index = 2;
// // // //       else index = parseInt(num) - 1;
      
// // // //       if (index >= 0 && index < reminders.length) {
// // // //         const reminder = reminders[index];
// // // //         setReminderText(reminder.text);
// // // //         setReminderDate(reminder.date);
// // // //         setReminderTime(reminder.timeStr);
// // // //         setRepeatOption(reminder.repeat || 'once');
// // // //         setIsEditing(true);
// // // //         setEditingId(reminder.id);
        
// // // //         speak(`Editing reminder ${index + 1}: ${reminder.text}`);
// // // //         setStatus(`Editing reminder ${index + 1}`);
// // // //       }
// // // //     }
// // // //   };

// // // //   // Clear all reminders
// // // //   const clearAllReminders = () => {
// // // //     if (reminders.length > 0) {
// // // //       setReminders([]);
// // // //       speak('All reminders have been cleared');
// // // //       setStatus('All reminders cleared');
// // // //     } else {
// // // //       speak('No reminders to clear');
// // // //     }
// // // //   };

// // // //   // Manual delete
// // // //   const deleteReminder = (id) => {
// // // //     setReminders(prev => prev.filter(r => r.id !== id));
// // // //     speak('Reminder deleted');
// // // //     setStatus('Reminder deleted');
// // // //   };

// // // //   // Manual toggle
// // // //   const toggleReminder = (id) => {
// // // //     setReminders(prev => prev.map(reminder => {
// // // //       if (reminder.id === id) {
// // // //         const updated = { ...reminder, active: !reminder.active };
// // // //         return updated;
// // // //       }
// // // //       return reminder;
// // // //     }));
// // // //   };

// // // //   // Format date for display
// // // //   const formatDisplayDate = (dateStr) => {
// // // //     const date = new Date(dateStr);
// // // //     const today = new Date();
// // // //     const tomorrow = new Date();
// // // //     tomorrow.setDate(tomorrow.getDate() + 1);
    
// // // //     if (date.toDateString() === today.toDateString()) {
// // // //       return 'Today';
// // // //     } else if (date.toDateString() === tomorrow.toDateString()) {
// // // //       return 'Tomorrow';
// // // //     } else {
// // // //       return date.toLocaleDateString();
// // // //     }
// // // //   };

// // // //   // Reset form
// // // //   const resetForm = () => {
// // // //     setReminderText('');
// // // //     setReminderTime('');
// // // //     setReminderDate('');
// // // //     setRepeatOption('once');
// // // //     setIsEditing(false);
// // // //     setEditingId(null);
// // // //   };

// // // //   // Test function
// // // //   const testReminder = () => {
// // // //     const now = new Date();
// // // //     now.setMinutes(now.getMinutes() + 1); // 1 minute from now
    
// // // //     const testReminder = {
// // // //       id: Date.now(),
// // // //       text: 'Test reminder - voice system is working',
// // // //       time: now.toISOString(),
// // // //       date: now.toISOString().split('T')[0],
// // // //       timeStr: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
// // // //       displayTime: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
// // // //       repeat: 'once',
// // // //       active: true,
// // // //       createdAt: new Date().toISOString()
// // // //     };
    
// // // //     setReminders(prev => [...prev, testReminder]);
// // // //     speak('Test reminder added. It will trigger in 1 minute.');
// // // //     setStatus('Test reminder added (1 minute)');
// // // //   };

// // // //   return (
// // // //     <div className="reminders-page">
// // // //       {/* Fixed Header */}
// // // //       <header className="fixed-header">
// // // //         <div className="header-content">
// // // //           <div className="header-left">
// // // //             <button 
// // // //               className="back-btn"
// // // //               onClick={() => window.location.href = '/dashboard'}
// // // //               aria-label="Go back to dashboard"
// // // //             >
// // // //               ← Back
// // // //             </button>
// // // //             <h1 className="logo">VISIONA</h1>
// // // //           </div>
          
// // // //           <div className="header-title">
// // // //             <h2>Voice Reminders</h2>
// // // //             <p className="subtitle">Set reminders using natural voice commands</p>
// // // //           </div>
          
// // // //           <div className="user-menu">
// // // //             <button 
// // // //               className={`voice-btn ${isListening ? 'listening' : ''}`}
// // // //               onClick={() => {
// // // //                 if (isListening) {
// // // //                   stopListening();
// // // //                   speak('Voice control paused');
// // // //                 } else {
// // // //                   startListening();
// // // //                   speak('Voice control activated');
// // // //                 }
// // // //               }}
// // // //               aria-label={isListening ? 'Stop listening' : 'Start listening'}
// // // //             >
// // // //               🎤 {isListening ? 'Listening...' : 'Voice Control'}
// // // //             </button>
// // // //           </div>
// // // //         </div>
// // // //       </header>

// // // //       {/* Main Content */}
// // // //       <div className="reminders-content">
// // // //         <div className="reminders-container">
// // // //           {/* Status Message */}
// // // //           <div className="status-message">
// // // //             <div className="status-text">
// // // //               {isListening ? '🎤 Listening... Speak your command' : status}
// // // //             </div>
// // // //             <button 
// // // //               className="clear-status-btn"
// // // //               onClick={() => setStatus('Ready for voice commands')}
// // // //               aria-label="Clear status"
// // // //             >
// // // //               ×
// // // //             </button>
// // // //           </div>

// // // //           {/* Voice Control Section */}
// // // //           <div className="voice-control-section">
// // // //             <div className="voice-status-indicator">
// // // //               <div className={`listening-dot ${isListening ? 'active' : ''}`}></div>
// // // //               <span className="status-text">
// // // //                 {isListening ? '● Listening... Say your command' : 'Ready for voice commands'}
// // // //               </span>
// // // //               <button 
// // // //                 className="voice-help-btn"
// // // //                 onClick={() => setShowCommands(!showCommands)}
// // // //               >
// // // //                 {showCommands ? 'Hide Commands' : 'Show Commands'}
// // // //               </button>
// // // //             </div>
            
// // // //             {showCommands && (
// // // //               <div className="voice-commands-panel">
// // // //                 <h3>🎤 Voice Commands</h3>
// // // //                 <div className="commands-grid">
// // // //                   <div className="command-category">
// // // //                     <h4>Quick Reminders</h4>
// // // //                     <ul>
// // // //                       <li>"Remind me to call mom at 3 PM"</li>
// // // //                       <li>"Set reminder meeting tomorrow at 11 AM"</li>
// // // //                       <li>"Add reminder doctor appointment on December 25"</li>
// // // //                     </ul>
// // // //                   </div>
                  
// // // //                   <div className="command-category">
// // // //                     <h4>Step-by-Step</h4>
// // // //                     <ul>
// // // //                       <li>"Set reminder" (then follow prompts)</li>
// // // //                       <li>"Reminder text is [your text]"</li>
// // // //                       <li>"Time is [3 PM]" or "At [14:30]"</li>
// // // //                       <li>"Date is [tomorrow]" or "On [December 25]"</li>
// // // //                       <li>"Save reminder"</li>
// // // //                     </ul>
// // // //                   </div>
                  
// // // //                   <div className="command-category">
// // // //                     <h4>Manage Reminders</h4>
// // // //                     <ul>
// // // //                       <li>"Show reminders"</li>
// // // //                       <li>"Delete reminder one"</li>
// // // //                       <li>"Edit reminder two"</li>
// // // //                       <li>"Clear all reminders"</li>
// // // //                     </ul>
// // // //                   </div>
// // // //                 </div>
                
// // // //                 <div className="voice-tips">
// // // //                   <p><strong>💡 Tip:</strong> Works 100% offline. All data saved in your browser.</p>
// // // //                   <button 
// // // //                     className="close-help-btn"
// // // //                     onClick={() => setShowCommands(false)}
// // // //                   >
// // // //                     Close
// // // //                   </button>
// // // //                 </div>
// // // //               </div>
// // // //             )}
            
// // // //             {/* Quick Examples */}
// // // //             <div className="command-examples">
// // // //               <h4>Try saying:</h4>
// // // //               <div className="example-buttons">
// // // //                 <button 
// // // //                   className="example-btn"
// // // //                   onClick={() => {
// // // //                     speak('Say: "Remind me to call mom at 3 PM"');
// // // //                     setStatus('Try: "Remind me to call mom at 3 PM"');
// // // //                   }}
// // // //                 >
// // // //                   "Remind me to call mom at 3 PM"
// // // //                 </button>
// // // //                 <button 
// // // //                   className="example-btn"
// // // //                   onClick={() => {
// // // //                     speak('Say: "Show reminders" to list all reminders');
// // // //                     setStatus('Try: "Show reminders"');
// // // //                   }}
// // // //                 >
// // // //                   "Show reminders"
// // // //                 </button>
// // // //               </div>
// // // //             </div>
// // // //           </div>

// // // //           {/* Add Reminder Form */}
// // // //           <div className="reminder-form-section">
// // // //             <div className="section-header">
// // // //               <h3>{isEditing ? '✏️ Edit Reminder' : '➕ Add New Reminder'}</h3>
// // // //               {isEditing && (
// // // //                 <button className="cancel-edit-btn" onClick={resetForm}>
// // // //                   Cancel Edit
// // // //                 </button>
// // // //               )}
// // // //             </div>
            
// // // //             <div className="reminder-form">
// // // //               <div className="form-group">
// // // //                 <label htmlFor="reminderText">Reminder Text *</label>
// // // //                 <input
// // // //                   type="text"
// // // //                   id="reminderText"
// // // //                   value={reminderText}
// // // //                   onChange={(e) => setReminderText(e.target.value)}
// // // //                   placeholder="e.g., Meeting with team"
// // // //                   className="form-input"
// // // //                 />
// // // //                 <div className="voice-hint">
// // // //                   Say: "reminder text is [your text]" or "remind me to [your text]"
// // // //                 </div>
// // // //               </div>
              
// // // //               <div className="form-row">
// // // //                 <div className="form-group">
// // // //                   <label htmlFor="reminderDate">Date</label>
// // // //                   <input
// // // //                     type="date"
// // // //                     id="reminderDate"
// // // //                     value={reminderDate}
// // // //                     onChange={(e) => setReminderDate(e.target.value)}
// // // //                     className="form-input"
// // // //                   />
// // // //                   <div className="voice-hint">
// // // //                     Say: "date is [tomorrow]" or "on [December 25]"
// // // //                   </div>
// // // //                 </div>
                
// // // //                 <div className="form-group">
// // // //                   <label htmlFor="reminderTime">Time *</label>
// // // //                   <input
// // // //                     type="time"
// // // //                     id="reminderTime"
// // // //                     value={reminderTime}
// // // //                     onChange={(e) => setReminderTime(e.target.value)}
// // // //                     className="form-input"
// // // //                   />
// // // //                   <div className="voice-hint">
// // // //                     Say: "time is [3 PM]" or "at [14:30]"
// // // //                   </div>
// // // //                 </div>
// // // //               </div>
              
// // // //               <div className="form-group">
// // // //                 <label htmlFor="repeatOption">Repeat</label>
// // // //                 <select
// // // //                   id="repeatOption"
// // // //                   value={repeatOption}
// // // //                   onChange={(e) => setRepeatOption(e.target.value)}
// // // //                   className="form-input"
// // // //                 >
// // // //                   <option value="once">Once</option>
// // // //                   <option value="daily">Daily</option>
// // // //                   <option value="weekly">Weekly</option>
// // // //                   <option value="monthly">Monthly</option>
// // // //                 </select>
// // // //                 <div className="voice-hint">
// // // //                   Say: "repeat daily", "repeat weekly", or "repeat once"
// // // //                 </div>
// // // //               </div>
              
// // // //               <div className="form-actions">
// // // //                 <button 
// // // //                   className="submit-btn"
// // // //                   onClick={saveReminder}
// // // //                   disabled={!reminderText.trim() || !reminderTime}
// // // //                 >
// // // //                   {isEditing ? 'Update Reminder' : 'Add Reminder'}
// // // //                 </button>
// // // //                 <button 
// // // //                   className="cancel-btn"
// // // //                   onClick={resetForm}
// // // //                 >
// // // //                   Reset
// // // //                 </button>
// // // //                 <button 
// // // //                   className="test-btn"
// // // //                   onClick={testReminder}
// // // //                 >
// // // //                   Test Reminder (1 min)
// // // //                 </button>
// // // //                 <div className="voice-action-hint">
// // // //                   Or say: "save reminder" to confirm
// // // //                 </div>
// // // //               </div>
// // // //             </div>
// // // //           </div>

// // // //           {/* Reminders List */}
// // // //           <div className="reminders-list-section">
// // // //             <div className="section-header">
// // // //               <h3>Your Reminders ({reminders.length})</h3>
// // // //               <div className="list-actions">
// // // //                 <button 
// // // //                   className="speak-reminders-btn"
// // // //                   onClick={listReminders}
// // // //                   title="Read all reminders aloud"
// // // //                 >
// // // //                   🔊 Speak All
// // // //                 </button>
// // // //                 <button 
// // // //                   className="refresh-btn"
// // // //                   onClick={() => window.location.reload()}
// // // //                   title="Refresh page"
// // // //                 >
// // // //                   ⟳ Refresh
// // // //                 </button>
// // // //               </div>
// // // //             </div>
            
// // // //             {reminders.length === 0 ? (
// // // //               <div className="empty-state">
// // // //                 <div className="empty-icon">⏰</div>
// // // //                 <h4>No reminders yet</h4>
// // // //                 <p>Use voice commands or the form above to add reminders</p>
// // // //                 <p className="empty-hint">Try saying: "Remind me to call mom at 3 PM"</p>
// // // //               </div>
// // // //             ) : (
// // // //               <div className="reminders-grid">
// // // //                 {reminders.map((reminder, index) => (
// // // //                   <div 
// // // //                     key={reminder.id} 
// // // //                     className={`reminder-card ${reminder.active ? 'active' : 'inactive'}`}
// // // //                   >
// // // //                     <div className="reminder-header">
// // // //                       <div className="reminder-number">#{index + 1}</div>
// // // //                       <div className="reminder-status">
// // // //                         {reminder.active ? '⏰ Active' : '✓ Completed'}
// // // //                       </div>
// // // //                     </div>
                    
// // // //                     <div className="reminder-content">
// // // //                       <div className="reminder-text">{reminder.text}</div>
// // // //                       <div className="reminder-details">
// // // //                         <div className="reminder-time">
// // // //                           <span className="date">{formatDisplayDate(reminder.date)}</span>
// // // //                           <span className="time">{reminder.displayTime}</span>
// // // //                         </div>
// // // //                         <div className="reminder-repeat">
// // // //                           Repeat: {reminder.repeat || 'Once'}
// // // //                         </div>
// // // //                         <div className="reminder-created">
// // // //                           Added: {new Date(reminder.createdAt).toLocaleDateString()}
// // // //                         </div>
// // // //                       </div>
// // // //                     </div>
                    
// // // //                     <div className="reminder-actions">
// // // //                       <button 
// // // //                         className="edit-btn"
// // // //                         onClick={() => {
// // // //                           setReminderText(reminder.text);
// // // //                           setReminderDate(reminder.date);
// // // //                           setReminderTime(reminder.timeStr);
// // // //                           setRepeatOption(reminder.repeat || 'once');
// // // //                           setIsEditing(true);
// // // //                           setEditingId(reminder.id);
// // // //                           speak(`Editing reminder ${index + 1}`);
// // // //                         }}
// // // //                       >
// // // //                         ✏️ Edit
// // // //                       </button>
// // // //                       <button 
// // // //                         className="toggle-btn"
// // // //                         onClick={() => toggleReminder(reminder.id)}
// // // //                       >
// // // //                         {reminder.active ? '⏸️ Pause' : '▶️ Activate'}
// // // //                       </button>
// // // //                       <button 
// // // //                         className="delete-btn"
// // // //                         onClick={() => deleteReminder(reminder.id)}
// // // //                       >
// // // //                         🗑️ Delete
// // // //                       </button>
// // // //                     </div>
                    
// // // //                     <div className="voice-hint">
// // // //                       <small>Say: "delete reminder {index + 1}" or "edit reminder {index + 1}"</small>
// // // //                     </div>
// // // //                   </div>
// // // //                 ))}
// // // //               </div>
// // // //             )}
            
// // // //             {reminders.length > 0 && (
// // // //               <div className="bulk-actions">
// // // //                 <button 
// // // //                   className="clear-all-btn"
// // // //                   onClick={clearAllReminders}
// // // //                 >
// // // //                   🗑️ Clear All Reminders
// // // //                 </button>
// // // //               </div>
// // // //             )}
// // // //           </div>

// // // //           {/* Info Section */}
// // // //           <div className="info-section">
// // // //             <h3>How It Works</h3>
// // // //             <div className="info-grid">
// // // //               <div className="info-card">
// // // //                 <div className="info-icon">🎤</div>
// // // //                 <h4>Voice Commands</h4>
// // // //                 <p>Speak naturally to set, view, or delete reminders</p>
// // // //               </div>
// // // //               <div className="info-card">
// // // //                 <div className="info-icon">💾</div>
// // // //                 <h4>Browser Storage</h4>
// // // //                 <p>All data saved locally in your browser, no account needed</p>
// // // //               </div>
// // // //               <div className="info-card">
// // // //                 <div className="info-icon">🔔</div>
// // // //                 <h4>Voice Alerts</h4>
// // // //                 <p>Reminders speak aloud at the scheduled time</p>
// // // //               </div>
// // // //               <div className="info-card">
// // // //                 <div className="info-icon">🔒</div>
// // // //                 <h4>100% Offline</h4>
// // // //                 <p>No internet required after initial page load</p>
// // // //               </div>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </div>

// // // //       {/* Status Bar */}
// // // //       <div className="status-bar">
// // // //         <div className="status-content">
// // // //           <div className="listening-status">
// // // //             {isListening ? (
// // // //               <>
// // // //                 <span className="listening-indicator">●</span>
// // // //                 Listening for commands...
// // // //               </>
// // // //             ) : (
// // // //               'Say "start" to enable voice control'
// // // //             )}
// // // //           </div>
// // // //           <div className="voice-controls">
// // // //             <button 
// // // //               className="help-btn"
// // // //               onClick={() => setShowCommands(!showCommands)}
// // // //             >
// // // //               {showCommands ? 'Hide Help' : 'Help'}
// // // //             </button>
// // // //             <button 
// // // //               className={`mic-btn ${isListening ? 'active' : ''}`}
// // // //               onClick={() => isListening ? stopListening() : startListening()}
// // // //               aria-label={isListening ? 'Stop listening' : 'Start listening'}
// // // //             >
// // // //               🎤
// // // //             </button>
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default RemindersPage;



// // // import React, { useState, useEffect, useRef, useCallback } from 'react';
// // // import './Reminders.css';

// // // const RemindersPage = () => {
// // //   // State
// // //   const [reminders, setReminders] = useState([]);
// // //   const [isListening, setIsListening] = useState(false);
// // //   const [status, setStatus] = useState('Click microphone to start');
// // //   const [showCommands, setShowCommands] = useState(false);
// // //   const [isEditing, setIsEditing] = useState(false);
// // //   const [editingId, setEditingId] = useState(null);
// // //   const [hasPermission, setHasPermission] = useState(false);
  
// // //   // Form state
// // //   const [reminderText, setReminderText] = useState('');
// // //   const [reminderTime, setReminderTime] = useState('');
// // //   const [reminderDate, setReminderDate] = useState('');
// // //   const [repeatOption, setRepeatOption] = useState('once');
  
// // //   // Refs for stable access
// // //   const remindersRef = useRef([]);
// // //   const timeoutRef = useRef(new Map());
// // //   const triggeredRef = useRef(new Set());
// // //   const recognitionRef = useRef(null);
// // //   const shouldListenRef = useRef(false);
// // //   const isMountedRef = useRef(true);
// // //   const speechQueueRef = useRef([]);
// // //   const isSpeakingRef = useRef(false);

// // //   // Initialize with all fixes
// // //   useEffect(() => {
// // //     isMountedRef.current = true;
    
// // //     // Load reminders from localStorage
// // //     const saved = JSON.parse(localStorage.getItem('voice-reminders')) || [];
// // //     remindersRef.current = saved;
// // //     setReminders(saved);
    
// // //     // Initialize speech recognition
// // //     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
// // //     if (SpeechRecognition) {
// // //       const recognition = new SpeechRecognition();
// // //       recognition.continuous = true;
// // //       recognition.interimResults = true;
// // //       recognition.lang = 'en-US';
// // //       recognition.maxAlternatives = 1;

// // //       recognition.onstart = () => {
// // //         if (isMountedRef.current) {
// // //           setIsListening(true);
// // //           setStatus('Listening... Speak your command');
// // //         }
// // //       };

// // //       recognition.onresult = (event) => {
// // //         if (!isMountedRef.current) return;
        
// // //         const results = event.results;
// // //         const lastIdx = results.length - 1;
        
// // //         if (results[lastIdx].isFinal) {
// // //           const transcript = results[lastIdx][0].transcript.toLowerCase().trim();
// // //           console.log('Final transcript:', transcript);
// // //           setStatus(`Heard: "${transcript}"`);
// // //           handleVoiceCommand(transcript);
// // //         }
// // //       };

// // //       recognition.onerror = (event) => {
// // //         console.log('Speech recognition error:', event.error);
// // //         if (event.error === 'not-allowed' && isMountedRef.current) {
// // //           setStatus('Microphone permission required');
// // //         }
// // //       };

// // //       recognition.onend = () => {
// // //         if (isMountedRef.current) {
// // //           setIsListening(false);
// // //           // Auto-restart if should be listening
// // //           if (shouldListenRef.current) {
// // //             setTimeout(() => {
// // //               if (recognitionRef.current && isMountedRef.current) {
// // //                 try {
// // //                   recognitionRef.current.start();
// // //                 } catch (err) {
// // //                   console.log('Auto-restart failed:', err);
// // //                 }
// // //               }
// // //             }, 100);
// // //           }
// // //         }
// // //       };

// // //       recognitionRef.current = recognition;
// // //     } else {
// // //       setStatus('Speech recognition not supported');
// // //     }

// // //     // Re-schedule all active reminders on load
// // //     rescheduleAllReminders();

// // //     // Setup interval for checking due reminders
// // //     const intervalId = setInterval(checkDueReminders, 10000); // Check every 10 seconds

// // //     return () => {
// // //       isMountedRef.current = false;
// // //       shouldListenRef.current = false;
      
// // //       // Clean up all timeouts
// // //       timeoutRef.current.forEach(timeout => clearTimeout(timeout));
// // //       timeoutRef.current.clear();
      
// // //       // Clear triggered set
// // //       triggeredRef.current.clear();
      
// // //       // Stop speech
// // //       window.speechSynthesis.cancel();
// // //       speechQueueRef.current = [];
// // //       isSpeakingRef.current = false;
      
// // //       // Stop recognition
// // //       if (recognitionRef.current) {
// // //         try {
// // //           recognitionRef.current.stop();
// // //         } catch (err) {
// // //           // Ignore
// // //         }
// // //       }
      
// // //       // Clear interval
// // //       clearInterval(intervalId);
// // //     };
// // //   }, []);

// // //   // Update ref when reminders change
// // //   useEffect(() => {
// // //     remindersRef.current = reminders;
// // //   }, [reminders]);

// // //   // Save to localStorage
// // //   useEffect(() => {
// // //     localStorage.setItem('voice-reminders', JSON.stringify(reminders));
// // //   }, [reminders]);

// // //   // Re-schedule all reminders
// // //   const rescheduleAllReminders = useCallback(() => {
// // //     // Clear existing timeouts
// // //     timeoutRef.current.forEach(timeout => clearTimeout(timeout));
// // //     timeoutRef.current.clear();
    
// // //     // Schedule each active reminder
// // //     remindersRef.current.forEach(reminder => {
// // //       if (reminder.active) {
// // //         scheduleReminderTimeout(reminder);
// // //       }
// // //     });
// // //   }, []);

// // //   // Schedule a reminder timeout
// // //   const scheduleReminderTimeout = useCallback((reminder) => {
// // //     const reminderTime = new Date(reminder.time);
// // //     const now = new Date();
// // //     const delay = reminderTime.getTime() - now.getTime();
    
// // //     // Only schedule if within next 30 days and not in past
// // //     if (delay > 0 && delay < 30 * 24 * 60 * 60 * 1000) {
// // //       // Clear existing timeout for this reminder
// // //       if (timeoutRef.current.has(reminder.id)) {
// // //         clearTimeout(timeoutRef.current.get(reminder.id));
// // //       }
      
// // //       const timeoutId = setTimeout(() => {
// // //         triggerReminder(reminder.id);
// // //       }, delay);
      
// // //       timeoutRef.current.set(reminder.id, timeoutId);
// // //     }
// // //     // If reminder is due within last 5 minutes, trigger it
// // //     else if (delay <= 0 && delay > -5 * 60 * 1000) {
// // //       triggerReminder(reminder.id);
// // //     }
// // //   }, []);

// // //   // Check due reminders every 10 seconds
// // //   const checkDueReminders = useCallback(() => {
// // //     const now = new Date();
// // //     const currentReminders = remindersRef.current;
    
// // //     currentReminders.forEach(reminder => {
// // //       if (reminder.active && !triggeredRef.current.has(reminder.id)) {
// // //         const reminderTime = new Date(reminder.time);
// // //         const diff = reminderTime.getTime() - now.getTime();
        
// // //         // If due within next 30 seconds and not already triggered
// // //         if (diff > 0 && diff <= 30000) {
// // //           triggerReminder(reminder.id);
// // //         }
// // //       }
// // //     });
// // //   }, []);

// // //   // Trigger a reminder
// // //   const triggerReminder = useCallback((reminderId) => {
// // //     // Prevent duplicate triggers
// // //     if (triggeredRef.current.has(reminderId)) return;
    
// // //     const reminder = remindersRef.current.find(r => r.id === reminderId);
// // //     if (!reminder || !reminder.active) return;
    
// // //     // Mark as triggered
// // //     triggeredRef.current.add(reminderId);
    
// // //     // Speak the reminder
// // //     speak(`Reminder: ${reminder.text}`);
    
// // //     // Update UI
// // //     setStatus(`🔔 Reminder: ${reminder.text}`);
    
// // //     // Handle non-repeating reminders
// // //     if (reminder.repeat === 'once') {
// // //       setReminders(prev => prev.map(r => 
// // //         r.id === reminderId ? { ...r, active: false } : r
// // //       ));
      
// // //       // Clear timeout
// // //       if (timeoutRef.current.has(reminderId)) {
// // //         clearTimeout(timeoutRef.current.get(reminderId));
// // //         timeoutRef.current.delete(reminderId);
// // //       }
// // //     } 
// // //     // Handle repeating reminders
// // //     else {
// // //       handleRepeatReminder(reminder);
// // //     }
    
// // //     // Clean up triggered flag after 5 minutes
// // //     setTimeout(() => {
// // //       triggeredRef.current.delete(reminderId);
// // //     }, 5 * 60 * 1000);
// // //   }, []);

// // //   // Handle repeating reminders
// // //   const handleRepeatReminder = useCallback((reminder) => {
// // //     const nextTime = new Date(reminder.time);
    
// // //     switch (reminder.repeat) {
// // //       case 'daily':
// // //         nextTime.setDate(nextTime.getDate() + 1);
// // //         break;
// // //       case 'weekly':
// // //         nextTime.setDate(nextTime.getDate() + 7);
// // //         break;
// // //       case 'monthly':
// // //         nextTime.setMonth(nextTime.getMonth() + 1);
// // //         break;
// // //       default:
// // //         return;
// // //     }
    
// // //     // Update reminder with next time
// // //     setReminders(prev => prev.map(r => 
// // //       r.id === reminder.id ? {
// // //         ...r,
// // //         time: nextTime.toISOString(),
// // //         date: nextTime.toISOString().split('T')[0],
// // //         timeStr: nextTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
// // //         displayTime: nextTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
// // //       } : r
// // //     ));
    
// // //     // Schedule next occurrence
// // //     const updatedReminder = {
// // //       ...reminder,
// // //       time: nextTime.toISOString(),
// // //       date: nextTime.toISOString().split('T')[0]
// // //     };
    
// // //     scheduleReminderTimeout(updatedReminder);
// // //   }, [scheduleReminderTimeout]);

// // //   // Improved speech synthesis with queue
// // //   const speak = useCallback((text) => {
// // //     if (!('speechSynthesis' in window) || !text) return;
    
// // //     // Add to queue
// // //     speechQueueRef.current.push(text);
    
// // //     // Process queue if not already speaking
// // //     if (!isSpeakingRef.current) {
// // //       processSpeechQueue();
// // //     }
// // //   }, []);

// // //   // Process speech queue
// // //   const processSpeechQueue = useCallback(() => {
// // //     if (speechQueueRef.current.length === 0) {
// // //       isSpeakingRef.current = false;
// // //       return;
// // //     }
    
// // //     isSpeakingRef.current = true;
    
// // //     // Stop recognition while speaking
// // //     const wasListening = isListening;
// // //     if (wasListening && recognitionRef.current) {
// // //       recognitionRef.current.stop();
// // //     }
    
// // //     const text = speechQueueRef.current.shift();
// // //     window.speechSynthesis.cancel();
    
// // //     const utterance = new SpeechSynthesisUtterance(text);
// // //     utterance.rate = 1.0;
// // //     utterance.pitch = 1.0;
// // //     utterance.volume = 1.0;
    
// // //     utterance.onend = () => {
// // //       // Small delay before next speech or resuming recognition
// // //       setTimeout(() => {
// // //         if (wasListening && recognitionRef.current) {
// // //           try {
// // //             recognitionRef.current.start();
// // //           } catch (err) {
// // //             console.log('Failed to resume recognition:', err);
// // //           }
// // //         }
        
// // //         // Process next in queue
// // //         processSpeechQueue();
// // //       }, 300);
// // //     };
    
// // //     utterance.onerror = () => {
// // //       // Continue with next in queue even on error
// // //       setTimeout(processSpeechQueue, 300);
// // //     };
    
// // //     window.speechSynthesis.speak(utterance);
// // //   }, [isListening]);

// // //   // Start listening with permission handling
// // //   const startListening = useCallback(() => {
// // //     if (!recognitionRef.current) {
// // //       setStatus('Speech recognition not available');
// // //       return;
// // //     }
    
// // //     // Request permission if needed
// // //     if (!hasPermission) {
// // //       navigator.mediaDevices.getUserMedia({ audio: true })
// // //         .then(() => {
// // //           setHasPermission(true);
// // //           shouldListenRef.current = true;
// // //           recognitionRef.current.start();
// // //           speak('Voice control activated');
// // //         })
// // //         .catch(err => {
// // //           setStatus('Microphone access denied. Please allow permission.');
// // //         });
// // //     } else {
// // //       shouldListenRef.current = true;
// // //       recognitionRef.current.start();
// // //       speak('Listening for commands');
// // //     }
// // //   }, [hasPermission, speak]);

// // //   // Stop listening
// // //   const stopListening = useCallback(() => {
// // //     shouldListenRef.current = false;
// // //     if (recognitionRef.current) {
// // //       try {
// // //         recognitionRef.current.stop();
// // //       } catch (err) {
// // //         // Ignore
// // //       }
// // //     }
// // //     speak('Voice control stopped');
// // //   }, [speak]);

// // //   // Handle voice commands
// // //   const handleVoiceCommand = useCallback((command) => {
// // //     console.log('Processing command:', command);
    
// // //     // Single sentence commands
// // //     if (command.includes('remind me to') || command.includes('set reminder') || command.includes('add reminder')) {
// // //       handleCompleteReminder(command);
// // //     }
    
// // //     // Step-by-step commands
// // //     else if (command === 'set reminder' || command === 'add reminder') {
// // //       speak('What should I remind you about?');
// // //       setStatus('Waiting for reminder text...');
// // //     }
    
// // //     // Form field commands
// // //     else if (command.startsWith('reminder text is') || command.startsWith('text is')) {
// // //       const text = command.replace(/reminder text is|text is/gi, '').trim();
// // //       if (text) {
// // //         setReminderText(text);
// // //         speak(`Reminder text set to: ${text}`);
// // //       }
// // //     }
    
// // //     else if (command.startsWith('time is') || command.startsWith('at')) {
// // //       const timeStr = command.replace(/time is|at/gi, '').trim();
// // //       const time = parseTimeFromText(timeStr);
// // //       if (time) {
// // //         setReminderTime(time);
// // //         speak(`Time set to ${time}`);
// // //       }
// // //     }
    
// // //     else if (command.startsWith('date is') || command.startsWith('on')) {
// // //       const dateStr = command.replace(/date is|on/gi, '').trim();
// // //       const date = parseDateFromText(dateStr);
// // //       if (date) {
// // //         setReminderDate(date);
// // //         speak(`Date set to ${formatDisplayDate(date)}`);
// // //       }
// // //     }
    
// // //     // Repeat options
// // //     else if (command.includes('repeat daily')) {
// // //       setRepeatOption('daily');
// // //       speak('Set to repeat daily');
// // //     }
    
// // //     else if (command.includes('repeat weekly')) {
// // //       setRepeatOption('weekly');
// // //       speak('Set to repeat weekly');
// // //     }
    
// // //     else if (command.includes('repeat monthly')) {
// // //       setRepeatOption('monthly');
// // //       speak('Set to repeat monthly');
// // //     }
    
// // //     else if (command.includes('repeat once')) {
// // //       setRepeatOption('once');
// // //       speak('Set to repeat once');
// // //     }
    
// // //     // Action commands
// // //     else if (command.includes('save reminder')) {
// // //       saveReminder();
// // //     }
    
// // //     else if (command.includes('show reminders') || command.includes('list reminders')) {
// // //       listReminders();
// // //     }
    
// // //     else if (command.includes('delete reminder')) {
// // //       handleDeleteCommand(command);
// // //     }
    
// // //     else if (command.includes('clear all reminders')) {
// // //       clearAllReminders();
// // //     }
    
// // //     else if (command.includes('edit reminder')) {
// // //       handleEditCommand(command);
// // //     }
    
// // //     // Navigation
// // //     else if (command.includes('go back') || command.includes('dashboard')) {
// // //       speak('Going back to dashboard');
// // //       setTimeout(() => window.location.href = '/dashboard', 1000);
// // //     }
    
// // //     // Help
// // //     else if (command.includes('help')) {
// // //       setShowCommands(true);
// // //       speak('Showing available commands');
// // //     }
    
// // //     // Start/stop
// // //     else if (command.includes('stop listening') || command === 'stop') {
// // //       stopListening();
// // //     }
    
// // //     else if (command.includes('start listening') || command === 'start') {
// // //       startListening();
// // //     }
    
// // //     // Unknown command
// // //     else if (command.length > 3 && !reminderText) {
// // //       setReminderText(command);
// // //       speak(`Reminder text set to: ${command}`);
// // //     }
// // //   }, [reminderText, speak, startListening, stopListening]);

// // //   // Parse time from text with multiple patterns
// // //   const parseTimeFromText = useCallback((text) => {
// // //     const now = new Date();
    
// // //     // Handle "in X hours/minutes"
// // //     const relativeMatch = text.match(/in\s+(\d+)\s+(hour|minute)s?\b/i);
// // //     if (relativeMatch) {
// // //       const amount = parseInt(relativeMatch[1]);
// // //       const unit = relativeMatch[2].toLowerCase();
// // //       const future = new Date(now);
      
// // //       if (unit === 'hour') future.setHours(future.getHours() + amount);
// // //       else if (unit === 'minute') future.setMinutes(future.getMinutes() + amount);
      
// // //       return future.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
// // //     }
    
// // //     // Handle "3 PM" or "3:30 PM"
// // //     const timeMatch1 = text.match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)/i);
// // //     if (timeMatch1) {
// // //       let hours = parseInt(timeMatch1[1]);
// // //       const minutes = timeMatch1[2] ? parseInt(timeMatch1[2]) : 0;
// // //       const period = timeMatch1[3].toLowerCase();
      
// // //       if (period === 'pm' && hours < 12) hours += 12;
// // //       if (period === 'am' && hours === 12) hours = 0;
      
// // //       return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
// // //     }
    
// // //     // Handle "15:30" (24-hour format)
// // //     const timeMatch2 = text.match(/(\d{1,2}):(\d{2})/);
// // //     if (timeMatch2) {
// // //       return `${timeMatch2[1].padStart(2, '0')}:${timeMatch2[2].padStart(2, '0')}`;
// // //     }
    
// // //     // Handle just hour "3"
// // //     const hourMatch = text.match(/\b(\d{1,2})\b/);
// // //     if (hourMatch) {
// // //       let hours = parseInt(hourMatch[1]);
// // //       // Default to PM if between 1-11, AM if 12
// // //       if (hours >= 1 && hours <= 11) hours += 12;
// // //       if (hours === 12) hours = 0; // 12 AM
// // //       return `${hours.toString().padStart(2, '0')}:00`;
// // //     }
    
// // //     return '';
// // //   }, []);

// // //   // Parse date from text
// // //   const parseDateFromText = useCallback((text) => {
// // //     const now = new Date();
    
// // //     if (text === 'today') {
// // //       return now.toISOString().split('T')[0];
// // //     }
    
// // //     if (text === 'tomorrow') {
// // //       const tomorrow = new Date(now);
// // //       tomorrow.setDate(tomorrow.getDate() + 1);
// // //       return tomorrow.toISOString().split('T')[0];
// // //     }
    
// // //     if (text.includes('next week')) {
// // //       const nextWeek = new Date(now);
// // //       nextWeek.setDate(nextWeek.getDate() + 7);
// // //       return nextWeek.toISOString().split('T')[0];
// // //     }
    
// // //     // Try to parse as date string
// // //     const date = new Date(text);
// // //     if (!isNaN(date.getTime())) {
// // //       return date.toISOString().split('T')[0];
// // //     }
    
// // //     return '';
// // //   }, []);

// // //   // Handle complete reminder in one sentence
// // //   const handleCompleteReminder = useCallback((command) => {
// // //     // Extract text
// // //     let text = '';
// // //     if (command.includes('remind me to')) {
// // //       text = command.split('remind me to')[1]?.trim();
// // //     } else if (command.includes('set reminder')) {
// // //       text = command.split('set reminder')[1]?.trim();
// // //     } else if (command.includes('add reminder')) {
// // //       text = command.split('add reminder')[1]?.trim();
// // //     }
    
// // //     if (!text) {
// // //       speak('What should I remind you about?');
// // //       return;
// // //     }
    
// // //     // Remove time/date from text
// // //     const timeDateMatch = text.match(/(.+) (?:at|on) (.+)/i);
// // //     if (timeDateMatch) {
// // //       text = timeDateMatch[1].trim();
// // //       const timeDateStr = timeDateMatch[2].trim();
      
// // //       // Parse complete date-time
// // //       const dateTime = parseCompleteDateTime(timeDateStr);
// // //       createReminder(text, dateTime);
// // //     } else {
// // //       // Default: 1 hour from now
// // //       const defaultTime = new Date();
// // //       defaultTime.setHours(defaultTime.getHours() + 1);
// // //       createReminder(text, defaultTime);
// // //     }
// // //   }, [speak]);

// // //   // Parse complete date-time
// // //   const parseCompleteDateTime = useCallback((text) => {
// // //     const now = new Date();
// // //     const result = new Date(now);
    
// // //     // Default: 1 hour from now
// // //     result.setHours(result.getHours() + 1);
    
// // //     // Check for relative time
// // //     const relativeMatch = text.match(/in\s+(\d+)\s+(hour|minute|day)s?\b/i);
// // //     if (relativeMatch) {
// // //       const amount = parseInt(relativeMatch[1]);
// // //       const unit = relativeMatch[2].toLowerCase();
      
// // //       if (unit === 'hour') result.setHours(result.getHours() + amount);
// // //       else if (unit === 'minute') result.setMinutes(result.getMinutes() + amount);
// // //       else if (unit === 'day') result.setDate(result.getDate() + amount);
      
// // //       return result;
// // //     }
    
// // //     // Parse time
// // //     let hours, minutes = 0;
// // //     const timeMatch = text.match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)?/i);
// // //     if (timeMatch) {
// // //       hours = parseInt(timeMatch[1]);
// // //       minutes = timeMatch[2] ? parseInt(timeMatch[2]) : 0;
// // //       const period = timeMatch[3]?.toLowerCase();
      
// // //       if (period === 'pm' && hours < 12) hours += 12;
// // //       if (period === 'am' && hours === 12) hours = 0;
      
// // //       result.setHours(hours, minutes, 0, 0);
// // //     }
    
// // //     // Adjust date
// // //     if (text.includes('tomorrow')) {
// // //       result.setDate(result.getDate() + 1);
// // //     } else if (text.includes('next week')) {
// // //       result.setDate(result.getDate() + 7);
// // //     }
    
// // //     // If time is in past, move to tomorrow
// // //     if (result < now) {
// // //       result.setDate(result.getDate() + 1);
// // //     }
    
// // //     return result;
// // //   }, []);

// // //   // Create reminder
// // //   const createReminder = useCallback((text, dateTime) => {
// // //     const reminder = {
// // //       id: Date.now(),
// // //       text: text,
// // //       time: dateTime.toISOString(),
// // //       date: dateTime.toISOString().split('T')[0],
// // //       timeStr: dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
// // //       displayTime: dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
// // //       repeat: 'once',
// // //       active: true,
// // //       createdAt: new Date().toISOString()
// // //     };
    
// // //     setReminders(prev => [...prev, reminder]);
// // //     scheduleReminderTimeout(reminder);
    
// // //     const dateStr = formatDisplayDate(reminder.date);
// // //     speak(`Reminder set for ${dateStr} at ${reminder.displayTime}: ${text}`);
// // //     setStatus(`Added: ${text} on ${dateStr} at ${reminder.displayTime}`);
// // //   }, [scheduleReminderTimeout, speak]);

// // //   // Save reminder from form
// // //   const saveReminder = useCallback(() => {
// // //     if (!reminderText.trim()) {
// // //       speak('Please provide reminder text');
// // //       setStatus('Reminder text required');
// // //       return;
// // //     }
    
// // //     let dateTime;
    
// // //     if (reminderDate && reminderTime) {
// // //       // Combine date and time
// // //       const [year, month, day] = reminderDate.split('-').map(Number);
// // //       const [hours, minutes] = reminderTime.split(':').map(Number);
// // //       dateTime = new Date(year, month - 1, day, hours, minutes, 0);
// // //     } else if (reminderTime) {
// // //       // Use today with specified time
// // //       dateTime = new Date();
// // //       const [hours, minutes] = reminderTime.split(':').map(Number);
// // //       dateTime.setHours(hours, minutes, 0, 0);
      
// // //       // If time is in past, move to tomorrow
// // //       if (dateTime < new Date()) {
// // //         dateTime.setDate(dateTime.getDate() + 1);
// // //       }
// // //     } else {
// // //       // Default: 1 hour from now
// // //       dateTime = new Date();
// // //       dateTime.setHours(dateTime.getHours() + 1);
// // //     }
    
// // //     if (isEditing && editingId) {
// // //       // Update existing
// // //       const updatedReminder = {
// // //         id: editingId,
// // //         text: reminderText,
// // //         time: dateTime.toISOString(),
// // //         date: dateTime.toISOString().split('T')[0],
// // //         timeStr: dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
// // //         displayTime: dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
// // //         repeat: repeatOption,
// // //         active: true,
// // //         createdAt: new Date().toISOString()
// // //       };
      
// // //       setReminders(prev => prev.map(r => 
// // //         r.id === editingId ? updatedReminder : r
// // //       ));
      
// // //       // Reschedule
// // //       scheduleReminderTimeout(updatedReminder);
      
// // //       speak(`Reminder updated: ${reminderText}`);
// // //       setStatus(`Updated: ${reminderText}`);
// // //       setIsEditing(false);
// // //       setEditingId(null);
// // //     } else {
// // //       // Create new
// // //       const newReminder = {
// // //         id: Date.now(),
// // //         text: reminderText,
// // //         time: dateTime.toISOString(),
// // //         date: dateTime.toISOString().split('T')[0],
// // //         timeStr: dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
// // //         displayTime: dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
// // //         repeat: repeatOption,
// // //         active: true,
// // //         createdAt: new Date().toISOString()
// // //       };
      
// // //       setReminders(prev => [...prev, newReminder]);
// // //       scheduleReminderTimeout(newReminder);
      
// // //       const dateStr = formatDisplayDate(newReminder.date);
// // //       speak(`Reminder added: ${reminderText} on ${dateStr} at ${newReminder.displayTime}`);
// // //       setStatus(`Added: ${reminderText} on ${dateStr} at ${newReminder.displayTime}`);
// // //     }
    
// // //     // Reset form
// // //     setReminderText('');
// // //     setReminderTime('');
// // //     setReminderDate('');
// // //     setRepeatOption('once');
// // //   }, [reminderText, reminderTime, reminderDate, repeatOption, isEditing, editingId, scheduleReminderTimeout, speak]);

// // //   // List reminders
// // //   const listReminders = useCallback(() => {
// // //     if (reminders.length === 0) {
// // //       speak('You have no reminders');
// // //       setStatus('No reminders');
// // //       return;
// // //     }
    
// // //     speak(`You have ${reminders.length} reminder${reminders.length === 1 ? '' : 's'}`);
    
// // //     // Speak each reminder with delay
// // //     reminders.forEach((reminder, index) => {
// // //       setTimeout(() => {
// // //         const dateStr = formatDisplayDate(reminder.date);
// // //         speak(`Reminder ${index + 1}: ${reminder.text} on ${dateStr} at ${reminder.displayTime}`);
// // //       }, (index + 1) * 2000);
// // //     });
    
// // //     setStatus(`Showing ${reminders.length} reminder${reminders.length === 1 ? '' : 's'}`);
// // //   }, [reminders, speak]);

// // //   // Handle delete command
// // //   const handleDeleteCommand = useCallback((command) => {
// // //     const numMatch = command.match(/reminder (\d+|one|two|three)/i);
// // //     if (numMatch) {
// // //       let index;
// // //       const num = numMatch[1].toLowerCase();
      
// // //       const numberMap = {
// // //         'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5,
// // //         'six': 6, 'seven': 7, 'eight': 8, 'nine': 9, 'ten': 10
// // //       };
      
// // //       index = numberMap[num] ? numberMap[num] - 1 : parseInt(num) - 1;
      
// // //       if (index >= 0 && index < reminders.length) {
// // //         const deleted = reminders[index];
// // //         deleteReminder(deleted.id);
// // //       } else {
// // //         speak(`Reminder ${num} not found`);
// // //       }
// // //     } else if (command.includes('all')) {
// // //       clearAllReminders();
// // //     } else {
// // //       speak('Say which reminder to delete, like "delete reminder one"');
// // //     }
// // //   }, [reminders]);

// // //   // Delete reminder
// // //   const deleteReminder = useCallback((id) => {
// // //     // Clear timeout
// // //     if (timeoutRef.current.has(id)) {
// // //       clearTimeout(timeoutRef.current.get(id));
// // //       timeoutRef.current.delete(id);
// // //     }
    
// // //     // Remove from triggered set
// // //     triggeredRef.current.delete(id);
    
// // //     // Remove from state
// // //     setReminders(prev => prev.filter(r => r.id !== id));
    
// // //     speak('Reminder deleted');
// // //     setStatus('Reminder deleted');
// // //   }, []);

// // //   // Handle edit command
// // //   const handleEditCommand = useCallback((command) => {
// // //     const numMatch = command.match(/reminder (\d+|one|two|three)/i);
// // //     if (numMatch) {
// // //       let index;
// // //       const num = numMatch[1].toLowerCase();
      
// // //       const numberMap = {
// // //         'one': 1, 'two': 2, 'three': 3
// // //       };
      
// // //       index = numberMap[num] ? numberMap[num] - 1 : parseInt(num) - 1;
      
// // //       if (index >= 0 && index < reminders.length) {
// // //         const reminder = reminders[index];
// // //         setReminderText(reminder.text);
// // //         setReminderDate(reminder.date);
// // //         setReminderTime(reminder.timeStr);
// // //         setRepeatOption(reminder.repeat || 'once');
// // //         setIsEditing(true);
// // //         setEditingId(reminder.id);
        
// // //         speak(`Editing reminder ${index + 1}`);
// // //         setStatus(`Editing reminder ${index + 1}`);
// // //       }
// // //     }
// // //   }, [reminders]);

// // //   // Clear all reminders
// // //   const clearAllReminders = useCallback(() => {
// // //     if (reminders.length === 0) {
// // //       speak('No reminders to clear');
// // //       return;
// // //     }
    
// // //     // Clear all timeouts
// // //     timeoutRef.current.forEach(timeout => clearTimeout(timeout));
// // //     timeoutRef.current.clear();
    
// // //     // Clear triggered set
// // //     triggeredRef.current.clear();
    
// // //     // Clear state
// // //     setReminders([]);
    
// // //     speak('All reminders cleared');
// // //     setStatus('All reminders cleared');
// // //   }, [reminders]);

// // //   // Toggle reminder active state
// // //   const toggleReminder = useCallback((id) => {
// // //     setReminders(prev => prev.map(reminder => {
// // //       if (reminder.id === id) {
// // //         const updated = { ...reminder, active: !reminder.active };
        
// // //         // Schedule or unschedule
// // //         if (updated.active) {
// // //           scheduleReminderTimeout(updated);
// // //         } else {
// // //           if (timeoutRef.current.has(id)) {
// // //             clearTimeout(timeoutRef.current.get(id));
// // //             timeoutRef.current.delete(id);
// // //           }
// // //         }
        
// // //         return updated;
// // //       }
// // //       return reminder;
// // //     }));
// // //   }, [scheduleReminderTimeout]);

// // //   // Format date for display
// // //   const formatDisplayDate = useCallback((dateStr) => {
// // //     const date = new Date(dateStr);
// // //     const today = new Date();
// // //     const tomorrow = new Date();
// // //     tomorrow.setDate(tomorrow.getDate() + 1);
    
// // //     if (date.toDateString() === today.toDateString()) {
// // //       return 'Today';
// // //     } else if (date.toDateString() === tomorrow.toDateString()) {
// // //       return 'Tomorrow';
// // //     } else {
// // //       return date.toLocaleDateString();
// // //     }
// // //   }, []);

// // //   // Reset form
// // //   const resetForm = useCallback(() => {
// // //     setReminderText('');
// // //     setReminderTime('');
// // //     setReminderDate('');
// // //     setRepeatOption('once');
// // //     setIsEditing(false);
// // //     setEditingId(null);
// // //   }, []);

// // //   // Test reminder
// // //   const testReminder = useCallback(() => {
// // //     const now = new Date();
// // //     now.setMinutes(now.getMinutes() + 1);
    
// // //     const testReminder = {
// // //       id: Date.now(),
// // //       text: 'Test reminder - voice system is working',
// // //       time: now.toISOString(),
// // //       date: now.toISOString().split('T')[0],
// // //       timeStr: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
// // //       displayTime: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
// // //       repeat: 'once',
// // //       active: true,
// // //       createdAt: new Date().toISOString()
// // //     };
    
// // //     setReminders(prev => [...prev, testReminder]);
// // //     scheduleReminderTimeout(testReminder);
    
// // //     speak('Test reminder added. It will trigger in 1 minute.');
// // //     setStatus('Test reminder added (1 minute)');
// // //   }, [scheduleReminderTimeout, speak]);

// // //   return (
// // //     <div className="reminders-page">
// // //       {/* Fixed Header */}
// // //       <header className="fixed-header">
// // //         <div className="header-content">
// // //           <div className="header-left">
// // //             <button 
// // //               className="back-btn"
// // //               onClick={() => window.location.href = '/dashboard'}
// // //             >
// // //               ← Back
// // //             </button>
// // //             <h1 className="logo">VISIONA</h1>
// // //           </div>
          
// // //           <div className="header-title">
// // //             <h2>Voice Reminders</h2>
// // //             <p className="subtitle">Set reminders using voice commands</p>
// // //           </div>
          
// // //           <div className="user-menu">
// // //             <button 
// // //               className={`voice-btn ${isListening ? 'listening' : ''}`}
// // //               onClick={() => {
// // //                 if (isListening) {
// // //                   stopListening();
// // //                 } else {
// // //                   startListening();
// // //                 }
// // //               }}
// // //             >
// // //               🎤 {isListening ? 'Listening...' : 'Voice Control'}
// // //             </button>
// // //           </div>
// // //         </div>
// // //       </header>

// // //       {/* Main Content */}
// // //       <div className="reminders-content">
// // //         <div className="reminders-container">
// // //           {/* Status */}
// // //           <div className="status-message">
// // //             <div className="status-text">
// // //               {isListening ? '🎤 Listening... Speak now' : status}
// // //             </div>
// // //             <button 
// // //               className="clear-status-btn"
// // //               onClick={() => setStatus('Ready')}
// // //             >
// // //               ×
// // //             </button>
// // //           </div>

// // //           {/* Voice Control */}
// // //           <div className="voice-control-section">
// // //             <div className="voice-status-indicator">
// // //               <div className={`listening-dot ${isListening ? 'active' : ''}`}></div>
// // //               <span className="status-text">
// // //                 {isListening ? '● Listening... Say your command' : 'Ready for voice commands'}
// // //               </span>
// // //               <button 
// // //                 className="voice-help-btn"
// // //                 onClick={() => setShowCommands(!showCommands)}
// // //               >
// // //                 {showCommands ? 'Hide Commands' : 'Show Commands'}
// // //               </button>
// // //             </div>
            
// // //             {showCommands && (
// // //               <div className="voice-commands-panel">
// // //                 <h3>🎤 Voice Commands</h3>
// // //                 <div className="commands-grid">
// // //                   <div className="command-category">
// // //                     <h4>Quick Add</h4>
// // //                     <ul>
// // //                       <li>"Remind me to call mom at 3 PM"</li>
// // //                       <li>"Set reminder meeting tomorrow at 11 AM"</li>
// // //                       <li>"Add reminder doctor appointment"</li>
// // //                     </ul>
// // //                   </div>
// // //                   <div className="command-category">
// // //                     <h4>Manage</h4>
// // //                     <ul>
// // //                       <li>"Show reminders"</li>
// // //                       <li>"Delete reminder one"</li>
// // //                       <li>"Clear all reminders"</li>
// // //                     </ul>
// // //                   </div>
// // //                 </div>
// // //                 <div className="voice-tips">
// // //                   <p><strong>Tip:</strong> Works offline. All data saved in your browser.</p>
// // //                   <button 
// // //                     className="close-help-btn"
// // //                     onClick={() => setShowCommands(false)}
// // //                   >
// // //                     Close
// // //                   </button>
// // //                 </div>
// // //               </div>
// // //             )}
// // //           </div>

// // //           {/* Add Reminder Form */}
// // //           <div className="reminder-form-section">
// // //             <div className="section-header">
// // //               <h3>{isEditing ? '✏️ Edit Reminder' : '➕ Add Reminder'}</h3>
// // //               {isEditing && (
// // //                 <button className="cancel-edit-btn" onClick={resetForm}>
// // //                   Cancel
// // //                 </button>
// // //               )}
// // //             </div>
            
// // //             <div className="reminder-form">
// // //               <div className="form-group">
// // //                 <label>Reminder Text *</label>
// // //                 <input
// // //                   type="text"
// // //                   value={reminderText}
// // //                   onChange={(e) => setReminderText(e.target.value)}
// // //                   placeholder="e.g., Meeting with team"
// // //                   className="form-input"
// // //                 />
// // //                 <div className="voice-hint">
// // //                   Say: "reminder text is [text]"
// // //                 </div>
// // //               </div>
              
// // //               <div className="form-row">
// // //                 <div className="form-group">
// // //                   <label>Date</label>
// // //                   <input
// // //                     type="date"
// // //                     value={reminderDate}
// // //                     onChange={(e) => setReminderDate(e.target.value)}
// // //                     className="form-input"
// // //                   />
// // //                   <div className="voice-hint">
// // //                     Say: "date is [tomorrow]"
// // //                   </div>
// // //                 </div>
                
// // //                 <div className="form-group">
// // //                   <label>Time *</label>
// // //                   <input
// // //                     type="time"
// // //                     value={reminderTime}
// // //                     onChange={(e) => setReminderTime(e.target.value)}
// // //                     className="form-input"
// // //                   />
// // //                   <div className="voice-hint">
// // //                     Say: "time is [3 PM]"
// // //                   </div>
// // //                 </div>
// // //               </div>
              
// // //               <div className="form-group">
// // //                 <label>Repeat</label>
// // //                 <select
// // //                   value={repeatOption}
// // //                   onChange={(e) => setRepeatOption(e.target.value)}
// // //                   className="form-input"
// // //                 >
// // //                   <option value="once">Once</option>
// // //                   <option value="daily">Daily</option>
// // //                   <option value="weekly">Weekly</option>
// // //                   <option value="monthly">Monthly</option>
// // //                 </select>
// // //                 <div className="voice-hint">
// // //                   Say: "repeat daily"
// // //                 </div>
// // //               </div>
              
// // //               <div className="form-actions">
// // //                 <button 
// // //                   className="submit-btn"
// // //                   onClick={saveReminder}
// // //                   disabled={!reminderText.trim() || !reminderTime}
// // //                 >
// // //                   {isEditing ? 'Update' : 'Add Reminder'}
// // //                 </button>
// // //                 <button 
// // //                   className="cancel-btn"
// // //                   onClick={resetForm}
// // //                 >
// // //                   Reset
// // //                 </button>
// // //                 <button 
// // //                   className="test-btn"
// // //                   onClick={testReminder}
// // //                 >
// // //                   Test (1 min)
// // //                 </button>
// // //               </div>
// // //             </div>
// // //           </div>

// // //           {/* Reminders List */}
// // //           <div className="reminders-list-section">
// // //             <div className="section-header">
// // //               <h3>Your Reminders ({reminders.length})</h3>
// // //               <div className="list-actions">
// // //                 <button 
// // //                   className="speak-reminders-btn"
// // //                   onClick={listReminders}
// // //                 >
// // //                   🔊 Speak All
// // //                 </button>
// // //               </div>
// // //             </div>
            
// // //             {reminders.length === 0 ? (
// // //               <div className="empty-state">
// // //                 <div className="empty-icon">⏰</div>
// // //                 <h4>No reminders yet</h4>
// // //                 <p>Use voice commands or the form above</p>
// // //               </div>
// // //             ) : (
// // //               <div className="reminders-grid">
// // //                 {reminders.map((reminder, index) => (
// // //                   <div 
// // //                     key={reminder.id} 
// // //                     className={`reminder-card ${reminder.active ? 'active' : 'inactive'}`}
// // //                   >
// // //                     <div className="reminder-header">
// // //                       <div className="reminder-number">#{index + 1}</div>
// // //                       <div className="reminder-status">
// // //                         {reminder.active ? '⏰ Active' : '✓ Done'}
// // //                       </div>
// // //                     </div>
                    
// // //                     <div className="reminder-content">
// // //                       <div className="reminder-text">{reminder.text}</div>
// // //                       <div className="reminder-details">
// // //                         <div className="reminder-time">
// // //                           <span className="date">{formatDisplayDate(reminder.date)}</span>
// // //                           <span className="time">{reminder.displayTime}</span>
// // //                         </div>
// // //                         <div className="reminder-repeat">
// // //                           Repeat: {reminder.repeat}
// // //                         </div>
// // //                       </div>
// // //                     </div>
                    
// // //                     <div className="reminder-actions">
// // //                       <button 
// // //                         className="edit-btn"
// // //                         onClick={() => {
// // //                           setReminderText(reminder.text);
// // //                           setReminderDate(reminder.date);
// // //                           setReminderTime(reminder.timeStr);
// // //                           setRepeatOption(reminder.repeat);
// // //                           setIsEditing(true);
// // //                           setEditingId(reminder.id);
// // //                         }}
// // //                       >
// // //                         Edit
// // //                       </button>
// // //                       <button 
// // //                         className="toggle-btn"
// // //                         onClick={() => toggleReminder(reminder.id)}
// // //                       >
// // //                         {reminder.active ? 'Pause' : 'Activate'}
// // //                       </button>
// // //                       <button 
// // //                         className="delete-btn"
// // //                         onClick={() => deleteReminder(reminder.id)}
// // //                       >
// // //                         Delete
// // //                       </button>
// // //                     </div>
// // //                   </div>
// // //                 ))}
// // //               </div>
// // //             )}
            
// // //             {reminders.length > 0 && (
// // //               <div className="bulk-actions">
// // //                 <button 
// // //                   className="clear-all-btn"
// // //                   onClick={clearAllReminders}
// // //                 >
// // //                   🗑️ Clear All
// // //                 </button>
// // //               </div>
// // //             )}
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* Status Bar */}
// // //       <div className="status-bar">
// // //         <div className="status-content">
// // //           <div className="listening-status">
// // //             {isListening ? '● Listening...' : 'Ready'}
// // //           </div>
// // //           <div className="voice-controls">
// // //             <button 
// // //               className="help-btn"
// // //               onClick={() => setShowCommands(!showCommands)}
// // //             >
// // //               {showCommands ? 'Hide Help' : 'Help'}
// // //             </button>
// // //             <button 
// // //               className={`mic-btn ${isListening ? 'active' : ''}`}
// // //               onClick={() => isListening ? stopListening() : startListening()}
// // //             >
// // //               🎤
// // //             </button>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default RemindersPage;


// // import React, { useState, useEffect, useRef, useCallback } from 'react';
// // import { useVoiceCommands } from '../../components/VoiceAssistant/useVoiceCommands';
// // import './Reminders.css';

// // const RemindersPage = () => {
// //   const [reminders, setReminders] = useState([]);
// //   const [status, setStatus] = useState('Voice reminders ready');
// //   const [showCommands, setShowCommands] = useState(false);
// //   const [isEditing, setIsEditing] = useState(false);
// //   const [editingId, setEditingId] = useState(null);
  
// //   const [reminderText, setReminderText] = useState('');
// //   const [reminderTime, setReminderTime] = useState('');
// //   const [reminderDate, setReminderDate] = useState('');
// //   const [repeatOption, setRepeatOption] = useState('once');
  
// //   const { 
// //     startListening: voiceStartListening, 
// //     stopListening: voiceStopListening, 
// //     speak, 
// //     registerCommands,
// //     isListening,
// //     setOnResult
// //   } = useVoiceCommands();

// //   const timeoutRef = useRef(new Map());
// //   const hasScheduledRef = useRef(false);
// //   const isSpeakingRef = useRef(false);
// //   const wasListeningRef = useRef(false);

// //   // SAFE recognition start wrapper
// //   const safeStartListening = useCallback(() => {
// //     try {
// //       voiceStartListening();
// //     } catch (err) {
// //       console.log('Safe start delayed');
// //       setTimeout(() => {
// //         try {
// //           voiceStartListening();
// //         } catch (e) {
// //           console.log('Failed to start:', e);
// //         }
// //       }, 500);
// //     }
// //   }, [voiceStartListening]);

// //   // SAFE recognition stop wrapper (use abort)
// //   const safeStopListening = useCallback(() => {
// //     try {
// //       voiceStopListening();
// //     } catch (err) {
// //       console.log('Stop error:', err);
// //     }
// //   }, [voiceStopListening]);

// //   // Initialize with delayed scheduling
// //   useEffect(() => {
// //     // Load reminders FIRST
// //     const saved = JSON.parse(localStorage.getItem('voice-reminders')) || [];
// //     setReminders(saved);
    
// //     // Setup voice commands
// //     const commands = {
// //       'remind me to (.*)': (transcript) => {
// //         const match = transcript.match(/remind me to (.+)/i);
// //         if (match) handleCompleteReminder(match[1]);
// //       },
// //       'set reminder (.*)': (transcript) => {
// //         const match = transcript.match(/set reminder (.+)/i);
// //         if (match) handleCompleteReminder(match[1]);
// //       },
// //       'add reminder (.*)': (transcript) => {
// //         const match = transcript.match(/add reminder (.+)/i);
// //         if (match) handleCompleteReminder(match[1]);
// //       },
// //       'reminder text is (.*)': (transcript) => {
// //         const match = transcript.match(/reminder text is (.+)/i);
// //         if (match) setReminderText(match[1]);
// //       },
// //       'text is (.*)': (transcript) => {
// //         const match = transcript.match(/text is (.+)/i);
// //         if (match) setReminderText(match[1]);
// //       },
// //       'time is (.*)': (transcript) => {
// //         const match = transcript.match(/time is (.+)/i);
// //         if (match) setTimeFromVoice(match[1]);
// //       },
// //       'at (.*)': (transcript) => {
// //         const match = transcript.match(/at (.+)/i);
// //         if (match) setTimeFromVoice(match[1]);
// //       },
// //       'date is (.*)': (transcript) => {
// //         const match = transcript.match(/date is (.+)/i);
// //         if (match) setDateFromVoice(match[1]);
// //       },
// //       'on (.*)': (transcript) => {
// //         const match = transcript.match(/on (.+)/i);
// //         if (match) setDateFromVoice(match[1]);
// //       },
// //       'repeat daily': () => setRepeatOption('daily'),
// //       'repeat weekly': () => setRepeatOption('weekly'),
// //       'repeat monthly': () => setRepeatOption('monthly'),
// //       'repeat once': () => setRepeatOption('once'),
// //       'save reminder': () => saveReminder(),
// //       'show reminders': () => listReminders(),
// //       'list reminders': () => listReminders(),
// //       'delete reminder (.*)': (transcript) => {
// //         const match = transcript.match(/delete reminder (.+)/i);
// //         if (match) handleDeleteCommand(match[1]);
// //       },
// //       'clear all reminders': () => clearAllReminders(),
// //       'edit reminder (.*)': (transcript) => {
// //         const match = transcript.match(/edit reminder (.+)/i);
// //         if (match) handleEditCommand(match[1]);
// //       },
// //       'go back': () => window.location.href = '/dashboard',
// //       'go to dashboard': () => window.location.href = '/dashboard',
// //       'dashboard': () => window.location.href = '/dashboard',
// //       'help': () => {
// //         setShowCommands(true);
// //         speak('Available commands: set reminder, time is, date is, save reminder');
// //       },
// //       'stop': () => {
// //         safeStopListening();
// //         speak('Stopped');
// //       },
// //       'start': () => {
// //         safeStartListening();
// //         speak('Started');
// //       }
// //     };

// //     registerCommands(commands);
    
// //     // Set voice result handler
// //     setOnResult((transcript) => {
// //       if (!isSpeakingRef.current) {
// //         handleVoiceInput(transcript.toLowerCase());
// //       }
// //     });

// //     // Auto-start listening after delay
// //     setTimeout(() => {
// //       safeStartListening();
// //       setTimeout(() => {
// //         speak('Voice reminders ready');
// //       }, 500);
// //     }, 1000);

// //     // Schedule reminders AFTER state is set
// //     const scheduleTimer = setTimeout(() => {
// //       if (!hasScheduledRef.current) {
// //         rescheduleAllReminders();
// //         hasScheduledRef.current = true;
// //       }
// //     }, 500);

// //     // Setup interval for checking due reminders
// //     const intervalId = setInterval(() => {
// //       checkDueReminders();
// //     }, 30000); // Check every 30 seconds

// //     return () => {
// //       clearTimeout(scheduleTimer);
// //       clearInterval(intervalId);
      
// //       // Clean up timeouts
// //       timeoutRef.current.forEach(timeout => clearTimeout(timeout));
// //       timeoutRef.current.clear();
      
// //       safeStopListening();
// //       window.speechSynthesis.cancel();
// //     };
// //   }, []);

// //   // Save reminders
// //   useEffect(() => {
// //     localStorage.setItem('voice-reminders', JSON.stringify(reminders));
    
// //     // Reschedule when reminders change
// //     if (hasScheduledRef.current) {
// //       setTimeout(() => {
// //         rescheduleAllReminders();
// //       }, 100);
// //     }
// //   }, [reminders]);

// //   // FIXED: rescheduleAllReminders - waits for state to be ready
// //   const rescheduleAllReminders = useCallback(() => {
// //     // Clear existing timeouts
// //     timeoutRef.current.forEach(timeout => clearTimeout(timeout));
// //     timeoutRef.current.clear();
    
// //     // Schedule each active reminder
// //     reminders.forEach(reminder => {
// //       if (reminder.active) {
// //         scheduleReminderTimeout(reminder);
// //       }
// //     });
// //   }, [reminders]);

// //   // Schedule single reminder
// //   const scheduleReminderTimeout = useCallback((reminder) => {
// //     const reminderTime = new Date(reminder.time);
// //     const now = new Date();
// //     const delay = reminderTime.getTime() - now.getTime();
    
// //     if (delay > 0 && delay < 30 * 24 * 60 * 60 * 1000) { // Within 30 days
// //       // Clear existing
// //       if (timeoutRef.current.has(reminder.id)) {
// //         clearTimeout(timeoutRef.current.get(reminder.id));
// //       }
      
// //       const timeoutId = setTimeout(() => {
// //         triggerReminder(reminder);
// //       }, delay);
      
// //       timeoutRef.current.set(reminder.id, timeoutId);
// //     } 
// //     // If already due but within last 5 minutes
// //     else if (delay <= 0 && delay > -5 * 60 * 1000) {
// //       triggerReminder(reminder);
// //     }
// //   }, []);

// //   // Check due reminders
// //   const checkDueReminders = useCallback(() => {
// //     const now = new Date();
    
// //     reminders.forEach(reminder => {
// //       if (reminder.active) {
// //         const reminderTime = new Date(reminder.time);
// //         const diff = reminderTime.getTime() - now.getTime();
        
// //         if (diff > 0 && diff <= 60000) { // Due in next minute
// //           triggerReminder(reminder);
// //         }
// //       }
// //     });
// //   }, [reminders]);

// //   // Trigger reminder
// //   const triggerReminder = useCallback((reminder) => {
// //     // Clear timeout
// //     if (timeoutRef.current.has(reminder.id)) {
// //       clearTimeout(timeoutRef.current.get(reminder.id));
// //       timeoutRef.current.delete(reminder.id);
// //     }
    
// //     // Speak reminder with safe speech handling
// //     safeSpeak(`Reminder: ${reminder.text}`);
// //     setStatus(`🔔 ${reminder.text}`);
    
// //     // Handle repeats
// //     if (reminder.repeat !== 'once') {
// //       handleRepeatReminder(reminder);
// //     } else {
// //       setReminders(prev => prev.map(r => 
// //         r.id === reminder.id ? { ...r, active: false } : r
// //       ));
// //     }
// //   }, []);

// //   // SAFE speech synthesis that doesn't kill mic
// //   const safeSpeak = useCallback((text) => {
// //     if (!('speechSynthesis' in window)) return;
    
// //     // Pause listening while speaking
// //     wasListeningRef.current = isListening;
// //     if (isListening) {
// //       safeStopListening();
// //     }
    
// //     isSpeakingRef.current = true;
// //     window.speechSynthesis.cancel();
    
// //     const utterance = new SpeechSynthesisUtterance(text);
// //     utterance.rate = 1.0;
// //     utterance.pitch = 1.0;
// //     utterance.volume = 1.0;
    
// //     utterance.onend = () => {
// //       isSpeakingRef.current = false;
// //       // Resume listening if it was active
// //       if (wasListeningRef.current) {
// //         setTimeout(() => {
// //           safeStartListening();
// //         }, 500);
// //       }
// //     };
    
// //     utterance.onerror = () => {
// //       isSpeakingRef.current = false;
// //       if (wasListeningRef.current) {
// //         setTimeout(() => {
// //           safeStartListening();
// //         }, 500);
// //       }
// //     };
    
// //     window.speechSynthesis.speak(utterance);
// //   }, [isListening, safeStopListening, safeStartListening]);

// //   // Set time from voice
// //   const setTimeFromVoice = useCallback((timeStr) => {
// //     const time = parseTimeFromText(timeStr);
// //     if (time) {
// //       setReminderTime(time);
// //       safeSpeak(`Time set to ${time}`);
// //     }
// //   }, [safeSpeak]);

// //   // Set date from voice
// //   const setDateFromVoice = useCallback((dateStr) => {
// //     const date = parseDateFromText(dateStr);
// //     if (date) {
// //       setReminderDate(date);
// //       safeSpeak(`Date set to ${date}`);
// //     }
// //   }, [safeSpeak]);

// //   // Parse time from text
// //   const parseTimeFromText = useCallback((text) => {
// //     // Handle "3 pm" or "3:30 pm"
// //     const match = text.match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)?/i);
// //     if (match) {
// //       let hours = parseInt(match[1]);
// //       const minutes = match[2] ? parseInt(match[2]) : 0;
// //       const period = match[3]?.toLowerCase();
      
// //       if (period === 'pm' && hours < 12) hours += 12;
// //       if (period === 'am' && hours === 12) hours = 0;
      
// //       return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
// //     }
    
// //     // Handle "in X hours"
// //     const relativeMatch = text.match(/in (\d+) (hour|minute)s?/i);
// //     if (relativeMatch) {
// //       const amount = parseInt(relativeMatch[1]);
// //       const unit = relativeMatch[2];
// //       const now = new Date();
      
// //       if (unit === 'hour') now.setHours(now.getHours() + amount);
// //       else if (unit === 'minute') now.setMinutes(now.getMinutes() + amount);
      
// //       return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
// //     }
    
// //     return '';
// //   }, []);

// //   // Parse date from text
// //   const parseDateFromText = useCallback((text) => {
// //     const now = new Date();
    
// //     if (text === 'today') return now.toISOString().split('T')[0];
// //     if (text === 'tomorrow') {
// //       const tomorrow = new Date(now);
// //       tomorrow.setDate(tomorrow.getDate() + 1);
// //       return tomorrow.toISOString().split('T')[0];
// //     }
    
// //     // Try to parse date string
// //     const date = new Date(text);
// //     if (!isNaN(date.getTime())) return date.toISOString().split('T')[0];
    
// //     return '';
// //   }, []);

// //   // FIXED: Handle complete reminder parsing
// //   const handleCompleteReminder = useCallback((textWithTime) => {
// //     // Extract time first
// //     const timeMatch = textWithTime.match(/(.+)\s+(?:at|on)\s+(.+)/i);
    
// //     if (timeMatch) {
// //       const text = timeMatch[1].trim();
// //       const timeDateStr = timeMatch[2].trim();
      
// //       // Parse date-time
// //       const dateTime = parseCompleteDateTime(timeDateStr);
      
// //       if (text && dateTime) {
// //         createReminder(text, dateTime);
// //         return;
// //       }
// //     }
    
// //     // Fallback: try to find time in text
// //     const extracted = extractReminderAndTime(textWithTime);
// //     if (extracted.text && extracted.dateTime) {
// //       createReminder(extracted.text, extracted.dateTime);
// //     } else if (extracted.text) {
// //       // Set as reminder text for step-by-step
// //       setReminderText(extracted.text);
// //       safeSpeak(`Reminder text set. Now say the time.`);
// //     }
// //   }, [safeSpeak]);

// //   // Extract reminder and time from text
// //   const extractReminderAndTime = useCallback((text) => {
// //     const result = { text: '', dateTime: null };
    
// //     // Try to find time pattern
// //     const timePatterns = [
// //       /(\d{1,2})(?::(\d{2}))?\s*(am|pm)/i,
// //       /at\s+(\d{1,2})(?::(\d{2}))?\s*(am|pm)/i,
// //       /(\d{1,2}):(\d{2})/,
// //       /in\s+(\d+)\s+(hour|minute)s?/i
// //     ];
    
// //     for (const pattern of timePatterns) {
// //       const match = text.match(pattern);
// //       if (match) {
// //         const timePart = match[0];
// //         result.text = text.replace(timePart, '').replace(/\s+/g, ' ').trim();
// //         result.text = result.text.replace(/\b(?:at|on|for)\s*$/i, '').trim();
// //         result.dateTime = parseCompleteDateTime(timePart);
// //         break;
// //       }
// //     }
    
// //     if (!result.text) {
// //       result.text = text.trim();
// //     }
    
// //     return result;
// //   }, []);

// //   // Parse complete date-time
// //   const parseCompleteDateTime = useCallback((timeDateStr) => {
// //     const now = new Date();
// //     const result = new Date(now);
    
// //     // Handle relative times
// //     const relativeMatch = timeDateStr.match(/in\s+(\d+)\s+(hour|minute|day)s?/i);
// //     if (relativeMatch) {
// //       const amount = parseInt(relativeMatch[1]);
// //       const unit = relativeMatch[2].toLowerCase();
      
// //       if (unit === 'hour') result.setHours(result.getHours() + amount);
// //       else if (unit === 'minute') result.setMinutes(result.getMinutes() + amount);
// //       else if (unit === 'day') result.setDate(result.getDate() + amount);
      
// //       return result;
// //     }
    
// //     // Parse time
// //     const timeMatch = timeDateStr.match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)?/i);
// //     if (timeMatch) {
// //       let hours = parseInt(timeMatch[1]);
// //       const minutes = timeMatch[2] ? parseInt(timeMatch[2]) : 0;
// //       const period = timeMatch[3]?.toLowerCase();
      
// //       if (period === 'pm' && hours < 12) hours += 12;
// //       if (period === 'am' && hours === 12) hours = 0;
      
// //       result.setHours(hours, minutes, 0, 0);
// //     } else {
// //       // Default: 1 hour from now
// //       result.setHours(result.getHours() + 1);
// //     }
    
// //     // Check if time is in past, move to tomorrow
// //     if (result < now) {
// //       result.setDate(result.getDate() + 1);
// //     }
    
// //     return result;
// //   }, []);

// //   // Create reminder
// //   const createReminder = useCallback((text, dateTime) => {
// //     const reminder = {
// //       id: Date.now(),
// //       text: text,
// //       time: dateTime.toISOString(),
// //       date: dateTime.toISOString().split('T')[0],
// //       timeStr: dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
// //       displayTime: dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
// //       repeat: 'once',
// //       active: true,
// //       createdAt: new Date().toISOString()
// //     };
    
// //     setReminders(prev => [...prev, reminder]);
// //     scheduleReminderTimeout(reminder);
    
// //     const dateStr = formatDisplayDate(reminder.date);
// //     safeSpeak(`Reminder set for ${dateStr} at ${reminder.displayTime}`);
// //     setStatus(`Added: ${text}`);
// //   }, [scheduleReminderTimeout, safeSpeak]);

// //   // Handle voice input
// //   const handleVoiceInput = useCallback((transcript) => {
// //     console.log('Voice input:', transcript);
    
// //     // Check if it's a complete reminder
// //     if (transcript.includes('remind me to') || 
// //         transcript.includes('set reminder') || 
// //         transcript.includes('add reminder')) {
// //       handleCompleteReminder(transcript);
// //     }
// //   }, [handleCompleteReminder]);

// //   // Save reminder
// //   const saveReminder = useCallback(() => {
// //     if (!reminderText.trim()) {
// //       safeSpeak('Please provide reminder text');
// //       return;
// //     }
    
// //     let dateTime;
    
// //     if (reminderDate && reminderTime) {
// //       const [year, month, day] = reminderDate.split('-').map(Number);
// //       const [hours, minutes] = reminderTime.split(':').map(Number);
// //       dateTime = new Date(year, month - 1, day, hours, minutes, 0);
// //     } else if (reminderTime) {
// //       dateTime = new Date();
// //       const [hours, minutes] = reminderTime.split(':').map(Number);
// //       dateTime.setHours(hours, minutes, 0, 0);
      
// //       if (dateTime < new Date()) {
// //         dateTime.setDate(dateTime.getDate() + 1);
// //       }
// //     } else {
// //       dateTime = new Date();
// //       dateTime.setHours(dateTime.getHours() + 1);
// //     }
    
// //     if (isEditing && editingId) {
// //       const updatedReminder = {
// //         id: editingId,
// //         text: reminderText,
// //         time: dateTime.toISOString(),
// //         date: dateTime.toISOString().split('T')[0],
// //         timeStr: dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
// //         displayTime: dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
// //         repeat: repeatOption,
// //         active: true
// //       };
      
// //       setReminders(prev => prev.map(r => 
// //         r.id === editingId ? updatedReminder : r
// //       ));
      
// //       scheduleReminderTimeout(updatedReminder);
// //       safeSpeak('Reminder updated');
// //       setIsEditing(false);
// //       setEditingId(null);
// //     } else {
// //       createReminder(reminderText, dateTime);
// //     }
    
// //     // Reset form
// //     setReminderText('');
// //     setReminderTime('');
// //     setReminderDate('');
// //     setRepeatOption('once');
// //   }, [reminderText, reminderTime, reminderDate, repeatOption, isEditing, editingId, scheduleReminderTimeout, safeSpeak, createReminder]);

// //   // List reminders
// //   const listReminders = useCallback(() => {
// //     if (reminders.length === 0) {
// //       safeSpeak('You have no reminders');
// //       return;
// //     }
    
// //     safeSpeak(`You have ${reminders.length} reminder${reminders.length === 1 ? '' : 's'}`);
    
// //     reminders.forEach((reminder, index) => {
// //       setTimeout(() => {
// //         const dateStr = formatDisplayDate(reminder.date);
// //         safeSpeak(`Reminder ${index + 1}: ${reminder.text} on ${dateStr} at ${reminder.displayTime}`);
// //       }, (index + 1) * 1500);
// //     });
// //   }, [reminders, safeSpeak]);

// //   // Handle delete command
// //   const handleDeleteCommand = useCallback((input) => {
// //     const numMatch = input.match(/(\d+)/);
// //     const wordMatch = input.match(/\b(one|two|three|four|five|six|seven|eight|nine|ten)\b/i);
    
// //     let index = -1;
    
// //     if (numMatch) {
// //       index = parseInt(numMatch[1]) - 1;
// //     } else if (wordMatch) {
// //       const numberWords = {
// //         'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5,
// //         'six': 6, 'seven': 7, 'eight': 8, 'nine': 9, 'ten': 10
// //       };
// //       index = numberWords[wordMatch[0].toLowerCase()] - 1;
// //     }
    
// //     if (index >= 0 && index < reminders.length) {
// //       const deleted = reminders[index];
// //       deleteReminder(deleted.id);
// //     } else {
// //       safeSpeak(`Could not find reminder ${input}`);
// //     }
// //   }, [reminders]);

// //   // Delete reminder
// //   const deleteReminder = useCallback((id) => {
// //     // Clear timeout
// //     if (timeoutRef.current.has(id)) {
// //       clearTimeout(timeoutRef.current.get(id));
// //       timeoutRef.current.delete(id);
// //     }
    
// //     setReminders(prev => prev.filter(r => r.id !== id));
// //     safeSpeak('Reminder deleted');
// //   }, [safeSpeak]);

// //   // Handle edit command
// //   const handleEditCommand = useCallback((input) => {
// //     const numMatch = input.match(/(\d+)/);
// //     const wordMatch = input.match(/\b(one|two|three)\b/i);
    
// //     let index = -1;
    
// //     if (numMatch) {
// //       index = parseInt(numMatch[1]) - 1;
// //     } else if (wordMatch) {
// //       const numberWords = { 'one': 1, 'two': 2, 'three': 3 };
// //       index = numberWords[wordMatch[0].toLowerCase()] - 1;
// //     }
    
// //     if (index >= 0 && index < reminders.length) {
// //       const reminder = reminders[index];
// //       setReminderText(reminder.text);
// //       setReminderDate(reminder.date);
// //       setReminderTime(reminder.timeStr);
// //       setRepeatOption(reminder.repeat || 'once');
// //       setIsEditing(true);
// //       setEditingId(reminder.id);
// //       safeSpeak(`Editing reminder ${index + 1}`);
// //     }
// //   }, [reminders, safeSpeak]);

// //   // Clear all reminders
// //   const clearAllReminders = useCallback(() => {
// //     if (reminders.length === 0) {
// //       safeSpeak('No reminders to clear');
// //       return;
// //     }
    
// //     timeoutRef.current.forEach(timeout => clearTimeout(timeout));
// //     timeoutRef.current.clear();
// //     setReminders([]);
// //     safeSpeak('All reminders cleared');
// //   }, [reminders, safeSpeak]);

// //   // Handle repeat reminder
// //   const handleRepeatReminder = useCallback((reminder) => {
// //     const nextTime = new Date(reminder.time);
    
// //     switch (reminder.repeat) {
// //       case 'daily':
// //         nextTime.setDate(nextTime.getDate() + 1);
// //         break;
// //       case 'weekly':
// //         nextTime.setDate(nextTime.getDate() + 7);
// //         break;
// //       case 'monthly':
// //         nextTime.setMonth(nextTime.getMonth() + 1);
// //         break;
// //       default:
// //         return;
// //     }
    
// //     const updatedReminder = {
// //       ...reminder,
// //       time: nextTime.toISOString(),
// //       date: nextTime.toISOString().split('T')[0],
// //       timeStr: nextTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
// //       displayTime: nextTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
// //     };
    
// //     setReminders(prev => prev.map(r => 
// //       r.id === reminder.id ? updatedReminder : r
// //     ));
    
// //     scheduleReminderTimeout(updatedReminder);
// //   }, [scheduleReminderTimeout]);

// //   // Format display date
// //   const formatDisplayDate = useCallback((dateStr) => {
// //     const date = new Date(dateStr);
// //     const today = new Date();
// //     const tomorrow = new Date();
// //     tomorrow.setDate(tomorrow.getDate() + 1);
    
// //     if (date.toDateString() === today.toDateString()) return 'Today';
// //     if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
// //     return date.toLocaleDateString();
// //   }, []);

// //   // Reset form
// //   const resetForm = useCallback(() => {
// //     setReminderText('');
// //     setReminderTime('');
// //     setReminderDate('');
// //     setRepeatOption('once');
// //     setIsEditing(false);
// //     setEditingId(null);
// //   }, []);

// //   // Toggle reminder
// //   const toggleReminder = useCallback((id) => {
// //     setReminders(prev => prev.map(reminder => {
// //       if (reminder.id === id) {
// //         const updated = { ...reminder, active: !reminder.active };
// //         if (updated.active) {
// //           scheduleReminderTimeout(updated);
// //         } else {
// //           if (timeoutRef.current.has(id)) {
// //             clearTimeout(timeoutRef.current.get(id));
// //             timeoutRef.current.delete(id);
// //           }
// //         }
// //         return updated;
// //       }
// //       return reminder;
// //     }));
// //   }, [scheduleReminderTimeout]);

// //   // Test reminder
// //   const testReminder = useCallback(() => {
// //     const now = new Date();
// //     now.setMinutes(now.getMinutes() + 1);
    
// //     const testReminder = {
// //       id: Date.now(),
// //       text: 'Test reminder',
// //       time: now.toISOString(),
// //       date: now.toISOString().split('T')[0],
// //       timeStr: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
// //       displayTime: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
// //       repeat: 'once',
// //       active: true,
// //       createdAt: new Date().toISOString()
// //     };
    
// //     setReminders(prev => [...prev, testReminder]);
// //     scheduleReminderTimeout(testReminder);
// //     safeSpeak('Test reminder added for 1 minute');
// //   }, [scheduleReminderTimeout, safeSpeak]);

// //   return (
// //     <div className="reminders-page">
// //       <header className="fixed-header">
// //         <div className="header-content">
// //           <div className="header-left">
// //             <button 
// //               className="back-btn"
// //               onClick={() => window.location.href = '/dashboard'}
// //             >
// //               ← Back
// //             </button>
// //             <h1 className="logo">VISIONA</h1>
// //           </div>
          
// //           <div className="header-title">
// //             <h2>Voice Reminders</h2>
// //           </div>
          
// //           <div className="user-menu">
// //             <button 
// //               className={`voice-btn ${isListening ? 'listening' : ''}`}
// //               onClick={() => {
// //                 if (isListening) {
// //                   safeStopListening();
// //                 } else {
// //                   safeStartListening();
// //                 }
// //               }}
// //             >
// //               🎤 {isListening ? 'Listening...' : 'Voice'}
// //             </button>
// //           </div>
// //         </div>
// //       </header>

// //       <div className="reminders-content">
// //         <div className="reminders-container">
// //           <div className="status-message">
// //             <div className="status-text">
// //               {isListening ? '🎤 Listening...' : status}
// //             </div>
// //           </div>

// //           <div className="voice-control-section">
// //             <div className="voice-status-indicator">
// //               <div className={`listening-dot ${isListening ? 'active' : ''}`}></div>
// //               <span className="status-text">
// //                 {isListening ? '● Listening...' : 'Ready'}
// //               </span>
// //               <button 
// //                 className="voice-help-btn"
// //                 onClick={() => setShowCommands(!showCommands)}
// //               >
// //                 {showCommands ? 'Hide' : 'Help'}
// //               </button>
// //             </div>
            
// //             {showCommands && (
// //               <div className="voice-commands-panel">
// //                 <h3>Voice Commands</h3>
// //                 <div className="commands-grid">
// //                   <div className="command-category">
// //                     <h4>Add</h4>
// //                     <ul>
// //                       <li>"Remind me to call mom at 3 pm"</li>
// //                       <li>"Set reminder meeting tomorrow"</li>
// //                     </ul>
// //                   </div>
// //                   <div className="command-category">
// //                     <h4>Manage</h4>
// //                     <ul>
// //                       <li>"Show reminders"</li>
// //                       <li>"Delete reminder one"</li>
// //                       <li>"Clear all reminders"</li>
// //                     </ul>
// //                   </div>
// //                 </div>
// //               </div>
// //             )}
// //           </div>

// //           <div className="reminder-form-section">
// //             <div className="section-header">
// //               <h3>{isEditing ? 'Edit Reminder' : 'Add Reminder'}</h3>
// //             </div>
            
// //             <div className="reminder-form">
// //               <div className="form-group">
// //                 <label>Reminder Text *</label>
// //                 <input
// //                   type="text"
// //                   value={reminderText}
// //                   onChange={(e) => setReminderText(e.target.value)}
// //                   placeholder="e.g., Call mom"
// //                   className="form-input"
// //                 />
// //               </div>
              
// //               <div className="form-row">
// //                 <div className="form-group">
// //                   <label>Date</label>
// //                   <input
// //                     type="date"
// //                     value={reminderDate}
// //                     onChange={(e) => setReminderDate(e.target.value)}
// //                     className="form-input"
// //                   />
// //                 </div>
                
// //                 <div className="form-group">
// //                   <label>Time *</label>
// //                   <input
// //                     type="time"
// //                     value={reminderTime}
// //                     onChange={(e) => setReminderTime(e.target.value)}
// //                     className="form-input"
// //                   />
// //                 </div>
// //               </div>
              
// //               <div className="form-group">
// //                 <label>Repeat</label>
// //                 <select
// //                   value={repeatOption}
// //                   onChange={(e) => setRepeatOption(e.target.value)}
// //                   className="form-input"
// //                 >
// //                   <option value="once">Once</option>
// //                   <option value="daily">Daily</option>
// //                   <option value="weekly">Weekly</option>
// //                   <option value="monthly">Monthly</option>
// //                 </select>
// //               </div>
              
// //               <div className="form-actions">
// //                 <button 
// //                   className="submit-btn"
// //                   onClick={saveReminder}
// //                   disabled={!reminderText.trim() || !reminderTime}
// //                 >
// //                   {isEditing ? 'Update' : 'Add'}
// //                 </button>
// //                 <button 
// //                   className="cancel-btn"
// //                   onClick={resetForm}
// //                 >
// //                   Reset
// //                 </button>
// //                 <button 
// //                   className="test-btn"
// //                   onClick={testReminder}
// //                 >
// //                   Test
// //                 </button>
// //               </div>
// //             </div>
// //           </div>

// //           <div className="reminders-list-section">
// //             <div className="section-header">
// //               <h3>Reminders ({reminders.length})</h3>
// //               <div className="list-actions">
// //                 <button 
// //                   className="speak-reminders-btn"
// //                   onClick={listReminders}
// //                 >
// //                   🔊 Speak
// //                 </button>
// //               </div>
// //             </div>
            
// //             {reminders.length === 0 ? (
// //               <div className="empty-state">
// //                 <div className="empty-icon">⏰</div>
// //                 <h4>No reminders</h4>
// //                 <p>Use voice or form to add</p>
// //               </div>
// //             ) : (
// //               <div className="reminders-grid">
// //                 {reminders.map((reminder, index) => (
// //                   <div 
// //                     key={reminder.id} 
// //                     className={`reminder-card ${reminder.active ? 'active' : 'inactive'}`}
// //                   >
// //                     <div className="reminder-header">
// //                       <div className="reminder-number">#{index + 1}</div>
// //                       <div className="reminder-status">
// //                         {reminder.active ? '⏰' : '✓'}
// //                       </div>
// //                     </div>
                    
// //                     <div className="reminder-content">
// //                       <div className="reminder-text">{reminder.text}</div>
// //                       <div className="reminder-details">
// //                         <div className="reminder-time">
// //                           <span className="date">{formatDisplayDate(reminder.date)}</span>
// //                           <span className="time">{reminder.displayTime}</span>
// //                         </div>
// //                       </div>
// //                     </div>
                    
// //                     <div className="reminder-actions">
// //                       <button 
// //                         className="edit-btn"
// //                         onClick={() => {
// //                           setReminderText(reminder.text);
// //                           setReminderDate(reminder.date);
// //                           setReminderTime(reminder.timeStr);
// //                           setRepeatOption(reminder.repeat);
// //                           setIsEditing(true);
// //                           setEditingId(reminder.id);
// //                         }}
// //                       >
// //                         Edit
// //                       </button>
// //                       <button 
// //                         className="delete-btn"
// //                         onClick={() => deleteReminder(reminder.id)}
// //                       >
// //                         Delete
// //                       </button>
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default RemindersPage;



// import React, { useState, useEffect, useRef, useCallback } from 'react';
// import { useVoiceCommands } from '../../components/VoiceAssistant/useVoiceCommands';
// import './Reminders.css';

// const RemindersPage = () => {
//   const [reminders, setReminders] = useState(() => {
//     // Load from localStorage on initial state
//     try {
//       const saved = localStorage.getItem('voice-reminders');
//       return saved ? JSON.parse(saved) : [];
//     } catch (e) {
//       return [];
//     }
//   });
  
//   const [status, setStatus] = useState('Voice reminders ready');
//   const [showCommands, setShowCommands] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editingId, setEditingId] = useState(null);
  
//   const [reminderText, setReminderText] = useState('');
//   const [reminderTime, setReminderTime] = useState('');
//   const [reminderDate, setReminderDate] = useState('');
//   const [repeatOption, setRepeatOption] = useState('once');
  
//   const { 
//     startListening: voiceStartListening, 
//     stopListening: voiceStopListening, 
//     speak, 
//     registerCommands,
//     isListening,
//     setOnResult
//   } = useVoiceCommands();

//   const timeoutRef = useRef(new Map());
//   const remindersRef = useRef(reminders);
//   const isInitializedRef = useRef(false);
//   const isSpeakingRef = useRef(false);
//   const wasListeningRef = useRef(false);

//   // Update ref when reminders change
//   useEffect(() => {
//     remindersRef.current = reminders;
//   }, [reminders]);

//   // Save to localStorage when reminders change
//   useEffect(() => {
//     if (isInitializedRef.current) {
//       try {
//         localStorage.setItem('voice-reminders', JSON.stringify(reminders));
//       } catch (e) {
//         console.error('Failed to save to localStorage:', e);
//       }
//     }
//   }, [reminders]);

//   // Initialize
//   useEffect(() => {
//     const initializeApp = async () => {
//       // Setup voice commands
//       const commands = {
//         'remind me to (.*)': (transcript) => {
//           const match = transcript.match(/remind me to (.+)/i);
//           if (match) handleCompleteReminder(match[1]);
//         },
//         'set reminder (.*)': (transcript) => {
//           const match = transcript.match(/set reminder (.+)/i);
//           if (match) handleCompleteReminder(match[1]);
//         },
//         'add reminder (.*)': (transcript) => {
//           const match = transcript.match(/add reminder (.+)/i);
//           if (match) handleCompleteReminder(match[1]);
//         },
//         'reminder text is (.*)': (transcript) => {
//           const match = transcript.match(/reminder text is (.+)/i);
//           if (match) setReminderText(match[1]);
//         },
//         'text is (.*)': (transcript) => {
//           const match = transcript.match(/text is (.+)/i);
//           if (match) setReminderText(match[1]);
//         },
//         'time is (.*)': (transcript) => {
//           const match = transcript.match(/time is (.+)/i);
//           if (match) setTimeFromVoice(match[1]);
//         },
//         'at (.*)': (transcript) => {
//           const match = transcript.match(/at (.+)/i);
//           if (match) setTimeFromVoice(match[1]);
//         },
//         'date is (.*)': (transcript) => {
//           const match = transcript.match(/date is (.+)/i);
//           if (match) setDateFromVoice(match[1]);
//         },
//         'on (.*)': (transcript) => {
//           const match = transcript.match(/on (.+)/i);
//           if (match) setDateFromVoice(match[1]);
//         },
//         'repeat daily': () => setRepeatOption('daily'),
//         'repeat weekly': () => setRepeatOption('weekly'),
//         'repeat monthly': () => setRepeatOption('monthly'),
//         'repeat once': () => setRepeatOption('once'),
//         'save reminder': () => saveReminder(),
//         'show reminders': () => listReminders(),
//         'list reminders': () => listReminders(),
//         'my reminders': () => listReminders(),
//         'delete reminder (.*)': (transcript) => {
//           const match = transcript.match(/delete reminder (.+)/i);
//           if (match) handleDeleteCommand(match[1]);
//         },
//         'remove reminder (.*)': (transcript) => {
//           const match = transcript.match(/remove reminder (.+)/i);
//           if (match) handleDeleteCommand(match[1]);
//         },
//         'clear all reminders': () => clearAllReminders(),
//         'delete all reminders': () => clearAllReminders(),
//         'edit reminder (.*)': (transcript) => {
//           const match = transcript.match(/edit reminder (.+)/i);
//           if (match) handleEditCommand(match[1]);
//         },
//         'go back': () => window.location.href = '/dashboard',
//         'go to dashboard': () => window.location.href = '/dashboard',
//         'dashboard': () => window.location.href = '/dashboard',
//         'help': () => {
//           setShowCommands(true);
//           safeSpeak('Available commands: set reminder, show reminders, delete reminder');
//         },
//         'stop': () => {
//           safeStopListening();
//           safeSpeak('Voice control stopped');
//         },
//         'start': () => {
//           safeStartListening();
//           safeSpeak('Voice control started');
//         },
//         'what can i say': () => {
//           setShowCommands(true);
//           safeSpeak('You can say: set reminder, show reminders, delete reminder, help');
//         }
//       };

//       registerCommands(commands);
      
//       // Set voice result handler
//       setOnResult((transcript) => {
//         handleVoiceInput(transcript.toLowerCase());
//       });

//       // Mark as initialized
//       isInitializedRef.current = true;

//       // Schedule existing reminders
//       setTimeout(() => {
//         rescheduleAllReminders();
//       }, 100);

//       // Start listening after delay
//       setTimeout(() => {
//         safeStartListening();
//         setTimeout(() => {
//           safeSpeak('Voice reminders loaded. Say help for commands.');
//         }, 500);
//       }, 1500);

//       // Setup interval for checking due reminders
//       const intervalId = setInterval(() => {
//         checkDueReminders();
//       }, 30000);
      
//       return () => {
//         clearInterval(intervalId);
//       };
//     };

//     initializeApp();

//     return () => {
//       // Clean up timeouts
//       timeoutRef.current.forEach(timeout => clearTimeout(timeout));
//       timeoutRef.current.clear();
//       safeStopListening();
//       window.speechSynthesis.cancel();
//     };
//   }, []);

//   // Safe speech synthesis
//   const safeSpeak = useCallback((text) => {
//     if (!('speechSynthesis' in window) || !text) return;
    
//     wasListeningRef.current = isListening;
//     if (isListening) {
//       safeStopListening();
//     }
    
//     isSpeakingRef.current = true;
//     window.speechSynthesis.cancel();
    
//     const utterance = new SpeechSynthesisUtterance(text);
//     utterance.rate = 1.0;
//     utterance.pitch = 1.0;
//     utterance.volume = 1.0;
    
//     utterance.onend = () => {
//       isSpeakingRef.current = false;
//       if (wasListeningRef.current) {
//         setTimeout(() => {
//           safeStartListening();
//         }, 300);
//       }
//     };
    
//     utterance.onerror = () => {
//       isSpeakingRef.current = false;
//       if (wasListeningRef.current) {
//         setTimeout(() => {
//           safeStartListening();
//         }, 300);
//       }
//     };
    
//     window.speechSynthesis.speak(utterance);
//   }, [isListening]);

//   // Safe start/stop listening
//   const safeStartListening = useCallback(() => {
//     try {
//       voiceStartListening();
//     } catch (err) {
//       setTimeout(() => {
//         try {
//           voiceStartListening();
//         } catch (e) {
//           console.log('Start failed:', e);
//         }
//       }, 500);
//     }
//   }, [voiceStartListening]);

//   const safeStopListening = useCallback(() => {
//     try {
//       voiceStopListening();
//     } catch (err) {
//       // Ignore
//     }
//   }, [voiceStopListening]);

//   // Reschedule all reminders
//   const rescheduleAllReminders = useCallback(() => {
//     timeoutRef.current.forEach(timeout => clearTimeout(timeout));
//     timeoutRef.current.clear();
    
//     const currentReminders = remindersRef.current;
    
//     currentReminders.forEach(reminder => {
//       if (reminder.active) {
//         scheduleReminderTimeout(reminder);
//       }
//     });
//   }, []);

//   // Schedule reminder
//   const scheduleReminderTimeout = useCallback((reminder) => {
//     const reminderTime = new Date(reminder.time);
//     const now = new Date();
//     const delay = reminderTime.getTime() - now.getTime();
    
//     if (delay > 0 && delay < 30 * 24 * 60 * 60 * 1000) {
//       if (timeoutRef.current.has(reminder.id)) {
//         clearTimeout(timeoutRef.current.get(reminder.id));
//       }
      
//       const timeoutId = setTimeout(() => {
//         triggerReminder(reminder.id);
//       }, delay);
      
//       timeoutRef.current.set(reminder.id, timeoutId);
//     } else if (delay <= 0 && delay > -5 * 60 * 1000) {
//       triggerReminder(reminder.id);
//     }
//   }, []);

//   // Check due reminders
//   const checkDueReminders = useCallback(() => {
//     const now = new Date();
//     const currentReminders = remindersRef.current;
    
//     currentReminders.forEach(reminder => {
//       if (reminder.active) {
//         const reminderTime = new Date(reminder.time);
//         const diff = reminderTime.getTime() - now.getTime();
        
//         if (diff > 0 && diff <= 60000) {
//           triggerReminder(reminder.id);
//         }
//       }
//     });
//   }, []);

//   // Trigger reminder
//   const triggerReminder = useCallback((reminderId) => {
//     if (timeoutRef.current.has(reminderId)) {
//       clearTimeout(timeoutRef.current.get(reminderId));
//       timeoutRef.current.delete(reminderId);
//     }
    
//     const reminder = remindersRef.current.find(r => r.id === reminderId);
//     if (!reminder || !reminder.active) return;
    
//     safeSpeak(`Reminder: ${reminder.text}`);
//     setStatus(`🔔 ${reminder.text}`);
    
//     if (reminder.repeat === 'once') {
//       setReminders(prev => prev.map(r => 
//         r.id === reminderId ? { ...r, active: false } : r
//       ));
//     } else {
//       handleRepeatReminder(reminder);
//     }
//   }, [safeSpeak]);

//   // Handle repeat
//   const handleRepeatReminder = useCallback((reminder) => {
//     const nextTime = new Date(reminder.time);
    
//     switch (reminder.repeat) {
//       case 'daily':
//         nextTime.setDate(nextTime.getDate() + 1);
//         break;
//       case 'weekly':
//         nextTime.setDate(nextTime.getDate() + 7);
//         break;
//       case 'monthly':
//         nextTime.setMonth(nextTime.getMonth() + 1);
//         break;
//       default:
//         return;
//     }
    
//     const updatedReminder = {
//       ...reminder,
//       time: nextTime.toISOString(),
//       date: nextTime.toISOString().split('T')[0],
//       timeStr: nextTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
//       displayTime: nextTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
//     };
    
//     setReminders(prev => prev.map(r => 
//       r.id === reminder.id ? updatedReminder : r
//     ));
    
//     scheduleReminderTimeout(updatedReminder);
//   }, [scheduleReminderTimeout]);

//   // Set time from voice
//   const setTimeFromVoice = useCallback((timeStr) => {
//     const time = parseTimeFromText(timeStr);
//     if (time) {
//       setReminderTime(time);
//       safeSpeak(`Time set to ${time}`);
//     } else {
//       safeSpeak(`Could not understand time: ${timeStr}`);
//     }
//   }, [safeSpeak]);

//   // Set date from voice
//   const setDateFromVoice = useCallback((dateStr) => {
//     const date = parseDateFromText(dateStr);
//     if (date) {
//       setReminderDate(date);
//       safeSpeak(`Date set to ${date}`);
//     } else {
//       safeSpeak(`Could not understand date: ${dateStr}`);
//     }
//   }, [safeSpeak]);

//   // Parse time
//   const parseTimeFromText = useCallback((text) => {
//     // Handle "3 pm" or "3:30 pm"
//     const match = text.match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)?/i);
//     if (match) {
//       let hours = parseInt(match[1]);
//       const minutes = match[2] ? parseInt(match[2]) : 0;
//       const period = match[3]?.toLowerCase();
      
//       if (period === 'pm' && hours < 12) hours += 12;
//       if (period === 'am' && hours === 12) hours = 0;
      
//       return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
//     }
    
//     // Handle "in X hours"
//     const relativeMatch = text.match(/in\s+(\d+)\s+(hour|minute)s?/i);
//     if (relativeMatch) {
//       const amount = parseInt(relativeMatch[1]);
//       const unit = relativeMatch[2];
//       const now = new Date();
      
//       if (unit === 'hour') now.setHours(now.getHours() + amount);
//       else if (unit === 'minute') now.setMinutes(now.getMinutes() + amount);
      
//       return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
//     }
    
//     return null;
//   }, []);

//   // Parse date
//   const parseDateFromText = useCallback((text) => {
//     const now = new Date();
    
//     if (text === 'today') return now.toISOString().split('T')[0];
//     if (text === 'tomorrow') {
//       const tomorrow = new Date(now);
//       tomorrow.setDate(tomorrow.getDate() + 1);
//       return tomorrow.toISOString().split('T')[0];
//     }
//     if (text.includes('next week')) {
//       const nextWeek = new Date(now);
//       nextWeek.setDate(nextWeek.getDate() + 7);
//       return nextWeek.toISOString().split('T')[0];
//     }
    
//     const date = new Date(text);
//     return !isNaN(date.getTime()) ? date.toISOString().split('T')[0] : null;
//   }, []);

//   // Handle complete reminder
//   const handleCompleteReminder = useCallback((textWithTime) => {
//     console.log('Processing:', textWithTime);
    
//     // Try to extract time and text
//     const patterns = [
//       /(.+?)\s+(?:at|on)\s+(.+)/i,
//       /(.+?)\s+(?:today|tomorrow)\s+(.+)/i,
//       /(.+)/i
//     ];
    
//     for (const pattern of patterns) {
//       const match = textWithTime.match(pattern);
//       if (match) {
//         const text = match[1].trim();
//         const timeDateStr = match[2] || 'in 1 hour';
        
//         const dateTime = parseCompleteDateTime(timeDateStr);
        
//         if (text && dateTime) {
//           createReminder(text, dateTime);
//           return;
//         }
//       }
//     }
    
//     safeSpeak('Please specify the reminder text and time');
//   }, [safeSpeak]);

//   // Parse complete date-time
//   const parseCompleteDateTime = useCallback((text) => {
//     const now = new Date();
//     const result = new Date(now);
    
//     // Handle relative times
//     const relativeMatch = text.match(/in\s+(\d+)\s+(hour|minute|day)s?/i);
//     if (relativeMatch) {
//       const amount = parseInt(relativeMatch[1]);
//       const unit = relativeMatch[2].toLowerCase();
      
//       if (unit === 'hour') result.setHours(result.getHours() + amount);
//       else if (unit === 'minute') result.setMinutes(result.getMinutes() + amount);
//       else if (unit === 'day') result.setDate(result.getDate() + amount);
      
//       return result;
//     }
    
//     // Parse time
//     const timeMatch = text.match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)?/i);
//     if (timeMatch) {
//       let hours = parseInt(timeMatch[1]);
//       const minutes = timeMatch[2] ? parseInt(timeMatch[2]) : 0;
//       const period = timeMatch[3]?.toLowerCase();
      
//       if (period === 'pm' && hours < 12) hours += 12;
//       if (period === 'am' && hours === 12) hours = 0;
      
//       result.setHours(hours, minutes, 0, 0);
//     } else {
//       result.setHours(result.getHours() + 1);
//     }
    
//     // Handle date keywords
//     if (text.includes('tomorrow')) {
//       result.setDate(result.getDate() + 1);
//     } else if (text.includes('next week')) {
//       result.setDate(result.getDate() + 7);
//     }
    
//     if (result < now) {
//       result.setDate(result.getDate() + 1);
//     }
    
//     return result;
//   }, []);

//   // Create reminder
//   const createReminder = useCallback((text, dateTime) => {
//     const newReminder = {
//       id: Date.now(),
//       text: text,
//       time: dateTime.toISOString(),
//       date: dateTime.toISOString().split('T')[0],
//       timeStr: dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
//       displayTime: dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//       repeat: 'once',
//       active: true,
//       createdAt: new Date().toISOString()
//     };
    
//     setReminders(prev => [...prev, newReminder]);
//     scheduleReminderTimeout(newReminder);
    
//     const dateStr = formatDisplayDate(newReminder.date);
//     safeSpeak(`Reminder set for ${dateStr} at ${newReminder.displayTime}`);
//     setStatus(`Added: ${text}`);
//   }, [scheduleReminderTimeout, safeSpeak]);

//   // Handle voice input
//   const handleVoiceInput = useCallback((transcript) => {
//     if (transcript.includes('remind me to') || 
//         transcript.includes('set reminder') || 
//         transcript.includes('add reminder')) {
//       handleCompleteReminder(transcript);
//     }
//   }, [handleCompleteReminder]);

//   // Save reminder
//   const saveReminder = useCallback(() => {
//     if (!reminderText.trim()) {
//       safeSpeak('Reminder text is required');
//       return;
//     }
    
//     let dateTime;
    
//     if (reminderDate && reminderTime) {
//       const [year, month, day] = reminderDate.split('-').map(Number);
//       const [hours, minutes] = reminderTime.split(':').map(Number);
//       dateTime = new Date(year, month - 1, day, hours, minutes, 0);
//     } else if (reminderTime) {
//       dateTime = new Date();
//       const [hours, minutes] = reminderTime.split(':').map(Number);
//       dateTime.setHours(hours, minutes, 0, 0);
      
//       if (dateTime < new Date()) {
//         dateTime.setDate(dateTime.getDate() + 1);
//       }
//     } else {
//       dateTime = new Date();
//       dateTime.setHours(dateTime.getHours() + 1);
//     }
    
//     if (isEditing && editingId) {
//       const updatedReminder = {
//         id: editingId,
//         text: reminderText,
//         time: dateTime.toISOString(),
//         date: dateTime.toISOString().split('T')[0],
//         timeStr: dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
//         displayTime: dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//         repeat: repeatOption,
//         active: true
//       };
      
//       setReminders(prev => prev.map(r => 
//         r.id === editingId ? updatedReminder : r
//       ));
      
//       scheduleReminderTimeout(updatedReminder);
//       safeSpeak('Reminder updated');
//       setIsEditing(false);
//       setEditingId(null);
//     } else {
//       createReminder(reminderText, dateTime);
//     }
    
//     setReminderText('');
//     setReminderTime('');
//     setReminderDate('');
//     setRepeatOption('once');
//   }, [reminderText, reminderTime, reminderDate, repeatOption, isEditing, editingId, scheduleReminderTimeout, safeSpeak, createReminder]);

//   // List reminders
//   const listReminders = useCallback(() => {
//     if (reminders.length === 0) {
//       safeSpeak('You have no reminders');
//       return;
//     }
    
//     safeSpeak(`You have ${reminders.length} reminder${reminders.length === 1 ? '' : 's'}`);
    
//     reminders.forEach((reminder, index) => {
//       setTimeout(() => {
//         const dateStr = formatDisplayDate(reminder.date);
//         safeSpeak(`Reminder ${index + 1}: ${reminder.text} on ${dateStr} at ${reminder.displayTime}`);
//       }, (index + 1) * 2000);
//     });
//   }, [reminders, safeSpeak]);

//   // Handle delete command
//   const handleDeleteCommand = useCallback((input) => {
//     const numMatch = input.match(/(\d+)/);
//     const wordMatch = input.match(/\b(one|two|three|four|five|six|seven|eight|nine|ten)\b/i);
    
//     let index = -1;
    
//     if (numMatch) {
//       index = parseInt(numMatch[1]) - 1;
//     } else if (wordMatch) {
//       const numberWords = {
//         'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5,
//         'six': 6, 'seven': 7, 'eight': 8, 'nine': 9, 'ten': 10
//       };
//       index = numberWords[wordMatch[0].toLowerCase()] - 1;
//     } else if (input === 'all' || input === 'everything') {
//       clearAllReminders();
//       return;
//     }
    
//     if (index >= 0 && index < reminders.length) {
//       deleteReminder(reminders[index].id);
//     } else {
//       safeSpeak(`Reminder not found. You have ${reminders.length} reminders.`);
//     }
//   }, [reminders]);

//   // Delete reminder
//   const deleteReminder = useCallback((id) => {
//     if (timeoutRef.current.has(id)) {
//       clearTimeout(timeoutRef.current.get(id));
//       timeoutRef.current.delete(id);
//     }
    
//     setReminders(prev => prev.filter(r => r.id !== id));
//     safeSpeak('Reminder deleted');
//   }, [safeSpeak]);

//   // Handle edit command
//   const handleEditCommand = useCallback((input) => {
//     const numMatch = input.match(/(\d+)/);
//     const wordMatch = input.match(/\b(one|two|three)\b/i);
    
//     let index = -1;
    
//     if (numMatch) {
//       index = parseInt(numMatch[1]) - 1;
//     } else if (wordMatch) {
//       const numberWords = { 'one': 1, 'two': 2, 'three': 3 };
//       index = numberWords[wordMatch[0].toLowerCase()] - 1;
//     }
    
//     if (index >= 0 && index < reminders.length) {
//       const reminder = reminders[index];
//       setReminderText(reminder.text);
//       setReminderDate(reminder.date);
//       setReminderTime(reminder.timeStr);
//       setRepeatOption(reminder.repeat || 'once');
//       setIsEditing(true);
//       setEditingId(reminder.id);
//       safeSpeak(`Editing reminder ${index + 1}`);
//     }
//   }, [reminders, safeSpeak]);

//   // Clear all reminders
//   const clearAllReminders = useCallback(() => {
//     if (reminders.length === 0) {
//       safeSpeak('No reminders to clear');
//       return;
//     }
    
//     timeoutRef.current.forEach(timeout => clearTimeout(timeout));
//     timeoutRef.current.clear();
//     setReminders([]);
//     safeSpeak('All reminders cleared');
//   }, [reminders, safeSpeak]);

//   // Format date
//   const formatDisplayDate = useCallback((dateStr) => {
//     const date = new Date(dateStr);
//     const today = new Date();
//     const tomorrow = new Date();
//     tomorrow.setDate(tomorrow.getDate() + 1);
    
//     if (date.toDateString() === today.toDateString()) return 'Today';
//     if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
//     return date.toLocaleDateString();
//   }, []);

//   // Reset form
//   const resetForm = useCallback(() => {
//     setReminderText('');
//     setReminderTime('');
//     setReminderDate('');
//     setRepeatOption('once');
//     setIsEditing(false);
//     setEditingId(null);
//   }, []);

//   // Toggle reminder
//   const toggleReminder = useCallback((id) => {
//     setReminders(prev => prev.map(reminder => {
//       if (reminder.id === id) {
//         const updated = { ...reminder, active: !reminder.active };
//         if (updated.active) {
//           scheduleReminderTimeout(updated);
//         } else {
//           if (timeoutRef.current.has(id)) {
//             clearTimeout(timeoutRef.current.get(id));
//             timeoutRef.current.delete(id);
//           }
//         }
//         return updated;
//       }
//       return reminder;
//     }));
//   }, [scheduleReminderTimeout]);

//   // Test reminder
//   const testReminder = useCallback(() => {
//     const now = new Date();
//     now.setMinutes(now.getMinutes() + 1);
    
//     const testReminder = {
//       id: Date.now(),
//       text: 'Test reminder - system is working',
//       time: now.toISOString(),
//       date: now.toISOString().split('T')[0],
//       timeStr: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
//       displayTime: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//       repeat: 'once',
//       active: true,
//       createdAt: new Date().toISOString()
//     };
    
//     setReminders(prev => [...prev, testReminder]);
//     scheduleReminderTimeout(testReminder);
//     safeSpeak('Test reminder added for 1 minute');
//   }, [scheduleReminderTimeout, safeSpeak]);

//   return (
//     <div className="reminders-page">
//       <header className="fixed-header">
//         <div className="header-content">
//           <div className="header-left">
//             <button 
//               className="back-btn"
//               onClick={() => window.location.href = '/dashboard'}
//             >
//               ← Back
//             </button>
//             <h1 className="logo">VISIONA</h1>
//           </div>
          
//           <div className="header-title">
//             <h2>Voice Reminders</h2>
//             <p className="subtitle">Reminders saved in your browser</p>
//           </div>
          
//           <div className="user-menu">
//             <button 
//               className={`voice-btn ${isListening ? 'listening' : ''}`}
//               onClick={() => isListening ? safeStopListening() : safeStartListening()}
//             >
//               🎤 {isListening ? 'Listening...' : 'Voice'}
//             </button>
//           </div>
//         </div>
//       </header>

//       <div className="reminders-content">
//         <div className="reminders-container">
//           <div className="status-message">
//             <div className="status-text">
//               {isListening ? '🎤 Listening...' : status}
//             </div>
//           </div>

//           <div className="voice-control-section">
//             <div className="voice-status-indicator">
//               <div className={`listening-dot ${isListening ? 'active' : ''}`}></div>
//               <span className="status-text">
//                 {isListening ? '● Listening...' : 'Ready'}
//               </span>
//               <button 
//                 className="voice-help-btn"
//                 onClick={() => setShowCommands(!showCommands)}
//               >
//                 {showCommands ? 'Hide' : 'Help'}
//               </button>
//             </div>
            
//             {showCommands && (
//               <div className="voice-commands-panel">
//                 <h3>Voice Commands</h3>
//                 <div className="commands-grid">
//                   <div className="command-category">
//                     <h4>Add</h4>
//                     <ul>
//                       <li>"Remind me to call mom at 3 pm"</li>
//                       <li>"Set reminder meeting tomorrow 11 am"</li>
//                       <li>"Add reminder take medicine"</li>
//                     </ul>
//                   </div>
//                   <div className="command-category">
//                     <h4>Manage</h4>
//                     <ul>
//                       <li>"Show reminders"</li>
//                       <li>"Delete reminder one"</li>
//                       <li>"Clear all reminders"</li>
//                     </ul>
//                   </div>
//                 </div>
//                 <div className="voice-tips">
//                   <p><strong>All data saved in browser</strong></p>
//                 </div>
//               </div>
//             )}
//           </div>

//           <div className="reminder-form-section">
//             <div className="section-header">
//               <h3>{isEditing ? 'Edit Reminder' : 'Add Reminder'}</h3>
//               {isEditing && (
//                 <button className="cancel-edit-btn" onClick={resetForm}>
//                   Cancel
//                 </button>
//               )}
//             </div>
            
//             <div className="reminder-form">
//               <div className="form-group">
//                 <label>Reminder Text *</label>
//                 <input
//                   type="text"
//                   value={reminderText}
//                   onChange={(e) => setReminderText(e.target.value)}
//                   placeholder="What to remember?"
//                   className="form-input"
//                 />
//               </div>
              
//               <div className="form-row">
//                 <div className="form-group">
//                   <label>Date</label>
//                   <input
//                     type="date"
//                     value={reminderDate}
//                     onChange={(e) => setReminderDate(e.target.value)}
//                     className="form-input"
//                   />
//                 </div>
                
//                 <div className="form-group">
//                   <label>Time *</label>
//                   <input
//                     type="time"
//                     value={reminderTime}
//                     onChange={(e) => setReminderTime(e.target.value)}
//                     className="form-input"
//                   />
//                 </div>
//               </div>
              
//               <div className="form-group">
//                 <label>Repeat</label>
//                 <select
//                   value={repeatOption}
//                   onChange={(e) => setRepeatOption(e.target.value)}
//                   className="form-input"
//                 >
//                   <option value="once">Once</option>
//                   <option value="daily">Daily</option>
//                   <option value="weekly">Weekly</option>
//                   <option value="monthly">Monthly</option>
//                 </select>
//               </div>
              
//               <div className="form-actions">
//                 <button 
//                   className="submit-btn"
//                   onClick={saveReminder}
//                   disabled={!reminderText.trim() || !reminderTime}
//                 >
//                   {isEditing ? 'Update' : 'Add Reminder'}
//                 </button>
//                 <button 
//                   className="cancel-btn"
//                   onClick={resetForm}
//                 >
//                   Reset
//                 </button>
//                 <button 
//                   className="test-btn"
//                   onClick={testReminder}
//                 >
//                   Test
//                 </button>
//               </div>
//             </div>
//           </div>

//           <div className="reminders-list-section">
//             <div className="section-header">
//               <h3>Your Reminders ({reminders.length})</h3>
//               <div className="list-actions">
//                 <button 
//                   className="speak-reminders-btn"
//                   onClick={listReminders}
//                 >
//                   🔊 Speak All
//                 </button>
//               </div>
//             </div>
            
//             {reminders.length === 0 ? (
//               <div className="empty-state">
//                 <div className="empty-icon">⏰</div>
//                 <h4>No reminders yet</h4>
//                 <p>Add reminders using voice or form above</p>
//                 <p className="empty-hint">Reminders are saved in your browser</p>
//               </div>
//             ) : (
//               <>
//                 <div className="reminders-grid">
//                   {reminders.map((reminder, index) => (
//                     <div 
//                       key={reminder.id} 
//                       className={`reminder-card ${reminder.active ? 'active' : 'inactive'}`}
//                     >
//                       <div className="reminder-header">
//                         <div className="reminder-number">#{index + 1}</div>
//                         <div className="reminder-status">
//                           {reminder.active ? '⏰ Active' : '✓ Done'}
//                         </div>
//                       </div>
                      
//                       <div className="reminder-content">
//                         <div className="reminder-text">{reminder.text}</div>
//                         <div className="reminder-details">
//                           <div className="reminder-time">
//                             <span className="date">{formatDisplayDate(reminder.date)}</span>
//                             <span className="time">{reminder.displayTime}</span>
//                           </div>
//                           <div className="reminder-repeat">
//                             {reminder.repeat}
//                           </div>
//                         </div>
//                       </div>
                      
//                       <div className="reminder-actions">
//                         <button 
//                           className="edit-btn"
//                           onClick={() => {
//                             setReminderText(reminder.text);
//                             setReminderDate(reminder.date);
//                             setReminderTime(reminder.timeStr);
//                             setRepeatOption(reminder.repeat);
//                             setIsEditing(true);
//                             setEditingId(reminder.id);
//                           }}
//                         >
//                           Edit
//                         </button>
//                         <button 
//                           className="delete-btn"
//                           onClick={() => deleteReminder(reminder.id)}
//                         >
//                           Delete
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
                
//                 <div className="bulk-actions">
//                   <button 
//                     className="clear-all-btn"
//                     onClick={clearAllReminders}
//                   >
//                     🗑️ Clear All Reminders
//                   </button>
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RemindersPage;




import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useVoiceCommands } from '../../hooks/useVoiceCommands';
import './Reminders.css';

const RemindersPage = () => {
  const [reminders, setReminders] = useState(() => {
    // Load from localStorage on initial state - persists after logout
    try {
      const saved = localStorage.getItem('visiona-voice-reminders');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Validate and clean data
        return Array.isArray(parsed) ? parsed.filter(r => r && r.text) : [];
      }
    } catch (e) {
      console.error('Failed to load reminders:', e);
    }
    return [];
  });
  
  const [status, setStatus] = useState('Voice reminders ready');
  const [showCommands, setShowCommands] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [reminderText, setReminderText] = useState('');
  const [reminderTime, setReminderTime] = useState('');
  const [reminderDate, setReminderDate] = useState('');
  const [repeatOption, setRepeatOption] = useState('once');
  
  const { 
    startListening: voiceStartListening, 
    stopListening: voiceStopListening, 
    speak, 
    registerCommands,
    isListening,
    setOnResult
  } = useVoiceCommands();

  const timeoutRef = useRef(new Map());
  const remindersRef = useRef(reminders);
  const isMountedRef = useRef(true);
  const isSpeakingRef = useRef(false);
  const wasListeningRef = useRef(false);
  const STORAGE_KEY = 'visiona-voice-reminders';

  // Update ref when reminders change
  useEffect(() => {
    remindersRef.current = reminders;
  }, [reminders]);

  // PERSISTENT SAVE to localStorage - survives logout
  useEffect(() => {
    if (reminders.length === 0) {
      // Only save if we have data or clear storage if explicitly empty
      localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
      return;
    }
    
    try {
      // Clean reminders before saving
      const cleanReminders = reminders.map(reminder => ({
        id: reminder.id || Date.now(),
        text: reminder.text || 'Reminder',
        time: reminder.time || new Date().toISOString(),
        date: reminder.date || new Date().toISOString().split('T')[0],
        timeStr: reminder.timeStr || '12:00',
        displayTime: reminder.displayTime || '12:00 PM',
        repeat: reminder.repeat || 'once',
        active: reminder.active !== false,
        createdAt: reminder.createdAt || new Date().toISOString()
      }));
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cleanReminders));
    } catch (e) {
      console.error('Failed to save reminders:', e);
    }
  }, [reminders]);

  // Initialize
  useEffect(() => {
    isMountedRef.current = true;
    
    // Setup voice commands
    const commands = {
      'remind me to (.*)': (transcript) => {
        const match = transcript.match(/remind me to (.+)/i);
        if (match) handleCompleteReminder(match[1]);
      },
      'set reminder (.*)': (transcript) => {
        const match = transcript.match(/set reminder (.+)/i);
        if (match) handleCompleteReminder(match[1]);
      },
      'add reminder (.*)': (transcript) => {
        const match = transcript.match(/add reminder (.+)/i);
        if (match) handleCompleteReminder(match[1]);
      },
      'reminder text is (.*)': (transcript) => {
        const match = transcript.match(/reminder text is (.+)/i);
        if (match) setReminderText(match[1]);
      },
      'text is (.*)': (transcript) => {
        const match = transcript.match(/text is (.+)/i);
        if (match) setReminderText(match[1]);
      },
      'time is (.*)': (transcript) => {
        const match = transcript.match(/time is (.+)/i);
        if (match) setTimeFromVoice(match[1]);
      },
      'at (.*)': (transcript) => {
        const match = transcript.match(/at (.+)/i);
        if (match) setTimeFromVoice(match[1]);
      },
      'date is (.*)': (transcript) => {
        const match = transcript.match(/date is (.+)/i);
        if (match) setDateFromVoice(match[1]);
      },
      'on (.*)': (transcript) => {
        const match = transcript.match(/on (.+)/i);
        if (match) setDateFromVoice(match[1]);
      },
      'repeat daily': () => setRepeatOption('daily'),
      'repeat weekly': () => setRepeatOption('weekly'),
      'repeat monthly': () => setRepeatOption('monthly'),
      'repeat once': () => setRepeatOption('once'),
      'save reminder': () => saveReminder(),
      'show reminders': () => listReminders(),
      'list reminders': () => listReminders(),
      'my reminders': () => listReminders(),
      'delete reminder (.*)': (transcript) => {
        const match = transcript.match(/delete reminder (.+)/i);
        if (match) handleDeleteCommand(match[1]);
      },
      'remove reminder (.*)': (transcript) => {
        const match = transcript.match(/remove reminder (.+)/i);
        if (match) handleDeleteCommand(match[1]);
      },
      'clear all reminders': () => clearAllReminders(),
      'delete all reminders': () => clearAllReminders(),
      'edit reminder (.*)': (transcript) => {
        const match = transcript.match(/edit reminder (.+)/i);
        if (match) handleEditCommand(match[1]);
      },
      'go back': () => window.location.href = '/dashboard',
      'go to dashboard': () => window.location.href = '/dashboard',
      'dashboard': () => window.location.href = '/dashboard',
      'help': () => {
        setShowCommands(true);
        safeSpeak('Available commands: set reminder, show reminders, delete reminder');
      },
      'stop': () => {
        safeStopListening();
        safeSpeak('Voice control stopped');
      },
      'start': () => {
        safeStartListening();
        safeSpeak('Voice control started');
      },
      'how many reminders': () => {
  safeSpeak(`You have ${reminders.length} reminders`);
},

'next reminder': () => {
  const next = reminders.find(r => r.active);
  if (next) {
    safeSpeak(`Next reminder is ${next.text} at ${next.displayTime}`);
  } else {
    safeSpeak('No upcoming reminders');
  }
},

'are there any reminders today': () => {
  const today = new Date().toISOString().split('T')[0];
  const todayReminders = reminders.filter(r => r.date === today && r.active);
  safeSpeak(
    todayReminders.length
      ? `You have ${todayReminders.length} reminders today`
      : 'No reminders today'
  );
},

      'what can i say': () => {
        setShowCommands(true);
        safeSpeak('You can say: set reminder, show reminders, delete reminder, help');
      }
    };

    registerCommands(commands);
    
    // Set voice result handler
    setOnResult((transcript) => {
      if (isMountedRef.current && !isSpeakingRef.current) {
        handleVoiceInput(transcript.toLowerCase());
      }
    });

    // Schedule existing reminders from localStorage
    const scheduleTimer = setTimeout(() => {
      if (isMountedRef.current) {
        rescheduleAllReminders();
      }
    }, 500);

    // Start listening
    const startTimer = setTimeout(() => {
      if (isMountedRef.current) {
        safeStartListening();
        safeSpeak('Voice reminders loaded from browser storage');
      }
    }, 1000);

    // Setup interval for checking due reminders
    const intervalId = setInterval(() => {
      if (isMountedRef.current) {
        checkDueReminders();
      }
    }, 30000);
    
    return () => {
      isMountedRef.current = false;
      clearTimeout(scheduleTimer);
      clearTimeout(startTimer);
      clearInterval(intervalId);
      
      // Clean up timeouts
      timeoutRef.current.forEach(timeout => clearTimeout(timeout));
      timeoutRef.current.clear();
      
      safeStopListening();
      window.speechSynthesis.cancel();
    };
  }, []);

  // Safe speech synthesis
  const safeSpeak = useCallback((text) => {
    if (!('speechSynthesis' in window) || !text || !isMountedRef.current) return;
    
    wasListeningRef.current = isListening;
    if (isListening) {
      safeStopListening();
    }
    
    isSpeakingRef.current = true;
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;
    
    utterance.onend = () => {
      isSpeakingRef.current = false;
      if (wasListeningRef.current && isMountedRef.current) {
        setTimeout(() => {
          safeStartListening();
        }, 300);
      }
    };
    
    utterance.onerror = () => {
      isSpeakingRef.current = false;
      if (wasListeningRef.current && isMountedRef.current) {
        setTimeout(() => {
          safeStartListening();
        }, 600);
      }
    };
    
    window.speechSynthesis.speak(utterance);
  }, [isListening]);

  // Safe start/stop listening
  const safeStartListening = useCallback(() => {
    if (!isMountedRef.current) return;
    
    try {
      voiceStartListening();
    } catch (err) {
      setTimeout(() => {
        if (isMountedRef.current) {
          try {
            voiceStartListening();
          } catch (e) {
            console.log('Start failed:', e);
          }
        }
      }, 800);
    }
  }, [voiceStartListening]);

  const safeStopListening = useCallback(() => {
    try {
      voiceStopListening();
    } catch (err) {
      // Ignore
    }
  }, [voiceStopListening]);

  // Reschedule all reminders
  const rescheduleAllReminders = useCallback(() => {
    timeoutRef.current.forEach(timeout => clearTimeout(timeout));
    timeoutRef.current.clear();
    
    const currentReminders = remindersRef.current;
    
    currentReminders.forEach(reminder => {
      if (reminder.active) {
        scheduleReminderTimeout(reminder);
      }
    });
  }, []);

  // Schedule reminder
  const scheduleReminderTimeout = useCallback((reminder) => {
    if (!reminder || !reminder.time) return;
    
    try {
      const reminderTime = new Date(reminder.time);
      const now = new Date();
      const delay = reminderTime.getTime() - now.getTime();
      
      if (delay > 0 && delay < 30 * 24 * 60 * 60 * 1000) {
        if (timeoutRef.current.has(reminder.id)) {
          clearTimeout(timeoutRef.current.get(reminder.id));
        }
        
        const timeoutId = setTimeout(() => {
          if (isMountedRef.current) {
            triggerReminder(reminder.id);
          }
        }, delay);
        
        timeoutRef.current.set(reminder.id, timeoutId);
      } else if (delay <= 0 && delay > -5 * 60 * 1000) {
        triggerReminder(reminder.id);
      }
    } catch (e) {
      console.error('Failed to schedule reminder:', e);
    }
  }, []);

  // Check due reminders
  const checkDueReminders = useCallback(() => {
    const now = new Date();
    const currentReminders = remindersRef.current;
    
    currentReminders.forEach(reminder => {
      if (reminder && reminder.active) {
        try {
          const reminderTime = new Date(reminder.time);
          const diff = reminderTime.getTime() - now.getTime();
          
          if (diff > 0 && diff <= 60000) {
            triggerReminder(reminder.id);
          }
        } catch (e) {
          console.error('Failed to check reminder:', e);
        }
      }
    });
  }, []);

  // Trigger reminder
  const triggerReminder = useCallback((reminderId) => {
    if (timeoutRef.current.has(reminderId)) {
      clearTimeout(timeoutRef.current.get(reminderId));
      timeoutRef.current.delete(reminderId);
    }
    
    const reminder = remindersRef.current.find(r => r && r.id === reminderId);
    if (!reminder || !reminder.active || !isMountedRef.current) return;
    
    safeSpeak(`Reminder: ${reminder.text}`);
    setStatus(`🔔 ${reminder.text}`);
    
    if (reminder.repeat === 'once') {
      setReminders(prev => prev.map(r => 
        r.id === reminderId ? { ...r, active: false } : r
      ));
    } else {
      handleRepeatReminder(reminder);
    }
  }, [safeSpeak]);

  // Handle repeat
  const handleRepeatReminder = useCallback((reminder) => {
    if (!reminder || !reminder.time) return;
    
    const nextTime = new Date(reminder.time);
    
    switch (reminder.repeat) {
      case 'daily':
        nextTime.setDate(nextTime.getDate() + 1);
        break;
      case 'weekly':
        nextTime.setDate(nextTime.getDate() + 7);
        break;
      case 'monthly':
        nextTime.setMonth(nextTime.getMonth() + 1);
        break;
      default:
        return;
    }
    
    const updatedReminder = {
      ...reminder,
      time: nextTime.toISOString(),
      date: nextTime.toISOString().split('T')[0],
      timeStr: nextTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
      displayTime: nextTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setReminders(prev => prev.map(r => 
      r.id === reminder.id ? updatedReminder : r
    ));
    
    scheduleReminderTimeout(updatedReminder);
  }, [scheduleReminderTimeout]);

  // Set time from voice
  const setTimeFromVoice = useCallback((timeStr) => {
    const time = parseTimeFromText(timeStr);
    if (time) {
      setReminderTime(time);
      safeSpeak(`Time set to ${time}`);
    }
  }, [safeSpeak]);

  // Set date from voice
  const setDateFromVoice = useCallback((dateStr) => {
    const date = parseDateFromText(dateStr);
    if (date) {
      setReminderDate(date);
      safeSpeak(`Date set to ${formatDisplayDate(date)}`);
    }
  }, [safeSpeak]);

  // Parse time
  const parseTimeFromText = useCallback((text) => {
    const match = text.match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)?/i);
    if (match) {
      let hours = parseInt(match[1]);
      const minutes = match[2] ? parseInt(match[2]) : 0;
      const period = match[3]?.toLowerCase();
      
      if (period === 'pm' && hours < 12) hours += 12;
      if (period === 'am' && hours === 12) hours = 0;
      
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    }
    
    const relativeMatch = text.match(/in\s+(\d+)\s+(hour|minute)s?/i);
    if (relativeMatch) {
      const amount = parseInt(relativeMatch[1]);
      const unit = relativeMatch[2];
      const now = new Date();
      
      if (unit === 'hour') now.setHours(now.getHours() + amount);
      else if (unit === 'minute') now.setMinutes(now.getMinutes() + amount);
      
      return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    }
    
    return null;
  }, []);

  // Parse date
  const parseDateFromText = useCallback((text) => {
    const now = new Date();
    
    if (text === 'today') return now.toISOString().split('T')[0];
    if (text === 'tomorrow') {
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      return tomorrow.toISOString().split('T')[0];
    }
    if (text.includes('next week')) {
      const nextWeek = new Date(now);
      nextWeek.setDate(nextWeek.getDate() + 7);
      return nextWeek.toISOString().split('T')[0];
    }
    
    try {
      const date = new Date(text);
      return !isNaN(date.getTime()) ? date.toISOString().split('T')[0] : null;
    } catch (e) {
      return null;
    }
  }, []);

  // Handle complete reminder
  const handleCompleteReminder = useCallback((textWithTime) => {
    // Try patterns for parsing
    const patterns = [
      /(.+?)\s+(?:at|on)\s+(.+)/i,
      /(.+?)\s+(?:today|tomorrow)\s+(.+)/i,
      /(.+)/i
    ];
    
    for (const pattern of patterns) {
      const match = textWithTime.match(pattern);
      if (match) {
        const text = match[1].trim();
        const timeDateStr = match[2] || 'in 1 hour';
        
        const dateTime = parseCompleteDateTime(timeDateStr);
        
        if (text && dateTime) {
          createReminder(text, dateTime);
          return;
        }
      }
    }
    
    safeSpeak('Please specify the reminder text and time');
  }, [safeSpeak]);

  // Parse complete date-time
  const parseCompleteDateTime = useCallback((text) => {
    const now = new Date();
    const result = new Date(now);
    
    const relativeMatch = text.match(/in\s+(\d+)\s+(hour|minute|day)s?/i);
    if (relativeMatch) {
      const amount = parseInt(relativeMatch[1]);
      const unit = relativeMatch[2].toLowerCase();
      
      if (unit === 'hour') result.setHours(result.getHours() + amount);
      else if (unit === 'minute') result.setMinutes(result.getMinutes() + amount);
      else if (unit === 'day') result.setDate(result.getDate() + amount);
      
      return result;
    }
    
    const timeMatch = text.match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)?/i);
    if (timeMatch) {
      let hours = parseInt(timeMatch[1]);
      const minutes = timeMatch[2] ? parseInt(timeMatch[2]) : 0;
      const period = timeMatch[3]?.toLowerCase();
      
      if (period === 'pm' && hours < 12) hours += 12;
      if (period === 'am' && hours === 12) hours = 0;
      
      result.setHours(hours, minutes, 0, 0);
    } else {
      result.setHours(result.getHours() + 1);
    }
    
    if (text.includes('tomorrow')) {
      result.setDate(result.getDate() + 1);
    } else if (text.includes('next week')) {
      result.setDate(result.getDate() + 7);
    }
    
    if (result < now) {
      result.setDate(result.getDate() + 1);
    }
    
    return result;
  }, []);

  // Create reminder
  const createReminder = useCallback((text, dateTime) => {
    const newReminder = {
      id: Date.now(),
      text: text,
      time: dateTime.toISOString(),
      date: dateTime.toISOString().split('T')[0],
      timeStr: dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
      displayTime: dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      repeat: 'once',
      active: true,
      createdAt: new Date().toISOString()
    };
    
    setReminders(prev => [...prev, newReminder]);
    scheduleReminderTimeout(newReminder);
    
    const dateStr = formatDisplayDate(newReminder.date);
    safeSpeak(`Reminder set for ${dateStr} at ${newReminder.displayTime}`);
    setStatus(`Added: ${text}`);
  }, [scheduleReminderTimeout, safeSpeak]);

  // Handle voice input
  const handleVoiceInput = useCallback((transcript) => {
    if (transcript.includes('remind me to') || 
        transcript.includes('set reminder') || 
        transcript.includes('add reminder')) {
      handleCompleteReminder(transcript);
    }
  }, [handleCompleteReminder]);

  // Save reminder
  const saveReminder = useCallback(() => {
    if (!reminderText.trim()) {
      safeSpeak('Reminder text is required');
      return;
    }
    
    let dateTime;
    
    if (reminderDate && reminderTime) {
      const [year, month, day] = reminderDate.split('-').map(Number);
      const [hours, minutes] = reminderTime.split(':').map(Number);
      dateTime = new Date(year, month - 1, day, hours, minutes, 0);
    } else if (reminderTime) {
      dateTime = new Date();
      const [hours, minutes] = reminderTime.split(':').map(Number);
      dateTime.setHours(hours, minutes, 0, 0);
      
      if (dateTime < new Date()) {
        dateTime.setDate(dateTime.getDate() + 1);
      }
    } else {
      dateTime = new Date();
      dateTime.setHours(dateTime.getHours() + 1);
    }
    
    if (isEditing && editingId) {
      const updatedReminder = {
        id: editingId,
        text: reminderText,
        time: dateTime.toISOString(),
        date: dateTime.toISOString().split('T')[0],
        timeStr: dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
        displayTime: dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        repeat: repeatOption,
        active: true
      };
      
      setReminders(prev => prev.map(r => 
        r.id === editingId ? updatedReminder : r
      ));
      
      scheduleReminderTimeout(updatedReminder);
      safeSpeak('Reminder updated');
      setIsEditing(false);
      setEditingId(null);
    } else {
      createReminder(reminderText, dateTime);
    }
    
    setReminderText('');
    setReminderTime('');
    setReminderDate('');
    setRepeatOption('once');
  }, [reminderText, reminderTime, reminderDate, repeatOption, isEditing, editingId, scheduleReminderTimeout, safeSpeak, createReminder]);

  // List reminders
  const listReminders = useCallback(() => {
    if (reminders.length === 0) {
      safeSpeak('You have no reminders');
      return;
    }
    
    safeSpeak(`You have ${reminders.length} reminder${reminders.length === 1 ? '' : 's'}`);
    
    reminders.forEach((reminder, index) => {
      setTimeout(() => {
        if (isMountedRef.current && reminder) {
          const dateStr = formatDisplayDate(reminder.date);
          safeSpeak(`Reminder ${index + 1}: ${reminder.text} on ${dateStr} at ${reminder.displayTime}`);
        }
      }, (index + 1) * 2000);
    });
  }, [reminders, safeSpeak]);

  // Handle delete command
  const handleDeleteCommand = useCallback((input) => {
    const numMatch = input.match(/(\d+)/);
    const wordMatch = input.match(/\b(one|two|three|four|five|six|seven|eight|nine|ten)\b/i);
    
    let index = -1;
    
    if (numMatch) {
      index = parseInt(numMatch[1]) - 1;
    } else if (wordMatch) {
      const numberWords = {
        'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5,
        'six': 6, 'seven': 7, 'eight': 8, 'nine': 9, 'ten': 10
      };
      index = numberWords[wordMatch[0].toLowerCase()] - 1;
    } else if (input === 'all' || input === 'everything') {
      clearAllReminders();
      return;
    }
    
    if (index >= 0 && index < reminders.length) {
      deleteReminder(reminders[index].id);
    } else {
      safeSpeak(`Reminder not found. You have ${reminders.length} reminders.`);
    }
  }, [reminders]);

  // Delete reminder
  const deleteReminder = useCallback((id) => {
    if (timeoutRef.current.has(id)) {
      clearTimeout(timeoutRef.current.get(id));
      timeoutRef.current.delete(id);
    }
    
    setReminders(prev => prev.filter(r => r.id !== id));
    safeSpeak('Reminder deleted');
  }, [safeSpeak]);

  // Handle edit command
  const handleEditCommand = useCallback((input) => {
    const numMatch = input.match(/(\d+)/);
    const wordMatch = input.match(/\b(one|two|three)\b/i);
    
    let index = -1;
    
    if (numMatch) {
      index = parseInt(numMatch[1]) - 1;
    } else if (wordMatch) {
      const numberWords = { 'one': 1, 'two': 2, 'three': 3 };
      index = numberWords[wordMatch[0].toLowerCase()] - 1;
    }
    
    if (index >= 0 && index < reminders.length) {
      const reminder = reminders[index];
      setReminderText(reminder.text);
      setReminderDate(reminder.date);
      setReminderTime(reminder.timeStr);
      setRepeatOption(reminder.repeat || 'once');
      setIsEditing(true);
      setEditingId(reminder.id);
      safeSpeak(`Editing reminder ${index + 1}`);
    }
  }, [reminders, safeSpeak]);

  // Clear all reminders
  const clearAllReminders = useCallback(() => {
    if (reminders.length === 0) {
      safeSpeak('No reminders to clear');
      return;
    }
    
    timeoutRef.current.forEach(timeout => clearTimeout(timeout));
    timeoutRef.current.clear();
    setReminders([]);
    safeSpeak('All reminders cleared');
  }, [reminders, safeSpeak]);

  // Format date
  const formatDisplayDate = useCallback((dateStr) => {
    try {
      const date = new Date(dateStr);
      const today = new Date();
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      if (date.toDateString() === today.toDateString()) return 'Today';
      if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
      return date.toLocaleDateString();
    } catch (e) {
      return dateStr;
    }
  }, []);

  // Reset form
  const resetForm = useCallback(() => {
    setReminderText('');
    setReminderTime('');
    setReminderDate('');
    setRepeatOption('once');
    setIsEditing(false);
    setEditingId(null);
  }, []);

  // Toggle reminder
  const toggleReminder = useCallback((id) => {
    setReminders(prev => prev.map(reminder => {
      if (reminder.id === id) {
        const updated = { ...reminder, active: !reminder.active };
        if (updated.active) {
          scheduleReminderTimeout(updated);
        } else {
          if (timeoutRef.current.has(id)) {
            clearTimeout(timeoutRef.current.get(id));
            timeoutRef.current.delete(id);
          }
        }
        return updated;
      }
      return reminder;
    }));
  }, [scheduleReminderTimeout]);

  // Test reminder
  const testReminder = useCallback(() => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 1);
    
    const testReminder = {
      id: Date.now(),
      text: 'Test reminder - system is working',
      time: now.toISOString(),
      date: now.toISOString().split('T')[0],
      timeStr: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
      displayTime: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      repeat: 'once',
      active: true,
      createdAt: new Date().toISOString()
    };
    
    setReminders(prev => [...prev, testReminder]);
    scheduleReminderTimeout(testReminder);
    safeSpeak('Test reminder added for 1 minute');
  }, [scheduleReminderTimeout, safeSpeak]);

  return (
    <div className="reminders-page">
      <header className="fixed-header">
        <div className="header-content">
          <div className="header-left">
            <button 
              className="back-btn"
              onClick={() => window.location.href = '/dashboard'}
            >
              ← Back
            </button>
            <h1 className="logo">VISIONA</h1>
          </div>
          
          <div className="header-title">
            <h2>Voice Reminders</h2>
            <p className="subtitle">Saved in browser storage</p>
          </div>
          
          <div className="user-menu">
            <button 
              className={`voice-btn ${isListening ? 'listening' : ''}`}
              onClick={() => isListening ? safeStopListening() : safeStartListening()}
            >
              🎤 {isListening ? 'Listening...' : 'Voice'}
            </button>
          </div>
        </div>
      </header>

      <div className="reminders-content">
        <div className="reminders-container">
          <div className="status-message">
            <div className="status-text">
              {isListening ? '🎤 Listening...' : status}
            </div>
          </div>

          <div className="voice-control-section">
            <div className="voice-status-indicator">
              <div className={`listening-dot ${isListening ? 'active' : ''}`}></div>
              <span className="status-text">
                {isListening ? '● Listening...' : 'Ready'}
              </span>
              <button 
                className="voice-help-btn"
                onClick={() => setShowCommands(!showCommands)}
              >
                {showCommands ? 'Hide' : 'Help'}
              </button>
            </div>
            
            {showCommands && (
              <div className="voice-commands-panel">
                <h3>Voice Commands</h3>
                <div className="commands-grid">
                  <div className="command-category">
                    <h4>Add</h4>
                    <ul>
                      <li>"Remind me to call mom at 3 pm"</li>
                      <li>"Set reminder meeting tomorrow 11 am"</li>
                      <li>"Add reminder take medicine"</li>
                    </ul>
                  </div>
                  <div className="command-category">
                    <h4>Manage</h4>
                    <ul>
                      <li>"Show reminders"</li>
                      <li>"Delete reminder one"</li>
                      <li>"Clear all reminders"</li>
                    </ul>
                  </div>
                </div>
                <div className="voice-tips">
                  <p><strong>Data persists after logout</strong></p>
                </div>
              </div>
            )}
          </div>

          <div className="reminder-form-section">
            <div className="section-header">
              <h3>{isEditing ? 'Edit Reminder' : 'Add Reminder'}</h3>
              {isEditing && (
                <button className="cancel-edit-btn" onClick={resetForm}>
                  Cancel
                </button>
              )}
            </div>
            
            <div className="reminder-form">
              <div className="form-group">
                <label>Reminder Text *</label>
                <input
                  type="text"
                  value={reminderText}
                  onChange={(e) => setReminderText(e.target.value)}
                  placeholder="What to remember?"
                  className="form-input"
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Date</label>
                  <input
                    type="date"
                    value={reminderDate}
                    onChange={(e) => setReminderDate(e.target.value)}
                    className="form-input"
                  />
                </div>
                
                <div className="form-group">
                  <label>Time *</label>
                  <input
                    type="time"
                    value={reminderTime}
                    onChange={(e) => setReminderTime(e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label>Repeat</label>
                <select
                  value={repeatOption}
                  onChange={(e) => setRepeatOption(e.target.value)}
                  className="form-input"
                >
                  <option value="once">Once</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
              
              <div className="form-actions">
                <button 
                  className="submit-btn"
                  onClick={saveReminder}
                  disabled={!reminderText.trim() || !reminderTime}
                >
                  {isEditing ? 'Update' : 'Add Reminder'}
                </button>
                <button 
                  className="cancel-btn"
                  onClick={resetForm}
                >
                  Reset
                </button>
                <button 
                  className="test-btn"
                  onClick={testReminder}
                >
                  Test
                </button>
              </div>
            </div>
          </div>

          <div className="reminders-list-section">
            <div className="section-header">
              <h3>Your Reminders ({reminders.length})</h3>
              <div className="list-actions">
                <button 
                  className="speak-reminders-btn"
                  onClick={listReminders}
                >
                  🔊 Speak All
                </button>
              </div>
            </div>
            
            {reminders.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">⏰</div>
                <h4>No reminders yet</h4>
                <p>Add reminders using voice or form above</p>
                <p className="empty-hint">Reminders persist after logout</p>
              </div>
            ) : (
              <>
                <div className="reminders-grid">
                  {reminders.map((reminder, index) => (
                    <div 
                      key={reminder.id} 
                      className={`reminder-card ${reminder.active ? 'active' : 'inactive'}`}
                    >
                      <div className="reminder-header">
                        <div className="reminder-number">#{index + 1}</div>
                        <div className="reminder-status">
                          {reminder.active ? '⏰ Active' : '✓ Done'}
                        </div>
                      </div>
                      
                      <div className="reminder-content">
                        <div className="reminder-text">{reminder.text}</div>
                        <div className="reminder-details">
                          <div className="reminder-time">
                            <span className="date">{formatDisplayDate(reminder.date)}</span>
                            <span className="time">{reminder.displayTime}</span>
                          </div>
                          <div className="reminder-repeat">
                            {reminder.repeat}
                          </div>
                        </div>
                      </div>
                      
                      <div className="reminder-actions">
                        <button 
                          className="edit-btn"
                          onClick={() => {
                            setReminderText(reminder.text);
                            setReminderDate(reminder.date);
                            setReminderTime(reminder.timeStr);
                            setRepeatOption(reminder.repeat);
                            setIsEditing(true);
                            setEditingId(reminder.id);
                          }}
                        >
                          Edit
                        </button>
                        <button 
                          className="delete-btn"
                          onClick={() => deleteReminder(reminder.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="bulk-actions">
                  <button 
                    className="clear-all-btn"
                    onClick={clearAllReminders}
                  >
                    🗑️ Clear All Reminders
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemindersPage;