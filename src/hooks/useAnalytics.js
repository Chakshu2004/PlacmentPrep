import { useState, useEffect, useMemo } from 'react';
import useQuizStore from '../store/quizStore';
import { apiService } from '../services/api';

export const useAnalytics = () => {
  const { testHistory } = useQuizStore();
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      try {
        const data = await apiService.getAnalytics('user123'); // Mock user ID
        setAnalytics(data);
      } catch (error) {
        console.error('Failed to fetch analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  const computedStats = useMemo(() => {
    if (!testHistory.length) return null;

    const totalTests = testHistory.length;
    const averageScore = testHistory.reduce((sum, test) => sum + test.score, 0) / totalTests;
    const recentTests = testHistory.slice(-5);

    return {
      totalTests,
      averageScore: Math.round(averageScore),
      recentTests,
      improvement: recentTests.length > 1 ?
        Math.round(recentTests[recentTests.length - 1].score - recentTests[0].score) : 0
    };
  }, [testHistory]);

  return {
    analytics,
    computedStats,
    loading
  };
};