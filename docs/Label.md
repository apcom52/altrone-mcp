# Label

A tag/badge display component for short status or category labels. Not an HTML `<label>` — this component is purely decorative/informational.

## Import

```tsx
import { Label } from 'altrone-ui';
```

---

## Props

Renders a `<div>` (or, with `asChild`, merges onto its single child). The text is passed as `children`, not a prop.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | Text content of the label |
| `icon` | `ReactElement` | — | Leading icon. For `variant="status"` it renders inside the status dot instead of next to it |
| `color` | `LabelColor` | `'default'` | Colour (see below) |
| `variant` | `'solid' \| 'soft' \| 'outline' \| 'status'` | `'solid'` | Visual style — `status` adds a pale fill, a border and a coloured dot before `children` |
| `shape` | `'rounded' \| 'pill'` | `'rounded'` | Border-radius style |
| `size` | `Size` | `'m'` | `'mini' \| 's' \| 'm' \| 'l' \| 'xl'` |
| `asChild` | `boolean` | `false` | Merge the label's classes/styles onto its single child element (e.g. a link) instead of rendering a `<div>` |
| `ref` | `Ref<HTMLElement>` | — | Forwarded ref |

All standard `HTMLAttributes<HTMLElement>` are also accepted.

### LabelColor values

`'default' | 'primary' | 'success' | 'danger' | 'warning' | 'amber' | 'blue' | 'brown' | 'green' | 'indigo' | 'orange' | 'pink' | 'purple' | 'red' | 'teal'`

The four semantic colours (`primary` → accent, `success` → green, `warning` → amber, `danger` → red) come from the design-system status role tokens. The rest are the ten categorical hues (`--<hue>-9`).

---

## Examples

### Basic

```tsx
<Label>New</Label>
```

### Color variants

```tsx
<Label color="success">Active</Label>
<Label color="default">Archived</Label>
<Label color="danger">Deleted</Label>
<Label color="warning">Draft</Label>
<Label color="primary">Beta</Label>
```

### Visual styles

```tsx
<Label variant="solid"   color="primary">Solid</Label>
<Label variant="soft"    color="primary">Soft</Label>
<Label variant="outline" color="primary">Outline</Label>
```

### Pill shape

```tsx
<Label color="indigo" shape="pill">v2.0.0</Label>
```

### Sizes

```tsx
<Label size="mini">mini</Label>
<Label size="s">small</Label>
<Label size="m">medium</Label>
<Label size="l">large</Label>
<Label size="xl">xlarge</Label>
```

### Status badges in a table row

```tsx
<tr>
  <td>{task.name}</td>
  <td>
    <Label
      color={task.status === 'done' ? 'success' : task.status === 'blocked' ? 'danger' : 'warning'}
    >
      {task.status}
    </Label>
  </td>
</tr>
```

### Multiple labels

```tsx
<Flex gap="xs">
  <Label color="blue" variant="soft">React</Label>
  <Label color="indigo" variant="soft">TypeScript</Label>
  <Label color="pink" variant="soft">CSS</Label>
</Flex>
```

### Status variant (dot, optionally with an icon)

```tsx
<Label color="warning" variant="status">In review</Label>
<Label color="success" variant="status" icon={<Check />}>Completed</Label>
<Label color="danger" variant="status" icon={<Ban />}>Blocked</Label>
```

### Leading icon (non-status variants)

```tsx
<Label color="primary" icon={<Clock />}>Pending</Label>
<Label color="success" variant="soft" icon={<Check />}>Verified</Label>
```

### Label as a link (`asChild`)

```tsx
<Label asChild color="blue" variant="soft">
  <a href="/releases/2.0">v2.0.0</a>
</Label>
```

---

## CSS variables

Defined on the label root; values below are for `size="m"`, other sizes set their own. Override via `style`.

| Variable | Default (`m`) | Description |
|----------|---------------|-------------|
| `--label-padding-x` | `8px` | Horizontal padding |
| `--label-padding-y` | `4px` | Vertical padding |
| `--label-status-padding-left` | `4px` | Left padding of `variant="status"`, before the dot |
| `--label-dot-size` | `15px` | Status dot diameter |
| `--label-icon-size` | `12px` | Leading icon size |
| `--label-radius` | `8px` | Corner radius for `shape="rounded"` (pill uses `--radius-pill`) |
| `--label-gap` | `4px` | Gap between the icon/dot and the text |
| `--label-font-size` | `var(--text-size-3)` | Text size |
| `--label-line-height` | `var(--line-height-3)` | Line height |

Colors come from Box's `--box-fill`, `--box-tone-*` and `--box-border-*` variables. Overriding `--box-padding-*` or `--radius-outer` through `style` has no effect — Label sets them from `--label-padding-*` / `--label-radius`, so override those instead.

```tsx
<Label
  color="indigo"
  style={{ '--label-padding-x': '12px', '--label-radius': '2px' } as React.CSSProperties}
>
  Scheduled
</Label>
```
