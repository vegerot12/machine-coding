import React, { useState, useRef } from 'react';

const Stopwatch2: React.FC = () => {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef< ReturnType<typeof setInterval> | null>(null);

  const start = () => {
    if (!running) {
      setRunning(true);
      intervalRef.current = setInterval(() => {
        setSeconds(sec => sec + 1);
      }, 1000);
    }
  };

  const stop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setRunning(false);
    }
  };

  const reset = () => {
    stop();
    setSeconds(0);
  };

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: 24 }}>
      <h2>Stopwatch</h2>
      <div style={{ fontSize: 48, margin: 16 }}>{seconds}s</div>
      <div>
        <button onClick={start} disabled={running} style={{margin: 8}}>Start</button>
        <button onClick={stop} disabled={!running} style={{margin: 8}}>Stop</button>
        <button onClick={reset} style={{margin: 8}}>Reset</button>
      </div>
    </div>
  );
};

export default Stopwatch2;
