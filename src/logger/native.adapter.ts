import { ILogger } from './logger.port';

export class ConsoleLoggerAdapter implements ILogger {
    log(message: string): void {
        console.log(`[LOG]: ${message}`);
    }

    info(message: string): void {
        console.info(`[INFO]: ${message}`);
    }

    warn(message: string): void {
        console.warn(`[WARN]: ${message}`);
    }

    error(message: string): void {
        console.error(`[ERROR]: ${message}`);
    }
}
