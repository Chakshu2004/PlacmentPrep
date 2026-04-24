import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Icon } from '../components/Icon';
import { SUBJECTS } from '../../data/questions';

const SubjectDetail = () => {
  const { subjectId } = useParams();
  const navigate = useNavigate();
  const subject = SUBJECTS.find(s => s.id === subjectId);
  const [selectedDifficulty, setSelectedDifficulty] = React.useState(null);

  const difficulties = [
    { id: 'easy', label: 'Easy', icon: 'sentiment_satisfied', desc: 'Foundational concepts', qs: 5, color: '#1a6640', bg: '#d2f4e3', border: '#b2e4cc' },
    { id: 'medium', label: 'Medium', icon: 'sentiment_neutral', desc: 'Application-level problems', qs: 5, color: '#7a5500', bg: '#fff3cd', border: '#ffe08a' },
    { id: 'hard', label: 'Hard', icon: 'sentiment_very_dissatisfied', desc: 'Advanced & tricky questions', qs: 5, color: '#93000a', bg: '#ffdad6', border: '#ffb3ad' }
  ];

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <div className="sticky top-0 z-30 bg-white border-b" style={{ borderColor: 'var(--outline-variant)' }}>
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-3">
          <button onClick={() => navigate('/')} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors">
            <Icon name="arrow_back" style={{ color: 'var(--primary)' }} />
          </button>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: subject.color }}>
            <Icon name={subject.icon} className="text-white text-base" />
          </div>
          <div>
            <h1 className="font-lexend font-semibold text-base" style={{ color: 'var(--primary)' }}>{subject.name}</h1>
            <p className="text-xs" style={{ color: 'var(--on-surface-variant)' }}>15 questions across 3 levels</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="font-lexend font-semibold text-lg mb-3" style={{ color: 'var(--primary)' }}>Topics Covered</h2>
          <div className="flex flex-wrap gap-2">
            {subject.topics.map(t => (
              <span key={t} className="px-3 py-1 rounded-full text-xs font-semibold" style={{ background: 'var(--surface-container)', color: 'var(--on-surface-variant)', border: '1px solid var(--outline-variant)' }}>
                {t}
              </span>
            ))}
          </div>
        </div>

        <h2 className="font-lexend font-semibold text-lg mb-4" style={{ color: 'var(--primary)' }}>Select Your Level</h2>
        <p className="text-sm mb-5" style={{ color: 'var(--on-surface-variant)' }}>
          Choose a difficulty that matches your preparation level. You can practice each level independently.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {difficulties.map((d, i) => (
            <div key={d.id} onClick={() => setSelectedDifficulty(d.id)} className={`difficulty-btn p-5 rounded-xl cursor-pointer border-2 animate-fade-up stagger-${i + 1}`} style={{ background: selectedDifficulty === d.id ? d.bg : 'white', borderColor: selectedDifficulty === d.id ? d.color : 'var(--outline-variant)' }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: d.bg, border: `1px solid ${d.border}` }}>
                <Icon name={d.icon} style={{ color: d.color, fontSize: '22px' }} />
              </div>
              <h3 className="font-lexend font-semibold text-base mb-1" style={{ color: d.color }}>{d.label}</h3>
              <p className="text-xs mb-3" style={{ color: 'var(--on-surface-variant)' }}>{d.desc}</p>
              <div className="flex items-center gap-1.5">
                <Icon name="help_outline" style={{ fontSize: '14px', color: 'var(--on-surface-variant)' }} />
                <span className="text-xs" style={{ color: 'var(--on-surface-variant)' }}>{d.qs} questions</span>
              </div>
              {selectedDifficulty === d.id && (
                <div className="mt-3 flex items-center gap-1" style={{ color: d.color }}>
                  <Icon name="check_circle" className="filled text-sm" />
                  <span className="text-xs font-semibold">Selected</span>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="p-4 rounded-xl mb-6 border animate-fade-up" style={{ background: 'var(--surface-low)', borderColor: 'var(--outline-variant)' }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'var(--primary-container)' }}>
                <Icon name="shuffle" className="text-white text-base" />
              </div>
              <div>
                <p className="font-semibold text-sm font-lexend" style={{ color: 'var(--primary)' }}>Mixed Challenge</p>
                <p className="text-xs" style={{ color: 'var(--on-surface-variant)' }}>All 15 questions — Easy, Medium & Hard</p>
              </div>
            </div>
            <button onClick={() => navigate(`/quiz/${subjectId}/all`)} className="px-4 py-2 rounded-lg text-xs font-lexend font-semibold transition-all hover:opacity-90 active:scale-95" style={{ background: 'var(--primary)', color: 'white' }}>
              Start All
            </button>
          </div>
        </div>

        <button disabled={!selectedDifficulty} onClick={() => selectedDifficulty && navigate(`/quiz/${subjectId}/${selectedDifficulty}`)} className="w-full py-3.5 rounded-xl font-lexend font-semibold text-base transition-all active:scale-98" style={{ background: selectedDifficulty ? 'var(--primary)' : 'var(--outline-variant)', color: selectedDifficulty ? 'white' : 'var(--on-surface-variant)', cursor: selectedDifficulty ? 'pointer' : 'not-allowed' }}>
          {selectedDifficulty ? `Start ${selectedDifficulty.charAt(0).toUpperCase() + selectedDifficulty.slice(1)} Practice` : 'Select a Difficulty to Continue'}
        </button>
      </div>
    </div>
  );
};
