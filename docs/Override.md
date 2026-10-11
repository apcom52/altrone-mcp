# Override

Re-applies a part of `Application`'s settings to one block of the tree. Renders a `<div data-altrone-root>` with its own theme/accent and re-provides localization and icons; everything not passed is inherited from the surrounding `Application` or `Override`.

## Import

```tsx
import { Override } from 'altrone-ui';
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `theme` | `'light' \| 'dark'` | inherited | Theme of the block |
| `accent` | `Accent` | inherited | Accent color of the block |
| `language` | `Language` | inherited | Language of the block |
| `customLabels` | `Partial<Localization>` | — | Labels merged over the inherited dictionary |
| `icons` | `Partial<IconSet>` | — | Icon roles merged over the inherited ones |
| `ref` | `Ref<HTMLDivElement>` | — | Forwarded ref |

All standard `HTMLAttributes<HTMLDivElement>` are also accepted.

The block paints its own background, so a different theme looks like a real panel.

`Popover` and `Tooltip` opened from inside the block portal into it and follow its theme. `Modal`, `Drawer`, `Dialog` and `Notifications` still render under the top-level `Application` root and are not affected.

---

## Examples

```tsx
<Override theme="dark" accent="red">
  <Button>Delete</Button>
</Override>
```
