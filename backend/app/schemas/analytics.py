from typing import List, Optional
from pydantic import BaseModel, Field

class WeeklyTrend(BaseModel):
    week: str
    avgQuizScore: float
    engagementRate: float
    attendance: float

class CourseMetric(BaseModel):
    id: str
    code: str
    name: str
    faculty: str
    enrolled: int
    avgGpa: float
    atRiskCount: int
    attendanceRate: float

class StudentSummary(BaseModel):
    id: str
    fullName: str
    institutionalId: str
    email: str
    department: str
    gpa: float
    attendance: float
    riskLevel: str  # "high" | "moderate" | "stable" | "excelling"
    riskReason: str
    assignmentsCompleted: int
    assignmentsTotal: int
    lastActive: str

class InterventionRequest(BaseModel):
    studentId: str
    studentName: str
    interventionType: str
    notes: str
    author: str

class InterventionResponse(BaseModel):
    id: str
    studentId: str
    studentName: str
    interventionType: str
    notes: str
    author: str
    createdAt: str
    status: str

class CohortOverview(BaseModel):
    institutionName: str
    activeTerm: str
    totalStudents: int
    avgInstitutionalGpa: float
    retentionRate: float
    studentsAtRisk: int
    weeklyTrends: List[WeeklyTrend]
    courses: List[CourseMetric]
