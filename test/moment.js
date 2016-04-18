"use strict";
var ava_1 = require("ava");
var Moment = require("../src/");
ava_1["default"]('Moment is not a function', function (t) {
    t.throws(function () { return Moment(); });
    t.notThrows(function () { return new Moment(); });
});
ava_1["default"]('new Moment().get', function (t) {
    var now = new Date();
    t.throws(function () { return new Moment().get('dfsdfsd'); });
    t.is(now.getFullYear(), +new Moment().get('year'));
    t.is(now.getMonth() + 1, +new Moment().get('month'));
    t.is(now.getDate(), +new Moment().get('date'));
    t.is(now.getHours(), +new Moment().get('hour'));
    t.is(now.getMinutes(), +new Moment().get('minute'));
});
ava_1["default"]('Moment.get', function (t) {
    var now = new Date();
    t.throws(function () { return Moment.get('dfsdfsd', now); });
    t.is(now.getFullYear(), +Moment.get('year', now));
    t.is(now.getMonth() + 1, +Moment.get('month', now));
    t.is(now.getDate(), +Moment.get('date', now));
    t.is(now.getHours(), +Moment.get('hour', now));
    t.is(now.getMinutes(), +Moment.get('minute', now));
    t.is(now.getSeconds(), +Moment.get('second', now));
    t.is(now.getMilliseconds(), +Moment.get('millisecond', now));
});
ava_1["default"]('new Moment().set', function (t) {
    var now = new Date();
    t.throws(function () { return new Moment().set('dsfsd', 1); });
    t.is(new Moment(now).set('date', 1).date.getTime(), new Date(now.getTime()).setDate(1));
    t.is(new Moment(now).set('month', 1).date.getTime(), new Date(now.getTime()).setMonth(1));
    t.is(new Moment(now).set('year', 1).date.getTime(), new Date(now.getTime()).setFullYear(1));
});
ava_1["default"]('new Moment().format', function (t) {
    t.is('2016-03-30', new Moment('2016/03/30').format());
    t.not('2016-03-30', new Moment('2016/03/31').format());
    t.is('2016-03-30', new Moment('2016/03/30').format('yyyy-MM-dd'));
    t.not('2016-03-30', new Moment('2016/03/31').format('yyyy-MM-dd'));
});
ava_1["default"]('Moment.format', function (t) {
    t.is('2016-03-30', Moment.format('2016/03/30'));
    t.not('2016-03-30', Moment.format('2016/03/31'));
    t.is('2016-03-30', Moment.format('2016/03/30'));
    t.not('2016-03-30', Moment.format('2016/03/31'));
});
ava_1["default"]('new Moment().fromNow', function (t) {
    t.is('1小时前', new Moment().prev('hour').fromNow());
    t.is('1年前', new Moment().prev('year').fromNow());
    t.is('1月前', new Moment().prev('date', 31).fromNow());
});
ava_1["default"]('new Moment().startOf', function (t) {
    t.is('2016-03-01', new Moment('2016/3/30').startOf('month').format());
    t.is('2016-01-01', new Moment('2016/3/30').startOf('year').format());
    t.is('2016-01-01', new Moment('2016/3/30').startOf('season').format());
});
ava_1["default"]('new Moment().countDays', function (t) {
    t.is(29, new Moment('2016/02/01').countDays());
    t.is(28, new Moment('2015/02/01').countDays());
});
ava_1["default"]('Moment.countDays', function (t) {
    t.is(29, Moment.countDays('2016/02/01'));
    t.is(28, Moment.countDays('2015/02/01'));
});
ava_1["default"]('new Moment().next', function (t) {
    t.is('2016-03-31', new Moment('2016/03/30').next('date').format());
    t.is('2016-04-01', new Moment('2016/03/30').next('date', 2).format());
    t.is('2016-04-30', new Moment('2016/03/30').next('month').format());
    t.is('2016-05-01', new Moment('2016/03/31').next('month').format());
    t.is('2017-03-01', new Moment('2016/02/29').next('year').format());
    t.is('2017-02-28', new Moment('2016/02/28').next('year').format());
});
ava_1["default"]('new Moment().prev', function (t) {
    t.is('2016-03-29', new Moment('2016/03/30').prev('date').format());
    t.is('2016-03-28', new Moment('2016/03/30').prev('date', 2).format());
    t.is('2016-03-01', new Moment('2016/03/30').prev('month').format());
    t.is('2015-03-01', new Moment('2016/02/29').prev('year').format());
    t.is('2015-02-28', new Moment('2016/02/28').prev('year').format());
});
ava_1["default"]('new Moment().isToday', function (t) {
    var now = new Date();
    t.is(true, new Moment(now).isToday());
});
ava_1["default"]('Moment.isToday', function (t) {
    var now = new Date();
    t.is(true, Moment.isToday(now));
});
ava_1["default"]('Moment.isValid', function (t) {
    t.is(false, Moment.isValid('2016/03/30'));
    t.is(true, Moment.isValid('dsfwerwerwe'));
    t.is(true, Moment.isValid());
});
//# sourceMappingURL=moment.js.map