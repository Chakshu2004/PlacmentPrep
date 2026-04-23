const MockTest = ({ onComplete, onNavigate }) => {
  const [phase, setPhase] = React.useState('setup');
  const [mockDifficulty, setMockDifficulty] = React.useState('medium');
  const [mockQuestions, setMockQuestions] = React.useState([]);
  const [currentIdx, setCurrentIdx] = React.useState(0);
  const [answers, setAnswers] = React.useState({});
  const [selected, setSelected] = React.useState(null);
  const [confirmed, setConfirmed] = React.useState(false);
  const [timeLeft, setTimeLeft] = React.useState(3600);
  const [showResult, setShowResult] = React.useState(false);
  const timerRef = React.useRef(null);

  const generateMockQuestions = (diff) => {
    const questions = [];
    SUBJECTS.forEach(subj => {
      const pool = QUESTIONS_DB[subj.id][diff] || QUESTIONS_DB[subj.id].medium;
      const shuffled = [...pool].sort(() => Math.random() - 0.5);
      questions.push(...shuffled.slice(0, Math.min(3, shuffled.length)).map(q => ({ ...q, subjectId: subj.id, subjectName: subj.name, subjectIcon: subj.icon })));
    });
    return questions.sort(() => Math.random() - 0.5);
  };

  const startMock = () => {
    const qs = generateMockQuestions(mockDifficulty);
    setMockQuestions(qs);
    setPhase('quiz');
    const t = mockDifficulty === 'easy' ? 1800 : mockDifficulty === 'medium' ? 3000 : 3600;
    setTimeLeft(t);
  };

  React.useEffect(() => {
    if (phase === 'quiz') {
      timerRef.current = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) { clearInterval(timerRef.current); setShowResult(true); return 0; }
          return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [phase]);

  const fmt = (s) => `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;

  const handleNext = () => {
    const newAnswers = { ...answers, [mockQuestions[currentIdx].id]: selected };
    setAnswers(newAnswers);
    if (currentIdx + 1 >= mockQuestions.length) {
      clearInterval(timerRef.current);
      setAnswers(newAnswers);
      setShowResult(true);
    } else {
      setCurrentIdx(i => i + 1);
      setSelected(null);
      setConfirmed(false);
    }
  };

  if (showResult) {
    const correct = mockQuestions.filter(q => answers[q.id] === q.answer).length;
    const pct = Math.round((correct / mockQuestions.length) * 100);
    const bySubject = {};
    SUBJECTS.forEach(s => {
      const subjQs = mockQuestions.filter(q => q.subjectId === s.id);
      const subjCorrect = subjQs.filter(q => answers[q.id] === q.answer).length;
      bySubject[s.id] = { name: s.name, icon: s.icon, color: s.color, total: subjQs.length, correct: subjCorrect };
    });

    return (
      <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
        <div className="sticky top-0 z-30 bg-white border-b" style={{ borderColor: 'var(--outline-variant)' }}>
          <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
            <span className="font-lexend font-semibold text-sm" style={{ color: 'var(--primary)' }}>Mock Test Results</span>
            <button onClick={() => onNavigate('home')} className="px-3 py-1.5 rounded-lg text-xs font-lexend font-semibold" style={{ background: 'var(--surface-container)', color: 'var(--primary)' }}>Home</button>
          </div>
        </div>
        <div className="max-w-3xl mx-auto px-4 py-8">
          <div className="bg-white rounded-2xl p-6 border mb-6 text-center" style={{ borderColor: 'var(--outline-variant)' }}>
            <div className="flex justify-center mb-3"><ProgressRing percent={pct} size={90} stroke={7} color="#002045" /></div>
            <p className="font-lexend font-bold text-2xl" style={{ color: 'var(--primary)' }}>{correct}/{mockQuestions.length} Correct</p>
            <p className="text-sm mt-1" style={{ color: 'var(--on-surface-variant)' }}>{pct >= 70 ? '🎉 Great performance!' : pct >= 50 ? '👍 Good effort, keep practicing!' : '📚 More practice needed'}</p>
          </div>
          <h3 className="font-lexend font-semibold text-base mb-3" style={{ color: 'var(--primary)' }}>Subject-wise Breakdown</h3>
          <div className="space-y-3 mb-6">
            {Object.values(bySubject).filter(s => s.total > 0).map(s => (
              <div key={s.name} className="bg-white rounded-xl p-4 border" style={{ borderColor: 'var(--outline-variant)' }}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded flex items-center justify-center" style={{ background: s.color }}>
                      <Icon name={s.icon} className="text-white" style={{ fontSize: '13px' }} />
                    </div>
                    <span className="font-lexend font-semibold text-sm" style={{ color: 'var(--primary)' }}>{s.name}</span>
                  </div>
                  <span className="font-lexend font-bold text-sm" style={{ color: s.correct / s.total >= 0.7 ? 'var(--success)' : 'var(--error)' }}>{s.correct}/{s.total}</span>
                </div>
                <div className="h-1.5 rounded-full" style={{ background: 'var(--surface-container)' }}>
                  <div className="h-full rounded-full progress-bar-inner" style={{ width: Math.round(s.correct / s.total * 100) + '%', background: s.color }} />
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <button onClick={() => { setPhase('setup'); setShowResult(false); setAnswers({}); setCurrentIdx(0); setSelected(null); setConfirmed(false); }} className="flex-1 py-3 rounded-xl font-lexend font-semibold text-sm border-2 transition-all hover:bg-gray-50" style={{ borderColor: 'var(--primary)', color: 'var(--primary)' }}>
              Retake Mock
            </button>
            <button onClick={() => onNavigate('home')} className="flex-1 py-3 rounded-xl font-lexend font-semibold text-sm" style={{ background: 'var(--primary)', color: 'white' }}>
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (phase === 'setup') {
    const diffOptions = [
      { id: 'easy', label: 'Easy', desc: 'Build foundation, ~30 min', icon: 'sentiment_satisfied', color: '#1a6640', bg: '#d2f4e3' },
      { id: 'medium', label: 'Medium', desc: 'Balanced challenge, ~50 min', icon: 'sentiment_neutral', color: '#7a5500', bg: '#fff3cd' },
      { id: 'hard', label: 'Hard', desc: 'Full pressure, ~60 min', icon: 'sentiment_very_dissatisfied', color: '#93000a', bg: '#ffdad6' }
    ];

    return (
      <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
        <div className="sticky top-0 z-30 bg-white border-b" style={{ borderColor: 'var(--outline-variant)' }}>
          <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
            <button onClick={() => onNavigate('home')} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-100">
              <Icon name="arrow_back" style={{ color: 'var(--primary)' }} />
            </button>
            <span className="font-lexend font-semibold text-sm" style={{ color: 'var(--primary)' }}>Mock Test Setup</span>
          </div>
        </div>
        <div className="max-w-3xl mx-auto px-4 py-8">
          <div className="mb-8 p-5 rounded-xl" style={{ background: 'var(--primary)' }}>
            <div className="flex items-center gap-3 mb-2">
              <Icon name="quiz" className="text-2xl" style={{ color: '#adc7f7' }} />
              <h2 className="font-lexend font-bold text-xl text-white">Full Mock Test</h2>
            </div>
            <p style={{ color: '#86a0cd', fontSize: '14px' }}>~18 questions across all 6 subjects, simulating real placement test conditions.</p>
          </div>
          <h3 className="font-lexend font-semibold text-base mb-4" style={{ color: 'var(--primary)' }}>Select Difficulty</h3>
          <div className="grid grid-cols-1 gap-3 mb-8">
            {diffOptions.map(d => (
              <div key={d.id} onClick={() => setMockDifficulty(d.id)} className="p-4 rounded-xl border-2 cursor-pointer difficulty-btn flex items-center gap-4" style={{ background: mockDifficulty === d.id ? d.bg : 'white', borderColor: mockDifficulty === d.id ? d.color : 'var(--outline-variant)' }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: d.bg }}>
                  <Icon name={d.icon} style={{ color: d.color, fontSize: '22px' }} />
                </div>
                <div className="flex-1">
                  <p className="font-lexend font-semibold text-sm" style={{ color: d.color }}>{d.label}</p>
                  <p className="text-xs" style={{ color: 'var(--on-surface-variant)' }}>{d.desc}</p>
                </div>
                {mockDifficulty === d.id && <Icon name="check_circle" className="filled" style={{ color: d.color }} />}
              </div>
            ))}
          </div>
          <button onClick={startMock} className="w-full py-3.5 rounded-xl font-lexend font-semibold text-base transition-all hover:opacity-90 active:scale-98 flex items-center justify-center gap-2" style={{ background: 'var(--primary)', color: 'white', cursor: 'pointer' }}>
            <Icon name="play_arrow" className="text-lg" />
            Start Mock Test
          </button>
        </div>
      </div>
    );
  }

  const q = mockQuestions[currentIdx];
  const progress = (currentIdx / mockQuestions.length) * 100;
  const isUrgent = timeLeft <= 120;
  const subj = SUBJECTS.find(s => s.id === q.subjectId);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg)' }}>
      <div className="sticky top-0 z-30 bg-white border-b" style={{ borderColor: 'var(--outline-variant)' }}>
        <div className="max-w-3xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <span className="font-lexend font-semibold text-sm" style={{ color: 'var(--primary)' }}>Mock Test</span>
            <div className="flex items-center gap-3">
              <span className="text-xs font-lexend" style={{ color: 'var(--on-surface-variant)' }}>{currentIdx + 1}/{mockQuestions.length}</span>
              <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full font-lexend font-semibold text-sm ${isUrgent ? 'timer-urgent' : ''}`} style={{ background: isUrgent ? 'var(--error-container)' : 'var(--surface-container)', color: isUrgent ? 'var(--error)' : 'var(--primary)' }}>
                <Icon name="timer" style={{ fontSize: '15px' }} />
                {fmt(timeLeft)}
              </div>
            </div>
          </div>
          <div className="h-1.5 rounded-full" style={{ background: 'var(--surface-container)' }}>
            <div className="h-full rounded-full progress-bar-inner" style={{ width: progress + '%', background: 'var(--primary)' }} />
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-3xl mx-auto w-full px-4 py-8">
        <div className="animate-scale-in">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded flex items-center justify-center" style={{ background: subj.color }}>
              <Icon name={subj.icon} className="text-white" style={{ fontSize: '13px' }} />
            </div>
            <span className="text-xs font-semibold font-lexend" style={{ color: 'var(--on-surface-variant)' }}>{subj.name}</span>
            <DifficultyBadge level={mockDifficulty} />
          </div>
          <div className="bg-white rounded-xl p-5 mb-4 border" style={{ borderColor: 'var(--outline-variant)' }}>
            <p className="text-base font-medium leading-relaxed" style={{ color: 'var(--on-surface)' }}>{q.question}</p>
          </div>
          <div className="space-y-2.5 mb-6">
            {q.options.map((opt, i) => {
              let cls = 'option-btn';
              if (confirmed) {
                if (i === q.answer) cls += ' correct';
                else if (i === selected && i !== q.answer) cls += ' incorrect';
              } else if (selected === i) cls += ' selected';
              return (
                <button key={i} onClick={() => !confirmed && setSelected(i)} className={`${cls} w-full text-left p-3.5 rounded-xl flex items-center gap-3`}>
                  <span className="w-6 h-6 rounded flex-shrink-0 flex items-center justify-center font-lexend font-semibold text-xs" style={{ background: 'var(--surface-container)', color: 'var(--on-surface-variant)' }}>
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="text-sm">{opt}</span>
                  {confirmed && i === q.answer && <Icon name="check_circle" className="filled ml-auto" style={{ color: 'var(--success)', fontSize: '18px' }} />}
                  {confirmed && i === selected && i !== q.answer && <Icon name="cancel" className="filled ml-auto" style={{ color: 'var(--error)', fontSize: '18px' }} />}
                </button>
              );
            })}
          </div>
          {confirmed && (
            <div className="p-4 rounded-xl mb-4 animate-fade-up" style={{ background: 'var(--surface-low)', border: '1px solid var(--outline-variant)' }}>
              <p className="text-xs font-semibold mb-1" style={{ color: 'var(--primary)' }}>💡 {q.explanation}</p>
            </div>
          )}
          {!confirmed ? (
            <button onClick={() => { setConfirmed(true); setAnswers(prev => ({ ...prev, [q.id]: selected })); }} disabled={selected === null} className="w-full py-3 rounded-xl font-lexend font-semibold text-sm transition-all" style={{ background: selected !== null ? 'var(--primary)' : 'var(--outline-variant)', color: selected !== null ? 'white' : 'var(--on-surface-variant)', cursor: selected !== null ? 'pointer' : 'not-allowed' }}>
              Confirm
            </button>
          ) : (
            <button onClick={handleNext} className="w-full py-3 rounded-xl font-lexend font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90" style={{ background: 'var(--primary)', color: 'white', cursor: 'pointer' }}>
              {currentIdx + 1 >= mockQuestions.length ? 'See Results' : 'Next Question'}
              <Icon name="arrow_forward" className="text-base" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
