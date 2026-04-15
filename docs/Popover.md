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
| `children` | `ReactNode \| ((ctx: { opened: boolean; closePopup: () => void }) => ReactNode)` | — | **Required.** Trigger element. Can be a render function to access the open state and a close callback. |
| `content` | `ReactNode \| ((ctx: { closePopup: () => void; closeAllSequence: () => void }) => ReactNode)` | — | **Required.** Popover panel content. Render function receives `closePopup` and `closeAllSequence` (closes entire nested chain). |
| `placement` | `Placement \| 'auto'` | `'bottom'` | Floating UI placement string (`'top'`, `'bottom-start'`, `'right-end'`, etc.) or `'auto'` for automatic best-fit. |
| `trigger` | `'click' \| 'focus' \| 'hover' \| Array<'click' \| 'focus' \| 'hover'>` | `['click']` | What opens the popover. |
| `focusTrap` | `boolean` | `true` | Trap keyboard focus inside the panel while open. |
| `overlap` | `boolean` | `false` | Allow the floating panel to overlap the trigger element. |
| `ref` | `Ref<PopoverRef>` | — | Forwarded ref exposing imperative API (see below). |

All other props are forwarded to the underlying floating context.

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
| `contentNode` | `HTMLElement \| null` | The floating panel DOM element |
| `actualPlacement` | `Placement` | The resolved placement after flip/shift middleware |
| `transformOrigin` | `string` | CSS transform-origin string for the scale animation |

---

## Behavior

- **Hover trigger**: opens after 500 ms delay, closes after 250 ms delay. Uses `safePolygon` so the pointer can move from trigger to panel without accidental close.
- **Keyboard navigation**: `ArrowUp` / `ArrowDown` move through list items when `focusTrap` is active. Navigation loops, allows escape.
- **Nested close**: content render function receives `closeAllSequence` which closes the entire popover chain (e.g. a sub-menu and its parent).
- **Portal target**: `document.querySelector('[data-altrone-root="true"]')`, falls back to `document.body`.
- **Animation**: `AnimatePresence` with a scale transition using `transformOrigin` from the resolved placement.

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
