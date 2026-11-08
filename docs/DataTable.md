# DataTable

A full-featured data table for displaying **multiple rows**. A thin wrapper around `@tanstack/react-table` (v9) — sorting, filtering, pagination, row selection and column resizing are all owned by the underlying table instance. Also supports custom row actions and loading/select modes.


## Import

```tsx
import { DataTable } from 'altrone-ui';
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `T[]` | — | **Required.** Array of row objects |
| `getRowId` | `(row: T, index: number) => string` | — | Stabilizes row identity across renders. Without it, row identity falls back to array position, so a `data` array reordered from outside the table (a refetch, a websocket update) leaves per-row UI state (an open `rowActions` overflow menu) stuck at the old position instead of following the row. |
| `columns` | `DataTableColumn<T>[]` | — | **Required.** Column definitions |
| `mode` | `'loading' \| 'read' \| 'select'` | `'read'` | Table mode. `loading` shows skeleton cells. `select` enables row checkboxes. |
| `rowsPerPage` | `number` | `20` | Rows per page |
| `selectable` | `boolean` | — | Enables row selection and the "select rows" toggle in the header |
| `showFooter` | `boolean` | `true` | Show/hide the pagination footer |
| `showEmptyBanner` | `boolean` | `true` | Show an empty state banner when there are no rows to display |
| `resizableColumns` | `boolean` | `false` | Let columns be resized by dragging their header edge (per-column opt-out via `resizable: false`) |
| `hideableColumns` | `boolean` | `false` | Shows a column picker in the toolbar. |
| `hiddenColumns` | `Array<keyof T>` | — | Controlled list of hidden column accessors. |
| `defaultHiddenColumns` | `Array<keyof T>` | `[]` | Initial hidden list in uncontrolled mode and target for Reset in either mode. |
| `onHiddenColumnsChange` | `(hidden: Array<keyof T>, event?: React.SyntheticEvent) => void` | — | Receives the next hidden list and the event for a user action. |
| `icons` | `Partial<DataTableIconSet>` | — | Overrides for icons unique to `DataTable` (`sortAsc`, `sortDesc`, `filter`, `columnVisibility` (defaults to `Columns3Cog`), `addFilter`, `deleteFilter`, `enableSelection`, `disableSelection`, `rowActions`, `booleanTrue`, `booleanFalse`), each a `ReactElement` |
| `rowActions` | `StrictReactElements<DataTableRowActionProps> \| ((ctx: DataTableRenderRowActionsContext<T>) => StrictReactElements<DataTableRowActionProps>)` | — | Adds a trailing actions column: one `DataTable.RowAction`, or several (as an array), per row. A `collapsed` `RowAction` folds into an overflow menu. |
| `actions` | `ReactNode \| ((ctx: DataTableRenderContext<T>) => ReactNode)` | — | Content added to the header `Toolbar`, alongside the select-mode toggle and filter control (both live in `Toolbar.Leading`). `DataTable.Action` element(s) join them there by default; wrap content in `Toolbar.Leading` / `Toolbar.Center` / `Toolbar.Trailing` to place it in a specific region instead. Receives `{ selectableMode, selectedItems }` when used as a function. |
| `defaultPage` | `number` | `0` | Initial page index (zero-based), uncontrolled |
| `defaultSort` | `{ field: string; direction: 'asc' \| 'desc' }` | — | Initial sort state, uncontrolled |
| `defaultFilters` | `DataTableFilter[]` | — | Initial filter state, uncontrolled |
| `page` | `number` | — | Controlled current page (1-based). Pairs with `onPageChange`; omit for uncontrolled (`defaultPage`) |
| `sort` | `Sorting \| null` | — | Controlled sort. `null` means controlled with no sort applied. Omit for uncontrolled (`defaultSort`) |
| `filters` | `DataTableFilter[]` | — | Controlled active filters. Pairs with `onFilterChange`; omit for uncontrolled (`defaultFilters`) |
| `onPageChange` | `(currentPage: number, event?: MouseEvent) => void` | — | Called on page change. Page is 1-based. `event` is undefined for a programmatic change (e.g. an auto page-reset triggered by a sort/filter change). |
| `onSortChange` | `(sort?: Sorting, event?: MouseEvent) => void` | — | Called on sort change. `undefined` when sorting is cleared. |
| `onFilterChange` | `(filters: DataTableFilter[], event?: MouseEvent) => void` | — | Called on filter change. Always an array (empty when no filters). |
| `onModeChange` | `(mode: DataTableMode, event: MouseEvent) => void` | — | Called when mode changes (e.g. entering select mode) |

---

## Column definition

```ts
type DataTableColumnBase<T> = {
  accessor: keyof T;       // required
  label?: string;
  width?: number;
  enabled?: boolean;       // false = column excluded entirely: not rendered, sorted or filtered (e.g. no permission)
  filterable?: boolean | DataTableColumnType;  // true = auto type (link → text, custom → not filterable), or explicit type
  sortable?: boolean;
  resizable?: boolean;     // opt this column out of resizing when `resizableColumns` is on
};
```

Column types and their extra `options`:

| `type` | `options` |
|--------|-----------|
| `'string'` / `'text'` | — |
| `'number'` | `digitsAfterPoint?: number` |
| `'currency'` | `currency?: string`, `currencyAccessor?: keyof T` |
| `'date'` | `level?: 'day' \| 'month' \| 'year'`, `format?: string` |
| `'boolean'` | — |
| `'password'` | — |
| `'select'` | — |
| `'link'` | `hrefTransformer?: (value, item) => string`, `textTransformer?: (value, item) => string` |
| `'color'` | `colorPresets?: string[]` |
| `'custom'` | `renderReadMode: ({ value, item }) => ReactNode`, `renderLoadingMode?: ...` |

---

## Sub-components

### DataTable.RowAction

An individual action button, passed to the table's `rowActions` prop (directly, or as an array for several). `DataTable` renders them in a trailing column, folding any `collapsed` ones into an overflow menu (`Dropdown` behind an ellipsis button) once there's more than one action.

| Prop | Type | Description |
|------|------|-------------|
| `label` | `string` | **Required.** Button label |
| `collapsed` | `boolean` | Hides this action into an overflow menu |
| `onClick` | `(event: MouseEvent<HTMLButtonElement>) => void` | Native `Button` click handler |

### DataTable.Action

A toolbar action button rendered via `actions`. Wraps `Toolbar.Action`, so it accepts the same props and follows the header toolbar's size/context. Disables itself while the table is loading.

---

## Examples

Right-click a data cell or press Shift+F10 while it is focused to open the cell context menu. **Copy** copies the displayed text and keeps passwords masked. With `selectable`, **Select this row** selects the row and enters selection mode if needed. **Deselect this row** clears the row selection and keeps selection mode active.

### Basic table

```tsx
type User = { id: number; name: string; email: string; active: boolean };

<DataTable<User>
  data={users}
  columns={[
    { accessor: 'id',     label: 'ID',     type: 'number', sortable: true },
    { accessor: 'name',   label: 'Name',   type: 'string', sortable: true, filterable: true },
    { accessor: 'email',  label: 'Email',  type: 'string', filterable: true },
    { accessor: 'active', label: 'Active', type: 'boolean' },
  ]}
/>
```

### Controlled column visibility

```tsx
const [hiddenColumns, setHiddenColumns] = useState<Array<keyof User>>(['email']);

<DataTable<User>
  data={users}
  columns={columns}
  hideableColumns
  hiddenColumns={hiddenColumns}
  defaultHiddenColumns={['email']}
  onHiddenColumnsChange={setHiddenColumns}
/>
```

The toolbar picker stages visibility changes until you click **Apply**. **Show all** immediately shows every enabled column and closes the picker. **Reset** restores the draft to `defaultHiddenColumns`. The last enabled data column stays visible. The picker is disabled in loading mode and omits row selection and row actions. The hidden lists also work without the toolbar picker.

Right-click a column header or press Shift+F10 while it is focused. For sortable columns, the context menu offers no sorting, ascending, and descending as radio options. With `hideableColumns` enabled, **Hide** immediately hides the column.

A user-hidden column stays available to filters and sorting and retains its width. `enabled: false` excludes a column from the table, filter builder, and picker. Unknown and disabled accessors in the hidden lists are ignored.

### With sorting and filtering defaults

```tsx
<DataTable
  data={data}
  columns={columns}
  defaultSort={{ field: 'name', direction: 'asc' }}
  defaultFilters={[
    { id: 'active', value: { rule: 'positive' } },
    { id: 'age', value: { rule: 'gte', value: 18 } },
  ]}
  onSortChange={(sort) => console.log(sort)}
  onFilterChange={(filters) => console.log(filters)}
/>
```

### Filter state shape

```ts
interface DataTableFilter {
  id: string;                    // column id (equal to its accessor)
  value: {
    rule: string;                // one of the *FilterRules enums for the column type
    value?: unknown;             // compared value; a [from, to] tuple for `between` rules; absent for `empty`/`notEmpty`
    level?: 'day' | 'month' | 'year';  // date columns only
  };
}
```

Rule enums are exported: `StringFilterRules`, `NumberFilterRules`, `DateFilterRules`, `BooleanFilterRules`, `SelectFilterRules`, `ColorFilterRules`, `PasswordFilterRules`, `ArrayFilterRules`.

### Resizable columns

```tsx
<DataTable
  data={data}
  resizableColumns
  columns={[
    { accessor: 'name', label: 'Name', width: 200 },
    { accessor: 'id', label: 'ID', width: 80, resizable: false },
  ]}
/>
```

### Row actions

```tsx
<DataTable
  data={users}
  getRowId={(user) => user.id}
  columns={columns}
  rowActions={({ row, rowIndex }) => [
    <DataTable.RowAction
      key="edit"
      label="Edit"
      icon={<Pencil />}
      onClick={() => openEditModal(row)}
    />,
    <DataTable.RowAction
      key="delete"
      label="Delete"
      icon={<Trash />}
      danger
      collapsed
      onClick={() => deleteUser(row.id)}
    />,
  ]}
/>
```

Pass `getRowId` whenever `users` can be reordered outside the table (a refetch, a
websocket update) — otherwise an already-open row menu stays attached to the old array
position instead of following the row.

A single, static action for every row can skip the function form:

```tsx
<DataTable
  data={users}
  columns={columns}
  rowActions={<DataTable.RowAction label="View" onClick={() => openViewer()} />}
/>
```

### Selectable rows with toolbar

```tsx
<DataTable
  data={users}
  columns={columns}
  selectable
  mode={mode}
  onModeChange={setMode}
  actions={({ selectedItems }) => [
    <DataTable.Action
      key="delete"
      label={`Delete ${selectedItems.length} selected`}
      danger
      disabled={selectedItems.length === 0}
      onClick={() => deleteMany(selectedItems)}
    />,
  ]}
/>
```

### Placing actions in specific toolbar regions

By default, elements returned from `actions` join the select-mode toggle and filter control in `Toolbar.Leading`. Wrap content in `Toolbar.Center` / `Toolbar.Trailing` to place it elsewhere in the header:

```tsx
<DataTable
  data={users}
  columns={columns}
  actions={[
    <Toolbar.Center key="search">
      <TextInput placeholder="Search users" />
    </Toolbar.Center>,
    <Toolbar.Trailing key="export">
      <DataTable.Action label="Export" icon={<Download />} showLabel={false} onClick={exportUsers} />
    </Toolbar.Trailing>,
  ]}
/>
```

### Custom cell renderer

```tsx
<DataTable
  data={products}
  columns={[
    { accessor: 'name', label: 'Product', type: 'string' },
    {
      accessor: 'thumbnail',
      label: 'Image',
      type: 'custom',
      options: {
        renderReadMode: ({ value }) => (
          <img src={String(value)} style={{ width: 48, height: 48, objectFit: 'cover' }} />
        ),
        renderLoadingMode: () => <Skeleton width={48} height={48} />,
      },
    },
  ]}
/>
```

### Link column

```tsx
{
  accessor: 'website',
  label: 'Website',
  type: 'link',
  options: {
    hrefTransformer: (value) => String(value),
    textTransformer: (value) => 'Visit site',
  },
}
```

### Currency column with dynamic currency from data

```tsx
{
  accessor: 'price',
  label: 'Price',
  type: 'currency',
  options: {
    currencyAccessor: 'currency',  // reads currency code from row.currency
  },
}
```

---

## Callbacks fire only on user interaction

`onPageChange`, `onSortChange`, and `onFilterChange` fire only when the table's own pagination/sort/filter UI is used — never on mount. Use `defaultPage`, `defaultSort`, `defaultFilters` to set the initial state instead.

## Controlled state

`page`/`sort`/`filters` mirror the `default*` props but put the consumer in charge of the current value — the table renders whatever it's given and only *asks* to change it via `onPageChange`/`onSortChange`/`onFilterChange`. Useful when that state needs to live outside the table, e.g. synced to a URL query param so a link or the browser back button can jump to a specific page. Each of the three is controlled independently — you can control just `page` while leaving `sort`/`filters` uncontrolled.

```tsx
const [page, setPage] = useState(1);

<DataTable
  data={rows}
  columns={columns}
  page={page}
  onPageChange={setPage}
/>
```
