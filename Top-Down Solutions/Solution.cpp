
#include <span>
#include <vector>
#include <algorithm>
#include <unordered_map>
using namespace std;

class Solution {
    
    /*
     static_cast<int>(pow(10, 4)) instead of just pow(10, 4):
     since pow(10, 4) is assigned to int, this cast is for compatibility
     between different compilers. In cases like this, if there is no
     an explicit cast:

     Some compilers, such Microsoft Visual C++ (MSVC), implicitly cast
     the return value of pow(...) to int, and give only a warning.

     Other compilers, such as clang 11 using the latest C++ 20 standard,
     throw a run-time error.
     */
    inline static const array<int, 2> RANGE_OF_VALUES {1, static_cast<int> (pow(10, 4))};
    inline static const int NO_POINTS = 0;
    using Memo = unordered_map<int, int>;

public:
    int deleteAndEarn(const vector<int>& input) const {
        if (input.size() == 1) {
            return input[0];
        }

        // Alternatively: 
        // reduce(input.begin(), input.end()); supports concurrency 
        // accumulate(input.begin(), input.end(), 0); does not support concurrency
        const int maxInputValue = findMaxValue(input);

        vector<int> pointsPerUniqueValue(maxInputValue + 1);
        for (int value : input) {
            pointsPerUniqueValue[value] += value;
        }

        int twoStepsBackPoints = NO_POINTS;
        int oneStepBackPoints = pointsPerUniqueValue[RANGE_OF_VALUES[0]];
        int maxPoints = pointsPerUniqueValue[RANGE_OF_VALUES[0]];

        for (int i = 2; i <= maxInputValue; ++i) {
            maxPoints = max(oneStepBackPoints, twoStepsBackPoints + pointsPerUniqueValue[i]);
            twoStepsBackPoints = oneStepBackPoints;
            oneStepBackPoints = maxPoints;
        }

        return maxPoints;
    }

private:
    int findMaxValue(const vector<int>& input) const {
        int maxValue = 0;
        for (const auto& value : input) {
            maxValue = max(maxValue, value);
        }
        return maxValue;
    }

    // Prior to C++20, alternative to span<const TypeName>: const vector<TypeName>&
    int findMaxPoints(int currentValue, span<const int> pointsPerUniqueValue, Memo& memo) const {
        if (currentValue == RANGE_OF_VALUES[0] - 1) {
            return NO_POINTS;
        }
        if (currentValue == RANGE_OF_VALUES[0]) {
            return pointsPerUniqueValue[RANGE_OF_VALUES[0]];
        }

        if (!memo.contains(currentValue)) {
            findMaxPoints(currentValue - 1, pointsPerUniqueValue, memo);
            int currentPoints = max(memo[currentValue - 1], memo[currentValue - 2] + pointsPerUniqueValue[currentValue]);
            memo[currentValue] = currentPoints;
        }

        return memo[currentValue];
    }
};
