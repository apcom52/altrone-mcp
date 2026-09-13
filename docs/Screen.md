# Screen

The layout shell for one application view: a CSS grid with six zones — a fixed header, a sidebar, scrollable content, a trailing companion pane, a footer, and a bottom navigation bar. A consumer places one or more `Screen` instances inside `Application`'s `children`; which one is active is the consumer's own concern (their router/state), not the library's.

There are **no presets** — every screen shape (app frame, reader, sign-in, error page, kanban board) is this primitive plus composition.

## Import

```tsx
import { Screen } from 'altrone-ui';
```

---

## Screen

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'mini' \| 's' \| 'm' \| 'l' \| 'xl'` | — | Constrains `Screen.Content`'s max width only — header/sidebar/footer are unaffected |
| `title` | `string` | — | Accessible name for the root region (`aria-label` + `role="region"`). Label-only, nothing is rendered |
| `contentAlign` | `'start' \| 'center'` | `'start'` | `'center'` box-centers `Screen.Content` in both axes (with `size`, a narrow centered column) — for sign-in / onboarding forms and full-page `Result` states |
| `mobileBreakpoint` | `'sm' \| 'md' \| 'lg'` | `'md'` | Viewport width below which `Screen.Sidebar` stops reserving layout space and floats over the content with a scrim (overlay mode). Independent of the zone's own `visibleFrom` / `hiddenFrom` |
| `sidebarWidth` | `string` | `'300px'` | Width of the inline sidebar column |
| `asideWidth` | `string` | `'320px'` | Width of the `Screen.Aside` column when it's a bare grid child (ignored when it's wrapped in a `Splitter`, which owns sizing) |
| `children` | `ReactNode` | — | Any of `Screen.Header`, `Screen.Sidebar`, `Screen.Content`, `Screen.Aside`, `Screen.Footer`, `Screen.BottomNavigation`, in any order. Any *other* direct child (e.g. a `Splitter` wrapping Content + Aside) lands in the content row automatically |
| `ref` | `Ref<HTMLDivElement>` | — | Forwarded ref |

All standard `HTMLAttributes<HTMLDivElement>` are also accepted. A zone you don't render is simply absent from the grid — there's no boolean visibility prop. `Screen.Sidebar`, `Screen.Aside` and `Screen.BottomNavigation` additionally take `visibleFrom` / `hiddenFrom` to gate themselves by viewport breakpoint.

The header height is the `--screen-header-height` custom property (default `56px`); the sidebar width is `--screen-sidebar-width` (default `300px`, also settable via `sidebarWidth`); the bottom bar height is `--screen-bottom-nav-height` (default `64px`).

### Breakpoint-gated zones

`Screen.Sidebar`, `Screen.Aside` and `Screen.BottomNavigation` accept:

| Prop | Type | Description |
|------|------|-------------|
| `visibleFrom` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | Render the zone only at viewport widths `>=` this breakpoint |
| `hiddenFrom` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | Render the zone only at viewport widths `<` this breakpoint |

Set neither and the zone is always mounted (its mode still adapts — the sidebar goes overlay below `mobileBreakpoint`). Set one, or both to bound the zone to a band (`visibleFrom="sm" hiddenFrom="lg"`). When out of range the zone renders **nothing** — it reserves no layout space, so a gated-out inline sidebar leaves the grid a plain single column. Exported type: `ScreenBreakpoint`.

Resolved with `useBreakpoint()`, so — like `mobileBreakpoint` — it's SSR-safe but the zone can flash in/out on the first client paint.

Two idioms:

```tsx
{/* Sidebar summonable everywhere; a bottom bar is the primary touch nav */}
<Screen.Sidebar collapsed={collapsed} onClose={() => setCollapsed(true)}>…</Screen.Sidebar>
<Screen.BottomNavigation hiddenFrom="lg">…</Screen.BottomNavigation>

{/* Hard split: sidebar on desktop only, bottom bar on touch only */}
<Screen.Sidebar visibleFrom="lg">…</Screen.Sidebar>
<Screen.BottomNavigation hiddenFrom="lg">…</Screen.BottomNavigation>
```

---

### Screen.Header

A **fixed, full-width** but **transparent** positioning zone pinned to the top of the screen — it carries no fill of its own. The visible bar is the `Toolbar` you put inside it: use **`<Toolbar variant="solid" size="m">`** for the frosted, accent-tinted header surface (the `solid` variant's fill points at the `--color-header-backdrop` token; `m` matches the 56px zone). The toolbar spans the full viewport width — its fill is edge to edge — and only its *content padding* is inset: the header toolbar, `Screen.Content` and the footer all line their content up on one shared vertical line (`--screen-content-inset-start`, which sits a `2 × --space-content` gutter past the sidebar). Content below is offset by `--screen-header-height` (default `56px`).

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `insetStart` | `number \| string` | the shared content line (past the sidebar) | Leading content padding of the header toolbar — overrides `--toolbar-inset-start` (the fill still runs full width, and by default lands on the same vertical line as `Screen.Content` / footer). Number = px, string used verbatim (`'var(--space-section)'`). Pass `0` to start the content at the very edge. |
| `ref` | `Ref<HTMLElement>` | — | Forwarded to the `<header>` |

```tsx
<Screen.Header>
  <Toolbar variant="solid" size="m">
    <Toolbar.Logo><AppMark /></Toolbar.Logo>
    <Toolbar.Title label="Mail" />
    <Toolbar.Separator />
    <Toolbar.SearchAction showLabel={false} />
    <Avatar firstName="Ada" lastName="Lovelace" size="s" />
  </Toolbar>
</Screen.Header>
```

`<header>` element, forwarded `ref`, all `HTMLAttributes`.

### Screen.Content / Screen.Footer

Semantic `<main>` / `<footer>`, positioned by the grid. Content carries the `size` max-width and the header offset; for an edge-to-edge layout, zero `Screen.Content`'s padding and let the inner content own the overflow.

| Prop (`Screen.Content`) | Type | Default | Description |
|------|------|---------|-------------|
| `maxWidth` | `number \| string` | — | Caps the content column's width and centres it in the space it's given — empty gutters on either side (or the `Screen.Aside` column on the trailing side). Number = px, string used verbatim (`'clamp(320px, 50vw, 640px)'`). **Overrides** the width `Screen`'s `size` prop imposes — set it per-`Content` when one screen needs a tighter measure than the others (e.g. a reading column at `550`) |

`Screen.Footer` renders a subtle `--background-2` band with a hairline top border — distinct from the content surface. Like the header it runs the full width, behind the sidebar, and re-insets its own content past the sidebar (via an inner wrapper). Both accept `HTMLAttributes` + a forwarded `ref`.

**Bottom-edge safe area.** Whichever band sits last before the screen edge — the footer, or `Screen.Content` / `Screen.Aside` when there's no footer — pads its bottom past the iOS home indicator (`env(safe-area-inset-bottom)`), and past the whole `Screen.BottomNavigation` reservation when that's present. The band's *background* still reaches the very bottom edge; only its content is lifted. Non-zero only when the consuming document opts into `<meta name="viewport" content="viewport-fit=cover">`.

### Screen.Sidebar

Semantic `<aside>` that floats 8px in from the screen edges (the same gutter as Drawer's panel), with no internal padding. Inline it overlaps the fixed header's leading corner; below `Screen`'s `mobileBreakpoint` it becomes a fixed off-canvas panel with a scrim.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `collapsed` | `boolean` | uncontrolled | Controlled, presentational — the panel animates out `Drawer`-style and unmounts; inline, `Screen` reflows its content by animating a start inset (no overflow clipping). Wire it to the same boolean as `Toolbar.SidebarToggleAction`'s `collapsed`. **Left undefined** (uncontrolled) the sidebar is a persistent column inline and simply drops out once the viewport goes overlay — it never covers the screen with no way to close it. To make it summonable on mobile, control it + wire the toggle |
| `onClose` | `() => void` | — | Called on scrim-click / `Escape` in overlay mode. Set your `collapsed` state to `true` here; focus returns to where it was before the panel opened. Even without it, the scrim / `Escape` still visually dismiss the overlay (never a trap) |
| `visibleFrom` | `ScreenBreakpoint` | — | Render the sidebar only at viewport widths `>=` this breakpoint (see *Breakpoint-gated zones*) |
| `hiddenFrom` | `ScreenBreakpoint` | — | Render the sidebar only at viewport widths `<` this breakpoint |
| `ref` | `Ref<HTMLElement>` | — | Forwarded ref |

### Screen.Aside

A trailing companion column to `Screen.Content` — an inspector / context pane (`<aside>`, "Details" `aria-label`). Unlike `Screen.Sidebar` it lives **in the grid**: shares the content row, sits below the fixed header, carries **no background** of its own. Bare, it's a grid column `asideWidth` wide (`--screen-aside-width`, default `320px`); `collapsed` drops that column to zero and Content reclaims it.

It has **no resize logic of its own**. For a draggable boundary, wrap `Screen.Content` and `Screen.Aside` each in a `Splitter.Panel` — the `Splitter` then owns widths and collapse, and `Screen` places the bare `<Splitter>` into the content row without a `gridArea`:

```tsx
<Screen>
  <Screen.Header>{/* … */}</Screen.Header>
  <Screen.Sidebar>{/* … */}</Screen.Sidebar>

  <Splitter>
    <Splitter.Panel min={40}>
      <Screen.Content>{/* list */}</Screen.Content>
    </Splitter.Panel>
    <Splitter.Panel defaultSize={34} min={24} collapsible>
      <Screen.Aside>{/* inspector */}</Screen.Aside>
    </Splitter.Panel>
  </Splitter>

  <Screen.Footer>{/* … */}</Screen.Footer>
</Screen>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `collapsed` | `boolean` | `false` | Collapses the bare grid column to zero width; Content reclaims the space. No effect inside a `Splitter` (the panel owns collapse) |
| `visibleFrom` | `ScreenBreakpoint` | — | Render only at viewport widths `>=` this breakpoint (see *Breakpoint-gated zones*) |
| `hiddenFrom` | `ScreenBreakpoint` | — | Render only at viewport widths `<` this breakpoint |
| `ref` | `Ref<HTMLElement>` | — | Forwarded to the `<aside>` |

### Screen.BottomNavigation

A **fixed, full-width** bar pinned to the bottom of the screen — the touch counterpart to `Screen.Sidebar`. `Screen` owns only the geometry: `position: fixed`, a gutter that floats the bar `--space-content` off every edge (plus `env(safe-area-inset-bottom)` below), and the bottom clearance it adds to `Screen.Content`, `Screen.Footer` (extra bottom **padding** — the grey band still reaches the bottom edge, its text just clears the bar) and an inline `Screen.Sidebar` (kept clear of the bar when both show on desktop). Bar height is `--screen-bottom-nav-height` (default `64px`).

Put the navigation itself inside — usually the standalone `BottomNavigation` with `floating={false}` (so it doesn't re-fix itself), or any custom nav. The zone is `pointer-events: none` with its direct children re-enabled, so the gaps around a centered pill stay click-through.

```tsx
<Screen.BottomNavigation hiddenFrom="lg">
  <BottomNavigation floating={false}>
    <BottomNavigation.Item icon={<Home />} label="Home" selected />
    <BottomNavigation.Item icon={<Search />} label="Search" />
    <BottomNavigation.Item icon={<User />} label="Profile" />
  </BottomNavigation>
</Screen.BottomNavigation>
```

`<nav>` element (labelled `screen.bottomNavigationLabel`), forwarded `ref`, plus `visibleFrom` / `hiddenFrom` and all `HTMLAttributes`. Omit the gate props to keep the bar on every viewport (e.g. a desktop app that wants a bottom bar).

---

## Examples

### App frame — fixed header, folder sidebar

```tsx
<Screen title="Mail">
  <Screen.Header>
    <Toolbar variant="solid" size="m">
      <Toolbar.Title label="Mail" />
      <Toolbar.Separator />
      <Toolbar.SearchAction showLabel={false} />
    </Toolbar>
  </Screen.Header>
  <Screen.Sidebar>
    <NavigationList>
      <NavigationList.Link icon={<Inbox />} label="Inbox" badge={12} selected />
      <NavigationList.Link icon={<Send />} label="Sent" />
    </NavigationList>
  </Screen.Sidebar>
  <Screen.Content>
    <MessageList />
  </Screen.Content>
</Screen>
```

### Collapsible / mobile sidebar

```tsx
const [collapsed, setCollapsed] = useState(false);

<Screen mobileBreakpoint="md">
  <Screen.Sidebar collapsed={collapsed} onClose={() => setCollapsed(true)}>
    <AppNavigation />
  </Screen.Sidebar>
  <Screen.Header>
    <Toolbar variant="solid" size="m">
      <Toolbar.SidebarToggleAction collapsed={collapsed} onClick={() => setCollapsed(!collapsed)} />
      <Toolbar.Title label="Overview" />
    </Toolbar>
  </Screen.Header>
  <Screen.Content>
    <Dashboard />
  </Screen.Content>
  <Screen.Footer>
    <SyncStatus />
  </Screen.Footer>
</Screen>
```

### Adaptive shell — sidebar on desktop, bottom bar on touch

```tsx
<Screen title="Music">
  <Screen.Header>
    <Toolbar variant="solid" size="m">
      <Toolbar.Title label="Listen now" />
    </Toolbar>
  </Screen.Header>
  <Screen.Sidebar visibleFrom="lg">
    <NavigationList>
      <NavigationList.Link icon={<Home />} label="Listen now" selected />
      <NavigationList.Link icon={<Compass />} label="Browse" />
    </NavigationList>
  </Screen.Sidebar>
  <Screen.Content>
    <Library />
  </Screen.Content>
  <Screen.BottomNavigation hiddenFrom="lg">
    <BottomNavigation floating={false}>
      <BottomNavigation.Item icon={<Home />} label="Listen" selected />
      <BottomNavigation.Item icon={<Compass />} label="Browse" />
    </BottomNavigation>
  </Screen.BottomNavigation>
</Screen>
```

### Reader — no sidebar, width-constrained

`maxWidth` on `Screen.Content` holds the prose to a comfortable measure and centres it; the free space falls to the gutters (or a `Screen.Aside`). Use it instead of `size` when only this screen needs the tighter column.

```tsx
<Screen title="Essay">
  <Screen.Header>
    <Toolbar variant="solid" size="m">
      <Toolbar.Title label="Essays" />
    </Toolbar>
  </Screen.Header>
  <Screen.Content maxWidth={550}>
    <Article />
  </Screen.Content>
</Screen>
```

### Edge-to-edge board

```tsx
<Screen title="Sprint board">
  <Screen.Header>{/* toolbar */}</Screen.Header>
  <Screen.Sidebar>{/* boards nav */}</Screen.Sidebar>
  <Screen.Content style={{ padding: 0, overflowX: 'auto' }}>
    <Board />
  </Screen.Content>
</Screen>
```

### Sign in — centered, no chrome

```tsx
<Screen title="Sign in" contentAlign="center" size="s">
  <Screen.Content>
    <SignInCard />
  </Screen.Content>
</Screen>
```

### Error page

```tsx
<Screen title="Page not found" contentAlign="center">
  <Screen.Content>
    <Result
      status="error"
      title="Page not found"
      description="The page you were looking for doesn't exist."
      actions={<Button label="Go home" variant="submit" />}
    />
  </Screen.Content>
</Screen>
```
