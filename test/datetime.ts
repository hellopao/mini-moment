"use strict";

import Moment from "../src/";

const date = new Moment().get('date');
console.log(date);

const day = new Moment().get('day');
console.log(day);

const cur = Moment.format('yyyy-MM-dd hh:mm:ss',new Date())
console.log(cur);

const last = new Moment().prev('month').format();
console.log(last);

const prev = new Moment().prev('month').fromNow();
console.log(prev);

console.log(new Moment().prev('year').next('month').format());

console.log(new Moment().prev('year').prev('month').countDays())

console.log(new Moment().prev('month').next('month').next('date').isToday())


