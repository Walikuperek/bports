import { IHttp } from './http.port';
import { CreateAxiosDefaults } from 'axios';

export class AxiosHttpClientAdapter implements IHttp {
    private readonly axiosInstance: any;

    constructor(baseURL?: string) {
        try {
            const axios = require('axios');
            this.axiosInstance = axios.create({baseURL} as CreateAxiosDefaults);
        } catch (error) {
            throw new Error('Please run `npm install axios` to use AxiosHttpClientAdapter');
        }
    }

    async get<T>(url: string, headers?: Record<string, string>): Promise<T> {
        return this.request<T>({method: 'GET', url, headers});
    }

    async post<T>(url: string, data: any, headers?: Record<string, string>): Promise<T> {
        return this.request<T>({method: 'POST', url, data, headers});
    }

    async put<T>(url: string, data: any, headers?: Record<string, string>): Promise<T> {
        return this.request<T>({method: 'PUT', url, data, headers});
    }

    async delete<T>(url: string, headers?: Record<string, string>): Promise<T> {
        return this.request<T>({method: 'DELETE', url, headers});
    }

    private async request<T>(config: any): Promise<T> {
        const response = await this.axiosInstance.request(config);
        return response.data as T;
    }
}
