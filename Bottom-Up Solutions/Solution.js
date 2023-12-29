
/**
 * @param {number[]} input
 * @return {number}
 */
var deleteAndEarn = function (input) {
    const RANGE_OF_VALUES = [1, Math.pow(10, 4)];
    const NO_POINTS = 0;

    if (input.length === 1) {
        return input[0];
    }

    // Alternatively: Math.max(...input);
    const maxInputValue = findMaxValue(input);
    const pointsPerUniqueValue = new Array(maxInputValue + 1).fill(0);
    for (let value of input) {
        pointsPerUniqueValue[value] += value;
    }

    let twoStepsBackPoints = NO_POINTS;
    let oneStepBackPoints = pointsPerUniqueValue[RANGE_OF_VALUES[0]];
    let maxPoints = pointsPerUniqueValue[RANGE_OF_VALUES[0]];

    for (let i = 2; i <= maxInputValue; ++i) {
        maxPoints = Math.max(oneStepBackPoints, twoStepsBackPoints + pointsPerUniqueValue[i]);
        twoStepsBackPoints = oneStepBackPoints;
        oneStepBackPoints = maxPoints;
    }

    return maxPoints;
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
