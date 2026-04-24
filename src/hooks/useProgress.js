import { useMemo } from 'react';
import useQuizStore from '../store/quizStore';

export const useProgress = () => {
  const { currentQuestionIndex, questions, answers, timeRemaining, totalTime } = useQuizStore();

  const progress = useMemo(() => {
    const totalQuestions = questions.length;
    const answeredQuestions = Object.keys(answers).length;
    const progressPercentage = totalQuestions > 0 ? (currentQuestionIndex / totalQuestions) * 100 : 0;
    const answeredPercentage = totalQuestions > 0 ? (answeredQuestions / totalQuestions) * 100 : 0;
    const timeProgress = totalTime > 0 ? ((totalTime - timeRemaining) / totalTime) * 100 : 0;

    return {
      currentQuestion: currentQuestionIndex + 1,
      totalQuestions,
      answeredQuestions,
      progressPercentage: Math.round(progressPercentage),
      answeredPercentage: Math.round(answeredPercentage),
      timeProgress: Math.round(timeProgress),
      isComplete: currentQuestionIndex >= totalQuestions - 1,
      isAnswered: answers[currentQuestionIndex] !== undefined
    };
  }, [currentQuestionIndex, questions, answers, timeRemaining, totalTime]);

  return progress;
};