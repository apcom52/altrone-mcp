# Search

A search input with an optional suggestion dropdown, a search icon, and a clear button. Extends `AutocompleteInput` with search-specific styling: a full-width placeholder with a search icon when empty, and a clear (×) button when the field has a value.

Generic over the suggestion type — `Search<T>` — like `AutocompleteInput`. `T` defaults to `string`; pass an object type together with `getSuggestionValue` and `renderSuggestion` for rich results (see the docs-sidebar story).

## Import

```tsx
import { Search } from 'altrone-ui';
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | — | **Required.** Controlled value |
| `onChange` | `(value: string, event: ChangeEvent) => void` | — | **Required.** Change handler — receives the string value first. |
| `getSuggestions` | `(ctx: { value: string }) => Promise<T[]> \| T[]` | `() => []` | Async or sync function that returns suggestions. Optional — omit it for a plain search field with no dropdown (see the list-filter story). |
| `showControls` | `boolean` | `true` | Whether to show the clear button when value is non-empty. Set to `false` to hide it. |
| `placeholder` | `string` | localized default | Placeholder text shown inside the styled placeholder overlay when the field is empty. |
| `disabled` | `boolean` | `false` | Disables the input |
| `searchIcon` | `ReactElement` | `Application.icons.search` | Overrides the search glyph (shown in the placeholder overlay and, once there's a value, at the field's start). |
| `clearIcon` | `ReactElement` | `Application.icons.clear` | Overrides the clear-button icon. |

All other `AutocompleteInputProps` are also accepted (except `type`, which is fixed to `"search"`), including `errorIcon`.

---

## Behavior

- **Empty state**: shows a full-width placeholder overlay with the search icon (`searchIcon` / `Application.icons.search`) and placeholder text. The standard HTML placeholder is not used.
- **Has value**: shows the search icon at the left and a clear icon button (`clearIcon` / `Application.icons.clear`) at the right (if `showControls` is true).
- **Clear button**: dispatches a synthetic `change` event on the native input with value `""`, so React controlled state is updated correctly.
- **Custom children** (e.g. `TextInput.IconIsland`) are only rendered when the field has a value.

---

## Examples

### Basic (no suggestions)

```tsx
const [query, setQuery] = useState('');
<Search value={query} onChange={(e) => setQuery(e.target.value)} />
```

### With autocomplete suggestions

```tsx
const [query, setQuery] = useState('');

async function fetchSuggestions(q: string) {
  const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
  const data = await res.json();
  return data.results.map((r) => ({ value: r.id, label: r.name }));
}

<Search
  value={query}
  onChange={(e) => setQuery(e.target.value)}
  getSuggestions={fetchSuggestions}
/>
```

### Custom placeholder

```tsx
<Search
  value={query}
  onChange={(e) => setQuery(e.target.value)}
  placeholder="Search products…"
/>
```

### Without clear button

```tsx
<Search
  value={query}
  onChange={(e) => setQuery(e.target.value)}
  showControls={false}
/>
```

### Disabled

```tsx
<Search value="" onChange={() => {}} disabled />
```

### In a toolbar

```tsx
<Toolbar>
  <Toolbar.Section>
    <Search
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder="Search items…"
    />
  </Toolbar.Section>
</Toolbar>
```
