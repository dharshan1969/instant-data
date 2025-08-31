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
        fixed lg:static inset-y-0 left-0 z-50 w-72 glass border-r
        transform transition-all duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `} style={{ borderColor: 'var(--border-color)' }}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: 'var(--border-color)' }}>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center shadow-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>SecureBackup</span>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Professional</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden p-2 rounded-xl transition-colors"
              style={{ color: 'var(--text-muted)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <X className="w-5 h-5" />
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
                  `}
                  style={isActive ? {
                    background: 'rgba(59, 130, 246, 0.1)',
                    color: 'var(--neon-blue)',
                    border: '1px solid rgba(59, 130, 246, 0.3)',
                    boxShadow: '0 4px 14px rgba(59, 130, 246, 0.2)'
                  } : {
                    color: 'var(--text-secondary)',
                    border: '1px solid transparent'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
                      e.currentTarget.style.color = 'var(--text-primary)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = 'var(--text-secondary)';
                    }
                  }}
                >
                  <Icon className="w-5 h-5 transition-transform group-hover:scale-110" style={{
                    color: isActive ? 'var(--neon-blue)' : 'var(--text-muted)'
                  }} />
                  <span className="font-medium">{item.label}</span>
                  {isActive && <ChevronRight className="w-4 h-4 ml-auto" style={{ color: 'var(--neon-blue)' }} />}
                </button>
              );
            })}
          </nav>

          {/* Upgrade Section */}
          <div className="p-6 border-t" style={{ borderColor: 'var(--border-color)' }}>
            <div className="rounded-xl p-4 mb-4 border" style={{ 
              background: 'rgba(59, 130, 246, 0.1)', 
              borderColor: 'rgba(59, 130, 246, 0.3)' 
            }}>
              <div className="flex items-center space-x-3 mb-3">
                <Crown className="w-5 h-5" style={{ color: 'var(--neon-orange)' }} />
                <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Free Plan</span>
              </div>
              <p className="text-xs mb-3" style={{ color: 'var(--text-muted)' }}>
                Upgrade for unlimited storage and advanced features
              </p>
              <button
                onClick={onShowUpgrade}
                className="w-full gradient-primary text-white py-2 px-4 rounded-lg text-sm font-semibold hover:shadow-lg transition-all"
              >
                Upgrade Now
              </button>
            </div>
            
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200"
              style={{ color: 'var(--text-secondary)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
                e.currentTarget.style.color = 'var(--neon-red)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = 'var(--text-secondary)';
              }}
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