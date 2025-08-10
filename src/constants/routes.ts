import { DashboardPage } from "../pages/DashboardPage";
import { Routes } from "../types";

export const allRoutes: Routes[] = [
    {
        path: '/',
        element: DashboardPage,
        protectedRoute: true,
        showInMenu: true,
        text: 'Dashboard',
    }
]