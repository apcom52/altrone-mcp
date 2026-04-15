# DataTable

A full-featured data table for displaying **multiple rows**. Built on `@tanstack/react-table`. Supports sorting, filtering, pagination, row selection, custom row actions, and loading/select modes.

> For editing a single record, use `DataGrid` instead.

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
| `selectable` | `boolean` | — | Enables row selection checkboxes |
| `showFooter` | `boolean` | `true` | Show/hide the pagination footer |
| `showEmptyBanner` | `boolean` | `true` | Show an empty state banner when `data` is empty |
| `renderRowActions` | `(ctx: DataTableRenderRowActionsContext) => ReactElement<DataTableRowActionsProps>` | — | Per-row action buttons. Return a `<DataTable.RowActions>` element. |
| `defaultPage` | `number` | `0` | Initial page index (zero-based) |
| `defaultSort` | `{ field: string; direction: 'asc' \| 'desc' }` | — | Initial sort state |
| `defaultFilters` | `Filter[]` | — | Initial filter state |
| `onPageChange` | `(currentPage: number) => void` | — | Called on page change. Page is 1-based. |
| `onSortChange` | `(sort?: Sorting) => void` | — | Called on sort change |
| `onFilterChange` | `(filters?: Filter[]) => void` | — | Called on filter change |
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
  defaultFilters={[]}
  onSortChange={(sort) => console.log(sort)}
  onFilterChange={(filters) => console.log(filters)}
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
        renderLoadingMode: () => <DummyBox width="48px" height="48px" />,
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
