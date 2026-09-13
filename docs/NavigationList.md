# NavigationList

A vertical navigation sidebar. Renders a semantic `<nav>` element. Supports an optional header and footer, titled groups, links with icons/badges/nested sub-navigation, and inline row/group action buttons. Uses `framer-motion` for the sliding highlight that animates between items.

## Import

```tsx
import { NavigationList } from 'altrone-ui';
```

---

## Components

### NavigationList

The `<nav>` container. Lays its children out top-to-bottom; a `Header` sticks to the top and a `Footer` to the bottom while groups scroll between them.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | `NavigationList.Header`, `NavigationList.Group`, `NavigationList.Link`, `NavigationList.Footer` elements |
| `ref` | `Ref<HTMLElement>` | — | Forwarded to the `<nav>` |

Also accepts the standard `HTMLElement` attributes (`className`, `style`, `aria-label`, …). No `id` prop is required — the `layoutId` for the highlight animation is generated internally.

---

### NavigationList.Group

A section of links. With a `title` it is exposed as `role="group"` labelled by that title; without one it just visually separates a cluster of links.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | — | Group heading text (optional) |
| `children` | `ReactNode` | — | `NavigationList.Link` elements, plus optional `NavigationList.GroupAction` / `Dropdown`-wrapped actions rendered in the header |
| `ref` | `Ref<HTMLDivElement>` | — | Forwarded ref |

---

### NavigationList.GroupAction

An icon button for the group header (e.g. an "Add" button, or a menu trigger when wrapped in `Dropdown`). Renders a `size="s"` `Button`.

| Prop | Type | Description |
|------|------|-------------|
| `label` | `string` | **Required.** Accessible name / tooltip |
| `icon` | `ReactElement` | **Required.** Icon |
| `onClick` | `(e: MouseEvent) => void` | Click handler |

---

### NavigationList.Link

A navigation item. Renders a real `<a>`.

- Pass `href` for a normal link.
- Omit `href` and pass `onClick` to use it as a button — it becomes focusable (`tabindex="0"`) and activates on `Enter` / `Space`.
- `selected` marks the active item: sets `aria-current="page"` and moves the animated backdrop to it.
- Nested `NavigationList.Link` children form sub-navigation that is shown **only while the parent is `selected`**.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | **Required.** Item label |
| `href` | `string` | — | Navigation target. Omit to use the item as a button. |
| `selected` | `boolean` | `false` | Active item. Sets `aria-current="page"`, reveals nested children, shows the backdrop. |
| `icon` | `ReactElement` | — | Icon to the left of the label |
| `badge` | `string \| number \| ReactElement` | — | Badge on the right. Any element also works as trailing content (e.g. a `Label`). |
| `disabled` | `boolean` | `false` | Drops `href`, sets `tabindex="-1"` + `aria-disabled`, ignores clicks |
| `asChild` | `boolean` | `false` | Merge styling / ref / interaction props onto a single child element instead of rendering an `<a>`. Use to wrap a router `<Link>`. |
| `onClick` | `(e: MouseEvent) => void` | — | Click handler |
| `children` | `ReactNode` | — | Nested `NavigationList.Link` elements and/or `NavigationList.LinkAction` buttons |
| `ref` | `Ref<HTMLAnchorElement>` | — | Forwarded ref |

---

### NavigationList.LinkAction

An icon button rendered inline at the right edge of a `NavigationList.Link`. It stops the event from reaching the parent link, so triggering the action never navigates. Renders a `size="s"` `variant="text"` `Button`.

| Prop | Type | Description |
|------|------|-------------|
| `label` | `string` | **Required.** Accessible name / tooltip |
| `icon` | `ReactElement` | **Required.** Icon |
| `onClick` | `(e: MouseEvent) => void` | Click handler (the parent link is already shielded) |

---

### NavigationList.Header

Content pinned above all groups (e.g. a workspace switcher).

| Prop | Type | Description |
|------|------|-------------|
| `children` | `ReactNode` | Header content |
| `ref` | `Ref<HTMLDivElement>` | Forwarded ref |

---

### NavigationList.Footer

Content pinned below all groups (e.g. account info).

| Prop | Type | Description |
|------|------|-------------|
| `children` | `ReactNode` | Footer content |
| `ref` | `Ref<HTMLDivElement>` | Forwarded ref |

---

## Examples

### Basic

```tsx
<NavigationList>
  <NavigationList.Link label="Dashboard" icon={<Home />} href="/" selected={pathname === '/'} />
  <NavigationList.Link label="Projects" icon={<Folder />} href="/projects" selected={pathname === '/projects'} />
  <NavigationList.Link label="Settings" icon={<Settings />} href="/settings" selected={pathname === '/settings'} />
</NavigationList>
```

### As buttons (no href)

```tsx
<NavigationList.Link
  label="Toggle sidebar"
  icon={<PanelLeft />}
  onClick={() => setCollapsed((c) => !c)}
/>
```

### With groups

```tsx
<NavigationList>
  <NavigationList.Group title="Workspace">
    <NavigationList.Link label="Overview" href="/overview" selected={…} />
    <NavigationList.Link label="Members"  href="/members"  selected={…} />
  </NavigationList.Group>
  <NavigationList.Group title="Settings">
    <NavigationList.Link label="Profile" href="/profile" selected={…} />
    <NavigationList.Link label="Billing" href="/billing" selected={…} />
  </NavigationList.Group>
</NavigationList>
```

### Nested links (sub-navigation)

Nested links appear when the parent has `selected={true}`.

```tsx
<NavigationList.Link label="Engineering" icon={<Users />} selected={section === 'engineering'} onClick={() => setSection('engineering')}>
  <NavigationList.Link label="Frontend" selected={team === 'frontend'} onClick={() => setTeam('frontend')} />
  <NavigationList.Link label="Backend"  selected={team === 'backend'}  onClick={() => setTeam('backend')} />
</NavigationList.Link>
```

### Router links (asChild)

```tsx
<NavigationList.Link label="Dashboard" icon={<Home />} asChild selected={pathname === '/'}>
  <Link to="/" />
</NavigationList.Link>
```

### Link with hover action buttons

```tsx
<NavigationList.Link label="My Project" href="/p/1" selected={…}>
  <NavigationList.LinkAction label="Add page" icon={<Plus />} onClick={openAddPage} />
  <NavigationList.LinkAction label="More options" icon={<MoreHorizontal />} onClick={openMenu} />
</NavigationList.Link>
```

### Group with action button and menu

```tsx
<NavigationList.Group title="Projects">
  <NavigationList.GroupAction label="New project" icon={<Plus />} onClick={createProject} />
  <Dropdown content={<Dropdown.Menu><Dropdown.Action label="Sort by name" /></Dropdown.Menu>}>
    <NavigationList.GroupAction label="Options" icon={<MoreHorizontal />} />
  </Dropdown>
  {projects.map((p) => (
    <NavigationList.Link key={p.id} label={p.name} href={`/p/${p.id}`} selected={…} />
  ))}
</NavigationList.Group>
```

### With header and footer

```tsx
<NavigationList>
  <NavigationList.Header>
    <WorkspaceSwitcher />
  </NavigationList.Header>

  <NavigationList.Link label="Home" icon={<Home />} href="/" selected={…} />
  <NavigationList.Link label="Inbox" icon={<Inbox />} href="/inbox" badge={3} selected={…} />

  <NavigationList.Footer>
    <UserProfile />
  </NavigationList.Footer>
</NavigationList>
```

### Disabled item

```tsx
<NavigationList.Link label="Reports" icon={<BarChart2 />} disabled />
```
