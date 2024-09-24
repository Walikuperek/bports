# Money

- Money `cannot be less than 0`*(will throw ValidationException)* for such case use Dept class.
- Money amount is converted to `bigint`
- Super convenient api `money.toString()` | `money.value` | `money.add(money2)` | etc.

## Usage

```typescript copy
 const plnPrice = 100.00
 const price100pln = new Money(plnPrice, 'PLN')
 const amount = price100pln.value // bigint 10_000
 const label = price100pln.toString() // 100.00 PLN
 price100pln.equals(new Money(100.00, 'PLN')) // true
 const pln200 = price100pln.add(new Money(100.00, 'PLN')) // should be same currency
```

## Contributing

Contributions and feature requests are welcome! Feel free to create issues or submit pull requests.

## Back to main page

Go back to the [main page](/README.md)