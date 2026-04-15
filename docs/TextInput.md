# TextInput

A styled text input with a composable island system for icons, action buttons, text prefixes/suffixes, loading indicators, and character counters. Reads `name`, `disabled`, `invalid`, and `size` from `FormFieldContext` when inside a `Form`.

## Import

```tsx
import { TextInput } from 'altrone-ui';
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | — | Controlled value |
| `onChange` | `(value: string, event: ChangeEvent) => void` | — | Change handler. Receives the **string value** directly, not the event. |
| `variant` | `'default' \| 'transparent'` | `'default'` | Visual style. `transparent` removes border and background. |
| `invalid` | `boolean` | `false` | Error state styling. Also read from `FormFieldContext`. |
| `size` | `Size` | `'m'` | Input size: `'mini' \| 's' \| 'm' \| 'l' \| 'xl'`. Also read from `FormFieldContext`. |
| `name` | `string` | — | Input name. Also read from `FormFieldContext`. |
| `disabled` | `boolean` | `false` | Disables the input. Also read from `FormFieldContext`. |
| `readOnly` | `boolean` | — | Makes the input read-only |
| `readonlyStyles` | `boolean` | `true` | Whether to apply visual readonly styles when `readOnly` is true |
| `asChild` | `boolean` | `false` | Replace the `<input>` with a custom element. The first non-island child is used as the input element. |
| `wrapperClassName` | `string` | — | Extra class for the outer wrapper `<div>` |
| `wrapperStyle` | `CSSProperties` | — | Inline styles for the outer wrapper |
| `ref` | `Ref<HTMLInputElement>` | — | Forwarded ref |

All standard `InputHTMLAttributes<HTMLInputElement>` are accepted (except `onChange`, `size`, `children`).

---

## Island sub-components

Islands are placed inside the input as children. They automatically appear inside the input field — to the left or right — and the input's padding is dynamically adjusted via `ResizeObserver` so text never overlaps them.

### TextInput.IconIsland

A non-interactive icon.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | `ReactElement` | — | **Required.** Icon element |
| `placement` | `'left' \| 'right'` | `'left'` | Position inside the input |

---

### TextInput.ActionIsland

A clickable button inside the input (e.g. a clear or show/hide button).

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | **Required.** Accessible label (used as `title` tooltip) |
| `icon` | `ReactElement` | — | Icon |
| `showLabel` | `boolean` | `true` | Whether to show the label text alongside the icon |
| `placement` | `'left' \| 'right'` | `'left'` | Position inside the input |
| `danger` | `boolean` | `false` | Red color for destructive actions |
| `ref` | `Ref<HTMLButtonElement>` | — | Forwarded ref |

---

### TextInput.TextIsland

A static text prefix or suffix (e.g. units, currency symbols).

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | **Required.** Text to display |
| `placement` | `'left' \| 'right'` | `'left'` | Position inside the input |

---

### TextInput.LoadingIsland

A spinner island shown during async operations.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `placement` | `'left' \| 'right'` | `'left'` | Position inside the input |

---

### TextInput.CustomIsland

A free-form island for arbitrary content (e.g. the number spinner in `NumberInput`).

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `placement` | `'left' \| 'right'` | `'left'` | Position inside the input |

---

### TextInput.CharCounterIsland

Shows the current character count. Shows `valueLength/maxLength` when `maxLength` is set on the input; turns red when the limit is exceeded.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `placement` | `'left' \| 'right'` | `'left'` | Position inside the input |

Requires `maxLength` (or just `value`) on the parent `TextInput` to read the current character count.

---

## Examples

### Basic

```tsx
<TextInput value={name} onChange={(v) => setName(v)} placeholder="Your name" />
```

### With icon

```tsx
<TextInput value={email} onChange={(v) => setEmail(v)}>
  <TextInput.IconIsland icon={<Mail />} placement="left" />
</TextInput>
```

### With clear button

```tsx
<TextInput value={search} onChange={(v) => setSearch(v)}>
  <TextInput.IconIsland icon={<Search />} placement="left" />
  {search && (
    <TextInput.ActionIsland
      label="Clear"
      icon={<X />}
      showLabel={false}
      placement="right"
      onClick={() => setSearch('')}
    />
  )}
</TextInput>
```

### With text prefix (currency)

```tsx
<TextInput value={amount} onChange={(v) => setAmount(v)} placeholder="0.00">
  <TextInput.TextIsland label="$" placement="left" />
</TextInput>
```

### With loading indicator

```tsx
<TextInput value={query} onChange={(v) => setQuery(v)}>
  {isLoading && <TextInput.LoadingIsland placement="right" />}
</TextInput>
```

### Character counter

```tsx
<TextInput
  value={bio}
  onChange={(v) => setBio(v)}
  maxLength={160}
  placeholder="Write a short bio…"
>
  <TextInput.CharCounterIsland placement="right" />
</TextInput>
```

### Transparent variant

```tsx
<TextInput value={title} onChange={(v) => setTitle(v)} variant="transparent" />
```

### Different sizes

```tsx
<TextInput value={v} onChange={setV} size="mini" />
<TextInput value={v} onChange={setV} size="s" />
<TextInput value={v} onChange={setV} size="m" />
<TextInput value={v} onChange={setV} size="l" />
<TextInput value={v} onChange={setV} size="xl" />
```

### Inside a Form

When placed inside `Form.Field`, `name`, `disabled`, `invalid`, and `size` are injected automatically from context.

```tsx
<Form errorMessages={{ username: ['Username is taken'] }}>
  <Form.Field name="username" label="Username">
    <TextInput value={form.username} onChange={(v) => setForm({ ...form, username: v })} />
  </Form.Field>
</Form>
```
