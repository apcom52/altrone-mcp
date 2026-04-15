# Message

An inline alert or banner for status messages. Supports severity levels, a close button, action buttons, and a compact layout.

## Import

```tsx
import { Message } from 'altrone-ui';
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | — | **Required.** Primary message text |
| `severity` | `'info' \| 'success' \| 'warning' \| 'danger'` | `'info'` | Controls color and icon. Use `severity` — the `role` prop is deprecated and logs a console warning. |
| `description` | `string` | — | Secondary body text below the title |
| `actions` | `MessageAction[]` | — | Array of action buttons rendered below the description |
| `onClose` | `() => void` | — | When provided, a `CloseButton` appears in the top-right corner |
| `compact` | `boolean` | `false` | Reduces padding and font size |
| `ariaRole` | `string` | `'alert'` | ARIA role for the root element |
| `ref` | `Ref<HTMLDivElement>` | — | Forwarded ref |

All standard `HTMLAttributes<HTMLDivElement>` are also accepted.

### MessageAction

```ts
interface MessageAction {
  label: string;
  onClick: () => void;
}
```

---

## Examples

### Basic info message

```tsx
<Message title="Your session will expire in 5 minutes." />
```

### Severity levels

```tsx
<Message severity="info"    title="A new version is available." />
<Message severity="success" title="Your changes were saved." />
<Message severity="warning" title="Storage is almost full." />
<Message severity="danger"  title="Failed to connect to the server." />
```

### With description

```tsx
<Message
  severity="warning"
  title="Unsaved changes"
  description="You have unsaved changes that will be lost if you navigate away."
/>
```

### Dismissible

```tsx
const [visible, setVisible] = useState(true);

{visible && (
  <Message
    severity="info"
    title="New features are available."
    onClose={() => setVisible(false)}
  />
)}
```

### With actions

```tsx
<Message
  severity="warning"
  title="Your plan is about to expire."
  description="Renew now to avoid service interruption."
  actions={[
    { label: 'Renew plan', onClick: openBilling },
    { label: 'Dismiss',    onClick: dismiss },
  ]}
/>
```

### Compact

```tsx
<Message severity="success" title="Copied to clipboard." compact />
```

### Custom ARIA role

```tsx
<Message
  severity="info"
  title="Loading data…"
  ariaRole="status"
/>
```
