# bports [WIP]

<p align="center">
  <img src="https://quak.com.pl/assets/logo/bports_logo.png" />
</p>

<p align="center">
  <img src="https://img.shields.io/github/license/walikuperek/qtheme" />
  <img src="https://img.shields.io/badge/tests-%E2%9C%85-success" />
</p>

*Quick example:*
```typescript copy
import { createDatabase, createHttp, createLogger, ILogger, IHttp, IDatabaseConnection } from '@quak.lib/bports'

// Error: Please run `npm install axios` to use AxiosHttpClientAdapter
const http: IHttp = createHttp('axios', { baseUrl: 'https://example.com/api'})
const users = await http.get('/users')

const mysqlDB = createDatabase('mysql', {
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'example'
});
const firestoreDB = createDatabase('firestore')
const sqliteDB = createDatabase('sqlite', { filepath: './database.sqlite' })
await mysqlDB.add('users', { name: 'John Doe', age: 30 });
```

*Dependency Injection example:*

```typescript
class App {
    constructor(private logger: ILogger, private db: IDatabaseConnection) {}

    async run(port: number) {
        await this.db.connect()
        await this.db.add('users', { username: 'admin', pass: 'password' })
        this.logger.info(`App is serving at port ${port}`)
    }
    
    async disconnect() {
        await this.db.disconnect()
    }
}

// Use your app
const app = new App(
    createLogger('console'),
    createDatabase('sqlite', { filepath: './database.sqlite' })
)
await app.run(3000)
```

## Description

**`bports`** is a modular backend library that provides ports (interfaces) and adapters for commonly used services like logging, HTTP handling, etc. - allowing users to swap implementations easily without changing the application code.

The main goal is to `keep the API stable`, `preventing breaking changes` while offering flexibility in choosing dependencies.

> Wait with usage till modules finished and API stabilization after tests.

## Features

- **Modularity:** Use only the adapters you need, no extra dependencies.
- **Ports and Adapters:** Predefined interfaces for key services (e.g., loggers).
- **Optional Peer Dependencies:** You install only the necessary peer dependencies for the adapters you want to use.

## Table of Contents

1. [Installation](#installation)
2. [Supported Ports](#supported-ports)
3. [Dependency Configuration](#dependency-configuration)

## Installation

Prerequisites:
- NodeJS (v18+) installed on your machine
  ```bash
  $ node -v  # check version 
    v20.14.0 # should be v18+
  ```

Install the core library:
```bash
npm install @quak.lib/bports # Not yet published
```

Then use any adapter. For example, to use the GCP Logger adapter:
```typescript
import { createLogger, ILogger } from '@quak.lib/bports'

// Error: Please run `npm install @google-cloud/logging` to use GCPLoggerAdapter
const gcpLogger: ILogger = createLogger('gcp', { logName: 'logs-name'})

// After @google-cloud/logging installation
gcpLogger.info('First log on GCP')
```

## Supported Ports
- [IHttp](/src/http/README.md) - Interface for handling HTTP requests.
- [ILogger](/src/logger/README.md) - Interface for logging information.
- [IDatabaseConnection](/src/database/README.md) - Interface for database connections.

### Unprepared
> 🚧 Under construction, building modules and preparation to publish on NPM.
- IEventBus - Interface for handling events and communication between components.
- ICache - Interface for handling cache.
- IAuthService - Interface for handling authorization and authentication.
- IMessagingService - Interface for sending and receiving messages.
- IStorageService - Interface for file and data storage.
- IQueue - Interface for handling task queues.
- IConfigService - Interface for managing application configuration.
- IScheduler - Interface for task scheduling and background work.
- IPaymentGateway - Interface for payment system integration.
- INotificationService - Interface for handling notifications (email, SMS, push).
- IUserService - Interface for managing users and profiles.
- IAnalyticsService - Interface for data collection and analysis.

## Dependency Configuration

For adapters that require additional libraries (like `@google-cloud/logging` for GCP logging), the dependencies are optional peer dependencies. This means you can install them only if you're using the respective adapter.

### Steps for Setting Up Peer Dependencies

1. **Install the core `bports` library:**
  - Install library
    ```bash
    npm install @quak.lib/bports
    ```

2. **Install the desired adapter's peer dependencies:**
  - For GCP Logger:
    > Throws if not installed deps: 
    >
    > Error: 'Please run `npm install @google-cloud/logging` to use GCPLoggerAdapter'
    
    Then install dependencies for adapter:
    ```bash
    npm install @google-cloud/logging
    ```

3. **Configure the adapter in your project:**
  - Use the appropriate adapter based on your setup, as shown in the usage example:

    ```typescript copy
    import { createLogger, ILogger } from '@quak.lib/bports'

    const gcpLogger: ILogger = createLogger('gcp', { logName: 'logs-name'})
    gcpLogger.warn('Warn log on GCP') // uses your credentials
    ```

## Contributing

Feel free to open issues or submit pull requests to help improve the `bports` library. Any feedback and contributions are welcome!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.