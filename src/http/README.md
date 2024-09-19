# Http

This project provides an abstract `IHttp` interface and a factory function for creating different HTTP client implementations. The aim is to abstract away the underlying HTTP libraries and allow easy switching between them without modifying the core application logic.

## Table of Contents
- [Http](#http)
  - [Table of Contents](#table-of-contents)
  - [Usage](#usage)
  - [HTTP Client Types](#http-client-types)
  - [Example Configurations](#example-configurations)
  - [API](#api)
    - [`get<T>(url: string, headers?: Record<string, string>): Promise<T>`](#getturl-string-headers-recordstring-string-promiset)
    - [`post<T>(url: string, data: any, headers?: Record<string, string>): Promise<T>`](#postturl-string-data-any-headers-recordstring-string-promiset)
    - [`put<T>(url: string, data: any, headers?: Record<string, string>): Promise<T>`](#putturl-string-data-any-headers-recordstring-string-promiset)
    - [`delete<T>(url: string, headers?: Record<string, string>): Promise<T>`](#deleteturl-string-headers-recordstring-string-promiset)
  - [Contributing](#contributing)
  - [Back to main page](#back-to-main-page)

## Usage

Use the `createHttp` factory function to create an HTTP client based on a configuration object. Each configuration type corresponds to a specific HTTP client implementation.

```typescript
import { createHttp } from './http.factory';

const http = createHttp({ type: 'axios', baseUrl: 'https://api.example.com' });

http.get('/endpoint')
    .then(response => console.log(response))
    .catch(error => console.error(error));
```

### Dependency Injection Example

Port can be injected into any part of your application.

```typescript
class App {
    user = null
  
    constructor(private http: IHttp, private logger: ILogger) {
        this.fetchUser()
            .then(user => this.user = user)
            .catch(e => this.logger.error(e))
    }

    async fetchUser() {
        return this.http.get('localhost:3000/api/user') 
    }
}

const app = new App(
    createHttp({ type: 'axios' }),
    createLogger({ type: 'file', logFileName: 'app.log' })
);
app.run();
```

## HTTP Client Types

- **Axios HTTP Client**: Uses the popular `axios` library for making HTTP requests. (`type: 'axios'`, optional `baseUrl`).
- **Native Node.js HTTP Client**: Uses Node.js native HTTP/HTTPS modules. (`type: 'native'` or `type: 'node'`).

## Example Configurations

- **Axios HTTP Client**:
    ```typescript
    { type: 'axios', baseUrl: 'https://api.example.com' }
    ```

- **Native Node.js HTTP Client**:
    ```typescript
    { type: 'native' }
    ```

## API

The `IHttp` interface provides a set of methods for making HTTP requests. Each method returns a `Promise<T>`, where `T` is the expected response type. Below are the details of each method:

### `get<T>(url: string, headers?: Record<string, string>): Promise<T>`
- **Description**: Sends an HTTP `GET` request to the specified URL.
- **Parameters**:
  - `url`: The URL to which the GET request will be sent.
  - `headers` (optional): A record of additional headers to include in the request.
- **Returns**: A `Promise` that resolves with the response of type `T`.

### `post<T>(url: string, data: any, headers?: Record<string, string>): Promise<T>`
- **Description**: Sends an HTTP `POST` request to the specified URL with the provided data.
- **Parameters**:
  - `url`: The URL to which the POST request will be sent.
  - `data`: The body data to be included in the request.
  - `headers` (optional): A record of additional headers to include in the request.
- **Returns**: A `Promise` that resolves with the response of type `T`.

### `put<T>(url: string, data: any, headers?: Record<string, string>): Promise<T>`
- **Description**: Sends an HTTP `PUT` request to update a resource at the specified URL with the provided data.
- **Parameters**:
  - `url`: The URL where the resource will be updated.
  - `data`: The body data to be included in the request.
  - `headers` (optional): A record of additional headers to include in the request.
- **Returns**: A `Promise` that resolves with the response of type `T`.

### `delete<T>(url: string, headers?: Record<string, string>): Promise<T>`
- **Description**: Sends an HTTP `DELETE` request to the specified URL to delete a resource.
- **Parameters**:
  - `url`: The URL from which the resource will be deleted.
  - `headers` (optional): A record of additional headers to include in the request.
- **Returns**: A `Promise` that resolves with the response of type `T`.

Each method allows for making asynchronous HTTP requests, handling both the response and potential errors via the `Promise` interface.

## Contributing

Contributions and feedback are welcome! Feel free to submit issues or pull requests.

## Back to main page

Go back to the [main page](/README.md)