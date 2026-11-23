import React, { useState, useEffect } from 'react';
import { FluidContainer } from './components/layout/FluidContainer';
import { HeaderNav } from './components/layout/HeaderNav';
import { HeroFluidView } from './components/views/HeroFluidView';
import { FacultyHubView } from './components/views/FacultyHubView';
import { RiskRadarView } from './components/views/RiskRadarView';
import { StudentPortalView } from './components/views/StudentPortalView';
import { SystemHealthView } from './components/views/SystemHealthView';
import { SearchModal } from './components/modals/SearchModal';
import { AuthModal } from './components/modals/AuthModal';
import { InterventionModal } from './components/modals/InterventionModal';
import {
  ActiveTab,
  CohortOverview,
  StudentSummary,
  Intervention,
  User as UserType
} from './types';
import {
  getCohortOverview,
  getStudentRoster,
  getInterventions,
  checkBackendHealth,
  FALLBACK_COHORT,
  FALLBACK_STUDENTS
} from './lib/api';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [cohort, setCohort] = useState<CohortOverview>(FALLBACK_COHORT);
  const [students, setStudents] = useState<StudentSummary[]>(FALLBACK_STUDENTS);
  const [interventions, setInterventions] = useState<Intervention[]>([]);
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [apiOnline, setApiOnline] = useState<boolean | null>(null);

  // Modal states
  const [searchOpen, setSearchOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
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
            onExplore={() => setActiveTab('faculty')}
            setActiveTab={setActiveTab}
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
    </FluidContainer>
  );
};

export default App;
