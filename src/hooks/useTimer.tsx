import { useState, useEffect } from "react";
export const useTimer = (initialTime: number, reset: boolean) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer); // Cleanup on unmount
    }
  }, [timeLeft, reset]); // Add `reset` as a dependency

  // Reset the timer when `reset` changes
  useEffect(() => {
    setTimeLeft(initialTime);
  }, [reset, initialTime]);

  return { timeLeft };
};
