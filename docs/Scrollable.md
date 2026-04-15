# Scrollable

A container with styled overlay scrollbars. Built on `overlayscrollbars-react`. The scrollbar auto-hides when the pointer is not moving and reappears on scroll/hover.

## Import

```tsx
import { Scrollable } from 'altrone-ui';
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | Scrollable content |
| `ref` | `Ref<HTMLDivElement>` | — | Forwarded ref. Resolves to the **viewport** element (the inner scrollable div), not the outer wrapper — use it for programmatic scrolling. |

All standard `HTMLAttributes<HTMLDivElement>` are also accepted and applied to the outer wrapper.

---

## Behavior

- Scrollbar auto-hides when the pointer stops moving (300 ms delay).
- The `ref` exposes the OverlayScrollbars **viewport** element — the same `HTMLDivElement` you would scroll programmatically.
- The outer wrapper fills its container (`height: 100%`) by default; size the wrapper via `className` or `style`.

---

## Examples

### Basic

```tsx
<div style={{ height: 400 }}>
  <Scrollable>
    {items.map((item) => <Item key={item.id} {...item} />)}
  </Scrollable>
</div>
```

### Programmatic scroll via ref

```tsx
const viewportRef = useRef<HTMLDivElement>(null);

const scrollToTop = () => {
  viewportRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
};

<Scrollable ref={viewportRef}>
  <LongContent />
</Scrollable>
```

### Inside a modal or drawer

`Scrollable` is used internally by `Drawer` to wrap its content. Use it directly when you need a scrollable region within a fixed-height container.

```tsx
<div style={{ height: 600, display: 'flex', flexDirection: 'column' }}>
  <Header />
  <Scrollable style={{ flex: 1 }}>
    <ArticleContent />
  </Scrollable>
  <Footer />
</div>
```

### Full-height sidebar

```tsx
<aside style={{ height: '100vh' }}>
  <Scrollable>
    <NavigationList id="nav">
      {navItems.map(…)}
    </NavigationList>
  </Scrollable>
</aside>
```
