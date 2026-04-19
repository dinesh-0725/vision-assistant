// // // src/voice-commands/medicationVoiceCommands.js

// // import { voiceService } from '../services/voiceService';

// // // Enhanced voice command vocabulary with patterns
// // export const VOICE_COMMANDS = {
// //   // Navigation commands
// //   "go back": "back",
// //   "go to dashboard": "dashboard",
// //   "dashboard": "dashboard",
// //   "back": "back",
// //   "back to dashboard": "back",
// //   "return": "back",
// //   "return to dashboard": "back",
// //   "home": "dashboard",
// //   "go home": "dashboard",
// //   "main menu": "dashboard",
// //   "main screen": "dashboard",
// //   "logout": "logout",
// //   "sign out": "logout",
// //   "exit": "logout",
  
// //   // Form commands
// //   "add medication": "add",
// //   "create reminder": "add",
// //   "new medication": "add",
// //   "save medication": "save",
// //   "submit form": "save",
// //   "save": "save",
// //   "update": "save",
// //   "cancel": "cancel",
// //   "stop editing": "cancel",
// //   "clear form": "cancel",
// //   "reset form": "cancel",
  
// //   // List commands
// //   "list reminders": "list",
// //   "show medications": "list",
// //   "show all": "list",
// //   "what are my medications": "list",
// //   "refresh reminders": "refresh",
// //   "reload": "refresh",
// //   "update list": "refresh",
  
// //   // Status commands
// //   "clear status": "clear",
// //   "clear message": "clear",
// //   "dismiss": "clear",
  
// //   // Help
// //   "help": "help",
// //   "what can I say": "help",
// //   "show commands": "help",
// //   "voice help": "help",
// //   "available commands": "help",
  
// //   // Form field navigation
// //   "focus medicine": "focus_medicine",
// //   "focus medicine name": "focus_medicine",
// //   "medicine field": "focus_medicine",
// //   "focus time": "focus_time",
// //   "time field": "focus_time",
// //   "focus frequency": "focus_frequency",
// //   "frequency field": "focus_frequency",
// //   "focus dosage": "focus_dosage",
// //   "dosage field": "focus_dosage",
// //   "focus duration": "focus_duration",
// //   "duration field": "focus_duration",
  
// //   // Complex commands
// //   "create new": "complex_new",
// //   "make new": "complex_new",
// //   "add new": "complex_new",
// //   "edit last": "complex_edit_last",
// //   "delete last": "complex_delete_last",
// //   "toggle last": "complex_toggle_last",
// //   "enable last": "complex_toggle_last",
// //   "disable last": "complex_toggle_last",
  
// //   // Quick actions for existing reminders
// //   "activate all": "activate_all",
// //   "deactivate all": "deactivate_all",
// //   "delete all": "delete_all",
// //   "clear all": "delete_all",
  
// //   // Smart commands for common medicines
// //   "take dolo": "smart_dolo",
// //   "take aspirin": "smart_aspirin",
// //   "take vitamins": "smart_vitamins",
// //   "take paracetamol": "smart_dolo",
// //   "take medicine": "smart_medicine",
// // };

// // // Time patterns mapping
// // export const TIME_PATTERNS = {
// //   "morning": "08:00",
// //   "breakfast": "08:00",
// //   "morning time": "08:00",
// //   "afternoon": "14:00",
// //   "lunch": "13:00",
// //   "evening": "18:00",
// //   "dinner": "19:00",
// //   "night": "22:00",
// //   "bedtime": "22:00",
// //   "midnight": "00:00",
// //   "noon": "12:00",
// //   "midday": "12:00",
// // };

// // // Frequency patterns
// // export const FREQUENCY_PATTERNS = {
// //   "daily": "daily",
// //   "every day": "daily",
// //   "day": "daily",
// //   "weekly": "weekly",
// //   "every week": "weekly",
// //   "week": "weekly",
// //   "monthly": "monthly",
// //   "every month": "monthly",
// //   "month": "monthly",
// //   "once a day": "daily",
// //   "twice a day": "twice_daily",
// //   "three times a day": "thrice_daily",
// // };

// // // Dynamic patterns for medication commands
// // export const DYNAMIC_PATTERNS = {
// //   // Medicine commands: "add dolo", "take aspirin", "create vitamin reminder"
// //   MEDICINE_COMMAND: /^(add|create|take|start)\s+(.+?)(?:\s+(?:at|for|daily|every|time|reminder))?$/i,
  
// //   // Time commands: "at 8 am", "time is 9 pm", "set time to morning"
// //   TIME_COMMAND: /^(?:at|time is|set time to)\s+(.+)$/i,
  
// //   // Duration commands: "for 10 days", "duration is 20 days"
// //   DURATION_COMMAND: /^(?:for|duration is)\s+(\d+)\s+(?:day|days)$/i,
  
// //   // Full natural language: "medicine name is dolo at 8 am daily for 10 days"
// //   FULL_COMMAND: /^(?:medicine name is|name is)\s+(.+?)\s+(?:at|time is)\s+(.+?)\s+(daily|weekly|monthly)\s+(?:for|duration)\s+(\d+)\s+(?:day|days)$/i,
  
// //   // Simple command: "dolo 8 am daily"
// //   SIMPLE_COMMAND: /^(\w+)\s+(\d{1,2})(?::(\d{2}))?\s*(am|pm)\s+(daily|weekly|monthly)$/i,
  
// //   // Edit command: "edit aspirin", "update dolo"
// //   EDIT_COMMAND: /^(edit|update|change)\s+(.+)$/i,
  
// //   // Delete command: "delete aspirin", "remove dolo"
// //   DELETE_COMMAND: /^(delete|remove|stop)\s+(.+)$/i,
// // };

// // // Initialize medication voice commands
// // export const initializeMedicationCommands = (handlers) => {
// //   const {
// //     handleBackToDashboard,
// //     handleLogout,
// //     navigate,
// //     setStatus,
// //     speak,
// //     setFormData,
// //     formData,
// //     editingReminder,
// //     handleSubmit,
// //     cancelEditing,
// //     fetchReminders,
// //     reminders,
// //     startEditing,
// //     deleteReminder,
// //     toggleReminderStatus,
// //     activateAllReminders,
// //     deleteAllReminders,
// //     medicineNameRef,
// //     timeOfDayRef,
// //     repeatFrequencyRef,
// //     dosageInfoRef,
// //     durationDaysRef,
// //     setShowVoiceHelp
// //   } = handlers;

// //   // Clear existing commands and set feature
// //   voiceService.setFeature('medication');
// //   voiceService.clearDynamicHandlers();
// //   voiceService.clearCommands();

// //   // Register all static commands
// //   Object.keys(VOICE_COMMANDS).forEach(command => {
// //     voiceService.registerCommand(command, () => {
// //       executeCommand(VOICE_COMMANDS[command], handlers);
// //     });
// //   });

// //   // Register dynamic handlers for medication commands
// //   voiceService.registerDynamicHandler(
// //     DYNAMIC_PATTERNS.MEDICINE_COMMAND,
// //     (matches, transcript) => {
// //       const action = matches[0].toLowerCase(); // add, create, take, start
// //       const medicine = matches[1].trim();
      
// //       if (medicine) {
// //         setFormData(prev => ({ 
// //           ...prev, 
// //           medicine_name: medicine.charAt(0).toUpperCase() + medicine.slice(1)
// //         }));
// //         setStatus(`Added ${medicine} to form. Now say the time, like "8 AM"`);
// //         speak(`Added ${medicine} to form. Now say the time, like 8 AM`);
// //       }
// //     }
// //   );

// //   voiceService.registerDynamicHandler(
// //     DYNAMIC_PATTERNS.TIME_COMMAND,
// //     (matches) => {
// //       const timeText = matches[0].toLowerCase();
      
// //       // Check for time keywords
// //       if (TIME_PATTERNS[timeText]) {
// //         setFormData(prev => ({ ...prev, time_of_day: TIME_PATTERNS[timeText] }));
// //         setStatus(`Time set to ${timeText} (${TIME_PATTERNS[timeText]})`);
// //         speak(`Time set to ${timeText}`);
// //       } 
// //       // Check for AM/PM format
// //       else if (/(\d{1,2})\s*(am|pm)/i.test(timeText)) {
// //         const timeMatch = timeText.match(/(\d{1,2})\s*(am|pm)/i);
// //         let hours = parseInt(timeMatch[1]);
// //         const meridiem = timeMatch[2].toLowerCase();
        
// //         if (meridiem === 'pm' && hours < 12) hours += 12;
// //         if (meridiem === 'am' && hours === 12) hours = 0;
        
// //         const timeString = `${hours.toString().padStart(2, '0')}:00`;
// //         setFormData(prev => ({ ...prev, time_of_day: timeString }));
        
// //         const formattedTime = formatTime(timeString);
// //         setStatus(`Time set to ${formattedTime}`);
// //         speak(`Time set to ${formattedTime}`);
// //       }
// //     }
// //   );

// //   voiceService.registerDynamicHandler(
// //     DYNAMIC_PATTERNS.DURATION_COMMAND,
// //     (matches) => {
// //       const days = parseInt(matches[0]);
// //       setFormData(prev => ({ ...prev, duration_days: days }));
// //       setStatus(`Duration set to ${days} days`);
// //       speak(`Duration set to ${days} days`);
// //     }
// //   );

// //   voiceService.registerDynamicHandler(
// //     DYNAMIC_PATTERNS.FULL_COMMAND,
// //     (matches) => {
// //       const [medicine, timeText, frequency, days] = matches;
      
// //       let timeOfDay = TIME_PATTERNS[timeText.toLowerCase()] || parseTimeString(timeText);
      
// //       setFormData({
// //         medicine_name: medicine.charAt(0).toUpperCase() + medicine.slice(1),
// //         time_of_day: timeOfDay || '08:00',
// //         repeat_frequency: frequency.toLowerCase(),
// //         dosage_info: '',
// //         duration_days: parseInt(days) || 30
// //       });
      
// //       setStatus(`Added ${medicine} at ${formatTime(timeOfDay)} ${frequency} for ${days} days. Say "save" to confirm.`);
// //       speak(`Added ${medicine} at ${formatTime(timeOfDay)} ${frequency} for ${days} days. Say save to confirm.`);
// //     }
// //   );

// //   voiceService.registerDynamicHandler(
// //     DYNAMIC_PATTERNS.SIMPLE_COMMAND,
// //     (matches) => {
// //       const [medicine, hour, minute, meridiem, frequency] = matches;
      
// //       let hours = parseInt(hour);
// //       if (meridiem.toLowerCase() === 'pm' && hours < 12) hours += 12;
// //       if (meridiem.toLowerCase() === 'am' && hours === 12) hours = 0;
      
// //       const timeString = `${hours.toString().padStart(2, '0')}:${minute || "00"}`;
      
// //       setFormData(prev => ({
// //         ...prev,
// //         medicine_name: medicine.charAt(0).toUpperCase() + medicine.slice(1),
// //         time_of_day: timeString,
// //         repeat_frequency: frequency.toLowerCase()
// //       }));
      
// //       setStatus(`Added ${medicine} at ${formatTime(timeString)} ${frequency}. Say "save" to confirm.`);
// //       speak(`Added ${medicine} at ${formatTime(timeString)} ${frequency}. Say save to confirm.`);
// //     }
// //   );

// //   voiceService.registerDynamicHandler(
// //     DYNAMIC_PATTERNS.EDIT_COMMAND,
// //     (matches) => {
// //       const medicineName = matches[1].toLowerCase();
// //       const reminder = reminders.find(r => 
// //         r.medicine_name.toLowerCase().includes(medicineName)
// //       );
      
// //       if (reminder) {
// //         startEditing(reminder);
// //         setStatus(`Editing ${reminder.medicine_name}`);
// //         speak(`Editing ${reminder.medicine_name}`);
// //       } else {
// //         setStatus(`No reminder found for ${medicineName}`);
// //         speak(`No reminder found for ${medicineName}`);
// //       }
// //     }
// //   );

// //   voiceService.registerDynamicHandler(
// //     DYNAMIC_PATTERNS.DELETE_COMMAND,
// //     (matches) => {
// //       const medicineName = matches[1].toLowerCase();
// //       const reminder = reminders.find(r => 
// //         r.medicine_name.toLowerCase().includes(medicineName)
// //       );
      
// //       if (reminder) {
// //         deleteReminder(reminder.id, reminder.medicine_name);
// //       } else {
// //         setStatus(`No reminder found for ${medicineName}`);
// //         speak(`No reminder found for ${medicineName}`);
// //       }
// //     }
// //   );

// //   // Set up the general callback for unhandled commands
// //   voiceService.onResultCallback = (transcript) => {
// //     console.log('Unhandled command:', transcript);
// //     // You could add fallback processing here if needed
// //   };

// //   // Start listening
// //   voiceService.startListening();
// // };

// // // Execute command based on command type
// // const executeCommand = (command, handlers) => {
// //   const {
// //     handleBackToDashboard,
// //     handleLogout,
// //     navigate,
// //     setStatus,
// //     speak,
// //     setFormData,
// //     formData,
// //     editingReminder,
// //     handleSubmit,
// //     cancelEditing,
// //     fetchReminders,
// //     reminders,
// //     startEditing,
// //     deleteReminder,
// //     toggleReminderStatus,
// //     activateAllReminders,
// //     deleteAllReminders,
// //     medicineNameRef,
// //     timeOfDayRef,
// //     repeatFrequencyRef,
// //     dosageInfoRef,
// //     durationDaysRef,
// //     setShowVoiceHelp
// //   } = handlers;

// //   switch(command) {
// //     case 'back':
// //       handleBackToDashboard();
// //       break;
// //     case 'dashboard':
// //       navigate("/dashboard");
// //       break;
// //     case 'logout':
// //       handleLogout();
// //       break;
// //     case 'add':
// //       if (editingReminder) {
// //         setStatus("Currently editing a reminder. Say 'cancel' first or 'save' to update.");
// //         speak("Currently editing a reminder. Say cancel first or save to update.");
// //       } else {
// //         setStatus("Ready for medication details. Say: 'Add Dolo daily at 8 AM'");
// //         speak("Ready for medication details. Say: Add Dolo daily at 8 AM.");
// //       }
// //       break;
// //     case 'save':
// //       if (formData.medicine_name) {
// //         handleSubmit();
// //       } else {
// //         setStatus("Please specify a medicine name first. Say 'Medicine name is [name]'");
// //         speak("Please specify a medicine name first.");
// //       }
// //       break;
// //     case 'cancel':
// //       if (editingReminder) {
// //         cancelEditing();
// //       } else {
// //         setFormData({
// //           medicine_name: "",
// //           time_of_day: "",
// //           repeat_frequency: "daily",
// //           dosage_info: "",
// //           duration_days: 30
// //         });
// //         setStatus("Form cleared.");
// //         speak("Form cleared.");
// //       }
// //       break;
// //     case 'list':
// //       if (reminders.length > 0) {
// //         const activeCount = reminders.filter(r => r.active).length;
// //         const reminderList = reminders.slice(0, 3).map(r => 
// //           `${r.medicine_name} at ${formatTime(r.time_of_day)}`
// //         ).join(", ");
        
// //         speak(`You have ${reminders.length} medication reminders. ${activeCount} are active. Recent: ${reminderList}`);
// //         setStatus(`You have ${reminders.length} reminders (${activeCount} active)`);
// //       } else {
// //         speak("You have no medication reminders yet.");
// //       }
// //       break;
// //     case 'refresh':
// //       fetchReminders();
// //       break;
// //     case 'clear':
// //       setStatus("");
// //       break;
// //     case 'help':
// //       setShowVoiceHelp(true);
// //       speak("Voice command examples shown.");
// //       break;
// //     case 'focus_medicine':
// //       medicineNameRef.current?.focus();
// //       speak("Medicine name field focused. Say the medicine name.");
// //       break;
// //     case 'focus_time':
// //       timeOfDayRef.current?.focus();
// //       speak("Time field focused. Say the time.");
// //       break;
// //     case 'focus_frequency':
// //       repeatFrequencyRef.current?.focus();
// //       speak("Frequency field focused.");
// //       break;
// //     case 'focus_dosage':
// //       dosageInfoRef.current?.focus();
// //       speak("Dosage field focused. Say dosage instructions.");
// //       break;
// //     case 'focus_duration':
// //       durationDaysRef.current?.focus();
// //       speak("Duration field focused. Say number of days.");
// //       break;
// //     case 'complex_new':
// //       setFormData({
// //         medicine_name: "",
// //         time_of_day: "",
// //         repeat_frequency: "daily",
// //         dosage_info: "",
// //         duration_days: 30
// //       });
// //       setStatus("Ready for new medication. Example: 'Add Dolo 650 at 8 AM daily for 10 days'");
// //       speak("Ready for new medication.");
// //       break;
// //     case 'complex_edit_last':
// //       if (reminders.length > 0) {
// //         startEditing(reminders[reminders.length - 1]);
// //       } else {
// //         speak("No reminders to edit.");
// //       }
// //       break;
// //     case 'complex_delete_last':
// //       if (reminders.length > 0) {
// //         const lastReminder = reminders[reminders.length - 1];
// //         deleteReminder(lastReminder.id, lastReminder.medicine_name);
// //       } else {
// //         speak("No reminders to delete.");
// //       }
// //       break;
// //     case 'complex_toggle_last':
// //       if (reminders.length > 0) {
// //         const lastReminder = reminders[reminders.length - 1];
// //         toggleReminderStatus(lastReminder);
// //       } else {
// //         speak("No reminders to toggle.");
// //       }
// //       break;
// //     case 'activate_all':
// //       activateAllReminders(true);
// //       break;
// //     case 'deactivate_all':
// //       activateAllReminders(false);
// //       break;
// //     case 'delete_all':
// //       if (reminders.length > 0) {
// //         if (window.confirm(`Are you sure you want to delete all ${reminders.length} reminders?`)) {
// //           deleteAllReminders();
// //         }
// //       } else {
// //         speak("No reminders to delete.");
// //       }
// //       break;
// //     case 'smart_dolo':
// //       handleSmartMedicineCommand("Dolo 650", "08:00", "daily", 30, handlers);
// //       break;
// //     case 'smart_aspirin':
// //       handleSmartMedicineCommand("Aspirin", "20:00", "daily", 30, handlers);
// //       break;
// //     case 'smart_vitamins':
// //       handleSmartMedicineCommand("Multivitamins", "09:00", "daily", 30, handlers);
// //       break;
// //     case 'smart_medicine':
// //       setStatus("Please specify medicine name. Example: 'Take Dolo' or 'Take Aspirin'");
// //       speak("Please specify medicine name.");
// //       break;
// //   }
// // };

// // // Helper functions
// // const handleSmartMedicineCommand = (medicine, time, frequency, duration, handlers) => {
// //   const { setFormData, setStatus, speak } = handlers;
  
// //   setFormData({
// //     medicine_name: medicine,
// //     time_of_day: time,
// //     repeat_frequency: frequency,
// //     dosage_info: "1 tablet",
// //     duration_days: duration
// //   });
  
// //   const feedback = `${medicine} set for ${formatTime(time)} ${frequency} for ${duration} days. Say 'save' to confirm.`;
// //   setStatus(feedback);
// //   speak(feedback);
// // };

// // const formatTime = (timeString) => {
// //   if (!timeString) return "";
// //   try {
// //     const time = new Date(`2000-01-01T${timeString}`);
// //     return time.toLocaleTimeString('en-US', { 
// //       hour: '2-digit', 
// //       minute: '2-digit',
// //       hour12: true 
// //     });
// //   } catch (e) {
// //     return timeString;
// //   }
// // };

// // const parseTimeString = (timeText) => {
// //   // Parse time strings like "8 am", "9:30 pm", etc.
// //   const timeMatch = timeText.match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)?/i);
// //   if (!timeMatch) return null;
  
// //   let hours = parseInt(timeMatch[1]);
// //   const minutes = timeMatch[2] || "00";
// //   const meridiem = timeMatch[3]?.toLowerCase();
  
// //   if (meridiem === 'pm' && hours < 12) hours += 12;
// //   if (meridiem === 'am' && hours === 12) hours = 0;
  
// //   return `${hours.toString().padStart(2, '0')}:${minutes}`;
// // };

// // // Stop medication voice commands
// // export const stopMedicationCommands = () => {
// //   voiceService.stopListening();
// // };



// // // // // src/voice-commands/medicationVoiceCommands.js

// // // // import { voiceService } from '../../services/voiceService';

// // // // // Enhanced voice command vocabulary with patterns
// // // // export const VOICE_COMMANDS = {
// // // //   // Navigation commands
// // // //   "go back": "back",
// // // //   "go to dashboard": "dashboard",
// // // //   "logout": "logout",
// // // //   "sign out": "logout",
// // // //   "exit": "logout",
  
// // // //   // Form commands
// // // //   "add medication": "add",
// // // //   "create reminder": "add",
// // // //   "new medication": "add",
// // // //   "save medication": "save",
// // // //   "submit form": "save",
// // // //   "save": "save",
// // // //   "update": "save",
// // // //   "cancel": "cancel",
// // // //   "stop editing": "cancel",
// // // //   "clear form": "cancel",
// // // //   "reset form": "cancel",
  
// // // //   "list reminders": "list",
// // // //   "show medications": "list",
// // // //   "show all": "list",
// // // //   "what are my medications": "list",
// // // //   "refresh reminders": "refresh",
// // // //   "reload": "refresh",
// // // //   "update list": "refresh",
  
// // // //   // Status commands
// // // //   "clear status": "clear",
// // // //   "clear message": "clear",
// // // //   "dismiss": "clear",
  
// // // //   // Help
// // // //   "help": "help",
// // // //   "what can I say": "help",
// // // //   "show commands": "help",
// // // //   "voice help": "help",
// // // //   "available commands": "help",
  
// // // //   // Form field navigation
// // // //   "focus medicine": "focus_medicine",
// // // //   "focus medicine name": "focus_medicine",
// // // //   "medicine field": "focus_medicine",
// // // //   "focus time": "focus_time",
// // // //   "time field": "focus_time",
// // // //   "focus frequency": "focus_frequency",
// // // //   "frequency field": "focus_frequency",
// // // //   "focus dosage": "focus_dosage",
// // // //   "dosage field": "focus_dosage",
// // // //   "focus duration": "focus_duration",
// // // //   "duration field": "focus_duration",
  
// // // //   // Complex commands
// // // //   "create new": "complex_new",
// // // //   "make new": "complex_new",
// // // //   "add new": "complex_new",
// // // //   "edit last": "complex_edit_last",
// // // //   "edit last reminder": "complex_edit_last",
// // // //   "delete last": "complex_delete_last",
// // // //   "delete last reminder": "complex_delete_last",
// // // //   "toggle last": "complex_toggle_last",
// // // //   "enable last": "complex_toggle_last",
// // // //   "disable last": "complex_toggle_last",
  
// // // //   // Quick actions for existing reminders
// // // //   "activate all": "activate_all",
// // // //   "activate all reminders": "activate_all",
// // // //   "deactivate all": "deactivate_all",
// // // //   "deactivate all reminders": "deactivate_all",
// // // //   "delete all": "delete_all",
// // // //   "delete all reminders": "delete_all",
// // // //   "clear all": "delete_all",
  
// // // //   // Smart commands for common medicines
// // // //   "take dolo": "smart_dolo",
// // // //   "take aspirin": "smart_aspirin",
// // // //   "take vitamins": "smart_vitamins",
// // // //   "take paracetamol": "smart_dolo",
// // // //   "take medicine": "smart_medicine",
// // // //   "daily reminder": "daily_reminder",
// // // //   "delete reminder": "delete_reminder",
// // // // };

// // // // // Time patterns mapping
// // // // export const TIME_PATTERNS = {
// // // //   "morning": "08:00",
// // // //   "breakfast": "08:00",
// // // //   "morning time": "08:00",
// // // //   "afternoon": "14:00",
// // // //   "lunch": "13:00",
// // // //   "evening": "18:00",
// // // //   "dinner": "19:00",
// // // //   "night": "22:00",
// // // //   "bedtime": "22:00",
// // // //   "midnight": "00:00",
// // // //   "noon": "12:00",
// // // //   "midday": "12:00",
// // // //   "in the morning": "08:00",
// // // //   "every morning": "08:00",
// // // // };

// // // // // Frequency patterns
// // // // export const FREQUENCY_PATTERNS = {
// // // //   "daily": "daily",
// // // //   "every day": "daily",
// // // //   "day": "daily",
// // // //   "weekly": "weekly",
// // // //   "every week": "weekly",
// // // //   "week": "weekly",
// // // //   "monthly": "monthly",
// // // //   "every month": "monthly",
// // // //   "month": "monthly",
// // // //   "once a day": "daily",
// // // //   "twice a day": "twice_daily",
// // // //   "three times a day": "thrice_daily",
// // // // };

// // // // // Dynamic patterns for medication commands
// // // // export const DYNAMIC_PATTERNS = {
// // // //   // Medicine commands: "add dolo", "take aspirin", "create vitamin reminder"
// // // //   MEDICINE_COMMAND: /^(add|create|take|start)\s+(.+?)(?:\s+(?:at|for|daily|every|time|reminder))?$/i,
  
// // // //   // Time commands: "at 8 am", "time is 9 pm", "set time to morning"
// // // //   TIME_COMMAND: /^(?:at|time is|set time to)\s+(.+)$/i,
  
// // // //   // Duration commands: "for 10 days", "duration is 20 days"
// // // //   DURATION_COMMAND: /^(?:for|duration is)\s+(\d+)\s+(?:day|days)$/i,
  
// // // //   // Full natural language: "medicine name is dolo at 8 am daily for 10 days"
// // // //   FULL_COMMAND: /^(?:medicine name is|name is)\s+(.+?)\s+(?:at|time is)\s+(.+?)\s+(daily|weekly|monthly)\s+(?:for|duration)\s+(\d+)\s+(?:day|days)$/i,
  
// // // //   // Simple command: "dolo 8 am daily"
// // // //   SIMPLE_COMMAND: /^(\w+)\s+(\d{1,2})(?::(\d{2}))?\s*(am|pm)\s+(daily|weekly|monthly)$/i,
  
// // // //   // Edit command: "edit aspirin", "update dolo"
// // // //   EDIT_COMMAND: /^(edit|update|change)\s+(.+)$/i,
  
// // // //   // Delete command: "delete aspirin", "remove dolo"
// // // //   DELETE_COMMAND: /^(delete|remove|stop)\s+(.+)$/i,
  
// // // //   // Take medicine at time: "take medicine at 8 am"
// // // //   TAKE_MEDICINE_AT: /^take\s+(?:medicine|medication)\s+at\s+(.+)$/i,
  
// // // //   // Daily reminder: "daily reminder"
// // // //   DAILY_REMINDER: /^daily\s+reminder$/i,
// // // // };

// // // // // Initialize medication voice commands
// // // // export const initializeMedicationCommands = (handlers) => {
// // // //   const {
// // // //     handleBackToDashboard,
// // // //     handleLogout,
// // // //     navigate,
// // // //     setStatus,
// // // //     speak,
// // // //     setFormData,
// // // //     formData,
// // // //     editingReminder,
// // // //     handleSubmit,
// // // //     cancelEditing,
// // // //     fetchReminders,
// // // //     reminders,
// // // //     startEditing,
// // // //     deleteReminder,
// // // //     toggleReminderStatus,
// // // //     activateAllReminders,
// // // //     deleteAllReminders,
// // // //     medicineNameRef,
// // // //     timeOfDayRef,
// // // //     repeatFrequencyRef,
// // // //     dosageInfoRef,
// // // //     durationDaysRef,
// // // //     setShowVoiceHelp
// // // //   } = handlers;

// // // //   // Clear existing commands and set feature
// // // //   voiceService.setFeature('medication');
// // // //   voiceService.clearDynamicHandlers();
// // // //   voiceService.clearCommands();

// // // //   // Register all static commands
// // // //   Object.keys(VOICE_COMMANDS).forEach(command => {
// // // //     voiceService.registerCommand(command, () => {
// // // //       executeCommand(VOICE_COMMANDS[command], handlers);
// // // //     });
// // // //   });

// // // //   // Register dynamic handlers for medication commands
// // // //   voiceService.registerDynamicHandler(
// // // //     DYNAMIC_PATTERNS.MEDICINE_COMMAND,
// // // //     (matches, transcript) => {
// // // //       const action = matches[0].toLowerCase(); // add, create, take, start
// // // //       const medicine = matches[1].trim();
      
// // // //       if (medicine) {
// // // //         setFormData(prev => ({ 
// // // //           ...prev, 
// // // //           medicine_name: medicine.charAt(0).toUpperCase() + medicine.slice(1)
// // // //         }));
// // // //         setStatus(`Added ${medicine} to form. Now say the time, like "8 AM"`);
// // // //         speak(`Added ${medicine} to form. Now say the time, like 8 AM`);
// // // //       }
// // // //     }
// // // //   );

// // // //   voiceService.registerDynamicHandler(
// // // //     DYNAMIC_PATTERNS.TIME_COMMAND,
// // // //     (matches) => {
// // // //       const timeText = matches[0].toLowerCase();
      
// // // //       // Check for time keywords
// // // //       if (TIME_PATTERNS[timeText]) {
// // // //         setFormData(prev => ({ ...prev, time_of_day: TIME_PATTERNS[timeText] }));
// // // //         setStatus(`Time set to ${timeText} (${TIME_PATTERNS[timeText]})`);
// // // //         speak(`Time set to ${timeText}`);
// // // //       } 
// // // //       // Check for AM/PM format
// // // //       else if (/(\d{1,2})\s*(am|pm)/i.test(timeText)) {
// // // //         const timeMatch = timeText.match(/(\d{1,2})\s*(am|pm)/i);
// // // //         let hours = parseInt(timeMatch[1]);
// // // //         const meridiem = timeMatch[2].toLowerCase();
        
// // // //         if (meridiem === 'pm' && hours < 12) hours += 12;
// // // //         if (meridiem === 'am' && hours === 12) hours = 0;
        
// // // //         const timeString = `${hours.toString().padStart(2, '0')}:00`;
// // // //         setFormData(prev => ({ ...prev, time_of_day: timeString }));
        
// // // //         const formattedTime = formatTime(timeString);
// // // //         setStatus(`Time set to ${formattedTime}`);
// // // //         speak(`Time set to ${formattedTime}`);
// // // //       }
// // // //     }
// // // //   );

// // // //   voiceService.registerDynamicHandler(
// // // //     DYNAMIC_PATTERNS.DURATION_COMMAND,
// // // //     (matches) => {
// // // //       const days = parseInt(matches[0]);
// // // //       setFormData(prev => ({ ...prev, duration_days: days }));
// // // //       setStatus(`Duration set to ${days} days`);
// // // //       speak(`Duration set to ${days} days`);
// // // //     }
// // // //   );

// // // //   voiceService.registerDynamicHandler(
// // // //     DYNAMIC_PATTERNS.FULL_COMMAND,
// // // //     (matches) => {
// // // //       const [medicine, timeText, frequency, days] = matches;
      
// // // //       let timeOfDay = TIME_PATTERNS[timeText.toLowerCase()] || parseTimeString(timeText);
      
// // // //       setFormData({
// // // //         medicine_name: medicine.charAt(0).toUpperCase() + medicine.slice(1),
// // // //         time_of_day: timeOfDay || '08:00',
// // // //         repeat_frequency: frequency.toLowerCase(),
// // // //         dosage_info: '',
// // // //         duration_days: parseInt(days) || 30
// // // //       });
      
// // // //       setStatus(`Added ${medicine} at ${formatTime(timeOfDay)} ${frequency} for ${days} days. Say "save" to confirm.`);
// // // //       speak(`Added ${medicine} at ${formatTime(timeOfDay)} ${frequency} for ${days} days. Say save to confirm.`);
// // // //     }
// // // //   );

// // // //   voiceService.registerDynamicHandler(
// // // //     DYNAMIC_PATTERNS.SIMPLE_COMMAND,
// // // //     (matches) => {
// // // //       const [medicine, hour, minute, meridiem, frequency] = matches;
      
// // // //       let hours = parseInt(hour);
// // // //       if (meridiem.toLowerCase() === 'pm' && hours < 12) hours += 12;
// // // //       if (meridiem.toLowerCase() === 'am' && hours === 12) hours = 0;
      
// // // //       const timeString = `${hours.toString().padStart(2, '0')}:${minute || "00"}`;
      
// // // //       setFormData(prev => ({
// // // //         ...prev,
// // // //         medicine_name: medicine.charAt(0).toUpperCase() + medicine.slice(1),
// // // //         time_of_day: timeString,
// // // //         repeat_frequency: frequency.toLowerCase()
// // // //       }));
      
// // // //       setStatus(`Added ${medicine} at ${formatTime(timeString)} ${frequency}. Say "save" to confirm.`);
// // // //       speak(`Added ${medicine} at ${formatTime(timeString)} ${frequency}. Say save to confirm.`);
// // // //     }
// // // //   );

// // // //   voiceService.registerDynamicHandler(
// // // //     DYNAMIC_PATTERNS.EDIT_COMMAND,
// // // //     (matches) => {
// // // //       const medicineName = matches[1].toLowerCase();
// // // //       const reminder = reminders.find(r => 
// // // //         r.medicine_name.toLowerCase().includes(medicineName)
// // // //       );
      
// // // //       if (reminder) {
// // // //         startEditing(reminder);
// // // //         setStatus(`Editing ${reminder.medicine_name}`);
// // // //         speak(`Editing ${reminder.medicine_name}`);
// // // //       } else {
// // // //         setStatus(`No reminder found for ${medicineName}`);
// // // //         speak(`No reminder found for ${medicineName}`);
// // // //       }
// // // //     }
// // // //   );

// // // //   voiceService.registerDynamicHandler(
// // // //     DYNAMIC_PATTERNS.DELETE_COMMAND,
// // // //     (matches) => {
// // // //       const medicineName = matches[1].toLowerCase();
// // // //       const reminder = reminders.find(r => 
// // // //         r.medicine_name.toLowerCase().includes(medicineName)
// // // //       );
      
// // // //       if (reminder) {
// // // //         deleteReminder(reminder.id, reminder.medicine_name);
// // // //       } else {
// // // //         setStatus(`No reminder found for ${medicineName}`);
// // // //         speak(`No reminder found for ${medicineName}`);
// // // //       }
// // // //     }
// // // //   );

// // // //   voiceService.registerDynamicHandler(
// // // //     DYNAMIC_PATTERNS.TAKE_MEDICINE_AT,
// // // //     (matches) => {
// // // //       const timeText = matches[0].toLowerCase();
      
// // // //       // Check for time keywords
// // // //       if (TIME_PATTERNS[timeText]) {
// // // //         setFormData(prev => ({ 
// // // //           ...prev, 
// // // //           time_of_day: TIME_PATTERNS[timeText]
// // // //         }));
// // // //         setStatus(`Time set to ${timeText} (${TIME_PATTERNS[timeText]}). Now say the medicine name.`);
// // // //         speak(`Time set to ${timeText}. Now say the medicine name.`);
// // // //       } 
// // // //       // Check for AM/PM format
// // // //       else if (/(\d{1,2})\s*(am|pm)/i.test(timeText)) {
// // // //         const timeMatch = timeText.match(/(\d{1,2})\s*(am|pm)/i);
// // // //         let hours = parseInt(timeMatch[1]);
// // // //         const meridiem = timeMatch[2].toLowerCase();
        
// // // //         if (meridiem === 'pm' && hours < 12) hours += 12;
// // // //         if (meridiem === 'am' && hours === 12) hours = 0;
        
// // // //         const timeString = `${hours.toString().padStart(2, '0')}:00`;
// // // //         setFormData(prev => ({ 
// // // //           ...prev, 
// // // //           time_of_day: timeString,
// // // //           repeat_frequency: "daily"
// // // //         }));
        
// // // //         const formattedTime = formatTime(timeString);
// // // //         setStatus(`Time set to ${formattedTime}. Now say the medicine name.`);
// // // //         speak(`Time set to ${formattedTime}. Now say the medicine name.`);
// // // //       }
// // // //     }
// // // //   );

// // // //   voiceService.registerDynamicHandler(
// // // //     DYNAMIC_PATTERNS.DAILY_REMINDER,
// // // //     () => {
// // // //       setFormData(prev => ({
// // // //         ...prev,
// // // //         repeat_frequency: "daily"
// // // //       }));
// // // //       setStatus("Reminder set to daily. Now say the medicine name and time.");
// // // //       speak("Reminder set to daily. Now say the medicine name and time.");
// // // //     }
// // // //   );

// // // //   // Set up the general callback for unhandled commands
// // // //   voiceService.onResultCallback = (transcript) => {
// // // //     console.log('Unhandled command:', transcript);
// // // //     // Fallback: Try to parse as medication command
// // // //     if (transcript.includes("medicine") || transcript.includes("medication") || 
// // // //         transcript.includes("dolo") || transcript.includes("aspirin") || 
// // // //         transcript.includes("vitamin") || transcript.includes("paracetamol")) {
// // // //       handleMedicationFallback(transcript, handlers);
// // // //     }
// // // //   };

// // // //   // Start listening
// // // //   voiceService.startListening();
// // // // };

// // // // // Handle medication fallback commands
// // // // const handleMedicationFallback = (transcript, handlers) => {
// // // //   const { setStatus, speak, setFormData } = handlers;
  
// // // //   // Simple pattern matching for common phrases
// // // //   const lowerTranscript = transcript.toLowerCase();
  
// // // //   // Check for "take [medicine] at [time]"
// // // //   const takeAtMatch = lowerTranscript.match(/take\s+(\w+)\s+at\s+(\d{1,2})\s*(am|pm)/i);
// // // //   if (takeAtMatch) {
// // // //     const [, medicine, hour, meridiem] = takeAtMatch;
// // // //     let hours = parseInt(hour);
// // // //     if (meridiem.toLowerCase() === 'pm' && hours < 12) hours += 12;
// // // //     if (meridiem.toLowerCase() === 'am' && hours === 12) hours = 0;
    
// // // //     const timeString = `${hours.toString().padStart(2, '0')}:00`;
    
// // // //     setFormData(prev => ({
// // // //       ...prev,
// // // //       medicine_name: medicine.charAt(0).toUpperCase() + medicine.slice(1),
// // // //       time_of_day: timeString,
// // // //       repeat_frequency: "daily"
// // // //     }));
    
// // // //     setStatus(`Added ${medicine} at ${formatTime(timeString)}. Say "save" to confirm.`);
// // // //     speak(`Added ${medicine} at ${formatTime(timeString)}. Say save to confirm.`);
// // // //     return;
// // // //   }
  
// // // //   // Check for "[medicine] for [days] days"
// // // //   const daysMatch = lowerTranscript.match(/(\w+)\s+for\s+(\d+)\s+days/i);
// // // //   if (daysMatch) {
// // // //     const [, medicine, days] = daysMatch;
// // // //     setFormData(prev => ({
// // // //       ...prev,
// // // //       medicine_name: medicine.charAt(0).toUpperCase() + medicine.slice(1),
// // // //       duration_days: parseInt(days)
// // // //     }));
// // // //     setStatus(`Added ${medicine} for ${days} days. Now say the time.`);
// // // //     speak(`Added ${medicine} for ${days} days. Now say the time.`);
// // // //     return;
// // // //   }
  
// // // //   // If no pattern matched, just show generic help
// // // //   setStatus(`Try saying: "Add medication", "Take medicine at 8 AM", or "Help" for more commands.`);
// // // //   speak(`Try saying: Add medication, Take medicine at 8 AM, or Help for more commands.`);
// // // // };

// // // // // Execute command based on command type
// // // // const executeCommand = (command, handlers) => {
// // // //   const {
// // // //     handleBackToDashboard,
// // // //     handleLogout,
// // // //     navigate,
// // // //     setStatus,
// // // //     speak,
// // // //     setFormData,
// // // //     formData,
// // // //     editingReminder,
// // // //     handleSubmit,
// // // //     cancelEditing,
// // // //     fetchReminders,
// // // //     reminders,
// // // //     startEditing,
// // // //     deleteReminder,
// // // //     toggleReminderStatus,
// // // //     activateAllReminders,
// // // //     deleteAllReminders,
// // // //     medicineNameRef,
// // // //     timeOfDayRef,
// // // //     repeatFrequencyRef,
// // // //     dosageInfoRef,
// // // //     durationDaysRef,
// // // //     setShowVoiceHelp
// // // //   } = handlers;

// // // //   switch(command) {
// // // //     case 'back':
// // // //       handleBackToDashboard();
// // // //       break;
// // // //     case 'dashboard':
// // // //       navigate("/dashboard");
// // // //       speak("Going back to dashboard");
// // // //       break;
// // // //     case 'logout':
// // // //       handleLogout();
// // // //       break;
// // // //     case 'add':
// // // //       if (editingReminder) {
// // // //         setStatus("Currently editing a reminder. Say 'cancel' first or 'save' to update.");
// // // //         speak("Currently editing a reminder. Say cancel first or save to update.");
// // // //       } else {
// // // //         setStatus("Ready for medication details. Say: 'Add Dolo daily at 8 AM'");
// // // //         speak("Ready for medication details. Say: Add Dolo daily at 8 AM.");
// // // //       }
// // // //       break;
// // // //     case 'save':
// // // //       if (formData.medicine_name) {
// // // //         handleSubmit();
// // // //       } else {
// // // //         setStatus("Please specify a medicine name first. Say 'Medicine name is [name]'");
// // // //         speak("Please specify a medicine name first.");
// // // //       }
// // // //       break;
// // // //     case 'cancel':
// // // //       if (editingReminder) {
// // // //         cancelEditing();
// // // //       } else {
// // // //         setFormData({
// // // //           medicine_name: "",
// // // //           time_of_day: "",
// // // //           repeat_frequency: "daily",
// // // //           dosage_info: "",
// // // //           duration_days: 30
// // // //         });
// // // //         setStatus("Form cleared.");
// // // //         speak("Form cleared.");
// // // //       }
// // // //       break;
// // // //     case 'list':
// // // //       if (reminders.length > 0) {
// // // //         const activeCount = reminders.filter(r => r.active).length;
// // // //         const reminderList = reminders.slice(0, 3).map(r => 
// // // //           `${r.medicine_name} at ${formatTime(r.time_of_day)}`
// // // //         ).join(", ");
        
// // // //         speak(`You have ${reminders.length} medication reminders. ${activeCount} are active. Recent: ${reminderList}`);
// // // //         setStatus(`You have ${reminders.length} reminders (${activeCount} active)`);
// // // //       } else {
// // // //         speak("You have no medication reminders yet.");
// // // //       }
// // // //       break;
// // // //     case 'refresh':
// // // //       fetchReminders();
// // // //       speak("Refreshing reminders list");
// // // //       break;
// // // //     case 'clear':
// // // //       setStatus("");
// // // //       speak("Status cleared");
// // // //       break;
// // // //     case 'help':
// // // //       setShowVoiceHelp(true);
// // // //       speak("Showing voice command help. You can say: Add medication, Take medicine at 8 AM, Daily reminder, Save medication, List reminders, or Help.");
// // // //       break;
// // // //     case 'focus_medicine':
// // // //       medicineNameRef.current?.focus();
// // // //       speak("Medicine name field focused. Say the medicine name.");
// // // //       break;
// // // //     case 'focus_time':
// // // //       timeOfDayRef.current?.focus();
// // // //       speak("Time field focused. Say the time.");
// // // //       break;
// // // //     case 'focus_frequency':
// // // //       repeatFrequencyRef.current?.focus();
// // // //       speak("Frequency field focused.");
// // // //       break;
// // // //     case 'focus_dosage':
// // // //       dosageInfoRef.current?.focus();
// // // //       speak("Dosage field focused. Say dosage instructions.");
// // // //       break;
// // // //     case 'focus_duration':
// // // //       durationDaysRef.current?.focus();
// // // //       speak("Duration field focused. Say number of days.");
// // // //       break;
// // // //     case 'complex_new':
// // // //       setFormData({
// // // //         medicine_name: "",
// // // //         time_of_day: "",
// // // //         repeat_frequency: "daily",
// // // //         dosage_info: "",
// // // //         duration_days: 30
// // // //       });
// // // //       setStatus("Ready for new medication. Example: 'Add Dolo 650 at 8 AM daily for 10 days'");
// // // //       speak("Ready for new medication.");
// // // //       break;
// // // //     case 'complex_edit_last':
// // // //       if (reminders.length > 0) {
// // // //         startEditing(reminders[reminders.length - 1]);
// // // //       } else {
// // // //         speak("No reminders to edit.");
// // // //       }
// // // //       break;
// // // //     case 'complex_delete_last':
// // // //       if (reminders.length > 0) {
// // // //         const lastReminder = reminders[reminders.length - 1];
// // // //         deleteReminder(lastReminder.id, lastReminder.medicine_name);
// // // //       } else {
// // // //         speak("No reminders to delete.");
// // // //       }
// // // //       break;
// // // //     case 'complex_toggle_last':
// // // //       if (reminders.length > 0) {
// // // //         const lastReminder = reminders[reminders.length - 1];
// // // //         toggleReminderStatus(lastReminder);
// // // //       } else {
// // // //         speak("No reminders to toggle.");
// // // //       }
// // // //       break;
// // // //     case 'activate_all':
// // // //       activateAllReminders(true);
// // // //       break;
// // // //     case 'deactivate_all':
// // // //       activateAllReminders(false);
// // // //       break;
// // // //     case 'delete_all':
// // // //       if (reminders.length > 0) {
// // // //         if (window.confirm(`Are you sure you want to delete all ${reminders.length} reminders?`)) {
// // // //           deleteAllReminders();
// // // //         }
// // // //       } else {
// // // //         speak("No reminders to delete.");
// // // //       }
// // // //       break;
// // // //     case 'smart_dolo':
// // // //       handleSmartMedicineCommand("Dolo 650", "08:00", "daily", 30, handlers);
// // // //       break;
// // // //     case 'smart_aspirin':
// // // //       handleSmartMedicineCommand("Aspirin", "20:00", "daily", 30, handlers);
// // // //       break;
// // // //     case 'smart_vitamins':
// // // //       handleSmartMedicineCommand("Multivitamins", "09:00", "daily", 30, handlers);
// // // //       break;
// // // //     case 'smart_medicine':
// // // //       setStatus("Please specify medicine name. Example: 'Take Dolo' or 'Take Aspirin'");
// // // //       speak("Please specify medicine name.");
// // // //       break;
// // // //     case 'daily_reminder':
// // // //       setFormData(prev => ({
// // // //         ...prev,
// // // //         repeat_frequency: "daily"
// // // //       }));
// // // //       setStatus("Reminder set to daily. Now say the medicine name and time.");
// // // //       speak("Reminder set to daily. Now say the medicine name and time.");
// // // //       break;
// // // //     case 'delete_reminder':
// // // //       setStatus("Please specify which reminder to delete. Example: 'Delete aspirin' or 'Delete last reminder'");
// // // //       speak("Please specify which reminder to delete. Say delete aspirin or delete last reminder.");
// // // //       break;
// // // //   }
// // // // };

// // // // // Helper functions
// // // // const handleSmartMedicineCommand = (medicine, time, frequency, duration, handlers) => {
// // // //   const { setFormData, setStatus, speak } = handlers;
  
// // // //   setFormData({
// // // //     medicine_name: medicine,
// // // //     time_of_day: time,
// // // //     repeat_frequency: frequency,
// // // //     dosage_info: "1 tablet",
// // // //     duration_days: duration
// // // //   });
  
// // // //   const feedback = `${medicine} set for ${formatTime(time)} ${frequency} for ${duration} days. Say 'save' to confirm.`;
// // // //   setStatus(feedback);
// // // //   speak(feedback);
// // // // };

// // // // const formatTime = (timeString) => {
// // // //   if (!timeString) return "";
// // // //   try {
// // // //     const time = new Date(`2000-01-01T${timeString}`);
// // // //     return time.toLocaleTimeString('en-US', { 
// // // //       hour: '2-digit', 
// // // //       minute: '2-digit',
// // // //       hour12: true 
// // // //     });
// // // //   } catch (e) {
// // // //     return timeString;
// // // //   }
// // // // };

// // // // const parseTimeString = (timeText) => {
// // // //   // Parse time strings like "8 am", "9:30 pm", etc.
// // // //   const timeMatch = timeText.match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)?/i);
// // // //   if (!timeMatch) return null;
  
// // // //   let hours = parseInt(timeMatch[1]);
// // // //   const minutes = timeMatch[2] || "00";
// // // //   const meridiem = timeMatch[3]?.toLowerCase();
  
// // // //   if (meridiem === 'pm' && hours < 12) hours += 12;
// // // //   if (meridiem === 'am' && hours === 12) hours = 0;
  
// // // //   return `${hours.toString().padStart(2, '0')}:${minutes}`;
// // // // };

// // // // // Stop medication voice commands
// // // // export const stopMedicationCommands = () => {
// // // //   voiceService.stopListening();
// // // // };


// // // // src/voice-commands/medicationVoiceCommands.js

// // // import { voiceService } from '../../services/voiceService';

// // // // Enhanced voice command vocabulary with patterns
// // // export const VOICE_COMMANDS = {
// // //   // Navigation commands
// // //   "go back": "back",
// // //   "go to dashboard": "dashboard",
// // //   "logout": "logout",
// // //   "sign out": "logout",
// // //   "exit": "logout",
  
// // //   // Form commands
// // //   "add medication": "add",
// // //   "create reminder": "add",
// // //   "new medication": "add",
// // //   "save medication": "save",
// // //   "submit form": "save",
// // //   "save": "save",
// // //   "update": "save",
// // //   "cancel": "cancel",
// // //   "stop editing": "cancel",
// // //   "clear form": "cancel",
// // //   "reset form": "cancel",
  
// // //   // List commands
// // //   "list reminders": "list",
// // //   "show medications": "list",
// // //   "show all": "list",
// // //   "what are my medications": "list",
// // //   "refresh reminders": "refresh",
// // //   "reload": "refresh",
// // //   "update list": "refresh",
  
// // //   // Status commands
// // //   "clear status": "clear",
// // //   "clear message": "clear",
// // //   "dismiss": "clear",
  
// // //   // Help
// // //   "help": "help",
// // //   "what can I say": "help",
// // //   "show commands": "help",
// // //   "voice help": "help",
// // //   "available commands": "help",
  
// // //   // Form field navigation
// // //   "focus medicine": "focus_medicine",
// // //   "focus medicine name": "focus_medicine",
// // //   "medicine field": "focus_medicine",
// // //   "focus time": "focus_time",
// // //   "time field": "focus_time",
// // //   "focus frequency": "focus_frequency",
// // //   "frequency field": "focus_frequency",
// // //   "focus dosage": "focus_dosage",
// // //   "dosage field": "focus_dosage",
// // //   "focus duration": "focus_duration",
// // //   "duration field": "focus_duration",
  
// // //   // Complex commands
// // //   "create new": "complex_new",
// // //   "make new": "complex_new",
// // //   "add new": "complex_new",
// // //   "edit last": "complex_edit_last",
// // //   "edit last reminder": "complex_edit_last",
// // //   "delete last": "complex_delete_last",
// // //   "delete last reminder": "complex_delete_last",
// // //   "toggle last": "complex_toggle_last",
// // //   "enable last": "complex_toggle_last",
// // //   "disable last": "complex_toggle_last",
  
// // //   // Quick actions for existing reminders
// // //   "activate all": "activate_all",
// // //   "activate all reminders": "activate_all",
// // //   "deactivate all": "deactivate_all",
// // //   "deactivate all reminders": "deactivate_all",
// // //   "delete all": "delete_all",
// // //   "delete all reminders": "delete_all",
// // //   "clear all": "delete_all",
  
// // //   // Smart commands for common medicines
// // //   "take dolo": "smart_dolo",
// // //   "take aspirin": "smart_aspirin",
// // //   "take vitamins": "smart_vitamins",
// // //   "take paracetamol": "smart_dolo",
// // //   "take medicine": "smart_medicine",
// // //   "daily reminder": "daily_reminder",
// // //   "delete reminder": "delete_reminder",
// // // };

// // // // Time patterns mapping
// // // export const TIME_PATTERNS = {
// // //   "morning": "08:00",
// // //   "breakfast": "08:00",
// // //   "morning time": "08:00",
// // //   "afternoon": "14:00",
// // //   "lunch": "13:00",
// // //   "evening": "18:00",
// // //   "dinner": "19:00",
// // //   "night": "22:00",
// // //   "bedtime": "22:00",
// // //   "midnight": "00:00",
// // //   "noon": "12:00",
// // //   "midday": "12:00",
// // //   "in the morning": "08:00",
// // //   "every morning": "08:00",
// // // };

// // // // Frequency patterns
// // // export const FREQUENCY_PATTERNS = {
// // //   "daily": "daily",
// // //   "every day": "daily",
// // //   "day": "daily",
// // //   "weekly": "weekly",
// // //   "every week": "weekly",
// // //   "week": "weekly",
// // //   "monthly": "monthly",
// // //   "every month": "monthly",
// // //   "month": "monthly",
// // //   "once a day": "daily",
// // //   "twice a day": "twice_daily",
// // //   "three times a day": "thrice_daily",
// // // };

// // // // Dynamic patterns for medication commands
// // // export const DYNAMIC_PATTERNS = {
// // //   // Medicine commands: "add dolo", "take aspirin", "create vitamin reminder"
// // //   MEDICINE_COMMAND: /^(add|create|take|start)\s+(.+?)(?:\s+(?:at|for|daily|every|time|reminder))?$/i,
  
// // //   // Time commands: "at 8 am", "time is 9 pm", "set time to morning"
// // //   TIME_COMMAND: /^(?:at|time is|set time to)\s+(.+)$/i,
  
// // //   // Duration commands: "for 10 days", "duration is 20 days"
// // //   DURATION_COMMAND: /^(?:for|duration is)\s+(\d+)\s+(?:day|days)$/i,
  
// // //   // Full natural language: "medicine name is dolo at 8 am daily for 10 days"
// // //   FULL_COMMAND: /^(?:medicine name is|name is)\s+(.+?)\s+(?:at|time is)\s+(.+?)\s+(daily|weekly|monthly)\s+(?:for|duration)\s+(\d+)\s+(?:day|days)$/i,
  
// // //   // Simple command: "dolo 8 am daily"
// // //   SIMPLE_COMMAND: /^(\w+)\s+(\d{1,2})(?::(\d{2}))?\s*(am|pm)\s+(daily|weekly|monthly)$/i,
  
// // //   // Edit command: "edit aspirin", "update dolo"
// // //   EDIT_COMMAND: /^(edit|update|change)\s+(.+)$/i,
  
// // //   // Delete command: "delete aspirin", "remove dolo"
// // //   DELETE_COMMAND: /^(delete|remove|stop)\s+(.+)$/i,
  
// // //   // Take medicine at time: "take medicine at 8 am"
// // //   TAKE_MEDICINE_AT: /^take\s+(?:medicine|medication)\s+at\s+(.+)$/i,
  
// // //   // Daily reminder: "daily reminder"
// // //   DAILY_REMINDER: /^daily\s+reminder$/i,
// // // };

// // // // Initialize medication voice commands
// // // export const initializeMedicationCommands = (handlers) => {
// // //   const {
// // //     handleBackToDashboard,
// // //     handleLogout,
// // //     navigate,
// // //     setStatus,
// // //     speak,
// // //     setFormData,
// // //     formData,
// // //     editingReminder,
// // //     handleSubmit,
// // //     cancelEditing,
// // //     fetchReminders,
// // //     reminders,
// // //     startEditing,
// // //     deleteReminder,
// // //     toggleReminderStatus,
// // //     activateAllReminders,
// // //     deleteAllReminders,
// // //     medicineNameRef,
// // //     timeOfDayRef,
// // //     repeatFrequencyRef,
// // //     dosageInfoRef,
// // //     durationDaysRef,
// // //     setShowVoiceHelp
// // //   } = handlers;

// // //   // Clear existing commands and set feature
// // //   voiceService.setFeature('medication');
// // //   voiceService.clearDynamicHandlers();
// // //   voiceService.clearCommands();

// // //   // Register all static commands
// // //   Object.keys(VOICE_COMMANDS).forEach(command => {
// // //     voiceService.registerCommand(command, () => {
// // //       executeCommand(VOICE_COMMANDS[command], handlers);
// // //     });
// // //   });

// // //   // Register dynamic handlers for medication commands
// // //   voiceService.registerDynamicHandler(
// // //     DYNAMIC_PATTERNS.MEDICINE_COMMAND,
// // //     (matches, transcript) => {
// // //       const action = matches[0].toLowerCase(); // add, create, take, start
// // //       const medicine = matches[1].trim();
      
// // //       if (medicine) {
// // //         setFormData(prev => ({ 
// // //           ...prev, 
// // //           medicine_name: medicine.charAt(0).toUpperCase() + medicine.slice(1)
// // //         }));
// // //         setStatus(`Added ${medicine} to form. Now say the time, like "8 AM"`);
// // //         speak(`Added ${medicine} to form. Now say the time, like 8 AM`);
// // //       }
// // //     }
// // //   );

// // //   voiceService.registerDynamicHandler(
// // //     DYNAMIC_PATTERNS.TIME_COMMAND,
// // //     (matches) => {
// // //       const timeText = matches[0].toLowerCase();
      
// // //       // Check for time keywords
// // //       if (TIME_PATTERNS[timeText]) {
// // //         setFormData(prev => ({ ...prev, time_of_day: TIME_PATTERNS[timeText] }));
// // //         setStatus(`Time set to ${timeText} (${TIME_PATTERNS[timeText]})`);
// // //         speak(`Time set to ${timeText}`);
// // //       } 
// // //       // Check for AM/PM format
// // //       else if (/(\d{1,2})\s*(am|pm)/i.test(timeText)) {
// // //         const timeMatch = timeText.match(/(\d{1,2})\s*(am|pm)/i);
// // //         let hours = parseInt(timeMatch[1]);
// // //         const meridiem = timeMatch[2].toLowerCase();
        
// // //         if (meridiem === 'pm' && hours < 12) hours += 12;
// // //         if (meridiem === 'am' && hours === 12) hours = 0;
        
// // //         const timeString = `${hours.toString().padStart(2, '0')}:00`;
// // //         setFormData(prev => ({ ...prev, time_of_day: timeString }));
        
// // //         const formattedTime = formatTime(timeString);
// // //         setStatus(`Time set to ${formattedTime}`);
// // //         speak(`Time set to ${formattedTime}`);
// // //       }
// // //     }
// // //   );

// // //   voiceService.registerDynamicHandler(
// // //     DYNAMIC_PATTERNS.DURATION_COMMAND,
// // //     (matches) => {
// // //       const days = parseInt(matches[0]);
// // //       setFormData(prev => ({ ...prev, duration_days: days }));
// // //       setStatus(`Duration set to ${days} days`);
// // //       speak(`Duration set to ${days} days`);
// // //     }
// // //   );

// // //   voiceService.registerDynamicHandler(
// // //     DYNAMIC_PATTERNS.FULL_COMMAND,
// // //     (matches) => {
// // //       const [medicine, timeText, frequency, days] = matches;
      
// // //       let timeOfDay = TIME_PATTERNS[timeText.toLowerCase()] || parseTimeString(timeText);
      
// // //       setFormData({
// // //         medicine_name: medicine.charAt(0).toUpperCase() + medicine.slice(1),
// // //         time_of_day: timeOfDay || '08:00',
// // //         repeat_frequency: frequency.toLowerCase(),
// // //         dosage_info: '',
// // //         duration_days: parseInt(days) || 30
// // //       });
      
// // //       setStatus(`Added ${medicine} at ${formatTime(timeOfDay)} ${frequency} for ${days} days. Say "save" to confirm.`);
// // //       speak(`Added ${medicine} at ${formatTime(timeOfDay)} ${frequency} for ${days} days. Say save to confirm.`);
// // //     }
// // //   );

// // //   voiceService.registerDynamicHandler(
// // //     DYNAMIC_PATTERNS.SIMPLE_COMMAND,
// // //     (matches) => {
// // //       const [medicine, hour, minute, meridiem, frequency] = matches;
      
// // //       let hours = parseInt(hour);
// // //       if (meridiem.toLowerCase() === 'pm' && hours < 12) hours += 12;
// // //       if (meridiem.toLowerCase() === 'am' && hours === 12) hours = 0;
      
// // //       const timeString = `${hours.toString().padStart(2, '0')}:${minute || "00"}`;
      
// // //       setFormData(prev => ({
// // //         ...prev,
// // //         medicine_name: medicine.charAt(0).toUpperCase() + medicine.slice(1),
// // //         time_of_day: timeString,
// // //         repeat_frequency: frequency.toLowerCase()
// // //       }));
      
// // //       setStatus(`Added ${medicine} at ${formatTime(timeString)} ${frequency}. Say "save" to confirm.`);
// // //       speak(`Added ${medicine} at ${formatTime(timeString)} ${frequency}. Say save to confirm.`);
// // //     }
// // //   );

// // //   voiceService.registerDynamicHandler(
// // //     DYNAMIC_PATTERNS.EDIT_COMMAND,
// // //     (matches) => {
// // //       const medicineName = matches[1].toLowerCase();
// // //       const reminder = reminders.find(r => 
// // //         r.medicine_name.toLowerCase().includes(medicineName)
// // //       );
      
// // //       if (reminder) {
// // //         startEditing(reminder);
// // //         setStatus(`Editing ${reminder.medicine_name}`);
// // //         speak(`Editing ${reminder.medicine_name}`);
// // //       } else {
// // //         setStatus(`No reminder found for ${medicineName}`);
// // //         speak(`No reminder found for ${medicineName}`);
// // //       }
// // //     }
// // //   );

// // //   voiceService.registerDynamicHandler(
// // //     DYNAMIC_PATTERNS.DELETE_COMMAND,
// // //     (matches) => {
// // //       const medicineName = matches[1].toLowerCase();
// // //       const reminder = reminders.find(r => 
// // //         r.medicine_name.toLowerCase().includes(medicineName)
// // //       );
      
// // //       if (reminder) {
// // //         deleteReminder(reminder.id, reminder.medicine_name);
// // //       } else {
// // //         setStatus(`No reminder found for ${medicineName}`);
// // //         speak(`No reminder found for ${medicineName}`);
// // //       }
// // //     }
// // //   );

// // //   voiceService.registerDynamicHandler(
// // //     DYNAMIC_PATTERNS.TAKE_MEDICINE_AT,
// // //     (matches) => {
// // //       const timeText = matches[0].toLowerCase();
      
// // //       // Check for time keywords
// // //       if (TIME_PATTERNS[timeText]) {
// // //         setFormData(prev => ({ 
// // //           ...prev, 
// // //           time_of_day: TIME_PATTERNS[timeText]
// // //         }));
// // //         setStatus(`Time set to ${timeText} (${TIME_PATTERNS[timeText]}). Now say the medicine name.`);
// // //         speak(`Time set to ${timeText}. Now say the medicine name.`);
// // //       } 
// // //       // Check for AM/PM format
// // //       else if (/(\d{1,2})\s*(am|pm)/i.test(timeText)) {
// // //         const timeMatch = timeText.match(/(\d{1,2})\s*(am|pm)/i);
// // //         let hours = parseInt(timeMatch[1]);
// // //         const meridiem = timeMatch[2].toLowerCase();
        
// // //         if (meridiem === 'pm' && hours < 12) hours += 12;
// // //         if (meridiem === 'am' && hours === 12) hours = 0;
        
// // //         const timeString = `${hours.toString().padStart(2, '0')}:00`;
// // //         setFormData(prev => ({ 
// // //           ...prev, 
// // //           time_of_day: timeString,
// // //           repeat_frequency: "daily"
// // //         }));
        
// // //         const formattedTime = formatTime(timeString);
// // //         setStatus(`Time set to ${formattedTime}. Now say the medicine name.`);
// // //         speak(`Time set to ${formattedTime}. Now say the medicine name.`);
// // //       }
// // //     }
// // //   );

// // //   voiceService.registerDynamicHandler(
// // //     DYNAMIC_PATTERNS.DAILY_REMINDER,
// // //     () => {
// // //       setFormData(prev => ({
// // //         ...prev,
// // //         repeat_frequency: "daily"
// // //       }));
// // //       setStatus("Reminder set to daily. Now say the medicine name and time.");
// // //       speak("Reminder set to daily. Now say the medicine name and time.");
// // //     }
// // //   );

// // //   // Set up the general callback for unhandled commands
// // //   voiceService.onResultCallback = (transcript) => {
// // //     console.log('Unhandled command:', transcript);
// // //     // Fallback: Try to parse as medication command
// // //     if (transcript.includes("medicine") || transcript.includes("medication") || 
// // //         transcript.includes("dolo") || transcript.includes("aspirin") || 
// // //         transcript.includes("vitamin") || transcript.includes("paracetamol")) {
// // //       handleMedicationFallback(transcript, handlers);
// // //     }
// // //   };

// // //   // Start listening
// // //   voiceService.startListening();
// // // };

// // // // Handle medication fallback commands
// // // const handleMedicationFallback = (transcript, handlers) => {
// // //   const { setStatus, speak, setFormData } = handlers;
  
// // //   // Simple pattern matching for common phrases
// // //   const lowerTranscript = transcript.toLowerCase();
  
// // //   // Check for "take [medicine] at [time]"
// // //   const takeAtMatch = lowerTranscript.match(/take\s+(\w+)\s+at\s+(\d{1,2})\s*(am|pm)/i);
// // //   if (takeAtMatch) {
// // //     const [, medicine, hour, meridiem] = takeAtMatch;
// // //     let hours = parseInt(hour);
// // //     if (meridiem.toLowerCase() === 'pm' && hours < 12) hours += 12;
// // //     if (meridiem.toLowerCase() === 'am' && hours === 12) hours = 0;
    
// // //     const timeString = `${hours.toString().padStart(2, '0')}:00`;
    
// // //     setFormData(prev => ({
// // //       ...prev,
// // //       medicine_name: medicine.charAt(0).toUpperCase() + medicine.slice(1),
// // //       time_of_day: timeString,
// // //       repeat_frequency: "daily"
// // //     }));
    
// // //     setStatus(`Added ${medicine} at ${formatTime(timeString)}. Say "save" to confirm.`);
// // //     speak(`Added ${medicine} at ${formatTime(timeString)}. Say save to confirm.`);
// // //     return;
// // //   }
  
// // //   // Check for "[medicine] for [days] days"
// // //   const daysMatch = lowerTranscript.match(/(\w+)\s+for\s+(\d+)\s+days/i);
// // //   if (daysMatch) {
// // //     const [, medicine, days] = daysMatch;
// // //     setFormData(prev => ({
// // //       ...prev,
// // //       medicine_name: medicine.charAt(0).toUpperCase() + medicine.slice(1),
// // //       duration_days: parseInt(days)
// // //     }));
// // //     setStatus(`Added ${medicine} for ${days} days. Now say the time.`);
// // //     speak(`Added ${medicine} for ${days} days. Now say the time.`);
// // //     return;
// // //   }
  
// // //   // If no pattern matched, just show generic help
// // //   setStatus(`Try saying: "Add medication", "Take medicine at 8 AM", or "Help" for more commands.`);
// // //   speak(`Try saying: Add medication, Take medicine at 8 AM, or Help for more commands.`);
// // // };

// // // // Execute command based on command type
// // // const executeCommand = (command, handlers) => {
// // //   const {
// // //     handleBackToDashboard,
// // //     handleLogout,
// // //     navigate,
// // //     setStatus,
// // //     speak,
// // //     setFormData,
// // //     formData,
// // //     editingReminder,
// // //     handleSubmit,
// // //     cancelEditing,
// // //     fetchReminders,
// // //     reminders,
// // //     startEditing,
// // //     deleteReminder,
// // //     toggleReminderStatus,
// // //     activateAllReminders,
// // //     deleteAllReminders,
// // //     medicineNameRef,
// // //     timeOfDayRef,
// // //     repeatFrequencyRef,
// // //     dosageInfoRef,
// // //     durationDaysRef,
// // //     setShowVoiceHelp
// // //   } = handlers;

// // //   switch(command) {
// // //     case 'back':
// // //       handleBackToDashboard();
// // //       break;
// // //     case 'dashboard':
// // //       navigate("/dashboard");
// // //       speak("Going back to dashboard");
// // //       break;
// // //     case 'logout':
// // //       handleLogout();
// // //       break;
// // //     case 'add':
// // //       if (editingReminder) {
// // //         setStatus("Currently editing a reminder. Say 'cancel' first or 'save' to update.");
// // //         speak("Currently editing a reminder. Say cancel first or save to update.");
// // //       } else {
// // //         setStatus("Ready for medication details. Say: 'Add Dolo daily at 8 AM'");
// // //         speak("Ready for medication details. Say: Add Dolo daily at 8 AM.");
// // //       }
// // //       break;
// // //     case 'save':
// // //       if (formData.medicine_name) {
// // //         handleSubmit();
// // //       } else {
// // //         setStatus("Please specify a medicine name first. Say 'Medicine name is [name]'");
// // //         speak("Please specify a medicine name first.");
// // //       }
// // //       break;
// // //     case 'cancel':
// // //       if (editingReminder) {
// // //         cancelEditing();
// // //       } else {
// // //         setFormData({
// // //           medicine_name: "",
// // //           time_of_day: "",
// // //           repeat_frequency: "daily",
// // //           dosage_info: "",
// // //           duration_days: 30
// // //         });
// // //         setStatus("Form cleared.");
// // //         speak("Form cleared.");
// // //       }
// // //       break;
// // //     case 'list':
// // //       if (reminders.length > 0) {
// // //         const activeCount = reminders.filter(r => r.active).length;
// // //         const reminderList = reminders.slice(0, 3).map(r => 
// // //           `${r.medicine_name} at ${formatTime(r.time_of_day)}`
// // //         ).join(", ");
        
// // //         speak(`You have ${reminders.length} medication reminders. ${activeCount} are active. Recent: ${reminderList}`);
// // //         setStatus(`You have ${reminders.length} reminders (${activeCount} active)`);
// // //       } else {
// // //         speak("You have no medication reminders yet.");
// // //       }
// // //       break;
// // //     case 'refresh':
// // //       fetchReminders();
// // //       speak("Refreshing reminders list");
// // //       break;
// // //     case 'clear':
// // //       setStatus("");
// // //       speak("Status cleared");
// // //       break;
// // //     case 'help':
// // //       setShowVoiceHelp(true);
// // //       speak("Showing voice command help. You can say: Add medication, Take medicine at 8 AM, Daily reminder, Save medication, List reminders, or Help.");
// // //       break;
// // //     case 'focus_medicine':
// // //       medicineNameRef.current?.focus();
// // //       speak("Medicine name field focused. Say the medicine name.");
// // //       break;
// // //     case 'focus_time':
// // //       timeOfDayRef.current?.focus();
// // //       speak("Time field focused. Say the time.");
// // //       break;
// // //     case 'focus_frequency':
// // //       repeatFrequencyRef.current?.focus();
// // //       speak("Frequency field focused.");
// // //       break;
// // //     case 'focus_dosage':
// // //       dosageInfoRef.current?.focus();
// // //       speak("Dosage field focused. Say dosage instructions.");
// // //       break;
// // //     case 'focus_duration':
// // //       durationDaysRef.current?.focus();
// // //       speak("Duration field focused. Say number of days.");
// // //       break;
// // //     case 'complex_new':
// // //       setFormData({
// // //         medicine_name: "",
// // //         time_of_day: "",
// // //         repeat_frequency: "daily",
// // //         dosage_info: "",
// // //         duration_days: 30
// // //       });
// // //       setStatus("Ready for new medication. Example: 'Add Dolo 650 at 8 AM daily for 10 days'");
// // //       speak("Ready for new medication.");
// // //       break;
// // //     case 'complex_edit_last':
// // //       if (reminders.length > 0) {
// // //         startEditing(reminders[reminders.length - 1]);
// // //       } else {
// // //         speak("No reminders to edit.");
// // //       }
// // //       break;
// // //     case 'complex_delete_last':
// // //       if (reminders.length > 0) {
// // //         const lastReminder = reminders[reminders.length - 1];
// // //         deleteReminder(lastReminder.id, lastReminder.medicine_name);
// // //       } else {
// // //         speak("No reminders to delete.");
// // //       }
// // //       break;
// // //     case 'complex_toggle_last':
// // //       if (reminders.length > 0) {
// // //         const lastReminder = reminders[reminders.length - 1];
// // //         toggleReminderStatus(lastReminder);
// // //       } else {
// // //         speak("No reminders to toggle.");
// // //       }
// // //       break;
// // //     case 'activate_all':
// // //       activateAllReminders(true);
// // //       break;
// // //     case 'deactivate_all':
// // //       activateAllReminders(false);
// // //       break;
// // //     case 'delete_all':
// // //       if (reminders.length > 0) {
// // //         if (window.confirm(`Are you sure you want to delete all ${reminders.length} reminders?`)) {
// // //           deleteAllReminders();
// // //         }
// // //       } else {
// // //         speak("No reminders to delete.");
// // //       }
// // //       break;
// // //     case 'smart_dolo':
// // //       handleSmartMedicineCommand("Dolo 650", "08:00", "daily", 30, handlers);
// // //       break;
// // //     case 'smart_aspirin':
// // //       handleSmartMedicineCommand("Aspirin", "20:00", "daily", 30, handlers);
// // //       break;
// // //     case 'smart_vitamins':
// // //       handleSmartMedicineCommand("Multivitamins", "09:00", "daily", 30, handlers);
// // //       break;
// // //     case 'smart_medicine':
// // //       setStatus("Please specify medicine name. Example: 'Take Dolo' or 'Take Aspirin'");
// // //       speak("Please specify medicine name.");
// // //       break;
// // //     case 'daily_reminder':
// // //       setFormData(prev => ({
// // //         ...prev,
// // //         repeat_frequency: "daily"
// // //       }));
// // //       setStatus("Reminder set to daily. Now say the medicine name and time.");
// // //       speak("Reminder set to daily. Now say the medicine name and time.");
// // //       break;
// // //     case 'delete_reminder':
// // //       setStatus("Please specify which reminder to delete. Example: 'Delete aspirin' or 'Delete last reminder'");
// // //       speak("Please specify which reminder to delete. Say delete aspirin or delete last reminder.");
// // //       break;
// // //   }
// // // };

// // // // Helper functions
// // // const handleSmartMedicineCommand = (medicine, time, frequency, duration, handlers) => {
// // //   const { setFormData, setStatus, speak } = handlers;
  
// // //   setFormData({
// // //     medicine_name: medicine,
// // //     time_of_day: time,
// // //     repeat_frequency: frequency,
// // //     dosage_info: "1 tablet",
// // //     duration_days: duration
// // //   });
  
// // //   const feedback = `${medicine} set for ${formatTime(time)} ${frequency} for ${duration} days. Say 'save' to confirm.`;
// // //   setStatus(feedback);
// // //   speak(feedback);
// // // };

// // // const formatTime = (timeString) => {
// // //   if (!timeString) return "";
// // //   try {
// // //     const time = new Date(`2000-01-01T${timeString}`);
// // //     return time.toLocaleTimeString('en-US', { 
// // //       hour: '2-digit', 
// // //       minute: '2-digit',
// // //       hour12: true 
// // //     });
// // //   } catch (e) {
// // //     return timeString;
// // //   }
// // // };

// // // const parseTimeString = (timeText) => {
// // //   // Parse time strings like "8 am", "9:30 pm", etc.
// // //   const timeMatch = timeText.match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)?/i);
// // //   if (!timeMatch) return null;
  
// // //   let hours = parseInt(timeMatch[1]);
// // //   const minutes = timeMatch[2] || "00";
// // //   const meridiem = timeMatch[3]?.toLowerCase();
  
// // //   if (meridiem === 'pm' && hours < 12) hours += 12;
// // //   if (meridiem === 'am' && hours === 12) hours = 0;
  
// // //   return `${hours.toString().padStart(2, '0')}:${minutes}`;
// // // };

// // // // Stop medication voice commands
// // // export const stopMedicationCommands = () => {
// // //   voiceService.stopListening();
// // // };


// // src/voice-commands/medicationVoiceCommands.js

// import { voiceService } from '../services/voiceService';

// // Enhanced voice command vocabulary with patterns
// export const MEDICATION_COMMANDS = {
//   // Navigation commands
//   "go back": "back",
//   "go to dashboard": "dashboard",
//   "dashboard": "dashboard",
//   "back": "back",
//   "back to dashboard": "back",
//   "return": "back",
//   "return to dashboard": "back",
//   "home": "dashboard",
//   "go home": "dashboard",
//   "main menu": "dashboard",
//   "main screen": "dashboard",
//   "logout": "logout",
//   "sign out": "logout",
//   "exit": "logout",
  
//   // Form commands
//   "add medication": "add_medication",
//   "create reminder": "add_medication",
//   "new medication": "add_medication",
//   "save medication": "save_medication",
//   "submit form": "save_medication",
//   "save": "save_medication",
//   "update": "save_medication",
//   "cancel": "cancel",
//   "stop editing": "cancel",
//   "clear form": "cancel",
//   "reset form": "cancel",
  
//   // List commands
//   "list reminders": "list_reminders",
//   "show medications": "list_reminders",
//   "show all": "list_reminders",
//   "what are my medications": "list_reminders",
//   "refresh reminders": "refresh_reminders",
//   "reload": "refresh_reminders",
//   "update list": "refresh_reminders",
  
//   // Status commands
//   "clear status": "clear_status",
//   "clear message": "clear_status",
//   "dismiss": "clear_status",
  
//   // Help
//   "help": "help",
//   "what can I say": "help",
//   "show commands": "help",
//   "voice help": "help",
//   "available commands": "help",
  
//   // Form field navigation
//   "focus medicine": "focus_medicine",
//   "focus medicine name": "focus_medicine",
//   "medicine field": "focus_medicine",
//   "focus time": "focus_time",
//   "time field": "focus_time",
//   "focus frequency": "focus_frequency",
//   "frequency field": "focus_frequency",
//   "focus dosage": "focus_dosage",
//   "dosage field": "focus_dosage",
//   "focus duration": "focus_duration",
//   "duration field": "focus_duration",
  
//   // Complex commands
//   "create new": "complex_new",
//   "make new": "complex_new",
//   "add new": "complex_new",
//   "edit last": "complex_edit_last",
//   "delete last": "complex_delete_last",
//   "toggle last": "complex_toggle_last",
//   "enable last": "complex_toggle_last",
//   "disable last": "complex_toggle_last",
  
//   // Quick actions for existing reminders
//   "activate all": "activate_all",
//   "deactivate all": "deactivate_all",
//   "delete all": "delete_all",
//   "clear all": "delete_all",
  
//   // Smart commands for common medicines
//   "take dolo": "smart_dolo",
//   "take aspirin": "smart_aspirin",
//   "take vitamins": "smart_vitamins",
//   "take paracetamol": "smart_dolo",
//   "take medicine": "smart_medicine",
// };

// // Time patterns mapping
// export const TIME_PATTERNS = {
//   "morning": "08:00",
//   "breakfast": "08:00",
//   "morning time": "08:00",
//   "afternoon": "14:00",
//   "lunch": "13:00",
//   "evening": "18:00",
//   "dinner": "19:00",
//   "night": "22:00",
//   "bedtime": "22:00",
//   "midnight": "00:00",
//   "noon": "12:00",
//   "midday": "12:00",
//   "8 am": "08:00",
//   "9 am": "09:00",
//   "9:00 a.m": "09:00",
//   "10 am": "10:00",
//   "11 am": "11:00",
//   "12 pm": "12:00",
//   "1 pm": "13:00",
//   "2 pm": "14:00",
//   "3 pm": "15:00",
//   "4 pm": "16:00",
//   "5 pm": "17:00",
//   "6 pm": "18:00",
//   "7 pm": "19:00",
//   "8 pm": "20:00",
//   "9 pm": "21:00",
//   "10 pm": "22:00",
// };

// // Frequency patterns
// export const FREQUENCY_PATTERNS = {
//   "daily": "daily",
//   "every day": "daily",
//   "day": "daily",
//   "weekly": "weekly",
//   "every week": "weekly",
//   "week": "weekly",
//   "monthly": "monthly",
//   "every month": "monthly",
//   "month": "monthly",
//   "once a day": "daily",
//   "twice a day": "twice_daily",
//   "three times a day": "thrice_daily",
// };

// // Dynamic patterns for medication commands
// export const DYNAMIC_PATTERNS = {
//   // Medicine commands: "add dolo", "take aspirin", "create vitamin reminder"
//   MEDICINE_COMMAND: /^(add|create|take|start)\s+(.+?)(?:\s+(?:at|for|daily|every|time|reminder))?$/i,
  
//   // Time commands: "at 8 am", "time is 9 pm", "set time to morning"
//   TIME_COMMAND: /^(?:at|time is|set time to|time)\s+(.+?)(?:\s+(?:am|pm))?$/i,
  
//   // Duration commands: "for 10 days", "duration is 20 days"
//   DURATION_COMMAND: /^(?:for|duration is|duration)\s+(\d+)\s+(?:day|days)$/i,
  
//   // Full natural language: "medicine name is dolo at 8 am daily for 10 days"
//   FULL_COMMAND: /^(?:medicine name is|name is)\s+(.+?)\s+(?:at|time is)\s+(.+?)\s+(daily|weekly|monthly)\s+(?:for|duration)\s+(\d+)\s+(?:day|days)$/i,
  
//   // Simple command: "dolo 8 am daily"
//   SIMPLE_COMMAND: /^(\w+)\s+(\d{1,2})(?::(\d{2}))?\s*(am|pm)\s+(daily|weekly|monthly)$/i,
  
//   // Edit command: "edit aspirin", "update dolo"
//   EDIT_COMMAND: /^(edit|update|change)\s+(.+)$/i,
  
//   // Delete command: "delete aspirin", "remove dolo"
//   DELETE_COMMAND: /^(delete|remove|stop)\s+(.+)$/i,
  
//   // Medicine name: "medicine name is aspirin" or "name is aspirin"
//   MEDICINE_NAME: /^(?:medicine name is|name is)\s+(.+)$/i,
  
//   // Dosage command: "take 1 tablet" or "dosage is 2 tablets"
//   DOSAGE_COMMAND: /^(?:take|dosage is|dosage)\s+(.+)$/i,
// };

// // Initialize medication voice commands
// export const initializeMedicationCommands = (handlers) => {
//   console.log('[MedicationCommands] Initializing medication voice commands');
  
//   const {
//     handleBackToDashboard,
//     handleLogout,
//     navigate,
//     setStatus,
//     speak,
//     setFormData,
//     formData,
//     editingReminder,
//     handleSubmit,
//     cancelEditing,
//     fetchReminders,
//     reminders,
//     startEditing,
//     deleteReminder,
//     toggleReminderStatus,
//     activateAllReminders,
//     deleteAllReminders,
//     medicineNameRef,
//     timeOfDayRef,
//     repeatFrequencyRef,
//     dosageInfoRef,
//     durationDaysRef,
//     setShowVoiceHelp
//   } = handlers;

//   // Stop any existing listening
//   voiceService.stopListening();
  
//   // Clear existing commands and set feature
//   voiceService.setFeature('medication');
//   voiceService.clearCommands();
//   voiceService.clearDynamicHandlers();

//   // Register all static commands
//   console.log('[MedicationCommands] Registering static commands...');
//   Object.keys(MEDICATION_COMMANDS).forEach(command => {
//     voiceService.registerCommand(command, () => {
//       console.log(`[MedicationCommands] Executing command: ${command}`);
//       executeCommand(MEDICATION_COMMANDS[command], handlers);
//     });
//   });

//   // Register dynamic handlers for medication commands
//   console.log('[MedicationCommands] Registering dynamic handlers...');
  
//   voiceService.registerDynamicHandler(
//     DYNAMIC_PATTERNS.MEDICINE_COMMAND,
//     (matches, transcript) => {
//       console.log('[MedicationCommands] Medicine command matched:', transcript);
//       const action = matches[0]?.toLowerCase() || 'add';
//       const medicine = matches[1]?.trim();
      
//       if (medicine) {
//         const formattedMedicine = medicine.charAt(0).toUpperCase() + medicine.slice(1);
//         setFormData(prev => ({ 
//           ...prev, 
//           medicine_name: formattedMedicine
//         }));
//         const message = `Added ${formattedMedicine} to form. Now say the time, like "8 AM"`;
//         setStatus(message);
//         speak(message);
//       }
//     }
//   );

//   voiceService.registerDynamicHandler(
//     DYNAMIC_PATTERNS.TIME_COMMAND,
//     (matches, transcript) => {
//       console.log('[MedicationCommands] Time command matched:', transcript);
//       const timeText = matches[0]?.toLowerCase();
      
//       if (!timeText) return;
      
//       // Check for time keywords
//       if (TIME_PATTERNS[timeText]) {
//         setFormData(prev => ({ ...prev, time_of_day: TIME_PATTERNS[timeText] }));
//         const message = `Time set to ${timeText} (${TIME_PATTERNS[timeText]})`;
//         setStatus(message);
//         speak(`Time set to ${timeText}`);
//       } 
//       // Check for AM/PM format
//       else if (/(\d{1,2})\s*(am|pm)/i.test(timeText)) {
//         const timeMatch = timeText.match(/(\d{1,2})\s*(am|pm)/i);
//         let hours = parseInt(timeMatch[1]);
//         const meridiem = timeMatch[2].toLowerCase();
        
//         if (meridiem === 'pm' && hours < 12) hours += 12;
//         if (meridiem === 'am' && hours === 12) hours = 0;
        
//         const timeString = `${hours.toString().padStart(2, '0')}:00`;
//         setFormData(prev => ({ ...prev, time_of_day: timeString }));
        
//         const formattedTime = formatTime(timeString);
//         const message = `Time set to ${formattedTime}`;
//         setStatus(message);
//         speak(`Time set to ${formattedTime}`);
//       }
//     }
//   );

//   voiceService.registerDynamicHandler(
//     DYNAMIC_PATTERNS.DURATION_COMMAND,
//     (matches, transcript) => {
//       console.log('[MedicationCommands] Duration command matched:', transcript);
//       const days = parseInt(matches[0]);
//       if (!isNaN(days) && days > 0) {
//         setFormData(prev => ({ ...prev, duration_days: days }));
//         const message = `Duration set to ${days} days`;
//         setStatus(message);
//         speak(message);
//       }
//     }
//   );

//   voiceService.registerDynamicHandler(
//     DYNAMIC_PATTERNS.FULL_COMMAND,
//     (matches, transcript) => {
//       console.log('[MedicationCommands] Full command matched:', transcript);
//       const [medicine, timeText, frequency, days] = matches;
      
//       let timeOfDay = TIME_PATTERNS[timeText.toLowerCase()] || parseTimeString(timeText);
      
//       if (!timeOfDay) {
//         timeOfDay = '08:00';
//       }
      
//       const formattedMedicine = medicine.charAt(0).toUpperCase() + medicine.slice(1);
      
//       setFormData({
//         medicine_name: formattedMedicine,
//         time_of_day: timeOfDay,
//         repeat_frequency: frequency.toLowerCase(),
//         dosage_info: '',
//         duration_days: parseInt(days) || 30
//       });
      
//       const formattedTime = formatTime(timeOfDay);
//       const message = `Added ${formattedMedicine} at ${formattedTime} ${frequency} for ${days} days. Say "save" to confirm.`;
//       setStatus(message);
//       speak(`Added ${formattedMedicine} at ${formattedTime} ${frequency} for ${days} days. Say save to confirm.`);
//     }
//   );

//   voiceService.registerDynamicHandler(
//     DYNAMIC_PATTERNS.SIMPLE_COMMAND,
//     (matches, transcript) => {
//       console.log('[MedicationCommands] Simple command matched:', transcript);
//       const [medicine, hour, minute, meridiem, frequency] = matches;
      
//       let hours = parseInt(hour);
//       if (meridiem.toLowerCase() === 'pm' && hours < 12) hours += 12;
//       if (meridiem.toLowerCase() === 'am' && hours === 12) hours = 0;
      
//       const timeString = `${hours.toString().padStart(2, '0')}:${minute || "00"}`;
      
//       setFormData(prev => ({
//         ...prev,
//         medicine_name: medicine.charAt(0).toUpperCase() + medicine.slice(1),
//         time_of_day: timeString,
//         repeat_frequency: frequency.toLowerCase()
//       }));
      
//       const formattedTime = formatTime(timeString);
//       const message = `Added ${medicine} at ${formattedTime} ${frequency}. Say "save" to confirm.`;
//       setStatus(message);
//       speak(`Added ${medicine} at ${formattedTime} ${frequency}. Say save to confirm.`);
//     }
//   );

//   voiceService.registerDynamicHandler(
//     DYNAMIC_PATTERNS.EDIT_COMMAND,
//     (matches, transcript) => {
//       console.log('[MedicationCommands] Edit command matched:', transcript);
//       const medicineName = matches[1]?.toLowerCase();
//       if (!medicineName) return;
      
//       const reminder = reminders.find(r => 
//         r.medicine_name.toLowerCase().includes(medicineName)
//       );
      
//       if (reminder) {
//         startEditing(reminder);
//         const message = `Editing ${reminder.medicine_name}`;
//         setStatus(message);
//         speak(message);
//       } else {
//         const message = `No reminder found for ${medicineName}`;
//         setStatus(message);
//         speak(message);
//       }
//     }
//   );

//   voiceService.registerDynamicHandler(
//     DYNAMIC_PATTERNS.DELETE_COMMAND,
//     (matches, transcript) => {
//       console.log('[MedicationCommands] Delete command matched:', transcript);
//       const medicineName = matches[1]?.toLowerCase();
//       if (!medicineName) return;
      
//       const reminder = reminders.find(r => 
//         r.medicine_name.toLowerCase().includes(medicineName)
//       );
      
//       if (reminder) {
//         deleteReminder(reminder.id, reminder.medicine_name);
//       } else {
//         const message = `No reminder found for ${medicineName}`;
//         setStatus(message);
//         speak(message);
//       }
//     }
//   );

//   voiceService.registerDynamicHandler(
//     DYNAMIC_PATTERNS.MEDICINE_NAME,
//     (matches, transcript) => {
//       console.log('[MedicationCommands] Medicine name command matched:', transcript);
//       const medicine = matches[0]?.trim();
//       if (medicine) {
//         const formattedMedicine = medicine.charAt(0).toUpperCase() + medicine.slice(1);
//         setFormData(prev => ({ 
//           ...prev, 
//           medicine_name: formattedMedicine
//         }));
//         const message = `Medicine name set to ${formattedMedicine}`;
//         setStatus(message);
//         speak(message);
//       }
//     }
//   );

//   voiceService.registerDynamicHandler(
//     DYNAMIC_PATTERNS.DOSAGE_COMMAND,
//     (matches, transcript) => {
//       console.log('[MedicationCommands] Dosage command matched:', transcript);
//       const dosage = matches[0]?.trim();
//       if (dosage) {
//         setFormData(prev => ({ 
//           ...prev, 
//           dosage_info: dosage
//         }));
//         const message = `Dosage set to ${dosage}`;
//         setStatus(message);
//         speak(message);
//       }
//     }
//   );

//   // Set up the general callback for unhandled commands
//   voiceService.onResultCallback = (transcript) => {
//     console.log('[MedicationCommands] Unhandled command:', transcript);
//     // Try to process as a generic command
//     const lowerTranscript = transcript.toLowerCase();
    
//     // Check for frequency
//     if (FREQUENCY_PATTERNS[lowerTranscript]) {
//       const frequency = FREQUENCY_PATTERNS[lowerTranscript];
//       setFormData(prev => ({ ...prev, repeat_frequency: frequency }));
//       const message = `Frequency set to ${frequency}`;
//       setStatus(message);
//       speak(message);
//       return;
//     }
    
//     // Check for number of days
//     const daysMatch = lowerTranscript.match(/\b(\d+)\s*days?\b/);
//     if (daysMatch) {
//       const days = parseInt(daysMatch[1]);
//       setFormData(prev => ({ ...prev, duration_days: days }));
//       const message = `Duration set to ${days} days`;
//       setStatus(message);
//       speak(message);
//       return;
//     }
    
//     // If nothing matched, provide feedback
//     const message = `I didn't understand "${transcript}". Try saying "help" for available commands.`;
//     setStatus(message);
//     speak(message);
//   };

//   // Start listening
//   console.log('[MedicationCommands] Starting voice listening...');
//   setTimeout(() => {
//     voiceService.startListening();
//   }, 300);
// };

// // Execute command based on command type
// const executeCommand = (command, handlers) => {
//   console.log(`[MedicationCommands] Executing command: ${command}`);
  
//   const {
//     handleBackToDashboard,
//     handleLogout,
//     navigate,
//     setStatus,
//     speak,
//     setFormData,
//     formData,
//     editingReminder,
//     handleSubmit,
//     cancelEditing,
//     fetchReminders,
//     reminders,
//     startEditing,
//     deleteReminder,
//     toggleReminderStatus,
//     activateAllReminders,
//     deleteAllReminders,
//     medicineNameRef,
//     timeOfDayRef,
//     repeatFrequencyRef,
//     dosageInfoRef,
//     durationDaysRef,
//     setShowVoiceHelp
//   } = handlers;

//   switch(command) {
//     case 'back':
//       handleBackToDashboard();
//       break;
//     case 'dashboard':
//       navigate("/dashboard");
//       break;
//     case 'logout':
//       handleLogout();
//       break;
//     case 'add_medication':
//       if (editingReminder) {
//         const message = "Currently editing a reminder. Say 'cancel' first or 'save' to update.";
//         setStatus(message);
//         speak(message);
//       } else {
//         const message = "Ready for medication details. Say: 'Add Dolo daily at 8 AM'";
//         setStatus(message);
//         speak("Ready for medication details. Say: Add Dolo daily at 8 AM.");
//       }
//       break;
//     case 'save_medication':
//       if (formData.medicine_name) {
//         handleSubmit();
//       } else {
//         const message = "Please specify a medicine name first. Say 'Medicine name is [name]'";
//         setStatus(message);
//         speak("Please specify a medicine name first.");
//       }
//       break;
//     case 'cancel':
//       if (editingReminder) {
//         cancelEditing();
//       } else {
//         setFormData({
//           medicine_name: "",
//           time_of_day: "",
//           repeat_frequency: "daily",
//           dosage_info: "",
//           duration_days: 30
//         });
//         const message = "Form cleared.";
//         setStatus(message);
//         speak("Form cleared.");
//       }
//       break;
//     case 'list_reminders':
//       if (reminders.length > 0) {
//         const activeCount = reminders.filter(r => r.active).length;
//         const reminderList = reminders.slice(0, 3).map(r => 
//           `${r.medicine_name} at ${formatTime(r.time_of_day)}`
//         ).join(", ");
        
//         const message = `You have ${reminders.length} medication reminders. ${activeCount} are active. Recent: ${reminderList}`;
//         speak(message);
//         setStatus(`You have ${reminders.length} reminders (${activeCount} active)`);
//       } else {
//         const message = "You have no medication reminders yet.";
//         speak(message);
//         setStatus(message);
//       }
//       break;
//     case 'refresh_reminders':
//       fetchReminders();
//       break;
//     case 'clear_status':
//       setStatus("");
//       break;
//     case 'help':
//       setShowVoiceHelp(true);
//       speak("Voice command examples shown.");
//       break;
//     case 'focus_medicine':
//       medicineNameRef.current?.focus();
//       speak("Medicine name field focused. Say the medicine name.");
//       break;
//     case 'focus_time':
//       timeOfDayRef.current?.focus();
//       speak("Time field focused. Say the time.");
//       break;
//     case 'focus_frequency':
//       repeatFrequencyRef.current?.focus();
//       speak("Frequency field focused.");
//       break;
//     case 'focus_dosage':
//       dosageInfoRef.current?.focus();
//       speak("Dosage field focused. Say dosage instructions.");
//       break;
//     case 'focus_duration':
//       durationDaysRef.current?.focus();
//       speak("Duration field focused. Say number of days.");
//       break;
//     case 'complex_new':
//       setFormData({
//         medicine_name: "",
//         time_of_day: "",
//         repeat_frequency: "daily",
//         dosage_info: "",
//         duration_days: 30
//       });
//       const message = "Ready for new medication. Example: 'Add Dolo 650 at 8 AM daily for 10 days'";
//       setStatus(message);
//       speak("Ready for new medication.");
//       break;
//     case 'complex_edit_last':
//       if (reminders.length > 0) {
//         startEditing(reminders[reminders.length - 1]);
//       } else {
//         speak("No reminders to edit.");
//       }
//       break;
//     case 'complex_delete_last':
//       if (reminders.length > 0) {
//         const lastReminder = reminders[reminders.length - 1];
//         deleteReminder(lastReminder.id, lastReminder.medicine_name);
//       } else {
//         speak("No reminders to delete.");
//       }
//       break;
//     case 'complex_toggle_last':
//       if (reminders.length > 0) {
//         const lastReminder = reminders[reminders.length - 1];
//         toggleReminderStatus(lastReminder);
//       } else {
//         speak("No reminders to toggle.");
//       }
//       break;
//     case 'activate_all':
//       activateAllReminders(true);
//       break;
//     case 'deactivate_all':
//       activateAllReminders(false);
//       break;
//     case 'delete_all':
//       if (reminders.length > 0) {
//         if (window.confirm(`Are you sure you want to delete all ${reminders.length} reminders?`)) {
//           deleteAllReminders();
//         }
//       } else {
//         speak("No reminders to delete.");
//       }
//       break;
//     case 'smart_dolo':
//       handleSmartMedicineCommand("Dolo 650", "08:00", "daily", 30, handlers);
//       break;
//     case 'smart_aspirin':
//       handleSmartMedicineCommand("Aspirin", "20:00", "daily", 30, handlers);
//       break;
//     case 'smart_vitamins':
//       handleSmartMedicineCommand("Multivitamins", "09:00", "daily", 30, handlers);
//       break;
//     case 'smart_medicine':
//       const msg = "Please specify medicine name. Example: 'Take Dolo' or 'Take Aspirin'";
//       setStatus(msg);
//       speak("Please specify medicine name.");
//       break;
//     default:
//       console.log(`[MedicationCommands] Unknown command: ${command}`);
//   }
// };

// // Helper functions
// const handleSmartMedicineCommand = (medicine, time, frequency, duration, handlers) => {
//   const { setFormData, setStatus, speak } = handlers;
  
//   setFormData({
//     medicine_name: medicine,
//     time_of_day: time,
//     repeat_frequency: frequency,
//     dosage_info: "1 tablet",
//     duration_days: duration
//   });
  
//   const formattedTime = formatTime(time);
//   const feedback = `${medicine} set for ${formattedTime} ${frequency} for ${duration} days. Say 'save' to confirm.`;
//   setStatus(feedback);
//   speak(feedback);
// };

// const formatTime = (timeString) => {
//   if (!timeString) return "";
//   try {
//     const time = new Date(`2000-01-01T${timeString}`);
//     return time.toLocaleTimeString('en-US', { 
//       hour: '2-digit', 
//       minute: '2-digit',
//       hour12: true 
//     });
//   } catch (e) {
//     return timeString;
//   }
// };

// const parseTimeString = (timeText) => {
//   if (!timeText) return null;
  
//   // Parse time strings like "8 am", "9:30 pm", etc.
//   const timeMatch = timeText.match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)?/i);
//   if (!timeMatch) return null;
  
//   let hours = parseInt(timeMatch[1]);
//   const minutes = timeMatch[2] || "00";
//   const meridiem = timeMatch[3]?.toLowerCase();
  
//   if (meridiem === 'pm' && hours < 12) hours += 12;
//   if (meridiem === 'am' && hours === 12) hours = 0;
  
//   return `${hours.toString().padStart(2, '0')}:${minutes}`;
// };

// // Stop medication voice commands
// export const stopMedicationCommands = () => {
//   console.log('[MedicationCommands] Stopping medication voice commands');
//   voiceService.stopListening();
// };



// src/voice-commands/medicationVoiceCommands.js

import { voiceService } from '../services/voiceService';

// Enhanced voice command vocabulary with patterns
export const MEDICATION_COMMANDS = {
  // Navigation commands
  "go back": "back",
  "go to dashboard": "dashboard",
  "dashboard": "dashboard",
  "back": "back",
  "back to dashboard": "back",
  "return": "back",
  "return to dashboard": "back",
  "home": "dashboard",
  "go home": "dashboard",
  "main menu": "dashboard",
  "main screen": "dashboard",
  "logout": "logout",
  "sign out": "logout",
  "exit": "logout",
  
  // Form commands
  "add medication": "add_medication",
  "create reminder": "add_medication",
  "new medication": "add_medication",
  "save medication": "save_medication",
  "submit form": "save_medication",
  "save": "save_medication",
  "update": "save_medication",
  "cancel": "cancel",
  "stop editing": "cancel",
  "clear form": "cancel",
  "reset form": "cancel",
  
  // List commands
  "list reminders": "list_reminders",
  "show medications": "list_reminders",
  "show all": "list_reminders",
  "what are my medications": "list_reminders",
  "refresh reminders": "refresh_reminders",
  "reload": "refresh_reminders",
  "update list": "refresh_reminders",
  
  // Status commands
  "clear status": "clear_status",
  "clear message": "clear_status",
  "dismiss": "clear_status",
  
  // Help
  "help": "help",
  "what can I say": "help",
  "show commands": "help",
  "voice help": "help",
  "available commands": "help",
  
  // Form field navigation
  "focus medicine": "focus_medicine",
  "focus medicine name": "focus_medicine",
  "medicine field": "focus_medicine",
  "focus time": "focus_time",
  "time field": "focus_time",
  "focus frequency": "focus_frequency",
  "frequency field": "focus_frequency",
  "focus dosage": "focus_dosage",
  "dosage field": "focus_dosage",
  "focus duration": "focus_duration",
  "duration field": "focus_duration",
  
  // Complex commands
  "create new": "complex_new",
  "make new": "complex_new",
  "add new": "complex_new",
  "edit last": "complex_edit_last",
  "delete last": "complex_delete_last",
  "toggle last": "complex_toggle_last",
  "enable last": "complex_toggle_last",
  "disable last": "complex_toggle_last",
  
  // Quick actions for existing reminders
  "activate all": "activate_all",
  "deactivate all": "deactivate_all",
  "delete all": "delete_all",
  "clear all": "delete_all",
  
  // Smart commands for common medicines
  "take dolo": "smart_dolo",
  "take aspirin": "smart_aspirin",
  "take vitamins": "smart_vitamins",
  "take paracetamol": "smart_dolo",
  "take medicine": "smart_medicine",
  
  // Time commands (direct matches)
  "morning": "set_morning",
  "afternoon": "set_afternoon",
  "evening": "set_evening",
  "night": "set_night",
  "bedtime": "set_night",
  "noon": "set_noon",
  "midday": "set_noon",
};

// Time patterns mapping
export const TIME_PATTERNS = {
  "morning": "08:00",
  "breakfast": "08:00",
  "morning time": "08:00",
  "afternoon": "14:00",
  "lunch": "13:00",
  "evening": "18:00",
  "dinner": "19:00",
  "night": "22:00",
  "bedtime": "22:00",
  "midnight": "00:00",
  "noon": "12:00",
  "midday": "12:00",
  "8 am": "08:00",
  "9 am": "09:00",
  "10 am": "10:00",
  "11 am": "11:00",
  "12 pm": "12:00",
  "1 pm": "13:00",
  "2 pm": "14:00",
  "3 pm": "15:00",
  "4 pm": "16:00",
  "5 pm": "17:00",
  "6 pm": "18:00",
  "7 pm": "19:00",
  "8 pm": "20:00",
  "9 pm": "21:00",
  "10 pm": "22:00",
  "9:00 am": "09:00",
  "9:00 pm": "21:00",
  "9:00 a.m.": "09:00",
  "9:00 p.m.": "21:00",
  "10:00 am": "10:00",
  "10:00 pm": "22:00",
  "10:00 a.m.": "10:00",
  "10:00 p.m.": "22:00",
};

// Frequency patterns
export const FREQUENCY_PATTERNS = {
  "daily": "daily",
  "every day": "daily",
  "day": "daily",
  "weekly": "weekly",
  "every week": "weekly",
  "week": "weekly",
  "monthly": "monthly",
  "every month": "monthly",
  "month": "monthly",
  "once a day": "daily",
  "twice a day": "twice_daily",
  "three times a day": "thrice_daily",
};

// Dynamic patterns for medication commands
export const DYNAMIC_PATTERNS = {
  // Time commands with colon: "9:00 am", "10:30 pm", "9:00 a.m."
  TIME_COLON: /^(\d{1,2}):(\d{2})\s*(a\.?m\.?|p\.?m\.?)$/i,
  
  // Time commands without colon: "9 am", "10 pm", "9 a.m."
  TIME_SIMPLE: /^(\d{1,2})\s*(a\.?m\.?|p\.?m\.?)$/i,
  
  // Medicine commands: "add dolo", "take aspirin", "create vitamin reminder"
  MEDICINE_COMMAND: /^(add|create|take|start|medicine name is|name is)\s+(.+?)(?:\s+(?:at|for|daily|every|time|reminder))?$/i,
  
  // Time commands: "at 8 am", "time is 9 pm", "set time to morning"
  TIME_COMMAND: /^(?:at|time is|set time to|time)\s+(.+?)(?:\s+(?:am|pm|a\.m\.|p\.m\.))?$/i,
  
  // Duration commands: "for 10 days", "duration is 20 days"
  DURATION_COMMAND: /^(?:for|duration is|duration)\s+(\d+)\s+(?:day|days)$/i,
  
  // Full natural language: "medicine name is dolo at 8 am daily for 10 days"
  FULL_COMMAND: /^(?:medicine name is|name is)\s+(.+?)\s+(?:at|time is)\s+(.+?)\s+(daily|weekly|monthly)\s+(?:for|duration)\s+(\d+)\s+(?:day|days)$/i,
  
  // Simple command: "dolo 8 am daily"
  SIMPLE_COMMAND: /^(\w+)\s+(\d{1,2})(?::(\d{2}))?\s*(am|pm|a\.m\.|p\.m\.)\s+(daily|weekly|monthly)$/i,
  
  // Edit command: "edit aspirin", "update dolo"
  EDIT_COMMAND: /^(edit|update|change)\s+(.+)$/i,
  
  // Delete command: "delete aspirin", "remove dolo"
  DELETE_COMMAND: /^(delete|remove|stop)\s+(.+)$/i,
  
  // Dosage command: "take 1 tablet" or "dosage is 2 tablets"
  DOSAGE_COMMAND: /^(?:take|dosage is|dosage)\s+(.+)$/i,
  
  // Number of days: "10 days", "for 20 days"
  DAYS_COMMAND: /^(\d+)\s+(?:day|days)$/i,
  
  // Frequency command: "daily", "weekly", "monthly"
  FREQUENCY_COMMAND: /^(daily|weekly|monthly)$/i,
};

// Initialize medication voice commands
export const initializeMedicationCommands = (handlers) => {
  console.log('[MedicationCommands] Initializing medication voice commands');
  
  const {
    handleBackToDashboard,
    handleLogout,
    navigate,
    setStatus,
    speak,
    setFormData,
    formData,
    editingReminder,
    handleSubmit,
    cancelEditing,
    fetchReminders,
    reminders,
    startEditing,
    deleteReminder,
    toggleReminderStatus,
    activateAllReminders,
    deleteAllReminders,
    medicineNameRef,
    timeOfDayRef,
    repeatFrequencyRef,
    dosageInfoRef,
    durationDaysRef,
    setShowVoiceHelp
  } = handlers;

  // Stop any existing listening
  voiceService.stopListening();
  
  // Clear existing commands and set feature
  voiceService.setFeature('medication');
  voiceService.clearCommands();
  voiceService.clearDynamicHandlers();

  // Register all static commands
  console.log('[MedicationCommands] Registering static commands...');
  Object.keys(MEDICATION_COMMANDS).forEach(command => {
    voiceService.registerCommand(command, () => {
      console.log(`[MedicationCommands] Executing static command: ${command}`);
      executeCommand(MEDICATION_COMMANDS[command], handlers);
    });
  });

  // Register dynamic handlers for medication commands
  console.log('[MedicationCommands] Registering dynamic handlers...');
  
  // Handle time with colon: "9:00 am", "10:30 pm"
  voiceService.registerDynamicHandler(
    DYNAMIC_PATTERNS.TIME_COLON,
    (matches, transcript) => {
      console.log('[MedicationCommands] Time with colon matched:', transcript);
      const [hour, minute, meridiem] = matches;
      
      let hours = parseInt(hour);
      const mer = meridiem.toLowerCase().replace('.', '');
      
      if (mer.includes('pm') && hours < 12) hours += 12;
      if (mer.includes('am') && hours === 12) hours = 0;
      
      const timeString = `${hours.toString().padStart(2, '0')}:${minute}`;
      setFormData(prev => ({ ...prev, time_of_day: timeString }));
      
      const formattedTime = formatTime(timeString);
      const message = `Time set to ${formattedTime}`;
      setStatus(message);
      speak(`Time set to ${formattedTime}`);
    }
  );

  // Handle time without colon: "9 am", "10 pm"
  voiceService.registerDynamicHandler(
    DYNAMIC_PATTERNS.TIME_SIMPLE,
    (matches, transcript) => {
      console.log('[MedicationCommands] Simple time matched:', transcript);
      const [hour, meridiem] = matches;
      
      let hours = parseInt(hour);
      const mer = meridiem.toLowerCase().replace('.', '');
      
      if (mer.includes('pm') && hours < 12) hours += 12;
      if (mer.includes('am') && hours === 12) hours = 0;
      
      const timeString = `${hours.toString().padStart(2, '0')}:00`;
      setFormData(prev => ({ ...prev, time_of_day: timeString }));
      
      const formattedTime = formatTime(timeString);
      const message = `Time set to ${formattedTime}`;
      setStatus(message);
      speak(`Time set to ${formattedTime}`);
    }
  );

  voiceService.registerDynamicHandler(
    DYNAMIC_PATTERNS.MEDICINE_COMMAND,
    (matches, transcript) => {
      console.log('[MedicationCommands] Medicine command matched:', transcript);
      const action = matches[0]?.toLowerCase() || 'add';
      const medicine = matches[1]?.trim();
      
      if (medicine) {
        const formattedMedicine = medicine.charAt(0).toUpperCase() + medicine.slice(1);
        setFormData(prev => ({ 
          ...prev, 
          medicine_name: formattedMedicine
        }));
        const message = `Added ${formattedMedicine} to form. Now say the time, like "8 AM"`;
        setStatus(message);
        speak(message);
      }
    }
  );

  voiceService.registerDynamicHandler(
    DYNAMIC_PATTERNS.TIME_COMMAND,
    (matches, transcript) => {
      console.log('[MedicationCommands] Time command matched:', transcript);
      const timeText = matches[0]?.toLowerCase();
      
      if (!timeText) return;
      
      // Check for time keywords
      if (TIME_PATTERNS[timeText]) {
        setFormData(prev => ({ ...prev, time_of_day: TIME_PATTERNS[timeText] }));
        const message = `Time set to ${timeText} (${TIME_PATTERNS[timeText]})`;
        setStatus(message);
        speak(`Time set to ${timeText}`);
      }
    }
  );

  voiceService.registerDynamicHandler(
    DYNAMIC_PATTERNS.DURATION_COMMAND,
    (matches, transcript) => {
      console.log('[MedicationCommands] Duration command matched:', transcript);
      const days = parseInt(matches[0]);
      if (!isNaN(days) && days > 0) {
        setFormData(prev => ({ ...prev, duration_days: days }));
        const message = `Duration set to ${days} days`;
        setStatus(message);
        speak(message);
      }
    }
  );

  voiceService.registerDynamicHandler(
    DYNAMIC_PATTERNS.DAYS_COMMAND,
    (matches, transcript) => {
      console.log('[MedicationCommands] Days command matched:', transcript);
      const days = parseInt(matches[0]);
      if (!isNaN(days) && days > 0) {
        setFormData(prev => ({ ...prev, duration_days: days }));
        const message = `Duration set to ${days} days`;
        setStatus(message);
        speak(message);
      }
    }
  );

  voiceService.registerDynamicHandler(
    DYNAMIC_PATTERNS.FREQUENCY_COMMAND,
    (matches, transcript) => {
      console.log('[MedicationCommands] Frequency command matched:', transcript);
      const frequency = matches[0].toLowerCase();
      setFormData(prev => ({ ...prev, repeat_frequency: frequency }));
      const message = `Frequency set to ${frequency}`;
      setStatus(message);
      speak(message);
    }
  );

  voiceService.registerDynamicHandler(
    DYNAMIC_PATTERNS.FULL_COMMAND,
    (matches, transcript) => {
      console.log('[MedicationCommands] Full command matched:', transcript);
      const [medicine, timeText, frequency, days] = matches;
      
      let timeOfDay = TIME_PATTERNS[timeText.toLowerCase()] || parseTimeString(timeText);
      
      if (!timeOfDay) {
        timeOfDay = '08:00';
      }
      
      const formattedMedicine = medicine.charAt(0).toUpperCase() + medicine.slice(1);
      
      setFormData({
        medicine_name: formattedMedicine,
        time_of_day: timeOfDay,
        repeat_frequency: frequency.toLowerCase(),
        dosage_info: '',
        duration_days: parseInt(days) || 30
      });
      
      const formattedTime = formatTime(timeOfDay);
      const message = `Added ${formattedMedicine} at ${formattedTime} ${frequency} for ${days} days. Say "save" to confirm.`;
      setStatus(message);
      speak(`Added ${formattedMedicine} at ${formattedTime} ${frequency} for ${days} days. Say save to confirm.`);
    }
  );

  voiceService.registerDynamicHandler(
    DYNAMIC_PATTERNS.SIMPLE_COMMAND,
    (matches, transcript) => {
      console.log('[MedicationCommands] Simple command matched:', transcript);
      const [medicine, hour, minute, meridiem, frequency] = matches;
      
      let hours = parseInt(hour);
      const mer = meridiem.toLowerCase().replace('.', '');
      
      if (mer.includes('pm') && hours < 12) hours += 12;
      if (mer.includes('am') && hours === 12) hours = 0;
      
      const timeString = `${hours.toString().padStart(2, '0')}:${minute || "00"}`;
      
      setFormData(prev => ({
        ...prev,
        medicine_name: medicine.charAt(0).toUpperCase() + medicine.slice(1),
        time_of_day: timeString,
        repeat_frequency: frequency.toLowerCase()
      }));
      
      const formattedTime = formatTime(timeString);
      const message = `Added ${medicine} at ${formattedTime} ${frequency}. Say "save" to confirm.`;
      setStatus(message);
      speak(`Added ${medicine} at ${formattedTime} ${frequency}. Say save to confirm.`);
    }
  );

  voiceService.registerDynamicHandler(
    DYNAMIC_PATTERNS.EDIT_COMMAND,
    (matches, transcript) => {
      console.log('[MedicationCommands] Edit command matched:', transcript);
      const medicineName = matches[1]?.toLowerCase();
      if (!medicineName) return;
      
      const reminder = reminders.find(r => 
        r.medicine_name.toLowerCase().includes(medicineName)
      );
      
      if (reminder) {
        startEditing(reminder);
        const message = `Editing ${reminder.medicine_name}`;
        setStatus(message);
        speak(message);
      } else {
        const message = `No reminder found for ${medicineName}`;
        setStatus(message);
        speak(message);
      }
    }
  );

  voiceService.registerDynamicHandler(
    DYNAMIC_PATTERNS.DELETE_COMMAND,
    (matches, transcript) => {
      console.log('[MedicationCommands] Delete command matched:', transcript);
      const medicineName = matches[1]?.toLowerCase();
      if (!medicineName) return;
      
      const reminder = reminders.find(r => 
        r.medicine_name.toLowerCase().includes(medicineName)
      );
      
      if (reminder) {
        deleteReminder(reminder.id, reminder.medicine_name);
      } else {
        const message = `No reminder found for ${medicineName}`;
        setStatus(message);
        speak(message);
      }
    }
  );

  voiceService.registerDynamicHandler(
    DYNAMIC_PATTERNS.DOSAGE_COMMAND,
    (matches, transcript) => {
      console.log('[MedicationCommands] Dosage command matched:', transcript);
      const dosage = matches[0]?.trim();
      if (dosage) {
        setFormData(prev => ({ 
          ...prev, 
          dosage_info: dosage
        }));
        const message = `Dosage set to ${dosage}`;
        setStatus(message);
        speak(message);
      }
    }
  );

  // Set up the general callback for unhandled commands
  // IMPORTANT: Don't set onResultCallback to avoid double execution
  voiceService.onResultCallback = null;

  // Start listening
  console.log('[MedicationCommands] Starting voice listening...');
  setTimeout(() => {
    voiceService.startListening();
  }, 300);
};

// Execute command based on command type
const executeCommand = (command, handlers) => {
  console.log(`[MedicationCommands] Executing command: ${command}`);
  
  const {
    handleBackToDashboard,
    handleLogout,
    navigate,
    setStatus,
    speak,
    setFormData,
    formData,
    editingReminder,
    handleSubmit,
    cancelEditing,
    fetchReminders,
    reminders,
    startEditing,
    deleteReminder,
    toggleReminderStatus,
    activateAllReminders,
    deleteAllReminders,
    medicineNameRef,
    timeOfDayRef,
    repeatFrequencyRef,
    dosageInfoRef,
    durationDaysRef,
    setShowVoiceHelp
  } = handlers;

  // Cancel any ongoing speech before starting new one
  window.speechSynthesis?.cancel();

  switch(command) {
    case 'back':
      handleBackToDashboard();
      break;
    case 'dashboard':
      navigate("/dashboard");
      break;
    case 'logout':
      handleLogout();
      break;
    case 'add_medication':
      if (editingReminder) {
        const message = "Currently editing a reminder. Say 'cancel' first or 'save' to update.";
        setStatus(message);
        speak(message);
      } else {
        const message = "Ready for medication details. Say: 'Add Dolo daily at 8 AM'";
        setStatus(message);
        speak("Ready for medication details. Say: Add Dolo daily at 8 AM.");
      }
      break;
    case 'save_medication':
      if (formData.medicine_name) {
        handleSubmit();
      } else {
        const message = "Please specify a medicine name first. Say 'Medicine name is [name]'";
        setStatus(message);
        speak("Please specify a medicine name first.");
      }
      break;
    case 'cancel':
      if (editingReminder) {
        cancelEditing();
      } else {
        setFormData({
          medicine_name: "",
          time_of_day: "",
          repeat_frequency: "daily",
          dosage_info: "",
          duration_days: 30
        });
        const message = "Form cleared.";
        setStatus(message);
        speak("Form cleared.");
      }
      break;
    case 'list_reminders':
      if (reminders.length > 0) {
        const activeCount = reminders.filter(r => r.active).length;
        const reminderList = reminders.slice(0, 3).map(r => 
          `${r.medicine_name} at ${formatTime(r.time_of_day)}`
        ).join(", ");
        
        const message = `You have ${reminders.length} medication reminders. ${activeCount} are active. Recent: ${reminderList}`;
        speak(message);
        setStatus(`You have ${reminders.length} reminders (${activeCount} active)`);
      } else {
        const message = "You have no medication reminders yet.";
        speak(message);
        setStatus(message);
      }
      break;
    case 'refresh_reminders':
      fetchReminders();
      break;
    case 'clear_status':
      setStatus("");
      break;
    case 'help':
      setShowVoiceHelp(true);
      speak("Voice command examples shown.");
      break;
    case 'focus_medicine':
      medicineNameRef.current?.focus();
      speak("Medicine name field focused. Say the medicine name.");
      break;
    case 'focus_time':
      timeOfDayRef.current?.focus();
      speak("Time field focused. Say the time.");
      break;
    case 'focus_frequency':
      repeatFrequencyRef.current?.focus();
      speak("Frequency field focused.");
      break;
    case 'focus_dosage':
      dosageInfoRef.current?.focus();
      speak("Dosage field focused. Say dosage instructions.");
      break;
    case 'focus_duration':
      durationDaysRef.current?.focus();
      speak("Duration field focused. Say number of days.");
      break;
    case 'complex_new':
      setFormData({
        medicine_name: "",
        time_of_day: "",
        repeat_frequency: "daily",
        dosage_info: "",
        duration_days: 30
      });
      const message = "Ready for new medication. Example: 'Add Dolo 650 at 8 AM daily for 10 days'";
      setStatus(message);
      speak("Ready for new medication.");
      break;
    case 'complex_edit_last':
      if (reminders.length > 0) {
        startEditing(reminders[reminders.length - 1]);
      } else {
        speak("No reminders to edit.");
      }
      break;
    case 'complex_delete_last':
      if (reminders.length > 0) {
        const lastReminder = reminders[reminders.length - 1];
        deleteReminder(lastReminder.id, lastReminder.medicine_name);
      } else {
        speak("No reminders to delete.");
      }
      break;
    case 'complex_toggle_last':
      if (reminders.length > 0) {
        const lastReminder = reminders[reminders.length - 1];
        toggleReminderStatus(lastReminder);
      } else {
        speak("No reminders to toggle.");
      }
      break;
    case 'activate_all':
      activateAllReminders(true);
      break;
    case 'deactivate_all':
      activateAllReminders(false);
      break;
    case 'delete_all':
      if (reminders.length > 0) {
        if (window.confirm(`Are you sure you want to delete all ${reminders.length} reminders?`)) {
          deleteAllReminders();
        }
      } else {
        speak("No reminders to delete.");
      }
      break;
    case 'smart_dolo':
      handleSmartMedicineCommand("Dolo 650", "08:00", "daily", 30, handlers);
      break;
    case 'smart_aspirin':
      handleSmartMedicineCommand("Aspirin", "20:00", "daily", 30, handlers);
      break;
    case 'smart_vitamins':
      handleSmartMedicineCommand("Multivitamins", "09:00", "daily", 30, handlers);
      break;
    case 'smart_medicine':
      const msg = "Please specify medicine name. Example: 'Take Dolo' or 'Take Aspirin'";
      setStatus(msg);
      speak("Please specify medicine name.");
      break;
    case 'set_morning':
      setFormData(prev => ({ ...prev, time_of_day: "08:00" }));
      setStatus("Time set to morning (8:00 AM)");
      speak("Time set to morning");
      break;
    case 'set_afternoon':
      setFormData(prev => ({ ...prev, time_of_day: "14:00" }));
      setStatus("Time set to afternoon (2:00 PM)");
      speak("Time set to afternoon");
      break;
    case 'set_evening':
      setFormData(prev => ({ ...prev, time_of_day: "18:00" }));
      setStatus("Time set to evening (6:00 PM)");
      speak("Time set to evening");
      break;
    case 'set_night':
      setFormData(prev => ({ ...prev, time_of_day: "22:00" }));
      setStatus("Time set to night (10:00 PM)");
      speak("Time set to night");
      break;
    case 'set_noon':
      setFormData(prev => ({ ...prev, time_of_day: "12:00" }));
      setStatus("Time set to noon (12:00 PM)");
      speak("Time set to noon");
      break;
    default:
      console.log(`[MedicationCommands] Unknown command: ${command}`);
      const unknownMsg = `I didn't understand that command. Try saying "help" for available commands.`;
      setStatus(unknownMsg);
      speak(unknownMsg);
  }
};

// Helper functions
const handleSmartMedicineCommand = (medicine, time, frequency, duration, handlers) => {
  const { setFormData, setStatus, speak } = handlers;
  
  setFormData({
    medicine_name: medicine,
    time_of_day: time,
    repeat_frequency: frequency,
    dosage_info: "1 tablet",
    duration_days: duration
  });
  
  const formattedTime = formatTime(time);
  const feedback = `${medicine} set for ${formattedTime} ${frequency} for ${duration} days. Say 'save' to confirm.`;
  setStatus(feedback);
  speak(feedback);
};

const formatTime = (timeString) => {
  if (!timeString) return "";
  try {
    const time = new Date(`2000-01-01T${timeString}`);
    return time.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  } catch (e) {
    return timeString;
  }
};

const parseTimeString = (timeText) => {
  if (!timeText) return null;
  
  // Parse time strings like "8 am", "9:30 pm", etc.
  const timeMatch = timeText.match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm|a\.m\.|p\.m\.)?/i);
  if (!timeMatch) return null;
  
  let hours = parseInt(timeMatch[1]);
  const minutes = timeMatch[2] || "00";
  const meridiem = timeMatch[3]?.toLowerCase().replace('.', '');
  
  if (meridiem?.includes('pm') && hours < 12) hours += 12;
  if (meridiem?.includes('am') && hours === 12) hours = 0;
  
  return `${hours.toString().padStart(2, '0')}:${minutes}`;
};

// Stop medication voice commands
export const stopMedicationCommands = () => {
  console.log('[MedicationCommands] Stopping medication voice commands');
  voiceService.stopListening();
  voiceService.onResultCallback = null;
};