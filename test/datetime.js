"use strict";
var _1 = require("../src/");
var date = new _1["default"]().get('date');
console.log(date);
var day = new _1["default"]().get('day');
console.log(day);
var cur = _1["default"].format('yyyy-MM-dd hh:mm:ss', new Date());
console.log(cur);
var last = new _1["default"]().prev('month').format();
console.log(last);
var prev = new _1["default"]().prev('month').fromNow();
console.log(prev);
console.log(new _1["default"]().prev('year').next('month').format());
console.log(new _1["default"]().prev('year').prev('month').countDays());
console.log(new _1["default"]().prev('month').next('month').next('date').isToday());
//# sourceMappingURL=datetime.js.map