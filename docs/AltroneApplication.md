# AltroneApplication

The root wrapper component for every Altrone UI app. It sets up the theme, accent color, localization, dialog system, and toast notifications. Must be placed at the top of the component tree — all other Altrone components must be rendered inside it.

## Import

```tsx
import { AltroneApplication } from 'altrone-ui';
```

---

## What it provides

Rendering `AltroneApplication` sets up the following globally:

- **Theme** — `light`, `dark`, or `auto` (follows `prefers-color-scheme`). Applies `AltroneDark` class to both `<html>` and the root element so portals inherit CSS variables correctly.
- **Accent color** — applied via `data-altrone-accent` attribute; controls the primary color token across all components.
- **Localization** — passes `language` and `customLabels` to all components that have built-in text strings.
- **Dialog system** — mounts `DialogProvider` so `useDialog` / `Dialog` work anywhere in the tree.
- **Toast** — mounts the toast container so `useToast` works anywhere in the tree.
- **Locale warning** — logs a console warning in development if `config.locale.locale` is not set.

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `theme` | `'auto' \| 'light' \| 'dark'` | `'auto'` | Color theme. `auto` follows the OS `prefers-color-scheme` and updates at runtime when the system theme changes. |
| `accent` | `'red' \| 'pink' \| 'purple' \| 'indigo' \| 'blue' \| 'teal' \| 'amber' \| 'brown'` | `'blue'` | Accent color for the design system |
| `language` | `'en' \| 'ru' \| 'fr' \| 'ge' \| 'sp'` | `'en'` | Language for built-in component labels (e.g. empty state text, validation messages) |
| `customLabels` | `Partial<Localization>` | `{}` | Override individual localization strings without replacing the full locale |
| `config` | `Partial<ConsumerConfigurationContext>` | — | Low-level per-component configuration (e.g. `locale.locale` for date/number formatting) |
| `sidebar` | `ScreenProps['sidebar']` | — | Sidebar layout config passed to the inner `Screen` component |
| `header` | `ScreenProps['header']` | — | Header layout config passed to the inner `Screen` component |
| `ref` | `Ref<HTMLDivElement>` | — | Forwarded ref to the root `<div>` |

All standard `HTMLAttributes<HTMLDivElement>` are also accepted.

---

## Examples

### Minimal setup

```tsx
import { AltroneApplication } from 'altrone-ui';

export default function App() {
  return (
    <AltroneApplication>
      {/* your app */}
    </AltroneApplication>
  );
}
```

### With theme and accent

```tsx
<AltroneApplication theme="dark" accent="purple">
  <App />
</AltroneApplication>
```

### With locale config

The `config.locale.locale` string is a standard BCP 47 locale tag used for date and number formatting. Without it a console warning is shown in development.

```tsx
<AltroneApplication
  theme="auto"
  accent="blue"
  language="en"
  config={{ locale: { locale: 'en-US' } }}
>
  <App />
</AltroneApplication>
```

### Forced light/dark theme

```tsx
<AltroneApplication theme="light">
  <App />
</AltroneApplication>
```

### Overriding individual labels

```tsx
<AltroneApplication
  language="en"
  customLabels={{ 'autocompleteInput.loadError': 'Failed to load suggestions' }}
>
  <App />
</AltroneApplication>
```

---

## Behavior details

- When `theme="auto"`, the component listens to `window.matchMedia('(prefers-color-scheme: dark)')` and updates the theme in real time if the system setting changes.
- `AltroneDark` CSS class is applied to both `<html>` (for scrollbar and selection styles) and the root element (so portals rendered inside `data-altrone-root` also inherit dark-mode CSS variables).
- The component renders the inner layout via `Screen`, which means `sidebar` and `header` props can be used to define the top-level application layout.
