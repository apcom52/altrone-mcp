# AutocompleteInput

A text input with a dropdown suggestion list. Extends `TextInput` — all `TextInput` props and island sub-components are available. Suggestions are fetched via a callback (sync or async) with built-in debounce, optional caching, keyboard navigation, and error display.

## Import

```tsx
import { AutocompleteInput } from 'altrone-ui';
```

---

## Key behaviors

- Suggestions are fetched **300 ms after the user stops typing** (debounced).
- The dropdown opens automatically when suggestions are returned and closes on `Escape` or after selection.
- Keyboard navigation: `↑` / `↓` to move through items, `Enter` to select the highlighted item.
- After a suggestion is selected the input value is updated via a synthetic React change event, ensuring compatibility with controlled inputs.
- When `cacheResults={true}`, results for a given input value are stored in a `Map` for the lifetime of the component. Navigating back to a cached prefix skips the network call.
- If `getSuggestions` throws, the error is passed to `onError` and an error icon (`Application.icons.error` by default, override via `errorIcon`) appears inside the input (via `TextInput.CustomIsland`).

---

## Props

`AutocompleteInput<T>` is generic — `T` is the type of each suggestion item. Defaults to `string`.

### AutocompleteInput-specific props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `getSuggestions` | `(ctx: { value: string }) => T[] \| Promise<T[]>` | — | **Required.** Called with the current input value after debounce. Returns suggestions synchronously or as a promise. |
| `getSuggestionValue` | `(suggestion: T) => string` | `String(suggestion)` | Extracts the string that will be written to the input after selection. Required when `T` is not `string`. |
| `renderSuggestion` | `(ctx: AutocompleteRenderSuggestionContext<T>) => ReactNode` | — | Custom renderer for the **content** of a suggestion row. The field itself wraps it in the interactive row — click target, keyboard navigation, and the sliding hover/focus highlight — so the renderer only returns what goes inside. When omitted, the plain `getSuggestionValue` string is shown. |
| `onSelect` | `(suggestion: T, inputValue: string, event) => void` | — | Called when the user selects a suggestion (click or Enter). |
| `onError` | `(error: unknown) => void` | — | Called when `getSuggestions` throws. |
| `minChars` | `number` | `1` | Minimum input length required before `getSuggestions` is called. |
| `cacheResults` | `boolean` | `false` | Cache suggestion results per input value for the component's lifetime. |
| `showControls` | `boolean` | — | Show/hide the loading island. Inherits from context when omitted. |
| `errorIcon` | `ReactElement` | `Application.icons.error` | Overrides the icon shown when `getSuggestions` throws. |

### Inherited from TextInput

All `TextInput` props are supported: `value`, `onChange`, `placeholder`, `invalid`, `size`, `variant`, `disabled`, `readOnly`, `inputClassName`, `inputStyle`, and so on. `className`/`style`/`ref` target the root (the visual wrapper); use `inputRef`/`inputClassName`/`inputStyle` for the `<input>` node.

### renderSuggestion context

```ts
type AutocompleteRenderSuggestionContext<T> = {
  inputValue: string;    // current value of the input
  suggestion: T;         // the suggestion item
};
```

Selection is handled by the row wrapper — a click or `Enter` on the highlighted
row writes `getSuggestionValue(suggestion)` to the input and fires `onSelect`.
The renderer does not wire selection itself.

---

## Examples

### Basic — string suggestions

```tsx
const [value, setValue] = useState('');

const getSuggestions = async ({ value }: { value: string }) => {
  const res = await fetch(`/api/search?q=${value}`);
  return res.json() as Promise<string[]>;
};

<AutocompleteInput
  value={value}
  onChange={setValue}
  getSuggestions={getSuggestions}
  placeholder="Search…"
/>
```

### Minimum characters

```tsx
<AutocompleteInput
  value={value}
  onChange={setValue}
  getSuggestions={getSuggestions}
  minChars={3}
  placeholder="Type at least 3 characters…"
/>
```

### Caching results

```tsx
<AutocompleteInput
  value={value}
  onChange={setValue}
  getSuggestions={getSuggestions}
  cacheResults
/>
```

### Object suggestions

When `T` is not `string`, provide `getSuggestionValue` to extract the string written to the input on selection.

```tsx
type Language = { name: string; year: number };

const getSuggestions = async ({ value }: { value: string }): Promise<Language[]> => {
  return LANGUAGES.filter(l => l.name.toLowerCase().startsWith(value.toLowerCase()));
};

<AutocompleteInput<Language>
  value={value}
  onChange={setValue}
  getSuggestions={getSuggestions}
  getSuggestionValue={(lang) => lang.name}
/>
```

### Custom suggestion renderer

Return only the row's content — the field supplies the button, the highlight and
keyboard navigation.

```tsx
<AutocompleteInput<Language>
  value={value}
  onChange={setValue}
  getSuggestions={getSuggestions}
  getSuggestionValue={(lang) => lang.name}
  renderSuggestion={({ suggestion, inputValue }) => (
    <>
      <strong>{suggestion.name.slice(0, inputValue.length)}</strong>
      {suggestion.name.slice(inputValue.length)}
      <span>{suggestion.year}</span>
    </>
  )}
/>
```

### Error handling

```tsx
<AutocompleteInput
  value={value}
  onChange={setValue}
  getSuggestions={getSuggestions}
  onError={(err) => console.error('Autocomplete failed:', err)}
/>
```

### onSelect callback

```tsx
<AutocompleteInput
  value={value}
  onChange={setValue}
  getSuggestions={getSuggestions}
  onSelect={(suggestion, inputValue) => {
    console.log('Selected:', suggestion, 'Written to input:', inputValue);
  }}
/>
```

### With TextInput islands

`AutocompleteInput` accepts the same `children` as `TextInput`, so islands work as usual.

```tsx
import { TextInput } from 'altrone-ui';
import { Globe } from 'lucide-react';

<AutocompleteInput
  value={value}
  onChange={setValue}
  getSuggestions={getSuggestions}
>
  <TextInput.IconIsland icon={<Globe size={16} />} placement="start" />
</AutocompleteInput>
```

---

## TypeScript

```ts
import type { AutocompleteInputProps, AutocompleteSuggestionsFunc } from 'altrone-ui';

const getSuggestions: AutocompleteSuggestionsFunc<Language> = async ({ value }) => { … };
```
