Initialize n = length of prices
If n is 0, return 0

Create array min_prices of size n
min_prices[0] = prices[0]

For i from 1 to n - 1:
    min_prices[i] = min(min_prices[i-1], prices[i])

Initialize max_profit = 0
For i from 0 to n - 1:
    max_profit = max(max_profit, prices[i] - min_prices[i])

Return max_profit