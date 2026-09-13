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
| `color` | `LabelColor` | `'default'` | Colour (see below) |
| `variant` | `'solid' \| 'soft' \| 'outline'` | `'solid'` | Visual style |
| `rounding` | `'rounded' \| 'pill'` | `'rounded'` | Border-radius style |
| `size` | `Size` | `'m'` | `'mini' \| 's' \| 'm' \| 'l' \| 'xl'` |
| `ref` | `Ref<HTMLDivElement>` | — | Forwarded ref |

All standard `HTMLAttributes<HTMLDivElement>` are also accepted.

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

### Pill rounding

```tsx
<Label color="indigo" rounding="pill">v2.0.0</Label>
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
