from app.models.quiz_models import QuizSubmission, QuizSubmissionItem
from app.quiz.engine import score_quiz, determine_literacy_band
from app.quiz.questions import get_all_questions

def test_determine_literacy_band():
    assert determine_literacy_band(10, 10) == "Climate Champion"
    assert determine_literacy_band(8, 10) == "Climate Champion"
    assert determine_literacy_band(5, 10) == "Aware"
    assert determine_literacy_band(4, 10) == "Beginner"
    assert determine_literacy_band(0, 10) == "Beginner"

def test_score_quiz_all_correct():
    questions = get_all_questions()
    answers = [
        QuizSubmissionItem(question_id=q.id, selected_option_index=q.correct_option_index)
        for q in questions
    ]
    submission = QuizSubmission(answers=answers)
    result = score_quiz(submission)
    
    assert result.score == len(questions)
    assert result.total_questions == len(questions)
    assert result.literacy_band == "Climate Champion"
    for detail in result.details:
        assert detail.is_correct is True

def test_score_quiz_all_incorrect():
    questions = get_all_questions()
    answers = []
    for q in questions:
        # Pick a wrong index
        wrong_idx = 0 if q.correct_option_index != 0 else 1
        answers.append(QuizSubmissionItem(question_id=q.id, selected_option_index=wrong_idx))
        
    submission = QuizSubmission(answers=answers)
    result = score_quiz(submission)
    
    assert result.score == 0
    assert result.literacy_band == "Beginner"
    for detail in result.details:
        assert detail.is_correct is False
