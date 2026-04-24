const LandingPage = ({ onNavigate, stats }) => {
  const totalQuestions = Object.values(QUESTIONS_DB).reduce((acc, subj) => acc + subj.easy.length + subj.medium.length + subj.hard.length, 0);

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <div style={{ background: 'linear-gradient(135deg, #002045 0%, #1a365d 60%, #2d476f 100%)' }} className="relative overflow-hidden">
        <div style={{ background: 'radial-gradient(ellipse at 80% 50%, rgba(173,199,247,0.15) 0%, transparent 60%)' }} className="absolute inset-0" />
        <div className="max-w-6xl mx-auto px-6 py-16 relative">
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6" style={{ background: 'rgba(173,199,247,0.2)', border: '1px solid rgba(173,199,247,0.3)' }}>
              <Icon name="school" className="text-sm" style={{ color: '#adc7f7' }} />
              <span className="text-xs font-semibold tracking-widest font-lexend" style={{ color: '#adc7f7' }}>PLACEMENT PREP HUB</span>
            </div>
            <h1 className="font-lexend font-800 text-white mb-4" style={{ fontSize: 'clamp(2rem,5vw,3.5rem)', lineHeight: 1.15 }}>
              Ace Your Campus<br />
              <span style={{ color: '#adc7f7' }}>Placement Drive</span>
            </h1>
            <p className="text-lg mb-8 max-w-xl" style={{ color: '#ffffff', lineHeight: 1.7 }}>
              Structured practice across all placement subjects — choose your difficulty, track your progress, and build interview confidence.
            </p>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => onNavigate('subjects')} className="flex items-center gap-2 px-6 py-3 rounded-lg font-lexend font-semibold text-sm transition-all hover:opacity-90 active:scale-95" style={{ background: '#adc7f7', color: '#001b3c' }}>
                <Icon name="play_arrow" className="text-lg" />
                Start Practicing
              </button>
              <button onClick={() => onNavigate('mock')} className="flex items-center gap-2 px-6 py-3 rounded-lg font-lexend font-semibold text-sm transition-all hover:opacity-90 active:scale-95" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.25)' }}>
                <Icon name="quiz" className="text-lg" />
                Take Mock Test
              </button>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-12 animate-fade-up stagger-3">
            {[
              { label: 'Questions', value: totalQuestions, icon: 'help_outline' },
              { label: 'Subjects', value: SUBJECTS.length, icon: 'menu_book' },
              { label: 'Difficulty Levels', value: 3, icon: 'signal_cellular_alt' }
            ].map(s => (
              <div key={s.label} className="text-center p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}>
                <Icon name={s.icon} className="text-2xl mb-1" style={{ color: '#adc7f7' }} />
                <div className="font-lexend font-bold text-3xl text-white">{s.value}</div>
                <div className="text-xs" style={{ color: '#e8f0ff' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="font-lexend font-semibold text-2xl mb-2" style={{ color: 'var(--primary)' }}>Choose a Subject</h2>
        <p className="text-sm mb-8" style={{ color: 'var(--on-surface-variant)' }}>Practice by topic or take a full mock test</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SUBJECTS.map((subj, i) => {
            const subjStats = stats[subj.id] || {};
            const totalDone = (subjStats.easy || 0) + (subjStats.medium || 0) + (subjStats.hard || 0);
            const pct = Math.round((totalDone / 15) * 100);
            return (
              <div key={subj.id} className={`subject-card bg-white rounded-xl p-5 cursor-pointer animate-fade-up stagger-${Math.min(i + 1, 6)}`} onClick={() => onNavigate('subject-detail', { subjectId: subj.id })}>
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: subj.color }}>
                    <Icon name={subj.icon} className="text-white text-xl" />
                  </div>
                  {totalDone > 0 && <ProgressRing percent={pct} size={44} stroke={4} color={subj.color} />}
                </div>
                <h3 className="font-lexend font-semibold text-base mb-1" style={{ color: 'var(--primary)' }}>{subj.name}</h3>
                <p className="text-xs mb-3" style={{ color: 'var(--on-surface-variant)' }}>{subj.description}</p>
                <div className="flex gap-1.5 flex-wrap">
                  {['easy', 'medium', 'hard'].map(d => <DifficultyBadge key={d} level={d} />)}
                </div>
                {totalDone > 0 && (
                  <div className="mt-3 pt-3 border-t" style={{ borderColor: 'var(--outline-variant)' }}>
                    <div className="flex justify-between text-xs mb-1" style={{ color: 'var(--on-surface-variant)' }}>
                      <span>Progress</span><span>{totalDone}/15 done</span>
                    </div>
                    <div className="h-1.5 rounded-full" style={{ background: 'var(--surface-container)' }}>
                      <div className="h-full rounded-full progress-bar-inner" style={{ width: pct + '%', background: subj.color }} />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-10 p-6 rounded-xl" style={{ background: 'var(--primary)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', right: -20, top: -20, width: 150, height: 150, borderRadius: '50%', background: 'rgba(173,199,247,0.1)' }} />
          <div style={{ position: 'absolute', right: 60, bottom: -40, width: 100, height: 100, borderRadius: '50%', background: 'rgba(173,199,247,0.08)' }} />
          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="font-lexend font-semibold text-xl text-white mb-1">Full Mock Test</h3>
              <p className="text-sm" style={{ color: '#adc7f7' }}>60 questions · Mixed subjects · Timed challenge</p>
            </div>
            <button onClick={() => onNavigate('mock')} className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-lexend font-semibold text-sm transition-all hover:opacity-90 active:scale-95 whitespace-nowrap" style={{ background: '#adc7f7', color: '#001b3c' }}>
              <Icon name="timer" className="text-base" />
              Start Mock Test
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
