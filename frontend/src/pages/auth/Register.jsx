import React, { useState } from 'react';
import api from '../../API/axiosConfig';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({ email: '', password: '', role: 'pharmacy', businessName: '', licenseNumber: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', form);
      alert('Registration successful. Please login.');
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || 'Error');
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <input name="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <select name="role" onChange={handleChange}>
          <option value="pharmacy">Pharmacy</option>
          <option value="wholesaler">Wholesaler</option>
        </select>
        <input name="businessName" placeholder="Business Name" onChange={handleChange} required />
        <input name="licenseNumber" placeholder="License Number" onChange={handleChange} />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;