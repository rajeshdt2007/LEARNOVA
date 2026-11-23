from datetime import datetime, timezone
import uuid
from typing import List
from fastapi import APIRouter
from app.schemas.analytics import (
    CohortOverview,
    CourseMetric,
    StudentSummary,
    InterventionRequest,
    InterventionResponse,
    WeeklyTrend
)

router = APIRouter()

# In-memory institutional data store for instant demo and analytics responsiveness
_INTERVENTIONS_STORE: List[InterventionResponse] = [
    InterventionResponse(
        id="INT-901",
        studentId="STU-042",
        studentName="Marcus Vance",
        interventionType="Academic Tutoring Referral",
        notes="Referred to STEM center after scoring below 60% on Week 3 Algorithm Diagnostic.",
        author="Prof. Sarah Jenkins",
        createdAt="2026-11-18T10:30:00Z",
        status="active"
    ),
    InterventionResponse(
        id="INT-902",
        studentId="STU-088",
        studentName="Elena Rostova",
        interventionType="Attendance Counseling",
        notes="Unexcused absence on 3 consecutive lab sessions. Met with Academic Advisor.",
        author="Dr. Alan Turing",
        createdAt="2026-11-20T14:15:00Z",
        status="resolved"
    )
]

STUDENT_ROSTER: List[StudentSummary] = [
    StudentSummary(
        id="STU-042",
        fullName="Marcus Vance",
        institutionalId="CS-2026-042",
        email="marcus.vance@university.edu",
        department="Computer Science",
        gpa=2.45,
        attendance=74.5,
        riskLevel="high",
        riskReason="Low quiz average (58%) & missed 3 lab milestones",
        assignmentsCompleted=6,
        assignmentsTotal=10,
        lastActive="2 days ago"
    ),
    StudentSummary(
        id="STU-088",
        fullName="Elena Rostova",
        institutionalId="CS-2026-088",
        email="elena.rostova@university.edu",
        department="Computer Science",
        gpa=2.88,
        attendance=81.0,
        riskLevel="moderate",
        riskReason="Attendance dropped 14% over past two weeks",
        assignmentsCompleted=8,
        assignmentsTotal=10,
        lastActive="Today, 9:20 AM"
    ),
    StudentSummary(
        id="STU-105",
        fullName="Devon Campbell",
        institutionalId="ENG-2026-105",
        email="devon.campbell@university.edu",
        department="Electrical Engineering",
        gpa=3.75,
        attendance=96.0,
        riskLevel="excelling",
        riskReason="Top 5% in cohort problem sets & projects",
        assignmentsCompleted=10,
        assignmentsTotal=10,
        lastActive="Today, 11:45 AM"
    ),
    StudentSummary(
        id="STU-144",
        fullName="Amina Al-Mansoor",
        institutionalId="MATH-2026-144",
        email="amina.mansoor@university.edu",
        department="Applied Mathematics",
        gpa=3.92,
        attendance=98.5,
        riskLevel="excelling",
        riskReason="Perfect midterm score & active peer mentoring",
        assignmentsCompleted=10,
        assignmentsTotal=10,
        lastActive="Today, 1:10 PM"
    ),
    StudentSummary(
        id="STU-182",
        fullName="Liam Gallagher",
        institutionalId="CS-2026-182",
        email="liam.gallagher@university.edu",
        department="Computer Science",
        gpa=3.10,
        attendance=89.0,
        riskLevel="stable",
        riskReason="Consistent homework submissions, steady 3.1 GPA",
        assignmentsCompleted=9,
        assignmentsTotal=10,
        lastActive="Yesterday"
    ),
    StudentSummary(
        id="STU-219",
        fullName="Chloe Zhang",
        institutionalId="BIO-2026-219",
        email="chloe.zhang@university.edu",
        department="Bioengineering",
        gpa=2.65,
        attendance=78.0,
        riskLevel="moderate",
        riskReason="Struggling with Differential Equations prerequisite",
        assignmentsCompleted=7,
        assignmentsTotal=10,
        lastActive="3 days ago"
    )
]

COURSES: List[CourseMetric] = [
    CourseMetric(
        id="CRS-101",
        code="CS 101",
        name="Data Structures & Algorithms",
        faculty="Prof. Sarah Jenkins",
        enrolled=142,
        avgGpa=3.18,
        atRiskCount=8,
        attendanceRate=91.4
    ),
    CourseMetric(
        id="CRS-204",
        code="MATH 204",
        name="Multivariate Calculus & Linear Algebra",
        faculty="Dr. Julian Vance",
        enrolled=115,
        avgGpa=2.95,
        atRiskCount=12,
        attendanceRate=86.2
    ),
    CourseMetric(
        id="CRS-310",
        code="CS 310",
        name="Database Systems & Cloud Architecture",
        faculty="Prof. Alan Turing",
        enrolled=98,
        avgGpa=3.42,
        atRiskCount=4,
        attendanceRate=94.8
    ),
    CourseMetric(
        id="CRS-402",
        code="AI 402",
        name="Machine Learning & Neural Networks",
        faculty="Dr. Elena Ward",
        enrolled=76,
        avgGpa=3.55,
        atRiskCount=3,
        attendanceRate=96.1
    )
]

WEEKLY_TRENDS: List[WeeklyTrend] = [
    WeeklyTrend(week="W1", avgQuizScore=78.2, engagementRate=85.0, attendance=96.5),
    WeeklyTrend(week="W2", avgQuizScore=81.5, engagementRate=88.4, attendance=94.8),
    WeeklyTrend(week="W3", avgQuizScore=80.1, engagementRate=82.6, attendance=92.1),
    WeeklyTrend(week="W4", avgQuizScore=75.6, engagementRate=79.2, attendance=88.5),
    WeeklyTrend(week="W5 (Midterm)", avgQuizScore=79.4, engagementRate=91.0, attendance=90.2),
    WeeklyTrend(week="W6", avgQuizScore=84.2, engagementRate=89.5, attendance=91.8),
    WeeklyTrend(week="W7", avgQuizScore=86.8, engagementRate=92.3, attendance=93.4),
    WeeklyTrend(week="W8", avgQuizScore=89.1, engagementRate=95.1, attendance=94.7),
]

@router.get("/cohort", response_model=CohortOverview, summary="Institutional Cohort Learning Analytics")
def get_cohort_overview() -> CohortOverview:
    """Returns high-level institution performance, longitudinal trends, and course metrics."""
    return CohortOverview(
        institutionName="LEARNOVA Institute of Technology",
        activeTerm="Fall Semester 2026",
        totalStudents=431,
        avgInstitutionalGpa=3.24,
        retentionRate=94.8,
        studentsAtRisk=27,
        weeklyTrends=WEEKLY_TRENDS,
        courses=COURSES
    )

@router.get("/students", response_model=List[StudentSummary], summary="Student Roster with Risk Radar")
def get_student_roster() -> List[StudentSummary]:
    """Returns students flagged with predictive learning indicators and risk metrics."""
    return STUDENT_ROSTER

@router.get("/interventions", response_model=List[InterventionResponse], summary="List Active Interventions")
def get_interventions() -> List[InterventionResponse]:
    """Returns active and completed early academic interventions."""
    return _INTERVENTIONS_STORE

@router.post("/interventions", response_model=InterventionResponse, summary="Log New Academic Intervention")
def create_intervention(payload: InterventionRequest) -> InterventionResponse:
    """Logs a faculty intervention for an at-risk student."""
    new_intervention = InterventionResponse(
        id=f"INT-{uuid.uuid4().hex[:6].upper()}",
        studentId=payload.studentId,
        studentName=payload.studentName,
        interventionType=payload.interventionType,
        notes=payload.notes,
        author=payload.author or "Faculty Advisor",
        createdAt=datetime.now(timezone.utc).isoformat(),
        status="active"
    )
    _INTERVENTIONS_STORE.insert(0, new_intervention)
    return new_intervention
