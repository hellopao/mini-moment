
export class DateTime {

    date: Date;

    constructor(date?);

    isToday(): boolean;

    next(type: "year" | "month" | "date" | "hour" | "second" | "minute" | "week", delta?: number): DateTime;

    prev(type: "year" | "month" | "date" | "hour" | "second" | "minute" | "week", delta?: number): DateTime;

    get(type: "year" | "month" | "date" | "hour" | "second" | "minute" | "day"): string;

    format(format?: string): string;

    fromNow(): string;

    countDays(): number;

    static get(type: "year" | "month" | "date" | "hour" | "second" | "minute" | "day", date): string;

    static format(format: string, date): string;

    static fromNow(date): string;

    static countDays(date): number
}

export default DateTime;