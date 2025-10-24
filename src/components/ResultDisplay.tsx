import React, { useEffect, useState } from "react";

interface Props {
  onComplete: () => void;
}

const Timer: React.FC<Props> = ({ onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(600);

  useEffect(() => {
    if (timeLeft <= 0) {
      onComplete();
      return;
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, onComplete]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <p>
      Expires in: {minutes}:{seconds.toString().padStart(2, "0")}
    </p>
  );
};

export default Timer;