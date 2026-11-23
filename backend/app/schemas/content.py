from typing import List, Optional
from pydantic import BaseModel, Field

class NoteCreate(BaseModel):
    courseId: str
    courseName: str
    title: str
    content: str
    author: str
    attachmentUrl: Optional[str] = None

class Note(BaseModel):
    id: str
    courseId: str
    courseName: str
    title: str
    content: str
    author: str
    createdAt: str
    attachmentUrl: Optional[str] = None

class AssignmentCreate(BaseModel):
    courseId: str
    courseName: str
    title: str
    description: str
    dueDate: str
    points: int = 100
    author: str

class Assignment(BaseModel):
    id: str
    courseId: str
    courseName: str
    title: str
    description: str
    dueDate: str
    points: int
    author: str
    createdAt: str
    submissionsCount: int = 0

class AssignmentSubmissionRequest(BaseModel):
    assignmentId: str
    studentId: str
    studentName: str
    submissionText: str

class AssignmentSubmission(BaseModel):
    id: str
    assignmentId: str
    studentId: str
    studentName: str
    submissionText: str
    submittedAt: str
    grade: Optional[str] = "Pending Review"

class QuizQuestion(BaseModel):
    id: str
    question: str
    options: List[str]
    correctAnswerIndex: int

class QuizCreate(BaseModel):
    courseId: str
    courseName: str
    title: str
    description: str
    durationMinutes: int = 15
    questions: List[QuizQuestion]
    author: str

class Quiz(BaseModel):
    id: str
    courseId: str
    courseName: str
    title: str
    description: str
    durationMinutes: int
    questions: List[QuizQuestion]
    author: str
    createdAt: str
    attemptsCount: int = 0

class QuizAttemptRequest(BaseModel):
    quizId: str
    studentId: str
    studentName: str
    selectedAnswers: List[int]

class QuizAttemptResult(BaseModel):
    attemptId: str
    quizId: str
    studentId: str
    studentName: str
    score: int
    totalQuestions: int
    percentage: float
    passed: bool
    attemptedAt: str
