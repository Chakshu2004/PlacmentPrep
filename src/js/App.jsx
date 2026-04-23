const App = () => {
  const [page, setPage] = React.useState('home');
  const [pageParams, setPageParams] = React.useState({});
  const [quizData, setQuizData] = React.useState(null);
  const [stats, setStats] = React.useState({});

  const navigate = (to, params = {}) => {
    setPage(to);
    setPageParams(params);
    window.scrollTo(0, 0);
  };

  const startQuiz = (subjectId, difficulty) => {
    setPageParams({ subjectId, difficulty });
    setPage('quiz');
    window.scrollTo(0, 0);
  };

  const handleQuizComplete = (data) => {
    const { subjectId, difficulty } = pageParams;
    setQuizData(data);
    if (difficulty !== 'all') {
      const correct = data.questions.filter(q => data.answers[q.id] === q.answer).length;
      setStats(prev => ({
        ...prev,
        [subjectId]: {
          ...(prev[subjectId] || {}),
          [difficulty]: Math.max(correct, (prev[subjectId] || {})[difficulty] || 0)
        }
      }));
    }
    setPage('results');
    window.scrollTo(0, 0);
  };

  const retryQuiz = () => {
    setPage('quiz');
    setQuizData(null);
    window.scrollTo(0, 0);
  };

  return (
    <div>
      {!['quiz', 'mock', 'results'].includes(page) && (
        <nav className="bg-white border-b sticky top-0 z-40" style={{ borderColor: 'var(--outline-variant)' }}>
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('home')}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--primary)' }}>
                <Icon name="school" className="text-white text-base" />
              </div>
              <span className="font-lexend font-bold text-base" style={{ color: 'var(--primary)' }}>PlacementPrep</span>
            </div>
            <div className="flex items-center gap-1">
              {[
                { id: 'home', label: 'Home', icon: 'home' },
                { id: 'subjects', label: 'Subjects', icon: 'menu_book' },
                { id: 'mock', label: 'Mock Test', icon: 'quiz' }
              ].map(n => (
                <button key={n.id} onClick={() => navigate(n.id)} className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-lexend font-semibold nav-item transition-all" style={{ background: page === n.id ? 'var(--surface-container)' : 'transparent', color: page === n.id ? 'var(--primary)' : 'var(--on-surface-variant)' }}>
                  <Icon name={n.icon} style={{ fontSize: '16px' }} />
                  {n.label}
                </button>
              ))}
              <div className="flex sm:hidden items-center gap-1">
                {[{ id: 'home', icon: 'home' }, { id: 'subjects', icon: 'menu_book' }, { id: 'mock', icon: 'quiz' }].map(n => (
                  <button key={n.id} onClick={() => navigate(n.id)} className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: page === n.id ? 'var(--surface-container)' : 'transparent', color: page === n.id ? 'var(--primary)' : 'var(--on-surface-variant)' }}>
                    <Icon name={n.icon} style={{ fontSize: '20px' }} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </nav>
      )}

      {page === 'home' && <LandingPage onNavigate={navigate} stats={stats} />}

      {page === 'subjects' && (
        <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
          <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="font-lexend font-bold text-2xl mb-2" style={{ color: 'var(--primary)' }}>All Subjects</h1>
            <p className="text-sm mb-6" style={{ color: 'var(--on-surface-variant)' }}>Select a subject to choose your difficulty and start practicing</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {SUBJECTS.map((subj, i) => {
                const subjStats = stats[subj.id] || {};
                const totalDone = (subjStats.easy || 0) + (subjStats.medium || 0) + (subjStats.hard || 0);
                const pct = Math.round((totalDone / 15) * 100);
                return (
                  <div key={subj.id} className={`subject-card bg-white rounded-xl p-5 cursor-pointer animate-fade-up stagger-${Math.min(i + 1, 6)}`} onClick={() => navigate('subject-detail', { subjectId: subj.id })}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: subj.color }}>
                        <Icon name={subj.icon} className="text-white text-xl" />
                      </div>
                      {totalDone > 0 && <ProgressRing percent={pct} size={44} stroke={4} color={subj.color} />}
                    </div>
                    <h3 className="font-lexend font-semibold text-base mb-1" style={{ color: 'var(--primary)' }}>{subj.name}</h3>
                    <p className="text-xs mb-3" style={{ color: 'var(--on-surface-variant)' }}>{subj.description}</p>
                    <div className="flex gap-1.5 flex-wrap mb-3">
                      {['easy', 'medium', 'hard'].map(d => <DifficultyBadge key={d} level={d} />)}
                    </div>
                    <div className="flex items-center gap-1 text-xs" style={{ color: 'var(--primary)' }}>
                      <span className="font-semibold">Start →</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {page === 'subject-detail' && (
        <SubjectDetail subjectId={pageParams.subjectId} onNavigate={navigate} onStartQuiz={startQuiz} />
      )}

      {page === 'quiz' && (
        <QuizInterface key={`${pageParams.subjectId}-${pageParams.difficulty}-${Date.now()}`} subjectId={pageParams.subjectId} difficulty={pageParams.difficulty} onComplete={handleQuizComplete} onNavigate={navigate} />
      )}

      {page === 'results' && quizData && (
        <ResultsPage subjectId={pageParams.subjectId} difficulty={pageParams.difficulty} quizData={quizData} onNavigate={navigate} onRetry={retryQuiz} />
      )}

      {page === 'mock' && (
        <MockTest onComplete={() => { }} onNavigate={navigate} />
      )}
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
