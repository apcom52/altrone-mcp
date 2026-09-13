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
| `placement` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | Which edge the toolbar sits on. `left`/`right` flip `aria-orientation` to `vertical` and stack regions top-to-bottom. |
| `size` | `'mini' \| 's' \| 'm' \| 'l' \| 'xl'` | `'m'` | Toolbar height + inset. Scales `Toolbar.Title` and cascades as the default `size` of every `Toolbar.Action` inside it (override per action). |
| `sticky` | `boolean` | `false` | `position: sticky` to the `placement` edge of the nearest scroll container. |
| `showBackdrop` | `boolean` | `false` | Blurred gradient scrim behind the toolbar — lifts `grouped` pills off busy content. |
| `fixed` | `boolean` | — | **Deprecated**, use `sticky`. Kept working until v4. |
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
| `onClick` | `() => void` | — | — |
| `disabled` | `boolean` | `false` | — |
| `ref` | `Ref<HTMLButtonElement>` | — | Forwarded. |

---

### Toolbar.Group

Collects related actions into a blurred glass capsule — the signature Toolbar look, inherited from the parent toolbar's `variant` (a pill under `grouped` / `solid`, a bare row under `plain`). Override it per group with `variant`. For a flat cluster with no group box, drop the actions into the toolbar (or a region) directly.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `align` | `'start' \| 'center' \| 'end' \| 'between'` | `'start'` | Justification of items inside the group. |
| `weight` | `number` | — | `flex` value — `weight={1}` makes the group eat the remaining space. |
| `variant` | `'plain' \| 'grouped' \| 'solid'` | inherited | Overrides the toolbar's `variant` for this group only: `plain` drops the glass pill, `grouped`/`solid` force it on. |
| `ref` | `Ref<HTMLDivElement>` | — | Forwarded. |

---

### Toolbar.Separator

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'space' \| 'line'` | `'space'` | `space` — a flexible gap (`flex: 1`) that pushes what follows to the far edge. `line` — a hairline divider between adjacent groups (`role="separator"`). |
| `ref` | `Ref<HTMLDivElement>` | — | Forwarded. |

---

### Toolbar.Title

Font size follows the toolbar `size`. The label is rendered through `Text` with `truncate` — a title too long for the space left in the row ellipsizes instead of pushing the other groups off the edge.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | **Required.** Title text — truncated with an ellipsis when the row runs out of room. |
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
    <Toolbar.Title label="Button" />
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

### Header action presets

Pre-composed `Toolbar.Action` compositions for common header controls. All are fully controlled (no internal state), icon-only by default, with a localized `aria-label` from the `toolbar` locale namespace.

| Component | Props | Description |
|-----------|-------|--------------|
| `Toolbar.BackAction` | `onClick`, `showLabel?` (default `false`) | Single icon button, back arrow. |
| `Toolbar.SearchAction` | `onClick`, `showLabel?` (default `false`) | Single icon button, search. |
| `Toolbar.SidebarToggleAction` | `collapsed: boolean`, `onClick`, `showLabel?` | Swaps icon/label on `collapsed`. Wire `collapsed` to the same boolean you pass to `Screen.Sidebar`'s `collapsed` prop. |
| `Toolbar.BackForwardAction` | `onBack`, `onForward`, `backDisabled?`, `forwardDisabled?` | Paired segmented control (browser/macOS-style) — renders its own `Toolbar.Group`, don't wrap it in another one. |

---

## Examples

### Application header

```tsx
<Toolbar sticky>
  <Toolbar.Leading>
    {/* `clickable` promises a menu — wrap it in the Dropdown that opens one */}
    <Dropdown content={<Dropdown.Menu>{/* workspaces… */}</Dropdown.Menu>}>
      <Toolbar.Title label="Northwind" clickable />
    </Dropdown>
  </Toolbar.Leading>
  <Toolbar.Center>
    <TextInput value={query} onChange={setQuery} placeholder="Search everything" />
  </Toolbar.Center>
  <Toolbar.Trailing>
    <Toolbar.Action label="Notifications" icon={<Bell />} showLabel={false} badge={3} />
    <Toolbar.Action label="Settings" icon={<Settings />} showLabel={false} />
    <Avatar firstName="Ada" lastName="Lovelace" size="s" />
  </Toolbar.Trailing>
</Toolbar>
```

### Frame / panel header

```tsx
<div className="editor-pane">
  <Toolbar size="s">
    <Toolbar.Leading>
      <Toolbar.Title label="index.tsx" />
    </Toolbar.Leading>
    <Toolbar.Trailing>
      <Switcher checked={wrap} onChange={toggleWrap}>Wrap</Switcher>
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
  <Toolbar.Action label="Undo" icon={<Undo />} kbd="⌘Z" />
  <Toolbar.Action label="Redo" icon={<Redo />} kbd="⌘⇧Z" />
  <Toolbar.Separator />
  <Toolbar.Action label="Delete" icon={<Trash />} danger />
</Toolbar>
```

### As Screen.Header

```tsx
<Screen>
  <Screen.Header>
    <Toolbar variant="solid">
      <Toolbar.Leading>
        <Toolbar.Title label="Dashboard" />
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

### Header action presets

```tsx
<Toolbar>
  <Toolbar.Leading>
    <Toolbar.BackForwardAction
      onBack={goBack}
      onForward={goForward}
      backDisabled={!canGoBack}
      forwardDisabled={!canGoForward}
    />
    <Toolbar.SidebarToggleAction
      collapsed={sidebarCollapsed}
      onClick={() => setSidebarCollapsed((v) => !v)}
    />
    <Toolbar.SearchAction onClick={openSearch} />
  </Toolbar.Leading>
</Toolbar>
```
