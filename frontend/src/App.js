import React from 'react';
import './index.css';
import RegistrationToggle from './components/RegistrationToggle';
import Landing from './components/Landing';
import DeveloperRegistrationPage from './components/DeveloperInfo';
import CompanyRegistration from './components/CompanyInfo';
import DashboardRedirect from "./components/DashboardRedirect"
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<RegistrationToggle />} />
          <Route path ="/developer-info" element={<DeveloperRegistrationPage />} />

          <Route path ="/company-info" element={<CompanyRegistration />} />

          <Route path="/dashboard" element={<DashboardRedirect />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
