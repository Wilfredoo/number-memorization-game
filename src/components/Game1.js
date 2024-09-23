// src/components/Game1.js
import React, { useState, useEffect } from 'react';
import { Box, Button, Input, Text, VStack, Heading } from '@chakra-ui/react';

const Game1 = () => {
    const [levels, setLevels] = useState(Array(10).fill(false)); // 10 levels, all locked
    const [currentLevel, setCurrentLevel] = useState(1);
    const [numberToMemorize, setNumberToMemorize] = useState('');
    const [userInput, setUserInput] = useState('');
    const [feedback, setFeedback] = useState('');
    const [correctStreak, setCorrectStreak] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);
    const [levelStarted, setLevelStarted] = useState(false);
    const [points, setPoints] = useState(0); // Track points

    useEffect(() => {
        // Unlock the first level by default
        let newLevels = [...levels];
        newLevels[0] = true;
        setLevels(newLevels);
    }, []);



    // Replace the existing generateNumber function with this one
    const generateNumber = (digits) => {
        let number = '';
        for (let i = 0; i < digits; i++) {
            number += Math.floor(Math.random() * 10).toString();
        }
        return number;
    };

    // Play the number as audio
    const playNumberAudio = (number) => {
        const utterance = new SpeechSynthesisUtterance(number.split('').join(' '));
        utterance.lang = 'en-US';
        speechSynthesis.speak(utterance);
    };

    // Start the current level by pressing the "Play" button
    const startLevel = () => {
        generateAndPlayNewNumber(); // Generate and play a new number
        setUserInput(''); // Reset user input
        setFeedback(''); // Clear feedback message
        setShowAnswer(false); // Hide the correct answer display
        setLevelStarted(true); // Mark the level as started
    };

    // Replace the existing generateAndPlayNewNumber function with this one
    const generateAndPlayNewNumber = () => {
        const digits = 7 + (currentLevel - 1); // Start at 7 digits and increase by 1 per level
        const newNumber = generateNumber(digits);
        setNumberToMemorize(newNumber);
        playNumberAudio(newNumber);
    };


    // Handle user submission
    const handleSubmit = () => {
        if (userInput === numberToMemorize) {
            setFeedback('Correct!');
            setCorrectStreak(correctStreak + 1);
            setPoints(points + 1); // Increment points
            setUserInput(''); // Clear input field

            if (correctStreak + 1 >= 3) { // If 3 consecutive correct entries
                unlockNextLevel();
                setCorrectStreak(0); // Reset streak
                alert(`Congratulations! You've passed Level ${currentLevel} and unlocked Level ${currentLevel + 1}!`);
                setCurrentLevel(currentLevel + 1);
                setLevelStarted(false); // Reset level started status
            } else {
                generateAndPlayNewNumber(); // Generate and play a new number
            }
        } else {
            setFeedback(`Incorrect! You entered ${userInput}. The correct number was ${numberToMemorize}.`);
            setShowAnswer(true);
            setCorrectStreak(0); // Reset streak on wrong answer
            setUserInput(''); // Clear input field
        }
    };

    // Unlock the next level
    const unlockNextLevel = () => {
        if (currentLevel < levels.length) {
            let newLevels = [...levels];
            newLevels[currentLevel] = true; // Unlock next level
            setLevels(newLevels);
        }
    };

    return (
        <Box p={4} maxW="md" mx="auto">
            <Heading mb={4}>Game 1: Number Memorization</Heading>
            <Text fontSize="lg">Level {currentLevel}</Text>
            <Text fontSize="md" mb={4}>Points: {points}</Text>
            {levels.map((unlocked, index) => (
                <Button
                    key={index}
                    colorScheme={unlocked ? 'teal' : 'gray'}
                    disabled={!unlocked}
                    onClick={() => {
                        if (index + 1 === currentLevel) startLevel();
                    }}
                    mb={2}
                >
                    Level {index + 1} {unlocked ? '' : '(Locked)'}
                </Button>
            ))}
            {levelStarted && (
                <VStack mt={4} spacing={3}>
                    <Text>Press "Play" to hear the number.</Text>
                    <Button onClick={() => playNumberAudio(numberToMemorize)} colorScheme="blue">
                        Play
                    </Button>
                    <Input
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder="Enter the number"
                        size="lg"
                        textAlign="center"
                        maxLength={currentLevel + 6} // Set maxLength based on the level (e.g., 7 digits for level 1)
                        mb={2}
                    />
                    <Button colorScheme="teal" onClick={handleSubmit}>
                        Submit
                    </Button>
                    {feedback && <Text color={showAnswer ? 'red.500' : 'green.500'}>{feedback}</Text>}
                </VStack>
            )}
        </Box>
    );
};

export default Game1;
