# Application

The root wrapper component for every Altrone UI app. It sets up the theme, accent color, localization, dialog system, and toast notifications. Must be placed at the top of the component tree — all other Altrone components must be rendered inside it.

## Import

```tsx
import { Application } from 'altrone-ui';
```

---

## What it provides

Rendering `Application` sets up the following globally:

- **Theme** — `light`, `dark`, or `auto` (follows `prefers-color-scheme`). Sets the `data-altrone-theme` attribute on both `<html>` and the root element so portals inherit the right CSS variables.
- **Document background** — mirrors the resolved app background color onto `<body>` and `<html>` (inline style, restored on unmount), re-applied when the theme changes. Keeps the browser overscroll / rubber-band area from flashing white on scroll (notably in Safari), since the color tokens are scoped to the root element and not to `<html>`.
- **Accent color** — applied via `data-altrone-accent` attribute; controls the primary color token across all components.
- **Localization** — passes `language` and `customLabels` to all components that have built-in text strings.
- **Dialog system** — mounts `DialogProvider` so `useDialog` / `Dialog` work anywhere in the tree.
- **Toast** — mounts the toast container so `useToast` works anywhere in the tree.

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `theme` | `'auto' \| 'light' \| 'dark'` | `'auto'` | Color theme. `auto` follows the OS `prefers-color-scheme` and updates at runtime when the system theme changes. |
| `accent` | `'red' \| 'pink' \| 'purple' \| 'indigo' \| 'blue' \| 'teal' \| 'amber' \| 'brown'` | `'blue'` | Accent color for the design system |
| `language` | `'en' \| 'ru' \| 'fr' \| 'ge' \| 'sp'` | `'en'` | Language for built-in component labels (e.g. empty state text, validation messages) |
| `customLabels` | `Partial<Localization>` | `{}` | Override individual localization strings without replacing the full locale |
| `toastPlacement` | `'start' \| 'end'` | `'end'` | Vertical placement of the toast stack: `start` = top, `end` = bottom (always centred horizontally). See `Toasts`. |
| `notificationSide` | `'start' \| 'end'` | `'end'` | Horizontal side of the notification stack: `start` = left, `end` = right. See `Toasts`. |
| `notificationPlacement` | `'start' \| 'end'` | `'end'` | Vertical placement of the notification stack: `start` = top, `end` = bottom. See `Toasts`. |
| `asChild` | `boolean` | `false` | Merge the root's attributes/classes onto the single child element instead of rendering a wrapping `<div>` (e.g. your own `<body>`). The child's own children become the provider tree's content. |
| `ref` | `Ref<HTMLDivElement>` | — | Forwarded ref to the root element |

All standard `HTMLAttributes<HTMLDivElement>` are also accepted.

---

## Examples

### Minimal setup

```tsx
import { Application } from 'altrone-ui';

export default function App() {
  return (
    <Application>
      {/* your app */}
    </Application>
  );
}
```

### With theme and accent

```tsx
<Application theme="dark" accent="purple">
  <App />
</Application>
```

### asChild — render as your own root element

```tsx
<Application asChild>
  <body>
    <App />
  </body>
</Application>
```

### Forced light/dark theme

```tsx
<Application theme="light">
  <App />
</Application>
```

### Overriding individual labels

```tsx
<Application
  language="en"
  customLabels={{ 'autocompleteInput.loadError': 'Failed to load suggestions' }}
>
  <App />
</Application>
```

---

## Behavior details

- When `theme="auto"`, the component listens to `window.matchMedia('(prefers-color-scheme: dark)')` and updates the theme in real time if the system setting changes.
- `Application` is a pure provider root — theme, locale, dialogs, toasts. It does not render a layout itself; compose your screen with the `Screen` component (`Screen.Header`/`Screen.Sidebar`/`Screen.Content`/`Screen.Footer`) inside `Application`'s `children`.
