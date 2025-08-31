import React from 'react';
import { 
  Cloud, 
  Activity, 
  CheckCircle, 
  AlertTriangle, 
  ArrowUp, 
  Download,
  TrendingUp,
  Clock,
  Shield,
  Zap,
  HardDrive,
  Calendar
} from 'lucide-react';
import { useNotifications } from '../contexts/NotificationContext';
import { useStorage } from '../hooks/useStorage';
import { useBackup } from '../hooks/useBackup';

interface DashboardProps {
  onNavigate?: (view: string) => void;
  onShowUpgrade?: () => void;
}

export function Dashboard({ onNavigate, onShowUpgrade }: DashboardProps) {
  const { addNotification } = useNotifications();
  const { stats, formatBytes } = useStorage();
  const { createBackupSession, startBackup, sessions } = useBackup();

  const handleBackupNow = () => {
    const session = createBackupSession(
      `Manual Backup ${new Date().toLocaleString()}`,
      'full'
    );
    startBackup(session.id);
  };

  const handleRestore = () => {
    addNotification({
      type: 'info',
      message: 'Restore initiated...',
    });
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="card-glass p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Welcome back, Admin</h1>
            <p style={{ color: 'var(--text-muted)' }}>Here's what's happening with your backups today.</p>
          </div>
          <div className="hidden md:block">
            <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center shadow-lg">
              <Shield className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card-glass card-hover p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(59, 130, 246, 0.2)' }}>
              <Cloud className="h-6 w-6" style={{ color: 'var(--neon-blue)' }} />
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{formatBytes(stats.used)}</p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>of {formatBytes(stats.total)}</p>
            </div>
          </div>
          <p className="text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>Storage Used</p>
          <div className="progress-bar h-2">
            <div 
              className="progress-fill h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(stats.percentage, 100)}%` }}
            ></div>
          </div>
        </div>

        <div className="card-glass card-hover p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(16, 185, 129, 0.2)' }}>
              <CheckCircle className="h-6 w-6" style={{ color: 'var(--neon-emerald)' }} />
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                {sessions.length > 0 && sessions[0].endTime 
                  ? new Date(sessions[0].endTime).toLocaleDateString()
                  : 'Never'
                }
              </p>
              <p className="text-xs" style={{ color: 'var(--neon-emerald)' }}>
                {sessions.length > 0 && sessions[0].status === 'completed' 
                  ? 'Successful' 
                  : 'No backups'
                }
              </p>
            </div>
          </div>
          <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Last Backup</p>
        </div>

        <div className="card-glass card-hover p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(139, 92, 246, 0.2)' }}>
              <Activity className="h-6 w-6" style={{ color: 'var(--neon-purple)' }} />
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                {sessions.reduce((total, session) => total + session.completedFiles, 0)}
              </p>
              <p className="text-xs" style={{ color: 'var(--neon-purple)' }}>Total files</p>
            </div>
          </div>
          <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Files Backed Up</p>
        </div>

        <div className="card-glass card-hover p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(245, 158, 11, 0.2)' }}>
              <AlertTriangle className="h-6 w-6" style={{ color: 'var(--neon-orange)' }} />
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                {sessions.some(s => s.status === 'running') ? 'Active' : 'Idle'}
              </p>
              <p className="text-xs" style={{ color: 'var(--neon-orange)' }}>
                {sessions.some(s => s.status === 'running') ? 'In progress' : 'Ready'}
              </p>
            </div>
          </div>
          <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Sync Status</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card-glass p-8">
        <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <button
            onClick={handleBackupNow}
            className="group p-6 rounded-2xl border hover:shadow-lg transition-all duration-300"
            style={{ 
              background: 'rgba(59, 130, 246, 0.1)', 
              borderColor: 'rgba(59, 130, 246, 0.3)' 
            }}
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform" style={{ backgroundColor: 'rgba(59, 130, 246, 0.2)' }}>
              <ArrowUp className="h-6 w-6" style={{ color: 'var(--neon-blue)' }} />
            </div>
            <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Start Backup</h3>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Create a new backup of your files</p>
          </button>
          
          <button
            onClick={() => onNavigate?.('history')}
            className="group p-6 rounded-2xl border hover:shadow-lg transition-all duration-300"
            style={{ 
              background: 'rgba(16, 185, 129, 0.1)', 
              borderColor: 'rgba(16, 185, 129, 0.3)' 
            }}
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform" style={{ backgroundColor: 'rgba(16, 185, 129, 0.2)' }}>
              <Download className="h-6 w-6" style={{ color: 'var(--neon-emerald)' }} />
            </div>
            <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>View History</h3>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Browse your backup history</p>
          </button>
          
          <button
            onClick={onShowUpgrade}
            className="group p-6 rounded-2xl border hover:shadow-lg transition-all duration-300"
            style={{ 
              background: 'rgba(139, 92, 246, 0.1)', 
              borderColor: 'rgba(139, 92, 246, 0.3)' 
            }}
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform" style={{ backgroundColor: 'rgba(139, 92, 246, 0.2)' }}>
              <TrendingUp className="h-6 w-6" style={{ color: 'var(--neon-purple)' }} />
            </div>
            <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Upgrade Plan</h3>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Unlock premium features</p>
          </button>
        </div>
      </div>

      {/* Recent Activity & Storage Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card-glass p-6">
          <h3 className="text-xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>Recent Activity</h3>
          <div className="space-y-4">
            {[
              ...sessions.slice(0, 5).map(session => ({
                action: `${session.name} ${session.status === 'completed' ? 'completed' : session.status}`,
                time: session.endTime ? new Date(session.endTime).toLocaleString() : 'In progress',
                status: session.status === 'completed' ? 'success' : 
                        session.status === 'failed' ? 'warning' : 'info'
              }))
            ].slice(0, 5).map((item, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 rounded-xl transition-colors" style={{ 
                backgroundColor: 'var(--bg-secondary)',
              }}>
                <div className={`w-3 h-3 rounded-full ${
                  item.status === 'success' ? 'status-online' :
                  item.status === 'warning' ? 'status-warning' :
                  'status-online'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{item.action}</p>
                  <p className="text-xs flex items-center mt-1" style={{ color: 'var(--text-muted)' }}>
                    <Clock className="h-3 w-3 mr-1" style={{ color: 'var(--text-muted)' }} />
                    {item.time}
                  </p>
                </div>
              </div>
            ))}
            
            {sessions.length === 0 && (
              <div className="text-center py-8">
                <Activity className="h-12 w-12 mx-auto mb-4" style={{ color: 'var(--text-muted)' }} />
                <p style={{ color: 'var(--text-muted)' }}>No recent activity</p>
              </div>
            )}
          </div>
        </div>

        <div className="card-glass p-6">
          <h3 className="text-xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>Storage Breakdown</h3>
          <div className="space-y-4">
            {[
              { 
                type: 'Documents', 
                size: formatBytes(stats.breakdown.documents), 
                percentage: stats.used > 0 ? (stats.breakdown.documents / stats.used) * 100 : 0, 
                color: 'var(--neon-blue)',
                icon: HardDrive
              },
              { 
                type: 'Images', 
                size: formatBytes(stats.breakdown.images), 
                percentage: stats.used > 0 ? (stats.breakdown.images / stats.used) * 100 : 0, 
                color: 'var(--neon-emerald)',
                icon: Calendar
              },
              { 
                type: 'Videos', 
                size: formatBytes(stats.breakdown.videos), 
                percentage: stats.used > 0 ? (stats.breakdown.videos / stats.used) * 100 : 0, 
                color: 'var(--neon-orange)',
                icon: Zap
              },
              { 
                type: 'Audio', 
                size: formatBytes(stats.breakdown.audio), 
                percentage: stats.used > 0 ? (stats.breakdown.audio / stats.used) * 100 : 0, 
                color: 'var(--neon-purple)',
                icon: Activity
              },
              { 
                type: 'Other', 
                size: formatBytes(stats.breakdown.other), 
                percentage: stats.used > 0 ? (stats.breakdown.other / stats.used) * 100 : 0, 
                color: 'var(--text-muted)',
                icon: Shield
              },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                        <Icon className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
                      </div>
                      <span className="font-medium" style={{ color: 'var(--text-primary)' }}>{item.type}</span>
                    </div>
                    <span className="text-sm" style={{ color: 'var(--text-muted)' }}>{item.size}</span>
                  </div>
                  <div className="progress-bar h-2">
                    <div 
                      className="h-2 rounded-full transition-all duration-500"
                      style={{ 
                        background: item.color,
                        width: `${Math.max(item.percentage, 0)}%` 
                      }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="card-glass p-6">
        <h3 className="text-xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>System Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: 'var(--neon-emerald)' }}></div>
            <div>
              <p className="font-medium" style={{ color: 'var(--text-primary)' }}>Backup Service</p>
              <p className="text-sm" style={{ color: 'var(--neon-emerald)' }}>Operational</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: 'var(--neon-emerald)' }}></div>
            <div>
              <p className="font-medium" style={{ color: 'var(--text-primary)' }}>Cloud Storage</p>
              <p className="text-sm" style={{ color: 'var(--neon-emerald)' }}>Connected</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: 'var(--neon-emerald)' }}></div>
            <div>
              <p className="font-medium" style={{ color: 'var(--text-primary)' }}>Encryption</p>
              <p className="text-sm" style={{ color: 'var(--neon-emerald)' }}>Active</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}