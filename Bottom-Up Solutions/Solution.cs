
using System;

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

        int twoStepsBackPoints = NO_POINTS;
        int oneStepBackPoints = pointsPerUniqueValue[RANGE_OF_VALUES[0]];
        int maxPoints = pointsPerUniqueValue[RANGE_OF_VALUES[0]];

        for (int i = 2; i <= maxInputValue; ++i)
        {
            maxPoints = Math.Max(oneStepBackPoints, twoStepsBackPoints + pointsPerUniqueValue[i]);
            twoStepsBackPoints = oneStepBackPoints;
            oneStepBackPoints = maxPoints;
        }

        return maxPoints;
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
}
