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
| `columns` | `DataTableColumn<T>[]` | — | **Required.** Column definitions |
| `mode` | `'loading' \| 'read' \| 'select'` | `'read'` | Table mode. `loading` shows skeleton cells. `select` enables row checkboxes. |
| `rowsPerPage` | `number` | `20` | Rows per page |
| `selectable` | `boolean` | — | Enables row selection and the "select rows" toggle in the header |
| `showFooter` | `boolean` | `true` | Show/hide the pagination footer |
| `showEmptyBanner` | `boolean` | `true` | Show an empty state banner when there are no rows to display |
| `resizableColumns` | `boolean` | `false` | Let columns be resized by dragging their header edge (per-column opt-out via `resizable: false`) |
| `renderRowActions` | `(ctx: DataTableRenderRowActionsContext<T>) => ReactElement<DataTableRowActionsProps>` | — | Per-row action buttons. Return a `<DataTable.RowActions>` element. |
| `defaultPage` | `number` | `0` | Initial page index (zero-based) |
| `defaultSort` | `{ field: string; direction: 'asc' \| 'desc' }` | — | Initial sort state |
| `defaultFilters` | `DataTableFilter[]` | — | Initial filter state |
| `onPageChange` | `(currentPage: number) => void` | — | Called on page change. Page is 1-based. |
| `onSortChange` | `(sort?: Sorting) => void` | — | Called on sort change. `undefined` when sorting is cleared. |
| `onFilterChange` | `(filters: DataTableFilter[]) => void` | — | Called on filter change. Always an array (empty when no filters). |
| `onModeChange` | `(mode: DataTableMode) => void` | — | Called when mode changes (e.g. entering select mode) |
| `children` | `ReactElement \| ReactElement[] \| ((ctx: DataTableRenderContext<T>) => ReactElement \| ReactElement[])` | — | Toolbar content rendered in the table header. Receives `{ selectableMode, selectedItems }` when used as a function. |

---

## Column definition

```ts
type DataTableColumnBase<T> = {
  accessor: keyof T;       // required
  label?: string;
  width?: number;
  visible?: boolean;
  filterable?: boolean | DataTableColumnType;  // true = auto type, or explicit type
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

### DataTable.RowActions

Container for per-row action buttons. Pass as the return value of `renderRowActions`.

### DataTable.RowAction

An individual action button inside `RowActions`.

| Prop | Type | Description |
|------|------|-------------|
| `label` | `string` | **Required.** Button label |
| `collapsed` | `boolean` | Hides this action into an overflow menu |
| `onClick` | `() => void` | Click handler — receives no arguments (use a closure) |

### DataTable.Action

A toolbar action button rendered in `children`. Accepts all `Button` props.

---

## Examples

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
  columns={columns}
  renderRowActions={({ row, rowIndex }) => (
    <DataTable.RowActions>
      <DataTable.RowAction
        label="Edit"
        icon={<Pencil />}
        onClick={() => openEditModal(row)}
      />
      <DataTable.RowAction
        label="Delete"
        icon={<Trash />}
        danger
        collapsed
        onClick={() => deleteUser(row.id)}
      />
    </DataTable.RowActions>
  )}
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
>
  {({ selectedItems }) => (
    <>
      <DataTable.Action
        label={`Delete ${selectedItems.length} selected`}
        danger
        disabled={selectedItems.length === 0}
        onClick={() => deleteMany(selectedItems)}
      />
    </>
  )}
</DataTable>
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

## Callbacks fire only after first render

`onPageChange`, `onSortChange`, and `onFilterChange` are guarded with a `isFirstRender` ref — they do **not** fire on mount. Use `defaultPage`, `defaultSort`, `defaultFilters` to set the initial state instead.
