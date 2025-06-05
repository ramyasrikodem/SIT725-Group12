import React, { useState } from 'react';
import API from '../../services/api';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', form);
      localStorage.setItem('token', res.data.token);
      navigate('/upload');
    } catch {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="container col-md-4 mt-5">
      <h3 className="text-center">Login</h3>
      <form onSubmit={handleSubmit}>
        <input type="email" className="form-control mb-3" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        <input type="password" className="form-control mb-3" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} required />
        <button className="btn btn-dark w-100">Login</button>
      </form>
      <div className="text-center mt-2">
        <a href="/register">Don't have an account? Register</a>
      </div>
    </div>
  );
}

export default Login;
