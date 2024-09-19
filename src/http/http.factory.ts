import { IHttp } from './http.port';
import { AxiosHttpClientAdapter } from './axios.adapter';
import { NativeHttpClientAdapter } from './native.adapter';

export interface AxiosConfig {
    type: 'axios';
    baseUrl?: string;
}
export interface NativeNodeHttpConfig {
    type: 'node' | 'native';
}
export type HttpClientConfig =
    | AxiosConfig
    | NativeNodeHttpConfig;

export function createHttp(config: HttpClientConfig): IHttp {
    switch (config.type) {
        case 'axios':
            return new AxiosHttpClientAdapter(config.baseUrl);
        case 'native':
            return new NativeHttpClientAdapter();
        case 'node':
            return new NativeHttpClientAdapter();
        default:
            throw new Error('Unsupported client type');
    }
}
