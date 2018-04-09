(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.Moment = {})));
}(this, (function (exports) { 'use strict';

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
const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;
const WEEKS = ["日", "一", "二", "三", "四", "五", "六"];
const DATE_TYPES = {
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
const FORMATS_MAP = {
    "year": "yyyy",
    "month": "MM",
    "date": "dd",
    "hour": "hh",
    "minute": "mm",
    "second": "ss",
    "day": "w",
    "millisecond": "SSS"
};
class Moment {
    constructor(date) {
        this._setDate(date);
    }
    isToday() {
        return Moment.isToday(this.date);
    }
    countDays() {
        return Moment.countDays(this.date);
    }
    get(type) {
        return Moment.get(type, this.date);
    }
    set(type, value) {
        if (value < 0 || Math.ceil(value) !== value) {
            throw new Error(`the argument value must be a number greater than or equal to 0`);
        }
        const types = Object.keys(DATE_TYPES);
        if (types.indexOf(type) === -1) {
            throw new Error(`the argument type must be one of ${types}`);
        }
        if (["year", "month", "week", "date"].indexOf(type) > -1 && value === 0) {
            throw new Error(`the argument value must be an positive integer for type ${type}`);
        }
        const dtype = DATE_TYPES[type];
        if (type === "week") {
            value = (value - 1) * 7;
        }
        this._setDate(this.date[dtype['set']](value));
        return this;
    }
    format(formats) {
        return Moment.format(this.date, formats);
    }
    static isToday(date) {
        date = new Date(date);
        const now = new Date();
        return date.getFullYear() === now.getFullYear()
            && date.getMonth() === now.getMonth()
            && date.getDate() === now.getDate();
    }
    static countDays(date) {
        date = new Date(date);
        let stime = new Date(date.getTime()).setDate(1);
        let start = new Date(stime);
        let end = start.setMonth(start.getMonth() + 1);
        return (end - stime) / DAY;
    }
    static get(type, date) {
        const types = Object.keys(FORMATS_MAP);
        if (types.indexOf(type) === -1) {
            throw new Error(`the argument type must be one of ${types}`);
        }
        return Moment.format(date, FORMATS_MAP[type]).replace(/^0/, '');
    }
    static format(date, formats) {
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
    }
    static isValid(date) {
        return isNaN(new Date(date).getTime());
    }
    static fromNow(date) {
        date = new Date(date);
        return new Moment(date).fromNow();
    }
    fromNow() {
        let now = new Date();
        let delta = now.getTime() - this.date.getTime();
        let deltaStr = delta > 0 ? "前" : "后";
        delta = Math.abs(delta);
        const year = Math.floor(delta / (DAY * 365));
        if (year >= 1 && now.getFullYear() !== this.date.getFullYear()) {
            return `${year}年${deltaStr}`;
        }
        const month = Math.floor(delta / (DAY * 30));
        if (month >= 1 && now.getMonth() !== this.date.getMonth()) {
            return `${month}月${deltaStr}`;
        }
        const day = Math.floor(delta / DAY);
        if (day >= 1) {
            return `${day}天${deltaStr}`;
        }
        const hour = Math.floor(delta * 24 / DAY);
        if (hour >= 1) {
            return `${hour}小时${deltaStr}`;
        }
        const minute = Math.floor(delta * 24 * 60 / DAY);
        if (minute >= 1) {
            return `${minute}分钟${deltaStr}`;
        }
        const second = delta * 24 * 60 * 60 / DAY;
        if (second >= 1) {
            return `${second}秒${deltaStr}`;
        }
    }
    next(type, delta) {
        delta = delta || 1;
        if (typeof delta !== "number") {
            throw new Error('argument delta must be a number');
        }
        this._adjacent(type, delta);
        return this;
    }
    prev(type, delta) {
        delta = delta || 1;
        if (typeof delta !== "number") {
            throw new Error('argument delta must be a number');
        }
        this._adjacent(type, -1 * delta);
        return this;
    }
    startOf(type) {
        if (type === "year") {
            this._setDate(this.format('yyyy/01/01'));
        }
        else if (type === "month") {
            this._setDate(this.format('yyyy/MM/01'));
        }
        else if (type === "season") {
            this._setDate(this.format(`yyyy/${Math.floor((+this.get('month') - 1) / 3) * 3 + 1}/01`));
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
    }
    _setDate(date) {
        date = date || Date.now();
        this.date = new Date(date);
        if (Moment.isValid(this.date)) {
            throw new Error('invalid date format');
        }
        return this;
    }
    _adjacent(type, delta) {
        const types = Object.keys(DATE_TYPES);
        if (types.indexOf(type) === -1) {
            throw new Error(`the argument type must be one of ${types}`);
        }
        const dtype = DATE_TYPES[type];
        if (type === "week") {
            delta *= 7;
        }
        this._setDate(this.date[dtype['set']](this.date[dtype['get']]() + delta));
    }
    valueOf() {
        return +this.date;
    }
    toString() {
        return this.date.toString();
    }
}
const version = "1.0.0";

exports['default'] = Moment;
exports.version = version;

Object.defineProperty(exports, '__esModule', { value: true });

})));
