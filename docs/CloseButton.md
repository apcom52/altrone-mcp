# CloseButton

A pre-built icon button for closing/dismissing UI surfaces. Wraps `Button` with a fixed `X` icon, `showLabel={false}`, and a localized accessible label from `closeButton.ariaLabel`. The `tooltip` is intentionally set to an empty string so no tooltip is shown on hover.

## Import

```tsx
import { CloseButton } from 'altrone-ui';
```

---

## Props

`CloseButton` accepts all `Button` props **except** `label` (which is managed internally). The `label` prop is optional and ignored even if provided.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'submit' \| 'text'` | `'default'` | Inherited from Button |
| `size` | `'mini' \| 's' \| 'm' \| 'l' \| 'xl'` | `'m'` | Inherited from Button |
| `disabled` | `boolean` | `false` | Inherited from Button |
| `onClick` | `(e: MouseEvent) => void` | — | Click handler |

All other `Button` props are also accepted.

---

## Examples

### Basic

```tsx
<CloseButton onClick={handleClose} />
```

### Inside a header

```tsx
<div className="panel-header">
  <h2>Settings</h2>
  <CloseButton onClick={() => setOpen(false)} />
</div>
```

### Smaller size

```tsx
<CloseButton size="s" onClick={handleClose} />
```

---

## Notes

- The accessible name comes from the localization system (`closeButton.ariaLabel`). It changes automatically when the app `language` prop is set on `AltroneApplication`.
- No tooltip is shown — `tooltip=""` suppresses it intentionally (the icon is universally understood and a tooltip would create visual noise).
- Do not pass a `label` prop — it is stripped internally.
