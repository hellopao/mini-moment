"use strict";

import * as constVlaues from "./constants";

const padZero = function(num) {
    num = "" + num;
    if (/^[0-9]$/.test(num)) {
        return "0" + num;
    }

    return num;
}

export default class DateTime {

    date: Date;

    constructor(date?: string | number) {
        this._setDate(date);
    }

    _setDate(date?): DateTime {
        date = date || Date.now();

        this.date = new Date(date);

        if (!this.date.getTime) {
            throw new Error('invalid date format');
        }
        return this;
    }

    /**
     * compare the date with today
     */
    isToday(): boolean {
        return DateTime.isToday(this.date);
    }

    /**
     * count days in month
     */
    countDays(): number {
        return DateTime.countDays(this.date);
    }

    /**
     * get datestr by type
     */
    get(type): string {
        return DateTime.get(type, this.date);
    }

    /**
     * format date
     */
    format(formats?: string): string {
        formats = formats || "yyyy-MM-dd";
        return DateTime.format(formats, this.date);
    }
    
    /**
     * static func : compare the date with today
     */
    static isToday(date): boolean {
        date = new Date(date);

        const now = new Date();

        return date.getFullYear() === now.getFullYear()
            && date.getMonth() === now.getMonth()
            && date.getDate() === now.getDate();
    }
    
    /**
     * sttic func : count days in month
     */
    static countDays(date): number {
        date = new Date(date);

        let stime = new Date(date.getTime()).setDate(1);
        let start = new Date(stime);
        let end = start.setMonth(start.getMonth() + 1);

        return (end - stime) / constVlaues.DAY;
    }

    /**
     * static func : get datestr by type
     */
    static get(type, date): string {

        const types = Object.keys(constVlaues.FORMATS_MAP);

        if (types.indexOf(type) === -1) {
            throw new Error(`the argument type must be one of ${types}`);
        }

        return DateTime.format(constVlaues.FORMATS_MAP[type], date).replace(/^0/, '');
    }

    /**
     * static func : format date
     */
    static format(formats, date): string {
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
            .replace(/w/, constVlaues.WEEKS[date.getDay()])
    }

    /**
     * cal delta time str from now
     */
    fromNow(): string {
        let now = new Date();
        let delta = now.getTime() - this.date.getTime();
        let deltaStr = delta > 0 ? "前" : "后";

        const year = Math.floor(delta / (constVlaues.DAY * 365));
        if (Math.abs(year) > 1 && now.getFullYear() !== this.date.getFullYear()) {
            return `${year}年${deltaStr}`;
        }

        const month = Math.floor(delta / (constVlaues.DAY * 30));
        if (Math.abs(month) > 1 && now.getMonth() !== this.date.getMonth()) {
            return `${month}月${deltaStr}`;
        }

        const day = Math.floor(delta / constVlaues.DAY);
        if (Math.abs(day) > 1) {
            return `${day}天${deltaStr}`;
        }

        const hour = Math.floor(delta * 24 / constVlaues.DAY);
        if (Math.abs(hour) > 1) {
            return `${hour}小时${deltaStr}`;
        }

        const minute = Math.floor(delta * 24 * 60 / constVlaues.DAY);
        if (Math.abs(minute) > 1) {
            return `${minute}分钟${deltaStr}`;
        }

        const second = delta * 24 * 60 * 60 / constVlaues.DAY;
        if (Math.abs(second) > 1) {
            return `${second}秒${deltaStr}`;
        }
    }

    /**
     * get next date
     */
    next(type: string, delta?: number) {
        delta = delta || 1;

        if (typeof delta !== "number") {
            throw new Error('argument delta must be a number');
        }

        this._adjacent(type, delta);

        return this;
    }

    /**
     * get prev date
     */
    prev(type: string, delta?: number) {
        delta = delta || 1;

        if (typeof delta !== "number") {
            throw new Error('argument delta must be a number');
        }

        this._adjacent(type, -1 * delta);

        return this;
    }

    _adjacent(type: string, delta: number) {

        const types = Object.keys(constVlaues.DATE_TYPES);

        if (types.indexOf(type) === -1) {
            throw new Error(`the argument type must be one of ${types}`);
        }

        const dtype = constVlaues.DATE_TYPES[type];

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
