import config from "../config";
import { AUTH_TOKEN_KEY, USER_DATA_KEY } from "../constants";
import { AuthUser, LoginCredentials, RegisterCredentials } from "../types";
import IoService from "./ioService";

class AuthService extends IoService {

    constructor() {
        super();
    }

    isAuthenticated(): boolean {
        const token = localStorage.getItem(AUTH_TOKEN_KEY);
        return !!token;
    }

    getCurrentUser(): AuthUser | null {
        const userData = localStorage.getItem(USER_DATA_KEY);
        if (userData) {
            try {
                return JSON.parse(userData);
            } catch (error) {
                console.error('Error parsing user data:', error);
                this.logout();
                return null;
            }
        }
        return null;
    }

    async login(credentials: LoginCredentials): Promise<{ success: boolean; user?: AuthUser; error?: string }> {
        try {
            const response = await this.request({
                method: 'POST',
                url: `${config.BASE_API_URL}/api/login`,
                data: credentials,
            });
            const token = response.headers['x-auth-token'];

            if (token) {
                localStorage.setItem(AUTH_TOKEN_KEY, token);
            }
            const user = response?.data?.user;
            localStorage.setItem(USER_DATA_KEY, JSON.stringify(user));
            return { success: true, user };
        } catch (error) {
            return { success: false, error: error instanceof Error ? error.message : 'Login failed' };
        }
    }

    async register(credentials: RegisterCredentials): Promise<{ success: boolean; user?: AuthUser; error?: string }> {
        try {
            const response = await this.request({
                method: 'POST',
                url: `${config.BASE_API_URL}/api/register`,
                data: credentials,
            });
            return { success: true, user: response.data };
        } catch (error) {
            return { success: false, error: error instanceof Error ? error.message : 'Registration failed' };
        }
    }

    logout(): void {
        localStorage.removeItem(AUTH_TOKEN_KEY);
        localStorage.removeItem(USER_DATA_KEY);
    }

    getToken(): string | null {
        return localStorage.getItem(AUTH_TOKEN_KEY);
    }
}

export default AuthService;
