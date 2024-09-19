import { ILogger } from './logger.port';

export class GCPLoggerAdapter implements ILogger {
    private readonly logName: string;
    private readonly Logging: any;
    private readonly loggingClient: any;

    constructor(logName: string) {
        this.logName = logName;
        try {
            const { Logging } = require('@google-cloud/logging');
            this.Logging = Logging;
            this.loggingClient = new this.Logging();
        } catch (error) {
            throw new Error('Please run `npm install @google-cloud/logging` to use GCPLoggerAdapter');
        }
    }

    private async writeLog(severity: string, message: string): Promise<void> {
        const log = this.loggingClient.log(this.logName);
        const metadata = {
            resource: { type: 'global' },
            severity: severity,
        };
        const entry = log.entry(metadata, { message });
        await log.write(entry);
    }

    log(message: string): void {
        this.writeLog('DEFAULT', message).catch(console.error);
    }

    info(message: string): void {
        this.writeLog('INFO', message).catch(console.error);
    }

    warn(message: string): void {
        this.writeLog('WARNING', message).catch(console.error);
    }

    error(message: string): void {
        this.writeLog('ERROR', message).catch(console.error);
    }
}
