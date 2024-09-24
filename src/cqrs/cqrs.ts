import {ValidationException} from '../base-errors';

/*
                                   API
                                  ,;;;,
             CQRS               ,;;;;;;;,
             .;;;,            ,;;;;;;;;;;;,
            .;;%%;;;,        ,;;;;;;;;;;;;;,
            ;;%%%%%;;;;,.    ;;;;;;;;;;;;;;;
            ;;%%%%%%%%;;;;;, ;;;;;;;;;;;;;;;
            `;;%%%%%%%%%;;;;;,;;;;;;;;;;;;;'
             `;;%%%%%%%%%%;;;;,;;;;;;;;;;;'
               `;;;%%%%%%%%;;;;,;;;;;;;;;'
                  `;;;%%%%%%;;;;.;;;.;;;
                     `;;;%%%;;;;;;.;;;,; .,;;'
                         `;;;;;;;;;;,;;;;;;'.,;;;,
                          ;;;;;;;;;;;;;;;;;;;;;,.
          .          ..,,;;;;;......;;;;;;;.... ';
          ;;,..,;;;;;;;;;;;;..;;;;;;..;;;;.;;;;;.
           ';;;;;;;;;;;;;;..;;;a@@@@a;;;;;;;a@@@@a,
        .,;;;;;;;;;;;;;;;.;;;a@@@@@@@@;;;;;,@@@@@@@a,
      .;;;,;;;;;;;;;;;;;;;;;@@@@@'  @@;;;;;;,@  `@@@@;,
     ;' ,;;;,;;;;;;;;;;;;;;;@@@@@aa@@;;;;,;;;,@aa@@@@;;;,.,;
       ;;;,;;;;;;;;;;;;;;;;;;@@@@@@@;;;,;a@@'      `;;;;;;;'
       ' ;;;,;;;;;;;;;;;;;;;;;;;;;;;;,;a@@@       #  ;;,;;,
.//////,,;,;;;;;;;;;;;;;;;,;;;;;;;;,;;a@@@a,        ,a;;;,;;,
%,/////,;;;;;;;;;;;;;;;;;;;;,;,;,;;;;a@@@@@@aaaaaaa@@@;;;;;';
`%%%%,/,;;;;;;;;;;;;;;;;;;;;;;;;;;;;;@@@@@@@@@@@;00@@;;;;;'
  %%%%%%,;;;;;;;;;;;;;;;;;;;;;;;;;;;a@@@@@@@@@@;00@@;;;;;'
   `%%%%%%%%%%,;;;;;;;;;;;;;;;;;;;;a@@@@@@@@@;00@@;;;;;'
     `%%%%%%%%%%%%%%%,::::;;;;;;;;a@@@@@@@;00@@@::;;;%%%%%,
       `%%%%%%%%%%%%%%%,::::;;;;;@@@@@@' 0@@@@::;;%%%%%%%%'
          Oo%%%%%%%%%%%%,::::;;a@@@@@'  ,@@@::;;%%%%%%%'
           `OOo%%%%%%%%%%,::::@@@@@'    @@;::;%%%%%%'
             `OOOo%%%%%%%%,:::@@@@,;;;,a@:;;%%%%%'
               `OOOOOo%%%%%,:::@@@aaaa@';;%%%%'
                  `OOOO;@@@@@@@@aa@@@@@@@@@'
                      ;@@@@@@@@@@@@@@@@@@@'
                       @@@@@@@@'`@@@@@@@@'
                       `@@@@@'    @@@@@'
                        `@@'       @@'
                             BELOW
                              \/
                              `*
 */

// default any for end-users simplicity
interface Message<T = any> {
    type: string;
    createdAt: Date; // timestamp
    payload?: T;
    version?: number; // for eventual API updates
}
export interface Query<T = any> extends Message<T> {}
export interface Command<T = any> extends Message<T> {}
export interface DomainEvent<T = any> extends Message<T> {}

/**
 * @example
 *  const {QueryBus, CommandBus, EventBus} = init<GetProductsQ, InsertProductCmd, InsertedProductE | DeletedProductE>()
 *  const products = await QueryBus.query(new GetProductsQ())
 *  CommandBus.publish(new InsertProductCmd({name, desc, price})) // eventsBus has the same API
 */
export const init = <
    Queries extends Query,
    Commands extends Command,
    Events extends DomainEvent
>() => ({
    QueryBus: new QueryBus<Queries>(),
    CommandBus: new RxBus<Commands>(),
    EventBus: new RxBus<Events>()
});

/**
 * Use for commands and events.
 * @example
 *  // add deps IN ORDER if needed by comma, ... productRepository, orderRepository, etc.
 *  onMsg(CommandBus, 'CreateProductCommand', CreateProductHandler, productRepository)
*/
export const onMsg = (bus: RxBus<any>, type: string, handler: any, ...deps: any[]) => {
    const message = new handler(...deps);
    bus.onMessage(type).subscribe(message.execute.bind(message));
};

/**
 * Use for queries.
 * @example
 *  // add deps IN ORDER if needed by comma, ... productRepository, orderRepository, etc.
 *  onQ(QueryBus, 'GetProductsQuery', GetProductsHandler, productRepository)
*/
export const onQ = (bus: QueryBus<any>, type: string, handler: any, ...deps: any[]) => {
    const query = new handler(...deps);
    bus.register(type, query.execute.bind(query));
};

// Temporal Dead Zone
export class RxBus<T extends Message> {
    private subject: any & {pipe: Function, next: Function};
    private ObservableType: any;
    private readonly filterFn: any;

    constructor() {
        try {
            const {Subject, Observable} = require('rxjs');
            const {filter} = require('rxjs/operators');
            this.subject = new Subject();
            this.filterFn = filter;
            this.ObservableType = Observable;
        } catch (e) {
            throw new Error('Please run `npm install rxjs` to use RxBus');
        }
    }

    publish(message: T): void {
        this.subject.next(message);
    }

    onMessage<MsgOfFilteredType>(type: string): typeof this.ObservableType {
        return this.subject.pipe(
            this.filterFn((message: any) => message.type === type)
        ) as MsgOfFilteredType;
    }
}

export class QueryBus<T extends Query<T>> {
    private handlers: { [key: string]: Function } = {};

    register(type: string, handler: Function): void {
        this.handlers[type] = handler;
    }

    async execute<R>(query: T): Promise<R> {
        const handler = this.handlers[query.type];
        if (!handler) {
            throw new ValidationException(`No handler registered for query: ${query.type}`);
        }
        return handler(query);
    }
}
