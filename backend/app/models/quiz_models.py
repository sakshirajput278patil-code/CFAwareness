from pydantic import BaseModel
from typing import List

class QuizQuestion(BaseModel):
    id: str
    question_text: str
    options: List[str]
    correct_option_index: int
    explanation: str

class QuizSubmissionItem(BaseModel):
    question_id: str
    selected_option_index: int

class QuizSubmission(BaseModel):
    answers: List[QuizSubmissionItem]

class QuizResultDetail(BaseModel):
    question_id: str
    is_correct: bool
    correct_option_index: int
    explanation: str

class QuizResult(BaseModel):
    score: int
    total_questions: int
    literacy_band: str  # Beginner, Aware, Climate Champion
    details: List[QuizResultDetail]
