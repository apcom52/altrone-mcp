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

Use inside a flex row to separate items horizontally. The divider has `align-self: stretch`, so it takes the height of the row by itself (minus a small `--xs-gap` inset at each end) — even when the row uses `align="center"`. It needs a flex parent; outside one it has no height.

```tsx
<Flex gap="m" align="center">
  <Button label="Cut" />
  <Button label="Copy" />
  <Divider orientation="vertical" />
  <Button label="Paste" />
</Flex>
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
