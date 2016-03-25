"use strict";
exports.SECOND = 1000;
exports.MINUTE = exports.SECOND * 60;
exports.HOUR = exports.MINUTE * 60;
exports.DAY = exports.HOUR * 24;
exports.WEEKS = ["日", "一", "二", "三", "四", "五", "六"];
exports.DATE_TYPES = {
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
    "week": {
        get: "getDate",
        set: "setDate"
    }
};
exports.FORMATS_MAP = {
    "year": "yyyy",
    "month": "MM",
    "date": "dd",
    "hour": "hh",
    "minute": "mm",
    "second": "ss",
    "day": "w"
};
//# sourceMappingURL=constants.js.map