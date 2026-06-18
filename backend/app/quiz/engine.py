from app.models.quiz_models import QuizSubmission, QuizResult, QuizResultDetail
from app.quiz.questions import get_all_questions, get_question_by_id


def determine_literacy_band(score: int, total: int) -> str:
    percentage = score / total if total > 0 else 0
    if percentage >= 0.8:
        return "Climate Champion"
    elif percentage >= 0.5:
        return "Aware"
    else:
        return "Beginner"


def score_quiz(submission: QuizSubmission) -> QuizResult:
    total_questions = len(get_all_questions())
    score = 0
    details = []

    for answer in submission.answers:
        question = get_question_by_id(answer.question_id)
        if question:
            is_correct = answer.selected_option_index == question.correct_option_index
            if is_correct:
                score += 1
            details.append(
                QuizResultDetail(
                    question_id=question.id,
                    is_correct=is_correct,
                    correct_option_index=question.correct_option_index,
                    explanation=question.explanation,
                )
            )

    literacy_band = determine_literacy_band(score, total_questions)

    return QuizResult(
        score=score,
        total_questions=total_questions,
        literacy_band=literacy_band,
        details=details,
    )
