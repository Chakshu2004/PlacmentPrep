// Mock API service - simulates backend calls
const API_BASE_URL = '/api'; // In real app, this would be the actual API URL

// Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock data - in real app, this would come from backend
const mockQuestions = {
  aptitude: {
    easy: [
      { id: "apt_e1", question: "What is 15% of 200?", options: ["25", "30", "35", "40"], answer: 1, explanation: "15% of 200 = 30" },
      // ... more questions
    ],
    // ... other difficulties
  },
  // ... other subjects
};

export const apiService = {
  // Fetch questions for a subject and difficulty
  async fetchQuestions(subjectId, difficulty) {
    await delay(500); // Simulate API call

    if (difficulty === 'all') {
      return [
        ...mockQuestions[subjectId].easy,
        ...mockQuestions[subjectId].medium,
        ...mockQuestions[subjectId].hard
      ];
    }

    return mockQuestions[subjectId][difficulty] || [];
  },

  // Submit test results
  async submitTest(sessionId, answers, timeSpent) {
    await delay(1000);

    // Calculate score
    const questions = await this.fetchQuestions(sessionId.subjectId, sessionId.difficulty);
    const correct = questions.filter(q => answers[q.id] === q.answer).length;
    const score = Math.round((correct / questions.length) * 100);

    // In real app, send to backend
    return {
      sessionId,
      score,
      correct,
      total: questions.length,
      timeSpent,
      submittedAt: new Date().toISOString()
    };
  },

  // Get user analytics
  async getAnalytics(userId) {
    await delay(800);

    // Mock analytics data
    return {
      totalTests: 15,
      averageScore: 78,
      accuracyBySubject: {
        aptitude: 85,
        verbal: 72,
        logical: 80,
        technical_cs: 75,
        programming: 82,
        hr: 90
      },
      performanceOverTime: [
        { date: '2024-01-01', score: 70 },
        { date: '2024-01-15', score: 75 },
        { date: '2024-02-01', score: 80 },
        // ... more data points
      ]
    };
  },

  // Get leaderboard
  async getLeaderboard() {
    await delay(600);

    return [
      { rank: 1, name: 'Alice', score: 95 },
      { rank: 2, name: 'Bob', score: 92 },
      { rank: 3, name: 'Charlie', score: 88 },
      // ... more
    ];
  }
};