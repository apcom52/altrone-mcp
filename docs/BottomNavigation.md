# BottomNavigation

A mobile-style bottom navigation bar. Consists of `BottomNavigation` as the container and `BottomNavigation.Link` for each navigation tab. The selected link sets `aria-current="page"` and is highlighted with a raised backdrop that smoothly slides between links using `motion` layout animations (plus a small scale pulse on each hop). Sizing is compact — a 24px icon over 12px text.

## Import

```tsx
import { BottomNavigation } from 'altrone-ui';
```

---

## Components

### BottomNavigation

The container element. Renders a `<div>` and provides an internal context ID used to coordinate the shared backdrop animation across links.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `floating` | `boolean` | `true` | Applies a floating visual style (elevated card appearance). Set to `false` for a flush bottom bar. |
| `ref` | `Ref<HTMLDivElement>` | — | Forwarded ref |

All standard `HTMLAttributes<HTMLDivElement>` are also accepted.

---

### BottomNavigation.Link

Each navigation tab. Renders as an `<a>` element by default.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | `ReactElement` | — | **Required.** Icon displayed above the label. |
| `label` | `string` | — | **Required.** Tab label shown below the icon. |
| `selected` | `boolean` | `false` | Marks this link as the active tab. Sets `aria-current="page"` and triggers the backdrop animation. |
| `badge` | `string \| number \| ReactElement` | — | Badge chip in the link's top-right corner — styled like a single-icon `Button`'s badge (`plate` pill, corner offset). |
| `asChild` | `boolean` | `false` | Merge styling, ref and interaction props onto a single child element (e.g. a router `<Link>`) instead of rendering an `<a>`. Icon, label, badge and backdrop still come from props. |
| `ref` | `Ref<HTMLAnchorElement>` | — | Forwarded ref |

All standard `AnchorHTMLAttributes<HTMLAnchorElement>` are also accepted (e.g. `href`, `onClick`).

---

## Examples

### Basic

```tsx
const [active, setActive] = useState('home');

<BottomNavigation>
  <BottomNavigation.Link
    icon={<Home />}
    label="Home"
    selected={active === 'home'}
    onClick={() => setActive('home')}
  />
  <BottomNavigation.Link
    icon={<Wallet />}
    label="Wallet"
    selected={active === 'wallet'}
    onClick={() => setActive('wallet')}
  />
  <BottomNavigation.Link
    icon={<Settings />}
    label="Settings"
    selected={active === 'settings'}
    onClick={() => setActive('settings')}
  />
  <BottomNavigation.Link
    icon={<User />}
    label="Profile"
    selected={active === 'profile'}
    onClick={() => setActive('profile')}
  />
</BottomNavigation>
```

### With badges

```tsx
<BottomNavigation>
  <BottomNavigation.Link icon={<Home />} label="Home" selected />
  <BottomNavigation.Link icon={<Bell />} label="Alerts" badge="3" />
  <BottomNavigation.Link icon={<Wallet />} label="Wallet" badge="NEW" />
  <BottomNavigation.Link icon={<User />} label="Profile" />
</BottomNavigation>
```

### Flush (non-floating)

```tsx
<BottomNavigation floating={false}>
  <BottomNavigation.Link icon={<Home />} label="Home" selected />
  <BottomNavigation.Link icon={<Search />} label="Search" />
</BottomNavigation>
```

### With a router Link (asChild)

Set `asChild` and pass the router component as the only child — the link merges its styles/ref/props onto it and still supplies icon, label, badge and backdrop.

```tsx
import { Link, useLocation } from 'react-router-dom';

const { pathname } = useLocation();

<BottomNavigation>
  <BottomNavigation.Link icon={<Home />} label="Home" asChild selected={pathname === '/home'}>
    <Link to="/home" />
  </BottomNavigation.Link>
  <BottomNavigation.Link icon={<User />} label="Profile" asChild selected={pathname === '/profile'}>
    <Link to="/profile" />
  </BottomNavigation.Link>
</BottomNavigation>
```

---

## Animation details

The container renders a single backdrop element and springs it over whichever link is `selected` (the link reports itself; the container measures its rect and re-measures on resize). An extra scale pulse (`[1, 0.85, 1]`) plays on every move, but not on the initial placement.
