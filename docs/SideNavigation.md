# SideNavigation

An on-page table-of-contents navigation. Renders a `<nav>` with anchor links that automatically highlight the section currently visible in the viewport using `ScrollSpy` (IntersectionObserver). Use for long-form pages — documentation, articles, settings pages.

> **Note:** This is not the same as `NavigationList`. `SideNavigation` is for **intra-page** anchor navigation (table of contents). `NavigationList` is for **app-level** route navigation.

## Import

```tsx
import { SideNavigation } from 'altrone-ui';
```

---

## Components

### SideNavigation

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | — | Optional heading above the links (e.g. `"On this page"`). The `<nav>` is `aria-labelledby` it. |
| `children` | `ReactNode` | — | `SideNavigation.Link` elements |
| `ref` | `Ref<HTMLElement>` | — | Forwarded to the `<nav>` |

All standard `HTMLAttributes<HTMLElement>` are also accepted.

---

### SideNavigation.Link

| Prop | Type | Description |
|------|------|-------------|
| `href` | `string` | **Required.** CSS selector for the target section (e.g. `"#introduction"`). Must match the `id` of a heading or section on the page. |
| `label` | `string` | **Required.** Link text |
| `children` | `ReactNode` | Nested `SideNavigation.Link` elements for sub-sections |
| `ref` | `Ref<HTMLLIElement>` | Forwarded to the root `<li>` |

All standard `AnchorHTMLAttributes<HTMLAnchorElement>` are also accepted (spread onto the inner `<a>`); `className`/`style` apply to the root `<li>`.

---

## Behavior

- The active link is determined by `ScrollSpy`, which observes the target elements via `IntersectionObserver`. The link whose target is currently visible in the viewport gets `aria-current="page"` and the active style.
- Nested links are always visible (not collapsible) and are indented.
- Clicking a link scrolls the page to the target element via the browser's native anchor scroll.

---

## Examples

### Basic (fixed sidebar)

```tsx
<div style={{ position: 'fixed', top: 0, right: 0, width: 260, height: '100vh', overflowY: 'auto' }}>
  <SideNavigation title="On this page">
    <SideNavigation.Link href="#overview"    label="Overview" />
    <SideNavigation.Link href="#usage"       label="Usage" />
    <SideNavigation.Link href="#props"       label="Props" />
    <SideNavigation.Link href="#examples"    label="Examples" />
  </SideNavigation>
</div>

{/* Page content */}
<main>
  <h2 id="overview">Overview</h2>
  <p>…</p>
  <h2 id="usage">Usage</h2>
  <p>…</p>
  <h2 id="props">Props</h2>
  <p>…</p>
  <h2 id="examples">Examples</h2>
  <p>…</p>
</main>
```

### Nested sections

```tsx
<SideNavigation title="On this page">
  <SideNavigation.Link href="#guide" label="Guide">
    <SideNavigation.Link href="#installation" label="Installation" />
    <SideNavigation.Link href="#configuration" label="Configuration" />
    <SideNavigation.Link href="#deployment"    label="Deployment" />
  </SideNavigation.Link>
  <SideNavigation.Link href="#api" label="API Reference">
    <SideNavigation.Link href="#props"   label="Props" />
    <SideNavigation.Link href="#methods" label="Methods" />
  </SideNavigation.Link>
</SideNavigation>
```

### Without title

```tsx
<SideNavigation>
  <SideNavigation.Link href="#intro" label="Introduction" />
  <SideNavigation.Link href="#core"  label="Core concepts" />
</SideNavigation>
```
