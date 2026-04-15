# Breadcrumbs

A navigation landmark for showing the current page's location in the hierarchy. Renders a `<nav>` with an `<ol>` inside. Separators (`ChevronRight`) are inserted automatically between items — the last item never gets a separator.

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

A single breadcrumb. Renders as a plain `<div>` by default. Use `asChild` to make it a link or any other element.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | Text label of the breadcrumb |
| `icon` | `ReactElement` | — | Icon displayed to the left of the label |
| `current` | `boolean` | `false` | Marks this item as the current page. Applies distinct styling. Use on the last item. |
| `asChild` | `boolean` | `false` | Merges Breadcrumbs.Item styles onto the single child element (Slot pattern). Use to render an `<a>` or a router `<Link>`. |
| `children` | `ReactElement` | — | Only used with `asChild`. Must be a single valid React element. |
| `ref` | `Ref<HTMLDivElement>` | — | Forwarded ref |

> **Internal prop:** `isLast` is injected automatically by `Breadcrumbs` via `cloneElement` and controls whether the separator is shown. Never pass it manually.

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

- The separator `ChevronRight` is rendered after every item except the last one. This is determined automatically by `Breadcrumbs` — no manual handling needed.
- When `asChild={true}` and `children` is not a valid React element, the component logs an error and returns `null`.
- The `current` prop is purely visual; for full accessibility consider also setting `aria-current="page"` on the item or its child link element.
