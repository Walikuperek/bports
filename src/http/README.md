# Http usage

```typescript copy
import { createHttp, IHttpClient } from '@quak.lib/bports/http';

// Create http client with Axios adapter
const axiosClient: IHttpClient = createHttp({type: 'axios', baseUrl: 'https://api.example.com'});
const nativeHttpClient: IHttpClient = createHttp({type: 'node'}); // native node http

const response = await axiosClient.get('/data') // put full url if baseUrl omitted
const users = await nativeHttpClient.get('localhost:3000/api/users')
```
