const ResultsPage = ({ subjectId, difficulty, quizData, onNavigate, onRetry }) => {
  const { answers, questions, totalTime } = quizData;
  const subject = SUBJECTS.find(s => s.id === subjectId);

  const correct = questions.filter(q => answers[q.id] === q.answer).length;
  const total = questions.length;
  const pct = Math.round((correct / total) * 100);
  const fmt = (s) => s < 60 ? `${s}s` : `${Math.floor(s / 60)}m ${s % 60}s`;

  const grade = pct >= 80 ? { label: 'Excellent', color: '#1a6640', bg: '#d2f4e3', icon: 'military_tech' }
    : pct >= 60 ? { label: 'Good', color: '#7a5500', bg: '#fff3cd', icon: 'thumb_up' }
    : pct >= 40 ? { label: 'Fair', color: '#455f88', bg: 'var(--surface-container)', icon: 'trending_up' }
    : { label: 'Needs Work', color: '#93000a', bg: '#ffdad6', icon: 'replay' };

  const getDiffLabel = (id) => {
    if (!subjectId) return 'easy';
    if (QUESTIONS_DB[subjectId].easy.find(q => q.id === id)) return 'easy';
    if (QUESTIONS_DB[subjectId].medium.find(q => q.id === id)) return 'medium';
    return 'hard';
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <div className="sticky top-0 z-30 bg-white border-b" style={{ borderColor: 'var(--outline-variant)' }}>
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: subject.color }}>
              <Icon name={subject.icon} className="text-white" style={{ fontSize: '15px' }} />
            </div>
            <span className="font-lexend font-semibold text-sm" style={{ color: 'var(--primary)' }}>Results</span>
          </div>
          <button onClick={() => onNavigate('home')} className="px-3 py-1.5 rounded-lg text-xs font-lexend font-semibold" style={{ background: 'var(--surface-container)', color: 'var(--primary)' }}>
            Home
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl p-6 mb-6 border text-center animate-scale-in" style={{ borderColor: 'var(--outline-variant)' }}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4" style={{ background: grade.bg, color: grade.color }}>
            <Icon name={grade.icon} className="filled text-base" />
            <span className="font-lexend font-semibold text-sm">{grade.label}</span>
          </div>
          <div className="flex justify-center mb-4"><ProgressRing percent={pct} size={100} stroke={8} color={subject.color} /></div>
          <p className="font-lexend font-bold text-3xl mb-1" style={{ color: 'var(--primary)' }}>{correct}/{total}</p>
          <p className="text-sm" style={{ color: 'var(--on-surface-variant)' }}>questions answered correctly</p>
          <div className="grid grid-cols-3 gap-3 mt-5 pt-5 border-t" style={{ borderColor: 'var(--outline-variant)' }}>
            {[
              { label: 'Correct', val: correct, color: '#1a6640' },
              { label: 'Incorrect', val: total - correct - (Object.keys(answers).length - Object.keys(answers).filter(k => answers[k] !== null && answers[k] !== undefined).length), color: '#93000a' },
              { label: 'Time', val: fmt(totalTime), color: 'var(--primary)' }
            ].map(s => (
              <div key={s.label} className="text-center">
                <p className="font-lexend font-bold text-xl" style={{ color: s.color }}>{s.val}</p>
                <p className="text-xs" style={{ color: 'var(--on-surface-variant)' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3 mb-6">
          <button onClick={onRetry} className="flex-1 py-3 rounded-xl font-lexend font-semibold text-sm border-2 transition-all hover:bg-gray-50 flex items-center justify-center gap-2" style={{ borderColor: 'var(--primary)', color: 'var(--primary)' }}>
            <Icon name="replay" className="text-base" />Retry
          </button>
          <button onClick={() => onNavigate('subject-detail', { subjectId })} className="flex-1 py-3 rounded-xl font-lexend font-semibold text-sm transition-all hover:opacity-90 flex items-center justify-center gap-2" style={{ background: 'var(--primary)', color: 'white' }}>
            <Icon name="change_circle" className="text-base" />Change Level
          </button>
        </div>

        <h2 className="font-lexend font-semibold text-lg mb-4" style={{ color: 'var(--primary)' }}>Answer Review</h2>
        <div className="space-y-4">
          {questions.map((q, idx) => {
            const userAns = answers[q.id];
            const isCorrect = userAns === q.answer;
            const skipped = userAns === null || userAns === undefined;
            return (
              <div key={q.id} className="rounded-xl p-4 border animate-fade-up" style={{ background: skipped ? 'var(--surface-low)' : isCorrect ? 'var(--success-container)' : 'var(--error-container)', borderLeft: `4px solid ${skipped ? 'var(--outline)' : isCorrect ? 'var(--success)' : 'var(--error)'}`, borderTop: '1px solid transparent', borderRight: '1px solid transparent', borderBottom: '1px solid transparent' }}>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-lexend font-bold text-sm" style={{ color: 'var(--primary)' }}>Q{idx + 1}</span>
                    <DifficultyBadge level={getDiffLabel(q.id)} />
                  </div>
                  <Icon name={skipped ? 'remove_circle' : isCorrect ? 'check_circle' : 'cancel'} className="filled flex-shrink-0" style={{ color: skipped ? 'var(--outline)' : isCorrect ? 'var(--success)' : 'var(--error)', fontSize: '20px' }} />
                </div>
                <p className="text-sm mb-3 font-medium" style={{ color: 'var(--on-surface)' }}>{q.question}</p>
                <div className="space-y-1.5">
                  {!skipped && userAns !== q.answer && (
                    <p className="text-xs" style={{ color: 'var(--error)' }}><span className="font-semibold">Your answer:</span> {q.options[userAns]}</p>
                  )}
                  <p className="text-xs" style={{ color: 'var(--success)' }}><span className="font-semibold">Correct:</span> {q.options[q.answer]}</p>
                  <p className="text-xs mt-2 leading-relaxed" style={{ color: 'var(--on-surface-variant)' }}>💡 {q.explanation}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
