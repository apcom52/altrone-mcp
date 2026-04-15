# EntityList

A vertical list of structured items with title, subtitle, meta area, optional icon, and optional checkbox selection. Items can be made into links or any other element via `asChild`.

## Import

```tsx
import { EntityList } from 'altrone-ui';
```

---

## Components

### EntityList

The container. Provides the selectable context to all child items.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `selectable` | `boolean` | `false` | Enables checkboxes on all items. Each item manages its own checked state internally. |
| `ref` | `Ref<HTMLDivElement>` | — | Forwarded ref |

---

### EntityList.Item

A single list row.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `ReactNode` | — | **Required.** Primary text of the item |
| `subtitle` | `ReactNode` | — | Secondary text below the title |
| `icon` | `ReactElement` | — | Icon displayed to the left of the title |
| `meta` | `ReactNode` | — | Content rendered in the right panel area (e.g. labels, actions) |
| `disabled` | `boolean` | `false` | Disables click and checkbox interaction |
| `onSelect` | `(checked: boolean, event: ChangeEvent<HTMLInputElement>) => void` | — | Called when the item's checkbox is toggled. Only fires when `selectable` is `true` on the parent. |
| `asChild` | `boolean` | `false` | Merges item styles onto the single child element. Use to render items as `<a>` or router `<Link>`. |
| `children` | — | — | When `asChild=false`: extra content rendered inside the right panel alongside `meta`. When `asChild=true`: the single child element to merge onto. |
| `ref` | `Ref<HTMLDivElement>` | — | Forwarded ref |

---

## Examples

### Basic list

```tsx
<EntityList>
  <EntityList.Item title="Alice Morgan" subtitle="Product Designer" />
  <EntityList.Item title="Ben Carter"   subtitle="Engineer" />
  <EntityList.Item title="Clara Diaz"   subtitle="Marketing" />
</EntityList>
```

### With icon and meta

```tsx
import { User } from 'lucide-react';

<EntityList>
  <EntityList.Item
    title="Alice Morgan"
    subtitle="alice@example.com"
    icon={<User />}
    meta={<Label color="success">Active</Label>}
  />
  <EntityList.Item
    title="Ben Carter"
    subtitle="ben@example.com"
    icon={<User />}
    meta={<Label color="danger">Suspended</Label>}
    disabled
  />
</EntityList>
```

### Selectable list

Checkboxes appear when `selectable={true}` is set on `EntityList`. Each item's checkbox state is managed internally; use `onSelect` to react to changes.

```tsx
const [selected, setSelected] = useState<string[]>([]);

<EntityList selectable>
  {users.map((user) => (
    <EntityList.Item
      key={user.id}
      title={user.name}
      subtitle={user.email}
      onSelect={(checked) => {
        setSelected((prev) =>
          checked ? [...prev, user.id] : prev.filter((id) => id !== user.id),
        );
      }}
    />
  ))}
</EntityList>
```

### Items as links (asChild)

```tsx
<EntityList>
  {files.map((file) => (
    <EntityList.Item
      key={file.id}
      title={file.name}
      subtitle={file.size}
      asChild
    >
      <a href={`/files/${file.id}`} />
    </EntityList.Item>
  ))}
</EntityList>
```

### With actions in children

When not using `asChild`, `children` is rendered inside the right panel alongside `meta`.

```tsx
<EntityList>
  <EntityList.Item
    title="Report Q3.pdf"
    subtitle="2.4 MB"
    meta={<Text size={2} color="muted">Modified 2 days ago</Text>}
  >
    <Button label="Download" size="s" icon={<Download />} />
  </EntityList.Item>
</EntityList>
```

---

## Notes

- Item checkbox state resets automatically when the parent `selectable` prop changes.
- `onClick` on `EntityList.Item` is passed to the title/content area, not the whole row, when not using `asChild`.
