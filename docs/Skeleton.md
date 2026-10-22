# Skeleton

An animated placeholder for loading states — a `<div>` with a background-colour pulse (stopped under `prefers-reduced-motion`). Use in place of real content while data loads. It's `aria-hidden`; announce the loading state on a wrapper (`aria-busy` / `role="status"`).

## Import

```tsx
import { Skeleton } from 'altrone-ui';
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `width` | `string \| number` | `'100%'` | CSS width; a number is in px |
| `minWidth` | `string \| number` | — | CSS min-width |
| `maxWidth` | `string \| number` | — | CSS max-width — caps a fluid `width` (e.g. `width="100%" maxWidth={320}`) |
| `height` | `string \| number` | `'100%'` | CSS height; a number is in px |
| `minHeight` | `string \| number` | `'1lh'` without `height` | CSS min-height. Without `height` the skeleton is at least one text line tall, so it doesn't collapse in an auto-height parent |
| `maxHeight` | `string \| number` | — | CSS max-height |
| `radius` | `string \| number` | `max(var(--radius-outer), var(--radius-mini))` | CSS `border-radius`. Without it the corners follow the ambient radius, never below `--radius-mini` (like `Box`) |
| `animateLayout` | `boolean` | `false` | Smoothly animate size/position changes via `motion`'s `layout`. Off by default — a static placeholder doesn't need the per-render FLIP measuring. |
| `ref` | `Ref<HTMLDivElement>` | — | Forwarded ref |

All standard `HTMLAttributes<HTMLDivElement>` are also accepted (except `children`). `className` is merged with the component's own class; `style` is applied last and can override the computed sizes. The block has `flex-shrink: 0`, so it keeps its size in a `Flex` row.

> **Note:** With `animateLayout` off (the default) `Skeleton` renders a plain `<div>` — no `motion` overhead. Turn it on only when a skeleton's dimensions actually change between renders.

> **Dotted `Box` vs `Skeleton`:** Use `Box` with `material="dotted"` for a static "content goes here" placeholder or an empty drop target. Use `Skeleton` for the animated shimmer loading state of text, cards or repeating content.

---

## Examples

### Text line

```tsx
<Skeleton width="60%" height="16px" radius="4px" />
```

### Paragraph skeleton (multiple lines)

```tsx
<Flex orientation="vertical" gap="xs">
  <Skeleton width="100%" height="16px" radius="4px" />
  <Skeleton width="100%" height="16px" radius="4px" />
  <Skeleton width="75%"  height="16px" radius="4px" />
</Flex>
```

### Avatar + text card skeleton

```tsx
<Flex gap="m" align="center">
  <Skeleton width="48px" height="48px" radius="50%" />
  <Flex orientation="vertical" gap="xs" style={{ flex: 1 }}>
    <Skeleton width="40%" height="16px" radius="4px" />
    <Skeleton width="60%" height="12px" radius="4px" />
  </Flex>
</Flex>
```

### Card skeleton

```tsx
<Flex orientation="vertical" gap="m" style={{ padding: 16, border: '1px solid var(--border-1)', borderRadius: 8 }}>
  <Skeleton width="100%" height="180px" radius="6px" />
  <Skeleton width="70%"  height="20px"  radius="4px" />
  <Skeleton width="90%"  height="14px"  radius="4px" />
  <Skeleton width="50%"  height="14px"  radius="4px" />
</Flex>
```

### Repeated list skeleton

```tsx
{Array.from({ length: 5 }).map((_, i) => (
  <Flex key={i} gap="m" align="center" style={{ padding: '8px 0' }}>
    <Skeleton width="32px" height="32px" radius="50%" />
    <Skeleton width="200px" height="14px" radius="4px" />
  </Flex>
))}
```

### Conditional: show skeleton while loading

```tsx
{isLoading
  ? <Skeleton width="100%" height="40px" radius="6px" />
  : <UserCard user={user} />
}
```
