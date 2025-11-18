import React, { useEffect, useState } from 'react';

interface TimerProps {
  onComplete: () => void;
}

const Timer: React.FC<TimerProps> = ({ onComplete }) => {
  const [timeLeft, setTimeLeft] = useState<number>(600); // 10 minutes

  useEffect(() => {
    const id = setInterval(() => {
      setTimeLeft(prev => Math.max(prev - 1, 0));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      onComplete();
    }
  }, [timeLeft, onComplete]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeText = `${minutes}:${String(seconds).padStart(2, '0')}`;

  return (
    <div>
    <p style={{ color: '#666', fontSize: 14, margin: 0 }}>
        {`Expires in: ${timeText}`}
      </p>
    </div>
  );
};

export default Timer;