# Popover

A generic floating panel anchored to a trigger element. The base primitive used by `Dropdown`, `ColorPicker`, `AutocompleteInput`, and `DatePicker`. Built on `@floating-ui/react`.

## Import

```tsx
import { Popover } from 'altrone-ui';
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactElement \| ((ctx: { open: boolean; hide: () => void }) => ReactNode)` | — | **Required.** Trigger element. A render function gets the open state + a close callback. The trigger's own `ref` is merged (not overwritten). |
| `content` | `ReactElement \| ((ctx: { hide: () => void; hideAllSequence: () => void }) => ReactNode)` | — | **Required.** Panel content. Render function receives `hide` and `hideAllSequence` (closes the whole nested chain). |
| `placement` | `Placement \| 'auto'` | `'auto'` | floating-ui placement (`'top'`, `'bottom-start'`, …) or `'auto'` for best-fit. |
| `trigger` | `'click' \| 'focus' \| 'hover' \| Array<…>` | `'click'` | What opens the popover. |
| `title` | `string` | — | Header title. Makes the panel a labelled `role="dialog"`. |
| `showCloseButton` | `boolean` | `false` | Render a close button in the header. Also triggers the dialog role. |
| `focusTrap` | `boolean` | `true` | Trap keyboard focus inside the panel while open. |
| `focusTrapTargets` | `('reference' \| 'floating' \| 'content')[]` | `['reference', 'content']` | Focus-trap tab order. |
| `parentWidth` | `boolean` | `false` | Match the panel width to the trigger width. |
| `overlap` | `boolean` | `false` | Panel covers the trigger instead of sitting beside it. |
| `open` | `boolean` | — | Controlled open state. Omit for an uncontrolled popover (see `defaultOpen`). |
| `defaultOpen` | `boolean` | `false` | Initial open state for an uncontrolled popover. Ignored once `open` is passed. |
| `enabled` | `boolean` | `true` | When `false`, renders only the trigger (no popover behavior). |
| `listNavigation` | `boolean` | `false` | Enable arrow-key navigation over list items (used by `Dropdown`/`Select`). |
| `defaultListNavigationIndex` | `number \| null` | `null` | Initial active index for `listNavigation`. |
| `virtualNavigationFocus` | `boolean` | `false` | With `listNavigation`, keeps real DOM focus on the trigger and only highlights the active item visually (`aria-activedescendant` pattern, used by `AutocompleteInput`). |
| `onOpenChange` | `(open: boolean, event?: Event, reason?: OpenChangeReason) => void` | — | Fires on every open-state change. `reason` is `'escape-key'`, `'outside-press'`, `'reference-press'`, `'hover'`, `'focus'`, … |
| `ref` | `Ref<HTMLElement>` | — | Forwarded to the trigger DOM element (merged with the trigger's own `ref`, if any). |
| `controlRef` | `Ref<PopoverRef>` | — | Imperative API (see below). |

All other props (`role`, `aria-*`, `data-*`, `id`, …) are forwarded to the floating panel element.

---

## Ref API (`PopoverRef`, via `controlRef`)

When you attach a `controlRef`, the following are exposed:

| Property | Type | Description |
|----------|------|-------------|
| `open` | `boolean` | Whether the popover is currently open |
| `show` | `() => void` | Programmatically open the popover |
| `hide` | `() => void` | Programmatically close the popover |
| `activeIndex` | `number \| null` | Currently focused list item index (keyboard navigation) |
| `childrenNode` | `HTMLElement \| null` | The trigger DOM element |
| `contentNode` | `HTMLDivElement \| null` | The floating root box (`.Popover`), not the inner content wrapper |
| `context` | `FloatingContext` | The raw floating-ui context |
| `actualPlacement` | `Placement` | The resolved placement after flip/shift middleware |
| `transformOrigin` | `string` | CSS transform-origin string for the scale animation |

---

## Behavior

- **Controlled vs. uncontrolled** — pass `open` to drive visibility from your own state (`onOpenChange` reports every requested change: escape, outside-press, and `controlRef.show()`/`hide()` all route through it instead of updating an internal flag); omit it and the popover tracks its own state internally, starting from `defaultOpen`.
- **Hover trigger**: opens after 500 ms delay, closes after 250 ms delay. Uses `safePolygon` so the pointer can move from trigger to panel without accidental close. Hover reacts to a mouse only — on touch devices a hover-triggered popover opens and closes on tap instead.
- **Keyboard navigation**: `ArrowUp` / `ArrowDown` move through list items when `focusTrap` is active. Navigation loops, allows escape.
- **Nested close**: content render function receives `hideAllSequence` which closes the entire popover chain (e.g. a sub-menu and its parent).
- **Accessibility**: with `title` / `showCloseButton` the panel is `role="dialog"` + `aria-labelledby` (the header). Otherwise it has no role — set `role` yourself for tooltip/menu semantics. Esc and outside-press dismiss; focus returns to the trigger.
- **Surface**: the panel is a `Box` (`material="plate"` glass fill + blur, `shape="rounded"` corners from `--popover-radius` (24px, matching the panel's original pre-`Box` corner), `elevation="overlay"` shadow + z-index). Only the header/content layout lives in the component's own stylesheet.
- **`overlap`**: implemented with native floating-ui middleware — a negative main-axis `offset` (reference size) + `shift`; no `flip` (flipping a covering panel makes no sense).
- **Portal target**: the trigger's own `closest('[data-altrone-root]')` — so a popover always portals into its own Altrone app instance, even with several on the page. Falls back to `document.body`.
- **Animation**: `AnimatePresence` scale/opacity transition using `transformOrigin` from the resolved placement. Respects `prefers-reduced-motion` (global `MotionConfig`).

---

## Examples

### Basic click popover

```tsx
<Popover
  content={<div style={{ padding: 12 }}>Hello from popover!</div>}
>
  <Button label="Open" />
</Popover>
```

### Trigger shows open state

```tsx
<Popover content={<InfoPanel />}>
  {({ open }) => (
    <Button
      label="Info"
      additionalIcon={open ? <ChevronUp /> : <ChevronDown />}
    />
  )}
</Popover>
```

### Controlled open

```tsx
const [open, setOpen] = useState(false);

<Popover open={open} onOpenChange={setOpen} content={<Panel />}>
  <Button label="Open" />
</Popover>
```

### Hover trigger

```tsx
<Popover trigger="hover" content={<Tooltip>Explanation text</Tooltip>}>
  <span>Hover me</span>
</Popover>
```

### Specific placement

```tsx
<Popover placement="right-start" content={<HelpPanel />}>
  <HelpIcon />
</Popover>
```

### Programmatic control via controlRef

```tsx
const popoverRef = useRef<PopoverRef>(null);

<>
  <Popover controlRef={popoverRef} content={<Panel />}>
    <Button label="Open" />
  </Popover>
  <Button
    label="Close from outside"
    onClick={() => popoverRef.current?.hide()}
  />
</>
```

### Reading the trigger DOM node

```tsx
const triggerRef = useRef<HTMLElement>(null);

<Popover ref={triggerRef} content={<Panel />}>
  <Button label="Open" />
</Popover>
// triggerRef.current is the trigger's DOM element — same node PopoverRef.childrenNode exposes.
```

### Close from inside content

```tsx
<Popover
  content={({ hide }) => (
    <div>
      <p>Are you sure?</p>
      <Button label="Confirm" onClick={() => { confirm(); hide(); }} />
    </div>
  )}
>
  <Button label="Open confirmation" />
</Popover>
```

### Close entire nested chain

```tsx
<Popover
  content={({ hideAllSequence }) => (
    <Popover
      content={({ hideAllSequence: hideAll }) => (
        <Button label="Close all" onClick={hideAll} />
      )}
    >
      <Button label="Open nested" />
    </Popover>
  )}
>
  <Button label="Open parent" />
</Popover>
```
