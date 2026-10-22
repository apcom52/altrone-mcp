# CloseButton

A pre-built icon button for closing/dismissing UI surfaces. Wraps `Button` with the shared `dismiss` icon role (an `X` by default; overridable per button via `icon` or globally via `Application`'s `icons`), `showLabel={false}`, and a localized accessible label from `closeButton.ariaLabel`. The `tooltip` is intentionally set to an empty string so no tooltip is shown on hover.

## Import

```tsx
import { CloseButton } from 'altrone-ui';
```

---

## Props

`CloseButton` exposes a curated subset, not the whole `Button` surface. `showLabel`/`tooltip` are locked and cannot be overridden; `icon` can.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'mini' \| 's' \| 'm' \| 'l' \| 'xl'` | `'m'` | Control tier, forwarded to `Button`. `mini` is 16px with a 24px hit area |
| `icon` | `ReactElement` | `useIcons().dismiss` (`X`) | Overrides the glyph on this button |
| `label` | `string` | localized `closeButton.ariaLabel` | Overrides the accessible name |
| `disabled` | `boolean` | `false` | — |
| `onClick` | `(e: MouseEvent) => void` | — | Click handler |
| `asChild` | `boolean` | `false` | Render onto a custom child element instead of a `<button>` |
| `ref` | `Ref<HTMLButtonElement>` | — | Forwarded to the button element |

Plus the native `<button>` attributes (`id`, `type`, `data-*`, `onFocus`, …) except `aria-label` — use `label` for that. `Button`-only props such as `variant`, `badge`, `state` or `additionalIcon` are **not** accepted.

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

### Custom icon

```tsx
import { CircleX } from 'lucide-react';

<CloseButton icon={<CircleX />} />

<Application icons={{ dismiss: <CircleX /> }}>
  <App />
</Application>
```

`icon` replaces the cross on one button. The `dismiss` role in `Application`'s `icons` replaces it for every `CloseButton` without its own `icon`, including those built into `Modal`, `Drawer`, `Popover`, `Message`, toasts and notifications.

---

## Notes

- The accessible name comes from the localization system (`closeButton.ariaLabel`). It changes automatically when the app `language` prop is set on `Application`.
- Override the accessible name with `label` when one close button among several needs to be more specific (e.g. `label="Dismiss notification"`).
- No tooltip is shown — the auto-tooltip is suppressed intentionally (the icon is universally understood and a tooltip would create visual noise).
