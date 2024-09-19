import { ILogger } from './logger.port';
import { ConsoleLoggerAdapter } from './native.adapter';
import { FileLoggerAdapter } from './file.adapter';
import { GCPLoggerAdapter } from './gcp.adapter';

export interface ConsoleLoggerConfig {}
export interface FileLoggerConfig {
    logFileName: string;
}
export interface GCPLoggerConfig {
    logName: string;
}


export function createLogger(type: 'console', config?: ConsoleLoggerConfig): ILogger;
export function createLogger(type: 'file', config: FileLoggerConfig): ILogger;
export function createLogger(type: 'gcp', config: GCPLoggerConfig): ILogger;
export function createLogger(type: string, config?: any): ILogger {
    switch (type) {
        case 'console':
            return new ConsoleLoggerAdapter();
        case 'file':
            return new FileLoggerAdapter(config.logFileName);
        case 'gcp':
            return new GCPLoggerAdapter(config.logName);
        default:
            throw new Error('Unsupported logger type');
    }
}
