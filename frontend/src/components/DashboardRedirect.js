import React from "react";
import Dashboard from "./Dashboard";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
const DashboardRedirect = () => {
  const userType = localStorage.getItem("developer_registered") 
    ? "developer" 
    : localStorage.getItem("company_registered") 
      ? "company" 
      : null;

  if (userType) {
    return <Dashboard userType={userType} />;
  } else {
    return <Navigate to="/register" />;
  }
};

export default DashboardRedirect;