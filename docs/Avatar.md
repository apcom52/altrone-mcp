# Avatar

Displays a user's avatar. Shows a photo when `imageSrc` is provided and the image loads successfully; falls back to initials automatically on load error. Initials are derived from `firstName` and `lastName`.

## Import

```tsx
import { Avatar } from 'altrone-ui';
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `firstName` | `string` | — | **Required.** Used to derive the first initial and as part of the `aria-label`. |
| `lastName` | `string` | — | Optional last name. Adds a second initial when provided. |
| `size` | `'mini' \| 's' \| 'm' \| 'l' \| 'xl'` | `'m'` | Avatar size |
| `imageSrc` | `string` | — | URL of the user's photo. Falls back to initials if the image fails to load. When `imageSrc` changes, the error state resets and the new image is attempted. |
| `backgroundColor` | `string` | — | Background color of the initials circle. Any valid CSS color value. When omitted, a theme default is used. |
| `textColor` | `string` | — | Color of the initials text. Overrides automatic contrast calculation. |
| `ref` | `Ref<HTMLDivElement>` | — | Forwarded ref |

All standard `HTMLAttributes<HTMLDivElement>` are also accepted.

---

## Initials logic

- Initials = `firstName[0]` + `lastName[0]` (if `lastName` is provided).
- Leading whitespace in either name is trimmed before taking the first character.
- `aria-label` is set to the full name (`firstName + ' ' + lastName`).

---

## Examples

### Basic

```tsx
<Avatar firstName="Alex" lastName="Morgan" />
```

### Sizes

```tsx
<Avatar firstName="Alex" lastName="Morgan" size="mini" />
<Avatar firstName="Alex" lastName="Morgan" size="s" />
<Avatar firstName="Alex" lastName="Morgan" />       {/* default: m */}
<Avatar firstName="Alex" lastName="Morgan" size="l" />
<Avatar firstName="Alex" lastName="Morgan" size="xl" />
```

### First name only

```tsx
<Avatar firstName="Alice" />   {/* shows "A" */}
```

### With photo

```tsx
<Avatar
  firstName="Nino"
  lastName="Kobakhidze"
  imageSrc="https://example.com/avatar.jpg"
  size="l"
/>
```

The component resets the error state when `imageSrc` changes, so swapping URLs will always attempt to load the new image.

### Custom background color

```tsx
<Avatar firstName="Alice" lastName="Blue" backgroundColor="#6366f1" />
```

### Custom text color (overrides auto-contrast)

```tsx
<Avatar
  firstName="Alice"
  lastName="Gold"
  backgroundColor="#1e3a5f"
  textColor="#fbbf24"
/>
```

### Stacked group

Use negative `marginLeft` and a border to create an overlapping stack. The `title` attribute adds a native tooltip.

```tsx
<div style={{ display: 'flex', paddingLeft: 12 }}>
  {members.map((member) => (
    <Avatar
      key={member.firstName}
      firstName={member.firstName}
      lastName={member.lastName}
      backgroundColor={member.backgroundColor}
      style={{ marginLeft: -12, boxShadow: '0 0 0 2px var(--background-1)' }}
      title={`${member.firstName} ${member.lastName}`}
    />
  ))}
</div>
```

### Overflow counter in a stacked group

Pass a count string as `firstName` to render a "+N" overflow indicator using the same component.

```tsx
<Avatar firstName="+4" lastName="" size="s" style={{ marginLeft: -8 }} />
```

### Team roster row

```tsx
<div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
  <Avatar firstName="Alice" lastName="Morgan" backgroundColor="#6366f1" />
  <div>
    <Text weight="medium">Alice Morgan</Text>
    <Text size={3} color="muted">Product Designer</Text>
  </div>
</div>
```
