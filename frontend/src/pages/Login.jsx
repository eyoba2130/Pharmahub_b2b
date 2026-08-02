import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {ClipLoader} from "react-spinners";


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/'); 
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Login failed. Please check your credentials.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 sm:px-6 lg:px-8">
      
      {/* Login form */}
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl border border-slate-100 transition-all duration-300">
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-center">
            {/* አርዕስት */}
            <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">Login</h2>
            <p className="mt-2 text-sm text-slate-500">Sign in to Pharmahub B2B platform</p>
          </div>
          
          {error && (
            <div className="bg-red-50 text-red-600 p-3.5 rounded-xl text-sm border border-red-100 text-center font-medium animate-pulse">
              {error}
            </div>
          )}
          
          <div className="space-y-4">
            {/* email  */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
              <input 
                type="email" 
                placeholder="name@pharmacy.com" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                required 
                disabled={loading}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200 disabled:bg-slate-50 disabled:text-slate-400"
              />
            </div>
            
            {/* password  */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                required 
                disabled={loading}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200 disabled:bg-slate-50 disabled:text-slate-400"
              />
            </div>
          </div>
          
          {/* login button */}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3.5 px-4 rounded-xl text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 font-semibold shadow-lg shadow-emerald-600/10 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <ClipLoader size={20} color="#ffffff" />
              </span>
            ) : 'Sign In'}
          </button>
        </form>
        
      </div>
    </div>
  );
};

export default Login;