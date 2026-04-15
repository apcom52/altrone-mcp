# Loading

An SVG circular spinner. Use to indicate an in-progress operation.

## Import

```tsx
import { Loading } from 'altrone-ui';
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `string` | `'24px'` | Diameter of the spinner. Must include a CSS unit (e.g. `'24px'`, `'2rem'`). |
| `strokeWidth` | `string` | `'2'` | Width of the circular stroke. Unitless number as string. |
| `color` | `string` | `var(--loadingColor)` | Stroke color. Any valid CSS color value. |
| `ref` | `Ref<SVGSVGElement>` | — | Forwarded ref |

All standard `SVGAttributes<SVGSVGElement>` are also accepted.

> **Note:** The SVG radius is calculated automatically as `size / 2 − strokeWidth / 2`, so the stroke stays fully inside the bounding box regardless of stroke width.

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
<Loading size="2rem" />
```

### Custom color

```tsx
<Loading color="var(--blue-500)" />
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

### Inside a button (manual usage)

For loading buttons, use `Button` with `state="loading"` — it shows `Loading` internally. Use `Loading` directly only when you need a standalone spinner outside a `Button`.

```tsx
<Button label="Save" state="loading" />
```
