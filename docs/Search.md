# Search

A search input with an optional suggestion dropdown, a search icon, and a clear button. Extends `AutocompleteInput` (which extends `TextInput`) with search-specific styling: a full-width placeholder with a search icon when empty, and a clear button when the field has a value.

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
| `onChange` | `(value: string, event: ChangeEvent) => void` | — | Change handler — receives the string value first, the native event second. Also fires when the clear button empties the field. |
| `getSuggestions` | `(ctx: { value: string }) => Promise<T[]> \| T[]` | `() => []` | Async or sync function that returns suggestions. Called 300 ms after the last keystroke. Optional — omit it for a plain search field with no suggestions. |
| `showControls` | `boolean` | `true` | Whether to show the clear button and the loading spinner while the field has a value. Set to `false` to hide both. |
| `placeholder` | `string` | localized default | Placeholder text shown inside the styled placeholder overlay when the field is empty. |
| `disabled` | `boolean` | `false` | Disables the input |
| `ref` | `Ref<HTMLElement>` | — | Reference to the whole field. |
| `inputRef` | `Ref<HTMLInputElement>` | — | Reference to the `<input>` itself. |
| `searchIcon` | `ReactElement` | `Application.icons.search` | Overrides the search glyph (shown in the placeholder overlay and, once there's a value, at the field's start). |
| `clearIcon` | `ReactElement` | `Application.icons.clear` | Overrides the clear-button icon. |

All other `AutocompleteInputProps` are also accepted (except `type`, which is fixed to `"search"`): `getSuggestionValue`, `renderSuggestion`, `onSelect`, `onError`, `minChars`, `cacheResults`, `errorIcon` — and every `TextInput` prop (islands, `size`, `inputClassName`, …).

---

## Behavior

- **Empty state**: shows a full-width placeholder overlay with the search icon (`searchIcon` / `Application.icons.search`) and placeholder text. The standard HTML placeholder is not used.
- **Has value**: shows the search icon at the left and a clear icon button (`clearIcon` / `Application.icons.clear`) at the right (if `showControls` is true).
- **Clear button**: labelled "Clear" (localized) for assistive tech; dispatches a synthetic `change` event on the native input with value `""`, so React controlled state is updated correctly.
- **Custom children** (e.g. `TextInput.IconIsland`) are only rendered when the field has a value.
- **Loading / errors**: while `getSuggestions` runs, a `LoadingIsland` appears next to the clear button (only when `showControls` is not `false`); if it throws, `onError` is called and a warning icon is shown.
- **Accessible name**: the placeholder is an overlay, not the native `placeholder`, so give the field an `aria-label` or wrap it in `Form.Field` with a `label`.

---

## Examples

### Basic (no suggestions)

```tsx
const [query, setQuery] = useState('');
<Search value={query} onChange={setQuery} />
```

### With autocomplete suggestions

```tsx
const [query, setQuery] = useState('');

async function fetchSuggestions({ value }: { value: string }) {
  const res = await fetch(`/api/search?q=${encodeURIComponent(value)}`);
  return (await res.json()) as string[];
}

<Search
  value={query}
  onChange={setQuery}
  getSuggestions={fetchSuggestions}
/>
```

### Custom placeholder

```tsx
<Search
  value={query}
  onChange={setQuery}
  placeholder="Search products…"
/>
```

### Without clear button

```tsx
<Search
  value={query}
  onChange={setQuery}
  showControls={false}
/>
```

### Object suggestions

```tsx
type Article = { title: string; section: string };

<Search<Article>
  value={query}
  onChange={setQuery}
  getSuggestions={getArticles}
  getSuggestionValue={(article) => article.title}
  renderSuggestion={({ suggestion }) => <Text>{suggestion.title}</Text>}
  onSelect={(article) => openArticle(article)}
/>
```

### Custom icons

```tsx
<Search value={query} onChange={setQuery} searchIcon={<ScanSearch />} clearIcon={<Trash2 />} />
```

### Disabled

```tsx
<Search value="" onChange={() => {}} disabled />
```

### In a toolbar

```tsx
<Toolbar>
  <Toolbar.Leading>
    <Toolbar.Title title="Projects" />
  </Toolbar.Leading>
  <Toolbar.Center>
    <Search
      value={searchQuery}
      onChange={setSearchQuery}
      placeholder="Search items…"
      aria-label="Search items"
    />
  </Toolbar.Center>
</Toolbar>
```
