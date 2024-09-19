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
import { createLogger, LoggerConfig } from './logger.factory';

const config: LoggerConfig = { type: 'console' };
const logger = createLogger(config);

logger.info('This is an info message');
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

const app = new App(createLogger({ type: 'file', logFileName: 'app.log' }));
app.run();
```

## Logger Types

- **Console Logger**: Outputs logs to the console (`type: 'console'` or `type: 'native'`).
- **File Logger**: Saves logs to a file (`type: 'file'`, requires `logFileName`).
- **GCP Logger**: Sends logs to Google Cloud Platform (`type: 'gcp'`, requires `logName`).

## Example Configurations

- **Console Logger**:
    ```typescript
    { type: 'console' }
    ```

- **File Logger**:
    ```typescript
    { type: 'file', logFileName: 'app.log' }
    ```

- **GCP Logger**:
    ```typescript
    { type: 'gcp', logName: 'gcp-log-name' }
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