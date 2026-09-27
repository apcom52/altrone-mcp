# Loading

An SVG circular spinner for an in-progress operation. Renders a `<div role="status">` wrapper with a localized `aria-label` ("Loading") around the SVG (which is `aria-hidden`). Keeps spinning under `prefers-reduced-motion` — it's a functional state indicator, not decorative motion.

Pass `value` (0–100) to switch it into a determinate circular progress indicator: the spin/stretch animations stop, the arc is drawn from 12 o'clock for the given percentage, and the wrapper becomes `role="progressbar"` with `aria-valuenow`/`aria-valuemin`/`aria-valuemax`.

## Import

```tsx
import { Loading } from 'altrone-ui';
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `number \| string` | `'24px'` | Diameter — a number of px or a px string. |
| `strokeWidth` | `number \| string` | `'2'` | Ring thickness, in the same units as `size`. Fractions (`1.5`) are fine. |
| `color` | `string` | `var(--loading-color)` | Stroke colour. Any CSS colour, or `currentColor`. |
| `value` | `number` | — | Progress percentage (0–100). When set, renders a determinate `role="progressbar"` arc instead of an indeterminate spinner. Values outside 0–100 are clamped. |
| `aria-label` | `string` | localized `"Loading"` | Override to say what's loading. |
| `ref` | `Ref<HTMLDivElement>` | — | Forwarded to the `<div>` wrapper |

All standard `HTMLAttributes<HTMLDivElement>` are also accepted.

> **Note:** The SVG radius is `size / 2 − strokeWidth / 2`, so the stroke stays inside the bounding box regardless of thickness. A faint full-circle track sits behind the animated sweep.

---

## Examples

### Default

```tsx
<Loading />
```

### Custom size

```tsx
<Loading size="48px" />
<Loading size="16px" />
<Loading size={32} />
```

### Custom color

```tsx
<Loading color="var(--blue-9)" />
<Loading color="#ff4d4f" />
<Loading color="currentColor" />
```

### Thicker stroke

```tsx
<Loading size="32px" strokeWidth="4" />
```

### Centered in a container

```tsx
<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 200 }}>
  <Loading size="40px" />
</div>
```

### Inline with text

```tsx
<Flex gap="xs" align="center">
  <Loading size="16px" />
  <span>Saving…</span>
</Flex>
```

### Determinate progress

```tsx
<Loading value={25} />
<Loading value={60} strokeWidth="3" />
<Loading value={progress} size={48} strokeWidth="4" />
```

### Inside a button (manual usage)

For loading buttons, use `Button` with `state="loading"` — it shows `Loading` internally. Use `Loading` directly only when you need a standalone spinner outside a `Button`.

```tsx
<Button label="Save" state="loading" />
```
