
/**
 * @param {number[]} input
 * @return {number}
 */
var deleteAndEarn = function (input) {
    this.RANGE_OF_VALUES = [1, Math.pow(10, 4)];
    this.const = NO_POINTS = 0;

    if (input.length === 1) {
        return input[0];
    }

    // Alternatively: Math.max(...input);
    const maxInputValue = findMaxValue(input);
    const pointsPerUniqueValue = new Array(maxInputValue + 1).fill(0);
    for (let value of input) {
        pointsPerUniqueValue[value] += value;
    }

    const memo = new Map();
    memo.set(this.RANGE_OF_VALUES[0] - 1, this.NO_POINTS);
    memo.set(this.RANGE_OF_VALUES[0], pointsPerUniqueValue[this.RANGE_OF_VALUES[0]]);

    return findMaxPoints(maxInputValue, pointsPerUniqueValue, memo);
};

/**
 * @param {number[]} input
 * @return {number}
 */
function findMaxValue(input) {
    let maxValue = 0;
    for (let value of input) {
        maxValue = Math.max(maxValue, value);
    }
    return maxValue;
}

/**
 * @param {number} currentValue 
 * @param {number[]} pointsPerUniqueValue
 * @param {Map<number, number>} memo 
 * @return {number}
 */
function findMaxPoints(currentValue, pointsPerUniqueValue, memo) {
    if (currentValue === this.RANGE_OF_VALUES[0] - 1) {
        return this.NO_POINTS;
    }
    if (currentValue === this.RANGE_OF_VALUES[0]) {
        return pointsPerUniqueValue[this.RANGE_OF_VALUES[0]];
    }

    if (!memo.has(currentValue)) {
        findMaxPoints(currentValue - 1, pointsPerUniqueValue, memo);
        let currentPoints = Math.max(memo.get(currentValue - 1), memo.get(currentValue - 2) + pointsPerUniqueValue[currentValue]);
        memo.set(currentValue, currentPoints);
    }

    return memo.get(currentValue);
}
