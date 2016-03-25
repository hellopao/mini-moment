(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("datetime", [], factory);
	else if(typeof exports === 'object')
		exports["datetime"] = factory();
	else
		root["datetime"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const constVlaues = __webpack_require__(1);
	const padZero = function (num) {
	    num = "" + num;
	    if (/^[0-9]$/.test(num)) {
	        return "0" + num;
	    }
	    return num;
	};
	class DateTime {
	    constructor(date) {
	        this._setDate(date);
	    }
	    _setDate(date) {
	        date = date || Date.now();
	        this.date = new Date(date);
	        if (!this.date.getTime) {
	            throw new Error('invalid date format');
	        }
	        return this;
	    }
	    isToday() {
	        return DateTime.isToday(this.date);
	    }
	    countDays() {
	        return DateTime.countDays(this.date);
	    }
	    get(type) {
	        return DateTime.get(type, this.date);
	    }
	    format(formats) {
	        formats = formats || "yyyy-MM-dd";
	        return DateTime.format(formats, this.date);
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
	        return (end - stime) / constVlaues.DAY;
	    }
	    static get(type, date) {
	        const types = Object.keys(constVlaues.FORMATS_MAP);
	        if (types.indexOf(type) === -1) {
	            throw new Error(`the argument type must be one of ${types}`);
	        }
	        return DateTime.format(constVlaues.FORMATS_MAP[type], date).replace(/^0/, '');
	    }
	    static format(formats, date) {
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
	    }
	    fromNow() {
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
	    _adjacent(type, delta) {
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
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = DateTime;


/***/ },
/* 1 */
/***/ function(module, exports) {

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


/***/ }
/******/ ])
});
;