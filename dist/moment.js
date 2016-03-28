(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("moment", [], factory);
	else if(typeof exports === 'object')
		exports["moment"] = factory();
	else
		root["moment"] = factory();
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

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var constVlaues = __webpack_require__(1);
	var padZero = function padZero(num) {
	    num = "" + num;
	    if (/^[0-9]$/.test(num)) {
	        return "0" + num;
	    }
	    return num;
	};

	var Moment = function () {
	    function Moment(date) {
	        _classCallCheck(this, Moment);

	        this._setDate(date);
	    }

	    _createClass(Moment, [{
	        key: "isToday",
	        value: function isToday() {
	            return Moment.isToday(this.date);
	        }
	    }, {
	        key: "countDays",
	        value: function countDays() {
	            return Moment.countDays(this.date);
	        }
	    }, {
	        key: "get",
	        value: function get(type) {
	            return Moment.get(type, this.date);
	        }
	    }, {
	        key: "set",
	        value: function set(type, value) {
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
	        }
	    }, {
	        key: "format",
	        value: function format(formats) {
	            formats = formats || "yyyy-MM-dd";
	            return Moment.format(formats, this.date);
	        }
	    }, {
	        key: "fromNow",
	        value: function fromNow() {
	            var now = new Date();
	            var delta = now.getTime() - this.date.getTime();
	            var deltaStr = delta > 0 ? "前" : "后";
	            delta = Math.abs(delta);
	            var year = Math.floor(delta / (constVlaues.DAY * 365));
	            if (year >= 1 && now.getFullYear() !== this.date.getFullYear()) {
	                return year + "年" + deltaStr;
	            }
	            var month = Math.floor(delta / (constVlaues.DAY * 30));
	            if (month >= 1 && now.getMonth() !== this.date.getMonth()) {
	                return month + "月" + deltaStr;
	            }
	            var day = Math.floor(delta / constVlaues.DAY);
	            if (day >= 1) {
	                return day + "天" + deltaStr;
	            }
	            var hour = Math.floor(delta * 24 / constVlaues.DAY);
	            if (hour >= 1) {
	                return hour + "小时" + deltaStr;
	            }
	            var minute = Math.floor(delta * 24 * 60 / constVlaues.DAY);
	            if (minute >= 1) {
	                return minute + "分钟" + deltaStr;
	            }
	            var second = delta * 24 * 60 * 60 / constVlaues.DAY;
	            if (second >= 1) {
	                return second + "秒" + deltaStr;
	            }
	        }
	    }, {
	        key: "next",
	        value: function next(type, delta) {
	            delta = delta || 1;
	            if (typeof delta !== "number") {
	                throw new Error('argument delta must be a number');
	            }
	            this._adjacent(type, delta);
	            return this;
	        }
	    }, {
	        key: "prev",
	        value: function prev(type, delta) {
	            delta = delta || 1;
	            if (typeof delta !== "number") {
	                throw new Error('argument delta must be a number');
	            }
	            this._adjacent(type, -1 * delta);
	            return this;
	        }
	    }, {
	        key: "startOf",
	        value: function startOf(type) {
	            if (type === "year") {
	                this._setDate(this.format('yyyy/01/01'));
	            } else if (type === "month") {
	                this._setDate(this.format('yyyy/MM/01'));
	            } else if (type === "season") {
	                this._setDate(this.format("yyyy/" + (Math.floor((+this.get('month') - 1) / 3) * 3 + 1) + "/01"));
	            } else if (type === "week") {
	                this._setDate(this.prev("date", +this.get('day')).format('yyyy/MM/dd'));
	            } else if (type === "date") {
	                this._setDate(this.format('yyyy/MM/dd 00:00'));
	            } else if (type === "hour") {
	                this._setDate(this.format('yyyy/MM/dd hh:00'));
	            } else if (type === "minute") {
	                this._setDate(this.format('yyyy/MM/dd hh:mm:00'));
	            }
	            return this;
	        }
	    }, {
	        key: "_setDate",
	        value: function _setDate(date) {
	            date = date || Date.now();
	            this.date = new Date(date);
	            if (!this.date.getTime) {
	                throw new Error('invalid date format');
	            }
	            return this;
	        }
	    }, {
	        key: "_adjacent",
	        value: function _adjacent(type, delta) {
	            var types = Object.keys(constVlaues.DATE_TYPES);
	            if (types.indexOf(type) === -1) {
	                throw new Error("the argument type must be one of " + types);
	            }
	            var dtype = constVlaues.DATE_TYPES[type];
	            if (type === "week") {
	                delta *= 7;
	            }
	            this._setDate(this.date[dtype['set']](this.date[dtype['get']]() + delta));
	        }
	    }, {
	        key: "valueOf",
	        value: function valueOf() {
	            return +this.date;
	        }
	    }, {
	        key: "toString",
	        value: function toString() {
	            return this.date.toString();
	        }
	    }], [{
	        key: "isToday",
	        value: function isToday(date) {
	            date = new Date(date);
	            var now = new Date();
	            return date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth() && date.getDate() === now.getDate();
	        }
	    }, {
	        key: "countDays",
	        value: function countDays(date) {
	            date = new Date(date);
	            var stime = new Date(date.getTime()).setDate(1);
	            var start = new Date(stime);
	            var end = start.setMonth(start.getMonth() + 1);
	            return (end - stime) / constVlaues.DAY;
	        }
	    }, {
	        key: "get",
	        value: function get(type, date) {
	            var types = Object.keys(constVlaues.FORMATS_MAP);
	            if (types.indexOf(type) === -1) {
	                throw new Error("the argument type must be one of " + types);
	            }
	            return Moment.format(constVlaues.FORMATS_MAP[type], date).replace(/^0/, '');
	        }
	    }, {
	        key: "format",
	        value: function format(formats, date) {
	            if (typeof formats !== "string") {
	                throw new Error('argument formats must be a string');
	            }
	            date = new Date(date);
	            return formats.replace(/[yY]{4}/, date.getFullYear()).replace(/M{2}/, padZero(date.getMonth() + 1)).replace(/d{2}/, padZero(date.getDate())).replace(/h{2}/, padZero(date.getHours())).replace(/m{2}/, padZero(date.getMinutes())).replace(/s{2}/, padZero(date.getSeconds())).replace(/w/, constVlaues.WEEKS[date.getDay()]);
	        }
	    }]);

	    return Moment;
	}();

	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Moment;

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