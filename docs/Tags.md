# Tags

A horizontal, wrapping list of short labels — article topics, filters, keywords. `Tags` is the flex container; each `Tags.Item` is one label.

`Tags.Item` picks its element from its props:

- `href` → an `<a>` (a real, focusable anchor)
- `onClick` (no `href`) → a `role="button"` `<span>`, operable with `Enter` / `Space`
- neither → a plain, inert `<span>` (no cursor, no hover state, not focusable)

Only the interactive forms get the hover underline and pointer cursor.

## Import

```tsx
import { Tags } from 'altrone-ui';
```

---

## Components

### Tags

A `Flex` wrapper with `orientation="horizontal"`, `gap="m"`, and `wrap` enabled.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | `Tags.Item` elements |
| `size` | `'mini' \| 's' \| 'm' \| 'l' \| 'xl'` | `'m'` | Scales the text size of every `Tags.Item` inside it. |
| `ref` | `Ref<HTMLDivElement>` | — | Forwarded ref |

All standard `HTMLAttributes<HTMLDivElement>` are also accepted.

---

### Tags.Item

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | **Required.** Tag text |
| `href` | `string` | — | Renders the item as an `<a>` |
| `onClick` | `(e) => void` | — | Without `href`, renders a keyboard-operable `role="button"` span |
| `asChild` | `boolean` | `false` | Merge tag styles onto the single child element (Slot pattern). Use for router links. Treated as interactive. |
| `children` | `ReactNode` | — | Child element when `asChild={true}` |
| `ref` | `Ref<HTMLElement>` | — | Forwarded to the rendered element (`<a>` or `<span>`) |

All standard `AnchorHTMLAttributes` are also accepted (except `children` in non-asChild mode).

---

## Examples

### Display only (inert)

```tsx
<Tags>
  <Tags.Item label="React" />
  <Tags.Item label="TypeScript" />
  <Tags.Item label="CSS" />
</Tags>
```

### Clickable tags (with onClick)

```tsx
<Tags>
  {topics.map((topic) => (
    <Tags.Item
      key={topic.id}
      label={topic.name}
      onClick={() => filterByTopic(topic.id)}
    />
  ))}
</Tags>
```

### Anchor links

```tsx
<Tags>
  <Tags.Item label="JavaScript" href="/tags/javascript" />
  <Tags.Item label="TypeScript" href="/tags/typescript" />
  <Tags.Item label="React"      href="/tags/react" />
</Tags>
```

### Router links (asChild)

```tsx
<Tags>
  {article.tags.map((tag) => (
    <Tags.Item key={tag} label={tag} asChild>
      <Link to={`/tags/${tag}`} />
    </Tags.Item>
  ))}
</Tags>
```

### Under an article

```tsx
<Flex orientation="vertical" gap="m">
  <h1>{article.title}</h1>
  <p>{article.summary}</p>
  <Tags>
    {article.tags.map((tag) => (
      <Tags.Item key={tag} label={`#${tag}`} href={`/tags/${tag}`} />
    ))}
  </Tags>
</Flex>
```
