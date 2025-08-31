import React from 'react';
import { 
  LayoutDashboard, 
  Upload, 
  History, 
  Settings, 
  Trash2, 
  Shield,
  Clock,
  X,
  ChevronRight,
  LogOut,
  Crown
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface SidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
  onShowUpgrade: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ currentView, onViewChange, onShowUpgrade, isOpen, onClose }: SidebarProps) {
  const { logout } = useAuth();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'upload', label: 'Upload', icon: Upload },
    { id: 'history', label: 'Backup History', icon: History },
    { id: 'scheduler', label: 'Scheduler', icon: Clock },
    { id: 'trash', label: 'Trash Bin', icon: Trash2 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleItemClick = (viewId: string) => {
    onViewChange(viewId);
    onClose();
  };

  const handleLogout = () => {
    logout();
    onViewChange('landing');
    onClose();
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-60 z-40 lg:hidden backdrop-blur-sm"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700
        transform transition-all duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-gray-900 dark:text-white">SecureBackup</span>
                <p className="text-xs text-gray-600 dark:text-gray-400">Professional</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-6 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`
                    w-full flex items-center space-x-4 px-4 py-3 rounded-xl text-left
                    transition-all duration-200 group
                    ${isActive 
                      ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/30 shadow-lg' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                    }
                  `}
                >
                  <Icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${
                    isActive ? 'text-blue-500 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'
                  }`} />
                  <span className="font-medium">{item.label}</span>
                  {isActive && <ChevronRight className="w-4 h-4 ml-auto text-blue-500 dark:text-blue-400" />}
                </button>
              );
            })}
          </nav>

          {/* Upgrade Section */}
          <div className="p-6 border-t border-gray-200 dark:border-gray-700">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-4 mb-4 border border-blue-200 dark:border-blue-800">
              <div className="flex items-center space-x-3 mb-3">
                <Crown className="w-5 h-5 text-amber-500" />
                <span className="text-sm font-semibold text-gray-900 dark:text-white">Free Plan</span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                Upgrade for unlimited storage and advanced features
              </p>
              <button
                onClick={onShowUpgrade}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-lg text-sm font-semibold hover:from-blue-600 hover:to-purple-700 transition-all"
              >
                Upgrade Now
              </button>
            </div>
            
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 rounded-xl transition-all duration-200"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}