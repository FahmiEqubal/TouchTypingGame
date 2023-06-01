// TypingText.js
import React from 'react';

const TypingText = ({ text, typedText, showResult, calculateAccuracy, score }) => (
  <div style={{ flex: 1, backgroundColor: '#f0f0f0', padding: '10px' }}>
    <div style={{ marginBottom: '20px' }}>
      <p>
        {text.split(' ').map((word, index) => {
          let color = 'black';
          if (typedText.split(' ')[index] === word) {
            color = 'green';
          } else if (typedText.split(' ')[index] !== undefined) {
            color = 'red';
          }
          return (
            <span key={index} style={{ color }}>
              {word}{' '}
            </span>
          );
        })}
      </p>
    </div>
    {showResult && (
      <div>
        <p>Time's up! Your accuracy: {calculateAccuracy().toFixed(2)}%</p>
        <p>Score: {score}</p>
      </div>
    )}
  </div>
);

export default TypingText;
