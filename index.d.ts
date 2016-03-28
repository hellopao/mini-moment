
export class Moment {
    
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
    set(type: "year" | "month" | "date" | "hour" | "second" | "minute" | "week", delta?: number): Moment;

    /**
     * Mutates the original moment by adding time
     */
    next(type: "year" | "month" | "date" | "hour" | "second" | "minute" | "week", delta?: number): Moment;

    /**
     * Mutates the original moment by subtracting time
     */
    prev(type: "year" | "month" | "date" | "hour" | "second" | "minute" | "week", delta?: number): Moment;

    /**
     * get time unit of the original moment
     */
    get(type: "year" | "month" | "date" | "hour" | "second" | "minute" | "day"): string;

    /**
     * format the original moment with format string
     */
    format(format?: string): string;

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
    static get(type: "year" | "month" | "date" | "hour" | "second" | "minute" | "day", date): string;

    /**
     * format the incoming date with format string
     */
    static format(format: string, date): string;

    /**
     * get the day count in the month of the incoming date
     */
    static fromNow(date): string;

    /**
     * get the day count in the month of the incoming date
     */
    static countDays(date): number
}

export default Moment;