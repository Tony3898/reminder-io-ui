import { AccessTime as AccessTimeIcon } from '@mui/icons-material';
import React from 'react';
import { LoadingProps } from '../types';

export const Loading: React.FC<LoadingProps> = ({
  size = 'medium',
  fullScreen = false,
  className = ''
}) => {
  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-12 h-12',
    large: 'w-16 h-16'
  };

  const iconSizeClasses = {
    small: 'w-3 h-3',
    medium: 'w-6 h-6',
    large: 'w-8 h-8'
  };

  const containerBaseClasses = "flex items-center justify-center";
  const containerClasses = fullScreen 
    ? `${containerBaseClasses} min-h-screen bg-background-DEFAULT ${className}`
    : `${containerBaseClasses} ${className}`;

  return (
    <div className={containerClasses}>
      <div className="text-center">
        {/* Animated Clock Icon */}
        <div className="relative mb-4">
          {/* Outer spinning ring */}
          <div className={`${sizeClasses[size]} animate-spin rounded-full border-2 border-gray-600 border-t-primary-main mx-auto`}>
          </div>
          
          {/* Inner pulsing clock icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-pulse">
              <AccessTimeIcon 
                className={`${iconSizeClasses[size]} text-primary-main`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const InlineLoading: React.FC<Omit<LoadingProps, 'fullScreen'>> = (props) => (
  <Loading {...props} fullScreen={false} />
);

export const FullScreenLoading: React.FC<Omit<LoadingProps, 'fullScreen'>> = (props) => (
  <Loading {...props} fullScreen={true} />
);

export default Loading;
