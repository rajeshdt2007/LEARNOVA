import React, { useState, useEffect } from 'react';
import { FluidContainer } from './components/layout/FluidContainer';
import { HeaderNav } from './components/layout/HeaderNav';
import { HeroFluidView } from './components/views/HeroFluidView';
import { FacultyHubView } from './components/views/FacultyHubView';
import { RiskRadarView } from './components/views/RiskRadarView';
import { StudentPortalView } from './components/views/StudentPortalView';
import { SystemHealthView } from './components/views/SystemHealthView';
import { CourseContentView } from './components/views/CourseContentView';
import { QuizRoomView } from './components/views/QuizRoomView';
import { SearchModal } from './components/modals/SearchModal';
import { AuthModal } from './components/modals/AuthModal';
import { InterventionModal } from './components/modals/InterventionModal';
import { CreateNoteModal } from './components/modals/CreateNoteModal';
import { CreateAssignmentModal } from './components/modals/CreateAssignmentModal';
import { CreateQuizModal } from './components/modals/CreateQuizModal';
import { SubmitAssignmentModal } from './components/modals/SubmitAssignmentModal';
import {
  ActiveTab,
  CohortOverview,
  StudentSummary,
  Intervention,
  User as UserType,
  Note,
  Assignment,
  Quiz
} from './types';
import {
  getCohortOverview,
  getStudentRoster,
  getInterventions,
  checkBackendHealth,
  getNotes,
  getAssignments,
  getQuizzes,
  FALLBACK_COHORT,
  FALLBACK_STUDENTS
} from './lib/api';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [cohort, setCohort] = useState<CohortOverview>(FALLBACK_COHORT);
  const [students, setStudents] = useState<StudentSummary[]>(FALLBACK_STUDENTS);
  const [interventions, setInterventions] = useState<Intervention[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  const [selectedAssignmentForSubmission, setSelectedAssignmentForSubmission] = useState<Assignment | null>(null);

  const [currentUser, setCurrentUser] = useState<UserType | null>({
    id: "USR-FAC-01",
    email: "sarah.jenkins@university.edu",
    fullName: "Prof. Sarah Jenkins",
    role: "faculty",
    department: "Computer Science",
    institutionalId: "FAC-8891"
  });
  const [apiOnline, setApiOnline] = useState<boolean | null>(null);

  // Modal states
  const [searchOpen, setSearchOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [createNoteOpen, setCreateNoteOpen] = useState(false);
  const [createAssignmentOpen, setCreateAssignmentOpen] = useState(false);
  const [createQuizOpen, setCreateQuizOpen] = useState(false);
  const [submitAssignmentOpen, setSubmitAssignmentOpen] = useState(false);

  const [interventionModalState, setInterventionModalState] = useState<{
    isOpen: boolean;
    studentId: string;
    studentName: string;
  }>({
    isOpen: false,
    studentId: '',
    studentName: '',
  });

  // Load live data from FastAPI backend with automatic graceful fallback
  useEffect(() => {
    checkBackendHealth()
      .then(() => setApiOnline(true))
      .catch(() => setApiOnline(false));

    getCohortOverview().then(data => setCohort(data));
    getStudentRoster().then(data => setStudents(data));
    getInterventions().then(data => setInterventions(data));
    getNotes().then(data => setNotes(data));
    getAssignments().then(data => setAssignments(data));
    getQuizzes().then(data => {
      setQuizzes(data);
      if (data.length > 0 && !activeQuiz) {
        setActiveQuiz(data[0]);
      }
    });
  }, []);

  // Global Keyboard listener for Cmd+K search shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleOpenInterventionModal = (studentId: string, studentName: string) => {
    setInterventionModalState({
      isOpen: true,
      studentId,
      studentName,
    });
  };

  const handleInterventionCreated = (newIntervention: Intervention) => {
    setInterventions(prev => [newIntervention, ...prev]);
  };

  const handleStartQuiz = (quiz: Quiz) => {
    setActiveQuiz(quiz);
    setActiveTab('quiz-room');
  };

  const handleOpenSubmitAssignment = (asg: Assignment) => {
    setSelectedAssignmentForSubmission(asg);
    setSubmitAssignmentOpen(true);
  };

  return (
    <FluidContainer>
      {/* Master Top Navigation Bar with working menu options & search */}
      <HeaderNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenAuth={() => setAuthOpen(true)}
        currentUser={currentUser}
        apiOnline={apiOnline}
      />

      {/* Dynamic Content Views based on active tab */}
      <main className="flex-1">
        {activeTab === 'overview' && (
          <HeroFluidView
            cohort={cohort}
            onExplore={() => setActiveTab('course-content')}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'course-content' && (
          <CourseContentView
            notes={notes}
            assignments={assignments}
            quizzes={quizzes}
            currentUser={currentUser}
            onOpenCreateNote={() => setCreateNoteOpen(true)}
            onOpenCreateAssignment={() => setCreateAssignmentOpen(true)}
            onOpenCreateQuiz={() => setCreateQuizOpen(true)}
            onOpenSubmitAssignment={handleOpenSubmitAssignment}
            onStartQuiz={handleStartQuiz}
          />
        )}

        {activeTab === 'quiz-room' && (
          <QuizRoomView
            quiz={activeQuiz || quizzes[0]}
            currentUser={currentUser}
            onExit={() => setActiveTab('course-content')}
          />
        )}

        {activeTab === 'faculty' && (
          <FacultyHubView
            cohort={cohort}
            setActiveTab={setActiveTab}
            onSelectStudentForIntervention={handleOpenInterventionModal}
          />
        )}

        {activeTab === 'risk-radar' && (
          <RiskRadarView
            students={students}
            interventions={interventions}
            onOpenInterventionModal={handleOpenInterventionModal}
          />
        )}

        {activeTab === 'student-portal' && (
          <StudentPortalView
            student={students[0]}
          />
        )}

        {activeTab === 'health' && (
          <SystemHealthView />
        )}
      </main>

      {/* Interactive Modals */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        setActiveTab={setActiveTab}
      />

      <AuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        currentUser={currentUser}
        onLogin={(user) => setCurrentUser(user)}
        onLogout={() => setCurrentUser(null)}
      />

      <InterventionModal
        isOpen={interventionModalState.isOpen}
        onClose={() => setInterventionModalState(prev => ({ ...prev, isOpen: false }))}
        studentId={interventionModalState.studentId}
        studentName={interventionModalState.studentName}
        onCreated={handleInterventionCreated}
      />

      <CreateNoteModal
        isOpen={createNoteOpen}
        onClose={() => setCreateNoteOpen(false)}
        currentUser={currentUser}
        onNoteCreated={(newNote) => setNotes(prev => [newNote, ...prev])}
      />

      <CreateAssignmentModal
        isOpen={createAssignmentOpen}
        onClose={() => setCreateAssignmentOpen(false)}
        currentUser={currentUser}
        onAssignmentCreated={(newAsg) => setAssignments(prev => [newAsg, ...prev])}
      />

      <CreateQuizModal
        isOpen={createQuizOpen}
        onClose={() => setCreateQuizOpen(false)}
        currentUser={currentUser}
        onQuizCreated={(newQuiz) => {
          setQuizzes(prev => [newQuiz, ...prev]);
          setActiveQuiz(newQuiz);
        }}
      />

      <SubmitAssignmentModal
        isOpen={submitAssignmentOpen}
        onClose={() => setSubmitAssignmentOpen(false)}
        assignment={selectedAssignmentForSubmission}
        currentUser={currentUser}
        onSubmitted={() => {
          getAssignments().then(data => setAssignments(data));
        }}
      />
    </FluidContainer>
  );
};

export default App;
