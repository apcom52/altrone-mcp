# Text

A polymorphic typography component. The rendered HTML element is determined by which discriminating prop is passed — no `as` prop needed. All standard HTML attributes of the resolved element are accepted alongside Text-specific props.

## Import

```tsx
import { Text } from "altrone-ui";
```

We need to use this component for all text labels where it makes sense.

```tsx
<Button label={<Text>button content</Text>} /> // bad example
<Text block size={6} weight="bold">About me</Text> // good example
```

---

## Element variants

The component uses a **discriminated union** — mutually exclusive props select the variant. Only one discriminating prop can be used at a time.

| Prop      | Value       | Rendered element             |
| --------- | ----------- | ---------------------------- |
| _(none)_  | —           | `<span>`                     |
| `block`   | `true`      | `<p>`                        |
| `list`    | `"numeric"` | `<ol>`                       |
| `list`    | `"marked"`  | `<ul>`                       |
| `item`    | `true`      | `<li>`                       |
| `href`    | `string`    | `<a>`                        |
| `asChild` | `true`      | child element (Slot pattern) |

```tsx
<Text>inline span</Text>
<Text block>paragraph</Text>
<Text list="numeric">…</Text>
<Text list="marked">…</Text>
<Text item>list item</Text>
<Text href="/about">link</Text>
<Text asChild><button type="button">button with text styles</button></Text>
```

---

## Props

### Shared props (all variants)

| Prop          | Type                                            | Default     | Description                                                                                 |
| ------------- | ----------------------------------------------- | ----------- | ------------------------------------------------------------------------------------------- |
| `size`        | `1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 7 \| 8 \| 9`     | —           | Font size scale. 1 is smallest, 9 is largest. Inherits from cascade css rules when omitted. |
| `weight`      | `'light' \| 'regular' \| 'medium' \| 'bold'`    | `'regular'` | Font weight                                                                                 |
| `color`       | `'success' \| 'danger' \| 'warning' \| 'muted'` | —           | Applies a semantic color token. Omit to inherit.                                            |
| `align`       | `'start' \| 'center' \| 'end' \| 'justify'`     | —           | Text alignment                                                                              |
| `italic`      | `boolean`                                       | `false`     | Italic style                                                                                |
| `underline`   | `boolean`                                       | `false`     | Underline decoration                                                                        |
| `deleted`     | `boolean`                                       | `false`     | Strikethrough (marks removed content)                                                       |
| `highlighted` | `boolean`                                       | `false`     | Background highlight                                                                        |
| `code`        | `boolean`                                       | `false`     | Monospace code style (`<code>`-like appearance)                                             |
| `kbd`         | `boolean`                                       | `false`     | Keyboard shortcut style (`<kbd>`-like appearance)                                           |
| `truncate`    | `boolean`                                       | `false`     | Single-line ellipsis overflow. Requires a constrained width on the element.                 |
| `lineClamp`   | `number`                                        | —           | Multi-line ellipsis. Sets the maximum number of visible lines.                              |
| `nowrap`      | `boolean`                                       | `false`     | Prevents text from wrapping (`white-space: nowrap`)                                         |

### Link-only props (`href` variant)

| Prop       | Type      | Default | Description                                                    |
| ---------- | --------- | ------- | -------------------------------------------------------------- |
| `href`     | `string`  | —       | URL; also activates the `<a>` variant                          |
| `external` | `boolean` | `false` | Automatically adds `target="_blank" rel="noopener noreferrer"` |

### asChild variant

| Prop      | Type   | Description                                                                                       |
| --------- | ------ | ------------------------------------------------------------------------------------------------- |
| `asChild` | `true` | Merges all Text styles onto the single child React element. Child must be a single React element. |

---

## Examples

### Size scale

```tsx
<Text size={2}>Caption text</Text>
<Text size={4}>Body text</Text>
<Text size={6} weight="bold" block>Section heading</Text>
<Text size={8} weight="bold" block>Page title</Text>
```

### Weight

```tsx
<Text weight="light">Light</Text>
<Text weight="regular">Regular</Text>
<Text weight="medium">Medium</Text>
<Text weight="bold">Bold</Text>
```

### Color

```tsx
<Text color="muted">Secondary text</Text>
<Text color="danger">Error message</Text>
<Text color="success">Saved successfully</Text>
<Text color="warning">Approaching limit</Text>
```

### Inline decorations

```tsx
<Text italic>Italic</Text>
<Text underline>Underline</Text>
<Text deleted>Deleted</Text>
<Text highlighted>Highlighted</Text>
<Text code>npm install altrone-ui</Text>
<Text kbd>Ctrl + S</Text>
```

### Overflow control

```tsx
{
  /* Single-line truncation — element must have constrained width */
}
<Text truncate style={{ maxWidth: 240 }}>
  Very long title that will be cut off
</Text>;

{
  /* Multi-line clamp */
}
<Text block lineClamp={3}>
  A longer description that should be visible for at most three lines, after
  which it gets an ellipsis.
</Text>;

{
  /* No wrapping */
}
<Text nowrap>[Regression]</Text>;
```

### Alignment (requires block context or explicit width)

```tsx
<Text block align="center" size={7} weight="bold">
  Centered heading
</Text>
<Text block align="end" color="muted">
  Right-aligned caption
</Text>
```

### Lists

```tsx
<Text list="numeric">
  <Text item>First item</Text>
  <Text item>Second item</Text>
  <Text item>Third item</Text>
</Text>

<Text list="marked">
  <Text item>Apples</Text>
  <Text item>Oranges</Text>
</Text>
```

### Links

```tsx
{
  /* Internal link */
}
<Text href="/docs">Read the docs</Text>;

{
  /* External link — auto-adds target="_blank" rel="noopener noreferrer" */
}
<Text href="https://github.com" external>
  View on GitHub
</Text>;
```

### asChild — apply Text styles to any element

Use `asChild` when you need a semantic element (e.g. `<button>`) but want Text's typography styles applied to it.

```tsx
<Text size={3} color="muted" align="center" asChild>
  <button type="button" onClick={handleLoadMore}>
    Load more
  </button>
</Text>
```

> **Note:** `asChild` requires exactly one React element as `children`. If `children` is not a valid element, the component returns `null` and logs a warning in development.

### Composing inline formatting

```tsx
<Text block>
  Press <Text kbd>Ctrl + C</Text> to copy, or run <Text code>git clone</Text>{" "}
  from the terminal. This line has <Text highlighted>highlighted text</Text> and
  a{" "}
  <Text href="https://example.com" external>
    link
  </Text>
  .
</Text>
```

### Real-world: activity feed card

```tsx
<Flex direction="horizontal" gap="s" align="center">
  <Text size={2} color="danger" nowrap>[Regression]</Text>
  <Text size={3} weight="medium" truncate style={{ flex: 1, minWidth: 0 }}>
    Avatar upload fails silently on Safari 17
  </Text>
  <Text size={2} color="muted" nowrap>v3.8.2</Text>
</Flex>

<Text block size={3} color="muted" lineClamp={2}>
  After upgrading sharp to 0.33, HEIC images uploaded from Safari 17 are
  converted incorrectly — the resulting file has a corrupted colour profile.
</Text>

<Text size={2} truncate code style={{ display: 'inline-block', maxWidth: 280 }}>
  packages/api/src/handlers/media/processUpload.ts#L142
</Text>
```

---

## TypeScript

The props type is a discriminated union exported as `TextProps`. Each variant has a precisely-typed `ref` and only accepts the HTML attributes of its resolved element.

```ts
import type { TextProps } from "altrone-ui";
```

Passing two discriminating props simultaneously is a **type error**:

```tsx
// ✗ Type error — block and href are mutually exclusive
<Text block href="/home">
  Bad
</Text>
```
