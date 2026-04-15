# Toolbar

A horizontal (or vertical) action bar with `role="toolbar"`. Composes actions, a title, and layout sections. Used as the `header` prop of `Screen`.

## Import

```tsx
import { Toolbar } from 'altrone-ui';
```

---

## Components

### Toolbar

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `placement` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | Which edge the toolbar is positioned on. Affects `aria-orientation` and CSS layout. |
| `fixed` | `boolean` | `false` | Apply `position: absolute` to the toolbar (for overlay toolbars inside a positioned container) |
| `showBackdrop` | `boolean` | `false` | Show a blurred backdrop behind the toolbar |
| `children` | `ReactNode` | — | Toolbar sub-components |
| `ref` | `Ref<HTMLDivElement>` | — | Forwarded ref |

All standard `HTMLAttributes<HTMLDivElement>` are also accepted.

---

### Toolbar.Action

A `Button` with `variant="text"`. Accepts all `ButtonProps` except `variant`.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | **Required.** Button label / accessible name |
| `icon` | `ReactElement` | — | Icon |
| `showLabel` | `boolean` | `true` | Set to `false` for icon-only buttons (auto-wraps in Tooltip) |
| `kbd` | `string` | — | Keyboard shortcut hint displayed in the button tooltip |
| `onClick` | `() => void` | — | Click handler |
| `disabled` | `boolean` | `false` | — |
| `ref` | `Ref<HTMLButtonElement>` | — | Forwarded ref |

---

### Toolbar.Title

A text title, optionally with a clickable dropdown chevron.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | **Required.** Title text |
| `clickable` | `boolean` | `false` | Show a `ChevronDown` button next to the title (e.g. for a workspace switcher) |
| `ref` | `Ref<HTMLDivElement>` | — | Forwarded ref |

---

### Toolbar.Group

A flex row that groups related actions. Supports alignment and flex weight.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `align` | `'start' \| 'center' \| 'end' \| 'between'` | `'start'` | Justification of items inside the group |
| `weight` | `number` | — | `flex` value (e.g. `weight={1}` makes the group fill remaining space) |
| `children` | `ReactNode` | — | — |
| `ref` | `Ref<HTMLDivElement>` | — | Forwarded ref |

---

### Toolbar.Leading / Toolbar.Center / Toolbar.Trailing

Layout sections for organizing the toolbar into left, center, and right areas.

| Component | Description |
|-----------|-------------|
| `Toolbar.Leading` | Left section |
| `Toolbar.Center` | Center section |
| `Toolbar.Trailing` | Right section |

---

## Examples

### Basic with actions

```tsx
<Toolbar>
  <Toolbar.Action label="New file" icon={<Plus />} onClick={createFile} />
  <Toolbar.Action label="Save" icon={<Save />} onClick={save} />
  <Toolbar.Action label="Delete" icon={<Trash />} onClick={deleteFile} />
</Toolbar>
```

### With title and sections

```tsx
<Toolbar>
  <Toolbar.Leading>
    <Toolbar.Title label="My Workspace" />
  </Toolbar.Leading>
  <Toolbar.Center>
    <Search value={query} onChange={(e) => setQuery(e.target.value)} />
  </Toolbar.Center>
  <Toolbar.Trailing>
    <Toolbar.Action label="Settings" icon={<Settings />} showLabel={false} onClick={openSettings} />
    <Avatar firstName="Alex" size="s" />
  </Toolbar.Trailing>
</Toolbar>
```

### With groups and alignment

```tsx
<Toolbar>
  <Toolbar.Group weight={1}>
    <Toolbar.Action label="Undo" icon={<Undo />} kbd="⌘Z" onClick={undo} />
    <Toolbar.Action label="Redo" icon={<Redo />} kbd="⌘⇧Z" onClick={redo} />
  </Toolbar.Group>
  <Toolbar.Group align="end">
    <Toolbar.Action label="Share" icon={<Share />} onClick={share} />
    <Toolbar.Action label="Publish" icon={<Send />} onClick={publish} />
  </Toolbar.Group>
</Toolbar>
```

### Clickable title (workspace switcher)

```tsx
<Toolbar>
  <Toolbar.Title label="Acme Corp" clickable onClick={openWorkspaceSwitcher} />
</Toolbar>
```

### As Screen header

```tsx
<Screen
  header={
    <Toolbar>
      <Toolbar.Leading>
        <Toolbar.Title label="Dashboard" />
      </Toolbar.Leading>
      <Toolbar.Trailing>
        <Toolbar.Action label="New" icon={<Plus />} onClick={createNew} />
      </Toolbar.Trailing>
    </Toolbar>
  }
>
  <PageContent />
</Screen>
```

### Vertical placement (side toolbar)

```tsx
<Toolbar placement="left">
  <Toolbar.Action label="Select" icon={<MousePointer />} showLabel={false} onClick={setTool('select')} />
  <Toolbar.Action label="Draw"   icon={<Pen />}          showLabel={false} onClick={setTool('draw')} />
  <Toolbar.Action label="Erase"  icon={<Eraser />}       showLabel={false} onClick={setTool('erase')} />
</Toolbar>
```
