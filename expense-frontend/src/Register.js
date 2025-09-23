import React, { useState } from 'react';
import API from './api';

function Register({ onRegistered }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await API.post('/users/register', { email, password });
      alert('User registered successfully! Please login.');
      onRegistered();
    } catch (err) {
      alert('Registration failed');
      console.error(err);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto' }}>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br/>
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br/>
        <button type='submit'>Register</button>
      </form>
    </div>
  );
}

export default Register;
