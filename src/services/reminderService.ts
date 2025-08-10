import config from "../config";
import { PaginatedResponse, PaginationParams, Reminder } from "../types";
import IoService from "./ioService";

class ReminderService extends IoService {
    constructor() {
        super();
    }

    async getReminders(): Promise<Reminder[]> {
        const reminders = await this.request({
            method: 'GET',
            url: `${config.BASE_API_URL}/api/reminder`,
            requiredToken: true,
            responseOnlyBody: true,
        });
        return reminders.body;
    }

    async getRemindersPaginated(params: PaginationParams = {}): Promise<PaginatedResponse<Reminder>> {
        const queryParams = new URLSearchParams();

        if (params.page) queryParams.append('page', params.page.toString());
        if (params.limit) queryParams.append('limit', params.limit.toString());
        if (params.status) queryParams.append('status', params.status);
        if (params.sortBy) queryParams.append('sortBy', params.sortBy);
        if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder);

        const url = `${config.BASE_API_URL}/api/reminder${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

        const response = await this.request({
            method: 'GET',
            url,
            requiredToken: true,
            responseOnlyBody: true,
        });

        return response.body;
    }

    async createReminder(reminderData: Partial<Reminder>): Promise<Reminder> {
        const response = await this.request({
            method: 'POST',
            url: `${config.BASE_API_URL}/api/reminder`,
            data: reminderData,
            requiredToken: true,
            responseOnlyBody: true,
        });
        return response.body;
    }

    async updateReminder(id: string, reminderData: Partial<Reminder>): Promise<Reminder> {
        const response = await this.request({
            method: 'PUT',
            url: `${config.BASE_API_URL}/api/reminder/${id}`,
            data: reminderData,
            requiredToken: true,
            responseOnlyBody: true,
        });
        return response.body;
    }

    async cancelReminder(id: string): Promise<void> {
        await this.request({
            method: 'DELETE',
            url: `${config.BASE_API_URL}/api/reminder/${id}`,
            requiredToken: true,
            responseOnlyBody: true,
        });
    }
}

export default ReminderService;