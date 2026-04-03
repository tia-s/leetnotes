from typing import List

class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        min_price = float('inf') # buy price
        max_profit = 0 # sell price
        
        for price in prices:
            if price < min_price:
                min_price = price # update buy price if we find a new minimum
            elif price - min_price > max_profit: # if selling today is more profitable than our current max profit
                max_profit = price - min_price # update max profit to the profit we would get by selling today
                
        return max_profit