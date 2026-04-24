import { create } from 'zustand';

const useQuizStore = create((set, get) => ({
  // Current session
  currentSession: null,
  questions: [],
  answers: {},
  score: 0,
  timer: 0,
  bookmarks: new Set(),

  // Actions
  startSession: (subjectId, difficulty) => set({
    currentSession: { subjectId, difficulty, startTime: Date.now() },
    answers: {},
    score: 0,
    timer: difficulty === 'hard' ? 2700 : difficulty === 'medium' ? 1800 : 900,
    bookmarks: new Set()
  }),

  setQuestions: (questions) => set({ questions }),

  selectAnswer: (questionId, answerIndex) => set((state) => ({
    answers: { ...state.answers, [questionId]: answerIndex }
  })),

  toggleBookmark: (questionId) => set((state) => {
    const newBookmarks = new Set(state.bookmarks);
    if (newBookmarks.has(questionId)) {
      newBookmarks.delete(questionId);
    } else {
      newBookmarks.add(questionId);
    }
    return { bookmarks: newBookmarks };
  }),

  updateTimer: (time) => set({ timer: time }),

  calculateScore: () => set((state) => {
    const correct = state.questions.filter(q => state.answers[q.id] === q.answer).length;
    return { score: correct };
  }),

  endSession: () => set({
    currentSession: null,
    questions: [],
    answers: {},
    timer: 0
  }),

  // Analytics
  testHistory: [],
  addTestResult: (result) => set((state) => ({
    testHistory: [...state.testHistory, result]
  }))
}));

export default useQuizStore;