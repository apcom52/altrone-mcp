# Label

A tag/badge display component for short status or category labels. Not an HTML `<label>` — this component is purely decorative/informational.

## Import

```tsx
import { Label } from 'altrone-ui';
```

---

## Props

Renders a `<div>`. The text is passed as `children`, not a prop.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | Text content of the label |
| `icon` | `ReactElement` | — | Leading icon. For `variant="status"` it renders inside the status dot instead of next to it |
| `color` | `LabelColor` | `'default'` | Colour (see below) |
| `variant` | `'solid' \| 'soft' \| 'outline' \| 'status'` | `'solid'` | Visual style — `status` adds a pale fill, a border and a coloured dot before `children` |
| `shape` | `'rounded' \| 'pill'` | `'rounded'` | Border-radius style |
| `size` | `Size` | `'m'` | `'mini' \| 's' \| 'm' \| 'l' \| 'xl'` |
| `ref` | `Ref<HTMLElement>` | — | Forwarded ref |

All standard `HTMLAttributes<HTMLElement>` are also accepted.

### LabelColor values

`'default' | 'primary' | 'success' | 'danger' | 'warning' | 'amber' | 'blue' | 'brown' | 'indigo' | 'pink' | 'purple' | 'red' | 'teal'`

The four semantic colours (`primary` → accent, `success` → green, `warning` → amber, `danger` → red) come from the design-system status role tokens. The rest are the categorical hues.

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
