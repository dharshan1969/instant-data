import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { Upload } from './components/Upload';
import { BackupHistory } from './components/BackupHistory';
import { Settings } from './components/Settings';
import { TrashBin } from './components/TrashBin';
import { BackupSchedulerComponent } from './components/scheduler/BackupScheduler';
import { LandingPage } from './components/auth/LandingPage';
import { LoginPage } from './components/auth/LoginPage';
import { SignupPage } from './components/auth/SignupPage';
import { UpgradePlanModal } from './components/UpgradePlanModal';
import { NotificationProvider } from './contexts/NotificationContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { Notifications } from './components/Notifications';
import { AuthProvider, useAuth } from './contexts/AuthContext';

type View = 'landing' | 'login' | 'signup' | 'dashboard' | 'upload' | 'history' | 'settings' | 'trash' | 'scheduler';

function AppContent() {
  const [currentView, setCurrentView] = useState<View>('landing');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const { isAuthenticated } = useAuth();

  const renderCurrentView = () => {
    switch (currentView) {
      case 'landing':
        return <LandingPage onNavigate={setCurrentView} />;
      case 'login':
        return <LoginPage onNavigate={setCurrentView} />;
      case 'signup':
        return <SignupPage onNavigate={setCurrentView} />;
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentView} />;
      case 'upload':
        return <Upload />;
      case 'history':
        return <BackupHistory />;
      case 'settings':
        return <Settings onNavigate={setCurrentView} onShowUpgrade={() => setShowUpgradeModal(true)} />;
      case 'trash':
        return <TrashBin />;
      case 'scheduler':
        return <BackupSchedulerComponent />;
      default:
        return <LandingPage onNavigate={setCurrentView} />;
    }
  };

  // Show auth pages if not authenticated
  if (!isAuthenticated && !['landing', 'login', 'signup'].includes(currentView)) {
    return (
      <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
        {renderCurrentView()}
        <Notifications />
        <UpgradePlanModal 
          isOpen={showUpgradeModal} 
          onClose={() => setShowUpgradeModal(false)} 
        />
      </div>
    );
  }

  // Show auth pages
  if (['landing', 'login', 'signup'].includes(currentView)) {
    return (
      <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
        {renderCurrentView()}
        <Notifications />
        <UpgradePlanModal 
          isOpen={showUpgradeModal} 
          onClose={() => setShowUpgradeModal(false)} 
        />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-white dark:bg-black transition-colors duration-300">
      <Sidebar
        currentView={currentView}
        onViewChange={setCurrentView}
        onShowUpgrade={() => setShowUpgradeModal(true)}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          currentView={currentView}
          onMenuClick={() => setIsSidebarOpen(true)}
        />
        
        <main className="flex-1 overflow-auto p-4 md:p-6 bg-white dark:bg-black transition-colors duration-300">
          {renderCurrentView()}
        </main>
      </div>
      
      <Notifications />
      <UpgradePlanModal 
        isOpen={showUpgradeModal} 
        onClose={() => setShowUpgradeModal(false)} 
      />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <NotificationProvider>
          <AppContent />
        </NotificationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;