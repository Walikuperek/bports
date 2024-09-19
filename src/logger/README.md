# Logger usage

```typescript copy
import { createLogger, ILogger } from '@quak.lib/bports/http';

// No need to install anything
const logger: ILogger = createLogger({type: 'console'});
const fileLogger: ILogger = createLogger({type: 'file', logFileName: 'filename.log'});

// run `npm i @google-cloud/logging` to install deps
const gcpLogger: ILogger = createLogger({type: 'gcp', logName: 'my-log'});
```
