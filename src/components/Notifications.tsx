import React, { useEffect } from 'react';
import { X, CheckCircle, AlertTriangle, AlertCircle, Info } from 'lucide-react';
import { useNotifications } from '../contexts/NotificationContext';

export function Notifications() {
  const { notifications, removeNotification } = useNotifications();

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-emerald-600" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-amber-600" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      case 'info':
        return <Info className="h-5 w-5 text-blue-600" />;
      default:
        return <Info className="h-5 w-5 text-blue-600" />;
    }
  };

  const getBackgroundColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'notification-success border';
      case 'warning':
        return 'notification-warning border';
      case 'error':
        return 'notification-error border';
      case 'info':
        return 'notification-info border';
      default:
        return 'notification-info border';
    }
  };

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`max-w-sm w-full p-4 rounded-xl shadow-lg ${getBackgroundColor(notification.type)} animate-slide-in-right backdrop-blur-sm`}
        >
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              {getIcon(notification.type)}
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">
                {notification.message}
              </p>
              <p className="text-xs opacity-75 mt-1">
                {notification.timestamp.toLocaleTimeString()}
              </p>
            </div>
            
            <button
              onClick={() => removeNotification(notification.id)}
              className="flex-shrink-0 p-1 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
            >
              <X className="h-4 w-4 opacity-60 hover:opacity-100" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}