# PasswordInput

A text input for passwords with a show/hide toggle button. Wraps `TextInput` and appends an eye-icon action button via `TextInput.ActionIsland`. The toggle label is sourced from the localization context (`passwordInput.showPassword` / `passwordInput.hidePassword`).

## Import

```tsx
import { PasswordInput } from 'altrone-ui';
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | — | Controlled value |
| `onChange` | `(e: ChangeEvent<HTMLInputElement>) => void` | — | Change handler |
| `showControls` | `boolean` | `true` | Whether to show the eye-icon toggle button |
| `showIcon` | `ReactElement` | `Eye` | Icon for the "show password" toggle state |
| `hideIcon` | `ReactElement` | `EyeOff` | Icon for the "hide password" toggle state |
| `disabled` | `boolean` | `false` | Disables the input. Also inherited from `FormFieldContext`. |
| `invalid` | `boolean` | `false` | Error state styling. Also inherited from `FormFieldContext`. |
| `size` | `Size` | `'m'` | Input size. Also inherited from `FormFieldContext`. |
| `name` | `string` | — | Input name. Also inherited from `FormFieldContext`. |
| `placeholder` | `string` | — | Placeholder text |
| `ref` | `Ref<HTMLElement>` | — | Forwarded to the visual wrapper |
| `inputRef` | `Ref<HTMLInputElement>` | — | Forwarded to the underlying `<input>` |

All other `TextInputProps` are also accepted (except `type`, which is managed internally).

---

## Behavior

- Input `type` toggles between `"password"` and `"text"` when the user clicks the eye button.
- The toggle button has `aria-pressed` reflecting the current visibility state.
- When `showControls={false}`, the eye button is hidden and the input behaves as a plain password field.
- `disabled`, `invalid`, `size`, and `name` are read from `FormFieldContext` when inside a `Form.Field`.

---

## Examples

### Basic

```tsx
const [password, setPassword] = useState('');
<PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />
```

### Without toggle

```tsx
<PasswordInput
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  showControls={false}
/>
```

### With placeholder

```tsx
<PasswordInput
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  placeholder="Enter your password"
/>
```

### Inside a Form

```tsx
<Form errorMessages={{ password: ['Password must be at least 8 characters'] }}>
  <Form.Field name="password" label="Password">
    <PasswordInput
      value={form.password}
      onChange={(e) => setForm({ ...form, password: e.target.value })}
    />
  </Form.Field>
</Form>
```

### Login form

```tsx
<Flex orientation="vertical" gap="m">
  <TextInput
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    placeholder="Email"
  />
  <PasswordInput
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    placeholder="Password"
  />
  <Button label="Sign in" variant="submit" fullWidth onClick={handleLogin} />
</Flex>
```
