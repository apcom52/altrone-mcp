# Form

A form container that propagates `size`, `disabled`, and `errorMessages` to all `Form.Field` children via context. It prevents the default browser submission unless the `<form>` has a native `action` (e.g. a Server Action), which it leaves to run.

## Import

```tsx
import { Form } from 'altrone-ui';
```

---

## Components

### Form

The container. Renders a `<form>` element.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'mini' \| 's' \| 'm' \| 'l' \| 'xl'` | `'m'` | Size passed down to all form controls via context |
| `disabled` | `boolean` | — | Disables all fields via context |
| `errorMessages` | `Record<string, string \| null \| undefined>` | `{}` | Map of field `name` → error message. `Form.Field` reads this by `name` to show inline errors. |
| `onSubmit` | `FormEventHandler` | — | Called on form submission. `preventDefault()` is called automatically **unless** the form has an `action` prop, so `<Form action={serverAction}>` works. |
| `ref` | `Ref<HTMLFormElement>` | — | Forwarded ref |

---

### Form.Field

A labeled wrapper for a form control. Reads `errorMessages[name]` from the parent `Form` context and marks itself invalid when an error is present.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | — | Field name. Must match a key in `Form`'s `errorMessages` for automatic error display. Also passed to inner inputs via context. |
| `label` | `string` | — | Field label text |
| `required` | `boolean` | — | Shows a required asterisk (`*`) after the label |
| `hintText` | `string` | — | Help text shown in a `Tooltip` on a `?` icon next to the label |
| `description` | `string` | — | Descriptive text shown below the control |
| `errorMessage` | `string` | — | Inline error message. Overrides any message from `Form`'s `errorMessages` context. |
| `disabled` | `boolean` | — | Disables this specific field. Overrides `Form`'s `disabled` context. |
| `ref` | `Ref<HTMLDivElement>` | — | Forwarded ref |

---

## Context propagation

`Form.Field` provides `FormFieldContext` to its children with `{ name, disabled, invalid, size }`. Native Altrone inputs (`TextInput`, `NumberInput`, `Select`, etc.) read this context automatically — you don't need to pass `name`, `disabled`, `invalid`, or `size` props manually when wrapping them in `Form.Field`.

---

## Examples

### Basic form

```tsx
const [values, setValues] = useState({ email: '', password: '' });

<Form onSubmit={() => handleLogin(values)}>
  <Form.Field name="email" label="Email" required>
    <TextInput
      value={values.email}
      onChange={(v) => setValues(s => ({ ...s, email: v }))}
    />
  </Form.Field>
  <Form.Field name="password" label="Password" required>
    <PasswordInput
      value={values.password}
      onChange={(v) => setValues(s => ({ ...s, password: v }))}
    />
  </Form.Field>
  <Button label="Sign in" variant="submit" type="submit" />
</Form>
```

### Error messages from validation

Pass an `errorMessages` object keyed by field `name`. Fields with matching keys automatically render in an invalid state with the error text.

```tsx
const [errors, setErrors] = useState<Record<string, string>>({});

const handleSubmit = () => {
  const newErrors: Record<string, string> = {};
  if (!values.email)    newErrors.email = 'Email is required';
  if (!values.password) newErrors.password = 'Password is required';
  if (Object.keys(newErrors).length) {
    setErrors(newErrors);
    return;
  }
  login(values);
};

<Form onSubmit={handleSubmit} errorMessages={errors}>
  <Form.Field name="email" label="Email" required>
    <TextInput value={values.email} onChange={…} />
  </Form.Field>
  <Form.Field name="password" label="Password" required>
    <PasswordInput value={values.password} onChange={…} />
  </Form.Field>
  <Button label="Sign in" variant="submit" type="submit" />
</Form>
```

### With hints and descriptions

```tsx
<Form.Field
  name="apiKey"
  label="API Key"
  hintText="You can find your API key in the developer settings."
  description="The key will be used for all API requests."
  required
>
  <PasswordInput value={apiKey} onChange={setApiKey} />
</Form.Field>
```

### Disabled form

```tsx
<Form disabled>
  <Form.Field name="name" label="Name">
    <TextInput value="Alice" onChange={() => {}} />
  </Form.Field>
</Form>
```

### Global size

```tsx
<Form size="l">
  <Form.Field name="search" label="Search">
    <TextInput placeholder="Type to search…" />
  </Form.Field>
</Form>
```

### Per-field error override

When `errorMessage` is set directly on `Form.Field`, it takes precedence over `Form`'s `errorMessages` context.

```tsx
<Form.Field name="slug" label="URL slug" errorMessage={slugError}>
  <TextInput value={slug} onChange={setSlug} />
</Form.Field>
```
