import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  Plus, 
  Edit, 
  Trash2, 
  Play, 
  Pause, 
  Calendar,
  Settings,
  CheckCircle,
  AlertCircle,
  Zap
} from 'lucide-react';
import { BackupScheduler, ScheduleConfig } from '../../services/scheduler';
import { useNotifications } from '../../contexts/NotificationContext';

export function BackupSchedulerComponent() {
  const [schedules, setSchedules] = useState<ScheduleConfig[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<ScheduleConfig | null>(null);
  const [scheduler] = useState(() => new BackupScheduler((schedule) => {
    addNotification({
      type: 'info',
      message: `Scheduled backup "${schedule.name}" started`
    });
  }));
  const { addNotification } = useNotifications();

  useEffect(() => {
    setSchedules(scheduler.getSchedules());
  }, [scheduler]);

  const handleCreateSchedule = (config: Omit<ScheduleConfig, 'id'>) => {
    const newSchedule: ScheduleConfig = {
      ...config,
      id: Date.now().toString()
    };
    
    scheduler.addSchedule(newSchedule);
    setSchedules(scheduler.getSchedules());
    setShowCreateModal(false);
    
    addNotification({
      type: 'success',
      message: 'Backup schedule created successfully'
    });
  };

  const handleUpdateSchedule = (config: ScheduleConfig) => {
    scheduler.updateSchedule(config);
    setSchedules(scheduler.getSchedules());
    setEditingSchedule(null);
    
    addNotification({
      type: 'success',
      message: 'Backup schedule updated successfully'
    });
  };

  const handleDeleteSchedule = (id: string) => {
    if (window.confirm('Are you sure you want to delete this schedule?')) {
      scheduler.removeSchedule(id);
      setSchedules(scheduler.getSchedules());
      
      addNotification({
        type: 'info',
        message: 'Backup schedule deleted'
      });
    }
  };

  const handleToggleSchedule = (schedule: ScheduleConfig) => {
    const updatedSchedule = { ...schedule, enabled: !schedule.enabled };
    scheduler.updateSchedule(updatedSchedule);
    setSchedules(scheduler.getSchedules());
    
    addNotification({
      type: 'info',
      message: `Schedule ${updatedSchedule.enabled ? 'enabled' : 'disabled'}`
    });
  };

  const getFrequencyText = (schedule: ScheduleConfig) => {
    switch (schedule.frequency) {
      case 'hourly':
        return 'Every hour';
      case 'daily':
        return schedule.time ? `Daily at ${schedule.time}` : 'Daily';
      case 'weekly':
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dayName = schedule.dayOfWeek !== undefined ? days[schedule.dayOfWeek] : 'Weekly';
        return schedule.time ? `${dayName} at ${schedule.time}` : dayName;
      case 'monthly':
        const monthText = schedule.dayOfMonth ? `${schedule.dayOfMonth}th of each month` : 'Monthly';
        return schedule.time ? `${monthText} at ${schedule.time}` : monthText;
      default:
        return schedule.frequency;
    }
  };

  return (
    <div className="space-y-8 animate-fade-in-up" style={{ background: 'var(--bg-primary)' }}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>Backup Scheduler</h2>
          <p style={{ color: 'var(--text-muted)' }}>Automate your backups with custom schedules</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="btn-primary"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Schedule
        </button>
      </div>

      {schedules.length === 0 ? (
        <div className="card-glass p-16 text-center">
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: 'rgba(59, 130, 246, 0.2)' }}>
            <Clock className="h-10 w-10" style={{ color: 'var(--neon-blue)' }} />
          </div>
          <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>No Schedules Yet</h3>
          <p className="mb-8 max-w-md mx-auto" style={{ color: 'var(--text-muted)' }}>
            Create your first backup schedule to automate your data protection and never worry about losing files again.
          </p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="btn-primary"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Schedule
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {schedules.map((schedule) => (
            <div key={schedule.id} className="card-glass card-hover p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="p-3 rounded-xl" style={{ 
                    backgroundColor: schedule.enabled ? 'rgba(16, 185, 129, 0.2)' : 'rgba(107, 114, 128, 0.2)' 
                  }}>
                    {schedule.enabled ? (
                      <CheckCircle className="h-6 w-6" style={{ color: 'var(--neon-emerald)' }} />
                    ) : (
                      <AlertCircle className="h-6 w-6" style={{ color: 'var(--text-muted)' }} />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>{schedule.name}</h3>
                    <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full mt-2 ${
                      schedule.backupType === 'full' 
                        ? 'border' 
                        : 'border'
                    }`}>
                      {schedule.backupType}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => handleToggleSchedule(schedule)}
                    className={`p-2 rounded-xl transition-colors ${
                      schedule.enabled 
                        ? '' 
                        : ''
                    }`}
                    style={{ color: schedule.enabled ? 'var(--neon-emerald)' : 'var(--text-muted)' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = schedule.enabled ? 'rgba(16, 185, 129, 0.1)' : 'rgba(107, 114, 128, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                    style={{
                      backgroundColor: schedule.backupType === 'full' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(16, 185, 129, 0.2)',
                      color: schedule.backupType === 'full' ? 'var(--neon-blue)' : 'var(--neon-emerald)',
                      borderColor: schedule.backupType === 'full' ? 'rgba(59, 130, 246, 0.3)' : 'rgba(16, 185, 129, 0.3)'
                    }}
                  >
                    {schedule.enabled ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </button>
                  <button
                    onClick={() => setEditingSchedule(schedule)}
                    className="p-2 rounded-xl transition-colors"
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
                    onClick={() => handleDeleteSchedule(schedule.id)}
                    className="p-2 rounded-xl transition-colors"
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

              <div className="space-y-4">
                <div className="flex items-center space-x-3" style={{ color: 'var(--text-secondary)' }}>
                  <Calendar className="h-4 w-4" style={{ color: 'var(--neon-blue)' }} />
                  <span className="text-sm">{getFrequencyText(schedule)}</span>
                </div>
                
                <div className="rounded-xl p-4" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                  <div className="text-sm space-y-1" style={{ color: 'var(--text-muted)' }}>
                    <p><span className="font-medium" style={{ color: 'var(--text-primary)' }}>Includes:</span> {schedule.includePaths.length} paths</p>
                    {schedule.excludePaths.length > 0 && (
                      <p><span className="font-medium" style={{ color: 'var(--text-primary)' }}>Excludes:</span> {schedule.excludePaths.length} paths</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t" style={{ borderColor: 'var(--border-color)' }}>
                <div className="flex items-center justify-between">
                  <span className={`font-semibold flex items-center space-x-2 ${
                    schedule.enabled ? '' : ''
                  }`}>
                    <div className={`w-2 h-2 rounded-full ${
                      schedule.enabled ? 'animate-pulse' : ''
                    }`}></div>
                    style={{ backgroundColor: schedule.enabled ? 'var(--neon-emerald)' : 'var(--text-muted)' }}
                    <span>{schedule.enabled ? 'Active' : 'Inactive'}</span>
                  </span>
                  <button
                    onClick={() => setEditingSchedule(schedule)}
                    className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                    className="font-medium transition-colors"
                    style={{ color: 'var(--neon-blue)' }}
                  >
                    Configure
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create/Edit Modal */}
      {(showCreateModal || editingSchedule) && (
        <ScheduleModal
          schedule={editingSchedule}
          onSave={editingSchedule ? handleUpdateSchedule : handleCreateSchedule}
          onCancel={() => {
            setShowCreateModal(false);
            setEditingSchedule(null);
          }}
        />
      )}
    </div>
  );
}

interface ScheduleModalProps {
  schedule?: ScheduleConfig | null;
  onSave: (schedule: ScheduleConfig | Omit<ScheduleConfig, 'id'>) => void;
  onCancel: () => void;
}

function ScheduleModal({ schedule, onSave, onCancel }: ScheduleModalProps) {
  const [formData, setFormData] = useState<Omit<ScheduleConfig, 'id'>>({
    name: schedule?.name || '',
    enabled: schedule?.enabled ?? true,
    frequency: schedule?.frequency || 'daily',
    time: schedule?.time || '02:00',
    dayOfWeek: schedule?.dayOfWeek,
    dayOfMonth: schedule?.dayOfMonth,
    backupType: schedule?.backupType || 'incremental',
    includePaths: schedule?.includePaths || ['/Documents', '/Pictures'],
    excludePaths: schedule?.excludePaths || []
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (schedule) {
      onSave({ ...formData, id: schedule.id });
    } else {
      onSave(formData);
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
      <div className="modal-glass max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-fade-in-up rounded-2xl">
        <div className="p-8 border-b" style={{ borderColor: 'var(--border-color)' }}>
          <h3 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
            {schedule ? 'Edit Schedule' : 'Create New Schedule'}
          </h3>
          <p className="mt-1" style={{ color: 'var(--text-muted)' }}>Configure your automated backup schedule</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
              Schedule Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="input-glass w-full focus-ring"
              placeholder="e.g., Daily Documents Backup"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                Frequency
              </label>
              <select
                value={formData.frequency}
                onChange={(e) => setFormData({ ...formData, frequency: e.target.value as any })}
                className="input-glass w-full focus-ring"
              >
                <option value="hourly">Hourly</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                Backup Type
              </label>
              <select
                value={formData.backupType}
                onChange={(e) => setFormData({ ...formData, backupType: e.target.value as any })}
                className="input-glass w-full focus-ring"
              >
                <option value="incremental">Incremental</option>
                <option value="full">Full Backup</option>
              </select>
            </div>
          </div>

          {formData.frequency !== 'hourly' && (
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                Time
              </label>
              <input
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="input-glass w-full max-w-xs focus-ring"
              />
            </div>
          )}

          {formData.frequency === 'weekly' && (
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                Day of Week
              </label>
              <select
                value={formData.dayOfWeek || ''}
                onChange={(e) => setFormData({ ...formData, dayOfWeek: e.target.value ? Number(e.target.value) : undefined })}
                className="input-glass w-full max-w-xs focus-ring"
              >
                <option value="">Select day</option>
                <option value="0">Sunday</option>
                <option value="1">Monday</option>
                <option value="2">Tuesday</option>
                <option value="3">Wednesday</option>
                <option value="4">Thursday</option>
                <option value="5">Friday</option>
                <option value="6">Saturday</option>
              </select>
            </div>
          )}

          {formData.frequency === 'monthly' && (
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                Day of Month
              </label>
              <input
                type="number"
                min="1"
                max="31"
                value={formData.dayOfMonth || ''}
                onChange={(e) => setFormData({ ...formData, dayOfMonth: e.target.value ? Number(e.target.value) : undefined })}
                className="input-glass w-full max-w-xs focus-ring"
              />
            </div>
          )}

          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="enabled"
              checked={formData.enabled}
              onChange={(e) => setFormData({ ...formData, enabled: e.target.checked })}
              className="rounded focus-ring"
              style={{ 
                borderColor: 'var(--border-color)',
                accentColor: 'var(--neon-blue)',
                backgroundColor: 'var(--bg-secondary)'
              }}
            />
            <label htmlFor="enabled" style={{ color: 'var(--text-secondary)' }}>
              Enable this schedule immediately
            </label>
          </div>

          <div className="flex space-x-4 pt-6">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 btn-primary"
            >
              {schedule ? 'Update' : 'Create'} Schedule
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}