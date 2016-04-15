"use strict";

export const SECOND = 1000;
export const MINUTE = SECOND * 60;
export const HOUR = MINUTE * 60;
export const DAY = HOUR * 24;

export const WEEKS = ["日","一","二","三","四","五","六"];

export const DATE_TYPES = {
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
    "millisecond" : {
        get: "getMilliSeconds",
        set: "setMilliSeconds"
    },
    "week" : {
        get: "getDate",
        set: "setDate"
    }
};

export const FORMATS_MAP = {
    "year": "yyyy",
    "month": "MM",
    "date": "dd",
    "hour": "hh",
    "minute": "mm",
    "second": "ss",
    "day": "w",
    "millisecond": "SSS"
};
