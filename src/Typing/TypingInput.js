import React from 'react';

const TypingInput = ({ typedText, handleInputChange, checkWord, isRunning }) => {
  return (
    <div
      style={{
        width: '50%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <textarea
        value={typedText}
        onChange={handleInputChange}
        onKeyUp={checkWord}
        disabled={!isRunning}
        style={{
          width: '100%',
          height: '300px',
          fontSize: '16px',
          marginTop: '10px',
        }}
      />
    </div>
  );
};

export default TypingInput;
