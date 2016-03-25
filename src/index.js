"use strict";
var constVlaues = require("./constants");
var padZero = function (num) {
    num = "" + num;
    if (/^[0-9]$/.test(num)) {
        return "0" + num;
    }
    return num;
};
var DateTime = (function () {
    function DateTime(date) {
        this._setDate(date);
    }
    DateTime.prototype._setDate = function (date) {
        date = date || Date.now();
        this.date = new Date(date);
        if (!this.date.getTime) {
            throw new Error('invalid date format');
        }
        return this;
    };
    /**
     * compare the date with today
     */
    DateTime.prototype.isToday = function () {
        return DateTime.isToday(this.date);
    };
    /**
     * count days in month
     */
    DateTime.prototype.countDays = function () {
        return DateTime.countDays(this.date);
    };
    /**
     * get datestr by type
     */
    DateTime.prototype.get = function (type) {
        return DateTime.get(type, this.date);
    };
    /**
     * format date
     */
    DateTime.prototype.format = function (formats) {
        formats = formats || "yyyy-MM-dd";
        return DateTime.format(formats, this.date);
    };
    /**
     * static func : compare the date with today
     */
    DateTime.isToday = function (date) {
        date = new Date(date);
        var now = new Date();
        return date.getFullYear() === now.getFullYear()
            && date.getMonth() === now.getMonth()
            && date.getDate() === now.getDate();
    };
    /**
     * sttic func : count days in month
     */
    DateTime.countDays = function (date) {
        date = new Date(date);
        var stime = new Date(date.getTime()).setDate(1);
        var start = new Date(stime);
        var end = start.setMonth(start.getMonth() + 1);
        return (end - stime) / constVlaues.DAY;
    };
    /**
     * static func : get datestr by type
     */
    DateTime.get = function (type, date) {
        var types = Object.keys(constVlaues.FORMATS_MAP);
        if (types.indexOf(type) === -1) {
            throw new Error("the argument type must be one of " + types);
        }
        return DateTime.format(constVlaues.FORMATS_MAP[type], date).replace(/^0/, '');
    };
    /**
     * static func : format date
     */
    DateTime.format = function (formats, date) {
        if (typeof formats !== "string") {
            throw new Error('argument formats must be a string');
        }
        date = new Date(date);
        return formats.replace(/[yY]{4}/, date.getFullYear())
            .replace(/M{2}/, padZero(date.getMonth() + 1))
            .replace(/d{2}/, padZero(date.getDate()))
            .replace(/h{2}/, padZero(date.getHours()))
            .replace(/m{2}/, padZero(date.getMinutes()))
            .replace(/s{2}/, padZero(date.getSeconds()))
            .replace(/w/, constVlaues.WEEKS[date.getDay()]);
    };
    /**
     * cal delta time str from now
     */
    DateTime.prototype.fromNow = function () {
        var now = new Date();
        var delta = now.getTime() - this.date.getTime();
        var deltaStr = delta > 0 ? "前" : "后";
        var year = Math.floor(delta / (constVlaues.DAY * 365));
        if (Math.abs(year) > 1 && now.getFullYear() !== this.date.getFullYear()) {
            return year + "\u5E74" + deltaStr;
        }
        var month = Math.floor(delta / (constVlaues.DAY * 30));
        if (Math.abs(month) > 1 && now.getMonth() !== this.date.getMonth()) {
            return month + "\u6708" + deltaStr;
        }
        var day = Math.floor(delta / constVlaues.DAY);
        if (Math.abs(day) > 1) {
            return day + "\u5929" + deltaStr;
        }
        var hour = Math.floor(delta * 24 / constVlaues.DAY);
        if (Math.abs(hour) > 1) {
            return hour + "\u5C0F\u65F6" + deltaStr;
        }
        var minute = Math.floor(delta * 24 * 60 / constVlaues.DAY);
        if (Math.abs(minute) > 1) {
            return minute + "\u5206\u949F" + deltaStr;
        }
        var second = delta * 24 * 60 * 60 / constVlaues.DAY;
        if (Math.abs(second) > 1) {
            return second + "\u79D2" + deltaStr;
        }
    };
    /**
     * get next date
     */
    DateTime.prototype.next = function (type, delta) {
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
    DateTime.prototype.prev = function (type, delta) {
        delta = delta || 1;
        if (typeof delta !== "number") {
            throw new Error('argument delta must be a number');
        }
        this._adjacent(type, -1 * delta);
        return this;
    };
    DateTime.prototype._adjacent = function (type, delta) {
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
    DateTime.prototype.valueOf = function () {
        return +this.date;
    };
    DateTime.prototype.toString = function () {
        return this.date.toString();
    };
    return DateTime;
}());
exports.__esModule = true;
exports["default"] = DateTime;
//# sourceMappingURL=index.js.map