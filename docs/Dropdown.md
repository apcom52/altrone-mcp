# Dropdown

A floating menu anchored to a trigger element. Built on `Popover` with list keyboard navigation. The content area is a `CloseDropdownContext` provider — sub-components inside the menu can call `useCloseDropdown()` to close the popover programmatically.

Opening a menu transfers DOM focus to its first available item; the first ArrowDown moves to the next available item. Escape returns focus to the trigger. Virtual navigation keeps DOM focus on the trigger.

Popover-based panels are keyboard-accessible inside Modal and Drawer. Trapped panels temporarily own focus according to `focusTrapTargets`, including nested panels, and return focus to their trigger on close. With `focusTrap={false}`, the portal joins the parent sheet’s focus boundary.

## Import

```tsx
import { Dropdown } from 'altrone-ui';
```

---

## Components

### Dropdown (container)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode \| ((ctx: { open: boolean; hide: () => void }) => ReactNode)` | — | **Required.** Trigger element. Can be a render function to access `open` state. |
| `content` | `ReactNode \| ((ctx: { hide: () => void; hideAllSequence: () => void }) => ReactNode)` | — | **Required.** Dropdown content. |
| `placement` | `Placement \| 'auto'` | `'bottom'` (`'auto'` for contextmenu) | Floating UI placement (e.g. `'bottom-start'`, `'top-end'`) |
| `trigger` | `'click' \| 'focus' \| 'hover' \| 'contextmenu' \| Array` | `'click'` | What opens the dropdown |
| `closeParentPopover` | `boolean` | `true` | When inside a nested dropdown, whether clicking an action closes the entire chain or just the innermost popover. |
| `focusTrap` | `boolean` | `true` | Trap focus inside the dropdown while open |

All `PopoverProps` are also accepted — including `ref` (forwarded to the trigger DOM element) and
`controlRef` (imperative `PopoverRef`: `show`/`hide`/…, see `Popover.md`).

---

### Dropdown.Menu

Container for menu items. Wraps items in a styled `<div>`.

| Prop | Type | Description |
|------|------|-------------|
| `children` | `ReactElement \| null \| (ReactElement \| null)[]` | Menu items |
| `defaultFocusItemIndex` | `number` | Initially focused item index |
| `maxHeight` | `CSSProperties['maxHeight']` | Caps the menu's height and scrolls past it (via `Scrollable`); defaults to `--dropdown-menu-max-height` (320px) |
| `ref` | `Ref<HTMLDivElement>` | Forwarded ref |

---

### Dropdown.Action

A clickable menu item.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | **Required.** Item label |
| `icon` | `ReactElement` | — | Icon to the left of the label |
| `hintText` | `string` | — | Secondary text shown on the right (e.g. keyboard shortcut `⌘+S`) |
| `badge` | `string \| number \| ReactElement` | — | Badge on the right |
| `danger` | `boolean` | `false` | Danger (red) color treatment |
| `disabled` | `boolean` | `false` | Disables the item |
| `asChild` | `boolean` | `false` | Merges action styles onto the single child element (Slot pattern) |
| `ref` | `Ref<HTMLButtonElement>` | — | Forwarded ref (or the child element's ref when `asChild` is used) |
| `onClick` | `(event: MouseEvent) => void` | — | Click handler; runs before the menu closes, `event.preventDefault()` keeps it open |

---

### Dropdown.Checkbox

Checkboxes and radio items use native button activation: Enter, Space or a mouse click calls `onChange` once with a click event. `onKeyDown` can cancel keyboard activation with `preventDefault()`; `onClick` can cancel the value change the same way. The menu stays open after selection.

A toggleable checkbox item inside the menu.

| Prop | Type | Description |
|------|------|-------------|
| `label` | `string` | **Required.** Item label |
| `checked` | `boolean` | **Required.** Checked state |
| `onChange` | `(state: boolean, event: MouseEvent \| KeyboardEvent) => void` | **Required.** Called with the next state |
| `onClick` / `onKeyDown` | native handlers | Run before the toggle; `event.preventDefault()` skips it |
| `disabled` | `boolean` | — |
| `ref` | `Ref<HTMLButtonElement>` | Forwarded ref |

---

### Dropdown.RadioList

A group of mutually exclusive options.

| Prop | Type | Description |
|------|------|-------------|
| `label` | `string` | Group label |
| `value` | `T` | **Required.** Currently selected value |
| `onChange` | `(value: T, event: MouseEvent \| KeyboardEvent) => void` | **Required.** Called when selection changes |
| `children` | `ReactElement<DropdownRadioListItem>[]` | **Required.** `Dropdown.RadioItem` elements |
| `ref` | `Ref<HTMLDivElement>` | Forwarded ref |

---

### Dropdown.RadioItem

An individual option inside `Dropdown.RadioList`.

| Prop | Type | Description |
|------|------|-------------|
| `value` | `T` | **Required.** This item's value |
| `label` | `string` | **Required.** Display label |
| `disabled` | `boolean` | — |
| `onClick` / `onKeyDown` | native handlers | Run before the selection; `event.preventDefault()` skips it |
| `ref` | `Ref<HTMLButtonElement>` | Forwarded ref |

---

### Dropdown.ChildMenu

A menu item that opens a nested sub-menu on click, positioned to the side of the parent item.

| Prop | Type | Description |
|------|------|-------------|
| `label` | `string` | **Required.** Item label |
| `icon` | `ReactElement` | — |
| `disabled` | `boolean` | — |
| `ref` | `Ref<HTMLElement>` | Forwarded ref |
| `children` | `Dropdown.Action` elements | Content of the sub-menu |

---

## Examples

### Basic

```tsx
<Dropdown
  content={
    <Dropdown.Menu>
      <Dropdown.Action label="Edit"      icon={<Pencil />} onClick={handleEdit} />
      <Dropdown.Action label="Duplicate" icon={<Copy />}   onClick={handleDuplicate} />
      <Divider />
      <Dropdown.Action label="Delete" icon={<Trash />} danger onClick={handleDelete} />
    </Dropdown.Menu>
  }
>
  <Button label="Actions" additionalIcon={<ChevronDown />} />
</Dropdown>
```

### Trigger shows open state

```tsx
<Dropdown content={<Dropdown.Menu>…</Dropdown.Menu>}>
  {({ open }) => (
    <Button
      label="Options"
      additionalIcon={open ? <ChevronUp /> : <ChevronDown />}
    />
  )}
</Dropdown>
```

### Action activation

Custom `asChild` roots receive a roving `tabIndex` (0 for the active item, -1 for other items) so even a `<div>` can receive DOM focus. An explicit action `tabIndex` takes precedence over the child's `tabIndex`; either overrides the automatic value.

A native `Dropdown.Action` button uses native Enter/Space activation. With `asChild`, native buttons and Enter on links with `href` retain browser activation; other roots synthesize one click for Enter/Space, including Space on links. Each gesture calls `onClick` once. `onKeyDown` can cancel activation with `preventDefault()`; `onClick` can prevent menu closure with `preventDefault()`.

### With keyboard shortcuts (hintText)

```tsx
<Dropdown.Action label="Save"  icon={<Save />}  hintText="⌘+S" onClick={save} />
<Dropdown.Action label="Print" icon={<Print />} hintText="⌘+P" onClick={print} />
```

### RadioList for mutually exclusive options

```tsx
const [theme, setTheme] = useState('system');

<Dropdown content={
  <Dropdown.Menu>
    <Dropdown.RadioList label="Theme" value={theme} onChange={setTheme}>
      <Dropdown.RadioItem value="system" label="System" />
      <Dropdown.RadioItem value="light"  label="Light" />
      <Dropdown.RadioItem value="dark"   label="Dark" />
    </Dropdown.RadioList>
  </Dropdown.Menu>
}>
  <Button label="Theme" />
</Dropdown>
```

### Checkbox items

```tsx
<Dropdown.Checkbox
  label="Email notifications"
  checked={notifications}
  onChange={setNotifications}
/>
```

### Nested sub-menu (ChildMenu)

```tsx
<Dropdown.ChildMenu icon={<Share />} label="Share">
  <Dropdown.Action label="Copy link"   icon={<Link />} />
  <Dropdown.Action label="Send email"  icon={<Mail />} />
</Dropdown.ChildMenu>
```

### Actions as links (asChild)

```tsx
<Dropdown.Action asChild icon={<Settings />} label="Settings" hintText="⌘+,">
  <a href="/settings" />
</Dropdown.Action>
```

### Full example: account menu

```tsx
<Dropdown
  placement="bottom-end"
  content={
    <Dropdown.Menu>
      <Dropdown.Action icon={<User />} label="Alex Petrov" hintText="@apcom" asChild>
        <div style={{ cursor: 'default' }} />
      </Dropdown.Action>
      <Divider />
      <Dropdown.Action icon={<Settings />} label="Profile settings" />
      <Dropdown.Action icon={<CreditCard />} label="Billing" badge="PRO" />
      <Divider />
      <Dropdown.RadioList label="Theme" value={theme} onChange={setTheme}>
        <Dropdown.RadioItem value="system" label="System" />
        <Dropdown.RadioItem value="light"  label="Light" />
        <Dropdown.RadioItem value="dark"   label="Dark" />
      </Dropdown.RadioList>
      <Divider />
      <Dropdown.Checkbox label="Compact mode" checked={compact} onChange={setCompact} />
      <Divider />
      <Dropdown.Action danger icon={<LogOut />} label="Sign out" />
    </Dropdown.Menu>
  }
>
  <Avatar firstName="Alex" lastName="Petrov" size="s" />
</Dropdown>
```

## Context menu

Use `trigger="contextmenu"` for right-click and 500 ms touch hold. A movement over 10 px, pointer release/cancel, scrolling, disabling, or unmounting cancels the pending hold. Native context menus and the iOS callout are suppressed only on the enabled trigger; Android's native long-press contextmenu is deduplicated. The following synthetic click is suppressed.

The menu is positioned at the pointer; another right-click moves it. ContextMenu and Shift+F10 open at the trigger's bottom-left corner. `placement="auto"` resolves to `bottom-start` with flip/shift at viewport edges. Explicit placements are relative to the point. `overlap` and `parentWidth` are ignored with a development warning. Escape, outside press, and `controlRef.hide()` close it and restore focus. Opening reports `onOpenChange(true, event, 'context-menu')`; exported `PopoverOpenChangeReason` extends Floating UI's `OpenChangeReason` with `'context-menu'`. Combine triggers with `['click', 'contextmenu']`.

Dropdown defaults to `placement="auto"` when its triggers include `contextmenu`; other dropdowns still default to `bottom`. Context menus supplement primary actions: expose every menu action through visible controls or a regular menu as well.

```tsx
<Dropdown trigger="contextmenu" content={<Dropdown.Menu><Dropdown.Action label="Duplicate" /><Dropdown.Action label="Delete" danger /></Dropdown.Menu>}>
  <Button label="File actions" />
</Dropdown>
```
