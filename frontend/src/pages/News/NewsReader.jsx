

// // // // // // import React, { useState, useEffect } from "react";
// // // // // // import { useNavigate } from "react-router-dom";
// // // // // // import axios from "axios";
// // // // // // import "./NewsReader.css";

// // // // // // const NewsReader = () => {
// // // // // //   const [news, setNews] = useState([]);
// // // // // //   const [loading, setLoading] = useState(false);
// // // // // //   const [status, setStatus] = useState("Loading latest news...");
// // // // // //   const [currentArticle, setCurrentArticle] = useState(null);
// // // // // //   const [isReading, setIsReading] = useState(false);
// // // // // //   const [speechProgress, setSpeechProgress] = useState(0);
// // // // // //   const [usingRealData, setUsingRealData] = useState(true);
// // // // // //   const navigate = useNavigate();

// // // // // //   // NewsAPI configuration
// // // // // //   const API_KEY = "2cab5e57d08f466d8acef970f683b3ca";
// // // // // //   const BASE_URL = "https://newsapi.org/v2";

// // // // // //   // Demo news data for fallback (only used if API completely fails)
// // // // // //   const demoNews = [
// // // // // //     {
// // // // // //       title: "Latest News Updates Available",
// // // // // //       description: "Real news content will load when the API connection is restored. Please check your internet connection or try again later.",
// // // // // //       content: "We're currently experiencing issues fetching real-time news. Please try refreshing the page or check your internet connection. The system will automatically retry to fetch the latest news from reliable sources.",
// // // // // //       urlToImage: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=400",
// // // // // //       publishedAt: new Date().toISOString(),
// // // // // //       source: { name: "News System" }
// // // // // //     },
// // // // // //     {
// // // // // //       title: "Technology Advances in Artificial Intelligence",
// // // // // //       description: "New breakthroughs in AI are transforming industries and creating new opportunities for innovation across various sectors.",
// // // // // //       content: "Recent developments in artificial intelligence have led to significant improvements in machine learning algorithms. Companies worldwide are adopting AI solutions to enhance productivity and create new services.",
// // // // // //       urlToImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400",
// // // // // //       publishedAt: new Date().toISOString(),
// // // // // //       source: { name: "Tech News" }
// // // // // //     },
// // // // // //     {
// // // // // //       title: "Global Economic Outlook Improves",
// // // // // //       description: "Economic indicators show positive trends as markets respond to new policies and international cooperation.",
// // // // // //       content: "The global economy is showing signs of recovery with improved market performance and increased international trade. Experts predict sustained growth in the coming quarters.",
// // // // // //       urlToImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400",
// // // // // //       publishedAt: new Date().toISOString(),
// // // // // //       source: { name: "Business Daily" }
// // // // // //     },
// // // // // //     {
// // // // // //       title: "Healthcare Innovations Transforming Patient Care",
// // // // // //       description: "New medical technologies and treatments are revolutionizing healthcare delivery and patient outcomes worldwide.",
// // // // // //       content: "Breakthroughs in medical research and digital health technologies are creating new possibilities for disease prevention, diagnosis, and treatment. These innovations are making healthcare more accessible and effective.",
// // // // // //       urlToImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400",
// // // // // //       publishedAt: new Date().toISOString(),
// // // // // //       source: { name: "Health News" }
// // // // // //     },
// // // // // //     {
// // // // // //       title: "Sustainable Energy Solutions Gain Momentum",
// // // // // //       description: "Renewable energy projects and green technologies are accelerating the global transition to sustainable power sources.",
// // // // // //       content: "Countries around the world are investing heavily in renewable energy infrastructure. Solar, wind, and other clean energy sources are becoming more efficient and cost-effective, driving widespread adoption.",
// // // // // //       urlToImage: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=400",
// // // // // //       publishedAt: new Date().toISOString(),
// // // // // //       source: { name: "Environment Today" }
// // // // // //     }
// // // // // //   ];

// // // // // //   // Speech synthesis instance
// // // // // //   const [speechSynth, setSpeechSynth] = useState(null);
// // // // // //   const [utterance, setUtterance] = useState(null);

// // // // // //   // Initialize speech synthesis
// // // // // //   useEffect(() => {
// // // // // //     const synth = window.speechSynthesis;
// // // // // //     setSpeechSynth(synth);
    
// // // // // //     // Cleanup on unmount
// // // // // //     return () => {
// // // // // //       if (synth) {
// // // // // //         synth.cancel();
// // // // // //       }
// // // // // //     };
// // // // // //   }, []);

// // // // // //   // Speak function
// // // // // //   const speak = (text, onEnd = null) => {
// // // // // //     if (!speechSynth) return;

// // // // // //     // Cancel any ongoing speech
// // // // // //     speechSynth.cancel();

// // // // // //     const newUtterance = new SpeechSynthesisUtterance(text);
// // // // // //     newUtterance.rate = 0.8;
// // // // // //     newUtterance.pitch = 1;
// // // // // //     newUtterance.volume = 1;

// // // // // //     newUtterance.onend = () => {
// // // // // //       setIsReading(false);
// // // // // //       setSpeechProgress(0);
// // // // // //       if (onEnd) onEnd();
// // // // // //     };

// // // // // //     newUtterance.onerror = (event) => {
// // // // // //       console.error("Speech synthesis error:", event);
// // // // // //       setIsReading(false);
// // // // // //       setSpeechProgress(0);
// // // // // //       setStatus("Error reading article");
// // // // // //     };

// // // // // //     // Simulate progress for longer texts
// // // // // //     if (text.length > 100) {
// // // // // //       const interval = setInterval(() => {
// // // // // //         setSpeechProgress(prev => {
// // // // // //           if (prev >= 95) {
// // // // // //             clearInterval(interval);
// // // // // //             return 95;
// // // // // //           }
// // // // // //           return prev + 5;
// // // // // //         });
// // // // // //       }, 1000);

// // // // // //       newUtterance.onend = () => {
// // // // // //         clearInterval(interval);
// // // // // //         setSpeechProgress(100);
// // // // // //         setTimeout(() => {
// // // // // //           setIsReading(false);
// // // // // //           setSpeechProgress(0);
// // // // // //           if (onEnd) onEnd();
// // // // // //         }, 500);
// // // // // //       };
// // // // // //     }

// // // // // //     setUtterance(newUtterance);
// // // // // //     speechSynth.speak(newUtterance);
// // // // // //     setIsReading(true);
// // // // // //   };

// // // // // //   // Stop speaking
// // // // // //   const stopSpeaking = () => {
// // // // // //     if (speechSynth) {
// // // // // //       speechSynth.cancel();
// // // // // //       setIsReading(false);
// // // // // //       setSpeechProgress(0);
// // // // // //       setStatus("Reading stopped");
// // // // // //       speak("Reading stopped");
// // // // // //     }
// // // // // //   };

// // // // // //   // Fetch news from NewsAPI
// // // // // //   const fetchNews = async () => {
// // // // // //     setLoading(true);
// // // // // //     setStatus("Loading latest news from around the world...");
    
// // // // // //     try {
// // // // // //       // Try top headlines first
// // // // // //       let url = `${BASE_URL}/top-headlines?country=us&pageSize=20&apiKey=${API_KEY}`;
      
// // // // // //       console.log("Fetching news from:", url);
      
// // // // // //       const response = await axios.get(url);
      
// // // // // //       if (response.data.articles && response.data.articles.length > 0) {
// // // // // //         // Filter out articles without titles or content
// // // // // //         const validArticles = response.data.articles.filter(
// // // // // //           article => article.title && 
// // // // // //                     article.description && 
// // // // // //                     article.title !== "[Removed]" &&
// // // // // //                     !article.title.includes("Removed") &&
// // // // // //                     article.source.name
// // // // // //         );
        
// // // // // //         if (validArticles.length > 0) {
// // // // // //           setNews(validArticles);
// // // // // //           setUsingRealData(true);
// // // // // //           setStatus(`Loaded ${validArticles.length} latest news articles`);
// // // // // //           speak(`Loaded ${validArticles.length} latest news articles`);
// // // // // //           setLoading(false);
// // // // // //           return;
// // // // // //         }
// // // // // //       }
      
// // // // // //       // If no valid articles, try everything endpoint
// // // // // //       await fetchEverythingNews();
      
// // // // // //     } catch (error) {
// // // // // //       console.error("Error fetching news from NewsAPI:", error);
// // // // // //       await fetchEverythingNews();
// // // // // //     }
// // // // // //   };

// // // // // //   // Fallback: Fetch everything news
// // // // // //   const fetchEverythingNews = async () => {
// // // // // //     try {
// // // // // //       const url = `${BASE_URL}/everything?q=news&language=en&sortBy=publishedAt&pageSize=20&apiKey=${API_KEY}`;
      
// // // // // //       const response = await axios.get(url);
      
// // // // // //       if (response.data.articles && response.data.articles.length > 0) {
// // // // // //         const validArticles = response.data.articles.filter(
// // // // // //           article => article.title && 
// // // // // //                     article.description && 
// // // // // //                     article.title !== "[Removed]" &&
// // // // // //                     !article.title.includes("Removed")
// // // // // //         );
        
// // // // // //         if (validArticles.length > 0) {
// // // // // //           setNews(validArticles);
// // // // // //           setUsingRealData(true);
// // // // // //           setStatus(`Loaded ${validArticles.length} news articles`);
// // // // // //           setLoading(false);
// // // // // //           return;
// // // // // //         }
// // // // // //       }
      
// // // // // //       // If still no articles, use demo data
// // // // // //       throw new Error("No articles found from API");
      
// // // // // //     } catch (error) {
// // // // // //       console.error("Error in fallback news fetch:", error);
      
// // // // // //       // Use demo data
// // // // // //       setNews(demoNews);
// // // // // //       setUsingRealData(false);
// // // // // //       setStatus("Using demo data - API may be experiencing issues");
// // // // // //       speak("Using demo news data while we fix the API connection");
// // // // // //       setLoading(false);
// // // // // //     }
// // // // // //   };

// // // // // //   // Read article aloud
// // // // // //   const readArticle = (article) => {
// // // // // //     setCurrentArticle(article);
    
// // // // // //     const content = article.content || article.description;
// // // // // //     const readingText = `
// // // // // //       Title: ${article.title}.
// // // // // //       Description: ${article.description}.
// // // // // //       Content: ${content}
// // // // // //     `;
    
// // // // // //     setStatus(`Reading: ${article.title}`);
// // // // // //     speak(readingText, () => {
// // // // // //       setStatus(`Finished reading: ${article.title}`);
// // // // // //     });
// // // // // //   };

// // // // // //   // Read article summary (just title and description)
// // // // // //   const readArticleSummary = (article) => {
// // // // // //     const summaryText = `Title: ${article.title}. Description: ${article.description}`;
// // // // // //     setStatus(`Reading summary: ${article.title}`);
// // // // // //     speak(summaryText);
// // // // // //   };

// // // // // //   // Format date
// // // // // //   const formatDate = (dateString) => {
// // // // // //     try {
// // // // // //       const date = new Date(dateString);
// // // // // //       const now = new Date();
// // // // // //       const diffMs = now - date;
// // // // // //       const diffMins = Math.floor(diffMs / 60000);
// // // // // //       const diffHours = Math.floor(diffMs / 3600000);
// // // // // //       const diffDays = Math.floor(diffMs / 86400000);

// // // // // //       if (diffMins < 60) {
// // // // // //         return `${diffMins} min ago`;
// // // // // //       } else if (diffHours < 24) {
// // // // // //         return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
// // // // // //       } else {
// // // // // //         return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
// // // // // //       }
// // // // // //     } catch {
// // // // // //       return "Recently";
// // // // // //     }
// // // // // //   };

// // // // // //   // Get default image if article image fails to load
// // // // // //   const getDefaultImage = () => {
// // // // // //     const defaultImages = [
// // // // // //       "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=400", // News
// // // // // //       "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400", // Tech
// // // // // //       "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400", // Business
// // // // // //       "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400", // Health
// // // // // //       "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=400", // Environment
// // // // // //       "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400", // Sports
// // // // // //       "https://images.unsplash.com/photo-1489599809505-7c6f0bd6d35e?w=400" // Entertainment
// // // // // //     ];
// // // // // //     return defaultImages[Math.floor(Math.random() * defaultImages.length)];
// // // // // //   };

// // // // // //   // Initialize
// // // // // //   useEffect(() => {
// // // // // //     fetchNews();
// // // // // //   }, []);

// // // // // //   const handleLogout = async () => {
// // // // // //     stopSpeaking();
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
// // // // // //     stopSpeaking();
// // // // // //     navigate("/dashboard");
// // // // // //   };

// // // // // //   return (
// // // // // //     <div className="news-reader-container">
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
// // // // // //             <button className="logout-btn" onClick={handleLogout}>
// // // // // //               Logout
// // // // // //             </button>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       </header>

// // // // // //       <div className="news-content">
// // // // // //         <div className="news-header">
// // // // // //           <h2>📰 News Reader</h2>
// // // // // //           <p>Stay informed with the latest news from around the world, read aloud for your convenience</p>
// // // // // //         </div>

// // // // // //         {/* Status Message */}
// // // // // //         {status && (
// // // // // //           <div className="status-message">
// // // // // //             {status}
// // // // // //             {!usingRealData && (
// // // // // //               <div className="demo-notice-badge">
// // // // // //                 🔄 Using Demo Data
// // // // // //               </div>
// // // // // //             )}
// // // // // //             {speechProgress > 0 && (
// // // // // //               <div className="speech-progress">
// // // // // //                 <div 
// // // // // //                   className="progress-bar" 
// // // // // //                   style={{ width: `${speechProgress}%` }}
// // // // // //                 ></div>
// // // // // //               </div>
// // // // // //             )}
// // // // // //           </div>
// // // // // //         )}

// // // // // //         {/* Controls */}
// // // // // //         <div className="news-controls">
// // // // // //           <button 
// // // // // //             className="control-btn refresh-btn"
// // // // // //             onClick={() => fetchNews()}
// // // // // //             disabled={loading || isReading}
// // // // // //           >
// // // // // //             🔄 {loading ? "Loading..." : "Refresh News"}
// // // // // //           </button>
          
// // // // // //           {isReading && (
// // // // // //             <button 
// // // // // //               className="control-btn stop-btn"
// // // // // //               onClick={stopSpeaking}
// // // // // //             >
// // // // // //               ⏹️ Stop Reading
// // // // // //             </button>
// // // // // //           )}
// // // // // //         </div>

// // // // // //         {/* News Articles */}
// // // // // //         <div className="news-articles">
// // // // // //           <h3>📋 Latest News from Around the World</h3>
          
// // // // // //           {loading ? (
// // // // // //             <div className="loading-state">
// // // // // //               <div className="loading-spinner"></div>
// // // // // //               <p>Loading latest news articles...</p>
// // // // // //             </div>
// // // // // //           ) : news.length === 0 ? (
// // // // // //             <div className="empty-state">
// // // // // //               <p>No news articles found at the moment.</p>
// // // // // //               <button 
// // // // // //                 className="control-btn refresh-btn"
// // // // // //                 onClick={() => fetchNews()}
// // // // // //                 style={{ marginTop: '1rem' }}
// // // // // //               >
// // // // // //                 🔄 Try Again
// // // // // //               </button>
// // // // // //             </div>
// // // // // //           ) : (
// // // // // //             <div className="articles-grid">
// // // // // //               {news.map((article, index) => (
// // // // // //                 <div key={index} className="article-card">
// // // // // //                   <div className="article-image">
// // // // // //                     <img 
// // // // // //                       src={article.urlToImage || getDefaultImage()} 
// // // // // //                       alt={article.title}
// // // // // //                       onError={(e) => {
// // // // // //                         e.target.src = getDefaultImage();
// // // // // //                       }}
// // // // // //                     />
// // // // // //                     {!usingRealData && <span className="demo-indicator">DEMO</span>}
// // // // // //                   </div>
                  
// // // // // //                   <div className="article-content">
// // // // // //                     <div className="article-header">
// // // // // //                       <span className="article-source">{article.source?.name || "News Source"}</span>
// // // // // //                       <span className="article-time">{formatDate(article.publishedAt)}</span>
// // // // // //                     </div>
                    
// // // // // //                     <h4 className="article-title">{article.title}</h4>
// // // // // //                     <p className="article-description">{article.description}</p>
                    
// // // // // //                     <div className="article-actions">
// // // // // //                       <button 
// // // // // //                         className="action-btn read-summary-btn"
// // // // // //                         onClick={() => readArticleSummary(article)}
// // // // // //                         disabled={isReading}
// // // // // //                       >
// // // // // //                         🎧 Read Summary
// // // // // //                       </button>
                      
// // // // // //                       <button 
// // // // // //                         className="action-btn read-full-btn"
// // // // // //                         onClick={() => readArticle(article)}
// // // // // //                         disabled={isReading}
// // // // // //                       >
// // // // // //                         📖 Read Full Article
// // // // // //                       </button>
// // // // // //                     </div>
// // // // // //                   </div>
// // // // // //                 </div>
// // // // // //               ))}
// // // // // //             </div>
// // // // // //           )}
// // // // // //         </div>

// // // // // //         {/* Currently Reading */}
// // // // // //         {currentArticle && isReading && (
// // // // // //           <div className="currently-reading">
// // // // // //             <h4>🔊 Currently Reading</h4>
// // // // // //             <div className="current-article">
// // // // // //               <h5>{currentArticle.title}</h5>
// // // // // //               <p>{currentArticle.source?.name || "News Source"} • {formatDate(currentArticle.publishedAt)}</p>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         )}

// // // // // //         {/* API Status */}
// // // // // //         <div className="api-status">
// // // // // //           <h4>🔑 News API Status</h4>
// // // // // //           <p>
// // // // // //             <strong>Current Mode:</strong> {usingRealData ? "✅ Real News Data" : "🔄 Demo Data"}
// // // // // //           </p>
// // // // // //           <p>
// // // // // //             <strong>API Source:</strong> NewsAPI.org
// // // // // //           </p>
// // // // // //           <p className="status-note">
// // // // // //             {usingRealData 
// // // // // //               ? "Successfully connected to NewsAPI. Loading real-time news articles from trusted sources."
// // // // // //               : "Using demo data. The NewsAPI may be experiencing temporary issues or rate limits."
// // // // // //             }
// // // // // //           </p>
// // // // // //         </div>
// // // // // //       </div>

// // // // // //       {/* Status Bar */}
// // // // // //       <div className="status-bar">
// // // // // //         <p>{status}</p>
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default NewsReader;


// // // // // import React, { useState, useEffect } from "react";
// // // // // import { useNavigate } from "react-router-dom";
// // // // // import axios from "axios";
// // // // // import { useFeatureVoice } from "../../hooks/useFeatureVoice"; // ✅ ADD THIS
// // // // // import "./NewsReader.css";

// // // // // const NewsReader = () => {
// // // // //   const [news, setNews] = useState([]);
// // // // //   const [loading, setLoading] = useState(false);
// // // // //   const [status, setStatus] = useState("Loading latest news...");
// // // // //   const [currentArticle, setCurrentArticle] = useState(null);
// // // // //   const [isReading, setIsReading] = useState(false);
// // // // //   const [speechProgress, setSpeechProgress] = useState(0);
// // // // //   const [usingRealData, setUsingRealData] = useState(true);
// // // // //   const [currentArticleIndex, setCurrentArticleIndex] = useState(0); // ✅ ADD FOR VOICE NAV
// // // // //   const navigate = useNavigate();

// // // // //   // NewsAPI configuration
// // // // //   const API_KEY = "2cab5e57d08f466d8acef970f683b3ca";
// // // // //   const BASE_URL = "https://newsapi.org/v2";

// // // // //   // Demo news data for fallback (only used if API completely fails)
// // // // //   const demoNews = [
// // // // //     {
// // // // //       title: "Latest News Updates Available",
// // // // //       description: "Real news content will load when the API connection is restored. Please check your internet connection or try again later.",
// // // // //       content: "We're currently experiencing issues fetching real-time news. Please try refreshing the page or check your internet connection. The system will automatically retry to fetch the latest news from reliable sources.",
// // // // //       urlToImage: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=400",
// // // // //       publishedAt: new Date().toISOString(),
// // // // //       source: { name: "News System" }
// // // // //     },
// // // // //     {
// // // // //       title: "Technology Advances in Artificial Intelligence",
// // // // //       description: "New breakthroughs in AI are transforming industries and creating new opportunities for innovation across various sectors.",
// // // // //       content: "Recent developments in artificial intelligence have led to significant improvements in machine learning algorithms. Companies worldwide are adopting AI solutions to enhance productivity and create new services.",
// // // // //       urlToImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400",
// // // // //       publishedAt: new Date().toISOString(),
// // // // //       source: { name: "Tech News" }
// // // // //     },
// // // // //     {
// // // // //       title: "Global Economic Outlook Improves",
// // // // //       description: "Economic indicators show positive trends as markets respond to new policies and international cooperation.",
// // // // //       content: "The global economy is showing signs of recovery with improved market performance and increased international trade. Experts predict sustained growth in the coming quarters.",
// // // // //       urlToImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400",
// // // // //       publishedAt: new Date().toISOString(),
// // // // //       source: { name: "Business Daily" }
// // // // //     },
// // // // //     {
// // // // //       title: "Healthcare Innovations Transforming Patient Care",
// // // // //       description: "New medical technologies and treatments are revolutionizing healthcare delivery and patient outcomes worldwide.",
// // // // //       content: "Breakthroughs in medical research and digital health technologies are creating new possibilities for disease prevention, diagnosis, and treatment. These innovations are making healthcare more accessible and effective.",
// // // // //       urlToImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400",
// // // // //       publishedAt: new Date().toISOString(),
// // // // //       source: { name: "Health News" }
// // // // //     },
// // // // //     {
// // // // //       title: "Sustainable Energy Solutions Gain Momentum",
// // // // //       description: "Renewable energy projects and green technologies are accelerating the global transition to sustainable power sources.",
// // // // //       content: "Countries around the world are investing heavily in renewable energy infrastructure. Solar, wind, and other clean energy sources are becoming more efficient and cost-effective, driving widespread adoption.",
// // // // //       urlToImage: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=400",
// // // // //       publishedAt: new Date().toISOString(),
// // // // //       source: { name: "Environment Today" }
// // // // //     }
// // // // //   ];

// // // // //   // Speech synthesis instance
// // // // //   const [speechSynth, setSpeechSynth] = useState(null);
// // // // //   const [utterance, setUtterance] = useState(null);

// // // // //   // ✅ ADD: Voice commands hook
// // // // //   const { speak: voiceSpeak } = useFeatureVoice('News Reader', {
// // // // //     // Navigation commands
// // // // //     'read news': () => {
// // // // //       if (news.length > 0 && currentArticleIndex < news.length) {
// // // // //         readArticle(news[currentArticleIndex]);
// // // // //         voiceSpeak(`Reading article ${currentArticleIndex + 1}: ${news[currentArticleIndex].title}`);
// // // // //       } else {
// // // // //         voiceSpeak("No articles available. Please refresh the news.");
// // // // //       }
// // // // //     },
// // // // //     'next article': () => {
// // // // //       if (news.length === 0) {
// // // // //         voiceSpeak("No articles loaded yet");
// // // // //         return;
// // // // //       }
// // // // //       const nextIndex = (currentArticleIndex + 1) % news.length;
// // // // //       setCurrentArticleIndex(nextIndex);
// // // // //       voiceSpeak(`Article ${nextIndex + 1}: ${news[nextIndex].title}`);
// // // // //     },
// // // // //     'previous article': () => {
// // // // //       if (news.length === 0) {
// // // // //         voiceSpeak("No articles loaded yet");
// // // // //         return;
// // // // //       }
// // // // //       const prevIndex = currentArticleIndex === 0 ? news.length - 1 : currentArticleIndex - 1;
// // // // //       setCurrentArticleIndex(prevIndex);
// // // // //       voiceSpeak(`Article ${prevIndex + 1}: ${news[prevIndex].title}`);
// // // // //     },
// // // // //     'first article': () => {
// // // // //       if (news.length > 0) {
// // // // //         setCurrentArticleIndex(0);
// // // // //         voiceSpeak(`First article: ${news[0].title}`);
// // // // //       }
// // // // //     },
// // // // //     'last article': () => {
// // // // //       if (news.length > 0) {
// // // // //         setCurrentArticleIndex(news.length - 1);
// // // // //         voiceSpeak(`Last article: ${news[news.length - 1].title}`);
// // // // //       }
// // // // //     },

// // // // //     // Reading controls
// // // // //     'stop reading': () => {
// // // // //       stopSpeaking();
// // // // //       voiceSpeak("Stopped reading");
// // // // //     },
// // // // //     'pause reading': () => {
// // // // //       if (speechSynth && isReading) {
// // // // //         speechSynth.pause();
// // // // //         voiceSpeak("Paused reading");
// // // // //       }
// // // // //     },
// // // // //     'resume reading': () => {
// // // // //       if (speechSynth && speechSynth.paused) {
// // // // //         speechSynth.resume();
// // // // //         voiceSpeak("Resumed reading");
// // // // //       }
// // // // //     },

// // // // //     // News management
// // // // //     'refresh news': () => {
// // // // //       fetchNews();
// // // // //       voiceSpeak("Refreshing news feed");
// // // // //     },
// // // // //     'read summary': () => {
// // // // //       if (news.length > 0 && currentArticleIndex < news.length) {
// // // // //         readArticleSummary(news[currentArticleIndex]);
// // // // //         voiceSpeak("Reading article summary");
// // // // //       }
// // // // //     },
// // // // //     'read headlines': () => {
// // // // //       if (news.length === 0) {
// // // // //         voiceSpeak("No news articles available");
// // // // //         return;
// // // // //       }
      
// // // // //       const headlines = news.slice(0, 5).map((article, idx) => 
// // // // //         `Article ${idx + 1}: ${article.title}`
// // // // //       ).join('. ');
      
// // // // //       voiceSpeak(`Top headlines: ${headlines}`);
// // // // //     },
// // // // //     'current article': () => {
// // // // //       if (news.length > 0 && currentArticleIndex < news.length) {
// // // // //         const article = news[currentArticleIndex];
// // // // //         voiceSpeak(`Current article ${currentArticleIndex + 1} of ${news.length}: ${article.title}`);
// // // // //       } else {
// // // // //         voiceSpeak("No article selected");
// // // // //       }
// // // // //     },

// // // // //     // Information
// // // // //     'news count': () => {
// // // // //       voiceSpeak(`There are ${news.length} news articles loaded`);
// // // // //     },
// // // // //     'news status': () => {
// // // // //       const statusText = usingRealData 
// // // // //         ? "Connected to real news API" 
// // // // //         : "Using demo news data";
// // // // //       voiceSpeak(statusText);
// // // // //     },
// // // // //     'news help': () => {
// // // // //       const helpText = `
// // // // //         Available commands: 
// // // // //         Read news, Next article, Previous article, 
// // // // //         Read summary, Stop reading, Refresh news,
// // // // //         Read headlines, Current article, News count,
// // // // //         First article, Last article, Pause reading, Resume reading.
// // // // //         Say 'help' for this list again.
// // // // //       `;
// // // // //       voiceSpeak(helpText);
// // // // //     },
// // // // //     'what can i say': () => {
// // // // //       voiceSpeak("Try saying: read news, next article, stop reading, or refresh news");
// // // // //     }
// // // // //   });

// // // // //   // Initialize speech synthesis
// // // // //   useEffect(() => {
// // // // //     const synth = window.speechSynthesis;
// // // // //     setSpeechSynth(synth);
    
// // // // //     // Cleanup on unmount
// // // // //     return () => {
// // // // //       if (synth) {
// // // // //         synth.cancel();
// // // // //       }
// // // // //     };
// // // // //   }, []);

// // // // //   // ✅ MODIFIED: Speak function with voice feedback
// // // // //   const speak = (text, onEnd = null) => {
// // // // //     if (!speechSynth) return;

// // // // //     // Cancel any ongoing speech
// // // // //     speechSynth.cancel();

// // // // //     const newUtterance = new SpeechSynthesisUtterance(text);
// // // // //     newUtterance.rate = 0.8;
// // // // //     newUtterance.pitch = 1;
// // // // //     newUtterance.volume = 1;

// // // // //     newUtterance.onend = () => {
// // // // //       setIsReading(false);
// // // // //       setSpeechProgress(0);
// // // // //       if (onEnd) onEnd();
// // // // //     };

// // // // //     newUtterance.onerror = (event) => {
// // // // //       console.error("Speech synthesis error:", event);
// // // // //       setIsReading(false);
// // // // //       setSpeechProgress(0);
// // // // //       setStatus("Error reading article");
// // // // //     };

// // // // //     // Simulate progress for longer texts
// // // // //     if (text.length > 100) {
// // // // //       const interval = setInterval(() => {
// // // // //         setSpeechProgress(prev => {
// // // // //           if (prev >= 95) {
// // // // //             clearInterval(interval);
// // // // //             return 95;
// // // // //           }
// // // // //           return prev + 5;
// // // // //         });
// // // // //       }, 1000);

// // // // //       newUtterance.onend = () => {
// // // // //         clearInterval(interval);
// // // // //         setSpeechProgress(100);
// // // // //         setTimeout(() => {
// // // // //           setIsReading(false);
// // // // //           setSpeechProgress(0);
// // // // //           if (onEnd) onEnd();
// // // // //         }, 500);
// // // // //       };
// // // // //     }

// // // // //     setUtterance(newUtterance);
// // // // //     speechSynth.speak(newUtterance);
// // // // //     setIsReading(true);
// // // // //   };

// // // // //   // ✅ MODIFIED: Stop speaking
// // // // //   const stopSpeaking = () => {
// // // // //     if (speechSynth) {
// // // // //       speechSynth.cancel();
// // // // //       setIsReading(false);
// // // // //       setSpeechProgress(0);
// // // // //       setStatus("Reading stopped");
// // // // //     }
// // // // //   };

// // // // //   // Fetch news from NewsAPI
// // // // //   const fetchNews = async () => {
// // // // //     setLoading(true);
// // // // //     setStatus("Loading latest news from around the world...");
    
// // // // //     try {
// // // // //       // Try top headlines first
// // // // //       let url = `${BASE_URL}/top-headlines?country=us&pageSize=20&apiKey=${API_KEY}`;
      
// // // // //       console.log("Fetching news from:", url);
      
// // // // //       const response = await axios.get(url);
      
// // // // //       if (response.data.articles && response.data.articles.length > 0) {
// // // // //         // Filter out articles without titles or content
// // // // //         const validArticles = response.data.articles.filter(
// // // // //           article => article.title && 
// // // // //                     article.description && 
// // // // //                     article.title !== "[Removed]" &&
// // // // //                     !article.title.includes("Removed") &&
// // // // //                     article.source.name
// // // // //         );
        
// // // // //         if (validArticles.length > 0) {
// // // // //           setNews(validArticles);
// // // // //           setCurrentArticleIndex(0); // Reset to first article
// // // // //           setUsingRealData(true);
// // // // //           setStatus(`Loaded ${validArticles.length} latest news articles`);
// // // // //           speak(`Loaded ${validArticles.length} latest news articles`);
// // // // //           setLoading(false);
// // // // //           return;
// // // // //         }
// // // // //       }
      
// // // // //       // If no valid articles, try everything endpoint
// // // // //       await fetchEverythingNews();
      
// // // // //     } catch (error) {
// // // // //       console.error("Error fetching news from NewsAPI:", error);
// // // // //       await fetchEverythingNews();
// // // // //     }
// // // // //   };

// // // // //   // Fallback: Fetch everything news
// // // // //   const fetchEverythingNews = async () => {
// // // // //     try {
// // // // //       const url = `${BASE_URL}/everything?q=news&language=en&sortBy=publishedAt&pageSize=20&apiKey=${API_KEY}`;
      
// // // // //       const response = await axios.get(url);
      
// // // // //       if (response.data.articles && response.data.articles.length > 0) {
// // // // //         const validArticles = response.data.articles.filter(
// // // // //           article => article.title && 
// // // // //                     article.description && 
// // // // //                     article.title !== "[Removed]" &&
// // // // //                     !article.title.includes("Removed")
// // // // //         );
        
// // // // //         if (validArticles.length > 0) {
// // // // //           setNews(validArticles);
// // // // //           setCurrentArticleIndex(0);
// // // // //           setUsingRealData(true);
// // // // //           setStatus(`Loaded ${validArticles.length} news articles`);
// // // // //           setLoading(false);
// // // // //           return;
// // // // //         }
// // // // //       }
      
// // // // //       // If still no articles, use demo data
// // // // //       throw new Error("No articles found from API");
      
// // // // //     } catch (error) {
// // // // //       console.error("Error in fallback news fetch:", error);
      
// // // // //       // Use demo data
// // // // //       setNews(demoNews);
// // // // //       setCurrentArticleIndex(0);
// // // // //       setUsingRealData(false);
// // // // //       setStatus("Using demo data - API may be experiencing issues");
// // // // //       speak("Using demo news data while we fix the API connection");
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   // Read article aloud
// // // // //   const readArticle = (article) => {
// // // // //     setCurrentArticle(article);
    
// // // // //     const content = article.content || article.description;
// // // // //     const readingText = `
// // // // //       Title: ${article.title}.
// // // // //       Description: ${article.description}.
// // // // //       Content: ${content}
// // // // //     `;
    
// // // // //     setStatus(`Reading: ${article.title}`);
// // // // //     speak(readingText, () => {
// // // // //       setStatus(`Finished reading: ${article.title}`);
// // // // //     });
// // // // //   };

// // // // //   // Read article summary (just title and description)
// // // // //   const readArticleSummary = (article) => {
// // // // //     const summaryText = `Title: ${article.title}. Description: ${article.description}`;
// // // // //     setStatus(`Reading summary: ${article.title}`);
// // // // //     speak(summaryText);
// // // // //   };

// // // // //   // Format date
// // // // //   const formatDate = (dateString) => {
// // // // //     try {
// // // // //       const date = new Date(dateString);
// // // // //       const now = new Date();
// // // // //       const diffMs = now - date;
// // // // //       const diffMins = Math.floor(diffMs / 60000);
// // // // //       const diffHours = Math.floor(diffMs / 3600000);
// // // // //       const diffDays = Math.floor(diffMs / 86400000);

// // // // //       if (diffMins < 60) {
// // // // //         return `${diffMins} min ago`;
// // // // //       } else if (diffHours < 24) {
// // // // //         return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
// // // // //       } else {
// // // // //         return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
// // // // //       }
// // // // //     } catch {
// // // // //       return "Recently";
// // // // //     }
// // // // //   };

// // // // //   // Get default image if article image fails to load
// // // // //   const getDefaultImage = () => {
// // // // //     const defaultImages = [
// // // // //       "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=400", // News
// // // // //       "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400", // Tech
// // // // //       "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400", // Business
// // // // //       "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400", // Health
// // // // //       "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=400", // Environment
// // // // //       "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400", // Sports
// // // // //       "https://images.unsplash.com/photo-1489599809505-7c6f0bd6d35e?w=400" // Entertainment
// // // // //     ];
// // // // //     return defaultImages[Math.floor(Math.random() * defaultImages.length)];
// // // // //   };

// // // // //   // Initialize
// // // // //   useEffect(() => {
// // // // //     fetchNews();
// // // // //   }, []);

// // // // //   const handleLogout = async () => {
// // // // //     stopSpeaking();
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
// // // // //     stopSpeaking();
// // // // //     navigate("/dashboard");
// // // // //   };

// // // // //   // ✅ ADD: Voice command indicator
// // // // //   const VoiceStatus = () => (
// // // // //     <div className="voice-status-indicator">
// // // // //       <span className="voice-icon">🎤</span>
// // // // //       <span className="voice-text">Voice Active: Say "read news", "next article", etc.</span>
// // // // //       <button 
// // // // //         className="voice-help-btn"
// // // // //         onClick={() => voiceSpeak("Available commands: read news, next article, previous article, read summary, stop reading, refresh news, read headlines, current article, news count, first article, last article, pause reading, resume reading")}
// // // // //       >
// // // // //         Voice Help
// // // // //       </button>
// // // // //     </div>
// // // // //   );

// // // // //   return (
// // // // //     <div className="news-reader-container">
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
// // // // //             <button className="logout-btn" onClick={handleLogout}>
// // // // //               Logout
// // // // //             </button>
// // // // //           </div>
// // // // //         </div>
// // // // //       </header>

// // // // //       <div className="news-content">
// // // // //         {/* ✅ ADD: Voice Status Indicator */}
// // // // //         <VoiceStatus />

// // // // //         <div className="news-header">
// // // // //           <h2>📰 News Reader 🎤</h2>
// // // // //           <p>Stay informed with the latest news from around the world, read aloud for your convenience</p>
// // // // //           <p className="voice-instruction">
// // // // //             <strong>Voice Commands Active:</strong> Try saying "read news", "next article", "stop reading", or "refresh news"
// // // // //           </p>
// // // // //         </div>

// // // // //         {/* Status Message */}
// // // // //         {status && (
// // // // //           <div className="status-message">
// // // // //             {status}
// // // // //             {!usingRealData && (
// // // // //               <div className="demo-notice-badge">
// // // // //                 🔄 Using Demo Data
// // // // //               </div>
// // // // //             )}
// // // // //             {speechProgress > 0 && (
// // // // //               <div className="speech-progress">
// // // // //                 <div 
// // // // //                   className="progress-bar" 
// // // // //                   style={{ width: `${speechProgress}%` }}
// // // // //                 ></div>
// // // // //               </div>
// // // // //             )}
// // // // //           </div>
// // // // //         )}

// // // // //         {/* Controls */}
// // // // //         <div className="news-controls">
// // // // //           <button 
// // // // //             className="control-btn refresh-btn"
// // // // //             onClick={() => fetchNews()}
// // // // //             disabled={loading || isReading}
// // // // //           >
// // // // //             🔄 {loading ? "Loading..." : "Refresh News"}
// // // // //           </button>
          
// // // // //           {isReading && (
// // // // //             <button 
// // // // //               className="control-btn stop-btn"
// // // // //               onClick={stopSpeaking}
// // // // //             >
// // // // //               ⏹️ Stop Reading
// // // // //             </button>
// // // // //           )}
          
// // // // //           {/* ✅ ADD: Voice Navigation Controls */}
// // // // //           <div className="voice-nav-controls">
// // // // //             <button 
// // // // //               className="control-btn voice-nav-btn"
// // // // //               onClick={() => {
// // // // //                 if (news.length > 0) {
// // // // //                   const prevIndex = currentArticleIndex === 0 ? news.length - 1 : currentArticleIndex - 1;
// // // // //                   setCurrentArticleIndex(prevIndex);
// // // // //                   voiceSpeak(`Previous article: ${news[prevIndex].title}`);
// // // // //                 }
// // // // //               }}
// // // // //               disabled={news.length === 0}
// // // // //             >
// // // // //               ⏮️ Previous Article
// // // // //             </button>
            
// // // // //             <button 
// // // // //               className="control-btn voice-nav-btn"
// // // // //               onClick={() => {
// // // // //                 if (news.length > 0) {
// // // // //                   readArticle(news[currentArticleIndex]);
// // // // //                 }
// // // // //               }}
// // // // //               disabled={news.length === 0 || isReading}
// // // // //             >
// // // // //               🔊 Read Current
// // // // //             </button>
            
// // // // //             <button 
// // // // //               className="control-btn voice-nav-btn"
// // // // //               onClick={() => {
// // // // //                 if (news.length > 0) {
// // // // //                   const nextIndex = (currentArticleIndex + 1) % news.length;
// // // // //                   setCurrentArticleIndex(nextIndex);
// // // // //                   voiceSpeak(`Next article: ${news[nextIndex].title}`);
// // // // //                 }
// // // // //               }}
// // // // //               disabled={news.length === 0}
// // // // //             >
// // // // //               ⏭️ Next Article
// // // // //             </button>
// // // // //           </div>
// // // // //         </div>

// // // // //         {/* Current Article Indicator */}
// // // // //         {news.length > 0 && (
// // // // //           <div className="current-article-indicator">
// // // // //             <h4>📄 Currently Selected Article</h4>
// // // // //             <div className="selected-article">
// // // // //               <strong>Article {currentArticleIndex + 1} of {news.length}</strong>
// // // // //               <p>{news[currentArticleIndex].title}</p>
// // // // //               <div className="article-meta">
// // // // //                 <span>{news[currentArticleIndex].source?.name || "News Source"}</span>
// // // // //                 <span>•</span>
// // // // //                 <span>{formatDate(news[currentArticleIndex].publishedAt)}</span>
// // // // //               </div>
// // // // //               <div className="selected-article-actions">
// // // // //                 <button 
// // // // //                   className="action-btn read-summary-btn"
// // // // //                   onClick={() => readArticleSummary(news[currentArticleIndex])}
// // // // //                   disabled={isReading}
// // // // //                 >
// // // // //                   🎧 Read Summary
// // // // //                 </button>
// // // // //                 <button 
// // // // //                   className="action-btn read-full-btn"
// // // // //                   onClick={() => readArticle(news[currentArticleIndex])}
// // // // //                   disabled={isReading}
// // // // //                 >
// // // // //                   📖 Read Full Article
// // // // //                 </button>
// // // // //               </div>
// // // // //             </div>
// // // // //           </div>
// // // // //         )}

// // // // //         {/* News Articles */}
// // // // //         <div className="news-articles">
// // // // //           <h3>📋 Latest News from Around the World</h3>
          
// // // // //           {loading ? (
// // // // //             <div className="loading-state">
// // // // //               <div className="loading-spinner"></div>
// // // // //               <p>Loading latest news articles...</p>
// // // // //             </div>
// // // // //           ) : news.length === 0 ? (
// // // // //             <div className="empty-state">
// // // // //               <p>No news articles found at the moment.</p>
// // // // //               <button 
// // // // //                 className="control-btn refresh-btn"
// // // // //                 onClick={() => fetchNews()}
// // // // //                 style={{ marginTop: '1rem' }}
// // // // //               >
// // // // //                 🔄 Try Again
// // // // //               </button>
// // // // //             </div>
// // // // //           ) : (
// // // // //             <div className="articles-grid">
// // // // //               {news.map((article, index) => (
// // // // //                 <div 
// // // // //                   key={index} 
// // // // //                   className={`article-card ${index === currentArticleIndex ? 'selected-article-card' : ''}`}
// // // // //                   onClick={() => setCurrentArticleIndex(index)}
// // // // //                 >
// // // // //                   <div className="article-image">
// // // // //                     <img 
// // // // //                       src={article.urlToImage || getDefaultImage()} 
// // // // //                       alt={article.title}
// // // // //                       onError={(e) => {
// // // // //                         e.target.src = getDefaultImage();
// // // // //                       }}
// // // // //                     />
// // // // //                     {!usingRealData && <span className="demo-indicator">DEMO</span>}
// // // // //                     {index === currentArticleIndex && (
// // // // //                       <span className="current-indicator">🎤 CURRENT</span>
// // // // //                     )}
// // // // //                   </div>
                  
// // // // //                   <div className="article-content">
// // // // //                     <div className="article-header">
// // // // //                       <span className="article-source">{article.source?.name || "News Source"}</span>
// // // // //                       <span className="article-time">{formatDate(article.publishedAt)}</span>
// // // // //                     </div>
                    
// // // // //                     <h4 className="article-title">{article.title}</h4>
// // // // //                     <p className="article-description">{article.description}</p>
                    
// // // // //                     <div className="article-actions">
// // // // //                       <button 
// // // // //                         className="action-btn read-summary-btn"
// // // // //                         onClick={(e) => {
// // // // //                           e.stopPropagation();
// // // // //                           readArticleSummary(article);
// // // // //                         }}
// // // // //                         disabled={isReading}
// // // // //                       >
// // // // //                         🎧 Read Summary
// // // // //                       </button>
                      
// // // // //                       <button 
// // // // //                         className="action-btn read-full-btn"
// // // // //                         onClick={(e) => {
// // // // //                           e.stopPropagation();
// // // // //                           readArticle(article);
// // // // //                         }}
// // // // //                         disabled={isReading}
// // // // //                       >
// // // // //                         📖 Read Full Article
// // // // //                       </button>
// // // // //                     </div>
// // // // //                   </div>
// // // // //                 </div>
// // // // //               ))}
// // // // //             </div>
// // // // //           )}
// // // // //         </div>

// // // // //         {/* Currently Reading */}
// // // // //         {currentArticle && isReading && (
// // // // //           <div className="currently-reading">
// // // // //             <h4>🔊 Currently Reading</h4>
// // // // //             <div className="current-article">
// // // // //               <h5>{currentArticle.title}</h5>
// // // // //               <p>{currentArticle.source?.name || "News Source"} • {formatDate(currentArticle.publishedAt)}</p>
// // // // //             </div>
// // // // //           </div>
// // // // //         )}

// // // // //         {/* API Status */}
// // // // //         <div className="api-status">
// // // // //           <h4>🔑 News API Status</h4>
// // // // //           <p>
// // // // //             <strong>Current Mode:</strong> {usingRealData ? "✅ Real News Data" : "🔄 Demo Data"}
// // // // //           </p>
// // // // //           <p>
// // // // //             <strong>API Source:</strong> NewsAPI.org
// // // // //           </p>
// // // // //           <p className="status-note">
// // // // //             {usingRealData 
// // // // //               ? "Successfully connected to NewsAPI. Loading real-time news articles from trusted sources."
// // // // //               : "Using demo data. The NewsAPI may be experiencing temporary issues or rate limits."
// // // // //             }
// // // // //           </p>
// // // // //         </div>

// // // // //         {/* Voice Commands Help */}
// // // // //         <div className="voice-commands-help">
// // // // //           <h4>🎤 Voice Commands Guide</h4>
// // // // //           <div className="commands-grid">
// // // // //             <div className="command-category">
// // // // //               <h5>Navigation</h5>
// // // // //               <ul>
// // // // //                 <li>"read news" - Read current article</li>
// // // // //                 <li>"next article" - Go to next article</li>
// // // // //                 <li>"previous article" - Go to previous article</li>
// // // // //                 <li>"first article" - Go to first article</li>
// // // // //                 <li>"last article" - Go to last article</li>
// // // // //               </ul>
// // // // //             </div>
// // // // //             <div className="command-category">
// // // // //               <h5>Reading Control</h5>
// // // // //               <ul>
// // // // //                 <li>"stop reading" - Stop current reading</li>
// // // // //                 <li>"pause reading" - Pause reading</li>
// // // // //                 <li>"resume reading" - Resume paused reading</li>
// // // // //                 <li>"read summary" - Read article summary</li>
// // // // //               </ul>
// // // // //             </div>
// // // // //             <div className="command-category">
// // // // //               <h5>Information</h5>
// // // // //               <ul>
// // // // //                 <li>"current article" - Announce current article</li>
// // // // //                 <li>"news count" - Announce number of articles</li>
// // // // //                 <li>"read headlines" - Read all headlines</li>
// // // // //                 <li>"news status" - Check API status</li>
// // // // //                 <li>"news help" - List all commands</li>
// // // // //               </ul>
// // // // //             </div>
// // // // //             <div className="command-category">
// // // // //               <h5>Actions</h5>
// // // // //               <ul>
// // // // //                 <li>"refresh news" - Refresh news feed</li>
// // // // //                 <li>"go to dashboard" - Return to dashboard</li>
// // // // //                 <li>"help" - General help</li>
// // // // //               </ul>
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>

// // // // //       {/* Status Bar */}
// // // // //       <div className="status-bar">
// // // // //         <p>
// // // // //           {status} | 
// // // // //           <span className="voice-status"> 🎤 Voice Active</span> | 
// // // // //           <span> Article {currentArticleIndex + 1} of {news.length}</span>
// // // // //         </p>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default NewsReader;



// // // // import React, { useState, useEffect } from "react";
// // // // import { useNavigate } from "react-router-dom";
// // // // import axios from "axios";
// // // // import { useFeatureVoice } from "../../hooks/useFeatureVoice";
// // // // import { createNewsVoiceCommands } from "../../voice-commands/newsVoiceCommands";
// // // // import { navigationVoiceCommands } from "../../voice-commands/navigationVoiceCommands";
// // // // import "./NewsReader.css";

// // // // const NewsReader = () => {
// // // //   const [news, setNews] = useState([]);
// // // //   const [loading, setLoading] = useState(false);
// // // //   const [status, setStatus] = useState("Loading latest news...");
// // // //   const [currentArticle, setCurrentArticle] = useState(null);
// // // //   const [isReading, setIsReading] = useState(false);
// // // //   const [speechProgress, setSpeechProgress] = useState(0);
// // // //   const [currentArticleIndex, setCurrentArticleIndex] = useState(0);
// // // //   const navigate = useNavigate();

// // // //   // NewsAPI configuration
// // // //   const API_KEY = "2cab5e57d08f466d8acef970f683b3ca";
// // // //   const BASE_URL = "https://newsapi.org/v2";

// // // //   // News reading function
// // // //   const readArticle = (article) => {
// // // //     setCurrentArticle(article);
    
// // // //     const content = article.content || article.description || "";
// // // //     const readingText = `Title: ${article.title}. Description: ${article.description}. ${content}`;
    
// // // //     setStatus(`Reading: ${article.title}`);
// // // //     speak(readingText, () => {
// // // //       setStatus(`Finished reading: ${article.title}`);
// // // //     });
// // // //   };

// // // //   // Read article summary
// // // //   const readArticleSummary = (article) => {
// // // //     const summaryText = `Title: ${article.title}. Description: ${article.description}`;
// // // //     setStatus(`Reading summary: ${article.title}`);
// // // //     speak(summaryText);
// // // //   };

// // // //   // Stop speaking function
// // // //   const stopSpeaking = () => {
// // // //     if ('speechSynthesis' in window) {
// // // //       window.speechSynthesis.cancel();
// // // //     }
// // // //     setIsReading(false);
// // // //     setSpeechProgress(0);
// // // //     setStatus("Reading stopped");
// // // //   };

// // // //   // Fetch news from NewsAPI
// // // //   const fetchNews = async () => {
// // // //     setLoading(true);
// // // //     setStatus("Loading latest news from around the world...");
    
// // // //     try {
// // // //       // Try top headlines first
// // // //       let url = `${BASE_URL}/top-headlines?country=us&pageSize=20&apiKey=${API_KEY}`;
      
// // // //       console.log("Fetching news from:", url);
      
// // // //       const response = await axios.get(url);
      
// // // //       if (response.data.articles && response.data.articles.length > 0) {
// // // //         // Filter out articles without titles or content
// // // //         const validArticles = response.data.articles.filter(
// // // //           article => article && 
// // // //                     article.title && 
// // // //                     article.description && 
// // // //                     article.title !== "[Removed]" &&
// // // //                     !article.title.includes("Removed") &&
// // // //                     article.source?.name
// // // //         );
        
// // // //         if (validArticles.length > 0) {
// // // //           setNews(validArticles);
// // // //           setCurrentArticleIndex(0);
// // // //           setStatus(`Loaded ${validArticles.length} latest news articles`);
// // // //           speak(`Loaded ${validArticles.length} latest news articles`);
// // // //           setLoading(false);
// // // //           return;
// // // //         }
// // // //       }
      
// // // //       // If no valid articles, try everything endpoint
// // // //       await fetchEverythingNews();
      
// // // //     } catch (error) {
// // // //       console.error("Error fetching news from NewsAPI:", error);
// // // //       await fetchEverythingNews();
// // // //     }
// // // //   };

// // // //   // Fallback: Fetch everything news
// // // //   const fetchEverythingNews = async () => {
// // // //     try {
// // // //       const url = `${BASE_URL}/everything?q=technology&language=en&sortBy=publishedAt&pageSize=20&apiKey=${API_KEY}`;
      
// // // //       const response = await axios.get(url);
      
// // // //       if (response.data.articles && response.data.articles.length > 0) {
// // // //         const validArticles = response.data.articles.filter(
// // // //           article => article && 
// // // //                     article.title && 
// // // //                     article.description && 
// // // //                     article.title !== "[Removed]" &&
// // // //                     !article.title.includes("Removed")
// // // //         );
        
// // // //         if (validArticles.length > 0) {
// // // //           setNews(validArticles);
// // // //           setCurrentArticleIndex(0);
// // // //           setStatus(`Loaded ${validArticles.length} news articles`);
// // // //           setLoading(false);
// // // //           return;
// // // //         }
// // // //       }
      
// // // //       // If still no articles, show empty state
// // // //       setNews([]);
// // // //       setStatus("No articles found. Please try again later.");
// // // //       speak("Unable to load news articles. Please check your internet connection.");
// // // //       setLoading(false);
      
// // // //     } catch (error) {
// // // //       console.error("Error in fallback news fetch:", error);
      
// // // //       setNews([]);
// // // //       setStatus("Error loading news. Please try again.");
// // // //       speak("Error loading news. Please check your connection and try again.");
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   // Speech function
// // // //   const speak = (text, onEnd = null) => {
// // // //     if ('speechSynthesis' in window) {
// // // //       window.speechSynthesis.cancel();
      
// // // //       const utterance = new SpeechSynthesisUtterance(text);
// // // //       utterance.rate = 0.8;
// // // //       utterance.pitch = 1;
// // // //       utterance.volume = 1;

// // // //       utterance.onend = () => {
// // // //         setIsReading(false);
// // // //         setSpeechProgress(0);
// // // //         if (onEnd) onEnd();
// // // //       };

// // // //       utterance.onerror = (event) => {
// // // //         console.error("Speech synthesis error:", event);
// // // //         setIsReading(false);
// // // //         setSpeechProgress(0);
// // // //         setStatus("Error reading article");
// // // //       };

// // // //       // Simulate progress for longer texts
// // // //       if (text.length > 100) {
// // // //         setSpeechProgress(10);
// // // //         const interval = setInterval(() => {
// // // //           setSpeechProgress(prev => {
// // // //             if (prev >= 90) {
// // // //               clearInterval(interval);
// // // //               return 90;
// // // //             }
// // // //             return prev + 5;
// // // //           });
// // // //         }, 1000);

// // // //         utterance.onend = () => {
// // // //           clearInterval(interval);
// // // //           setSpeechProgress(100);
// // // //           setTimeout(() => {
// // // //             setIsReading(false);
// // // //             setSpeechProgress(0);
// // // //             if (onEnd) onEnd();
// // // //           }, 500);
// // // //         };
// // // //       }

// // // //       window.speechSynthesis.speak(utterance);
// // // //       setIsReading(true);
// // // //     }
// // // //   };

// // // //   // Create news actions for voice commands
// // // //   const newsActions = {
// // // //     readArticle,
// // // //     readArticleSummary,
// // // //     fetchNews,
// // // //     stopReading: stopSpeaking,
// // // //     setCurrentArticleIndex
// // // //   };

// // // //   // Create news data for voice commands
// // // //   const newsData = {
// // // //     news,
// // // //     currentArticleIndex
// // // //   };

// // // //   // Create news voice commands
// // // //   const newsVoiceCommands = createNewsVoiceCommands(newsData, newsActions);

// // // //   // Merge with navigation commands
// // // //   const allCommands = {
// // // //     ...navigationVoiceCommands,
// // // //     ...newsVoiceCommands
// // // //   };

// // // //   // Use feature voice with combined commands
// // // //   const { speak: voiceSpeak } = useFeatureVoice('News Reader', allCommands);

// // // //   // Format date
// // // //   const formatDate = (dateString) => {
// // // //     try {
// // // //       const date = new Date(dateString);
// // // //       const now = new Date();
// // // //       const diffMs = now - date;
// // // //       const diffMins = Math.floor(diffMs / 60000);
// // // //       const diffHours = Math.floor(diffMs / 3600000);
// // // //       const diffDays = Math.floor(diffMs / 86400000);

// // // //       if (diffMins < 60) {
// // // //         return `${diffMins} min ago`;
// // // //       } else if (diffHours < 24) {
// // // //         return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
// // // //       } else {
// // // //         return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
// // // //       }
// // // //     } catch {
// // // //       return "Recently";
// // // //     }
// // // //   };

// // // //   // Get default image if article image fails to load
// // // //   const getDefaultImage = () => {
// // // //     const defaultImages = [
// // // //       "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=400", // News
// // // //       "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400", // Tech
// // // //       "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400", // Business
// // // //       "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400", // Health
// // // //       "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=400", // Environment
// // // //       "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400", // Sports
// // // //       "https://images.unsplash.com/photo-1489599809505-7c6f0bd6d35e?w=400" // Entertainment
// // // //     ];
// // // //     return defaultImages[Math.floor(Math.random() * defaultImages.length)];
// // // //   };

// // // //   // Initialize
// // // //   useEffect(() => {
// // // //     fetchNews();
// // // //   }, []);

// // // //   const handleLogout = async () => {
// // // //     stopSpeaking();
// // // //     setStatus("Logging out...");

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
// // // //     stopSpeaking();
// // // //     navigate("/dashboard");
// // // //   };

// // // //   // Voice Status Component
// // // //   const VoiceStatus = () => (
// // // //     <div className="voice-status-indicator">
// // // //       <span className="voice-icon">🎤</span>
// // // //       <span className="voice-text">Voice Active: Say "read news", "next article", etc.</span>
// // // //       <button 
// // // //         className="voice-help-btn"
// // // //         onClick={() => voiceSpeak("Available commands: read news, next article, previous article, read summary, stop reading, refresh news, read headlines, current article, news count, first article, last article")}
// // // //       >
// // // //         Voice Help
// // // //       </button>
// // // //     </div>
// // // //   );

// // // //   return (
// // // //     <div className="news-reader-container">
// // // //       {/* Fixed Header */}
// // // //       <header className="dashboard-header fixed-header">
// // // //         <div className="header-content">
// // // //           <div className="header-left">
// // // //             <button className="back-btn" onClick={handleBackToDashboard}>
// // // //               ← Back to Dashboard
// // // //             </button>
// // // //             <h1 className="logo">Vision Assist</h1>
// // // //           </div>
// // // //           <div className="user-menu">
// // // //             <button className="logout-btn" onClick={handleLogout}>
// // // //               Logout
// // // //             </button>
// // // //           </div>
// // // //         </div>
// // // //       </header>

// // // //       <div className="news-content">
// // // //         {/* Voice Status Indicator */}
// // // //         <VoiceStatus />

// // // //         <div className="news-header">
// // // //           <h2>📰 News Reader 🎤</h2>
// // // //           <p>Stay informed with the latest news from around the world, read aloud for your convenience</p>
// // // //           <p className="voice-instruction">
// // // //             <strong>Voice Commands Active:</strong> Try saying "read news", "next article", "stop reading", or "refresh news"
// // // //           </p>
// // // //         </div>

// // // //         {/* Status Message */}
// // // //         {status && (
// // // //           <div className="status-message">
// // // //             {status}
// // // //             {speechProgress > 0 && (
// // // //               <div className="speech-progress">
// // // //                 <div 
// // // //                   className="progress-bar" 
// // // //                   style={{ width: `${speechProgress}%` }}
// // // //                 ></div>
// // // //               </div>
// // // //             )}
// // // //           </div>
// // // //         )}

// // // //         {/* Controls */}
// // // //         <div className="news-controls">
// // // //           <button 
// // // //             className="control-btn refresh-btn"
// // // //             onClick={() => fetchNews()}
// // // //             disabled={loading || isReading}
// // // //           >
// // // //             🔄 {loading ? "Loading..." : "Refresh News"}
// // // //           </button>
          
// // // //           {isReading && (
// // // //             <button 
// // // //               className="control-btn stop-btn"
// // // //               onClick={stopSpeaking}
// // // //             >
// // // //               ⏹️ Stop Reading
// // // //             </button>
// // // //           )}
          
// // // //           {/* Voice Navigation Controls */}
// // // //           <div className="voice-nav-controls">
// // // //             <button 
// // // //               className="control-btn voice-nav-btn"
// // // //               onClick={() => {
// // // //                 if (news.length > 0) {
// // // //                   const prevIndex = currentArticleIndex === 0 ? news.length - 1 : currentArticleIndex - 1;
// // // //                   setCurrentArticleIndex(prevIndex);
// // // //                   if (voiceSpeak) {
// // // //                     voiceSpeak(`Previous article: ${news[prevIndex].title}`);
// // // //                   }
// // // //                 }
// // // //               }}
// // // //               disabled={news.length === 0}
// // // //             >
// // // //               ⏮️ Previous Article
// // // //             </button>
            
// // // //             <button 
// // // //               className="control-btn voice-nav-btn"
// // // //               onClick={() => {
// // // //                 if (news.length > 0) {
// // // //                   readArticle(news[currentArticleIndex]);
// // // //                 }
// // // //               }}
// // // //               disabled={news.length === 0 || isReading}
// // // //             >
// // // //               🔊 Read Current
// // // //             </button>
            
// // // //             <button 
// // // //               className="control-btn voice-nav-btn"
// // // //               onClick={() => {
// // // //                 if (news.length > 0) {
// // // //                   const nextIndex = (currentArticleIndex + 1) % news.length;
// // // //                   setCurrentArticleIndex(nextIndex);
// // // //                   if (voiceSpeak) {
// // // //                     voiceSpeak(`Next article: ${news[nextIndex].title}`);
// // // //                   }
// // // //                 }
// // // //               }}
// // // //               disabled={news.length === 0}
// // // //             >
// // // //               ⏭️ Next Article
// // // //             </button>
// // // //           </div>
// // // //         </div>

// // // //         {/* Current Article Indicator */}
// // // //         {news.length > 0 && (
// // // //           <div className="current-article-indicator">
// // // //             <h4>📄 Currently Selected Article</h4>
// // // //             <div className="selected-article">
// // // //               <strong>Article {currentArticleIndex + 1} of {news.length}</strong>
// // // //               <p>{news[currentArticleIndex].title}</p>
// // // //               <div className="article-meta">
// // // //                 <span>{news[currentArticleIndex].source?.name || "News Source"}</span>
// // // //                 <span>•</span>
// // // //                 <span>{formatDate(news[currentArticleIndex].publishedAt)}</span>
// // // //               </div>
// // // //               <div className="selected-article-actions">
// // // //                 <button 
// // // //                   className="action-btn read-summary-btn"
// // // //                   onClick={() => readArticleSummary(news[currentArticleIndex])}
// // // //                   disabled={isReading}
// // // //                 >
// // // //                   🎧 Read Summary
// // // //                 </button>
// // // //                 <button 
// // // //                   className="action-btn read-full-btn"
// // // //                   onClick={() => readArticle(news[currentArticleIndex])}
// // // //                   disabled={isReading}
// // // //                 >
// // // //                   📖 Read Full Article
// // // //                 </button>
// // // //               </div>
// // // //             </div>
// // // //           </div>
// // // //         )}

// // // //         {/* News Articles */}
// // // //         <div className="news-articles">
// // // //           <h3>📋 Latest News from Around the World</h3>
          
// // // //           {loading ? (
// // // //             <div className="loading-state">
// // // //               <div className="loading-spinner"></div>
// // // //               <p>Loading latest news articles...</p>
// // // //             </div>
// // // //           ) : news.length === 0 ? (
// // // //             <div className="empty-state">
// // // //               <p>No news articles found at the moment.</p>
// // // //               <button 
// // // //                 className="control-btn refresh-btn"
// // // //                 onClick={() => fetchNews()}
// // // //                 style={{ marginTop: '1rem' }}
// // // //               >
// // // //                 🔄 Try Again
// // // //               </button>
// // // //             </div>
// // // //           ) : (
// // // //             <div className="articles-grid">
// // // //               {news.map((article, index) => (
// // // //                 <div 
// // // //                   key={index} 
// // // //                   className={`article-card ${index === currentArticleIndex ? 'selected-article-card' : ''}`}
// // // //                   onClick={() => setCurrentArticleIndex(index)}
// // // //                 >
// // // //                   <div className="article-image">
// // // //                     <img 
// // // //                       src={article.urlToImage || getDefaultImage()} 
// // // //                       alt={article.title}
// // // //                       onError={(e) => {
// // // //                         e.target.src = getDefaultImage();
// // // //                       }}
// // // //                     />
// // // //                     {index === currentArticleIndex && (
// // // //                       <span className="current-indicator">🎤 CURRENT</span>
// // // //                     )}
// // // //                   </div>
                  
// // // //                   <div className="article-content">
// // // //                     <div className="article-header">
// // // //                       <span className="article-source">{article.source?.name || "News Source"}</span>
// // // //                       <span className="article-time">{formatDate(article.publishedAt)}</span>
// // // //                     </div>
                    
// // // //                     <h4 className="article-title">{article.title}</h4>
// // // //                     <p className="article-description">{article.description}</p>
                    
// // // //                     <div className="article-actions">
// // // //                       <button 
// // // //                         className="action-btn read-summary-btn"
// // // //                         onClick={(e) => {
// // // //                           e.stopPropagation();
// // // //                           readArticleSummary(article);
// // // //                         }}
// // // //                         disabled={isReading}
// // // //                       >
// // // //                         🎧 Read Summary
// // // //                       </button>
                      
// // // //                       <button 
// // // //                         className="action-btn read-full-btn"
// // // //                         onClick={(e) => {
// // // //                           e.stopPropagation();
// // // //                           readArticle(article);
// // // //                         }}
// // // //                         disabled={isReading}
// // // //                       >
// // // //                         📖 Read Full Article
// // // //                       </button>
// // // //                     </div>
// // // //                   </div>
// // // //                 </div>
// // // //               ))}
// // // //             </div>
// // // //           )}
// // // //         </div>

// // // //         {/* Currently Reading */}
// // // //         {currentArticle && isReading && (
// // // //           <div className="currently-reading">
// // // //             <h4>🔊 Currently Reading</h4>
// // // //             <div className="current-article">
// // // //               <h5>{currentArticle.title}</h5>
// // // //               <p>{currentArticle.source?.name || "News Source"} • {formatDate(currentArticle.publishedAt)}</p>
// // // //             </div>
// // // //           </div>
// // // //         )}

// // // //         {/* API Status */}
// // // //         <div className="api-status">
// // // //           <h4>🔑 News API Status</h4>
// // // //           <p>
// // // //             <strong>Articles Loaded:</strong> {news.length} articles
// // // //           </p>
// // // //           <p>
// // // //             <strong>API Source:</strong> NewsAPI.org
// // // //           </p>
// // // //           <p className="status-note">
// // // //             Connected to NewsAPI. Loading real-time news articles from trusted sources.
// // // //           </p>
// // // //         </div>

// // // //         {/* Voice Commands Help */}
// // // //         <div className="voice-commands-help">
// // // //           <h4>🎤 Voice Commands Guide</h4>
// // // //           <div className="commands-grid">
// // // //             <div className="command-category">
// // // //               <h5>News Commands</h5>
// // // //               <ul>
// // // //                 <li>"read news" - Read current article</li>
// // // //                 <li>"next article" - Go to next article</li>
// // // //                 <li>"previous article" - Go to previous article</li>
// // // //                 <li>"first article" - Go to first article</li>
// // // //                 <li>"last article" - Go to last article</li>
// // // //                 <li>"read summary" - Read article summary</li>
// // // //                 <li>"stop reading" - Stop current reading</li>
// // // //                 <li>"refresh news" - Refresh news feed</li>
// // // //               </ul>
// // // //             </div>
// // // //             <div className="command-category">
// // // //               <h5>Information</h5>
// // // //               <ul>
// // // //                 <li>"current article" - Announce current article</li>
// // // //                 <li>"news count" - Announce number of articles</li>
// // // //                 <li>"read headlines" - Read all headlines</li>
// // // //                 <li>"news help" - List all commands</li>
// // // //               </ul>
// // // //             </div>
// // // //             <div className="command-category">
// // // //               <h5>Navigation</h5>
// // // //               <ul>
// // // //                 <li>"go to dashboard" - Return to dashboard</li>
// // // //                 <li>"go to weather" - Open weather forecast</li>
// // // //                 <li>"go to object detection" - Open object detection</li>
// // // //                 <li>"logout" - Log out of the system</li>
// // // //               </ul>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </div>

// // // //       {/* Status Bar */}
// // // //       <div className="status-bar">
// // // //         <p>
// // // //           {status} | 
// // // //           <span className="voice-status"> 🎤 Voice Active</span> | 
// // // //           <span> Article {news.length > 0 ? currentArticleIndex + 1 : 0} of {news.length}</span>
// // // //         </p>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default NewsReader;



// // // import React, { useState, useEffect } from "react";
// // // import { useNavigate } from "react-router-dom";
// // // import axios from "axios";
// // // import { useFeatureVoice } from "../../hooks/useFeatureVoice";
// // // import "./NewsReader.css";

// // // const NewsReader = () => {
// // //   const [news, setNews] = useState([]);
// // //   const [loading, setLoading] = useState(false);
// // //   const [status, setStatus] = useState("Loading latest news...");
// // //   const [currentArticle, setCurrentArticle] = useState(null);
// // //   const [isReading, setIsReading] = useState(false);
// // //   const [speechProgress, setSpeechProgress] = useState(0);
// // //   const [currentArticleIndex, setCurrentArticleIndex] = useState(0);
// // //   const navigate = useNavigate();

// // //   const API_KEY = "2cab5e57d08f466d8acef970f683b3ca";
// // //   const BASE_URL = "https://newsapi.org/v2";

// // //   // News reading function
// // //   const readArticle = (article) => {
// // //     setCurrentArticle(article);
    
// // //     const content = article.content || article.description || "";
// // //     const readingText = `Title: ${article.title}. Description: ${article.description}. ${content.substring(0, 500)}`;
    
// // //     setStatus(`Reading: ${article.title}`);
// // //     speak(readingText, () => {
// // //       setStatus(`Finished reading: ${article.title}`);
// // //     });
// // //   };

// // //   // Read article summary
// // //   const readArticleSummary = (article) => {
// // //     const summaryText = `Title: ${article.title}. Description: ${article.description}`;
// // //     setStatus(`Reading summary: ${article.title}`);
// // //     speak(summaryText);
// // //   };

// // //   // Stop speaking function
// // //   const stopSpeaking = () => {
// // //     if ('speechSynthesis' in window) {
// // //       window.speechSynthesis.cancel();
// // //     }
// // //     setIsReading(false);
// // //     setSpeechProgress(0);
// // //     setStatus("Reading stopped");
// // //   };

// // //   // Speech function
// // //   const speak = (text, onEnd = null) => {
// // //     if ('speechSynthesis' in window) {
// // //       // Wait if something is already speaking
// // //       if (window.speechSynthesis.speaking) {
// // //         setTimeout(() => {
// // //           speak(text, onEnd);
// // //         }, 100);
// // //         return;
// // //       }
      
// // //       const utterance = new SpeechSynthesisUtterance(text);
// // //       utterance.rate = 0.8;
// // //       utterance.pitch = 1;
// // //       utterance.volume = 1;

// // //       utterance.onend = () => {
// // //         setIsReading(false);
// // //         setSpeechProgress(0);
// // //         if (onEnd) onEnd();
// // //       };

// // //       utterance.onerror = (event) => {
// // //         console.error("Speech synthesis error:", event);
// // //         setIsReading(false);
// // //         setSpeechProgress(0);
// // //         setStatus("Error reading article");
// // //       };

// // //       if (text.length > 100) {
// // //         setSpeechProgress(10);
// // //         const interval = setInterval(() => {
// // //           setSpeechProgress(prev => {
// // //             if (prev >= 90) {
// // //               clearInterval(interval);
// // //               return 90;
// // //             }
// // //             return prev + 5;
// // //           });
// // //         }, 1000);

// // //         utterance.onend = () => {
// // //           clearInterval(interval);
// // //           setSpeechProgress(100);
// // //           setTimeout(() => {
// // //             setIsReading(false);
// // //             setSpeechProgress(0);
// // //             if (onEnd) onEnd();
// // //           }, 500);
// // //         };
// // //       }

// // //       window.speechSynthesis.speak(utterance);
// // //       setIsReading(true);
// // //     }
// // //   };

// // //   // Fetch news from NewsAPI
// // //   const fetchNews = async () => {
// // //     setLoading(true);
// // //     setStatus("Loading latest news from around the world...");
    
// // //     try {
// // //       // Try top headlines first
// // //       let url = `${BASE_URL}/top-headlines?country=us&pageSize=20&apiKey=${API_KEY}`;
      
// // //       const response = await axios.get(url);
      
// // //       if (response.data.articles && response.data.articles.length > 0) {
// // //         const validArticles = response.data.articles.filter(
// // //           article => article && 
// // //                     article.title && 
// // //                     article.description && 
// // //                     article.title !== "[Removed]" &&
// // //                     !article.title.includes("Removed") &&
// // //                     article.source?.name
// // //         );
        
// // //         if (validArticles.length > 0) {
// // //           setNews(validArticles);
// // //           setCurrentArticleIndex(0);
// // //           setStatus(`Loaded ${validArticles.length} latest news articles`);
// // //           speak(`Loaded ${validArticles.length} latest news articles`);
// // //           setLoading(false);
// // //           return;
// // //         }
// // //       }
      
// // //       // If no valid articles, try everything endpoint
// // //       await fetchEverythingNews();
      
// // //     } catch (error) {
// // //       console.error("Error fetching news from NewsAPI:", error);
// // //       await fetchEverythingNews();
// // //     }
// // //   };

// // //   // Fallback: Fetch everything news
// // //   const fetchEverythingNews = async () => {
// // //     try {
// // //       const url = `${BASE_URL}/everything?q=technology&language=en&sortBy=publishedAt&pageSize=20&apiKey=${API_KEY}`;
      
// // //       const response = await axios.get(url);
      
// // //       if (response.data.articles && response.data.articles.length > 0) {
// // //         const validArticles = response.data.articles.filter(
// // //           article => article && 
// // //                     article.title && 
// // //                     article.description && 
// // //                     article.title !== "[Removed]" &&
// // //                     !article.title.includes("Removed")
// // //         );
        
// // //         if (validArticles.length > 0) {
// // //           setNews(validArticles);
// // //           setCurrentArticleIndex(0);
// // //           setStatus(`Loaded ${validArticles.length} news articles`);
// // //           setLoading(false);
// // //           return;
// // //         }
// // //       }
      
// // //       setNews([]);
// // //       setStatus("No articles found. Please try again later.");
// // //       speak("Unable to load news articles. Please check your internet connection.");
// // //       setLoading(false);
      
// // //     } catch (error) {
// // //       console.error("Error in fallback news fetch:", error);
      
// // //       setNews([]);
// // //       setStatus("Error loading news. Please try again.");
// // //       speak("Error loading news. Please check your connection and try again.");
// // //       setLoading(false);
// // //     }
// // //   };

// // //   // Voice commands for news reader
// // //   const newsVoiceCommands = {
// // //     'read news': () => {
// // //       if (news.length > 0) {
// // //         const article = news[currentArticleIndex];
// // //         if (article) {
// // //           readArticle(article);
// // //           return `Reading article ${currentArticleIndex + 1}: ${article.title}`;
// // //         }
// // //       }
// // //       return "No articles available. Please refresh the news.";
// // //     },
    
// // //     'next article': () => {
// // //       if (news.length > 0) {
// // //         const nextIndex = (currentArticleIndex + 1) % news.length;
// // //         setCurrentArticleIndex(nextIndex);
// // //         const nextArticle = news[nextIndex];
// // //         if (nextArticle) {
// // //           return `Next article: ${nextArticle.title}. Article ${nextIndex + 1} of ${news.length}`;
// // //         }
// // //       }
// // //       return "No articles loaded yet";
// // //     },
    
// // //     'previous article': () => {
// // //       if (news.length > 0) {
// // //         const prevIndex = currentArticleIndex === 0 ? news.length - 1 : currentArticleIndex - 1;
// // //         setCurrentArticleIndex(prevIndex);
// // //         const prevArticle = news[prevIndex];
// // //         if (prevArticle) {
// // //           return `Previous article: ${prevArticle.title}. Article ${prevIndex + 1} of ${news.length}`;
// // //         }
// // //       }
// // //       return "No articles loaded yet";
// // //     },
    
// // //     'first article': () => {
// // //       if (news.length > 0) {
// // //         setCurrentArticleIndex(0);
// // //         const firstArticle = news[0];
// // //         if (firstArticle) {
// // //           return `First article: ${firstArticle.title}`;
// // //         }
// // //       }
// // //       return "No articles loaded";
// // //     },
    
// // //     'last article': () => {
// // //       if (news.length > 0) {
// // //         setCurrentArticleIndex(news.length - 1);
// // //         const lastArticle = news[news.length - 1];
// // //         if (lastArticle) {
// // //           return `Last article: ${lastArticle.title}`;
// // //         }
// // //       }
// // //       return "No articles loaded";
// // //     },
    
// // //     'stop reading': () => {
// // //       stopSpeaking();
// // //       return "Stopped reading";
// // //     },
    
// // //     'read summary': () => {
// // //       if (news.length > 0) {
// // //         const article = news[currentArticleIndex];
// // //         if (article) {
// // //           readArticleSummary(article);
// // //           return "Reading article summary";
// // //         }
// // //       }
// // //       return "No article available";
// // //     },
    
// // //     'current article': () => {
// // //       if (news.length > 0) {
// // //         const article = news[currentArticleIndex];
// // //         if (article) {
// // //           return `Current article ${currentArticleIndex + 1} of ${news.length}: ${article.title}`;
// // //         }
// // //       }
// // //       return "No article selected";
// // //     },
    
// // //     'news count': () => {
// // //       if (news.length === 0) {
// // //         return "No articles loaded";
// // //       } else if (news.length === 1) {
// // //         return "There is 1 article loaded";
// // //       } else {
// // //         return `There are ${news.length} articles loaded`;
// // //       }
// // //     },
    
// // //     'read headlines': () => {
// // //       if (news.length === 0) {
// // //         return "No news articles available";
// // //       }
      
// // //       const headlines = news.slice(0, 3).map((article, idx) => 
// // //         `Article ${idx + 1}: ${article.title}`
// // //       ).join('. ');
      
// // //       return `Top headlines: ${headlines}`;
// // //     },
    
// // //     'refresh news': () => {
// // //       fetchNews();
// // //       return "Refreshing news feed";
// // //     },
    
// // //     'news help': () => {
// // //       return "News commands: read news, next article, previous article, read summary, stop reading, refresh news, read headlines, current article, news count, first article, last article";
// // //     }
// // //   };

// // //   // Use feature voice with news commands
// // //   const { speak: voiceSpeak } = useFeatureVoice('News Reader', newsVoiceCommands);

// // //   // Format date
// // //   const formatDate = (dateString) => {
// // //     try {
// // //       const date = new Date(dateString);
// // //       const now = new Date();
// // //       const diffMs = now - date;
// // //       const diffMins = Math.floor(diffMs / 60000);
// // //       const diffHours = Math.floor(diffMs / 3600000);
// // //       const diffDays = Math.floor(diffMs / 86400000);

// // //       if (diffMins < 60) {
// // //         return `${diffMins} min ago`;
// // //       } else if (diffHours < 24) {
// // //         return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
// // //       } else {
// // //         return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
// // //       }
// // //     } catch {
// // //       return "Recently";
// // //     }
// // //   };

// // //   // Get default image
// // //   const getDefaultImage = () => {
// // //     const defaultImages = [
// // //       "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=400",
// // //       "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400",
// // //       "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400",
// // //       "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400",
// // //       "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=400",
// // //       "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400",
// // //       "https://images.unsplash.com/photo-1489599809505-7c6f0bd6d35e?w=400"
// // //     ];
// // //     return defaultImages[Math.floor(Math.random() * defaultImages.length)];
// // //   };

// // //   // Initialize
// // //   useEffect(() => {
// // //     fetchNews();
// // //   }, []);

// // //   const handleLogout = async () => {
// // //     stopSpeaking();
// // //     setStatus("Logging out...");

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

// // //   const handleBackToDashboard = () => {
// // //     stopSpeaking();
// // //     navigate("/dashboard");
// // //   };

// // //   // Voice Status Component
// // //   const VoiceStatus = () => (
// // //     <div className="voice-status-indicator">
// // //       <span className="voice-icon">🎤</span>
// // //       <span className="voice-text">Voice Active: Say "read news", "next article", etc.</span>
// // //       <button 
// // //         className="voice-help-btn"
// // //         onClick={() => voiceSpeak("Available commands: read news, next article, previous article, read summary, stop reading, refresh news, read headlines, current article, news count, first article, last article")}
// // //       >
// // //         Voice Help
// // //       </button>
// // //     </div>
// // //   );

// // //   return (
// // //     <div className="news-reader-container">
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
// // //             <button className="logout-btn" onClick={handleLogout}>
// // //               Logout
// // //             </button>
// // //           </div>
// // //         </div>
// // //       </header>

// // //       <div className="news-content">
// // //         {/* Voice Status Indicator */}
// // //         <VoiceStatus />

// // //         <div className="news-header">
// // //           <h2>📰 News Reader 🎤</h2>
// // //           <p>Stay informed with the latest news from around the world, read aloud for your convenience</p>
// // //           <p className="voice-instruction">
// // //             <strong>Voice Commands Active:</strong> Try saying "read news", "next article", "stop reading", or "refresh news"
// // //           </p>
// // //         </div>

// // //         {/* Status Message */}
// // //         {status && (
// // //           <div className="status-message">
// // //             {status}
// // //             {speechProgress > 0 && (
// // //               <div className="speech-progress">
// // //                 <div 
// // //                   className="progress-bar" 
// // //                   style={{ width: `${speechProgress}%` }}
// // //                 ></div>
// // //               </div>
// // //             )}
// // //           </div>
// // //         )}

// // //         {/* Controls */}
// // //         <div className="news-controls">
// // //           <button 
// // //             className="control-btn refresh-btn"
// // //             onClick={() => fetchNews()}
// // //             disabled={loading || isReading}
// // //           >
// // //             🔄 {loading ? "Loading..." : "Refresh News"}
// // //           </button>
          
// // //           {isReading && (
// // //             <button 
// // //               className="control-btn stop-btn"
// // //               onClick={stopSpeaking}
// // //             >
// // //               ⏹️ Stop Reading
// // //             </button>
// // //           )}
          
// // //           {/* Voice Navigation Controls */}
// // //           <div className="voice-nav-controls">
// // //             <button 
// // //               className="control-btn voice-nav-btn"
// // //               onClick={() => {
// // //                 if (news.length > 0) {
// // //                   const prevIndex = currentArticleIndex === 0 ? news.length - 1 : currentArticleIndex - 1;
// // //                   setCurrentArticleIndex(prevIndex);
// // //                   if (voiceSpeak) {
// // //                     voiceSpeak(`Previous article: ${news[prevIndex].title}`);
// // //                   }
// // //                 }
// // //               }}
// // //               disabled={news.length === 0}
// // //             >
// // //               ⏮️ Previous Article
// // //             </button>
            
// // //             <button 
// // //               className="control-btn voice-nav-btn"
// // //               onClick={() => {
// // //                 if (news.length > 0) {
// // //                   readArticle(news[currentArticleIndex]);
// // //                 }
// // //               }}
// // //               disabled={news.length === 0 || isReading}
// // //             >
// // //               🔊 Read Current
// // //             </button>
            
// // //             <button 
// // //               className="control-btn voice-nav-btn"
// // //               onClick={() => {
// // //                 if (news.length > 0) {
// // //                   const nextIndex = (currentArticleIndex + 1) % news.length;
// // //                   setCurrentArticleIndex(nextIndex);
// // //                   if (voiceSpeak) {
// // //                     voiceSpeak(`Next article: ${news[nextIndex].title}`);
// // //                   }
// // //                 }
// // //               }}
// // //               disabled={news.length === 0}
// // //             >
// // //               ⏭️ Next Article
// // //             </button>
// // //           </div>
// // //         </div>

// // //         {/* Current Article Indicator */}
// // //         {news.length > 0 && (
// // //           <div className="current-article-indicator">
// // //             <h4>📄 Currently Selected Article</h4>
// // //             <div className="selected-article">
// // //               <strong>Article {currentArticleIndex + 1} of {news.length}</strong>
// // //               <p>{news[currentArticleIndex].title}</p>
// // //               <div className="article-meta">
// // //                 <span>{news[currentArticleIndex].source?.name || "News Source"}</span>
// // //                 <span>•</span>
// // //                 <span>{formatDate(news[currentArticleIndex].publishedAt)}</span>
// // //               </div>
// // //               <div className="selected-article-actions">
// // //                 <button 
// // //                   className="action-btn read-summary-btn"
// // //                   onClick={() => readArticleSummary(news[currentArticleIndex])}
// // //                   disabled={isReading}
// // //                 >
// // //                   🎧 Read Summary
// // //                 </button>
// // //                 <button 
// // //                   className="action-btn read-full-btn"
// // //                   onClick={() => readArticle(news[currentArticleIndex])}
// // //                   disabled={isReading}
// // //                 >
// // //                   📖 Read Full Article
// // //                 </button>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         )}

// // //         {/* News Articles */}
// // //         <div className="news-articles">
// // //           <h3>📋 Latest News from Around the World</h3>
          
// // //           {loading ? (
// // //             <div className="loading-state">
// // //               <div className="loading-spinner"></div>
// // //               <p>Loading latest news articles...</p>
// // //             </div>
// // //           ) : news.length === 0 ? (
// // //             <div className="empty-state">
// // //               <p>No news articles found at the moment.</p>
// // //               <button 
// // //                 className="control-btn refresh-btn"
// // //                 onClick={() => fetchNews()}
// // //                 style={{ marginTop: '1rem' }}
// // //               >
// // //                 🔄 Try Again
// // //               </button>
// // //             </div>
// // //           ) : (
// // //             <div className="articles-grid">
// // //               {news.map((article, index) => (
// // //                 <div 
// // //                   key={index} 
// // //                   className={`article-card ${index === currentArticleIndex ? 'selected-article-card' : ''}`}
// // //                   onClick={() => setCurrentArticleIndex(index)}
// // //                 >
// // //                   <div className="article-image">
// // //                     <img 
// // //                       src={article.urlToImage || getDefaultImage()} 
// // //                       alt={article.title}
// // //                       onError={(e) => {
// // //                         e.target.src = getDefaultImage();
// // //                       }}
// // //                     />
// // //                     {index === currentArticleIndex && (
// // //                       <span className="current-indicator">🎤 CURRENT</span>
// // //                     )}
// // //                   </div>
                  
// // //                   <div className="article-content">
// // //                     <div className="article-header">
// // //                       <span className="article-source">{article.source?.name || "News Source"}</span>
// // //                       <span className="article-time">{formatDate(article.publishedAt)}</span>
// // //                     </div>
                    
// // //                     <h4 className="article-title">{article.title}</h4>
// // //                     <p className="article-description">{article.description}</p>
                    
// // //                     <div className="article-actions">
// // //                       <button 
// // //                         className="action-btn read-summary-btn"
// // //                         onClick={(e) => {
// // //                           e.stopPropagation();
// // //                           readArticleSummary(article);
// // //                         }}
// // //                         disabled={isReading}
// // //                       >
// // //                         🎧 Read Summary
// // //                       </button>
                      
// // //                       <button 
// // //                         className="action-btn read-full-btn"
// // //                         onClick={(e) => {
// // //                           e.stopPropagation();
// // //                           readArticle(article);
// // //                         }}
// // //                         disabled={isReading}
// // //                       >
// // //                         📖 Read Full Article
// // //                       </button>
// // //                     </div>
// // //                   </div>
// // //                 </div>
// // //               ))}
// // //             </div>
// // //           )}
// // //         </div>

// // //         {/* Currently Reading */}
// // //         {currentArticle && isReading && (
// // //           <div className="currently-reading">
// // //             <h4>🔊 Currently Reading</h4>
// // //             <div className="current-article">
// // //               <h5>{currentArticle.title}</h5>
// // //               <p>{currentArticle.source?.name || "News Source"} • {formatDate(currentArticle.publishedAt)}</p>
// // //             </div>
// // //           </div>
// // //         )}

// // //         {/* API Status */}
// // //         <div className="api-status">
// // //           <h4>🔑 News API Status</h4>
// // //           <p>
// // //             <strong>Articles Loaded:</strong> {news.length} articles
// // //           </p>
// // //           <p>
// // //             <strong>API Source:</strong> NewsAPI.org
// // //           </p>
// // //           <p className="status-note">
// // //             Connected to NewsAPI. Loading real-time news articles from trusted sources.
// // //           </p>
// // //         </div>

// // //         {/* Voice Commands Help */}
// // //         <div className="voice-commands-help">
// // //           <h4>🎤 Voice Commands Guide</h4>
// // //           <div className="commands-grid">
// // //             <div className="command-category">
// // //               <h5>News Commands</h5>
// // //               <ul>
// // //                 <li>"read news" - Read current article</li>
// // //                 <li>"next article" - Go to next article</li>
// // //                 <li>"previous article" - Go to previous article</li>
// // //                 <li>"first article" - Go to first article</li>
// // //                 <li>"last article" - Go to last article</li>
// // //                 <li>"read summary" - Read article summary</li>
// // //                 <li>"stop reading" - Stop current reading</li>
// // //                 <li>"refresh news" - Refresh news feed</li>
// // //               </ul>
// // //             </div>
// // //             <div className="command-category">
// // //               <h5>Information</h5>
// // //               <ul>
// // //                 <li>"current article" - Announce current article</li>
// // //                 <li>"news count" - Announce number of articles</li>
// // //                 <li>"read headlines" - Read all headlines</li>
// // //                 <li>"news help" - List all commands</li>
// // //               </ul>
// // //             </div>
// // //             <div className="command-category">
// // //               <h5>Navigation</h5>
// // //               <ul>
// // //                 <li>"go to dashboard" - Return to dashboard</li>
// // //                 <li>"logout" - Log out of the system</li>
// // //               </ul>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* Status Bar */}
// // //       <div className="status-bar">
// // //         <p>
// // //           {status} | 
// // //           <span className="voice-status"> 🎤 Voice Active</span> | 
// // //           <span> Article {news.length > 0 ? currentArticleIndex + 1 : 0} of {news.length}</span>
// // //         </p>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default NewsReader;



// // import React, { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// // import axios from "axios";
// // import { useFeatureVoice } from "../../hooks/useFeatureVoice";
// // import "./NewsReader.css";

// // const NewsReader = () => {
// //   const [news, setNews] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [status, setStatus] = useState("Loading latest news...");
// //   const [currentArticle, setCurrentArticle] = useState(null);
// //   const [isReading, setIsReading] = useState(false);
// //   const [speechProgress, setSpeechProgress] = useState(0);
// //   const [currentArticleIndex, setCurrentArticleIndex] = useState(0);
// //   const navigate = useNavigate();

// //   const API_KEY = "2cab5e57d08f466d8acef970f683b3ca";
// //   const BASE_URL = "https://newsapi.org/v2";

// //   // News reading function
// //   const readArticle = (article) => {
// //     setCurrentArticle(article);
    
// //     const content = article.content || article.description || "";
// //     const readingText = `Title: ${article.title}. Description: ${article.description}. ${content.substring(0, 500)}`;
    
// //     setStatus(`Reading: ${article.title}`);
// //     speak(readingText, () => {
// //       setStatus(`Finished reading: ${article.title}`);
// //     });
// //   };

// //   // Read article summary
// //   const readArticleSummary = (article) => {
// //     const summaryText = `Title: ${article.title}. Description: ${article.description}`;
// //     setStatus(`Reading summary: ${article.title}`);
// //     speak(summaryText);
// //   };

// //   // Read article title only
// //   const readArticleTitle = (article) => {
// //     const titleText = `Title: ${article.title}`;
// //     setStatus(`Reading title: ${article.title}`);
// //     speak(titleText);
// //   };

// //   // Read all headlines
// //   const readAllHeadlines = () => {
// //     if (news.length === 0) {
// //       speak("No news articles available");
// //       return;
// //     }
    
// //     const headlines = news.map((article, idx) => 
// //       `Article ${idx + 1}: ${article.title}`
// //     ).join('. ');
    
// //     const headlinesText = `Top headlines: ${headlines}`;
// //     setStatus("Reading all headlines");
// //     speak(headlinesText);
// //   };

// //   // Read specific article by number
// //   const readArticleByNumber = (number) => {
// //     if (news.length === 0) {
// //       return "No articles loaded";
// //     }
    
// //     const index = number - 1;
// //     if (index >= 0 && index < news.length) {
// //       setCurrentArticleIndex(index);
// //       const article = news[index];
// //       readArticle(article);
// //       return `Reading article ${number}: ${article.title}`;
// //     }
// //     return `Article ${number} not available`;
// //   };

// //   // Stop speaking function
// //   const stopSpeaking = () => {
// //     if ('speechSynthesis' in window) {
// //       window.speechSynthesis.cancel();
// //     }
// //     setIsReading(false);
// //     setSpeechProgress(0);
// //     setStatus("Reading stopped");
// //   };

// //   // Pause reading
// //   const pauseReading = () => {
// //     if ('speechSynthesis' in window && window.speechSynthesis.speaking) {
// //       window.speechSynthesis.pause();
// //       setStatus("Reading paused");
// //       return "Reading paused";
// //     }
// //     return "Nothing is reading";
// //   };

// //   // Resume reading
// //   const resumeReading = () => {
// //     if ('speechSynthesis' in window && window.speechSynthesis.paused) {
// //       window.speechSynthesis.resume();
// //       setStatus("Reading resumed");
// //       return "Reading resumed";
// //     }
// //     return "Nothing is paused";
// //   };

// //   // Speech function
// //   const speak = (text, onEnd = null) => {
// //     if ('speechSynthesis' in window) {
// //       // Wait if something is already speaking
// //       if (window.speechSynthesis.speaking) {
// //         setTimeout(() => {
// //           speak(text, onEnd);
// //         }, 100);
// //         return;
// //       }
      
// //       const utterance = new SpeechSynthesisUtterance(text);
// //       utterance.rate = 0.8;
// //       utterance.pitch = 1;
// //       utterance.volume = 1;

// //       utterance.onend = () => {
// //         setIsReading(false);
// //         setSpeechProgress(0);
// //         if (onEnd) onEnd();
// //       };

// //       utterance.onerror = (event) => {
// //         console.error("Speech synthesis error:", event);
// //         setIsReading(false);
// //         setSpeechProgress(0);
// //         setStatus("Error reading article");
// //       };

// //       if (text.length > 100) {
// //         setSpeechProgress(10);
// //         const interval = setInterval(() => {
// //           setSpeechProgress(prev => {
// //             if (prev >= 90) {
// //               clearInterval(interval);
// //               return 90;
// //             }
// //             return prev + 5;
// //           });
// //         }, 1000);

// //         utterance.onend = () => {
// //           clearInterval(interval);
// //           setSpeechProgress(100);
// //           setTimeout(() => {
// //             setIsReading(false);
// //             setSpeechProgress(0);
// //             if (onEnd) onEnd();
// //           }, 500);
// //         };
// //       }

// //       window.speechSynthesis.speak(utterance);
// //       setIsReading(true);
// //     }
// //   };

// //   // Fetch news from NewsAPI
// //   const fetchNews = async () => {
// //     setLoading(true);
// //     setStatus("Loading latest news from around the world...");
    
// //     try {
// //       // Try top headlines first
// //       let url = `${BASE_URL}/top-headlines?country=us&pageSize=20&apiKey=${API_KEY}`;
      
// //       const response = await axios.get(url);
      
// //       if (response.data.articles && response.data.articles.length > 0) {
// //         const validArticles = response.data.articles.filter(
// //           article => article && 
// //                     article.title && 
// //                     article.description && 
// //                     article.title !== "[Removed]" &&
// //                     !article.title.includes("Removed") &&
// //                     article.source?.name
// //         );
        
// //         if (validArticles.length > 0) {
// //           setNews(validArticles);
// //           setCurrentArticleIndex(0);
// //           setStatus(`Loaded ${validArticles.length} latest news articles`);
// //           speak(`Loaded ${validArticles.length} latest news articles`);
// //           setLoading(false);
// //           return;
// //         }
// //       }
      
// //       // If no valid articles, try everything endpoint
// //       await fetchEverythingNews();
      
// //     } catch (error) {
// //       console.error("Error fetching news from NewsAPI:", error);
// //       await fetchEverythingNews();
// //     }
// //   };

// //   // Fallback: Fetch everything news
// //   const fetchEverythingNews = async () => {
// //     try {
// //       const url = `${BASE_URL}/everything?q=technology&language=en&sortBy=publishedAt&pageSize=20&apiKey=${API_KEY}`;
      
// //       const response = await axios.get(url);
      
// //       if (response.data.articles && response.data.articles.length > 0) {
// //         const validArticles = response.data.articles.filter(
// //           article => article && 
// //                     article.title && 
// //                     article.description && 
// //                     article.title !== "[Removed]" &&
// //                     !article.title.includes("Removed")
// //         );
        
// //         if (validArticles.length > 0) {
// //           setNews(validArticles);
// //           setCurrentArticleIndex(0);
// //           setStatus(`Loaded ${validArticles.length} news articles`);
// //           setLoading(false);
// //           return;
// //         }
// //       }
      
// //       setNews([]);
// //       setStatus("No articles found. Please try again later.");
// //       speak("Unable to load news articles. Please check your internet connection.");
// //       setLoading(false);
      
// //     } catch (error) {
// //       console.error("Error in fallback news fetch:", error);
      
// //       setNews([]);
// //       setStatus("Error loading news. Please try again.");
// //       speak("Error loading news. Please check your connection and try again.");
// //       setLoading(false);
// //     }
// //   };

// //   // Voice commands for news reader - COMPREHENSIVE LIST
// //   const newsVoiceCommands = {
// //     // BASIC READING
// //     'read news': () => {
// //       if (news.length > 0) {
// //         const article = news[currentArticleIndex];
// //         if (article) {
// //           readArticle(article);
// //           return `Reading article ${currentArticleIndex + 1}: ${article.title}`;
// //         }
// //       }
// //       return "No articles available. Please refresh the news.";
// //     },
    
// //     'read article': () => {
// //       if (news.length > 0) {
// //         const article = news[currentArticleIndex];
// //         if (article) {
// //           readArticle(article);
// //           return `Reading article ${currentArticleIndex + 1}`;
// //         }
// //       }
// //       return "No article available";
// //     },
    
// //     'read current article': () => {
// //       if (news.length > 0) {
// //         const article = news[currentArticleIndex];
// //         if (article) {
// //           readArticle(article);
// //           return `Reading current article ${currentArticleIndex + 1}`;
// //         }
// //       }
// //       return "No article available";
// //     },
    
// //     'read headline': () => {
// //       if (news.length > 0) {
// //         const article = news[currentArticleIndex];
// //         if (article) {
// //           readArticleTitle(article);
// //           return `Headline: ${article.title}`;
// //         }
// //       }
// //       return "No headline available";
// //     },
    
// //     'read title': () => {
// //       if (news.length > 0) {
// //         const article = news[currentArticleIndex];
// //         if (article) {
// //           readArticleTitle(article);
// //           return `Title: ${article.title}`;
// //         }
// //       }
// //       return "No title available";
// //     },
    
// //     // SUMMARY
// //     'read summary': () => {
// //       if (news.length > 0) {
// //         const article = news[currentArticleIndex];
// //         if (article) {
// //           readArticleSummary(article);
// //           return "Reading article summary";
// //         }
// //       }
// //       return "No article available";
// //     },
    
// //     'read short summary': () => {
// //       if (news.length > 0) {
// //         const article = news[currentArticleIndex];
// //         if (article) {
// //           readArticleSummary(article);
// //           return "Reading short summary";
// //         }
// //       }
// //       return "No article available";
// //     },
    
// //     'summarize news': () => {
// //       if (news.length > 0) {
// //         const article = news[currentArticleIndex];
// //         if (article) {
// //           readArticleSummary(article);
// //           return "Summarizing article";
// //         }
// //       }
// //       return "No article to summarize";
// //     },
    
// //     'summary of article': () => {
// //       if (news.length > 0) {
// //         const article = news[currentArticleIndex];
// //         if (article) {
// //           readArticleSummary(article);
// //           return "Reading article summary";
// //         }
// //       }
// //       return "No article available";
// //     },
    
// //     // FULL ARTICLE
// //     'read full article': () => {
// //       if (news.length > 0) {
// //         const article = news[currentArticleIndex];
// //         if (article) {
// //           readArticle(article);
// //           return "Reading full article";
// //         }
// //       }
// //       return "No article available";
// //     },
    
// //     'read complete article': () => {
// //       if (news.length > 0) {
// //         const article = news[currentArticleIndex];
// //         if (article) {
// //           readArticle(article);
// //           return "Reading complete article";
// //         }
// //       }
// //       return "No article available";
// //     },
    
// //     'read entire article': () => {
// //       if (news.length > 0) {
// //         const article = news[currentArticleIndex];
// //         if (article) {
// //           readArticle(article);
// //           return "Reading entire article";
// //         }
// //       }
// //       return "No article available";
// //     },
    
// //     'read full news': () => {
// //       if (news.length > 0) {
// //         const article = news[currentArticleIndex];
// //         if (article) {
// //           readArticle(article);
// //           return "Reading full news article";
// //         }
// //       }
// //       return "No article available";
// //     },
    
// //     // NAVIGATION
// //     'next article': () => {
// //       if (news.length > 0) {
// //         const nextIndex = (currentArticleIndex + 1) % news.length;
// //         setCurrentArticleIndex(nextIndex);
// //         const nextArticle = news[nextIndex];
// //         if (nextArticle) {
// //           return `Next article: ${nextArticle.title}. Article ${nextIndex + 1} of ${news.length}`;
// //         }
// //       }
// //       return "No articles loaded yet";
// //     },
    
// //     'previous article': () => {
// //       if (news.length > 0) {
// //         const prevIndex = currentArticleIndex === 0 ? news.length - 1 : currentArticleIndex - 1;
// //         setCurrentArticleIndex(prevIndex);
// //         const prevArticle = news[prevIndex];
// //         if (prevArticle) {
// //           return `Previous article: ${prevArticle.title}. Article ${prevIndex + 1} of ${news.length}`;
// //         }
// //       }
// //       return "No articles loaded yet";
// //     },
    
// //     'go to next news': () => {
// //       if (news.length > 0) {
// //         const nextIndex = (currentArticleIndex + 1) % news.length;
// //         setCurrentArticleIndex(nextIndex);
// //         const nextArticle = news[nextIndex];
// //         if (nextArticle) {
// //           return `Going to next news: ${nextArticle.title}`;
// //         }
// //       }
// //       return "No more news articles";
// //     },
    
// //     'go to previous news': () => {
// //       if (news.length > 0) {
// //         const prevIndex = currentArticleIndex === 0 ? news.length - 1 : currentArticleIndex - 1;
// //         setCurrentArticleIndex(prevIndex);
// //         const prevArticle = news[prevIndex];
// //         if (prevArticle) {
// //           return `Going to previous news: ${prevArticle.title}`;
// //         }
// //       }
// //       return "No previous news articles";
// //     },
    
// //     'first article': () => {
// //       if (news.length > 0) {
// //         setCurrentArticleIndex(0);
// //         const firstArticle = news[0];
// //         if (firstArticle) {
// //           return `First article: ${firstArticle.title}`;
// //         }
// //       }
// //       return "No articles loaded";
// //     },
    
// //     'last article': () => {
// //       if (news.length > 0) {
// //         setCurrentArticleIndex(news.length - 1);
// //         const lastArticle = news[news.length - 1];
// //         if (lastArticle) {
// //           return `Last article: ${lastArticle.title}`;
// //         }
// //       }
// //       return "No articles loaded";
// //     },
    
// //     // DIRECT ARTICLE SELECTION
// //     'read first article': () => {
// //       return readArticleByNumber(1);
// //     },
    
// //     'read second article': () => {
// //       return readArticleByNumber(2);
// //     },
    
// //     'read third article': () => {
// //       return readArticleByNumber(3);
// //     },
    
// //     'read article one': () => {
// //       return readArticleByNumber(1);
// //     },
    
// //     'read article two': () => {
// //       return readArticleByNumber(2);
// //     },
    
// //     'read article three': () => {
// //       return readArticleByNumber(3);
// //     },
    
// //     'read article 1': () => {
// //       return readArticleByNumber(1);
// //     },
    
// //     'read article 2': () => {
// //       return readArticleByNumber(2);
// //     },
    
// //     'read article 3': () => {
// //       return readArticleByNumber(3);
// //     },
    
// //     // BULK ACTIONS
// //     'read all articles': () => {
// //       if (news.length === 0) {
// //         return "No articles to read";
// //       }
      
// //       // Start reading first article, chain the rest
// //       let currentIndex = 0;
// //       const readNextArticle = () => {
// //         if (currentIndex < news.length) {
// //           const article = news[currentIndex];
// //           readArticle(article);
// //           currentIndex++;
// //           // Wait for speech to finish before reading next
// //           setTimeout(readNextArticle, 15000); // Approximate reading time
// //         }
// //       };
      
// //       readNextArticle();
// //       return `Starting to read all ${news.length} articles`;
// //     },
    
// //     'read all news': () => {
// //       if (news.length === 0) {
// //         return "No news to read";
// //       }
// //       return "Reading all news articles";
// //     },
    
// //     'list headlines': () => {
// //       readAllHeadlines();
// //       return "Listing all headlines";
// //     },
    
// //     'news headlines': () => {
// //       readAllHeadlines();
// //       return "News headlines";
// //     },
    
// //     'show headlines': () => {
// //       readAllHeadlines();
// //       return "Showing headlines";
// //     },
    
// //     // REFRESH / UPDATE
// //     'refresh news': () => {
// //       fetchNews();
// //       return "Refreshing news feed";
// //     },
    
// //     'reload news': () => {
// //       fetchNews();
// //       return "Reloading news";
// //     },
    
// //     'update news': () => {
// //       fetchNews();
// //       return "Updating news";
// //     },
    
// //     'fetch latest news': () => {
// //       fetchNews();
// //       return "Fetching latest news";
// //     },
    
// //     // CONTROL
// //     'stop reading': () => {
// //       stopSpeaking();
// //       return "Stopped reading";
// //     },
    
// //     'pause reading': () => {
// //       return pauseReading();
// //     },
    
// //     'resume reading': () => {
// //       return resumeReading();
// //     },
    
// //     // INFORMATION
// //     'current article': () => {
// //       if (news.length > 0) {
// //         const article = news[currentArticleIndex];
// //         if (article) {
// //           return `Current article ${currentArticleIndex + 1} of ${news.length}: ${article.title}`;
// //         }
// //       }
// //       return "No article selected";
// //     },
    
// //     'news count': () => {
// //       if (news.length === 0) {
// //         return "No articles loaded";
// //       } else if (news.length === 1) {
// //         return "There is 1 article loaded";
// //       } else {
// //         return `There are ${news.length} articles loaded`;
// //       }
// //     },
    
// //     // HELP
// //     'help': () => {
// //       return "Available commands: read news, next article, previous article, read summary, stop reading, refresh news, read headlines, current article, news count, first article, last article, pause reading, resume reading";
// //     },
    
// //     'news help': () => {
// //       const helpText = `News Reader Commands: 
// //         BASIC: read news, read article, read headline, read title
// //         SUMMARY: read summary, summarize news
// //         FULL: read full article, read complete article
// //         NAVIGATION: next article, previous article, first article, last article
// //         SELECTION: read article 1, read article 2, read article 3
// //         BULK: list headlines, read all articles
// //         CONTROL: stop reading, pause reading, resume reading
// //         REFRESH: refresh news, update news
// //         INFO: current article, news count
// //         NAVIGATE: go to dashboard, logout`;
// //       return helpText;
// //     },
    
// //     'what can i say': () => {
// //       return "Try saying: read news, next article, read summary, read full article, stop reading, or refresh news";
// //     },
    
// //     'list commands': () => {
// //       return "Main commands: read news, read summary, read full article, next article, previous article, read article 1, refresh news, stop reading, help";
// //     }
// //   };

// //   // Use feature voice with ALL news commands
// //   const { speak: voiceSpeak, initVoice, deactivate } = useFeatureVoice('News Reader', newsVoiceCommands, {
// //     autoActivate: true,
// //     autoDeactivate: false, // Don't auto deactivate - we'll handle it manually
// //     welcomeMessage: true
// //   });

// //   // Initialize voice when news loads
// //   useEffect(() => {
// //     if (news.length > 0) {
// //       initVoice();
// //     }
// //   }, [news, initVoice]);

// //   // Clean up on unmount
// //   useEffect(() => {
// //     return () => {
// //       if (deactivate) {
// //         deactivate();
// //       }
// //     };
// //   }, [deactivate]);

// //   // Format date
// //   const formatDate = (dateString) => {
// //     try {
// //       const date = new Date(dateString);
// //       const now = new Date();
// //       const diffMs = now - date;
// //       const diffMins = Math.floor(diffMs / 60000);
// //       const diffHours = Math.floor(diffMs / 3600000);
// //       const diffDays = Math.floor(diffMs / 86400000);

// //       if (diffMins < 60) {
// //         return `${diffMins} min ago`;
// //       } else if (diffHours < 24) {
// //         return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
// //       } else {
// //         return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
// //       }
// //     } catch {
// //       return "Recently";
// //     }
// //   };

// //   // Get default image
// //   const getDefaultImage = () => {
// //     const defaultImages = [
// //       "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=400",
// //       "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400",
// //       "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400",
// //       "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400",
// //       "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=400",
// //       "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400",
// //       "https://images.unsplash.com/photo-1489599809505-7c6f0bd6d35e?w=400"
// //     ];
// //     return defaultImages[Math.floor(Math.random() * defaultImages.length)];
// //   };

// //   // Initialize
// //   useEffect(() => {
// //     fetchNews();
// //   }, []);

// //   const handleLogout = async () => {
// //     stopSpeaking();
// //     setStatus("Logging out...");

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
// //       localStorage.clear();
// //       setTimeout(() => navigate("/"), 1500);
// //     }
// //   };

// //   const handleBackToDashboard = () => {
// //     stopSpeaking();
// //     navigate("/dashboard");
// //   };

// //   // Voice Status Component
// //   const VoiceStatus = () => (
// //     <div className="voice-status-indicator">
// //       <span className="voice-icon">🎤</span>
// //       <span className="voice-text">Voice Active: Say "read news", "next article", etc.</span>
// //       <button 
// //         className="voice-help-btn"
// //         onClick={() => voiceSpeak("Available commands: read news, next article, previous article, read summary, stop reading, refresh news, read headlines, current article, news count, first article, last article, pause reading, resume reading")}
// //       >
// //         Voice Help
// //       </button>
// //     </div>
// //   );

// //   return (
// //     <div className="news-reader-container">
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
// //             <button className="logout-btn" onClick={handleLogout}>
// //               Logout
// //             </button>
// //           </div>
// //         </div>
// //       </header>

// //       <div className="news-content">
// //         {/* Voice Status Indicator */}
// //         <VoiceStatus />

// //         <div className="news-header">
// //           <h2>📰 News Reader 🎤</h2>
// //           <p>Stay informed with the latest news from around the world, read aloud for your convenience</p>
// //           <p className="voice-instruction">
// //             <strong>Voice Commands Active:</strong> Try saying "read news", "next article", "stop reading", or "refresh news"
// //           </p>
// //         </div>

// //         {/* Status Message */}
// //         {status && (
// //           <div className="status-message">
// //             {status}
// //             {speechProgress > 0 && (
// //               <div className="speech-progress">
// //                 <div 
// //                   className="progress-bar" 
// //                   style={{ width: `${speechProgress}%` }}
// //                 ></div>
// //               </div>
// //             )}
// //           </div>
// //         )}

// //         {/* Controls */}
// //         <div className="news-controls">
// //           <button 
// //             className="control-btn refresh-btn"
// //             onClick={() => fetchNews()}
// //             disabled={loading || isReading}
// //           >
// //             🔄 {loading ? "Loading..." : "Refresh News"}
// //           </button>
          
// //           {isReading && (
// //             <button 
// //               className="control-btn stop-btn"
// //               onClick={stopSpeaking}
// //             >
// //               ⏹️ Stop Reading
// //             </button>
// //           )}
          
// //           {/* Voice Navigation Controls */}
// //           <div className="voice-nav-controls">
// //             <button 
// //               className="control-btn voice-nav-btn"
// //               onClick={() => {
// //                 if (news.length > 0) {
// //                   const prevIndex = currentArticleIndex === 0 ? news.length - 1 : currentArticleIndex - 1;
// //                   setCurrentArticleIndex(prevIndex);
// //                   if (voiceSpeak) {
// //                     voiceSpeak(`Previous article: ${news[prevIndex].title}`);
// //                   }
// //                 }
// //               }}
// //               disabled={news.length === 0}
// //             >
// //               ⏮️ Previous Article
// //             </button>
            
// //             <button 
// //               className="control-btn voice-nav-btn"
// //               onClick={() => {
// //                 if (news.length > 0) {
// //                   readArticle(news[currentArticleIndex]);
// //                 }
// //               }}
// //               disabled={news.length === 0 || isReading}
// //             >
// //               🔊 Read Current
// //             </button>
            
// //             <button 
// //               className="control-btn voice-nav-btn"
// //               onClick={() => {
// //                 if (news.length > 0) {
// //                   const nextIndex = (currentArticleIndex + 1) % news.length;
// //                   setCurrentArticleIndex(nextIndex);
// //                   if (voiceSpeak) {
// //                     voiceSpeak(`Next article: ${news[nextIndex].title}`);
// //                   }
// //                 }
// //               }}
// //               disabled={news.length === 0}
// //             >
// //               ⏭️ Next Article
// //             </button>
// //           </div>
// //         </div>

// //         {/* Current Article Indicator */}
// //         {news.length > 0 && (
// //           <div className="current-article-indicator">
// //             <h4>📄 Currently Selected Article</h4>
// //             <div className="selected-article">
// //               <strong>Article {currentArticleIndex + 1} of {news.length}</strong>
// //               <p>{news[currentArticleIndex].title}</p>
// //               <div className="article-meta">
// //                 <span>{news[currentArticleIndex].source?.name || "News Source"}</span>
// //                 <span>•</span>
// //                 <span>{formatDate(news[currentArticleIndex].publishedAt)}</span>
// //               </div>
// //               <div className="selected-article-actions">
// //                 <button 
// //                   className="action-btn read-summary-btn"
// //                   onClick={() => readArticleSummary(news[currentArticleIndex])}
// //                   disabled={isReading}
// //                 >
// //                   🎧 Read Summary
// //                 </button>
// //                 <button 
// //                   className="action-btn read-full-btn"
// //                   onClick={() => readArticle(news[currentArticleIndex])}
// //                   disabled={isReading}
// //                 >
// //                   📖 Read Full Article
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         )}

// //         {/* News Articles */}
// //         <div className="news-articles">
// //           <h3>📋 Latest News from Around the World</h3>
          
// //           {loading ? (
// //             <div className="loading-state">
// //               <div className="loading-spinner"></div>
// //               <p>Loading latest news articles...</p>
// //             </div>
// //           ) : news.length === 0 ? (
// //             <div className="empty-state">
// //               <p>No news articles found at the moment.</p>
// //               <button 
// //                 className="control-btn refresh-btn"
// //                 onClick={() => fetchNews()}
// //                 style={{ marginTop: '1rem' }}
// //               >
// //                 🔄 Try Again
// //               </button>
// //             </div>
// //           ) : (
// //             <div className="articles-grid">
// //               {news.map((article, index) => (
// //                 <div 
// //                   key={index} 
// //                   className={`article-card ${index === currentArticleIndex ? 'selected-article-card' : ''}`}
// //                   onClick={() => setCurrentArticleIndex(index)}
// //                 >
// //                   <div className="article-image">
// //                     <img 
// //                       src={article.urlToImage || getDefaultImage()} 
// //                       alt={article.title}
// //                       onError={(e) => {
// //                         e.target.src = getDefaultImage();
// //                       }}
// //                     />
// //                     {index === currentArticleIndex && (
// //                       <span className="current-indicator">🎤 CURRENT</span>
// //                     )}
// //                   </div>
                  
// //                   <div className="article-content">
// //                     <div className="article-header">
// //                       <span className="article-source">{article.source?.name || "News Source"}</span>
// //                       <span className="article-time">{formatDate(article.publishedAt)}</span>
// //                     </div>
                    
// //                     <h4 className="article-title">{article.title}</h4>
// //                     <p className="article-description">{article.description}</p>
                    
// //                     <div className="article-actions">
// //                       <button 
// //                         className="action-btn read-summary-btn"
// //                         onClick={(e) => {
// //                           e.stopPropagation();
// //                           readArticleSummary(article);
// //                         }}
// //                         disabled={isReading}
// //                       >
// //                         🎧 Read Summary
// //                       </button>
                      
// //                       <button 
// //                         className="action-btn read-full-btn"
// //                         onClick={(e) => {
// //                           e.stopPropagation();
// //                           readArticle(article);
// //                         }}
// //                         disabled={isReading}
// //                       >
// //                         📖 Read Full Article
// //                       </button>
// //                     </div>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           )}
// //         </div>

// //         {/* Currently Reading */}
// //         {currentArticle && isReading && (
// //           <div className="currently-reading">
// //             <h4>🔊 Currently Reading</h4>
// //             <div className="current-article">
// //               <h5>{currentArticle.title}</h5>
// //               <p>{currentArticle.source?.name || "News Source"} • {formatDate(currentArticle.publishedAt)}</p>
// //             </div>
// //           </div>
// //         )}

// //         {/* API Status */}
// //         <div className="api-status">
// //           <h4>🔑 News API Status</h4>
// //           <p>
// //             <strong>Articles Loaded:</strong> {news.length} articles
// //           </p>
// //           <p>
// //             <strong>API Source:</strong> NewsAPI.org
// //           </p>
// //           <p className="status-note">
// //             Connected to NewsAPI. Loading real-time news articles from trusted sources.
// //           </p>
// //         </div>

// //         {/* Voice Commands Help */}
// //         <div className="voice-commands-help">
// //           <h4>🎤 Voice Commands Guide</h4>
// //           <div className="commands-grid">
// //             <div className="command-category">
// //               <h5>Basic Reading</h5>
// //               <ul>
// //                 <li>"read news" - Read current article</li>
// //                 <li>"read article" - Read current article</li>
// //                 <li>"read headline" - Read just the title</li>
// //                 <li>"read title" - Read article title</li>
// //               </ul>
// //             </div>
// //             <div className="command-category">
// //               <h5>Summary & Full</h5>
// //               <ul>
// //                 <li>"read summary" - Read article summary</li>
// //                 <li>"read full article" - Read complete article</li>
// //                 <li>"summarize news" - Summarize article</li>
// //               </ul>
// //             </div>
// //             <div className="command-category">
// //               <h5>Navigation</h5>
// //               <ul>
// //                 <li>"next article" - Go to next article</li>
// //                 <li>"previous article" - Previous article</li>
// //                 <li>"first article" - Go to first article</li>
// //                 <li>"last article" - Go to last article</li>
// //               </ul>
// //             </div>
// //             <div className="command-category">
// //               <h5>Selection</h5>
// //               <ul>
// //                 <li>"read article 1" - Read first article</li>
// //                 <li>"read article 2" - Read second article</li>
// //                 <li>"read article 3" - Read third article</li>
// //                 <li>"current article" - Announce current</li>
// //               </ul>
// //             </div>
// //             <div className="command-category">
// //               <h5>Bulk Actions</h5>
// //               <ul>
// //                 <li>"list headlines" - Read all headlines</li>
// //                 <li>"read all articles" - Read all articles</li>
// //                 <li>"news count" - Number of articles</li>
// //               </ul>
// //             </div>
// //             <div className="command-category">
// //               <h5>Control</h5>
// //               <ul>
// //                 <li>"stop reading" - Stop current reading</li>
// //                 <li>"pause reading" - Pause reading</li>
// //                 <li>"resume reading" - Resume reading</li>
// //                 <li>"refresh news" - Refresh news feed</li>
// //               </ul>
// //             </div>
// //             <div className="command-category">
// //               <h5>Help</h5>
// //               <ul>
// //                 <li>"help" - General help</li>
// //                 <li>"news help" - Detailed news help</li>
// //                 <li>"what can i say" - Command suggestions</li>
// //                 <li>"list commands" - List main commands</li>
// //               </ul>
// //             </div>
// //             <div className="command-category">
// //               <h5>Most Important</h5>
// //               <ul>
// //                 <li>"read news"</li>
// //                 <li>"read summary"</li>
// //                 <li>"read full article"</li>
// //                 <li>"next article"</li>
// //                 <li>"previous article"</li>
// //                 <li>"read article 1"</li>
// //                 <li>"refresh news"</li>
// //                 <li>"stop reading"</li>
// //                 <li>"help"</li>
// //               </ul>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Status Bar */}
// //       <div className="status-bar">
// //         <p>
// //           {status} | 
// //           <span className="voice-status"> 🎤 Voice Active</span> | 
// //           <span> Article {news.length > 0 ? currentArticleIndex + 1 : 0} of {news.length}</span>
// //         </p>
// //       </div>
// //     </div>
// //   );
// // };

// // export default NewsReader;


// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { voiceService } from "../../services/voiceService";
// import "./NewsReader.css";

// const NewsReader = () => {
//   const [news, setNews] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [status, setStatus] = useState("Loading latest news...");
//   const [currentArticle, setCurrentArticle] = useState(null);
//   const [isSpeaking, setIsSpeaking] = useState(false);
//   const [speechProgress, setSpeechProgress] = useState(0);
//   const [currentArticleIndex, setCurrentArticleIndex] = useState(0);
//   const [spokenText, setSpokenText] = useState("");
//   const navigate = useNavigate();

//   const API_KEY = "2cab5e57d08f466d8acef970f683b3ca";
//   const BASE_URL = "https://newsapi.org/v2";

//   // Speech function - isolated from dashboard
//   const speak = (text, callback = null) => {
//     return new Promise((resolve) => {
//       const synth = window.speechSynthesis;
//       if (!synth) {
//         if (callback) callback();
//         resolve();
//         return;
//       }

//       // Cancel any ongoing speech
//       synth.cancel();
      
//       // Short delay before speaking
//       setTimeout(() => {
//         setIsSpeaking(true);
        
//         const utter = new SpeechSynthesisUtterance(text);
//         utter.rate = 0.8;
//         utter.pitch = 1;
//         utter.volume = 1;
        
//         utter.onstart = () => {
//           console.log("News Reader speaking:", text);
//         };
        
//         utter.onend = () => {
//           console.log("Finished speaking");
//           setIsSpeaking(false);
//           if (callback) callback();
//           resolve();
//         };
        
//         utter.onerror = (err) => {
//           console.warn("Speech interrupted (normal):", err.error);
//           setIsSpeaking(false);
//           resolve();
//         };
        
//         synth.speak(utter);
        
//         // Show progress for long texts
//         if (text.length > 100) {
//           setSpeechProgress(10);
//           const interval = setInterval(() => {
//             setSpeechProgress(prev => {
//               if (prev >= 90) {
//                 clearInterval(interval);
//                 return 90;
//               }
//               return prev + 5;
//             });
//           }, 1000);
          
//           utter.onend = () => {
//             clearInterval(interval);
//             setSpeechProgress(100);
//             setTimeout(() => {
//               setIsSpeaking(false);
//               setSpeechProgress(0);
//               if (callback) callback();
//               resolve();
//             }, 500);
//           };
//         }
//       }, 50);
//     });
//   };

//   // Stop speaking
//   const stopSpeaking = () => {
//     if ('speechSynthesis' in window) {
//       window.speechSynthesis.cancel();
//     }
//     setIsSpeaking(false);
//     setSpeechProgress(0);
//     setStatus("Reading stopped");
//   };

//   // Pause reading
//   const pauseReading = () => {
//     if ('speechSynthesis' in window && window.speechSynthesis.speaking) {
//       window.speechSynthesis.pause();
//       setStatus("Reading paused");
//       return "Reading paused";
//     }
//     return "Nothing is reading";
//   };

//   // Resume reading
//   const resumeReading = () => {
//     if ('speechSynthesis' in window && window.speechSynthesis.paused) {
//       window.speechSynthesis.resume();
//       setStatus("Reading resumed");
//       return "Reading resumed";
//     }
//     return "Nothing is paused";
//   };

//   // Read article function
//   const readArticle = (article) => {
//     setCurrentArticle(article);
//     const content = article.content || article.description || "";
//     const readingText = `Title: ${article.title}. Description: ${article.description}. ${content.substring(0, 500)}`;
//     setStatus(`Reading: ${article.title}`);
//     speak(readingText, () => {
//       setStatus(`Finished reading: ${article.title}`);
//     });
//   };

//   // Read article summary
//   const readArticleSummary = (article) => {
//     const summaryText = `Title: ${article.title}. Description: ${article.description}`;
//     setStatus(`Reading summary: ${article.title}`);
//     speak(summaryText);
//   };

//   // Read article title only
//   const readArticleTitle = (article) => {
//     const titleText = `Title: ${article.title}`;
//     setStatus(`Reading title: ${article.title}`);
//     speak(titleText);
//   };

//   // Read all headlines
//   const readAllHeadlines = () => {
//     if (news.length === 0) {
//       speak("No news articles available");
//       return;
//     }
    
//     const headlines = news.map((article, idx) => 
//       `Article ${idx + 1}: ${article.title}`
//     ).join('. ');
    
//     const headlinesText = `Top headlines: ${headlines}`;
//     setStatus("Reading all headlines");
//     speak(headlinesText);
//   };

//   // Read specific article by number
//   const readArticleByNumber = (number) => {
//     if (news.length === 0) {
//       return "No articles loaded yet";
//     }
    
//     const index = number - 1;
//     if (index >= 0 && index < news.length) {
//       setCurrentArticleIndex(index);
//       const article = news[index];
//       readArticle(article);
//       return `Reading article ${number}: ${article.title}`;
//     }
//     return `Article ${number} not available. There are only ${news.length} articles.`;
//   };

//   // Read next article
//   const readNextArticle = () => {
//     if (news.length === 0) {
//       return "No articles loaded yet";
//     }
    
//     const nextIndex = (currentArticleIndex + 1) % news.length;
//     setCurrentArticleIndex(nextIndex);
//     const article = news[nextIndex];
//     return `Next article: ${article.title}. Article ${nextIndex + 1} of ${news.length}`;
//   };

//   // Read previous article
//   const readPreviousArticle = () => {
//     if (news.length === 0) {
//       return "No articles loaded yet";
//     }
    
//     const prevIndex = currentArticleIndex === 0 ? news.length - 1 : currentArticleIndex - 1;
//     setCurrentArticleIndex(prevIndex);
//     const article = news[prevIndex];
//     return `Previous article: ${article.title}. Article ${prevIndex + 1} of ${news.length}`;
//   };

//   // Go to first article
//   const goToFirstArticle = () => {
//     if (news.length === 0) {
//       return "No articles loaded yet";
//     }
    
//     setCurrentArticleIndex(0);
//     const article = news[0];
//     return `First article: ${article.title}. Article 1 of ${news.length}`;
//   };

//   // Go to last article
//   const goToLastArticle = () => {
//     if (news.length === 0) {
//       return "No articles loaded yet";
//     }
    
//     setCurrentArticleIndex(news.length - 1);
//     const article = news[news.length - 1];
//     return `Last article: ${article.title}. Article ${news.length} of ${news.length}`;
//   };

//   // Get current article info
//   const getCurrentArticleInfo = () => {
//     if (news.length === 0) {
//       return "No articles loaded yet";
//     }
    
//     const article = news[currentArticleIndex];
//     return `Current article ${currentArticleIndex + 1} of ${news.length}: ${article.title}`;
//   };

//   // Get article count
//   const getArticleCount = () => {
//     if (news.length === 0) {
//       return "No articles loaded yet";
//     } else if (news.length === 1) {
//       return "There is 1 article loaded";
//     } else {
//       return `There are ${news.length} articles loaded`;
//     }
//   };

//   // Read all articles sequentially
//   const readAllArticles = () => {
//     if (news.length === 0) {
//       return "No articles to read";
//     }
    
//     // Start reading from current index
//     let currentIdx = currentArticleIndex;
//     const readSequentially = () => {
//       if (currentIdx < news.length) {
//         const article = news[currentIdx];
//         speak(`Article ${currentIdx + 1} of ${news.length}: ${article.title}. ${article.description}`, () => {
//           currentIdx++;
//           setTimeout(readSequentially, 1000);
//         });
//       }
//     };
    
//     readSequentially();
//     return `Reading all ${news.length} articles sequentially`;
//   };

//   // Fetch news from NewsAPI
//   const fetchNews = async () => {
//     setLoading(true);
//     setStatus("Loading latest news...");
    
//     try {
//       let url = `${BASE_URL}/top-headlines?country=us&pageSize=20&apiKey=${API_KEY}`;
//       const response = await axios.get(url);
      
//       if (response.data.articles && response.data.articles.length > 0) {
//         const validArticles = response.data.articles.filter(
//           article => article && 
//                     article.title && 
//                     article.description && 
//                     article.title !== "[Removed]" &&
//                     !article.title.includes("Removed") &&
//                     article.source?.name
//         );
        
//         if (validArticles.length > 0) {
//           setNews(validArticles);
//           setCurrentArticleIndex(0);
//           setStatus(`Loaded ${validArticles.length} news articles`);
//           speak(`Loaded ${validArticles.length} news articles`);
//           setLoading(false);
//           return;
//         }
//       }
      
//       // Fallback to everything endpoint
//       await fetchEverythingNews();
      
//     } catch (error) {
//       console.error("Error fetching news:", error);
//       await fetchEverythingNews();
//     }
//   };

//   // Fallback news fetch
//   const fetchEverythingNews = async () => {
//     try {
//       const url = `${BASE_URL}/everything?q=technology&language=en&sortBy=publishedAt&pageSize=20&apiKey=${API_KEY}`;
//       const response = await axios.get(url);
      
//       if (response.data.articles && response.data.articles.length > 0) {
//         const validArticles = response.data.articles.filter(
//           article => article && 
//                     article.title && 
//                     article.description && 
//                     article.title !== "[Removed]" &&
//                     !article.title.includes("Removed")
//         );
        
//         if (validArticles.length > 0) {
//           setNews(validArticles);
//           setCurrentArticleIndex(0);
//           setStatus(`Loaded ${validArticles.length} news articles`);
//           setLoading(false);
//           return;
//         }
//       }
      
//       setNews([]);
//       setStatus("No articles found");
//       speak("Unable to load news articles");
//       setLoading(false);
      
//     } catch (error) {
//       console.error("Error in fallback fetch:", error);
//       setNews([]);
//       setStatus("Error loading news");
//       speak("Error loading news");
//       setLoading(false);
//     }
//   };

//   // Initialize news reader voice commands
//   const initializeNewsVoiceCommands = () => {
//     if (!voiceService.isAvailable()) {
//       console.log("Voice service not available in news reader");
//       return;
//     }

//     console.log("Initializing News Reader voice commands...");
    
//     // Clear any existing commands
//     voiceService.clearCommands();
//     voiceService.setFeature('news');
    
//     // BASIC READING COMMANDS
//     voiceService.registerCommand("read news", async () => {
//       console.log("Command: read news");
//       if (news.length > 0) {
//         const article = news[currentArticleIndex];
//         await speak(`Reading article ${currentArticleIndex + 1}`);
//         readArticle(article);
//       } else {
//         await speak("No articles available. Please refresh the news.");
//       }
//     });
    
//     voiceService.registerCommand("read article", async () => {
//       console.log("Command: read article");
//       if (news.length > 0) {
//         const article = news[currentArticleIndex];
//         await speak(`Reading current article`);
//         readArticle(article);
//       } else {
//         await speak("No article available");
//       }
//     });
    
//     voiceService.registerCommand("read headline", async () => {
//       console.log("Command: read headline");
//       if (news.length > 0) {
//         const article = news[currentArticleIndex];
//         readArticleTitle(article);
//       } else {
//         await speak("No headline available");
//       }
//     });
    
//     voiceService.registerCommand("read title", async () => {
//       console.log("Command: read title");
//       if (news.length > 0) {
//         const article = news[currentArticleIndex];
//         readArticleTitle(article);
//       } else {
//         await speak("No title available");
//       }
//     });
    
//     // SUMMARY COMMANDS
//     voiceService.registerCommand("read summary", async () => {
//       console.log("Command: read summary");
//       if (news.length > 0) {
//         const article = news[currentArticleIndex];
//         await speak("Reading article summary");
//         readArticleSummary(article);
//       } else {
//         await speak("No article available");
//       }
//     });
    
//     voiceService.registerCommand("read short summary", async () => {
//       console.log("Command: read short summary");
//       if (news.length > 0) {
//         const article = news[currentArticleIndex];
//         readArticleSummary(article);
//       } else {
//         await speak("No article available");
//       }
//     });
    
//     voiceService.registerCommand("summarize news", async () => {
//       console.log("Command: summarize news");
//       if (news.length > 0) {
//         const article = news[currentArticleIndex];
//         await speak("Summarizing article");
//         readArticleSummary(article);
//       } else {
//         await speak("No article to summarize");
//       }
//     });
    
//     // FULL ARTICLE COMMANDS
//     voiceService.registerCommand("read full article", async () => {
//       console.log("Command: read full article");
//       if (news.length > 0) {
//         const article = news[currentArticleIndex];
//         await speak("Reading full article");
//         readArticle(article);
//       } else {
//         await speak("No article available");
//       }
//     });
    
//     voiceService.registerCommand("read complete article", async () => {
//       console.log("Command: read complete article");
//       if (news.length > 0) {
//         const article = news[currentArticleIndex];
//         readArticle(article);
//       } else {
//         await speak("No article available");
//       }
//     });
    
//     voiceService.registerCommand("read entire article", async () => {
//       console.log("Command: read entire article");
//       if (news.length > 0) {
//         const article = news[currentArticleIndex];
//         await speak("Reading entire article");
//         readArticle(article);
//       } else {
//         await speak("No article available");
//       }
//     });
    
//     // NAVIGATION COMMANDS
//     voiceService.registerCommand("next article", async () => {
//       console.log("Command: next article");
//       const response = readNextArticle();
//       await speak(response);
//     });
    
//     voiceService.registerCommand("previous article", async () => {
//       console.log("Command: previous article");
//       const response = readPreviousArticle();
//       await speak(response);
//     });
    
//     voiceService.registerCommand("next news", async () => {
//       console.log("Command: next news");
//       const response = readNextArticle();
//       await speak(response);
//     });
    
//     voiceService.registerCommand("previous news", async () => {
//       console.log("Command: previous news");
//       const response = readPreviousArticle();
//       await speak(response);
//     });
    
//     voiceService.registerCommand("go to next", async () => {
//       console.log("Command: go to next");
//       const response = readNextArticle();
//       await speak(response);
//     });
    
//     voiceService.registerCommand("go to previous", async () => {
//       console.log("Command: go to previous");
//       const response = readPreviousArticle();
//       await speak(response);
//     });
    
//     voiceService.registerCommand("first article", async () => {
//       console.log("Command: first article");
//       const response = goToFirstArticle();
//       await speak(response);
//     });
    
//     voiceService.registerCommand("last article", async () => {
//       console.log("Command: last article");
//       const response = goToLastArticle();
//       await speak(response);
//     });
    
//     // ARTICLE SELECTION BY NUMBER
//     for (let i = 1; i <= 20; i++) {
//       // Article 1, Article 2, etc.
//       voiceService.registerCommand(`article ${i}`, async () => {
//         console.log(`Command: article ${i}`);
//         const response = readArticleByNumber(i);
//         await speak(response);
//       });
      
//       // Read article 1, Read article 2, etc.
//       voiceService.registerCommand(`read article ${i}`, async () => {
//         console.log(`Command: read article ${i}`);
//         const response = readArticleByNumber(i);
//         await speak(response);
//       });
      
//       // Read first, Read second, etc.
//       const numbers = ["first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth", "ninth", "tenth"];
//       if (i <= 10) {
//         voiceService.registerCommand(`read ${numbers[i-1]} article`, async () => {
//           console.log(`Command: read ${numbers[i-1]} article`);
//           const response = readArticleByNumber(i);
//           await speak(response);
//         });
        
//         voiceService.registerCommand(`${numbers[i-1]} article`, async () => {
//           console.log(`Command: ${numbers[i-1]} article`);
//           const response = readArticleByNumber(i);
//           await speak(response);
//         });
//       }
//     }
    
//     // BULK ACTIONS
//     voiceService.registerCommand("read all articles", async () => {
//       console.log("Command: read all articles");
//       const response = readAllArticles();
//       await speak(response);
//     });
    
//     voiceService.registerCommand("read all headlines", async () => {
//       console.log("Command: read all headlines");
//       readAllHeadlines();
//     });
    
//     voiceService.registerCommand("list headlines", async () => {
//       console.log("Command: list headlines");
//       readAllHeadlines();
//     });
    
//     voiceService.registerCommand("news headlines", async () => {
//       console.log("Command: news headlines");
//       readAllHeadlines();
//     });
    
//     voiceService.registerCommand("headlines", async () => {
//       console.log("Command: headlines");
//       readAllHeadlines();
//     });
    
//     // CONTROL COMMANDS
//     voiceService.registerCommand("stop reading", async () => {
//       console.log("Command: stop reading");
//       stopSpeaking();
//       await speak("Stopped reading");
//     });
    
//     voiceService.registerCommand("stop", async () => {
//       console.log("Command: stop");
//       stopSpeaking();
//       await speak("Stopped");
//     });
    
//     voiceService.registerCommand("pause reading", async () => {
//       console.log("Command: pause reading");
//       const response = pauseReading();
//       await speak(response);
//     });
    
//     voiceService.registerCommand("pause", async () => {
//       console.log("Command: pause");
//       const response = pauseReading();
//       await speak(response);
//     });
    
//     voiceService.registerCommand("resume reading", async () => {
//       console.log("Command: resume reading");
//       const response = resumeReading();
//       await speak(response);
//     });
    
//     voiceService.registerCommand("resume", async () => {
//       console.log("Command: resume");
//       const response = resumeReading();
//       await speak(response);
//     });
    
//     voiceService.registerCommand("continue reading", async () => {
//       console.log("Command: continue reading");
//       const response = resumeReading();
//       await speak(response);
//     });
    
//     // REFRESH COMMANDS
//     voiceService.registerCommand("refresh news", async () => {
//       console.log("Command: refresh news");
//       await speak("Refreshing news feed");
//       fetchNews();
//     });
    
//     voiceService.registerCommand("reload news", async () => {
//       console.log("Command: reload news");
//       await speak("Reloading news");
//       fetchNews();
//     });
    
//     voiceService.registerCommand("update news", async () => {
//       console.log("Command: update news");
//       await speak("Updating news");
//       fetchNews();
//     });
    
//     voiceService.registerCommand("fetch latest news", async () => {
//       console.log("Command: fetch latest news");
//       await speak("Fetching latest news");
//       fetchNews();
//     });
    
//     // INFORMATION COMMANDS
//     voiceService.registerCommand("current article", async () => {
//       console.log("Command: current article");
//       const response = getCurrentArticleInfo();
//       await speak(response);
//     });
    
//     voiceService.registerCommand("current news", async () => {
//       console.log("Command: current news");
//       const response = getCurrentArticleInfo();
//       await speak(response);
//     });
    
//     voiceService.registerCommand("news count", async () => {
//       console.log("Command: news count");
//       const response = getArticleCount();
//       await speak(response);
//     });
    
//     voiceService.registerCommand("how many articles", async () => {
//       console.log("Command: how many articles");
//       const response = getArticleCount();
//       await speak(response);
//     });
    
//     voiceService.registerCommand("article count", async () => {
//       console.log("Command: article count");
//       const response = getArticleCount();
//       await speak(response);
//     });
    
//     // HELP COMMANDS
//     voiceService.registerCommand("help", async () => {
//       console.log("Command: help");
//       const helpText = "News Reader Commands: " +
//         "Say 'read news' to read current article. " +
//         "'read summary' for article summary. " +
//         "'read full article' for complete article. " +
//         "'next article' or 'previous article' to navigate. " +
//         "'article 1' to select specific article. " +
//         "'read all headlines' for all titles. " +
//         "'stop reading' to stop. " +
//         "'refresh news' to update. " +
//         "'current article' for current info. " +
//         "'news count' for article count.";
//       await speak(helpText);
//     });
    
//     voiceService.registerCommand("news help", async () => {
//       console.log("Command: news help");
//       const helpText = "Detailed News Help: " +
//         "READING: read news, read summary, read full article, read headline. " +
//         "NAVIGATION: next article, previous article, first article, last article. " +
//         "SELECTION: article 1, article 2 up to article 20. " +
//         "READ first article, read second article. " +
//         "CONTROL: stop reading, pause reading, resume reading. " +
//         "BULK: read all headlines, list headlines. " +
//         "INFO: current article, news count. " +
//         "REFRESH: refresh news, update news. " +
//         "NAVIGATE: dashboard, logout.";
//       await speak(helpText);
//     });
    
//     voiceService.registerCommand("what can i say", async () => {
//       console.log("Command: what can i say");
//       await speak("Try: read news, next article, read summary, read full article, stop reading, refresh news, article 1, current article, help");
//     });
    
//     voiceService.registerCommand("list commands", async () => {
//       console.log("Command: list commands");
//       await speak("Main commands: read news, read summary, read full article, next article, previous article, article 1, refresh news, stop reading, help");
//     });
    
//     // DASHBOARD & LOGOUT COMMANDS (ONLY THESE WORK FROM DASHBOARD)
//     voiceService.registerCommand("dashboard", async () => {
//       console.log("Command: dashboard");
//       await speak("Going back to dashboard");
//       navigate("/dashboard");
//     });
    
//     voiceService.registerCommand("go to dashboard", async () => {
//       console.log("Command: go to dashboard");
//       await speak("Going to dashboard");
//       navigate("/dashboard");
//     });
    
//     voiceService.registerCommand("back to dashboard", async () => {
//       console.log("Command: back to dashboard");
//       await speak("Returning to dashboard");
//       navigate("/dashboard");
//     });
    
//     voiceService.registerCommand("main menu", async () => {
//       console.log("Command: main menu");
//       await speak("Going to main menu");
//       navigate("/dashboard");
//     });
    
//     voiceService.registerCommand("home", async () => {
//       console.log("Command: home");
//       await speak("Going home");
//       navigate("/dashboard");
//     });
    
//     // LOGOUT COMMANDS
//     voiceService.registerCommand("logout", async () => {
//       console.log("Command: logout");
//       await handleLogout();
//     });
    
//     voiceService.registerCommand("sign out", async () => {
//       console.log("Command: sign out");
//       await handleLogout();
//     });
    
//     voiceService.registerCommand("log out", async () => {
//       console.log("Command: log out");
//       await handleLogout();
//     });

//     // Set up voice result callback
//     voiceService.onResultCallback = (transcript) => {
//       console.log("News Reader voice input:", transcript);
//       setSpokenText(transcript);
//     };
    
//     // Start listening
//     if (!voiceService.isListening) {
//       voiceService.startListening();
//     }
    
//     // Welcome message
//     setTimeout(() => {
//       if (news.length > 0) {
//         speak(`News Reader loaded with ${news.length} articles. Say "read news" to start or "help" for commands.`);
//       } else {
//         speak("News Reader is ready. Say 'refresh news' to load articles or 'help' for commands.");
//       }
//     }, 1000);
    
//     console.log("✅ News Reader voice commands initialized");
//   };

//   // Initialize voice commands on component mount
//   useEffect(() => {
//     initializeNewsVoiceCommands();
    
//     // Clean up on unmount
//     return () => {
//       console.log("Cleaning up News Reader voice commands");
//       voiceService.stopListening();
//       voiceService.clearCommands();
//     };
//   }, [news, currentArticleIndex]);

//   // Fetch news on mount
//   useEffect(() => {
//     fetchNews();
//   }, []);

//   // Handle logout
//   const handleLogout = async () => {
//     stopSpeaking();
//     setStatus("Logging out...");

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
//       localStorage.clear();
//       setTimeout(() => navigate("/"), 1500);
//     }
//   };

//   const handleBackToDashboard = () => {
//     stopSpeaking();
//     navigate("/dashboard");
//   };

//   // Format date
//   const formatDate = (dateString) => {
//     try {
//       const date = new Date(dateString);
//       const now = new Date();
//       const diffMs = now - date;
//       const diffMins = Math.floor(diffMs / 60000);
//       const diffHours = Math.floor(diffMs / 3600000);
//       const diffDays = Math.floor(diffMs / 86400000);

//       if (diffMins < 60) {
//         return `${diffMins} min ago`;
//       } else if (diffHours < 24) {
//         return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
//       } else {
//         return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
//       }
//     } catch {
//       return "Recently";
//     }
//   };

//   // Get default image
//   const getDefaultImage = () => {
//     const defaultImages = [
//       "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=400",
//       "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400",
//       "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400",
//       "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400",
//       "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=400"
//     ];
//     return defaultImages[Math.floor(Math.random() * defaultImages.length)];
//   };

//   // Get user from localStorage
//   const user = JSON.parse(localStorage.getItem("user") || "{}");

//   return (
//     <div className="news-reader-container">
//       {/* Fixed Header */}
//       <header className="dashboard-header fixed-header">
//         <div className="header-content">
//           <div className="header-left">
//             <button className="back-btn" onClick={handleBackToDashboard}>
//               ← Back to Dashboard
//             </button>
//             <h1 className="logo">Vision Assist</h1>
//           </div>
//           <div className="header-center">
//             {spokenText && (
//               <div className="spoken-text-display">
//                 <span className="spoken-label">🎤 Heard:</span> <strong>{spokenText}</strong>
//               </div>
//             )}
//           </div>
//           <div className="user-menu">
//             {user && <span className="welcome-text">Welcome, {user.name}</span>}
//             <button className="logout-btn" onClick={handleLogout}>
//               Logout
//             </button>
//           </div>
//         </div>
//       </header>

//       <div className="news-content">
//         {/* Voice Status */}
//         <div className="voice-status-indicator">
//           <span className="voice-icon">🎤</span>
//           <span className="voice-text">Voice Active: Say "read news", "article 1", "next article", etc.</span>
//           <button 
//             className="voice-help-btn"
//             onClick={() => speak("News commands: read news, next article, previous article, read summary, stop reading, refresh news, article 1, current article, news count, help")}
//           >
//             Voice Help
//           </button>
//         </div>

//         <div className="news-header">
//           <h2>📰 News Reader 🎤</h2>
//           <p>Stay informed with the latest news, read aloud for your convenience</p>
//           <p className="voice-instruction">
//             <strong>Voice Commands Active:</strong> Try saying "read news", "article 1", "next article", or "stop reading"
//           </p>
//         </div>

//         {/* Status Message */}
//         {status && (
//           <div className="status-message">
//             {status}
//             {speechProgress > 0 && (
//               <div className="speech-progress">
//                 <div 
//                   className="progress-bar" 
//                   style={{ width: `${speechProgress}%` }}
//                 ></div>
//               </div>
//             )}
//           </div>
//         )}

//         {/* Controls */}
//         <div className="news-controls">
//           <button 
//             className="control-btn refresh-btn"
//             onClick={() => fetchNews()}
//             disabled={loading || isSpeaking}
//           >
//             🔄 {loading ? "Loading..." : "Refresh News"}
//           </button>
          
//           {isSpeaking && (
//             <button 
//               className="control-btn stop-btn"
//               onClick={stopSpeaking}
//             >
//               ⏹️ Stop Reading
//             </button>
//           )}
          
//           <div className="voice-nav-controls">
//             <button 
//               className="control-btn voice-nav-btn"
//               onClick={() => {
//                 if (news.length > 0) {
//                   const prevIndex = currentArticleIndex === 0 ? news.length - 1 : currentArticleIndex - 1;
//                   setCurrentArticleIndex(prevIndex);
//                   speak(`Previous article: ${news[prevIndex].title}`);
//                 }
//               }}
//               disabled={news.length === 0}
//             >
//               ⏮️ Previous
//             </button>
            
//             <button 
//               className="control-btn voice-nav-btn"
//               onClick={() => {
//                 if (news.length > 0) {
//                   readArticle(news[currentArticleIndex]);
//                 }
//               }}
//               disabled={news.length === 0 || isSpeaking}
//             >
//               🔊 Read Current
//             </button>
            
//             <button 
//               className="control-btn voice-nav-btn"
//               onClick={() => {
//                 if (news.length > 0) {
//                   const nextIndex = (currentArticleIndex + 1) % news.length;
//                   setCurrentArticleIndex(nextIndex);
//                   speak(`Next article: ${news[nextIndex].title}`);
//                 }
//               }}
//               disabled={news.length === 0}
//             >
//               ⏭️ Next
//             </button>
//           </div>
//         </div>

//         {/* Current Article Indicator */}
//         {news.length > 0 && (
//           <div className="current-article-indicator">
//             <h4>📄 Currently Selected Article</h4>
//             <div className="selected-article">
//               <strong>Article {currentArticleIndex + 1} of {news.length}</strong>
//               <p>{news[currentArticleIndex].title}</p>
//               <div className="article-meta">
//                 <span>{news[currentArticleIndex].source?.name || "News Source"}</span>
//                 <span>•</span>
//                 <span>{formatDate(news[currentArticleIndex].publishedAt)}</span>
//               </div>
//               <div className="selected-article-actions">
//                 <button 
//                   className="action-btn read-summary-btn"
//                   onClick={() => readArticleSummary(news[currentArticleIndex])}
//                   disabled={isSpeaking}
//                 >
//                   🎧 Read Summary
//                 </button>
//                 <button 
//                   className="action-btn read-full-btn"
//                   onClick={() => readArticle(news[currentArticleIndex])}
//                   disabled={isSpeaking}
//                 >
//                   📖 Read Full Article
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* News Articles */}
//         <div className="news-articles">
//           <h3>📋 Latest News Articles</h3>
          
//           {loading ? (
//             <div className="loading-state">
//               <div className="loading-spinner"></div>
//               <p>Loading latest news...</p>
//             </div>
//           ) : news.length === 0 ? (
//             <div className="empty-state">
//               <p>No news articles found.</p>
//               <button 
//                 className="control-btn refresh-btn"
//                 onClick={() => fetchNews()}
//                 style={{ marginTop: '1rem' }}
//               >
//                 🔄 Try Again
//               </button>
//             </div>
//           ) : (
//             <div className="articles-grid">
//               {news.map((article, index) => (
//                 <div 
//                   key={index} 
//                   className={`article-card ${index === currentArticleIndex ? 'selected-article-card' : ''}`}
//                   onClick={() => setCurrentArticleIndex(index)}
//                 >
//                   <div className="article-image">
//                     <img 
//                       src={article.urlToImage || getDefaultImage()} 
//                       alt={article.title}
//                       onError={(e) => {
//                         e.target.src = getDefaultImage();
//                       }}
//                     />
//                     {index === currentArticleIndex && (
//                       <span className="current-indicator">🎤 CURRENT</span>
//                     )}
//                   </div>
                  
//                   <div className="article-content">
//                     <div className="article-header">
//                       <span className="article-source">{article.source?.name || "News Source"}</span>
//                       <span className="article-time">{formatDate(article.publishedAt)}</span>
//                     </div>
                    
//                     <h4 className="article-title">{article.title}</h4>
//                     <p className="article-description">{article.description}</p>
                    
//                     <div className="article-actions">
//                       <button 
//                         className="action-btn read-summary-btn"
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           readArticleSummary(article);
//                         }}
//                         disabled={isSpeaking}
//                       >
//                         🎧 Summary
//                       </button>
                      
//                       <button 
//                         className="action-btn read-full-btn"
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           readArticle(article);
//                         }}
//                         disabled={isSpeaking}
//                       >
//                         📖 Full Article
//                       </button>
                      
//                       <button 
//                         className="action-btn voice-btn"
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           speak(`Article ${index + 1}: ${article.title}`);
//                         }}
//                       >
//                         🔢 Article {index + 1}
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Currently Reading */}
//         {currentArticle && isSpeaking && (
//           <div className="currently-reading">
//             <h4>🔊 Currently Reading</h4>
//             <div className="current-article">
//               <h5>{currentArticle.title}</h5>
//               <p>{currentArticle.source?.name || "News Source"} • {formatDate(currentArticle.publishedAt)}</p>
//             </div>
//           </div>
//         )}

//         {/* Voice Commands Help */}
//         <div className="voice-commands-help">
//           <h4>🎤 Voice Commands</h4>
//           <div className="commands-grid">
//             <div className="command-category">
//               <h5>Reading</h5>
//               <ul>
//                 <li><strong>"read news"</strong> - Read current article</li>
//                 <li><strong>"read summary"</strong> - Read summary</li>
//                 <li><strong>"read full article"</strong> - Read complete</li>
//                 <li><strong>"read headline"</strong> - Read title only</li>
//               </ul>
//             </div>
//             <div className="command-category">
//               <h5>Navigation</h5>
//               <ul>
//                 <li><strong>"next article"</strong> - Go to next</li>
//                 <li><strong>"previous article"</strong> - Go to previous</li>
//                 <li><strong>"first article"</strong> - First article</li>
//                 <li><strong>"last article"</strong> - Last article</li>
//               </ul>
//             </div>
//             <div className="command-category">
//               <h5>Selection</h5>
//               <ul>
//                 <li><strong>"article 1"</strong> - Select article 1</li>
//                 <li><strong>"article 2"</strong> - Select article 2</li>
//                 <li><strong>"read article 1"</strong> - Read article 1</li>
//                 <li><strong>"read first article"</strong> - Read first</li>
//               </ul>
//             </div>
//             <div className="command-category">
//               <h5>Control</h5>
//               <ul>
//                 <li><strong>"stop reading"</strong> - Stop speech</li>
//                 <li><strong>"pause reading"</strong> - Pause speech</li>
//                 <li><strong>"resume reading"</strong> - Resume speech</li>
//                 <li><strong>"refresh news"</strong> - Update articles</li>
//               </ul>
//             </div>
//             <div className="command-category">
//               <h5>Information</h5>
//               <ul>
//                 <li><strong>"current article"</strong> - Announce current</li>
//                 <li><strong>"news count"</strong> - Article count</li>
//                 <li><strong>"how many articles"</strong> - Count articles</li>
//                 <li><strong>"article count"</strong> - Count articles</li>
//               </ul>
//             </div>
//             <div className="command-category">
//               <h5>Bulk Actions</h5>
//               <ul>
//                 <li><strong>"read all headlines"</strong> - All titles</li>
//                 <li><strong>"list headlines"</strong> - List titles</li>
//                 <li><strong>"headlines"</strong> - Read headlines</li>
//                 <li><strong>"read all articles"</strong> - Read all</li>
//               </ul>
//             </div>
//             <div className="command-category">
//               <h5>Help & Navigation</h5>
//               <ul>
//                 <li><strong>"help"</strong> - General help</li>
//                 <li><strong>"news help"</strong> - Detailed help</li>
//                 <li><strong>"dashboard"</strong> - Go to dashboard</li>
//                 <li><strong>"logout"</strong> - Sign out</li>
//               </ul>
//             </div>
//             <div className="command-category">
//               <h5>Most Used</h5>
//               <ul>
//                 <li>1. "read news"</li>
//                 <li>2. "next article"</li>
//                 <li>3. "article 1"</li>
//                 <li>4. "stop reading"</li>
//                 <li>5. "refresh news"</li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Status Bar */}
//       <div className="status-bar">
//         <p>
//           {status} | 
//           <span className="voice-status"> 🎤 News Voice Active</span> | 
//           <span> Article {news.length > 0 ? currentArticleIndex + 1 : 0} of {news.length}</span>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default NewsReader;



import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { voiceService } from "../../services/voiceService";
import { createNewsVoiceCommands } from "../../voice-commands/newsVoiceCommands";
import "./NewsReader.css";

const NewsReader = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("Loading latest news...");
  const [currentArticle, setCurrentArticle] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechProgress, setSpeechProgress] = useState(0);
  const [currentArticleIndex, setCurrentArticleIndex] = useState(0);
  const [spokenText, setSpokenText] = useState("");
  const navigate = useNavigate();
  
  const newsLoadedRef = useRef(false);
  const voiceInitializedRef = useRef(false);
  const isMountedRef = useRef(true);

  const API_KEY = "2cab5e57d08f466d8acef970f683b3ca";
  const BASE_URL = "https://newsapi.org/v2";

  // Speech function - isolated from dashboard
  const speak = (text, callback = null) => {
    return new Promise((resolve) => {
      const synth = window.speechSynthesis;
      if (!synth) {
        if (callback) callback();
        resolve();
        return;
      }

      // Wait if speech is already in progress
      if (synth.speaking) {
        setTimeout(() => {
          speak(text, callback).then(resolve);
        }, 500);
        return;
      }

      // Cancel any ongoing speech
      synth.cancel();
      
      // Short delay before speaking
      setTimeout(() => {
        setIsSpeaking(true);
        
        const utter = new SpeechSynthesisUtterance(text);
        utter.rate = 0.8;
        utter.pitch = 1;
        utter.volume = 1;
        
        utter.onstart = () => {
          console.log("News Reader speaking:", text.substring(0, 100) + "...");
        };
        
        utter.onend = () => {
          console.log("Finished speaking");
          setIsSpeaking(false);
          if (callback) callback();
          resolve();
        };
        
        utter.onerror = (err) => {
          console.log("Speech event:", err.error === 'interrupted' ? "Speech interrupted (normal)" : err.error);
          setIsSpeaking(false);
          resolve();
        };
        
        synth.speak(utter);
        
        // Show progress for long texts
        if (text.length > 100) {
          setSpeechProgress(10);
          const interval = setInterval(() => {
            setSpeechProgress(prev => {
              if (prev >= 90) {
                clearInterval(interval);
                return 90;
              }
              return prev + 5;
            });
          }, 1000);
          
          utter.onend = () => {
            clearInterval(interval);
            setSpeechProgress(100);
            setTimeout(() => {
              setIsSpeaking(false);
              setSpeechProgress(0);
              if (callback) callback();
              resolve();
            }, 500);
          };
        }
      }, 50);
    });
  };

  // Stop speaking
  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    setSpeechProgress(0);
    setStatus("Reading stopped");
  };

  // Pause reading
  const pauseReading = () => {
    if ('speechSynthesis' in window && window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
      setStatus("Reading paused");
      return "Reading paused";
    }
    return "Nothing is reading";
  };

  // Resume reading
  const resumeReading = () => {
    if ('speechSynthesis' in window && window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setStatus("Reading resumed");
      return "Reading resumed";
    }
    return "Nothing is paused";
  };

  // Read article function
  const readArticle = (article) => {
    if (!article) return;
    
    setCurrentArticle(article);
    const content = article.content || article.description || "";
    const readingText = `Title: ${article.title}. Description: ${article.description}. ${content.substring(0, 500)}`;
    setStatus(`Reading: ${article.title}`);
    speak(readingText, () => {
      setStatus(`Finished reading: ${article.title}`);
    });
  };

  // Read article summary
  const readArticleSummary = (article) => {
    if (!article) return;
    
    const summaryText = `Title: ${article.title}. Description: ${article.description}`;
    setStatus(`Reading summary: ${article.title}`);
    speak(summaryText);
  };

  // Read article title only
  const readArticleTitle = (article) => {
    if (!article) return;
    
    const titleText = `Title: ${article.title}`;
    setStatus(`Reading title: ${article.title}`);
    speak(titleText);
  };

  // Read all headlines
  const readAllHeadlines = () => {
    if (news.length === 0) {
      speak("No news articles available");
      return;
    }
    
    const headlines = news.map((article, idx) => 
      `Article ${idx + 1}: ${article.title}`
    ).join('. ');
    
    const headlinesText = `Top headlines: ${headlines}`;
    setStatus("Reading all headlines");
    speak(headlinesText);
  };

  // Read specific article by number
  const readArticleByNumber = (number) => {
    if (news.length === 0) {
      speak("No articles loaded yet");
      return "No articles loaded yet";
    }
    
    const index = number - 1;
    if (index >= 0 && index < news.length) {
      setCurrentArticleIndex(index);
      const article = news[index];
      readArticle(article);
      return `Reading article ${number}: ${article.title}`;
    }
    speak(`Article ${number} not available. There are only ${news.length} articles.`);
    return `Article ${number} not available. There are only ${news.length} articles.`;
  };

  // Read next article
  const readNextArticle = () => {
    if (news.length === 0) {
      speak("No articles loaded yet");
      return "No articles loaded yet";
    }
    
    const nextIndex = (currentArticleIndex + 1) % news.length;
    setCurrentArticleIndex(nextIndex);
    const article = news[nextIndex];
    speak(`Next article: ${article.title}. Article ${nextIndex + 1} of ${news.length}`);
    return `Next article: ${article.title}. Article ${nextIndex + 1} of ${news.length}`;
  };

  // Read previous article
  const readPreviousArticle = () => {
    if (news.length === 0) {
      speak("No articles loaded yet");
      return "No articles loaded yet";
    }
    
    const prevIndex = currentArticleIndex === 0 ? news.length - 1 : currentArticleIndex - 1;
    setCurrentArticleIndex(prevIndex);
    const article = news[prevIndex];
    speak(`Previous article: ${article.title}. Article ${prevIndex + 1} of ${news.length}`);
    return `Previous article: ${article.title}. Article ${prevIndex + 1} of ${news.length}`;
  };

  // Go to first article
  const goToFirstArticle = () => {
    if (news.length === 0) {
      speak("No articles loaded yet");
      return "No articles loaded yet";
    }
    
    setCurrentArticleIndex(0);
    const article = news[0];
    speak(`First article: ${article.title}. Article 1 of ${news.length}`);
    return `First article: ${article.title}. Article 1 of ${news.length}`;
  };

  // Go to last article
  const goToLastArticle = () => {
    if (news.length === 0) {
      speak("No articles loaded yet");
      return "No articles loaded yet";
    }
    
    setCurrentArticleIndex(news.length - 1);
    const article = news[news.length - 1];
    speak(`Last article: ${article.title}. Article ${news.length} of ${news.length}`);
    return `Last article: ${article.title}. Article ${news.length} of ${news.length}`;
  };

  // Get current article info
  const getCurrentArticleInfo = () => {
    if (news.length === 0) {
      speak("No articles loaded yet");
      return "No articles loaded yet";
    }
    
    const article = news[currentArticleIndex];
    speak(`Current article ${currentArticleIndex + 1} of ${news.length}: ${article.title}`);
    return `Current article ${currentArticleIndex + 1} of ${news.length}: ${article.title}`;
  };

  // Get article count
  const getArticleCount = () => {
    if (news.length === 0) {
      speak("No articles loaded yet");
      return "No articles loaded yet";
    } else if (news.length === 1) {
      speak("There is 1 article loaded");
      return "There is 1 article loaded";
    } else {
      speak(`There are ${news.length} articles loaded`);
      return `There are ${news.length} articles loaded`;
    }
  };

  // Fetch news from NewsAPI
  const fetchNews = async () => {
    if (loading) return;
    
    setLoading(true);
    setStatus("Loading latest news...");
    
    try {
      let url = `${BASE_URL}/top-headlines?country=us&pageSize=20&apiKey=${API_KEY}`;
      const response = await axios.get(url);
      
      if (response.data.articles && response.data.articles.length > 0) {
        const validArticles = response.data.articles.filter(
          article => article && 
                    article.title && 
                    article.description && 
                    article.title !== "[Removed]" &&
                    !article.title.includes("Removed") &&
                    article.source?.name
        );
        
        if (validArticles.length > 0) {
          setNews(validArticles);
          setCurrentArticleIndex(0);
          setStatus(`Loaded ${validArticles.length} news articles`);
          newsLoadedRef.current = true;
          
          // Initialize voice AFTER news loads (only once)
          if (!voiceInitializedRef.current && isMountedRef.current) {
            setTimeout(() => {
              initializeNewsVoiceCommands();
            }, 500);
          }
          
          speak(`Loaded ${validArticles.length} news articles. Say "read news" to start or "help" for commands.`);
          setLoading(false);
          return;
        }
      }
      
      // Fallback to everything endpoint
      await fetchEverythingNews();
      
    } catch (error) {
      console.error("Error fetching news:", error);
      await fetchEverythingNews();
    }
  };

  // Fallback news fetch
  const fetchEverythingNews = async () => {
    try {
      const url = `${BASE_URL}/everything?q=technology&language=en&sortBy=publishedAt&pageSize=20&apiKey=${API_KEY}`;
      const response = await axios.get(url);
      
      if (response.data.articles && response.data.articles.length > 0) {
        const validArticles = response.data.articles.filter(
          article => article && 
                    article.title && 
                    article.description && 
                    article.title !== "[Removed]" &&
                    !article.title.includes("Removed")
        );
        
        if (validArticles.length > 0) {
          setNews(validArticles);
          setCurrentArticleIndex(0);
          setStatus(`Loaded ${validArticles.length} news articles`);
          newsLoadedRef.current = true;
          
          // Initialize voice AFTER news loads (only once)
          if (!voiceInitializedRef.current && isMountedRef.current) {
            setTimeout(() => {
              initializeNewsVoiceCommands();
            }, 500);
          }
          
          setLoading(false);
          return;
        }
      }
      
      setNews([]);
      setStatus("No articles found");
      speak("Unable to load news articles. Please try again.");
      setLoading(false);
      
    } catch (error) {
      console.error("Error in fallback fetch:", error);
      setNews([]);
      setStatus("Error loading news");
      speak("Error loading news. Please check your connection.");
      setLoading(false);
    }
  };

  // Initialize news reader voice commands (ONLY ONCE)
  const initializeNewsVoiceCommands = () => {
    if (!voiceService.isAvailable()) {
      console.log("Voice service not available in news reader");
      return;
    }

    if (voiceInitializedRef.current) {
      console.log("News Reader voice already initialized");
      return;
    }

    console.log("Initializing News Reader voice commands...");
    
    // Create news voice commands using the utility function
    const newsCommands = createNewsVoiceCommands(
      { news, currentArticleIndex },
      {
        readArticle: (article) => {
          if (!article && news.length > 0) {
            article = news[currentArticleIndex];
          }
          if (article) {
            readArticle(article);
          }
        },
        readArticleSummary: (article) => {
          if (!article && news.length > 0) {
            article = news[currentArticleIndex];
          }
          if (article) {
            readArticleSummary(article);
          }
        },
        fetchNews,
        stopReading: stopSpeaking,
        setCurrentArticleIndex
      }
    );

    // Clear any existing commands
    voiceService.clearCommands();
    voiceService.setFeature('news');
    
    // Register commands from the utility function
    Object.entries(newsCommands).forEach(([command, action]) => {
      voiceService.registerCommand(command, async () => {
        console.log(`[News] Command: ${command}`);
        const response = action();
        if (response && typeof response === 'string') {
          // Don't speak the response if it's just returning text
          // The action functions will handle speaking
        }
      });
    });

    // Add article number commands (1-20)
    for (let i = 1; i <= 20; i++) {
      // "article 1", "article 2", etc.
      voiceService.registerCommand(`article ${i}`, async () => {
        console.log(`Command: article ${i}`);
        readArticleByNumber(i);
      });
      
      // "read article 1", "read article 2", etc.
      voiceService.registerCommand(`read article ${i}`, async () => {
        console.log(`Command: read article ${i}`);
        readArticleByNumber(i);
      });
    }

    // Add navigation commands
    voiceService.registerCommand("next article", async () => {
      console.log("Command: next article");
      readNextArticle();
    });
    
    voiceService.registerCommand("previous article", async () => {
      console.log("Command: previous article");
      readPreviousArticle();
    });
    
    voiceService.registerCommand("first article", async () => {
      console.log("Command: first article");
      goToFirstArticle();
    });
    
    voiceService.registerCommand("last article", async () => {
      console.log("Command: last article");
      goToLastArticle();
    });
    
    // Add control commands
    voiceService.registerCommand("stop reading", async () => {
      console.log("Command: stop reading");
      stopSpeaking();
      await speak("Stopped reading");
    });
    
    voiceService.registerCommand("stop", async () => {
      console.log("Command: stop");
      stopSpeaking();
      await speak("Stopped");
    });
    
    voiceService.registerCommand("pause reading", async () => {
      console.log("Command: pause reading");
      const response = pauseReading();
      if (response === "Reading paused") {
        await speak("Reading paused");
      }
    });
    
    voiceService.registerCommand("resume reading", async () => {
      console.log("Command: resume reading");
      const response = resumeReading();
      if (response === "Reading resumed") {
        await speak("Reading resumed");
      }
    });
    
    // Add dashboard navigation commands
    voiceService.registerCommand("dashboard", async () => {
      console.log("Command: dashboard");
      await speak("Going back to dashboard");
      navigate("/dashboard");
    });
    
    voiceService.registerCommand("go to dashboard", async () => {
      console.log("Command: go to dashboard");
      await speak("Going to dashboard");
      navigate("/dashboard");
    });
    
    voiceService.registerCommand("home", async () => {
      console.log("Command: home");
      await speak("Going home");
      navigate("/dashboard");
    });
    
    // Add logout commands
    voiceService.registerCommand("logout", async () => {
      console.log("Command: logout");
      await handleLogout();
    });
    
    // Set up voice result callback
    voiceService.onResultCallback = (transcript) => {
      console.log("News Reader voice input:", transcript);
      setSpokenText(transcript);
    };
    
    // Start listening if not already
    if (!voiceService.isListening) {
      voiceService.startListening();
    }
    
    voiceInitializedRef.current = true;
    console.log("✅ News Reader voice commands initialized");
  };

  // Initialize voice commands when news loads
  useEffect(() => {
    if (news.length > 0 && !voiceInitializedRef.current && isMountedRef.current) {
      initializeNewsVoiceCommands();
    }
  }, [news]); // Only re-run when news changes

  // Fetch news on mount
  useEffect(() => {
    isMountedRef.current = true;
    fetchNews();
    
    return () => {
      isMountedRef.current = false;
      // Clean up voice commands when leaving news reader
      if (voiceInitializedRef.current) {
        console.log("Cleaning up News Reader voice commands");
        voiceInitializedRef.current = false;
      }
    };
  }, []);

  // Handle logout
  const handleLogout = async () => {
    stopSpeaking();
    setStatus("Logging out...");

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
      localStorage.clear();
      setTimeout(() => navigate("/"), 1500);
    }
  };

  const handleBackToDashboard = () => {
    stopSpeaking();
    navigate("/dashboard");
  };

  // Format date
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffMs = now - date;
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMs / 3600000);
      const diffDays = Math.floor(diffMs / 86400000);

      if (diffMins < 60) {
        return `${diffMins} min ago`;
      } else if (diffHours < 24) {
        return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
      } else {
        return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
      }
    } catch {
      return "Recently";
    }
  };

  // Get default image
  const getDefaultImage = () => {
    const defaultImages = [
      "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=400",
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400",
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400",
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400",
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=400"
    ];
    return defaultImages[Math.floor(Math.random() * defaultImages.length)];
  };

  // Get user from localStorage
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <div className="news-reader-container">
      {/* Fixed Header */}
      <header className="dashboard-header fixed-header">
        <div className="header-content">
          <div className="header-left">
            <button className="back-btn" onClick={handleBackToDashboard}>
              ← Back to Dashboard
            </button>
            <h1 className="logo">Vision Assist</h1>
          </div>
          <div className="header-center">
            {spokenText && (
              <div className="spoken-text-display">
                <span className="spoken-label">🎤 Heard:</span> <strong>{spokenText}</strong>
              </div>
            )}
          </div>
          <div className="user-menu">
            {user && <span className="welcome-text">Welcome, {user.name}</span>}
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="news-content">
        {/* Voice Status */}
        <div className="voice-status-indicator">
          <span className="voice-icon">🎤</span>
          <span className="voice-text">
            {voiceInitializedRef.current ? "Voice Active" : "Initializing Voice..."} 
            - Try: "read news", "article 1", "next article"
          </span>
          <button 
            className="voice-help-btn"
            onClick={() => speak("News commands: read news, next article, previous article, read summary, stop reading, refresh news, article 1, current article, news count, help")}
          >
            Voice Help
          </button>
        </div>

        <div className="news-header">
          <h2>📰 News Reader 🎤</h2>
          <p>Stay informed with the latest news, read aloud for your convenience</p>
          <p className="voice-instruction">
            <strong>Voice Commands Active:</strong> Try saying "read news", "article 1", "next article", or "stop reading"
          </p>
        </div>

        {/* Status Message */}
        {status && (
          <div className="status-message">
            {status}
            {speechProgress > 0 && (
              <div className="speech-progress">
                <div 
                  className="progress-bar" 
                  style={{ width: `${speechProgress}%` }}
                ></div>
              </div>
            )}
          </div>
        )}

        {/* Controls */}
        <div className="news-controls">
          <button 
            className="control-btn refresh-btn"
            onClick={() => fetchNews()}
            disabled={loading || isSpeaking}
          >
            🔄 {loading ? "Loading..." : "Refresh News"}
          </button>
          
          {isSpeaking && (
            <button 
              className="control-btn stop-btn"
              onClick={stopSpeaking}
            >
              ⏹️ Stop Reading
            </button>
          )}
          
          <div className="voice-nav-controls">
            <button 
              className="control-btn voice-nav-btn"
              onClick={() => readPreviousArticle()}
              disabled={news.length === 0 || isSpeaking}
            >
              ⏮️ Previous
            </button>
            
            <button 
              className="control-btn voice-nav-btn"
              onClick={() => {
                if (news.length > 0) {
                  readArticle(news[currentArticleIndex]);
                }
              }}
              disabled={news.length === 0 || isSpeaking}
            >
              🔊 Read Current
            </button>
            
            <button 
              className="control-btn voice-nav-btn"
              onClick={() => readNextArticle()}
              disabled={news.length === 0 || isSpeaking}
            >
              ⏭️ Next
            </button>
          </div>
        </div>

        {/* Current Article Indicator */}
        {news.length > 0 && (
          <div className="current-article-indicator">
            <h4>📄 Currently Selected Article</h4>
            <div className="selected-article">
              <strong>Article {currentArticleIndex + 1} of {news.length}</strong>
              <p>{news[currentArticleIndex].title}</p>
              <div className="article-meta">
                <span>{news[currentArticleIndex].source?.name || "News Source"}</span>
                <span>•</span>
                <span>{formatDate(news[currentArticleIndex].publishedAt)}</span>
              </div>
              <div className="selected-article-actions">
                <button 
                  className="action-btn read-summary-btn"
                  onClick={() => readArticleSummary(news[currentArticleIndex])}
                  disabled={isSpeaking}
                >
                  🎧 Read Summary
                </button>
                <button 
                  className="action-btn read-full-btn"
                  onClick={() => readArticle(news[currentArticleIndex])}
                  disabled={isSpeaking}
                >
                  📖 Read Full Article
                </button>
              </div>
            </div>
          </div>
        )}

        {/* News Articles */}
        <div className="news-articles">
          <h3>📋 Latest News Articles</h3>
          
          {loading ? (
            <div className="loading-state">
              <div className="loading-spinner"></div>
              <p>Loading latest news...</p>
            </div>
          ) : news.length === 0 ? (
            <div className="empty-state">
              <p>No news articles found.</p>
              <button 
                className="control-btn refresh-btn"
                onClick={() => fetchNews()}
                style={{ marginTop: '1rem' }}
              >
                🔄 Try Again
              </button>
            </div>
          ) : (
            <div className="articles-grid">
              {news.map((article, index) => (
                <div 
                  key={index} 
                  className={`article-card ${index === currentArticleIndex ? 'selected-article-card' : ''}`}
                  onClick={() => {
                    setCurrentArticleIndex(index);
                    speak(`Selected article ${index + 1}: ${article.title}`);
                  }}
                >
                  <div className="article-image">
                    <img 
                      src={article.urlToImage || getDefaultImage()} 
                      alt={article.title}
                      onError={(e) => {
                        e.target.src = getDefaultImage();
                      }}
                    />
                    {index === currentArticleIndex && (
                      <span className="current-indicator">🎤 CURRENT</span>
                    )}
                  </div>
                  
                  <div className="article-content">
                    <div className="article-header">
                      <span className="article-source">{article.source?.name || "News Source"}</span>
                      <span className="article-time">{formatDate(article.publishedAt)}</span>
                    </div>
                    
                    <h4 className="article-title">{article.title}</h4>
                    <p className="article-description">{article.description}</p>
                    
                    <div className="article-actions">
                      <button 
                        className="action-btn read-summary-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          readArticleSummary(article);
                        }}
                        disabled={isSpeaking}
                      >
                        🎧 Summary
                      </button>
                      
                      <button 
                        className="action-btn read-full-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          readArticle(article);
                        }}
                        disabled={isSpeaking}
                      >
                        📖 Full Article
                      </button>
                      
                      <button 
                        className="action-btn voice-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          speak(`Article ${index + 1}: ${article.title}`);
                        }}
                      >
                        🔢 Article {index + 1}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Currently Reading */}
        {currentArticle && isSpeaking && (
          <div className="currently-reading">
            <h4>🔊 Currently Reading</h4>
            <div className="current-article">
              <h5>{currentArticle.title}</h5>
              <p>{currentArticle.source?.name || "News Source"} • {formatDate(currentArticle.publishedAt)}</p>
            </div>
          </div>
        )}

        {/* Voice Commands Help */}
        {/* <div className="voice-commands-help">
          <h4>🎤 Voice Commands</h4>
          <div className="commands-grid">
            <div className="command-category">
              <h5>Reading</h5>
              <ul>
                <li><strong>"read news"</strong> - Read current article</li>
                <li><strong>"read summary"</strong> - Read summary</li>
                <li><strong>"read full article"</strong> - Read complete</li>
              </ul>
            </div>
            <div className="command-category">
              <h5>Navigation</h5>
              <ul>
                <li><strong>"next article"</strong> - Go to next</li>
                <li><strong>"previous article"</strong> - Go to previous</li>
                <li><strong>"first article"</strong> - First article</li>
                <li><strong>"last article"</strong> - Last article</li>
              </ul>
            </div>
            <div className="command-category">
              <h5>Selection</h5>
              <ul>
                <li><strong>"article 1"</strong> - Select article 1</li>
                <li><strong>"article 2"</strong> - Select article 2</li>
                <li><strong>"read article 1"</strong> - Read article 1</li>
              </ul>
            </div>
            <div className="command-category">
              <h5>Control</h5>
              <ul>
                <li><strong>"stop reading"</strong> - Stop speech</li>
                <li><strong>"refresh news"</strong> - Update articles</li>
                <li><strong>"dashboard"</strong> - Go to dashboard</li>
              </ul>
            </div>
          </div> */}
        {/* </div> */}
      </div>

      {/* Status Bar */}
      <div className="status-bar">
        <p>
          {status} | 
          <span className="voice-status"> 🎤 {voiceInitializedRef.current ? "Voice Active" : "Voice Loading..."}</span> | 
          <span> Article {news.length > 0 ? currentArticleIndex + 1 : 0} of {news.length}</span>
        </p>
      </div>
    </div>
  );
};

export default NewsReader;