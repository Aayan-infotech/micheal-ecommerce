import React from 'react';
import { Routes, Route } from "react-router-dom";
import Login from './components/login/Login';
import Register from './components/register/Register';
import PasswordRecovery from './components/Auth/PasswordRecovery/PasswordRecovery';
import Otp from './components/Auth/Otp/Otp';
import PasswordReset from './components/Auth/PasswordReset/PasswordReset';

const ProtectedRoute = ({ children }) => {
  const token = sessionStorage.getItem('token');

  // If the user is not logged in, display login or register components
  if (!token) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/passwordrecovery" element={<PasswordRecovery />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/passwordreset" element={<PasswordReset />} />
      </Routes>
    );
  }

  // If the user is logged in, render the protected component
  return <>{children}</>;
};

export default ProtectedRoute;
