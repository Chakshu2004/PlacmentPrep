import { useState, useEffect, useCallback } from 'react';
import useQuizStore from '../store/quizStore';

export const useTimer = () => {
  const { timer, updateTimer, currentSession } = useQuizStore();
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning && timer > 0) {
      interval = setInterval(() => {
        updateTimer(timer - 1);
      }, 1000);
    } else if (timer === 0 && currentSession) {
      // Auto-submit when time runs out
      setIsRunning(false);
      // Trigger submit logic here or in parent component
    }

    return () => clearInterval(interval);
  }, [isRunning, timer, updateTimer, currentSession]);

  const startTimer = useCallback(() => setIsRunning(true), []);
  const pauseTimer = useCallback(() => setIsRunning(false), []);
  const resetTimer = useCallback(() => {
    setIsRunning(false);
    updateTimer(0);
  }, [updateTimer]);

  const formatTime = useCallback((seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  return {
    timeLeft: timer,
    isRunning,
    startTimer,
    pauseTimer,
    resetTimer,
    formatTime
  };
};