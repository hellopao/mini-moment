(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Moment = factory());
}(this, (function () { 'use strict';

String.prototype.padStart = String.prototype.padStart ||
    function (maxLength, fillString) {
        if (fillString === void 0) {
            fillString = ' ';
        }
        if (Object.prototype.toString.call(fillString) !== "[object String]")
            throw new TypeError('fillString must be String');
        var str = this;
        if (str.length >= maxLength)
            return String(str);
        var fillLength = maxLength - str.length, times = Math.ceil(fillLength / fillString.length);
        while (times >>= 1) {
            fillString += fillString;
            if (times === 1) {
                fillString += fillString;
            }
        }
        return fillString.slice(0, fillLength) + str;
    };
var SECOND = 1000;
var MINUTE = SECOND * 60;
var HOUR = MINUTE * 60;
var DAY = HOUR * 24;
var WEEKS = ["日", "一", "二", "三", "四", "五", "六"];
var DATE_TYPES = {
    "year": {
        get: "getFullYear",
        set: "setFullYear"
    },
    "month": {
        get: "getMonth",
        set: "setMonth"
    },
    "date": {
        get: "getDate",
        set: "setDate"
    },
    "hour": {
        get: "getHours",
        set: "setHours"
    },
    "minute": {
        get: "getMinutes",
        set: "setMinutes"
    },
    "second": {
        get: "getSeconds",
        set: "setSeconds"
    },
    "millisecond": {
        get: "getMilliSeconds",
        set: "setMilliSeconds"
    },
    "week": {
        get: "getDate",
        set: "setDate"
    }
};
var FORMATS_MAP = {
    "year": "yyyy",
    "month": "MM",
    "date": "dd",
    "hour": "hh",
    "minute": "mm",
    "second": "ss",
    "day": "w",
    "millisecond": "SSS"
};
var Moment = (function () {
    function Moment(date) {
        this._setDate(date);
    }
    Moment.prototype.isToday = function () {
        return Moment.isToday(this.date);
    };
    Moment.prototype.countDays = function () {
        return Moment.countDays(this.date);
    };
    Moment.prototype.get = function (type) {
        return Moment.get(type, this.date);
    };
    Moment.prototype.set = function (type, value) {
        if (value < 0 || Math.ceil(value) !== value) {
            throw new Error("the argument value must be a number greater than or equal to 0");
        }
        var types = Object.keys(DATE_TYPES);
        if (types.indexOf(type) === -1) {
            throw new Error("the argument type must be one of " + types);
        }
        if (["year", "month", "week", "date"].indexOf(type) > -1 && value === 0) {
            throw new Error("the argument value must be an positive integer for type " + type);
        }
        var dtype = DATE_TYPES[type];
        if (type === "week") {
            value = (value - 1) * 7;
        }
        this._setDate(this.date[dtype['set']](value));
        return this;
    };
    Moment.prototype.format = function (formats) {
        return Moment.format(this.date, formats);
    };
    Moment.isToday = function (date) {
        date = new Date(date);
        var now = new Date();
        return date.getFullYear() === now.getFullYear()
            && date.getMonth() === now.getMonth()
            && date.getDate() === now.getDate();
    };
    Moment.countDays = function (date) {
        date = new Date(date);
        var stime = new Date(date.getTime()).setDate(1);
        var start = new Date(stime);
        var end = start.setMonth(start.getMonth() + 1);
        return (end - stime) / DAY;
    };
    Moment.get = function (type, date) {
        var types = Object.keys(FORMATS_MAP);
        if (types.indexOf(type) === -1) {
            throw new Error("the argument type must be one of " + types);
        }
        return Moment.format(date, FORMATS_MAP[type]).replace(/^0/, '');
    };
    Moment.format = function (date, formats) {
        date = new Date(date);
        formats = formats || "yyyy-MM-dd";
        var d = new Date(date);
        formats = formats || "yyyy-MM-dd";
        return formats.replace(/[yY]{4}/, d.getFullYear().toString())
            .replace(/M{2}/, (d.getMonth() + 1).toString().padStart(2, '0'))
            .replace(/d{2}/, d.getDate().toString().padStart(2, '0'))
            .replace(/h{2}/, d.getHours().toString().padStart(2, '0'))
            .replace(/m{2}/, d.getMinutes().toString().padStart(2, '0'))
            .replace(/s{2}/, d.getSeconds().toString().padStart(2, '0'))
            .replace(/S{3}/, d.getMilliseconds().toString().padStart(3, '0'))
            .replace(/w/, WEEKS[d.getDay()]);
    };
    Moment.isValid = function (date) {
        return isNaN(new Date(date).getTime());
    };
    Moment.fromNow = function (date) {
        date = new Date(date);
        return new Moment(date).fromNow();
    };
    Moment.prototype.fromNow = function () {
        var now = new Date();
        var delta = now.getTime() - this.date.getTime();
        var deltaStr = delta > 0 ? "前" : "后";
        delta = Math.abs(delta);
        var year = Math.floor(delta / (DAY * 365));
        if (year >= 1 && now.getFullYear() !== this.date.getFullYear()) {
            return year + "\u5E74" + deltaStr;
        }
        var month = Math.floor(delta / (DAY * 30));
        if (month >= 1 && now.getMonth() !== this.date.getMonth()) {
            return month + "\u6708" + deltaStr;
        }
        var day = Math.floor(delta / DAY);
        if (day >= 1) {
            return day + "\u5929" + deltaStr;
        }
        var hour = Math.floor(delta * 24 / DAY);
        if (hour >= 1) {
            return hour + "\u5C0F\u65F6" + deltaStr;
        }
        var minute = Math.floor(delta * 24 * 60 / DAY);
        if (minute >= 1) {
            return minute + "\u5206\u949F" + deltaStr;
        }
        var second = delta * 24 * 60 * 60 / DAY;
        if (second >= 1) {
            return second + "\u79D2" + deltaStr;
        }
    };
    Moment.prototype.next = function (type, delta) {
        delta = delta || 1;
        if (typeof delta !== "number") {
            throw new Error('argument delta must be a number');
        }
        this._adjacent(type, delta);
        return this;
    };
    Moment.prototype.prev = function (type, delta) {
        delta = delta || 1;
        if (typeof delta !== "number") {
            throw new Error('argument delta must be a number');
        }
        this._adjacent(type, -1 * delta);
        return this;
    };
    Moment.prototype.startOf = function (type) {
        if (type === "year") {
            this._setDate(this.format('yyyy/01/01'));
        }
        else if (type === "month") {
            this._setDate(this.format('yyyy/MM/01'));
        }
        else if (type === "season") {
            this._setDate(this.format("yyyy/" + (Math.floor((+this.get('month') - 1) / 3) * 3 + 1) + "/01"));
        }
        else if (type === "week") {
            this._setDate(this.prev("date", +this.get('day')).format('yyyy/MM/dd'));
        }
        else if (type === "date") {
            this._setDate(this.format('yyyy/MM/dd 00:00'));
        }
        else if (type === "hour") {
            this._setDate(this.format('yyyy/MM/dd hh:00'));
        }
        else if (type === "minute") {
            this._setDate(this.format('yyyy/MM/dd hh:mm:00'));
        }
        return this;
    };
    Moment.prototype._setDate = function (date) {
        date = date || Date.now();
        this.date = new Date(date);
        if (Moment.isValid(this.date)) {
            throw new Error('invalid date format');
        }
        return this;
    };
    Moment.prototype._adjacent = function (type, delta) {
        var types = Object.keys(DATE_TYPES);
        if (types.indexOf(type) === -1) {
            throw new Error("the argument type must be one of " + types);
        }
        var dtype = DATE_TYPES[type];
        if (type === "week") {
            delta *= 7;
        }
        this._setDate(this.date[dtype['set']](this.date[dtype['get']]() + delta));
    };
    Moment.prototype.valueOf = function () {
        return +this.date;
    };
    Moment.prototype.toString = function () {
        return this.date.toString();
    };
    return Moment;
}());

return Moment;

})));
