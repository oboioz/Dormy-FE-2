import moment from 'moment';
import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';
dayjs.extend(minMax);
export enum compareResult {
    lessThan = -1,
    exceeds = 1,
    equal = 0
}

export class DateTimeUtils {
    public static toDay = new Date();
    public static getDifferenceInDays(date1: Date, date2: Date): number {
        const diffInMs = Math.abs(date2.getTime() - date1.getTime());
        return this.MathRound(diffInMs / (1000 * 60 * 60 * 24));
    }
    public static newDate(val: string | number | Date | null | undefined): Date | null {
        return val ? new Date(val) : null;
     }
    /// <summary>
    /// compare date1 and date2
    /// </summary>
    /// <param name="date1">First Date</param>
    /// <param name="date2">Second Date</param>
    /// <returns> 1: date1 > date2 </returns>
    /// <returns> 0: date1 = date2 </returns>
    /// <returns> -1: date1 < date2 </returns>
    public static compare(date1: Date, date2: Date): number {
        const diffInMs = date1?.getTime() - date2?.getTime();
        let diffInDays = this.MathRound(diffInMs / (1000 * 60 * 60 * 24));
 
        if (diffInDays > 0) {
            return compareResult.exceeds;
        } else if (diffInMs === 0) {
            return compareResult.equal;
        } else {
            return compareResult.exceeds;
        }
    }
 
    public static hasValue(value: Date) {
        return value != undefined && value != null;
    }
 
    /// <summary>
    /// compare date1 and date2
    /// </summary>
    /// <param name="date1">First Date</param>
    /// <param name="date2">Second Date</param>
    /// <returns> true: date1 = date2 </returns>
    /// <returns> false: date1 != date2 </returns>
    public static isEqualDateOnly(date1: Date, date2: Date): boolean {
        if ((this.hasValue(date1) && !this.hasValue(date2)) || (this.hasValue(date2) && !this.hasValue(date1))) {
            return false;
        }
        return this.compareDate(date1, date2, true) == 0;
    }
    public static isDateInvalid(date: Date) {
        return date?.toString() === 'Invalid Date';
    }
 
    public static isValidDate(date: Date) {
        return this.hasValue(date) && !this.isDateInvalid(date);
    }
    /// <summary>
    /// compare date1 and date2
    /// </summary>
    /// <param name="date1">First Date</param>
    /// <param name="date2">Second Date</param>
    /// <returns> 0: date1 = date2 </returns>
    /// <returns> 1: date1 > date2 </returns>
    /// <returns> -1: date1 < date2 </returns>
    public static compareDate(date1: Date, date2: Date, onlyDate: boolean): number | undefined {
        if (this.isDateInvalid(date1) || this.isDateInvalid(date2)) {
            return undefined;
        }
        if (onlyDate) {
            date1?.setHours(0, 0, 0, 0);
            date2?.setHours(0, 0, 0, 0);
        }
        return date1?.getTime() > date2?.getTime()
            ? compareResult.exceeds
            : date1?.getTime() < date2?.getTime()
            ? compareResult.lessThan
            : compareResult.equal;
    }
 
    public static isEqualOrlessThan(date1: Date, date2: Date, onlyDate: boolean = true): boolean {
        let result = this.compareDate(date1, date2, onlyDate);
        return result != undefined && (result == compareResult.equal || result == compareResult.lessThan);
    }
    public static isEqualOrexceeds(date1: Date, date2: Date, onlyDate: boolean = true): boolean {
        let result = this.compareDate(date1, date2, onlyDate);
        return result != undefined && (result == compareResult.equal || result == compareResult.exceeds);
    }
 
    public static isDateInThePast = (date: Date) => DateTimeUtils.compareWithToDay(date, true) === compareResult.lessThan;
   
    public static isValueInRange(value: Date, fromValue: Date, toValue: Date, onlyDate: boolean = true) {
        return (
            DateTimeUtils.isEqualOrexceeds(value, fromValue, onlyDate) &&
            DateTimeUtils.isEqualOrlessThan(value, toValue, onlyDate)
        );
    }
    /// <summary>
    /// compare date1 and date2
    /// </summary>
    /// <param name="date">Date want to compare with today</param>
    /// <returns> 1: Greater than today </returns>
    /// <returns> 0: Equal today </returns>
    /// <returns> -1: Lesser than today </returns>
    public static compareWithToDay(date: Date, onlyDate: boolean = false): number | undefined {
        return this.compareDate(date, new Date(), onlyDate);
    }
 
    public static MathRound(date: number): number {
        let roundDate = Math.round(date);
 
        if (roundDate >= date) {
            return roundDate;
        } else {
            return roundDate + 1;
        }
    }
 
    public static convertDateTimeToPRISMPattern(date: Date): string {
        return date.toLocaleDateString('en-us', { month: 'short', day: 'numeric', year: 'numeric' });
    }
 
    public static toStringInterstatePattern(date: Date): string {
        return date?.toLocaleDateString('en-us', { month: 'long', day: 'numeric', year: 'numeric' }).replace(',', '');
    }
 
    // public static toStringFormat(date: Date, format: string, prismDefaultValue: boolean = true): string {
    //     if (!moment(date).isValid()) {
    //         return prismDefaultValue ? NoProvidedDate : '';
    //     }
    //     return moment(date).format(format.toUpperCase());
    // }
    public static toLocaleDateString(date: Date, locales?: Intl.LocalesArgument): string {
        if (locales) {
            return date.toLocaleDateString(locales, {
                month: '2-digit',
                day: '2-digit',
                year: 'numeric',
            });
        } else {
            return date.toLocaleDateString('en-us', {
                month: '2-digit',
                day: '2-digit',
                year: 'numeric',
            });
        }
    }

    public static formatToYYYYMMDD = (date: any): string => {
        if (!date) {
            return ""; // Return an empty string if the input is null or undefined
        }
    
        const parsedDate = date instanceof Date ? date : new Date(date);
    
        if (isNaN(parsedDate.getTime())) {
            return ""; // Return an empty string if the input is an invalid date
        }
    
        const year = parsedDate.getFullYear();
        const month = String(parsedDate.getMonth() + 1).padStart(2, "0"); // Ensure 2-digit month
        const day = String(parsedDate.getDate()).padStart(2, "0"); // Ensure 2-digit day
    
        return `${year}-${month}-${day}`;
    };

    public static formatToMMDDYYYY = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
        });
    };
 
    public static toUTCStringFormat(date: Date, format: string): string {
        switch (format) {
            case 'MM/dd/YYYY':
                return date.toLocaleDateString('en-us', {
                    timeZone: 'UTC',
                    month: '2-digit',
                    day: '2-digit',
                    year: 'numeric',
                });
            default:
                return date.toLocaleDateString('en-us', {
                    timeZone: 'UTC',
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                });
        }
    }
 
    public static getDateWithOutTimeZone(date?: any): Date | null {
        // only apply for 2022-12-28T12:00:00+00:00
        return date ? new Date(`${date}`.split('+')[0]) : null;
    }
 
    public static toStringWithDefaultTime(date: any, defaultTime: string = '00:00:00'): string {
        if (!date) return date;
 
        const dateWithoutTime = date instanceof Date ? moment(date) : moment(date.split('T')[0]);
        return `${dateWithoutTime.format('YYYY-MM-DD')}T${defaultTime}`;
    }
 
    public static getMaxDate(...dates: Date[]): Date | null {
        const validDates = dates.filter((d) => d != null && !this.isDateInvalid(d)); // Filter out invalid dates
        return validDates.length > 0 ? new Date(Math.max(...validDates.map((d) => d.getTime()))) : null; // Return max date or null
    }
    
    public static getMinDate(...dates: Date[]): Date | null {
        // Filter out invalid dates
        const validDates = dates.filter((d) => d != null && !this.isDateInvalid(d));
    
        // If no valid dates, return null
        if (validDates.length === 0) {
            return null;
        }
    
        // Return the minimum valid date
        return new Date(Math.min(...validDates.map((d) => d.getTime())));
    }
 
    public static getStartOfMonth(date: Date): Date | null {
        return date == null ? null : new Date(date.getFullYear(), date.getMonth(), 1);
    }
 
    public static getEndOfMonth(date: Date): Date | null {
        return date == null ? null : new Date(date.getFullYear(), date.getMonth() + 1, 0);
    }
    public static isNullOrUndefined(value: any): boolean {
        return value === undefined || value === null;
    }
    public static compareMonth(date1: Date, date2: Date): number {
        if (this.isNullOrUndefined(date1) || this.isNullOrUndefined(date2)) {
            if (date1 === date2) {
                return 0;
            } else {
                throw new Error('Incomparable');
            }
        }
        if (
            date1.getFullYear() > date2.getFullYear() ||
            (date1.getFullYear() === date2.getFullYear() && date1.getMonth() > date2.getMonth())
        ) {
            return 1;
        } else {
            if (date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth()) {
                return 0;
            }
        }
 
        return -1;
    }
 
    public static compareYear(date1: Date, date2: Date): number {
        if (this.isNullOrUndefined(date1) || this.isNullOrUndefined(date2)) {
            if (date1 === date2) {
                return 0;
            } else {
                throw new Error('Incomparable');
            }
        }
        if (date1.getFullYear() > date2.getFullYear()) {
            return 1;
        } else {
            if (date1.getFullYear() === date2.getFullYear()) {
                return 0;
            }
        }
        return -1;
    }
 
    public static toDate(date: Date | string) {
        if (!date) {
            return null;
        }
 
        const toDate = new Date(date);
 
        return dayjs(toDate).isValid() ? toDate : null;
    }
    public static getLocalTimeZone(): string {
        return Intl.DateTimeFormat().resolvedOptions().timeZone;
    }
    public static toTimeStringWithTimezone(date: Date | string) {
        if (!date) {
            return null;
        }
        const timeConvertOptions: Intl.DateTimeFormatOptions = {
            hour: 'numeric',
            minute: 'numeric',
            timeZone: this.getLocalTimeZone(),
            timeZoneName: 'short',
        };
        try{
            return new Date(date).toLocaleString('en-us', timeConvertOptions);
        }
        catch{
            //Handle support for E2E team running with an invalid time zone in the cloud environment.- RangeError: Invalid time zone specified: Etc/Unknown
            //https://coxauto.slack.com/archives/C05U6DPSSP8/p1741939306709179
            return "Time information currently unavailable";
        }
    }
 
    public static addDays(date: Date, days: number): Date | null {
        if (!date) {
            return null;
        }
        let result = new Date(date);
        result.setDate(date.getDate() + days);
        return result;
    }
}