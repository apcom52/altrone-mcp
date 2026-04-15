# Select

A dropdown select input. Supports single and multiple selection, search filtering, a clear button, and a transparent variant. Built on `Dropdown` with a `TextInput` trigger and a scrollable options list.

## Import

```tsx
import { Select } from 'altrone-ui';
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `Value \| Value[]` | — | Controlled selected value. Use `string` for single, `string[]` for multiple. |
| `onChange` | `(value?: Value, event?: MouseEvent) => void` | — | **Required.** Called when the selection changes. |
| `options` | `Option[]` | — | **Required.** List of available options. |
| `multiple` | `boolean` | `false` | Enable multi-select mode. `value` must be an array. |
| `clearable` | `boolean` | `false` | Show a clear (×) button when a value is selected. |
| `searchable` | `boolean` | `false` | Allow filtering options by typing. Switches the input to a text field on focus. |
| `size` | `Size` | `'m'` | Input size: `'s' \| 'm' \| 'l'` |
| `transparent` | `boolean` | `false` | Removes the border/background for inline use |
| `placeholder` | `string` | — | Placeholder shown when no value is selected |
| `parentWidth` | `boolean` | `true` | Make the dropdown panel match the trigger width |
| `disabled` | `boolean` | `false` | Disables the input |
| `name` | `string` | auto-generated | HTML `name` for the hidden `<input>` (form submission). Multiple mode uses `name[]`. |
| `asChild` | `boolean` | `false` | Render a custom trigger element (see below) |
| `children` | `ReactElement` | — | Custom trigger when `asChild={true}`. Receives `SelectContext` as props. |
| `ref` | `Ref<HTMLDivElement>` | — | Forwarded ref |

### Option

```ts
type Option = {
  value: string;
  label: string;
  disabled?: boolean;
};
```

---

## Behavior

- **Single mode**: selecting an option closes the dropdown immediately.
- **Multiple mode**: the dropdown stays open after each selection; close by clicking outside.
- **Searchable**: on focus, the input becomes editable and filters options. The selected value label is shown as placeholder while typing.
- **Clear button** (`clearable`): calls `onChange(undefined)` for single, `onChange([])` for multiple.
- `parentWidth={true}` (default) aligns the dropdown panel width to the trigger. Set to `false` for a free-width dropdown.

---

## Examples

### Basic single select

```tsx
const [country, setCountry] = useState<string | undefined>();

<Select
  value={country}
  onChange={(v) => setCountry(v)}
  placeholder="Select a country"
  options={[
    { value: 'us', label: 'United States' },
    { value: 'gb', label: 'United Kingdom' },
    { value: 'de', label: 'Germany' },
  ]}
/>
```

### Clearable

```tsx
<Select
  value={filter}
  onChange={(v) => setFilter(v)}
  options={statusOptions}
  clearable
  placeholder="All statuses"
/>
```

### Multiple selection

```tsx
const [tags, setTags] = useState<string[]>([]);

<Select
  value={tags}
  onChange={(v) => setTags(v ?? [])}
  options={tagOptions}
  multiple
  placeholder="Select tags"
/>
```

### Searchable

```tsx
<Select
  value={user}
  onChange={(v) => setUser(v)}
  options={userOptions}
  searchable
  placeholder="Search users…"
/>
```

### Transparent variant

```tsx
<Select
  value={view}
  onChange={(v) => setView(v)}
  options={viewOptions}
  transparent
/>
```

### Sizes

```tsx
<Select value={v} onChange={setV} options={opts} size="s" />
<Select value={v} onChange={setV} options={opts} size="m" />
<Select value={v} onChange={setV} options={opts} size="l" />
```

### Custom trigger (asChild)

Pass `asChild` and a child element. The child receives `SelectContext` props (`expanded`, `value`, `selectedOptions`, `disabled`, `multiple`, `clearValue`).

```tsx
<Select
  value={country}
  onChange={(v) => setCountry(v)}
  options={countryOptions}
  asChild
>
  <Button
    label={selectedCountry?.label ?? 'Select country'}
    additionalIcon={<ChevronDown />}
  />
</Select>
```

### Inside a Form

```tsx
<Form>
  <Form.Field name="role" label="Role">
    <Select
      value={form.role}
      onChange={(v) => setForm({ ...form, role: v })}
      options={roleOptions}
      placeholder="Choose a role"
    />
  </Form.Field>
</Form>
```
