# Breadcrumbs

A navigation landmark for showing the current page's location in the hierarchy. Renders a labelled `<nav>` (localized `aria-label`) with an `<ol>` inside. A `ChevronRight` separator is drawn after every item except the last (hidden via CSS `:last-child`).

## Import

```tsx
import { Breadcrumbs } from 'altrone-ui';
```

---

## Components

### Breadcrumbs

The container. Renders a `<nav>` element.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `ref` | `Ref<HTMLElement>` | — | Forwarded ref |

All standard `HTMLAttributes<HTMLElement>` are also accepted.

---

### Breadcrumbs.Item

A single breadcrumb. Renders `<li>` as the root; inside it, a plain `<div>` by default, or the `asChild` child. The separator is rendered inside every `<li>` and hidden on the last via CSS.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | Text label of the breadcrumb |
| `icon` | `ReactElement` | — | Icon displayed to the left of the label |
| `current` | `boolean` | `false` | The current page (the last item). Renders bold and sets `aria-current="page"` automatically. Should not be combined with `asChild`. |
| `asChild` | `boolean` | `false` | Merge the item's styling/ref/props onto the single child element (Slot pattern). Use for an `<a>` or router `<Link>`. `label`/`icon` become its content. |
| `children` | `ReactElement` | — | Only used with `asChild`. Must be a single valid React element. |
| `ref` | `Ref<HTMLElement>` | — | Forwarded to the item element (the `<div>`, or the `asChild` child) |

`className`/`style` and other passthrough props (`onClick`, `data-*`, …) go on the item element (`<div>` or the `asChild` child), not the `<li>`. This works with `asChild` too.

---

## Examples

### Basic

```tsx
<Breadcrumbs>
  <Breadcrumbs.Item label="Home" />
  <Breadcrumbs.Item label="Products" />
  <Breadcrumbs.Item label="Details" current />
</Breadcrumbs>
```

### With icons

```tsx
import { Home } from 'lucide-react';

<Breadcrumbs>
  <Breadcrumbs.Item icon={<Home />} label="Home" />
  <Breadcrumbs.Item label="Settings" />
  <Breadcrumbs.Item label="Security" current />
</Breadcrumbs>
```

### With links (asChild)

Use `asChild` with an `<a>` or router `<Link>` to make items navigable. The `label` and `icon` are rendered as the child element's content automatically.

```tsx
<Breadcrumbs>
  <Breadcrumbs.Item icon={<Home />} label="Home" asChild>
    <a href="/" />
  </Breadcrumbs.Item>
  <Breadcrumbs.Item label="Catalog" asChild>
    <a href="/catalog" />
  </Breadcrumbs.Item>
  <Breadcrumbs.Item label="Item #42" current />
</Breadcrumbs>
```

### With a router Link

```tsx
import { Link } from 'react-router-dom';

<Breadcrumbs>
  <Breadcrumbs.Item icon={<Home />} label="Home" asChild>
    <Link to="/" />
  </Breadcrumbs.Item>
  <Breadcrumbs.Item label="Orders" asChild>
    <Link to="/orders" />
  </Breadcrumbs.Item>
  <Breadcrumbs.Item label="Order #1234" current />
</Breadcrumbs>
```

### Collapsed middle items with a Dropdown

When the path is deep, replace intermediate items with an ellipsis that opens a `Dropdown`.

```tsx
import { Ellipsis } from 'lucide-react';

<Breadcrumbs>
  <Breadcrumbs.Item icon={<Home />} label="Home" asChild>
    <a href="/" />
  </Breadcrumbs.Item>
  <Dropdown
    content={
      <Dropdown.Menu>
        <Dropdown.Action label="Category" />
        <Dropdown.Action label="Subcategory" />
      </Dropdown.Menu>
    }
  >
    <Breadcrumbs.Item icon={<Ellipsis />} />
  </Dropdown>
  <Breadcrumbs.Item label="Product" current />
</Breadcrumbs>
```

---

## Notes

- The separator `ChevronRight` is rendered inside every `<li>` (as an `aria-hidden` node) and hidden on the last item via CSS `:last-child` — this stays correct even when an item is wrapped (e.g. by `Dropdown`).
- `current` already sets `aria-current="page"` on the item element — no need to add it yourself.
- When `asChild={true}` and `children` is not a valid React element, the component logs an error and returns `null`.
- The `<nav>` gets a localized `aria-label` ("Breadcrumb"), so multiple nav landmarks on a page stay distinguishable.
