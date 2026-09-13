# Scrollable

A container with styled overlay scrollbars. Built on `overlayscrollbars-react`. The bar auto-hides when the pointer is not moving and reappears on scroll/hover, and follows the app theme.

## Import

```tsx
import { Scrollable } from 'altrone-ui';
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | Scrollable content |
| `overflowX` | `'scroll' \| 'hidden' \| 'visible' \| 'visible-hidden' \| 'visible-scroll'` | `'scroll'` | Horizontal overflow behavior, forwarded to OverlayScrollbars. `'hidden'` fully disables the axis (no bar, no pan). |
| `overflowY` | same as `overflowX` | `'scroll'` | Vertical overflow behavior. |
| `maxHeight` | `number \| string` | — | Caps the box height — it grows with content up to this value, then scrolls. Without it the box fills its parent's height. |
| `ref` | `Ref<HTMLDivElement>` | — | Forwarded to the wrapper element (the visible box). |

All standard `HTMLAttributes<HTMLDivElement>` are also accepted and applied to the wrapper.

---

## Behavior

- Scrollbar auto-hides when the pointer stops moving (300 ms delay).
- `ref`, `className` and `style` all resolve to the same wrapper element.
- Sizing: by default the wrapper fills its parent (`height: 100%`), so the parent must be sized. Pass `maxHeight` to size by content instead, up to a cap.
- Inside a flex column the wrapper carries `min-height: 0`, so it shrinks and scrolls next to a fixed header/footer instead of growing the column.
- The actual scroll viewport is an inner element managed by OverlayScrollbars; reach it with `ref.current?.querySelector('[data-overlayscrollbars-viewport]')` if you need to script `scrollTo`.

---

## Examples

### Filling a sized parent

```tsx
<div style={{ height: 400 }}>
  <Scrollable>
    {items.map((item) => <Item key={item.id} {...item} />)}
  </Scrollable>
</div>
```

### Cap the height, then scroll (dropdown menus)

```tsx
<Scrollable maxHeight={240}>
  <Menu>{options.map(renderOption)}</Menu>
</Scrollable>
```

### Inside a flex column

```tsx
<div style={{ height: 600, display: 'flex', flexDirection: 'column' }}>
  <Header />
  <div style={{ flex: 1, minHeight: 0 }}>
    <Scrollable>
      <ArticleContent />
    </Scrollable>
  </div>
  <Footer />
</div>
```

### Horizontal only

```tsx
<Scrollable overflowX="scroll" overflowY="hidden">
  <Row style={{ width: 'max-content' }}>{chips}</Row>
</Scrollable>
```

### Full-height sidebar

```tsx
<aside style={{ height: '100vh' }}>
  <Scrollable>
    <NavigationList id="nav">{navItems.map(renderItem)}</NavigationList>
  </Scrollable>
</aside>
```
