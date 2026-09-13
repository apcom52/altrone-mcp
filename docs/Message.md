# Message

An inline alert or banner for status messages that belong in the flow of the page (not a floating `Toast`). Supports severity levels, an icon, a header, action buttons, a close button, and a compact layout.

The container is a `Box` (`material="glass"`, `shape="rounded"`), so a message renders as a soft frosted panel consistent with the rest of the library. `severity` maps onto the Box `tone`. With no `icon`, the container widens its horizontal padding so the text keeps a comfortable inset.

The root `role` is derived from `severity`: `severity="danger"` renders an assertive `role="alert"` (the screen reader interrupts), every other severity renders a polite `role="status"`. Pass `ariaRole` to override.

## Import

```tsx
import { Message } from "altrone-ui";
```

---

## Props

| Prop       | Type                                              | Default                                        | Description                                                                                   |
| ---------- | ------------------------------------------------- | ---------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `header`   | `ReactNode`                                       | —                                              | Primary message text, shown above the body                                                    |
| `children` | `ReactNode`                                       | —                                              | Body content, shown below the header                                                          |
| `icon`     | `ReactElement`                                    | —                                              | Icon shown to the left of the content (e.g. a `lucide-react` icon)                            |
| `severity` | `'primary' \| 'success' \| 'warning' \| 'danger'` | —                                              | Colour and implied urgency. Omit for a neutral message. `primary` follows the current accent. |
| `actions`  | `ReactElement[]`                                  | —                                              | Elements (usually `Button`s) rendered in a row under the body                                 |
| `onClose`  | `() => void`                                      | —                                              | When provided, a `CloseButton` is rendered; the message does not track its own visibility     |
| `compact`  | `boolean`                                         | `false`                                        | Lays the header and body on one wrapping line, vertically centred on the icon                 |
| `ariaRole` | `AriaRole`                                        | `alert` for `severity="danger"`, else `status` | Overrides the severity-derived ARIA role of the root element                                  |
| `ref`      | `Ref<HTMLDivElement>`                             | —                                              | Forwarded to the root element                                                                 |

All standard `HTMLAttributes<HTMLDivElement>` (except `role`, replaced by `ariaRole`) are also accepted.

---

## Examples

### Basic message

```tsx
<Message header="Custom code is not validated">
  Incorrect code may impact your website's performance.
</Message>
```

### Severity levels

```tsx
import { Info, Check, TriangleAlert, CircleAlert } from 'lucide-react';

<Message icon={<Info />} header="A new version is available." severity="primary" />
<Message icon={<Check />} header="Your changes were saved." severity="success" />
<Message icon={<TriangleAlert />} header="Storage is almost full." severity="warning" />
<Message icon={<CircleAlert />} header="Failed to connect to the server." severity="danger" />
```

### Dismissible

```tsx
const [visible, setVisible] = useState(true);

{
  visible && (
    <Message
      header="New features are available."
      severity="primary"
      onClose={() => setVisible(false)}
    />
  );
}
```

### With actions

```tsx
<Message
  icon={<Info />}
  header="The data export you requested is ready!"
  severity="primary"
  actions={[
    <Button key="view" label="View the data" />,
    <Button key="later" label="Maybe later" />,
  ]}
  onClose={dismiss}
/>
```

### Without an icon

```tsx
<Message header="Draft saved">
  Your changes are stored locally and will sync when you reconnect.
</Message>
```

### Compact

```tsx
<Message
  icon={<Check />}
  header="Successfully uploaded"
  severity="success"
  compact
  onClose={dismiss}
/>
```

### Custom ARIA role

```tsx
<Message header="Loading data…" ariaRole="status" />
```
