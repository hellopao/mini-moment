type DATE_TYPE = "year" | "month" | "date" | "hour" | "second" | "minute" | "week";

declare class Moment {

    /**
     * Date instance of the original moment
     */
    date: Date;

    constructor(date?);

    /**
     * compare the original moment to today
     */
    isToday(): boolean;

    /**
     * Mutates the original moment by setting it to a unit of the incoming time
     */
    set(type: DATE_TYPE, value: number): Moment;

    /**
     * Mutates the original moment by adding time
     */
    next(type: DATE_TYPE, delta?: number): Moment;

    /**
     * Mutates the original moment by subtracting time
     */
    prev(type: DATE_TYPE, delta?: number): Moment;

    /**
     * get time unit of the original moment
     */
    get(type: "year" | "month" | "date" | "hour" | "second" | "minute" | "day" | "millisecond"): string;

    /**
     * format the original moment with format string
     */
    format(formats?: string): string;

    /**
     * get the duration string between the original moment and the current time
     */
    fromNow(): string;

    /**
     * get the day count in the month of the original moment
     */
    countDays(): number;

    /**
     * Mutates the original moment by setting it to the start of a unit of time
     */
    startOf(type: "year" | "season" | "month" | "date" | "hour" | "minute" | "week"): Moment;

    /**
     * get time unit of the incoming date
     */
    static get(type: "year" | "month" | "date" | "hour" | "second" | "minute" | "day" | "millisecond", date): string;

    /**
     * format the incoming date with format string
     */
    static format(date: string | number, formats?: string): string;

    /**
     * get the day count in the month of the incoming date
     */
    static fromNow(date: string | number): string;

    /**
     * get the day count in the month of the incoming date
     */
    static countDays(date: string | number): number;

    /**
     * validate a date 
     */
    static isValid(date?: any): boolean;
}

declare namespace Moment {

}

export = Moment;