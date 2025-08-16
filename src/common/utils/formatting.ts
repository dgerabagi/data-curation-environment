// src/common/utils/formatting.ts

const KMBT_SUFFIXES = ['', 'K', 'M', 'B', 'T', 'Q']; // Extend as needed

/**
 * Formats a large number with appropriate K/M/B/T suffixes and dynamic decimal places.
 *
 * @param value The number to format.
 * @param decimalPlaces The base number of decimal places to aim for.
 * @returns A formatted string.
 */
export function formatLargeNumber(value: number | undefined | null, decimalPlaces: number = 1): string {
    if (value === null || value === undefined || isNaN(value) || !Number.isFinite(value)) {
        return '---';
    }
    if (value === 0) {
        return '0';
    }

    const isNegative = value < 0;
    const absValue = Math.abs(value);

    if (absValue < 1000) {
        return String(Math.round(value)); // Return whole number if less than 1000
    }

    let unitIndex = 0;
    let scaledValue = absValue;

    unitIndex = Math.floor(Math.log10(absValue) / 3);
    unitIndex = Math.min(unitIndex, KMBT_SUFFIXES.length - 1);
    scaledValue = absValue / Math.pow(1000, unitIndex);

    let adjustedDecimalPlaces = decimalPlaces;
    if (scaledValue >= 100) adjustedDecimalPlaces = 0;
    else if (scaledValue >= 10) adjustedDecimalPlaces = 1;
    else adjustedDecimalPlaces = 2;


    const unit = KMBT_SUFFIXES[unitIndex] ?? '';
    let formattedValue = scaledValue.toFixed(adjustedDecimalPlaces);
    
    // Remove trailing .00 or .0
    if (adjustedDecimalPlaces > 0 && formattedValue.endsWith('0')) {
        formattedValue = formattedValue.replace(/\.?0+$/, '');
    }


    return `${isNegative ? '-' : ''}${formattedValue}${unit}`;
}

/**
 * Formats a number with commas as thousands separators.
 * @param value The number to format.
 * @returns A formatted string with commas.
 */
export function formatNumberWithCommas(value: number | undefined | null): string {
    if (value === null || value === undefined || isNaN(value)) {
        return '---';
    }
    return value.toLocaleString();
}

/**
 * Formats a file size in bytes into a human-readable string (KB, MB, GB, etc.).
 * @param bytes The number of bytes.
 * @param decimals The number of decimal places to use.
 * @returns A formatted string representing the file size.
 */
export function formatBytes(bytes: number, decimals: number = 1): string {
    if (bytes === 0) return '0 Bytes';
    if (isNaN(bytes)) return '---';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}