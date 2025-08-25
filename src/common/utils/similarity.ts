// src/common/utils/similarity.ts
// New file in C144

/**
 * Calculates the Sørensen-Dice coefficient between two strings.
 * This measures similarity as a value between 0 (no similarity) and 1 (identical).
 * It works by comparing the number of shared 2-character sequences (bigrams).
 * @param str1 The first string.
 * @param str2 The second string.
 * @returns A number between 0 and 1 representing the similarity.
 */
export function diceCoefficient(str1: string, str2: string): number {
    if (str1 === str2) return 1;
    if (str1.length < 2 || str2.length < 2) return 0;

    const bigrams1 = new Set<string>();
    for (let i = 0; i < str1.length - 1; i++) {
        bigrams1.add(str1.substring(i, i + 2));
    }

    const bigrams2 = new Set<string>();
    for (let i = 0; i < str2.length - 1; i++) {
        bigrams2.add(str2.substring(i, i + 2));
    }

    if (bigrams1.size === 0 && bigrams2.size === 0) return 1;

    let intersectionSize = 0;
    for (const bigram of bigrams1) {
        if (bigrams2.has(bigram)) {
            intersectionSize++;
        }
    }

    return (2 * intersectionSize) / (bigrams1.size + bigrams2.size);
}