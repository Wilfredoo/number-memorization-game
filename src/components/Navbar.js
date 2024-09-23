// src/components/Navbar.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Box, Flex, Text, Button, Stack } from '@chakra-ui/react';
import { UserContext } from '../contexts/UserContext'; // Import UserContext

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null); // Clear user state
    window.location.href = '/login'; // Redirect to login page
  };

  return (
    <Box bg="teal.500" px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Box>
          <Text fontSize="lg" color="white" fontWeight="bold">
            Memorization Game
          </Text>
        </Box>
        <Stack direction="row" spacing={7}>
          <Button as={Link} to="/" colorScheme="teal">
            Home
          </Button>
          {user ? (
            <>
              <Text color="white">{`Welcome, ${user.username}`}</Text>
              <Button onClick={handleLogout} colorScheme="red">
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button as={Link} to="/login" colorScheme="teal">
                Login
              </Button>
              <Button as={Link} to="/register" colorScheme="teal">
                Register
              </Button>
            </>
          )}
        </Stack>
      </Flex>
    </Box>
  );
};

export default Navbar;
