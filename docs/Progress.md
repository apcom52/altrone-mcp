# Progress

A horizontal progress bar with an accessible `role="progressbar"` (`aria-valuenow` / `aria-valuemin` / `aria-valuemax`). Displays a filled track and a label. The label defaults to `"${percentage}%"` but can be overridden with a string, node, or render function.

Fully controlled — it renders whatever `value` it's given. The fill ratio is `(value - min) / (max - min)`, clamped to 0–100%; `aria-valuenow` is clamped into `[min, max]`.

The track is a `Box` (`shape="pill"`, `material="glass"`, `tone="neutral"`), so the pill radius and the frosted track background come from the shared Box system. The active fill and label colours remain Progress's own, themeable via the `--progress-*` custom properties below.

## Import

```tsx
import { Progress } from 'altrone-ui';
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `min` | `number` | `0` | Lower bound of the range. Feeds `aria-valuemin`. |
| `value` | `number` | `0` | Current progress value |
| `max` | `number` | `100` | Upper bound of the range. Feeds `aria-valuemax`. |
| `size` | `'mini' \| 's' \| 'm' \| 'l' \| 'xl'` | `'m'` | Bar height + label type size |
| `label` | `ReactNode \| ((ctx: ProgressContext) => ReactNode)` | — | Label content. If omitted, defaults to `"${percentage}%"`. A render function receives `{ value, min, max, percentage }`. A non-string label carries no accessible name — pass `aria-label` alongside it. |
| `activeClassName` | `string` | — | Extra class name for the filled (active) segment |
| `activeStyle` | `CSSProperties` | — | Inline styles for the filled (active) segment |
| `ref` | `Ref<HTMLDivElement>` | — | Forwarded ref |

All standard `HTMLAttributes<HTMLDivElement>` are also accepted (a plain-string `label` is also copied to `aria-label` unless you pass your own). `children` is not used by `Progress`.

### ProgressContext

```ts
type ProgressContext = {
  value: number; // raw value
  min: number; // raw min
  max: number; // raw max
  percentage: number; // round((value - min) / (max - min) * 100), clamped 0–100
};
```

---

## CSS Custom Properties

Override the bar colors inline via `style`:

| Property | Description |
|----------|-------------|
| `--progress-active-background-color` | Filled segment background |
| `--progress-text-color` | Label text color |

The empty track background is the `Box`'s neutral `glass` fill and is not exposed as a `--progress-*` property.

---

## Examples

### Default (shows percentage label)

```tsx
<Progress value={60} max={100} />
```

### Custom text label

```tsx
<Progress value={42} max={100} label="Uploading files…" />
```

### Render function label

```tsx
<Progress
  value={42}
  max={200}
  label={({ value, max, percentage }) => (
    <span>{value} of {max} ({percentage}%)</span>
  )}
/>
```

### Step counter with custom max

```tsx
<Progress
  value={3}
  max={8}
  aria-label="Step 3 of 8"
  label={({ value, max }) => `Step ${value} of ${max}`}
/>
```

### Non-zero min

```tsx
<Progress
  value={140}
  min={100}
  max={200}
  aria-label="Temperature"
  label={({ value }) => `${value}°`}
/>
```

### Sizes

```tsx
<Progress size="mini" value={60} />
<Progress size="s" value={60} />
<Progress size="m" value={60} />
<Progress size="l" value={60} />
<Progress size="xl" value={60} />
```

### Custom color theme

```tsx
<Progress
  value={70}
  max={100}
  style={{
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
