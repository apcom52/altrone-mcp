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
| `children` | `ReactElement \| ((ctx: { opened: boolean; closePopup: () => void }) => ReactNode)` | — | **Required.** Trigger element. A render function gets the open state + a close callback. The trigger's own `ref` is merged (not overwritten). |
| `content` | `ReactElement \| ((ctx: { closePopup: () => void; closeAllSequence: () => void }) => ReactNode)` | — | **Required.** Panel content. Render function receives `closePopup` and `closeAllSequence` (closes the whole nested chain). |
| `placement` | `Placement \| 'auto'` | `'auto'` | floating-ui placement (`'top'`, `'bottom-start'`, …) or `'auto'` for best-fit. |
| `trigger` | `'click' \| 'focus' \| 'hover' \| Array<…>` | `'click'` | What opens the popover. |
| `title` | `string` | — | Header title. Makes the panel a labelled `role="dialog"`. |
| `showCloseButton` | `boolean` | `false` | Render a close button in the header. Also triggers the dialog role. |
| `focusTrap` | `boolean` | `true` | Trap keyboard focus inside the panel while open. |
| `focusTrapTargets` | `('reference' \| 'floating' \| 'content')[]` | `['reference', 'content']` | Focus-trap tab order. |
| `parentWidth` | `boolean` | `false` | Match the panel width to the trigger width. |
| `overlap` | `boolean` | `false` | Panel covers the trigger instead of sitting beside it. |
| `openedByDefault` | `boolean` | `false` | Uncontrolled initial open state. |
| `enabled` | `boolean` | `true` | When `false`, renders only the trigger (no popover behavior). |
| `listNavigation` | `boolean` | `false` | Enable arrow-key navigation over list items (used by `Dropdown`/`Select`). |
| `onOpenChange` | `(open: boolean, event?: Event, reason?: OpenChangeReason) => void` | — | Fires on every open-state change. `reason` is `'escape-key'`, `'outside-press'`, `'reference-press'`, `'hover'`, `'focus'`, … |
| `ref` | `Ref<PopoverRef>` | — | Imperative API (see below). |

All other props (`role`, `aria-*`, `data-*`, `id`, …) are forwarded to the floating panel element.

---

## Ref API (`PopoverRef`)

When you attach a `ref`, the following are exposed:

| Property | Type | Description |
|----------|------|-------------|
| `opened` | `boolean` | Whether the popover is currently open |
| `openPopup` | `() => void` | Programmatically open the popover |
| `closePopup` | `() => void` | Programmatically close the popover |
| `activeIndex` | `number \| null` | Currently focused list item index (keyboard navigation) |
| `childrenNode` | `HTMLElement \| null` | The trigger DOM element |
| `contentNode` | `HTMLDivElement \| null` | The floating root box (`.Popover`), not the inner content wrapper |
| `context` | `FloatingContext` | The raw floating-ui context |
| `actualPlacement` | `Placement` | The resolved placement after flip/shift middleware |
| `transformOrigin` | `string` | CSS transform-origin string for the scale animation |

---

## Behavior

- **Hover trigger**: opens after 500 ms delay, closes after 250 ms delay. Uses `safePolygon` so the pointer can move from trigger to panel without accidental close.
- **Keyboard navigation**: `ArrowUp` / `ArrowDown` move through list items when `focusTrap` is active. Navigation loops, allows escape.
- **Nested close**: content render function receives `closeAllSequence` which closes the entire popover chain (e.g. a sub-menu and its parent).
- **Accessibility**: with `title` / `showCloseButton` the panel is `role="dialog"` + `aria-labelledby` (the header). Otherwise it has no role — set `role` yourself for tooltip/menu semantics. Esc and outside-press dismiss; focus returns to the trigger.
- **Surface**: the panel is a `Box` (`material="plate"` glass fill + blur, `shape="rounded"` corners from `--popover-radius` (`--radius-xl`, 16px — matches the corner a `size="m"` `Button`'s `pill` shape produces, so the panel reads as rounded in harmony with buttons without itself looking like a pill), `elevation="overlay"` shadow + z-index). Only the header/content layout lives in the component's own stylesheet.
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
  {({ opened }) => (
    <Button
      label="Info"
      additionalIcon={opened ? <ChevronUp /> : <ChevronDown />}
    />
  )}
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

### Programmatic control via ref

```tsx
const popoverRef = useRef<PopoverRef>(null);

<>
  <Popover ref={popoverRef} content={<Panel />}>
    <Button label="Open" />
  </Popover>
  <Button
    label="Close from outside"
    onClick={() => popoverRef.current?.closePopup()}
  />
</>
```

### Close from inside content

```tsx
<Popover
  content={({ closePopup }) => (
    <div>
      <p>Are you sure?</p>
      <Button label="Confirm" onClick={() => { confirm(); closePopup(); }} />
    </div>
  )}
>
  <Button label="Open confirmation" />
</Popover>
```

### Close entire nested chain

```tsx
<Popover
  content={({ closeAllSequence }) => (
    <Popover
      content={({ closeAllSequence: closeAll }) => (
        <Button label="Close all" onClick={closeAll} />
      )}
    >
      <Button label="Open nested" />
    </Popover>
  )}
>
  <Button label="Open parent" />
</Popover>
```
