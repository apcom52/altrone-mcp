# Result

A centered feedback block: an icon in a tinted media chip, a short title, an optional muted description, and an optional row of action buttons. Covers the common feedback cases via `status` — empty data, info, success, warning, error. An `error` renders `role="alert"`; every other status renders `role="status"`, so a state that appears after a search, submit or filter is announced.

## Import

```tsx
import { Result } from 'altrone-ui';
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `status` | `'empty' \| 'info' \| 'success' \| 'warning' \| 'error'` | `'empty'` | Feedback kind. Sets the default icon and the media-chip tint. `empty` is a neutral "no data" state. |
| `icon` | `ReactNode` | the `status` icon | Custom glyph for the media chip; overrides the status default. |
| `title` | `ReactNode` | for `status="empty"`, the localized `"No data"` | Short heading. |
| `description` | `ReactNode` | — | Muted supporting line under the title. |
| `actions` | `ReactNode` | — | Buttons row rendered below the text (usually one or two `<Button>`s). |
| `size` | `'mini' \| 's' \| 'm' \| 'l' \| 'xl'` | `'m'` | Density — scales the chip, type and padding. |
| `children` | `ReactNode` | — | Alias for `description`. |
| `ref` | `Ref<HTMLDivElement>` | — | Forwarded ref |

All standard `HTMLAttributes<HTMLDivElement>` (except `title`) are also accepted.

**Title / description resolution:** with no `title`, a lone `description` (or `children`) becomes the heading — so `<Result>No projects yet</Result>` shows just that line. Pass an explicit `title` to get both a heading and a description. With nothing at all, `status="empty"` still shows the localized `"No data"`; other statuses render just the icon (and any `actions`).

Only the media chip is tinted by `status` — the title and description stay neutral. Tints use the semantic status role tokens.

---

## Examples

### Empty (default)

```tsx
<Result />
```

### One line (table / menu / small panel)

```tsx
<Result size="s">No results for "kubernetes"</Result>
```

### Success

```tsx
import { MailCheck } from 'lucide-react';

<Result
  status="success"
  size="l"
  icon={<MailCheck />}
  title="Invitations sent"
  description="Four teammates will get an email with a link to join the workspace."
  actions={<Button label="Back to team" variant="submit" />}
/>
```

### Error with retry

```tsx
import { RefreshCw } from 'lucide-react';

<Result
  status="error"
  title="Couldn't load activity"
  description="Something went wrong on our side. This usually clears up on its own."
  actions={<Button label="Retry" icon={<RefreshCw />} />}
/>
```

### No access (warning)

```tsx
import { ShieldAlert } from 'lucide-react';

<Result
  status="warning"
  icon={<ShieldAlert />}
  title="You don't have access to this project"
  description="Ask an owner to add you, or switch to a workspace where you're a member."
  actions={<Button label="Request access" variant="submit" />}
/>
```

### Full empty state with actions

```tsx
import { FolderPlus, Plus, Upload } from 'lucide-react';

<Result
  icon={<FolderPlus />}
  title="No projects yet"
  description="Projects group your work, deploys and members. Create the first one to get going."
  actions={
    <>
      <Button label="New project" icon={<Plus />} variant="submit" />
      <Button label="Import" icon={<Upload />} />
    </>
  }
/>
```

### Inside a list

```tsx
{items.length === 0 ? (
  <Result>No items yet. Create one to get started.</Result>
) : (
  items.map(/* ... */)
)}
```
