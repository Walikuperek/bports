import { IDatabaseConnection } from './database.port';

export class MySQLAdapter implements IDatabaseConnection {
    private readonly createConnection: any;
    private readonly ConnectionType: any;
    private connection: any | null = null;

    constructor(private config: any) {
        try {
            const { createConnection, Connection } = require('mysql2/promise');
            this.createConnection = createConnection;
            this.ConnectionType = Connection;
        } catch (e) {
            throw new Error('Please run `npm install mysql2/promise` to use MySQLAdapter');
        }
    }

    async connect(): Promise<void> {
        this.connection = await this.createConnection(this.config);
    }

    async disconnect(): Promise<void> {
        if (this.connection) {
            await this.connection.end();
        }
    }

    async add(table: string, data: any): Promise<any> {
        const [result] = await this.connection!.execute(`INSERT INTO ${table} SET (?)`, [data]);
        return result;
    }

    async addMany(table: string, data: any[]): Promise<any[]> {
        const keys = Object.keys(data[0]);
        const values = data.map(obj => keys.map(key => obj[key]));
        const placeholders = data.map(() => `(${keys.map(() => '?').join(',')})`).join(',');
        const sql = `INSERT INTO ${table} (${keys.join(',')}) VALUES ${placeholders}`;
        const [result] = await this.connection!.execute(sql, values.flat());
        return result;
    }

    async update(table: string, id: string, data: any): Promise<void> {
        await this.connection!.execute(`UPDATE \`${table}\` SET ? WHERE id = ?`, [data, id]);
    }

    async updateMany(table: string, criteria: any, data: any): Promise<void> {
        const whereClauses = Object.keys(criteria).map(key => `${key} = ?`).join(' AND ');
        const values = Object.values(criteria);
        await this.connection!.execute(`UPDATE \`${table}\` SET ? WHERE ${whereClauses}`, [data, ...values]);
    }

    async delete(table: string, id: string): Promise<void> {
        await this.connection!.execute(`DELETE FROM \`${table}\` WHERE id = ?`, [id]);
    }

    async transaction(fn: (tx: typeof this.ConnectionType) => Promise<void>): Promise<void> {
        const connection = this.connection!;
        await connection.beginTransaction();
        try {
            await fn(connection);
            await connection.commit();
        } catch (err) {
            await connection.rollback();
            throw err;
        }
    }
}
