# Grid

A 12-column layout. `Grid` is the container, `Grid.Column` defines each cell's width and offset. Gap values use the same design-system tokens as `Flex`.

## Import

```tsx
import { Grid } from 'altrone-ui';
```

---

## Components

### Grid

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `gap` | `Gap` | `'none'` | Column gap |
| `rowGap` | `Gap` | `'none'` | Row gap (independent from column gap) |
| `wrap` | `boolean` | `true` | Allow columns to wrap to the next row. Set to `false` for a single non-wrapping row. |
| `asChild` | `boolean` | `false` | Merge the computed className/style onto the single child element instead of rendering a `<div>` — use to render the container as `<ul>`, `<section>`, etc. |
| `ref` | `Ref<HTMLElement>` | — | Forwarded ref |

---

### Grid.Column

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `1–12 \| 'auto'` | — | Number of columns this cell spans out of 12. `'auto'` sizes the column to its content. |
| `offset` | `0–11` | `0` | Number of columns to skip before this cell |
| `asChild` | `boolean` | `false` | Merge the computed className/style onto the single child element instead of rendering a `<div>` — use to render the column as `<li>`, etc. |
| `ref` | `Ref<HTMLElement>` | — | Forwarded ref |

All standard `HTMLAttributes<HTMLElement>` are also accepted.

---

## Examples

### Equal columns

```tsx
<Grid gap="m">
  <Grid.Column size={6}>Left half</Grid.Column>
  <Grid.Column size={6}>Right half</Grid.Column>
</Grid>
```

### Three-column layout

```tsx
<Grid gap="l">
  <Grid.Column size={4}><Card /></Grid.Column>
  <Grid.Column size={4}><Card /></Grid.Column>
  <Grid.Column size={4}><Card /></Grid.Column>
</Grid>
```

### Sidebar + content

```tsx
<Grid gap="l">
  <Grid.Column size={3}><Sidebar /></Grid.Column>
  <Grid.Column size={9}><MainContent /></Grid.Column>
</Grid>
```

### With offset

```tsx
<Grid gap="m">
  <Grid.Column size={8} offset={2}>
    Centered content (2 cols offset + 8 cols wide + 2 implied = 12)
  </Grid.Column>
</Grid>
```

### Different row and column gaps

```tsx
<Grid gap="m" rowGap="xl">
  <Grid.Column size={6}>Card</Grid.Column>
  <Grid.Column size={6}>Card</Grid.Column>
  <Grid.Column size={6}>Card</Grid.Column>
  <Grid.Column size={6}>Card</Grid.Column>
</Grid>
```

### Auto-sized column

```tsx
<Grid gap="m">
  <Grid.Column size="auto"><Button label="Cancel" /></Grid.Column>
  <Grid.Column size={10}><TextInput placeholder="Search…" /></Grid.Column>
  <Grid.Column size="auto"><Button label="Go" variant="submit" /></Grid.Column>
</Grid>
```

### Non-wrapping single row

```tsx
<Grid gap="s" wrap={false}>
  {tabs.map((tab) => <Grid.Column key={tab.id} size="auto"><Tab {...tab} /></Grid.Column>)}
</Grid>
```

### Custom element

```tsx
<Grid asChild gap="m" rowGap="m">
  <ul>
    {items.map((item) => (
      <Grid.Column asChild key={item.id} size={4}>
        <li>
          <Card {...item} />
        </li>
      </Grid.Column>
    ))}
  </ul>
</Grid>
```
