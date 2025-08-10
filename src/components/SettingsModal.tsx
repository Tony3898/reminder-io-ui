import {
    Close as CloseIcon,
    Email as EmailIcon,
    Person as PersonIcon,
    Save as SaveIcon,
    Settings as SettingsIcon
} from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { USER_DATA_KEY } from '../constants';
import { useUserService } from '../contexts/ServicesContext';
import { ProfileData, SettingsModalProps } from '../types';

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  isLoading = false
}) => {
  const navigate = useNavigate();
  const userService = useUserService();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadProfile();
    }
  }, [isOpen]);

  const loadProfile = async () => {
    setLoading(true);
    try {
      const result = await userService.getProfile();
      if (result?.body?.user) {
        const userData = result.body.user;
        setProfile(userData);
        setFormData({
          name: userData.name,
          email: userData.email
        });
      } else {
        toast.error('Failed to load profile');
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!formData.email.includes('@')) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Check if any changes were made
    if (profile && formData.name === profile.name && formData.email === profile.email) {
      toast.error('No changes to save');
      return;
    }

    setSaving(true);

    try {
      const updates: { name?: string; email?: string } = {};
      if (profile && formData.name !== profile.name) {
        updates.name = formData.name.trim();
      }
      if (profile && formData.email !== profile.email) {
        updates.email = formData.email.trim();
      }

      const result = await userService.updateProfile(updates);
      if (result.status === 200) {
        toast.success('Profile updated successfully!');
        setProfile(result.body.user);
        localStorage.setItem(USER_DATA_KEY, JSON.stringify(result.body.user));
        // Show additional message if email was updated
        if (updates.email) {
          toast.success('Email verification has been initiated. Please check your inbox.', {
            duration: 5000
          });
        }
        
        onClose();
        setTimeout(() => {
          navigate('/');
        }, 1000);
      } else {
        toast.error(result.body.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const hasChanges = profile && (
    formData.name !== profile.name || 
    formData.email !== profile.email
  );

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
                <SettingsIcon className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-xl font-semibold text-text-primary">
                Account Settings
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-text-secondary hover:text-text-primary hover:bg-gray-700/50 rounded-lg transition-colors duration-200"
              disabled={isLoading || saving}
            >
              <CloseIcon className="w-5 h-5" />
            </button>
          </div>

          {loading ? (
            <div className="px-6 pb-6 flex items-center justify-center py-12">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
                <span className="text-text-primary">Loading profile...</span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-5">
              
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-sm font-medium text-text-primary mb-2">
                  <PersonIcon className="w-4 h-4 text-primary" />
                  <span>Full Name</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`w-full px-4 py-3 bg-background/50 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 ${
                    errors.name 
                      ? 'border-error focus:ring-error/20 focus:border-error' 
                      : 'border-gray-600 focus:border-primary focus:ring-primary/20 hover:border-gray-500'
                  } text-text-primary placeholder-text-secondary`}
                  placeholder="Enter your full name"
                  disabled={saving}
                />
                {errors.name && (
                  <p className="text-sm text-error flex items-center space-x-1">
                    <span className="w-1 h-1 bg-error rounded-full"></span>
                    <span>{errors.name}</span>
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-sm font-medium text-text-primary mb-2">
                  <EmailIcon className="w-4 h-4 text-primary" />
                  <span>Email Address</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full px-4 py-3 bg-background/50 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 ${
                    errors.email 
                      ? 'border-error focus:ring-error/20 focus:border-error' 
                      : 'border-gray-600 focus:border-primary focus:ring-primary/20 hover:border-gray-500'
                  } text-text-primary placeholder-text-secondary`}
                  placeholder="Enter your email address"
                  disabled={saving}
                />
                {errors.email && (
                  <p className="text-sm text-error flex items-center space-x-1">
                    <span className="w-1 h-1 bg-error rounded-full"></span>
                    <span>{errors.email}</span>
                  </p>
                )}
                <p className="text-xs text-gray-400">
                  Changing your email will require verification before you can receive reminder emails.
                </p>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-2.5 text-text-primary bg-gray-700/60 border border-gray-600 rounded-lg hover:bg-gray-600/60 hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500/20 transition-all duration-200 font-medium"
                  disabled={saving}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving || !hasChanges}
                  className="flex-1 px-4 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 font-medium shadow-lg hover:shadow-glow"
                >
                  {saving ? (
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <SaveIcon className="w-4 h-4" />
                      <span>{hasChanges ? 'Save Changes' : 'No Changes'}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
