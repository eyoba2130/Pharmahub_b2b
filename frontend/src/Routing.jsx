import React from 'react';
import { BrowserRouter, Routes, Route,Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';


function Routing() {
  return (
    <AuthProvider>
       <BrowserRouter>
        <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      </BrowserRouter>
    </AuthProvider>
     
  );
}

export default Routing;