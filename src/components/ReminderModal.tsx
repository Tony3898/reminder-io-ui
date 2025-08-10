import {
  Close as CloseIcon,
  Description as DescriptionIcon,
  Event as EventIcon,
  Person as PersonIcon,
  Save as SaveIcon,
  Title as TitleIcon
} from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useAuthService } from '../contexts/ServicesContext';
import { Reminder, ReminderStatus } from '../types';

interface ReminderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (reminderData: Partial<Reminder>) => Promise<void>;
  reminder?: Reminder | null;
  isLoading?: boolean;
}

export const ReminderModal: React.FC<ReminderModalProps> = ({
  isOpen,
  onClose,
  onSave,
  reminder,
  isLoading = false
}) => {
  const authService = useAuthService();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    reminderDate: Date.now(),
    status: ReminderStatus.SCHEDULED,
    userId: authService.getCurrentUser()?.id.toString()
  });
  
  const [errors, setErrors] = useState<Record<string, string | number>>({});

  useEffect(() => {
    if (reminder) {
      setFormData({
        title: reminder.title,
        description: reminder.description,
        reminderDate: new Date(reminder.reminderDate).getTime(),
        status: reminder.status as ReminderStatus,
        userId: reminder.userId.toString()
      });
    } else {
      setFormData({
        title: '',
        description: '',
        reminderDate: Date.now(),
        status: ReminderStatus.SCHEDULED,
        userId: authService.getCurrentUser()?.id.toString()
      });
    }
    setErrors({});
  }, [reminder, isOpen]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.reminderDate) {
      newErrors.reminderDate = 'Reminder date is required';
    } else {
      const selectedDate = new Date(formData.reminderDate);
      const now = new Date();
      if (selectedDate <= now) {
        newErrors.reminderDate = 'Reminder date must be in the future';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      const reminderData: Partial<Reminder> = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        reminderDate: new Date(formData.reminderDate).getTime()
      };

      if (reminder) {
        reminderData.id = reminder.id;
      }

      await onSave(reminderData);
      onClose();
      toast.success( `Reminder ${reminder ? 'updated' : 'created'} successfully!`);
    } catch (error) {
      console.log(error);
      toast.error(error instanceof Error ? error.message : `Failed to ${reminder ? 'update' : 'create'} reminder`);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />
      
      <div className="fixed inset-0 flex items-center justify-center p-4 sm:p-6">
        <div className="relative bg-background-paper rounded-2xl shadow-2xl border border-gray-700/50 w-full max-w-md transform transition-all duration-300 scale-100 animate-slide-up">
          
          <div className="flex items-center justify-between p-6 pb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-xl">
                <PersonIcon className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-xl font-semibold text-text-primary">
                {reminder ? 'Edit Reminder' : 'Create New Reminder'}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-text-secondary hover:text-text-primary hover:bg-gray-700/50 rounded-lg transition-colors duration-200"
              disabled={isLoading}
            >
              <CloseIcon className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-5">
            
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-medium text-text-primary mb-2">
                <TitleIcon className="w-4 h-4 text-primary" />
                <span>Title</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className={`w-full px-4 py-3 bg-background/50 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 ${
                  errors.title 
                    ? 'border-error focus:ring-error/20 focus:border-error' 
                    : 'border-gray-600 focus:border-primary focus:ring-primary/20 hover:border-gray-500'
                } text-text-primary placeholder-text-secondary`}
                placeholder="Enter reminder title"
                disabled={isLoading}
              />
              {errors.title && (
                <p className="text-sm text-error flex items-center space-x-1">
                  <span className="w-1 h-1 bg-error rounded-full"></span>
                  <span>{errors.title}</span>
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-medium text-text-primary mb-2">
                <DescriptionIcon className="w-4 h-4 text-primary" />
                <span>Description</span>
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={3}
                className={`w-full px-4 py-3 bg-background/50 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 resize-none ${
                  errors.description 
                    ? 'border-error focus:ring-error/20 focus:border-error' 
                    : 'border-gray-600 focus:border-primary focus:ring-primary/20 hover:border-gray-500'
                } text-text-primary placeholder-text-secondary`}
                placeholder="Enter reminder description"
                disabled={isLoading}
              />
              {errors.description && (
                <p className="text-sm text-error flex items-center space-x-1">
                  <span className="w-1 h-1 bg-error rounded-full"></span>
                  <span>{errors.description}</span>
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-medium text-text-primary mb-2">
                <EventIcon className="w-4 h-4 text-primary" />
                <span>Reminder Date & Time</span>
              </label>
              <input
                type="datetime-local"
                value={formData.reminderDate}
                onChange={(e) => handleInputChange('reminderDate', e.target.value)}
                className={`w-full px-4 py-3 bg-background/50 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 ${
                  errors.reminderDate 
                    ? 'border-error focus:ring-error/20 focus:border-error' 
                    : 'border-gray-600 focus:border-primary focus:ring-primary/20 hover:border-gray-500'
                } text-text-primary [color-scheme:dark]`}
                disabled={isLoading}
              />
              {errors.reminderDate && (
                <p className="text-sm text-error flex items-center space-x-1">
                  <span className="w-1 h-1 bg-error rounded-full"></span>
                  <span>{errors.reminderDate}</span>
                </p>
              )}
            </div>

            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2.5 text-text-primary bg-gray-700/60 border border-gray-600 rounded-lg hover:bg-gray-600/60 hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500/20 transition-all duration-200 font-medium text-left"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 px-4 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-start space-x-2 font-medium shadow-lg hover:shadow-glow"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <SaveIcon className="w-4 h-4" />
                    <span>{reminder ? 'Update Reminder' : 'Create Reminder'}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};