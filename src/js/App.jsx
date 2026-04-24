import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from '../pages/LandingPage';
import { SubjectDetail } from '../pages/SubjectDetail';
import { QuizInterface } from '../pages/QuizInterface';
import { ResultsPage } from '../pages/ResultsPage';
import { MockTest } from '../pages/MockTest';
import { Dashboard } from '../pages/Dashboard';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/subjects" element={<SubjectDetail />} />
          <Route path="/subject/:subjectId" element={<SubjectDetail />} />
          <Route path="/quiz/:subjectId/:difficulty" element={<QuizInterface />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/mock-test" element={<MockTest />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
