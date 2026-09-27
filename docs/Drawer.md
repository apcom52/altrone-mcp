# Drawer

A side panel that slides in from the left or right. Unlike `Popover`/`Dropdown`/`Tooltip`, a drawer isn't attached to a trigger element — open it explicitly via `open` (controlled) or let it manage its own state via `defaultOpen` (uncontrolled), and close it via `onClose`. The panel itself is rendered in a portal attached to `[data-altrone-root="true"]` (or `<body>` as fallback).

## Import

```tsx
import { Drawer } from 'altrone-ui';
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `ReactElement \| ((ctx: { hide: () => void }) => ReactElement)` | — | Main content of the drawer. Rendered inside a `Scrollable`. Accepts a render function that receives `hide`. |
| `open` | `boolean` | — | Controlled open state. Omit for an uncontrolled drawer (see `defaultOpen`). |
| `defaultOpen` | `boolean` | `false` | Initial open state for an uncontrolled drawer. Ignored once `open` is passed. |
| `title` | `string` | — | Panel title displayed in the header |
| `footer` | `ReactElement \| ((ctx: { hide: () => void }) => ReactElement)` | — | Footer content. Rendered at the bottom, outside the scrollable area. Accepts a render function that receives `hide`. |
| `placement` | `'start' \| 'end'` | `'start'` | Side from which the drawer slides in. `start` = left, `end` = right. |
| `width` | `number` | `400` | Width of the panel in pixels. Capped at the viewport minus its edge inset. |
| `additionalActions` | `StrictReactElements \| ((ctx: { hide: () => void }) => StrictReactElements)` | — | Secondary controls on the start side of the header, after the close button. One element or several. |
| `actions` | `StrictReactElements \| ((ctx: { hide: () => void }) => StrictReactElements)` | — | Primary controls on the end side of the header. One element or several. Replaces the default Done button when provided. |
| `showCloseButton` | `boolean` | `true` | Show the header close (X) button. |
| `dismissible` | `boolean` | `true` | When `false`, a backdrop click or `Esc` no longer close the drawer — the panel shakes instead. The close button and `onDone` still close it normally. |
| `onClose` | `(event?: MouseEvent \| KeyboardEvent) => void` | — | Called when the drawer is closed (CloseButton, backdrop click, Escape, after `onDone` resolves, or any `hide()` call). `event` is undefined for a `hide()` call. For a controlled drawer, this is the only thing that actually flips `open` back to `false` — the component does not close itself. |
| `onDone` | `(event: MouseEvent<HTMLButtonElement>) => Promise<boolean \| void>` | — | Async handler for the Done button. If it returns `false`, the drawer stays open. Any other resolved value closes the drawer. While pending, the Done button shows a loading state. |
| `ref` | `Ref<HTMLDivElement>` | — | Forwarded ref to the panel element |

---

## Examples

### Basic

```tsx
const [open, setOpen] = useState(false);

<Button label="Open drawer" onClick={() => setOpen(true)} />
<Drawer
  open={open}
  onClose={() => setOpen(false)}
  title="Edit profile"
  content={<ProfileForm />}
/>
```

### With footer

```tsx
<Drawer
  open={open}
  onClose={() => setOpen(false)}
  title="Filters"
  content={<FilterPanel />}
  footer={
    <Button label="Apply filters" variant="submit" fullWidth onClick={applyFilters} />
  }
/>
```

### Right-side placement

```tsx
<Drawer
  open={open}
  onClose={() => setOpen(false)}
  title="Notifications"
  content={<NotificationList />}
  placement="end"
/>
```

### Custom width

```tsx
<Drawer open={open} onClose={() => setOpen(false)} title="Details" content={<DetailPanel />} width={600} />
```

### With async Done button

Return `false` from `onDone` to keep the drawer open (e.g. when validation fails).

```tsx
<Drawer
  open={open}
  onClose={() => setOpen(false)}
  title="Create task"
  content={<TaskForm ref={formRef} />}
  onDone={async () => {
    const ok = await formRef.current.submit();
    return ok ? undefined : false;  // false keeps the drawer open
  }}
/>
```

### Custom header actions on both sides

`additionalActions` sits after the close button; `actions` replaces the default
Done button. Either can be one element, several, or a render function that
receives `hide`. The title stays centred on the panel regardless.

```tsx
<Drawer
  open={open}
  onClose={() => setOpen(false)}
  title="Document"
  content={<DocPanel />}
  additionalActions={
    <Button label="History" icon={<History />} showLabel={false} variant="text" />
  }
  actions={({ hide }) => [
    <Button key="share" label="Share" icon={<Share />} showLabel={false} variant="text" />,
    <Button key="save" label="Save" variant="submit" onClick={hide} />,
  ]}
/>
```

---

## Behavior details

- **Controlled vs. uncontrolled** — pass `open` to drive visibility from your own state (`onClose` must set it back to `false`); omit it and the drawer tracks its own state internally, starting from `defaultOpen`.
- Closing: a click on the backdrop, the close button, or the `Escape` key. `onClose` fires for all three (and after `onDone` resolves to anything but `false`).
- Focus: trapped inside the panel while open (`focus-trap-react`), returned to whatever had focus before opening on close. The panel body carries `role="dialog"`, `aria-modal="true"`, and `aria-labelledby` when a `title` is set.
- Animation: `motion/react` `AnimatePresence` — the panel slides in on an ease-out curve while scaling up from the screen edge it enters from, over a backdrop fade. Under `prefers-reduced-motion` both are dropped — the panel mounts/unmounts with no transition. The resting edge inset lives in CSS, so a reduced-motion drawer is still inset.
- Portal target: `document.querySelector('[data-altrone-root="true"]')` — the element rendered by `Application`. Falls back to `document.body` in environments where no root is found.
- SSR-safe: `portalRoot` is `null` on the server and the portal is simply not rendered.
