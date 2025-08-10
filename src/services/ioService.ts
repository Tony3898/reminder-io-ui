import { AxiosError } from "axios";
import { AUTH_TOKEN_KEY, USER_DATA_KEY } from "../constants";
import { RequestOptions } from "../types";
import axiosInstance from "../utils/axios";

class IoService {

    protected async request({ method, url, data, requiredToken, headers, params, responseOnlyBody }: RequestOptions) {

        try {
            const token = localStorage.getItem(AUTH_TOKEN_KEY);

            if (requiredToken && !token) {
                throw new AxiosError('Token is required', '401');
            }

            const requestHeaders = {
                ...(data && { 'Content-Type': 'application/json' }),
                ...headers,
                ...(requiredToken && { Authorization: `Bearer ${token}` }),
            };

            const response = await axiosInstance.request({
                method,
                url,
                data,
                headers: requestHeaders,
                params,
            });

            if (responseOnlyBody) {
                return response.data;
            }

            return response;
        } catch (error) {
            console.error(error);
            if (error instanceof AxiosError) {
                if (error.response?.status === 401) {
                    localStorage.removeItem(AUTH_TOKEN_KEY);
                    localStorage.removeItem(USER_DATA_KEY);
                    window.location.href = '/login';
                }
                if (error?.response?.data) {
                    const errorMessage = error?.response?.data?.error || error?.response?.data?.message || error?.response?.data || 'Failed to perform action on server';
                    throw new Error(errorMessage);
                }
            }
            throw error;
        }
    }

}

export default IoService;