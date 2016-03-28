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

const next = new Moment().next('month').next('date',2).fromNow();
console.log(next);

const startOfYear = new Moment().startOf('year');
console.log(startOfYear);

const startOfSeason = new Moment().next('month').startOf('season');
console.log(startOfSeason);

const startOfMonth = new Moment().startOf('month');
console.log(startOfMonth);

const startOfWeek = new Moment().startOf('week');
console.log(startOfWeek);

const startOfDay = new Moment().startOf('date');
console.log(startOfDay);

const startOfHour = new Moment().startOf('hour');
console.log(startOfHour);

const startOfMinute = new Moment().startOf('minute');
console.log(startOfMinute);

const settingDate = new Moment().set('year',1999).format();
console.log(settingDate);
