# DataGrid

A form-like component for viewing and editing a **single record**. Renders fields in a vertical list with label/value pairs. Supports three modes — `read`, `edit`, `loading` — and can group fields into collapsible sections via `Spoiler`.

> For tabular data (multiple rows), use `DataTable` instead.

## Import

```tsx
import { DataGrid } from 'altrone-ui';
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `Record<string, unknown>` | — | **Required.** The record object to display. Keys must match `accessor` values in `fields`. |
| `fields` | `DataGridFieldType[]` | — | **Required.** Field definitions. Each field specifies its type, label, and type-specific options. |
| `onChange` | `(field: string, value: unknown) => void` | — | **Required.** Called when a field value changes in edit mode. |
| `mode` | `'read' \| 'edit' \| 'loading'` | `'read'` | Display mode. Controls whether fields are editable and shows a loading state. |
| `onChangeMode` | `(mode: DataGridModeType) => void` | — | Called when the built-in Edit/Done toolbar button is clicked. |
| `groups` | `DataGridGroupType[]` | — | Field groups. Each group renders as a collapsible `Spoiler`. Fields without a `group` are shown outside any spoiler. |
| `showToolbar` | `boolean` | `true` | Show/hide the Edit/Done toolbar button. |
| `ref` | `Ref<HTMLDivElement>` | — | Forwarded ref |

---

## Field types

All field types share these base props:

| Prop | Type | Description |
|------|------|-------------|
| `accessor` | `string` | **Required.** Key used to read/write the value from `data`. |
| `label` | `string` | Display label |
| `visible` | `boolean` | Hide field when `false` |
| `editable` | `boolean` | If `false`, field is read-only even in `edit` mode |
| `group` | `string` | Group name. Must match a `name` in `groups` array. |
| `placeholder` | `string` | Placeholder text |

### Type-specific options

| `type` | Extra props |
|--------|------------|
| `'string'` | `maxLength?: number` |
| `'text'` | `maxLength?: number` (multiline textarea) |
| `'number'` | `min?`, `max?`, `allowNegative?`, `digitsAfterPoint?` |
| `'currency'` | Same as `number` + `currency: string` (ISO currency code) |
| `'password'` | — |
| `'date'` | `level?: 'day' \| 'month' \| 'year'`, `minDate?`, `maxDate?`, `format?`, `clearable?` |
| `'boolean'` | `trueLabel?: ReactNode`, `falseLabel?: ReactNode` |
| `'select'` | `options: Option[]`, `multiple?: boolean`, `clearable?` |
| `'link'` | `linkTransformer?: (value) => string`, `linkText?: string \| (value) => string` |
| `'color'` | `colorPresets?: ColorPreset[]`, `allowPalette?`, `clearable?` |
| `'custom'` | `renderReadMode: (value) => ReactNode`, `renderEditMode: (value) => ReactNode`, `renderLoadingMode?: (value) => ReactNode` |

---

## Examples

### Basic read/edit

```tsx
const [data, setData] = useState({ name: 'Alice', age: 30 });
const [mode, setMode] = useState<'read' | 'edit' | 'loading'>('read');

<DataGrid
  data={data}
  mode={mode}
  onChangeMode={setMode}
  onChange={(field, value) => setData((d) => ({ ...d, [field]: value }))}
  fields={[
    { accessor: 'name', label: 'Full name', type: 'string', maxLength: 100 },
    { accessor: 'age',  label: 'Age',       type: 'number', min: 0, max: 150 },
  ]}
/>
```

### All field types

```tsx
<DataGrid
  data={record}
  mode={mode}
  onChangeMode={setMode}
  onChange={handleChange}
  fields={[
    { accessor: 'title',       label: 'Title',       type: 'string',   maxLength: 80 },
    { accessor: 'description', label: 'Description', type: 'text',     maxLength: 500 },
    { accessor: 'price',       label: 'Price',       type: 'currency', currency: 'USD' },
    { accessor: 'stock',       label: 'Stock',       type: 'number',   min: 0 },
    { accessor: 'apiKey',      label: 'API key',     type: 'password' },
    { accessor: 'publishedAt', label: 'Published',   type: 'date',     level: 'day', clearable: true },
    { accessor: 'active',      label: 'Active',      type: 'boolean',  trueLabel: 'Yes', falseLabel: 'No' },
    {
      accessor: 'category', label: 'Category', type: 'select',
      options: [
        { value: 'electronics', label: 'Electronics' },
        { value: 'clothing',    label: 'Clothing' },
      ],
    },
    {
      accessor: 'website', label: 'Website', type: 'link',
      linkText: 'Visit site',
      linkTransformer: (v) => String(v),
    },
    {
      accessor: 'color', label: 'Brand color', type: 'color',
      colorPresets: [{ name: 'blue', title: 'Blue', value: '#3b82f6' }],
    },
    {
      accessor: 'avatar', label: 'Avatar', type: 'custom',
      renderReadMode: (v) => <img src={String(v)} style={{ width: 48, height: 48, borderRadius: '50%' }} />,
      renderEditMode: (v) => <TextInput value={String(v)} onChange={(val) => handleChange('avatar', val)} />,
    },
  ]}
/>
```

### Grouped fields

Fields with a matching `group` key are rendered inside a `Spoiler` with the group's `title`.

```tsx
<DataGrid
  data={data}
  mode={mode}
  onChangeMode={setMode}
  onChange={handleChange}
  fields={[
    { accessor: 'id',        label: 'ID',         type: 'string', editable: false },
    { accessor: 'firstName', label: 'First name', type: 'string', group: 'personal' },
    { accessor: 'lastName',  label: 'Last name',  type: 'string', group: 'personal' },
    { accessor: 'position',  label: 'Position',   type: 'string', group: 'work' },
    { accessor: 'salary',    label: 'Salary',     type: 'currency', currency: 'USD', group: 'work' },
  ]}
  groups={[
    { name: 'personal', title: 'Personal Information' },
    { name: 'work',     title: 'Work Information' },
  ]}
/>
```

### Loading state

```tsx
<DataGrid
  data={data}
  mode="loading"
  onChange={handleChange}
  fields={fields}
/>
```

### Hiding the toolbar (external mode control)

```tsx
<DataGrid
  data={data}
  mode={mode}
  onChange={handleChange}
  fields={fields}
  showToolbar={false}
/>
<Button label={mode === 'edit' ? 'Done' : 'Edit'} onClick={() => setMode(m => m === 'edit' ? 'read' : 'edit')} />
```
