# Pagination

A fully controlled page switcher. Renders a `<nav>` landmark (localized `aria-label`) with previous/next arrows, numbered page buttons, and — by default — first/last jump buttons. Always shows page 1 and the last page; gaps collapse into an ellipsis.

## Import

```tsx
import { Pagination } from 'altrone-ui';
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `currentPage` | `number` | — | **Required.** The active page (1-based). Controlled — clamp it yourself in `onChange`. Out-of-range values log a dev warning. |
| `totalPages` | `number` | — | **Required.** Total number of pages. |
| `onChange` | `(page: number, event: React.MouseEvent<HTMLButtonElement>) => void` | — | **Required.** Called with the target page when the user picks one. |
| `siblings` | `number` | `1` | Page buttons to show on each side of the current page. |
| `showEdgeButtons` | `boolean` | `true` | Show the "first page" / "last page" jump buttons. |
| `ref` | `Ref<HTMLElement>` | — | Forwarded to the `<nav>` |

All standard `HTMLAttributes<HTMLElement>` (except `onChange`) are also accepted.

---

## Behavior

- Always renders page `1` and page `totalPages` (unless `totalPages` is 1).
- Pages adjacent to `currentPage` within `siblings` distance are always shown as numbered buttons.
- Gaps between the anchor pages and sibling range are replaced with an ellipsis (`…`).
- The active page button is `selected` and has `aria-current="page"` (it stays focusable, not disabled).
- Previous/First are disabled on page 1; Next/Last are disabled on the last page.
- `Pagination` never hides itself. With `totalPages` of `1` it renders a lone disabled page button with disabled arrows — gate rendering on `totalPages > 1` yourself if you want it gone.

---

## Examples

### Basic

```tsx
const [page, setPage] = useState(1);
<Pagination currentPage={page} totalPages={20} onChange={setPage} />
```

### More siblings (wider range)

```tsx
<Pagination
  currentPage={page}
  totalPages={50}
  onChange={setPage}
  siblings={2}
/>
```

### With edge buttons (first/last page jump)

```tsx
<Pagination
  currentPage={page}
  totalPages={100}
  onChange={setPage}
  showEdgeButtons
/>
```

### Inside a data table footer

```tsx
<Flex justify="space-between" align="center">
  <span>{total} results</span>
  <Pagination
    currentPage={currentPage}
    totalPages={Math.ceil(total / pageSize)}
    onChange={setCurrentPage}
  />
</Flex>
```

### Hide it when there's nothing to paginate

`Pagination` always renders something. Gate it yourself:

```tsx
{totalPages > 1 && (
  <Pagination currentPage={page} totalPages={totalPages} onChange={setPage} />
)}
```
