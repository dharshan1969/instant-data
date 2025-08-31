import React, { useState } from 'react';
import {
  Wifi,
  Battery,
  Clock,
  Shield,
  Save,
  Plus,
  Monitor,
  Edit,
  Trash2,
  Bell,
  User,
  Lock,
  Globe
} from 'lucide-react';
import { useNotifications } from '../contexts/NotificationContext';

interface Device {
  id: string;
  name: string;
  type: 'desktop' | 'mobile' | 'tablet';
  lastSeen: string;
  status: 'online' | 'offline';
}

interface SettingsProps {
  onNavigate?: (view: string) => void;
  onShowUpgrade?: () => void;
}

export function Settings({ onNavigate, onShowUpgrade }: SettingsProps) {
  const [activeTab, setActiveTab] = useState('backup');
  const [autoSync, setAutoSync] = useState(true);
  const [syncFrequency, setSyncFrequency] = useState('hourly');
  const [wifiOnly, setWifiOnly] = useState(true);
  const [batteryLimit, setBatteryLimit] = useState(20);
  const [notifications, setNotifications] = useState({
    backupComplete: true,
    syncPaused: true,
    storageWarning: true,
    securityAlerts: true
  });
  const { addNotification } = useNotifications();

  const devices: Device[] = [
    {
      id: '1',
      name: 'MacBook Pro',
      type: 'desktop',
      lastSeen: '2 minutes ago',
      status: 'online'
    },
    {
      id: '2',
      name: 'iPhone 15',
      type: 'mobile',
      lastSeen: '1 hour ago',
      status: 'offline'
    },
    {
      id: '3',
      name: 'iPad Air',
      type: 'tablet',
      lastSeen: '1 day ago',
      status: 'offline'
    }
  ];

  const handleSaveSettings = () => {
    addNotification({
      type: 'success',
      message: 'Settings saved successfully!',
    });
  };

  const handleUnlinkDevice = (deviceId: string) => {
    addNotification({
      type: 'info',
      message: 'Device unlinked successfully',
    });
  };

  const getDeviceIcon = (type: string) => {
    return <Monitor className="h-5 w-5" />;
  };

  const tabs = [
    { id: 'backup', label: 'Backup Preferences', icon: Clock },
    { id: 'devices', label: 'Device Management', icon: Monitor },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield }
  ];

  const renderBackupTab = () => (
    <div className="space-y-8">
      <div className="card-glass p-6" style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)' }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(59, 130, 246, 0.2)' }}>
              <Clock className="h-6 w-6" style={{ color: 'var(--neon-blue)' }} />
            </div>
            <div>
              <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Automatic Backup</h3>
              <p style={{ color: 'var(--text-muted)' }}>Automatically backup your files</p>
            </div>
          </div>
          <button
            onClick={() => setAutoSync(!autoSync)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              autoSync ? '' : ''
            }`}
            style={{ backgroundColor: autoSync ? 'var(--neon-blue)' : 'var(--text-muted)' }}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                autoSync ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>

      {autoSync && (
        <div className="space-y-6">
          <div className="card-glass p-6">
            <label className="block text-sm font-medium mb-3" style={{ color: 'var(--text-secondary)' }}>
              Backup Frequency
            </label>
            <select
              value={syncFrequency}
              onChange={(e) => setSyncFrequency(e.target.value)}
              className="input-glass w-full max-w-xs focus-ring"
            >
              <option value="hourly">Every Hour</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
            </select>
          </div>

          <div className="card-glass p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(16, 185, 129, 0.2)' }}>
                  <Wifi className="h-5 w-5" style={{ color: 'var(--neon-emerald)' }} />
                </div>
                <div>
                  <h4 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Wi-Fi Only</h4>
                  <p style={{ color: 'var(--text-muted)' }}>Only backup when connected to Wi-Fi</p>
                </div>
              </div>
              <button
                onClick={() => setWifiOnly(!wifiOnly)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  wifiOnly ? '' : ''
                }`}
                style={{ backgroundColor: wifiOnly ? 'var(--neon-emerald)' : 'var(--text-muted)' }}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    wifiOnly ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="card-glass p-6">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(245, 158, 11, 0.2)' }}>
                <Battery className="h-5 w-5" style={{ color: 'var(--neon-orange)' }} />
              </div>
              <div>
                <label className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                  Pause backup when battery is below {batteryLimit}%
                </label>
                <p style={{ color: 'var(--text-muted)' }}>Preserve battery life on mobile devices</p>
              </div>
            </div>
            <input
              type="range"
              min="10"
              max="50"
              value={batteryLimit}
              onChange={(e) => setBatteryLimit(Number(e.target.value))}
              className="w-full max-w-xs"
              style={{ accentColor: 'var(--neon-orange)' }}
            />
          </div>
        </div>
      )}
    </div>
  );

  const renderDevicesTab = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Connected Devices</h3>
        <button className="btn-primary">
          <Plus className="h-4 w-4 mr-2" />
          Add Device
        </button>
      </div>

      <div className="space-y-4">
        {devices.map((device) => (
          <div key={device.id} className="card-glass p-6 hover-lift">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-xl" style={{ 
                  backgroundColor: device.status === 'online' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(107, 114, 128, 0.2)' 
                }}>
                  {getDeviceIcon(device.type)}
                </div>
                
                <div>
                  <h4 className="font-semibold" style={{ color: 'var(--text-primary)' }}>{device.name}</h4>
                  <div className="flex items-center space-x-2 text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
                    <span className="w-2 h-2 rounded-full" style={{ 
                      backgroundColor: device.status === 'online' ? 'var(--neon-emerald)' : 'var(--text-muted)' 
                    }}></span>
                    <span>Last seen: {device.lastSeen}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button 
                  className="p-2 rounded-lg transition-colors"
                  style={{ color: 'var(--text-muted)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--neon-blue)';
                    e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--text-muted)';
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => handleUnlinkDevice(device.id)}
                  className="p-2 rounded-lg transition-colors"
                  style={{ color: 'var(--text-muted)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--neon-red)';
                    e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--text-muted)';
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-8">
      <h3 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Notification Preferences</h3>
      
      <div className="space-y-4">
        {Object.entries(notifications).map(([key, value]) => (
          <div key={key} className="card-glass p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(139, 92, 246, 0.2)' }}>
                  <Bell className="h-5 w-5" style={{ color: 'var(--neon-purple)' }} />
                </div>
                <div>
                  <h4 className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {key === 'backupComplete' && 'Backup Complete'}
                    {key === 'syncPaused' && 'Sync Paused'}
                    {key === 'storageWarning' && 'Storage Warning'}
                    {key === 'securityAlerts' && 'Security Alerts'}
                  </h4>
                  <p style={{ color: 'var(--text-muted)' }}>
                    {key === 'backupComplete' && 'Get notified when backups are completed'}
                    {key === 'syncPaused' && 'Alerts when sync is paused or interrupted'}
                    {key === 'storageWarning' && 'Warnings when storage is running low'}
                    {key === 'securityAlerts' && 'Important security notifications'}
                  </p>
                </div>
              </div>
              
              <button
                onClick={() => setNotifications({ ...notifications, [key]: !value })}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  value ? '' : ''
                }`}
                style={{ backgroundColor: value ? 'var(--neon-blue)' : 'var(--text-muted)' }}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    value ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSecurityTab = () => (
    <div className="space-y-8">
      <div className="card-glass p-6 border" style={{ borderColor: 'rgba(16, 185, 129, 0.3)' }}>
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(16, 185, 129, 0.2)' }}>
            <Shield className="h-6 w-6" style={{ color: 'var(--neon-emerald)' }} />
          </div>
          <div>
            <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Security Status</h3>
            <p style={{ color: 'var(--neon-emerald)' }}>
              Your data is encrypted end-to-end and stored securely across decentralized nodes.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="card-glass p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(59, 130, 246, 0.2)' }}>
                <Lock className="h-5 w-5" style={{ color: 'var(--neon-blue)' }} />
              </div>
              <div>
                <h4 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Data Encryption</h4>
                <p style={{ color: 'var(--text-muted)' }}>All files are encrypted before upload</p>
              </div>
            </div>
            <span className="px-3 py-1 text-sm font-semibold rounded-full" style={{ 
              backgroundColor: 'rgba(16, 185, 129, 0.2)', 
              color: 'var(--neon-emerald)' 
            }}>
              Enabled
            </span>
          </div>
        </div>

        <div className="card-glass p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(139, 92, 246, 0.2)' }}>
                <Globe className="h-5 w-5" style={{ color: 'var(--neon-purple)' }} />
              </div>
              <div>
                <h4 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Secure Connections</h4>
                <p style={{ color: 'var(--text-muted)' }}>All data transfers use HTTPS encryption</p>
              </div>
            </div>
            <span className="px-3 py-1 text-sm font-semibold rounded-full" style={{ 
              backgroundColor: 'rgba(16, 185, 129, 0.2)', 
              color: 'var(--neon-emerald)' 
            }}>
              Active
            </span>
          </div>
        </div>

        <div className="card-glass p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(245, 158, 11, 0.2)' }}>
                <User className="h-5 w-5" style={{ color: 'var(--neon-orange)' }} />
              </div>
              <div>
                <h4 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Data Export</h4>
                <p style={{ color: 'var(--text-muted)' }}>Download a copy of your data</p>
              </div>
            </div>
            <button className="btn-secondary">
              Request Export
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Tab Navigation */}
      <div className="card-glass">
        <div className="border-b" style={{ borderColor: 'var(--border-color)' }}>
          <nav className="flex space-x-8 px-8" aria-label="Tabs">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-6 px-1 border-b-2 font-semibold text-sm transition-all ${
                    activeTab === tab.id
                      ? ''
                      : 'border-transparent'
                  }`}
                  style={activeTab === tab.id ? {
                    borderColor: 'var(--neon-blue)',
                    color: 'var(--neon-blue)'
                  } : {
                    color: 'var(--text-muted)'
                  }}
                  onMouseEnter={(e) => {
                    if (activeTab !== tab.id) {
                      e.currentTarget.style.color = 'var(--text-primary)';
                      e.currentTarget.style.borderColor = 'var(--border-color)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeTab !== tab.id) {
                      e.currentTarget.style.color = 'var(--text-muted)';
                      e.currentTarget.style.borderColor = 'transparent';
                    }
                  }}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-8">
          {activeTab === 'backup' && renderBackupTab()}
          {activeTab === 'devices' && renderDevicesTab()}
          {activeTab === 'notifications' && renderNotificationsTab()}
          {activeTab === 'security' && renderSecurityTab()}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSaveSettings}
          className="gradient-primary text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
        >
          <Save className="h-5 w-5 mr-2" />
          Save Changes
        </button>
      </div>
    </div>
  );
}