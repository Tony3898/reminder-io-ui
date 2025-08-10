import AuthService from '../services/authService';
import ReminderService from '../services/reminderService';
import UserService from '../services/userService';
import { ServiceInstances } from '../types';

class Bootstrap {
    private static instance: Bootstrap;
    private services: ServiceInstances | null = null;
    private initialized = false;

    private constructor() { }

    public static getInstance(): Bootstrap {
        if (!Bootstrap.instance) {
            Bootstrap.instance = new Bootstrap();
        }
        return Bootstrap.instance;
    }

    public initialize(): ServiceInstances {
        if (this.initialized && this.services) {
            return this.services;
        }

        try {
            const authService = new AuthService();
            const userService = new UserService();
            const reminderService = new ReminderService();

            this.services = {
                authService,
                userService,
                reminderService,
            };

            this.initialized = true;

            return this.services;
        } catch (error) {
            console.error('Failed to initialize services:', error);
            throw new Error('Service initialization failed');
        }
    }

    public getServices(): ServiceInstances {
        if (!this.initialized || !this.services) {
            throw new Error('Services not initialized. Call initialize() first.');
        }
        return this.services;
    }

    public isInitialized(): boolean {
        return this.initialized;
    }
}

export default Bootstrap;
