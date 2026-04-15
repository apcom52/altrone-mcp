# Progress

A horizontal progress bar with an accessible `role="progressbar"`. Displays a filled track and a label. The label defaults to `"${percentage}%"` but can be overridden with a string, element, or render function.

## Import

```tsx
import { Progress } from 'altrone-ui';
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | `0` | **Required.** Current progress value |
| `max` | `number` | `100` | **Required.** Maximum value |
| `size` | `'s' \| 'm' \| 'l'` | `'m'` | Bar height |
| `children` | `string \| ReactElement \| ((ctx: ProgressContext) => ReactElement)` | — | Label content. If omitted, defaults to `"${percentage}%"`. Pass a render function to access `value`, `max`, and `percentage`. |
| `activeSegmentClassName` | `string` | — | Extra class name for the filled (active) segment |
| `ref` | `Ref<HTMLDivElement>` | — | Forwarded ref |

All standard `HTMLAttributes<HTMLDivElement>` are also accepted.

### ProgressContext

```ts
type ProgressContext = {
  value: number;      // raw value
  max: number;        // raw max
  percentage: number; // Math.round((value / max) * 100), clamped 0–100
};
```

---

## CSS Custom Properties

Override the bar colors inline via `style`:

| Property | Description |
|----------|-------------|
| `--progress-background-color` | Track (empty) background |
| `--progress-active-background-color` | Filled segment background |
| `--progress-text-color` | Label text color |

---

## Examples

### Default (shows percentage label)

```tsx
<Progress value={60} max={100} />
```

### Custom text label

```tsx
<Progress value={42} max={100}>Uploading files…</Progress>
```

### Render function label

```tsx
<Progress value={42} max={200}>
  {({ value, max, percentage }) => (
    <span>{value} of {max} ({percentage}%)</span>
  )}
</Progress>
```

### Step counter with custom max

```tsx
<Progress value={3} max={8}>
  {({ value, max }) => `Step ${value} of ${max}`}
</Progress>
```

### Sizes

```tsx
<Progress size="s" value={60} max={100}>Small</Progress>
<Progress size="m" value={60} max={100}>Medium</Progress>
<Progress size="l" value={60} max={100}>Large</Progress>
```

### Custom color theme

```tsx
<Progress
  value={70}
  max={100}
  style={{
    '--progress-background-color': 'var(--teal-3)',
    '--progress-active-background-color': 'var(--teal-9)',
    '--progress-text-color': 'var(--teal-12)',
  } as React.CSSProperties}
>
  Teal theme
</Progress>
```

### Upload progress

```tsx
const [uploaded, setUploaded] = useState(0);
const total = file.size;

<Progress value={uploaded} max={total}>
  {({ percentage }) => `${percentage}% uploaded`}
</Progress>
```
