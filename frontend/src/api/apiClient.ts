import { CarbonCalculationResult, QuizResult, QuizResultDetail } from '../store/carbonStore';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

export const apiClient = {
  async calculateFootprint(payload: any): Promise<CarbonCalculationResult> {
    const response = await fetch(`${API_BASE_URL}/calculate/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!response.ok) throw new Error('Calculation failed');
    return response.json();
  },

  async getInsights(breakdown: any): Promise<{ insights: string[] }> {
    const response = await fetch(`${API_BASE_URL}/insights/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ breakdown })
    });
    if (!response.ok) throw new Error('Insights failed');
    return response.json();
  },

  async getQuizQuestions(): Promise<any[]> {
    const response = await fetch(`${API_BASE_URL}/quiz/questions`, {
      method: 'GET',
    });
    if (!response.ok) throw new Error('Failed to fetch questions');
    return response.json();
  },

  async submitQuiz(answers: any[]): Promise<QuizResult> {
    const response = await fetch(`${API_BASE_URL}/quiz/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answers })
    });
    if (!response.ok) throw new Error('Quiz submission failed');
    return response.json();
  }
};
