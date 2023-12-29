
public class Solution {

    private static final int[] RANGE_OF_VALUES = {1, (int) Math.pow(10, 4)};
    private static final int NO_POINTS = 0;

    public int deleteAndEarn(int[] input) {
        if (input.length == 1) {
            return input[0];
        }

        // Alternatively: Arrays.stream(input).max().getAsInt();
        final int maxInputValue = findMaxValue(input);
        final int[] pointsPerUniqueValue = new int[maxInputValue + 1];
        for (int value : input) {
            pointsPerUniqueValue[value] += value;
        }

        int twoStepsBackPoints = NO_POINTS;
        int oneStepBackPoints = pointsPerUniqueValue[RANGE_OF_VALUES[0]];
        int maxPoints = pointsPerUniqueValue[RANGE_OF_VALUES[0]];

        for (int i = 2; i <= maxInputValue; ++i) {
            maxPoints = Math.max(oneStepBackPoints, twoStepsBackPoints + pointsPerUniqueValue[i]);
            twoStepsBackPoints = oneStepBackPoints;
            oneStepBackPoints = maxPoints;
        }

        return maxPoints;
    }

    private int findMaxValue(int[] input) {
        int maxValue = 0;
        for (int value : input) {
            maxValue = Math.max(maxValue, value);
        }
        return maxValue;
    }
}
