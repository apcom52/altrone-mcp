# Switch

A toggle switch. Same controlled contract as `Checkbox`, but rendered as a sliding pill and reported to assistive tech as `role="switch"`. Renders a `<label>` wrapping a visually-hidden (but focusable, screen-reader-visible) `<input type="checkbox" role="switch">`.

## Import

```tsx
import { Switch } from 'altrone-ui';
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | `false` | Whether the switch is on |
| `onChange` | `(nextChecked: boolean, event: ChangeEvent<HTMLInputElement>) => void` | — | **Required.** Called with the **next** value (`!checked`), not `event.target.checked`. |
| `children` | `ReactNode` | — | Optional label rendered next to the switch |
| `disabled` | `boolean` | `false` | Disables the switch (applied to the native `<input>`) |
| `danger` | `boolean` | `false` | Applies danger (red) color to the label |
| `size` | `'mini' \| 's' \| 'm' \| 'l' \| 'xl'` | `'m'` | Scales the track, handle and label type; the row stays ≥24px tall |
| `name` | `string` | — | HTML `name` attribute on the `<input>`, for form submission |
| `ref` | `Ref<HTMLLabelElement>` | — | Forwarded ref to the root `<label>` |

All standard `LabelHTMLAttributes<HTMLLabelElement>` are also accepted.

> **Note:** `Switch` has no `indeterminate` state. For a three-state control, use `Checkbox`.

---

## Behavior

- `onChange` receives `!checked` as the first argument — already flipped, no need to read `event.target.checked`.
- **Keyboard**: focus lands on the real `<input>`; `Space` toggles it natively (`Enter` does not, matching native form controls).
- **Accessible name** comes from `children` (the `<label>` wraps the input). With no `children`, pass `aria-label` / `aria-labelledby` — they are forwarded to the `<input>`, not the wrapper.
- The `<input>` is visually hidden but stays in the accessibility tree and participates in form submission via `name`.

---

## Examples

### Basic

```tsx
const [enabled, setEnabled] = useState(false);
<Switch aria-label="Wi-Fi" checked={enabled} onChange={setEnabled} />
```

### With label

```tsx
<Switch checked={notifications} onChange={setNotifications}>
  Email notifications
</Switch>
```

### Sizes

```tsx
<Switch size="s" checked={on} onChange={setOn}>Compact row</Switch>
<Switch size="l" checked={on} onChange={setOn}>Large</Switch>
```

### Disabled

```tsx
<Switch checked disabled>Always on for this workspace</Switch>
```

### Danger

Use `danger` for switches that enable a destructive or high-risk mode.

```tsx
<Switch checked={deleteMode} onChange={setDeleteMode} danger>
  Enable bulk delete mode
</Switch>
```

### In a settings list

```tsx
<Flex orientation="vertical" gap="m">
  {settings.map(({ key, label }) => (
    <Flex key={key} justify="between" align="center">
      <Switch checked={values[key]} onChange={(v) => set(key, v)}>
        {label}
      </Switch>
    </Flex>
  ))}
</Flex>
```
