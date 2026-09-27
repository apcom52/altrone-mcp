# Tooltip

A floating informational label shown on hover, focus, or click. Built on `@floating-ui/react` with a directional arrow. Opens after a 500 ms delay on hover; immediately on focus/click. Closes immediately on mouse leave/blur/outside press.

## Import

```tsx
import { Tooltip } from 'altrone-ui';
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `string \| ReactElement` | — | **Required.** Tooltip body text or custom element |
| `children` | `ReactNode` | — | The element that triggers the tooltip on hover/focus. If omitted, an icon button is rendered automatically (icon customizable via `triggerIcon`). |
| `title` | `string` | — | Bold heading shown above `content` inside the tooltip |
| `kbd` | `string` | — | Keyboard shortcut badge shown after `content` (e.g. `"⌘S"`) |
| `placement` | `Placement` | `'top'` | Floating UI placement string. Flips and shifts automatically when near viewport edges. |
| `maxWidth` | `number \| string` | — | Custom max-width for the tooltip panel |
| `className` | `string` | — | Extra class on the tooltip panel |
| `style` | `CSSProperties` | — | Inline styles on the tooltip panel |
| `triggerClassName` | `string` | — | Extra class on the auto-generated `HelpCircle` button (when no `children` provided). No effect when a custom trigger is passed via `children`. |
| `triggerStyle` | `CSSProperties` | — | Inline styles on the auto-generated `HelpCircle` button (when no `children` provided). No effect when a custom trigger is passed via `children`. |
| `triggerIcon` | `ReactElement` | shared `icons.help` | Icon for the auto-generated trigger button (when no `children` provided). No effect when a custom trigger is passed via `children`. |
| `trigger` | `TooltipTrigger \| TooltipTrigger[]` (`'hover' \| 'focus' \| 'click'`) | `['hover', 'focus']` | Which interaction(s) open the tooltip |
| `defaultOpen` | `boolean` | `false` | Initial open state (uncontrolled) |
| `onOpenChange` | `(open: boolean, event?: Event, reason?: OpenChangeReason) => void` | — | Fires on every open-state change; `reason` comes from floating-ui (`'hover'`, `'focus'`, `'escape-key'`, `'outside-press'`, …) |
| `ref` | `Ref<HTMLElement>` | — | Ref forwarded to the trigger element |

`TooltipProps` also extends `HTMLAttributes<HTMLElement>` (minus `title`/`content`/`children`, which are Tooltip's own semantic props) — `id`, `aria-*`, `data-*` and native event handlers are all accepted and forwarded to the **trigger** element (the same element `ref` points to), same as `className`/`style` target the tooltip panel rather than the trigger.

---

## Behavior

- Opens on **hover** (500 ms delay), **focus** (immediate), and/or **click**, depending on `trigger` — defaults to `['hover', 'focus']`.
- Closes immediately on mouse leave, blur, outside press (click trigger), or `Escape`.
- Uncontrolled: `defaultOpen` sets the initial state, `onOpenChange` reports every subsequent change. There is no `open` prop — Tooltip does not support a fully controlled open state.
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
    <Flex orientation="vertical" gap="xs">
      <strong>Plan limits</strong>
      <span>5 projects · 3 team members · 10 GB storage</span>
    </Flex>
  }
  maxWidth={240}
>
  <span>Current plan</span>
</Tooltip>
```

### Click-triggered, with onOpenChange

```tsx
<Tooltip
  content="Opens on click, closes on outside press"
  trigger="click"
  onOpenChange={(open, event, reason) => console.log(open, reason)}
>
  <Button label="Info" />
</Tooltip>
```

### Starts open

```tsx
<Tooltip content="Visible on first render" defaultOpen>
  <Button label="Hover me" />
</Tooltip>
```

### Inside a Toolbar action

`Toolbar.Action` with `showLabel={false}` automatically wraps in a Tooltip using the `label` prop. Direct use is also possible:

```tsx
<Tooltip content="Delete selected items" kbd="⌫">
  <Toolbar.Action label="Delete" icon={<Trash />} showLabel={false} onClick={deleteSelected} />
</Tooltip>
```
