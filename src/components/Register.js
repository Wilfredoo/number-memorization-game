// src/components/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Input, VStack, Heading, Text } from '@chakra-ui/react';

const Register = () => {
  // State variables to hold user input and error messages
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  // useNavigate hook for programmatic navigation
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous error message

    try {
      // Send POST request to register user
      const response = await axios.post('/api/auth/register', {
        username,
        email,
        password,
      });
      localStorage.setItem('token', response.data.token); // Store JWT token in localStorage
      navigate('/game'); // Redirect to the game page on successful registration
    } catch (err) {
      // Display error message if registration fails
      setError(err.response?.data?.msg || 'Registration failed. Please try again.');
    }
  };

  return (
    <Box p={6} maxW="sm" mx="auto" mt={8} borderWidth={1} borderRadius="lg" boxShadow="lg">
      <VStack as="form" spacing={4} onSubmit={handleSubmit}>
        <Heading as="h2" size="lg">Register</Heading>
        {error && (
          <Text color="red.500">
            {error}
          </Text>
        )}
        <Input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          size="lg"
          required
        />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          size="lg"
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          size="lg"
          required
        />
        <Button type="submit" colorScheme="teal" size="lg" width="full">
          Register
        </Button>
      </VStack>
    </Box>
  );
};

export default Register;
