# Switcher

A toggle switch control. Semantically equivalent to a checkbox but rendered as a sliding pill. Has `role="switch"` and `aria-checked`.

## Import

```tsx
import { Switcher } from 'altrone-ui';
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | `false` | Whether the switch is on |
| `onChange` | `(nextChecked: boolean, event: ChangeEvent) => void` | — | Called with the **next** value (`!checked`), not `event.target.checked`. |
| `children` | `ReactNode` | — | Optional label rendered next to the switch |
| `disabled` | `boolean` | `false` | Disables the switch |
| `danger` | `boolean` | `false` | Applies danger (red) color to the active state |
| `name` | `string` | — | HTML name attribute for the hidden `<input type="checkbox">` |
| `ref` | `Ref<HTMLLabelElement>` | — | Forwarded ref |

All standard `LabelHTMLAttributes<HTMLLabelElement>` are also accepted.

> **Note:** `Switcher` does not have an `indeterminate` state. For a three-state control, use `Checkbox`.

---

## Behavior

- `onChange` receives `!checked` as the first argument — the value has already been flipped. There is no need to negate `event.target.checked`.
- Keyboard: `Enter` and `Space` toggle the switch.
- The underlying `<input type="checkbox">` is visually hidden but participates in form submission via `name`.

---

## Examples

### Basic

```tsx
const [enabled, setEnabled] = useState(false);
<Switcher checked={enabled} onChange={(v) => setEnabled(v)} />
```

### With label

```tsx
<Switcher checked={notifications} onChange={(v) => setNotifications(v)}>
  Email notifications
</Switcher>
```

### Disabled

```tsx
<Switcher checked={true} onChange={() => {}} disabled>
  Auto-save (locked)
</Switcher>
```

### Danger variant

Use `danger` for switches that enable a destructive or high-risk mode.

```tsx
<Switcher
  checked={deleteMode}
  onChange={(v) => setDeleteMode(v)}
  danger
>
  Enable bulk delete mode
</Switcher>
```

### In a settings list

```tsx
<Flex direction="vertical" gap="m">
  <Flex justify="space-between" align="center">
    <span>Dark mode</span>
    <Switcher checked={darkMode} onChange={(v) => setDarkMode(v)} />
  </Flex>
  <Flex justify="space-between" align="center">
    <span>Compact layout</span>
    <Switcher checked={compact} onChange={(v) => setCompact(v)} />
  </Flex>
  <Flex justify="space-between" align="center">
    <span>Notifications</span>
    <Switcher checked={notifications} onChange={(v) => setNotifications(v)} />
  </Flex>
</Flex>
```
