import { useState, useEffect, useCallback } from 'react';
import useQuizStore from '../store/quizStore';
import { apiService } from '../services/api';

export const useQuiz = () => {
  const store = useQuizStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const startQuiz = useCallback(async (subjectId, difficulty) => {
    setLoading(true);
    setError(null);

    try {
      store.startSession(subjectId, difficulty);
      const questions = await apiService.fetchQuestions(subjectId, difficulty);
      store.setQuestions(questions);
    } catch (err) {
      setError('Failed to load questions. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [store]);

  const submitQuiz = useCallback(async () => {
    if (!store.currentSession) return;

    setLoading(true);
    try {
      const result = await apiService.submitTest(
        store.currentSession,
        store.answers,
        store.currentSession.startTime ? Date.now() - store.currentSession.startTime : 0
      );
      store.addTestResult(result);
      store.endSession();
      return result;
    } catch (err) {
      setError('Failed to submit test. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [store]);

  return {
    ...store,
    loading,
    error,
    startQuiz,
    submitQuiz
  };
};