# DummyBox

A rectangular placeholder box. Used as a skeleton/loading state for image or content areas. Renders a `<div>` with a muted background fill, configurable dimensions and border radius.

## Import

```tsx
import { DummyBox } from 'altrone-ui';
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `width` | `string` | `'100%'` | CSS width value (e.g. `'64px'`, `'100%'`, `'4rem'`) |
| `height` | `string` | `'100%'` | CSS height value |
| `radius` | `string` | `'6px'` | CSS border-radius value |
| `ref` | `Ref<HTMLDivElement>` | — | Forwarded ref |

All standard `HTMLAttributes<HTMLDivElement>` are also accepted (except `children`).

---

## Examples

### Basic placeholder

```tsx
<DummyBox width="200px" height="120px" />
```

### Circular avatar placeholder

```tsx
<DummyBox width="48px" height="48px" radius="50%" />
```

### Full-width banner placeholder

```tsx
<DummyBox width="100%" height="200px" radius="8px" />
```

### Inside a skeleton card

```tsx
<div style={{ display: 'flex', gap: 12 }}>
  <DummyBox width="48px" height="48px" radius="50%" />
  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
    <DummyBox width="60%" height="16px" />
    <DummyBox width="40%" height="12px" />
  </div>
</div>
```

### As a color swatch placeholder

`DummyBox` is used internally by `ColorPicker` when no color is selected:

```tsx
<DummyBox width="20px" height="20px" radius="50%" />
```
