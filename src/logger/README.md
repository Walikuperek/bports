# Logger

This project provides an abstract `ILogger` interface and a factory function to create different types of loggers based on configuration. The goal is to provide flexibility in choosing or switching between logging implementations without changing the application code.

## Table of Contents
- [Logger](#logger)
  - [Table of Contents](#table-of-contents)
  - [Usage](#usage)
    - [Dependency Injection Example](#dependency-injection-example)
  - [Logger Types](#logger-types)
  - [Example Configurations](#example-configurations)
  - [API](#api)
    - [`log(message: string): void`](#logmessage-string-void)
    - [`info(message: string): void`](#infomessage-string-void)
    - [`warn(message: string): void`](#warnmessage-string-void)
    - [`error(message: string): void`](#errormessage-string-void)
  - [Contributing](#contributing)
  - [Back to main page](#back-to-main-page)

## Usage

Use the `createLogger` factory function to instantiate a logger based on a configuration object. Each configuration type corresponds to a specific logger implementation.

```typescript
import { createLogger } from './logger.factory';

const logger = createLogger('console');
const fileLogger = createLogger('file', { logFileName: 'app.log' });
const googleCloudLogger = createLogger('gcp', { logName: 'app-logs' }); // uses your creds

logger.log('Info log in console');
logger.info('Info log in console');
fileLogger.warn('Warn log appended to file');
googleCloudLogger.error('Error log showed inside GCP logging');
```

### Dependency Injection Example

The logger can be injected into any part of your application for centralized logging.

```typescript
class App {
    constructor(private logger: ILogger) {}

    run() {
        this.logger.log('App is running');
    }
}

const app = new App(createLogger('file', { logFileName: 'app.log' }));
app.run();
```

## Logger Types

- **Console Logger**: Outputs logs to the console (`type: 'console'`).
- **File Logger**: Saves logs to a file (`type: 'file'`, requires `logFileName`).
- **GCP Logger**: Sends logs to Google Cloud Platform (`type: 'gcp'`, requires `logName`).

## Example Configurations

- **Console Logger**:
    ```typescript
    'console'
    ```

- **File Logger**:
    ```typescript
    'file', { logFileName: 'app.log' }
    ```

- **GCP Logger**:
    ```typescript
    'gcp', { logName: 'gcp-log-name' }
    ```

## API

The `ILogger` interface provides a set of methods for logging messages at different levels of importance. These methods can be implemented using various logging libraries or custom logging strategies. Below are the details of each method:

### `log(message: string): void`
- **Description**: General logging method for any type of message. This method can be used for non-critical information or when you don't need a specific log level.
- **Parameters**:
  - `message`: The log message that will be recorded.
  
### `info(message: string): void`
- **Description**: Logs informational messages. Typically used for tracking the flow of the application and its general state.
- **Parameters**:
  - `message`: The informational message to log.
  
### `warn(message: string): void`
- **Description**: Logs warning messages. Useful for highlighting potentially problematic situations that do not necessarily stop the application from running.
- **Parameters**:
  - `message`: The warning message to log.

### `error(message: string): void`
- **Description**: Logs error messages. This method is used for recording errors, exceptions, or critical issues that may cause application failures or disruptions.
- **Parameters**:
  - `message`: The error message or details of the exception to log.

Each method accepts a `message` parameter of type `string` and is designed to support various logging strategies, such as writing to the console, a file, or a remote logging service. The specific behavior of these methods will depend on the implementation of the `ILogger` interface.

## Contributing

Contributions and feature requests are welcome! Feel free to create issues or submit pull requests.

## Back to main page

Go back to the [main page](/README.md)