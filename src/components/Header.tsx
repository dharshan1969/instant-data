import React from 'react';
import { Menu, Search, Bell, User } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

interface HeaderProps {
  currentView: string;
  onMenuClick: () => void;
}

const viewTitles = {
  landing: 'Welcome',
  login: 'Login',
  signup: 'Sign Up',
  dashboard: 'Dashboard',
  upload: 'Data Upload',
  history: 'Backup History',
  settings: 'Settings',
  trash: 'Trash Bin',
  scheduler: 'Scheduler',
};

export function Header({ currentView, onMenuClick }: HeaderProps) {
  return (
    <header className="glass border-b px-6 py-4 transition-colors duration-300" style={{ borderColor: 'var(--border-color)' }}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-xl transition-colors hover:bg-opacity-10"
            style={{ 
              color: 'var(--text-muted)',
              '--tw-bg-opacity': '0.1'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <Menu className="h-5 w-5" style={{ color: 'var(--text-muted)' }} />
          </button>
          
          <div>
            <h1 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
              {viewTitles[currentView as keyof typeof viewTitles]}
            </h1>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              {currentView === 'dashboard' && 'Monitor and manage your backups'}
              {currentView === 'upload' && 'Secure file upload and backup'}
              {currentView === 'history' && 'Browse your backup history'}
              {currentView === 'settings' && 'Configure your preferences'}
              {currentView === 'scheduler' && 'Automate your backup schedule'}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden md:flex relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" style={{ color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search files..."
              className="input-glass pl-10 pr-4 py-2 w-64 focus-ring"
            />
          </div>
          
          <ThemeToggle />
          
          <button 
            className="p-2 rounded-xl transition-colors relative"
            style={{ color: 'var(--text-muted)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full animate-pulse" style={{ backgroundColor: 'var(--neon-red)' }}></span>
          </button>

          <div className="w-8 h-8 gradient-primary rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>
    </header>
  );
}