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

/*
IDEAS to change this piece of **** to something useful

export interface IDatabaseConnection<T> {
  connect(): Promise<void>;
  disconnect(): Promise<void>;

  // CRUD operations
  add(item: T): Promise<void>;
  addMany(items: T[]): Promise<void>;
  getById(id: string): Promise<T | null>;
  getAll(page?: number, pageSize?: number): Promise<T[]>;
  update(id: string, item: Partial<T>): Promise<void>;
  updateMany(ids: string[], items: Partial<T>[]): Promise<void>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;

  // Transaction operations
  transaction<R>(action: (transaction: IDatabaseTransaction<T>) => Promise<R>): Promise<R>;

  // Batch operations
  batch(): IDatabaseBatch<T>;

  // Pagination
  paginate(page: number, pageSize: number): Promise<T[]>;

  // Optional: Nested structure support
  getNestedCollection?(path: string): IDatabaseConnection<T>;
  getNestedNode?(nodeId: string): IDatabaseConnection<T>;
}

export interface IMySQLDatabaseConnection<T> extends IDatabaseConnection<T> {
  // No nested collections in MySQL
  getNestedCollection?: never;
  getNestedNode?: never;
}

export interface INoSQLDatabaseConnection<T> extends IDatabaseConnection<T> {
  // NoSQL-specific: Nested collections
  getNestedCollection(path: string): INoSQLDatabaseConnection<T>;
}

export interface IGraphDatabaseConnection<T> extends IDatabaseConnection<T> {
  // Graph-specific: Nested nodes
  getNestedNode(nodeId: string): IGraphDatabaseConnection<T>;
}

export interface IDatabaseTransaction<T> {
  add(item: T): Promise<void>;
  update(id: string, item: Partial<T>): Promise<void>;
  delete(id: string): Promise<void>;
  commit(): Promise<void>;
}

export interface IDatabaseBatch<T> {
  add(item: T): IDatabaseBatch<T>;
  update(id: string, item: Partial<T>): IDatabaseBatch<T>;
  delete(id: string): IDatabaseBatch<T>;
  commit(): Promise<void>;
}

// usage
const mysqlConnection: IMySQLDatabaseConnection<User> = new MySQLAdapter<User>();

// CRUD operation
await mysqlConnection.add({ id: '1', name: 'Alice' });
await mysqlConnection.getAll(1, 10); // paginacja

// Transaction
await mysqlConnection.transaction(async (trx) => {
  await trx.add({ id: '2', name: 'Bob' });
  await trx.update('1', { name: 'Alice Updated' });
});

const firestoreConnection: INoSQLDatabaseConnection<User> = new FirestoreAdapter<User>();

// Nested collection
const userOrders = firestoreConnection.getNestedCollection('users/1/orders');
await userOrders.add({ id: 'order1', product: 'Laptop' });

// Batch operation
const batch = firestoreConnection.batch();
batch.add({ id: '2', name: 'Charlie' });
batch.update('1', { name: 'Alice Updated' });
await batch.commit();


const neo4jConnection: IGraphDatabaseConnection<NodeData> = new Neo4jAdapter<NodeData>();

// Nested node
const friendsNode = neo4jConnection.getNestedNode('user1').getNestedNode('friends');
await friendsNode.add({ id: 'friend1', name: 'John' });

// Transaction
await neo4jConnection.transaction(async (trx) => {
  await trx.add({ id: 'node2', label: 'Person', properties: { name: 'Dave' } });
  await trx.update('node1', { properties: { name: 'Alice Updated' } });
});
*/
