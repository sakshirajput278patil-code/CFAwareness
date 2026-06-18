import React, { useState, useEffect } from 'react';
import { useCarbonStore } from '../store/carbonStore';
import { apiClient } from '../api/apiClient';

export const QuizCard: React.FC = () => {
  const { quizResult, setQuizResult } = useCarbonStore();
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await apiClient.getQuizQuestions();
        setQuestions(data);
      } catch (err) {
        setError('Failed to load quiz questions.');
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  const handleOptionSelect = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = {
      question_id: questions[currentQuestionIndex].id,
      selected_option_index: optionIndex
    };
    setAnswers(newAnswers);
  };

  const handleNext = async () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Submit
      setLoading(true);
      try {
        const result = await apiClient.submitQuiz(answers);
        setQuizResult(result);
      } catch (err) {
        setError('Failed to submit quiz.');
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading && questions.length === 0) return <div className="card w-full max-w-2xl mx-auto text-center py-10">Loading quiz...</div>;
  if (error) return <div className="card w-full max-w-2xl mx-auto text-red-600 p-6">{error}</div>;

  if (quizResult) {
    return (
      <div className="card w-full max-w-2xl mx-auto" aria-live="polite">
        <h2 className="text-2xl mb-4 text-primary text-center">Quiz Results</h2>
        <div className="text-center mb-6">
          <p className="text-5xl font-bold text-primary-dark mb-2">{quizResult.score} / {quizResult.total_questions}</p>
          <p className="text-lg text-text-muted">Your literacy band is</p>
          <p className="text-2xl font-semibold text-secondary-dark">{quizResult.literacy_band}</p>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-xl font-medium border-b border-secondary-light pb-2">Review Answers</h3>
          {quizResult.details.map((detail: any, index: number) => {
            const question = questions.find(q => q.id === detail.question_id);
            if (!question) return null;
            return (
              <div key={index} className={`p-4 rounded-xl border ${detail.is_correct ? 'border-secondary-light bg-secondary/10' : 'border-red-200 bg-red-50'}`}>
                <p className="font-medium text-text mb-2">Q: {question.question_text}</p>
                <p className={`text-sm font-semibold mb-1 ${detail.is_correct ? 'text-primary' : 'text-red-600'}`}>
                  {detail.is_correct ? 'Correct' : 'Incorrect'}
                </p>
                <p className="text-sm text-text-muted bg-white p-3 rounded-lg border border-gray-100 shadow-sm mt-2">
                  <span className="font-semibold text-primary block mb-1">Fact:</span>
                  {detail.explanation}
                </p>
              </div>
            );
          })}
        </div>
        <button onClick={() => { setQuizResult(null); setAnswers([]); setCurrentQuestionIndex(0); }} className="btn-secondary w-full mt-6">Retake Quiz</button>
      </div>
    );
  }

  if (questions.length === 0) return null;

  const currentQ = questions[currentQuestionIndex];
  const currentAnswer = answers[currentQuestionIndex];
  const isAnswered = currentAnswer !== undefined;

  return (
    <div className="card w-full max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl text-primary font-semibold">Carbon Literacy Quiz</h2>
        <span className="text-sm bg-secondary-light/40 text-primary-dark py-1 px-3 rounded-full font-medium">
          Question {currentQuestionIndex + 1} of {questions.length}
        </span>
      </div>

      <div className="mb-8">
        <h3 className="text-lg text-text font-medium mb-4">{currentQ.question_text}</h3>
        
        <fieldset>
          <legend className="sr-only">Options for {currentQ.question_text}</legend>
          <div className="space-y-3">
            {currentQ.options.map((option: string, index: number) => (
              <label 
                key={index} 
                className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${
                  currentAnswer?.selected_option_index === index 
                    ? 'border-primary bg-primary/5 shadow-sm ring-1 ring-primary' 
                    : 'border-secondary-light hover:border-primary/50 hover:bg-gray-50'
                }`}
              >
                <input 
                  type="radio" 
                  name="quiz_option" 
                  className="w-5 h-5 text-primary focus:ring-primary border-gray-300" 
                  checked={currentAnswer?.selected_option_index === index}
                  onChange={() => handleOptionSelect(index)}
                />
                <span className="ml-3 text-text">{option}</span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="flex justify-end">
        <button 
          onClick={handleNext} 
          disabled={!isAnswered || loading}
          className="btn-primary min-w-[120px]"
        >
          {loading ? 'Submitting...' : currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next'}
        </button>
      </div>
    </div>
  );
};
