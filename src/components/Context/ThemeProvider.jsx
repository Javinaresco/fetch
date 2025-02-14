import { useEffect } from 'react';

useEffect(() => {
  document.body.className = theme; // Set the theme class on the body
}, [theme]);
