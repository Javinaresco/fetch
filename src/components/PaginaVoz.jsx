import 'regenerator-runtime';
import React, { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

function PaginaVoz() {
  const [isListening, setIsListening] = useState(false);
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    // Check for browser support on component mount
    if (!browserSupportsSpeechRecognition) {
      console.error("Browser doesn't support speech recognition.");
    }
  }, [browserSupportsSpeechRecognition]);

  const handleStartListening = () => {
    SpeechRecognition.startListening({ continuous: true });
    setIsListening(true);
  };

  const handleStopListening = () => {
    SpeechRecognition.stopListening();
    setIsListening(false);
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleAddText = () => {
    setOutputText(outputText + inputText + ' '); 
    setInputText(''); 
  };

  const handleReset = () => {
    resetTranscript(); // Reset speech-to-text
    setInputText(''); // Clear input text
    setOutputText(''); // Clear output text
  };

  return (
    <div>
      {browserSupportsSpeechRecognition ? (
        <>
          <p>Microphone: {listening ? 'on' : 'off'}</p>
          <button onClick={handleStartListening}>Start</button>
          <button onClick={handleStopListening}>Stop</button>
          <button onClick={handleReset}>Reset</button> 

          <input 
            type="text" 
            value={inputText} 
            onChange={handleInputChange} 
            placeholder="Enter text here" 
          />
          <button onClick={handleAddText}>Añadir Texto</button>

          <p>{outputText} {transcript}</p> 

        </>
      ) : (
        <p>Browser doesn't support speech recognition.</p>
      )}
    </div>
  );
}

export default PaginaVoz;