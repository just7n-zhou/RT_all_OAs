import { useEffect, useRef, useState } from "react";
import styles from "./CookTimer.module.css";

export function CookTimer({ initialMinutes = 0 }: { initialMinutes?: number }) {
  const [minutes, setMinutes] = useState(initialMinutes);
  const [secondsLeft, setSecondsLeft] = useState(initialMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!isRunning) {
      return;
    }

    intervalRef.current = window.setInterval(() => {
      setSecondsLeft((current) => {
        if (current <= 1) {
          setIsRunning(false);
          return 0;
        }

        return current - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  const handleMinutesChange = (value: string) => {
    const nextMinutes = Math.max(0, Number(value));
    setMinutes(nextMinutes);
    setSecondsLeft(nextMinutes * 60);
    setIsRunning(false);
  };

  const handleStartPause = () => {
    if (secondsLeft <= 0) {
      return;
    }

    setIsRunning((current) => !current);
  };

  const handleReset = () => {
    setIsRunning(false);
    setSecondsLeft(minutes * 60);
    inputRef.current?.focus();
  };

  const displayMinutes = Math.floor(secondsLeft / 60);
  const displaySeconds = String(secondsLeft % 60).padStart(2, "0");

  return (
    <div className={styles.timer}>
      <h3>Cook Timer</h3>
      <div className={styles.controls}>
        <input
          ref={inputRef}
          type="number"
          min="0"
          value={minutes}
          onChange={(event) => handleMinutesChange(event.target.value)}
          placeholder="Minutes"
          className={styles.input}
        />
        <button onClick={handleStartPause} className={styles.button}>
          {isRunning ? "Pause" : "Start"}
        </button>
        <button onClick={handleReset} className={styles.button}>
          Reset
        </button>
      </div>
      <div className={styles.display}>
        {displayMinutes}:{displaySeconds}
      </div>
    </div>
  );
}
