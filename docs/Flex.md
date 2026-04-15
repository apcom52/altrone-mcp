# Flex

A flexbox layout primitive. Gap values map to design-system CSS variables. Renders any HTML element via `tagName`. Inner margins are disabled by default to prevent double-spacing with gap.

## Import

```tsx
import { Flex } from 'altrone-ui';
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `direction` | `'horizontal' \| 'vertical'` | `'horizontal'` | Flex direction |
| `gap` | `Gap` | `'none'` | Space between children. Uses design-system gap tokens. |
| `align` | `'start' \| 'center' \| 'end' \| 'between'` | — | `align-items` value |
| `justify` | `'start' \| 'center' \| 'end' \| 'between'` | — | `justify-content` value |
| `wrap` | `boolean` | `false` | `flex-wrap: wrap` |
| `disableInnerMargins` | `boolean` | `true` | Strips margins from direct children to avoid double-spacing with `gap`. |
| `tagName` | `keyof JSX.IntrinsicElements` | `'div'` | HTML element to render (e.g. `'ul'`, `'section'`, `'nav'`) |
| `ref` | `Ref<HTMLElement>` | — | Forwarded ref |

All standard `HTMLAttributes<HTMLDivElement>` are also accepted.

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
<Flex direction="vertical" gap="l">
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
<Flex tagName="ul" direction="vertical" gap="s">
  <li>Item one</li>
  <li>Item two</li>
</Flex>
```

### Nested

```tsx
<Flex direction="vertical" gap="l">
  <Flex gap="m" align="center">
    <Avatar firstName="Alice" />
    <Flex direction="vertical" gap="xs">
      <Text weight="medium">Alice Morgan</Text>
      <Text size={3} color="muted">Product Designer</Text>
    </Flex>
  </Flex>
  <Divider />
  <Text block>Bio content here.</Text>
</Flex>
```
