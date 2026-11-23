export type UserRole = 'student' | 'faculty' | 'admin';

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  institutionalId?: string;
  department?: string;
}

export interface ServiceStatus {
  name: string;
  status: string;
  configured: boolean;
  details?: Record<string, string>;
}

export interface HealthResponse {
  status: string;
  version: string;
  environment: string;
  timestamp: string;
  services: Record<string, ServiceStatus>;
}

export interface WeeklyTrend {
  week: string;
  avgQuizScore: number;
  engagementRate: number;
  attendance: number;
}

export interface CourseMetric {
  id: string;
  code: string;
  name: string;
  faculty: string;
  enrolled: number;
  avgGpa: number;
  atRiskCount: number;
  attendanceRate: number;
}

export interface StudentSummary {
  id: string;
  fullName: string;
  institutionalId: string;
  email: string;
  department: string;
  gpa: number;
  attendance: number;
  riskLevel: 'high' | 'moderate' | 'stable' | 'excelling';
  riskReason: string;
  assignmentsCompleted: number;
  assignmentsTotal: number;
  lastActive: string;
}

export interface Intervention {
  id: string;
  studentId: string;
  studentName: string;
  interventionType: string;
  notes: string;
  author: string;
  createdAt: string;
  status: string;
}

export interface CohortOverview {
  institutionName: string;
  activeTerm: string;
  totalStudents: number;
  avgInstitutionalGpa: number;
  retentionRate: number;
  studentsAtRisk: number;
  weeklyTrends: WeeklyTrend[];
  courses: CourseMetric[];
}

export interface Note {
  id: string;
  courseId: string;
  courseName: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  attachmentUrl?: string;
}

export interface NoteCreate {
  courseId: string;
  courseName: string;
  title: string;
  content: string;
  author: string;
  attachmentUrl?: string;
}

export interface Assignment {
  id: string;
  courseId: string;
  courseName: string;
  title: string;
  description: string;
  dueDate: string;
  points: number;
  author: string;
  createdAt: string;
  submissionsCount: number;
}

export interface AssignmentCreate {
  courseId: string;
  courseName: string;
  title: string;
  description: string;
  dueDate: string;
  points: number;
  author: string;
}

export interface AssignmentSubmission {
  id: string;
  assignmentId: string;
  studentId: string;
  studentName: string;
  submissionText: string;
  submittedAt: string;
  grade?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
}

export interface Quiz {
  id: string;
  courseId: string;
  courseName: string;
  title: string;
  description: string;
  durationMinutes: number;
  questions: QuizQuestion[];
  author: string;
  createdAt: string;
  attemptsCount: number;
}

export interface QuizCreate {
  courseId: string;
  courseName: string;
  title: string;
  description: string;
  durationMinutes: number;
  questions: QuizQuestion[];
  author: string;
}

export interface QuizAttemptResult {
  attemptId: string;
  quizId: string;
  studentId: string;
  studentName: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  passed: boolean;
  attemptedAt: string;
}

export type ActiveTab = 
  | 'home' 
  | 'classes' 
  | 'resources' 
  | 'community' 
  | 'about' 
  | 'overview' 
  | 'faculty' 
  | 'course-content' 
  | 'quiz-room' 
  | 'risk-radar' 
  | 'student-portal' 
  | 'health';
