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
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 transition-colors duration-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <Menu className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </button>
          
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              {viewTitles[currentView as keyof typeof viewTitles]}
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
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
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <input
              type="text"
              placeholder="Search files..."
              className="pl-10 pr-4 py-2 w-64 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          
          <ThemeToggle />
          
          <button className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors relative">
            <Bell className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full animate-pulse"></span>
          </button>

          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>
    </header>
  );
}