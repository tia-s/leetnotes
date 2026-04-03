from typing import List

class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        n = len(prices)
        if n == 0:
            return 0
        
        min_prices = [0] * n
        min_prices[0] = prices[0]
                
        # min_prices[i] will hold the minimum price from day 0 to day i
        for i in range(1, n):
            if min_prices[i-1] < prices[i]:
                min_prices[i] = min_prices[i-1]
            else:
                min_prices[i] = prices[i]
        
        # calculate the profit for selling on each day and keep track of the maximum profit
        max_profit = 0
        for i in range(n):
            profit = prices[i] - min_prices[i]
            if profit > max_profit:
                max_profit = profit
                
        return max_profit