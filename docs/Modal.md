# Modal

A dialog overlay with a title, content area, and action buttons. The trigger element is passed as `children` — the component clones it and injects an `onClick` handler. The panel is rendered in a portal attached to `[data-altrone-root="true"]` (or `<body>` as fallback).

## Import

```tsx
import { Modal } from 'altrone-ui';
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactElement<{ onClick: () => void }>` | — | **Required.** Trigger element. Must be a single React element that accepts `onClick`. |
| `title` | `string` | — | **Required.** Dialog title displayed in the header. |
| `content` | `ReactNode \| ((ctx: { closeModal: () => void }) => ReactNode)` | — | Main body of the modal. Can be a render function to access `closeModal`. |
| `actions` | `ReactNode \| ((ctx: { closeModal: () => void }) => ReactNode)` | — | Right-aligned action buttons in the footer. Render function receives `closeModal`. |
| `leftActions` | `ReactNode \| ((ctx: { closeModal: () => void }) => ReactNode)` | — | Left-aligned buttons in the footer (e.g. a destructive action). |
| `size` | `'s' \| 'm' \| 'l'` | `'m'` | Width of the modal panel. |
| `showCancelButton` | `boolean` | `false` | Show a Cancel button on the left side of the footer automatically. |
| `onClose` | `() => void` | — | Called when the modal closes (Escape key, backdrop click, CloseButton). |
| `ref` | `Ref<HTMLDivElement>` | — | Forwarded ref to the modal panel. |

---

## Behavior

- **Uncontrolled** — open/close state is managed internally.
- Opening: the trigger's existing `onClick` is preserved and called alongside the open handler.
- **Focus trap** — focus is locked inside the modal while open.
- **Escape key** closes the modal.
- **Backdrop click** (outside `aria-modal` area) closes the modal.
- **Portal target**: `document.querySelector('[data-altrone-root="true"]')`, falls back to `document.body`.
- Animation uses `motion/react` `AnimatePresence` with a spring transition and backdrop fade.

---

## Examples

### Basic

```tsx
<Modal
  title="Confirm deletion"
  content="This action cannot be undone. Are you sure?"
  actions={({ closeModal }) => (
    <>
      <Button label="Cancel" onClick={closeModal} />
      <Button label="Delete" variant="danger" onClick={handleDelete} />
    </>
  )}
>
  <Button label="Delete item" variant="danger" />
</Modal>
```

### With left action (destructive on left)

```tsx
<Modal
  title="Edit record"
  content={<EditForm />}
  leftActions={({ closeModal }) => (
    <Button label="Delete" variant="danger" onClick={() => { handleDelete(); closeModal(); }} />
  )}
  actions={({ closeModal }) => (
    <>
      <Button label="Cancel" onClick={closeModal} />
      <Button label="Save" variant="submit" onClick={handleSave} />
    </>
  )}
>
  <Button label="Edit" />
</Modal>
```

### Built-in Cancel button

```tsx
<Modal
  title="Are you sure?"
  content="This will reset all your settings."
  showCancelButton
  actions={<Button label="Reset" variant="danger" onClick={handleReset} />}
>
  <Button label="Reset settings" />
</Modal>
```

### Sizes

```tsx
<Modal title="Small dialog"   size="s" content={<p>Compact content</p>}><Button label="Open S" /></Modal>
<Modal title="Medium dialog"  size="m" content={<p>Default</p>}><Button label="Open M" /></Modal>
<Modal title="Large dialog"   size="l" content={<p>Wide content</p>}><Button label="Open L" /></Modal>
```

### Programmatic close from content

```tsx
<Modal
  title="Upload file"
  content={({ closeModal }) => (
    <FileUploadForm onSuccess={closeModal} />
  )}
>
  <Button label="Upload" />
</Modal>
```

### With onClose callback

```tsx
<Modal
  title="Settings"
  content={<SettingsPanel />}
  onClose={() => console.log('modal closed')}
>
  <Button label="Settings" icon={<Settings />} showLabel={false} />
</Modal>
```
