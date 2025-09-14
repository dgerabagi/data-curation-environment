// src/common/utils/formatting.ts
// Updated on: C9 (Add truncatePath utility)

const KMBT_SUFFIXES = ['', 'K', 'M', 'B', 'T', 'Q']; // Extend as needed

/**
 * Truncates the middle of a file path if it exceeds a maximum length.
 * @param path The file path string.
 * @param maxLength The maximum desired length.
 * @returns The truncated path.
 */
export function truncatePath(path: string, maxLength: number = 50): string {
    if (path.length <= maxLength) {
        return path;
    }

    const startLength = Math.ceil((maxLength - 3) / 2);
    const endLength = Math.floor((maxLength - 3) / 2);

    const start = path.substring(0, startLength);
    const end = path.substring(path.length - endLength);

    return `${start}...${end}`;
}

/**
 * Calculates the estimated cost for an LLM prompt based on tiered pricing.
 * @param totalInputTokens The total number of tokens in the input.
 * @returns The estimated cost in USD.
 */
export function calculatePromptCost(totalInputTokens: number): number {
    if (totalInputTokens <= 0) {
        return 0;
    }

    const rateTier1 = 1.25 / 1_000_000; // for prompts <= 200k tokens
    const rateTier2 = 2.50 / 1_000_000; // for prompts > 200k tokens

    if (totalInputTokens <= 200_000) {
        return totalInputTokens * rateTier1;
    } else {
        return totalInputTokens * rateTier2;
    }
}


/**
 * Formats a large number with appropriate K/M/B/T suffixes and dynamic decimal places.
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
        return String(Math.round(value));
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
    
    if (adjustedDecimalPlaces > 0 && formattedValue.endsWith('0')) {
        formattedValue = formattedValue.replace(/\.?0+$/, '');
    }

    return `${isNegative ? '-' : ''}${formattedValue}${unit}`;
}

/**
 * Formats a number with commas as thousands separators.
 */
export function formatNumberWithCommas(value: number | undefined | null): string {
    if (value === null || value === undefined || isNaN(value)) {
        return '---';
    }
    return value.toLocaleString();
}

/**
 * Formats a file size in bytes into a human-readable string (KB, MB, GB, etc.).
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

/**
 * Truncates a long string for logging purposes.
 */
export function truncateStringForLogging(str: string, maxLength: number = 100): string {
    if (str.length <= maxLength) {
        return str;
    }
    const halfLength = Math.floor((maxLength - 3) / 2);
    return `${str.substring(0, halfLength)}...${str.substring(str.length - halfLength)}`;
}

/**
 * Truncates a multi-line code string for logging, keeping the first and last few lines.
 * @param code The code string to truncate.
 * @param totalLines The total number of lines to keep (start + end).
 * @param startLines The number of lines to keep from the start.
 * @param endLines The number of lines to keep from the end.
 * @returns A truncated code string.
 */
export function truncateCodeForLogging(code: string, totalLines: number = 30, startLines: number = 15, endLines: number = 15): string {
    if (!code) return code;
    const lines = code.split('\n');
    if (lines.length <= totalLines) {
        return code;
    }
    const start = lines.slice(0, startLines).join('\n');
    const end = lines.slice(-endLines).join('\n');
    return `${start}\n\n// ... (content truncated) ...\n\n${end}`;
}