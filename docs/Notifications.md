# Notifications

An imperative notification system with two display modes: **toast** (pill-shaped, brief) and **notification** (rich card). `Notifications` is a provider component. Access its API via `useNotifications()`.

> `Application` already wraps the app in a `Notifications` provider — do not add another `<Notifications>` unless you're building outside `Application`.

## Placement

Placement is app-wide — there is no per-call `position`. Set it once, either on `<Application>` or on `<Notifications>` directly:

| Prop | Type | Default | Description |
|--------|------|---------|-------------|
| `toastPlacement` | `'start' \| 'end'` | `'end'` | Toast stack: `start` = top, `end` = bottom (always centred horizontally) |
| `notificationSide` | `'start' \| 'end'` | `'end'` | Notification stack: `start` = left, `end` = right |
| `notificationPlacement` | `'start' \| 'end'` | `'end'` | Notification stack: `start` = top, `end` = bottom |

```tsx
<Application toastPlacement="start" notificationSide="start" notificationPlacement="start">
  <App />
</Application>
```

## Import

```tsx
import { Notifications, useNotifications } from 'altrone-ui';
```

---

## Provider

### Notifications (provider)

Wrap your app (or a sub-tree) with `<Notifications>`. Manages all toast and notification state internally.

```tsx
<Notifications>
  <App />
</Notifications>
```

---

## Hook

### useNotifications()

Returns `{ toast, notification, dismiss }`.

---

## API

### toast(message, options?)

Shows a pill-shaped toast message. Returns the toast `id`.

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `variant` | `'default' \| 'success' \| 'warning' \| 'danger'` | `'default'` | Color and icon preset |
| `icon` | `ReactNode` | variant icon | Custom icon. Pass `null` to hide the icon. |
| `action` | `{ label: string; onClick: (e) => void }` | — | Optional action button inside the toast |
| `duration` | `number` | `4000` | Auto-close delay in ms |
| `autoClose` | `boolean` | `true` | Whether to auto-close |

---

### notification(options)

Shows a rich notification card. Returns the notification `id`.

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `content` | `ReactNode` | — | **Required.** Card body content |
| `title` | `string` | — | Card title |
| `image` | `string` | — | Full-width header image URL |
| `icon` | `ReactNode` | — | Icon next to the title |
| `actions` | `{ label: string; onClick: (e) => void; danger?: boolean }[]` | — | Action buttons at the bottom |
| `duration` | `number` | `6000` | Auto-close delay in ms |
| `autoClose` | `boolean` | `true` | Whether to auto-close |

---

### dismiss(id)

Programmatically closes a toast or notification by its id.

---

## Behavior

- Toast auto-close **pauses** while the pointer hovers over it and resumes on mouse leave.
- Toasts animate in/out with a `motion` spring transition (no third-party toast library).
- Both the toast pill and the notification card render on `Box` with `material="plate"` and `elevation="toast"` — same frosted surface, radius scale and shadow as the rest of the library.
- There is one toast stack and one notification stack; both are positioned by the app-wide placement props above.

---

## Examples

### Basic toast

```tsx
function MyButton() {
  const { toast } = useNotifications();
  return (
    <Button
      label="Save"
      onClick={() => toast('Changes saved successfully.', { variant: 'success' })}
    />
  );
}
```

### Variants

```tsx
const { toast } = useNotifications();
toast('Item created.',      { variant: 'success' });
toast('Low storage space.', { variant: 'warning' });
toast('Upload failed.',     { variant: 'danger' });
toast('New version available.'); // default
```

### Toast with action button

```tsx
const { toast, dismiss } = useNotifications();

const id = toast('File deleted.', {
  variant: 'danger',
  action: {
    label: 'Undo',
    onClick: () => { restoreFile(); dismiss(id); },
  },
});
```

### Persistent toast (no auto-close)

```tsx
const id = toast('Syncing in background…', { autoClose: false });
// later:
dismiss(id);
```

### Rich notification

```tsx
const { notification } = useNotifications();

notification({
  title: 'New message from Alex',
  content: 'Hey, can we schedule a call tomorrow?',
  icon: <Avatar firstName="Alex" lastName="P" size="s" />,
  actions: [
    { label: 'Reply', onClick: openChat },
    { label: 'Dismiss', onClick: () => {} },
  ],
});
```

### Notification with image

```tsx
notification({
  title: 'Release 2.0 is out',
  content: 'New components, performance improvements, and dark mode fixes.',
  image: '/images/release-banner.png',
  actions: [{ label: 'Read changelog', onClick: openChangelog }],
});
```

### Programmatic dismiss

```tsx
const { toast, dismiss } = useNotifications();

const id = toast('Processing…', { autoClose: false });
await doWork();
dismiss(id);
toast('Done!', { variant: 'success' });
```
