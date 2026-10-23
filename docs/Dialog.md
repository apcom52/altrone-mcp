# Dialog

An imperative API for showing native-style alert, confirm, and prompt dialogs. Rendering is handled by `DialogProvider` (mounted automatically inside `Application`); the newest mounted provider handles new dialogs, so nested providers and tests don't clobber each other. All functions return Promises and can be used with `async/await`.

## Import

```tsx
import { showAlert, showConfirm, showPrompt } from 'altrone-ui';
```

---

## Requirements

`DialogProvider` must be mounted in the component tree. It is included automatically when using `Application`. If you use `Application`, no extra setup is needed.

```tsx
// Only needed if NOT using Application
import { DialogProvider } from 'altrone-ui';

<DialogProvider>
  <App />
</DialogProvider>
```

---

## Functions

### showAlert

Displays an informational dialog with an OK button.

```ts
showAlert(options: AlertOptions): Promise<void>
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `title` | `string` | localized "Alert" | **Required.** Dialog title |
| `message` | `string` | — | **Required.** Dialog body text |
| `okText` | `string` | localized "OK" | OK button label |

Resolves when the user clicks OK or closes the dialog.

---

### showConfirm

Displays a confirmation dialog with Confirm and Cancel buttons.

```ts
showConfirm(options: ConfirmOptions): Promise<boolean>
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `title` | `string` | localized "Confirm" | **Required.** Dialog title |
| `message` | `string` | — | **Required.** Dialog body text |
| `confirmText` | `string` | localized "Confirm" | Confirm button label |
| `cancelText` | `string` | localized "Cancel" | Cancel button label |
| `danger` | `boolean` | — | Applies danger (red) style to the confirm button |

Returns `true` if confirmed, `false` if cancelled or closed.

---

### showPrompt

Displays a dialog with a text/number/password/textarea input.

```ts
showPrompt(options: PromptOptions): Promise<string | number | null>
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `title` | `string` | — | **Required.** Dialog title |
| `message` | `string` | — | **Required.** Dialog body text |
| `inputType` | `'string' \| 'text' \| 'password' \| 'number'` | `'string'` | Input type. `'string'` = single-line, `'text'` = textarea. |
| `placeholder` | `string` | localized "Enter a value" | Input placeholder |
| `confirmText` | `string` | localized "Confirm" | Confirm button label |
| `cancelText` | `string` | localized "Cancel" | Cancel button label |

Returns the entered value, or `null` if cancelled or closed.

---

## Examples

### Alert

```tsx
async function handleSave() {
  await save();
  await showAlert({
    title: 'Saved',
    message: 'Your changes have been saved successfully.',
    okText: 'Got it',
  });
}
```

### Confirm before destructive action

```tsx
async function handleDelete(id: string) {
  const confirmed = await showConfirm({
    title: 'Delete item',
    message: 'This action cannot be undone. Are you sure?',
    confirmText: 'Delete',
    cancelText: 'Cancel',
    danger: true,
  });

  if (confirmed) {
    await deleteItem(id);
  }
}
```

### Prompt for a string value

```tsx
async function handleRename() {
  const newName = await showPrompt({
    title: 'Rename',
    message: 'Enter a new name for this item.',
    placeholder: 'New name…',
    confirmText: 'Rename',
    cancelText: 'Cancel',
  });

  if (newName !== null) {
    await renameItem(String(newName));
  }
}
```

### Prompt for a number

```tsx
const quantity = await showPrompt({
  title: 'Set quantity',
  message: 'How many items do you want to add?',
  inputType: 'number',
  placeholder: '0',
});
```

### Prompt for a password

```tsx
const password = await showPrompt({
  title: 'Confirm identity',
  message: 'Enter your password to continue.',
  inputType: 'password',
  placeholder: '••••••••',
});
```

---

## Behavior details

- Only one dialog is shown at a time. A dialog opened while another is still open is queued and shown after the current one closes; every promise settles, in call order.
- Default button labels and titles come from the active locale (`useLocalization`), not hardcoded English.
- Closing the dialog via the `×` button or backdrop:
  - `showAlert` → resolves with `undefined`
  - `showConfirm` → resolves with `false`
  - `showPrompt` → resolves with `null`
- If `DialogProvider` is not mounted, each function logs a warning and resolves immediately with its "cancelled" value.
