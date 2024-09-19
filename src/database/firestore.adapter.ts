import { IDatabaseConnection } from './database.port';

export class FirestoreAdapter implements IDatabaseConnection {
    private TransactionType: any;
    private firestore: any;

    constructor() {
        try {
            const { Firestore, Transaction } = require('@google-cloud/firestore');
            this.TransactionType = Transaction;
            this.firestore = new Firestore();
        } catch (error) {
            throw new Error('Please run `npm install @google-cloud/firestore` to use FirestoreAdapter');
        }
    }

    async connect(): Promise<void> {
        // No action needed for Firestore
    }

    async disconnect(): Promise<void> {
        // No action needed for Firestore
    }

    async add(collection: string, data: any): Promise<any> {
        const docRef = await this.firestore.collection(collection).add(data);
        return { id: docRef.id };
    }

    async addMany(collection: string, data: any[]): Promise<any[]> {
        const batch = this.firestore.batch();
        const results: any[] = [];
        data.forEach(item => {
            const docRef = this.firestore.collection(collection).doc();
            batch.set(docRef, item);
            results.push({ id: docRef.id });
        });
        await batch.commit();
        return results;
    }

    async update(collection: string, id: string, data: any): Promise<void> {
        await this.firestore.collection(collection).doc(id).update(data);
    }

    async updateMany(collection: string, criteria: any, data: any): Promise<void> {
        const query = this.firestore.collection(collection);
        Object.keys(criteria).forEach(key => {
            query.where(key, '==', criteria[key]);
        });
        const snapshot = await query.get();
        const batch = this.firestore.batch();
        snapshot.forEach((doc: any) => {
            batch.update(doc.ref, data);
        });
        await batch.commit();
    }

    async delete(collection: string, id: string): Promise<void> {
        await this.firestore.collection(collection).doc(id).delete();
    }

    async transaction(fn: (tx: typeof this.TransactionType) => Promise<void>): Promise<void> {
        await this.firestore.runTransaction(fn);
    }
}
