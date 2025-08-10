import {
  AccessTime as AccessTimeIcon,
  Check as CheckIcon,
  Close as CloseIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  PersonAdd as PersonAddIcon,
  Person as PersonIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon
} from '@mui/icons-material';
import { CircularProgress } from '@mui/material';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuthService } from '../contexts/ServicesContext';

interface SignupCredentials {
  name: string;
  email: string;
  password: string;
}

export const SignupPage: React.FC = () => {
  const [credentials, setCredentials] = useState<SignupCredentials>({
    name: '',
    email: '',
    password: ''
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const authService = useAuthService();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!credentials.name || !credentials.email || !credentials.password || !confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }

    if (credentials.password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const result = await authService.register(credentials);
      if (result.success) {
        toast.success('Account created successfully! Please login with your credentials.');
        navigate('/login');
      } else {
        toast.error(result.error || 'An error occurred during signup');
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred during signup');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'confirmPassword') {
      setConfirmPassword(value);
    } else {
      setCredentials(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSwitchToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background-paper to-background flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-lg mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="mx-auto w-10 h-10 bg-gradient-to-br from-primary-light to-primary-main rounded-xl flex items-center justify-center shadow-2xl mb-3">
            <AccessTimeIcon className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-text-primary to-gray-300 bg-clip-text text-transparent mb-1">
            Join the Team
          </h1>
          <p className="text-gray-400 text-sm">
            Create your <span className="text-primary-main font-semibold">Reminder.io</span> account
          </p>
        </div>

        {/* Signup Form */}
        <div className="bg-background-paper/80 backdrop-blur-xl border border-gray-700/50 shadow-2xl rounded-xl py-6 px-6">
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-1">
                Full Name
              </label>
              <div className="flex items-center border border-gray-600/50 rounded-lg bg-background-DEFAULT/50 backdrop-blur-sm focus-within:ring-2 focus-within:ring-primary-main focus-within:border-transparent transition-all duration-200">
                <div className="pl-3 flex items-center">
                  <PersonIcon className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={credentials.name}
                  onChange={handleInputChange}
                  className="flex-1 px-3 py-2.5 bg-transparent text-text-primary placeholder-gray-400 focus:outline-none text-sm border-none active:border-none focus:border-none active:outline-none focus:ring-0"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-1">
                Email address
              </label>
              <div className="flex items-center border border-gray-600/50 rounded-lg bg-background-DEFAULT/50 backdrop-blur-sm focus-within:ring-2 focus-within:ring-primary-main focus-within:border-transparent transition-all duration-200">
                <div className="pl-3 flex items-center">
                  <EmailIcon className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={credentials.email}
                  onChange={handleInputChange}
                  className="flex-1 px-3 py-2.5 bg-transparent text-text-primary placeholder-gray-400 focus:outline-none text-sm border-none active:border-none focus:border-none active:outline-none focus:ring-0"
                  placeholder="Enter your email address"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-text-primary mb-1">
                Password
              </label>
              <div className="flex items-center border border-gray-600/50 rounded-lg bg-background-DEFAULT/50 backdrop-blur-sm focus-within:ring-2 focus-within:ring-primary-main focus-within:border-transparent transition-all duration-200">
                <div className="pl-3 flex items-center">
                  <LockIcon className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={credentials.password}
                  onChange={handleInputChange}
                  className="flex-1 px-3 py-2.5 bg-transparent text-text-primary placeholder-gray-400 focus:outline-none text-sm border-none active:border-none focus:border-none active:outline-none focus:ring-0"
                  placeholder="Create a strong password"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="pr-3 flex items-center text-gray-400 hover:text-gray-300 focus:outline-none focus:text-gray-300 transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <VisibilityOffIcon className="h-4 w-4" />
                  ) : (
                    <VisibilityIcon className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-text-primary mb-1">
                Confirm Password
              </label>
              <div className="flex items-center border border-gray-600/50 rounded-lg bg-background-DEFAULT/50 backdrop-blur-sm focus-within:ring-2 focus-within:ring-primary-main focus-within:border-transparent transition-all duration-200">
                <div className="pl-3 flex items-center">
                  <CheckIcon className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={handleInputChange}
                  className="flex-1 px-3 py-2.5 bg-transparent text-text-primary placeholder-gray-400 focus:outline-none text-sm border-none active:border-none focus:border-none active:outline-none focus:ring-0"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="pr-3 flex items-center text-gray-400 hover:text-gray-300 focus:outline-none focus:text-gray-300 transition-colors"
                  aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                >
                  {showConfirmPassword ? (
                    <VisibilityOffIcon className="h-4 w-4" />
                  ) : (
                    <VisibilityIcon className="h-4 w-4" />
                  )}
                </button>
              </div>

              {/* Password Match Indicator */}
              {confirmPassword && (
                <div className="mt-1 flex items-center text-xs">
                  {credentials.password === confirmPassword ? (
                    <>
                      <CheckIcon className="w-3 h-3 mr-1 text-green-500" />
                      <span className="text-green-400">Passwords match</span>
                    </>
                  ) : (
                    <>
                      <CloseIcon className="w-3 h-3 mr-1 text-red-500" />
                      <span className="text-red-400">Passwords do not match</span>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-primary-light to-primary-main hover:from-primary-main hover:to-primary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-main disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 hover:shadow-xl"
              >
                {loading ? (
                  <div className="flex items-center">
                    <CircularProgress size={16} className="mr-3 text-white" />
                    Creating account...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <PersonAddIcon className="w-4 h-4 mr-2" />
                    Create Account
                  </div>
                )}
              </button>
            </div>
          </form>

          {/* Sign In Link */}
          <div className="mt-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600/50" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-background-paper/80 text-gray-400">Already have an account?</span>
              </div>
            </div>

            <div className="mt-3 text-center">
              <button
                type="button"
                onClick={handleSwitchToLogin}
                className="font-medium text-primary-main hover:text-primary-light transition-colors duration-200 focus:outline-none focus:underline"
              >
                ← Sign in instead
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
