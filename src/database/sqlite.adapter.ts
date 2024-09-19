import { IDatabaseConnection } from './database.port';

export class SQLiteAdapter implements IDatabaseConnection {
    private readonly Database: any;
    private db: any | null = null;

    constructor(private filepath: string) {
        try {
            const { Database } = require('sqlite3');
            this.Database = Database;
        } catch (e) {
            throw new Error('Please run `npm install sqlite3` to use SQLiteAdapter');
        }
    }

    async connect(): Promise<void> {
        this.db = new this.Database(this.filepath);
    }

    async disconnect(): Promise<void> {
        if (this.db) {
            this.db.close();
        }
    }

    async add(table: string, data: any): Promise<any> {
        const keys = Object.keys(data);
        const placeholders = keys.map(() => '?').join(',');
        const sql = `INSERT INTO ${table} (${keys.join(',')}) VALUES (${placeholders})`;
        return new Promise((resolve, reject) => {
            this.db!.run(sql, Object.values(data), function (err: any) {
                if (err) reject(err);
                else resolve({ id: this.lastID });
            });
        });
    }

    async addMany(table: string, data: any[]): Promise<any[]> {
        return Promise.all(data.map(item => this.add(table, item)));
    }

    async update(table: string, id: string, data: any): Promise<void> {
        const keys = Object.keys(data);
        const setClause = keys.map(key => `${key} = ?`).join(', ');
        const sql = `UPDATE ${table} SET ${setClause} WHERE id = ?`;
        return new Promise((resolve, reject) => {
            this.db!.run(sql, [...Object.values(data), id], function (err: any) {
                if (err) reject(err);
                else resolve();
            });
        });
    }

    async updateMany(table: string, criteria: any, data: any): Promise<void> {
        const keys = Object.keys(data);
        const setClause = keys.map(key => `${key} = ?`).join(', ');
        const whereClause = Object.keys(criteria).map(key => `${key} = ?`).join(' AND ');
        const sql = `UPDATE ${table} SET ${setClause} WHERE ${whereClause}`;
        return new Promise((resolve, reject) => {
            this.db!.run(sql, [...Object.values(data), ...Object.values(criteria)], function (err: any) {
                if (err) reject(err);
                else resolve();
            });
        });
    }

    async delete(table: string, id: string): Promise<void> {
        const sql = `DELETE FROM ${table} WHERE id = ?`;
        return new Promise((resolve, reject) => {
            this.db!.run(sql, [id], function (err: any) {
                if (err) reject(err);
                else resolve();
            });
        });
    }

    async transaction(fn: (tx: typeof this.Database) => Promise<void>): Promise<void> {
        const db = this.db!;
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.run('BEGIN TRANSACTION');
                fn(db)
                    .then(() => db.run('COMMIT', (err: any) => (err ? reject(err) : resolve())))
                    .catch(err => db.run('ROLLBACK', () => reject(err)));
            });
        });
    }
}
