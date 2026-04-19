


// // src/pages/Profile/ProfileUpdate.jsx
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { get, patch } from "../../services/api";
// import "./ProfileUpdate.css";

// function speak(text) {
//   if ("speechSynthesis" in window) {
//     window.speechSynthesis.cancel();
//     const utter = new SpeechSynthesisUtterance(text);
//     utter.rate = 0.8;
//     window.speechSynthesis.speak(utter);
//   }
// }

// export default function ProfileUpdate() {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
  
//   // Combined state for all user data
//   const [profile, setProfile] = useState({
//     // From VoiceUserProfile (auth/voice-profile/)
//     greeting_name: "",
//     voice_phone_number: "",
    
//     // From User model (via /api/profile/)
//     first_name: "",
//     last_name: "",
//     email: "",
//     username: "",
    
//     // From UserProfile (via /api/profile/)
//     phone_number: "",
//     emergency_contact: "",
//     emergency_emails: "",
//     emergency_contact_phone: "",
//     language_preference: "en",
    
//     // Voice summary data
//     medication_reminders: 0,
//     voice_notes: 0,
//   });
  
//   const [avatarFile, setAvatarFile] = useState(null);
//   const [avatarPreview, setAvatarPreview] = useState(null);

//   useEffect(() => {
//     async function fetchProfile() {
//       try {
//         setLoading(true);
//         const token = localStorage.getItem("token");
//         if (!token) {
//           navigate("/");
//           return;
//         }

//         // Fetch data from both endpoints
//         const [profileRes, voiceProfileRes] = await Promise.allSettled([
//           get("/api/profile/"),
//           get("/auth/voice-profile/")
//         ]);

//         console.log("API Responses:", {
//           profile: profileRes.status === 'fulfilled' ? profileRes.value.data : null,
//           voiceProfile: voiceProfileRes.status === 'fulfilled' ? voiceProfileRes.value.data : null
//         });

//         let combinedProfile = {
//           greeting_name: "",
//           voice_phone_number: "",
//           first_name: "",
//           last_name: "",
//           email: "",
//           username: "",
//           phone_number: "",
//           emergency_contact: "",
//           emergency_emails: "",
//           emergency_contact_phone: "",
//           language_preference: "en",
//           medication_reminders: 0,
//           voice_notes: 0,
//         };

//         // Process profile data from /api/profile/
//         if (profileRes.status === 'fulfilled') {
//           const profileData = profileRes.value.data;
//           const userInfo = profileData.user || {};
          
//           combinedProfile = {
//             ...combinedProfile,
//             first_name: userInfo.first_name || "",
//             last_name: userInfo.last_name || "",
//             email: userInfo.email || "",
//             username: userInfo.username || "",
//             phone_number: profileData.phone_number || "",
//             emergency_contact: profileData.emergency_contact || "",
//             emergency_emails: profileData.emergency_emails || "",
//             emergency_contact_phone: profileData.emergency_contact_phone || "",
//             language_preference: profileData.language_preference || "en",
//           };
//         }

//         // Process voice profile data from /auth/voice-profile/
//         if (voiceProfileRes.status === 'fulfilled') {
//           const voiceData = voiceProfileRes.value.data;
          
//           combinedProfile = {
//             ...combinedProfile,
//             greeting_name: voiceData.greeting_name || "",
//             voice_phone_number: voiceData.phone_number || "",
//             medication_reminders: voiceData.summary?.medication_reminders || 0,
//             voice_notes: voiceData.summary?.voice_notes || 0,
//           };
//         }

//         // Get data from localStorage as fallback
//         const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
        
//         setProfile({
//           ...combinedProfile,
//           // Use localStorage as fallback if API didn't return these
//           greeting_name: combinedProfile.greeting_name || storedUser.greeting_name || storedUser.name || "",
//           username: combinedProfile.username || storedUser.username || "",
//           email: combinedProfile.email || storedUser.email || "",
//         });

//         speak("Profile loaded successfully");
//       } catch (err) {
//         console.error("fetchProfile error:", err);
//         setError("Failed to load profile. Please try again.");
//         speak("Failed to load profile");
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchProfile();
//   }, [navigate]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProfile((p) => ({ ...p, [name]: value }));
//     setError("");
//   };

//   const handleTextAreaChange = (e) => {
//     const { name, value } = e.target;
//     setProfile((p) => ({ ...p, [name]: value }));
//   };

//   const handleFile = (e) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       if (file.size > 2 * 1024 * 1024) {
//         setError("File size must be less than 2MB");
//         return;
//       }
      
//       const validTypes = ["image/jpeg", "image/png", "image/gif"];
//       if (!validTypes.includes(file.type)) {
//         setError("Only JPG, PNG or GIF files are allowed");
//         return;
//       }
      
//       setAvatarFile(file);
//       setError("");
      
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setAvatarPreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSave = async (e) => {
//     e.preventDefault();
//     setSaving(true);
//     setError("");
//     setSuccess("");

//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         navigate("/");
//         return;
//       }

//       // Prepare UserProfile update data
//       const userProfileUpdate = {
//         phone_number: profile.phone_number.trim(),
//         emergency_contact: profile.emergency_contact.trim(),
//         emergency_emails: profile.emergency_emails.trim(),
//         emergency_contact_phone: profile.emergency_contact_phone.trim(),
//         language_preference: profile.language_preference,
//       };

//       console.log("Updating UserProfile:", userProfileUpdate);
      
//       // Update UserProfile (main profile)
//       await patch("/api/profile/", userProfileUpdate);
      
//       // TODO: If you have an endpoint to update VoiceUserProfile (greeting_name, etc.)
//       // You would need to create a separate endpoint for this
//       // For now, we'll show a message about what can't be updated
      
//       // Update localStorage
//       const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
//       const updatedUser = {
//         ...storedUser,
//         name: profile.greeting_name || profile.first_name || storedUser.name,
//         greeting_name: profile.greeting_name || storedUser.greeting_name,
//         phone_number: profile.phone_number || storedUser.phone_number,
//         language_preference: profile.language_preference || storedUser.language_preference,
//       };
//       localStorage.setItem("user", JSON.stringify(updatedUser));

//       setSuccess("Profile updated successfully! (Note: Name changes may require voice re-registration)");
//       speak("Profile updated successfully");
      
//       setTimeout(() => {
//         setSuccess("");
//         navigate("/dashboard");
//       }, 4000);

//     } catch (err) {
//       console.error("saveProfile error:", err);
      
//       let errorMsg = "Failed to update profile. Please try again.";
      
//       if (err.response?.data) {
//         if (typeof err.response.data === 'object') {
//           const errors = [];
//           for (const [field, messages] of Object.entries(err.response.data)) {
//             if (Array.isArray(messages)) {
//               errors.push(`${field}: ${messages.join(', ')}`);
//             }
//           }
//           if (errors.length > 0) {
//             errorMsg = errors.join('. ');
//           }
//         } else if (typeof err.response.data === 'string') {
//           errorMsg = err.response.data;
//         }
//       }
      
//       setError(errorMsg);
//       speak("Failed to update profile");
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleCancel = () => {
//     navigate("/dashboard");
//   };

//   if (loading) {
//     return (
//       <div className="profile-loading">
//         <div className="loading-spinner"></div>
//         <p>Loading profile...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="profile-update-container">
//       <div className="profile-header">
//         <button className="back-button" onClick={handleCancel}>
//           ← Back to Dashboard
//         </button>
//         <h1>Update Profile</h1>
//       </div>

//       <div className="profile-update-info">
//         <div className="info-message">
//           <span className="info-icon">ℹ️</span>
//           <div className="info-content">
//             <strong>Note:</strong> You can update phone number, emergency contacts, and language preference here. 
//             To change your greeting name, you may need to re-register with voice authentication.
//           </div>
//         </div>
//       </div>

//       <div className="profile-card">
//         {error && (
//           <div className="error-message">
//             <span className="error-icon">⚠️</span>
//             {error}
//           </div>
//         )}

//         {success && (
//           <div className="success-message">
//             <span className="success-icon">✅</span>
//             {success}
//           </div>
//         )}

//         <form onSubmit={handleSave} className="profile-form">
//           {/* Avatar Section */}
//           <div className="avatar-section">
//             <div className="avatar-preview">
//               {avatarPreview ? (
//                 <img src={avatarPreview} alt="Profile avatar preview" />
//               ) : (
//                 <div className="avatar-placeholder">
//                   {(profile.greeting_name?.[0] || profile.first_name?.[0] || profile.username?.[0] || "U").toUpperCase()}
//                 </div>
//               )}
//             </div>
//             <div className="avatar-upload">
//               <label className="file-input-label">
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleFile}
//                   className="file-input"
//                   aria-label="Upload profile picture"
//                 />
//                 <span className="upload-button">📷 Change Photo</span>
//               </label>
//               <p className="file-hint">JPG, PNG or GIF, max 2MB</p>
//             </div>
//           </div>

//           {/* Voice User Information */}
//           <div className="section-divider">
//             <h3>Voice Profile Information</h3>
//             <p className="section-subtitle">Your voice authentication details</p>
//           </div>

//           <div className="form-grid">
//             <div className="form-group">
//               <label htmlFor="greeting_name">
//                 Greeting Name
//                 <span className="readonly-badge">Read-only</span>
//               </label>
//               <input
//                 id="greeting_name"
//                 name="greeting_name"
//                 value={profile.greeting_name}
//                 readOnly
//                 className="readonly-field"
//                 placeholder="Your voice greeting name"
//               />
//               <div className="field-hint">
//                 Used for voice interactions: {profile.greeting_name || "Not set"}
//               </div>
//             </div>

//             <div className="form-group">
//               <label htmlFor="username">
//                 Username
//                 <span className="readonly-badge">Read-only</span>
//               </label>
//               <input
//                 id="username"
//                 name="username"
//                 value={profile.username}
//                 readOnly
//                 className="readonly-field"
//                 placeholder="Username"
//               />
//               <div className="field-hint">
//                 System username: {profile.username}
//               </div>
//             </div>

//             <div className="form-group">
//               <label htmlFor="voice_phone_number">
//                 Voice Registration Phone
//                 <span className="readonly-badge">Read-only</span>
//               </label>
//               <input
//                 id="voice_phone_number"
//                 name="voice_phone_number"
//                 value={profile.voice_phone_number}
//                 readOnly
//                 className="readonly-field"
//                 placeholder="Voice registration phone"
//               />
//               <div className="field-hint">
//                 Used for voice login: {profile.voice_phone_number}
//               </div>
//             </div>

//             <div className="form-group">
//               <label htmlFor="email">
//                 Email
//                 <span className="readonly-badge">Read-only</span>
//               </label>
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 value={profile.email}
//                 readOnly
//                 className="readonly-field"
//                 placeholder="Email address"
//               />
//               <div className="field-hint">
//                 {profile.email || "No email set"}
//               </div>
//             </div>
//           </div>

//           {/* Personal Information (Editable) */}
//           <div className="section-divider">
//             <h3>Personal Information</h3>
//             <p className="section-subtitle">Update your contact details</p>
//           </div>

//           <div className="form-grid">
//             <div className="form-group">
//               <label htmlFor="phone_number">
//                 Phone Number
//                 <span className="editable-badge">Editable</span>
//                 <span className="required-badge">Required</span>
//               </label>
//               <input
//                 id="phone_number"
//                 name="phone_number"
//                 type="tel"
//                 value={profile.phone_number}
//                 onChange={handleChange}
//                 placeholder="+919876543210"
//                 disabled={saving}
//                 required
//               />
//               <div className="field-hint">
//                 {profile.phone_number || "Enter your phone number"}
//               </div>
//             </div>

//             <div className="form-group">
//               <label htmlFor="language_preference">
//                 Language Preference
//                 <span className="editable-badge">Editable</span>
//               </label>
//               <select
//                 id="language_preference"
//                 name="language_preference"
//                 value={profile.language_preference}
//                 onChange={handleChange}
//                 disabled={saving}
//                 className="form-select"
//               >
//                 <option value="en">English</option>
//                 <option value="hi">Hindi</option>
//                 <option value="ta">Tamil</option>
//                 <option value="te">Telugu</option>
//                 <option value="kn">Kannada</option>
//                 <option value="ml">Malayalam</option>
//               </select>
//               <div className="field-hint">
//                 Current: {
//                   {
//                     'en': 'English',
//                     'hi': 'Hindi',
//                     'ta': 'Tamil',
//                     'te': 'Telugu',
//                     'kn': 'Kannada',
//                     'ml': 'Malayalam'
//                   }[profile.language_preference] || 'English'
//                 }
//               </div>
//             </div>

//             <div className="form-group">
//               <label htmlFor="first_name">
//                 First Name
//                 <span className="readonly-badge">Read-only</span>
//               </label>
//               <input
//                 id="first_name"
//                 name="first_name"
//                 value={profile.first_name}
//                 readOnly
//                 className="readonly-field"
//                 placeholder="First name"
//               />
//               <div className="field-hint">
//                 {profile.first_name || "No first name set"}
//               </div>
//             </div>

//             <div className="form-group">
//               <label htmlFor="last_name">
//                 Last Name
//                 <span className="readonly-badge">Read-only</span>
//               </label>
//               <input
//                 id="last_name"
//                 name="last_name"
//                 value={profile.last_name}
//                 readOnly
//                 className="readonly-field"
//                 placeholder="Last name"
//               />
//               <div className="field-hint">
//                 {profile.last_name || "No last name set"}
//               </div>
//             </div>
//           </div>

//           {/* Stats Summary */}
//           <div className="section-divider">
//             <h3>Your Activity Summary</h3>
//           </div>

//           <div className="stats-grid">
//             <div className="stat-card">
//               <div className="stat-icon">💊</div>
//               <div className="stat-content">
//                 <div className="stat-value">{profile.medication_reminders}</div>
//                 <div className="stat-label">Medication Reminders</div>
//               </div>
//             </div>
            
//             <div className="stat-card">
//               <div className="stat-icon">🎙️</div>
//               <div className="stat-content">
//                 <div className="stat-value">{profile.voice_notes}</div>
//                 <div className="stat-label">Voice Notes</div>
//               </div>
//             </div>
//           </div>

//           {/* Emergency Information Section */}
//           <div className="section-divider">
//             <h3>Emergency Contacts</h3>
//             <p className="section-subtitle">Setup emergency contacts for SOS alerts</p>
//           </div>

//           <div className="form-grid">
//             <div className="form-group full-width">
//               <label htmlFor="emergency_contact">
//                 Emergency Contact Name
//                 <span className="editable-badge">Editable</span>
//               </label>
//               <input
//                 id="emergency_contact"
//                 name="emergency_contact"
//                 value={profile.emergency_contact}
//                 onChange={handleChange}
//                 placeholder="Name of your emergency contact"
//                 disabled={saving}
//               />
//               <div className="field-hint">
//                 {profile.emergency_contact || "Not set yet"}
//               </div>
//             </div>

//             <div className="form-group full-width">
//               <label htmlFor="emergency_contact_phone">
//                 Emergency Phone
//                 <span className="editable-badge">Editable</span>
//               </label>
//               <input
//                 id="emergency_contact_phone"
//                 name="emergency_contact_phone"
//                 type="tel"
//                 value={profile.emergency_contact_phone}
//                 onChange={handleChange}
//                 placeholder="+919876543218"
//                 disabled={saving}
//               />
//               <div className="field-hint">
//                 {profile.emergency_contact_phone || "Not set yet"}
//               </div>
//             </div>

//             <div className="form-group full-width">
//               <label htmlFor="emergency_emails">
//                 Emergency Emails (comma-separated)
//                 <span className="editable-badge">Editable</span>
//               </label>
//               <textarea
//                 id="emergency_emails"
//                 name="emergency_emails"
//                 value={profile.emergency_emails}
//                 onChange={handleTextAreaChange}
//                 placeholder="email1@example.com, email2@example.com"
//                 rows="3"
//                 disabled={saving}
//                 className="form-textarea"
//               />
//               <div className="field-hint">
//                 {profile.emergency_emails ? 
//                   `Will notify: ${profile.emergency_emails}` : 
//                   "Not set - Multiple emails should be separated by commas"
//                 }
//               </div>
//             </div>
//           </div>

//           {/* Action Buttons */}
//           <div className="form-actions">
//             <button
//               type="button"
//               className="cancel-button"
//               onClick={handleCancel}
//               disabled={saving}
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="save-button"
//               disabled={saving}
//             >
//               {saving ? (
//                 <>
//                   <span className="saving-spinner"></span>
//                   Saving...
//                 </>
//               ) : (
//                 "Save Changes"
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }



// src/pages/Profile/ProfileUpdate.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { get, patch } from "../../services/api";
import "./ProfileUpdate.css";

function speak(text) {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 0.8;
    window.speechSynthesis.speak(utter);
  }
}

export default function ProfileUpdate() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  // Combined state for all user data
  const [profile, setProfile] = useState({
    // From VoiceUserProfile (auth/voice-profile/)
    greeting_name: "",
    voice_phone_number: "",
    
    // From User model (via /api/profile/)
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    
    // From UserProfile (via /api/profile/)
    phone_number: "",
    emergency_contact: "",
    emergency_emails: "",
    emergency_contact_phone: "",
    language_preference: "en",
    
    // Voice summary data
    medication_reminders: 0,
    voice_notes: 0,
  });
  
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/");
          return;
        }

        // Fetch data from both endpoints
        const [profileRes, voiceProfileRes] = await Promise.allSettled([
          get("/api/profile/"),
          get("/auth/voice-profile/")
        ]);

        console.log("API Responses:", {
          profile: profileRes.status === 'fulfilled' ? profileRes.value.data : null,
          voiceProfile: voiceProfileRes.status === 'fulfilled' ? voiceProfileRes.value.data : null
        });

        let combinedProfile = {
          greeting_name: "",
          voice_phone_number: "",
          first_name: "",
          last_name: "",
          email: "",
          username: "",
          phone_number: "",
          emergency_contact: "",
          emergency_emails: "",
          emergency_contact_phone: "",
          language_preference: "en",
          medication_reminders: 0,
          voice_notes: 0,
        };

        // Process profile data from /api/profile/
        if (profileRes.status === 'fulfilled') {
          const profileData = profileRes.value.data;
          const userInfo = profileData.user || {};
          
          combinedProfile = {
            ...combinedProfile,
            first_name: userInfo.first_name || "",
            last_name: userInfo.last_name || "",
            email: userInfo.email || "",
            username: userInfo.username || "",
            phone_number: profileData.phone_number || "",
            emergency_contact: profileData.emergency_contact || "",
            emergency_emails: profileData.emergency_emails || "",
            emergency_contact_phone: profileData.emergency_contact_phone || "",
            language_preference: profileData.language_preference || "en",
          };
        }

        // Process voice profile data from /auth/voice-profile/
        if (voiceProfileRes.status === 'fulfilled') {
          const voiceData = voiceProfileRes.value.data;
          
          combinedProfile = {
            ...combinedProfile,
            greeting_name: voiceData.greeting_name || "",
            voice_phone_number: voiceData.phone_number || "",
            medication_reminders: voiceData.summary?.medication_reminders || 0,
            voice_notes: voiceData.summary?.voice_notes || 0,
          };
        }

        // Get data from localStorage as fallback
        const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
        
        setProfile({
          ...combinedProfile,
          // Use localStorage as fallback if API didn't return these
          greeting_name: combinedProfile.greeting_name || storedUser.greeting_name || storedUser.name || "",
          username: combinedProfile.username || storedUser.username || "",
          email: combinedProfile.email || storedUser.email || "",
        });

        speak("Profile loaded successfully");
      } catch (err) {
        console.error("fetchProfile error:", err);
        setError("Failed to load profile. Please try again.");
        speak("Failed to load profile");
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((p) => ({ ...p, [name]: value }));
    setError("");
  };

  const handleTextAreaChange = (e) => {
    const { name, value } = e.target;
    setProfile((p) => ({ ...p, [name]: value }));
  };

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setError("File size must be less than 2MB");
        return;
      }
      
      const validTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!validTypes.includes(file.type)) {
        setError("Only JPG, PNG or GIF files are allowed");
        return;
      }
      
      setAvatarFile(file);
      setError("");
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/");
        return;
      }

      // Prepare UserProfile update data
      const userProfileUpdate = {
        phone_number: profile.phone_number.trim(),
        emergency_contact: profile.emergency_contact.trim(),
        emergency_emails: profile.emergency_emails.trim(),
        emergency_contact_phone: profile.emergency_contact_phone.trim(),
        language_preference: profile.language_preference,
      };

      console.log("Updating UserProfile:", userProfileUpdate);
      
      // Update UserProfile (main profile)
      await patch("/api/profile/", userProfileUpdate);
      
      // Update localStorage
      const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
      const updatedUser = {
        ...storedUser,
        name: profile.greeting_name || profile.first_name || storedUser.name,
        greeting_name: profile.greeting_name || storedUser.greeting_name,
        phone_number: profile.phone_number || storedUser.phone_number,
        language_preference: profile.language_preference || storedUser.language_preference,
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      setSuccess("Profile updated successfully! (Note: Name changes may require voice re-registration)");
      speak("Profile updated successfully");
      
      setTimeout(() => {
        setSuccess("");
        navigate("/dashboard");
      }, 4000);

    } catch (err) {
      console.error("saveProfile error:", err);
      
      let errorMsg = "Failed to update profile. Please try again.";
      
      if (err.response?.data) {
        if (typeof err.response.data === 'object') {
          const errors = [];
          for (const [field, messages] of Object.entries(err.response.data)) {
            if (Array.isArray(messages)) {
              errors.push(`${field}: ${messages.join(', ')}`);
            }
          }
          if (errors.length > 0) {
            errorMsg = errors.join('. ');
          }
        } else if (typeof err.response.data === 'string') {
          errorMsg = err.response.data;
        }
      }
      
      setError(errorMsg);
      speak("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    navigate("/dashboard");
  };

  if (loading) {
    return (
      <div className="profile-update-container">
        <div className="profile-loading">
          <div className="loading-spinner"></div>
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-update-container">
      <div className="profile-content">
        {/* Profile Header */}
        <div className="profile-header">
          <button className="back-btn" onClick={handleCancel}>
            ← Back to Dashboard
          </button>
          <h2>Update Profile</h2>
          <p>Manage your personal information and preferences</p>
        </div>

        {/* Info Message */}
        <div className="info-message">
          <span className="info-icon">ℹ️</span>
          <div className="info-content">
            <strong>Note:</strong> You can update phone number, emergency contacts, and language preference here. 
            To change your greeting name, you may need to re-register with voice authentication.
          </div>
        </div>

        {/* Error/Success Messages */}
        {error && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            {error}
          </div>
        )}

        {success && (
          <div className="success-message">
            <span className="success-icon">✅</span>
            {success}
          </div>
        )}

        <div className="profile-sections">
          {/* Avatar Section */}
          <div className="profile-section">
            <h3>Profile Picture</h3>
            <div className="avatar-section">
              <div className="avatar-preview">
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Profile avatar preview" />
                ) : (
                  <div className="avatar-placeholder">
                    {(profile.greeting_name?.[0] || profile.first_name?.[0] || profile.username?.[0] || "U").toUpperCase()}
                  </div>
                )}
              </div>
              <div className="avatar-upload">
                <label className="file-input-label">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFile}
                    className="file-input"
                    aria-label="Upload profile picture"
                  />
                  <span className="upload-btn">📷 Change Photo</span>
                </label>
                <p className="file-hint">JPG, PNG or GIF, max 2MB</p>
              </div>
            </div>
          </div>

          {/* Voice Profile Information */}
          <div className="profile-section">
            <h3>Voice Profile Information</h3>
            <p className="section-subtitle">Your voice authentication details</p>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="greeting_name">Greeting Name</label>
                <div className="readonly-field">
                  {profile.greeting_name || "Not set"}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="username">Username</label>
                <div className="readonly-field">
                  {profile.username}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="voice_phone_number">Voice Registration Phone</label>
                <div className="readonly-field">
                  {profile.voice_phone_number}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <div className="readonly-field">
                  {profile.email || "No email set"}
                </div>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="profile-section">
            <h3>Personal Information</h3>
            <p className="section-subtitle">Update your contact details</p>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="phone_number">Phone Number</label>
                <input
                  id="phone_number"
                  name="phone_number"
                  type="tel"
                  value={profile.phone_number}
                  onChange={handleChange}
                  placeholder="+919876543210"
                  disabled={saving}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="language_preference">Language Preference</label>
                <select
                  id="language_preference"
                  name="language_preference"
                  value={profile.language_preference}
                  onChange={handleChange}
                  disabled={saving}
                  className="form-select"
                >
                  <option value="en">English</option>
                  <option value="hi">Hindi</option>
                  <option value="ta">Tamil</option>
                  <option value="te">Telugu</option>
                  <option value="kn">Kannada</option>
                  <option value="ml">Malayalam</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="first_name">First Name</label>
                <div className="readonly-field">
                  {profile.first_name || "No first name set"}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="last_name">Last Name</label>
                <div className="readonly-field">
                  {profile.last_name || "No last name set"}
                </div>
              </div>
            </div>
          </div>

          {/* Stats Summary */}
          <div className="profile-section">
            <h3>Your Activity Summary</h3>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">💊</div>
                <div className="stat-content">
                  <div className="stat-value">{profile.medication_reminders}</div>
                  <div className="stat-label">Medication Reminders</div>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">🎙️</div>
                <div className="stat-content">
                  <div className="stat-value">{profile.voice_notes}</div>
                  <div className="stat-label">Voice Notes</div>
                </div>
              </div>
            </div>
          </div>

          {/* Emergency Contacts */}
          <div className="profile-section">
            <h3>Emergency Contacts</h3>
            <p className="section-subtitle">Setup emergency contacts for SOS alerts</p>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="emergency_contact">Emergency Contact Name</label>
                <input
                  id="emergency_contact"
                  name="emergency_contact"
                  value={profile.emergency_contact}
                  onChange={handleChange}
                  placeholder="Name of your emergency contact"
                  disabled={saving}
                />
              </div>

              <div className="form-group">
                <label htmlFor="emergency_contact_phone">Emergency Phone</label>
                <input
                  id="emergency_contact_phone"
                  name="emergency_contact_phone"
                  type="tel"
                  value={profile.emergency_contact_phone}
                  onChange={handleChange}
                  placeholder="+919876543218"
                  disabled={saving}
                />
              </div>

              <div className="form-group full-width">
                <label htmlFor="emergency_emails">Emergency Emails (comma-separated)</label>
                <textarea
                  id="emergency_emails"
                  name="emergency_emails"
                  value={profile.emergency_emails}
                  onChange={handleTextAreaChange}
                  placeholder="email1@example.com, email2@example.com"
                  rows="3"
                  disabled={saving}
                  className="form-textarea"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="form-actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={handleCancel}
              disabled={saving}
            >
              Cancel
            </button>
            <button
              type="button"
              className="submit-btn"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? (
                <>
                  <span className="saving-spinner"></span>
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}