// // src/components/SOS/SOSDebug.jsx
// import React, { useState } from "react";
// import { post } from "../../services/api";

// export default function SOSDebug() {
//   const [response, setResponse] = useState(null);
//   const [error, setError] = useState(null);
  
//   const testSOS = async () => {
//     try {
//       const testData = {
//         alert_type: "sos",
//         message: "Test emergency message",
//         location_text: "Test location",
//         location_lat: "12.123456",
//         location_lng: "77.123456",
//         is_active: true,
//       };
      
//       console.log("Testing with data:", testData);
      
//       const res = await post("/api/emergency-alerts/", testData);
//       setResponse(res.data);
//       setError(null);
//       console.log("Success:", res.data);
//     } catch (err) {
//       console.error("Error:", err.response?.data || err.message);
//       setError(err.response?.data || err.message);
//       setResponse(null);
//     }
//   };
  
//   return (
//     <div style={{ padding: 20, background: '#f0f0f0' }}>
//       <h3>Debug SOS Endpoint</h3>
//       <button onClick={testSOS} style={{ padding: 10, margin: 10 }}>
//         Test SOS Endpoint
//       </button>
      
//       {response && (
//         <div style={{ background: '#d4edda', padding: 10, margin: 10, borderRadius: 5 }}>
//           <strong>Success:</strong> {JSON.stringify(response, null, 2)}
//         </div>
//       )}
      
//       {error && (
//         <div style={{ background: '#f8d7da', padding: 10, margin: 10, borderRadius: 5 }}>
//           <strong>Error:</strong> {JSON.stringify(error, null, 2)}
//         </div>
//       )}
//     </div>
//   );
// }