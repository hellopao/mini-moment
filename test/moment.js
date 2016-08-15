"use strict";

const test = require('ava').test;
const Moment = require("../src/");

test('Moment is not a function', t => {
    t.throws(() => Moment());
    t.notThrows(() => new Moment());
});

test('new Moment().get', t => {
    const now = new Date();
    t.throws(() => new Moment().get('dfsdfsd'));
    t.is(now.getFullYear(), +new Moment().get('year'));
    t.is(now.getMonth() + 1, +new Moment().get('month'));
    t.is(now.getDate(), +new Moment().get('date'));
    t.is(now.getHours(), +new Moment().get('hour'));
    t.is(now.getMinutes(), +new Moment().get('minute'));
});

test('Moment.get', t => {
    const now = new Date();
    t.throws(() => Moment.get('dfsdfsd',now));
    t.is(now.getFullYear(), +Moment.get('year',now));
    t.is(now.getMonth() + 1, +Moment.get('month',now));
    t.is(now.getDate(), +Moment.get('date',now));
    t.is(now.getHours(), +Moment.get('hour',now));
    t.is(now.getMinutes(), +Moment.get('minute',now));
    t.is(now.getSeconds(), +Moment.get('second',now));
    t.is(now.getMilliseconds(), +Moment.get('millisecond',now));
});

test('new Moment().set', t => {
    const now = new Date();
    t.throws(() => new Moment().set('dsfsd',1));
    t.is(new Moment(now).set('date',1).date.getTime(),new Date(now.getTime()).setDate(1));
    t.is(new Moment(now).set('month',1).date.getTime(),new Date(now.getTime()).setMonth(1));
    t.is(new Moment(now).set('year',1).date.getTime(),new Date(now.getTime()).setFullYear(1));
});

test('new Moment().format', t => {
    t.is('2016-03-30',new Moment('2016/03/30').format());    
    t.not('2016-03-30',new Moment('2016/03/31').format());    
    t.is('2016-03-30',new Moment('2016/03/30').format('yyyy-MM-dd')); 
    t.not('2016-03-30',new Moment('2016/03/31').format('yyyy-MM-dd')); 
});

test('Moment.format', t => {
    t.is('2016-03-30', Moment.format('2016/03/30'));    
    t.not('2016-03-30', Moment.format('2016/03/31'));    
    t.is('2016-03-30', Moment.format('2016/03/30')); 
    t.not('2016-03-30', Moment.format('2016/03/31')); 
});

test('new Moment().fromNow', t => {
    t.is('1小时前', new Moment().prev('hour').fromNow());
    t.is('1年前', new Moment().prev('year').fromNow());
    t.is('1月前', new Moment().prev('date',31).fromNow());
});

test('Moment.fromNow', t => {
    t.is('1小时前', Moment.fromNow(new Moment().prev('hour').date.getTime()));
    t.is('1年前', Moment.fromNow(new Moment().prev('year').date.getTime()));
    t.is('1月前', Moment.fromNow(new Moment().prev('date',31).date.getTime()));
});

test('new Moment().startOf', t => {
    t.is('2016-03-01', new Moment('2016/3/30').startOf('month').format());
    t.is('2016-01-01', new Moment('2016/3/30').startOf('year').format());
    t.is('2016-01-01', new Moment('2016/3/30').startOf('season').format());
});

test('new Moment().countDays', t => {
    t.is(29, new Moment('2016/02/01').countDays());
    t.is(28, new Moment('2015/02/01').countDays());
});

test('Moment.countDays', t => {
    t.is(29, Moment.countDays('2016/02/01'));
    t.is(28, Moment.countDays('2015/02/01'));
});

test('new Moment().next', t => {
    t.is('2016-03-31', new Moment('2016/03/30').next('date').format());
    t.is('2016-04-01', new Moment('2016/03/30').next('date',2).format());
    t.is('2016-04-30', new Moment('2016/03/30').next('month').format());
    t.is('2016-05-01', new Moment('2016/03/31').next('month').format());
    t.is('2017-03-01', new Moment('2016/02/29').next('year').format());
    t.is('2017-02-28', new Moment('2016/02/28').next('year').format());
});

test('new Moment().prev', t => {
    t.is('2016-03-29', new Moment('2016/03/30').prev('date').format());
    t.is('2016-03-28', new Moment('2016/03/30').prev('date',2).format());
    t.is('2016-03-01', new Moment('2016/03/30').prev('month').format());
    t.is('2015-03-01', new Moment('2016/02/29').prev('year').format());
    t.is('2015-02-28', new Moment('2016/02/28').prev('year').format());
});

test('new Moment().isToday', t => {
    const now = new Date();
    t.is(true,new Moment(now).isToday());
});

test('Moment.isToday', t => {
    const now = new Date();
    t.is(true,Moment.isToday(now));
});

test('Moment.isValid', t => {
    t.is(false, Moment.isValid('2016/03/30'));
    t.is(true, Moment.isValid('dsfwerwerwe'));
    t.is(true, Moment.isValid());
});