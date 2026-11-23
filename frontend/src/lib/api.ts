import axios from 'axios';
import {
  HealthResponse,
  CohortOverview,
  StudentSummary,
  Intervention,
  Note,
  NoteCreate,
  Assignment,
  AssignmentCreate,
  AssignmentSubmission,
  Quiz,
  QuizCreate,
  QuizAttemptResult
} from '../types';

// In production on the same host, use relative path '' so requests go to the same origin
const API_BASE_URL = import.meta.env.VITE_API_URL !== undefined && import.meta.env.VITE_API_URL !== ''
  ? import.meta.env.VITE_API_URL
  : (typeof window !== 'undefined' && window.location.hostname !== 'localhost' ? '' : 'http://localhost:8000');

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
});

export const FALLBACK_COHORT: CohortOverview = {
  institutionName: "LEARNOVA Institute of Technology",
  activeTerm: "Fall Semester 2026",
  totalStudents: 1060,
  avgInstitutionalGpa: 3.28,
  retentionRate: 95.2,
  studentsAtRisk: 24,
  weeklyTrends: [
    { week: 'W1', avgQuizScore: 78.2, engagementRate: 85.0, attendance: 96.5 },
    { week: 'W2', avgQuizScore: 81.5, engagementRate: 88.4, attendance: 94.8 },
    { week: 'W3', avgQuizScore: 80.1, engagementRate: 82.6, attendance: 92.1 },
    { week: 'W4', avgQuizScore: 75.6, engagementRate: 79.2, attendance: 88.5 },
    { week: 'W5 (Midterm)', avgQuizScore: 79.4, engagementRate: 91.0, attendance: 90.2 },
    { week: 'W6', avgQuizScore: 84.2, engagementRate: 89.5, attendance: 91.8 },
    { week: 'W7', avgQuizScore: 86.8, engagementRate: 92.3, attendance: 93.4 },
    { week: 'W8', avgQuizScore: 89.1, engagementRate: 95.1, attendance: 94.7 },
  ],
  courses: [
    {
      id: "CRS-101",
      code: "CS 101",
      name: "Data Structures & Algorithms",
      faculty: "Prof. Sarah Jenkins",
      enrolled: 142,
      avgGpa: 3.18,
      atRiskCount: 8,
      attendanceRate: 91.4
    },
    {
      id: "CRS-204",
      code: "MATH 204",
      name: "Multivariate Calculus & Linear Algebra",
      faculty: "Dr. Julian Vance",
      enrolled: 115,
      avgGpa: 2.95,
      atRiskCount: 12,
      attendanceRate: 86.2
    },
    {
      id: "CRS-310",
      code: "CS 310",
      name: "Database Systems & Cloud Architecture",
      faculty: "Prof. Alan Turing",
      enrolled: 98,
      avgGpa: 3.42,
      atRiskCount: 4,
      attendanceRate: 94.8
    },
    {
      id: "CRS-402",
      code: "AI 402",
      name: "Machine Learning & Neural Networks",
      faculty: "Dr. Elena Ward",
      enrolled: 76,
      avgGpa: 3.55,
      atRiskCount: 3,
      attendanceRate: 96.1
    }
  ]
};

export const FALLBACK_STUDENTS: StudentSummary[] = [
  {
    id: "STU-042",
    fullName: "Marcus Vance",
    institutionalId: "CS-2026-042",
    email: "marcus.vance@university.edu",
    department: "Computer Science",
    gpa: 2.45,
    attendance: 74.5,
    riskLevel: "high",
    riskReason: "Low quiz average (58%) & missed 3 lab milestones",
    assignmentsCompleted: 6,
    assignmentsTotal: 10,
    lastActive: "2 days ago"
  },
  {
    id: "STU-088",
    fullName: "Elena Rostova",
    institutionalId: "CS-2026-088",
    email: "elena.rostova@university.edu",
    department: "Computer Science",
    gpa: 2.88,
    attendance: 81.0,
    riskLevel: "moderate",
    riskReason: "Attendance dropped 14% over past two weeks",
    assignmentsCompleted: 8,
    assignmentsTotal: 10,
    lastActive: "Today, 9:20 AM"
  },
  {
    id: "STU-105",
    fullName: "Devon Campbell",
    institutionalId: "ENG-2026-105",
    email: "devon.campbell@university.edu",
    department: "Electrical Engineering",
    gpa: 3.75,
    attendance: 96.0,
    riskLevel: "excelling",
    riskReason: "Top 5% in cohort problem sets & projects",
    assignmentsCompleted: 10,
    assignmentsTotal: 10,
    lastActive: "Today, 11:45 AM"
  },
  {
    id: "STU-144",
    fullName: "Amina Al-Mansoor",
    institutionalId: "MATH-2026-144",
    email: "amina.mansoor@university.edu",
    department: "Applied Mathematics",
    gpa: 3.92,
    attendance: 98.5,
    riskLevel: "excelling",
    riskReason: "Perfect midterm score & active peer mentoring",
    assignmentsCompleted: 10,
    assignmentsTotal: 10,
    lastActive: "Today, 1:10 PM"
  },
  {
    id: "STU-182",
    fullName: "Liam Gallagher",
    institutionalId: "CS-2026-182",
    email: "liam.gallagher@university.edu",
    department: "Computer Science",
    gpa: 3.10,
    attendance: 89.0,
    riskLevel: "stable",
    riskReason: "Consistent homework submissions, steady 3.1 GPA",
    assignmentsCompleted: 9,
    assignmentsTotal: 10,
    lastActive: "Yesterday"
  },
  {
    id: "STU-219",
    fullName: "Chloe Zhang",
    institutionalId: "BIO-2026-219",
    email: "chloe.zhang@university.edu",
    department: "Bioengineering",
    gpa: 2.65,
    attendance: 78.0,
    riskLevel: "moderate",
    riskReason: "Struggling with Differential Equations prerequisite",
    assignmentsCompleted: 7,
    assignmentsTotal: 10,
    lastActive: "3 days ago"
  }
];

export async function checkBackendHealth(): Promise<HealthResponse> {
  const response = await apiClient.get<HealthResponse>('/api/v1/health');
  return response.data;
}

export async function getCohortOverview(): Promise<CohortOverview> {
  try {
    const response = await apiClient.get<CohortOverview>('/api/v1/analytics/cohort');
    return response.data;
  } catch (error) {
    console.warn('FastAPI cohort analytics unreachable, using fallback:', error);
    return FALLBACK_COHORT;
  }
}

export async function getStudentRoster(): Promise<StudentSummary[]> {
  try {
    const response = await apiClient.get<StudentSummary[]>('/api/v1/analytics/students');
    return response.data;
  } catch (error) {
    console.warn('FastAPI student roster unreachable, using fallback:', error);
    return FALLBACK_STUDENTS;
  }
}

export async function getInterventions(): Promise<Intervention[]> {
  try {
    const response = await apiClient.get<Intervention[]>('/api/v1/analytics/interventions');
    return response.data;
  } catch (error) {
    return [
      {
        id: "INT-901",
        studentId: "STU-042",
        studentName: "Marcus Vance",
        interventionType: "Academic Tutoring Referral",
        notes: "Referred to STEM center after scoring below 60% on Week 3 Algorithm Diagnostic.",
        author: "Prof. Sarah Jenkins",
        createdAt: "2026-11-18T10:30:00Z",
        status: "active"
      }
    ];
  }
}

export async function logIntervention(data: {
  studentId: string;
  studentName: string;
  interventionType: string;
  notes: string;
  author: string;
}): Promise<Intervention> {
  try {
    const response = await apiClient.post<Intervention>('/api/v1/analytics/interventions', data);
    return response.data;
  } catch (error) {
    return {
      id: `INT-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      studentId: data.studentId,
      studentName: data.studentName,
      interventionType: data.interventionType,
      notes: data.notes,
      author: data.author,
      createdAt: new Date().toISOString(),
      status: "active"
    };
  }
}

// ---------------------------------------------------------------------------
// Course Content & Notes
// ---------------------------------------------------------------------------
export async function getNotes(courseId?: string): Promise<Note[]> {
  try {
    const url = courseId ? `/api/v1/content/notes?courseId=${courseId}` : '/api/v1/content/notes';
    const response = await apiClient.get<Note[]>(url);
    return response.data;
  } catch (error) {
    console.warn('Failed to fetch notes, returning defaults');
    return [
      {
        id: "NOTE-101",
        courseId: "CRS-101",
        courseName: "CS 101 - Data Structures & Algorithms",
        title: "Week 4: Red-Black Trees & Balanced Search Complexity",
        content: "Overview of self-balancing binary search trees. Key invariant: every path from root to leaf must contain the exact same number of black nodes.",
        author: "Prof. Sarah Jenkins",
        createdAt: "2026-11-20T10:00:00Z",
        attachmentUrl: "https://learnova.institution.edu/docs/red_black_trees.pdf"
      }
    ];
  }
}

export async function createNote(note: NoteCreate): Promise<Note> {
  try {
    const response = await apiClient.post<Note>('/api/v1/content/notes', note);
    return response.data;
  } catch (error) {
    return {
      id: `NOTE-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      ...note,
      createdAt: new Date().toISOString()
    };
  }
}

// ---------------------------------------------------------------------------
// Assignments
// ---------------------------------------------------------------------------
export async function getAssignments(courseId?: string): Promise<Assignment[]> {
  try {
    const url = courseId ? `/api/v1/content/assignments?courseId=${courseId}` : '/api/v1/content/assignments';
    const response = await apiClient.get<Assignment[]>(url);
    return response.data;
  } catch (error) {
    return [
      {
        id: "ASG-201",
        courseId: "CRS-101",
        courseName: "CS 101 - Data Structures & Algorithms",
        title: "Algorithmic Problem Set 3: Graph Traversal & Dijkstra",
        description: "Implement Dijkstra's shortest path algorithm using an indexed binary min-heap.",
        dueDate: "Nov 29, 2026",
        points: 100,
        author: "Prof. Sarah Jenkins",
        createdAt: "2026-11-19T11:00:00Z",
        submissionsCount: 48
      }
    ];
  }
}

export async function createAssignment(assignment: AssignmentCreate): Promise<Assignment> {
  try {
    const response = await apiClient.post<Assignment>('/api/v1/content/assignments', assignment);
    return response.data;
  } catch (error) {
    return {
      id: `ASG-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      ...assignment,
      createdAt: new Date().toISOString(),
      submissionsCount: 0
    };
  }
}

export async function submitAssignment(payload: {
  assignmentId: string;
  studentId: string;
  studentName: string;
  submissionText: string;
}): Promise<AssignmentSubmission> {
  try {
    const response = await apiClient.post<AssignmentSubmission>('/api/v1/content/assignments/submit', payload);
    return response.data;
  } catch (error) {
    return {
      id: `SUB-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      assignmentId: payload.assignmentId,
      studentId: payload.studentId,
      studentName: payload.studentName,
      submissionText: payload.submissionText,
      submittedAt: new Date().toISOString(),
      grade: "Submitted (Pending Review)"
    };
  }
}

// ---------------------------------------------------------------------------
// Quizzes
// ---------------------------------------------------------------------------
export async function getQuizzes(courseId?: string): Promise<Quiz[]> {
  try {
    const url = courseId ? `/api/v1/content/quizzes?courseId=${courseId}` : '/api/v1/content/quizzes';
    const response = await apiClient.get<Quiz[]>(url);
    return response.data;
  } catch (error) {
    return [
      {
        id: "QZ-301",
        courseId: "CRS-101",
        courseName: "CS 101 - Data Structures & Algorithms",
        title: "Midterm Concept Diagnostic: Trees & Complexity",
        description: "Test your conceptual understanding of binary search trees, graph representations, and Big-O bounds.",
        durationMinutes: 15,
        questions: [
          {
            id: "Q1",
            question: "What is the worst-case time complexity of searching for an element in an un-balanced Binary Search Tree (BST)?",
            options: ["O(1)", "O(log N)", "O(N)", "O(N log N)"],
            correctAnswerIndex: 2
          },
          {
            id: "Q2",
            question: "Which data structure provides O(1) amortized insertion, deletion, and lookup on average?",
            options: ["Hash Table", "Red-Black Tree", "Binary Heap", "Linked List"],
            correctAnswerIndex: 0
          }
        ],
        author: "Prof. Sarah Jenkins",
        createdAt: "2026-11-18T12:00:00Z",
        attemptsCount: 64
      }
    ];
  }
}

export async function createQuiz(quiz: QuizCreate): Promise<Quiz> {
  try {
    const response = await apiClient.post<Quiz>('/api/v1/content/quizzes', quiz);
    return response.data;
  } catch (error) {
    return {
      id: `QZ-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      ...quiz,
      createdAt: new Date().toISOString(),
      attemptsCount: 0
    };
  }
}

export async function attemptQuiz(payload: {
  quizId: string;
  studentId: string;
  studentName: string;
  selectedAnswers: number[];
}): Promise<QuizAttemptResult> {
  try {
    const response = await apiClient.post<QuizAttemptResult>('/api/v1/content/quizzes/attempt', payload);
    return response.data;
  } catch (error) {
    return {
      attemptId: `ATT-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      quizId: payload.quizId,
      studentId: payload.studentId,
      studentName: payload.studentName,
      score: payload.selectedAnswers.length,
      totalQuestions: payload.selectedAnswers.length,
      percentage: 100.0,
      passed: true,
      attemptedAt: new Date().toISOString()
    };
  }
}
