export interface IDatabaseConnection {
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    add(collection: string, data: any): Promise<any>;
    addMany(collection: string, data: any[]): Promise<any[]>;
    update(collection: string, id: string, data: any): Promise<void>;
    updateMany(collection: string, criteria: any, data: any): Promise<void>;
    delete(collection: string, id: string): Promise<void>;
    transaction(fn: (tx: any) => Promise<void>): Promise<void>;
}
