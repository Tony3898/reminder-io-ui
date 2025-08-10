import {
  Timer as TimerIcon
} from '@mui/icons-material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthService } from '../../contexts/ServicesContext';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const authService = useAuthService();
  const currentUser = authService.getCurrentUser();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <header className="bg-background-paper/95 backdrop-blur-lg border-b border-gray-700/30 shadow-lg">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo Section */}
          <div className="flex items-center space-x-2 sm:space-x-4 min-w-0 flex-1">
            {/* Story Pointing Logo */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-primary-main to-primary-light rounded-lg flex items-center justify-center shadow-lg flex-shrink-0">
                <TimerIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="min-w-0">
                <h1 className="text-sm sm:text-lg font-bold text-text-primary truncate">Reminder.io</h1>
                <p className="text-xs text-gray-400 -mt-1 hidden sm:block">Reminder Tool</p>
              </div>
            </div>
          </div>

          {/* User Section */}
          {
            <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
              {/* User Info */}
              <div className="flex items-center space-x-2 sm:space-x-3 bg-background-default/50 rounded-xl px-2 sm:px-3 py-1.5 sm:py-2 border border-gray-700/50">
              <div className={`w-6 h-6 sm:w-7 sm:h-7 bg-gradient-to-br from-primary-main to-primary-light rounded-md flex items-center justify-center text-xs font-bold text-white flex-shrink-0`}>
                    {currentUser?.name.split(' ').map(word => word[0]).join('').slice(0, 2).toUpperCase()}
                  </div>
                <div className="hidden md:block text-left min-w-0">
                  <p className="text-sm font-medium text-text-primary truncate max-w-[120px]">{currentUser?.name}</p>
                  <p className="text-xs text-gray-400 truncate max-w-[120px]">{currentUser?.email}</p>
                </div>
              </div>

              {/* Logout Button */}
              {
                <button
                  onClick={handleLogout}
                  className="bg-error/20 hover:bg-error/30 text-error border border-error/50 hover:border-error px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 flex items-center space-x-1 sm:space-x-2"
                  title="Logout"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  <span className="hidden sm:inline">Logout</span>
                </button>
              }
            </div>
          }
        </div>
      </div>
    </header>
  );
};
