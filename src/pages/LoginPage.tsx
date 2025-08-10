import {
  AccessTime as AccessTimeIcon,
  Lock as LockIcon,
  Login as LoginIcon,
  Person as PersonIcon
} from '@mui/icons-material';
import { CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuthService } from '../contexts/ServicesContext';
import { LoginCredentials } from '../types';

export const LoginPage: React.FC = () => {
  const authService = useAuthService();
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = authService.getCurrentUser();
    const token = authService.getToken();
    if (user && token) {
      navigate('/');
    }
  }, [authService, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await authService.login(credentials);
      
      if (result.success) {
        toast.success('Login successful!');
        navigate('/');
      } else {
        toast.error(result.error || 'Login failed');
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSignupNavigation = () => {
    navigate('/signup');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background-paper to-background flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="mx-auto w-10 h-10 bg-gradient-to-br from-primary-main to-primary-light rounded-xl flex items-center justify-center shadow-2xl mb-3">
            <AccessTimeIcon className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-text-primary to-gray-300 bg-clip-text text-transparent mb-1">
            Welcome Back
          </h1>
          <p className="text-gray-400 text-sm">
            Sign in to your <span className="text-primary-main font-semibold">Reminder.io</span> account
          </p>
        </div>
        
        {/* Main Form */}
        <div className="bg-background-paper/80 backdrop-blur-xl border border-gray-700/50 shadow-2xl rounded-xl py-6 px-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-1">
                Email address
              </label>
              <div className="flex items-center border border-gray-600/50 rounded-lg bg-background-DEFAULT/50 backdrop-blur-sm focus-within:ring-2 focus-within:ring-primary-main focus-within:border-transparent transition-all duration-200">
                <div className="pl-3 flex items-center">
                  <PersonIcon className="h-4 w-4 text-gray-400" />
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
                  type="password"
                  autoComplete="current-password"
                  required
                  value={credentials.password}
                  onChange={handleInputChange}
                  className="flex-1 px-3 py-2.5 bg-transparent text-text-primary placeholder-gray-400 focus:outline-none text-sm border-none active:border-none focus:border-none active:outline-none focus:ring-0"
                  placeholder="Enter your password"
                />
              </div>
            </div>


            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="group w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-primary-main to-primary-light hover:from-primary-light hover:to-primary-main focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-main disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 hover:shadow-xl"
              >
                {loading ? (
                  <div className="flex items-center">
                    <CircularProgress size={16} className="mr-3 text-white" />
                    Signing in...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <LoginIcon className="w-4 h-4 mr-2" />
                    Sign in
                  </div>
                )}
              </button>
            </div>
          </form>

          {/* Sign Up Link */}
          <div className="mt-4">
            <div className="flex items-center">
              <div className="flex-1 border-t border-gray-600/50"></div>
              <span className="px-3 text-sm text-gray-400 bg-background-paper">New to Reminder.io?</span>
              <div className="flex-1 border-t border-gray-600/50"></div>
            </div>

            <div className="mt-3 text-center">
              <button
                type="button"
                onClick={handleSignupNavigation}
                className="font-medium text-primary-main hover:text-primary-light transition-colors duration-200 focus:outline-none focus:underline"
              >
                Create your account →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
