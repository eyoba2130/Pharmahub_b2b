import React from 'react';
import { BrowserRouter, Routes, Route,Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/home/Home';
import ProtectRoute from './components/common/ProtectedRoute'


function Routing() {
  return (
    <AuthProvider>
       <BrowserRouter>
        <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />


          <Route path="/" element={
            <ProtectRoute>
              <Home />
            </ProtectRoute>  
          } />
      </Routes>
      </BrowserRouter>
    </AuthProvider>
     
  );
}

export default Routing;