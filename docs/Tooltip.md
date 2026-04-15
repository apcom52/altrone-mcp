# Tooltip

A floating informational label shown on hover or focus. Built on `@floating-ui/react` with a directional arrow. Opens after a 500 ms delay; closes immediately on mouse leave.

## Import

```tsx
import { Tooltip } from 'altrone-ui';
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `string \| ReactElement` | — | **Required.** Tooltip body text or custom element |
| `children` | `ReactNode` | — | The element that triggers the tooltip on hover/focus. If omitted, a `HelpCircle` (?) icon button is rendered automatically. |
| `title` | `string` | — | Bold heading shown above `content` inside the tooltip |
| `kbd` | `string` | — | Keyboard shortcut badge shown after `content` (e.g. `"⌘S"`) |
| `placement` | `Placement` | `'top'` | Floating UI placement string. Flips and shifts automatically when near viewport edges. |
| `maxWidth` | `number \| string` | — | Custom max-width for the tooltip panel |
| `className` | `string` | — | Extra class on the tooltip panel |
| `style` | `CSSProperties` | — | Inline styles on the tooltip panel |
| `childrenClassName` | `string` | — | Extra class on the auto-generated `HelpCircle` button (when no `children` provided) |
| `ref` | `Ref<HTMLElement>` | — | Ref forwarded to the trigger element |

---

## Behavior

- Opens on **hover** (500 ms delay) and **focus** (immediate).
- Closes immediately on mouse leave or blur.
- **Portal target**: `[data-altrone-root]`, falls back to `document.body`.
- `aria-describedby` is automatically set on the trigger element pointing to the tooltip id.
- When `children` is omitted, renders a `<button>` with a `HelpCircle` icon as the trigger.

---

## Examples

### Basic

```tsx
<Tooltip content="This is a tooltip">
  <Button label="Hover me" />
</Tooltip>
```

### On a non-interactive element

Wrap the element if it doesn't natively accept `tabIndex` or event handlers.

```tsx
<Tooltip content="Archived items cannot be edited">
  <span>
    <Button label="Edit" disabled />
  </span>
</Tooltip>
```

### With title and keyboard shortcut

```tsx
<Tooltip title="Save document" content="Saves all unsaved changes." kbd="⌘S">
  <Button label="Save" icon={<Save />} showLabel={false} onClick={save} />
</Tooltip>
```

### Auto-generated help icon (no children)

When `children` is omitted, a `HelpCircle` button is rendered.

```tsx
<Flex gap="xs" align="center">
  <span>API Key</span>
  <Tooltip content="Your secret API key. Never share it publicly." />
</Flex>
```

### Custom placement

```tsx
<Tooltip content="Opens in a new tab" placement="right">
  <a href="/docs" target="_blank">Documentation</a>
</Tooltip>
```

### Rich content

```tsx
<Tooltip
  content={
    <Flex direction="vertical" gap="xs">
      <strong>Plan limits</strong>
      <span>5 projects · 3 team members · 10 GB storage</span>
    </Flex>
  }
  maxWidth={240}
>
  <span>Current plan</span>
</Tooltip>
```

### Inside a Toolbar action

`Toolbar.Action` with `showLabel={false}` automatically wraps in a Tooltip using the `label` prop. Direct use is also possible:

```tsx
<Tooltip content="Delete selected items" kbd="⌫">
  <Toolbar.Action label="Delete" icon={<Trash />} showLabel={false} onClick={deleteSelected} />
</Tooltip>
```
