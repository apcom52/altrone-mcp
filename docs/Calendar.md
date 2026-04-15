# Calendar

A headless-style calendar grid displaying one month at a time. Handles date rendering, multi-selection, range highlighting, and a configurable week start day. The component only renders the day grid — month navigation must be implemented by the parent.

## Import

```tsx
import { Calendar } from 'altrone-ui';
```

Requires `dayjs` as a peer dependency. The component uses an internal `dayjsInstance` with any plugins pre-registered.

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `month` | `Dayjs` | `dayjs()` | The month to display. Only the year and month portions are used; the day is ignored. |
| `selectedDates` | `Dayjs[]` | `[dayjs()]` | Array of selected dates. Each matching day is rendered in a selected state. |
| `cursorDate` | `Dayjs` | — | Hover/cursor date for range previews. When set, all dates between `selectedDates[0]` and `cursorDate` are highlighted (in both directions). |
| `onDateChange` | `(date: Dayjs, event: React.MouseEvent<HTMLButtonElement>) => void` | — | Called when the user clicks a date cell. |
| `DateComponent` | `React.FC<CalendarRenderDateProps>` | `CalendarDate` | Custom day cell component. Replace the default renderer to add custom styling or content. |
| `disabled` | `boolean` | `false` | Disables all date cells. |
| `firstDayOfWeek` | `'monday' \| 'sunday'` | `'sunday'` | Controls which day starts each week row. |
| `ref` | `Ref<HTMLDivElement>` | — | Forwarded ref |

All standard `HTMLAttributes<HTMLDivElement>` are also accepted.

---

## CalendarRenderDateProps

Props passed to each `DateComponent` instance:

| Prop | Type | Description |
|------|------|-------------|
| `currentDate` | `Dayjs` | The date this cell represents |
| `weekDay` | `number` | Day of the week (0 = Sunday … 6 = Saturday) |
| `fromAnotherMonth` | `boolean` | `true` for padding days from the previous/next month |
| `today` | `boolean` | `true` if this date is today |
| `selected` | `boolean` | `true` if this date is in `selectedDates` |
| `disabled` | `boolean` | `true` if the whole calendar is disabled |
| `cursorHighlighted` | `boolean` | `true` if this date falls within the range between `selectedDates[0]` and `cursorDate` |
| `onSelect` | `(date: Dayjs, event) => void` | Call this in your custom component to trigger `onDateChange` |

---

## Examples

### Basic single-month display

```tsx
import dayjs from 'dayjs';

const [month, setMonth] = useState(dayjs());

<Calendar
  month={month}
  selectedDates={[]}
  onDateChange={(date) => console.log(date.format('YYYY-MM-DD'))}
/>
```

### Single date selection

```tsx
const [month, setMonth] = useState(dayjs());
const [selected, setSelected] = useState<Dayjs | null>(null);

<Calendar
  month={month}
  selectedDates={selected ? [selected] : []}
  onDateChange={(date) => setSelected(date)}
/>
```

### Multi-date selection

```tsx
const [month, setMonth] = useState(dayjs());
const [selected, setSelected] = useState<Dayjs[]>([]);

const toggle = (date: Dayjs) => {
  setSelected((prev) =>
    prev.some((d) => d.isSame(date, 'day'))
      ? prev.filter((d) => !d.isSame(date, 'day'))
      : [...prev, date],
  );
};

<Calendar month={month} selectedDates={selected} onDateChange={toggle} />
```

### Date range with cursor highlight

```tsx
const [month, setMonth] = useState(dayjs());
const [range, setRange] = useState<[Dayjs | null, Dayjs | null]>([null, null]);
const [cursor, setCursor] = useState<Dayjs | undefined>();

const handleSelect = (date: Dayjs) => {
  const [start, end] = range;
  if (!start || (start && end)) {
    setRange([date, null]);
  } else {
    setRange([start, date]);
  }
};

<div
  onMouseLeave={() => setCursor(undefined)}
>
  <Calendar
    month={month}
    selectedDates={range.filter(Boolean) as Dayjs[]}
    cursorDate={cursor}
    onDateChange={handleSelect}
  />
</div>
```

### Monday as first day of week

```tsx
<Calendar month={dayjs()} firstDayOfWeek="monday" />
```

### Month navigation

The Calendar does not include navigation controls. Implement them yourself:

```tsx
const [month, setMonth] = useState(dayjs());

<div>
  <button onClick={() => setMonth((m) => m.subtract(1, 'month'))}>←</button>
  <span>{month.format('MMMM YYYY')}</span>
  <button onClick={() => setMonth((m) => m.add(1, 'month'))}>→</button>
  <Calendar month={month} selectedDates={[]} onDateChange={handleSelect} />
</div>
```

### Custom day cell

Replace the default cell renderer to add event dots, tooltips, or any custom content.

```tsx
const CustomDay: React.FC<CalendarRenderDateProps> = ({
  currentDate,
  selected,
  today,
  fromAnotherMonth,
  disabled,
  onSelect,
}) => (
  <button
    onClick={(e) => onSelect?.(currentDate, e)}
    disabled={disabled}
    style={{
      opacity: fromAnotherMonth ? 0.3 : 1,
      fontWeight: today ? 'bold' : 'normal',
      background: selected ? 'var(--primary-500)' : 'transparent',
    }}
  >
    {currentDate.date()}
  </button>
);

<Calendar month={dayjs()} DateComponent={CustomDay} onDateChange={handleSelect} />
```

---

## Grid layout

The calendar computes the full grid by:
1. Prepending padding days from the previous month to fill the first week row.
2. Including all days of `month`.
3. Appending padding days from the next month to fill the last week row.

Padding days have `fromAnotherMonth={true}` in their props.
