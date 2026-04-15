# Tags

A horizontal wrapping list of tag/chip links. `Tags` is the flex container; `Tags.Item` renders each tag as an `<a>` element.

## Import

```tsx
import { Tags } from 'altrone-ui';
```

---

## Components

### Tags

A `Flex` wrapper with `direction="horizontal"`, `gap="m"`, and `wrap` enabled.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | `Tags.Item` elements |
| `ref` | `Ref<HTMLDivElement>` | — | Forwarded ref |

All standard `HTMLAttributes<HTMLDivElement>` are also accepted.

---

### Tags.Item

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | **Required.** Tag text |
| `asChild` | `boolean` | `false` | Merge tag styles onto the single child element (Slot pattern). Use for router links or other interactive elements. |
| `children` | `ReactElement` | — | Child element when `asChild={true}` |
| `ref` | `Ref<HTMLAnchorElement>` | — | Forwarded ref |

All standard `AnchorHTMLAttributes<HTMLAnchorElement>` are also accepted (except `children` in non-asChild mode).

---

## Examples

### Basic

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
<Flex direction="vertical" gap="m">
  <h1>{article.title}</h1>
  <p>{article.summary}</p>
  <Tags>
    {article.tags.map((tag) => (
      <Tags.Item key={tag} label={`#${tag}`} href={`/tags/${tag}`} />
    ))}
  </Tags>
</Flex>
```
