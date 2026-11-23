import uuid
from datetime import datetime, timezone
from typing import List
from fastapi import APIRouter
from app.schemas.content import (
    Note, NoteCreate,
    Assignment, AssignmentCreate, AssignmentSubmissionRequest, AssignmentSubmission,
    Quiz, QuizCreate, QuizQuestion, QuizAttemptRequest, QuizAttemptResult
)

router = APIRouter()

# In-memory stores pre-populated with realistic academic course material
_NOTES_STORE: List[Note] = [
    Note(
        id="NOTE-101",
        courseId="CRS-101",
        courseName="CS 101 - Data Structures & Algorithms",
        title="Week 4: Red-Black Trees & Balanced Search Complexity",
        content="Overview of self-balancing binary search trees. Key invariant: every path from root to leaf must contain the exact same number of black nodes. Worst-case search: O(log N). Rotations maintain balance during insertions.",
        author="Prof. Sarah Jenkins",
        createdAt="2026-11-20T10:00:00Z",
        attachmentUrl="https://learnova.institution.edu/docs/red_black_trees.pdf"
    ),
    Note(
        id="NOTE-102",
        courseId="CRS-204",
        courseName="MATH 204 - Multivariate Calculus",
        title="Lecture 8: Gradient Descent & Lagrange Multipliers",
        content="Constrained optimization methods in multidimensional vector fields. The Lagrange multiplier lambda represents the rate of change of the optimal value with respect to constraint relaxation.",
        author="Dr. Julian Vance",
        createdAt="2026-11-21T14:30:00Z",
        attachmentUrl="https://learnova.institution.edu/docs/lagrange_optimization.pdf"
    ),
    Note(
        id="NOTE-103",
        courseId="CRS-402",
        courseName="AI 402 - Machine Learning",
        title="Lecture 11: Transformer Attention Mechanism & Multi-Head Self-Attention",
        content="Mathematical derivation of Scaled Dot-Product Attention: Attention(Q, K, V) = softmax(QK^T / sqrt(d_k)) * V. Explains projection matrices and rotary positional embeddings.",
        author="Dr. Elena Ward",
        createdAt="2026-11-22T09:15:00Z",
        attachmentUrl="https://learnova.institution.edu/docs/transformer_attention.pdf"
    )
]

_ASSIGNMENTS_STORE: List[Assignment] = [
    Assignment(
        id="ASG-201",
        courseId="CRS-101",
        courseName="CS 101 - Data Structures & Algorithms",
        title="Algorithmic Problem Set 3: Graph Traversal & Dijkstra",
        description="Implement Dijkstra's shortest path algorithm using an indexed binary min-heap in O((V + E) log V). Submit source code and runtime benchmark comparison.",
        dueDate="Nov 29, 2026",
        points=100,
        author="Prof. Sarah Jenkins",
        createdAt="2026-11-19T11:00:00Z",
        submissionsCount=48
    ),
    Assignment(
        id="ASG-202",
        courseId="CRS-204",
        courseName="MATH 204 - Multivariate Calculus",
        title="Multivariable Optimization Problem Set 4",
        description="Solve constrained optimization problems using the Hessian determinant test and Lagrange multiplier equations.",
        dueDate="Dec 04, 2026",
        points=100,
        author="Dr. Julian Vance",
        createdAt="2026-11-20T16:00:00Z",
        submissionsCount=32
    ),
    Assignment(
        id="ASG-203",
        courseId="CRS-402",
        courseName="AI 402 - Machine Learning",
        title="Mini-Project: Train Convolutional & Transformer Models on CIFAR",
        description="Construct a residual network or vision transformer from scratch without high-level library abstractions. Report top-1 test accuracy and loss curves.",
        dueDate="Dec 10, 2026",
        points=150,
        author="Dr. Elena Ward",
        createdAt="2026-11-21T08:00:00Z",
        submissionsCount=19
    )
]

_SUBMISSIONS_STORE: List[AssignmentSubmission] = []

_QUIZZES_STORE: List[Quiz] = [
    Quiz(
        id="QZ-301",
        courseId="CRS-101",
        courseName="CS 101 - Data Structures & Algorithms",
        title="Midterm Concept Diagnostic: Trees & Complexity",
        description="Test your conceptual understanding of binary search trees, graph representations, and asymptotic Big-O bounds.",
        durationMinutes=15,
        questions=[
            QuizQuestion(
                id="Q1",
                question="What is the worst-case time complexity of searching for an element in an un-balanced Binary Search Tree (BST)?",
                options=["O(1)", "O(log N)", "O(N)", "O(N log N)"],
                correctAnswerIndex=2
            ),
            QuizQuestion(
                id="Q2",
                question="Which data structure provides O(1) amortized insertion, deletion, and lookup on average?",
                options=["Hash Table", "Red-Black Tree", "Binary Heap", "Linked List"],
                correctAnswerIndex=0
            ),
            QuizQuestion(
                id="Q3",
                question="What is the time complexity of Dijkstra's algorithm implemented with a Min-Heap priority queue?",
                options=["O(V^2)", "O((V + E) log V)", "O(E * V)", "O(V + E)"],
                correctAnswerIndex=1
            ),
            QuizQuestion(
                id="Q4",
                question="Which tree traversal method visits nodes in ascending sorted order in a Binary Search Tree?",
                options=["Pre-order", "In-order", "Post-order", "Level-order"],
                correctAnswerIndex=1
            )
        ],
        author="Prof. Sarah Jenkins",
        createdAt="2026-11-18T12:00:00Z",
        attemptsCount=64
    ),
    Quiz(
        id="QZ-302",
        courseId="CRS-402",
        courseName="AI 402 - Machine Learning",
        title="Neural Networks & Backpropagation Quick Quiz",
        description="Core concepts on activation functions, vanishing gradients, and gradient descent optimization.",
        durationMinutes=10,
        questions=[
            QuizQuestion(
                id="Q1",
                question="Which activation function helps mitigate the vanishing gradient problem in deep hidden layers?",
                options=["Sigmoid", "Tanh", "ReLU (Rectified Linear Unit)", "Step Function"],
                correctAnswerIndex=2
            ),
            QuizQuestion(
                id="Q2",
                question="What mathematical rule is the foundation of the backpropagation algorithm in neural networks?",
                options=["Chain Rule of Calculus", "Bayes Theorem", "L'Hopital's Rule", "Pythagorean Theorem"],
                correctAnswerIndex=0
            ),
            QuizQuestion(
                id="Q3",
                question="In Transformer architectures, why is dot-product attention scaled by 1 / sqrt(d_k)?",
                options=[
                    "To prevent gradients from vanishing when dot products grow large",
                    "To invert matrix multiplications",
                    "To convert logits to probabilities",
                    "To reduce memory allocation"
                ],
                correctAnswerIndex=0
            )
        ],
        author="Dr. Elena Ward",
        createdAt="2026-11-20T15:00:00Z",
        attemptsCount=41
    )
]

# ---------------------------------------------------------------------------
# Notes Endpoints (Teachers push notes, students read notes)
# ---------------------------------------------------------------------------
@router.get("/notes", response_model=List[Note], summary="Get all lecture notes")
def get_notes(courseId: str = None) -> List[Note]:
    if courseId:
        return [n for n in _NOTES_STORE if n.courseId == courseId]
    return _NOTES_STORE

@router.post("/notes", response_model=Note, summary="Teacher pushes new lecture note")
def create_note(payload: NoteCreate) -> Note:
    new_note = Note(
        id=f"NOTE-{uuid.uuid4().hex[:6].upper()}",
        courseId=payload.courseId,
        courseName=payload.courseName,
        title=payload.title,
        content=payload.content,
        author=payload.author,
        createdAt=datetime.now(timezone.utc).isoformat(),
        attachmentUrl=payload.attachmentUrl
    )
    _NOTES_STORE.insert(0, new_note)
    return new_note

# ---------------------------------------------------------------------------
# Assignments Endpoints (Teachers push assignments, students submit)
# ---------------------------------------------------------------------------
@router.get("/assignments", response_model=List[Assignment], summary="Get all assignments")
def get_assignments(courseId: str = None) -> List[Assignment]:
    if courseId:
        return [a for a in _ASSIGNMENTS_STORE if a.courseId == courseId]
    return _ASSIGNMENTS_STORE

@router.post("/assignments", response_model=Assignment, summary="Teacher creates new assignment")
def create_assignment(payload: AssignmentCreate) -> Assignment:
    new_assignment = Assignment(
        id=f"ASG-{uuid.uuid4().hex[:6].upper()}",
        courseId=payload.courseId,
        courseName=payload.courseName,
        title=payload.title,
        description=payload.description,
        dueDate=payload.dueDate,
        points=payload.points,
        author=payload.author,
        createdAt=datetime.now(timezone.utc).isoformat(),
        submissionsCount=0
    )
    _ASSIGNMENTS_STORE.insert(0, new_assignment)
    return new_assignment

@router.post("/assignments/submit", response_model=AssignmentSubmission, summary="Student submits assignment work")
def submit_assignment(payload: AssignmentSubmissionRequest) -> AssignmentSubmission:
    sub = AssignmentSubmission(
        id=f"SUB-{uuid.uuid4().hex[:6].upper()}",
        assignmentId=payload.assignmentId,
        studentId=payload.studentId,
        studentName=payload.studentName,
        submissionText=payload.submissionText,
        submittedAt=datetime.now(timezone.utc).isoformat(),
        grade="Submitted (Pending Review)"
    )
    _SUBMISSIONS_STORE.insert(0, sub)
    # Increment counter on assignment
    for a in _ASSIGNMENTS_STORE:
        if a.id == payload.assignmentId:
            a.submissionsCount += 1
            break
    return sub

# ---------------------------------------------------------------------------
# Quiz Endpoints (Teachers push quiz, students attempt quiz)
# ---------------------------------------------------------------------------
@router.get("/quizzes", response_model=List[Quiz], summary="Get all quizzes")
def get_quizzes(courseId: str = None) -> List[Quiz]:
    if courseId:
        return [q for q in _QUIZZES_STORE if q.courseId == courseId]
    return _QUIZZES_STORE

@router.post("/quizzes", response_model=Quiz, summary="Teacher creates new quiz")
def create_quiz(payload: QuizCreate) -> Quiz:
    new_quiz = Quiz(
        id=f"QZ-{uuid.uuid4().hex[:6].upper()}",
        courseId=payload.courseId,
        courseName=payload.courseName,
        title=payload.title,
        description=payload.description,
        durationMinutes=payload.durationMinutes,
        questions=payload.questions,
        author=payload.author,
        createdAt=datetime.now(timezone.utc).isoformat(),
        attemptsCount=0
    )
    _QUIZZES_STORE.insert(0, new_quiz)
    return new_quiz

@router.post("/quizzes/attempt", response_model=QuizAttemptResult, summary="Student attempts & submits quiz for grading")
def attempt_quiz(payload: QuizAttemptRequest) -> QuizAttemptResult:
    target_quiz = next((q for q in _QUIZZES_STORE if q.id == payload.quizId), None)
    if not target_quiz:
        raise ValueError("Quiz not found")

    correct_count = 0
    total = len(target_quiz.questions)

    for idx, q in enumerate(target_quiz.questions):
        if idx < len(payload.selectedAnswers):
            if payload.selectedAnswers[idx] == q.correctAnswerIndex:
                correct_count += 1

    pct = round((correct_count / total) * 100, 1) if total > 0 else 0.0
    passed = pct >= 60.0

    target_quiz.attemptsCount += 1

    return QuizAttemptResult(
        attemptId=f"ATT-{uuid.uuid4().hex[:6].upper()}",
        quizId=payload.quizId,
        studentId=payload.studentId,
        studentName=payload.studentName,
        score=correct_count,
        totalQuestions=total,
        percentage=pct,
        passed=passed,
        attemptedAt=datetime.now(timezone.utc).isoformat()
    )
