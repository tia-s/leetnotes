Initialize max_profit to 0

For i from 0 to length of prices - 1 (Buy Day):
    For j from i + 1 to length of prices (Sell Day):
        current_profit = prices[j] - prices[i]
        If current_profit > max_profit:
            max_profit = current_profit

Return max_profit