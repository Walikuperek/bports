# Base Errors

Base Errors to create your exception filters :).

## Usage

### Inside your middleware

Use them inside your `middleware` like ExpressJS example below:
> Or just with regular `try catch` blocks inside your code.
```typescript copy filename="/middleware/catch-errors.ts"
import {NextFunction, Request, Response} from 'express';
import {
    BusinessRuleException,
    ConcurrencyException,
    NotFoundException,
    ValidationException
} from '@quak.lib/bports';

export function catchErrorsMiddleware() {
    return (err: Error, req: Request, res: Response, next: NextFunction) => {
        logger.error(err);

        if (err instanceof ValidationException) {
            return res.status(422).json({message: 422 + ' ' + err.message});
        }

        if (err instanceof BusinessRuleException) {
            return res.status(400).json({message: 400 + ' ' + err.message});
        }

        if (err instanceof NotFoundException) {
            return res.status(404).json({message: 404 + ' ' + err.message});
        }

        if (err instanceof ConcurrencyException) {
            return res.status(409).json({message: 409 + ' ' + err.message});
        }

        if (err instanceof Error) {
            return res.status(500).json({message: 500 + ' ' + err.message});
        }

        res.status(500).json({message: 500 + ' ' + 'Unexpected error occurred'});
    };
}

// then use it
app.user(catchErrorsMiddleware());
```

### Catch your business exceptions with it so middleware will work ;)

```typescript copy
class NotEnoughProductsAvailable extends BusinessRuleException {
    constructor(private product: Product, private quantity: number) {
        super(`Not enough products, found only ${product.getActualQuantity()}, and ordered ${quantity}`);
    }
}

class OrderedWrongQuantity extends BusinessRuleException {
    constructor(private quantity: number) {
        super(`Quantity cannot be less than 1, and you ordered ${quantity}`);
    }
}

class SellProductPolitic {
    static isSatisfiedBy(product: Product, quantity: number): boolean {
        if (quantity < 1) {
            throw new OrderedWrongQuantity(quantity);
        }

        if (quantity > product.getActualQuantity()) {
            throw new NotEnoughProductsAvailable(product, quantity);
        }
        return true;
    }
}
```

## Contributing

Contributions and feature requests are welcome! Feel free to create issues or submit pull requests.

## Back to main page

Go back to the [main page](/README.md)