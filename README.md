# bports

*Quick example:*
```typescript copy
import { createHttp, createLogger, ILogger, IHttp } from '@quak.lib/bports'

const logger: ILogger = createLogger({type: 'console'})
logger.log('Regular log')
logger.info('Info log')

// throws Error if not installed deps; 'Please run `npm install axios` to use AxiosHttpClientAdapter'
const http: IHttp = createHttp({type: 'axios', baseUrl: 'localhost:3000/api'})
const users = await http.get('/users')
```

## Description

**`bports`** is a modular library that provides ports (interfaces) and adapters for commonly used services like logging and HTTP handling, allowing users to swap implementations easily without changing the application code. The main goal is to keep the API stable, preventing breaking changes while offering flexibility in choosing dependencies.

## Features

- **Modularity:** Use only the adapters you need, no extra dependencies.
- **Ports and Adapters:** Predefined interfaces for key services (e.g., loggers).
- **Optional Peer Dependencies:** You install only the necessary peer dependencies for the adapters you want to use.

## Table of Contents

1. [Installation](#installation)
2. [Supported Ports](#supported-ports)
3. [Dependency Configuration](#dependency-configuration)

## Installation

Install the core library:

```bash
npm install bports
```

Then install any adapter you want to use. For example, to use the GCP Logger adapter:

```bash
npm install @google-cloud/logging
```

## Supported Ports
- IHttp - Interface for handling HTTP requests.
- ILogger - Interface for logging information.

### Unprepared
> 🚧 Under construction, building modules and preparation to publish on NPM.
- IDatabaseConnection - Interface for database connections.
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

For adapters that require additional libraries (like `winston` for file logging or `@google-cloud/logging` for GCP logging), the dependencies are optional peer dependencies. This means you can install them only if you're using the respective adapter.

### Steps for Setting Up Peer Dependencies

1. **Install the core `bports` library:**
  - Install library
    ```bash
    npm install bports
    ```

2. **Install the desired adapter's peer dependencies:**
  - For GCP Logger:
    > Will yell at you with an error if not installed: 'Please run `npm install @google-cloud/logging` to use GCPLoggerAdapter'
    ```bash
    npm install @google-cloud/logging
    ```

3. **Configure the adapter in your project:**
  - Use the appropriate adapter based on your setup, as shown in the usage examples.

    ```typescript copy
    import { createLogger, ILogger } from 'bports'

    const logger = createLogger({type: 'console'})
    logger.log('Regular log')
    logger.info('Info log')

    const gcpLogger = createLogger({type: 'gcp', logName: 'logs-name'})
    gcpLogger.warn('Info log on GCP') // uses your credentials
    ```

---

## Contributing

Feel free to open issues or submit pull requests to help improve the `bports` library. Any feedback and contributions are welcome!

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

By following these steps, users can flexibly choose which adapters to use and only install the necessary dependencies, keeping their applications lightweight and modular.