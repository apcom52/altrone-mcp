# Pagination

A page switcher, controlled or uncontrolled. Renders a `<nav>` landmark (localized `aria-label`) with previous/next arrows, numbered page buttons, and — by default — first/last jump buttons. Always shows page 1 and the last page; gaps collapse into an ellipsis.

## Import

```tsx
import { Pagination } from 'altrone-ui';
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `currentPage` | `number` | — | Controlled active page (1-based) — clamp it yourself in `onChange`. Out-of-range values log a dev warning. Omit for uncontrolled (`defaultPage`). |
| `defaultPage` | `number` | `1` | Initial page for the uncontrolled case. Ignored if `currentPage` is passed. |
| `totalPages` | `number` | — | **Required.** Total number of pages. |
| `onChange` | `(page: number, event: React.MouseEvent<HTMLButtonElement>) => void` | — | Called with the target page when the user picks one — fires whether controlled or uncontrolled. |
| `siblings` | `number` | `1` | Page buttons to show on each side of the current page. |
| `showEdgeButtons` | `boolean` | `true` | Show the "first page" / "last page" jump buttons. |
| `size` | `'mini' \| 's' \| 'm' \| 'l' \| 'xl'` | `'m'` | Scales the arrow/page buttons and the ellipsis together. |
| `prevIcon` | `ReactElement` | `Application.icons.prev` | Overrides the "previous page" icon. |
| `nextIcon` | `ReactElement` | `Application.icons.next` | Overrides the "next page" icon. |
| `firstPageIcon` | `ReactElement` | lucide's `ChevronFirst` | Overrides the "first page" jump icon (only used when `showEdgeButtons` is `true`). Not a shared `Application.icons` role. |
| `lastPageIcon` | `ReactElement` | lucide's `ChevronLast` | Overrides the "last page" jump icon (only used when `showEdgeButtons` is `true`). Not a shared `Application.icons` role. |
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

### Basic (controlled)

```tsx
const [page, setPage] = useState(1);
<Pagination currentPage={page} totalPages={20} onChange={setPage} />
```

### Uncontrolled

Omit `currentPage` and the component tracks its own page, seeded from `defaultPage`. `onChange` still fires if you just want to observe the page.

```tsx
<Pagination defaultPage={1} totalPages={20} onChange={(page) => console.log(page)} />
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
