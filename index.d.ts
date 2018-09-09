declare type DateUnit = "year" | "month" | "date" | "hour" | "second" | "minute" | "week";
export default class Moment {
    date: Date;
    constructor(date?: string | number | Date);
    /**
     * compare the date with today
     */
    isToday(): boolean;
    /**
     * count days in month
     */
    countDays(): number;
    /**
     * get datestr by type
     */
    get(type: "year" | "month" | "date" | "hour" | "second" | "minute" | "day" | "millisecond"): string;
    /**
     * get datestr by type
     */
    set(type: DateUnit, value: number): Moment;
    /**
     * format date
     */
    format(formats?: string): string;
    /**
     * static func : compare the date with today
     */
    static isToday(date: any): boolean;
    /**
     * sttic func : count days in month
     */
    static countDays(date: any): number;
    /**
     * static func : get datestr by type
     */
    static get(type: "year" | "month" | "date" | "hour" | "second" | "minute" | "day" | "millisecond", date: any): string;
    /**
     * static func : format date
     */
    static format(date: any, formats?: string): string;
    /**
     * validate a date
     */
    static isValid(date?: any): boolean;
    /**
     * static func: cal delta time str from now
     */
    static fromNow(date: any): string;
    /**
     * cal delta time str from now
     */
    fromNow(): string;
    /**
     * get next date
     */
    next(type: DateUnit, delta?: number): Moment;
    /**
     * get prev date
     */
    prev(type: DateUnit, delta?: number): Moment;
    /**
     * first of the time unit
     */
    startOf(type: "year" | "season" | "month" | "week" | "date" | "hour" | "minute"): Moment;
    valueOf(): number;
    toString(): string;
}
export {};
