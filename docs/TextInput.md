# TextInput

A styled text input with a composable island system for icons, action buttons, text prefixes/suffixes, loading indicators, and character counters. Reads `name`, `disabled`, `invalid`, and `size` from `FormFieldContext` when inside a `Form`.

The visual frame (fill, border, corner radius, elevation, and the focus ring while typing) is a `Box` primitive, so `TextInput` shares one material system with `Button` and other chip-like controls. `variant="default"` maps to Box's `plate` material (frosted fill + hairline), `variant="transparent"` to Box's `transparent` material.

## Import

```tsx
import { TextInput } from 'altrone-ui';
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | — | Controlled value |
| `onChange` | `(value: string, event: ChangeEvent) => void` | — | Change handler. Receives the **string value** first, then the event. |
| `variant` | `'default' \| 'transparent'` | `'default'` | Visual style. `default` is a frosted `plate` surface; `transparent` has no fill or border at rest and washes in the same tint on hover and focus. |
| `shape` | `BoxShape` (`'rect' \| 'rounded' \| 'squircle' \| 'circle' \| 'pill'`) | `'pill'` | Corner shape of the visual wrapper. `pill` (the default) is right for a single-line field; `Textarea` overrides it with `'rounded'`. |
| `invalid` | `boolean` | `false` | Error state (`aria-invalid` + danger tone). Also read from `FormFieldContext`. |
| `size` | `Size` | `'m'` | Field size: `'mini' \| 's' \| 'm' \| 'l' \| 'xl'`. Also read from `FormFieldContext`. |
| `name` | `string` | — | Input name. Also read from `FormFieldContext`. |
| `disabled` | `boolean` | `false` | Disables the input. Also read from `FormFieldContext`. |
| `readOnly` | `boolean` | — | Makes the input read-only |
| `readonlyStyles` | `boolean` | `true` | When `readOnly`, drop the material so the value reads as plain text (still focusable for copy) |
| `asChild` | `boolean` | `false` | Replace the `<input>` with a custom element. The first non-island child is used as the field element. |
| `wrapperClassName` | `string` | — | Extra class for the visual wrapper (the `Box`). `className` targets the `<input>`. |
| `wrapperStyle` | `CSSProperties` | — | Inline styles for the visual wrapper. `style` targets the `<input>`. |
| `ref` | `Ref<HTMLElement>` | — | Forwarded to the visual wrapper element |
| `inputRef` | `Ref<HTMLInputElement>` | — | Forwarded to the underlying `<input>` (or the `asChild` element) |

All standard `InputHTMLAttributes<HTMLInputElement>` are accepted (except `onChange`, `size`, `children`).

---

## Island sub-components

Islands are passed inside the input as children. Each is pulled out of the content and laid into a flex row beside the input — `placement="start"` (the default) or `placement="end"`. The passive islands (`TextIsland`, `IconIsland`, `CustomIsland`, `LoadingIsland`, `CharCounterIsland`) are plain inline chips; `ActionIsland` is a `Button`.

### TextInput.IconIsland

A non-interactive icon.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | `ReactElement` | — | **Required.** Icon element |
| `placement` | `'start' \| 'end'` | `'start'` | Position inside the input |

---

### TextInput.ActionIsland

A clickable button inside the input (e.g. a clear or show/hide button). It **is** a `<Button variant="default">` — it accepts the whole `Button` prop set (`state`, `badge`, `tooltip`, `selected`, `additionalIcon`, …) except `variant`, which is locked to the in-field `plate` chip. `size` defaults to one tier below the field. When `showLabel` is `false` it is a circular icon-only button with an automatic tooltip from `label`. A disabled field disables its `ActionIsland`s (its own `disabled` prop is OR-ed with the field's).

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | **Required.** Label text; also the `aria-label` and tooltip when `showLabel` is false |
| `icon` | `ReactElement` | — | Icon |
| `showLabel` | `boolean` | `true` | Whether to show the label text alongside the icon |
| `placement` | `'start' \| 'end'` | `'start'` | Position inside the input |
| `danger` | `boolean` | `false` | Danger tone for destructive actions |
| `state` | `'idle' \| 'loading' \| 'succeeded' \| 'failed'` | `'idle'` | Async state (from `Button`) |
| `ref` | `Ref<HTMLButtonElement>` | — | Forwarded to the button |

Plus every other `Button` prop except `variant`.

---

### TextInput.TextIsland

A static text prefix or suffix (e.g. units, currency symbols).

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | **Required.** Text to display |
| `placement` | `'start' \| 'end'` | `'start'` | Position inside the input |

---

### TextInput.LoadingIsland

A spinner island shown during async operations. Carries `role="status"` and a localized `aria-label`.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `placement` | `'start' \| 'end'` | `'start'` | Position inside the input |

---

### TextInput.CustomIsland

A free-form island for arbitrary content (e.g. the number spinner in `NumberInput`). Keeps pointer events so its content stays interactive.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `placement` | `'start' \| 'end'` | `'start'` | Position inside the input |

---

### TextInput.CharCounterIsland

Shows the current character count. Shows `valueLength/maxLength` when `maxLength` is set on the input; turns red when the limit is exceeded.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `placement` | `'start' \| 'end'` | `'start'` | Position inside the input |

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
  <TextInput.IconIsland icon={<Mail />} placement="start" />
</TextInput>
```

### With clear button

```tsx
<TextInput value={search} onChange={(v) => setSearch(v)}>
  <TextInput.IconIsland icon={<Search />} placement="start" />
  {search && (
    <TextInput.ActionIsland
      label="Clear"
      icon={<X />}
      showLabel={false}
      placement="end"
      onClick={() => setSearch('')}
    />
  )}
</TextInput>
```

### With text prefix (currency)

```tsx
<TextInput value={amount} onChange={(v) => setAmount(v)} placeholder="0.00">
  <TextInput.TextIsland label="$" placement="start" />
</TextInput>
```

### With loading indicator

```tsx
<TextInput value={query} onChange={(v) => setQuery(v)}>
  {isLoading && <TextInput.LoadingIsland placement="end" />}
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
  <TextInput.CharCounterIsland placement="end" />
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

### Accessing the input node

```tsx
const inputRef = useRef<HTMLInputElement>(null);

<TextInput value={v} onChange={setV} inputRef={inputRef} />;
// `ref` points at the visual wrapper; `inputRef` points at the <input>.
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
