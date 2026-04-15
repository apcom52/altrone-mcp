# NumberInput

A numeric text input with optional increment/decrement spinner buttons. Built on `react-number-format` (`NumericFormat`). Reads `name`, `disabled`, `invalid`, and `size` from `FormFieldContext` when used inside a `Form`.

## Import

```tsx
import { NumberInput } from 'altrone-ui';
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number \| null` | — | Controlled value. `null` renders an empty input. |
| `onChange` | `(value: number, event: SyntheticEvent) => void` | — | Called with the parsed float value. If the parsed value is `NaN`, `0` is passed instead. |
| `min` | `number` | `0` | Minimum allowed value (enforced by the spinner buttons) |
| `max` | `number` | — | Maximum allowed value (enforced by the spinner buttons) |
| `digitsAfterPoint` | `number` | `2` | Number of decimal places |
| `groupingDelimiter` | `string` | `' '` | Thousands separator character |
| `showControls` | `boolean` | `true` | Whether to show the +/− spinner buttons |
| `disabled` | `boolean` | `false` | Disables the input. Also inherited from `FormFieldContext`. |
| `invalid` | `boolean` | `false` | Error state styling. Also inherited from `FormFieldContext`. |
| `size` | `Size` | `'m'` | Input size. Also inherited from `FormFieldContext`. |
| `name` | `string` | — | Input name. Also inherited from `FormFieldContext`. |
| `placeholder` | `string` | — | Placeholder text |
| `readOnly` | `boolean` | — | Makes the input read-only |
| `ref` | `Ref<HTMLInputElement>` | — | Forwarded ref |

All other `TextInputProps` are also accepted.

> **Note:** The `min` prop defaults to `0`. Set `min` to `undefined` or a negative number if you need to accept values below zero.

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
  value={temperature}
  onChange={(v) => setTemperature(v)}
  min={-273}
  max={1000}
  digitsAfterPoint={1}
/>
```

### Without spinner controls

```tsx
<NumberInput
  value={value}
  onChange={(v) => setValue(v)}
  showControls={false}
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
  value={null}
  onChange={(v) => setAmount(v)}
  placeholder="Enter amount"
/>
```
