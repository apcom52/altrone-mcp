# NumberInput

A numeric text input with locale-aware formatting (grouping and decimal separators) and silent `min`/`max` clamping. Built on `react-number-format` (`NumericFormat`). Reads `name`, `disabled`, `invalid`, and `size` from `FormFieldContext` when used inside a `Form`.

## Import

```tsx
import { NumberInput } from 'altrone-ui';
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | — | Controlled value. `undefined` renders an empty input. |
| `defaultValue` | `string \| number` | — | Initial value passed to the formatter. Narrower than the native `defaultValue` (no string arrays). |
| `onChange` | `(value?: number, event?: SyntheticEvent<HTMLInputElement>) => void` | — | Called with the parsed number. If there is nothing to parse (an empty field), `0` is passed instead. |
| `min` | `number` | `0` | Minimum allowed value — values below it are refused as you type |
| `max` | `number` | — | Maximum allowed value — values above it are refused as you type |
| `digitsAfterPoint` | `number` | `2` | Number of decimal places |
| `fixedDecimalScale` | `boolean` | `false` | Pad the decimals to `digitsAfterPoint` (e.g. `5` → `5.00`) |
| `groupingDelimiter` | `string` | `' '` | Thousands separator character |
| `decimalDelimiter` | `string` | `'.'` | Decimal separator character |
| `allowNegative` | `boolean` | `false` | Allow a leading minus sign |
| `disabled` | `boolean` | `false` | Disables the input. Also inherited from `FormFieldContext`. |
| `invalid` | `boolean` | `false` | Error state styling. Also inherited from `FormFieldContext`. |
| `size` | `Size` | `'m'` | Input size. Also inherited from `FormFieldContext`. |
| `name` | `string` | — | Input name. Also inherited from `FormFieldContext`. |
| `placeholder` | `string` | — | Placeholder text |
| `readOnly` | `boolean` | — | Makes the input read-only |
| `ref` | `Ref<HTMLElement>` | — | Forwarded to the visual wrapper |
| `inputRef` | `Ref<HTMLInputElement>` | — | Forwarded to the underlying `<input>` |

All other `TextInputProps` are also accepted. There are no spinner buttons — stepping a value up and down by one is a niche interaction with a tiny hit target; type the value, or compose an explicit `[−]/[+]` stepper with `TextInput.ActionIsland` where it genuinely helps.

> **Note:** `min` defaults to `0` and `allowNegative` to `false`. To accept values below zero, pass `allowNegative` together with a negative `min`.

---

## Examples

### Basic

```tsx
const [qty, setQty] = useState(1);
<NumberInput value={qty} onChange={(v) => setQty(v)} />
```

### Integer values

```tsx
<NumberInput
  value={count}
  onChange={(v) => setCount(v)}
  digitsAfterPoint={0}
  min={0}
  max={100}
/>
```

### Currency

```tsx
<NumberInput
  value={price}
  onChange={(v) => setPrice(v)}
  digitsAfterPoint={2}
  groupingDelimiter=","
  min={0}
/>
```

### Negative values allowed

```tsx
<NumberInput
  allowNegative
  value={temperature}
  onChange={(v) => setTemperature(v)}
  min={-273}
  max={1000}
  digitsAfterPoint={1}
/>
```

### Fixed decimal scale

```tsx
<NumberInput
  value={amount}
  onChange={(v) => setAmount(v)}
  digitsAfterPoint={2}
  fixedDecimalScale
  groupingDelimiter=","
/>
```

### Inside a Form

When placed inside a `Form.Field`, the `name`, `disabled`, `invalid`, and `size` props are injected automatically via context.

```tsx
<Form>
  <Form.Field name="quantity" label="Quantity">
    <NumberInput
      value={form.quantity}
      onChange={(v) => setForm({ ...form, quantity: v })}
      min={1}
      digitsAfterPoint={0}
    />
  </Form.Field>
</Form>
```

### Placeholder for empty state

```tsx
<NumberInput
  value={undefined}
  onChange={(v) => setAmount(v)}
  placeholder="Enter amount"
/>
```
