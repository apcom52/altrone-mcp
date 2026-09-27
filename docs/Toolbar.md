# Toolbar

One horizontal or vertical strip of actions with `role="toolbar"`, styled after
Apple's liquid-glass toolbars — `Toolbar.Group` collects controls into blurred
glass capsules with a bright specular top edge. The same component serves as an
application header, a frame/panel header, or a row of floating glass pills over
a canvas — the `variant` prop picks how much surface it carries, not the markup.
Every variant flows in normal document order; the toolbar never positions
itself.

## Import

```tsx
import { Toolbar } from 'altrone-ui';
```

---

## Components

### Toolbar

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'plain' \| 'grouped' \| 'solid'` | `'solid'` | How much surface the toolbar carries. `plain` — no toolbar fill, no group material; flat text buttons for a strip on a surface that already has its own background. `grouped` — no toolbar fill, but every `Toolbar.Group` is a raised glass pill; the transparent strip lets the pills read as islands on whatever surface is behind them (canvas/editor overlays, positioned by the caller). `solid` — an accent-tinted, blurred toolbar fill with a hairline on its content-facing edge, plus the glass group pills; a self-sufficient app/frame header. |
| `edge` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | Which edge the toolbar sits on. `left`/`right` flip `aria-orientation` to `vertical` and stack regions top-to-bottom. |
| `size` | `'mini' \| 's' \| 'm' \| 'l' \| 'xl'` | `'m'` | Toolbar height + inset. Scales `Toolbar.Title` and cascades as the default `size` of every `Toolbar.Action` inside it (override per action). |
| `sticky` | `boolean` | `false` | `position: sticky` to the `edge` of the nearest scroll container. |
| `showBackdrop` | `boolean` | `false` | Blurred gradient scrim behind the toolbar — lifts `grouped` pills off busy content. |
| `fixed` | `boolean` | — | **Deprecated**, use `sticky`. Kept working until v4. |
| `icons` | `Partial<ToolbarIconSet>` | — | Overrides for icons unique to `Toolbar` (`sidebarExpand`, `sidebarCollapse`, `titleMenu`, `overflowUp`, `overflowDown`, `overflowLeft`, `overflowRight`), each a `ReactElement` |
| `children` | `ReactNode` | — | Actions/groups directly, or `Toolbar.Leading`/`Center`/`Trailing` regions. |
| `ref` | `Ref<HTMLDivElement>` | — | Forwarded to the root element. |

All standard `HTMLAttributes<HTMLDivElement>` are also accepted (`role` included — override it to render a plain `<div>`-shaped bar without the toolbar semantics).

---

### Toolbar.Action

A `Button` with `variant="text"`. Accepts all `ButtonProps` except `variant`. Inherits `size` from the parent `Toolbar` unless set explicitly.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | **Required.** Button label / accessible name. |
| `icon` | `ReactElement` | — | Icon. |
| `showLabel` | `boolean` | `true` | `false` → icon-only (auto-wraps in a Tooltip built from `label` + `kbd`). |
| `kbd` | `string` | — | Keyboard-shortcut hint shown in the tooltip. |
| `size` | `'mini' \| 's' \| 'm' \| 'l' \| 'xl'` | inherited | Overrides the toolbar's cascaded size. |
| `selected` | `boolean` | `false` | Pressed/active state (e.g. the current tool). |
| `badge` | `number \| string \| ReactElement` | — | Corner badge. |
| `priority` | `'high' \| 'medium' \| 'low'` | `'medium'` | Collapse priority when the row runs out of room — see [Overflow](#overflow). |
| `onClick` | `() => void` | — | — |
| `disabled` | `boolean` | `false` | — |
| `ref` | `Ref<HTMLButtonElement>` | — | Forwarded. |

---

### Toolbar.Group

Collects related actions into a blurred glass capsule — the signature Toolbar look, inherited from the parent toolbar's `variant` (a pill under `grouped` / `solid`, a bare row under `plain`). Override it per group with `variant`.

**Wrap `Toolbar.Action`s in a `Toolbar.Group` rather than dropping them straight into the toolbar (or a region).** A bare, group-less cluster of actions still renders and still works, but it's not recommended: it skips the glass-pill treatment that makes related actions read as one unit, and — since `Toolbar.Group` is the atomic collapse unit for [Overflow](#overflow) — an ungrouped action collapses into the overflow menu on its own instead of staying grouped with its neighbors until they all collapse together. Reach for `variant="plain"` on the group (or the whole toolbar) instead of omitting the group, when the flat, pill-less look is what you want.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `justify` | `'start' \| 'center' \| 'end' \| 'between'` | `'start'` | Justification of items inside the group. |
| `weight` | `number` | — | `flex` value — `weight={1}` makes the group eat the remaining space. |
| `variant` | `'plain' \| 'grouped' \| 'solid'` | inherited | Overrides the toolbar's `variant` for this group only: `plain` drops the glass pill, `grouped`/`solid` force it on. |
| `priority` | `'high' \| 'medium' \| 'low'` | `'medium'` | Collapse priority for the whole group as one unit — see [Overflow](#overflow). |
| `ref` | `Ref<HTMLDivElement>` | — | Forwarded. |

---

### Toolbar.Separator

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'space' \| 'line'` | `'space'` | `space` — a flexible gap (`flex: 1`) that pushes what follows to the far edge. `line` — a hairline divider between adjacent groups (`role="separator"`). |
| `ref` | `Ref<HTMLDivElement>` | — | Forwarded. |

---

### Toolbar.Title

Font size follows the toolbar `size`. The title is rendered through `Text` with `truncate` — a title too long for the space left in the row ellipsizes instead of pushing the other groups off the edge.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | — | **Required.** Title text — truncated with an ellipsis when the row runs out of room. |
| `clickable` | `boolean` | `false` | Marks the title as a popover/menu trigger: adds a `ChevronDown` next to it and a pointer cursor. Wrap the `Toolbar.Title` in a `Dropdown` to open a menu. A static title (default) is just text. |
| `ref` | `Ref<HTMLDivElement>` | — | Forwarded. |

---

### Toolbar.Logo

A slot for the product mark — pass an `<svg>` or `<img>` as children. It is sized to a square that tracks the toolbar `size` (24px at `mini` … 40px at `xl`). Wrap it in an `<a>` or give it an `onClick` when it should navigate home.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | The mark (`<svg>` / `<img>`). |
| `ref` | `Ref<HTMLDivElement>` | — | Forwarded. |

```tsx
<Toolbar>
  <Toolbar.Leading>
    <Toolbar.Logo><BrandMark /></Toolbar.Logo>
    <Toolbar.Title title="Button" />
  </Toolbar.Leading>
</Toolbar>
```

---

### Toolbar.Leading / Toolbar.Center / Toolbar.Trailing

Optional layout regions. Present them and the toolbar lays out as a three-track
grid (`1fr auto 1fr`) so the centre stays optically centred no matter how wide
the sides get. Omit them for a plain left-to-right row.

| Component | Description |
|-----------|-------------|
| `Toolbar.Leading` | Start region (left, or top when vertical). |
| `Toolbar.Center` | Centre region. |
| `Toolbar.Trailing` | End region (right, or bottom when vertical). |

---

### Overflow

Each `Toolbar.Leading` / `Center` / `Trailing` (or a flat `Toolbar` with no regions) watches its
own width (height for a vertical toolbar) and, once its direct children no longer fit, folds
whatever doesn't fit into an overflow `Dropdown` — lowest `priority` first:

- `'low'` collapses first.
- `'medium'` (the default) collapses only once every `'low'` item in the same row is already
  hidden.
- `'high'` never collapses — the row may still overflow visually in that case.
- Within a tier, items collapse in reading order — leftmost (or topmost, for a vertical toolbar)
  first.

`Toolbar.Action` and `Toolbar.Group` are the collapsible units — a `Toolbar.Group` collapses as
one atomic block, and when it does, its own actions are flattened into the overflow menu as plain
items (no nested grouping). Other children (`Toolbar.Title`, `Toolbar.Logo`, `Toolbar.Separator`,
arbitrary nodes) don't support `priority` and are never collapsed.

The trigger renders at whichever edge of the region sits closest to the toolbar's center, chevrons
pointing further inward:

| Region | Trigger position | Icon (horizontal) | Icon (vertical) |
|--------|-------------------|--------------------|------------------|
| `Toolbar.Leading` / `Center` (and a flat `Toolbar`) | end of the region's own children | `ChevronsRight` | `ChevronsDown` |
| `Toolbar.Trailing` | start of the region's own children | `ChevronsLeft` | `ChevronsUp` |

`Toolbar.Leading` is anchored to the toolbar's start edge, so its own last child sits closest to
the center. `Toolbar.Trailing` is anchored to the end edge instead, so it's the *first* child that
sits closest to the center — the trigger goes there.

```tsx
<Toolbar.Trailing>
  <Toolbar.Action label="Star" icon={<Star />} showLabel={false} priority="high" />
  <Toolbar.Group priority="medium">
    <Toolbar.Action label="Share" icon={<Share />} showLabel={false} />
    <Toolbar.Action label="Comments" icon={<MessageCircle />} showLabel={false} />
  </Toolbar.Group>
  <Toolbar.Action label="Filter" icon={<Filter />} showLabel={false} priority="low" />
  <Toolbar.Action label="Print" icon={<Printer />} showLabel={false} priority="low" />
</Toolbar.Trailing>
```

---

### Toolbar.SidebarToggleAction

The one pre-composed header action — icon-only by default, with a localized `aria-label` from the `toolbar` locale namespace. Icon/label swap between a collapse and an expand affordance.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `collapsed` | `boolean` | — | Sidebar state. Omit to read/drive `Screen.Sidebar` automatically via `Screen`'s context (works only inside a `Screen` whose `Screen.Sidebar` is itself uncontrolled). Pass it explicitly for full control — the component then holds no state of its own and `onClick` is entirely yours. |
| `onClick` | `(event) => void` | — | Only needed when `collapsed` is controlled — the uncontrolled path toggles `Screen.Sidebar` on its own and still calls this if you pass it. |
| `showLabel` | `boolean` | `false` | — |

```tsx
// Uncontrolled — inside a Screen with an uncontrolled Screen.Sidebar, no state needed
<Toolbar.SidebarToggleAction />

// Controlled — own the state yourself, wired to the same boolean as Screen.Sidebar's `collapsed`
<Toolbar.SidebarToggleAction
  collapsed={sidebarCollapsed}
  onClick={() => setSidebarCollapsed((v) => !v)}
/>
```

---

## Examples

### Application header

```tsx
<Toolbar sticky>
  <Toolbar.Leading>
    {/* `clickable` promises a menu — wrap it in the Dropdown that opens one */}
    <Dropdown content={<Dropdown.Menu>{/* workspaces… */}</Dropdown.Menu>}>
      <Toolbar.Title title="Northwind" clickable />
    </Dropdown>
  </Toolbar.Leading>
  <Toolbar.Center>
    <TextInput value={query} onChange={setQuery} placeholder="Search everything" />
  </Toolbar.Center>
  <Toolbar.Trailing>
    <Toolbar.Group>
      <Toolbar.Action label="Notifications" icon={<Bell />} showLabel={false} badge={3} />
      <Toolbar.Action label="Settings" icon={<Settings />} showLabel={false} />
    </Toolbar.Group>
    <Avatar firstName="Ada" lastName="Lovelace" size="s" />
  </Toolbar.Trailing>
</Toolbar>
```

### Frame / panel header

```tsx
<div className="editor-pane">
  <Toolbar size="s">
    <Toolbar.Leading>
      <Toolbar.Title title="index.tsx" />
    </Toolbar.Leading>
    <Toolbar.Trailing>
      <Switch checked={wrap} onChange={toggleWrap}>Wrap</Switch>
      <Toolbar.Separator variant="line" />
      <Toolbar.Group>
        <Toolbar.Action label="Format" icon={<Wand />} showLabel={false} kbd="⇧⌥F" />
        <Toolbar.Action label="More" icon={<Ellipsis />} showLabel={false} />
      </Toolbar.Group>
    </Toolbar.Trailing>
  </Toolbar>
  <CodeArea />
</div>
```

### Flat bar with a flexible separator

```tsx
<Toolbar variant="plain">
  <Toolbar.Group>
    <Toolbar.Action label="Undo" icon={<Undo />} kbd="⌘Z" />
    <Toolbar.Action label="Redo" icon={<Redo />} kbd="⌘⇧Z" />
  </Toolbar.Group>
  <Toolbar.Separator />
  <Toolbar.Group>
    <Toolbar.Action label="Delete" icon={<Trash />} danger />
  </Toolbar.Group>
</Toolbar>
```

`variant="plain"` on the toolbar already drops the glass pill from every group, so wrapping the actions here doesn't change how it looks — only how "Delete" collapses on its own into overflow instead of bundling with "Undo"/"Redo".

### As Screen.Header

```tsx
<Screen>
  <Screen.Header>
    <Toolbar variant="solid">
      <Toolbar.Leading>
        <Toolbar.Title title="Dashboard" />
      </Toolbar.Leading>
      <Toolbar.Trailing>
        <Toolbar.Action label="New" icon={<Plus />} onClick={createNew} />
      </Toolbar.Trailing>
    </Toolbar>
  </Screen.Header>
  <Screen.Content>
    <PageContent />
  </Screen.Content>
</Screen>
```

`Screen.Header` is a transparent zone — the `solid` toolbar is what paints the frosted, accent-tinted header surface. Use `Screen.Header`'s `insetStart` prop to adjust the gutter that keeps the bar clear of the sidebar.

### Grouped pills over a canvas

```tsx
{/* The caller positions the strip — the toolbar itself always flows inline. */}
<div style={{ position: 'relative' }}>
  <div style={{ position: 'absolute', insetInline: 0, top: 0 }}>
    <Toolbar variant="grouped" showBackdrop>
      <Toolbar.Leading>
        <Toolbar.Group>
          <Toolbar.Action icon={<Undo />} label="Undo" showLabel={false} kbd="⌘Z" />
          <Toolbar.Action icon={<Redo />} label="Redo" showLabel={false} kbd="⌘⇧Z" />
        </Toolbar.Group>
      </Toolbar.Leading>
      <Toolbar.Trailing>
        <Toolbar.Group>
          <Toolbar.Action icon={<Share />} label="Share" showLabel={false} />
        </Toolbar.Group>
      </Toolbar.Trailing>
    </Toolbar>
  </div>

  <Canvas />
</div>
```

### Sidebar toggle, uncontrolled

```tsx
<Screen>
  <Screen.Header>
    <Toolbar>
      <Toolbar.Leading>
        <Toolbar.SidebarToggleAction />
      </Toolbar.Leading>
    </Toolbar>
  </Screen.Header>
  <Screen.Sidebar>{/* … */}</Screen.Sidebar>
  <Screen.Content>{/* … */}</Screen.Content>
</Screen>
```
