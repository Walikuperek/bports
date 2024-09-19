import { ILogger } from './logger.port';
import { ConsoleLoggerAdapter } from './native.adapter';
import { FileLoggerAdapter } from './file.adapter';
import { GCPLoggerAdapter } from './gcp.adapter';

export interface GCPLoggerConfig {
    type: 'gcp';
    logName: string;
}
export interface NativeLoggerConfig {
    type: 'native' | 'console';
}
export interface FileLoggerConfig {
    type: 'file';
    logFileName: string;
}

export type LoggerConfig =
    | GCPLoggerConfig
    | NativeLoggerConfig
    | FileLoggerConfig;

export function createLogger(config: LoggerConfig): ILogger {
    switch (config.type) {
        case 'gcp':
            return new GCPLoggerAdapter(config.logName);
        case 'console':
            return new ConsoleLoggerAdapter();
        case 'native':
            return new ConsoleLoggerAdapter();
        case 'file':
            return new FileLoggerAdapter(config.logFileName);
        default:
            throw new Error('Unsupported logger type');
    }
}
