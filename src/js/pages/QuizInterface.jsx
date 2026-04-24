import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Icon } from '../components/Icon';
import { DifficultyBadge } from '../components/DifficultyBadge';
import { SUBJECTS, QUESTIONS_DB } from '../../data/questions';
import { useQuiz } from '../hooks/useQuiz';
import { useTimer } from '../hooks/useTimer';
import { useProgress } from '../hooks/useProgress';

const QuizInterface = () => {
  const { subjectId, difficulty } = useParams();
  const navigate = useNavigate();
  const subject = SUBJECTS.find(s => s.id === subjectId);

  const { startQuiz, submitQuiz, loading, error } = useQuiz();
  const { timeRemaining, formatTime, isUrgent } = useTimer();
  const { currentQuestionIndex, progressPercentage, isComplete, isAnswered } = useProgress();

  const allQuestions = difficulty === 'all'
    ? [...QUESTIONS_DB[subjectId].easy, ...QUESTIONS_DB[subjectId].medium, ...QUESTIONS_DB[subjectId].hard]
    : QUESTIONS_DB[subjectId][difficulty];

  const q = allQuestions[currentQuestionIndex];

  const getDiffLabel = (id) => {
    if (QUESTIONS_DB[subjectId].easy.find(q => q.id === id)) return 'easy';
    if (QUESTIONS_DB[subjectId].medium.find(q => q.id === id)) return 'medium';
    return 'hard';
  };

  React.useEffect(() => {
    startQuiz(subjectId, difficulty);
  }, [subjectId, difficulty]);

  const handleSelect = (idx) => {
    // This will be handled by the store
  };

  const handleConfirm = () => {
    // This will be handled by the store
  };

  const handleNext = () => {
    // This will be handled by the store
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg)' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: 'var(--primary)' }}></div>
          <p style={{ color: 'var(--on-surface-variant)' }}>Loading quiz...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg)' }}>
        <div className="text-center">
          <Icon name="error" className="text-4xl mb-4" style={{ color: 'var(--error)' }} />
          <p className="text-lg font-semibold mb-2" style={{ color: 'var(--error)' }}>Error Loading Quiz</p>
          <p className="text-sm mb-4" style={{ color: 'var(--on-surface-variant)' }}>{error}</p>
          <button onClick={() => navigate('/')} className="px-6 py-2 rounded-lg font-lexend font-semibold" style={{ background: 'var(--primary)', color: 'white' }}>
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg)' }}>
      <div className="sticky top-0 z-30 bg-white border-b" style={{ borderColor: 'var(--outline-variant)' }}>
        <div className="max-w-3xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <button onClick={() => navigate('/')} className="w-7 h-7 rounded flex items-center justify-center hover:bg-gray-100">
                <Icon name="close" style={{ color: 'var(--on-surface-variant)', fontSize: '18px' }} />
              </button>
              <span className="font-lexend font-semibold text-sm" style={{ color: 'var(--primary)' }}>{subject.name}</span>
              {difficulty !== 'all' && <DifficultyBadge level={difficulty} />}
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-lexend" style={{ color: 'var(--on-surface-variant)' }}>{currentQuestionIndex + 1}/{allQuestions.length}</span>
              <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full font-lexend font-semibold text-sm ${isUrgent ? 'timer-urgent' : ''}`} style={{ background: isUrgent ? 'var(--error-container)' : 'var(--surface-container)', color: isUrgent ? 'var(--error)' : 'var(--primary)' }}>
                <Icon name="timer" style={{ fontSize: '15px' }} />
                {formatTime(timeRemaining)}
              </div>
            </div>
          </div>
          <div className="h-1.5 rounded-full" style={{ background: 'var(--surface-container)' }}>
            <div className="h-full rounded-full progress-bar-inner" style={{ width: progressPercentage + '%', background: subject.color }} />
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-3xl mx-auto w-full px-4 py-8">
        <div className="animate-scale-in">
          {difficulty === 'all' && (
            <div className="mb-3">
              <DifficultyBadge level={getDiffLabel(q.id)} />
            </div>
          )}
          <div className="bg-white rounded-xl p-6 mb-5 border" style={{ borderColor: 'var(--outline-variant)' }}>
            <p className="text-xs font-lexend font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--on-surface-variant)' }}>
              Question {currentQuestionIndex + 1}
            </p>
            <p className="text-base font-medium leading-relaxed whitespace-pre-wrap" style={{ color: 'var(--on-surface)', fontFamily: 'Public Sans' }}>
              {q.question}
            </p>
          </div>

          <div className="space-y-3 mb-6">
            {q.options.map((opt, i) => {
              let cls = 'option-btn';
              // Add logic for selected/correct/incorrect states

              return (
                <button key={i} onClick={() => handleSelect(i)} className={`${cls} w-full text-left p-4 rounded-xl flex items-center gap-3 transition-all`}>
                  <span className="w-7 h-7 rounded-lg flex-shrink-0 flex items-center justify-center font-lexend font-semibold text-xs" style={{ background: 'var(--surface-container)', color: 'var(--on-surface-variant)' }}>
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="text-sm" style={{ color: 'var(--on-surface)', fontFamily: 'Public Sans' }}>{opt}</span>
                  {/* Add check/cancel icons based on state */}
                </button>
              );
            })}
          </div>

          {/* Add explanation section when confirmed */}

          <div className="flex gap-3">
            {!isAnswered ? (
              <button onClick={handleConfirm} disabled={selected === null} className="flex-1 py-3 rounded-xl font-lexend font-semibold text-sm transition-all active:scale-98" style={{ background: selected !== null ? 'var(--primary)' : 'var(--outline-variant)', color: selected !== null ? 'white' : 'var(--on-surface-variant)', cursor: selected !== null ? 'pointer' : 'not-allowed' }}>
                Confirm Answer
              </button>
            ) : (
              <button onClick={handleNext} className="flex-1 py-3 rounded-xl font-lexend font-semibold text-sm transition-all hover:opacity-90 active:scale-98 flex items-center justify-center gap-2" style={{ background: 'var(--primary)', color: 'white', cursor: 'pointer' }}>
                {isComplete ? <><Icon name="assessment" className="text-base" />View Results</> : <><span>Next Question</span><Icon name="arrow_forward" className="text-base" /></>}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
