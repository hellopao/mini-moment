"use strict";

import * as constVlaues from "./constants";

const padZero = function (num) {
    num = "" + num;
    if (/^[0-9]$/.test(num)) {
        return "0" + num;
    }

    return num;
}

export default class Moment {

    date: Date;

    constructor(date?: string | number) {
        this._setDate(date);
    }

    /**
     * compare the date with today
     */
    isToday(): boolean {
        return Moment.isToday(this.date);
    }

    /**
     * count days in month
     */
    countDays(): number {
        return Moment.countDays(this.date);
    }

    /**
     * get datestr by type
     */
    get(type:string): string {
        return Moment.get(type, this.date);
    }
    
    /**
     * get datestr by type
     */
    set(type:string, value: number): Moment {
        if (value < 0 || Math.ceil(value) !== value) {
            throw new Error(`the argument value must be a number greater than or equal to 0`);
        }
        
        const types = Object.keys(constVlaues.DATE_TYPES);

        if (types.indexOf(type) === -1) {
            throw new Error(`the argument type must be one of ${types}`);
        }
        
        if (["year","month","week","date"].indexOf(type) > -1 && value === 0) {
            throw new Error(`the argument value must be an positive integer for type ${type}`);
        }
        
        const dtype = constVlaues.DATE_TYPES[type];

        if (type === "week") {
            value = (value - 1) * 7;    
        }
        
        this._setDate(this.date[dtype['set']](value));
        
        return this;
    }

    /**
     * format date
     */
    format(formats?: string): string {
        formats = formats || "yyyy-MM-dd";
        return Moment.format(formats, this.date);
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

        return Moment.format(constVlaues.FORMATS_MAP[type], date).replace(/^0/, '');
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
        delta = Math.abs(delta);

        const year = Math.floor(delta / (constVlaues.DAY * 365));
        if (year >= 1 && now.getFullYear() !== this.date.getFullYear()) {
            return `${year}年${deltaStr}`;
        }

        const month = Math.floor(delta / (constVlaues.DAY * 30));
        if (month >= 1 && now.getMonth() !== this.date.getMonth()) {
            return `${month}月${deltaStr}`;
        }

        const day = Math.floor(delta / constVlaues.DAY);
        if (day >= 1) {
            return `${day}天${deltaStr}`;
        }

        const hour = Math.floor(delta * 24 / constVlaues.DAY);
        if (hour >= 1) {
            return `${hour}小时${deltaStr}`;
        }

        const minute = Math.floor(delta * 24 * 60 / constVlaues.DAY);
        if (minute >= 1) {
            return `${minute}分钟${deltaStr}`;
        }

        const second = delta * 24 * 60 * 60 / constVlaues.DAY;
        if (second >= 1) {
            return `${second}秒${deltaStr}`;
        }
    }

    /**
     * get next date
     */
    next(type: string, delta?: number): Moment {
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
    prev(type: string, delta?: number): Moment {
        delta = delta || 1;

        if (typeof delta !== "number") {
            throw new Error('argument delta must be a number');
        }

        this._adjacent(type, -1 * delta);

        return this;
    }
    
    /**
     * first of the time unit
     */
    startOf(type: string): Moment {
        if (type === "year") {
            this._setDate(this.format('yyyy/01/01'));
        } else if (type === "month") {
            this._setDate(this.format('yyyy/MM/01'));
        } else if (type === "season") {
            this._setDate(this.format(`yyyy/${Math.floor((+this.get('month') - 1) / 3) * 3 + 1}/01`));
        } else if (type === "week") {
            this._setDate(this.prev("date",+this.get('day')).format('yyyy/MM/dd'));
        } else if (type === "date") {
            this._setDate(this.format('yyyy/MM/dd 00:00'));
        } else if (type === "hour") {
            this._setDate(this.format('yyyy/MM/dd hh:00'));
        } else if (type === "minute") {
            this._setDate(this.format('yyyy/MM/dd hh:mm:00'))
        }
        return this;
    }

    _setDate(date?): Moment {
        date = date || Date.now();

        this.date = new Date(date);

        if (!this.date.getTime) {
            throw new Error('invalid date format');
        }
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

    valueOf(): number {
        return +this.date;
    }

    toString(): string {
        return this.date.toString();
    }
}
