import { ILogger } from './logger.port';
import * as fs from 'fs';
import * as path from 'path';

export class FileLoggerAdapter implements ILogger {
    private filePath: string;

    constructor(logFileName: string) {
        this.filePath = path.resolve(__dirname, logFileName);
    }

    private writeToFile(message: string): void {
        const logMessage = `${new Date().toISOString()} ${message}\n`;
        fs.appendFileSync(this.filePath, logMessage, 'utf8');
    }

    log(message: string): void {
        this.writeToFile(`[LOG]: ${message}`);
    }

    info(message: string): void {
        this.writeToFile(`[INFO]: ${message}`);
    }

    warn(message: string): void {
        this.writeToFile(`[WARN]: ${message}`);
    }

    error(message: string): void {
        this.writeToFile(`[ERROR]: ${message}`);
    }
}
