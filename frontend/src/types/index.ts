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

export type ActiveTab = 'overview' | 'faculty' | 'risk-radar' | 'student-portal' | 'health';
