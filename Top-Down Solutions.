
import java.util.HashMap;
import java.util.Map;

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

        final Map<Integer, Integer> memo = new HashMap<>();
        memo.put(RANGE_OF_VALUES[0] - 1, NO_POINTS);
        memo.put(RANGE_OF_VALUES[0], pointsPerUniqueValue[RANGE_OF_VALUES[0]]);

        return findMaxPoints(maxInputValue, pointsPerUniqueValue, memo);
    }

    private int findMaxValue(int[] input) {
        int maxValue = 0;
        for (int value : input) {
            maxValue = Math.max(maxValue, value);
        }
        return maxValue;
    }

    private int findMaxPoints(int currentValue, int[] pointsPerUniqueValue, Map<Integer, Integer> memo) {
        if (currentValue == RANGE_OF_VALUES[0] - 1) {
            return NO_POINTS;
        }
        if (currentValue == RANGE_OF_VALUES[0]) {
            return pointsPerUniqueValue[RANGE_OF_VALUES[0]];
        }

        if (!memo.containsKey(currentValue)) {
            findMaxPoints(currentValue - 1, pointsPerUniqueValue, memo);
            int currentPoints = Math.max(memo.get(currentValue - 1), memo.get(currentValue - 2) + pointsPerUniqueValue[currentValue]);
            memo.put(currentValue, currentPoints);
        }

        return memo.get(currentValue);
    }
}
