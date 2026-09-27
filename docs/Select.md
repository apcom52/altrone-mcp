# Select

A dropdown select input. Supports single and multiple selection, search filtering, a clear button, and a transparent variant. Built on `Dropdown` with a `TextInput` trigger and a scrollable options list.

## Import

```tsx
import { Select, useSelectContext } from 'altrone-ui';
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string \| string[]` | — | Controlled selected value. `string` for single, `string[]` for `multiple`. |
| `onChange` | `(value: string \| string[] \| undefined, event?: MouseEvent \| KeyboardEvent) => void` | — | **Required.** Called when the selection changes. `event` is passed when it originates from a DOM event (e.g. the clear button); option picks currently carry no event. |
| `options` | `Option[]` | — | **Required.** List of available options. `Option.disabled` greys out and blocks a row. |
| `multiple` | `boolean` | `false` | Enable multi-select mode. `value` must be an array. |
| `clearable` | `boolean` | `false` | Show a clear (×) button when a value is selected. |
| `searchable` | `boolean` | `false` | Allow filtering options by typing. Switches the input to a text field on focus. |
| `size` | `Size` | `'m'` | Control size (`mini \| s \| m \| l \| xl`), passed to the underlying `TextInput`. |
| `transparent` | `boolean` | `false` | Removes the border/background for inline use |
| `placeholder` | `string` | — | Placeholder shown when no value is selected |
| `parentWidth` | `boolean` | `true` | Make the dropdown panel match the trigger width |
| `menuHeight` | `number` | `--select-menu-height` (250) | Max height of the options list, px. The list fits its content and only scrolls past this. |
| `disabled` | `boolean` | `false` | Disables the input |
| `name` | `string` | auto-generated | HTML `name` for the hidden `<input>` (form submission). Multiple mode uses `name[]`. |
| `openIcon` | `ReactElement` | shared `icons.open` | Trigger chevron shown while the menu is closed. |
| `closeIcon` | `ReactElement` | shared `icons.close` | Trigger chevron shown while the menu is open. |
| `searchIcon` | `ReactElement` | shared `icons.search` | Icon shown in the trigger while `searchable` and actively searching. |
| `clearIcon` | `ReactElement` | shared `icons.clear` | Icon for the clear button. |
| `asChild` | `boolean` | `false` | Use `children` as the trigger element (see below) |
| `children` | `ReactElement` | — | Custom trigger when `asChild={true}`. Read select state inside it with `useSelectContext()`. |
| `ref` | `Ref<HTMLDivElement>` | — | Forwarded to the wrapper element |

### Option

```ts
type Option = {
  value: string;
  label: string;
  disabled?: boolean;
};
```

### SelectContext

The state exposed via `useSelectContext()` to any component rendered inside an
`asChild` trigger:

```ts
type SelectContextValue = {
  expanded: boolean;                       // dropdown open
  value: string | string[] | undefined;
  selectedOptions: Option | Option[] | undefined;
  disabled: boolean;
  multiple: boolean;
  clear: (event?) => void;
};
```

---

## Behavior

- **Single mode**: selecting an option closes the dropdown immediately.
- **Multiple mode**: the dropdown stays open after each selection, and a search query is kept between picks; close by clicking outside.
- **Searchable**: on focus, the input becomes editable and filters options by case-insensitive substring. The selected value label is shown as placeholder while typing. When nothing matches, the menu shows the localized `select.notFound` text.
- **Clear button** (`clearable`): calls `onChange(undefined, event)` for single, `onChange([], event)` for multiple.
- **Accessibility**: the trigger is `role="combobox"` with `aria-expanded` / `aria-controls`; the menu is `role="listbox"` with `role="option"` rows.
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

### Custom trigger — `asChild` + `useSelectContext()`

Pass `asChild` and one child element. Read the select state from a nested
component with `useSelectContext()` (throws outside `<Select>`).

```tsx
const CountryTrigger = ({ ref }: { ref?: Ref<HTMLButtonElement> }) => {
  const { expanded, selectedOptions } = useSelectContext();
  return (
    <Button
      ref={ref}
      label={(selectedOptions as Option | undefined)?.label ?? 'Select country'}
      additionalIcon={expanded ? <ChevronUp /> : <ChevronDown />}
    />
  );
};

<Select value={country} onChange={/* … */} options={countryOptions} asChild>
  <CountryTrigger />
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
