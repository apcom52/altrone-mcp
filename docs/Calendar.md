# Calendar

A single-month calendar grid. Renders one month on a fixed six-row (42-cell)
grid so its height never shifts between months. It exposes two API levels:

- **High-level** — pass `mode` and `Calendar` owns the selection state
  (`value` / `defaultValue` / `onSelect`), renders its own navigation header and
  weekday row, and handles range hover-preview highlighting.
- **Low-level** — omit `mode` and drive the grid with `selectedDates` +
  `DateComponent`. The header and weekday row are hidden by default; navigation
  and selection are the caller's responsibility. This is the shape `DatePicker`
  builds on.

## Import

```tsx
import { Calendar } from 'altrone-ui';
```

Requires `dayjs` as a peer dependency.

---

## Props

### Selection (high-level)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `mode` | `'single' \| 'multiple' \| 'range'` | — | Enables the high-level API. When set, `Calendar` owns selection state and shows its header/weekday row. |
| `value` | `Dayjs \| Dayjs[] \| { from?: Dayjs; to?: Dayjs }` | — | Controlled value. Shape depends on `mode`: `Dayjs` for `single`, `Dayjs[]` for `multiple`, `{ from, to }` for `range`. |
| `defaultValue` | same as `value` | — | Uncontrolled initial value. |
| `onSelect` | `(value, event: React.MouseEvent<HTMLButtonElement>) => void` | — | Fires on every day click with the next value (same shape as `value`). |

Range clicks: the first click opens `{ from }`; the second closes the range,
auto-ordering so `from` never comes after `to`; a click on a completed range
starts a new one. While a range is half-open, hovering a day previews the band.

### Display month

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `month` | `Dayjs` | — | Controlled displayed month (year + month only). |
| `defaultMonth` | `Dayjs` | `dayjs()` | Uncontrolled initial month. |
| `onMonthChange` | `(month: Dayjs, event: MouseEvent<HTMLButtonElement>) => void` | — | Fires when the header navigation changes the month. |

### Locale & week

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `locale` | `string` | active app language | BCP-47 locale for the month caption and weekday names. |
| `firstDayOfWeek` | `'monday' \| 'sunday' \| 'auto'` | `'auto'` | `'auto'` resolves the first weekday from the locale (Sunday for `en-US`, Monday for `ru-RU`, …). |

### Constraints

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `minDate` | `Dayjs` | — | Days before this are disabled. |
| `maxDate` | `Dayjs` | — | Days after this are disabled. |
| `isDateDisabled` | `(date: Dayjs) => boolean` | — | Predicate to disable individual days. |
| `disabled` | `boolean` | `false` | Disables every day cell. |

### Chrome & layout

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `showHeader` | `boolean` | `true` if `mode` is set, else `false` | Month caption + navigation row. |
| `showNavigation` | `boolean` | `true` | The `‹` / `›` buttons inside the header. |
| `showWeekdays` | `boolean` | `true` if `mode` is set, else `false` | The weekday-name row. |
| `showOutsideDays` | `boolean` | `true` | Render leading/trailing days from adjacent months (muted) instead of blank cells. |
| `prevIcon` | `ReactElement` | `Application.icons.prev` | Overrides the header's previous-month icon. |
| `nextIcon` | `ReactElement` | `Application.icons.next` | Overrides the header's next-month icon. |

### Low-level

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `selectedDates` | `Dayjs[]` | — | Days rendered in the selected state (used when `mode` is omitted). |
| `cursorDate` | `Dayjs` | — | Hover date for a range preview between `selectedDates[0]` and `cursorDate` (both directions). |
| `onDateChange` | `(date: Dayjs, event: React.MouseEvent<HTMLButtonElement>) => void` | — | Fires on a day click; `Calendar` keeps no state. |
| `DateComponent` | `React.FC<CalendarRenderDateProps>` | `Calendar.Date` | Custom day-cell renderer. |
| `ref` | `Ref<HTMLDivElement>` | — | Forwarded to the root element. |

All standard `HTMLAttributes<HTMLDivElement>` are also accepted.

---

## CalendarRenderDateProps

Props passed to each `DateComponent` instance:

| Prop | Type | Description |
|------|------|-------------|
| `currentDate` | `Dayjs` | The date this cell represents |
| `weekDay` | `number` | Day of week (0 = Sunday … 6 = Saturday) |
| `fromAnotherMonth` | `boolean` | `true` for padding days from the previous/next month |
| `today` | `boolean` | `true` if this date is today |
| `selected` | `boolean` | `true` if this date is selected |
| `disabled` | `boolean` | `true` if this specific day is disabled |
| `cursorHighlighted` | `boolean` | `true` for the legacy `cursorDate` range preview |
| `inRange` | `boolean` | `true` if the day lies within the (possibly hover-previewed) range |
| `rangeStart` / `rangeEnd` | `boolean` | `true` at the range bounds |
| `startOfWeek` / `endOfWeek` | `boolean` | First / last rendered column of the week row |
| `inRangeAbove` / `inRangeBelow` | `boolean` | `true` if the band also covers the cell directly above / below — used to round only the band's outer corners |
| `onSelect` | `(date: Dayjs, event) => void` | Call to report a selection |
| `onHover` | `(date: Dayjs \| undefined, event: MouseEvent<HTMLButtonElement>) => void` | Call to drive the range hover-preview |

---

## Examples

### Single date

```tsx
const [value, setValue] = useState<Dayjs>();

<Calendar mode="single" value={value} onSelect={setValue} />
```

### Multiple dates

```tsx
const [value, setValue] = useState<Dayjs[]>([]);

<Calendar mode="multiple" value={value} onSelect={setValue} />
```

### Date range with highlighting

```tsx
const [range, setRange] = useState<{ from?: Dayjs; to?: Dayjs }>({});

<Calendar mode="range" value={range} onSelect={setRange} />
```

### Localized week start

```tsx
<Calendar mode="single" locale="ru-RU" />          {/* auto → Monday */}
<Calendar mode="single" firstDayOfWeek="monday" /> {/* pinned */}
```

### Low-level grid (no chrome)

```tsx
const [selected, setSelected] = useState<Dayjs>();

<Calendar
  month={month}
  selectedDates={selected ? [selected] : []}
  onDateChange={(date) => setSelected(date)}
  DateComponent={MyDayCell}
/>
```
