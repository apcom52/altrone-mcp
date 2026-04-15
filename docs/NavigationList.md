# NavigationList

A vertical navigation sidebar component. Renders a `<nav>` element. Supports nested links, groups, header, footer, and keyboard navigation. Uses `framer-motion` for the active-item highlight animation.

## Import

```tsx
import { NavigationList } from 'altrone-ui';
```

---

## Components

### NavigationList

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | — | **Required.** Unique ID for the `layoutId` of the framer-motion backdrop animation. Each independent navigation list needs its own `id`. |
| `children` | `ReactNode` | — | `NavigationList.Group`, `NavigationList.Link`, `NavigationList.Header`, `NavigationList.Footer` elements |
| `ref` | `Ref<HTMLElement>` | — | Forwarded ref |

---

### NavigationList.Group

A labeled section that groups related links. Collapsible via expand/collapse button.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | **Required.** Group heading text |
| `children` | `ReactNode` | — | `NavigationList.Link` elements |
| `icon` | `ReactElement` | — | Icon next to the group label |
| `defaultExpanded` | `boolean` | `true` | Whether the group starts expanded |

---

### NavigationList.GroupAction

An icon button rendered in the group header (e.g. an "Add" button).

| Prop | Type | Description |
|------|------|-------------|
| `label` | `string` | **Required.** Tooltip/aria label |
| `icon` | `ReactElement` | **Required.** Icon |
| `onClick` | `() => void` | Click handler |

---

### NavigationList.Link

A navigation item. Can contain nested `NavigationList.Link` elements and `NavigationList.LinkAction` buttons. Nested links are shown when `selected={true}`.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | **Required.** Item label |
| `selected` | `boolean` | `false` | Whether this item is currently active. When true, reveals nested children and shows the animated backdrop. |
| `icon` | `ReactElement` | — | Icon to the left of the label |
| `badge` | `string \| number \| ReactElement` | — | Badge on the right |
| `disabled` | `boolean` | `false` | Disables the item |
| `asChild` | `boolean` | `false` | Merges link styles onto a single child element (Slot pattern). Use to wrap a router `<Link>`. |
| `onClick` | `() => void` | — | Click handler |
| `children` | `ReactNode` | — | Nested `NavigationList.Link` elements (sub-navigation shown when selected) |
| `ref` | `Ref<HTMLDivElement>` | — | Forwarded ref |

---

### NavigationList.LinkAction

An icon button rendered inline at the right side of a `NavigationList.Link` on hover.

| Prop | Type | Description |
|------|------|-------------|
| `label` | `string` | **Required.** Tooltip/aria label |
| `icon` | `ReactElement` | **Required.** Icon |
| `onClick` | `(e: MouseEvent) => void` | Click handler (should call `e.stopPropagation()` to avoid triggering the parent link) |

---

### NavigationList.Header

Content rendered above all groups/links (e.g. a workspace switcher).

| Prop | Type | Description |
|------|------|-------------|
| `children` | `ReactNode` | Header content |

---

### NavigationList.Footer

Content rendered below all groups/links (e.g. account info or settings).

| Prop | Type | Description |
|------|------|-------------|
| `children` | `ReactNode` | Footer content |

---

## Examples

### Basic

```tsx
<NavigationList id="main-nav">
  <NavigationList.Link label="Dashboard" icon={<Home />} selected={current === 'dashboard'} onClick={() => setCurrent('dashboard')} />
  <NavigationList.Link label="Projects"  icon={<Folder />} selected={current === 'projects'} onClick={() => setCurrent('projects')} />
  <NavigationList.Link label="Settings"  icon={<Settings />} selected={current === 'settings'} onClick={() => setCurrent('settings')} />
</NavigationList>
```

### With groups

```tsx
<NavigationList id="sidebar">
  <NavigationList.Group label="Workspace" icon={<Building />}>
    <NavigationList.Link label="Overview" selected={…} onClick={…} />
    <NavigationList.Link label="Members"  selected={…} onClick={…} />
  </NavigationList.Group>
  <NavigationList.Group label="Settings">
    <NavigationList.Link label="Profile"  selected={…} onClick={…} />
    <NavigationList.Link label="Billing"  selected={…} onClick={…} />
  </NavigationList.Group>
</NavigationList>
```

### Nested links (sub-navigation)

Nested links appear when the parent has `selected={true}`.

```tsx
<NavigationList.Link label="Projects" selected={section === 'projects'} icon={<Folder />}>
  <NavigationList.Link label="Active"   selected={project === 'active'}   onClick={…} />
  <NavigationList.Link label="Archived" selected={project === 'archived'} onClick={…} />
</NavigationList.Link>
```

### With router links (asChild)

```tsx
<NavigationList.Link label="Dashboard" selected={pathname === '/'} asChild>
  <Link to="/" />
</NavigationList.Link>
```

### Link with hover action buttons

```tsx
<NavigationList.Link label="My Project" selected={…} onClick={…}>
  <NavigationList.LinkAction
    label="Add page"
    icon={<Plus />}
    onClick={(e) => { e.stopPropagation(); openAddPage(); }}
  />
  <NavigationList.LinkAction
    label="More options"
    icon={<MoreHorizontal />}
    onClick={(e) => { e.stopPropagation(); openMenu(); }}
  />
</NavigationList.Link>
```

### Group with action button

```tsx
<NavigationList.Group label="Pages" icon={<FileText />}>
  <NavigationList.GroupAction label="New page" icon={<Plus />} onClick={createPage} />
  {pages.map(page => (
    <NavigationList.Link key={page.id} label={page.name} selected={…} onClick={…} />
  ))}
</NavigationList.Group>
```

### With header and footer

```tsx
<NavigationList id="app-nav">
  <NavigationList.Header>
    <WorkspaceSwitcher />
  </NavigationList.Header>

  <NavigationList.Link label="Home" icon={<Home />} selected={…} />
  <NavigationList.Link label="Inbox" icon={<Inbox />} badge={3} selected={…} />

  <NavigationList.Footer>
    <UserProfile />
  </NavigationList.Footer>
</NavigationList>
```
