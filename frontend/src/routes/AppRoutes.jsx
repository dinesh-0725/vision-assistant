
import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Auth/Login";
import Signup from "../pages/Auth/Signup";
import Forgot from "../pages/Auth/Forgot";
import Dashboard from "../pages/Dashboard/Dashboard";
import Logout from "../pages/Auth/Logout";
import MedicationReminder from "../pages/Medication/MedicationReminder";
import WeatherReader from "../pages/Weather/WeatherReader";
import NewsReader from "../pages/News/NewsReader";
import ProfileUpdate from "../pages/Profile/ProfileUpdate";
import ObjectDetector from "../pages/ObjectDetection/ObjectDetector";
import SOSButton from "../components/SOS/SOSButton";
import TalkingCalculator from "../components/TalkingCalculator/TalkingCalculator";
import MoneyAnalyzer from '../components/MoneyAnalyzer/MoneyAnalyzer';
import LanguageTranslator from '../components/LanguageTranslator/LanguageTranslator';
import Reminders from '../pages/Reminders/Reminders';
import OCRScanner from '../components/OCRScanner/OCRScanner';

const AppRoutes = () => (
  <Routes>
    {/* Auth Routes */}
    <Route path="/" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/forgot" element={<Forgot />} />

    {/* Protected Dashboard */}
    <Route path="/dashboard" element={<Dashboard />} />

    {/* Logout */}
    <Route path="/logout" element={<Logout />} />

    <Route path="/medication-reminder" element={<MedicationReminder />} />

    <Route path="/weather-reader" element={<WeatherReader />} />

    <Route path="/news-reader" element={<NewsReader />} />

    <Route path="/profile" element={<ProfileUpdate />} />

    <Route path="/talking-calculator" element={<TalkingCalculator />} />

    <Route path="/money-analyzer" element={<MoneyAnalyzer />} />

    <Route path="/language-translator" element={<LanguageTranslator />} />
    
    <Route path="/ocr-scanner" element={<OCRScanner />} />
    <Route 
      path="/sos" 
      element={
        <div className="sos-page-container">
          <SOSButton showHeader={true} />
        </div>
      } 
    />

    <Route path="/object-detector" element={<ObjectDetector />} />

    <Route path="/reminders" element={<Reminders />} />

    
    
    <Route path="*" element={<Login />} />
  </Routes>
);

export default AppRoutes;
