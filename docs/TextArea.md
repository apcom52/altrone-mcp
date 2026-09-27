# TextArea

A multi-line text input. Extends `TextInput` — supports the same island sub-components (`TextInput.ActionIsland`, `TextInput.IconIsland`, etc.) and reads from `FormFieldContext` when inside a `Form`.

Unlike `TextInput`'s always-`pill` wrapper, `TextArea`'s wrapper is `rounded` at a 16px radius (the corner a `pill` `TextInput` of the default size resolves to) — a capsule end makes no sense on a box that grows vertically. This isn't configurable.

## Import

```tsx
import { TextArea } from 'altrone-ui';
```

---

## Props

All `TextInputProps` are accepted, **except** `type` (managed internally) and `ref` (see below).

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | — | Controlled value |
| `onChange` | `(value: string, event: ChangeEvent) => void` | — | Change handler. Receives the **string value** directly, not the event. |
| `invalid` | `boolean` | `false` | Error state styling. Also read from `FormFieldContext`. |
| `size` | `Size` | `'m'` | Input size. Also read from `FormFieldContext`. |
| `name` | `string` | — | Input name. Also read from `FormFieldContext`. |
| `disabled` | `boolean` | `false` | Disables the textarea. Also read from `FormFieldContext`. |
| `readOnly` | `boolean` | — | Makes the textarea read-only |
| `placeholder` | `string` | — | Placeholder text |
| `rows` | `number` | — | Number of visible rows (native `rows` attribute) |
| `maxLength` | `number` | — | Maximum character count (use with `TextInput.CharCounterIsland`) |
| `ref` | `Ref<HTMLTextAreaElement>` | — | Forwarded ref to the `<textarea>` element |

---

## Examples

### Basic

```tsx
const [bio, setBio] = useState('');
<TextArea value={bio} onChange={(v) => setBio(v)} placeholder="Tell us about yourself…" />
```

### With row count

```tsx
<TextArea
  value={description}
  onChange={(v) => setDescription(v)}
  rows={6}
  placeholder="Enter a detailed description…"
/>
```

### Islands render as a footer

Island children (`TextInput.CharCounterIsland`, `TextInput.CustomIsland`, …) don't
share the text's line the way they do on a single-line `TextInput` — on a
`TextArea` they lay out as a footer *below* the text: full-width textarea on top,
islands on a row under it (`placement="start"` left, `placement="end"` right).

```tsx
<TextArea
  value={message}
  onChange={(v) => setMessage(v)}
  maxLength={500}
  placeholder="Write your message…"
>
  <TextInput.CustomIsland placement="start" style={{ pointerEvents: 'none' }}>
    <Text size={1} color="muted">⌘↵ to send</Text>
  </TextInput.CustomIsland>
  <TextInput.CharCounterIsland placement="end" />
</TextArea>
```

`CharCounterIsland` reads `value` / `maxLength` from context and shows
`length/max`, turning red past the limit on its own.

### Invalid state

```tsx
<TextArea
  value={notes}
  onChange={(v) => setNotes(v)}
  invalid={notes.length === 0}
/>
```

### Inside a Form

```tsx
<Form errorMessages={{ description: ['Description is required'] }}>
  <Form.Field name="description" label="Description">
    <TextArea
      value={form.description}
      onChange={(v) => setForm({ ...form, description: v })}
      rows={4}
      placeholder="Describe your project…"
    />
  </Form.Field>
</Form>
```

### Read-only

```tsx
<TextArea value={readonlyContent} onChange={() => {}} readOnly rows={8} />
```
