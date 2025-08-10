import React, { createContext, ReactNode, useContext } from 'react';
import Bootstrap from '../utils/bootstrap';
import { ServiceInstances } from '../types';

interface ServicesContextType {
  services: ServiceInstances;
}

const ServicesContext = createContext<ServicesContextType | undefined>(undefined);

interface ServicesProviderProps {
  children: ReactNode;
}

export const ServicesProvider: React.FC<ServicesProviderProps> = ({ children }) => {
  const bootstrap = Bootstrap.getInstance();
  const services = bootstrap.initialize();

  return (
    <ServicesContext.Provider value={{ services }}>
      {children}
    </ServicesContext.Provider>
  );
};

export const useServices = (): ServiceInstances => {
  const context = useContext(ServicesContext);
  
  if (context === undefined) {
    throw new Error('useServices must be used within a ServicesProvider');
  }
  
  return context.services;
};

export const useAuthService = () => {
  const { authService } = useServices();
  return authService;
};

export const useUserService = () => {
  const { userService } = useServices();
  return userService;
};

export const useReminderService = () => {
  const { reminderService } = useServices();
  return reminderService;
};

export default ServicesContext;
