// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  // State variables for username and password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted with:', { username, password });

    try {
      console.log('Sending login request...');
      const response = await axios.post('/api/auth/login', { username, password });
      
      console.log('Login successful:', response.data); // Log the successful response
      localStorage.setItem('token', response.data.token); // Store token in localStorage
      console.log('Token saved in localStorage.');

      // Redirect to game or dashboard
      window.location.href = '/'; // Uncomment this if you want to redirect after login
    } catch (err) {
      if (err.response) {
        // Server responded with a status other than 200 range
        console.error('Login error response:', err.response.data);
      } else if (err.request) {
        // Request was made but no response was received
        console.error('No response received:', err.request);
      } else {
        // Something happened in setting up the request that triggered an error
        console.error('Error in setting up request:', err.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px', margin: '0 auto' }}>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => {
          console.log("Username Input:", e.target.value);
          setUsername(e.target.value);
        }}
        style={{ marginBottom: '10px', padding: '8px', fontSize: '16px', color: "black" }} // Add some styling for visibility
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => {
          console.log("Password Input:", e.target.value);
          setPassword(e.target.value);
        }}
        style={{ marginBottom: '10px', padding: '8px', fontSize: '16px', color: "black" }} // Add some styling for visibility
      />
      <button type="submit" style={{ padding: '10px', fontSize: '16px' }}>Login</button>
    </form>
  );
};

export default Login;
