import { ReactNode } from "react";
import AuthService from "../services/authService";
import ReminderService from "../services/reminderService";
import UserService from "../services/userService";

export interface ServiceInstances {
    authService: AuthService;
    userService: UserService;
    reminderService: ReminderService;
}

export interface AuthUser {
    id: string;
    email: string;
    name: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterCredentials {
    email: string;
    password: string;
    name: string;
}


export interface RequestOptions {
    method: string;
    url: string;
    data?: any;
    requiredToken?: boolean;
    headers?: Record<string, string>;
    params?: Record<string, string>;
    responseOnlyBody?: boolean;
}


export interface LayoutProps {
    children: ReactNode;
    showHeader?: boolean;
    showFooter?: boolean;
    isPublicPage?: boolean;
}

export interface Reminder {
    id: string,
    userId: number,
    title: string,
    description: string,
    reminderDate: number,
    status: ReminderStatusType,
    createdAt: string,
    updatedAt: string,
}

export enum ReminderStatus {
    SCHEDULED = 'SCHEDULED',
    CANCELLED = 'CANCELLED',
    DELIVERED = 'DELIVERED'
}

export type ReminderStatusType = 'SCHEDULED' | 'CANCELLED' | 'DELIVERED';

export interface LoadingProps {
    size?: 'small' | 'medium' | 'large';
    fullScreen?: boolean;
    className?: string;
}

export interface Routes {
    path: string,
    element: React.FC,
    protectedRoute: boolean,
    showInMenu: boolean,
    text: string,
    index?: boolean,
}

export interface PaginationParams {
    page?: number;
    limit?: number;
    status?: ReminderStatusType;
    sortBy?: 'reminderDate' | 'createdAt' | 'title';
    sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
    data: T[];
    pagination: {
        currentPage: number;
        totalPages: number;
        totalItems: number;
        itemsPerPage: number;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
    };
}

export interface ProfileData {
    id: number;
    name: string;
    email: string;
}

export interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    isLoading?: boolean;
}