# Database Connection

> Looks complete, but it's not. Requires some more work.

This project provides an abstract `IDatabaseConnection` interface and adapters for connecting to different databases, such as MySQL and Firestore. The goal is to provide a unified interface for database operations, making it easier to switch between different databases without changing the application code.

## Table of Contents
- [Database Connection](#database-connection)
  - [Table of Contents](#table-of-contents)
  - [Usage](#usage)
    - [Dependency Injection Example](#dependency-injection-example)
  - [Database Adapters](#database-adapters)
  - [Example Configurations](#example-configurations)
  - [API](#api)
    - [`add(record: any): Promise<void>`](#addrecord-any-promisevoid)
    - [`addMany(records: any[]): Promise<void>`](#addmanyrecords-any-promisevoid)
    - [`update(id: string, record: any): Promise<void>`](#updateid-string-record-any-promisevoid)
    - [`updateMany(records: { id: string, data: any }[]): Promise<void>`](#updatemanyrecords--id-string-data-any--promisevoid)
    - [`transaction<T>(actions: (conn: IDatabaseConnection) => Promise<T>): Promise<T>`](#transactiontactions-conn-idatabaseconnection--promiset-promiset)
  - [Contributing](#contributing)
  - [Back to main page](#back-to-main-page)

## Usage

Use the appropriate database adapter (MySQL or Firestore) to instantiate a connection and perform database operations such as adding, updating, and running transactions.

```typescript
import { createDatabase } from '@quak.lib/bports';

const mysqlDB = createDatabase('mysql', {
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'example'
});

// Or choose another DB adapter
const firestoreDB = createDatabase('firestore')
const sqliteDB = createDatabase('sqlite', { filepath: './database.sqlite' })

// Add single entity
await mysqlDB.add('users', { name: 'John Doe', age: 30 });
```

### Dependency Injection Example

The `IDatabaseConnection` interface can be injected into services or controllers for database operations in a modular way.

```typescript
import {createDatabase} from "./database.factory";

class UserService {
    constructor(private db: IDatabaseConnection) {}

    async createUser(data: any) {
        await this.db.add(data);
    }
}

const userService = new UserService(createDatabase('sqlite', { filepath: './databse.sqlite' }));
await userService.createUser({name: 'Alice', age: 25});
```

## Database Adapters

- **MySQL Adapter**: Uses MySQL as the database backend.
- **SQLite Adapter**: Uses SQLite as the database backend.
- **Firestore Adapter**: Uses Google Firestore for cloud-based storage.

## Example Configurations

- **MySQL Adapter**:
    ```typescript
    'mysql', {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'example'
    }
    ```

- **SQLite Adapter**:
    ```typescript
    'sqlite', { filepath: './database.sqlite' }
    ```

- **Firestore Adapter**:
    ```typescript
    'firestore'
    ```

## API

The `IDatabaseConnection` interface defines methods for common database operations. Each adapter implements these methods to interact with its respective database.

### `add(record: any): Promise<void>`
- **Description**: Adds a new record to the database.
- **Parameters**:
  - `record`: The record to be added.

### `addMany(records: any[]): Promise<void>`
- **Description**: Adds multiple records to the database in a single operation.
- **Parameters**:
  - `records`: An array of records to be added.

### `update(id: string, record: any): Promise<void>`
- **Description**: Updates an existing record in the database by its ID.
- **Parameters**:
  - `id`: The unique identifier of the record to be updated.
  - `record`: The updated data.

### `updateMany(records: { id: string, data: any }[]): Promise<void>`
- **Description**: Updates multiple records in the database in a single operation.
- **Parameters**:
  - `records`: An array of objects containing the ID and the updated data.

### `transaction<T>(actions: (conn: IDatabaseConnection) => Promise<T>): Promise<T>`
- **Description**: Executes a set of operations within a transaction. If any operation fails, the transaction will roll back.
- **Parameters**:
  - `actions`: A function that performs the operations within the transaction.
- **Returns**: A promise that resolves with the result of the transaction.

## Contributing

Contributions and feature requests are welcome! Feel free to create issues or submit pull requests.

## Back to main page

Go back to the [main page](/README.md)
