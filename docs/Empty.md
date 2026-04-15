# Empty

An empty-state placeholder with an icon and a text message. Used when a list, table, or container has no data to display. Renders with `role="status"` for accessibility.

## Import

```tsx
import { Empty } from 'altrone-ui';
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | `ReactNode` | `<SearchX />` | Icon displayed above the message. Defaults to a search-with-X icon from lucide-react. |
| `transparent` | `boolean` | `false` | Removes the background fill. Use inside containers that already have a background. |
| `children` | `ReactNode` | localized `'empty.noData'` | Custom message text. Uses the localized default when omitted. |
| `ref` | `Ref<HTMLDivElement>` | — | Forwarded ref |

All standard `HTMLAttributes<HTMLDivElement>` are also accepted.

---

## Examples

### Default

```tsx
<Empty />
```

### Custom message

```tsx
<Empty>No results found for your search.</Empty>
```

### Custom icon

```tsx
import { Inbox } from 'lucide-react';

<Empty icon={<Inbox />}>Your inbox is empty.</Empty>
```

### Transparent (inside a table or dropdown)

```tsx
<Empty transparent />
```

### Inside a list

```tsx
{items.length === 0 ? (
  <Empty>No items yet. Create one to get started.</Empty>
) : (
  items.map(/* ... */)
)}
```
