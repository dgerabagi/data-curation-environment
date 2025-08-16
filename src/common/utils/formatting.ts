// src/common/utils/formatting.ts

const KMBT_SUFFIXES = ['', 'K', 'M', 'B', 'T', 'Q']; // Extend as needed

/**
 * Formats a large number with appropriate K/M/B/T suffixes and dynamic decimal places.
 * Handles very small near-zero numbers gracefully to avoid scientific notation.
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