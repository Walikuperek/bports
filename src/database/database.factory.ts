import { IDatabaseConnection } from './database.port';
import { FirestoreAdapter } from './firestore.adapter';
import { MySQLAdapter } from './mysql.adapter';
import { SQLiteAdapter } from './sqlite.adapter';

export interface MySQLConfig {
    host: string;
    user: string;
    password: string;
    database: string;
}
export interface FirestoreConfig {}
export interface SQLiteConfig {
    filepath: string;
}

export function createDatabase(type: 'sqlite', config: SQLiteConfig): IDatabaseConnection;
export function createDatabase(type: 'mysql', config: MySQLConfig): IDatabaseConnection;
export function createDatabase(type: 'firestore', config?: FirestoreConfig): IDatabaseConnection;
export function createDatabase(type: string, config?: any): IDatabaseConnection {
    switch (type) {
        case 'sqlite':
            return new SQLiteAdapter(config.filepath);
        case 'mysql':
            return new MySQLAdapter(config);
        case 'firestore':
            return new FirestoreAdapter();
        default:
            throw new Error(`Unsupported database type: ${type}`);
    }
}
