# Toasts

An imperative notification system with two display modes: **toast** (pill-shaped, brief) and **notification** (rich card). `Toast` is a provider component. Access its API via `useToast()`.

> `AltroneApplication` already wraps the app in a `Toast` provider — do not add another `<Toast>` unless you're building outside `AltroneApplication`.

## Import

```tsx
import { Toast, useToast } from 'altrone-ui';
```

---

## Provider

### Toast (provider)

Wrap your app (or a sub-tree) with `<Toast>`. Manages all toast and notification state internally.

```tsx
<Toast>
  <App />
</Toast>
```

---

## Hook

### useToast()

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
| `position` | `'top' \| 'bottom'` | `'bottom'` | Vertical position on screen |

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
| `position` | `'top' \| 'bottom' \| 'top-left' \| 'top-right' \| 'bottom-left' \| 'bottom-right'` | `'bottom-right'` | Position on screen |
| `duration` | `number` | `6000` | Auto-close delay in ms |
| `autoClose` | `boolean` | `true` | Whether to auto-close |

---

### dismiss(id)

Programmatically closes a toast or notification by its id.

---

## Behavior

- Toast auto-close **pauses** while the pointer hovers over it and resumes on mouse leave.
- Toasts animate in/out with a spring transition. New toasts push existing ones with `popLayout`.
- Each position (`top`, `bottom`, `top-left`, etc.) maintains its own independent stack.

---

## Examples

### Basic toast

```tsx
function MyButton() {
  const { toast } = useToast();
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
const { toast } = useToast();
toast('Item created.',      { variant: 'success' });
toast('Low storage space.', { variant: 'warning' });
toast('Upload failed.',     { variant: 'danger' });
toast('New version available.'); // default
```

### Toast with action button

```tsx
const { toast, dismiss } = useToast();

const id = toast('File deleted.', {
  variant: 'danger',
  action: {
    label: 'Undo',
    onClick: () => { restoreFile(); dismiss(id); },
  },
});
```

### Toast at the top

```tsx
toast('Copied to clipboard.', { position: 'top', variant: 'success' });
```

### Persistent toast (no auto-close)

```tsx
const id = toast('Syncing in background…', { autoClose: false });
// later:
dismiss(id);
```

### Rich notification

```tsx
const { notification } = useToast();

notification({
  title: 'New message from Alex',
  content: 'Hey, can we schedule a call tomorrow?',
  icon: <Avatar firstName="Alex" lastName="P" size="s" />,
  actions: [
    { label: 'Reply', onClick: openChat },
    { label: 'Dismiss', onClick: () => {} },
  ],
  position: 'bottom-right',
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
const { toast, dismiss } = useToast();

const id = toast('Processing…', { autoClose: false });
await doWork();
dismiss(id);
toast('Done!', { variant: 'success' });
```
