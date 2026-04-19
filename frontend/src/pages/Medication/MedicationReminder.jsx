


// // // // // // // import React, { useState, useEffect } from "react";
// // // // // // // import { useNavigate } from "react-router-dom";
// // // // // // // import axios from "axios";
// // // // // // // import "./MedicationReminder.css";

// // // // // // // const MedicationReminder = () => {
// // // // // // //   const [reminders, setReminders] = useState([]);
// // // // // // //   const [loading, setLoading] = useState(false);
// // // // // // //   const [status, setStatus] = useState("");
// // // // // // //   const [editingReminder, setEditingReminder] = useState(null);
// // // // // // //   const navigate = useNavigate();
  
// // // // // // //   // Form state
// // // // // // //   const [formData, setFormData] = useState({
// // // // // // //     medicine_name: "",
// // // // // // //     time_of_day: "",
// // // // // // //     repeat_frequency: "daily",
// // // // // // //     dosage_info: "",
// // // // // // //     duration_days: 30
// // // // // // //   });

// // // // // // //   // Speak function
// // // // // // //   const speak = (text) => {
// // // // // // //     const synth = window.speechSynthesis;
// // // // // // //     if (!synth) return;
// // // // // // //     synth.cancel();
// // // // // // //     const utter = new SpeechSynthesisUtterance(text);
// // // // // // //     utter.rate = 0.8;
// // // // // // //     synth.speak(utter);
// // // // // // //   };

// // // // // // //   // Fetch all reminders
// // // // // // //   const fetchReminders = async () => {
// // // // // // //     try {
// // // // // // //       setLoading(true);
// // // // // // //       const token = localStorage.getItem("token");
// // // // // // //       const response = await axios.get(
// // // // // // //         "http://127.0.0.1:8000/api/medication-reminders/",
// // // // // // //         {
// // // // // // //           headers: {
// // // // // // //             Authorization: `Bearer ${token}`,
// // // // // // //           },
// // // // // // //         }
// // // // // // //       );
// // // // // // //       setReminders(response.data);
// // // // // // //       setStatus(`Loaded ${response.data.length} medication reminders`);
// // // // // // //     } catch (error) {
// // // // // // //       console.error("Error fetching reminders:", error);
// // // // // // //       setStatus("Error loading medication reminders");
// // // // // // //       speak("Error loading medication reminders");
// // // // // // //     } finally {
// // // // // // //       setLoading(false);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   useEffect(() => {
// // // // // // //     fetchReminders();
// // // // // // //   }, []);

// // // // // // //   // Handle form input changes
// // // // // // //   const handleInputChange = (e) => {
// // // // // // //     const { name, value } = e.target;
// // // // // // //     setFormData(prev => ({
// // // // // // //       ...prev,
// // // // // // //       [name]: value
// // // // // // //     }));
// // // // // // //   };

// // // // // // //   // Validate form
// // // // // // //   const validateForm = () => {
// // // // // // //     if (!formData.medicine_name.trim()) {
// // // // // // //       setStatus("Please enter medicine name");
// // // // // // //       speak("Please enter medicine name");
// // // // // // //       return false;
// // // // // // //     }
// // // // // // //     if (!formData.time_of_day) {
// // // // // // //       setStatus("Please select time of day");
// // // // // // //       speak("Please select time of day");
// // // // // // //       return false;
// // // // // // //     }
// // // // // // //     return true;
// // // // // // //   };

// // // // // // //   // Create new reminder
// // // // // // //   const createReminder = async (e) => {
// // // // // // //     e.preventDefault();
    
// // // // // // //     if (!validateForm()) return;

// // // // // // //     try {
// // // // // // //       setLoading(true);
// // // // // // //       const token = localStorage.getItem("token");
      
// // // // // // //       const payload = {
// // // // // // //         medicine_name: formData.medicine_name,
// // // // // // //         time_of_day: formData.time_of_day,
// // // // // // //         repeat_frequency: formData.repeat_frequency,
// // // // // // //         dosage_info: formData.dosage_info,
// // // // // // //         duration_days: parseInt(formData.duration_days)
// // // // // // //       };

// // // // // // //       const response = await axios.post(
// // // // // // //         "http://127.0.0.1:8000/api/medication-reminders/",
// // // // // // //         payload,
// // // // // // //         {
// // // // // // //           headers: {
// // // // // // //             Authorization: `Bearer ${token}`,
// // // // // // //             "Content-Type": "application/json",
// // // // // // //           },
// // // // // // //         }
// // // // // // //       );

// // // // // // //       setReminders(prev => [...prev, response.data]);
// // // // // // //       setStatus(`Medication reminder for ${formData.medicine_name} created successfully!`);
// // // // // // //       speak(`Medication reminder for ${formData.medicine_name} created successfully`);
      
// // // // // // //       // Reset form
// // // // // // //       setFormData({
// // // // // // //         medicine_name: "",
// // // // // // //         time_of_day: "",
// // // // // // //         repeat_frequency: "daily",
// // // // // // //         dosage_info: "",
// // // // // // //         duration_days: 30
// // // // // // //       });
// // // // // // //     } catch (error) {
// // // // // // //       console.error("Error creating reminder:", error);
// // // // // // //       let errorMessage = "Error creating medication reminder";
// // // // // // //       if (error.response?.data) {
// // // // // // //         errorMessage = Object.values(error.response.data).flat().join(", ");
// // // // // // //       }
// // // // // // //       setStatus(errorMessage);
// // // // // // //       speak("Error creating medication reminder");
// // // // // // //     } finally {
// // // // // // //       setLoading(false);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   // Update reminder
// // // // // // //   const updateReminder = async (e) => {
// // // // // // //     e.preventDefault();
    
// // // // // // //     if (!validateForm()) return;

// // // // // // //     try {
// // // // // // //       setLoading(true);
// // // // // // //       const token = localStorage.getItem("token");
      
// // // // // // //       const payload = {
// // // // // // //         medicine_name: formData.medicine_name,
// // // // // // //         time_of_day: formData.time_of_day,
// // // // // // //         repeat_frequency: formData.repeat_frequency,
// // // // // // //         dosage_info: formData.dosage_info,
// // // // // // //         duration_days: parseInt(formData.duration_days)
// // // // // // //       };

// // // // // // //       const response = await axios.put(
// // // // // // //         `http://127.0.0.1:8000/api/medication-reminders/${editingReminder.id}/`,
// // // // // // //         payload,
// // // // // // //         {
// // // // // // //           headers: {
// // // // // // //             Authorization: `Bearer ${token}`,
// // // // // // //             "Content-Type": "application/json",
// // // // // // //           },
// // // // // // //         }
// // // // // // //       );

// // // // // // //       setReminders(prev => 
// // // // // // //         prev.map(reminder => 
// // // // // // //           reminder.id === editingReminder.id ? response.data : reminder
// // // // // // //         )
// // // // // // //       );
      
// // // // // // //       setStatus(`Medication reminder for ${formData.medicine_name} updated successfully!`);
// // // // // // //       speak(`Medication reminder updated successfully`);
      
// // // // // // //       // Reset editing state
// // // // // // //       setEditingReminder(null);
// // // // // // //       setFormData({
// // // // // // //         medicine_name: "",
// // // // // // //         time_of_day: "",
// // // // // // //         repeat_frequency: "daily",
// // // // // // //         dosage_info: "",
// // // // // // //         duration_days: 30
// // // // // // //       });
// // // // // // //     } catch (error) {
// // // // // // //       console.error("Error updating reminder:", error);
// // // // // // //       let errorMessage = "Error updating medication reminder";
// // // // // // //       if (error.response?.data) {
// // // // // // //         errorMessage = Object.values(error.response.data).flat().join(", ");
// // // // // // //       }
// // // // // // //       setStatus(errorMessage);
// // // // // // //       speak("Error updating medication reminder");
// // // // // // //     } finally {
// // // // // // //       setLoading(false);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   // Delete reminder
// // // // // // //   const deleteReminder = async (id, medicineName) => {
// // // // // // //     if (!window.confirm(`Are you sure you want to delete the reminder for ${medicineName}?`)) {
// // // // // // //       return;
// // // // // // //     }

// // // // // // //     try {
// // // // // // //       const token = localStorage.getItem("token");
// // // // // // //       await axios.delete(
// // // // // // //         `http://127.0.0.1:8000/api/medication-reminders/${id}/`,
// // // // // // //         {
// // // // // // //           headers: {
// // // // // // //             Authorization: `Bearer ${token}`,
// // // // // // //           },
// // // // // // //         }
// // // // // // //       );

// // // // // // //       setReminders(prev => prev.filter(reminder => reminder.id !== id));
// // // // // // //       setStatus(`Medication reminder for ${medicineName} deleted successfully`);
// // // // // // //       speak(`Medication reminder deleted successfully`);
// // // // // // //     } catch (error) {
// // // // // // //       console.error("Error deleting reminder:", error);
// // // // // // //       setStatus("Error deleting medication reminder");
// // // // // // //       speak("Error deleting medication reminder");
// // // // // // //     }
// // // // // // //   };

// // // // // // //   // Toggle reminder active status
// // // // // // //   const toggleReminderStatus = async (reminder) => {
// // // // // // //     try {
// // // // // // //       const token = localStorage.getItem("token");
// // // // // // //       const response = await axios.patch(
// // // // // // //         `http://127.0.0.1:8000/api/medication-reminders/${reminder.id}/`,
// // // // // // //         { active: !reminder.active },
// // // // // // //         {
// // // // // // //           headers: {
// // // // // // //             Authorization: `Bearer ${token}`,
// // // // // // //             "Content-Type": "application/json",
// // // // // // //           },
// // // // // // //         }
// // // // // // //       );

// // // // // // //       setReminders(prev => 
// // // // // // //         prev.map(r => r.id === reminder.id ? response.data : r)
// // // // // // //       );
      
// // // // // // //       const action = response.data.active ? "activated" : "deactivated";
// // // // // // //       setStatus(`Medication reminder ${action} successfully`);
// // // // // // //       speak(`Medication reminder ${action}`);
// // // // // // //     } catch (error) {
// // // // // // //       console.error("Error toggling reminder status:", error);
// // // // // // //       setStatus("Error updating reminder status");
// // // // // // //       speak("Error updating reminder status");
// // // // // // //     }
// // // // // // //   };

// // // // // // //   // Start editing a reminder
// // // // // // //   const startEditing = (reminder) => {
// // // // // // //     setEditingReminder(reminder);
// // // // // // //     setFormData({
// // // // // // //       medicine_name: reminder.medicine_name,
// // // // // // //       time_of_day: reminder.time_of_day,
// // // // // // //       repeat_frequency: reminder.repeat_frequency,
// // // // // // //       dosage_info: reminder.dosage_info || "",
// // // // // // //       duration_days: reminder.duration_days || 30
// // // // // // //     });
// // // // // // //     speak(`Editing reminder for ${reminder.medicine_name}`);
// // // // // // //   };

// // // // // // //   // Cancel editing
// // // // // // //   const cancelEditing = () => {
// // // // // // //     setEditingReminder(null);
// // // // // // //     setFormData({
// // // // // // //       medicine_name: "",
// // // // // // //       time_of_day: "",
// // // // // // //       repeat_frequency: "daily",
// // // // // // //       dosage_info: "",
// // // // // // //       duration_days: 30
// // // // // // //     });
// // // // // // //     speak("Cancelled editing");
// // // // // // //   };

// // // // // // //   // Format time for display
// // // // // // //   const formatTime = (timeString) => {
// // // // // // //     if (!timeString) return "";
// // // // // // //     const time = new Date(`2000-01-01T${timeString}`);
// // // // // // //     return time.toLocaleTimeString('en-US', { 
// // // // // // //       hour: '2-digit', 
// // // // // // //       minute: '2-digit',
// // // // // // //       hour12: true 
// // // // // // //     });
// // // // // // //   };

// // // // // // //   const handleLogout = async () => {
// // // // // // //     setStatus("Logging out...");
// // // // // // //     speak("Logging out...");

// // // // // // //     try {
// // // // // // //       const token = localStorage.getItem("token");
// // // // // // //       if (token) {
// // // // // // //         await axios.post(
// // // // // // //           "http://127.0.0.1:8000/auth/voice-logout/",
// // // // // // //           {},
// // // // // // //           {
// // // // // // //             headers: {
// // // // // // //               Authorization: `Bearer ${token}`,
// // // // // // //               "Content-Type": "application/json",
// // // // // // //             },
// // // // // // //           }
// // // // // // //         );
// // // // // // //       }
// // // // // // //     } catch (error) {
// // // // // // //       console.error("Logout backend error:", error.response?.data || error.message);
// // // // // // //     } finally {
// // // // // // //       localStorage.clear();
// // // // // // //       setTimeout(() => navigate("/"), 1500);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const handleBackToDashboard = () => {
// // // // // // //     navigate("/dashboard");
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <div className="medication-reminder-container">
// // // // // // //       {/* Fixed Header */}
// // // // // // //       <header className="dashboard-header fixed-header">
// // // // // // //         <div className="header-content">
// // // // // // //           <div className="header-left">
// // // // // // //             <button className="back-btn" onClick={handleBackToDashboard}>
// // // // // // //               ← Back to Dashboard
// // // // // // //             </button>
// // // // // // //             <h1 className="logo">Vision Assist</h1>
// // // // // // //           </div>
// // // // // // //           <div className="user-menu">
// // // // // // //             <button className="logout-btn" onClick={handleLogout}>
// // // // // // //               Logout
// // // // // // //             </button>
// // // // // // //           </div>
// // // // // // //         </div>
// // // // // // //       </header>

// // // // // // //       <div className="medication-content">
// // // // // // //         <div className="medication-header">
// // // // // // //           <h2>💊 Medication Reminder</h2>
// // // // // // //           <p>Manage your medication schedule and reminders</p>
// // // // // // //         </div>

// // // // // // //         {/* Status Message */}
// // // // // // //         {status && (
// // // // // // //           <div className="status-message">
// // // // // // //             {status}
// // // // // // //           </div>
// // // // // // //         )}

// // // // // // //         {/* Add/Edit Form */}
// // // // // // //         <div className="medication-form-section">
// // // // // // //           <h3>{editingReminder ? "Edit Medication" : "Add New Medication"}</h3>
// // // // // // //           <form onSubmit={editingReminder ? updateReminder : createReminder} className="medication-form">
// // // // // // //             <div className="form-row">
// // // // // // //               <div className="form-group">
// // // // // // //                 <label htmlFor="medicine_name">Medicine Name *</label>
// // // // // // //                 <input
// // // // // // //                   type="text"
// // // // // // //                   id="medicine_name"
// // // // // // //                   name="medicine_name"
// // // // // // //                   value={formData.medicine_name}
// // // // // // //                   onChange={handleInputChange}
// // // // // // //                   placeholder="e.g., Dolo 650"
// // // // // // //                   required
// // // // // // //                 />
// // // // // // //               </div>

// // // // // // //               <div className="form-group">
// // // // // // //                 <label htmlFor="time_of_day">Time of Day *</label>
// // // // // // //                 <input
// // // // // // //                   type="time"
// // // // // // //                   id="time_of_day"
// // // // // // //                   name="time_of_day"
// // // // // // //                   value={formData.time_of_day}
// // // // // // //                   onChange={handleInputChange}
// // // // // // //                   required
// // // // // // //                 />
// // // // // // //               </div>
// // // // // // //             </div>

// // // // // // //             <div className="form-row">
// // // // // // //               <div className="form-group">
// // // // // // //                 <label htmlFor="repeat_frequency">Repeat Frequency *</label>
// // // // // // //                 <select
// // // // // // //                   id="repeat_frequency"
// // // // // // //                   name="repeat_frequency"
// // // // // // //                   value={formData.repeat_frequency}
// // // // // // //                   onChange={handleInputChange}
// // // // // // //                   required
// // // // // // //                 >
// // // // // // //                   <option value="daily">Daily</option>
// // // // // // //                   <option value="weekly">Weekly</option>
// // // // // // //                   <option value="monthly">Monthly</option>
// // // // // // //                 </select>
// // // // // // //               </div>

// // // // // // //               <div className="form-group">
// // // // // // //                 <label htmlFor="duration_days">Duration (Days)</label>
// // // // // // //                 <input
// // // // // // //                   type="number"
// // // // // // //                   id="duration_days"
// // // // // // //                   name="duration_days"
// // // // // // //                   value={formData.duration_days}
// // // // // // //                   onChange={handleInputChange}
// // // // // // //                   min="1"
// // // // // // //                   max="365"
// // // // // // //                 />
// // // // // // //               </div>
// // // // // // //             </div>

// // // // // // //             <div className="form-group">
// // // // // // //               <label htmlFor="dosage_info">Dosage Information</label>
// // // // // // //               <input
// // // // // // //                 type="text"
// // // // // // //                 id="dosage_info"
// // // // // // //                 name="dosage_info"
// // // // // // //                 value={formData.dosage_info}
// // // // // // //                 onChange={handleInputChange}
// // // // // // //                 placeholder="e.g., 1 tablet after food"
// // // // // // //               />
// // // // // // //             </div>

// // // // // // //             <div className="form-actions">
// // // // // // //               <button 
// // // // // // //                 type="submit" 
// // // // // // //                 className="submit-btn"
// // // // // // //                 disabled={loading}
// // // // // // //               >
// // // // // // //                 {loading ? "Saving..." : (editingReminder ? "Update Reminder" : "Add Reminder")}
// // // // // // //               </button>
              
// // // // // // //               {editingReminder && (
// // // // // // //                 <button 
// // // // // // //                   type="button" 
// // // // // // //                   className="cancel-btn"
// // // // // // //                   onClick={cancelEditing}
// // // // // // //                 >
// // // // // // //                   Cancel
// // // // // // //                 </button>
// // // // // // //               )}
// // // // // // //             </div>
// // // // // // //           </form>
// // // // // // //         </div>

// // // // // // //         {/* Reminders List */}
// // // // // // //         <div className="reminders-list-section">
// // // // // // //           <h3>Your Medication Reminders ({reminders.length})</h3>
          
// // // // // // //           {loading && reminders.length === 0 ? (
// // // // // // //             <div className="loading">Loading reminders...</div>
// // // // // // //           ) : reminders.length === 0 ? (
// // // // // // //             <div className="empty-state">
// // // // // // //               <p>No medication reminders yet. Add your first reminder above.</p>
// // // // // // //             </div>
// // // // // // //           ) : (
// // // // // // //             <div className="reminders-grid">
// // // // // // //               {reminders.map(reminder => (
// // // // // // //                 <div key={reminder.id} className={`reminder-card ${reminder.active ? 'active' : 'inactive'}`}>
// // // // // // //                   <div className="reminder-header">
// // // // // // //                     <h4>{reminder.medicine_name}</h4>
// // // // // // //                     <span className={`status-badge ${reminder.active ? 'active' : 'inactive'}`}>
// // // // // // //                       {reminder.active ? 'Active' : 'Inactive'}
// // // // // // //                     </span>
// // // // // // //                   </div>
                  
// // // // // // //                   <div className="reminder-details">
// // // // // // //                     <div className="detail-item">
// // // // // // //                       <span className="label">Time:</span>
// // // // // // //                       <span className="value">{formatTime(reminder.time_of_day)}</span>
// // // // // // //                     </div>
                    
// // // // // // //                     <div className="detail-item">
// // // // // // //                       <span className="label">Frequency:</span>
// // // // // // //                       <span className="value">{reminder.repeat_frequency}</span>
// // // // // // //                     </div>
                    
// // // // // // //                     {reminder.dosage_info && (
// // // // // // //                       <div className="detail-item">
// // // // // // //                         <span className="label">Dosage:</span>
// // // // // // //                         <span className="value">{reminder.dosage_info}</span>
// // // // // // //                       </div>
// // // // // // //                     )}
                    
// // // // // // //                     <div className="detail-item">
// // // // // // //                       <span className="label">Duration:</span>
// // // // // // //                       <span className="value">{reminder.duration_days} days</span>
// // // // // // //                     </div>
// // // // // // //                   </div>

// // // // // // //                   <div className="reminder-actions">
// // // // // // //                     <button 
// // // // // // //                       className="edit-btn"
// // // // // // //                       onClick={() => startEditing(reminder)}
// // // // // // //                     >
// // // // // // //                       Edit
// // // // // // //                     </button>
                    
// // // // // // //                     <button 
// // // // // // //                       className={`toggle-btn ${reminder.active ? 'deactivate' : 'activate'}`}
// // // // // // //                       onClick={() => toggleReminderStatus(reminder)}
// // // // // // //                     >
// // // // // // //                       {reminder.active ? 'Deactivate' : 'Activate'}
// // // // // // //                     </button>
                    
// // // // // // //                     <button 
// // // // // // //                       className="delete-btn"
// // // // // // //                       onClick={() => deleteReminder(reminder.id, reminder.medicine_name)}
// // // // // // //                     >
// // // // // // //                       Delete
// // // // // // //                     </button>
// // // // // // //                   </div>
// // // // // // //                 </div>
// // // // // // //               ))}
// // // // // // //             </div>
// // // // // // //           )}
// // // // // // //         </div>
// // // // // // //       </div>

// // // // // // //       {/* Status Bar */}
// // // // // // //       <div className="status-bar">
// // // // // // //         <p>{status}</p>
// // // // // // //       </div>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // };

// // // // // // // export default MedicationReminder;



// // // // // // import React, { useState, useEffect, useRef, useCallback } from "react";
// // // // // // import { useNavigate } from "react-router-dom";
// // // // // // import axios from "axios";
// // // // // // import "./MedicationReminder.css";

// // // // // // // Voice command vocabulary
// // // // // // const VOICE_COMMANDS = {
// // // // // //   // Navigation commands
// // // // // //   "go back": "back",
// // // // // //   "go to dashboard": "dashboard",
// // // // // //   "logout": "logout",
// // // // // //   "sign out": "logout",
  
// // // // // //   // Form commands
// // // // // //   "add medication": "add",
// // // // // //   "create reminder": "add",
// // // // // //   "new medication": "add",
// // // // // //   "save medication": "save",
// // // // // //   "submit form": "save",
// // // // // //   "cancel": "cancel",
// // // // // //   "stop editing": "cancel",
  
// // // // // //   // List commands
// // // // // //   "list reminders": "list",
// // // // // //   "show medications": "list",
// // // // // //   "refresh reminders": "refresh",
// // // // // //   "reload": "refresh",
  
// // // // // //   // Status commands
// // // // // //   "clear status": "clear",
// // // // // //   "clear message": "clear",
  
// // // // // //   // Help
// // // // // //   "help": "help",
// // // // // //   "what can I say": "help",
// // // // // //   "show commands": "help",
  
// // // // // //   // Form field navigation
// // // // // //   "focus medicine name": "focus_medicine",
// // // // // //   "focus time": "focus_time",
// // // // // //   "focus frequency": "focus_frequency",
// // // // // //   "focus dosage": "focus_dosage",
// // // // // //   "focus duration": "focus_duration",
  
// // // // // //   // Time commands (for time input)
// // // // // //   "set time to morning": "time_morning",
// // // // // //   "set time to afternoon": "time_afternoon",
// // // // // //   "set time to evening": "time_evening",
// // // // // //   "set time to night": "time_night",
  
// // // // // //   // Frequency commands
// // // // // //   "set daily": "frequency_daily",
// // // // // //   "set weekly": "frequency_weekly",
// // // // // //   "set monthly": "frequency_monthly",
  
// // // // // //   // Common medicine names (example)
// // // // // //   "dolo": "medicine_dolo",
// // // // // //   "paracetamol": "medicine_dolo",
// // // // // //   "aspirin": "medicine_aspirin",
// // // // // //   "vitamins": "medicine_vitamins",
// // // // // // };

// // // // // // const MedicationReminder = () => {
// // // // // //   const [reminders, setReminders] = useState([]);
// // // // // //   const [loading, setLoading] = useState(false);
// // // // // //   const [status, setStatus] = useState("");
// // // // // //   const [editingReminder, setEditingReminder] = useState(null);
// // // // // //   const [isListening, setIsListening] = useState(false);
// // // // // //   const [showVoiceHelp, setShowVoiceHelp] = useState(false);
// // // // // //   const [recognition, setRecognition] = useState(null);
// // // // // //   const navigate = useNavigate();
  
// // // // // //   // Refs for form inputs
// // // // // //   const medicineNameRef = useRef(null);
// // // // // //   const timeOfDayRef = useRef(null);
// // // // // //   const repeatFrequencyRef = useRef(null);
// // // // // //   const dosageInfoRef = useRef(null);
// // // // // //   const durationDaysRef = useRef(null);
  
// // // // // //   // Form state
// // // // // //   const [formData, setFormData] = useState({
// // // // // //     medicine_name: "",
// // // // // //     time_of_day: "",
// // // // // //     repeat_frequency: "daily",
// // // // // //     dosage_info: "",
// // // // // //     duration_days: 30
// // // // // //   });

// // // // // //   // Initialize speech recognition
// // // // // //   useEffect(() => {
// // // // // //     const initSpeechRecognition = () => {
// // // // // //       if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
// // // // // //         const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
// // // // // //         const recognition = new SpeechRecognition();
        
// // // // // //         recognition.continuous = true;
// // // // // //         recognition.interimResults = false;
// // // // // //         recognition.lang = 'en-US';
        
// // // // // //         recognition.onstart = () => {
// // // // // //           setIsListening(true);
// // // // // //           setStatus("Listening for voice commands...");
// // // // // //           speak("Voice commands activated. Say 'help' for available commands.");
// // // // // //         };
        
// // // // // //         recognition.onresult = (event) => {
// // // // // //           const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase().trim();
// // // // // //           console.log("Voice command:", transcript);
// // // // // //           handleVoiceCommand(transcript);
// // // // // //         };
        
// // // // // //         recognition.onerror = (event) => {
// // // // // //           console.error("Speech recognition error:", event.error);
// // // // // //           if (event.error === 'no-speech') {
// // // // // //             setStatus("No speech detected. Try again.");
// // // // // //           } else if (event.error !== 'aborted') {
// // // // // //             setStatus("Voice recognition error. Please try again.");
// // // // // //           }
// // // // // //           setIsListening(false);
// // // // // //         };
        
// // // // // //         recognition.onend = () => {
// // // // // //           setIsListening(false);
// // // // // //         };
        
// // // // // //         setRecognition(recognition);
// // // // // //       } else {
// // // // // //         setStatus("Voice recognition not supported in this browser.");
// // // // // //       }
// // // // // //     };
    
// // // // // //     initSpeechRecognition();
// // // // // //     return () => {
// // // // // //       if (recognition) {
// // // // // //         recognition.stop();
// // // // // //       }
// // // // // //     };
// // // // // //   }, []);

// // // // // //   // Speak function
// // // // // //   const speak = (text) => {
// // // // // //     const synth = window.speechSynthesis;
// // // // // //     if (!synth) return;
// // // // // //     synth.cancel();
// // // // // //     const utter = new SpeechSynthesisUtterance(text);
// // // // // //     utter.rate = 0.8;
// // // // // //     synth.speak(utter);
// // // // // //   };

// // // // // //   // Handle voice commands
// // // // // //   const handleVoiceCommand = useCallback((command) => {
// // // // // //     let matchedCommand = null;
    
// // // // // //     // Check for exact matches first
// // // // // //     if (VOICE_COMMANDS[command]) {
// // // // // //       matchedCommand = VOICE_COMMANDS[command];
// // // // // //     } else {
// // // // // //       // Check for partial matches
// // // // // //       for (const [key, value] of Object.entries(VOICE_COMMANDS)) {
// // // // // //         if (command.includes(key)) {
// // // // // //           matchedCommand = value;
// // // // // //           break;
// // // // // //         }
// // // // // //       }
// // // // // //     }
    
// // // // // //     if (matchedCommand) {
// // // // // //       executeCommand(matchedCommand, command);
// // // // // //     } else {
// // // // // //       // Try to handle medicine name input
// // // // // //       if (command.startsWith("medicine ")) {
// // // // // //         const medicineName = command.replace("medicine ", "");
// // // // // //         handleMedicineNameInput(medicineName);
// // // // // //       } else if (command.includes("time")) {
// // // // // //         handleTimeCommand(command);
// // // // // //       } else if (command.includes("dosage")) {
// // // // // //         handleDosageCommand(command);
// // // // // //       } else {
// // // // // //         setStatus(`Command not recognized: "${command}". Say "help" for available commands.`);
// // // // // //         speak(`Command not recognized. Say help for available commands.`);
// // // // // //       }
// // // // // //     }
// // // // // //   }, [formData, editingReminder, reminders]);

// // // // // //   // Execute matched command
// // // // // //   const executeCommand = (command, originalCommand) => {
// // // // // //     switch(command) {
// // // // // //       case 'back':
// // // // // //         handleBackToDashboard();
// // // // // //         break;
// // // // // //       case 'dashboard':
// // // // // //         navigate("/dashboard");
// // // // // //         break;
// // // // // //       case 'logout':
// // // // // //         handleLogout();
// // // // // //         break;
// // // // // //       case 'add':
// // // // // //         if (editingReminder) {
// // // // // //           setStatus("Currently editing a reminder. Say 'cancel' first or 'save' to update.");
// // // // // //           speak("Currently editing a reminder. Say cancel first or save to update.");
// // // // // //         } else {
// // // // // //           setStatus("Ready to add new medication. Please say the medicine name.");
// // // // // //           speak("Ready to add new medication. Please say the medicine name.");
// // // // // //         }
// // // // // //         break;
// // // // // //       case 'save':
// // // // // //         if (editingReminder) {
// // // // // //           document.querySelector('.submit-btn').click();
// // // // // //         } else {
// // // // // //           document.querySelector('.submit-btn').click();
// // // // // //         }
// // // // // //         break;
// // // // // //       case 'cancel':
// // // // // //         if (editingReminder) {
// // // // // //           cancelEditing();
// // // // // //         } else {
// // // // // //           setFormData({
// // // // // //             medicine_name: "",
// // // // // //             time_of_day: "",
// // // // // //             repeat_frequency: "daily",
// // // // // //             dosage_info: "",
// // // // // //             duration_days: 30
// // // // // //           });
// // // // // //           setStatus("Form cleared.");
// // // // // //           speak("Form cleared.");
// // // // // //         }
// // // // // //         break;
// // // // // //       case 'list':
// // // // // //         speak(`You have ${reminders.length} medication reminders. ${reminders.filter(r => r.active).length} are active.`);
// // // // // //         break;
// // // // // //       case 'refresh':
// // // // // //         fetchReminders();
// // // // // //         break;
// // // // // //       case 'clear':
// // // // // //         setStatus("");
// // // // // //         break;
// // // // // //       case 'help':
// // // // // //         showVoiceCommands();
// // // // // //         break;
// // // // // //       case 'focus_medicine':
// // // // // //         medicineNameRef.current?.focus();
// // // // // //         speak("Focused on medicine name field.");
// // // // // //         break;
// // // // // //       case 'focus_time':
// // // // // //         timeOfDayRef.current?.focus();
// // // // // //         speak("Focused on time field.");
// // // // // //         break;
// // // // // //       case 'focus_frequency':
// // // // // //         repeatFrequencyRef.current?.focus();
// // // // // //         speak("Focused on frequency field.");
// // // // // //         break;
// // // // // //       case 'focus_dosage':
// // // // // //         dosageInfoRef.current?.focus();
// // // // // //         speak("Focused on dosage field.");
// // // // // //         break;
// // // // // //       case 'focus_duration':
// // // // // //         durationDaysRef.current?.focus();
// // // // // //         speak("Focused on duration field.");
// // // // // //         break;
// // // // // //       case 'time_morning':
// // // // // //         setFormData(prev => ({ ...prev, time_of_day: "08:00" }));
// // // // // //         speak("Time set to morning, 8 AM.");
// // // // // //         break;
// // // // // //       case 'time_afternoon':
// // // // // //         setFormData(prev => ({ ...prev, time_of_day: "14:00" }));
// // // // // //         speak("Time set to afternoon, 2 PM.");
// // // // // //         break;
// // // // // //       case 'time_evening':
// // // // // //         setFormData(prev => ({ ...prev, time_of_day: "18:00" }));
// // // // // //         speak("Time set to evening, 6 PM.");
// // // // // //         break;
// // // // // //       case 'time_night':
// // // // // //         setFormData(prev => ({ ...prev, time_of_day: "22:00" }));
// // // // // //         speak("Time set to night, 10 PM.");
// // // // // //         break;
// // // // // //       case 'frequency_daily':
// // // // // //         setFormData(prev => ({ ...prev, repeat_frequency: "daily" }));
// // // // // //         speak("Frequency set to daily.");
// // // // // //         break;
// // // // // //       case 'frequency_weekly':
// // // // // //         setFormData(prev => ({ ...prev, repeat_frequency: "weekly" }));
// // // // // //         speak("Frequency set to weekly.");
// // // // // //         break;
// // // // // //       case 'frequency_monthly':
// // // // // //         setFormData(prev => ({ ...prev, repeat_frequency: "monthly" }));
// // // // // //         speak("Frequency set to monthly.");
// // // // // //         break;
// // // // // //       case 'medicine_dolo':
// // // // // //         handleMedicineNameInput("Dolo 650");
// // // // // //         break;
// // // // // //       case 'medicine_aspirin':
// // // // // //         handleMedicineNameInput("Aspirin");
// // // // // //         break;
// // // // // //       case 'medicine_vitamins':
// // // // // //         handleMedicineNameInput("Multivitamins");
// // // // // //         break;
// // // // // //       default:
// // // // // //         setStatus(`Command executed: ${originalCommand}`);
// // // // // //     }
// // // // // //   };

// // // // // //   // Handle medicine name input
// // // // // //   const handleMedicineNameInput = (medicineName) => {
// // // // // //     setFormData(prev => ({ ...prev, medicine_name: medicineName }));
// // // // // //     setStatus(`Medicine name set to: ${medicineName}`);
// // // // // //     speak(`Medicine name set to ${medicineName}`);
    
// // // // // //     // Auto-focus next field
// // // // // //     setTimeout(() => {
// // // // // //       timeOfDayRef.current?.focus();
// // // // // //       speak("Now say the time, for example 'set time to morning' or say a specific time.");
// // // // // //     }, 500);
// // // // // //   };

// // // // // //   // Handle time commands
// // // // // //   const handleTimeCommand = (command) => {
// // // // // //     // Try to extract time from command
// // // // // //     const timeMatch = command.match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)?/i);
    
// // // // // //     if (timeMatch) {
// // // // // //       let [_, hours, minutes = "00", meridiem] = timeMatch;
// // // // // //       hours = parseInt(hours);
      
// // // // // //       // Convert to 24-hour format
// // // // // //       if (meridiem?.toLowerCase() === 'pm' && hours < 12) hours += 12;
// // // // // //       if (meridiem?.toLowerCase() === 'am' && hours === 12) hours = 0;
      
// // // // // //       const timeString = `${hours.toString().padStart(2, '0')}:${minutes}`;
// // // // // //       setFormData(prev => ({ ...prev, time_of_day: timeString }));
// // // // // //       setStatus(`Time set to ${formatTime(timeString)}`);
// // // // // //       speak(`Time set to ${formatTime(timeString)}`);
// // // // // //     }
// // // // // //   };

// // // // // //   // Handle dosage commands
// // // // // //   const handleDosageCommand = (command) => {
// // // // // //     const dosage = command.replace(/\b(dosage|dose)\b/i, "").trim();
// // // // // //     if (dosage) {
// // // // // //       setFormData(prev => ({ ...prev, dosage_info: dosage }));
// // // // // //       setStatus(`Dosage set to: ${dosage}`);
// // // // // //       speak(`Dosage set to ${dosage}`);
// // // // // //     }
// // // // // //   };

// // // // // //   // Show available voice commands
// // // // // //   const showVoiceCommands = () => {
// // // // // //     setShowVoiceHelp(true);
// // // // // //     const commandList = [
// // // // // //       "Navigation: 'go back', 'logout', 'go to dashboard'",
// // // // // //       "Form: 'add medication', 'save medication', 'cancel'",
// // // // // //       "Fields: 'focus medicine name', 'focus time', 'focus dosage'",
// // // // // //       "Time: 'set time to morning', 'set time to afternoon', 'set time to evening', 'set time to night'",
// // // // // //       "Frequency: 'set daily', 'set weekly', 'set monthly'",
// // // // // //       "List: 'list reminders', 'refresh reminders'",
// // // // // //       "Medicine: 'medicine [name]' (e.g., 'medicine Dolo 650')",
// // // // // //       "Other: 'clear status', 'help'"
// // // // // //     ].join(". ");
    
// // // // // //     speak("Here are available voice commands: " + commandList);
// // // // // //     setStatus("Voice commands help displayed. Say 'close help' to hide.");
// // // // // //   };

// // // // // //   // Toggle voice recognition
// // // // // //   const toggleVoiceRecognition = () => {
// // // // // //     if (recognition) {
// // // // // //       if (isListening) {
// // // // // //         recognition.stop();
// // // // // //         setStatus("Voice recognition stopped.");
// // // // // //         speak("Voice recognition stopped.");
// // // // // //       } else {
// // // // // //         try {
// // // // // //           recognition.start();
// // // // // //         } catch (error) {
// // // // // //           console.error("Error starting recognition:", error);
// // // // // //           setStatus("Error starting voice recognition.");
// // // // // //           speak("Error starting voice recognition.");
// // // // // //         }
// // // // // //       }
// // // // // //     }
// // // // // //   };

// // // // // //   // Fetch all reminders
// // // // // //   const fetchReminders = async () => {
// // // // // //     try {
// // // // // //       setLoading(true);
// // // // // //       const token = localStorage.getItem("token");
// // // // // //       const response = await axios.get(
// // // // // //         "http://127.0.0.1:8000/api/medication-reminders/",
// // // // // //         {
// // // // // //           headers: {
// // // // // //             Authorization: `Bearer ${token}`,
// // // // // //           },
// // // // // //         }
// // // // // //       );
// // // // // //       setReminders(response.data);
// // // // // //       setStatus(`Loaded ${response.data.length} medication reminders`);
// // // // // //       speak(`Loaded ${response.data.length} medication reminders`);
// // // // // //     } catch (error) {
// // // // // //       console.error("Error fetching reminders:", error);
// // // // // //       setStatus("Error loading medication reminders");
// // // // // //       speak("Error loading medication reminders");
// // // // // //     } finally {
// // // // // //       setLoading(false);
// // // // // //     }
// // // // // //   };

// // // // // //   useEffect(() => {
// // // // // //     fetchReminders();
    
// // // // // //     // Auto-announce on load
// // // // // //     setTimeout(() => {
// // // // // //       speak("Medication reminder page loaded. Say 'help' for voice commands or 'add medication' to start.");
// // // // // //     }, 1000);
// // // // // //   }, []);

// // // // // //   // Handle form input changes
// // // // // //   const handleInputChange = (e) => {
// // // // // //     const { name, value } = e.target;
// // // // // //     setFormData(prev => ({
// // // // // //       ...prev,
// // // // // //       [name]: value
// // // // // //     }));
// // // // // //   };

// // // // // //   // Validate form
// // // // // //   const validateForm = () => {
// // // // // //     if (!formData.medicine_name.trim()) {
// // // // // //       setStatus("Please enter medicine name");
// // // // // //       speak("Please enter medicine name");
// // // // // //       return false;
// // // // // //     }
// // // // // //     if (!formData.time_of_day) {
// // // // // //       setStatus("Please select time of day");
// // // // // //       speak("Please select time of day");
// // // // // //       return false;
// // // // // //     }
// // // // // //     return true;
// // // // // //   };

// // // // // //   // Create new reminder
// // // // // //   const createReminder = async (e) => {
// // // // // //     e?.preventDefault();
    
// // // // // //     if (!validateForm()) return;

// // // // // //     try {
// // // // // //       setLoading(true);
// // // // // //       const token = localStorage.getItem("token");
      
// // // // // //       const payload = {
// // // // // //         medicine_name: formData.medicine_name,
// // // // // //         time_of_day: formData.time_of_day,
// // // // // //         repeat_frequency: formData.repeat_frequency,
// // // // // //         dosage_info: formData.dosage_info,
// // // // // //         duration_days: parseInt(formData.duration_days)
// // // // // //       };

// // // // // //       const response = await axios.post(
// // // // // //         "http://127.0.0.1:8000/api/medication-reminders/",
// // // // // //         payload,
// // // // // //         {
// // // // // //           headers: {
// // // // // //             Authorization: `Bearer ${token}`,
// // // // // //             "Content-Type": "application/json",
// // // // // //           },
// // // // // //         }
// // // // // //       );

// // // // // //       setReminders(prev => [...prev, response.data]);
// // // // // //       setStatus(`Medication reminder for ${formData.medicine_name} created successfully!`);
// // // // // //       speak(`Medication reminder for ${formData.medicine_name} created successfully`);
      
// // // // // //       // Reset form
// // // // // //       setFormData({
// // // // // //         medicine_name: "",
// // // // // //         time_of_day: "",
// // // // // //         repeat_frequency: "daily",
// // // // // //         dosage_info: "",
// // // // // //         duration_days: 30
// // // // // //       });
      
// // // // // //       // Announce new count
// // // // // //       setTimeout(() => {
// // // // // //         speak(`You now have ${reminders.length + 1} medication reminders.`);
// // // // // //       }, 500);
// // // // // //     } catch (error) {
// // // // // //       console.error("Error creating reminder:", error);
// // // // // //       let errorMessage = "Error creating medication reminder";
// // // // // //       if (error.response?.data) {
// // // // // //         errorMessage = Object.values(error.response.data).flat().join(", ");
// // // // // //       }
// // // // // //       setStatus(errorMessage);
// // // // // //       speak("Error creating medication reminder");
// // // // // //     } finally {
// // // // // //       setLoading(false);
// // // // // //     }
// // // // // //   };

// // // // // //   // Update reminder
// // // // // //   const updateReminder = async (e) => {
// // // // // //     e?.preventDefault();
    
// // // // // //     if (!validateForm()) return;

// // // // // //     try {
// // // // // //       setLoading(true);
// // // // // //       const token = localStorage.getItem("token");
      
// // // // // //       const payload = {
// // // // // //         medicine_name: formData.medicine_name,
// // // // // //         time_of_day: formData.time_of_day,
// // // // // //         repeat_frequency: formData.repeat_frequency,
// // // // // //         dosage_info: formData.dosage_info,
// // // // // //         duration_days: parseInt(formData.duration_days)
// // // // // //       };

// // // // // //       const response = await axios.put(
// // // // // //         `http://127.0.0.1:8000/api/medication-reminders/${editingReminder.id}/`,
// // // // // //         payload,
// // // // // //         {
// // // // // //           headers: {
// // // // // //             Authorization: `Bearer ${token}`,
// // // // // //             "Content-Type": "application/json",
// // // // // //           },
// // // // // //         }
// // // // // //       );

// // // // // //       setReminders(prev => 
// // // // // //         prev.map(reminder => 
// // // // // //           reminder.id === editingReminder.id ? response.data : reminder
// // // // // //         )
// // // // // //       );
      
// // // // // //       setStatus(`Medication reminder for ${formData.medicine_name} updated successfully!`);
// // // // // //       speak(`Medication reminder for ${formData.medicine_name} updated successfully`);
      
// // // // // //       // Reset editing state
// // // // // //       setEditingReminder(null);
// // // // // //       setFormData({
// // // // // //         medicine_name: "",
// // // // // //         time_of_day: "",
// // // // // //         repeat_frequency: "daily",
// // // // // //         dosage_info: "",
// // // // // //         duration_days: 30
// // // // // //       });
// // // // // //     } catch (error) {
// // // // // //       console.error("Error updating reminder:", error);
// // // // // //       let errorMessage = "Error updating medication reminder";
// // // // // //       if (error.response?.data) {
// // // // // //         errorMessage = Object.values(error.response.data).flat().join(", ");
// // // // // //       }
// // // // // //       setStatus(errorMessage);
// // // // // //       speak("Error updating medication reminder");
// // // // // //     } finally {
// // // // // //       setLoading(false);
// // // // // //     }
// // // // // //   };

// // // // // //   // Delete reminder
// // // // // //   const deleteReminder = async (id, medicineName) => {
// // // // // //     if (!window.confirm(`Are you sure you want to delete the reminder for ${medicineName}?`)) {
// // // // // //       return;
// // // // // //     }

// // // // // //     try {
// // // // // //       const token = localStorage.getItem("token");
// // // // // //       await axios.delete(
// // // // // //         `http://127.0.0.1:8000/api/medication-reminders/${id}/`,
// // // // // //         {
// // // // // //           headers: {
// // // // // //             Authorization: `Bearer ${token}`,
// // // // // //           },
// // // // // //         }
// // // // // //       );

// // // // // //       setReminders(prev => prev.filter(reminder => reminder.id !== id));
// // // // // //       setStatus(`Medication reminder for ${medicineName} deleted successfully`);
// // // // // //       speak(`Medication reminder for ${medicineName} deleted successfully`);
      
// // // // // //       // Announce new count
// // // // // //       setTimeout(() => {
// // // // // //         speak(`You now have ${reminders.length - 1} medication reminders.`);
// // // // // //       }, 500);
// // // // // //     } catch (error) {
// // // // // //       console.error("Error deleting reminder:", error);
// // // // // //       setStatus("Error deleting medication reminder");
// // // // // //       speak("Error deleting medication reminder");
// // // // // //     }
// // // // // //   };

// // // // // //   // Toggle reminder active status
// // // // // //   const toggleReminderStatus = async (reminder) => {
// // // // // //     try {
// // // // // //       const token = localStorage.getItem("token");
// // // // // //       const response = await axios.patch(
// // // // // //         `http://127.0.0.1:8000/api/medication-reminders/${reminder.id}/`,
// // // // // //         { active: !reminder.active },
// // // // // //         {
// // // // // //           headers: {
// // // // // //             Authorization: `Bearer ${token}`,
// // // // // //             "Content-Type": "application/json",
// // // // // //           },
// // // // // //         }
// // // // // //       );

// // // // // //       setReminders(prev => 
// // // // // //         prev.map(r => r.id === reminder.id ? response.data : r)
// // // // // //       );
      
// // // // // //       const action = response.data.active ? "activated" : "deactivated";
// // // // // //       setStatus(`Medication reminder ${action} successfully`);
// // // // // //       speak(`Medication reminder for ${reminder.medicine_name} ${action}`);
// // // // // //     } catch (error) {
// // // // // //       console.error("Error toggling reminder status:", error);
// // // // // //       setStatus("Error updating reminder status");
// // // // // //       speak("Error updating reminder status");
// // // // // //     }
// // // // // //   };

// // // // // //   // Start editing a reminder
// // // // // //   const startEditing = (reminder) => {
// // // // // //     setEditingReminder(reminder);
// // // // // //     setFormData({
// // // // // //       medicine_name: reminder.medicine_name,
// // // // // //       time_of_day: reminder.time_of_day,
// // // // // //       repeat_frequency: reminder.repeat_frequency,
// // // // // //       dosage_info: reminder.dosage_info || "",
// // // // // //       duration_days: reminder.duration_days || 30
// // // // // //     });
// // // // // //     speak(`Editing reminder for ${reminder.medicine_name}. Say 'save medication' to update or 'cancel' to stop.`);
// // // // // //   };

// // // // // //   // Cancel editing
// // // // // //   const cancelEditing = () => {
// // // // // //     setEditingReminder(null);
// // // // // //     setFormData({
// // // // // //       medicine_name: "",
// // // // // //       time_of_day: "",
// // // // // //       repeat_frequency: "daily",
// // // // // //       dosage_info: "",
// // // // // //       duration_days: 30
// // // // // //     });
// // // // // //     speak("Cancelled editing");
// // // // // //   };

// // // // // //   // Format time for display
// // // // // //   const formatTime = (timeString) => {
// // // // // //     if (!timeString) return "";
// // // // // //     const time = new Date(`2000-01-01T${timeString}`);
// // // // // //     return time.toLocaleTimeString('en-US', { 
// // // // // //       hour: '2-digit', 
// // // // // //       minute: '2-digit',
// // // // // //       hour12: true 
// // // // // //     });
// // // // // //   };

// // // // // //   const handleLogout = async () => {
// // // // // //     setStatus("Logging out...");
// // // // // //     speak("Logging out...");

// // // // // //     try {
// // // // // //       const token = localStorage.getItem("token");
// // // // // //       if (token) {
// // // // // //         await axios.post(
// // // // // //           "http://127.0.0.1:8000/auth/voice-logout/",
// // // // // //           {},
// // // // // //           {
// // // // // //             headers: {
// // // // // //               Authorization: `Bearer ${token}`,
// // // // // //               "Content-Type": "application/json",
// // // // // //             },
// // // // // //           }
// // // // // //         );
// // // // // //       }
// // // // // //     } catch (error) {
// // // // // //       console.error("Logout backend error:", error.response?.data || error.message);
// // // // // //     } finally {
// // // // // //       localStorage.clear();
// // // // // //       setTimeout(() => navigate("/"), 1500);
// // // // // //     }
// // // // // //   };

// // // // // //   const handleBackToDashboard = () => {
// // // // // //     navigate("/dashboard");
// // // // // //   };

// // // // // //   // Handle form submission
// // // // // //   const handleSubmit = (e) => {
// // // // // //     if (editingReminder) {
// // // // // //       updateReminder(e);
// // // // // //     } else {
// // // // // //       createReminder(e);
// // // // // //     }
// // // // // //   };

// // // // // //   return (
// // // // // //     <div className="medication-reminder-container">
// // // // // //       {/* Fixed Header */}
// // // // // //       <header className="dashboard-header fixed-header">
// // // // // //         <div className="header-content">
// // // // // //           <div className="header-left">
// // // // // //             <button className="back-btn" onClick={handleBackToDashboard}>
// // // // // //               ← Back to Dashboard
// // // // // //             </button>
// // // // // //             <h1 className="logo">Vision Assist</h1>
// // // // // //           </div>
// // // // // //           <div className="user-menu">
// // // // // //             {/* Voice Control Button */}
// // // // // //             <button 
// // // // // //               className={`voice-btn ${isListening ? 'listening' : ''}`}
// // // // // //               onClick={toggleVoiceRecognition}
// // // // // //               title={isListening ? "Stop listening" : "Start voice commands"}
// // // // // //             >
// // // // // //               {isListening ? "🎤 Listening..." : "🎤 Voice"}
// // // // // //             </button>
            
// // // // // //             <button className="logout-btn" onClick={handleLogout}>
// // // // // //               Logout
// // // // // //             </button>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       </header>

// // // // // //       <div className="medication-content">
// // // // // //         <div className="medication-header">
// // // // // //           <h2>💊 Medication Reminder</h2>
// // // // // //           <p>Manage your medication schedule and reminders</p>
          
// // // // // //           {/* Voice Status Indicator */}
// // // // // //           <div className={`voice-status ${isListening ? 'active' : ''}`}>
// // // // // //             <span className="voice-indicator">
// // // // // //               {isListening ? "🔊 Voice commands active" : "🎤 Say 'voice' to start"}
// // // // // //             </span>
// // // // // //             <button 
// // // // // //               className="voice-help-btn"
// // // // // //               onClick={() => setShowVoiceHelp(!showVoiceHelp)}
// // // // // //             >
// // // // // //               {showVoiceHelp ? "Hide Help" : "Voice Help"}
// // // // // //             </button>
// // // // // //           </div>
// // // // // //         </div>

// // // // // //         {/* Voice Commands Help Panel */}
// // // // // //         {showVoiceHelp && (
// // // // // //           <div className="voice-help-panel">
// // // // // //             <h3>🎤 Voice Commands Guide</h3>
// // // // // //             <div className="voice-commands-grid">
// // // // // //               <div className="voice-category">
// // // // // //                 <h4>Navigation</h4>
// // // // // //                 <ul>
// // // // // //                   <li>"go back" - Return to dashboard</li>
// // // // // //                   <li>"logout" - Sign out</li>
// // // // // //                   <li>"go to dashboard" - Navigate home</li>
// // // // // //                 </ul>
// // // // // //               </div>
              
// // // // // //               <div className="voice-category">
// // // // // //                 <h4>Form Operations</h4>
// // // // // //                 <ul>
// // // // // //                   <li>"add medication" - Start new reminder</li>
// // // // // //                   <li>"save medication" - Save current form</li>
// // // // // //                   <li>"cancel" - Cancel editing/clear form</li>
// // // // // //                   <li>"focus medicine name" - Go to medicine field</li>
// // // // // //                   <li>"focus time" - Go to time field</li>
// // // // // //                 </ul>
// // // // // //               </div>
              
// // // // // //               <div className="voice-category">
// // // // // //                 <h4>Time Settings</h4>
// // // // // //                 <ul>
// // // // // //                   <li>"set time to morning" - 8:00 AM</li>
// // // // // //                   <li>"set time to afternoon" - 2:00 PM</li>
// // // // // //                   <li>"set time to evening" - 6:00 PM</li>
// // // // // //                   <li>"set time to night" - 10:00 PM</li>
// // // // // //                   <li>"set daily/weekly/monthly" - Set frequency</li>
// // // // // //                 </ul>
// // // // // //               </div>
              
// // // // // //               <div className="voice-category">
// // // // // //                 <h4>Data Management</h4>
// // // // // //                 <ul>
// // // // // //                   <li>"list reminders" - Announce all reminders</li>
// // // // // //                   <li>"refresh reminders" - Reload list</li>
// // // // // //                   <li>"clear status" - Clear status message</li>
// // // // // //                   <li>"medicine [name]" - Set medicine name</li>
// // // // // //                   <li>"help" - Show this guide</li>
// // // // // //                 </ul>
// // // // // //               </div>
// // // // // //             </div>
// // // // // //             <div className="voice-tips">
// // // // // //               <p><strong>Tip:</strong> Speak clearly and naturally. Say "medicine" followed by the name to set medicine field.</p>
// // // // // //               <button 
// // // // // //                 className="close-help-btn"
// // // // // //                 onClick={() => setShowVoiceHelp(false)}
// // // // // //               >
// // // // // //                 Close Help
// // // // // //               </button>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         )}

// // // // // //         {/* Status Message */}
// // // // // //         {status && (
// // // // // //           <div className="status-message">
// // // // // //             {status}
// // // // // //             <button 
// // // // // //               className="clear-status-btn"
// // // // // //               onClick={() => setStatus("")}
// // // // // //               title="Clear status"
// // // // // //             >
// // // // // //               ×
// // // // // //             </button>
// // // // // //           </div>
// // // // // //         )}

// // // // // //         {/* Add/Edit Form */}
// // // // // //         <div className="medication-form-section">
// // // // // //           <h3>{editingReminder ? "Edit Medication" : "Add New Medication"}</h3>
// // // // // //           <form onSubmit={handleSubmit} className="medication-form">
// // // // // //             <div className="form-row">
// // // // // //               <div className="form-group">
// // // // // //                 <label htmlFor="medicine_name">Medicine Name *</label>
// // // // // //                 <input
// // // // // //                   ref={medicineNameRef}
// // // // // //                   type="text"
// // // // // //                   id="medicine_name"
// // // // // //                   name="medicine_name"
// // // // // //                   value={formData.medicine_name}
// // // // // //                   onChange={handleInputChange}
// // // // // //                   placeholder="e.g., Dolo 650"
// // // // // //                   required
// // // // // //                   aria-label="Medicine name"
// // // // // //                 />
// // // // // //                 <span className="voice-hint">Say "medicine [name]" or "focus medicine name"</span>
// // // // // //               </div>

// // // // // //               <div className="form-group">
// // // // // //                 <label htmlFor="time_of_day">Time of Day *</label>
// // // // // //                 <input
// // // // // //                   ref={timeOfDayRef}
// // // // // //                   type="time"
// // // // // //                   id="time_of_day"
// // // // // //                   name="time_of_day"
// // // // // //                   value={formData.time_of_day}
// // // // // //                   onChange={handleInputChange}
// // // // // //                   required
// // // // // //                   aria-label="Time of day"
// // // // // //                 />
// // // // // //                 <span className="voice-hint">Say "set time to morning" or "focus time"</span>
// // // // // //               </div>
// // // // // //             </div>

// // // // // //             <div className="form-row">
// // // // // //               <div className="form-group">
// // // // // //                 <label htmlFor="repeat_frequency">Repeat Frequency *</label>
// // // // // //                 <select
// // // // // //                   ref={repeatFrequencyRef}
// // // // // //                   id="repeat_frequency"
// // // // // //                   name="repeat_frequency"
// // // // // //                   value={formData.repeat_frequency}
// // // // // //                   onChange={handleInputChange}
// // // // // //                   required
// // // // // //                   aria-label="Repeat frequency"
// // // // // //                 >
// // // // // //                   <option value="daily">Daily</option>
// // // // // //                   <option value="weekly">Weekly</option>
// // // // // //                   <option value="monthly">Monthly</option>
// // // // // //                 </select>
// // // // // //                 <span className="voice-hint">Say "set daily", "set weekly", or "set monthly"</span>
// // // // // //               </div>

// // // // // //               <div className="form-group">
// // // // // //                 <label htmlFor="duration_days">Duration (Days)</label>
// // // // // //                 <input
// // // // // //                   ref={durationDaysRef}
// // // // // //                   type="number"
// // // // // //                   id="duration_days"
// // // // // //                   name="duration_days"
// // // // // //                   value={formData.duration_days}
// // // // // //                   onChange={handleInputChange}
// // // // // //                   min="1"
// // // // // //                   max="365"
// // // // // //                   aria-label="Duration in days"
// // // // // //                 />
// // // // // //                 <span className="voice-hint">Say "focus duration" to edit</span>
// // // // // //               </div>
// // // // // //             </div>

// // // // // //             <div className="form-group">
// // // // // //               <label htmlFor="dosage_info">Dosage Information</label>
// // // // // //               <input
// // // // // //                 ref={dosageInfoRef}
// // // // // //                 type="text"
// // // // // //                 id="dosage_info"
// // // // // //                 name="dosage_info"
// // // // // //                 value={formData.dosage_info}
// // // // // //                 onChange={handleInputChange}
// // // // // //                 placeholder="e.g., 1 tablet after food"
// // // // // //                 aria-label="Dosage information"
// // // // // //               />
// // // // // //               <span className="voice-hint">Say "dosage [instructions]" or "focus dosage"</span>
// // // // // //             </div>

// // // // // //             <div className="form-actions">
// // // // // //               <button 
// // // // // //                 type="submit" 
// // // // // //                 className="submit-btn"
// // // // // //                 disabled={loading}
// // // // // //                 aria-label={editingReminder ? "Update reminder" : "Add reminder"}
// // // // // //               >
// // // // // //                 {loading ? "Saving..." : (editingReminder ? "Update Reminder" : "Add Reminder")}
// // // // // //               </button>
              
// // // // // //               {editingReminder && (
// // // // // //                 <button 
// // // // // //                   type="button" 
// // // // // //                   className="cancel-btn"
// // // // // //                   onClick={cancelEditing}
// // // // // //                   aria-label="Cancel editing"
// // // // // //                 >
// // // // // //                   Cancel
// // // // // //                 </button>
// // // // // //               )}
              
// // // // // //               <button 
// // // // // //                 type="button" 
// // // // // //                 className="voice-submit-btn"
// // // // // //                 onClick={() => speak("Say 'save medication' to submit the form")}
// // // // // //                 aria-label="Voice submit instructions"
// // // // // //               >
// // // // // //                 🎤 Voice Save
// // // // // //               </button>
// // // // // //             </div>
// // // // // //           </form>
// // // // // //         </div>

// // // // // //         {/* Reminders List */}
// // // // // //         <div className="reminders-list-section">
// // // // // //           <div className="section-header">
// // // // // //             <h3>Your Medication Reminders ({reminders.length})</h3>
// // // // // //             <button 
// // // // // //               className="refresh-btn"
// // // // // //               onClick={fetchReminders}
// // // // // //               aria-label="Refresh reminders"
// // // // // //             >
// // // // // //               ⟳ Refresh
// // // // // //             </button>
// // // // // //           </div>
          
// // // // // //           {loading && reminders.length === 0 ? (
// // // // // //             <div className="loading">Loading reminders...</div>
// // // // // //           ) : reminders.length === 0 ? (
// // // // // //             <div className="empty-state">
// // // // // //               <p>No medication reminders yet. Add your first reminder above.</p>
// // // // // //               <button 
// // // // // //                 className="voice-action-btn"
// // // // // //                 onClick={() => speak("Say 'add medication' to create your first reminder")}
// // // // // //               >
// // // // // //                 🎤 Try Voice Command
// // // // // //               </button>
// // // // // //             </div>
// // // // // //           ) : (
// // // // // //             <div className="reminders-grid">
// // // // // //               {reminders.map(reminder => (
// // // // // //                 <div key={reminder.id} className={`reminder-card ${reminder.active ? 'active' : 'inactive'}`}>
// // // // // //                   <div className="reminder-header">
// // // // // //                     <h4>{reminder.medicine_name}</h4>
// // // // // //                     <span className={`status-badge ${reminder.active ? 'active' : 'inactive'}`}>
// // // // // //                       {reminder.active ? 'Active' : 'Inactive'}
// // // // // //                     </span>
// // // // // //                   </div>
                  
// // // // // //                   <div className="reminder-details">
// // // // // //                     <div className="detail-item">
// // // // // //                       <span className="label">Time:</span>
// // // // // //                       <span className="value">{formatTime(reminder.time_of_day)}</span>
// // // // // //                     </div>
                    
// // // // // //                     <div className="detail-item">
// // // // // //                       <span className="label">Frequency:</span>
// // // // // //                       <span className="value">{reminder.repeat_frequency}</span>
// // // // // //                     </div>
                    
// // // // // //                     {reminder.dosage_info && (
// // // // // //                       <div className="detail-item">
// // // // // //                         <span className="label">Dosage:</span>
// // // // // //                         <span className="value">{reminder.dosage_info}</span>
// // // // // //                       </div>
// // // // // //                     )}
                    
// // // // // //                     <div className="detail-item">
// // // // // //                       <span className="label">Duration:</span>
// // // // // //                       <span className="value">{reminder.duration_days} days</span>
// // // // // //                     </div>
// // // // // //                   </div>

// // // // // //                   <div className="reminder-actions">
// // // // // //                     <button 
// // // // // //                       className="edit-btn"
// // // // // //                       onClick={() => startEditing(reminder)}
// // // // // //                       aria-label={`Edit ${reminder.medicine_name}`}
// // // // // //                     >
// // // // // //                       Edit
// // // // // //                     </button>
                    
// // // // // //                     <button 
// // // // // //                       className={`toggle-btn ${reminder.active ? 'deactivate' : 'activate'}`}
// // // // // //                       onClick={() => toggleReminderStatus(reminder)}
// // // // // //                       aria-label={reminder.active ? `Deactivate ${reminder.medicine_name}` : `Activate ${reminder.medicine_name}`}
// // // // // //                     >
// // // // // //                       {reminder.active ? 'Deactivate' : 'Activate'}
// // // // // //                     </button>
                    
// // // // // //                     <button 
// // // // // //                       className="delete-btn"
// // // // // //                       onClick={() => deleteReminder(reminder.id, reminder.medicine_name)}
// // // // // //                       aria-label={`Delete ${reminder.medicine_name}`}
// // // // // //                     >
// // // // // //                       Delete
// // // // // //                     </button>
// // // // // //                   </div>
                  
// // // // // //                   <div className="reminder-voice-hint">
// // // // // //                     Say "medicine {reminder.medicine_name}" to edit this reminder
// // // // // //                   </div>
// // // // // //                 </div>
// // // // // //               ))}
// // // // // //             </div>
// // // // // //           )}
// // // // // //         </div>
// // // // // //       </div>

// // // // // //       {/* Status Bar */}
// // // // // //       <div className="status-bar">
// // // // // //         <div className="status-content">
// // // // // //           <p>{status || "Ready for voice commands"}</p>
// // // // // //           <div className="voice-controls">
// // // // // //             <button 
// // // // // //               className={`mic-btn ${isListening ? 'active' : ''}`}
// // // // // //               onClick={toggleVoiceRecognition}
// // // // // //               aria-label={isListening ? "Stop listening" : "Start listening"}
// // // // // //             >
// // // // // //               {isListening ? "🔴 Stop" : "🎤 Start"}
// // // // // //             </button>
// // // // // //             <span className="listening-status">
// // // // // //               {isListening ? "Listening..." : "Voice commands available"}
// // // // // //             </span>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default MedicationReminder;


// // // // // import React, { useState, useEffect, useRef, useCallback } from "react";
// // // // // import { useNavigate } from "react-router-dom";
// // // // // import axios from "axios";
// // // // // import "./MedicationReminder.css";

// // // // // // Enhanced voice command vocabulary with patterns
// // // // // const VOICE_COMMANDS = {
// // // // //   // Navigation commands
// // // // //   "go back": "back",
// // // // //   "go to dashboard": "dashboard",
// // // // //   "logout": "logout",
// // // // //   "sign out": "logout",
// // // // //   "exit": "logout",
  
// // // // //   // Form commands
// // // // //   "add medication": "add",
// // // // //   "create reminder": "add",
// // // // //   "new medication": "add",
// // // // //   "save medication": "save",
// // // // //   "submit form": "save",
// // // // //   "save": "save",
// // // // //   "update": "save",
// // // // //   "cancel": "cancel",
// // // // //   "stop editing": "cancel",
// // // // //   "clear form": "cancel",
// // // // //   "reset form": "cancel",
  
// // // // //   // List commands
// // // // //   "list reminders": "list",
// // // // //   "show medications": "list",
// // // // //   "show all": "list",
// // // // //   "what are my medications": "list",
// // // // //   "refresh reminders": "refresh",
// // // // //   "reload": "refresh",
// // // // //   "update list": "refresh",
  
// // // // //   // Status commands
// // // // //   "clear status": "clear",
// // // // //   "clear message": "clear",
// // // // //   "dismiss": "clear",
  
// // // // //   // Help
// // // // //   "help": "help",
// // // // //   "what can I say": "help",
// // // // //   "show commands": "help",
// // // // //   "voice help": "help",
// // // // //   "available commands": "help",
  
// // // // //   // Form field navigation
// // // // //   "focus medicine": "focus_medicine",
// // // // //   "focus medicine name": "focus_medicine",
// // // // //   "medicine field": "focus_medicine",
// // // // //   "focus time": "focus_time",
// // // // //   "time field": "focus_time",
// // // // //   "focus frequency": "focus_frequency",
// // // // //   "frequency field": "focus_frequency",
// // // // //   "focus dosage": "focus_dosage",
// // // // //   "dosage field": "focus_dosage",
// // // // //   "focus duration": "focus_duration",
// // // // //   "duration field": "focus_duration",
  
// // // // //   // Complex commands
// // // // //   "create new": "complex_new",
// // // // //   "make new": "complex_new",
// // // // //   "add new": "complex_new",
// // // // //   "edit last": "complex_edit_last",
// // // // //   "delete last": "complex_delete_last",
// // // // //   "toggle last": "complex_toggle_last",
// // // // //   "enable last": "complex_toggle_last",
// // // // //   "disable last": "complex_toggle_last",
  
// // // // //   // Quick actions for existing reminders
// // // // //   "activate all": "activate_all",
// // // // //   "deactivate all": "deactivate_all",
// // // // //   "delete all": "delete_all",
// // // // //   "clear all": "delete_all",
  
// // // // //   // Smart commands for common medicines
// // // // //   "take dolo": "smart_dolo",
// // // // //   "take aspirin": "smart_aspirin",
// // // // //   "take vitamins": "smart_vitamins",
// // // // //   "take paracetamol": "smart_dolo",
// // // // //   "take medicine": "smart_medicine",
// // // // // };

// // // // // // Time patterns mapping
// // // // // const TIME_PATTERNS = {
// // // // //   "morning": "08:00",
// // // // //   "breakfast": "08:00",
// // // // //   "morning time": "08:00",
// // // // //   "afternoon": "14:00",
// // // // //   "lunch": "13:00",
// // // // //   "evening": "18:00",
// // // // //   "dinner": "19:00",
// // // // //   "night": "22:00",
// // // // //   "bedtime": "22:00",
// // // // //   "midnight": "00:00",
// // // // //   "noon": "12:00",
// // // // //   "midday": "12:00",
// // // // // };

// // // // // // Frequency patterns
// // // // // const FREQUENCY_PATTERNS = {
// // // // //   "daily": "daily",
// // // // //   "every day": "daily",
// // // // //   "day": "daily",
// // // // //   "weekly": "weekly",
// // // // //   "every week": "weekly",
// // // // //   "week": "weekly",
// // // // //   "monthly": "monthly",
// // // // //   "every month": "monthly",
// // // // //   "month": "monthly",
// // // // //   "once a day": "daily",
// // // // //   "twice a day": "twice_daily",
// // // // //   "three times a day": "thrice_daily",
// // // // // };

// // // // // const MedicationReminder = () => {
// // // // //   const [reminders, setReminders] = useState([]);
// // // // //   const [loading, setLoading] = useState(false);
// // // // //   const [status, setStatus] = useState("");
// // // // //   const [editingReminder, setEditingReminder] = useState(null);
// // // // //   const [isListening, setIsListening] = useState(false);
// // // // //   const [showVoiceHelp, setShowVoiceHelp] = useState(false);
// // // // //   const [recognition, setRecognition] = useState(null);
// // // // //   const [lastProcessedCommand, setLastProcessedCommand] = useState("");
// // // // //   const navigate = useNavigate();
  
// // // // //   // Refs for form inputs
// // // // //   const medicineNameRef = useRef(null);
// // // // //   const timeOfDayRef = useRef(null);
// // // // //   const repeatFrequencyRef = useRef(null);
// // // // //   const dosageInfoRef = useRef(null);
// // // // //   const durationDaysRef = useRef(null);
  
// // // // //   // Form state
// // // // //   const [formData, setFormData] = useState({
// // // // //     medicine_name: "",
// // // // //     time_of_day: "",
// // // // //     repeat_frequency: "daily",
// // // // //     dosage_info: "",
// // // // //     duration_days: 30
// // // // //   });

// // // // //   // Initialize speech recognition
// // // // //   useEffect(() => {
// // // // //     const initSpeechRecognition = () => {
// // // // //       if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
// // // // //         const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
// // // // //         const recognition = new SpeechRecognition();
        
// // // // //         recognition.continuous = true;
// // // // //         recognition.interimResults = false;
// // // // //         recognition.lang = 'en-US';
        
// // // // //         recognition.onstart = () => {
// // // // //           setIsListening(true);
// // // // //           setStatus("Listening for voice commands...");
// // // // //           speak("Voice commands activated. Say 'add Dolo daily at 8 AM' or 'help' for commands.");
// // // // //         };
        
// // // // //         recognition.onresult = (event) => {
// // // // //           const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase().trim();
// // // // //           console.log("Voice command:", transcript);
// // // // //           setLastProcessedCommand(transcript);
// // // // //           handleVoiceCommand(transcript);
// // // // //         };
        
// // // // //         recognition.onerror = (event) => {
// // // // //           console.error("Speech recognition error:", event.error);
// // // // //           if (event.error === 'no-speech') {
// // // // //             setStatus("No speech detected. Try again.");
// // // // //           } else if (event.error !== 'aborted') {
// // // // //             setStatus("Voice recognition error. Please try again.");
// // // // //           }
// // // // //           setIsListening(false);
// // // // //         };
        
// // // // //         recognition.onend = () => {
// // // // //           setIsListening(false);
// // // // //         };
        
// // // // //         setRecognition(recognition);
// // // // //       } else {
// // // // //         setStatus("Voice recognition not supported in this browser.");
// // // // //       }
// // // // //     };
    
// // // // //     initSpeechRecognition();
// // // // //     return () => {
// // // // //       if (recognition) {
// // // // //         recognition.stop();
// // // // //       }
// // // // //     };
// // // // //   }, []);

// // // // //   // Speak function
// // // // //   const speak = (text) => {
// // // // //     const synth = window.speechSynthesis;
// // // // //     if (!synth) return;
// // // // //     synth.cancel();
// // // // //     const utter = new SpeechSynthesisUtterance(text);
// // // // //     utter.rate = 0.8;
// // // // //     synth.speak(utter);
// // // // //   };

// // // // //   // Enhanced natural language processing for medication commands
// // // // //   const parseMedicationCommand = (command) => {
// // // // //     const result = {
// // // // //       medicine_name: "",
// // // // //       time_of_day: "",
// // // // //       repeat_frequency: "daily",
// // // // //       duration_days: 30,
// // // // //       dosage_info: "",
// // // // //       action: "add"
// // // // //     };

// // // // //     // Extract medicine name patterns
// // // // //     const medicinePatterns = [
// // // // //       /(?:medicine name is|name is|medication is|add|create|take)\s+([a-zA-Z0-9\s]+?)(?:\s+(?:for|at|daily|every|take|medicine)|$)/i,
// // // // //       /^(?:add|create|take)\s+([a-zA-Z0-9\s]+?)\s+(?:for|at|daily|every)/i,
// // // // //       /([a-zA-Z0-9\s]+?)\s+(?:for|at|daily|every|take)/i
// // // // //     ];

// // // // //     for (const pattern of medicinePatterns) {
// // // // //       const match = command.match(pattern);
// // // // //       if (match && match[1]) {
// // // // //         result.medicine_name = match[1].trim();
// // // // //         break;
// // // // //       }
// // // // //     }

// // // // //     // If no pattern matched, try to extract single word medicine names
// // // // //     if (!result.medicine_name) {
// // // // //       const singleWordMedicine = command.match(/\b(dolo|aspirin|paracetamol|vitamins|ibuprofen|metformin|insulin)\b/i);
// // // // //       if (singleWordMedicine) {
// // // // //         result.medicine_name = singleWordMedicine[0].toLowerCase().replace(/^./, str => str.toUpperCase());
// // // // //       }
// // // // //     }

// // // // //     // Extract time patterns
// // // // //     const timePatterns = [
// // // // //       /(\d{1,2})(?::(\d{2}))?\s*(am|pm)/gi,
// // // // //       /(\d{1,2})\s*(am|pm)/gi,
// // // // //       /at\s+(\d{1,2})(?::(\d{2}))?\s*(am|pm)/gi,
// // // // //       /time\s+(?:is|to)\s+(\d{1,2})(?::(\d{2}))?\s*(am|pm)/gi,
// // // // //       /(\d{1,2})\s*(?:o'clock|oclock)\s*(am|pm)/gi
// // // // //     ];

// // // // //     let timeMatch = null;
// // // // //     for (const pattern of timePatterns) {
// // // // //       pattern.lastIndex = 0; // Reset regex
// // // // //       const matches = [...command.matchAll(pattern)];
// // // // //       if (matches.length > 0) {
// // // // //         timeMatch = matches[0];
// // // // //         break;
// // // // //       }
// // // // //     }

// // // // //     if (timeMatch) {
// // // // //       let [_, hours, minutes = "00", meridiem] = timeMatch;
// // // // //       hours = parseInt(hours);
      
// // // // //       // Convert to 24-hour format
// // // // //       if (meridiem?.toLowerCase() === 'pm' && hours < 12) hours += 12;
// // // // //       if (meridiem?.toLowerCase() === 'am' && hours === 12) hours = 0;
      
// // // // //       result.time_of_day = `${hours.toString().padStart(2, '0')}:${minutes}`;
// // // // //     } else {
// // // // //       // Check for time keywords
// // // // //       for (const [keyword, time] of Object.entries(TIME_PATTERNS)) {
// // // // //         if (command.includes(keyword)) {
// // // // //           result.time_of_day = time;
// // // // //           break;
// // // // //         }
// // // // //       }
// // // // //     }

// // // // //     // Extract duration patterns
// // // // //     const durationPatterns = [
// // // // //       /for\s+(\d+)\s+days/gi,
// // // // //       /for\s+(\d+)\s+day/gi,
// // // // //       /(\d+)\s+days/gi,
// // // // //       /duration\s+(?:is|of)\s+(\d+)\s+days/gi,
// // // // //       /(\d+)\s+day/gi
// // // // //     ];

// // // // //     for (const pattern of durationPatterns) {
// // // // //       pattern.lastIndex = 0;
// // // // //       const match = command.match(pattern);
// // // // //       if (match) {
// // // // //         const durationMatch = match[0].match(/\d+/);
// // // // //         if (durationMatch) {
// // // // //           result.duration_days = parseInt(durationMatch[0]);
// // // // //           break;
// // // // //         }
// // // // //       }
// // // // //     }

// // // // //     // Extract frequency patterns
// // // // //     for (const [keyword, frequency] of Object.entries(FREQUENCY_PATTERNS)) {
// // // // //       if (command.includes(keyword)) {
// // // // //         result.repeat_frequency = frequency;
// // // // //         break;
// // // // //       }
// // // // //     }

// // // // //     // Extract dosage information
// // // // //     const dosagePatterns = [
// // // // //       /(\d+)\s*(?:tablet|tab|pill|capsule|mg|ml|drop)s?\s*(?:after|before|with)?\s*(?:food|meal|breakfast|lunch|dinner)?/gi,
// // // // //       /(?:take|dose|dosage)\s+(.+?)(?:\s+(?:for|at|daily|$))/gi,
// // // // //       /(\d+\s*(?:mg|ml|tablet|pill)s?)/gi
// // // // //     ];

// // // // //     for (const pattern of dosagePatterns) {
// // // // //       pattern.lastIndex = 0;
// // // // //       const match = command.match(pattern);
// // // // //       if (match) {
// // // // //         result.dosage_info = match[0].trim();
// // // // //         break;
// // // // //       }
// // // // //     }

// // // // //     // Check for edit/update commands
// // // // //     if (command.includes('edit') || command.includes('update') || command.includes('change')) {
// // // // //       result.action = "edit";
// // // // //     }

// // // // //     // Check for delete/remove commands
// // // // //     if (command.includes('delete') || command.includes('remove') || command.includes('stop')) {
// // // // //       result.action = "delete";
// // // // //     }

// // // // //     return result;
// // // // //   };

// // // // //   // Handle complex natural language commands
// // // // //   const handleComplexCommand = (command) => {
// // // // //     const parsed = parseMedicationCommand(command);
    
// // // // //     if (parsed.medicine_name) {
// // // // //       // Fill form with parsed data
// // // // //       setFormData({
// // // // //         medicine_name: parsed.medicine_name,
// // // // //         time_of_day: parsed.time_of_day || formData.time_of_day,
// // // // //         repeat_frequency: parsed.repeat_frequency,
// // // // //         dosage_info: parsed.dosage_info || formData.dosage_info,
// // // // //         duration_days: parsed.duration_days
// // // // //       });

// // // // //       // Provide feedback
// // // // //       const feedback = [];
// // // // //       if (parsed.medicine_name) feedback.push(`Medicine: ${parsed.medicine_name}`);
// // // // //       if (parsed.time_of_day) feedback.push(`Time: ${formatTime(parsed.time_of_day)}`);
// // // // //       if (parsed.repeat_frequency) feedback.push(`Frequency: ${parsed.repeat_frequency}`);
// // // // //       if (parsed.duration_days) feedback.push(`Duration: ${parsed.duration_days} days`);
      
// // // // //       const feedbackText = feedback.join(", ");
// // // // //       setStatus(`Parsed command: ${feedbackText}`);
// // // // //       speak(`Added ${parsed.medicine_name} to form. ${feedbackText}. Say 'save' to confirm.`);
      
// // // // //       // Auto-save if enough information is provided
// // // // //       if (parsed.medicine_name && parsed.time_of_day) {
// // // // //         setTimeout(() => {
// // // // //           if (confirm(`Do you want to save: ${parsed.medicine_name} at ${formatTime(parsed.time_of_day)} ${parsed.repeat_frequency} for ${parsed.duration_days} days?`)) {
// // // // //             handleSubmit();
// // // // //           }
// // // // //         }, 1000);
// // // // //       }
// // // // //     } else {
// // // // //       // Try to handle other command patterns
// // // // //       handleSingleSentenceCommand(command);
// // // // //     }
// // // // //   };

// // // // //   // Handle single sentence commands
// // // // //   const handleSingleSentenceCommand = (command) => {
// // // // //     // Pattern: "Medicine [name] [frequency] [time] for [duration] days"
// // // // //     const patterns = [
// // // // //       // "Dolo for 20 days daily 7 am"
// // // // //       /^([a-zA-Z0-9\s]+?)\s+for\s+(\d+)\s+days?\s+(\w+)\s+(\d{1,2})(?::(\d{2}))?\s*(am|pm)/i,
// // // // //       // "Daily 9 am Dolo for 30 days"
// // // // //       /^(\w+)\s+(\d{1,2})(?::(\d{2}))?\s*(am|pm)\s+([a-zA-Z0-9\s]+?)\s+for\s+(\d+)\s+days/i,
// // // // //       // "Medicine name is Dolo daily at 8 am for 10 days"
// // // // //       /medicine name is ([a-zA-Z0-9\s]+?)\s+(\w+)\s+(?:at\s+)?(\d{1,2})(?::(\d{2}))?\s*(am|pm)\s+for\s+(\d+)\s+days/i,
// // // // //       // "Name is Aspirin time is 9 pm weekly for 15 days"
// // // // //       /name is ([a-zA-Z0-9\s]+?)\s+time is\s+(\d{1,2})(?::(\d{2}))?\s*(am|pm)\s+(\w+)\s+for\s+(\d+)\s+days/i,
// // // // //       // "Take Dolo 650 at 8 am daily"
// // // // //       /take ([a-zA-Z0-9\s]+?)\s+at\s+(\d{1,2})(?::(\d{2}))?\s*(am|pm)\s+(\w+)/i,
// // // // //     ];

// // // // //     for (const pattern of patterns) {
// // // // //       const match = command.match(pattern);
// // // // //       if (match) {
// // // // //         let medicine_name, repeat_frequency, time_of_day, duration_days;
        
// // // // //         if (pattern === patterns[0]) {
// // // // //           // Pattern 1: "Dolo for 20 days daily 7 am"
// // // // //           [, medicine_name, duration_days, repeat_frequency] = match;
// // // // //           const hour = parseInt(match[4]);
// // // // //           const minute = match[5] || "00";
// // // // //           const meridiem = match[6];
          
// // // // //           let hours = hour;
// // // // //           if (meridiem?.toLowerCase() === 'pm' && hours < 12) hours += 12;
// // // // //           if (meridiem?.toLowerCase() === 'am' && hours === 12) hours = 0;
          
// // // // //           time_of_day = `${hours.toString().padStart(2, '0')}:${minute}`;
// // // // //         } else if (pattern === patterns[1]) {
// // // // //           // Pattern 2: "Daily 9 am Dolo for 30 days"
// // // // //           [, repeat_frequency, hour, minute, meridiem, medicine_name, duration_days] = match;
          
// // // // //           let hours = parseInt(hour);
// // // // //           if (meridiem?.toLowerCase() === 'pm' && hours < 12) hours += 12;
// // // // //           if (meridiem?.toLowerCase() === 'am' && hours === 12) hours = 0;
          
// // // // //           time_of_day = `${hours.toString().padStart(2, '0')}:${minute || "00"}`;
// // // // //         } else if (pattern === patterns[2]) {
// // // // //           // Pattern 3: "Medicine name is Dolo daily at 8 am for 10 days"
// // // // //           [, medicine_name, repeat_frequency, hour, minute, meridiem, duration_days] = match;
          
// // // // //           let hours = parseInt(hour);
// // // // //           if (meridiem?.toLowerCase() === 'pm' && hours < 12) hours += 12;
// // // // //           if (meridiem?.toLowerCase() === 'am' && hours === 12) hours = 0;
          
// // // // //           time_of_day = `${hours.toString().padStart(2, '0')}:${minute || "00"}`;
// // // // //         } else if (pattern === patterns[3]) {
// // // // //           // Pattern 4: "Name is Aspirin time is 9 pm weekly for 15 days"
// // // // //           [, medicine_name, hour, minute, meridiem, repeat_frequency, duration_days] = match;
          
// // // // //           let hours = parseInt(hour);
// // // // //           if (meridiem?.toLowerCase() === 'pm' && hours < 12) hours += 12;
// // // // //           if (meridiem?.toLowerCase() === 'am' && hours === 12) hours = 0;
          
// // // // //           time_of_day = `${hours.toString().padStart(2, '0')}:${minute || "00"}`;
// // // // //         } else if (pattern === patterns[4]) {
// // // // //           // Pattern 5: "Take Dolo 650 at 8 am daily"
// // // // //           [, medicine_name, hour, minute, meridiem, repeat_frequency] = match;
          
// // // // //           let hours = parseInt(hour);
// // // // //           if (meridiem?.toLowerCase() === 'pm' && hours < 12) hours += 12;
// // // // //           if (meridiem?.toLowerCase() === 'am' && hours === 12) hours = 0;
          
// // // // //           time_of_day = `${hours.toString().padStart(2, '0')}:${minute || "00"}`;
// // // // //           duration_days = 30; // Default
// // // // //         }

// // // // //         // Set form data
// // // // //         setFormData(prev => ({
// // // // //           ...prev,
// // // // //           medicine_name: medicine_name.trim(),
// // // // //           time_of_day: time_of_day || prev.time_of_day,
// // // // //           repeat_frequency: repeat_frequency || prev.repeat_frequency,
// // // // //           duration_days: parseInt(duration_days) || prev.duration_days
// // // // //         }));

// // // // //         const feedback = `Added ${medicine_name} at ${formatTime(time_of_day)} ${repeat_frequency} for ${duration_days || 30} days. Say 'save' to confirm.`;
// // // // //         setStatus(feedback);
// // // // //         speak(feedback);
// // // // //         return true;
// // // // //       }
// // // // //     }
// // // // //     return false;
// // // // //   };

// // // // //   // Enhanced voice command handler
// // // // //   const handleVoiceCommand = useCallback((command) => {
// // // // //     console.log("Processing command:", command);
    
// // // // //     // First, try exact command matches
// // // // //     if (VOICE_COMMANDS[command]) {
// // // // //       executeCommand(VOICE_COMMANDS[command], command);
// // // // //       return;
// // // // //     }

// // // // //     // Check for partial matches in simple commands
// // // // //     for (const [key, value] of Object.entries(VOICE_COMMANDS)) {
// // // // //       if (command.includes(key)) {
// // // // //         executeCommand(value, command);
// // // // //         return;
// // // // //       }
// // // // //     }

// // // // //     // Handle complex natural language medication commands
// // // // //     if (
// // // // //       command.includes('medicine') ||
// // // // //       command.includes('medication') ||
// // // // //       command.includes('add') ||
// // // // //       command.includes('create') ||
// // // // //       command.includes('take') ||
// // // // //       command.includes('name is') ||
// // // // //       command.includes('time is') ||
// // // // //       command.includes('daily') ||
// // // // //       command.includes('weekly') ||
// // // // //       command.includes('monthly') ||
// // // // //       /\d+\s*(am|pm)/i.test(command) ||
// // // // //       /\b(for|at)\s+\d+/i.test(command)
// // // // //     ) {
// // // // //       handleComplexCommand(command);
// // // // //       return;
// // // // //     }

// // // // //     // Handle specific medicine actions
// // // // //     if (command.includes('dolo') || command.includes('aspirin') || command.includes('vitamin')) {
// // // // //       handleMedicineSpecificCommand(command);
// // // // //       return;
// // // // //     }

// // // // //     // Handle numeric time commands
// // // // //     if (/\b(\d{1,2})\s*(am|pm)\b/i.test(command)) {
// // // // //       handleTimeCommand(command);
// // // // //       return;
// // // // //     }

// // // // //     // Handle duration commands
// // // // //     if (command.includes('days') || command.includes('day')) {
// // // // //       handleDurationCommand(command);
// // // // //       return;
// // // // //     }

// // // // //     // Default response
// // // // //     setStatus(`Command not understood: "${command}". Try: "Add Dolo daily at 8 AM" or "Medicine name is Aspirin for 10 days"`);
// // // // //     speak(`Command not understood. Try saying something like: Add Dolo daily at 8 AM, or Medicine name is Aspirin for 10 days.`);
// // // // //   }, [formData, editingReminder, reminders]);

// // // // //   // Handle medicine-specific commands
// // // // //   const handleMedicineSpecificCommand = (command) => {
// // // // //     const medicines = {
// // // // //       'dolo': 'Dolo 650',
// // // // //       'aspirin': 'Aspirin',
// // // // //       'vitamin': 'Multivitamin',
// // // // //       'paracetamol': 'Paracetamol'
// // // // //     };

// // // // //     for (const [key, medicine] of Object.entries(medicines)) {
// // // // //       if (command.includes(key)) {
// // // // //         setFormData(prev => ({ ...prev, medicine_name: medicine }));
// // // // //         setStatus(`Medicine set to ${medicine}. Now say the time, like "8 AM" or "set time to morning".`);
// // // // //         speak(`${medicine} selected. Now say the time.`);
// // // // //         return;
// // // // //       }
// // // // //     }
// // // // //   };

// // // // //   // Execute matched command
// // // // //   const executeCommand = (command, originalCommand) => {
// // // // //     switch(command) {
// // // // //       case 'back':
// // // // //         handleBackToDashboard();
// // // // //         break;
// // // // //       case 'dashboard':
// // // // //         navigate("/dashboard");
// // // // //         break;
// // // // //       case 'logout':
// // // // //         handleLogout();
// // // // //         break;
// // // // //       case 'add':
// // // // //         if (editingReminder) {
// // // // //           setStatus("Currently editing a reminder. Say 'cancel' first or 'save' to update.");
// // // // //           speak("Currently editing a reminder. Say cancel first or save to update.");
// // // // //         } else {
// // // // //           setStatus("Ready for medication details. Say: 'Medicine name is [name] at [time] for [days] days'");
// // // // //           speak("Ready for medication details. Say something like: Medicine name is Dolo at 8 AM for 10 days. Or simply: Add Dolo daily at 8 AM.");
// // // // //         }
// // // // //         break;
// // // // //       case 'save':
// // // // //         if (formData.medicine_name) {
// // // // //           handleSubmit();
// // // // //         } else {
// // // // //           setStatus("Please specify a medicine name first. Say 'Medicine name is [name]'");
// // // // //           speak("Please specify a medicine name first.");
// // // // //         }
// // // // //         break;
// // // // //       case 'cancel':
// // // // //         if (editingReminder) {
// // // // //           cancelEditing();
// // // // //         } else {
// // // // //           setFormData({
// // // // //             medicine_name: "",
// // // // //             time_of_day: "",
// // // // //             repeat_frequency: "daily",
// // // // //             dosage_info: "",
// // // // //             duration_days: 30
// // // // //           });
// // // // //           setStatus("Form cleared.");
// // // // //           speak("Form cleared.");
// // // // //         }
// // // // //         break;
// // // // //       case 'list':
// // // // //         if (reminders.length > 0) {
// // // // //           const activeCount = reminders.filter(r => r.active).length;
// // // // //           const reminderList = reminders.slice(0, 3).map(r => 
// // // // //             `${r.medicine_name} at ${formatTime(r.time_of_day)}`
// // // // //           ).join(", ");
          
// // // // //           speak(`You have ${reminders.length} medication reminders. ${activeCount} are active. Recent: ${reminderList}`);
// // // // //           setStatus(`You have ${reminders.length} reminders (${activeCount} active)`);
// // // // //         } else {
// // // // //           speak("You have no medication reminders yet.");
// // // // //         }
// // // // //         break;
// // // // //       case 'refresh':
// // // // //         fetchReminders();
// // // // //         break;
// // // // //       case 'clear':
// // // // //         setStatus("");
// // // // //         break;
// // // // //       case 'help':
// // // // //         showVoiceCommands();
// // // // //         break;
// // // // //       case 'focus_medicine':
// // // // //         medicineNameRef.current?.focus();
// // // // //         speak("Medicine name field focused. Say the medicine name.");
// // // // //         break;
// // // // //       case 'focus_time':
// // // // //         timeOfDayRef.current?.focus();
// // // // //         speak("Time field focused. Say the time.");
// // // // //         break;
// // // // //       case 'focus_frequency':
// // // // //         repeatFrequencyRef.current?.focus();
// // // // //         speak("Frequency field focused.");
// // // // //         break;
// // // // //       case 'focus_dosage':
// // // // //         dosageInfoRef.current?.focus();
// // // // //         speak("Dosage field focused. Say dosage instructions.");
// // // // //         break;
// // // // //       case 'focus_duration':
// // // // //         durationDaysRef.current?.focus();
// // // // //         speak("Duration field focused. Say number of days.");
// // // // //         break;
// // // // //       case 'complex_new':
// // // // //         setFormData({
// // // // //           medicine_name: "",
// // // // //           time_of_day: "",
// // // // //           repeat_frequency: "daily",
// // // // //           dosage_info: "",
// // // // //           duration_days: 30
// // // // //         });
// // // // //         setStatus("Ready for new medication. Example: 'Add Dolo 650 at 8 AM daily for 10 days'");
// // // // //         speak("Ready for new medication. Say something like: Add Dolo 650 at 8 AM daily for 10 days.");
// // // // //         break;
// // // // //       case 'complex_edit_last':
// // // // //         if (reminders.length > 0) {
// // // // //           startEditing(reminders[reminders.length - 1]);
// // // // //         } else {
// // // // //           speak("No reminders to edit.");
// // // // //         }
// // // // //         break;
// // // // //       case 'complex_delete_last':
// // // // //         if (reminders.length > 0) {
// // // // //           const lastReminder = reminders[reminders.length - 1];
// // // // //           deleteReminder(lastReminder.id, lastReminder.medicine_name);
// // // // //         } else {
// // // // //           speak("No reminders to delete.");
// // // // //         }
// // // // //         break;
// // // // //       case 'complex_toggle_last':
// // // // //         if (reminders.length > 0) {
// // // // //           const lastReminder = reminders[reminders.length - 1];
// // // // //           toggleReminderStatus(lastReminder);
// // // // //         } else {
// // // // //           speak("No reminders to toggle.");
// // // // //         }
// // // // //         break;
// // // // //       case 'activate_all':
// // // // //         activateAllReminders(true);
// // // // //         break;
// // // // //       case 'deactivate_all':
// // // // //         activateAllReminders(false);
// // // // //         break;
// // // // //       case 'delete_all':
// // // // //         if (reminders.length > 0) {
// // // // //           if (window.confirm(`Are you sure you want to delete all ${reminders.length} reminders?`)) {
// // // // //             deleteAllReminders();
// // // // //           }
// // // // //         } else {
// // // // //           speak("No reminders to delete.");
// // // // //         }
// // // // //         break;
// // // // //       case 'smart_dolo':
// // // // //         handleSmartMedicineCommand("Dolo 650", "08:00", "daily", 30);
// // // // //         break;
// // // // //       case 'smart_aspirin':
// // // // //         handleSmartMedicineCommand("Aspirin", "20:00", "daily", 30);
// // // // //         break;
// // // // //       case 'smart_vitamins':
// // // // //         handleSmartMedicineCommand("Multivitamins", "09:00", "daily", 30);
// // // // //         break;
// // // // //       case 'smart_medicine':
// // // // //         setStatus("Please specify medicine name. Example: 'Take Dolo' or 'Take Aspirin'");
// // // // //         speak("Please specify medicine name. Say 'Take Dolo' or 'Take Aspirin'");
// // // // //         break;
// // // // //       default:
// // // // //         setStatus(`Command executed: ${originalCommand}`);
// // // // //     }
// // // // //   };

// // // // //   // Handle smart medicine commands
// // // // //   const handleSmartMedicineCommand = (medicine, time, frequency, duration) => {
// // // // //     setFormData({
// // // // //       medicine_name: medicine,
// // // // //       time_of_day: time,
// // // // //       repeat_frequency: frequency,
// // // // //       dosage_info: "1 tablet",
// // // // //       duration_days: duration
// // // // //     });
    
// // // // //     const feedback = `${medicine} set for ${formatTime(time)} ${frequency} for ${duration} days. Say 'save' to confirm.`;
// // // // //     setStatus(feedback);
// // // // //     speak(feedback);
// // // // //   };

// // // // //   // Handle time commands with natural language
// // // // //   const handleTimeCommand = (command) => {
// // // // //     // Extract time from command
// // // // //     const timeMatch = command.match(/(\d{1,2})\s*(am|pm)/i);
// // // // //     if (timeMatch) {
// // // // //       let hours = parseInt(timeMatch[1]);
// // // // //       const meridiem = timeMatch[2].toLowerCase();
      
// // // // //       // Convert to 24-hour format
// // // // //       if (meridiem === 'pm' && hours < 12) hours += 12;
// // // // //       if (meridiem === 'am' && hours === 12) hours = 0;
      
// // // // //       const timeString = `${hours.toString().padStart(2, '0')}:00`;
// // // // //       setFormData(prev => ({ ...prev, time_of_day: timeString }));
      
// // // // //       const formattedTime = formatTime(timeString);
// // // // //       setStatus(`Time set to ${formattedTime}`);
// // // // //       speak(`Time set to ${formattedTime}`);
      
// // // // //       // If medicine name is already set, ask for confirmation
// // // // //       if (formData.medicine_name) {
// // // // //         setTimeout(() => {
// // // // //           speak(`${formData.medicine_name} at ${formattedTime}. Say 'save' to add this reminder.`);
// // // // //         }, 500);
// // // // //       }
// // // // //     }
// // // // //   };

// // // // //   // Handle duration commands
// // // // //   const handleDurationCommand = (command) => {
// // // // //     const durationMatch = command.match(/(\d+)\s+days?/i);
// // // // //     if (durationMatch) {
// // // // //       const days = parseInt(durationMatch[1]);
// // // // //       setFormData(prev => ({ ...prev, duration_days: days }));
// // // // //       setStatus(`Duration set to ${days} days`);
// // // // //       speak(`Duration set to ${days} days`);
// // // // //     }
// // // // //   };

// // // // //   // Activate/deactivate all reminders
// // // // //   const activateAllReminders = async (activate) => {
// // // // //     try {
// // // // //       const token = localStorage.getItem("token");
// // // // //       const promises = reminders.map(reminder =>
// // // // //         axios.patch(
// // // // //           `http://127.0.0.1:8000/api/medication-reminders/${reminder.id}/`,
// // // // //           { active: activate },
// // // // //           {
// // // // //             headers: {
// // // // //               Authorization: `Bearer ${token}`,
// // // // //               "Content-Type": "application/json",
// // // // //             },
// // // // //           }
// // // // //         )
// // // // //       );

// // // // //       await Promise.all(promises);
// // // // //       const updatedReminders = reminders.map(r => ({ ...r, active: activate }));
// // // // //       setReminders(updatedReminders);
      
// // // // //       const action = activate ? "activated" : "deactivated";
// // // // //       setStatus(`All reminders ${action}`);
// // // // //       speak(`All reminders ${action}`);
// // // // //     } catch (error) {
// // // // //       console.error("Error updating all reminders:", error);
// // // // //       setStatus("Error updating reminders");
// // // // //       speak("Error updating reminders");
// // // // //     }
// // // // //   };

// // // // //   // Delete all reminders
// // // // //   const deleteAllReminders = async () => {
// // // // //     try {
// // // // //       const token = localStorage.getItem("token");
// // // // //       const promises = reminders.map(reminder =>
// // // // //         axios.delete(
// // // // //           `http://127.0.0.1:8000/api/medication-reminders/${reminder.id}/`,
// // // // //           {
// // // // //             headers: {
// // // // //               Authorization: `Bearer ${token}`,
// // // // //             },
// // // // //           }
// // // // //         )
// // // // //       );

// // // // //       await Promise.all(promises);
// // // // //       setReminders([]);
// // // // //       setStatus("All reminders deleted");
// // // // //       speak("All reminders deleted");
// // // // //     } catch (error) {
// // // // //       console.error("Error deleting all reminders:", error);
// // // // //       setStatus("Error deleting reminders");
// // // // //       speak("Error deleting reminders");
// // // // //     }
// // // // //   };

// // // // //   // Show available voice commands
// // // // //   const showVoiceCommands = () => {
// // // // //     setShowVoiceHelp(true);
// // // // //     const commandExamples = [
// // // // //       "Quick add: 'Add Dolo daily at 8 AM'",
// // // // //       "Full command: 'Medicine name is Aspirin time is 9 PM weekly for 15 days'",
// // // // //       "Natural: 'Dolo for 20 days daily 7 AM'",
// // // // //       "Simple: 'Name is Paracetamol daily at 2 PM'",
// // // // //       "With dosage: 'Take 1 tablet of Dolo 650 after food at 8 AM daily'",
// // // // //       "Edit: 'Edit the last reminder'",
// // // // //       "List: 'What are my medications?'",
// // // // //       "Delete: 'Delete the last reminder'",
// // // // //       "Toggle: 'Activate all reminders' or 'Deactivate all'",
// // // // //       "Navigation: 'Go to dashboard' or 'Logout'"
// // // // //     ].join(". ");
    
// // // // //     speak("Here are voice command examples: " + commandExamples);
// // // // //     setStatus("Voice command examples shown. Try natural language like 'Add Dolo at 8 AM daily for 10 days'");
// // // // //   };

// // // // //   // Toggle voice recognition
// // // // //   const toggleVoiceRecognition = () => {
// // // // //     if (recognition) {
// // // // //       if (isListening) {
// // // // //         recognition.stop();
// // // // //         setStatus("Voice recognition stopped.");
// // // // //         speak("Voice recognition stopped.");
// // // // //       } else {
// // // // //         try {
// // // // //           recognition.start();
// // // // //         } catch (error) {
// // // // //           console.error("Error starting recognition:", error);
// // // // //           setStatus("Error starting voice recognition.");
// // // // //           speak("Error starting voice recognition.");
// // // // //         }
// // // // //       }
// // // // //     }
// // // // //   };

// // // // //   // Fetch all reminders
// // // // //   const fetchReminders = async () => {
// // // // //     try {
// // // // //       setLoading(true);
// // // // //       const token = localStorage.getItem("token");
// // // // //       const response = await axios.get(
// // // // //         "http://127.0.0.1:8000/api/medication-reminders/",
// // // // //         {
// // // // //           headers: {
// // // // //             Authorization: `Bearer ${token}`,
// // // // //           },
// // // // //         }
// // // // //       );
// // // // //       setReminders(response.data);
// // // // //       setStatus(`Loaded ${response.data.length} medication reminders`);
// // // // //       speak(`Loaded ${response.data.length} medication reminders`);
// // // // //     } catch (error) {
// // // // //       console.error("Error fetching reminders:", error);
// // // // //       setStatus("Error loading medication reminders");
// // // // //       speak("Error loading medication reminders");
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   useEffect(() => {
// // // // //     fetchReminders();
    
// // // // //     // Auto-announce on load
// // // // //     setTimeout(() => {
// // // // //       speak("Medication reminder page loaded. Say 'help' for voice commands or 'add medication' to start.");
// // // // //     }, 1000);
// // // // //   }, []);

// // // // //   // Handle form input changes
// // // // //   const handleInputChange = (e) => {
// // // // //     const { name, value } = e.target;
// // // // //     setFormData(prev => ({
// // // // //       ...prev,
// // // // //       [name]: value
// // // // //     }));
// // // // //   };

// // // // //   // Validate form
// // // // //   const validateForm = () => {
// // // // //     if (!formData.medicine_name.trim()) {
// // // // //       setStatus("Please enter medicine name");
// // // // //       speak("Please enter medicine name");
// // // // //       return false;
// // // // //     }
// // // // //     if (!formData.time_of_day) {
// // // // //       setStatus("Please select time of day");
// // // // //       speak("Please select time of day");
// // // // //       return false;
// // // // //     }
// // // // //     return true;
// // // // //   };

// // // // //   // Create new reminder
// // // // //   const createReminder = async (e) => {
// // // // //     e?.preventDefault();
    
// // // // //     if (!validateForm()) return;

// // // // //     try {
// // // // //       setLoading(true);
// // // // //       const token = localStorage.getItem("token");
      
// // // // //       const payload = {
// // // // //         medicine_name: formData.medicine_name,
// // // // //         time_of_day: formData.time_of_day,
// // // // //         repeat_frequency: formData.repeat_frequency,
// // // // //         dosage_info: formData.dosage_info,
// // // // //         duration_days: parseInt(formData.duration_days)
// // // // //       };

// // // // //       const response = await axios.post(
// // // // //         "http://127.0.0.1:8000/api/medication-reminders/",
// // // // //         payload,
// // // // //         {
// // // // //           headers: {
// // // // //             Authorization: `Bearer ${token}`,
// // // // //             "Content-Type": "application/json",
// // // // //           },
// // // // //         }
// // // // //       );

// // // // //       setReminders(prev => [...prev, response.data]);
// // // // //       setStatus(`Medication reminder for ${formData.medicine_name} created successfully!`);
// // // // //       speak(`Medication reminder for ${formData.medicine_name} created successfully`);
      
// // // // //       // Reset form
// // // // //       setFormData({
// // // // //         medicine_name: "",
// // // // //         time_of_day: "",
// // // // //         repeat_frequency: "daily",
// // // // //         dosage_info: "",
// // // // //         duration_days: 30
// // // // //       });
      
// // // // //       // Announce new count
// // // // //       setTimeout(() => {
// // // // //         speak(`You now have ${reminders.length + 1} medication reminders.`);
// // // // //       }, 500);
// // // // //     } catch (error) {
// // // // //       console.error("Error creating reminder:", error);
// // // // //       let errorMessage = "Error creating medication reminder";
// // // // //       if (error.response?.data) {
// // // // //         errorMessage = Object.values(error.response.data).flat().join(", ");
// // // // //       }
// // // // //       setStatus(errorMessage);
// // // // //       speak("Error creating medication reminder");
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   // Update reminder
// // // // //   const updateReminder = async (e) => {
// // // // //     e?.preventDefault();
    
// // // // //     if (!validateForm()) return;

// // // // //     try {
// // // // //       setLoading(true);
// // // // //       const token = localStorage.getItem("token");
      
// // // // //       const payload = {
// // // // //         medicine_name: formData.medicine_name,
// // // // //         time_of_day: formData.time_of_day,
// // // // //         repeat_frequency: formData.repeat_frequency,
// // // // //         dosage_info: formData.dosage_info,
// // // // //         duration_days: parseInt(formData.duration_days)
// // // // //       };

// // // // //       const response = await axios.put(
// // // // //         `http://127.0.0.1:8000/api/medication-reminders/${editingReminder.id}/`,
// // // // //         payload,
// // // // //         {
// // // // //           headers: {
// // // // //             Authorization: `Bearer ${token}`,
// // // // //             "Content-Type": "application/json",
// // // // //           },
// // // // //         }
// // // // //       );

// // // // //       setReminders(prev => 
// // // // //         prev.map(reminder => 
// // // // //           reminder.id === editingReminder.id ? response.data : reminder
// // // // //         )
// // // // //       );
      
// // // // //       setStatus(`Medication reminder for ${formData.medicine_name} updated successfully!`);
// // // // //       speak(`Medication reminder for ${formData.medicine_name} updated successfully`);
      
// // // // //       // Reset editing state
// // // // //       setEditingReminder(null);
// // // // //       setFormData({
// // // // //         medicine_name: "",
// // // // //         time_of_day: "",
// // // // //         repeat_frequency: "daily",
// // // // //         dosage_info: "",
// // // // //         duration_days: 30
// // // // //       });
// // // // //     } catch (error) {
// // // // //       console.error("Error updating reminder:", error);
// // // // //       let errorMessage = "Error updating medication reminder";
// // // // //       if (error.response?.data) {
// // // // //         errorMessage = Object.values(error.response.data).flat().join(", ");
// // // // //       }
// // // // //       setStatus(errorMessage);
// // // // //       speak("Error updating medication reminder");
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   // Delete reminder
// // // // //   const deleteReminder = async (id, medicineName) => {
// // // // //     if (!window.confirm(`Are you sure you want to delete the reminder for ${medicineName}?`)) {
// // // // //       return;
// // // // //     }

// // // // //     try {
// // // // //       const token = localStorage.getItem("token");
// // // // //       await axios.delete(
// // // // //         `http://127.0.0.1:8000/api/medication-reminders/${id}/`,
// // // // //         {
// // // // //           headers: {
// // // // //             Authorization: `Bearer ${token}`,
// // // // //           },
// // // // //         }
// // // // //       );

// // // // //       setReminders(prev => prev.filter(reminder => reminder.id !== id));
// // // // //       setStatus(`Medication reminder for ${medicineName} deleted successfully`);
// // // // //       speak(`Medication reminder for ${medicineName} deleted successfully`);
      
// // // // //       // Announce new count
// // // // //       setTimeout(() => {
// // // // //         speak(`You now have ${reminders.length - 1} medication reminders.`);
// // // // //       }, 500);
// // // // //     } catch (error) {
// // // // //       console.error("Error deleting reminder:", error);
// // // // //       setStatus("Error deleting medication reminder");
// // // // //       speak("Error deleting medication reminder");
// // // // //     }
// // // // //   };

// // // // //   // Toggle reminder active status
// // // // //   const toggleReminderStatus = async (reminder) => {
// // // // //     try {
// // // // //       const token = localStorage.getItem("token");
// // // // //       const response = await axios.patch(
// // // // //         `http://127.0.0.1:8000/api/medication-reminders/${reminder.id}/`,
// // // // //         { active: !reminder.active },
// // // // //         {
// // // // //           headers: {
// // // // //             Authorization: `Bearer ${token}`,
// // // // //             "Content-Type": "application/json",
// // // // //           },
// // // // //         }
// // // // //       );

// // // // //       setReminders(prev => 
// // // // //         prev.map(r => r.id === reminder.id ? response.data : r)
// // // // //       );
      
// // // // //       const action = response.data.active ? "activated" : "deactivated";
// // // // //       setStatus(`Medication reminder ${action} successfully`);
// // // // //       speak(`Medication reminder for ${reminder.medicine_name} ${action}`);
// // // // //     } catch (error) {
// // // // //       console.error("Error toggling reminder status:", error);
// // // // //       setStatus("Error updating reminder status");
// // // // //       speak("Error updating reminder status");
// // // // //     }
// // // // //   };

// // // // //   // Start editing a reminder
// // // // //   const startEditing = (reminder) => {
// // // // //     setEditingReminder(reminder);
// // // // //     setFormData({
// // // // //       medicine_name: reminder.medicine_name,
// // // // //       time_of_day: reminder.time_of_day,
// // // // //       repeat_frequency: reminder.repeat_frequency,
// // // // //       dosage_info: reminder.dosage_info || "",
// // // // //       duration_days: reminder.duration_days || 30
// // // // //     });
// // // // //     speak(`Editing reminder for ${reminder.medicine_name}. Say 'save medication' to update or 'cancel' to stop.`);
// // // // //   };

// // // // //   // Cancel editing
// // // // //   const cancelEditing = () => {
// // // // //     setEditingReminder(null);
// // // // //     setFormData({
// // // // //       medicine_name: "",
// // // // //       time_of_day: "",
// // // // //       repeat_frequency: "daily",
// // // // //       dosage_info: "",
// // // // //       duration_days: 30
// // // // //     });
// // // // //     speak("Cancelled editing");
// // // // //   };

// // // // //   // Format time for display - REMOVED DUPLICATE DECLARATION
// // // // //   const formatTime = (timeString) => {
// // // // //     if (!timeString) return "";
// // // // //     try {
// // // // //       const time = new Date(`2000-01-01T${timeString}`);
// // // // //       return time.toLocaleTimeString('en-US', { 
// // // // //         hour: '2-digit', 
// // // // //         minute: '2-digit',
// // // // //         hour12: true 
// // // // //       });
// // // // //     } catch (e) {
// // // // //       return timeString;
// // // // //     }
// // // // //   };

// // // // //   // Add a demo function for testing
// // // // //   const demoVoiceCommand = (example) => {
// // // // //     if (recognition && isListening) {
// // // // //       recognition.stop();
// // // // //     }
    
// // // // //     setStatus(`Demo: "${example}"`);
// // // // //     speak(`Demonstrating: ${example}`);
    
// // // // //     setTimeout(() => {
// // // // //       handleVoiceCommand(example.toLowerCase());
// // // // //     }, 1000);
// // // // //   };

// // // // //   const handleLogout = async () => {
// // // // //     setStatus("Logging out...");
// // // // //     speak("Logging out...");

// // // // //     try {
// // // // //       const token = localStorage.getItem("token");
// // // // //       if (token) {
// // // // //         await axios.post(
// // // // //           "http://127.0.0.1:8000/auth/voice-logout/",
// // // // //           {},
// // // // //           {
// // // // //             headers: {
// // // // //               Authorization: `Bearer ${token}`,
// // // // //               "Content-Type": "application/json",
// // // // //             },
// // // // //           }
// // // // //         );
// // // // //       }
// // // // //     } catch (error) {
// // // // //       console.error("Logout backend error:", error.response?.data || error.message);
// // // // //     } finally {
// // // // //       localStorage.clear();
// // // // //       setTimeout(() => navigate("/"), 1500);
// // // // //     }
// // // // //   };

// // // // //   const handleBackToDashboard = () => {
// // // // //     navigate("/dashboard");
// // // // //   };

// // // // //   // Handle form submission
// // // // //   const handleSubmit = (e) => {
// // // // //     if (e) e.preventDefault();
// // // // //     if (editingReminder) {
// // // // //       updateReminder();
// // // // //     } else {
// // // // //       createReminder();
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <div className="medication-reminder-container">
// // // // //       {/* Fixed Header */}
// // // // //       <header className="dashboard-header fixed-header">
// // // // //         <div className="header-content">
// // // // //           <div className="header-left">
// // // // //             <button className="back-btn" onClick={handleBackToDashboard}>
// // // // //               ← Back to Dashboard
// // // // //             </button>
// // // // //             <h1 className="logo">Vision Assist</h1>
// // // // //           </div>
// // // // //           <div className="user-menu">
// // // // //             {/* Voice Control Button */}
// // // // //             <button 
// // // // //               className={`voice-btn ${isListening ? 'listening' : ''}`}
// // // // //               onClick={toggleVoiceRecognition}
// // // // //               title={isListening ? "Stop listening" : "Start voice commands"}
// // // // //             >
// // // // //               {isListening ? "🎤 Listening..." : "🎤 Voice"}
// // // // //             </button>
            
// // // // //             <button className="logout-btn" onClick={handleLogout}>
// // // // //               Logout
// // // // //             </button>
// // // // //           </div>
// // // // //         </div>
// // // // //       </header>

// // // // //       <div className="medication-content">
// // // // //         <div className="medication-header">
// // // // //           <h2>💊 Medication Reminder</h2>
// // // // //           <p>Manage your medication schedule and reminders</p>
          
// // // // //           {/* Voice Status Indicator */}
// // // // //           <div className={`voice-status ${isListening ? 'active' : ''}`}>
// // // // //             <span className="voice-indicator">
// // // // //               {isListening ? "🔊 Voice commands active" : "🎤 Say 'voice' to start"}
// // // // //             </span>
// // // // //             <button 
// // // // //               className="voice-help-btn"
// // // // //               onClick={() => setShowVoiceHelp(!showVoiceHelp)}
// // // // //             >
// // // // //               {showVoiceHelp ? "Hide Help" : "Voice Help"}
// // // // //             </button>
// // // // //           </div>
// // // // //         </div>

// // // // //         {/* Voice Commands Help Panel */}
// // // // //         {showVoiceHelp && (
// // // // //           <div className="voice-help-panel">
// // // // //             <h3>🎤 Voice Commands Guide</h3>
// // // // //             <div className="voice-commands-grid">
// // // // //               <div className="voice-category">
// // // // //                 <h4>Simple Commands</h4>
// // // // //                 <ul>
// // // // //                   <li>"Add medication" - Start new</li>
// // // // //                   <li>"Save medication" - Save form</li>
// // // // //                   <li>"List reminders" - Show all</li>
// // // // //                   <li>"Logout" - Sign out</li>
// // // // //                   <li>"Help" - Show this guide</li>
// // // // //                 </ul>
// // // // //               </div>
              
// // // // //               <div className="voice-category">
// // // // //                 <h4>Natural Language</h4>
// // // // //                 <ul>
// // // // //                   <li>"Add Dolo daily at 8 AM"</li>
// // // // //                   <li>"Medicine name is Aspirin"</li>
// // // // //                   <li>"Name is Paracetamol"</li>
// // // // //                   <li>"Dolo for 20 days daily 7 AM"</li>
// // // // //                   <li>"Take 1 tablet at 9 PM"</li>
// // // // //                 </ul>
// // // // //               </div>
              
// // // // //               <div className="voice-category">
// // // // //                 <h4>Complete Sentences</h4>
// // // // //                 <ul>
// // // // //                   <li>"Medicine name is Dolo time is 8 AM daily for 10 days"</li>
// // // // //                   <li>"Name is Aspirin at 9 PM weekly for 15 days"</li>
// // // // //                   <li>"Take Dolo 650 after food at 2 PM daily"</li>
// // // // //                   <li>"Add vitamins every day at morning"</li>
// // // // //                 </ul>
// // // // //               </div>
              
// // // // //               <div className="voice-category">
// // // // //                 <h4>Actions</h4>
// // // // //                 <ul>
// // // // //                   <li>"Edit the last reminder"</li>
// // // // //                   <li>"Delete all reminders"</li>
// // // // //                   <li>"Activate all" / "Deactivate all"</li>
// // // // //                   <li>"Refresh reminders"</li>
// // // // //                   <li>"Clear form"</li>
// // // // //                 </ul>
// // // // //               </div>
// // // // //             </div>
            
// // // // //             {/* Demo buttons section */}
// // // // //             <div className="voice-demo-section">
// // // // //               <h4>Try These Examples:</h4>
// // // // //               <div className="demo-buttons">
// // // // //                 <button onClick={() => demoVoiceCommand("Add Dolo daily at 8 AM")}>
// // // // //                   Add Dolo 8 AM
// // // // //                 </button>
// // // // //                 <button onClick={() => demoVoiceCommand("Medicine name is Aspirin for 10 days")}>
// // // // //                   Aspirin 10 days
// // // // //                 </button>
// // // // //                 <button onClick={() => demoVoiceCommand("Dolo for 20 days daily 7 AM")}>
// // // // //                   Complex command
// // // // //                 </button>
// // // // //                 <button onClick={() => demoVoiceCommand("What are my medications")}>
// // // // //                   List reminders
// // // // //                 </button>
// // // // //               </div>
// // // // //             </div>
            
// // // // //             <div className="voice-tips">
// // // // //               <p><strong>Tip:</strong> Speak naturally. The system understands patterns like "Medicine name is [name]", "Add [name] at [time]", or complete sentences.</p>
// // // // //               <button 
// // // // //                 className="close-help-btn"
// // // // //                 onClick={() => setShowVoiceHelp(false)}
// // // // //               >
// // // // //                 Close Help
// // // // //               </button>
// // // // //             </div>
// // // // //           </div>
// // // // //         )}

// // // // //         {/* Status Message */}
// // // // //         {status && (
// // // // //           <div className="status-message">
// // // // //             {status}
// // // // //             <button 
// // // // //               className="clear-status-btn"
// // // // //               onClick={() => setStatus("")}
// // // // //               title="Clear status"
// // // // //             >
// // // // //               ×
// // // // //             </button>
// // // // //           </div>
// // // // //         )}

// // // // //         {/* Add/Edit Form */}
// // // // //         <div className="medication-form-section">
// // // // //           <h3>{editingReminder ? "Edit Medication" : "Add New Medication"}</h3>
// // // // //           <form onSubmit={handleSubmit} className="medication-form">
// // // // //             <div className="form-row">
// // // // //               <div className="form-group">
// // // // //                 <label htmlFor="medicine_name">Medicine Name *</label>
// // // // //                 <input
// // // // //                   ref={medicineNameRef}
// // // // //                   type="text"
// // // // //                   id="medicine_name"
// // // // //                   name="medicine_name"
// // // // //                   value={formData.medicine_name}
// // // // //                   onChange={handleInputChange}
// // // // //                   placeholder="e.g., Dolo 650"
// // // // //                   required
// // // // //                   aria-label="Medicine name"
// // // // //                 />
// // // // //                 <span className="voice-hint">Say "medicine name is [name]" or "name is [name]"</span>
// // // // //               </div>

// // // // //               <div className="form-group">
// // // // //                 <label htmlFor="time_of_day">Time of Day *</label>
// // // // //                 <input
// // // // //                   ref={timeOfDayRef}
// // // // //                   type="time"
// // // // //                   id="time_of_day"
// // // // //                   name="time_of_day"
// // // // //                   value={formData.time_of_day}
// // // // //                   onChange={handleInputChange}
// // // // //                   required
// // // // //                   aria-label="Time of day"
// // // // //                 />
// // // // //                 <span className="voice-hint">Say "time is [time]" or "at [time]" or "set time to [time]"</span>
// // // // //               </div>
// // // // //             </div>

// // // // //             <div className="form-row">
// // // // //               <div className="form-group">
// // // // //                 <label htmlFor="repeat_frequency">Repeat Frequency *</label>
// // // // //                 <select
// // // // //                   ref={repeatFrequencyRef}
// // // // //                   id="repeat_frequency"
// // // // //                   name="repeat_frequency"
// // // // //                   value={formData.repeat_frequency}
// // // // //                   onChange={handleInputChange}
// // // // //                   required
// // // // //                   aria-label="Repeat frequency"
// // // // //                 >
// // // // //                   <option value="daily">Daily</option>
// // // // //                   <option value="weekly">Weekly</option>
// // // // //                   <option value="monthly">Monthly</option>
// // // // //                 </select>
// // // // //                 <span className="voice-hint">Say "daily", "weekly", or "monthly"</span>
// // // // //               </div>

// // // // //               <div className="form-group">
// // // // //                 <label htmlFor="duration_days">Duration (Days)</label>
// // // // //                 <input
// // // // //                   ref={durationDaysRef}
// // // // //                   type="number"
// // // // //                   id="duration_days"
// // // // //                   name="duration_days"
// // // // //                   value={formData.duration_days}
// // // // //                   onChange={handleInputChange}
// // // // //                   min="1"
// // // // //                   max="365"
// // // // //                   aria-label="Duration in days"
// // // // //                 />
// // // // //                 <span className="voice-hint">Say "for [number] days"</span>
// // // // //               </div>
// // // // //             </div>

// // // // //             <div className="form-group">
// // // // //               <label htmlFor="dosage_info">Dosage Information</label>
// // // // //               <input
// // // // //                 ref={dosageInfoRef}
// // // // //                 type="text"
// // // // //                 id="dosage_info"
// // // // //                 name="dosage_info"
// // // // //                 value={formData.dosage_info}
// // // // //                 onChange={handleInputChange}
// // // // //                 placeholder="e.g., 1 tablet after food"
// // // // //                 aria-label="Dosage information"
// // // // //               />
// // // // //               <span className="voice-hint">Say "take [dosage]" or "[number] tablets"</span>
// // // // //             </div>

// // // // //             <div className="form-actions">
// // // // //               <button 
// // // // //                 type="submit" 
// // // // //                 className="submit-btn"
// // // // //                 disabled={loading}
// // // // //                 aria-label={editingReminder ? "Update reminder" : "Add reminder"}
// // // // //               >
// // // // //                 {loading ? "Saving..." : (editingReminder ? "Update Reminder" : "Add Reminder")}
// // // // //               </button>
              
// // // // //               {editingReminder && (
// // // // //                 <button 
// // // // //                   type="button" 
// // // // //                   className="cancel-btn"
// // // // //                   onClick={cancelEditing}
// // // // //                   aria-label="Cancel editing"
// // // // //                 >
// // // // //                   Cancel
// // // // //                 </button>
// // // // //               )}
              
// // // // //               <button 
// // // // //                 type="button" 
// // // // //                 className="voice-submit-btn"
// // // // //                 onClick={() => speak("Say 'save medication' to submit the form")}
// // // // //                 aria-label="Voice submit instructions"
// // // // //               >
// // // // //                 🎤 Voice Save
// // // // //               </button>
// // // // //             </div>
// // // // //           </form>
// // // // //         </div>

// // // // //         {/* Reminders List */}
// // // // //         <div className="reminders-list-section">
// // // // //           <div className="section-header">
// // // // //             <h3>Your Medication Reminders ({reminders.length})</h3>
// // // // //             <button 
// // // // //               className="refresh-btn"
// // // // //               onClick={fetchReminders}
// // // // //               aria-label="Refresh reminders"
// // // // //             >
// // // // //               ⟳ Refresh
// // // // //             </button>
// // // // //           </div>
          
// // // // //           {loading && reminders.length === 0 ? (
// // // // //             <div className="loading">Loading reminders...</div>
// // // // //           ) : reminders.length === 0 ? (
// // // // //             <div className="empty-state">
// // // // //               <p>No medication reminders yet. Add your first reminder above.</p>
// // // // //               <button 
// // // // //                 className="voice-action-btn"
// // // // //                 onClick={() => speak("Say 'add medication' to create your first reminder")}
// // // // //               >
// // // // //                 🎤 Try Voice Command
// // // // //               </button>
// // // // //             </div>
// // // // //           ) : (
// // // // //             <div className="reminders-grid">
// // // // //               {reminders.map(reminder => (
// // // // //                 <div key={reminder.id} className={`reminder-card ${reminder.active ? 'active' : 'inactive'}`}>
// // // // //                   <div className="reminder-header">
// // // // //                     <h4>{reminder.medicine_name}</h4>
// // // // //                     <span className={`status-badge ${reminder.active ? 'active' : 'inactive'}`}>
// // // // //                       {reminder.active ? 'Active' : 'Inactive'}
// // // // //                     </span>
// // // // //                   </div>
                  
// // // // //                   <div className="reminder-details">
// // // // //                     <div className="detail-item">
// // // // //                       <span className="label">Time:</span>
// // // // //                       <span className="value">{formatTime(reminder.time_of_day)}</span>
// // // // //                     </div>
                    
// // // // //                     <div className="detail-item">
// // // // //                       <span className="label">Frequency:</span>
// // // // //                       <span className="value">{reminder.repeat_frequency}</span>
// // // // //                     </div>
                    
// // // // //                     {reminder.dosage_info && (
// // // // //                       <div className="detail-item">
// // // // //                         <span className="label">Dosage:</span>
// // // // //                         <span className="value">{reminder.dosage_info}</span>
// // // // //                       </div>
// // // // //                     )}
                    
// // // // //                     <div className="detail-item">
// // // // //                       <span className="label">Duration:</span>
// // // // //                       <span className="value">{reminder.duration_days} days</span>
// // // // //                     </div>
// // // // //                   </div>

// // // // //                   <div className="reminder-actions">
// // // // //                     <button 
// // // // //                       className="edit-btn"
// // // // //                       onClick={() => startEditing(reminder)}
// // // // //                       aria-label={`Edit ${reminder.medicine_name}`}
// // // // //                     >
// // // // //                       Edit
// // // // //                     </button>
                    
// // // // //                     <button 
// // // // //                       className={`toggle-btn ${reminder.active ? 'deactivate' : 'activate'}`}
// // // // //                       onClick={() => toggleReminderStatus(reminder)}
// // // // //                       aria-label={reminder.active ? `Deactivate ${reminder.medicine_name}` : `Activate ${reminder.medicine_name}`}
// // // // //                     >
// // // // //                       {reminder.active ? 'Deactivate' : 'Activate'}
// // // // //                     </button>
                    
// // // // //                     <button 
// // // // //                       className="delete-btn"
// // // // //                       onClick={() => deleteReminder(reminder.id, reminder.medicine_name)}
// // // // //                       aria-label={`Delete ${reminder.medicine_name}`}
// // // // //                     >
// // // // //                       Delete
// // // // //                     </button>
// // // // //                   </div>
                  
// // // // //                   <div className="reminder-voice-hint">
// // // // //                     Say "edit {reminder.medicine_name}" to edit this reminder
// // // // //                   </div>
// // // // //                 </div>
// // // // //               ))}
// // // // //             </div>
// // // // //           )}
// // // // //         </div>
// // // // //       </div>

// // // // //       {/* Status Bar */}
// // // // //       <div className="status-bar">
// // // // //         <div className="status-content">
// // // // //           <p>{status || "Ready for voice commands"}</p>
// // // // //           <div className="voice-controls">
// // // // //             <button 
// // // // //               className={`mic-btn ${isListening ? 'active' : ''}`}
// // // // //               onClick={toggleVoiceRecognition}
// // // // //               aria-label={isListening ? "Stop listening" : "Start listening"}
// // // // //             >
// // // // //               {isListening ? "🔴 Stop" : "🎤 Start"}
// // // // //             </button>
// // // // //             <span className="listening-status">
// // // // //               {isListening ? "Listening..." : "Voice commands available"}
// // // // //             </span>
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default MedicationReminder;




// // // // import React, { useState, useEffect, useRef, useCallback } from "react";
// // // // import { useNavigate } from "react-router-dom";
// // // // import axios from "axios";
// // // // import "./MedicationReminder.css";

// // // // // Enhanced voice command vocabulary with patterns
// // // // const VOICE_COMMANDS = {
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
  
// // // //   // List commands
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
// // // //   "delete last": "complex_delete_last",
// // // //   "toggle last": "complex_toggle_last",
// // // //   "enable last": "complex_toggle_last",
// // // //   "disable last": "complex_toggle_last",
  
// // // //   // Quick actions for existing reminders
// // // //   "activate all": "activate_all",
// // // //   "deactivate all": "deactivate_all",
// // // //   "delete all": "delete_all",
// // // //   "clear all": "delete_all",
  
// // // //   // Smart commands for common medicines
// // // //   "take dolo": "smart_dolo",
// // // //   "take aspirin": "smart_aspirin",
// // // //   "take vitamins": "smart_vitamins",
// // // //   "take paracetamol": "smart_dolo",
// // // //   "take medicine": "smart_medicine",
// // // // };

// // // // // Time patterns mapping
// // // // const TIME_PATTERNS = {
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
// // // // };

// // // // // Frequency patterns
// // // // const FREQUENCY_PATTERNS = {
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

// // // // const MedicationReminder = () => {
// // // //   const [reminders, setReminders] = useState([]);
// // // //   const [loading, setLoading] = useState(false);
// // // //   const [status, setStatus] = useState("");
// // // //   const [editingReminder, setEditingReminder] = useState(null);
// // // //   const [isListening, setIsListening] = useState(false);
// // // //   const [showVoiceHelp, setShowVoiceHelp] = useState(false);
// // // //   const [recognition, setRecognition] = useState(null);
// // // //   const [lastProcessedCommand, setLastProcessedCommand] = useState("");
// // // //   const navigate = useNavigate();
  
// // // //   // Refs for form inputs
// // // //   const medicineNameRef = useRef(null);
// // // //   const timeOfDayRef = useRef(null);
// // // //   const repeatFrequencyRef = useRef(null);
// // // //   const dosageInfoRef = useRef(null);
// // // //   const durationDaysRef = useRef(null);
  
// // // //   // Form state
// // // //   const [formData, setFormData] = useState({
// // // //     medicine_name: "",
// // // //     time_of_day: "",
// // // //     repeat_frequency: "daily",
// // // //     dosage_info: "",
// // // //     duration_days: 30
// // // //   });

// // // //   // Initialize speech recognition
// // // //   useEffect(() => {
// // // //     const initSpeechRecognition = () => {
// // // //       if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
// // // //         const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
// // // //         const recognition = new SpeechRecognition();
        
// // // //         recognition.continuous = true;
// // // //         recognition.interimResults = false;
// // // //         recognition.lang = 'en-US';
        
// // // //         recognition.onstart = () => {
// // // //           setIsListening(true);
// // // //           setStatus("Listening for voice commands...");
// // // //           speak("Voice commands activated. Say 'add Dolo daily at 8 AM' or 'help' for commands.");
// // // //         };
        
// // // //         recognition.onresult = (event) => {
// // // //           const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase().trim();
// // // //           console.log("Voice command:", transcript);
// // // //           setLastProcessedCommand(transcript);
// // // //           handleVoiceCommand(transcript);
// // // //         };
        
// // // //         recognition.onerror = (event) => {
// // // //           console.error("Speech recognition error:", event.error);
// // // //           if (event.error === 'no-speech') {
// // // //             setStatus("No speech detected. Try again.");
// // // //           } else if (event.error !== 'aborted') {
// // // //             setStatus("Voice recognition error. Please try again.");
// // // //           }
// // // //           setIsListening(false);
// // // //         };
        
// // // //         recognition.onend = () => {
// // // //           setIsListening(false);
// // // //         };
        
// // // //         setRecognition(recognition);
// // // //       } else {
// // // //         setStatus("Voice recognition not supported in this browser.");
// // // //       }
// // // //     };
    
// // // //     initSpeechRecognition();
// // // //     return () => {
// // // //       if (recognition) {
// // // //         recognition.stop();
// // // //       }
// // // //     };
// // // //   }, []);

// // // //   // Speak function
// // // //   const speak = (text) => {
// // // //     const synth = window.speechSynthesis;
// // // //     if (!synth) return;
// // // //     synth.cancel();
// // // //     const utter = new SpeechSynthesisUtterance(text);
// // // //     utter.rate = 0.8;
// // // //     synth.speak(utter);
// // // //   };

// // // //   // Enhanced natural language processing for medication commands
// // // //   const parseMedicationCommand = (command) => {
// // // //     const result = {
// // // //       medicine_name: "",
// // // //       time_of_day: "",
// // // //       repeat_frequency: "daily",
// // // //       duration_days: 30,
// // // //       dosage_info: "",
// // // //       action: "add"
// // // //     };

// // // //     // Extract medicine name patterns
// // // //     const medicinePatterns = [
// // // //       /(?:medicine name is|name is|medication is|add|create|take)\s+([a-zA-Z0-9\s]+?)(?:\s+(?:for|at|daily|every|take|medicine)|$)/i,
// // // //       /^(?:add|create|take)\s+([a-zA-Z0-9\s]+?)\s+(?:for|at|daily|every)/i,
// // // //       /([a-zA-Z0-9\s]+?)\s+(?:for|at|daily|every|take)/i
// // // //     ];

// // // //     for (const pattern of medicinePatterns) {
// // // //       const match = command.match(pattern);
// // // //       if (match && match[1]) {
// // // //         result.medicine_name = match[1].trim();
// // // //         break;
// // // //       }
// // // //     }

// // // //     // If no pattern matched, try to extract single word medicine names
// // // //     if (!result.medicine_name) {
// // // //       const singleWordMedicine = command.match(/\b(dolo|aspirin|paracetamol|vitamins|ibuprofen|metformin|insulin)\b/i);
// // // //       if (singleWordMedicine) {
// // // //         result.medicine_name = singleWordMedicine[0].toLowerCase().replace(/^./, str => str.toUpperCase());
// // // //       }
// // // //     }

// // // //     // Extract time patterns
// // // //     const timePatterns = [
// // // //       /(\d{1,2})(?::(\d{2}))?\s*(am|pm)/gi,
// // // //       /(\d{1,2})\s*(am|pm)/gi,
// // // //       /at\s+(\d{1,2})(?::(\d{2}))?\s*(am|pm)/gi,
// // // //       /time\s+(?:is|to)\s+(\d{1,2})(?::(\d{2}))?\s*(am|pm)/gi,
// // // //       /(\d{1,2})\s*(?:o'clock|oclock)\s*(am|pm)/gi
// // // //     ];

// // // //     let timeMatch = null;
// // // //     for (const pattern of timePatterns) {
// // // //       pattern.lastIndex = 0; // Reset regex
// // // //       const matches = [...command.matchAll(pattern)];
// // // //       if (matches.length > 0) {
// // // //         timeMatch = matches[0];
// // // //         break;
// // // //       }
// // // //     }

// // // //     if (timeMatch) {
// // // //       let [_, hours, minutes = "00", meridiem] = timeMatch;
// // // //       hours = parseInt(hours);
      
// // // //       // Convert to 24-hour format
// // // //       if (meridiem?.toLowerCase() === 'pm' && hours < 12) hours += 12;
// // // //       if (meridiem?.toLowerCase() === 'am' && hours === 12) hours = 0;
      
// // // //       result.time_of_day = `${hours.toString().padStart(2, '0')}:${minutes}`;
// // // //     } else {
// // // //       // Check for time keywords
// // // //       for (const [keyword, time] of Object.entries(TIME_PATTERNS)) {
// // // //         if (command.includes(keyword)) {
// // // //           result.time_of_day = time;
// // // //           break;
// // // //         }
// // // //       }
// // // //     }

// // // //     // Extract duration patterns
// // // //     const durationPatterns = [
// // // //       /for\s+(\d+)\s+days/gi,
// // // //       /for\s+(\d+)\s+day/gi,
// // // //       /(\d+)\s+days/gi,
// // // //       /duration\s+(?:is|of)\s+(\d+)\s+days/gi,
// // // //       /(\d+)\s+day/gi
// // // //     ];

// // // //     for (const pattern of durationPatterns) {
// // // //       pattern.lastIndex = 0;
// // // //       const match = command.match(pattern);
// // // //       if (match) {
// // // //         const durationMatch = match[0].match(/\d+/);
// // // //         if (durationMatch) {
// // // //           result.duration_days = parseInt(durationMatch[0]);
// // // //           break;
// // // //         }
// // // //       }
// // // //     }

// // // //     // Extract frequency patterns
// // // //     for (const [keyword, frequency] of Object.entries(FREQUENCY_PATTERNS)) {
// // // //       if (command.includes(keyword)) {
// // // //         result.repeat_frequency = frequency;
// // // //         break;
// // // //       }
// // // //     }

// // // //     // Extract dosage information
// // // //     const dosagePatterns = [
// // // //       /(\d+)\s*(?:tablet|tab|pill|capsule|mg|ml|drop)s?\s*(?:after|before|with)?\s*(?:food|meal|breakfast|lunch|dinner)?/gi,
// // // //       /(?:take|dose|dosage)\s+(.+?)(?:\s+(?:for|at|daily|$))/gi,
// // // //       /(\d+\s*(?:mg|ml|tablet|pill)s?)/gi
// // // //     ];

// // // //     for (const pattern of dosagePatterns) {
// // // //       pattern.lastIndex = 0;
// // // //       const match = command.match(pattern);
// // // //       if (match) {
// // // //         result.dosage_info = match[0].trim();
// // // //         break;
// // // //       }
// // // //     }

// // // //     // Check for edit/update commands
// // // //     if (command.includes('edit') || command.includes('update') || command.includes('change')) {
// // // //       result.action = "edit";
// // // //     }

// // // //     // Check for delete/remove commands
// // // //     if (command.includes('delete') || command.includes('remove') || command.includes('stop')) {
// // // //       result.action = "delete";
// // // //     }

// // // //     return result;
// // // //   };

// // // //   // Handle complex natural language commands
// // // //   const handleComplexCommand = (command) => {
// // // //     const parsed = parseMedicationCommand(command);
    
// // // //     if (parsed.medicine_name) {
// // // //       // Fill form with parsed data
// // // //       setFormData({
// // // //         medicine_name: parsed.medicine_name,
// // // //         time_of_day: parsed.time_of_day || formData.time_of_day,
// // // //         repeat_frequency: parsed.repeat_frequency,
// // // //         dosage_info: parsed.dosage_info || formData.dosage_info,
// // // //         duration_days: parsed.duration_days
// // // //       });

// // // //       // Provide feedback
// // // //       const feedback = [];
// // // //       if (parsed.medicine_name) feedback.push(`Medicine: ${parsed.medicine_name}`);
// // // //       if (parsed.time_of_day) feedback.push(`Time: ${formatTime(parsed.time_of_day)}`);
// // // //       if (parsed.repeat_frequency) feedback.push(`Frequency: ${parsed.repeat_frequency}`);
// // // //       if (parsed.duration_days) feedback.push(`Duration: ${parsed.duration_days} days`);
      
// // // //       const feedbackText = feedback.join(", ");
// // // //       setStatus(`Parsed command: ${feedbackText}`);
// // // //       speak(`Added ${parsed.medicine_name} to form. ${feedbackText}. Say 'save' to confirm.`);
      
// // // //       // Auto-save if enough information is provided
// // // //       if (parsed.medicine_name && parsed.time_of_day) {
// // // //         setTimeout(() => {
// // // //           speak(`Ready to save ${parsed.medicine_name}. Say 'save medication' to confirm.`);
// // // //         }, 1000);
// // // //       }
// // // //     } else {
// // // //       // Try to handle other command patterns
// // // //       handleSingleSentenceCommand(command);
// // // //     }
// // // //   };

// // // //   // Handle single sentence commands
// // // //   const handleSingleSentenceCommand = (command) => {
// // // //     // Pattern: "Medicine [name] [frequency] [time] for [duration] days"
// // // //     const patterns = [
// // // //       // "Dolo for 20 days daily 7 am"
// // // //       /^([a-zA-Z0-9\s]+?)\s+for\s+(\d+)\s+days?\s+(\w+)\s+(\d{1,2})(?::(\d{2}))?\s*(am|pm)/i,
// // // //       // "Daily 9 am Dolo for 30 days"
// // // //       /^(\w+)\s+(\d{1,2})(?::(\d{2}))?\s*(am|pm)\s+([a-zA-Z0-9\s]+?)\s+for\s+(\d+)\s+days/i,
// // // //       // "Medicine name is Dolo daily at 8 am for 10 days"
// // // //       /medicine name is ([a-zA-Z0-9\s]+?)\s+(\w+)\s+(?:at\s+)?(\d{1,2})(?::(\d{2}))?\s*(am|pm)\s+for\s+(\d+)\s+days/i,
// // // //       // "Name is Aspirin time is 9 pm weekly for 15 days"
// // // //       /name is ([a-zA-Z0-9\s]+?)\s+time is\s+(\d{1,2})(?::(\d{2}))?\s*(am|pm)\s+(\w+)\s+for\s+(\d+)\s+days/i,
// // // //       // "Take Dolo 650 at 8 am daily"
// // // //       /take ([a-zA-Z0-9\s]+?)\s+at\s+(\d{1,2})(?::(\d{2}))?\s*(am|pm)\s+(\w+)/i,
// // // //     ];

// // // //     for (const pattern of patterns) {
// // // //       const match = command.match(pattern);
// // // //       if (match) {
// // // //         let medicine_name, repeat_frequency, time_of_day, duration_days;
        
// // // //         if (pattern === patterns[0]) {
// // // //           // Pattern 1: "Dolo for 20 days daily 7 am"
// // // //           [, medicine_name, duration_days, repeat_frequency] = match;
// // // //           const hour = parseInt(match[4]);
// // // //           const minute = match[5] || "00";
// // // //           const meridiem = match[6];
          
// // // //           let hours = hour;
// // // //           if (meridiem?.toLowerCase() === 'pm' && hours < 12) hours += 12;
// // // //           if (meridiem?.toLowerCase() === 'am' && hours === 12) hours = 0;
          
// // // //           time_of_day = `${hours.toString().padStart(2, '0')}:${minute}`;
// // // //         } else if (pattern === patterns[1]) {
// // // //           // Pattern 2: "Daily 9 am Dolo for 30 days"
// // // //           [, repeat_frequency, hour, minute, meridiem, medicine_name, duration_days] = match;
          
// // // //           let hours = parseInt(hour);
// // // //           if (meridiem?.toLowerCase() === 'pm' && hours < 12) hours += 12;
// // // //           if (meridiem?.toLowerCase() === 'am' && hours === 12) hours = 0;
          
// // // //           time_of_day = `${hours.toString().padStart(2, '0')}:${minute || "00"}`;
// // // //         } else if (pattern === patterns[2]) {
// // // //           // Pattern 3: "Medicine name is Dolo daily at 8 am for 10 days"
// // // //           [, medicine_name, repeat_frequency, hour, minute, meridiem, duration_days] = match;
          
// // // //           let hours = parseInt(hour);
// // // //           if (meridiem?.toLowerCase() === 'pm' && hours < 12) hours += 12;
// // // //           if (meridiem?.toLowerCase() === 'am' && hours === 12) hours = 0;
          
// // // //           time_of_day = `${hours.toString().padStart(2, '0')}:${minute || "00"}`;
// // // //         } else if (pattern === patterns[3]) {
// // // //           // Pattern 4: "Name is Aspirin time is 9 pm weekly for 15 days"
// // // //           [, medicine_name, hour, minute, meridiem, repeat_frequency, duration_days] = match;
          
// // // //           let hours = parseInt(hour);
// // // //           if (meridiem?.toLowerCase() === 'pm' && hours < 12) hours += 12;
// // // //           if (meridiem?.toLowerCase() === 'am' && hours === 12) hours = 0;
          
// // // //           time_of_day = `${hours.toString().padStart(2, '0')}:${minute || "00"}`;
// // // //         } else if (pattern === patterns[4]) {
// // // //           // Pattern 5: "Take Dolo 650 at 8 am daily"
// // // //           [, medicine_name, hour, minute, meridiem, repeat_frequency] = match;
          
// // // //           let hours = parseInt(hour);
// // // //           if (meridiem?.toLowerCase() === 'pm' && hours < 12) hours += 12;
// // // //           if (meridiem?.toLowerCase() === 'am' && hours === 12) hours = 0;
          
// // // //           time_of_day = `${hours.toString().padStart(2, '0')}:${minute || "00"}`;
// // // //           duration_days = 30; // Default
// // // //         }

// // // //         // Set form data
// // // //         setFormData(prev => ({
// // // //           ...prev,
// // // //           medicine_name: medicine_name.trim(),
// // // //           time_of_day: time_of_day || prev.time_of_day,
// // // //           repeat_frequency: repeat_frequency || prev.repeat_frequency,
// // // //           duration_days: parseInt(duration_days) || prev.duration_days
// // // //         }));

// // // //         const feedback = `Added ${medicine_name} at ${formatTime(time_of_day)} ${repeat_frequency} for ${duration_days || 30} days. Say 'save' to confirm.`;
// // // //         setStatus(feedback);
// // // //         speak(feedback);
// // // //         return true;
// // // //       }
// // // //     }
// // // //     return false;
// // // //   };

// // // //   // Enhanced voice command handler
// // // //   const handleVoiceCommand = useCallback((command) => {
// // // //     console.log("Processing command:", command);
    
// // // //     // First, try exact command matches
// // // //     if (VOICE_COMMANDS[command]) {
// // // //       executeCommand(VOICE_COMMANDS[command], command);
// // // //       return;
// // // //     }

// // // //     // Check for partial matches in simple commands
// // // //     for (const [key, value] of Object.entries(VOICE_COMMANDS)) {
// // // //       if (command.includes(key)) {
// // // //         executeCommand(value, command);
// // // //         return;
// // // //       }
// // // //     }

// // // //     // Handle complex natural language medication commands
// // // //     if (
// // // //       command.includes('medicine') ||
// // // //       command.includes('medication') ||
// // // //       command.includes('add') ||
// // // //       command.includes('create') ||
// // // //       command.includes('take') ||
// // // //       command.includes('name is') ||
// // // //       command.includes('time is') ||
// // // //       command.includes('daily') ||
// // // //       command.includes('weekly') ||
// // // //       command.includes('monthly') ||
// // // //       /\d+\s*(am|pm)/i.test(command) ||
// // // //       /\b(for|at)\s+\d+/i.test(command)
// // // //     ) {
// // // //       handleComplexCommand(command);
// // // //       return;
// // // //     }

// // // //     // Handle specific medicine actions
// // // //     if (command.includes('dolo') || command.includes('aspirin') || command.includes('vitamin')) {
// // // //       handleMedicineSpecificCommand(command);
// // // //       return;
// // // //     }

// // // //     // Handle numeric time commands
// // // //     if (/\b(\d{1,2})\s*(am|pm)\b/i.test(command)) {
// // // //       handleTimeCommand(command);
// // // //       return;
// // // //     }

// // // //     // Handle duration commands
// // // //     if (command.includes('days') || command.includes('day')) {
// // // //       handleDurationCommand(command);
// // // //       return;
// // // //     }

// // // //     // Default response
// // // //     setStatus(`Command not understood: "${command}". Try: "Add Dolo daily at 8 AM" or "Medicine name is Aspirin for 10 days"`);
// // // //     speak(`Command not understood. Try saying something like: Add Dolo daily at 8 AM, or Medicine name is Aspirin for 10 days.`);
// // // //   }, [formData, editingReminder, reminders]);

// // // //   // Handle medicine-specific commands
// // // //   const handleMedicineSpecificCommand = (command) => {
// // // //     const medicines = {
// // // //       'dolo': 'Dolo 650',
// // // //       'aspirin': 'Aspirin',
// // // //       'vitamin': 'Multivitamin',
// // // //       'paracetamol': 'Paracetamol'
// // // //     };

// // // //     for (const [key, medicine] of Object.entries(medicines)) {
// // // //       if (command.includes(key)) {
// // // //         setFormData(prev => ({ ...prev, medicine_name: medicine }));
// // // //         setStatus(`Medicine set to ${medicine}. Now say the time, like "8 AM" or "set time to morning".`);
// // // //         speak(`${medicine} selected. Now say the time.`);
// // // //         return;
// // // //       }
// // // //     }
// // // //   };

// // // //   // Execute matched command
// // // //   const executeCommand = (command, originalCommand) => {
// // // //     switch(command) {
// // // //       case 'back':
// // // //         handleBackToDashboard();
// // // //         break;
// // // //       case 'dashboard':
// // // //         navigate("/dashboard");
// // // //         break;
// // // //       case 'logout':
// // // //         handleLogout();
// // // //         break;
// // // //       case 'add':
// // // //         if (editingReminder) {
// // // //           setStatus("Currently editing a reminder. Say 'cancel' first or 'save' to update.");
// // // //           speak("Currently editing a reminder. Say cancel first or save to update.");
// // // //         } else {
// // // //           setStatus("Ready for medication details. Say: 'Medicine name is [name] at [time] for [days] days'");
// // // //           speak("Ready for medication details. Say something like: Medicine name is Dolo at 8 AM for 10 days. Or simply: Add Dolo daily at 8 AM.");
// // // //         }
// // // //         break;
// // // //       case 'save':
// // // //         if (formData.medicine_name) {
// // // //           handleSubmit();
// // // //         } else {
// // // //           setStatus("Please specify a medicine name first. Say 'Medicine name is [name]'");
// // // //           speak("Please specify a medicine name first.");
// // // //         }
// // // //         break;
// // // //       case 'cancel':
// // // //         if (editingReminder) {
// // // //           cancelEditing();
// // // //         } else {
// // // //           setFormData({
// // // //             medicine_name: "",
// // // //             time_of_day: "",
// // // //             repeat_frequency: "daily",
// // // //             dosage_info: "",
// // // //             duration_days: 30
// // // //           });
// // // //           setStatus("Form cleared.");
// // // //           speak("Form cleared.");
// // // //         }
// // // //         break;
// // // //       case 'list':
// // // //         if (reminders.length > 0) {
// // // //           const activeCount = reminders.filter(r => r.active).length;
// // // //           const reminderList = reminders.slice(0, 3).map(r => 
// // // //             `${r.medicine_name} at ${formatTime(r.time_of_day)}`
// // // //           ).join(", ");
          
// // // //           speak(`You have ${reminders.length} medication reminders. ${activeCount} are active. Recent: ${reminderList}`);
// // // //           setStatus(`You have ${reminders.length} reminders (${activeCount} active)`);
// // // //         } else {
// // // //           speak("You have no medication reminders yet.");
// // // //         }
// // // //         break;
// // // //       case 'refresh':
// // // //         fetchReminders();
// // // //         break;
// // // //       case 'clear':
// // // //         setStatus("");
// // // //         break;
// // // //       case 'help':
// // // //         showVoiceCommands();
// // // //         break;
// // // //       case 'focus_medicine':
// // // //         medicineNameRef.current?.focus();
// // // //         speak("Medicine name field focused. Say the medicine name.");
// // // //         break;
// // // //       case 'focus_time':
// // // //         timeOfDayRef.current?.focus();
// // // //         speak("Time field focused. Say the time.");
// // // //         break;
// // // //       case 'focus_frequency':
// // // //         repeatFrequencyRef.current?.focus();
// // // //         speak("Frequency field focused.");
// // // //         break;
// // // //       case 'focus_dosage':
// // // //         dosageInfoRef.current?.focus();
// // // //         speak("Dosage field focused. Say dosage instructions.");
// // // //         break;
// // // //       case 'focus_duration':
// // // //         durationDaysRef.current?.focus();
// // // //         speak("Duration field focused. Say number of days.");
// // // //         break;
// // // //       case 'complex_new':
// // // //         setFormData({
// // // //           medicine_name: "",
// // // //           time_of_day: "",
// // // //           repeat_frequency: "daily",
// // // //           dosage_info: "",
// // // //           duration_days: 30
// // // //         });
// // // //         setStatus("Ready for new medication. Example: 'Add Dolo 650 at 8 AM daily for 10 days'");
// // // //         speak("Ready for new medication. Say something like: Add Dolo 650 at 8 AM daily for 10 days.");
// // // //         break;
// // // //       case 'complex_edit_last':
// // // //         if (reminders.length > 0) {
// // // //           startEditing(reminders[reminders.length - 1]);
// // // //         } else {
// // // //           speak("No reminders to edit.");
// // // //         }
// // // //         break;
// // // //       case 'complex_delete_last':
// // // //         if (reminders.length > 0) {
// // // //           const lastReminder = reminders[reminders.length - 1];
// // // //           deleteReminder(lastReminder.id, lastReminder.medicine_name);
// // // //         } else {
// // // //           speak("No reminders to delete.");
// // // //         }
// // // //         break;
// // // //       case 'complex_toggle_last':
// // // //         if (reminders.length > 0) {
// // // //           const lastReminder = reminders[reminders.length - 1];
// // // //           toggleReminderStatus(lastReminder);
// // // //         } else {
// // // //           speak("No reminders to toggle.");
// // // //         }
// // // //         break;
// // // //       case 'activate_all':
// // // //         activateAllReminders(true);
// // // //         break;
// // // //       case 'deactivate_all':
// // // //         activateAllReminders(false);
// // // //         break;
// // // //       case 'delete_all':
// // // //         if (reminders.length > 0) {
// // // //           if (window.confirm(`Are you sure you want to delete all ${reminders.length} reminders?`)) {
// // // //             deleteAllReminders();
// // // //           }
// // // //         } else {
// // // //           speak("No reminders to delete.");
// // // //         }
// // // //         break;
// // // //       case 'smart_dolo':
// // // //         handleSmartMedicineCommand("Dolo 650", "08:00", "daily", 30);
// // // //         break;
// // // //       case 'smart_aspirin':
// // // //         handleSmartMedicineCommand("Aspirin", "20:00", "daily", 30);
// // // //         break;
// // // //       case 'smart_vitamins':
// // // //         handleSmartMedicineCommand("Multivitamins", "09:00", "daily", 30);
// // // //         break;
// // // //       case 'smart_medicine':
// // // //         setStatus("Please specify medicine name. Example: 'Take Dolo' or 'Take Aspirin'");
// // // //         speak("Please specify medicine name. Say 'Take Dolo' or 'Take Aspirin'");
// // // //         break;
// // // //       default:
// // // //         setStatus(`Command executed: ${originalCommand}`);
// // // //     }
// // // //   };

// // // //   // Handle smart medicine commands
// // // //   const handleSmartMedicineCommand = (medicine, time, frequency, duration) => {
// // // //     setFormData({
// // // //       medicine_name: medicine,
// // // //       time_of_day: time,
// // // //       repeat_frequency: frequency,
// // // //       dosage_info: "1 tablet",
// // // //       duration_days: duration
// // // //     });
    
// // // //     const feedback = `${medicine} set for ${formatTime(time)} ${frequency} for ${duration} days. Say 'save' to confirm.`;
// // // //     setStatus(feedback);
// // // //     speak(feedback);
// // // //   };

// // // //   // Handle time commands with natural language
// // // //   const handleTimeCommand = (command) => {
// // // //     // Extract time from command
// // // //     const timeMatch = command.match(/(\d{1,2})\s*(am|pm)/i);
// // // //     if (timeMatch) {
// // // //       let hours = parseInt(timeMatch[1]);
// // // //       const meridiem = timeMatch[2].toLowerCase();
      
// // // //       // Convert to 24-hour format
// // // //       if (meridiem === 'pm' && hours < 12) hours += 12;
// // // //       if (meridiem === 'am' && hours === 12) hours = 0;
      
// // // //       const timeString = `${hours.toString().padStart(2, '0')}:00`;
// // // //       setFormData(prev => ({ ...prev, time_of_day: timeString }));
      
// // // //       const formattedTime = formatTime(timeString);
// // // //       setStatus(`Time set to ${formattedTime}`);
// // // //       speak(`Time set to ${formattedTime}`);
      
// // // //       // If medicine name is already set, ask for confirmation
// // // //       if (formData.medicine_name) {
// // // //         setTimeout(() => {
// // // //           speak(`${formData.medicine_name} at ${formattedTime}. Say 'save' to add this reminder.`);
// // // //         }, 500);
// // // //       }
// // // //     }
// // // //   };

// // // //   // Handle duration commands
// // // //   const handleDurationCommand = (command) => {
// // // //     const durationMatch = command.match(/(\d+)\s+days?/i);
// // // //     if (durationMatch) {
// // // //       const days = parseInt(durationMatch[1]);
// // // //       setFormData(prev => ({ ...prev, duration_days: days }));
// // // //       setStatus(`Duration set to ${days} days`);
// // // //       speak(`Duration set to ${days} days`);
// // // //     }
// // // //   };

// // // //   // Activate/deactivate all reminders
// // // //   const activateAllReminders = async (activate) => {
// // // //     try {
// // // //       const token = localStorage.getItem("token");
// // // //       const promises = reminders.map(reminder =>
// // // //         axios.patch(
// // // //           `http://127.0.0.1:8000/api/medication-reminders/${reminder.id}/`,
// // // //           { active: activate },
// // // //           {
// // // //             headers: {
// // // //               Authorization: `Bearer ${token}`,
// // // //               "Content-Type": "application/json",
// // // //             },
// // // //           }
// // // //         )
// // // //       );

// // // //       await Promise.all(promises);
// // // //       const updatedReminders = reminders.map(r => ({ ...r, active: activate }));
// // // //       setReminders(updatedReminders);
      
// // // //       const action = activate ? "activated" : "deactivated";
// // // //       setStatus(`All reminders ${action}`);
// // // //       speak(`All reminders ${action}`);
// // // //     } catch (error) {
// // // //       console.error("Error updating all reminders:", error);
// // // //       setStatus("Error updating reminders");
// // // //       speak("Error updating reminders");
// // // //     }
// // // //   };

// // // //   // Delete all reminders
// // // //   const deleteAllReminders = async () => {
// // // //     try {
// // // //       const token = localStorage.getItem("token");
// // // //       const promises = reminders.map(reminder =>
// // // //         axios.delete(
// // // //           `http://127.0.0.1:8000/api/medication-reminders/${reminder.id}/`,
// // // //           {
// // // //             headers: {
// // // //               Authorization: `Bearer ${token}`,
// // // //             },
// // // //           }
// // // //         )
// // // //       );

// // // //       await Promise.all(promises);
// // // //       setReminders([]);
// // // //       setStatus("All reminders deleted");
// // // //       speak("All reminders deleted");
// // // //     } catch (error) {
// // // //       console.error("Error deleting all reminders:", error);
// // // //       setStatus("Error deleting reminders");
// // // //       speak("Error deleting reminders");
// // // //     }
// // // //   };

// // // //   // Show available voice commands
// // // //   const showVoiceCommands = () => {
// // // //     setShowVoiceHelp(true);
// // // //     const commandExamples = [
// // // //       "Quick add: 'Add Dolo daily at 8 AM'",
// // // //       "Full command: 'Medicine name is Aspirin time is 9 PM weekly for 15 days'",
// // // //       "Natural: 'Dolo for 20 days daily 7 AM'",
// // // //       "Simple: 'Name is Paracetamol daily at 2 PM'",
// // // //       "With dosage: 'Take 1 tablet of Dolo 650 after food at 8 AM daily'",
// // // //       "Edit: 'Edit the last reminder'",
// // // //       "List: 'What are my medications?'",
// // // //       "Delete: 'Delete the last reminder'",
// // // //       "Toggle: 'Activate all reminders' or 'Deactivate all'",
// // // //       "Navigation: 'Go to dashboard' or 'Logout'"
// // // //     ].join(". ");
    
// // // //     speak("Here are voice command examples: " + commandExamples);
// // // //     setStatus("Voice command examples shown. Try natural language like 'Add Dolo at 8 AM daily for 10 days'");
// // // //   };

// // // //   // Toggle voice recognition - Use your existing voice button
// // // //   const toggleVoiceRecognition = () => {
// // // //     if (recognition) {
// // // //       if (isListening) {
// // // //         recognition.stop();
// // // //         setStatus("Voice recognition stopped.");
// // // //         speak("Voice recognition stopped.");
// // // //       } else {
// // // //         try {
// // // //           recognition.start();
// // // //         } catch (error) {
// // // //           console.error("Error starting recognition:", error);
// // // //           setStatus("Error starting voice recognition.");
// // // //           speak("Error starting voice recognition.");
// // // //         }
// // // //       }
// // // //     }
// // // //   };

// // // //   // Fetch all reminders
// // // //   const fetchReminders = async () => {
// // // //     try {
// // // //       setLoading(true);
// // // //       const token = localStorage.getItem("token");
// // // //       const response = await axios.get(
// // // //         "http://127.0.0.1:8000/api/medication-reminders/",
// // // //         {
// // // //           headers: {
// // // //             Authorization: `Bearer ${token}`,
// // // //           },
// // // //         }
// // // //       );
// // // //       setReminders(response.data);
// // // //       setStatus(`Loaded ${response.data.length} medication reminders`);
// // // //       speak(`Loaded ${response.data.length} medication reminders`);
// // // //     } catch (error) {
// // // //       console.error("Error fetching reminders:", error);
// // // //       setStatus("Error loading medication reminders");
// // // //       speak("Error loading medication reminders");
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   useEffect(() => {
// // // //     fetchReminders();
    
// // // //     // Auto-announce on load
// // // //     setTimeout(() => {
// // // //       speak("Medication reminder page loaded. Say 'help' for voice commands or 'add medication' to start.");
// // // //     }, 1000);
// // // //   }, []);

// // // //   // Handle form input changes
// // // //   const handleInputChange = (e) => {
// // // //     const { name, value } = e.target;
// // // //     setFormData(prev => ({
// // // //       ...prev,
// // // //       [name]: value
// // // //     }));
// // // //   };

// // // //   // Validate form
// // // //   const validateForm = () => {
// // // //     if (!formData.medicine_name.trim()) {
// // // //       setStatus("Please enter medicine name");
// // // //       speak("Please enter medicine name");
// // // //       return false;
// // // //     }
// // // //     if (!formData.time_of_day) {
// // // //       setStatus("Please select time of day");
// // // //       speak("Please select time of day");
// // // //       return false;
// // // //     }
// // // //     return true;
// // // //   };

// // // //   // Create new reminder
// // // //   const createReminder = async (e) => {
// // // //     e?.preventDefault();
    
// // // //     if (!validateForm()) return;

// // // //     try {
// // // //       setLoading(true);
// // // //       const token = localStorage.getItem("token");
      
// // // //       const payload = {
// // // //         medicine_name: formData.medicine_name,
// // // //         time_of_day: formData.time_of_day,
// // // //         repeat_frequency: formData.repeat_frequency,
// // // //         dosage_info: formData.dosage_info,
// // // //         duration_days: parseInt(formData.duration_days)
// // // //       };

// // // //       const response = await axios.post(
// // // //         "http://127.0.0.1:8000/api/medication-reminders/",
// // // //         payload,
// // // //         {
// // // //           headers: {
// // // //             Authorization: `Bearer ${token}`,
// // // //             "Content-Type": "application/json",
// // // //           },
// // // //         }
// // // //       );

// // // //       setReminders(prev => [...prev, response.data]);
// // // //       setStatus(`Medication reminder for ${formData.medicine_name} created successfully!`);
// // // //       speak(`Medication reminder for ${formData.medicine_name} created successfully`);
      
// // // //       // Reset form
// // // //       setFormData({
// // // //         medicine_name: "",
// // // //         time_of_day: "",
// // // //         repeat_frequency: "daily",
// // // //         dosage_info: "",
// // // //         duration_days: 30
// // // //       });
      
// // // //       // Announce new count
// // // //       setTimeout(() => {
// // // //         speak(`You now have ${reminders.length + 1} medication reminders.`);
// // // //       }, 500);
// // // //     } catch (error) {
// // // //       console.error("Error creating reminder:", error);
// // // //       let errorMessage = "Error creating medication reminder";
// // // //       if (error.response?.data) {
// // // //         errorMessage = Object.values(error.response.data).flat().join(", ");
// // // //       }
// // // //       setStatus(errorMessage);
// // // //       speak("Error creating medication reminder");
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   // Update reminder
// // // //   const updateReminder = async (e) => {
// // // //     e?.preventDefault();
    
// // // //     if (!validateForm()) return;

// // // //     try {
// // // //       setLoading(true);
// // // //       const token = localStorage.getItem("token");
      
// // // //       const payload = {
// // // //         medicine_name: formData.medicine_name,
// // // //         time_of_day: formData.time_of_day,
// // // //         repeat_frequency: formData.repeat_frequency,
// // // //         dosage_info: formData.dosage_info,
// // // //         duration_days: parseInt(formData.duration_days)
// // // //       };

// // // //       const response = await axios.put(
// // // //         `http://127.0.0.1:8000/api/medication-reminders/${editingReminder.id}/`,
// // // //         payload,
// // // //         {
// // // //           headers: {
// // // //             Authorization: `Bearer ${token}`,
// // // //             "Content-Type": "application/json",
// // // //           },
// // // //         }
// // // //       );

// // // //       setReminders(prev => 
// // // //         prev.map(reminder => 
// // // //           reminder.id === editingReminder.id ? response.data : reminder
// // // //         )
// // // //       );
      
// // // //       setStatus(`Medication reminder for ${formData.medicine_name} updated successfully!`);
// // // //       speak(`Medication reminder for ${formData.medicine_name} updated successfully`);
      
// // // //       // Reset editing state
// // // //       setEditingReminder(null);
// // // //       setFormData({
// // // //         medicine_name: "",
// // // //         time_of_day: "",
// // // //         repeat_frequency: "daily",
// // // //         dosage_info: "",
// // // //         duration_days: 30
// // // //       });
// // // //     } catch (error) {
// // // //       console.error("Error updating reminder:", error);
// // // //       let errorMessage = "Error updating medication reminder";
// // // //       if (error.response?.data) {
// // // //         errorMessage = Object.values(error.response.data).flat().join(", ");
// // // //       }
// // // //       setStatus(errorMessage);
// // // //       speak("Error updating medication reminder");
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   // Delete reminder
// // // //   const deleteReminder = async (id, medicineName) => {
// // // //     if (!window.confirm(`Are you sure you want to delete the reminder for ${medicineName}?`)) {
// // // //       return;
// // // //     }

// // // //     try {
// // // //       const token = localStorage.getItem("token");
// // // //       await axios.delete(
// // // //         `http://127.0.0.1:8000/api/medication-reminders/${id}/`,
// // // //         {
// // // //           headers: {
// // // //             Authorization: `Bearer ${token}`,
// // // //           },
// // // //         }
// // // //       );

// // // //       setReminders(prev => prev.filter(reminder => reminder.id !== id));
// // // //       setStatus(`Medication reminder for ${medicineName} deleted successfully`);
// // // //       speak(`Medication reminder for ${medicineName} deleted successfully`);
      
// // // //       // Announce new count
// // // //       setTimeout(() => {
// // // //         speak(`You now have ${reminders.length - 1} medication reminders.`);
// // // //       }, 500);
// // // //     } catch (error) {
// // // //       console.error("Error deleting reminder:", error);
// // // //       setStatus("Error deleting medication reminder");
// // // //       speak("Error deleting medication reminder");
// // // //     }
// // // //   };

// // // //   // Toggle reminder active status
// // // //   const toggleReminderStatus = async (reminder) => {
// // // //     try {
// // // //       const token = localStorage.getItem("token");
// // // //       const response = await axios.patch(
// // // //         `http://127.0.0.1:8000/api/medication-reminders/${reminder.id}/`,
// // // //         { active: !reminder.active },
// // // //         {
// // // //           headers: {
// // // //             Authorization: `Bearer ${token}`,
// // // //             "Content-Type": "application/json",
// // // //           },
// // // //         }
// // // //       );

// // // //       setReminders(prev => 
// // // //         prev.map(r => r.id === reminder.id ? response.data : r)
// // // //       );
      
// // // //       const action = response.data.active ? "activated" : "deactivated";
// // // //       setStatus(`Medication reminder ${action} successfully`);
// // // //       speak(`Medication reminder for ${reminder.medicine_name} ${action}`);
// // // //     } catch (error) {
// // // //       console.error("Error toggling reminder status:", error);
// // // //       setStatus("Error updating reminder status");
// // // //       speak("Error updating reminder status");
// // // //     }
// // // //   };

// // // //   // Start editing a reminder
// // // //   const startEditing = (reminder) => {
// // // //     setEditingReminder(reminder);
// // // //     setFormData({
// // // //       medicine_name: reminder.medicine_name,
// // // //       time_of_day: reminder.time_of_day,
// // // //       repeat_frequency: reminder.repeat_frequency,
// // // //       dosage_info: reminder.dosage_info || "",
// // // //       duration_days: reminder.duration_days || 30
// // // //     });
// // // //     speak(`Editing reminder for ${reminder.medicine_name}. Say 'save medication' to update or 'cancel' to stop.`);
// // // //   };

// // // //   // Cancel editing
// // // //   const cancelEditing = () => {
// // // //     setEditingReminder(null);
// // // //     setFormData({
// // // //       medicine_name: "",
// // // //       time_of_day: "",
// // // //       repeat_frequency: "daily",
// // // //       dosage_info: "",
// // // //       duration_days: 30
// // // //     });
// // // //     speak("Cancelled editing");
// // // //   };

// // // //   // Format time for display
// // // //   const formatTime = (timeString) => {
// // // //     if (!timeString) return "";
// // // //     try {
// // // //       const time = new Date(`2000-01-01T${timeString}`);
// // // //       return time.toLocaleTimeString('en-US', { 
// // // //         hour: '2-digit', 
// // // //         minute: '2-digit',
// // // //         hour12: true 
// // // //       });
// // // //     } catch (e) {
// // // //       return timeString;
// // // //     }
// // // //   };

// // // //   const handleLogout = async () => {
// // // //     setStatus("Logging out...");
// // // //     speak("Logging out...");

// // // //     try {
// // // //       const token = localStorage.getItem("token");
// // // //       if (token) {
// // // //         await axios.post(
// // // //           "http://127.0.0.1:8000/auth/voice-logout/",
// // // //           {},
// // // //           {
// // // //             headers: {
// // // //               Authorization: `Bearer ${token}`,
// // // //               "Content-Type": "application/json",
// // // //             },
// // // //           }
// // // //         );
// // // //       }
// // // //     } catch (error) {
// // // //       console.error("Logout backend error:", error.response?.data || error.message);
// // // //     } finally {
// // // //       localStorage.clear();
// // // //       setTimeout(() => navigate("/"), 1500);
// // // //     }
// // // //   };

// // // //   const handleBackToDashboard = () => {
// // // //     navigate("/dashboard");
// // // //   };

// // // //   // Handle form submission
// // // //   const handleSubmit = (e) => {
// // // //     if (e) e.preventDefault();
// // // //     if (editingReminder) {
// // // //       updateReminder();
// // // //     } else {
// // // //       createReminder();
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div className="medication-reminder-container">
// // // //       {/* Fixed Header - Use your existing voice button */}
// // // //       <header className="dashboard-header fixed-header">
// // // //         <div className="header-content">
// // // //           <div className="header-left">
// // // //             <button className="back-btn" onClick={handleBackToDashboard}>
// // // //               ← Back to Dashboard
// // // //             </button>
// // // //             <h1 className="logo">Vision Assist</h1>
// // // //           </div>
// // // //           <div className="user-menu">
// // // //             {/* Your existing voice button */}
// // // //             <button 
// // // //               className={`voice-btn ${isListening ? 'listening' : ''}`}
// // // //               onClick={toggleVoiceRecognition}
// // // //               title={isListening ? "Stop listening" : "Start voice commands"}
// // // //             >
// // // //               {isListening ? "🎤 Listening..." : "🎤 Voice"}
// // // //             </button>
            
// // // //             <button className="logout-btn" onClick={handleLogout}>
// // // //               Logout
// // // //             </button>
// // // //           </div>
// // // //         </div>
// // // //       </header>

// // // //       <div className="medication-content">
// // // //         <div className="medication-header">
// // // //           <h2>💊 Medication Reminder</h2>
// // // //           <p>Manage your medication schedule and reminders</p>
          
// // // //           {/* Simple voice status indicator */}
// // // //           {isListening && (
// // // //             <div className="voice-status-indicator">
// // // //               <span className="listening-pulse"></span>
// // // //               <span>Listening for voice commands...</span>
// // // //             </div>
// // // //           )}
// // // //         </div>

// // // //         {/* Voice Commands Help Toggle */}
// // // //         <div className="voice-help-toggle">
// // // //           <button 
// // // //             className="voice-help-btn"
// // // //             onClick={() => setShowVoiceHelp(!showVoiceHelp)}
// // // //           >
// // // //             {showVoiceHelp ? "Hide Voice Help" : "Show Voice Commands"}
// // // //           </button>
// // // //         </div>

// // // //         {/* Voice Commands Help Panel */}
// // // //         {showVoiceHelp && (
// // // //           <div className="voice-help-panel">
// // // //             <h3>🎤 Voice Commands Guide</h3>
// // // //             <div className="voice-commands-grid">
// // // //               <div className="voice-category">
// // // //                 <h4>Simple Commands</h4>
// // // //                 <ul>
// // // //                   <li>"Add medication" - Start new</li>
// // // //                   <li>"Save medication" - Save form</li>
// // // //                   <li>"List reminders" - Show all</li>
// // // //                   <li>"Logout" - Sign out</li>
// // // //                   <li>"Help" - Show this guide</li>
// // // //                 </ul>
// // // //               </div>
              
// // // //               <div className="voice-category">
// // // //                 <h4>Natural Language</h4>
// // // //                 <ul>
// // // //                   <li>"Add Dolo daily at 8 AM"</li>
// // // //                   <li>"Medicine name is Aspirin"</li>
// // // //                   <li>"Name is Paracetamol"</li>
// // // //                   <li>"Dolo for 20 days daily 7 AM"</li>
// // // //                   <li>"Take 1 tablet at 9 PM"</li>
// // // //                 </ul>
// // // //               </div>
              
// // // //               <div className="voice-category">
// // // //                 <h4>Complete Sentences</h4>
// // // //                 <ul>
// // // //                   <li>"Medicine name is Dolo time is 8 AM daily for 10 days"</li>
// // // //                   <li>"Name is Aspirin at 9 PM weekly for 15 days"</li>
// // // //                   <li>"Take Dolo 650 after food at 2 PM daily"</li>
// // // //                   <li>"Add vitamins every day at morning"</li>
// // // //                 </ul>
// // // //               </div>
              
// // // //               <div className="voice-category">
// // // //                 <h4>Actions</h4>
// // // //                 <ul>
// // // //                   <li>"Edit the last reminder"</li>
// // // //                   <li>"Delete all reminders"</li>
// // // //                   <li>"Activate all" / "Deactivate all"</li>
// // // //                   <li>"Refresh reminders"</li>
// // // //                   <li>"Clear form"</li>
// // // //                 </ul>
// // // //               </div>
// // // //             </div>
            
// // // //             <div className="voice-tips">
// // // //               <p><strong>Tip:</strong> Speak naturally. The system understands patterns like "Medicine name is [name]", "Add [name] at [time]", or complete sentences.</p>
// // // //               <button 
// // // //                 className="close-help-btn"
// // // //                 onClick={() => setShowVoiceHelp(false)}
// // // //               >
// // // //                 Close Help
// // // //               </button>
// // // //             </div>
// // // //           </div>
// // // //         )}

// // // //         {/* Status Message */}
// // // //         {status && (
// // // //           <div className="status-message">
// // // //             {status}
// // // //             <button 
// // // //               className="clear-status-btn"
// // // //               onClick={() => setStatus("")}
// // // //               title="Clear status"
// // // //             >
// // // //               ×
// // // //             </button>
// // // //           </div>
// // // //         )}

// // // //         {/* Add/Edit Form */}
// // // //         <div className="medication-form-section">
// // // //           <h3>{editingReminder ? "Edit Medication" : "Add New Medication"}</h3>
// // // //           <form onSubmit={handleSubmit} className="medication-form">
// // // //             <div className="form-row">
// // // //               <div className="form-group">
// // // //                 <label htmlFor="medicine_name">Medicine Name *</label>
// // // //                 <input
// // // //                   ref={medicineNameRef}
// // // //                   type="text"
// // // //                   id="medicine_name"
// // // //                   name="medicine_name"
// // // //                   value={formData.medicine_name}
// // // //                   onChange={handleInputChange}
// // // //                   placeholder="e.g., Dolo 650"
// // // //                   required
// // // //                   aria-label="Medicine name"
// // // //                 />
// // // //                 <span className="voice-hint">Say "medicine name is [name]" or "name is [name]"</span>
// // // //               </div>

// // // //               <div className="form-group">
// // // //                 <label htmlFor="time_of_day">Time of Day *</label>
// // // //                 <input
// // // //                   ref={timeOfDayRef}
// // // //                   type="time"
// // // //                   id="time_of_day"
// // // //                   name="time_of_day"
// // // //                   value={formData.time_of_day}
// // // //                   onChange={handleInputChange}
// // // //                   required
// // // //                   aria-label="Time of day"
// // // //                 />
// // // //                 <span className="voice-hint">Say "time is [time]" or "at [time]" or "set time to [time]"</span>
// // // //               </div>
// // // //             </div>

// // // //             <div className="form-row">
// // // //               <div className="form-group">
// // // //                 <label htmlFor="repeat_frequency">Repeat Frequency *</label>
// // // //                 <select
// // // //                   ref={repeatFrequencyRef}
// // // //                   id="repeat_frequency"
// // // //                   name="repeat_frequency"
// // // //                   value={formData.repeat_frequency}
// // // //                   onChange={handleInputChange}
// // // //                   required
// // // //                   aria-label="Repeat frequency"
// // // //                 >
// // // //                   <option value="daily">Daily</option>
// // // //                   <option value="weekly">Weekly</option>
// // // //                   <option value="monthly">Monthly</option>
// // // //                 </select>
// // // //                 <span className="voice-hint">Say "daily", "weekly", or "monthly"</span>
// // // //               </div>

// // // //               <div className="form-group">
// // // //                 <label htmlFor="duration_days">Duration (Days)</label>
// // // //                 <input
// // // //                   ref={durationDaysRef}
// // // //                   type="number"
// // // //                   id="duration_days"
// // // //                   name="duration_days"
// // // //                   value={formData.duration_days}
// // // //                   onChange={handleInputChange}
// // // //                   min="1"
// // // //                   max="365"
// // // //                   aria-label="Duration in days"
// // // //                 />
// // // //                 <span className="voice-hint">Say "for [number] days"</span>
// // // //               </div>
// // // //             </div>

// // // //             <div className="form-group">
// // // //               <label htmlFor="dosage_info">Dosage Information</label>
// // // //               <input
// // // //                 ref={dosageInfoRef}
// // // //                 type="text"
// // // //                 id="dosage_info"
// // // //                 name="dosage_info"
// // // //                 value={formData.dosage_info}
// // // //                 onChange={handleInputChange}
// // // //                 placeholder="e.g., 1 tablet after food"
// // // //                 aria-label="Dosage information"
// // // //               />
// // // //               <span className="voice-hint">Say "take [dosage]" or "[number] tablets"</span>
// // // //             </div>

// // // //             <div className="form-actions">
// // // //               <button 
// // // //                 type="submit" 
// // // //                 className="submit-btn"
// // // //                 disabled={loading}
// // // //                 aria-label={editingReminder ? "Update reminder" : "Add reminder"}
// // // //               >
// // // //                 {loading ? "Saving..." : (editingReminder ? "Update Reminder" : "Add Reminder")}
// // // //               </button>
              
// // // //               {editingReminder && (
// // // //                 <button 
// // // //                   type="button" 
// // // //                   className="cancel-btn"
// // // //                   onClick={cancelEditing}
// // // //                   aria-label="Cancel editing"
// // // //                 >
// // // //                   Cancel
// // // //                 </button>
// // // //               )}
// // // //             </div>
// // // //           </form>
// // // //         </div>

// // // //         {/* Reminders List */}
// // // //         <div className="reminders-list-section">
// // // //           <div className="section-header">
// // // //             <h3>Your Medication Reminders ({reminders.length})</h3>
// // // //             <button 
// // // //               className="refresh-btn"
// // // //               onClick={fetchReminders}
// // // //               aria-label="Refresh reminders"
// // // //             >
// // // //               ⟳ Refresh
// // // //             </button>
// // // //           </div>
          
// // // //           {loading && reminders.length === 0 ? (
// // // //             <div className="loading">Loading reminders...</div>
// // // //           ) : reminders.length === 0 ? (
// // // //             <div className="empty-state">
// // // //               <p>No medication reminders yet. Add your first reminder above.</p>
// // // //             </div>
// // // //           ) : (
// // // //             <div className="reminders-grid">
// // // //               {reminders.map(reminder => (
// // // //                 <div key={reminder.id} className={`reminder-card ${reminder.active ? 'active' : 'inactive'}`}>
// // // //                   <div className="reminder-header">
// // // //                     <h4>{reminder.medicine_name}</h4>
// // // //                     <span className={`status-badge ${reminder.active ? 'active' : 'inactive'}`}>
// // // //                       {reminder.active ? 'Active' : 'Inactive'}
// // // //                     </span>
// // // //                   </div>
                  
// // // //                   <div className="reminder-details">
// // // //                     <div className="detail-item">
// // // //                       <span className="label">Time:</span>
// // // //                       <span className="value">{formatTime(reminder.time_of_day)}</span>
// // // //                     </div>
                    
// // // //                     <div className="detail-item">
// // // //                       <span className="label">Frequency:</span>
// // // //                       <span className="value">{reminder.repeat_frequency}</span>
// // // //                     </div>
                    
// // // //                     {reminder.dosage_info && (
// // // //                       <div className="detail-item">
// // // //                         <span className="label">Dosage:</span>
// // // //                         <span className="value">{reminder.dosage_info}</span>
// // // //                       </div>
// // // //                     )}
                    
// // // //                     <div className="detail-item">
// // // //                       <span className="label">Duration:</span>
// // // //                       <span className="value">{reminder.duration_days} days</span>
// // // //                     </div>
// // // //                   </div>

// // // //                   <div className="reminder-actions">
// // // //                     <button 
// // // //                       className="edit-btn"
// // // //                       onClick={() => startEditing(reminder)}
// // // //                       aria-label={`Edit ${reminder.medicine_name}`}
// // // //                     >
// // // //                       Edit
// // // //                     </button>
                    
// // // //                     <button 
// // // //                       className={`toggle-btn ${reminder.active ? 'deactivate' : 'activate'}`}
// // // //                       onClick={() => toggleReminderStatus(reminder)}
// // // //                       aria-label={reminder.active ? `Deactivate ${reminder.medicine_name}` : `Activate ${reminder.medicine_name}`}
// // // //                     >
// // // //                       {reminder.active ? 'Deactivate' : 'Activate'}
// // // //                     </button>
                    
// // // //                     <button 
// // // //                       className="delete-btn"
// // // //                       onClick={() => deleteReminder(reminder.id, reminder.medicine_name)}
// // // //                       aria-label={`Delete ${reminder.medicine_name}`}
// // // //                     >
// // // //                       Delete
// // // //                     </button>
// // // //                   </div>
// // // //                 </div>
// // // //               ))}
// // // //             </div>
// // // //           )}
// // // //         </div>
// // // //       </div>

// // // //       {/* Status Bar */}
// // // //       <div className="status-bar">
// // // //         <div className="status-content">
// // // //           <p>{status || (isListening ? "Listening for commands..." : "Click microphone icon to start voice commands")}</p>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default MedicationReminder;



// // // // src/components/MedicationReminder.jsx
// // // import React, { useState, useEffect, useRef } from "react";
// // // import { useNavigate } from "react-router-dom";
// // // import axios from "axios";
// // // import "./MedicationReminder.css";
// // // import { voiceService } from "../../services/voiceService";
// // // import { 
// // //   initializeMedicationCommands, 
// // //   stopMedicationCommands 
// // // } from "../../voice-commands/medicationVoiceCommands";

// // // const MedicationReminder = () => {
// // //   const [reminders, setReminders] = useState([]);
// // //   const [loading, setLoading] = useState(false);
// // //   const [status, setStatus] = useState("");
// // //   const [editingReminder, setEditingReminder] = useState(null);
// // //   const [showVoiceHelp, setShowVoiceHelp] = useState(false);
// // //   const navigate = useNavigate();
  
// // //   // Refs for form inputs
// // //   const medicineNameRef = useRef(null);
// // //   const timeOfDayRef = useRef(null);
// // //   const repeatFrequencyRef = useRef(null);
// // //   const dosageInfoRef = useRef(null);
// // //   const durationDaysRef = useRef(null);
  
// // //   // Form state
// // //   const [formData, setFormData] = useState({
// // //     medicine_name: "",
// // //     time_of_day: "",
// // //     repeat_frequency: "daily",
// // //     dosage_info: "",
// // //     duration_days: 30
// // //   });

// // //   // Helper speak function
// // //   const speak = (text) => {
// // //     voiceService.speak(text);
// // //   };

// // //   // Fetch all reminders
// // //   const fetchReminders = async () => {
// // //     try {
// // //       setLoading(true);
// // //       const token = localStorage.getItem("token");
// // //       const response = await axios.get(
// // //         "http://127.0.0.1:8000/api/medication-reminders/",
// // //         {
// // //           headers: {
// // //             Authorization: `Bearer ${token}`,
// // //           },
// // //         }
// // //       );
// // //       setReminders(response.data);
// // //       setStatus(`Loaded ${response.data.length} medication reminders`);
// // //       speak(`Loaded ${response.data.length} medication reminders`);
// // //     } catch (error) {
// // //       console.error("Error fetching reminders:", error);
// // //       setStatus("Error loading medication reminders");
// // //       speak("Error loading medication reminders");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   // Initialize voice commands and fetch data on mount
// // //   useEffect(() => {
// // //     fetchReminders();
    
// // //     // Auto-announce on load
// // //     setTimeout(() => {
// // //       speak("Medication reminder page loaded. Say 'help' for voice commands or 'add medication' to start.");
// // //     }, 1000);

// // //     // Set up voice commands
// // //     const handlers = {
// // //       handleBackToDashboard: () => {
// // //         navigate("/dashboard");
// // //         speak("Going back to dashboard");
// // //       },
// // //       handleLogout,
// // //       navigate,
// // //       setStatus,
// // //       speak,
// // //       setFormData,
// // //       formData,
// // //       editingReminder,
// // //       handleSubmit: (e) => {
// // //         if (e) e.preventDefault();
// // //         if (editingReminder) {
// // //           updateReminder();
// // //         } else {
// // //           createReminder();
// // //         }
// // //       },
// // //       cancelEditing,
// // //       fetchReminders,
// // //       reminders,
// // //       startEditing,
// // //       deleteReminder,
// // //       toggleReminderStatus,
// // //       activateAllReminders,
// // //       deleteAllReminders,
// // //       medicineNameRef,
// // //       timeOfDayRef,
// // //       repeatFrequencyRef,
// // //       dosageInfoRef,
// // //       durationDaysRef,
// // //       setShowVoiceHelp
// // //     };

// // //     initializeMedicationCommands(handlers);

// // //     // Cleanup
// // //     return () => {
// // //       stopMedicationCommands();
// // //     };
// // //   }, [formData, editingReminder, reminders]);

// // //   // Toggle voice recognition
// // //   const toggleVoiceRecognition = () => {
// // //     if (voiceService.isListening) {
// // //       voiceService.stopListening();
// // //       setStatus("Voice recognition stopped.");
// // //       speak("Voice recognition stopped.");
// // //     } else {
// // //       voiceService.startListening();
// // //     }
// // //   };

// // //   // Handle form input changes
// // //   const handleInputChange = (e) => {
// // //     const { name, value } = e.target;
// // //     setFormData(prev => ({
// // //       ...prev,
// // //       [name]: value
// // //     }));
// // //   };

// // //   // Validate form
// // //   const validateForm = () => {
// // //     if (!formData.medicine_name.trim()) {
// // //       setStatus("Please enter medicine name");
// // //       speak("Please enter medicine name");
// // //       return false;
// // //     }
// // //     if (!formData.time_of_day) {
// // //       setStatus("Please select time of day");
// // //       speak("Please select time of day");
// // //       return false;
// // //     }
// // //     return true;
// // //   };

// // //   // Create new reminder
// // //   const createReminder = async (e) => {
// // //     e?.preventDefault();
    
// // //     if (!validateForm()) return;

// // //     try {
// // //       setLoading(true);
// // //       const token = localStorage.getItem("token");
      
// // //       const payload = {
// // //         medicine_name: formData.medicine_name,
// // //         time_of_day: formData.time_of_day,
// // //         repeat_frequency: formData.repeat_frequency,
// // //         dosage_info: formData.dosage_info,
// // //         duration_days: parseInt(formData.duration_days)
// // //       };

// // //       const response = await axios.post(
// // //         "http://127.0.0.1:8000/api/medication-reminders/",
// // //         payload,
// // //         {
// // //           headers: {
// // //             Authorization: `Bearer ${token}`,
// // //             "Content-Type": "application/json",
// // //           },
// // //         }
// // //       );

// // //       setReminders(prev => [...prev, response.data]);
// // //       setStatus(`Medication reminder for ${formData.medicine_name} created successfully!`);
// // //       speak(`Medication reminder for ${formData.medicine_name} created successfully`);
      
// // //       // Reset form
// // //       setFormData({
// // //         medicine_name: "",
// // //         time_of_day: "",
// // //         repeat_frequency: "daily",
// // //         dosage_info: "",
// // //         duration_days: 30
// // //       });
      
// // //       // Announce new count
// // //       setTimeout(() => {
// // //         speak(`You now have ${reminders.length + 1} medication reminders.`);
// // //       }, 500);
// // //     } catch (error) {
// // //       console.error("Error creating reminder:", error);
// // //       let errorMessage = "Error creating medication reminder";
// // //       if (error.response?.data) {
// // //         errorMessage = Object.values(error.response.data).flat().join(", ");
// // //       }
// // //       setStatus(errorMessage);
// // //       speak("Error creating medication reminder");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   // Update reminder
// // //   const updateReminder = async (e) => {
// // //     e?.preventDefault();
    
// // //     if (!validateForm()) return;

// // //     try {
// // //       setLoading(true);
// // //       const token = localStorage.getItem("token");
      
// // //       const payload = {
// // //         medicine_name: formData.medicine_name,
// // //         time_of_day: formData.time_of_day,
// // //         repeat_frequency: formData.repeat_frequency,
// // //         dosage_info: formData.dosage_info,
// // //         duration_days: parseInt(formData.duration_days)
// // //       };

// // //       const response = await axios.put(
// // //         `http://127.0.0.1:8000/api/medication-reminders/${editingReminder.id}/`,
// // //         payload,
// // //         {
// // //           headers: {
// // //             Authorization: `Bearer ${token}`,
// // //             "Content-Type": "application/json",
// // //           },
// // //         }
// // //       );

// // //       setReminders(prev => 
// // //         prev.map(reminder => 
// // //           reminder.id === editingReminder.id ? response.data : reminder
// // //         )
// // //       );
      
// // //       setStatus(`Medication reminder for ${formData.medicine_name} updated successfully!`);
// // //       speak(`Medication reminder for ${formData.medicine_name} updated successfully`);
      
// // //       // Reset editing state
// // //       setEditingReminder(null);
// // //       setFormData({
// // //         medicine_name: "",
// // //         time_of_day: "",
// // //         repeat_frequency: "daily",
// // //         dosage_info: "",
// // //         duration_days: 30
// // //       });
// // //     } catch (error) {
// // //       console.error("Error updating reminder:", error);
// // //       let errorMessage = "Error updating medication reminder";
// // //       if (error.response?.data) {
// // //         errorMessage = Object.values(error.response.data).flat().join(", ");
// // //       }
// // //       setStatus(errorMessage);
// // //       speak("Error updating medication reminder");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   // Delete reminder
// // //   const deleteReminder = async (id, medicineName) => {
// // //     if (!window.confirm(`Are you sure you want to delete the reminder for ${medicineName}?`)) {
// // //       return;
// // //     }

// // //     try {
// // //       const token = localStorage.getItem("token");
// // //       await axios.delete(
// // //         `http://127.0.0.1:8000/api/medication-reminders/${id}/`,
// // //         {
// // //           headers: {
// // //             Authorization: `Bearer ${token}`,
// // //           },
// // //         }
// // //       );

// // //       setReminders(prev => prev.filter(reminder => reminder.id !== id));
// // //       setStatus(`Medication reminder for ${medicineName} deleted successfully`);
// // //       speak(`Medication reminder for ${medicineName} deleted successfully`);
      
// // //       // Announce new count
// // //       setTimeout(() => {
// // //         speak(`You now have ${reminders.length - 1} medication reminders.`);
// // //       }, 500);
// // //     } catch (error) {
// // //       console.error("Error deleting reminder:", error);
// // //       setStatus("Error deleting medication reminder");
// // //       speak("Error deleting medication reminder");
// // //     }
// // //   };

// // //   // Toggle reminder active status
// // //   const toggleReminderStatus = async (reminder) => {
// // //     try {
// // //       const token = localStorage.getItem("token");
// // //       const response = await axios.patch(
// // //         `http://127.0.0.1:8000/api/medication-reminders/${reminder.id}/`,
// // //         { active: !reminder.active },
// // //         {
// // //           headers: {
// // //             Authorization: `Bearer ${token}`,
// // //             "Content-Type": "application/json",
// // //           },
// // //         }
// // //       );

// // //       setReminders(prev => 
// // //         prev.map(r => r.id === reminder.id ? response.data : r)
// // //       );
      
// // //       const action = response.data.active ? "activated" : "deactivated";
// // //       setStatus(`Medication reminder ${action} successfully`);
// // //       speak(`Medication reminder for ${reminder.medicine_name} ${action}`);
// // //     } catch (error) {
// // //       console.error("Error toggling reminder status:", error);
// // //       setStatus("Error updating reminder status");
// // //       speak("Error updating reminder status");
// // //     }
// // //   };

// // //   // Start editing a reminder
// // //   const startEditing = (reminder) => {
// // //     setEditingReminder(reminder);
// // //     setFormData({
// // //       medicine_name: reminder.medicine_name,
// // //       time_of_day: reminder.time_of_day,
// // //       repeat_frequency: reminder.repeat_frequency,
// // //       dosage_info: reminder.dosage_info || "",
// // //       duration_days: reminder.duration_days || 30
// // //     });
// // //     speak(`Editing reminder for ${reminder.medicine_name}. Say 'save medication' to update or 'cancel' to stop.`);
// // //   };

// // //   // Cancel editing
// // //   const cancelEditing = () => {
// // //     setEditingReminder(null);
// // //     setFormData({
// // //       medicine_name: "",
// // //       time_of_day: "",
// // //       repeat_frequency: "daily",
// // //       dosage_info: "",
// // //       duration_days: 30
// // //     });
// // //     speak("Cancelled editing");
// // //   };

// // //   // Activate/deactivate all reminders
// // //   const activateAllReminders = async (activate) => {
// // //     try {
// // //       const token = localStorage.getItem("token");
// // //       const promises = reminders.map(reminder =>
// // //         axios.patch(
// // //           `http://127.0.0.1:8000/api/medication-reminders/${reminder.id}/`,
// // //           { active: activate },
// // //           {
// // //             headers: {
// // //               Authorization: `Bearer ${token}`,
// // //               "Content-Type": "application/json",
// // //             },
// // //           }
// // //         )
// // //       );

// // //       await Promise.all(promises);
// // //       const updatedReminders = reminders.map(r => ({ ...r, active: activate }));
// // //       setReminders(updatedReminders);
      
// // //       const action = activate ? "activated" : "deactivated";
// // //       setStatus(`All reminders ${action}`);
// // //       speak(`All reminders ${action}`);
// // //     } catch (error) {
// // //       console.error("Error updating all reminders:", error);
// // //       setStatus("Error updating reminders");
// // //       speak("Error updating reminders");
// // //     }
// // //   };

// // //   // Delete all reminders
// // //   const deleteAllReminders = async () => {
// // //     try {
// // //       const token = localStorage.getItem("token");
// // //       const promises = reminders.map(reminder =>
// // //         axios.delete(
// // //           `http://127.0.0.1:8000/api/medication-reminders/${reminder.id}/`,
// // //           {
// // //             headers: {
// // //               Authorization: `Bearer ${token}`,
// // //             },
// // //           }
// // //         )
// // //       );

// // //       await Promise.all(promises);
// // //       setReminders([]);
// // //       setStatus("All reminders deleted");
// // //       speak("All reminders deleted");
// // //     } catch (error) {
// // //       console.error("Error deleting all reminders:", error);
// // //       setStatus("Error deleting reminders");
// // //       speak("Error deleting reminders");
// // //     }
// // //   };

// // //   // Handle logout
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

// // //   // Handle back to dashboard
// // //   const handleBackToDashboard = () => {
// // //     navigate("/dashboard");
// // //   };

// // //   // Handle form submission
// // //   const handleSubmit = (e) => {
// // //     if (e) e.preventDefault();
// // //     if (editingReminder) {
// // //       updateReminder();
// // //     } else {
// // //       createReminder();
// // //     }
// // //   };

// // //   // Format time for display
// // //   const formatTime = (timeString) => {
// // //     if (!timeString) return "";
// // //     try {
// // //       const time = new Date(`2000-01-01T${timeString}`);
// // //       return time.toLocaleTimeString('en-US', { 
// // //         hour: '2-digit', 
// // //         minute: '2-digit',
// // //         hour12: true 
// // //       });
// // //     } catch (e) {
// // //       return timeString;
// // //     }
// // //   };

// // //   return (
// // //     <div className="medication-reminder-container">
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
// // //             {/* Voice button */}
// // //             <button 
// // //               className={`voice-btn ${voiceService.isListening ? 'listening' : ''}`}
// // //               onClick={toggleVoiceRecognition}
// // //               title={voiceService.isListening ? "Stop listening" : "Start voice commands"}
// // //             >
// // //               {voiceService.isListening ? "🎤 Listening..." : "🎤 Voice"}
// // //             </button>
            
// // //             <button className="logout-btn" onClick={handleLogout}>
// // //               Logout
// // //             </button>
// // //           </div>
// // //         </div>
// // //       </header>

// // //       <div className="medication-content">
// // //         <div className="medication-header">
// // //           <h2>💊 Medication Reminder</h2>
// // //           <p>Manage your medication schedule and reminders</p>
          
// // //           {/* Simple voice status indicator */}
// // //           {voiceService.isListening && (
// // //             <div className="voice-status-indicator">
// // //               <span className="listening-pulse"></span>
// // //               <span>Listening for voice commands...</span>
// // //             </div>
// // //           )}
// // //         </div>

// // //         {/* Voice Commands Help Toggle */}
// // //         <div className="voice-help-toggle">
// // //           <button 
// // //             className="voice-help-btn"
// // //             onClick={() => setShowVoiceHelp(!showVoiceHelp)}
// // //           >
// // //             {showVoiceHelp ? "Hide Voice Help" : "Show Voice Commands"}
// // //           </button>
// // //         </div>

// // //         {/* Voice Commands Help Panel */}
// // //         {showVoiceHelp && (
// // //           <div className="voice-help-panel">
// // //             <h3>🎤 Voice Commands Guide</h3>
// // //             <div className="voice-commands-grid">
// // //               <div className="voice-category">
// // //                 <h4>Simple Commands</h4>
// // //                 <ul>
// // //                   <li>"Add medication" - Start new</li>
// // //                   <li>"Save medication" - Save form</li>
// // //                   <li>"List reminders" - Show all</li>
// // //                   <li>"Logout" - Sign out</li>
// // //                   <li>"Help" - Show this guide</li>
// // //                 </ul>
// // //               </div>
              
// // //               <div className="voice-category">
// // //                 <h4>Natural Language</h4>
// // //                 <ul>
// // //                   <li>"Add Dolo daily at 8 AM"</li>
// // //                   <li>"Medicine name is Aspirin"</li>
// // //                   <li>"Name is Paracetamol"</li>
// // //                   <li>"Dolo for 20 days daily 7 AM"</li>
// // //                   <li>"Take 1 tablet at 9 PM"</li>
// // //                 </ul>
// // //               </div>
              
// // //               <div className="voice-category">
// // //                 <h4>Complete Sentences</h4>
// // //                 <ul>
// // //                   <li>"Medicine name is Dolo time is 8 AM daily for 10 days"</li>
// // //                   <li>"Name is Aspirin at 9 PM weekly for 15 days"</li>
// // //                   <li>"Take Dolo 650 after food at 2 PM daily"</li>
// // //                   <li>"Add vitamins every day at morning"</li>
// // //                 </ul>
// // //               </div>
              
// // //               <div className="voice-category">
// // //                 <h4>Actions</h4>
// // //                 <ul>
// // //                   <li>"Edit the last reminder"</li>
// // //                   <li>"Delete all reminders"</li>
// // //                   <li>"Activate all" / "Deactivate all"</li>
// // //                   <li>"Refresh reminders"</li>
// // //                   <li>"Clear form"</li>
// // //                 </ul>
// // //               </div>
// // //             </div>
            
// // //             <div className="voice-tips">
// // //               <p><strong>Tip:</strong> Speak naturally. The system understands patterns like "Medicine name is [name]", "Add [name] at [time]", or complete sentences.</p>
// // //               <button 
// // //                 className="close-help-btn"
// // //                 onClick={() => setShowVoiceHelp(false)}
// // //               >
// // //                 Close Help
// // //               </button>
// // //             </div>
// // //           </div>
// // //         )}

// // //         {/* Status Message */}
// // //         {status && (
// // //           <div className="status-message">
// // //             {status}
// // //             <button 
// // //               className="clear-status-btn"
// // //               onClick={() => setStatus("")}
// // //               title="Clear status"
// // //             >
// // //               ×
// // //             </button>
// // //           </div>
// // //         )}

// // //         {/* Add/Edit Form */}
// // //         <div className="medication-form-section">
// // //           <h3>{editingReminder ? "Edit Medication" : "Add New Medication"}</h3>
// // //           <form onSubmit={handleSubmit} className="medication-form">
// // //             <div className="form-row">
// // //               <div className="form-group">
// // //                 <label htmlFor="medicine_name">Medicine Name *</label>
// // //                 <input
// // //                   ref={medicineNameRef}
// // //                   type="text"
// // //                   id="medicine_name"
// // //                   name="medicine_name"
// // //                   value={formData.medicine_name}
// // //                   onChange={handleInputChange}
// // //                   placeholder="e.g., Dolo 650"
// // //                   required
// // //                   aria-label="Medicine name"
// // //                 />
// // //                 <span className="voice-hint">Say "medicine name is [name]" or "name is [name]"</span>
// // //               </div>

// // //               <div className="form-group">
// // //                 <label htmlFor="time_of_day">Time of Day *</label>
// // //                 <input
// // //                   ref={timeOfDayRef}
// // //                   type="time"
// // //                   id="time_of_day"
// // //                   name="time_of_day"
// // //                   value={formData.time_of_day}
// // //                   onChange={handleInputChange}
// // //                   required
// // //                   aria-label="Time of day"
// // //                 />
// // //                 <span className="voice-hint">Say "time is [time]" or "at [time]" or "set time to [time]"</span>
// // //               </div>
// // //             </div>

// // //             <div className="form-row">
// // //               <div className="form-group">
// // //                 <label htmlFor="repeat_frequency">Repeat Frequency *</label>
// // //                 <select
// // //                   ref={repeatFrequencyRef}
// // //                   id="repeat_frequency"
// // //                   name="repeat_frequency"
// // //                   value={formData.repeat_frequency}
// // //                   onChange={handleInputChange}
// // //                   required
// // //                   aria-label="Repeat frequency"
// // //                 >
// // //                   <option value="daily">Daily</option>
// // //                   <option value="weekly">Weekly</option>
// // //                   <option value="monthly">Monthly</option>
// // //                 </select>
// // //                 <span className="voice-hint">Say "daily", "weekly", or "monthly"</span>
// // //               </div>

// // //               <div className="form-group">
// // //                 <label htmlFor="duration_days">Duration (Days)</label>
// // //                 <input
// // //                   ref={durationDaysRef}
// // //                   type="number"
// // //                   id="duration_days"
// // //                   name="duration_days"
// // //                   value={formData.duration_days}
// // //                   onChange={handleInputChange}
// // //                   min="1"
// // //                   max="365"
// // //                   aria-label="Duration in days"
// // //                 />
// // //                 <span className="voice-hint">Say "for [number] days"</span>
// // //               </div>
// // //             </div>

// // //             <div className="form-group">
// // //               <label htmlFor="dosage_info">Dosage Information</label>
// // //               <input
// // //                 ref={dosageInfoRef}
// // //                 type="text"
// // //                 id="dosage_info"
// // //                 name="dosage_info"
// // //                 value={formData.dosage_info}
// // //                 onChange={handleInputChange}
// // //                 placeholder="e.g., 1 tablet after food"
// // //                 aria-label="Dosage information"
// // //               />
// // //               <span className="voice-hint">Say "take [dosage]" or "[number] tablets"</span>
// // //             </div>

// // //             <div className="form-actions">
// // //               <button 
// // //                 type="submit" 
// // //                 className="submit-btn"
// // //                 disabled={loading}
// // //                 aria-label={editingReminder ? "Update reminder" : "Add reminder"}
// // //               >
// // //                 {loading ? "Saving..." : (editingReminder ? "Update Reminder" : "Add Reminder")}
// // //               </button>
              
// // //               {editingReminder && (
// // //                 <button 
// // //                   type="button" 
// // //                   className="cancel-btn"
// // //                   onClick={cancelEditing}
// // //                   aria-label="Cancel editing"
// // //                 >
// // //                   Cancel
// // //                 </button>
// // //               )}
// // //             </div>
// // //           </form>
// // //         </div>

// // //         {/* Reminders List */}
// // //         <div className="reminders-list-section">
// // //           <div className="section-header">
// // //             <h3>Your Medication Reminders ({reminders.length})</h3>
// // //             <button 
// // //               className="refresh-btn"
// // //               onClick={fetchReminders}
// // //               aria-label="Refresh reminders"
// // //             >
// // //               ⟳ Refresh
// // //             </button>
// // //           </div>
          
// // //           {loading && reminders.length === 0 ? (
// // //             <div className="loading">Loading reminders...</div>
// // //           ) : reminders.length === 0 ? (
// // //             <div className="empty-state">
// // //               <p>No medication reminders yet. Add your first reminder above.</p>
// // //             </div>
// // //           ) : (
// // //             <div className="reminders-grid">
// // //               {reminders.map(reminder => (
// // //                 <div key={reminder.id} className={`reminder-card ${reminder.active ? 'active' : 'inactive'}`}>
// // //                   <div className="reminder-header">
// // //                     <h4>{reminder.medicine_name}</h4>
// // //                     <span className={`status-badge ${reminder.active ? 'active' : 'inactive'}`}>
// // //                       {reminder.active ? 'Active' : 'Inactive'}
// // //                     </span>
// // //                   </div>
                  
// // //                   <div className="reminder-details">
// // //                     <div className="detail-item">
// // //                       <span className="label">Time:</span>
// // //                       <span className="value">{formatTime(reminder.time_of_day)}</span>
// // //                     </div>
                    
// // //                     <div className="detail-item">
// // //                       <span className="label">Frequency:</span>
// // //                       <span className="value">{reminder.repeat_frequency}</span>
// // //                     </div>
                    
// // //                     {reminder.dosage_info && (
// // //                       <div className="detail-item">
// // //                         <span className="label">Dosage:</span>
// // //                         <span className="value">{reminder.dosage_info}</span>
// // //                       </div>
// // //                     )}
                    
// // //                     <div className="detail-item">
// // //                       <span className="label">Duration:</span>
// // //                       <span className="value">{reminder.duration_days} days</span>
// // //                     </div>
// // //                   </div>

// // //                   <div className="reminder-actions">
// // //                     <button 
// // //                       className="edit-btn"
// // //                       onClick={() => startEditing(reminder)}
// // //                       aria-label={`Edit ${reminder.medicine_name}`}
// // //                     >
// // //                       Edit
// // //                     </button>
                    
// // //                     <button 
// // //                       className={`toggle-btn ${reminder.active ? 'deactivate' : 'activate'}`}
// // //                       onClick={() => toggleReminderStatus(reminder)}
// // //                       aria-label={reminder.active ? `Deactivate ${reminder.medicine_name}` : `Activate ${reminder.medicine_name}`}
// // //                     >
// // //                       {reminder.active ? 'Deactivate' : 'Activate'}
// // //                     </button>
                    
// // //                     <button 
// // //                       className="delete-btn"
// // //                       onClick={() => deleteReminder(reminder.id, reminder.medicine_name)}
// // //                       aria-label={`Delete ${reminder.medicine_name}`}
// // //                     >
// // //                       Delete
// // //                     </button>
// // //                   </div>
// // //                 </div>
// // //               ))}
// // //             </div>
// // //           )}
// // //         </div>
// // //       </div>

// // //       {/* Status Bar */}
// // //       <div className="status-bar">
// // //         <div className="status-content">
// // //           <p>{status || (voiceService.isListening ? "Listening for commands..." : "Click microphone icon to start voice commands")}</p>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default MedicationReminder;


// // // src/components/MedicationReminder.jsx
// // import React, { useState, useEffect, useRef } from "react";
// // import { useNavigate } from "react-router-dom";
// // import axios from "axios";
// // import "./MedicationReminder.css";
// // import { voiceService } from "../../services/voiceService";
// // import { 
// //   initializeMedicationCommands, 
// //   stopMedicationCommands 
// // } from "../../voice-commands/medicationVoiceCommands";

// // const MedicationReminder = () => {
// //   const [reminders, setReminders] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [status, setStatus] = useState("");
// //   const [editingReminder, setEditingReminder] = useState(null);
// //   const [showVoiceHelp, setShowVoiceHelp] = useState(false);
// //   const navigate = useNavigate();
  
// //   // Refs for form inputs
// //   const medicineNameRef = useRef(null);
// //   const timeOfDayRef = useRef(null);
// //   const repeatFrequencyRef = useRef(null);
// //   const dosageInfoRef = useRef(null);
// //   const durationDaysRef = useRef(null);
  
// //   // Form state
// //   const [formData, setFormData] = useState({
// //     medicine_name: "",
// //     time_of_day: "",
// //     repeat_frequency: "daily",
// //     dosage_info: "",
// //     duration_days: 30
// //   });

// //   // Helper speak function with error handling
// //   const speak = (text) => {
// //     try {
// //       voiceService.speak(text);
// //     } catch (error) {
// //       console.warn("Speech synthesis error:", error);
// //       // Fallback: show in status
// //       setStatus(text.substring(0, 100) + "...");
// //     }
// //   };

// //   // Fetch all reminders
// //   const fetchReminders = async () => {
// //     try {
// //       setLoading(true);
// //       const token = localStorage.getItem("token");
// //       const response = await axios.get(
// //         "http://127.0.0.1:8000/api/medication-reminders/",
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         }
// //       );
// //       setReminders(response.data);
// //       setStatus(`Loaded ${response.data.length} medication reminders`);
// //       speak(`Loaded ${response.data.length} medication reminders`);
// //     } catch (error) {
// //       console.error("Error fetching reminders:", error);
// //       setStatus("Error loading medication reminders");
// //       speak("Error loading medication reminders");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // Check if we're coming from another page
// //   useEffect(() => {
// //     // First, stop any existing voice recognition
// //     if (voiceService.isListening) {
// //       voiceService.stopListening();
// //     }
    
// //     // Clear any existing commands
// //     voiceService.clearCommands();
// //     voiceService.clearDynamicHandlers();
    
// //     // Then fetch data
// //     fetchReminders();
    
// //     // Small delay before announcing to ensure cleanup is complete
// //     const announceTimer = setTimeout(() => {
// //       speak("Medication reminder page loaded. Say 'help' for voice commands or 'add medication' to start.");
// //     }, 500);

// //     return () => {
// //       clearTimeout(announceTimer);
// //     };
// //   }, []);

// //   // Initialize voice commands after component is mounted and data is loaded
// //   useEffect(() => {
// //     // Skip if still loading or voice service not available
// //     if (loading || !voiceService.isAvailable()) {
// //       return;
// //     }

// //     // Create handlers object
// //     const handlers = {
// //       handleBackToDashboard: () => {
// //         navigate("/dashboard");
// //         speak("Going back to dashboard");
// //       },
// //       handleLogout,
// //       navigate,
// //       setStatus,
// //       speak,
// //       setFormData,
// //       formData,
// //       editingReminder,
// //       handleSubmit: (e) => {
// //         if (e) e.preventDefault();
// //         if (editingReminder) {
// //           updateReminder();
// //         } else {
// //           createReminder();
// //         }
// //       },
// //       cancelEditing,
// //       fetchReminders,
// //       reminders,
// //       startEditing,
// //       deleteReminder,
// //       toggleReminderStatus,
// //       activateAllReminders,
// //       deleteAllReminders,
// //       medicineNameRef,
// //       timeOfDayRef,
// //       repeatFrequencyRef,
// //       dosageInfoRef,
// //       durationDaysRef,
// //       setShowVoiceHelp
// //     };

// //     // Initialize medication-specific commands
// //     initializeMedicationCommands(handlers);

// //     // Cleanup function
// //     return () => {
// //       // Don't stop listening completely, just clear medication commands
// //       voiceService.clearCommands();
// //       voiceService.clearDynamicHandlers();
// //       // Reset to default feature
// //       voiceService.setFeature('default');
// //     };
// //   }, [loading, formData, editingReminder, reminders, navigate]);

// //   // Toggle voice recognition
// //   const toggleVoiceRecognition = () => {
// //     if (voiceService.isListening) {
// //       voiceService.stopListening();
// //       setStatus("Voice recognition stopped.");
// //       speak("Voice recognition stopped.");
// //     } else {
// //       try {
// //         voiceService.startListening();
// //         setStatus("Voice recognition started. Try saying 'help' for commands.");
// //       } catch (error) {
// //         console.error("Error starting voice recognition:", error);
// //         setStatus("Error starting voice recognition. Please try again.");
// //       }
// //     }
// //   };

// //   // Rest of the component methods remain the same...
// //   // handleInputChange, validateForm, createReminder, updateReminder,
// //   // deleteReminder, toggleReminderStatus, startEditing, cancelEditing,
// //   // handleLogout, handleBackToDashboard, etc.

// //   // Handle form input changes
// //   const handleInputChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData(prev => ({
// //       ...prev,
// //       [name]: value
// //     }));
// //   };

// //   // Validate form
// //   const validateForm = () => {
// //     if (!formData.medicine_name.trim()) {
// //       setStatus("Please enter medicine name");
// //       speak("Please enter medicine name");
// //       return false;
// //     }
// //     if (!formData.time_of_day) {
// //       setStatus("Please select time of day");
// //       speak("Please select time of day");
// //       return false;
// //     }
// //     return true;
// //   };

// //   // Create new reminder
// //   const createReminder = async (e) => {
// //     e?.preventDefault();
    
// //     if (!validateForm()) return;

// //     try {
// //       setLoading(true);
// //       const token = localStorage.getItem("token");
      
// //       const payload = {
// //         medicine_name: formData.medicine_name,
// //         time_of_day: formData.time_of_day,
// //         repeat_frequency: formData.repeat_frequency,
// //         dosage_info: formData.dosage_info,
// //         duration_days: parseInt(formData.duration_days)
// //       };

// //       const response = await axios.post(
// //         "http://127.0.0.1:8000/api/medication-reminders/",
// //         payload,
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //             "Content-Type": "application/json",
// //           },
// //         }
// //       );

// //       setReminders(prev => [...prev, response.data]);
// //       setStatus(`Medication reminder for ${formData.medicine_name} created successfully!`);
// //       speak(`Medication reminder for ${formData.medicine_name} created successfully`);
      
// //       // Reset form
// //       setFormData({
// //         medicine_name: "",
// //         time_of_day: "",
// //         repeat_frequency: "daily",
// //         dosage_info: "",
// //         duration_days: 30
// //       });
      
// //       // Announce new count
// //       setTimeout(() => {
// //         speak(`You now have ${reminders.length + 1} medication reminders.`);
// //       }, 500);
// //     } catch (error) {
// //       console.error("Error creating reminder:", error);
// //       let errorMessage = "Error creating medication reminder";
// //       if (error.response?.data) {
// //         errorMessage = Object.values(error.response.data).flat().join(", ");
// //       }
// //       setStatus(errorMessage);
// //       speak("Error creating medication reminder");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // Update reminder
// //   const updateReminder = async (e) => {
// //     e?.preventDefault();
    
// //     if (!validateForm()) return;

// //     try {
// //       setLoading(true);
// //       const token = localStorage.getItem("token");
      
// //       const payload = {
// //         medicine_name: formData.medicine_name,
// //         time_of_day: formData.time_of_day,
// //         repeat_frequency: formData.repeat_frequency,
// //         dosage_info: formData.dosage_info,
// //         duration_days: parseInt(formData.duration_days)
// //       };

// //       const response = await axios.put(
// //         `http://127.0.0.1:8000/api/medication-reminders/${editingReminder.id}/`,
// //         payload,
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //             "Content-Type": "application/json",
// //           },
// //         }
// //       );

// //       setReminders(prev => 
// //         prev.map(reminder => 
// //           reminder.id === editingReminder.id ? response.data : reminder
// //         )
// //       );
      
// //       setStatus(`Medication reminder for ${formData.medicine_name} updated successfully!`);
// //       speak(`Medication reminder for ${formData.medicine_name} updated successfully`);
      
// //       // Reset editing state
// //       setEditingReminder(null);
// //       setFormData({
// //         medicine_name: "",
// //         time_of_day: "",
// //         repeat_frequency: "daily",
// //         dosage_info: "",
// //         duration_days: 30
// //       });
// //     } catch (error) {
// //       console.error("Error updating reminder:", error);
// //       let errorMessage = "Error updating medication reminder";
// //       if (error.response?.data) {
// //         errorMessage = Object.values(error.response.data).flat().join(", ");
// //       }
// //       setStatus(errorMessage);
// //       speak("Error updating medication reminder");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // Delete reminder
// //   const deleteReminder = async (id, medicineName) => {
// //     if (!window.confirm(`Are you sure you want to delete the reminder for ${medicineName}?`)) {
// //       return;
// //     }

// //     try {
// //       const token = localStorage.getItem("token");
// //       await axios.delete(
// //         `http://127.0.0.1:8000/api/medication-reminders/${id}/`,
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         }
// //       );

// //       setReminders(prev => prev.filter(reminder => reminder.id !== id));
// //       setStatus(`Medication reminder for ${medicineName} deleted successfully`);
// //       speak(`Medication reminder for ${medicineName} deleted successfully`);
      
// //       // Announce new count
// //       setTimeout(() => {
// //         speak(`You now have ${reminders.length - 1} medication reminders.`);
// //       }, 500);
// //     } catch (error) {
// //       console.error("Error deleting reminder:", error);
// //       setStatus("Error deleting medication reminder");
// //       speak("Error deleting medication reminder");
// //     }
// //   };

// //   // Toggle reminder active status
// //   const toggleReminderStatus = async (reminder) => {
// //     try {
// //       const token = localStorage.getItem("token");
// //       const response = await axios.patch(
// //         `http://127.0.0.1:8000/api/medication-reminders/${reminder.id}/`,
// //         { active: !reminder.active },
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //             "Content-Type": "application/json",
// //           },
// //         }
// //       );

// //       setReminders(prev => 
// //         prev.map(r => r.id === reminder.id ? response.data : r)
// //       );
      
// //       const action = response.data.active ? "activated" : "deactivated";
// //       setStatus(`Medication reminder ${action} successfully`);
// //       speak(`Medication reminder for ${reminder.medicine_name} ${action}`);
// //     } catch (error) {
// //       console.error("Error toggling reminder status:", error);
// //       setStatus("Error updating reminder status");
// //       speak("Error updating reminder status");
// //     }
// //   };

// //   // Start editing a reminder
// //   const startEditing = (reminder) => {
// //     setEditingReminder(reminder);
// //     setFormData({
// //       medicine_name: reminder.medicine_name,
// //       time_of_day: reminder.time_of_day,
// //       repeat_frequency: reminder.repeat_frequency,
// //       dosage_info: reminder.dosage_info || "",
// //       duration_days: reminder.duration_days || 30
// //     });
// //     speak(`Editing reminder for ${reminder.medicine_name}. Say 'save medication' to update or 'cancel' to stop.`);
// //   };

// //   // Cancel editing
// //   const cancelEditing = () => {
// //     setEditingReminder(null);
// //     setFormData({
// //       medicine_name: "",
// //       time_of_day: "",
// //       repeat_frequency: "daily",
// //       dosage_info: "",
// //       duration_days: 30
// //     });
// //     speak("Cancelled editing");
// //   };

// //   // Activate/deactivate all reminders
// //   const activateAllReminders = async (activate) => {
// //     try {
// //       const token = localStorage.getItem("token");
// //       const promises = reminders.map(reminder =>
// //         axios.patch(
// //           `http://127.0.0.1:8000/api/medication-reminders/${reminder.id}/`,
// //           { active: activate },
// //           {
// //             headers: {
// //               Authorization: `Bearer ${token}`,
// //               "Content-Type": "application/json",
// //             },
// //           }
// //         )
// //       );

// //       await Promise.all(promises);
// //       const updatedReminders = reminders.map(r => ({ ...r, active: activate }));
// //       setReminders(updatedReminders);
      
// //       const action = activate ? "activated" : "deactivated";
// //       setStatus(`All reminders ${action}`);
// //       speak(`All reminders ${action}`);
// //     } catch (error) {
// //       console.error("Error updating all reminders:", error);
// //       setStatus("Error updating reminders");
// //       speak("Error updating reminders");
// //     }
// //   };

// //   // Delete all reminders
// //   const deleteAllReminders = async () => {
// //     try {
// //       const token = localStorage.getItem("token");
// //       const promises = reminders.map(reminder =>
// //         axios.delete(
// //           `http://127.0.0.1:8000/api/medication-reminders/${reminder.id}/`,
// //           {
// //             headers: {
// //               Authorization: `Bearer ${token}`,
// //             },
// //           }
// //         )
// //       );

// //       await Promise.all(promises);
// //       setReminders([]);
// //       setStatus("All reminders deleted");
// //       speak("All reminders deleted");
// //     } catch (error) {
// //       console.error("Error deleting all reminders:", error);
// //       setStatus("Error deleting reminders");
// //       speak("Error deleting reminders");
// //     }
// //   };

// //   // Handle logout
// //   const handleLogout = async () => {
// //     setStatus("Logging out...");
// //     speak("Logging out...");

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
// //       // Stop voice service before clearing storage
// //       voiceService.stopListening();
// //       localStorage.clear();
// //       setTimeout(() => navigate("/"), 1500);
// //     }
// //   };

// //   // Handle back to dashboard
// //   const handleBackToDashboard = () => {
// //     navigate("/dashboard");
// //   };

// //   // Handle form submission
// //   const handleSubmit = (e) => {
// //     if (e) e.preventDefault();
// //     if (editingReminder) {
// //       updateReminder();
// //     } else {
// //       createReminder();
// //     }
// //   };

// //   // Format time for display
// //   const formatTime = (timeString) => {
// //     if (!timeString) return "";
// //     try {
// //       const time = new Date(`2000-01-01T${timeString}`);
// //       return time.toLocaleTimeString('en-US', { 
// //         hour: '2-digit', 
// //         minute: '2-digit',
// //         hour12: true 
// //       });
// //     } catch (e) {
// //       return timeString;
// //     }
// //   };

// //   return (
// //     <div className="medication-reminder-container">
// //       {/* Fixed Header */}
// //       <header className="dashboard-header fixed-header">
// //         <div className="header-content">
// //           <div className="header-left">
// //             <button className="back-btn" onClick={handleBackToDashboard}>
// //               ← Back to Dashboard
// //             </button>
// //             <h1 className="logo">Vision Assist</h1>
// //           </div>
// //           <div className="user-menu">
// //             {/* Voice button */}
// //             <button 
// //               className={`voice-btn ${voiceService.isListening ? 'listening' : ''}`}
// //               onClick={toggleVoiceRecognition}
// //               title={voiceService.isListening ? "Stop listening" : "Start voice commands"}
// //             >
// //               {voiceService.isListening ? "🎤 Listening..." : "🎤 Voice"}
// //             </button>
            
// //             <button className="logout-btn" onClick={handleLogout}>
// //               Logout
// //             </button>
// //           </div>
// //         </div>
// //       </header>

// //       <div className="medication-content">
// //         <div className="medication-header">
// //           <h2>💊 Medication Reminder</h2>
// //           <p>Manage your medication schedule and reminders</p>
          
// //           {/* Simple voice status indicator */}
// //           {voiceService.isListening && (
// //             <div className="voice-status-indicator">
// //               <span className="listening-pulse"></span>
// //               <span>Listening for voice commands...</span>
// //             </div>
// //           )}
// //         </div>

// //         {/* Voice Commands Help Toggle */}
// //         <div className="voice-help-toggle">
// //           <button 
// //             className="voice-help-btn"
// //             onClick={() => setShowVoiceHelp(!showVoiceHelp)}
// //           >
// //             {showVoiceHelp ? "Hide Voice Help" : "Show Voice Commands"}
// //           </button>
// //         </div>

// //         {/* Voice Commands Help Panel */}
// //         {showVoiceHelp && (
// //           <div className="voice-help-panel">
// //             <h3>🎤 Voice Commands Guide</h3>
// //             <div className="voice-commands-grid">
// //               <div className="voice-category">
// //                 <h4>Simple Commands</h4>
// //                 <ul>
// //                   <li>"Add medication" - Start new</li>
// //                   <li>"Save medication" - Save form</li>
// //                   <li>"List reminders" - Show all</li>
// //                   <li>"Logout" - Sign out</li>
// //                   <li>"Help" - Show this guide</li>
// //                 </ul>
// //               </div>
              
// //               <div className="voice-category">
// //                 <h4>Natural Language</h4>
// //                 <ul>
// //                   <li>"Add Dolo daily at 8 AM"</li>
// //                   <li>"Medicine name is Aspirin"</li>
// //                   <li>"Name is Paracetamol"</li>
// //                   <li>"Dolo for 20 days daily 7 AM"</li>
// //                   <li>"Take 1 tablet at 9 PM"</li>
// //                 </ul>
// //               </div>
              
// //               <div className="voice-category">
// //                 <h4>Complete Sentences</h4>
// //                 <ul>
// //                   <li>"Medicine name is Dolo time is 8 AM daily for 10 days"</li>
// //                   <li>"Name is Aspirin at 9 PM weekly for 15 days"</li>
// //                   <li>"Take Dolo 650 after food at 2 PM daily"</li>
// //                   <li>"Add vitamins every day at morning"</li>
// //                 </ul>
// //               </div>
              
// //               <div className="voice-category">
// //                 <h4>Actions</h4>
// //                 <ul>
// //                   <li>"Edit the last reminder"</li>
// //                   <li>"Delete all reminders"</li>
// //                   <li>"Activate all" / "Deactivate all"</li>
// //                   <li>"Refresh reminders"</li>
// //                   <li>"Clear form"</li>
// //                 </ul>
// //               </div>
// //             </div>
            
// //             <div className="voice-tips">
// //               <p><strong>Tip:</strong> Speak naturally. The system understands patterns like "Medicine name is [name]", "Add [name] at [time]", or complete sentences.</p>
// //               <button 
// //                 className="close-help-btn"
// //                 onClick={() => setShowVoiceHelp(false)}
// //               >
// //                 Close Help
// //               </button>
// //             </div>
// //           </div>
// //         )}

// //         {/* Status Message */}
// //         {status && (
// //           <div className="status-message">
// //             {status}
// //             <button 
// //               className="clear-status-btn"
// //               onClick={() => setStatus("")}
// //               title="Clear status"
// //             >
// //               ×
// //             </button>
// //           </div>
// //         )}

// //         {/* Add/Edit Form */}
// //         <div className="medication-form-section">
// //           <h3>{editingReminder ? "Edit Medication" : "Add New Medication"}</h3>
// //           <form onSubmit={handleSubmit} className="medication-form">
// //             <div className="form-row">
// //               <div className="form-group">
// //                 <label htmlFor="medicine_name">Medicine Name *</label>
// //                 <input
// //                   ref={medicineNameRef}
// //                   type="text"
// //                   id="medicine_name"
// //                   name="medicine_name"
// //                   value={formData.medicine_name}
// //                   onChange={handleInputChange}
// //                   placeholder="e.g., Dolo 650"
// //                   required
// //                   aria-label="Medicine name"
// //                 />
// //                 <span className="voice-hint">Say "medicine name is [name]" or "name is [name]"</span>
// //               </div>

// //               <div className="form-group">
// //                 <label htmlFor="time_of_day">Time of Day *</label>
// //                 <input
// //                   ref={timeOfDayRef}
// //                   type="time"
// //                   id="time_of_day"
// //                   name="time_of_day"
// //                   value={formData.time_of_day}
// //                   onChange={handleInputChange}
// //                   required
// //                   aria-label="Time of day"
// //                 />
// //                 <span className="voice-hint">Say "time is [time]" or "at [time]" or "set time to [time]"</span>
// //               </div>
// //             </div>

// //             <div className="form-row">
// //               <div className="form-group">
// //                 <label htmlFor="repeat_frequency">Repeat Frequency *</label>
// //                 <select
// //                   ref={repeatFrequencyRef}
// //                   id="repeat_frequency"
// //                   name="repeat_frequency"
// //                   value={formData.repeat_frequency}
// //                   onChange={handleInputChange}
// //                   required
// //                   aria-label="Repeat frequency"
// //                 >
// //                   <option value="daily">Daily</option>
// //                   <option value="weekly">Weekly</option>
// //                   <option value="monthly">Monthly</option>
// //                 </select>
// //                 <span className="voice-hint">Say "daily", "weekly", or "monthly"</span>
// //               </div>

// //               <div className="form-group">
// //                 <label htmlFor="duration_days">Duration (Days)</label>
// //                 <input
// //                   ref={durationDaysRef}
// //                   type="number"
// //                   id="duration_days"
// //                   name="duration_days"
// //                   value={formData.duration_days}
// //                   onChange={handleInputChange}
// //                   min="1"
// //                   max="365"
// //                   aria-label="Duration in days"
// //                 />
// //                 <span className="voice-hint">Say "for [number] days"</span>
// //               </div>
// //             </div>

// //             <div className="form-group">
// //               <label htmlFor="dosage_info">Dosage Information</label>
// //               <input
// //                 ref={dosageInfoRef}
// //                 type="text"
// //                 id="dosage_info"
// //                 name="dosage_info"
// //                 value={formData.dosage_info}
// //                 onChange={handleInputChange}
// //                 placeholder="e.g., 1 tablet after food"
// //                 aria-label="Dosage information"
// //               />
// //               <span className="voice-hint">Say "take [dosage]" or "[number] tablets"</span>
// //             </div>

// //             <div className="form-actions">
// //               <button 
// //                 type="submit" 
// //                 className="submit-btn"
// //                 disabled={loading}
// //                 aria-label={editingReminder ? "Update reminder" : "Add reminder"}
// //               >
// //                 {loading ? "Saving..." : (editingReminder ? "Update Reminder" : "Add Reminder")}
// //               </button>
              
// //               {editingReminder && (
// //                 <button 
// //                   type="button" 
// //                   className="cancel-btn"
// //                   onClick={cancelEditing}
// //                   aria-label="Cancel editing"
// //                 >
// //                   Cancel
// //                 </button>
// //               )}
// //             </div>
// //           </form>
// //         </div>

// //         {/* Reminders List */}
// //         <div className="reminders-list-section">
// //           <div className="section-header">
// //             <h3>Your Medication Reminders ({reminders.length})</h3>
// //             <button 
// //               className="refresh-btn"
// //               onClick={fetchReminders}
// //               aria-label="Refresh reminders"
// //             >
// //               ⟳ Refresh
// //             </button>
// //           </div>
          
// //           {loading && reminders.length === 0 ? (
// //             <div className="loading">Loading reminders...</div>
// //           ) : reminders.length === 0 ? (
// //             <div className="empty-state">
// //               <p>No medication reminders yet. Add your first reminder above.</p>
// //             </div>
// //           ) : (
// //             <div className="reminders-grid">
// //               {reminders.map(reminder => (
// //                 <div key={reminder.id} className={`reminder-card ${reminder.active ? 'active' : 'inactive'}`}>
// //                   <div className="reminder-header">
// //                     <h4>{reminder.medicine_name}</h4>
// //                     <span className={`status-badge ${reminder.active ? 'active' : 'inactive'}`}>
// //                       {reminder.active ? 'Active' : 'Inactive'}
// //                     </span>
// //                   </div>
                  
// //                   <div className="reminder-details">
// //                     <div className="detail-item">
// //                       <span className="label">Time:</span>
// //                       <span className="value">{formatTime(reminder.time_of_day)}</span>
// //                     </div>
                    
// //                     <div className="detail-item">
// //                       <span className="label">Frequency:</span>
// //                       <span className="value">{reminder.repeat_frequency}</span>
// //                     </div>
                    
// //                     {reminder.dosage_info && (
// //                       <div className="detail-item">
// //                         <span className="label">Dosage:</span>
// //                         <span className="value">{reminder.dosage_info}</span>
// //                       </div>
// //                     )}
                    
// //                     <div className="detail-item">
// //                       <span className="label">Duration:</span>
// //                       <span className="value">{reminder.duration_days} days</span>
// //                     </div>
// //                   </div>

// //                   <div className="reminder-actions">
// //                     <button 
// //                       className="edit-btn"
// //                       onClick={() => startEditing(reminder)}
// //                       aria-label={`Edit ${reminder.medicine_name}`}
// //                     >
// //                       Edit
// //                     </button>
                    
// //                     <button 
// //                       className={`toggle-btn ${reminder.active ? 'deactivate' : 'activate'}`}
// //                       onClick={() => toggleReminderStatus(reminder)}
// //                       aria-label={reminder.active ? `Deactivate ${reminder.medicine_name}` : `Activate ${reminder.medicine_name}`}
// //                     >
// //                       {reminder.active ? 'Deactivate' : 'Activate'}
// //                     </button>
                    
// //                     <button 
// //                       className="delete-btn"
// //                       onClick={() => deleteReminder(reminder.id, reminder.medicine_name)}
// //                       aria-label={`Delete ${reminder.medicine_name}`}
// //                     >
// //                       Delete
// //                     </button>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           )}
// //         </div>
// //       </div>

// //       {/* Status Bar */}
// //       <div className="status-bar">
// //         <div className="status-content">
// //           <p>{status || (voiceService.isListening ? "Listening for commands..." : "Click microphone icon to start voice commands")}</p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default MedicationReminder;




// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./MedicationReminder.css";
// import { voiceService } from "../../services/voiceService";
// import { 
//   initializeMedicationCommands, 
//   stopMedicationCommands 
// } from "../../voice-commands/medicationVoiceCommands";

// const MedicationReminder = () => {
//   const [reminders, setReminders] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [status, setStatus] = useState("");
//   const [editingReminder, setEditingReminder] = useState(null);
//   const [showVoiceHelp, setShowVoiceHelp] = useState(false);
//   const navigate = useNavigate();
  
//   // Refs for form inputs
//   const medicineNameRef = useRef(null);
//   const timeOfDayRef = useRef(null);
//   const repeatFrequencyRef = useRef(null);
//   const dosageInfoRef = useRef(null);
//   const durationDaysRef = useRef(null);
  
//   // Form state
//   const [formData, setFormData] = useState({
//     medicine_name: "",
//     time_of_day: "",
//     repeat_frequency: "daily",
//     dosage_info: "",
//     duration_days: 30
//   });

//   // Helper speak function
//   const speak = (text) => {
//     voiceService.speak(text);
//   };

//   // Fetch all reminders
//   const fetchReminders = async () => {
//     try {
//       setLoading(true);
//       const token = localStorage.getItem("token");
//       const response = await axios.get(
//         "http://127.0.0.1:8000/api/medication-reminders/",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setReminders(response.data);
//       setStatus(`Loaded ${response.data.length} medication reminders`);
//       speak(`Loaded ${response.data.length} medication reminders`);
//     } catch (error) {
//       console.error("Error fetching reminders:", error);
//       setStatus("Error loading medication reminders");
//       speak("Error loading medication reminders");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Initialize component
//   useEffect(() => {
//     fetchReminders();
    
//     // Auto-announce on load
//     setTimeout(() => {
//       speak("Medication reminder page loaded. Say 'help' for voice commands or 'add medication' to start.");
//     }, 1000);

//     return () => {
//       // Cleanup speech if any
//       window.speechSynthesis?.cancel();
//     };
//   }, []);

//   // Initialize voice commands
//   useEffect(() => {
//     // Check if voice service is available
//     if (!voiceService.isAvailable()) {
//       setStatus("Voice recognition is not supported in your browser.");
//       return;
//     }

//     // Set up voice commands after a brief delay to ensure component is ready
//     const setupVoiceCommands = () => {
//       // Stop any existing listening first
//       if (voiceService.isListening) {
//         voiceService.stopListening();
//       }

//       // Create handlers object
//       const handlers = {
//         handleBackToDashboard: () => {
//           navigate("/dashboard");
//           speak("Going back to dashboard");
//         },
//         handleLogout,
//         navigate,
//         setStatus,
//         speak,
//         setFormData,
//         formData,
//         editingReminder,
//         handleSubmit: (e) => {
//           if (e) e.preventDefault();
//           if (editingReminder) {
//             updateReminder();
//           } else {
//             createReminder();
//           }
//         },
//         cancelEditing,
//         fetchReminders,
//         reminders,
//         startEditing,
//         deleteReminder,
//         toggleReminderStatus,
//         activateAllReminders,
//         deleteAllReminders,
//         medicineNameRef,
//         timeOfDayRef,
//         repeatFrequencyRef,
//         dosageInfoRef,
//         durationDaysRef,
//         setShowVoiceHelp
//       };

//       // Initialize medication-specific commands
//       initializeMedicationCommands(handlers);
//     };

//     // Delay setup to ensure component is fully mounted
//     const timer = setTimeout(setupVoiceCommands, 500);

//     return () => {
//       clearTimeout(timer);
//       stopMedicationCommands();
//     };
//   }, [formData, editingReminder, reminders, navigate]);

//   // Toggle voice recognition
//   const toggleVoiceRecognition = () => {
//     if (voiceService.isListening) {
//       voiceService.stopListening();
//       setStatus("Voice recognition stopped.");
//       speak("Voice recognition stopped.");
//     } else {
//       try {
//         voiceService.startListening();
//         setStatus("Voice recognition started. Try saying 'help' for commands.");
//         speak("Voice recognition started. Say 'help' for available commands.");
//       } catch (error) {
//         console.error("Error starting voice recognition:", error);
//         setStatus("Error starting voice recognition. Please try again.");
//         speak("Error starting voice recognition. Please try again.");
//       }
//     }
//   };

//   // Handle form input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   // Validate form
//   const validateForm = () => {
//     if (!formData.medicine_name.trim()) {
//       setStatus("Please enter medicine name");
//       speak("Please enter medicine name");
//       return false;
//     }
//     if (!formData.time_of_day) {
//       setStatus("Please select time of day");
//       speak("Please select time of day");
//       return false;
//     }
//     return true;
//   };

//   // Create new reminder
//   const createReminder = async (e) => {
//     e?.preventDefault();
    
//     if (!validateForm()) return;

//     try {
//       setLoading(true);
//       const token = localStorage.getItem("token");
      
//       const payload = {
//         medicine_name: formData.medicine_name,
//         time_of_day: formData.time_of_day,
//         repeat_frequency: formData.repeat_frequency,
//         dosage_info: formData.dosage_info,
//         duration_days: parseInt(formData.duration_days)
//       };

//       const response = await axios.post(
//         "http://127.0.0.1:8000/api/medication-reminders/",
//         payload,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       setReminders(prev => [...prev, response.data]);
//       setStatus(`Medication reminder for ${formData.medicine_name} created successfully!`);
//       speak(`Medication reminder for ${formData.medicine_name} created successfully`);
      
//       // Reset form
//       setFormData({
//         medicine_name: "",
//         time_of_day: "",
//         repeat_frequency: "daily",
//         dosage_info: "",
//         duration_days: 30
//       });
      
//       // Refresh the list
//       fetchReminders();
//     } catch (error) {
//       console.error("Error creating reminder:", error);
//       let errorMessage = "Error creating medication reminder";
//       if (error.response?.data) {
//         errorMessage = Object.values(error.response.data).flat().join(", ");
//       }
//       setStatus(errorMessage);
//       speak("Error creating medication reminder");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Update reminder
//   const updateReminder = async (e) => {
//     e?.preventDefault();
    
//     if (!validateForm()) return;

//     try {
//       setLoading(true);
//       const token = localStorage.getItem("token");
      
//       const payload = {
//         medicine_name: formData.medicine_name,
//         time_of_day: formData.time_of_day,
//         repeat_frequency: formData.repeat_frequency,
//         dosage_info: formData.dosage_info,
//         duration_days: parseInt(formData.duration_days)
//       };

//       const response = await axios.put(
//         `http://127.0.0.1:8000/api/medication-reminders/${editingReminder.id}/`,
//         payload,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       setReminders(prev => 
//         prev.map(reminder => 
//           reminder.id === editingReminder.id ? response.data : reminder
//         )
//       );
      
//       setStatus(`Medication reminder for ${formData.medicine_name} updated successfully!`);
//       speak(`Medication reminder for ${formData.medicine_name} updated successfully`);
      
//       // Reset editing state
//       setEditingReminder(null);
//       setFormData({
//         medicine_name: "",
//         time_of_day: "",
//         repeat_frequency: "daily",
//         dosage_info: "",
//         duration_days: 30
//       });
//     } catch (error) {
//       console.error("Error updating reminder:", error);
//       let errorMessage = "Error updating medication reminder";
//       if (error.response?.data) {
//         errorMessage = Object.values(error.response.data).flat().join(", ");
//       }
//       setStatus(errorMessage);
//       speak("Error updating medication reminder");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Delete reminder
//   const deleteReminder = async (id, medicineName) => {
//     if (!window.confirm(`Are you sure you want to delete the reminder for ${medicineName}?`)) {
//       return;
//     }

//     try {
//       const token = localStorage.getItem("token");
//       await axios.delete(
//         `http://127.0.0.1:8000/api/medication-reminders/${id}/`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setReminders(prev => prev.filter(reminder => reminder.id !== id));
//       setStatus(`Medication reminder for ${medicineName} deleted successfully`);
//       speak(`Medication reminder for ${medicineName} deleted successfully`);
      
//       // Refresh the list
//       fetchReminders();
//     } catch (error) {
//       console.error("Error deleting reminder:", error);
//       setStatus("Error deleting medication reminder");
//       speak("Error deleting medication reminder");
//     }
//   };

//   // Toggle reminder active status
//   const toggleReminderStatus = async (reminder) => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.patch(
//         `http://127.0.0.1:8000/api/medication-reminders/${reminder.id}/`,
//         { active: !reminder.active },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       setReminders(prev => 
//         prev.map(r => r.id === reminder.id ? response.data : r)
//       );
      
//       const action = response.data.active ? "activated" : "deactivated";
//       setStatus(`Medication reminder ${action} successfully`);
//       speak(`Medication reminder for ${reminder.medicine_name} ${action}`);
//     } catch (error) {
//       console.error("Error toggling reminder status:", error);
//       setStatus("Error updating reminder status");
//       speak("Error updating reminder status");
//     }
//   };

//   // Start editing a reminder
//   const startEditing = (reminder) => {
//     setEditingReminder(reminder);
//     setFormData({
//       medicine_name: reminder.medicine_name,
//       time_of_day: reminder.time_of_day,
//       repeat_frequency: reminder.repeat_frequency,
//       dosage_info: reminder.dosage_info || "",
//       duration_days: reminder.duration_days || 30
//     });
//     speak(`Editing reminder for ${reminder.medicine_name}. Say 'save medication' to update or 'cancel' to stop.`);
//   };

//   // Cancel editing
//   const cancelEditing = () => {
//     setEditingReminder(null);
//     setFormData({
//       medicine_name: "",
//       time_of_day: "",
//       repeat_frequency: "daily",
//       dosage_info: "",
//       duration_days: 30
//     });
//     speak("Cancelled editing");
//   };

//   // Activate/deactivate all reminders
//   const activateAllReminders = async (activate) => {
//     try {
//       const token = localStorage.getItem("token");
//       const promises = reminders.map(reminder =>
//         axios.patch(
//           `http://127.0.0.1:8000/api/medication-reminders/${reminder.id}/`,
//           { active: activate },
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "application/json",
//             },
//           }
//         )
//       );

//       await Promise.all(promises);
//       const updatedReminders = reminders.map(r => ({ ...r, active: activate }));
//       setReminders(updatedReminders);
      
//       const action = activate ? "activated" : "deactivated";
//       setStatus(`All reminders ${action}`);
//       speak(`All reminders ${action}`);
//     } catch (error) {
//       console.error("Error updating all reminders:", error);
//       setStatus("Error updating reminders");
//       speak("Error updating reminders");
//     }
//   };

//   // Delete all reminders
//   const deleteAllReminders = async () => {
//     if (reminders.length === 0) {
//       setStatus("No reminders to delete");
//       speak("No reminders to delete");
//       return;
//     }

//     if (!window.confirm(`Are you sure you want to delete all ${reminders.length} reminders?`)) {
//       return;
//     }

//     try {
//       const token = localStorage.getItem("token");
//       const promises = reminders.map(reminder =>
//         axios.delete(
//           `http://127.0.0.1:8000/api/medication-reminders/${reminder.id}/`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         )
//       );

//       await Promise.all(promises);
//       setReminders([]);
//       setStatus("All reminders deleted");
//       speak("All reminders deleted");
//     } catch (error) {
//       console.error("Error deleting all reminders:", error);
//       setStatus("Error deleting reminders");
//       speak("Error deleting reminders");
//     }
//   };

//   // Handle logout
//   const handleLogout = async () => {
//     setStatus("Logging out...");
//     speak("Logging out...");

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
//       // Stop voice service before clearing storage
//       voiceService.stopListening();
//       localStorage.clear();
//       setTimeout(() => navigate("/"), 1500);
//     }
//   };

//   // Handle back to dashboard
//   const handleBackToDashboard = () => {
//     navigate("/dashboard");
//   };

//   // Handle form submission
//   const handleSubmit = (e) => {
//     if (e) e.preventDefault();
//     if (editingReminder) {
//       updateReminder();
//     } else {
//       createReminder();
//     }
//   };

//   // Format time for display
//   const formatTime = (timeString) => {
//     if (!timeString) return "";
//     try {
//       const time = new Date(`2000-01-01T${timeString}`);
//       return time.toLocaleTimeString('en-US', { 
//         hour: '2-digit', 
//         minute: '2-digit',
//         hour12: true 
//       });
//     } catch (e) {
//       return timeString;
//     }
//   };

//   return (
//     <div className="medication-reminder-container">
//       {/* Fixed Header */}
//       <header className="dashboard-header fixed-header">
//         <div className="header-content">
//           <div className="header-left">
//             <button className="back-btn" onClick={handleBackToDashboard}>
//               ← Back to Dashboard
//             </button>
//             <h1 className="logo">Vision Assist</h1>
//           </div>
//           <div className="user-menu">
//             {/* Voice button */}
//             <button 
//               className={`voice-btn ${voiceService.isListening ? 'listening' : ''}`}
//               onClick={toggleVoiceRecognition}
//               title={voiceService.isListening ? "Stop listening" : "Start voice commands"}
//             >
//               {voiceService.isListening ? "🎤 Listening..." : "🎤 Voice"}
//             </button>
            
//             <button className="logout-btn" onClick={handleLogout}>
//               Logout
//             </button>
//           </div>
//         </div>
//       </header>

//       <div className="medication-content">
//         <div className="medication-header">
//           <h2>💊 Medication Reminder</h2>
//           <p>Manage your medication schedule and reminders</p>
          
//           {/* Simple voice status indicator */}
//           {voiceService.isListening && (
//             <div className="voice-status-indicator">
//               <span className="listening-pulse"></span>
//               <span>Listening for voice commands...</span>
//             </div>
//           )}
//         </div>

//         {/* Voice Commands Help Toggle */}
//         <div className="voice-help-toggle">
//           <button 
//             className="voice-help-btn"
//             onClick={() => setShowVoiceHelp(!showVoiceHelp)}
//           >
//             {showVoiceHelp ? "Hide Voice Help" : "Show Voice Commands"}
//           </button>
//         </div>

//         {/* Voice Commands Help Panel */}
//         {showVoiceHelp && (
//           <div className="voice-help-panel">
//             <h3>🎤 Voice Commands Guide</h3>
//             <div className="voice-commands-grid">
//               <div className="voice-category">
//                 <h4>Simple Commands</h4>
//                 <ul>
//                   <li>"Add medication" - Start new</li>
//                   <li>"Save medication" - Save form</li>
//                   <li>"List reminders" - Show all</li>
//                   <li>"Logout" - Sign out</li>
//                   <li>"Help" - Show this guide</li>
//                 </ul>
//               </div>
              
//               <div className="voice-category">
//                 <h4>Natural Language</h4>
//                 <ul>
//                   <li>"Add Dolo daily at 8 AM"</li>
//                   <li>"Medicine name is Aspirin"</li>
//                   <li>"Name is Paracetamol"</li>
//                   <li>"Dolo for 20 days daily 7 AM"</li>
//                   <li>"Take 1 tablet at 9 PM"</li>
//                 </ul>
//               </div>
              
//               <div className="voice-category">
//                 <h4>Complete Sentences</h4>
//                 <ul>
//                   <li>"Medicine name is Dolo time is 8 AM daily for 10 days"</li>
//                   <li>"Name is Aspirin at 9 PM weekly for 15 days"</li>
//                   <li>"Take Dolo 650 after food at 2 PM daily"</li>
//                   <li>"Add vitamins every day at morning"</li>
//                 </ul>
//               </div>
              
//               <div className="voice-category">
//                 <h4>Actions</h4>
//                 <ul>
//                   <li>"Edit the last reminder"</li>
//                   <li>"Delete all reminders"</li>
//                   <li>"Activate all" / "Deactivate all"</li>
//                   <li>"Refresh reminders"</li>
//                   <li>"Clear form"</li>
//                 </ul>
//               </div>
//             </div>
            
//             <div className="voice-tips">
//               <p><strong>Tip:</strong> Speak naturally. The system understands patterns like "Medicine name is [name]", "Add [name] at [time]", or complete sentences.</p>
//               <button 
//                 className="close-help-btn"
//                 onClick={() => setShowVoiceHelp(false)}
//               >
//                 Close Help
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Status Message */}
//         {status && (
//           <div className="status-message">
//             {status}
//             <button 
//               className="clear-status-btn"
//               onClick={() => setStatus("")}
//               title="Clear status"
//             >
//               ×
//             </button>
//           </div>
//         )}

//         {/* Add/Edit Form */}
//         <div className="medication-form-section">
//           <h3>{editingReminder ? "Edit Medication" : "Add New Medication"}</h3>
//           <form onSubmit={handleSubmit} className="medication-form">
//             <div className="form-row">
//               <div className="form-group">
//                 <label htmlFor="medicine_name">Medicine Name *</label>
//                 <input
//                   ref={medicineNameRef}
//                   type="text"
//                   id="medicine_name"
//                   name="medicine_name"
//                   value={formData.medicine_name}
//                   onChange={handleInputChange}
//                   placeholder="e.g., Dolo 650"
//                   required
//                   aria-label="Medicine name"
//                 />
//                 <span className="voice-hint">Say "medicine name is [name]" or "name is [name]"</span>
//               </div>

//               <div className="form-group">
//                 <label htmlFor="time_of_day">Time of Day *</label>
//                 <input
//                   ref={timeOfDayRef}
//                   type="time"
//                   id="time_of_day"
//                   name="time_of_day"
//                   value={formData.time_of_day}
//                   onChange={handleInputChange}
//                   required
//                   aria-label="Time of day"
//                 />
//                 <span className="voice-hint">Say "time is [time]" or "at [time]" or "set time to [time]"</span>
//               </div>
//             </div>

//             <div className="form-row">
//               <div className="form-group">
//                 <label htmlFor="repeat_frequency">Repeat Frequency *</label>
//                 <select
//                   ref={repeatFrequencyRef}
//                   id="repeat_frequency"
//                   name="repeat_frequency"
//                   value={formData.repeat_frequency}
//                   onChange={handleInputChange}
//                   required
//                   aria-label="Repeat frequency"
//                 >
//                   <option value="daily">Daily</option>
//                   <option value="weekly">Weekly</option>
//                   <option value="monthly">Monthly</option>
//                 </select>
//                 <span className="voice-hint">Say "daily", "weekly", or "monthly"</span>
//               </div>

//               <div className="form-group">
//                 <label htmlFor="duration_days">Duration (Days)</label>
//                 <input
//                   ref={durationDaysRef}
//                   type="number"
//                   id="duration_days"
//                   name="duration_days"
//                   value={formData.duration_days}
//                   onChange={handleInputChange}
//                   min="1"
//                   max="365"
//                   aria-label="Duration in days"
//                 />
//                 <span className="voice-hint">Say "for [number] days"</span>
//               </div>
//             </div>

//             <div className="form-group">
//               <label htmlFor="dosage_info">Dosage Information</label>
//               <input
//                 ref={dosageInfoRef}
//                 type="text"
//                 id="dosage_info"
//                 name="dosage_info"
//                 value={formData.dosage_info}
//                 onChange={handleInputChange}
//                 placeholder="e.g., 1 tablet after food"
//                 aria-label="Dosage information"
//               />
//               <span className="voice-hint">Say "take [dosage]" or "[number] tablets"</span>
//             </div>

//             <div className="form-actions">
//               <button 
//                 type="submit" 
//                 className="submit-btn"
//                 disabled={loading}
//                 aria-label={editingReminder ? "Update reminder" : "Add reminder"}
//               >
//                 {loading ? "Saving..." : (editingReminder ? "Update Reminder" : "Add Reminder")}
//               </button>
              
//               {editingReminder && (
//                 <button 
//                   type="button" 
//                   className="cancel-btn"
//                   onClick={cancelEditing}
//                   aria-label="Cancel editing"
//                 >
//                   Cancel
//                 </button>
//               )}
//             </div>
//           </form>
//         </div>

//         {/* Reminders List */}
//         <div className="reminders-list-section">
//           <div className="section-header">
//             <h3>Your Medication Reminders ({reminders.length})</h3>
//             <button 
//               className="refresh-btn"
//               onClick={fetchReminders}
//               aria-label="Refresh reminders"
//             >
//               ⟳ Refresh
//             </button>
//           </div>
          
//           {loading && reminders.length === 0 ? (
//             <div className="loading">Loading reminders...</div>
//           ) : reminders.length === 0 ? (
//             <div className="empty-state">
//               <p>No medication reminders yet. Add your first reminder above.</p>
//             </div>
//           ) : (
//             <div className="reminders-grid">
//               {reminders.map(reminder => (
//                 <div key={reminder.id} className={`reminder-card ${reminder.active ? 'active' : 'inactive'}`}>
//                   <div className="reminder-header">
//                     <h4>{reminder.medicine_name}</h4>
//                     <span className={`status-badge ${reminder.active ? 'active' : 'inactive'}`}>
//                       {reminder.active ? 'Active' : 'Inactive'}
//                     </span>
//                   </div>
                  
//                   <div className="reminder-details">
//                     <div className="detail-item">
//                       <span className="label">Time:</span>
//                       <span className="value">{formatTime(reminder.time_of_day)}</span>
//                     </div>
                    
//                     <div className="detail-item">
//                       <span className="label">Frequency:</span>
//                       <span className="value">{reminder.repeat_frequency}</span>
//                     </div>
                    
//                     {reminder.dosage_info && (
//                       <div className="detail-item">
//                         <span className="label">Dosage:</span>
//                         <span className="value">{reminder.dosage_info}</span>
//                       </div>
//                     )}
                    
//                     <div className="detail-item">
//                       <span className="label">Duration:</span>
//                       <span className="value">{reminder.duration_days} days</span>
//                     </div>
//                   </div>

//                   <div className="reminder-actions">
//                     <button 
//                       className="edit-btn"
//                       onClick={() => startEditing(reminder)}
//                       aria-label={`Edit ${reminder.medicine_name}`}
//                     >
//                       Edit
//                     </button>
                    
//                     <button 
//                       className={`toggle-btn ${reminder.active ? 'deactivate' : 'activate'}`}
//                       onClick={() => toggleReminderStatus(reminder)}
//                       aria-label={reminder.active ? `Deactivate ${reminder.medicine_name}` : `Activate ${reminder.medicine_name}`}
//                     >
//                       {reminder.active ? 'Deactivate' : 'Activate'}
//                     </button>
                    
//                     <button 
//                       className="delete-btn"
//                       onClick={() => deleteReminder(reminder.id, reminder.medicine_name)}
//                       aria-label={`Delete ${reminder.medicine_name}`}
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Status Bar */}
//       <div className="status-bar">
//         <div className="status-content">
//           <p>{status || (voiceService.isListening ? "Listening for commands..." : "Click microphone icon to start voice commands")}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MedicationReminder;


import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./MedicationReminder.css";
import { voiceService } from "../../services/voiceService";
import { 
  initializeMedicationCommands, 
  stopMedicationCommands 
} from "../../voice-commands/medicationVoiceCommands";

const MedicationReminder = () => {
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [editingReminder, setEditingReminder] = useState(null);
  const [showVoiceHelp, setShowVoiceHelp] = useState(false);
  const navigate = useNavigate();
  
  // Refs for form inputs
  const medicineNameRef = useRef(null);
  const timeOfDayRef = useRef(null);
  const repeatFrequencyRef = useRef(null);
  const dosageInfoRef = useRef(null);
  const durationDaysRef = useRef(null);
  
  // Form state
  const [formData, setFormData] = useState({
    medicine_name: "",
    time_of_day: "",
    repeat_frequency: "daily",
    dosage_info: "",
    duration_days: 30
  });

  // Helper speak function
  const speak = (text) => {
    voiceService.speak(text);
  };

  // Fetch all reminders
  const fetchReminders = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://127.0.0.1:8000/api/medication-reminders/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setReminders(response.data);
      setStatus(`Loaded ${response.data.length} medication reminders`);
      speak(`Loaded ${response.data.length} medication reminders`);
    } catch (error) {
      console.error("Error fetching reminders:", error);
      setStatus("Error loading medication reminders");
      speak("Error loading medication reminders");
    } finally {
      setLoading(false);
    }
  };

  // Initialize component
  useEffect(() => {
    fetchReminders();
    
    // Auto-announce on load
    setTimeout(() => {
      speak("Medication reminder page loaded. Say 'help' for voice commands or 'add medication' to start.");
    }, 1000);

    return () => {
      // Cleanup speech if any
      window.speechSynthesis?.cancel();
    };
  }, []);

  // Initialize voice commands - FIXED: Added dependencies and cleanup
  useEffect(() => {
    // Check if voice service is available
    if (!voiceService.isAvailable()) {
      setStatus("Voice recognition is not supported in your browser.");
      return;
    }

    // Set up voice commands after a brief delay to ensure component is ready
    const setupVoiceCommands = () => {
      // Stop any existing listening first
      if (voiceService.isListening) {
        voiceService.stopListening();
      }

      // Create handlers object with all necessary functions
      const handlers = {
        handleBackToDashboard: () => {
          navigate("/dashboard");
          speak("Going back to dashboard");
        },
        handleLogout,
        navigate,
        setStatus: (message) => {
          setStatus(message);
          console.log("Status set:", message);
        },
        speak,
        setFormData,
        formData,
        editingReminder,
        handleSubmit: (e) => {
          if (e) e.preventDefault();
          if (editingReminder) {
            updateReminder();
          } else {
            createReminder();
          }
        },
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
      };

      // Initialize medication-specific commands
      initializeMedicationCommands(handlers);
    };

    // Delay setup to ensure component is fully mounted
    const timer = setTimeout(setupVoiceCommands, 500);

    return () => {
      clearTimeout(timer);
      stopMedicationCommands();
    };
  }, [formData, editingReminder, reminders, navigate]);

  // Toggle voice recognition
  const toggleVoiceRecognition = () => {
    if (voiceService.isListening) {
      voiceService.stopListening();
      setStatus("Voice recognition stopped.");
      speak("Voice recognition stopped.");
    } else {
      try {
        voiceService.startListening();
        setStatus("Voice recognition started. Try saying 'help' for commands.");
        speak("Voice recognition started. Say 'help' for available commands.");
      } catch (error) {
        console.error("Error starting voice recognition:", error);
        setStatus("Error starting voice recognition. Please try again.");
        speak("Error starting voice recognition. Please try again.");
      }
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Validate form
  const validateForm = () => {
    if (!formData.medicine_name.trim()) {
      setStatus("Please enter medicine name");
      speak("Please enter medicine name");
      return false;
    }
    if (!formData.time_of_day) {
      setStatus("Please select time of day");
      speak("Please select time of day");
      return false;
    }
    return true;
  };

  // Create new reminder
  const createReminder = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      
      const payload = {
        medicine_name: formData.medicine_name,
        time_of_day: formData.time_of_day,
        repeat_frequency: formData.repeat_frequency,
        dosage_info: formData.dosage_info,
        duration_days: parseInt(formData.duration_days)
      };

      const response = await axios.post(
        "http://127.0.0.1:8000/api/medication-reminders/",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setReminders(prev => [...prev, response.data]);
      setStatus(`Medication reminder for ${formData.medicine_name} created successfully!`);
      speak(`Medication reminder for ${formData.medicine_name} created successfully`);
      
      // Reset form
      setFormData({
        medicine_name: "",
        time_of_day: "",
        repeat_frequency: "daily",
        dosage_info: "",
        duration_days: 30
      });
      
      // Refresh the list
      fetchReminders();
    } catch (error) {
      console.error("Error creating reminder:", error);
      let errorMessage = "Error creating medication reminder";
      if (error.response?.data) {
        errorMessage = Object.values(error.response.data).flat().join(", ");
      }
      setStatus(errorMessage);
      speak("Error creating medication reminder");
    } finally {
      setLoading(false);
    }
  };

  // Update reminder
  const updateReminder = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      
      const payload = {
        medicine_name: formData.medicine_name,
        time_of_day: formData.time_of_day,
        repeat_frequency: formData.repeat_frequency,
        dosage_info: formData.dosage_info,
        duration_days: parseInt(formData.duration_days)
      };

      const response = await axios.put(
        `http://127.0.0.1:8000/api/medication-reminders/${editingReminder.id}/`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setReminders(prev => 
        prev.map(reminder => 
          reminder.id === editingReminder.id ? response.data : reminder
        )
      );
      
      setStatus(`Medication reminder for ${formData.medicine_name} updated successfully!`);
      speak(`Medication reminder for ${formData.medicine_name} updated successfully`);
      
      // Reset editing state
      setEditingReminder(null);
      setFormData({
        medicine_name: "",
        time_of_day: "",
        repeat_frequency: "daily",
        dosage_info: "",
        duration_days: 30
      });
    } catch (error) {
      console.error("Error updating reminder:", error);
      let errorMessage = "Error updating medication reminder";
      if (error.response?.data) {
        errorMessage = Object.values(error.response.data).flat().join(", ");
      }
      setStatus(errorMessage);
      speak("Error updating medication reminder");
    } finally {
      setLoading(false);
    }
  };

  // Delete reminder
  const deleteReminder = async (id, medicineName) => {
    if (!window.confirm(`Are you sure you want to delete the reminder for ${medicineName}?`)) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://127.0.0.1:8000/api/medication-reminders/${id}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setReminders(prev => prev.filter(reminder => reminder.id !== id));
      setStatus(`Medication reminder for ${medicineName} deleted successfully`);
      speak(`Medication reminder for ${medicineName} deleted successfully`);
      
      // Refresh the list
      fetchReminders();
    } catch (error) {
      console.error("Error deleting reminder:", error);
      setStatus("Error deleting medication reminder");
      speak("Error deleting medication reminder");
    }
  };

  // Toggle reminder active status
  const toggleReminderStatus = async (reminder) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        `http://127.0.0.1:8000/api/medication-reminders/${reminder.id}/`,
        { active: !reminder.active },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setReminders(prev => 
        prev.map(r => r.id === reminder.id ? response.data : r)
      );
      
      const action = response.data.active ? "activated" : "deactivated";
      setStatus(`Medication reminder ${action} successfully`);
      speak(`Medication reminder for ${reminder.medicine_name} ${action}`);
    } catch (error) {
      console.error("Error toggling reminder status:", error);
      setStatus("Error updating reminder status");
      speak("Error updating reminder status");
    }
  };

  // Start editing a reminder
  const startEditing = (reminder) => {
    setEditingReminder(reminder);
    setFormData({
      medicine_name: reminder.medicine_name,
      time_of_day: reminder.time_of_day,
      repeat_frequency: reminder.repeat_frequency,
      dosage_info: reminder.dosage_info || "",
      duration_days: reminder.duration_days || 30
    });
    speak(`Editing reminder for ${reminder.medicine_name}. Say 'save medication' to update or 'cancel' to stop.`);
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingReminder(null);
    setFormData({
      medicine_name: "",
      time_of_day: "",
      repeat_frequency: "daily",
      dosage_info: "",
      duration_days: 30
    });
    speak("Cancelled editing");
  };

  // Activate/deactivate all reminders
  const activateAllReminders = async (activate) => {
    try {
      const token = localStorage.getItem("token");
      const promises = reminders.map(reminder =>
        axios.patch(
          `http://127.0.0.1:8000/api/medication-reminders/${reminder.id}/`,
          { active: activate },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )
      );

      await Promise.all(promises);
      const updatedReminders = reminders.map(r => ({ ...r, active: activate }));
      setReminders(updatedReminders);
      
      const action = activate ? "activated" : "deactivated";
      setStatus(`All reminders ${action}`);
      speak(`All reminders ${action}`);
    } catch (error) {
      console.error("Error updating all reminders:", error);
      setStatus("Error updating reminders");
      speak("Error updating reminders");
    }
  };

  // Delete all reminders
  const deleteAllReminders = async () => {
    if (reminders.length === 0) {
      setStatus("No reminders to delete");
      speak("No reminders to delete");
      return;
    }

    if (!window.confirm(`Are you sure you want to delete all ${reminders.length} reminders?`)) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const promises = reminders.map(reminder =>
        axios.delete(
          `http://127.0.0.1:8000/api/medication-reminders/${reminder.id}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
      );

      await Promise.all(promises);
      setReminders([]);
      setStatus("All reminders deleted");
      speak("All reminders deleted");
    } catch (error) {
      console.error("Error deleting all reminders:", error);
      setStatus("Error deleting reminders");
      speak("Error deleting reminders");
    }
  };

  // Handle logout
  const handleLogout = async () => {
    setStatus("Logging out...");
    speak("Logging out...");

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
      // Stop voice service before clearing storage
      voiceService.stopListening();
      localStorage.clear();
      setTimeout(() => navigate("/"), 1500);
    }
  };

  // Handle back to dashboard
  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };

  // Handle form submission
  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (editingReminder) {
      updateReminder();
    } else {
      createReminder();
    }
  };

  // Format time for display
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

  return (
    <div className="medication-reminder-container">
      {/* Fixed Header */}
      <header className="dashboard-header fixed-header">
        <div className="header-content">
          <div className="header-left">
            <button className="back-btn" onClick={handleBackToDashboard}>
              ← Back to Dashboard
            </button>
            <h1 className="logo">Vision Assist</h1>
          </div>
          <div className="user-menu">
            {/* Voice button */}
            <button 
              className={`voice-btn ${voiceService.isListening ? 'listening' : ''}`}
              onClick={toggleVoiceRecognition}
              title={voiceService.isListening ? "Stop listening" : "Start voice commands"}
            >
              {voiceService.isListening ? "🎤 Listening..." : "🎤 Voice"}
            </button>
            
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="medication-content">
        <div className="medication-header">
          <h2>💊 Medication Reminder</h2>
          <p>Manage your medication schedule and reminders</p>
          
          {/* Simple voice status indicator */}
          {voiceService.isListening && (
            <div className="voice-status-indicator">
              <span className="listening-pulse"></span>
              <span>Listening for voice commands...</span>
            </div>
          )}
        </div>

        {/* Voice Commands Help Toggle */}
        <div className="voice-help-toggle">
          <button 
            className="voice-help-btn"
            onClick={() => setShowVoiceHelp(!showVoiceHelp)}
          >
            {showVoiceHelp ? "Hide Voice Help" : "Show Voice Commands"}
          </button>
        </div>

        {/* Voice Commands Help Panel */}
        {showVoiceHelp && (
          <div className="voice-help-panel">
            <h3>🎤 Voice Commands Guide</h3>
            <div className="voice-commands-grid">
              <div className="voice-category">
                <h4>Simple Commands</h4>
                <ul>
                  <li>"Add medication" - Start new</li>
                  <li>"Save medication" - Save form</li>
                  <li>"List reminders" - Show all</li>
                  <li>"Logout" - Sign out</li>
                  <li>"Help" - Show this guide</li>
                </ul>
              </div>
              
              <div className="voice-category">
                <h4>Natural Language</h4>
                <ul>
                  <li>"Add Dolo daily at 8 AM"</li>
                  <li>"Medicine name is Aspirin"</li>
                  <li>"Name is Paracetamol"</li>
                  <li>"Dolo for 20 days daily 7 AM"</li>
                  <li>"Take 1 tablet at 9 PM"</li>
                </ul>
              </div>
              
              <div className="voice-category">
                <h4>Complete Sentences</h4>
                <ul>
                  <li>"Medicine name is Dolo time is 8 AM daily for 10 days"</li>
                  <li>"Name is Aspirin at 9 PM weekly for 15 days"</li>
                  <li>"Take Dolo 650 after food at 2 PM daily"</li>
                  <li>"Add vitamins every day at morning"</li>
                </ul>
              </div>
              
              <div className="voice-category">
                <h4>Actions</h4>
                <ul>
                  <li>"Edit the last reminder"</li>
                  <li>"Delete all reminders"</li>
                  <li>"Activate all" / "Deactivate all"</li>
                  <li>"Refresh reminders"</li>
                  <li>"Clear form"</li>
                </ul>
              </div>
            </div>
            
            <div className="voice-tips">
              <p><strong>Tip:</strong> Speak naturally. The system understands patterns like "Medicine name is [name]", "Add [name] at [time]", or complete sentences.</p>
              <button 
                className="close-help-btn"
                onClick={() => setShowVoiceHelp(false)}
              >
                Close Help
              </button>
            </div>
          </div>
        )}

        {/* Status Message */}
        {status && (
          <div className="status-message">
            {status}
            <button 
              className="clear-status-btn"
              onClick={() => setStatus("")}
              title="Clear status"
            >
              ×
            </button>
          </div>
        )}

        {/* Add/Edit Form */}
        <div className="medication-form-section">
          <h3>{editingReminder ? "Edit Medication" : "Add New Medication"}</h3>
          <form onSubmit={handleSubmit} className="medication-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="medicine_name">Medicine Name *</label>
                <input
                  ref={medicineNameRef}
                  type="text"
                  id="medicine_name"
                  name="medicine_name"
                  value={formData.medicine_name}
                  onChange={handleInputChange}
                  placeholder="e.g., Dolo 650"
                  required
                  aria-label="Medicine name"
                />
                <span className="voice-hint">Say "medicine name is [name]" or "name is [name]"</span>
              </div>

              <div className="form-group">
                <label htmlFor="time_of_day">Time of Day *</label>
                <input
                  ref={timeOfDayRef}
                  type="time"
                  id="time_of_day"
                  name="time_of_day"
                  value={formData.time_of_day}
                  onChange={handleInputChange}
                  required
                  aria-label="Time of day"
                />
                <span className="voice-hint">Say "time is [time]" or "at [time]" or "set time to [time]"</span>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="repeat_frequency">Repeat Frequency *</label>
                <select
                  ref={repeatFrequencyRef}
                  id="repeat_frequency"
                  name="repeat_frequency"
                  value={formData.repeat_frequency}
                  onChange={handleInputChange}
                  required
                  aria-label="Repeat frequency"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
                <span className="voice-hint">Say "daily", "weekly", or "monthly"</span>
              </div>

              <div className="form-group">
                <label htmlFor="duration_days">Duration (Days)</label>
                <input
                  ref={durationDaysRef}
                  type="number"
                  id="duration_days"
                  name="duration_days"
                  value={formData.duration_days}
                  onChange={handleInputChange}
                  min="1"
                  max="365"
                  aria-label="Duration in days"
                />
                <span className="voice-hint">Say "for [number] days"</span>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="dosage_info">Dosage Information</label>
              <input
                ref={dosageInfoRef}
                type="text"
                id="dosage_info"
                name="dosage_info"
                value={formData.dosage_info}
                onChange={handleInputChange}
                placeholder="e.g., 1 tablet after food"
                aria-label="Dosage information"
              />
              <span className="voice-hint">Say "take [dosage]" or "[number] tablets"</span>
            </div>

            <div className="form-actions">
              <button 
                type="submit" 
                className="submit-btn"
                disabled={loading}
                aria-label={editingReminder ? "Update reminder" : "Add reminder"}
              >
                {loading ? "Saving..." : (editingReminder ? "Update Reminder" : "Add Reminder")}
              </button>
              
              {editingReminder && (
                <button 
                  type="button" 
                  className="cancel-btn"
                  onClick={cancelEditing}
                  aria-label="Cancel editing"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Reminders List */}
        <div className="reminders-list-section">
          <div className="section-header">
            <h3>Your Medication Reminders ({reminders.length})</h3>
            <button 
              className="refresh-btn"
              onClick={fetchReminders}
              aria-label="Refresh reminders"
            >
              ⟳ Refresh
            </button>
          </div>
          
          {loading && reminders.length === 0 ? (
            <div className="loading">Loading reminders...</div>
          ) : reminders.length === 0 ? (
            <div className="empty-state">
              <p>No medication reminders yet. Add your first reminder above.</p>
            </div>
          ) : (
            <div className="reminders-grid">
              {reminders.map(reminder => (
                <div key={reminder.id} className={`reminder-card ${reminder.active ? 'active' : 'inactive'}`}>
                  <div className="reminder-header">
                    <h4>{reminder.medicine_name}</h4>
                    <span className={`status-badge ${reminder.active ? 'active' : 'inactive'}`}>
                      {reminder.active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  
                  <div className="reminder-details">
                    <div className="detail-item">
                      <span className="label">Time:</span>
                      <span className="value">{formatTime(reminder.time_of_day)}</span>
                    </div>
                    
                    <div className="detail-item">
                      <span className="label">Frequency:</span>
                      <span className="value">{reminder.repeat_frequency}</span>
                    </div>
                    
                    {reminder.dosage_info && (
                      <div className="detail-item">
                        <span className="label">Dosage:</span>
                        <span className="value">{reminder.dosage_info}</span>
                      </div>
                    )}
                    
                    <div className="detail-item">
                      <span className="label">Duration:</span>
                      <span className="value">{reminder.duration_days} days</span>
                    </div>
                  </div>

                  <div className="reminder-actions">
                    <button 
                      className="edit-btn"
                      onClick={() => startEditing(reminder)}
                      aria-label={`Edit ${reminder.medicine_name}`}
                    >
                      Edit
                    </button>
                    
                    <button 
                      className={`toggle-btn ${reminder.active ? 'deactivate' : 'activate'}`}
                      onClick={() => toggleReminderStatus(reminder)}
                      aria-label={reminder.active ? `Deactivate ${reminder.medicine_name}` : `Activate ${reminder.medicine_name}`}
                    >
                      {reminder.active ? 'Deactivate' : 'Activate'}
                    </button>
                    
                    <button 
                      className="delete-btn"
                      onClick={() => deleteReminder(reminder.id, reminder.medicine_name)}
                      aria-label={`Delete ${reminder.medicine_name}`}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Status Bar */}
      <div className="status-bar">
        <div className="status-content">
          <p>{status || (voiceService.isListening ? "Listening for commands..." : "Click microphone icon to start voice commands")}</p>
        </div>
      </div>
    </div>
  );
};

export default MedicationReminder;