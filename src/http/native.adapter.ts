import http from 'http';
import https from 'https';
import { IHttp } from './http.port';

export class NativeHttpClientAdapter implements IHttp {
    async get<T>(url: string, headers?: Record<string, string>): Promise<T> {
        return this.request<T>('GET', url, null, headers);
    }

    async post<T>(url: string, data: any, headers?: Record<string, string>): Promise<T> {
        return this.request<T>('POST', url, data, headers);
    }

    async put<T>(url: string, data: any, headers?: Record<string, string>): Promise<T> {
        return this.request<T>('PUT', url, data, headers);
    }

    async delete<T>(url: string, headers?: Record<string, string>): Promise<T> {
        return this.request<T>('DELETE', url, null, headers);
    }

    private request<T>(method: string, url: string, data?: any, headers?: Record<string, string>): Promise<T> {
        const isHttps = url.startsWith('https');
        const client = isHttps ? https : http;

        return new Promise<T>((resolve, reject) => {
            const req = client.request(url, { method, headers }, (res) => {
                let body = '';

                res.on('data', (chunk) => {
                    body += chunk;
                });

                res.on('end', () => {
                    if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
                        resolve(JSON.parse(body) as T);
                    } else {
                        reject(new Error(`Request failed with status code ${res.statusCode}`));
                    }
                });
            });

            req.on('error', (err) => {
                reject(err);
            });

            if (data) {
                req.write(JSON.stringify(data));
            }

            req.end();
        });
    }
}
