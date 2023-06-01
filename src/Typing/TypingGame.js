import React, { useState, useEffect } from 'react';
import TypingInput from './TypingInput';

const TypingGame = () => {
  const [text, setText] = useState('I am Equbal Fahmi pursuing B.Tech in Computer Science from Lovely Professional University. Apart from this, I have done certifications in C++ and Java, which helped me develop many projects. I am always curious to learn about the working of websites, that\'s why I chose computer science as my field of study.');
  const [typedText, setTypedText] = useState('');
  const [timer, setTimer] = useState(300);
  const [isRunning, setIsRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (isRunning && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isRunning, timer]);

  const startGame = () => {
    setIsRunning(true);
    setTimer(300);
    setScore(0);
    setTypedText('');
    setShowResult(false);
  };

  const stopGame = () => {
    setIsRunning(false);
    setShowResult(true);
    calculateScore();
  };

  const handleInputChange = (e) => {
    setTypedText(e.target.value);
  };

  const calculateAccuracy = () => {
    const typedWords = typedText.trim().split(' ');
    const originalWords = text.trim().split(' ');

    let correctWords = 0;
    for (let i = 0; i < typedWords.length; i++) {
      if (typedWords[i] === originalWords[i]) {
        correctWords++;
      }
    }

    return (correctWords / originalWords.length) * 100;
  };

  const calculateScore = () => {
    const accuracy = calculateAccuracy();
    const calculatedScore = Math.floor(accuracy);
    setScore(calculatedScore);
  };

  useEffect(() => {
    if (!isRunning && timer === 0) {
      setShowResult(true);
      calculateScore();
    }
  }, [isRunning, timer]);

  const checkWord = () => {
    if (typedText.trim() === text.trim()) {
      stopGame();
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <div>
      <h1>Touch Typing Game</h1>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div
          style={{
            width: '50%',
            border: '1px solid black',
            padding: '10px',
            overflow: 'auto',
            background: '#ffecb3',
            height: '300px',
          }}
        >
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
        <TypingInput
          typedText={typedText}
          handleInputChange={handleInputChange}
          checkWord={checkWord}
          isRunning={isRunning}
        />
      </div>
      <div>
        <div
          style={{
            width: '100%',
            textAlign: 'center',
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '20px',
          }}
        >
          Time: {formatTime(timer)}
        </div>
        {showResult && (
          <div>
            <p>Time's up! Your accuracy: {calculateAccuracy().toFixed(2)}%</p>
            <p>Score: {score}</p>
          </div>
        )}
        <button
          onClick={isRunning ? stopGame : startGame}
          style={{
            backgroundColor: isRunning ? 'red' : 'green',
            color: 'white',
            padding: '10px 20px',
            fontSize: '18px',
            fontWeight: 'bold',
            borderRadius: '5px',
            marginTop: '10px',
          }}
        >
          {isRunning ? 'Stop' : 'Start'}
        </button>
      </div>
    </div>
  );
};

export default TypingGame;
