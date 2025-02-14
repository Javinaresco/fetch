import React from 'react';
import '../css/Contador.css'
import { useTheme } from "./Context/ThemeContext"; // Import the useTheme hook

export const Contador = () => {
  const { theme } = useTheme(); // Access the current theme
  const [count, setCount] = React.useState(0);

  return (
    <div className={`Con ${theme}`}>
      <h1>Contador</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - count)}>Reset</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
    </div>
  );
};