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


// import React, { useEffect, useRef, useState } from "react";

// type Props = {
//   seconds?: number;
//   onExpire?: () => void;
// };

// export default function Timer({ seconds = 10, onExpire }: Props) {
//   const [left, setLeft] = useState<number>(() => Math.max(0, Math.floor(seconds)));
//   const calledRef = useRef(false);
//   const intervalRef = useRef<number | null>(null);

//   useEffect(() => {
//     setLeft(Math.max(0, Math.floor(seconds)));
//     calledRef.current = false;
//   }, [seconds]);

//   useEffect(() => {
//     if (intervalRef.current != null) {
//       clearInterval(intervalRef.current);
//       intervalRef.current = null;
//     }

//     intervalRef.current = window.setInterval(() => {
//       setLeft((prev) => {
//         if (prev <= 1) {
//           if (!calledRef.current) {
//             calledRef.current = true;
//             onExpire && onExpire();
//           }
//           if (intervalRef.current != null) {
//             clearInterval(intervalRef.current);
//             intervalRef.current = null;
//           }
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);

//     return () => {
//       if (intervalRef.current != null) {
//         clearInterval(intervalRef.current);
//         intervalRef.current = null;
//       }
//     };
//   }, [onExpire]);

//   const mm = String(Math.floor(left / 60)).padStart(2, "0");
//   const ss = String(left % 60).padStart(2, "0");
//   const text = `${mm}:${ss}`;

//   return (
//     <div>
//       <p role="timer" style={{ margin: 0, color: "#666", fontWeight: 700 }}>
//         {text}
//       </p>
//     </div>
//   );
// }