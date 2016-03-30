## mini-moment

a Moment util 

### usage

```bash
    npm install mini-moment
```

### example

```javascript
    var Moment = require('mini-moment');
    
    var dateStr = new Moment().format();
    
    var tommorow = new Moment().next('date');
    
    var yesterday = new Moment().prev('date');
    
    var days = new Moment().countDays();
    
    var str = Moment.format(new Date());
 
```