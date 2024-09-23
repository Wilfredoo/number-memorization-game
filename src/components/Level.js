// src/components/Level.js
import React from 'react';

const Level = ({ level, language }) => {
  return (
    <div>
      <h2>Level {level}</h2>
      <p>Current Language: {language}</p>
    </div>
  );
};

export default Level;
