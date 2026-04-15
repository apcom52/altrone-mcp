# Checkbox

A controlled checkbox with label support, indeterminate state, danger styling, and full keyboard accessibility. Renders a `<label>` wrapping a hidden `<input type="checkbox">` and a custom visual indicator.

## Import

```tsx
import { Checkbox } from 'altrone-ui';
```

---

## Key behaviors

- **Controlled only** — always pass `checked` and `onChange` together.
- **`onChange` signature is inverted** — receives the *next* state (`!checked`), not a DOM event: `onChange(nextChecked: boolean, event: ChangeEvent)`.
- **Keyboard accessible** — the root `<label>` has `tabIndex={0}`; pressing `Enter` or `Space` triggers the hidden `<input>`.
- **Indeterminate** — when `indeterminate={true}` the visual indicator shows a dash instead of a checkmark. The underlying `<input>` remains `checked={false}` regardless.

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | `false` | Checked state |
| `onChange` | `(nextChecked: boolean, event: ChangeEvent) => void` | — | Called with the **next** state when the user toggles. |
| `indeterminate` | `boolean` | `false` | Shows a dash (−) indicator. Used for "select all" checkboxes when only some children are checked. Does not affect the underlying `checked` value. |
| `danger` | `boolean` | `false` | Applies danger (red) color treatment |
| `disabled` | `boolean` | `false` | Disables the checkbox |
| `name` | `string` | — | `name` attribute on the hidden `<input>`. Required for form submission. |
| `children` | `ReactNode` | — | Label content rendered to the right of the indicator. Accepts text or any React node. |
| `ref` | `Ref<HTMLLabelElement>` | — | Forwarded ref to the root `<label>` |

All standard `LabelHTMLAttributes<HTMLLabelElement>` are also accepted, except `onChange` (which is replaced with the typed version above).

---

## Examples

### Basic

```tsx
const [checked, setChecked] = useState(false);

<Checkbox checked={checked} onChange={setChecked}>
  Accept terms
</Checkbox>
```

### Without label text

```tsx
<Checkbox checked={checked} onChange={setChecked} />
```

### Danger

```tsx
<Checkbox checked={checked} onChange={setChecked} danger>
  Delete all records
</Checkbox>
```

### Disabled

```tsx
<Checkbox disabled>Unavailable option</Checkbox>
<Checkbox checked disabled>Locked selection</Checkbox>
```

### Indeterminate — "select all" pattern

When some but not all children are checked, show the parent as indeterminate.

```tsx
const [items, setItems] = useState([false, false, false]);

const allChecked = items.every(Boolean);
const someChecked = items.some(Boolean);

const toggleAll = (next: boolean) => setItems(items.map(() => next));
const toggleItem = (index: number, next: boolean) =>
  setItems(items.map((v, i) => (i === index ? next : v)));

<Checkbox
  checked={allChecked}
  indeterminate={someChecked && !allChecked}
  onChange={toggleAll}
>
  All actions
</Checkbox>

<Checkbox checked={items[0]} onChange={(v) => toggleItem(0, v)}>Read</Checkbox>
<Checkbox checked={items[1]} onChange={(v) => toggleItem(1, v)}>Write</Checkbox>
<Checkbox checked={items[2]} onChange={(v) => toggleItem(2, v)} danger>Delete</Checkbox>
```

### In a form

```tsx
<form onSubmit={handleSubmit}>
  <Checkbox name="newsletter" checked={newsletter} onChange={setNewsletter}>
    Subscribe to newsletter
  </Checkbox>
  <Checkbox name="terms" checked={terms} onChange={setTerms}>
    I agree to the terms of service
  </Checkbox>
  <button type="submit">Register</button>
</form>
```

---

## onChange vs native input

The `onChange` callback receives `(!checked, event)` — not `event.target.checked`. This means you can pass a `useState` setter directly:

```tsx
// ✓ Works — setter receives the next boolean value
<Checkbox checked={value} onChange={setValue}>Label</Checkbox>

// ✗ Wrong — this would pass the ChangeEvent to setValue
<Checkbox checked={value} onChange={(e) => setValue(e)} />
```
