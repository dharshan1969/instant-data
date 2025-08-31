import React, { useEffect } from 'react';
import { X, CheckCircle, AlertTriangle, AlertCircle, Info } from 'lucide-react';
import { useNotifications } from '../contexts/NotificationContext';

export function Notifications() {
  const { notifications, removeNotification } = useNotifications();

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5" style={{ color: 'var(--neon-emerald)' }} />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5" style={{ color: 'var(--neon-orange)' }} />;
      case 'error':
        return <AlertCircle className="h-5 w-5" style={{ color: 'var(--neon-red)' }} />;
      case 'info':
        return <Info className="h-5 w-5" style={{ color: 'var(--neon-blue)' }} />;
      default:
        return <Info className="h-5 w-5" style={{ color: 'var(--neon-blue)' }} />;
    }
  };

  const getNotificationStyle = (type: string) => {
    switch (type) {
      case 'success':
        return {
          background: 'rgba(16, 185, 129, 0.1)',
          borderColor: 'rgba(16, 185, 129, 0.3)',
          color: 'var(--text-primary)'
        };
      case 'warning':
        return {
          background: 'rgba(245, 158, 11, 0.1)',
          borderColor: 'rgba(245, 158, 11, 0.3)',
          color: 'var(--text-primary)'
        };
      case 'error':
        return {
          background: 'rgba(239, 68, 68, 0.1)',
          borderColor: 'rgba(239, 68, 68, 0.3)',
          color: 'var(--text-primary)'
        };
      case 'info':
        return {
          background: 'rgba(59, 130, 246, 0.1)',
          borderColor: 'rgba(59, 130, 246, 0.3)',
          color: 'var(--text-primary)'
        };
      default:
        return {
          background: 'rgba(59, 130, 246, 0.1)',
          borderColor: 'rgba(59, 130, 246, 0.3)',
          color: 'var(--text-primary)'
        };
    }
  };

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className="max-w-sm w-full p-4 rounded-xl shadow-lg border animate-slide-in-right backdrop-blur-sm"
          style={{
            ...getNotificationStyle(notification.type),
            backdropFilter: 'blur(10px)'
          }}
        >
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              {getIcon(notification.type)}
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                {notification.message}
              </p>
              <p className="text-xs mt-1" style={{ color: 'var(--text-muted)', opacity: 0.8 }}>
                {notification.timestamp.toLocaleTimeString()}
              </p>
            </div>
            
            <button
              onClick={() => removeNotification(notification.id)}
              className="flex-shrink-0 p-1 rounded-full transition-colors"
              style={{ color: 'var(--text-muted)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
                e.currentTarget.style.color = 'var(--text-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = 'var(--text-muted)';
              }}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}