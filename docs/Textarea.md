# Textarea

A multi-line text input. Extends `TextInput` — supports the same island sub-components (`TextInput.ActionIsland`, `TextInput.IconIsland`, etc.) and reads from `FormFieldContext` when inside a `Form`.

## Import

```tsx
import { Textarea } from 'altrone-ui';
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
<Textarea value={bio} onChange={(v) => setBio(v)} placeholder="Tell us about yourself…" />
```

### With row count

```tsx
<Textarea
  value={description}
  onChange={(v) => setDescription(v)}
  rows={6}
  placeholder="Enter a detailed description…"
/>
```

### With character counter

```tsx
<Textarea
  value={message}
  onChange={(v) => setMessage(v)}
  maxLength={500}
  placeholder="Write your message…"
>
  <TextInput.CharCounterIsland placement="right" />
</Textarea>
```

### Invalid state

```tsx
<Textarea
  value={notes}
  onChange={(v) => setNotes(v)}
  invalid={notes.length === 0}
/>
```

### Inside a Form

```tsx
<Form errorMessages={{ description: ['Description is required'] }}>
  <Form.Field name="description" label="Description">
    <Textarea
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
<Textarea value={readonlyContent} onChange={() => {}} readOnly rows={8} />
```
