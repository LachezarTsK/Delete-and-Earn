
using System;
using System.Collections.Generic;

public class Solution
{
    private static readonly int[] RANGE_OF_VALUES = { 1, (int)Math.Pow(10, 4) };
    private static readonly int NO_POINTS = 0;
    public int DeleteAndEarn(int[] input)
    {
        if (input.Length == 1)
        {
            return input[0];
        }

        // Alternatively: input.Max();
        int maxInputValue = FindMaxValue(input);
        int[] pointsPerUniqueValue = new int[maxInputValue + 1];
        foreach (int value in input)
        {
            pointsPerUniqueValue[value] += value;
        }

        Dictionary<int, int> memo = new Dictionary<int, int>();
        memo.Add(RANGE_OF_VALUES[0] - 1, NO_POINTS);
        memo.Add(RANGE_OF_VALUES[0], pointsPerUniqueValue[RANGE_OF_VALUES[0]]);

        return FindMaxPoints(maxInputValue, pointsPerUniqueValue, memo);
    }

    private int FindMaxValue(int[] input)
    {
        int maxValue = 0;
        foreach (int value in input)
        {
            maxValue = Math.Max(maxValue, value);
        }
        return maxValue;
    }

    private int FindMaxPoints(int currentValue, int[] pointsPerUniqueValue, Dictionary<int, int> memo)
    {
        if (currentValue == RANGE_OF_VALUES[0] - 1)
        {
            return NO_POINTS;
        }
        if (currentValue == RANGE_OF_VALUES[0])
        {
            return pointsPerUniqueValue[RANGE_OF_VALUES[0]];
        }

        if (!memo.ContainsKey(currentValue))
        {
            FindMaxPoints(currentValue - 1, pointsPerUniqueValue, memo);
            int currentPoints = Math.Max(memo[currentValue - 1], memo[currentValue - 2] + pointsPerUniqueValue[currentValue]);
            memo.Add(currentValue, currentPoints);
        }

        return memo[currentValue];
    }
}
