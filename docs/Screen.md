# Screen

A full-page layout component that composes a sidebar, sticky header, and scrollable main content area. Designed to be the top-level layout shell of an application view.

## Import

```tsx
import { Screen } from 'altrone-ui';
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `sidebar` | `ReactElement<NavigationListProps>` | — | A `NavigationList` element rendered in a fixed left `<aside>`. When omitted, no sidebar is shown. |
| `header` | `ReactElement<ToolbarProps>` | — | A `Toolbar` element rendered in a sticky `<header>` above the main content. |
| `children` | `ReactNode` | — | Main page content, rendered inside `<main>`. |
| `ref` | `Ref<HTMLDivElement>` | — | Forwarded ref |

All standard `HTMLAttributes<HTMLDivElement>` are also accepted.

---

## Behavior

- The sidebar visibility is managed internally via `ScreenSidebarContext`. The `Toolbar` can read this context to render a toggle button that shows/hides the sidebar.
- When a `header` is provided, a backdrop element is rendered behind it for layering effects.
- Layout structure: `aside` (sidebar) + column containing `header` + `main`.

---

## Examples

### Full layout

```tsx
<Screen
  sidebar={
    <NavigationList id="app-nav">
      <NavigationList.Link label="Dashboard" icon={<Home />} selected={…} onClick={…} />
      <NavigationList.Link label="Projects"  icon={<Folder />} selected={…} onClick={…} />
      <NavigationList.Link label="Settings"  icon={<Settings />} selected={…} onClick={…} />
    </NavigationList>
  }
  header={
    <Toolbar>
      <Toolbar.Title>My App</Toolbar.Title>
      <Toolbar.Action label="New" icon={<Plus />} onClick={createNew} />
    </Toolbar>
  }
>
  <YourPageContent />
</Screen>
```

### Header only (no sidebar)

```tsx
<Screen
  header={
    <Toolbar>
      <Toolbar.Title>Settings</Toolbar.Title>
    </Toolbar>
  }
>
  <SettingsPanel />
</Screen>
```

### Content only (no chrome)

```tsx
<Screen>
  <LandingPage />
</Screen>
```
