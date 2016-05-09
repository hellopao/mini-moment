# mini-moment

a mini datetime util

## usage

### Node.js

```bash
npm install mini-moment
```
```javascript
const Moment = require('mini-moment');
const dateStr = new Moment().format();
```

### Browser

```html
<script src="mini-moment.js"></script>
<script>
    var dateStr = new Moment().format();
</script>
```

### Require.js

```javascript
require.config({
    paths: {
        "Moment": "path/to/mini-moment",
    }
});
define(["Moment"], function (Moment) {
    var dateStr = new Moment().format();
});
```

## API

- date - Date - Date instance of the original moment

- isToday() - boolean- compare the original moment to today;

- set(type: "year" | "month" | "date" | "hour" | "second" | "minute" | "week", value: number) - Moment -Mutates the original moment by setting it to a unit of the incoming time

- next(type: "year" | "month" | "date" | "hour" | "second" | "minute" | "week", delta?: number) - Moment -Mutates the original moment by adding time;

- prev(type: "year" | "month" | "date" | "hour" | "second" | "minute" | "week", delta?: number) - Moment - Mutates the original moment by subtracting time;

- get(type: "year" | "month" | "date" | "hour" | "second" | "minute" | "day" | "millisecond") - string - get time unit of the original moment

- format(formats?: string) - string - format the original moment with format string;

- fromNow() - string - get the duration string between the original moment and the current time;

- countDays() - number - get the day count in the month of the original moment

- startOf(type: "year" | "season" | "month" | "date" | "hour" | "minute" | "week") - Moment - Mutates the original moment by setting it to the start of a unit of time

## example

```javascript
const Moment = require('mini-moment');

const year = new Moment().get('year');
const month = Moment.get('month',new Date());

const timestamp = new Moment().set('date',1).date.getTime();

const format = new Moment('2016/03/30').format();
const format2 = Moment.format('2016/03/30');

const duration =  new Moment().prev('hour').fromNow();

const start = new Moment('2016/3/30').startOf('month').format();

const days = new Moment('2016/02/01').countDays();
const days2 = Moment.countDays('2016/02/01');

const next = new Moment('2016/03/30').next('date').format();

const prev = new Moment('2016/03/30').prev('date').format();

const isToday = new Moment(now).isToday();
const isToday2 = Moment.isToday(now);

const isValid = Moment.isValid('dsfwerwerwe');
```