# Divider

A thin visual separator line. Renders a native `<hr>` (implicit `separator` role). Horizontal by default; `orientation="vertical"` also sets `aria-orientation="vertical"` and makes it stretch to the flex row's height.

## Import

```tsx
import { Divider } from 'altrone-ui';
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Orientation of the divider |
| `ref` | `Ref<HTMLHRElement>` | — | Forwarded ref |

All standard `HTMLAttributes<HTMLHRElement>` are also accepted (except `children`).

---

## Examples

### Horizontal (default)

```tsx
<Divider />
```

### Vertical

Use inside a flex row to separate items horizontally. The divider needs a constrained height from its context.

```tsx
<div style={{ display: 'flex', alignItems: 'center', height: 32 }}>
  <span>Item A</span>
  <Divider orientation="vertical" />
  <span>Item B</span>
</div>
```

### Separating sections

```tsx
<Flex orientation="vertical" gap="m">
  <ProfileSection />
  <Divider />
  <SecuritySection />
  <Divider />
  <DangerZone />
</Flex>
```

### Inside a Dropdown menu

`Divider` is commonly used inside `Dropdown.Menu` to group related actions.

```tsx
<Dropdown.Menu>
  <Dropdown.Action label="Edit" />
  <Dropdown.Action label="Duplicate" />
  <Divider />
  <Dropdown.Action label="Delete" danger />
</Dropdown.Menu>
```
