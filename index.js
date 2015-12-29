"use strict";

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

const weeks = {
    'en': ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],
    'ch': ["日","一","二","三","四","五","六"]
};

const typeMap = {
    "year" : {
        get: "getFullYear",
        set: "setFullYear"
    },
    "month" : {
        get: "getMonth",
        set: "setMonth"
    },
    "date" : {
        get: "getDate",
        set: "setDate"
    },
    "hour" : {
        get: "getHours",
        set: "setHours"
    },
    "minute" : {
        get: "getMinutes",
        set: "setMinutes"
    },
    "second" : {
        get: "getSeconds",
        set: "setSeconds"
    },
    "week" : {
        get: "getDate",
        set: "setDate"
    }
};

const padZero = function(num) {
    num = "" + num;
    if (/^[0-9]$/.test(num)) {
        return "0" + num;
    }   
    
    return num; 
}

class DateTime {
    
    constructor (date,opts) {
        opts = opts || {};
        this._lang = opts.lang || "ch";
        
        this._setDate(date);
    }
    
    _setDate (date) {
        date = date || Date.now();
        
        this.date = new Date(date);
        
        if (!this.date.getTime()) {
            throw new Error('invalid date format');
        }
        return this;
    }
    
    /**
     * compare the date with today
     */
    isToday (date) {
        date && this._setDate(date);
        
        const now = new Date();
        
        return this.date.getFullYear() === now.getFullYear() 
            && this.date.getMonth() === now.getMonth()
            && this.date.getDate() === now.getDate();
    }
    
    /**
     * get date by type
     */
    get (type,date) {
        const typeMap = {
            "year": "yyyy",
            "month": "MM",
            "date": "dd",
            "hour": "hh",
            "minute": "mm",
            "second": "ss",
            "day": "w"
        };
        
        const types = Object.keys(typeMap);
        
        if (types.indexOf(type) === -1) {
            throw new Error(`the argument type must be one of ${types}`);
        }
        
        return this.format(typeMap[type],date).replace(/^0/,'');
    }
    
    /**
     * count days in month
     */
    countDays (date) {
        date && this._setDate(date);
        
        let stime = new Date(this.date).setDate(1);
        let start = new Date(stime);
        let end = start.setMonth(start.getMonth() + 1);
        
        return (end - stime) / day; 
    }
    
    /**
     * format date
     */
    format (formats,date) {
        formats = formats || "yyyy-MM-dd";
        
        if (typeof formats !== "string") {
            throw new Error('argument formats must be a string');
        }
        
        date && this._setDate(date);            
        
        return formats.replace(/[yY]{4}/,this.date.getFullYear())
            .replace(/M{2}/,padZero(this.date.getMonth() + 1))
            .replace(/d{2}/,padZero(this.date.getDate()))
            .replace(/h{2}/,padZero(this.date.getHours()))
            .replace(/m{2}/,padZero(this.date.getMinutes()))
            .replace(/s{2}/,padZero(this.date.getSeconds()))
            .replace(/w/,weeks[this._lang][this.date.getDay()])
    }
    
    /**
     * cal delta time str from now
     */
    fromNow () {
        let now = new Date();
        let delta = now - this.date;
        let deltaStr = delta > 0 ? "前" : "后";
       
        const year = Math.floor(delta / (day * 365));
        if (Math.abs(year) > 1 && now.getFullYear() !== this.date.getFullYear()) {
            return `${year}年${deltaStr}`;
        }
        
        const month = Math.floor(delta / (day * 30));
        if (Math.abs(month) > 1 && now.getMonth() !== this.date.getMonth()) {
            return `${month}月${deltaStr}`;
        }
        
        const day = Math.floor(delta / day);
        if (Math.abs(day) > 1) {
            return `${day}天${deltaStr}`;
        }
        
        const hour = Math.floor(delta * 24 / day);
        if (Math.abs(hour) > 1) {
            return `${hour}小时${deltaStr}`;
        }
        
        const minute = Math.floor(delta * 24 * 60 / day);
        if (Math.abs(minute) > 1) {
            return `${minute}分钟${deltaStr}`;
        }
        
        const second = delta * 24 * 60 * 60 / day;
        if (Math.abs(second) > 1) {
            return `${second}秒${deltaStr}`;
        }
    }
    
    /**
     * get next date
     */
    next (type, delta) {        
        delta = delta || 1;
        
        if (typeof delta !== "number") {
            throw new Error('argument delta must be a number');
        }
        
        this._adjacent(type,delta);
        
        return this;
    }
    
    /**
     * get prev date
     */
    prev (type, delta) {
        delta = delta || 1;
        
        if (typeof delta !== "number") {
            throw new Error('argument delta must be a number');
        }
        
        this._adjacent(type, -1 * delta);
        
        return this;
    }
    
    _adjacent (type, delta) {
         
        const types = Object.keys(typeMap);
        
        if (types.indexOf(type) === -1) {
            throw new Error(`the argument type must be one of ${types}`);
        }
        
        const dtype = typeMap[type];
        
        if (type === "week") {
            delta *= 7;
        }
        
        this._setDate(this.date[dtype['set']](this.date[dtype['get']]() + delta));
    }
    
    valueOf () {
        return +this.date;
    }
    
    toString () {
        return this.date.toString();
    }
}

module.exports = DateTime;