import { IHttp } from './http.port';
import { AxiosHttpClientAdapter } from './axios.adapter';
import { NativeHttpClientAdapter } from './native.adapter';

export interface AxiosConfig {
    baseUrl?: string;
}
export interface NodeHttpConfig {}

export function createHttp(type: 'node', config?: NodeHttpConfig): IHttp;
export function createHttp(type: 'axios', config?: AxiosConfig): IHttp;
export function createHttp(type: string, config?: any): IHttp {
    switch (type) {
        case 'axios':
            return new AxiosHttpClientAdapter(config?.baseUrl);
        case 'native':
            return new NativeHttpClientAdapter();
        case 'node':
            return new NativeHttpClientAdapter();
        default:
            throw new Error('Unsupported client type');
    }
}
