# Tooltip

A floating informational label shown on hover, focus, or click. Built on `@floating-ui/react` with a directional arrow. Opens after a 500 ms delay on hover; immediately on focus/click. Closes immediately on mouse leave/blur/outside press. The hover trigger reacts to a mouse only, so a tap on a touch device doesn't open the tooltip.

**Never wrap `Button` (or anything built on `Button` — `CloseButton`, `Toolbar.Action`) in `Tooltip`.** `Button` already renders its own internal `Tooltip` whenever `showLabel={false}` and a `label`/`tooltip` is present (`Button.tsx`, `tooltip ?? label` as content, `kbd` passed through). Wrapping it in a second, external `Tooltip` nests two tooltip instances on the same trigger and breaks rendering (the trigger ends up invisible). For an icon-only `Button`, pass `tooltip`/`kbd` to `Button` directly instead of wrapping it. Use `Tooltip` directly only on non-`Button` triggers — a custom `Box`-built control, a link, plain text, `Avatar`, etc.

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
  <Box asChild shape="rounded" material="translucent" padding={{ x: 12, y: 6 }} pressable focusable>
    <button type="button">Hover me</button>
  </Box>
</Tooltip>
```

### On a non-interactive element

Wrap the element if it doesn't natively accept `tabIndex` or event handlers — a disabled native element fires no mouse/focus events at all, so the `Tooltip` needs to sit on a wrapper instead.

```tsx
<Tooltip content="Archived items cannot be edited">
  <span>
    <Box asChild shape="rounded" material="translucent" padding={{ x: 12, y: 6 }} style={{ opacity: 0.5 }}>
      <button type="button" disabled>Edit</button>
    </Box>
  </span>
</Tooltip>
```

### With title and keyboard shortcut

An icon-only trigger built from `Box` (not `Button` — see the warning above):

```tsx
<Tooltip title="Save document" content="Saves all unsaved changes." kbd="⌘S">
  <Box asChild shape="circle" size="s" material="translucent" pressable focusable>
    <button type="button" aria-label="Save" onClick={save}>
      <Save size={14} />
    </button>
  </Box>
</Tooltip>
```

The equivalent with an actual `Button` skips `Tooltip` entirely — `Button` builds its own:

```tsx
<Button label="Save" icon={<Save />} showLabel={false} tooltip="Saves all unsaved changes." kbd="⌘S" onClick={save} />
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
  <Box asChild shape="rounded" material="translucent" padding={{ x: 12, y: 6 }} pressable focusable>
    <button type="button">Info</button>
  </Box>
</Tooltip>
```

### Starts open

```tsx
<Tooltip content="Visible on first render" defaultOpen>
  <Box asChild shape="rounded" material="translucent" padding={{ x: 12, y: 6 }} pressable focusable>
    <button type="button">Hover me</button>
  </Box>
</Tooltip>
```

### A Toolbar action's tooltip

`Toolbar.Action` is a `Button` underneath (`variant="text"`) — it has the same built-in tooltip, and the same rule: never wrap it in `Tooltip`. Pass `tooltip`/`kbd` to it directly:

```tsx
<Toolbar.Action label="Delete" icon={<Trash />} showLabel={false} tooltip="Delete selected items" kbd="⌫" onClick={deleteSelected} />
```
