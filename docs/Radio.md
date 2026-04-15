# Radio

A group of mutually exclusive radio buttons. `Radio` is the controlled container; `Radio.Item` renders each option.

## Import

```tsx
import { Radio } from 'altrone-ui';
```

---

## Components

### Radio

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string \| number` | — | **Required.** Currently selected value |
| `onChange` | `(value: string, e: ChangeEvent) => void` | — | **Required.** Called with the selected item's value as a **string** (from `event.currentTarget.value`), even if the item's `value` prop is a number. |
| `children` | `ReactElement<RadioItemProps> \| (ReactElement<RadioItemProps> \| null \| false)[]` | — | **Required.** `Radio.Item` elements |
| `direction` | `'horizontal' \| 'vertical'` | `'horizontal'` | Layout direction of the items |
| `name` | `string` | auto-generated | HTML `name` attribute for the group. Auto-generated with `useId()` if not provided. |
| `disabled` | `boolean` | `false` | Disables all items in the group |
| `ref` | `Ref<HTMLDivElement>` | — | Forwarded ref |

All standard `HTMLAttributes<HTMLDivElement>` are also accepted.

---

### Radio.Item

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string \| number` | — | **Required.** This item's value |
| `children` | `ReactNode` | — | Label text or element. If omitted, renders a radio button with no label. |
| `disabled` | `boolean` | `false` | Disables this specific item. Combined with group-level `disabled`. |
| `ref` | `Ref<HTMLLabelElement>` | — | Forwarded ref |

All standard `LabelHTMLAttributes<HTMLLabelElement>` are also accepted.

---

## Behavior

- `onChange` always receives a **string** value (HTML input constraint) even when the item's `value` prop is a number. Parse with `Number()` if needed.
- The item is keyboard-accessible: `Enter` and `Space` trigger selection.
- Each item renders a visually hidden `<input type="radio">` under the hood.

---

## Examples

### Basic

```tsx
const [gender, setGender] = useState('male');

<Radio value={gender} onChange={(v) => setGender(v)}>
  <Radio.Item value="male">Male</Radio.Item>
  <Radio.Item value="female">Female</Radio.Item>
  <Radio.Item value="other">Other</Radio.Item>
</Radio>
```

### Vertical layout

```tsx
<Radio value={plan} onChange={(v) => setPlan(v)} direction="vertical">
  <Radio.Item value="free">Free — $0/month</Radio.Item>
  <Radio.Item value="pro">Pro — $12/month</Radio.Item>
  <Radio.Item value="enterprise">Enterprise — contact us</Radio.Item>
</Radio>
```

### Disabled group

```tsx
<Radio value="a" onChange={() => {}} disabled>
  <Radio.Item value="a">Option A</Radio.Item>
  <Radio.Item value="b">Option B</Radio.Item>
</Radio>
```

### Partially disabled

```tsx
<Radio value={role} onChange={(v) => setRole(v)}>
  <Radio.Item value="viewer">Viewer</Radio.Item>
  <Radio.Item value="editor">Editor</Radio.Item>
  <Radio.Item value="admin" disabled>Admin (requires approval)</Radio.Item>
</Radio>
```

### Numeric values (parse in onChange)

```tsx
const [qty, setQty] = useState(1);

<Radio value={qty} onChange={(v) => setQty(Number(v))}>
  <Radio.Item value={1}>1</Radio.Item>
  <Radio.Item value={5}>5</Radio.Item>
  <Radio.Item value={10}>10</Radio.Item>
</Radio>
```

### With conditional items

```tsx
<Radio value={size} onChange={(v) => setSize(v)}>
  <Radio.Item value="s">Small</Radio.Item>
  <Radio.Item value="m">Medium</Radio.Item>
  {isPremium && <Radio.Item value="l">Large</Radio.Item>}
  {isPremium && <Radio.Item value="xl">Extra Large</Radio.Item>}
</Radio>
```
