# CollapsedList

A vertical list that shows the first N items and hides the rest behind an expand/collapse toggle button. The toggle button uses localized labels from the localization system and can be customized via `expandButtonLabel`.

## Import

```tsx
import { CollapsedList } from 'altrone-ui';
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `limit` | `number` | `5` | Maximum number of items visible in the collapsed state |
| `gap` | `Gap` | — | Gap between list items (not the gap between the list and the toggle button). Uses the design system's gap scale. |
| `hideExpandButtonAfterUsage` | `boolean` | `false` | When `true`, the expand button disappears after the list is expanded (one-way reveal). When `false`, a collapse button is shown after expanding. |
| `expandButtonLabel` | `string \| (ctx: CollapsedListContext) => string` | — | Custom label for the expand/collapse button. If a function, receives `CollapsedListContext` with `hiddenItems`, `totalItems`, and `expanded`. When omitted, uses the localized default. |
| `openIcon` | `ReactElement` | shared `icons.open` | Toggle icon shown while collapsed. |
| `closeIcon` | `ReactElement` | shared `icons.close` | Toggle icon shown while expanded. |
| `ref` | `Ref<HTMLDivElement>` | — | Forwarded ref |

All standard `HTMLAttributes<HTMLDivElement>` are also accepted.

---

## CollapsedListContext

Passed to `expandButtonLabel` when it is a function:

| Property | Type | Description |
|----------|------|-------------|
| `hiddenItems` | `number` | Number of items currently hidden |
| `totalItems` | `number` | Total number of items |
| `expanded` | `boolean` | Whether the list is currently expanded |

---

## Examples

### Basic

```tsx
<CollapsedList limit={3}>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
  <div>Item 4</div>
  <div>Item 5</div>
  <div>Item 6</div>
</CollapsedList>
```

### With gap

```tsx
<CollapsedList limit={4} gap="s">
  {tags.map((tag) => <Tag key={tag.id} label={tag.name} />)}
</CollapsedList>
```

### One-way reveal (no collapse)

```tsx
<CollapsedList limit={3} hideExpandButtonAfterUsage>
  {notifications.map((n) => <NotificationRow key={n.id} {...n} />)}
</CollapsedList>
```

### Custom expand button label

```tsx
{/* Static string */}
<CollapsedList limit={5} expandButtonLabel="Show all">
  {items.map(/* ... */)}
</CollapsedList>

{/* Dynamic with context */}
<CollapsedList
  limit={5}
  expandButtonLabel={({ hiddenItems, expanded }) =>
    expanded ? 'Show less' : `Show ${hiddenItems} more items`
  }
>
  {items.map(/* ... */)}
</CollapsedList>
```

---

## Behavior details

- The component manages expanded state internally — no external state needed.
- The expand button is a `Button` with `variant="text"` and a chevron icon that flips direction based on state. Override it per-instance via `openIcon`/`closeIcon`, or globally via `Application`'s `icons` prop.
- When all items fit within `limit`, no expand button is rendered at all.
- `children` is normalized through `ArrayUtils.getSafeArray` so single children, arrays, and `null` entries are all handled safely.
- `limit` slices the **direct** children. Pass the items as siblings (or a single mapped array); wrapping them in one element makes the list see a single child and `limit` has nothing to slice.
