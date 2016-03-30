"use strict";
var constVlaues = require("./constants");
var padZero = function (num) {
    num = "" + num;
    if (/^[0-9]$/.test(num)) {
        return "0" + num;
    }
    return num;
};
var Moment = (function () {
    function Moment(date) {
        this._setDate(date);
    }
    /**
     * compare the date with today
     */
    Moment.prototype.isToday = function () {
        return Moment.isToday(this.date);
    };
    /**
     * count days in month
     */
    Moment.prototype.countDays = function () {
        return Moment.countDays(this.date);
    };
    /**
     * get datestr by type
     */
    Moment.prototype.get = function (type) {
        return Moment.get(type, this.date);
    };
    /**
     * get datestr by type
     */
    Moment.prototype.set = function (type, value) {
        if (value < 0 || Math.ceil(value) !== value) {
            throw new Error("the argument value must be a number greater than or equal to 0");
        }
        var types = Object.keys(constVlaues.DATE_TYPES);
        if (types.indexOf(type) === -1) {
            throw new Error("the argument type must be one of " + types);
        }
        if (["year", "month", "week", "date"].indexOf(type) > -1 && value === 0) {
            throw new Error("the argument value must be an positive integer for type " + type);
        }
        var dtype = constVlaues.DATE_TYPES[type];
        if (type === "week") {
            value = (value - 1) * 7;
        }
        this._setDate(this.date[dtype['set']](value));
        return this;
    };
    /**
     * format date
     */
    Moment.prototype.format = function (formats) {
        return Moment.format(this.date, formats);
    };
    /**
     * static func : compare the date with today
     */
    Moment.isToday = function (date) {
        date = new Date(date);
        var now = new Date();
        return date.getFullYear() === now.getFullYear()
            && date.getMonth() === now.getMonth()
            && date.getDate() === now.getDate();
    };
    /**
     * sttic func : count days in month
     */
    Moment.countDays = function (date) {
        date = new Date(date);
        var stime = new Date(date.getTime()).setDate(1);
        var start = new Date(stime);
        var end = start.setMonth(start.getMonth() + 1);
        return (end - stime) / constVlaues.DAY;
    };
    /**
     * static func : get datestr by type
     */
    Moment.get = function (type, date) {
        var types = Object.keys(constVlaues.FORMATS_MAP);
        if (types.indexOf(type) === -1) {
            throw new Error("the argument type must be one of " + types);
        }
        return Moment.format(date, constVlaues.FORMATS_MAP[type]).replace(/^0/, '');
    };
    /**
     * static func : format date
     */
    Moment.format = function (date, formats) {
        date = new Date(date);
        formats = formats || "yyyy-MM-dd";
        return formats.replace(/[yY]{4}/, date.getFullYear())
            .replace(/M{2}/, padZero(date.getMonth() + 1))
            .replace(/d{2}/, padZero(date.getDate()))
            .replace(/h{2}/, padZero(date.getHours()))
            .replace(/m{2}/, padZero(date.getMinutes()))
            .replace(/s{2}/, padZero(date.getSeconds()))
            .replace(/w/, constVlaues.WEEKS[date.getDay()]);
    };
    /**
     * validate a date
     */
    Moment.isValid = function (date) {
        return isNaN(new Date(date).getTime());
    };
    /**
     * cal delta time str from now
     */
    Moment.prototype.fromNow = function () {
        var now = new Date();
        var delta = now.getTime() - this.date.getTime();
        var deltaStr = delta > 0 ? "前" : "后";
        delta = Math.abs(delta);
        var year = Math.floor(delta / (constVlaues.DAY * 365));
        if (year >= 1 && now.getFullYear() !== this.date.getFullYear()) {
            return year + "\u5E74" + deltaStr;
        }
        var month = Math.floor(delta / (constVlaues.DAY * 30));
        if (month >= 1 && now.getMonth() !== this.date.getMonth()) {
            return month + "\u6708" + deltaStr;
        }
        var day = Math.floor(delta / constVlaues.DAY);
        if (day >= 1) {
            return day + "\u5929" + deltaStr;
        }
        var hour = Math.floor(delta * 24 / constVlaues.DAY);
        if (hour >= 1) {
            return hour + "\u5C0F\u65F6" + deltaStr;
        }
        var minute = Math.floor(delta * 24 * 60 / constVlaues.DAY);
        if (minute >= 1) {
            return minute + "\u5206\u949F" + deltaStr;
        }
        var second = delta * 24 * 60 * 60 / constVlaues.DAY;
        if (second >= 1) {
            return second + "\u79D2" + deltaStr;
        }
    };
    /**
     * get next date
     */
    Moment.prototype.next = function (type, delta) {
        delta = delta || 1;
        if (typeof delta !== "number") {
            throw new Error('argument delta must be a number');
        }
        this._adjacent(type, delta);
        return this;
    };
    /**
     * get prev date
     */
    Moment.prototype.prev = function (type, delta) {
        delta = delta || 1;
        if (typeof delta !== "number") {
            throw new Error('argument delta must be a number');
        }
        this._adjacent(type, -1 * delta);
        return this;
    };
    /**
     * first of the time unit
     */
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
        var types = Object.keys(constVlaues.DATE_TYPES);
        if (types.indexOf(type) === -1) {
            throw new Error("the argument type must be one of " + types);
        }
        var dtype = constVlaues.DATE_TYPES[type];
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
exports.__esModule = true;
exports["default"] = Moment;
//# sourceMappingURL=index.js.map