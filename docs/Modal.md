# Modal

A dialog overlay with a title, content area, and action buttons. Unlike `Popover`/`Dropdown`/`Tooltip`, a modal isn't attached to a trigger element — open it explicitly via `open` (controlled) or let it manage its own state via `defaultOpen` (uncontrolled), and close it via `onClose`. The panel is rendered in a portal attached to `[data-altrone-root="true"]` (or `<body>` as fallback).

## Import

```tsx
import { Modal } from 'altrone-ui';
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `ReactNode \| ((ctx: { hide: () => void }) => ReactNode)` | — | Main body of the modal. Can be a render function to access `hide`. |
| `open` | `boolean` | — | Controlled open state. Omit for an uncontrolled modal (see `defaultOpen`). |
| `defaultOpen` | `boolean` | `false` | Initial open state for an uncontrolled modal. Ignored once `open` is passed. |
| `title` | `string` | — | Dialog title displayed in the header. Omit for a title-less panel. |
| `actions` | `StrictReactElements \| ((ctx: { hide: () => void }) => StrictReactElements)` | — | Right-aligned, primary action buttons in the footer. Render function receives `hide`. |
| `additionalActions` | `StrictReactElements \| ((ctx: { hide: () => void }) => StrictReactElements)` | — | Left-aligned, secondary buttons in the footer (e.g. a destructive action). |
| `size` | `'s' \| 'm' \| 'l'` | `'m'` | Width of the modal panel. |
| `enabled` | `boolean` | `true` | When `false`, the modal never renders — even if `open`/`defaultOpen` asked it to. |
| `showCloseButton` | `boolean` | `true` | Show the header close (X) button. |
| `showCancelButton` | `boolean` | `true` | Show the built-in Cancel button before `actions` in the footer. |
| `onClose` | `(event?: MouseEvent \| KeyboardEvent) => void` | — | Called when the modal closes (Escape key, backdrop click, CloseButton, or any `hide()` call). `event` is undefined for a `hide()` call. For a controlled modal, this is the only thing that actually flips `open` back to `false` — the component does not close itself. |
| `onExitComplete` | `() => void` | — | Called once the close animation has finished and the modal has unmounted. Use it when the next step must wait for the modal to disappear (e.g. `DialogProvider` shows the next queued dialog from here). |
| `ref` | `Ref<HTMLDivElement>` | — | Forwarded ref to the modal root element (the backdrop). |

---

## Behavior

- **Controlled vs. uncontrolled** — pass `open` to drive visibility from your own state (`onClose` must set it back to `false`); omit it and the modal tracks its own state internally, starting from `defaultOpen` (this is how `DialogProvider` uses it: mount the `Modal` with `defaultOpen` when there's something to show).
- **Focus trap** — focus is locked inside the modal while open.
- **Escape key** closes the modal.
- **Backdrop click** — only a click landing directly on the backdrop closes the modal; clicks inside overlays the content opens (Select menu, Popover) do not.
- **No inner scrollbar** — a panel taller than the viewport scrolls at the screen level (the whole panel, header and footer included), not inside a fixed-size card. The mouse wheel scrolls it from anywhere over the backdrop, not just while hovering the panel itself.
- **Portal target**: `document.querySelector('[data-altrone-root="true"]')`, falls back to `document.body`. Computed client-side only (SSR-safe).
- `role="dialog"` and `aria-modal="true"` sit together on the panel element; `aria-labelledby` points at the title only when `title` is set.
- The footer is omitted entirely when there is nothing to put in it (`showCancelButton={false}` and no `actions` / `additionalActions`).
- Animation uses `motion/react` `AnimatePresence` — backdrop fade plus a top-anchored panel motion: it drops in from above with a `backOut` overshoot on enter and retracts upward on exit (panel opacity is not animated). Under `prefers-reduced-motion: reduce` every transition (including the backdrop fade) collapses to an instant swap.

---

## Examples

### Basic

```tsx
const [open, setOpen] = useState(false);

<Button label="Delete item" variant="danger" onClick={() => setOpen(true)} />
<Modal
  open={open}
  onClose={() => setOpen(false)}
  title="Confirm deletion"
  content="This action cannot be undone. Are you sure?"
  actions={({ hide }) => [
    <Button key="cancel" label="Cancel" onClick={hide} />,
    <Button key="delete" label="Delete" variant="danger" onClick={handleDelete} />,
  ]}
/>
```

### With left action (destructive on left)

```tsx
<Modal
  open={open}
  onClose={() => setOpen(false)}
  title="Edit record"
  content={<EditForm />}
  additionalActions={({ hide }) => (
    <Button label="Delete" variant="danger" onClick={() => { handleDelete(); hide(); }} />
  )}
  actions={({ hide }) => [
    <Button key="cancel" label="Cancel" onClick={hide} />,
    <Button key="save" label="Save" variant="submit" onClick={handleSave} />,
  ]}
/>
```

### Built-in Cancel button

```tsx
<Modal
  open={open}
  onClose={() => setOpen(false)}
  title="Are you sure?"
  content="This will reset all your settings."
  showCancelButton
  actions={<Button label="Reset" variant="danger" onClick={handleReset} />}
/>
```

### Sizes

```tsx
<Modal open={open} onClose={close} title="Small dialog"  size="s" content={<p>Compact content</p>} />
<Modal open={open} onClose={close} title="Medium dialog" size="m" content={<p>Default</p>} />
<Modal open={open} onClose={close} title="Large dialog"  size="l" content={<p>Wide content</p>} />
```

### Programmatic close from content

```tsx
<Modal
  open={open}
  onClose={() => setOpen(false)}
  title="Upload file"
  content={({ hide }) => (
    <FileUploadForm onSuccess={hide} />
  )}
/>
```

### Uncontrolled, mounted on demand (`DialogProvider` pattern)

```tsx
{dialog && (
  <Modal
    defaultOpen
    onClose={() => setDialog(null)}
    title={dialog.title}
    content={dialog.message}
    showCancelButton={false}
  />
)}
```
