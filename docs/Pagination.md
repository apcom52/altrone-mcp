# Pagination

A fully controlled page navigation component. Always shows page 1 and the last page; automatically inserts ellipsis between ranges. Supports first/last jump buttons and keyboard accessibility.

## Import

```tsx
import { Pagination } from 'altrone-ui';
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `currentPage` | `number` | — | **Required.** The currently active page (1-based). |
| `totalPages` | `number` | — | **Required.** Total number of pages. |
| `onChange` | `(page: number) => void` | — | **Required.** Called when the user selects a page. |
| `siblings` | `number` | `1` | Number of page buttons to show on each side of the current page. |
| `showEdgeButtons` | `boolean` | `false` | Show "go to first page" and "go to last page" buttons. |
| `ref` | `Ref<HTMLDivElement>` | — | Forwarded ref |

All standard `HTMLAttributes<HTMLDivElement>` are also accepted.

---

## Behavior

- Always renders page `1` and page `totalPages` (unless `totalPages` is 1).
- Pages adjacent to `currentPage` within `siblings` distance are always shown as numbered buttons.
- Gaps between the anchor pages and sibling range are replaced with an ellipsis (`…`).
- The active page button has `aria-current="page"`.
- Previous/Next buttons are disabled on the first/last page respectively.

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

### Single page (no pagination rendered)

When `totalPages` is `1`, the component renders without navigation — there is nothing to paginate.

```tsx
<Pagination currentPage={1} totalPages={1} onChange={() => {}} />
```
