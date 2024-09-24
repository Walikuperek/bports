# CQRS

## Usage

### Bus flow

```typescript copy
type Queries = GetProductsQuery;
type Commands = CreateOrderCommand | CreateProductCommand | IncreaseStockCommand | SellProductCommand;
type DomainEvents = StockIncreasedEvent;

const {QueryBus, CommandBus, EventBus} = init<
    Queries,
    Commands,
    DomainEvents
>();

const products = await QueryBus.execute(new GetProductsQuery())
CommandBus.publish(new IncreaseStockCommand())
```

### Command/Event & Query flows

#### Increase Stock Command flow
```typescript copy
// 1. register command
onMsg(CommandBus, 'IncreaseStockCommand', IncreaseStockHandler, productRepository);

// 2. get request
const increaseStock = async (req: Request, res: Response, next: NextFunction) => {
    // try
    const {quantity} = req.body;
    const {productId} = req.params;
    CommandBus.publish(new IncreaseStockCommand({productId, quantity}));
    res.status(204).json({message: 'Product stock increased'});
    // catch next(err) -> catched by middleware
}

// 3. with payload 
interface IncreaseStockPayload {
    productId: string;
    quantity: number;
}

// 4. encapsulated as a command
class IncreaseStockCommand implements Command<IncreaseStockPayload> {
    type = 'IncreaseStockCommand';
    constructor(public payload: IncreaseStockPayload, public createdAt = new Date()) {}
}

// 5. that is handled by
class IncreaseStockHandler {
    constructor(private productRepository: ProductRepository) {}

    async execute(command: IncreaseStockCommand): Promise<void> {
        const { productId, quantity } = command.payload;
        const product = await this.productRepository.getById(productId);
        product.restock(quantity);
        await this.productRepository.save(product);
    }
}
```

#### Get all products Query flow

```typescript copy
// 1. register query
onQ(QueryBus, 'GetProductsQuery', GetProductsHandler, productRepository);

// 2. encapsulated as
class GetProductsQuery implements Query<{}> {
    type = 'GetProductsQuery';
    constructor(public payload = {}, public createdAt = new Date()) {}
}
// 3. handled by QueryHandler
// rest of the class ...
async execute(query: GetProductsQuery): Promise<Product[]> {
    return await this.productRepository.retrieveAll();
}

// GET endpoint
const query = new GetProductsQuery()
const products = await QueryBus.execute(query)
res.status(200).json(products)
```

## Contributing

Contributions and feature requests are welcome! Feel free to create issues or submit pull requests.

## Back to main page

Go back to the [main page](/README.md)