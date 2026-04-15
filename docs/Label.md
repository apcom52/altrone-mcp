# Label

A tag/badge display component for short status or category labels. Not an HTML `<label>` — this component is purely decorative/informational.

## Import

```tsx
import { Label } from 'altrone-ui';
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | **Required.** Text content of the label |
| `color` | `LabelColor` | `'default'` | Color variant (see below) |
| `variant` | `'solid' \| 'soft' \| 'outline'` | `'solid'` | Visual style of the label |
| `rounding` | `'rounded' \| 'pill'` | `'rounded'` | Border-radius style |
| `size` | `Size` | `'m'` | Size: `'mini' \| 's' \| 'm' \| 'l' \| 'xl'` |
| `ref` | `Ref<HTMLSpanElement>` | — | Forwarded ref |

All standard `HTMLAttributes<HTMLSpanElement>` are also accepted.

### LabelColor values

`'default' | 'primary' | 'success' | 'danger' | 'warning' | 'amber' | 'blue' | 'brown' | 'indigo' | 'pink' | 'purple' | 'red' | 'teal'`

---

## Examples

### Basic

```tsx
<Label label="New" />
```

### Color variants

```tsx
<Label label="Active"   color="success" />
<Label label="Archived" color="default" />
<Label label="Deleted"  color="danger" />
<Label label="Draft"    color="warning" />
<Label label="Beta"     color="primary" />
```

### Visual styles

```tsx
<Label label="Solid"   variant="solid"   color="primary" />
<Label label="Soft"    variant="soft"    color="primary" />
<Label label="Outline" variant="outline" color="primary" />
```

### Pill rounding

```tsx
<Label label="v2.0.0" color="indigo" rounding="pill" />
```

### Sizes

```tsx
<Label label="mini" size="mini" />
<Label label="small" size="s" />
<Label label="medium" size="m" />
<Label label="large" size="l" />
<Label label="xlarge" size="xl" />
```

### Status badges in a table row

```tsx
<tr>
  <td>{task.name}</td>
  <td>
    <Label
      label={task.status}
      color={task.status === 'done' ? 'success' : task.status === 'blocked' ? 'danger' : 'warning'}
    />
  </td>
</tr>
```

### Multiple labels

```tsx
<Flex gap="xs">
  <Label label="React" color="blue" variant="soft" />
  <Label label="TypeScript" color="indigo" variant="soft" />
  <Label label="CSS" color="pink" variant="soft" />
</Flex>
```
