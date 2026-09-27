# Flex

A flexbox layout primitive. Gap values map to design-system CSS variables. Renders as `<div>` by default, or merges onto any element you wrap it around via `asChild`. Inner margins are disabled by default to prevent double-spacing with gap.

## Import

```tsx
import { Flex } from 'altrone-ui';
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Flex axis |
| `gap` | `Gap` | `'none'` | Space between children. Uses design-system gap tokens. |
| `align` | `'start' \| 'center' \| 'end'` | — | `align-items` value. For space distribution use `justify`. |
| `justify` | `'start' \| 'center' \| 'end' \| 'between'` | — | `justify-content` value |
| `wrap` | `boolean` | `false` | `flex-wrap: wrap` |
| `disableInnerMargins` | `boolean` | `true` | Strips margins from direct children to avoid double-spacing with `gap`. |
| `asChild` | `boolean` | `false` | Merge the computed className/style onto the single child element instead of rendering a `<div>` — use to render as `<ul>`, `<section>`, `<nav>`, etc. |
| `ref` | `Ref<HTMLElement>` | — | Forwarded ref |

All standard `HTMLAttributes<HTMLElement>` are also accepted.

### Gap scale

| Value | CSS variable |
|-------|-------------|
| `'none'` | `0px` |
| `'xxs'` | `--narrow-gap` |
| `'xs'` | `--xs-gap` |
| `'s'` | `--s-gap` |
| `'m'` | `--gap` |
| `'l'` | `--l-gap` |
| `'xl'` | `--xl-gap` |
| `'xxl'` | `--xxl-gap` |

---

## Examples

### Horizontal row

```tsx
<Flex gap="m" align="center">
  <Avatar firstName="Alice" />
  <Text weight="medium">Alice Morgan</Text>
</Flex>
```

### Vertical stack

```tsx
<Flex orientation="vertical" gap="l">
  <TextInput placeholder="Email" />
  <TextInput placeholder="Password" type="password" />
  <Button label="Sign in" variant="submit" />
</Flex>
```

### Space between

```tsx
<Flex justify="between" align="center">
  <Text weight="bold">Title</Text>
  <CloseButton onClick={onClose} />
</Flex>
```

### Wrapping tag cloud

```tsx
<Flex gap="s" wrap>
  {tags.map((tag) => <Label key={tag}>{tag}</Label>)}
</Flex>
```

### Rendered as a semantic element

```tsx
<Flex asChild orientation="vertical" gap="s">
  <ul>
    <li>Item one</li>
    <li>Item two</li>
  </ul>
</Flex>
```

### Nested

```tsx
<Flex orientation="vertical" gap="l">
  <Flex gap="m" align="center">
    <Avatar firstName="Alice" />
    <Flex orientation="vertical" gap="xs">
      <Text weight="medium">Alice Morgan</Text>
      <Text size={3} color="muted">Product Designer</Text>
    </Flex>
  </Flex>
  <Divider />
  <Text block>Bio content here.</Text>
</Flex>
```
