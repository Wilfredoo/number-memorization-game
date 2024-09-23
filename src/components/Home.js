// src/components/Home.js
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Heading, VStack, Text } from '@chakra-ui/react';
import { UserContext } from '../contexts/UserContext';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  return (
    <Box textAlign="center" py={10} px={6}>
      <VStack spacing={4}>
        <Heading as="h1" size="xl">
          {user ? `Welcome, ${user.username}!` : 'Number Memorization Game'}
        </Heading>
        <Text fontSize="lg">Choose a game to start playing:</Text>
        <Button colorScheme="teal" size="lg" onClick={() => navigate('/game1')}>
          Game 1
        </Button>
        {/* Additional games can be added here later */}
      </VStack>
    </Box>
  );
};

export default Home;
