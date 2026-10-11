# Application

The root provider for every Altrone UI app. It sets up the theme, accent color, localization, shared icons, the dialog host, toasts/notifications and reduced-motion handling. It renders no layout of its own. Must be placed at the top of the component tree — all other Altrone components must be rendered inside it.

## Import

```tsx
import {
  Application,
  useAltroneTheme,
  useLocalization,
  useIcons,
  getThemeInitScript,
  setPageTitle,
  resetPageTitle,
} from 'altrone-ui';
```

Types: `ApplicationProps`, `Theme`, `Accent`, `Language`, `IconSet`.

---

## What it provides

Rendering `Application` sets up the following globally:

- **Theme** — `light`, `dark`, or `auto` (follows `prefers-color-scheme`). Sets the `data-altrone-theme` attribute on both the root element and `<html>`. Overlays (`Popover`, `Tooltip`, …) portal into an Altrone root element, so they inherit the theme and accent; the attribute on `<html>` covers global styles and the `<body>` fallback for triggers rendered outside any `Application`. Read/change it with `useAltroneTheme()` → `{ theme, setTheme }`.
- **Theme persistence** (opt-in via `persistTheme`) — remembers the resolved theme in `localStorage` (key `altrone-theme`) once the user has explicitly switched it, and restores it on the next visit ahead of `theme`/system preference.
- **FOUC prevention** — renders a blocking inline script that sets `data-altrone-theme` on `<html>` before the tree paints (best-effort). For a hard guarantee under streaming SSR, render `getThemeInitScript(theme, persistTheme)` in the document `<head>` yourself, with the same values you pass to `Application`.
- **Document background** — mirrors the resolved app background color onto `<body>` and `<html>` (inline style, restored on unmount), re-applied when the theme changes. Keeps the browser overscroll / rubber-band area from flashing white on scroll (notably in Safari), since the color tokens are scoped to the root element and not to `<html>`.
- **Accent color** — applied via `data-altrone-accent` attribute; controls the `--accent-*` tokens and the `info` status color across all components. `danger`/`success`/`warning` keep their own fixed hues.
- **Localization** — passes `language` and `customLabels` to all components that have built-in text strings. `useLocalization()` returns the translate function `t('component.key')` for your own components.
- **Icons** — passes `icons` to all components that share a common icon role (navigation chevrons, search/clear, error, help, status icons), letting you swap the built-in `lucide-react` glyphs for your own icon set in one place. `useIcons()` returns the resolved `IconSet`.
- **Dialog host** — mounts `DialogProvider` so the global `showAlert` / `showConfirm` / `showPrompt` functions work anywhere, including outside React. Without a mounted `Application` they log a warning and resolve immediately (`undefined` / `false` / `null`).
- **Toasts and notifications** — mounts the stacks so the global `showToast` / `showNotification` / `dismissNotification` functions work anywhere, including outside React.
- **Document title** (opt-out via `manageTitle`) — keeps `document.title` as "`<Screen.title>` - `<applicationName>`" (either half omitted if unset), updating automatically whenever the mounted `Screen`'s `title` changes. `setPageTitle` / `resetPageTitle` override or revert to the computed value from anywhere, including outside React.
- **Reduced motion** — wraps the tree in a motion config that follows `prefers-reduced-motion`, so JS-animated components respect it without per-component code.
- **Fonts** — loads the bundled Inter and JetBrains Mono variable fonts.

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `theme` | `'auto' \| 'light' \| 'dark'` | `'auto'` | Color theme. `auto` follows the OS `prefers-color-scheme` and updates at runtime when the system theme changes. |
| `persistTheme` | `boolean` | `false` | Remember the resolved theme (`light`/`dark`) in `localStorage` and restore it on the next visit, once the user has explicitly switched it at least once. Takes priority over `theme`/system preference after that point. |
| `accent` | `'red' \| 'orange' \| 'amber' \| 'green' \| 'teal' \| 'blue' \| 'indigo' \| 'purple' \| 'pink' \| 'brown'` | `'blue'` | Accent color for the design system |
| `applicationName` | `string` | — | Appended to `document.title` as "`<Screen.title>` - `applicationName`" whenever a `Screen` with a `title` is mounted. With no `Screen.title`, the document title is just `applicationName`. |
| `manageTitle` | `boolean` | `true` | `false` turns off the automatic `document.title` sync from `Screen.title`/`applicationName` — `setPageTitle` still works, you own `document.title` yourself otherwise. |
| `language` | `'en' \| 'ru' \| 'fr' \| 'de' \| 'es' \| 'zh' \| 'pt' \| 'tr'` | `'en'` | Language for built-in component labels (e.g. empty state text, validation messages) |
| `customLabels` | `Partial<Localization>` | `{}` | Override individual localization strings without replacing the full locale |
| `icons` | `Partial<IconSet>` | `{}` | Override the icon roles shared across components (see below). Icons unique to a single component are overridden via that component's own props instead. |
| `toastPlacement` | `'top' \| 'bottom'` | `'bottom'` | Vertical edge of the toast stack (always centred horizontally). See `Notifications`. |
| `notificationPlacement` | `'top-start' \| 'top-end' \| 'bottom-start' \| 'bottom-end'` | `'bottom-end'` | Corner of the notification stack. See `Notifications`. |
| `asChild` | `boolean` | `false` | Merge the root's attributes/classes onto the single child element instead of rendering a wrapping `<div>` (e.g. your own `<body>`). The child's own children become the provider tree's content. |
| `className` | `string` | — | Extra class name for the root element |
| `style` | `CSSProperties` | — | Inline styles for the root element |
| `ref` | `Ref<HTMLDivElement>` | — | Forwarded ref to the root element (or, with `asChild`, the child element it merges onto) |
| `children` | `ReactNode` | — | The app to render inside. With `asChild`, must be a single valid React element |

All other standard `HTMLAttributes<HTMLDivElement>` (`id`, `data-*`, `aria-*`, event handlers) are passed through to the root element.

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

### Persisting the user's theme choice

```tsx
<Application persistTheme>
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

### Overriding shared icons

```tsx
import { Application } from 'altrone-ui';
import { MyChevronLeft, MyChevronRight } from './my-icons';

<Application icons={{ prev: <MyChevronLeft />, next: <MyChevronRight /> }}>
  <App />
</Application>;
```

### Switching the theme from a component

```tsx
import { useAltroneTheme } from 'altrone-ui';

function ThemeSwitcher() {
  const { theme, setTheme } = useAltroneTheme();
  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      Current: {theme}
    </button>
  );
}
```

### Document title

```tsx
<Application applicationName="Altrone Mail">
  <Screen title="Inbox">{/* … */}</Screen>
</Application>
```

`document.title` becomes `"Inbox - Altrone Mail"`, and updates automatically if the mounted `Screen`'s `title` changes (e.g. navigating to a different screen).

```tsx
import { setPageTitle, resetPageTitle } from 'altrone-ui';

setPageTitle('3 unread — Inbox');
// ... later, once the user has read the messages
resetPageTitle();
```

`setPageTitle` overrides the computed value from anywhere (a store action, a data-fetch callback) until `resetPageTitle()` reverts to what `Screen.title`/`applicationName` currently compute.

```tsx
<Application manageTitle={false}>
  {/* Screen.title no longer touches document.title; setPageTitle still does */}
</Application>
```

### Toast and notification placement

```tsx
<Application toastPlacement="top" notificationPlacement="top-start">
  <App />
</Application>
```

### Next.js App Router

The library ships no `'use client'` boundary, so wrap `Application` in a client component and use that in the (server) root layout:

```tsx
// app/AltroneProvider.tsx
'use client';

import { Application } from 'altrone-ui';

export function AltroneProvider({ children }: { children: React.ReactNode }) {
  return <Application persistTheme>{children}</Application>;
}
```

### Hard FOUC guarantee under streaming SSR

```tsx
<head>
  <script
    dangerouslySetInnerHTML={{ __html: getThemeInitScript('auto', true) }}
  />
</head>
```

The arguments mirror `Application`'s `theme` and `persistTheme` props.

---

### Overriding part of the app

To change the theme, accent, language, labels or icons for one block only, wrap it in `Override` (see `Override.md`). Unset props are inherited from `Application`.

```tsx
<Override theme="dark" accent="red">
  <Button label="Delete project" />
</Override>
```

## `IconSet`

Roles shared by several components — override one role once via `icons` instead of
overriding it on every component that uses it. A component that only has a unique
icon (not shared with any other component) exposes its own local override prop
instead of joining this set — see that component's own docs.

| Role | Default | Used by |
|------|---------|---------|
| `prev` | `ChevronLeft` | Calendar, DatePicker, Pagination |
| `next` | `ChevronRight` | Calendar, DatePicker, Pagination |
| `open` | `ChevronDown` | ColorPicker, Select, CollapsedList |
| `close` | `ChevronUp` | ColorPicker, Select, CollapsedList |
| `search` | `Search` | Search, Select |
| `clear` | `Delete` | Search, Select |
| `error` | `CircleAlert` | AutocompleteInput, FilePicker |
| `help` | `HelpCircle` | Form, Tooltip |
| `info` | `Info` | Notifications, Result |
| `success` | `CheckCircle2` | Notifications, Result |
| `warning` | `AlertTriangle` | Notifications, Result |
| `danger` | `XCircle` | Notifications, Result |

Every value is a `ReactElement` (an already-instantiated icon, e.g. `<MyIcon />`),
matching how icon props work everywhere else in the library.

---

## Behavior details

- When `theme="auto"`, the component listens to `window.matchMedia('(prefers-color-scheme: dark)')` and updates the theme in real time if the system setting changes.
- `persistTheme` only starts overriding `theme`/system preference **after** the user has explicitly called `setTheme` once (via `useAltroneTheme()`) — it never hijacks the first render based on a stale stored value alone.
- `Application` is a pure provider root — theme, locale, icons, dialogs, toasts. It does not render a layout itself; compose your screen with the `Screen` component (`Screen.Header`/`Screen.Sidebar`/`Screen.Content`/`Screen.Footer`) inside `Application`'s `children`.
- Use **one instance per app**: each instance writes the theme to `<html>` and mirrors the background onto `<body>`, so a second instance conflicts with the first.
- Provider order (outermost first): theme → localization → icons → dialogs → notifications → `children`.
- Toast/notification placement is app-wide (`toastPlacement`, `notificationPlacement`), not per `showToast`/`showNotification` call.
- `setPageTitle`/`resetPageTitle`, like `showAlert`/`showToast`, log a warning and no-op without a mounted `Application`. An active override (`setPageTitle`) applies even when `manageTitle={false}`.
- The root element carries `data-altrone-root="true"`, `data-altrone-accent` and `data-altrone-theme`; design tokens and overlays hook into them.
