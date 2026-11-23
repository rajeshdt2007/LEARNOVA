import axios from 'axios';
import { HealthResponse, CohortOverview, StudentSummary, Intervention } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
});

// Fallback cohort data in case backend is loading or unreachable
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
    console.warn('FastAPI cohort analytics unreachable, using reliable fallback:', error);
    return FALLBACK_COHORT;
  }
}

export async function getStudentRoster(): Promise<StudentSummary[]> {
  try {
    const response = await apiClient.get<StudentSummary[]>('/api/v1/analytics/students');
    return response.data;
  } catch (error) {
    console.warn('FastAPI student roster unreachable, using reliable fallback:', error);
    return FALLBACK_STUDENTS;
  }
}

export async function getInterventions(): Promise<Intervention[]> {
  try {
    const response = await apiClient.get<Intervention[]>('/api/v1/analytics/interventions');
    return response.data;
  } catch (error) {
    console.warn('FastAPI interventions unreachable, returning defaults');
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
    console.warn('Could not post intervention to backend, creating local record:', error);
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
