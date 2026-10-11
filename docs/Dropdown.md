# Dropdown

A floating menu anchored to a trigger element. Built on `Popover` with list keyboard navigation. The content area is a `CloseDropdownContext` provider — sub-components inside the menu can call `useCloseDropdown()` to close the popover programmatically.

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
| `placement` | `Placement \| 'auto'` | `'bottom'` | Floating UI placement (e.g. `'bottom-start'`, `'top-end'`) |
| `trigger` | `'click' \| 'focus' \| 'hover' \| Array` | `'click'` | What opens the dropdown |
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
| `onClick` | `(event: MouseEvent) => void` | — | Click handler |

---

### Dropdown.Checkbox

A toggleable checkbox item inside the menu.

| Prop | Type | Description |
|------|------|-------------|
| `label` | `string` | **Required.** Item label |
| `checked` | `boolean` | **Required.** Checked state |
| `onChange` | `(state: boolean, event: MouseEvent \| KeyboardEvent) => void` | **Required.** Called with the next state |
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
