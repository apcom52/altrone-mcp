# BottomNavigation

A mobile-style bottom navigation bar. Consists of `BottomNavigation` as the container and `BottomNavigation.Item` for each navigation tab. The selected item is highlighted with an animated backdrop that smoothly slides between items using `framer-motion` layout animations.

## Import

```tsx
import { BottomNavigation } from 'altrone-ui';
```

---

## Components

### BottomNavigation

The container element. Renders a `<div>` and provides an internal context ID used to coordinate the shared backdrop animation across items.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `floating` | `boolean` | `true` | Applies a floating visual style (elevated card appearance). Set to `false` for a flush bottom bar. |
| `ref` | `Ref<HTMLDivElement>` | — | Forwarded ref |

All standard `HTMLAttributes<HTMLDivElement>` are also accepted.

---

### BottomNavigation.Item

Each navigation tab. Renders as an `<a>` element by default. The `renderFunc` prop can override the element entirely.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | `ReactElement` | — | **Required.** Icon displayed above the label. |
| `label` | `string` | — | **Required.** Tab label shown below the icon. |
| `selected` | `boolean` | `false` | Marks this item as the active tab. Triggers the backdrop animation. |
| `badge` | `string \| number \| ReactElement` | — | Badge shown in the top-right corner of the item (e.g. notification count). |
| `renderFunc` | `RenderFuncProp<HTMLAnchorElement, BottomNavigationItemProps>` | — | Custom render function. Receives `(ref, props)` and must return a React element. Use this to render a router `<Link>` or any other element instead of `<a>`. |
| `ref` | `Ref<HTMLAnchorElement>` | — | Forwarded ref |

All standard `AnchorHTMLAttributes<HTMLAnchorElement>` are also accepted (e.g. `href`, `onClick`).

---

## Examples

### Basic

```tsx
const [active, setActive] = useState('home');

<BottomNavigation>
  <BottomNavigation.Item
    icon={<Home />}
    label="Home"
    selected={active === 'home'}
    onClick={() => setActive('home')}
  />
  <BottomNavigation.Item
    icon={<Wallet />}
    label="Wallet"
    selected={active === 'wallet'}
    onClick={() => setActive('wallet')}
  />
  <BottomNavigation.Item
    icon={<Settings />}
    label="Settings"
    selected={active === 'settings'}
    onClick={() => setActive('settings')}
  />
  <BottomNavigation.Item
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
  <BottomNavigation.Item icon={<Home />} label="Home" selected />
  <BottomNavigation.Item icon={<Bell />} label="Alerts" badge="3" />
  <BottomNavigation.Item icon={<Wallet />} label="Wallet" badge="NEW" />
  <BottomNavigation.Item icon={<User />} label="Profile" />
</BottomNavigation>
```

### Flush (non-floating)

```tsx
<BottomNavigation floating={false}>
  <BottomNavigation.Item icon={<Home />} label="Home" selected />
  <BottomNavigation.Item icon={<Search />} label="Search" />
</BottomNavigation>
```

### With a router Link (renderFunc)

Use `renderFunc` to replace the `<a>` element with a router component while keeping all Button.Item styles and the backdrop animation.

```tsx
import { Link, useLocation } from 'react-router-dom';

const renderLink = (ref, props) => <Link ref={ref} {...props} />;

<BottomNavigation>
  <BottomNavigation.Item
    icon={<Home />}
    label="Home"
    href="/home"
    selected={location.pathname === '/home'}
    renderFunc={renderLink}
  />
  <BottomNavigation.Item
    icon={<User />}
    label="Profile"
    href="/profile"
    selected={location.pathname === '/profile'}
    renderFunc={renderLink}
  />
</BottomNavigation>
```

---

## Animation details

The selected backdrop is a single `motion.div` with a shared `layoutId` scoped to the parent `BottomNavigation` instance. When `selected` moves from one item to another, Framer Motion automatically animates the backdrop between positions. An extra scale pulse (`[1, 0.85, 1]`) plays on every backdrop move.
