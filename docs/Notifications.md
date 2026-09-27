# Notifications

An imperative notification system with two display modes: **toast** (pill-shaped, brief) and **notification** (rich card). `Notifications` is a provider component that mounts the stack; `showToast`/`showNotification`/`dismissNotification` are plain functions — call them from anywhere (a click handler, a store action, outside React entirely), the same shape as `showAlert`/`showConfirm`/`showPrompt` (see `Dialog.md`).

> `Application` already wraps the app in a `Notifications` provider — do not add another `<Notifications>` unless you're building outside `Application`.

## Placement

Placement is app-wide — there is no per-call `position`. Set it once, either on `<Application>` or on `<Notifications>` directly:

| Prop | Type | Default | Description |
|--------|------|---------|-------------|
| `toastPlacement` | `'top' \| 'bottom'` | `'bottom'` | Vertical edge of the toast stack (always centred horizontally) |
| `notificationPlacement` | `'top-start' \| 'top-end' \| 'bottom-start' \| 'bottom-end'` | `'bottom-end'` | Corner of the notification stack — same `side-align` shape as `Popover`/`Tooltip`'s `placement`. The side (`top`/`bottom`) is physical; the alignment (`start`/`end`) is logical — `start` = left, `end` = right, resolved against the writing direction. |

```tsx
<Application toastPlacement="top" notificationPlacement="top-start">
  <App />
</Application>
```

## Import

```tsx
import { Notifications, showToast, showNotification, dismissNotification } from 'altrone-ui';
```

---

## Provider

### Notifications (provider)

Wrap your app (or a sub-tree) with `<Notifications>`. Manages all toast and notification state internally and registers itself as the target for `showToast`/`showNotification`/`dismissNotification`.

```tsx
<Notifications>
  <App />
</Notifications>
```

If no `Notifications` is mounted, the functions below warn to the console and no-op.

---

## API

### showToast(message, options?)

Shows a pill-shaped toast message. Returns the toast `id`.

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `variant` | `'default' \| 'success' \| 'warning' \| 'danger'` | `'default'` | Color and icon preset |
| `icon` | `ReactNode` | variant icon | Custom icon. Pass `null` to hide the icon. The variant default now comes from `Application.icons` (`default` → `.info`, `success` → `.success`, `warning` → `.warning`, `danger` → `.danger`). |
| `action` | `{ label: string; onClick: (event: MouseEvent<HTMLButtonElement>) => void }` | — | Optional action button inside the toast |
| `duration` | `number` | `4000` | Auto-close delay in ms |
| `autoClose` | `boolean` | `true` | Whether to auto-close |

---

### showNotification(options)

Shows a rich notification card. Returns the notification `id`.

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `content` | `ReactNode` | — | **Required.** Card body content |
| `title` | `string` | — | Card title |
| `image` | `string` | — | Full-width header image URL |
| `icon` | `ReactNode` | — | Icon next to the title |
| `actions` | `{ label: string; onClick: (event: MouseEvent<HTMLButtonElement>) => void; danger?: boolean }[]` | — | Action buttons at the bottom |
| `duration` | `number` | `6000` | Auto-close delay in ms |
| `autoClose` | `boolean` | `true` | Whether to auto-close |

---

### dismissNotification(id)

Programmatically closes a toast or notification by its id.

---

## Behavior

- Toast auto-close **pauses** while the pointer hovers over it and resumes on mouse leave.
- Toasts animate in/out with a `motion` spring transition (no third-party toast library).
- Both the toast pill and the notification card render on `Box` with `material="plate"` and `elevation="toast"` — same frosted surface, radius scale and shadow as the rest of the library.
- There is one toast stack and one notification stack; both are positioned by the app-wide placement props above.
- If several `Notifications` providers are mounted (e.g. nested, or in tests), the most recently mounted one handles new calls; unmounting one falls back to the previous.

---

## Examples

### Basic toast

```tsx
function MyButton() {
  return (
    <Button
      label="Save"
      onClick={() => showToast('Changes saved successfully.', { variant: 'success' })}
    />
  );
}
```

### Variants

```tsx
showToast('Item created.',      { variant: 'success' });
showToast('Low storage space.', { variant: 'warning' });
showToast('Upload failed.',     { variant: 'danger' });
showToast('New version available.'); // default
```

### Toast with action button

```tsx
const id = showToast('File deleted.', {
  variant: 'danger',
  action: {
    label: 'Undo',
    onClick: () => { restoreFile(); dismissNotification(id); },
  },
});
```

### Persistent toast (no auto-close)

```tsx
const id = showToast('Syncing in background…', { autoClose: false });
// later:
dismissNotification(id);
```

### Rich notification

```tsx
showNotification({
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
showNotification({
  title: 'Release 2.0 is out',
  content: 'New components, performance improvements, and dark mode fixes.',
  image: '/images/release-banner.png',
  actions: [{ label: 'Read changelog', onClick: openChangelog }],
});
```

### Calling from outside React (e.g. a store action)

```tsx
// store/uploadSlice.ts — no component, no hook, works the same way
export async function uploadFile(file: File) {
  try {
    await api.upload(file);
    showToast('Upload complete.', { variant: 'success' });
  } catch (err) {
    showToast('Upload failed.', { variant: 'danger' });
  }
}
```

### Programmatic dismiss

```tsx
const id = showToast('Processing…', { autoClose: false });
await doWork();
dismissNotification(id);
showToast('Done!', { variant: 'success' });
```
