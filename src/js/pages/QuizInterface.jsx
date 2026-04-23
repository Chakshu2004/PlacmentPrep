const QuizInterface = ({ subjectId, difficulty, onComplete, onNavigate }) => {
  const subject = SUBJECTS.find(s => s.id === subjectId);
  const allQuestions = difficulty === 'all'
    ? [...QUESTIONS_DB[subjectId].easy, ...QUESTIONS_DB[subjectId].medium, ...QUESTIONS_DB[subjectId].hard]
    : QUESTIONS_DB[subjectId][difficulty];

  const [currentIdx, setCurrentIdx] = React.useState(0);
  const [answers, setAnswers] = React.useState({});
  const [selected, setSelected] = React.useState(null);
  const [confirmed, setConfirmed] = React.useState(false);
  const [timeLeft, setTimeLeft] = React.useState(difficulty === 'hard' ? 90 : difficulty === 'medium' ? 60 : 45);
  const [totalTime, setTotalTime] = React.useState(0);
  const timerRef = React.useRef(null);
  const totalTimeRef = React.useRef(null);

  const q = allQuestions[currentIdx];
  const progress = (currentIdx / allQuestions.length) * 100;

  const getDiffLabel = (id) => {
    if (QUESTIONS_DB[subjectId].easy.find(q => q.id === id)) return 'easy';
    if (QUESTIONS_DB[subjectId].medium.find(q => q.id === id)) return 'medium';
    return 'hard';
  };

  React.useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { handleConfirm(true); return 0; }
        return t - 1;
      });
    }, 1000);
    totalTimeRef.current = setInterval(() => setTotalTime(t => t + 1), 1000);
    return () => { clearInterval(timerRef.current); clearInterval(totalTimeRef.current); };
  }, [currentIdx]);

  const resetTimer = () => {
    clearInterval(timerRef.current);
    const nextQ = allQuestions[currentIdx + 1];
    if (!nextQ) return;
    const nextDiff = getDiffLabel(nextQ.id);
    setTimeLeft(nextDiff === 'hard' ? 90 : nextDiff === 'medium' ? 60 : 45);
  };

  const handleSelect = (idx) => {
    if (confirmed) return;
    setSelected(idx);
  };

  const handleConfirm = (autoSkip = false) => {
    clearInterval(timerRef.current);
    setAnswers(prev => ({ ...prev, [q.id]: selected }));
    setConfirmed(true);
  };

  const handleNext = () => {
    if (currentIdx + 1 >= allQuestions.length) {
      clearInterval(totalTimeRef.current);
      onComplete({ answers, questions: allQuestions, totalTime });
    } else {
      setCurrentIdx(i => i + 1);
      setSelected(null);
      setConfirmed(false);
      resetTimer();
    }
  };

  const fmt = (s) => `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;
  const isUrgent = timeLeft <= 10;

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg)' }}>
      <div className="sticky top-0 z-30 bg-white border-b" style={{ borderColor: 'var(--outline-variant)' }}>
        <div className="max-w-3xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <button onClick={() => onNavigate('home')} className="w-7 h-7 rounded flex items-center justify-center hover:bg-gray-100">
                <Icon name="close" style={{ color: 'var(--on-surface-variant)', fontSize: '18px' }} />
              </button>
              <span className="font-lexend font-semibold text-sm" style={{ color: 'var(--primary)' }}>{subject.name}</span>
              {difficulty !== 'all' && <DifficultyBadge level={difficulty} />}
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-lexend" style={{ color: 'var(--on-surface-variant)' }}>{currentIdx + 1}/{allQuestions.length}</span>
              <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full font-lexend font-semibold text-sm ${isUrgent ? 'timer-urgent' : ''}`} style={{ background: isUrgent ? 'var(--error-container)' : 'var(--surface-container)', color: isUrgent ? 'var(--error)' : 'var(--primary)' }}>
                <Icon name="timer" style={{ fontSize: '15px' }} />
                {fmt(timeLeft)}
              </div>
            </div>
          </div>
          <div className="h-1.5 rounded-full" style={{ background: 'var(--surface-container)' }}>
            <div className="h-full rounded-full progress-bar-inner" style={{ width: progress + '%', background: subject.color }} />
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
              Question {currentIdx + 1}
            </p>
            <p className="text-base font-medium leading-relaxed whitespace-pre-wrap" style={{ color: 'var(--on-surface)', fontFamily: 'Public Sans' }}>
              {q.question}
            </p>
          </div>

          <div className="space-y-3 mb-6">
            {q.options.map((opt, i) => {
              let cls = 'option-btn';
              if (confirmed) {
                if (i === q.answer) cls += ' correct';
                else if (i === selected && i !== q.answer) cls += ' incorrect';
              } else if (selected === i) cls += ' selected';

              return (
                <button key={i} onClick={() => handleSelect(i)} className={`${cls} w-full text-left p-4 rounded-xl flex items-center gap-3 transition-all`}>
                  <span className="w-7 h-7 rounded-lg flex-shrink-0 flex items-center justify-center font-lexend font-semibold text-xs" style={{ background: 'var(--surface-container)', color: 'var(--on-surface-variant)' }}>
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="text-sm" style={{ color: 'var(--on-surface)', fontFamily: 'Public Sans' }}>{opt}</span>
                  {confirmed && i === q.answer && <Icon name="check_circle" className="filled ml-auto" style={{ color: 'var(--success)', fontSize: '20px' }} />}
                  {confirmed && i === selected && i !== q.answer && <Icon name="cancel" className="filled ml-auto" style={{ color: 'var(--error)', fontSize: '20px' }} />}
                </button>
              );
            })}
          </div>

          {confirmed && (
            <div className="p-4 rounded-xl mb-5 animate-fade-up" style={{ background: 'var(--surface-low)', border: '1px solid var(--outline-variant)' }}>
              <div className="flex items-center gap-2 mb-2">
                <Icon name="lightbulb" className="filled" style={{ color: '#7a5500', fontSize: '18px' }} />
                <span className="font-lexend font-semibold text-sm" style={{ color: 'var(--primary)' }}>Explanation</span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--on-surface-variant)' }}>{q.explanation}</p>
            </div>
          )}

          <div className="flex gap-3">
            {!confirmed ? (
              <button onClick={() => handleConfirm(false)} disabled={selected === null} className="flex-1 py-3 rounded-xl font-lexend font-semibold text-sm transition-all active:scale-98" style={{ background: selected !== null ? 'var(--primary)' : 'var(--outline-variant)', color: selected !== null ? 'white' : 'var(--on-surface-variant)', cursor: selected !== null ? 'pointer' : 'not-allowed' }}>
                Confirm Answer
              </button>
            ) : (
              <button onClick={handleNext} className="flex-1 py-3 rounded-xl font-lexend font-semibold text-sm transition-all hover:opacity-90 active:scale-98 flex items-center justify-center gap-2" style={{ background: 'var(--primary)', color: 'white', cursor: 'pointer' }}>
                {currentIdx + 1 >= allQuestions.length ? <><Icon name="assessment" className="text-base" />View Results</> : <><span>Next Question</span><Icon name="arrow_forward" className="text-base" /></>}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
