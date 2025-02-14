import { useState, useEffect } from "react";

export function Countertimer(initialValue = 0, interval = 1000) {
  const [countTimer, setCountTimer] = useState(initialValue);

  useEffect(() => {
    const id = setInterval(() => {
      setCountTimer((c) => c + 1);
    }, interval);
    return () => clearInterval(id);
  }, [interval]);

  return countTimer;
}
